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
                                        <h2 class="mb-0">{{ $t("receipt_order") }}</h2>
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
                                        class="px-4 no_border mb-3"
                                        color="grayBg"
                                    >
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{ $t("supplier") }}</label>
                                                <v-col
                                                    sm="12"
                                                    cols="12"
                                                    style="margin-top:1px;"
                                                    class="kendo_dropdown_custom pl-0 pb-4 pr-0  pt-0"
                                                >
                                                    <dropdownlist
                                                        :data-items="supplierList"
                                                        @change="onChange"
                                                        v-model="receiptOrder.supplier"
                                                        :value="receiptOrder.supplier"
                                                        :data-item-key="dataItemKey"
                                                        :text-field="textField"
                                                        :default-item="defaultItem"
                                                        :filterable="true"
                                                        @filterchange="onFilterChange"
                                                    >
                                                    </dropdownlist>
                                                </v-col>
                                                <label class="label">{{ $t("number") }}</label>
                                                <div class="mt-1 d-flex">
                                                    <div class="code_text flex-1 text-bold">
                                                        {{ receiptOrder.abbr }}
                                                    </div>

                                                    <v-text-field
                                                        class="flex-2 custom-border "
                                                        v-model="receiptOrder.number"
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
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{ $t("date") }}</label>
                                                <app-datepicker
                                                    :initialDate="receiptOrder.date"
                                                    @onChanged="generateNumber"
                                                    @emitDate="receiptOrder.date = $event"
                                                />
                                                <label class="label">{{ $t("reference") }}</label>
                                                <v-select :items="purchaseOrders" @change="onChangePO"
                                                          v-model="purchaseOrder" return-object
                                                          :loading="purchaseOrders.length <= 0 && showLoadingTxn"
                                                          item-text="referenceNo" item-value="id" outlined
                                                          class="mt-1"/>
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{ $t("warehouse") }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    :items="warehouses"
                                                    item-text="name"
                                                    item-value="id"
                                                    @change="onChangeWarehouse"
                                                    v-model="receiptOrder.warehouse"
                                                    :rules="[(v) => !!v || 'Warehouse is required']"
                                                    return-object
                                                    tage="Warehouse"
                                                    outlined
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row color="white">
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <kendo-datasource
                                                ref="dataSource"
                                                @change="dataSourceChanged"
                                                :data="receiptOrder.itemLines"
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
                                                    :title="$t('items')"
                                                    :width="200"
                                                    :template="'<span>#=item.name#</span>'"
                                                    :editor="ItemDropDownEditor"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :width="170"
                                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                                />
                                                <kendo-grid-column
                                                    :field="'uom'"
                                                    :template="UOMTemplate"
                                                    :editor="UOMDropDownEditor"
                                                    :title="$t('uom')"
                                                    :width="110"
                                                    :attribute="{class: 'k-state-disabled'}"
                                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5',
                                                      }"
                                                />
                                                <kendo-grid-column
                                                    :field="'qty'"
                                                    :title="$t('ordered')"
                                                    :format="'{0:n0}'"
                                                    :attributes="{style: 'text-align: right'}"
                                                    :width="120"
                                                    :editable="function() {return false}"
                                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                                />
                                                <kendo-grid-column
                                                    :field="'totalReceived'"
                                                    :title="$t('total_received')"
                                                    :width="180"
                                                    :editable="function() {return false}"
                                                    :headerAttributes="{style:'text-align: right; background-color: #EDF1F5', }"
                                                    :attributes="{style: 'text-align: right'}"
                                                />
                                                <kendo-grid-column
                                                    :field="'qtyReceived'"
                                                    :title="$t('qty_received')"
                                                    :width="160"
                                                    :editor="numberEditor"
                                                    :headerAttributes="{style:'text-align: right; background-color: #EDF1F5', }"
                                                    :attributes="{style: 'text-align: right'}"
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
                                        <v-col cols="12" class="py-0">
                                            <v-btn
                                                color="primary"
                                                class="float-left btn_plus rounded-4 white--text mr-2"
                                                @click="addRow"
                                            >
                                                <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="py-0">
                                                    <v-row>
                                                        <v-col sm="4" cols="12" class="pb-0">
                                                            <label class="label  mb-0">{{
                                                                    $t("delivered_by")
                                                                }}</label>
                                                            <v-select
                                                                class="mt-1"
                                                                :items="deliveryAgencies"
                                                                :item-text="(item) =>item.cusSup ? `${item.cusSup.number} - ${item.cusSup.name}`: ''"
                                                                item-value="id"
                                                                :rules="[(v) => !!v || 'Delivered by is required',]"
                                                                v-model="receiptOrder.deliveredBy"
                                                                tage="Delivered by"
                                                                return-object
                                                                outlined
                                                            />

                                                        </v-col>
                                                        <v-col sm="3" cols="10" class="pb-0">
                                                            <label class="label mb-0">{{ $t("time") }}</label>
                                                            <v-menu
                                                                v-model="menu2"
                                                                class="mt-1"
                                                                :close-on-content-click="false"
                                                                :nudge-right="40"
                                                                ref="menu"
                                                                transition="scale-transition"
                                                                :return-value.sync="receiptOrder.timeOfDischarged"
                                                                max-width="340"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-text-field
                                                                        class="mt-1"
                                                                        v-model="receiptOrder.timeOfDischarged"
                                                                        readonly
                                                                        outlined
                                                                        append-icon="mdi-clock-time-four-outline"
                                                                        v-on="on"
                                                                        v-bind="attrs"
                                                                        @click:clear="receiptOrder.timeOfDischarged = null"
                                                                        @click:append="menu2 = true"
                                                                        required
                                                                    />
                                                                </template>
                                                                <v-time-picker
                                                                    v-if="menu2"
                                                                    v-model="receiptOrder.timeOfDischarged"
                                                                    full-width
                                                                    no-title
                                                                    @click:minute="$refs.menu.save(receiptOrder.timeOfDischarged)"
                                                                ></v-time-picker>
                                                            </v-menu>
                                                        </v-col>
                                                        <v-col sm="2" cols="12" class="pb-0">
                                                            <label class="label  mb-0">{{
                                                                    $t("vehicle_number")
                                                                }}</label>
                                                            <v-text-field
                                                                class="mt-1"
                                                                v-model="receiptOrder.vehicleNumber"
                                                                outlined
                                                                tage="Vehicle Number"
                                                                required
                                                            />
                                                        </v-col>
                                                        <v-col sm="3" cols="12" class="pb-0">
                                                            <label class="label  mb-0">{{
                                                                    $t("references")
                                                                }}</label>
                                                            <v-text-field
                                                                class="mt-1"
                                                                tage="Driver References"
                                                                v-model="receiptOrder.driverReferences"
                                                                return-object
                                                                outlined
                                                            />
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
                                                        }}
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <v-btn
                                            @click="cancel"
                                            color="black"
                                            outlined
                                            class="text-capitalize  black--text float-left"
                                        >{{ $t("cancel") }}
                                        </v-btn>
                                        <!-- <v-menu>
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
                                        </v-menu> -->
                                        <v-btn
                                            @click="saveNew"
                                            color="primary"
                                            class="float-right white--text text-capitalize "
                                        >
                                            {{ $t("save_new") }}
                                        </v-btn>
                                    </v-card>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-dialog v-model="dialogS" max-width="700px" eager persistent>
                        <v-card>
                            <div class="modal_header">
                                <v-card-title>{{ $t("Serial") }}</v-card-title>
                                <v-icon @click="onCloseS">close</v-icon>
                            </div>
                            <v-card-text class="modal_text_content">
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
                                                :attribute="{class: 'k-state-disabled'}"
                                                :headerAttributes="{style: 'background-color: #EDF1F5', }"
                                            />
                                            <kendo-grid-column
                                                :field="'serialNumber2'"
                                                :title="$t('serial_number_2')"
                                                :width="150"
                                                :attributes="{ class: 'k-state-disabled isSerialNumber2'}"
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
                            <div class="modal_header">
                                <v-card-title>{{ $t("batch") }}</v-card-title>
                                <v-icon @click="onCloseBatch">close</v-icon>
                            </div>
                            <v-card-text class="modal_text_content pa-4">
                                <v-row>
                                    <v-col sm="12" cols="12" class="pt-0">
                                        <v-row>
                                            <v-col sm="4" cols="4" class="py-1">
                                                <label class="label">{{ $t("on_hand") }}</label>
                                                <h3 class="text-bold d-block py-1">{{ amtBatch }}</h3>
                                            </v-col>
                                            <v-col sm="4" cols="4" class="py-1">
                                                <label class="label">{{ $t("qty_received") }}</label>
                                                <h3 class="text-bold d-block py-1">{{ qtyReceived }}</h3>
                                            </v-col>
                                            <v-col sm="4" cols="4" class="py-1">
                                                <label class="label">{{ $t("total") }}</label>
                                                <h3 class="text-bold d-block py-1">{{ amtBatch - qtyReceived }}</h3>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col sm="12" cols="12" class="pt-1">
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
                                                :command="{
                                                        iconClass: 'k-icon k-i-trash',
                                                        text: ' ',
                                                        click: removeRowB,
                                                        class: 'btn-plus',
                                                      }"
                                                :title="'&nbsp;'"
                                                :width="50"
                                                :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                            />
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
                                                :width="150"
                                                :headerAttributes="{style: 'background-color: #EDF1F5', }"
                                            />
                                            <kendo-grid-column
                                                :field="'expirationDate'"
                                                :title="$t('expiration_date')"
                                                :width="150"
                                                :template="ExpirationDateToTemplate"
                                                :editor="ExpirationDateToEditor"
                                                :attributes="{ class: 'k-state-disabled expirationDate'}"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                            <kendo-grid-column
                                                :field="'qty'"
                                                :title="$t('qty')"
                                                :editor="numberEditorB"
                                                :width="100"
                                                :headerAttributes="{style: 'background-color: #EDF1F5', }"
                                            />
                                        </kendo-grid>
                                    </v-col>
                                    <v-col cols="12" class="py-0">
                                        <v-btn
                                            v-if="totalBatch > 0"
                                            color="primary"
                                            class="float-left btn_plus rounded-4 white--text mr-2"
                                            @click="addRowB"
                                        >
                                            <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                        </v-btn>
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
                                        >{{ $t("add") }}
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
import {i18n} from "@/i18n";
import LoadingMe from "@/components/Loading";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import ReceiptOrder from "@/scripts/model/ReceiptOrder";
import kendo from "@progress/kendo-ui";
import {DropDownList} from "@progress/kendo-vue-dropdowns";
// import MonthOfPicker from "@/components/kendo_templates/MonthOfPicker";
import {ShowResource} from "@/observable/store";
import {uuid} from "vue-uuid";
import $ from "jquery";
import ItemLineModel from "@/scripts/invoice/model/ItemLine";

