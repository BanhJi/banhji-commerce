<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    type="loading"
                    :myLoading="true">

                </LoadingMe>
                <v-row>
                    <v-col sm="4" cols="12" class="py-0">
                        <v-select class="mt-1"
                                  :items="dateSorters"
                                  v-model="mDateSorter"
                                  @change="onSorterChanges"
                                  clearable
                                  outlined
                                  placeholder="ALL"
                        />
                    </v-col>

                    <v-col sm="3" cols="12" class="py-0">
                        <app-datepicker :initialDate="startDate" @emitDate="startDate = $event"/>
                    </v-col>

                    <v-col sm="3" cols="12" class="py-0">
                        <app-datepicker :initialDate="endDate" @emitDate="endDate = $event"/>
                    </v-col>

                    <v-col sm="1" cols="1" class="pt-1">
                        <v-btn color="primary white--text" @click="searchTransaction">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <kendo-datasource ref="gridTransactionDS"
                                              :type="'JSON'"
                                              :data="transactions"
                                              :group="group"
                                              :server-paging="false"/>
                            <kendo-grid id="gridTransaction" class="grid-function"
                                        :data-source-ref="'gridTransactionDS'"
                                        :editable="false"
                                        :groupable="true"
                                        :column-menu="true"
                                        :noRecords="true"
                                        @pagechange="pageChangeHandler"
                                        :toolbar="['excel']"
                                        :resizable="true"
                                        :excel-file-name="'SaleAnalysisByCustomer.xlsx'"
                                        :excel-filterable="true"
                                        :excel-all-pages="true"
                                        :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'transactionDate'"
                                    :title="$t('date')"
                                    :width="120"
                                    :template="'<span>#=kendo.toString(new Date(transactionDate), dateFormat)#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'taxType'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('tax_type')"
                                    :width="200"
                                    :hidden="true"
                                    :template="'<span>#=taxType#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'taxName'"
                                    :title="$t('tax_name')"
                                    :width="200"
                                    :attributes="{style: 'text-align: left; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'taxRate'"
                                    :title="$t('tax_rate')"
                                    :width="120"
                                    :attributes="{style: 'text-align: center'}"
                                    :template="'<span>#=kendo.toString(taxRate, decimalFormat)# %</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'exchangeTaxAmount'"
                                    :title="$t('tax_amount')"
                                    :width="200"
                                    :template="taxAmountTemplate"
                                    :attributes="{style: 'text-align: right'}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'type'"
                                    :title="$t('type')"
                                    :width="200"
                                    :template="'<span>#=type#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'name'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('name')"
                                    :width="200"
                                    :template="'<span>#=name#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'referenceNo'"
                                    :title="$t('num')"
                                    :width="180"
                                    :template="referenceTemplate"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'nature'"
                                    :title="$t('nature')"
                                    :width="180"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'exchangeAmount'"
                                    :title="$t('amount')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#=kendo.toString(exchangeAmount, decimalFormat)#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'exchangeDiscount'"
                                    :title="$t('discount')"
                                    :width="180"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#=kendo.toString(exchangeDiscount, decimalFormat)#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>


                            </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";

const dashboardHandler = require("@/scripts/dashboard/customer/handler/dashboardHandler");

import JSZip from "jszip";

window.JSZip = JSZip;
export default {
    name: "SaleTaxTransaction",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': () => import(`@/components/custom_templates/DatePickerComponent`)
    },
    data: () => ({
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters:['Today', 'This Week', 'This Month', 'This Year', 'Last Month' , 'Last Year'],
        mDateSorter: 'Today',
        showLoading: false,
        transactions: [],
        saleFormContent: {},
        isLoaded: false,
        group: {field: 'taxName'},
    }),
    methods: {
        taxAmountTemplate(dataItem) {
            const type = dataItem.type || '';
            let amount = dataItem.exchangeTaxAmount || 0
            if (type === 'Credit Memo') {
                amount = amount * -1
            }
            if (amount) {
                return `<span>${kendo.toString(amount, dataItem.decimalFormat)}</span>`;
            } else {
                return kendo.toString(0, dataItem.decimalFormat);
            }
        },
        pageChangeHandler: function (event) {
            alert("change", event);
        },
        onSorterChanges(val) {
            let today = new Date()
            switch (val) {
                case "Today":
                    this.startDate = kendo.toString(today, 'yyyy-MM-dd')
                    this.endDate = kendo.toString(today, 'yyyy-MM-dd')

                    break
                case "This Week":
                    var first = today.getDate() - today.getDay(),
                        last = first + 6

                    this.startDate = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
                    today = new Date()
                    this.endDate = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')

                    break
                case "This Month":
                    this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')

                    break
                case "This Year":
                    this.startDate = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')
                 break
                case "Last Month":
                  this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), -30), 'yyyy-MM-dd');
                  this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth() -1, +31), 'yyyy-MM-dd');
        
                  break
                case "Last Year":
                  this.startDate = kendo.toString(new Date(today.getFullYear(), -11, -30), 'yyyy-MM-dd');
                  this.endDate = kendo.toString(new Date(today.getFullYear(), -1, +31), 'yyyy-MM-dd');
                    break
                default:
                    this.startDate = ""
                    this.endDate = ""
            }
        },
        numberFormat(value) {
            return kendo.toString(value, `n${this.saleFormContent.decimal}`)
        },
        referenceTemplate(data) {
            let url = ''
            if (data.type === 'Invoice') {
                url = `invoice_view/${data.id}`
            } else if (data.type === 'Sale Deposit') {
                url = `sale_deposit_view/${data.id}`
            } else if (data.type === 'Purchase') {
                url = `credit_purchase_view/${data.id}`
            } else if (data.type === 'Sale Quote') {
                url = `sale_quote_view/${data.id}`
            } else if (data.type === 'Cash Receipt') {
                url = `cash_receipt_view/${data.id}`
            } else if (data.type === 'Sale Order') {
                url = `sale_order_view/${data.id}`
            } else if (data.type === 'Purchase Deposit') {
                url = `purchase_deposit_view/${data.id}`
            } else if (data.type === 'Credit Memo') {
                url = `sale_return_view/${data.id}`
            } else if (data.type === 'Debit Memo') {
                url = `purchase_return_view/${data.id}`
            } else if (data.type === 'Cash Payment') {
                url = `cash_payment_view/${data.id}`
            } else if (data.type === 'Sale Lead') {
                url = `lead/${data.id}`
            }

            let args = {
                text: data.referenceNo,
                url: url,
                data: data,
            }
            return {
                template: LinkTemplate,
                templateArgs: args
            }
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridTransactionDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
        },
        async searchTransaction() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    const startDate = this.startDate
                    const endDate = this.endDate
                    let strFilter = '?start=' + startDate + '&end=' + endDate
                    dashboardHandler.saleTaxDetail(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            this.transactions = res.data.data
                            this.showLoading = false
                        } else {
                            this.showLoading = false
                        }
                    })
                }, 10);
            })
        },
    },
    mounted: async function () {
        await this.searchTransaction()
    },
    computed: {},
    watch: {
        // '$route': 'callback'
    }
};
</script>
<style scoped>
.k-pdf-export .k-grid {
    font-family: "DejaVu Sans", "Arial", sans-serif;
}

/* Hide the Grid header and pager during export */
.k-pdf-export .k-grid-toolbar,
.k-pdf-export .k-pager-wrap {
    display: none;
}

</style>