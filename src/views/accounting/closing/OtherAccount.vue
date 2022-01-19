<template>
  <v-row>
    <v-col cols="12" sm="12">
      <v-card outlined dense class="px-4  pt-1 no_border mb-3" color="white">
        <v-row style="background: #F8F8F9;">
          <v-col sm="4" cols="12" class="pb-0">
            <label class="label">{{ $t("date") }}</label>
            <app-datepicker
              :initialDate="reconcile.date"
              @emitDate="reconcile.date = $event"
            />
          </v-col>
          <v-col sm="4" cols="12" class="pb-0 ">
            <label class="label">{{ $t("reconcile_account") }}</label>
            <v-select
              class="mt-1"
              placeholder="Select Account"
              v-model="reconcile.account"
              :items="reconcileAccounts"
              item-text="name"
              item-value="uuid"
              return-object
              outlined
            >
              <template slot="selection" slot-scope="{ item }">
                {{ item.number }} - {{ item.name }}
              </template>
              <template slot="item" slot-scope="{ item }">
                {{ item.number }} - {{ item.name }}
              </template>
            </v-select>
          </v-col>
          <v-col cols="2"  sm="4">
            <v-btn
              color="primary"
              class="white--text mt-6 float-left text-capitalize"
              @click="search"
            >
              {{ $t("view") }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" >

        <v-row>
          <v-col sm="4" cols="12" class="py-0">
            <v-card outlined dense class="pa-3 no_border white--text" color="secondary" height="85px">
                  <h3 class="text-left font_13 text-uppercase">{{ $t('txn_balance') }}</h3>
                  <h3 class="text-right mt-5 font_20">900099</h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <v-card outlined dense class="pa-3 no_border white--text " color="third" height="85px">
                <h3 class="text-left font_13 text-uppercase">{{ $t('gl_balannce') }}</h3>
                <h3 class="text-right mt-5  font_20">99</h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <v-card outlined dense class="pa-3 no_border black--text" color="grayBg" height="85px">
                <h3 class="text-left font_13 text-uppercase">{{ $t('variance') }}</h3>
                <h3 class="text-right mt-5 font_20">999</h3>
            </v-card>
          </v-col>
        </v-row>
          </v-col>
          <v-col sm="12" cols="12" class="pb-0">
            <p class="mb-0">{{ $t("reconciliation_func_dec") }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table
              v-model="selectedTransactions"
              :headers="headers"
              :items="transactions"
              item-key="journal_uuid"
              show-select
              class="elevation-1"
            >
              <!-- Journal Date -->
              <template v-slot:[`item.journal_date`]="{ item }">
                <span>{{ Helper.dateFormat(item.journal_date) }}</span>
              </template>

              <!-- Journal Number as Link -->
              <template v-slot:[`item.journal_number`]="{ item }">
                <router-link :to="'journal/view/' + item.id"
                  >{{ item.journal_number }}
                </router-link>
              </template>

              <!-- Amount -->
              <template v-slot:[`item.amount`]="{ item }">
                <span>{{ Number(item.amount).toLocaleString() }}</span>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card>
      <LoadingMe
        :isLoading="showLoading"
        :fullPage="true"
        :myLoading="true"
        :alertMessage="loadingAlert"
        :color="loadingColorAlert"
        :alertText="loadingTextAlert"
      />
    </v-col>
  </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import { i18n } from "@/i18n";
import Helper from "@/helper.js";
// import JQuery from 'jquery';
import {
  ReconcileModel,
  // ReconcileDetailModel,
  JournalModel,
  JournalEntryModel,
  AccountModel,
  CurrencyModel,
} from "@/scripts/model/AppModels";

/* Store */
import store from "@/store"
const institute = store.state.institute.institute

const {
  accountHandler,
  journalHandler,
  reconcileHandler,
  currencyHandler,
} = require("@/scripts/AppHandlers");
const {
  AccountTypeCode,
  EntityType,
  SaveOption,
} = require("@/scripts/default_setup/Collections");

export default {
  components: {
    LoadingMe: () => import("@/components/Loading"),
    "app-datepicker": () =>
      import("@/components/custom_templates/DatePickerComponent"),
  },
  props: {
    initCashReconciliation: {
      type: ReconcileModel,
    },
  },
  data: () => ({
    // Obj
    reconcile: new ReconcileModel(),
    adjustmentJournal: new JournalModel(),
    adjustmentEntries: [],
    transactions: [],
    selectedTransactions: [],
    accounts: [],
    reconcileAccounts: [],
    headers: [
      {
        text: "DATE",
        align: "start",
        value: "journal_date",
      },
      { text: "number", value: "journal_number" },
      { text: "type", value: "transaction_type" },
      { text: "DESCRIPTION", value: "description" },
      {
        text: "TXN AMOUNT",
        value: "amount",
        align: "right",
      },
      {
        text: "GL AMOUNT",
        value: "amount",
        align: "right",
      },
      {
        text: "VARIACNE",
        value: "amount",
        align: "right",
      },
    //   {
    //     text: "ACTION",
    //     align: "right",
    //   },
    ],
    Helper: Helper,
    user: Helper.getUser(),
    templates: [],
    // Form validation
    valid: true,
    isEdit: false,
    alert: false,
    errorMessage: "",
    saveMode: "",
    SaveOption: SaveOption,
    // LoadingMe
    showLoading: false,
    loadingAlert: false,
    loadingColorAlert: "",
    loadingTextAlert: "",
  }),
  methods: {
    // Initial Data
    initialData() {
      if (this.initCashReconciliation) {
        // Edit Mode
        this.reconcile = this.initCashReconciliation;
        this.bindData();
      } else {
        // Brand New Mode
        this.setDefaultData();
      }
    },
    // Set default data
    setDefaultData() {
      // Brand New Mode
      this.isEdit = false;

      this.reconcile = new ReconcileModel({
        date: new Date().toISOString().substr(0, 10),
        type: EntityType.CASH_RECONCILIATION,
      });

      // Entry Uuid
      // this.debitEntryUuid = '';
      // this.creditEntryUuid = '';

      // Generate number
      this.generateNumber();
    },
    // Bind data from prop for edit mode
    bindData() {
      // Edit Mode
      this.isEdit = true;

      // Journal
      if (this.reconcile.adjustment_journal_id !== "") {
        journalHandler
          .getOne(this.reconcile.adjustment_journal_id)
          .then((res) => {
            this.adjustmentJournal = new JournalModel(res.data);

            this.adjustmentJournal.journal_entries.forEach((value) => {
              if (value.amount > 0) {
                this.debitEntryUuid = value.uuid;
              } else {
                this.creditEntryUuid = value.uuid;
              }
            });
          });
      }
    },
    // Number
    async generateNumber() {
      if (!this.isEdit) {
        let num = await Helper.generateAccountingNumber(
          this.reconcile.type,
          this.reconcile.date
        );

        this.reconcile.number = num.number;
        this.reconcile.prefix_format = num.prefix_format;
      }
    },
    // Get Exchange Rate
    loadExchangeRate() {
      currencyHandler
        .getLastExchangeRateByDate(this.reconcile.date)
        .then((res) => {
          this.exchangeRates = res.data.data;
        });
    },
    // Search
    search() {
      let self = this,
        fiscalDate = Helper.getFiscalDateByDate(this.reconcile.date),
        sdate = fiscalDate.start_date,
        edate = this.reconcile.date;

      if (this.reconcile.account.uuid) {
        if (sdate && edate) {
          sdate =
            kendo.toString(new Date(sdate), "yyyy-MM-dd") + "T00:00:00.000Z";
          edate =
            kendo.toString(new Date(edate), "yyyy-MM-dd") + "T23:59:59.999Z";
        } else {
          sdate = 0;
          edate = 0;
        }

        this.showLoading = true;
        journalHandler
          .getEntryDetailByAccount(this.reconcile.account.uuid, {
            params: {
              start_date: sdate,
              end_date: edate,
            },
          })
          .then((res) => {
            if (res) {
              // Binding
              this.reconcile.ending_balance = res.ending_balance;
              this.transactions = res.entries_detail.filter(
                (value) => value.is_reconciled !== 1
              );
            }
          })
          .finally(function() {
            self.showLoading = false;
          });
      }
    },
    // Shrink Data
    shrinkData() {
      // Date
      this.reconcile.date = Helper.toISODate(this.reconcile.date);

      // User
      if (this.isEdit) {
        this.reconcile.modified_by = this.user;
      } else {
        this.reconcile.created_by = this.user;
      }
    },
    // Add Journal
    addJournal() {
      let entries = [],
        debitAccount = this.reconcile.account,
        creditAccount = this.reconcile.adjustment_account,
        amount = Math.abs(this.reconcile.variance_amount);

      // Variance > 0
      if (this.reconcile.variance_amount > 0) {
        debitAccount = this.reconcile.adjustment_account;
        creditAccount = this.reconcile.account;
      }

      // Debit Side
      entries.push(
        new JournalEntryModel({
          uuid: this.debitEntryUuid,
          account: new AccountModel(debitAccount),
          description: this.reconcile.description,
          currency: new CurrencyModel(institute.baseCurrency),
          amount: amount,
          exchange_rate: 1, // Base Currency always = 1
        })
      );

      // Credit Side
      entries.push(
        new JournalEntryModel({
          uuid: this.creditEntryUuid,
          account: new AccountModel(creditAccount),
          description: this.reconcile.description,
          currency: new CurrencyModel(institute.baseCurrency),
          amount: amount * -1,
          exchange_rate: 1, // Base Currency always = 1
        })
      );

      // Adjustment Journal
      this.adjustmentJournal.number = this.reconcile.number;
      this.adjustmentJournal.journal_type = EntityType.ADJUSTMENT;
      this.adjustmentJournal.transaction_type = EntityType.CASH_RECONCILIATION;
      this.adjustmentJournal.journal_date = Helper.toISODate(
        this.reconcile.date
      );
      this.adjustmentJournal.description = this.reconcile.description;
      this.adjustmentJournal.prefix_format = this.reconcile.prefix_format;
      this.adjustmentJournal.is_draft = this.reconcile.is_draft;
      this.adjustmentJournal.created_by = this.reconcile.created_by;
      this.adjustmentJournal.modified_by = this.reconcile.modified_by;

      // Adjustment Entries
      this.adjustmentEntries = entries;
    },
    // Validating
    validateForm() {
      let result = true,
        msg = "";

      // Adjustment Account
      if (this.reconcile.variance_amount !== 0) {
        if (this.reconcile.adjustment_account.uuid === "") {
          result = false;
          msg += `<p>${i18n.t("please_select_adjustment_account")}</p>`;
        }
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
        let isValidClosingDate = await Helper.validateClosingDate(
          this.reconcile.date
        );
        if (isValidClosingDate) {
          this.saveMode = mode;
          this.save();
        }
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
          this.setDefaultData();
          this.$router.go(-1);
        }
      });
    },
    clear() {
      this.isEdit = false;
      this.saveMode = "";

      // Entry Uuid
      this.debitEntryUuid = "";
      this.creditEntryUuid = "";
    },
    save() {
      let self = this;

      // Shrink Data
      this.shrinkData();

      // Draft Mode
      if (this.saveMode === SaveOption.SAVEDRAFT) {
        this.reconcile.is_draft = 1;
      } else {
        this.reconcile.is_draft = 0;

        // Adjustment Journal
        if (this.reconcile.variance_amount !== 0) {
          this.addJournal();
        } else {
          this.adjustmentJournal = null;
          this.adjustmentEntries = null;
        }
      }

      // Sync Data
      this.showLoading = true;
      reconcileHandler
        .save({
          reconcile: this.reconcile,
          adjustment_journal: this.adjustmentJournal,
          adjustment_entries: this.adjustmentEntries,
        })
        .then((response) => {
          if (response) {
            self.responseStatus(response.status);
          }
        })
        .catch((error) => {
          Helper.alertErrorMsg(error);
        });
    },
    // Response Status
    responseStatus(status) {
      switch (status) {
        case 200: // Ok
          this.showAlert();
          break;
        case 201: // Duplicate
          Helper.alertErrorMsg("Duplicate entry!");
          break;
        default:
          break;
      }
    },
    // Sweetalert2
    changeAlertStatus() {
      this.loadingAlert = true;
      setTimeout(() => {
        this.loadingAlert = false;
      }, 6200);
    },
    showAlert() {
      this.showLoading = false;
      this.changeAlertStatus();
      this.loadingTextAlert = "Added Successful";
      this.loadingColorAlert = "#3DA72E";
      switch (this.saveMode) {
        case "saveClose": // Save Close
          // this.$swal({
          // 	position: 'products',
          // 	icon: 'success',
          // 	title: 'Your work has been saved',
          // 	showConfirmButton: true,
          // }).then((result) => {
          // 	if (result.value) {
          // 		window.history.go(-1)

          // 		return false
          // 	}
          // })
          if (this.isEdit) {
            this.goBackToViewPage();
          } else {
            this.$router.go(-1);
          }

          this.clear();
          this.setDefaultData();
          break;
        default:
          // Save New
          // this.$swal({
          // 	position: 'products',
          // 	icon: 'success',
          // 	title: 'Your work has been saved',
          // 	showConfirmButton: false,
          // 	timer: 1500
          // })
          this.clear();
          this.setDefaultData();
          break;
      }
    },
    // Go back to view page after edit mode
    getReconcile() {
      return new ReconcileModel(this.reconcile);
    },
    goBackToViewPage() {
      this.$router.replace({
        name: "Cash Reconciliation View",
        params: { initCashReconciliation: this.getReconcile() },
      });
    },
  },
  created() {
    // Call Account List
    accountHandler.getAll().then((res) => {
      if (res) {
        let accountList = [],
          reconcileAccountList = [];

        res.data.forEach((value) => {
          accountList.push(new AccountModel(value));

          if (
            ~AccountTypeCode.RECONCILE_OTHER_ACCOUNTS.indexOf(
              value.account_type.code
            )
          ) {
            let acct = new AccountModel(value);
            reconcileAccountList.push(acct);
          }
        });

        this.accounts = accountList;
        this.reconcileAccounts = reconcileAccountList;
      }
    });
  },
  mounted() {
    // Initial Data
    this.initialData();
  },
};
</script>

<style scoped>
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid #000;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
}
@media (min-width: 1264px) {
  .container {
    max-width: 1080px !important;
  }
}
</style>
