<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{$t('add_secondary_account')}}</h2>
                                <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right"
                                >close
                                </v-icon>
                            </v-card>

                            <v-card outlined dense class="no_border px-4 mb-4" color="grayBg">
                                <v-row>
                                    <v-col sm="6" cols="12" class="pb-0">
                                        <label class="label">{{$t('account_type')}}</label>
                                        <app-account-type-dropdownlist 
                                            :initAccountType="account.account_type" 
                                            @emitAccountType="account.account_type = $event" 
                                            @onChanged="onAccountTypeChanges"/>

                                        <label class="label">{{$t('sub_account')}}</label>
                                        <app-parent-account-dropdownlist 
                                            :initParentAccount="account.parent_account" 
                                            @emitParentAccount="account.parent_account = $event" 
                                            :initSecondaryTypeId="account.secondary_type_uuid"
                                            @onChanged="generateNumber" />

                                        <label class="label">{{$t('related_account')}}</label>
                                        <v-select
                                            class="mt-1"
                                            :loading="primaryAccounts.length === 0"
                                            placeholder="Select Related Account"
                                            v-model="account.primary_account_uuid"
                                            :items="primaryAccounts"
                                            item-text="name"
                                            item-value="uuid"
                                            outlined>
                                            <template slot='selection' slot-scope='{ item }'>
                                                {{ item.number }} - {{ item.name }}
                                            </template>
                                            <template slot='item' slot-scope='{ item }'>
                                                {{ item.number }} - {{ item.name }}
                                            </template>
                                        </v-select>

                                        <v-textarea
                                            v-model="account.account_type.description"
                                            height="140px"
                                            rows="10"
                                            readonly 
                                            no-resize
                                            outlined
                                        />

                                    </v-col>
                                    <v-col sm="6" cols="12" class="pb-0">
                                        <label class="label">{{$t('account_number')}}</label>
                                        <v-text-field
                                            :rules="[v => !!v || $t('number_required')]"
                                            v-model="number"
                                            outlined
                                            required
                                        />

                                        <label class="label">{{$t('account_name')}}</label>
                                        <v-text-field class="mt-1"
                                                      :rules="[v => !!v || $t('acc_name_required')]"
                                                      v-model="account.name"
                                                      outlined
                                                      tage="Account Name"
                                                      required
                                        />

                                        <label class="label">{{$t('local_name')}}</label>
                                        <v-text-field class="mt-1"
                                                      v-model="account.local_name"
                                                      outlined
                                                      tage="Local Name"
                                        />

                                        <label class="label">{{$t('description')}}</label>
                                        <v-textarea class="mt-1" no-resize height="120px"
                                                    v-model="account.description"
                                                    outlined
                                                    rows="4"
                                        />

                                        <label class="label">{{$t('status')}}</label>
                                        <app-status-dropdownlist 
                                            :initStatus="account.status" 
                                            @emitStatus="account.status = $event" />

                                        <!-- <v-checkbox class="ma-0"
                                                    v-model="account.is_taxable"
                                                    :label="$t('taxable')"
                                                    false-value="0"
                                                    true-value="1"
                                        /> -->

                                        <div v-if="account.is_taxable">
                                            <v-select class=" mt-1"
                                                      :items="taxes"
                                                      no-data-text="No data found."
                                                      return-object
                                                      clearable
                                                      outlined
                                            />
                                        </div>

                                    </v-col>
                                </v-row>
                            </v-card>

                            <v-divider/>

                            <!-- Footer -->
                            <v-alert
                                type="warning"
                                v-model="alert"
                                dismissible
                            >
                                <span v-html="errorMessage"/>
                            </v-alert>
                            <v-card outlined dense class="no_border function_footer">
                                <v-btn color="primary"
                                        outlined
                                       class="text-capitalize  black--text float-left" @click="cancel">{{$t('cancel')}}</v-btn>
                                <v-btn color="primary"
                                       class="ml-2 text-capitalize  white--text" v-if="isEdit" @click="confirmDelete">{{$t('delete')}}
                                </v-btn>
                                <v-btn color="secondary"
                                       class="ml-2 float-right text-capitalize  white--text" @click="onSaveOptionClick(SaveOption.SAVECLOSE)">{{$t('save_close')}}
                                </v-btn>
                                <v-btn color="primary"
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
                :fullPage="false" 
                type="loading"
                :myLoading="true" />
        </v-container>
    </v-app>
</template>

