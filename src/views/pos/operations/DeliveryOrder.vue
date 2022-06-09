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
                                        <h2 class="mb-0">{{ $t("delivery_order") }}</h2>
                                        <v-icon
                                            @click="cancel()"
                                            style="cursor: pointer;  font-size: 40px;"
                                            color="grey"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                    </v-card>

                                    <v-card
                                        outlined
                                        dense
                                        class="px-3 no_border mb-3"
                                        color="grayBg"
                                        height="170px"
                                    >
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{ $t("customer") }}</label>
                                                <v-col
                                                    sm="12"
                                                    cols="12"
                                                    class="kendo_dropdown_custom px-0 pb-4 pt-0"
                                                >
                                                    <dropdownlist
                                                        :data-items="customerList"
                                                        @change="onChange"
                                                        :value="deliveryOrder.customer"
                                                        :data-item-key="dataItemKey"
                                                        :text-field="textField"
                                                        :default-item="defaultItem"
                                                        :filterable="true"
                                                        @filterchange="onFilterChange"
                                                    >
                                                    </dropdownlist>
                                                </v-col>
                                                <label class="label">{{
                                                        $t("delivery_address")
                                                    }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    :items="deliveryAddress"
                                                    item-text="name"
                                                    item-value="id"
                                                    v-model="deliveryOrder.address"
                                                    tage="Delivery Address"
                                                    outlined
                                                />
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{ $t("date") }}</label>
                                                <app-datepicker
                                                    :initialDate="deliveryOrder.date"
                                                    @emitDate="deliveryOrder.date = $event"
                                                />
                                                <label class="label">{{ $t("warehouse") }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    :items="warehouses"
                                                    item-value="id"
                                                    item-text="name"
                                                    v-model="deliveryOrder.warehouse"
                                                    tage="Warehouse"
                                                    :rules="[(v) => !!v || 'Warehouse is required']"
                                                    return-object
                                                    outlined
                                                />
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{ $t("number") }}</label>
                                                <div class="mt-1 d-flex mr-0">
                                                    <div class="code_text flex-1 text-bold">
                                                        {{ deliveryOrder.abbr }}
                                                    </div>
                                                    <v-text-field
                                                        class="flex-2 custom-border "
                                                        v-model="deliveryOrder.number"
                                                        outlined
                                                        disabled
                                                        :rules="[(v) => !!v || 'Number is required']"
                                                        required
                                                    />
                                                    <v-icon
                                                        color="black"
                                                        size="30"
                                                        style="height: 40px"
                                                        class="border_qrcode ml-2"
                                                        @click="generateNumber"
                                                    >mdi-qrcode
                                                    </v-icon>
                                                </div>
                                                <label class="label">{{ $t("sale_order") }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    :items="saleOrders"
                                                    item-text="referenceNo"
                                                    item-value="id" @change="onChangeSO"
                                                    :loading="saleOrders.length <= 0 && showLoadingTxn"
                                                    v-model="saleOrder"
                                                    tage="Sale Order"
                                                    outlined return-object
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row color="white">
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <kendo-datasource
                                                ref="dataSource"
                                                :change="dataSourceChange"
                                                :data="deliveryOrder.itemLines"
                                            />
                                            <kendo-grid
                                                id="grid"
                                                class="grid-function"
                                                :data-source-ref="'dataSource'"
                                                :sortable="false"
                                                :filterable="false"
                                                :column-menu="true"
                                                v-on:databound="dataBound"
                                                :editable="true"
                                                :scrollable-virtual="true"
                                            >
                                                <kendo-grid-column
                                                    :command="{
                                                        iconClass: 'k-icon k-i-trash',
                                                        text: ' ',
                                                        name: 'remove',
                                                        click: removeRow,
                                                        class: 'btn-plus',
                                                      }"
                                                    :title="'&nbsp;'"
                                                    :width="60"
                                                    :headerAttributes="{style:
                                                          'text-align: right; background-color: #EDF1F5',
                                                      }"
                                                />
                                                <kendo-grid-column
                                                    :template="rowNumber"
                                                    :title="$t('no.')"
                                                    :width="55"
                                                    :column-menu="false"
                                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5;',
                                                        class: 'text-variants',
                                                      }"
                                                    :attributes="{ style: 'text-align: variants',}"
                                                />
                                                <kendo-grid-column
                                                    :field="'item'"
                                                    :title="$t('items')"
                                                    :width="200"
                                                    :template="'<span>#=item.name#</span>'"
                                                    :editor="ItemDropDownEditor"
                                                    :headerAttributes="{ style: 'background-color: #EDF1F5', }"
                                                />
                                                <kendo-grid-column
                                                    :field="'uom'"
                                                    :template="UOMTemplate"
                                                    :editor="UOMDropDownEditor"
                                                    :title="$t('uom')"
                                                    :width="130"
                                                    :headerAttributes="{ style: 'background-color: #EDF1F5',}"
                                                />
                                                <kendo-grid-column
                                                    :field="'qty'"
                                                    :editor="numberEditor"
                                                    :title="$t('ordered')"
                                                    :format="'{0:n}'"
                                                    :editable="function() {return false}"
                                                    :width="120"
                                                    :attributes="{style: 'text-align: right'}"
                                                    :headerAttributes="{ style: 'background-color: #EDF1F5', }"
                                                />
                                                <kendo-grid-column
                                                    :field="'totalReceived'"
                                                    :title="$t('total_received')"
                                                    :width="180"
                                                    :format="'{0:n}'"
                                                    :editable="function() {return false}"
                                                    :headerAttributes="{style:'text-align: right; background-color: #EDF1F5', }"
                                                    :attributes="{style: 'text-align: right'}"
                                                />
                                                <kendo-grid-column
                                                    :field="'qoh'"
                                                    :title="$t('on_hand')"
                                                    :width="180"
                                                    :format="'{0:n}'"
                                                    :editable="function() {return false}"
                                                    :headerAttributes="{style:'background-color: #EDF1F5', }"
                                                    :attributes="{style: 'text-align: right'}"
                                                />
                                                <kendo-grid-column
                                                    :field="'qtyReceived'"
                                                    :editor="numberEditor"
                                                    :title="$t('qty_received')"
                                                    :format="'{0:n}'"
                                                    :width="160"
                                                    :attributes="{style: 'text-align: right'}"
                                                    :headerAttributes="{ style: 'background-color: #EDF1F5', }"
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
                                        <v-col cols="12">
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
                                                <v-col sm="5" cols="12" class="py-0">
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
                                                <v-col sm="7" cols="12" class="py-0">
                                                    <v-row>
                                                        <v-col sm="6" cols="12" class="pb-0">
                                                            <label class="label  mb-0">{{
                                                                    $t("delivered_by")
                                                                }}</label>
                                                            <v-select
                                                                class="mt-1"
                                                                :items="deliveryAgencies"
                                                                :item-text="
                                                                  (item) =>
                                                                    item.cusSup
                                                                      ? `${
                                                                          item.aType === 1
                                                                            ? 'Internal'
                                                                            : 'External'
                                                                        } - ${item.cusSup.name}`
                                                                      : ''
                                                                "
                                                                item-value="id"
                                                                :rules="[ (v) => !!v || 'Delivered by is required' ]"
                                                                v-model="deliveryOrder.deliveredBy"
                                                                tage="Delivered by"
                                                                outlined
                                                            />
                                                            <label class="label  mb-0">{{
                                                                    $t("vehicle_number")
                                                                }}</label>
                                                            <v-text-field
                                                                class="mt-1"
                                                                v-model="deliveryOrder.vehicleNumber"
                                                                outlined
                                                                tage="Vehicle Number"
                                                                required
                                                            />
                                                        </v-col>
                                                        <v-col sm="6" cols="12" class="pb-0">
                                                            <label class="label mb-0">{{ $t("time") }}</label>
                                                            <v-menu
                                                                v-model="menu2"
                                                                :close-on-content-click="false"
                                                                :nudge-right="40"
                                                                ref="menu"
                                                                transition="scale-transition"
                                                                :return-value.sync="deliveryOrder.timeOfDischarged"
                                                                max-width="340"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-text-field
                                                                        class="mt-1"
                                                                        v-model="deliveryOrder.timeOfDischarged"
                                                                        readonly
                                                                        outlined
                                                                        append-icon="mdi-clock-time-four-outline"
                                                                        v-on="on"
                                                                        v-bind="attrs"
                                                                        @click:clear="deliveryOrder.timeOfDischarged = null "
                                                                        @click:append="menu2 = true"
                                                                        required
                                                                    />
                                                                </template>
                                                                <v-time-picker
                                                                    v-if="menu2"
                                                                    v-model="deliveryOrder.timeOfDischarged"
                                                                    full-width
                                                                    no-title
                                                                    @click:minute="$refs.menu.save(deliveryOrder.timeOfDischarged)"
                                                                ></v-time-picker>
                                                            </v-menu>
                                                            <label class="label  mb-0">{{
                                                                    $t("references")
                                                                }}</label>
                                                            <v-text-field
                                                                class="mt-1"
                                                                tage="Driver References"
                                                                v-model="deliveryOrder.driverReferences"
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
                                            color="primary"
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
                                                <label class="label">{{ $t("qty_received") }}</label>
                                                <h3 class="text-bold d-block py-1">{{ qtyReceived }}</h3>
                                            </v-col>
                                            <v-col sm="3" cols="3" class="py-1">
                                                <label class="label">{{ $t("qty_delivery") }}</label>
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
                                                :headerAttributes="{style: 'background-color: #EDF1F5', }"
                                            />
                                            <kendo-grid-column
                                                :field="'DQty'"
                                                :title="$t('delivery_qty')"
                                                :editor="numberEditorB"
                                                :width="140"
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
import {i18n} from "@/i18n";
import LoadingMe from "@/components/Loading";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import DeliveryOrder from "@/scripts/model/DeliveryOrder";
import {DropDownList as DropDownList2} from "@progress/kendo-vue-dropdowns";
// import { DropDownList as DropDownList1 } from "@progress/kendo-dropdowns-vue-wrapper";
import {KendoDataSource} from "@progress/kendo-datasource-vue-wrapper";
// import MonthOfPicker from "@/components/kendo_templates/MonthOfPicker";
import kendo from "@progress/kendo-ui";
import {ShowResource} from "@/observable/store";
import {uuid} from "vue-uuid";
import Vue from "vue";
import Row from "@/views/customers/settings/CheckboxTemplate";
import ItemLineModel from "@/scripts/invoice/model/ItemLine";

