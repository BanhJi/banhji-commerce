<template>
    <v-row>
        <v-container class="px-0 pt-4 body-app" >
            <v-card outlined dense color="white" class=" no_border" elevation="0" height="680" style="overflow-y: auto;">
                <v-col sm="12" cols="12" class="">
                    <v-icon
                        @click="close()"
                        style="cursor: pointer; font-size: 30px;"
                        color="grey"
                        class="float-right mt-n1">close
                    </v-icon>
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
            </v-card>
        </v-container>
    </v-row>
</template>

<script>
    export default {
        data: () => ({}),
        props: {},
        methods: {
            close() {
                this.$router.go(-1);
            },
        },
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
    @media (min-width: 1264px){
    .body-app {
        max-width: 1110px;
        }
    }
    @media (min-width: 1904px){
        .body-app {
            max-width: 1440px;
        }
    }
</style>
