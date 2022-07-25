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
                      {{ $t("e_commerce") }}
                    </h1>
                    <p class="mt-2 niradei_light line_22 font_17">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, nisi ut aliquip ex ea commodo consequat. 
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
                    Website
                  </h1>
                  <p class="mt-1 flex-1 font_18 line_24">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, nisi ut aliquip ex ea commodo consequat. 
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
                    Social
                  </h1>
                  <p class="mt-1 flex-1 font_18 line_24">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, nisi ut aliquip ex ea commodo consequat. 
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
                    Market
                  </h1>
                  <p class="mt-1 flex-1 font_18 line_24">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, nisi ut aliquip ex ea commodo consequat. 
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
              <h1 class="text-center font_40 my-10 primary--text">
                6 types of e-commerce
              </h1>
            </div>
            <v-col sm="12" cols="12">
              <v-row>
                <v-col sm="4" cols="12" style="text-align: center;border: 1px solid gainsboro;">
                  <h1 class="text-center font_40 mt-10 primary--text">
                    B2B
                  </h1>
                  <p class="mt-10 mb-0">
                    <span class="text-bold font_16">Business to Business</span>
                  </p>
                  <p class="grey--text mt-4 mb-0">
                    <span class="font_16">Business sell products or sercices to other businesses, such as through an online directory or product website.</span>
                  </p>
                </v-col>
                <v-col sm="4" cols="12" style="text-align: center;border: 1px solid gainsboro;">
                  <h1 class="text-center font_40 mt-10">
                    B2C
                  </h1>
                  <p class="mt-10 mb-0">
                    <span class="text-bold font_16">Business to consumer</span>
                  </p>
                  <p class="grey--text mt-4 mb-0">
                    <span class="font_16">Business sell products or sercices to non-businesses customers, such as in an online retail store.</span>
                  </p>
                </v-col>
                <v-col sm="4" cols="12" style="text-align: center;border: 1px solid gainsboro;">
                  <h1 class="text-center font_40 mt-10 primary--text">
                    C2C
                  </h1>
                  <p class="mt-10 mb-0">
                    <span class="text-bold font_16">Consumer to consumer</span>
                  </p>
                  <p class="grey--text mt-4 mb-0">
                    <span class="font_16">Consumers sell products or sercices to other consumers, such as on eBay and Craigslist.</span>
                  </p>
                </v-col>
                <v-col sm="4" cols="12" style="text-align: center;border: 1px solid gainsboro;">
                  <h1 class="text-center font_40 mt-10">
                    C2B
                  </h1>
                  <p class="mt-10 mb-0">
                    <span class="text-bold font_16">Consumer to Business</span>
                  </p>
                  <p class="grey--text mt-4 mb-0">
                    <span class="font_16">Consumers sell products or sercices to businesses. For example, Google AdSense and influencer Marketing services enable bloggers and other web content providers to sell advertising space to businesses.</span>
                  </p>
                </v-col>
                <v-col sm="4" cols="12" style="text-align: center;border: 1px solid gainsboro;">
                  <h1 class="text-center font_40 mt-10 primary--text">
                    B2A
                  </h1>
                  <p class="mt-10 mb-0">
                    <span class="text-bold font_16">Business to administration</span>
                  </p>
                  <p class="grey--text mt-4 mb-0">
                    <span class="font_16">Business conduct transactions with public administration or government bodies, such as an ammunition manufacture selling to U.S. Army.</span>
                  </p>
                </v-col>
                <v-col sm="4" cols="12" style="text-align: center;border: 1px solid gainsboro;">
                  <h1 class="text-center font_40 mt-10">
                    C2A
                  </h1>
                  <p class="mt-10 mb-0">
                    <span class="text-bold font_16">Consumer to administration</span>
                  </p>
                  <p class="grey--text mt-4 mb-0">
                    <span class="font_16">Consumers conduct transactions with public administration or government bodies, such as filing taxes.</span>
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data: () => ({
  }),
  methods: {
  },
  mounted() {
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
