<template>
    <v-row>
        <v-col cols="12" sm="12" class="pb-0">
            <!-- loading -->
            <LoadingMe
                    :isLoading="compeletLoading"
                    :fullPage="false"
                    :myLoading="true"/>
            <v-row>
                <v-col sm="4" cols="12">
                    <v-card outlined dense class="pa-4 no_border " color="grayBg" height="100px">
                        <p class="mb-5">{{$t('total_number_of_share')}}</p>
                        <h2 class="primary--text font_26 mb-0 float-right">100,500,000</h2>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="pa-4 no_border " color="grayBg" height="100px">
                        <p class="mb-5">{{$t('latest_price_per_share')}}</p>
                        <h2 class="primary--text font_26 mb-0 float-right">$1.5</h2>
                    </v-card>
                </v-col>
                <v-col sm="5" cols="12">
                    <v-row>
                        <v-col sm="6" cols="12" class="pt-0">
                            <v-btn to="" color="third" class="rounded-0 col-sm-12 float-left" style="height: 45px !important;">
                                <span class="font_12 white--text text-capitalize">{{$t('add_new_shareholder')}}</span>
                            </v-btn>
                        </v-col>
                        <v-col sm="6" cols="12" class="pt-0">
                            <v-btn to="" color="primary" class="rounded-0 col-sm-12" style="height: 45px !important;">
                                <span class="font_12 white--text text-capitalize">{{$t('transfer_share')}}</span>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col sm="6" cols="12" class="pt-0">
                            <v-btn to="" color="third" class="rounded-0 col-sm-12" style="height: 45px !important;">
                                <span class="font_12 white--text text-capitalize">{{$t('issue_new_share')}}</span>
                            </v-btn>
                        </v-col>
                        <v-col sm="6" cols="12" class="pt-0">
                            <v-btn to="" color="primary" class="rounded-0 col-sm-12" style="height: 45px !important;">
                                <span class="font_11 white--text text-capitalize">{{$t('record_of_dividend_drawing')}}</span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" sm="12" class="py-0">
            <h3 class="mb-0 black--text">{{$t('shareholder')}}</h3>
            <p class="mb-0">{{$t('shareholder_name_their_shareholding')}}</p>
            <v-row>
                <v-col cols="12" sm="6" class="pb-0">
                    <template>
                        <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th class="whiteGreen">{{$t('name')}} </th>
                                    <th class="whiteGreen">{{$t('no_of_share')}} </th>
                                    <th class="whiteGreen">{{$t('type')}} </th>
                                    <th class="whiteGreen">%</th>
                                    <th class="whiteGreen">{{$t('action')}}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="text-bold">ABCC</td>
                                    <td>JB00009</td>
                                    <td>15/July/2020</td>
                                    <td>01</td>
                                    <td>JB00009</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                </v-col>
                <v-col cols="12" sm="6" class="py-0">
                    <v-card outlined dense class="pa-4 mt-3 no_border " color="grayBg" height="">
                        <template>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>{{$t('date')}} </th>
                                        <th>{{$t('type')}} </th>
                                        <th>{{$t('amount')}} </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>01</td>
                                        <td>JB00009</td>
                                        <td>15/July/2020</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
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
    .theme--light.v-data-table{
        background-color: transparent !important;
    }
</style>