<template>
    <v-row>
        <!-- <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0"> -->
        <v-col sm="12" cols="12" class="pt-2 px-6">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="6" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{ $t('monthly_sales') }}</h2>
                            <!-- <p class="mb-0">{{$t('for_the_month_of')}}: <span class="text-bold">March 2021</span></p> -->
                        </v-col>
                        <!-- <v-col sm="6" cols="12" class="py-0 d-flex justify-end hide_form_alert">
                            <div class="d-flex">
                                <month-picker :initialMonth="end_date" @emitMonth="end_date = $event" :min="start_date"/>
                                <v-btn class="ma-1 ml-2" color="primary white--text text-capitalize" @click="onSearch">
                                    {{$t('view')}}
                                </v-btn>
                            </div>
                        </v-col> -->
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
                                <th></th>
                                <th class="text-bold text-uppercase">{{ $t('amount_exclusive_of_vat') }}</th>
                                <th class="text-bold text-uppercase">{{ $t('vat_amount') }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{{ $t('sale_include_vat_10') }}</td>
                                <td class="">{{ $t('taxable_person') }}</td>
                                <td class="">{{ amountExcluVat1 }}</td>
                                <td class="">{{ amountVat1 }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('sale_include_vat_10') }}</td>
                                <td class="">{{ $t('non_taxable_person') }}</td>
                                <td class="">{{ amountExcluVat2 }}</td>
                                <td class="">{{ amountVat2 }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('export_0') }}</td>
                                <td class="">{{ $t('overseas_customer') }}</td>
                                <td class="">{{ amountExcluVat3 }}</td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td>{{ $t('sale_exclusive_of_vat') }}</td>
                                <td class="">{{ $t('taxable_person') }}</td>
                                <td class="">{{ amountExcluVat4 }}</td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td>{{ $t('sale_exclusive_of_vat') }}</td>
                                <td class="">{{ $t('non_taxable_person') }}</td>
                                <td class="">{{ amountExcluVat5 }}</td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-bold text-right">{{ $t('total_amount_output_taxs') }}</td>
                                <td class="primary white--text">{{ numberFormat(totalAmount) }}</td>
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

        amountExcluVat1: 0,
        amountVat1: 0,
        amountExcluVat2: 0,
        amountVat2: 0,
        amountExcluVat3: 0,
        amountVat3: 0,
        amountExcluVat4: 0,
        amountVat4: 0,
        amountExcluVat5: 0,
        amountVat5: 0,
        totalAmount: 0,
        totalAmounExculS: 0,
        totalSp: 0,
        totalPl: 0,
        totalAccomTax: 0
    }),
    props: ['sale'],
    watch: {'sales': 'onloadSale'},
    methods: {
        onUpdate() {
            this.$emit('getAmountSale', this.totalAmount ? this.totalAmount : 0)
        },
        onUpdateOtherAmount() {
            this.$emit('getOtherAmount', {totalSp: this.totalSp, totalPl: this.totalPl, totalAccomTax: this.totalAccomTax})
        },
        onUpdateAmountExcul() {
            this.$emit('getAmountSaleExcul', this.totalAmounExculS ? this.totalAmounExculS : 0)
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
                                    await this.onCalculateSaleTax(res.data.data)
                                })
                            }, 200)
                        })
                    } else {
                        await this.onCalculateSaleTax(this.sales)
                    }
                }, 300)
            })
        },
        async onCalculateSaleTax(data) {
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    // let totalAmountNet = 0
                    let totalAmountVAT = 0, totalSp = 0, totalPl = 0, totalAccomTax = 0
                    let amountNet1 = 0, amountVAT1 = 0,
                        amountNet2 = 0, amountVAT2 = 0,
                        amountNet3 = 0, amountNet4 = 0,
                        amountNet5 = 0
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].customer.nature.toLowerCase() === 'individual-local' || data[i].customer.nature.toLowerCase() === 'taxable entity') {
                            if (data[i].totalAmountInclusive > 0) {
                                amountNet1 += data[i].totalAmountInclusive
                                    + data[i].totalSpecificTax
                                    + data[i].totalPubTax
                                    + data[i].totalAccomTax
                                totalSp += data[i].totalSpecificTax
                                totalPl += data[i].totalPubTax
                                totalAccomTax += data[i].totalAccomTax
                            }
                            if (data[i].totalAmountNetVat > 0) {
                                amountNet4 += data[i].totalAmountNetVat
                            }
                            amountVAT1 += data[i].totalVAT
                        } else if (data[i].customer.nature.toLowerCase() === 'non-taxable entity') {
                            if (data[i].totalAmountInclusive > 0) {
                                amountNet2 += data[i].totalAmountInclusive
                                    + data[i].totalSpecificTax
                                    + data[i].totalPubTax
                                    + data[i].totalAccomTax
                                totalSp += data[i].totalSpecificTax
                                totalPl += data[i].totalPubTax
                                totalAccomTax += data[i].totalAccomTax
                            }
                            if (data[i].totalAmountNetVat > 0) {
                                amountNet5 += data[i].totalAmountNetVat
                            }
                        } else if (data[i].customer.nature.toLowerCase() === 'foreign entity' || data[i].customer.nature.toLowerCase() === 'individual-foreign') {
                            amountNet3 += data[i].totalAmountInclusive
                                + data[i].totalAmountNetVat
                                + data[i].totalSpecificTax
                                + data[i].totalPubTax
                                + data[i].totalAccomTax
                            totalSp += data[i].totalSpecificTax
                            totalPl += data[i].totalPubTax
                            totalAccomTax += data[i].totalAccomTax
                        }
                    }
                    // totalAmountNet = amountNet1 + amountNet2 + amountNet3 + amountNet4 + amountNet5
                    totalAmountVAT = amountVAT1 + amountVAT2
                    this.totalAmounExculS = amountNet1 + amountNet2 + amountNet3 + amountNet4 + amountNet5
                    this.totalAmount = totalAmountVAT
                    this.totalSp = totalSp
                    this.totalPl = totalPl
                    this.totalAccomTax = totalAccomTax
                    this.amountExcluVat1 = this.numberFormat(amountNet1)
                    this.amountVat1 = this.numberFormat(amountVAT1)
                    this.amountExcluVat2 = this.numberFormat(amountNet2)
                    this.amountVat2 = this.numberFormat(amountVAT2)
                    this.amountExcluVat3 = this.numberFormat(amountNet3)
                    this.amountExcluVat4 = this.numberFormat(amountNet4)
                    this.amountExcluVat5 = this.numberFormat(amountNet5)
                    // this.monthlySales[5].amountNet = totalAmountNet.toLocaleString()
                    // this.monthlySales[5].amountVAT = totalAmountVAT.toLocaleString()
                    this.onUpdate()
                    this.onUpdateAmountExcul()
                    this.onUpdateOtherAmount()
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
        await this.onloadSale()
    },
    computed: {
        sales() {
            if (this.sale !== undefined) {
                window.console.log('sale tab', this.sale)
                return this.sale
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
