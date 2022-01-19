<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <v-card color="white" class="no_border" elevation="0">
        <v-row>
          <v-col class="py-0" sm="6" cols="12">
            <v-row>
              <v-col class="py-0 pr-2" sm="6" cols="12">
                <v-card
                  outlined
                  dense
                  color="grayBg"
                  height="220px"
                  class="text-center pa-3 no_border mb-4 d-flex justify-center align-center"
                >
                  <div>
                    <h2 class="primary--text">1</h2>
                    <p class="font_16 mb-0">
                      {{ $t("bill_payment_connected_accounts") }}
                    </p>
                  </div>
                </v-card>

                <v-card
                  outlined
                  height="220px"
                  dense
                  color="grayBg"
                  class="text-center pa-3 no_border mb-4 d-flex justify-center align-center"
                >
                  <div>
                    <h2 class="primary--text">2</h2>
                    <p class="font_16 mb-0">{{ $t("qr_code_payment_account") }}</p>
                  </div>
                </v-card>
              </v-col>
              <v-col class="py-0 px-2" sm="6" cols="12">
                <v-card
                  outlined
                  dense
                  height="220px"
                  color="grayBg"
                  class="text-center pa-3 no_border mb-4 d-flex justify-center align-center"
                >
                  <div>
                    <h2 class="primary--text">2</h2>
                    <p class="font_16 mb-0">
                      {{ $t("card_payment_connected_account") }}
                    </p>
                  </div>
                </v-card>

                <v-card
                  outlined
                  dense
                  height="220px"
                  color="grayBg"
                  class="text-center pa-3 no_border mb-4 d-flex justify-center align-center"
                >
                  <div>
                    <h2 class="primary--text">2</h2>
                    <p class="font_16 mb-0">
                      {{ $t("no_of_financial_institutions_used") }}
                    </p>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="py-0 pl-2" sm="6" cols="12">
            <v-card
              outlined
              dense
              color="grayBg"
              height="456"
              class="pa-3 no_border mb-5"
            >
              <h3 class="font_20">{{ $t("payment") }}</h3>
              <p class="mb-6">
                {{ $t("from_the_beginning_year") }}
              </p>
              <chart
                ref="chart"
                :chartArea="chartArea"
                :title-position="'bottom'"
                :chart-area-background="''"
                :legend-visible="false"
                :series-defaults-labels-visible="true"
                :series-defaults-labels-background="'transparent'"
                :series-defaults-labels-template="labelTemplate"
                :tooltip-template="'#= category # : #= value #%'"
                :series="series"
                :tooltip-visible="true"
                :theme="'sass'"
              >
              </chart>
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
    labelTemplate: "#= category # #= value #%",
    series: [
      {
        type: "pie",
        startAngle: 100,
        data: [
          {
            category: i18n.t("card_payment"),
            value: 22,
            color: "#c80000",
          },
          {
            category: i18n.t("bill_payment"),
            value: 45,
            color: "#f44336",
          },
          {
            category: i18n.t("qr_code_payment"),
            value: 11,
            color: "#d85604",
          },
        ],
      },
    ],
    chartArea: {
      background: "transparent",
      height: 290,
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
