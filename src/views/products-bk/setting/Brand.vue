<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t("brand") }}</h2>
            <v-dialog v-model="dialogM2" max-width="450px">
                <template v-slot:activator="{ on }">
                    <v-btn
                        color="primary"
                        class=" text-capitalize white--text float-right"
                        v-on="on"
                        @click="onNewClick"
                    >
                        {{ $t("create_new") }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("brand") }}</v-card-title>
                        <v-icon class="" @click="dialogM2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="12" cols="12" class="py-0">
                                    <v-row>
                                        <v-col sm="4" cols="4">
                                            <label class="label">{{ $t("name") }}</label>
                                            <v-text-field
                                                class="mt-1"
                                                v-model="brand.name"
                                                tag="brand.name"
                                                outlined
                                                :rules="[
                          (v) => !!v || $t('name_is_required'),
                          (v) => (v && v.length > 2) || $t('character_3'),
                        ]"
                                                required
                                                placeholder=""
                                            />
                                        </v-col>
                                        <v-col sm="4" cols="4" class="pb-0">
                                            <label class="label">{{ $t("code") }}</label>
                                            <v-text-field
                                                class="mt-1"
                                                v-model="brand.code"
                                                tag="brand.code"
                                                outlined
                                                :rules="[
                          (v) => !!v || $t('code_is_required'),
                          (v) => (v && v.length > 2) || $t('character_3'),
                        ]"
                                                required
                                                placeholder=""
                                            />
                                        </v-col>
                                        <v-col sm="4" cols="4" class="pb-0">
                                            <label class="label">{{ $t("abbr") }}</label>
                                            <v-text-field
                                                class="mt-1"
                                                v-model="brand.abbr"
                                                tag="brand.abbr"
                                                outlined
                                                :rules="[(v) => !!v || $t('abbr_is_required')]"
                                                required
                                                placeholder=""
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
            <p class="mb-0">{{ $t("brand_desc") }}</p>
        </v-col>

        <v-col sm="12" cols="12">
            <template>
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    type="loading"
                    :myLoading="true"
                />
                <kendo-datasource ref="productBrandDS" :data="brands"/>
                <kendo-grid
                    id="gridProductBrand"
                    class="grid-function"
                    :data-source-ref="'productBrandDS'"
                    :editable="false"
                    :toolbar="toolbarTemplate"
                    :excel-export="excelExport"
                    :excel-file-name="'BrandList.xlsx'"
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
                        :field="'abbr'"
                        :title="$t('abbr')"
                        :width="50"
                        :template="'<span>#=abbr || ``#</span>'"
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
import kendo from "@progress/kendo-ui";

const brandHandler = require("@/scripts/brandHandler");

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
        brand: {
            id: "",
            name: "",
            code: "",
            abbr: "",
        },
        brands: [],
        option: 1,
        btnDisabled: false
    }),
    props: {},
    computed: {},
    watch: {
        dialogm2(val) {
            val || this.close();
        },
    },
    created() {
    },
    methods: {
        goEdit(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridProductBrand").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            this.brand = dataItem;
            this.dialogM2 = true;
        },
        onNewClick() {
            this.btnDisabled = false
            this.brand.id = "";
            this.clear();
        },
        close() {
            this.dialogM2 = false;
        },
        clear() {
            this.brand = {};
        },
        async onSaveClose() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                return;
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (this.brand.id === "" || this.brand.id === undefined) {
                        let data = {
                            name: this.brand.name,
                            code: this.brand.code,
                            abbr: this.brand.abbr,
                        };
                        this.showLoading = true
                        this.btnDisabled = true
                        brandHandler
                            .create(data)
                            .then((response) => {
                                if (response.data.statusCode === 201) {
                                    this.showLoading = false
                                    this.btnDisabled = false
                                    this.loadBrand();
                                    this.clear();
                                    this.close();
                                    this.$refs.form.reset();
                                } else {
                                    this.showLoading = false
                                    this.btnDisabled = false
                                }
                            })
                            .catch((e) => {
                                this.showLoading = false
                                this.btnDisabled = false
                                this.errors.push(e);
                            });
                    } else {
                        let data = {
                            name: this.brand.name,
                            code: this.brand.code,
                            abbr: this.brand.abbr,
                        };
                        brandHandler
                            .update(this.brand.id, data)
                            .then((response) => {
                                if (response.data.statusCode === 201) {
                                    this.loadBrand();
                                    this.clear();
                                    this.close();
                                    this.$refs.form.reset();
                                }
                            })
                            .catch((e) => {
                                this.errors.push(e);
                            });
                    }
                }, 10);
            });
        },
        async loadBrand() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true
                    brandHandler.get().then((res) => {
                        this.showLoading = false;
                        this.brands = res;
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
            const grid = $("#gridProductBrand").data("kendoGrid")
            grid.saveAsExcel()
        },
        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log(e.data);
        },
        initToolbar(that) {
            let grid = $("#gridProductBrand").data("kendoGrid");
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
                that.loadBrand();
            }

            function onExportExcel(that) {
                that.exportToExcel();
            }
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.productBrandDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
    },
    mounted: async function () {
        await this.loadBrand();
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
