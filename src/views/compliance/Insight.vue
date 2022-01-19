<template>
    <v-row>
        <v-col class="pb-0 pt-4" sm="12" cols="12">
            <v-row>
                <v-col class="py-0 pr-md-2" sm="4" cols="12">
                    <div class="d-flex">
                    <v-card
                        outlined
                        dense
                        color="primary"
                        class="pa-2 mb-4 flex-1 no_border niradei_bold"
                        min-height="62px"
                    >
                        <v-row>
                            <h6 class="col-sm-12 col-md-5 font_34 white--text">{{
                                    numberFormat(totalDraftTaxFilling)
                                }}</h6>
                            <h4 class="text-right flex_right white--text py-0 col-sm-12 col-md-7 font_16 text-uppercase">
                                <span  class="float-right">{{ $t("draft_tax_filling") }}</span>
                            </h4>
                        </v-row>
                    </v-card>
                            <v-btn style="height:62px !important;" color="primary" class="ml-1">
              <v-icon @click="loadFunction()" size="30" color="white"
                >mdi-reload</v-icon
              >
            </v-btn>
          </div>
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border"
                        min-height="250"
                        color="grayBg"
                    >
                        <h3 class="font_20" :class="{'line_34':this.$i18n.locale=='kh'} ">{{ $t("tax_filling") }}</h3>
                        <p class="mb-0">
                            {{ $t('from_the_beginning_year') }}
                        </p>
                        <h2 class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">
                            {{ numberFormat(totalTaxFilling) }}</h2>
                        <template>
                            <v-simple-table class="mb-3">
                                <template>
                                    <tbody>
                                    <tr>
                                        <td class="text-left pl-0">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{ $t('last_filling') }}
                                            </span>
                                        </td>
                                        <td class="text-right pr-0">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{ lastFilling !== '' ? lastFilling : 'No Record' }}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left pl-0">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{ $t('net_filling') }}
                                            </span>
                                        </td>
                                        <td class="text-right pr-0">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{ netFilling !== '' ? netFilling : 'No Record' }}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left pl-0">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{ $t('draft_filling') }}
                                            </span>
                                        </td>
                                        <td class="text-right pr-0">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{ numberFormat(totalDraftTaxFillingFY) }}
                                            </span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                        <v-row>
                            <v-col class="pl-0 py-0 text-right align-self-end">
                                <router-link to="" class="mb-0 niradei_bold font_16 primary--text text-right">
                                    {{ $t('view_report') }}
                                </router-link>
                            </v-col>
                        </v-row>
                        <LoadingMe
                            :isLoading="showLoading1"
                            :fullPage="false"
                            type="loading"
                            :myLoading="true"
                        />
                    </v-card>
                    <v-card
                        outlined
                        dense
                        color="grayBg"
                        class="pa-4 mt-4 no_border"
                        min-height="250px"
                    >
                        <h3 class="font_20" :class="{'line_34':this.$i18n.locale=='kh'} ">{{ $t("salary_fbt") }}</h3>
                        <p class="mb-0">
                            {{ $t('from_the_beginning_year') }}
                        </p>
                        <h2 class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">
                            {{ numberFormat(totalSalaryFBT) }}</h2>
                        <template>
                            <v-simple-table class="mb-3">
                                <template>
                                    <tbody>
                                    <tr>
                                        <td class="text-left pl-0">
                                            <span class="niradei_medium font_14 grey--text text-capitalize">
                                                {{ $t('salary_tax') }}
                                            </span>
                                        </td>
                                        <td class="text-right pr-0">
                                            <span class="niradei_heavy font_18 dark_grey">
                                               {{ numberFormat(salary) }} %
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left pl-0">
                                            <span class="niradei_medium font_14 grey--text text-capitalize">
                                                {{ $t('fringe_benefit_tax') }}
                                            </span>
                                        </td>
                                        <td class="text-right pr-0">
                                            <span class="niradei_heavy font_18 dark_grey">
                                               {{ numberFormat(fbt) }} %
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left pl-0">
                                            <span class="niradei_medium font_14 grey--text text-capitalize">
                                                {{ $t('no_of_employee') }}
                                            </span>
                                        </td>
                                        <td class="text-right pr-0">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{ numberFormat(numEmployee) }}
                                            </span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                        <v-row>
                            <v-col class="pl-0 py-0 text-right align-self-end">
                                <router-link to="" class="mb-0 niradei_bold font_16 primary--text text-right">
                                    {{ $t('view_report') }}
                                </router-link>
                            </v-col>
                        </v-row>
                        <LoadingMe
                            :isLoading="showLoading4"
                            type="loading"
                            :fullPage="false"
                            :myLoading="true"
                        />
                    </v-card>
                </v-col>
                <v-col class="py-md-0 px-md-2" sm="4" cols="12">
                    <v-card
                        outlined
                        dense
                        color="third"
                        class="pa-2 mb-4 no_border niradei_bold "
                        min-height="62px"
                    >
                        <v-row>
                            <h6 class="white--text col-sm-12 col-md-5 font_34">{{ dayNextFilling }}</h6>
                            <h4 class="text-right flex_right white--text col-md-7 col-sm-12 py-0 font_16 text-uppercase">
                                {{ $t("day_until_next_filling") }}
                            </h4>
                        </v-row>
                    </v-card>
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border"
                        min-height="250"
                        color="grayBg"
                    >
                        <h3 class="font_20" :class="{'line_34':this.$i18n.locale=='kh'} ">{{ $t("tax_payment") }}</h3>
                        <p class="mb-0">
                            {{ $t('from_the_beginning_year') }}
                        </p>
                        <h2 class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">
                            {{ numberFormat(totalTaxPayment) }}</h2>
                        <template>
                            <v-simple-table class="mb-3">
                                <template>
                                    <tbody>
                                    <tr>
                                        <td class="text-left pl-0">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{ $t('vat') }}
                                            </span>
                                        </td>
                                        <td class="text-right pr-0">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{ numberFormat(vatTP) }} %
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left pl-0">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{ $t('wht') }}
                                            </span>
                                        </td>
                                        <td class="text-right pr-0">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{ numberFormat(whtTP) }} %
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left pl-0">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{ $t('salary_fbt') }}
                                            </span>
                                        </td>
                                        <td class="text-right pr-0">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{ numberFormat(salaryFBT) }} %
                                            </span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                        <v-row>
                            <v-col class="pl-0 py-0 text-right align-self-end">
                                <router-link to="" class="mb-0 niradei_bold font_16 primary--text text-right">
                                    {{ $t('view_report') }}
                                </router-link>
                            </v-col>
                        </v-row>
                        <LoadingMe
                            :isLoading="showLoading2"
                            :fullPage="false"
                            type="loading"
                            :myLoading="true"
                        />
                    </v-card>
                    <v-card
                        outlined
                        dense
                        class="pa-4 mt-4 no_border"
                        min-height="250px"
                        color="grayBg"
                    >
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0">
                                <h3 class="font_20" :class="{'line_34':this.$i18n.locale=='kh'} ">{{ $t('tax_credit') }}</h3>
                                <p class="mb-0">
                                    {{ $t('as_of_today') }}
                                </p>
                            </v-col>
                        </v-row>
                        <h2 class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">
                            {{ numberFormat(totalTaxCredit) }}</h2>
                        <template>
                            <v-simple-table class="mb-3">
                                <template>
                                    <tbody>
                                    <tr>
                                        <td class="text-left pl-0" style="width: 42%">
                                            <span class="niradei_medium font_14 grey--text text-capitalize">
                                                {{ $t('value_added_tax') }}
                                            </span>
                                        </td>
                                        <td class="text-right pr-0">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{ numberFormat(vatCD) }} %
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left pl-0">
                                            <span class="niradei_medium font_14 grey--text text-capitalize">
                                                {{ $t('prepayment_of_tax_on_income') }}
                                            </span>
                                        </td>
                                        <td class="text-right pr-0">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{ numberFormat(ppiCD) }} %
                                            </span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                        <v-row>
                            <v-col class="pl-0 py-0 text-right align-self-end">
                                <router-link to="" class="mb-0 niradei_bold font_16 primary--text text-right">
                                    {{ $t('view_report') }}
                                </router-link>
                            </v-col>
                        </v-row>
                        <LoadingMe
                            :isLoading="showLoading5"
                            :fullPage="false"
                            type="loading"
                            :myLoading="true"
                        />
                    </v-card>
                </v-col>
                <v-col class="py-0 pl-md-2" sm="4" cols="12">
                    <v-card
                        outlined
                        dense
                        color="grayBg"
                        class="pa-4 no_border"
                        min-height="328px"
                    >
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0">
                                <h3 class="font_20" :class="{'line_34':this.$i18n.locale=='kh'} ">{{ $t("vat_input_vs_output") }}</h3>
                                <p class="mb-5">{{ $t("from_the_beginning_year") }}</p>
                            </v-col>
                        </v-row>
                        <chart
                            id="chartVat"
                            ref="chart"
                            :legend-position="'bottom'"
                            :legend-visible="false"
                            :tooltip="tooltip"
                            :series="series_line"
                            :chartArea="chartArea"
                            :category-axis-categories="categories_line"
                            :value-axis="valueAxis_line"
                            :theme="'sass'"
                        />
                        <LoadingMe
                            :isLoading="showLoading3"
                            :fullPage="false"
                            type="loading"
                            :myLoading="true"
                        />
                    </v-card>
                    <v-card
                        outlined
                        dense
                        class="pa-4 mt-4 no_border"
                        min-height="250px"
                        color="grayBg"
                    >
                        <h3 class="font_20 niradei_bold" :class="{'line_34':this.$i18n.locale=='kh'} " >{{ $t("withholding_tax") }}</h3>
                        <p class="mb-0">
                            {{ $t('from_the_beginning_year') }}
                        </p>
                        <v-row>
                            <v-col sm="6" cols="12" class="pr-1 py-0">
                                <template>
                                    <v-simple-table class="mt-2">
                                        <template>
                                            <tbody>
                                            <tr>
                                                <td class="text-right text-capitalize pr-0">
                                                    <span class="niradei_bold font_14 grey--text">
                                                        {{ $t('average_wht_rate') }}
                                                    </span>
                                                    <br/>
                                                    <span class="niradei_bold font_18 dark_grey">
                                                        {{ numberFormat(whtRate) }} %
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right text-capitalize pr-0">
                                                    <span class="niradei_bold font_14 grey--text">
                                                        {{ $t('wht_amount') }}
                                                    </span>
                                                    <br/>
                                                    <span class="niradei_bold font_18 dark_grey">
                                                        {{ numberFormat(totalWht) }}
                                                    </span>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </template>
                            </v-col>
                            <v-col sm="6" cols="12" class="pl-0 py-0">
                                <chart
                                    id="chartWht"
                                    ref="chart"
                                    :legend-visible="false"
                                    :series-defaults-labels-visible="false"
                                    :series="series_chart"
                                    :tooltip-template="tooltipTemplate"
                                    :chartArea="chartAreaChart"
                                    :tooltip-visible="true"
                                    :height="100"
                                    :theme="'sass'"
                                />
                            </v-col>
                        </v-row>
                        <LoadingMe
                            :isLoading="showLoading6"
                            :fullPage="false"
                            type="loading"
                            :myLoading="true"
                        />
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import {i18n} from "@/i18n";
import {Chart} from "@progress/kendo-charts-vue-wrapper";
import kendo from "@progress/kendo-ui";

