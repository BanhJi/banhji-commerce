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
                        <v-btn color="primary white--text" @click="searchTransaction('')">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row class="mt-0">
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <kendo-datasource ref="saleCreditMemoByCustomerDS"
                                              :type="'JSON'"
                                              :data="transactions"
                                              :group="group"
                                              :server-paging="false"/>
                            <kendo-grid id="gridCreditMemoByCustomerTxn" class="grid-function"
                                        :data-source-ref="'saleCreditMemoByCustomerDS'"
                                        :editable="false"
                                        :groupable="true"
                                        :column-menu="true"
                                        :noRecords="true"
                                        :toolbar="toolbarTemplate"
                                        :excel-export="excelExport"
                                        :excel-file-name="'CreditMemoTransactionByCustomer.xlsx'"
                                        :excel-filterable="true"
                                        @pagechange="pageChangeHandler"
                                        :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'transactionDate'"
                                    :title="$t('date')"
                                    :width="120"
                                    :template="dateFormat"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('name')"
                                    :attributes="{class:'tb_name_td'}"
                                    :width="200"
                                    :template="'<span>#=name#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'referenceNo'"
                                    :title="$t('reference_no')"
                                    :width="200"
                                    :template="referenceTemplate"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'exchangeAmount'"
                                    :title="$t('amount')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#=kendo.toString(exchangeAmount, decimalFormat)#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="''"
                                    :title="$t('action')"
                                    :width="100"
                                    :command="[{  text: 'Edit', click: goToEdit }]"
                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                            </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

import CreditMemoModel from "@/scripts/sale_return/model/CreditMemo";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";

const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const $ = kendo.jQuery
const creditMemoModel = new CreditMemoModel({})

import JSZip from "jszip";

window.JSZip = JSZip;
export default {
    name: "CreditMemoByCustomerTransaction",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': () => import(`@/components/custom_templates/DatePickerComponent`),
    },
    data: () => ({
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year', 'Last Month' , 'Last Year'],
        mDateSorter: 'Today',
        showLoading: false,
        transactions: [],
        tranDS: [],
        isLoaded: false,
        creditMemo: creditMemoModel,
        totalRevenue: 0,
        totalSaleLead: 0,
        totalSaleQuote: 0,
        totalSaleOrder: 0,
        group: {field: 'name'},
    }),
    methods: {
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
        referenceTemplate(data) {
            let url = `sale_return_view/${data.id}`
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
        goToEdit(e) {
            e.preventDefault()
            let grid = kendo.jQuery("#gridTransactionMemo").data("kendoGrid")
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            const txnId = dataItem.id
            this.$router.push({
                path: 'sale_return/' + txnId,
                name: 'Sale Return',
                params: {id: txnId},
                query: {type: 'Edit'}
            })
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.saleCreditMemoByCustomerDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
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
                        strFilter = '?start=' + startDate + '&end=' + endDate + '&type=' + type
                    } else {
                        strFilter = '?start=' + startDate + '&end=' + endDate
                    }

                    billingHandler.creditMemoList(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            this.transactions = res.data.data
                        }
                        this.showLoading = false
                    })
                }, 300);
            })
        },
        dateFormat(dataItem) {
            return kendo.toString(new Date(dataItem.transactionDate), `${this.creditMemo.dateFormat}`)
        },
        callback() {
            // if (this.$route.params !== null && this.$route.params.hasOwnProperty('data')) {
            //     const data = this.$route.params.data
            //     if (data.transactionType === 'delete') {
            //         this.loadTransactions()
            //     }
            // }
            // window.console.log('im changed', this.$route.params)
        },
        // tranDS: function () {
        //     let vue = this
        //     const startDate = this.startDate
        //     const endDate = this.endDate
        //     let strFilter = ''
        //     strFilter = '?start=' + startDate + '&end=' + endDate
        //     return new kendo.data.DataSource({
        //         transport: {
        //             read: {
        //                 url: 'https://dev-apis.banhji.com/invoice-billings/invoice/institute/institute-0ab24220-808d-11ea-9131-1d2fe2a803b1/list/' + strFilter,
        //                 type: 'GET',
        //                 dataType: 'json'
        //             }
        //         },
        //         schema: {
        //             total: function (response) {
        //                 return response.total
        //             },
        //             data: function (response) {
        //                 return response.data
        //             },
        //             // total: function (response) {
        //             //     return response.total
        //             // }
        //         },
        //         pageable: true,
        //         pageSize: 20,
        //         serverPaging: true,
        //         // testing the change event handler
        //         change: function (e) {
        //             let data = this.data()
        //             window.console.log(data, e)
        //         },
        //         requestStart: function () {
        //             vue.loading = true
        //         },
        //         requestEnd: function () {
        //             vue.loading = false
        //         }
        //     })
        // },
        toolbarTemplate: function () {
            const templateHtml =
                '<span>' +
                '<a class="k-pager-excel k-link k-button excel" title="Export to Excel"> <span class="k-icon k-i-excel"></span>Export to excel </a>' +
                '</span><span>&nbsp;&nbsp;</span>' +
                '<span style="position:absolute; right:5px">' +
                '</span>'

            return kendo.template(templateHtml)
        },
        exportToExcel() {
            const grid = $("#gridCreditMemoByCustomerTxn").data("kendoGrid")
            grid.saveAsExcel()
        },
        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log(e.data);
        },
        initToolbar(that) {
            let grid = $("#gridCreditMemoByCustomerTxn").data("kendoGrid");
            let gridElement = grid.element;
            let toolbarElement = gridElement.find(".k-grid-toolbar");
            toolbarElement.on("click", ".k-pager-excel", function (e) {
                e.preventDefault();
                onExportExcel(that);
            });

            function onExportExcel(that) {
                that.exportToExcel();
            }
        },
    },
    mounted: async function () {
        await this.initToolbar(this)
    },
    computed: {},
    watch: {
        // '$route': 'callback'
    }
};
</script>
<style scoped>
</style>