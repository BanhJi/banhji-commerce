<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <div class="reports_list pt-3">
                        <h2>{{ $t('chart_of_account') }}</h2>
                        <v-icon
                            onclick="window.history.go(-1); return false;"
                            style="cursor: pointer; color: #333; font-size: 40px;"
                            class="float-right"
                        >close
                        </v-icon>

                        <div class="report_filter">
                            <v-row>
                                <v-col sm="10" cols="12">
                                    <v-row>
<!--                                        <v-col sm="5" cols="12" class="py-0">-->
<!--                                            <label-->
<!--                                                class="label text-uppercase float-left pt-5 pr-3">{{-->
<!--                                                    $t('as_of')-->
<!--                                                }}</label>-->
<!--                                            <DatePickerComponent :initialDate="asOfDate" @emitDate="asOfDate = $event"/>-->
<!--                                        </v-col>-->
<!--                                        <v-col sm="2" cols="12" class="pt-3 py-0">-->
<!--                                            <v-btn class="white&#45;&#45;text" color="primary">-->
<!--                                                {{ $t('run_report') }}-->
<!--                                            </v-btn>-->
<!--                                        </v-col>-->

                                        <v-col sm="1" cols="12" class="pt-3 py-0">
                                            <downloadexcel
                                                icon
                                                color="black"
                                                class="bg-none float-right "
                                                :data="accounts"
                                                :fields="exfield"
                                                type="xls"
                                                worksheet="COA"
                                                name="ChartOfAccount.xls">
                                                <v-icon class="font_34"
                                                        style="color: black;margin-top: 3px;margin-left: 10px;">fa
                                                    fa-file-excel
                                                </v-icon>
                                            </downloadexcel>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <!-- <v-col sm="2" cols="12" >
                                    <div class="report_export">
                                        <p class="mb-1">{{$t('export_as')}}:</p>
                                        <i class="fa fa-print" style="font-size:34px; padding-right:6px;" aria-hidden="true"></i>
                                        <i class="fa fa-file-excel"  style="font-size:34px;padding-right:6px;"  aria-hidden="true"></i>
                                        <i class="fa fa-file-pdf" style="font-size:34px;padding-right:6px;" aria-hidden="true"></i>
                                    </div>
                                </v-col> -->
                            </v-row>
                        </div>

                        <div class="report_block">
                            <v-row>
                                <v-col sm="2" cols="12">
                                    <v-card color="third" class="pa-3 white--text rounded-0">
                                        <p class="text">{{ $t('no_of_account') }}</p>
                                        <p class="number">{{ Number(numberAccount).toLocaleString() }}</p>
                                    </v-card>
                                </v-col>
                                <v-col sm="2" cols="12">
                                    <v-card color="third" class="pa-3 white--text rounded-0">
                                        <p class="text">{{ $t('asset_accounts') }}</p>
                                        <p class="number">{{ Number(assetAccount).toLocaleString() }}</p>
                                    </v-card>
                                </v-col>
                                <v-col sm="2" cols="12">
                                    <v-card color="third" class="pa-3 white--text rounded-0">
                                        <p class="text">{{ $t('liability_accounts') }}</p>
                                        <p class="number">{{ Number(liabilityAccount).toLocaleString() }}</p>
                                    </v-card>
                                </v-col>
                                <v-col sm="2" cols="12">
                                    <v-card color="third" class="pa-3 white--text rounded-0">
                                        <p class="text">{{ $t('equity_account') }}</p>
                                        <p class="number">{{ Number(equityAccount).toLocaleString() }}</p>
                                    </v-card>
                                </v-col>
                                <v-col sm="2" cols="12">
                                    <v-card color="third" class="pa-3 white--text rounded-0">
                                        <p class="text">{{ $t('revenues_accounts') }}</p>
                                        <p class="number">{{ Number(revenueAccount).toLocaleString() }}</p>
                                    </v-card>
                                </v-col>
                                <v-col sm="2" cols="12">
                                    <v-card color="third" class="pa-3 white--text rounded-0">
                                        <p class="text">{{ $t('expenses_accounts') }}</p>
                                        <p class="number">{{ Number(expenseAccount).toLocaleString() }}</p>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </div>

                        <div class="reports_table">
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0">
                                    <v-data-table
                                        :headers="headers"
                                        :items="accounts"
                                        :items-per-page="50"
                                        sort-by="account.number"
                                        class="attachment_table elevation-1">

                                        <template v-slot:[`item.balance`]="{ item }">
                                            {{ Number(item.balance).toLocaleString() }}
                                        </template>

                                    </v-data-table>
                                </v-col>
                            </v-row>
                        </div>

                        <LoadingMe
                            :isLoading="showLoading"
                            :fullPage="false"
                            :myLoading="true"/>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import kendo from '@progress/kendo-ui';
