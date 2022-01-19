<template>
    <v-row>
        <v-col sm="12" cols="12" class="">
            <v-card color="white" class="px-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="4" cols="12" class="py-0">
                        <app-datepicker :initialDate="asOfDate" @emitDate="asOfDate = $event" />
                    </v-col>
                    <v-col sm="2" cols="12" class="py-1">
                        <v-btn color="primary" class="text-capitalize white--text float-left" @click="search">
                            {{$t('view')}}
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row class="mt-0">
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card
                        outlined
                        dense
                        class="pa-3 no_border white--text"
                        color="primary"
                        height="60px"
                        >
                        <h3 class="text-left font_13 flex-1 text-uppercase">
                            {{ $t("no_of_accounts") }}
                        </h3>
                        <h3 class="text-right flex-1 font_20">10</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card
                        outlined
                        to="bank_account"
                        dense
                        color="primary"
                        class="pa-3 rounded-4 no_border white--text"
                        height="60px"
                        >
                        <h3 class="text-center flex-1 font_18 mt-2 text-uppercase">
                            + {{ $t("new") }}
                        </h3>
                        </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card
                        outlined
                        dense
                        class="pa-3 no_border white--text"
                        color="third"
                        height="60px"
                        >
                        <h3 class="text-left font_13 flex-1 text-uppercase">
                            {{ $t("total_bank_balances") }}
                        </h3>
                        <h3 class="text-right flex-1 font_20">000</h3>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row >
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <v-data-table
                                :headers="headers"
                                :items="accounts"
                                :items-per-page="50"
                                sort-by="account.number"
                                class="attachment_table elevation-0">

                                <template v-slot:[`item.balance`]="{ item }">
                                    {{ Number(item.balance).toLocaleString() }}
                                </template>

                                <template v-slot:[`item.connection`]="{ item }">
                                    {{ getStatus(item) }}
                                </template>

                            </v-data-table>

                        </template>

                        <LoadingMe 
							:isLoading ="showLoading" 
							:fullPage  ="false" 
							:myLoading ="true"/>

                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import kendo from '@progress/kendo-ui';
    import {i18n} from '@/i18n';
    
    const { trialBalanceHandler } = require("@/scripts/AppHandlers");
    // const { AccountTypeCode } = require("@/scripts/default_setup/Collections");

    export default {
        components: {
            "LoadingMe": () => import('@/components/Loading'),
            'app-datepicker': () => import('@/components/custom_templates/DatePickerComponent'),
        },
        data: () => ({
            // Obj
            accounts: [],
            headers: [
                { text: i18n.t("financial_institution"), value: 'account.bank_account.bank.name' },
                {
                    text: i18n.t("number"),
                    value: 'account.bank_account.number',
                    sortable: false,
                },
                { text: i18n.t("connection"), value: 'connection' ,   sortable: false,},
                { text: i18n.t("amount_in_bank") ,   sortable: false,},
                { text: i18n.t("gl_balance"), value: 'balance', align: 'right',   sortable: false, },
            ],
            asOfDate 		: new Date().toISOString().substr(0, 10),
            // LoadingMe
            showLoading: false,
            loadingAlert: false,
            loadingColorAlert: "",
            loadingTextAlert: "",
        }),
        methods: {
            search(){
                let asOfDate = new Date(this.asOfDate);

                this.showLoading = true;
                trialBalanceHandler.getTrialBalance({
                    params : {
                        as_of_date: kendo.toString(asOfDate, 'yyyy-MM-dd') + 'T23:59:59.999Z',
                        include_0_balance: true
                    }
                }).then(res => {
                    if (res.data) {
                        // Bind data
                        // this.accounts = res.data.tbdetails.filter(value => ~AccountTypeCode.BANKING_ACCOUNTS.indexOf(value.account.account_type.number));
                        let bankBalances = [];
                        res.data.tbdetails.forEach(value => {
                            if(value.account.bank_account){
                                if(value.account.bank_account.bank){
                                    bankBalances.push(value);
                                }
                            }
                        });
                        this.accounts = bankBalances;
                    }
                }).finally(()=>{
                    this.showLoading = false;
                })
            },
            // Get Connection Status In Word
            getStatus(item){
                if (item.account.bank_account)
                if (item.account.bank_account.is_connected === 1) return i18n.t("connected")
                else return i18n.t("not_connected")
            },
        },
        mounted() {
            this.search();
        },
    };
</script>

<style scoped>
    .theme--light.v-data-table {
        background-color: transparent !important;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 38px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        height: 48px !important;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
        border-top: thin solid rgba(0, 0, 0, 0.12) !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }
</style>