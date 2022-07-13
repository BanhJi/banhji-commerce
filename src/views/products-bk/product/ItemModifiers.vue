<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-row>
                <v-col sm="10">
                    <h2 class="mb-0 font_22">{{ $t("item_modifier") }}</h2>
                    <p class="mb-0">{{ $t("item_modifier_desc") }}</p>
                </v-col>
                <v-col sm="2">
                    <v-btn
                        to="item-modifier"
                        class="white--text float-right text-capitalize"
                        color="primary"
                    >
                        {{ $t("new_modifier") }}
                    </v-btn>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12">
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        type="loading"
                        :myLoading="true"
                    />
                    <template>
                        <kendo-datasource ref="gridItemModifierDS" :data="itemModifiers"/>
                        <kendo-grid
                            id="gridItemModifier"
                            class="grid-function"
                            :data-source-ref="'gridItemModifierDS'"
                            :editable="false"
                            :toolbar="toolbarTemplate"
                            :excel-export="excelExport"
                            :excel-file-name="'itemModifierList.xlsx'"
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
                                :field="'name'"
                                :attributes="{ class: 'tb_name_td' }"
                                :title="$t('name')"
                                :width="200"
                                :template="'<span>#=name#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                            />
                            <!--              <kendo-grid-column-->
                            <!--                :field="'uom'"-->
                            <!--                :title="$t('uom')"-->
                            <!--                :width="60"-->
                            <!--                :template="'<span>#= uom?uom.name:``#</span>'"-->
                            <!--                :headerAttributes="{ style: 'background-color: #EDF1F5' }"-->
                            <!--              />-->
                            <kendo-grid-column
                                :field="'price'"
                                :title="$t('price')"
                                :width="100"
                                :template="'<span>#=price#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                            />
                            <kendo-grid-column
                                :field="'category'"
                                :title="$t('category')"
                                :width="100"
                                :template="'<span>#=category.name?category.name:``#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                            />
                            <kendo-grid-column
                                :field="'group'"
                                :title="$t('group')"
                                :width="100"
                                :template="'<span>#=group.name?group.name:``#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                            />
                            <!--              <kendo-grid-column-->
                            <!--                :field="'item'"-->
                            <!--                :title="$t('item')"-->
                            <!--                :width="100"-->
                            <!--                :template="itemTemplate"-->
                            <!--                :headerAttributes="{ style: 'background-color: #EDF1F5' }"-->
                            <!--              />-->
                            <kendo-grid-column
                                :field="''"
                                :title="$t(' ')"
                                :width="70"
                                :command="[
                  { iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit },
                ]"
                                :headerAttributes="{
                  style: 'text-align: right; background-color: #EDF1F5',
                }"
                            />
                        </kendo-grid>
                    </template>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
// import kendo from "@progress/kendo-ui";

import kendo from "@progress/kendo-ui";

const $ = kendo.jQuery
const itemModifierHandler = require("@/scripts/itemModifierHandler");
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        showLoading: false,
        dialogM3: false,
        itemModifiers: [],
        schemaDefinition: {
            model: {
                id: "id",
            },
        },
    }),
    props: {},
    methods: {
        itemTemplate(dataItem) {
            window.console.log(dataItem);
            if (dataItem.hasOwnProperty("item")) {
                if (dataItem.item.length > 0) {
                    return `<span>${dataItem.item[0].item.name}</span>`;
                } else {
                    return "";
                }
            } else {
                return "";
            }
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridItemModifierDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        goEdit(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridItemModifier").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            this.$router.push({
                path: "item-modifier" + `/${dataItem.id}`,
                params: {id: dataItem.id},
                query: {type: "edit"},
            });
        },
        async loadItemModifiers() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    itemModifierHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.itemModifiers = res.data.data;
                        } else {
                            this.showLoading = false;
                        }
                    });
                }, 10);
            });
        },
        callback() {
            if (
                this.$route.params !== null &&
                this.$route.params.hasOwnProperty("data")
            ) {
                const modifier = this.$route.params.data;
                // let flag = false

                const index = this.itemModifiers.findIndex((item) => {
                    return item.id === modifier.id;
                });
                if (index < 0) {
                    this.itemModifiers.push(modifier);
                } else {
                    this.itemModifiers.splice(index, 1, modifier);
                }
                // this.itemModifiers.forEach(function (part, index, item) {
                //     if ((item[index].id === modifier.id)) {
                //         item[index] = modifier
                //         flag = true
                //     }
                //     item[index]['no'] = index++
                // })
                // window.console.log(this.projectList)
                // if (flag === false) {
                //     this.itemModifiers.push(modifier)
                // }
                // let dataSource = new kendo.data.DataSource({
                //     data: this.itemModifiers
                // });
                // let grid = $('#gridItemModifier').data("kendoGrid");
                // grid.setDataSource(dataSource)
            }
        },
        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log(e.data);
        },
        initToolbar(that) {
            let grid = $("#gridItemModifier").data("kendoGrid");
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
                that.loadItemModifiers();
            }

            function onExportExcel(that) {
                that.exportToExcel();
            }
        },
        exportToExcel() {
            const grid = $("#gridItemModifier").data("kendoGrid")
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
        await this.loadItemModifiers();
        await this.initToolbar(this);
    },
    created: async function () {
    },
    computed: {},
    watch: {
        $route: "callback",
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
