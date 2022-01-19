<template>
    <v-row>
        <v-col cols="12" sm="12">
            <!-- loading -->
            <LoadingMe
                    :isLoading="compeletLoading"
                    :fullPage="false"
                    :myLoading="true">
            </LoadingMe>

            <v-row >
                <v-col sm="5" cols="12" class="pb-0">
                    <h2 class="mb-0">{{$t('order_to_cash_')}}</h2>
                    <v-card outlined dense class="px-2 py-1 no_border mb-2 white--text" color="primary" height="52px">
                        <v-row style="font-size: 13px">
                            <v-col sm="4" cols="12" class="py-0">
                                <span class="float-left text-uppercase">
                                    {{$t('delivery_invoice_ratio')}}
                                </span>
                            </v-col>
                            <v-col sm="2" cols="12" class="py-0 d-flex align-center justify-center" >
                                <span style="font-size: 20px" class="float-left text-bold ">90%</span>
                            </v-col>
                            <v-col sm="4" cols="12" class="py-0">
                                <span class="float-left ">{{$t('sale_order_invoice_ratio')}}</span>
                            </v-col>
                            <v-col sm="2" cols="12" class="py-0 d-flex align-center justify-center" >
                                <span style="font-size: 20px" class="float-left text-bold">90%</span>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card outlined dense class="px-2 py-1 no_border mb-2 white--text" color="primary" height="52px">
                        <v-row style="font-size: 13px">
                            <v-col sm="4" cols="12" class="py-0">
                                <span style="font-size: 12px" class="float-left text-uppercase">
                                    {{$t('num_of_customer_over_credit_limit')}}
                                </span>
                            </v-col>
                            <v-col sm="2" cols="12" class="py-0 d-flex align-center justify-center" >
                                <span style="font-size: 20px" class="float-left text-bold ">10</span>
                            </v-col>
                            <v-col sm="4" cols="12" class="py-0">
                                <span class="float-left ">{{$t('its_receivable_balance')}}</span>
                            </v-col>
                            <v-col sm="2" cols="12" class="py-0 d-flex align-center justify-center" >
                                <span style="font-size: 20px" class="float-left text-bold">10%</span>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card outlined dense class="px-2 py-1 no_border mb-2 white--text" color="primary" height="52px">
                        <v-row style="font-size: 13px">
                            <v-col sm="4" cols="12" class="py-0">
                                <span style="font-size: 11px" class="float-left text-uppercase">
                                    {{$t('the_most_payment_team_used')}}
                                </span>
                            </v-col>
                            <v-col sm="2" cols="12" class="py-0 d-flex align-center justify-center" >
                                <span style="font-size: 20px" class="float-left text-bold ">N30</span>
                            </v-col>
                            <v-col sm="4" cols="12" class="py-0">
                                <span class="float-left ">{{$t('its_aging')}}</span>
                            </v-col>
                            <v-col sm="2" cols="12" class="py-0 d-flex align-center justify-center" >
                                <span style="font-size: 20px" class="float-left text-bold">35</span>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card outlined dense class="px-2 py-1 no_border mb-2 white--text" color="third" height="52px">
                        <v-row style="font-size: 13px">
                            <v-col sm="4" cols="12" class="py-0">
                                    <span style="font-size: 11px" class="float-left text-uppercase">
                                        {{$t('average_collection_day')}}
                                    </span>
                            </v-col>
                            <v-col sm="2" cols="12" class="py-0 d-flex align-center justify-center" >
                                <span style="font-size: 20px" class="float-left text-bold ">100</span>
                            </v-col>
                            <v-col sm="4" cols="12" class="py-0">
                                <span class="float-left ">{{$t('last_month_collection_day')}}</span>
                            </v-col>
                            <v-col sm="2" cols="12" class="py-0 d-flex align-center justify-center" >
                                <span style="font-size: 20px" class="float-left text-bold">110</span>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col sm="7" cols="12" >
                    <v-row>
                        <v-col sm="6" cols="12">
                            <v-card outlined dense class="pa-5 no_border" color="grayBg" height="230px">
                                <h3 class="text-left mb-3">{{$t('top_five_receivable_balance')}}</h3>
                                <template>
                                    <v-simple-table>
                                        <template v-slot:default>
                                            <tbody>
                                            <tr v-for="item in expected_due" :key="item.name">
                                                <td class="text-left">{{ item.name }} {{$t('weeks')}}</td>
                                                <td class="text-right text-bold">{{ item.calories }}</td>
                                            </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </template>
                            </v-card>
                        </v-col>
                        <v-col sm="6" cols="12">
                            <v-card outlined dense class="pa-5 no_border text-center" color="grayBg" height="230px">
                                <h3 class="text-center">{{$t('amount_to_pay')}}</h3>
                                <h2 class="primary--text">10,500</h2>
                                <template>
                                    <v-simple-table>
                                        <template v-slot:default>
                                            <tbody>
                                            <tr v-for="item in amount_to_pay" :key="item.name">
                                                <td class="text-left">{{ item.name }} {{$t('weeks')}}</td>
                                                <td class="text-right text-bold">{{ item.calories }}</td>
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
            <v-row>
                <v-col sm="10" cols="12" class="py-0">
                    <app-searchdate :initStartDate="start_date" @emitStartDate="start_date = $event"
                                    :initEndDate="end_date" @emitEndDate="end_date = $event" />
                </v-col>

                <v-col sm="1" cols="1" class="">
                    <v-btn class="btn_search"  style="background-color: rgb(237, 241, 245)">
                        <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row >
                <v-col sm="12" cols="12" class="py-0">
                    <template>
                        <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>{{$t('name')}} </th>
                                    <th>{{$t('type')}} </th>
                                    <th>{{$t('number')}} </th>
                                    <th>{{$t('description')}} </th>
                                    <th>{{$t('status')}} </th>
                                    <th>{{$t('amount')}} </th>
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
    import LoadingMe from '@/components/Loading'
    // import BankConnection from '@/components/BankConnection'
    import SearchDateComponent from '@/components/custom_templates/SearchDate'

    export default {
        name: "Receivable",
        components: {
            LoadingMe,
            'app-searchdate': SearchDateComponent,
            // BankConnection,
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
            amount_to_pay: [
				{
					name: '<',
					calories: 500,
				},
				{
					name: '1 – 2',
					calories: '3,000',
				},
				{
					name: '> 2 ',
					calories: '2,000',
				},
            ],
            expected_due: [
				{
					name: 'Compnay A',
					calories: 500,
				},
				{
					name: 'Compnay B',
					calories: '3,000',
				},
				{
					name: 'Compnay C',
					calories: '2,000',
                },
                {
					name: 'Compnay D',
					calories: '3,000',
				},
				{
					name: 'Compnay E',
					calories: '2,000',
				},
			],
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
    .theme--light.v-data-table{
        background-color: transparent !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: transparent !important;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
        height: 32px !important;
    }
    .attachment_table table tr th {
        height: 55px !important;
    }
</style>