<template>
  <v-row>
		<v-col sm="12" cols="12" class="grayBg px-6" >
			<v-card color="white" class="pa-3 no_border "  elevation="0">
         <h3 class="text-left mb-1 font_20 line_24">
          {{ $t("statmant_pro_lost_project") }}
        </h3>
        <v-row class="mt-0">
          <v-col sm="10" cols="12" class="py-0">
            <date-search
              :initStartDate="startDate"
              @emitStartDate="startDate = $event"
              :initEndDate="endDate"
              @emitEndDate="endDate = $event"
            />
          </v-col>
          <v-col sm="2" cols="4" class="py-0">
              <app-reporting-language
                :initLanguage="reportingLanguage"
                @emitLanguage="reportingLanguage = $event"
              />
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col class="py-0" sm="4" cols="4">
            <label class="label">{{ $t("project") }}</label>
            <app-project-list-item-group
              :initProject="selectedProjectIds"
              @emitProject="selectedProjectIds = $event"
            />
          </v-col>
          <v-col class="py-1" sm="4" cols="4">
            <v-btn class="white--text dv_mt" color="primary" @click="search">
              <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col sm="12" cols="12" class="custom_expansion">
            <kendo-datasource
              ref="statementPLDS"
              :data="statementPLList"
              :schema="schemaDefinition"
              :sort="sortDefinition"
              :group="groupDefinition"
              :aggregate="aggregateDefinition"
            />

            <kendo-grid
              id="gridSPL"
              class="custom_grid"
              :data-source-ref="'statementPLDS'"
              :dataBound="dataBound"
              :change="onGridChanges"
              :selectable="true"
              :persistSelection="true"
              :sortable="true"
              :column-menu="true"
              :reorderable="true"
              :resizable="true"
              :noRecords="true"
              :toolbar="['excel']"
              :excel-file-name="'incomeStatement.xlsx'"
              :excel-filterable="true"
              :columns="columns"
            />
          </v-col>
        </v-row>

        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          :myLoading="true"
          type="loading"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import { i18n } from "@/i18n";
import Helper from "@/helper.js";
import { mapState } from "vuex";
import { dataStore } from "@/observable/store";

const { incomeStatementHandler } = require("@/scripts/AppHandlers");
const OrderNumberPL = require("@/scripts/default_setup/OrderNumberPL.js");

