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
                      <v-tab>
                        <span class="">
                          {{ $t("insight") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <span class="">
                          {{ $t("banking") }}
                        </span>
                      </v-tab>
                      <!-- <v-tab v-if="appType !='npo' ">
                        <span class="">
                          {{ $t("payments") }}
                        </span>
                      </v-tab> -->
                      <v-tab>
                        <span class="">
                          {{ $t("cash") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <span class="">
                          {{ $t("setting") }}
                        </span>
                      </v-tab>
                    </v-col>
                    <v-col sm="2" cols="2" class="px-0">
                      <!-- Dropdown New-->
                      <v-menu
                        nudge-bottom="4"
                        bottom
                        offset-y
                        origin="bottom top"
                        transition="scroll-y-reverse-transition"
                      >
                        <template v-slot:activator="{ on }">
                          <span class="hidden-sm-and-up">
                            <div class="dropdown_transactions">
                              <v-icon v-on="on" left>mdi-attachment</v-icon>
                              <v-icon size="" class="ma-1">expand_more</v-icon>
                            </div>
                          </span>
                          <span class="">
                            <v-btn icon v-on="on" class="dropdown_transactions">
                              <v-icon size="17" class="ma-1">mdi-plus</v-icon>
                              {{ $t("new") }}
                              <v-icon size="" class="ma-1">expand_more</v-icon>
                            </v-btn>
                          </span>
                        </template>

                        <v-list>
                          <v-list-item link route to="bank_reconciliation">
                            <v-list-item-title
                              >{{ $t("bank_reconciliation_manually") }}
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item link route to="financial_institution">
                            <v-list-item-title
                              >{{ $t("add_new_financial_institution") }}
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item link route to="bank_account">
                            <v-list-item-title>{{
                              $t("add_new_bank_account")
                            }}</v-list-item-title>
                          </v-list-item>
                          <v-list>
                            <v-list-item link route to="cash_transactions">
                              <v-list-item-title>{{
                                $t("cash_transaction")
                              }}</v-list-item-title>
                            </v-list-item>

                            <v-list-item link route to="cash_reconciliation">
                              <v-list-item-title>{{
                                $t("cash_reconciliation")
                              }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>

                  <v-tab-item v-if="appType != 'npo'">
                    <v-card flat>
                      <v-card-text class="">
                        <Dashboard />
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
                        <Bank />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <!-- <v-tab-item v-if="appType !='npo' " >
                    <v-card flat>
                      <v-card-text class="">
                        <Payments />
                      </v-card-text>
                    </v-card>
                  </v-tab-item> -->
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <CashTabs />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <Setting />
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
import { dataStore, data} from "@/observable/store";
export default {
  name: "banking",
  components: {
    Dashboard: () => import("./Insight"),
    InsightNpo: () => import("./InsightNpo"),
    Bank: () => import("./banking/BankingTab"),
    // Payments: () => import("./payments/PaymentsTab"),
    //Collection: () => import('./collection/Collection'),
    CashTabs: () => import("./cash/CashTabs"),
    Setting: () => import("./settings/Setting"),
  },
  data: () => ({
      active_in_tabs: data.banking_tab_main,
  }),
  computed: {
    appType(){
      return dataStore.productType;
    }
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
  margin-right: 0px;
}

.theme--light.v-tabs > .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.v-tab--active {
  background-color: #f8f8f9;
  color: #000;
}

.theme--light.v-tabs >>> .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.v-card__text {
  padding: 0 !important;
}
</style>
