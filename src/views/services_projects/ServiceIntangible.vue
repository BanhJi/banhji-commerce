<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t('product') }}</h2>
                                <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close
                                </v-icon>
                            </v-card>
                            <v-card outlined dense class="px-3 no_border" color="grayBg">
                                <v-row>
                                    <v-col sm="3" cols="12" class="pb-0">
                                        <label class="label  mb-0">{{ $t('product_category') }}</label>
                                        <v-select class="mt-1"
                                                  :placeholder="$t('select_type')"
                                                  outlined
                                                  tage="Product Category"
                                                  v-model="mCategory"
                                                  :items="categories"
                                                  item-value="id"
                                                  :item-text="item =>`${item.abbr} - ${item.name}`"
                                                  @change="onCategoryChanged"
                                                  return-object
                                                  :rules="[v => !!v || 'Number is required']"
                                                  required/>
                                        <label class="label  mb-0">{{ $t('product_group') }}</label>
                                        <v-select class="mt-1"
                                                  :placeholder="$t('select_group')"
                                                  outlined
                                                  tage="Product Group"
                                                  v-model="mGroup"
                                                  :items="group"
                                                  item-value="id"
                                                  :item-text="item =>`${item.abbr} - ${item.name}`"
                                                  return-object
                                                  :rules="[v => !!v || 'Number is required']"
                                                  required/>
                                        <label class="label  mb-0">{{ $t('sub_group') }}</label>
                                        <v-select class="mt-1"
                                                  :placeholder="$t('select_sub_group')"
                                                  outlined
                                                  tage="Sub Group"
                                                  v-model="mSubGroup"
                                                  :items="subGroup"
                                                  item-value="id"
                                                  :item-text="item =>`${item.abbr} - ${item.name}`"
                                                  :rules="[v => !!v || 'Number is required']"
                                                  required/>
                                    </v-col>
                                    <v-col sm="3" cols="12" class="pl-0">
                                        <label class="label mb-0 mt-1 mx-1">{{ $t('sku') }}</label>
                                        <v-row class="my-0 mx-1">
                                            <v-col sm="10" cols="7" class="pt-1 pb-0 pl-0 pr-1">
                                                <v-text-field class="  "
                                                              v-model="product.sku"
                                                              outlined
                                                              :rules="[v => !!v || 'Number is required']"
                                                              required/>
                                            </v-col>
                                            <v-col sm="2" cols="2" class="pt-1 pb-0 px-0" @click="skuGenerator">
                                                <v-icon color="black" size="30" class="border_qrcode">mdi-qrcode
                                                </v-icon>
                                            </v-col>
                                        </v-row>
                                        <label class="label  mb-0">{{ $t('product_name') }}</label>
                                        <v-text-field class="mt-1"
                                                      :placeholder="$t('name')"
                                                      outlined
                                                      v-model="product.name"
                                                      :rules="[v => !!v || 'Number is required']"
                                                      required/>

                                    </v-col>
                                    <v-col sm="6" cols="12" class="my_checkbox">
                                        <h2 class="font_18 mt-6">{{ $t('how_this_purchased') }}</h2>
                                        <v-row>
                                            <v-col sm="4" cols="12">
                                                <input type="checkbox" id="1" v-model="product.canBeSold">
                                                <label for="1">{{ $t('can_be_sold') }}</label>

                                                <input type="checkbox" id="5" v-model="product.isFavorite">
                                                <label for="5">{{ $t('is_favorite') }}</label>

                                                <input type="checkbox" id="2" v-model="product.canBePurchase">
                                                <label for="2">{{ $t('can_be_purchased') }}</label>
                                            </v-col>
                                            <v-col sm="4" cols="12" class="border_right_lightgrey">
                                                <input type="checkbox" id="3" v-model="product.canBeProduce">

                                                <label for="3">{{ $t('can_be_produced') }}</label>
                                                <input type="checkbox" id="4" v-model="product.canBeRent">
                                                <label for="4">{{ $t('can_be_rented') }}</label>
                                            </v-col>
                                            <v-col sm="4" cols="12" class="my_radio">
                                                <input id="radio1" name="radio" type="radio" value=1
                                                       v-model="mSerialOrBatch"> <label
                                                for="radio1">{{ $t('batch_tracked') }}</label>
                                                <input id="radio2" name="radio" type="radio" value=2
                                                       v-model="mSerialOrBatch"> <label
                                                for="radio2">{{ $t('serial_number') }}</label>
                                            </v-col>
                                        </v-row>

                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card outlined dense class="px-3 my-4 rounded-0" height="188px">
                                <v-row>
                                    <v-col sm="6" cols="12">
                                        <h2 class="font_20 mb-0">{{ $t('purchased_description') }}</h2>
                                        <p class="grayBg---text font_12 mb-2">{{ $t('this_will_be_used') }}</p>
                                        <v-textarea v-model="product.saleDescription"
                                                    outlined
                                                    no-resize height="100px"
                                                    rows="3"/>
                                    </v-col>
                                    <v-col sm="6" cols="12">
                                        <h2 class="font_20 mb-0">{{ $t('sale_description') }}</h2>
                                        <p class="grayBg---text font_12 mb-2">{{ $t('this_will_be_used') }}</p>
                                        <v-textarea v-model="product.purchaseDescription"
                                                    outlined
                                                    no-resize height="100px"
                                                    rows="3"/>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card outlined dense class="px-3 mt-4 rounded-0">
                                <v-row>
                                    <v-col cols="12">
                                        <p class="grayBg---text font_14 mb-0">{{ $t('you_can_add') }}</p>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="py-0">
                                        <v-row>
                                            <v-col sm="4" cols="12" class="py-0">
                                                <label>{{ $t('sale_base_uom') }}</label>
                                            </v-col>
                                            <v-col sm="8" cols="12" class="pl-0 py-0">
                                                <v-select :placeholder="$t('select_uom')"
                                                          outlined
                                                          tage="Sale Base UOM"
                                                          :rules="[v => !!v || 'Number is required']"
                                                          v-model="mSaleUOM"
                                                          :items="uom"
                                                          item-value="id"
                                                          :item-text="item =>`${item.name} - ${item.category.name}`"
                                                          return-object
                                                          required/>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col sm="4" cols="12" class="py-0">
                                                <label>{{ $t('purchase_base_uom') }}</label>
                                            </v-col>
                                            <v-col sm="8" cols="12" class="pl-0 py-0">
                                                <v-select :placeholder="$t('select_uom')"
                                                          outlined
                                                          tage="Purchase Base UOM"
                                                          :rules="[v => !!v || 'Number is required']"
                                                          v-model="mPurchaseUOM"
                                                          :items="uom"
                                                          item-value="id"
                                                          :item-text="item =>`${item.name} - ${item.category.name}`"
                                                          return-object
                                                          required/>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="py-0">
                                        <v-row>
                                            <v-col sm="4" cols="12" class="py-0">
                                                <label>{{ $t('selling_price') }}</label>
                                            </v-col>
                                            <v-col sm="8" cols="12" class="pl-0 py-0">
                                                <v-text-field outlined
                                                              :rules="[v => !!v || 'Number is required']"
                                                              v-model="product.sellingPrice"
                                                              required/>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col sm="4" cols="12" class="py-0">
                                                <label>{{ $t('initial_cost_per_unit') }}</label>
                                            </v-col>
                                            <v-col sm="8" cols="12" class="pl-0 py-0">
                                                <v-text-field outlined
                                                              :rules="[v => !!v || 'Number is required']"
                                                              v-model="product.initCost"
                                                              required/>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="py-0">
                                        <v-row>
                                            <v-col sm="4" cols="12" class="py-0">
                                                <label>{{ $t('default_warehouse') }}</label>
                                            </v-col>
                                            <v-col sm="8" cols="12" class="pl-0 py-0">
                                                <v-select :placeholder="$t('default_warehouse')"
                                                          outlined
                                                          tage="Default Warehouse"
                                                          :rules="[v => !!v || 'Number is required']"
                                                          v-model="mWareHouse"
                                                          :items="wareHouses"
                                                          item-value="id"
                                                          :item-text="item =>`${item.code} - ${item.name}`"
                                                          return-object
                                                          required/>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col sm="4" cols="12" class="py-0">
                                                <label>{{ $t('recorder_qty') }}</label>
                                            </v-col>
                                            <v-col sm="8" cols="12" class="pl-0 py-0">
                                                <v-text-field outlined
                                                              :rules="[v => !!v || 'Number is required']"
                                                              v-model="product.reOrderQTY"
                                                              required/>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card outlined dense class="no_border my-1" >
                                <v-row>
                                    <v-col sm="7" cols="12">
                                        <v-card outlined dense class="px-3 rounded-0" height="428px">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <h2 class="font_20 mb-0">{{ $t('account_tax') }}</h2>
                                                    <p class="mb-0 mb-1 color_grey">{{
                                                            $t('add_funct_prod_desc')
                                                        }}</p>
                                                </v-col>
                                                <v-col sm="6" cols="12">
                                                    <label class="label ">{{ $t('inventory') }}</label>
                                                    <v-select class="mt-1"
                                                              :placeholder="$t('select_inventory')"
                                                              tage="Inventory"
                                                              v-model="mAccInventory"
                                                              :items="accInventory"
                                                              item-value="id"
                                                              :item-text="item =>`${item.number} - ${item.name}`"
                                                              return-object
                                                              outlined/>
                                                    <label class="label ">{{
                                                            $t('cost_of_goods_sold')
                                                        }}</label>
                                                    <v-select class="mt-1"
                                                              :placeholder="$t('select_goods')"
                                                              tage="Cost of Goods Sold"
                                                              v-model="mAccCostOfGoodSold"
                                                              :items="accCostOfGoodSold"
                                                              item-value="id"
                                                              :item-text="item =>`${item.number} - ${item.name}`"
                                                              return-object
                                                              outlined/>
                                                    <label class="label ">{{ $t('revenue') }}</label>
                                                    <v-select class="mt-1"
                                                              :placeholder="$t('revenue')"
                                                              tage="Revenue"
                                                              v-model="mAccRevenue"
                                                              :items="accRevenue"
                                                              item-value="id"
                                                              :item-text="item =>`${item.number} - ${item.name}`"
                                                              return-object
                                                              outlined/>
                                                </v-col>
                                                <v-col sm="6" cols="12">
                                                    <label class="label ">{{ $t('default_tax') }}</label>
                                                    <v-select class="mt-1"
                                                              tage="Default Tax"
                                                              v-model="mVAT"
                                                              :items="vat"
                                                              item-value="id"
                                                              item-text="defaultTax"
                                                              return-object
                                                              outlined/>
                                                    <label class="label ">{{ $t('purchase_tax') }}</label>
                                                    <v-select class="mt-1"
                                                              tage="Default Tax"
                                                              v-model="mPurchaseTax"
                                                              :items="purchaseTax"
                                                              item-value="id"
                                                              item-text="defaultTax"
                                                              return-object
                                                              outlined/>
                                                    <label class="label ">{{ $t('specific_tax') }}</label>
                                                    <v-select class="mt-1"
                                                              tage="Special Tax"
                                                              v-model="mSpecificTax"
                                                              :items="specificTax"
                                                              item-value="id"
                                                              item-text="defaultTax"
                                                              return-object
                                                              outlined/>
                                                    <label class="label ">{{ $t('other_tax') }}</label>
                                                    <v-select class="mt-1"
                                                              tage="Special Tax"
                                                              v-model="mOtherTax"
                                                              :items="otherTax"
                                                              item-value="id"
                                                              item-text="defaultTax"
                                                              return-object
                                                              outlined/>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                    <v-col sm="5" cols="12" class="pl-1">
                                        <v-card outlined dense class="px-3 rounded-0">
                                            <v-row>
                                                <v-col cols="12" sm="12">
                                                    <h2 class="font_20 mb-0">{{ $t('product_variants') }}</h2>
                                                    <p class="mb-0 color_grey">{{
                                                            $t('add_funct_prod_variants_desc')
                                                        }}</p>
                                                </v-col>
                                                <v-col sm="12" cols="12" class="pt-2">
                                                    <kendo-datasource ref="dataSource"
                                                                      :data="varLists"/>
                                                    <kendo-grid id="grid" class="grid-function"
                                                                :data-source-ref="'dataSource'"
                                                                :sortable="false"
                                                                :filterable="false"
                                                                :column-menu="true"
                                                                :navigatable="true"
                                                                :editable="true"
                                                                :scrollable-virtual="true">
                                                        <kendo-grid-column
                                                            :title="$t('no.')"
                                                            :template="rowNumberTmpl"
                                                            :width="45"
                                                            :column-menu="false"
                                                            :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                                                            :attributes="{style: 'text-align: center'}"/>
                                                        <kendo-grid-column
                                                            :field="'variant'"
                                                            :title="$t('variant')"
                                                            :width="190"
                                                            :template="'<span>#=variant.name#</span>'"
                                                            :editor="attributeDropDownEditor"
                                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                        <kendo-grid-column
                                                            :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow, class: 'btn-plus' }"
                                                            :title="$t('action')"
                                                            :width="100"
                                                            :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                                                    </kendo-grid>
                                                    <v-btn color="primary"
                                                           class="float-left rounded-0 white--text mt-3"
                                                           @click="addRow">
                                                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card>

                            <v-divider/>
                            <v-card outlined dense class="no_border function_footer">
                                <v-btn color="black" @click="close"
                                       outlined
                                       class="text-capitalize  black--text float-left">{{ $t('cancel') }}
                                </v-btn>
                                <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="primary" class="ml-2 float-right white--text text-capitalize" v-on="on">
                                            {{ $t('save_option') }}
                                            <v-icon size="" class="ma-1">expand_more</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list rounded>
                                        <v-list-item-group>
                                            <v-list-item>
                                                <v-list-item-content @click="onChange">
                                                    <v-list-item-title>{{ $t('save_new') }}</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-content @click="onSaveClose">
                                                    <v-list-item-title>{{ $t('save_close') }}</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                </v-menu>
                                <!--                <v-btn class="float-right btn_save_close" @click="onSaveClose">{{ $t('save_close') }}</v-btn>-->

                                <LoadingMe
                                    :isLoading="showLoading"
                                    :fullPage="true"
                                    :myLoading="true"/>
                            </v-card>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>