export default {
  components: {
    LoadingMe: () => import("@/components/Loading"),
    "date-search": () => import("@/components/custom_templates/DateSearch"),
    "app-reporting-language": () =>
      import("@/components/kendo_templates/ReportingLanguageDropDownList"),
    "app-project-list-item-group": () =>
      import("@/components/dropdownlist/ProjectListItemGroup"),
  },
  data: () => ({
    // Obj
    startDate: "",
    endDate: "",
    statementPLList: [],
    selectedProjectIds: [],
    Helper: Helper,
    // Reporting Language
    reportingLanguage: "english",
    fieldName: "name",
    fieldType: "type",
    // LodingMe
    showLoading: false,
    /* KENDO */
    columns: [],
    sortDefinition: { field: "number", dir: "asc" },
    groupDefinition: [],
    aggregateDefinition: [],
    schemaDefinition: {
      model: { id: "accountUUID" },
    },
  }),
  methods: {
    async loadData() {
      // Call List
      await this.$store.dispatch("projects/getList");
    },
    /* KENDO */
    /* On grid changes => link to GL */
    onGridChanges() {
      let grid = kendo.jQuery("#gridSPL").data("kendoGrid");
      let selectedProjectIds = grid.dataItem(grid.select());

      this.$router.push({
        path: "general_ledger",
        query: {
          account_id: selectedProjectIds.accountUUID,
          start_date: this.startDate,
          end_date: this.endDate,
        },
      });
    },
    // Search journals
    search() {
      if (this.selectedProjectIds.length > 0) {
        let sdate = this.startDate,
          edate = this.endDate;

        if (sdate && edate) {
          sdate =
            kendo.toString(new Date(sdate), "yyyy-MM-dd") + "T00:00:00.000Z";

          edate = new Date(edate);
          edate = kendo.toString(edate, "yyyy-MM-dd") + "T23:59:59.999Z";
        } else {
          sdate = 0;
          edate = 0;
        }

        // Empty dataSource
        let ds = this.$refs.statementPLDS.kendoWidget();
        ds.data([]);

        // Query
        this.showLoading = true;
        incomeStatementHandler
          .getByProjects({
            params: {
							start_date: sdate,
							end_date: edate,
							group_by: "1",
						}
          }, this.selectedProjectIds)
          .then((response) => {
            this.statements = response;
            this.bindData();
          })
          .finally(() => {
            this.showLoading = false;
          });
      } else {
        Helper.alertErrorMsg("Please select project");
      }
    },
    /* Bind Data */
    async bindData() {
      let entries = {};

      for (let i = 0; i < this.selectedProjectIds.length; i++) {
        this.statements[i].forEach((value) => {
          let entry = value;

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

          /* Grouping */
          let groupName =
            String(value.accountUUID) + String(value.account_type_number);
          if (entries[groupName]) {
            entries[groupName]["s" + i] = value.balance;
          } else {
            entries[groupName] = entry;

            /* Add all segments to columns */
            for (let j = 0; j < this.selectedProjectIds.length; j++) {
              entries[groupName]["s" + j] = 0;
            }

            entries[groupName]["s" + i] = value.balance;
          }
        });
      }

      this.statementPLList = Object.values(entries);
      this.generateColumn();
    },
    // Row Template
    accountTmpl(dataItem) {
      let name = dataItem.number;

      if (this.reportingLanguage === "local") {
        name += " - " + dataItem.local_name;
      } else {
        name += " - " + dataItem.name;
      }

      return name;
    },
    typeGroupHeaderTmpl(dataItem) {
      let name = dataItem.items[0].type;

      if (this.reportingLanguage === "local") {
        name = dataItem.items[0].type_local_name;
      }

      return name;
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
      let columns = [
        {
          field: this.fieldName,
          title: i18n.t("account"),
          template: this.accountTmpl,
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
        {
          field: "statementGroup",
          title: "STATEMENT GROUP",
          hidden: true,
          groupHeaderTemplate:
            "<span class='text-bold text-black'>#=value#</span>",
          width: 300,
        },
        {
          field: "groupNature",
          title: "NATURE",
          hidden: true,
          groupHeaderTemplate:
            "<span class='text-bold text-black'>#=value#</span>",
          width: 300,
        },
      ];

      let headerAttributes = {
          class: "table-header-cell",
          style: "text-align: right;padding-right: 35px; font-size: 14px",
        },
        attributes = {
          class: "table-cell",
          style: "text-align: right; font-size: 14px",
        };

      /* Set Column Segments */
      for (let i = 0; i < this.selectedProjectIds.length; i++) {
        /* Project */
        let project = this.projects.find(
          (item) => item.id === this.selectedProjectIds[i]
        );

        /* Column Project */
        columns.push({
          field: "s" + i,
          title: project.name,
          format: "{0:n}",
          width: 200,
          aggregates: "['sum']",
          groupHeaderColumnTemplate:
            "<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
          headerAttributes: headerAttributes,
          attributes: attributes,
        });
      }

      this.columns = columns;
    },
    // On Reporint Language Changes
    onReportingLanguageChanges() {
      this.fieldName = "name";
      this.fieldType = "type";
      if (this.reportingLanguage === "local") {
        this.fieldName = "local_name";
        this.fieldType = "type_local_name";
      }

      // Generate Group By
      this.generateGroupBy();

      // Generate column with new language
      this.generateColumn();
    },
    // Generate Group By
    generateGroupBy() {
      /* Aggregate Defintion */
      let aggregateDefinition = [];
      for (let i = 0; i < 50; i++) {
        aggregateDefinition.push({ field: "s" + i, aggregate: "sum" });
      }
      this.aggregateDefinition = aggregateDefinition;

      this.groupDefinition = {
        field: this.fieldType,
        aggregates: aggregateDefinition,
        compare: function (a, b) {
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
    reportingLanguage() {
      this.onReportingLanguageChanges();
    },
  },
  computed: mapState({
    projects: (state) => state.projects.list,
    appType() {
      return dataStore.productType;
    },
  }),
  created() {
    this.loadData();
  },
  mounted() {
    // Generate Group By
    this.generateGroupBy();

    // Initial Grid Columns
    this.generateColumn();
  },
};
</script>

<style scoped>
.reports_list {
  width: 100%;
  background-color: #fff;
  padding: 20px 20px 5px;
}
.report_filter {
  background-color: #f8f8f9;
  padding: 0 20px 5px 20px;
  position: relative;
}
.dv_mt {
  margin-top: 24px;
}
.report_export {
  position: absolute;
  top: 15px;
}
.report_total {
  padding: 12.5px;
  text-align: right;
  text-transform: uppercase;
  font-weight: 700;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
}
.custom_expansion
  .v-expansion-panel-header
  .v-expansion-panel-header__icon
  .v-icon {
  display: none !important;
}
.v-expansion-panel {
  border-bottom: 1px solid #cccccc;
  border-radius: 0;
}
.v-expansion-panel::before {
  box-shadow: none;
}
.v-expansion-panel-header {
  padding: 15px;
}
.v-expansion-panel-content__wrap {
  padding: 0 35px 10px;
}
@media (max-width: 576px) {
  .dv_mt,
  .dv_mt8 {
    margin-top: 0;
  }
  .reports_list {
    margin-top: 0;
  }
}
</style>
