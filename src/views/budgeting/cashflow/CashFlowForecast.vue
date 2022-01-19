<template>
    <v-card color="white" class="pl-2 no_border" elevation="0">
        <v-row>
            <v-col sm="8" cols="12" class="py-0">
                <h3 class="text-left font_20 line_24">{{$t('cash_flow_forecast')}}</h3>
                <p class="mb-3">{{$t('the_following_cash_flow')}}</p>
            </v-col>
            <v-col sm="4" cols="12" class="py-0">
                <p class="mb-0 niradei_bold text-right">Tuesday, 20 April 2021 3:22 PM</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col sm="12" cols="12" class="pt-1">
                <template>
                    <v-simple-table class="simple_table">
                        <template>
                            <thead>
                            <tr>
                                <th class="grayBg text-uppercase">{{$t('account')}}</th>
                                <th class="grayBg text-uppercase">{{$t('total')}}</th>
                                <th class="grayBg text-uppercase">%</th>
                                <th class="grayBg text-uppercase">{{$t('jan')}} 21</th>
                                <th class="grayBg text-uppercase">{{$t('feb')}} 21</th>
                                <th class="grayBg text-uppercase">{{$t('mar')}} 21</th>
                                <th class="grayBg text-uppercase">{{$t('apr')}} 21</th>
                                <th class="grayBg text-uppercase">{{$t('may')}} 21</th>
                                <th class="grayBg text-uppercase">{{$t('jun')}} 21</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="text-uppercase">{{$t('cash_receipt')}}</td>
                                <td class="grayBg"></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{$t('expected_due')}}</td>
                                <td class="grayBg"></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{$t('cash_sale')}}</td>
                                <td class="grayBg"></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('total_cash_receipts')}}</td>
                                <td class="grayBg"></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{$t('cash_payments')}}</td>
                                <td class="grayBg"></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{$t('amount_to_pay_payable')}}</td>
                                <td class="grayBg"></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{$t('budgeted_payments')}}</td>
                                <td class="grayBg"></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('total_cash_payments')}}</td>
                                <td class="grayBg"></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{$t('net_cash_flow')}}</td>
                                <td class="grayBg"></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{$t('cash_balance')}}</td>
                                <td class="grayBg"></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{$t('forecasted_cash_balance')}}</td>
                                <td class="grayBg"></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{$t('available_credits')}}</td>
                                <td class="grayBg"></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{$t('loan_no')}}</td>
                                <td class="grayBg"></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('total_available_credit')}}</td>
                                <td class="grayBg"></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </template>
                <p class="my-3">{{$t('importance_notice')}}</p>
                <ul>
                    <li>
                        <span class="niradei_bold">
                            {{$t('expect_due_and_amount_to_be_paid')}} -
                        </span>
                        {{$t('if_the_amounts_are_not')}}
                    </li>
                    <li>
                        <span class="niradei_bold">
                            {{$t('budgeted_amounts')}}
                        </span>
                        {{$t('will_be_based_on_the_same_month_and_year')}}
                    </li>
                    <li>
                        <span class="niradei_bold">
                            {{$t('cash_balance')}}
                        </span>
                        {{$t('is_based_on_the_data_from')}}
                    </li>
                </ul>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    components:{
    },
    data: () => ({
    }),
    computed: {
    },
};
</script>
<style scoped>
.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}
.v-data-table.simple1_table.theme--light,
.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}
.v-data-table.simple_table.theme--light{
    border-left: thin solid rgba(0, 0, 0, 0.12) !important;
    border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table.simple1_table > .v-data-table__wrapper > table > thead > tr:last-child > th:last-child{
    border-right: none !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.border-bottom {
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.font-small {
    font-size: 12px;
    line-height: 15px;
}

.font-26 {
    font-size: 26px !important;
}
.v-data-table.simple_table.theme--light{
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th{
    border-bottom: none !important;
    border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:last-child,
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:last-child,
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:last-child{
    border-right: none !important;
}


.v-data-table.table_list > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    border-right: none !important;
}
.v-data-table.table_list.theme--light > .v-data-table__wrapper > table > tbody > tr:first-child > td{
    border-top: none !important;
}
ul, ul li {
    list-style-type: disc !important;
    margin: 0 0 0 15px;
    padding: 0 !important;
}

@media (max-width: 576px) {

}
</style>