<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <v-card color="white" class="px-3 no_border" elevation="0">
        <v-row>
          <v-col sm="9" cols="12" class="pt-2">
            <app-searchdate
              :initStartDate="startDate"
              @emitStartDate="startDate = $event"
              :initEndDate="endDate"
              @emitEndDate="endDate = $event"
            />
          </v-col>
          <v-col sm="2" cols="12" class="pt-3 pb-0">
            <v-btn class="white--text" color="primary" @click="search">{{
              $t("run_report")
            }}</v-btn>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col sm="4" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 no_border white--text"
              color="primary"
              height="60px"
            >
              <h3 class="text-left font_13 flex-1 text-uppercase">
                {{ $t("no_of_expenses") }}
              </h3>
              <h3 class="text-right flex-1 font_20">000</h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="pt-0 px-2">
            <v-card
              outlined
              dense
              class="pa-3 no_border white--text"
              color="primary"
              height="60px"
            >
              <h3 class="text-left font_13 flex-1 text-uppercase">
                {{ $t("total_expenses") }}
              </h3>
              <h3 class="text-right flex-1 font_20">000</h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">

            <v-card
              outlined
              to="micro_expense"
              dense
              color="third"
              class="pa-3 rounded-4 no_border white--text"
              height="60px"
            >
              <h3 class="text-center flex-1 font_18 mt-3 text-uppercase">
                + {{ $t("expense") }}
              </h3>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" cols="12" class="pt-0">
            <template>
              <kendo-datasource
                ref="expenseDS"
                :data="expenseEntryList"
                :schema="schemaDefinition"
                :sort="sortDefinition"
                :group="groupDefinition"
                :aggregate="aggregateDefinition"
                :page="1"
              />
              <kendo-grid
                id="expenseGrid"
                ref="expenseGrid"
                class="grid-function"
                :filterable="true"
                :data-source-ref="'expenseDS'"
                :column-menu="true"
                :scrollable-virtual="true"
                :dataBound="dataBound"
                :toolbar="['excel']"
                :excel-file-name="'Expense Report.xlsx'"
                :excel-filterable="true"
                :excel-all-pages="true"
              >
                <kendo-grid-column
                  :field="'amount_due'"
                  :title="$t('amount')"
                  :format="'{0:n}'"
                  :group-footer-template="'<div style=text-align:left>#=kendo.toString(sum, `n`)#</div>'"
                  :width="100"
                  :headerAttributes="{
                    style: 'text-align: left; background-color: #EDF1F5',
                  }"
                  :attributes="{ style: 'text-align: left' }"
                />
                <kendo-grid-column
                  :field="'voucher_note'"
                  :title="$t('description')"
                  :width="150"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'supplier.name'"
                  :title="$t('supplier')"
                  :template="'<span>#=supplier.name#</span>'"
                  :group-header-template="'#=value#'"
                  :width="180"
                  :filterable="{ multi: true }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'is_cleared'"
                  :title="$t('status')"
                  :template="'<span>#= is_cleared === 0 ? `Open` : `Settled`#</span>'"
                  :width="80"
                  :headerAttributes="{
                    style: 'text-align: center; background-color: #EDF1F5',
                  }"
                  :attributes="{ style: 'text-align: center' }"
                />
                <kendo-grid-column
                  :field="'number'"
                  :title="$t('number')"
                  :template="numberTemplate"
                  :width="100"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'expense_date'"
                  :title="$t('date')"
                  :format="'{0:dd-MM-yyyy}'"
                  :group-footer-template="'Total:'"
                  :width="120"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />

                <!-- <kendo-grid-column
                  :field="'employee'"
                  :title="$t('employee')"
                  :template="'<span>#=employee.name#</span>'"
                  :hidden="true"
                  :width="200"
                  :filterable="{ multi: true }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
            
            
                <kendo-grid-column
                  :field="'use_for'"
                  :title="$t('use_for')"
                  :width="100"
                  :filterable="{ multi: true }"
                  :headerAttributes="{
                    style: 'text-align: left; background-color: #EDF1F5',
                  }"
                  :attributes="{ style: 'text-align: left' }"
                /> -->
              </kendo-grid>

              <pager
                :skip="responseData.skip"
                :take="responseData.item_per_page"
                :total="responseData.total_item_count"
                :button-count="responseData.buttonCount"
                :info="responseData.info"
                :type="responseData.type"
                :page-sizes="
                  responseData.pageSizes ? responseData.pageSizeDefs : undefined
                "
                :previous-next="responseData.previousNext"
                @pagechange="handlePageChange"
              >
              </pager>

              <LoadingMe
                type="loading"
                :isLoading="showLoading"
                :fullPage="false"
                :myLoading="true"
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
import { Pager } from "@progress/kendo-vue-data-tools";
import Helper from "@/helper.js";
import ExpenseModel from "@/scripts/model/Expense";
import ResponseDataModel from "@/scripts/model/ResponseData";

const expenseHandler = require("@/scripts/expenseHandler");

import JSZip from "jszip";
window.JSZip = JSZip;

