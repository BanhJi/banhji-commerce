<template>
    <v-row class="">
        <v-col sm="12" cols="12">
            <h2>{{$t('transaction_prefix_setting')}}</h2>
            <v-dialog v-model="dialogm2" max-width="380px">
                <template v-slot:activator="{ on }">
                    <v-btn  color="primary" class=" float-right" v-on="on" @click="onNewClick">
                        {{$t('create_new')}}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{$t('payment_method')}}</v-card-title>
                        <v-icon  @click="dialogm2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="">
                                <label class="label">{{$t('payment_method_code')}}</label>
                                <p class="text_tip">This code can be used for reconciliation </p>
                                <v-text-field class=" mb-3"
                                              outlined
                                              tage="Payment Method Code"
                                              placeholder=""
                                              v-model="paymentMethod.code"/>

                                <label class="label">{{$t('payment_method_name')}}</label>
                                <p class="text_tip">A short name of the payment method</p>
                                <v-text-field class=" mb-3"
                                              outlined
                                              tage="Payment Method Name"
                                              placeholder=""
                                              v-model="paymentMethod.name"/>

                                <label class="label">{{$t('default_account')}}</label>
                                <p class="text_tip">A default name of the payment method</p>
                                <v-select class=" mb-3"
                                          id="acc_type_selector"
                                          :items="accountTypes"
                                          item-text="name"
                                          tage="Default Account"
                                          item-value="selected_acctount_type"
                                          v-model="accountType"
                                          outlined
                                          return-object/>

                                <v-checkbox class="ma-0 "
                                            label="This is a digital based payment method"
                                            v-model="paymentMethod.digital"/>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-btn class="btn_cancel" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>
                        <v-btn class="btn_save_close" @click.native="OnSaveClick(false,option)">
                            {{$t('save_close')}}
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-dialog>

            <p class="mb-0">
                This payment method can be applicable for customer
                collections, supplier payment, and other cash related
                transaction
            </p>

        </v-col>

        <v-row>
            <v-col sm="12" cols="12">
                <template>
                    <v-simple-table class="exchange-table">
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-uppercase">{{$t('abbr')}}</th>
                                <th class="text-uppercase">{{$t('name')}}</th>
                                <th class="text-uppercase">{{$t('structure')}}</th>
                                <th class="text-uppercase">{{$t('starting_no')}}</th>
                                <th class="text-uppercase">{{$t('action')}}</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-bold">BRM</td>
                                    <td class="text-bold">Bank Reconciliation (Manual)</td>
                                    <td class="">YEAR/MONTH </td>
                                    <td class="">001 (Starting each month) </td>
                                    <td>
                                        <v-btn class="third rounded-0 white--text" @click="onEditClick(payment)">
                                            VIEW
                                        </v-btn>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </template>
                    </v-simple-table>
                </template>
            </v-col>
        </v-row>
    </v-row>
</template>

<script>
    const axios = require('axios')
    const apiUrl = require('../../../apiUrl.js')
    // const store = require("../../institute.js")
    // const accountGroup = require("../../scripts/model/AcountGroup")
    // const institute_id = store.default.state.cookies.instituteId
    import {i18n} from '@/i18n'

    export default {
        components: {},
        data: () => ({
            dialogm1: '',
            dialogm2: false,
            compeletLoading: true,
            isFullpage: false,
            snackbar: false,
            textStatus: 'Success',
            color: '#3DA72E',
            timeout: 6000,
            x: 'right',
            y: 'top',
            accountTypes: [],
            accountType: {
                name: '',
                nature: '',
                statement_group: '',
                number: 0,
            },
            paymentOptions: [],
            paymentMethod: {
                id: '',
                code: '',
                name: '',
                account: [],
                type: 'pmd',
                digital: 0
            },
            headers: [
                {
                    text: i18n.t('name'),
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                {text: i18n.t('description'), value: 'description', sortable: false,},
                {text: i18n.t('account_type'), value: 'account_type', sortable: false, align: ' d-none'},
                {text: i18n.t('account_type'), value: 'account_type.name', sortable: false,},
                {text: i18n.t('action'), value: 'actions', sortable: false},
            ],
            option: 1
        }),
        props: {},
        computed: {},
        watch: {
            dialogm2(val) {
                val || this.close()
            },
        },
        created() {
        },
        methods: {
            async onEditClick(value) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.paymentMethod = value
                        this.accountType = value.account
                        this.dialogm2 = true
                        this.option = 2
                    }, 300);
                })
            },
            onNewClick() {
                this.option = 1
                this.clear()
            },
            OnSaveClick(isNew, option) {
                //eslint-disable-next-line no-console
                let self = this
                let url, method = ''
                if (option === 1) { // Create
                    url = apiUrl.wcap_setting_post
                    method = 'post'
                } else if (option === 2) { // Update
                    url = apiUrl.wcap_setting_put + self.paymentMethod.id
                    method = 'put'
                }

                let data = {
                    code: self.paymentMethod.code,
                    name: self.paymentMethod.name,
                    type: 'pmd',
                    account: self.accountType,
                    digital: self.paymentMethod.digital === undefined ? 0 : self.paymentMethod.digital
                }
                window.console.log(method, option)
                axios({
                    method: method,
                    url: url,
                    data: data
                }).then(function (response) {
                    if (response.status === 200) {
                        self.snackbar = true
                        self.textStatus = "Success"
                        self.color = "#3DA72E"
                        if (isNew === false) {
                            // clear form
                            self.loadPayment('pmd')
                            self.dialogm2 = false
                            self.clear()
                        }
                    }
                }).catch(function (error) {
                    self.snackbar = true
                    self.textStatus = "Failed"
                    self.color = "#EF5350"
                    //eslint-disable-next-line no-console
                    console.log(error)
                });
            },
            close() {
                this.dialogm2 = false
            },
            clear() {
                this.accountType = []
                this.paymentMethod = []
            },
            async loadAccountTypes() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        axios.get(apiUrl.account_type_list_get)
                            .then(res => {
                                this.accountTypes = res.data
                            })
                    }, 300)
                })
            },
            async loadPayment(type) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        axios.get(apiUrl.wcap_setting_get + type)
                            .then(res => {
                                this.paymentOptions = res.data.data
                            })
                    }, 300)
                })
            },
        },
        mounted: async function () {
            // this.loadAccountTypes()
            // this.loadPayment('pmd')
        }
    };
</script>
<style scoped>
    .acc_group header {
        height: 10px !important;
    }

    table.acc_group tr td {
        border-bottom: 1px solid #ccc;
        padding: 8px;
        vertical-align: middle;
    }

    table.acc_group tr td:first-child {
        font-weight: 700;
    }

    table.acc_group tr td:last-child {
        text-align: center;
    }

    .v-card__actions .v-btn.v-btn {
        padding: 0 16px;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        font-family: 'Niradei-Bold', serif;
        color: #000 !important;
        border-top: 1px solid #000 !important;
        border-bottom: 1px solid #000 !important;
        font-size: 15px !important;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
        color: #000 !important;
        padding: 5px !important;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
        border-bottom: 1px solid #000 !important;
    }

    .function_footer {
        padding: 15px;
        display: inline-block;
    }

    @media (max-width: 576px) {

    }
</style>