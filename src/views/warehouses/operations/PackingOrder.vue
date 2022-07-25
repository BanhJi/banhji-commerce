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
                                        <h2 class="mb-0">{{ $t('packing_slip') }}</h2>
                                        <v-icon v-if="isHideBar"
                                                onclick="window.history.go(-1); return false;"
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

                                    <v-card outlined dense class="px-3 no_border mb-3" color="grayBg" height="170px">
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{ $t('customer') }}</label>
                                                <v-col sm="12" cols="12"
                                                       class="kendo_dropdown_custom pl-0 pb-3 pt-0">
                                                    <dropdownlist
                                                        :data-items="customerList"
                                                        @change="onChange"
                                                        :value="deliveryOrder.customer"
                                                        :data-item-key="dataItemKey"
                                                        :text-field="textField"
                                                        :default-item="defaultItem"
                                                        :filterable="true"
                                                        @filterchange="onFilterChange">
                                                    </dropdownlist>
                                                </v-col>

                                                <label class="label">{{ $t('segment_location') }}</label>
                                                <v-select class="mt-1"
                                                          :items="segments"
                                                          item-text="name"
                                                          item-value="id"
                                                          v-model="deliveryOrder.segment"
                                                          :rules="[v => !!v || 'Segment Currency is required']"
                                                          return-object
                                                          tage="Segment/ Location"
                                                          outlined/>
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{ $t('date') }}</label>
                                                <app-datepicker :initialDate="deliveryOrder.date"
                                                                @emitDate="deliveryOrder.date = $event"/>


                                                <label class="label">{{ $t('number') }}</label>
                                                <v-row class="mt-1 mr-0">
                                                    <v-col sm="3" cols="3" class="pt-0 pr-0">
                                                        <div class="code_text text-bold">{{ deliveryOrder.abbr }}</div>
                                                    </v-col>
                                                    <v-col sm="7" cols="7" class="pt-0 pl-0 pr-1">
                                                        <v-text-field class=" custom-border "
                                                                      v-model="deliveryOrder.number"
                                                                      outlined
                                                                      disabled
                                                                      :rules="[v => !!v || 'Number is required']"
                                                                      required/>
                                                    </v-col>
                                                    <v-col sm="2" cols="2" class="pt-0 px-0">
                                                        <v-icon color="black" style="background: #fff;" size="30"
                                                                class="border_qrcode"
                                                                @click="generateNumber">mdi-qrcode
                                                        </v-icon>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{ $t('delivery_address') }}</label>
                                                <v-text-field class="mt-1"
                                                              v-model="deliveryOrder.address"
                                                              :rules="[v => !!v || 'Delivery address is required']"
                                                              tage="Delivery Address"
                                                              outlined
                                                />

                                                <label class="label">{{ $t('warehouse') }}</label>
                                                <v-select class="mt-1"
                                                          :items="warehouses"
                                                          item-value="id"
                                                          item-text="name"
                                                          v-model="deliveryOrder.warehouse"
                                                          tage="Warehouse"
                                                          :rules="[v => !!v || 'Warehouse is required']"
                                                          return-object
                                                          outlined
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row color="white">
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <kendo-datasource ref="dataSource"
                                                              :change="dataSourceChange"
                                                              :data="deliveryOrder.itemLines"
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
                                                    :template="rowNumber"
                                                    :title="$t('no.')"
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
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :width="200"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'qty'"
                                                    :title="$t('qty')"
                                                    :width="160"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'uom'"
                                                    :template="UOMTemplate"
                                                    :editor="UOMDropDownEditor"
                                                    :title="$t('uom')"
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
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row>
                                                <v-col sm="5" cols="12" class="py-0">
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
                                                <v-col sm="7" cols="12" class="py-0">
                                                    <v-row>
                                                        <v-col sm="6" cols="12" class="pb-0">
                                                            <label class="label  mb-0">{{ $t('delivered_by') }}</label>
                                                            <v-text-field class="mt-1"
                                                                          :rules="[v => !!v || 'Delivered by is required']"
                                                                          v-model="deliveryOrder.deliveredBy"
                                                                          tage="Delivered by"
                                                                          outlined
                                                            />
                                                            <label
                                                                class="label  mb-0">{{ $t('vehicle_number') }}</label>
                                                            <v-text-field class="mt-1"
                                                                          v-model="deliveryOrder.vehicleNumber"
                                                                          outlined
                                                                          tage="Vehicle Number"
                                                                          :rules="[v => !!v || 'Vehicle Number is required']"
                                                                          required/>
                                                        </v-col>
                                                        <v-col sm="6" cols="12" class="pb-0">
                                                            <label class="label  mb-0">{{ $t('driver_name') }}</label>
                                                            <v-text-field class="mt-1"
                                                                          tage="Driver Name"
                                                                          v-model="deliveryOrder.driverName"
                                                                          :rules="[v => !!v || 'Driver name is required']"
                                                                          return-object
                                                                          outlined
                                                            />
                                                            <label
                                                                class="label  mb-0">{{
                                                                    $t('time_of_discharged')
                                                                }}</label>
                                                            <v-menu
                                                                v-model="menu2"
                                                                :close-on-content-click="false"
                                                                :nudge-right="40"
                                                                ref="menu"
                                                                transition="scale-transition"
                                                                :return-value.sync="deliveryOrder.timeOfDischarged"
                                                                max-width="290">
                                                                <template
                                                                    v-slot:activator="{ on, attrs }">
                                                                    <v-text-field
                                                                        class=" mb-3"
                                                                        v-model="deliveryOrder.timeOfDischarged"
                                                                        readonly
                                                                        outlined
                                                                        append-icon="mdi-clock-time-four-outline"
                                                                        v-on="on"
                                                                        v-bind="attrs"
                                                                        @click:clear="deliveryOrder.timeOfDischarged = null"
                                                                        @click:append="menu2 = true"
                                                                        :rules="[v => !!v || 'Time of discharged is required']"
                                                                        required/>
                                                                </template>
                                                                <v-time-picker
                                                                    v-if="menu2"
                                                                    v-model="deliveryOrder.timeOfDischarged"
                                                                    full-width
                                                                    no-title
                                                                    @click:minute="$refs.menu.save(deliveryOrder.timeOfDischarged)"
                                                                ></v-time-picker>
                                                            </v-menu>
                                                        </v-col>
                                                    </v-row>
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
                                            color="black"
                                            class="text-capitalize  white--text float-left"
                                        >{{ $t("cancel") }}
                                        </v-btn
                                        >
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
                                                    <!--                                                              v-model="deliveryOrder.segment"-->
                                                    <!--                                                              :items="segments"-->
                                                    <!--                                                              item-value="id"-->
                                                    <!--                                                              :item-text="item =>`${item.code} - ${item.name}`"-->
                                                    <!--                                                              return-object-->
                                                    <!--                                                              tage="sub Of"-->
                                                    <!--                                                              placeholder="Sub Of"-->
                                                    <!--                                                              outlined=""/>-->
                                                    <!--                                                    <label class="label mb-0">{{ $t('location') }}</label>-->
                                                    <!--                                                    <v-select class="mt-2"-->
                                                    <!--                                                              v-model="deliveryOrder.location"-->
                                                    <!--                                                              :items="locations"-->
                                                    <!--                                                              item-value="id"-->
                                                    <!--                                                              :item-text="item =>`${item.code} - ${item.name}`"-->
                                                    <!--                                                              return-object-->
                                                    <!--                                                              tage="Location"-->
                                                    <!--                                                              placeholder="bu/location"-->
                                                    <!--                                                              outlined=""/>-->
                                                    <label class="label mb-0 font_14">{{ $t('sale_channel') }}</label>
                                                    <v-select class=" my-2"
                                                              v-model="deliveryOrder.saleChannel"
                                                              :items="saleChannelList"
                                                              item-value="id"
                                                              item-text="name"
                                                              return-object
                                                              tage="Sale Channel"
                                                              placeholder="Channel"
                                                              outlined
                                                    />
                                                    <label class="label">{{ $t("project") }}</label>
                                                    <v-select
                                                        class="mt-1"
                                                        v-model="deliveryOrder.project"
                                                        :items="projects"
                                                        :item-text="item =>`${item.code} - ${item.name}`"
                                                        item-value="id"
                                                        tage="Project"
                                                        outlined
                                                    />
                                                    <label class="label">{{ $t("for_month_of") }}</label>
                                                    <app-monthpicker
                                                        :initMonthOf="deliveryOrder.monthOf"
                                                        @emitMonthOf="deliveryOrder.monthOf = $event"
                                                    />

                                                    <v-row v-for="(invoice, index) in invoices" v-bind:key="invoice.id">
                                                        <label class="text-bold ml-9"
                                                               style="font-size: 12px; width: 100%;">{{ index + 1 }}.
                                                            {{ $t('invoice') }}</label>
                                                        <v-col sm="9" cols="9" class="py-0 pr-0">
                                                            <v-card outlined
                                                                    class="px-3 py-1 text-white no-boxshadow no_border justify-left d-flex"
                                                                    style="background-color: #92d050; height: 30px">
                                                                <!--                                                                <input type="checkbox" class="checkbox_inv float-left"/>-->
                                                                <p class="mb-0" style="width: 100%">
                                                                    <span class="pl-3 float-left">{{
                                                                            invoice.referenceNo
                                                                        }}</span>
                                                                    <span class="float-right">{{
                                                                            invoice.amount.toLocaleString()
                                                                        }}</span>
                                                                </p>
                                                            </v-card>
                                                        </v-col>
                                                        <v-col sm="3" cols="3" class="py-0  pl-1">
                                                            <v-btn
                                                                v-if="invoice.isAdd !== 1"
                                                                @click="addItemLine(invoice)"
                                                                class="text-white text-bold rounded-0 float-right text-uppercase"
                                                                style="height: 30px !important; background-color: rgb(0, 176, 80) !important">
                                                                {{ $t('add') }}
                                                            </v-btn>
                                                            <v-btn
                                                                v-else
                                                                disabled
                                                                class="text-white text-bold pa-0 rounded-0 float-right text-uppercase"
                                                                style="height: 30px !important; background-color: rgb(0, 176, 80) !important">
                                                                {{ $t('added') }}
                                                            </v-btn>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row v-for="(so, index) in saleOrders" v-bind:key="so.id">
                                                        <label class="text-bold ml-9 mt-2" style="font-size: 12px;">{{ index + 1 + invoices.length }}.
                                                            {{ $t('sale_order') }}</label>
                                                        <v-col sm="9" cols="9" class="py-0 pr-0">
                                                            <v-card outlined
                                                                    class="px-3 py-1 text-white no-boxshadow no_border justify-left d-flex"
                                                                    style="background-color: #92d050; height: 30px">
                                                                <input type="checkbox" class="checkbox_inv float-left"/>
                                                                <p class="mb-0" style="width: 100%">
                                                                    <span class="pl-3 float-left">{{ so.referenceNo }}</span>
                                                                    <span class="float-right">{{ so.amount.toLocaleString() }}</span>
                                                                </p>
                                                            </v-card>
                                                        </v-col>
                                                        <v-col sm="3" cols="3" class="py-0  pl-1">
                                                            <v-btn
                                                                class="text-white text-bold rounded-0 float-right text-uppercase"
                                                                style="height: 30px !important; background-color: rgb(0, 176, 80) !important">
                                                                {{ $t('add') }}
                                                            </v-btn>
                                                        </v-col>
                                                    </v-row>

                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>

                                    <p class="mb-0 mt-3 detial_smallside_p font_14" style="margin-top: 20%;">
                                        {{ $t('delivery_order_desc') }}</p>
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
import DeliveryOrder from "@/scripts/model/DeliveryOrder";
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import MonthOfPicker from "@/components/kendo_templates/MonthOfPicker";
import kendo from "@progress/kendo-ui";

