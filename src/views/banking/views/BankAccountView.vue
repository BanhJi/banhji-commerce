<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{$t('bank_account')}}</h2>
                                <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right"
                                >close
                                </v-icon>
                            </v-card>
                            <v-card outlined dense class="px-5 py-3 no_border" color="whiteGreen">
                                <v-row>
                                    <v-col sm="6" cols="12" class="phone_no_pb pb-0">
                                        <label class="label">{{$t('financial_institution')}}</label>
                                        <p class="text_tip">{{$t('financial_institution_desc')}}</p>
                                        <h3 class="text-bold pb-2">ABC</h3>

                                        <label class="label">{{$t('type_of_account')}}</label>
                                        <p class="text_tip">{{$t('type_of_account_desc')}}</p>
                                        <h3 class="text-bold pb-2">VISA tyoe</h3>

                                        <label class="label">{{$t('currency')}}</label>
                                        <p class="text_tip">{{$t('currency_desc')}}</p>
                                        <h3 class="text-bold pb-2">USA</h3>
                                    </v-col>
                                    <v-col sm="6" cols="12" class="phone_no_pb pb-0">
                                        <label class="label">{{$t('account_number')}}</label>
                                        <h3 class="text-bold pb-2">AC1244</h3>

                                        <label class="label">{{$t('account_name')}}</label>
                                        <p class="text_tip">{{$t('account_name_desc')}}</p>
                                        <h3 class="text-bold pb-2">me</h3>

                                        <label class="label">{{$t('link_to_chart_acc')}}</label>
                                        <p class="text_tip">Connect to one of chart of account</p>
                                        <h3 class="text-bold pb-2">TO ABA</h3>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider class="mt-1" />
                            <v-card outlined dense class="no_border function_footer py-2">
                                <v-btn
                                class="float-right save_option mx-1 capitalize"
                                color="primary"
                                >
                                {{ $t("print") }}
                                </v-btn>
                                <v-btn
                                class="float-right mx-1 white--text capitalize"
                                color="blue"
                                >
                                {{ $t("delete") }}
                                </v-btn>
                                <v-btn
                                class="float-right mx-1 white--text capitalize"
                                color="lightBlue"
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
                    :alertText="loadingTextAlert"/>
        </v-container>
    </v-app>
</template>

