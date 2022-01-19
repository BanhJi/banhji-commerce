<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-card outlined dense class="no_border">
                            <h2 class="mb-0">{{ $t("bank_reconciliation_bank_feeds") }}</h2>
                            <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                            >close
                            </v-icon>
                        </v-card>

                        <v-row>
                            <v-col sm="4" cols="12" class="pb-0">
                                <v-card outlined dense class="px-4 py-3 no_border mb-3" height="365" color="grayBg">
                                    <label class="label">{{$t('financial_institution')}}</label>
                                    <v-select class=" mb-3"
                                        @change="onBankChanges"
                                        v-model="bank"
                                        :items="banks"
                                        item-value="uuid"
                                        item-text="name"
                                        placeholder="Select Financial Institution"
                                        outlined />

                                    <label class="label">{{$t('bank_account')}}</label>
                                    <v-select class=" mb-3"
                                        :disabled="bank === null"
                                        :items="bankAccounts"
                                        item-value="uuid"
                                        item-text="number"
                                        v-model="bankAccount"
                                        placeholder="Select Bank Account"
                                        return-object
                                        outlined
                                        required >
                                        <template slot='selection' slot-scope='{ item }'>
                                            {{ item.number }} ({{ item.currency.code }})
                                        </template>
                                        <template slot='item' slot-scope='{ item }'>
                                            {{ item.number }} ({{ item.currency.code }})
                                        </template>
                                    </v-select>

                                    <label class="label">{{ $t("reconcile_date") }}</label>
                                    <v-row>
                                        <v-col sm="3" cols="12" class="pb-0">
                                            <h3 class="mt-2">{{ $t("from") }}</h3>
                                        </v-col>
                                        <v-col sm="9" cols="12" class="py-0">
                                            <app-datepicker
                                                :initialDate="reconcile.start_date"
                                                @emitDate="reconcile.start_date = $event"
                                            />
                                        </v-col>
                                    </v-row>
                                    <v-row class="">
                                        <v-col sm="3" cols="12" class="py-0 pt-n3">
                                            <h3 class="mt-5">{{ $t("to") }}</h3>
                                        </v-col>
                                        <v-col sm="9" cols="12" class="py-0 pt-n3">
                                            <app-datepicker
                                                :initialDate="reconcile.end_date"
                                                @emitDate="reconcile.end_date = $event"
                                            />
                                        </v-col>
                                    </v-row>
                                    <v-col sm="12" cols="12" class="text-center py-0">
                                        <v-btn 
                                            :disabled="bankAccount === null"
                                            outlined width="150" 
                                            class="primary white--text text-capitalize " 
                                            @click="getData">{{$t('get_data')}}
                                        </v-btn>
                                    </v-col>
                                </v-card>
                            </v-col>
                            <v-col sm="8" cols="12" class="pb-0">
                                <v-card outlined dense class="px-4 no_border pb-4" height="365" color="grayBg">
                                    <v-row>
                                        <v-col sm="6" cols="12" class="pb-0">
                                            <label class="label">{{ $t("reconcile_date") }}</label>
                                            <app-datepicker
                                                    :initialDate="reconcile.ending_balance_date"
                                                    @emitDate="reconcile.ending_balance_date = $event"
                                            />
                                        </v-col>
                                        <v-col sm="6" cols="12" class="pb-0">
                                            <label class="label">{{ $t("number") }}</label>
                                            <v-row>
                                                <v-col sm="2" cols="3" class="pl-0 pr-0">
                                                    <div class="code_text" v-text="reconcile.abbr"></div>
                                                </v-col>
                                                <v-col sm="8" cols="7" class="pl-0">
                                                    <v-text-field class=" custom-border"
                                                                  v-model="reconcile.number"
                                                                  outlined
                                                                  :rules="[v => !!v || 'Number is required']"
                                                                  required/>
                                                </v-col>
                                                <v-col sm="2" cols="2" class="pl-0">
                                                    <v-icon color="black" size="30" class="border_qrcode"
                                                            @click="generateNumber">mdi-qrcode
                                                    </v-icon>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-row >
                                        <v-col sm="6" cols="12" class="pt-0">
                                            <v-card outlined dense class="pa-4 no_border text-center primary--text" color="white">
                                                <h3 style="font-size: 25px"  class="mb-3">{{ Number(reconcile.opening_balance).toLocaleString() }}</h3>
                                                <p class="mb-0 text-uppercase">{{$t('bank_ending_balance')}}</p>
                                            </v-card>
                                        </v-col>
                                        <v-col sm="6" cols="12" class="pt-0">
                                            <v-card outlined dense class="pa-4 text-center no_border white--text" color="primary">
                                                <h3 style="font-size: 25px" class="mb-3">{{ Number(reportingEndingBalance).toLocaleString() }}</h3>
                                                <p class="mb-0 text-uppercase">{{$t('reported_ending_balance')}}</p>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col sm="6" cols="12" class="py-0">
                                            <label class="label text-uppercase">{{ $t("variant") }}</label>
                                            <v-text-field class="mt-1"
                                                v-model="reconcile.variance_amount"
                                                outlined
                                                required />
                                        </v-col>
                                        <v-col sm="6" cols="12" class="py-0">
                                            <label class="label">{{ $t("adjustment_account") }}</label>
                                            <v-select class=" mb-3 mt-3"
                                                    :disabled="reconcile.variance_amount === 0"
                                                    v-model="adjustmentAccount"
                                                    :items="adjustmentAccounts"
                                                    item-value="number"
                                                    item-text="name"                                                    
                                                    no-data-text="No data found."
                                                    placeholder="Select Adjustment Account"
                                                    return-object
                                                    outlined
                                                >
                                                    <!-- <template slot='selection' slot-scope='{ item }'>
                                                        {{ item.number }} - {{ item.name }}
                                                    </template> -->
                                                    <template slot='item' slot-scope='{ item }'>
                                                        {{ item.number }} - {{ item.name }}
                                                    </template>
                                                </v-select>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>

                        <br>

                        <v-row>
                            <v-col sm="12" cols="12" class="">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>From Bank</th>
                                            <th colspan="2">Matched</th>
                                            <th>From BanhJi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <v-text-field class=" custom-border"
                                                    v-model="searchBankTxnValue"
                                                    @change="searchBankTxn"
                                                    placeholder='search...'
                                                    outlined />
                                                <kendo-listbox id="bankTxnListBox"
                                                    ref="bankTxnListBox"
                                                    :data-source="bankTransactions"
                                                    :data-text-field="'transactionType'"
                                                    :data-value-field="'uuid'"
                                                    :template="bankListBoxTmpl"
                                                    :connect-with="'bankReconciledListBox'"
                                                    :drop-sources="['bankReconciledListBox']"
                                                    :draggable="true">
                                                </kendo-listbox>
                                            </td>
                                            <td>
                                                <kendo-listbox id="bankReconciledListBox"
                                                    ref="bankReconciledListBox"
                                                    :connect-with="'bankTxnListBox'"
                                                    :drop-sources="['bankTxnListBox']"
                                                    :data-text-field="'transactionType'"
                                                    :data-value-field="'uuid'"
                                                    :template="bankListBoxTmpl"
                                                    :draggable="true"
                                                    style="height:280px;">
                                                </kendo-listbox>
                                            </td>
                                            <td>
                                                <kendo-listbox id="banhjiReconciledListBox"
                                                    ref="banhjiReconciledListBox"
                                                    :connect-with="'banhjiTxnListBox'"
                                                    :drop-sources="['banhjiTxnListBox']"
                                                    :data-text-field="'journal_type'"
                                                    :data-value-field="'entry_uuid'"
                                                    :template="banhjiListBoxTmpl"
                                                    :draggable="true"
                                                    style="height:280px;">
                                                </kendo-listbox>
                                            </td>
                                            <td>
                                                <v-text-field class=" custom-border"
                                                    v-model="searchBanhjiTxnValue"
                                                    @change="searchBanhjiTxn"
                                                    placeholder='search...'
                                                    outlined />
                                                <kendo-listbox id="banhjiTxnListBox"
                                                    ref="banhjiTxnListBox"
                                                    :data-source="banhjiTransactions"
                                                    :data-text-field="'journal_type'"
                                                    :data-value-field="'entry_uuid'"
                                                    :template="banhjiListBoxTmpl"
                                                    :connect-with="'banhjiReconciledListBox'"
                                                    :drop-sources="['banhjiReconciledListBox']"
                                                    :draggable="true">
                                                </kendo-listbox>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </v-col>
                        </v-row>

                        <v-divider/>

                        <v-card outlined dense class="no_border function_footer">
                            <v-alert type="warning"
                                     v-model="alert"
                                     dismissible>
                                <span v-html="errorMessage"/>
                            </v-alert>
                            <v-menu>
                                <template v-slot:activator="{ on }">
                                    <v-btn color="black" outlined
                                           class="mr-2 text-capitalize  black--text float-left" v-on="on">
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
                            <v-btn color="black" outlined class="text-capitalize  black--text float-left"
                                   @click="cancel">{{$t('cancel')}}
                            </v-btn>
                            <v-btn color="primary" class="ml-2 float-right text-capitalize  white--text">
                                {{$t('reconcile')}}
                            </v-btn>
                            <v-btn color="primary" class=" float-right text-capitalize  white--text">
                                {{$t('save_for_later')}}
                            </v-btn>
                        </v-card>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    import kendo from "@progress/kendo-ui"
    import DatePickerComponent from "@/components/custom_templates/DatePickerComponent"
    import helper from "@/helper.js"
    import { ReconcileModel, JournalModel, JournalEntryModel } from "@/scripts/model/AppModels"
    import {
        accountHandler,
        journalHandler,
        bankHandler,
        bankAccountHandler,
        reconcileHandler,
    } from "@/scripts/AppHandlers"

    /* Store */
    import store from "@/store"
    const institute = store.state.institute.institute

    const instituteId = institute.id
    const CryptoJS = require("crypto-js")

    export default {
        name: "BankReconcilliationBankFeeds",
        components: {
            "app-datepicker": DatePickerComponent,
        },
        data: () => ({
            reconcile       : [],
            journal         : [],
            journal_entries : [],
            // LoadingMe
            showLoading: false,
            loadingAlert: false,
            loadingColorAlert: "",
            loadingTextAlert: "",
            // Form validation
            valid: true,
            isEdit: false,
            saveMode: "",
            alert: false,
            errorMessage: "",
            reportingEndingBalance  : 0,
            bank                : null,
            banks               : [],
            bankAccount         : null,
            bankAccounts        : [],
            bankAccountList     : [],
            adjustmentAccount   : null,
            adjustmentAccounts  : [],
            templates           : [],
            searchBankTxnValue  : '',
            searchBanhjiTxnValue: '',
            bankRules           : [],
            bankTransactions    : [],
            banhjiTransactions  : [],
        }),
        methods: {
            // Set default data
            setDefaultData() {
                this.reconcile = new ReconcileModel({
                    start_date  : new Date().toISOString().substr(0, 10),
                    end_date    : new Date().toISOString().substr(0, 10), 
                })
                this.reconcile.abbr = 'BF'

                // Generate Number
                this.generateNumber();
            },
            // Load journal according to query string {id}
            loadObj() {
                let self = this;

                // Access Query String
                let q = this.$route.params;
                if (q.id !== undefined) {
                    // Set Edit Mode
                    this.isEdit = true;

                    this.showLoading = true;
                    journalHandler
                        .getOne(q.id)
                        .then((res) => {
                            // Bind Obj
                            if (res) {
                                let j = new JournalModel(res)

                                // Number
                                let numberSplited = j.number.split("-")
                                if (numberSplited.length > 0) {
                                    j.abbr = numberSplited[0]
                                    j.number = numberSplited[1]
                                }

                                // Advance Settlement
                                this.journal = j
                            }
                        })
                        .finally(() => {
                            self.showLoading = false;
                        });
                } else {
                    this.isEdit = false;
                }
            },
            /* Kendo */
            // Row Number Template
            rowNumberTmpl(dataItem) {
                let ds = this.$refs.dataSource.kendoWidget(),
                    index = ds.indexOf(dataItem)

                return index + 1
            },
            bankTransactionTmpl(dataItem) {
                let tmpl = `<table><tr><td>${ dataItem.transaction_date }
                                            ${ dataItem.code }
                                            ${ dataItem.name }
                            </td></tr></table>`

                return tmpl
            },
            banhJiTransactionTmpl(dataItem) {
                let tmpl = `<table><tr><td>${ dataItem.transaction_date }
                                            ${ dataItem.code }
                                            ${ dataItem.name }
                            </td></tr></table>`

                return tmpl
            },
            bankListBoxTmpl (e) {
                let template = kendo.template(`#=sk#
                                                #=transactionType#
                                                #=amount#
                                                #=currency#
                                            `)
                return template(e)
            },
            banhjiListBoxTmpl (e) {
                let template = kendo.template(`#=journal_date#
                                                #=journal_number#
                                                #=journal_type#
                                                #=amount#
                                            `)
                return template(e)
            },
            // Search
            searchBankTxn () {
                let listBox = this.$refs.bankTxnListBox.kendoWidget()

                listBox.dataSource.filter({ field: "transactionType", operator: "contains", value: this.searchBankTxnValue })
            },
            searchBanhjiTxn () {
                let listBox = this.$refs.banhjiTxnListBox.kendoWidget()

                listBox.dataSource.filter({ field: "journal_type", operator: "contains", value: this.searchBanhjiTxnValue })
            },
            // Matching
            matching () {
                let rule = this.bankRules,
                    bankTxns = this.bankTransactions
                    // banhjiTxns = this.bankTransactions

                let dataSource = new kendo.data.DataSource({
                    data: bankTxns,
                    filter: {
                        // leave data items which are "Food" or "Tea"
                        logic: rule.condition,
                        filters: [
                            { field: "category", operator: "eq", value: "Food" },
                            { field: "name", operator: "eq", value: "Tea" }
                        ]
                    }
                })
                dataSource.fetch(function(){
                    let view = dataSource.view()
                    window.console.log(view.length); // displays "2"
                    window.console.log(view[0].amount); // displays "Tea"
                    window.console.log(view[1].amount); // displays "Ham"
                });
            },
            // On Bank Change
            onBankChanges () {
                let bankId = this.bank

                this.bankAccounts = []
                if(bankId !== null){
                    this.bankAccounts = this.bankAccountList.filter(value => value.bank.uuid === bankId)
                }
            },
            // Number
            generateNumber () {
                this.reconcile.number = new Date().getTime()
            },
            // Get Data
            getData () {
                let ba = this.bankAccount,
                    rc = this.reconcile,
                    sdate = rc.start_date,
                    edate = rc.end_date
                    
                if (sdate && edate) {
                    sdate = kendo.toString(new Date(sdate), 'yyyy-MM-dd') + 'T00:00:00.000Z'

                    edate = new Date(edate)
                    edate = kendo.toString(edate, 'yyyy-MM-dd') + 'T23:59:59.999Z'
                } else {
                    sdate = 0
                    edate = 0
                }

                reconcileHandler.getBankFeed(ba.account.uuid, {
                    params: {
                        start_date 	: sdate,
                        end_date 	: edate,
                    }
                })
                .then(res => {
                    this.bankTransactions = res.bankTxns
                    this.bankRules = res.bankRules
                    this.banhjiTransactions = res.banhjiTxns.entries_detail
                })
            },
            // Add Journal
            addJournal() {
                let j = this.journal,
                    je = []

                // Settlement on Dr
                je.push(
                    new JournalEntryModel({
                        account             : [],
                        primary_contact     : {},
                        secondary_contact   : {},
                        description         : j.description,
                        ref_number          : "",
                        amount              : 0,
                        currency            : {},
                        exchange_rate       : 1,
                        exchanged_amount    : 0,
                    })
                )

                j.journal_entries = je
            },
            // Shrink Data
            shrinkData() {
                let j = this.journal;

                // Number combine abbr + number
                j.number = j.abbr + "-" + j.number;

                // Journal Date
                j.journal_date = helper.toISODate(j.journal_date);

                // Filter cash_advance_uuid
                j.cash_advance = j.cash_advance.uuid;

                // User
                let user = {
                    uuid: institute.creator,
                    user_name: institute.legalName, //change later (fullname)
                    cognitoId: institute.sk,
                    email: institute.email,
                };
                if (this.isEdit) {
                    j.modified_by = user;
                } else {
                    j.created_by = user;
                }
            },
            // Validating
            validateForm() {
                let result = true,
                    msg = "";

                // Cash Account
                if (kendo.parseFloat(this.received_amount) > 0 || this.remaining < 0) {
                    if (this.cashAccount === null) {
                        msg += "<p>Please select cash account</p>";
                        result = false;
                    }
                }

                // Show Alert
                this.errorMessage = msg;
                if (result === false) {
                    this.alert = true;
                }

                return result;
            },
            // Validate Closing Date
            validateClosingDate() {
                let today = new Date();
                let objDate = new Date(this.journal.journal_date)
                    .toISOString()
                    .substr(0, 10);

                // Approved Reporting Date
                if (new Date(objDate) < new Date(institute.fishScaleDate)) {
                    if (today <= new Date(institute.afterClosingDatePeriod)) {
                        this.save();
                    } else {
                        this.alertError(
                            "Sorry, you can not save this transaction. Please contact your Admin."
                        );
                    }
                } else {
                    // Closing Date
                    if (
                        new Date(objDate) <= new Date(institute.closingDate) &&
                        institute.closingStatus === 1
                    ) {
                        this.$swal({
                            title: "Please Enter Password!",
                            icon: "warning",
                            input: "password",
                            inputPlaceholder: "Password...",
                            inputAttributes: {
                                autocapitalize: "off",
                                autocorrect: "off",
                            },
                            showCancelButton: true,
                            confirmButtonText: "Submit",
                            showLoaderOnConfirm: true,
                            preConfirm: (password) => {
                                // Decrypt (Password, Key)
                                let pswInBytes = CryptoJS.AES.decrypt(
                                    institute.closingDatePassword,
                                    instituteId
                                );
                                let originalPsw = pswInBytes.toString(CryptoJS.enc.Utf8);

                                // Compare Password
                                if (password === originalPsw) {
                                    this.save();
                                } else {
                                    this.$swal.showValidationMessage("Password Does Not Macth!");
                                }
                            },
                            allowOutsideClick: () => !this.$swal.isLoading(),
                        });
                    } else {
                        this.save();
                    }
                }
            },
            // All Saves
            onSaveOptionClick(mode) {
                if (this.$refs.form.validate() && this.validateForm()) {
                    this.saveMode = mode;
                    this.validateClosingDate();
                } else {
                    this.alertError();
                }
            },
            cancel() {
                this.$swal({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#4d4848",
                    cancelButtonColor: "#ED1A3A",
                    confirmButtonText: "Yes, discard it!",
                }).then((result) => {
                    if (result.value) {
                        this.clear();
                        this.$router.go(-1);
                    }
                });
            },
            clear() {
                // Reset Form
                this.$refs.form.reset();

                this.employee = null;

                // Datasoure
                let ds = this.$refs.dataSource.kendoWidget();
                ds.data([]);

                // Set default data
                this.setDefaultData();
            },
            save() {
                let self = this,
                    j = this.journal;

                // Add Journal
                this.addJournal();

                // Draft Mode
                if (this.saveMode === "saveDraft") {
                    j.is_draft = 1;
                } else {
                    j.is_draft = 0;
                }

                // Shrink Data
                this.shrinkData();

                // Sync Data
                this.showLoading = true;
                journalHandler
                    .save(this.journal)
                    .then((response) => {
                        if (response) {
                            self.responseStatus(response.status);
                        } else {
                            self.alertError();
                        }
                    })
                    .catch((error) => {
                        self.alertError(error);
                    });
            },
            // Response Status
            responseStatus(status) {
                switch (status) {
                    case 200: // Ok
                        this.showAlert();

                        // Reset to default data
                        this.clear();

                        break;
                    case 201: // Duplicate
                        this.alertError("Duplicate entry!");
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
                        this.$router.go(-1);
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
                        break;
                }
                this.saveMode = "";
            },
            alertError(msg) {
                if (msg) {
                    this.$swal({
                        position: "center",
                        icon: "error",
                        title: "Oops...!",
                        text: msg,
                        showConfirmButton: true,
                    });
                } else {
                    this.showLoading = false;
                    this.loadingTextAlert = "Failed!";
                    this.loadingColorAlert = "#eb8334";
                    this.changeAlertStatus();
                }
            },
        },
        watch: {
            // call again the method if the route changes
            $route: "loadObj",
        },
        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            this.loadObj()
        },
        mounted() {
            // Set default data
            this.setDefaultData()

            // Call Bank List
            bankHandler.getAll()
			.then(res => {
				if(res){
                    this.banks = res.data
				}
            })

            // Call Bank Account List
            bankAccountHandler.getAll()
            .then(res => {
                if(res){
                    this.bankAccountList = res.data
                }
            })

            // Call Account List
            accountHandler.getAll()
            .then(res => {
                if (res) {
                    this.adjustmentAccounts = res.data
                }
            })
        },
    };
</script>

<style scoped>



    @media (min-width: 1264px) {
        .container {
            max-width: 1080px !important;
        }
    }

    table{
        border-collapse: collapse;
    }
    table thead tr th{
        border-top: 1px solid #000000;
        border-bottom: 1px solid #000000;
        border-left: 1px solid #000000;
        border-right: 1px solid #000000;
    }
</style>
