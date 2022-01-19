<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col class="py-0" sm="12" cols="12">
                        <v-card outlined dense color="white" class="no_border mb-4" >

                            <LoadingMe
                                    :isLoading="compeletLoading"
                                    :fullPage="false"
                                    :myLoading="true">
                            </LoadingMe>
                            <v-row >
                                <v-col sm="12" cols="12" class="py-0">
                                    <h2 class="text-left float-left mb-1 font_20">{{$t('cash_movement_position')}}</h2>
                                </v-col>
                                <v-col sm="12" cols="12" class="pt-0">
                                    <chart ref="chart"
                                        :legend-position="'bottom'"
                                        :legend-visible="false"
                                        :tooltip="tooltip"
                                        :series="series_line"
                                        :category-axis-categories="categories_line"
                                        :value-axis="valueAxis_line"
                                        :theme="'sass'"
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="py-0 pr-md-2" sm="4" cols="12">
                                    <v-card outlined dense color="secondary" class="niradei_bold pa-3 white--text mb-4 no_border d-flex justify-space-between align-center" min-height="78">
                                        <v-row>
                                            <h4 class="py-0 text-uppercase col-sm-12 col-md-7 font_13">
                                                {{$t('cash_ratio')}}</h4>
                                            <h6 class="align-self-center text-right py-0 font_20 col-sm-12 col-md-5">0.5</h6>
                                        </v-row>
                                    </v-card>
                                    <v-card outlined dense color="third" class="niradei_bold pa-3 white--text mb-4 no_border d-flex justify-space-between align-center" min-height="78">
                                        <v-row>
                                            <h4 class="py-0 text-uppercase col-sm-12 col-md-7 font_13">
                                                {{$t('quick_ratio')}}</h4>
                                            <h6 class="align-self-center py-0 text-right font_20 col-sm-12 col-md-5">1.0</h6>
                                        </v-row>
                                    </v-card>
                                    <v-card outlined dense color="third" class="niradei_bold pa-3 white--text no_border d-flex justify-space-between align-center " min-height="78">
                                        <v-row>
                                            <h4 class="py-0 text-uppercase col-sm-12 col-md-7 font_13">
                                                {{$t('current_ratio')}}</h4>
                                            <h6 class="align-self-center py-0 text-right font_20 col-sm-12 col-md-5">2.3</h6>
                                        </v-row>
                                    </v-card>
                                </v-col>
                                <v-col class="py-md-0 px-md-2" sm="4" cols="12">
                                    <v-card
                                        outlined
                                        dense
                                        class="pa-4 no_border"
                                        min-height="276"
                                        color="grayBg"
                                    >
                                        <h3 class="font_20">{{ $t("cash_bank_balance") }}</h3>
                                        <p class="mb-0">
                                            {{ $t('as_of_today') }}
                                        </p>
                                        <h2 class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">1,000</h2>
                                        <template>
                                            <v-simple-table class="mb-3 ">
                                                <template>
                                                    <!-- <tbody>
                                                    <tr>
                                                        <td class="text-left pl-0">
                                                            <span class="niradei_medium font_14 white--text">
                                                                {{$t('on_hand')}}
                                                            </span>
                                                        </td>
                                                        <td class="text-right pr-0">
                                                            <span class="niradei_heavy font_18 white--text">
                                                                20%
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left pl-0">
                                                            <span class="niradei_medium font_14 grey--text">
                                                                {{$t('in_bank')}}
                                                            </span>
                                                        </td>
                                                        <td class="text-right pr-0">
                                                            <span class="niradei_heavy font_18 dark_grey">
                                                                70%
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left pl-0">
                                                            <span class="niradei_medium font_14 grey--text">
                                                                {{$t('in_transit')}}
                                                            </span>
                                                        </td>
                                                        <td class="text-right pr-0">
                                                            <span class="niradei_heavy font_18 dark_grey">
                                                                10%
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    </tbody> -->
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
    
                                <v-col class="py-0 pl-md-2" sm="4" cols="12">
                                    <v-card
                                        outlined
                                        dense
                                        class="pa-4 no_border"
                                        min-height="276"
                                        color="grayBg"
                                    >
                                        <h3 class="font_20" style="line-height: 24px;">{{ $t("forecasted_cash_flow") }}</h3>
                                        <p class="mb-4">
                                            {{ $t('from_the_next_three_months') }}
                                        </p>
                                        <template>
                                            <v-simple-table>
                                                <template>
                                                    <tbody>
                                                    <tr>
                                                        <td class="text-left" style="width: 50%">
                                                            <span class="niradei_medium font_14 grey--text">
                                                                {{$t('total_balance') }}
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
                                                                {{$t('expected_due') }}
                                                            </span>
                                                        </td>
                                                        <td class="text-right">
                                                            <span class="niradei_heavy font_18 dark_grey">
                                                               800
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left">
                                                            <span class="niradei_medium font_14 grey--text">
                                                                {{$t('payable_to_pay') }}
                                                            </span>
                                                        </td>
                                                        <td class="text-right">
                                                            <span class="niradei_heavy font_18 dark_grey">
                                                               (3,000)
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left">
                                                            <span class="niradei_medium font_14 grey--text">
                                                                {{$t('budgeted_payments') }}
                                                            </span>
                                                        </td>
                                                        <td class="text-right">
                                                            <span class="niradei_heavy font_18 dark_grey">
                                                               (1,000)
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left">
                                                            <span class="niradei_medium font_14 grey--text">
                                                                {{$t('forecasted_balance') }}
                                                            </span>
                                                                        </td>
                                                                        <td class="text-right">
                                                            <span class="niradei_heavy font_18 dark_grey">
                                                               4,500
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
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    // import kendo from '@progress/kendo-ui'
    import {i18n} from '@/i18n'
    import { Chart } from "@progress/kendo-charts-vue-wrapper";
    import LoadingMe from '@/components/Loading'
    export default {
        name: "Overview",
        components: {
            LoadingMe,
            'chart' : Chart
        },
        data: () => ({
            start_date: "",
            end_date: "",
            dialogm2: false,
            forwarded: 1000,
            dialogm3: false,
            journal_entries: [],
            // LoadingMe
            compeletLoading: false,
            isLoaded: false,
            pic: '',
            
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value #"
            },
            series_line: [
                {
                    type: 'line',
                    name: 'Sale',
                    data: [4, 2, 6,8,2,8],
                    color: "#4d4848"
                },
                {
                    type: 'line',
                    name: 'Purchase',
                    data: [1, 6, 9,5,4,5],
                    color: "#c80000"
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
           
        }),

        methods: {
            ConnectClck(params){
                this.pic = params
                window.console.log(params)
            }
        },
    computed: {
    },
};
</script>
<style scoped>
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

    .border-bottom {
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }

    .attachment_table table tr th {
        height: 55px !important;
    }
    .k-chart{
        height: 220px;
    }   

    @media (max-width: 576px) {
        .dv_mt,
        .dv_mt8 {
            margin-top: 0;
        }

        .purchases {
            margin-top: 0;
        }
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.primary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: #f44336 !important;
    }
</style>