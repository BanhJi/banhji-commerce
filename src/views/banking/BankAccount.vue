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
                                        <app-bank-dropdownlist
                                            :initBank="bankAccount.bank"
                                            @emitBank="bankAccount.bank = $event"
                                        />

                                        <label class="label">{{$t('type_of_bank_account')}}</label>
                                        <p class="text_tip">{{$t('type_of_account_desc')}}</p>
                                        <app-bank-account-type-dropdownlist
                                            :initBankAccountTypeId="bankAccount.bank_account_type_uuid"
                                            @emitBankAccountTypeId="bankAccount.bank_account_type_uuid = $event"
                                        />

                                        <label class="label">{{$t('currency')}}</label>
                                        <p class="text_tip">{{$t('currency_desc')}}</p>
                                        <app-currency-dropdownlist
                                            :initCurrency="bankAccount.currency"
                                            @emitCurrency="bankAccount.currency = $event"
                                        />
                                    </v-col>
                                    <v-col sm="6" cols="12" class="phone_no_pb pb-0">
                                        <label class="label">{{$t('account_number')}}</label>
                                        <p class="text_tip">{{$t('account_number_desc')}}</p>
                                        <v-text-field class=" mb-3"
                                                      :counter="6"
                                                      :rules="[v => !!v || $t('number_required') ,v => (v && v.length > 5) || $t('number_must_least_6')]"
                                                      v-model="bankAccount.number"
                                                      outlined
                                                      tage="Account Number"
                                                      required
                                        />

                                        <label class="label">{{$t('account_name')}}</label>
                                        <p class="text_tip">{{$t('account_name_desc')}}</p>
                                        <v-text-field class=" mb-3"
                                                      :rules="[v => !!v || $t('acc_name_required')]"
                                                      v-model="bankAccount.name"
                                                      outlined
                                                      tage="Account Name"
                                                      required
                                        />

                                        <label class="label">{{$t('link_to_chart_acc')}}</label>
                                        <p class="text_tip">Connect to one of chart of account</p>
                                        <app-cash-account-dropdownlist
                                            :initAccount="bankAccount.account"
                                            @emitAccount="bankAccount.account = $event"
                                        />
                                    </v-col>
                                </v-row>
                            </v-card>

                            <v-divider class="mt-4"/>
                            <v-card  dense class="no_border function_footer">
                                <v-btn color="black"
                                       outlined
                                       class="text-capitalize  black--text float-left" @click="cancel">{{$t('cancel')}}</v-btn>
                                <v-btn color="primary"
                                       class="ml-2 float-right text-capitalize  white--text" @click="onSaveOptionClick(SaveOption.SAVECLOSE)">{{$t('save_close')}}
                                </v-btn>
                                <v-btn color="secondary"
                                       class="float-right white--text text-capitalize " v-if="!isEdit" @click="onSaveOptionClick(SaveOption.SAVENEW)">
                                    {{$t('save_new')}}
                                </v-btn>
                            </v-card>
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
    import {i18n} from '@/i18n';
    import Helper from "@/helper.js";
    import BankAccountModel from "@/scripts/model/banking/BankAccount.js";
    
    const bankAccountHandler = require("@/scripts/bankAccountHandler.js");
    const { SaveOption } = require("@/scripts/default_setup/Collections");

    export default {
        name: "BankAccount",
        components: {
            "LoadingMe": () => import('@/components/Loading'),
            "app-bank-dropdownlist": () => import('@/components/dropdownlist/Bank'),
			"app-bank-account-type-dropdownlist": () => import('@/components/kendo_templates/BankAccountTypeDropDownList'),
            "app-currency-dropdownlist": () => import('@/components/dropdownlist/Currency'),
            "app-cash-account-dropdownlist": () => import('@/components/dropdownlist/CashAccount'),
		},
        data: () => ({
            //Obj
            bankAccount: new BankAccountModel(),
            user: Helper.getUser(),
            // Form validation
            valid: true,
            isEdit: false,
            saveMode: '',
            SaveOption: SaveOption,
            // Loading Me
            showLoading: false,
            loadingAlert: false,
            loadingColorAlert: '',
            loadingTextAlert: '',
        }),
        methods: {
            // Set default
            setDefaultData() {
                this.isEdit = false;
                this.bankAccount = new BankAccountModel();
                window.console.log(11, this.bankAccount)
            },
            /* Load Object */
            async loadObj() {
                let self = this;

                // Access Query String
                let q = this.$route.params;
                if (q.id !== undefined) {
                    if(q.id !== this.bankAccount.uuid){
                        this.isEdit = true;
                        this.showLoading = true;
                        bankAccountHandler.getOne(q.id)
                            .then(res => {
                                // Bind Obj
                                this.bankAccount = res.data;
                            })
                            .finally(function() {
                                self.showLoading = false;
                            });
                    }
                }
            },
            // All Saves
            onSaveOptionClick(mode) {
				if (this.$refs.form.validate()) {
					this.saveMode = mode;
					this.save();
				}
			},
            clear () {
                this.saveMode = '';
                this.bankAccount = null;
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
                        this.clear();
                        this.setDefaultData();
                        this.$router.go(-1);
                    }
                })
            },
            save() {
                // User
                if (this.isEdit) {
                    this.bankAccount.modified_by = this.user;
                } else {
                    this.bankAccount.created_by = this.user;
                }

                this.showLoading = true;
                // Sync Data
                bankAccountHandler.save(this.bankAccount)
                    .then((response) => {
                        if (response) {
                            this.responseStatus(response);
                        }
                    })
                    .catch((error) => {
                        this.showLoading = false;
						Helper.alertErrorMsg(error);
					})
                    .finally(() => {
                        this.showLoading = false;
                    });
            },
            // Response Status
            responseStatus(response) {
                if (response.status === 200) {
                    if (this.saveMode === SaveOption.SAVECLOSE || this.saveMode === SaveOption.DELETE) { /* Save Close or Delete */
                        this.clear();
                        this.setDefaultData();

                        if (this.isEdit) {
                            this.$router.go(-1);
                        }
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
        },
        watch: {
            // Call again the method if the route changes
            $route: "loadObj",
        },
        mounted () {
            /* Load Object */
            this.loadObj();
        },
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
        .mb-6 {
            margin-bottom: 0 !important;
        }
    }
</style>