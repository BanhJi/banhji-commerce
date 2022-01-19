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
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <div class="function_header">
                                <h2 class="mb-0">Cash {{$t('account')}}</h2>
                                <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close
                                </v-icon>
                            </div>

                            <div class="function_content">
                                <v-row>
                                    <v-col sm="6" cols="12" class="phone_no_pb pb-0">
                                        <label class="label">{{$t('account_type')}}</label>
                                        <p class="text_tip">{{$t('account_sub_label1_in_add_account')}}</p>
                                        <h3 class="text-bold pb-2">Accountant tyoe</h3>

                                        <label class="label">{{$t('account_group_opt')}}</label>
                                        <p class="text_tip">{{$t('account_sub_label2_in_add_account')}}</p>
                                        <h3 class="text-bold  pb-2">Options</h3>
                                        
                                        <label class="label">{{$t('sub_account')}}</label>
                                        <p class="text_tip">{{$t('account_sub_label3_in_add_account')}}</p>
                                        <h3 class="text-bold pb-2">Sub Account</h3>

                                        <label class="label">{{$t('description')}}</label>
                                        <h3 class="text-bold pb-2">Description</h3>

                                    </v-col>
                                    <v-col sm="6" cols="12" class="">
                                        <label class="label">{{$t('account_number')}}</label>
                                        <p class="text_tip">{{$t('account_sub_label4_in_add_account')}}</p>
                                        <h3 class="text-bold pb-2">n343434</h3>

                                        <label class="label">{{$t('account_name')}}</label>
                                        <p class="text_tip">{{$t('account_sub_label5_in_add_account')}}</p>
                                        <h3 class="text-bold pb-2">Account name</h3>

                                        <label class="label">{{$t('description')}}</label>
                                        <p class="text_tip">{{$t('account_sub_label6_in_add_account')}}</p>
                                        <h3 class="text-bold pb-2">Description</h3>

                                        <v-checkbox class="ma-0 "
                                            v-model="cashAccount.is_taxable"
                                            :label="$t('taxable')"
                                            false-value="0"
                                            true-value="1"
                                        />

                                        <div v-if="cashAccount.is_taxable">
                                            <label class="label">{{$t('account_sub_label7_in_add_account')}}</label>
                                            <v-select class=" mb-3 mt-1"
                                                :items="taxes"
                                                no-data-text="No data found."
                                                return-object
                                                tage="Please select applicable tax"
                                                clearable
                                                outlined
                                            />
                                        </div>

                                    </v-col>
                                </v-row>
                            </div>

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
<!--testing with git branch-->
<script>
    import LoadingMe from '@/components/Loading'

    /* Cookie */
    const cookieJS = require("@/cookie.js");
    const { instituteId } = cookieJS.getCookie();

    const accountHandler = require("@/scripts/handler/accounting/account.js")
    const accountTypeHandler = require("@/scripts/handler/accounting/accountType.js")
    const accountGroupHandler = require("@/scripts/handler/accounting/accountGroup.js")
    const accountTypeCode = require("@/scripts/default_setup/AccountTypeCode.js");

    export default {
        name: "CashAccount",
        components: {
            LoadingMe
        },
        data: () => ({
            //Obj
            cashAccount         : [],
            accountTypes        : [],
            parentAccounts      : [],
            accountGroups       : [],
            taxes               : [],
            // Form validation
            valid               : true,
            isEdit              : false,
            saveMode            : '',
            showLoading         : false,
            loadingAlert        : false,
            loadingColorAlert   : '',
            loadingTextAlert    : '',
        }),
        methods: {
            // Set default
            setDefaultData () {
                this.cashAccount = {
                    number          : '',
                    name            : '',
                    description     : '',
                    is_taxable      : 0,
                    status          : 1,
                    institute       : instituteId,
                    account_type    : undefined,
                    account_group   : undefined,
                    parent_account  : undefined,
                }
            },
            // Load cashAccount according to query string {id}
            loadObj() {
                let self = this

                // Access Query String
                let q = this.$route.params
                if (q.id !== undefined) {
                    // Set Edit Mode
                    this.isEdit = true

                    accountHandler.getOne(q.id)
                    .then(res => {
                        if(res.data){
                            // Bind Obj
                            this.cashAccount = res.data

                            let accountTypeNumber = this.cashAccount.account_type.number
                            accountGroupHandler.getByAccountType(accountTypeNumber)
                            .then(res => {
                                if (res.data.length > 0) {
                                    this.accountGroups = res.data
                                }
                            })

                            // Parent Account by Account Type
                            accountHandler.getByAccountType(accountTypeNumber)
                            .then(res => {
                                if (res.data.length > 0) {
                                    this.parentAccounts = res.data
                                }
                            })
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
                let ca = this.cashAccount

                if (ca.account_type !== undefined && ca.parent_account !== undefined) {
                    ca.number = ca.parent_account.number
                } else if (ca.account_type !== undefined) {
                    ca.number = ca.account_type.number
                }
            },
            // On Account Type Changes
            onAccountTypeChanges() {
                let ca = this.cashAccount

                // Clear data
                this.accountGroups = []
                this.parentAccounts = []
                ca.account_group = undefined
                ca.parent_account = undefined

                let accountTypeNumber = ca.account_type.number
                // Account Group by Account Type
                accountGroupHandler.getByAccountType(accountTypeNumber)
                .then(res => {
                    if (res.data.length > 0) {
                        this.accountGroups = res.data
                    }
                })

                // Parent Account by Account Type
                accountHandler.getByAccountType(accountTypeNumber)
                .then(res => {
                    if (res.data.length > 0) {
                        this.parentAccounts = res.data
                    }
                })
            },
            // Shrink Data
            shrinkData() {
                let ca = this.cashAccount,
                    pa = ca.parent_account,
                    ag = ca.account_group

                // Parent Account
                if (pa !== undefined) {
                    ca.parent_account = {
                        uuid: pa.uuid,
                        number: pa.number,
                        name: pa.name,
                    }
                }
                // Account Group
                if (ag !== undefined) {
                    ca.account_group = {
                        uuid: ag.uuid,
                        name: ag.name,
                    }
                }
            },
            // All Saves
            saveNew() {
                if (this.$refs.form.validate()) {
                    this.saveMode = "saveNew";
                    this.save();
                } else {
                    this.alertError();
                }
            },
            saveClose() {
                if (this.$refs.form.validate()) {
                    this.saveMode = "saveClose";
                    this.save();
                } else {
                    this.alertError();
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
                    confirmButtonText: 'Yes, discard it!'
                }).then((result) => {
                    if (result.value) {
                        this.$refs.form.reset()
                        this.$router.go(-1)
                    }
                })
            },
            save() {
                // Shrink Data
                this.shrinkData()

                let self = this
                
                this.showLoading = true
                // Sync Data
                accountHandler.save(this.cashAccount)
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
            },
            // Response Status
            responseStatus(status) {
                switch (status) {
                    case 200:// Ok
                        this.showAlert();
                        // Reset form
                        this.$refs.form.reset();

                        break;
                    case 201:// Duplicate
                        this.alertError('Duplicate entry!');
                        break;
                    default:
                        break;
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
                        this.$router.go(-1)
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
		created () {
			// fetch the data when the view is created and the data is
			// already being observed
			this.loadObj()
		},
        mounted() {
            // Set default
            this.setDefaultData()

            // Call Account Type
            accountTypeHandler.getAll()
            .then(res => {
                this.accountTypes = res.filter(item => ~accountTypeCode.CASH_ACCOUNTS.indexOf(item.number)) // Cash Account Type
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
    .text_tip{
        margin-bottom: 0px !important;
    }
</style>