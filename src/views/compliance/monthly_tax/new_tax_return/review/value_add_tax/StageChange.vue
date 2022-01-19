<template>
    <v-row>
        <!-- <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0"> -->
        <v-col sm="12" cols="12" class="pt-2 px-6">
            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-bold text-uppercase">{{ $t('description') }}</th>
                                <th></th>
                                <th class="text-bold text-uppercase">{{ $t('amount_exclusive_of_vat') }}</th>
                                <th class="text-bold text-uppercase">{{ $t('vat_amount') }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="text-uppercase text-bold">{{ $t('monthly_purchase_state_charge') }}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td>{{ $t('sale_include_vat_10') }}</td>
                                <td class="">{{ $t('taxable_person') }}</td>
                                <td class="">{{ amountExcluVatP1 }}</td>
                                <td class="">{{ amountVatP1 }}</td>
                            </tr>
                            <tr>
                                <td>{{ 'import_10' }}</td>
                                <td class="">{{ $t('overseas_suppliers') }}</td>
                                <td class="">{{ amountExcluVatP2 }}</td>
                                <td class="">{{ amountVatP2 }}</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-right text-uppercase  text-bold">
                                    {{ $t('total_amount_input_taxs') }}
                                </td>
                                <td class="grayBg">{{ totalVatP }}</td>
                            </tr>
                            <tr>
                                <td class="uppercase text-bold">{{ $t('monthly_sales_state_charge') }}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td>{{ $t('sale_include_vat_10') }}</td>
                                <td class="">{{ $t('taxable_person') }}</td>
                                <td class="">{{ amountExcluVatS1 }}</td>
                                <td class="">{{ amountVatS1 }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('sale_include_vat_10') }}</td>
                                <td class="">{{ $t('non_taxable_person') }}</td>
                                <td class="">{{ amountExcluVatS2 }}</td>
                                <td class="">{{ amountVatS2 }}</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="capitalize text-right text-bold">
                                    {{ $t('total_amount_output_taxs') }}
                                </td>
                                <td class="grayBg">{{ totalVatS }}</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-right text-uppercase text-bold">
                                    {{ $t('vat_state_charge_credit_forward') }}
                                </td>
                                <td class="primary white--text">{{ totalSC }}</td>
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
        <!-- </v-card>
    </v-col> -->
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
import kendo from "@progress/kendo-ui";

