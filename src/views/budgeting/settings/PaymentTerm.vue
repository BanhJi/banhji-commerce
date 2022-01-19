<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="py-0">
            <h2>{{$t('payment_term')}}</h2>
            <v-dialog v-model="dialogm2" max-width="380px">
                <template v-slot:activator="{ on }">
                    <v-btn class="btn_create_new float-right" v-on="on" @click="onNewClick">
                        {{$t('create_new')}}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{$t('payment_term')}}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                    </div>
                    <v-card-text cl ass="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="pb-0">
                                <label class="label">{{$t('payment_term_name')}}</label>
                                <p class="text_tip">{{$t('payment_term_name_desc')}}</p>
                                <v-text-field class="mt-1"
                                              outlined
                                              placeholder=""
                                              tage="Payment Method Name"
                                              v-model="paymentTerm.name"/>

                                <v-row>
                                    <v-col sm="4" cols="12" class="mt-3 pb-0">
                                        <label class="label">{{$t('net_due')}}</label>
                                        <v-text-field class="mt-1 pr-0"
                                                      outlined
                                                      placeholder=""
                                                      tage="Net Due"
                                                      v-model="paymentTerm.netDue"/>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="py-0 pl-0">
                                        <label class="label">{{$t('discount_period')}}</label>
                                        <v-text-field class="mt-1"
                                                      outlined
                                                      tage="Discount Period"
                                                      placeholder=""
                                                      v-model="paymentTerm.discountPeriod"/>
                                    </v-col>
                                    <v-col sm="3" cols="12" class="py-0 pl-0">
                                        <label class="label">{{$t('discount_rate')}}</label>
                                        <v-text-field width="200" class="mt-1"
                                                      outlined
                                                      tage="Discount Rate"
                                                      placeholder=""
                                                      v-model="paymentTerm.discountPercentage"/>

                                    </v-col>
                                    <v-icon class="float-left" style="margin-top: 30px" size="15"> fa fa-percent
                                    </v-icon>
                                </v-row>

                                <label class="label">{{$t('account')}}</label>
                                <p class="text_tip">A default account for this method</p>
                                <v-select class=" mb-3"
                                          id="acc_type_selector"
                                          :items="accountTypes"
                                          item-text="name"
                                          item-value="selected_acctount_type"
                                          v-model="accountType"
                                          tage="Account"
                                          outlined
                                          return-object/>

                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0">
                                <v-btn color="primary" outlined
                                       class=" text-capitalize  black--text float-left"
                                       @click="dialogm2 = false">{{$t('cancel')}}
                                </v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0">
                                <v-btn color="primary"  class="  white--text text-capitalize float-right"
                                       @click.native="OnSaveClick(false,option)">
                                    {{$t('save_close')}}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>

                </v-card>
            </v-dialog>

            <p class="mb-0">
                {{$t('payment_term_desc')}}
            </p>

        </v-col>

        <v-col sm="12" cols="12">
            <template>
                <v-simple-table class="exchange-table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{$t('name')}}</th>
                            <th class="text-uppercase">{{$t('det_due')}}</th>
                            <th class="text-uppercase">{{$t('discount_period')}}</th>
                            <th class="text-uppercase">{{$t('rate') + '(%)'}}</th>
                            <th class="text-uppercase">{{$t('account')}}</th>
                            <th class="text-uppercase">{{$t('action')}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="payment in paymentTerms" v-bind:key="payment.id">
                            <td class="tb_name_td">{{payment.name}}</td>
                            <td class="text-center">{{payment.netDue}}</td>
                            <td class="text-center">{{payment.discountPeriod}}</td>
                            <td class="text-center">{{payment.discountPercentage}}</td>
                            <td class="">{{payment.account.name}}</td>
                            <td>
                                <v-btn class="btn_edit_setting" @click="onEditClick(payment)">
                                    <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                    <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
    </v-row>
</template>

<script>
    const axios = require('axios')
    const apiUrl = require('../../../apiUrl.js')
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
            paymentTerms: [],
            paymentTerm: {
                id: '',
                netDue: '',
                discountPeriod: '',
                discountPercentage: '',
                name: '',
                account: [],
                type: 'pmt'
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
                        //eslint-disable-next-line no-console
                        // console.log(value)
                        this.paymentTerm = value
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
                    url = apiUrl.wcap_setting_put + self.paymentTerm.id
                    method = 'put'
                }

                let data = {
                    netDue: self.paymentTerm.netDue,
                    discountPercentage: self.paymentTerm.discountPercentage,
                    discountPeriod: self.paymentTerm.discountPeriod,
                    name: self.paymentTerm.name,
                    type: 'pmt',
                    account: self.accountType
                }
                //eslint-disable-next-line no-console
                console.log(self);
                // this.isFullpage = true
                axios({
                    method: method,
                    url: url,
                    data: data
                })
                    .then(function (response) {
                        if (response.status === 200) {
                            self.snackbar = true
                            self.textStatus = "Success"
                            self.color = "#3DA72E"
                            if (isNew === false) {
                                // clreat form
                                self.dialogm2 = false
                                self.loadPayment('pmt')
                                self.clear()
                            }
                        }
                    })
                    .catch(function (error) {
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
                this.paymentTerm = []
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
                                this.paymentTerms = res.data.data
                            })
                    }, 300)
                })
            },
        },
        mounted: async function () {
            await this.loadAccountTypes()
            await this.loadPayment('pmt')
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