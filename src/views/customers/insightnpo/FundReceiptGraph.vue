<template>
    <div>
        <LoadingMe
            :isLoading="showLoading"
            :fullPage="false"
            :myLoading="true"
            :type="'loading'"
        />

        <chart ref="chart"
            :data-source="transactionList"
            :legend-visible="false"
            :chart-area-background="''"
            :series-defaults-type="'line'"
            :series-defaults-style="'smooth'"
            :value-axis-line-visible="false"
            :category-axis-major-grid-lines-visible="false"
            :category-axis-labels-rotation="'auto'"
            :category-axis-labels-template="categoryTemplate"
            :tooltip-visible="true"
            :tooltip-template="tooltiptemplate"
            :series="series"
            :theme="'sass'" />
    </div>
</template>

<script>
import kendo from '@progress/kendo-ui';
import { i18n } from "@/i18n";
import Helper from "@/helper.js";
import { Chart } from '@progress/kendo-charts-vue-wrapper';

const JournalHandler = require("@/scripts/journalHandler");
const EntityType = require("@/scripts/default_setup/EntityType");
const AccountTypeCode = require("@/scripts/default_setup/AccountTypeCode");

export default {
    name: 'FundReceiptGraph',
    components: {
        'chart': Chart,
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: function() {
        return {
            transactions : [],
            transactionList : [],
            series: [{
                field: 'amount',
                categoryField: "month_of",
            }],
            categoryTemplate: "#: kendo.toString(new Date(value), 'MMM') #",
            tooltiptemplate: "#= kendo.toString(new Date(dataItem.month_of), 'MMMM') #: #= kendo.toString(value, 'n') #",
            showLoading : false,
        }
    },
    methods: {
        initialize(){
            this.showLoading = true;
            JournalHandler.getJournalByTransactionType(EntityType.FUND_RECEIPT, {
                params: {
                    as_of_date: new Date().toISOString().substr(0, 10) + "T23:59:59.999Z",
                },
            })
            .then((res)=>{
                if(res){
                    this.transactions = res.data;
                    this.bindData();
                }else{
                    this.$snotify.error(i18n.t("error_something_wrong"));
                }
            })
            .finally(()=>{
                this.showLoading = false;
            });
        },
        bindData(){
            let g = {},
                fiscalDate = Helper.getFiscalDateByDate(new Date()),
                sdate = new Date(fiscalDate.start_date),
                edate = new Date(fiscalDate.end_date);

            /* Set default 12 months */
            while (sdate <= edate) {
                let d = kendo.toString(sdate, "yyyy-MM");
                g[d] = {
                    month_of : d,
                    amount : 0,
                }

                // Next Month
                sdate.setMonth(sdate.getMonth() + 1);
            }

            this.transactions.forEach(value => {
                /* Filter Revenue Accounts */
                if(value.account.type_code === AccountTypeCode.REVENUE){
                    g[value.journal.month_of].amount += value.amount * -1; /* Reverse negative amount of Cr */
                }
            });

            /* Bind data */
            this.transactionList = Object.values(g);
        }
    },
    mounted(){
        this.initialize();
    }
}
</script>