const $ = require("jquery")
const deliveryOrderHandler = require("@/scripts/deliveryOrderHandler")
const customerHandler = require("@/scripts/customerHandler")
const productVariantHandler = require("@/scripts/productVariantHandler")
const prefixHandler = require("@/scripts/prefixHandler")
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const settingsHandler = require("@/scripts/settingsHandler")
const saleChannelHandler = require("@/scripts/saleChannelHandler")
const locationHandler = require("@/scripts/locationHandler")
const projectHandler = require("@/scripts/projectHandler")
const warehouseHandler = require("@/scripts/warehouseHandler")
const uomPriceHandler = require("@/scripts/uomPriceHandler")
const saleOrderHandler = require("@/scripts/transactionHandler")
const deliveryOrder = new DeliveryOrder({})
const keyField = 'id'
const textField = 'name'
const emptyItem = {[textField]: 'loading ...'}
export default {
    name: "PackingList",
    components: {
        'LoadingMe': LoadingMe,
        'app-datepicker': DatePickerComponent,
        'dropdownlist': DropDownList,
        "app-monthpicker": MonthOfPicker,
    },
    data: () => ({
        menu2: false,
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

        batchs: [],
        warehouses: [],
        saleChannelList: [],
        projects: [],
        locations: [],
        segments: [],
        itemLines: [],
        customerList: [],
        dataItemKey: 'id',
        textField: 'name',
        defaultItem: {[textField]: 'Select supplier...', [keyField]: null},
        customerBaseUrl: customerHandler.url(),
        filter: '',
        invoices: [],
        saleOrders: [],
        deliveryOrder: deliveryOrder,
    }),
    methods: {
        async addItemLine(data) {
            data.isAdd = 1
            data.itemLines.forEach(i => {
                this.deliveryOrder.itemLines.push({
                    item: i.item,
                    description: i.description,
                    qty: i.qty,
                    uom: i.uom,
                    invoiceId: data.id,
                    type: data.type,
                })
            })
        },
        dataSourceChange(e) {
            if (e.field) {
                let dataRow = e.items[0]
                switch (e.field) {
                    case "item":
                        dataRow.set('description', dataRow.item.description)
                        break
                    default:
                        break
                }
            }
        },
        addRow() {
            let data = {
                item: {name: ''},
                qty: 0,
                description: '',
                uom: {},
            }
            let ds = this.$refs.dataSource.kendoWidget(),
                total = ds.total();
            ds.insert(total, data)
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
        UOMDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "uom.toUOM.name",
                    dataValueField: "uom.toUOM.id",
                    cascadeFrom: "item",
                    template: "<span>#=uom.toUOM.name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: uomPriceHandler.getUrl(options.model.item.id),
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
                return `<span>${uom.uom ? uom.uom.toUOM.name : ``}</span>`
            } else {
                return ``
            }
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
        rowNumber(dataItem) {
            let ds = this.$refs.dataSource.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
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
                                this.deliveryOrder.segment = this.segments[0]
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
                                this.deliveryOrder.location = this.locations[0]
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
                                this.deliveryOrder.saleChannel = this.saleChannelList[0]
                            }
                        } else {
                            this.showLoading = false
                        }
                    })
                }, 300);
            })
        },
        async loadProjects() {
            await projectHandler.list().then(res => {
                this.projects = res.data.data
                if (this.projects.length > 0) {
                    this.deliveryOrder.project = this.projects[0]
                }
            })
        },
        async onloadWarehouse() {
            warehouseHandler.getWarehouseSettingAll().then(res => {
                this.warehouses = res
                if (this.warehouses.length > 0) {
                    this.deliveryOrder.warehouse = this.warehouses[0]
                }
            })
        },
        async onChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.showLoading = true
            window.console.log(value)
            this.deliveryOrder.customer = value
            await billingHandler.byCustomer(this.deliveryOrder.customer.id).then(res => {
                window.console.log('customer invoice', res)
                this.invoices = res.data.data
            })
            let data = {
                "method": "by_customer",
                "customer": this.deliveryOrder.customer.id,
                "type": 'Sale Order',
            }
            await saleOrderHandler.search(data).then(res => {
                window.console.log(res)
                this.saleOrders = res.data.data
            })
            this.showLoading = false
            // await this.onloadPurchase()
        },
        // async onloadPurchase() {
        //     this.showLoading = false
        // },
        onFilterChange(event) {
            const filter = event.filter.value
            this.requestData(0, filter, this.customerBaseUrl)
            this.filter = filter
        },
        requestData(skip, filter, baseUrl) {
            const url = baseUrl + `/${filter}`
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    // window.console.log(response.json())
                    return response.json()
                })
                .then(this.afterFetch)

        },
        afterFetch(json) {
            this.customerList = json.data
        },
        async loadPrefix() {
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    prefixHandler.get('delivery order').then(res => {
                        if (res.data.statusCode === 200) {
                            // this.showLoading = false
                            this.transactionTypes = res.data.data
                            if (this.transactionTypes.length > 0) {
                                this.deliveryOrder.transactionType = this.transactionTypes[0]
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

            this.showLoading = false
        },
        generateNumber() {
            let data = {
                abbr: this.deliveryOrder.transactionType.abbr,
                structure: this.deliveryOrder.transactionType.structure,
                transactionDate: this.deliveryOrder.date,
                sequcencing: this.deliveryOrder.transactionType.sequcencing,
                type: 'Delivery Order',
                entity: 2,
            }
            this.deliveryOrder.abbr = data.abbr
            this.deliveryOrder.structure = data.structure
            this.deliveryOrder.sequcencing = data.sequcencing
            this.deliveryOrder.type = data.type
            this.deliveryOrder.transactionDate = data.transactionDate
            billingHandler.lastNumber(data).then(response => {
                if (response.data.statusCode === 200) {
                    const res = response.data.data
                    const lastNumber = this.zeroPad(parseInt(res.lastNumber), this.deliveryOrder.transactionType.format)
                    this.deliveryOrder.number = res.suffix + this.deliveryOrder.transactionType.numberSeparator + lastNumber
                    this.deliveryOrder.lastNumber = res.suffix + lastNumber
                    window.console.log(this.deliveryOrder.number, 'bom')
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
        savePrint() {

        },
        async getDataSource() {
            let ds = this.$refs.dataSource.kendoWidget()
            let dataRow = ds.data()
            this.itemLines = []
            dataRow.forEach(i => {
                if (i.invoiceId === undefined && i.type === undefined) {
                    i.invoiceId = ''
                    i.type = ''
                }
                this.itemLines.push({
                    id: i.id,
                    item: i.item,
                    qty: i.qty,
                    uom: i.uom,
                    description: i.description,
                    invoiceId: i.invoiceId,
                    type: i.type
                })
            })
            window.console.log(this.itemLines)
        },
        async saveNew() {
            this.showLoading = true
            await this.getDataSource()
            this.deliveryOrder.itemLines = this.itemLines
            deliveryOrderHandler.save(this.deliveryOrder).then(res => {
                window.console.log(res)
                this.showLoading = false
            })
        },
        saveClose() {

        },
        errorMessage() {

        },
        accountDropDownEditor() {
        },
        cancel() {

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
        this.requestData(0, '', customerHandler.url())
        await this.loadPrefix()
    },
};
</script>

<style scoped>
.k-dropdown {
    width: 100%;
    margin-top: 3px;
}

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
    padding: 12px 12px 0 12px;
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
