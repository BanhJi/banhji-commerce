<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="py-0">
            <h2 class="mb-0 primary--text">{{$t('sale_management_reports')}}</h2>
            <p class="mb-0">
                {{$t('sale_management_reports_desc')}}
            </p>
        </v-col>
        <v-col sm="12" cols="12" class="py-0">
            <v-row>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="150px">
                        <router-link to="sale_summary_by_customers_and_employee" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('sale_summary_by_customers_and_employee')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('sale_summary_by_customers_and_employee_desc')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="150px">
                        <router-link to="sale_detail_by_products_and_services" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('sale_detail_by_products_and_services')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('sale_detail_by_products_and_services_desc')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="150px">
                        <router-link to="sale_summary_by_location" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('sale_summary_by_location')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('sale_summary_by_location_desc')}}</p>
                    </v-card>
                </v-col>

                <v-col sm="3" cols="12">
                    <v-card outlined dense class=" no_border" height="150px">
                        <router-link to="sale_detail_by_sale_channels" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('sale_detail_by_sale_channels')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('sale_detail_by_sale_channels_desc')}}</p>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="130px">
                        <router-link to="sale_detail_by_promotions_discount" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('sale_detail_by_promotions_discount')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('sale_detail_by_promotions_discount_desc')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="130px">
                        <router-link to="sale_detail_by_projects" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('sale_detail_by_projects')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('sale_detail_by_projects_desc')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="130px">
                        <router-link to="sale_order_by_items_customers" class="no-text-decoration">
                             <h3 class="mb-2 font_18 primary--text">{{$t('sale_order_by_items_customers')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('sale_order_by_items_customers_desc')}}</p>
                    </v-card>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-card outlined dense class="no_border" height="130px">
                        <router-link to="deposit_detail_by_customers" class="no-text-decoration">
                            <h3 class="mb-2 font_18 primary--text">{{$t('deposit_detail_by_customers')}}</h3>
                        </router-link>
                        <p class="mb-0 font_12">{{$t('deposit_detail_by_customers_desc')}}</p>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        components: {},
        data() {
        },
        props: {},
        methods: {},
        computed: {},
        created() {
        },
        mounted: async function () {
        }
    };
</script>
<style scoped>
</style>