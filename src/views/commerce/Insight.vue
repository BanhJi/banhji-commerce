<template>
  <v-row>
    <v-col sm="12" md="12" cols="12" class="py-0">
      <v-card outlined dense color="white" class="no_border ml-1" min-height="400px">
        <v-row>
          <v-col sm="6" cols="12" class="py-0">
            <v-card class="pa-4" color="white" min-height="240" elevation="0">
              <img class="image_logo" src="@/assets/images/banhji-logo-r.png" />
              <h1 class="line_30 mt-n2 mb-2 font_40 primary--text">
                {{ $t("commerce") }}
              </h1>
              <h3 class="font_20 line_26">{{ $t("commerce_desc") }}</h3>
              <p class="mt-4 flex-1 font_14">
                {{ $t("commerce_desc_manage") }}
              </p>
              <div>
                <v-btn
                  color="primary"
                  class="pa-3 mt-0 mb-6 text-bold text-capitalize"
                  elevation="0"
                >
                  {{ $t("coming_soon") }}
                </v-btn>
              </div>
            </v-card>
          </v-col>
          <v-col sm="6" cols="12" class="pb-0" >
            <v-card class="px-4" color="white" min-height="240" elevation="0">
              <img  style="width: 100%; margin-bottom: -16px;" src="@/assets/images/commerce.png" />
            </v-card>
          </v-col>
          <v-col sm="12" cols="12" class="py-0">
            <v-row class="mt-0 ml-0">
              <v-col sm="3" cols="12">
                <v-card
                  class="pa-4"
                  color="grayBg"
                  min-height="300"
                  elevation="0"
                >
                  <i style="font-size: 80px; text-align: center;display: block;" class=" pa-3 b-pos" />
                  <h1 class="line_24 text-center font_20">
                    {{ $t("point_of_sale") }}
                  </h1>
                  <p class="mt-2 text-center font_14 mb-0">
                    {{ $t("point_of_sale_desc2") }}
                  </p>
                </v-card>
              </v-col>
              <v-col sm="3" cols="12" class="px-2">
                <v-card
                  class="pa-4"
                  color="grayBg"
                  min-height="300"
                  elevation="0"
                >
                  <i style="font-size: 80px; text-align: center;display: block;" class=" pa-3 b-sale_channel" />
                  <h1 class="line_24 text-center font_20">
                    {{ $t("multi_channels_orders") }}
                  </h1>
                  <p class="mt-2 text-center font_14 mb-0">
                    {{ $t("multi_channels_orders_desc") }}
                  </p>
                </v-card>
              </v-col>
              <v-col sm="3" cols="12" class="px-2">
                <v-card
                  class="pa-4"
                  color="grayBg"
                  min-height="300"
                  elevation="0"
                >
                  <i style="font-size: 80px; text-align: center;display: block;" class=" pa-3 b-reward" />
                  <h1 class="line_24 text-center font_20">
                    {{ $t("loyalty_reward_promotion") }}
                  </h1>
                  <p class="mt-2 text-center font_14 mb-0">
                    {{ $t("loyalty_reward_promotion_desc") }}
                  </p>
                </v-card>
              </v-col>
              <v-col sm="3" cols="12" class="pl-2">
                <v-card
                  class="pa-4"
                  color="grayBg"
                  min-height="300"
                  elevation="0"
                >
                  <i style="font-size: 80px; text-align: center;display: block;" class=" pa-3 b-pricing" />
                  <h1 class="line_24 text-center font_20">
                    {{ $t("pricing_manangement") }}
                  </h1>
                  <p class="mt-2 text-center font_14 mb-0">
                    {{ $t("pricing_manangement_desc") }}
                  </p>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { i18n } from "@/i18n";
export default {
  data: () => ({
    isOverlay: false,
    showLoadingSaleAnalysis: false,
    // pie chart
    labelTemplate: "#= category # #= value #%",
    tooltipTemplate: "#= category # : #= value #%",
    chartAreaChart: {
      background: "transparent",
      height: 190,
    },
    saleChannelChart: [
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
  }),
  methods: {
    goPayment() {
      if (process.env.VUE_APP_MODE === "dev") {
        window.open("http://localhost:8081");
      } else if (process.env.VUE_APP_MODE === "staging") {
        window.open("https://staging-commerce.banhji.com/");
      } else {
        window.open("https://commerce.banhji.com/");
      }
    },
  },
  components: {},
};
</script>
<style scoped>
.h_60 {
  height: 60px !important;
}
.w_100 {
  width: 100% !important;
}
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
p {
  font-family: "Niradei-Light" !important;
}
.image_product {
  height: 120px;
  margin: 0px auto;
  display: block;
}
.image_logo {
  width: 120px;
}
.image_logo_commerce {
  width: 60px;
}
</style>
