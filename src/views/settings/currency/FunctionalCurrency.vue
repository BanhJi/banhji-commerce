<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12" class="pr-5">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white"
                    >
                        <v-card outlined dense class="no_border">
                            <h2 class="mb-0 font_20">{{ $t("functional_currency") }}</h2>
                            <v-icon
                                onclick="window.history.go(-1); return false;"
                                style="cursor: pointer; color: #333; font-size: 40px;"
                                class="float-right"
                            >close
                            </v-icon>
                        </v-card>
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0">
                                <template>
                                    <v-dialog v-model="dialogM1" max-width="500px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                color="primary"
                                                class=" text-capitalize white--text float-right"
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                <v-icon size="15" class="ma-1 mr-2">mdi-plus</v-icon>
                                                {{ $t("new") }}
                                            </v-btn>
                                        </template>

                                        <v-card>
                                            <div class="modal_header">
                                                <v-card-title>{{
                                                        $t("functional_currency")
                                                    }}
                                                </v-card-title>
                                                <v-icon class="btn_close" @click="dialogM1 = false">
                                                    close
                                                </v-icon>
                                            </div>
                                            <v-card-text class="modal_text_content">
                                                <v-form ref="form" v-model="valid" lazy-validation>
                                                    <v-row>
                                                        <v-col sm="12" cols="12" class="pb-0">
                                                            <label class="label">{{
                                                                    $t("enable_new_currency")
                                                                }}</label>
                                                            <v-select
                                                                class="mt-1"
                                                                :items="currencyJSON"
                                                                v-model="mCurrency"
                                                                item-value="code"
                                                                :rules="[(v) => !!v['code']|| $t('is_required')]"
                                                                :item-text=" (item) => `${item.code} - ${item.name}`"
                                                                return-object
                                                                outlined>
                                                            </v-select>
                                                            <label class="label">{{
                                                                    $t("effective_rate_date")
                                                                }}</label>
                                                            <app-datepicker
                                                                :initialDate="effectiveDate"
                                                                @emitDate="effectiveDate = $event"
                                                            />
                                                        </v-col>
                                                        <v-col sm="6" cols="12" class="py-0">
                                                            <label class="label">{{ $t("rate") }}</label>
                                                            <v-text-field
                                                                ref="field"
                                                                v-model="rate"
                                                                :rules="[(v) => !!v || $t('is_required')]"
                                                                tage="Rate"
                                                                outlined
                                                            />
                                                        </v-col>
                                                        <v-col sm="6" cols="12" class="py-0">
                                                            <label class="label">{{ $t("source") }}</label>
                                                            <v-text-field
                                                                v-model="source"
                                                                class=" col-sm-6"
                                                                :rules="[(v) => !!v || $t('is_required')]"
                                                                outlined
                                                                placeholder=""
                                                            />
                                                        </v-col>
                                                    </v-row>
                                                </v-form>
                                            </v-card-text>
                                            <v-card-actions class="modal_footer">
                                                <v-row>
                                                    <v-col sm="6" cols="6" class="py-0 text-left">
                                                        <v-btn
                                                            color="primary"
                                                            outlined
                                                            class=" text-capitalize  black--text float-left"
                                                            @click="dialogM1 = false"
                                                        >{{ $t("close") }}
                                                        </v-btn>
                                                    </v-col>
                                                    <v-col sm="6" cols="6" class="py-0 text-right">
                                                        <v-btn
                                                            color="primary"
                                                            @click="onSaveClose"
                                                            :disabled="btnDisabled"
                                                            class="px-3  white--text text-capitalize"
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
                        </v-row>
                        <v-row>
                            <v-col sm="12" cols="12">
                                <LoadingMe
                                    :isLoading="showLoading"
                                    :fullPage="false"
                                    type="loading"
                                    :myLoading="true"
                                />
                                <kendo-datasource ref="functionCurrencyDS" :data="currencyList"/>

                                <kendo-grid
                                    id="gridFunctionCurrency"
                                    class="grid-function"
                                    :data-source-ref="'functionCurrencyDS'"
                                    :sortable="false"
                                    :filterable="false"
                                    :column-menu="true"
                                    :editable="false"
                                    :resizable="true"
                                    :toolbar="toolbarTemplate"
                                    :excel-export="excelExport"
                                    :excel-file-name="'FunctionalCurrency.xlsx'"
                                    :excel-filterable="true"
                                    :scrollable-virtual="true">
                                    <kendo-grid-column
                                        :title="$t('date')"
                                        :template="formatDate"
                                        :column-menu="false"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-products', }"
                                        :attributes="{ style: 'text-align: products', }"
                                    />
                                    <kendo-grid-column
                                        :field="'code'"
                                        :title="$t('code')"
                                        :template="'<span>#=code?code:``#</span>'"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5',}"
                                    />
                                    <kendo-grid-column
                                        :field="'name'"
                                        :attributes="{ class: 'tb_name_td' }"
                                        :title="$t('name')"
                                        :template="'<span>#=name?name:``#</span>'"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5', }"
                                    />
                                    <kendo-grid-column
                                        :field="'symbol'"
                                        :title="$t('symbol')"
                                        :template="'<span>#=symbol?symbol:``#</span>'"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5', }"
                                    />
                                    <kendo-grid-column
                                        :field="'symbolNative'"
                                        :title="$t('native_symbol')"
                                        :template="'<span>#=symbolNative?symbolNative:``#</span>'"
                                        :headerAttributes="{ style: ' background-color: #EDF1F5' }"
                                        :attributes="{ style: '' }"
                                    />
                                    <!--                                    <kendo-grid-column-->
                                    <!--                                        :command="{ iconClass: 'k-icon k-i-edit', text: 'Edit', class: 'btn-plus' , click: goEdit}"-->
                                    <!--                                        :title="$t('action')"-->
                                    <!--                                        :headerAttributes="{-->
                                    <!--                            style: 'text-align: right; background-color: #EDF1F5'-->
                                    <!--                        }"-->
                                    <!--                                    />-->
                                </kendo-grid>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import CurrencyModel from "@/scripts/currency/model/Currency";
