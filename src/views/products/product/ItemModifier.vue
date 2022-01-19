<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white"
                    >
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t("modifier") }}</h2>
                                <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close
                                </v-icon>
                            </v-card>
                            <v-card outlined dense class="pa-3 pb-0 no_border" color="grayBg">
                                <v-row>
                                    <v-col sm="4" cols="12" class="py-0">
                                        <label class="label ">{{ $t("name") }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            tage="Catalog Name"
                                            v-model="itemModifier.name"
                                            :rules="[(v) => !!v || $t('is_required')]"
                                            :placeholder="$t('name')"
                                            outlined
                                        />
                                    </v-col>
                                    <v-col sm="4" cols="12" class="py-0">
                                        <label class="label " style="">{{
                                                $t("price_level")
                                            }}</label>
                                        <div class="d-flex">
                                            <div style="width:50px;" class="code_text mt-1  text-bold">{{ code }}</div>
                                            <v-select class="mt-1 custom-border"
                                                      v-model="itemModifier.priceLevel"
                                                      :items="priceLevels"
                                                      item-value="id"
                                                      item-text="name"
                                                      return-object
                                                      @change="onPriceLevelChanged"
                                                      outlined/>
                                        </div>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="py-0">
                                        <label class="label " style="">{{ $t("price") }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            tage="Number"
                                            type="Number"
                                            min="0"
                                            :rules="[(v) => !!v || $t('is_required')]"
                                            v-model="itemModifier.price"
                                            outlined
                                        />
                                    </v-col>
                                    <!--
                                                      <v-col sm="4" cols="12" class="py-0">
                                                        <label class="label  mb-0 mt-1" style="">{{
                                                          $t("uom")
                                                        }}</label>
                                                        <v-select
                                                          class="mt-1"
                                                          outlined
                                                          tage="UOM"
                                                          v-model="itemModifier.uom"
                                                          :items="uom"
                                                          item-value="id"
                                                          item-text="name"
                                                          return-object
                                                          clearable
                                                        />
                                                      </v-col> -->
                                    <v-col sm="4" cols="12" class="pt-0 kendo_dropdown_custom">
                                        <label class="label" style="">{{ $t("category") }}</label>
                                        <product-category-dropdownlist
                                            :initCategory="category"
                                            :initModel="itemModifier.category"
                                            @onChange="onCategoryChanged"
                                        />
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pt-0 kendo_dropdown_custom">
                                        <label class="label" style="">{{ $t("group") }}</label>
                                        <product-group-dropdownlist
                                            :initProductGroup="group"
                                            :initModel="itemModifier.group"
                                            @onChange="onGroupChanged"
                                        />
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card outlined dense class="no_border my-3" color="white">
                                <v-row>
                                    <v-col sm="12" cols="12" class="py-0">
                                        <h3 class="mb-3">
                                            {{ $t("item_to_be_add") }}
                                        </h3>
                                        <kendo-datasource ref="itemModifierDS" :data="itemModifierList"/>
                                        <kendo-grid
                                            id="gridItemModifier"
                                            class="grid-function"
                                            :data-source-ref="'itemModifierDS'"
                                            :editable="true"
                                            :scrollable-virtual="true">
                                            <kendo-grid-column
                                                :field="'no'"
                                                :title="$t('no')"
                                                :template="rowNumberTmplL"
                                                :width="45"
                                                :column-menu="false"
                                                :headerAttributes="{
                          style: 'background-color: #EDF1F5;',
                          class: 'text-center',
                        }"
                                                :attributes="{ style: 'text-align: center' }"
                                            />
                                            <kendo-grid-column
                                                :field="'item'"
                                                :title="$t('item')"
                                                :width="150"
                                                :template="'<span>#=item.name || ``#</span>'"
                                                :editor="ItemDropDownEditor"
                                                :headerAttributes="{
                          style: 'background-color: #EDF1F5',
                        }"
                                            />
                                            <kendo-grid-column
                                                :field="'uom'"
                                                :title="$t('uom')"
                                                :width="150"
                                                :template="UOMTemplate"
                                                :editor="UOMDropDownEditor"
                                                :headerAttributes="{
                          style: 'background-color: #EDF1F5',
                        }"
                                            />
                                            <kendo-grid-column
                                                :field="''"
                                                :title="$t(' ')"
                                                :width="70"
                                                :command="[{ iconClass: 'k-icon k-i-trash', text: ' ', click: removeRow},]"
                                                :headerAttributes="{ style: 'text-align: right; background-color: #EDF1F5',}"
                                            />
                                            <!--                                                    <kendo-grid-column-->
                                            <!--                                                        :field="''"-->
                                            <!--                                                        :title="$t('action')"-->
                                            <!--                                                        :width="70"-->
                                            <!--                                                        :command="[{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRowL }]"-->
                                            <!--                                                        :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>-->
                                        </kendo-grid>

                                        <v-btn
                                            color="primary"
                                            @click="addRowL"
                                            class="float-left btn_plus rounded-4 white--text mt-1"
                                        >
                                            <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider/>
                            <v-card outlined dense class="no_border function_footer">
                                <v-btn
                                    @click="cancel"
                                    color="black"
                                    outlined
                                    class="text-capitalize  black--text float-left"
                                >{{ $t("cancel") }}
                                </v-btn>

                                <v-btn
                                    @click="onSaveClose"
                                    color="primary"
                                    class="float-right  white--text text-capitalize"
                                >{{ $t("save_close") }}
                                </v-btn>
                            </v-card>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true" type="loading"/>
        </v-container>
    </v-app>