const purchaseHandler = require("@/scripts/compliance/handler/purchaseHandler")
const saleHandler = require("@/scripts/compliance/handler/saleHandler")
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

        purchases: [],
        sales: [],

        amountExcluVatP1: 0,
        amountVatP1: 0,
        amountExcluVatP2: 0,
        amountVatP2: 0,

        amountExcluVatS1: 0,
        amountVatS1: 0,
        amountExcluVatS2: 0,
        amountVatS2: 0,

        totalVatS: 0,
        totalVatP: 0,
        totalSC: 0,
        totalAmounExculS: 0,
        totalAmounExculP: 0,
    }),
    props: ['sale', 'purchase'],
    watch: {'saleSP': 'onloadSale', 'purchaseSP': 'onloadPurchase'},
    methods: {
        async onloadPurchase() {
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(async () => {
                    resolve('resolved');
                    if (this.purchaseSP.length <= 0) {
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve('resolved');
                                purchaseHandler.getByMrId(this.$route.params.id).then(async res => {
                                    this.purchases = res.data.data
                                    await this.onCalculateTax()
                                    this.showLoading = false
                                })
                            }, 200)
                        })
                    } else {
                        this.purchases = this.purchaseSP
                        await this.onCalculateTax()
                    }
                }, 300)
            })
        },
        async onloadSale() {
            window.console.log('sale tab load', this.sales)
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(async () => {
                    resolve('resolved');
                    if (this.sales.length <= 0) {
                        new Promise(resolve => {
                            setTimeout(async () => {
                                resolve('resolved');
                                await saleHandler.getByMrId(this.$route.params.id).then(async res => {
                                    this.sales = res.data.data
                                    await this.onCalculateTax()
                                })
                            }, 200)
                        })
                    } else {
                        this.sales = this.saleSP
                        await this.onCalculateTax()
                    }
                }, 300)
            })
        },
        async onloadData() {
            await this.onloadSale()
            await this.onloadPurchase()
        },
        async onCalculateTax() {
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let totalPAmountVAT = 0, totalSAmountVAT = 0
                    let amountPNet1 = 0, amountPNet2 = 0,
                        amountSNet1 = 0, amountSNet2 = 0,
                        amountPVat1 = 0, amountPVat2 = 0,
                        amountSVat1 = 0, amountSVat2 = 0
                    window.console.log(this.purchases, this.sales, 'sc')
                    if (this.purchases.length > 0) {
                        for (let i = 0; i < this.purchases.length; i++) {
                            if (this.purchases[i].taxName.name.toLowerCase().includes('state charge')) {
                                window.console.log(this.purchases[i], 'sc pc')
                                if (this.purchases[i].supplier.nature.toLowerCase() === 'individual-local' || this.purchases[i].supplier.nature.toLowerCase() === 'taxable entity') {
                                    amountPNet1 += this.purchases[i].totalAmountInclusive
                                    amountPVat1 += this.purchases[i].totalVAT
                                } else if (this.purchases[i].supplier.nature.toLowerCase() === 'individual-foreign' || this.purchases[i].supplier.nature.toLowerCase() === 'foreign entity') {
                                    amountPNet2 += this.purchases[i].totalAmountInclusive
                                    amountPVat2 += this.purchases[i].totalVAT
                                }
                            }
                        }
                    }
                    if (this.sales.length > 0) {
                        for (let i = 0; i < this.sales.length; i++) {
                            if (this.sales[i].taxName.toLowerCase().includes('state charge')) {
                                window.console.log('sc sale', this.sales[i])
                                if (this.sales[i].customer.nature.toLowerCase() === 'individual-local' || this.sales[i].customer.nature.toLowerCase() === 'taxable entity') {
                                    amountSNet1 += this.sales[i].totalAmountInclusive
                                    amountSVat1 += this.sales[i].totalVAT
                                } else if (this.sales[i].customer.nature.toLowerCase() === 'non-taxable entity') {
                                    amountSNet2 += this.sales[i].totalAmountInclusive
                                    amountSVat2 += this.sales[i].totalVAT
                                }
                            }
                        }
                    }
                    totalPAmountVAT = amountPVat1 + amountPVat2
                    totalSAmountVAT = amountSVat1 + amountSVat2
                    this.totalSC = this.numberFormat(totalSAmountVAT - totalPAmountVAT)
                    // this.vats[8].amountVAT = (totalSAmountVAT - totalPAmountVAT).toLocaleString()
                    this.totalVatP = this.numberFormat(totalPAmountVAT)
                    this.totalVatS = this.numberFormat(totalSAmountVAT)
                    this.totalAmounExculS = amountSNet1 + amountSNet2
                    this.totalAmounExculP = amountPNet1 + amountPNet2
                    // this.vats[3].amountVAT = totalPAmountVAT.toLocaleString()

                    this.amountExcluVatP1 = this.numberFormat(amountPNet1)
                    this.amountExcluVatP2 = this.numberFormat(amountPNet2)
                    this.amountExcluVatS1 = this.numberFormat(amountSNet1)
                    this.amountExcluVatS2 = this.numberFormat(amountSNet2)

                    this.amountVatP1 = this.numberFormat(amountPVat1)
                    this.amountVatP2 = this.numberFormat(amountPVat2)
                    this.amountVatS1 = this.numberFormat(amountSVat1)
                    this.amountVatS2 = this.numberFormat(amountSVat2)
                    this.showLoading = false
                }, 200)
            })
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
        await this.onloadData()
    },
    computed: {
        saleSP() {
            if (this.sale !== undefined) {
                window.console.log('stage charge sale', this.sale)
                return this.sale
            } else {
                return []
            }
        },
        purchaseSP() {
            if (this.purchase !== undefined) {
                return this.purchase
            } else {
                return []
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
