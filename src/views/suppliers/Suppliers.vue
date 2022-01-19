<template>
  <v-app class="zoom-in">
    <v-container>
      <v-row>
        <v-col sm="12" cols="12">
          <v-card color="white" class="pa-4 no_border" elevation="0">
            <v-row>
              <v-col sm="12" cols="12" class="tab_wrapper py-0">
                <v-tabs v-model="active_in_tabs" >
                  <v-row>
                    <v-col
                      sm="10"
                      cols="10"
                      class="py-0 pr-0"
                      style="display: inherit;"
                    >
       
                      <v-tab>
                        <span class="">
                          {{ $t("insights") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <span class="">
                          {{ $t("suppliers") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <!-- <span class="hidden-sm-and-up">
                          <v-icon left>mdi-pen</v-icon>
                        </span> -->
                        <span class="">
                          {{ $t("payables") }}
                        </span>
                      </v-tab>
                      <v-tab  v-if="appType != 'npo'">
                        <span class="">
                          {{ $t("purchases") }}
                        </span>
                      </v-tab>
                      <v-tab :key="4">
                        <span class="">
                          {{ $t("expenses") }}
                        </span>
                      </v-tab>
                      <v-tab :key="5" v-if="appType != 'npo'">
                        <!-- <span class="hidden-sm-and-up">
                          <v-icon left>mdi-attachment</v-icon>
                        </span> -->
                        <span class="">
                          {{ $t("settings") }}
                        </span>
                      </v-tab>
                  
                    </v-col>
                    <v-col v-if="appType != 'npo'" sm="2" cols="2" class="px-0">
                      <v-menu
                        nudge-bottom="4"
                        nudge-left="40"
                        bottom
                        z-index="10000"
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
                        <v-list width="930px" class="pa-3 mr-4">
                          <v-row>
                            <v-col
                              sm="4"
                              cols="12"
                              style="border-right: thin solid #ddd;"
                            >
                              <v-list-item
                                link
                                route
                                to="purchase_order"
                                class="pl-0"
                              >
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("purchase_order") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="mb-3 greyText--text pl-3 font_12 float-left"
                              >
                                {{ $t("purchase_order_desc") }}
                              </p>

                              <v-list-item
                                link
                                route
                                to="purchase_deposit"
                                class="pl-0"
                              >
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("purchase_deposit") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="mb-3 greyText--text pl-3 font_12 float-left"
                              >
                                {{ $t("purchase_deposit_desc") }}
                              </p>

                              <v-list-item
                                link
                                route
                                to="credit_purchase"
                                class="pl-0"
                              >
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("purchase") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="mb-3 greyText--text pl-3 font_12 float-left"
                              >
                                {{ $t("credit_purchase_desc") }}
                              </p>
                            </v-col>
                            <v-col
                              sm="4"
                              cols="12"
                              style="border-right: thin solid #ddd;"
                            >
                              <v-list-item
                                link
                                route
                                to="expenses"
                                class="pl-0"
                              >
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("expenses") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="mb-3 greyText--text font_12 pl-3 float-left"
                              >
                                {{ $t("expenses_desc") }}
                              </p>

                              <v-list-item
                                link
                                route
                                to="cash_payment"
                                class="pl-0"
                              >
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("cash_payment") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="mb-3 greyText--text font_12 pl-3 float-left"
                              >
                                {{ $t("cash_payment_desc") }}
                              </p>

                              <v-list-item
                                link
                                route
                                to="purchase_return"
                                class="pl-0"
                              >
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("debit_note") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="mb-3 greyText--text font_12 pl-3 float-left"
                              >
                                {{ $t("purchase_return_desc") }}
                              </p>
                              <v-list-item
                                link
                                route
                                to="vendor_quote"
                                class="pl-0"
                              >
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("vendor_quote") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                            </v-col>
                            <v-col sm="4" cols="12" class="pr-4">
                              <!--                                                <v-list-item link route to="payment_refund" class="pl-0">-->
                              <!--                                                    <v-list-item-title >-->
                              <!--                                                        <h3 class="primary&#45;&#45;text text-bold pl-3">{{ $t('payment_refund') }}</h3>-->
                              <!--                                                    </v-list-item-title>-->
                              <!--                                                </v-list-item>-->
                              <!--                                                <p class="mb-8 greyText&#45;&#45;text font_12 pl-3 float-left">{{$t('payment_refund_desc')}}</p>-->

                              <v-list-item link route to="individual_supplier">
                                <h3
                                  style="width: 70%;line-height: 26px; font-size: 22px;"
                                  class="text-bold"
                                >
                                  {{ $t("add_individual_supplier") }}
                                </h3>
                              </v-list-item>
                              <v-list-item
                                link
                                route
                                to="company_supplier"
                                class="mt-6"
                              >
                                <h3
                                  style="width: 70%;line-height: 26px; font-size: 22px;"
                                  class="text-bold"
                                >
                                  {{ $t("add_company_supplier") }}
                                </h3>
                              </v-list-item>
                            </v-col>
                          </v-row>
                        </v-list>
                      </v-menu>
                    </v-col>
                    <v-col v-else sm="2" cols="2" class="px-0">
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
                          <span class="hidden-sm-and-down">
                            <v-btn icon v-on="on" class="dropdown_transactions">
                              <v-icon size="17" class="ma-1">mdi-plus</v-icon>
                              {{ $t("new") }}
                              <v-icon size="" class="ma-1">expand_more</v-icon>
                            </v-btn>
                          </span>
                        </template>

                        <v-list>
                          <v-list-item link route to="individual_supplier">
                            <v-list-item-title
                              >{{ $t("add_individual_supplier") }}
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item link route to="company_supplier">
                            <v-list-item-title
                              >{{ $t("add_company_supplier") }}
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item link route to="expenses">
                            <v-list-item-title
                              >{{ $t("expenses") }}
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item link route to="cash_payment">
                            <v-list-item-title>{{
                              $t("cash_payment")
                            }}</v-list-item-title>
                          </v-list-item>
                          <v-list>
                            <v-list-item link route to="purchase_return">
                              <v-list-item-title>{{
                                $t("debit_note")
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
                        <SupplyTab />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <Payables />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item v-if="appType != 'npo'">
                    <v-card flat>
                      <v-card-text class="">
                        <PurchaseTab />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <Expnese />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item v-if="appType != 'npo'">
                    <v-card flat>
                      <v-card-text class="">
                        <Settings />
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
// import { data } from "@/observable/store";
import { data, dataStore } from "@/observable/store";
export default {
  name: "",
  components: {
    Insight: () => import("./Insight"),
    InsightNpo: () => import("./InsightNpo"),
    SupplyTab: () => import("./suppliers/SuppliersTab"),
    PurchaseTab: () => import("./purchase/PurchaseTab"),
    Settings: () => import("./settings/Settings"),
    Payables: () => import("./payables/Payables.vue"),
    Expnese: () => import("./expense/Expneses"),
  },
  data: () => ({
    // active_tab: data.vendor_tab.main
    active_in_tabs: data.vendor_tab_main,
  }),
  computed: {
    active_tab() {
      return data.vendor_tab_main;
    },
    appType() {
      return dataStore.productType;
    },
  },
  watch: {
    active_tab() {
      window.console.log("is change", this.active_tab);
      this.active_in_tabs = this.active_tab;
    },
    active_in_tabs() {
      data.vendor_tab_main = this.active_in_tabs;
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
/* .v-menu__content{
  top: 141px !important;
  left: 1098px !important;
} */
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
