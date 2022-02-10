<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <h2 class="mb-0 font_20">{{ $t('sale_unit_categories') }}</h2>
                        <v-dialog v-model="dialogM2" max-width="400px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" class=" text-capitalize white--text float-right" v-on="on"
                                       @click="onNewClick">
                                    {{ $t('create_new') }}
                                </v-btn>
                            </template>
                            <v-card>
                                <div class="modal_header">
                                    <v-card-title>{{ $t('sale_unit_categories') }}</v-card-title>
                                    <v-icon @click="dialogM2 = false">close</v-icon>
                                </div>

                                <v-card-text class="modal_text_content">
                                    <v-form
                                        ref="form"
                                        v-model="valid"
                                        lazy-validation>
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pt-0">
                                                <v-row>
                                                    <v-col sm="6" cols="6" class="pb-0">
                                                        <label class="label">{{ $t('name') }}</label>
                                                        <v-text-field class=" mt-1" v-model="saleUC.name"
                                                                      outlined
                                                                      :rules="[v => !!v || $t('name_is_required'),v => (v && v.length > 2) || $t('character_3')]"
                                                                      required
                                                                      placeholder=""/>
                                                    </v-col>
                                                    <v-col sm="6" cols="6" class="pb-0">
                                                        <label class="label">{{ $t('code') }}</label>
                                                        <v-text-field class="mt-1" v-model="saleUC.code"
                                                                      outlined
                                                                      :rules="[v => !!v || $t('code_is_required'),v => (v && v.length > 2) || $t('character_3')]"
                                                                      required
                                                                      placeholder=""/>
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
                                            <v-btn color="primary" class="px-3  white--text text-capitalize"
                                                   @click="onSaveClose">
                                                {{ $t('save_close') }}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>

                            </v-card>
                        </v-dialog>
                        <p class="mb-0">{{ $t('sale_unit_categories_desc') }} </p>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="12" cols="12">
                        <template>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                type="loading"
                                :myLoading="true"
                            />
                            <kendo-datasource ref="saleUnitCategoryDS"
                                              :data="saleUCs"/>
                            <kendo-grid id="gridSUCategory" class="grid-function"
                                        :data-source-ref="'saleUnitCategoryDS'"
                                        :editable="false"
                                        :toolbar="toolbarTemplate"
                                        :excel-export="excelExport"
                                        :excel-file-name="'SaleUnitCategory.xlsx'"
                                        :excel-filterable="true"
                                        :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'no'"
                                    :title="$t('no')"
                                    :template="rowNumberTmpl"
                                    :column-menu="false"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                                    :attributes="{style: 'text-align: center'}"/>
                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('name')"
                                    :attributes="{class:'tb_name_td'}"
                                    :template="'<span>#=name#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'code'"
                                    :title="$t('code')"
                                    :template="'<span>#=code || ``#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="''"
                                    :title="$t('action')"
                                    :command="[ { iconClass: 'k-icon k-i-edit', text: ' ', click: goEdit, }, ]"
                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5', }"
                                />
                            </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import {i18n} from '@/i18n'

const saleUCHandler = require("@/scripts/saleUCHandler")
const $ = kendo.jQuery

import JSZip from "jszip";
window.JSZip = JSZip;
export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`)
    },
    data: () => ({
        dialogM2: false,
        showLoading: true,
        valid: true,
        snackbar: false,
        textStatus: 'Success',
        color: '#3DA72E',
        timeout: 6000,
        x: 'right',
        y: 'top',
        saleUC: {
            id: '',
            name: '',
            code: ''
        },
        saleUCs: [],
        headers: [
            {
                text: i18n.t('name'),
                align: 'start',
                sortable: false,
                value: 'name',
            },
            {text: i18n.t('description'), value: 'description', sortable: false,},
            {text: i18n.t('account_type'), value: 'account_type', sortable: false, align: ' d-none'},
            {text: i18n.t('account_type'), value: 'account_type.name', sortable: false,},
            {text: i18n.t('action'), value: 'actions', sortable: false},
        ]
    }),
    props: {},
    computed: {},
    watch: {
        dialogM2(val) {
            val || this.close()
        },
    },
    created() {
    },
    methods: {
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.saleUnitCategoryDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
        },
        goEdit(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridSUCategory").data("kendoGrid");
            this.saleUC = grid.dataItem($(e.currentTarget).closest("tr"));
            this.dialogM2 = true;
        },
        onNewClick() {
            this.saleUC.id = ''
            this.clear()
        },
        close() {
            this.dialogM2 = false
        },
        clear() {
            this.saleUC = {}
        },
        async onSaveClose() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        "id": this.saleUC.id,
                        "name": this.saleUC.name,
                        "code": this.saleUC.code
                    }
                    saleUCHandler.create(data).then(response => {
                        if (response.data.statusCode === 201) {
                            this.loadSaleUC()
                            this.clear()
                            this.close()
                            this.$refs.form.reset()
                        }
                    }).catch(e => {
                        this.errors.push(e)
                    })
                }, 10);
            })
        },
        async loadSaleUC() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    saleUCHandler.get().then(res => {
                        this.showLoading = false
                        this.saleUCs = res
                    })
                }, 10);
            })
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
            const grid = $("#gridSUCategory").data("kendoGrid")
            grid.saveAsExcel()
        },
        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log(e.data);
        },
        initToolbar(that) {
            let grid = $("#gridSUCategory").data("kendoGrid");
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
                that.loadSaleUC();
            }

            function onExportExcel(that) {
                that.exportToExcel();
            }
        },
    },
    mounted: async function () {
        await this.loadSaleUC()
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
