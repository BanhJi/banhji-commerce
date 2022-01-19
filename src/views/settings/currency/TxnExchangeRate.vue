<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-3 ">
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
                                        v-on="on">
                                        <v-icon size="15" class="ma-1 mr-2">mdi-plus</v-icon>
                                        {{ $t("new") }}
                                    </v-btn>
                                </template>

                                <v-card>
                                    <div class="modal_header">
                                        <v-card-title
                                        >{{ $t("transaction_exchange_rate") }}
                                        </v-card-title>
                                        <v-icon @click="dialog = false">
                                            close
                                        </v-icon>
                                    </div>
                                    <v-card-text class="modal_text_content">
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pb-0">
                                                <label class="label ">{{
                                                        $t("effective_rate_date")
                                                    }}</label>
                                                <app-datepicker
                                                    :initialDate="txnCurrency.effectiveDate"
                                                    @emitDate="txnDate = $event"
                                                />

                                                <label class="label">{{ $t("currency") }}</label>
                                                <p class="text_tip">{{ $t("pls_select_currency") }}</p>
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
                                                    outlined
                                                    class="mt-1"
                                                    v-model="txnCurrency.rate"
                                                />
                                            </v-col>
                                            <v-col sm="6" cols="12" class="py-0">
                                                <label class="label">{{ $t("source") }}</label>
                                                <v-text-field
                                                    outlined
                                                    class="mt-1"
                                                    v-model="txnCurrency.source"
                                                    placeholder=""
                                                />
                                            </v-col>
                                            <v-col sm="12" cols="12" class="py-0">
                                                <p>{{ $t("note_exc_rate") }}</p>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>

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
                                                    :disabled="btnDisabled"
                                                    @click="onSaveClose"
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
                        <kendo-datasource ref="dataSource" :data="currencyList"/>

                        <kendo-grid
                            id="gridTxnCurrency"
                            class="grid-function"
                            :data-source-ref="'dataSource'"
                            :sortable="false"
                            :filterable="false"
                            :column-menu="true"
                            :resizable="true"
                            :editable="false"
                            :toolbar="toolbarTemplate"
                            :excel-export="excelExport"
                            :excel-file-name="'TxnCurrency.xlsx'"
                            :excel-filterable="true"
                            :scrollable-virtual="true"
                        >
                            <kendo-grid-column
                                :field="'createdAt'"
                                :title="$t('date')"
                                :column-menu="false"
                                :template="formatCreatedAt"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5;',
                  class: 'text-products',
                }"
                                :attributes="{
                  style: 'text-align: products',
                }"
                            />
                            <kendo-grid-column
                                :field="'effectiveDate'"
                                :title="$t('effective_date')"
                                :column-menu="false"
                                :template="formatEffectiveDate"
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
                                :field="'name'"
                                :attributes="{ class: 'tb_name_td' }"
                                :title="$t('name')"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'symbol'"
                                :title="$t('symbol')"
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
                                :field="'source'"
                                :title="$t('sources')"
                                :hidden="true"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'method'"
                                :title="$t('method')"
                                :hidden="true"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                :attributes="{ style: '' }"
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
import TxnCurrencyModel from "@/scripts/currency/model/TxnCurrency";
import kendo from "@progress/kendo-ui";
import Helper from "@/helper";

const currencyHandler = require("@/scripts/currency/handler/currencyHandler");
const txnCurrencyModel = new TxnCurrencyModel({});
const $ = kendo.jQuery;

import JSZip from "jszip";

window.JSZip = JSZip;
const currencyType = {
    FUNCTIONAL_CURRENCY: "fun-c",
    TRANSACTION_CURRENCY: "txn-c",
    REPORTING_CURRENCY: "rpt-c",
    TAX_EXCHANGE_CURRENCY: "tax-c",
};
export default {
    name: "TransactionCurrency",
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
        txnCurrencyList: [],
        funcCurrencyList: [],
        mCurrency: {},
        txnDate: "",
        txnCurrency: txnCurrencyModel,
        dateFormat: txnCurrencyModel.dateFormat,
        btnDisabled: false
    }),
    methods: {
        async loadCurrencyData(type) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    currencyHandler
                        .list(type)
                        .then((response) => {
                            if (response.data.statusCode === 200) {
                                this.showLoading = false
                                if (type === currencyType.FUNCTIONAL_CURRENCY) {
                                    this.funcCurrencyList = response.data.data;
                                } else if (type === currencyType.TRANSACTION_CURRENCY) {
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
                    if (this.txnCurrency.rate && this.mCurrency.code && this.txnDate) {
                        let data = {
                            id: this.txnCurrency.id ? this.txnCurrency.id : "",
                            type: currencyType.TRANSACTION_CURRENCY,
                            name: this.mCurrency.name,
                            code: this.mCurrency.code,
                            symbol: this.mCurrency.symbol,
                            effectiveDate: this.txnDate,
                            effectiveDateTZ: Helper.toISODate(this.txnDate),
                            source: this.txnCurrency.source,
                            method: "Manual",
                            rate: this.txnCurrency.rate,
                            symbolNative: this.mCurrency.symbolNative,
                        };
                        this.btnDisabled = true
                        this.showLoading = true
                        currencyHandler
                            .create(data)
                            .then((response) => {
                                if (response.data.statusCode === 201) {
                                    this.btnDisabled = false
                                    this.showLoading = false
                                    this.$snotify.success("Successfully");
                                    this.cancel();
                                    this.loadCurrencyData(currencyType.TRANSACTION_CURRENCY);
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
            this.txnCurrency = {};
            this.loadCurrencyData(currencyType.FUNCTIONAL_CURRENCY)
        },
        goEdit(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridTxnCurrency").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            this.txnCurrency = dataItem;
            this.mCurrency = dataItem;
            this.txnDate = dataItem.effectiveDate;
            this.dialog = true;
        },
        formatEffectiveDate(dataItem) {
            if (dataItem.hasOwnProperty("effectiveDate")) {
                return kendo.toString(
                    new Date(dataItem.effectiveDate),
                    `${this.dateFormat}`
                );
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

        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log(e.data);
        },
        initToolbar(that) {
            let grid = $("#gridTxnCurrency").data("kendoGrid");
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
                that.loadCurrencyData(currencyType.TRANSACTION_CURRENCY);
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
            const grid = $("#gridTxnCurrency").data("kendoGrid")
            grid.saveAsExcel()
        },
    },
    mounted: async function () {
        await this.loadCurrencyData(currencyType.FUNCTIONAL_CURRENCY);
        await this.loadCurrencyData(currencyType.TRANSACTION_CURRENCY);
        await this.initToolbar(this)
    },
};
</script>
<style scoped></style>
