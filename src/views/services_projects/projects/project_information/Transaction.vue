<template>
  <v-row class="grayBg">
    <v-col sm="12" cols="12" class="">
      <v-card outlined color="white" class="pa-3">
        <v-row class="">
          <v-col sm="10" cols="12" class="py-0">
            <app-searchdate
                :initStartDate="startDate"
                @emitStartDate="startDate = $event"
                :initEndDate="endDate"
                @emitEndDate="endDate = $event"/>
          </v-col>

          <v-col sm="1" cols="1" class="py-0 mt-1">
            <v-btn color="primary white--text" @click="searchTransaction">
              <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="">
          <v-col sm="12" cols="12" class="py-0">
            <v-simple-table class="attachment_table" fixed-header
                            height="300px">
              <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  type="loading"
                  :myLoading="true">
              </LoadingMe>
              <kendo-datasource ref="productTxnDS"
                                :group="group"
                                :data="transactionList"/>
              <kendo-grid id="gridProductTXN" class="grid-function"
                          :data-source-ref="'productTxnDS'"
                          :sortable="false"
                          :groupable="true"
                          :filterable="false"
                          :column-menu="true"
                          :editable="false"
                          :style="{width: '100%'}"
                          :noRecords="true"
                          :scrollable-virtual="true">
                <kendo-grid-column
                    :field="'transactionDate'"
                    :title="$t('date')"
                    :template="'<span>#=kendo.toString(new Date(transactionDate), dateFormat)#</span>'"
                    :width="150"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'txnType'"
                    :title="$t('transaction_type')"
                    :template="'<span>#=txnType#</span>'"
                    :width="200"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'type'"
                    :title="$t('type')"
                    :hidden="true"
                    :template="'<span>#=type#</span>'"
                    :width="200"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'name'"
                    :title="$t('name')"
                    :template="'<span>#=name#</span>'"
                    :width="200"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'referenceNo'"
                    :title="$t('reference_no')"
                    :template="referenceTemplate"
                    :width="200"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'exchangeAmount'"
                    :title="$t('amount')"
                    :template="'<span>#=kendo.toString(exchangeAmount, decimalFormat)#</span>'"
                    :width="150"
                    :attributes="{style: 'text-align: right'}"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
              </kendo-grid>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import SearchDateComponent from '@/components/custom_templates/SearchDate'
import {i18n} from '@/i18n'
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
const projectHandler = require("@/scripts/projectHandler")

export default {
  props: ['id'],
  components: {
    'app-searchdate': SearchDateComponent,
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    showLoading: false,
    isLoaded: false,
    transactionList: [],
    group: {field: 'type'},
  }),
  computed: {
    headers() {
      return [
        {text: i18n.t('date'), value: 'date'},
        {text: i18n.t('type'), value: 'type'},
        {text: i18n.t('ref'), value: 'ref'},
        {text: i18n.t('amount'), value: 'amount'},
      ]
    },
  },
  methods: {
    referenceTemplate(data) {
      let url = `#`
      if (data.type === 'Invoice') {
        url = `invoice_view/${data.txnId}`
      } else if (data.type === 'Sale Quote') {
        url = `sale_quote_view/${data.txnId}`
      } else if (data.type === 'Delayed Invoice') {
        url = `delayed_invoice_view/${data.txnId}`
      } else if (data.type === 'Sale Order') {
        url = `sale_order_view/${data.txnId}`
      } else if (data.type === 'Purchase Order') {
        url = `purchase_order_view/${data.txnId}`
      } else if (data.type === 'Credit Memo') {
        url = `sale_return_view/${data.txnId}`
      } else if (data.type === 'Debit Memo') {
        url = `purchase_return_view/${data.txnId}`
      } else if (data.type === 'Inventory Adjustment') {
        url = `inventory_adjustment_view/${data.txnId}`
      } else if (data.type === 'Purchase') {
        url = `credit_purchase_view/${data.txnId}`
      } else if (data.type === 'Production Order') {
        url = `production_order_view/${data.txnId}`
      } else if (data.type === 'Production') {
        url = `production/${data.txnId}`
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
    async searchTransaction() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved')
          if (this.id) {
            this.showLoading = true
            const startDate = this.startDate
            const endDate = this.endDate
            let strFilter = '?start=' + startDate + '&end=' + endDate + '&id=' + this.id
            projectHandler.projectReport(strFilter).then(res => {
              if (res.data.statusCode === 200) {
                this.transactionList = res.data.data
              }
              this.showLoading = false
            })
          }
        }, 10)
      })
    },
  },
  watch: {
    'id': 'searchTransaction'
  },
}
</script>
<style scoped>
</style>