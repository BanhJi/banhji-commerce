<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6 pt-4">
            <v-card color="white" class="no_border" elevation="0">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row class="">
                        <v-col sm="12" cols="12" class="pt-0">
                            <v-row>
                                <v-col sm="6" cols="12" class="py-0">
                                    <h2 class="mb-0 font_20">{{$t('state_change')}}</h2>
                                    <p class="mb-0">{{$t('for_the_month_of')}}: <span class="text-bold">March 2021</span></p>
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
                            <v-simple-table class="nomal_tbale">
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
                                        <td class="text-uppercase">{{$t('monthly_purchase_state_charge')}}</td>
                                        <td class=""></td>
                                        <td class=""></td>
                                        <td class=""></td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('local_purchase_include') }}</td>
                                        <td class="">{{ $t('taxable_person') }}</td>
                                        <td class="">{{ amountExcluVatP1 }}</td>
                                        <td class="">{{ amountVatP1 }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('import_10%')}}</td>
                                        <td class="">{{ $t('oversee_suppliers') }}</td>
                                        <td class="">{{ amountExcluVatP2 }}</td>
                                        <td class="">{{ amountVatP2 }}</td>
                                    </tr>
                                    <tr>
                                        <td class="third white--text text-bold">{{ $t('total_amount_input_taxes') }}</td>
                                        <td class="third white--text"></td>
                                        <td class="third white--text"></td>
                                        <td class="third white--text">{{ totalVatP }}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-uppercase">{{ $t('monthly_sale_state_charge') }}</td>
                                        <td class=""></td>
                                        <td class=""></td>
                                        <td class=""></td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('sales_include_vat')}}</td>
                                        <td class="">{{ $t('taxable_person') }}</td>
                                        <td class="">{{ amountExcluVatS1 }}</td>
                                        <td class="">{{ amountVatS1 }}</td>
                                    </tr>
                                     <tr>
                                        <td>{{ $t('sales_include_vat')}}</td>
                                        <td class="">{{ $t('non_taxable_person') }}</td>
                                        <td class="">{{ amountExcluVatS2 }}</td>
                                        <td class="">{{ amountVatS2 }}</td>
                                    </tr>
                                    <tr>
                                        <td class="third white--text text-bold">{{ $t('total_amount_output_taxes') }}</td>
                                        <td class="third white--text"></td>
                                        <td class="third white--text"></td>
                                        <td class="third white--text">{{ totalVatS }}</td>
                                    </tr>
                                      <tr>
                                        <td colspan="2" class="third white--text border_top text-bold">{{ $t('vat_state_charges') }}</td>
                                        <td class="third white--text border_top"></td>
                                        <td class="third white--text border_top">{{ totalSC }}</td>
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
    }),
    props: ['purchases', 'sales'],
    methods: {
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
                    for (let i = 0; i < this.purchase.length; i++) {
                        if (this.purchase[i].typeProduct.code === 5) {
                            if (this.purchase[i].supplier.nature.name.toLowerCase() === 'individual-local' || this.data[i].supplier.nature.name.toLowerCase() === 'taxable entity') {
                                amountPNet1 += this.purchase[i].totalAmountInclusive
                                amountPVat1 += this.purchase[i].totalVAT
                            } else if (this.purchase[i].supplier.nature.name.toLowerCase() === 'individual-foreign' || this.data[i].supplier.nature.name.toLowerCase() === 'foreign entity') {
                                amountPNet2 += this.purchase[i].totalAmountInclusive
                                amountPVat2 += this.purchase[i].totalVAT
                            }
                        }
                    }

                    for (let i = 0; i < this.sales.length; i++) {
                        if (this.sales[i].typeProduct.code === 5) {
                            if (this.sale[i].customer.nature.name.toLowerCase() === 'individual-local'  || this.sale[i].customer.nature.name.toLowerCase() === 'taxable entity') {
                                amountSNet1 += this.sale[i].totalAmountInclusive
                                amountSVat1 += this.sale[i].totalVAT
                            } else if (this.sale[i].customer.nature.name.toLowerCase() === 'non-taxable entity') {
                                amountSNet2 += this.sale[i].totalAmountInclusive
                                amountSVat2 += this.sale[i].totalVAT
                            }
                        }
                    }
                    totalPAmountVAT = amountPVat1 + amountPVat2
                    totalSAmountVAT = amountSVat1 + amountSVat2
                    this.totalSC = this.numberFormat(totalSAmountVAT - totalPAmountVAT)
                    // this.vats[8].amountVAT = (totalSAmountVAT - totalPAmountVAT).toLocaleString()
                    this.totalVatP = this.numberFormat(totalPAmountVAT)
                    this.totalVatS = this.numberFormat(totalSAmountVAT)
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
        Change(){
        },
 
        onSearch(){
            this.search = {
                'start_date': this.start_date + '-01',
                'end_date': this.end_date + '-01'
            }
        }
    },
    async mounted() {
        await this.onCalculateTax()
    },
    computed: {
        sale() {
            if (this.sales.length > 0) {
                return this.sales
            }else {
                return []
            }
        },
        purchase() {
            if (this.purchases.length > 0) {
                return this.purchases
            }else {
                return []
            }
        }
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
