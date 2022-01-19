<template>
    <v-row class="">
        <v-col class="pb-0" sm="7" cols="12">
            <v-row>
                <v-col sm="6" cols="12">
                    <v-card
                        outlined
                        dense
                        color="third"
                        class="pa-3 mb-5 no_border"
                        height="65px"
                    >
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0">
                                <h6 class="primary--text">10</h6>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0">
                                <h4 class="white--text text-right font_16 text-uppercase">
                                    {{ $t("draft_tax_filling") }}
                                </h4>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card
                        outlined
                        dense
                        class="pa-5 no_border text-center"
                        height="190px"
                        color="grayBg"
                    >
                        <h3>{{ $t("tax_credit") }}</h3>
                        <h6 class="primary--text">10,000</h6>
                        <template>
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody>
                                    <tr v-for="item in tax_credit" :key="item.name">
                                        <td class="text-left greyText--text ">
                                            {{ item.name }}
                                        </td>
                                        <td class="text-right text-bold">{{ item.value }}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-card>
                </v-col>
                <v-col sm="6" cols="12">
                    <v-card
                        outlined
                        dense
                        color="primary"
                        class="pa-3 mb-5 no_border"
                        height="65px"
                    >
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0">
                                <h6 class="white--text">10</h6>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0">
                                <h4 class="text-right font_16 text-uppercase">
                                    {{ $t("day_until_next_filling") }}
                                </h4>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card
                        outlined
                        dense
                        class="px-5 pt-3 pb-5 no_border text-center"
                        height="190px"
                        color="grayBg"
                    >
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0">
                                <h3 class="text-center">{{ $t("ytd_tax_payment") }}</h3>
                            </v-col>
                        </v-row>
                        <h6 class="primary--text">10,500</h6>
                        <template>
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody>
                                    <tr v-for="item in ytd_tax" :key="item.name">
                                        <td class="text-left greyText--text ">
                                            {{ item.name }}
                                        </td>
                                        <td class="text-right text-bold">{{ item.value }}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="pb-0" sm="12" cols="12">
                    <v-card
                        outlined
                        dense
                        color="grayBg"
                        class="pa-5 no_border"
                        min-height="220px"
                    >
                        <h2 class="text-left primary--text text-uppercase mb-0 font_22">
                            {{ $t("compliance_checklist") }}
                        </h2>
    
                        <template>
                            <v-simple-table>
                                <template>
                                    <thead>
                                        <tr>
                                            <th style="width:22%;" class="text-uppercase text-bold font_14 black--text">{{$t('type')}}</th>
                                            <th></th>
                                            <th class="text-uppercase text-bold font_14 black--text">{{$t('current_status')}}</th>
                                            <th class="text-uppercase text-bold font_14 black--text">{{$t('next_deadline')}}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="text-left white--text primary text-uppercase py-1">
                                                {{$t('monthly_tax')}}
                                            </td>
                                            <td class="text-bold text-uppercase white--text primary py-1">{{$t('gdt')}}</td>
                                            <td class="text-left white--text primary py-1">
                                                OCT 2020
                                            </td>
                                            <td class="text-left white--text primary py-1">
                                                31 Dec 2020
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left text-uppercase py-1">
                                                {{$t('financial_reports')}}
                                            </td>
                                            <td class="text-bold text-uppercase py-1">{{$t('acra')}}</td>
                                            <td class="text-left py-1">
                                            </td>
                                            <td class="text-left py-1">
                                                30,000
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col class="pb-0" sm="5" cols="12">
            <v-row>
                <v-col sm="12" cols="12" class="">
                    <v-card
                        outlined
                        dense
                        color="grayBg"
                        class="pa-5 no_border"
                        min-height="220px"
                    >
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0">
                                <h3 class="text-left mb-1 font_22">{{ $t("vat_input_output") }}</h3>
                                <p>{{ $t("from_the_beginning") }}</p>
                            </v-col>
                            <!-- <v-col sm="6" cols="6" class="pa-0">
                              <h2 class="primary--text d-block text-right mr-3">10,500</h2>
                            </v-col> -->
                        </v-row>
                        <chart
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
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="12" cols="12" class="pb-0">
                    <v-card
                        outlined
                        dense
                        class="pa-5 no_border text-center"
                        height="226px"
                        color="grayBg"
                    >
                        <v-row>
                            <v-col sm="6" cols="12" class="pr-1">
                                <h3 class="text-left mb-1 font_22">{{ $t("withholding_tax") }}</h3>
                                <template>
                                    <v-simple-table class="mt-2">
                                        <template v-slot:default>
                                            <tbody>
                                                <tr
                                                    v-for="item in withholding_tax"
                                                    :key="item.name"
                                                >
                                                    <td class="text-right text-uppercase">
                                                        <span class="text-bold font_18 dark_grey">
                                                            {{ item.value }}
                                                        </span>
                                                        <br/>
                                                        <span class="font_14 grey--text">
                                                            {{ $t(item.name) }}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </template>
                            </v-col>
                            <v-col sm="6" cols="12" class="pl-0 pt-0">
                                <chart
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
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import {i18n} from "@/i18n";
import {Chart} from "@progress/kendo-charts-vue-wrapper";

