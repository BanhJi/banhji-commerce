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

                  <v-col sm="8" cols="12">
                    <h1 class="font_40 primary--text">
                      {{ $t("wellcome") }}
                    </h1>
                    <p class="mt-2 niradei_light line_22 font_17">
                      {{ $t("get_ready_paid_desc") }}
                    </p>
                  </v-col>
                  <v-col sm="4" cols="12">
                    <v-img class=""  width="100%" src="@/assets/images/pos-a.png"/>
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
                <v-row>
                  <v-col sm="5" cols="12">
                      <i style="font-size: 100px" class="red_icon b-commerce mb-4" />
                      <div class="mt-5">
                        <v-btn
                          @click="goPos('started')"
                          color="primary"
                          class="pa-3 text-bold text-capitalize"
                          elevation="0"
                        >
                          {{ $t("get_started") }}
                        </v-btn>
                      </div>
                  </v-col>
                  <v-col sm="7" cols="12">
                      <h1 class="line_30 primary--text">
                        {{ $t("pos_for_retail") }}
                      </h1>
                      <p class="mt-1 flex-1">{{ $t("accept_payments_desc") }}</p>
                  </v-col>
                </v-row>
                <p class="grey--text  mt-2 mb-0">
                  <span class="text-bold">{{ $t("note") }}: </span>
                  {{ $t("note_desc") }}
                </p>
                </v-card>
              </v-col>
              <v-col sm="4" cols="12">
                <v-card
                  class="pa-4 flex_column_bewteen"
                  color="grayBg"
                  min-height="263"
                  elevation="0"
                >
                <v-row>
                  <v-col sm="5" cols="12">
                      <i style="font-size: 100px" class="red_icon b-commerce mb-4" />
                      <div class="mt-5">
                        <v-btn
                          @click="goPos('started')"
                          color="primary"
                          class="pa-3 text-bold text-capitalize"
                          elevation="0"
                        >
                          {{ $t("get_started") }}
                        </v-btn>
                      </div>
                  </v-col>
                  <v-col sm="7" cols="12">
                      <h1 class="line_30 primary--text">
                        {{ $t("pos_for_resturant") }}
                      </h1>
                      <p class="mt-1 flex-1">{{ $t("accept_payments_desc") }}</p>
                  </v-col>
                </v-row>
                <p class="grey--text  mt-2 mb-0">
                  <span class="text-bold">{{ $t("note") }}: </span>
                  {{ $t("note_desc") }}
                </p>
                </v-card>
              </v-col>
              <v-col sm="4" cols="12">
                <v-card
                  class="pa-4 flex_column_bewteen"
                  color="grayBg"
                  min-height="263"
                  elevation="0"
                >
                <v-row>
                  <v-col sm="5" cols="12">
                      <i style="font-size: 100px" class="red_icon b-commerce mb-4" />
                      <div class="mt-5">
                        <v-btn
                          @click="goPos('started')"
                          color="primary"
                          class="pa-3 text-bold text-capitalize"
                          elevation="0"
                        >
                          {{ $t("get_started") }}
                        </v-btn>
                      </div>
                  </v-col>
                  <v-col sm="7" cols="12">
                      <h1 class="line_30 primary--text">
                        {{ $t("pos_for_service") }}
                      </h1>
                      <p class="mt-1 flex-1">{{ $t("accept_payments_desc") }}</p>
                  </v-col>
                </v-row>
                <p class="grey--text  mt-2 mb-0">
                  <span class="text-bold">{{ $t("note") }}: </span>
                  {{ $t("note_desc") }}
                </p>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
// import { i18n } from "@/i18n";
export default {
  data: () => ({
    isOverlay: false,
    showLoadingSaleAnalysis: false,
  }),
  methods: {
    goPos(){
      let routeData = this.$router.resolve({name: '_sale'});
      window.open(routeData.href, '_blank');
    }
  },
  components: {
  },
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
</style>
