<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class=" no_border" elevation="0">
                <v-row>
                    <v-col class="py-0" sm="6" cols="12">
                        <v-row>
                            <v-col class="py-0 pb-2 pr-2" sm="6" cols="12">
                                <v-card outlined dense color="secondary" class="text-center pa-3 no_border " >
                                    <h2 class="primary--text" >1</h2>
                                    <p class="font_16 mb-0 white--text">{{$t('accounts_to_be_reconciled')}}</p>
                                </v-card>
                            </v-col>
                            <v-col class="py-0 pl-2 pb-2" sm="6" cols="12">
                                <v-card outlined dense color="secondary" class="text-center pa-3 no_border" >
                                    <h2 class="primary--text" >2</h2>
                                    <p class="font_16 mb-0 white--text">{{$t('no_of_accounts_connected_bank_feeds')}}</p>
                                </v-card>
                            </v-col>
                            <v-col class="py-0 pr-2 pt-2" sm="6" cols="12">
                                <v-btn style="width: 100%; height: 57px !important;" to="" class="white--text mb-1 rounded-0 text-capitalize" color="third">
                                    {{$t('add_new_bank_accounts')}}
                                </v-btn>
                                <v-btn style="width: 100%; height: 57px !important;" to="" class="white--text mt-3 rounded-0 text-capitalize" color="third">
                                    {{$t('add_financial_institution')}}
                                </v-btn>
                            </v-col>
                            <v-col class="py-0 pl-2 pt-2" sm="6" cols="12">
                                <v-card outlined dense color="third" class="white--text text-center pa-3 no_border mb-5" >
                                    <h2 class="white--text">2</h2>
                                    <p class="font_16 mb-2">{{$t('no_of_financial_institutions_used')}}</p>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col class="py-0" sm="6" cols="12">
                        <v-card outlined dense color="grayBg" class="pa-3 no_border mb-5" >
                            <h2 class="mb-0 font_20">{{$t('bank_account_balance')}}</h2>
                            <chart ref="chart"
                                :legend-position="'bottom'"
                                :legend-visible="false"
                                :tooltip="tooltip"
                                :series="series_line"
                                :category-axis-categories="categories_line"
                                :value-axis="valueAxis_line"
                                :chartArea="chartArea"
                                :theme="'sass'"
                            />
                        </v-card>
                    </v-col>
                </v-row>

                <v-row class="mt-0">
                    <v-col class="py-0" sm="6" cols="12">
                        <v-card outlined dense class="pa-5 no_border text-center" height="205px"
                                color="grayBg">
                            <h3 class="mb-3">{{$t('total_bank_balances')}}</h3>
                            <h6 class="primary--text mb-5 font_14">100,500,00</h6>
                            <template>
                                <v-simple-table>
                                    <template v-slot:default>
                                        <tbody>
                                        <tr v-for="item in total_bank_balance" :key="item.name">
                                            <td class="text-left greyText--text ">{{ item.name }}</td>
                                            <td class="text-right text-bold">{{ item.value }}</td>
                                            <td class="text-right text-bold">{{ item.value1 }}</td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </template>
                        </v-card>
                    </v-col>
                    <v-col class="py-0" sm="6" cols="12">
                        <v-card outlined dense color="grayBg" class="py-5 px-10 no_border" height="205px">
                            <v-row>
                                <v-col class="py-0" sm="6" cols="12">
                                    <v-img max-width="140px"  src="@/assets/images/aba1.png" ></v-img>
                                </v-col>
                                <v-col class="pb-0 pl-0" sm="6" cols="12">
                                    <p class="mb-0">
                                        {{$t('if_you_have_aba')}}
                                    </p>
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
            total_bank_balance: [
                {
                    name: i18n.t('balance_in_bank'),
                    value: "100,000",
                    value1: "99%",
                },
                {
                    name: i18n.t('payment_in_transit'),
                    value: "5000",
                    value1: "1%",
                }
            ],
            tooltip: {
            visible: true,
            template: "#= series.name #: #= value #"
            },
            series_line: [
                {
                    type: 'line',
                    name: 'Sale',
                    data: [4, 2, 6,8,2,8],
                    color: "#ED1A3A"
                },
                {
                    type: 'line',
                    name: 'Purchase',
                    data: [1, 6, 9,5,4,5],
                    color: "#4d4848"
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
            chartArea: {
                background: "transparent",
                height: 212,
            },
         
        }),
        computed: {
            fields() {
                return [
                    '30 ' + i18n.t('days_summary'),
                    '60 ' + i18n.t('days_summary'),
                ]
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