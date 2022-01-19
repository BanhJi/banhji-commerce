<template>
    <v-container>
        <v-card
         elevation="0"
         class="pa-4"
         style="position:relative;"
         color="white"
        >
            <h2>{{$t('bank_statement_reconciliation')}}</h2>
            <v-icon 
                onclick="window.history.go(-1); return false;" 
                style="cursor: pointer; color: #333; font-size: 40px;"
                class="float-right"
            >close</v-icon>

            <v-divider/>
            <v-card-text style="min-height: 850px; background-color: #F8F8F9; color: #333;">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                        <!-- From Bank -->
                        <v-col sm="4" cols="12" class="pb-0">
                            <v-card outlined dense color="grayBg" class="no_border" v-if="bankStatement">
                                <v-card outlined dense color="third" class="pa-3 no_border">
                                    <v-row>
                                        <v-col sm="6" cols="12" class="py-0">
                                            <h3 class="white--text">{{$t('from_bank')}}</h3>
                                        </v-col>
                                        <v-col sm="6" cols="12" class="py-0 text-right">
                                            <h3 class="white--text">{{ Number(bankStatement.amount).toLocaleString() }} {{ bankStatement.currency }}</h3>
                                        </v-col>
                                    </v-row>
                                </v-card>
                                <v-row>
                                    <v-col sm="12" cols="12" class="px-6">
                                        <div>
                                            {{ bankStatement.statement_date }}
                                            {{ bankStatement.transaction_type }}
                                        </div>
                                        <div>
                                            {{ bankStatement.reference }}
                                            Amount
                                            {{ Number(bankStatement.amount).toLocaleString() }} {{ bankStatement.currency }}
                                        </div>
                                        <div style="font-size: x-small;">
                                            {{ bankStatement.details }}
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>

                        <!-- From BanhJi -->
                        <v-col sm="4" cols="12" class="pb-0">
                            <v-card outlined dense color="grayBg" class="no_border">
                                <v-card outlined dense color="third" class="pa-3 no_border">
                                    <v-row>
                                        <v-col sm="6" cols="12" class="py-0">
                                            <h3 class="white--text">{{$t('from_banhji')}}</h3>
                                        </v-col>
                                        <v-col sm="6" cols="12" class="py-0 text-right">
                                            <h3 class="white--text">{{ Number(banhjiTxnAmount).toLocaleString() }}</h3>
                                        </v-col>
                                    </v-row>
                                </v-card>
                                <v-row>
                                    <v-col sm="12" cols="12" class="px-6">
                                        <kendo-datasource ref="banhjiMatchedTxnDS"
                                            :change="onBanhjiMatchedTxnDSChanges"
                                            :data="banhjiMatchedTxns"
                                            :page-size='20'
                                            :schema-model-fields="schemaFields">
                                        </kendo-datasource>
                                        
                                        <kendo-grid id="banhjiMatchedTxnGrid"
                                                ref="banhjiMatchedTxnGrid"
                                                class="grid-center mb-3"
                                                :data-source-ref="'banhjiMatchedTxnDS'"
                                                :noRecords="true">
                                            <kendo-grid-column 
                                                :field="'entry_uuid'"
                                                :title="'&nbsp;'"
                                                :template="rowTmpl"
                                                :width="200" />
                                            <kendo-grid-column
                                                :command="{ iconClass: 'k-icon k-i-trash', text: 'DEL', click: removeRow, class: 'btn-plus' }"
                                                :title="'&nbsp;'"
                                                :width="75"
                                            />
                                        </kendo-grid>

                                        <div class="float-right">
                                            <v-btn color="primary"
                                                class="white--text text-capitalize"
                                                @click="findBestMatch" small>
                                                    {{$t('find_best_match')}}
                                            </v-btn>

                                            <v-btn color="primary"
                                                class="white--text"
                                                @click="loadBanhjiTransaction" small>
                                                <v-icon>refresh</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>

                        <!-- Variance -->
                        <v-col sm="4" cols="12" class="pb-0">
                            <v-card outlined dense color="grayBg" class="no_border">
                                <v-card outlined dense color="third" class="pa-3 no_border">
                                    <v-row>
                                        <v-col sm="6" cols="12" class="py-0">
                                            <h3 class="white--text">{{$t('variance')}}</h3>
                                        </v-col>
                                        <v-col sm="6" cols="12" class="py-0 text-right">
                                            <h3 class="white--text">{{ Number(reconcile.variance_amount).toLocaleString() }}</h3>
                                        </v-col>
                                    </v-row>
                                </v-card>
                                <v-row>
                                    <v-col sm="12" cols="12" class="px-6" v-if="reconcile.variance_amount !== 0">
                                        <label class="label">{{$t('adjustment_account')}}</label>
                                        <app-adjustment-account-dropdownlist
                                            :initAccount="reconcile.adjustment_account"
                                            @emitAccount="reconcile.adjustment_account = $event"
                                        />
                                    </v-col>

                                    <!-- Reconcile Info -->
                                    <v-col sm="12" cols="12" class="px-6">
                                        <label class="label">{{$t('date')}}</label>
                                        <app-datepicker :initialDate="reconcile.date"
                                                        @emitDate="reconcile.date = $event"
                                                        @onChanged="getExchangeRate" />

                                        <label class="label">{{$t('number')}}</label>
                                        <v-row>
                                            <v-col sm="10" cols="10" class="pr-0">
                                                <v-text-field class=""
                                                                v-model="reconcile.number"
                                                                outlined
                                                                readonly
                                                                required/>
                                            </v-col>
                                            <v-col sm="2" cols="2" class="pl-0">
                                                <v-icon color="black" size="30" class="border_qrcode"
                                                        @click="generateNumber">mdi-qrcode
                                                </v-icon>
                                            </v-col>
                                        </v-row>

                                        <v-alert type="warning"
                                                v-model="alert"
                                                dismissible>
                                            <span style="font-size: small;" v-html="errorMessage"/>
                                        </v-alert>
                                    
                                        <v-btn color="primary"
                                            class="white--text float-right text-capitalize"
                                            @click="onSaveOptionClick(SaveOption.SAVECLOSE)" small>
                                                {{$t('reconcile')}}
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        
                        <!-- Search BanhJi Transaction Grid -->
                        <v-col sm="12" cols="12">
                            <kendo-datasource ref="banhjiTransactionDS"
                                :data="banhjiTransactions"
                                :page-size='20'
                                :schema-model-fields="schemaFields">
                            </kendo-datasource>

                            <kendo-grid id="banhjiTransactionGrid"
                                ref="banhjiTransactionGrid"
                                :data-source-ref="'banhjiTransactionDS'"
                                :pageable="true"
                                :filterable-mode="'row'"
                                :noRecords="true"
                                :scrollable="true"
                                :pageable-numeric="false"
                                :pageable-previous-next="false"
                                :pageable-messages-display="'Showing {2} data items'">
                                <kendo-grid-column 
                                    :field="'journal_date'"
                                    :title="$t('date')"
                                    :template="dateTemplate"
                                    :width="150" />
                                <kendo-grid-column 
                                    :field="'journal_type'"
                                    :title="$t('type')"
                                    :width="150" />
                                <kendo-grid-column 
                                    :field="'journal_number'"
                                    :title="$t('number')"
                                    :width="150" />
                                <kendo-grid-column 
                                    :field="'description'"
                                    :title="$t('description')"
                                    :filterable-cell-operator="'contains'"
                                    :filterable-cell-suggestion-operator="'contains'" />
                                <kendo-grid-column 
                                    :field="'amount'"
                                    :title="$t('amount')"
                                    :format="'{0:n}'"
                                    :width="150"
                                    :filterable-cell-operator="'gte'" />
                                <kendo-grid-column
                                    :command="{ text: 'Add', click: onAddBanhjiTxnClick, class: 'btn-plus' }"
                                    :title="'&nbsp;'"
                                    :width="80"
                                />
                            </kendo-grid>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>

            <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                :myLoading="true"
                type="loading"
            />
        </v-card>
    </v-container>
