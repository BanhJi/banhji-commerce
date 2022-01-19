<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6 pt-4">
            <v-card color="white" class="no_border" elevation="0">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row class="">
                        <v-col sm="12" cols="12" class="pt-0">
                            <v-row>
                                <v-col sm="6" cols="12" class="py-0">
                                    <h2 class="mb-0 font_20">{{$t('vat_input')}}</h2>
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
                                        <td>{{ $t('local_purchase_include')}}</td>
                                        <td class="">{{ $t('taxable_person') }}</td>
                                        <td class="">{{ amountExcluVat1 }}</td>
                                        <td class="">{{ amountVat1 }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('import_10%')}}</td>
                                        <td class="">{{ $t('oversee_suppliers') }}</td>
                                        <td class="">{{ amountExcluVat3 }}</td>
                                        <td class=""></td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('purchase_exclusive_of_vat') }}</td>
                                        <td class="">{{ $t('taxable_person') }}</td>
                                        <td class="">{{ amountExcluVat4 }}</td>
                                        <td class=""></td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('purchase_exclusive_of_vat') }}</td>
                                        <td class="">{{ $t('non_taxable_person') }}</td>
                                        <td class="">{{ amountExcluVat5 }}</td>
                                        <td class=""></td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('non_creditable_purchase') }}</td>
                                        <td class=""></td>
                                        <td class="">{{ amountExcluVat5 }}</td>
                                        <td class=""></td>
                                    </tr>
                                    <tr>
                                        <td class="third white--text text-uppercase text-bold">{{ $t('total_amount_input_taxes') }}</td>
                                        <td class="third white--text"></td>
                                        <td class="third white--text"></td>
                                        <td class="third white--text">{{ totalVat }}</td>
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

const purchaseHandler = require("@/scripts/compliance/handler/purchaseHandler")
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

        monthOf: 'All Monthly',

        amountExcluVat1: 0,
        amountVat1: 0,
        amountExcluVat2: 0,
        amountVat2: 0,
        amountExcluVat3: 0,
        amountExcluVat4: 0,
        amountExcluVat5: 0,
        totalVat: 0,
        purchases: []
    }),
    // props: ['purchases'],
    watch: {
        'purchases': 'onCalculatePurchaseTax'
    },
    methods: {
        async onloadPurchase() {
            await purchaseHandler.getAll().then(async res => {
                this.purchases = res.data.data
                await this.onCalculatePurchaseTax()
            })
            // if (this.data.length === 0) {
            //
            // }
        },
        async onCalculatePurchaseTax() {
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let totalAmountVAT = 0
                    let amountInclusive1 = 0, amountInclusive2 = 0
                    let amountNet1 = 0, amountVAT1 = 0, amountNet2 = 0, amountVAT2 = 0, amountNet3 = 0
                    for (let i = 0; i < this.purchases.length; i++) {
                        if (this.purchases[i].supplier.nature.name.toLowerCase() === 'individual-local' || this.purchases[i].supplier.nature.name.toLowerCase() === 'taxable entity') {
                            if (this.purchases[i].totalAmountInclusive > 0) {
                                amountInclusive1 += this.purchases[i].totalAmountInclusive
                                amountVAT1 += this.purchases[i].totalVAT
                            } else if (this.purchases[i].totalAmountNetVat > 0) {
                                if (this.purchases[i].typeProduct.code === 4) {
                                    amountNet1 += this.purchases[i].totalAmountNetVat
                                } else {
                                    amountNet2 += this.purchases[i].totalAmountNetVat
                                }
                            }
                        } else if (this.purchases[i].supplier.nature.name.toLowerCase() === 'non-taxable entity') {
                            amountNet3 += this.purchases[i].totalAmountNetVat
                        } else if (this.purchases[i].supplier.nature.name.toLowerCase() === 'foreign entity' || this.purchases[i].supplier.nature.name.toLowerCase() === 'individual-foreign') {
                            if (this.purchases[i].totalAmountInclusive > 0) {
                                amountInclusive2 += this.purchases[i].totalAmountInclusive
                                amountVAT2 += this.purchases[i].totalVAT
                            }
                        }
                    }
                    totalAmountVAT = amountVAT1 + amountVAT2
                    this.totalVat = this.numberFormat(totalAmountVAT)
                    this.amountExcluVat1 = this.numberFormat(amountInclusive1)
                    this.amountVat1 = this.numberFormat(amountVAT1)
                    this.amountExcluVat2 = this.numberFormat(amountInclusive2)
                    this.amountVat2 = this.numberFormat(amountVAT2)
                    this.amountExcluVat3 = this.numberFormat(amountNet2)
                    this.amountExcluVat4 = this.numberFormat(amountNet3)
                    this.amountExcluVat5 = this.numberFormat(amountNet1)
                    this.showLoading = false
                }, 200)
            })
        },
        Change(){
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n2`)
        },
        onSearch(){
            this.showLoading = true
            this.monthOf = kendo.toString(new Date(this.end_date), 'MMMM yyyy')
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    purchaseHandler.getByMonth(this.end_date).then(res => {
                        window.console.log(res)
                        this.purchases = res.data.data
                        this.showLoading = false
                    })
                }, 200)
            })
        }
    },
    async mounted() {
        await this.onloadPurchase()
    },
    computed: {
        // data() {
        //     if (this.purchases.length > 0) {
        //         return this.purchases
        //     }else {
        //         return []
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
