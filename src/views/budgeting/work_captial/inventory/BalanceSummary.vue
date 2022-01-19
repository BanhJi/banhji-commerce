<template>
    <v-row>
        <v-col sm="12" cols="12" class="">
            <v-card color="white" class="pl-2 no_border" elevation="0">
               <h2 class="mb-1 font_20">{{$t('inventory_balance_summary')}}</h2>
                <v-row>
                    <v-col sm="6" cols="12" class="py-0">
                        <p class="mb-0">{{$t('inventory_balance_summary_desc')}}</p>
                    </v-col>
                    <v-col sm="3" cols="12" class="py-0">
                        <app-datepicker :initialDate="journal_date"
                                        @emitDate="journal_date = $event" />

                    </v-col>
                    <v-col sm="1" cols="12" class="pt-1">
                        <v-btn color="primary" class="white--text text-capitalize">
                            {{$t('view')}}
                        </v-btn>
                    </v-col>

                    <v-col sm="2" cols="12" class="py-0 text-right">
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
                                        <th>{{$t('name')}} </th>
                                        <th>{{$t('committed')}} </th>
                                        <th>{{$t('on_po')}} </th>
                                        <th>{{$t('on_so')}} </th>
                                        <th>{{$t('qoh')}} </th>
                                        <th>{{$t('uom')}} </th>
                                        <th>{{$t('wac')}} </th>
                                        <th>{{$t('value')}} </th>
                                        <th>{{$t('doh')}} </th>
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
                                        <td>15/July/2020</td>
                                        <td>VARIANCE</td>
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