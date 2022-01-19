<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card color="white" class="pa-5 no_border" elevation="0">
                        <v-row>
                            <v-col sm="12" cols="12" class="tab_wrapper py-0">
                                <v-tabs>
                                    <v-tab>
										<span class="hidden-sm-and-up">
											<v-icon left>mdi-pen</v-icon>
										</span>
                                        <span class="hidden-sm-and-down">
											{{$t('subscribed')}}
										</span>
                                    </v-tab>
                                    <v-tab>
										<span class="hidden-sm-and-up">
											<v-icon left>mdi-pen</v-icon>
										</span>
                                        <span class="hidden-sm-and-down">
											{{$t('usage')}}
										</span>
                                    </v-tab>
                                    <v-tab>
										<span class="hidden-sm-and-up">
											<v-icon left>mdi-attachment</v-icon>
										</span>
                                        <span class="hidden-sm-and-down">
											{{$t('all_modules_apps')}}
										</span>
                                    </v-tab>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <Subscribe/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>

                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <Usage/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <AllModulesAndApp/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    export default {
        name: "Payroll",
        components: {
            Subscribe: () => import('./Subscribe'),
            AllModulesAndApp: () => import('./AllModulesAndApp'),
            Usage: () => import('./Usage'),
        },
        data: () => ({}),
        watch: {},
        methods: {
            clickMe(data) {
                this.$route.push(data.link);
            }
        }
    };
</script>
<style scoped>
    .v-menu__content .v-list .v-list-item {
        min-height: 35px !important;
    }

    .tab_wrapper {
        position: relative;
        display: inherit;
    }

    .v-tab {
        min-width: 30px;
        font-size: 17px;
        text-transform: capitalize;
    }

    .v-icon--left {
        margin-right: 0px;
    }

    .theme--light.v-tabs > .v-tabs-bar {
        border-bottom: 1px solid #ddd !important;
    }


    .v-tab--active {
        background-color: #F8F8F9;
        color: #000;
    }

    .theme--light.v-tabs >>> .v-tabs-bar {
        border-bottom: 1px solid #ddd !important;
    }

    .v-card__text {
        padding: 0 !important;
    }

</style>
	