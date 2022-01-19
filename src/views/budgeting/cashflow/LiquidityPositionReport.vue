<template>
    <v-card color="white" class="pl-2 no_border" elevation="0">
        <v-row>
            <v-col sm="5" cols="12" class="py-0">
                <h3 class="text-left font_20 line_24">{{$t('liquidity_position_report')}}</h3>
                <p class="mb-3">{{$t('daily_liquidity_position_report')}}</p>
            </v-col>
            <v-col sm="4" cols="12" class="py-0">
                <v-row>
                    <v-col sm="7" cols="12" class="pb-0 paddingT">
                        <v-select dense
                                  class=""
                                  outlined
                                  :placeholder="$t('date')"
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
                    <v-simple-table class="simple_table nomal_table">
                        <template>
                            <thead>
                            <tr>
                                <th class="grayBg "></th>
                                <th class="grayBg ">{{$t('day_month')}}</th>
                                <th class="grayBg ">{{$t('day_month')}}</th>
                                <th class="grayBg ">{{$t('changes')}}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="">{{$t('cash_cash_equivalents_position')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('cash_receipt_from_all_sources')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('cash_disbursements_to_all_type_of_disbursement')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('cash_balance')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('receivables')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('credit_sale_total_invoices')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('collections_cash_bank_transfer_and_cheque')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('written_off')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('receivable_balance')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('payables')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('credit_purchases')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('payments_to_settle_payables')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('payments_balance')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('inventories')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('purchase_including_both_credit_and_cash_purchases')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('sold')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('written_off_return')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('inventory_balance')}}</td>
                                <td class=""></td>
                                <td class=""></td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td class="">{{$t('credit_availability')}}</td>
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

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th{
    border-bottom: none !important;
    border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th:last-child{
    border-right: none !important;
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
@media (max-width: 576px) {
    .paddingT{
        padding-top: 0 !important;
    }
}
</style>