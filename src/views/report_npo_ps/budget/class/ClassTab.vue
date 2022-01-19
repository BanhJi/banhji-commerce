
<template>
  <v-row>
    <v-col sm="12" class="py-0" cols="12">
      <v-tabs>
         <v-tab>
          <span class="hidden-sm-and-down text-uppercase text-left">
            {{ $t("class") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-down text-uppercase text-left">
            {{ $t("expenditure_by_class") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-down text-uppercase text-left">
            {{ $t("expenditure_by_class_percent") }}
          </span>
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
              <Class/>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
              <ExpenditureClass/>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
              <ExpenditureClassPercent/>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ExpenditureSatement",
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
    Class: () => import('/src/views/budgeting/class_budget/BudgetPerformance'),
    ExpenditureClass: () => import('@/views/accounting/reports/budget_financial/BudgetClass.vue'),
    ExpenditureClassPercent: () => import('@/views/accounting/reports/budget_financial/BudgetClassPercentage.vue')
  },
}; 
</script>
<style scoped>
.v-menu__content .v-list .v-list-item {
  min-height: 35px !important;
}

.tab_wrapper {
  position: relative;
  display: inherit;
}

.v-tab {
  min-width: 30px;
  font-size: 17px;
  text-transform: capitalize;
}

.v-icon--left {
  margin-right: 0px;
}

.theme--light.v-tabs > .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.menuable__content__active {
  left: 448px !important;
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