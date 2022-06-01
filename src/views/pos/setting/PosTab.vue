<template>
  <v-row class="">
    <v-container class="px-7 pt-4" style="max-width: 1475px;">
      <v-card outlined dense color="white" class=" no_border" elevation="0" height="680" style="overflow-y: auto;">
        <v-col sm="12" cols="12" class="pt-4">
          <v-tabs
            vertical
            class="tab_setting pt-3"
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
            <v-tab class="v_slide_group_content_pos">
              <span class="hidden-sm-and-up">
                <v-icon left>mdi-pen</v-icon>
              </span>
              <span class="hidden-sm-and-down text-capitalize text-left">
                {{ $t("general_setting") }}
              </span>
            </v-tab>
            <v-tab>
              <span class="hidden-sm-and-up">
                <v-icon left>mdi-pen</v-icon>
              </span>
              <span class="hidden-sm-and-down text-capitalize text-left">
                {{ $t("session_management") }}
              </span>
            </v-tab>
            <v-tab>
              <span class="hidden-sm-and-up">
                <v-icon left>mdi-pen</v-icon>
              </span>
              <span class="hidden-sm-and-down text-capitalize text-left">
                {{ $t("sale_unit_management") }}
              </span>
            </v-tab>
            <v-tab>
              <span class="hidden-sm-and-up">
                <v-icon left>mdi-pen</v-icon>
              </span>
              <span class="hidden-sm-and-down text-capitalize text-left">
                {{ $t("ordering") }}
              </span>
            </v-tab>
            <v-tab>
              <span class="hidden-sm-and-up">
                <v-icon left>mdi-pen</v-icon>
              </span>
              <span class="hidden-sm-and-down text-capitalize text-left">
                {{ $t("booking") }}
              </span>
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text class="py-0 pr-0">
                  <General />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text class="py-0 pr-0">
                  <SessionTab />
                </v-card-text>
              </v-card>
            </v-tab-item>
            
            <v-tab-item>
              <v-card flat>
                <v-card-text class="py-0 pr-0">
                    <SaleUnitTab/>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text class="py-0 pr-0">
                    <OrderingTab/>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text class="py-0 pr-0">
                    <Booking/>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-card>
    </v-container>
  </v-row>
</template>

<script>
export default {
  name: "",
  components: {
    General: () => import("./general/General"),
    SessionTab: () => import("./session_management/SessionTab"),
    SaleUnitTab: () => import("./sale_unit_management/SaleUnitTab"),
    OrderingTab: () => import("./ordering/OrderingTab"),
    Booking: () => import("./booking/Booking"),


  
  },
  data: () => ({
    isHide: false,
  }),
  watch: {},
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
};
</script>
<style scoped>
.v_slide_group_content_pos{
  white-space: inherit !important;
}
.arr_icon {
  color: #2ca01c;
}

.arr_icon1 {
  color: #4c9aff;
  color: #2ca01c;
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

.tab_product_service_show.theme--light .v-slide-group__content {
  width: 140px !important;
}

p {
  color: rgba(0, 0, 0, 0.87);
}
.v-slide-group__content{
  white-space: normal !important;
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
