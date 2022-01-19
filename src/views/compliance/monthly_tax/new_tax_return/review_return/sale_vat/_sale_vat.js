/*
 * Last modified : 3/25/21, 11:36 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
const saleHandler = require("@/scripts/compliance/handler/saleHandler")
// @vue/component
export default {
    name: 'Sale_vat',

    components: {},

    mixins: [],

    props: ['monthlyReturn', 'sale'],

    data () {
        return {
            monthlySales: [
                {description: 'Sales include VAT 10%', type: 'Taxable person', amountNet: 0, amountVAT: 0},
                {description: 'Sales include VAT 10%', type: 'Non-taxable person', amountNet: 0, amountVAT: 0},
                {description: 'Export 0%', type: 'Oversee customer', amountNet: 0},
                {description: 'Sale Exclusive of VAT', type: 'Taxable Person', amountNet: 0},
                {description: 'Sale Exclusive of VAT', type: 'Non-taxable Person', amountNet: 0},
                {type: 'Total amount of input taxes', amountNet: 0, amountVAT: 0}
            ],
            isOverlay: false,
            sales: []
        }
    },

    computed: {
        data() {
            if (this.monthlyReturn.id !== undefined) {
                return this.monthlyReturn
            }else {
                return {}
            }
        },
        saleId() {
            if (this.$route.params.hasOwnProperty('sale')) {
                if (this.$route.params.sale.length > 0) {
                    return this.$route.params.sale
                }else {
                    return []
                }
            }else {
                return []
            }
        }
    },

    watch: {
        'saleId': 'initData'
    },

    created () {},

    async mounted() {
        await this.initData()
    },

    methods: {
        async initData() {
            if (this.$route.params.sale !== undefined) {
                this.sales = this.$route.params.sale
                window.console.log(this.sales)
            } else {
                await this.onLoadOneSale()
                await this.onCalculateSaleTax()
            }
        },
        async onLoadOneSale() {
            saleHandler.getByMrId(this.data.id).then(res => {
                this.sales = res.data.data
                window.console.log(this.sales)
            })

        },
        async onCalculateSaleTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let totalAmountNet = 0
                    let totalAmountVAT = 0
                    let amountNet1 = 0, amountVAT1 = 0,
                        amountNet2 = 0, amountVAT2 = 0,
                        amountNet3 = 0, amountNet4 = 0,
                        amountNet5 = 0
                    for (let i = 0; i < this.sales.length; i++) {
                        if (this.sales[i].customer.type.toLowerCase() === "individual" || this.sales[i].customer.type.toLowerCase() === 'taxable entity') {
                            if (this.sales[i].totalAmountInclusive > 0) {
                                amountNet1 += this.sales[i].totalAmountInclusive
                                    + this.sales[i].totalSpecificTax
                                    + this.sales[i].totalPubTax
                                    + this.sales[i].totalAccomTax
                            }
                            if (this.sales[i].totalAmountNetVat > 0) {
                                amountNet4 += this.sales[i].totalAmountNetVat
                            }
                            amountVAT1 += this.sales[i].totalVAT
                        }else if (this.sales[i].customer.type.toLowerCase() === 'non-taxable entity') {
                            if (this.sales[i].totalAmountInclusive > 0) {
                                amountNet2 += this.sales[i].totalAmountInclusive
                                    + this.sales[i].totalSpecificTax
                                    + this.sales[i].totalPubTax
                                    + this.sales[i].totalAccomTax
                            }
                            if (this.sales[i].totalAmountNetVat > 0) {
                                amountNet5 += this.sales[i].totalAmountNetVat
                            }
                        }else if (this.sales[i].customer.type.toLowerCase() === 'foreign entity') {
                            amountNet3 += this.sales[i].totalAmountInclusive
                                + this.sales[i].totalAmountNetVat
                                + this.sales[i].totalSpecificTax
                                + this.sales[i].totalPubTax
                                + this.sales[i].totalAccomTax
                        }
                    }
                    totalAmountNet = amountNet1 + amountNet2 + amountNet3 + amountNet4 + amountNet5
                    totalAmountVAT = amountVAT1 + amountVAT2
                    this.monthlySales[5].amountNet = totalAmountNet.toLocaleString()
                    this.monthlySales[5].amountVAT = totalAmountVAT.toLocaleString()

                    this.monthlySales[0].amountNet = amountNet1.toLocaleString()
                    this.monthlySales[0].amountVAT = amountVAT1.toLocaleString()

                    this.monthlySales[1].amountNet = amountNet2.toLocaleString()
                    this.monthlySales[1].amountVAT = amountVAT2.toLocaleString()

                    this.monthlySales[2].amountNet = amountNet3.toLocaleString()

                    this.monthlySales[3].amountNet = amountNet4.toLocaleString()

                    this.monthlySales[4].amountNet = amountNet5.toLocaleString()
                }, 200)
            })
        },
        viewSaleRecord() {
            this.$router.push({
                path: 'sale_record',
                name: 'Sale Record',
                query: {type: this.$route.query.type},
                params: {id: this.data.id, sales: this.sales, monthlyReturn: this.data}
            })
        }
    }
}
