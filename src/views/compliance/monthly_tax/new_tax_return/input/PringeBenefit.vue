<template>
    <v-row>
        <!-- <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0"> -->
                <v-col sm="12" cols="12" class="pt-2 px-4">
                    <v-row class="">
                        <v-col sm="12" cols="12" class="pt-0">
                            <v-row class="">
                                <v-col sm="12" cols="12" class="pt-0">
                          
                                    <v-row>
                                        <v-col sm="8" cols="12" class="py-0">
                                            <h2 class="font_22">{{$t('fringe_benefits')}}</h2>
                                        </v-col>
                                        
                                        <v-col sm="4" cols="12" class="py-1">
                                            <v-btn class="float-right capitalize white--text" color="primary" >
                                                {{$t('add_new')}}
                                            </v-btn>
                                            <v-btn class="float-right capitalize white--text mx-2" color="primary" >
                                                {{$t('get_data')}}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>

                            <v-row class="">
                                <v-col sm="12" cols="12" class="py-0">
                                      <kendo-datasource ref="dataSource"
                                                    :data="data"
                                        />
                                        <kendo-grid id="gridReceivable" class="grid-function"
                                                    :data-source-ref="'dataSource'"
                                                    :sortable="false"
                                                    :groupable="true"
                                                    :filterable="false"
                                                    :column-menu="true"
                                                    :editable="false"

                                                    :scrollable-virtual="true"
                                        >
                                            <kendo-grid-column
                                                :field="'num'"
                                                :title="$t('num')"
                                                :template="'<span>#=name#</span>'"
                                                :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                            <kendo-grid-column
                                                :field="'date'"
                                                :title="$t('date')"
                                                :template="'<span>#=amount#</span>'"
                                                :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                            <kendo-grid-column
                                                :field="'id'"
                                                :title="$t('id')"
                                                :template="'<span>#=paymentTerm.name#</span>'"
                                                :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                            <kendo-grid-column
                                                :field="'name'"
                                                :title="$t('name')"
                                                :attributes="{class:'text-bold'}"
                                                :template="'<span>#=overDue#</span>'"
                                                :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                            <kendo-grid-column
                                                :field="'type'"
                                                :title="$t('type')"
                                                :template="status"
                                                :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                            <kendo-grid-column
                                                :field="'fringe_benefits'"
                                                :hidden="'true'"
                                                :title="$t('fringe_benefits')"
                                                :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                             <kendo-grid-column
                                                :field="'tax_rate'"
                                                :title="$t('tax_rate')"
                                                :hidden="'true'"
                                                :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                             <kendo-grid-column
                                                :field="'fbt'"
                                                :title="$t('fbt')"
                                                :hidden="'true'"
                                                :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                    </kendo-grid>
                                    <LoadingMe
                                        :isLoading="showLoading"
                                        :fullPage="false"
                                        :myLoading="true"
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
            <!-- </v-card>
        </v-col> -->
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
export default {
    data: () => ({
        showLoading: false,
        data: [],
        is_month: false,
        is_start_date: false,
        is_end_date: false,
        start_date: "",
        end_date: "",

        search:{
            start_date: "",
            end_date: ""
        },

    }),
    props: {},
    methods: {
        Change(){
        },
 
        onSearch(){
            this.search = {
                'start_date': this.start_date + '-01',
                'end_date': this.end_date + '-01'
            }
        }
    },
    async mounted() {
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
        // 'app-searchdate' : ()=> import('@/components/custom_templates/SearchDate'),
        // 'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
    },
};
</script>
<style scoped>
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
        font-size: 14px;
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
        height: 37px !important;
        color: #000;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.primary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: #92d050 !important;
    }

    .theme--light.v-data-table {
        background-color: transparent !important;
        border-top: thin solid #ddd;
        border-bottom: thin solid #ddd;
        border-radius: 0 !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
        border-bottom: thin solid #ddd;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .border_top {
        border-top: thin solid #fff !important;
    }

    .v-application .primary,
    .v-application .third {
        border-color: #fff !important;
    }
    .vat{
        text-transform: uppercase;
        color: #fff;
        font-weight: bold;
        font-family: 'Niradei-Bold' !important;
    }

    .amount {
        text-align: right !important;
    }
    .head-summary {
        text-align: right !important;
    }
</style>