<script>
    import Helper from "@/helper.js";
    import {i18n} from '@/i18n';
    import AccountModel from "@/scripts/model/Account.js";
    import AccountGroupModel from "@/scripts/model/AccountGroup.js";

    /* Store */
    import store from '@/store';

    const accountHandler = require("@/scripts/handler/accounting/account");
    const { SaveOption } = require("@/scripts/default_setup/Collections");

    export default {
        name: "SecondaryAccount",
        props: {
            initAccount: {
                type: Object,
            },
        },
        components: {
            "LoadingMe": () => import('@/components/Loading'),
            "app-account-type-dropdownlist": () => import('@/components/dropdownlist/AccountTypeSecondary'),
            "app-parent-account-dropdownlist": () => import('@/components/dropdownlist/ParentAccountSecondary'),
            "app-status-dropdownlist": () => import('@/components/kendo_templates/StatusDropDownList'),
        },
        data: () => ({
            //Obj
            number : "",
            account         : new AccountModel(),
            primaryAccounts : [],
            taxes           : [],
            // Form validation
            valid           : true,
            isEdit          : false,
            alert           : false,
            errorMessage    : "",
            saveMode        : '',
            SaveOption      : SaveOption,
            user            : Helper.getUser(),
            // LoadingMe
            showLoading     : false,
        }),
        methods: {
            async initialize () {
                // Call List
                this.primaryAccounts = await this.$store.dispatch('accounting/getAccounts');
            },
            // Set Default Data
            initialData () {
                if(this.initAccount){ // Edit Mode
                    this.isEdit = true;
                    this.account = this.initAccount;
                    this.number = this.account.number;
                }else{ // Brand New
                    this.isEdit = false;
                    this.setDefaultData();
                }
            },
            /* Set default data */
            setDefaultData(){
                this.account = new AccountModel({
                    status : 1, /* Active New Account */
                    is_secondary : 1, /* Make it Secondary Account */
                });
            },
            // Number
            async generateNumber() {
                let number = "";
                
                if (this.account.account_type.uuid !== '') {
                    number = this.account.account_type.nature_code;
                    if(this.account.account_type.code < 10){
                        number =+ "0" + this.account.account_type.code.toString();
                    }else{
                        number =+ this.account.account_type.code.toString();
                    }
                
                    let bigNumber = await Helper.getMaxNumberOfAccount(this.account.account_type.code);
                    
                    if(bigNumber === ''){
                        number += "000";
                    }else{
                        number = bigNumber;
                    }
                }

                this.number = number;
            },
            // On Account Type Changes
            onAccountTypeChanges () {
                this.account.secondary_type_uuid = this.account.account_type.uuid;
                this.account.parent_account = new AccountModel();
                this.account.primary_account_uuid = "";

                if(this.account.account_type.uuid !== ''){
                    this.primaryAccounts = store.state.accounting.accounts.filter(
                        (i) => i.type_code === this.account.account_type.primary_type_code
                    );
                }

                this.generateNumber();
            },
            // Shrink Data
            shrinkData() {
                // Number
                this.account.number = this.number;

                /* Set account group from primary account */
                let primaryAccount = this.primaryAccounts.find((i)=>i.uuid === this.account.primary_account_uuid);
                this.account.account_group = new AccountGroupModel(primaryAccount.account_group);

                // User
                if (this.isEdit) {
                    this.account.modified_by = this.user;
                } else {
                    this.account.created_by = this.user;
                }
            },
            // Validating
            validateForm() {
                let result = true, msg = "";

                // Account Type
                if (this.account.account_type.uuid === '') {
                    msg += `<p>${i18n.t("account_type_is_required")}</p>`;
                    result = false;
                }

                // Related Account
                if (this.account.primary_account_uuid === '') {
                    msg += `<p>${i18n.t("related_account_is_required")}</p>`;
                    result = false;
                }

                // Check Account Number
                if (this.number !== '' && this.number !== this.account.number) {
                    let number = store.state.accounting.secondaryAccounts.find(i => i.number === this.number);
                    if(number){
                        msg += `<p>${i18n.t("account_number_is_unavailable")}</p>`;
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
            // All Saves
            onSaveOptionClick (mode) {
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
                    cancelButtonColor: '#ED1A3A',
                    confirmButtonText: 'Yes, discard it!'
                }).then((result) => {
                    if (result.value) {
                        this.clear();
                        this.$router.go(-1);
                    }
                })
            },
            clear () {
				// Reset Form
                this.saveMode = '';
                this.number = '';

                this.setDefaultData();
			},
            confirmDelete() {
                if(this.account.is_in_used === 0){/* Check if in use */
                    this.$swal({
                        title: i18n.t("are_you_sure_you_want_to_delete_it"),
                        text: i18n.t("you_wont_be_able_to_revert_this"),
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: '#4d4848',
                        cancelButtonColor: '#ED1A3A',
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.value) {
                            this.saveMode = SaveOption.DELETE;

                            /* Mark as deleted */
                            this.account.is_deleted = 1;

                            /* Update Account */
                            this.save();
                        }
                    })
                }else{
                    Helper.alertErrorMsg(i18n.t("cant_delete_because_it_is_in_use"));
                }
            },
            save() {
                let self = this;

                // Shrink Data
                this.shrinkData();
                
                this.showLoading = true;
                // Sync Data
                accountHandler.save(this.account)
                    .then((response) => {
                        if(response){
                            /* Update Vuex Data */
                            this.$store.dispatch('accounting/saveAccount', response.data);
                            
                            self.responseStatus(response);
                        }else{
                            this.$snotify.error(i18n.t("error_something_wrong"));
                        }
                    })
                    .catch((error) => {
                        this.showLoading = false;
                        this.$snotify.error(error);
                    })
                    .finally(() => {
                        this.showLoading = false;
                    });
            },
            // Response Status
            responseStatus(response) {
                if (response.status === 200) {
                    if (this.saveMode === SaveOption.SAVECLOSE || this.saveMode === SaveOption.DELETE) { /* Save Close or Delete */
                        this.$router.go(-1);
                    }

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
            initAccount: "initialData",
        },
        created(){
            this.initialize();
        },
        mounted() {
            // Initial Data
            this.initialData();
        }
    };
</script>

<style scoped>
    @media (min-width: 1264px) {
        .container {
            /* max-width: 1185px; */
            max-width: 1080px !important;
        }
    }
</style>