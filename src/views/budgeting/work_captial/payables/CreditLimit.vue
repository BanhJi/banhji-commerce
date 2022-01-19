<template>
  <v-row>
    <v-col sm="12" cols="12" class="">
      <v-card color="white" class="pl-2 no_border" elevation="0">
        <v-row>
          <v-col sm="8" cols="12" class="pt-0">
            <h2 class="mb-1 font_20">{{ $t('credit_limit_management') }}</h2>
            <p class="mb-5">{{ $t('credit_limit_management_desc') }}</p>

            <v-row>
              <v-col sm="6" cols="12" class="pt-0">
                <v-card outlined dense class="pa-3 no_border white--text d-flex justify-space-between align-center"
                        color="third" height="85px">
                  <h3 class="text-left text-uppercase font_13 flex-1">{{ $t('suppliers_with_over_credit_limit') }}</h3>
                  <h3 class="text-right font_13 font_20">{{ totalSupplier }}</h3>
                </v-card>
              </v-col>
              <v-col sm="6" cols="12" class="pt-0">
                <v-card outlined dense class="pa-3 no_border black--text d-flex justify-space-between align-center"
                        color="grayBg" height="85px">
                  <h3 class="text-left text-uppercase font_13 flex-1`">{{ $t('suppliers_with_90%_of_limit') }}</h3>
                  <h3 class="text-right flex-1 font_20">{{ supplier90Percentage }}</h3>
                </v-card>
              </v-col>
            </v-row>

          </v-col>
          <v-col sm="4" cols="12">
            <v-row>
              <v-col sm="12" cols="12" class="py-0 kendo_dropdown_custom pd-0">
                <app-datepicker :initialDate="asOf"
                                @emitDate="asOf = $event"/>
                <dropdownlist
                    :data-items="customerList"
                    @change="onChange"
                    :value="supplier"
                    :data-item-key="dataItemKey"
                    :text-field="textField"
                    :default-item="defaultItem"
                    :filterable="true"
                    @filterchange="onFilterChange">
                </dropdownlist>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="6" cols="12" class="py-0">
                <v-btn color="primary" class="text-capitalize white--text float-right" @click="loadCreditLimit">
                  <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                </v-btn>
              </v-col>
              <v-col sm="6" cols="12" class="py-0">
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
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  type="loading"
                  :myLoading="true"/>

              <kendo-datasource ref="dataSource"
                                :data="creditLimitList"/>
              <kendo-grid id="gridCreditLimit" class="grid-function"
                          :data-source-ref="'dataSource'"
                          :column-menu="true"
                          :noRecords="true"
                          :editable="false"
                          :scrollable-virtual="true">
                <kendo-grid-column
                    :field="'name'"
                    :title="$t('name')"
                    :attributes="{class:'tb_name_td'}"
                    :template="'<span>#=name#</span>'"
                    :width="200"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'balance'"
                    :title="$t('balance')"
                    :template="'<span>#= kendo.toString(balance, decimalFormat)#</span>'"
                    :attributes="{style: 'text-align: right; '}"
                    :width="200"
                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                <kendo-grid-column
                    :field="'creditLimit'"
                    :title="$t('credit_limit')"
                    :template="'<span>#= kendo.toString(creditLimit, decimalFormat)#</span>'"
                    :attributes="{style: 'text-align: right; '}"
                    :width="200"
                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                <kendo-grid-column
                    :field="'overDueBalance'"
                    :title="$t('overdue_balance')"
                    :template="'<span>#= kendo.toString(overDueBalance, decimalFormat)#</span>'"
                    :width="200"
                    :attributes="{style: 'text-align: right; '}"
                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                <kendo-grid-column
                    :field="'term'"
                    :title="$t('approved_term')"
                    :template="'<span>#= term#</span>'"
                    :width="200"
                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                <kendo-grid-column
                    :field="'totalSale'"
                    :title="$t('total_purchase_expense')"
                    :template="'<span>#= kendo.toString(totalSale, decimalFormat)#</span>'"
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

const billingHandler = require("@/scripts/invoice/handler/billingHandler")

const defaultItem = {['numberName']: 'Select vendor...', ['id']: null}
const supplierHandler = require("@/scripts/supplierHandler")
const emptyItem = {['numberName']: 'loading ...'}

export default {
  data: () => ({
    showLoading: false,
    asOf: new Date().toISOString().substr(0, 10),
    customerList: [],
    creditLimitList: [],
    supplier: {},
    dataItemKey: 'id',
    textField: 'numberName',
    defaultItem: defaultItem,
    filter: '',
    cusBaseUrl: supplierHandler.search(),
    totalSupplier: 0,
    supplier90Percentage: 0,
  }),
  mounted: async function () {
    this.requestData(0, this.filter, this.cusBaseUrl)
  },
  components: {
    'app-datepicker': DatePickerComponent,
    LoadingMe: () => import(`@/components/Loading`),
    'dropdownlist': DropDownList,
  },
  methods: {
    async loadCreditLimit() {
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
          billingHandler.wcpPayableCreditLimitList(strFilter).then(res => {
            if (res.data.statusCode === 200) {
              this.creditLimitList = res.data.data
              const result = res.data.result
              this.supplier90Percentage = parseFloat(result.customer90Percentage)
              this.totalSupplier = 0//parseFloat(result.totalCustomerOverCreditLimit ? result.totalCustomerOverCreditLimit : 0)
              this.showLoading = false
            }
          })
        }, 300)
      })
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
      this.supplier = value
    },
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