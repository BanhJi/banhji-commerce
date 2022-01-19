<template>
    <v-row class="mx-3 white">
        <v-col sm="12" cols="12">
            <v-simple-table>
                <template>
                    <tbody>
                        <tr>
                            <td width="230" class="text-uppercase">{{$t('account_name')}}</td>
                            <td class="text-left text-bold">{{ bankAccount.name }}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('account_no')}}</td>
                            <td class="text-left text-bold">{{ bankAccount.number }}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('bank_account_type')}}</td>
                            <td class="text-left text-bold" v-if="bankAccount.bank_account_type">{{ bankAccount.bank_account_type.name }}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('financial_institutions')}}</td>
                            <td class="text-left text-bold">{{ bankAccount.bank ? bankAccount.bank.name : '' }}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('currency')}}</td>
                            <td class="text-left text-bold">{{ bankAccount.currency ? bankAccount.currency.code : '' }}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('linked_chart_of_account')}}</td>
                            <td class="text-left text-bold">{{ bankAccount.account ? bankAccount.account.number : '' }} {{ bankAccount.account ? bankAccount.account.name : '' }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>

        <v-col sm="12" cols="12">
            <v-simple-table >
                <template v-slot:default>
                    <tbody>
                    <tr class=" text-bold">
                        <td class="secondary text-uppercase white--text">{{$t('balance_in_banhji')}}</td>
                        <td class="secondary white--text text-right">{{ Number(banhjiBalance).toLocaleString() }}</td>
                    </tr>
                    <tr class="third text-bold">
                        <td class="text-uppercase  white--text">{{$t('balance_in_bank')}}</td>
                        <td class="white--text text-right">{{ Number(bankBalance).toLocaleString() }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{$t('number_of_items_to_be_reconciled')}}</td>
                        <td class="primary--text text-right text-bold">{{ Number(reconcileItem).toLocaleString() }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{$t('bank_feed_connection')}}</td>
                        <td class="primary--text text-right text-uppercase text-bold">{{ bankFeedConnection }}</td>
                    </tr>

                    </tbody>
                </template>
            </v-simple-table>
        </v-col>

        <v-col sm="12" cols="12" class="py-0 pb-3">
            <v-row>
                <v-col sm="12" cols="12" class="py-0">
                    <v-btn @click="goEdit" width="100" color="primary" class=" white--text float-right text-capitalize">
                        {{$t('edit')}}
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import Helper from "@/helper.js";
// import { BankAccountModel } from "@/scripts/model/AppModels";
import BankAccountModel from "@/scripts/model/banking/BankAccount.js";

export default {
    name: "BankAccountInfo",
    props: {
        initBankAccount: {
            type: Object,
        },
    },
    data () {
        return {
            bankAccount         : new BankAccountModel(),
            banhjiBalance       : 0,
            bankBalance         : 0,
            reconcileItem       : 0,
            bankFeedConnection   : "Not Connect"
        }
    },
    methods: {
        goEdit () {
            if (this.bankAccount.uuid !== '') {
                this.$router.push({ path: `bank_account/${this.bankAccount.uuid}` });
            }
        },
    },
    watch: {
        initBankAccount () {
            this.bankAccount = this.initBankAccount;
            this.bankAccount.bankAccountType = Helper.getBankAccountTypeByUuid(this.bankAccount.bank_account_type_uuid);
        }
    },
}
</script>

<style scoped>
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: transparent !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.secondary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: #4d4848 !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: #898C8F !important;
    }
    .theme--light.v-data-table{
        background-color: transparent !important;
        border-top: thin solid rgba(0, 0, 0, 0.12) !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
        border-radius: 0 !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row){
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
        height: 32px !important;
    }
</style>