
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
    "app-searchdate": () => import("@/components/custom_templates/SearchDate"),
    "app-reporting-language": () =>
      import("@/components/kendo_templates/ReportingLanguageDropDownList"),
    "app-segment-list-item-group": () =>
      import("@/components/dropdownlist/SegmentListItemGroup"),
  },
  data: () => ({
    // Obj
    startDate: "",
    endDate: "",
    statementPLList: [],
    selectedSegmentIds: [],
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
      await this.$store.dispatch("segments/getList");
    },
    /* KENDO */
    /* On grid changes => link to GL */
    onGridChanges() {
      let grid = kendo.jQuery("#gridSPL").data("kendoGrid");
      let selectedSegmentIds = grid.dataItem(grid.select());

      this.$router.push({
        path: "general_ledger",
        query: {
          account_id: selectedSegmentIds.accountUUID,
          start_date: this.startDate,
          end_date: this.endDate,
        },
      });
    },
    // Search journals
    search() {
      if (this.selectedSegmentIds.length > 0) {
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
          .getBySegments(sdate, edate, this.selectedSegmentIds)
          .then((response) => {
            this.statements = response;
            this.bindData();
          })
          .finally(() => {
            this.showLoading = false;
          });
      } else {
        Helper.alertErrorMsg("Please select segment");
      }
    },
    /* Bind Data */
    async bindData() {
      let entries = {};

      for (let i = 0; i < this.selectedSegmentIds.length; i++) {
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
            for (let j = 0; j < this.selectedSegmentIds.length; j++) {
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
      for (let i = 0; i < this.selectedSegmentIds.length; i++) {
        /* Segment */
        let segment = this.segments.find(
          (item) => item.id === this.selectedSegmentIds[i]
        );

        /* Column Segment */
        columns.push({
          field: "s" + i,
          title: segment.name,
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
    segments: (state) => state.segments.list,
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