export default {
    components: {
        chart: Chart,
    },
    data: () => ({
        tax_credit: [
            {
                name: i18n.t("value_added_tax"),
                value: "20%",
            },
            {
                name: i18n.t("prepayment"),
                value: "80%",
            },
        ],
        ytd_tax: [
            {
                name:  i18n.t("vat"),
                value: "50%",
            },
            {
                name:  i18n.t("wht"),
                value: "30%",
            },
            {
                name:  i18n.t("salary_fbt"),
                value: "20%",
            },
        ],
        withholding_tax: [
            {
                name: "average_wht_rate",
                value: "15%",
            },
            {
                name: "wht_amount",
                value: "10,000",
            }
        ],
        tooltip: {
            visible: true,
            template: "#= series.name #: #= value #",
        },
        series_line: [
            {
                type: "line",
                name: "Sale",
                data: [4, 2, 6, 8, 2, 8],
                color: "#92d050",
            },
            {
                type: "line",
                name: "Purchase",
                data: [1, 6, 9, 5, 4, 5],
                color: "#00b050",
            },
        ],
        categories_line: [
            i18n.t("jan"),
            i18n.t("feb"),
            i18n.t("mar"),
            i18n.t("apr"),
            i18n.t("may"),
            i18n.t("jun"),
        ],
        chartArea: {
            background: "transparent",
            height: 170,
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
            height: 190,
        },
        series_chart: [
            {
                type: "pie",
                startAngle: 180,
                data: [
                    {
                        category: i18n.t("credit_card"),
                        value: 22,
                        color: "#a0c490",
                    },
                    {
                        category: i18n.t("working_capital"),
                        value: 45,
                        color: "#528233",
                    },
                    {
                        category: i18n.t("investment"),
                        value: 11,
                        color: "#61993d",
                    },
                    {
                        category: i18n.t("overdraft"),
                        value: 22,
                        color: "#6fac46",
                    },
                ],
            },
        ],
    }),
    mounted() {
    },
    computed: {
        fields() {
            return ["30 " + i18n.t("days_summary"), "60 " + i18n.t("days_summary")];
        },
        days_summary() {
            return [
                {
                    name: i18n.t("today_balance"),
                    value: "500",
                },
                {
                    name: i18n.t("expected_due"),
                    value: "8,000",
                },
                {
                    name: i18n.t("amount_to_pay"),
                    value: "(3,000)",
                },
                {
                    name: i18n.t("forecated_balance") + " 6/8/20",
                    value: "5,500",
                },
            ];
        },
        collection_day() {
            return [
                {
                    name: i18n.t("collection_days"),
                    value: "30",
                },
                {
                    name: i18n.t("payment_days"),
                    value: "15",
                },
                {
                    name: i18n.t("turnover_days"),
                    value: "40",
                },
            ];
        },
        quick_ratio() {
            return [
                {
                    name: i18n.t("quick_ratio"),
                    value: "0.8",
                },
                {
                    name: i18n.t("cash_ratio"),
                    value: "0.5",
                },
                {
                    name: i18n.t("current_ratio"),
                    value: "2.0",
                },
            ];
        },
    },
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

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.k-chart {
    height: 160px;
}

@media (max-width: 576px) {
}
</style>
