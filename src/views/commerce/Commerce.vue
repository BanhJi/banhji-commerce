<template>
    <v-row>
      <v-col sm="12" cols="12">
        <v-tabs
            vertical
            class="tab_setting auto_item_tabs"
            slider-color="grayBg"
            slider-size="7"
            :class="{
              tab_product_service_hide: isHide,
              tab_product_service_show: !isHide,
            }"
          >
          <span class="hideAbs">
            <v-icon size="16" class="arr_icon" @click="hideTabs" v-if="!isHide">
              mdi-chevron-left-circle
            </v-icon>
            <v-icon size="16" class="arr_icon1" @click="hideTabs" v-if="isHide">
              mdi-chevron-right-circle
            </v-icon>
          </span>
          <v-tab>
            <span class="">
              {{ $t("insights") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="">
              {{ $t("channel") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="" v-if="appType != 'npo'">
              {{ $t("price") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="">
              {{ $t("discount") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="">
              {{ $t("catalog") }}
            </span>
          </v-tab>
          <!-- <v-tab>
            <span class="">
              {{ $t("connection") }}
            </span>
          </v-tab> -->
          <v-tab-item>
            <v-card flat>
              <v-card-text class=""> 
                <Insight/>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text class=""> 
                <SaleChannels/>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="appType != 'npo'">
            <v-card flat>
              <v-card-text class="">
                <PricingManagement />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class=""> 
                  <SaleDiscount/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class=""> 
                  <CatalogList/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!-- <v-tab-item>
            <v-card flat>
              <v-card-text class=""> 
                  <AppConnection/>
              </v-card-text>
            </v-card>
          </v-tab-item> -->
        </v-tabs>
      </v-col>
    </v-row>
</template>

<script>
// import { data } from "@/observable/store";
import {  dataStore } from "@/observable/store";
export default {
  name: "Commerce",
  components: {
      Insight : ()=> import("./Insight"),
      SaleDiscount: ()=> import('./sale_discounts/SaleDiscount.vue'),
      SaleChannels: ()=> import('./sale_channels/SaleChannels.vue'),
      // AppConnection: () => import("./app_connetion/AppConnection"),
      PricingManagement: () => import("./pricing_management/PricingManagement"),
      CatalogList: () => import('./catalog/CatalogList')
  },
  data: () => ({
    isHide: false,
  }),
  computed: {
    appType() {
      return dataStore.productType;
    },
  },
  watch: {
  },
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
};
</script>
<style scoped>
/* .v-menu__content{
  top: 141px !important;
  left: 1098px !important;
} */
.v-menu__content .v-list .v-list-item {
  min-height: 35px !important;
}

.tab_wrapper {
  position: relative;
  display: inherit;
}

.v-tab {
  min-width: 30px;
  font-size: 20px;
  text-transform: capitalize;
}

.v-icon--left {
  margin-right: 0px;
}

.theme--light.v-tabs > .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.v-tab--active {
  background-color: #e5effa;
  color: #000;
}

.theme--light.v-tabs >>> .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.v-card__text {
  padding: 0 !important;
}
</style>
