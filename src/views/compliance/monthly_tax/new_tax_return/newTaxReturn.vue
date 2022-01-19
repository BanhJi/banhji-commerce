<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t('make_new_monthly_return') }}</h2>
                                <v-icon
                                    @click="onClose"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close
                                </v-icon>

                            </v-card>

                            <v-row>
                                <v-col sm="12" cols="12">
                                    <div class="function_content">
                                        <v-form ref="form" v-model="valid" lazy-validation>
                                            <div>
                                                <v-row>
                                                    <v-col sm="4" class="py-0">
                                                        <label>{{ $t('for_the_month_of') }}</label>
                                                        <v-menu
                                                            v-model="menu"
                                                            :disabled="DateState"
                                                            class="mt-1"
                                                            :close-on-content-click="false"
                                                            max-width="290">
                                                            <template v-slot:activator="{ on,attrs }">
                                                                <v-text-field class="disable_alert my-0 mt-1"
                                                                              v-model="monthlyReturn.monthOf"
                                                                              readonly
                                                                              outlined
                                                                              :disabled="DateState"
                                                                              append-icon="event"
                                                                              v-on="on"
                                                                              v-bind="attrs"
                                                                              @click:clear="monthlyReturn.monthOf"
                                                                              @click:append="menu = true"
                                                                              required/>
                                                            </template>
                                                            <v-date-picker
                                                                :type="'month'"
                                                                @change="menu = false"
                                                                v-model="monthlyReturn.monthOf"
                                                                no-title
                                                            />
                                                        </v-menu>
                                                    </v-col>
                                                    <v-col sm="5" class="py-0 mt-5 px-0">
                                                        <v-btn :disabled="DateState" @click="startReturn"
                                                               class="ma-1 ml-2"
                                                               color="primary white--text text-capitalize">
                                                            {{ $t('start_new_return') }}
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                            <div v-if="start_return">
                                                <v-divider/>
                                                <v-card elevation="0" class="pa-3 mt-3" color="grayBg">
                                                    <v-row>
                                                        <v-col class="py-0" cols="12" sm="4">
                                                            <label>{{ $t('submission_id') }}</label>
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
                                                        </v-col>
                                                        <v-col class="py-0" cols="12" sm="4">
                                                            <p class="mb-0 mt-5">
                                                                {{ $t('approved_exch_rate_month') }}</p>
                                                        </v-col>
                                                        <v-col class="py-0" cols="12" sm="4">
                                                            <h3 class="primary--text font_20 mt-5">
                                                                {{ numberFormat(this.$store.state.institute.institute.baseCurrency.code !== 'KHR' ? 1/(currency.rate) : currency.rate) }}</h3>
                                                        </v-col>
                                                    </v-row>
                                                </v-card>
                                                <v-row>
                                                    <v-col sm="2" class="align-center justify-center d-flex ">
                                                        <div>
                                                            <v-card @click="ClickSteps(1)" width="44" height="44"
                                                                    outlined dense :color="activeColor1"
                                                                    class="pointer  m_auto no_border align-center justify-center d-flex rounded-circle ">
                                                                <h3 class="mt-2 white--text" style="font-size: 24px">
                                                                    1</h3>
                                                            </v-card>
                                                            <p class="text-uppercase mt-2">{{ $t('input') }}</p>
                                                        </div>
                                                    </v-col>
                                                    <v-col sm="2" class="align-center justify-center d-flex ">
                                                        <div>
                                                            <v-card @click="ClickSteps(2)" width="44" height="44"
                                                                    outlined dense :color="activeColor2"
                                                                    class="pointer m_auto no_border align-center justify-center d-flex rounded-circle ">
                                                                <h3 class="mt-2 white--text" style="font-size: 24px">
                                                                    2</h3>
                                                            </v-card>
                                                            <p class="text-uppercase mt-2">{{ $t('review') }}</p>
                                                        </div>
                                                    </v-col>
                                                    <v-col sm="2" class="align-center justify-center d-flex ">
                                                        <div>
                                                            <v-card @click="ClickSteps(3)" width="44" height="44"
                                                                    outlined dense :color="activeColor3"
                                                                    class="pointer m_auto  no_border align-center justify-center d-flex rounded-circle ">
                                                                <h3 class="mt-2 white--text" style="font-size: 24px">
                                                                    3</h3>
                                                            </v-card>
                                                            <p class="text-uppercase mt-2">{{ $t('confirm') }}</p>
                                                        </div>
                                                    </v-col>
                                                    <v-col sm="2" class="align-center justify-center d-flex ">
                                                        <div>
                                                            <v-card @click="new ClickSteps(4)" width="44" height="44"
                                                                    outlined dense :color="activeColor4"
                                                                    class="pointer m_auto  no_border align-center justify-center d-flex rounded-circle ">
                                                                <h3 class="mt-2 white--text" style="font-size: 24px">
                                                                    4</h3>
                                                            </v-card>
                                                            <p class="text-uppercase mt-2">{{ $t('finalize') }}</p>
                                                        </div>
                                                    </v-col>
                                                </v-row>
                                                <v-divider/>
                                                <!-- Body function to input -->
                                                <div v-show="steps===1">
                                                    <InputTab :currency="currency" :monthlyReturn="monthlyReturn"
                                                              @getSale="getInputSale"
                                                              @getPurchase="getInputPurchase"
                                                              @getSalary="getSalary"
                                                              @getWithholding="getWithholding"/>
                                                </div>
                                                <!-- Steps 2 Adjustemnt -->
                                                <div v-show="steps===2">
                                                    <ReviewTab :monthlyReturn="monthlyReturn"
                                                               :sale="sales"
                                                               :currency="currency"
                                                               :purchase="purchases"
                                                               :salary="salaries"
                                                               :withholding="withholdings"
                                                               @getOtherAmount="getOtherAmount"
                                                               @getAmountWht="getAmountWht"
                                                               @getTaxSalary="getAmountSalary"
                                                               @getTaxBenefit="getAmountTax"
                                                               @getAmountSaleExcul="getAmountSaleExcul"
                                                               @getTotalAmountPurchase="getTotalAmountPurchase"
                                                               @getAmountPurchaseExcul="getAmountPurchaseExcul"
                                                               @getAmountSale="getAmountSale"
                                                               :alertForm2="AlertValidate2"/>
                                                </div>
                                                <!-- Steps there -->
                                                <div v-show="steps===3">
                                                    <Confirm :currency="currency" :monthlyReturn="monthlyReturn"
                                                             :totalAmountPurchase="amountTotalPurchase"
                                                             :otherAmount="otherAmount"
                                                             :amountPurchaseExcul="amountPurchaseExcul"
                                                             :amountSalary="amountSalary"
                                                             :amountBenefit="amountBenefit"
                                                             :amountSaleExcul="amountSaleExcul" :amountSale="amountSale"
                                                             :amountWht="amountWht" @getStep="getStep"
                                                             @getTotalAmountPaid="getTotalAmountPaid"
                                                             @getBalanceVat="getBalanceVat"
                                                             @getBalancePpi="getBalancePpi"/>
                                                </div>
                                                <div v-show="steps===4">
                                                    <Finalize :sale="sales" :purchase="purchases"
                                                              :salary="salaries"
                                                              :withholding="withholdings" :monthlyReturn="monthlyReturn"
                                                              @getDatePurchase="getDatePurchase"
                                                              @getPurchase="getFinalPurchase"
                                                              @getDateWht="getDateWht"
                                                              @getDateSale="getDateSale"/>
                                                </div>
                                            </div>
                                        </v-form>
                                    </div>
                                </v-col>
                            </v-row>
                            <div class="function_footer px-4">
                                <!-- Warning Message -->
                                <v-btn color="black" class="float-left  white--text">{{
                                        $t('cancel')
                                    }}
                                </v-btn>
                                <v-btn :disabled="!start_return" class="float-right  btn_save_close"
                                       @click="nextStpes">
                                    {{ $t(save_next) }}
                                </v-btn>
                                <v-btn v-if="steps >= 1 && this.monthlyReturn.number !== ''" @click="saveDraft"
                                       class="float-right mx-3 capitalize white--text " color="primary">
                                    {{ $t('save_draft') }}
                                </v-btn>
                            </div>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :type="'loading'"
                :myLoading="true"
            />
        </v-container>
    </v-app>
