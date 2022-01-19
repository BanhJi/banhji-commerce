/*
 * Last modified : 3/25/21, 11:40 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

// @vue/component
export default {
    name: 'Tax_credit',

    components: {},

    mixins: [],

    props: {},

    data () {
        return {
            ppiTC: [
                {description: 'Prepayment of Tax on Income', amount: ''},
                {description: 'Credit carried last month', amount: ''},
                {description: 'PPI to be paid/ (Credit Forward)', amount: ''}
            ],
            vatTC: [
                {description: 'Tax credit carried from last month'},
                {description: 'Total amount of input tax'},
                {description: 'Total amount of output tax'},
                {description: 'VAT to be paid/ (Credit Forward)'},
                {description: 'VAT Refund'}
            ],
        }
    },

    computed: {},

    watch: {},

    created () {},

    methods: {}
}
