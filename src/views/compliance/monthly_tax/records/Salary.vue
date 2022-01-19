<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pt-3 no_border" elevation="0">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row class="">
                        <v-col sm="12" cols="12" class="pt-0">
                            <v-row class="">
                                <v-col sm="12" cols="12" class="pt-0">
                                    <!-- <v-row>
                                        <v-col sm="9" cols="12" class="pt-0">
                                            <h2 class="mb-0 font_20">{{$t('tax_payment_report')}}</h2>
                                        </v-col>
                                    </v-row> -->
                                    <v-row>
                                        <v-col sm=9 cols="12" class="py-0">
                                            <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                                                            :initEndDate="endDate" @emitEndDate="endDate = $event"/>
                                        </v-col>
                                        <v-col sm="1" cols="12" class="py-1">
                                            <v-btn @click="onSearch" class="btn_search white--text" color="primary" >
                                                <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                                            </v-btn>
                                        </v-col>
<!--                                        <v-col sm="2" cols="12" class="py-1">-->
<!--                                            <v-btn class="float-right capitalize white&#45;&#45;text" color="primary" >-->
<!--                                                {{$t('add_new')}}-->
<!--                                            </v-btn>-->
<!--                                        </v-col>-->
                                    </v-row>
                                </v-col>
                            </v-row>

                            <v-row class="">
                                <v-col sm="12" cols="12" class="py-0">
                                    <kendo-datasource ref="dataSource"
                                                      :data="salaries"
                                    />
                                    <kendo-grid id="gridReceivable" class="grid-function"
                                                :data-source-ref="'dataSource'"
                                                :sortable="false"
                                                :groupable="false"
                                                :filterable="false"
                                                :column-menu="true"
                                                :editable="false"
                                                :noRecords="true"
                                                :scrollable-virtual="true"
                                    >
                                        <kendo-grid-column
                                            :field="'reference'"
                                            :title="$t('num')"
                                            :template="'<span>#=reference#</span>'"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'date'"
                                            :title="$t('date')"
                                            :template="'<span>#=kendo.toString(new Date(date), \'dd-MM-yyyy\')#'"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'employee'"
                                            :title="$t('id')"
                                            :template="'<span>#=employee.id#</span>'"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'employee'"
                                            :title="$t('name')"
                                            :attributes="{class:'text-bold'}"
                                            :template="'<span>#=employee.name#</span>'"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'employee'"
                                            :hidden="true"
                                            :title="$t('nationality')"
                                            :template="'<span>#=employee.nationality#</span>'"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'employee'"
                                            :hidden="true"
                                            :title="$t('type')"
                                            :template="'<span>#=employee.natureType#</span>'"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>


                                        <kendo-grid-column
                                            :field="'amountToPaid'"
                                            :title="$t('amountToPaid')"
                                            :template="'<span>#=kendo.toString(amountToPaid, `n2`)#'"
                                            :hidden="true"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'spouse'"
                                            :title="$t('spouse')"
                                            :hidden="true"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'numMinor'"
                                            :title="$t('no_of_minor')"
                                            :hidden="true"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'taxRate'"
                                            :title="$t('tax_rate')"
                                            :hidden="true"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'amountTaxSalary'"
                                            :template="'<span>#=kendo.toString(amountTaxSalary, `n2`)#'"
                                            :title="$t('tax_on_salary')"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'amountTaxSalaryUS'"
                                            :hidden="true"
                                            :template="'<span>#=kendo.toString(amountTaxSalaryUS, `n2`)#'"
                                            :title="$t('tax_on_salary_us')"
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
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
const salaryHandler = require("@/scripts/compliance/handler/salaryHandler")
export default {
    data: () => ({
        showLoading: false,
        salaries: [],
        is_month: false,
        is_start_date: false,
        is_end_date: false,
        startDate: "",
        endDate: "",

        search:{
            start_date: "",
            end_date: ""
        },

    }),
    props: {},
    methods: {
        async onloadSalary() {
            this.showLoading = true
            await salaryHandler.getAll().then(res => {
                this.salaries = res.data.data
                this.showLoading = false
                window.console.log(res, 'salary limit')
            })
        },
        async onSearch(){
            this.showLoading = true
            this.search = {
                'start_date': this.startDate,
                'end_date': this.endDate
            }
            await salaryHandler.getBetweenMonth(this.search).then(res => {
                this.salaries = res.data.data
                this.showLoading = false
                window.console.log(res, 'salary between')
            })
        }
    },
    async mounted() {
        await this.onloadSalary()
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
        'app-searchdate' : ()=> import('@/components/custom_templates/SearchDate'),
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
