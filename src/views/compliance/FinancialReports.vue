<template>
    <v-row>
        <v-col cols="12" sm="12" class="pb-0">
            <!-- loading -->
            <LoadingMe
                    :isLoading="compeletLoading"
                    :fullPage="false"
                    :myLoading="true"/>
            <!-- <v-row>
                <v-col>
                    <v-card outlined dense class="pa-4 no_border black--text" color="whiteGreen" height="200px">
                        <h3 class="mb-0">{{$t('approved_reporting')}}</h3>
                        <h2 class="mb-0 font_26">4,050</h2>
                        <p class="mb-0">{{$t('for')}} 2020</p>
                        <v-btn class="float-right text-capitalize rounded-0 white--text" color="primary">
                            {{$t('edit')}}
                        </v-btn>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card outlined dense class="pa-4 no_border white--text" color="primary" height="200px">
                        <h3 class="font_20 mb-5">{{$t('statement_of_profit_or_loss')}}</h3>
                        <p class="mb-0">{{$t('statement_of_profit_or_loss_desc1')}}</p>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card outlined dense class="pa-4 no_border white--text" color="primary" height="200px">
                        <h3 class="font_20 mb-5">{{$t('statement_of_financial_position')}}</h3>
                        <p class="mb-0">{{$t('statement_of_financial_position_desc1')}}</p>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card outlined dense class="pa-4 no_border white--text" color="primary" height="200px">
                        <h3 class="font_20 mb-5">{{$t('statement_of_cash_flow')}}</h3>
                        <p class="mb-0">{{$t('statement_of_cash_flow_desc1')}}</p>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card outlined dense class="pa-4 no_border white--text" color="primary" height="200px">
                        <h3 class="font_20 mb-5">{{$t('statement_of_changes_in_equity')}}</h3>
                        <p class="mb-0">{{$t('statement_of_changes_in_equity_desc1')}}</p>
                    </v-card>
                </v-col>
            </v-row> -->
             <v-row>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="pa-4 no_border " color="grayBg" height="90px">
                        <h3 class="primary--text font_26 mb-5 text-right ">0</h3>
                        <p class="mb-0 text-uppercase  text-right">{{$t('drafted')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="pa-4 no_border" color="grayBg" height="90px">
                        <h3 class="primary--text font_26 mb-5 text-right ">0</h3>
                        <p class="mb-0 text-uppercase  text-right">{{$t('submitted')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="pa-4 no_border" color="grayBg" height="90px">
                        <h3 class="primary--text font_26 mb-5 text-right ">0</h3>
                        <p class="mb-0 text-uppercase  text-right">{{$t('accepted')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="pa-4 no_border" color="grayBg" height="90px">
                        <h3 class="primary--text font_26 mb-5 text-right ">0</h3>
                        <p class="mb-0 text-uppercase  text-right">{{$t('paid')}}</p>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="">
                <v-col sm="2" cols="12" class="pb-0">
                    <p class="mb-0 mt-2">{{$t('search_by_month')}}</p>
                </v-col>
                <v-col sm="3" cols="12" class="pb-0">
                    <v-select class=""
                              clearable
                              outlined
                              placeholder="ALL"
                    />
                </v-col>
                <v-col sm="1" cols="1" class="">
                    <v-btn class="white--text rounded-0" color="primary">
                        <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                    </v-btn>
                </v-col>
                <v-col sm="6" cols="12" class="pb-0">
                    <p class="mb-0">{{$t('you_need_to_have')}}
                        <router-link to="" class="greenSky--text">{{$t('login_here')}}</router-link>
                        {{$t('or_you_can')}}
                        <router-link to=""  class="greenSky--text">{{$t('sign_up_here')}}</router-link>
                    </p>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" sm="12" class="pb-0">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th>{{$t('submission_id')}} </th>
                            <th>{{$t('date')}} </th>
                            <th>{{$t('month_of')}} </th>
                            <th>{{$t('amount_paid')}} </th>
                            <th>{{$t('exchange_rate')}} </th>
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
</template>

<script>
    import LoadingMe from '@/components/Loading'

    export default {
        name: "",
        components: {
            LoadingMe,
        },
        data: () => ({
            // LoadingMe
            compeletLoading: false,
        }),
        methods: {
        },
        computed: {
        },
    };
</script>
<style scoped>
</style>