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
            <v-form ref="form">
              <div class="function_header pb-0">
                <h2 class="mb-0">{{ $t("advance_settlement") }}</h2>
                <v-icon
                  onclick="window.history.go(-1); return false;"
                  style="cursor: pointer; color: #333; font-size: 40px;"
                  class="float-right"
                  >close
                </v-icon>
              </div>
              <v-row>
                <v-col sm="12" cols="12">
                  <div class="function_content pb-0">
                    <v-row>
                      <v-col sm="4" cols="12" class="pb-0">
                        <label class="label">{{ $t("date") }}</label>
                        <h3 class="text-bold py-1">
                          {{
                            Helper.dateFormat(advanceSettlement.settlement_date)
                          }}
                        </h3>

                        <label class="label">{{ $t("number") }}</label>
                        <h3 class="text-bold py-1">
                          {{ advanceSettlement.number }}
                        </h3>
                      </v-col>
                      <v-col sm="4" cols="12" class="pb-0">
                        <label class="label">{{ $t("employee") }}</label>
                        <h3 class="text-bold py-1">{{ employee.name }}</h3>

                        <label class="label">{{ $t("advance_number") }}</label>
                        <h3 class="text-bold py-1">{{ cashAdvance.number }}</h3>
                      </v-col>
                      <v-col sm="4" cols="12" class="pb-0">
                        <label class="label">{{ $t("description") }}</label>
                        <h3 class="text-bold py-1">
                          {{ advanceSettlement.description }}
                        </h3>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>

              <v-row
                style="background-color: rgb(255, 255, 255); width: 100%; margin: 0 auto 0px;"
              >
                <v-col sm="7" cols="12" class="pb-3 pa-0">
                  <p>{{ $t("purchase_transactions") }}</p>

                  <kendo-datasource
                    ref="clearingTransactionDS"
                    :data="clearingTransactionGrouping"
                  />

                  <kendo-grid
                    id="grid"
                    class="grid-function"
                    :data-source-ref="'clearingTransactionDS'"
                    :sortable="true"
                    :filterable="true"
                    :noRecords="true"
                    :column-menu="true"
                    :scrollable-virtual="true"
                  >
                    <kendo-grid-column
                      :title="$t('no.')"
                      :template="rowNumberTmpl"
                      :width="50"
                      :column-menu="false"
                      :headerAttributes="{
                        style: 'background-color: #EDF1F5;',
                        class: 'text-products;',
                      }"
                      :attributes="{
                        style: 'text-align: products',
                      }"
                    />
                    <kendo-grid-column
                      :field="'number'"
                      :title="$t('transaction')"
                      :width="150"
                      :headerAttributes="{
                        style: 'background-color: #EDF1F5',
                      }"
                    />
                    <kendo-grid-column
                      :field="'name'"
                      :title="$t('supplier')"
                      :width="100"
                      :headerAttributes="{
                        style: 'background-color: #EDF1F5;',
                      }"
                    />
                    <kendo-grid-column
                      :field="'amount'"
                      :title="$t('amount')"
                      :format="'{0:n}'"
                      :width="100"
                      :headerAttributes="{
                        style: 'text-align: right; background-color: #EDF1F5;',
                      }"
                      :attributes="{ style: 'text-align: right; ' }"
                    />
                    <kendo-grid-column
                      :field="'currency'"
                      :title="$t('currency')"
                      :template="'#=currency.code#'"
                      :width="100"
                      :headerAttributes="{
                        style: 'text-align: right; background-color: #EDF1F5;',
                      }"
                      :attributes="{ style: 'text-align: right; ' }"
                    />
                    <kendo-grid-column
                      :field="'exchanged_amount'"
                      :title="$t('exchanged_amount')"
                      :width="100"
                      :headerAttributes="{
                        style: 'text-align: right; background-color: #EDF1F5;',
                      }"
                      :attributes="{ style: 'text-align: right; ' }"
                    />
                  </kendo-grid>
                </v-col>
                <v-col sm="5" cols="12" class="py-0 pr-0">
                  <div class="function_content">
                    <v-row>
                      <v-col sm="12" cols="12" class="pb-0">
                        <template>
                          <v-simple-table class="cash-balance">
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <td class="">{{ $t("advance_amount") }}</td>
                                  <td class="float-right">
                                    {{
                                      Number(advancedAmount).toLocaleString()
                                    }}
                                    {{ cashAdvance.currency.code }}
                                  </td>
                                </tr>
                                <tr v-if="showExchangeAmount">
                                  <td class="">
                                    {{ $t("advance_in_exchanged_amount") }}
                                  </td>
                                  <td class="float-right">
                                    {{
                                      Number(
                                        advancedExchangeAmount
                                      ).toLocaleString()
                                    }}
                                  </td>
                                </tr>
                                <tr>
                                  <td class="">{{ $t("settled_amount") }}</td>
                                  <td class="float-right">
                                    {{ Number(settledAmount).toLocaleString() }}
                                  </td>
                                </tr>
                                <tr>
                                  <td class="">{{ $t("cash_account") }}</td>
                                  <td class="float-right">
                                    {{ advanceSettlement.cash_account.number }}
                                    - {{ advanceSettlement.cash_account.name }}
                                  </td>
                                </tr>
                                <tr>
                                  <td>{{ $t("remaining") }}</td>
                                  <td class="float-right">
                                    {{ Number(remaining).toLocaleString() }}
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </template>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
              <v-divider />
              <v-card outlined dense class="no_border function_footer py-2">
                <v-btn
                  class="float-right save_option mx-1 capitalize"
                  color="secondary"
                  @click="_print(4)"
                >
                  {{ $t("print") }}
                </v-btn>

                <v-btn
                  class="float-right mx-1 white--text capitalize"
                  color="primary"
                  @click="edit"
                >
                  {{ $t("edit") }}
                </v-btn>
              </v-card>
              <v-divider />
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <LoadingMe
        :isLoading="showLoading"
        :fullPage="true"
        :myLoading="true"
        :alertMessage="loadingAlert"
        :color="loadingColorAlert"
        :alertText="loadingTextAlert"
      />
    </v-container>
  </v-app>
