<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                            outlined
                            dense
                            class="pa-4 no_border rounded-sm"
                            color="white"
                    >

                        <v-card outlined dense class="no_border">
                            <h2 class="mb-0">{{$t('connect_bank_account')}}</h2>
                            <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                            >close</v-icon>
                        </v-card>
                        <v-card outlined dense class="pa-4 no_border" color="grayBg">
                            <p class="mb-0">
                                {{$t('connect_desc')}}
                            </p>
                            <v-row>
                                <v-col sm="4" cols="12">
                                    <v-card outlined dense class="box-insight pa-5" style="min-height: 370px">
                                        <v-img width="100" class="mx-auto" src="@/assets/images/aba1.png" />
                                        <div class="mt-5">
                                            <h3 class="mb-3">{{$t('connect_aba_title')}}</h3>
                                            <a target="_blank" >https://business.ababank.com/CIB/</a>
                                            <p class="pt-3 mb-0">{{$t('connect_aba_desc')}}</p>
                                        </div>
                                    </v-card>
                                </v-col>
<!--                                <v-col sm="4" cols="12">-->
<!--                                    <v-card outlined dense class="box-insight pa-5" style="min-height: 370px">-->
<!--                                        <v-img width="100" class="mx-auto" src="@/assets/images/ppcbank1.png" />-->
<!--                                        <div class="mt-5">-->
<!--                                            <h3 class="mb-3">{{$t('connect_aba_title')}}</h3>-->
<!--                                            <a target="_blank" >https://business.ababank.com/CIB/</a>-->
<!--                                            <p class="pt-3 mb-0">{{$t('connect_ppcbank_desc')}}</p>-->
<!--                                        </div>-->
<!--                                    </v-card>-->
<!--                                </v-col>-->
<!--                                <v-col sm="4" cols="12">-->
<!--                                    <v-card outlined dense class="box-insight pa-5" style="min-height: 370px">-->
<!--                                        <v-img width="120" class="mx-auto" src="@/assets/images/sathapana_bank.png" />-->
<!--                                        <div class="mt-5">-->
<!--                                            <h3 class="mb-3">{{$t('connect_sathapana_title')}}</h3>-->
<!--                                            <a target="_blank" >https://business.ababank.com/CIB/</a>-->
<!--                                            <p class="pt-3 mb-0">{{$t('connect_sathapana_desc')}}</p>-->
<!--                                        </div>-->
<!--                                    </v-card>-->
<!--                                </v-col>-->
                            </v-row>
                            <v-row>
<!--                                <v-col sm="4" cols="12">-->
<!--                                    <v-card outlined dense class="box-insight pa-5" style="min-height: 370px">-->
<!--                                        <v-img width="100%" class="mx-auto" src="@/assets/images/amk1.png" />-->
<!--                                        <div class="mt-5">-->
<!--                                            <h3 class="mb-3">{{$t('connect_amk_title')}}</h3>-->
<!--                                            <a target="_blank" >https://business.ababank.com/CIB/</a>-->
<!--                                            <p class="pt-3 mb-0">{{$t('connect_amk_desc')}}</p>-->
<!--                                        </div>-->
<!--                                    </v-card>-->
<!--                                </v-col>-->
                            </v-row>
                            <p class="text-center mb-0 mt-5">
                                <v-icon size="14" color="black" class="mr-3">fas fa-lock</v-icon>
                                {{$t('connect_desc_footer')}}
                            </p>
                        </v-card>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
     </v-app>
</template>

<script>
    export default {
        name: '',
        components: {},
        data: () => ({}),
        methods: {},
        mounted() {
        },
    };
</script>
<style scoped>
    .function_content{
        padding: 25px;
        border-bottom: 0;
    }
    @media (min-width: 1264px) {
        .container {
            /* max-width: 1185px; */
            max-width: 1080px !important;
        }
    }

    @media (max-width: 576px) {

    }
</style>