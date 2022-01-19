<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="6" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{ $t('monthly_tax_balance') }}</h2>
                            <p class="mb-0">{{ $t('for_the_month_of') }}: <span class="text-bold">{{
                                    monthFormat(date)
                                }}</span></p>
                        </v-col>
                        <v-col :sm="isValid ? 4 : 6" cols="12" class="py-0 d-flex justify-end hide_form_alert">
                            <div class="d-flex">
                                <month-picker :initialMonth="date" @emitMonth="date = $event"/>
                                <v-btn class="ma-1 ml-2" color="primary white--text text-capitalize"
                                       @click="onSearch">
                                    {{ $t('view') }}
                                </v-btn>
                            </div>
                        </v-col>
                        <v-col v-if="isValid" sm="2" cols="12" class="py-1">
                            <v-btn @click="dialog = true" class="float-right capitalize white--text" color="primary">
                                {{ $t('add_new') }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <v-simple-table class="nomal_table">
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-bold text-uppercase ">{{ $t('description') }}</th>
                                <th class="text-bold text-uppercase ">{{ $t('code') }}</th>
                                <th class="text-bold text-uppercase">{{ $t('amount') }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="text-bold text-uppercase">{{ $t('prepayment_of_tax_on_income_ppi') }}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="">{{ $t('prepayment_of_tax_on_income') }}</td>
                                <td></td>
                                <td>{{ numberFormat(totalAmountNet) }}</td>
                            </tr>
                            <tr>
                                <td class="">{{ $t('credit_carried_last_month') }}</td>
                                <td></td>
                                <td>{{ numberFormat(oldBalancePpi.balance) }}</td>
                            </tr>
                            <tr>
                                <td class="third vat">{{ $t('ppl_be_paid') }}</td>
                                <td class="third vat"></td>
                                <td class="third vat">{{ numberFormat(balancePpi.balance) }}</td>
                            </tr>
                            <tr>
                                <td class="text-bold text-uppercase">{{ $t('value_added_tax_vat') }}</td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td>{{ $t('tax_credit_from_last_month') }}</td>
                                <td class="">{{ oldBalanceVat.code }}</td>
                                <td class="">{{ numberFormat(oldBalanceVat.balanceCredit) }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('current_month_input_tax') }}</td>
                                <td class=""></td>
                                <td class="">{{ numberFormat(totalAmountP) }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('current_month_output_tax') }}</td>
                                <td class=""></td>
                                <td class="">{{ numberFormat(totalAmountS) }}</td>
                            </tr>
                            <tr v-if="balanceVat.balancePayment > 0">
                                <td class="third vat">{{ $t('vat_to_paid') }}</td>
                                <td class="third vat"></td>
                                <td class="third vat">{{ numberFormat(balanceVat.balancePayment) }}</td>
                            </tr>
                            <tr v-if="balanceVat.balanceCredit > 0">
                                <td class="third vat border_top">{{ $t('credit_forward') }}</td>
                                <td class="thrid vat border_top"></td>
                                <td class="third vat border_top">{{ numberFormat(balanceVat.balanceCredit) }}</td>
                            </tr>
                            <tr>
                                <td class="third vat border_top">{{ $t('vat_refund') }}</td>
                                <td class="third vat border_top"></td>
                                <td class="third vat border_top">{{ numberFormat(vatRefund) }}</td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"
                    />
                </v-col>
                <v-col cols="12">
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-card>
                            <div class="modal_header">
                                <v-card-title>{{ $t("add_tax_credit") }}</v-card-title>
                                <v-icon @click="onClose">close</v-icon>
                            </div>
                            <v-card-text class="modal_text_content"  >
                                <v-row>
                                    <v-col sm="6" cols="12" class="pb-0">
                                        <label class="label">{{ $t("month_of") }}</label>
                                        <month-picker :initial-month="monthOf" @emitMonth="monthOf = $event"/>
                                    </v-col>
                                    <v-col sm="6" cols="12" class="pb-0">
                                        <label class="label">{{ $t("ppi") }}</label>
                                        <v-text-field type="number" v-model="amountPPI" class="mt-1" outlined/>
                                    </v-col>
                                    <v-col sm="6" cols="12" class="py-0">
                                        <label class="label">{{ $t("code") }}</label>
                                        <v-text-field v-model="codeVat" class="mt-1" outlined/>
                                    </v-col>
                                    <v-col sm="6" cols="12" class="py-0">
                                        <label class="label">{{ $t("vat") }}</label>
                                        <v-text-field type="number" v-model="amountVat" class="mt-1" outlined/>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                   
                            <v-card-actions class="modal_footer d-flex justify-space-between">
                                <v-btn @click="onClose" color="primary"  outlined class="black--text capitalize">{{ $t("cancel") }}</v-btn>
                                <v-btn @click="onCreate" color="primary" class="white--text capitalize"
                                >{{ $t("save_close") }}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
