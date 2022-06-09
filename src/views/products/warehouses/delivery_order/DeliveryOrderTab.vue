<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-tabs>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-uppercase">
                        {{$t('delivery_order')}}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-uppercase">
                        {{$t('delivery_agency')}}
                    </span>
                </v-tab>
                <v-tab-item>
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                <DeliveryOrder/>
                            </v-col>
                        </v-row>
                </v-tab-item>
                <v-tab-item>
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                <DeliveryAgency/>
                            </v-col>
                        </v-row>
                </v-tab-item>
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        data: () => ({}),
        props: {},
        methods: {},
        mounted() {
        },
        computed: {},
        components: {
            DeliveryOrder: ()=> import('./DeliveryOrders'),
            DeliveryAgency: () => import('./DeliveryAgency'),
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
