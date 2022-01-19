/*
 * Last modified : 3/30/21, 9:00 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
import MonthlyReturn from "@/scripts/compliance/model/MonthlyReturn";

const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler")
const monthlyReturn = new MonthlyReturn({})
const purchaseHandler = require("@/scripts/compliance/handler/purchaseHandler")
// @vue/component
export default {
    name: 'Purchase_record',

    components: {},

    mixins: [],

    props: {},

    data () {
        return {
            progress_load: true,
            text_load: 'Loading... Please wait!!!',
            headersPurchase: [
                {
                    text: 'No',
                    value: 'no',
                    align: 'center',
                },
                {
                    text: 'Date',
                    value: 'date',
                    align: 'center',
                },
                {
                    text: 'Reference',
                    value: 'reference',
                    align: 'center',
                },
                {
                    text: 'type',
                    value: 'supportType',
                    align: 'center',
                },
                {
                    text: 'TID',
                    value: 'tin',
                    align: 'center',
                },
                {
                    text: 'Name in Khmer',
                    value: 'supportNameKm',
                    align: 'center',
                },
                {
                    text: 'Name in English',
                    value: 'supportNameEn',
                    align: 'center',
                },
                {
                    text: 'Type of product/service',
                    value: 'typeProduct',
                    align: 'center',
                },
                {
                    text: 'Amount (net Inclusive)',
                    value: 'amountInclusive',
                    align: 'center',
                },
                {
                    text: 'Amount (net of VAT)',
                    value: 'amountNetVat',
                    align: 'center',
                },
                {
                    text: 'Amount VAT',
                    value: 'amountVAT',
                    align: 'center',
                },
                {
                    text: 'Data Source',
                    value: 'dataForm',
                    align: 'center',
                },
                {
                    text: 'Status',
                    value: 'status',
                    align: 'center',
                },
                {
                    text: 'Action',
                    value: 'action',
                    align: 'center',
                },
            ],
            monthlyReturn: monthlyReturn,
            menu: false,
            purchases: [],
        }
    },

    computed: {
        isDisable() {
            if (this.monthlyReturn.hasOwnProperty('status')) {
                if (this.monthlyReturn.status.id === 1) {
                    if (this.$route.query.type === 'edit') {
                        return false
                    } else if (this.$route.query.type === 'view') {
                        return true
                    } else {
                        return true
                    }
                } else {
                    return true
                }
            } else {
                return true
            }
        },
        id() {
            if (this.$route.params.id !== undefined) {
                return this.$route.params.id
            }else {
                return ''
            }
        }
    },

    watch: {},

    created () {},

    async mounted() {
        await this.initData()
        await this.onloadPurchase()
    },

    methods: {
        deleteItemPurchases() {},
        onCreatePurchase() {
            this.$router.push({
                name: 'Add Purchase',
                path: 'add_purchase/' + this.monthlyReturn.id,
                params: {id: this.monthlyReturn.id, monthlyReturn: this.monthlyReturn},
                query: {type: this.$route.query.type}
            });
        },
        async initData() {
            if (this.$route.params.id !== undefined && this.$route.params.monthlyReturn === undefined) {
                await this.onLoadOneReturn()
                window.console.log(this.$route.params)
            } else if (this.$route.params.monthlyReturn !== undefined) {
                this.monthlyReturn = this.$route.params.monthlyReturn
            } else {
                this.clear()
            }
        },
        async onLoadOneReturn() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    const id = this.$route.params.id
                    monthlyReturnHandler.getOne(id).then(res => {
                        this.monthlyReturn = res.data.data[0]
                    })
                })
            })
        },
        async onloadPurchase() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    purchaseHandler.getByMrId(this.$route.params.id).then(res => {
                        this.purchases = res.data.data
                        window.console.log(this.purchases)
                    })
                }, 200)
            })
        },
        async editItemPurchase(item) {
            window.console.log(item, 'item')
            this.$router.push({
                name: 'Add Purchase',
                path: 'add_purchase/' + this.monthlyReturn.id + '/' + item.id,
                params: {id: this.monthlyReturn.id, purchase: item.id, purchases: item, monthlyReturn: this.monthlyReturn},
                query: {type: this.$route.query.type}
            });
        },
        onClose() {
            this.$router.push({
                name: 'New Tax Return',
                path: 'new_tax_return',
                query: {type: this.$route.query.type},
                params: {id : this.monthlyReturn.id, monthlyReturn: this.monthlyReturn}
            })
        },
    }
}
