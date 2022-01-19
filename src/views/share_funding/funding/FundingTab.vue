<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-4 pb-md-0">
      <div style="background-color: #fff;">
        <v-tabs
          vertical
          class="tab_setting"
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
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("fund_receipt_report") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("funding_categories") }}
            </span>
          </v-tab>
          <v-tab-item>
              <v-card flat>
              <v-card-text class="py-0 pr-0">
                <FundReceiptReport />
              </v-card-text>
              </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <FundCategories />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "FundTab",
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
    // FundCenter: () => import("./fund_center/FundCenter"),
    FundCategories: () => import("./fund_category/FundCategories"),
    FundReceiptReport: () => import("./FundReceiptReport"),
  },
};
</script>
<style scoped>

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
.tab_product_service_show.theme--light .v-slide-group__content {
  width: 140px !important;
}
p {
  color: rgba(0, 0, 0, 0.87);
}
@media (max-width: 576px) {
  .tab_setting.theme--light.v-tabs.tab_setting > .v-tabs-bar {
    width: 55px !important;
  }
  .hideAbs {
    display: none !important;
  }
}
</style>
