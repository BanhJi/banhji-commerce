<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-3">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row class="">
                    <v-col sm="12" cols="12" class="pt-0">
                        <template>
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="primary"
                                        class=" text-capitalize white--text float-right"
                                        @click="clear"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon size="15" class="ma-1 mr-2">mdi-plus</v-icon>
                                        {{ $t("new") }}
                                    </v-btn>
                                </template>

                                <v-card>
                                    <div class="modal_header">
                                        <v-card-title
                                        >{{ $t("reporting_exchange_rate") }}
                                        </v-card-title>
                                        <v-icon @click="dialog = false">
                                            close
                                        </v-icon>
                                    </div>
                                    <v-card-text class="modal_text_content">
                                        <v-row>
                                            <v-col sm="6" cols="12" class="pb-0">
                                                <label class="label">{{ $t("record_date") }}</label>
                                                <app-datepicker
                                                    :initialDate="reportingCurrency.recordDate"
                                                    @emitDate="txnDate = $event"
                                                />
                                            </v-col>
                                            <v-col sm="6" cols="12" class="pb-0">
                                                <label class="label">{{ $t("for_year") }}</label>

                                                <v-select
                                                    class="mt-1"
                                                    :items="fiscalDates"
                                                    v-model="mYear"
                                                    item-text="year"
                                                    item-value="id"
                                                    @change="loadReportingPeriod"
                                                    return-object
                                                    outlined
                                                >
                                                </v-select>
                                            </v-col>
                                            <v-col sm="12" cols="12" class="py-0">
                                                <label class="label">{{ $t("currency") }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    :items="funcCurrencyList"
                                                    v-model="mCurrency"
                                                    item-value="code"
                                                    :item-text="(item) => `${item.code} - ${item.name}`"
                                                    return-object
                                                    outlined
                                                >
                                                </v-select>
                                            </v-col>

                                            <v-col sm="6" cols="12" class="py-0">
                                                <label class="label">{{ $t("rate") }}</label>
                                                <v-text-field
                                                    class="mt-1"
                                                    v-model="reportingCurrency.rate"
                                                    outlined
                                                />
                                            </v-col>
                                            <v-col sm="6" cols="12" class="py-0">
                                                <label class="label">{{ $t("source") }}</label>
                                                <v-text-field
                                                    class="mt-1"
                                                    v-model="reportingCurrency.source"
                                                    outlined
                                                    placeholder=""
                                                />
                                            </v-col>

                                            <v-col sm="12" cols="12" class=" py-0">
                                                <label class="label">{{
                                                        $t("for_report_period")
                                                    }}</label>
                                                <v-row>
                                                    <v-col sm="6" cols="12" class="py-0">
                                                        <v-select
                                                            class="mt-1"
                                                            :items="reportingPeriodTypes"
                                                            @change="loadReportingPeriod"
                                                            v-model="mPeriod"
                                                            return-object
                                                            outlined
                                                        >
                                                        </v-select>
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="py-0">
                                                        <v-select
                                                            class="mt-1"
                                                            :items="rptPeriods"
                                                            v-model="reportingCurrency.period"
                                                            item-value="id"
                                                            :item-text="
                                (item) => `${item.code} - ${item.name}`
                              "
                                                            return-object
                                                            outlined
                                                        />
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-divider/>
                                    <v-card-actions class="modal_footer">
                                        <v-row>
                                            <v-col sm="6" cols="6" class="py-0 text-left">
                                                <v-btn
                                                    color="primary"
                                                    outlined
                                                    class=" text-capitalize  black--text float-left"
                                                    @click="dialog = false"
                                                >{{ $t("cancel") }}
                                                </v-btn>
                                            </v-col>
                                            <v-col sm="6" cols="6" class="py-0 text-right">
                                                <v-btn
                                                    color="primary"
                                                    class="px-3  white--text text-capitalize"
                                                    @click="onSaveClose"
                                                    :disabled="btnDisabled"
                                                >
                                                    {{ $t("save_close") }}
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </template>
                    </v-col>

                    <v-col sm="12" cols="12" class="pt-0">
                        <LoadingMe
                            :isLoading="showLoading"
                            :fullPage="false"
                            :myLoading="true"
                            type="loading"
                        />
                        <kendo-datasource ref="rptDS" :data="currencyList"/>

                        <kendo-grid
                            id="gridReportingCurrency"
                            class="grid-function"
                            :data-source-ref="'rptDS'"
                            :sortable="false"
                            :filterable="false"
                            :column-menu="true"
                            :editable="false"
                            :resizable="true"
                            :toolbar="toolbarTemplate"
                            :excel-export="excelExport"
                            :excel-file-name="'ReportingCurrency.xlsx'"
                            :excel-filterable="true"
                            :scrollable-virtual="true"
                        >
                            <kendo-grid-column
                                :field="'createdAt'"
                                :title="$t('date')"
                                :template="formatCreatedAt"
                                :column-menu="false"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5;',
                  class: 'text-products',
                }"
                                :attributes="{
                  style: 'text-align: products',
                }"
                            />
                            <kendo-grid-column
                                :field="'recordDate'"
                                :title="$t('record_date')"
                                :template="formatRecordDate"
                                :column-menu="false"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5;',
                  class: 'text-products',
                }"
                                :attributes="{
                  style: 'text-align: products',
                }"
                            />
                            <kendo-grid-column
                                :field="'code'"
                                :title="$t('code')"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'rate'"
                                :title="$t('rate')"
                                :headerAttributes="{ style: ' background-color: #EDF1F5' }"
                                :attributes="{ style: '' }"
                            />
                            <kendo-grid-column
                                :field="'name'"
                                :attributes="{ class: 'tb_name_td' }"
                                :title="$t('name')"
                                :hidden="true"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'year'"
                                :title="$t('year')"
                                :template="forYear"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'period'"
                                :title="$t('period')"
                                :template="period"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'periodType'"
                                :title="$t('period_type')"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'source'"
                                :title="$t('sources')"
                                :hidden="true"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :command="{
                  iconClass: 'k-icon k-i-edit',
                  text: ' ',
                  class: 'btn-plus',
                  click: goEdit,
                }"
                                :title="$t('action')"
                                :headerAttributes="{
                  style: 'text-align: right; background-color: #EDF1F5',
                }"
                            />
                        </kendo-grid>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import ReportingCurrencyModel from "@/scripts/currency/model/ReportingCurrency";
