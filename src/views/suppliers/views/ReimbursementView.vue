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
                <h2 class="mb-0">{{ $t("reimbursement") }}</h2>
                <v-icon
                  onclick="window.history.go(-1); return false;"
                  style="cursor: pointer; color: #333; font-size: 40px;"
                  class="float-right"
                  >close
                </v-icon>
              </div>

              <v-row>
                <v-col sm="12" cols="12">
                  <div class="grayBg px-4 pb-3">
                    <v-row>
                      <v-col sm="4" cols="12" class="pb-0">
                        <label class="label">{{ $t("date") }}</label>
                        <h3 class="text-bold py-1">
                          {{
                            Helper.dateFormat(reimbursement.reimbursement_date)
                          }}
                        </h3>

                        <label class="label">{{ $t("number") }}</label>
                        <h3 class="text-bold py-1">
                          {{ reimbursement.number }}
                        </h3>
                      </v-col>
                      <v-col sm="4" cols="12" class="pb-0">
                        <label class="label">{{ $t("employee") }}</label>
                        <h3 class="text-bold py-1">
                          {{ reimbursement.payer.name }}
                        </h3>

                        <label class="label mb-0">{{ $t("currency") }}</label>
                        <h3 class="text-bold py-1">
                          {{ reimbursement.currency.code }} -
                          {{ reimbursement.currency.name }}
                        </h3>
                      </v-col>
                      <v-col sm="4" cols="12" class="pb-0">
                        <label class="label">{{ $t("description") }}</label>
                        <h3 class="text-bold py-1">
                          {{ reimbursement.description }}
                        </h3>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>

              <v-row
                style="background-color: rgb(255, 255, 255); width: 100%; margin: 0 auto 0px;"
              >
                <v-col sm="12" cols="12" class="pb-3 pa-0">
                  <p>{{ $t("purchase_trans_reimbursement") }}</p>

                  <kendo-datasource
                    ref="clearingTransactionDS"
                    :data="clearingTransactions"
                  />

                  <kendo-grid
                    id="txnGrid"
                    class="grid-function"
                    :data-source-ref="'clearingTransactionDS'"
                    :sortable="true"
                    :noRecords="true"
                    :column-menu="true"
                    :scrollable-virtual="true"
                  >
                    <kendo-grid-column
                      :title="$t('no.')"
                      :template="rowNumberTransactionTmpl"
                      :width="45"
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
                      :title="'NUMBER'"
                      :width="100"
                    />
                    <kendo-grid-column
                      :field="'name'"
                      :title="'SUPPLIER'"
                      :width="100"
                    />
                    <kendo-grid-column
                      :field="'amount'"
                      :title="'AMOUNT'"
                      :format="'{0:n}'"
                      :width="80"
                      :attributes="{ style: 'text-align: right; ' }"
                    />
                    <kendo-grid-column
                      :field="'currency'"
                      :title="$t('currency')"
                      :template="'#=currency.code#'"
                      :width="80"
                      :attributes="{ style: 'text-align: right; ' }"
                    />
                    <kendo-grid-column
                      :field="'exchanged_amount'"
                      :title="'EXCHANGED AMOUNT'"
                      :width="100"
                      :attributes="{ style: 'text-align: right; ' }"
                    />
                  </kendo-grid>

                  <v-row style="background-color: #fff;">
                    <v-col sm="6" cols="12" class="pb-0"> </v-col>
                    <v-col sm="6" cols="12" class=" pb-0 pt-5">
                      <p>
                        <span class="float-left">{{ $t("total") }}</span>
                        <span class="float-right text-bold">{{
                          Number(transactionAmount).toLocaleString()
                        }}</span>
                      </p>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col sm="12" cols="12" class="py-0 pr-0 pl-0">
                  <div class="grayBg">
                    <p class="mb-3">{{ $t("cash_use_reimbursement") }}</p>
                    <kendo-datasource
                      ref="cashAccountEntryDS"
                      :data="cashAccountEntries"
                    />

                    <kendo-grid
                      id="cashGrid"
                      class="grid-function"
                      :data-source-ref="'cashAccountEntryDS'"
                      :sortable="true"
                      :filterable="true"
                      :noRecords="true"
                      :column-menu="true"
                      :scrollable-virtual="true"
                    >
                      <kendo-grid-column
                        :title="$t('no.')"
                        :template="rowNumberTmpl"
                        :width="45"
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
                        :field="'account'"
                        :title="$t('account')"
                        :template="'<span>#=account.name||``#</span>'"
                        :width="150"
                        :headerAttributes="{
                          style: 'background-color: #EDF1F5',
                        }"
                      />
                      <kendo-grid-column
                        :field="'name'"
                        :title="$t('ref')"
                        :width="100"
                        :headerAttributes="{
                          style: 'background-color: #EDF1F5;',
                        }"
                      />
                      <kendo-grid-column
                        :field="'amount'"
                        :title="$t('amount')"
                        :format="'{0:n}'"
                        :width="80"
                        :headerAttributes="{
                          style:
                            'text-align: right; background-color: #EDF1F5;',
                        }"
                        :attributes="{ style: 'text-align: right; ' }"
                      />
                      <kendo-grid-column
                        :field="'currency'"
                        :title="$t('currency')"
                        :template="'#=currency.code#'"
                        :width="80"
                        :headerAttributes="{
                          style:
                            'text-align: right; background-color: #EDF1F5;',
                        }"
                        :attributes="{ style: 'text-align: right; ' }"
                      />
                      <kendo-grid-column
                        :field="'exchanged_amount'"
                        :title="$t('exchanged_amount')"
                        :width="100"
                        :headerAttributes="{
                          style:
                            'text-align: right; background-color: #EDF1F5;',
                        }"
                        :attributes="{ style: 'text-align: right; ' }"
                      />
                    </kendo-grid>

                    <table width="100%" class="mt-2">
                      <tr>
                        <td align="left">{{ $t("total") }}</td>
                        <td class="text-bold" align="right">
                          {{ Number(cashAmount).toLocaleString() }}
                        </td>
                      </tr>
                      <tr v-if="showExchangeAmount">
                        <td align="left">{{ $t("total_in_exchanged") }}</td>
                        <td class="text-bold" align="right">
                          {{ Number(cashExchangedAmount).toLocaleString() }}
                        </td>
                      </tr>
                    </table>
                  </div>
                </v-col>
              </v-row>

              <v-divider />
              <v-card outlined dense class="no_border function_footer py-2">
                <!-- <p class="float-left py-2 mb-0  color_grey">
								{{ $t("standard_commercial_invoice") }}
								</p> -->
                <v-btn
                  class="float-right save_option mx-1 capitalize"
                  color="secondary"
                  @click="_print(3)"
                >
                  {{ $t("print") }}
                </v-btn>
                <!-- <v-btn class="float-right mx-1 white--text capitalize" color="blue">
								{{ $t("delete") }}
								</v-btn> -->
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
// import kendo from '@progress/kendo-ui'
import Helper from "@/helper.js";
import {
  ReimbursementModel,
  ReimbursementDetailModel,
  ContactModel,
} from "@/scripts/model/AppModels";
import ResponseDataModel from "@/scripts/model/ResponseData";
import { reimbursementHandler } from "@/scripts/AppHandlers";

