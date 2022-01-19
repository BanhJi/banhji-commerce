<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t("payment_option") }}</h2>
                                <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right">close
                                </v-icon>
                            </v-card>
                            <v-card outlined dense class="px-3 no_border" color="grayBg">
                                <v-row>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label  mb-0 mt-1" style="">{{
                                                $t("code")
                                            }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            tage="Number"
                                            v-model="paymentOption.code"
                                            :rules="[v => !!v || $t('is_required')]"
                                            outlined/>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label  mb-0">{{ $t("name") }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            tage="Catalog Name"
                                            v-model="paymentOption.name"
                                            :placeholder="$t('name')"
                                            :rules="[v => !!v || $t('is_required')]"
                                            outlined/>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label  mb-0 mt-1" style="">{{
                                                $t("type")
                                            }}</label>
                                        <v-select class="mt-1"
                                                  :disabled="disabled"
                                                  id="acc_type_selector"
                                                  :items="paymentTypes"
                                                  v-model="paymentOption.type"
                                                  @change="TypeChange"
                                                  tage="Payment Type"
                                                  :rules="[v => !!v || $t('is_required')]"
                                                  outlined/>
                                    </v-col>
                                </v-row>
                                <v-row v-show="!isHideBank">
                                    <v-col sm="5" cols="12" class="pb-0">
                                        <label class="label  mb-0 mt-1" style="">{{
                                                $t("account")
                                            }}</label>
                                        <v-select class="mt-1"
                                                  id="acc_type_selector"
                                                  :items="accounts"
                                                  v-model="paymentOption.account"
                                                  item-value="id"
                                                  :item-text="item =>`${item.number} - ${item.name}`"
                                                  return-object
                                                  tage="Account"
                                                  :rules="[v => !!v || $t('is_required')]"
                                                  outlined/>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card outlined dense class="no_border mb-1" color="white">
                                <v-row v-show="isHideBank">
                                    <v-col sm="12" cols="12" class="">
                                        <v-row>
                                            <v-col sm="12">
                                                <h3 class=" mb-0">
                                                    {{ $t("select_bank_account") }}
                                                </h3>
                                            </v-col>
                                            <v-col cols="12" sm="12">
                                                <kendo-datasource ref="connectedBankDS"
                                                                  :data="connectedBanks"/>
                                                <kendo-grid id="gridLeft" class="grid-function"
                                                            :data-source-ref="'connectedBankDS'"
                                                            :editable="false"
                                                            :scrollable-virtual="true">
                                                    <kendo-grid-column
                                                        :field="'tick'"
                                                        :title="$t(' ')"
                                                        :width="63"
                                                        :template="getRowTemplate"
                                                        :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                                                    <kendo-grid-column
                                                        :field="'logo'"
                                                        :title="$t('logo')"
                                                        :template="loadImage"
                                                        :width="100"
                                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                    <kendo-grid-column
                                                        :field="'bank'"
                                                        :title="$t('fi')"
                                                        :width="200"
                                                        :template="bankTemplate"
                                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                    <kendo-grid-column
                                                        :field="'bankAccount'"
                                                        :title="$t('bank_account')"
                                                        :width="250"
                                                        :template="bankAccountTemplate"
                                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                    <kendo-grid-column
                                                        :field="'account'"
                                                        :title="$t('account')"
                                                        :width="250"
                                                        :template="accountTemplate"
                                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                </kendo-grid>

                                                <!--                        <v-btn color="primary" @click="addRowL"-->
                                                <!--                               class="float-left rounded-0 white&#45;&#45;text mt-3">-->
                                                <!--                          <v-icon size="" class="ma-1">mdi-plus</v-icon>-->
                                                <!--                        </v-btn>-->
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider/>
                            <v-card outlined dense class="no_border function_footer">
                                <v-btn @click="cancel"
                                       color="black"
                                       outlined
                                       class="text-capitalize  black--text float-left"
                                >{{ $t("cancel") }}
                                </v-btn>

                                <v-btn @click="onSaveClose"
                                       color="primary"
                                       class="float-right  white--text text-capitalize"
                                >{{ $t("save_close") }}
                                </v-btn>
                            </v-card>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe :isLoading="showLoading"
                       :fullPage="false"
                       :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>
import Vue from "vue";
import PaymentOptionModel from "@/scripts/model/PaymentOption";
import BankPaymentModel from "@/scripts/model/BankPaymenOption";
// import ConnectedBankModel from "@/scripts/bank-partner/model/ConnectedBank";
import Row from "../customers/settings/CheckboxTemplate";
import {bankAccountHandler} from '@/scripts/AppHandlers';
import {uuid} from "vue-uuid";
import {AccountModel, BankModel} from "@/scripts/model/AppModels";
import AccountMappingModel from '@/scripts/account-map/Account'

const rowTemplate = Vue.component(Row.name, Row);

// const bankPaymentHandler = require("@/scripts/bankPaymentHandler")
const paymentOptionHandler = require("@/scripts/paymentOptionHandler")

