<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <div style="background-color: #fff; padding: 0 0 5px;">
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
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("price_level_list") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("price_setting") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("price_book") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("pricing_analysis") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("price_level_report") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("price_level_type") }}
            </span>
          </v-tab>

          <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <PriceLevelList />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <PriceLevel />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <PriceBook />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <PricingAnalasis />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <Report />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                <PriceLevelType />
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PricingManagement",
  data: () => ({
    isHide: false,
  }),
  props: {},
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    PriceLevel: () => import("./PriceLevel"),
    // PriceSetting: () => import('./PriceSetting'),
    PriceLevelType: () => import("./PriceLevelType"),
    PricingAnalasis: () => import("./PricingAnalasis"),
    Report: () => import("./Report"),
    PriceLevelList: () => import("./PriceLevelList"),
    PriceBook: ()=> import("./PriceBook")
  },
};
</script>
<style scoped>
.auto_item_tabs .v-tabs-bar .v-tab {
  height: auto !important;
  margin-top: 4px;
  padding-top: 6px;
  padding-bottom: 6px;
}
.v-tab {
  justify-content: left;
  font-size: 16px;
}

.v-tab--active {
  background-color: rgb(255, 255, 255);
}

.tab_setting .v-tab--active {
  font-weight: 700;
  color: #000;
}

.v-tab--active {
  background-color: #ffffff !important;
  border-bottom: 4px solid #92d050;
  border-left: none;
}

p {
  color: rgba(0, 0, 0, 0.87);
}
</style>
