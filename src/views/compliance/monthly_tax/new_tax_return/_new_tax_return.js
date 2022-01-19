/*
 * Last modified : 3/23/21, 4:47 PM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

// @vue/component
import MonthlyReturn from "@/scripts/compliance/model/MonthlyReturn";
// import MonthOfPicker from "@/components/kendo_templates/MonthOfPicker";

const monthlyReturn = new MonthlyReturn({})
const prefixHandler = require("@/scripts/compliance/handler/prefixHandler")
const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler")
export default {
    name: 'New_tax_return',

    components: {
        InputReturn: () => import('./input_return/InputReturn'),
        ReviewReturn: () => import('./review_return/ReviewReturn'),
        // 'app-monthpicker': MonthOfPicker,
    },

    mixins: [],

    props: {},

    data() {
        return {
            absolute: true,
            exChangeRate: 4200,
            returns: [],
            monthlyReturn: monthlyReturn,
            menu: false,
        }
    },

    computed: {
        DateState() {
            return !!(this.$route.params.id !== undefined || this.$route.query.type === 'edit' || this.$route.query.type === 'view');
        },
        overlay() {
            return !(this.$route.params.id !== undefined || this.$route.query.type === 'edit' || this.$route.query.type === 'view');
        },
        id() {
            if (this.$route.params.id !== undefined) {
                return this.$route.params.id
            } else {
                return ''
            }
        }
    },

    watch: {
        'id': 'initData'
    },

    async created() {
    },

    async mounted() {
        await this.loadPrefix()
        await this.initData()
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
        clear() {
            this.oneReturn = {}
            this.txn_date = new Date().toISOString().substr(0, 7)
        },
        async loadPrefix() {
            prefixHandler.get('monthly return').then(res => {
                if (res.data.statusCode === 200) {
                    // this.showLoading = false
                    this.transactionTypes = res.data.data
                    window.console.log(this.transactionTypes, 'trans')
                    if (this.transactionTypes.length > 0) {
                        window.console.log('123')
                        this.monthlyReturn.transactionType = this.transactionTypes[0]
                        window.console.log(this.transactionTypes[0], '789')
                        window.console.log(this.monthlyReturn.transactionType, '356')
                        // if (this.$route.params.id === undefined) {
                        //     this.generateNumber()
                        // }
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
                            await this.saveReturn()
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
        async saveReturn() {
            this.monthlyReturn.status = {id: 1, name: 'Drafted'}
            this.monthlyReturn.editDate = new Date().toISOString().substr(0, 10)
            this.monthlyReturn.amountPaid = 0
            this.monthlyReturn.exChangeRate = 4000
            // window.console.log(this.monthlyReturn)
            monthlyReturnHandler.create(this.monthlyReturn).then(res => {
                window.console.log(res)
                this.monthlyReturn = res.data.data
                this.$router.push({
                    path: 'new_tax_return' + `/${this.monthlyReturn.id}`,
                    name: 'New Tax Return',
                    params: {id: this.monthlyReturn.id},
                    query: {type: 'edit'}
                })
            }).catch(e => {
                window.console.error(e.message)
            })
        },
        onClose() {
            this.monthlyReturn = new MonthlyReturn({})
            this.$router.push({
                name: 'Compliance',
                path: 'compliance'
            })
            // this.$router.push({
            //     name: 'Compliance',
            //     path: 'compliance'
            // })
        }
    }
}
