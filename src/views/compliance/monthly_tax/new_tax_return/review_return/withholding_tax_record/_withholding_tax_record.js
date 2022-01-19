/*
 * Last modified : 3/31/21, 9:34 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
import MonthlyReturn from "@/scripts/compliance/model/MonthlyReturn";
const withholdingHandler = require("@/scripts/compliance/handler/withholdingTaxHandler")
const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler")
const monthlyReturn = new MonthlyReturn({})
// @vue/component
export default {
    name: 'Withholding_tax_record',

    components: {},

    mixins: [],

    props: {},

    data () {
        return {
            progress_load: true,
            text_load: 'Loading... Please wait!!!',
            headersWithholding: [
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
                    text: 'Invoice',
                    value: 'invoice',
                    align: 'center'
                },
                {
                    text: 'Nature Withholding Tax',
                    value: 'natureWithholdingType',
                    align: 'center'
                },
                {
                    text: 'Type',
                    value: 'recipientType',
                    align: 'center'
                },
                {
                    text: 'Taxpayer Type',
                    value: 'taxPayerType',
                    align: 'center'
                },
                {
                    text: 'TIN/BIN/TID',
                    value: 'tin',
                    align: 'center'
                },
                {
                    text: 'Name',
                    value: 'withholdingNameKm',
                    align: 'center'
                },
                {
                    text: 'Type Withholding Tax',
                    value: 'typeWithholdingTax',
                    align: 'center'
                },
                {
                    text: 'Amount',
                    value: 'amount',
                    align: 'center'
                },{
                    text: 'Amount WHT',
                    value: 'amountWHT',
                    align: 'center'
                },{
                    text: 'Data Source',
                    value: 'dataForm',
                    align: 'center'
                },{
                    text: 'Status',
                    value: 'status',
                    align: 'center'
                },
                {
                    text: 'Action',
                    value: 'action',
                    align: 'center'
                },
            ],
            monthlyReturn: monthlyReturn,
            withholdingTaxs: [],
            menu: false,
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
        await this.onloadWithholding()
    },

    methods: {
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
        async onloadWithholding() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    withholdingHandler.getByMrId(this.$route.params.id).then(res => {
                        this.withholdingTaxs = res.data.data
                    })
                }, 200)
            })
        },
        editItemWithholding(item) {
            this.$router.push({
                name: 'Add Withholding Tax',
                path: 'add_withholding_tax/' + this.monthlyReturn.id + '/' + item.id,
                params: {id: this.monthlyReturn.id, withholding: item.id, withholdings: item, monthlyReturn: this.monthlyReturn},
                query: {type: this.$route.query.type}
            });
        },
        deleteItemWithholdings() {},
        onCreateWithholding() {
            this.$router.push({
                name: 'Add Withholding Tax',
                path: 'add_withholding_tax/' + this.monthlyReturn.id,
                params: {id: this.monthlyReturn.id, monthlyReturn: this.monthlyReturn},
                query: {type: this.$route.query.type}
            });
        },
    }
}
