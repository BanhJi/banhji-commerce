MoreReports<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="py-0">
            <!-- loading -->
            <LoadingMe
                    :isLoading="compeletLoading"
                    :fullPage="false"
                    :myLoading="true">
            </LoadingMe>
            <v-row >
                <v-col sm="5" cols="12">
                    <v-card outlined dense class="pa-2 no_border mb-2 white--text"  color="primary" height="40px">
                        <p class="mb-0">
                            <span class="float-left text-uppercase">{{$t('cash_in')}}</span>
                            <span class="float-right text-bold" v-text="forwarded"/>
                        </p>
                    </v-card>
                    <v-card outlined dense class="pa-2 no_border mb-2 white--text" color="primary" height="40px">
                        <p class="mb-0">
                            <span class="float-left text-uppercase">{{$t('cash_out')}}</span>
                            <span class="float-right text-bold" v-text="forwarded"/>
                        </p>
                    </v-card>
                     <v-card outlined dense class="pa-2 no_border white--text"
                            color="third" height="40px">
                        <p class="mb-0 white--text">
                            <span class="float-left text-uppercase">{{$t('cash_balance')}}</span>
                            <span class="float-right text-bold" v-text="forwarded"/>
                        </p>
                    </v-card>
                </v-col>
                <v-col sm="7" cols="12" class="pt-0">
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
                <v-col sm="10" cols="10" class="py-0">
                    <app-searchdate :initStartDate="start_date" @emitStartDate="start_date = $event"
                                    :initEndDate="end_date" @emitEndDate="end_date = $event" />
                </v-col>

                <v-col sm="2" cols="2" class="pb-0 pt-1">
                    <v-btn class="btn_search"  style="background-color: rgb(237, 241, 245)">
                        <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="12" cols="12" class="py-0">
                    <template>
                        <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>{{$t('date')}} </th>
                                    <th>{{$t('account_type')}} </th>
                                    <th>{{$t('type')}} </th>
                                    <th>{{$t('reference')}} </th>
                                    <th>{{$t('amount')}} </th>
                                    <th>{{$t('status')}} </th>
                                    <th>{{$t('action')}} </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>01</td>
                                    <td>JB00009</td>
                                    <td>15/July/2020</td>
                                    <td>VARIANCE</td>
                                    <td>15/July/2020</td>
                                    <td>VARIANCE</td>
                                    <td class="text-center">80%</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    // import kendo from '@progress/kendo-ui'
    import {i18n} from '@/i18n'
    import { Chart } from "@progress/kendo-charts-vue-wrapper";
    import LoadingMe from '@/components/Loading'
    // import BankConnection from '@/components/BankConnection'
    import SearchDateComponent from '@/components/custom_templates/SearchDate'

    export default {
        name: "Report",
        components: {
            LoadingMe,
            'app-searchdate': SearchDateComponent,
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
                    color: "#92d050"
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
        }),
        methods: {
            ConnectClck(params){
                this.pic = params
                window.console.log(params)
            }
        },
        mounted() {
         
        },
        computed: {
            headers() {
                return [
                    {text: i18n.t('date'), value: 'journal_date'},
                    {text: i18n.t('type'), value: 'journal_type'},
                    {text: i18n.t('number'), value: 'journal_number'},
                    {text: i18n.t('description'), value: 'description'},
                    {text: i18n.t('debit'), value: 'dr'},
                    {text: i18n.t('credit'), value: 'cr'},
                ]
            },
        },
    };
</script>
<style scoped>
    .purchases {
        position: relative;
        width: 100%;
        background-color: #fff;
        padding: 20px 20px 5px;
    }

    .report_filter {
        background-color: #edf1f5;
        padding: 0 20px 0px 20px;
    }

    .report_block .v-card.third {
        background-color: #00b050;
        border: none;
        box-shadow: none;
        color: #ffffff;
        float: left;
        width: 100%;
    }

    .report_block .v-card.third p.text {
        text-align: left;
        font-size: 17px;
    }

    .report_block .v-card.third p.number {
        text-align: center;
        font-size: 25px;
        font-weight: 700;
        margin-bottom: 0;
    }

    .dv_mt {
        margin-top: 20px;
    }

    .report_block .left_card p:nth-child(2) {
        width: 100%;
        font-size: 19px;
        font-family: "Niradei-Bold", serif;
        padding: 7px 0 0 0;
        text-align: right;
    }

    .attachment_table table tr th {
        height: 55px !important;
    }
    .k-chart{
    height: 173px;
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
</style>