<template>
 <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
        <v-card color="white" class="pa-3 no_border" elevation="0">
            <!-- Title -->
            <v-row>
                <v-col sm="9" cols="12" class="py-0">
                    <h3 class="text-left mb-1 font_20 line_24">{{$t('consolidated_budget_performance_report')}}</h3>
                    <p class="mb-0">{{$t('consolidated_budget_performance_dec')}}</p>
                </v-col>
                <v-col sm="3" cols="12" class="pb-1">
                    <app-reporting-language 
                        :initLanguage="reportingLanguage" 
                        @emitLanguage="reportingLanguage = $event" 
                        @onChanged="onReportingLanguageChanges" />
                </v-col>
            </v-row>

            <!-- Search -->
            <v-row class="mt-0">
                <v-col sm="4" cols="12" class="py-0 pt-0">
                    <label class="mb-1">{{$t('fiscal_year')}}:</label>
                    <app-fiscal-date-dropdownlist
                        :initFiscalDate="fiscalDate"
                        @emitFiscalDate="fiscalDate = $event"
                    />
                </v-col>
                <v-col sm="4" cols="12" class="py-0 pt-0">
                    <label class="mb-1">{{$t('from')}}:</label>
                    <app-month-of-picker 
                        :initMonthOf="startMonth" 
                        @emitMonthOf="startMonth = $event"
                        :initMin="fiscalDate.start_date"
                        :initMax="fiscalDate.end_date" />
                </v-col>
                <v-col sm="4" cols="12" class="py-0 pt-0">
                    <label class="mb-1">{{$t('to')}}:</label>
                    <app-month-of-picker 
                        :initMonthOf="endMonth" 
                        @emitMonthOf="endMonth = $event"
                        :initMin="fiscalDate.start_date"
                        :initMax="fiscalDate.end_date" />
                </v-col>
            </v-row>
            <v-row class="mt-0">
                <v-col sm="4" cols="12" class="py-0 pt-0">
                    <label class="mb-1">{{$t('budgets')}}:</label>
                    <budget-selection 
                        :initBudgets="selectedBudgets"
                        @emitBudgets="selectedBudgets = $event"
                        :initFiscalDateId="fiscalDate.uuid"
                        :initDimension="dimension"
                        :initBudgetType="budgetType" />
                </v-col>
                <v-col sm="4" cols="12" class="py-0 pt-6">
                    <v-btn
                        class="white--text"
                        color="primary"
                        @click="search"
                    >
                        <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                    </v-btn>
                </v-col>
            </v-row>
            
            <!-- Table -->
            <v-row>
                <v-col sm="12" cols="12" class="pt-1">
                    <template>
                        <treelistdatasource 
                            ref="statementDS"
                            :data="statementList"
                            :sort="sortDefinition"
                            :schema-model="model" />

                        <treelist 
                            ref="statementTreeList"
                            data-source-ref="statementDS"
                            :resizable="true"
                            :columns="columns"
                            :dataBound="onDataBound" />

                        <LoadingMe
                            type="loading"
                            :isLoading="showLoading"
                            :myLoading="true"
                            :fullPage="false" />
                    </template>
                </v-col>
            </v-row>
        </v-card>
    </v-col>
 </v-row>
</template>