// const $ = kendo.jQuery
const accountHandler = require("@/scripts/handler/accounting/account")
const paymentOptionModel = new PaymentOptionModel({})
const bankPaymentModel = new BankPaymentModel({})
const {PAYMENT_OPINION_TYPE, TYPE_SUPPLIER, ACCOUNT_TYPE_NUMBER} = require("@/scripts/default_setup/Setting");

const CASH = PAYMENT_OPINION_TYPE.CASH_PAYMENT
const CHEQUE = PAYMENT_OPINION_TYPE.CHEQUE_PAYMENT
const BANK_DISBURSEMENT = PAYMENT_OPINION_TYPE.BANK_DISBURSEMENT

const OPTION_TYPE = TYPE_SUPPLIER
const ACC_TYPE_NUMBER = ACCOUNT_TYPE_NUMBER

export default {
    name: "AddPaymentOption",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`)
    },
    data: () => ({
        paymentTypes: [CASH, CHEQUE, BANK_DISBURSEMENT],
        showLoading: false,
        customerList: [],
        customers: [],
        customer: {},
        supplier: {},
        valid: true,
        paymentOption: paymentOptionModel,
        supplierList: [],
        accounts: [],
        mAccount: {},
        bank: bankPaymentModel,
        bankCenters: [],
        connectedBanks: [],
        isHideBank: false
    }),
    methods: {
        updateSelection(item, value) {
            const ds = this.$refs.connectedBankDS.kendoWidget()
            const rows = ds.data()
            rows.map(row => {
                if (row.id === item.id) {
                    // row.set('tick', value)
                    row['tick'] = value
                }
            })
            // window.console.log('hello', value);
            // for (let i = 0; i < this.connectedBanks.length; i++) {
            //   if (item.id == this.connectedBanks[i].id) {
            //     this.connectedBanks[i].tick = value;
            //     break;
            //   }
            // }
            //why is this not reactive? Bug?  Will it be fixed at some point?
            // this.connectedBanks = Object.assign([], this.connectedBanks);
        },
        getRowTemplate(e) {
            return {
                template: rowTemplate,
                templateArgs: Object.assign(this.templateData(e, true))
            };
        },
        templateData(item, isOdd) {
            window.console.log(isOdd, '----', item)
            return {
                dataItem: item,
                parentComponent: this
            };
        },
        loadImage(dataItem) {
            const item = dataItem.logo || ''
            if (item) {
                return "<img width='50' height='50' style= 'margin: auto;display: block;' src='" + item + "' />"
            }
            return ''
        },
        bankTemplate(dataItem) {
            const item = dataItem.bank || {}
            if (item) {
                return `<span>${item.name || ``}</span>`
            } else {
                return ``
            }
        },
        bankAccountTemplate(dataItem) {
            const item = dataItem.bankAccount || {}
            if (item) {
                return `<span>${item.number + ' - ' + item.name}</span>`
            } else {
                return ``
            }
        },
        accountTemplate(dataItem) {
            const item = dataItem.account || {}
            if (item) {
                return `<span>${item.number + ' - ' + item.name}</span>`
            } else {
                return ``
            }
        },
        TypeChange() {
            this.isHideBank = this.paymentOption.type === BANK_DISBURSEMENT || this.paymentOption.type === CHEQUE;
            this.connectedBanks = []
            if (this.paymentOption.type) {
                const type = this.paymentOption.type || ''
                if (type !== CASH) {
                    this.loadBankCenter(type)
                }
            }
        },
        async loadAccountTypes() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getAll().then(res => {
                        this.showLoading = false
                        this.accounts = res.data.filter(m => m.account_type.number <= 5).map(item => {
                            return {
                                id: item.uuid,
                                uuid: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code,
                                account_type: item.account_type
                            }
                        })
                    })
                }, 10);
            })
        },
        async initData() {
            if (this.$route.params.id !== undefined) {
                await this.loadSinglePaymentOption()
            } else {
                this.clear()
            }
        },
        clear() {
            this.paymentOption = {}
            this.connectedBanks = []
            this.bankCenters = []
        },
        async onSaveClose() {
            // if (!this.$refs.form.validate()) {
            //   this.$refs.form.validate()
            //   return
            // }
            let bank = this.$refs.connectedBankDS.kendoWidget()
            let row = bank.data().filter(m => m.tick === true).map(item => {
                const account = new AccountMappingModel(item.account)
                item.coa['uuid'] = account.uuid || ''
                return {
                    lineId: item.lineId,
                    id: item.id,
                    tick: item.tick,
                    bank: new BankModel(item.bank),
                    bankAccount: item.bankAccount,
                    account: account,
                    merchant: item.merchant,
                    logo: item.logo,
                    coa: new AccountModel(item.coa)
                }
                // return new ConnectedBankModel(item)
            })

            // window.console.log(row, 'row')
            // return
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let account = this.paymentOption.account
                    if (this.paymentOption.type !== CASH) {
                        account = {}
                    } else {
                        row = []
                    }
                    let data = {
                        "id": this.paymentOption.id ? this.paymentOption.id : '',
                        "name": this.paymentOption.name,
                        "code": this.paymentOption.code,
                        "type": this.paymentOption.type,
                        "bank": row,
                        "optionType": OPTION_TYPE,
                        "account": account
                    }
                    // window.console.log(JSON.stringify(row), 'row')
                    this.btnEnable = true
                    this.showLoading = true
                    paymentOptionHandler.create(data).then(response => {
                        if (response.data.statusCode === 201) {
                            // const res = response.data.data
                            this.btnEnable = false
                            this.showLoading = false
                            this.$snotify.success('Success')
                            this.close()
                        } else {
                            this.showLoading = false
                        }
                    }).catch(e => {
                        this.btnEnable = false
                        this.showLoading = false
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 10);
            })
        },
        cancel() {
            window.history.go(-1)
        },
        close() {
            window.history.go(-1)
            // this.$router.push({
            //   name: 'Customers', params: {
            //     data: data
            //   }
            // })
        },
        async loadSinglePaymentOption() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.paymentOptions = []
                    paymentOptionHandler.list('?id=' + this.$route.params.id).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            const response = res.data.data
                            this.paymentOption = {}
                            if (response.length > 0) {
                                this.paymentOption = response[0]
                                this.connectedBanks = this.paymentOption.bank
                                if (this.paymentOption.type) {
                                    const type = this.paymentOption.type || ''
                                    if (type !== CASH) {
                                        this.loadBankCenter(type)
                                    }
                                }
                                this.isHideBank = this.paymentOption.type === BANK_DISBURSEMENT || this.paymentOption.type === CHEQUE
                            }
                        }
                    })
                }, 10)
            })
        },
        async loadBankCenter(type) {
            this.showLoading = true
            const bankAccounts = await bankAccountHandler.getAll();
            this.showLoading = false
            if (bankAccounts) {
                let result = []
                const data = await bankAccounts.data;
                if (type === CHEQUE) {
                    data.forEach(m => {
                        const account = m.account || {}
                        const accountType = account.account_type || {}
                        if (accountType.number === ACC_TYPE_NUMBER) {
                            result.push(m)
                        }
                    })
                } else {
                    result = data
                }
                this.connectedBanks = []
                let banks = []
                result.forEach(n => {
                    let bank = n.bank || {}
                    const bankId = bank.uuid || ''
                    const bankAccountNumber = n.number || ''
                    const bankAccountName = n.name || ''
                    const account = n.account || {}
                    bank['id'] = bankId
                    const obj = {
                        lineId: `lin-${uuid.v1()}`,
                        id: n.uuid,
                        tick: false,
                        bank: bank,
                        bankAccount: {
                            number: bankAccountNumber,
                            name: bankAccountName
                        },
                        account: account,
                        currency: n.currency || {},
                        merchant: n.merchant || {},
                        logo: n.logo || '',
                        coa: {}
                    }
                    banks.push(obj)
                })
                if (this.$route.params.id) {
                    const bank = this.paymentOption.bank || []
                    banks.forEach(n => {
                        const find = bank.filter(m => m.id === n.id)
                        if (find.length > 0) {
                            n['tick'] = true
                        }
                    })
                    this.connectedBanks = banks
                } else {
                    this.connectedBanks = banks
                }
            }
        },
    }
    ,
    mounted: async function () {
        // await this.initGrid(this)
        // await this.loadConnectedBank()
        await this.loadAccountTypes()
        await this.initData()
    }
    ,
    watch: {
        id() {
            if (this.$route.params.id !== undefined) {
                this.loadSinglePaymentOption()
            } else {
                this.clear()
            }
        }
    }
    ,
    computed: {
        disabled() {
            return !!this.$route.params.id;
        }
    }
}
;
</script>

<style scoped>
.dropdown-header {
    border-width: 0 0 1px 0;
    text-transform: uppercase;
}

.dropdown-header > span {
    display: inline-block;
    padding: 10px;
}

.dropdown-header > span:first-child {
    width: 50px;
}

.k-list-container > .k-footer {
    padding: 10px;
}

.function_content {
    padding: 0 25px 25px;
    border-bottom: 0;
    background-color: #fff !important;
}

@media (min-width: 1264px) {
    .container {
        /* max-width: 1185px; */
        max-width: 1080px !important;
    }
}

.grayBg {
    background-color: #F8F8F9;
}

@media (max-width: 576px) {
    .mb-6 {
        margin-bottom: 0 !important;
    }
}

.section2 {
    border: 1px solid #d6d7d8;
}

.border_grey {
    border: 1px solid #d6d7d8;
}

.attachment_table {
    width: 100%;
}

.my_radio [type="radio"] + label {
    position: relative;
    padding: 6px;
    grid-template-columns: 15% 80% !important;
    display: grid;
}

.upload_btn {
    padding: 10px 6px;
    text-align: center;
    color: white;
    margin-top: 15px;
    margin-bottom: none !important;
    border-radius: 22px;
    background: #92d050;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
</style>
