<template>
  <v-row>
    <v-col sm="12" cols="12" class="">
      <v-card color="white" class="pl-2 no_border" elevation="0">
        <v-row>
          <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('payment_management') }}</h2>
            <p class="mb-0">{{ $t('payment_management_desc') }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="9" cols="12" class="py-0">
            <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                            :initEndDate="endDate" @emitEndDate="endDate = $event"/>
          </v-col>

          <v-col sm="1" cols="12" class="py-0">
            <v-btn class="btn_search" style="background-color: rgb(237, 241, 245)"
                   @click="searchTransaction('Cash Payment')">
              <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
            </v-btn>
          </v-col>
          <v-col sm="2" cols="12" class="py-0 text-right">
            <v-btn icon color="black" class="bg-none float-right ">
              <v-icon class="font_34">fa fa-file-excel</v-icon>
            </v-btn>

            <v-btn icon color="black" class="bg-none float-right ml-2">
              <v-icon class="font_34">fa fa-print</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="4" cols="12" class="pt-0">
            <v-card outlined dense
                    class="pa-3 no_border white--text d-flex justify-space-between align-center"
                    color="secondary" height="85px">
              <h3 class="text-left text-uppercase font_13 flex-1">{{
                  $t('collected_billed')
                }}</h3>
              <h3 class="text-right font_20 flex-1">{{ numberFormat(collectedInvoice) }}</h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">
            <v-card outlined dense
                    class="pa-3 no_border white--text  d-flex justify-space-between align-center "
                    color="third" height="85px">
              <h3 class="text-left text-uppercase font_13 flex-1">{{ $t('total_collected_amount') }}</h3>
              <h3 class="text-right font_20 flex-1">{{ collectedAmount }}</h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">
            <v-card outlined dense
                    class="pa-3 no_border black--text d-flex justify-space-between align-center"
                    color="grayBg" height="85px">
              <h3 class="text-left text-uppercase font_13 flex-1">{{
                  $t('overdue_invoice_collected')
                }}</h3>
              <h3 class="text-right mt-2 font_20 flex-1">{{ numberFormat(collectedInvoiceOverDue) }}</h3>
            </v-card>
          </v-col>
        </v-row>


        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  type="loading"
                  :myLoading="true"/>
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
                <kendo-grid-column
                    :field="'paymentDate'"
                    :title="$t('payment_date')"
                    :width="200"
                    :template="paidDate"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'name'"
                    :attributes="{class:'tb_name_td'}"
                    :title="$t('name')"
                    :width="200"
                    :template="'<span>#=name#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'txnReferenceNo'"
                    :title="$t('bill_number')"
                    :width="200"
                    :template="invoiceRefTemplate"
                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                <kendo-grid-column
                    :field="'referenceNo'"
                    :title="$t('payment_number')"
                    :width="200"
                    :template="receiptRefTemplate"
                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                <kendo-grid-column
                    :field="'txnExchangeAmount'"
                    :title="$t('bill_amount')"
                    :width="200"
                    :template="'<span>#= kendo.toString(txnExchangeAmount, decimalFormat)#</span>'"
                    :attributes="{style: 'text-align: right'}"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'exchangePaidAmount'"
                    :title="$t('payment_amount')"
                    :width="200"
                    :attributes="{style: 'text-align: right'}"
                    :template="'<span>#= kendo.toString(exchangePaidAmount, decimalFormat)#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'exchangeDiscount'"
                    :title="$t('discount')"
                    :width="200"
                    :attributes="{style: 'text-align: right'}"
                    :template="'<span>#= kendo.toString(exchangeDiscount, decimalFormat)#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'gainOrLoss'"
                    :title="$t('gain_or_loss')"
                    :width="200"
                    :attributes="{style: 'text-align: right'}"
                    :template="'<span>#= kendo.toString(gainOrLoss, decimalFormat)#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'transactionDate'"
                    :title="$t('bill_date')"
                    :width="200"
                    :template="transactionDate"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'paymentOption'"
                    :title="$t('source')"
                    :width="200"
                    :template="source"
                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                <kendo-grid-column
                    :field="'bankReferenceNo'"
                    :title="$t('bank_reference_no')"
                    :width="200"
                    :template="'<span>#= bankReferenceNo#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                <kendo-grid-column
                    :field="'memo'"
                    :title="$t('memo')"
                    :width="200"
                    :template="'<span>#= memo #</span>'"
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
      return kendo.toString(value, `n${this.decimalFormat}`)
    },
    transactionDate(dataItem) {
      return kendo.toString(new Date(dataItem.transactionDate), `${this.dateFormat}`)
    },
    paidDate(dataItem) {
      return kendo.toString(new Date(dataItem.paymentDate), `${this.dateFormat}`)
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
      let url = `cash_payment/${data.id}`
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
    invoiceRefTemplate(data) {
      let url = `credit_purchase_view/${data.txnId}`
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
      // if (this.startDate && this.endDate) {
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
          billingHandler.txnCashPayment(strFilter).then(res => {
            if (res.data.statusCode === 200) {
              this.transactions = res.data.data
              if (this.transactions.length > 0) {
                const results = res.data.result
                this.decimalFormat = results.decimalFormat
                this.collectedAmount = kendo.toString(results.cash, `${this.decimalFormat}`)
                const inv = results.invoice
                this.collectedInvoice = inv.total
                this.collectedInvoiceOverDue = inv.overDue
              }
            }
            this.showLoading = false
          })
        }, 300)
      })
      // }
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
