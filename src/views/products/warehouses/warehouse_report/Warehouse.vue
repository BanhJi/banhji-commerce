<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-3">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <!-- loading -->
                <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true"/>
                <v-row class="">
                    <v-col sm="12" cols="12" class="pt-1">
                        <v-dialog v-model="dialogm2" max-width="400px">
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    color="primary"
                                    @click="getWht"
                                    v-if="plan > 1"
                                    class="white--text text-capitalize  float-right"
                                    v-on="on"
                                >
                                    {{ $t("create_new") }}
                                </v-btn>
                            </template>
                            <v-card>
                                <div class="modal_header">
                                    <v-card-title>{{ $t("warehouse") }}</v-card-title>
                                    <v-icon @click="onClose">close</v-icon>
                                </div>
                                <v-card-text class="modal_text_content">
                                    <v-row>
                                        <v-col sm="6" cols="6" class="pb-0">
                                            <label class="label">{{ $t("name") }}</label>
                                            <v-text-field
                                                class=" mt-1"
                                                v-model="wh.name"
                                                outlined
                                                :rules="[(v) => !!v || 'Name is required']"
                                                placeholder=""
                                            />
                                        </v-col>
                                        <v-col sm="6" cols="6" class="pb-0">
                                            <label class="label">{{ $t("code") }}</label>
                                            <v-text-field
                                                class="mt-1"
                                                v-model="wh.code"
                                                outlined
                                                :rules="[(v) => !!v || 'Code is required']"
                                                placeholder=""
                                            />
                                        </v-col>
                                        <v-col sm="12" cols="12" class="py-0">
                                            <label class="label">{{ $t("warehouse_type") }}</label>
                                            <v-select
                                                class="mt-1"
                                                id="acc_type_selector"
                                                :items="whTypes"
                                                v-model="wh.typeId"
                                                item-text="name"
                                                item-value="id"
                                                outlined
                                            />
                                            <label class="label">{{ $t("address") }}</label>
                                            <v-text-field
                                                class="mt-1"
                                                v-model="wh.address"
                                                outlined
                                                placeholder=""
                                            />
                                            <label class="label">
                                                {{ $t("segment") }}<v-icon size="18" color="red" @click="loadSegment">refresh</v-icon
                                            >
                                            </label>
                                            <v-select
                                                class=" mt-1"
                                                :items="segments"
                                                v-model="wh.segmentId"
                                                item-text="name"
                                                item-value="id"
                                                outlined
                                            />
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                <v-card-actions class="modal_footer">
                                    <v-row>
                                        <v-col sm="6" cols="6" class="py-0 text-left">
                                            <v-btn
                                                color="black"
                                                outlined
                                                class=" text-capitalize  black--text float-left"
                                                @click="dialogm2 = false"
                                            >{{ $t("cancel") }}
                                            </v-btn>
                                        </v-col>
                                        <v-col sm="6" cols="6" class="py-0 text-right">
                                            <v-btn
                                                @click="addWhSetting"
                                                color="primary"
                                                class="px-3  white--text text-capitalize"
                                            >{{ $t("save_close") }}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
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
                            <kendo-datasource
                                :data="warehouses"
                                ref="gridCollectionDS"
                            />
                            <kendo-grid
                                id="gridWarehouse"
                                class="grid-function"
                                :data-source-ref="'gridCollectionDS'"
                                :editable="false"
                                :toolbar="toolbarTemplate"
                                :excel-export="excelExport"
                                :excel-file-name="'Warehouse.xlsx'"
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
                                    :field="'code'"
                                    :title="$t('code')"
                                    :width="100"
                                    :template="'<span>#=code#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('name')"
                                    :width="100"
                                    :template="'<span>#=name#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'typeId'"
                                    :title="$t('type')"
                                    :template="typeTmpl"
                                    :width="100"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'address'"
                                    :title="$t('address')"
                                    :width="100"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'segmentId'"
                                    :title="$t('segment')"
                                    :template="segmentTmpl"
                                    :width="100"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'action'"
                                    :title="$t('action')"
                                    :width="100"
                                    :command="{  
                                    text: textReview,
                                    click: onEdit, class: 'btn-plus' }"
                                    :attributes="{style: 'text-align: center'}"
                                    :headerAttributes="{style: 'text-align: center; background-color: #EDF1F5'}"
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
const $ = kendo.jQuery
import {i18n} from "@/i18n";
import LoadingMe from "@/components/Loading";
import JSZip from "jszip";

window.JSZip = JSZip;

