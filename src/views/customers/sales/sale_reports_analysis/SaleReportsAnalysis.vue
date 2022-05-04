<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <div style="background-color: #fff; padding: 0 0 5px;">
          <h3 style="line-height: 30px;" class="font_20">
            {{ $t("invoicing_sale_order") }}
          </h3>
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
        <v-tabs class="tabs_2">
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-uppercase text-left">
              {{ $t("customers") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-uppercase">
              {{ $t("product_service") }}
            </span>
          </v-tab>
            <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
                <span class="hidden-sm-and-down text-uppercase">
              {{ $t("sale_tax") }}
            </span>
            </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-uppercase">
              {{ $t("recurring") }}
            </span>
          </v-tab>

          <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <ByCustomer />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <ByProductsServices />
              </v-col>
            </v-row>
          </v-tab-item>
            <v-tab-item>
                <v-row>
                    <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                        <SaleTax />
                    </v-col>
                </v-row>
            </v-tab-item>
        <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <RecurringInvoices />
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { Chart } from "@progress/kendo-charts-vue-wrapper";
import { i18n } from "@/i18n";
 import {dataStore} from "@/observable/store";
export default {
  name: "Sales",
  data: () => ({
    isHide: false,
       showLoadingGraph: false,
    tooltip: {
      visible: true,
      template: "#= series.name #: #= kendo.toString(value, `n2`) #",
    },
    // line chart
    seriesLine: [
      {
        type: "line",
        name: i18n.t("sale"),
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: "#4d4848",
      },
      {
        type: "line",
        name: i18n.t("sale_order"),
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: "#c80000",
      },
    ],
    categories_line: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ],
    chartArea: {
      background: "transparent",
      height: 280,
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
  }),
  props: {},
  methods: {

    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    ByCustomer: () => import("./ByCustomer"),
    SaleTax: () => import("./BySaleTax"),
    ByProductsServices: () => import("./ByProductsServices"),
    RecurringInvoices: () => import("./RecurringInvoices"),
    chart: Chart,
  },
  computed:{
    appType(){
      return dataStore.productType
  }
  }
};
</script>
<style scoped>

.v-tab {
  min-width: 30px;
  font-size: 16px;
  text-transform: uppercase;
}

.v-tab--active {
  background-color: rgb(255, 255, 255);
}

.tab_setting .v-tab--active {
  font-weight: 700;
  color: #000;
  background-color: #ffffff !important;
  border-bottom: 4px solid #92d050;
  border-left: none;
}
.tabs_2 .v-tab--active {
  background-color: #f8f8f9 !important;
  border-bottom: 4px solid #92d050;
  border-left: none;
}

/* .v-tab--active {
    } */

p {
  color: rgba(0, 0, 0, 0.87);
}
</style>
