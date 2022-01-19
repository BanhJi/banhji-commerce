<!--
  - Last modified : 3/2/21, 3:38 PM in Project banhji-accounting-web-module
  - Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
  - Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
  - Github Profile : https://github.com/Darith-Mokpost
  - Instagram Profile : https://www.instagram.com/chandarith_chea
  -->

<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-row>
                            <v-col class="bigSide py-0" sm="8" cols="12" style="transition: .3s ease-in;"
                                   :class="{'hide_big_bar_class':isHideBar}">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">{{ $t('internal_usage') }}</h2>
                                        <v-icon v-if="isHideBar" 
                                            @click="cancel()"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right">close
                                        </v-icon>
                                        <span style="transition: .3s ease-in; z-index:10;"
                                              :class="{'iconArrow': !isHideBar,'iconArrowHide': isHideBar }">
                                        <v-icon size="22" class="arr_icon" @click="hide_smallsitebar" v-if="isHideBar"> fa fa-chevron-circle-left
                                        </v-icon>
                                        <v-icon size="22" class="arr_icon" @click="hide_smallsitebar" v-if="!isHideBar"> fa fa-chevron-circle-right
                                        </v-icon>
                                    </span>
                                    </v-card>
                                    <v-card outlined dense class="px-3 no_border" color="grayBg" height="90px">
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{ $t('internal_usage_no') }}</label>
                                                <v-row class="mt-1 mr-0">
                                                    <v-col sm="3" cols="3" class="py-0 pr-0">
                                                        <div class="code_text text-uppercase"> {{
                                                                interalUsage.abbr
                                                            }}
                                                        </div>
                                                    </v-col>
                                                    <v-col sm="7" cols="7" class="pt-0 pl-0 pr-1">
                                                        <v-text-field
                                                            disabled
                                                            class="custom-border"
                                                            v-model="interalUsage.number"
                                                            tage="Product Order Number"
                                                            outlined
                                                            :rules="[(v) => !!v || 'Number is required']"
                                                            required
                                                        />
                                                    </v-col>
                                                    <v-col sm="2" cols="2" class="pt-0 px-0">
                                                        <v-icon
                                                            color="black"
                                                            size="30"
                                                            class="border_qrcode"
                                                            @click="generateNumber"
                                                        >mdi-qrcode
                                                        </v-icon>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{ $t('date') }}</label>
                                                <app-datepicker :initialDate="interalUsage.date"
                                                                @emitDate="interalUsage.date = $event"/>
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label"
                                                       style="">{{ $t('default_warehouse') }}</label>
                                                <v-select class="mt-1"
                                                          :items="warehouses"
                                                          v-model="interalUsage.warehouse"
                                                          item-value="id"
                                                          item-text="name"
                                                          return-object
                                                          :placeholder="$t('warehouse')"
                                                          tage="Default Warehouse"
                                                          outlined/>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <!-- Grid One -->
                                    <v-row style="background-color: #fff;">
                                        <v-col cols="12" class="pb-0">
                                            <h2 class="primary--text mb-0 font_20">
                                                {{ $t('internal_usage_products') }}</h2>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <kendo-datasource ref="productDS" :change="dataSourceChangedIP" :data="interalUsage.product"/>
                                            <kendo-grid id="gridProduct" class="grid-function"
                                                        :data-source-ref="'productDS'"
                                                        :sortable="false" :filterable="false" :column-menu="true"
                                                        :editable="true" :scrollable-virtual="true">
                                                <kendo-grid-column :template="rowNumberIP" :title="$t('no.')"
                                                                   :width="55" :column-menu="false"
                                                                   :headerAttributes="{
                                                    style: 'background-color: #EDF1F5;',
                                                    class: 'text-variants'
                                                }" :attributes="{
                                                    style: 'text-align: variants'
                                                }"/>
                                                <kendo-grid-column :field="'item'" :title="$t('items')" :width="200"
                                                                   :template="itemTemplate"
                                                                   :editor="ItemDropDownEditorTP" :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'
                                                }"/>
                                                <kendo-grid-column :field="'description'" :title="$t('description')"
                                                                   :width="200" :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'
                                                }"/>
                                                <kendo-grid-column :field="'uom'" :title="$t('uom')"
                                                                   :template="UOMTemplate"
                                                                   :editor="UOMDropDownEditor"
                                                                   :width="150"
                                                                   :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                                   :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column :field="'yield_qty'" :title="$t('yield_qty')"
                                                                   :format="'{0:n}'" :width="150" :headerAttributes="{
                                                        style: 'text-align: right; background-color: #EDF1F5'
                                                    }" :attributes="{
                                                        style: 'text-align: right'
                                                    }"/>
                                                <kendo-grid-column :field="'cost'" :title="$t('cost')" :format="'{0:n}'"
                                                                   :width="150" :headerAttributes="{
                                                        style: 'text-align: right; background-color: #EDF1F5'
                                                    }" :attributes="{
                                                        style: 'text-align: right'
                                                    }"/>
                                                <!--                                                <kendo-grid-column-->
                                                <!--                                                        :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow, class: 'btn-plus' }"-->
                                                <!--                                                        :title="'&nbsp;'" :width="100" :headerAttributes="{-->
                                                <!--                                                    style: 'text-align: right; background-color: #EDF1F5'-->
                                                <!--                                                }"/>-->
                                            </kendo-grid>
                                        </v-col>

                                    </v-row>
                                    <!-- Grid Two -->
                                    <v-row style="background-color: #fff;">
                                        <v-col cols="12" class="pb-0">
                                            <h2 class="primary--text mb-0 font_20">
                                                {{ $t('intented_usage_accounts') }}</h2>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <kendo-datasource ref="accountDS" :change="dataSourceChangedIA" :data="interalUsage.accounts"/>
                                            <kendo-grid id="gridAccount" class="grid-function"
                                                        :data-source-ref="'accountDS'"
                                                        :sortable="false" :filterable="false" :column-menu="true"
                                                        :editable="true" :scrollable-virtual="true">
                                                <kendo-grid-column :template="rowNumberIA" :title="$t('no.')"
                                                                   :width="55" :column-menu="false"
                                                                   :headerAttributes="{
                                                    style: 'background-color: #EDF1F5;',
                                                    class: 'text-variants'
                                                }" :attributes="{
                                                    style: 'text-align: variants'
                                                }"/>
                                                <kendo-grid-column :field="'account'" :title="$t('account')"
                                                                   :width="200" :template="accountTemplate"
                                                                   :editor="accountDropDownEditor" :headerAttributes="{
                                                            style: 'background-color: #EDF1F5'
                                                        }"/>
                                                <kendo-grid-column :field="'description'" :title="$t('description')"
                                                                   :width="200" :headerAttributes="{
                                                            style: 'background-color: #EDF1F5'
                                                        }"/>
                                                <kendo-grid-column :field="'amount'" :title="$t('amount')" :width="160"
                                                                   :format="'{0:n}'"
                                                                   :headerAttributes="{
                                                            style: 'background-color: #EDF1F5'
                                                        }"/>
                                                <kendo-grid-column :field="'tax'" :title="$t('tax')"
                                                                   :editor="TaxDropDownEditor"
                                                                   :template="taxTemplate"
                                                                   :width="150" :headerAttributes="{
                                                                style: 'text-align: right; background-color: #EDF1F5'
                                                            }" :attributes="{
                                                                style: 'text-align: right'
                                                            }"/>
                                                <kendo-grid-column
                                                    :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRowOC, class: 'btn-plus' }"
                                                    :title="'&nbsp;'" :width="100" :headerAttributes="{
                                                            style: 'text-align: right; background-color: #EDF1F5'
                                                        }"/>
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-btn @click="addRowAccount" class="float-left btn_plus rounded-0 mr-2">
                                                <v-icon size="" class="ma-1">fa-plus</v-icon>
                                            </v-btn>
                                            <!--                                            <v-btn class="float-left btn_plus rounded-0 mr-2">-->
                                            <!--                                                <v-icon size="" class="ma-1">fa fa-barcode</v-icon>-->
                                            <!--                                            </v-btn>-->
                                        </v-col>
                                    </v-row>
                                    <!-- Grid Three -->
                                    <v-row style="background-color: #fff;">
                                        <v-col cols="12" class="pb-0">
                                            <h2 class="greyText--text mb-0 font_20">{{ $t('components_used') }}</h2>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <kendo-datasource ref="componentUsedDS"
                                                              :data="interalUsage.componentsUsed"/>
                                            <kendo-grid id="gridComponentUsed" class="grid-function"
                                                        :data-source-ref="'componentUsedDS'"
                                                        :sortable="false" :filterable="false" :column-menu="true"
                                                        :editable="true" :scrollable-virtual="true">
                                                <kendo-grid-column :template="rowNumberCU" :title="$t('no.')"
                                                                   :width="55" :column-menu="false"
                                                                   :headerAttributes="{
                                                        style: 'background-color: #EDF1F5;',
                                                        class: 'text-variants'
                                                    }" :attributes="{
                                                        style: 'text-align: variants'
                                                    }"/>
                                                <kendo-grid-column :field="'item'" :title="$t('item')"
                                                                   :width="200" :template="itemTemplate"
                                                                   :editor="ItemDropDownEditorCU" :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                                <kendo-grid-column :field="'description'" :title="$t('description')"
                                                                   :width="200" :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                                <kendo-grid-column :field="'uom'"
                                                                   :editor="UOMDropDownEditor"
                                                                   :template="UOMTemplateCU"
                                                                   :title="$t('uom')" :width="160"
                                                                   :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                                <kendo-grid-column :field="'qty'" :title="$t('qty')" :format="'{0:n}'"
                                                                   :width="150" :headerAttributes="{
                                                            style: 'text-align: right; background-color: #EDF1F5'
                                                        }" :attributes="{
                                                            style: 'text-align: right'
                                                        }"/>
