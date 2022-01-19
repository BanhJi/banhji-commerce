<template>
  <v-row class="">
    <v-col class="pb-0 pt-4" sm="12" cols="12">
      <v-row>
        <v-col class="pt-0 pb-md-2 pr-md-2" sm="4" cols="12">
          <v-card
            outlined
            dense
            color="secondary"
            class="pa-3 mb-4 no_border niradei_bold"
            min-height="65px"
          >
            <v-row>
              <h6 class="col-sm-12 col-md-5 font_34 white--text">10</h6>
              <h4
                class="text-right white--text py-0 col-sm-12 col-md-7 font_16 text-uppercase"
              >
                <span style="width: 70%;" class="float-right">{{
                  $t("active_projects")
                }}</span>
              </h4>
            </v-row>
          </v-card>
          <v-card
            outlined
            dense
            class="pa-4 no_border"
            min-height="250"
            color="grayBg"
          >
            <h3 class="font_20">{{ $t("project_ratio") }}</h3>
            <p class="mb-3">
              {{ $t("from_the_beginning_year") }}
            </p>
            <template>
              <v-simple-table class="add_bg">
                <template>
                  <tbody>
                    <tr>
                      <td class="text-left" style="width: 50%">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("new_client_%_of_revenue") }}
                        </span>
                      </td>
                      <td class="text-right">
                        <span class="niradei_heavy font_18 dark_grey">
                          10%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" style="width: 50%">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("bid_to_win_ratio") }}
                        </span>
                      </td>
                      <td class="text-right">
                        <span class="niradei_heavy font_18 dark_grey">
                          90%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" style="width: 50%">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("billable_utilization") }}
                        </span>
                      </td>
                      <td class="text-right">
                        <span class="niradei_heavy font_18 dark_grey">
                          80%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" style="width: 50%">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("sale_target_completion") }}
                        </span>
                      </td>
                      <td class="text-right">
                        <span class="niradei_heavy font_18 grey--text">
                          80%
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card>
        </v-col>
        <v-col class="pt-0 pb-md-2 px-md-2" sm="4" cols="12">
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
          <!-- <v-card
            outlined
            dense
            class="pa-4 no_border"
            min-height="250px"
            color="grayBg"
          >
            <v-row>
              <v-col sm="12" cols="12" class="py-0">
                <h3 class="font_20">{{ $t("sale_funnel") }}</h3>
                <p class="mb-3">
                  {{ $t("from_the_beginning_year") }}
                </p>
                <chart
                  :title-text="''"
                  :chartArea="chartAreaChartFunnel"
                  :legend-visible="false"
                  :series-defaults-type="'column'"
                  :series="funnel"
                  :category-axis="categoryAxisFunnel"
                  :value-axis="valueAxisFunnel"
                  :tooltip="{
                    visible: true,
                    template: '#= series.name #: #= value #',
                  }"
                  :theme="'sass'"
                >
                </chart>
              </v-col>
            </v-row>
          </v-card> -->
          <v-card
            outlined
            dense
            class="pa-4 no_border"
            min-height="250"
            color="grayBg"
          >
            <h3 class="font_20">{{ $t("top_5_categories") }}</h3>
            <p class="mb-0">
              {{ $t("from_the_beginning_year") }}
            </p>
            <!-- <h2
              class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
            >
              10,000
            </h2> -->
            <template>
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
                    <tr>
                      <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("cat1") }}
                        </span>
                      </td>
                      <td class="text-center pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          5%
                        </span>
                      </td>
                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          50%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("%cat2") }}
                        </span>
                      </td>
                      <td class="text-center pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          80%
                        </span>
                      </td>
                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          70%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("cat3") }}
                        </span>
                      </td>
                      <td class="text-center pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          30%
                        </span>
                      </td>
                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          30%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("cat4") }}
                        </span>
                      </td>
                      <td class="text-center pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          30%
                        </span>
                      </td>
                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          30%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("cat5") }}
                        </span>
                      </td>
                      <td class="text-center pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          30%
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
          </v-card>
        </v-col>
        <v-col class="pt-0 pb-md-2 pl-md-2" sm="4" cols="12">
          <v-card
            color="grayBg"
            outlined
            dense
            class="pa-4 no_border"
            min-height="335"
          >
            <h3 class="font_20">{{ $t("revenue") }}</h3>
            <p class="mb-0">{{ $t("from_beginning_year") }}</p>
            <h2
              class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
            >
              100,000
            </h2>
            <v-row>
              <v-col sm="12" cols="12" class="pl-1  py-0">
                <chart
                  ref="chart"
                  :legend-position="'bottom'"
                  :legend-visible="false"
                  :tooltip-visible="true"
                  :chartArea="chartAreaChartRevenue"
                  :tooltip-template="$t('revenue') + ': #: value #'"
                  :series="series_line"
                  :category-axis-categories="categories_line"
                  :value-axis="[{ max: 100, labels: { format: '{0}' } }]"
                  :theme="'sass'"
                />
              </v-col>
            </v-row>
          </v-card>
          <!-- <v-card
            outlined
            dense
            color="grayBg"
            class="no_border pa-4"
            min-height="336px"
          >
            <v-row>
              <v-col sm="12" cols="12" class="py-0">
                <h3 class="font_20">{{ $t("service_revenue_by_type") }}</h3>
                <p class="mb-3">{{ $t("from_the_beginning_year") }}</p>
              </v-col>
            </v-row>
            <treemap
              :data-source="localDataSource"
              :value-field="'value'"
              :text-field="'name'"
            >
            </treemap>
          </v-card> -->
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col class="pb-0 pt-md-2 pr-md-2" sm="4" cols="12">
          <v-card
            outlined
            dense
            class="pa-4 no_border"
            min-height="324px"
            color="grayBg"
          >
            <h3 class="font_20">{{ $t("opportunities_pipeline") }}</h3>
            <p class="mb-3">
              {{ $t("from_the_beginning_year") }}
            </p>
            <chart
              :title-text="''"
              :chartArea="{ background: 'transparent', height: 230 }"
              :legend-visible="false"
              :series-defaults-type="'column'"
              :series="pipeline"
              :category-axis="categoryAxisPipline"
              :value-axis="valueAxisPipeLine"
              :tooltip="tooltipFunnel"
              :theme="'sass'"
            >
            </chart>
          </v-card>
        </v-col>
        <v-col class="pb-0 pt-md-2 pl-md-2 pr-md-2" sm="4" cols="12">
          <v-card
            outlined
            dense
            class="pa-4 no_border"
            min-height="320px"
            color="grayBg"
          >
            <h3 class="font_20">{{ $t("project_profitability") }}</h3>
            <p class="mb-0">
              {{ $t("from_the_beginning_year") }}
            </p>
            <v-row>
              <h2
                class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-9 text-right"
              >
                30%
              </h2>
              <p class="mb-0 pa-0 col-sm-3 pr-3 text-right">
                {{ $t("average_margin") }}
              </p>
            </v-row>
            <p class="mb-0 pa-0 col-sm-12">{{ $t("margin") }}</p>
            <v-row>
              <v-col class="py-0" sm="12" cols="12">
                <chart
                  :title-text="''"
                  :legend-visible="false"
                  :series-defaults-type="'bar'"
                  :series="series2"
                  :chart-area-background="''"
                  :category-axis="categoryAxis1"
                  :value-axis="valueAxis1"
                  :tooltip="tooltip2"
                  :theme="'sass'"
                >
                </chart>
                <p class="mb-0 text-center">{{ $t("revenue") }}</p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col class="pb-0 pt-md-2 pl-md-2" sm="4" cols="12">
          <v-card
            outlined
            dense
            class="pa-4 no_border"
            min-height="324px"
            color="grayBg"
          >
            <h3 class="font_20">{{ $t("service_revenue_by_type") }}</h3>
            <p class="mb-3">{{ $t("from_the_beginning_year") }}</p>
            <v-row>
              <v-col sm="6" cols="12" class="pr-1 pb-0">
                <template>
                  <v-simple-table class="mt-2">
                    <template>
                      <tbody>
                        <tr>
                          <td class="text-right text-capitalize pr-0">
                            <span class="niradei_heavy font_18 dark_grey">
                              N30
                            </span>
                            <br />
                            <span class="niradei_medium font_14 grey--text">
                              {{ $t("payment_term") }}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-right text-capitalize pr-0">
                            <span class="niradei_heavy font_18 dark_grey">
                              50%
                            </span>
                            <br />
                            <span class="niradei_medium font_14 grey--text">
                              {{ $t("payment_day") }}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-right text-capitalize pr-0">
                            <span class="niradei_heavy font_18 dark_grey">
                              100,000
                            </span>
                            <br />
                            <span class="niradei_medium font_14 grey--text">
                              {{ $t("balance_per_customer") }}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>
              </v-col>
              <v-col sm="6" cols="12" class="pl-0 pt-0 pb-0">
                <chart
                  ref="chart"
                  :legend-visible="false"
                  :series-defaults-labels-visible="false"
                  :series="series_service_type"
                  :tooltip-template="'#= category # : #= value #%'"
                  :chartArea="{ background: 'transparent', height: 170 }"
                  :tooltip-visible="true"
                  :height="100"
                  :theme="'sass'"
                />
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
// import { TreeMap } from "@progress/kendo-treemap-vue-wrapper";

export default {
  components: {
    chart: Chart,
    // treemap: TreeMap,
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
    series_line: [
      {
        type: "line",
        name: "Price",
        data: [0, 50, 40, 60, 90, 20],
        color: "#c80000",
      },
    ],
    categories_line: [
      i18n.t("jan"),
      i18n.t("feb"),
      i18n.t("mar"),
      i18n.t("apr"),
      i18n.t("may"),
      i18n.t("jun"),
    ],
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
    // categories_line: [
    //   i18n.t("jan"),
    //   i18n.t("feb"),
    //   i18n.t("mar"),
    //   i18n.t("apr"),
    //   i18n.t("may"),
    //   i18n.t("jun"),
    // ],
    // Pice chart
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
  }),
  mounted() {},
  computed: {},
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
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
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
