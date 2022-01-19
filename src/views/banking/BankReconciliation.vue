<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{$t('bank_reconciliation_manually')}}</h2>
                                <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right"
                                >close
                                </v-icon>
                            </v-card>

                            <v-card outlined dense class="px-3 no_border mb-3" color="grayBg">
                                <v-row>
                                    <v-col sm="6" cols="12" class="py-0">
                                        <v-row>
                                            <v-col sm="6" cols="12" class="pb-0">
                                                <label class="label">{{$t('date')}}</label>
                                                <app-datepicker :initialDate="reconcile.date"
                                                                @emitDate="reconcile.date = $event"/>
                                            </v-col>
                                            <v-col sm="6" cols="12" class="pb-0">
                                                <label class="label">{{$t('number')}}</label>
                                                <v-row>
                                                    <v-col sm="10" cols="10" class="pr-0 pt-1">
                                                        <v-text-field class=""
                                                                      v-model="reconcile.number"
                                                                      outlined
                                                                      :rules="[v => !!v || 'Number is required']"
                                                                      required/>
                                                    </v-col>
                                                    <v-col sm="2" cols="2" class="pl-0 pt-1">
                                                        <v-icon color="black" size="30" class="border_qrcode"
                                                                @click="generateNumber">mdi-qrcode
                                                        </v-icon>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col sm="6" cols="12" class="pb-0 py-0">
                                                <label class="label">{{$t('ending_balance_date')}}</label>
                                                <app-datepicker :initialDate="reconcile.ending_balance_date"
                                                                @emitDate="reconcile.ending_balance_date = $event"/>
                                            </v-col>
                                            <v-col sm="6" cols="12" class="pb-0 py-0">
                                                <label class="label">{{$t('reconcile_account')}}</label>
                                                <app-cash-account-dropdownlist
                                                    :initAccount="reconcile.account"
                                                    @emitAccount="reconcile.account = $event"
                                                    @onChanged="onCashAccountChanges"
                                                />
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col sm="4" cols="12" class="py-0">
                                                <label class="label text-bold">{{$t('ending_balance')}}</label>
                                            </v-col>
                                            <v-col sm="8" cols="12" class="py-0">
                                                <v-text-field class="mt-1"
                                                              type="number"
                                                              v-model="reconcile.ending_balance"
                                                              outlined
                                                              tage="Ending Balance"
                                                              required
                                                />
                                            </v-col>
                                        </v-row>

                                    </v-col>
                                    <v-col sm="6" cols="12" class="pb-0">
                                        <v-card outlined dense color="third" elevation="0" height="70" class="white--text d-flex pa-3 justify-space-between align-center mb-3">
                                            <p style="font-size: 20px;" class="col-sm-7  mb-0 pa-0">
                                                {{$t('reported_beginning_balance')}}
                                            </p>
                                            <p style="font-size: 20px;"
                                               class="col-sm-5 text-right  mb-0 pa-0 font-bold">{{
                                                Number(reconcile.opening_balance).toLocaleString() }}</p>
                                        </v-card>


                                        <v-card outlined dense color="secondary" elevation="0" height="70" class="white--text d-flex pa-3 justify-space-between align-center mb-3">
                                            <p style="font-size: 20px;" class="col-sm-7  text-left mb-0 pa-0">
                                                {{$t('reported_ending_balance')}}
                                            </p>
                                            <p style="font-size: 20px;"
                                               class="col-sm-5 text-right  mb-0 pa-0 font-bold">{{
                                                Number(reportingEndingBalance).toLocaleString() }}</p>
                                        </v-card>

                                        <v-row>
                                            <v-col sm="6" cols="12" class="py-0">
                                                <v-card outlined dense class="block-white">
                                                    <p style="font-size: 20px;"
                                                       class="col-sm-7 float-left text-left mb-0 pa-0">
                                                        {{$t('variance')}}
                                                    </p>
                                                    <p style="font-size: 20px;"
                                                       class="col-sm-5 float-left text-right mb-0 pa-0 font-bold">{{
                                                        Number(varianceAmount).toLocaleString() }}</p>
                                                </v-card>
                                            </v-col>

                                            <v-col sm="6" cols="12" class="py-0" v-if="reconcile.variance_amount !== 0">
                                                <label class="label">{{$t('adjustment_account')}}</label>
                                                <app-account-dropdownlist
                                                    :initAccount="reconcile.adjustment_account"
                                                    @emitAccount="reconcile.adjustment_account = $event"
                                                />{{reconcile.adjustment_account.name}}
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card>

                            <v-row style="background-color: rgb(255, 255, 255); width: 100%; margin: 10px auto 0px;">
                                <v-col sm="12" cols="12" class="py-3 pa-0">
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
                                            <router-link :to="'journal/view/' + item.id">{{ item.journal_number }}
                                            </router-link>
                                        </template>

                                        <!-- Debit -->
                                        <template v-slot:[`item.dr`]="{ item }">
                                            <span>{{ Number(item.dr).toLocaleString() }}</span>
                                        </template>

                                        <!-- Credit -->
                                        <template v-slot:[`item.cr`]="{ item }">
                                            <span>{{ Number(item.cr).toLocaleString() }}</span>
                                        </template>

                                         <!-- Transaction type -->
                                        <template v-slot:[`item.transaction_type`]="{ item }">
                                            <span>{{ transactionType[item.transaction_type] }}</span>
                                        </template>
                                    </v-data-table>
                                </v-col>
                            </v-row>

                            <v-row style="background-color: #fff;">
                                <v-col sm="3" cols="12" class="pb-0">
                                    <template>
                                        <v-file-input class="mt-0 pt-0 " sm="3" cols="6"
                                                      :placeholder="$t('attachment')"
                                                      multiple
                                                      prepend-icon="mdi-paperclip"
                                        >
                                            <template v-slot:selection="{ text }">
                                                <v-chip
                                                        small
                                                        label
                                                        color="primary"
                                                >
                                                    {{ text }}
                                                </v-chip>
                                            </template>
                                        </v-file-input>
                                    </template>
                                </v-col>
                            </v-row>


                            <v-divider class="mt-4"/>
                            <v-card outlined dense class="no_border function_footer">
                                <v-alert type="warning"
                                         v-model="alert"
                                         dismissible>
                                    <span v-html="errorMessage"/>
                                </v-alert>
                                <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="black" outlined class="mr-2 text-capitalize  black--text float-left" v-on="on">
                                            {{$t('select_template')}}
                                            <v-icon size="" class="ma-1">expand_more</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item v-for="(item, index) in templates" :key="index">
                                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-btn color="black"  class="text-capitalize  white--text float-left" @click="cancel">{{$t('cancel')}}</v-btn>
                                <v-btn color="primary" class="ml-2 float-right text-capitalize  white--text" @click="onSaveOptionClick(SaveOption.SAVECLOSE)">
                                    {{$t('reconcile')}}
                                </v-btn>
                                <v-btn color="secondary" class=" float-right text-capitalize  white--text" @click="onSaveOptionClick(SaveOption.DRAFT)">
                                    {{$t('save_for_later')}}
                                </v-btn>
                            </v-card>

                        </v-form>
                    </v-card>
                </v-col>
            </v-row>

            <LoadingMe 
                :isLoading="showLoading" 
                :fullPage="true" 
                type="loading"
                :myLoading="true" />
        </v-container>
    </v-app>
