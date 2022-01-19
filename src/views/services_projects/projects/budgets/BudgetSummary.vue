<template>
    <div id="grid"></div>
</template>

<script>
    import kendo from '@progress/kendo-ui';
    import {i18n} from '@/i18n'
    import Helper from "@/helper.js";
    /* Models */
    import BudgetModel from "@/scripts/model/Budget.js";
    import AccountModel from "@/scripts/model/Account.js";

    const accountHandler = require("@/scripts/handler/accounting/account.js");
    const OrderNumberPL = require("@/scripts/default_setup/OrderNumberPL.js");
    const NumberInWord = require("@/scripts/default_setup/NumberInWord.js");
    const AccountTypeCode = require("@/scripts/default_setup/AccountTypeCode.js");

    export default {
        name: "BudgetSummary",
        props: {
            initBudget: {
                type: BudgetModel,
            },
        },
        data: () => ({
            budget : new BudgetModel(),
        }),
        methods: {
            /* Load Data */
            async loadData () {
                /* Bind Budget */
                this.budget = this.initBudget;

                /* Set Current Fiscal Date */
                let currencyFiscalDate = Helper.getFiscalDateByDate(new Date());
                let fiscalMonths = Helper.generateFiscalMonths(currencyFiscalDate.start_date, currencyFiscalDate.end_date, "12");

                let entries = [];
                let Entry = kendo.data.Model.define({
                    id: "uuid", // the identifier of the model
                    fields: {
                        "month_name": { type: "number", defaultValue: '' },
                        "rev": { type: "number", defaultValue: 0 },
                        "cogs": { type: "number", defaultValue: 0 },
                        "ope_exp": { type: "number", defaultValue: 0 },
                        "oth_exp_dep": { type: "number", defaultValue: 0 },
                        "oth_rev": { type: "number", defaultValue: 0 },
                        "fin_cost_tax": { type: "number", defaultValue: 0 },
                        "net_income": { type: "number", defaultValue: 0 },
                    }
                });

                // Load Account List
                let accounts = await accountHandler.getAll();

                /* Total */
                let totalEntry = new Entry();
                totalEntry.month_name = "Total";
                
                /* Gathering from line */
                this.budget.lines.forEach(value => {
                    /* Set Account Information */
                    let account = new AccountModel(accounts.data.find(item => item.uuid === value.account_uuid));

                    /* Reverse Nature */
                    let nature = 1; /* Default Naure is Dr = 1 */
                    if(account.account_type.nature.toLowerCase() === "cr"){
                        nature = -1;
                    }

                    /* Revenue */
                    if(account.account_type.number === AccountTypeCode.REVENUE){
                        totalEntry.rev += value.amount * nature;
                    }

                    /* COGS */
                    if(account.account_type.number === AccountTypeCode.COGS){
                        totalEntry.cogs += value.amount * nature;
                    }

                    /* Other Expense & Depreciations */
                    if(account.account_type.number === AccountTypeCode.OTHER_EXPENSE || account.account_type.number === AccountTypeCode.DEPRECIATION){
                        totalEntry.oth_exp_dep += value.amount * nature;
                    }

                    /* Other Revenue */
                    if(account.account_type.number === AccountTypeCode.OTHER_REVENUE){
                        totalEntry.oth_rev += value.amount * nature;
                    }

                    /* Financing Cost & Tax */
                    if(account.account_type.number === AccountTypeCode.FINANCING_COST || account.account_type.number === AccountTypeCode.TAX){
                        totalEntry.fin_cost_tax += value.amount * nature;
                    }
                });

                /* Gathering from budget estimations */
                this.budget.budget_estimations.forEach(value => {
                    /* Operating Expense */
                    if(value.account_type_number === OrderNumberPL.OperatingExpense.number){
                        totalEntry.ope_exp += value.balance;
                    }

                    /* Profit For The Period */
                    if(value.account_type_number === OrderNumberPL.ProfitForThePeriod.number){
                        totalEntry.net_income += value.balance;
                    }
                });
                
                /* Add to entries */
                entries.push(totalEntry);
                /* End Total */

                /* Monthly */
                let monthEntries = [];
                for (let i = 0; i < 12; i++) {
                    let monthEntry = new Entry();

                    /* Month Name */
                    monthEntry.month_name = fiscalMonths[i];

                    /* Add Entry */
                    monthEntries.push(monthEntry);
                }

                /* Gathering from line */
                this.budget.lines.forEach(value => {
                    /* Set Account Information */
                    let account = new AccountModel(accounts.data.find(item => item.uuid === value.account_uuid));

                    /* Reverse Nature */
                    let nature = 1; /* Default Naure is Dr = 1 */
                    if(account.account_type.nature.toLowerCase() === "cr"){
                        nature = -1;
                    }

                    for (let i = 0; i < 12; i++) {
                        /* Revenue */
                        if(account.account_type.number === AccountTypeCode.REVENUE){
                            monthEntries[i].rev += value.monthly_amount[i].amount * nature;
                        }

                        /* COGS */
                        if(account.account_type.number === AccountTypeCode.COGS){
                            monthEntries[i].cogs += value.monthly_amount[i].amount * nature;
                        }

                        /* Other Expense & Depreciations */
                        if(account.account_type.number === AccountTypeCode.OTHER_EXPENSE || account.account_type.number === AccountTypeCode.DEPRECIATION){
                            monthEntries[i].oth_exp_dep += value.monthly_amount[i].amount * nature;
                        }

                        /* Other Revenue */
                        if(account.account_type.number === AccountTypeCode.OTHER_REVENUE){
                            monthEntries[i].oth_rev += value.monthly_amount[i].amount * nature;
                        }

                        /* Financing Cost & Tax */
                        if(account.account_type.number === AccountTypeCode.FINANCING_COST || account.account_type.number === AccountTypeCode.TAX){
                            monthEntries[i].fin_cost_tax += value.monthly_amount[i].amount * nature;
                        }
                    }
                });
                
                /* Gathering from budget estimations */
                this.budget.budget_estimations.forEach(value => {
                    for (let i = 0; i < 12; i++) {
                        let property = NumberInWord[i];
                        
                        /* Operating Expense */
                        if(value.account_type_number === OrderNumberPL.OperatingExpense.number){
                            monthEntries[i].ope_exp += value[property];
                        }

                        /* Profit For The Period */
                        if(value.account_type_number === OrderNumberPL.ProfitForThePeriod.number){
                            monthEntries[i].net_income += value[property];
                        }
                    }
                });

                /* Add to entries */
                monthEntries.forEach(value => {
                    entries.push(value);
                });
                /* End Monthly */

                /* Styles */
                let headerAttributes = {
                        "class": "table-header-cell",
                        style: "text-align: right; font-size: 14px"
                    },
                    attributes = {
                        "class": "table-cell",
                        style: "text-align: right; font-size: 14px"
                    };
                
                kendo.jQuery("#grid").kendoGrid({
                    dataSource: {
                        data: entries,
                        pageSize: 20,
                    },
                    scrollable:true,
                    columns: [
                        {
                            field: "month_name",
                            title: i18n.t('monthly'),
                            headerAttributes: headerAttributes,
                            attributes: attributes,
                        },
                        {
                            field: "rev",
                            title: i18n.t('revenue'),
                            format: "{0:n}",
                            headerAttributes: headerAttributes,
                            attributes: attributes,
                        },
                        {
                            field: "cogs",
                            title: i18n.t('cost_of_goods_sold'),
                            format: "{0:n}",
                            headerAttributes: headerAttributes,
                            attributes: attributes,
                        },
                        {
                            field: "ope_exp",
                            title: i18n.t('operating_expenses'),
                            format: "{0:n}",
                            headerAttributes: headerAttributes,
                            attributes: attributes,
                        },
                        {
                            field: "oth_exp_dep",
                            title: i18n.t('other_expenses_&_depreciations'),
                            format: "{0:n}",
                            headerAttributes: headerAttributes,
                            attributes: attributes,
                        },
                        {
                            field: "oth_rev",
                            title: i18n.t('other_revenues'),
                            format: "{0:n}",
                            headerAttributes: headerAttributes,
                            attributes: attributes,
                        },
                        {
                            field: "fin_cost_tax",
                            title: i18n.t('financing_cost_&_tax'),
                            format: "{0:n}",
                            headerAttributes: headerAttributes,
                            attributes: attributes,
                        },
                        {
                            field: "net_income",
                            title: i18n.t('net_income'),
                            format: "{0:n}",
                            headerAttributes: headerAttributes,
                            attributes: attributes,
                        },
                    ]
                });
			},
        },
        watch: {
            initBudget () {
                this.loadData();
            },
        },
    };
</script>

<style scoped>
</style>