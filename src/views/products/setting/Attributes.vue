<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t("attributes") }}</h2>
            <v-dialog v-model="dialogM2" max-width="400px">
                <template v-slot:activator="{ on }">
                    <v-btn
                        color="primary"
                        class=" text-capitalize white--text float-right"
                        v-on="on"
                        @click="onNewClick">
                        {{ $t("create_new") }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("attributes") }}</v-card-title>
                        <v-icon class="" @click="dialogM2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="12" cols="12">
                                    <v-row>
                                        <v-col sm="6" cols="6" class="py-0">
                                            <label class="label">{{ $t("name") }}</label>
                                            <v-text-field
                                                class="mt-1"
                                                v-model="attribute.name"
                                                outlined
                                                :rules="[
                          (v) => !!v || $t('name_is_required'),
                          (v) => (v && v.length > 2) || $t('character_3'),
                        ]"
                                                required
                                                placeholder=""
                                            />
                                        </v-col>
                                        <v-col sm="6" cols="6" class="py-0">
                                            <label class="label">{{ $t("code") }}</label>
                                            <v-text-field
                                                class="mt-1"
                                                v-model="attribute.code"
                                                outlined
                                                :rules="[
                          (v) => !!v || $t('code_is_required'),
                          (v) => (v && v.length > 0) || $t('character_3'),
                        ]"
                                                required
                                                placeholder=""
                                            />
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-0">
                                        <v-col sm="12" cols="12" class="py-0">
                                            <label class="label">{{ $t("variants_type") }}</label>
                                            <v-select
                                                :loading="loading"
                                                class="mt-1"
                                                tag="variant type"
                                                v-model="mVarType"
                                                :items="varTypes"
                                                item-value="id"
                                                :item-text="(item) => `${item.code} - ${item.name}`"
                                                :rules="[(v) => !!v || $t('type_is_required')]"
                                                required
                                                return-object
                                                outlined
                                            />
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn
                                    color="black"
                                    outlined
                                    class=" text-capitalize  black--text float-left"
                                    @click="dialogM2 = false"
                                >{{ $t("cancel") }}
                                </v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn
                                    color="primary"
                                    class="px-3  white--text text-capitalize"
                                    :disabled="btnDisabled"
                                    @click="onSaveClose">
                                    {{ $t("save_close") }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <p class="mb-0">{{ $t('attribute_desc') }} </p>
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    type="loading"
                    :myLoading="true"
                />
                <kendo-datasource ref="productAttributeDS" :data="attributes"/>
                <kendo-grid
                    id="gridProductAttribute"
                    class="grid-function"
                    :data-source-ref="'productAttributeDS'"
                    :editable="false"
                    :toolbar="toolbarTemplate"
                    :excel-export="excelExport"
                    :excel-file-name="'ProductAttribute.xlsx'"
                    :excel-filterable="true"
                    :scrollable-virtual="true">
                    <kendo-grid-column
                        :field="'no'"
                        :title="$t('no')"
                        :template="rowNumberTmpl"
                        :width="40"
                        :column-menu="false"
                        :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center', }"
                        :attributes="{ style: 'text-align: center' }"
                    />
                    <kendo-grid-column
                        :field="'type'"
                        :title="$t('variants_type')"
                        :width="50"
                        :template="'<span>#=type.name || ``#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                        :field="'code'"
                        :title="$t('code')"
                        :width="50"
                        :template="'<span>#=code#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                        :field="'name'"
                        :attributes="{ class: 'tb_name_td' }"
                        :title="$t('name')"
                        :width="90"
                        :template="'<span>#=name#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                        :field="''"
                        :title="$t('action')"
                        :width="70"
                        :command="[{ iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit },]"
                        :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5', }"
                    />
                </kendo-grid>
            </template>

        </v-col>
    </v-row>
</template>

<script>
import AttributeModel from "@/scripts/model/Attribute.js";
import kendo from "@progress/kendo-ui";

const varTypeHandler = require("@/scripts/variantTypeHandler");
const attributeHandler = require("@/scripts/attributeHandler");
const attributeModel = new AttributeModel({});

const $ = kendo.jQuery
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        dialogM2: false,
        showLoading: true,
        valid: true,
        attribute: attributeModel,
        varTypes: [],
        attributes: [],
        mVarType: "",
        loading: true,
        btnDisabled: false
    }),
    props: {},
    computed: {},
    watch: {},
    created() {
    },
    methods: {
        goEdit(e) {
            e.preventDefault();
            this.loadVariantType()
            let grid = kendo.jQuery("#gridProductAttribute").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            this.attribute = dataItem;
            this.mVarType = dataItem.type || {};
            this.dialogM2 = true;
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.productAttributeDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        onNewClick() {
            this.btnDisabled = false;
            this.attribute.id = "";
            this.clear();
            this.loadVariantType()
        },
        close() {
            this.dialogM2 = false;
        },
        clear() {
            this.attribute = {};
            this.mVarType = {}
        },
        async onSaveClose() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                return;
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (this.attribute.id === "" || this.attribute.id === undefined) {
                        let data = {
                            name: this.attribute.name,
                            code: this.attribute.code,
                            type: this.mVarType,
                        };
                        this.btnDisabled = true
                        this.showLoading = true
                        attributeHandler
                            .create(data)
                            .then((response) => {
                                if (response.data.statusCode === 201) {
                                    this.btnDisabled = false
                                    this.showLoading = false
                                    this.loadAttributes();
                                    this.clear();
                                    this.close();
                                    this.$refs.form.reset();
                                } else {
                                    this.btnDisabled = false
                                    this.showLoading = false
                                }
                            })
                            .catch((e) => {
                                this.btnDisabled = false
                                this.showLoading = false
                                this.errors.push(e);
                            });
                    } else {
                        let isTypeChanged = 1;
                        if (this.mVarType.id === this.attribute.type.id) {
                            isTypeChanged = 0;
                        }
                        const varTypes = this.mVarType || {}
                        const data = {
                            code: this.attribute.code,
                            name: this.attribute.name,
                            type: {
                                id: varTypes.id || '',
                                name: varTypes.name || '',
                                code: varTypes.code || '',
                            },
                            isTypeChanged: isTypeChanged,
                            delTypeId: this.attribute.type.id,
                        };
                        this.btnDisabled = true
                        this.showLoading = true
                        attributeHandler
                            .update(this.attribute.id, data)
                            .then((response) => {
                                if (response.data.statusCode === 201) {
                                    this.btnDisabled = false
                                    this.showLoading = false
                                    this.loadAttributes();
                                    this.clear();
                                    this.close();
                                    this.$refs.form.reset();
                                } else {
                                    this.btnDisabled = false
                                    this.showLoading = false
                                }
                            })
                            .catch((e) => {
                                this.btnDisabled = false
                                this.showLoading = false
                                this.errors.push(e);
                            });
                    }
                }, 10);
            });
        },
        async loadVariantType() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    varTypeHandler.get().then((res) => {
                        this.showLoading = false;
                        this.varTypes = res;
                        this.loading = false
                    });
                }, 10);
            });
        },
        async loadAttributes() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    attributeHandler.get().then((res) => {
                        this.showLoading = false;
                        this.attributes = res;
                    });
                }, 10);
            });
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
            const grid = $("#gridProductAttribute").data("kendoGrid")
            grid.saveAsExcel()
        },
        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log(e.data);
        },
        initToolbar(that) {
            let grid = $("#gridProductAttribute").data("kendoGrid");
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
                that.loadAttributes();
            }

            function onExportExcel(that) {
                that.exportToExcel();
            }
        },
    },
    mounted: async function () {
        await this.loadVariantType();
        await this.loadAttributes();
        await this.initToolbar(this);
    },
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

.exchange-table.theme--light.v-data-table
> .v-data-table__wrapper
> table
> thead
> tr
> th {
    font-family: "Niradei-Bold", serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table
> .v-data-table__wrapper
> table
> thead
> tr
> td {
    color: #000 !important;
    padding: 5px !important;
}

.exchange-table.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:last-child
td {
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
