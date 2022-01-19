<template>
    <v-row class="mx-3 white">
        <v-col sm="6" cols="12">
            <p >{{$t('updated_on')}} {{ lastUpdated }}</p>
        </v-col>
        <v-col sm="6" cols="12" >
            <v-btn to="" color="primary"
                class="white--text float-right text-capitalize ml-3 mb-3" @click="initialData">
                {{$t('fetch_new_feeds')}}
            </v-btn>
            <v-btn to="" color="primary"
                class="white--text float-right text-capitalize" @click="showImport++">
                {{$t('import')}}
            </v-btn>
        </v-col>
        <v-col sm="12" cols="12" class="pt-0" v-if="showImport % 2">
            <v-row>
                <v-col sm="9" cols="9" class="pt-0">
                    <v-file-input
                        v-model="files"
                        :placeholder="'file: xlsm, xlsx, xls...'"
                        accept=".xlsm, .xlsx, .xls"
                        prepend-icon="mdi-file">
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
                </v-col>
                <v-col sm="3" cols="3" class="pt-0">
                    <v-btn to="" color="primary"
                        class="white--text float-right text-capitalize" @click="importFile">
                        {{$t('upload')}}
                    </v-btn>
                </v-col>
            </v-row>

            <v-alert type="warning"
                    v-model="alert"
                    dismissible>
                <span style="font-size: small;" v-html="errorMessage"/>
            </v-alert>
        </v-col>
        <v-col sm="12" cols="12" class="pt-0">
            <div style="position:relative;" class="reports_table">
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    :myLoading="true"
                    type="loading"
                />
                <v-data-table
                    :headers="headers"
                    :items="bankStatements"
                    class="elevation-1"
                >
                    <!-- Date -->
                    <template v-slot:[`item.statement_date`]="{ item }">
                        <span>{{ Helper.dateFormat(item.statement_date) }}</span>
                    </template>

                    <!-- Description -->
                    <template v-slot:[`item.details`]="{ item }">
                        <p style="font-size: x-small;">{{ item.details }}</p>
                    </template>

                    <!-- Amount -->
                    <template v-slot:[`item.amount`]="{ item }">
                        <span>{{ Number(item.amount).toLocaleString() }} {{ item.currency }}</span>
                    </template>

                    <!-- Status -->
                    <template v-slot:[`item.journal_entry_uuid`]="{ item }">
                        <div v-if="item.reconcile_uuid">
                            {{$t('reconciled')}}
                        </div>
                        <div v-else>
                            <v-btn color="primary"
                                class="white--text float-right text-capitalize" 
                                @click="goReconcile(item)"
                                x-small>{{$t('Reconcile Now')}}
                            </v-btn>
                        </div>
                    </template>

                </v-data-table>
            </div>
        </v-col>
        
    </v-row>
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
        ExchangeRateModel,
    } from "@/scripts/model/AppModels";
    
    /* Store */
    import store from "@/store"
    const institute = store.state.institute.institute

    const {
        bankStatementHandler,
    } = require("@/scripts/AppHandlers");

    export default {
        name: "BankStatement",
        components: {
            "LoadingMe": () => import('@/components/Loading'),
        },
        props: {
            initBankAccount: {
                type: Object,
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
                // File upload
                files               : null,
                excelData           : [],
                excelStatements     : [],
                // Other
                lastUpdated         : new Date(),
                exchangeRate        : new ExchangeRateModel(institute.baseCurrency),
                adjustmentAccount   : new AccountModel(),
                showImport          : 0,
                showReconcileDialog : false,
                bankStatement       : null,
                bankStatements      : [],
                banhjiTxnAmount     : 0,
                banhjiTransaction   : null,
                banhjiTransactions  : [],
                banhjiMatchedTxns   : [],
                bankMappings        : [],
                headers             : [
                    { text: i18n.t('date'), value: 'statement_date' },
                    { text: i18n.t('bank_detail'), value: 'details', width: "25%" },
                    { text: i18n.t('amount'), value: 'amount' },
                    { text: i18n.t('source'), value: 'source' },
                    { text: i18n.t('status'), value: 'journal_entry_uuid' },
                ],
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
            initialData () {
                this.bankAccount = Object.assign({}, this.initBankAccount);
                this.loadBankStatement();
            },
            // Load data
			async initialize() {
				this.showLoading = true;

				/* Reset */
				store.state.banking.bankMappingLoaded = false;
				
				/* Call Bank Mapping List */
				this.bankMappings = await this.$store.dispatch('banking/getBankMappings');
				
				this.showLoading = false;
			},
            /* Load Statement */
            loadBankStatement () {
                if(this.bankAccount.uuid){
                    this.showLoading = true;
                    bankStatementHandler.getByBankAccountId(this.bankAccount.uuid)
                    .then(res => {
                        if (res.data) {
                            this.bankStatements = [];
                            
                            res.data.forEach(value => {
                                let bs = new BankStatementModel(value);
                                this.bankStatements.push(bs);
                            })
                        }
                    })
                    .finally(()=>{
                        this.showLoading = false;
                    });
                }else{
                    /* Alert Warning */
                    this.$snotify.warning(i18n.t("please_select_bank_account"));
                }
            },
            /* Import Excel */
            async importFile() {
                if(this.bankAccount.uuid){
                    if (this.files !== null) {
                        this.excelData = await Helper.getExcelData(this.files);
                        this.generateExcelData();
                    }else{
                        /* Alert Warning */
                        this.$snotify.warning(i18n.t("please_select_file"));
                    }
                }else{
                    this.$snotify.warning(i18n.t("please_select_bank_account"));
                }
            },
            /* Generate Excel Data */
            generateExcelData(){
                let bankStatementList = [],
                    excelHeaders = this.excelData[0],
                    bankRule = this.bankMappings.find(value => value.bank_uuid === this.bankAccount.bank.uuid);
                    
                this.excelData.forEach((excelElement, excelIndex) => {
                    if(excelIndex > 0){// Skip header row 0
                        let bankStatement = new BankStatementModel({
                            bank_uuid: this.bankAccount.bank.uuid,
                            bank_acc_uuid: this.bankAccount.uuid,
                            bank_acc_number: this.bankAccount.number,
                            source : 'imported',
                        });

                        // Matching by bank mapping rule
                        bankRule.criteria.forEach(rule => {
                            excelHeaders.forEach((header, headerIndex) => {
                                /* Defind Headers */
                                let excelHeader = header.trim(),
                                    ruleHeader = rule.field.trim();
                                    
                                // Matching header name
                                if(ruleHeader.includes(excelHeader)){
                                    if(rule.field2.toLowerCase() === 'statement_date'){// Date
                                        bankStatement.statement_date = Helper.toISODate(excelElement[headerIndex]);
                                        bankStatement.entry_date = bankStatement.statement_date;
                                    } else if(rule.field2.toLowerCase() === 'bank_ref'){// Number
                                        bankStatement.bank_ref = excelElement[headerIndex];
                                    } else if(rule.field2.toLowerCase() === 'details'){// Description
                                        bankStatement.details = excelElement[headerIndex];
                                    } else if(rule.field2.toLowerCase() === 'debit'){// Debit
                                        let amt = excelElement[headerIndex];

                                        if(!isNaN(amt)){// Check if number
                                            bankStatement.amount = kendo.parseFloat(Math.abs(amt));
                                        }
                                    } else if(rule.field2.toLowerCase() === 'credit'){// Credit
                                        let amt = excelElement[headerIndex];
                                        
                                        if(!isNaN(amt)){// Check if number
                                            bankStatement.amount = kendo.parseFloat(Math.abs(amt) * -1);// Credit is negative
                                        }
                                    } else if(rule.field2.toLowerCase() === 'balance'){// Balance
                                        let amt = excelElement[headerIndex];

                                        if(!isNaN(amt)){// Check if number
                                            bankStatement.balance = kendo.parseFloat(amt);
                                        }
                                    } else if(rule.field2.toLowerCase() === 'currency'){// Currency
                                        bankStatement.currency = excelElement[headerIndex];
                                    }
                                }
                            });
                        })

                        // Add bank statement
                        bankStatementList.push(bankStatement);
                    }
                    
                });

                // Bind bank statement
                this.excelStatements = bankStatementList;
                
                this.uploadStatement();
            },
            /* Validate Excel Statement */
            validateExcelStatement(){
                let result = true, msg = '';

                // Empty Excel Statement
                if(this.excelStatements.length === 0){
                    result = false;
                    msg += '<p>There is no data to import</p>';
                }else{
                    let invalidData = false;
                    this.excelStatements.forEach((value, index) => {
                        let d = new Date(value.date),
                            validDate = false, validDetail = false, validAmount = false;

                        // Date
                        if (Object.prototype.toString.call(value.date) === "[object Date]") {
                            // it is a date
                            if (isNaN(d.getTime())) {
                                // date is not valid
                            } else {
                                // date is valid
                                validDate = true;
                            }
                        }

                        // Description
                        if(value.details !== ''){
                            validDetail = true;
                        }

                        // Amount
                        if(value.amount !== 0){
                            validAmount = true;
                        }

                        // Check those require fields
                        if(validDate && validDetail && validAmount){
                            invalidData = true;
                            msg += `<p>Invalid data at row number ${index+1}</p>`;
                            
                            // Exit Loop
                            return false;
                        }
                    });

                    // Validate Data
                    if(invalidData){
                        result = false;
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
            /* Clear */
            clear () {
                this.files = null;
                this.showImport = 0;
            },
            /* Upload Statement */
            uploadStatement(){
                if(this.validateExcelStatement()){
                    let isBatch = true;
                    
                    this.showLoading = true;
                    bankStatementHandler.save(this.excelStatements, isBatch)
                        .then(function (response) {
                            this.responseStatus(response)
                        })
                        .finally(() => {
                            this.showLoading = false;
                        });
                }
            },
            responseStatus(response) {
                if (response) {
                    /* Load data */
                    this.initialData();

                    /* Clear */
                    this.clear();
                    
                    /* Alert Success */
                    this.$snotify.success(i18n.t("successful"));
                } else {
                    /* Alert Error */
                    this.$snotify.error(i18n.t("error_something_wrong"));
                }
            },
            /* Go To Reconcile */
            goReconcile(selectedItem) {
                this.$router.push({ 
                    name: 'Bank Statement Reconciliation', 
                    params: { 
                        initBankStatement: new BankStatementModel(selectedItem),
                    },
                });
            },
        },
        watch: {
            initBankAccount: "initialData",
        },
        created() {
            this.initialize();
        },
        mounted() {
            this.initialData();
        },
    }
</script>
<style scoped>
    @media (max-width: 576px) {
        .v-application p{
            margin-bottom: 0 !important;
        }
    }
</style>