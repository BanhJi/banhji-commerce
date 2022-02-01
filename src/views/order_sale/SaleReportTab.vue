<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-4 pb-md-0">
      <div style="background-color: #fff;">
        <v-tabs
          vertical
          class="tab_setting"
          slider-color="grayBg"
          v-model="active_tab_in"
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
          <v-tab :key="0">
            <span class="text-capitalize text-left">
              {{ $t("sale_by_customers_r") }}
            </span>
          </v-tab>
          <v-tab :key="1">
            <span class="text-capitalize text-left">
              {{ $t("sale_by_product_services_r") }}
            </span>
          </v-tab>
          <v-tab :key="2">
            <span class="text-capitalize text-left">
              {{ $t("sale_by_product_services_categories_r") }}
            </span>
          </v-tab>
          <v-tab :key="3">
            <span class="text-capitalize text-left">
              {{ $t("sale_targets_r") }}
            </span>
          </v-tab>
           <v-tab :key="4">
            <span class="text-capitalize text-left">
              {{ $t("sale_performance_r") }}
            </span>
          </v-tab>
    


          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0  pr-0">
                <ByCustomer />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <ByProductsServices />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <CategoriesReport />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <SaleTargets />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <SalePerformance />
              </v-card-text>
            </v-card>
          </v-tab-item>
           
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { data } from "@/observable/store";
export default {
  name: "Sales",
  data: () => ({
    isHide: false,
    active_tab_in: data.sale_report_tab_sub,
  }),
  props: {},
  computed: {
    active_tab() {
      return data.sale_report_tab_sub;
    },
  },
  watch: {
    active_tab() {
      this.active_tab_in = this.active_tab;
    },
    active_tab_in() {
      data.sale_report_tab_sub = this.active_tab_in;
    },
  },
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    ByCustomer: () =>import("./sale_reports_analysis/ByCustomer"),
    ByProductsServices: () =>import("./sale_reports_analysis/ByProductsServices"),
    CategoriesReport:()=> import('./sale_reports_analysis/CategoriesReport'),
    SaleTargets:()=> import('./sale_reports_analysis/SaleTargets'),
    SalePerformance:()=> import('./sale_reports_analysis/SalePerformance'),
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
