<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-row>
                            <v-col class="bigSide py-0" sm="8" cols="12" style="transition: .3s ease-in;"
                                   :class="{'hide_big_bar_class':isHideBar}">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">{{ $t('shelving_order') }}</h2>
                                        <v-icon v-if="isHideBar"
                                                @click="cancel"
                                                style="cursor: pointer; color: #333; font-size: 40px;"
                                                class="float-right"
                                        >close
                                        </v-icon>
                                        <span style="transition: .3s ease-in; z-index:10;"
                                              :class="{'iconArrow': !isHideBar,'iconArrowHide': isHideBar }">
                                            <v-icon size="22"
                                                    class="arr_icon"
                                                    @click="hide_smallsitebar"
                                                    v-if="isHideBar"> mdi-chevron-left-circle
                                            </v-icon>
                                            <v-icon size="22"
                                                    class="arr_icon"
                                                    @click="hide_smallsitebar"
                                                    v-if="!isHideBar"> mdi-chevron-right-circle
                                            </v-icon>
										</span>
                                    </v-card>

                                    <v-card outlined dense class="px-3 no_border mb-3" color="grayBg">
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t('date') }}</label>
                                                <app-datepicker :initialDate="shelvingOrder.date"
                                                                @emitDate="shelvingOrder.date = $event"/>


                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label mb-0">{{ $t('number') }}</label>
                                                <v-row class="mt-1 mr-0">
                                                    <v-col sm="3" cols="3" class="pt-0 pr-0">
                                                        <div class="code_text text-bold">{{ shelvingOrder.abbr }}</div>
                                                    </v-col>
                                                    <v-col sm="7" cols="7" class="pt-0 pl-0 pr-1">
                                                        <v-text-field class=" custom-border "
                                                                      v-model="shelvingOrder.number"
                                                                      outlined
                                                                      disabled
                                                                      :rules="[v => !!v || 'Number is required']"
                                                                      required/>
                                                    </v-col>
                                                    <v-col sm="2" cols="2" class="pt-0 px-0">
                                                        <v-icon color="black" size="30" class="border_qrcode"
                                                                @click="generateNumber">mdi-qrcode
                                                        </v-icon>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t('warehouse') }}</label>
                                                <v-select class="mt-1"
                                                          :items="warehouses"
                                                          item-text="name"
                                                          item-value="id"
                                                          @change="loadZone"
                                                          v-model="shelvingOrder.warehouse"
                                                          :rules="[v => !!v || 'Warehouse is required']"
                                                          return-object
                                                          tage="Warehouse"
                                                          outlined
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row color="white">
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <kendo-datasource ref="dataSource"
                                                              :change="dataSourceChanged"
                                                              :data="shelvingOrder.itemLines"
                                            />
                                            <kendo-grid id="grid" class="grid-function"
                                                        :data-source-ref="'dataSource'"
                                                        :sortable="false"
                                                        :filterable="false"
                                                        :column-menu="true"
                                                        :editable="true"
                                                        :scrollable-virtual="true"
                                            >
                                                <kendo-grid-column
                                                    :title="$t('no.')"
                                                    :template="rowNumber"
                                                    :width="55"
                                                    :column-menu="false"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5;',
                                                                    class: 'text-variants'
                                                                }"
                                                    :attributes="{
                                                                    style: 'text-align: variants'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'item'"
                                                    :title="$t('items')"
                                                    :width="200"
                                                    :template="'<span>#=item.name#</span>'"
                                                    :editor="ItemDropDownEditor"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'qty'"
                                                    :title="$t('qty')"
                                                    :width="200"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'uom'"
                                                    :title="$t('uom')"
                                                    :template="UOMTemplate"
                                                    :editor="UOMDropDownEditor"
                                                    :width="160"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'zone'"
                                                    :title="$t('zone')"
                                                    :template="ZoneTemplate"
                                                    :editor="ZoneDropDownEditor"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :headerAttributes="{
                                                                        style: 'text-align: right; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: right'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'section'"
                                                    :title="$t('section')"
                                                    :template="SectionTemplate"
                                                    :editor="SectionDropDownEditor"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :headerAttributes="{
                                                                        style: 'text-align: right; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: right'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'rack'"
                                                    :title="$t('rack')"
                                                    :template="RackTemplate"
                                                    :editor="RackDropDownEditor"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :headerAttributes="{
                                                                        style: 'text-align: right; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: right'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'level'"
                                                    :title="$t('level')"
                                                    :template="LevelTemplate"
                                                    :editor="LevelDropDownEditor"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :headerAttributes="{
                                                                        style: 'text-align: right; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: right'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'bin'"
                                                    :title="$t('bin_location')"
                                                    :template="BinTemplate"
                                                    :editor="BinDropDownEditor"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :headerAttributes="{
                                                                        style: 'text-align: right; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: right'
                                                                    }"/>

                                                <kendo-grid-column
                                                    :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow, class: 'btn-plus' }"
                                                    :title="'&nbsp;'"
                                                    :width="100"
                                                    :headerAttributes="{
                                                                    style: 'text-align: right; background-color: #EDF1F5'
                                                                }"
                                                />
                                            </kendo-grid>

                                        </v-col>
                                        <v-col cols="12">
                                            <v-btn color="primary" class="float-left rounded-0 white--text mr-2"
                                                   @click="addRow">
                                                <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col sm="12" cols="12">
                                            <v-row>
                                                <v-col sm="5" cols="12" class="pt-0">
                                                    <template>
                                                        <v-file-input class="mt-0 pt-0 " sm="3" cols="6"
                                                                      v-model="files"
                                                                      :placeholder="$t('attachment')"
                                                                      multiple
                                                                      prepend-icon="mdi-paperclip"
                                                        >
                                                            <template v-slot:selection="{ text }">
                                                                <v-chip
                                                                    small
                                                                    label
                                                                    color="primary"
                                                                >
                                                                    {{ text }}
                                                                </v-chip>
                                                            </template>
                                                        </v-file-input>
                                                    </template>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-divider/>
                                    <v-card outlined dense class="no_border function_footer">
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                    color="black"
                                                    outlined
                                                    class="mr-2 text-capitalize  black--text float-left"
                                                    v-on="on"
                                                >
                                                    {{ $t("select_template") }}
                                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item
                                                    v-for="(item, index) in templates"
                                                    :key="index"
                                                >
                                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <v-btn
                                            @click="cancel"
                                            color="black"
                                            class="text-capitalize  white--text float-left"
                                        >{{ $t("cancel") }}
                                        </v-btn>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                    color="primary"
                                                    class="ml-2 float-right text-capitalize  white--text"
                                                    v-on="on"
                                                >
                                                    {{ $t("save_option") }}
                                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list rounded>
                                                <v-list-item-group>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title>
                                                                {{ $t("save_new") }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title
                                                            >{{ $t("save_print") }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list-item-group>
                                            </v-list>
                                        </v-menu>
                                        <v-btn
                                            @click="saveNew"
                                            color="primary"
                                            class="float-right white--text text-capitalize "
                                        >
                                            {{ $t("save_draft") }}
                                        </v-btn>
                                    </v-card>
                                </v-form>
                            </v-col>
                            <v-col class="smallSide" sm="4" style="transition: .3s ease-in;"
                                   :class="{'hide_small_bar_class':isHideBar}">
                                <h3 style="color: #b3b5bc; font-size:20px;" v-if="!isHideBar"
                                    class="text-uppercase float-right mt-n3">Help
                                    <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right mt-n1"
                                    >close
                                    </v-icon>
                                </h3>

                                <v-card outlined dense v-if="!isHideBar" class="small_sidebar mt-9 no_border"
                                        color="grayBg">
                                    <v-row>
                                        <v-col sm="12" cols="12">
                                            <h4 class="mb-2 text-uppercase">{{ $t('analysis') }}</h4>
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pt-1">
<!--                                                    <label class="label mb-0">{{ $t('segment') }}</label>-->
<!--                                                    <v-select class="mt-2"-->
<!--                                                              v-model="shelvingOrder.segment"-->
<!--                                                              :items="segments"-->
<!--                                                              item-value="id"-->
<!--                                                              :item-text="item =>`${item.code} - ${item.name}`"-->
<!--                                                              return-object-->
<!--                                                              tage="sub Of"-->
<!--                                                              placeholder="Sub Of"-->
<!--                                                              outlined=""/>-->
                                                    <label class="label mb-0">{{ $t('location') }}</label>
                                                    <v-select class="mt-2"
                                                              v-model="shelvingOrder.location"
                                                              :items="locations"
                                                              item-value="id"
                                                              :item-text="item =>`${item.code} - ${item.name}`"
                                                              return-object
                                                              tage="Location"
                                                              placeholder="bu/location"
                                                              outlined=""/>
                                                    <label class="label mb-0 font_14">{{ $t('sale_channel') }}</label>
                                                    <v-select class=" my-2"
                                                              v-model="shelvingOrder.saleChannel"
                                                              :items="saleChannelList"
                                                              item-value="id"
                                                              item-text="name"
                                                              return-object
                                                              tage="Sale Channel"
                                                              placeholder="Channel"
                                                              outlined
                                                    />
<!--                                                    <label class="label">{{ $t("project") }}</label>-->
<!--                                                    <v-select-->
<!--                                                        class="mt-1"-->
<!--                                                        v-model="shelvingOrder.project"-->
<!--                                                        :items="projects"-->
<!--                                                        :item-text="item =>`${item.code} - ${item.name}`"-->
<!--                                                        item-value="id"-->
<!--                                                        tage="Project"-->
<!--                                                        outlined-->
<!--                                                    />-->
                                                    <label class="label">{{ $t("for_month_of") }}</label>
                                                    <app-monthpicker
                                                        :initMonthOf="shelvingOrder.monthOf"
                                                        @emitMonthOf="shelvingOrder.monthOf = $event"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>

                                    <p class="mb-0 detial_smallside_p font_14" style="margin-top: 20%;">
                                        {{ $t('shelving_order_desc') }}</p>
                                </v-card>
                            </v-col>
                        </v-row>

                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"
                :alertMessage="loadingAlert"
                :color="loadingColorAlert"
                :alertText="loadingTextAlert"/>
        </v-container>
    </v-app>
</template>

<script>
// import kendo from '@progress/kendo-ui'
import LoadingMe from '@/components/Loading'
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import ShelvingOrder from "@/scripts/model/ShelvingOrder";
import kendo from "@progress/kendo-ui";
import MonthOfPicker from "@/components/kendo_templates/MonthOfPicker";
const $ = require("jquery")
const prefixHandler = require("@/scripts/prefixHandler")
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const settingsHandler = require("@/scripts/settingsHandler")
const saleChannelHandler = require("@/scripts/saleChannelHandler")
const warehouseHandler = require("@/scripts/warehouseHandler")
const locationHandler = require("@/scripts/locationHandler")
const projectHandler = require("@/scripts/projectHandler")
const uomConversionHandler = require("@/scripts/uomConversionHandler")
const productVariantHandler = require("@/scripts/productVariantHandler")
const shelvingOrderHandler = require("@/scripts/shelvingOrderHandler")
const shelvingOrder = new ShelvingOrder({})

export default {
    name: "ShelvingOrder",
    components: {
        'LoadingMe': LoadingMe,
        'app-datepicker': DatePickerComponent,
        "app-monthpicker": MonthOfPicker,
    },
    data: () => ({
        isEdit: false,
        // LoadingMe
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        bill_date: '',
        alert: false,
        deposite: 1000,
        files: [],
        // Form validation
        valid: true,

        journal_types: [],
        suppliers_item: [],
        expense: [
            'Equal',
            'weighted'
        ],
        journal_date: "",
        templates: [
            {title: 'Draft'},
            {title: 'Open'},
            {title: 'Partially Closed'},
            {title: 'Closed'},
        ],
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,
        suppliers: ["Suppliers", "Customer", "Employee"],
        transaction: [
            {
                id: "12",
                name: "Purchase Order",
                no: "No.0024",
                price: "2,50000",
            },
            {
                id: "14",
                name: "Godd Recipt Note",
                no: "No.0024",
                price: "2,50000",
            }
        ],
        item_suppliers: [
            {
                name: "Subtotal",
                value: "10000.00"
            },
            {
                name: "Subtotal",
                value: "10000.00"
            },
            {
                name: "Subtotal",
                value: "10000.00"
            },
            {
                name: "Subtotal",
                value: "10000.00"
            },
            {
                name: "Subtotal",
                value: "10000.00"
            },
        ],

        saleChannelList: [],
        projects: [],
        locations: [],
        segments: [],
        zones: [],
        racks: [],
        bins: [],
        levels: [],
        sections: [],
        warehouses: [],
        bin: {},
        itemLines: [],
        itemWarehouse: [],
        shelvingOrder: shelvingOrder
    }),
    methods: {
        dataSourceChanged(e) {
            if (e.field) {
                let dataRow = e.items[0]
                switch (e.field) {
                    // case "uom":
                    //     // window.console.log(dataRow.uom,'row-uom')
                    //     dataRow.set('cost', parseFloat(dataRow.uom.price))
                    //     window.console.log(dataRow.yield_qty)
                    //     if (dataRow.yield_qty !== undefined) {
                    //         dataRow.set('cost', parseFloat(dataRow.uom.price) * parseFloat(dataRow.yield_qty))
                    //         this.costFP = dataRow.cost
                    //     }
                    //     break
                    case "item":
                        this.itemWarehouse.forEach(i => {
                            if (dataRow.item.id === i.id) {
                                dataRow.set('zone', i.zone)
                                dataRow.set('section', i.section)
                                dataRow.set('rack', i.rack)
                                dataRow.set('level', i.level)
                                dataRow.set('bin', i.bin)
                                dataRow.set('qty', i.qty)
                            }
                        })

                        break
                    case "zone":
                        this.loadSection(dataRow.zone)
                        if (dataRow.zone.id !== undefined || dataRow.section.id !== undefined || dataRow.rack.id !== undefined || dataRow.level.id !== undefined) {
                            this.loadBin(dataRow)
                            dataRow.set('bin', this.bin)
                        }
                        window.console.log("--", dataRow)
                        break
                    case "section":
                        this.loadRack(dataRow.section)
                        if (dataRow.zone.id !== undefined || dataRow.section.id !== undefined || dataRow.rack.id !== undefined || dataRow.level.id !== undefined) {
                            this.loadBin(dataRow)
                            dataRow.set('bin', this.bin)
                        }
                        window.console.log("--", dataRow)
                        break
                    case "rack":
                        this.loadLevel(dataRow.rack)
                        if (dataRow.zone.id !== undefined || dataRow.section.id !== undefined || dataRow.rack.id !== undefined || dataRow.level.id !== undefined) {
                            this.loadBin(dataRow)
                            dataRow.set('bin', this.bin)
                        }
                        window.console.log("--", dataRow)
                        break
                    case "level":
                        if (dataRow.zone.id !== undefined || dataRow.section.id !== undefined || dataRow.rack.id !== undefined || dataRow.level.id !== undefined) {
                            this.loadBin(dataRow)
                            window.console.log(this.bin)
                            dataRow.set('bin', this.bin)
                        }
                        break
                    default:
                        break
                }
                if (e.field) {
                    // this.autoCalculate()
                }
            }
        },
        rowNumber(dataItem) {
            let ds = this.$refs.dataSource.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        UOMDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "toUOM.name",
                    dataValueField: "toUOM.id",
                    cascadeFrom: "item",
                    template: "<span>#=toUOM.name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: uomConversionHandler.getUrl(options.model.item.id),
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
                                }
                            },
                            data: function (response) {
                                return response.data
                            },
                            total: function (response) {
                                return response.data.count
                            }
                        },
                        // data: this.variants
                    }),
                })
        },
        UOMTemplate(dataItem) {
            const uom = dataItem.uom
            if (uom) {
                return `<span>${uom.toUOM ? uom.toUOM.name : ``}</span>`
            } else {
                return ``
            }
        },
        BinDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "id",
                    cascadeFrom: "item",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.bins,
                    })
                })
        },
        BinTemplate(dataItem) {
            const bin = dataItem.bin
            if (bin) {
                return `<span>${bin.name ? bin.name : ``}</span>`
            } else {
                return ``
            }
        },
        RackDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "id",
                    cascadeFrom: "item",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.racks,
                    })
                })
        },
        RackTemplate(dataItem) {
            const rack = dataItem.rack
            if (rack) {
                return `<span>${rack.name ? rack.name : ``}</span>`
            } else {
                return ``
            }
        },
        LevelDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "id",
                    cascadeFrom: "item",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.levels,
                    })
                })
        },
        LevelTemplate(dataItem) {
            const level = dataItem.level
            if (level) {
                return `<span>${level.name ? level.name : ``}</span>`
            } else {
                return ``
            }
        },
        ZoneDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "id",
                    cascadeFrom: "item",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.zones,
                    })
                })
        },
        ZoneTemplate(dataItem) {
            const zone = dataItem.zone
            if (zone) {
                return `<span>${zone.name ? zone.name : ``}</span>`
            } else {
                return ``
            }
        },
        SectionTemplate(dataItem) {
            const section = dataItem.section
            if (section) {
                return `<span>${section.name ? section.name : ``}</span>`
            } else {
                return ``
            }
        },
        SectionDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "id",
                    cascadeFrom: "item",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.sections,
                    })
                })
        },
        ItemDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "id",
                    headerTemplate: '<div class="dropdown-header k-widget k-header">' +
                        '<span>Items </span>' +
                        '<span></span>' +
                        '</div>',
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: productVariantHandler.itemSearchURL(),
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
                                }
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            }
                        },
                        // data: this.variants
                    }),
                })
        },
        addRow() {
            let data = {
                item: {name: ''},
                qty: 0,
                uom: {},
                section: {name: ''},
                rack: {name: ''},
                level: {name: ''},
                zone: {name: ''},
                bin: {name: ''}
            }
            let ds = this.$refs.dataSource.kendoWidget(),
                total = ds.total();
            ds.insert(total, data)
        },
        async loadSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segments = []
                    settingsHandler.getSeg().then(res => {
                        if (res.data.statusCode === 200) {
                            this.segments = res.data.data
                            if (this.segments.length > 0) {
                                this.shelvingOrder.segment = this.segments[0]
                            }
                            // this.segmentList = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async loadLocation() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.locations = []
                    locationHandler.list().then(res => {
                        if (res.data.statusCode === 200) {
                            this.locations = res.data.data
                            if (this.locations.length > 0) {
                                this.shelvingOrder.location = this.locations[0]
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async loadSaleChannel() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    saleChannelHandler.get().then(res => {
                        if (res.data.statusCode === 200) {
                            this.saleChannelList = res.data.data
                            if (this.saleChannelList.length > 0) {
                                this.shelvingOrder.saleChannel = this.saleChannelList[0]
                            }
                        } else {
                            this.showLoading = false
                        }
                    })
                }, 300);
            })
        },
        async loadZone() {
            warehouseHandler.getZonAll().then(res => {
                if (res) {
                    res.forEach(i => {
                        if (i.wh.id === this.shelvingOrder.warehouse.id) {
                            this.zones.push(i)
                        }
                    })
                    // this.zones = res
                    // this.zoneList = res
                }
            })
        },
        async loadProjects() {
            await projectHandler.list().then(res => {
                this.projects = res.data.data
                if (this.projects.length > 0) {
                    this.shelvingOrder.project = this.projects[0]
                }
            })
        },
        async onloadWarehouse() {
            await warehouseHandler.getWarehouseSettingAll().then(async res => {
                this.warehouses = res
                if (this.warehouses.length > 0) {
                    this.shelvingOrder.warehouse = this.warehouses[0]
                    await this.loadZone()
                }
            })
        },

        async loadSection(data) {
            await warehouseHandler.getSectionSettingAll().then(res => {
                if (res) {
                    res.forEach(i => {
                        if (i.hasOwnProperty('zone')) {
                            if (i.zone.id === data.id) {
                                this.sections.push(i)
                            }
                        }
                    })
                    // this.sections = res
                }
            })
        },
        async loadRack(data) {
            await warehouseHandler.getRackSettingAll().then(res => {
                if (res) {
                    res.forEach(i => {
                        if (i.hasOwnProperty('section')) {
                            if (i.section.id === data.id) {
                                this.racks.push(i)
                            }
                        }
                    })
                    // this.racks = res
                }
            })
        },
        async loadLevel(data) {
            await warehouseHandler.getLevelSettingAll().then(res => {
                if (res) {
                    res.forEach(i => {
                        if (i.hasOwnProperty('rack')) {
                            if (i.rack.id === data.id) {
                                this.levels.push(i)
                            }
                        }
                    })
                    // this.levels = res
                    // this.levels = res
                }
            })
        },
        async loadBin(data) {
            window.console.log(data, 'data')
            await warehouseHandler.getBin().then(res => {
                res.forEach(i => {
                    window.console.log(i.rack.id === data.rack.id, i.section.id === data.section.id, i.level.id === data.level.id)
                    if (i.rack.id === data.rack.id && i.section.id === data.section.id && i.level.id === data.level.id) {
                        this.bin = i
                        // window.console.log(i,'bin')
                    }
                })
                this.bins = res
            })
        },
        async loadItemWarehouse() {
            await warehouseHandler.getItem().then(res => {
                this.itemWarehouse = res
                window.console.log(this.itemWarehouse)
            })
        },
        async loadPrefix() {
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    prefixHandler.get('shelving order').then(res => {
                        if (res.data.statusCode === 200) {
                            // this.showLoading = false
                            this.transactionTypes = res.data.data
                            if (this.transactionTypes.length > 0) {
                                this.shelvingOrder.transactionType = this.transactionTypes[0]
                                if (this.$route.params.id === undefined) {
                                    this.generateNumber()
                                }
                            }
                        }

                    })
                }, 300);
            })
            await this.onloadWarehouse()
            await this.loadSaleChannel()
            await this.loadLocation()
            await this.loadProjects()
            await this.loadSegment()
            await this.loadItemWarehouse()
            // await this.loadBin()
            this.showLoading = false
        },
        generateNumber() {
            let data = {
                abbr: this.shelvingOrder.transactionType.abbr,
                structure: this.shelvingOrder.transactionType.structure,
                transactionDate: this.shelvingOrder.date,
                sequcencing: this.shelvingOrder.transactionType.sequcencing,
                type: 'Shelving Order',
                entity: 2,
            }
            this.shelvingOrder.abbr = data.abbr
            this.shelvingOrder.structure = data.structure
            this.shelvingOrder.sequcencing = data.sequcencing
            this.shelvingOrder.type = data.type
            this.shelvingOrder.transactionDate = data.transactionDate
            billingHandler.lastNumber(data).then(response => {
                if (response.data.statusCode === 200) {
                    const res = response.data.data
                    const lastNumber = this.zeroPad(parseInt(res.lastNumber), this.shelvingOrder.transactionType.format)
                    this.shelvingOrder.number = res.suffix + this.shelvingOrder.transactionType.numberSeparator + lastNumber
                    this.shelvingOrder.lastNumber = res.suffix + lastNumber
                    window.console.log(this.shelvingOrder.number, 'bom')
                }
            }).catch(e => {
                this.errors.push(e)
            })
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        suffix(transactionDate) {
            return kendo.toString(new Date(transactionDate), `yymm`)
        },

        async getDataSource() {
            let ds = this.$refs.dataSource.kendoWidget()
            let dataRow = ds.data()
            this.itemLines = []

            dataRow.forEach(i => {
                window.console.log(i, 'item')
                this.itemLines.push({
                    id: i.id,
                    item: i.item,
                    qty: i.qty,
                    uom: i.uom,
                    section: i.section,
                    rack: i.rack,
                    level: i.level,
                    zone: i.zone,
                    bin: i.bin,
                })
            })
        },
        savePrint() {

        },
        async saveNew() {
            this.showLoading = true
            await this.getDataSource()
            let item = this.itemLines
            let items = []
            for (let i = 0; i < item.length; i++) {
                item[i]['item'].qty = item[i]['qty']
                item[i]['item'].section = item[i]['section']
                item[i]['item'].rack = item[i]['rack']
                item[i]['item'].level = item[i]['level']
                item[i]['item'].zone = item[i]['zone']
                item[i]['item'].bin = item[i]['bin']
                item[i]['item'].warehouse = this.shelvingOrder.warehouse
                items.push(item[i]['item'])
            }
            await warehouseHandler.saveItem(items).then(res => {
                window.console.log(res)
            })
            this.shelvingOrder.itemLines = this.itemLines
            shelvingOrderHandler.save(this.shelvingOrder).then(res => {
                window.console.log(res)
                this.showLoading = false
                this.cancel()
            })
        },
        saveClose() {

        },
        removeRow(e) {
            e.preventDefault();
            const grid = kendo.jQuery("#grid").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        errorMessage() {

        },
        accountDropDownEditor() {
        },
        cancel() {
            window.history.go(-1)
            this.shelvingOrder = shelvingOrder
        },
        hide_smallsitebar() {
            if (!this.isHideBar) {
                // this.col_expand = 12
                // this.col_hide = 0
                this.isHideBar = true
            } else {
                // this.col_expand = 9
                // this.col_hide = 3
                this.isHideBar = false
            }
        }
    },
    watch: {
        // call again the method if the route changes

    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        // this.loadObj()
    },
    async mounted() {
        await this.loadPrefix()
    },
};
</script>

