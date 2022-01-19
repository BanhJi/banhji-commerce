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
                        <v-card outlined dense class="no_border">
                            <h2 class="mb-0">{{ $t('connect_collection_account') }}</h2>
                            <v-icon
                                @click="onClose"
                                style="cursor: pointer; color: #333; font-size: 40px;"
                                class="float-right"
                            >close
                            </v-icon>
                        </v-card>
                        <v-card outlined dense class="px-5 py-2" color="grayBg">
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                :myLoading="true">
                            </LoadingMe>
                            <v-row v-if="!bankClick && !connectBankSuccess">
                                <v-col sm="6" cols="12" class="pb-0">
                                    <h3 class="primary--text font_20">{{ $t('connect_to_partner_financial') }}</h3>
                                    <p class="my-2 dark--text">{{ $t('connect_to_partner_financial_desc') }}</p>
                                    <v-row>
                                        <v-col sm="6" cols="12">
                                            <v-card outlined dense class="pa-2 grayBg" height="225px">
                                                <v-img class="ma-auto" width="60%" src="@/assets/images/002.png"/>
                                                <p class="text-center mb-0 mt-3">{{ $t('online_payments') }}</p>
                                            </v-card>
                                        </v-col>
                                        <v-col sm="6" cols="12">
                                            <v-card outlined dense class="pa-2 grayBg " height="225px">
                                                <v-img class="ma-auto" width="60%" src="@/assets/images/003.png"/>
                                                <p class="text-center mb-0 mt-3">{{ $t('proximity_payment') }}</p>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>

                                <v-col sm="6" cols="12" class="py-2">
                                    <p class="my-2">{{ $t('please_select_financial_to_connect') }}</p>
                                    <v-row>
                                        <v-col sm="3" cols="12" v-for="item in banks" v-bind:key="item.id">
                                            <v-card elevation="0" color="white" class="shadow_hover" min-height="100px">
                                                <v-img @click="onBankClick(item)" class=" ma-auto " width="100%"
                                                       v-bind:src="item.image"/>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row v-else-if="bankClick && !connectBankSuccess">
                                <v-col cols="12" class="pb-0">
                                    <v-btn color="primary" class="white--text" @click="onBackToConnect">
                                        <v-icon size="13" class="mr-2">fa fa-arrow-left</v-icon>
                                        {{ $t('back') }}
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <BankConnection :info="info">
                                        <template v-slot:account>
                                            <v-form
                                                ref="form"
                                                v-model="valid"
                                                lazy-validation
                                            >
                                                <label class="label">{{ $t('nature') }}</label>
                                                <p class="text_tip mb-0 mt-1">{{ $t('nature_customer_desc') }}</p>
                                                <v-select class="mt-4 "
                                                          multiple="multiple"
                                                          :items="account"
                                                          :item-text="item =>`${item.number} - ${item.name}`"
                                                          item-value="id"
                                                          v-model="mSelectedAccount"
                                                          :rules="[v => !!v || 'Item is required']"
                                                          required
                                                          tage="Nature"
                                                          outlined
                                                          return-object/>
                                                <v-btn width="100%" color="primary" class=" mt-4 white--text "
                                                       @click="onConnectClick">
                                                    <v-icon size="13" class="mr-2 white--text">fa fa-lock</v-icon>
                                                    <span
                                                        class="white--text text-capitalize">{{
                                                            $t('connect_collection_account')
                                                        }}</span>
                                                </v-btn>
                                            </v-form>
                                        </template>
                                    </BankConnection>
                                </v-col>
                            </v-row>
                            <v-row v-else-if="connectBankSuccess">
                                <v-col class="" min-height="500">
                                    <h2 class="primary--text text-center d-block font_4em my-10 mt-16 fade-in">
                                        {{ $t('congratulation') }}</h2>
                                    <p class="text-center mb-0 font_20">{{ $t('your_collection_account') }}</p>
                                </v-col>
                            </v-row>
                            <p class="text-center mb-2">
                                <v-icon size="13" class="third--text mr-2 white--text">fa fa-lock</v-icon>
                                {{ $t('at_banhJi_the_privacy') }}
                            </p>
                        </v-card>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import BankPaymentModel from "@/scripts/model/BankPayment";

const bankHandler = require("@/scripts/bankHandler")
const bankAccountHandler = require("@/scripts/bankAccountHandler")
const otherHandler = require("@/scripts/otherHandler")
const bankPaymentHandler = require("@/scripts/bankPaymentHandler")
const bankPaymentModel = new BankPaymentModel({})
import {uuid} from 'vue-uuid'

