<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-4 px-4">
            <!-- <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="6" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{$t('monthly_tax_balance')}}</h2>
                            <p class="mb-0">{{$t('for_the_month_of')}}: <span class="text-bold">March 2021</span></p>
                        </v-col>
                        <v-col sm="6" cols="12" class="py-0 d-flex justify-end hide_form_alert">
                            <div class="d-flex">
                                <month-picker :initialMonth="end_date" @emitMonth="end_date = $event" :min="start_date"/>
                                <v-btn class="ma-1 ml-2" color="primary white--text text-capitalize" @click="onSearch">
                                    {{$t('view')}}
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row> -->
            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-bold text-uppercase">{{ $t('type_of_tax_to_be_declared') }}</th>
                                    <th class="text-bold text-uppercase">{{ $t('credit_carried_forward_refund') }}</th>
                                    <th class="text-bold text-uppercase ">{{$t('tax_amount_to_be_paid')}}</th>
                                    <th class="text-bold text-uppercase">%</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1 {{$t('tax_on_salary')}}</td>
                                <td class="grayBg"></td>
                                <td class="text-right">{{ numberFormat(amountTaxSalaries) }}</td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td>2 {{$t('tax_fringe_benefit')}}</td>
                                <td class="grayBg"></td>
                                <td class="text-right">{{ numberFormat(amountBenefits) }}</td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td>3 {{$t('withholding_tax')}}</td>
                                <td class="grayBg"></td>
                                <td class="text-right">{{ numberFormat(amountWhts) }}</td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td>4 {{$t('value_tax_vat')}}</td>
                                <td class="text-center">{{ numberFormat(balanceVATs.credit) }}</td>
                                <td class="text-right">{{ numberFormat(balanceVATs.payment) }}</td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td>5 {{$t('payment_tax_income')}}</td>
                                <td class="text-center">{{ numberFormat(amountPPIs.credit) }}</td>
                                <td class="text-right">{{ numberFormat(amountPPIs.balance) }}</td>
                                <td class=""></td>
                            </tr>

                            <tr>
                                <td>6 {{$t('specific_tax_merchandize_service')}}</td>
                                <td class="grayBg"></td>
                                <td class="text-right">{{ numberFormat(otherAmounts.totalSp) }}</td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td>7 {{$t('accommodation_tax')}}</td>
                                <td class="grayBg"></td>
                                <td class="text-right">{{ numberFormat(otherAmounts.totalAccomTax) }}</td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td>8 {{$t('public_for_lighting_tax')}}</td>
                                <td class="grayBg"></td>
                                <td class="text-right">{{ numberFormat(otherAmounts.totalPl) }}</td>
                                <td class=""></td>
                            </tr>
                           <tr>
                                <td>9 {{$t('other_taxes')}}</td>
                                <td class="grayBg"></td>
                                <td class="text-right">{{ numberFormat(otherTax) }}</td>
                                <td class=""></td>
                            </tr>
                             <tr>
                                <td class="third white--text text-uppercase text-bold">{{ $t('total') }}</td>
                                <td class="third white--text"></td>
                                <td class="third white--text text-right">{{ numberFormat(totalAmountPaid) }}</td>
                                <td class="third white--text"></td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script src="./_summary.js" lang="js"></script>
<style scoped>
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.primary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: #f44336 !important;
    }

    .theme--light.v-data-table {
        background-color: transparent !important;
        border-top: thin solid #ddd;
        border-bottom: thin solid #ddd;
        border-radius: 0 !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
        font-size: 14px;
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
        height: 37px !important;
        color: #000;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
        border-bottom: thin solid #ddd;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }

    .v-application .primary,
    .v-application .third {
        border-color: #fff !important;
    }

    .amount {
        text-align: right !important;
    }
    .head-summary {
        text-align: right !important;
    }
</style>



