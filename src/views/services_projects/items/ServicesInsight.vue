<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <v-card color="white" class="pl-2 no_border" elevation="0">
        <v-row>
          <v-col class="py-0" sm="12" cols="12">
            <v-card outlined dense color="white" class="no_border mb-4">
              <v-row>
                <v-col sm="7" cols="12" class="py-0">
                  <h2 class="text-left mb-0 font_20">
                    {{ $t("new_recurring_customer") }}
                  </h2>
                </v-col>
              </v-row>
              <chart
                ref="chart"
                :legend-position="'bottom'"
                :legend-visible="false"
                :tooltip="tooltip1"
                :series="series_line1"
                :category-axis-categories="categories_line1"
                :value-axis="valueAxis_line1"
                :chartArea="chartArea2"
                :theme="'sass'"
              />
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="py-0 pr-md-2" sm="4" cols="12">
            <v-card
              outlined
              dense
              color="secondary"
              class="niradei_bold pa-3 white--text mb-4 no_border d-flex  algin-center"
              min-height="78"
            >
              <v-row>
                <h4 class="py-0 text-uppercase col-sm-12 col-md-7 font_13">
                  {{ $t("sale_cycle_days") }}
                </h4>
                <h6
                  class="align-self-center text-right py-0 font_20 col-sm-12 col-md-5"
                >
                  100
                </h6>
              </v-row>
            </v-card>
            <v-card
              outlined
              dense
              color="third"
              class="niradei_bold pa-3 white--text mb-4 no_border d-flex"
              min-height="78"
            >
              <v-row>
                <h4 class="py-0 text-uppercase col-sm-12 col-md-7 font_13">
                  {{ $t("sale_target_completion") }}
                </h4>
                <h6
                  class="align-self-center py-0 text-right font_20 col-sm-12 col-md-5"
                >
                  50%
                </h6>
              </v-row>
            </v-card>
            <v-card
              outlined
              dense
              color="third"
              class="niradei_bold pa-3 white--text no_border d-flex "
              min-height="78"
            >
              <v-row>
                <h4 class="py-0 text-uppercase col-sm-12 col-md-7 font_13">
                  {{ $t("bid_to_win_ratio") }}
                </h4>
                <h6
                  class="align-self-center py-0 text-right font_20 col-sm-12 col-md-5"
                >
                  50%
                </h6>
              </v-row>
            </v-card>
          </v-col>
          <v-col class="py-md-0 px-md-2" sm="4" cols="12">
            <v-card
              outlined
              dense
              class="pa-4 no_border"
              min-height="268px"
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
            </v-card>
          </v-col>

          <v-col class="py-0 pl-md-2" sm="4" cols="12">
            <v-card
              outlined
              dense
              color="grayBg"
              class="no_border pa-4"
              min-height="268px"
            >
              <v-row>
                <v-col sm="12" cols="12" class="py-0">
                  <h3 class="font_20">{{ $t("service_revenues") }}</h3>
                  <p class="mb-1">{{ $t("from_the_beginning_year") }}</p>
                </v-col>
              </v-row>
              <v-row class="mt-0">
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
                                {{ $t("balance_per_vendor") }}
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
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { i18n } from "@/i18n";
import { Chart } from "@progress/kendo-charts-vue-wrapper";
export default {
  components: {
    chart: Chart,
  },
  data: () => ({
    labelTemplate2: "#= value #\n #= category # ",
    chartAreaChartFunnel: {
      background: "transparent",
      height: 175,
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
      categories: [i18n.t("lead"), i18n.t("quote_proposal"), i18n.t("contact")],
      majorGridLines: {
        visible: false,
      },
    },
    tooltip: {
      visible: true,
      template: "#= category #: #= value #",
    },
    categories_line: [
      i18n.t("jan"),
      i18n.t("feb"),
      i18n.t("mar"),
      i18n.t("apr"),
      i18n.t("may"),
      i18n.t("jun"),
    ],
    valueAxis_line: [
      {
        max: 100,
        // visible: false,
        labels: {
          format: "{0}",
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
    categoryAxis: {
      categories: ["Engagement/ Contract", "Proposal/ Quote", "Lead"],
      majorGridLines: {
        visible: false,
      },
    },
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
    localDataSource: [
      {
        name: "",
        value: 316128839,
        items: [
          {
            name: "",
            value: 38332521,
            items: [
              {
                name: "Recurring Direct Gross Revenue",
                value: 3884307,
                color: "#c80000",
              },

              {
                name: "San Jose",
                value: 998537,
                color: "#c80000",
              },
              {
                name: "San Diego",
                value: 1355896,
                color: "#f44336",
              },
              {
                name: "Non Recurring Direct Gross Revenue",
                value: 3884307,
                color: "#f44336",
              },

              {
                name: "San Jose",
                value: 998537,
                color: "#d85604",
              },
              {
                name: "San Diego",
                value: 1355896,
                color: "#e88d14",
              },
            ],
          },
        ],
      },
    ],

    ///
    series_line1: [
      {
        type: "line",
        name: "Sale",
        data: [4, 2, 6, 8, 2, 8],
        color: "#4d4848",
      },
      {
        type: "line",
        name: "Purchase",
        data: [1, 6, 9, 5, 4, 5],
        color: "#f44336",
      },
    ],
    categories_line1: [
      i18n.t("jan"),
      i18n.t("feb"),
      i18n.t("mar"),
      i18n.t("apr"),
      i18n.t("may"),
      i18n.t("jun"),
    ],
    valueAxis_line1: [
      {
        max: 10,
        // visible: false,
        labels: {
          format: "{0}",
        },
      },
    ],
    labelTemplate1: "#= category # #= value #%",
    tooltipTemplate1: "#= category # : #= value #%",
    series1: [
      {
        type: "pie",
        startAngle: 180,
        data: [
          {
            category: i18n.t(""),
            value: 22,
            color: "#a0c490",
          },
          {
            category: i18n.t(""),
            value: 45,
            color: "#528233",
          },
          {
            category: i18n.t(""),
            value: 11,
            color: "#61993d",
          },
          {
            category: i18n.t(""),
            value: 22,
            color: "#6fac46",
          },
        ],
      },
    ],
    chartArea2: {
      background: "transparent",
      height: 280,
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
  }),
  computed: {},
};
</script>
<style scoped>
.k-chart {
  height: 180px;
}

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

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.border-bottom {
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}
.k-chart.funnel {
  height: 240px !important;
}
.k-treemap {
  height: 245px !important;
}
.font-small {
  font-size: 12px;
  line-height: 15px;
}

.font-26 {
  font-size: 26px !important;
}

@media (max-width: 576px) {
}
</style>
