<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0">{{$t('delivery_orders')}}</h2>
            <v-btn to="delivery_order" color="primary"
                   class=" white--text float-right text-capitalize">
                {{$t('new_do')}}
            </v-btn>

            <v-row class="">
                <v-col sm="9" cols="12" class="pt-0 pr-0">
                    <v-row class="">
                        <v-col sm="4" cols="12" class="py-0">
                            <v-select class="mt-1" :items="dateSorters" clearable outlined
                                      placeholder="ALL"/>
                        </v-col>

                        <v-col sm="3" cols="12" class="py-0">
                            <app-datepicker :initialDate="start_date" @emitDate="start_date = $event"/>
                        </v-col>

                        <v-col sm="3" cols="12" class="py-0">
                            <app-datepicker :initialDate="end_date" @emitDate="end_date = $event"/>
                        </v-col>

                        <v-col sm="1" cols="1" class="pt-1">
                            <v-btn class="btn_search" style="background-color: rgb(237, 241, 245)">
                                <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <template>
                        <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>{{$t('date')}}</th>
                                    <th>{{$t('number')}}</th>
                                    <th>{{$t('customers')}}</th>
                                    <th>{{$t('warehouse')}}</th>
                                    <th>{{$t('status')}}</th>
                                    <th>{{$t('action')}}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>01</td>
                                    <td>JB00009</td>
                                    <td>15/July/2020</td>
                                    <td>VARIANCE</td>
                                    <td>15/July/2020</td>
                                    <td>
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
        </v-col>
    </v-row>
</template>
<script>
    import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'

    export default {
        data: () => ({
            // Search transaction dates
            start_date: "",
            end_date: "",
            dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
            account: [],
            files: [],
            attachments: [],

            dialogm3: false,
            // LoadingMe
            isLoaded: false,
            // Kendo dataSource
            schemaDefinition: {
                model: {
                    id: "id"
                }
            },
            /* Sort by account number */
            sortDefinition: {
                field: "number"
            },
        }),
        props: {},
        methods: {},
        mounted() {
        },
        computed: {},
        components: {
            'app-datepicker': DatePickerComponent,
        },
    };
</script>

<style scoped>

    .function_footer {
        padding: 15px;
        display: inline-block;
    }

    p {
        color: rgba(0, 0, 0, 0.87);
    }

    .actionBtn {
        height: 47.2px !important;
    }

    .text_tip {
        font-size: 9px;
        line-height: 10px;
    }

    @media (max-width: 576px) {
    }
</style>
