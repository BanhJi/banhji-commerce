<template>
    <v-row class="">
        <v-col sm="9" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('suppliers_types') }}</h2>
            <p class="mb-0">{{ $t('suppliers_type_desc') }} </p>
        </v-col>
        <v-col sm="3" cols="12" class="pt-0">
            <v-dialog v-model="dialogM2" max-width="680px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" class="text-capitalize white--text float-right" v-on="on"
                           @click="onNewClick">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t('supplier_type') }}</v-card-title>
                        <v-icon @click="dialogM2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="12" cols="12" class="py-0 mt-3">
                                    <v-row>
                                        <v-col class="py-0" sm="6" cols="12">
                                            <label class="label">{{ $t('supplier_type_name') }}</label>
                                            <v-text-field
                                                class="mt-1"
                                                outlined
                                                :rules="[v => !!v || $t('name_is_required')]"
                                                v-model="supplierType.name"
                                                tage="Customer Type Name"
                                                placeholder=""
                                            />
                                            <label class="label">{{ $t('nature') }}</label>
                                            <v-select
                                                class="mt-1"
                                                id=""
                                                :items="natures"
                                                item-text="name"
                                                tage="Nature"
                                                item-value="id"
                                                v-model="supplierType.nature"
                                                :rules="[v => !!v['id'] || $t('is_required')]"
                                                outlined
                                                return-object
                                            />

                                            <label class="label">{{ $t('account_payable') }}</label>
                                            <v-select
                                                class="mt-1"
                                                outlined
                                                :items="apAcc"
                                                return-object
                                                item-text="name"
                                                tage="AccountPayable"
                                                item-value="id"
                                                :rules="[v => !!v['id'] || $t('is_required')]"
                                                v-model="supplierType.apAcc"/>
                                            <label class="label">{{ $t('purchase_deposit') }}</label>
                                            <v-select
                                                class="mt-1"
                                                outlined
                                                :items="accDeposit"
                                                return-object
                                                item-text="name"
                                                tage="PurchaseDeposit"
                                                item-value="id"
                                                :rules="[v => !!v['id'] || $t('is_required')]"
                                                v-model="supplierType.purchaseDepositAcc"/>
                                            <label class="label">{{ $t('cash_payment') }}</label>
                                            <v-select
                                                class="mt-1"
                                                outlined
                                                return-object
                                                id=""
                                                :rules="[v => !!v['id'] || $t('is_required')]"
                                                :items="cashPayment"
                                                item-text="name"
                                                tage="PaymentOption"
                                                item-value="id"
                                                v-model="supplierType.cashPayment"
                                            />
                                            <label class="label">{{ $t('cheque_payment') }}</label>
                                            <v-select
                                                class="mt-1"
                                                outlined
                                                return-object
                                                id=""
                                                :items="chequePayment"
                                                item-text="name"
                                                tage="PaymentOption"
                                                item-value="id"
                                                clearable
                                                v-model="supplierType.chequePayment"
                                            />
                                        </v-col>
                                        <v-col class="py-0" sm="6" cols="12">

                                            <label class="label">{{ $t('abbreviation') }}</label>
                                            <v-text-field
                                                class="mt-1"
                                                outlined
                                                tage="Abbreviation"
                                                v-model="supplierType.abbr"
                                                :rules="[v => !!v || $t('is_required')]"
                                                placeholder=""/>

                                            <label class="label">{{ $t('default_tax') }}</label>
                                            <v-select
                                                class="mt-1"
                                                :items="vat"
                                                item-text="defaultTax"
                                                tage="Tax"
                                                item-value="id"
                                                :rules="[v => !!v['id'] || $t('is_required')]"
                                                v-model="supplierType.purchaseTax"
                                                outlined
                                                return-object
                                            />

                                            <!--                                            <label class="label">{{ $t('default_witholding_tax') }}</label>-->
                                            <!--                                            <v-select-->
                                            <!--                                                class="mt-1"-->
                                            <!--                                                outlined-->
                                            <!--                                                return-object-->
                                            <!--                                                :items="witholdingTax"-->
                                            <!--                                                item-text="defaultTax"-->
                                            <!--                                                tage="TaxShipping"-->
                                            <!--                                                item-value="id"-->
                                            <!--                                                :rules="[v => !!v['id'] || $t('is_required')]"-->
                                            <!--                                                v-model="mWitholdingTax"-->
                                            <!--                                            />-->
                                            <label class="label">{{ $t('purchase_discount') }}</label>
                                            <v-select
                                                class="mt-1"
                                                outlined
                                                return-object
                                                id=""
                                                :items="accDiscount"
                                                item-text="name"
                                                tage="PurchaseDiscount"
                                                item-value="id"
                                                :rules="[v => !!v['id'] || $t('is_required')]"
                                                v-model="supplierType.purchaseDiscountAcc"
                                            />
                                            <label class="label">{{ $t('price_level') }}</label>
                                            <v-select
                                                class="mt-1"
                                                id=""
                                                :items="priceLevel"
                                                item-text="name"
                                                v-model="supplierType.priceLevel"
                                                placeholder="Default price level"
                                                outlined
                                                return-object
                                            />
                                            <label class="label">{{ $t('bank_disbursement') }}</label>
                                            <v-select
                                                class="mt-1"
                                                outlined
                                                return-object
                                                id=""
                                                :items="bankDisbursement"
                                                item-text="name"
                                                tage="PaymentOption"
                                                item-value="id"
                                                clearable
                                                v-model="supplierType.bankDisbursement"
                                            />
                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn color="black" outlined
                                       class=" text-capitalize  black--text float-left"
                                       @click="dialogM2 = false">{{ $t('cancel') }}
                                </v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn
                                    :disabled="disabled"
                                    color="primary"
                                    class="px-3  white--text text-capitalize"
                                    @click.native="onSaveClose">
                                    {{ $t('save_close') }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>

                </v-card>
            </v-dialog>
        </v-col>
        <v-col sm="12" cols="12" class="py-0">
            <template>
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    type="loading"
                    :myLoading="true"/>
                <kendo-datasource ref="gridSupplierTypeDS"
                                  :data="supplierTypes"/>
                <kendo-grid id="gridSupplierType" class="grid-function"
                            :data-source-ref="'gridSupplierTypeDS'"
                            :editable="false"
                            :sortable="false"
                            :filterable="false"
                            :noRecords="true"
                            :toolbar="toolbarTemplate"
                            :excel-export="excelExport"
                            :excel-file-name="'Kendo UI Grid Export.xlsx'"
                            :excel-filterable="true"
                            :scrollable-virtual="true">
                    <kendo-grid-column
                        :field="'name'"
                        :attributes="{class:'tb_name_td'}"
                        :title="$t('name')"
                        :width="200"
                        :template="'<span>#=name#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'abbr'"
                        :title="$t('abbr')"
                        :width="100"
                        :template="'<span>#=abbr#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'nature'"
                        :title="$t('nature')"
                        :width="200"
                        :template="'<span>#=nature.name#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="''"
                        :title="''"
                        :width="53"
                        :command="[{ iconClass: 'k-icon k-i-edit', text: ' ', click: goEdit }]"
                        :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                </kendo-grid>
            </template>
        </v-col>
    </v-row>
</template>

<script>
import SupplierTypeModel from '@/scripts/model/SupplierType'
import kendo from "@progress/kendo-ui";
import priceLevelHandler from "@/scripts/priceLevelHandler";
import PriceLevelModel from "@/scripts/priceLevel/PriceLevel";
import AccountMappingModel from "@/scripts/account-map/Account";
import TaxModel from "@/scripts/model/Tax";

const $ = kendo.jQuery
const accountHandler = require("@/scripts/handler/accounting/account")
const supplierTypeHandler = require("@/scripts/supplierTypeHandler")
const otherHandler = require("@/scripts/otherHandler")
const settingHandler = require("@/scripts/settingHandler")
const settingsHandler = require("@/scripts/settingsHandler")
const paymentOptionHandler = require("@/scripts/paymentOptionHandler")
// const paymentTermHandler = require("@/scripts/paymentTermHandler")
const supplierTypeModel = new SupplierTypeModel({})
const OPTION_TYPE = 'Supplier'
const strFilter = '?optionType=' + OPTION_TYPE
const strFilterTerm = '?type=pmt-supplier'

import JSZip from "jszip";
import {PAYMENT_OPINION_TYPE} from "@/scripts/default_setup/Setting";
import PaymentOptionModel from "@/scripts/model/PaymentOption";

window.JSZip = JSZip;
export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`)
    },
    data: () => ({
        dialogM2: false,
        disabled: false,
        valid: false,
        showLoading: true,
        natures: [],
        supplierType: supplierTypeModel,
        supplierTypes: [],
        apAcc: [],
        accDeposit: [],
        accDiscount: [],
        tax: [],
        vat: [],
        // witholdingTax: [],
        // mWitholdingTax: {},
        priceLevel: [],
        cashPayment: [],
        chequePayment: [],
        bankDisbursement: []
    }),
    props: {},
    computed: {},
    watch: {},
    methods: {
        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log(e.data);
        },
        exportToExcel() {
            const grid = $("#gridSupplierType").data("kendoGrid")
            grid.saveAsExcel()
        },
        initToolbar(that) {
            let grid = $("#gridSupplierType").data("kendoGrid");
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
                that.loadSupplierType();
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
        async loadPriceLevel() {
            const strFilter = '?nature=purchase'
            priceLevelHandler.get(strFilter).then((res) => {
                this.priceLevel = res;
                if (this.priceLevel.length > 0) {
                    this.supplierType.priceLevel = this.priceLevel[0];
                }
            })
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridSupplierTypeDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
        },
        onNewClick() {
            this.supplierType = {}
            this.supplierType.id = ''
            this.clear()
        },
        close() {
            this.dialogM2 = false
        },
        clear() {
            const cashPayment = this.supplierType.cashPayment || {}
            this.supplierType = new SupplierTypeModel({})
            this.supplierType.cashPayment = cashPayment
        },
        goEdit(e) {
            e.preventDefault()
            let grid = kendo.jQuery("#gridSupplierType").data("kendoGrid")
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            this.supplierType = dataItem
            // this.mNature = dataItem.nature
            // this.mAPAcc = dataItem.apAcc
            // this.mVAT = dataItem.purchaseTax
            // // this.mWitholdingTax = dataItem.witholdingTax
            // this.mAccDeposit = dataItem.purchaseDepositAcc
            // this.mAccDiscount = dataItem.purchaseDiscountAcc
            // // this.mPaymentTerm = dataItem.paymentTerm
            this.dialogM2 = true
        },
        async onSaveClose() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    const nature_ = this.supplierType.nature || {}
                    const nature = {
                        id: nature_.id || '',
                        name: nature_.name || '',
                        isSystem: nature_.isSystem || 0
                    }
                    let data = {
                        "id": this.supplierType.id ? this.supplierType.id : '',
                        "name": this.supplierType.name,
                        "abbr": this.supplierType.abbr,
                        "nature": nature,
                        "apAcc": new AccountMappingModel(this.supplierType.apAcc),
                        "purchaseTax": new TaxModel(this.supplierType.purchaseTax),
                        "purchaseDepositAcc": new AccountMappingModel(this.supplierType.purchaseDepositAcc),
                        "purchaseDiscountAcc": new AccountMappingModel(this.supplierType.purchaseDiscountAcc),
                        "priceLevel": new PriceLevelModel(this.supplierType.priceLevel),
                        "cashPayment": new PaymentOptionModel(this.supplierType.cashPayment),
                        "chequePayment": new PaymentOptionModel(this.supplierType.chequePayment),
                        "bankDisbursement": new PaymentOptionModel(this.supplierType.bankDisbursement),
                    }
                    this.disabled = true
                    this.showLoading = true
                    supplierTypeHandler.create(data).then(response => {
                        if (response.data.statusCode === 201) {
                            this.disabled = false
                            this.showLoading = false
                            this.loadSupplierType()
                            this.clear()
                            this.close()
                            // const res = response.data.data
                            // const index = this.supplierTypes.findIndex(item => {
                            //   return (res.id === item.id)
                            // })
                            // if (this.supplierTypes.length === 0) {
                            //   this.loadSaleChannel()
                            // } else {
                            //   if (index < 0) {
                            //     this.supplierTypes.push(res)
                            //   } else {
                            //     this.supplierTypes.splice(index, 1, res)
                            //   }
                            // }
                            this.$snotify.success('Success')
                            this.close()
                            // this.$refs.form.reset()
                        } else {
                            this.disabled = false
                            this.showLoading = false
                        }
                    }).catch(e => {
                        this.showLoading = false
                        this.disabled = false
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 10);
            })
        },
        async loadSupplierType() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    supplierTypeHandler.get().then(res => {
                        this.showLoading = false
                        this.supplierTypes = res
                        // window.console.log(this.customerTypes)
                    })
                }, 10);
            })
        },
        async loadCustomerTypeNature() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    otherHandler.customerTypeNature().then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.natures = res.data.data
                        }
                    })
                }, 10);
            })
        },
        async loadAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getAll().then(res => {
                        this.showLoading = false
                        //Receivable Account
                        this.apAcc = res.data.filter(m => m.account_type.number === 18).map(item => {
                            return {
                                id: item.uuid,
                                uuid: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code,
                                account_type: item.account_type
                            }
                        })
                        if (this.apAcc.length > 0) {
                            this.supplierType.apAcc = this.apAcc[0]
                        }
                        //Deposit Account
                        this.accDeposit = res.data.filter(m => m.account_type.number === 9 || m.account_type.number === 17).map(item => {
                            return {
                                id: item.uuid,
                                uuid: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code,
                                account_type: item.account_type
                            }
                        })
                        if (this.accDeposit.length > 0) {
                            this.supplierType.purchaseDepositAcc = this.accDeposit[0]
                        }
                        //Discount Account
                        this.accDiscount = res.data.filter(m => m.account_type.number === 40).map(item => {
                            return {
                                id: item.uuid,
                                uuid: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code,
                                account_type: item.account_type
                            }
                        })
                        if (this.accDiscount.length > 0) {
                            this.supplierType.purchaseDiscountAcc = this.accDiscount[0]
                        }
                    })
                }, 10);
            })
        },
        async loadTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    settingHandler.get().then(res => {
                        this.showLoading = false
                        this.tax = res
                        let vAT = this.tax.filter(m => (m.taxType.typeId === 1 || m.taxType.typeId === 2) && m.transactionType === 'Purchase') // valuable tax
                        this.vat = vAT// valuable tax
                        if (this.vat.length > 0) {
                            this.supplierType.purchaseTax = this.vat[0]
                        }
                        // this.witholdingTax = this.tax.filter(m => m.taxType.typeId === 2) // WitholdingTax
                        // // this.witholdingTax = vAT// valuable tax
                        // if (this.witholdingTax.length > 0) {
                        //     this.mWitholdingTax = this.witholdingTax[0]
                        // }
                    })
                }, 10);
            })
        },
        async loadPaymentOption() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    paymentOptionHandler.list(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            const data = res.data.data || []
                            this.cashPayment = data.filter(m => m.type === PAYMENT_OPINION_TYPE.CASH_PAYMENT)
                            this.bankDisbursement = data.filter(m => m.type === PAYMENT_OPINION_TYPE.BANK_DISBURSEMENT)
                            this.chequePayment = data.filter(m => m.type === PAYMENT_OPINION_TYPE.CHEQUE_PAYMENT)
                        }

                    })
                }, 10);
            })
        },
        async loadPaymentTerm() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    settingsHandler.getPaymentTerm(strFilterTerm).then(res => {
                        this.showLoading = false
                        this.paymentTerm = []
                        if (res.data.statusCode === 200) {
                            this.paymentTerm = res.data.data
                            if (this.paymentTerm.length > 0) {
                                this.mPaymentTerm = this.paymentTerm[0]
                            }
                        }
                    })
                }, 10);
            })
        },
    },
    mounted: async function () {
        await this.loadPriceLevel()
        await this.loadCustomerTypeNature()
        await this.loadTax()
        await this.loadPaymentOption()
        await this.loadPaymentTerm()
        await this.loadSupplierType()
        await this.initToolbar(this)
    },
    created: async function () {
        await this.loadAccount()
    }
};
</script>
<style scoped>
.acc_group header {
    height: 10px !important;
}

table.acc_group tr td {
    border-bottom: 1px solid #ccc;
    padding: 8px;
    vertical-align: middle;
}

table.acc_group tr td:first-child {
    font-weight: 700;
}

table.acc_group tr td:last-child {
    text-align: center;
}

.v-card__actions .v-btn.v-btn {
    padding: 0 16px;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-family: 'Niradei-Bold', serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
    color: #000 !important;
    padding: 5px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
    border-bottom: 1px solid #000 !important;
}

.function_footer {
    padding: 15px;
    display: inline-block;
}

p {
    color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
    height: 47.2px !important;
}

.text_tip {
    font-size: 9px;
    line-height: 10px;
}

@media (max-width: 576px) {

}
</style>