</template>

<script>
import kendo from "@progress/kendo-ui";
import ItemModifierModel from "@/scripts/model/ItemModifier";
import priceLevelHandler from "@/scripts/priceLevelHandler";
import CategoryModel from "@/scripts/model/Categories";
import GroupModel from "@/scripts/model/ProductGroup";
import {uuid} from "vue-uuid";
import saleFormContentHandler from "@/scripts/saleFormContentHandler";
import ItemLineModel from "@/scripts/invoice/model/ItemLine";
import uomPriceHandler from "@/scripts/uomPriceHandler";

const itemModifierModel = new ItemModifierModel({});
const uomHandler = require("@/scripts/uomHandler");
const itemModifierHandler = require("@/scripts/itemModifierHandler");
const categoryHandler = require("@/scripts/categoryHandler");
const groupHandler = require("@/scripts/groupHandler");
const productVariantHandler = require("@/scripts/productVariantHandler");
const $ = kendo.jQuery
const itemLinePrefix = "lin-";
const itemLineModel = new ItemLineModel({});
export default {
    name: "AddCatalog",
    props: ["id"],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "product-category-dropdownlist": () => import("@/components/dropdownlist/ProductCategoryDropDownList"),
        "product-group-dropdownlist": () => import("@/components/dropdownlist/ProductGroupDropDownList"),
    },
    data: () => ({
        showLoading: false,
        itemModifierList: [],
        customers: [],
        categories: [],
        groups: [],
        uom: [],
        customer: {},
        supplier: {},
        item: {},
        valid: true,
        itemModifier: itemModifierModel,
        category: new CategoryModel({}),
        group: new GroupModel({}),
        code: '',
        priceLevels: [],
        saleFormContent: {},
        itemLine: itemLineModel
    }),
    methods: {
        removeRowL(e) {
            e.preventDefault();
            var grid = kendo.jQuery("#gridItemModifier").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        onCategoryChanged(value) {
            this.category = value
            this.itemModifier.category = value
            window.console.log('category', value)
        },
        onGroupChanged(value) {
            this.group = value
            this.itemModifier.group = value
            window.console.log('group', value)
        },
        async loadGroup() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    groupHandler.get().then((res) => {
                        this.showLoading = false;
                        this.groups = res;
                    });
                }, 10);
            });
        },
        // async onCategoryChanged() {
        //     new Promise((resolve) => {
        //         setTimeout(() => {
        //             resolve("resolved");
        //             if (this.itemModifier.hasOwnProperty("category")) {
        //                 if (this.itemModifier.category) {
        //                     this.group = this.groups.filter(
        //                         (m) => m.category.id === this.itemModifier.category.id
        //                     );
        //                     if (this.group.length > 0) {
        //                         this.itemModifier.group = this.group[0];
        //                     }
        //                 }
        //             }
        //         }, 10);
        //     });
        // },
        async loadCategory() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    categoryHandler.get().then((res) => {
                        this.showLoading = false;
                        this.categories = res;
                        if (this.categories.length > 0) {
                            this.itemModifier.category = this.categories[0];
                        }
                    });
                }, 10);
            });
        },
        async loadUOM() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    uomHandler.get().then((res) => {
                        this.showLoading = false;
                        this.uom = res;
                        if (this.uom.length > 0) {
                            this.mSaleUOM = this.uom[0];
                            this.mPurchaseUOM = this.uom[0];
                        }
                    });
                }, 10);
            });
        },
        async initData() {
            if (this.$route.params.id !== undefined) {
                await this.loadSingleModifier();
            } else {
                this.clear();
            }
        },
        clear() {
            this.itemModifier = {};
            this.itemModifierList = [];
        },
        addRowL() {
            let ds = this.$refs.itemModifierDS.kendoWidget(),
                total = ds.total();
            this.itemLine.id = itemLinePrefix + uuid.v1();
            this.itemLine.decimalFormat = "n" + this.saleFormContent.decimal;
            this.itemLine.isEditable = true;
            ds.insert(total, this.itemLine);
        },
        // Remove Row
        removeRow(e) {
            e.preventDefault();
            var grid = kendo.jQuery("#gridItemModifier").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        rowNumberTmplL(dataItem) {
            let ds = this.$refs.itemModifierDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        ItemDropDownEditor(container, options) {
            const priceLevel = this.itemModifier.priceLevel || {}
            const plId = priceLevel.id || ''
            kendo
                .jQuery('<input  name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "id",
                    headerTemplate:
                        '<div class="dropdown-header k-widget k-header">' +
                        "<span>Items </span>" +
                        "</div>",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                // url: productVariantHandler.searchURL(),
                                url: productVariantHandler.itemSearchURL('?plId=' + plId),
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
                                },
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            },
                        },
                        // data: this.variants
                    }),
                });
        },
        UOMDropDownEditor(container, options) {
            const item = options.model.item || {}
            const priceLevel = this.itemModifier.priceLevel || {}
            const itemId = item.id || ''
            const plId = priceLevel.id || ''
            const date = new Date().toJSON()
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "code",
                    dataValueField: "uomConvertId",
                    cascadeFrom: "item",
                    template: "<span>#=code || `No Price Level`#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: uomPriceHandler.uomPriceByPriceLevelURL("id=" + itemId + "&plId=" + plId + "&date=" + date + '&nature=purchase')
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
                                },
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            },
                        },
                        // data: this.variants
                    }),
                });
        },
        async onSaveClose() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    let itemDS = this.$refs.itemModifierDS.kendoWidget();
                    const dataRow = itemDS.data().map((n) => {
                        return new ItemLineModel(n);
                    });
                    let data = {
                        id: this.$route.params.id,
                        name: this.itemModifier.name,
                        uom: this.itemModifier.uom,
                        price: this.itemModifier.price,
                        priceLevel: this.itemModifier.priceLevel || {},
                        category: this.itemModifier.category,
                        group: this.itemModifier.group,
                        status: this.itemModifier.status || 1,
                        deleted: this.itemModifier.deleted || 0,
                        itemLines: dataRow,
                        type: 'Item Modifier',
                        actionType: this.$route.params.id ? this.$route.query.type : "new",
                    };
                    itemModifierHandler
                        .create(data)
                        .then((response) => {
                            if (response.data.statusCode === 201) {
                                this.$snotify.success("Success");
                                this.close();
                            }
                        })
                        .catch((e) => {
                            this.$snotify.error("Something went wrong");
                            this.errors.push(e);
                        });
                });
            });
        },
        cancel() {
            window.history.go(-1);
        },
        close() {
            window.history.go(-1)
            // this.clear()
            // this.$router.push({
            //     name: "Products Services",
            //     params: {
            //         data: data,
            //     },
            // });
        },
        async loadSingleModifier() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true
                    itemModifierHandler
                        .get(this.$route.params.id)
                        .then((response) => {
                            if (response.data.statusCode === 200) {
                                this.showLoading = false
                                this.itemModifier = response.data.data[0];
                                this.itemModifierList = this.itemModifier.itemLines || []
                                this.group = this.itemModifier.group || {}
                                this.category = this.itemModifier.category || {}
                                // this.itemModifier.category = this.category
                                this.onCategoryChanged(this.category)
                                this.onPriceLevelChanged()
                            } else {
                                this.$snotify.error("Something went wrong");
                                this.showLoading = false
                            }
                        })
                });
            });
        },
        onPriceLevelChanged() {
            const pl = this.itemModifier.priceLevel || {}
            const currency = pl.currency || {}
            this.code = currency.code || ''
        },
        async loadPriceLevel() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const strFilter = '?nature=sale'
                    priceLevelHandler.get(strFilter).then(res => {
                        const data = res || []
                        this.priceLevels = data//.filter(n => n.type.name === 'Standard')
                        if (data.length > 0 && this.$route.params.id === undefined) {
                            this.itemModifier.priceLevel = data[0]
                            this.onPriceLevelChanged()
                        }
                    })

                }, 10)
            })
        },
        async loadSaleFormContent() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    saleFormContentHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data;
                            if (data.length > 0) {
                                this.saleFormContent = data[0];
                            }
                        }
                    });
                }, 10);
            });
        },
        UOMTemplate(dataItem) {
            const uom = dataItem.uom || {}
            const code = uom.code || ''
            if (uom) {
                return `<span>${uom.uom ? code : ``}</span>`;
            } else {
                return ``;
            }
        },
    },
    mounted: async function () {
        await this.initData();
        // await this.loadUOM();
        await this.loadPriceLevel();
        // await this.loadCategory();
        // await this.loadGroup();
        await this.loadSaleFormContent();
    },
    watch: {
        // id() {
        //     // this.product = this.selectedProduct
        //     window.console.log(this.id, "watch");
        //     if (this.$route.params.id === undefined) {
        //         this.clear();
        //     } else {
        //         this.loadSingleModifier();
        //     }
        //     // if (this.id !== undefined) {
        //     //     this.loadSingleModifier()
        //     // } else {
        //     //     this.clear()
        //     // }
        // },
    },
};
</script>

<style scoped>
.dropdown-header {
    border-width: 0 0 1px 0;
    text-transform: uppercase;
}

.dropdown-header > span {
    display: inline-block;
    padding: 10px;
}

.dropdown-header > span:first-child {
    width: 50px;
}

.k-list-container > .k-footer {
    padding: 10px;
}

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
    background-color: #f8f8f9;
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

.my_radio [type="radio"] + label {
    position: relative;
    padding: 6px;
    grid-template-columns: 15% 80% !important;
    display: grid;
}

.upload_btn {
    padding: 10px 6px;
    text-align: center;
    color: white;
    margin-top: 15px;
    margin-bottom: none !important;
    border-radius: 22px;
    background: #92d050;
}

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.grid-function table th {
    padding: 10.5px 17px !important;
}
</style>
