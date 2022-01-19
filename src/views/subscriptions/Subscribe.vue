<template>
    <v-row>
        <v-col sm="12" cols="12" class="pb-0">
            <v-row>
                <v-col sm="3" cols="3">
                    <v-card outlined dense color="grayBg" class="no_border pa-3" min-height="160px !important">
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0 text-center">
                                <h3 style="font-size: 22px;line-height: 24px;" class="mb-0 text-bold  mb-4">
                                    {{$t('number_of_subscribed_products')}}</h3>
                                <h4 style="font-size: 24px" class="primary--text mb-3">10</h4>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="3">
                    <v-card outlined dense color="grayBg" class="no_border pa-3" min-height="160px !important">
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0 text-center">
                                <h3 style="font-size: 22px;line-height: 24px;" class="mb-0 text-bold  mb-4">
                                    {{$t('subscribed_products_to_be_expired')}}</h3>
                                <h4 style="font-size: 24px" class="primary--text mb-3">10</h4>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="3">
                    <v-card outlined dense color="grayBg" class="no_border pa-3" min-height="160px !important">
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0 text-center">
                                <h3 style="font-size: 22px;line-height: 24px;" class="mb-0 text-bold  mb-4">
                                    {{$t('available_credit')}}</h3>
                                <h4 style="font-size: 24px" class="primary--text mb-3">$30</h4>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="3">
                    <v-card outlined dense color="grayBg" class="no_border pa-3" min-height="160px !important">
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0 text-center">
                                <h3 style="font-size: 22px;line-height: 24px;" class="mb-0 text-bold mb-4">
                                    {{$t('total_subscription_fees')}}</h3>
                                <h4 style="font-size: 24px" class="primary--text mb-3">$30</h4>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col sm="12" cols="12" class="pt-3 pb-0">
            <p class="float-left">{{$t('u_sub_following_product')}}</p>
            <p class="float-right">{{$t('company_id')}}: <span class="text-bold"> 5505050</span></p>
        </v-col>
        <v-col sm="12" cols="12" class="py-0">
            <v-row>
                <v-col class="pb-0" sm="6" cols="12">
                    <v-card outlined dense class="pa-5 no_border text-center" height="300px" color="whiteGreen">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0">
                                <v-img width="150" src="@/assets/images/banhji_accouning.png"/>
                            </v-col>
                            <v-col sm="6" cols="6" class="pa-0">
                                <v-btn color="greyGreen" class="text-capitalize white--text">
                                    {{$t('standard_edition')}}
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-simple-table class="subscribe_tb mt-5">
                            <template v-slot:default>
                                <tbody>
                                <tr v-for="item in invoices" :key="item.name">
                                    <td class="text-left">{{ item.name }}</td>
                                    <td class="text-right text-bold grey--text">{{ item.calories }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                        <v-btn class="float-right text-capitalize white--text rounded-0 ml-4 mt-4" color="primary">
                            {{$t('upgrade_now')}}
                        </v-btn>
                        <v-btn class="float-right text-capitalize white--text rounded-0 mt-4" color="primary">
                            {{$t('renew_now')}}
                        </v-btn>
                    </v-card>
                </v-col>
                <v-col class="pb-0" sm="6" cols="12">
                    <v-card outlined dense class="pa-5 no_border text-center" height="300px" color="grayBg">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0">
                                <v-img width="150" src="@/assets/images/smp.png"/>
                            </v-col>
                        </v-row>
                        <v-simple-table class="cash-balance mt-5">
                            <template v-slot:default>
                                <tbody>
                                <tr v-for="item in invoices" :key="item.name">
                                    <td class="text-left">{{ item.name }}</td>
                                    <td class="text-right text-bold grey--text">{{ item.calories }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                        <v-btn class="float-right text-capitalize white--text rounded-0 ml-4 mt-4" color="primary">
                            {{$t('upgrade_now')}}
                        </v-btn>
                        <v-btn class="float-right text-capitalize white--text rounded-0 mt-4" color="primary">
                            {{$t('renew_now')}}
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>

        </v-col>
    </v-row>
</template>

<script>
    import {i18n} from '@/i18n'

    export default {
        components: {},
        data: () => ({
            invoices: [
                {
                    name: 'Subscribe date',
                    calories: '26/10/2020',
                },
                {
                    name: 'To be renewed',
                    calories: '26/10/2020',
                },
                {
                    name: 'Subscription Fre per month',
                    calories: '50',
                }

            ],

        }),
        mounted() {
        },
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
    .v-data-table {
        background: none !important;
    }

    .v-data-table tr td:last-child {
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
    }

    .v-data-table tr td:nth-last-child(2) {
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: transparent !important;
    }
</style>