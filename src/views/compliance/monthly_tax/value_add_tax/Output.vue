<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6 pt-4">
            <v-card color="white" class="no_border" elevation="0">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row class="">
                        <v-col sm="12" cols="12" class="pt-0">
                            <v-row>
                                <v-col sm="6" cols="12" class="py-0">
                                    <h2 class="mb-0 font_20">{{$t('vat_output')}}</h2>
                                    <p class="mb-0">{{$t('for_the_month_of')}}: <span class="text-bold">{{ monthOf }}</span></p>
                                </v-col>
                                <v-col sm="6" cols="12" class="py-0 d-flex justify-end hide_form_alert">
                                    <div class="d-flex">
                                        <month-picker :initialMonth="end_date" @emitMonth="end_date = $event" :min="start_date"/>
                                        <v-btn class="ma-1 ml-2" color="primary white--text text-capitalize" @click="onSearch">
                                            {{$t('view')}}
                                        </v-btn>
                                    </div>
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
                                            <th class="text-bold text-uppercase">{{$t('description')}}</th>
                                            <th></th>
                                            <th class="text-bold text-uppercase">{{$t('amount_exclusive_of_vat')}}</th>
                                            <th class="text-bold text-uppercase">{{$t('vat_amount')}}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{{ $t('sales_include_vat')}}</td>
                                        <td class="">{{ $t('taxable_person') }}</td>
                                        <td class="">{{ amountExcluVat1 }}</td>
                                        <td class="">{{ amountVat1 }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('sales_include_vat')}}</td>
                                        <td class="">{{ $t('non_taxable_person') }}</td>
                                        <td class="">{{ amountExcluVat2 }}</td>
                                        <td class="">{{ amountVat2 }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('export')}}</td>
                                        <td class="">{{ $t('oversee_customer') }}</td>
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
                                        <td class="third white--text text-uppercase text-bold">{{ $t('total_amount_output_taxes') }}</td>
                                        <td class="third white--text"></td>
                                        <td class="third white--text"></td>
                                        <td class="third white--text">{{ totalAmount }}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
<!--                            <v-btn color="primary" class="mt-3 float-right capitalize" outlined>-->
<!--                                <span class="black&#45;&#45;text ">{{$t('view_detail_record')}}</span>-->
<!--                            </v-btn>-->
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                :myLoading="true"
                            />
                        </v-col>
                    </v-row>
                </v-col>
            </v-card>
        </v-col>
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

        monthOf: 'All Monthly',

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

        sales: []
    }),
    // props: ['sales'],
    watch: {
        'sales': 'onCalculateSaleTax'
    },
    methods: {
        async onloadSale() {
            await saleHandler.getAll().then(async res => {
                this.sales = res.data.data
                await this.onCalculateSaleTax()
            })
            // if (this.data.length === 0) {
            //
            // }
        },
        async onCalculateSaleTax() {
            this.showLoading = true
            window.console.log('data change')
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    // let totalAmountNet = 0
                    let totalAmountVAT = 0
                    let amountNet1 = 0, amountVAT1 = 0,
                        amountNet2 = 0, amountVAT2 = 0,
                        amountNet3 = 0, amountNet4 = 0,
                        amountNet5 = 0
                    for (let i = 0; i < this.sales.length; i++) {
                        if (this.sales[i].customer.nature.name.toLowerCase() === 'individual-local' || this.sales[i].customer.type.toLowerCase() === 'taxable entity') {
                            if (this.sales[i].totalAmountInclusive > 0) {
                                amountNet1 += this.sales[i].totalAmountInclusive
                                    + this.sales[i].totalSpecificTax
                                    + this.sales[i].totalPubTax
                                    + this.sales[i].totalAccomTax
                            }
                            if (this.sales[i].totalAmountNetVat > 0) {
                                amountNet4 += this.sales[i].totalAmountNetVat
                            }
                            amountVAT1 += this.sales[i].totalVAT
                        }else if (this.sales[i].customer.nature.name.toLowerCase() === 'non-taxable entity') {
                            if (this.sales[i].totalAmountInclusive > 0) {
                                amountNet2 += this.sales[i].totalAmountInclusive
                                    + this.sales[i].totalSpecificTax
                                    + this.sales[i].totalPubTax
                                    + this.sales[i].totalAccomTax
                            }
                            if (this.data[i].totalAmountNetVat > 0) {
                                amountNet5 += this.data[i].totalAmountNetVat
                            }
                        }else if (this.sales[i].customer.nature.name.toLowerCase() === 'foreign entity' || this.sales[i].customer.nature.name.toLowerCase() === 'individual-foreign') {
                            amountNet3 += this.sales[i].totalAmountInclusive
                                + this.sales[i].totalAmountNetVat
                                + this.sales[i].totalSpecificTax
                                + this.sales[i].totalPubTax
                                + this.sales[i].totalAccomTax
                        }
                    }
                    // totalAmountNet = amountNet1 + amountNet2 + amountNet3 + amountNet4 + amountNet5
                    totalAmountVAT = amountVAT1 + amountVAT2
                    this.totalAmount = this.numberFormat(totalAmountVAT)
                    this.amountExcluVat1 = this.numberFormat(amountNet1)
                    this.amountVat1 = this.numberFormat(amountVAT1)
                    this.amountExcluVat2 = this.numberFormat(amountNet2)
                    this.amountVat2 = this.numberFormat(amountVAT2)
                    this.amountExcluVat3 = this.numberFormat(amountNet3)
                    this.amountExcluVat4 = this.numberFormat(amountNet4)
                    this.amountExcluVat5 = this.numberFormat(amountNet5)
                    // this.monthlySales[5].amountNet = totalAmountNet.toLocaleString()
                    // this.monthlySales[5].amountVAT = totalAmountVAT.toLocaleString()
                    this.showLoading = false
                }, 200)
            })
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n2`)
        },
        Change(){
        },
 
        onSearch(){
            this.showLoading = true
            this.monthOf = kendo.toString(new Date(this.end_date), 'MMMM yyyy')
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    saleHandler.getByMonth(this.end_date).then(res => {
                        window.console.log(res)
                        this.sales = res.data.data
                        this.showLoading = false
                    })
                }, 200)
            })
        }
    },
    async mounted() {
        await this.onloadSale()
        // await this.onloadSale()
    },
    computed: {
        // data: {
        //     set(value) {
        //         this.sale = value
        //     },
        //     get() {
        //         if (this.sales.length > 0) {
        //             return this.sales
        //         }else if (this.sale.length > 0) {
        //             return this.sale
        //         } else {
        //             return []
        //         }
        //     }
        // }
    },
    components: {
        'LoadingMe': LoadingMe,
        'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
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
