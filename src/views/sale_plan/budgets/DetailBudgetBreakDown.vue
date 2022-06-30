<template>
 <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
        <v-card color="white" class="pa-3 no_border" elevation="0">
            <v-row>
                <v-col sm="5" cols="12" class="py-0">
                    <h3 class="text-left mb-1 font_20 line_24">{{$t('detail_budget_breakdown')}}</h3>
                    <p class="mb-0">{{$t('a_detail_breakdown_of_budget_by_months')}}</p>
                </v-col>
                <v-col sm="7" cols="12">
                    <!-- Reporting Language -->
                    <!-- <label class="mb-1">{{$t('reporting_language')}}:</label> -->
                    <app-reporting-language 
                        :initLanguage="reportingLanguage" 
                        @emitLanguage="reportingLanguage = $event"
                        @onChanged="onReportingLanguageChanges" />
                </v-col>
            </v-row>
            
            <!-- Search -->
            <v-row class="mt-0">
                <v-col sm="4" cols="12" class="pr-0">
                    <label class="mb-1">{{$t('select_fiscal_date')}}:</label>
                    <app-fiscal-date-dropdownlist
                        :initFiscalDate="fiscalDate"
                        @emitFiscalDate="fiscalDate = $event"
                    />
                </v-col>
        
                <v-col sm="4" cols="12" class="pr-0">
                    <label class="mb-1">{{$t('select_budget')}}:</label>
                    <budget-dropdownlist
                        :initFiscalDateId="fiscalDate.uuid"
                        :initDimension="dimension"
                        :initBudget="budget"
                        @emitBudget="budget = $event"
                    />
                </v-col>
                <v-col sm="1" cols="12" class="py-0 pt-9">
                    <v-btn
                        class="white--text"
                        color="primary"
                        @click="search"
                    >
                        <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                    </v-btn>
                </v-col>
            </v-row>


            <!-- Summary -->
            <v-row class="mt-0">
                <v-col class="pt-0" sm="6" cols="12">
                    <template>
                        <v-simple-table class="table_list nomal_table">
                            <template>
                                <tbody>
                                <tr>
                                    <td style="width: 45%;font-weight: 900">{{$t('budget_name')}}:</td>
                                    <td class="">{{ summary.name }}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: 900">{{ $t("segment") }}:</td>
                                    <td class="" v-if="summary.segment">{{ summary.segment.name }}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: 900">{{ $t("fiscal_year") }}:</td>
                                    <td class="" v-if="summary.fiscal_year">{{ kendo.toString(new Date(summary.fiscal_year.start_date), `yyyy`) }}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: 900">{{$t('used_for_consolidation')}}</td>
                                    <td class="">{{ summary.use_consolidation === 1 ? 'Yes' : 'No' }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                </v-col>
                <v-col class="pt-0" sm="6" cols="12">
                    <template>
                        <v-simple-table class="table_list nomal_table">
                            <template>
                                <tbody>
                                <tr>
                                        <td style="font-weight: 900">{{ $t("created_by") }}:</td>
                                        <td v-if="summary.created_by.email">
                                            {{summary.created_by.email}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: 900">{{ $t("created_on") }}:</td>
                                        <td v-if="summary.created_date">
                                            {{ Helper.dateFormat(summary.created_date) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: 900">{{ $t("last_edited_on") }}:</td>
                                        <td>{{ summary.modified_date }}</td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: 900">{{ $t("last_edited_by") }}:</td>
                                        <td class="" v-if="summary.modified_by.email">{{summary.modified_by.email}}</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                </v-col>
            </v-row>
            
            <!-- Table -->
            <v-row>
                <v-col sm="12" cols="12" class="pt-1">
                    <template>
                        <treelistdatasource 
                            ref="budgetLineDS"
                            :data="budgetLines"
                            :sort="sortDefinition"
                            :schema-model="model" />

                        <treelist 
                            ref="budgetLineTreeList"
                            data-source-ref="budgetLineDS"
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
    import BudgetExtendedModel from "@/scripts/model/BudgetExtended.js";
    import FiscalDateModel from "@/scripts/model/FiscalDate";
    import StatementOfProfitOrLossModel from "@/scripts/model/StatementOfProfitOrLoss";

    /* Vuex */
    import { mapGetters } from 'vuex';

    import { TreeList } from '@progress/kendo-treelist-vue-wrapper';
    import { TreeListDataSource } from '@progress/kendo-datasource-vue-wrapper';
    
    const OrderNumberPL = require("@/scripts/default_setup/OrderNumberPL.js");
    const NumberInWord = require("@/scripts/default_setup/NumberInWord.js");
    const AccountTypeCode = require("@/scripts/default_setup/AccountTypeCode.js");
    const Dimensions = require("@/scripts/default_setup/Dimensions.js");

    export default {
        components:{
            "LoadingMe": () => import('@/components/Loading'),
            "app-fiscal-date-dropdownlist": () => import('@/components/kendo_templates/FiscalDateDropDownList'),
            'budget-dropdownlist': () => import('@/components/dropdownlist/Budget'),
            'app-reporting-language': () => import('@/components/kendo_templates/ReportingLanguageDropDownList'),
            'treelist': TreeList,
            'treelistdatasource': TreeListDataSource,
        },
        data: () => ({
            fiscalDate : new FiscalDateModel(),
            budget : new BudgetExtendedModel(),
            summary : new BudgetExtendedModel(),
            budgetLines : [],
            dimension: Dimensions.SEGMENT,
            Helper : Helper,
            /* Kendo */
            kendo : kendo,
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
            /* Search */
            search (){
                let ds = this.$refs.budgetLineDS.kendoWidget();
                ds.data([]);

                if(this.budget.uuid !== ""){
                    this.bindData();
                }else{
                    this.$snotify.warning(i18n.t("please_select_budget"));
                }
            },
            /* Bind Data */
            bindData () {
                this.showLoading = true;

                /* Information */
                this.budget.segment = this.getSegmentById(this.budget.segment_uuid);
                this.summary = new BudgetExtendedModel(this.budget);

                let entries = [], accountIds = [];

                /* AccountIds */
                this.budget.lines.forEach(value => {
                    accountIds.push(value.account_uuid);
                });

                /* Budget Lines */
                let accounts = this.getTreeListByAccountIds(accountIds);
                accounts.forEach(value => {
                    /* Order */
                    let order = value.type_code;
                    if(value.type_code === AccountTypeCode.OTHER_REVENUE){
                        order = OrderNumberPL[value.type_code];
                    }

                    /* Define Line */
                    let line = new StatementOfProfitOrLossModel({
                        uuid : value.uuid,
                        number : value.number,
                        name : value.name,
                        local_name : value.local_name,
                        order : order,
                        parentId : value.parentId,
                    });

                    /* Child Level */
                    if(value.parentId !== null){
                        /* Get a budget line */
                        let budgetLine = this.budget.lines.find((item) => item.account_uuid === value.uuid);
                        if(budgetLine){
                            /* Reverse Nature */
                            let nature = 1;
                            if(value.account_type.nature.toLowerCase() === "cr"){
                                nature = -1;
                            }

                            /* Balance */
                            line.balance = budgetLine.amount * nature;

                            /* 12 months in number */
                            for (let i = 0; i < 12; i++) {
                                let propertyName = NumberInWord[i];
                                line[propertyName] = budgetLine.monthly_amount[i].amount * nature;
                            }
                        }
                    }
                    
                    /* Add Line */
                    entries.push(line);
                });

                /* Budget Estimations */
                this.budget.budget_estimations.forEach(value => {
                    if(value.account_type_number >= 100 && value.account_type_number <= 105){
                        let line = new StatementOfProfitOrLossModel({
                            uuid: value.account_type_number,
                            name: value.name,
                            local_name: value.local_name,
                            order: OrderNumberPL[value.account_type_number],
                        });

                        /* Add Line */
                        entries.push(line);
                    }
                });
                
                /* Parent aggregate sum */
                for (let i = 0; i < entries.length; i++) {
                    let entry = entries[i];
                    
                    if(~accountIds.indexOf(entry.uuid)){
                        let parentId = entry.parentId;
                        while(parentId !== null){
                            if(parentId){
                                let parent = entries.find((item) => item.uuid === parentId);
                                if(parent){
                                    /* Budget */
                                    parent.balance += entry.balance;

                                    for (let j = 0; j < 12; j++) {
                                        let propertyName = NumberInWord[j];
                                        parent[propertyName] += entry[propertyName];
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
                    grossProfit = entries.find((i)=>i.uuid === AccountTypeCode.GROSS_PROFIT);

                /* EBITDA */
                let salaryBenefit = this.getEntry(entries, AccountTypeCode.SALARY_BENEFIT),
                    saleMarketing = this.getEntry(entries, AccountTypeCode.SALE_MARKETING),
                    researchProductDevelopment = this.getEntry(entries, AccountTypeCode.RESEARCH_PRODUCT_DEVELOPMENT),
                    legalProfessionalFee = this.getEntry(entries, AccountTypeCode.LEGAL_PROFESSIONAL_FEE),
                    generalAdminExpenses = this.getEntry(entries, AccountTypeCode.GENERAL_ADMIN_EXPENSE),
                    operatingExpenses = entries.find((i)=>i.uuid === AccountTypeCode.OPERATING_EXPENSE),
                    otherRevenue = this.getEntry(entries, AccountTypeCode.OTHER_REVENUE),
                    operatingIncomeEBITDA = entries.find((i)=>i.uuid === AccountTypeCode.OPERATING_INCOME_EBITDA);

                /* EBIT */
                let depreciation = this.getEntry(entries, AccountTypeCode.DEPRECIATION),
                    otherExpenses = this.getEntry(entries, AccountTypeCode.OTHER_EXPENSE),
                    earningBeforeInterestAndTaxEBIT = entries.find((i)=>i.uuid === AccountTypeCode.EARNING_BEFORE_INTEREST_AND_TAX_EBIT);

                /* Profit Before Tax */
                let financingCost = this.getEntry(entries, AccountTypeCode.FINANCING_COST),
                    profitBeforeTax = entries.find((i)=>i.uuid === AccountTypeCode.PROFIT_BEFORE_TAX);

                /* Profit For The Period */
                let taxRelatedExpenses = this.getEntry(entries, AccountTypeCode.TAX),
                    profitForThePeriod = entries.find((i)=>i.uuid === AccountTypeCode.PROFIT_FOR_THE_PERIOD);

                /* BUDGET */
                grossProfit.balance = revenue.balance - costOfSale.balance;
                operatingExpenses.balance = salaryBenefit.balance + saleMarketing.balance + researchProductDevelopment.balance + legalProfessionalFee.balance + generalAdminExpenses.balance;
                operatingIncomeEBITDA.balance = (grossProfit.balance + otherRevenue.balance) - operatingExpenses.balance;
                earningBeforeInterestAndTaxEBIT.balance = operatingIncomeEBITDA.balance - depreciation.balance - otherExpenses.balance;
                profitBeforeTax.balance = earningBeforeInterestAndTaxEBIT.balance - financingCost.balance;
                profitForThePeriod.balance = profitBeforeTax.balance - taxRelatedExpenses.balance;

                /* BIND STATMENT */
                this.budgetLines = entries;
                this.generateColumn();

                this.showLoading = false;
			},
            getEntry(entries, id){
                return new StatementOfProfitOrLossModel(entries.find(i=>i.uuid === id));
            },
            /* Templates */
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
			generateColumn () {
                let headerAttributes = {
                        "class": "table-header-cell",
                        style: "text-align: right; font-size: 14px"
                    },
                    attributes = {
                        "class": "table-cell",
                        style: "text-align: right; font-size: 14px"
                    };

                /* Columns */
				let columns = [
					{ 
						field: this.fieldName, 
						title: i18n.t('account'),
                        template: this.nameTmpl,
						locked: true,
						width:300
					},
                    { 
                        field: "balance",
                        title: i18n.t('total'),
                        format: "{0:n}",
                        width:150,
                        headerAttributes: headerAttributes,
                        attributes: attributes,
                    }
                ];

                let fiscalMonths = Helper.generateFiscalMonths(this.fiscalDate.start_date, this.fiscalDate.end_date, "12", "yyyy-MM");
                for (let i = 0; i < 12; i++) {
                    columns.push({ 
                        field: NumberInWord[i],
                        title: kendo.toString(new Date(fiscalMonths[i]), "MMM yyyy"),
                        format: "{0:n}",
                        width: 150,
                        headerAttributes: headerAttributes,
                        attributes: attributes,
                    })
                }

                /* Set Columns */
                this.columns = columns;
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