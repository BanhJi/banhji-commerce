<!--
  - Last modified : 4/6/21, 2:26 PM in Project banhji-accounting-web-module
  - Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
  - Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
  - Github Profile : https://github.com/Darith-Mokpost
  - Instagram Profile : https://www.instagram.com/chandarith_chea
  -->

<template>
    <v-row>
        <v-col sm="12" cols="12">
            <div style="background-color: #fff; padding: 0 0 5px;">
                <v-tabs vertical class="tab_small" slider-color="grayBg" slider-size="7">
                    <!-- <span class="hideAbs">
                        <v-icon size="16" class="arr_icon" @click="hideTabs" v-if="!isHide"
                        >mdi-chevron-left-circle
                        </v-icon>
                        <v-icon size="16" class="arr_icon1" @click="hideTabs" v-if="isHide"
                        >mdi-chevron-right-circle
                        </v-icon>
                    </span> -->
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down text-capitalize">
                            {{ $t('tax_credit') }}
                        </span>
                    </v-tab>
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down text-capitalize">
                            {{ $t('summary') }}
                        </span>
                    </v-tab>

                    <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-6 pt-0">
                                <TaxCredit @getBalancePPI="getBalancePPI" @getBalanceVAT="getBalanceVAT"
                                           :amountSaleExcul="amountSaleExculs" :monthlyReturn="monthlyReturns"
                                           :totalAmountPurchase="totalAmountPurchases" :amountSale="amountSales"
                                           :amountPurchaseExcul="amountPurchaseExculs"
                                           :balance="balances" @getStep="getStep"/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-6 pt-0">
                                <Summary :getSummary="getSummary" :amountBenefit="amountBenefits" :amountTaxSalary="amountSalaries" :balanceVAT="balanceVAT" :otherAmount="otherAmounts"
                                         :amountPPI="amountPPI" :amountWht="amountWhts" :monthlyReturn="monthlyReturns"
                                         @getTotalAmountPaid="getTotalAmountPaid"/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-col>
    </v-row>
</template>

<script>
// const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler")
export default {
    name: 'Sales',
    data: () => ({
        isHide: false,
        balances: [],
        amountPPI: {},
        balanceVAT: {}
    }),
    props: ['monthlyReturn', 'amountSale', 'amountBenefit', 'totalAmountPurchase', 'amountPurchaseExcul', 'amountSalary', 'amountWht', 'amountSaleExcul', 'otherAmount'],
    // watch: {
    //     'amounts': 'addTxn'
    // },
    async mounted() {
        // await this.getBalance()
    },
    methods: {
        getSummary(summary) {
            this.onUpdateSummary(summary)
            window.console.log('confirm tab summary get', summary)
        },
        getTotalAmountPaid(amount) {
            window.console.log('confirm tab amount paid', amount)
            this.onUpdateAmount(amount)
        },
        getBalanceVAT(amount) {
            this.balanceVAT = amount
            this.onUpdateBalanceVat(amount)
        },
        getBalancePPI(amount) {
            this.amountPPI = amount
            this.onUpdateBalancePpi(amount)
        },
        getStep(step) {
            this.onUpdate(step)
        },
        onUpdateSummary(summary) {
            window.console.log('confirm tab summary update')
            this.$emit('getSummary', summary)
        },
        onUpdateBalanceVat(amount) {
            this.$emit('getBalanceVat', amount)
        },
        onUpdateBalancePpi(amount) {
            this.$emit('getBalancePpi', amount)
        },
        onUpdateAmount(amount) {
            this.$emit('getTotalAmountPaid', amount)
        },
        onUpdate(step) {
            this.$emit('getStep', step)
        },
        clickMe(data) {
            // alert(data.link)
            this.$router.push(`${data.link}`);
            //this.$event.target.classList.toggle(active)
            //eslint-disable-next-line no-console
            console.log(data.link)
            //eslint-disable-next-line no-console
            //console.log(data)
        },
        hideTabs() {
            this.isHide = !this.isHide;
        },
    },
    components: {
        TaxCredit: () => import('./TaxCredit'),
        Summary: () => import('./Summary'),
    },
    computed: {
        monthlyReturns() {
            if (this.monthlyReturn !== undefined) {
                return this.monthlyReturn
            } else {
                return {}
            }
        },
        otherAmounts() {
            if (this.otherAmount !== undefined) {
                return this.otherAmount
            } else {
                return {}
            }
        },
        amountSaleExculs() {
            if (this.amountSaleExcul !== undefined) {
                return this.amountSaleExcul
            } else {
                return 0
            }
        },
        amountSales() {
            if (this.amountSale !== undefined) {
                return this.amountSale
            } else {
                return 0
            }
        },
        totalAmountPurchases() {
            if (this.totalAmountPurchase !== undefined) {
                return this.totalAmountPurchase
            } else {
                return 0
            }
        },
        amountPurchaseExculs() {
            if (this.amountPurchaseExcul !== undefined) {
                return this.amountPurchaseExcul
            } else {
                return 0
            }
        },
        amountWhts() {
            if (this.amountWht !== undefined) {
                return this.amountWht
            } else {
                return 0
            }
        },
        amountSalaries() {
            if (this.amountSalary) {
                return this.amountSalary
            } else {
                return 0
            }
        },
        amountBenefits() {
            if (this.amountBenefit) {
                return this.amountBenefit
            } else {
                return 0
            }
        }
    },
};
</script>
<style scoped>
.v-tab--active {
    background-color: rgb(255, 255, 255);
}

.v-tab {
    justify-content: left;
    font-size: 16px;
}

.tab_setting .v-tab--active {
    font-weight: 700;
    color: #000;
}

.v-tab--active {
    background-color: #ffffff !important;
    border-bottom: 4px solid #92d050;
    border-left: none;
}

.tab_product_service_show.theme--light .v-slide-group__content {
    width: 140px !important;
}

</style>
