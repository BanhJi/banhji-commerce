<template>
  <v-row>
    <v-col sm="12" cols="12" class="">
      <v-card color="white" class="pl-2 no_border" elevation="0">
        <v-row>
          <v-col sm="6" cols="12" class="pt-0">
            <h2 class="mb-1 font_20">{{ $t('receivable_management') }}</h2>
            <p class="mb-0">{{ $t('receivable_management_desc') }}</p>
          </v-col>
          <v-col sm="4" cols="12" class="kendo_dropdown_custom">
            <app-datepicker :initialDate="asOf"
                            @emitDate="asOf = $event"/>
            <dropdownlist
                :data-items="customerList"
                @change="onChange"
                :value="customer"
                :data-item-key="dataItemKey"
                :text-field="textField"
                :default-item="defaultItem"
                :filterable="true"
                @filterchange="onFilterChange">
            </dropdownlist>
          </v-col>
          <v-col sm="1" cols="1" class="pt-4">
            <v-btn color="primary white--text" @click="loadReceivable">
              <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
            </v-btn>
          </v-col>
          <v-col sm="1" cols="12" class="py-0">
            <!--                        <v-row>-->
            <!--                            <v-col sm="12" cols="12">-->
            <!--                                <v-btn color="primary" class="text-capitalize white&#45;&#45;text float-right">-->
            <!--                                    {{ $t('view') }}-->
            <!--                                </v-btn>-->
            <!--                            </v-col>-->
            <!--                        </v-row>-->
            <v-row>
              <v-col sm="12" cols="12" class="pt-4">
                <v-btn icon color="black" class="bg-none float-right ">
                  <v-icon class="font_34">fa fa-file-excel</v-icon>
                </v-btn>

                <v-btn icon color="black" class="bg-none float-right ml-2">
                  <v-icon class="font_34">fa fa-print</v-icon>
                </v-btn>
              </v-col>
            </v-row>

          </v-col>
        </v-row>

        <v-row>
          <v-col sm="4" cols="12" class="pt-0">
            <v-card outlined dense class="pa-3 no_border white--text  d-flex justify-space-between align-center" color="secondary" height="85px">
                  <h3 class="text-left font_13 text-uppercase flex-1">{{ $t('overdue_amount') }}</h3>
                  <h3 class="text-right  font_20 flex-1">{{ overDueAmount }}</h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">
            <v-card outlined dense class="pa-3 no_border white--text d-flex justify-space-between align-center" color="third" height="85px">
                <h3 class="text-left font_13 flex-1 text-uppercase">{{ $t('receivable_balance') }}</h3>
                <h3 class="text-right flex-1 font_20">{{ receivableBalance }}</h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">
            <v-card outlined dense class="pa-3 no_border black--text d-flex justify-space-between align-center" color="grayBg" height="85px">
                <h3 class="text-left font_13 flex-1 text-uppercase">{{ $t('to_be_collected') }}</h3>
                <h3 class="text-right flex-1 font_20">{{ tobeCollected }}</h3>
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
              <kendo-datasource ref="dataSource"
                                :group="group"
                                :data="receivableList"/>
              <kendo-grid id="gridReceivable" class="grid-function"
                          :data-source-ref="'dataSource'"
                          :sortable="false"
                          :groupable="true"
                          :filterable="false"
                          :column-menu="true"
                          :noRecords="true"
                          :editable="false"
                          v-on:databound="dataBound"
                          :scrollable-virtual="true">
                <kendo-grid-column
                    :field="'transactionDate'"
                    :title="$t('transaction_date')"
                    :template="'<span>#=transactionDate#</span>'"
                    :group-footer-template="'Total: '"
                    :width="200"
                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                <kendo-grid-column
                    :field="'name'"
                    :title="$t('name')"
                    :attributes="{class:'tb_name_td'}"
                    :template="'<span>#=name#</span>'"
                    :width="200"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'empName'"
                    :title="$t('employee_name')"
                    :template="'<span>#=empName#</span>'"
                    :width="200"
                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                <kendo-grid-column
                    :field="'referenceNo'"
                    :title="$t('reference_no')"
                    :template="referenceTemplate"
                    :width="200"
                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                <kendo-grid-column
                    :field="'code'"
                    :title="$t('payment_code')"
                    :template="'<span>#=code#</span>'"
                    :width="200"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'amount'"
                    :title="$t('open_amount')"
                    :template="'<span>#= kendo.toString(amount, decimalFormat)#</span>'"
                    :width="200"
                    :attributes="{style: 'text-align: right; '}"
                    :aggregates="['sum']"
                    :group-footer-template="'<div style=text-align:right><span class=text-bold>#= kendo.toString(sum, `n2`)#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                    :field="'paymentTerm'"
                    :title="$t('term')"
                    :template="'<span>#=paymentTerm.name#</span>'"
                    :width="200"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'overDue'"
                    :title="$t('over_due')"
                    :template="'<span>#=overDue#</span>'"
                    :width="180"
                    :attributes="{style: 'text-align: right; '}"
                    :headerAttributes="{ style: 'background-color: #EDF1F5'}"/>
                <kendo-grid-column
                    :field="'status'"
                    :title="$t('status')"
                    :template="status"
                    :width="200"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'action'"
                    :title="$t('action')"
                    :width="120"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    :command="[{  text: 'Receive', click: goToCashReceipt , className: 'k-state-disabled status' }]"
                />

              </kendo-grid>
            </template>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import kendo from "@progress/kendo-ui";