<style scoped>
.function_wrapper {
    box-shadow: none !important;
}

.v-application--is-ltr .v-text-field .v-input__append-inner {
    margin-top: 0 !important;
}

.v-input__slot {
    background-color: #fff !important;
}

.function_content .label {
    margin-bottom: 10px;
    display: inline-block;
}

.border_radius10 {
    border-radius: 10px !important;
    background-color: #F2F2F2;
}

.pa-3.v-card h4 {
    font-size: 18px;
    color: #333;
}

.pa-3.v-card p {
    font-size: 12px;
    color: #B5B5B5;
}

.custom_grid table th:last-child {
    text-align: right !important;
}

.color_green {
    color: #03b154;
}

@media (min-width: 1264px) {
    .container {
        max-width: 1250px;
    }
}

@media (max-width: 576px) {
    .pt-6.col-sm-5.col-12 {
        padding-top: 0 !important;
    }

    .code_text {
        width: 100%;
    }

    .phone_no_pt {
        padding-top: 0 !important;
    }

    .select_template,
    .save_option {
        margin-bottom: 10px;
    }
}

.hide_small_bar_class {
    max-width: 0;
    transition: .5s ease-in;
    flex: 0 0 0;
}

.hide_big_bar_class {
    max-width: 100%;
    transition: .5s ease-in;
    flex: 0 0 100%;
}

