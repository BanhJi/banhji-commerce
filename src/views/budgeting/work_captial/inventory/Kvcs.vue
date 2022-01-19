 <template>
    <v-row>
        <v-col sm="12" cols="12" class="">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col sm="10" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{$t('key_value_category')}}</h2>
                        <p class="mb-0">{{$t('key_value_category_desc')}}</p>
                    </v-col>
                    <v-col sm="2" cols="12" class="pb-0 mt-5 text-right">
                        <v-btn icon color="black" class="bg-none float-right ">
                            <v-icon class="font_34">fa fa-file-excel</v-icon>
                        </v-btn>

                        <v-btn icon color="black" class="bg-none float-right ml-2">
                            <v-icon class="font_34">fa fa-print</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row >
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>{{$t('categories')}} </th>
                                        <th>{{$t('no_of_product')}} </th>
                                        <th>{{$t('kvls')}} </th>
                                        <th>{{$t('no_of_sales')}} </th>
                                        <th>{{$t('average_margin')}} </th>
                                        <th>{{$t('turnover_days')}} </th>
                                        <th>{{$t('%_of_total_sale')}} </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>01</td>
                                        <td>JB00009</td>
                                        <td>15/July/2020</td>
                                        <td>VARIANCE</td>
                                        <td>15/July/2020</td>
                                        <td>VARIANCE</td>
                                        <td class="text-center">80%</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        data: () => ({
        }),
        components: {
        },
        methods: {
        },
        computed: {
        },
    };
</script>
<style scoped>
    .k-chart {
        height: 180px;
    }

    .theme--light.v-data-table {
        background-color: transparent !important;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 50px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
        border-top: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .attachment_table table tr th {
        height: 50px !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }
</style>