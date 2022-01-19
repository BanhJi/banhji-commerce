<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-2 px-6">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="8" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{$t('payment_of_tax_on_income')}}</h2>
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
                                    <th class="text-bold text-uppercase">{{$t('description')}}</th>
                                    <th class="text-bold text-uppercase">{{$t('amount_exclusive')}}</th>
                                    <th class="text-bold text-uppercase">{{$t('monthof')}}</th>
                                    <th class="text-bold text-uppercase">{{$t('amount')}}</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{{$t('prepayment_of_tax_income')}}</td>
                                <td class="text-center">{{ numberFormat(amountSaleExculs) || numberFormat(amountNet) }}</td>
                                <td class="">{{ monthOf }}</td>
                                <td class="text-center">{{ numberFormat(totalAmountNet) }}</td>
                            </tr>
                            <tr>
                                <td>{{$t('credit_carried_last_month')}}</td>
                                <td class=""></td>
                                <td class="">{{ newMonthOf }}</td>
                                <td class="text-center">{{ numberFormat(balance.balance) }}</td>
                            </tr>

                            <tr>
                                <td class="text-bold">PPI to be paid/ (Credit Forward)</td>
                                <td class=""></td>
                                <td class="">{{ monthOf }}</td>
                                <td class="primary text-bold white--text text-center">{{ numberFormat(totalBalance) }}</td>
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
import kendo from '@progress/kendo-ui'
const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler")
const saleHandler = require("@/scripts/compliance/handler/saleHandler")
export default {
    data: () => ({
        showLoading: false,
        is_month: false,
        is_start_date: false,
        is_end_date: false,
        start_date: "",
        end_date: "",

        search:{
            start_date: "",
            end_date: ""
        },
        balance: {},
        totalBalance: 0,
        newMonthOf: '',
        amountNet: 0,
        totalAmountNet: 0,
        sales: [],
        step: 0,
        ppi: {},
    }),
    props: ['monthlyReturn', 'amountSaleExcul'],
    watch: {'amountSaleExculs': 'onCalculateTax', 'totalAmountNet': 'calculate'},
    methods: {
        async loadBalance() {
            if (this.balance.balance === undefined) {
                await this.onloadSale()
                new Promise(resolve => {
                    setTimeout(async () => {
                        resolve('resolved');
                        await this.calculate()
                        this.showLoading = false
                    }, 500)
                })
            }

        },
        onUpdate() {
            this.$emit('onUpdate', this.step)
        },
        async onUpdateBalance() {
            this.$emit('getBalancePPI', {balance: this.totalBalance, credit: this.balance.balance})
        },
        async onloadSale() {
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(async () => {
                    resolve('resolved');
                    await saleHandler.getByMrId(this.$route.params.id).then(async res => {
                        this.sales = res.data.data
                        let data = JSON.parse(localStorage.getItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Sale'))
                        const allArray = [...this.sales, ...data]
                        this.sales = allArray.filter((e, i) => allArray.findIndex(o => o.totalSpecificTax === e.totalSpecificTax && o.totalPubTax === e.totalPubTax && o.totalAccomTax === e.totalAccomTax && o.totalVAT === e.totalVAT && o.totalAmountInclusive === e.totalAmountInclusive && o.totalAmountNetVat === e.totalAmountNetVat) === i)
                        await this.onCalculateTax()
                    })
                }, 100)
            })
        },
        async onCalculateTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let amountS = 0
                    if (this.amountSaleExculs > 0) {
                        this.totalAmountNet = this.amountSaleExculs * 0.01
                    } else {
                        for (let i = 0; i < this.sales.length; i++) {
                            amountS += this.sales[i].totalAmountInclusive
                                + this.sales[i].totalSpecificTax
                                + this.sales[i].totalPubTax
                                + this.sales[i].totalAccomTax
                                + this.sales[i].totalAmountNetVat
                        }
                        this.amountNet = this.numberFormat(amountS)
                        window.console.log(amountS, 'amountS')
                        this.totalAmountNet = amountS * 0.01
                    }
                }, 200)
            })
        },
        numberFormat(value) {
            return kendo.toString(value, `n2`)
        },
        async getBalance() {
            if (this.ppi.id === undefined) {
                await this.onloadPPI()
            }
            const addZero = (num, places) => String(num).padStart(places, '0')
            const id = this.ppi.id
            const monthly = new Date(this.monthlyReturn.monthOf).setMonth(new Date(this.monthlyReturn.monthOf).getMonth())
            const monthOf = new Date(monthly).getFullYear() + '-' + addZero(new Date(monthly).getMonth(), 2)
            this.newMonthOf = monthOf
            monthlyReturnHandler.getBalance(id, monthOf, 'monthly').then(res => {
                if (res.data.data.length > 0) {
                    this.balance = res.data.data[0]
                } else {
                    this.balance = {
                        txnBalance: 0,
                        balance: 0,
                    }
                }
            })
        },
        async onloadPPI() {
            await monthlyReturnHandler.getPpi().then(res => {
                this.ppi = res.data.data[0]
            })
        },
        async calculate() {
            await this.getBalance()
            new Promise(resolve => {
                setTimeout(async () => {
                    resolve('resolved');
                    window.console.log(this.totalAmountNet, 'totalAmount')
                    window.console.log(this.amountSaleExculs, 'amountSaleExcul')
                    if (this.totalAmountNet > 0) {
                        this.totalBalance = kendo.parseFloat(this.totalAmountNet) + kendo.parseFloat(this.balance.balance)
                    }
                    // else {
                    //     this.totalBalance = kendo.parseFloat(this.totalAmount) + kendo.parseFloat(this.balance.balance)
                    // }
                    // await this.addTxn(this.totalBalance)
                    await this.onUpdateBalance()
                }, 400)
            })
        },
        // async addTxn(amounts) {
        //     if (amounts >=0) {
        //         const data = {
        //             amount: amounts,
        //             monthOf: this.monthlyReturn.monthOf,
        //             type: 'ppi monthly',
        //             date: new Date().toJSON()
        //         }
        //         await monthlyReturnHandler.addTxnPPI(data, this.monthlyReturn.monthOf, 'monthly').then(res => {
        //             window.console.log(res)
        //         })
        //     }
        // },
        onSearch(){
            this.search = {
                'start_date': this.start_date + '-01',
                'end_date': this.end_date + '-01'
            }
        }
    },
    async mounted() {
        await this.onloadPPI()
        await this.loadBalance()
    },
    computed: {
        monthOf() {
            if (this.monthlyReturn.id !== undefined) {
                return this.monthlyReturn.monthOf
            }else {
                return ''
            }
        },
        amountSaleExculs() {
            if (this.amountSaleExcul !== undefined) {
                return this.amountSaleExcul
            } else {
                return 0
            }
        },
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
    .vat{
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
