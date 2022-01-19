<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-3">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row class="">
                    <v-col sm="12" cols="12" class="pt-0">
                        <template>
                            <v-dialog v-model="dialog" max-width="500px">

                                <template v-slot:activator="{ on, attrs }">
                                    <!--                                    <div v-if="baseCurrency==='USD'">-->
                                    <v-btn color="primary" class=" text-capitalize white--text float-right"
                                           @click="clear"
                                           v-bind="attrs"
                                           v-on="on">
                                        <v-icon size="15" class="ma-1 mr-2">mdi-plus
                                        </v-icon>
                                        {{ $t('new') }}
                                    </v-btn>
                                    <!--                                    </div>-->
                                </template>

                                <v-card>
                                    <div class="modal_header">
                                        <v-card-title>{{ $t('tax_exchange_rate') }}</v-card-title>
                                        <v-icon @click="dialog = false">close</v-icon>
                                    </div>
                                    <v-card-text class="modal_text_content">
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pb-0">
                                                <label class="label">{{
                                                        $t('record_date')
                                                    }}</label>
                                                <app-datepicker :initialDate="txnDate"
                                                                @emitDate="txnDate = $event"/>
                                            </v-col>
                                            <v-col sm="12" cols="12" class="pb-0">
                                                <label class="label">{{
                                                        $t('currency')
                                                    }}</label>
                                                <!-- <v-select class="mt-1"
                                                        :items="currencyList"
                                                        v-model="mCurrency"
                                                        item-value="code"
                                                        :item-text="item =>`${item.code} - ${item.name}`"
                                                        return-object
                                                        outlined>
                                                </v-select> -->
                                                <v-text-field ref="field"
                                                              v-model="Currency"
                                                              tage="Rate"
                                                              class="col-sm-6"
                                                              outlined readonly/>
                                            </v-col>
                                            <v-col sm="6" cols="12" class="py-0">
                                                <label class="label">{{
                                                        $t('rate')
                                                    }}</label>
                                                <v-text-field ref="field"
                                                              v-model="taxExchangeCurrency.rate"
                                                              tage="Rate"
                                                              class="col-sm-6"
                                                              outlined/>
                                            </v-col>
                                            <v-col sm="6" cols="12" class="py-0">
                                                <label class="label">{{
                                                        $t('source')
                                                    }}</label>
                                                <v-text-field
                                                    class=" col-sm-6"
                                                    v-model="taxExchangeCurrency.source"
                                                    tage="Source"
                                                    outlined
                                                    placeholder=""/>
                                            </v-col>

                                            <v-col sm="12" cols="12" class="py-0">
                                                <label class="label">{{
                                                        $t('for_report_period')
                                                    }}</label>
                                                <app-datepicker :initialDate="taxExchangeCurrency.effectiveDate"
                                                                @emitDate="txnTaxPeriodDate = $event"/>
                                            </v-col>
                                            <v-col sm="12" cols="12" class="py-0">
                                                <p>{{ $t('note_exc_rate') }}</p>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-actions class="modal_footer">
                                        <v-row>
                                            <v-col sm="6" cols="6" class="py-0 text-left">
                                                <v-btn color="primary" outlined
                                                       class=" text-capitalize  black--text float-left"
                                                       @click="dialog = false">{{
                                                        $t('cancel')
                                                    }}
                                                </v-btn>
                                            </v-col>
                                            <v-col sm="6" cols="6" class="py-0 text-right">
                                                <v-btn color="primary" class="px-3  white--text text-capitalize"
                                                       :disabled="btnDisabled"
                                                       @click="onSaveClose">
                                                    {{ $t('save_close') }}
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
                            type="loading"/>
                        <kendo-datasource ref="TaxDS" :data="currencyList"/>

                        <kendo-grid id="gridTaxExchangeRate" class="grid-function"
                                    :data-source-ref="'TaxDS'"
                                    :sortable="false"
                                    :filterable="false"
                                    :column-menu="true"
                                    :editable="false"
                                    :resizable="true"
                                    :toolbar="toolbarTemplate"
                                    :excel-export="excelExport"
                                    :excel-file-name="'TaxCurrency.xlsx'"
                                    :excel-filterable="true"
                                    :scrollable-virtual="true">
                            <kendo-grid-column
                                :title="$t('date')"
                                :column-menu="false"
                                :template="formatRecordDate"
                                :headerAttributes="{
                                        style: 'background-color: #EDF1F5;',
                                        class: 'text-products'
                                    }"
                                :attributes="{
                                        style: 'text-align: products'
                                    }"/>
                            <kendo-grid-column
                                :title="$t('effective_date')"
                                :column-menu="false"
                                :template="formatEffectiveDate"
                                :headerAttributes="{
                                        style: 'background-color: #EDF1F5;',
                                        class: 'text-products'
                                    }"
                                :attributes="{
                                        style: 'text-align: products'
                                    }"/>
                            <kendo-grid-column
                                :field="'code'"
                                :title="$t('code')"
                                :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                            <kendo-grid-column
                                :field="'name'"
                                :attributes="{class:'tb_name_td'}"
                                :title="$t('name')"
                                :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                            <kendo-grid-column
                                :field="'rate'"
                                :title="$t('rate')"
                                :headerAttributes="{style: ' background-color: #EDF1F5'}"
                                :attributes="{style: ''}"/>
                            <kendo-grid-column
                                :field="'source'"
                                :title="$t('sources')"
                                :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                            <kendo-grid-column
                                :command="{ iconClass: 'k-icon k-i-edit', text: ' ', class: 'btn-plus' , click: goEdit}"
                                :title="$t('action')"
                                :headerAttributes="{
                                        style: 'text-align: right; background-color: #EDF1F5'
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

