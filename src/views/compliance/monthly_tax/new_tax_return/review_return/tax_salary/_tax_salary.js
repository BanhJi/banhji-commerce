/*
 * Last modified : 3/25/21, 11:39 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

// @vue/component
export default {
    name: 'Tax_salary',

    components: {},

    mixins: [],

    props: {},

    data () {
        return {
            taxSalary: [
                {no_of_employees: 'TAX ON SALARY FOR RESIDENT EMPLOYEES'},
                {tax_rate: '0%'},
                {tax_rate: '5%'},
                {tax_rate: '10%'},
                {tax_rate: '15%'},
                {tax_rate: '20%'},
                {no_of_employees: 'TOTAL'},
                {no_of_employees: 'TAX ON SALARY FOR NON-RESIDENT EMPLOYEES'},
                {tax_rate: '20%'},
                {no_of_employees: 'TAX ON SALARY ON FRINGE BENEFIT'},
                {tax_rate: '20%'}
            ],
        }
    },

    computed: {},

    watch: {},

    created () {},

    methods: {}
}
