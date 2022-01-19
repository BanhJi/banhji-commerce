<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-tabs>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t('purchase') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t('sale') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t('state_charge') }}
                    </span>
                </v-tab>
                <v-tab-item>
                    <v-row>
                        <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <Purchase :purchase="purchases" @getTotalAmountPurchase="getTotalAmountPurchase" @getAmountPurchaseExcul="getAmountPurchaseExcul"/>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row>
                        <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <Sale :sale="sales" @getOtherAmount="getOtherAmount" @getAmountSale="getAmountSale" @getAmountSaleExcul="getAmountSaleExcul"/>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row>
                        <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <StageChange :sale="sales" :purchase="purchases"/>
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
        amountSale: 0,
        amountSaleExcul: 0,
        amountPurchase: 0,
        amountSCS: false,
        amountSCP: false,
        otherAmount: {},
    }),
    props: ['sale', 'purchase'],
    methods: {
        getTotalAmountPurchase(purchase) {
            this.onUpdateP(purchase)
        },
        getAmountPurchaseExcul(amount) {
            this.onUpdatePExcul(amount)
        },
        getAmountSaleExcul(saleExcul) {
            this.onUpdateSExcul(saleExcul)
        },
        getOtherAmount(otherAmount) {
            this.onUpdateOtherAmount(otherAmount)
        },
        getAmountSale(sale) {
            window.console.log(sale, 'sale123')
            this.onUpdateS(sale)
        },
        onUpdateOtherAmount(otherAmount) {
            this.$emit('getOtherAmount', otherAmount)
        },
        onUpdateS(sale) {
            this.$emit('getAmountSale', sale)
        },
        onUpdateSExcul(amount) {
            this.$emit('getAmountSaleExcul', amount)
        },
        onUpdateP(purchase) {
            this.$emit('getTotalAmountPurchase', purchase)
        },
        onUpdatePExcul(purchase) {
            this.$emit('getAmountPurchaseExcul', purchase)
        },

    },
    mounted() {
    },
    computed: {
        sales() {
            if (this.sale !== undefined) {
                window.console.log('value add sale', this.sale)
                return this.sale
            } else {
                return []
            }
        },
        purchases() {
            if (this.purchase !== undefined) {
                return this.purchase
            } else {
                return []
            }
        },
    },
    components: {
        Purchase: () => import('./value_add_tax/Purchase'),
        Sale: () => import('./value_add_tax/Sale'),
        StageChange: () => import('./value_add_tax/StageChange'),
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
