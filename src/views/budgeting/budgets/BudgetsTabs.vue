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
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("list_of_budget") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("budgets_breakdown") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("consolidated_budget") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("budget_performance") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("consolidated_budget_performance") }}
            </span>
          </v-tab>
          <v-tab-item>
            <v-row>
              <v-col sm="12" cols="12" class="pl-5 pt-0">
                <ListOfBudget />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col sm="12" cols="12" class="pl-5 pt-0">
                <DetailBudgetBreakDown />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col sm="12" cols="12" class="pl-5 pt-0">
                <ConsolidatedBudget />
              </v-col>
            </v-row>
          </v-tab-item>
        <v-tab-item>
            <v-row>
              <v-col sm="12" cols="12" class="pl-5 pt-0">
                <BudgetPerformance />
              </v-col>
            </v-row>
          </v-tab-item>
        <v-tab-item>
            <v-row>
              <v-col sm="12" cols="12" class="pl-5 pt-0">
                <ConsolidatedBudgetPerformance />
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
  components: {
    ListOfBudget: () => import('./ListOfBudget'),
    DetailBudgetBreakDown: () => import('./DetailBudgetBreakDown'),
    ConsolidatedBudget: () => import('./ConsolidatedBudget'),
    BudgetPerformance: ()=> import('./BudgetPerformance'),
    ConsolidatedBudgetPerformance: ()=> import('./ConsolidatedBudgetPerformance'),
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
