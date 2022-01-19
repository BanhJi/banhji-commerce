<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col class="py-0" sm="12" cols="12">
                        <v-card outlined dense color="white" class="no_border mb-4" >
                            <v-row>
                                <v-col sm="6" cols="12" class="py-0">
                                    <h2 class="text-left mb-0 font_20">{{$t('project_profitability')}}</h2>
                                </v-col>
                            </v-row>
                            <p class="mb-0 text-left">{{$t('margin')}}</p>
                            <chart :title-text="''"
                                   :legend-visible="false"
                                   :series-defaults-type="'bar'"
                                   :series="series2"
                                   :chart-area-background="''"
                                   :category-axis="categoryAxis1"
                                   :value-axis="valueAxis1"
                                   :tooltip="tooltip2"
                                   :theme="'sass'">
                            </chart>
                            <p class="mb-0 text-center">{{$t('revenue')}}</p>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="py-0 pr-md-2" sm="4" cols="12">
                        <v-card outlined dense color="secondary" class="niradei_bold pa-3 white--text mb-4 no_border d-flex justify-space-between align-center" min-height="78">
                            <h4 class="pa-0 text-uppercase col-md-5 col-xs-12 font_13 flex-1">
                                {{$t('project_margin')}}</h4>
                            <h6 class="pa-0 text-right font_20 col-md-7 col-xs-12">30%</h6>
                        </v-card>
                        <v-card outlined dense color="third" class="niradei_bold pa-3 white--text mb-4 no_border d-flex justify-space-between align-center" min-height="78">
                            <h4 class="pa-0 text-uppercase col-md-6 col-xs-12 font_13 flex-1">
                                {{$t('project_overrun')}}</h4>
                            <h6 class="pa-0 text-right font_20 col-md-6 col-xs-12">50%</h6>
                        </v-card>
                        <v-card outlined dense color="third" class="niradei_bold pa-3 white--text no_border d-flex justify-space-between align-center" min-height="78">
                            <h4 class="pa-0 text-uppercase col-md-6 col-xs-12 font_13 flex-1">
                                {{$t('project_delivered')}}</h4>
                            <h6 class="pa-0 text-right font_20 col-md-6 col-xs-12 flex-1">50%</h6>
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
                            <h3 class="font_20">{{ $t("project_ratio") }}</h3>
                            <p class="mb-7">
                                {{ $t('from_the_beginning_year') }}
                            </p>
                            <template>
                                <v-simple-table>
                                    <template>
                                        <tbody>
                                        <tr>
                                            <td class="text-left" style="width: 50%">
                                                <span class="niradei_medium font_14 grey--text">
                                                    {{$t('bid_to_win_ratio') }}
                                                </span>
                                                </td>
                                                <td class="text-right">
                                                <span class="niradei_heavy font_18 dark_grey">
                                                    90%
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">
                                                <span class="niradei_medium font_14 grey--text">
                                                    {{$t('employee_billable_utilization') }}
                                                </span>
                                                </td>
                                                <td class="text-right">
                                                <span class="niradei_heavy font_18 dark_grey">
                                                    80%
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left" >
                                                <span class="niradei_medium font_14 grey--text">
                                                    {{$t('sale_target_completion') }}
                                                </span>
                                                </td>
                                                <td class="text-right">
                                                <span class="niradei_heavy font_18 grey--text">
                                                    80%
                                                </span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </template>
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
                            <h3 class="font_20">{{ $t("key_project_data") }}</h3>
                            <p class="mb-7">
                                {{ $t('from_the_beginning_year') }}
                            </p>
                            <template>
                                <v-simple-table class="mb-3">
                                    <template>
                                        <tbody>
                                        <tr>
                                            <td class="text-left" style="width: 56%">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{$t('average_revenue_per_project') }}
                                            </span>
                                            </td>
                                            <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                90%
                                            </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{$t('average_project_revenue_aging') }}
                                            </span>
                                            </td>
                                            <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                80%
                                            </span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </template>
                            <v-row>
                                <v-col class="pl-0 py-0 text-right align-self-end">
                                    <router-link to="" class="mb-0 niradei_bold font_16 primary--text text-right">{{$t('view_report')}}</router-link>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>

                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {i18n} from '@/i18n'
    import { Chart } from "@progress/kendo-charts-vue-wrapper";
    export default {
        components:{
            'chart' : Chart
        },
        data: () => ({
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value #"
            },
            series_line: [
                {
                    type: 'line',
                    name: 'Sale',
                    data: [4, 2, 6,8,2,8],
                    color: "#c80000"
                },
                {
                    type: 'line',
                    name: 'Purchase',
                    data: [1, 6, 9,5,4,5],
                    color: "#00b050"
                }
            ],
            categories_line: [
                i18n.t("jan"),
                i18n.t("feb"),
                i18n.t("mar"),
                i18n.t("apr"),
                i18n.t("may"),
                i18n.t("jun"),
            ],
            valueAxis_line: [{
                max: 10,
                // visible: false,
                labels: {
                    format: "{0}"
                }
            }],
            series2: [{
                name: "Total Visits",
                data: [50000, 100000, 200000],
                color: '#c80000',
                border: {
                    width: 0
                },
            }],
            valueAxis1: [{
                max: 200000,
                line: {
                    visible: false
                },
                minorGridLines: {
                    visible: false
                },
                labels: {
                    rotation: "auto"
                }
            }],
            categoryAxis1: {
                categories: ["50%+", "25-50%", "0-25%"],
                majorGridLines: {
                    visible: false
                }
            },
            tooltip2: {
                visible: true,
                template: "#= series.name #: #= value #"
            },
        }),
        computed: {
        },
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
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.primary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: #c80000 !important;
    }
    .border-bottom {
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }

    .font-small {
        font-size: 12px;
        line-height: 15px;
    }

    .font-26 {
        font-size: 26px !important;
    }

    @media (max-width: 576px) {

    }
</style>