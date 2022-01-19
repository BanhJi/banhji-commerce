<template>
    <v-row>
        <v-col sm="12" cols="12" class="">
            <v-card color="white" class="px-3 no_border" elevation="0">
                <!-- loading -->
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    :myLoading="true"
                    :type="'loading'"
                >
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
                        <v-btn color="primary white--text" @click="searchTransaction('')">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row class="mt-0">
                    <v-col sm="3" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border rounded-4 white--text" color="third"
                                height="60px"
                                @click="searchTransaction('Invoice')">
                            <h3 class="text-left flex-1 font_12 text-uppercase">{{ $t('total_revenue') }}</h3>
                            <h3 class="font_20 mt-0 flex-1 text-right white--text">{{ numberFormat(totalRevenue) }}</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="3" cols="12" class="pt-0">
                        <v-card outlined dense color="third" class="pa-3 rounded-4 no_border white--text" height="60px"
                                @click="searchTransaction('Sale Lead')">
                            <h3 class="text-left flex-1 font_12 text-uppercase">{{ $t('open_lead') }}</h3>
                            <h3 class="font_20 mt-0 flex-1 text-right white--text">{{
                                    numberFormat(totalSaleLead)
                                }}</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="3" cols="12" class="pt-0">
                        <v-card outlined dense color="third" class="pa-3 rounded-4 no_border white--text" height="60px"
                                @click="searchTransaction('Sale Quote')">
                            <h3 class="text-left flex-1 font_12 text-uppercase">{{ $t('open_sale_quote') }}</h3>
                            <h3 class="font_20 mt-0 flex-1 text-right white--text">{{
                                    numberFormat(totalSaleQuote)
                                }}</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="3" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border white--text" color="third" height="60px"
                                @click="searchTransaction('Sale Order')">
                            <h3 class="text-left flex-1 font_12 text-uppercase">{{ $t('open_sale_order') }}</h3>
                            <h3 class="font_20 mt-0 flex-1 text-right white--text">{{
                                    numberFormat(totalSaleOrder)
                                }}</h3>
                        </v-card>
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
                                        :filterable="true"
                                        :noRecords="true"
                                        :resizable="true"
                                        @pagechange="pageChangeHandler"
                                        :excel-file-name="'Sale By Product/Service.xlsx'"
                                        :excel-filterable="true"
                                        :excel-all-pages="true"
                                        :toolbar="['excel']"
                                        :excel-export="excelExport"
                                        :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'name'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('customer')"
                                    :width="200"
                                    :group-header-template="'#=value#'"
                                    :filterable-multi="true"
                                    :filterable-search="true"
                                    :template="'<span>#=name#</span>'"
                                    :group-footer-template="'Total: '"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'transactionDate'"
                                    :title="$t('date')"
                                    :width="120"
                                    :filterable="false"
                                    :template="dateFormat"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'referenceNo'"
                                    :title="$t('reference_no')"
                                    :width="150"
                                    :template="referenceTemplate"
                                    :filterable="false"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'item'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('item')"
                                    :width="200"
                                    :group-header-template="'#=value#'"
                                    :filterable-multi="true"
                                    :filterable-search="true"
                                    :template="'<span>#=item#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'category'"
                                    :title="$t('category')"
                                    :width="120"
                                    :hidden="true"
                                    :filterable-multi="true"
                                    :filterable-search="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>

                                <kendo-grid-column
                                    :field="'transactionType.name'"
                                    :title="$t('type')"
                                    :width="120"
                                    :hidden="true"
                                    :filterable-multi="true"
                                    :filterable-search="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'qty'"
                                    :title="$t('qty')"
                                    :width="100"
                                    :filterable="false"
                                    :attributes="{style: 'text-align: right; '}"
                                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                                    :footerAttributes="{ style: 'text-align: right;'}"
                                    :aggregates="['sum']"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5; text-align:right'  }"/>
                                <kendo-grid-column
                                    :field="'uom'"
                                    :title="$t('uom')"
                                    :width="140"
                                    :filterable="false"
                                    :attributes="{style: 'text-align: center; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5; text-align:center' }"/>
                                <kendo-grid-column
                                    :field="'price'"
                                    :title="$t('price')"
                                    :width="150"
                                    :template="'<span>#=kendo.toString(price, decimalFormat)#</span>'"
                                    :filterable="false"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5; text-align:right' }"/>
                                <kendo-grid-column
                                    :field="'modifierExchangePrice'"
                                    :title="$t('modifier')"
                                    :width="150"
                                    :template="'<span>#=kendo.toString(modifierExchangePrice, decimalFormat)#</span>'"
                                    :filterable="false"
                                    :attributes="{style: 'text-align: right; '}"
                                    :footerAttributes="{ style: 'text-align: right;'}"
                                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                                    :aggregates="['sum']"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5; text-align:right' }"/>
                                <kendo-grid-column
                                    :field="'discountExchangeAmount'"
                                    :title="$t('discount')"
                                    :width="150"
                                    :template="'<span>#=kendo.toString(discountExchangeAmount, decimalFormat)#</span>'"
                                    :filterable="false"
                                    :attributes="{style: 'text-align: right; '}"
                                    :footerAttributes="{ style: 'text-align: right;'}"
                                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                                    :aggregates="['sum']"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5; text-align:right' }"/>
                                <kendo-grid-column
                                    :field="'amount'"
                                    :title="$t('amount')"
                                    :width="150"
                                    :filterable="false"
                                    :attributes="{style: 'text-align: right; '}"
                                    :group-footer-template="'#= kendo.toString(sum, `n2`)#'"
                                    :footerAttributes="{ style: 'text-align: right;'}"
                                    :aggregates="['sum']"
                                    :template="'<span>#=kendo.toString(amount, decimalFormat)#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5; text-align:right' }"/>
                                <kendo-grid-column
                                    :field="'marginRate'"
                                    :title="$t('%margin')"
                                    :width="180"
                                    :filterable="false"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#=kendo.toString(marginRate, decimalFormat)#</span>%'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5; text-align:right' }"/>
                                <kendo-grid-column
                                    :field="'segment.name'"
                                    :title="$t('segment')"
                                    :width="200"
                                    :filterable-multi="true"
                                    :filterable-search="true"
                                    :attributes="{style: 'text-align: left; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'location.name'"
                                    :title="$t('location')"
                                    :width="200"
                                    :filterable-multi="true"
                                    :filterable-search="true"
                                    :attributes="{style: 'text-align: left; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'project.name'"
                                    :title="$t('project')"
                                    :width="200"
                                    :filterable-multi="true"
                                    :filterable-search="true"
                                    :attributes="{style: 'text-align: left; '}"
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

