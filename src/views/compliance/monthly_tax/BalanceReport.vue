<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="6" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{$t('monthly_tax_balance')}}</h2>
                            <p class="mb-0">{{$t('for_the_month_of')}}: <span class="text-bold">{{ monthOf }}</span></p>
                        </v-col>
                        <v-col sm="6" cols="12" class="py-0 d-flex justify-end hide_form_alert">
                            <div class="d-flex">
                                <month-picker :initialMonth="date" @emitMonth="date = $event"/>
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
                                    <th style="width: 3%;"></th>
                                    <th></th>
                                    <th colspan="2" class="text-bold text-uppercase text-center line_right">{{ monthOf }}</th>
<!--                                    <th class="text-bold text-uppercase text-center line_right">{{ oldMonthOf }}</th>-->
                                    <th class="text-bold text-uppercase"></th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td></td>
                                <td class="text-bold pl-2 text-uppercase line_right">{{ $t('type_of_tax') }}</td>
                                <td class="text-bold text-uppercase line_right">{{ $t('tax_credit') }}</td>
                                <td class="text-bold text-uppercase line_right">{{ $t('tax_amount') }}</td>
<!--                                <td class="text-bold text-uppercase line_right">{{ $t('tax_amount') }}</td>-->
<!--                                <td class="text-bold text-uppercase">%</td>-->
                            </tr>
                            <tr>
                                <td style="background: #F8F8F9;" class="pr-0">1</td>
                                <td style="background: #F8F8F9;" class="pl-2 line_right">{{$t('tax_on_salary')}}</td>
                                <td style="background: #F8F8F9;" class="line_right"></td>
                                <td class="line_right text-right">{{ numberFormat(summary.taxSalary) }}</td>
<!--                                <td class="line_right text-right">{{ numberFormat(oldSummary.taxSalary) }}</td>-->
<!--                                <td class=""></td>-->
                            </tr>
                            <tr>
                                <td style="background: #F8F8F9;" class="pr-0">2</td>
                                <td style="background: #F8F8F9;" class="pl-2 line_right">{{$t('tax_fringe_benefit')}}</td>
                                <td style="background: #F8F8F9;" class="line_right"></td>
                                <td class="line_right text-right">{{ numberFormat(summary.taxSalaryFB) }}</td>
<!--                                <td class="line_right text-right">{{ numberFormat(oldSummary.taxSalaryFB) }}</td>-->
<!--                                <td class=""></td>-->
                            </tr>
                            <tr>
                                <td style="background: #F8F8F9;" class="pr-0">3</td>
                                <td style="background: #F8F8F9;" class="pl-2 line_right">{{$t('withholding_tax')}}</td>
                                <td style="background: #F8F8F9;" class="line_right"></td>
                                <td class="line_right text-right">{{ numberFormat(summary.withholdingTax) }}</td>
<!--                                <td class="line_right text-right">{{ numberFormat(oldSummary.withholdingTax) }}</td>-->
<!--                                <td class=""></td>-->
                            </tr>
                            <tr>
                                <td style="background: #F8F8F9;" class="pr-0">4</td>
                                <td style="background: #F8F8F9;" class="pl-2 line_right">{{$t('value_tax_vat')}}</td>
                                <td class="line_right text-right">{{ numberFormat(vat.credit) }}</td>
                                <td class="line_right text-right">{{ numberFormat(vat.payment) }}</td>
<!--                                <td class="line_right text-right">{{ numberFormat(oldVat.payment) }}</td>-->
<!--                                <td class=""></td>-->
                            </tr>
                            <tr>
                                <td style="background: #F8F8F9;" class="pr-0">5</td>
                                <td style="background: #F8F8F9;" class="pl-2 line_right">{{$t('payment_tax_income')}}</td>
                                <td class="line_right text-right">{{ numberFormat(ppi.credit) }}</td>
                                <td class="line_right text-right">{{ numberFormat(ppi.balance) }}</td>
<!--                                <td class="line_right text-right">{{ numberFormat(oldPpi.balance) }}</td>-->
<!--                                <td class=""></td>-->
                            </tr>

                            <tr>
                                <td style="background: #F8F8F9;" class="pr-0">6</td>
                                <td style="background: #F8F8F9;" class="pl-2 line_right">{{$t('accommodation_tax')}}</td>
                                <td style="background: #F8F8F9;" class="line_right"></td>
                                <td class="line_right text-right">{{ numberFormat(summary.amountAccomTax) }}</td>
<!--                                <td class="line_right text-right">{{ numberFormat(oldSummary.amountAccomTax) }}</td>-->
<!--                                <td class=""></td>-->
                            </tr>
                            <tr>
                                <td style="background: #F8F8F9;" class="pr-0">7</td>
                                <td style="background: #F8F8F9;" class="pl-2 line_right">{{$t('public_for_lighting_tax')}}</td>
                                <td style="background: #F8F8F9;" class="line_right"></td>
                                <td class="line_right text-right">{{ numberFormat(summary.amountPl) }}</td>
