// @vue/component
import kendo from "@progress/kendo-ui";
import {uuid} from "vue-uuid";
// const summaryHandler = require("@/scripts/compliance/handler/summaryHandler")
export default {
    name: 'Confirm',

    components: {},

    mixins: [],

    props: ['amountWht', 'amountPPI', 'amountBenefit', 'amountTaxSalary', 'balanceVAT', 'otherAmount', 'monthlyReturn'],

    data () {
        return {
            totalAmountPaid: 0,
            otherTax: 0,
            summary: {},
            lSummary: [],
        }
    },

    async mounted() {
        await this.onCalculate()
    },

    computed: {
        otherAmounts() {
            if (this.otherAmount !== undefined) {
                return this.otherAmount
            } else {
                return {}
            }
        },
        amountWhts() {
            if (this.amountWht !== undefined) {
                window.console.log('summary wht', this.amountWht)
                return this.amountWht
            } else {
                return 0
            }
        },
        amountBenefits() {
            if (this.amountBenefit) {
                return this.amountBenefit
            } else {
                return 0
            }
        },
        amountTaxSalaries() {
            if (this.amountTaxSalary) {
                return this.amountTaxSalary
            } else {
                return 0
            }
        },
        amountPPIs() {
            if (this.amountPPI !== undefined) {
                return this.amountPPI
            } else {
                return 0
            }
        },
        balanceVATs() {
            if (this.balanceVAT !== undefined) {
                return this.balanceVAT
            } else {
                return {credit: 0, payment: 0}
            }
        },
        monthlyReturns() {
            if (this.monthlyReturn !== undefined) {
                return this.monthlyReturn
            } else if (this.$route.params.monthlyReturn) {
                return this.$route.params.monthlyReturn
            } else {
                return {}
            }
        },
    },

    watch: {
        'otherAmounts': 'onCalculate',
        'amountWhts': 'onCalculate',
        'amountPPIs': 'onCalculate',
        'balanceVATs': 'onCalculate',
        'amountBenefits': 'onCalculate',
        'amountTaxSalaries': 'onCalculate'
    },

    created () {},

    methods: {
        onUpdate() {
            this.$emit('getTotalAmountPaid', {amount: this.totalAmountPaid, summary: this.summary})
        },
        async onCalculate() {
            this.totalAmountPaid = kendo.parseFloat(this.amountTaxSalaries) + kendo.parseFloat(this.amountBenefits) + kendo.parseFloat(this.amountPPIs.balance) + kendo.parseFloat(this.amountWhts) + kendo.parseFloat(this.balanceVATs.payment) + kendo.parseFloat(this.otherAmounts.totalSp) + kendo.parseFloat(this.otherAmounts.totalPl) + kendo.parseFloat(this.otherAmounts.totalAccomTax)
            // window.console.log(this.monthlyReturn, 'monthly tax return summary')
            // await summaryHandler.getByMonthly(this.monthlyReturns.monthOf).then(res => {
            //     this.lSummary = res.data.data
            //     window.console.log(this.lSummary, 'load summary')
            // })
            this.summary = {
                id: `mr-${uuid.v1()}`,
                taxSalary: this.amountTaxSalaries,
                taxSalaryFB: this.amountBenefits,
                monthOf: this.monthlyReturns.monthOf,
                withholdingTax: this.amountWhts,
                vat: this.balanceVATs,
                ppi: this.amountPPIs,
                amountSp: this.otherAmounts.totalSp,
                amountAccomTax: this.otherAmounts.totalAccomTax,
                amountPl: this.otherAmounts.totalPl,
                otherTax: this.otherTax,
                isPaid: 0,
                total: this.totalAmountPaid
            }
            // if (this.lSummary.length > 0) {
            //     this.summary = this.lSummary[0]
            //     this.summary.total = this.totalAmountPaid
            //     this.summary.id = this.lSummary[0].id
            // } else {
            //
            // }

            this.onUpdate()
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n2`)
        },
    }
}
