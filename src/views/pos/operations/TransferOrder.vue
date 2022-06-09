<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white"
                    >
                        <v-row>
                            <v-col
                                class="bigSide py-0"
                                sm="12"
                                cols="12"
                                style="transition: .3s ease-in;"
                                :class="{ hide_big_bar_class: isHideBar }"
                            >
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">{{ $t("transfer_order") }}</h2>
                                        <v-icon
                                            @click="cancel"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                    </v-card>
                                    <v-card
                                        outlined
                                        dense
                                        class="px-4 rounded-4 no_border mb-3"
                                        color="grayBg"
                                    >
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t("date") }}</label>
                                                <app-datepicker
                                                    :initialDate="transferOrder.date"
                                                    @emitDate="transferOrder.date = $event"
                                                />
                                                <label class="label  mb-0">{{
                                                        $t("from_warehouse")
                                                    }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    :items="fWarehouses"
                                                    item-text="name"
                                                    item-value="id"
                                                    @change="onChangeFromWarehouse"
                                                    v-model="transferOrder.fWarehouse"
                                                    :rules="[(v) => !!v || 'Warehouse is required']"
                                                    return-object
                                                    tage="Warehouse"
                                                    outlined
                                                />
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label mb-0">{{ $t("number") }}</label>
                                                <div class="mt-1 d-flex mr-0">
                                                    <div class="code_text flex-1 text-bold">
                                                        {{ transferOrder.abbr }}
                                                    </div>
                                                    <v-text-field
                                                        class=" custom-border flex-2"
                                                        v-model="transferOrder.number"
                                                        outlined
                                                        disabled
                                                        :rules="[(v) => !!v || 'Number is required']"
                                                        required
                                                    />
                                                    <v-icon
                                                        color="black"
                                                        size="30"
                                                        style="height: 40px;"
                                                        class="border_qrcode ml-2"
                                                        @click="generateNumber"
                                                    >mdi-qrcode
                                                    </v-icon>
                                                </div>

                                                <label class="label  mb-0">{{
                                                        $t("to_warehouse")
                                                    }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    :items="tWarehouses"
                                                    item-text="name"
                                                    item-value="id"
                                                    v-model="transferOrder.tWarehouse"
                                                    :rules="[(v) => !!v || 'Warehouse is required']"
                                                    return-object
                                                    tage="Warehouse"
                                                    outlined
                                                />
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{
                                                        $t("description")
                                                    }}</label>
                                                <v-textarea
                                                    class="mt-1"
                                                    v-model="transferOrder.description"
                                                    outlined
                                                    no-resize
                                                    height="120px"
                                                    tage="Message on Transfer Order"
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row color="white">
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <kendo-datasource
                                                ref="dataSource"
                                                @change="dataSourceChanged"
                                                :data="transferOrder.itemLines"
                                            />
                                            <kendo-grid
                                                id="grid"
                                                class="grid-function"
                                                :data-source-ref="'dataSource'"
                                                :sortable="false"
                                                :filterable="false"
                                                v-on:databound="dataBound"
                                                :column-menu="true"
                                                :editable="true"
                                                :scrollable-virtual="true"
                                            >
                                                <kendo-grid-column
                                                    :command="{
                            iconClass: 'k-icon k-i-trash',
                            text: ' ',
                            click: removeRow,
                            class: 'btn-plus',
                          }"
                                                    :title="'&nbsp;'"
                                                    :width="60"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :title="$t('no.')"
                                                    :width="55"
                                                    :template="rowNumber"
                                                    :column-menu="false"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5;',
                            class: 'text-variants',
                          }"
                                                    :attributes="{ style: 'text-align: variants' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'item'"
                                                    :title="$t('variants')"
                                                    :width="200"
                                                    :template="'<span>#=item.name#</span>'"
                                                    :editor="ItemDropDownEditor"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'uom'"
                                                    :template="UOMTemplate"
                                                    :editor="UOMDropDownEditor"
                                                    :title="$t('uom')"
                                                    :width="130"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'qoh'"
                                                    :title="$t('on_hand')"
                                                    :format="'{0:n}'"
                                                    :attributes="{ class: 'k-state-disabled' }"
                                                    :width="120"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                  :field="'qty'"
                                                  :editor="numberEditor"
                                                  :title="$t('qty_to_transfer')"
                                                  :format="'{0:n}'"
                                                  :width="180"
                                                  :attributes="{
                                                    style: 'text-align: right',
                                                  }"
                                                  :headerAttributes="{
                                                    style: 'background-color: #EDF1F5',
                                                  }"
                                                />
                                                <kendo-grid-column
                                                    :command="[{
                                                        iconClass: 'k-icon k-i-plus',
                                                     text: $t('serial'),
                                                     click: recordSerial,
                                                     className: 'k-state-disabled isSerialNumber btn-plus',
                                                     },{
                                                    iconClass: 'k-icon k-i-plus',
                                                     text: $t('batch'),
                                                     click: recordBatch,
                                                     className: 'k-state-disabled isBatch btn-plus'
                                                     }]"
                                                    :width="190"
                                                    :hidden="false"
                                                    :headerAttributes="{style:'text-align: right; background-color: #EDF1F5',}"
                                                />
                                            </kendo-grid>
                                        </v-col>
                                        <v-col cols="12" class="pt-0">
                                            <v-btn
                                                color="primary"
                                                class="float-left btn_plus rounded-4 white--text mr-2"
                                                @click="addRow"
                                            >
                                                <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col sm="12" cols="12">
                                            <v-row>
                                                <v-col sm="5" cols="12" class="pt-0">
                                                    <template>
                                                        <v-file-input
                                                            class="mt-0 pt-0 "
                                                            sm="3"
                                                            cols="6"
                                                            v-model="files"
                                                            :placeholder="$t('attachment')"
                                                            multiple
                                                            prepend-icon="mdi-paperclip"
                                                        >
                                                            <template v-slot:selection="{ text }">
                                                                <v-chip small label color="primary">
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
                                        <!-- <v-menu>
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
                                              <v-list-item-title>{{
                                                item.title
                                              }}</v-list-item-title>
                                            </v-list-item>
                                          </v-list>
                                        </v-menu> -->
                                        <v-btn
                                            color="primary"
                                            outlined
                                            class="text-capitalize  black--text float-left"
                                        >{{ $t("cancel") }}
                                        </v-btn>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                    class="ml-2 float-right text-capitalize  black--text"
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
                                            color="primary"
                                            @click="saveNew"
                                            class="float-right white--text text-capitalize "
                                        >
                                            {{ $t("save_draft") }}
                                        </v-btn>
                                    </v-card>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-dialog v-model="dialogS" max-width="700px" eager persistent>
                        <v-card>
                            <div class="modal_header">
                                <v-card-title>{{ $t("serial") }}</v-card-title>
                                <v-icon @click="onCloseS">close</v-icon>
                            </div>
                            <v-card-text class="modal_text_content pa-4">
                                <v-row>
                                    <v-col sm="12" cols="12" class="pt-0">
                                        <kendo-datasource
                                            ref="dataSource1"
                                            @change="dataSourceChangedS"
                                            :data="serials"
                                        />
                                        <kendo-grid
                                            id="gridS"
                                            class="grid-function"
                                            :data-source-ref="'dataSource1'"
                                            :sortable="false"
                                            :filterable="false"
                                            :column-menu="true"
                                            :editable="true"
                                            v-on:databound="dataBoundS"
                                            :scrollable-virtual="true"
                                        >
                                            <kendo-grid-column
                                                :title="$t('no.')"
                                                :width="55"
                                                :template="rowNumberS"
                                                :column-menu="false"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5;',
                                                    class: 'text-variants',
                                                  }"
                                                :attributes="{ style: 'text-align: variants' }"
                                            />
                                            <kendo-grid-column
                                                :field="'serialNumber1'"
                                                :title="$t('serial_number_1')"
                                                :width="150"
                                                :editable="function() {return false}"
                                                :attribute="{class: 'k-state-disabled'}"
                                                :headerAttributes="{style: 'background-color: #EDF1F5', }"
                                            />
                                            <kendo-grid-column
                                                :field="'serialNumber2'"
                                                :title="$t('serial_number_2')"
                                                :width="150"
                                                :editable="function() {return false}"
                                                :attributes="{ class: 'k-state-disabled isSerialNumber2'}"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                            <kendo-grid-column
                                                :field="'tick'"
                                                :title="' '"
                                                :editable="function(){ return false; }"
                                                :template="getRowTemplate"
                                                :width="70"
                                                :attributes="{ class: ''}"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                        </kendo-grid>
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
                                            @click="onCloseS"
                                        >{{ $t("cancel") }}
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="6" cols="6" class="py-0 text-right">
                                        <v-btn
                                            @click="addSerial"
                                            color="primary"
                                            class="px-3  white--text text-capitalize"
                                        >{{ $t("add") }}
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialog" max-width="700px" eager persistent>
                        <v-card>
                            <LoadingMe
                                :isLoading="showLoadingB"
                                :fullPage="false"
                                :type="'loading'"
                                :myLoading="true"
                            />
                            <div class="modal_header">
                                <v-card-title>{{ $t("batch") }}</v-card-title>
                                <v-icon @click="onCloseBatch">close</v-icon>
                            </div>
                            <v-card-text class="modal_text_content pa-4">
                                <v-row>
                                    <v-col sm="12" cols="12" class="pt-0">
                                        <v-row>
                                            <v-col sm="3" cols="3" class="py-1">
                                                <label class="label">{{ $t("on_hand") }}</label>
                                                <h3 class="text-bold d-block py-1">{{ amtBatch }}</h3>
                                            </v-col>
                                            <v-col sm="3" cols="3" class="py-1">
                                                <label class="label">{{ $t("qty_to_transfer") }}</label>
                                                <h3 class="text-bold d-block py-1">{{ qtyReceived }}</h3>
                                            </v-col>
                                            <v-col sm="3" cols="3" class="py-1">
                                                <label class="label">{{ $t("qty_transferred") }}</label>
                                                <h3 :class="qtyDelivery > qtyReceived ? 'text-bold d-block py-1 red--text' : 'text-bold d-block py-1'">{{ qtyDelivery }}</h3>
                                            </v-col>
                                            <v-col sm="3" cols="3" class="py-1">
                                                <label class="label">{{ $t("total") }}</label>
                                                <h3 class="text-bold d-block py-1">{{ amtBatch - qtyDelivery }}</h3>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col sm="12" cols="12" class="pt-0">
                                        <kendo-datasource
                                            ref="dataSource2"
                                            @change="dataSourceChangedB"
                                            :data="batchs"
                                        />
                                        <kendo-grid
                                            id="gridBatch"
                                            class="grid-function"
                                            :data-source-ref="'dataSource2'"
                                            :sortable="false"
                                            :filterable="false"
                                            :column-menu="true"
                                            :editable="true"
                                            v-on:databound="dataBoundB"
                                            :scrollable-virtual="true"
                                        >
                                            <kendo-grid-column
                                                :title="$t('no.')"
                                                :width="55"
                                                :template="rowNumberB"
                                                :column-menu="false"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5;',
                                                    class: 'text-variants',
                                                  }"
                                                :attributes="{ style: 'text-align: variants' }"
                                            />
                                            <kendo-grid-column
                                                :field="'number'"
                                                :title="$t('number')"
                                                :editable="function() {return false}"
                                                :width="150"
                                                :headerAttributes="{style: 'background-color: #EDF1F5', }"
                                            />
                                            <kendo-grid-column
                                                :field="'expirationDate'"
                                                :title="$t('expiration_date')"
                                                :width="150"
                                                :editable="function() {return false}"
                                                :template="ExpirationDateToTemplate"
                                                :editor="ExpirationDateToEditor"
                                                :attributes="{ class: 'k-state-disabled expirationDate'}"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                            <kendo-grid-column
                                                :field="'qty'"
                                                :title="$t('qty')"
                                                :editable="function() {return false}"
                                                :width="100"
                                                :attributes="{ style: 'text-align: right' }"
                                                :headerAttributes="{style: 'background-color: #EDF1F5', }"
                                            />
                                            <kendo-grid-column
                                                :field="'TQty'"
                                                :title="$t('qty_transferred')"
                                                :editor="numberEditorB"
                                                :width="140"
                                                :attributes="{ style: 'text-align: right' }"
                                                :headerAttributes="{style: 'background-color: #EDF1F5', }"
                                            />
                                        </kendo-grid>
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
                                            @click="onCloseBatch"
                                        >{{ $t("cancel") }}
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="6" cols="6" class="py-0 text-right">
                                        <v-btn
                                            color="primary"
                                            @click="onSaveBatch"
                                            class="px-3  white--text text-capitalize"
                                        >{{ $t("save") }}
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"
                :alertMessage="loadingAlert"
                :color="loadingColorAlert"
                :alertText="loadingTextAlert"
            />
        </v-container>
    </v-app>
