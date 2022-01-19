<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-row>
                            <v-col class="bigSide py-0" sm="8" cols="12" style="transition: .3s ease-in;"
                                   :class="{'hide_big_bar_class':isHideBar}">
                                <v-form ref="form">
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">{{ $t('delayed_invoice') }} #{{ invoice.referenceNo }}
                                            ({{ invoiceStatus }})</h2>
                                        <v-icon v-if="isHideBar"
                                                onclick="window.history.go(-1); return false;"
                                                style="cursor: pointer; font-size: 40px;"
                                                color="grey"
                                                class="float-right"
                                        >close
                                        </v-icon>
                                        <span style="transition: .3s ease-in; z-index:10;"
                                              :class="{'iconArrow': !isHideBar,'iconArrowHide': isHideBar }">
                                            <v-icon size="22"
                                                    class="arr_icon"
                                                    @click="hide_smallsitebar"
                                                    v-if="isHideBar"> mdi-chevron-left-circle
                                            </v-icon>
                                            <v-icon size="22"
                                                    class="arr_icon"
                                                    @click="hide_smallsitebar"
                                                    v-if="!isHideBar"> mdi-chevron-right-circle
                                            </v-icon>
										</span>
                                    </v-card>
                                    <v-card outlined dense class="px-3 no_border mb-3" color="grayBg">
                                        <v-row>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t('customer') }}</label>
                                                <h3 class="text-bold  py-1">{{ customerName }}</h3>
                                            </v-col>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label mb-0">{{ $t('crn') }}</label>
                                                <h3 class="text-bold  py-1">{{ crn }}</h3>
                                            </v-col>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t('invoice_date') }}</label>
                                                <h3 class="text-bold  py-1">{{ transactionDate }}</h3>
                                            </v-col>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t('currency') }}</label>
                                                <h3 class="text-bold py-1">{{ currency }}</h3>
                                            </v-col>

                                        </v-row>
                                    </v-card>

                                    <v-row class="pt-3" style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <LoadingMe
                                                :isLoading="showLoading"
                                                :fullPage="false"
                                                :myLoading="true"/>
                                            <kendo-datasource ref="itemLineDS"
                                                              :data="itemLines"/>
                                            <kendo-grid id="gridItemLine" class="grid-function"
                                                        :data-source-ref="'itemLineDS'"
                                                        :sortable="false"
                                                        :column-menu="true"
                                                        :editable="false"
                                                        :scrollable-virtual="true">
                                                <kendo-grid-column
                                                    :title="$t('no.')"
                                                    :width="55"
                                                    :column-menu="false"
                                                    :template="rowNumberTmpl"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5;',
                                                                    class: 'text-products'
                                                                }"
                                                    :attributes="{
                                                                    style: 'text-align: products'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'serviceDate'"
                                                    :title="$t('date_from')"
                                                    :width="160"
                                                    :hidden="!saleFormContent.serviceDate"
                                                    :template="'<span>#= kendo.toString(new Date(serviceDate), dateFormat)#</span>'"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'serviceDateTo'"
                                                    :title="$t('date_to')"
                                                    :width="160"
                                                    :hidden="!saleFormContent.serviceDateTo"
                                                    :template="'<span>#= kendo.toString(new Date(serviceDateTo), dateFormat)#</span>'"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'item'"
                                                    :title="$t('item')"
                                                    :template="itemTemplate"
                                                    :width="200"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :template="'<span>#=description#</span>'"
                                                    :width="160"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'qty'"
                                                    :title="$t('qty')"
                                                    :format="'{0:n}'"
                                                    :template="'<span>#=qty#</span>'"
                                                    :width="80"
                                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: left; '}"/>
                                                <kendo-grid-column
                                                    :field="'uom'"
                                                    :title="$t('uom')"
                                                    :width="100"
                                                    :template="UOMTemplate"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'price'"
                                                    :title="$t('price')"
                                                    :format="'{0:n}'"
                                                    :width="100"
                                                    :template="priceFormat"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :format="'{0:n}'"
                                                    :width="100"
                                                    :template="amountFormat"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'modifier'"
                                                    :title="$t('modifier')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :hidden="!saleFormContent.modifier"
                                                    :template="'<span>#=modifier.name?modifier.name:``#</span>'"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'discountItem'"
                                                    :title="$t('discount_item')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.discountItem"
                                                    :template="discountItemTemplate"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'vatTax'"
                                                    :title="$t('vat')"
                                                    :width="150"
                                                    :template="vatTemplate"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'specificTax'"
                                                    :title="$t('specificTax')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.specificTax"
                                                    :template="'<span>#=specificTax.defaultTax?specificTax.defaultTax:``#</span>'"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'otherTax'"
                                                    :title="$t('otherTax')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.otherTax"
                                                    :template="'<span>#=otherTax.defaultTax?otherTax.defaultTax:``#</span>'"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'publicLightingTax'"
                                                    :title="$t('pl_tax')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :hidden="!saleFormContent.publicLightingTax"
                                                    :template="'<span>#=publicLightingTax.defaultTax?publicLightingTax.defaultTax:``#</span>'"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'saleUnit'"
                                                    :title="$t('sale_unit')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.saleUnit"
                                                    :template="saleUnitTemplate"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>

                                                <kendo-grid-column
                                                    :field="'employee'"
                                                    :title="$t('employee')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.employee"
                                                    :template="empImpl"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                            </kendo-grid>

                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row>
                                                <v-col sm="12" cols="12">
                                                    <v-row>
                                                        <v-col sm="6" cols="6">
                                                            <v-row>
                                                                <v-col sm="6" cols="12">
                                                                    <label>{{ $t('message_on_invoice') }}</label>
                                                                    <h4 class="text-bold py-2">This will appear on the
                                                                        invoice</h4>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                        <v-col sm="6" cols="6">
                                                            <v-simple-table>
                                                                <template v-slot:default>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td class="text-left">{{ $t('subtotal') }}</td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{ numberFormat(invoice.subTotal) }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left">{{
                                                                                $t('general_discount')
                                                                            }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            ({{ numberFormat(invoice.discountTotal) }})
                                                                        </td>
                                                                    </tr>
                                                                    <!--                                                                    <tr>-->
                                                                    <!--                                                                        <td class="text-left">{{ $t('delivery') }}</td>-->
                                                                    <!--                                                                        <td class="text-center">:</td>-->
                                                                    <!--                                                                        <td class="text-right">1,0000.00</td>-->
                                                                    <!--                                                                    </tr>-->
                                                                    <tr>
                                                                        <td class="text-left">{{ $t('total_tax') }}
                                                                            <v-btn @click="dialogTax=true"
                                                                                    color="primary"
                                                                                   class="text-white text-bold rounded-0 float-right text-uppercase"
                                                                                   style="height: 30px !important;">
                                                                                {{ $t('tax') }}
                                                                            </v-btn>
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{ numberFormat(invoice.totalTaxAmount) }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left">{{ specificDiscount }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{
                                                                                numberFormat(invoice.specificDiscountTotal)
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr v-for="item in invoice.otherCharge"
                                                                        v-bind:key="item?item.id:0">
