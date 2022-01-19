<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="no_border" elevation="0">
                <!-- loading -->
                <h2 class="mb-0 font_20">{{ $t("margin_analysis") }}</h2>
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    :myLoading="true"
                    :type="'loading'">
                </LoadingMe>

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
                        <v-btn color="primary white--text" @click="loadTransactions">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row class="mt-0">
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <kendo-datasource ref="gridTransactionServiceDS"
                                              :type="'JSON'"
                                              :data="transactions"
                                              :group="group"
                                              :server-paging="false"/>
                            <kendo-grid
                                id="gridMarginByItemService"
                                class="grid-function"
                                :data-source-ref="'gridTransactionServiceDS'"
                                :editable="false"
                                :column-menu="true"
                                :noRecords="true"
                                :resizable="true"
                                @pagechange="pageChangeHandler"
                                :toolbar="['excel']"
                                :excel-file-name="'SaleAnalysisByVariant.xlsx'"
                                :excel-filterable="true"
                                :excel-all-pages="true"
                                :scrollable-virtual="true"
                            >
                                <!--                <kendo-grid-column-->
                                <!--                    :field="'no'"-->
                                <!--                    :title="$t('no')"-->
                                <!--                    :template="rowNumberTmpl"-->
                                <!--                    :width="90"-->
                                <!--                    :column-menu="false"-->
                                <!--                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"-->
                                <!--                    :attributes="{style: 'text-align: center'}"/>-->
                                <kendo-grid-column
                                    :field="'name'"
                                    :attributes="{ class: 'tb_name_td' }"
                                    :title="$t('item')"
                                    :width="200"
                                    :template="'<span>#=name#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'sku'"
                                    :title="$t('sku')"
                                    :width="160"
                                    :template="'<span>#=sku#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'revenue'"
                                    :title="$t('revenue')"
                                    :width="120"
                                    :template="'<span>#=kendo.toString(revenue, decimalFormat)#</span>'"
                                    :attributes="{ style: 'text-align: right; ' }"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'totalRevenue'"
                                    :title="$t('%_total_revenue')"
                                    :width="200"
                                    :template="'<span>#=kendo.toString(totalRevenue, decimalFormat)# %</span>'"
                                    :attributes="{ style: 'text-align: right; ' }"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important',}"
                                />
                                <kendo-grid-column
                                    :field="'avgMargin'"
                                    :title="$t('%_margin')"
                                    :width="200"
                                    :attributes="{ style: 'text-align: right; ' }"
                                    :template="'<span>#=kendo.toString(avgMargin, decimalFormat)# %</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
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

const dashboardHandler = require("@/scripts/dashboard/customer/handler/dashboardHandler");
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
    name: "MarginAnalysis",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': () => import(`@/components/custom_templates/DatePickerComponent`)
        // BankConnection,
    },
    data: () => ({
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year', 'Last Month' , 'Last Year'],
        mDateSorter: 'Today',
        showLoading: false,
        transactions: [],
        aggregateDefinition:
            [{field: 'amount', aggregate: 'sum'},
                {field: 'qty', aggregate: 'sum'},
                {field: 'discountExchangeAmount', aggregate: 'sum'},

            ],
        group: [],
        schemaModelFields: {
            id: {type: "number"},
            name: {type: "string"},
            item: {type: "string"},
            price: {type: "number"},
            qty: {type: "number"},
            referenceNo: {type: "string"},
            transactionDate: {type: "string"},
            transactionType: {type: "string"},
            type: {type: "string"},
            uom: {type: "string"},
            marginRate: {type: "number"},
            category: {type: "string"}
        },
        totalRevenue: 0,
        totalSaleLead: 0,
        totalSaleQuote: 0,
        totalSaleOrder: 0,
        decimalFormat: 'n2',
        // group: {
        //     field: 'name',
        //     aggregates: [
        //         {field: "qty", aggregate: "tQty"},
        //         {field: "amount", aggregate: "sum"}
        //     ]
        // },
    }),
    methods: {
        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log('excelExport')
            window.console.log(e.data);
        },
        pageChangeHandler: function (event) {
            alert("change", event);
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
        numberFormat(value) {
            return kendo.toString(value, this.decimalFormat)
        },
        async loadTransactions() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    this.transactions = []
                    const strFilter = '?start=' + this.startDate + '&end=' + this.endDate + '&type=service'
                    dashboardHandler.saleMarginAnalysis(strFilter).then((res) => {
                        if (res.data.statusCode === 200) {
                            this.transactions = res.data.data;
                            this.showLoading = false;
                        } else {
                            this.showLoading = false;
                        }

                    });
                }, 10);
            });
        },
        dateFormat(dataItem) {
            return kendo.toString(new Date(dataItem.transactionDate), `dd-MM-yyyy`)
        },
    },
    async mounted() {
        this.group = [
            {
                field: "item",
                aggregates: this.aggregateDefinition,
            }
        ]
        // await this.loadTransactions()
    },
    computed: {},
};
</script>
<style scoped></style>
