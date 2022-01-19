<template>
  <div>
    <LoadingMe
        type="loading"
        :isLoading="showLoading"
        :myLoading="true"
        :fullPage="false"
      />
    <v-simple-table>
      <template>
        <tbody>
          <tr>
            <td class="text-left">
              <span class="niradei_medium font_14 grey--text">
                {{ $t("cash_balance") }}
              </span>
            </td>
            <td class="text-right">
              <span class="niradei_heavy font_18 dark_grey">
                {{ cashBalance }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="text-left">
              <span class="niradei_medium font_14 grey--text">
                {{ $t("expected_due") }}
              </span>
            </td>
            <td class="text-right">
              <span class="niradei_heavy font_18 dark_grey">
                {{ expectedDue }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="text-left">
              <span class="niradei_medium font_14 grey--text">
                {{ $t("payable_to_pay") }}
              </span>
            </td>
            <td class="text-right">
              <span class="niradei_heavy font_18 dark_grey">
                {{ payableToPay }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="text-left">
              <span class="niradei_medium font_14 grey--text">
                {{ $t("budgeted_expense") }}
              </span>
            </td>
            <td class="text-right">
              <span class="niradei_heavy font_18 dark_grey">
                {{ budgetedExpense }}
              </span>
            </td>
          </tr>
          <tr class="light-green--text">
            <td class="text-left">
              <span class="niradei_medium font_14 grey--text">
                {{ $t("forecasted_balance") }}
              </span>
            </td>
            <td class="text-right">
              <span class="niradei_heavy font_18 dark_grey">
                {{ forecastedBalance }}
              </span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
// import {i18n} from "@/i18n";
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import AccountModel from "@/scripts/model/Account.js";

const TrialBalanceHandler = require("@/scripts/handler/accounting/trialBalanceHandler");
const BudgetHandler = require("@/scripts/handler/workingcapital/budgetHandler");
const AccountTypeCode = require("@/scripts/default_setup/AccountTypeCode.js");

export default {
  name: "BudgetVariances",
  components: {
    LoadingMe: () => import("@/components/Loading"),
  },
  data: () => ({
    cashBalance: 0,
    expectedDue: 0,
    payableToPay: 0,
    budgetedExpense: 0,
    forecastedBalance: 0,
    // LoadingMe
    showLoading: false,
  }),
  methods: {
    async loadData() {
      this.showLoading = true;

      // Load Account List
      let accounts = await this.$store.dispatch("accounting/getAccounts");

      let cashBalance = 0,
        expectedDueAmount = 0,
        payableToPayAmount = 0,
        budgetedExpenseAmount = 0;

      /* Set Current Fiscal Date */
      let currencyFiscalDate = Helper.getFiscalDateByDate(new Date());

      /* Trial Balance */
      let trialBalances = await TrialBalanceHandler
          .getTrialBalance({
            params: {
              as_of_date:
                kendo.toString(new Date(), "yyyy-MM-dd") + "T23:59:59.999Z",
            },
          })

      trialBalances.data.tbdetails.forEach((value) => {
        let amt = value.balance;
        if (value.account.account_type.nature.toLowerCase() === "cr") {
          amt = value.balance * -1;
        }

        /* Cash Balance */
        if(~AccountTypeCode.CASH_ACCOUNTS.indexOf(value.account.account_type.number)){
          cashBalance += kendo.parseFloat(amt);
        }

        /* Expected Due */
        if(value.account.account_type.number === AccountTypeCode.ACCOUNT_RECEIVABLE){
          expectedDueAmount += kendo.parseFloat(amt);
        }

        /* Payable To Pay */
        if(value.account.account_type.number === AccountTypeCode.ACCOUNT_PAYABLE){
          payableToPayAmount += kendo.parseFloat(amt);
        }
      });

      /* Generate Months */
      this.fiscalMonths = Helper.generateFiscalMonths(
        currencyFiscalDate.start_date,
        currencyFiscalDate.end_date,
        "12"
      );

      /* Find index of selected month */
			let monthOfFormated = kendo.toString(new Date(), "MMM yyyy"),
          monthOfIndex = this.fiscalMonths.indexOf(monthOfFormated);

      /* Budget */
      let budgets = await BudgetHandler.getBudgetForConsolidate({
        params: {
          fiscal_year_uuid: currencyFiscalDate.uuid,
        },
      });

      budgets.data.lines.forEach((value) => {
        /* Set Account Information */
        let account = new AccountModel(
          accounts.find((item) => item.uuid === value.account_uuid)
        );

        /* Reverse Nature */
        let nature = 1;
        if (account.account_type.nature.toLowerCase() === "cr") {
          nature = -1;
        }

        /* Budget Expenses */
        if (~AccountTypeCode.PL_EXPENSES.indexOf(account.account_type.number)) {
          let currentMonth = value.monthly_amount[monthOfIndex];
          budgetedExpenseAmount += kendo.parseFloat(currentMonth.amount * nature);
        }
      });
      /* End Budget */

      /* Bind Data */
      this.cashBalance = kendo.toString(cashBalance, "n");
      this.expectedDue = kendo.toString(expectedDueAmount, "n");
      this.payableToPay = kendo.toString(payableToPayAmount, "n");
      this.budgetedExpense = kendo.toString(budgetedExpenseAmount, "n");

      this.forecastedBalance = kendo.toString((cashBalance + expectedDueAmount) - (payableToPayAmount + budgetedExpenseAmount), "n");

      this.showLoading = false;
    },
    /* Find Variance Percentage */
    findVariancePercentage(num1, num2) {
      let amt = 0;
      if (num2 !== 0) {
        amt = num1 / num2;
      }

      return kendo.toString(amt, "p");
    },
  },
  mounted() {
    this.loadData();
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
