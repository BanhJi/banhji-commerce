<template>
  <v-card color="white" class=" no_border" elevation="0">
    <v-row class="mt-0">
      <v-col class="py-0" sm="12" cols="12">
        <h3 class="text-left mb-2 font_20 line_24">
          {{ $t("cash_position") }}
        </h3>
        <p class="mb-3">{{ $t("cash_position_decs") }}</p>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col sm="12" class="pt-0" cols="12">
        <chart
          ref="chart"
          :legend-position="'bottom'"
          :legend-visible="false"
          :tooltip="tooltip"
          :series="series_line"
          :category-axis-categories="categories_line"
          :value-axis="valueAxis_line"
          :chartArea="chartArea"
          :theme="'sass'"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12" cols="12" class="pb-0">
        <template>
          <v-simple-table class="simple_table">
            <template>
              <thead>
                <tr>
                  <th style="width: 10%"></th>
                  <th class="grayBg text-right">
                    {{ $t("expected_receipts_receivables") }}
                  </th>
                  <th class="grayBg text-right">
                    {{ $t("expected_payments_payables") }}
                  </th>
                  <th class="grayBg text-right">{{ $t("budget_expenses") }}</th>
                  <th class="grayBg text-right">{{ $t("net_cashflow") }}</th>
                  <th class="grayBg text-right">{{ $t("cash_balance") }}</th>
                  <th
                    style="width: 13%"
                    class="text-uppercase black white--text"
                  >
                    {{ $t("forecasted_balance") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-uppercase">{{ $t("jan") }} 21</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="grayBg"></td>
                </tr>
                <tr>
                  <td class="text-uppercase">{{ $t("feb") }} 21</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="grayBg"></td>
                </tr>
                <tr>
                  <td class="text-uppercase">{{ $t("mar") }} 21</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="grayBg"></td>
                </tr>
                <tr>
                  <td class="text-uppercase">{{ $t("apr") }} 21</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="grayBg"></td>
                </tr>
                <tr>
                  <td class="text-uppercase">{{ $t("may") }} 21</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="grayBg"></td>
                </tr>
                <tr>
                  <td class="text-uppercase">{{ $t("jun") }} 21</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="grayBg"></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
      </v-col>
    </v-row>
  </v-card>
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
    series_line: [
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
    valueAxis_line: [
      {
        max: 10,
        // visible: false,
        labels: {
          format: "{0}",
        },
      },
    ],
    chartArea: {
      background: "transparent",
      height: 280,
    },
  }),
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
  border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}
.v-data-table.simple1_table.theme--light,
.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
  border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table.simple1_table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th:last-child {
  border-right: none !important;
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

.font-small {
  font-size: 12px;
  line-height: 15px;
}

.font-26 {
  font-size: 26px !important;
}
.v-data-table.simple_table.theme--light {
  border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  border-bottom: none !important;
  border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:last-child,
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:last-child,
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td:last-child {
  border-right: none !important;
}

@media (max-width: 576px) {
}
</style>
