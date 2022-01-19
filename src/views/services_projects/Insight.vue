<template>
  <v-row class="">
    <v-col class="pb-0 pt-4" sm="12" cols="12">
      <v-row>
        <v-col class="pt-0 pb-md-2 pr-md-2" sm="4" cols="12">
          <div class="d-flex">
            <v-card
              outlined
              dense
              color="primary"
              class="pa-2 mb-4 no_border flex-1 niradei_bold flex-1"
              min-height="62px"
            >
              <v-row>
                <h6 class="col-sm-12 col-md-5 font_34 white--text">
                  {{ openProjects }}
                </h6>
                <h4
                  class="text-right flex_right white--text py-0 col-sm-12 col-md-7 font_16 text-uppercase"
                >
                  <span  class="float-right">{{
                    $t("active_projects")
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
            min-height="250"
            color="grayBg"
          >
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("project_ratio") }}
            </h3>
            <p class="mb-3">
              {{ $t("from_the_beginning_year") }}
            </p>
            <template>
              <v-simple-table class="add_bg">
                <LoadingMe
                  :isLoading="showLoadingServiceProjectRatio"
                  :fullPage="false"
                  :myLoading="true"
                  :type="'loading'"
                />
                <template>
                  <tbody>
                    <tr>
                      <td class="text-left pl-0 py-1" style="width: 50%">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("bid_to_win_ratio") }}
                        </span>
                      </td>
                      <td class="text-right">
                        <span class="niradei_heavy font_18 dark_grey">
                          {{
                            numberFormatNoCurrency(bidToWinRatio, decimalFormat)
                          }}
                          %
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left pl-0 py-1" style="width: 50%">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("average_revenue_per_customer") }}
                        </span>
                      </td>
                      <td class="text-right">
                        <span class="niradei_heavy font_18 dark_grey">
                          {{
                            numberFormat(avgRevenuePerProject, decimalFormat)
                          }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left pl-0 py-1" style="width: 50%">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("project_overrun") }}
                        </span>
                      </td>
                      <td class="text-right">
                        <span class="niradei_heavy font_18 dark_grey">
                          {{ overrun }} %
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left pl-0 py-1" style="width: 50%">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("project_delivery") }}
                        </span>
                      </td>
                      <td class="text-right">
                        <span class="niradei_heavy font_18 grey--text">
                          {{ delivered }} %
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card>
        </v-col>
        <!-- <v-col class="pt-0 pb-md-2 px-md-2" sm="4" cols="12">
          <v-card
            outlined
            dense
            color="third"
            class="pa-3 mb-4 no_border niradei_bold "
            min-height="65px"
          >
            <v-row>
              <h6 class="white--text col-sm-12 col-md-5 font_34">10</h6>
              <h4
                class="text-right white--text col-md-7 col-sm-12 py-0 font_16 text-uppercase"
              >
                <span style="width: 70%;" class="float-right">{{
                  $t("to_bill_this_week")
                }}</span>
              </h4>
            </v-row>
          </v-card>
        </v-col> -->
        <v-col class="pt-0 pb-md-2 pl-md-2" sm="8" cols="12">
          <v-card
            color="grayBg"
            outlined
            dense
            class="pa-4 no_border"
            min-height="327"
          >
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("revenue") }}
            </h3>
            <p class="mb-0">{{ $t("from_beginning_year") }}</p>
            <v-row>
              <v-col sm="12" cols="12" class="pl-1  py-0">
                <LoadingMe
                  :isLoading="showLoadingServiceGraph"
                  :fullPage="false"
                  :myLoading="true"
                  :type="'loading'"
                />
                <chart
                  ref="chart"
                  :legend-position="'bottom'"
                  :legend-visible="false"
                  :tooltip-visible="true"
                  :chartArea="chartAreaChartRevenue"
                  :tooltip-template="$t('revenue') + ': #: value #'"
                  :series="seriesLines"
                  :category-axis-categories="categories_line"
                  :value-axis="valueAxis_line"
                  :theme="'sass'"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col class="pb-0 pt-sm-2 pr-md-2" sm="4" cols="12">
          <v-card
            outlined
            dense
            class="pa-4 no_border"
            min-height="276"
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
                :isLoading="showLoadingTop5Category"
                :fullPage="false"
                :myLoading="true"
                :type="'loading'"
              />
              <v-simple-table class="mb-0 mt-3">
                <template>
                  <thead>
                    <tr>
                      <th class="pl-0 text-left">{{ $t("name") }}</th>
                      <th class="text-center"></th>
                      <th class="text-right">{{ $t("sale") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="top5 in top5ServiceCategory"
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
                        <span class="niradei_heavy font_18 dark_grey"> </span>
                      </td>
                      <td class="text-right pr-0">
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
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card>
        </v-col>
        <v-col class="pb-0 pt-sm-2 pl-md-2 pr-md-2" sm="4" cols="12">
          <!--          <v-card-->
          <!--              outlined-->
          <!--              dense-->
          <!--              class="pa-4 no_border"-->
          <!--              min-height="320px"-->
          <!--              color="grayBg">-->
          <!--            <h3 class="font_20" :class="{'line_34':this.$i18n.locale=='kh'} ">{{ $t("project_profitability") }}</h3>-->
          <!--            <p class="mb-0">-->
          <!--              {{ $t("from_the_beginning_year") }}-->
          <!--            </p>-->
          <!--            <v-row>-->
          <!--              <h2-->
          <!--                  class="primary&#45;&#45;text mb-0 pa-0 niradei_black mb-0 col-sm-9 text-right"-->
          <!--              >-->
          <!--                30%-->
          <!--              </h2>-->
          <!--              <p class="mb-0 pa-0 col-sm-3 pr-3 text-right">-->
          <!--                {{ $t("average_margin") }}-->
          <!--              </p>-->
          <!--            </v-row>-->
          <!--            <p class="mb-0 pa-0 col-sm-12">{{ $t("margin") }}</p>-->
          <!--            <v-row>-->
          <!--              <v-col class="py-0" sm="12" cols="12">-->
          <!--                <chart-->
          <!--                    :title-text="''"-->
          <!--                    :legend-visible="false"-->
          <!--                    :series-defaults-type="'bar'"-->
          <!--                    :series="series2"-->
          <!--                    :chart-area-background="''"-->
          <!--                    :category-axis="categoryAxis1"-->
          <!--                    :value-axis="valueAxis1"-->
          <!--                    :tooltip="tooltip2"-->
          <!--                    :theme="'sass'"-->
          <!--                >-->
          <!--                </chart>-->
          <!--                <p class="mb-0 text-center">{{ $t("revenue") }}</p>-->
          <!--              </v-col>-->
          <!--            </v-row>-->
          <!--          </v-card>-->
          <v-card
            outlined
            dense
            class="pa-4 no_border"
            min-height="274"
            color="grayBg"
          >
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("service_purchase") }}
            </h3>
            <p class="mb-0">
              {{ $t("from_the_beginning_year") }}
            </p>
            <h2
              class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
            >
              {{ numberFormat(servicePurchaseBalance, decimalFormat) }}
            </h2>
            <template>
              <LoadingMe
                :isLoading="showLoadingServicePurchase"
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
                          {{ servicePurchaseNoOfVendors }}
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
                          {{ servicePurchaseNoOfItems }}
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
                          {{ servicePurchaseNoOfBills }}
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
        <v-col class="pb-0 pt-sm-2 pl-md-2" sm="4" cols="12">
          <!--          <v-card-->
          <!--              outlined-->
          <!--              dense-->
          <!--              class="pa-4 no_border"-->
          <!--              min-height="324px"-->
          <!--              color="grayBg"-->
          <!--          >-->
          <!--            <h3 class="font_20" :class="{'line_34':this.$i18n.locale=='kh'} ">{{ $t("service_revenue_by_type") }}</h3>-->
          <!--            <p class="mb-0">{{ $t("from_the_beginning_year") }}</p>-->
          <!--            <v-row>-->
          <!--              <v-col sm="12" cols="12" class=" pt-0 pb-0">-->
          <!--                &lt;!&ndash; <chart-->
          <!--                  ref="chart"-->
          <!--                  :legend-visible="false"-->
          <!--                  :series-defaults-labels-visible="false"-->
          <!--                  :series="series_service_type"-->
          <!--                  :tooltip-template="'#= category # : #= value #%'"-->
          <!--                  :chartArea="{ background: 'transparent', height: 240 }"-->
          <!--                  :tooltip-visible="true"-->
          <!--                  :theme="'sass'"-->
          <!--                /> &ndash;&gt;-->
          <!--                <treemap-->
          <!--                    :data-source="localDataSource"-->
          <!--                    id="treemap"-->
          <!--                    ref="treemap"-->
          <!--                    :value-field="'value'"-->
          <!--                    :text-field="'name'"-->
          <!--                    :tooltip-visible="true"-->
          <!--                    :tooltip-template="'#= name # : #= value #%'"-->
          <!--                >-->
          <!--                </treemap>-->
          <!--              </v-col>-->
          <!--            </v-row>-->
          <!--          </v-card>-->
          <v-card
            outlined
            dense
            class="pa-4 no_border"
            min-height="274"
            color="grayBg"
          >
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("service_sale") }}
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
                :isLoading="showLoadingServiceSale"
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
</template>

