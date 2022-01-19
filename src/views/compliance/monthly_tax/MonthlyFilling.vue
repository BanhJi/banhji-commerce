<template>
    <v-row>
        <v-col cols="12" sm="12" class="py-0">
            <!-- loading -->
            <LoadingMe
                :isLoading="compeletLoading"
                :fullPage="false"
                :myLoading="true"
                type="loading"
            />
            <v-row>
                <v-col class="pt-0" sm="3" cols="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border "
                        color="grayBg"
                        height="90px"
                    >
                        <h3 class="primary--text font_26 mb-5 text-right ">0</h3>
                        <p class="mb-0 text-uppercase  text-right">
                            {{ $t("total_filled") }}
                        </p>
                    </v-card>
                </v-col>
                <v-col class="pt-0" sm="3" cols="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border"
                        color="grayBg"
                        height="90px"
                    >
                        <h3 class="primary--text font_26 mb-5 text-right ">{{ numDraft }}</h3>
                        <p class="mb-0 text-uppercase  text-right">{{ $t("draft") }}</p>
                    </v-card>
                </v-col>
                <v-col class="pt-0" sm="3" cols="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border"
                        color="grayBg"
                        height="90px"
                    >
                        <h3 class="primary--text font_26 mb-5 text-right ">{{ numSubmitted }}</h3>
                        <p class="mb-0 text-uppercase  text-right">{{ $t("submitted") }}</p>
                    </v-card>
                </v-col>
                <v-col class="pt-0" sm="3" cols="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border"
                        color="grayBg"
                        height="90px"
                    >
                        <h3 class="primary--text font_26 mb-5 text-right ">{{ numPaid }}</h3>
                        <p class="mb-0 text-uppercase  text-right">{{ $t("paid") }}</p>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="2" cols="12" class="pb-0">
                    <p class="mb-0 mt-2">{{ $t("search_by_month") }}</p>
                </v-col>
                <v-col sm="3" cols="12" class="pb-0 px-0">
                    <month-picker
                        :initialMonth="month"
                        @emitMonth="month = $event"
                        top="mt-0"
                    />
                </v-col>
                <v-col sm="1" cols="1" class="">
                    <v-btn class="white--text text-capitalize" color="primary">
                       {{$t('view')}}
                    </v-btn>
                </v-col>
                <v-col sm="3" cols="3" class="pb-0">
                    <v-btn @click="onNewReturn" class="white--text text-capitalize" color="primary">
                        {{ $t("new_return") }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" sm="12" class="pb-0">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th>{{ $t("id") }}</th>
                            <th>{{ $t("date") }}</th>
                            <th>{{ $t("month_of") }}</th>
                            <th>{{ $t("tax_amount") }}</th>
                            <th>{{ $t("progress") }}</th>
                            <th>{{ $t("status") }}</th>
                            <th>{{ $t("action") }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="mr in monthlyReturns" v-bind:key="mr.id">
                            <td>
                                <router-link :to="'monthly_return/view/'+ mr.id + '?type=view'" class="lightBlue1">
                                    {{ mr.number }}
                                </router-link>
                            </td>
                            <td>{{ mr.editDate }}</td>
                            <td>{{ mr.monthOf }}</td>
                            <td class="text-right">{{ numberFormat(mr.amountPaid) }}</td>
                            <td class="text-center">{{ mr.progress }}</td>
                            <td>{{ mr.status.name }}</td>
                            <td class="text-center">

                                <v-btn v-if="mr.status.id === 2" @click="onMakePayment(mr)" class="btn_edit_setting">
                                    <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                    <span class="capitalize ml-1 white--text font_14">{{$t('make_payment')}}</span>
                                </v-btn>
                                <v-btn v-if="mr.progress === 'Finalize' && mr.status.id === 1" @click="onSubmit(mr)" class="mr-1 btn_edit_setting">
                                    <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                    <span class="capitalize ml-1 white--text font_14">{{$t('submit')}}</span>
                                </v-btn>
                                <v-btn v-if="mr.status.id === 1" @click="editReturn(mr)" class="btn_edit_setting">
                                    <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                    <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                </v-btn>
                                <v-btn v-if="mr.status.id === 3" @click="viewReturn(mr)" class="btn_edit_setting">
<!--                                    <v-icon class="white&#45;&#45;text" size="14">mdi-pen</v-icon>-->
                                    <span class="capitalize ml-1 white--text font_14">{{$t('view')}}</span>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
        <v-col cols="12">
            <v-dialog v-model="dialogM" max-width="500px">
                <v-card>
                    <LoadingMe
                        :isLoading="showLoading1"
                        :fullPage="false"
                        :myLoading="true"
                        type="loading"
                    />
                    <div class="modal_header">
                        <v-card-title>{{ $t("summit_monthly_filling") }}</v-card-title>
                        <v-icon  @click="onCloseSubmit">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="6" cols="12" class="pb-0">
                                <label class="label">{{ $t("date") }}</label>
                                <date-picker :initialDate="monthlyReturn.dateSubmit" @emitDate="monthlyReturn.dateSubmit = $event"/>
                            </v-col>
                            <v-col sm="6" cols="12" class="pb-0">
                                <label class="label">{{ $t("number") }}</label>
                                <v-text-field v-model="monthlyReturn.numSubmit" class="mt-1" outlined/>
                            </v-col>
                            <v-col sm="6" cols="12" class="py-0">
                                <label class="label">{{ $t("method") }}</label>
                                <v-select v-model="monthlyReturn.methodSubmit" :items="method" item-text="name" item-value="id" class="mt-1" outlined/>
                            </v-col>
                            <v-col sm="6" cols="12" class="py-0">
                                <label class="label">{{ $t("note") }}</label>
                                <v-text-field v-model="monthlyReturn.noteSubmit" class="mt-1" outlined/>
                            </v-col>
                            <v-col sm="6" cols="12" class="py-0">
                                <label class="label">{{ $t("tax_agents") }}</label>
                                <v-select v-model="monthlyReturn.taxAgentSubmit" :items="taxAgents" item-value="id" item-text="name" class="mt-1" outlined/>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-btn @click="onCloseSubmit" class="btn_cancel">{{ $t("cancel") }}</v-btn>
                        <v-btn @click="onCreateSubmit" class="btn_save_close"
                        >{{ $t("save_close") }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogP" max-width="560px">
                <v-card>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"
                        type="loading"
                    />
                    <div class="modal_header">
                        <v-card-title>{{ $t("tax_payment") }}</v-card-title>
                        <v-icon  @click="dialogP = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content" >
                        <v-row>
                            <v-col sm="6" cols="12" class="py-0 mt-2">
                                <label class="label">{{ $t("date") }}</label>
                                <date-picker :initialDate="date" @emitDate="date = $event"/>
                                <label class="label">{{ $t("reference") }}</label>
                                <v-text-field v-model="monthly.reference" class="mt-1" outlined/>
                                <label class="label">{{ $t("amount_to_be_paid") }}</label>
                                <v-text-field class="mt-1" disabled v-model="monthly.amountToPaid" outlined/>
                                <label class="label">{{ $t("method") }}</label>
                                <v-select :items="paymentOptions" v-model="monthly.method" :item-text="item => `${item.code} - ${item.name}`" item-value="id" class="mt-1" return-object outlined/>
                            </v-col>
                            <v-col sm="6" cols="12" class="py-0 mt-2">
                                <label class="label mb-0">{{ $t("number") }}</label>
                                <v-text-field
                                    class="mt-1"
                                    outlined
                                    :rules="[(v) => !!v || 'Number is required']"
                                    required
                                />

                                <label class="label">{{ $t("submission_id") }}</label>
                                <v-row class="pt-1 pb-0">
                                    <v-col sm="3" cols="3" class="py-0 pr-0">
                                        <div class="code_text text-uppercase">
                                            {{ monthlyReturn.abbr }}
                                        </div>
                                    </v-col>
                                    <v-col sm="9" cols="8" class="py-0 pl-0 pr-1">
                                        <v-text-field
                                            v-model="monthlyReturn.number"
                                            disabled
                                            class="custom-border "
                                            outlined
                                            :rules="[(v) => !!v || 'Number is required']"
                                            required
                                        />
                                    </v-col>
                                </v-row>
                                <label class="label">{{ $t("amount_paid") }}</label>
                                <v-text-field class="mt-1" v-model="monthly.amount" outlined/>
                                <label class="label">{{ $t("note") }}</label>
                                <v-text-field class="mt-1" outlined/>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-btn @click="onClosePayment" class="btn_cancel">{{ $t("cancel") }}</v-btn>
                        <v-btn @click="onPayment" class="btn_save_close"
                        >{{ $t("save_close") }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script>
import LoadingMe from "@/components/Loading";
import MonthPicker from "@/components/custom_templates/MonthPicker";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import kendo from "@progress/kendo-ui";
import MonthlyReturn from "@/scripts/compliance/model/MonthlyReturn";
import {AccountModel, CurrencyModel, JournalEntryModel, JournalModel} from "@/scripts/model/AppModels";
import Helper from "@/helper";
// import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
const { EntityType, } = require("@/scripts/default_setup/Collections");
const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler");
const saleHandler = require("@/scripts/compliance/handler/saleHandler")
const purchaseHandler = require("@/scripts/compliance/handler/purchaseHandler")
const withholdingTaxHandler = require("@/scripts/compliance/handler/withholdingTaxHandler")
const salaryHandler = require("@/scripts/compliance/handler/salaryHandler")
const monthlyReturn = new MonthlyReturn({})
const taxAgentHandler = require("@/scripts/compliance/handler/taxAgentHandler")
const paymentOptionHandler = require("@/scripts/paymentOptionHandler")
const OPTION_TYPE = 'Customer'
export default {
    name: "",
    components: {
        LoadingMe,
        "month-picker": MonthPicker,
        "date-picker": DatePickerComponent,
    },
    data: () => ({
        month: "2021-04",
        compeletLoading: false,
        showLoading: false,
        showLoading1: false,
        monthlyReturns: [],
        monthlyReturn: monthlyReturn,
        dialogM: false,
        dialogP: false,
        date: "",
        monthly: {},
        submitFile: {},
        method: [{id: 1, name: 'GDT Desktop Application'}],
        taxAgents: [],
        numDraft: 0,
        numSubmitted: 0,
        numPaid: 0,

        sales: [],
        purchases: [],
        salaries: [],
        whts: [],
        paymentOptions: [],
        monthlyJournal: [],
    }),
    methods: {
        onNewReturn() {
            this.$router.push({
                name: 'New Tax Return',
                path: 'new_tax_return',
                params: {monthlyReturns: this.monthlyReturns}
            })
        },
        onloadTaxAgent() {
            taxAgentHandler.get().then(res => {
                this.taxAgents = res.data.data
            })
        },
        onCreateSubmit() {
            this.showLoading1 = true
            this.monthlyReturn.status = {id: 2, name: 'Submitted'}
            monthlyReturnHandler.create(this.monthlyReturn).then(res => {
                window.console.log(res, 'submit')
                this.showLoading1 = false
                this.onCloseSubmit()
            })
        },
        onSubmit(item) {
            this.monthlyReturn = item
            this.dialogM = true
        },
        onCloseSubmit() {
            this.monthlyReturn = {}
            this.onloadMonthlyReturn()
            this.dialogM = false
        },
        onClosePayment() {
            this.monthly = {}
            this.monthlyReturn = {}
            this.date = ''
            this.dialogP = false
        },
        async onloadMonthlyJournal() {
            await monthlyReturnHandler.getJournal().then(res => {
                this.monthlyJournal = res.data.data
            })
        },
        async onPayment() {
            this.showLoading = true
            let journals = [], journal_ = {}, currency = {}, exchange_rate = 1
            currency = this.monthlyJournal[0].currency
            exchange_rate = this.monthlyJournal[0].exchange_rate
            const account = this.monthly.method.account
            if (Object.keys(account).length === 0) {
                this.$snotify.error(`This payment method doesn't have account`)
                return
            }
            journals.push( new JournalEntryModel({
                description:          this.monthly.method.account.name,
                account:              new AccountModel(this.monthly.method.account),
                exchange_rate:        1/exchange_rate,
                currency:             new CurrencyModel(currency),
                amount:               kendo.parseFloat(this.monthlyReturn.amountPaid) * (-1), //cr
            }))
            this.monthlyJournal.forEach(i => {
                journals.push(
                    new JournalEntryModel({
                        description:          i.account.name,
                        account:              new AccountModel(i.account),
                        exchange_rate:        1/i.exchange_rate,
                        currency:             new CurrencyModel(i.currency),
                        amount:               i.amount, // dr & cr
                    }),
                )
            })
            journal_ = (new JournalModel({
                number:                       this.monthlyReturn.number,
                journal_date:                 Helper.toISODate(new Date()),
                month_of:                     Helper.toISODate(new Date(this.monthlyReturn.monthOf).toISOString().substr(0, 7)),//'2021-02-01',
                journal_type:                 EntityType.AUTO_JOURNAL,
                transaction_type:             'Monthly Return',
                referral_transaction_uuid:    this.monthlyReturn.id,
                journal_entries:              journals,
            }))
            if (this.monthly.amountToPaid !== this.monthly.amount) {
                this.$snotify.error('Please make sure amount paid the same amount to paid')
                return
            }
            const data = {
                date: this.date,
                amountPaid: this.monthly.amount,
                amountToPaid: this.monthly.amountToPaid,
                monthOf: this.monthlyReturn.monthOf,
                submissionId: this.monthlyReturn.abbr + '-' + this.monthlyReturn.number,
                reference: this.monthly.reference,
                method: this.monthly.method,
                note: this.monthly.note,
                journal: journal_,
                monthlyReturnId: this.monthly.id
            }
            await monthlyReturnHandler.createTaxPayment(data).then(async res => {
                window.console.log(res, 'new tax payment')
                this.monthlyReturn.status = {id: 3, name: 'Paid'}
                await monthlyReturnHandler.create(this.monthlyReturn).then(res => {
                    window.console.log(res, 'paid')
                    this.showLoading = false
                })
                this.onClosePayment()
            })
        },
        onMakePayment(item) {
            this.monthlyReturn = item
            this.monthly.amountToPaid = kendo.toString(item.amountPaid, 'n2')
            window.console.log(item, 'item214')
            this.onloadSale(item.id)
            this.onloadPurchase(item.id)
            this.onloadWht(item.id)
            this.loadPaymentOption()
            this.onloadMonthlyJournal()
            this.dialogP = true
        },
        pageChangeHandler: function (event) {
            alert("change", event);
        },
        dateFormat(dataItem) {
            return kendo.toString(new Date(dataItem.editDate), `2`)
        },
        async onloadSale(id) {
            await saleHandler.getByMrId(id).then(res => {
                this.sales = res.data.data
            })
        },
        async onloadPurchase(id) {
            await purchaseHandler.getByMrId(id).then(res => {
                this.purchases = res.data.data
            })
        },
        async onloadSalary(id) {
            await salaryHandler.getByMrId(id).then(res => {
                this.salaries = res.data.data
            })
        },
        async onloadWht(id) {
            await  withholdingTaxHandler.getByMrId(id).then(res => {
                this.whts = res.data.data
            })
        },

        async loadPaymentOption() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.paymentOptions = []
                    paymentOptionHandler.list('?optionType=' + OPTION_TYPE).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.paymentOptions = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async onloadMonthlyReturn() {
            this.compeletLoading = true;
            await monthlyReturnHandler.get().then((res) => {
                this.monthlyReturns = res.data.data;
                this.numDraft = 0
                this.numSubmitted = 0
                this.numPaid = 0
                if (this.monthlyReturns.length > 0) {
                    this.monthlyReturns.forEach(i => {
                        if (i.status.id === 1) {
                            this.numDraft += 1
                        } else if (i.status.id === 2) {
                            this.numSubmitted += 1
                        } else if (i.status.id === 3) {
                            this.numPaid += 1
                        }
                    })
                }
                this.compeletLoading = false;
            });
        },
        viewReturn(data) {
            this.$router.push({
                name: "View Tax Return",
                path: "monthly_return/view/" + data.id,
                params: {id: data.id, monthlyReturn: data},
                query: {type: "view"},
            });
        },
        editReturn(data) {
            this.$router.push({
                name: "New Tax Return",
                path: "new_tax_return",
                params: {id: data.id, monthlyReturn: data},
                query: {type: "edit"},
            });
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n2`)
        },
    },
    computed: {},
    activated() {
        this.onloadMonthlyReturn();
    },
    async mounted() {
        await this.onloadTaxAgent()
        await this.onloadMonthlyReturn();
    },
};
</script>
<style scoped></style>