import kendo from "@progress/kendo-ui";
import Helper from "@/helper";

const currencyHandler = require("@/scripts/currency/handler/currencyHandler");
const reportingCurrencyModel = new ReportingCurrencyModel({});
const $ = kendo.jQuery;
/* Cookie */
const cookieJS = require("@/cookie.js");
const {instituteId} = cookieJS.getCookie();

const instituteHandler = require("@/scripts/instituteHandler");
const currencyType = {
    FUNCTIONAL_CURRENCY: "fun-c",
    TRANSACTION_CURRENCY: "txn-c",
    REPORTING_CURRENCY: "rpt-c",
    TAX_EXCHANGE_CURRENCY: "tax-c",
};

import JSZip from "jszip";

window.JSZip = JSZip;
export default {
    name: "ReportingCurrency",
    components: {
        "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        dialog: false,
        showLoading: true,
        loadingAlert: false,
        loadingColorAlert: "",
        loadingTextAlert: "",
        currencyList: [],
        rptPeriods: [],
        rptCurrencyList: [],
        funcCurrencyList: [],
        mCurrency: {},
        company: {},
        txnDate: new Date().toISOString().substr(0, 10),
        mYear: {},
        fiscalDates: [],
        reportingCurrency: reportingCurrencyModel,
        dateFormat: reportingCurrencyModel.dateFormat,
        reportingPeriodTypes: ["Monthly", "Quarterly", "Semi-Annually", "Annually"],
        mPeriod: "Monthly",
        btnDisabled: false
    }),
    methods: {
        async loadInstituteInfo() {
            new Promise((resolve) => {
                setTimeout(() => {
                    instituteHandler.getOneCompany(instituteId).then((res) => {
                        this.company = res;
                        let fd = [];
                        if (this.company.hasOwnProperty("fiscalDate")) {
                            fd = this.company.fiscalDate;
                            this.fiscalDates = fd.map((n) => {
                                return {
                                    id: n.uuid,
                                    startDate: n.start_date,
                                    year: new Date(n.start_date).getFullYear(),
                                };
                            });
                            if (this.fiscalDates.length > 0) {
                                this.mYear = this.fiscalDates.filter(
                                    (m) => m.year === new Date().getFullYear()
                                )[0];
                            }
                        }
                    });
                    resolve("resolved");
                }, 200);
            });
        },
        async loadCurrencyData(type) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    currencyHandler
                        .list(type)
                        .then((response) => {
                            if (response.data.statusCode === 200) {
                                this.showLoading = false;
                                if (type === currencyType.FUNCTIONAL_CURRENCY) {
                                    this.funcCurrencyList = response.data.data;
                                } else if (type === currencyType.REPORTING_CURRENCY) {
                                    this.currencyList = response.data.data;
                                }
                            } else {
                                this.showLoading = false;
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 10);
            });
        },
        async onSaveClose() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (
                        this.reportingCurrency.rate &&
                        this.mCurrency.code &&
                        this.txnDate
                    ) {
                        const period = this.reportingCurrency.period || {}
                        const year = this.mYear || {}

                        let data = {
                            id: this.reportingCurrency.id ? this.reportingCurrency.id : "",
                            type: currencyType.REPORTING_CURRENCY,
                            name: this.mCurrency.name,
                            code: this.mCurrency.code,
                            symbol: this.mCurrency.symbol,
                            recordDate: this.txnDate,
                            recordDateTZ: Helper.toISODate(this.txnDate),
                            year: {
                                id: year.id || '',
                                startDate: year.startDate || '',
                                year: year.year || '',
                                uid: year.uid || ''
                            },
                            periodType: this.mPeriod,
                            period: {
                                id: period.id || '',
                                code: period.code || '',
                                name: period.name || '',
                                startDate: period.startDate || '',
                                endDate: period.endDate || '',
                                fiscalDate: period.fiscalDate || '',
                                uid: period.uid || '',
                            },
                            source: this.reportingCurrency.source,
                            method: "Manual",
                            rate: this.reportingCurrency.rate,
                            symbolNative: this.mCurrency.symbolNative,
                        };
                        window.console.log('data', data)
                        this.btnDisabled = true
                        this.showLoading = true
                        currencyHandler
                            .create(data)
                            .then((response) => {
                                if (response.data.statusCode === 201) {
                                    this.btnDisabled = true
                                    this.showLoading = true
                                    this.$snotify.success("Successfully");
                                    this.cancel();
                                    this.loadCurrencyData(currencyType.REPORTING_CURRENCY);
                                } else {
                                    this.btnDisabled = false
                                    this.showLoading = false
                                }
                            })
                            .catch((e) => {
                                this.btnDisabled = false
                                this.showLoading = false
                                this.$snotify.error("Something went wrong");
                                this.errors.push(e);
                            });
                    }
                }, 10);
            });
        },
        cancel() {
            this.dialog = false;
        },
        clear() {
            this.btnDisabled = false
            this.reportingCurrency = {};
            this.loadCurrencyData(currencyType.FUNCTIONAL_CURRENCY)
        },
        goEdit(e) {
            e.preventDefault();
            this.btnDisabled = false
            let grid = kendo.jQuery("#gridReportingCurrency").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            this.reportingCurrency = dataItem;
            this.mCurrency = dataItem;
            this.txnDate = dataItem.recordDate;

            this.mYear = dataItem.year;
            this.loadReportingPeriod();
            this.dialog = true;
        },
        formatRecordDate(dataItem) {
            if (dataItem.hasOwnProperty("recordDate")) {
                return kendo.toString(
                    new Date(dataItem.recordDate),
                    `${this.dateFormat}`
                );
            }
            return "";
        },
        forYear(dataItem) {
            if (dataItem.hasOwnProperty("year")) {
                if (dataItem.year.hasOwnProperty("id")) {
                    return dataItem.year.year;
                }
            }
            return "";
        },
        period(dataItem) {
            if (dataItem.hasOwnProperty("period")) {
                if (dataItem.period.hasOwnProperty("id")) {
                    return dataItem.period.code + "/" + dataItem.period.name;
                }
            }
            return "";
        },
        formatCreatedAt(dataItem) {
            if (dataItem.hasOwnProperty("createdAt")) {
                return kendo.toString(
                    new Date(dataItem.createdAt),
                    `${this.dateFormat}`
                );
            }
            return "";
        },
        async loadReportingPeriod() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    currencyHandler
                        .reportingPeriod(this.mPeriod, this.mYear.startDate)
                        .then((response) => {
                            if (response.data.statusCode === 200) {
                                this.rptPeriods = response.data.data;
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 10);
            });
        },

        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log(e.data);
        },
        initToolbar(that) {
            let grid = $("#gridReportingCurrency").data("kendoGrid");
            let gridElement = grid.element;
            let toolbarElement = gridElement.find(".k-grid-toolbar");
            toolbarElement.on("click", ".k-pager-refresh", function (e) {
                e.preventDefault();
                onReloadData(that);
            });
            toolbarElement.on("click", ".k-pager-excel", function (e) {
                e.preventDefault();
                onExportExcel(that);
            });

            function onReloadData(that) {
                that.loadCurrencyData(currencyType.REPORTING_CURRENCY);
            }

            function onExportExcel(that) {
                that.exportToExcel();
            }
        },
        toolbarTemplate: function () {
            const templateHtml =
                '<span>' +
                '<a class="k-pager-excel k-link k-button excel" title="Export to Excel"> <span class="k-icon k-i-excel"></span>Export to excel </a>' +
                '</span><span>&nbsp;&nbsp;</span>' +
                '<span style="position:absolute; right:5px">' +
                '</span>' +
                '<span>' +
                '<a class="k-pager-refresh k-link k-button reload" title="Refresh"><span class="k-icon k-i-reload"></span> Refresh </a>' +
                '</span>'

            return kendo.template(templateHtml)
        },
        exportToExcel() {
            const grid = $("#gridReportingCurrency").data("kendoGrid")
            grid.saveAsExcel()
        },
    },
    mounted: async function () {
        await this.loadInstituteInfo();
        await this.loadCurrencyData(currencyType.FUNCTIONAL_CURRENCY);
        await this.loadCurrencyData(currencyType.REPORTING_CURRENCY);
        await this.loadReportingPeriod();
        await this.initToolbar(this);
    },
};
</script>
<style scoped></style>
