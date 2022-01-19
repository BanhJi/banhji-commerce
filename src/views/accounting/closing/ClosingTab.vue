<template>
  <v-row>
    <v-col sm="12" cols="12" class="pb-0 pt-4">
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
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("reconciling_accounts") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("variance_analysis") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("closing_date") }}
          </span>
        </v-tab>
        <v-tab v-if="productType != 'cooperative'">
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("task") }}
          </span>
        </v-tab>

        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pl-7 pt-0">
              <ReconcilingAcccount />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pl-7 pt-0">
              <VarianceAnalysis />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pl-7 pt-0">
              <ClosingDate />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item v-if="productType != 'cooperative'">
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <TaskTab />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
import { dataStore } from "@/observable/store";
export default {
  name: "Sales",
  data: () => ({
    isHide: false,
  }),
  computed: {
    productType() {
      return dataStore.productType;
    },
  },
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    ReconcilingAcccount: () => import("./ReconcilingAcccount"),
    VarianceAnalysis: () => import("./VarianceAnalysis"),
    // NeedForReview: () => import('./NeedForReview'),
    ClosingDate: () => import("./ClosingDate"),
    TaskTab: () => import("../task/TaskTab"),
  },
};
</script>
<style scoped>
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
