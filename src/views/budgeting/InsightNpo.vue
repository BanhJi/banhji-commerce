<template>
  <v-row class="mt-1">
    <v-col sm="12" cols="12" class="pb-0 pt-2">
      <v-row class="mt-0">
        <v-col sm="7" cols="12" class="py-0">
          <h3 class="text-left black--text font_20 line_24">
            {{ $t("budgets_overview") }}
          </h3>
          <p class="mb-1">{{ $t("for_current_year") }}</p>
        </v-col>
        <v-col sm="5" cols="12" class="py-0">
          <v-row class="mt-0">
            <v-col sm="12" cols="12" class="pt-1 text-right">
              <v-btn
                color="primary"
                class="text-capitalize white--text float-right ml-2"
                @click="loadData"
              >
                <v-icon>mdi-reload</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col sm="12" class="pt-0 pr-md-2 pb-2" cols="12">
          <LoadingMe
            type="loading"
            :isLoading="showLoading"
            :myLoading="true"
            :fullPage="false"
          />
          <BudgetChart :initBudget="budget" />
        </v-col>
      </v-row>

      <v-row class="mt-0">
        <v-col class="py-0 pr-md-2" sm="4" cols="12">
          <v-card
            color="grayBg"
            outlined
            dense
            class="pa-4 mt-4 no_border"
            min-height="270px"
          >
            <LoadingMe
              :isLoading="showLoading"
              :fullPage="false"
              type="loading"
              :myLoading="true"
            />
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("budget_performance") }}
            </h3>
            <p class="mb-0">{{ $t("by_segments") }}</p>
            <!-- <h2
              class="primary--text niradei_black mb-1 pa-0 text-right col-sm-12"
            >
              {{ amountToPayBalance }}
            </h2> -->
            <template>
              <v-simple-table class="mt-2">
                <template>
                  <tbody>
                    <!-- <tr v-for="item in amountToPay" :key="item.name"> -->
                    <tr>
                      <td style="width:30px" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          {{ $t("budget") }}
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          200,000
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:30px" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          {{ $t("actual") }}
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          200,000
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:30px" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          {{ $t("used") }}
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          50%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:30px" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          {{ $t("remaining") }}
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          100,000
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card>
        </v-col>
        <v-col class="py-md-0 px-md-2" sm="4" cols="12">
          <v-card
            color="grayBg"
            outlined
            dense
            class="pa-4 mt-4 no_border"
            min-height="270px"
          >
            <LoadingMe
              :isLoading="showLoading"
              :fullPage="false"
              type="loading"
              :myLoading="true"
            />
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("budget_performance") }}
            </h3>
            <p class="mb-0">{{ $t("by_projects") }}</p>
            <!-- <h2
              class="primary--text niradei_black mb-1 pa-0 text-right col-sm-12"
            >
              {{ amountToPayBalance }}
            </h2> -->
            <template>
              <v-simple-table class="mt-2">
                <template>
                  <tbody>
                    <!-- <tr v-for="item in amountToPay" :key="item.name"> -->
                    <tr>
                      <td style="width:30px" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          {{ $t("budget") }}
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          200,000
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:30px" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          {{ $t("actual") }}
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          200,000
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:30px" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          {{ $t("used") }}
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          50%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:30px" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          {{ $t("remaining") }}
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          100,000
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card>
        </v-col>
        <v-col class="py-0 pl-md-2" sm="4" cols="12">
          <v-card
            color="grayBg"
            outlined
            dense
            class="pa-4 mt-4 no_border"
            min-height="270px"
          >
            <LoadingMe
              :isLoading="showLoading"
              :fullPage="false"
              type="loading"
              :myLoading="true"
            />
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("budget_performance") }}
            </h3>
            <p class="mb-0">{{ $t("by_classes") }}</p>
            <!-- <h2
              class="primary--text niradei_black mb-1 pa-0 text-right col-sm-12"
            >
              {{ amountToPayBalance }}
            </h2> -->
            <template>
              <v-simple-table class="mt-2">
                <template>
                  <tbody>
                    <!-- <tr v-for="item in amountToPay" :key="item.name"> -->
                    <tr>
                      <td style="width:30px" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          {{ $t("budget") }}
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          200,000
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:30px" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          {{ $t("actual") }}
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          200,000
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:30px" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          {{ $t("used") }}
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          50%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:30px" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          {{ $t("remaining") }}
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          100,000
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import JQuery from "jquery";
// import {i18n} from "@/i18n";
import kendo from "@progress/kendo-ui";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const {
  workingCapitalInsightHandler,
  accountingInsightHandler,
} = require("@/scripts/AppHandlers");

