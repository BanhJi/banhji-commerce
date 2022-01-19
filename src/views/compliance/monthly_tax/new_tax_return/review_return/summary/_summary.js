/*
 * Last modified : 3/25/21, 11:33 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

// @vue/component
export default {
    name: 'Summary',

    components: {},

    mixins: [],

    props: {},

    data () {
        return {
            summaries: [
                {index: 1, type_tax_declared: 'Tax on Salary', credit_carried: '', tax_to_paid: ''},
                {index: 2, type_tax_declared: 'Tax on Salary on Fringe Benefit', credit_carried: '', tax_to_paid: ''},
                {index: 3, type_tax_declared: 'Withholding Tax', credit_carried: '', tax_to_paid: ''},
                {index: 4, type_tax_declared: 'Value Added Tax (VAT)', credit_carried: '', tax_to_paid: ''},
                {index: 5, type_tax_declared: 'Prepayment of Tax on Income', credit_carried: '', tax_to_paid: ''},
                {
                    index: 6,
                    type_tax_declared: 'Specific Tax on certain merchandize & service',
                    credit_carried: '',
                    tax_to_paid: ''
                },
                {index: 7, type_tax_declared: 'Accommodation Tax', credit_carried: '', tax_to_paid: ''},
                {index: 8, type_tax_declared: 'Public for Lighting Tax', credit_carried: '', tax_to_paid: ''},
                {index: '', type_tax_declared: 'TOTAL', credit_carried: '', tax_to_paid: 0}
            ],
            sales: [],
            purchases: [],
            withholdings: [],
            totalAmtVAT: 0,
            isOverlay: true
        }
    },

    computed: {},

    watch: {},

    created () {},

    methods: {}
}
