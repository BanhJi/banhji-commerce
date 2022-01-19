<!--
  - Last modified : 4/6/21, 1:48 PM in Project banhji-accounting-web-module
  - Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
  - Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
  - Github Profile : https://github.com/Darith-Mokpost
  - Instagram Profile : https://www.instagram.com/chandarith_chea
  -->

<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-tabs>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-uppercase">
                        {{$t('ppi')}}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-uppercase">
                        {{$t('vat')}}
                    </span>
                </v-tab>
                <v-tab-item>
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                <PPI :monthlyReturn="monthly" :amountSaleExcul="amountSaleExculs" @getBalancePPI="getBalancePPI" @onUpdate="getStep"/>
                            </v-col>
                        </v-row>
                </v-tab-item>
                <v-tab-item>
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                <VAT :monthlyReturn="monthly" @getBalanceVAT="getBalanceVAT" :amountPurchaseExcul="amountPurchaseExculs" :totalAmountPurchase="totalAmountPurchases" :amountSale="amountSales"/>
                            </v-col>
                        </v-row>
                </v-tab-item>
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
 export default {
        data: () => ({
            step: 0,
            balancePPI: {},
            balanceVAT: {},
        }),
        props: ['monthlyReturn', 'amountSaleExcul', 'amountSale', 'totalAmountPurchase', 'amountPurchaseExcul'],
        methods: {
            getBalancePPI(amount) {
                this.balancePPI = amount
                this.onUpdateBalancePPI()
            },
            getBalanceVAT(amount) {
                this.balanceVAT = amount
                this.onUpdateBalanceVAT()
            },
            getStep(step) {
                this.step = step
                this.onUpdate()
            },
            onUpdateBalancePPI() {
                this.$emit('getBalancePPI', this.balancePPI)
            },
            onUpdateBalanceVAT() {
                this.$emit('getBalanceVAT', this.balanceVAT)
            },
            onUpdate() {
                this.$emit('getStep', this.step)
            },
        },
        async mounted() {
        },
        computed: {
            monthly() {
                if (this.monthlyReturn.id !== undefined) {
                    return this.monthlyReturn
                } else {
                    return {}
                }
            },
            amountSales() {
                if (this.amountSale !== undefined) {
                    window.console.log(this.amountSale)
                    return this.amountSale
                } else {
                    return 0
                }
            },
            amountSaleExculs() {
                if (this.amountSaleExcul !== undefined) {
                    return this.amountSaleExcul
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
        },
        components: {
            PPI: () => import('./tax_credit/PPI'),
            VAT: () => import('./tax_credit/VAT'),
        },
    };
</script>

<style scoped>
    .v-tab--active {
        background-color: #E5EFFA;
        color: #000;
    }
    .v-tab {
        min-width: 30px;
        font-size: 17px;
        text-transform: capitalize;
    }
    .theme--light.v-tabs >>> .v-tabs-bar {
        border-bottom: 1px solid #ddd !important;
    }
</style>
