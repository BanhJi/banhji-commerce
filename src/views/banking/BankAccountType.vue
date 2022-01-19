<template>
    <v-row class="">
        <v-col sm="12" cols="12">
            <h2>{{$t('bank_account_type')}}</h2>
            <v-dialog v-model="dialogm2" max-width="380px">
                <template v-slot:activator="{ on }">
                    <v-btn class="btn_create_new float-right" v-on="on" @click="onNewClick">
                        {{$t('create_new')}}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{$t('bank_account_type')}}</v-card-title>
                        <v-icon  @click="dialogm2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="">
                                <label class="label">{{$t('code')}}</label>
                                <p class="text_tip">A short name of the bank account type</p>
                                <v-text-field class=" mb-2"
                                              outlined
                                              tage="Code"
                                              placeholder=""
                                              v-model="bankAccountType.code"/>


                                <label class="label">{{$t('name')}}</label>
                                <p class="text_tip">A name of bank account type</p>
                                <v-text-field class=" mb-2"
                                              outlined
                                              tage="Name"
                                              placeholder=""
                                              v-model="bankAccountType.name"/>

                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-btn class="btn_cancel " @click="dialogm2 = false">{{$t('cancel')}}</v-btn>
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
                                <th class="text-uppercase">{{$t('code')}}</th>
                                <th class="text-uppercase">{{$t('name')}}</th>
                                <th class="text-uppercase">{{$t('action')}}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="type in bankAccountTypes" v-bind:key="type.id">
                                <td class="">{{type.code}}</td>
                                <td class="">{{type.name}}</td>
                                <td v-if="type.isSystem===0">
                                    <v-btn width="100%" color="primary" class="rounded-0" @click="onEditClick(type)">
                                        <span class="text-capitalize text-bold text-white">Edit</span>
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
    const apiUrl = require('../../apiUrl.js')
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
            bankAccountTypes: [],
            bankAccountType: {
                id: '',
                code: '',
                name: '',
                isSystem: 0,
                type: 'bacct'
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
                        this.bankAccountType = value
                        this.dialogm2 = true
                        this.option = 2
                    }, 300);
                })
            },
            onNewClick() {
                this.option = 1
                this.clear()
            },
            OnSaveClick: function (isNew, option) {
                //eslint-disable-next-line no-console
                let self = this
                let url, method = ''
                if (option === 1) { // Create
                    url = apiUrl.wcap_setting_post
                    method = 'post'
                } else if (option === 2) { // Update
                    url = apiUrl.wcap_setting_put + self.bankAccountType.id
                    method = 'put'
                }

                let data = {
                    code: self.bankAccountType.code,
                    name: self.bankAccountType.name,
                    isSystem: 0,
                    type: 'bank_acc_type'
                };
                //eslint-disable-next-line no-console
                console.log(self);
                // this.isFullpage = true
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
                            self.dialogm2 = false
                            self.loadData('bacct')
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
                this.bankAccountType = []
            },
            async loadData(type) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        axios.get(apiUrl.wcap_setting_get + type)
                            .then(res => {
                                this.bankAccountTypes = res.data.data
                            })
                    }, 300)
                })
            },
        },
        mounted: async function () {
            await this.loadData('bacct')
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