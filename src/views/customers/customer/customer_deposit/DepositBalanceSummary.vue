<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <h2 class="mb-0 font_20">{{ $t("deposit_summary_by_customer") }}</h2>
            <p class="mb-2">{{ $t('deposit_balance_desc') }}</p>
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <app-datepicker :initialDate="asOf"
                            @emitDate="asOf = $event"/>
          </v-col>
          <v-col sm="4" cols="12" class="kendo_dropdown_custom py-0">
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
          <v-col sm="1" cols="12" class="py-0">
            <v-btn color="primary" class="text-capitalize white--text" @click="loadReceivable">
              <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
            </v-btn>
          </v-col>
          <!-- <v-col sm="2" cols="12" class="pb-0 text-right mt-1">
              <v-btn icon color="black" class="bg-none  ">
                  <v-icon class="font_34">fa fa-file-excel</v-icon>
              </v-btn>

              <v-btn icon color="black" class="bg-none ml-2">
                  <v-icon class="font_34">fa fa-print</v-icon>
              </v-btn>
          </v-col> -->
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
                          :sortable="true"
                          :groupable="true"
                          :filterable="false"
                          :column-menu="true"
                          :noRecords="true"
                          :editable="false"
                          :excel-file-name="'CustomerDepositBalanceSummary.xlsx'"
                          :excel-filterable="true"
                          :excel-all-pages="true"
                          :toolbar="['excel']"
                          :scrollable-virtual="true">
                <kendo-grid-column
                    :field="'name'"
                    :title="$t('name')"
                    :attributes="{class:'tb_name_td'}"
                    :template="'<span>#=name#</span>'"
                    :width="200"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'type'"
                    :title="$t('type')"
                    :width="200"
                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                <kendo-grid-column
                    :field="'group'"
                    :title="$t('group')"
                    :width="200"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'balance'"
                    :title="$t('balance')"
                    :template="'<span>#= kendo.toString(balance, decimalFormat)#</span>'"
                    :width="200"
                    :attributes="{style: 'text-align: right; '}"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <!--                <kendo-grid-column-->
                <!--                    :field="'overDue'"-->
                <!--                    :title="$t('over_due')"-->
                <!--                    :template="'<span>#= kendo.toString(overDue, decimalFormat)#</span>'"-->
                <!--                    :width="180"-->
                <!--                    :attributes="{style: 'text-align: right; '}"-->
                <!--                    :headerAttributes="{ style: 'background-color: #EDF1F5'}"/>-->
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
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
// import kendo from "@progress/kendo-ui";
import JSZip from "jszip";
window.JSZip = JSZip;
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const $ = require("jquery")
const defaultItem = {['numberName']: 'Select customer...', ['id']: null}
const customerHandler = require("@/scripts/customerHandler")
const emptyItem = {['numberName']: 'loading ...'}

export default {
  data: () => ({
    showLoading: false,
    asOf: new Date().toISOString().substr(0, 10),
    customerList: [],
    customer: {},
    depositBalanceList: [],
    textField: 'numberName',
    defaultItem: defaultItem,
    dataItemKey: 'id',
    filter: '',
    cusBaseUrl: customerHandler.search(),
    balance: 0,
    group: {field: 'type'},
    receivableList: []
  }),
  components: {
    'app-datepicker': DatePickerComponent,
    LoadingMe: () => import(`@/components/Loading`),
    'dropdownlist': DropDownList
  },
  methods: {
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
    customerGroup(dataItem) {
      const group = dataItem.customerGroup || {}
      if (group.hasOwnProperty('id')) {
        return group.name || ''
      }
      return ''
    },
    customerType(dataItem) {
      const type = dataItem.customerType || {}
      if (type.hasOwnProperty('id')) {
        return type.name || ''
      }
      return ''
    },
    // dataBound: function (e) {
    //   const grid = kendo.jQuery("#gridReceivable").data("kendoGrid")
    //   const items = e.sender.items()
    //   items.each(function () {
    //     let dataItem = grid.dataItem(this);
    //     $("tr[data-uid='" + dataItem.uid + "']").find(".status").each(function () {
    //       if (dataItem.status !== 3) {
    //         $(this).removeClass('k-state-disabled')
    //       }
    //     })
    //   })
    // },
    goToCashReceipt(e) {
      e.preventDefault()
      let grid = kendo.jQuery("#gridReceivable").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.$router.push({
        path: 'cash_receipt' + `/${dataItem.code}`,
        params: {id: dataItem.code},
        query: {type: 'pmt', option: 'Payment Code'}
      })
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
          strFilter = '?asOf=' + this.asOf + '&type=dep-' + '&txnType=Customer'
          if (this.customer) {
            if (this.customer.id !== undefined && this.customer.id !== null) {
              strFilter = '?asOf=' + this.asOf + '&id=' + this.customer.id + '&type=dep-' + '&txnType=Customer'
            }
          }
          // window.console.log(strFilter, 'filter')
          this.showLoading = true
          billingHandler.vendorDepositBalanceSummary(strFilter).then(res => {
            if (res.data.statusCode === 200) {
              this.receivableList = res.data.data
              // const result = res.data.result
              // this.receivableBalance = kendo.toString(result.receivableBalance, result.decimalFormat)
              // this.overDueAmount = kendo.toString(result.overDueAmount, result.decimalFormat)
              // this.tobeCollected = kendo.toString(result.tobeCollected, `n0`)
              this.showLoading = false
            }
          })
        }, 10)
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
  },
  computed: {},
  mounted: async function () {
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