<!--                                                <kendo-grid-column :field="'wastage'" :title="$t('wastage')"-->
<!--                                                                   :format="'{0:n}'" :width="150" :headerAttributes="{-->
<!--                                                            style: 'text-align: right; background-color: #EDF1F5'-->
<!--                                                        }" :attributes="{-->
<!--                                                            style: 'text-align: right'-->
<!--                                                        }"/>-->
                                                <kendo-grid-column :field="'cost'" :title="$t('cost')" :format="'{0:n}'"
                                                                   :width="150" :headerAttributes="{
                                                            style: 'text-align: right; background-color: #EDF1F5'
                                                        }" :attributes="{
                                                            style: 'text-align: right'
                                                        }"/>
                                                <kendo-grid-column
                                                    :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow, class: 'btn-plus' }"
                                                    :title="'&nbsp;'" :width="100" :headerAttributes="{
                                                        style: 'text-align: right; background-color: #EDF1F5'
                                                    }"/>
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-btn @click="addRowComponentUse"
                                                   class="float-left btn_plus rounded-0 mr-2">
                                                <v-icon size="" class="ma-1">fa-plus</v-icon>
                                            </v-btn>
<!--                                            <v-btn class="float-left btn_plus rounded-0 mr-2">-->
<!--                                                <v-icon size="" class="ma-1">fa fa-barcode</v-icon>-->
<!--                                            </v-btn>-->
                                        </v-col>
                                    </v-row>

                                    <v-row style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-row>
                                                <v-col sm="6" cols="6" class="pb-0">
                                                    <v-textarea height="90px" no-resize outlined clearable rows="3"
                                                                placeholder="This will appear on the invoice"/>
                                                </v-col>
                                                <v-col sm="6" cols="6" class="py-0">
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <tbody>
                                                            <tr>
                                                                <td class="text-left text-uppercase">
                                                                    {{ $t('total_cost') }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">{{ totalCost }}</td>
                                                            </tr>
                                                            </tbody>
                                                        </template>
                                                    </v-simple-table>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>

                                    <v-divider/>
                                    <v-card outlined dense class="no_border function_footer">
                                        <v-alert type="warning" v-model="alert" dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="mr-2 float-left select_template" v-on="on">
                                                    {{ $t('select_template') }}
                                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item v-for="(item, index) in templates" :key="index">
                                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <v-btn color="black"
                                               class="text-capitalize rounded-pill white--text float-left"
                                               @click="cancel">{{ $t('cancel') }}
                                        </v-btn>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn color="primary"
                                                       class="ml-2 float-right text-capitalize rounded-pill white--text"
                                                       v-on="on">
                                                    {{ $t('save_option') }}
                                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list rounded>
                                                <v-list-item-group>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title v-if="!isEdit" @click="saveNew">
                                                                {{ $t('save_new') }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title @click="savePrint">{{ $t('save_print') }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list-item-group>
                                            </v-list>
                                        </v-menu>
                                        <v-btn color="secondary"
                                               class="float-right white--text text-capitalize rounded-pill">
                                            {{ $t('save_draft') }}
                                        </v-btn>
                                    </v-card>
                                </v-form>
                            </v-col>
                            <v-col class="smallSide" sm="4" style="transition: .3s ease-in;"
                                   :class="{'hide_small_bar_class':isHideBar}">
                                <h3 style="color: #b3b5bc; font-size:20px;" v-if="!isHideBar"
                                    class="text-uppercase float-right mt-n3">
                                    <span class="pointer" @click="Help('internal usage')">
                                        {{ $t('help') }}
                                    </span>
                                    <v-icon @click="cancel()"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right mt-n1">close
                                    </v-icon>
                                </h3>

                                <div v-if="!isHideBar" class="small_sidebar mt-9 px-4 grayBg">
                                    <v-row>
                                        <v-col sm="12" cols="12">
                                            <h4 class="mb-3 text-uppercase">{{ $t("analysis") }}</h4>
                                            <label class="label mb-0">{{ $t('segment') }}</label>
                                            <v-select class="mt-2"
                                                      v-model="interalUsage.segment"
                                                      :items="segments"
                                                      item-value="id"
                                                      :item-text="item =>`${item.code} - ${item.name}`"
                                                      return-object
                                                      tage="sub Of"
                                                      placeholder="Sub Of"
                                                      outlined=""/>
                                            <label class="label mb-0">{{ $t('location') }}</label>
                                            <v-select class="mt-2"
                                                      v-model="interalUsage.location"
                                                      :items="locations"
                                                      item-value="id"
                                                      :item-text="item =>`${item.code} - ${item.name}`"
                                                      return-object
                                                      tage="Location"
                                                      placeholder="bu/location"
                                                      outlined=""/>
                                            <label class="label font_14">{{ $t('sale_channel') }}</label>
                                            <v-select class=" my-2"
                                                      v-model="interalUsage.saleChannel"
                                                      :items="saleChannelList"
                                                      item-value="id"
                                                      item-text="name"
                                                      return-object
                                                      tage="Sale Channel"
                                                      placeholder="Channel"
                                                      outlined
                                            />
                                            <label class="label">{{ $t("project") }}</label>
                                            <v-select
                                                class="mt-1"
                                                v-model="interalUsage.project"
                                                :items="projects"
                                                :item-text="item =>`${item.code} - ${item.name}`"
                                                item-value="id"
                                                tage="Project"
                                                outlined
                                            />
                                            <!--                                            <label class="label">{{ $t("default_employee") }}</label>-->
                                            <!--                                            <v-select-->
                                            <!--                                                class="mt-1"-->
                                            <!--                                                :items="suppliers"-->
                                            <!--                                                :rules="[(v) => !!v || 'Payble Account is required']"-->
                                            <!--                                                return-object-->
                                            <!--                                                tage="Default Employee"-->
                                            <!--                                                outlined-->
                                            <!--                                            />-->
                                            <label class="label">{{ $t("for_month_of") }}</label>
                                            <app-monthpicker
                                                :initMonthOf="interalUsage.monthOf"
                                                @emitMonthOf="interalUsage.monthOf = $event"
                                            />
                                        </v-col>
                                    </v-row>
                                    <p class="mb-0 detial_smallside_p">{{ $t('internal_usage_funt_decs') }}</p>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true" :alertMessage="loadingAlert"
                       :color="loadingColorAlert" :alertText="loadingTextAlert"/>
        </v-container>
    </v-app>
</template>

<script>
import {i18n} from '@/i18n';
import LoadingMe from '@/components/Loading'
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import MonthOfPicker from "@/components/kendo_templates/MonthOfPicker";
import InteralUsage from "@/scripts/model/InteralUsage";
import kendo from "@progress/kendo-ui";
import { ShowResource } from '@/observable/store'

const interalUsageModel = new InteralUsage({})
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const prefixHandler = require("@/scripts/prefixHandler")
const warehouseHandler = require("@/scripts/warehouseHandler")
const settingsHandler = require("@/scripts/settingsHandler")
const settingHandler = require("@/scripts/settingHandler")
const locationHandler = require("@/scripts/locationHandler")
const saleChannelHandler = require("@/scripts/saleChannelHandler")
const projectHandler = require("@/scripts/projectHandler")
const uomPriceHandler = require("@/scripts/uomPriceHandler")
const productVariantHandler = require("@/scripts/productVariantHandler")
const accountHandler = require("@/scripts/handler/accounting/account")
const internalUsageHandler = require("@/scripts/internalUsageHandler")
const store = require("@/institute");

const $ = require("jquery")
export default {
    name: "InternalUsage",
    components: {
        'LoadingMe': LoadingMe,
        'app-datepicker': DatePickerComponent,
        "app-monthpicker": MonthOfPicker,
    },
    computed: {
        totalCost() {
            if (this.costIP !== 0 || this.costIA !== 0) {
                return this.costIP + this.costIA
            } else {
                return 0
            }
        },
    },
    data: () => ({
        isEdit: false,
        // LoadingMe
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        bill_date: '',
        alert: false,
        deposite: 1000,
        files: [],
        // Form validation
        valid: true,

        journal_types: [],
        suppliers_item: [],
        expense: [
            'Equal',
            'weighted'
        ],
        journal_date: "",
        templates: [{
            title: 'Draft'
        },
            {
                title: 'Open'
            },
            {
                title: 'Paid'
            },
            {
                title: 'Partially Paid'
            },
        ],
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,
        suppliers: ["Suppliers", "Customer", "Employee"],
        transaction: [{
            id: "12",
            name: "Purchase Order",
            no: "No.0024",
            price: "2,50000",
        },
            {
                id: "14",
                name: "Godd Recipt Note",
                no: "No.0024",
                price: "2,50000",
            }
        ],
        item_suppliers: [{
            name: "Subtotal",
            value: "10000.00"
        },
            {
                name: "Subtotal",
                value: "10000.00"
            },
            {
                name: "Subtotal",
                value: "10000.00"
            },
            {
                name: "Subtotal",
                value: "10000.00"
            },
            {
                name: "Subtotal",
                value: "10000.00"
            },
        ],

        interalUsage: interalUsageModel,
        warehouses: [],
        segments: [],
        locations: [],
        saleChannelList: [],
        projects: [],

        itemLinesIP: interalUsageModel.product,
        itemLinesIA: interalUsageModel.accounts,
        itemLinesCU: interalUsageModel.componentsUsed,
        itemLineIP: [],
        itemLineIA: [],
        itemLineCU: [],
        accounts: [],
        costIP: 0,
        costIA: 0,
        vatTax: [],
    }),
    methods: {
        Help(ke_search){
            ShowResource(ke_search)
        },
        async loadTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    settingHandler.get().then(res => {
                        this.tax = res
                        // this.otherTax = this.tax.filter(m => m.taxType.typeId === 7) // valuable tax
                        // this.specificTax = this.tax.filter(m => m.taxType.typeId === 8 && m.transactionType === 'Sale') // valuable tax
                        // this.publicLightingTax = this.tax.filter(m => m.taxType.typeId === 9 && m.transactionType === 'Sale') // valuable tax
                        this.vatTax = this.tax.filter(m => (m.taxType.typeId === 1 || m.taxType.typeId === 2) && m.transactionType === 'Purchase') // valuable tax

                    })
                }, 300)
            })
        },
        async loadAccount() {
            this.showLoading = true
            // Use remote data
            if (store.default.state.accounts.length === 0) {
                await accountHandler.getAll()
                    .then(res => {
                        window.console.log(res, 'account')
                        this.accounts = res
                        this.showLoading = false
                    });
            } else {
                this.accounts = store.default.state.accounts
            }
        },
        async loadProjects() {
            await projectHandler.list().then(res => {
                this.projects = res.data.data
                if (this.projects.length > 0) {
                    this.interalUsage.project = this.projects[0]
                }
            })
        },
        async loadSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segments = []
                    settingsHandler.getSeg().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.segments = res.data.data
                            if (this.segments.length > 0) {
                                this.interalUsage.segment = this.segments[0]
                            }
                            // this.segmentList = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async loadLocation() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.locations = []
                    locationHandler.list().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.locations = res.data.data
                            if (this.locations.length > 0) {
                                this.interalUsage.location = this.locations[0]
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async loadSaleChannel() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    saleChannelHandler.get().then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.saleChannelList = res.data.data
                            if (this.saleChannelList.length > 0) {
                                this.interalUsage.saleChannel = this.saleChannelList[0]
                            }
                        } else {
                            this.showLoading = false
                        }
                    })
                }, 300);
            })
        },
        removeRowOC(e) {
            e.preventDefault();
            const grid = kendo.jQuery("#gridOtherCost").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        async loadWarehouses() {
            warehouseHandler.getWarehouseSettingAll().then(res => {
                this.warehouses = res
            })
        },
        async loadPrefix() {
            new Promise(resolve => {
                setTimeout(async () => {
                    resolve('resolved');
                    await prefixHandler.get('internal usage').then(async res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.transactionTypes = res.data.data
                            if (this.transactionTypes.length > 0) {
                                this.interalUsage.transactionType = this.transactionTypes[0]
                                if (this.$route.params.id === undefined) {
                                    await this.generateNumber()
                                }
                            }
                        }

                    })
                }, 300);
            })
        },
        async generateNumber() {
            if (this.interalUsage.date !== '') {
                let data = {
                    abbr: this.interalUsage.transactionType.abbr,
                    structure: this.interalUsage.transactionType.structure,
                    transactionDate: this.interalUsage.date,
                    sequcencing: this.interalUsage.transactionType.sequcencing,
                    prefixSeparator: this.interalUsage.transactionType.prefixSeparator || '',
                    numberSeparator: this.interalUsage.transactionType.numberSeparator || '',
                    format: this.interalUsage.transactionType.format || 5,
                    type: 'Internal Usage',
                    entity: 2,
                }
                this.interalUsage.abbr = data.abbr
                this.interalUsage.structure = data.structure
                this.interalUsage.sequcencing = data.sequcencing
                this.interalUsage.transactionDate = data.transactionDate
                this.interalUsage.type = data.type
                await billingHandler.lastNumber(data).then(response => {
                    window.console.log(response.data.data.lastNumber, 'lastnumber')
                    if (response.data.statusCode === 200) {
                        const res = response.data.data
                        const lastNumber = this.zeroPad(parseInt(res.lastNumber), this.interalUsage.transactionType.format)
                        const number = res.suffix + this.interalUsage.transactionType.numberSeparator + lastNumber
                        this.interalUsage.number = number
                        this.interalUsage.lastNumber = res.suffix + lastNumber
                    }
                }).catch(e => {
                    this.errors.push(e)
                })
            }
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        rowNumberIP(dataItem) {
            let ds = this.$refs.productDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        async getDataSource() {
            let dsFP = this.$refs.productDS.kendoWidget(),
                dataRowFP = dsFP.data()
            this.itemLineIP = []
            dataRowFP.forEach(i => {
                window.console.log(i, 'item')
                window.console.log(i.item, '2134')
                this.itemLineIP.push({
                    id: i.id,
                    item: i.item,
                    description: i.description,
                    uom: i.uom,
                    yield_qty: i.yield_qty,
                    cost: i.cost,
                })
            })
            window.console.log(this.itemLineIP[0].item, 'item21435')
            let dsIA = this.$refs.accountDS.kendoWidget(),
                dataRowOP = dsIA.data()
            this.itemLineIA = []
            dataRowOP.forEach(i => {
                this.itemLineIA.push({
                    id: i.id,
                    item: i.item,
                    description: i.description,
                    amount: i.amount,
                    tax: i.tax
                })
            })
            let dsCU = this.$refs.componentUsedDS.kendoWidget(),
                dataRowCU = dsCU.data()
            this.itemLineCU = []
            dataRowCU.forEach(i => {
                this.itemLineCU.push({
                    id: i.id,
                    item: i.item,
                    description: i.description,
                    uom: i.uom,
                    qty: i.qty,
                    cost: i.cost,
                })
            })
        },
        dataSourceChangedIP(e) {
            if (e.field) {
                let dataRow = e.items[0]
                switch (e.field) {
                    case "cost":
                        this.costIP = dataRow.cost
                        break
                    case "item":
                        dataRow.set('description', dataRow.item.description)
                        break
                }
            }
        },
        dataSourceChangedIA(e) {
            if (e.field) {
                let dataRow = e.items[0]
                switch (e.field) {
                    case "amount":
                        this.costIA = kendo.parseFloat(dataRow.amount)
                        break


                }
            }
        },
        taxTemplate(dataItem) {
            window.console.log('vat', dataItem.tax)
            const vat = dataItem.tax
            if (vat) {
                return `<span>${vat.defaultTax ? vat.defaultTax : ``}</span>`
            } else {
                return ``
            }
        },
        TaxDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "defaultTax",
                    dataValueField: "id",
                    template: "<span>#=defaultTax#</span>",
                    optionLabel: "--Select--",
                    dataSource: new kendo.data.DataSource({
                        data: this.vatTax
                    })
                })
        },
        accountTemplate(dataItem) {
            const acc = dataItem.account
            if (acc) {
                return `<span>${acc.name ? acc.name : ``}</span>`
            } else {
                return ``
            }
        },
        UOMDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "uom.toUOM.name",
                    dataValueField: "uom.toUOM.id",
                    cascadeFrom: "item",
                    template: "<span>#=uom.toUOM.name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: uomPriceHandler.getUrl(options.model.item.id),
                            },
                            dataType: "json",
                        },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {type: "string"},
                                    // name: {type: "string"},
                                    // sku: {type: "string"},
                                }
                            },
                            data: function (response) {
                                return response.data
                            },
                            total: function (response) {
                                return response.data.count
                            }
                        },
                        // data: this.variants
                    }),
                })
        },
        UOMTemplate(dataItem) {
            const uom = dataItem.uom
            //
            if (uom) {
                return `<span>${uom.uom ? uom.uom.toUOM.name : ``}</span>`
            } else {
                return ``
            }
        },
        UOMTemplateCU(dataItem) {
            const uom = dataItem.uom
            //
            if (uom) {
                return `<span>${uom.uom ? uom.uom.toUOM.name : ``}</span>`
            } else {
                return ``
            }
        },
        ItemDropDownEditorTP(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "id",
                    headerTemplate: '<div class="dropdown-header k-widget k-header">' +
                        '<span>Items </span>' +
                        '<span></span>' +
                        '</div>',
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: productVariantHandler.searchURL(),
                            },
                            dataType: "json",
                        },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {type: "string"},
                                    name: {type: "string"},
                                    sku: {type: "string"},
                                }
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            }
                        },
                        // data: this.variants
                    }),
                })
        },
        ItemDropDownEditorCU(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "id",
                    headerTemplate: '<div class="dropdown-header k-widget k-header">' +
                        '<span>Items </span>' +
                        '<span></span>' +
                        '</div>',
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: productVariantHandler.itemSearchURL(),
                            },
                            dataType: "json",
                        },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {type: "string"},
                                    name: {type: "string"},
                                    sku: {type: "string"},
                                }
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            }
                        },
                        // data: this.variants
                    }),
                })
        },
        itemTemplate(dataItem) {
            const item = dataItem.item
            if (item) {
                return `<span>${item.name ? item.name : ``}</span>`
            } else {
                return ``
            }
        },
        addRowProduct() {
            let ds = this.$refs.productDS.kendoWidget(),
                total = ds.total();
            ds.insert(total, this.itemLinesIP)
        },
        addRowAccount() {
            let ds = this.$refs.accountDS.kendoWidget(),
                total = ds.total()
            ds.insert(total, this.itemLinesTA)
        },
        rowNumberIA(dataItem) {
            let ds = this.$refs.accountDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        addRowComponentUse() {
            let ds = this.$refs.componentUsedDS.kendoWidget(),
                total = ds.total()
            ds.insert(total, this.itemLinesCU)
        },
        rowNumberCU(dataItem) {
            let ds = this.$refs.componentUsedDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        savePrint() {

        },
        async saveNew() {
            await this.getDataSource()
            window.console.log(this.itemLinesIP)
            this.interalUsage.totalCost = this.totalCost
            this.interalUsage.product = this.itemLineIP
            this.interalUsage.accounts = this.itemLineIA
            this.interalUsage.componentsUsed = this.itemLineCU
            window.console.log(this.interalUsage)
            await internalUsageHandler.create(this.interalUsage).then(res => {
                window.console.log(res)
            })
        },
        async saveClose() {
            await this.getDataSource()
            this.interalUsage.totalCost = this.totalCost
            window.console.log(this.interalUsage)
            await internalUsageHandler.create(this.interalUsage).then(res => {
                window.console.log(res)
            })
        },
        removeRow() {
        },
        errorMessage() {

        },
        addRow() {
        },
        accountDropDownEditor(container, options) {
            // Defind ordering by number
            let compare = function (a, b) {
                if (a.items[0].number === b.items[0].number) {
                    return 0;
                } else if (a.items[0].number > b.items[0].number) {
                    return 1;
                } else {
                    return -1;
                }
            };
            // Defind default group
            let group = {
                field: "account_type.name",
                compare: compare
            };
            kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "uuid",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.accounts,
                        group: group
                    })
                }).data("kendoDropDownList");
        },
        cancel() {
            this.$swal({
                title: i18n.t('msg_title_warning'),
                text: i18n.t('msg_discard'),
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: i18n.t('cancel'),
                confirmButtonColor: "#4d4848",
                cancelButtonColor: "#ED1A3A",
                confirmButtonText: i18n.t('discard'),
            }).then((resultCen) => {
                if (resultCen.value) {
                    this.$router.go(-1);
                }
            });
        },
        hide_smallsitebar() {
            if (!this.isHideBar) {
                // this.col_expand = 12
                // this.col_hide = 0
                this.isHideBar = true
            } else {
                // this.col_expand = 9
                // this.col_hide = 3
                this.isHideBar = false
            }
        }
    },
    watch: {
        // call again the method if the route changes

    },
    async created() {
        await this.loadAccount()
    },
    async mounted() {
        await this.loadPrefix()
        await this.loadWarehouses()
        await this.loadTax()
        await this.loadLocation()
        await this.loadProjects()
        await this.loadSaleChannel()
        await this.loadSegment()
    },
};
</script>