export default {
    name: 'ConnectedAccount',
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        BankConnection: () => import(`@/components/BankConnection`)
    },
    data: () => ({
        bankClick: false,
        valid: true,
        connectBankSuccess: false,
        connectLoading: false,
        account: [],
        dialogM3: false,
        mSelectedAccount: [],
        showLoading: false,
        isLoaded: false,
        info: {},
        bankPayment: bankPaymentModel,
        banks: [],
        bankPartners: [],
        bankAccount: [],
    }),
    methods: {
        async loadBankPartner() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    otherHandler.bankParner().then(res => {
                        this.bankPartners = res
                        this.showLoading = false
                        // window.console.log(this.bankPartners, 'partner')
                    })
                }, 300);
            })
        },
        async loadBankAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    bankAccountHandler.getAll().then(res => {
                        this.bankAccount = res.data
                        this.loadAllBanks()
                        this.showLoading = false
                    })
                }, 300);
            })
        },
        loadAllBanks() {
            new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        this.showLoading = true
                        bankHandler.getAll().then(res => {
                            this.banks = []
                            const data = res.data.filter(m => {
                                return (m.is_deleted === 0 && m.hasOwnProperty('partner_id'))
                            })
                            data.filter(m => {
                                this.bankPartners.forEach(n => {
                                    if (n.id === m.partner_id) {
                                        m['image'] = n.image
                                        m['order'] = n.order
                                        this.banks.push(m)
                                    }
                                })
                                m['bankAccount'] = this.bankAccount.filter(l => l.bank.uuid === m.uuid).map(k => {
                                    return {
                                        id: k.uuid,
                                        name: k.name,
                                        number: k.number,
                                        type: k.type,
                                        currency: k.currency,
                                        account: {
                                            id: k.account.uuid,
                                            name: k.account.name,
                                            local_name: k.account.local_name,
                                            number: k.account.number,
                                            is_taxable: k.account.is_taxable,
                                            banhjiAccCode: k.account.banhjiAccCode,
                                            group_code: k.account.group_code,
                                            parent_account: k.account.parent_account,
                                            type_code: k.account.type_code,
                                            account_type: k.account.account_type
                                        }
                                    }
                                })
                            })
                            this.banks
                                .sort(function (a, b) {
                                    return a.order - b.order
                                })
                            this.showLoading = false
                            // window.console.log(this.banks)
                        })
                    }, 300)
                }
            )
        },
        onBankClick(bank) {
            this.info = bank
            this.bankClick = true
            const data = {
                id: this.info.partner_id,
                status: 'Connected',
            }
            this.account = bank.bankAccount
            // window.console.log('bank Info', this.account)
            bankPaymentHandler.connectedBankAccount(data).then(response => {
                if (response.data.statusCode === 200) {
                    const connectedAcc = response.data.data
                    this.mSelectedAccount = connectedAcc
                }
            })


        },
        onBackToConnect() {
            this.bankClick = false
        },
        onConnectClick() {
            if (this.mSelectedAccount === '') {
                this.$refs.form.validate()
            } else {
                this.connectLoading = true
                setTimeout(() => {
                    this.onSaveClose()
                }, 300);
            }
        },
        onCloseModelConnect() {
            this.connectBankSuccess = false
            this.bankClick = false
            this.dialogM3 = false
        },
        onClose() {
            this.connectBankSuccess = false
            this.bankClick = false
            this.dialogM3 = false
            this.$router.push({
                name: 'Banking', params: {
                    data: this.connectedBankAccountList
                }
            })


        },
        async onSaveClose() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    let selectedAcc = this.mSelectedAccount
                    selectedAcc.forEach(m => {
                        if (!m.hasOwnProperty('id')) {
                            m['id'] = 'bca-' + uuid.v1()
                        }
                    })
                    const data = {
                        id: this.info.partner_id,
                        bank: this.info,
                        connectedAccount: selectedAcc,
                        status: "Connected",
                        type: 'Bill Payment',
                        enabled: true,
                    }
                    // window.console.log(data, '--')
                    bankPaymentHandler.create(data).then(res => {
                        if (res.data.statusCode === 201) {
                            this.showLoading = false
                            this.connectedBankAccountList = res.data.data
                            this.connectBankSuccess = true
                            this.connectLoading = false
                        }

                    })
                }, 300)
            })
        },
    },
    mounted: async function () {
        await this.loadBankAccount()
        await this.loadBankPartner()
    },
    watch: {
        '$route': 'loadBankAccount'
    }
}
</script>
<style scoped>
.function_content {
    padding: 10px 25px 25px;
    border-bottom: 0;
}

@media (min-width: 1264px) {
    .container {
        max-width: 1080px !important;
    }
}

@media (max-width: 576px) {

}
</style>