import TaxExchangeCurrencyModel from "@/scripts/currency/model/TaxExchangeCurrency";
import kendo from "@progress/kendo-ui";
import Helper from "@/helper";

const instituteHandler = require("@/scripts/instituteHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const taxExchangeCurrencyModel = new TaxExchangeCurrencyModel({})
const $ = kendo.jQuery;

const currencyType = {
    TAX_EXCHANGE_CURRENCY: 'tax-c',
}
/* Cookie */
const cookieJS = require("@/cookie.js");
const {instituteId} = cookieJS.getCookie();
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
    name: "TaxExchangeCurrency",
    components: {
        'app-datepicker': () => import(`@/components/custom_templates/DatePickerComponent`),
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        company: {},
        dialog: false,
        showLoading: false,
        currencyList: [],
        funcCurrencyList: [],
        txnDate: new Date(),
        txnTaxPeriodDate: new Date().toISOString().substr(0, 10),
        taxExchangeCurrency: taxExchangeCurrencyModel,
        dateFormat: taxExchangeCurrencyModel.dateFormat,
        btnDisabled: false
    }),
    methods: {
        async loadInstituteInfo() {
            new Promise(resolve => {
                setTimeout(() => {
                    instituteHandler.getOneCompany(instituteId).then(res => {
                        this.company = res
                        window.console.log(this.company)
                    })
                    resolve('resolved');
                }, 200);
            });
        },
        async loadCurrencyData(type) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    currencyHandler.list(type).then(response => {
                        if (response.data.statusCode === 200) {
                            if (type === currencyType.TAX_EXCHANGE_CURRENCY) {
                                this.currencyList = response.data.data
                            }
                            this.showLoading = false
                        } else {
                            this.showLoading = false
                        }
                    })
                }, 10)
            })
        },
        async onSaveClose() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    if (this.taxExchangeCurrency.rate && this.company.taxCurrency.code && this.txnDate && this.txnTaxPeriodDate) {
                        let data = {
                            "id": this.taxExchangeCurrency.id ? this.taxExchangeCurrency.id : '',
                            "type": currencyType.TAX_EXCHANGE_CURRENCY,
                            "name": this.company.taxCurrency.name,
                            "code": this.company.taxCurrency.code,
                            "symbol": this.company.taxCurrency.symbol,
                            "recordDate": this.txnDate,
                            "effectiveDate": this.txnTaxPeriodDate,
                            "effectiveDateTZ": Helper.toISODate(this.txnTaxPeriodDate),
                            "source": this.taxExchangeCurrency.source,
                            "method": 'Manual',
                            "rate": this.taxExchangeCurrency.rate,
                            "symbolNative": this.company.taxCurrency.symbolNative ? this.company.taxCurrency.symbolNative : ''
                        }
                        window.console.log(1, data)
                        currencyHandler.create(data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.$snotify.success('Successfully')
                                this.cancel()
                                const res = response.data.data
                                const index = this.currencyList.findIndex(item => {
                                    return (res.id === item.id)
                                })
                                if (this.currencyList.length === 0) {
                                    this.loadCurrencyData(currencyType.TAX_EXCHANGE_CURRENCY)
                                }
                                if (index < 0) {
                                    this.currencyList.push(res)
                                } else {
                                    this.currencyList.splice(index, 1, res)
                                }
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }
                }, 10);
            })
        },
        cancel() {
            this.dialog = false
        },
        clear() {
            this.taxExchangeCurrency = {}
        },
        goEdit(e) {
            e.preventDefault()
            this.btnDisabled = false
            let grid = kendo.jQuery("#gridTaxExchangeRate").data("kendoGrid")
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            this.taxExchangeCurrency = dataItem
            this.mCurrency = dataItem
            this.txnDate = dataItem.recordDate
            this.txnTaxPeriodDate = dataItem.effectiveDate
            this.dialog = true
        },
        formatEffectiveDate(dataItem) {
            if (dataItem.hasOwnProperty('effectiveDate')) {
                return kendo.toString(new Date(dataItem.effectiveDate), `${this.dateFormat}`)
            }
            return ''
        },
        formatRecordDate(dataItem) {
            if (dataItem.hasOwnProperty('recordDate')) {
                return kendo.toString(new Date(dataItem.recordDate), `${this.dateFormat}`)
            }
            return ''
        },

        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log(e.data);
        },
        initToolbar(that) {
            let grid = $("#gridTaxExchangeRate").data("kendoGrid");
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
                that.loadCurrencyData(currencyType.TAX_EXCHANGE_CURRENCY);
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
            const grid = $("#gridTaxExchangeRate").data("kendoGrid")
            grid.saveAsExcel()
        },
    },
    mounted: async function () {
        await this.loadInstituteInfo()
        await this.loadCurrencyData(currencyType.TAX_EXCHANGE_CURRENCY)
        await this.initToolbar(this)
    },
    computed: {
        Currency() {
            if (this.company) {
                if (this.company.hasOwnProperty('taxCurrency')) {
                    const cur = this.company.taxCurrency
                    const currency = cur.code + ' - ' + cur.name
                    return currency
                }
            }
            return ''
        },
    }
}
</script>
<style scoped>
</style>
	