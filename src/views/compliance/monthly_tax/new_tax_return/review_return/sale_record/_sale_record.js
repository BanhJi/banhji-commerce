/*
 * Last modified : 3/25/21, 1:44 PM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

// @vue/component
import MonthlyReturn from "@/scripts/compliance/model/MonthlyReturn";
const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler")
const saleHandler = require("@/scripts/compliance/handler/saleHandler")
const monthlyReturn = new MonthlyReturn({})
export default {
    name: 'Sale_record',

    components: {},

    mixins: [],

    props: {},

    data () {
        return {
            menu: false,
            progress_load: true,
            titleSale: '',
            text_load: "Loading... Please wait!!!",
            addSale_date: new Date().toISOString().substr(0, 10),
            menuJDate: false,
            absolute: true,
            overlay: true,
            gridSale: [],
            headersSale: [
                {
                    text: "No",
                    value: "no",
                    align: "center",
                },
                {
                    text: "Date",
                    value: "date",
                    align: "center",
                },
                {
                    text: "Reference",
                    value: "reference",
                    align: "center",
                },
                {
                    text: "type",
                    value: "customerType",
                    align: "center",
                },
                {
                    text: "TID",
                    value: "tin",
                    align: "center",
                },
                {
                    text: "Name in Khmer",
                    value: "customerNameKm",
                    align: "center",
                },
                {
                    text: "Name in English",
                    value: "customerNameEn",
                    align: "center",
                },
                {
                    text: "Type of product/service",
                    value: "typeProduct",
                    align: "center",
                },
                {
                    text: "Amount (net Inclusive)",
                    value: "totalAmountInclusive",
                    align: "center",
                },
                {
                    text: "Amount (net of VAT)",
                    value: "totalAmountNetVat",
                    align: "center",
                },
                {
                    text: "Specific Tax on certain Merchandises and services",
                    value: "totalSpecificTax",
                    align: "center",
                },
                {
                    text: "Public Lighting Tax",
                    value: "totalPubTax",
                    align: "center",
                },
                {
                    text: "Accom Tax",
                    value: "totalAccomTax",
                    align: "center",
                },
                {
                    text: "Amount VAT",
                    value: "totalVAT",
                    align: "center"
                },
                {
                    text: "Source",
                    value: "dataForm",
                },
                {
                    text: "Status",
                    value: "status",
                },
                {
                    text: "Action",
                    value: "actions",
                    align: "center",
                },
            ],
            menuJDateAddSale: false,
            dialogSale: false,
            dialogAddSale: false,

            amountSp: 0,
            amountPlt: 0,
            amountAt: 0,
            amountNetVat: 0,
            amountInclusiveVat: 0,
            totalVat: 0,

            amt: [],

            customers: [],
            sales: [],

            downloadLoading: false,
            listLoading: true,
            monthlyReturn: monthlyReturn
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
    watch: {
        'id': 'initData'
    },

    created () {},

    async mounted() {
        await this.initData()
        await this.onloadSale()
    },

    methods: {
        onCreateSale() {
            this.$router.push({
                name: 'Add Sale',
                path: 'add_sale/' + this.monthlyReturn.id,
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
        async onloadSale() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    saleHandler.getByMrId(this.$route.params.id).then(res => {
                        this.sales = res.data.data
                        window.console.log(this.sales)
                    })
                }, 200)
            })
        },
        async editItemSale(item) {
            window.console.log(item, 'item')
            this.$router.push({
                name: 'Add Sale',
                path: 'add_sale/' + this.monthlyReturn.id + '/' + item.id,
                params: {id: this.monthlyReturn.id, sale: item.id, sales: item, monthlyReturn: this.monthlyReturn},
                query: {type: this.$route.query.type}
            });
        },
        onClose() {
            this.$router.push({
                name: 'New Tax Return',
                path: 'new_tax_return',
                query: {type: this.$route.query.type},
                params: {id : this.monthlyReturn.id, sale: this.sales, monthlyReturn: this.monthlyReturn}
            })
        },
    }
}
