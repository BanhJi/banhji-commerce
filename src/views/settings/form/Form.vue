<template>
  <v-row class="">
    <v-col sm="12" cols="12">
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
        <v-tab v-if="appType != 'npo'" >
          <span class="text-capitalize">
            {{ $t("invoices") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize">
            {{ $t("sales_form") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize">
            {{ $t("purchase") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize">
            {{ $t("expense_reimburesements") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize">
            {{ $t("advance_and_settlement") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize">
            {{ $t("accounting") }}
          </span>
        </v-tab>

        <v-tab-item v-if="appType != 'npo' ">
          <v-row>
            <v-col sm="12" cols="12" class="pl-5 px-0 pt-0">
              <Invoice />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pl-5 px-0 pt-0">
              <SaleTabs />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pl-5 px-0 pt-0">
              <PurchaseTab />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pl-5 px-0 pt-0">
              <ExpenceTab />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pl-5 px-0 pt-0">
              <AdvanceTab />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pl-5 px-0 pt-0">
              <AccountingTab />
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
import {dataStore} from "@/observable/store";
export default {
  data: () => ({
    isHide: false,
  }),
  props: {},
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  computed: {
    appType(){
      return dataStore.productType;
    }
  },
  components: {
    Invoice: () => import("./Invoices"), // lazy load component
    SaleTabs: () => import("./SaleTabs"),
    PurchaseTab: () => import("./purchase/PurchaseTab"),
    ExpenceTab: () => import("./expense/ExpenceTab"),
    AccountingTab: () => import("./accounting/AccountingTab"),
    AdvanceTab: () => import("./advance/AdvanceTab")
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
