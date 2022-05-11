<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col sm="8" md="8" cols="12" class="pr-2">
       
            <v-row>
              <v-col sm="12" class="pb-2">
                <v-card
                  outlined
                  dense
                  color="white"
                  class="pa-4 no_border"
                  min-height="364px"
                >
                  <v-row>
                    <v-col md="4" sm="5" cols="12" class="py-1 pr-0">
                        <h3
                            class="font_30 line_28 my-2 ml-0 text-left thirdText--text"
                        >
                            {{ $t("welcome_to") }}
                        </h3>
                        <img
                            style="height:40px;margin-top: 10px"
                            src="@/assets/images/banhji-logo-r.png"
                        />
                        <h1 class="line_22  primary--text">
                          {{ $t("point_of_sale") }}
                        </h1>
                        <p class=" line_18 font mb-1 mt-2">
                            {{ $t("welcome_to_desc") }}
                        </p>
                    </v-col>
                    <v-col md="8" sm="7" cols="12" class="py-1 pt-6 pr-0">
                        <img
                            style="width:98%;"
                            src="@/assets/images/home_banner.png"
                        />
                    </v-col>
                </v-row>
                </v-card>
              </v-col>

              <v-col sm="4" cols="12" class="pt-2 pr-2">
                <v-card
                  outlined
                  dense
                  color="white"
                  class="pa-5 no_border"
                  min-height="240px"
                >
                <v-row>
                  <v-col sm="4" cols="12">
                      <i style="font-size: 50px" class="red_icon b-commerce mb-4" />
                      
                  </v-col>
                  <v-col sm="8" cols="12"  class="pl-0">
                      <h1 class="line_22 font_22 primary--text">
                        {{ $t("pos_for_retail") }}
                      </h1>
                  </v-col>
                  <v-col sm="12" class="">
                      <v-btn
                        width="100%"
                        @click="goDashoardPos('started')"
                        color="primary"
                        class="pa-3 text-bold text-capitalize"
                        elevation="0"
                      >
                        {{ $t("get_started") }}
                      </v-btn>
                  </v-col>
                </v-row>
                <p class="grey--text  mt-2 mb-0">
                  <span class="text-bold">{{ $t("note") }}: </span>
                  {{ $t("note_desc") }}
                </p>
                </v-card>
              </v-col>
              <v-col sm="4" cols="12" class="pt-2 pr-2">
                <v-card
                  outlined
                  dense
                  color="white"
                  class="pa-5 no_border"
                  min-height="240px"
                >
                <v-row>
                  <v-col sm="4" cols="12">
                      <i style="font-size: 50px" class="red_icon b-commerce mb-4" />
                  </v-col>
                  <v-col sm="8" cols="12"  class="pl-0">
                      <h1 class="line_22 font_22 primary--text">
                        {{ $t("pos_for_resturant") }}
                      </h1>
                  </v-col>
                  <v-col sm="12" class="">
                      <v-btn
                        width="100%"
                        @click="goDashoardPos2('started')"
                        color="primary"
                        class="pa-3 text-bold text-capitalize"
                        elevation="0"
                      >
                        {{ $t("get_started") }}
                      </v-btn>
                  </v-col>
                </v-row>
                <p class="grey--text  mt-2 mb-0">
                  <span class="text-bold">{{ $t("note") }}: </span>
                  {{ $t("note_desc") }}
                </p>
                </v-card>
              </v-col>
              <v-col sm="4" cols="12" class="pt-2 pr-2">
                <v-card
                  outlined
                  dense
                  color="white"
                  class="pa-5 no_border"
                  min-height="240px"
                >
                <v-row>
                  <v-col sm="4" cols="12">
                      <i style="font-size: 50px" class="red_icon b-commerce mb-4" />
                  </v-col>
                  <v-col sm="8" cols="12"  class="pl-0">
                      <h1 class="line_22 font_22 primary--text">
                        {{ $t("pos_for_service") }}
                      </h1>
                  </v-col>
                  <v-col sm="12" class="">
                      <v-btn
                        width="100%"
                        @click="goDashoardPos3('started')"
                        color="primary"
                        class="pa-3 text-bold text-capitalize"
                        elevation="0"
                      >
                        {{ $t("get_started") }}
                      </v-btn>
                  </v-col>
                </v-row>
                <p class="grey--text  mt-2 mb-0">
                  <span class="text-bold">{{ $t("note") }}: </span>
                  {{ $t("note_desc") }}
                </p>
                </v-card>
              </v-col>
            
            </v-row>
        </v-col>
        <v-col sm="4" cols="12" class="pl-2">
          <v-row>
            <v-col sm="12" cols="12" class="pb-2">
                <v-card
                    outlined
                    dense
                    color="white"
                    class="pa-4 no_border"
                    min-height="180px"
                >
                <h1  class="line_22 font_22">Point of sale solutions to fit your business.</h1>
                <p class="grey--text  mt-2 mb-0">Because every business is different, BanhJi has a variety of POS options to help you take yours where you want it to go. Whether you run a restaurant, sell retail goods, book appointments, or just need a versatile POS for whatever comes next, we have the point-of-sale software that will best support you and your unique business needs.</p>
                </v-card>
            </v-col>
            <v-col sm="12" cols="12">
                  <template>
                    <v-carousel cycle  height="440">
                      <v-carousel-item
                        v-for="(item,i) in items"
                        :key="i"
                        :src="item.src"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                      ></v-carousel-item>
                    </v-carousel>
                  </template>
            </v-col> 
          </v-row>   
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
    items: [
      {
         src: require('@/assets/images/slide1.jpg')
      },
      {
         src: require('@/assets/images/slide1.jpg')
      },
      {
        src: require('@/assets/images/slide1.jpg')
      },
    ],
  }),
  methods: {
    goDashoardPos(){
      let routeData = this.$router.resolve({name: 'dashboard_pos'});
      window.open(routeData.href, '_blank');
    },
    goDashoardPos2(){
      let routeData = this.$router.resolve({name: 'dashboard_2'});
      window.open(routeData.href, '_blank');
    },
    goDashoardPos3(){
      let routeData = this.$router.resolve({name: 'dashboard_3'});
      window.open(routeData.href, '_blank');
    },
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