<style scoped>
.function_wrapper {
    box-shadow: none !important;
}

.custom_grid table th:last-child {
    text-align: right !important;
}

.color_green {
    color: #03b154;
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
    padding: 0;
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
    height: 97%;
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

.color_grey {
    color: #808080;
}

.card_green {
    min-height: 70px;
    background-color: #00b050 !important;
    color: #ffffff;
}

.lb_bold {
    font-size: 12px;
}

.detial_smallside_p {
    position: absolute;
    bottom: 10px;
}

.card_background {
    background-color: #EDF1F5;
    min-height: 120px;
}

.deposite_input {
    width: 100px;
}

.btn_save_draft {
    color: #ffffff;
    background-color: #00b0f0 !important;
    text-transform: capitalize;
}

.save_option {
    background-color: #203864 !important;
}

.btn_add_small {
    height: 27px !important;
    min-width: 25px !important;
    font-size: 10px;
    padding: 0 22px !important;
    background-color: #00b050 !important;
    color: #ffffff;
    border-radius: 0 !important;
}

.list_site_inv {
    background-color: #92d050;
    color: #ffffff;
    font-size: 12px;
}

.list_site_exp {
    background-color: #c5e0b4;
    color: #000000;
    font-size: 12px;
    line-height: 16px;
    min-height: 40px;
}

.checkbox_inv {
    padding: 2px;
    margin-top: 3px;
    margin-right: 2px;
}

.exp_select {
    font-size: 12px !important;
}

.border_radius10 {
    border-radius: 10px !important;
    background-color: #F2F2F2;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
</style>
