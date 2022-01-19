<template>
    <v-row>
        <v-col sm="12" cols="12" class="">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col class="py-0" sm="12" cols="12">
                        <v-card outlined dense color="white" class="no_border mb-4" >
                            <v-row>
                                <v-col sm="9" cols="12" class="py-0">
                                    <h2 class="mb-1 font_20">{{ $t('customer_balance_payments') }}</h2>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0">
                                    <LoadingMe
                                        :isLoading="showLoading"
                                        :fullPage="false"
                                        :myLoading="true"/>
                                    <chart ref="chart"
                                           :legend-position="'bottom'"
                                           :legend-visible="false"
                                           :tooltip="tooltip"
                                           :series="seriesLine"
                                           :category-axis-categories="bars"
                                           :theme="'sass'"
                                    />
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="py-0 pr-md-2" sm="4" cols="12">
                        <v-card outlined dense color="secondary" class="niradei_bold pa-3 white--text mb-4 no_border d-flex justify-space-between align-center" min-height="78">
                            <h4 class="pa-0 text-uppercase col-md-5 col-xs-12 font_13 flex-1">
                                {{$t('due_this_week')}}</h4>
                            <h6 class="pa-0 text-right font_20 col-md-7 col-xs-12">10</h6>
                        </v-card>
                        <v-card outlined dense color="third" class="niradei_bold pa-3 white--text mb-4 no_border d-flex justify-space-between align-center" min-height="78">
                            <h4 class="pa-0 text-uppercase col-md-6 col-xs-12 font_13 flex-1">
                                {{$t('customers_over_credit_limit')}}</h4>
                            <h6 class="pa-0 text-right font_20 col-md-6 col-xs-12">1</h6>
                        </v-card>
                        <v-card outlined dense color="third" class="niradei_bold pa-3 white--text no_border d-flex justify-space-between align-center" min-height="78">
                            <h4 class="pa-0 text-uppercase col-md-6 col-xs-12 font_13 flex-1">
                                {{$t('average_collection_days')}}</h4>
                            <h6 class="pa-0 text-right font_20 col-md-6 col-xs-12 flex-1">500</h6>
                        </v-card>
                    </v-col>
                    <v-col class="py-md-0 px-md-2" sm="4" cols="12">
                        <v-card
                            outlined
                            dense
                            class="pa-4 no_border"
                            min-height="268"
                            color="grayBg"
                        >
                            <h3 class="font_20">{{ $t("expected_due") }}</h3>
                            <p class="mb-0">
                                {{ $t('as_of_today') }}
                            </p>
                            <h2 class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">10,500</h2>
                            <template>
                                <v-simple-table class="mb-3">
                                    <template>
                                        <tbody>
                                        <tr>
                                            <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{ $t("1weeks") }}
                                            </span>
                                            </td>
                                            <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                500
                                            </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text">
                                                1 – 2 {{ $t("weeks") }}
                                            </span>
                                            </td>
                                            <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                8,000
                                            </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text">
                                                > 2 {{ $t("weeks") }}
                                            </span>
                                            </td>
                                            <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                2,000
                                            </span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </template>
                            <v-row>
                                <v-col sm="6" class="pr-0 py-0">
                                    <v-btn to="receipt" class="font_16 text-capitalize rounded-0 white--text"  color="primary">
                                        + {{$t('receipt')}}
                                    </v-btn>
                                </v-col>
                                <v-col sm="6" class="pl-0 pb-0 text-right">
                                    <router-link to="" class="mb-0 niradei_bold font_16 primary--text text-right">{{$t('view_report')}}</router-link>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col class="py-0 pl-md-2" sm="4" cols="12">
                        <v-card
                            outlined
                            dense
                            class="pa-4 no_border"
                            min-height="268"
                            color="grayBg"
                        >
                            <h3 class="font_20">{{ $t("payment_terms") }}</h3>
                            <p class="mb-7">
                                {{ $t('from_the_beginning_year') }}
                            </p>
                            <template>
                                <v-simple-table>
                                    <template>
                                        <tbody>
                                        <tr>
                                            <td class="text-left" style="width: 50%;">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{$t('sale_payment_term')}}
                                            </span>
                                            </td>
                                            <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                N30
                                            </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left" style="width: 50%;">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{$t('%_of_customers_not_compliant')}}
                                            </span>
                                            </td>
                                            <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                %
                                            </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left" style="width: 50%;">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{$t('%_of_suppliers_not_compliant')}}
                                            </span>
                                            </td>
                                            <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                %
                                            </span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </template>
                        </v-card>
                    </v-col>

                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import {i18n} from '@/i18n'
import {Chart} from "@progress/kendo-charts-vue-wrapper";
import kendo from "@progress/kendo-ui";

const billingHandler = require("@/scripts/invoice/handler/billingHandler")

export default {
    name: 'Overview',
    data: () => ({
        showLoading: false,
        expectedDue: [],
        tooltip: {
            visible: true,
            template: "'#= series.name #: #= value #'"
        },
        seriesLine: [],
        bars: [],
        valueAxis_line: [{
            max: 3313.097,
            // visible: false,
            labels: {
                format: "{0}"
            }
        }],
        asOf: new Date().toISOString().substr(0, 10),
        expectedBalance: 0,
        decimalFormat: 'n2',
        lastUpdated: '',
        series: [],
        mostPaymentTermUsed: 0
    }),
    components: {
        'chart': Chart,
        LoadingMe: () => import(`@/components/Loading`),
    },
    methods: {
        async loadExpectedDue() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    let strFilter = ''
                    strFilter = '?asOf=' + this.asOf + '&type=expected_due'
                    this.showLoading = true
                    billingHandler.wcpReceivableOverviewList(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            const response = res.data.data[0]
                            this.expectedDue = response.lines
                            this.decimalFormat = response.decimalFormat
                            this.lastUpdated = response.lastUpdatedAt
                            const paymentTerm = response.paymentTermUsed
                            this.mostPaymentTermUsed = paymentTerm.name
                            this.expectedBalance = this.numberFormat(response.openBalance, response.decimalFormat)
                            this.showLoading = false
                        }
                    })
                }, 300)
            })
        },
        async loadRBC() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    let strFilter = ''
                    strFilter = '?asOf=' + this.asOf + '&type=rbc'
                    this.showLoading = true
                    billingHandler.wcpReceivableOverviewList(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            const response = res.data.data[0]
                            const bar = response.bar
                            this.decimalFormat = response.decimalFormat
                            bar.forEach(m => {
                                this.bars.push(i18n.t(m))
                            })
                            this.seriesLine = response.lines
                            this.lastUpdated = response.lastUpdatedAt
                            this.showLoading = false
                        }
                    })
                }, 300)
            })
        },
        numberFormat(value, format) {
            return kendo.toString(value, format)
        },
    },
    computed: {
        fields() {
            return [
                '30 ' + i18n.t('days_summary'),
                '60 ' + i18n.t('days_summary'),
            ]
        },
    },
    mounted: async function () {
        // await this.loadExpectedDue()
        // await this.loadRBC()
    }
};
</script>
<style scoped>
.k-chart {
    height: 180px;
}

.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
</style>