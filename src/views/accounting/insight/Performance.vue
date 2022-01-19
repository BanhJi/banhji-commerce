<template>
  <div>
    <v-simple-table>
      <template>
        <tbody>
          <tr>
            <td class="text-left pl-0">
              <span class="niradei_medium font_14 grey--text">
                {{ $t("income") }}
              </span>
            </td>
            <td class="text-right pr-0">
              <span class="font_18 dark_grey">
                {{ Number(income).toLocaleString() }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="text-left pl-0">
              <span class="niradei_medium font_14 grey--text">
                {{ $t("expense") }}
              </span>
            </td>
            <td class="text-right pr-0">
              <span class="font_18 dark_grey">
                {{ Number(expense).toLocaleString() }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="text-left pl-0">
              <span class="niradei_heavy font_14 dark_grey">
                {{ $t("net_income") }}
              </span>
            </td>
            <td class="text-right pr-0">
              <span class="niradei_heavy font_18 dark_grey">
                {{ Number(netIncome).toLocaleString() }}
              </span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <LoadingMe
      type="loading"
      :isLoading="showLoading"
      :myLoading="true"
      :fullPage="false"
    />
  </div>
</template>

<script>
// import kendo from '@progress/kendo-ui';
// import {i18n} from '@/i18n'
import Helper from "@/helper.js";

const incomeStatementHandler = require("@/scripts/handler/accounting/incomeStatementHandler");

export default {
  name: "Performance",
  components: {
    LoadingMe: () => import("@/components/Loading"),
  },
  data: () => ({
    income: 0,
    expense: 0,
    netIncome: 0,
    // LoadingMe
    showLoading: false,
  }),
  methods: {
    async loadData() {
      this.showLoading = true;

      this.income = 0;
      this.expense = 0;
      this.netIncome = 0;

      /* Get Current Fiscal Date */
      let currencyFiscalDate = Helper.getFiscalDateByDate(new Date());

      /* Budget */
      let statements = await incomeStatementHandler.getIncomeStatement({
        params: {
          start_date: currencyFiscalDate.start_date + "T00:00:00.000Z",
          end_date: currencyFiscalDate.end_date + "T23:59:59.999Z",
          group_by: "1",
        },
      });

      let incomeTypeIds = [32, 40],
        expenseTypeIds = [33, 34, 35, 36, 37, 38, 39, 41, 42],
        income = 0,
        expense = 0;

      statements.data.forEach((value) => {
        /* Sum Incomes */
        if (~incomeTypeIds.indexOf(value.account_type_number)) {
          income += value.balance;
        }

        /* Sum Expenses */
        if (~expenseTypeIds.indexOf(value.account_type_number)) {
          expense += value.balance;
        }
      });

      this.income = income;
      this.expense = expense;
      this.netIncome = income - expense;

      this.showLoading = false;
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
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}
</style>
