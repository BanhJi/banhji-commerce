<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pa-0">
            <v-col sm="12" cols="12" class="tab_wrapper py-0">
                <v-tabs>
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                         <span class="hidden-sm-and-down text-capitalize">
                            {{$t('bin')}}
                        </span>
                    </v-tab>
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down text-capitalize">
                            {{$t('transactions')}}
                        </span>
                    </v-tab>
                    <v-tab-item>
                            <v-row>
                                <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                    <Bin/>
                                </v-col>
                            </v-row>
                    </v-tab-item>
                    <v-tab-item>
                            <v-row>
                                <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                    <Transactions/>
                                </v-col>
                            </v-row>
                    </v-tab-item>
                </v-tabs>
            </v-col>
        </v-col>
    </v-row>
</template>

<script>
    import Bin from './Bin.vue'
    import Transactions from './Transactions.vue'

    export default {
        data: () => ({
        }),
        mounted() {
        },
        computed: {
        },
        components: {
            Bin,
            Transactions
        },
    };
</script>
<style scoped>
    .v-tab--active{
        background-color: #E5EFFA;
        color: #000;
    }
    .v-tab {
        min-width: 30px;
        font-size: 17px;
        text-transform: capitalize;
    }
    @media (max-width: 576px) {

    }
</style>