<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="no_border" elevation="0">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row class="">
                        <v-col sm="12" cols="12" class="pt-0">
                            <v-row>
                                <v-col sm="6" cols="12" class="py-0">
                                    <h2 class="mb-0 font_20">{{$t('withholding_tax_resident')}}</h2>
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
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-bold text-uppercase">{{$t('withholding_tax')}}</th>
                                            <th></th>
                                            <th class="text-bold text-uppercase">{{$t('wht_rate')}}</th>
                                            <th class="text-bold text-uppercase">{{$t('wht_amount')}}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{{$t('wht_resident_desc1')}}</td>
                                        <td></td>
                                        <td class="">15%</td>
                                        <td class="text-center">{{ wh1 }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('wht_resident_desc2')}}</td>
                                        <td></td>
                                        <td class="">15%</td>
                                        <td class="text-center">{{ wh2 }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('wht_resident_desc3')}}</td>
                                        <td></td>
                                        <td class="">6%</td>
                                        <td class="text-center">{{ wh3 }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('wht_resident_desc4')}}</td>
                                        <td></td>
                                        <td class="">4%</td>
                                        <td class="text-center">{{ wh4 }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('wht_resident_desc5')}}</td>
                                        <td>{{$t('legal_person')}}</td>
                                        <td class="">10%</td>
                                        <td class="text-center">{{ wh5 }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('wht_resident_desc6')}}</td>
                                        <td>{{$t('physical_person')}}</td>
                                        <td class="">10%</td>
                                        <td class="text-center">{{ wh6 }}</td>
                                    </tr>
                                    <tr>
                                        <td class="third white--text text-right text-uppercase text-bold"></td>
                                        <td class="third white--text text-uppercase text-bold">{{ $t('total') }}</td>
                                        <td class="third white--text text-center text-uppercase text-bold"></td>
                                        <td class="third white--text text-center text-uppercase text-bold">{{ totalWh }}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                            <v-btn color="primary" class="mt-3 float-right capitalize" outlined>
                                <span class="black--text ">{{$t('view_detail_record')}}</span>
                            </v-btn>
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
const withholdingHandler = require("@/scripts/compliance/handler/withholdingTaxHandler")
const apiUrl = require('@/apiUrl')
const taxSetting = require('@/store/taxSetting');
const taxSettingHandler = require('@/scripts/taxSettingHandler')
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
        wh1: 0,
        wh2: 0,
        wh3: 0,
        wh4: 0,
        wh5: 0,
        wh6: 0,
        totalWh: 0,

    }),
    props: ['withholding'],
    methods: {
        async loadListTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    taxSettingHandler.get(apiUrl.tax_setting.tax_list_get, "listTax", "setListTax")
                }, 500)
            })
        },
        async loadCalculateTax() {
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let amount1 = 0, amount2 = 0, amount3 = 0,
                        amount4 = 0, amount5 = 0, amount6 = 0,
                        totalAmount1 = 0
                    window.console.log(this.withholdings)
                    for (let i = 0; i < this.withholdings.length; i++) {
                        let typeProduct = this.withholdings[i].typeProduct
                        if (typeProduct.code === 1) {
                            amount1 += this.withholdings[i].totalVAT
                        } else if (typeProduct.code === 2) {
                            amount2 += this.withholdings[i].totalVAT
                        } else if (typeProduct.code === 3) {
                            amount3 += this.withholdings[i].totalVAT
                        } else if (typeProduct.code === 4) {
                            amount4 += this.withholdings[i].totalVAT
                        } else if (typeProduct.code === 5) {
                            amount5 += this.withholdings[i].totalVAT
                        } else if (typeProduct.code === 6) {
                            amount6 += this.withholdings[i].totalVAT
                        }
                    }
                    totalAmount1 = (amount1 + amount2 + amount3 + amount4 + amount5 + amount6)
                    this.totalWh = this.numberFormat(totalAmount1)
                    this.wh1 = this.numberFormat(amount1)
                    this.wh2 = this.numberFormat(amount2)
                    this.wh3 = this.numberFormat(amount3)
                    this.wh4 = this.numberFormat(amount4)
                    this.wh5 = this.numberFormat(amount5)
                    this.wh6 = this.numberFormat(amount6)
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
                    withholdingHandler.getByMonth(this.end_date).then(res => {
                        window.console.log(res)
                        this.showLoading = false
                    })
                }, 200)
            })
            this.search = {
                'start_date': this.start_date + '-01',
                'end_date': this.end_date + '-01'
            }
        }
    },
    async mounted() {
        await this.loadCalculateTax()
    },
    computed: {
        listTaxs: {
            set(listTax) {
                taxSetting.default.commit("setListTax", listTax)
            },
            get() {
                let data = taxSetting.default.state.listTax
                data = data.filter(o => o.taxType.typeId === 2)
                return data
            }
        },
        withholdings() {
            if (this.withholding.length > 0) {
                return this.withholding
            }else {
                return []
            }
        },
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
