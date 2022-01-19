<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="px-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="10" cols="12"  class="pb-0">
                        <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                        :initEndDate="endDate" @emitEndDate="endDate = $event" />
                    </v-col>
                    <v-col sm="2" cols="12"  class="pb-0">
                        <v-btn class="mt-1" color="primary white--text">
                            <i class="b-search" style="font-size: 18px; color:#fff"/>
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
                            {{ $t("no_of_expenses") }}
                        </h3>
                        <h3 class="text-right flex-1 font_20">000</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0 px-2">
                        <v-card
                            outlined
                            dense
                            class="pa-3 no_border white--text"
                            color="third"
                            height="60px"
                            >
                            <h3 class="text-left font_13 flex-1 text-uppercase">
                                {{ $t("total_expenses") }}
                            </h3>
                            <h3 class="text-right flex-1 font_20">000</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card
                            outlined
                            to="order"
                            dense
                            color="third"
                            class="pa-3 rounded-4 no_border white--text"
                            height="60px"
                            >
                            <h3 class="text-center flex-1 font_20 mt-2 text-uppercase">
                                + {{ $t("new") }}
                            </h3>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
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

    export default {
        components: {
            "LoadingMe": () => import('@/components/Loading'),
            'app-searchdate': () => import('@/components/custom_templates/SearchDate'),
        },
        data: () => ({
            // Obj
            accounts: [],
            startDate      : "",
            endDate        : "",
            headers: [
                {
                    text: i18n.t("number"),
                    value: 'account.number',
                },
                { text: i18n.t("name"), value: 'account.name' },
                { text: i18n.t("type"), value: 'account.account_type.name' },
                { text: i18n.t("group"), value: 'account.account_group.name' },
                { text: i18n.t("gl_balance"), value: 'balance', align: 'right' },
            ],            
            // LoadingMe
            showLoading: false,
            loadingAlert: false,
            loadingColorAlert: "",
            loadingTextAlert: "",
        }),
        methods: {
            loadData(){
                this.showLoading = true;
                trialBalanceHandler.getTrialBalance({
                    params : {
                        as_of_date: kendo.toString(new Date(), 'yyyy-MM-dd') + 'T23:59:59.999Z',
                        include_0_balance: true
                    }
                }).then(res => {
                    if (res.data) {
                        // Bind data
                        this.accounts = res.data.tbdetails;
                    }
                }).finally(()=>{
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
</style>