<!--                                <td class="line_right text-right">{{ numberFormat(oldSummary.amountPl) }}</td>-->
<!--                                <td class=""></td>-->
                            </tr>
                            <tr>
                                <td style="background: #F8F8F9;" class="pr-0">8</td>
                                <td style="background: #F8F8F9;" class="pl-2 line_right">{{$t('specific_tax_merchandize_service')}}</td>
                                <td style="background: #F8F8F9;" class="line_right"></td>
                                <td class="line_right text-right">{{ numberFormat(summary.amountSp) }}</td>
<!--                                <td class="line_right text-right">{{ numberFormat(oldSummary.amountSp) }}</td>-->
<!--                                <td class=""></td>-->
                            </tr>
                           <tr>
                                <td style="background: #F8F8F9;" class="pr-0">9</td>
                                <td style="background: #F8F8F9;" class="pl-2 line_right">{{$t('other_taxes')}}</td>
                                <td style="background: #F8F8F9;" class="line_right"></td>
                                <td class="line_right text-right">{{ numberFormat(summary.otherTax) }}</td>
<!--                                <td class="line_right text-right">{{ numberFormat(oldSummary.otherTax) }}</td>-->
<!--                                <td class=""></td>-->
                            </tr>
                             <tr>
                                <td  colspan="2" class="pl-10 third line_right white--text text-uppercase text-bold">{{ $t('total') }}</td>
                                <td  class="third white--text line_right"></td>
                                <td  class="third white--text text-bold line_right text-right">{{ numberFormat(summary.total) }}</td>
<!--                                <td style="background: #385622;" class="white&#45;&#45;text text-bold line_right text-right">{{ numberFormat(oldSummary.total) }}</td>-->
<!--                                <td style="background: #385622;" class="white&#45;&#45;text"></td>-->
                            </tr>
                            <tr>
                                <td colspan="2" class="pl-10 line_right text-bold text-uppercase">{{ $t('status') }}</td>
                                <td colspan="2" class="text-uppercase text-bold text-center line_right">{{ summary.isPaid === 0 ? $t('unpaid') : $t('paid') }}</td>
<!--                                <td class="text-uppercase text-center text-bold line_right">{{ $t('paid') }}</td>-->
<!--                                <td class=""></td>-->
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
const summaryHandler = require("@/scripts/compliance/handler/summaryHandler")
export default {
    data: () => ({
        showLoading: false,
        date: new Date().toISOString().substr(0, 7),
        oldMonthOf: '',
        oldDate: '',
        monthOf: kendo.toString(new Date(), 'MMMM yyyy'),
        summary: {},
        oldSummary: {},
    }),
    props: {},
    methods: {
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n2`)
        },
        async onSearch(){
            this.showLoading = true
            // this.oldDate = new Date(new Date(this.date).setMonth(new Date(this.date).getMonth() - 1))
            this.monthOf = kendo.toString(new Date(this.date), 'MMMM yyyy')
            // this.oldMonthOf = kendo.toString(new Date(new Date(this.date).setMonth(new Date(this.date).getMonth() - 1)), 'MMMM yyyy')
            await this.onloadSummary(this.date)
            // await this.onloadOldSummary(this.oldDate)
        },
        async onloadSummary(date) {
            this.showLoading = true
            summaryHandler.getByMonthly(date).then(res => {
                this.summary = res.data.data[0]
                this.showLoading = false
            })
        },
        // async onloadOldSummary(date) {
        //     this.showLoading = true
        //     summaryHandler.getByMonthly(date).then(res => {
        //         this.oldSummary = res.data.data[0]
        //         this.showLoading = false
        //     })
        // }
    },
    async mounted() {
        // let oldMonthOf = new Date(new Date(this.date).setMonth(new Date(this.date).getMonth() - 1))
        // this.oldMonthOf = kendo.toString(oldMonthOf, 'MMMM yyyy')
        await this.onloadSummary(this.date)
        // await this.onloadOldSummary(new Date(oldMonthOf).toISOString().substr(0, 7))
    },
    computed: {
        ppi() {
            if (this.summary.ppi !== undefined) {
                return this.summary.ppi
            } else {
                return {}
            }
        },
        vat() {
            if (this.summary.vat !== undefined) {
                return this.summary.vat
            } else {
                return {}
            }
        },
        oldPpi() {
            if (this.oldSummary.ppi !== undefined) {
                return this.oldSummary.ppi
            } else {
                return {}
            }
        },
        oldVat() {
            if (this.oldSummary.vat !== undefined) {
                return this.oldSummary.vat
            } else {
                return {}
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

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.primary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: #92d050 !important;
    }

    .theme--light.v-data-table {
        background-color: transparent !important;
        border-top: thin solid #ddd;
        border-bottom: thin solid #ddd;
        border-radius: 0 !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
        font-size: 14px;
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
        height: 37px !important;
        color: #000;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
        border-bottom: thin solid #ddd;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }

    .v-application .primary,
    .v-application .third {
        border-color: #fff !important;
    }

    .amount {
        text-align: right !important;
    }
    .head-summary {
        text-align: right !important;
    }
</style>
