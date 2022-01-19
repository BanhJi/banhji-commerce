<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-2 px-6">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="6" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{ $t('value_added_tax') }}</h2>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-bold text-uppercase">{{ $t('description') }}</th>
                                <th class="text-bold text-uppercase">{{ $t('monthof') }}</th>
                                <th class="text-bold text-uppercase">{{ $t('code') }}</th>
                                <th class="text-bold text-uppercase text-center">{{ $t('amount') }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{{ $t('tax_credit_carried_from_last_month') }}</td>
                                <td class="">{{ newMonthOf }}</td>
                                <td class="">{{ balance.code }}</td>
                                <td class="text-center">{{ numberFormat(balance.balanceCredit) }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('total_amount_input_tax') }}</td>
                                <td class="">{{ monthOf }}</td>
                                <td class=""></td>
                                <td class="text-center">{{ totalAmountPurchase || numberFormat(totalAmountP) }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('total_amount_output_tax') }}</td>
                                <td class="">{{ monthOf }}</td>
                                <td class=""></td>
                                <td class="text-center">{{ numberFormat(amountSale) || numberFormat(totalAmountS) }}
                                </td>
                            </tr>
                            <tr v-if="tBalance <= 0">
                                <td class="text-bold">VAT to be paid</td>
                                <td class="text-bold">{{ monthOf }}</td>
                                <td class=""></td>
                                <td class="primary text-center white--text text-bold">{{ totalBalance }}</td>
                            </tr>
                            <tr v-if="tBalance > 0">
                                <td class="text-bold">(Credit Forward)</td>
                                <td class="text-bold">{{ monthOf }}</td>
                                <td class=""></td>
                                <td class="primary text-center text-bold white--text">{{ totalBalance }}</td>
                            </tr>
                            <tr>
                                <td class="text-bold">{{ $t('vat_refund') }}</td>
                                <td class="text-bold">{{ monthOf }}</td>
                                <td class=""></td>
                                <td class="primary text-center white--text text-bold">{{ numberFormat(vatRefund) }}</td>
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
            </v-row>
        </v-col>

    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
import kendo from "@progress/kendo-ui";

