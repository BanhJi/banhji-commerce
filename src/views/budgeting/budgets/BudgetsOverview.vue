<template>
  <v-card color="white" class="pl-2 no_border" elevation="0">
    <v-row>
      <v-col sm="7" cols="12" class="py-0">
        <h3 class="text-left font_20 line_24">
          {{ $t("budgets_overview") }}
        </h3>
        <p class="mb-1">{{ $t("a_list_of_all_budgets") }}</p>
      </v-col>
      <v-col sm="5" cols="12" class="pt-1 text-right">
        <v-btn
          to="segment_budget"
          color="primary"
          class="text-capitalize white--text"
        >
          {{ $t("new_budget") }}
        </v-btn>

        <v-btn
          color="primary"
          class="text-capitalize white--text float-right ml-2"
          @click="loadData"
        >
          <v-icon>mdi-reload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col sm="12" cols="12" class="tab_wrapper py-0">
        <v-tabs>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("budget_summary") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("list_of_budgets") }}
            </span>
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <BudgetSummary :initBudget="budget" />
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <ListOfBudget />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Helper from "@/helper.js";
import BudgetModel from "@/scripts/model/Budget.js";

const budgetHandler = require("@/scripts/handler/workingcapital/budgetHandler.js");

export default {
  components: {
    // LoadingMe: () => import("@/components/Loading"),
    // BudgetChart: () => import("./BudgetChart"),
    BudgetSummary: () => import("./BudgetSummary"),
    ListOfBudget: () => import("./ListOfBudget"),
  },
  data: () => ({
    budget: new BudgetModel(),
    // LoadingMe
    showLoading: false,
  }),
  methods: {
    /* Load Data */
    async loadData() {
      /* Set Current Fiscal Date */
      let currencyFiscalDate = Helper.getFiscalDateByDate(new Date());

      // Query
      this.showLoading = true;
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
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
  border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}
.v-data-table.simple1_table.theme--light,
.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
  border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table.simple1_table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th:last-child {
  border-right: none !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.border-bottom {
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.font-small {
  font-size: 12px;
  line-height: 15px;
}

.font-26 {
  font-size: 26px !important;
}
.v-data-table.simple_table.theme--light {
  border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  border-bottom: none !important;
  border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:last-child,
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:last-child,
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td:last-child {
  border-right: none !important;
}

@media (max-width: 576px) {
}
</style>
