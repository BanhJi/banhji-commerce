<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">

                <v-row class="">
                    <v-col sm="9" cols="12" class="pt-0">
                        <h2 class="mb-0 font_20">{{ $t('catalog') }}</h2>
                    </v-col>
                    <v-col sm="3" cols="12" class="py-0">
                        <v-btn routes link to="catalog" color="primary"
                               class=" white--text float-right text-capitalize">
                            {{ $t('new_catalog') }}
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row class="">
                    <v-col sm="12" cols="12" class="pb-0">
                        <!-- loading -->
                        <LoadingMe
                            :isLoading="showLoading"
                            :fullPage="false"
                            type="loading"
                            :myLoading="true"/>
                        <kendo-datasource ref="dataSource"
                                          :data="catalogs"
                                          :schema="gridSchema"/>
                        <kendo-grid id="gridCatalogList"
                                    class="grid-function"
                                    :data-source-ref="'dataSource'"
                                    :style="{width: '100%'}"
                                    :noRecords="true"
                                    :toolbar="toolbarTemplate"
                                    :excel-export="excelExport"
                                    :excel-file-name="'CatalogList.xlsx'"
                                    :excel-filterable="true"
                                    :scrollable-virtual="true">
                            <kendo-grid-column
                                :field="'images'"
                                :title="$t('image')"
                                :width="40"
                                :template="loadImage"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            <kendo-grid-column
                                :field="'number'"
                                :title="$t('number')"
                                :width="70"
                                :template="'<span>#=number#</span>'"
                                :groupHeaderColumnTemplate="'#=value#'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            <kendo-grid-column
                                :field="'name'"
                                :attributes="{class:'tb_name_td'}"
                                :title="$t('name')"
                                :width="100"
                                :template="'<span>#=name#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            <kendo-grid-column
                                :field="'publicLink'"
                                :title="$t('public_link')"
                                :width="100"
                                :template="linkToTemplate"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            <kendo-grid-column
                                :field="'description'"
                                :title="$t('description')"
                                :width="100"
                                :template="'<span>#=description#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            <kendo-grid-column
                                :field="''"
                                :title="$t('action')"
                                :width="60"
                                :command="[{ text: $t('edit'), click: goEdit }]"
                                :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                        </kendo-grid>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import kendo from "@progress/kendo-ui";
const $ = kendo.jQuery
const catalogHandler = require("@/scripts/catalogHandler")

import JSZip from "jszip";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
window.JSZip = JSZip;
export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`)
    },
    data: () => ({
        showLoading: false,
        catalogs: [],
        imgURL: 'https://s3-ap-southeast-1.amazonaws.com/images.banhji/',
        gridSchema: {
            model: {
                id: "id"
            }
        }
    }),
    props: {},
    methods: {
        linkToTemplate(data) {
            let url = `production/${data.id}`
            let args = {
                text: 'Link',//data.publicLink,
                url: url,
                data: data,
            }
            return {
                template: LinkTemplate,
                templateArgs: args
            }
        },
        loadImage(dataItem) {
            if (dataItem.hasOwnProperty('images')) {
                if (dataItem.images.hasOwnProperty('default')) {
                    const url = this.imgURL + dataItem.images.default.thumb
                    return "<img width='50' height='50' style= 'margin: auto;display: block;' src='" + url + "' />"
                }
            } else {
                return ''
            }
        },
        goEdit(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridCatalogList").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            this.$router.push({
                path: 'catalog' + `/${dataItem.id}`,
                params: {id: dataItem.id},
                query: {type: 'edit'}
            })
        },
        async loadCatalogs() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    catalogHandler.get().then(res => {
                        this.showLoading = false
                        this.catalogs = res
                    })
                }, 10);
            })
        },
        callback() {
            if (this.$route.params !== null && this.$route.params.hasOwnProperty('data')) {
                const catalog = this.$route.params.data
                let flag = false
                this.catalogs.forEach(function (part, index, item) {
                    if ((item[index].id === catalog.id)) {
                        item[index] = catalog
                        flag = true
                    }
                })
                if (flag === false) {
                    this.catalogs.push(catalog)
                }
                let dataSource = new kendo.data.DataSource({
                    data: this.catalogs
                });
                let grid = $('#gridCatalogList').data("kendoGrid");
                dataSource.read();
                grid.setDataSource(dataSource);
            }
        },
        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log(e.data);
        },
        initToolbar(that) {
            let grid = $("#gridCatalogList").data("kendoGrid");
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
                that.loadCatalogs();
            }

            function onExportExcel(that) {
                that.exportToExcel();
            }
        },
        exportToExcel() {
            const grid = $("#gridCatalogList").data("kendoGrid")
            grid.saveAsExcel()
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
    },
    mounted: async function () {
        await this.loadCatalogs()
        await this.initToolbar(this)
    },
    computed: {},
    watch: {
        // '$route': 'callback'
    },
};
</script>

<style scoped>

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
