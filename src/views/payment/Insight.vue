<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col sm="12" md="12" cols="12" class="pr-2">
          <v-card
            outlined
            dense
            color="white"
            class="pa-6 no_border"
            min-height="600px"
          >
            <v-row>
              <v-col sm="12" cols="12">
                <v-row>
                  <v-col sm="6" cols="12">
                    <h1 class="font_40 line_48 primary--text">
                      {{ $t("get_ready_paid") }}
                    </h1>
                    <p class="mt-2 niradei_light line_22 font_17">
                      {{ $t("get_ready_paid_desc") }}
                    </p>
                    <div>
                      <v-btn

                        color="primary"
                        class="pa-3 mt-4 text-bold text-capitalize"
                        elevation="0"
                      >
                        {{ $t("coming_soon") }}
                      </v-btn>
                    </div>
                    <p class="grey--text mt-5 mb-0">
                      <span class="text-bold">{{ $t("note") }}: </span>
                      {{ $t("note_desc") }}
                    </p>
                  </v-col>
                  <v-col sm="6" class="pt-0">
                    <img
                      style="
                        height: 400px;
                        margin-top: -40px;
                        margin-bottom: -40px;
                      "
                      src="@/assets/images/Payment.png"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col sm="4" cols="12">
                <v-card
                  class="pa-4 flex_column_bewteen"
                  color="grayBg"
                  min-height="263"
                  elevation="0"
                >
                  <h1 class="line_30 font_50 my-4 primary--text">
                    {{ $t("n_01") }}
                  </h1>
                  <h1 class="line_30">
                    {{ $t("invoice_payment_link") }}
                  </h1>
                  <p class="mt-1 flex-1 font_18 line_24">
                    {{ $t("invoice_payment_link_desc") }}
                  </p>
                </v-card>
              </v-col>
              <v-col sm="4" cols="12">
                <v-card
                  class="pa-4"
                  color="grayBg"
                  min-height="263"
                  elevation="0"
                >
                  <h1 class="line_30 font_50 my-4 primary--text">
                    {{ $t("n_02") }}
                  </h1>
                  <h1 class="line_30">
                    {{ $t("payment_option") }}
                  </h1>
                  <p class="mt-1 flex-1 font_18 line_24">
                    {{ $t("payment_options_insight_desc") }}
                  </p>
                </v-card>
              </v-col>
              <v-col sm="4" cols="12">
                <v-card
                  class="pa-4"
                  color="grayBg"
                  min-height="263"
                  elevation="0"
                >
                  <h1 class="line_30 font_50 my-4 primary--text">
                    {{ $t("n_03") }}
                  </h1>
                  <h1 class="line_30">
                    {{ $t("automatic_record") }}
                  </h1>
                  <p class="mt-1 flex-1 font_18 line_24">
                    {{ $t("automatic_record_desc") }}
                  </p>
                </v-card>
              </v-col>
              <v-col class="pb-0">
                <!-- <p class="grey--text mt-10 mb-0">
                  <span class="text-bold">{{ $t("note") }}: </span>
                  {{ $t("note_desc") }}
                </p> -->
              </v-col>
            </v-row>
            <div class="mx-10">
              <h1 class="text-center font_40 mt-10 primary--text">
                {{ $t("our_financail_inst_partner") }}
              </h1>
              <p class="mt-5 flex-1 text-center font_18 line_24">
                {{ $t("our_financail_inst_partner_desc") }}
              </p>
            </div>
            <div class="mx-10">
              <div class="flex_wrap">
                <div
                  v-for="item in partnerServices"
                  :key="item.name"
                  class="boxCard"
                >
                    <img class="logoImg" :src="item.image" />
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
const BankPartnerServiceHandler = require("@/scripts/handler/banking/BankPartnerService.js");
// import BankPartnerServiceModel from "@/scripts/model/banking/BankPartnerService.js";
export default {
  data: () => ({
    isOverlay: false,
    showLoadingSaleAnalysis: false,
    partnerServices: [],
  }),
  methods: {
    goPayment() {
      if (process.env.VUE_APP_MODE === "dev") {
        window.open("http://localhost:8081");
      } else if (process.env.VUE_APP_MODE === "staging") {
        window.open("https://staging-payments.banhji.com/");
      } else {
        window.open("https://payments.banhji.com/");
      }
    },
    loadPartnerService() {
      BankPartnerServiceHandler.getAll().then((res) => {
        this.partnerServices = res.data.filter(i=> i.type == 'billpayment');
      });
    },
  },
  mounted() {
    this.loadPartnerService();
  },
};
</script>
<style scoped>
.h_60 {
  height: 50px !important;
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
.boxCard {
  width: 130px;
  height: 130px;
  border: 2px solid #9c9c9c;
  border-radius: 8px;
  margin-right: 12px;
  padding: 10px;
  margin-top: 12px;
  justify-content: center;
  align-items: center;
  display: flex;

}
.flex_wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.logoImg {
  width: 100%;
  margin: auto;
}
</style>
