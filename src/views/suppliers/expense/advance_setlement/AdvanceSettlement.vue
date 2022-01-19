<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="9" cols="8" class="py-0">
            <h2 class="mb-1 font_20">
              {{ $t("cash_advances_their_settlement") }}
            </h2>
            <p class="mb-0">{{ $t("cash_advances_their_settlement_desc") }}</p>
          </v-col>
          <v-col sm="3" cols="12" class="pt-1 mr10 mb-0 paddingT">
						<v-btn
							class="float-right capitalize white--text"
							to="advance_settlement"
							color="primary"
						>
							{{ $t("new_advance_settlement") }}
						</v-btn>
					</v-col>
        </v-row>

        <v-row>
          <v-col sm="3 " cols="12" class="py-0">
            <app-datepicker
              :initialDate="asOfDate"
              @emitDate="asOfDate = $event"
            />
          </v-col>
          <v-col sm="2" cols="12" class="pt-1 mb-0 paddingT">
						<v-btn class="white--text" color="primary" @click="search">{{
							$t("run_report")
						}}</v-btn>
					</v-col>
        </v-row>

        <!-- loading -->
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          :myLoading="true"
        />

        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <kendo-datasource
              ref="dataSource"
              :data="cashAdvanceList"
              :group="groupDefinition"
              :aggregate="aggregateDefinition"
              :group-paging="true"
            />

            <kendo-grid
              id="gridGL"
              ref="gridGL"
              class="custom_grid"
              :data-source-ref="'dataSource'"
              :sortable="true"
              :column-menu="true"
              :reorderable="true"
              :resizable="true"
              :noRecords="true"
              :navigatable="true"
            >
              <kendo-grid-column
                :field="'advance_date'"
                :title="$t('date')"
                :template="dateTemplate"
                :groupFooterTemplate="'Total:'"
                :width="100"
              />
              <kendo-grid-column
                :field="'requested_by.name'"
                :title="$t('employee')"
                :width="150"
                :hidden="true"
                groupHeaderTemplate="<span class=`text-bold text-black`>#=value#</span>"
              />
              <kendo-grid-column
                :field="'number'"
                :title="$t('advance_number')"
                :template="numberTemplate"
                :width="150"
              />
              <kendo-grid-column
                :field="'amount'"
                :title="$t('amount')"
                :format="'{0:n}'"
                :width="100"
                :groupFooterTemplate="
                  '<div style=text-align:right>#= kendo.toString(sum, `n`) #</div>'
                "
                :attributes="{
                  style: 'text-align: right;',
                }"
              />
              <kendo-grid-column
                :field="'advance_settlement'"
                :title="$t('advance_settlement')"
                :template="settlementTemplate"
                :width="200"
              />
              <kendo-grid-column
                :field="'actual_expense_amount'"
                :title="$t('actual_expense')"
                :format="'{0:n}'"
                :groupFooterTemplate="
                  '<div style=text-align:right>#= kendo.toString(sum, `n`) #</div>'
                "
                :width="100"
                :attributes="{
                  style: 'text-align: right',
                }"
              />
            </kendo-grid>

            <pager 
              :skip="responseData.skip" 
              :take="responseData.item_per_page" 
              :total="responseData.total_item_count" 
              :button-count="responseData.buttonCount" 
              :info="responseData.info" 
              :type="responseData.type" 
              :page-sizes="responseData.pageSizes ? responseData.pageSizeDefs : undefined"
              :previous-next="responseData.previousNext" 
              @pagechange="handlePageChange" >
            </pager>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import { i18n } from '@/i18n'
import kendo from "@progress/kendo-ui";
import { Pager } from '@progress/kendo-vue-data-tools';
import Helper from "@/helper.js";
import { CashAdvanceModel } from "@/scripts/model/AppModels";
import ResponseDataModel from "@/scripts/model/ResponseData";

const { cashAdvanceHandler } = require("@/scripts/AppHandlers");
const { EntityType } = require("@/scripts/default_setup/Collections");

