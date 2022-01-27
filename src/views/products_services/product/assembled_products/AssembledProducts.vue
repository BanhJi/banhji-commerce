<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0">{{$t('assembled_products')}}</h2>
            <v-btn to="build_assembly" color="primary"
                   class=" white--text float-right text-capitalize">
                {{$t('new_assembly')}}
            </v-btn>
            <v-row class="">
                <v-col sm="9" cols="12" class="pt-0 pr-0">
                    <v-row class="">
                        <v-col sm="4" cols="12" class="py-0">
                            <v-select class="mt-1"
                                      :items="dateSorters"
                                      clearable
                                      outlined
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
                    <kendo-datasource ref="dataSource" :data="suppliers_item"/>
                    <kendo-grid id="grid" class="grid-function" :data-source-ref="'dataSource'" :sortable="false"
                                :filterable="false" :column-menu="true" :editable="true" :scrollable-virtual="true">
                        <kendo-grid-column :field="'num'" :title="$t('num')" :width="100" :column-menu="'false'"
                                           :headerAttributes="{
                                    style: 'background-color: #EDF1F5;',
                                    class: 'text-variants'
                                }" :attributes="{
                                    style: 'text-align: variants'
                                }"/>
                        <kendo-grid-column :field="'product'" :title="$t('product')" :width="130"
                                           :template="'<span>#=item.name#</span>'" :headerAttributes="{
                                    style: 'background-color: #EDF1F5'
                                }"/>
                        <kendo-grid-column :field="'sku'" :title="$t('sku')" :width="100" :headerAttributes="{
                                    style: 'background-color: #EDF1F5'
                                }"/>
                        <kendo-grid-column :field="'date'" :title="$t('date')" :width="120" :headerAttributes="{
                                    style: 'background-color: #EDF1F5'
                                }"/>
                        <kendo-grid-column :field="'qty'" :title="$t('qty')" :format="'{0:n}'" :width="120"
                                           :headerAttributes="{
                                        style: 'text-align: right; background-color: #EDF1F5'
                                    }" :attributes="{
                                        style: 'text-align: right'
                                    }"/>
                        <kendo-grid-column :field="'uom'" :title="$t('uom')" :format="'{0:n}'" :width="110"
                                           :headerAttributes="{
                                        style: 'text-align: right; background-color: #EDF1F5'
                                    }" :attributes="{
                                        style: 'text-align: right'
                                    }"/>

                        <kendo-grid-column :field="'action'" :title="$t('action')" :format="'{0:n}'" :width="110"
                                           :headerAttributes="{
                                        style: 'text-align: right; background-color: #EDF1F5'
                                    }" :attributes="{
                                        style: 'text-align: right'
                                    }"/>
                        <kendo-grid-column :field="'started_at'" :title="$t('started_at')" :format="'{0:n}'"
                                           :width="150" :headerAttributes="{
                                style: 'text-align: right; background-color: #EDF1F5'
                            }" :attributes="{
                                style: 'text-align: right'
                            }"/>
                        <kendo-grid-column :field="'completed_at'" :title="$t('completed_at')" :format="'{0:n}'"
                                           :width="150" :headerAttributes="{
                                style: 'text-align: right; background-color: #EDF1F5'
                            }" :attributes="{
                                style: 'text-align: right'
                            }"/>
                        <kendo-grid-column :field="'associated_bom'" :title="$t('associated_bom')" :format="'{0:n}'"
                                           :width="150" :headerAttributes="{
                                style: 'text-align: right; background-color: #EDF1F5'
                            }" :attributes="{
                                style: 'text-align: right'
                            }"/>

                        <kendo-grid-column
                                :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', class: 'btn-plus' }"
                                :title="'&nbsp;'" :width="100" :headerAttributes="{
                                    style: 'text-align: right; background-color: #EDF1F5'
                                }"/>

                    </kendo-grid>
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
            suppliers_item: [],
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