export default {
  components: {
    pager: Pager,
    LoadingMe: () => import(`@/components/Loading`),
    "app-searchdate": () => import("@/components/custom_templates/SearchDate"),
  },
  data: () => ({
    responseData: new ResponseDataModel(),
    expenseEntryList: [],
    startDate: "",
    endDate: "",
    /* Kendo */
    schemaDefinition: {
      model: { id: "uuid" },
    },
    sortDefinition: { field: "expense_date", dir: "desc" },
    groupDefinition: [],
    aggregateDefinition: [{ field: "amount_due", aggregate: "sum" }],
    // LoadingMe
    showLoading: false,
  }),
  methods: {
    handlePageChange: function (event) {
      let pageNumber = (event.skip + event.take) / event.take;

      this.responseData.page_number = pageNumber;
      this.responseData.skip = event.skip;
      this.responseData.take = event.take;
      this.responseData.item_per_page = event.take;

      this.search();
    },
    /* Search */
    search() {
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

      // Clear dataSource
      let ds = this.$refs.expenseDS.kendoWidget();
      ds.data([]);

      this.showLoading = true;
      expenseHandler
        .getAll({
          params: {
            start_date: sdate,
            end_date: edate,
            page_number: this.responseData.page_number,
            item_per_page: this.responseData.item_per_page,
          },
        })
        .then((res) => {
          this.responseData = new ResponseDataModel(res.data);
          this.bindData();
        })
        .finally(() => {
          // this.showLoading = false;
        });
    },
    /* Bind Data */
    async bindData() {
      this.showLoading = true;

      let entries = [];

      this.responseData.data.forEach((element) => {
        let exp = new ExpenseModel(element);

        /* Date */
        exp.expense_date = new Date(exp.expense_date);

        let amountDue = 0;
        exp.expense_entries.forEach((value) => {
          if (value.account.uuid === exp.transaction_account.uuid) {
            amountDue = value.amount * -1;
          }
        });

        /* Set Amount Due */
        exp.amount_due = amountDue;

        // Use For
        let use_for = "";
        switch (exp.use_for_option) {
          case 0:
            use_for = "Credit";
            break;
          case 1:
            use_for = "Reimbursement";
            break;
          case 2:
            use_for = "Cash Advance";
            break;
          case 3:
            use_for = "Cash";
            break;
          default:
            use_for = "";
        }
        exp.use_for = use_for;

        entries.push(exp);
      });

      this.expenseEntryList = entries;

      this.showLoading = false;
    },
    dataBound(e) {
      let grid = e.sender;

      grid.tbody.find("tr[role='row']").each(function () {
        var model = grid.dataItem(this);

        if (model.is_cleared === 1) {
          kendo.jQuery(this).find(".editCommand").hide();
        }
      });
    },
    // Number Template
    numberTemplate: (dataItem) => {
      return Helper.linkTemplate(
        dataItem.number,
        `micro_expense_view/${dataItem.uuid}`
      );
    },
    // Use For Template
    useForTmpl: (dataItem) => {
      let txt = "";

      switch (dataItem.use_for_option) {
        case 1:
          txt = "Reimbursement";
          break;
        case 2:
          txt = "Cash Advance";
          break;
        default:
          txt = "Credit";
      }

      return txt;
    },
    goEdit(e) {
      e.preventDefault();
      let grid = this.$refs.expenseGrid.kendoWidget();
      let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));

      this.$router.push({
        name: "Expenses",
        params: { initExpense: this.getExpense(dataItem.uuid) },
      });
    },
    getExpense(id) {
      let exp = this.responseData.data.find((i) => i.uuid === id);

      return new ExpenseModel(exp);
    },
    generateGroupBy() {
      this.groupDefinition = [
        {
          field: "supplier.name",
          dir: "desc",
          aggregates: this.aggregateDefinition,
          compare: function (a, b) {
            if (a.items[0].date === b.items[0].date) {
              return 0;
            } else if (a.items[0].date > b.items[0].date) {
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
    $route(to, from) {
      if (from.name === "Expenses" || from.name === "Expenses View") {
        this.search();
      }
    },
  },
  mounted() {
    // Generate Group By
    this.generateGroupBy();
  },
};
</script>

<style scoped>
.acc_group header {
  height: 10px !important;
}

table.acc_group tr td {
  border-bottom: 1px solid #ccc;
  padding: 8px;
  vertical-align: middle;
}

table.acc_group tr td:first-child {
  font-weight: 700;
}

table.acc_group tr td:last-child {
  text-align: center;
}

.v-card__actions .v-btn.v-btn {
  padding: 0 16px;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th {
  font-family: "Niradei-Bold", serif;
  color: #000 !important;
  border-top: 1px solid #000 !important;
  border-bottom: 1px solid #000 !important;
  font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > td {
  color: #000 !important;
  padding: 5px !important;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:last-child
  td {
  border-bottom: 1px solid #000 !important;
}

.function_footer {
  padding: 15px;
  display: inline-block;
}

@media (max-width: 576px) {
}
</style>