// const transactionHandler = require("@/scripts/transactionHandler");

// const batchHandler = require("@/scripts/batchHandler");
const warehouseHandler = require("@/scripts/warehouseHandler");

const purchaseHandler = require("@/scripts/purchase/handler/billingHandler");
const deliveryOrderHandler = require("@/scripts/deliveryOrderHandler");
const receiptOrderHandler = require("@/scripts/receiptOrderHandler");
const productVariantHandler = require("@/scripts/productVariantHandler");
const prefixHandler = require("@/scripts/prefixHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const supplierHandler = require("@/scripts/supplierHandler");
// const settingsHandler = require("@/scripts/settingsHandler");
// const saleChannelHandler = require("@/scripts/saleChannelHandler");
// const locationHandler = require("@/scripts/locationHandler");
// const projectHandler = require("@/scripts/projectHandler");
const uomPriceHandler = require("@/scripts/uomPriceHandler");
const saleOrderHandler = require("@/scripts/transactionHandler");
const receiptOrder = new ReceiptOrder({});
const keyField = "id";
const textField = "name";
const emptyItem = {[textField]: "loading ..."};
const itemLinePrefix = "lin-";
export default {
    name: "ReceiptOrder",
    components: {
        LoadingMe: LoadingMe,
        "app-datepicker": DatePickerComponent,
        dropdownlist: DropDownList,
        // "app-monthpicker": MonthOfPicker,
    },
    data: () => ({
        menu2: false,
        isEdit: false,
        dialog: false,
        // LoadingMe
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

        templates: [
            {title: "Draft"},
            {title: "Open"},
            {title: "Partially Closed"},
            {title: "Closed"},
        ],
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,

        serials: [],
        batchs: [],
        warehouses: [],
        receiptOrder: receiptOrder,
        deliveryAgencies: [],

        itemBatch: {},
        uomBatch: {},
        amtBatch: 0,
        qtyReceived: 0,
        totalBatch: 0,
        showLoadingTxn: false,
        purchaseOrders: [],
        purchaseOrder: {},
        poItemLine: [],
        supplierList: [],
        dataItemKey: "id",
        textField: "name",
        defaultItem: {[textField]: "Select supplier...", [keyField]: null},
        supplierBaseUrl: supplierHandler.url(),
        filter: "",
        itemLines: [],
        itemLinesS: [],
        itemLinesBatch: [],
        isClose: true,
        dialogS: false,
        hideS: true,
        transactionTypes: []
    }),
    computed: {},
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
                window.console.log(resultCen);
                if (resultCen.value) {
                    this.receiptOrder = receiptOrder;
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
                        if (dataItem.batchOrSerial === 2) {
                            kendo.jQuery(this).removeClass("k-state-disabled");
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
            const s = dataRow.filter(i => i.serialNumber1 === '')
            if (s.length > 0) {
                this.$snotify.error('Please check your serial number')
                return
            }
            if (dataRow.length > 0) {
                const instituteId = this.$store.state.institute.institute.id
                receiptOrderHandler.getBatch(dataRow[0].item.id, this.receiptOrder.warehouse.id, instituteId, 'serial').then(res => {
                    if (res.length > 0) {
                        dataRow.forEach((i) => {
                            if (i.serialNumber1 !== '') {
                                const r = res.filter(p => p.serialNumber1 === i.serialNumber1)
                                this.itemLinesS.push({
                                    id: r.length > 0 ? r[0].linId : i.id,
                                    item: i.item,
                                    whId: this.receiptOrder.warehouse.id,
                                    serialNumber1: i.serialNumber1,
                                    serialNumber2: i.serialNumber2,
                                    type: 'serial',
                                    uom: i.uom,
                                    createdAt: r.length > 0 ? r[0].createdAt : '',
                                    status: i.status,
                                    pk: r.length > 0 ? r[0].id : ''
                                });
                            }
                        });
                    } else {
                        dataRow.forEach((i) => {
                            if (i.serialNumber1 !== '') {
                                this.itemLinesS.push({
                                    id: i.id,
                                    item: i.item,
                                    uom: i.uom,
                                    whId: this.receiptOrder.warehouse.id,
                                    serialNumber1: i.serialNumber1,
                                    serialNumber2: i.serialNumber2,
                                    type: 'serial',
                                    createdAt: '',
                                    status: i.status,
                                    pk: ''
                                });
                            }
                        })
                    }
                })
            }
            this.onCloseS()
        },
        onChangePO(item) {
            window.console.log(item, 'onchangePO')
            this.receiptOrder.itemLines = []
            this.purchaseOrder.itemLines.forEach(p => {
                this.receiptOrder.itemLines.push({
                    ...p,
                    qtyReceived: p.qty - p.totalReceived,
                    source: 'purchase order'
                })
            })
            window.console.log(this.receiptOrder.itemLines, 'itemline')
        },
        async loadPurchaseOrders() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    let supplierId = "",
                        whId = "",
                        txnDate = ""
                    if (this.receiptOrder.supplier) {
                        supplierId = this.receiptOrder.supplier.id;
                    }
                    if (this.receiptOrder.warehouse) {
                        whId = this.receiptOrder.warehouse.id
                    }
                    if (this.receiptOrder.date) {
                        txnDate = this.receiptOrder.date;
                    }
                    let strFilter = "";
                    if (supplierId !== "" && txnDate !== "" && whId !== "") {
                        strFilter = "?id=" + supplierId + "&whId=" + whId + '&wType=RO&type=Purchase Order'
                    }
                    if (strFilter !== "") {
                        this.showLoadingTxn = true
                        saleOrderHandler
                            .transactionFilter(strFilter)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoadingTxn = false
                                    this.showLoading = false;
                                    this.purchaseOrders = res.data.data;
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
        addRowSerial(item, uom, qty) {
            for (let i = 0; i < qty; i++) {
                let data = {
                    id: itemLinePrefix + uuid.v1(),
                    item: item,
                    uom: uom,
                    serialNumber1: '',
                    serialNumber2: '',
                    whId: this.receiptOrder.warehouse.id,
                    status: 1
                };
                let ds = this.$refs.dataSource1.kendoWidget(),
                    total = ds.total();
                ds.insert(total, data);
            }
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
                                if (dataRow.item.isSerialNumber1 !== '') {
                                    kendo.jQuery(this).removeClass("k-state-disabled");
                                }
                            });
                }
            }
        },
        recordSerial(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#grid").data("kendoGrid")
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            if (dataItem.item.batchOrSerial == 2 && dataItem.qtyReceived > 0) {
                if (this.itemLinesS.length > 0) {
                    const s = this.itemLinesS.filter(p => p.item.id === dataItem.item.id)
                    if (s.length === 0) {
                        this.addRowSerial(dataItem.item, dataItem.uom, dataItem.qtyReceived)
                    } else if (s.length < dataItem.qtyReceived) {
                        this.serials = s
                        this.addRowSerial(dataItem.item, dataItem.uom, dataItem.qtyReceived - s.length)
                    } else {
                        this.serials = s
                    }
                } else {
                    this.addRowSerial(dataItem.item, dataItem.uom, dataItem.qtyReceived)
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
            if ((this.amtBatch - this.qtyReceived) > 0) {
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
            if (dataRow.length > 0) {
                const instituteId = this.$store.state.institute.institute.id
                receiptOrderHandler.getBatch(dataRow[0].item.id, this.receiptOrder.warehouse.id, instituteId, 'batch').then(res => {
                    if (res.length > 0) {
                        dataRow.forEach((i) => {
                            if (i.qty > 0) {
                                const r = res.filter(p => p.number === i.number)
                                this.itemLinesBatch.push({
                                    id: r.length > 0 ? r[0].linId : i.id,
                                    item: i.item,
                                    uom: i.uom,
                                    number: i.number,
                                    whId: this.receiptOrder.warehouse.id,
                                    expirationDate: i.expirationDate,
                                    qty: r.length > 0 ? r[0].qty + i.qty : i.qty,
                                    DQty: r.length > 0 ? r[0].DQty : 0,
                                    type: 'batch',
                                    status: i.status,
                                    createdAt: r.length > 0 ? r[0].createdAt : '',
                                    pk: r.length > 0 ? r[0].id : ''
                                });
                            }
                        });
                    } else {
                        dataRow.forEach((i) => {
                            if (i.qty > 0) {
                                this.itemLinesBatch.push({
                                    id: i.id,
                                    item: i.item,
                                    uom: i.uom,
                                    number: i.number,
                                    whId: this.receiptOrder.warehouse.id,
                                    expirationDate: i.expirationDate,
                                    qty: i.qty,
                                    DQty: 0,
                                    type: 'batch',
                                    status: i.status,
                                    pk: ''
                                });
                            }
                        })
                    }
                })
            }
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
                amount += i.qty
            });
            this.qtyReceived = amount
            this.totalBatch = this.amtBatch - amount
        },
        numberEditorB(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 30,
                    min: 0,
                    max: this.totalBatch
                });
        },
        dataSourceChangedB(e) {
            if (e.field) {
                let dataRow = e.items[0];
                window.console.log(e, "data source change");
                switch (e.field) {
                    case "number":
                        kendo
                            .jQuery("tr[data-uid='" + dataRow.uid + "']")
                            .find(".expirationDate")
                            .each(function () {
                                if (dataRow.number !== '') {
                                    kendo.jQuery(this).removeClass("k-state-disabled");
                                }
                            });
                        if (dataRow.qty > 0) {
                            this.calcuateBatch()
                        }
                        break;
                    case "expirationDate":
                        if (dataRow.qty > 0) {
                            this.calcuateBatch()
                        }
                        kendo
                            .jQuery("tr[data-uid='" + dataRow.uid + "']")
                            .find(".expirationDate")
                            .each(function () {
                                if (dataRow.number !== '') {
                                    kendo.jQuery(this).removeClass("k-state-disabled");
                                }
                            });
                        break;
                    case "qty":
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
                uom: this.uomBatch,
                number: '',
                expirationDate: '',
                whId: this.receiptOrder.warehouse.id,
                qty: 0,
                status: 1
            };
            let ds = this.$refs.dataSource2.kendoWidget(),
                total = ds.total();
            ds.insert(total, data);
        },
        recordBatch(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#grid").data("kendoGrid")
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            this.itemBatch = dataItem.item
            this.uomBatch = dataItem.uom
            if (dataItem.item.batchOrSerial == 1 && dataItem.qtyReceived > 0) {
                this.amtBatch = dataItem.qtyReceived;
                if (this.itemLinesBatch.length > 0) {
                    let amount = 0
                    this.batchs = this.itemLinesBatch.filter(p => p.item.id === dataItem.item.id)
                    this.batchs.forEach(p => {
                        amount += p.qty
                    })
                    this.totalBatch = this.amtBatch - amount || 0
                } else {
                    this.addRowB()
                    this.totalBatch = dataItem.qtyReceived;
                }
                this.dialog = true
            }
        },
        async onloadDeliveryAgency() {
            await deliveryOrderHandler.getAllAgency().then((res) => {
                this.deliveryAgencies = res;
            });
        },
        numberEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 30,
                    min: 0,
                    max: options.model.source === 'purchase order' ? (options.model.qty - options.model.totalReceived) : 2 ^ 100000000
                });
        },
        headerTemplate() {
            return `<input type='checkbox' id='header-chb' class='k-checkbox header-checkbox'>`;
        },
        Help(key) {
            ShowResource(key);
        },
        dataSourceChanged(e) {
            if (e.field) {
                let dataRow = e.items[0];
                window.console.log(e, "data source change");
                switch (e.field) {
                    case "item":
                        kendo
                            .jQuery("tr[data-uid='" + dataRow.uid + "']")
                            .find(".isSerialNumber")
                            .each(function () {
                                if (dataRow.item.batchOrSerial == 2) {
                                    kendo.jQuery(this).removeClass("k-state-disabled");
                                } else {
                                    kendo.jQuery(this).addClass("k-state-disabled");
                                }
                            });
                        kendo
                            .jQuery("tr[data-uid='" + dataRow.uid + "']")
                            .find(".isBatch")
                            .each(function () {
                                if (dataRow.item.batchOrSerial === 1) {
                                    kendo.jQuery(this).removeClass("k-state-disabled");
                                } else {
                                    kendo.jQuery(this).addClass("k-state-disabled");
                                }
                            });
                        kendo
                            .jQuery("tr[data-uid='" + dataRow.uid + "']")
                            .find(".isUOM")
                            .each(function () {
                                if (dataRow.source === '') {
                                    kendo.jQuery(this).removeClass("k-state-disabled");
                                } else {
                                    kendo.jQuery(this).addClass("k-state-disabled");
                                }
                            });
                        break;
                    case "qty":
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
                kendo
                    .jQuery("tr[data-uid='" + dataItem.uid + "']")
                    .find(".isUOM")
                    .each(function () {
                        if (dataItem.source === '') {
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
                description: '',
                qty: 0,
                uom: {},
                totalReceived: 0,
                qtyReceived: 0,
                source: ''
            };
            let ds = this.$refs.dataSource.kendoWidget(),
                total = ds.total();
            ds.insert(total, data);
            this.qtyAdd = 0;
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
            if (options.model.source === '') {
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
                                        "&plId=" +
                                        this.receiptOrder.priceLevel.id +
                                        "&date=" +
                                        this.receiptOrder.date
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
            } else {
                return false
            }
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
        async onloadWarehouse() {
            await warehouseHandler.getWarehouseSettingAll().then(async (res) => {
                this.warehouses = res;
                if (this.warehouses.length > 0) {
                    this.receiptOrder.warehouse = this.warehouses[0];
                }
            });
        },
        async onChangeWarehouse() {
            // await this.loadZone(receiptOrder.warehouse.id)
        },
        async onChange(event) {
            const value = event.value;
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.showLoading = true;
            window.console.log(value);
            this.receiptOrder.supplier = value;
            this.receiptOrder.priceLevel = value.priceLevel;
            await this.loadPurchaseOrders()
            // await this.onloadPurchase(value.id);
        },
        async onloadPurchase(id) {
            await purchaseHandler.byCustomer(id).then((res) => {
                window.console.log(res, "list purchase by customer");
            });
            this.showLoading = false;
        },
        onFilterChange(event) {
            const filter = event.filter.value;
            this.requestData(0, filter, this.supplierBaseUrl);
            this.filter = filter;
        },
        requestData(skip, filter, baseUrl) {
            const url = baseUrl + `/${filter}`;
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    // window.console.log(response.json())
                    return response.json();
                })
                .then(this.afterFetch);
        },
        afterFetch(json) {
            this.supplierList = json.data;
        },
        async loadPrefix() {
            this.showLoading = true;
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    prefixHandler.get("receipt order").then((res) => {
                        if (res.data.statusCode === 200) {
                            // this.showLoading = false
                            this.transactionTypes = res.data.data;
                            if (this.transactionTypes.length > 0) {
                                this.receiptOrder.transactionType = this.transactionTypes[0];
                                if (this.$route.params.id === undefined) {
                                    this.generateNumber();
                                }
                            }
                        }
                    });
                }, 300);
            });
            // await this.onloadBatch();
            await this.onloadWarehouse();
            // await this.loadSaleChannel();
            // await this.loadLocation();
            await this.onloadDeliveryAgency();
            // await this.loadProjects()
            // await this.loadSegment()
            // await this.loadZone(this.warehouses[0].id)
            this.showLoading = false;
        },
        generateNumber() {
            let data = {
                abbr: this.receiptOrder.transactionType.abbr,
                structure: this.receiptOrder.transactionType.structure,
                transactionDate: this.receiptOrder.date,
                sequcencing: this.receiptOrder.transactionType.sequcencing,
                type: "Receipt Order",
                entity: 3,
            };
            this.receiptOrder.abbr = data.abbr;
            this.receiptOrder.structure = data.structure;
            this.receiptOrder.sequcencing = data.sequcencing;
            this.receiptOrder.type = data.type;
            this.receiptOrder.transactionDate = data.transactionDate;
            billingHandler
                .lastNumber(data)
                .then((response) => {
                    if (response.data.statusCode === 200) {
                        const res = response.data.data;
                        const lastNumber = this.zeroPad(
                            parseInt(res.lastNumber),
                            this.receiptOrder.transactionType.format
                        );
                        this.receiptOrder.number =
                            res.suffix +
                            this.receiptOrder.transactionType.numberSeparator +
                            lastNumber;
                        this.receiptOrder.lastNumber = res.suffix + lastNumber;
                        window.console.log(this.receiptOrder.number, "bom");
                    }
                })
                .catch((e) => {
                    this.errors.push(e);
                });
        },
        zeroPad(num, places) {
            return String(num).padStart(places, "0");
        },
        suffix(transactionDate) {
            return kendo.toString(new Date(transactionDate), `yymm`);
        },
        savePrint() {
        },
        async getDataSource() {
            let ds = this.$refs.dataSource.kendoWidget();
            let dataRow = ds.data();
            this.itemLines = [];
            dataRow.forEach((i) => {
                if (i.qtyReceived > 0 && i.source === 'purchase order') {
                    const line = i
                    line.totalReceived = i.qtyReceived
                    this.poItemLine.push({
                        item: i.item,
                        transactionType: this.purchaseOrder.transactionType,
                        uom: i.uom,
                        id: i.id,
                        number: this.purchaseOrder.number,
                        data: i.item.id,
                        qty: i.qty,
                        line: new ItemLineModel(line),
                        deleted: 0,
                        price: 0,
                        type: 'Purchase Order',
                        customer: {},
                        status: i.status,
                        createdAt: i.createdAt
                    })
                }
                this.itemLines.push({
                    id: i.id,
                    item: i.item,
                    qty: i.qty,
                    description: i.description,
                    uom: i.uom,
                    totalReceived: i.totalReceived,
                    qtyReceived: i.qtyReceived,
                });
            });
        },
        async saveNew() {
            this.showLoading = true;
            await this.getDataSource();
            window.console.log(this.poItemLine, this.purchaseOrder.id, 'poItemLine')
            if (this.poItemLine.length > 0) {
                await warehouseHandler.addItemLine(this.purchaseOrder.id, this.poItemLine).then(res => {
                    if (res.data.statusCode !== 200) {
                        this.$snotify.error('Error Update ItemLine!!!')
                    }
                })
            }
            this.receiptOrder.purchaseOrderId = this.purchaseOrder ? this.purchaseOrder.id : ''
            this.receiptOrder.purchaseOrderRef = this.purchaseOrder ? this.purchaseOrder.referenceNo : ''
            this.receiptOrder.itemLines = this.itemLines;
            this.receiptOrder.itemLinesSerial = this.itemLinesS
            this.receiptOrder.itemLinesBatch = this.itemLinesBatch
            this.receiptOrder.transactionDate = this.receiptOrder.date;
            receiptOrderHandler.save(this.receiptOrder).then((res) => {
                window.console.log(res);
                this.isClose = false
                this.cancel();
                this.showLoading = false;
            });
        },
        saveClose() {
        },
        errorMessage() {
        },
        accountDropDownEditor() {
        },
        cancel() {
            this.itemLines = []
            this.poItemLine = []
            this.itemLinesS = []
            this.itemLinesBatch = []
            this.batchs = []
            this.serials = []
            this.purchaseOrders = []
            this.purchaseOrder = {}
            this.itemBatch = {}
            this.receiptOrder = receiptOrder
            this.$router.go(-1);
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
        this.requestData(0, "", supplierHandler.url());
        this.addRow();
        await this.loadPrefix();
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
