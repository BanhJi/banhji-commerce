<template>
  <v-row class="">
    <v-col class="pb-0 pt-4" sm="12" cols="12">
      <v-row>
        <v-col class="py-0 pr-md-2" sm="4" cols="12">
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
                {{ $t("to_reorder_this_week") }}
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
            <h3 class="font_20">{{ $t("inventory_value") }}</h3>
            <p class="mb-0">
              {{ $t("as_of_today") }}
            </p>
            <h2
              class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
            >
              10,500
            </h2>
            <template>
              <v-simple-table class="mb-3">
                <template>
                  <tbody>
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
                    <tr>
                      <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("slow_moving") }}
                        </span>
                      </td>
                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          800
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("turnover_days") }}
                        </span>
                      </td>
                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          200
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
                  >{{ $t("view_report") }}</router-link
                >
              </v-col>
            </v-row>
          </v-card>
          <v-card
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
          </v-card>
        </v-col>
        <v-col class="py-md-0 px-md-2" sm="4" cols="12">
            <v-card
                outlined
                dense
                color="third"
                class="pa-3 mb-4 no_border niradei_bold "
                min-height="65px"
            >
                <v-row>
                    <h6 class="col-sm-12 col-md-5 font_34 white--text">10</h6>
                    <h4 class="text-right white--text py-0 col-sm-12 col-md-7 font_16 text-uppercase">
                        {{ $t("recurring_purchases") }}
                    </h4>
                </v-row>
            </v-card>

          <!-- <v-card
            outlined
            dense
            class="pa-4 mt-4 no_border"
            min-height="274"
            color="grayBg"
          >
            <h3 class="font_20">{{ $t("key_value_items") }}</h3>
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
            class="pa-4 no_border"
            min-height="268"
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
                            <th class="pl-0 text-left">{{$t('name')}}</th>
                            <th class="text-center">{{$t('sale')}}</th>
                            <th class="text-right">{{$t('balance')}}</th>
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
          <v-card
            outlined
            dense
            class="pa-4 mt-4 no_border"
            min-height="274"
            color="grayBg"
          >
            <h3 class="font_20">{{ $t("product_purchase") }}</h3>
            <p class="mb-0">
              {{ $t("from_the_beginning_year") }}
            </p>
            <h2
              class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
            >
              10,500
            </h2>
            <template>
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
                          500
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
                          8,000
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
                          2,000
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
                  >{{ $t("view_report") }}</router-link
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col class="py-0 pl-md-2" sm="4" cols="12">
          <v-card
            outlined
            dense
            color="grayBg"
            class="pa-4 no_border"
            min-height="353px"
          >
            <v-row>
              <v-col sm="12" cols="12" class="py-0">
                <h3 class="font_20">{{ $t("balance_purchase_sale") }}</h3>
                <p class="mb-6">{{ $t("from_the_beginning_year") }}</p>
              </v-col>
            </v-row>
            <chart
              ref="chart"
              :legend-position="'bottom'"
              :legend-visible="false"
              :tooltip="tooltip"
              :series="series_line"
              :chartArea="chartArea1"
              :category-axis-categories="categories_line"
              :value-axis="valueAxis_line"
              :theme="'sass'"
            />
          </v-card>
          <!-- <v-card
                        outlined
                        dense
                        class="pa-4 mt-4 no_border"
                        min-height="274px"
                        color="grayBg"
                    >
                        <h3 class="font_20">{{ $t("project_profitability") }}</h3>
                        <p class="mb-0">
                            {{ $t('from_the_beginning_year') }}
                        </p>
                        <v-row>
                            <h2 class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-9 text-right">30%</h2>
                            <p class="mb-0 pa-0 col-sm-3 pr-3 text-right">{{$t('average_margin')}}</p>
                        </v-row>
                        <p class="mb-0 pa-0 col-sm-12">{{$t('margin')}}</p>
                        <v-row>
                            <v-col class="py-0" sm="12" cols="12">
                                <chart :title-text="''"
                                       :legend-visible="false"
                                       :series-defaults-type="'bar'"
                                       :series="series2"
                                       :chart-area-background="''"
                                       :chartArea="chartArea"
                                       :category-axis="categoryAxis1"
                                       :value-axis="valueAxis1"
                                       :tooltip="tooltip2"
                                       :theme="'sass'">
                                </chart>
                                <p class="mb-0 text-center">{{ $t('revenue') }}</p>
                            </v-col>
                        </v-row>
                    </v-card> -->
          <v-card
            outlined
            dense
            class="pa-4 mt-4 no_border"
            min-height="274"
            color="grayBg"
          >
            <h3 class="font_20">{{ $t("product_sale") }}</h3>
            <p class="mb-0">
              {{ $t("from_the_beginning_year") }}
            </p>
            <h2
              class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
            >
              10,500
            </h2>
            <template>
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
                          500
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
                          8,000
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
                          2,000
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
                  >{{ $t("view_report") }}</router-link
                >
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

export default {
  components: {
    chart: Chart,
  },
  data: () => ({
    tooltip: {
      visible: true,
      template: "#= series.name #: #= value #",
    },
    chartArea: {
      background: "transparent",
      height: 110,
    },
    series_line: [
      {
        type: "line",
        name: "Purchase",
        data: [4, 25, 32, 8, 34, 40],
        color: "#4d4848",
        border: {
          width: 0,
        },
      },
      {
        type: "line",
        name: "Sale",
        data: [56, 50, 80, 70, 45, 96],
        color: "#c80000",
        border: {
          width: 0,
        },
      },
      {
        type: "line",
        name: "Balance",
        data: [10, 60, 38, 30, 29, 51],
        color: "#ED1A3A",
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
  height: 32px !important;
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}

element.style {
}
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
}
.v-application--is-ltr .v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-application--is-ltr .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-application--is-ltr .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
    text-align: left;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    color: rgba(0, 0, 0, 0.6);
}
.v-data-table.nomal_table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
    font-size: 14px !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
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
