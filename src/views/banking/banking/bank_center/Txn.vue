<template>
    <v-row class="mx-3 white">
        <v-col sm="12" cols="12">
            <v-row>
                <v-col sm="10" cols="12" class="py-0">
                    <app-searchdate :initStartDate="start_date" @emitStartDate="start_date = $event"
                                    :initEndDate="end_date" @emitEndDate="end_date = $event" />
                </v-col>

                <v-col sm="1" cols="12" class="pb-0">
                    <v-btn class="btn_search" @click="searchTransaction"
                           style="background-color: rgb(237, 241, 245)">
                        <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>

        <v-col sm="12" cols="12" class="pt-0">
            <v-data-table
                    :headers="headers"
                    :items="journalEntriesDetails"
                    class="elevation-1"
            >
                <!-- Journal Date -->
                <template v-slot:[`item.journal_date`]="{ item }">
                    <span>{{ Helper.dateFormat(item.journal_date) }}</span>
                </template>

                <!-- Journal Number as Link -->
                <template v-slot:[`item.journal_number`]="{ item }">
                    <div v-if="item.referral_transaction_uuid !== ''">
                        <router-link :to="`${item.transaction_type}/view/${item.referral_transaction_uuid}`">
                            <v-chip class="ma-2" color="primary" text-color="primary" outlined>{{ item.journal_number }}</v-chip>
                        </router-link>
                    </div>
                    <div v-else>
                        <router-link :to="`journal/view/${item.id}`">
                            <v-chip class="ma-2" color="primary" text-color="primary" outlined>{{ item.journal_number }}</v-chip>
                        </router-link>
                    </div>
                </template>
            </v-data-table>
        </v-col>


    </v-row>
</template>
<script>
    import kendo from '@progress/kendo-ui'
    import {i18n} from '@/i18n'
    import SearchDateComponent from '@/components/custom_templates/SearchDate'
    import Helper from "@/helper.js"
    import { journalHandler } from "@/scripts/AppHandlers"

    export default {
        name: "Txn",
        props: {
            initBankAccount: {
                type: Object,
            },
        },
        components: {
            'app-searchdate': SearchDateComponent,
        },
        data: () => ({
            Helper: Helper,
            start_date: "",
            end_date: "",
            // LoadingMe
            showLoading: true,
            isLoaded: false,
            headers: [
                {text: i18n.t('date'), value: 'journal_date'},
                {text: i18n.t('type'), value: 'transaction_type'},
                {text: i18n.t('number'), value: 'journal_number'},
                {text: i18n.t('description'), value: 'description'},
                {text: i18n.t('amount'), value: 'amount'},
            ],
            journalEntriesDetails : [],
        }),
        methods: {
            // Search Transaction
            searchTransaction() {
                let self = this,
                    ba = this.initBankAccount,
                    sdate = this.start_date,
                    edate = this.end_date

                this.journalEntriesDetails = []

                if (ba.uuid) {
                    if (sdate && edate) {
                        sdate = kendo.toString(new Date(sdate), 'yyyy-MM-dd') + 'T00:00:00.000Z'

                        edate = new Date(edate)
                        edate = kendo.toString(edate, 'yyyy-MM-dd') + 'T23:59:59.999Z'
                    } else {
                        sdate = 0
                        edate = 0
                    }

                    this.isLoaded = true
                    this.showLoading = true
                    journalHandler.getEntryDetailByAccount(ba.account.uuid, {
                        params: {
                            start_date: sdate,
                            end_date: edate,
                        }
                    })
                        .then(res => {
                            if (res) {
                                this.journalEntriesDetails = res.entries_detail
                            }
                        })
                        .finally(function () {
                            self.showLoading = false
                        })
                }
            },
        },
        watch: {
            initBankAccount : "searchTransaction"
        },
        mounted() {
            // Load Data
            if(this.initBankAccount){
                this.searchTransaction()
            }
        }
    };
</script>
<style scoped>
</style>