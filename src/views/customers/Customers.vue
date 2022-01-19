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
                      style="display: inherit"
                    >
                      <v-tab :key="0">
                        <span>
                          {{ $t("insights") }}
                        </span>
                      </v-tab>
                      <v-tab :key="1">
                        <span v-if="type == 'npo'">
                          {{ $t("donors") }}
                        </span>
                        <span v-else>
                          {{ $t("customer") }}
                        </span>
                      </v-tab>

                      <v-tab :key="2" v-if="type != 'npo'">
                        <span>
                          {{ $t("receivable") }}
                        </span>
                      </v-tab>
                      <v-tab :key="3" v-if="type != 'npo'">
                        <span>
                          {{ $t("sales") }}
                        </span>
                      </v-tab>
                      <v-tab :key="5" v-if="type != 'npo'">
                        <span>
                          {{ $t("price") }}
                        </span>
                      </v-tab>

                      <v-tab :key="4" v-if="type != 'npo'">
                        <span>
                          {{ $t("setting") }}
                        </span>
                      </v-tab>

                      <!-- only for npo -->
                      <v-tab v-if="type == 'npo'">
                        <span class="">
                          {{ $t("funding") }}
                        </span>
                      </v-tab>
                      <v-tab v-if="type == 'npo'">
                        <span class="">
                          {{ $t("projects") }}
                        </span>
                      </v-tab>
               
                    </v-col>
                    <v-col v-if="type !== 'npo'" sm="2" cols="2" class="px-0">
                      <v-menu
                        nudge-bottom="4"
                        nudge-left="40"
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
                              style="right: 0"
                            >
                              <v-icon size="17" class="ma-1">mdi-plus</v-icon>
                              {{ $t("new") }}
                              <v-icon size="" class="ma-1">expand_more</v-icon>
                            </v-btn>
                          </span>
                        </template>

                        <v-list width="930px" class="pa-3 dropdown_new">
                          <v-row>
                            <v-col
                              sm="4"
                              cols="12"
                              style="border-right: thin solid #ddd"
                            >
                              <v-list-item link route to="lead" class="pl-0">
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("new_lead") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="
                                  mb-3
                                  greyText--text
                                  pl-3
                                  font_12
                                  float-left
                                "
                              >
                                {{ $t("new_lead_desc") }}
                              </p>
                              <v-list-item
                                link
                                route
                                to="sale_quote"
                                class="pl-0"
                              >
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("sale_quote") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="
                                  mb-3
                                  greyText--text
                                  pl-3
                                  font_12
                                  float-left
                                "
                              >
                                {{ $t("sale_quote_desc1") }}
                              </p>
                              <v-list-item
                                link
                                route
                                to="sale_order"
                                class="pl-0"
                              >
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("sale_order") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="
                                  mb-3
                                  greyText--text
                                  pl-3
                                  font_12
                                  float-left
                                "
                              >
                                {{ $t("sale_order_desc1") }}
                              </p>
                              <v-list-item
                                link
                                route
                                to="sale_deposit"
                                class="pl-0"
                              >
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("sale_deposit") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="
                                  mb-3
                                  greyText--text
                                  pl-3
                                  font_12
                                  float-left
                                "
                              >
                                {{ $t("sale_deposit_desc1") }}
                              </p>
                            </v-col>
                            <v-col
                              sm="4"
                              cols="12"
                              style="border-right: thin solid #ddd"
                            >
                              <v-list-item link route to="invoice" class="pl-0">
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("invoice") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="
                                  mb-3
                                  greyText--text
                                  font_12
                                  pl-3
                                  float-left
                                "
                              >
                                {{ $t("invoice_desc") }}
                              </p>
                              <!--                              <v-list-item-->
                              <!--                                  link-->
                              <!--                                  route-->
                              <!--                                  to="delayed_invoice"-->
                              <!--                                  class="pl-0"-->
                              <!--                              >-->
                              <!--                                <v-list-item-title>-->
                              <!--                                  <h3 class="primary&#45;&#45;text text-bold pl-3">-->
                              <!--                                    {{ $t("delayed_invoice") }}-->
                              <!--                                  </h3>-->
                              <!--                                </v-list-item-title>-->
                              <!--                              </v-list-item>-->
                              <!--                              <p-->
                              <!--                                  class="mb-3 greyText&#45;&#45;text font_12 pl-3 float-left"-->
                              <!--                              >-->
                              <!--                                {{ $t("delayed_invoice_desc") }}-->
                              <!--                              </p>-->

                              <v-list-item
                                link
                                route
                                to="cash_receipt"
                                class="pl-0"
                              >
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("cash_receipt") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="
                                  mb-3
                                  greyText--text
                                  font_12
                                  pl-3
                                  float-left
                                "
                              >
                                {{ $t("cash_receipt_desc") }}
                              </p>
                              <v-list-item
                                link
                                route
                                to="sale_return"
                                class="pl-0"
                              >
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("credit_memo") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="
                                  mb-3
                                  greyText--text
                                  font_12
                                  pl-3
                                  float-left
                                "
                              >
                                {{ $t("sale_return_desc") }}
                              </p>
                            </v-col>
                            <v-col sm="4" cols="12" class="pr-4">
                              <!--                                                <v-list-item link route to="cash_refund" class="pl-0">-->
                              <!--                                                    <v-list-item-title >-->
                              <!--                                                        <h3 class="primary--text text-bold pl-3">{{ $t('cash_refund') }}</h3>-->
                              <!--                                                    </v-list-item-title>-->
                              <!--                                                </v-list-item>-->
                              <!--                                                <p class="mb-3 greyText--text font_12 pl-3 float-left">{{$t('cash_refund_desc')}}</p>-->
                              <v-list-item
                                link
                                route
                                to="statement"
                                class="pl-0"
                              >
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("statement") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="
                                  mb-3
                                  greyText--text
                                  font_12
                                  pl-3
                                  float-left
                                "
                              >
                                {{ $t("statement_desc1") }}
                              </p>

                              <v-list-item link route to="individual_customer">
                                <h3
                                  style="
                                    width: 70%;
                                    line-height: 26px;
                                    font-size: 22px;
                                  "
                                  class="text-bold"
                                >
                                  {{ $t("add_individual_customer") }}
                                </h3>
                              </v-list-item>
                              <v-list-item
                                link
                                route
                                to="company_customer"
                                class="mt-6"
                              >
                                <h3
                                  style="
                                    width: 70%;
                                    line-height: 26px;
                                    font-size: 22px;
                                  "
                                  class="text-bold"
                                >
                                  {{ $t("add_company_customer") }}
                                </h3>
                              </v-list-item>
                            </v-col>
                          </v-row>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-tab-item v-if="type != 'npo'">
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

                  <v-tab-item v-if="type != 'npo'">
                    <v-card flat>
                      <v-card-text class="">
                        <CustomersTab />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item v-else>
                    <v-card flat>
                      <v-card-text class="">
                        <CustomersDonorTab />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <!-- from share funding -->

                  <v-tab-item v-if="type != 'npo'">
                    <v-card flat>
                      <v-card-text class="">
                        <ReceivablesTab />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item v-if="type != 'npo'">
                    <v-card flat>
                      <v-card-text class="">
                        <Sales />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item v-if="type != 'npo'">
                    <v-card flat>
                      <v-card-text class="">
                        <PricingManagement />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item v-if="type != 'npo'">
                    <v-card flat>
                      <v-card-text class="">
                        <Setting />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <!-- only npo -->
                  <!--  -->
                  <!-- ============ -->
                  <!-- \\\\\\\\\ -->

                  <v-tab-item v-if="type == 'npo'">
                    <v-card flat>
                      <v-card-text class="">
                        <FundingTab />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item v-if="type == 'npo'">
                    <v-card flat>
                      <v-card-text class="">
                        <Projects />
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
import { data, dataStore } from "@/observable/store";
// import {  } from "@/observable/store";

export default {
  name: "Customers",
  components: {
    Insight: () => import("./Insight"),
    InsightNpo: () => import("./InsightNpo"),
    CustomersTab: () => import("./customer/CustomersTab"),
    Sales: () => import("./sales/Sales"),
    // Price: () => import('./Price'),
    ReceivablesTab: () => import("./receivables/ReceivablesTab.vue"),
    Setting: () => import("./settings/Settings"),
    PricingManagement: () => import("./pricing_management/PricingManagement"),
    // get from serice & project folder
    Projects: () => import("@/views/services_projects/projects/Projects"),
    //  get from share_funding folder
    FundingTab: () => import("@/views/share_funding/funding/FundingTab"),
    CustomersDonorTab: () =>
      import("@/views/share_funding/donor/CustomersDonorTab"),
  },
  data: () => ({
    // active_tab: data.customer_tab.main
    active_in_tabs: data.customer_tab_main,
  }),
  computed: {
    active_tab() {
      return data.customer_tab_main;
    },
    type() {
      return dataStore.productType;
    },
  },
  watch: {
    active_tab() {
      window.console.log("is change", this.active_tab);
      this.active_in_tabs = this.active_tab;
    },
    active_in_tabs() {
      data.customer_tab_main = this.active_in_tabs;
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