</template>

<script>
    import kendo from '@progress/kendo-ui';
    import {i18n} from '@/i18n';
    import Helper from "@/helper.js";
    import {JournalEntryModel, CurrencyModel, ReconcileModel, AccountModel} from "@/scripts/model/AppModels.js"
    
    /* Store */
    import store from "@/store"
    const institute = store.state.institute.institute;
    const instituteId = institute.id;

    const reconcileHandler = require("@/scripts/reconcileHandler.js");
    const journalHandler = require("@/scripts/journalHandler.js");
    const {EntityType, SaveOption} = require("@/scripts/default_setup/Collections");
    
    export default {
        name: "BankReconcile",
        components: {
            "LoadingMe": () => import('@/components/Loading'),
            "app-datepicker": () => import('@/components/custom_templates/DatePickerComponent'),
            "app-cash-account-dropdownlist": () => import('@/components/dropdownlist/CashAccount'),
            "app-account-dropdownlist": () => import('@/components/dropdownlist/Account'),
        },
        props: {
            initReconcile: {
                type: ReconcileModel
            },
        },
        data: () => ({
            transactionType: EntityType.TRANSACTION_TYPE,
            Helper: Helper,
            entryBanlance: 0,
            // Obj
            reconcile: new ReconcileModel(),
            adjustmentJournal: [],
            adjustmentEntries: [],
            selectedTransactions: [],
            headers: [
                {
                    text: 'DATE',
                    align: 'start',
                    value: 'journal_date',
                },
                {text: 'TYPE', value: 'transaction_type'},
                {text: 'DESCRIPTION', value: 'description'},
                {text: 'REFERENCE', value: 'journal_number'},
                {
                    text: 'CASH IN',
                    value: 'dr',
                    align: 'right',
                },
                {
                    text: 'CASH OUT',
                    value: 'cr',
                    align: 'right',
                },
            ],
            // LoadingMe
            showLoading: false,
            // Form validation
            valid: true,
            isEdit: false,
            alert: false,
            errorMessage: "",
            saveMode: "",
            SaveOption: SaveOption,
            files: [],
            cashAccounts: [],
            adjustmentAccounts: [],
            transactions: [],
            templates: [],
        }),
        methods: {
            // Set default data
            setDefaultData() {
                this.reconcile = Object.assign({}, new ReconcileModel({
                    type: EntityType.BANK_RECONCILIATION_MANUAL,
                    date: new Date().toISOString().substr(0, 10),
                    ending_balance_date: new Date().toISOString().substr(0, 10),
                }));

                // Generate Number
                this.generateNumber();
            },
            /* Generate Number */
            async generateNumber() {
                if(!this.isEdit){
                    let num = await Helper.generateAccountingNumber(EntityType.BANK_RECONCILIATION_MANUAL, this.reconcile.date);
                    this.reconcile.number = num.number;
                    this.reconcile.prefix_format = num.prefix_format;
                }
            },
            // On Cash Account Changes
            onCashAccountChanges() {
                let fiscalDate = Helper.getFiscalDateByDate(this.reconcile.ending_balance_date),
                    sdate = fiscalDate.start_date,
                    edate = this.reconcile.ending_balance_date;

                if (this.reconcile.account.uuid) {
                    if (sdate && edate) {
                        sdate = kendo.toString(new Date(sdate), 'yyyy-MM-dd') + 'T00:00:00.000Z';

                        edate = new Date(edate);
                        edate = kendo.toString(edate, 'yyyy-MM-dd') + 'T23:59:59.999Z';
                    } else {
                        sdate = 0;
                        edate = 0;
                    }

                    this.showLoading = true;
                    journalHandler.getEntryDetailByAccount(this.reconcile.account.uuid, {
                        params: {
                            start_date: sdate,
                            end_date: edate,
                        }
                    })
                    .then(res => {
                        if (res) {
                            // Binding
                            this.reconcile.opening_balance = res.balance;
                            this.transactions = res.entries_detail.filter(value => value.is_reconciled !== 1);
                        }
                    })
                    .finally(() => {
                        this.showLoading = false;
                    });
                }
            },
            // Add Journal
            addJournal() {
                let rc = this.reconcile,
                    je = [],
                    debitAccount = rc.account, // Cash Account
                    creditAccount = new AccountModel(this.reconcile.adjustment_account),
                    amount = Math.abs(rc.variance_amount);

                // Variance > 0
                if (rc.variance_amount > 0) {
                    debitAccount = new AccountModel(this.reconcile.adjustment_account);
                    creditAccount = rc.account; // Cash Account
                }

                // // Debit Side
                je.push(new JournalEntryModel({
                    account: debitAccount,
                    description: '',
                    ref_number: '',
                    amount: amount,
                    currency: new CurrencyModel(institute.baseCurrency),
                    exchange_rate: 1,
                    tax_amount: 0,
                    is_reconciled: 1
                }));

                // Credit Side
                je.push(new JournalEntryModel({
                    account: creditAccount,
                    description: '',
                    ref_number: '',
                    amount: amount * -1,
                    currency: new CurrencyModel(institute.baseCurrency),
                    exchange_rate: 1,
                    tax_amount: 0,
                    is_reconciled: 1
                }));

                // User
                let user = {
                    uuid: institute.creator,
                    user_name: institute.legalName,//change later (fullname)
                    cognitoId: institute.sk,
                    email: institute.email,
                };
                let createdBy = null, modifiedBy = null;
                if (this.isEdit) {
                    modifiedBy = user;
                } else {
                    createdBy = user;
                }

                // Adjustment Journal
                this.adjustmentJournal = {
                    number: this.reconcile.number,
                    fiscal_year: institute.fiscalId,
                    journal_type: EntityType.AUTO_JOURNAL,
                    transaction_type: EntityType.TRANSACTION_TYPE['adjustment'],
                    journal_date: Helper.toISODate(rc.date),
                    description: '',
                    institute: instituteId,
                    created_by: createdBy,
                    modified_by: modifiedBy,
                    prefix_format: this.reconcile.prefix_format
                };

                // Adjustment Entries
                this.adjustmentEntries = je;
            },
            // Shrink Data
            shrinkData() {
                let rc = this.reconcile;

                // Date
                rc.date = Helper.toISODate(rc.date);
                rc.ending_balance_date = Helper.toISODate(rc.ending_balance_date);

                // Draft Mode
                if (this.saveMode === 'saveDraft') {
                    rc.is_draft = 1;
                } else {
                    rc.is_draft = 0;
                }

                // Reconcile Entries
                this.selectedTransactions.forEach(value => {
                    rc.reconcile_entries.push(value.entry_uuid);
                });

                // User
                let user = {
                    uuid: institute.creator,
                    user_name: institute.legalName,//change later (fullname)
                    cognitoId: institute.sk,
                    email: institute.email,
                };
                if (this.isEdit) {
                    rc.modified_by = user;
                } else {
                    rc.created_by = user;
                }
            },
            // Validating
            validateForm() {
                let result = true, msg = '',
                    rc = this.reconcile;

                // Transaction
                if (this.selectedTransactions.length === 0) {
                    result = false;
                    msg += '<p>Please select at least one transaction.</p>';
                }

                // Adjustment Account
                if (rc.variance_amount !== 0) {
                    if (this.reconcile.adjustment_account.uuid === "") {
                        result = false;
                        msg += '<p>Please select adjustment account.</p>';
                    }
                }

                // Ending Balance
                if (kendo.parseFloat(rc.ending_balance) === 0) {
                    result = false;
                    msg += '<p>Please enter Ending Balance.</p>';
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
                    let isValidClosingDate = await Helper.validateClosingDate(this.reconcile.date);
                    if (isValidClosingDate) {
                        this.saveMode = mode;
                        this.save();
                    }
                }
            },
            cancel() {
                this.$swal({
                    title: i18n.t('msg_title_warning'),
                    text: i18n.t('msg_discard'),
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: i18n.t('cancel'),
                    confirmButtonColor: "#4d4848",
                    cancelButtonColor: "#ED1A3A",
                    confirmButtonText: i18n.t('discard'),
                }).then((result) => {
                    if (result.value) {
                        this.clear();
                        this.setDefaultData();
                        this.$router.go(-1);
                    }
                });
            },
            clear() {
                this.selectedTransactions = [];
            },
            save() {
                // Adjustment Journal
                if (this.reconcile.variance_amount !== 0) {
                    this.addJournal();
                 
                this.adjustmentEntries.forEach(function(entry) {
                    self.entryBanlance += entry.amount;
                });
                
                } else {
                    this.adjustmentJournal = null;
                    this.adjustmentEntries = null;
                }
                if (this.entryBanlance !== 0) {
                    this.$swal.showValidationMessage('The adjustment journal is not balance.')
                    
                } else {
                    // Shrink Data
                    this.shrinkData();

                    // Sync Data
                    this.showLoading = true;
                    reconcileHandler.save({
                        reconcile: this.reconcile,
                        adjustment_journal: this.adjustmentJournal,
                        adjustment_entries: this.adjustmentEntries,
                        is_bank_reconcile: 1
                    })
                    .then((response) => {
                        this.responseStatus(response);
                    })
                    .catch((error) => {
                        this.showLoading = false;
                        Helper.alertErrorMsg(error);
                    })
                    .finally(() => {
                        this.showLoading = false;
                    });
                }
            },
            // Response Status
            responseStatus(response) {
                if (response.status === 200) {
                    if (this.saveMode === SaveOption.SAVECLOSE || this.saveMode === SaveOption.DELETE) { /* Save Close or Delete */
                        if (this.isEdit) {
                            this.goBackToViewPage();
                        } else {
                            this.$router.go(-1);
                        }

                        this.clear();
                        this.setDefaultData();
                    } else { /* Save New */
                        this.clear();
                        this.setDefaultData();
                    }

                    /* Alert Success */
                    this.$snotify.success(i18n.t("successful"));
                } else {
                    /* Alert Error */
                    this.$snotify.error(i18n.t("error_something_wrong"));
                }
            },
            // Go back to view page after edit mode
            goBackToViewPage() {
                this.$router.replace({name: 'Bank Reconciliation View', params: { initReconcile: this.reconcile }});
            },
        },
        computed: {
            reportingEndingBalance() {
                let rc = this.reconcile,
                    dr = 0, cr = 0;

                this.selectedTransactions.forEach(value => {
                    dr += kendo.parseFloat(value.dr);
                    cr += kendo.parseFloat(value.cr);
                })

                let bal = (rc.opening_balance + dr) - cr;

                return bal;
            },
            varianceAmount() {
                let rc = this.reconcile;
                let diff = this.reportingEndingBalance - kendo.parseFloat(rc.ending_balance);
                rc.variance_amount = diff;

                return diff;
            }
        },
        mounted() {
            // Set default data
            this.setDefaultData();
        },
    };
</script>

<style scoped>
    @media (min-width: 1264px) {
        .container {
            max-width: 1080px !important;
        }
    }
</style>