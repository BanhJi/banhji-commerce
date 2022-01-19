/*
 * Last modified : 3/25/21, 11:41 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

// @vue/component
export default {
    name: 'Vat_sc',

    components: {},

    mixins: [],

    props: {},

    data () {
        return {
            vats: [
                {id: 1, description: 'MONTHLY PURCHASE (SATE CHARGE)'},
                {id: 2, description: 'Local purchase include VAT 10%', type: 'Taxable person', amountNet: 0, amountVAT: 0},
                {id: 3, description: 'Import 10%', type: 'Oversee suppliers', amountNet: 0, amountVAT: 0},
                {id: 4, amountNet: 'Total amount of input tax', amountVAT: 0},

                {id: 5, description: 'MONTHLY SALE (SATE CHARGE)'},
                {id: 6, description: 'Sale include VAT 10%', type: 'Taxable person', amountNet: 0, amountVAT: 0},
                {id: 7, description: 'Sale include VAT 10%', type: 'Non-taxable person', amountNet: 0, amountVAT: 0},
                {id: 8, amountNet: 'Total Amount of output tax', amountVAT: 0},

                {id: 9, amountNet: 'VAT state Charge/ (Credit forward)', amountVAT: 0}
            ],
            isOverlay: false
        }
    },

    computed: {},

    watch: {},

    created () {},

    methods: {}
}