</template>

<script>
// import kendo from '@progress/kendo-ui'
import LoadingMe from "@/components/Loading";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import TransferOrder from "@/scripts/model/transferOrder";
import kendo from "@progress/kendo-ui";
import {uuid} from "vue-uuid";
import {i18n} from "@/i18n";
import saleOrderHandler from "@/scripts/transactionHandler";
import $ from "jquery";
import receiptOrderHandler from "@/scripts/receiptOrderHandler";
import Vue from "vue";
import Row from "@/views/customers/settings/CheckboxTemplate";

const transferOrderHandler = require("@/scripts/transferOrderHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const productVariantHandler = require("@/scripts/productVariantHandler");
const uomPriceHandler = require("@/scripts/uomPriceHandler");
const warehouseHandler = require("@/scripts/warehouseHandler");
const prefixHandler = require("@/scripts/prefixHandler");
const transferOrder = new TransferOrder({});
const itemLinePrefix = "lin-";
const rowTemplate = Vue.component(Row.name, Row);
export default {
    name: "CreditPurchase",
    components: {
        LoadingMe: LoadingMe,
        "app-datepicker": DatePickerComponent,
    },
    data: () => ({
        isEdit: false,
        dialog: false,
        dialogS: false,
        // LoadingMe
        showLoadingB: false,
        showLoadingTxn: false,
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: "",
        loadingTextAlert: "",
        bill_date: "",
        alert: false,
        deposite: 1000,
        files: [],
        // Form validation
        valid: true,
        isClose: true,

        templates: [
            {title: "Draft"},
            {title: "Open"},
            {title: "Partially Closed"},
            {title: "Closed"},
        ],
        isHideBar: false,

        batchs: [],
        itemBatch: {},
        amtBatch: 0,
        qtyReceived: 0,
        totalBatch: 0,
        qtyDelivery: 0,
        serials: [],
        qtySerial: 0,
        transactionTypes: [],
        itemLines: [],
        itemLinesS: [],
        itemLinesOldS: [],
        itemLinesBatch: [],
        itemLinesOldBatch: [],
        fWarehouses: [],
        tWarehouses: [],
        balanceWarehouse: {bQty: 0},
        transferOrder: transferOrder,
    }),
    beforeRouteLeave(to, from, next) {
        if (this.isClose) {
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
                    this.transferOrder = transferOrder;
                    next()
                }
            });
        } else {
            next()
        }
    },
    methods: {
        dataBoundS: function (e) {
            const grid = kendo.jQuery("#gridS").data("kendoGrid")
            const items = e.sender.items();
            items.each(function () {
                let dataItem = grid.dataItem(this);
                kendo
                    .jQuery("tr[data-uid='" + dataItem.uid + "']")
                    .find(".isSerialNumber2")
                    .each(function () {
                        if (dataItem.batchOrSerial == 2) {
                            kendo.jQuery(this).removeClass("k-state-disabled");
                        } else {
                            kendo.jQuery(this).addClass("k-state-disabled")
                        }
                    });
            });

        },
        addSerial() {
            this.getDataSourceS()
            window.console.log(this.itemLinesS, 'itemline s')
        },
        async getDataSourceS() {
            let ds = this.$refs.dataSource1.kendoWidget();
            let dataRow = ds.data();
            const s = dataRow.filter(i => i.tick == true)
            if (s.length !== this.qtySerial) {
                this.$snotify.error('Please check your qty of serial number')
                return
            }
            dataRow.forEach((i) => {
                if (i.serialNumber1 !== '') {
                    this.itemLinesS.push({
                        id: itemLinePrefix + uuid.v1(),
                        item: i.item,
                        uom: i.uom,
                        serialNumber1: i.serialNumber1,
                        serialNumber2: i.serialNumber2,
                        type: 'serial',
                        whId: this.transferOrder.tWarehouse.id,
                        tick: i.tick,
                        status: 1
                    });
                    this.itemLinesOldS.push({
                        id: i.id,
                        item: i.item,
                        uom: i.uom,
                        serialNumber1: i.serialNumber1,
                        serialNumber2: i.serialNumber2,
                        type: 'serial',
                        whId: i.whId,
                        createdAt: i.createdAt,
                        pk: i.pk,
                        tick: i.tick,
                        status: i.tick === true ? 2 : 1
                    });
                }
            });
            this.onCloseS()
        },
        updateSelection(item, value) {
            const ds = this.$refs.dataSource1.kendoWidget()
            const rows = ds.data()
            rows.map(row => {
                if (row.id === item.id) {
                    // row.set('tick', value)
                    row['tick'] = value
                }
            })
        },
        getRowTemplate(e) {
            return {
                template: rowTemplate,
                templateArgs: Object.assign(this.templateData(e))
            };
        },
        templateData(item) {
            return {
                dataItem: item,
                parentComponent: this
            };
        },
        onChangeSO(item) {
            window.console.log(item, 'onchangePO')
            this.deliveryOrder.itemLines = []
            this.saleOrder.itemLines.forEach(p => {
                this.deliveryOrder.itemLines.push({
                    ...p,
                    qtyReceived: p.qty - p.totalReceived,
                    source: 'sale order'
                })
            })
            window.console.log(this.receiptOrder.itemLines, 'itemline')
        },
        async loadSaleOrders() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    let supplierId = "",
                        whId = "",
                        txnDate = ""
                    if (this.deliveryOrder.customer) {
                        supplierId = this.deliveryOrder.customer.id;
                    }
                    if (this.deliveryOrder.warehouse) {
                        whId = this.deliveryOrder.warehouse.id
                    }
                    if (this.deliveryOrder.date) {
                        txnDate = this.deliveryOrder.date;
                    }
                    let strFilter = "";
                    if (supplierId !== "" && txnDate !== "" && whId !== "") {
                        strFilter = "?id=" + supplierId + "&whId=" + whId + '&wType=RO&type=Sale Order'
                    }
                    if (strFilter !== "") {
                        this.showLoadingTxn = true
                        saleOrderHandler
                            .transactionFilter(strFilter)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoadingTxn = false
                                    this.showLoading = false;
                                    this.saleOrders = res.data.data;
                                } else {
                                    this.showLoadingTxn = false
                                }
                            })
                    }
                }, 10);
            });
        },
        onCloseS() {
            this.dialogS = false
            this.serials = []
        },
        rowNumberS(dataItem) {
            let ds = this.$refs.dataSource1.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        dataSourceChangedS(e) {
            if (e.field) {
                let dataRow = e.items[0];
                window.console.log(e, "data source change");
                switch (e.field) {
                    case "serialNumber1":
                        kendo
                            .jQuery("tr[data-uid='" + dataRow.uid + "']")
                            .find(".isSerialNumber2")
                            .each(function () {
                                if (dataRow.item.batchOrSerial == 2) {
                                    kendo.jQuery(this).removeClass("k-state-disabled");
                                } else {
                                    kendo.jQuery(this).addClass("k-state-disabled");
                                }
                            });
                        break;
                }
            }
        },
        recordSerial(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#grid").data("kendoGrid")
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            if (dataItem.item.batchOrSerial === 2 && dataItem.qty > 0) {
                if (this.itemLinesS.length > 0) {
                    this.serials = this.itemLinesS.filter(p => p.item.id === dataItem.item.id)
                } else {
                    receiptOrderHandler.getBatch(dataItem.item.id, this.transferOrder.fWarehouse.id, 'serial').then(res => {
                        window.console.log(res, 'serial')
                        if (res.length > 0) {
                            this.qtySerial = dataItem.qty;
                            res.forEach(o => {
                                this.serials.push({
                                    id: o.linId,
                                    item: o.item,
                                    uom: o.uom,
                                    whId: o.whId,
                                    serialNumber1: o.serialNumber1,
                                    serialNumber2: o.serialNumber2,
                                    status: o.status,
                                    createdAt: o.createdAt,
                                    pk: o.id
                                })
                            })
                        } else {
                            this.$snotify.error('This item ' + dataItem.item.name + 'no serial')
                        }
                    })
                }
                this.dialogS = true
            }
        },
        dataBoundB: function (e) {
            const grid = kendo.jQuery("#gridBatch").data("kendoGrid")
            const items = e.sender.items();
            items.each(function () {
                let dataItem = grid.dataItem(this);
                kendo
                    .jQuery("tr[data-uid='" + dataItem.uid + "']")
                    .find(".expirationDate")
                    .each(function () {
                        if (dataItem.number !== '') {
                            kendo.jQuery(this).removeClass("k-state-disabled");
                        }
                    });
            });
        },
        onSaveBatch() {
            if ((this.qtyReceived - this.qtyDelivery) > 0 || (this.qtyDelivery > this.qtyReceived)) {
                this.$snotify.error('Please check your Qty')
                return
            }
            this.getDataSourceB()
            window.console.log(this.itemLinesBatch, 'itemline b')
        },
        onCloseBatch() {
            this.dialog = false
            this.batchs = []
        },
        async getDataSourceB() {
            let ds = this.$refs.dataSource2.kendoWidget();
            let dataRow = ds.data();
            dataRow.forEach((i) => {
                if (i.qty > 0) {
                    this.itemLinesBatch.push({
                        id: itemLinePrefix + uuid.v1(),
                        item: i.item,
                        uom: i.uom,
                        number: i.number,
                        whId: this.transferOrder.tWarehouse.id,
                        expirationDate: i.expirationDate,
                        qty: i.TQty,
                        DQty: 0,
                        type: 'batch',
                        status: i.status
                    });
                    this.itemLinesOldBatch.push({
                        id: i.id,
                        item: i.item,
                        number: i.number,
                        whId: i.whId,
                        uom: i.uom,
                        expirationDate: i.expirationDate,
                        qty: i.qty - i.TQty,
                        DQty: i.DQty,
                        type: 'batch',
                        status: i.status,
                        pk: i.pk,
                        createdAt: i.createdAt
                    });
                }
            });
            this.onCloseBatch()
        },
        removeRowB(e) {
            e.preventDefault();
            const grid = kendo.jQuery("#gridBatch").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
                this.calcuateBatch()
            }
        },
        rowNumberB(dataItem) {
            let ds = this.$refs.dataSource2.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        async calcuateBatch() {
            let ds = this.$refs.dataSource2.kendoWidget();
            let dataRow = ds.data();
            let amount = 0
            dataRow.forEach((i) => {
                amount += i.TQty
            });
            this.qtyDelivery = amount
            this.totalBatch = this.qtyReceived - amount
        },
        numberEditorB(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 30,
                    min: 0,
                    max: options.model.qty || 0
                });
        },
        dataSourceChangedB(e) {
            if (e.field) {
                let dataRow = e.items[0];
                window.console.log(e, "data source change");
                switch (e.field) {
                    case "TQty":
                        this.calcuateBatch()
                        kendo
                            .jQuery("tr[data-uid='" + dataRow.uid + "']")
                            .find(".expirationDate")
                            .each(function () {
                                if (dataRow.number !== '') {
                                    kendo.jQuery(this).removeClass("k-state-disabled");
                                }
                            });
                        break;

                }
            }
        },
        addRowB() {
            let data = {
                id: itemLinePrefix + uuid.v1(),
                item: this.itemBatch,
                number: '',
                expirationDate: '',
                whId: this.deliveryOrder.warehouse.id,
                qty: 0,
                status: 1
            };
            let ds = this.$refs.dataSource2.kendoWidget(),
                total = ds.total();
            ds.insert(total, data);
        },
        recordBatch(e) {
            this.showLoadingB = true
            e.preventDefault();
            let grid = kendo.jQuery("#grid").data("kendoGrid")
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            this.itemBatch = dataItem.item
            if (dataItem.item.batchOrSerial === 1 && dataItem.qty > 0) {
                receiptOrderHandler.getBatch(dataItem.item.id, this.transferOrder.fWarehouse.id, 'batch').then(res => {
                    window.console.log(res, 'batch')
                    if (res.length > 0) {
                        let amount = 0
                        res.forEach(o => {
                            this.batchs.push({
                                id: o.linId,
                                item: o.item,
                                uom: o.uom,
                                number: o.number,
                                expirationDate: o.expirationDate,
                                qty: o.qty,
                                whId: o.whId,
                                TQty: 0,
                                DQty: o.DQty || 0,
                                status: o.status,
                                createdAt: o.createdAt,
                                pk: o.id
                            })
                            amount += o.qty
                        })
                        this.amtBatch = amount
                        this.qtyReceived = dataItem.qty
                        this.totalBatch = dataItem.qty
                        this.dialog = true
                    } else {
                        this.$snotify.error('This item ' + dataItem.item.name + ' no stock in warehouse')
                    }
                })
            }
            this.showLoadingB = false
        },

        onChangeFromWarehouse() {
            this.tWarehouses = this.fWarehouses.filter(p => p.id !== this.transferOrder.fWarehouse.id)
            if (this.tWarehouses.length > 0) {
                this.transferOrder.tWarehouse = this.tWarehouses[0]
            }
        },
        numberEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 30,
                    min: 0,
                    max: this.balanceWarehouse ? this.balanceWarehouse.bQty : 0,
                });
        },
        dataSourceChanged(e) {
            if (e.field) {
                let dataRow = e.items[0];
                switch (e.field) {
                    case "item":
                        this.getBalanceWarehouse(dataRow.item.id).then(() => {
                            dataRow.set("qoh", this.balanceWarehouse ? this.balanceWarehouse.bQty : 0);
                        });
                        kendo
                            .jQuery("tr[data-uid='" + dataRow.uid + "']")
                            .find(".isSerialNumber")
                            .each(function () {
                                if (dataRow.item.batchOrSerial == 2) {
                                    kendo.jQuery(this).removeClass("k-state-disabled");
                                    dataRow.set("expirationDate", "");
                                } else {
                                    kendo.jQuery(this).addClass("k-state-disabled");
                                }
                            });
                        kendo
                            .jQuery("tr[data-uid='" + dataRow.uid + "']")
                            .find(".isBatch")
                            .each(function () {
                                if (dataRow.item.batchOrSerial == 1) {
                                    kendo.jQuery(this).removeClass("k-state-disabled");
                                } else {
                                    kendo.jQuery(this).addClass("k-state-disabled");
                                }
                            });
                        break;
                }
            }
        },
        ExpirationDateToTemplate(dataItem) {
            const expirationDate = dataItem.expirationDate;
            if (expirationDate) {
                return `<span>${
                    expirationDate
                        ? kendo.toString(new Date(expirationDate), `dd-MM-yyyy`)
                        : ``
                }</span>`;
            } else {
                return ``;
            }
        },
        ExpirationDateToEditor(container, options) {
            kendo
                .jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDatePicker();
        },
        ItemDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
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
                        "<span></span>" +
                        "</div>",
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
                                },
                            },
                            data: function (response) {
                                return response.data.filter(p => p.type === 'Variant')
                            },
                            total: function (response) {
                                return response.data.filter(p => p.type === 'Variant').length;
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
                    template: "<span>#=uom.name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: uomPriceHandler.uomPriceByPriceLevelURL(
                                    "id=" +
                                    options.model.item.id +
                                    "&plId=-" + "&date=" +
                                    this.transferOrder.date
                                ),
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
        UOMTemplate(dataItem) {
            const uom = dataItem.uom;
            if (uom) {
                return `<span>${uom.uom ? uom.uom.name : ``}</span>`;
            } else {
                return ``;
            }
        },
        removeRow(e) {
            e.preventDefault();
            const grid = kendo.jQuery("#grid").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        rowNumber(dataItem) {
            let ds = this.$refs.dataSource.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        dataBound: function (e) {
            const grid = kendo.jQuery("#grid").data("kendoGrid")
            const items = e.sender.items();
            items.each(function () {
                let dataItem = grid.dataItem(this);
                kendo
                    .jQuery("tr[data-uid='" + dataItem.uid + "']")
                    .find(".isSerialNumber")
                    .each(function () {
                        if (dataItem.item.batchOrSerial == 2) {
                            kendo.jQuery(this).removeClass("k-state-disabled");
                        } else {
                            kendo.jQuery(this).addClass("k-state-disabled");
                        }
                    });
                kendo
                    .jQuery("tr[data-uid='" + dataItem.uid + "']")
                    .find(".isBatch")
                    .each(function () {
                        if (dataItem.item.batchOrSerial == 1) {
                            kendo.jQuery(this).removeClass("k-state-disabled");
                        } else {
                            kendo.jQuery(this).addClass("k-state-disabled");
                        }
                    });
            });
        },
        addRow() {
            let data = {
                id: itemLinePrefix + uuid.v1(),
                item: {name: ""},
                qty: 0,
                serial: "",
                uom: {},
                batch: {},
                expirationDate: "",
            };
            let ds = this.$refs.dataSource.kendoWidget(),
                total = ds.total();
            ds.insert(total, data);
        },
        async onloadWarehouse() {
            await warehouseHandler.getWarehouseSettingAll().then(async (res) => {
                this.fWarehouses = res;
                if (this.fWarehouses.length > 1) {
                    this.transferOrder.fWarehouse = this.fWarehouses[0];
                    this.tWarehouses = this.fWarehouses.filter(p => p.id !== this.transferOrder.fWarehouse.id)
                    if (this.tWarehouses.length > 0) {
                        this.transferOrder.tWarehouse = this.tWarehouses[0];
                    }
                } else if (this.fWarehouses.length > 0) {
                    this.transferOrder.fWarehouse = this.fWarehouses[0];
                }

            });
        },
        async loadPrefix() {
            this.showLoading = true;
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    prefixHandler.get("transfer order").then((res) => {
                        if (res.data.statusCode === 200) {
                            // this.showLoading = false
                            this.transactionTypes = res.data.data;
                            if (this.transactionTypes.length > 0) {
                                this.transferOrder.transactionType = this.transactionTypes[0];
                                if (this.$route.params.id === undefined) {
                                    this.generateNumber();
                                }
                            }
                        }
                    });
                }, 300);
            });
            await this.onloadWarehouse();
            this.showLoading = false;
        },
        generateNumber() {
            let data = {
                abbr: this.transferOrder.transactionType.abbr,
                structure: this.transferOrder.transactionType.structure,
                transactionDate: this.transferOrder.date,
                sequcencing: this.transferOrder.transactionType.sequcencing,
                type: "Transfer Order",
                entity: 3,
            };
            this.transferOrder.abbr = data.abbr;
            this.transferOrder.structure = data.structure;
            this.transferOrder.sequcencing = data.sequcencing;
            this.transferOrder.type = data.type;
            this.transferOrder.transactionDate = data.transactionDate;
            billingHandler
                .lastNumber(data)
                .then((response) => {
                    if (response.data.statusCode === 200) {
                        const res = response.data.data;
                        const lastNumber = this.zeroPad(
                            parseInt(res.lastNumber),
                            this.transferOrder.transactionType.format
                        );
                        this.transferOrder.number =
                            res.suffix +
                            this.transferOrder.transactionType.numberSeparator +
                            lastNumber;
                        this.transferOrder.lastNumber = res.suffix + lastNumber;
                        window.console.log(this.receiptOrder.number, "bom");
                    }
                })
                .catch((e) => {
                    window.console.log(e);
                });
        },
        zeroPad(num, places) {
            return String(num).padStart(places, "0");
        },
        suffix(transactionDate) {
            return kendo.toString(new Date(transactionDate), `yymm`);
        },
        async getBalanceWarehouse(id) {
            const data = {
                itmId: id,
                date: this.transferOrder.date ? this.transferOrder.date : new Date(),
                whId: this.transferOrder.fWarehouse
                    ? this.transferOrder.fWarehouse.id
                    : "",
            };
            await warehouseHandler.getBalance(data).then((res) => {
                this.balanceWarehouse = res[0];
                window.console.log(this.balanceWarehouse, "balance warehouse");
            });
        },
        async getDataSource() {
            let ds = this.$refs.dataSource.kendoWidget();
            let dataRow = ds.data();
            this.itemLines = [];

            dataRow.forEach((i) => {
                window.console.log(i, "item");
                this.itemLines.push({
                    id: i.id,
                    item: i.item,
                    qoh: i.qoh,
                    uom: i.uom,
                    qty: i.qty
                });
            });
        },
        savePrint() {
        },
        cancel() {
            this.itemLines = []
            this.itemLinesS = []
            this.itemLinesOldS = []
            this.itemLinesBatch = []
            this.itemLinesOldBatch = []
            this.batchs = []
            this.serials = []
            this.itemBatch = {}
            this.amtBatch = 0
            this.qtyReceived = 0
            this.totalBatch = 0
            this.qtyDelivery = 0
            this.qtySerial = 0
            this.transferOrder = transferOrder;
            window.history.go(-1);
        },
        async saveNew() {
            this.showLoading = true;
            await this.getDataSource();
            this.transferOrder.itemLines = this.itemLines;
            this.transferOrder.itemLinesSerial = this.itemLinesS;
            this.transferOrder.itemLinesBatch = this.itemLinesBatch;
            this.transferOrder.itemLinesOldSerial = this.itemLinesOldS;
            this.transferOrder.itemLinesOldBatch = this.itemLinesOldBatch;
            window.console.log(this.transferOrder, '123')
            transferOrderHandler.save(this.transferOrder).then((res) => {
                window.console.log(res);
                this.isClose = false
                this.showLoading = false;
                this.cancel();
            });
        },
        saveClose() {
        },
        errorMessage() {
        },
        hide_smallsitebar() {
            if (!this.isHideBar) {
                // this.col_expand = 12
                // this.col_hide = 0
                this.isHideBar = true;
            } else {
                // this.col_expand = 9
                // this.col_hide = 3
                this.isHideBar = false;
            }
        },
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
        this.addRow();
        await this.loadPrefix();
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
    background-color: #f2f2f2;
}

.pa-3.v-card h4 {
    font-size: 18px;
    color: #333;
}

.pa-3.v-card p {
    font-size: 12px;
    color: #b5b5b5;
}

.custom_grid table th:last-child {
    text-align: right !important;
}

@media (min-width: 1264px) {
    .container {
        /* max-width: 1185px; */
        max-width: 1080px !important;
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
    transition: 0.5s ease-in;
    flex: 0 0 0;
}

.hide_big_bar_class {
    max-width: 100%;
    transition: 0.5s ease-in;
    flex: 0 0 100%;
}

.info_add {
    background-color: #ffffff;
}

.small_sidebar {
    height: 96%;
    position: relative;
    padding: 12px;
    background-color: #edf1f5;
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
    background-color: #edf1f5;
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
