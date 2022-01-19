<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-tabs>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-uppercase">
                        {{$t('sale')}}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-uppercase">
                        {{$t('purchase')}}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-uppercase">
                        {{$t('salary')}}
                    </span>
                </v-tab>
<!--                <v-tab>-->
<!--                    <span class="hidden-sm-and-up">-->
<!--                        <v-icon left>mdi-pen</v-icon>-->
<!--                    </span>-->
<!--                    <span class="hidden-sm-and-down text-capitalize">-->
<!--                        {{$t('fbt')}}-->
<!--                    </span>-->
<!--                </v-tab>-->
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{$t('wht')}}
                    </span>
                </v-tab>
                <v-tab-item>
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                <Sale/>
                            </v-col>
                        </v-row>
                </v-tab-item>
                <v-tab-item>
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                <Purchase/>
                            </v-col>
                        </v-row>
                </v-tab-item>
                <v-tab-item>
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                <Salary/>
                            </v-col>
                        </v-row>
                </v-tab-item>
<!--                <v-tab-item>-->
<!--                        <v-row>-->
<!--                            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">-->
<!--                                <Fbt/>-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                </v-tab-item>-->
                <v-tab-item>
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                <Wht/>
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
            Sale: () => import('./records/Sale'),
            Purchase: () => import('./records/Purchase'),
            Salary: () => import('./records/Salary'),
            // Fbt: () => import('./records/Fbt'),
            Wht: () => import('./records/Wht'),
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