const rowTemplate = Vue.component(Row.name, Row);
const $ = require("jquery");
const deliveryOrderHandler = require("@/scripts/deliveryOrderHandler");
const customerHandler = require("@/scripts/customerHandler");
const productVariantHandler = require("@/scripts/productVariantHandler");
const prefixHandler = require("@/scripts/prefixHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const settingsHandler = require("@/scripts/settingsHandler");
const saleChannelHandler = require("@/scripts/saleChannelHandler");
const locationHandler = require("@/scripts/locationHandler");
const projectHandler = require("@/scripts/projectHandler");
const warehouseHandler = require("@/scripts/warehouseHandler");
const receiptOrderHandler = require("@/scripts/receiptOrderHandler");
const uomPriceHandler = require("@/scripts/uomPriceHandler");
const saleOrderHandler = require("@/scripts/transactionHandler");
const deliveryOrder = new DeliveryOrder({});
const keyField = "id";
const textField = "name";
const emptyItem = {[textField]: "loading ..."};
const itemLinePrefix = "lin-";
export default {
    name: "CreditPurchase",
    components: {
        LoadingMe: LoadingMe,
        // "k-dropdown": DropDownList1,
        "app-datepicker": DatePickerComponent,
        "kendo-datasource": KendoDataSource,
        dropdownlist: DropDownList2,
    },
    data: () => ({
        menu2: false,
        isEdit: false,
        dialog: false,
        dialogS: false,
        showLoadingB: false,
        showLoadingTxn: false,
        // LoadingMe
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: "",
        loadingTextAlert: "",
        alert: false,
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
        warehouses: [],
        saleChannelList: [],
        projects: [],
        locations: [],
        segments: [],
        itemLines: [],
        itemLinesS: [],
        itemLinesBatch: [],
        customerList: [],
        dataItemKey: "id",
        textField: "name",
        defaultItem: {[textField]: "Select supplier...", [keyField]: null},
        customerBaseUrl: customerHandler.search(),
        filter: "",
        invoices: [],
        saleOrders: [],
        saleOrder: {},
        soItemLine: [],
        deliveryOrder: deliveryOrder,
        deliveryAgencies: [],
        balanceWarehouse: {},
        deliveryAddress: [],
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
                window.console.log(resultCen);
                if (resultCen.value) {
                    this.deliveryOrder = deliveryOrder;
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
                        if (dataItem.batchOrSerial !== '') {
                            kendo.jQuery(this).removeClass("k-state-disabled");
                        } else {
                            kendo.jQuery(this).addClass("k-state-disabled");
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
                                if (dataRow.item.batchOrSerial !== '') {
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
            if (dataItem.item.batchOrSerial === 2 && dataItem.qtyReceived > 0) {
                if (this.itemLinesS.length > 0) {
                    this.serials = this.itemLinesS.filter(p => p.item.id === dataItem.item.id)
                } else {
                    const instituteId = this.$store.state.institute.institute.id
                    receiptOrderHandler.getBatch(dataItem.item.id, this.deliveryOrder.warehouse.id, instituteId, 'serial').then(res => {
                        window.console.log(res, 'serial')
                        if (res.length > 0) {
                            this.qtySerial = dataItem.qtyReceived;
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
                            this.$snotify.error('This item ' + dataItem.item.name + ' no serial')
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
                        id: i.id,
                        item: i.item,
                        uom: i.uom,
                        number: i.number,
                        whId: i.whId,
                        expirationDate: i.expirationDate,
                        qty: i.qty,
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
                amount += i.DQty
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
                    max: options.model.qty
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
                        if (dataRow.DQty > 0) {
                            this.calcuateBatch()
                        }
                        break;
                    case "expirationDate":
                        if (dataRow.DQty > 0) {
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
                    case "DQty":
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
            if (dataItem.item.batchOrSerial === 1 && dataItem.qtyReceived > 0) {
                const instituteId = this.$store.state.institute.institute.id
                receiptOrderHandler.getBatch(dataItem.item.id, this.deliveryOrder.warehouse.id, instituteId, 'batch').then(res => {
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
                                DQty: o.DQty || 0,
                                status: o.qty,
                                createdAt: o.createdAt,
                                pk: o.id
                            })
                            amount += o.qty
                        })
                        this.amtBatch = amount
                        this.qtyReceived = dataItem.qtyReceived
                        this.totalBatch = dataItem.qtyReceived
                        this.dialog = true
                    } else {
                        this.$snotify.error('This item ' + dataItem.item.name + ' no stock in warehouse')
                    }
                })
            }
            this.showLoadingB = false
        },

        ExpirationDateToEditor(container, options) {
            kendo
                .jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDatePicker();
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
        Help(key) {
            ShowResource(key);
        },
        numberEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 30,
                    min: 0,
                    max: this.balanceWarehouse.bQty,
                });
        },
        async onloadDeliveryAgency() {
            await deliveryOrderHandler.getAllAgency().then((res) => {
                this.deliveryAgencies = res;
            });
        },
        async addItemLine(data) {
            window.console.log(data, "data234");
            this.deliveryOrder.itemLines = [];
            data.isAdd = 1;
            for (const i of data.itemLines) {
                window.console.log(i.item, "itemlines");
                await this.getBalanceWarehouse(i.item.id);
                let balance = 0,
                    qty = 0;
                if (Object.keys(this.balanceWarehouse).length !== 0) {
                    if (this.balanceWarehouse.bQty > 0) {
                        balance = this.balanceWarehouse.bQty;
                        if (this.balanceWarehouse.bQty < i.qty) {
                            qty = this.balanceWarehouse.bQty;
                        }
                    } else {
                        this.$snotify.warning(
                            "Please check stock of this item : " + i.item.name
                        );
                        continue;
                    }
                } else {
                    this.$snotify.warning(
                        "Please check stock of this item : " + i.item.name
                    );
                    continue;
                }
                this.deliveryOrder.itemLines.push({
                    id: i.id,
                    item: i.item,
                    balance: balance,
                    description: i.description,
                    orderQty: i.qty,
                    qty: qty,
                    uom: i.uom,
                    invoiceId: data.id,
                    type: data.type,
                });
            }
        },
        async getBalanceWarehouse(id) {
            window.console.log(
                this.deliveryOrder.date,
                this.deliveryOrder.warehouse.id,
                "balance warehouse"
            );
            const data = {
                itmId: id,
                date: this.deliveryOrder.date ? this.deliveryOrder.date : new Date(),
                whId: this.deliveryOrder.warehouse
                    ? this.deliveryOrder.warehouse.id
                    : "",
            };
            await warehouseHandler.getBalance(data).then((res) => {
                if (res.length > 0) {
                    this.balanceWarehouse = res[0];
                } else {
                    this.balanceWarehouse = {
                        bQty: 0
                    }
                }
                window.console.log(this.balanceWarehouse, "balance warehouse");
            });
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
                        }
                    });
                kendo
                    .jQuery("tr[data-uid='" + dataItem.uid + "']")
                    .find(".isBatch")
                    .each(function () {
                        if (dataItem.item.batchOrSerial == 1) {
                            kendo.jQuery(this).removeClass("k-state-disabled");
                        }
                    });
            });
        },
        dataSourceChange(e) {
            if (e.field) {
                let dataRow = e.items[0];
                switch (e.field) {
                    case "item":
                        this.getBalanceWarehouse(dataRow.item.id).then(() => {
                            dataRow.set(
                                "qoh",
                                this.balanceWarehouse ? this.balanceWarehouse.bQty : 0
                            );
                        });
                        kendo
                            .jQuery("tr[data-uid='" + dataRow.uid + "']")
                            .find(".isSerialNumber")
                            .each(function () {
                                if (dataRow.item.batchOrSerial == 2) {
                                    kendo.jQuery(this).removeClass("k-state-disabled");
                                }
                            });
                        kendo
                            .jQuery("tr[data-uid='" + dataRow.uid + "']")
                            .find(".isBatch")
                            .each(function () {
                                if (dataRow.item.batchOrSerial === 1) {
                                    kendo.jQuery(this).removeClass("k-state-disabled");
                                }
                            });
                        break;
                    default:
                        break;
                }
            }
        },
        addRow() {
            let data = {
                id: itemLinePrefix + uuid.v1(),
                item: {name: ""},
                qty: 0,
                totalReceived: 0,
                qoh: 0,
                description: "",
                uom: {},
                qtyReceived: 0,
                source: ''
            };
            let ds = this.$refs.dataSource.kendoWidget(),
                total = ds.total();
            ds.insert(total, data);
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
                                    "&plId=" +
                                    this.deliveryOrder.priceLevel.id +
                                    "&date=" +
                                    this.deliveryOrder.date
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
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.segments = [];
                    settingsHandler
                        .getSeg()
                        .then((res) => {
                            if (res.data.statusCode === 200) {
                                this.segments = res.data.data;
                                if (this.segments.length > 0) {
                                    this.deliveryOrder.segment = this.segments[0];
                                }
                                // this.segmentList = res.data.data
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 300);
            });
        },
        async loadLocation() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.locations = [];
                    locationHandler
                        .list()
                        .then((res) => {
                            if (res.data.statusCode === 200) {
                                this.locations = res.data.data;
                                if (this.locations.length > 0) {
                                    this.deliveryOrder.location = this.locations[0];
                                }
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 300);
            });
        },
        async loadSaleChannel() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    saleChannelHandler.get().then((res) => {
                        if (res.data.statusCode === 200) {
                            this.saleChannelList = res.data.data;
                            if (this.saleChannelList.length > 0) {
                                this.deliveryOrder.saleChannel = this.saleChannelList[0];
                            }
                        } else {
                            this.showLoading = false;
                        }
                    });
                }, 300);
            });
        },
        async loadProjects() {
            await projectHandler.list().then((res) => {
                this.projects = res.data.data;
                if (this.projects.length > 0) {
                    this.deliveryOrder.project = this.projects[0];
                }
            });
        },
        async onloadWarehouse() {
            warehouseHandler.getWarehouseSettingAll().then((res) => {
                this.warehouses = res;
                if (this.warehouses.length > 0) {
                    this.deliveryOrder.warehouse = this.warehouses[0];
                }
            });
        },
        async onChange(event) {
            const value = event.value;
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.showLoading = true;
            window.console.log(value);
            this.deliveryOrder.customer = value;
            this.deliveryOrder.priceLevel = value.priceLevel;
            await this.loadSaleOrders()
            this.showLoading = false;
            // await this.onloadPurchase()
        },
        onChangeInvoice(e) {
            let selectedIndex = e.sender.select();
            let selectedItem = e.sender.dataItem(selectedIndex).toJSON();
            this.addItemLine(selectedItem);
            if (
                Object.keys(selectedItem.deliveryAddress).length !== 0 &&
                selectedItem.deliveryAddress === Object
            ) {
                this.deliveryAddress = [selectedItem.deliveryAddress];
                this.deliveryOrder.address = this.deliveryAddress[0];
            }
            window.console.log(selectedItem, "invoice change");
        },
        onFilterChange(event) {
            const filter = event.filter.value;
            this.requestData(0, filter, this.customerBaseUrl);
            this.filter = filter;
        },
        requestData(skip, filter, baseUrl) {
            const url = baseUrl + `?filter=${filter}`;
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    // window.console.log(response.json())
                    return response.json();
                })
                .then(this.afterFetch);
        },
        afterFetch(json) {
            this.customerList = json.data;
        },
        async loadPrefix() {
            this.showLoading = true;
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    prefixHandler.get("delivery order").then((res) => {
                        if (res.data.statusCode === 200) {
                            // this.showLoading = false
                            this.transactionTypes = res.data.data;
                            if (this.transactionTypes.length > 0) {
                                this.deliveryOrder.transactionType = this.transactionTypes[0];
                                if (this.$route.params.id === undefined) {
                                    this.generateNumber();
                                }
                            }
                        }
                    });
                }, 300);
            });
            await this.onloadWarehouse();
            // await this.loadSaleChannel();
            // await this.loadLocation()
            // await this.loadProjects()
            // await this.loadSegment()
            await this.onloadDeliveryAgency();
            this.showLoading = false;
        },
        generateNumber() {
            let data = {
                abbr: this.deliveryOrder.transactionType.abbr,
                structure: this.deliveryOrder.transactionType.structure,
                transactionDate: this.deliveryOrder.date,
                sequcencing: this.deliveryOrder.transactionType.sequcencing,
                type: "Delivery Order",
                entity: 3,
            };
            this.deliveryOrder.abbr = data.abbr;
            this.deliveryOrder.structure = data.structure;
            this.deliveryOrder.sequcencing = data.sequcencing;
            this.deliveryOrder.type = data.type;
            this.deliveryOrder.transactionDate = data.transactionDate;
            billingHandler
                .lastNumber(data)
                .then((response) => {
                    if (response.data.statusCode === 200) {
                        const res = response.data.data;
                        const lastNumber = this.zeroPad(
                            parseInt(res.lastNumber),
                            this.deliveryOrder.transactionType.format
                        );
                        this.deliveryOrder.number =
                            res.suffix +
                            this.deliveryOrder.transactionType.numberSeparator +
                            lastNumber;
                        this.deliveryOrder.lastNumber = res.suffix + lastNumber;
                        window.console.log(this.deliveryOrder.number, "bom");
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
                if (i.qtyReceived > 0 && i.source === 'sale order') {
                    const line = i
                    line.totalReceived = i.qtyReceived
                    this.poItemLine.push({
                        item: i.item,
                        transactionType: this.saleOrder.transactionType,
                        uom: i.uom,
                        id: i.id,
                        number: this.saleOrder.number,
                        data: i.item.id,
                        qty: i.qty,
                        line: new ItemLineModel(line),
                        deleted: 0,
                        price: 0,
                        type: 'Sale Order',
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
                // if (i.invoiceId === undefined && i.type === undefined) {
                //     i.invoiceId = "";
                //     i.type = "";
                // }
                // this.itemLines.push({
                //     id: i.id,
                //     item: i.item,
                //     qty: i.qty,
                //     uom: i.uom,
                //     description: i.description,
                //     invoiceId: i.invoiceId,
                //     type: i.type,
                // });
            });
            window.console.log(this.itemLines);
        },
        async saveNew() {
            this.showLoading = true;
            await this.getDataSource();
            if (this.soItemLine.length > 0) {
                await warehouseHandler.addItemLine(this.saleOrder.id, this.soItemLine).then(res => {
                    if (res.data.statusCode !== 200) {
                        this.$snotify.error('Error Update ItemLine!!!')
                    }
                })
            }
            this.deliveryOrder.saleOrderId = this.saleOrder ? this.saleOrder.id : ''
            this.deliveryOrder.saleOrderRef = this.saleOrder ? this.saleOrder.referenceNo : ''
            this.deliveryOrder.itemLines = this.itemLines;
            this.deliveryOrder.itemLinesSerial = this.itemLinesS
            this.deliveryOrder.itemLinesBatch = this.itemLinesBatch
            deliveryOrderHandler.save(this.deliveryOrder).then((res) => {
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
            this.itemLinesS = []
            this.itemLinesBatch = []
            this.batchs = []
            this.serials = []
            this.saleOrders = []
            this.saleOrder = {}
            this.itemBatch = {}
            this.amtBatch = 0
            this.qtyReceived = 0
            this.totalBatch = 0
            this.qtyDelivery = 0
            this.qtySerial = 0
            this.deliveryOrder = deliveryOrder
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
        this.addRow();
        this.requestData(0, "", customerHandler.search());
        await this.loadPrefix();
        // await customerHandler.center().then(res => {
        //     window.console.log(res, 'customer center')
        // })
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

.color_green {
    color: #03b154;
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
    padding: 12px 12px 0 12px;
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