<script>
    import LoadingMe from '@/components/Loading'

    /* Cookie */
    const cookieJS = require("@/cookie.js");
    const { instituteId } = cookieJS.getCookie();

    const bankHandler = require("@/scripts/bankHandler.js")
    const bankAccountHandler = require("@/scripts/bankAccountHandler.js")
    const accountHandler = require("@/scripts/handler/accounting/account.js")
    const exchangeRateHandler = require("@/scripts/exchangeRateHandler.js")
    const accountTypeCode = require("@/scripts/default_setup/AccountTypeCode.js");

    export default {
        name: "BankAccount",
        components: {
            LoadingMe
        },
        data: () => ({
            //Obj
            bankAccount: [],
            banks: [],
            currencies: [],
            accounts: [],
            // Form validation
            valid: true,
            isEdit: false,
            saveMode: '',
            showLoading: false,
            loadingAlert: false,
            loadingColorAlert: '',
            loadingTextAlert: '',
            bankAccountTypes: [],
        }),
        methods: {
            // Set default
            setDefaultData() {
                this.bankAccount = {
                    number: '',
                    name: '',
                    type: '',
                    currency: null,
                    bank: null,
                    account: null,
                    institute_id: instituteId,
                    is_deleted: 0,
                }
            },
            // Load bankAccount according to query string {id}
            loadObj() {
                let self = this

                // Access Query String
                let q = this.$route.params
                if (q.id !== undefined) {
                    // Set Edit Mode
                    this.isEdit = true

                    bankAccountHandler.getOne(q.id)
                        .then(res => {
                            if (res.data) {
                                // Bind Bank Account
                                this.bankAccount = res.data
                            }
                        })
                        .finally(function () {
                            self.showLoading = false
                        })
                } else {
                    this.isEdit = false
                }
            },
            // Number
            generateNumber() {
                this.bankAccount.number = '0001'
            },
            // All Saves
            saveNew() {
                if (this.$refs.form.validate()) {
                    this.saveMode = "saveNew"
                    this.save()
                } else {
                    this.alertError()
                }
            },
            saveClose() {
                if (this.$refs.form.validate()) {
                    this.saveMode = "saveClose"
                    this.save()
                } else {
                    this.alertError()
                }
            },
            cancel() {
                this.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#4d4848',
                    cancelButtonColor: '#ED1A3A',
                    confirmButtonText: 'Yes, reset it!'
                }).then((result) => {
                    if (result.value) {
                        this.$refs.form.reset()
                    }
                })
            },
            save() {
                let self = this

                this.showLoading = true
                // Sync Data
                bankAccountHandler.save(this.bankAccount)
                    .then(function (response) {
                        if (response) {
                            self.responseStatus(response.status)
                        } else {
                            self.alertError()
                        }
                    })
                    .catch(function (error) {
                        self.alertError(error)
                    })
                    .finally(function () {
                        self.showLoading = false
                    })
            },
            // Response Status
            responseStatus(status) {
                switch (status) {
                    case 200:// Ok
                        this.showAlert()
                        // Reset form
                        this.$refs.form.reset()

                        break
                    case 201:// Duplicate
                        this.alertError('Duplicate entry!')
                        break
                    default:
                        break
                }
            },
            // Sweetalert2
            changeAlertStatus() {
                this.loadingAlert = true
                setTimeout(() => {
                    this.loadingAlert = false
                }, 6200);
            },
            showAlert() {
                this.showLoading = false
                this.changeAlertStatus()
                this.loadingTextAlert = "Added Successful"
                this.loadingColorAlert = "#3DA72E"
                switch (this.saveMode) {
                    case 'saveClose':// Save Close
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
                        window.history.go(-1)
                        break
                    default:// Save New
                        // this.$swal({
                        // 	position: 'products',
                        // 	icon: 'success',
                        // 	title: 'Your work has been saved',
                        // 	showConfirmButton: false,
                        // 	timer: 1500
                        // })
                        break
                }
                this.saveMode = ''
            },
            alertError(msg) {
                if (msg) {
                    // Code here
                } else {
                    msg = 'Something went wrong!';
                }
                this.showLoading = false
                this.loadingTextAlert = "Failed!"
                this.loadingColorAlert = "#eb8334"
                this.changeAlertStatus()
                // this.$swal({
                // 	position: 'products',
                // 	icon: 'error',
                // 	title: 'Oops...!',
                // 	text: msg,
                // 	showConfirmButton: true
                // })
            },
        },
        watch: {
            // call again the method if the route changes
            '$route': 'loadObj'
        },
        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            this.loadObj()
        },
        mounted() {
            // Set default
            this.setDefaultData()

            // Call Account List
            accountHandler.getAll()
                .then(res => {
                    if (res) {
                        this.accounts = res.data.filter(item => ~accountTypeCode.CASH_ACCOUNTS.indexOf(item.account_type.number)) // Cash Account
                    }
                })

            // Bank
            bankHandler.getAll()
                .then(res => {
                    if (res) {
                        this.banks = res.data
                    }
                })

            // Currency
            exchangeRateHandler.getCurrencyList()
                .then(res => {
                    if (res.data) {
                        this.currencies = Object.values(res.data)
                    }
                })
        }
    };
</script>

<style scoped>
    .function_content {
        padding: 0 25px 25px;
        border-bottom: 0;
    }

    @media (min-width: 1264px) {
        .container {
            /* max-width: 1185px; */
            max-width: 1080px !important;
        }
    }

    @media (max-width: 576px) {
        ..mb-6 {
            margin-bottom: 0 !important;
        }
    }
</style>