export default {
  name: "CashAdvanceAndSettlement",
  components: {
    "pager": Pager,
    LoadingMe: () => import("@/components/Loading"),
    "app-datepicker": () =>
      import("@/components/custom_templates/DatePickerComponent"),
  },
  data: () => ({
    responseData : new ResponseDataModel(),
    asOfDate: new Date().toISOString().substr(0, 10),
    cashAdvance: {
      advance_date: "",
      requested_by: {}, //Employee
      number: "",
      amount: 0,
      is_settled: 0,
      advance_settlement: {
        settlement_date: "",
        number: "",
        amount: 0,
      },
      actual_expense_amount: 0,
    },
    cashAdvances: [],
    cashAdvanceList: [],
    cashBalance: 0,

    // Kendo dataSource
    groupDefinition: {
      field: "requested_by.name",
      aggregates: [
        { field: "amount", aggregate: "sum" },
        { field: "actual_expense_amount", aggregate: "sum" },
      ],
      compare: function(a, b) {
        if (a.items[0].requested_by.number === b.items[0].requested_by.number) {
          return 0;
        } else if (
          a.items[0].requested_by.number > b.items[0].requested_by.number
        ) {
          return 1;
        } else {
          return -1;
        }
      },
    },
    aggregateDefinition: [
      { field: "amount", aggregate: "sum" },
      { field: "actual_expense_amount", aggregate: "sum" },
    ],
    // LoadingMe
    showLoading: false,
  }),
  methods: {
    handlePageChange: function(event){
			let pageNumber = (event.skip + event.take) / event.take;
			
			this.responseData.page_number = pageNumber;
			this.responseData.skip = event.skip;
			this.responseData.take = event.take;
			this.responseData.item_per_page = event.take;

			this.search();
		},
    // Search
    search() {
      let asOfDate = new Date(this.asOfDate);

      // Empty dataSource
      let ds = this.$refs.dataSource.kendoWidget();
      ds.data([]);

      this.showLoading = true;
      cashAdvanceHandler
        .getAll({
          params: {
            as_of_date: kendo.toString(asOfDate, "yyyy-MM-dd") + "T23:59:59.999Z",
            page_number: this.responseData.page_number,
						item_per_page: this.responseData.item_per_page,
          },
        })
        .then((res) => {
          this.responseData = new ResponseDataModel(res.data);
          this.cashAdvanceList = this.responseData.data.filter(i=>i.is_settled === 1);
          // this.bindData();
        })
        .finally(() => {
          this.showLoading = false;
        });
    },
    // Bind Data
    bindData() {
      let entries = [];

      this.cashAdvances.forEach((element) => {
        let cashAdvance = new CashAdvanceModel(element);

        // Amount
        cashAdvance.amount = 0;
        element.details.forEach((value) => {
          if (value.amount > 0) {
            cashAdvance.amount += value.amount;
          }
        });

        // Add Entry
        entries.push(cashAdvance);
      });

      // Add to list
      this.cashAdvanceList = entries;
    },
    // Templates
    numberTemplate: (dataItem) => {
      return Helper.linkTemplate(
        dataItem.number,
        `${EntityType.CASH_ADVANCE}/view/${dataItem.uuid}`
      );
    },
    dateTemplate: (dataItem) => {
      return Helper.dateFormat(dataItem.advance_date);
    },
    settlementTemplate: (dataItem) => {
      let advstmnt = Object.assign({},dataItem.advance_settlement);

      if (advstmnt !== null) {
        return Helper.linkTemplate(`${Helper.dateFormat(advstmnt.settlement_date)} ${advstmnt.number}`, `${EntityType.ADVANCE_SETTLEMENT}/view/${advstmnt.uuid}`);
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.k-chart {
  height: 180px;
}

.theme--light.v-data-table {
  background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
  border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}
@media (max-width: 576px) {
  .paddingT {
    padding-top: 0 !important;
  }
}
</style>
