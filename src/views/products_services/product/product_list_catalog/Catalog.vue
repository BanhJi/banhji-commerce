<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t("catalog") }}</h2>
                                <v-icon
                                    @click="cancel()"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close
                                </v-icon>
                            </v-card>
                            <v-card outlined dense class="px-3 no_border" color="grayBg">
                                <v-row>
                                    <v-col sm="3" cols="12" class="pb-1 my_checkbox">
                                        <label class="label  mb-0">{{ $t("catalog_name") }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            tage="Catalog Name"
                                            v-model="catalog.name"
                                            :placeholder="$t('name')"
                                            :rules="[(v) => !!v || $t('is_required')]"
                                            outlined
                                        />
                                        <input
                                            id="chkPOS"
                                            type="checkbox"
                                            v-model="catalog.forPOS"
                                        />
                                        <label for="chkPOS">{{ $t("used_in_point_sale") }}</label>
                                    </v-col>
                                    <v-col sm="3" cols="12" class="pb-1 my_checkbox">
                                        <label class="label  mb-0 mt-1" style="">{{
                                                $t("number")
                                            }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            tage="Number"
                                            :rules="[(v) => !!v || $t('is_required')]"
                                            v-model="catalog.number"
                                            outlined
                                        />
                                        <input
                                            id="chkEcommerce"
                                            type="checkbox"
                                            v-model="catalog.forEcommerce"
                                        />
                                        <label for="chkEcommerce">{{ $t("used_in_ecommerce") }}</label>
                                    </v-col>
                                    <v-col sm="3" cols="12" class="pb-0">
                                        <label class="label" style="">{{
                                                $t("price_level")
                                            }}</label>
                                        <div class="d-flex">
                                            <div style="width:50px;" class="code_text mt-1  text-bold">{{ code }}</div>
                                            <v-select class="mt-1 custom-border"
                                                      v-model="catalog.priceLevel"
                                                      :items="priceLevels"
                                                      item-value="id"
                                                      item-text="name"
                                                      return-object
                                                      @change="onPriceLevelChanged"
                                                      outlined/>
                                        </div>
                                    </v-col>
                                    <v-col sm="3" cols="12" class="pb-0">
                                        <label class="label  mb-0 mt-1" style="">{{
                                                $t("description")
                                            }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            tage="Description"
                                            v-model="catalog.description"
                                            outlined
                                        />
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card outlined dense class="no_border mb-1" color="white">
                                <v-row>
                                    <v-col sm="8" cols="12" class="">
                                        <h3 class="mb-3">
                                            {{ $t("product_to_add_into_this_catalog") }}
                                        </h3>
                                        <kendo-datasource ref="catalogItemLineDS" :data="itemList"/>
                                        <kendo-grid
                                            id="gridCatalog"
                                            class="grid-function"
                                            :data-source-ref="'catalogItemLineDS'"
                                            :editable="true"
                                            :scrollable-virtual="true">
                                            <kendo-grid-column
                                                :field="'no'"
                                                :title="$t('no')"
                                                :template="rowNumberTmplL"
                                                :width="45"
                                                :column-menu="false"
                                                :headerAttributes="{ style: 'background-color: #EDF1F5;',  class: 'text-center', }"
                                                :attributes="{ style: 'text-align: center' }"
                                            />
                                            <kendo-grid-column
                                                :field="'item'"
                                                :title="$t('item')"
                                                :width="200"
                                                :template="'<span>#=item.name || ``#</span>'"
                                                :editor="ItemDropDownEditor"
                                                :headerAttributes="{ style: 'background-color: #EDF1F5', }"
                                            />
                                            <kendo-grid-column
                                                :field="'uom'"
                                                :title="$t('uom')"
                                                :width="150"
                                                :template="UOMTemplate"
                                                :editor="UOMDropDownEditor"
                                                :headerAttributes="{ style: 'background-color: #EDF1F5', }"
                                            />
                                            <kendo-grid-column
                                                :field="''"
                                                :title="$t(' ')"
                                                :width="70"
                                                :command="[{ iconClass: 'k-icon k-i-trash', text: ' ', click: removeRowL},]"
                                                :headerAttributes="{ style: 'text-align: right; background-color: #EDF1F5',}"
                                            />
                                        </kendo-grid>
                                        <v-btn
                                            color="primary"
                                            @click="addRowL"
                                            class="float-left rounded-4 btn_plus white--text mt-3">
                                            <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="2" cols="12" class="">
                                        <v-row>
                                            <v-col sm="12" cols="12" class="py-0">
                                                <h3 class="mb-0">{{ $t("default_image") }}</h3>
                                                <v-img width="100px" height="150px" :src="src"/>
                                                <label>
                                                    <input
                                                        type="file"
                                                        name="image"
                                                        id="image"
                                                        class="file_width"
                                                        :rules="fileSizeRules"
                                                        accept=".png, .jpg, .jpeg"
                                                        ref="fileupload"
                                                        @change="onFileChange"
                                                    />
                                                    <!--                                                    <p class="upload_btn mb-0">-->
                                                    <!--                                                        {{ $t("upload_image") }}-->
                                                    <!--                                                    </p>-->
                                                </label>
                                            </v-col>
                                        </v-row>
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
                                    class="float-right  white--text text-capitalize">{{ $t("save_close") }}
                                </v-btn>
                            </v-card>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>
import {i18n} from "@/i18n";
import kendo from "@progress/kendo-ui";
import CatalogModel from "@/scripts/model/Catalog";
import priceLevelHandler from "@/scripts/priceLevelHandler";
import ItemLineModel from "@/scripts/invoice/model/ItemLine";
import {uuid} from "vue-uuid";
import saleFormContentHandler from "@/scripts/saleFormContentHandler";
import uomPriceHandler from "@/scripts/uomPriceHandler";

const catalogHandler = require("@/scripts/catalogHandler");
// const serviceItemHandler = require("@/scripts/serviceItemHandler");
const productVariantHandler = require("@/scripts/productVariantHandler");

const catalogModel = new CatalogModel({});
const $ = kendo.jQuery
const itemLineModel = new ItemLineModel({});
const itemLinePrefix = "lin-";
export default {
    name: "AddCatalog",
    props: ["id"],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        showLoading: false,
        files: [],
        itemList: [],
        serviceList: [],
        services: [],
        variants: [],
        service: {},
        itemLine: itemLineModel,
        valid: true,
        catalog: catalogModel,
        imgFile: "",
        src: "",
        fileSizeRules: [
            (files) =>
                !files ||
                !files.some((file) => file.size > 1024 * 1024) ||
                "Image size should be less than 1 MB!",
        ],
        priceLevels: [],
        priceLevel: {},
        code: '',
        saleFormContent: {}
    }),
    methods: {
        async initData() {
            if (this.$route.params.id !== undefined) {
                await this.loadSingleCatalog();
            } else {
                this.clear();
            }
        },
        clear() {
            this.catalog = {};
            this.variants = [];
            this.services = [];
            this.itemList = [];
            this.serviceList = [];
            this.imgFile = "";
            this.src = "";
        },
        onFileChange(e) {
            // const file = e.target.files[0];
            let input = e.target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                if (input.files[0].size > 1024 * 1024) {
                    e.preventDefault();
                    alert("File too big (> 1MB)");
                    this.src = "";
                    this.imgFile = "";
                    this.$refs.fileupload.value = null;
                } else {
                    // create a new FileReader to read this image and convert to base64 format
                    let reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onloadend = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.imgFile = e.target.result;
                    };
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsBinaryString(input.files[0]);
                    // this.url = input.files[0]
                    this.src = URL.createObjectURL(e.target.files[0]);
                }
            }
        },
        addRowL() {
            let ds = this.$refs.catalogItemLineDS.kendoWidget(),
                total = ds.total();
            this.itemLine.id = itemLinePrefix + uuid.v1();
            this.itemLine.decimalFormat = "n" + this.saleFormContent.decimal;
            this.itemLine.isEditable = true;
            ds.insert(total, this.itemLine);
        },
        // Remove Row
        removeRowL(e) {
            e.preventDefault();
            var grid = kendo.jQuery("#gridCatalog").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        rowNumberTmplL(dataItem) {
            let ds = this.$refs.catalogItemLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        ItemDropDownEditor(container, options) {
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
                                url: productVariantHandler.itemSearchURL('?plId=' + this.catalog.priceLevel.id),
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
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "uom.name",
                    dataValueField: "uom.id",
                    cascadeFrom: "item",
                    template: "<span>#=uom.name || `No Price Level`#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {url: uomPriceHandler.uomPriceByPriceLevelURL("id=" + options.model.item.id + "&plId=" + this.catalog.priceLevel.id + "&date=" + this.catalog.transactionDate + '&nature=purchase'),},
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
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                return;
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    let itemLineDS = this.$refs.catalogItemLineDS.kendoWidget();
                    const dataRow = itemLineDS.data().map((n) => {
                        return new ItemLineModel(n);
                    });
                    let data = {
                        id: this.$route.params.id,
                        name: this.catalog.name,
                        type: 'Catalog',
                        // sku: this.catalog.sku,
                        number: this.catalog.number,
                        description: this.catalog.description,
                        forPOS: this.catalog.forPOS,
                        forEcommerce: this.catalog.forEcommerce,
                        priceLevel: this.catalog.priceLevel,
                        itemLines: dataRow,
                        images: this.catalog.images,
                        file: this.imgFile,
                        status: this.catalog.status || 1,
                        deleted: this.catalog.deleted || 0,
                        publicLink: this.catalog.publicLink || '',
                        actionType: this.$route.params.id ? this.$route.query.type : "new",
                    };
                    this.showLoading = true
                    catalogHandler
                        .create(data)
                        .then((response) => {
                            if (response.data.statusCode === 201) {
                                this.showLoading = false
                                this.$snotify.success("Success");
                                this.close();
                            } else {
                                this.$snotify.error("Something went wrong");
                                this.showLoading = false
                            }
                        })
                });
            });
        },
        cancel() {
            this.$swal({
                title: i18n.t("msg_title_warning"),
                text: i18n.t("msg_discard"),
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: i18n.t("cancel"),
                confirmButtonColor: "#4d4848",
                cancelButtonColor: "#ED1A3A",
                confirmButtonText: i18n.t("discard"),
            }).then((resultCen) => {
                if (resultCen.value) {
                    this.$router.go(-1);
                }
            });
        },
        close() {
            window.history.go(-1)
            // this.$router.push({
            //     name: "products",
            //     params: {
            //         data: data,
            //     },
            // });
        },
        async loadSingleCatalog() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    catalogHandler
                        .getOne(this.$route.params.id)
                        .then((response) => {
                            if (response.data.statusCode === 200) {
                                this.showLoading = false;
                                this.catalog = response.data.data[0];
                                if (this.catalog.hasOwnProperty("itemLines")) {
                                    this.itemList = this.catalog.itemLines;
                                }
                                this.onPriceLevelChanged()
                                this.src = "";
                                if (this.catalog.hasOwnProperty("images")) {
                                    if (this.catalog.images.hasOwnProperty("default")) {
                                        let imgUrl = this.catalog.images.default.bigThumb;
                                        this.src =
                                            "https://s3-ap-southeast-1.amazonaws.com/images.banhji/" +
                                            imgUrl;
                                    }
                                }
                                if (this.$route.query.type === "new") {
                                    this.src = "";
                                }
                            } else {
                                this.$snotify.error("Something went wrong");
                                this.showLoading = false;
                            }
                        })
                });
            });
        },
        onPriceLevelChanged() {
            const pl = this.catalog.priceLevel || {}
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
                            this.catalog.priceLevel = data[0]
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
            const uom = dataItem.uom;
            if (uom) {
                return `<span>${uom.uom ? uom.uom.name : ``}</span>`;
            } else {
                return ``;
            }
        },
    },
    mounted: async function () {
        await this.loadSaleFormContent();
        await this.loadPriceLevel();
        await this.initData();
    },
    watch: {
        id() {
            // this.product = this.selectedProduct
            if (this.$route.params.id !== undefined) {
                this.loadSingleCatalog();
            } else {
                this.clear();
            }
            // window.console.log(this.id, 'watch')
            // if (this.id !== undefined) {
            //
            // } else {
            //     this.clear()
            // }
        },
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
</style>
