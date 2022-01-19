<template>
  <v-row class="">
    <v-col class="pb-0 pt-4" sm="12" cols="12">
      <v-row>
        <v-col class="py-0 pr-md-2" sm="4" cols="12">
          <div class="d-flex">
            <v-card
              outlined
              dense
              color="primary"
              class="pa-2 mb-4 flex-1 no_border niradei_bold"
              min-height="62px"
            >
              <v-row>
                <h6 class="col-sm-12 col-md-5 font_34 white--text">
                  {{ reOrderThisWeeks }}
                </h6>
                <h4
                  class="text-right flex_right white--text py-0 col-sm-12 col-md-7 font_16 text-uppercase"
                >
                  {{ $t("to_reorder_this_week") }}
                </h4>
              </v-row>
            </v-card>
            <v-btn style="height:62px !important;" color="primary" class="ml-1">
              <v-icon @click="reloadData()" size="30" color="white"
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
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("inventory_balance") }}
            </h3>
            <p class="mb-0">
              {{ $t("from_the_beginning_year") }}
            </p>
            <v-simple-table class="mb-0 mt-2">
              <LoadingMe
                :isLoading="showLoadingInvBalance"
                :fullPage="false"
                :myLoading="true"
                :type="'loading'"
              />
              <template>
                <thead>
                  <tr>
                    <th class="pl-0 text-left">{{ $t("name") }}</th>
                    <th class="text-center">{{ $t("sale") }}</th>
                    <th class="text-right">{{ $t("balance") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="top5 in top5InventoryBalance" v-bind:key="top5.id">
                    <td class="text-left pl-0 pr-1">
                      <span class="niradei_medium font_14 grey--text">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on"
                              >{{
                                top5.name.length > 16
                                  ? top5.name.substring(0, 15) + "..."
                                  : top5.name.substring(0, 15)
                              }}
                            </span>
                          </template>
                          <span>{{ top5.name }}</span>
                        </v-tooltip>
                      </span>
                    </td>
                    <td class="text-center pr-0">
                      <span class="niradei_heavy font_18 dark_grey">
                        {{
                          numberFormatNoCurrency(
                            top5.saleRatio,
                            top5.decimalFormat
                          )
                        }}
                        %
                      </span>
                    </td>
                    <td class="text-right pr-0">
                      <span class="niradei_heavy font_18 dark_grey">
                        {{
                          numberFormatNoCurrency(
                            top5.balanceRatio,
                            top5.decimalFormat
                          )
                        }}
                        %
                      </span>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <!-- <v-row>
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
                  >{{ $t("view_report") }}</router-link
                >
              </v-col>
            </v-row> -->
          </v-card>
          <!-- <v-card
            outlined
            dense
            class="pa-4 mt-4 no_border"
            min-height="274"
            color="grayBg"
          >
            <h3 class="font_20">{{ $t("key_value_category") }}</h3>
            <p class="mb-0">
              {{ $t("from_the_beginning_year") }}
            </p>
            <h2
              class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
            >
              10,000
            </h2>
            <template>
              <v-simple-table class="mb-3">
                <template>
                  <tbody>
                    <tr>
                      <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("turnover_days") }}
                        </span>
                      </td>
                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          50
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("%_of_revenue") }}
                        </span>
                      </td>
                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          80%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("average_margin") }}
                        </span>
                      </td>
                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          30%
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
                  >{{ $t("view_report") }}</router-link
                >
              </v-col>
            </v-row>
          </v-card> -->
          <v-card
            outlined
            dense
            class="pa-4 mt-4 no_border"
            min-height="273"
            color="grayBg"
          >
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("top_5_categories") }}
            </h3>
            <p class="mb-0">
              {{ $t("from_the_beginning_year") }}
            </p>
            <template>
              <LoadingMe
                :isLoading="showLoadingInvCategory"
                :fullPage="false"
                :myLoading="true"
                :type="'loading'"
              />
              <v-simple-table class="mb-0">
                <template>
                  <thead>
                    <tr>
                      <th class="pl-0 text-left">{{ $t("name") }}</th>
                      <th class="text-center">{{ $t("sale") }}</th>
                      <th class="text-right">{{ $t("balance") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="top5 in top5InventoryCategory"
                      v-bind:key="top5.id"
                    >
                      <td class="text-left pl-0 pr-1">
                        <span class="niradei_medium font_14 grey--text">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <span v-bind="attrs" v-on="on"
                                >{{
                                  top5.name.length > 16
                                    ? top5.name.substring(0, 15) + "..."
                                    : top5.name.substring(0, 15)
                                }}
                              </span>
                            </template>
                            <span>{{ top5.name }}</span>
                          </v-tooltip>
                        </span>
                      </td>
                      <td class="text-center pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          {{
                            numberFormatNoCurrency(
                              top5.saleRatio,
                              top5.decimalFormat
                            )
                          }}
                          %
                        </span>
                      </td>
                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          {{
                            numberFormatNoCurrency(
                              top5.balanceRatio,
                              top5.decimalFormat
                            )
                          }}
                          %
                        </span>
                      </td>
                    </tr>
                    <!--                  <tr>-->
                    <!--                    <td class="text-left pl-0">-->
                    <!--                        <span class="niradei_medium font_14 grey&#45;&#45;text">-->
                    <!--                          {{ $t("%cat2") }}-->
                    <!--                        </span>-->
                    <!--                    </td>-->
                    <!--                    <td class="text-center pr-0">-->
                    <!--                        <span class="niradei_heavy font_18 dark_grey">-->
                    <!--                          80%-->
                    <!--                        </span>-->
                    <!--                    </td>-->
                    <!--                    <td class="text-right pr-0">-->
                    <!--                        <span class="niradei_heavy font_18 dark_grey">-->
                    <!--                          70%-->
                    <!--                        </span>-->
                    <!--                    </td>-->
                    <!--                  </tr>-->
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card>
        </v-col>
        <v-col class="py-md-0 px-md-2 px-md-2" sm="8" cols="12">
          <v-row class="">
            <v-col class="py-0 pl-md-3" sm="12" cols="12">
              <v-card
                outlined
                dense
                color="grayBg"
                class="pa-4 no_border"
                min-height="346px"
              >
                <v-row>
                  <v-col sm="12" cols="12" class="py-0">
                    <h3
                      class="font_20"
                      :class="{ line_34: this.$i18n.locale == 'kh' }"
                    >
                      {{ $t("balance_purchase_sale") }}
                    </h3>
                    <p class="mb-6">{{ $t("from_the_beginning_year") }}</p>
                  </v-col>
                </v-row>
                <LoadingMe
                  :isLoading="showLoadingProductGraph"
                  :fullPage="false"
                  :myLoading="true"
                  :type="'loading'"
                />
                <chart
                  ref="chart"
                  :legend-position="'bottom'"
                  :legend-visible="false"
                  :tooltip="tooltip"
                  :series="seriesLine"
                  :chartArea="chartArea1"
                  :category-axis-categories="categories_line"
                  :value-axis="valueAxis_line"
                  :theme="'sass'"
                />
              </v-card>
            </v-col>
            <v-col sm="6" cols="12" class="pr-2 pb-0">
              <v-card
                outlined
                dense
                class="pa-4 mt-1 no_border"
                min-height="274"
                color="grayBg"
              >
                <h3
                  class="font_20"
                  :class="{ line_34: this.$i18n.locale == 'kh' }"
                >
                  {{ $t("product_purchase") }}
                </h3>
                <p class="mb-0">
                  {{ $t("from_the_beginning_year") }}
                </p>
                <h2
                  class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
                >
                  {{ numberFormat(purchaseBalance, decimalFormat) }}
                </h2>
                <template>
                  <LoadingMe
                    :isLoading="showLoadingProductPurchase"
                    :fullPage="false"
                    :myLoading="true"
                    :type="'loading'"
                  />
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
                              {{ purchaseNoOfVendors }}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-left pl-0">
                            <span class="niradei_medium font_14 grey--text">
                              {{ $t("items") }}
                            </span>
                          </td>
                          <td class="text-right pr-0">
                            <span class="niradei_heavy font_18 dark_grey">
                              {{ purchaseNoOfItems }}
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
                              {{ purchaseNoOfBills }}
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
            </v-col>
            <v-col sm="6" cols="12" class="pl-2 pb-0">
              <v-card
                outlined
                dense
                class="pa-4 mt-1 no_border"
                min-height="274"
                color="grayBg"
              >
                <h3
                  class="font_20"
                  :class="{ line_34: this.$i18n.locale == 'kh' }"
                >
                  {{ $t("product_sale") }}
                </h3>
                <p class="mb-0">
                  {{ $t("from_the_beginning_year") }}
                </p>
                <h2
                  class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
                >
                  {{ numberFormat(saleBalance, decimalFormat) }}
                </h2>
                <template>
                  <LoadingMe
                    :isLoading="showLoadingProductSale"
                    :fullPage="false"
                    :myLoading="true"
                    :type="'loading'"
                  />
                  <v-simple-table class="mb-3">
                    <template>
                      <tbody>
                        <tr>
                          <td class="text-left pl-0">
                            <span class="niradei_medium font_14 grey--text">
                              {{ $t("customers") }}
                            </span>
                          </td>
                          <td class="text-right pr-0">
                            <span class="niradei_heavy font_18 dark_grey">
                              {{ saleNoOfCustomers }}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-left pl-0">
                            <span class="niradei_medium font_14 grey--text">
                              {{ $t("items") }}
                            </span>
                          </td>
                          <td class="text-right pr-0">
                            <span class="niradei_heavy font_18 dark_grey">
                              {{ saleNoOfItems }}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-left pl-0">
                            <span class="niradei_medium font_14 grey--text">
                              {{ $t("invoices") }}
                            </span>
                          </td>
                          <td class="text-right pr-0">
                            <span class="niradei_heavy font_18 dark_grey">
                              {{ saleNoOfBills }}
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
                      to="invoice"
                      class="font_16 text-capitalize rounded-0 white--text"
                      color="primary"
                    >
                      + {{ $t("invoice") }}
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
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
// import { i18n } from "@/i18n";
import { Chart } from "@progress/kendo-charts-vue-wrapper";
import dashboardHandler from "@/scripts/dashboard/customer/handler/dashboardHandler";
import kendo from "@progress/kendo-ui";
import { i18n } from "@/i18n";
import billingHandler from "@/scripts/invoice/handler/billingHandler";

