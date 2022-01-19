<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('uom_category') }}</h2>
            <v-dialog v-model="dialogm2" max-width="400px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" class=" text-capitalize white--text float-right" v-on="on"
                           @click="onNewClick">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t('uom_category') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-row>
                                <v-col sm="12" cols="12" class="pb-0">
                                    <label class="label">{{ $t('name') }}</label>
                                    <v-text-field class="mt-1"
                                                  outlined
                                                  v-model="name"
                                                  :rules="[v => !!v || $t('name_is_required'),v => (v && v.length > 2) || $t('character_3')]"
                                                  required
                                                  placeholder=""/>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn color="primary" outlined
                                       class=" text-capitalize  black--text float-left"
                                       @click="dialogm2 = false">{{ $t('cancel') }}
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
            <p class="mb-0">{{ $t('uom_category_desc') }} </p>
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    type="loading"
                    :myLoading="true"
                />
                <kendo-datasource ref="uomCatDS" :data="uomCategories"/>
                <kendo-grid
                    id="gridUOMCategory"
                    class="grid-function"
                    :data-source-ref="'uomCatDS'"
                    :editable="false"
                    :resizable="true"
                    :toolbar="toolbarTemplate"
                    :excel-export="excelExport"
                    :excel-file-name="'UOMList.xlsx'"
                    :excel-filterable="true"
                    :scrollable-virtual="true">
                    <kendo-grid-column
                        :field="'no'"
                        :title="$t('no')"
                        :template="rowNumberTmpl"
                        :width="40"
                        :column-menu="false"
                        :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                        :attributes="{style: 'text-align: center'}"/>
                    <kendo-grid-column
                        :field="'name'"
                        :title="$t('name')"
                        :attributes="{ class: 'tb_name_td' }"
                        :width="150"
                        :template="'<span>#=name#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                        :field="''"
                        :title="$t('action')"
                        :width="84"
                        :command="[{ iconClass: 'k-icon k-i-edit', text: ' ', click: goEdit },]"
                        :headerAttributes="{
              style: 'text-align: left; background-color: #EDF1F5',
            }"
                    />
                </kendo-grid>
            </template>
        </v-col>

    </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";

const uomCategoryHandler = require("@/scripts/uomCategoryHandler")
const $ = kendo.jQuery;

import JSZip from "jszip";

window.JSZip = JSZip;
export default {
    components: {LoadingMe: () => import(`@/components/Loading`)},
    data: () => ({
        dialogm2: false,
        showLoading: true,
        isFullpage: false,
        snackbar: false,
        textStatus: 'Success',
        color: '#3DA72E',
        timeout: 6000,
        valid: true,
        x: 'right',
        y: 'top',
        name: '',
        uocId: '',
        uomCategories: [],
        btnDisabled: false
    }),
    props: {},
    computed: {},
    watch: {
        dialogm2(val) {
            val || this.close()
        },
    },
    created() {
    },
    methods: {
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.uomCatDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        goEdit(e) {
            e.preventDefault();
            this.btnDisabled = false
            let grid = kendo.jQuery("#gridUOMCategory").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            this.name = dataItem.name || ''
            this.uocId = dataItem.id || ''
            this.dialogm2 = true
        },
        onNewClick() {
            this.uocId = this.name = ''
            this.btnDisabled = false
            this.clear()
        },
        close() {
            this.dialogm2 = false
        },
        clear() {
            this.name = ''
        },
        async onSaveClose() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    if (this.uocId === '') {
                        let data = {
                            "name": this.name
                        }
                        this.btnDisabled = true
                        this.showLoading = true
                        uomCategoryHandler.create(data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.btnDisabled = false
                                this.showLoading = false
                                this.loadUOC()
                                this.clear()
                                this.close()
                                this.$refs.form.resetValidation()
                            } else {
                                this.btnDisabled = false
                                this.showLoading = false
                            }
                        }).catch(e => {
                            this.btnDisabled = false
                            this.showLoading = false
                            this.errors.push(e)
                        })
                    } else {
                        let data = {
                            "name": this.name
                        }
                        this.btnDisabled = true
                        this.showLoading = true
                        uomCategoryHandler.update(this.uocId, data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.btnDisabled = false
                                this.showLoading = false
                                this.loadUOC()
                                this.clear()
                                this.close()
                                this.$refs.form.reset()
                            } else {
                                this.btnDisabled = false
                                this.showLoading = false
                            }
                        }).catch(e => {
                            this.btnDisabled = false
                            this.showLoading = false
                            this.errors.push(e)
                        })
                    }
                }, 10);
            })
        },
        async loadUOC() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    uomCategoryHandler.get().then(res => {
                        this.showLoading = false
                        this.uomCategories = res
                    })
                }, 10);
            })
        },

        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log(e.data);
        },
        initToolbar(that) {
            let grid = $("#gridUOMCategory").data("kendoGrid");
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
                that.loadUOC();
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
            const grid = $("#gridUOMCategory").data("kendoGrid")
            grid.saveAsExcel()
        },
    },
    mounted: async function () {
        await this.loadUOC()
        await this.initToolbar(this)
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