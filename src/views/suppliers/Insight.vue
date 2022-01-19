<template>
  <v-row class="">
    <v-col sm="12" cols="12" class="pb-0 pt-4">
      <v-row>
        <v-col sm="4" class="py-0 pr-md-2" cols="12">
          <div class="d-flex">
          <v-card
              outlined
              dense
              color="primary"
              class="pa-2 mb-4 no_border flex-1 niradei_bold"
              min-height="62px"
          >
            <v-row>
              <h6 class="col-sm-12 col-md-5 font_34 white--text">{{ dueThisWeekPExpense }}</h6>
              <h4
                  class="flex_right py-0 text-right white--text white--text col-sm-12 col-md-7 font_16 text-uppercase"
              >
                <span  class="float-right">{{
                    $t("to_pay_the_week")
                  }}</span>
              </h4>

            </v-row>
          </v-card>
          <v-btn style="height:62px !important;" color="primary" class="ml-1">
              <v-icon @click="loadData" size="30" color="white"
                >mdi-reload</v-icon
              >
            </v-btn>
          </div>
          <v-card
              outlined
              dense
              class="pa-4 no_border"
              min-height="268"
              color="grayBg"
          >
            <h3 class="font_20" :class="{'line_34':this.$i18n.locale=='kh'}">{{ $t("amount_to_pay") }}</h3>
            <p class="mb-0">
              {{ $t("as_of_today") }}
            </p>
            <h2
                class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
            >
              {{ amountToPayBalance }}
            </h2>
            <template>
              <LoadingMe
                  :isLoading="showLoadingAmountToPay"
                  :fullPage="false"
                  :myLoading="true"
                  :type="'loading'">
              </LoadingMe>
              <v-simple-table class="mb-3">
                <template>
                  <tbody>
                  <tr v-for="item in amountToPay" :key="item.name">
                    <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ item.name }} {{ $t(item.locale) }}
                        </span>
                    </td>
                    <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          {{ numberFormat(item.value, item.decimalFormat) }}
                        </span>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
            <v-row>
              <v-col sm="6" class="pr-0 py-0">
                <v-btn
                    to=""
                    class="font_16 text-capitalize rounded-0 white--text"
                    color="primary"
                >
                  + {{ $t("payment") }}
                </v-btn>
              </v-col>
              <v-col sm="6" class="pl-0 pb-0 text-right">
                <router-link
                    to=""
                    class="mb-0 niradei_bold font_16 primary--text text-right"
                >{{ $t("view_report") }}
                </router-link>
              </v-col>
            </v-row>
          </v-card>
          <v-card
              outlined
              dense
              class="pa-4 mt-4 no_border"
              min-height="268"
              color="grayBg"
          >
            <h3 class="font_20" :class="{'line_34':this.$i18n.locale=='kh'}">{{ $t("total_vendors") }}</h3>
            <p class="mb-0">
              {{ $t("as_of_today") }}
            </p>
            <h2
                class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
            >
              {{ vendorAsOfCount }}
            </h2>
            <template>
              <LoadingMe
                  :isLoading="showLoadingTotalVendor"
                  :fullPage="false"
                  :myLoading="true"
                  :type="'loading'">
              </LoadingMe>
              <v-simple-table class="mb-3">
                <template>
                  <tbody>
                  <tr>
                    <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("new") }}
                        </span>
                    </td>
                    <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          {{ newVendor }}
                        </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("overdue") }}
                        </span>
                    </td>
                    <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          {{ overDueThisWeeks }}
                        </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("inactive") }}
                        </span>
                    </td>
                    <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          {{ inActive }}
                        </span>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
            <v-row>
              <v-col sm="6" class="pr-0 py-0">
                <v-btn
                    to=""
                    class="font_16 text-capitalize rounded-0 white--text"
                    color="primary"
                >
                  + {{ $t("new") }}
                </v-btn>
              </v-col>
              <v-col sm="6" class="pl-0 pb-0 text-right">
                <router-link
                    to=""
                    class="mb-0 niradei_bold font_16 primary--text text-right"
                >{{ $t("view_report") }}
                </router-link>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col sm="4" class="py-md-0 px-md-2" cols="12">
          <v-card
              outlined
              dense
              color="third"
              class="pa-2 mb-4 no_border niradei_bold "
              min-height="52px">
            <v-row>
              <h6 class="white--text col-sm-12 col-md-5 font_34">{{ overCreditLimit }}</h6>
              <h4
                  class="text-right flex_right col-md-7 white--text col-sm-12 py-0 font_16 text-uppercase">
                {{ $t("over_credit_limit") }}
              </h4>
            </v-row>
          </v-card>
          <v-card
              outlined
              dense
              class="pa-4 no_border"
              min-height="268"
              color="grayBg"
          >
            <h3 class="font_20" :class="{'line_34':this.$i18n.locale=='kh'}">{{ $t("total_purchase") }}</h3>
            <p class="mb-0">
              {{ $t("from_the_beginning_year") }}
            </p>
            <h2 class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">
              {{ numberFormat(purchaseBalance, decimalFormat) }}
            </h2>
            <template>
              <LoadingMe
                  :isLoading="showLoadingPurchase"
                  :fullPage="false"
                  :myLoading="true"
                  :type="'loading'">
              </LoadingMe>
              <v-simple-table class="mb-3">
                <template>
                  <tbody>
                  <tr>
                    <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("vendors") }}
                        </span>
                    </td>
                    <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          {{ purchaseVendors }}
                        </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("value_per_purchase") }}
                        </span>
                    </td>
                    <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                         {{ numberFormat(purchaseValuePerBill, decimalFormat) }}
                        </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("bills") }}
                        </span>
                    </td>
                    <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          {{ bills }}
                        </span>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
            <v-row>
              <v-col sm="6" class="pr-0 py-0">
                <v-btn
                    to=""
                    class="font_16 text-capitalize rounded-0 white--text"
                    color="primary"
                >
                  + {{ $t("purchase") }}
                </v-btn>
              </v-col>
              <v-col sm="6" class="pl-0 pb-0 text-right">
                <router-link
                    to=""
                    class="mb-0 niradei_bold font_16 primary--text text-right"
                >{{ $t("view_report") }}
                </router-link>
              </v-col>
            </v-row>
          </v-card>
          <v-card
              outlined
              dense
              class="pa-4 mt-4 no_border"
              min-height="268"
              color="grayBg">
            <h3 class="font_20" :class="{'line_34':this.$i18n.locale=='kh'}">{{ $t("3_ways_matching") }}</h3>
            <p>
              {{ $t("from_the_beginning_year") }}
            </p>
            <LoadingMe
                :isLoading="showLoading3WayMatching"
                :fullPage="false"
                :myLoading="true"
                :type="'loading'">
            </LoadingMe>
            <chart
                :title-text="''"
                :chartArea="chartAreaChart1"
                :legend-visible="false"
                :series-defaults-type="'column'"
                :series="series"
                :category-axis="categoryAxis"
                :value-axis="valueAxis"
                :tooltip="tooltip1"
                :theme="'sass'">
            </chart>
          </v-card>
        </v-col>
        <v-col class="py-0 pl-md-2" sm="4" cols="12">
          <v-card
              outlined
              dense
              color="grayBg"
              class="pa-4 no_border"
              min-height="347px"
          >
            <v-row>
              <v-col sm="12" cols="12" class="py-0">
                <h3 class="font_20" :class="{'line_34':this.$i18n.locale=='kh'}">{{ $t("purchase_purchase_order") }}</h3>
                <p class="mb-7">{{ $t("from_the_beginning_year") }}</p>
              </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoadingGraph"
                :fullPage="false"
                :myLoading="true"
                :type="'loading'"/>
            <chart
                ref="chart"
                :legend-position="'bottom'"
                :legend-visible="false"
                :tooltip="tooltip"
                :series="seriesLine"
                :chartArea="chartArea"
                :category-axis-categories="categories_line"
                :value-axis="valueAxis_line"
                :theme="'sass'"
            />
          </v-card>
          <v-card
              outlined
              dense
              class="pa-4 mt-4 no_border"
              min-height="268px"
              color="grayBg"
          >
            <h3 class="font_20" :class="{'line_34':this.$i18n.locale=='kh'}">{{ $t("vendors_analysis") }}</h3>
            <p class="mb-0">
              {{ $t("from_the_beginning_year") }}
            </p>
            <v-row>
              <v-col sm="12" cols="12" class="pr-1 pb-0">
                <LoadingMe
                    :isLoading="showLoadingVendorAnalysis"
                    :fullPage="false"
                    :myLoading="true"
                    :type="'loading'">
                </LoadingMe>
                <template>
                  <v-simple-table class="mb-3">
                    <template>
                      <tbody>
                      <tr>
                        <td class="text-left pl-0 py-1 with_50">
                            <span class="niradei_medium font_14 grey--text">
                              {{ $t("payment_term") }}
                            </span>
                        </td>
                        <td class="text-right pr-0">
                            <span class="niradei_heavy font_18 dark_grey">
                              {{ mostTermUsed }}
                            </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-left with_50 pl-0">
                            <span class="niradei_medium font_14 grey--text">
                              {{ $t("average_purchase_per_vendor") }}
                            </span>
                        </td>
                        <td class="text-right pr-0">
                            <span class="niradei_heavy font_18 dark_grey">
                              {{ numberFormat(avgRevenuePerVendor, decimalFormat) }}
                            </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-left with_50 pl-0">
                            <span class="niradei_medium font_14 grey--text">
                              {{ $t("purchase_order_to_bill_ratio") }}
                            </span>
                        </td>
                        <td class="text-right pr-0">
                            <span class="niradei_heavy font_18 dark_grey">
                             {{ numberFormatNoCurrency(purchaseOrderToPurchaseRatio, decimalFormat) }} %
                            </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-left  with_50 pl-0">
                            <span class="niradei_medium font_14 grey--text">
                              {{ $t("payable_purchase_ratio_vendor") }}
                            </span>
                        </td>
                        <td class="text-right pr-0">
                            <span class="niradei_heavy font_18 dark_grey">
                              {{ numberFormatNoCurrency(payableToPurchaseRatio, decimalFormat) }} %
                            </span>
                        </td>
                      </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>
              </v-col>
              <!-- <v-col sm="6" cols="12" class="pl-0 pt-0 pb-0">
                <chart
                  ref="chart"
                  :legend-visible="false"
                  :series-defaults-labels-visible="false"
                  :series="series_chart"
                  :tooltip-template="tooltipTemplate"
                  :chartArea="chartAreaChart"
                  :tooltip-visible="true"
                  :height="100"
                  :theme="'sass'"
                />
              </v-col> -->
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import {Chart} from "@progress/kendo-charts-vue-wrapper";
import {i18n} from "@/i18n";
import kendo from "@progress/kendo-ui";
import dashboardHandler from "@/scripts/dashboard/customer/handler/dashboardHandler";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
export default {
  components: {
    chart: Chart,
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    tooltip: {
      visible: true,
      template: "#= series.name #: #= kendo.toString(value, `n2`) #",
    },
    // line chart
    seriesLine: [
      {
        type: "line",
        name: i18n.t('purchase'),
        data: [0, 0, 0, 0, 0, 0],
        color: "#4d4848",
      },
      {
        type: "line",
        name: i18n.t('purchase_order'),
        data: [0, 0, 0, 0, 0, 0],
        color: "#c80000",
      },
    ],
    categories_line: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    chartArea: {
      background: "transparent",
      height: 230,
    },
    valueAxis_line: [
      {
        max: 10,
        // visible: false,
        labels: {
          format: "{0}",
        },
      },
    ],
    // pie chart
    labelTemplate: "#= category # #= value #%",
    tooltipTemplate: "#= category # : #= value #%",
    chartAreaChart: {
      background: "transparent",
      height: 190,
    },
    series_chart: [
      {
        type: "pie",
        startAngle: 180,
        data: [
          {
            category: i18n.t("credit_card"),
            value: 22,
            color: "#c80000",
          },
          {
            category: i18n.t("working_capital"),
            value: 45,
            color: "#f44336",
          },
          {
            category: i18n.t("investment"),
            value: 11,
            color: "#d85604",
          },
          {
            category: i18n.t("overdraft"),
            value: 22,
            color: "#e88d14",
          },
        ],
      },
    ],
    // bar chart
    chartAreaChart1: {
      background: "transparent",
      height: 170,
    },
    series: [
      {
        name: "Total Visits",
        field: "value",
        colorField: "chartColor",
        data: [
          {value: "100", chartColor: "#c80000"},
          {value: "70", chartColor: "#f44336"},
          {value: "50", chartColor: "#d85604"},
        ],
        //     '100', '70', '50'],
        // color: ['#00b050','#92d050','#212a35'],
        border: {
          width: 0,
        },
      },
    ],
    valueAxis: [
      {
        max: 100,
        line: {
          visible: false,
        },
        minorGridLines: {
          visible: false,
        },
      },
    ],
    categoryAxis: {
      categories: [i18n.t("order"), i18n.t("purchase"), i18n.t("receipt")],
      majorGridLines: {
        visible: false,
      },
    },
    tooltip1: {
      visible: true,
      template: "#= series.name #: #= kendo.toString(value, `n2`) #",
    },
    asOf: new Date().toISOString().substr(0, 10),
    vendorAsOfCount: 0,
    overDueThisWeeks: 0,
    inActive: 0,
    newVendor: 0,
    amountToPayBalance: 0,
    amountToPay: [],


    showLoadingPurchase: false,
    showLoadingAmountToPay: false,
    showLoadingTotalVendor: false,
    showLoadingVendorAnalysis: false,
    showLoadingGraph: false,
    showLoading3WayMatching: false,

    mostTermUsed: '',
    avgRevenuePerVendor: '',
    purchaseOrderToPurchaseRatio: '',
    payableToPurchaseRatio: '',

    decimalFormat: 'n2',
    purchaseBalance: 0,
    purchaseVendors: 0,
    bills: 0,
    purchaseValuePerBill: 0,
    baseCurrency: '',

    dueThisWeekPExpense: 0,
    overCreditLimit: 0,
  }),
  methods: {
    numberFormat(value, format) {
      return  kendo.toString(value, format)
    },
    numberFormatNoCurrency(value, format) {
      return kendo.toString(value, format)
    },
    async dashboardReceivableOverviewVendor() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          this.showLoadingTotalVendor = true
          billingHandler
              .dashboardReceivableOverviewVendor(strFilter)
              .then((res) => {
                if (res.data.statusCode === 200) {
                  this.showLoadingTotalVendor = false
                  const response = res.data.data;
                  this.vendorAsOfCount = response.vendorAsOfCount;
                  this.overDueThisWeeks = response.overDueThisWeeks;
                  this.newVendor = response.newVendor;
                } else {
                  this.showLoadingTotalVendor = false
                }
              });
        }, 10);
      });
    },
    async loadAmountToPay() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf + "&type=amount_to_pay";
          this.showLoadingAmountToPay = true
          billingHandler.wcpPableOverviewList(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingAmountToPay = false
              const response = res.data.data[0];
              this.amountToPay = response.lines;
              // this.decimalFormat = response.decimalFormat
              // this.lastUpdated = response.lastUpdatedAt
              // const paymentTerm = response.paymentTermUsed
              // this.mostPaymentTermUsed = paymentTerm.name
              this.amountToPayBalance = this.numberFormat(
                  response.openBalance,
                  response.decimalFormat
              );
              // this.showLoading = false
            } else {
              this.showLoadingAmountToPay = false
            }
          });
        }, 10);
      });
    },
    async dashboardPurchase() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved')
          let strFilter = ''
          strFilter = '?asOf=' + this.asOf
          this.showLoadingPurchase = true
          dashboardHandler.vendorTotalPurchase(strFilter).then(res => {
            if (res.data.statusCode === 200) {
              this.showLoadingPurchase = false
              const response = res.data.data
              this.purchaseBalance = response.exchangeSubtotal || 0
              this.purchaseVendors = response.vendors || 0
              this.bills = response.bills || 0
              this.purchaseValuePerBill = response.valuePerBill || 0
              this.decimalFormat = response.decimalFormat
              this.baseCurrency = response.baseCurrency || ''
            } else {
              this.showLoadingPurchase = false
            }
          })
        }, 10)
      })
    },
    async dashboardSalePaymentGraph() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved')
          let strFilter = ''
          strFilter = '?asOf=' + this.asOf
          this.showLoadingGraph = true
          dashboardHandler.vendorPurchaseNPurchaseOrder(strFilter).then(res => {
            if (res.data.statusCode === 200) {
              this.showLoadingGraph = false
              const response = res.data.data
              const purchaseX = response.purchaseNExpense || []
              const purchaseOrder = response.purchaseOrder || []
              const maxAxe = response.max || 0
              const axeLength = (parseInt(maxAxe).toString().length - 1)
              const axeIncre = parseInt('1' + String(1).padStart(axeLength, '0'))
              window.console.log(axeIncre, '-', axeLength)
              this.seriesLine = [
                {
                  type: "line",
                  name: i18n.t("purchase"),
                  data: purchaseX,
                  color: "#4d4848",
                },
                {
                  type: "line",
                  name: i18n.t("purchase_order"),
                  data: purchaseOrder,
                  color: "#c80000",
                },
              ]
              this.valueAxis_line = [
                {
                  max: maxAxe + axeIncre,
                  labels: {
                    format: "{0}",
                  }
                }
              ]
            } else {
              this.showLoadingGraph = false
            }
          })
        }, 10)
      })
    },
    async dashboardVendorAnalysis() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved')
          let strFilter = ''
          strFilter = '?asOf=' + this.asOf
          this.showLoadingVendorAnalysis = true
          dashboardHandler.vendorPurchaseAnalysis(strFilter).then(res => {
            if (res.data.statusCode === 200) {
              this.showLoadingVendorAnalysis = false
              const response = res.data.data
              const topTerm = response.topTermUsed || {}
              this.mostTermUsed = topTerm.name || ''
              this.avgRevenuePerVendor = response.averageRevenue || 0
              this.purchaseOrderToPurchaseRatio = response.purchaseOrderToPurchaseRatio || 0
              this.payableToPurchaseRatio = response.payableToPurchaseRatio || 0
            } else {
              this.showLoadingVendorAnalysis = false
            }
          })
        }, 10)
      })
    },
    async dashboard3WayMatching() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved')
          let strFilter = ''
          strFilter = '?asOf=' + this.asOf
          this.showLoading3WayMatching = true
          dashboardHandler.vendor3WayMatching(strFilter).then(res => {
            if (res.data.statusCode === 200) {
              this.showLoading3WayMatching = false
              const response = res.data.data
              const maxAxe = response.maxValue || 0
              const axeLength = (parseInt(maxAxe).toString().length - 1)
              const axeIncre = parseInt('1' + String(1).padStart(axeLength, '0'))
              this.series = [
                {
                  name: "Total",
                  field: "value",
                  colorField: "chartColor",
                  data: response.series || [],
                  border: {
                    width: 0,
                  }
                }
              ]
              this.valueAxis = [
                {
                  max: (response.maxValue || 0) + axeIncre,
                  line: {
                    visible: false,
                  },
                  minorGridLines: {
                    visible: false,
                  },
                  labels: {
                    visible: true,
                    font: "10px",
                  },
                },
              ]
            } else {
              this.showLoading3WayMatching = false
            }
          })
        }, 10)
      })
    },
    async dashboardReceivableOverview() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          billingHandler.dashboardReceivableOverview(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              const response = res.data.data;
              this.dueThisWeekPExpense = response.dueThisWeekPExpense;
            }
          });
        }, 10);
      });
    },
    async dashboardPurchaseOverCreditLimit() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved')
          let strFilter = ''
          strFilter = '?asOf=' + this.asOf
          dashboardHandler.vendorOverCreditLimit(strFilter).then(res => {
            if (res.data.statusCode === 200) {
              const response = res.data.data
              this.overCreditLimit = response.overCreditLimit || 0
            }
          })
        }, 10)
      })
    },
    async loadData(){
      await this.loadAmountToPay();
      await this.dashboardReceivableOverviewVendor();
      await this.dashboardPurchase();
      await this.dashboardSalePaymentGraph();
      await this.dashboardVendorAnalysis();
      await this.dashboard3WayMatching();
      await this.dashboardReceivableOverview();
      await this.dashboardReceivableOverview();
    }
  },
  mounted: async function () {
    await this.loadAmountToPay();
    await this.dashboardReceivableOverviewVendor();
    await this.dashboardPurchase();
    await this.dashboardSalePaymentGraph();
    await this.dashboardVendorAnalysis();
    await this.dashboard3WayMatching();
    await this.dashboardReceivableOverview();
    await this.dashboardReceivableOverview();
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
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.k-chart {
  height: 160px;
}

.v-data-table.big-th > .v-data-table__wrapper > table > tbody > tr > td {
  height: 50px !important;
}

.with_50 {
  width: 50%;
}

@media (max-width: 576px) {
}
</style>
