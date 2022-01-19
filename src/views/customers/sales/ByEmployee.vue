<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <h2 class="mb-0">{{$t('sale_summary_by_employee')}}</h2>
                <p class="mb-0">{{$t('sale_summary_by_employee_desc')}}</p>

                <!-- loading -->
                <LoadingMe
                        :isLoading="compeletLoading"
                        :fullPage="false"
                        :myLoading="true">

                </LoadingMe>

                <v-row class="">
                    <v-col sm="3" cols="12" class="pb-0">
                        <v-select class="mt-1"
                                  :items="dateSorters"
                                  clearable
                                  outlined
                                  placeholder="ALL"
                        />
                    </v-col>

                    <v-col sm="3" cols="12" class="pb-0">
                        <app-datepicker :initialDate="start_date" @emitDate="start_date = $event"/>
                    </v-col>

                    <v-col sm="3" cols="12" class="pb-0">
                        <app-datepicker :initialDate="end_date" @emitDate="end_date = $event"/>
                    </v-col>

                    <v-col sm="1" cols="1" class="pb-0 pt-4">
                        <v-btn color="primary white--text">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                    <v-col sm="2" cols="2" class="pb-0">
                        <v-btn
                                icon
                                color="black"
                                class="bg-none float-right ml-2"
                        >
                            <v-icon class="font_34">fa fa-file-excel</v-icon>
                        </v-btn>
                        <v-btn
                                icon
                                color="black"
                                class="bg-none float-right ml-2"
                        >
                            <v-icon class="font_34">fa fa-print</v-icon>
                        </v-btn>

                    </v-col>

                </v-row>

                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>{{$t('sale_reps')}}</th>
                                        <th>{{$t('customer')}}</th>
                                        <th>{{$t('total_sale')}}</th>
                                        <th>{{$t('%_of_total_sale')}}</th>
                                        <th>{{$t('margin_%')}}</th>
                                        <th>{{$t('average_collection_days')}}</th>
                                        <th>{{$t('action')}}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>01</td>
                                        <td>JB00009</td>
                                        <td>15/July/2020</td>
                                        <td>JB00009</td>
                                        <td>VARIANCE</td>
                                        <td>VARIANCE</td>
                                        <td class="text-center">
                                            <v-btn class="bg-none">
                                                <v-icon class="primary--text" size="17">fas fa-eye</v-icon>
                                            </v-btn>
                                        </td>
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
    import LoadingMe from '@/components/Loading'
    import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'

    export default {
        name: "",
        components: {
            LoadingMe,
            'app-datepicker': DatePickerComponent,
            // BankConnection,
        },
        data: () => ({
            start_date: "",
            end_date: "",
            dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
            journal_entries: [],
            // LoadingMe
            compeletLoading: false,
            isLoaded: false,
        }),
        methods: {
        },
        mounted() {
        },
        computed: {
        },
    };
</script>
<style scoped>
</style>