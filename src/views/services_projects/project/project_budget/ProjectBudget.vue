<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card
            outlined
            dense
            class="pa-4 no_border rounded-sm"
            color="white"
          >
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card elevation="0" class="pt-2 mb-3">
                <h2 class="mb-0">{{ $t("project_budget") }}</h2>
                <v-icon
                  onclick="window.history.go(-1); return false;"
                  style="cursor: pointer; color: #333; font-size: 40px"
                  class="float-right"
                  >close
                </v-icon>
              </v-card>

              <!-- Search -->
              <v-card
                outlined
                class="px-4 no_border pt-4 pb-3"
                color="grayBg"
                min-height="98px"
              >
                <v-row>
                  <v-col md="6" sm="4" cols="12" class="py-0">
                    <label class="label">{{ $t("name") }}</label>
                    <v-text-field
                      class="mt-1"
                      v-model="budget.name"
                      :placeholder="$t('name')"
                      outlined
                      required
                    />
                  </v-col>
                  <v-col md="6" sm="4" cols="12" class="py-0">
                    <app-reporting-language
                      :initLanguage="reportingLanguage"
                      @emitLanguage="reportingLanguage = $event"
                      @onChanged="onReportingLanguageChanges"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="3" sm="4" cols="12" class="py-0">
                    <label class="label">{{ $t("fiscal_year") }}</label>
                    <app-fiscal-date-dropdownlist
                      :initFiscalDate="budget.fiscal_year"
                      @emitFiscalDate="budget.fiscal_year = $event"
                    />
                  </v-col>
                  <v-col md="3" sm="4" cols="12" class="py-0">
                    <label class="label">{{ $t("project") }}</label>
                    <app-project-dropdownlist
                      :initProject="project"
                      @emitProject="project = $event"
                    />
                  </v-col>

                  <v-col md="3" sm="4" cols="12" class="pl-9 py-6">
                    <v-btn
                      class="text-capitalize white--text"
                      color="primary"
                      @click="onClickGetAccount"
                    >
                      {{ $t("load_account") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>

              <!-- Dialog -->
              <div class="text-center">
                <v-dialog v-model="dialog" width="500">
                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      {{ selectedRow.account.number }} -
                      {{ selectedRow.account.name }}
                    </v-card-title>

                    <v-card-text>
                      <v-text-field
                        class="mt-7"
                        type="number"
                        v-model="crossAmount"
                        outlined
                      />
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-btn
                        color="secondary"
                        text
                        @click="dialog = false"
                        outlined
                      >
                        Cancel
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        text
                        @click="applyAcrossAmount"
                        outlined
                      >
                        Enter
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>

              <!-- Tree List -->
              <v-card
                outlined
                class="rounded-0 mt-4"
                color="white"
                min-height="98px"
              >
                <v-row>
                  <v-col sm="12" cols="12" class="">
                    <!-- Tree List -->
                    <div id="budgetLineTreeList" />
                  </v-col>
                </v-row>

                <LoadingMe
                  type="loading"
                  :isLoading="showLoading"
                  :myLoading="true"
                  :fullPage="true"
                />

                <v-card-actions>
                  <v-alert type="warning" v-model="alert" dismissible>
                    <span v-html="errorMessage" />
                  </v-alert>

                  <v-btn
                    color="black"
                    class="text-capitalize white--text"
                    @click="cancel"
                    >{{ $t("cancel") }}
                  </v-btn>

                  <v-spacer />

                  <v-btn
                    class="text-capitalize white--text"
                    color="primary"
                    @click="onSaveOptionClick(SaveOption.SAVECLOSE)"
                  >
                    {{ $t("save_close") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import BudgetModel from "@/scripts/model/Budget.js";
import BudgetLineModel from "@/scripts/model/BudgetLine.js";
import BudgetLineExtendedModel from "@/scripts/model/BudgetLineExtended.js";
import AccountModel from "@/scripts/model/accounting/Account.js";
import ProjectModel from "@/scripts/model/Project.js";

/* Editor */
import NumberInputBoxEditor from "@/scripts/kendo_editor/NumberInputBox";
import AccountSecondaryEditor from "@/scripts/kendo_editor/AccountSecondary";

/* Vuex */
import { mapGetters } from "vuex";

const budgetHandler = require("@/scripts/handler/workingcapital/budgetHandler.js");
const { SaveOption } = require("@/scripts/default_setup/Collections");

export default {
  name: "ProjectBudget",
  props: {
    initBudget: {
      type: BudgetModel,
    },
  },
  components: {
    LoadingMe: () => import("@/components/Loading"),
    "app-project-dropdownlist": () =>
      import("@/components/dropdownlist/Project"),
    "app-fiscal-date-dropdownlist": () =>
      import("@/components/kendo_templates/FiscalDateDropDownList"),
    "app-reporting-language": () =>
      import("@/components/kendo_templates/ReportingLanguageDropDownList"),
  },
  data: () => ({
    // Obj
    budget: new BudgetModel(),
    budgetLines: [],
    project: new ProjectModel(),
    user: Helper.getUser(),
    // Form validation
    valid: true,
    isEdit: false,
    alert: false,
    errorMessage: "",
    saveMode: "",
    SaveOption: SaveOption,
    // Reporting Language
    reportingLanguage: "english",
    fieldName: "account.name",
    // LoadingMe
    showLoading: false,
    /* Dialog */
    dialog: false,
    selectedRow: new BudgetLineExtendedModel(),
    crossAmount: 0,
    /* Kendo */
    columns: [],
    budgetLineDS: new kendo.data.TreeListDataSource({
      sort: [
        { field: "account.type_code", dir: "asc" },
        { field: "number", dir: "asc" },
      ],
      schema: {
        model: {
          id: "uuid",
          expanded: true,
        },
      },
    }),
  }),
  methods: {
    /* Initialize */
		async initialize () {
      this.showLoading = true;
            
      // Call List
			await Promise.allSettled([
				this.$store.dispatch('accounts/getList'),
				this.$store.dispatch('projects/getList'),
			])

      /* Initial Data */
      this.initialData();
			
			this.showLoading = false;
    },
    // Initial Data
    initialData() {
      if (this.initBudget) {
        // Edit Mode
        this.isEdit = true;
        this.budget = this.initBudget;
        this.bindData();
      } else {
        // Brand New
        this.isEdit = false;
        this.setDefaultData();
      }
    },
    /* Initial Tree List */
    initialTreeList() {
      kendo.jQuery("#budgetLineTreeList").kendoTreeList({
        dataSource: new kendo.data.TreeListDataSource(),
        dataBound: this.onDataBound,
        editable: "incell",
        resizable: true,
        columnMenu: true,
        columns: this.columns,
      });
    },
    // Set default data
    setDefaultData() {
      this.budget = new BudgetModel();
    },
    // Bind data for edit mode
    bindData() {
      /* Project */
      this.project = this.getProjectById(this.budget.project_uuid);

      this.setDefaultBudgetLine();
    },
    /* Get Account */
    onClickGetAccount() {
      let result = true;

      /* Fiscal Date */
      if (this.budget.fiscal_year.uuid === "") {
        this.$snotify.warning(i18n.t("please_select_fiscal_year"));
        result = false;
      }

      if (result) {
        this.confirmReload();
      }
    },
    /* Confirm Reload Accounts */
    confirmReload() {
      if (this.budgetLineDS.total() === 0) {
        this.setDefaultBudgetLine();
      } else {
        this.$swal({
          title: i18n.t("reload_data_?"),
          text: i18n.t("this_will_reset_all_amount_to_zero"),
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: i18n.t("cancel"),
          confirmButtonColor: "#4d4848",
          cancelButtonColor: "#ED1A3A",
          confirmButtonText: i18n.t("reload"),
        }).then((result) => {
          if (result.value) {
            this.setDefaultBudgetLine();
          }
        });
      }
    },
    // Set Budget Lines
    setDefaultBudgetLine (){
        this.showLoading = true;
        
        let lines = [], accounts = this.getTreeListByTypeCodes([32,33,34,35,36,37,38,39,40,41,42,43]);
        if(accounts.length > 0){
            accounts.forEach(value => {
                let line = new BudgetLineExtendedModel({
                    uuid : value.uuid,
                    account_uuid : value.uuid,
                    parentId : value.parentId,
                    account : value,
                });

                /* Child Level */
                if(value.parentId !== null){
                    // 12 months with amount
                    let monthlyAmount = [];
                    for (let i = 0; i < 12; i++) {
                        // Set Month Of
                        let sdate = new Date(this.budget.fiscal_year.start_date);
                        sdate.setMonth(sdate.getMonth() + i);

                        monthlyAmount.push({
                            month_of : sdate.toISOString().substr(0, 7),
                            amount : 0,
                        });
                    }
                    line.monthly_amount = monthlyAmount;

                    /* Matching Account */
                    if(this.isEdit){
                        let bline = this.budget.lines.find((item) => item.account_uuid === value.uuid);
                        if(bline){
                            /* Reverse Nature */
                            let nature = 1; /* Default Naure is Dr = 1 */
                            if(value.account_type.nature.toLowerCase() === "cr"){
                                nature = -1;
                            }

                            line.secondary_account = this.getAccountById(bline.secondary_account_uuid);
                            line.note = bline.note;
                            line.amount = bline.amount * nature;
                            line.monthly_amount = bline.monthly_amount;
                            line.monthly_amount.forEach(ma => {
                                ma.amount = ma.amount * nature;
                            });
                        }
                    }
                }

                /* Add Line */
                lines.push(line);
            });

            /* Bind Budget Line */
            this.budgetLineDS.data(lines);

            /* Set New Datasource */
            let treeList = kendo.jQuery("#budgetLineTreeList").data("kendoTreeList");
            treeList.setDataSource(this.budgetLineDS);
        }

        this.showLoading = false;
    },
    // Row Template
    nameTmpl(dataItem) {
      /* Name in language */
      let name = dataItem.account.name;
      if (this.reportingLanguage === "local") {
        name = dataItem.account.local_name;
      }

      /* Define result */
      let result = `<span>${dataItem.account.number} - ${name}</span>`;

      // /* Top Level */
      if (dataItem.parentId === null) {
        result = `<span style='font-weight: bolder;'>${name}</span>`;
      }

      /* Parent Level */
      if (dataItem.hasChildren && dataItem.account.number.length > 3) {
        result = `<span style='font-weight: bolder;'>${dataItem.account.number} - ${name}</span>`;
      }

      return result;
    },
    secondaryAccountTmpl(dataItem) {
      let result = "";
      if (dataItem.secondary_account.uuid !== "") {
        result = `<span>${dataItem.secondary_account.number} - ${dataItem.secondary_account.name}</span>`;
      }

      return result;
    },
    copyAcross(e) {
      e.preventDefault();

      let treeList = kendo.jQuery("#budgetLineTreeList").data("kendoTreeList");
      this.selectedRow = treeList.dataItem(
        kendo.jQuery(e.target).closest("tr")
      );

      this.dialog = true;
    },
    applyAcrossAmount() {
      this.dialog = false;

      this.selectedRow.monthly_amount.forEach((value) => {
        value.amount = kendo.parseFloat(this.crossAmount);
      });
      this.selectedRow.amount = kendo.parseFloat(this.crossAmount) * 12;

      /* Refresh */
      let treeList = kendo.jQuery("#budgetLineTreeList").data("kendoTreeList");
      treeList.refresh();

      this.crossAmount = 0;
    },
    generateColumn() {
      let headerAttributes = {
          class: "table-header-cell",
          style:
            "font-weight: bold;text-align: center;padding-right: 35px; font-size: 14px",
        },
        attributes = {
          class: "table-cell",
          style: "text-align: right; font-size: 14px",
        };

      let columns = [
        {
          field: this.fieldName,
          title: i18n.t("account"),
          template: this.nameTmpl,
          editable: () => {
            return false;
          },
          width: 300,
          headerAttributes: headerAttributes,
        },
        {
          field: "secondary_account",
          title: i18n.t("secondary_account"),
          template: this.secondaryAccountTmpl,
          editor: AccountSecondaryEditor,
          hidden: !this.$store.state.accounting.secondaryAccount,
          editable: (dataItem) => {
            return !dataItem.hasChildren;
          },
          width: 300,
        },
        {
          field: "note",
          title: i18n.t("note"),
          width: 200,
        },
        {
          title: i18n.t("action"),
          command: [
            {
              name: "copycross",
              text: "copy cross",
              click: this.copyAcross,
            },
          ],
          width: 150,
        },
      ];

      /* 12 Months */
      for (let i = 0; i < 12; i++) {
        columns.push({
          field: `monthly_amount[${i}].amount`,
          format: "{0:n}",
          editor: NumberInputBoxEditor,
          width: 150,
          attributes: attributes,
        });
      }

      /* Total */
      columns.push({
        field: "amount",
        title: i18n.t("total"),
        format: "{0:n}",
        editable: () => {
          return false;
        },
        width: 150,
        attributes: attributes,
      });

      /* Set All Columns */
      this.columns = columns;
    },
    /* On databound */
    onDataBound(e) {
      /* Titles */
      let treeList = kendo.jQuery("#budgetLineTreeList").data("kendoTreeList");
      if (this.budget.fiscal_year) {
        let fiscalMonths = Helper.generateFiscalMonths(
          this.budget.fiscal_year.start_date,
          this.budget.fiscal_year.end_date,
          "12"
        );
        for (let k = 0; k < 12; k++) {
          const element = fiscalMonths[k];
          treeList.thead
            .find(`[data-field~='monthly_amount[${k}].amount']`)
            .html(element);
        }
      }

      /* Headers */
      var headers = e.sender.thead.children();
      for (var i = 0; i < headers.length; i++) {
        var th = kendo.jQuery(headers[i]);
        th.css("font-weight", "bold");
        th.css("text-align", "center");
      }

      /* Items */
      var items = e.sender.items();
      for (var j = 0; j < items.length; j++) {
        var dataItem = e.sender.dataItem(items[j]);
        var row = kendo.jQuery(items[j]);

        /* Parent in bold */
        if (dataItem.get("parentId") === null) {
          row.find("[data-command='copycross']").hide();
          row.css("font-weight", "bold");
        }
      }
    },
    // DataSource Changes
    onDataSourceChanges(e) {
      if (e.field) {
        let dataRow = e.items[0];

        if (e.field === "secondary_account") {
          if (dataRow.secondary_account !== null) {
            dataRow.set(
              "secondary_account_uuid",
              dataRow.secondary_account.uuid
            );
          } else {
            // Set default when deselect
            dataRow.set("secondary_account_uuid", "");
            dataRow.set("secondary_account", new AccountModel());
          }
        }
      }

      this.dataSourceAutoCalculate();
    },
    // Auto Calculate In DataSource
    dataSourceAutoCalculate() {
      // Sum Amount
      this.budgetLineDS.data().forEach((value) => {
        let sumAmt = 0;
        value.monthly_amount.forEach((ele) => {
          sumAmt += ele.amount;
        });
        value.set("amount", sumAmt);
      });
    },
    // Shrink Data
    shrinkData() {
      // Project
      this.budget.project_uuid = this.project.id;

      // Lines
      let lines = [];
      this.budgetLineDS.data().forEach((value) => {
        // Add account line with amount not 0
        if (value.amount !== 0) {
          /* Apply Nature */
          if (value.account.account_type.nature.toLowerCase() === "cr") {
            /* Amount */
            value.amount = value.amount * -1;

            /* Monthly Amount */
            value.monthly_amount.forEach((ele) => {
              ele.amount = ele.amount * -1;
            });
          }

          lines.push(new BudgetLineModel(value));
        }
      });
      this.budget.lines = lines;

      // User
      if (this.isEdit) {
        this.budget.modified_by = this.user;
      } else {
        this.budget.created_by = this.user;
      }
    },
    // Validating
    validateForm() {
      let result = true,
        msg = "";

      // Name
      if (this.budget.name === "") {
        msg += `<p>${i18n.t("name_is_required")}</p>`;
        result = false;
      }

      // Project
      if (this.project.id === "") {
        msg += `<p>${i18n.t("project_is_required")}</p>`;
        result = false;
      }

      // Fiscal Date
      if (this.budget.fiscal_year.id === "") {
        msg += `<p>${i18n.t("fiscal_date_is_required")}</p>`;
        result = false;
      }

      // Amount
      let hasZeroAmount = true;
      this.budgetLineDS.data().forEach((value) => {
        if (value.amount !== 0) {
          hasZeroAmount = false;

          return false;
        }
      });
      if (hasZeroAmount) {
        msg += `<p>${i18n.t("please_enter_amount")}</p>`;
        result = false;
      }

      // Show Alert
      this.errorMessage = msg;
      this.alert = false;
      if (result === false) {
        this.alert = true;
      }

      return result;
    },
    // All Saves
    async onSaveOptionClick(mode) {
      if (this.$refs.form.validate() && this.validateForm()) {
        this.saveMode = mode;
        this.save();
      }
    },
    cancel() {
      this.$swal({
        title: i18n.t("msg_title_warning"),
        text: i18n.t("msg_discard"),
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: i18n.t("cancel"),
        confirmButtonColor: "#4d4848",
        cancelButtonColor: "#ED1A3A",
        confirmButtonText: i18n.t("discard"),
      }).then((result) => {
        if (result.value) {
          this.clear();
          this.$router.go(-1);
        }
      });
    },
    clear() {
      this.isEdit = false;
      this.saveMode = "";

      this.budget = new BudgetModel();
      (this.project = new ProjectModel()),
        // Datasoure
        this.budgetLineDS.data([]);

      this.setDefaultData();
    },
    save() {
      let self = this;

      // Shrink Data
      this.shrinkData();

      // Sync Data
      this.showLoading = true;
      budgetHandler
        .save(this.budget)
        .then((response) => {
          if (response) {
            /* Update Vuex Data */
            this.$store.commit('budgets/save', response.data);

            self.responseStatus(response);
          } else {
            this.$snotify.error(i18n.t("error_something_wrong"));
          }
        })
        .catch((error) => {
          self.showLoading = false;
          this.$snotify.error(error);
        })
        .finally(() => {
          self.showLoading = false;
        });
    },
    // Response Status
    responseStatus(response) {
      if (response.status === 200) {
        /* Save Close or Delete Action */
        if (
          this.saveMode === SaveOption.SAVECLOSE ||
          this.saveMode === SaveOption.DELETE
        ) {
            this.$router.go(-1);
        }

        /* Reset Data */
        this.clear();

        /* Alert Success */
        this.$snotify.success(i18n.t("successful"));
      } else {
        /* Alert Error */
        this.$snotify.error(i18n.t("error_something_wrong"));
      }
    },
    // On Reporint Language Changes
    onReportingLanguageChanges() {
      this.fieldName = "account.name";
      if (this.reportingLanguage === "local") {
        this.fieldName = "account.local_name";
      }

      this.generateColumn();
    },
  },
  watch: {
    initBudget: "initialData",
  },
  computed: {
    ...mapGetters({
      getTreeListByTypeCodes: 'accounts/treeListByTypeCodes',
      getAccountById: 'accounts/getById',
      getProjectById: 'projects/getById',
    }),
  },
  created () {
		this.initialize();
	},
  mounted() {
    // Initial Data
    this.generateColumn();
    this.initialTreeList();

    /* Datasource bind functions */
    this.budgetLineDS.bind("change", this.onDataSourceChanges);
  },
};
</script>

<style scoped>
.function_content {
  padding: 0 25px 25px;
  border-bottom: 0;
  background-color: #fff !important;
}

@media (min-width: 1264px) {
  .container {
    max-width: 1185px;
    /* max-width: 1080px !important; */
  }
}

.grayBg {
  background-color: #f8f8f9;
}

@media (max-width: 576px) {
  .mb-6 {
    margin-bottom: 0 !important;
  }
}

.section2 {
  border: 1px solid #d6d7d8;
}

.border_grey {
  border: 1px solid #d6d7d8;
}

.attachment_table {
  width: 100%;
}

.greyDark {
  background-color: #f2f2f2;
}

.upload_btn {
  width: 54%;
  margin: auto;
  padding: 10px 6px;
  text-align: center;
  color: #ffff;
  border-radius: 22px;
  background: #92d050;
}

.my_box_min_heihgt {
  height: 295px;
}

.width_100 {
  width: 100px;
}
.v-data-table.simple_table.theme--light {
  border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}
.v-data-table.simple_table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
  border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table.simple_table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th {
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table.simple_table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table.simple_table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th:last-child,
.v-data-table.simple_table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td:last-child {
  border-right: none !important;
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.primary--text.text-left.v-btn:hover,
.theme--light.v-btn:hover::before {
  background: none !important;
}
</style>
