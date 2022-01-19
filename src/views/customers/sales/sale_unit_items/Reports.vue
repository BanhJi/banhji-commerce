<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="9" cols="12" class="py-0">
                        <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                                        :initEndDate="endDate" @emitEndDate="endDate = $event"/>
                    </v-col>

                    <v-col sm="1" cols="12" class="py-0 mt-1">
                        <v-btn class="btn_search" style="background-color: rgb(237, 241, 245)"
                               @click="searchTransaction">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                    <!-- <v-col sm="2" cols="12" class="py-0 text-right">
                        <v-btn icon color="black" class="bg-none float-right ">
                            <v-icon class="font_34">fa fa-file-excel</v-icon>
                        </v-btn>

                        <v-btn icon color="black" class="bg-none float-right ml-2">
                            <v-icon class="font_34">fa fa-print</v-icon>
                        </v-btn>
                    </v-col> -->
                </v-row>
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                type="loading"
                                :myLoading="true"/>
                            <template>
                                <kendo-datasource ref="saleUnitItemReportDS"
                                                  :group="group"
                                                  :data="transactions"/>
                                <kendo-grid id="gridSaleUnitItemReport" class="grid-function"
                                            :data-source-ref="'saleUnitItemReportDS'"
                                            :editable="false"
                                            :groupable="true"
                                            :toolbar="toolbarTemplate"
                                            :excel-export="excelExport"
                                            :excel-file-name="'SaleUnitItemReport.xlsx'"
                                            :excel-filterable="true"
                                            :scrollable-virtual="true">
                                    <kendo-grid-column
                                        :field="'name'"
                                        :title="$t('name')"
                                        :attributes="{class:'tb_name_td'}"
                                        :width="150"
                                        :template="'<span>#=name#</span>'"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'item.name'"
                                        :title="$t('item')"
                                        :width="150"
                                        :template="'<span>#=item.name || ``#</span>'"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'transactionDate'"
                                        :title="$t('transaction_date')"
                                        :width="180"
                                        :template="'<span>#=kendo.toString(new Date(transactionDate), dateFormat)#</span>'"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'exchangeAmount'"
                                        :title="$t('amount')"
                                        :width="180"
                                        :template="'<span>#= kendo.toString(exchangeAmount, decimalFormat)#</span>'"
                                        :attributes="{style: 'text-align: right'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>

                                    <kendo-grid-column
                                        :field="'exchangeDiscount'"
                                        :title="$t('discount')"
                                        :width="180"
                                        :template="'<span>#= kendo.toString(exchangeDiscount, decimalFormat)#</span>'"
                                        :attributes="{style: 'text-align: right'}"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'transactionType.name'"
                                        :title="$t('type')"
                                        :template="'<span>#= transactionType.name #</span>'"
                                        :width="180"
                                        :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                                </kendo-grid>
                            </template>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import SearchDateComponent from '@/components/custom_templates/SearchDate'
import kendo from "@progress/kendo-ui";

const $ = kendo.jQuery
const discountItemHandler = require("@/scripts/discountItemHandler")
import JSZip from "jszip";
window.JSZip = JSZip;
export default {
    data: () => ({
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters: ["Today", "This Week", "This Month", "This Year"],
        transactions: [],
        showLoading: false,
        mDateSorter: 'Today',
        group: {field: 'name'},
    }),
    components: {
        'app-searchdate': SearchDateComponent,
        LoadingMe: () => import(`@/components/Loading`),
    },
    methods: {
        async searchTransaction() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    const startDate = this.startDate
                    const endDate = this.endDate
                    let strFilter = '?start=&end=&type=Sale'
                    if (startDate !== '' && endDate !== '') {
                        strFilter = '?start=' + startDate + '&end=' + endDate
                    }
                    discountItemHandler.saleUnitReport(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.transactions = JSON.parse(JSON.stringify(res.data.data))
                        }
                    })
                }, 10);
            })
        },

        toolbarTemplate: function () {
            const templateHtml =
                '<span>' +
                '<a class="k-pager-excel k-link k-button excel" title="Export to Excel"> <span class="k-icon k-i-excel"></span>Export to excel </a>' +
                '</span><span>&nbsp;&nbsp;</span>' +
                '<span style="position:absolute; right:5px">' +
                '</span>'

            return kendo.template(templateHtml)
        },
        exportToExcel() {
            window.console.log('1')
            const grid = $("#gridSaleUnitItemReport").data("kendoGrid")
            grid.saveAsExcel()
        },
        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log(e.data);
        },
        initToolbar(that) {
            let grid = $("#gridSaleUnitItemReport").data("kendoGrid");
            let gridElement = grid.element;
            let toolbarElement = gridElement.find(".k-grid-toolbar");
            toolbarElement.on("click", ".k-pager-excel", function (e) {
                e.preventDefault();
                onExportExcel(that);
            });

            function onExportExcel(that) {
                that.exportToExcel();
            }
        },


    },
    computed: {},
    mounted: async function () {
        await this.initToolbar(this)
    }
};
</script>
<style scoped>
.k-chart {
    height: 180px;
}

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