</template>

<script>
import LoadingMe from '@/components/Loading'
import MonthlyReturn from "@/scripts/compliance/model/MonthlyReturn";
import {i18n} from "@/i18n";
import kendo from '@progress/kendo-ui'
import {uuid} from 'vue-uuid'
import taxSettingHandler from "@/scripts/taxSettingHandler";
const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler")
const saleHandler = require("@/scripts/compliance/handler/saleHandler")
const purchaseHandler = require("@/scripts/compliance/handler/purchaseHandler")
const salaryHandler = require("@/scripts/compliance/handler/salaryHandler")
const withholdingHandler = require("@/scripts/compliance/handler/withholdingTaxHandler")
const monthlyReturn = new MonthlyReturn({})
const prefixHandler = require("@/scripts/compliance/handler/prefixHandler")
const summaryHandler = require("@/scripts/compliance/handler/summaryHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const apiUrl = require('@/apiUrl')
// const taxSetting = require('@/store/taxSetting');
const currencyType = {
    TAX_EXCHANGE_CURRENCY: 'tax-c',
}
// const axios = require('axios')
export default {
    name: "TaxReturn",
    components: {
        'LoadingMe': LoadingMe,
        // 'month-picker': () => import('@/components/custom_templates/MonthPicker'),
        InputTab: () => import('./input/InputTab'),
        ReviewTab: () => import('./review/ReviewTab'),
        Confirm: () => import('./confirm/ConfirmTab'),
        Finalize: () => import('./finalize/Finalize')
    },
    data: () => ({
        menu: false,
        templates: [],
        month: '',
        showLoading: false,
        valid: '',
        bill_date: "",
        journal_date: '',
        steps: 1,
        reachTopStep: 0,
        check: false,
        save_next: 'save_next',
        activeColor1: "primary",
        activeColor2: "third",
        activeColor3: "third",
        activeColor4: "third",
        isFinal: false,
        // third
        check1: false,
        check2: false,
        check3: false,
        payroll_id: '',
        loadPayrolls: [],
        // start_return: false,

        isCreate: false,
        transactionTypes: [],
        monthlyReturn: monthlyReturn,
        // isGetAmount: false,
        AlertValidate2: false,

        currency: {},
        sales: [],
        purchases: [],
        salaries: [],
        withholdings: [],
        amountSale: 0,
        amountSaleExcul: 0,
        amountTotalPurchase: 0,
        amountPurchaseExcul: 0,
        amountWht: 0,
        amountSalary: 0,
        amountBenefit: 0,
        otherAmount: 0,
        totalAmountPaid: 0,
        summary: {},
        isRoute: false,
        balanceVat: {},
        balancePpi: {},
        dateSale: '',
        datePurchase: '',
        dateWht: '',
        dateSalary: '',
        statusMr: false,
        journalSummary: [],
        listTaxs: []
    }),
    computed: {
        start_return() {
            return this.monthlyReturn.number !== '' && this.$route.params.id !== '';
        },
        id() {
            if (this.$route.params.id) {
                return this.$route.params.id
            } else {
                return ''
            }
        },
        DateState() {
            return this.$route.params.id !== undefined || this.$route.query.type === 'edit' || this.$route.query.type === 'view';
        },
        // listTaxs: {
        //     set(listTax) {
        //         taxSetting.default.commit("setListTax", listTax)
        //     },
        //     get() {
        //         return taxSetting.default.state.listTax
        //     }
        // },
    },
    watch: {
        'id': 'initData',
    },
    beforeRouteLeave (to, from , next) {
        if (to.name === 'Add Purchase' || to.name === 'Add Sale' || to.name === 'Add Withholding Tax') {
            next()
        } else {
            const sales = this.$store.state.compliance.sale
            if (sales.length > 0 && sales.filter(p => p.isSave === false)) {
                this.$swal({
                    title: i18n.t('msg_title_warning'),
                    text: i18n.t('msg_leave'),
                    icon: "warning",
                    cancelButtonText: i18n.t('force_leave'),
                    confirmButtonColor: "#4d4848",
                    cancelButtonColor: "#ED1A3A",
                    showDenyButton: true,
                    confirmButtonText: i18n.t('leave'),
                    showCancelButton: true,
                    showCloseButton: true,
                }).then(res => {
                    if (res.isConfirmed || res.isDismissed && res.dismiss === 'cancel') {
                        next()
                        this.clear()
                        this.amountSale = 0
                        this.amountSaleExcul = 0
                        this.amountPurchase = 0
                        this.amountWht = 0
                        this.otherAmount = 0
                        this.totalAmountPaid = 0
                    } else {
                        next(false)
                    }
                    window.console.log(res, 'discard')
                })
            } else {
                if (this.monthlyReturn.progress === '' && this.isRoute) {
                    this.$swal({
                        title: i18n.t('msg_title_warning'),
                        text: i18n.t('msg_discard'),
                        icon: "warning",
                        showCancelButton: true,
                        cancelButtonText: i18n.t('cancel'),
                        confirmButtonColor: "#4d4848",
                        cancelButtonColor: "#ED1A3A",
                        confirmButtonText: i18n.t('discard'),
                    }).then(res => {
                        if (res.isConfirmed) {
                            next()
                            this.clear()
                            this.amountSale = 0
                            this.amountSaleExcul = 0
                            this.amountPurchase = 0
                            this.amountWht = 0
                            this.otherAmount = 0
                            this.totalAmountPaid = 0
                        } else {
                            next(false)
                        }
                    })
                } else {
                    next()
                }
            }
        }
    },
    methods: {
        async checkMonthlyReturn() {
            monthlyReturnHandler.getByMonth(this.monthlyReturn.monthOf).then(res => {
                window.console.log(res, 'get month123')
                if (res.data.data === 1) {
                    this.statusMr = true
                }
            })
        },
        getFinalPurchase(purchase) {
            if (this.purchases.length === 0) {
                this.purchases = purchase
            }
        },
        getBalanceVat(balance) {
            this.balanceVat = balance
            window.console.log(this.balanceVat.credit, this.balanceVat.payment, 'balanceVat')
        },
        getBalancePpi(balance) {
            this.balancePpi = balance
            window.console.log(this.balancePpi, 'balancePpi')
        },
        getSummary(summary) {
            window.console.log('new tax tab summary', summary)
            this.summary = summary
        },
        getDateWht(date) {
            this.dateWht = date
        },
        getSalary(salary) {
            this.salaries = salary
        },
        getDatePurchase(date) {
            this.datePurchase = date
        },
        getDateSale(date) {
            this.dateSale = date
        },
        getTotalAmountPaid(amount) {
            this.totalAmountPaid = amount
        },
        getOtherAmount(amount) {
            this.otherAmount = amount
        },
        getAmountSaleExcul(saleExcul) {
            window.console.log('new tax tab sale excul', saleExcul)
            this.amountSaleExcul = saleExcul
        },
        getWithholding(withholding) {
            window.console.log('new tax tab withholding', withholding)
            this.withholdings = withholding
        },
        getAmountSalary(amount) {
            window.console.log('new tax tab salary', amount)
            this.amountSalary = amount
        },
        getAmountTax(amount) {
            window.console.log('new tax tab benefit', amount)
            this.amountBenefit = amount
        },
        getInputPurchase(purchase) {
            window.console.log('new tax tab purchase', purchase)
            this.purchases = purchase
        },
        getInputSale(sale) {
            window.console.log('new tax tab sale', sale)
            this.sales = sale
        },
        getAmountWht(amount) {
            window.console.log('new tax tab wht', amount)
            this.amountWht = amount
        },
        getStep(step) {
            this.steps = step
            if (this.reachTopStep <= this.steps) {
                this.reachTopStep = this.steps
            }
            this.stepsCondition(this.steps)
        },
        getTotalAmountPurchase(amount) {
            this.amountTotalPurchase = amount
            window.console.log(this.amountTotalPurchase, 'New Tax Tab Purchase')
        },
        getAmountPurchaseExcul(amount) {
            this.amountPurchaseExcul = amount
        },
        getAmountSale(amount) {
            this.amountSale = amount
            window.console.log(this.amountSale, 'New Tax Tab Sale')
        },
        async initData() {
            this.showLoading = true
            if (this.$route.params.id !== undefined && this.$route.params.monthlyReturn === undefined) {
                await this.onLoadOneReturn()
                window.console.log(this.steps)
            } else if (this.$route.params.monthlyReturn !== undefined) {
                this.monthlyReturn = this.$route.params.monthlyReturn
                if (this.monthlyReturn.status.id === 2) {
                    this.$router.push({
                        name: 'View Tax Return',
                        path: 'view_monthly_return/' + this.monthlyReturn.id,
                        params: {id: this.monthlyReturn.id, monthlyReturn: this.monthlyReturn},
                        query: {type: 'view'}
                    })
                }
                window.console.log(this.monthlyReturn, 'dafasdf34')
                this.initLocalStorage(this.monthlyReturn.abbr, this.monthlyReturn.number)
                const step = JSON.parse(localStorage.getItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Step'))
                let steps = 1
                if (this.monthlyReturn.step !== '') {
                    steps = this.monthlyReturn.step
                }
                if (step > 0) {
                    window.console.log('step12', step)
                    if (this.monthlyReturn.step > step) {
                        steps = this.monthlyReturn.step
                    } else {
                        steps = step
                    }
                }
                this.steps = steps
                if (this.reachTopStep <= this.steps) {
                    this.reachTopStep = this.steps
                }
                this.stepsCondition(this.steps)
                // this.start_return = true
                this.showLoading = false
                window.console.log(this.steps)
            } else {
                this.clear()
            }
        },
        clear() {
            this.monthlyReturn = new MonthlyReturn({})
            this.showLoading = false
        },
        initLocalStorage(abbr, number) {
            const sale = JSON.parse(localStorage.getItem(abbr + number + '&Sale'))
            const purchase = JSON.parse(localStorage.getItem(abbr + number + '&Purchase'))
            const withholding = JSON.parse(localStorage.getItem(abbr + number + '&Withholding'))
            const salary = JSON.parse(localStorage.getItem(abbr + number + '&Salary'))
            const step = JSON.parse(localStorage.getItem(abbr + number + '&Step'))
            if (sale === null) {
                localStorage.setItem(abbr + number + '&Sale', JSON.stringify([]))
            }
            if (purchase === null) {
                localStorage.setItem(abbr + number + '&Purchase', JSON.stringify([]))
            }
            if (withholding === null) {
                localStorage.setItem(abbr + number + '&Withholding', JSON.stringify([]))
            }
            if (salary === null) {
                localStorage.setItem(abbr + number + '&Salary', JSON.stringify([]))
            }
            if (step === null) {
                localStorage.setItem(abbr + number + '&Step', JSON.stringify(1))
            }
        },
        onClose() {
            const sales = this.$store.state.compliance.sale
            const purchases = this.$store.state.compliance.purchase
            const withholding = this.$store.state.compliance.withholding
            if (sales.length > 0 && sales.filter(p => p.isSave === false) || purchases.length > 0 && purchases.filter(p => p.isSave === false) || withholding.length > 0 && withholding.filter(p => p.isSave === false)) {
                this.$swal({
                    title: i18n.t('msg_title_warning'),
                    text: i18n.t('msg_leave'),
                    icon: "warning",
                    cancelButtonText: i18n.t('force_leave'),
                    confirmButtonColor: "#4d4848",
                    cancelButtonColor: "#ED1A3A",
                    showDenyButton: true,
                    confirmButtonText: i18n.t('leave'),
                    showCancelButton: true,
                    showCloseButton: true,
                }).then(res => {
                    if (res.isConfirmed || res.isDismissed && res.dismiss === 'cancel') {
                        this.clean()
                    }
                    window.console.log(res, 'discard')
                })
            } else {
                if (this.monthlyReturn.progress === '' && this.isRoute) {
                    this.$swal({
                        title: i18n.t('msg_title_warning'),
                        text: i18n.t('msg_discard'),
                        icon: "warning",
                        showCancelButton: true,
                        cancelButtonText: i18n.t('cancel'),
                        confirmButtonColor: "#4d4848",
                        cancelButtonColor: "#ED1A3A",
                        confirmButtonText: i18n.t('discard'),
                    }).then(res => {
                        if (res.isConfirmed) {
                            this.clean()
                        }
                    })
                }
            }

            // const sale = JSON.parse(localStorage.getItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Sale'))
            // const purchase = JSON.parse(localStorage.getItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Purchase'))
            // const withholding = JSON.parse(localStorage.getItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Withholding'))
            // const salary = JSON.parse(localStorage.getItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Salary'))
            // const step = JSON.parse(localStorage.getItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Step'))
            // if (sale === null) {
            //     localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Sale', JSON.stringify([]))
            // }
            // if (purchase === null) {
            //     localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Purchase', JSON.stringify([]))
            // }
            // if (withholding === null) {
            //     localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Withholding', JSON.stringify([]))
            // }
            // if (salary === null) {
            //     localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Salary', JSON.stringify([]))
            // }
            // if (step === null) {
            //     localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Step', JSON.stringify(1))
            // }
            // if (sale !== null || purchase !== null || withholding !== null || salary !== null) {
            //     if (sale.length > 0 || purchase.length > 0 || withholding.length > 0 || salary.length > 0) {
            //         this.$swal({
            //             title: i18n.t('msg_title_warning'),
            //             text: i18n.t('msg_leave'),
            //             icon: "warning",
            //             cancelButtonText: i18n.t('force_leave'),
            //             confirmButtonColor: "#4d4848",
            //             cancelButtonColor: "#ED1A3A",
            //             showDenyButton: true,
            //             confirmButtonText: i18n.t('leave'),
            //             showCancelButton: true,
            //             showCloseButton: true,
            //         }).then(res => {
            //             if (res.isConfirmed) {
            //                 localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Step', this.steps)
            //                 this.clean()
            //             } else if (res.isDismissed && res.dismiss === 'cancel') {
            //                 localStorage.removeItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Sale')
            //                 localStorage.removeItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Purchase')
            //                 localStorage.removeItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Salary')
            //                 localStorage.removeItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Withholding')
            //                 localStorage.removeItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Step')
            //                 this.clean()
            //             }
            //             window.console.log(res, 'discard')
            //         })
            //     } else {
            //         if (this.monthlyReturn.progress === '' && this.isRoute) {
            //             this.$swal({
            //                 title: i18n.t('msg_title_warning'),
            //                 text: i18n.t('msg_discard'),
            //                 icon: "warning",
            //                 showCancelButton: true,
            //                 cancelButtonText: i18n.t('cancel'),
            //                 confirmButtonColor: "#4d4848",
            //                 cancelButtonColor: "#ED1A3A",
            //                 confirmButtonText: i18n.t('discard'),
            //             }).then(res => {
            //                 if (res.isConfirmed) {
            //                     localStorage.removeItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Sale')
            //                     localStorage.removeItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Purchase')
            //                     localStorage.removeItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Salary')
            //                     localStorage.removeItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Withholding')
            //                     localStorage.removeItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Step')
            //                     this.clean()
            //                 }
            //                 window.console.log(res, 'discard')
            //             })
            //         } else {
            //             this.clean()
            //         }
            //     }
            // }
        },
        clean() {
            this.clear()
            this.amountSale = 0
            this.amountSaleExcul = 0
            this.amountPurchase = 0
            this.amountWht = 0
            this.otherAmount = 0
            this.totalAmountPaid = 0
            // this.start_return = false
            if (!this.isRoute) {
                this.isRoute = false
                window.history.go(-1)

            } else {
                this.isRoute = false
                window.history.go(-1)
                window.history.go(-1)
            }

        },
        async loadCurrencyData(type) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    currencyHandler.list(type).then(response => {
                        if (response.data.statusCode === 200) {
                            window.console.log('response','')
                            if (type === currencyType.TAX_EXCHANGE_CURRENCY) {
                                this.currency = response.data.data[0]
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async onloadCurrency() {
            const date = this.monthlyReturn.monthOf + '-' + '30'
            const code = 'KHR'
            currencyHandler.getLastExchangeRateTaxByDate(date, code).then(res => {
                this.currency = res.data.data[0]
                window.console.log(res, 'currency')
            })
        },
        async onLoadOneReturn() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    const id = this.$route.params.id
                    monthlyReturnHandler.getOne(id).then(res => {
                        window.console.log(res, 'data load monthly return')
                        this.monthlyReturn = res.data.data[0]
                        if (this.monthlyReturn.status.id === 2) {
                            this.$router.push({
                                name: 'View Tax Return',
                                path: 'view_monthly_return/' + this.monthlyReturn.id,
                                params: {id: this.monthlyReturn.id, monthlyReturn: this.monthlyReturn},
                                query: {type: 'view'}
                            })
                        }
                        window.console.log(this.monthlyReturn)
                        this.initLocalStorage(this.monthlyReturn.number)
                        this.steps = this.monthlyReturn.step
                        if (this.reachTopStep <= this.steps) {
                            this.reachTopStep = this.steps
                        }
                        this.stepsCondition(this.steps)
                        // this.start_return = true
                        this.showLoading = false
                    })
                })
            })
        },
        async startReturn() {
            this.showLoading = true
            await this.checkMonthlyReturn()
            if (this.statusMr) {
                this.$snotify.error('This month of is exist')
                this.statusMr = false
                this.showLoading = false
                return
            }
            await this.generateNumber()
            // this.start_return = true
        },
        async loadPrefix() {
            prefixHandler.get('monthly return').then(res => {
                if (res.data.statusCode === 200) {
                    this.transactionTypes = res.data.data
                    if (this.transactionTypes.length > 0) {
                        this.monthlyReturn.transactionType = this.transactionTypes[0]
                    }
                }
            })
        },
        async generateNumber() {
            if (this.monthlyReturn.transactionType.abbr === undefined) {
                await this.loadPrefix()
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        abbr: this.monthlyReturn.transactionType.abbr,
                        structure: this.monthlyReturn.transactionType.structure,
                        transactionDate: this.monthlyReturn.monthOf,
                        sequcencing: this.monthlyReturn.transactionType.sequcencing,
                        type: 'Monthly Return',
                    }
                    this.monthlyReturn.abbr = data.abbr
                    this.monthlyReturn.structure = data.structure
                    this.monthlyReturn.sequcencing = data.sequcencing
                    this.monthlyReturn.type = data.type
                    this.monthlyReturn.transactionDate = data.transactionDate
                    prefixHandler.lastNumber(data).then(async response => {
                        if (response.data.statusCode === 200) {
                            const res = response.data.data
                            const lastNumber = this.zeroPad(parseInt(res.lastNumber), this.monthlyReturn.transactionType.format)
                            this.monthlyReturn.number = res.suffix + this.monthlyReturn.transactionType.numberSeparator + lastNumber
                            this.monthlyReturn.lastNumber = res.suffix + lastNumber
                            window.console.log(this.monthlyReturn.number, 'monthly return')
                            // await this.saveReturn()

                            this.monthlyReturn.id = `mr-${uuid.v1()}`
                            this.monthlyReturn.status = {id: 1, name: 'Drafted'}
                            this.monthlyReturn.editDate = new Date().toISOString().substr(0, 10)
                            this.monthlyReturn.amountPaid = 0
                            this.monthlyReturn.exChangeRate = 4000
                            this.monthlyReturn.step = 1
                            window.console.log('monthly return', this.monthlyReturn)
                            this.$router.push({
                                path: 'new_tax_return' + `/${this.monthlyReturn.id}`,
                                name: 'New Tax Return',
                                params: {id: this.monthlyReturn.id, monthlyReturn: this.monthlyReturn},
                                query: {type: 'edit'}
                            })
                            this.isRoute = true
                            if (this.monthlyReturn.progress === '' && this.isRoute) {
                                window.addEventListener('beforeunload', function (event) {
                                    event.returnValue = 'Please make sure you already save draft'
                                })
                                window.removeEventListener('beforeunload', function (event) {
                                    event.returnValue = ''
                                })
                            }
                            this.showLoading = false
                        }
                    }).catch(e => {
                        window.console.error(e)
                    })
                    this.menu = false
                }, 300)
            })
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        async loadListTax() {
            await taxSettingHandler.get(apiUrl.tax_setting.tax_list_get, "listTax", "setListTax")
        },
        async saveReturn() {
            monthlyReturnHandler.create(this.monthlyReturn).then(res => {
                window.console.log(res)
                this.monthlyReturn = res.data.data
                this.$router.push({
                    path: 'new_tax_return' + `/${this.monthlyReturn.id}`,
                    name: 'New Tax Return',
                    params: {id: this.monthlyReturn.id},
                    query: {type: 'edit'}
                })
                this.isCreate = true
                this.showLoading = false
            }).catch(e => {
                window.console.error(e.message)
            })
        },
        async saveDraft() {
            this.showLoading = true
            this.monthlyReturn.step = this.steps
            let progressName = ''
            if (this.steps === 1) {
                progressName = 'Input'
            } else if (this.steps === 2) {
                progressName = 'Review'
            } else if (this.steps === 3) {
                progressName = 'Confirm'
                this.monthlyReturn.amountPaid = this.totalAmountPaid.amount
                if (this.totalAmountPaid.summary !== undefined) {
                    this.totalAmountPaid.summary.monthOf = this.monthlyReturn.monthOf
                    summaryHandler.create(this.totalAmountPaid.summary).then(res => {
                        window.console.log(res, 'summary create')
                    })
                }
                if (this.balanceVat.credit && this.balanceVat.credit > 0 || this.balanceVat.payment && this.balanceVat.payment > 0) {
                    const data = {
                        credit: this.balanceVat.credit,
                        payment: this.balanceVat.payment,
                        monthOf: this.monthlyReturn.monthOf,
                        type: 'vat monthly',
                        date: new Date().toJSON()
                    }
                    await monthlyReturnHandler.addTxnVAT(data, this.monthlyReturn.monthOf, 'monthly').then(res => {
                        window.console.log(res)
                    })
                }
                if (this.balancePpi.balance && this.balancePpi.balance > 0 || this.balancePpi.credit && this.balancePpi.credit > 0) {
                    const data = {
                        amount: this.balancePpi.balance,
                        monthOf: this.monthlyReturn.monthOf,
                        type: 'ppi monthly',
                        date: new Date().toJSON()
                    }
                    await monthlyReturnHandler.addTxnPPI(data, this.monthlyReturn.monthOf, 'monthly').then(res => {
                        window.console.log(res)
                    })
                }
            } else if (this.steps === 4) {
                await this.loadListTax()
                window.console.log(this.sales, 'sales')
                window.console.log(this.purchases, 'purchases')
                window.console.log(this.withholdings, 'withholdings')
                window.console.log(this.salaries, 'salaries')
                let amtSale = 0, accSale = {},
                    amtPurchase = 0, accPurchase = {},
                    amtWht = 0, accWht = {},
                    amtPPi = 0, accPPi = {},
                    amtOther = 0, accOther = {},
                    amtSalary = 0, accSalary = {},
                    amtFBT = 0, accFBT = {}
                window.console.log(this.listTaxs, progressName, 'listTax')
                accSale = this.listTaxs.filter(o => o.taxType.typeId === 1 && o.transactionType === 'Sale')[0].account
                accPurchase = this.listTaxs.filter(o => o.taxType.typeId === 1 && o.transactionType === 'Purchase')[0].account
                accWht = this.listTaxs.filter(o => o.taxType.typeId === 2 && o.transactionType === 'Purchase')[0].account
                accPPi = this.listTaxs.filter(o => o.taxType.typeId === 6)[0].account
                accOther = this.listTaxs.filter(o => o.taxType.typeId === 7)[0].account
                accSalary = this.listTaxs.filter(o => o.taxType.typeId === 3)[0].account
                accFBT = this.listTaxs.filter(o => o.taxType.typeId === 4)[0].account
                this.sales.forEach(i => {
                    if (i.itemLine[0].taxName.accountId === accSale.id) {
                        amtSale += i.totalVAT
                    }
                    if (i.itemLine[0].specificTax.accountId === accOther.id) {
                        amtOther += i.totalSpecificTax
                    }
                    if (i.itemLine[0].pubTax.accountId === accOther.id) {
                        amtOther += i.totalPubTax
                    }
                    if (i.itemLine[0].accomTax.accountId === accOther.id) {
                        amtOther += i.totalAccomTax
                    }
                })
                this.purchases.forEach(i => {
                    if (i.itemLine[0].taxName.accountId === accPurchase.id) {
                        amtPurchase += i.totalVAT
                    }
                })
                this.withholdings.forEach(i => {
                    if (i.itemLine[0].taxName.accountId === accWht.id) {
                        amtWht += i.totalVAT
                    }
                })
                this.salaries.forEach(i => {
                    amtSalary += i.amountTaxSalary
                    amtFBT += i.taxAmountBenefit
                })
                amtPPi = this.balancePpi.balance
                if (this.journalSummary.length === 0) {
                    this.journalSummary = [
                        {
                            id: `mr-${uuid.v1()}`,
                            exchange_rate: this.currency.rate,
                            currency: this.currency,
                            account: accSale,
                            amount: kendo.parseFloat(amtSale)
                        },
                        {
                            id: `mr-${uuid.v1()}`,
                            exchange_rate: this.currency.rate,
                            currency: this.currency,
                            account: accPurchase,
                            amount: kendo.parseFloat(amtPurchase) * (-1)
                        },
                        {
                            id: `mr-${uuid.v1()}`,
                            exchange_rate: this.currency.rate,
                            currency: this.currency,
                            account: accWht,
                            amount: amtWht
                        },
                        {
                            id: `mr-${uuid.v1()}`,
                            exchange_rate: this.currency.rate,
                            currency: this.currency,
                            account: accOther,
                            amount: amtOther
                        },
                        {
                            id: `mr-${uuid.v1()}`,
                            exchange_rate: this.currency.rate,
                            currency: this.currency,
                            account: accPPi,
                            amount: amtPPi
                        },
                        {
                            id: `mr-${uuid.v1()}`,
                            exchange_rate: this.currency.rate,
                            currency: this.currency,
                            account: accSalary,
                            amount: amtSalary
                        },
                        {
                            id: `mr-${uuid.v1()}`,
                            exchange_rate: this.currency.rate,
                            currency: this.currency,
                            account: accFBT,
                            amount: amtFBT
                        }
                    ]
                }
                window.console.log(this.journalSummary, 'journalSummary')
                await monthlyReturnHandler.createJournal(this.journalSummary).then(res => {
                    window.console.log(res, 'create journal monthly return')
                })
                window.console.log(amtSale, accSale, 'amount sale acc')
                window.console.log(amtPurchase, accPurchase, 'amount purchase acc')
                window.console.log(amtWht, accWht, 'amount wht acc')
                window.console.log(amtOther, accOther, 'amount other acc')
                window.console.log(amtPPi, accPPi, 'amount PPi acc')
                window.console.log(amtSalary, accSalary, 'amount Salary acc')
                progressName = 'Finalize'
                this.monthlyReturn.amountPaid = this.totalAmountPaid.amount
                if (this.totalAmountPaid.summary !== undefined) {
                    this.totalAmountPaid.summary.monthOf = this.monthlyReturn.monthOf
                    summaryHandler.create(this.totalAmountPaid.summary).then(res => {
                        window.console.log(res, 'summary create')
                    })
                }
                if (this.balanceVat.credit && this.balanceVat.credit > 0 || this.balanceVat.payment && this.balanceVat.payment > 0) {
                    const data = {
                        credit: this.balanceVat.credit,
                        payment: this.balanceVat.payment,
                        monthOf: this.monthlyReturn.monthOf,
                        type: 'vat monthly',
                        date: new Date().toJSON()
                    }
                    await monthlyReturnHandler.addTxnVAT(data, this.monthlyReturn.monthOf, 'monthly').then(res => {
                        window.console.log(res)
                    })
                }
                if (this.balancePpi.balance && this.balancePpi.balance > 0 || this.balancePpi.credit && this.balancePpi.credit > 0) {
                    const data = {
                        amount: this.balancePpi.balance,
                        monthOf: this.monthlyReturn.monthOf,
                        type: 'ppi monthly',
                        date: new Date().toJSON()
                    }
                    await monthlyReturnHandler.addTxnPPI(data, this.monthlyReturn.monthOf, 'monthly').then(res => {
                        window.console.log(res)
                    })
                }
                this.monthlyReturn.dateSale = this.dateSale.date
                this.monthlyReturn.datePurchase = this.datePurchase.date
                this.monthlyReturn.dateWht = this.dateWht.date
                this.monthlyReturn.dateSalary = this.dateSalary.date
                this.monthlyReturn.amountDlSale = this.dateSale.amount
                this.monthlyReturn.amountDlPurchase = this.datePurchase.amount
                this.monthlyReturn.amountDlWht = this.dateWht.amount
                this.monthlyReturn.amountDlSalary = this.dateSalary.amount
            }
            this.monthlyReturn.progress = progressName
            window.console.log(this.monthlyReturn, 'monthlyReturn')
            await monthlyReturnHandler.create(this.monthlyReturn).then(async res => {
                window.console.log(res)
                this.monthlyReturn = res.data.data
                if (this.sales.length > 0) {
                    await saleHandler.create(this.sales).then(res => {
                        localStorage.removeItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Sale')
                        window.console.log(res)
                    })
                }
                if (this.purchases.length > 0) {
                    await purchaseHandler.create(this.purchases).then(res => {
                        localStorage.removeItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Purchase')
                        window.console.log(res)
                    })
                }
                if (this.withholdings.length > 0) {
                    await withholdingHandler.create(this.withholdings).then(res => {
                        localStorage.removeItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Withholding')
                        window.console.log(res)
                    })
                }
                if (this.salaries.length > 0) {
                    await salaryHandler.create(this.salaries).then(res => {
                        localStorage.removeItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Salary')
                        window.console.log(res)
                    })
                }
                // localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Sale', JSON.stringify([]))
                // localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Purchase', JSON.stringify([]))
                // localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Withholding', JSON.stringify([]))
                // localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Salary', JSON.stringify([]))
                // localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Step', JSON.stringify(this.steps))
            //     this.showLoading = false
            }).catch(e => {
                window.console.error(e.message)
            })
        },
        async nextStpes() {
            if (this.steps == 4) {
                this.save_next = "confirm_close"
                await this.saveDraft()
                // await this.clean()
            } else {
                this.save_next = "confirm_next"
                this.steps = this.steps + 1
                if (this.reachTopStep <= this.steps) {
                    this.reachTopStep = this.steps
                }
                this.stepsCondition(this.steps)
            }
        },
        async ClickSteps(step) {
            if (this.steps === step) {
                return
            }
            if (step > this.reachTopStep) {
                return
            }
            if (step !== 4) {
                this.save_next = "confirm_next"
            } else {
                this.save_next = "confirm_close"
            }
            this.steps = step
            this.stepsCondition(this.steps)
        },
        stepsCondition(val) {
            switch (val) {
                case 1:
                    this.activeColor1 = "primary"
                    this.activeColor2 = "third"
                    this.activeColor3 = "third"
                    this.activeColor4 = "third"
                    break
                case 2:
                    this.activeColor1 = "third"
                    this.activeColor2 = "primary"
                    this.activeColor3 = "third"
                    this.activeColor4 = "third"
                    break
                case 3:
                    this.activeColor1 = "third"
                    this.activeColor2 = "third"
                    this.activeColor3 = "primary"
                    this.activeColor4 = "third"
                    break
                default:
                    this.activeColor1 = "third"
                    this.activeColor2 = "third"
                    this.activeColor3 = "third"
                    this.activeColor4 = "primary"
                    this.isFinal = true
                    this.save_next = "confirm_close"
                    break
            }
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            if (value >= 0) {
                return value.toLocaleString()
            } else {
                return value
            }

        },
    },
    created() {
        this.loadListTax()
    },
    async mounted() {
        await this.onloadCurrency()
        // await this.loadCurrencyData(currencyType.TAX_EXCHANGE_CURRENCY)
        await this.initData()
        await this.loadPrefix()
    },
}

</script>

<style scoped>
.function_content {
    padding: 0 12px 12px;
    border-bottom: 0;
    background-color: #fff !important;
}

.m_auto {
    margin: auto;
}

@media (min-width: 1264px) {
    .container {
        /* max-width: 1185px; */
        max-width: 1080px !important;
    }
}

.grayBg {
    background-color: #F8F8F9;
}

@media (max-width: 576px) {
    .mb-6 {
        margin-bottom: 0 !important;
    }
}

.border_grey {
    border: 1px solid #d6d7d8;
}

.attachment_table {
    width: 100%;
}

.my_checkbox input[type=checkbox] + label {
    display: grid;
    grid-template-columns: 20% 80%;
    margin: 0.2em 0px;
    cursor: pointer;
    line-height: 16px;
    padding: 0.2em;
}
</style>
