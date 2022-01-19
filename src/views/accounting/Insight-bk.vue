<template>
    <v-row class="">
        <v-col class="py-0" sm="7" cols="12">
            <v-row>
                <v-col sm="6" cols="12">
                    <v-card outlined dense color="third" class="pa-3 no_border" height="70px">
                        <v-row>
                            <v-col sm="4" cols="6" class="py-0">
                                <h6 class="primary--text" v-if="insight">{{ Number(insight.number_of_unreconcile_account).toLocaleString() }}</h6>
                            </v-col>
                            <v-col sm="8" cols="6" class="py-0">
                                <p class="white--text font_18 mb-0 text-right text-uppercase">{{$t('to_be_reconciled')}}</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col sm="6" cols="12">
                    <v-card outlined dense color="primary" class="pa-3 no_border" height="70px">
                        <v-row>
                            <v-col sm="4" cols="6" class="py-0">
                                <h6 class="white--text">0</h6>
                            </v-col>
                            <v-col sm="8" cols="6" class="">
                                <p class="font_18 mb-0 text-right text-uppercase">{{$t('coming_tasks')}}</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="6" cols="12">
                    <v-card outlined dense class="pa-5 no_border" height="195px" color="grayBg">
                        <h3>{{$t('transactions')}}</h3>
                        <p class="mb-0">{{$t('from_the_beginning')}}</p>
                        <h2 class="primary--text mb-0" v-if="insight">{{ Number(insight.number_of_transactions).toLocaleString() }}</h2>
                        <template>
                            <v-simple-table>
                                <template>
                                    <tbody>
                                    <tr>
                                        <td class="text-left greyText--text">{{$t('backdated')}}</td>
                                        <td class="text-right text-bold" v-if="insight">{{ Number(insight.number_of_backdate_transactions).toLocaleString() }}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left greyText--text">{{$t('in_the_future')}}</td>
                                        <td class="text-right text-bold" v-if="insight">{{ Number(insight.number_of_futuredate_transactions).toLocaleString() }}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-card>
                </v-col>
                <v-col sm="6" cols="12">
                    <v-card outlined dense class="pa-5 no_border" height="195px" color="grayBg">
                        <h3>{{$t('changes_in_retained_earning')}}</h3>
                        <h2 class="primary--text" v-if="changeInRetainEarning">{{ Number(changeInRetainEarning.change_in_amount).toLocaleString() }}</h2>
                        <template>
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody>
                                    <tr>
                                        <td class="text-left greyText--text">{{$t('during_fy')}}</td>
                                        <td class="text-right text-bold" v-if="changeInRetainEarning">{{ Number(changeInRetainEarning.current_retain_earning.numberOfTransaction).toLocaleString() }}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left greyText--text">{{$t('before_fy')}}</td>
                                        <td class="text-right text-bold" v-if="changeInRetainEarning">{{ Number(changeInRetainEarning.previous_retain_earning.numberOfTransaction).toLocaleString() }}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-card>
                </v-col>
                <v-col sm="6" cols="12">
                    <v-card outlined dense class="pa-5 no_border" height="220" color="grayBg">
                        <h3 class="float-left col-sm-6 pa-0 mb-5">{{$t('need_your_attention')}}</h3>
                        <template>
                            <v-simple-table class="float-left">
                                <template>
                                    <tbody>
                                    <tr>
                                        <td class="text-left greyText--text">{{$t('negative_balance')}}</td>
                                        <td class="text-right text-bold primary--text font_20" v-if="insight">{{ Number(insight.number_of_accounts_with_negative_balance).toLocaleString() }}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left greyText--text">{{$t('clearing_suspense_accounts')}}</td>
                                        <td class="text-right text-bold primary--text font_20" v-if="insight">{{ Number(insight.clearing_account_balance).toLocaleString() }}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-card>
                </v-col>
                <v-col sm="6" cols="12">
                    <v-card outlined dense class="pa-5 no_border" height="220px" color="grayBg">
                        <h3 class="float-left col-sm-6 pa-0 mb-0">{{$t('key_variance')}}</h3>
                        <template>
                            <v-simple-table class="float-left col-sm-12 pa-0">
                                <template v-slot:default>
                                    <tbody>
                                    <tr v-for="(item) in key_variance" :key="item.name">
                                        <td class="text-left greyText--text"  v-bind:class="item.class">{{ item.name }}</td>
                                        <td class="text-right text-bold primary--text font_16" v-bind:class="item.class">{{ item.value }}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col class="py-0" sm="5" cols="12">
            <v-row>
                <v-col sm="12" cols="12" class="">
                    <v-card
                        color="grayBg"
                        outlined
                        dense
                        class="pa-4 no_border mb-6"
                        height="70"
                    >
                        <v-row>
                            <v-col sm="6" cols="6" class="">
                                <h3 class="black--text font_20 mb-0 text-uppercase" v-if="closingDate">{{ Helper.dateFormat(closingDate.closingDate) }}</h3>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0">
                                <p class="black--text font_20 mb-0 text-right text-uppercase">{{$t('current_closing_date')}}</p>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card
                        color="grayBg"
                        outlined
                        dense
                        class="pa-4 no_border"
                        height="195"
                    >
                        <v-row>
                            <v-col sm="6" cols="12" class="pr-0 py-0">
                                <h3 class="font_18 mb-2">{{ $t("current_assets_analysis") }}</h3>
                                <template>
                                    <v-simple-table>
                                        <template v-slot:default>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <span class="float-left  font_14 dark_grey">
                                                        {{ $t("balance") }}
                                                    </span><br/>
                                                    <h3 class="float-right text-bold font_18 black--text" v-if="assetLiabilityReport">
                                                        {{ Number(assetLiabilityReport.total_current_asset).toLocaleString() }}
                                                    </h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span class="float-left  font_14 dark_grey" v-if="assetLiabilityReport">
                                                        {{ $t("%_of_total_assets") }}
                                                    </span><br/>
                                                    <h3 class="float-right text-bold font_18 black--text" v-if="assetLiabilityReport">
                                                        {{ currentAssetPercentage }}
                                                    </h3>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </template>
                            </v-col>
                            <v-col sm="6" cols="12" class="pl-0 py-0">
                                <chart
                                    ref="currentAssetChart"
                                    :legend-position="'bottom'"
                                    :legend-visible="false"
                                    :tooltip-visible="true"
                                    :tooltip-template="'#= category #: #: value #'"
                                    :chart-area-background="''"
                                    :series-defaults-type="'donut'"
                                    :series-defaults-labels-background="'transparent'"
                                    :series="currentAssetSeries"
                                    :value-axis="valueAxis_round"
                                    :theme="'sass'"
                                />
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="12" cols="12" class="pb-0">
                            <v-card
                                color="grayBg"
                                outlined
                                dense
                                class="pa-4 no_border"
                                height="220"
                            >
                                <v-row>
                                    <v-col sm="6" cols="12" class="pr-0 py-0">
                                        <h3 class="font_18 mb-2">{{ $t("current_liabilities_analysis") }}</h3>
                                        <template>
                                            <v-simple-table>
                                                <template v-slot:default>
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <span class="float-left  font_14 dark_grey">
                                                                {{ $t("balance") }}
                                                            </span>
                                                            <br/>
                                                            <h3 class="float-right text-bold font_18 black--text" v-if="assetLiabilityReport">
                                                                {{ Number(assetLiabilityReport.total_current_liability * -1).toLocaleString() }}
                                                            </h3>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span class="float-left  font_14 dark_grey">                                                                
                                                                {{ $t("%_of_total_liabilities") }}
                                                            </span>
                                                            <br/>
                                                            <h3 class="float-right text-bold font_18 black--text" v-if="assetLiabilityReport">
                                                                {{ currentLiabilityPercentage }}
                                                            </h3>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </template>
                                    </v-col>
                                    <v-col sm="6" cols="12" class="pl-0 py-0">
                                        <chart
                                            ref="currentLiabilityChart"
                                            :legend-position="'bottom'"
                                            :legend-visible="false"
                                            :tooltip-visible="true"
                                            :tooltip-template="'#= category #: #= value #%'"
                                            :chart-area-background="''"
                                            :series-defaults-type="'donut'"
                                            :series-defaults-labels-background="'transparent'"
                                            :series="currentLiabilitySeries"
                                            :value-axis="valueAxis_round"
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
    import {i18n} from '@/i18n';
    import JQuery from 'jquery';
    import kendo from '@progress/kendo-ui';
    import Helper from "@/helper.js";
    import { Chart } from '@progress/kendo-charts-vue-wrapper';
    
    const { accountingInsightHandler, closingDateHandler } = require("@/scripts/AppHandlers");

    export default {
        components: {
            'chart': Chart,
        },
        data: () => ({            
            insight: null,
            assetLiabilityReport: null,
            varianceAnalysist: null,
            changeInRetainEarning: null,
            closingDate: null,
            Helper: Helper,
            currentAssetPercentage: 0,
            currentLiabilityPercentage: 0,
            currentAssetSeries: [],
            currentLiabilitySeries: [],
            valueAxis_round: [
                {
                    labels: {
                        format: "{0}",
                    },
                },
            ],
            key_variance: [
                {
                    name: i18n.t('assets'),
                    value: '0',
                },
                {
                    name: i18n.t('liabilities'),
                    value: '0',
                },
                {
                    name: i18n.t('equity'),
                    value: '0',
                },
                {
                    name: i18n.t('revenues'),
                    value: '0',
                },
                {
                    name: i18n.t('expenses'),
                    value: '0',
                    class: 'border-bottom'
                }
            ],
        }),
        methods: {
            loadData(){
                let today = new Date(),
                    monthOf = kendo.toString(today, "MM-yyyy"),
                    compareMonthOf = kendo.toString(today, "MM-yyyy");

                accountingInsightHandler
                .getInsights()
                .then(res => {
                    if (!JQuery.isEmptyObject(res.data)) {
                        // Bind data
                        this.insight = res.data;
                    }
                });

                accountingInsightHandler
                .getAssetLiabilityReport(today)
                .then(res => {
                    if (!JQuery.isEmptyObject(res.data)) {
                        // Bind data
                        this.assetLiabilityReport = res.data;
                        this.bindData();
                    }
                });

                // accountingInsightHandler
                // .getVarianceAnalysist(monthOf, compareMonthOf)
                // .then(res => {
                //     if (res.data) {
                //         // Bind data
                //         this.varianceAnalysist = res.data;
                //     }
                // });

                accountingInsightHandler
                .getChangeInRetainEarning(monthOf, compareMonthOf)
                .then(res => {
                    if (!JQuery.isEmptyObject(res.data)) {
                        // Bind data
                        this.changeInRetainEarning = res.data;
                    }
                });

                // Closing Date
                closingDateHandler.last()
                .then(res => {
                    if (!JQuery.isEmptyObject(res.data.data)) {
                        // Bind data
                        this.closingDate = res.data.data;
                    }
                });
            },
            bindData(){
                // Current Asset
                let currentAssetPercentage = 0;
                if(this.assetLiabilityReport.total_asset > 0){
                    currentAssetPercentage = (this.assetLiabilityReport.total_current_asset / this.assetLiabilityReport.total_asset) * 100;                
                    this.currentAssetPercentage = kendo.toString(currentAssetPercentage, "n");
                }
                
                let currentAssetChart = this.$refs.currentAssetChart.kendoWidget();
                currentAssetChart.options.series.push({
                    data: [
                        {   
                            category: i18n.t('current_assets'),
                            value: kendo.toString(currentAssetPercentage, "n"),
                            color: "#528233",
                        },
                        {
                            category: i18n.t('other_assets'),
                            value: kendo.toString(100 - currentAssetPercentage, "n"),
                            color: "#6fac46",
                        }
                    ]
                });
                currentAssetChart.refresh();                

                // Current Liabilities
                let currentLiabilityPercentage = 0;
                if(this.assetLiabilityReport.total_liability > 0){
                    currentLiabilityPercentage = (this.assetLiabilityReport.total_current_liability / this.assetLiabilityReport.total_liability) * 100;
                    this.currentLiabilityPercentage = kendo.toString(currentLiabilityPercentage, "n");
                }

                let currentLiabilityChart = this.$refs.currentLiabilityChart.kendoWidget();
                currentLiabilityChart.options.series.push({
                    data: [
                        {   
                            category: i18n.t('current_liabilities'),
                            value: kendo.toString(currentLiabilityPercentage, "n"),
                            color: "#528233",
                        },
                        {
                            category: i18n.t('other_liabilities'),
                            value: kendo.toString(100 - currentLiabilityPercentage, "n"),
                            color: "#6fac46",
                        }
                    ]
                });
                currentLiabilityChart.refresh();                
            },
        },
        mounted() {
            // Load Insights
            this.loadData();
        },
    };
</script>

<style scoped>
    .loan-to-pay {
        background-color: #212a35;
        color: #fff;
        border: 0;
    }

    .loan-to-pay .row .v-card {
        background-color: rgb(146, 208, 80);
        font-size: 41px;
        border: 0;
        color: #212a35;
    }
    .k-chart {
        height: 160px !important;
    }


    .box-insight {
        background-color: #EDF1F5;
        min-height: 220px;
        justify-content: center;
        display: flex;
        align-items: center;
        border: none !important;
        border-radius: 0 !important;
        text-align: center;
        padding: 28px 40px;

    }

    .color_green {
        color: #2CA01C;
        font-size: 35px;
        font-family: "Niradei-Bold", serif !important;
    }
    .theme--light.v-data-table {
        background-color: transparent !important;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }
    .border-bottom{
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .font-small{
        font-size: 12px;
        line-height: 15px;
    }
    .font-26{
        font-size: 26px !important;
    }
    @media (max-width: 576px) {

    }
</style>