<!--                                                                        <div v-if="item">-->
                                                                            <td class="text-left text-uppercase">
                                                                                {{ item.name }}
                                                                            </td>
                                                                            <td class="text-center">:</td>
                                                                            <td class="text-right">
                                                                                {{ otherCharge(item) }}
                                                                            </td>
<!--                                                                        </div>-->
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left text-uppercase">
                                                                            {{ $t('total') }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right primary--text text-bold">
                                                                            {{ numberFormat(invoice.total) }}
                                                                        </td>
                                                                    </tr>
                                                                    <!--                                                                    <tr>-->
                                                                    <!--                                                                        <td class="text-left">{{ $t('deposit') }} <span-->
                                                                    <!--                                                                            class="float-right color_green">{{-->
                                                                    <!--                                                                                numberFormat(invoice.depositAmount)-->
                                                                    <!--                                                                            }}</span>-->
                                                                    <!--                                                                        </td>-->
                                                                    <!--                                                                        <td class="text-center">:</td>-->
                                                                    <!--                                                                        <td class="text-right">-->
                                                                    <!--                                                                            {{ numberFormat(invoice.depositDeduction) }}-->
                                                                    <!--                                                                        </td>-->
                                                                    <!--                                                                    </tr>-->
                                                                    <!--                                                                    <tr>-->
                                                                    <!--                                                                        <td class="text-left">{{ $t('remaining') }}</td>-->
                                                                    <!--                                                                        <td class="text-center">:</td>-->
                                                                    <!--                                                                        <td class="text-right color_green text-bold">-->
                                                                    <!--                                                                            {{ numberFormat(invoice.remainingAmount) }}-->
                                                                    <!--                                                                        </td>-->
                                                                    <!--                                                                    </tr>-->

                                                                    </tbody>
                                                                </template>
                                                            </v-simple-table>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>

                                    <v-divider/>
                                    <v-card outlined dense class="no_border function_footer py-2">
                                        <!-- <p class="float-left py-2 mb-0  color_grey">{{$t('standard_sale_qoute')}}</p> -->
                                        <v-btn class="float-right btn_delete mx-1" @click="onDeleteInvoice('delete')">
                                            {{ $t('delete') }}
                                        </v-btn>
                                        <v-btn class="float-right btn_save_draft mx-1" @click="onEditInvoice('edit')">
                                            {{ $t('edit') }}
                                        </v-btn>
                                    </v-card>
                                    <v-divider/>
                                </v-form>
                            </v-col>
                            <v-col class="smallSide" sm="4" style="transition: .3s ease-in;"
                                   :class="{'hide_small_bar_class':isHideBar}">
                                <h3 style="color: #b3b5bc; font-size:20px;" v-if="!isHideBar"
                                    class="text-uppercase float-right mt-n3">Help
                                    <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right mt-n1"
                                    >close
                                    </v-icon>
                                </h3>

                                <div v-if="!isHideBar" class="small_sidebar mt-9 px-4 grayBg">
                                    <v-card class="pa-3 no-boxshadow"
                                            color="primary"
                                            style="min-height: 70px; ">
                                        <h3 style="font-size: 18px" class="text-white text-uppercase mb-2">
                                            {{ $t('amount_due') }}</h3>
                                        <h3 class="text-bold float-right text-white" style="font-size: 22px">
                                            {{ numberFormat(invoice.amountDue) }}</h3>
                                    </v-card>
                                    <!-- <v-divider class="my-2" /> -->
                                    <div class="mb-3" style="height:3px; background-color:#ffffff;width:100%;"></div>
                                    <v-row>
                                        <v-col sm="12" cols="12">
                                            <h4 class="my-2 text-uppercase">{{ $t('analysis') }}</h4>
                                            <v-row>
                                                <v-col sm="6" cols="6" class="py-1">
                                                    <label class="label">{{ $t('segment') }}</label>
                                                    <h4 class="text-bold py-1">{{ segment }}</h4>
                                                </v-col>
                                                <v-col sm="6" cols="6" class="py-1">
                                                    <label class="label">{{ $t('location') }}</label>
                                                    <h4 class="text-bold py-1">{{ location }}</h4>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-card color="third" class="pa-2 mb-4 text-bold rounded-0 no-boxshadow">
                                        <v-row>
                                            <v-col sm="6" cols="6">
                                                <h3 class="text-bold color_white font_30">USED</h3>
                                            </v-col>
                                            <v-col sm="6" cols="6">
                                                <h4 class="text-bold color_black">PUR0010101</h4>
                                                <p class="number mb-0 color_black">06/08/2020</p>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <div class="my-2 mt-3"
                                         style="height:3px; background-color:#ffffff;width:100%;"></div>
                                    <!-- <v-divider class="my-2 mt-3" /> -->
                                    <p class="grey--text mt-6 mb-2">{{ $t('transaction_history') }}</p>
                                    <v-simple-table>
                                        <template v-slot:default>
                                            <tbody>
                                            <tr v-for="item in invoiceHistory"
                                                v-bind:key="item.id">
                                                <td class="text-left px-0 font_12">{{
                                                        item.name
                                                    }}
                                                </td>
                                                <td class="text-center px-0 font_12">{{
                                                        formatDateTime(item.createdAt)
                                                    }} &nbsp; ({{ item.timeSince }})
                                                </td>
                                            </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                    <div class="my-3" style="height:3px; background-color:#ffffff;width:100%;"></div>
                                </div>
                            </v-col>
                        </v-row>

                    </v-card>
                </v-col>
            </v-row>
            <v-dialog v-model="dialogTax" max-width="460px">
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t('tax_list') }}</v-card-title>
                        <v-icon @click="dialogTax = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="pb-0">
                                <v-simple-table>
                                    <template v-slot:default>
                                        <tbody>
                                        <tr v-for="(value, name) in invoice.taxListTotal" v-bind:key="name">
                                            <td class="text-left" width="180px">{{ name }}</td>
                                            <td class="text-center">:</td>
                                            <td class="text-right">
                                                {{ numberFormat(value) }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left" width="180px">{{ $t('total') }}</td>
                                            <td class="text-center">:</td>
                                            <td class="text-right">
                                                {{ numberFormat(invoice.totalTaxAmount) }}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>

                </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>

<script>

import InvoiceModel from "@/scripts/invoice/model/Invoice"
import SaleFormContentModel from "@/scripts/model/SaleFormContent"
import kendo from "@progress/kendo-ui";
import ItemLineModel from "@/scripts/invoice/model/ItemLine";

const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const saleFormContentHandler = require("@/scripts/saleFormContentHandler")
const invoiceModel = new InvoiceModel({})
const saleFormContentModel = new SaleFormContentModel({})
const itemLineModel = new ItemLineModel({})
export default {
    name: "DelayedInvoiceView",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        showLoading: true,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        bill_date: '',
        alert: false,
        dialogTax: false,
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,
        itemLine: itemLineModel,
        saleFormContent: saleFormContentModel,
        invoice: invoiceModel,
        itemLines: [],
        numSelect: [1],
        mOtherCharge: [],
        mOtherChargeAmount: [],
        specificDiscountItem: [],
        otherChargeList: [],
        invoiceHistory: [],
        taxListTotal: {},
        loggedUser: {
            id: 'cf3d10ab-bce6-47b3-8405-b448c23dad84',
            name: 'Mr. Inspector'
        },
        dateFormat: invoiceModel.dateFormat
    }),
    methods: {
        cancel() {

        },
        hide_smallsitebar() {
            this.isHideBar = !this.isHideBar;
        },
        numberFormat(value) {
            return kendo.toString(value, `n${this.saleFormContent.decimal}`)
        },
        formatDate(value) {
            return kendo.toString(new Date(value), this.dateFormat)
        },
        formatDateTime(value) {
            return kendo.toString(new Date(value), this.dateFormat + ` hh:mm tt`)
        },
        paymentCode(code) {
            return code.replace('psc-', '')
        },
        status(value) {
            let statusText = ''
            switch (value) {
                case 1:
                    statusText = 'OPEN'
                    break
                case 2:
                    statusText = 'CLOSED'
                    break
            }
            return statusText
        },
        amountFormat(value) {
            return kendo.toString(value.amount, `n${this.saleFormContent.decimal}`)
        },
        priceFormat(value) {
            return kendo.toString(value.price, `n${this.saleFormContent.decimal}`)
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        vatTemplate(dataItem) {
            const vat = dataItem.vatTax
            if (vat) {
                return `<span>${vat.defaultTax ? vat.defaultTax : ``}</span>`
            } else {
                return ``
            }
        },
        itemTemplate(dataItem) {
            const item = dataItem.item
            if (item) {
                return `<span>${item.name ? item.name : ``}</span>`
            } else {
                return ``
            }
        },
        UOMTemplate(dataItem) {
            const uom = dataItem.uom
            if (uom) {
                return `<span>${uom.uom ? uom.uom.toUOM.name : ``}</span>`
            } else {
                return ``
            }
        },
        saleUnitTemplate(dataItem) {
            const saleUnit = dataItem.saleUnit
            if (saleUnit) {
                return `<span>${saleUnit.name ? saleUnit.name : ``}</span>`
            } else {
                return ``
            }
        },
        discountItemTemplate(dataItem) {
            const discountItem = dataItem.discountItem
            if (discountItem) {
                return `<span>${discountItem.code ? discountItem.code : ``} - ${discountItem.name ? discountItem.name : ``}</span>`
            } else {
                return ``
            }
        },
        empImpl(dataItem) {
            let empIds = []
            dataItem.employee.forEach(m => {
                empIds.push(m.firstName + ' - ' + m.lastName)
            })
            // window.console.log(empIds.join(', '))
            return `<span>${empIds.join(', ')}</span>`
        },
        async loadSaleFormContent() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    saleFormContentHandler.list().then(res => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data
                            if (data.length > 0) {
                                this.saleFormContent = data[0]
                            }
                        }
                    })
                }, 300)
            })
        },
        async loadInvoiceHistory() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    billingHandler.history(this.$route.params.id).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.invoiceHistory = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async loadViewInvoice() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    billingHandler.view(this.$route.params.id).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.invoice = res.data.data[0]
                            this.itemLines = this.invoice.itemLines
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async initData() {
            if (this.$route.params.id !== undefined) {
                await this.loadViewInvoice()
                await this.loadInvoiceHistory()
            }
        },
        autoCalculateDiscount(discountItem, subTotal) {
            if (discountItem) {
                const nature = discountItem.nature || ''
                const amount = discountItem.amount || 0
                if (nature === 'Amount') {
                    return parseFloat(amount)
                } else if (nature === 'Percentage') {
                    return (subTotal * (parseFloat(amount) / 100))
                }else{
                    return 0
                }
            }else{
                return 0
            }
        },
        otherCharge(obj) {
            if (this.invoice) {
                const amount = this.autoCalculateDiscount(obj, this.invoice.subTotal)
                return this.numberFormat(amount)
            }
            return 0
        },
        onEditInvoice(type) {
            const id = this.$route.params.id
            this.$router.push({
                path: 'delayed_invoice/' + id,
                name: 'Delayed Invoice',
                params: {id: id},
                query: {type: type}
            })
        },
        onDeleteInvoice() {
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4d4848',
                cancelButtonColor: '#ED1A3A',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.onSaveInvoice()
                    // this.clear()
                    // this.$router.go(-1)
                }
            })
        },
        clear() {

        },
        async onSaveInvoice() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const txnId = this.$route.params.id
                    if (txnId) {
                        const data = {
                            id: txnId,
                            loggedUser: this.loggedUser,
                            actionType: 'delete'
                        }
                        billingHandler.create(data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.$snotify.success('Successfully')
                                this.close(data)
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }

                }, 300);
            })
        },
    },
    watch: {
        id() {
            window.console.log(this.$route.params, 'params')
            if (this.$route.params.id === undefined) {
                this.clear()
            } else {
                this.showLoading = true
                this.loadViewInvoice()
                this.loadInvoiceHistory()
            }
        }
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        // this.loadObj()
    },
    mounted: async function () {
        await this.loadSaleFormContent()
        await this.initData()
    },
    computed: {
        transactionType() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('transactionType')) {
                    if (this.invoice.transactionType.hasOwnProperty('id')) {
                        return this.invoice.transactionType.name
                    }
                }
            }
            return ''
        },
        transactionDate() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('transactionDate')) {
                    return kendo.toString(new Date(this.invoice.transactionDate), this.dateFormat)
                }
            }
            return ''
        },
        customerName() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('customer')) {
                    if (this.invoice.customer.hasOwnProperty('id')) {
                        return this.invoice.customer.name
                    }
                }
            }
            return ''
        },
        crn() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('customer')) {
                    if (this.invoice.customer.hasOwnProperty('crn')) {
                        return this.invoice.customer.crn
                    }
                }
            }
            return '-'
        },
        currency() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('priceLevel')) {
                    if (this.invoice.priceLevel.hasOwnProperty('currency')) {
                        return this.invoice.priceLevel.currency.code
                    }
                }
            }
            return ''
        },
        priceLevel() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('priceLevel')) {
                    if (this.invoice.priceLevel.hasOwnProperty('id')) {
                        return this.invoice.priceLevel.name
                    }
                }
            }
            return ''
        },
        segment() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('segment')) {
                    if (this.invoice.segment.hasOwnProperty('id')) {
                        return this.invoice.segment.name
                    }
                }
            }
            return ''
        },
        location() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('location')) {
                    if (this.invoice.location.hasOwnProperty('id')) {
                        return this.invoice.location.name
                    }
                }
            }
            return ''
        },
        employee() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('employee')) {
                    if (this.invoice.employee.hasOwnProperty('id')) {
                        return this.invoice.employee.firstName + ' - ' + this.invoice.employee.lastName
                    }
                }
            }
            return ''
        },
        transactionNote() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('transactionNote')) {
                    return this.invoice.transactionNote
                }
            }
            return ''
        },
        specificDiscount() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('specificDiscountItem')) {
                    if (this.invoice.specificDiscountItem.hasOwnProperty('id')) {
                        return this.invoice.specificDiscountItem.name
                    }

                }
            }
            return ''
        },
        invoiceStatus() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('status')) {
                    const status = this.invoice.status
                    let statusText = ''
                    switch (status) {
                        case 1:
                            statusText = 'OPEN'
                            break
                        case 2:
                            statusText = 'CLOSED'
                            break
                        case 4:
                            statusText = 'VOID'
                            break
                        case 5:
                            statusText = 'USED'
                            break
                    }
                    return statusText
                }
            }
            return ''
        }
    }
};
</script>

