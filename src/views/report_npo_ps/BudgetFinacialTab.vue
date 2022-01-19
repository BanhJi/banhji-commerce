<template>
  <v-row>
    <v-col sm="12" class="pb-0" cols="12">
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
          <v-icon size="16" class="arr_icon" @click="hideTabs" v-if="!isHide"
            >mdi-chevron-left-circle
          </v-icon>
          <v-icon size="16" class="arr_icon1" @click="hideTabs" v-if="isHide"
            >mdi-chevron-right-circle
          </v-icon>
        </span>
        <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("segment") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("business_unit") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("project") }}
          </span>
        </v-tab>
         <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("class") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("receipts_payments") }}
          </span>
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <Segment />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <BusinessUnit />
            </v-card-text>
          </v-card>
        </v-tab-item>
         <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <Project />
            </v-card-text>
          </v-card>
        </v-tab-item>
         <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <Class />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <!-- <ReceiptsPayments/> -->Under development!
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PositionTabs",
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
    Segment: () => import("./budget/segment/SegmentTab"),
    BusinessUnit: () => import("./budget/business_unit/BusinessUnitTab"),
    Project: () => import("./budget/project/ProjectTab"),
    Class: () => import("./budget/class/ClassTab"),
    // ReceiptsPayments: () => import("./budget/receipts_payments/ReceiptsPayments.vue"),
    
  },
};
</script>
<style scoped>
v-tab {
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
.theme--light.v-card > .v-card__text,
.theme--light.v-card .v-card__subtitle {
  color: rgba(0, 0, 0, 1) !important;
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
