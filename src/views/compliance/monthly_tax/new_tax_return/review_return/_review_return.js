/*
 * Last modified : 3/25/21, 11:26 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

// @vue/component
export default {
    name: 'Review_return',

    components: {
        Summary: () => import('./summary/Summary'),
        TaxCredit: () => import('./tax_credit/TaxCredit'),
        TaxSalary: () => import('./tax_salary/TaxSalary'),
        PurchaseRecord: () => import('./purchase_vat/PurchaseVat'),
        SaleRecord: () => import('./sale_vat/SaleVat'),
        VatSC: () => import('./vat_sc/VatSC'),
        WithholdingTax: () => import('./withholding_tax/WithholdingTax')
    },

    mixins: [],

    props: ['monthlyReturn'],

    data () {
        return {
            attrs: {
                class: 'mb-2',
                boilerplate: false,
                elevation: 1,
            },
        }
    },

    computed: {
        data() {
            if (this.monthlyReturn.id !== undefined) {
                return this.monthlyReturn
            }else {
                return {}
            }
        }
    },

    watch: {},

    created () {},

    methods: {}
}
