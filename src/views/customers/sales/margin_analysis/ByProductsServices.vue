<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    type="loading"
                    :myLoading="true"
                >
                </LoadingMe>
                <v-row>
                    <v-col sm="4" cols="12" class="py-0">
                        <v-select
                            class="mt-1"
                            :items="dateSorters"
                            v-model="mDateSorter"
                            @change="onSorterChanges"
                            clearable
                            outlined
                            placeholder="ALL"
                        />
                    </v-col>
                    <v-col sm="3" cols="12" class="py-0">
                        <app-datepicker
                            :initialDate="startDate"
                            @emitDate="startDate = $event"
                        />
                    </v-col>
                    <v-col sm="3" cols="12" class="py-0">
                        <app-datepicker
                            :initialDate="endDate"
                            @emitDate="endDate = $event"
                        />
                    </v-col>
                    <v-col sm="1" cols="1" class="pt-1">
                        <v-btn color="primary white--text" @click="loadTransactions">
                            <i
                                class="b-search"
                                style="font-size: 18px; color:#fff !important;"
                            />
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row clas="mt-0">
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <kendo-datasource
                                ref="gridMarginTransactionItemDS"
                                :type="'JSON'"
                                :data="transactions"
                                :server-paging="false"
                            />
                            <kendo-grid
                                id="gridMarginByItem"
                                class="grid-function"
                                :data-source-ref="'gridMarginTransactionItemDS'"
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
                                    :headerAttributes="{
                    style: 'background-color: #EDF1F5, color: green !important',
                  }"
                                />
                                <kendo-grid-column
                                    :field="'avgMargin'"
                                    :title="$t('%_margin')"
                                    :width="200"
                                    :attributes="{ style: 'text-align: right; ' }"
                                    :template="
                    '<span>#=kendo.toString(avgMargin, decimalFormat)# %</span>'
                  "
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
    name: "SaleAnalysisByCustomer",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": () =>
            import(`@/components/custom_templates/DatePickerComponent`),
    },
    data: () => ({
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year', 'Last Month' , 'Last Year'],
        mDateSorter: "Today",
        showLoading: false,
        transactions: [],
    }),
    methods: {
        pageChangeHandler: function (event) {
            window.console.log("change", event);
        },
        onSorterChanges(val) {
            let today = new Date();
            switch (val) {
                case "Today":
                    this.startDate = kendo.toString(today, "yyyy-MM-dd");
                    this.endDate = kendo.toString(today, "yyyy-MM-dd");

                    break;
                case "This Week":
                    var first = today.getDate() - today.getDay(),
                        last = first + 6;

                    this.startDate = kendo.toString(
                        new Date(today.setDate(first)),
                        "yyyy-MM-dd"
                    );
                    today = new Date()
                    this.endDate = kendo.toString(
                        new Date(today.setDate(last)),
                        "yyyy-MM-dd"
                    );

                    break;
                case "This Month":
                    this.startDate = kendo.toString(
                        new Date(today.getFullYear(), today.getMonth(), 1),
                        "yyyy-MM-dd"
                    );
                    this.endDate = kendo.toString(
                        new Date(today.getFullYear(), today.getMonth(), 31),
                        "yyyy-MM-dd"
                    );

                    break;
                case "This Year":
                    this.startDate = kendo.toString(
                        new Date(today.getFullYear(), 0, 1),
                        "yyyy-MM-dd"
                    );
                    this.endDate = kendo.toString(
                        new Date(today.getFullYear(), 11, 31),
                        "yyyy-MM-dd"
                    );

                 break
                case "Last Month":
                  this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), -30), 'yyyy-MM-dd');
                  this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth() -1, +31), 'yyyy-MM-dd');
        
                  break
                case "Last Year":
                  this.startDate = kendo.toString(new Date(today.getFullYear(), -11, -30), 'yyyy-MM-dd');
                  this.endDate = kendo.toString(new Date(today.getFullYear(), -1, +31), 'yyyy-MM-dd');

                    break;
                default:
                    this.startDate = "";
                    this.endDate = "";
            }
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridMarginTransactionDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        async loadTransactions() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    this.transactions = []
                    const strFilter = '?start=' + this.startDate + '&end=' + this.endDate + '&type=product'
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
        }
    },
    mounted: async function () {
        // await this.loadTransactions()
    },
    computed: {},
    watch: {
        $route: "loadTransactions",
    },
};
</script>
<style scoped>
.k-pdf-export .k-grid {
    font-family: "DejaVu Sans", "Arial", sans-serif;
}

/* Hide the Grid header and pager during export */
.k-pdf-export .k-grid-toolbar,
.k-pdf-export .k-pager-wrap {
    display: none;
}
</style>
