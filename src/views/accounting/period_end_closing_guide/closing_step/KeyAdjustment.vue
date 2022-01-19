<template>
    <v-row>
        <v-col cols="12" sm="12" class="pt-0">
            <v-row>
            <v-col sm="8" class="py-0">
                <h2 class="mb-3 float-left primary--text text-uppercase">
                    {{ $t("adjustments") }}
                </h2>
                <p class="mb-0 float-left">
                    {{ $t("adjustment_desc") }}
                </p>
            </v-col>
            <v-col sm="4" class="py-0">
                <v-btn color="primary" class="white--text float-right text-capitalize" link to="period_end_closing">
                    {{ $t('new_journal') }}
                </v-btn>
            </v-col>
            <v-col sm="12" cols="12" class="py-0">
                <v-row>
                    <v-col sm="6" cols="12" class="py-0">
                        <template>
                            <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <tbody>
                                    <tr>
                                        <td>{{$t('a_r_aging_more_than_90_days')}}</td>
                                        <td class="primary--text text-bold">10</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('a_p_aging_more_than_90_days')}}</td>
                                        <td class="primary--text text-bold">20</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('opening_balance_equity')}}</td>
                                        <td class="primary--text text-bold">1</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('clearing_suspense_accounts_balance')}}</td>
                                        <td class="primary--text text-bold">2</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                </v-col>
                <v-col sm="6" cols="12" class="py-0">
                    <template>
                        <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <tbody>
                                <tr>
                                    <td>{{$t('change_made_earning')}}</td>
                                    <td class="primary--text text-bold">0</td>
                                </tr>
                                <tr>
                                    <td>{{$t('account_with_balance')}}</td>
                                    <td class="primary--text text-bold">2</td>
                                </tr>
                                <tr>
                                    <td>{{$t('depreciation_recorded_period')}}</td>
                                    <td class="primary--text text-bold">0</td>
                                </tr>
                                <tr>
                                    <td>{{$t('payment_transit_balance')}}</td>
                                    <td class="primary--text text-bold">10,000</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                </v-col>
                </v-row>
            </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
</script>
<style scoped>
    .attachment_table.v-data-table > .v-data-table__wrapper > table > thead > tr > th, .attachment_table.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        border-right: none !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }
</style>