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
                {{ $t("revenues") }}
              </span>
            </td>
            <td class="text-right">
              <span class="niradei_heavy font_18 dark_grey">
                {{ revenue }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="text-left">
              <span class="niradei_medium font_14 grey--text">
                {{ $t("cost_of_gods_sold") }}
              </span>
            </td>
            <td class="text-right">
              <span class="niradei_heavy font_18 dark_grey">
                {{ cogs }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="text-left">
              <span class="niradei_medium font_14 grey--text">
                {{ $t("operating_expenses") }}
              </span>
            </td>
            <td class="text-right">
              <span class="niradei_heavy font_18 dark_grey">
                {{ operatingExpense }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="text-left">
              <span class="niradei_medium font_14 grey--text">
                EBITDA
              </span>
            </td>
            <td class="text-right">
              <span class="niradei_heavy font_18 dark_grey">
                {{ ebitda }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="text-left">
              <span class="niradei_medium font_14 grey--text">
                {{ $t("net_profit") }}
              </span>
            </td>
            <td class="text-right">
              <span class="niradei_heavy font_18 dark_grey">
                {{ netProfit }}
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

const BudgetHandler = require("@/scripts/handler/workingcapital/budgetHandler");
const AccountTypeCode = require("@/scripts/default_setup/AccountTypeCode.js");

export default {
  name: "BudgetVariances",
  components: {
    LoadingMe: () => import("@/components/Loading"),
  },
  data: () => ({
    revenue: 0,
    cogs: 0,
    operatingExpense: 0,
    ebitda: 0,
    netProfit: 0,
    // LoadingMe
    showLoading: false,
  }),
  methods: {
    async loadData() {
      this.showLoading = true;

      // Load Account List
      let accounts = await this.$store.dispatch("accounting/getAccounts");

      let totalRevenue = 0,
        totalActualRevenue = 0,
        totalCogs = 0,
        totalActualCogs = 0,
        totalOptExp = 0,
        totalActualOptExp = 0,
        ebitda = 0,
        actualEbitda = 0;

      /* Set Current Fiscal Date */
      let currencyFiscalDate = Helper.getFiscalDateByDate(new Date());

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
        if (account.account_type.nature.toLowerCase() === "cr") {
          /* Amount */
          value.amount = value.amount * -1;
        }

        /* Revenue */
        if (account.account_type.number === AccountTypeCode.REVENUE) {
          totalRevenue += kendo.parseFloat(value.amount);
        }

        /* COGS */
        if (account.account_type.number === AccountTypeCode.COGS) {
          totalCogs += kendo.parseFloat(value.amount);
        }

        /* Operating Expenses */
        if (
          ~AccountTypeCode.OPERATING_EXPENSES.indexOf(
            account.account_type.number
          )
        ) {
          totalOptExp += kendo.parseFloat(value.amount);
        }

        /* EBITDA */
        if(account.account_type.number === 32 || account.account_type.number === 40){
          ebitda += kendo.parseFloat(value.amount);
        }
        if(account.account_type.number >= 33 && account.account_type.number <= 38){
          ebitda -= kendo.parseFloat(value.amount);
        }
      });
      /* End Budget */

      /* Actual Budget */
      let actuals = await BudgetHandler.getActualBudgetForConsolidate({
        params: {
          as_of_date:
            kendo.toString(new Date(), "yyyy-MM-dd") + "T23:59:59.999Z", // As Of Date is Today
          group_by: "1",
        },
      });

      actuals.data.forEach((value) => {
        /* Set Account Information */
        let account = new AccountModel(
          accounts.find((item) => item.uuid === value.accountUUID)
        );

        /* Revenue */
        if (account.account_type.number === AccountTypeCode.REVENUE) {
          totalActualRevenue += kendo.parseFloat(value.balance);
        }

        /* COGS */
        if (account.account_type.number === AccountTypeCode.COGS) {
          totalActualCogs += kendo.parseFloat(value.balance);
        }

        /* Operating Expenses */
        if (
          ~AccountTypeCode.OPERATING_EXPENSES.indexOf(
            account.account_type.number
          )
        ) {
          totalActualOptExp += kendo.parseFloat(value.balance);
        }

        /* EBITDA */
        if(account.account_type.number === 32 || account.account_type.number === 40){
          actualEbitda += kendo.parseFloat(value.balance);
        }
        if(account.account_type.number >= 33 && account.account_type.number <= 38){
          actualEbitda -= kendo.parseFloat(value.balance);
        }
      });
      /* End Actual Budget */

      /* Bind Data */
      this.revenue = this.findVariancePercentage(
        totalActualRevenue,
        totalRevenue
      );
      this.cogs = this.findVariancePercentage(totalActualCogs, totalCogs);
      this.operatingExpense = this.findVariancePercentage(
        totalActualOptExp,
        totalOptExp
      );
      this.ebitda = this.findVariancePercentage(actualEbitda, ebitda);
      
      let netProfit = totalRevenue - (totalCogs + totalOptExp);
      let netActualProfit =
        totalActualRevenue - (totalActualCogs + totalActualOptExp);
      this.netProfit = this.findVariancePercentage(netActualProfit, netProfit);

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
