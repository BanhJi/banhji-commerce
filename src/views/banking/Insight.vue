<template>
  <v-row>
    <v-col class="pb-0 pt-4" sm="12" cols="12">
      <v-row>
        <!-- <v-col class="py-0 pr-md-2" sm="4" cols="12">
          <div class="d-flex">
            <v-card
              outlined
              dense
              color="primary"
              class="pa-2 mb-4 no_border flex-1 niradei_bold"
              min-height="62px"
            >
              <v-row>
                <h6 class="col-sm-12 col-md-4 font_34 white--text">
                  {{
                    insight
                      ? Number(
                          insight.number_of_unreconcile_account
                        ).toLocaleString()
                      : "00"
                  }}
                </h6>
                <h4
                  class="text-right flex_right white--text py-0 col-sm-12 col-md-8 font_16 text-uppercase"
                >
                  {{ $t("need_to_be_reconciled") }}
                </h4>
              </v-row>
            </v-card>
            <v-btn style="height:62px !important;" color="primary" class="ml-1">
              <v-icon @click="loadDataAll" size="30" color="white"
                >mdi-reload</v-icon
              >
            </v-btn>
          </div>
          <v-card
            outlined
            dense
            class="pa-4 no_border"
            min-height="234"
            color="grayBg"
          >
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("bank_balance") }}
            </h3>
            <p class="mb-0">
              {{ $t("as_of_today") }}
            </p>
            <h2
              class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
            >
              {{ Number(bankBalance).toLocaleString() }}
            </h2>
            <template>
              <v-simple-table class="mb-3">
                <template>
                  <tbody>
                    <tr>
                      <td class="text-left pl-0" style="width: 69%">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("balance_in_bank") }}
                        </span>
                      </td>
                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          {{ Number(balanceInBank).toLocaleString() }} %
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:60%" class="text-left  pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("payment_in_transit") }}
                        </span>
                      </td>
                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          {{ Number(paymentInTransit).toLocaleString() }} %
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
            <v-row>
              <v-col class="pl-0 py-0 text-right align-self-end">
                <router-link
                  to=""
                  class="mb-0 niradei_bold font_16 primary--text text-right"
                  >{{ $t("view_report") }}
                </router-link>
              </v-col>
            </v-row>
          </v-card>
        </v-col> -->
        <v-col class="py-md-0 px-md-2" sm="12" cols="12">
          <v-card
            color="grayBg"
            outlined
            dense
            class="pa-4 no_border"
            min-height="282"
          >
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("cash_bank_balance") }}
            </h3>
            <p class="mb-0">
              {{ $t("as_of_today") }}
            </p>
            <v-row>
              <v-col sm="12" class="py-0" cols="12">
                <CashPosition height="300" />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <!-- col row 2 -->
        <v-col class="py-0 pl-md-2" sm="4" cols="12">
          <!-- <v-card
            outlined
            dense
            class="pa-4 no_border mt-4"
            min-height="278"
            color="grayBg"
          >
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("account_connections") }}
            </h3>
            <p class="mb-0">
              {{ $t("as_of_today") }}
            </p>
            <h2
              class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
            >
              {{ qr + bills }}
            </h2>
            <template>
              <v-simple-table>
                <LoadingMe
                  :isLoading="loadingConnectedAccount"
                  :fullPage="false"
                  :myLoading="true"
                  :type="'loading'"
                >
                </LoadingMe>
                <template>
                  <tbody>
                    <tr>
                      <td class="text-left pl-0" style="width: 50%;">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("bill_payment") }}
                        </span>
                      </td>
                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">{{
                          bills
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("qr_payment") }}
                        </span>
                      </td>
                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">{{
                          qr
                        }}</span>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card> -->
          <v-card
            outlined
            dense
            class="pa-4 no_border mt-4"
            min-height="270"
            color="grayBg"
          >
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("bank_balances") }}
            </h3>
            <p class="mb-0">
              {{ $t("as_of_today") }}
            </p>
            <template>
              <v-simple-table class="mt-2">
                <template>
                  <tbody>
                    <!-- <tr v-for="item in amountToPay" :key="item.name"> -->
                    <tr>
                      <td style="width: 40%" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          ABA Bank
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          200,000
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          ACLEDA Bank
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          200,000
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          PPCBank
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          50%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          AMK
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          100,000
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          Phillip Bank
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
          <!-- <v-card
            outlined
            dense
            class="pa-4 no_border mt-4"
            min-height="201px"
            color="grayBg"
          >
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("payment") }}
            </h3>
            <p class="mb-0">
              {{ $t("from_the_beginning_year") }}
            </p>
            <LoadingMe
              :isLoading="showLoadingGraph"
              :fullPage="false"
              :myLoading="true"
              :type="'loading'"
            >
            </LoadingMe>
            <chart
              ref="chart"
              :legend-visible="false"
              :series-defaults-labels-visible="true"
              :series-defaults-labels-template="'#= category # : #= value #%'"
              :series="series_chart"
              :tooltip-template="'#= category # : #= value #%'"
              :chartArea="chartAreaChart"
              :tooltip-visible="true"
              :theme="'sass'"
            />
          </v-card> -->
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
              {{ $t("cash_bank_balance") }}
            </h3>
            <p class="mb-0">{{ $t("by_account_types") }}</p>
            <h2
              class="
                primary--text
                line_height_20
                niradei_black
                mb-1
                pa-0
                text-right
                col-sm-12
              "
            >
              00
            </h2>
            <template>
              <v-simple-table class="mt-2">
                <template>
                  <tbody>
                    <!-- <tr v-for="item in amountToPay" :key="item.name"> -->
                    <tr>
                      <td style="width: 40%" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          {{ $t("cash_on_hand") }}
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          200,000
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          {{ $t("pretty_cash") }}
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          200,000
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          {{ $t("saving_account") }}
                        </span>
                      </td>

                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          50%
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%" class="text-left px-0">
                        <span class="niradei_medium font_14 grey--text">
                          <!-- {{ item.name }} {{ $t(item.locale) }} -->
                          {{ $t("current_account") }}
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
        <v-col class="py-0 pl-md-2 my_carousel" sm="4" cols="12">
          <v-card
            outlined
            dense
            class="pa-4 mt-4 no_border"
            min-height="270"
            color="grayBg"
          >
            <h3 class="font_28 niradei_black mb-3 primary--text" style="line-height:26px">
              {{ $t("connect_your_bank_accounts") }}
            </h3>
            <p class="font_18 line_26">{{ $t("continuously_reconciling_bank") }}</p>
            <v-btn color="primary" class="text-capitalize text-bold">
              {{$t('get_started')}}
            </v-btn>
            <p class="font_12 line_14 mt-2 mb-0" >{{$t('banhji_important_note')}}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import JQuery from "jquery";

