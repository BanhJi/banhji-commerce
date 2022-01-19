<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{ $t('transactions_need_to_be_reconciled') }}</h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="9" cols="12" class="py-0">
                        <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                                        :initEndDate="endDate" @emitEndDate="endDate = $event"/>
                    </v-col>

                    <v-col sm="1" cols="12" class="py-0">
                        <v-btn class="btn_search" style="background-color: rgb(237, 241, 245)"
                               @click="searchTransaction('Cash Receipt')">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
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
                            <kendo-datasource ref="gridCollectionDS"
                                              :type="'JSON'"
                                              :data="transactions"
                                              :group="group"
                                              :server-paging="false"/>
                            <kendo-grid id="gridCollection" class="grid-function"
                                        :data-source-ref="'gridCollectionDS'"
                                        :editable="false"
                                        :groupable="true"
                                        :column-menu="true"
                                        :noRecords="true"
                                        :scrollable-virtual="true">
                                <!--                                <kendo-grid-column-->
                                <!--                                    :field="'no'"-->
                                <!--                                    :title="$t('no')"-->
                                <!--                                    :template="rowNumberTmpl"-->
                                <!--                                    :width="90"-->
                                <!--                                    :column-menu="false"-->
                                <!--                                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"-->
                                <!--                                    :attributes="{style: 'text-align: center'}"/>-->
                                <kendo-grid-column
                                    :field="'name'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('imported_date')"
                                    :width="200"
                                    :template="'<span>#=name#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'txnReferenceNo'"
                                    :title="$t('num')"
                                    :width="200"
                                    :template="invoiceRefTemplate"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'receiptReferenceNo'"
                                    :title="$t('date')"
                                    :width="200"
                                    :template="receiptRefTemplate"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'txnAmount'"
                                    :title="$t('type')"
                                    :width="200"
                                    :template="'<span>#= kendo.toString(txnAmount, decimalFormat)#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'PaidAmount'"
                                    :title="$t('bank_account')"
                                    :width="200"
                                    :template="'<span>#= kendo.toString(PaidAmount, decimalFormat)#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'transactionDate'"
                                    :title="$t('bank')"
                                    :width="200"
                                    :template="transactionDate"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>

                                <kendo-grid-column
                                    :field="'paymentOption'"
                                    :title="$t('amount')"
                                    :width="200"
                                    :template="source"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'bankReferenceNo'"
                                    :title="$t('action')"
                                    :width="200"
                                    :template="'<span>#= bankReferenceNo#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                            </kendo-grid>
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