/* Store */
import store from "@/store";
const institute = store.state.institute.institute;

const { AccountTypeCode } = require("@/scripts/default_setup/Collections");

import { print } from "@/form/Expense.js";
const { getFormSetting } = require("@/scripts/settingsHandler.js");
import { i18n } from "@/i18n";
const settingsHandler = require("@/scripts/settingsHandler");
const projectHandler = require("@/scripts/projectHandler")

export default {
  name: "ReimbursementView",
  components: {
    LoadingMe: () => import("@/components/Loading"),
  },
  props: {
    initReimbursement: {
      type: ReimbursementModel,
    },
  },
  data: () => ({
    reimbursement: new ReimbursementModel(),
    clearingTransactions: [],
    cashAccountEntries: [],
    cashAmount: 0,
    cashExchangedAmount: 0,
    transactionAmount: 0,
    Helper: Helper,
    showExchangeAmount: false,
    // LoadingMe
    showLoading: false,
    loadingAlert: false,
    loadingColorAlert: "",
    loadingTextAlert: "",
  }),
  methods: {
    // Load reimbursement according to query string {id}

    loadObj() {
      // Access Query String
      let q = this.$route.params;
      if (q.id !== undefined) {
        if (q.id !== this.reimbursement.uuid) {
          this.showLoading = true;

          reimbursementHandler
            .getOne(q.id)
            .then((res) => {
              let responseData = new ResponseDataModel(res);
              // Bind Obj
              this.reimbursement = new ReimbursementModel(responseData.data);

              this.bindData();
            })
            .finally(function() {
              // self.showLoading = false;
            });
        }
      } else {
        this.isEdit = false;
      }
    },
    async bindData() {
      // Employee
      this.employee = new ContactModel(this.reimbursement.payer);

      // Show/Hide exchange amount
      this.showExchangeAmount = false;
      if (this.reimbursement.currency.code !== institute.baseCurrency.code) {
        this.showExchangeAmount = true;
      }

      // Clearing transaction
      this.clearingTransactions = Helper.groupExpenseByEmployee(
        this.reimbursement.expenses
      );

      let cashAccounts = [],
        cashAmount = 0,
        cashExchangedAmount = 0;
      this.reimbursement.details.forEach((value) => {
        // Transaction
        if (
          value.account.number ===
          AccountTypeCode.ADVANCE_SETTLEMENT_CLEARING_CODE
        ) {
          this.transactionAmount += value.exchanged_amount;
        }

        // Cash Account
        if (
          ~AccountTypeCode.CASH_ACCOUNTS.indexOf(
            value.account.account_type.number
          )
        ) {
          let ca = new ReimbursementDetailModel(value);

          ca.amount = Math.abs(value.amount);
          cashAmount += ca.amount;

          ca.exchanged_amount = Math.abs(value.exchanged_amount);
          cashExchangedAmount += ca.exchanged_amount;

          cashAccounts.push(ca);
        }
      });
      this.cashAccountEntries = cashAccounts;
      this.cashAmount = cashAmount;
      this.cashExchangedAmount = cashExchangedAmount;

      this.showLoading = false;
    },
    // Row Number Template
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.cashAccountEntryDS.kendoWidget(),
        index = ds.indexOf(dataItem);

      return index + 1;
    },
    rowNumberTransactionTmpl(dataItem) {
      let ds = this.$refs.clearingTransactionDS.kendoWidget(),
        index = ds.indexOf(dataItem);

      return index + 1;
    },
    getReimbursement() {
      return Object.assign({}, new ReimbursementModel(this.reimbursement));
    },
    edit() {
      this.$router.replace({
        name: "Reimbursement",
        params: { initReimbursement: this.getReimbursement() },
      });
    },
    async _print(id) {
      let getSegement =   await settingsHandler.getSeg(this.reimbursement.expenses[0].segment_uuid);
      let getProject = await projectHandler.list('?id=' + this.reimbursement.expenses[0].project_uuid)
      let data_print= this.reimbursement;
      data_print['segment'] = getSegement.data.data[0]
      data_print['project'] = getProject.data.data[0]
      let params = "?formType=Reimbursement Voucher";
      getFormSetting(params).then((res) => {
        if (res.data.statusCode === 200) {
          if (res.data.data.length > 0) {
            print(this.reimbursement, id, res.data.data["0"].settings);
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
    initReimbursement() {
      if (this.initReimbursement) {
        this.reimbursement = this.initReimbursement;
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
.attachment_table.theme--light.v-data-table {
  background-color: transparent !important;
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
