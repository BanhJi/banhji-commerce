<template>
  <v-row>
    <v-col sm="12" cols="12" class="">
      <v-card color="white" class="pl-2 no_border" elevation="0">
        <v-row>
          <v-col sm="6" cols="12" class="pt-0">
            <h2 class="mb-1 font_20">{{ $t('payable_aging_reports') }}</h2>
            <p class="mb-0">{{ $t('payable_aging_reports_desc') }}</p>
          </v-col>
          <v-col sm="4" cols="12" class="pb-0 kendo_dropdown_custom pd-0">
            <app-datepicker :initialDate="asOf"
                            @emitDate="asOf = $event"/>
            <dropdownlist
                :data-items="supplierList"
                @change="onChange"
                :value="supplier"
                :data-item-key="dataItemKey"
                :text-field="textField"
                :default-item="defaultItem"
                :filterable="true"
                @filterchange="onFilterChange">
            </dropdownlist>
          </v-col>
          <v-col sm="2" cols="12" class="py-0">
            <v-row>
              <v-col sm="12" cols="12">
                <v-btn color="primary" class="text-capitalize white--text float-right" @click="loadAging">
                  <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12" cols="12" class="py-0">
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

                <v-row >
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border white--text d-flex justify-space-between align-center" color="secondary" height="85px">
                            <h3 class="text-left text-uppercase font_13 flex-1">{{$t('suppliers')}}</h3>
                            <h3 class="text-right font_20 flex-1">{{ totalSupplier }}</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border white--text d-flex justify-space-between align-center" color="third" height="85px">
                            <h3 class="text-left text-uppercase  font_13 flex-1">{{$t('payable_balance')}}</h3>
                            <h3 class="text-right font_20 flex-1">{{ payableBalance }}</h3>
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
                                :data="payableAgingList"/>
              <kendo-grid id="gridPayableAging" class="grid-function"
                          :data-source-ref="'dataSource'"
                          :column-menu="true"
                          :noRecords="true"
                          :editable="false"
                          :scrollable-virtual="true">
                <kendo-grid-column
                    :field="'name'"
                    :attributes="{class:'tb_name_td'}"
                    :title="$t('name')"
                    :template="'<span>#=name#</span>'"
                    :width="200"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'_current'"
                    :title="$t('current')"
                    :template="'<span>#= kendo.toString(_current, decimalFormat)#</span>'"
                    :width="200"
                    :attributes="{style: 'text-align: right; '}"
                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                <kendo-grid-column
                    :field="'_1_30'"
                    :title="$t('1_30')"
                    :template="'<span>#= kendo.toString(_1_30, decimalFormat)#</span>'"
                    :width="200"
                    :attributes="{style: 'text-align: right; '}"
                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                <kendo-grid-column
                    :field="'_31_60'"
                    :title="$t('31_60')"
                    :template="'<span>#= kendo.toString(_31_60, decimalFormat)#</span>'"
                    :width="200"
                    :attributes="{style: 'text-align: right; '}"
                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                <kendo-grid-column
                    :field="'_61_90'"
                    :title="$t('61_90')"
                    :template="'<span>#= kendo.toString(_61_90, decimalFormat)#</span>'"
                    :width="200"
                    :attributes="{style: 'text-align: right; '}"
                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                <kendo-grid-column
                    :field="'_90'"
                    :title="$t('>_90')"
                    :template="'<span>#= kendo.toString(_90, decimalFormat)#</span>'"
                    :width="200"
                    :attributes="{style: 'text-align: right; '}"
                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                <kendo-grid-column
                    :field="'total'"
                    :title="$t('total')"
                    :template="'<span>#= kendo.toString(total, decimalFormat)#</span>'"
                    :width="200"
                    :attributes="{style: 'text-align: right; '}"
                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                <kendo-grid-column
                    :field="'percentOfPUEX'"
                    :title="$t('%_of_purchase_expense')"
                    :template="'<span>#= kendo.toString(percentOfPUEX, decimalFormat)#</span>'"
                    :width="200"
                    :attributes="{style: 'text-align: right; '}"
                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
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

const billingHandler = require("@/scripts/invoice/handler/billingHandler")

const defaultItem = {['numberName']: 'Select vendor...', ['id']: null}
const supplierHandler = require("@/scripts/supplierHandler")
const emptyItem = {['numberName']: 'loading ...'}

export default {
  data: () => ({
    showLoading: false,
    asOf: new Date().toISOString().substr(0, 10),
    supplierList: [],
    supplier: {},
    payableAgingList: [],
    textField: 'numberName',
    defaultItem: defaultItem,
    dataItemKey: 'id',
    filter: '',
    supBaseUrl: supplierHandler.search(),
    totalSupplier: 0,
    payableBalance: 0,
  }),
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    'app-datepicker': DatePickerComponent,
    'dropdownlist': DropDownList,
  },
  methods: {
    async loadAging() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved')
          this.showLoading = true
          let strFilter = ''
          strFilter = '?asOf=' + this.asOf
          if (this.supplier) {
            if (this.supplier.id !== undefined && this.supplier.id !== null) {
              strFilter = '?asOf=' + this.asOf + '&id=' + this.supplier.id
            }
          }
          this.showLoading = true
          billingHandler.wcpPayableAgingList(strFilter).then(res => {
            if (res.data.statusCode === 200) {
              this.payableAgingList = res.data.data
              const result = res.data.result
              this.payableBalance = kendo.toString(result.receivableBalance, result.decimalFormat)
              this.totalSupplier = kendo.toString(result.totalCustomer, `n0`)
              this.showLoading = false
            }
          })
        }, 300)
      })
    },
    onFilterChange(event) {
      const filter = event.filter.value
      this.requestData(0, filter, this.supBaseUrl)
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
      this.supplierList = json.data
    },
    onChange(event) {
      const value = event.value
      if (value && value['numberName'] === emptyItem['numberName']) {
        return;
      }
      this.supplier = value
    }
  },
  mounted: async function () {
    this.requestData(0, this.filter, this.supBaseUrl)
  },
  computed: {},
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