import Helper from "@/helper.js";
import BudgetModel from "@/scripts/model/Budget.js";

const budgetHandler = require("@/scripts/handler/workingcapital/budgetHandler.js");
export default {
  components: {
    // 'CashPosition': () => import(`@/components/overview/CashPosition`),
    LoadingMe: () => import("@/components/Loading"),
    // BudgetVariances: () => import("./insight/BudgetVariances"),
    BudgetChart: () => import("./budgets/BudgetChart"),
    // ConsolidatedBudget: () => import("./insight/ConsolidatedBudget"),
    // ForecastCashFlow: () => import("./insight/ForecastCashFlow"),
  },
  data: () => ({
    budget: new BudgetModel(),
    insight: null,
    cashAndBankBalance: null,
    ratios: null,
    asOf: new Date().toISOString().substr(0, 10),
    expectedBalance: 0,
    decimalFormat: "n2",
    lastUpdated: "",
    showLoading: false,
    expectedDue: [],
    amountToPayBalance: 0,
    amountToPay: [],
  }),
  methods: {
    numberFormat(value, format) {
      return kendo.toString(value, format);
    },
    loadData() {
      let today = new Date();

      // Insight
      workingCapitalInsightHandler.getInsights().then((res) => {
        if (!JQuery.isEmptyObject(res.data)) {
          // Bind data
          this.insight = res.data;
        }
      });

      // Cash And Bank Balance
      workingCapitalInsightHandler.getCashAndBankBalance().then((res) => {
        if (!JQuery.isEmptyObject(res.data)) {
          // Bind data
          this.cashAndBankBalance = res.data;
        }
      });

      // Ratios
      accountingInsightHandler.getAssetLiabilityReport(today).then((res) => {
        if (!JQuery.isEmptyObject(res.data)) {
          // Bind data
          this.ratios = res.data;
        }
      });
      this.showLoading = true;
      let currencyFiscalDate = Helper.getFiscalDateByDate(new Date());
      budgetHandler
        .getBudgetForConsolidate({
          params: {
            fiscal_year_uuid: currencyFiscalDate.uuid,
          },
        })
        .then((res) => {
          if (res.data) {
            this.budget = new BudgetModel(res.data);
          }
        })
        .finally(() => {
          this.showLoading = false;
        });
    },
    async loadExpectedDue() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf + "&type=expected_due";
          // this.showLoading = true
          billingHandler.wcpReceivableOverviewList(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              const response = res.data.data[0];
              this.expectedDue = response.lines;
              this.decimalFormat = response.decimalFormat;
              this.lastUpdated = response.lastUpdatedAt;
              const paymentTerm = response.paymentTermUsed;
              this.mostPaymentTermUsed = paymentTerm.name;
              this.expectedBalance = this.numberFormat(
                response.openBalance,
                response.decimalFormat
              );
              // this.showLoading = false
            }
          });
        }, 10);
      });
    },
    async loadAmountToPay() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf + "&type=amount_to_pay";
          // this.showLoading = true
          billingHandler.wcpPableOverviewList(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              const response = res.data.data[0];
              this.amountToPay = response.lines;
              // this.decimalFormat = response.decimalFormat
              // this.lastUpdated = response.lastUpdatedAt
              // const paymentTerm = response.paymentTermUsed
              // this.mostPaymentTermUsed = paymentTerm.name
              this.amountToPayBalance = this.numberFormat(
                response.openBalance,
                response.decimalFormat
              );
              // this.showLoading = false
            }
          });
        }, 10);
      });
    },
  },
  mounted: async function() {
    this.loadData();
    await this.loadExpectedDue();
    await this.loadAmountToPay();
  },
};
</script>

<style scoped>
.theme--light.v-data-table {
  background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 38px !important;
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}

.v-data-table.average_sale > .v-data-table__wrapper > table > tbody > tr > td {
  height: 50px !important;
}

.v-data-table.collection_day
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td {
  height: 42px !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: #898c8f !important;
}
</style>