const saleHandler = require("@/scripts/compliance/handler/saleHandler")
const purchaseHandler = require("@/scripts/compliance/handler/purchaseHandler")
const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler")
export default {
    data: () => ({
        showLoading: false,
        is_month: false,
        is_start_date: false,
        is_end_date: false,
        start_date: "",
        end_date: "",

        search: {
            start_date: "",
            end_date: ""
        },
        balance: {},
        sales: [],
        purchases: [],
        newMonthOf: '',
        totalAmountP: 0,
        totalAmountS: 0,
        totalBalance: 0,
        tBalance: 0,
        vatRefund: 0,
        statusSale: false,
        statusPurchase: false,
        vat: {},
    }),
    props: ['monthlyReturn', 'amountSale', 'totalAmountPurchase'],
    watch: {
        'amountSales': 'calculate',
        'totalAmountPurchases': 'calculate',
        'totalAmountP': 'calculate',
        'totalAmountS': 'calculate',
        'balanceCredit': 'calculate'
    },
    methods: {
        async onUpdateBalance(credit, payment) {
            this.$emit('getBalanceVAT', {credit: credit, payment: payment})
        },
        async loadBalance() {
            this.showLoading = true
            if (this.balance.balanceCredit === undefined) {
                await this.onloadSale()
                await this.onloadPurchase()
                new Promise(resolve => {
                    setTimeout(async () => {
                        resolve('resolved');
                        await this.calculate()
                        this.showLoading = false
                    }, 700)
                })
            }
        },
        async getBalance() {
            const addZero = (num, places) => String(num).padStart(places, '0')
            const id = this.vat.id
            const monthly = new Date(this.monthlyReturn.monthOf).setMonth(new Date(this.monthlyReturn.monthOf).getMonth())
            const monthOf = new Date(monthly).getFullYear() + '-' + addZero(new Date(monthly).getMonth(), 2)
            this.newMonthOf = monthOf
            monthlyReturnHandler.getBalanceVat(id, monthOf, 'monthly').then(res => {
                if (res.data.data.length > 0) {
                    this.balance = res.data.data[0]
                } else {
                    this.balance = {
                        balanceCredit: 0,
                        balancePayment: 0,
                    }
                }
            })
        },
        async onloadVat() {
            await monthlyReturnHandler.getVat().then(res => {
                this.vat = res.data.data[0]
            })
        },
        async onloadSale() {
            new Promise(resolve => {
                setTimeout(async () => {
                    resolve('resolved');
                    await saleHandler.getByMrId(this.$route.params.id).then(async res => {
                        this.sales = res.data.data
                        await this.onCalculate()
                    })
                }, 100)
            })
        },
        async onloadPurchase() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    purchaseHandler.getByMrId(this.$route.params.id).then(async res => {
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
                    if (this.purchases.length > 0 && this.totalAmountPurchases === 0) {
                        window.console.log('123')
                        for (let i = 0; i < this.purchases.length; i++) {
                            if (this.purchases[i].typeProduct.baseAmount !== "Net") {
                                amountP += this.purchases[i].totalVAT
                            }
                        }
                        this.totalAmountP = amountP
                        window.console.log(amountP)
                        this.statusPurchase = true
                        window.console.log(this.totalAmountP, 'P')
                    }
                    if (this.sales.length > 0 && this.amountSale === 0) {
                        window.console.log('987')
                        for (let i = 0; i < this.sales.length; i++) {
                            amountS += this.sales[i].totalVAT
                        }
                        this.totalAmountS = amountS
                        this.statusSale = true
                        window.console.log(this.totalAmountS, 'S')
                    }
                }, 100)
            })
        },
        async calculate() {
            await this.getBalance()
            new Promise(resolve => {
                setTimeout(async () => {
                    resolve('resolved');
                    window.console.log(this.totalAmountS, this.totalAmountP, 'sale, purchase')
                    let tBalance = 0, credit = 0, payment = 0
                    if (this.statusSale && this.statusPurchase) {
                        this.totalBalance = kendo.parseFloat(this.totalAmountP) + kendo.parseFloat(this.balance.balanceCredit) - kendo.parseFloat(this.totalAmountS)
                    } else {
                        window.console.log(this.totalAmountPurchase, this.amountSale, 'b1')
                        this.totalBalance = kendo.parseFloat(this.totalAmountPurchase) + kendo.parseFloat(this.balance.balanceCredit) - kendo.parseFloat(this.amountSale)
                    }
                    this.tBalance = this.totalBalance
                    if (this.totalBalance < 0) {
                        tBalance = this.totalBalance * (-1)
                        payment = this.totalBalance * (-1)
                        this.totalBalance = `(${this.numberFormat(this.totalBalance * (-1))})`
                    } else {
                        credit = this.totalBalance
                        tBalance = this.totalBalance
                        this.totalBalance = this.numberFormat(this.totalBalance)
                    }
                    window.console.log(this.totalBalance, tBalance, 'total balance')
                    // await this.addTxn(credit, payment)
                    await this.onUpdateBalance(credit, payment)
                }, 500)
            })
        },
        async addTxn(credit, payment) {
            if (credit >= 0 || payment >= 0) {
                const data = {
                    credit: credit,
                    payment: payment,
                    monthOf: this.monthlyReturn.monthOf,
                    type: 'vat monthly',
                    date: new Date().toJSON()
                }
                await monthlyReturnHandler.addTxnVAT(data, this.monthlyReturn.monthOf, 'monthly').then(res => {
                    window.console.log(res)
                })
            }
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n2`)
        },
        onSearch() {
            this.search = {
                'start_date': this.start_date + '-01',
                'end_date': this.end_date + '-01'
            }
        }
    },
    async mounted() {
        window.console.log(this.totalAmountPurchase, 'tAp')
        await this.onloadVat()
        await this.loadBalance()
    },
    computed: {
        balanceCredit() {
            if (this.balance.balanceCredit > 0) {
                return this.balance.balanceCredit
            } else {
                return 0
            }
        },
        monthOf() {
            if (this.monthlyReturn.id !== undefined) {
                return this.monthlyReturn.monthOf
            } else {
                return ''
            }
        },
        amountSales() {
            if (this.amountSale !== undefined) {
                window.console.log(this.amountSale, 'VAT Sale')
                return this.amountSale
            } else {
                return 0
            }
        },
        totalAmountPurchases() {
            if (this.amountPurchase !== undefined) {
                window.console.log(this.amountPurchase, 'VAT purchase')
                return this.amountPurchase
            } else {
                return 0
            }
        },
        amountPurchaseExculs() {
            if (this.amountPurchaseExcul !== undefined) {
                return this.amountPurchaseExcul
            } else {
                return 0
            }
        }
    },
    components: {
        'LoadingMe': LoadingMe,
        // 'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
    },
};
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    font-size: 14px;
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    height: 37px !important;
    color: #000;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.primary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: #92d050 !important;
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
    text-transform: uppercase;
    color: #fff;
    font-weight: bold;
    font-family: 'Niradei-Bold' !important;
}

.amount {
    text-align: right !important;
}

.head-summary {
    text-align: right !important;
}
</style>
