<template>
  <v-row class="">
    <v-col sm="12" cols="12" class="pb-0 pt-4">
      <v-row>
        <v-col sm="12" class="py-md-0 px-md-2" cols="12">
          <v-card
            outlined
            dense
            color="white"
            class="pa-4 pb-0 no_border"
            min-height="347px"
          >
            <v-row>
              <v-col sm="12" cols="12" class="py-0">
                <h3
                  class="font_20"
                  :class="{ line_34: this.$i18n.locale == 'kh' }"
                >
                  {{ $t("cash_disburesments") }}
                </h3>
                <p class="mb-1">{{ $t("for_current_year") }}</p>
                <!-- <CashDisbursements height="240" /> -->
                         <v-row>
              <v-col sm="12" class="py-0" cols="12">
                <CashDisbursements height="340" />
              </v-col>
            </v-row>
              </v-col>
            </v-row>
            <LoadingMe
              :isLoading="showLoadingGraph"
              :fullPage="false"
              :myLoading="true"
              :type="'loading'"
            />
       
          </v-card>
        </v-col>
      </v-row>
      <!-- row 2 -->
      <v-row class="mt-0">
        <v-col class="py-0 pr-md-2" sm="4" cols="12">
        <v-card
            outlined
            dense
            class="pa-4 mt-4 no_border"
            min-height="268"
            color="grayBg"
          >
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("actual_expenditures") }}
            </h3>
            <p class="mb-0" >
              {{ $t("by_functions") }}
              <Expense/>
            </p>
            <LoadingMe
              :isLoading="showLoading3WayMatching"
              :fullPage="false"
              :myLoading="true"
              :type="'loading'"
            >
            </LoadingMe>
           
          </v-card>
        </v-col>
        <v-col class="py-0 px-md-2" sm="4" cols="12">
          <v-card
            outlined
            dense
            class="pa-4 mt-4 no_border"
            min-height="268"
            color="grayBg"
          >
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("actual_expenditure") }}
            </h3>
            <p class="mb-0"> 
              {{ $t("by_projects") }}
            </p>
            <LoadingMe
              :isLoading="showLoading3WayMatching"
              :fullPage="false"
              :myLoading="true"
              :type="'loading'"
            >
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
              :theme="'sass'"
            >
            </chart>
          </v-card>
        </v-col>
        <v-col class="py-0 pl-md-2" sm="4" cols="12">
          <v-card
            outlined
            dense
            class="pa-4 mt-4 no_border"
            min-height="268px"
            color="grayBg"
          >
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("expenditure_ratio") }}
            </h3>
            <p class="mb-0">
              {{ $t("for_current_year") }}
            </p>
            <v-row>
              <v-col sm="12" cols="12" class="pr-1 pb-0">
                <LoadingMe
                  :isLoading="showLoadingVendorAnalysis"
                  :fullPage="false"
                  :myLoading="true"
                  :type="'loading'"
                >
                </LoadingMe>
                <template>
                  <v-simple-table class="mb-3">
                    <template>
                      <tbody>
                        <tr>
                          <td class="text-left pl-0 py-1 with_50">
                            <span class="niradei_medium font_14 grey--text">
                              {{ $t("program_efficiency") }}
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
                              {{ $t("outstanding_advance") }}
                            </span>
                          </td>
                          <td class="text-right pr-0">
                            <span class="niradei_heavy font_18 dark_grey">
                              {{
                                numberFormat(avgRevenuePerVendor, decimalFormat)
                              }}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-left with_50 pl-0">
                            <span class="niradei_medium font_14 grey--text">
                              {{ $t("no_of_outstanding_advance") }}
                            </span>
                          </td>
                          <td class="text-right pr-0">
                            <span class="niradei_heavy font_18 dark_grey">
                              10
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-left with_50 pl-0">
                            <span class="niradei_medium font_14 grey--text">
                              {{ $t("ontime_settlement") }}
                            </span>
                          </td>
                          <td class="text-right pr-0">
                            <span class="niradei_heavy font_18 dark_grey">
                             9
                              %
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { Chart } from "@progress/kendo-charts-vue-wrapper";
import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui";
import dashboardHandler from "@/scripts/dashboard/customer/handler/dashboardHandler";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
export default {
  components: {
    chart: Chart,
    LoadingMe: () => import(`@/components/Loading`),
    CashDisbursements:  () => import(`@/components/npo/CashDisbursements`),
    Expense: () => import(`@/components/overview/ExpenseNpo`),
    // CashPositionNpo: () => import(`@/components/overview/CashPositionNpo`),
  },
  data: () => ({
    tooltip: {
      visible: true,
      template: "#= series.name #: #= kendo.toString(value, `n2`) #",
    },
    // line chart
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
      height: 190,
    },
    series: [
      {
        name: "Total Visits",
        field: "value",
        colorField: "chartColor",
        data: [
          { value: "100", chartColor: "#c80000" },
          { value: "70", chartColor: "#f44336" },
          { value: "50", chartColor: "#d85604" },
        ],
        //     '100', '70', '50'],
        // color: ['#00b050','#92d050','#212a35'],
        border: {
          width: 0,
        },
      },
    ],
    seriesActExpByFunction: [
      {
        name: "Total Visits",
        field: "value",
        colorField: "chartColor",
        data: [
          { value: "100", chartColor: "#c80000" },
          { value: "70", chartColor: "#f44336" },
          { value: "50", chartColor: "#d85604" },
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
      categories: ['MAE', 'PSE', 'FE'],
      majorGridLines: {
        visible: false,
      },
    },
    categoryAxisActExpByFunction: {
      categories: ['MAE', 'PSE', 'FE'],
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

    mostTermUsed: "",
    avgRevenuePerVendor: "",
    purchaseOrderToPurchaseRatio: "",
    payableToPurchaseRatio: "",

    decimalFormat: "n2",
    purchaseBalance: 0,
    purchaseVendors: 0,
    bills: 0,
    purchaseValuePerBill: 0,
    baseCurrency: "",

    dueThisWeekPExpense: 0,
    overCreditLimit: 0,
  }),
  methods: {
    numberFormat(value, format) {
      return kendo.toString(value, format);
    },
    numberFormatNoCurrency(value, format) {
      return kendo.toString(value, format);
    },
    async dashboardReceivableOverviewVendor() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          this.showLoadingTotalVendor = true;
          billingHandler
            .dashboardReceivableOverviewVendor(strFilter)
            .then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoadingTotalVendor = false;
                const response = res.data.data;
                this.vendorAsOfCount = response.vendorAsOfCount;
                this.overDueThisWeeks = response.overDueThisWeeks;
                this.newVendor = response.newVendor;
              } else {
                this.showLoadingTotalVendor = false;
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
          this.showLoadingAmountToPay = true;
          billingHandler.wcpPableOverviewList(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingAmountToPay = false;
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
              this.showLoadingAmountToPay = false;
            }
          });
        }, 10);
      });
    },
    async dashboardPurchase() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          this.showLoadingPurchase = true;
          dashboardHandler.vendorTotalPurchase(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingPurchase = false;
              const response = res.data.data;
              this.purchaseBalance = response.exchangeSubtotal || 0;
              this.purchaseVendors = response.vendors || 0;
              this.bills = response.bills || 0;
              this.purchaseValuePerBill = response.valuePerBill || 0;
              this.decimalFormat = response.decimalFormat;
              this.baseCurrency = response.baseCurrency || "";
            } else {
              this.showLoadingPurchase = false;
            }
          });
        }, 10);
      });
    },
    async dashboardSalePaymentGraph() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          this.showLoadingGraph = true;
          dashboardHandler
            .vendorPurchaseNPurchaseOrder(strFilter)
            .then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoadingGraph = false;
                // const response = res.data.data;
                // const purchaseX = response.purchaseNExpense || [];
                // const purchaseOrder = response.purchaseOrder || [];
                // const maxAxe = response.max || 0;
                // const axeLength = parseInt(maxAxe).toString().length - 1;
                // const axeIncre = parseInt(
                //   "1" + String(1).padStart(axeLength, "0")
                // );
                // this.seriesLine = [
                //   {
                //     type: "line",
                //     name: i18n.t("purchase"),
                //     data: purchaseX,
                //     color: "#4d4848",
                //   },
                //   {
                //     type: "line",
                //     name: i18n.t("purchase_order"),
                //     data: purchaseOrder,
                //     color: "#c80000",
                //   },
                // ];
                // this.valueAxis_line = [
                //   {
                //     max: maxAxe + axeIncre,
                //     labels: {
                //       format: "{0}",
                //     },
                //   },
                // ];
              } else {
                this.showLoadingGraph = false;
              }
            });
        }, 10);
      });
    },
    async dashboardVendorAnalysis() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          this.showLoadingVendorAnalysis = true;
          dashboardHandler.vendorPurchaseAnalysis(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingVendorAnalysis = false;
              const response = res.data.data;
              const topTerm = response.topTermUsed || {};
              this.mostTermUsed = topTerm.name || "";
              this.avgRevenuePerVendor = response.averageRevenue || 0;
              this.purchaseOrderToPurchaseRatio =
                response.purchaseOrderToPurchaseRatio || 0;
              this.payableToPurchaseRatio =
                response.payableToPurchaseRatio || 0;
            } else {
              this.showLoadingVendorAnalysis = false;
            }
          });
        }, 10);
      });
    },
    async dashboard3WayMatching() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          this.showLoading3WayMatching = true;
          dashboardHandler.vendor3WayMatching(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading3WayMatching = false;
              const response = res.data.data;
              const maxAxe = response.maxValue || 0;
              const axeLength = parseInt(maxAxe).toString().length - 1;
              const axeIncre = parseInt(
                "1" + String(1).padStart(axeLength, "0")
              );
              this.series = [
                {
                  name: "Total",
                  field: "value",
                  colorField: "chartColor",
                  data: response.series || [],
                  border: {
                    width: 0,
                  },
                },
              ];
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
              ];
            } else {
              this.showLoading3WayMatching = false;
            }
          });
        }, 10);
      });
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
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          dashboardHandler.vendorOverCreditLimit(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              const response = res.data.data;
              this.overCreditLimit = response.overCreditLimit || 0;
            }
          });
        }, 10);
      });
    },
    async loadData() {
      await this.loadAmountToPay();
      await this.dashboardReceivableOverviewVendor();
      await this.dashboardPurchase();
      await this.dashboardSalePaymentGraph();
      await this.dashboardVendorAnalysis();
      await this.dashboard3WayMatching();
      await this.dashboardReceivableOverview();
      await this.dashboardReceivableOverview();
    },
  },
  mounted: async function() {
    // await this.loadAmountToPay();
    // await this.dashboardReceivableOverviewVendor();
    // await this.dashboardPurchase();
    // await this.dashboardSalePaymentGraph();
    // await this.dashboardVendorAnalysis();
    // await this.dashboard3WayMatching();
    // await this.dashboardReceivableOverview();
    // await this.dashboardReceivableOverview();
  },
  computed: {},
};
</script>
<style scoped>
.theme--light.v-data-table {
  background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 38px !important;
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
