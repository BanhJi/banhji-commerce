<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="9" cols="12" class="py-0">
                        <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                                        :initEndDate="endDate" @emitEndDate="endDate = $event"/>
                    </v-col>

                    <v-col sm="1" cols="12" class="py-0 mt-1">
                        <v-btn class="btn_search" style="background-color: rgb(237, 241, 245)"
                               @click="searchTransaction('Cash Receipt')">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                    <!-- <v-col sm="2" cols="12" class="py-0 text-right">
                        <v-btn icon color="black" class="bg-none float-right ">
                            <v-icon class="font_34">fa fa-file-excel</v-icon>
                        </v-btn>

                        <v-btn icon color="black" class="bg-none float-right ml-2">
                            <v-icon class="font_34">fa fa-print</v-icon>
                        </v-btn>
                    </v-col> -->
                </v-row>

                <v-row>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border white--text " color="secondary" height="85px">
                            <h3 class="text-left text-uppercase font_13 flex-1">{{ $t('sale_conversion_days') }}</h3>
                            <h3 class="text-right mt-2 font_20 flex-1 mt-6">100 <span class="font_13"> {{$t('days')}}</span></h3>
                        </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border white--text" color="third" height="85px">
                            <h3 class="text-left text-uppercase font_13 flex-1">{{ $t('bid_to_win_ratio') }}</h3>
                            <h3 class="text-right mt-2 font_20 flex-1 mt-6">90%</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border white--text" color="third" height="85px">
                            <h3 class="text-left text-uppercase font_13 flex-1">{{ $t('sale_target_completion') }}</h3>
                            <h3 class="text-right mt-2 font_20 flex-1 mt-6">90%</h3>
                        </v-card>
                    </v-col>
                </v-row>
                
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="true"
                                :myLoading="true"
                                :alertMessage="loadingAlert"
                                :color="loadingColorAlert"
                                :alertText="loadingTextAlert"/>
                            <template>
                                <v-simple-table class="attachment_table">
                                    <template v-slot:default>
                                        <thead>
                                        <tr>
                                            <th>{{$t('')}}</th>
                                            <th>{{$t('%_of_sale_target')}}</th>
                                            <th class="whiteGreen">{{$t('total')}}</th>
                                            <th>{{$t('lead')}}</th>
                                            <th>{{$t('quote_proposal')}}</th>
                                            <th>{{$t('engagement_contract')}}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>2021 {{$t('jan')}}</td>
                                            <td></td>
                                            <td class="whiteGreen"></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>2021 {{$t('feb')}}</td>
                                            <td></td>
                                            <td class="whiteGreen"></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>2021 {{$t('mar')}}</td>
                                            <td></td>
                                            <td class="whiteGreen"></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>2021 {{$t('apr')}}</td>
                                            <td></td>
                                            <td class="whiteGreen"></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>2021 {{$t('may')}}</td>
                                            <td></td>
                                            <td class="whiteGreen"></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>2021 {{$t('jun')}}</td>
                                            <td></td>
                                            <td class="whiteGreen"></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <td colspan="6" class="whiteGreen text-bold">{{$t('total')}}</td>
                                        </tr>
                                        </tfoot>
                                    </template>
                                </v-simple-table>
                            </template>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import SearchDateComponent from '@/components/custom_templates/SearchDate'
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import kendo from "@progress/kendo-ui";
import ItemLineModel from "@/scripts/cash-receipt/model/ItemLine";

const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const itemLineModel = new ItemLineModel({})
export default {
    data: () => ({
        startDate: "",
        endDate: "",
        group: {field: 'name'},
        transactions: [],
        dateFormat: itemLineModel.dateFormat,
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        collectedAmount: 0,
        collectedInvoice: 0,
        collectedInvoiceOverDue: 0,
        decimalFormat: 'n2',
    }),
    components: {
        'app-searchdate': SearchDateComponent,
        LoadingMe: () => import(`@/components/Loading`),
    },
    methods: {
        numberFormat(value) {
            return kendo.toString(value, `n${this.decimal}`)
        },
        transactionDate(dataItem) {
            return kendo.toString(new Date(dataItem.transactionDate), `${this.dateFormat}`)
        },
        goToConvert() {

        },
        source(dataItem) {
            if (dataItem.hasOwnProperty('paymentOption')) {
                if (dataItem.paymentOption.hasOwnProperty('name')) {
                    return dataItem.paymentOption.name
                }
            }
            return ''
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridCollectionDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
        },
        receiptRefTemplate(data) {
            let url = `cash_receipt/${data.id}`
            let args = {
                text: data.receiptReferenceNo,
                url: url,
                data: data,
            }
            return {
                template: LinkTemplate,
                templateArgs: args
            }
        },
        invoiceRefTemplate(data) {
            let url = `invoice_view/${data.txnId}`
            let args = {
                text: data.txnReferenceNo,
                url: url,
                data: data,
            }
            return {
                template: LinkTemplate,
                templateArgs: args
            }
        },
        async searchTransaction(type) {
            if (this.startDate && this.endDate) {
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

                        billingHandler.txn(strFilter).then(res => {
                            if (res.data.statusCode === 200) {
                                this.transactions = res.data.data
                                if (this.transactions.length > 0) {
                                    const results = res.data.result
                                    this.decimalFormat = res.data.data[0].decimalFormat
                                    this.collectedAmount = results.cash
                                    const inv = results.invoice
                                    this.collectedInvoice = inv.total
                                    this.collectedInvoiceOverDue = inv.overDue
                                }
                            }
                            this.showLoading = false
                        })
                    }, 300)
                })
            }
        },
        status(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty('status')) {
                    const status = dataItem.status
                    let statusText = ''
                    switch (status) {
                        case 1:
                            statusText = 'OPEN'
                            break
                        case 2:
                            statusText = 'Partially Paid'
                            break
                        case 4:
                            statusText = 'VOID'
                            break
                        case 3:
                            statusText = 'PAID'
                            break
                    }
                    return statusText
                }
            }
            return ''
        },
    },
    computed: {},
};
</script>
<style scoped>
.k-chart {
    height: 180px;
}

.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
</style>
