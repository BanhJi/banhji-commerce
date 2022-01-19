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
                    <h2 class="mb-0">{{$t('forecast_to_fulfill')}}</h2>
                    <v-card outlined dense class="pa-2 no_border mb-2 white--text card_receivable"  color="primary" height="90px">
                        <v-row>
                            <v-col sm="3" cols="12" class="py-0 text-center border-right">
                                <span class="text-uppercase">{{$t('show_moving')}}</span><br/>
                                <h3 class="text-bold mt-2">300</h3>
                            </v-col>
                            <v-col sm="3" cols="12" class="py-0 text-center border-right">
                                <span class="text-uppercase ">{{$t('turnover_days')}}</span><br/>
                                <h3 class="text-bold mt-2">90%</h3>
                            </v-col>
                            <v-col sm="6" cols="12" class="pb-0 text-center">
                                <span class="text-uppercase ">{{$t('inventory_value')}}</span><br/>
                                <h3 class="text-bold mt-2">200,000</h3>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card outlined dense class="px-2 py-1 no_border mb-2 white--text" color="primary" height="52px">
                        <v-row style="font-size: 13px">
                            <v-col sm="4" cols="12" class="py-0 d-flex align-center justify-center">
                                <span class="float-left text-uppercase">
                                    {{$t('stock_accuracy')}}
                                </span>
                            </v-col>
                            <v-col sm="4" cols="12" class="py-0 d-flex align-center justify-center" >
                                <span class="float-left text-bold ">{{$t('for_last_3_count')}}</span>
                            </v-col>
                            <v-col sm="4" cols="12" class="py-0 d-flex align-center justify-end" >
                                <span style="font-size: 20px" class="text-bold ">10%</span>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card outlined dense class="px-2 py-1 no_border mb-2 white--text d-flex align-center justify-center" color="third" height="52px">
                        <v-row style="font-size: 13px">
                            <v-col sm="6" cols="12" class="py-0">
                                    <span class="float-left text-uppercase">
                                        {{$t('average_payment_day')}}
                                    </span>
                            </v-col>
                            <v-col sm="6" cols="12" class="py-0 " >
                                <span style="font-size: 20px" class="float-right text-bold ">1,000,000</span>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col sm="7" cols="12">
                    <v-row>
                        <v-col sm="6" cols="12">
                            <v-card outlined dense class="pa-5 no_border text-center" color="grayBg" height="222px">
                                <h3 >{{$t('key_value_category')}}</h3>
                                <h2 class="primary--text">10</h2>
                                <v-row>
                                    <v-col cols="6">
                                        <h3 style="font-size: 30px" class="primary--text mb-2">100</h3>
                                        <p class="mb-0">{{$t('turnover_day')}}</p>
                                    </v-col>
                                    <v-col cols="6">
                                        <h3 style="font-size: 30px" class="primary--text mb-2">80%</h3>
                                        <p class="mb-0">{{$t('revenue_proportion')}}</p>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col sm="6" cols="12">
                            <v-card outlined dense class="pa-5 no_border text-center" color="grayBg" height="222px">
                                <h3>{{$t('key_value_category')}}</h3>
                                <h2 class="primary--text">5,500</h2>
                                <v-row>
                                    <v-col cols="6">
                                        <h3 style="font-size: 30px" class="primary--text mb-2">100</h3>
                                        <p class="mb-0">{{$t('turnover_day')}}</p>
                                    </v-col>
                                    <v-col cols="6">
                                        <h3 style="font-size: 30px" class="primary--text mb-2">80%</h3>
                                        <p class="mb-0">{{$t('revenue_proportion')}}</p>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="4" cols="12" class="py-0">
                    <v-select class="mt-1"
                            :items="dateSorters"
                            clearable
                            outlined
                            placeholder="ALL"
                    />
                </v-col>

                <v-col sm="3" cols="12" class="pb-0">
                    <app-datepicker :initialDate="start_date" @emitDate="start_date = $event"/>
                </v-col>

                <v-col sm="3" cols="12" class="pb-0">
                    <app-datepicker :initialDate="end_date" @emitDate="end_date = $event"/>
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
                                    <th>{{$t('categories')}} </th>
                                    <th>{{$t('group')}} </th>
                                    <th>{{$t('sub_group')}} </th>
                                    <th>{{$t('product')}} </th>
                                    <th>{{$t('variants')}} </th>
                                    <th>{{$t('uom')}} </th>
                                    <th>{{$t('qty')}} </th>
                                    <th>{{$t('cost')}} </th>
                                    <th>{{$t('amount')}} </th>
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
    import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'

    export default {
        name: "Receivable",
        components: {
            LoadingMe,
            'app-datepicker': DatePickerComponent,
            // BankConnection,
        },
        data: () => ({
            start_date: "",
            end_date: "",
            dialogm2: false,
            forwarded: 1000,
            dialogm3: false,
            dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
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
    .border-right {
        border-right: 1px solid #fff !important;
    }
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