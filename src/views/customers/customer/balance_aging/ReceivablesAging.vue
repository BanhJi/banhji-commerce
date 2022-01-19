<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="6" cols="12" class="py-0">
                        <p class="mb-0">{{$t('receivable_aging_reports_desc')}}</p>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="9" cols="12" class="py-0">
                        <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                                        :initEndDate="endDate" @emitEndDate="endDate = $event"/>
                    </v-col>

                    <v-col sm="1" cols="12" class="py-1">
                        <v-btn class="btn_search" style="background-color: rgb(237, 241, 245)"
                               @click="searchTransaction('Cash Receipt')">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                    <!-- <v-col sm="2" cols="12" class="py-0 text-right">
                        <v-btn icon color="black" class="bg-none float-right ">
                            <v-icon class="font_34">fa fa-file-excel</v-icon>
                        </v-btn>

                        <v-btn icon color="black" class="bg-none float-right ml-2">
                            <v-icon class="font_34">fa fa-print</v-icon>
                        </v-btn>
                    </v-col> -->
                </v-row>

                <v-row class="mt-0">
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border white--text" color="secondary" min-height="85px">
                            <v-row >
                                <v-col sm="6" cols="12" class="">
                                    <h3 class="text-left font_13 text-uppercase mt-2">{{$t('customer')}}</h3>
                                </v-col>
                                <v-col sm="6" cols="12" class="">
                                    <h3 class="text-right mt-2 font_20">10</h3>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border white--text" color="third" min-height="85px">
                            <v-row >
                                <v-col sm="6" cols="12" class="">
                                    <h3 class="text-left text-uppercase font_13">{{$t('receivable_balance')}}</h3>
                                </v-col>
                                <v-col sm="6" cols="12" class="">
                                    <h3 class="text-right mt-2 font_20">10,000.00</h3>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>


                <v-row >
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>{{$t('name')}} </th>
                                        <th>{{$t('current')}} </th>
                                        <th>1-30</th>
                                        <th>31-60</th>
                                        <th>61-90</th>
                                        <th>>90</th>
                                        <th>{{$t('total')}} </th>
                                        <th>{{$t('%_of_sale')}}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="text-bold">Deposit</td>
                                        <td>JB00009</td>
                                        <td>15/July/2020</td>
                                        <td>VARIANCE</td>
                                        <td>15/July/2020</td>
                                        <td>VARIANCE</td>
                                        <td class="text-center">80%</td>
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

    import SearchDateComponent from "@/components/custom_templates/SearchDate";

    export default {
        data: () => ({
            startDate: "",
            endDate: "",
        }),
        components: {
            'app-searchdate': SearchDateComponent,
        },
        methods: {
        },
        computed: {
        },
    };
</script>
<style scoped>
    .theme--light.v-data-table {
        background-color: transparent !important;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
        border-top: thin solid rgba(0, 0, 0, 0.12) !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }
</style>