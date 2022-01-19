/*
 * Last modified : 3/25/21, 11:42 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

// @vue/component
export default {
    name: 'Withholding_tax',

    components: {},

    mixins: [],

    props: ['monthlyReturn'],

    data () {
        return {
            withholdingTax: [
                {withholding_taxDesc: 'WITHHOLDING TAX ON RESIDENT'},
                {
                    withholding_taxDesc: 'Performance of service or royalty for intangibles, interests in minerals',
                    tax_rate: '15%',
                    amount: 0,
                    class: 'text-right'
                },
                {
                    withholding_taxDesc: 'Payment of interest to non-bank or saving institutions tax payers',
                    tax_rate: '15%',
                    amount: 0,
                    class: 'text-right'
                },
                {
                    withholding_taxDesc: 'Payment of interest to taxpayers who have fixed term deposit accounts',
                    tax_rate: '6%',
                    amount: 0,
                    class: 'text-right'
                },
                {
                    withholding_taxDesc: 'Payment of interest to taxpayers who have non-fixed term saving',
                    tax_rate: '4%',
                    amount: 0,
                    class: 'text-right'
                },
                {
                    withholding_taxDesc: 'Payment of rental/lease of movable & immovable property',
                    type: 'Legal Person',
                    tax_rate: '10%',
                    amount: 0,
                    class: 'text-right'
                },
                {
                    withholding_taxDesc: 'Payment of rental/lease of movable & immovable property',
                    type: 'Physical Person',
                    tax_rate: '10%',
                    amount: 0,
                    class: 'text-right'
                },
                {tax_rate: 'TOTAL', amount: 0, class: 'green--text text-right text-bold'},
                {withholding_taxDesc: 'WITHHOLDING TAX ON NON-RESIDENT'},
                {
                    withholding_taxDesc: 'Payment of interest',
                    tax_rate: '14%',
                    amount: 0,
                    class: 'text-right'
                },
                {
                    withholding_taxDesc: 'Payment of royalty, rental/leasing, and income related to the use of property',
                    tax_rate: '14%',
                    amount: 0,
                    class: 'text-right'
                },
                {
                    withholding_taxDesc: 'Payment of management fee and technical services',
                    tax_rate: '14%',
                    amount: 0,
                    class: 'text-right'
                },
                {withholding_taxDesc: 'Payment of dividend', tax_rate: '14%', amount: 0, class: 'text-right'},
                {withholding_taxDesc: 'Service', tax_rate: '14%', amount: 0, class: 'text-right'},
                {tax_rate: 'TOTAL', amount: 0, class: 'green--text text-right text-bold'},
            ],
            isOverlay: false
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
    },

    watch: {},

    created () {},

    methods: {
        viewWithholdingTaxRecord() {
            this.$router.push({
                path: 'withholding_tax_record',
                name: 'Withholding Tax Record',
                query: {type: this.$route.query.type},
                params: {id: this.monthlyReturns.id, monthlyReturn: this.monthlyReturns}
            })
        }
    }
}
