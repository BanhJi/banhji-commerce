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
            <span class="text-capitalize">
              {{ $t("project_center") }}
            </span>
          </v-tab>
          <v-tab>
            <span class=" text-capitalize">
              {{ $t("project_billing") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="text-capitalize">
              {{ $t("project_report") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="text-capitalize">
              {{ $t("profit_or_lost") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="text-capitalize">
              {{ $t("project_budget") }}
            </span>
          </v-tab>
          <v-tab  v-if=" appType === 'npo' ||  appType === 'Public Sectors'">
            <span class="text-capitalize">
              {{ $t("fund_balance") }}
            </span>
          </v-tab>
          <v-tab  v-if=" appType === 'npo' ||  appType === 'Public Sectors'">
            <span class="text-capitalize">
              {{ $t("receipt_payment") }}
            </span>
          </v-tab>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0"> 
                <ProjectInformation/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0"> 
                <ProjectBilling />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0"> 
                <ProjectReports/>
              </v-card-text>
            </v-card>
          </v-tab-item>
        <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0"> 
                <StatementProfiltLost/>
              </v-card-text>
            </v-card>
          </v-tab-item>
        <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0"> 
                <BudgetsTabs/>
              </v-card-text>
            </v-card>
          </v-tab-item >
          <v-tab-item v-if="appType === 'npo' ||  appType === 'Public Sectors'">
            <v-card flat>
              <v-card-text class="py-0 pr-0"> 
                Comming Soon
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item  v-if=" appType === 'npo' ||  appType === 'Public Sectors'">
            <v-card flat>
              <v-card-text class="py-0 pr-0"> 
                <ReceiptPayment/>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { dataStore } from "@/observable/store";
export default {
  name: "Cahsflow",
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
    appType() {
      return dataStore.productType;
    },
  },
  components: {
    BudgetsTabs: ()=> import('./project_budget/BudgetsTabs'),
    ReceiptPayment : () => import('./receipt_payment/Tap'),
    ProjectInformation: () => import("./project_information/ProjectInformation"),
    ProjectBilling: () => import("./project_billing/ProjectBilling"),
    ProjectReports: () => import("./project_reports/ProjectReports"),
    StatementProfiltLost: ()=> import("./statement_profit_lost/StatementProfiltLost"),
  },
};
</script>
<style scoped>
.arr_icon {
  color: #2ca01c;
}
.arr_icon1 {
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

p {
  color: rgba(0, 0, 0, 0.87);
}
</style>
