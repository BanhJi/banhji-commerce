<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{ $t('payment_term_report') }}</h2>
                        <p class="mb-0">{{ $t('payment_term_report_desc') }}</p>
                    </v-col>
                    <v-row>
                        <v-col sm="4" cols="12" class="py-0">
                            <v-select class="mt-1"
                                      :items="dateSorters"
                                      v-model="mDateSorter"
                                      @change="onSorterChanges"
                                      clearable
                                      outlined
                                      placeholder="ALL"
                            />
                        </v-col>

                        <v-col sm="3" cols="12" class="py-0">
                            <app-datepicker :initialDate="startDate" @emitDate="startDate = $event"/>
                        </v-col>

                        <v-col sm="3" cols="12" class="py-0">
                            <app-datepicker :initialDate="endDate" @emitDate="endDate = $event"/>
                        </v-col>

                        <v-col sm="1" cols="1" class="pt-1">
                            <v-btn color="primary white--text" @click="loadPaymentTermReport">
                                <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-row>


                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                type="loading"
                                :myLoading="true"/>

                            <kendo-datasource ref="termDS"
                                              :group="group"
                                              :data="transactionList"/>
                            <kendo-grid id="gridTerm" class="grid-function"
                                        :data-source-ref="'termDS'"
                                        :column-menu="true"
                                        :noRecords="true"
                                        :groupable="true"
                                        :editable="false"
                                        :excel-file-name="'paymentTermReport.xlsx'"
                                        :excel-filterable="true"
                                        :excel-all-pages="true"
                                        :toolbar="['excel']"
                                        :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'transactionDate'"
                                    :title="$t('date')"
                                    :template="'<span>#= kendo.toString(new Date(transactionDate), dateFormat)#</span>'"
                                    :attributes="{style: 'text-align: left; '}"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'referenceNo'"
                                    :title="$t('referenceNo')"
                                    :template="'<span>#=referenceNo#</span>'"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('customer')"
                                    :attributes="{style: 'text-align: left; '}"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'cusType'"
                                    :title="$t('type')"
                                    :attributes="{style: 'text-align: left; '}"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'group'"
                                    :hidden="true"
                                    :title="$t('group')"
                                    :attributes="{style: 'text-align: left; '}"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'approvedTerm'"
                                    :title="$t('approved_term')"
                                    :attributes="{style: 'text-align: left; '}"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5'  }"/>
                                <kendo-grid-column
                                    :field="'termName'"
                                    :title="$t('invoice_term')"
                                    :attributes="{style: 'text-align: left; '}"
                                    :width="200"
                                    :headerAttributes="{  style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'exchangeAmount'"
                                    :title="$t('amount')"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(exchangeAmount, decimalFormat)#</span>'"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'appliedTerm'"
                                    :title="'applied'"
                                    :width="120"
                                    :column-menu="false"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center',}"
                                    :attributes="{ style: 'text-align: center' }"/>
                            </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import JSZip from "jszip";
import kendo from "@progress/kendo-ui";

window.JSZip = JSZip;
const customerHandler = require("@/scripts/customerHandler")

export default {
    data: () => ({
        showLoading: false,
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year', 'Last Month' , 'Last Year'],
        mDateSorter: 'Today',
        transactionList: [],
        group: [{field: 'name'}, {field: 'cusType'}],
    }),
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': () => import(`@/components/custom_templates/DatePickerComponent`)
    },
    methods: {
        checkTemplate(dataItem) {
            return `<input type='checkbox' #= ${dataItem.appliedTerm} ? checked="checked" : '' # class='k-checkbox row-checkbox' />`;
        },
        onSorterChanges(val) {
            let today = new Date()
            switch (val) {
                case "Today":
                    this.startDate = kendo.toString(today, 'yyyy-MM-dd')
                    this.endDate = kendo.toString(today, 'yyyy-MM-dd')

                    break
                case "This Week":
                    var first = today.getDate() - today.getDay(),
                        last = first + 6

                    this.startDate = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
                    today = new Date()
                    this.endDate = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')

                    break
                case "This Month":
                    this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')

                    break
                case "This Year":
                    this.startDate = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')
                 break
                case "Last Month":
                  this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), -30), 'yyyy-MM-dd');
                  this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth() -1, +31), 'yyyy-MM-dd');
        
                  break
                case "Last Year":
                  this.startDate = kendo.toString(new Date(today.getFullYear(), -11, -30), 'yyyy-MM-dd');
                  this.endDate = kendo.toString(new Date(today.getFullYear(), -1, +31), 'yyyy-MM-dd');
                    break
                default:
                    this.startDate = ""
                    this.endDate = ""
            }
        },
        async loadPaymentTermReport() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    const strFilter = '?start=' + this.startDate + '&end=' + this.endDate
                    this.showLoading = true
                    customerHandler.paymentTermReport(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            this.transactionList = res.data.data
                            this.showLoading = false
                        } else {
                            this.showLoading = false
                        }
                    })
                }, 10)
            })
        },
    },
    computed: {},
    mounted: async function () {
    }
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