/* Cookie */
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
import WarehouseModel from "@/scripts/warehouse/model/Warehouse"
const warehouseHandler = require("@/scripts/warehouseHandler");
const settingsHandler = require("@/scripts/settingsHandler")
export default {
    name: "Cash",
    components: {
        LoadingMe,
    },
    data: () => ({
        warehouses: [],
        showLoading: false,
        wh: new WarehouseModel({}),
        whTypes: [
            {
                "id": "wht-0833a2a1-ec60-11ec-9075-97f88415bcc2",
                "name": "Vendor Location",
                "isSystem": 1
            },
            {
                "id": "wht-0833a2a2-ec60-11ec-9075-97f88415bcc2",
                "name": "Virtual Location",
                "isSystem": 1
            },
            {
                "id": "wht-0833a2a3-ec60-11ec-9075-97f88415bcc2",
                "name": "Internal Location",
                "isSystem": 1
            },
            {
                "id": "wht-0833a2a4-ec60-11ec-9075-97f88415bcc2",
                "name": "Customer Location",
                "isSystem": 1
            },
            {
                "id": "wht-0833a2a5-ec60-11ec-9075-97f88415bcc2",
                "name": "Transit Location",
                "isSystem": 1
            },
            {
                "id": "wht-0833a2a6-ec60-11ec-9075-97f88415bcc2",
                "name": "Production Location",
                "isSystem": 1
            },
            {
                "id": "wht-0833a2a7-ec60-11ec-9075-97f88415bcc2",
                "name": "Consignment",
                "isSystem": 1
            }
        ],
        dialogm2: false,
        segments: [],
        loggedUser: {
            id: cookie.creator,
            name: cookie.email
        },
    }),
    methods: {
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridCollectionDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        typeTmpl(dataItem) {
            let gen = ''
            let t = this.whTypes.filter((m) => { return m.id == dataItem.typeId})
            if(t.length > 0){
                gen = t[0].name
            }
            return gen
        },
        segmentTmpl(dataItem) {
            let gen = ''
            let t = this.segments.filter((m) => { return m.id == dataItem.segmentId})
            if(t.length > 0){
                gen = t[0].name
            }
            return gen
        },
        onClose() {
            this.dialogm2 = false
            this.onClear()
        },
        onEdit(e) {
            e.preventDefault();
            const grid = $("#gridWarehouse").data("kendoGrid"),
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            window.console.log(dataItem)
            this.wh = new WarehouseModel(dataItem)
            this.wh.id = dataItem.pk
            this.dialogm2 = true
        },
        onClear() {
            this.wh = new WarehouseModel({});
            if(this.whTypes.length > 0){
                this.wh.typeId = this.whTypes[0].id
            }
            if(this.segments.length > 0){
                this.wh.segmentId = this.segments[0].id
            }
        },
        async addWhSetting() {
            this.showLoading = true
            this.wh.user = this.loggedUser
            warehouseHandler.saveWarehouseSetting(new WarehouseModel(this.wh)).then(() => {
                this.dialogm2 = false;
                this.showLoading = false;
                this.loadWarehouses();
                this.$swal({
                    position: 'products',
                    icon: 'success',
                    title: i18n.t('your_work_has_been_saved'),
                    showConfirmButton: true,
                    confirmButtonColor: '#4d4848',
                    cancelButtonColor: '#ED1A3A',
                    confirmButtonText: i18n.t('ok')
                })
            })
        },
        async getWht() {
            this.onClear();
        },
        async loadWarehouses() {
            this.warehouse = []
            this.showLoading = true
            await warehouseHandler.getWarehouseSettingAll().then((res) => {
                this.showLoading = false;
                window.console.log(res, 'gets warehouse')
                this.warehouses = res;
            });
        },
        excelExport: function (e) {
            // const pivot = this.$refs.gridTransactionDS.kendoWidget()
            // pivot.saveAsExcel()
            window.console.log(e.data);
        },
        initToolbar(that) {
            let grid = $("#gridWarehouse").data("kendoGrid");
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
                that.loadWarehouses();
            }

            function onExportExcel(that) {
                that.exportToExcel();
            }
        },
        exportToExcel() {
            const grid = $("#gridWarehouse").data("kendoGrid")
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
        loadSegment(){
            this.showLoading = true;
            settingsHandler.getSeg().then((res) => {
                this.showLoading = false;
                if (res.data.statusCode === 200) {
                  this.segments = res.data.data;
                }
            })
        }
    },
    async mounted() {
        await this.loadSegment()
        await this.loadWarehouses()
        await this.initToolbar(this)
    },
    computed: {
        plan() {
            return cookie.plan;
        },
        headers() {
            return [
                {text: i18n.t("date"), value: "journal_date"},
                {text: i18n.t("type"), value: "journal_type"},
                {text: i18n.t("number"), value: "journal_number"},
                {text: i18n.t("description"), value: "description"},
                {text: i18n.t("debit"), value: "dr"},
                {text: i18n.t("credit"), value: "cr"},
            ];
        },
        textReview(){
            return i18n.t('edit')
        }
    },
};
</script>
<style scoped>
.purchases {
    position: relative;
    width: 100%;
    background-color: #fff;
    padding: 20px 20px 5px;
}

.report_filter {
    background-color: #edf1f5;
    padding: 0 20px 0px 20px;
}

.report_block .v-card.third {
    background-color: #00b050;
    border: none;
    box-shadow: none;
    color: #ffffff;
    float: left;
    width: 100%;
}

.report_block .v-card.third p.text {
    text-align: left;
    font-size: 17px;
}

.report_block .v-card.third p.number {
    text-align: center;
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 0;
}

.dv_mt {
    margin-top: 20px;
}

.report_block .left_card p:nth-child(2) {
    width: 100%;
    font-size: 19px;
    font-family: "Niradei-Bold", serif;
    padding: 7px 0 0 0;
    text-align: right;
}

.attachment_table table tr th {
    height: 55px !important;
}

@media (max-width: 576px) {
    .dv_mt,
    .dv_mt8 {
        margin-top: 0;
    }

    .purchases {
        margin-top: 0;
    }
}
</style>