const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler")
const $ = kendo.jQuery
export default {
    components: {
        chart: Chart,
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        showLoading1: true,
        showLoading2: true,
        showLoading3: true,
        showLoading4: true,
        showLoading5: true,
        showLoading6: true,
        insights: {},
        tooltip: {
            visible: true,
            template: "#= category #: #= value #",
        },
        // line chart
        series_line: [],
        categories_line: [
            1,
            2,
            3,
            4,
            5,
            6,
        ],
        chartArea: {
            background: "transparent",
            height: 230,
        },
        valueAxis_line: [
            {
                max: 10,
                // visible: false,
                labels: {
                    format: "{0}",
                },
            },
        ],
        // pie chart
        labelTemplate: "#= category # #= value #%",
        tooltipTemplate: "#= category # : #= value #%",
        chartAreaChart: {
            background: "transparent",
            height: 160,
        },
        series_chart: [
            {
                type: "pie",
                startAngle: 180,
                data: [
                    {
                        category: i18n.t("resident"),
                        value: 10,
                        color: "#c80000",
                    },
                    {
                        category: i18n.t("non_resident"),
                        value: 5,
                        color: "#de3446",
                    },
                ],
            },
        ],

        totalDraftTaxFilling: 0,
        totalTaxFilling: 0,
        lastFilling: '',
        netFilling: '',
        totalDraftTaxFillingFY: 0,

        totalSalaryFBT: 0,
        salary: 0,
        fbt: 0,
        numEmployee: 0,

        dayNextFilling: 0,
        totalTaxPayment: 0,
        vatTP: 0,
        whtTP: 0,
        salaryFBT: 0,

        totalTaxCredit: 0,
        vatCD: 0,
        ppiCD: 0,

        whtRate: 0,
        totalWht: 0,
        whts: [],
    }),
    methods: {
        async onloadInsight() {
            monthlyReturnHandler.getInsight().then(res => {
                this.insights = res.data.data
                window.console.log(res, 'insight')
                this.totalDraftTaxFilling = this.insights.totalDraftTaxFilling
                this.totalTaxFilling = this.insights.totalTaxFilling
                this.lastFilling = this.insights.lastFilling
                this.netFilling = this.insights.netFilling
                this.totalDraftTaxFillingFY = this.insights.totalDraftTaxFillingFY

                this.showLoading1 = false
                new Promise(resolve => {
                    setTimeout(async () => {
                        resolve('resolved');
                        this.dayNextFilling = this.insights.dayNextFilling
                        this.totalTaxPayment = this.insights.totalTaxPayment
                        this.vatTP = this.insights.vatTP
                        this.whtTP = this.insights.whtTP
                        this.salaryFBT = this.insights.salaryFBT

                        this.showLoading2 = false
                        new Promise(resolve => {
                            setTimeout(async () => {
                                resolve('resolved');
                                let categories = [], dataVatOut = [], dataVatIn = []
                                this.insights.vatOutput.forEach(o => {
                                    categories.push(new Date(o.monthOf).getMonth() + 1)
                                    dataVatOut.push(o.amount)
                                })
                                this.insights.vatInput.forEach(o => {
                                    dataVatIn.push(o.amount)
                                })
                                $("#chartVat").kendoChart({
                                    theme: 'sass',
                                    tooltip: {
                                        visible: true,
                                        template: "#= category #: #= value # (#= series.name #)",
                                    },
                                    valueAxis: [
                                        {
                                            // max: 10,
                                            // visible: false,
                                            labels: {
                                                format: "{0}",
                                            },
                                        },
                                    ],
                                    chartArea: {
                                        background: "transparent",
                                        height: 230
                                    },
                                    legend: {
                                        background: "transparent",
                                        position: "bottom",
                                        visible: false
                                    },
                                    series: [
                                        {
                                            type: "line",
                                            name: i18n.t('sale'),
                                            data: dataVatOut,
                                            color: "#ED1A3A",
                                        },
                                        {
                                            type: "line",
                                            name: i18n.t('purchase'),
                                            data: dataVatIn,
                                            color: "#4d4848",
                                        }
                                    ],
                                    categoryAxis: [{categories: categories}]
                                })
                                this.showLoading3 = false

                                new Promise(resolve => {
                                    setTimeout(async () => {
                                        resolve('resolved');
                                        this.totalSalaryFBT = this.insights.totalSalaryFBT
                                        this.salary = this.insights.salary
                                        this.fbt = this.insights.fbt
                                        this.numEmployee = this.insights.numEmployee
                                        this.showLoading4 = false

                                        new Promise(resolve => {
                                            setTimeout(async () => {
                                                resolve('resolved');
                                                this.totalTaxCredit = this.insights.totalTaxCredit
                                                this.vatCD = this.insights.vatCD
                                                this.ppiCD = this.insights.ppiCD
                                                this.showLoading5 = false

                                                new Promise(resolve => {
                                                    setTimeout(async () => {
                                                        resolve('resolved');
                                                        this.whtRate = this.insights.whtRate
                                                        this.totalWht = this.insights.totalWht
                                                        this.whts = this.insights.whts
                                                        window.console.log(this.whts, 'whts')
                                                        if (this.whts) {
                                                            $("#chartWht").kendoChart({
                                                                theme: 'sass',
                                                                tooltip: {
                                                                    visible: true,
                                                                    template: "#= category # : #= value #%",
                                                                },
                                                                chartArea: {
                                                                    background: "transparent",
                                                                    height: 160
                                                                },
                                                                seriesDefaults: {
                                                                    labels: {
                                                                        visible: false
                                                                    }
                                                                },
                                                                legend: {
                                                                    visible: false
                                                                },
                                                                series: [
                                                                    {
                                                                        type: "pie",
                                                                        startAngle: 180,
                                                                        data: [
                                                                            {
                                                                                category: i18n.t("non_resident"),
                                                                                value: this.whts.length > 0 ? this.whts[1].amount : 0,
                                                                                color: "#c80000",
                                                                            },
                                                                            {
                                                                                category: i18n.t("resident"),
                                                                                value: this.whts.length > 0 ? this.whts[0].amount: 0,
                                                                                color: "#de3446",
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            })
                                                        }

                                                        this.showLoading6 = false
                                                    }, 300)
                                                })
                                            }, 300)
                                        })
                                    }, 300)
                                })
                            }, 300)
                        })
                    }, 300)
                })
            })
        },
        numberFormat(value) {
            return kendo.toString(value, `n0`)
        },
        numberFormatRate(value) {
            return kendo.toString(value, `n2`)
        },
        async loadFunction(){
            await this.onloadInsight()
        }
    },
    async mounted() {
        await this.onloadInsight()
    },
    computed: {},
};
</script>
<style scoped>
.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

/*.h_kchart.k-chart{*/
/*    height: 250px !important;*/
/*}*/
.k-chart {
    height: 160px;
}

.dark_grey {
    color: #7e7a7a;
}

@media (max-width: 576px) {
}
</style>