<style scoped>
.function_wrapper {
    box-shadow: none !important;
}

.v-application--is-ltr .v-text-field .v-input__append-inner {
    margin-top: 0 !important;
}

.v-input__slot {
    background-color: #fff !important;
}

.function_content .label {
    margin-bottom: 10px;
    display: inline-block;
}

.border_radius10 {
    border-radius: 10px !important;
    background-color: #F2F2F2;
}

.pa-3.v-card h4 {
    font-size: 18px;
    color: #333;
}

.pa-3.v-card p {
    font-size: 12px;
    color: #B5B5B5;
}

.attachment_file {
    background-color: #EFEDED;
    border-radius: 0 !important;
}

.attachment_table.v-data-table table {
    border: thin solid rgba(0, 0, 0, 0.12);
}

.attachment_table table tr th {
    border-left: thin solid rgba(0, 0, 0, 0.12);
    height: 35px;
    border-right: thin solid rgba(0, 0, 0, 0.12);
}

.block_debit,
.block_credit {
    border-bottom: 1px solid #fff;
}

.block_debit p.number,
.block_credit p.number {
    font-size: 25px;
    color: #7F7F7F;
}

.block_debit h5,
.block_credit h5,
.block_difference h5 {
    text-transform: uppercase;
    color: #7F7F7F;
    font-size: 15px;
    font-weight: normal;
}

