<template>
  <v-row>
       <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-1 font_20">{{ $t('receivable_balance_summary') }}</h2>
            <p class="mb-0">{{ $t('receivable_management_desc_2') }}</p>
          </v-col>
          <v-col sm="4" cols="12" class="kendo_dropdown_custom py-0">
            <app-datepicker :initialDate="asOf"
                            @emitDate="asOf = $event"/>

          </v-col>
          <v-col sm="4" cols="12" class="kendo_dropdown_custom py-1">
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
          <v-col sm="1" cols="1" class="pt-1">
            <v-btn color="primary white--text" @click="balanceSummary">
              <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
            </v-btn>
          </v-col>
          <!--          <v-col sm="1" cols="1" class="pt-1">-->
          <!--            <downloadexcel-->
          <!--                icon-->
          <!--                color="black"-->
          <!--                class="bg-none float-right "-->
          <!--                :data="receivableList"-->
          <!--                :fields="exfield"-->
          <!--                type="xls"-->
          <!--                worksheet="AR Balance Summary"-->
          <!--                name="ReceivableBalanceSummary.xls">-->
          <!--              <v-icon class="font_34" style="color: black;margin-top: 3px;margin-left: 10px;">fa-->
          <!--                fa-file-excel-->
          <!--              </v-icon>-->
          <!--            </downloadexcel>-->
          <!--          </v-col>-->
          <v-col sm="1" cols="12" class="py-0">
            <!--                        <v-row>-->
            <!--                            <v-col sm="12" cols="12">-->
            <!--                                <v-btn color="primary" class="text-capitalize white&#45;&#45;text float-right">-->
            <!--                                    {{ $t('view') }}-->
            <!--                                </v-btn>-->
            <!--                            </v-col>-->
            <!--                        </v-row>-->
            <!-- <v-row>
              <v-col sm="12" cols="12" class="pt-4">
                <v-btn icon color="black" class="bg-none float-right ">
                  <v-icon class="font_34">fa fa-file-excel</v-icon>
                </v-btn>

                <v-btn icon color="black" class="bg-none float-right ml-2">
                  <v-icon class="font_34">fa fa-print</v-icon>
                </v-btn>
              </v-col>
            </v-row> -->

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
                          :excel-file-name="'Receivable Balance Summary.xlsx'"
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
// import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
// import kendo from "@progress/kendo-ui";
// import downloadexcel from "vue-json-excel";

import JSZip from "jszip";
window.JSZip = JSZip;
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const defaultItem = {['numberName']: 'Select customer...', ['id']: null}
const customerHandler = require("@/scripts/customerHandler")
const emptyItem = {['numberName']: 'loading ...'}
// const $ = require("jquery")
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

    exfield: {
      'Name': 'name',
      'Type': 'customerType',
      'Group': 'customerGroup',
      'Balance': 'balance',
      'Over Due': 'overDue',
    },
  }),
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    'app-datepicker': DatePickerComponent,
    'dropdownlist': DropDownList,
    // downloadexcel: downloadexcel
  },
  methods: {
    async balanceSummary() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved')
          this.showLoading = true
          let strFilter = ''
          strFilter = '?asOf=' + this.asOf + '&type=bal-' + '&txnType=Customer'
          if (this.customer) {
            if (this.customer.id !== undefined && this.customer.id !== null) {
              strFilter = '?asOf=' + this.asOf + '&id=' + this.customer.id + '&type=bal-' + '&txnType=Customer'
            }
          }
          this.showLoading = true
          billingHandler.vendorDepositBalanceSummary(strFilter).then(res => {
            if (res.data.statusCode === 200) {
              this.receivableList = res.data.data
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
        field: "customerType",
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

.b-search:before {
  color: #fff !important;
}

</style>