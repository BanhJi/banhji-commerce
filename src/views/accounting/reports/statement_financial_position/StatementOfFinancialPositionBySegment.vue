<template>
  <v-row>
		<v-col sm="12" cols="12" class="grayBg px-6" >
			<v-card color="white" class="pa-3 no_border "  elevation="0">
        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <v-row>
              <v-col sm="3" cols="12" class="py-0">
                <label class="label">{{ $t("disable_column_by") }}</label>
                <v-select
                  class="mt-1"
                  v-model="columnBy"
                  :items="columnsBy"
                  item-text="text"
                  placeholder="Total"
                  item-value="value"
                  clearable
                  outlined
                />
              </v-col>
              <v-col sm="3" cols="12" class="py-0">
                <div v-if="columnBy === '1'">
                  <label class="label pt-5">{{ $t("as_of") }}</label>
                  <app-datepicker
                    :initialDate="asOfDate"
                    @emitDate="asOfDate = $event"
                  />
                </div>
                <div v-else>
                  <label class="label">{{ $t("fiscaldate") }}</label>
                  <v-select
                    class="mt-1"
                    placeholder="Select Ficaldate"
                    :items="fiscalDates"
                    item-text="start_date"
                    item-value="uuid"
                    v-model="fiscalDate"
                    return-object
                    outlined
                  >
                    <template slot="selection" slot-scope="{ item }">
                      {{ Helper.formatFiscalDate(item.start_date) }} -
                      {{ Helper.formatFiscalDate(item.end_date) }}
                    </template>
                    <template slot="item" slot-scope="{ item }">
                      {{ Helper.formatFiscalDate(item.start_date) }} -
                      {{ Helper.formatFiscalDate(item.end_date) }}
                    </template>
                  </v-select>
                </div>
              </v-col>
              <v-col sm="3" cols="12" class="py-0">
                <label class="label">{{ $t("segment") }}</label>
                <app-segment-dropdownlist
                  :initSegment="segment"
                  @emitSegment="segment = $event"
                />
              </v-col>
              <v-col sm="2" cols="12" class="pt-7">
                <v-btn class="white--text" color="primary" @click="search">
                  <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                </v-btn>
              </v-col>
              <v-col sm="1" cols="12" class="py-0">
                <app-reporting-language
                  :initLanguage="reportingLanguage"
                  @emitLanguage="reportingLanguage = $event"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- Card -->
        <v-row class="mt-1">
          <v-col sm="6" cols="12" class="py-0">
            <v-card
              outlined
              dense
              class="pa-3 rounded-4 no_border white--text"
              color="third"
              height="60px"
            >
              <h3 class="text-left flex-1 text-uppercase font_12 py-0">
                {{ $t("asset") }}
              </h3>
              <h3 class="text-right flex-1 font_20">
                {{ Number(totalAsset).toLocaleString() }}
              </h3>
            </v-card>
          </v-col>
          <v-col sm="6" cols="12" class="py-0">
            <v-card
              outlined
              dense
              class="pa-3 rounded-4 no_border white--text"
              color="third"
              height="60px"
            >
              <h3 class="text-left flex-1 font_12 text-uppercase">
                {{ $t("liabilities_and_equity") }}
              </h3>
              <h3 class="text-right flex-1 font_20">
                {{ Number(totalLiabilityAndEquity).toLocaleString() }}
              </h3>
            </v-card>
          </v-col>
        </v-row>
        <!-- Table -->
        <v-row>
          <v-col sm="12" cols="12" class="pt-0">
            <kendo-datasource
              ref="dataSource"
              :data="statementFPList"
              :schema="schemaDefinition"
              :group="groupDefinition"
              :aggregate="aggregateDefinition"
            />

            <kendo-grid
              id="gridSFP"
              class="custom_grid"
              :data-source-ref="'dataSource'"
              :change="onGridChanges"
              :selectable="true"
              :persistSelection="true"
              :sortable="true"
              :column-menu="true"
              :reorderable="true"
              :resizable="true"
              :noRecords="true"
              :toolbar="['excel']"
              :excel-file-name="'balanceSheetReport.xlsx'"
              :excel-filterable="true"
              :columns="columns"
            />
          </v-col>
        </v-row>

        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          :myLoading="true"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import { i18n } from "@/i18n";
