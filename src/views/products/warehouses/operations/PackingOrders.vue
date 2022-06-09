<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="5" cols="12" class="pt-0">
                    <h2 class="mb-0 font_20">{{$t('packing_orders')}}</h2>
                </v-col>
                <v-col sm="7" cols="12" class="pt-0">
                    <v-row class="">
                        <v-col class="py-0" sm="6" cols="12">
                            <v-card outlined dense class="px-2 no_border" color="primary" min-height="53px">
                                <v-row class="">
                                    <v-col class="py-1" sm="6" cols="12">
                                        <p class="white--text mb-0 text-uppercase">{{$t('incoming_transfer')}}</p>
                                    </v-col>
                                    <v-col class="py-12" sm="6" cols="12">
                                        <h3 class="white--text mt-3 text-right">100</h3>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col class="py-0" sm="6" cols="12">
                            <v-card outlined dense class="px-2 no_border" color="primary"  min-height="53px">
                                <v-row class="">
                                    <v-col class="py-1" sm="6" cols="12">
                                        <p class="white--text mb-0 text-uppercase">{{$t('ready_for_transfer')}}</p>
                                    </v-col>
                                    <v-col class="py-1" sm="6" cols="12">
                                        <h3 class="white--text mt-3 text-right">100</h3>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="9" cols="12" class="pt-0 pr-0">
                    <v-row class="">
                        <v-col sm="4" cols="12" class="py-0">
                            <v-select class="mt-1"
                                      :items="dateSorters"
                                      @change="onSorterChanges"
                                      clearable
                                      outlined
                                      placeholder="ALL"
                            />
                        </v-col>

                        <v-col sm="3" cols="12" class="py-0">
                            <app-datepicker :initialDate="start_date" @emitDate="start_date = $event"/>
                        </v-col>

                        <v-col sm="3" cols="12" class="py-0">
                            <app-datepicker :initialDate="end_date" @emitDate="end_date = $event"/>
                        </v-col>

                        <v-col sm="1" cols="1" class="py-1">
                            <v-btn class="btn_search" @click="searchTransaction" style="background-color: rgb(237, 241, 245)">
                                <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col sm="3" cols="12" class="pt-0">
                    <v-btn to="packing_order" color="primary" class=" white--text float-right text-capitalize">
                        {{$t('new_packing_slip')}}
                    </v-btn>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <template>
                    <v-simple-table class="attachment_table">
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th>{{$t('date')}} </th>
                                <th>{{$t('number')}} </th>
                                <th>{{$t('type')}} </th>
                                <th>{{$t('related_transaction')}} </th>
                                <th>{{$t('status')}} </th>
                                <th>{{$t('action')}} </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td class="text-center">
                                    <v-menu offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn v-bind="attrs" v-on="on" class="bg-none">
                                                <v-icon class="primary--text" size="17">fas fa-edit</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item>
                                                <v-list-item-title>{{$t('prepare_packing_slip')}}</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-title>{{$t('prepare_delivery_order')}}</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-title>{{$t('view')}}</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
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
            searchText: '',
            isLoaded: false,
        }),
        methods: {
           
        },
        mounted() {

        },
        computed: {
        },
        components: {
            'app-datepicker': DatePickerComponent,
        },
    };
</script>
<style scoped>
    .acc_group header {
        height: 10px !important;
    }

    table.acc_group tr td {
        border-bottom: 1px solid #ccc;
        padding: 8px;
        vertical-align: middle;
    }

    table.acc_group tr td:first-child {
        font-weight: 700;
    }

    table.acc_group tr td:last-child {
        text-align: center;
    }

    .v-card__actions .v-btn.v-btn {
        padding: 0 16px;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        font-family: 'Niradei-Bold', serif;
        color: #000 !important;
        border-top: 1px solid #000 !important;
        border-bottom: 1px solid #000 !important;
        font-size: 15px !important;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
        color: #000 !important;
        padding: 5px !important;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
        border-bottom: 1px solid #000 !important;
    }

    .function_footer {
        padding: 15px;
        display: inline-block;
    }
    p{
        color: rgba(0, 0, 0, 0.87);
    }
    .actionBtn{
        height: 47.2px !important;
    }
    .text_tip{
        font-size: 9px;
        line-height: 10px;
    }

    @media (max-width: 576px) {

    }
</style>