export default {
  components: {
    chart: Chart,
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    item_st: "item for item of product sale 1",
    tooltip: {
      visible: true,
      template: "#= series.name #: #= kendo.toString(value, `n2`) #",
    },
    chartArea: {
      background: "transparent",
      height: 110,
    },
    seriesLine: [
      {
        type: "line",
        name: "Purchase",
        data: [],
        color: "#4d4848",
        border: {
          width: 0,
        },
      },
      {
        type: "line",
        name: "Sale",
        data: [],
        color: "#c80000",
        border: {
          width: 0,
        },
      },
      {
        type: "line",
        name: "Balance",
        data: [],
        color: "#ED1A3A",
      },
    ],
    categories_line: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    chartArea1: {
      background: "transparent",
      height: 230,
    },
    valueAxis_line: [
      {
        max: 100,
        // visible: false,
        labels: {
          format: "{0}",
        },
      },
    ],
    series2: [
      {
        name: "Total Visits",
        data: [],
        color: "#c80000",
        border: {
          width: 0,
        },
      },
    ],
    valueAxis1: [
      {
        max: 200000,
        line: {
          visible: false,
        },
        minorGridLines: {
          visible: false,
        },
        labels: {
          rotation: "auto",
        },
      },
    ],
    categoryAxis1: {
      categories: ["50%+", "25-50%", "0-25%"],
      majorGridLines: {
        visible: false,
      },
    },
    tooltip2: {
      visible: true,
      template: "#= series.name #: #= value #",
    },

    asOf: new Date().toISOString().substr(0, 10),
    showLoadingInvBalance: false,
    showLoadingInvCategory: false,
    showLoadingProductPurchase: false,
    showLoadingProductSale: false,
    showLoadingProductGraph: false,
    baseCurrency: "",
    decimalFormat: "n2",
    top5InventoryBalance: [],
    top5InventoryCategory: [],

    purchaseBalance: 0,
    purchaseNoOfBills: 0,
    purchaseNoOfItems: 0,
    purchaseNoOfVendors: 0,

    saleBalance: 0,
    saleNoOfBills: 0,
    saleNoOfItems: 0,
    saleNoOfCustomers: 0,

    reOrderThisWeeks: 0,
  }),
  mounted: async function() {
    await this.dashboardTop5Balance();
    await this.dashboardTop5Category();
    await this.dashboardProductPurchase();
    await this.dashboardProductSale();
    await this.dashboardProductGraph();
    await this.dashboardReorderThisWeek();
  },
  computed: {},
  methods: {
    async loadData() {
      await this.dashboardTop5Balance();
      await this.dashboardTop5Category();
      await this.dashboardProductPurchase();
      await this.dashboardProductSale();
      await this.dashboardProductGraph();
      await this.dashboardReorderThisWeek();
    },
    numberFormat(value, format) {
      return kendo.toString(value, format);
    },
    numberFormatNoCurrency(value, format) {
      return kendo.toString(value, format);
    },
    async dashboardTop5Balance() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          this.showLoadingInvBalance = true;
          dashboardHandler.top5InventoryBalance(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingInvBalance = false;
              const response = res.data.data;
              this.top5InventoryBalance = response;
              this.baseCurrency = response.baseCurrency || "";
              // const balance = response.balance || []
              // window.console.log(response, 'res')
            } else {
              this.showLoadingInvBalance = false;
            }
          });
        }, 10);
      });
    },
    async dashboardTop5Category() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          this.showLoadingInvCategory = true;
          dashboardHandler.top5InventoryCategory(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingInvCategory = false;
              const response = res.data.data;
              this.top5InventoryCategory = response;
              // const balance = response.balance || []
              // window.console.log(response, 'res')
            } else {
              this.showLoadingInvCategory = false;
            }
          });
        }, 10);
      });
    },
    async dashboardProductPurchase() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          this.showLoadingProductPurchase = true;
          dashboardHandler.productPurchase(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingProductPurchase = false;
              const response = res.data.data;
              this.baseCurrency = response.baseCurrency || "";
              this.purchaseBalance = response.exchangeItemSubtotal || 0;
              this.purchaseNoOfItems = response.items || 0;
              this.purchaseNoOfBills = response.bills || 0;
              this.purchaseNoOfVendors = response.vendors || 0;
            } else {
              this.showLoadingProductPurchase = false;
            }
          });
        }, 10);
      });
    },
    async dashboardProductSale() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          this.showLoadingProductSale = true;
          dashboardHandler.productSale(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingProductSale = false;
              const response = res.data.data;
              this.baseCurrency = response.baseCurrency || "";
              this.saleBalance = response.exchangeItemSubtotal || 0;
              this.saleNoOfItems = response.items || 0;
              this.saleNoOfBills = response.bills || 0;
              this.saleNoOfCustomers = response.customers || 0;
            } else {
              this.showLoadingProductSale = false;
            }
          });
        }, 10);
      });
    },
    async dashboardProductGraph() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          this.showLoadingProductGraph = true;
          dashboardHandler.productGraph(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingProductGraph = false;
              const response = res.data.data;
              this.baseCurrency = response.baseCurrency || "";
              const balance = response.balance || [];
              const purchase = response.purchase || [];
              const sale = response.sale || [];
              const maxAxe = response.max || 0;
              const axeLength = parseInt(maxAxe).toString().length - 1;
              const axeIncre = parseInt(
                "1" + String(1).padStart(axeLength, "0")
              );
              this.seriesLine = [
                {
                  type: "line",
                  name: i18n.t("balance"),
                  data: balance,
                  color: "#4d4848",
                  border: {
                    width: 0,
                  },
                },
                {
                  type: "line",
                  name: i18n.t("purchase"),
                  data: purchase,
                  color: "#c80000",
                  border: {
                    width: 0,
                  },
                },
                {
                  type: "line",
                  name: i18n.t("sale"),
                  data: sale,
                  color: "#ED1A3A",
                },
              ];
              this.valueAxis_line = [
                {
                  max: maxAxe + axeIncre,
                  // visible: false,
                  labels: {
                    format: "{0}",
                  },
                },
              ];
            } else {
              this.showLoadingProductGraph = false;
            }
          });
        }, 10);
      });
    },
    async dashboardReorderThisWeek() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const startDate = this.asOf;
          let strFilter = "?asOf=" + startDate + "&reOrder=true";
          this.reOrderThisWeeks = 0;
          billingHandler.inventoryBalance(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              const response = res.data.data;
              this.reOrderThisWeeks = response.length;
            }
          });
        }, 10);
      });
    },
  },
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

element.style {
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}

.v-application--is-ltr
  .v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > th,
.v-application--is-ltr
  .v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th,
.v-application--is-ltr
  .v-data-table
  > .v-data-table__wrapper
  > table
  > tfoot
  > tr
  > th {
  text-align: left;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  color: rgba(0, 0, 0, 0.6);
}

.v-data-table.nomal_table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 14px !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 0.75rem;
  height: 25px !important;
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

.v-input__slot:before {
}

@media (max-width: 576px) {
}
</style>
