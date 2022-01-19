<template>
  <v-app class="zoom-in">
    <v-container>
      <v-row>
        <v-col sm="12" cols="12">
          <v-card color="white" class="pa-4 no_border" elevation="0">
            <v-row>
              <v-col sm="12" cols="12" class="tab_wrapper py-0">
                <v-tabs v-model="active_in_tabs">
                  <v-row>
                    <v-col
                      sm="10"
                      cols="10"
                      class="py-0 pr-0"
                      style="display: inherit;"
                    >
      
                      <!-- <v-tab>
                                                <span class="hidden-sm-and-up">
                                                    <v-icon left>mdi-pen</v-icon>
                                                </span>
                                                <span class="hidden-sm-and-down">
                                                    {{$t('working_capital')}}
                                                </span>
                                            </v-tab> -->
                      <!-- <v-tab :key="1">
                        <span class="hidden-sm-and-up">
                          {{ $t("cash") }}
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("cash_flow") }}
                        </span>
                      </v-tab> -->
                      <!-- <v-tab :key="3">
                        <span class="hidden-sm-and-up">
                          {{ $t("funding") }}
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("funding") }}
                        </span>
                      </v-tab> -->
                      <v-tab :key="0">
                        <span class="hidden-sm-and-up">
                          <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("insights") }}
                        </span>
                      </v-tab>
                      <v-tab :key="4">
                        <span class="hidden-sm-and-up">
                          <v-icon left>mdi-attachment</v-icon>
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("segment_budget") }}
                        </span>
                      </v-tab>
                      <v-tab :key="9">
                        <span class="hidden-sm-and-up">
                          <v-icon left>mdi-attachment</v-icon>
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("business_unit_budget") }}
                        </span>
                      </v-tab>
                      <v-tab :key="10">
                        <span class="hidden-sm-and-up">
                          <v-icon left>mdi-attachment</v-icon>
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("project_budget") }}
                        </span>
                      </v-tab>
                      <v-tab :key="5">
                        <span class="hidden-sm-and-up">
                          <v-icon left>mdi-attachment</v-icon>
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("class_budget") }}
                        </span>
                      </v-tab>
                    </v-col>
                    <v-col sm="2" cols="2" class="px-0">
                      <v-menu
                        nudge-bottom="4"
                        bottom
                        offset-y
                        origin="bottom top"
                        transition="scroll-y-reverse-transition"
                      >
                        <template v-slot:activator="{ on }">
                          <span class="hidden-sm-and-up">
                            <div class="dropdown_transactions ml-6">
                              <v-icon v-on="on" left>mdi-plus</v-icon>
                            </div>
                          </span>
                          <span class="hidden-sm-and-down">
                            <v-btn
                              icon
                              v-on="on"
                              class="dropdown_transactions"
                              style="right: 0;"
                            >
                              <v-icon size="17" class="ma-1">mdi-plus</v-icon>
                              {{ $t("new") }}
                              <v-icon size="" class="ma-1">expand_more</v-icon>
                            </v-btn>
                          </span>
                        </template>

                        <v-list>
                          <v-list-item link route to="segment_budget">
                            <v-list-item-title>{{
                              $t("new_budget")
                            }}</v-list-item-title>
                          </v-list-item>

                          <v-list-item link route to="project_budget">
                            <v-list-item-title>{{
                              $t("new_project_budget")
                            }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>

         
                  <!-- <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <CashTabs />
                      </v-card-text>
                    </v-card>
                  </v-tab-item> -->

                  <!-- <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <FundingTab />
                      </v-card-text>
                    </v-card>
                  </v-tab-item> -->
                  <v-tab-item v-if="appType != 'npo'">
                    <v-card flat>
                      <v-card-text class="">
                        <Insight />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item v-else>
                    <v-card flat>
                      <v-card-text class="">
                        <InsightNpo />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <Budget />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <BusinessUnit />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <BudgetsTabs />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <BudgetsClassTabs />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
          
                </v-tabs>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { data,dataStore } from "@/observable/store";
export default {
  name: "",
  components: {
    Insight: () => import("./Insight"),
    InsightNpo: () => import("./InsightNpo"),
    // CashTabs: () => import("./cash/CashTabs"),
    Budget: () => import("./budgets/BudgetsTabs"),
    BusinessUnit: () => import("./business_unit/Tabs"),
    BudgetsTabs: () => import("./project_budget/BudgetsTabs"),
   BudgetsClassTabs: () => import("./class_budget/BudgetsTabs"),
  },
  data: () => ({
    // active_tab: data.budget_tab.main
    active_in_tabs: data.budget_tab_main,
  }),
  computed: {
    active_tab() {
      return data.budget_tab_main;
    },
    appType(){
      return dataStore.productType;
    }
  },
  watch: {
    active_tab() {
      window.console.log("is change", this.active_tab);
      this.active_in_tabs = this.active_tab;
    },
    active_in_tabs() {
      data.budget_tab_main = this.active_in_tabs;
    },
  },
  methods: {
    clickMe(data) {
      this.$route.push(data.link);
    },
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
  font-size: 20px;
  text-transform: capitalize;
}

.v-icon--left {
  margin-right: 0;
}

.theme--light.v-tabs >>> .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.v-card__text {
  padding: 0 !important;
}
</style>
