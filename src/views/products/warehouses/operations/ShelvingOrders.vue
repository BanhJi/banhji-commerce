<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('shelving_order') }}</h2>
            <v-row class="">
                <v-col sm="9" cols="12" class="pt-0">
                    <v-row class="">
                        <v-col sm="4" cols="12" class="py-0">
                            <v-select class="mt-1"
                                      :items="dateSorters"
                                      @change="onSorterChanges"
                                      clearable
                                      outlined
                                      placeholder="ALL"
                            />
                        </v-col>

                        <v-col sm="3" cols="12" class="py-0">
                            <app-datepicker :initialDate="start_date" @emitDate="start_date = $event"/>
                        </v-col>

                        <v-col sm="3" cols="12" class="py-0">
                            <app-datepicker :initialDate="end_date" @emitDate="end_date = $event"/>
                        </v-col>

                        <v-col sm="1" cols="1" class="py-1">
                            <v-btn class="btn_search" @click="searchTransaction"
                                   style="background-color: rgb(237, 241, 245)">
                                <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col sm="3" cols="12" class="pt-0">
                    <v-btn to="shelving_order" color="primary"
                           class=" white--text float-right text-capitalize">
                        {{ $t('new_sh') }}
                    </v-btn>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <template>
                        <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>{{ $t('date') }}</th>
                                    <th>{{ $t('number') }}</th>
                                    <th>{{ $t('from_zone') }}</th>
                                    <th>{{ $t('products') }}</th>
                                    <th>{{ $t('status') }}</th>
                                    <th>{{ $t('action') }}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="sh in shilvingOrders" v-bind:key="sh.id">
                                    <td>{{ new Date(sh.date).toISOString().substr(0, 10) }}</td>
                                    <td>{{ sh.number }}</td>
                                    <td>{{ sh.itemLines[0].bin.name }}</td>
                                    <td>{{ sh.itemLines[0].item.name }}</td>
                                    <td></td>
                                    <td class="text-center">
                                        <v-btn class="bg-none">
                                            <v-icon size="17px" class="primary--text">fa fa-eye</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"/>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import kendo from "@progress/kendo-ui";
import LoadingMe from "@/components/Loading";

const shelvingOrderHandler = require("@/scripts/shelvingOrderHandler")
export default {
    data: () => ({
        showLoading: false,
        // Search transaction dates
        start_date: "",
        end_date: "",
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
        journal_entries: [],
        // COA sidebar
        searchText: '',
        accounts: [],
        accounts_bk: [],
        account_types: [],
        // Account information
        account: [],
        files: [],
        attachments: [],
        balance: 0,
        backdated: 0,
        forwarded: 0,
        // LoadingMe
        isLoaded: false,
        // Kendo dataSource
        schemaDefinition: {
            model: {id: "id"}
        },
        /* Sort by account number */
        sortDefinition: {field: "number"},
        // Group order by account_type_id asc
        groupDefinition: {
            field: "account_type.name",
            compare: function (a, b) {
                if (a.items[0].number === b.items[0].number) {
                    return 0;
                } else if (a.items[0].number > b.items[0].number) {
                    return 1;
                } else {
                    return -1;
                }
            }
        },

        shilvingOrders: [],
    }),
    props: {},
    methods: {
        async onloadShilvingOrder() {
            this.showLoading = true
            await shelvingOrderHandler.getAll().then(res => {
                this.shilvingOrders = res
                this.showLoading = false
            })
        },
        // On Sorter Changes
        onSorterChanges(val) {
            let today = new Date()

            switch (val) {
                case "Today":
                    this.start_date = kendo.toString(today, 'yyyy-MM-dd')
                    this.end_date = kendo.toString(today, 'yyyy-MM-dd')

                    break
                case "This Week":
                    var first = today.getDate() - today.getDay(),
                        last = first + 6;

                    this.start_date = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
                    this.end_date = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')

                    break
                case "This Month":
                    this.start_date = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                    this.end_date = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')

                    break
                case "This Year":
                    this.start_date = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
                    this.end_date = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')

                    break
                default:
                    this.start_date = "";
                    this.end_date = "";
            }
        },
        // Search Transaction
        searchTransaction() {
            let self = this,
                account = this.account,
                sdate = this.start_date,
                edate = this.end_date;

            if (account.id) {
                if (sdate && edate) {
                    sdate = kendo.toString(new Date(sdate), 'yyyy-MM-dd') + 'T00:00:00.000Z'

                    edate = new Date(edate)
                    edate = kendo.toString(edate, 'yyyy-MM-dd') + 'T23:59:59.999Z'
                } else {
                    sdate = 0
                    edate = 0
                }

                this.isLoaded = true
                this.compeletLoading = true

                    .then(res => {
                        if (res) {
                            this.balance = kendo.toString(res.balance, 'n')
                            this.backdated = kendo.toString(res.back_date_transaction, 'n')
                            this.forwarded = kendo.toString(res.future_date_transaction, 'n')
                            this.journal_entries = res.entries_detail
                        }
                    })
                    .finally(function () {
                        self.compeletLoading = false
                    })
            }
        },
        // On Account Type Changes
        async onAccountTypeChanges(accountTypeNumber) {
            new Promise(resolve => {
                resolve('resolved')

                if (accountTypeNumber === undefined) {
                    this.accounts = this.accounts_bk
                } else {
                    this.accounts = this.accounts_bk.filter(
                        m => m.account_type_number === accountTypeNumber
                    )
                }
            })
        },
        // On Search Changes
        async onSearchChanges(searchText) {
            new Promise(resolve => {
                resolve('resolved')

                if (searchText !== '') {
                    this.accounts = this.accounts_bk.filter(
                        m => (m.number.toLowerCase().indexOf(searchText) > -1 || m.name.toLowerCase().indexOf(searchText) > -1)
                    );
                } else {
                    this.accounts = this.accounts_bk
                }
            })
        },
    },
    async mounted() {
        await this.onloadShilvingOrder()
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
        'app-datepicker': DatePickerComponent,
    },
};
</script>
<style scoped>
.acc_group header {
    height: 10px !important;
}

table.acc_group tr td {
    border-bottom: 1px solid #ccc;
    padding: 8px;
    vertical-align: middle;
}

table.acc_group tr td:first-child {
    font-weight: 700;
}

table.acc_group tr td:last-child {
    text-align: center;
}

.v-card__actions .v-btn.v-btn {
    padding: 0 16px;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-family: 'Niradei-Bold', serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
    color: #000 !important;
    padding: 5px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
    border-bottom: 1px solid #000 !important;
}

.function_footer {
    padding: 15px;
    display: inline-block;
}

p {
    color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
    height: 47.2px !important;
}

.text_tip {
    font-size: 9px;
    line-height: 10px;
}

@media (max-width: 576px) {

}
</style>