import kendo from "@progress/kendo-ui";

const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler")
const saleHandler = require("@/scripts/compliance/handler/saleHandler")
const purchaseHandler = require("@/scripts/compliance/handler/purchaseHandler")
export default {
    data: () => ({
        showLoading: false,
        date: new Date().toISOString().substr(0, 7),
        sales: [],
        purchases: [],
        dialog: false,
        monthOf: '',
        amountPPI: '',
        codeVat: '',
        amountVat: '',
        ppi: {},
        vat: {},
        balanceVat: {},
        balancePpi: {},
        oldBalancePpi: {},
        oldBalanceVat: {},
        totalAmountNet: 0,
        totalAmountP: 0,
        totalAmountS: 0,
        vatRefund: 0,
    }),
    props: {},
    methods: {
        onClose() {
            this.monthOf = ''
            this.amountVat = ''
            this.amountPPI = ''
            this.dialog = false
        },
        async onloadSale() {
            new Promise(resolve => {
                setTimeout(async () => {
                    resolve('resolved');
                    await saleHandler.getByMonth(this.date).then(async res => {
                        this.sales = res.data.data
                        await this.onCalculate()
                        await this.onCalculateTax()
                    })
                }, 100)
            })
        },
        async onloadPurchase() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    purchaseHandler.getByMonth(this.date).then(async res => {
                        this.purchases = res.data.data
                        await this.onCalculate()
                    })
                }, 100)
            })

        },
        async onCalculate() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let amountP = 0,
                        amountS = 0
                    if (this.purchases.length > 0) {
                        window.console.log('123')
                        for (let i = 0; i < this.purchases.length; i++) {
                            amountP += this.purchases[i].totalVAT
                        }
                        window.console.log(this.totalAmountP, 'P')
                    }
                    this.totalAmountP = amountP
                    if (this.sales.length > 0) {
                        window.console.log('987')
                        for (let i = 0; i < this.sales.length; i++) {
                            amountS += this.sales[i].totalVAT
                        }
                        window.console.log(this.totalAmountS, 'S')
                    }
                    this.totalAmountS = amountS
                }, 100)
            })
        },
        async onloadPPI() {
            await monthlyReturnHandler.getPpi().then(res => {
                this.ppi = res.data.data[0]
            })
        },
        async onloadVat() {
            await monthlyReturnHandler.getVat().then(res => {
                this.vat = res.data.data[0]
            })
        },
        async onCalculateTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let amountS = 0
                    for (let i = 0; i < this.sales.length; i++) {
                        amountS += this.sales[i].totalAmountInclusive
                            + this.sales[i].totalSpecificTax
                            + this.sales[i].totalPubTax
                            + this.sales[i].totalAccomTax
                            + this.sales[i].totalAmountNetVat
                    }
                    this.totalAmountNet = amountS * 0.01
                }, 200)
            })
        },
        async getBalancePPI() {
            const addZero = (num, places) => String(num).padStart(places, '0')
            const id = this.ppi.id
            const monthly = new Date(this.date).setMonth(new Date(this.date).getMonth())
            const monthOf = new Date(monthly).getFullYear() + '-' + addZero(new Date(monthly).getMonth(), 2)
            await monthlyReturnHandler.getBalance(id, monthOf, 'monthly').then(res => {
                if (res.data.data.length > 0) {
                    this.oldBalancePpi = res.data.data[0]
                } else {
                    this.oldBalancePpi = {
                        txnBalance: 0,
                        balance: 0,
                    }
                }
            })
            await monthlyReturnHandler.getBalance(id, this.date, 'monthly').then(res => {
                if (res.data.data.length) {
                    this.balancePpi = res.data.data[0]
                } else {
                    this.balancePpi = {
                        txnBalance: 0,
                        balance: 0,
                    }
                }
            })
        },
        async getBalanceVat() {
            const addZero = (num, places) => String(num).padStart(places, '0')
            const id = this.vat.id
            const monthly = new Date(this.date).setMonth(new Date(this.date).getMonth())
            const monthOf = new Date(monthly).getFullYear() + '-' + addZero(new Date(monthly).getMonth(), 2)
            await monthlyReturnHandler.getBalanceVat(id, monthOf, 'monthly').then(res => {
                if (res.data.data.length > 0) {
                    this.oldBalanceVat = res.data.data[0]
                } else {
                    this.oldBalanceVat = {
                        balanceCredit: 0,
                        balancePayment: 0,
                    }
                }
            })

            await monthlyReturnHandler.getBalanceVat(id, this.date, 'monthly').then(res => {
                if (res.data.data.length > 0) {
                    this.balanceVat = res.data.data[0]
                } else {
                    this.balanceVat = {
                        balanceCredit: 0,
                        balancePayment: 0,
                    }
                }
            })
        },
        async onCreate() {
            this.showLoading = true
            const dataPPI = {
                amount: this.amountPPI,
                monthOf: this.monthOf,
                type: 'ppi monthly',
                isDefault: true,
                date: new Date().toJSON()
            }
            await monthlyReturnHandler.addTxnPPI(dataPPI, this.monthOf, 'monthly').then(res => {
                window.console.log(res)
            })
            const dataVat = {
                credit: this.amountVat,
                payment: 0,
                code: this.codeVat,
                monthOf: this.monthOf,
                type: 'vat monthly',
                isDefault: true,
                date: new Date().toJSON()
            }
            await monthlyReturnHandler.addTxnVAT(dataVat, this.monthOf, 'monthly').then(res => {
                window.console.log(res)
            })
            this.showLoading = false
            this.onClose()
        },
        async onSearch() {
            this.showLoading = true
            await this.onloadPurchase()
            await this.onloadSale()
            await this.getBalancePPI()
            await this.getBalanceVat()
            this.showLoading = false
        },
        monthFormat(date) {
            if (date !== 'All Monthly') {
                return kendo.toString(new Date(date), `MMMM yyyy`)
            } else {
                return date
            }
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n2`)
        },
    },
    async mounted() {
        await this.onloadVat()
        await this.onloadPPI()
        await this.onloadSale()
        await this.onloadPurchase()
        await this.getBalancePPI()
        await this.getBalanceVat()
    },
    async created() {

    },
    computed: {
        isValid() {
            return !this.balanceVat.isDefault && !this.balanceVat.isDefault;
        }
    },
    components: {
        'LoadingMe': LoadingMe,
        'month-picker': () => import('@/components/custom_templates/MonthPicker')
    },
};
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.primary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: #92d050 !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    font-size: 14px;
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    height: 37px !important;
    color: #000;
}

.theme--light.v-data-table {
    background-color: transparent !important;
    border-top: thin solid #ddd;
    border-bottom: thin solid #ddd;
    border-radius: 0 !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom: thin solid #ddd;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.border_top {
    border-top: thin solid #fff !important;
}

.v-application .primary,
.v-application .third {
    border-color: #fff !important;
}

.vat {
    color: #fff;
    font-weight: bold;
    font-family: 'Niradei-Bold', serif !important;
}

.amount {
    text-align: right !important;
}

.head-summary {
    text-align: right !important;
}
</style>
