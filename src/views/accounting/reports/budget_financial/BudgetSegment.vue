<template>
  <v-row>
		<v-col sm="12" cols="12" :class=" appType != 'npo' &&  appType != 'Public Sectors' ? 'grayBg px-6' : '' " >
			<v-card color="white" :class=" appType != 'npo' &&  appType != 'Public Sectors' ? 'pa-3 no_border' : '' "  elevation="0">
        <!-- Search -->
        <v-row class="mt-0">
          <v-col sm="3" cols="12" class="py-0 pt-6">
            <app-fiscal-date-dropdownlist
              :initFiscalDate="fiscalDate"
              @emitFiscalDate="fiscalDate = $event"
              @onChanged="onFiscalDateChanges"
            />
          </v-col>
          <v-col sm="3" cols="12" class="py-0 pt-6">
            <app-month-of-picker
              :initMonthOf="monthOf"
              @emitMonthOf="monthOf = $event"
              @onChanged="onMonthOfChanges"
              :initMin="minMonth"
              :initMax="maxMonth"
            />
          </v-col>
          <v-col sm="3" cols="12" class="py-0 pt-6">
            <v-select
              class="mt-1"
              :disabled="monthOf === ''"
              placeholder="Select Budget"
              @change="onChangeBudget"
              v-model="budget"
              :items="budgetList"
              item-text="name"
              item-value="uuid"
              return-object
              clearable
              outlined
            />
          </v-col>
          <v-col sm="3" cols="12" class="py-0">
            <!-- Reporting Language -->
            <label class="mb-1">{{ $t("language") }}:</label>
            <app-reporting-language
              :initLanguage="reportingLanguage"
              @emitLanguage="reportingLanguage = $event"
            />
          </v-col>
        </v-row>

        <!-- Summary -->
        <v-row>
          <v-col class="pt-0" sm="6" cols="12">
            <template>
              <v-simple-table class="table_list nomal_table">
                <template>
                  <tbody>
                    <tr>
                      <td style="width: 45%" class="">
                        {{ $t("budget_name") }}
                      </td>
                      <td class="">{{ budget.name }}</td>
                    </tr>
                    <tr>
                      <td class="">{{ $t("segment") }}</td>
                      <td class="" v-if="budget.segment">
                        {{ budget.segment.name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="">{{ $t("fiscal_year") }}</td>
                      <td class="" v-if="budget.fiscal_year">
                        {{
                          Helper.formatFiscalDate(budget.fiscal_year.start_date)
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="">{{ $t("used_for_consolidation") }}</td>
                      <td class="">
                        {{ budget.use_consolidation === 1 ? "Yes" : "No" }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-col>
          <v-col class="pt-0" sm="6" cols="12">
            <template>
              <v-simple-table class="table_list nomal_table">
                <template>
                  <tbody>
                    <tr>
                      <td class="">{{ $t("created_on") }}</td>
                      <!-- <td class="">{{ budget.created_date }}</td> by rothny -->
                      <td class="" v-if="budget.created_date">
                        {{ Helper.dateFormat(budget.created_date) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="">{{ $t("last_edited_on") }}</td>
                      <td class="">{{ budget.modified_date }}</td>
                    </tr>
                    <tr>
                      <td class="">{{ $t("last_edited_by") }}</td>
                      <td class="">
                        {{
                          budget.modified_by.first_name === ""
                            ? budget.created_by.first_name +
                              " " +
                              budget.created_by.last_name
                            : budget.modified_by.first_name +
                              " " +
                              budget.modified_by.last_name
                        }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-col>
        </v-row>

        <!-- Grid -->
        <v-row>
          <v-col sm="12" cols="12" class="pt-1">
            <template>
              <kendo-datasource
                ref="statementPLDS"
                :data="statementPLList"
                :schema="schemaDefinition"
                :sort="sortDefinition"
                :group="groupDefinition"
                :aggregate="aggregateDefinition"
              />

              <kendo-grid
                id="incomeStatementGrid"
                class="custom_grid"
                :data-source-ref="'statementPLDS'"
                :dataBound="dataBound"
                :sortable="true"
                :column-menu="false"
                :reorderable="true"
                :resizable="true"
                :noRecords="true"
                :groupable="groupable"
                :columns="columns"
              />

              <LoadingMe
                type="loading"
                :isLoading="showLoading"
                :myLoading="true"
                :fullPage="false"
              />
            </template>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import { i18n } from "@/i18n";
import Helper from "@/helper.js";
/* Models */
import SegmentModel from "@/scripts/model/Segment.js";
import BudgetModel from "@/scripts/model/Budget.js";
import AccountModel from "@/scripts/model/Account.js";
import { dataStore } from "@/observable/store";

const incomeStatementHandler = require("@/scripts/handler/accounting/incomeStatementHandler");
const OrderNumberPL = require("@/scripts/default_setup/OrderNumberPL.js");
const NumberInWord = require("@/scripts/default_setup/NumberInWord.js");

export default {
  components: {
    LoadingMe: () => import("@/components/Loading"),
    "app-fiscal-date-dropdownlist": () =>
      import("@/components/kendo_templates/FiscalDateDropDownList"),
    "app-month-of-picker": () =>
      import("@/components/kendo_templates/MonthOfPicker"),
    "app-reporting-language": () =>
      import("@/components/kendo_templates/ReportingLanguageDropDownList"),
  },
  data: () => ({
    monthOf: "",
    budget: new BudgetModel(),
    budgetList: [],
    incomeStatements: [],
    statementPLList: [],
    fiscalDate: null,
    fiscalMonths: [],
    minMonth: "",
    maxMonth: "",
    Helper: Helper,
    columns: [],
    sortDefinition: { field: "number", dir: "asc" },
    groupable: {
      enabled: false,
      showFooter: true,
    },
    groupDefinition: [],
    aggregateDefinition: [
      { field: "budget_month", aggregate: "sum" },
      { field: "budget_ytd", aggregate: "sum" },
      { field: "budget_whole", aggregate: "sum" },
      { field: "actual_month", aggregate: "sum" },
      { field: "actual_ytd", aggregate: "sum" },
      { field: "actual_whole", aggregate: "sum" },
    ],
    schemaDefinition: {
      model: { id: "uuid" },
    },
    // Reporting Language
    reportingLanguage: "english",
    fieldName: "name",
    fieldType: "type",
    totalWord: "Total",
    // LoadingMe
    showLoading: false,
  }),
  methods: {
    onFiscalDateChanges() {
      this.monthOf = "";
      this.budget = new BudgetModel();
      this.fiscalMonths = [];

      if (this.fiscalDate !== null) {
        /* Set Month Range */
        this.minMonth = this.fiscalDate.start_date;
        this.maxMonth = this.fiscalDate.end_date;

        /* Generate Months */
        this.fiscalMonths = Helper.generateFiscalMonths(
          this.fiscalDate.start_date,
          this.fiscalDate.end_date,
          "12"
        );

        /* Load Budget */
        this.loadBudget();
      }
    },
    onMonthOfChanges() {
      if (this.incomeStatements.length > 0) {
        /* Bind Data */
        this.bindData();
      }
    },
    async loadBudget() {
      let budgets = await this.$store.dispatch("budgets/getList"),
        segments = await this.$store.dispatch("segments/getList");

      let budgetList = [];
      budgets.forEach((value) => {
        if (
          value.fiscal_year.uuid === this.fiscalDate.uuid &&
          value.segment_uuid !== ""
        ) {
          let budget = new BudgetModel(value);
          budget.segment = new SegmentModel(
            segments.find((i) => i.id === value.segment_uuid)
          );
          budgetList.push(budget);
        }
      });
      this.budgetList = budgetList;
    },
    /* On Budget Changes */
    onChangeBudget() {
      this.search();
    },
    /* Search */
    search() {
      if (this.budget.uuid !== "") {
        let sdate =
            kendo.toString(new Date(this.fiscalDate.start_date), "yyyy-MM-dd") +
            "T00:00:00.000Z",
          edate =
            kendo.toString(new Date(this.fiscalDate.end_date), "yyyy-MM-dd") +
            "T23:59:59.999Z";

        // Empty statementPLDS
        let ds = this.$refs.statementPLDS.kendoWidget();
        ds.data([]);

        // Query Income Statement
        this.showLoading = true;
        incomeStatementHandler
          .getIncomeStatement({
            params: {
              start_date: sdate,
              end_date: edate,
              group_by: "12",
              segment_uuid: this.budget.segment_uuid,
            },
          })
          .then((res) => {
            if (res.data) {
              this.incomeStatements = res.data;
              this.bindData();
            }
          })
          .finally(() => {
            this.showLoading = false;
          });
      } else {
        /* Alert Warning */
        this.$snotify.warning(i18n.t("please_select_budget"));
      }
    },
    async bindData() {
      let entries = [];
      let Entry = kendo.data.Model.define({
        id: "uuid", // the identifier of the model
        fields: {
          /* Budget */
          budget_month: { type: "number", defaultValue: 0 },
          budget_ytd: { type: "number", defaultValue: 0 },
          budget_whole: { type: "number", defaultValue: 0 },

          /* Actual */
          actual_month: { type: "number", defaultValue: 0 },
          actual_ytd: { type: "number", defaultValue: 0 },
          actual_whole: { type: "number", defaultValue: 0 },

          /* Percentage */
          month_percentage: { type: "number", defaultValue: 0 },
          ytd_percentage: { type: "number", defaultValue: 0 },
          whole_percentage: { type: "number", defaultValue: 0 },

          /* Account Information */
          name: { type: "string", defaultValue: "" },
          local_name: { type: "string", defaultValue: "" },
          type: { type: "string", defaultValue: "" },
          type_local_name: { type: "string", defaultValue: "" },
          account_type_number: { type: "number", defaultValue: 0 },

          /* Other */
          order: { type: "number", defaultValue: 0 },
        },
      });

      // Load Account List
      let accounts = await this.$store.dispatch("accounting/getAccounts");

      /* Find index of selected month */
      let monthOfFormated = kendo.toString(new Date(this.monthOf), "MMM yyyy"),
        budgetMonthFormated = kendo.toString(new Date(this.monthOf), "yyyy-MM");

      let monthOfIndex = this.fiscalMonths.indexOf(monthOfFormated);

      /* Gathering from budget lines */
      this.budget.lines.forEach((value) => {
        let entry = new Entry(),
          nature = 1; /* Default Naure is Dr = 1 */

        /* Set Account Information */
        let account = new AccountModel(
          accounts.find((item) => item.uuid === value.account_uuid)
        );
        entry.uuid = account.uuid;
        entry.name = account.name;
        entry.local_name = account.local_name;
        entry.type = account.account_type.name;
        entry.type_local_name = account.account_type.local_name;
        entry.account_type_number = account.account_type.number;

        /* Reverse Nature */
        if (account.account_type.nature.toLowerCase() === "cr") {
          nature = -1;
        }

        /* Order */
        if (account.account_type.number === OrderNumberPL.OtherRevenue.number) {
          //Other Revenue
          entry.order = OrderNumberPL.OtherRevenue.order;
        } else {
          entry.order = account.account_type.number;
        }

        /* BUDGET */
        /* Budget Whole */
        entry.budget_whole = value.amount * nature;

        value.monthly_amount.forEach((mline) => {
          /* Budget Month */
          if (mline.month_of === budgetMonthFormated) {
            entry.budget_month = mline.amount * nature;
          }

          /* Budget YTD */
          if (
            kendo.toString(new Date(mline.month_of), "yyyy-MM-dd") <=
            kendo.toString(new Date(this.monthOf), "yyyy-MM-dd")
          ) {
            entry.budget_ytd += mline.amount * nature;
          }
        });

        /* ACTUAL */
        this.incomeStatements.forEach((plline) => {
          if (plline.accountUUID === value.account_uuid) {
            /* Actual Month */
            let propertyMonth = NumberInWord[monthOfIndex]; // ['zero','one','two',...]
            entry.actual_month = plline[propertyMonth]; // plline['zero']

            for (let i = 0; i < 12; i++) {
              let property = NumberInWord[i];

              /* Actual YTD */
              if (i <= monthOfIndex) {
                entry.actual_ytd += plline[property];
              }

              /* Actual Whole */
              entry.actual_whole += plline[property];
            }
          }
        });

        /* Percentage = Actual / Budget */
        if (entry.budget_month !== 0) {
          entry.month_percentage = entry.actual_month / entry.budget_month;
        }
        if (entry.budget_ytd !== 0) {
          entry.ytd_percentage = entry.actual_ytd / entry.budget_ytd;
        }
        if (entry.budget_whole !== 0) {
          entry.whole_percentage = entry.actual_whole / entry.budget_whole;
        }

        /* Add entry */
        entries.push(entry);
      });

      /* Gathering from budget estimations */
      this.budget.budget_estimations.forEach((value) => {
        let entry = new Entry();

        /* Set Account Information */
        entry.uuid = value.accountUUID;
        entry.name = value.name;
        entry.local_name = value.local_name;
        entry.type = value.type;
        entry.type_local_name = value.type_local_name;
        entry.account_type_number = value.account_type_number;

        // Order
        if (value.account_type_number == OrderNumberPL.GrossProfit.number) {
          // Gross Profit
          entry.order = OrderNumberPL.GrossProfit.order;
        } else if (
          value.account_type_number == OrderNumberPL.OtherRevenue.number
        ) {
          // Other Revenue
          entry.order = OrderNumberPL.OtherRevenue.order;
        } else if (
          value.account_type_number == OrderNumberPL.OperatingExpense.number
        ) {
          // Operating Expense
          entry.order = OrderNumberPL.OperatingExpense.order;
        } else if (
          value.account_type_number ==
          OrderNumberPL.OperatingIncomeEBITDA.number
        ) {
          // Operating Income (EBITDA)
          entry.order = OrderNumberPL.OperatingIncomeEBITDA.order;
        } else if (
          value.account_type_number ==
          OrderNumberPL.EarningBeforeInterestAndTaxEBIT.number
        ) {
          // Earning Before Interest And Tax(EBIT)
          entry.order = OrderNumberPL.EarningBeforeInterestAndTaxEBIT.order;
        } else if (
          value.account_type_number == OrderNumberPL.ProfitBeforeTax.number
        ) {
          // Profit Before Tax
          entry.order = OrderNumberPL.ProfitBeforeTax.order;
        } else if (
          value.account_type_number == OrderNumberPL.ProfitForThePeriod.number
        ) {
          // Profit For The Period
          entry.order = OrderNumberPL.ProfitForThePeriod.order;
        } else {
          entry.order = value.account_type_number;
        }

        /* BUDGET */

        /* Budget Month */
        let propertyBudgetMonth = NumberInWord[monthOfIndex]; // ['zero','one','two',...]
        entry.budget_month = value[propertyBudgetMonth]; // value['zero']

        for (let i = 0; i < 12; i++) {
          let property = NumberInWord[i];

          /* Budget YTD */
          if (i <= monthOfIndex) {
            entry.budget_ytd += value[property];
          }

          /* Budget Whole */
          entry.budget_whole += value[property];
        }

        /* ACTUAL */
        this.incomeStatements.forEach((plline) => {
          if (plline.account_type_number === value.account_type_number) {
            /* Actual Month */
            let propertyActualMonth = NumberInWord[monthOfIndex]; // ['zero','one','two',...]
            entry.actual_month = plline[propertyActualMonth]; // plline['zero']

            for (let i = 0; i < 12; i++) {
              let property = NumberInWord[i];

              /* Actual YTD */
              if (i <= monthOfIndex) {
                entry.actual_ytd += plline[property];
              }

              /* Actual Whole */
              entry.actual_whole += plline[property];
            }
          }
        });

        /* Percentage = Actual / Budget */
        if (entry.budget_month !== 0) {
          entry.month_percentage = entry.actual_month / entry.budget_month;
        }
        if (entry.budget_ytd !== 0) {
          entry.ytd_percentage = entry.actual_ytd / entry.budget_ytd;
        }
        if (entry.budget_whole !== 0) {
          entry.whole_percentage = entry.actual_whole / entry.budget_whole;
        }

        /* Add entry */
        entries.push(entry);
      });

      /* BIND STATMENT */
      this.statementPLList = entries;
      this.generateColumn();
    },
    /* Databound */
    dataBound(e) {
      let grid = e.sender;

      grid.dataSource.data().forEach((value) => {
        if (value.account_type_number >= 100) {
          let row = grid.tbody
            .find("tr[data-uid='" + value.uid + "']")
            .prev(".k-grouping-row");
          grid.collapseGroup(row);
        }
      });
    },
    // Generate Columns
    generateColumn() {
      let headerAttributes = {
          class: "table-header-cell",
          style: "text-align: center; font-size: 14px",
        },
        subHeaderAttributes = {
          class: "table-header-cell",
          style: "text-align: right; font-size: 14px",
        },
        attributes = {
          class: "table-cell",
          style: "text-align: right; font-size: 14px",
        };

      /* Columns */
      let columns = [
        {
          field: this.fieldName,
          title: i18n.t("account"),
          groupFooterTemplate: this.totalWord + " #=value#",
          locked: true,
          width: 300,
        },
        {
          field: this.fieldType,
          title: "TYPE",
          hidden: true,
          groupHeaderTemplate: this.typeGroupHeaderTmpl,
          width: 300,
        },
        /* Selected Month */
        {
          title: kendo.toString(new Date(this.monthOf), "MMMM yyyy"),
          headerAttributes: headerAttributes,
          columns: [
            {
              field: "budget_month",
              title: i18n.t("budget"),
              format: "{0:n}",
              aggregates: "['sum']",
              groupFooterTemplate:
                "<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
              width: 150,
              headerAttributes: subHeaderAttributes,
              attributes: attributes,
            },
            {
              field: "actual_month",
              title: i18n.t("actual"),
              format: "{0:n}",
              aggregates: "['sum']",
              groupFooterTemplate:
                "<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
              width: 150,
              headerAttributes: subHeaderAttributes,
              attributes: attributes,
            },
            {
              field: "month_percentage",
              title: "%",
              format: "{0:p}",
              width: 150,
              headerAttributes: subHeaderAttributes,
              attributes: attributes,
            },
          ],
        },
        /* YTD(up to selected month) */
        {
          title: i18n.t("ytd_up_to_selected_month"),
          headerAttributes: headerAttributes,
          columns: [
            {
              field: "budget_ytd",
              title: i18n.t("budget"),
              format: "{0:n}",
              aggregates: "['sum']",
              groupFooterTemplate:
                "<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
              width: 150,
              headerAttributes: subHeaderAttributes,
              attributes: attributes,
            },
            {
              field: "actual_ytd",
              title: i18n.t("actual"),
              format: "{0:n}",
              aggregates: "['sum']",
              groupFooterTemplate:
                "<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
              width: 150,
              headerAttributes: subHeaderAttributes,
              attributes: attributes,
            },
            {
              field: "ytd_percentage",
              title: "%",
              format: "{0:p}",
              width: 150,
              headerAttributes: subHeaderAttributes,
              attributes: attributes,
            },
          ],
        },
        /* Whole Year */
        {
          title: i18n.t("whole_year"),
          headerAttributes: headerAttributes,
          columns: [
            {
              field: "budget_whole",
              title: i18n.t("budget"),
              format: "{0:n}",
              aggregates: "['sum']",
              groupFooterTemplate:
                "<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
              width: 150,
              headerAttributes: subHeaderAttributes,
              attributes: attributes,
            },
            {
              field: "actual_whole",
              title: i18n.t("actual"),
              format: "{0:n}",
              aggregates: "['sum']",
              groupFooterTemplate:
                "<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
              width: 150,
              headerAttributes: subHeaderAttributes,
              attributes: attributes,
            },
            {
              field: "whole_percentage",
              title: "%",
              format: "{0:p}",
              width: 150,
              headerAttributes: subHeaderAttributes,
              attributes: attributes,
            },
          ],
        },
      ];

      /* Set Columns */
      this.columns = columns;
    },
    // On Reporint Language Changes
    onReportingLanguageChanges() {
      this.fieldName = "name";
      this.fieldType = "type";
      this.totalWord = "Total";
      if (this.reportingLanguage === "local") {
        this.fieldName = "local_name";
        this.fieldType = "type_local_name";
        this.totalWord = "សរុប";
      }

      // Generate Group By
      this.generateGroupBy();

      // Generate column with new language
      this.generateColumn();
    },
    /* Templates */
    typeGroupHeaderTmpl(dataItem) {
      let name = dataItem.items[0].type;

      if (this.reportingLanguage === "local") {
        name = dataItem.items[0].type_local_name;
      }

      return "<span class='text-bold text-black'>" + name + "</span>";
    },
    // Generate Group By
    generateGroupBy() {
      this.groupDefinition = {
        field: this.fieldType,
        aggregates: this.aggregateDefinition,
        compare: function(a, b) {
          if (a.items[0].order === b.items[0].order) {
            return 0;
          } else if (a.items[0].order > b.items[0].order) {
            return 1;
          } else {
            return -1;
          }
        },
      };
    },
  },
  watch: {
    budget() {
      // Prevent null error
      if (this.budget === null) {
        this.budget = new BudgetModel();
      }
    },
    reportingLanguage() {
      this.onReportingLanguageChanges();
    },
  },
  computed: {
		appType(){
			return dataStore.productType;
		},
	},
  mounted() {
    // Generate Group By
    this.generateGroupBy();

    // Initial Grid Columns
    // this.generateColumn();
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
.v-data-table.simple_table.theme--light {
  border-left: thin solid rgba(0, 0, 0, 0.12) !important;
  border-right: thin solid rgba(0, 0, 0, 0.12) !important;
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
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
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

.v-data-table.table_list > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
  border-right: none !important;
}
.v-data-table.table_list.theme--light
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:first-child
  > td {
  border-top: none !important;
}

@media (max-width: 576px) {
}
</style>