.block_difference h5 {
    font-size: 18px;
}

.block_difference h5 span {
    font-size: 15px;
}

.custom_grid table th:last-child {
    text-align: right !important;
}


@media (min-width: 1264px) {
    .container {
        max-width: 1250px;
    }
}

@media (max-width: 576px) {
    .pt-6.col-sm-5.col-12 {
        padding-top: 0 !important;
    }

    .code_text {
        width: 100%;
    }

    .phone_no_pt {
        padding-top: 0 !important;
    }

    .select_template,
    .save_option {
        margin-bottom: 10px;
    }
}

.hide_small_bar_class {
    max-width: 0;
    transition: .5s ease-in;
    flex: 0 0 0;
}

.hide_big_bar_class {
    max-width: 100%;
    transition: .5s ease-in;
    flex: 0 0 100%;
}

.info_add {
    background-color: #ffffff;
}

.small_sidebar {
    height: 98%;
    position: relative;
    padding: 12px;
    background-color: #EDF1F5;
}

.iconArrow {
    right: -35px;
    position: absolute;
    bottom: -10px;
}

.iconArrowHide {
    position: absolute;
    right: -7px;
    bottom: -10px;
}

.lb_bold {
    font-size: 12px;
}

.detial_smallside_p {
    position: absolute;
    bottom: 10px;
}



.deposite_input {
    width: 100px;
}




.checkbox_inv {
    padding: 2px;
    margin-top: 3px;
    margin-right: 2px;
}

.exp_select {
    font-size: 12px !important;
}

.color_white {
    color: #ffffff;
}

.color_black {
    color: #000000;
}

.font_30 {
    font-size: 30px;
    padding: 10px;
}
</style>