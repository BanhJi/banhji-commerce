<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <div class="reports_list">
                        <h2>{{$t('Loan_monitoring')}}</h2>
                        <v-icon
                                onclick="window.history.go(-1); return false;"
                                style="cursor: pointer; color: #333; font-size: 40px;"
                                class="float-right"
                        >close
                        </v-icon>

                        <div class="report_filter">
                            <v-row>
                                <v-col sm="10" cols="12" class="pb-1">
                                    <v-row>
                                        <v-col sm="3" cols="12" class="py-0">
                                            <label class="label ">{{$t('as_of')}}</label>
                                            <app-datepicker :initialDate="as_of_date" @emitDate="as_of_date = $event"/>
                                        </v-col>
                                        <v-col sm="2" cols="12" class="dv_mt py-0">
                                            <v-btn class="btn_run_report" @click="search">
                                                {{$t('run_report')}}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col sm="2" cols="12">
                                    <div class="report_export">
                                        <p class="mb-1">{{$t('export_as')}}:</p>
                                        <i class="fa fa-print" style="font-size:34px; padding-right:6px;"
                                           aria-hidden="true"/>
                                        <i class="fa fa-file-excel" style="font-size:34px;padding-right:6px;"
                                           aria-hidden="true"/>
                                        <i class="fa fa-file-pdf" style="font-size:34px;padding-right:6px;"
                                           aria-hidden="true"/>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                        <!-- loading -->
                        <LoadingMe
                                :isLoading="compeletLoading"
                                :fullPage="false"
                                :myLoading="true"/>

                        <div class="report_block">
                            <v-row>
                                <v-col sm="6" cols="12">
                                    <v-row>
                                        <v-col sm="7" cols="12">
                                            <v-card class="pa-3 third rounded-0" style="min-height: 100px">
                                                <p class="text text-uppercase">{{$t('no_of_loans')}}</p>
                                                <p class="number text-right">200 </p>
                                            </v-card>
                                        </v-col>
                                        <v-col sm="5" cols="12">
                                            <v-card class="pa-3 third rounded-0" style="min-height: 100px">
                                                <p class="text text-uppercase">{{$t('average_interest_rate')}}</p>
                                                <p class="number">15%</p>
                                            </v-card>
                                        </v-col>

                                    </v-row>
                                </v-col>
                                <v-col sm="6" cols="12" class="mt-3">
                                    <v-card class="pa-3 third rounded-0">
                                        <p class=" float-left mb-0 text-uppercase">{{$t('outstanding_balance')}}</p>
                                        <p class=" float-right mb-0">200 </p>
                                    </v-card>
                                    <v-card class="pa-3 third mt-3 rounded-0">
                                        <p class=" float-left mb-0 text-uppercase">{{$t('avaiable_credit')}}</p>
                                        <p class=" float-right mb-0">200</p>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </div>
                        <div class="reports_table">
                            <template>
                                <v-simple-table class="attachment_table">
                                    <template v-slot:default>
                                        <thead>
                                        <tr>
                                            <th>{{$t('number')}}</th>
                                            <th>{{$t('nature_of_debt')}}</th>
                                            <th>{{$t('financial_institution')}}</th>
                                            <th>{{$t('approved_amount')}}</th>
                                            <th>{{$t('outstanding_balance')}}</th>
                                            <th>{{$t('available_credit')}}</th>
                                            <th>{{$t('interest_rate')}}</th>
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
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    import LoadingMe from '@/components/Loading'
    import DatePickerComponent from '../../components/custom_templates/DatePickerComponent'

    export default {
        name: "LoanMonitoring",
        components: {
            'LoadingMe': LoadingMe,
            'app-datepicker': DatePickerComponent,
        },

        data: () => ({
            as_of_date: new Date().toISOString().substr(0, 10),
            compeletLoading: false
        }),
        methods: {
            search() {

            }

        }
    };
</script>
<style scoped>
    .reports_list {
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
	.attachment_table table tr th{
		height: 55px !important;
	}
    @media (max-width: 576px) {
        .dv_mt,
        .dv_mt8 {
            margin-top: 0;
        }

        .reports_list {
            margin-top: 0;
        }
    }
</style>