import {i18n} from '@/i18n';
import downloadexcel from "vue-json-excel";

const {trialBalanceHandler} = require("@/scripts/AppHandlers");
const {NatureCode} = require("@/scripts/default_setup/Collections");

export default {
    name: 'ChartOfAccount',
    components: {
        'LoadingMe': () => import('@/components/Loading'),
        // 'DatePickerComponent': () => import('@/components/custom_templates/DatePickerComponent'),
        downloadexcel: downloadexcel
    },
    data: () => ({
        accounts: [],
        headers: [
            {
                text: i18n.t("number"),
                value: 'account.number',
            },
            {text: i18n.t("name"), value: 'account.name'},
            {text: i18n.t("type"), value: 'account.account_type.name'},
            {text: i18n.t("group"), value: 'account.account_group.name'},
            {text: i18n.t("gl_balance"), value: 'balance', align: 'right'},
        ],
        asOfDate: new Date().toISOString().substr(0, 10),
        numberAccount: 0,
        assetAccount: 0,
        liabilityAccount: 0,
        equityAccount: 0,
        revenueAccount: 0,
        expenseAccount: 0,
        // LoadingMe
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: "",
        loadingTextAlert: "",

        exfield: {
            'Number': 'account.number',
            'Name': 'account.name',
            'Type': 'account.account_type.name',
            'Group': 'account.account_group.name',
            'GL Balance': 'balance'
        },
    }),
    methods: {
        loadData() {
            this.showLoading = true;
            trialBalanceHandler.getTrialBalance({
                params: {
                    as_of_date: kendo.toString(new Date(this.asOfDate), 'yyyy-MM-dd') + 'T23:59:59.999Z',
                    include_0_balance: true
                }
            }).then(res => {
                if (res.data) {
                    // Bind data
                    this.accounts = res.data.tbdetails;

                    let assetAccount = 0,
                        liabilityAccount = 0,
                        equityAccount = 0,
                        revenueAccount = 0,
                        expenseAccount = 0;

                    this.accounts.forEach(value => {
                        switch (value.account.account_type.nature_code) {
                            case NatureCode.ASSET:
                                assetAccount++;
                                break;

                            case NatureCode.LIABILITY:
                                liabilityAccount++;
                                break;

                            case NatureCode.EQUITY:
                                equityAccount++;
                                break;

                            case NatureCode.REVENUE:
                                revenueAccount++;
                                break;

                            default:
                                expenseAccount++;
                                break;
                        }
                    });

                    this.numberAccount = this.accounts.length;
                    this.assetAccount = assetAccount;
                    this.liabilityAccount = liabilityAccount;
                    this.equityAccount = equityAccount;
                    this.revenueAccount = revenueAccount;
                    this.expenseAccount = expenseAccount;
                }
            }).finally(() => {
                this.showLoading = false;
            })
        }
    },
    mounted() {
        this.loadData();
    },
};
</script>

<style scoped>
.reports_list {
    width: 100%;
    background-color: #fff;
    padding: 20px 20px 5px;
}

.report_filter {
    background-color: #EDF1F5;
    padding: 0 20px 5px 20px;
    position: relative;
}

.report_export {
    position: absolute;
    top: 10px;
}

.dv_mt {
    margin-top: 20px;
}

.dv_mt8 {
    margin-top: 30px;
}

.report_block .v-card.third {
    border: none;
    box-shadow: none;
    color: #fff;
    text-transform: uppercase;
    min-height: 100px;
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

@media (max-width: 576px) {
    .dv_mt, .dv_mt8 {
        margin-top: 0;
    }

    .reports_list {
        margin-top: 0;
    }
}
</style>