import Helper from "@/helper.js";
import { dataStore } from "@/observable/store";

/* Store */
import store from "@/store";
const institute = store.state.institute.institute;

const { balanceSheetHandler } = require("@/scripts/AppHandlers");
const { columnsBy } = require("@/scripts/default_setup/DateSearch.js");

export default {
  components: {
    LoadingMe: () => import("@/components/Loading"),
    "app-datepicker": () =>
      import("@/components/custom_templates/DatePickerComponent"),
    "app-reporting-language": () =>
      import("@/components/kendo_templates/ReportingLanguageDropDownList"),
    "app-segment-dropdownlist": () =>
      import("@/components/dropdownlist/Segment"),
  },
  data: () => ({
    asOfDate: new Date().toISOString().substr(0, 10),
    segment: null,
    statementFPList: [],
    totalAsset: 0,
    totalLiabilityAndEquity: 0,
    columnBy: "1", //Default Total
    columnsBy: columnsBy,
    fiscalDate: institute.fiscalDate[0],
    fiscalDates: institute.fiscalDate,
    fiscalMonths: Helper.generateFiscalMonths(
      institute.fiscalDate[0].start_date,
      institute.fiscalDate[0].end_date,
      "12"
    ),
    Helper: Helper,
    // Reporting Language
    reportingLanguage: "english",
    fieldName: "name",
    fieldType: "type",
    // LoadingMe
    showLoading: false,
    /* KENDO */
    columns: [],
    groupDefinition: [],
    aggregateDefinition: [
      { field: "balance", aggregate: "sum" },
      { field: "zero", aggregate: "sum" },
      { field: "one", aggregate: "sum" },
      { field: "two", aggregate: "sum" },
      { field: "three", aggregate: "sum" },
      { field: "four", aggregate: "sum" },
      { field: "five", aggregate: "sum" },
      { field: "six", aggregate: "sum" },
      { field: "seven", aggregate: "sum" },
      { field: "eight", aggregate: "sum" },
      { field: "nine", aggregate: "sum" },
      { field: "ten", aggregate: "sum" },
      { field: "eleven", aggregate: "sum" },
    ],
    schemaDefinition: {
      model: { id: "accountUUID" },
    },
  }),
  methods: {
    /* KENDO */
    /* On grid changes => link to GL */
    onGridChanges() {
      let grid = kendo.jQuery("#gridSFP").data("kendoGrid");
      let selectedItem = grid.dataItem(grid.select());

      let asOf = new Date(this.asOfDate);

      /* if day = 1 need to minus 1 month */
      if (asOf.getDate() === 1) {
        asOf.setMonth(asOf.getMonth() - 1);
      }
      asOf.setDate(1);

      this.$router.push({
        path: "general_ledger",
        query: {
          account_id: selectedItem.accountUUID,
          start_date: kendo.toString(asOf, "yyyy-MM-dd"),
          end_date: this.asOfDate,
        },
      });
    },
    // Search
    search() {
      // Empty dataSource
      let ds = this.$refs.dataSource.kendoWidget();
      ds.data([]);

      if (this.segment !== null) {
        let asOfDate = new Date(this.asOfDate);

        // Generate Fiscal Months
        if (this.columnBy !== "1") {
          let sdate = this.fiscalDate.start_date,
            edate = this.fiscalDate.end_date;

          asOfDate = new Date(edate);

          this.fiscalMonths = Helper.generateFiscalMonths(
            sdate,
            edate,
            this.columnBy
          );
        }

        // Query
        this.showLoading = true;
        balanceSheetHandler
          .getBalanceSheet({
            params: {
              group_by: this.columnBy,
              as_of_date:
                kendo.toString(asOfDate, "yyyy-MM-dd") + "T23:59:59.999Z",
              segment_uuid: this.segment.id,
            },
          })
          .then((res) => {
            if (res) {
              let entries = [],
                totalAsset = 0,
                totalLiabilityAndEquity = 0;
              res.data.forEach((value) => {
                let entry = value;

                // Order
                if (entry.groupNature.toLowerCase() === "equity") {
                  // Equity
                  entry.order = entry.account_type_number * 100;
                } else {
                  entry.order = entry.account_type_number;
                }

                // Sum Asset, Liabilities and Equtity
                if (entry.groupNature.toLowerCase() === "asset") {
                  // Asset
                  totalAsset += entry.balance;
                } else {
                  // Liability and Equity
                  // Covert Cr side to normal
                  entry.balance = entry.balance * -1;
                  totalLiabilityAndEquity += entry.balance;
                }

                // Group Nature local name
                entry.group_nature_local_name = this.localTranslation(
                  entry.groupNature
                );

                // Statement Group local name
                entry.statement_group_local_name = this.localTranslation(
                  entry.statementGroup
                );

                entries.push(entry);
              });

              this.totalAsset = totalAsset;
              this.totalLiabilityAndEquity = totalLiabilityAndEquity;
              this.statementFPList = entries;
              this.generateColumn();
            }
          })
          .finally(() => {
            this.showLoading = false;
          });
      } else {
        Helper.alertErrorMsg("Please select segment");
      }
    },
    // Transalate to local language
    localTranslation(lang) {
      let word = lang;

      if (lang.toLowerCase() === "asset") {
        word = "ទ្រព្យសកម្ម";
      } else if (lang.toLowerCase() === "current asset") {
        word = "ទ្រព្យសកម្មរយៈពេលខ្លី";
      } else if (lang.toLowerCase() === "non-current asset") {
        word = "ទ្រព្យសកម្មរយៈពេលវែង";
      } else if (lang.toLowerCase() === "liabilities") {
        word = "បំណុល";
      } else if (lang.toLowerCase() === "current liabilities") {
        word = "បំណុលរយៈពេលខ្លី";
      } else if (lang.toLowerCase() === "non-current liabilities") {
        word = "បំណុលរយៈពេលវែង";
      } else if (lang.toLowerCase() === "equity") {
        word = "ដើមទុន";
      } else if (lang.toLowerCase() === "retained earning") {
        word = "ប្រាក់ចំណេញរក្សាទុក";
      }

      return word;
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
    statementGroupHeaderTmpl(dataItem) {
      let name = dataItem.value;

      if (this.reportingLanguage === "local") {
        name = this.localTranslation(name);
      }

      return name;
    },
    natureGroupHeaderTmpl(dataItem) {
      let name = dataItem.value;

      if (this.reportingLanguage === "local") {
        name = this.localTranslation(name);
      }

      return name;
    },
    generateColumn() {
      let wordNums = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "eleven",
      ];
      let defaultColumns = [
        {
          field: this.fieldName,
          title: i18n.t("account"),
          locked: true,
          width: 300,
          template: this.accountTmpl,
        },
        {
          field: "type",
          title: "TYPE",
          hidden: true,
          width: 300,
          groupHeaderTemplate: this.typeGroupHeaderTmpl,
        },
        {
          field: "statementGroup",
          title: "STATEMENT GROUP",
          hidden: true,
          width: 300,
          groupHeaderTemplate: this.statementGroupHeaderTmpl,
        },
        {
          field: "groupNature",
          title: "NATURE",
          hidden: true,
          width: 300,
          groupHeaderTemplate: this.natureGroupHeaderTmpl,
        },
      ];

      switch (this.columnBy) {
        case "12": // MONTH
          for (let i = 0; i < 12; i++) {
            defaultColumns.push({
              field: wordNums[i],
              title: this.fiscalMonths[i],
              format: "{0:#,##0.##;(#,##0.##)}",
              width: 200,
              aggregates: "['sum']",
              groupHeaderColumnTemplate:
                "<div style=text-align:right>#=kendo.toString(sum, 'n')#</div>",
              headerAttributes: {
                class: "table-header-cell",
                style: "text-align: right;padding-right: 35px; font-size: 14px",
              },
              attributes: {
                class: "table-cell",
                style: "text-align: right; font-size: 14px",
              },
            });
          }

          this.columns = defaultColumns;

          break;

        case "4": // QUARTER
          for (let i = 0; i < 4; i++) {
            defaultColumns.push({
              field: wordNums[i],
              title: this.fiscalMonths[i],
              format: "{0:#,##0.##;(#,##0.##)}",
              width: 200,
              aggregates: "['sum']",
              groupHeaderColumnTemplate:
                "<div style=text-align:right>#=kendo.toString(sum, 'n')#</div>",
              headerAttributes: {
                class: "table-header-cell",
                style: "text-align: right; font-size: 14px",
              },
              attributes: {
                class: "table-cell",
                style: "text-align: right; font-size: 14px",
              },
            });
          }

          this.columns = defaultColumns;

          break;

        case "2": // SEMI-ANNUAL
          // Expand Column [0] width
          defaultColumns[0].width = 400;

          for (let i = 0; i < 2; i++) {
            defaultColumns.push({
              field: wordNums[i],
              title: this.fiscalMonths[i],
              format: "{0:#,##0.##;(#,##0.##)}",
              width: 300,
              aggregates: "['sum']",
              groupHeaderColumnTemplate:
                "<div style=text-align:right>#=kendo.toString(sum, 'n')#</div>",
              headerAttributes: {
                class: "table-header-cell",
                style: "text-align: right; font-size: 14px",
              },
              attributes: {
                class: "table-cell",
                style: "text-align: right; font-size: 14px",
              },
            });
          }

          this.columns = defaultColumns;

          break;

        default:
          // TOTAL
          // Expand Column [0] width
          defaultColumns[0].width = 600;

          defaultColumns.push({
            field: "balance",
            title: "TOTAL",
            format: "{0:#,##0.##;(#,##0.##)}",
            width: 250,
            aggregates: "['sum']",
            groupHeaderColumnTemplate:
              "<div style=text-align:right>#=kendo.toString(sum, 'n')#</div>",
            headerAttributes: {
              class: "table-header-cell",
              style: "text-align: right; font-size: 14px",
            },
            attributes: {
              class: "table-cell",
              style: "text-align: right; font-size: 14px",
            },
          });

          this.columns = defaultColumns;

          break;
      }
    },
    // On Reporint Language Changes
    onReportingLanguageChanges() {
      this.fieldName = "name";
      this.fieldType = "type";
      if (this.reportingLanguage === "local") {
        this.fieldName = "local_name";
        this.fieldType = "type_local_name";
      }

      // Generate column with new language
      this.generateColumn();
    },
    // Generate Group By
    generateGroupBy() {
      this.groupDefinition = [
        {
          field: "groupNature",
          aggregates: this.aggregateDefinition,
          compare: function (a, b) {
            if (a.items[0].order === b.items[0].order) {
              return 0;
            } else if (a.items[0].order > b.items[0].order) {
              return 1;
            } else {
              return -1;
            }
          },
        },
        { field: "statementGroup", aggregates: this.aggregateDefinition },
        {
          field: "type",
          aggregates: this.aggregateDefinition,
          compare: function (a, b) {
            if (
              a.items[0].account_type_number === b.items[0].account_type_number
            ) {
              return 0;
            } else if (
              a.items[0].account_type_number > b.items[0].account_type_number
            ) {
              return 1;
            } else {
              return -1;
            }
          },
        },
      ];
    },
  },
  watch: {
    reportingLanguage() {
      this.onReportingLanguageChanges();
    },
  },
  computed: {
    appType() {
      return dataStore.productType;
    },
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
}
.dv_mt {
  margin-top: 20px;
}
.dv_mt8 {
  margin-top: 30px;
}
.report_block .v-card.third {
  border: none;
  box-shadow: none;
  color: #fff;
  text-transform: uppercase;
}
.report_block .v-card.third p.text {
  text-align: left;
  font-size: 16px;
}
.report_block .v-card.third p.number {
  text-align: center;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 0;
}
.report_block .v-card.bg_gray {
  background-color: #f8f8f9;
  border: none;
  box-shadow: none;
  color: #000;
  float: left;
  width: 100%;
}
.report_block .v-card.bg_gray p span.text {
  width: 25%;
}
.report_block .v-card.bg_gray p span.number {
  width: 70%;
  font-size: 19px;
  font-weight: 700;
  padding: 7px 0 0 0;
  text-align: right;
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