</template>

<script>
// import kendo from "@progress/kendo-ui";
// import {i18n} from '@/i18n'
import Helper from "@/helper.js";
import {
  AdvanceSettlementModel,
  EmployeeModel,
  CurrencyModel,
  CashAdvanceModel,
  ContactModel,
} from "@/scripts/model/AppModels";
import ResponseDataModel from "@/scripts/model/ResponseData";
import {
  advanceSettlementHandler,
  cashAdvanceHandler,
} from "@/scripts/AppHandlers";

/* Store */
import store from "@/store";
const institute = store.state.institute.institute;
// form
const { getFormSetting } = require("@/scripts/settingsHandler.js");
import { print } from "@/form/Expense.js";
import { i18n } from "@/i18n";

const settingsHandler = require("@/scripts/settingsHandler");
const clearingTransactionHandler = require("@/scripts/handler/workingcapital/clearingTransactionHandler.js");

export default {
  name: "AdvanceSettlementView",
  components: {
    LoadingMe: () => import("@/components/Loading"),
  },
  props: {
    initAdvanceSettlement: {
      type: AdvanceSettlementModel,
    },
  },
  data: () => ({
    advanceSettlement: new AdvanceSettlementModel(),
    employee: new EmployeeModel(),
    cashAdvance: new CashAdvanceModel(),
    clearingTransactions: [],
    clearingTransactionGrouping: [],
    advancedAmount: 0,
    advancedExchangeAmount: 0,
    settledAmount: 0,
    remaining: 0,
    Helper: Helper,
    showExchangeAmount: false,
    // LoadingMe
    showLoading: false,
    loadingAlert: false,
    loadingColorAlert: "",
    loadingTextAlert: "",
  }),
  methods: {
    // Load advanceSettlement according to query string {id}
    loadObj() {
      // Access Query String
      let q = this.$route.params;
      if (q.id !== undefined) {
        if (q.id !== this.advanceSettlement.uuid) {
          this.showLoading = true;

          advanceSettlementHandler
            .getOne(q.id)
            .then((res) => {
              let responseData = new ResponseDataModel(res);
              // Bind Obj
              this.advanceSettlement = new AdvanceSettlementModel(responseData.data);

              this.bindData();
            })
            .finally(() => {
              // self.showLoading = false;
            });
        }
      }
    },
    async bindData() {
      // Employee
      this.employee = new ContactModel(this.advanceSettlement.settled_by);

      // Cash Advance
      let cashAdvance = await cashAdvanceHandler.getOne(
        this.advanceSettlement.cash_advance_uuid
      );
      let cashAdvanceResponseData = new ResponseDataModel(cashAdvance);
      this.cashAdvance = new CashAdvanceModel(cashAdvanceResponseData.data);

      // Cash Advance Amount
      let advanceAmount = 0,
        advancedExchangeAmount = 0;
      this.cashAdvance.details.forEach((value) => {
        if (value.amount > 0) {
          advanceAmount += value.amount;
          advancedExchangeAmount += value.exchanged_amount;
        }
      });
      this.advancedAmount = advanceAmount;
      this.advancedExchangeAmount = advancedExchangeAmount;

      // Settle Amount
      this.settledAmount = this.advancedExchangeAmount - this.advanceSettlement.cash_amount;

      // Remaining
      this.remaining = this.advanceSettlement.cash_amount;

      // Show/Hide exchange amount
      let baseCurrency = new CurrencyModel(institute.baseCurrency);
      this.showExchangeAmount = Boolean(
        this.cashAdvance.currency.code !== baseCurrency.code
      );

      // Load Clearing Transactions
      let ctxn = await clearingTransactionHandler.getByCashAdvanceId(
        this.advanceSettlement.cash_advance_uuid
      );
      let responseData = new ResponseDataModel(ctxn);
      this.clearingTransactions = responseData.data;
      if(this.clearingTransactions.length > 0){
        this.clearingTransactionGrouping = Helper.groupExpenseByCashAdvance(
          this.clearingTransactions
        );
      }

      this.showLoading = false;
    },
    /* Kendo */
    // Row Number Template
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.clearingTransactionDS.kendoWidget(),
        index = ds.indexOf(dataItem);

      return index + 1;
    },
    getAdvanceSettlement() {
      return new AdvanceSettlementModel(this.advanceSettlement);
    },
    getCashAdvance() {
      return new CashAdvanceModel(this.cashAdvance);
    },
    edit() {
      this.$router.replace({
        name: "Advance Settlement",
        params: {
          initAdvanceSettlement: this.getAdvanceSettlement(),
          initCashAdvance: this.getCashAdvance(),
          initClearingTransactions: this.clearingTransactions,
        },
      });
    },
    async _print(id) {
      let data_print = {};
      let getSegement = await settingsHandler.getSeg(this.clearingTransactionGrouping.segment_uuid);
      data_print["advanceSettlement"] = this.advanceSettlement;
      data_print["segment"] = getSegement.data.data[0];
      data_print["cashAdvance"] = this.cashAdvance;
      data_print["currency"] = this.cashAdvance.currency;
      data_print[
        "clearingTransactionGrouping"
      ] = this.clearingTransactionGrouping;
      //   data_print["project"] = this.project;
      //   data_print["location"] = this.location;
      //   data_print["segment"] = this.segment;
      data_print["employee"] = this.employee;
      data_print["total"] = {
        advancedAmount: this.advancedAmount,
        advancedExchangeAmount: this.advancedExchangeAmount,
        settledAmount: this.settledAmount,
        remaining: this.remaining,
      };
      let params = "?formType=AdvanaceSettlement Voucher";
      getFormSetting(params).then((res) => {
        if (res.data.statusCode === 200) {
          if (res.data.data.length > 0) {
            print(data_print, id, res.data.data["0"].settings);
          } else {
            this.$snotify.error(i18n.t("please_save_form_in_setting"));
          }
        }
      });
    },
  },
  watch: {
    // call again the method if the route changes
    $route: "loadObj",
    initAdvanceSettlement() {
      if (this.initAdvanceSettlement) {
        this.advanceSettlement = this.initAdvanceSettlement;
        this.bindData();
      }
    },
  },
  mounted() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.loadObj();
  },
};
</script>

<style scoped>
.function_content {
  padding: 0 25px 25px;
  border-bottom: 0;
}
.cash-balance.theme--light.v-data-table {
  background-color: transparent !important;
}
.cash-balance.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td {
  padding: 5px 10px !important;
  height: 50px;
}
.cash-balance.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td:not(.v-data-table__mobile-row) {
  border-top: thin solid rgba(0, 0, 0, 0.12);
  border-bottom: 0 !important;
}
.cash-balance.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:last-child
  td {
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

@media (min-width: 1264px) {
  .container {
    /* max-width: 1185px; */
    max-width: 1080px !important;
  }
}

@media (max-width: 576px) {
  .mb-6 {
    margin-bottom: 0 !important;
  }
}
</style>