import ProductModel from "@/scripts/model/Products"
import kendo from '@progress/kendo-ui'
import VariantModel from "@/scripts/model/Variants"

const $ = require("jquery")

const accountHandler = require("@/scripts/handler/accounting/account")
const categoryHandler = require("@/scripts/categoryHandler")
const groupHandler = require("@/scripts/groupHandler")
const subGroupHandler = require("@/scripts/subGroupHandler")
const uomHandler = require("@/scripts/uomHandler")
const warehouseHandler = require("@/scripts/warehouseHandler")
const settingHandler = require("@/scripts/settingHandler")
const productHandler = require("@/scripts/productHandler")
const variantHandler = require("@/scripts/variantTypeHandler")
// const attributeHandler = require("@/scripts/attributeHandler")
const variantModel = new VariantModel({})

let productModel = new ProductModel({})
export default {
    name: "AddProduct",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`)
    },
    data: function () {
        return {
            showLoading: true,
            valid: '',
            mAccRevenue: '',
            mAccInventory: '',
            mCategory: '',
            mGroup: '',
            mFormTemplate: '',
            formTemplate: [
                {
                    id: 'ftp-c35cbe46-1c5e-11eb-adc1-0242ac120002',
                    name: 'Form A'
                },
                {
                    id: 'ftp-c35cc062-1c5e-11eb-adc1-0242ac120002',
                    name: 'Form B'
                },
                {
                    id: 'ftp-c35cc2ec-1c5e-11eb-adc1-0242ac120002',
                    name: 'Form C'
                }
            ],
            mAccCostOfGoodSold: '',
            accRevenue: [],
            accInventory: [],
            accCostOfGoodSold: [],
            categories: [],
            groups: [],
            group: [],
            subGroup: [],
            uom: [],
            tax: [],
            specificTax: [],
            vat: [],
            mSubGroup: {},
            subGroups: [],
            wareHouses: [],
            mSaleUOM: {},
            mPurchaseUOM: {},
            mWareHouse: {},
            mSpecificTax: {},
            mOtherTax: {},
            otherTax: [],
            mVAT: {},
            purchaseTax: [],
            mPurchaseTax: {},
            mSerialOrBatch: 0,
            variantTypes: [],
            variant: variantModel,
            varLists: [],
            product: productModel,
            productVariant: {},
            variantId: ''
        }
    },
    methods: {
        loadCategoryAccountAndTax() {
            this.mOtherTax = this.mCategory.tax.hasOwnProperty('otherTax') ? this.mCategory.tax.otherTax : {}
            this.mSpecificTax = this.mCategory.tax.hasOwnProperty('specificTax') ? this.mCategory.tax.specificTax : {}
            this.mVAT = this.mCategory.tax.hasOwnProperty('vatTax') ? this.mCategory.tax.vatTax : {}
            this.mPurchaseTax = this.mCategory.tax.hasOwnProperty('purchaseTax') ? this.mCategory.tax.purchaseTax : {}
            this.mAccRevenue = this.mCategory.account.hasOwnProperty('revenueAccount') ? this.mCategory.account.revenueAccount : {}
            this.mAccInventory = this.mCategory.account.hasOwnProperty('inventoryAccount') ? this.mCategory.account.inventoryAccount : {}
            this.mAccCostOfGoodSold = this.mCategory.account.hasOwnProperty('costOfGoodsSoldAccount') ? this.mCategory.account.costOfGoodsSoldAccount : {}
        },
        async initData() {
            // window.console.log('me', this.$route.params.id)
            if (this.$route.params.id !== undefined) {
                await this.loadSingleProduct()
            } else {
                let ds = this.$refs.dataSource.kendoWidget()
                ds.data([])
                this.addRow()
            }
        },
        addRow() {
            let ds = this.$refs.dataSource.kendoWidget(),
                total = ds.total();
            ds.insert(total, {
                variant: this.variant
            })
        },
        // Row Number Template
        rowNumberTmpl(dataItem) {
            var ds = this.$refs.dataSource.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        // Grid Custom Editor
        attributeDropDownEditor(container, options) {
            kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "id",
                    template: "<span>#=code# - #=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.variantTypes
                    })
                })
        },
        // Remove Row
        removeRow(e) {
            e.preventDefault();

            var grid = kendo.jQuery("#grid").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        onChange() {
        },
        async onEditClick(value) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.product = value
                }, 10)
            })
        },
        onNewClick() {
            this.product.id = ''
            this.clear()
        },
        close(data) {
            // window.history.go(-1)
            this.$router.push({
                name: 'Products Services', params: {
                    data: data
                }
            })
        },
        clear() {
            this.product = {}
        },
        async onSaveClose() {
            // if (!this.$refs.form.validate()) {
            //   this.$refs.form.validate()
            //   return
            // }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let ds = this.$refs.dataSource.kendoWidget()
                    // if (this.product.id === '' || this.product.id === undefined) {
                    let data = {
                        "id": this.$route.params.id,
                        "name": this.product.name,
                        "sku": this.product.sku,
                        "saleDescription": this.product.saleDescription,
                        "purchaseDescription": this.product.purchaseDescription,
                        "sellingPrice": this.product.sellingPrice,
                        "initCost": this.product.initCost,
                        "reOrderQTY": this.product.reOrderQTY,
                        "category": this.mCategory,
                        "group": this.mGroup,
                        "subGroup": this.mSubGroup,
                        "saleUOM": this.mSaleUOM,
                        "purchaseUOM": this.mPurchaseUOM,
                        "warehouse": this.mWareHouse,
                        "inventoryAccount": this.mAccInventory,
                        "revenueAccount": this.mAccRevenue,
                        "costOfGoodsSoldAccount": this.mAccCostOfGoodSold,
                        "vatTax": this.mVAT,
                        "purchaseTax": this.mPurchaseTax,
                        "specificTax": this.mSpecificTax,
                        "otherTax": this.mOtherTax,
                        "formTemplate": this.mFormTemplate,
                        "variant": ds.data(),
                        "variantId": this.variantId,
                        "canBeSold": this.product.canBeSold,
                        "canBeProduce": this.product.canBeProduce,
                        "canBeRent": this.product.canBeRent,
                        "canBePurchase": this.product.canBePurchase,
                        "isFavorite": this.product.isFavorite,
                        "batchTracked": this.mSerialOrBatch === 1 ? this.product.batchTracked : 0,
                        "isSerialNumber": this.mSerialOrBatch === 2 ? this.product.isSerialNumber : 0,
                        "status": 0,
                        "type": this.$route.params.id ? this.$route.query.type : 'new'
                    }
                    productHandler.create(data).then(response => {
                        if (response.data.statusCode === 201) {
                            // this.loadSaleUC()
                            // this.clear()
                            this.$snotify.success('Success')
                            this.close(response.data.data)
                            this.$refs.form.reset()

                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 10);
            })
        },
        async onCategoryChanged() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    // window.console.log(this.mCategory)
                    this.mGroup = ''
                    this.mSubGroup = ''
                    this.loadCategoryAccountAndTax()
                    this.group = this.groups.filter(m => m.category.id === this.mCategory.id)
                    if (this.group.length > 0) {
                        this.mGroup = this.group[0]
                        this.subGroup = this.subGroups.filter(m => m.group.id === this.group[0].id)
                        if (this.subGroup.length > 0) {
                            this.mSubGroup = this.subGroup[0]
                        }
                    }
                }, 10);
            })
        },
        async loadAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getAll().then(res => {
                        this.showLoading = false
                        this.accRevenue = res.data.filter(m => m.account_type.number === 32).map(item => {
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
                        if (this.accRevenue.length > 0) {
                            this.mAccRevenue = this.accRevenue[0]
                        }
                        this.accInventory = res.data.filter(m => m.account_type.number === 8).map(item => {
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
                        if (this.accInventory.length > 0) {
                            this.mAccInventory = this.accInventory[0]
                        }
                        this.accCostOfGoodSold = res.data.filter(m => m.account_type.number === 33).map(item => {
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
                        if (this.accCostOfGoodSold.length > 0) {
                            this.mAccCostOfGoodSold = this.accCostOfGoodSold[0]
                        }
                    })
                }, 10);
            })
        },
        async loadCategory() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    categoryHandler.get().then(res => {
                        this.showLoading = false
                        this.categories = res
                        this.categories = this.categories.filter(m => m.type.name === 'Product')
                        if (this.categories.length > 0) {
                            this.mCategory = this.categories[0]
                            this.onCategoryChanged()
                        }
                    })
                }, 10);
            })
        },
        async loadGroup() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    groupHandler.get().then(res => {
                        this.showLoading = false
                        this.groups = res
                    })
                }, 10);
            })
        },
        async loadSubGroup() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    subGroupHandler.get().then(res => {
                        this.showLoading = false
                        this.subGroups = res
                    })
                }, 10);
            })
        },
        async skuGenerator() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    window.console.log(this.mCategory.abbr)
                    this.product.sku = this.mCategory.abbr + "/" + this.mGroup.abbr + "/" + this.mSubGroup.abbr + '-' + this.product.name.toString().substring(0, 3)

                }, 10);
            })
        },
        async loadUOM() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    uomHandler.get().then(res => {
                        this.showLoading = false
                        this.uom = res
                        if (this.uom.length > 0) {
                            this.mSaleUOM = this.uom[0]
                            this.mPurchaseUOM = this.uom[0]
                        }
                    })
                }, 10);
            })
        },
        async loadWareHouses() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    warehouseHandler.getWarehouseSettingAll().then(res => {
                        this.showLoading = false
                        this.wareHouses = res
                        if (this.wareHouses.length > 0) {
                            this.mWareHouse = this.wareHouses[0]
                        }
                    })
                }, 10);
            })
        },
        async loadVariants() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    variantHandler.get().then(res => {
                        this.showLoading = false
                        this.variantTypes = res
                        if (this.variantTypes.length > 0) {
                            this.initData()
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
                        let st = this.tax.filter(m => m.taxType.typeId === 3) // valuable tax
                        this.specificTax = st // special tax

                        let vAT = this.tax.filter(m => m.taxType.typeId === 1 && m.transactionType === 'Sale') // valuable tax
                        this.vat = vAT // valuable tax

                        let otTax = this.tax.filter(m => m.taxType.typeId === 7) // valuable tax
                        this.otherTax = otTax // valuable tax

                        this.purchaseTax = this.tax.filter(m => m.taxType.typeId === 1 && m.transactionType === 'Purchase') // valuable tax
                        if (this.specificTax.length > 0) {
                            this.mSpecificTax = this.specificTax[0]
                        }
                        if (this.vat.length > 0) {
                            this.mVAT = this.vat[0]
                        }
                        if (this.otherTax.length > 0) {
                            this.mOtherTax = this.otherTax[0]
                        }
                        if (this.purchaseTax.length > 0) {
                            this.mPurchaseTax = this.purchaseTax[0]
                        }
                    })
                }, 10);
            })
        },
        async loadSingleProduct() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    productHandler.getOne(this.$route.params.id).then(res => {
                        this.showLoading = false
                        this.product = res
                        if (this.product.id !== undefined) {
                            this.mCategory = this.product.category
                            this.mGroup = this.product.group
                            this.mSubGroup = this.product.subGroup
                            this.mSaleUOM = this.product.saleUOM
                            this.mPurchaseUOM = this.product.purchaseUOM
                            this.mAccCostOfGoodSold = this.product.costOfGoodsSoldAccount
                            this.mAccInventory = this.product.inventoryAccount
                            this.mAccRevenue = this.product.revenueAccount
                            this.mSpecificTax = this.product.specificTax
                            this.mOtherTax = this.product.otherTax
                            this.mVAT = this.product.vatTax
                            this.mPurchaseTax = this.product.purchaseTax
                            this.productVariant = this.product.variant
                            this.mWareHouse = this.product.warehouse
                            this.varLists = []
                            this.variantId = this.product.variant.id
                            this.product.variant.variant.forEach(m => {
                                this.varLists.push({
                                    variant: {
                                        name: m.variant.name,
                                        id: m.variant.id,
                                        code: m.variant.code
                                    }
                                })
                            })
                        }
                    })
                }, 10);
            })
        },
    },
    mounted: async function () {

        await this.loadUOM()
        await this.loadWareHouses()
        await this.loadTax()
        await this.loadVariants()
    },
    computed: {},
    created: async function () {
        await this.loadAccount()
        await this.loadCategory()
        await this.loadGroup()
        await this.loadSubGroup()
    },
    watch: {
        id() {
            // this.product = this.selectedProduct
            window.console.log(this.id, 'watch')
            if (this.id !== undefined) {
                this.loadSingleProduct()
            }
        }
    },
}


</script>

<style scoped>
.function_content {
    padding: 0 25px 25px;
    border-bottom: 0;
    background-color: #fff !important;
}

@media (min-width: 1264px) {
    .container {
        /* max-width: 1185px; */
        max-width: 1080px !important;
    }
}

.grayBg {
    background-color: #F8F8F9;
}

@media (max-width: 576px) {
    .mb-6 {
        margin-bottom: 0 !important;
    }
}

.section2 {
    border: 1px solid #d6d7d8;
}

.border_grey {
    border: 1px solid #d6d7d8;
}

.attachment_table {
    width: 100%;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
</style>