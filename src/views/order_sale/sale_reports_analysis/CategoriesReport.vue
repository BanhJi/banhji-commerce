<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-0 font_20">{{ $t('categories_report') }}</h2>
                        <p class="mb-0">{{ $t('categories_report_desc') }}</p>
                    </v-col>
                    <!--
                              <v-col sm="2" cols="12" class="py-0">
                                <v-row>
                                  <v-col sm="12" cols="12" class="pt-4">
                                    <v-btn icon color="black" class="bg-none float-right ">
                                      <v-icon class="font_34">fa fa-file-excel</v-icon>
                                    </v-btn>

                                    <v-btn icon color="black" class="bg-none float-right ml-2">
                                      <v-icon class="font_34">fa fa-print</v-icon>
                                    </v-btn>
                                  </v-col>
                                </v-row>
                              </v-col> -->
                </v-row>
                <v-row class="mt-0">
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
                        <v-btn
                            class="btn_search" @click="searchTransaction"
                            style="background-color: rgb(237, 241, 245)">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row class="mt-0">
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                type="loading"
                                :myLoading="true">
                            </LoadingMe>
                            <kendo-datasource ref="categorySegmentReportDS"
                                              :group="group"
                                              :data="categorySegmentList"/>
                            <kendo-grid id="gridCategoryReport" class="grid-function"
                                        :data-source-ref="'categorySegmentReportDS'"
                                        :sortable="false"
                                        :groupable="true"
                                        :filterable="false"
                                        :column-menu="true"
                                        :editable="false"
                                        :style="{width: '100%'}"
                                        :noRecords="true"
                                        :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'category'"
                                    :title="$t('category')"
                                    :template="'<span>#=category || ``#</span>'"
                                    :width="200"
                                    :hidden="false"
                                    :attributes="{style: 'text-align: left'}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5;text-align: left;' }"/>
                                <kendo-grid-column
                                    :field="'segment'"
                                    :title="$t('segment')"
                                    :template="'<span>#=segment || ``#</span>'"
                                    :width="200"
                                    :hidden="false"
                                    :attributes="{style: 'text-align: left'}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5;text-align: left;' }"/>
                                <kendo-grid-column
                                    :field="'totalSale'"
                                    :title="$t('sale')"
                                    :template="'<span>#=kendo.toString(totalSale || 0, (decimalFormat || `n2`))#</span>'"
                                    :width="150"
                                    :hidden="false"
                                    :attributes="{style: 'text-align: right'}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'totalPurchase'"
                                    :title="$t('purchase')"
                                    :template="'<span>#=kendo.toString(totalPurchase || 0, (decimalFormat || `n2`))#</span>'"
                                    :width="150"
                                    :hidden="false"
                                    :attributes="{style: 'text-align: right'}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5;text-align: left' }"/>

                            </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";

const productHandler = require("@/scripts/productHandler")

export default {
    data: () => ({
        showLoading: false,
        mDateSorter: 'Today',
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year', 'Last Month' , 'Last Year'],
        group: {field: 'category'},
        aggregateDefinition: [
            {field: "category", aggregate: "count"},
            {field: "amount", aggregate: "sum"}

        ],
        isLoaded: false,
        categorySegmentList: []
    }),
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`)
    },
    methods: {
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
        async searchTransaction() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    const startDate = this.startDate
                    const endDate = this.endDate
                    const strFilter = '?start=' + startDate + '&end=' + endDate + '&type=Product'
                    productHandler.categorySegmentReport(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.categorySegmentList = res.data.data
                        } else {
                            this.showLoading = false
                        }
                    })

                }, 10)
            })
        },
        sumGroupAmount(dataItem) {
            if (dataItem.hasOwnProperty('sum')) {
                return '<span>#= kendo.toString(sum, `n2`)#</span>'
            }
            return `<span>#= kendo.toString(sum, 'n2')#</span>`
        }
    },
    computed: {},
    mounted: async function () {
        this.group = [
            {
                field: "category",
                aggregates: this.aggregateDefinition,
            }
        ]
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