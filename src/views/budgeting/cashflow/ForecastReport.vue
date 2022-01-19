<template>
    <v-card color="white" class="pl-2 no_border" elevation="0">
        <v-row>
            <v-col sm="5" cols="12" class="py-0">
                <h3 class="text-left font_20 line_24">{{$t('cash_flow_forecast_actual')}}</h3>
                <p class="mb-3">{{$t('a_detail_breakdown_of_budget_by_months')}}</p>
            </v-col>
            <v-col sm="4" cols="12" class="py-0">
                <v-row>
                    <v-col sm="7" cols="12" class="pb-0 paddingT">
                        <v-select dense
                                  class=""
                                  outlined
                                  :placeholder="$t('month_of')"
                        />
                    </v-col>
                    <v-col sm="2" cols="12" class="pb-0 paddingT">
                        <v-btn color="primary" class="text-capitalize white--text ">
                            {{$t('view')}}
                        </v-btn>
                    </v-col>
                </v-row>
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
                                <th class="grayBg text-uppercase">{{$t('forecast')}}</th>
                                <th class="grayBg text-uppercase">{{$t('actual')}}</th>
                                <th class="grayBg text-uppercase">{{$t('variance')}}</th>
                                <th class="grayBg text-uppercase">{{$t('variance_%')}}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="text-uppercase">{{$t('cash_receipt')}}</td>
                                <td class="grayBg"></td>
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
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{$t('cash_sale')}}</td>
                                <td class="grayBg"></td>
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
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{$t('cash_payments')}}</td>
                                <td class="grayBg"></td>
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
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{$t('budgeted_payments')}}</td>
                                <td class="grayBg"></td>
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
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{$t('net_cash_flow')}}</td>
                                <td class="grayBg"></td>
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
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{$t('forecasted_cash_balance')}}</td>
                                <td class="grayBg"></td>
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
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{$t('loan_no')}}</td>
                                <td class="grayBg"></td>
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
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </template>
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
    .paddingT{
        padding-top: 0 !important;
    }
}
</style>