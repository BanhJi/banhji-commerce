<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-tabs>
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
                        {{ $t('purchase') }}
                    </span>
                </v-tab>

                <v-tab-item>
                    <v-row>
                        <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <Sale :currency="currencies" :monthlyReturn="data" @getSale="getSale"/>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row>
                        <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <Purchase :currency="currencies" :monthlyReturn="data" @getPurchase="getPurchase"/>
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
        sales: [],
        purchases: [],
    }),
    props: ['monthlyReturn', 'currency'],
    methods: {
        getSale(sale) {
            this.sales = sale
            this.onUpdateSale()
            window.console.log('vat sale input', this.sales)
        },
        onUpdateSale() {
            this.$emit('getSale', this.sales)
        },
        getPurchase(purchase) {
            this.purchases = purchase
            this.onUpdatePurchase()
            window.console.log('vat purchase input', this.purchases)
        },
        onUpdatePurchase() {
            this.$emit('getPurchase', this.purchases)
        },
    },
    mounted() {
    },
    computed: {
        currencies() {
            if (this.currency) {
                return this.currency
            } else {
                return {}
            }
        },
        data() {
            if (this.monthlyReturn.id !== undefined) {
                return this.monthlyReturn
            } else {
                return {}
            }
        }
    },
    components: {
        Sale: () => import('./Sale'),
        Purchase: () => import('./Purchase'),

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