</template>
<script>
    import kendo from "@progress/kendo-ui";
    import Helper from "@/helper.js";
    import { i18n } from '@/i18n';
    import { 
        BankAccountModel, 
        BankStatementModel, 
        ReconcileModel, 
        AccountModel, 
        JournalModel, 
        JournalEntryModel,
        CurrencyModel,
        ExchangeRateModel,
    } from "@/scripts/model/AppModels";
    
    /* Store */
    import store from "@/store"
    const institute = store.state.institute.institute
    import { mapState } from 'vuex';

    const {
        reconcileHandler,
        journalHandler,
    } = require("@/scripts/AppHandlers");
    const { EntityType, SaveOption } = require("@/scripts/default_setup/Collections");

    export default {
        name: "BankStatementReconciliation",
        components: {
            "LoadingMe": () => import('@/components/Loading'),
            "app-datepicker": () => import('@/components/custom_templates/DatePickerComponent'),
            "app-adjustment-account-dropdownlist": () => import('@/components/dropdownlist/Account'),
        },
        props: {
            initBankStatement: {
                type: BankStatementModel,
            },
        },
        data () {
            return {
                /* Obj */
                bankAccount         : new BankAccountModel(),
                reconcile           : new ReconcileModel(),
                adjustmentJournal   : new JournalModel(),
                adjustmentEntries   : [],
                // Form validation
                valid: true,
                isEdit: false,
                alert: false,
                errorMessage: '',
                Helper              : Helper,
                user: Helper.getUser(),
                SaveOption: SaveOption,
                // Other
                exchangeRate        : new ExchangeRateModel(institute.baseCurrency),
                bankStatement       : new BankStatementModel(),
                banhjiTxnAmount     : 0,
                banhjiTransactions  : [],
                banhjiMatchedTxns   : [],
                // Kendo
                schemaFields: {
                    journal_date    : { type: "date" },
                    journal_type    : { type: "string" },
                    journal_number  : { type: "string" },
                    description     : { type: "string" },
                    amount          : { type: "number" }
                },
                // LoadingMe
                showLoading: false,
            }
        },
        methods: {
            /* Initial Data */
            initialData(){
                this.bankStatement = Object.assign({}, this.initBankStatement);
                
                this.setDefaultData();
                this.loadBanhjiTransaction();
            },
            async loadData () {
                this.showLoading = true;
                
                // Call List
                await this.$store.dispatch('banking/getBankMappings');

                // Call Bank Account
                await this.$store.dispatch('banking/getBankAccounts');

                this.showLoading = false;
            },
            /* Set default data */
            setDefaultData() {
                this.reconcile = new ReconcileModel({
                    type: EntityType.BANK_RECONCILIATION_BANK_FEEDS, 
                })
                
                // Generate Number
                this.generateNumber();

                // Get Exchange Rate
                this.getExchangeRate();
            },
            // Number
            async generateNumber() {
                if (!this.isEdit) {
                    let num = await Helper.generateAccountingNumber(this.reconcile.type, this.reconcile.date);

                    this.reconcile.number = num.number;
                    this.reconcile.prefix_format = num.prefix_format;
                }
            },
            // Get Exchange Rate
            async getExchangeRate() {
                if(this.reconcile.date && this.bankAccount.currency.code !== ''){
                    this.exchangeRate = await Helper.getLastExchangeRateByDate(this.reconcile.date, this.bankAccount.currency.code);
                }else{
                    this.exchangeRate = new ExchangeRateModel(institute.baseCurrency);
                }
            },
            /* Load BanhJi Transaction */
            async loadBanhjiTransaction () {
                this.showLoading = true;

                /* Clear */
                let ds = this.$refs.banhjiTransactionDS.kendoWidget();
                ds.filter([]);
                ds.data([]);
                
                /* Find bank account by uuid */
                this.bankAccount = this.bankAccounts.find(i=>i.uuid === this.bankStatement.bank_acc_uuid);

                /* Load journal entry detail by account uuid */
                let currentFiscalDate = Helper.getFiscalDateByDate(new Date());
                let sdate = kendo.toString(new Date(currentFiscalDate.start_date), 'yyyy-MM-dd') + 'T00:00:00.000Z',
                    edate = kendo.toString(new Date(), 'yyyy-MM-dd') + 'T23:59:59.999Z';
                
                let statements = await journalHandler.getEntryDetailByAccount(this.bankAccount.account.uuid, {
                    params: {
                        start_date 	: sdate,
                        end_date 	: edate,
                    }
                });

                this.banhjiTransactions = statements.entries_detail.filter(i=>i.is_reconciled !== 1);

                this.showLoading = false;
            },
            /* Grid Row Template */
            rowTmpl (dataItem) {
                let str = `<div>
                                ${ Helper.dateFormat(dataItem.journal_date) }
                                ${ dataItem.journal_number }
                            </div>
                            <div>
                                Amount
                                ${ Number(dataItem.amount).toLocaleString() } ${ dataItem.currency.code }
                            </div>
                            <div style="font-size: x-small;">
                                ${ dataItem.description }
                            </div>`

                return str
            },
            dateTemplate(dataItem){
                return Helper.dateFormat(dataItem.journal_date);
            },
            onBanhjiMatchedTxnDSChanges () {
                let bs = this.bankStatement,
                    ds = this.$refs.banhjiMatchedTxnDS.kendoWidget(),
                    total = 0;

                ds.data().forEach(value => {
                    total += value.amount;
                })

                this.reconcile.variance_amount = bs.amount - total;
                this.banhjiTxnAmount = total;
            },
            /* On Grid Change */
			onAddBanhjiTxnClick (e) {
                let grid = this.$refs.banhjiTransactionGrid.kendoWidget(),
                    item = grid.dataItem(kendo.jQuery(e.target).closest("tr"));
                
                this.addBanhjiTransaction(item);
            },
            /* Add Banhji Transaction */
            addBanhjiTransaction (item) {
                let grid = this.$refs.banhjiMatchedTxnGrid.kendoWidget(),
					ds = grid.dataSource;
                
                let existingItem = ds.data().filter(value => value.entry_uuid === item.entry_uuid);
                if(existingItem.length === 0){
                    ds.add(item);
                }
            },
            // Remove Row
			removeRow (e) {
				e.preventDefault();

				let grid = this.$refs.banhjiMatchedTxnGrid.kendoWidget(),
					ds = grid.dataSource,
					item = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
				
				ds.remove(item);
            },
            /* Find Best Match Transaction */
            findBestMatch () {
                // let self = this;
                let btm = this.bankTransactionMappings.find(value => value.bank_uuid === this.bankAccount.bank.uuid);
                
                let filters = [];
                btm.criteria.forEach(element => {
                    let statementValue = "",
                        journalFieldName = "";
                    
                    if(element.field2 === "statement_date"){/* Date */
                        journalFieldName = "journal_date";
                        statementValue = this.bankStatement["statement_date"];
                    }else if(element.field2 === "bank_ref"){/* Number */
                        journalFieldName = "journal_number";
                        statementValue = this.bankStatement["bank_ref"];
                    }else if(element.field2 === "debit"){/* Debit */
                        journalFieldName = "amount";
                        statementValue = Math.abs(this.bankStatement["amount"]);
                    }else if(element.field2 === "credit"){/* Credit */
                        journalFieldName = "amount";
                        statementValue = Math.abs(this.bankStatement["amount"]) * -1;
                    }else if(element.field2 === "currency"){/* Currency */
                        journalFieldName = "currency.code";
                        statementValue = this.bankStatement["currency"];
                    }else if(element.field2 === "details"){/* Detail */
                        journalFieldName = "description";
                        statementValue = element.value;
                    }

                    filters.push({
                        "field"     : journalFieldName,
                        "operator"  : element.operator,
                        "value"     : statementValue,
                    })
                })

                let ds = this.$refs.banhjiTransactionDS.kendoWidget();
                ds.filter({
                    logic: "or",
                    filters: filters
                });
            },
            // Add Journal
            addJournal() {
                let entries = [],
                    debitAccount = this.bankAccount.account,
                    creditAccount = this.reconcile.adjustment_account,
                    amount = Math.abs(this.reconcile.variance_amount);

                // Variance > 0
                if (this.reconcile.variance_amount > 0) {
                    debitAccount = this.reconcile.adjustment_account
                    creditAccount = this.bankAccount.account
                }

                // Debit Side
                entries.push(new JournalEntryModel({
                    account: debitAccount,
                    description: this.reconcile.description,
                    currency: new CurrencyModel(this.bankAccount.currency),
                    amount: amount,
                    exchange_rate_uuid: this.exchangeRate.id,
                    exchange_rate: this.exchangeRate.rate,
                }))

                // Credit Side
                entries.push(new JournalEntryModel({
                    account: creditAccount,
                    description: this.reconcile.description,
                    currency: new CurrencyModel(this.bankAccount.currency),
                    amount: amount * -1, // Credit side is negative
                    exchange_rate_uuid: this.exchangeRate.id,
                    exchange_rate: this.exchangeRate.rate,
                }))

                // Adjustment Journal
                this.adjustmentJournal.number = this.reconcile.number;
                this.adjustmentJournal.description = this.reconcile.description;
                this.adjustmentJournal.journal_date = Helper.toISODate(this.reconcile.date);
                this.adjustmentJournal.journal_type = EntityType.ADJUSTMENT;
                this.adjustmentJournal.transaction_type = this.reconcile.type;
                this.adjustmentJournal.prefix_format = this.reconcile.prefix_format;
                this.adjustmentJournal.is_draft = this.reconcile.is_draft;
                this.adjustmentJournal.created_by = this.reconcile.created_by;
                this.adjustmentJournal.modified_by = this.reconcile.modified_by;

                // Adjustment Entries
                this.adjustmentEntries = entries;
            },
            // Shrink Data
            shrinkData() {
                let ds = this.$refs.banhjiMatchedTxnDS.kendoWidget();

                // Date
                this.reconcile.date = Helper.toISODate(this.reconcile.date);
                this.reconcile.bank_statement_uuid = this.bankStatement.uuid;

                // Reconcile Entries
                let entryUuidList = [];
                ds.data().forEach(value => {
                    entryUuidList.push(value.entry_uuid);
                });
                this.reconcile.reconcile_entries = entryUuidList;

                // User
                if (this.isEdit) {
                    this.reconcile.modified_by = this.user;
                } else {
                    this.reconcile.created_by = this.user;
                }
            },
            // Validating
            validateForm() {
                let result = true, msg = '',
                    rc = this.reconcile,
                    ds = this.$refs.banhjiMatchedTxnDS.kendoWidget();

                // Matched Transactions
                if (ds.total() === 0) {
                    result = false;
                    msg += '<p>Please add a transaction.</p>';
                }

                // Adjustment Account
                if (rc.variance_amount !== 0) {
                    if (this.reconcile.adjustment_account.uuid === '') {
                        result = false;
                        msg += '<p>Please select adjustment account.</p>';
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
            onSaveOptionClick(mode) {
				if (this.$refs.form.validate() && this.validateForm()) {
					this.saveMode = mode;
					this.save();
				}
			},
            cancel() {
                this.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#4d4848',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, discard it!'
                }).then((result) => {
                    if (result.value) {
                        this.clear();
                        this.$router.go(-1);
                    }
                })
            },
            clear() {
                // Reset Form
                // this.$refs.form.reset();

                this.banhjiTxnAmount = 0;
                this.banhjiMatchedTxns = [];

                this.reconcile = new ReconcileModel();
                this.reconcile.adjustment_account = new AccountModel();
                this.adjustmentJournal = new JournalModel();
                this.adjustmentEntries = [];

                let ds = this.$refs.banhjiMatchedTxnDS.kendoWidget();
                ds.data([]);

                // New Default Data
                this.setDefaultData();
            },
            save() {
                let self = this;

                // Shrink Data
                this.shrinkData();

                // Adjustment Journal
                if (this.reconcile.variance_amount !== 0) {
                    this.addJournal();
                } else {
                    this.adjustmentJournal = new JournalModel();
                    this.adjustmentEntries = [];
                }

                // Sync Data
                this.showLoading = true;
                reconcileHandler.save({
                    reconcile: new ReconcileModel(this.reconcile),
                    adjustment_journal: new JournalModel(this.adjustmentJournal),
                    adjustment_entries: this.adjustmentEntries,
                })
                .then(function (response) {
                    self.responseStatus(response);
                })
                .catch(function (error) {
                    self.showLoading = false;
                    Helper.alertErrorMsg(error);
                })
                .finally(()=>{
                    self.showLoading = false;
                });
            },
            // Response Status
            responseStatus(response) {
                if (response.status === 200) {
                    /* Save Close or Delete Action */
                    if (this.saveMode === SaveOption.SAVECLOSE || this.saveMode === SaveOption.DELETE) {
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
        },
        watch: {
            initBankStatement: "initialData"
        },
        computed: mapState({
            bankTransactionMappings: state => state.banking.bankMappings,
            bankAccounts: state => state.banking.bankAccounts,
        }),
        created() {
            this.loadData();
        },
        mounted() {
            this.initialData();
        },
    }
</script>
<style scoped>
    @media (min-width: 1264px) {
        .container {
            max-width: 1080px !important;
        }
    }
</style>