const {
  workingCapitalInsightHandler,
  accountingInsightHandler,
} = require("@/scripts/AppHandlers");
// import { Chart } from "@progress/kendo-charts-vue-wrapper";
import { i18n } from "@/i18n";
import bankPaymentHandler from "@/scripts/bankPaymentHandler";
import dashboardHandler from "@/scripts/dashboard/customer/handler/dashboardHandler";
import kendo from "@progress/kendo-ui";

export default {
  components: {
    // chart: Chart,
    LoadingMe: () => import(`@/components/Loading`),
    CashPosition: () => import(`@/components/overview/CashPosition`),
  },
  data: () => ({
    insight: null,
    loadingConnectedAccount: false,
    bankBalance: 0,
    balanceInBank: 0,
    paymentInTransit: 0,
    cashAndBankBalance: null,
    slides: ["First", "Second", "Third"],
    chartAreaChart: {
      background: "transparent",
      height: 201,
    },
    series_chart: [
      {
        type: "pie",
        startAngle: 180,
        data: [
          {
            category: i18n.t("card_payment"),
            value: 22,
            color: "#c80000",
          },
          {
            category: i18n.t("bill_payment"),
            value: 45,
            color: "#f44336",
          },
          {
            category: i18n.t("qr_code_payment"),
            value: 11,
            color: "#d85604",
          },
          //   {
          //     category: i18n.t("overdraft"),
          //     value: 22,
          //     color: "#e88d14",
          //   },
        ],
      },
    ],
    showLoadingGraph: false,
    showLoading: false,
    bills: 0,
    qr: 0,
    overCreditLimit: [],
  }),
  methods: {
    loadData() {
      // Cash And Bank Balance
      workingCapitalInsightHandler.getCashAndBankBalance().then((res) => {
        if (!JQuery.isEmptyObject(res.data)) {
          // Bind data
          this.cashAndBankBalance = res.data;
          this.calculateBankBalance();
        }
      });
      // Insight
      accountingInsightHandler.getInsights().then((res) => {
        if (!JQuery.isEmptyObject(res.data)) {
          // Bind data
          this.insight = res.data;
        }
      });
    },
    /* Calculate Bank Balance */
    calculateBankBalance() {
      this.bankBalance =
        this.cashAndBankBalance.in_bank + this.cashAndBankBalance.in_trasit;

      if (this.bankBalance > 0) {
        this.balanceInBank = this.cashAndBankBalance.in_bank / this.bankBalance;
        this.paymentInTransit =
          this.cashAndBankBalance.in_trasit / this.bankBalance;
      }
    },
    async loadConnectedBank() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.loadingConnectedAccount = true;
          bankPaymentHandler.list().then(async (res) => {
            const response = res.data;
            this.bills = response.filter(
              (b) => b.serviceType === "billpayment"
            ).length;
            this.qr = response.filter(
              (b) => b.serviceType === "qrpayment"
            ).length;
            this.loadingConnectedAccount = false;
          });
        }, 10);
      });
    },
    async dashboardBankingPaymentOptionGraph() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoadingGraph = true;
          dashboardHandler.bankingGraphPaymentOption().then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoadingGraph = false;
              const response = res.data.data;
              let series = [];
              const colors = [
                "#c80000",
                "#642828",
                "#f44336",
                "#522D2DFF",
                "#d85604",
                "#ED1A3A",
                "#7a4141",
                "#e88d14",
                "#f1aa45",
              ];
              let index = 0;
              response.forEach((j) => {
                series.push({
                  category: i18n.t(j.name),
                  value: kendo.toString(j.amountPercentage, j.decimalFormat),
                  color: colors[index],
                });
                index += 1;
                if (index > colors.length) {
                  index = 0;
                }
              });
              this.series_chart = [
                {
                  type: "pie",
                  autoFit: true,
                  startAngle: 180,
                  data: series,
                },
              ];
            }
          });
        }, 10);
      });
    },
    async loadDataAll() {
      this.loadData();
      await this.loadConnectedBank();
      await this.dashboardBankingPaymentOptionGraph();
    },
  },
  mounted: async function () {
    this.loadData();
    await this.loadConnectedBank();
    await this.dashboardBankingPaymentOptionGraph();
  },
};
</script>

<style scoped>
.theme--light.v-data-table {
  background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.borderRadius20 {
  border-radius: 20% !important;
}
.line_height_20 {
  line-height: 20px !important;
}

.theme--dark.v-btn.v-btn--icon {
  color: #ed1a3a !important;
  height: 17px !important;
}
</style>
