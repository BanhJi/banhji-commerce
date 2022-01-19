/*
 * Last modified : 3/25/21, 11:38 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
const purchaseHandler = require("@/scripts/compliance/handler/purchaseHandler")
// @vue/component
export default {
    name: 'Purchase_vat',

    components: {},

    mixins: [],

    props: ['monthlyReturn'],

    data () {
        return {
            monthlyPurchases: [
                {description: 'Local purchase include VAT 10%', type: 'Taxable person', amountNet: 0, amountVAT: 0},
                {description: 'Import 10%', type: 'Oversee suppliers', amountNet: 0, amountVAT: 0},
                {description: 'Purchase Exclusive of VAT', type: 'Taxable person', amountNet: 0},
                {description: 'Purchase Exclusive of VAT', type: 'Non-taxable person', amountNet: 0},
                {description: 'Non creditable purchase', amountNet: 0},
                {type: 'Total amount of input taxes', amountVAT: 0}
            ],
            purchases: [],
        }
    },

    computed: {
        monthlyReturns() {
            if (this.monthlyReturn.id !== undefined) {
                return this.monthlyReturn
            }else {
                return {}
            }
        },
        purchaseId() {
            if (this.$route.params.hasOwnProperty('purchase')) {
                if (this.$route.params.purchase.length > 0) {
                    return this.$route.params.purchase
                }else {
                    return []
                }
            }else {
                return []
            }
        }
    },

    watch: {
        'purchaseId': 'initData'
    },

    created () {},

    async mounted() {
        await this.initData()
    },

    methods: {
        async initData() {
            if (this.$route.params.purchase !== undefined) {
                this.purchases = this.$route.params.purchase
            } else {
                await this.onLoadOnePurchase()
                await this.onCalculatePurchaseTax()
            }
        },
        async onLoadOnePurchase() {
            purchaseHandler.getByMrId(this.monthlyReturns.id).then(res => {
                this.purchases = res.data.data
            })

        },
        async onCalculatePurchaseTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let totalAmountVAT = 0
                    let amountInclusive1 = 0, amountInclusive2 = 0
                    let amountNet1 = 0, amountVAT1 = 0, amountNet2 = 0, amountVAT2 = 0, amountNet3 = 0
                    for (let i = 0; i < this.purchases.length; i++) {
                        if (this.purchases[i].supplier.nature.toLowerCase() === "individual" || this.purchase[i].supplier.nature.toLowerCase() === 'taxable entity') {
                            if (this.purchases[i].totalAmountInclusive > 0) {
                                amountInclusive1 += this.purchases[i].totalAmountInclusive
                                amountVAT1 += this.purchases[i].totalVAT
                            } else if (this.purchases[i].totalAmountNetVat > 0) {
                                if (this.purchases[i].typeProduct.code === 4) {
                                    amountNet1 += this.purchases[i].totalAmountNetVat
                                } else {
                                    amountNet2 += this.purchases[i].totalAmountNetVat
                                }
                            }
                        } else if (this.purchases[i].supplier.nature.toLowerCase() === 'non-taxable entity') {
                            amountNet3 += this.purchases[i].totalAmountNetVat
                        } else if (this.purchases[i].supplier.nature.toLowerCase() === 'foreign entity') {
                            if (this.purchases[i].totalAmountInclusive > 0) {
                                amountInclusive2 += this.purchases[i].totalAmountInclusive
                                amountVAT2 += this.purchases[i].totalVAT
                            }
                        }
                    }
                    totalAmountVAT = amountVAT1 + amountVAT2
                    this.monthlyPurchases[0].amountNet = amountInclusive1.toLocaleString()
                    this.monthlyPurchases[0].amountVAT = amountVAT1.toLocaleString()
                    this.monthlyPurchases[1].amountNet = amountInclusive2.toLocaleString()
                    this.monthlyPurchases[1].amountVAT = amountVAT2.toLocaleString()
                    this.monthlyPurchases[2].amountNet = amountNet2.toLocaleString()
                    this.monthlyPurchases[3].amountNet = amountNet3.toLocaleString()
                    this.monthlyPurchases[4].amountNet = amountNet1.toLocaleString()
                    this.monthlyPurchases[5].amountVAT = totalAmountVAT.toLocaleString()
                }, 200)
            })
        },
        viewPurchaseRecord() {
            this.$router.push({
                path: 'purchase_record',
                name: 'Purchase Record',
                query: {type: this.$route.query.type},
                params: {id: this.monthlyReturns.id, monthlyReturn: this.monthlyReturns}
            })
        }
    }
}
