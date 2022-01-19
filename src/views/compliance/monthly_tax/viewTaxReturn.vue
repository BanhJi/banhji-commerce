<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t('monthly_tax_return') }} #MR-{{ monthlyReturn.number }}</h2>
                                <v-icon
                                    @click="onClose"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close
                                </v-icon>

                            </v-card>
                            <v-card outlined dense class="px-3 no_border" color="grayBg">
                                <v-row>
                                    <v-col sm="12" cols="12">
                                        <v-row class="info_add mr-2 ml-2 py-3">
                                            <v-col sm="12" cols="12">
                                                <v-simple-table>
                                                    <template v-slot:default>
                                                        <tbody>
                                                        <tr>
                                                            <td class="text-uppercase grayBg">{{ $t('for_the_month_of') }}</td>
                                                            <td class="text-left text-bold">{{ monthlyReturn.monthOf }}</td>
                                                            <td class="text-uppercase grayBg">{{ $t('last_edit') }}</td>
                                                            <td class="text-left text-bold">{{ monthlyReturn.editDate }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-uppercase grayBg">{{ $t('submission_id') }}</td>
                                                            <td class="text-left text-bold">{{ monthlyReturn.number }}</td>
                                                            <td class="text-uppercase grayBg">{{ $t('last_edit_by') }}</td>
                                                            <td class="text-left text-bold">{{ monthlyReturn.editBy }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-uppercase grayBg">{{ $t('amount') }}</td>
                                                            <td class="text-left text-bold">{{ monthlyReturn.amountPaid }}</td>
                                                            <td class="text-uppercase grayBg">{{ $t('progress') }}</td>
                                                            <td class="text-left text-bold">{{ monthlyReturn.progress }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-uppercase grayBg">{{ $t('exchange_rate') }}</td>
                                                            <td class="text-left text-bold">{{ monthlyReturn.exChangeRate }}</td>
                                                            <td class="text-uppercase grayBg">{{ $t('status') }}</td>
                                                            <td class="text-left text-bold">{{ monthlyReturn.status.name }}</td>
                                                        </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </v-col>
                                        </v-row>

                                    </v-col>
<!--                                    <v-col sm="4" cols="12" class="pb-0">-->
<!--                                        <label class="label  mb-0">{{ $t('for_the_month_of') }}</label>-->
<!--                                        <h3 class="text-bold  py-1">{{ monthlyReturn.monthOf }}</h3>-->

<!--                                        <label class="label mb-0">{{ $t('submission_id') }}</label>-->
<!--                                        <h3 class="text-bold py-1">{{ monthlyReturn.number }}</h3>-->

<!--                                        <label class="label mb-0">{{ $t('exchange_rate') }}</label>-->
<!--                                        <h3 class="text-bold py-1">{{ monthlyReturn.exChangeRate }}</h3>-->
<!--                                    </v-col>-->
<!--                                    <v-col sm="8" cols="12" class="pr-1">-->
<!--                                        <p class="mb-0 ml-n3 color_grey">{{ $t('additional_information') }}</p>-->
<!--                                        <v-row class="info_add mr-2 py-3">-->
<!--                                            <v-col sm="4" cols="12" class="py-1">-->
<!--                                                <label class="label mb-0">{{ $t('amount_to_be_paid') }}</label>-->
<!--                                                <h3 class="text-bold py-1">{{ numberFormat(monthlyReturn.amountPaid) }}</h3>-->
<!--                                                <label class="label mb-0">{{ $t('last_edit') }}</label>-->
<!--                                                <h3 class="text-bold py-1">{{ monthlyReturn.editDate }}</h3>-->
<!--                                            </v-col>-->
<!--                                            <v-col sm="4" cols="12" class="py-1">-->
<!--                                                <label class="label mb-0">{{ $t('progress') }}</label>-->
<!--                                                <h3 class="text-bold py-1">{{ monthlyReturn.progress }}</h3>-->
<!--                                                <label class="label mb-0">{{ $t('status') }}</label>-->
<!--                                                <h3 class="text-bold py-1">{{ monthlyReturn.status.name }}</h3>-->
<!--                                            </v-col>-->
<!--                                        </v-row>-->
<!--                                    </v-col>-->
                                </v-row>
                            </v-card>
                            <v-row class="pt-3 px-3" style="background-color: #fff;">
                                <v-col sm="12" cols="12" class="pt-0">
                                    <LoadingMe
                                        :isLoading="showLoading"
                                        :fullPage="false"
                                        :myLoading="true"/>
                                </v-col>
                                <v-row class="">
                                    <v-col sm="12" cols="12" class="pt-4 px-4">
                                        <!-- <v-row class="">
                                            <v-col sm="12" cols="12" class="pt-0">
                                                <v-row>
                                                    <v-col sm="6" cols="12" class="py-0">
                                                        <h2 class="mb-0 font_20">{{$t('monthly_tax_balance')}}</h2>
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
                                        </v-row> -->
                                        <v-row class="">
                                            <v-col sm="12" cols="12" class="py-0">
                                                <v-simple-table>
                                                    <template v-slot:default>
                                                        <thead>
                                                        <tr>
                                                            <th class="text-bold text-uppercase">{{ $t('type_of_tax_to_be_declared') }}</th>
                                                            <th class="text-bold text-uppercase">{{ $t('credit_carried_forward_refund') }}</th>
                                                            <th class="text-bold text-uppercase ">{{$t('tax_amount_to_be_paid')}}</th>
                                                            <th class="text-bold text-uppercase">%</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td>1 {{$t('tax_on_salary')}}</td>
                                                            <td class="grayBg"></td>
                                                            <td class="text-right"></td>
                                                            <td class=""></td>
                                                        </tr>
                                                        <tr>
                                                            <td>2 {{$t('tax_fringe_benefit')}}</td>
                                                            <td class="grayBg"></td>
                                                            <td class="text-right"></td>
                                                            <td class=""></td>
                                                        </tr>
                                                        <tr>
                                                            <td>3 {{$t('withholding_tax')}}</td>
                                                            <td class="grayBg"></td>
                                                            <td class="text-right">{{ numberFormat(summary.withholdingTax) }}</td>
                                                            <td class=""></td>
                                                        </tr>
                                                        <tr>
                                                            <td>4 {{$t('value_tax_vat')}}</td>
                                                            <td class="text-center">{{ numberFormat(balanceVATs.credit) }}</td>
                                                            <td class="text-right">{{ numberFormat(balanceVATs.payment) }}</td>
                                                            <td class=""></td>
                                                        </tr>
                                                        <tr>
                                                            <td>5 {{$t('payment_tax_income')}}</td>
                                                            <td class="grayBg text-center">{{ numberFormat(amountPPIs.credit) }}</td>
                                                            <td class="text-right">{{ numberFormat(amountPPIs.balance) }}</td>
                                                            <td class=""></td>
                                                        </tr>

                                                        <tr>
                                                            <td>6 {{$t('specific_tax_merchandize_service')}}</td>
                                                            <td class="grayBg"></td>
                                                            <td class="text-right">{{ numberFormat(summary.amountSp) }}</td>
                                                            <td class=""></td>
                                                        </tr>
                                                        <tr>
                                                            <td>7 {{$t('accommodation_tax')}}</td>
                                                            <td class="grayBg"></td>
                                                            <td class="text-right">{{ numberFormat(summary.amountAccomTax) }}</td>
                                                            <td class=""></td>
                                                        </tr>
                                                        <tr>
                                                            <td>8 {{$t('public_for_lighting_tax')}}</td>
                                                            <td class="grayBg"></td>
                                                            <td class="text-right">{{ numberFormat(summary.amountPl) }}</td>
                                                            <td class=""></td>
                                                        </tr>
                                                        <tr>
                                                            <td>9 {{$t('other_taxes')}}</td>
                                                            <td class="grayBg"></td>
                                                            <td class="text-right">{{ numberFormat(summary.otherTax) }}</td>
                                                            <td class=""></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="primary white--text text-uppercase text-bold">{{ $t('total') }}</td>
                                                            <td class="primary white--text"></td>
                                                            <td class="primary white--text text-right text-bold">{{ numberFormat(summary.total) }}</td>
                                                            <td class="primary white--text"></td>
                                                        </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-row>
                            <div class="function_footer px-4">
                                <!-- Warning Message -->
                                <v-btn @click="onClose" class="float-left  btn_cancel">{{ $t('cancel') }}</v-btn>

                                <v-btn v-if="monthlyReturn.status.id == 2" @click="saveDraft" class="float-right mx-3 capitalize white--text"
                                       color="primary">{{ $t('make_payment') }}
                                </v-btn>
                                <v-btn v-if="monthlyReturn.status.id == 1" @click="saveDraft" class="float-right mx-3 capitalize white--text"
                                       color="primary">{{ $t('submit') }}
                                </v-btn>
                                <v-btn v-if="monthlyReturn.status.id == 1" @click="editReturn(monthlyReturn)"
                                       class="float-right mx-3 capitalize white--text" color="primary">
                                    {{ $t('edit_monthly_tax_return') }}
                                </v-btn>
                            </div>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import LoadingMe from '@/components/Loading'
import MonthlyReturn from "@/scripts/compliance/model/MonthlyReturn";
import kendo from "@progress/kendo-ui";
const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler")
const monthlyReturn = new MonthlyReturn({})
const summaryHandler = require("@/scripts/compliance/handler/summaryHandler")
export default {
    name: "ViewTaxReturn",
    components: {
        'LoadingMe': LoadingMe,
    },
    data: () => ({
        showLoading: false,
        valid: true,
        monthlyReturn: monthlyReturn,
        summary: {},
    }),
    computed: {
        id() {
            if (this.$route.params.id !== undefined) {
                return this.$route.params.id
            } else {
                return ''
            }
        },
        balanceVATs() {
            if (this.summary.vat !== undefined) {
                return this.summary.vat
            } else {
                return {}
            }
        },
        amountPPIs() {
            if (this.summary.ppi !== undefined) {
                return this.summary.ppi
            } else {
                return {}
            }
        },
        DateState() {
            return !!(this.$route.params.id !== undefined || this.$route.query.type === 'edit' || this.$route.query.type === 'view');
        },
    },
    watch: {
        'id': 'initData'
    },
    methods: {
        editReturn(data) {
            this.$router.push({
                name: "New Tax Return",
                path: "new_tax_return",
                params: {id: data.id, monthlyReturn: data},
                query: {type: "edit"},
            });
        },
        initData() {
            if (this.$route.params.id !== undefined && this.$route.params.monthlyReturn === undefined) {
                this.onloadMonthlyReturn()
            } else if (this.$route.params.monthlyReturn !== undefined) {
                this.monthlyReturn = this.$route.params.monthlyReturn
                this.onloadSummary(this.monthlyReturn.monthOf)
            } else {
                this.monthlyReturn = monthlyReturn
            }
        },
        async onloadSummary(date) {
            this.showLoading = true
            summaryHandler.getByMonthly(date).then(res => {
                this.summary = res.data.data[0]
                window.console.log(this.summary)
                this.showLoading = false
            })
        },
        onloadMonthlyReturn() {
            monthlyReturnHandler.getOne(this.$route.params.id).then(res => {
                this.monthlyReturn = res.data.data[0]
                this.onloadSummary(this.monthlyReturn.monthOf)
                window.console.log(this.monthlyReturn, 'monthlyReturn')
            })
        },
        saveDraft() {},
        onClose() {
            this.monthlyReturn = monthlyReturn
            this.summary = {}
            window.history.go(-1)
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            if (value >= 0) {
                return kendo.toString(value, 'n2')
            } else {
                return value
            }

        },
    },
    async mounted() {
        await this.initData()
    },
}

</script>

<style scoped>
.info_add {
    background-color: #ffffff;
}
.color_grey {
    color: #808080;
}
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
.function_content {
    padding: 0 12px 12px;
    border-bottom: 0;
    background-color: #fff !important;
}

.m_auto {
    margin: auto;
}

@media (min-width: 1264px) {
    .container {
        /* max-width: 1185px; */
        max-width: 1080px !important;
    }
}

.grayBg {
    background-color: #F8F8F9;
}

@media (max-width: 576px) {
    .mb-6 {
        margin-bottom: 0 !important;
    }
}

.border_grey {
    border: 1px solid #d6d7d8;
}

.attachment_table {
    width: 100%;
}

.my_checkbox input[type=checkbox] + label {
    display: grid;
    grid-template-columns: 20% 80%;
    margin: 0.2em 0px;
    cursor: pointer;
    line-height: 16px;
    padding: 0.2em;
}
</style>