<script>
    import kendo from '@progress/kendo-ui';
    import {i18n} from '@/i18n';
    import Helper from "@/helper.js";
    /* Models */
    // import AccountModel from "@/scripts/model/Account.js";
    import FiscalDateModel from "@/scripts/model/FiscalDate";
    import BudgetExtendedModel from "@/scripts/model/BudgetExtended";
    import StatementOfProfitOrLossModel from "@/scripts/model/StatementOfProfitOrLoss";

    /* TreeList */
    import { TreeList } from '@progress/kendo-treelist-vue-wrapper';
    import { TreeListDataSource } from '@progress/kendo-datasource-vue-wrapper';
    
    /* Vuex */
    import { mapGetters } from 'vuex';

    const incomeStatementHandler = require("@/scripts/handler/accounting/incomeStatementHandler");
    const OrderNumberPL = require("@/scripts/default_setup/OrderNumberPL.js");
    const AccountTypeCode = require("@/scripts/default_setup/AccountTypeCode.js");

    const BudgetTypes = require("@/scripts/default_setup/BudgetTypes.js");
    const Dimensions = require("@/scripts/default_setup/Dimensions.js");

    export default {
        components:{
            "LoadingMe": () => import('@/components/Loading'),
            "app-fiscal-date-dropdownlist": () => import('@/components/kendo_templates/FiscalDateDropDownList'),
            "app-month-of-picker": () => import('@/components/kendo_templates/MonthOfPicker'),
            'app-reporting-language': () => import('@/components/kendo_templates/ReportingLanguageDropDownList'),
            'budget-selection': () => import('@/components/dropdownlist/BudgetSelection'),
            'treelist': TreeList,
            'treelistdatasource': TreeListDataSource,
        },
        data: () => ({
            dimension: Dimensions.SEGMENT,
            budgetType: BudgetTypes.STANDARD,
            selectedBudgets: [],
            segmentIds: [],
            statements : [],
            statementList : [],
            startMonth: '',
            endMonth: '',
            /* Fiscal Date */
            fiscalDate: new FiscalDateModel(),
            /* Kendo */
            columns : [],
            sortDefinition : [
                { field: "order", dir: "asc" },
                { field: "number", dir: "asc" },
            ],
			model: {
                id: "uuid",
                expanded: true
            },
            // Reporting Language
			reportingLanguage: 'english',
			fieldName : 'name',
            // LoadingMe
            showLoading: false,
        }),
        methods:{
            /* Initialize */
            async initialize () {
                this.showLoading = true;
                    
                // Call List
                await Promise.allSettled([
                    this.$store.dispatch('accounts/getList'),
                    this.$store.dispatch('segments/getList'),
                ])
                
                this.showLoading = false;
            },
            validating(){
                let isValid = true;

                if(this.fiscalDate.uuid === ''){
                    isValid = false;
                    this.$snotify.warning(i18n.t("please_select_fiscal_year"));
                }

                if(this.startMonth === '' || this.endMonth === ''){
                    isValid = false;
                    this.$snotify.warning(i18n.t("please_from_to_month"));
                }

                if(this.selectedBudgets.length === 0){
                    isValid = false;
                    this.$snotify.warning(i18n.t("please_select_budgets"));
                }

                return isValid;
            },
            /* Search */
            search () {
                if(this.validating()){
                    let endMonth = new Date(this.endMonth),
                        lastDay = new Date(endMonth.getFullYear(), endMonth.getMonth()+1, 0);

                    let sdate = kendo.toString(new Date(this.startMonth), 'yyyy-MM-dd') + 'T00:00:00.000Z',
                        edate = kendo.toString(lastDay, 'yyyy-MM-dd') + 'T23:59:59.999Z';

                    /* Segment Ids */
                    let segmentIds = [];
                    this.selectedBudgets.forEach(value => {
                        segmentIds.push(value.segment_uuid);
                    });
                    /* Remove Duplicate */
                    this.segmentIds = [...new Set(segmentIds)];
                    
                    // Empty datasource
                    let ds = this.$refs.statementDS.kendoWidget();
                    ds.data([]);
                    
                    // Query Income Statement
                    this.showLoading = true;
                    incomeStatementHandler.getBySegments(sdate, edate, this.segmentIds)
                    .then(res => {
                        if(res){
                            this.statements = res;
                            this.bindData();
                        }else{
                            this.$snotify.error(i18n.t("error_something_wrong"));
                        }
                    })
                    .finally(()=>{
                        // this.showLoading = false;
                    });
                }
			},
            bindData () {
                let g = {}, gchild = {};

                /* Generate Months */
                let fiscalMonths = Helper.generateFiscalMonths(this.fiscalDate.start_date, this.fiscalDate.end_date, "12", "yyyy-MM");

                /* Month Index */
                let startMonthIndex = fiscalMonths.indexOf(this.startMonth),
                    endMonthIndex = fiscalMonths.indexOf(this.endMonth);

                let minMonthIndex = startMonthIndex, maxMonthIndex = endMonthIndex;
                if(startMonthIndex > endMonthIndex){
                    minMonthIndex = endMonthIndex, maxMonthIndex = startMonthIndex;
                }

                /* Loop all budgets */
                for (let i = 0; i < this.selectedBudgets.length; i++) {
                    const budget = new BudgetExtendedModel(this.selectedBudgets[i]);

                    /* AccountIds */
                    let accountIds = [];
                    budget.lines.forEach(value => {
                        accountIds.push(value.account_uuid);
                    });

                    /* Budget lines */
                    let accounts = this.getTreeListByAccountIds(accountIds);
                    accounts.forEach(value => {
                        /* Order */
                        let order = value.type_code;
                        if(value.type_code === AccountTypeCode.OTHER_REVENUE){
                            order = OrderNumberPL[value.type_code];
                        }

                        /* Define Line */
                        if(!g[value.uuid]){
                            g[value.uuid] = new StatementOfProfitOrLossModel({
                                uuid : value.uuid,
                                number : value.number,
                                name : value.name,
                                local_name : value.local_name,
                                account : value,
                                parentId : value.parentId,
                                order : order,
                            });
                        }

                        /* Child Level */
                        if(value.parentId !== null){
                            /* Grouping Child Ids */
                            gchild[value.uuid] = value.uuid;

                            /* Get a budget line */
                            let budgetLine = budget.lines.find((item) => item.account_uuid === value.uuid);
                            if(budgetLine){
                                /* Reverse Nature */
                                let nature = 1;
                                if(value.account_type.nature.toLowerCase() === "cr"){
                                    nature = -1;
                                }

                                /* Budget Amount */
                                let budgetAmount = 0;
                                for (let j = 0; j < 12; j++) {
                                    if(j >= minMonthIndex && j <= maxMonthIndex){
                                        budgetAmount += kendo.parseFloat(budgetLine.monthly_amount[j].amount) * nature;
                                    }
                                }
                                g[value.uuid].budgetAmount += budgetAmount;

                                /* Parent as own child */
                                let ownChild = accounts.find((item) => item.parentId === value.uuid);
                                if(ownChild && budgetAmount !== 0){
                                    if(!g[value.number]){
                                        g[value.number] = new StatementOfProfitOrLossModel({
                                            uuid :  value.number,
                                            number : value.number,
                                            name : value.name,
                                            local_name : value.local_name,
                                            account : value,
                                            order : order,
                                            parentId : value.uuid,
                                            budgetAmount : budgetAmount,
                                        });
                                    }
                                }
                            }
                        }
                    });
                }

                /* ACTUAL */
                /* Define Segments */
                for (let key in g){
                    for (let i = 0; i < this.segmentIds.length; i++) {
                        g[key]["s"+i] = 0;
                    }
                }
                /* Sum Segments */
                for (let i = 0; i < this.segmentIds.length; i++) {
                    this.statements[i].forEach(value => {
                        if(g[value.accountUUID]){
                            g[value.accountUUID]["s"+i] += kendo.parseFloat(value.balance);
                        }
                        
                        /* Other Groups */
                        if(value.account_type_number >= 100 && value.account_type_number <= 105){
                            g[value.account_type_number] = new StatementOfProfitOrLossModel({
                                uuid: value.account_type_number,
                                name: value.name,
                                local_name: value.local_name,
                                order: OrderNumberPL[value.account_type_number],
                            });
                        }
                    });
                }

                /* Parse Object Array */
                let entries = Object.values(g);
                let childIds = Object.values(gchild);
                
                /* Parent aggregate sum */
                for (let i = 0; i < entries.length; i++) {
                    let entry = entries[i];
                    
                    if(~childIds.indexOf(entry.uuid)){
                        let parentId = entry.parentId;
                        while(parentId !== null){
                            if(parentId){
                                let parent = entries.find((item) => item.uuid === parentId);
                                if(parent){
                                    parent.budgetAmount += entry.budgetAmount;

                                    /* Define Segments */
                                    for (let j = 0; j < this.segmentIds.length; j++) {
                                        parent["s"+j] += entry["s"+j];
                                    }

                                    /* Set new parent id */
                                    parentId = parent.parentId;
                                }else{
                                    /* Set loop to end */
                                    parentId = null;
                                }
                            }else{
                                /* Set loop to end */
                                parentId = null;
                            }
                        }
                    }
                }

                /* Other Groups */
                /* Gross Profit */
                let revenue = this.getEntry(entries, AccountTypeCode.REVENUE),
                    costOfSale = this.getEntry(entries, AccountTypeCode.COGS),
                    grossProfit = this.getEntry(entries, AccountTypeCode.GROSS_PROFIT);

                /* EBITDA */
                let salaryBenefit = this.getEntry(entries, AccountTypeCode.SALARY_BENEFIT),
                    saleMarketing = this.getEntry(entries, AccountTypeCode.SALE_MARKETING),
                    researchProductDevelopment = this.getEntry(entries, AccountTypeCode.RESEARCH_PRODUCT_DEVELOPMENT),
                    legalProfessionalFee = this.getEntry(entries, AccountTypeCode.LEGAL_PROFESSIONAL_FEE),
                    generalAdminExpenses = this.getEntry(entries, AccountTypeCode.GENERAL_ADMIN_EXPENSE),
                    operatingExpenses = this.getEntry(entries, AccountTypeCode.OPERATING_EXPENSE),
                    otherRevenue = this.getEntry(entries, AccountTypeCode.OTHER_REVENUE),
                    operatingIncomeEBITDA = this.getEntry(entries, AccountTypeCode.OPERATING_INCOME_EBITDA);

                /* EBIT */
                let depreciation = this.getEntry(entries, AccountTypeCode.DEPRECIATION),
                    otherExpenses = this.getEntry(entries, AccountTypeCode.OTHER_EXPENSE),
                    earningBeforeInterestAndTaxEBIT = this.getEntry(entries, AccountTypeCode.EARNING_BEFORE_INTEREST_AND_TAX_EBIT);

                /* Profit Before Tax */
                let financingCost = this.getEntry(entries, AccountTypeCode.FINANCING_COST),
                    profitBeforeTax = this.getEntry(entries, AccountTypeCode.PROFIT_BEFORE_TAX);

                /* Profit For The Period */
                let taxRelatedExpenses = this.getEntry(entries, AccountTypeCode.TAX),
                    profitForThePeriod = this.getEntry(entries, AccountTypeCode.PROFIT_FOR_THE_PERIOD);
                    
                /* Calculate Budget Amount */
                grossProfit.budgetAmount = revenue.budgetAmount - costOfSale.budgetAmount;
                operatingExpenses.budgetAmount = salaryBenefit.budgetAmount + saleMarketing.budgetAmount + researchProductDevelopment.budgetAmount + legalProfessionalFee.budgetAmount + generalAdminExpenses.budgetAmount;
                operatingIncomeEBITDA.budgetAmount = (grossProfit.budgetAmount + otherRevenue.budgetAmount) - operatingExpenses.budgetAmount;
                earningBeforeInterestAndTaxEBIT.budgetAmount = operatingIncomeEBITDA.budgetAmount - depreciation.budgetAmount - otherExpenses.budgetAmount;
                profitBeforeTax.budgetAmount = earningBeforeInterestAndTaxEBIT.budgetAmount - financingCost.budgetAmount;
                profitForThePeriod.budgetAmount = profitBeforeTax.budgetAmount - taxRelatedExpenses.budgetAmount;

                /* Calculate Segment Amount */
                for (let i = 0; i < this.segmentIds.length; i++) {
                    grossProfit["s"+i] = revenue["s"+i] - costOfSale["s"+i];
                    operatingExpenses["s"+i] = salaryBenefit["s"+i] + saleMarketing["s"+i] + researchProductDevelopment["s"+i] + legalProfessionalFee["s"+i] + generalAdminExpenses["s"+i];
                    operatingIncomeEBITDA["s"+i] = (grossProfit["s"+i] + otherRevenue["s"+i]) - operatingExpenses["s"+i];
                    earningBeforeInterestAndTaxEBIT["s"+i] = operatingIncomeEBITDA["s"+i] - depreciation["s"+i] - otherExpenses["s"+i];
                    profitBeforeTax["s"+i] = earningBeforeInterestAndTaxEBIT["s"+i] - financingCost["s"+i];
                    profitForThePeriod["s"+i] = profitBeforeTax["s"+i] - taxRelatedExpenses["s"+i];
                }

                /* Find Percentage */
                entries.forEach(value => {
                    for (let i = 0; i < this.segmentIds.length; i++) {
                        value["p"+i] = this.findPercentage(value["s"+i], value.budgetAmount);
                    }
                });
                
                /* BIND STATMENT */
                this.statementList = entries;
                
                this.generateColumn();

                this.showLoading = false;
			},
            getEntry(entries, id){
                let entry = entries.find(i=>i.uuid === id);

                if(!entry){
                    entry = new StatementOfProfitOrLossModel();
                    for (let i = 0; i < this.segmentIds.length; i++) {
                        entry["s"+i] = 0;
                    }
                }

                return entry;
            },
            findPercentage (value1, value2) {
                let result = 0;
                if(value2 !== 0){
                    result = value1 / value2;
                }

                return result;
            },
            /* On databound */
            onDataBound (e) {
                var headers = e.sender.thead.children();
                for (var i = 0; i < headers.length; i++) {
                    var th = kendo.jQuery(headers[i]);
                    th.css("font-weight", "bold");
                    th.css("text-align", "center");
                }

                var rows = e.sender.tbody.children();
                for (var j = 0; j < rows.length; j++) {
                    var row = kendo.jQuery(rows[j]);
                    var dataItem = e.sender.dataItem(row);
                    
                    /* Amount align right */
                    row.css("text-align", "right");

                    /* Parent in bold */
                    if(dataItem.get("hasChildren") || dataItem.uuid >= 100){
                        row.css("font-weight", "bold");
                    }
                }
            },
            // Generate Columns
			generateColumn() {
                let headerAttributes = {
                        class: "table-header-cell",
                        style: "text-align: center;padding-right: 35px; font-size: 14px",
                    },
                    attributes = {
                        class: "table-cell",
                        style: "text-align: right; font-size: 14px",
                    };

                let columns = [
                    {
                        field: this.fieldName,
                        title: i18n.t("account"),
                        template: this.nameTmpl,
                        locked: true,
                        width: 450,
                    },
                    {
                        field: "budgetAmount",
                        title: i18n.t("budget"),
                        format: "{0:n}",
                        width: 200,
                        headerAttributes: headerAttributes,
                        attributes: attributes,
                    }
                ];

                /* Set Column Segments */
                for (let i = 0; i < this.segmentIds.length; i++) {
                    /* Segment */
                    let segment = this.getSegmentById(this.segmentIds[i]);

                    columns.push({
                        title: segment.name,
                        headerAttributes: headerAttributes,
                        columns:[
                            {
                                field: "s" + i,
                                title: i18n.t("actual_amount"),
                                format: "{0:n}",
                                width: 200,
                                headerAttributes: headerAttributes,
                                attributes: attributes,
                            },
                            {
                                field: "p" + i,
                                title: "%",
                                format: "{0:p}",
                                width: 100,
                                headerAttributes: headerAttributes,
                                attributes: attributes,
                            }
                        ]
                    });
                }

                this.columns = columns;
            },
            nameTmpl(dataItem){
                /* Name in language */
                let name = dataItem.name;
                if(this.reportingLanguage === "local"){
                    name = dataItem.local_name;
                }

                /* Define result */
                let result = `<span>${dataItem.number} - ${name}</span>`;

                /* Top Level */
                if(dataItem.parentId === null){
                    result = `<span style='font-weight: bolder;'>${name}</span>`;
                }

                /* Parent Level */
                if(dataItem.hasChildren && dataItem.number.length > 3){
                    result = `<span style='font-weight: bolder;'>${dataItem.number} - ${name}</span>`;
                }

                return result;
            },
			// On Reporint Language Changes
			onReportingLanguageChanges () {
                this.fieldName = "name";
                if(this.reportingLanguage === "local"){
                    this.fieldName = "local_name";
                }

                // Generate column with new language
                this.generateColumn();
			},
        },
        computed: {
            ...mapGetters({
                getTreeListByAccountIds: 'accounts/treeListByAccountIds',
                getSegmentById: 'segments/getById',
            }),
        },
        created () {
            this.initialize();
        },
    };
</script>

<style scoped>
    .theme--light.v-data-table {
        background-color: transparent !important;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
        border-right: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .v-data-table.simple1_table.theme--light,
    .v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
        border-top: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .v-data-table.simple_table.theme--light{
        border-left: thin solid rgba(0, 0, 0, 0.12) !important;
        border-right: thin solid rgba(0, 0, 0, 0.12) !important;
    }

    .theme--light.v-data-table.simple1_table > .v-data-table__wrapper > table > thead > tr:last-child > th:last-child{
        border-right: none !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }

    .border-bottom {
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }

    .font-small {
        font-size: 12px;
        line-height: 15px;
    }

    .font-26 {
        font-size: 26px !important;
    }
    .v-data-table.simple_table.theme--light{
        border-top: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th{
        border-bottom: none !important;
        border-right: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th{
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
        border-right: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:last-child,
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:last-child,
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:last-child{
        border-right: none !important;
    }


    .v-data-table.table_list > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
        border-right: none !important;
    }
    .v-data-table.table_list.theme--light > .v-data-table__wrapper > table > tbody > tr:first-child > td{
        border-top: none !important;
    }

    @media (max-width: 576px) {

    }
</style>