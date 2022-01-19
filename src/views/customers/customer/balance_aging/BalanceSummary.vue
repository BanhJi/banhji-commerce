<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="6" cols="12" class="py-0">
                        <p class="mb-0">{{$t('receivable_management_desc')}}</p>
                    </v-col>
                    <v-col sm="4" cols="12" class="py-0">
                        <app-datepicker :initialDate="journal_date"
                                        @emitDate="journal_date = $event" />
                        <v-select class="mt-1"
                                  clearable
                                  outlined
                                  placeholder="customer"
                        />
                    </v-col>
                    <v-col sm="2" cols="12" class="py-0">
                        <v-btn color="primary" class="text-capitalize white--text float-right" >
                            {{$t('view')}}
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row >
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border white--text  d-flex justify-space-between align-center" color="secondary" height="85px">
                            <h3 class="text-left text-uppercase font_13 flex-1">{{$t('overdue_invoices')}}</h3>
                            <h3 class="text-right  font_20  flex-1">10</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border white--text  d-flex justify-space-between align-center" color="third" height="85px">
                            <h3 class="text-left text-uppercase font_13  flex-1">{{$t('receivable_balance')}}</h3>
                            <h3 class="text-right font_20  flex-1">10,000.00</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border black--text  d-flex justify-space-between align-center" color="grayBg" height="85px">
                            <h3 class="text-left text-uppercase font_13  flex-1">{{$t('to_be_collected')}}</h3>
                            <h3 class="text-right font_20  flex-1">1000000.00</h3>
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
                                        <th>{{$t('number')}} </th>
                                        <th>{{$t('amount')}} </th>
                                        <th>{{$t('term')}} </th>
                                        <th>{{$t('aging')}} </th>
                                        <th>{{$t('stage')}} </th>
                                        <th>{{$t('action')}} </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="text-bold">HOme</td>
                                        <td class="tb_name_td">JB00009</td>
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
    import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'

    export default {
        data: () => ({
            journal_date: "",
        }),
        components: {
            'app-datepicker': DatePickerComponent
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