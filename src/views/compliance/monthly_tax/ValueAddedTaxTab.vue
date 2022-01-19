<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-tabs>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-uppercase">
                        {{ $t('output') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-uppercase">
                        {{ $t('input') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-uppercase">
                        {{ $t('state_change') }}
                    </span>
                </v-tab>
                <v-tab-item>
                    <v-row>
                        <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <Output :sales="sales"/>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row>
                        <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <Input :purchases="purchases"/>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row>
                        <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <StageChange :sales="sales" :purchases="purchases"/>
                        </v-col>
                    </v-row>
                </v-tab-item>
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>

const saleHandler = require("@/scripts/compliance/handler/saleHandler")
const purchaseHandler = require("@/scripts/compliance/handler/purchaseHandler")
export default {
    data: () => ({
        sales: [],
        purchases: [],
    }),
    props: {},
    methods: {
        async onloadSale() {
            await saleHandler.getAll().then(async res => {
                this.sales = res.data.data
            })
        },
        async onloadPurchase() {
            await purchaseHandler.getAll().then(async res => {
                this.purchases = res.data.data
            })
        }
    },
    async mounted() {
        // await this.onloadSale()
        // await this.onloadPurchase()
    },
    computed: {},
    components: {
        Output: () => import('./value_add_tax/Output'),
        Input: () => import('./value_add_tax/Input'),
        StageChange: () => import('./value_add_tax/StateChange'),
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
</style>