const billingHandler = require("@/scripts/invoice/handler/billingHandler")
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
    name: "SaleAnalysisProductServiceItems",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': () => import(`@/components/custom_templates/DatePickerComponent`)
        // BankConnection,
    },
    data: () => ({
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
        mDateSorter: 'Today',
        showLoading: false,
        transactions: [],
        aggregateDefinition:
            [{field: 'amount', aggregate: 'sum'},
                {field: 'qty', aggregate: 'sum'},
                {field: 'discountExchangeAmount', aggregate: 'sum'},
                {field: 'modifierExchangePrice', aggregate: 'sum'},

            ],
        group: [],
        schemaModelFields: {
            id: {type: "number"},
            name: {type: "string"},
            item: {type: "string"},
            price: {type: "number"},
            qty: {type: "number"},
            referenceNo: {type: "string"},
            transactionDate: {type: "string"},
            transactionType: {type: "string"},
            type: {type: "string"},
            uom: {type: "string"},
            marginRate: {type: "number"},
            category: {type: "string"}
        },
        totalRevenue: 0,
        totalSaleLead: 0,
        totalSaleQuote: 0,
        totalSaleOrder: 0,
        decimalFormat: 'n2',
        // group: {
        //     field: 'name',
        //     aggregates: [
        //         {field: "qty", aggregate: "tQty"},
        //         {field: "amount", aggregate: "sum"}
        //     ]
        // },
    }),
    methods: {
        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log('excelExport')
            window.console.log(e.data);
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
        discountAmountTmp(dataItem) {
            if (dataItem) {
                const discount = dataItem.discountExchangeAmount || 0
                return kendo.toString(discount, dataItem.decimalFormat)
            }
            return 0
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
                default:
                    this.startDate = ""
                    this.endDate = ""
            }
        },
        numberFormat(value) {
            return kendo.toString(value, this.decimalFormat)
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridTransactionDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
        },
        async loadTransactions() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    billingHandler.list().then(res => {
                        if (res.data.statusCode === 200) {
                            // window.console.log(res)
                            const result = res.data.data
                            this.transactions = result
                            // for (const item of result) {
                            //   item.itemLines.forEach(o => {
                            //     this.transactions.push({
                            //       id: o.id,
                            //       name: o.item.name,
                            //       referenceNo: item.referenceNo,
                            //       transactionDate: item.transactionDate,
                            //       cusName: item.customer.name,
                            //       category: o.item.category.name,
                            //       type: item.transactionType,
                            //       qty: o.qty,
                            //       uom: o.uom.name,
                            //       price: o.price * item.txnRate,
                            //       discountAmount: o.discountExchangeAmount,
                            //       amount: o.amount * item.txnRate,
                            //       marginRate: (o.wac / (o.price * item.txnRate)) * 100,
                            //       decimalFormat: item.decimalFormat
                            //     })
                            //   })
                            // }
                        }
                        // window.console.log(this.transactions, 'transaction 2345678')
                        this.showLoading = false
                    })
                }, 10);
            })
        },
        async searchTransaction(type) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    const startDate = this.startDate
                    const endDate = this.endDate
                    let strFilter = ''
                    if (type !== '') {
                        strFilter = '?start=' + startDate + '&end=' + endDate + '&type=' + type + '&detail=' + 1
                    } else {
                        strFilter = '?start=' + startDate + '&end=' + endDate + '&detail=' + 1
                    }
                    this.transactions = []
                    this.showLoading = true
                    billingHandler.list(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            this.transactions = []
                            const data = res.data.data
                            this.transactions = data
                            const result = res.data.result
                            this.decimalFormat = result.decimalFormat
                            this.totalRevenue = kendo.toString(result.Revenue, result.decimalFormat)
                            this.totalSaleLead = kendo.toString(result.SaleLead, result.decimalFormat)
                            this.totalSaleOrder = kendo.toString(result.SaleOrder, result.decimalFormat)
                            this.totalSaleQuote = kendo.toString(result.SaleQuote, result.decimalFormat)
                            // for (const item of result) {
                            //   item.itemLines.forEach(o => {
                            //     this.transactions.push({
                            //       id: o.id,
                            //       name: o.item.name,
                            //       referenceNo: item.referenceNo,
                            //       transactionDate: item.transactionDate,
                            //       type: item.transactionType,
                            //       cusName: item.customer.name,
                            //       category: o.item.category.name,
                            //       qty: o.qty,
                            //       uom: o.uom.name,
                            //       price: o.price * item.txnRate,
                            //       discountAmount: o.discountExchangeAmount,
                            //       amount: o.amount * item.txnRate,
                            //       marginRate: (o.wac / (o.price * item.txnRate)) * 100,
                            //       decimalFormat: item.decimalFormat
                            //     })
                            //   })
                            // }
                        } else {
                            this.showLoading = false
                        }
                        this.showLoading = false
                    })
                }, 10);
            })
        },
        dateFormat(dataItem) {
            return kendo.toString(new Date(dataItem.transactionDate), `dd-MM-yyyy`)
        },
    },
    async mounted() {
        this.group = [
            {
                field: "item",
                aggregates: this.aggregateDefinition,
            }
        ]
        await this.searchTransaction('')
    },
    computed: {},
};
</script>
<style scoped></style>