import kendo from "@progress/kendo-ui";
import Helper from "@/helper";

const $ = kendo.jQuery
const currencyHandler = require("@/scripts/currency/handler/currencyHandler");
const currencyModel = new CurrencyModel({});
const currencyType = {
    FUNCTIONAL_CURRENCY: "fun-c",
    TRANSACTION_CURRENCY: "txn-c",
    REPORTING_CURRENCY: "rpt-c",
    TAX_EXCHANGE_CURRENCY: "tax-c",
};

import JSZip from "jszip";

window.JSZip = JSZip;
export default {
    name: "FunctionalCurrency",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": () => import("@/components/custom_templates/DatePickerComponent"),
    },
    data: () => ({
        effectiveDate: new Date().toISOString().substr(0, 10),
        valid: true,
        dialogM1: false,
        showLoading: true,
        currency: currencyModel,
        mCurrency: {},
        dateFormat: currencyModel.dateFormat,
        currencyJSON: [],
        currencyList: [],
        rate: 1,
        source: '',
        btnDisabled: false
    }),
    methods: {
        goEdit(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#grid").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            this.mCurrency = dataItem;
            this.dialogM1 = true;
        },
        formatDate(dataItem) {
            if (dataItem.hasOwnProperty("createdAt")) {
                return kendo.toString(
                    new Date(dataItem.createdAt),
                    `${this.dateFormat}`
                );
            }
            return "";
        },
        async loadCurrencyJSON() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    currencyHandler
                        .getJson()
                        .then((res) => {
                            this.currencyJSON = Object.values(res.data);
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 10);
            });
        },
        cancel() {
            this.dialogM1 = false;
        },
        close() {
            window.history.back(-1);
        },
        async loadCurrencyData() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    currencyHandler
                        .list(currencyType.FUNCTIONAL_CURRENCY)
                        .then((response) => {
                            if (response.data.statusCode === 200) {
                                this.currencyList = response.data.data;
                                this.showLoading = false;
                            } else {
                                this.showLoading = false;
                            }
                        })
                }, 10);
            });
        },
        async onSaveClose() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                return;
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const exist = this.currencyList.filter((n) => n.code === this.mCurrency.code);
                    if (exist.length === 0) {
                        let data = {
                            id: this.currency.id ? this.currency.id : "",
                            type: currencyType.FUNCTIONAL_CURRENCY,
                            name: this.mCurrency.name,
                            code: this.mCurrency.code,
                            symbol: this.mCurrency.symbol,
                            rate: this.rate,
                            source: this.source,
                            effectiveDate: this.effectiveDate,
                            effectiveDateTZ: Helper.toISODate(this.effectiveDate),
                            symbolNative: this.mCurrency.symbol_native,
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
                                    this.loadCurrencyData();
                                } else {
                                    this.btnDisabled = false
                                    this.showLoading = false
                                }
                            })
                            .catch((e) => {
                                this.$snotify.error("Something went wrong");
                                this.errors.push(e);
                            });
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
            let grid = $("#gridFunctionCurrency").data("kendoGrid");
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
                that.loadCurrencyData();
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
            const grid = $("#gridFunctionCurrency").data("kendoGrid")
            grid.saveAsExcel()
        },
    },
    mounted: async function () {
        await this.loadCurrencyJSON();
        await this.loadCurrencyData();
        await this.initToolbar(this);
    },
};
</script>
<style scoped>
@media (min-width: 1264px) {
    .container {
        max-width: 1080px !important;
    }
}
</style>
