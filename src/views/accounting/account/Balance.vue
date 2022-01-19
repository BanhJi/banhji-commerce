<template>
    <v-row class="mx-3 white">
        <v-col sm="12" cols="12">
            <p class="mb-0">{{$t('following_current_fiscal')}}</p>
            <v-simple-table>
                <template>
                    <thead>
                        <tr>
                            <th class="text-uppercase whiteGreen text-bold">{{ $t('month_of') }}</th>
                            <th class="text-uppercase whiteGreen text-bold">{{ $t('balance') }}</th>
                            <th class="text-uppercase whiteGreen text-bold">{{ $t('adjusted_balance') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-uppercase">JAN 2020</td>
                            <td class="text-left "></td>
                            <td class="text-left "></td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">FEB 2020</td>
                            <td class="text-left "></td>
                            <td class="text-left "></td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">MAR 2020</td>
                            <td class="text-left "></td>
                            <td class="text-left "></td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">APR 2020</td>
                            <td class="text-left "></td>
                            <td class="text-left "></td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">MAY 2020</td>
                            <td class="text-left "></td>
                            <td class="text-left "></td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">JUN 2020</td>
                            <td class="text-left text-bold"></td>
                            <td class="text-left text-bold"></td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">JUL 2020</td>
                            <td class="text-left "></td>
                            <td class="text-left "></td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">AUG 2020</td>
                            <td class="text-left "></td>
                            <td class="text-left "></td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">SEP 2020</td>
                            <td class="text-left "></td>
                            <td class="text-left "></td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">OCT 2020</td>
                            <td class="text-left "></td>
                            <td class="text-left "></td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: "BankAccountInfo",
    props: {
        initBankAccount: {
            type: Object,
        },
    },
    data () {
        return {
            bankAccount         : {},
            banhjiBalance       : 0,
            bankBalance         : 0,
            reconcileItem       : 0,
            bankFeedConnection   : "Not Connect"
        }
    },
    methods: {
        goEdit () {
       
        },
    },
    watch: {
    },
}
</script>
<style scoped>
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: transparent !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.primary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: #f44336 !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: #212a35 !important;
    }
    .theme--light.v-data-table{
        background-color: transparent !important;
        border-top: thin solid #000;
        border-bottom: thin solid #000;
        border-radius: 0 !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row){
        border-bottom: thin solid #000;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
        height: 32px !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
        border-bottom: thin solid #000 !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        color: #000 !important;
    }
</style>