.info_add {
    background-color: #ffffff;
}

.small_sidebar {
    height: 96%;
    position: relative;
    padding: 12px;
    background-color: #EDF1F5;
}

.iconArrow {
    right: -35px;
    position: absolute;
    bottom: -10px;
}

.iconArrowHide {
    position: absolute;
    right: -7px;
    bottom: -10px;
}

.color_grey {
    color: #808080;
}

.card_green {
    min-height: 70px;
    background-color: #00b050 !important;
    color: #ffffff;
}

.lb_bold {
    font-size: 12px;
}

.detial_smallside_p {
    position: absolute;
    bottom: 10px;
}

.card_background {
    background-color: #EDF1F5;
    min-height: 120px;
}

.deposite_input {
    width: 100px;
}

.btn_save_draft {
    color: #ffffff;
    background-color: #00b0f0 !important;
    text-transform: capitalize;
}

.save_option {
    background-color: #203864 !important;
}

.btn_add_small {
    height: 27px !important;
    min-width: 25px !important;
    font-size: 10px;
    padding: 0 22px !important;
    background-color: #00b050 !important;
    color: #ffffff;
    border-radius: 0 !important;
}

.list_site_inv {
    background-color: #92d050;
    color: #ffffff;
    font-size: 12px;
}

.list_site_exp {
    background-color: #c5e0b4;
    color: #000000;
    font-size: 12px;
    line-height: 16px;
    min-height: 40px;
}

.checkbox_inv {
    padding: 2px;
    margin-top: 3px;
    margin-right: 2px;
}

.exp_select {
    font-size: 12px !important;
}

.v-data-table__wrapper td {
    border-bottom: 1px solid #808080;
    border-top: 1px solid #808080;
}

</style>