<script>
import { i18n } from "@/i18n";
import { Chart } from "@progress/kendo-charts-vue-wrapper";
// import {TreeMap} from "@progress/kendo-treemap-vue-wrapper";
import kendo from "@progress/kendo-ui";
import dashboardHandler from "@/scripts/dashboard/customer/handler/dashboardHandler";

export default {
  components: {
    chart: Chart,
    // treemap: TreeMap,
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    //funnel chart
    labelTemplate1: "#= value #\n #= category # ",
    chartAreaChartFunnel: {
      background: "transparent",
      height: 160,
    },

    funnel: [
      {
        field: "value",
        colorField: "chartColor",
        name: "Total",
        data: [
          { value: "100", chartColor: "#c80000" },
          { value: "70", chartColor: "#f44336" },
          { value: "50", chartColor: "#ED1A3A" },
        ],
        //     '100', '70', '50'],
        // color: ['#00b050','#92d050','#212a35'],
        border: {
          width: 0,
        },
      },
    ],
    valueAxisFunnel: [
      {
        max: 100,
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
    ],
    categoryAxisFunnel: {
      categories: [i18n.t("lead"), i18n.t("qoute"), i18n.t("order")],
      majorGridLines: {
        visible: false,
      },
    },
    pipeline: [
      {
        field: "value",
        colorField: "chartColor",
        name: "Total",
        data: [
          { value: "100", chartColor: "#c80000" },
          { value: "70", chartColor: "#f44336" },
          { value: "50", chartColor: "#ED1A3A" },
        ],
        //     '100', '70', '50'],
        // color: ['#00b050','#92d050','#212a35'],
        border: {
          width: 0,
        },
      },
    ],

    tooltipFunnel: {
      visible: true,
      template: "#= series.name #: #= value #",
    },
    // pipelinem project
    valueAxisPipeLine: [
      {
        max: 100,
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
    ],
    categoryAxisPipline: {
      categories: [i18n.t("lead"), i18n.t("qoute"), i18n.t("order")],
      // categories: ["lead", "Proposal/ Quote", "Lead"],
      majorGridLines: {
        visible: false,
      },
    },
    tooltip: {
      visible: true,
      template: "#= category #: #= value #",
    },
    seriesLines: [
      {
        type: "line",
        name: "Price",
        data: [],
        color: "#c80000",
      },
    ],
    categories_line: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    chartAreaChartRevenue: {
      background: "transparent",
      height: 210,
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
    series1: [
      {
        name: "Total Visits",
        data: [50000, 100000, 200000],
        color: "#c80000",
        border: {
          width: 0,
        },
      },
    ],
    valueAxis: [
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
        strokeWidth: 0,
      },
    ],

    tooltip1: {
      visible: true,
      template: "#= series.name #: #= value #",
    },
    series2: [
      {
        name: "Total Visits",
        data: [50000, 100000, 200000],
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
    series_service_type: [
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
            color: "#ED1A3A",
          },
        ],
      },
    ],

    asOf: new Date().toISOString().substr(0, 10),
    localDataSource: [
      {
        items: [
          {
            name: "Service Revenue",
            value: 4833722,
            items: [
              {
                name: "Project",
                value: 212113,
                color: "#c80000",
              },
              {
                name: "Sale",
                value: 201332,
                color: "#f44336",
              },
              {
                name: "Invoice",
                value: 194899,
                color: "#898C8F",
              },
              {
                name: "Purchase",
                value: 186254,
                color: "#d85604",
              },
              {
                name: "Chanel",
                value: 95334,
                color: "#ED1A3A",
              },
            ],
          },
        ],
      },
    ],
    showLoadingTop5Category: false,
    showLoadingServicePurchase: false,
    showLoadingServiceSale: false,
    showLoadingServiceGraph: false,
    showLoadingServiceProjectRatio: false,

    top5ServiceCategory: [],
    baseCurrency: "",
    decimalFormat: "n2",

    servicePurchaseBalance: 0,
    servicePurchaseNoOfBills: 0,
    servicePurchaseNoOfItems: 0,
    servicePurchaseNoOfVendors: 0,

    saleBalance: 0,
    saleNoOfBills: 0,
    saleNoOfItems: 0,
    saleNoOfCustomers: 0,

    bidToWinRatio: 0,
    openProject: 0,
    avgRevenuePerProject: 0,
    overrun: 0,
    delivered: 0,
    openProjects: 0,
  }),
  methods: {
    numberFormat(value, format) {
      return kendo.toString(value, format);
    },
    numberFormatNoCurrency(value, format) {
      return kendo.toString(value, format);
    },
    treeToolTips() {
      kendo.jQuery("#treemap").kendoTooltip({
        filter: ".k-leaf,.k-treemap-title",
        position: "top",
        content: function(e) {
          var treemap = kendo.jQuery("#treemap").data("kendoTreeMap");
          var item = treemap.dataItem(e.target.closest(".k-treemap-tile"));
          return item.name + ": " + item.value;
        },
      });
    },
    async dashboardTop5Category() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          this.showLoadingTop5Category = true;
          dashboardHandler.top5ServiceCategory(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingTop5Category = false;
              const response = res.data.data;
              this.baseCurrency = response.baseCurrency || "";
              this.top5ServiceCategory = response;
            } else {
              this.showLoadingTop5Category = false;
            }
          });
        }, 10);
      });
    },
    async dashboardServicePurchase() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          this.showLoadingServicePurchase = true;
          dashboardHandler.servicePurchase(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingServicePurchase = false;
              const response = res.data.data;
              this.baseCurrency = response.baseCurrency || "";
              this.servicePurchaseBalance =
                response.exchangeServiceSubtotal || 0;
              this.servicePurchaseNoOfItems = response.items || 0;
              this.servicePurchaseNoOfBills = response.bills || 0;
              this.servicePurchaseNoOfVendors = response.vendors || 0;
            } else {
              this.showLoadingServicePurchase = false;
            }
          });
        }, 10);
      });
    },
    async dashboardServiceSale() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          this.showLoadingServiceSale = true;
          dashboardHandler.serviceSale(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingServiceSale = false;
              const response = res.data.data;
              this.baseCurrency = response.baseCurrency || "";
              this.saleBalance = response.exchangeItemSubtotal || 0;
              this.saleNoOfItems = response.items || 0;
              this.saleNoOfBills = response.bills || 0;
              this.saleNoOfCustomers = response.customers || 0;
            } else {
              this.showLoadingServiceSale = false;
            }
          });
        }, 10);
      });
    },
    async dashboardServiceGraph() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          this.showLoadingServiceGraph = true;
          dashboardHandler.serviceGraph(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingServiceGraph = false;
              const response = res.data.data;
              this.baseCurrency = response.baseCurrency || "";
              const sale = response.sale || [];
              const maxAxe = response.max || 0;
              const axeLength = parseInt(maxAxe).toString().length - 1;
              const axeIncre = parseInt(
                "1" + String(1).padStart(axeLength, "0")
              );
              this.seriesLines = [
                {
                  type: "line",
                  name: i18n.t("revenue"),
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
              this.showLoadingServiceGraph = false;
            }
          });
        }, 10);
      });
    },
    async dashboardServiceProjectRatio() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          this.showLoadingServiceProjectRatio = true;
          dashboardHandler.serviceProjectRatio(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingServiceProjectRatio = false;
              const response = res.data.data;
              this.baseCurrency = response.baseCurrency || "";
              this.bidToWinRatio = response.bidToWinRatio || 0;
              this.openProject = response.bidToWinRatio || 0;
              this.avgRevenuePerProject = response.avgRevenuePerProject || 0;
              this.overrun = response.overrun || 0;
              this.delivered = response.delivered || 0;
              this.openProjects = response.openProject || 0;
            } else {
              this.showLoadingServiceProjectRatio = false;
            }
          });
        }, 10);
      });
    },
    async loadData() {
      await this.dashboardTop5Category();
      await this.dashboardServicePurchase();
      await this.dashboardServiceSale();
      await this.dashboardServiceGraph();
      await this.dashboardServiceProjectRatio();
      this.treeToolTips();
    },
  },
  mounted: async function() {
    await this.dashboardTop5Category();
    await this.dashboardServicePurchase();
    await this.dashboardServiceSale();
    await this.dashboardServiceGraph();
    await this.dashboardServiceProjectRatio();
    this.treeToolTips();
  },
};
</script>
<style scoped>
.theme--light.v-data-table {
  background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 30px !important;
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 0.75rem;
  height: 20px !important;
}

.k-chart {
  height: 160px;
}

.k-chart text {
  height: 160px;
  font-size: 10px !important;
}

.k-chart.funnel {
  height: 160px !important;
  font-family: "Niradei-Medium", serif !important;
}

.v-input__slot:before {
}

.k-treemap {
  height: 245px !important;
}

@media (max-width: 576px) {
}
</style>