const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const defaultItem = {['numberName']: 'Select customer...', ['id']: null}
const customerHandler = require("@/scripts/customerHandler")
const emptyItem = {['numberName']: 'loading ...'}
const $ = require("jquery")
export default {
  data: () => ({
    asOf: new Date().toISOString().substr(0, 10),
    showLoading: false,
    group: [],
    aggregateDefinition: [
      {field: "name", aggregate: "count"},
      {field: "amount", aggregate: "sum"},
      {field: "code", aggregate: "count"}
    ],
    receivableList: [],
    customerList: [],
    customer: {},
    textField: 'numberName',
    defaultItem: defaultItem,
    dataItemKey: 'id',
    filter: '',
    cusBaseUrl: customerHandler.search(),
    overDueAmount: 0,
    receivableBalance: 0,
    tobeCollected: 0,
  }),
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    'app-datepicker': DatePickerComponent,
    'dropdownlist': DropDownList,
  },
  methods: {
    dataBound: function (e) {
      const grid = kendo.jQuery("#gridReceivable").data("kendoGrid")
      const items = e.sender.items()
      items.each(function () {
        let dataItem = grid.dataItem(this);
        $("tr[data-uid='" + dataItem.uid + "']").find(".status").each(function () {
          if (dataItem.status !== 3) {
            $(this).removeClass('k-state-disabled')
          }
        })
      })
    },
    goToCashReceipt(e) {
      e.preventDefault()
      let grid = kendo.jQuery("#gridReceivable").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.$router.push({
        path: 'cash_receipt' + `/${dataItem.code}`,
        params: {id: dataItem.code},
        query: {type: 'pmt', option: 'Payment Code'}
      })
      // let grid = kendo.jQuery("#gridAddress").data("kendoGrid")
      // let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
      // this.address = dataItem
      // this.mCountry = dataItem.country
      // this.dialogM2 = true
    },
    referenceTemplate(data) {
      let url = `invoice_view/${data.id}`
      if (data.type === 'Invoice') {
        url = `invoice_view/${data.id}`
      } else if (data.type === 'Sale Quote') {
        url = `sale_quote_view/${data.id}`
      } else if (data.type === 'Delayed Invoice') {
        url = `delayed_invoice_view/${data.id}`
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
    async loadReceivable() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved')
          this.showLoading = true
          let strFilter = ''
          strFilter = '?asOf=' + this.asOf
          if (this.customer) {
            if (this.customer.id !== undefined && this.customer.id !== null) {
              strFilter = '?asOf=' + this.asOf + '&id=' + this.customer.id
            }
          }
          window.console.log(strFilter, 'filter')
          this.showLoading = true
          billingHandler.wcpReceivableList(strFilter).then(res => {
            if (res.data.statusCode === 200) {
              this.receivableList = res.data.data
              const result = res.data.result
              this.receivableBalance = kendo.toString(result.receivableBalance, result.decimalFormat)
              this.overDueAmount = kendo.toString(result.overDueAmount, result.decimalFormat)
              this.tobeCollected = kendo.toString(result.tobeCollected, `n0`)
              this.showLoading = false
            }
          })
        }, 300)
      })
    },
    status(dataItem) {
      let status = ''
      switch (dataItem.status) {
        case 1:
          status = 'Open'
          break
        case 2:
          status = 'Partially Paid'
          break
        case 3:
          status = 'Paid'
          break
        case 4:
          status = 'Void'
          break
      }
      return status
    },
    onFilterChange(event) {
      const filter = event.filter.value
      this.requestData(0, filter, this.cusBaseUrl)
      this.filter = filter
    },
    requestData(skip, filter, baseUrl) {
      const url = baseUrl +
          `?filter=${filter}`
      fetch(url)
          .then((response) => {
            return response.json()
          })
          .then(this.afterFetch)
    },
    afterFetch(json) {
      this.customerList = json.data
    },
    onChange(event) {
      const value = event.value
      if (value && value['numberName'] === emptyItem['numberName']) {
        return;
      }
      this.customer = value
    },
    sumGroupAmount(dataItem) {
      if (dataItem.hasOwnProperty('sum')) {
        return '<span>#= kendo.toString(sum, `n2`)#</span>'
      }
      return `<span>#= kendo.toString(sum, 'n2')#</span>`
    }
  },
  computed: {},
  mounted: async function () {
    this.group = [
      {
        field: "name",
        aggregates: this.aggregateDefinition,
      }
    ]
    this.requestData(0, this.filter, this.cusBaseUrl)
  }
};
</script>
<style scoped>
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