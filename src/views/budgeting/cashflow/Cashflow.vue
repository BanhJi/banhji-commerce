<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-4 pb-md-0">
            <div style="background-color: #fff;">
                <v-tabs
                    vertical
                    class="tab_setting tab_2"
                    slider-color="grayBg"
                    slider-size="7"
                    :class="{ tab_product_service_hide: isHide, tab_product_service_show: !isHide}">
                    <span class="hideAbs">
                        <v-icon size="16" class="arr_icon" @click="hideTabs" v-if="!isHide">
                            mdi-chevron-left-circle
                        </v-icon>
                        <v-icon size="16" class="arr_icon1" @click="hideTabs" v-if="isHide">
                            mdi-chevron-right-circle
                        </v-icon>
                    </span>
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down text-capitalize">
                            {{ $t('cash_flow_oveview') }}
                        </span>
                    </v-tab>
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down text-capitalize">
                            {{ $t('cash_flow_forecast') }}
                        </span>
                    </v-tab>
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down text-capitalize">
                            {{ $t('forcast_report') }}
                        </span>
                    </v-tab>
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down text-capitalize">
                            {{ $t('liquidity_position') }}
                        </span>
                    </v-tab>
                    <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-5 pt-0">
                                <CashPosition height="230"/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-5 pt-0">
                                <CashFlowForecast/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-5 pt-0">
                                <ForecastReport/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-5 pt-0">
                                <LiquidityPositionReport/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'Cahsflow',
        data: () => ({
            isHide: false
        }),
        props: {},
        methods: {
            hideTabs(){
				this.isHide = !this.isHide;
			},
            clickMe(data) {
                // alert(data.link)
                this.$router.push(`${data.link}`);
                //this.$event.target.classList.toggle(active)
                //eslint-disable-next-line no-console
                console.log(data.link)
                //eslint-disable-next-line no-console
                //console.log(data)
            }
        },
        components: {
            CashPosition :()=> import('./CashPosition'),
            CashFlowForecast: () => import('./CashFlowForecast'),
            ForecastReport: () => import('./ForecastReport'),
            LiquidityPositionReport : ()=> import('./LiquidityPositionReport')
        },
    };
</script>
<style scoped>
    .arr_icon {
        color: #c80000;
    }
    .tab_setting.tab_2.theme--light.v-tabs.tab_setting > .v-tabs-bar {
        height: 878px !important;
        min-height: 700px !important;
    }
    .arr_icon1 {
        color: #c80000;
    }
    .v-tab {
        justify-content: left;
        font-size: 16px;
    }

    .v-tab--active {
        background-color: rgb(255, 255, 255);
    }

    .tab_setting .v-tab--active {
        font-weight: 700;
        color: #000;
    }

    .v-tab--active {
        background-color: #ffffff !important;
        border-bottom: 4px solid #c80000;
        border-left: none;
    }

    p {
        color: rgba(0, 0, 0, 0.87);
    }

</style>