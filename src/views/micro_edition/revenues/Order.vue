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
                class="py-0 pr-2"
                sm="12"
                cols="12"
                style="transition: 0.3s ease-in"
                :class="{ hide_big_bar_class: isHideBar }"
              >
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card
                    outlined
                    dense
                    class="no_border d-flex justify-space-between"
                  >
                    <h2 class="mb-0">{{ saleFormContent.saleOrder }}</h2>
                    <div class="d-flex justify-end">
                      <h3
                        style="color: #b3b5bc; font-size: 20px"
                        class="text-uppercase all_center"
                      >
                        <span class="pointer" @click="Help('sale order')">{{
                          $t("help")
                        }}</span>
                        <v-icon
                          @click="cancel()"
                          style="cursor: pointer; color: #333; font-size: 40px"
                          class="float-right mt-n1"
                          >close
                        </v-icon>
                      </h3>
                    </div>
                  </v-card>
                  <v-card
                    outlined
                    dense
                    class="px-3 mb-3 rounded-4 no_border"
                    color="grayBg"
                  >
                    <v-row>
                      <v-col sm="4" cols="12" class="pb-0">
         
                        <label class="label mb-0">{{
                          $t("customer")
                        }}</label>
                        <div class="kendo_dropdown_custom pb-2 mt-1">
                          <dropdownlist
                            class="v-input__slot"
                            :data-items="customerList"
                            @change="onChange"
                            :rules="[(v) => !!v || 'Customer is required']"
                            :value="customer"
                            :data-item-key="dataItemKey"
                            :text-field="textField"
                            :default-item="defaultItem"
                            :filterable="true"
                            @filterchange="onFilterChange"
                            :required="true"
                            :valid="validCustomer"
                            :disabled="isEdit"
                          >
                          </dropdownlist>
                        </div>
                        <label class="label" style="">{{ $t("date") }}</label>
                        <app-datepicker
                          :initialDate="saleOrder.transactionDate"
                          @onChanged="onSaleOrderDateChanged"
                          @emitDate="saleOrder.transactionDate = $event"
                        />
                      </v-col>
                      <v-col sm="4" cols="12">
                        <label class="label">{{ $t("number") }}</label>
                        <div class="mt-1  d-flex mr-0">
                          <div class="code_text flex-1 text-bold">
                            {{ saleOrder.transactionType.abbr }}
                          </div>
                          <v-text-field
                            class="flex-2 custom-border"
                            disabled
                            v-model="saleOrder.number"
                            outlined
                            :rules="[(v) => !!v || 'Number is required']"
                            required
                          />
                          <v-icon
                            color="black"
                            size="30"
                            style="height: 40px"
                            class="border_qrcode ml-1"
                            :disabled="disabledMe"
                            @click="generateNumber"
                            >mdi-qrcode
                          </v-icon>
                        </div>
                        <label class="label mb-0">{{
                          $t("price_level")
                        }}</label>
                        <v-select
                          class="mt-1"
                          v-model="saleOrder.priceLevel"
                          :items="priceLevel"
                          :rules="[
                            (v) => !!v['id'] || 'Price level is required',
                          ]"
                          @change="onPriceLevelChange"
                          item-value="id"
                          item-text="name"
                          return-object
                          placeholder="Price Level"
                          outlined
                        />
                      </v-col>
                      <v-col sm="4" cols="12">
                        <div>
                          <label class=" mb-0">{{ $t("currency") }}</label>
                          <p class="text-bold pt-4 pb-2">{{ currencyCode }}</p>
                        </div>
                        <label class="label mb-0">{{
                          $t("sale_channel")
                        }}</label>
                        <v-select class="mt-1" outlined />
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-row class="pt-1 px-3" style="background-color: #fff">
                    <v-col sm="12" cols="12" class="pt-0 pb-1 px-0">
                      <kendo-datasource
                        ref="itemLineDS"
                        :data="itemLines"
                        :change="dataSourceChanged"
                      />
                      <kendo-grid
                        id="gridItemLineSaleOrder"
                        class="grid-function"
                        :data-source-ref="'itemLineDS'"
                        :sortable="false"
                        :column-menu="true"
                        :editable="true"
                        :scrollable-virtual="true"
                      >
                        <kendo-grid-column
                          :command="{
                            iconClass: 'k-icon k-i-trash',
                            text: ' ',
                            click: removeRow,
                            className: 'btn-plus',
                          }"
                          :title="''"
                          :width="63"
                          :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :title="$t('no.')"
                          :width="53"
                          :column-menu="false"
                          :template="rowNumberTmpl"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5;',
                            class: 'text-products',
                          }"
                          :attributes="{ style: 'text-align: products' }"
                        />
                        <kendo-grid-column
                          :field="'item'"
                          :title="$t('item')"
                          :template="itemTemplate"
                          :editor="ItemDropDownEditor"
                          :width="200"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'description'"
                          :title="$t('description')"
                          :template="'<span>#=description#</span>'"
                          :width="200"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'uom'"
                          :title="$t('uom')"
                          :width="100"
                          :template="UOMTemplate"
                          :editor="UOMDropDownEditor"
                          :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: left' }"
                        />
                        <kendo-grid-column
                          :field="'qty'"
                          :title="$t('qty')"
                          :format="'{0:n}'"
                          :template="'<span>#=qty#</span>'"
                          :width="100"
                          :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: left;' }"
                        />
                        <kendo-grid-column
                          :field="'price'"
                          :title="$t('price')"
                          :width="150"
                          :template="priceFormat"
                          :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: left' }"
                        />
                        <kendo-grid-column
                          :field="'amount'"
                          :title="$t('amount')"
                          :width="150"
                          :editable="
                            () => {
                              return false;
                            }
                          "
                          :template="amountFormat"
                          :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: left' }"
                        />
                        <kendo-grid-column
                          :field="'vatTax'"
                          :title="$t('vat')"
                          :width="200"
                          :template="vatTemplate"
                          :hidden="appType != 'npo' ? false : true"
                          :editor="VatTaxDropDownEditor"
                          :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: left' }"
                        />
                        <kendo-grid-column
                          :field="'serviceDate'"
                          :title="$t('date_from')"
                          :width="160"
                          :hidden="!saleFormContent.serviceDate"
                          :template="'<span>#= kendo.toString(new Date(serviceDate), dateFormat)#</span>'"
                          :editor="ServiceDateEditor"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'serviceDateTo'"
                          :title="$t('date_to')"
                          :width="160"
                          :hidden="!saleFormContent.serviceDateTo"
                          :template="'<span>#= kendo.toString(new Date(serviceDateTo), dateFormat)#</span>'"
                          :editor="ServiceDateToEditor"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'modifier'"
                          :title="$t('modifier')"
                          :width="200"
                          :hidden="!saleFormContent.modifier"
                          :template="'<span>#=modifier.name?modifier.name:``#</span>'"
                          :editor="ModifierDropDownEditor"
                          :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: left' }"
                        />
                        <kendo-grid-column
                          :field="'discountItem'"
                          :title="$t('discount_item')"
                          :width="200"
                          :hidden="!saleFormContent.discountItem"
                          :template="discountItemTemplate"
                          :editor="DiscountItemDropDownEditor"
                          :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: left' }"
                        />
                        <kendo-grid-column
                          :field="'specificTax'"
                          :title="$t('specificTax')"
                          :width="200"
                          :hidden="!saleFormContent.specificTax"
                          :template="'<span>#=specificTax.defaultTax?specificTax.defaultTax:``#</span>'"
                          :editor="SpecificTaxDropDownEditor"
                          :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: left' }"
                        />
                        <kendo-grid-column
                          :field="'otherTax'"
                          :title="$t('otherTax')"
                          :width="200"
                          :hidden="!saleFormContent.otherTax"
                          :template="'<span>#=otherTax.defaultTax?otherTax.defaultTax:``#</span>'"
                          :editor="OtherTaxDropDownEditor"
                          :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: left' }"
                        />
                        <kendo-grid-column
                          :field="'publicLightingTax'"
                          :title="$t('pl_tax')"
                          :width="200"
                          :hidden="!saleFormContent.publicLightingTax"
                          :template="'<span>#=publicLightingTax.defaultTax?publicLightingTax.defaultTax:``#</span>'"
                          :editor="PublicLightingTaxDropDownEditor"
                          :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: left' }"
                        />
                        <kendo-grid-column
                          :field="'saleUnit'"
                          :title="$t('sale_unit')"
                          :width="200"
                          :hidden="!saleFormContent.saleUnit"
                          :template="saleUnitTemplate"
                          :editor="SaleUnitDropDownEditor"
                          :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: left' }"
                        />
                        <kendo-grid-column
                          :field="'employee'"
                          :title="$t('employee')"
                          :width="200"
                          :hidden="!saleFormContent.employee"
                          :template="empImpl"
                          :editor="EmployeeDropDownEditor"
                          :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: left' }"
                        />
                      </kendo-grid>
                    </v-col>
                    <v-col sm="12" cols="12" class="pt-0 pl-0">
                      <v-btn class="float-left btn_plus" @click="addRow">
                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col sm="12" cols="12" class="py-0">
                      <v-row>
                        <v-row>
                          <v-col class="pt-0" sm="5" cols="6">
                          </v-col>
                          <v-col class="pt-0" sm="7" cols="12">
                            <v-simple-table>
                              <template v-slot:default>
                                <tbody>
                                  <tr v-if="appType != 'npo'">
                                    <td class="text-left pr-0">
                                      {{ $t("subtotal") }}
                                    </td>
                                    <td class="text-center">:</td>
                                    <td class="text-right">
                                      {{ numberFormat(saleOrder.subTotal) }}
                                    </td>
                                  </tr>
                                  <tr v-if="appType != 'npo'">
                                    <td class="text-left pr-0">
                                      {{ $t("general_discount") }}
                                    </td>
                                    <td class="text-center">:</td>
                                    <td class="text-right">
                                      ({{
                                        numberFormat(saleOrder.discountTotal)
                                      }})
                                    </td>
                                  </tr>
                                  <tr style="background: #f8f8f9">
                                    <td class="text-left text-uppercase pr-0">
                                      {{ $t("total") }}
                                    </td>
                                    <td class="text-center">:</td>
                                    <td
                                      class="text-right primary--text text-bold"
                                      id="total"
                                    >
                                      {{ numberFormat(saleOrder.total) }}
                                    </td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                          </v-col>
                        </v-row>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-divider />
                  <v-card outlined dense class="no_border function_footer">
                    <v-alert type="warning" v-model="alert" dismissible>
                      <span v-html="errorMessage" />
                    </v-alert>
                    <v-menu>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="mr-2 float-left select_template"
                          v-on="on"
                        >
                          {{ $t("select_template") }}
                          <v-icon size="" class="ma-1">expand_more</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(item, index) in formAR"
                          :key="index"
                        >
                          <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <v-btn
                      class="text-capitalize black--text float-left"
                      color="primary"
                      outlined
                      @click="cancel"
                      >{{ $t("cancel") }}
                    </v-btn>
                    <!--                    <v-menu>-->
                    <!--                      <template v-slot:activator="{ on }">-->
                    <!--                        <v-btn class="ml-2 float-right text-capitalize  white&#45;&#45;text"-->
                    <!--                               color="primary" v-on="on">-->
                    <!--                          {{ $t('save_option') }}-->
                    <!--                          <v-icon size="" class="ma-1">expand_more</v-icon>-->
                    <!--                        </v-btn>-->
                    <!--                      </template>-->
                    <!--                      <v-list rounded>-->
                    <!--                        <v-list-item-group>-->
                    <!--                          <v-list-item>-->
                    <!--                            <v-list-item-content>-->
                    <!--                              <v-list-item-title v-if="!isEdit" @click="saveNew">-->
                    <!--                                {{ $t('save_new') }}-->
                    <!--                              </v-list-item-title>-->
                    <!--                            </v-list-item-content>-->
                    <!--                          </v-list-item>-->
                    <!--                          <v-list-item>-->
                    <!--                            <v-list-item-content>-->
                    <!--                              <v-list-item-title @click="saveClose">{{-->
                    <!--                                  $t('save_close')-->
                    <!--                                }}-->
                    <!--                              </v-list-item-title>-->
                    <!--                            </v-list-item-content>-->
                    <!--                          </v-list-item>-->

                    <!--                        </v-list-item-group>-->
                    <!--                      </v-list>-->
                    <!--                    </v-menu>-->
                    <v-btn
                      @click="saveClose"
                      class="float-right text-capitalize white--text"
                      :disabled="btnDisabled"
                      color="primary"
                    >
                      {{ $t("save_close") }}
                    </v-btn>
                    <v-btn
                      color="secondary"
                      style="margin-right: 10px !important"
                      :disabled="btnDisabled"
                      class="white--text float-right text-capitalize"
                      @click="saveNew"
                      :hidden="hiddenButton"
                      >{{ $t("save_new") }}
                    </v-btn>
                  </v-card>
                </v-form>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <LoadingMe
        :isLoading="showLoading"
        :fullPage="false"
        :myLoading="true"
        type="loading"
        :alertMessage="loadingAlert"
        :color="loadingColorAlert"
        :alertText="loadingTextAlert"
      />
      <v-dialog v-model="dialogCatalog" max-width="850px">
        <v-card>
          <div class="modal_header">
            <v-card-title>{{ $t("catalog") }}</v-card-title>
            <v-icon class="btn_close" @click="dialogCatalog = false"
              >close
            </v-icon>
          </div>
          <v-card-text class="modal_text_conent">
            <v-row>
              <v-col sm="12" cols="12" class="pb-0">
                <v-simple-table>
                  <kendo-datasource
                    ref="catalogDatasource"
                    :data="catalogs"
                    :schema="gridSchema"
                  />
                  <kendo-grid
                    id="gridCatalog"
                    class="grid-function"
                    :data-source-ref="'catalogDatasource'"
                    :style="{ width: '100%' }"
                    :noRecords="true"
                    :pageable-numeric="false"
                    :pageable-previous-next="false"
                    :pageable-messages-display="'Showing {2} data items'"
                    :scrollable-virtual="true"
                  >
                    <kendo-grid-column
                      :field="'images'"
                      :title="$t('image')"
                      :width="50"
                      :template="loadImage"
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="'number'"
                      :title="$t('number')"
                      :width="70"
                      :template="'<span>#=number#</span>'"
                      :groupHeaderColumnTemplate="'#=value#'"
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="'name'"
                      :title="$t('name')"
                      :attributes="{ class: 'tb_name_td' }"
                      :width="100"
                      :template="'<span>#=name#</span>'"
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="'description'"
                      :title="$t('description')"
                      :width="100"
                      :template="'<span>#=description#</span>'"
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="'noOfProduct'"
                      :title="$t('products')"
                      :template="'<span>#=noOfProduct#</span>'"
                      :width="50"
                      :headerAttributes="{
                        style: 'text-align: left; background-color: #EDF1F5',
                      }"
                    />
                    <kendo-grid-column
                      :field="''"
                      :title="$t('action')"
                      :width="60"
                      :command="[{ text: $t('add'), click: addCatalog }]"
                      :headerAttributes="{
                        style: 'text-align: left; background-color: #EDF1F5',
                      }"
                    />
                  </kendo-grid>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>
<script>
import {i18n} from "@/i18n";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import kendo from "@progress/kendo-ui";
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import SaleFormContentModel from "@/scripts/model/SaleFormContent";
import ItemLineModel from "@/scripts/invoice/model/ItemLine";
import {uuid} from "vue-uuid";
import SaleOrderModel from "@/scripts/model/Transaction";

/* Store */
import store from "@/store";

const institute = store.state.institute.institute;

import {ShowResource} from "@/observable/store";
import paymentTermHandler_ from "@/scripts/paymentterm/handler/paymentTermHandler";
import creditLimitHandler from "@/scripts/creditLimit/handler/creditLimitHandler";
import Helper from "@/helper";
import transactionHandler from "@/scripts/transactionHandler";
import {dataStore} from "@/observable/store";

////handler
const saleOrderHandler = require("@/scripts/transactionHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const customerHandler = require("@/scripts/customerHandler");
const projectHandler = require("@/scripts/projectHandler");
const prefixHandler = require("@/scripts/prefixHandler");
const paymentTermHandler = require("@/scripts/paymentTermHandler");
const priceLevelHandler = require("@/scripts/priceLevelHandler");
const saleFormContentHandler = require("@/scripts/saleFormContentHandler");
const employeeHandler = require("@/scripts/employeeHandler");
const itemModifierHandler = require("@/scripts/itemModifierHandler");
const discountItemHandler = require("@/scripts/discountItemHandler");
const uomPriceHandler = require("@/scripts/uomPriceHandler");
const productVariantHandler = require("@/scripts/productVariantHandler");
const otherChargeHandler = require("@/scripts/otherChargeHandler");
const locationHandler = require("@/scripts/locationHandler");
const settingsHandler = require("@/scripts/settingsHandler");
const saleChannelHandler = require("@/scripts/saleChannelHandler");
const saleUnitItemHandler = require("@/scripts/saleUnitItemHandler");
const settingHandler = require("@/scripts/settingHandler");
const catalogHandler = require("@/scripts/catalogHandler");
const productHandler = require("@/scripts/productHandler");
const currencyHandler = require("@/scripts/currency/handler/currencyHandler");
const supplierHandler = require("@/scripts/supplierHandler");

const saleFormContentModel = new SaleFormContentModel({});
const itemLineModel = new ItemLineModel({});
//other
const $ = kendo.jQuery
const textField = "numberName";
const keyField = "id";
const defaultItem = {[textField]: "Select Customer...", [keyField]: null};
const defaultSupItem = {[textField]: "Select Supplier...", [keyField]: null};
const defaultEmpItem = {[textField]: "Select Employee...", [keyField]: null};
const emptyItem = {[textField]: "loading ..."};
const invoicePrefix = "lin-";
const DISCOUNT_TYPE = "?type=Sale";
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
export default {
    name: "SaleOrder",
    props: {
        id: {
            type: String,
        },
        initSaleOrder: {
            type: SaleOrderModel,
        },
    },
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": DatePickerComponent,
        dropdownlist: DropDownList,
        // "app-monthof-picker": () => import("@/components/kendo_templates/MonthOfPicker"),
    },
    data: () => ({
        saleOrder: new SaleOrderModel(),
        isEdit: false,
        numSelect: [1],
        dialogTax: false,
        theDate: "",
        //Catalog
        dialogCatalog: false,
        gridSchema: {
            model: {
                id: "id",
            },
        },
        imgURL: "https://s3-ap-southeast-1.amazonaws.com/images.banhji/",
        // LoadingMe
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: "",
        loadingTextAlert: "",
        bill_date: "",
        alert: false,
        files: [],
        errors: [],
        // Form validation
        valid: true,
        templates: [
            {title: "Draft"},
            {title: "Open"},
            {title: "Partially Closed"},
            {title: "Closed"},
        ],
        saleOrderType: 1,
        saleOrderTypes: [
            {name: "Standard Order", id: 1},
            {name: "Open Order", id: 2},
            {name: "Contract", id: 3},
            {name: "Consignment Order", id: 4},
            // {name: 'Order required Purchase', id: 5},
        ],
        isRequredPurchase: false,
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,
        filter: "",
        textField: "numberName",
        dataItemKey: "id",
        defaultItem: defaultItem,
        defaultSupItem: defaultSupItem,
        defaultEmpItem: defaultEmpItem,
        mOtherCharge: [],
        //item
        itemLines: [],
        itemLine: itemLineModel,
        dateFormat: itemLineModel.dateFormat,
        //customer
        cusBaseUrl: customerHandler.searchv1(),
        customer: {},
        customerList: [],
        supplierList: [],
        supplier: {},
        supBaseUrl: supplierHandler.search(),
        billingAddress: [],
        deliveryAddress: [],
        priceLevel: [],
        //date
        paymentTerms: [],
        transactions: [],
        employeeList: [],
        employee: {},
        empBaseUrl: employeeHandler.searchURL(),
        saleChannelList: [],
        locations: [],
        customerProjects: [],
        segments: [],
        transactionType: {},
        taxListTotal: {},
        customerDiscountItem: [],
        customerSaleUnit: [],
        saleFormContent: saleFormContentModel,
        transactionDate: new Date().toISOString().substr(0, 10),
        monthOf: false,
        deliveryDateTime: new Date(),
        validityDate: new Date().toISOString().substr(0, 10),
        specificDiscountItem: [],
        otherChargeList: [],
        saleUnitItemList: [],
        otherTax: [],
        specificTax: [],
        publicLightingTax: [],
        vatTax: [],
        tax: [],
        loggedUser: {
            id: cookie.creator,
            name: cookie.email,
        },
        leads: [],
        catalogs: [],
        txnList: [],
        quotes: [],
        txnLists: [],
        isSaveNew: false,
        isSaveClose: false,
        isSavePrint: false,
        isSaveDraft: false,
        exchangeRate: {},
        baseCurrencyCode: "",
        currencyCode: "",
        transactionRate: 1,
        saveOption: "",
        formAR: [
            {id: 1, name: "Default Form"},
            {id: 2, name: "Form 80mm"},
        ],
        isPriceLevelChanged: false,
        refFrom: [], // can SO can be from Sale Quotes
        btnDisabled: false
    }),
    methods: {
        formatDateTime(value) {
            return kendo.toString(new Date(value), this.dateFormat + ` hh:mm tt`);
        },
        amountFormat(value) {
            return kendo.toString(value.amount, `n${this.saleFormContent.decimal}`);
        },
        priceFormat(value) {
            return kendo.toString(value.price, `n${this.saleFormContent.decimal}`);
        },
        Help(key_search) {
            ShowResource(key_search);
        },
        initialData() {
            if (this.initSaleOrder) {
                // Edit Mode
                this.saleOrder = this.initSaleOrder;
                this.saleOrder.creditLimit = 0;
                this.saleOrder.currentBalance = 0;
                // window.console.log(this.initSaleOrder, 'propData')
                this.bindData();
            } else {
                // Brand New Mode
                if (this.$route.params.id === undefined) {
                    this.setDefaultData();
                }
            }
        },
        setDefaultData() {
            // Brand New Mode
            // window.console.log('default or clear')
            this.isEdit = false;
            this.saleOrder = new SaleOrderModel({});
            //sale order type
            if (this.$route.params.id !== undefined) {
                this.saleOrder.saleOrderType = 1;
                this.saleOrderType = 1;
                if (this.appType === 'npo' || this.appType === 'Public Sectors'){
                    this.saleOrder.saleOrderType = 3;
                    this.saleOrderType = 3;
                }
            }
            this.saleOrder.deliveryDateTime = new Date();
            this.saleOrder.formTemplate = 1;
            this.saleOrder.transactionDate = new Date().toISOString().substr(0, 10);
            // Generate Number
            this.itemLines = []
            // let ds = this.$refs.itemLineDS.kendoWidget();
            // ds.data([]);
            // Add 2 default lines
            this.removeEmptyLine()
            setTimeout(() => {
                this.addRow()
                // this.addRow()
            }, 500)
            // Add 2 default lines
            this.otherChargeList = [];
            this.mOtherCharge = [];
            this.employee = {};
            this.taxListTotal = {};
            this.quotes = [];
            this.isSaveNew = false;
            this.isSaveClose = false;
            this.isSavePrint = false;
            this.isSaveDraft = false;
            this.creditLimitUsage(0, 1);
            this.isRequredPurchase = false;
            this.customer = {}
        },
        bindData() {
            // window.console.log(this.saleOrder, 'bindData')
            // Edit Mode
            if (this.saleOrder) {
                if (this.saleOrder.hasOwnProperty("customer")) {
                    this.isEdit = true;
                    this.customer = this.saleOrder.customer;
                    // let e = {value: this.saleOrder.customer}
                    // this.onChange(e)
                    this.billingAddress = this.saleOrder.customer.billingAddress;
                    this.deliveryAddress = this.saleOrder.customer.deliveryAddress;
                    // this.customerProjects = this.saleOrder.customer.
                    this.taxListTotal = this.saleOrder.taxListTotal;
                    this.itemLines = this.saleOrder.itemLines;
                    this.mOtherCharge = this.saleOrder.otherCharge;
                    this.loadProjectByCustomer();
                    if (this.customer.hasOwnProperty("id")) {
                        this.loadCustomerBalance(this.customer.id);
                    }
                }
            }
        },
        addSelect() {
            let amount_num = this.numSelect.length;
            let num = this.numSelect[amount_num - 1];
            let new_num = num + 1;
            let lenghtItem = this.specificDiscountItem.length;
            if (new_num <= lenghtItem) {
                this.numSelect.push(new_num);
            }
        },
        removeSelect(index) {
            this.numSelect.splice(index, 1);
            // window.console.log(index, this.numSelect)
            // this.selectDiscount.splice(index,1)
            // window.console.log("remove",this.selectDiscount)
            // this.selectDiscount = this.selectDiscount.filter(item =>  item.id != val.id);
        },
        errorMessage() {
        },
        accountDropDownEditor() {
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
        //number
        generateNumber() {
            if (this.isEdit == false) {
                let d = new Date().toISOString().substr(0, 10);
                if (this.saleOrder.transactionDate) {
                    // window.console.log(this.transactionDate)
                    d = this.saleOrder.transactionDate;
                }
                let data = {
                    abbr: this.saleOrder.transactionType.abbr,
                    structure: this.saleOrder.transactionType.structure,
                    transactionDate: d,
                    type: "Sale Order",
                };
                billingHandler
                    .lastNumber(data)
                    .then((response) => {
                        if (response.data.statusCode === 200) {
                            const res = response.data.data;
                            const lastNumber = this.zeroPad(
                                parseInt(res.lastNumber),
                                this.saleOrder.transactionType.format
                            );
                            const number =
                                res.suffix +
                                this.saleOrder.transactionType.numberSeparator +
                                lastNumber;
                            this.saleOrder.number = number;
                        }
                    })
                    .catch((e) => {
                        this.errors.push(e);
                    });
            }
        },
        zeroPad(num, places) {
            return String(num).padStart(places, "0");
        },
        //customer
        onChange(event) {
            window.console.log(event);
            const value = event.value;
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.customer = value;
            this.saleOrder.customer = value;
            // this.invoice = value
            // this.saleOrder.paymentTerm = value.hasOwnProperty("paymentTerm")
            //   ? value.paymentTerm
            //   : {};
            this.saleOrder.priceLevel = value.hasOwnProperty("priceLevel")
                ? value.priceLevel
                : {};
            const baseCurrency = value.hasOwnProperty("baseCurrency")
                ? value.baseCurrency
                : {};
            if (baseCurrency.hasOwnProperty("code")) {
                this.baseCurrencyCode = baseCurrency.code;
            }
            const priceLevel = value.hasOwnProperty("priceLevel")
                ? value.priceLevel
                : {};
            if (priceLevel.hasOwnProperty("currency")) {
                if (priceLevel.currency.hasOwnProperty("id")) {
                    this.loadTransactionRate();
                }
            }
            this.billingAddress = value.hasOwnProperty("billingAddress")
                ? value.billingAddress
                : [];
            this.deliveryAddress = value.hasOwnProperty("deliveryAddress")
                ? value.deliveryAddress
                : [];
            if (this.billingAddress.length > 0) {
                this.saleOrder.billingAddress = this.billingAddress[0];
            }
            if (this.deliveryAddress.length > 0) {
                this.saleOrder.deliveryAddress = this.deliveryAddress[0];
            }
            this.onSaleOrderDateChanged();
            this.loadProjectByCustomer();
            // const creditLimit = value.hasOwnProperty("creditLimit")
            //   ? value.creditLimit
            //   : 0;
            // this.saleOrder.creditLimit = kendo.parseFloat(creditLimit);
            this.loadCreditLimit();
            this.loadCustomerBalance(this.customer.id);
            // load quote
            this.loadQuote();
            this.loadPaymentTermList();
        },
        onFilterChange(event) {
            const filter = event.filter.value;
            this.requestData(0, filter, this.cusBaseUrl);
            this.filter = filter;
        },
        async requestData(skip, filter, baseUrl) {
            let url = baseUrl + `?filter=${filter}`;
            if(this.appType === 'npo'){
                url = baseUrl + `?filter=${filter}&is_donor=true`;
            }
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then(this.afterFetch);
        },
        afterFetch(json) {
            this.customerList = json.data;
        },
        //supplier
        onSupplierChange(event) {
            window.console.log(event);
            const value = event.value;
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.supplier = value;
            this.saleOrder.supplier = value;
        },
        onSupplierFilterChange(event) {
            const supfilter = event.filter.value;
            this.supplierRequestData(0, supfilter, this.supBaseUrl);
        },
        supplierRequestData(skip, filter, baseUrl) {
            const url = baseUrl + `?filter=${filter}`;
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then(this.supAfterFetch);
        },
        supAfterFetch(json) {
            this.supplierList = json.data;
        },
        //employee
        onEmployeeChange(event) {
            const value = event.value;
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.employee = value;
            this.saleOrder.employee = value;
        },
        onEmployeeFilterChanged(event) {
            const empfilter = event.filter.value;
            this.employeeRequestData(0, empfilter, this.empBaseUrl);
        },
        employeeRequestData(skip, filter, baseUrl) {
            const url = baseUrl + `?filter=${filter}`;
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then(this.empAfterFetch);
        },
        empAfterFetch(json) {
            this.employeeList = json.data;
        },
        removeRow(e) {
            e.preventDefault();
            const grid = kendo.jQuery("#gridItemLineSaleOrder").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
            this.autoCalculate()
        },
        //date
        async onSaleOrderDateChanged() {
            if (this.saleOrder.transactionDate) {
                this.saleOrder.monthOf = new Date(this.saleOrder.transactionDate).toISOString().substr(0, 7)
            }
            await this.loadCreditLimit();
            await this.loadCustomerBalance(this.customer.id);
            await this.onPriceLevelChange();
            await this.loadPaymentTermList();
            if (this.customer) {
                const paymentTerm = this.saleOrder.paymentTerm || {};
                const netDue = paymentTerm.netDue || 0;
                const someDate = new Date(this.saleOrder.transactionDate);
                someDate.setDate(someDate.getDate() + parseInt(netDue)); //number  of days to add, e.x. 15 days
                this.saleOrder.validityDate = someDate.toISOString().substr(0, 10);
                window.console.log("dueDate", this.saleOrder.validityDate);
            }
            if (this.$route.params.id === undefined) {
                this.generateNumber();
            }
        },
        onPaymentTermChanged() {
            // this.onSaleOrderDateChanged();
            if (this.customer) {
                const paymentTerm = this.saleOrder.paymentTerm || {};
                const netDue = paymentTerm.netDue || 0;
                const someDate = new Date(this.saleOrder.transactionDate);
                someDate.setDate(someDate.getDate() + parseInt(netDue)); //number  of days to add, e.x. 15 days
                this.saleOrder.validityDate = someDate.toISOString().substr(0, 10);
                window.console.log("dueDate", this.saleOrder.validityDate);
            }
        },
        //number
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n${this.saleFormContent.decimal}`);
            // return value
        },
        //
        async loadLead() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = "?type=Sale Lead";
                    this.leads = [];
                    billingHandler.list(strFilter).then((res) => {
                        if (res) {
                            if (res.data) {
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.leads = res.data.data;
                                }
                            }
                        }
                        this.showLoading = false;
                    });
                }, 10);
            });
        },
        async loadPaymentTerm() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    paymentTermHandler.getAll().then((res) => {
                        this.showLoading = false;
                        this.paymentTerms = res.data.data;
                        if (this.paymentTerms.length > 0) {
                            if (
                                this.$route.params.id !== undefined ||
                                this.$route.params.id != ""
                            ) {
                                if (this.saleOrder) {
                                    this.saleOrder.paymentTerm = this.paymentTerms[0];
                                }
                            }
                        }
                    });
                }, 10);
            });
        },
        async loadPriceLevel() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = "?nature=sale";
                    priceLevelHandler.get(strFilter).then((res) => {
                        this.priceLevel = res;
                        if (this.priceLevel.length > 0) {
                            if (
                                this.$route.params.id !== undefined ||
                                this.$route.params.id != ""
                            ) {
                                if (this.saleOrder) {
                                    this.saleOrder.priceLevel = this.priceLevel[0];
                                }
                                this.loadTransactionRate();
                            }
                        }
                    });
                }, 10);
            });
        },
        removeDuplicate(array) {
            const result = [];
            const map = new Map();
            for (const item of array) {
                if (!map.has(item.id)) {
                    map.set(item.id, true); // set any value to Map
                    result.push(item);
                }
            }
            return result;
        },
        autoCalculateDiscount(discountItem, subTotal) {
            if (discountItem) {
                window.console.log('discountItem', discountItem, subTotal)
                const nature = discountItem.nature || '';
                const amount = discountItem.amount || 0;
                if (nature === "Amount") {
                    return parseFloat(amount);
                } else if (nature === "Percentage") {
                    return subTotal * (parseFloat(amount) / 100);
                } else {
                    return 0
                }
            } else {
                return 0
            }
        },
        autoCalculateTax(tax, amount) {
            if (tax) {
                var formula = tax.formula;
                var inAmt = kendo.parseFloat(amount);
                var nAmt = kendo.parseFloat(amount);
                var taxBase = kendo.parseFloat(tax.taxBase) / 100;
                var rate = kendo.parseFloat(tax.rate) / 100;
                var total = eval(formula);
                window.console.log(inAmt, nAmt, taxBase, rate, formula, total);
                // window.console.log(amount)
                return total;
            }
            // return 0
        },
        autoCalculateTaxByType(tax) {
            // return by a key
            const groupAll = (list) =>
                list.reduce((tax, item) => {
                    const taxAmount = tax[item.name] || 0;
                    return Object.assign({}, tax, {
                        [item.name]: taxAmount + parseFloat(item.amount),
                    });
                }, {});
            this.taxListTotal = groupAll(tax);
            // window.console.log('nimol', groupAll(tax))
            // this.
        },
        dataSourceChanged(e) {
            if (e.field) {
                let dataRow = e.items[0],
                    buom = {},
                    conversionRate = 1,
                    wac = 0,
                    qoh = 0,
                    amount = 0,
                    xAmount = 0;
                switch (e.field) {
                    case "item":
                        // this.attribute_ = this.attributes.filter(m => m.type.id === dataRow.variant.id)
                        dataRow.set("description", dataRow.item.description);
                        buom = dataRow.item.uom || {};
                        dataRow.set("buom", buom);
                        // this.itemChange(dataRow)
                        break;
                    case "uom":
                        if (this.isPriceLevelChanged === false) {
                            try {
                                try {
                                    buom = dataRow.uom.buom || {};
                                    qoh = dataRow.uom.qoh || 0;
                                    conversionRate = dataRow.uom.conversionRate || 1;
                                    wac = dataRow.uom.wac || 0;
                                    dataRow.set("buom", buom);
                                    dataRow.set("wac", wac);
                                    dataRow.set("qoh", qoh);
                                    dataRow.set("conversionRate", parseFloat(conversionRate));
                                    if (dataRow.uom) {
                                        amount =
                                            parseFloat(dataRow.uom.price) * parseFloat(dataRow.qty);
                                        xAmount = amount * parseFloat(this.saleOrder.txnRate);

                                        dataRow.set("price", parseFloat(dataRow.uom.price));
                                        dataRow.set("amount", amount);
                                        dataRow.set("exchangeAmount", xAmount);
                                    } else {
                                        amount =
                                            parseFloat(dataRow.price) * parseFloat(dataRow.qty);
                                        xAmount = amount * parseFloat(this.saleOrder.txnRate);

                                        dataRow.set("price", parseFloat(dataRow.price));
                                        dataRow.set("amount", amount);
                                        dataRow.set("exchangeAmount", xAmount);
                                    }
                                } catch (err) {
                                    dataRow.set("buom", {});
                                    dataRow.set("conversionRate", 1);
                                    dataRow.set("price", 0);
                                    dataRow.set("qoh", 0);
                                    dataRow.set("wac", 0);
                                    dataRow.set("amount", 0);
                                    dataRow.set("exchangeAmount", 0);
                                }
                            } catch {
                                dataRow.set("price", 0);
                                dataRow.set("amount", 0);
                            }
                        }
                        break;
                    case "price":
                        try {
                            amount = parseFloat(dataRow.price) * parseFloat(dataRow.qty);
                            xAmount = amount * parseFloat(this.saleOrder.txnRate);

                            dataRow.set("price", parseFloat(dataRow.price));
                            dataRow.set("amount", amount);
                            dataRow.set("exchangeAmount", xAmount);
                            // window.console.log('price',dataRow.price)
                        } catch {
                            dataRow.set("price", 0);
                            dataRow.set("amount", 0);
                            dataRow.set("exchangeAmount", 0);
                        }
                        break;
                    case "qty":
                        try {
                            amount = parseFloat(dataRow.price) * parseFloat(dataRow.qty);
                            xAmount = amount * parseFloat(this.saleOrder.txnRate);

                            dataRow.set("price", parseFloat(dataRow.price));
                            dataRow.set("amount", amount);
                            dataRow.set("exchangeAmount", xAmount);
                        } catch {
                            dataRow.set("price", 0);
                            dataRow.set("amount", 0);
                            dataRow.set("exchangeAmount", 0);
                        }
                        break;
                    case "otherTax":
                        // window.console.log("--", dataRow)
                        break;
                    default:
                        break;
                }
                if (e.field) {
                    this.autoCalculate();
                }
            }
        },
        autoCalculate() {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                subTotal = 0,
                totalTax = 0,
                discountTotal = 0,
                spTax = 0,
                pltax = 0,
                otherTax = 0,
                vatTax = 0,
                discountInvoice = 0,
                taxList = [],
                discountItem = [],
                saleUnit = [],
                inclusiveTax = 0,
                itemSubtotal = 0,
                txnItmSubtotal = 0,
                serviceSubtotal = 0,
                itemDiscount = 0,
                serviceDiscount = 0,
                txnDiscount = 0;

            const rows = ds.data().filter((m) => parseFloat(m.amount) > 0);
            rows.forEach((value) => {
                let modifierPrice = 0;
                if (value.modifier) {
                    modifierPrice = kendo.parseFloat(value.modifier.price);
                }

                // subTotal += (kendo.parseFloat(value.amount) + modifierPrice)
                let discount = 0;
                if (value.discountItem) {
                    let subTo = kendo.parseFloat(value.price) * kendo.parseFloat(value.qty);
                    discount = this.autoCalculateDiscount(value.discountItem, subTo);
                    window.console.log('discount item', discount, '--', value.discountItem)
                    value["discountAmount"] = discount;
                    value["discountExchangeAmount"] =
                        discount * kendo.parseFloat(this.saleOrder.txnRate);
                    if (value.discountItem.hasOwnProperty("id")) {
                        discountItem.push(value.discountItem);
                    }
                    discountTotal += discount;
                }
                if (value.saleUnit) {
                    if (value.saleUnit.hasOwnProperty("id")) {
                        saleUnit.push(value.saleUnit);
                    }
                }
                if (value.specificTax) {
                    spTax = this.autoCalculateTax(
                        value.specificTax,
                        kendo.parseFloat(value.amount) - kendo.parseFloat(discount)
                    );
                    // window.console.log('sp ', discount)
                    spTax = kendo.parseFloat(spTax) ? kendo.parseFloat(spTax) : 0;
                    value["specificTaxAmount"] = spTax;
                    value["specificTaxExchangeAmount"] =
                        spTax * kendo.parseFloat(this.saleOrder.txnRate);
                    const tax = value.specificTax;
                    const baseAmount = tax.baseAmount;
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === "inclusive") {
                            inclusiveTax += spTax;
                        }
                    }
                    if (value.specificTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.specificTax.taxType.name,
                            amount: spTax,
                            id: value.specificTax.taxType.id,
                        });
                    }
                }
                if (value.publicLightingTax) {
                    pltax = this.autoCalculateTax(
                        value.publicLightingTax,
                        kendo.parseFloat(value.amount) - kendo.parseFloat(discount)
                    );
                    pltax = kendo.parseFloat(pltax) ? kendo.parseFloat(pltax) : 0;
                    value["publicLightingTaxAmount"] = pltax;
                    value["publicLightingTaxExchangeAmount"] =
                        pltax * kendo.parseFloat(this.saleOrder.txnRate);
                    const tax = value.publicLightingTax;
                    const baseAmount = tax.baseAmount;
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === "inclusive") {
                            inclusiveTax += pltax;
                        }
                    }
                    if (value.publicLightingTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.publicLightingTax.taxType.name,
                            amount: pltax,
                            id: value.publicLightingTax.taxType.id,
                        });
                    }
                }
                if (value.otherTax) {
                    otherTax = this.autoCalculateTax(
                        value.otherTax,
                        kendo.parseFloat(value.amount) - kendo.parseFloat(discount)
                    );
                    otherTax = kendo.parseFloat(otherTax)
                        ? kendo.parseFloat(otherTax)
                        : 0;
                    value["otherTaxAmount"] = otherTax;
                    value["otherTaxExchangeAmount"] =
                        otherTax * kendo.parseFloat(this.saleOrder.txnRate);
                    const tax = value.otherTax;
                    const baseAmount = tax.baseAmount;
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === "inclusive") {
                            inclusiveTax += otherTax;
                        }
                    }
                    if (value.otherTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.otherTax.taxType.name,
                            amount: otherTax,
                            id: value.otherTax.taxType.id,
                        });
                    }
                }

                if (value.vatTax) {
                    // window.console.log('Vat Tax', value.vatTax)
                    let amt =
                        kendo.parseFloat(spTax ? spTax : 0) +
                        kendo.parseFloat(pltax ? pltax : 0) +
                        kendo.parseFloat(otherTax ? otherTax : 0) +
                        (kendo.parseFloat(value.amount ? value.amount : 0) -
                            (discount ? discount : 0));
                    vatTax = this.autoCalculateTax(value.vatTax, amt);
                    vatTax = kendo.parseFloat(vatTax) ? kendo.parseFloat(vatTax) : 0;
                    value["vatTaxAmount"] = vatTax;
                    value["vatTaxExchangeAmount"] =
                        vatTax * kendo.parseFloat(this.saleOrder.txnRate);
                    const tax = value.vatTax;
                    const baseAmount = tax.baseAmount;
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === "inclusive") {
                            inclusiveTax += vatTax;
                        }
                    }
                    if (value.vatTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.vatTax.taxType.name,
                            amount: vatTax,
                            id: value.vatTax.taxType.id,
                        });
                    }
                }
                totalTax +=
                    kendo.parseFloat(spTax ? spTax : 0) +
                    kendo.parseFloat(pltax ? pltax : 0) +
                    kendo.parseFloat(otherTax ? otherTax : 0) +
                    kendo.parseFloat(vatTax ? vatTax : 0);
                subTotal +=
                    kendo.parseFloat(value.amount) + modifierPrice - inclusiveTax;

                const item = value.item;
                const itmType = item.type || "";
                if (itmType === "Variant") {
                    itemSubtotal +=
                        kendo.parseFloat(value.price) * kendo.parseFloat(value.qty);
                    itemDiscount += kendo.parseFloat(discount);
                } else if (itmType === "Service") {
                    serviceSubtotal +=
                        kendo.parseFloat(value.price) * kendo.parseFloat(value.qty);
                    serviceDiscount += kendo.parseFloat(discount);
                } else {
                    txnItmSubtotal +=
                        kendo.parseFloat(value.price) * kendo.parseFloat(value.qty);
                    txnDiscount += kendo.parseFloat(discount);
                }
                //include Tax Amount
                const amountNodiscount =
                    kendo.parseFloat(value.price) * kendo.parseFloat(value.qty) -
                    discount;
                const includeTaxAmount =
                    amountNodiscount + vatTax + pltax + spTax + otherTax;
                value["includeTaxAmount"] = includeTaxAmount;
                value["includeTaxExchangeAmount"] =
                    includeTaxAmount * kendo.parseFloat(this.saleOrder.txnRate);
            });

            this.saleOrder.itemSubtotal = itemSubtotal;
            this.saleOrder.exchangeItemSubtotal = itemSubtotal * kendo.parseFloat(this.saleOrder.txnRate);

            this.saleOrder.serviceSubtotal = serviceSubtotal;
            this.saleOrder.exchangeServiceSubtotal = serviceSubtotal * kendo.parseFloat(this.saleOrder.txnRate);
            this.saleOrder.txnItmSubtotal = txnItmSubtotal;
            this.saleOrder.exchangeTxnItmSubtotal = txnItmSubtotal * kendo.parseFloat(this.saleOrder.txnRate);

            this.saleOrder.itemDiscount = itemDiscount;
            this.saleOrder.exchangeItemDiscount = itemDiscount * kendo.parseFloat(this.saleOrder.txnRate);
            this.saleOrder.serviceDiscount = serviceDiscount;
            this.saleOrder.exchangeServiceDiscount = serviceDiscount * kendo.parseFloat(this.saleOrder.txnRate);
            this.saleOrder.txnItmDiscount = txnDiscount;
            this.saleOrder.exchangeTxnItmDiscount = txnDiscount * kendo.parseFloat(this.saleOrder.txnRate);

            discountTotal = discountTotal ? discountTotal : 0;

            // window.console.log(spTax, pltax, otherTax, vatTax)
            let total =
                kendo.parseFloat(subTotal) -
                kendo.parseFloat(discountTotal) +
                kendo.parseFloat(totalTax);
            this.saleOrder.subTotal = subTotal;
            this.saleOrder.totalTaxAmount = kendo.parseFloat(totalTax);
            this.saleOrder.discountTotal = kendo.parseFloat(discountTotal);
            if (this.saleOrder.specificDiscountItem) {
                discountInvoice = this.autoCalculateDiscount(
                    this.saleOrder.specificDiscountItem,
                    kendo.parseFloat(subTotal)
                );
                discountInvoice = discountInvoice ? discountInvoice : 0;
            }
            // this.onOtherChargeChange()
            this.saleOrder.total =
                kendo.parseFloat(total) -
                discountInvoice +
                kendo.parseFloat(this.saleOrder.otherChargeAmount);
            this.saleOrder.exchangeAmount =
                kendo.parseFloat(this.saleOrder.total) *
                kendo.parseFloat(this.saleOrder.txnRate);
            this.autoCalculateTaxByType(taxList);
            this.customerDiscountItem = this.removeDuplicate(discountItem);
            this.customerSaleUnit = this.removeDuplicate(saleUnit);
            // window.console.log('discount ', this.customerDiscountItem)
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        async loadSaleFormContent() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    saleFormContentHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data;
                            if (data.length > 0) {
                                this.saleFormContent = data[0];
                                // window.console.log(data[0])
                            }
                        }
                    });
                }, 10);
            });
        },
        vatTemplate(dataItem) {
            const vat = dataItem.vatTax;
            if (vat) {
                return `<span>${vat.defaultTax ? vat.defaultTax : ``}</span>`;
            } else {
                return ``;
            }
        },
        itemTemplate(dataItem) {
            const item = dataItem.item;
            if (item) {
                return `<span>${item.name ? item.name : ``}</span>`;
            } else {
                return ``;
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
        saleUnitTemplate(dataItem) {
            const saleUnit = dataItem.saleUnit;
            if (saleUnit) {
                return `<span>${saleUnit.name ? saleUnit.name : ``}</span>`;
            } else {
                return ``;
            }
        },
        discountItemTemplate(dataItem) {
            const discountItem = dataItem.discountItem;
            if (discountItem) {
                return `<span>${discountItem.code ? discountItem.code : ``} - ${
                    discountItem.name ? discountItem.name : ``
                }</span>`;
            } else {
                return ``;
            }
        },
        ServiceDateEditor(container, options) {
            kendo
                .jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDatePicker();

            // let ds = this.$refs.itemLineDS.kendoWidget()
            // window.console.log(ds.data())
            // // const dateString = kendo.toString((new Date(options.model.items.serviceDate)), this.itemLine.dateFormat)
            // // const dateString = kendo.toString(options.model.items.serviceDate)
            // const $input = $("<input value=" + options.model.serviceDate + " />").appendTo(container)
            // $input.kendoDatePicker()
            // // $input.appendTo(container)
            // // options.model.items.serviceDate = dateString
            // window.console.log($input)
        },
        ServiceDateToEditor(container, options) {
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
                                url: productVariantHandler.itemSearchURL('?plId=' + this.saleOrder.priceLevel.id),
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
                    template: "<span>#=uom.name || `No Price Level`#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                // url: uomPriceHandler.getURL(options.model.item.id, this.saleOrder.priceLevel.id),
                                url: uomPriceHandler.uomPriceByPriceLevelURL(
                                    "id=" +
                                    options.model.item.id +
                                    "&plId=" +
                                    this.saleOrder.priceLevel.id +
                                    "&date=" +
                                    this.saleOrder.transactionDate
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
        DiscountItemDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "id",
                    cascadeFrom: "item",
                    template: "<span>#=code# - #=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: discountItemHandler.getURL(DISCOUNT_TYPE),
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
                    }),
                });
        },
        SpecificTaxDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "defaultTax",
                    dataValueField: "id",
                    template: "<span>#=defaultTax#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.specificTax.filter((m) => {
                            if (options.model.hasOwnProperty("vatTax")) {
                                const vat = options.model.vatTax;
                                if (vat) {
                                    if (
                                        options.model.vatTax !== null ||
                                        options.model.vatTax !== "null"
                                    ) {
                                        if (options.model.vatTax.baseAmount) {
                                            return (
                                                m.baseAmount.toLowerCase() ===
                                                options.model.vatTax.baseAmount.toLowerCase()
                                            );
                                        } else {
                                            return m;
                                        }
                                    }
                                } else {
                                    return m;
                                }
                            }
                        }),
                    }),
                });
        },
        PublicLightingTaxDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "defaultTax",
                    dataValueField: "id",
                    template: "<span>#=defaultTax#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.publicLightingTax.filter((m) => {
                            if (options.model.hasOwnProperty("vatTax")) {
                                const vat = options.model.vatTax;
                                if (vat) {
                                    if (
                                        options.model.vatTax !== null &&
                                        options.model.vatTax !== "null"
                                    ) {
                                        if (options.model.vatTax.baseAmount) {
                                            return (
                                                m.baseAmount.toLowerCase() ===
                                                options.model.vatTax.baseAmount.toLowerCase()
                                            );
                                        } else {
                                            return m;
                                        }
                                    }
                                } else {
                                    return m;
                                }
                            }
                        }),
                    }),
                });
        },
        OtherTaxDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "defaultTax",
                    dataValueField: "id",
                    template: "<span>#=defaultTax#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.otherTax.filter((m) => {
                            if (options.model.hasOwnProperty("vatTax")) {
                                const vat = options.model.vatTax;
                                if (vat) {
                                    if (
                                        options.model.vatTax !== null &&
                                        options.model.vatTax !== "null"
                                    ) {
                                        if (options.model.vatTax.baseAmount) {
                                            return (
                                                m.baseAmount.toLowerCase() ===
                                                options.model.vatTax.baseAmount.toLowerCase()
                                            );
                                        } else {
                                            return m;
                                        }
                                    }
                                } else {
                                    return m;
                                }
                            }
                        }),
                    }),
                });
        },
        VatTaxDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "defaultTax",
                    dataValueField: "id",
                    template: "<span>#=defaultTax#</span>",
                    optionLabel: "--Select--",
                    dataSource: new kendo.data.DataSource({
                        data: this.vatTax,
                    }),
                });
        },
        SaleUnitDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "id",
                    template: "<span>#=code# - #=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.saleUnitItemList,
                    }),
                });
        },
        ModifierDropDownEditor(container, options) {
            const item = options.model.item || {}
            const uom = item.uom || {}
            const itemId = item.id || ''
            const uomId = uom.id || ''
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
                        "<span>Modifier </span>" +
                        "<span></span>" +
                        "</div>",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: itemModifierHandler.searchURL('?plId=' + this.saleOrder.priceLevel.id + '&id=' + itemId + '&uomId=' + uomId),
                            },
                            dataType: "json",
                        },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {type: "string"},
                                    name: {type: "string"},
                                    price: {type: "number"},
                                    uom: {type: "string"},
                                },
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            },
                        },
                    }),
                });
        },
        EmployeeDropDownEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoMultiSelect({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    suggest: true,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "id",
                    headerTemplate:
                        '<div class="dropdown-header k-widget k-header">' +
                        "<span>Employee </span>" +
                        "<span></span>" +
                        "</div>",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: employeeHandler.searchURL(),
                            },
                            dataType: "json",
                        },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {type: "string"},
                                    name: {type: "string"},
                                    firstName: {type: "string"},
                                    lastName: {type: "string"},
                                },
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            },
                        },
                    }),
                });
        },
        empImpl(dataItem) {
            let empIds = [];
            dataItem.employee.forEach((m) => {
                empIds.push(m.firstName + " - " + m.lastName);
            });
            // window.console.log(empIds.join(', '))
            return `<span>${empIds.join(", ")}</span>`;
        },
        addRow() {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                total = ds.total();
            this.itemLine.id = invoicePrefix + uuid.v1();
            ds.insert(total, this.itemLine);
        },
        onSpecificDiscountChanged() {
            if (this.saleOrder.specificDiscountItem) {
                const discountOrder = this.autoCalculateDiscount(
                    this.saleOrder.specificDiscountItem,
                    this.saleOrder.subTotal
                );
                this.saleOrder.specificDiscountTotal = kendo.toString(
                    discountOrder ? discountOrder : 0,
                    "n"
                );
                let total =
                    kendo.parseFloat(this.saleOrder.subTotal) -
                    (kendo.parseFloat(this.saleOrder.discountTotal) +
                        kendo.parseFloat(this.saleOrder.totalTaxAmount)) -
                    discountOrder;
                this.saleOrder.total = kendo.toString(total, "n");
            }
        },
        onOtherChargeChange() {
            let otherCharge = 0;
            this.mOtherCharge.forEach((m) => {
                otherCharge += this.autoCalculateDiscount(m, this.saleOrder.subTotal);
            });
            this.saleOrder.otherChargeAmount = otherCharge;
            this.autoCalculate();
        },
        async loadOtherCharge() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    otherChargeHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            this.otherChargeList = res.data.data;
                        }
                    });
                }, 10);
            });
        },
        onOtherAmount(value) {
            return this.autoCalculateDiscount(value, this.saleOrder.subTotal);
        },
        async loadDiscountItem() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    discountItemHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            this.specificDiscountItem = res.data.data;
                        }
                    });
                }, 10);
            });
        },
        async loadSegment() {
            this.segments = []
            const roleType = dataStore.roleType || 0
            if (roleType === 0) {
                if (dataStore.roleData) {
                    const roleData = dataStore.roleData || []
                    const segment = roleData.filter(itm => itm.type === 'segment')
                    const segmentDefault = segment.filter(m => m.isDefault === 1)
                    this.segments = segment
                    if (this.$route.params.id === undefined || this.$route.params.id === '') {
                        if (segmentDefault.length > 0) {
                            this.saleOrder.segment = segmentDefault[0];
                        }
                    }
                }
            } else if (roleType === 1) {
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        this.segments = [];
                        settingsHandler
                            .getSeg()
                            .then((res) => {
                                this.showLoading = true;
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.segments = res.data.data;
                                } else {
                                    this.showLoading = false
                                }
                            })
                    }, 10);
                });
            }


        },
        async loadLocation() {
            this.locations = []
            const roleType = dataStore.roleType || 0
            if (roleType === 0) {
                if (dataStore.roleData) {
                    const roleData = dataStore.roleData || []
                    const location = roleData.filter(itm => itm.type === 'location')
                    const locationDefault = location.filter(m => m.isDefault === 1)
                    this.locations = location
                    if (this.$route.params.id === undefined || this.$route.params.id === '') {
                        if (locationDefault.length > 0) {
                            this.saleOrder.location = locationDefault[0];
                        }
                    }
                }
            } else if (roleType === 1) {
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        this.locations = [];
                        locationHandler
                            .list()
                            .then((res) => {
                                this.showLoading = true;
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.locations = res.data.data;
                                } else {
                                    this.showLoading = false;
                                }
                            })
                    }, 10);
                });
            }
        },
        async loadProjectByCustomer() {
            this.customerProjects = []
            const roleType = dataStore.roleType || 0
            if (roleType === 0) {
                if (dataStore.roleData) {
                    const roleData = dataStore.roleData || []
                    const project = roleData.filter(itm => itm.type === 'project')
                    project.forEach(k => {
                        const customers = k.customers || []
                        const proCustomer = customers.filter(n => n.customer.id === this.customer.id)
                        if (proCustomer.length > 0) {
                            this.customerProjects.push(k)
                        }
                    })
                    if (this.$route.params.id === undefined || this.$route.params.id === '') {
                        const projectDefault = this.customerProjects.filter(m => m.isDefault === 1)
                        if (projectDefault.length > 0) {
                            this.saleOrder.project = projectDefault[0];
                        }
                    }
                }
            } else if (roleType === 1) {
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        projectHandler
                            .getByCustomer(this.customer.id)
                            .then((res) => {
                                this.showLoading = true;
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.customerProjects = res.data.data;
                                } else {
                                    this.showLoading = false;
                                }
                            })
                    }, 10);
                });
            }
        },
        async loadSaleChannel() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    saleChannelHandler.get().then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.saleChannelList = res.data.data;
                            if (this.saleChannelList.length > 0) {
                                if (
                                    this.$route.params.id !== undefined ||
                                    this.$route.params.id != ""
                                ) {
                                    this.saleOrder.saleChannel = this.saleChannelList[0];
                                }
                            }
                        } else {
                            this.showLoading = false;
                        }
                    });
                }, 10);
            });
        },
        async loadTax() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    settingHandler.get().then((res) => {
                        this.tax = res;
                        this.otherTax = this.tax.filter(
                            (m) =>
                                (m.taxType.typeId === 7 || m.taxType.typeId === 10) &&
                                m.transactionType === "Sale"
                        ); // valuable tax
                        this.specificTax = this.tax.filter(
                            (m) =>
                                (m.taxType.typeId === 8 || m.taxType.typeId === 10) &&
                                m.transactionType === "Sale"
                        ); // valuable tax
                        this.publicLightingTax = this.tax.filter(
                            (m) =>
                                (m.taxType.typeId === 9 || m.taxType.typeId === 10) &&
                                m.transactionType === "Sale"
                        ); // valuable tax
                        this.vatTax = this.tax.filter(
                            (m) =>
                                (m.taxType.typeId === 1 ||
                                    m.taxType.typeId === 8 ||
                                    m.taxType.typeId === 10) &&
                                m.transactionType === "Sale"
                        ); // valuable tax
                    });
                }, 10);
            });
        },
        async loadSaleUnitItems() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    saleUnitItemHandler.list().then((res) => {
                        if (res.data.statusCode === 200)
                            this.saleUnitItemList = res.data.data;
                    });
                }, 10);
            });
        },
        async loadCustomerBalance(id) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = id + "?type=bal";
                    billingHandler
                        .balance(strFilter)
                        .then((res) => {
                            if (res.data.statusCode === 200) {
                                const data = res.data.data;
                                if (data.length > 0) {
                                    this.saleOrder.currentBalance = data[0].balance;
                                }
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 10);
            });
        },
        creditLimitUsage(balance, creditLimit) {
            let num = 0;
            let per = (balance / creditLimit) * 100
            if (isNaN(per)) {
                // It isn't a number
                num = 0
            } else {
                // It is a number
                num = per;
            }
            return num + " %";
        },
        close(data) {
            if (this.$route.params.id === undefined) {
                this.$router.push({
                    name: "revenues",
                    params: {
                        data: data,
                    },
                });
            } else {
                window.history.go(-1);
            }
            window.console.log(data, "close");
            // localStorage.data.id = JSON.stringify(data)
        },
        //catalog
        loadImage(dataItem) {
            if (dataItem.hasOwnProperty("images")) {
                if (dataItem.images.hasOwnProperty("default")) {
                    const url = this.imgURL + dataItem.images.default.thumb;
                    return (
                        "<img width='50' height='50' style= 'margin: auto;display: block;' src='" +
                        url +
                        "' />"
                    );
                }
            } else {
                return "";
            }
        },
        async loadCatalogs() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    catalogHandler.get().then((res) => {
                        this.showLoading = false;
                        this.catalogs = res;
                    });
                }, 10);
            });
        },
        addCatalog(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridCatalog").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            // window.console.log(dataItem)
            if (dataItem.variants.length > 0) {
                dataItem.variants.forEach((m) => {
                    if (m.hasOwnProperty("variant")) {
                        if (m.variant.hasOwnProperty("id")) {
                            this.loadSingleItem(m.variant.id, "i");
                        }
                    }
                });
                this.dialogCatalog = false;
            }
            if (dataItem.services.length > 0) {
                dataItem.services.forEach((m) => {
                    if (m.hasOwnProperty("service")) {
                        if (m.service.hasOwnProperty("id")) {
                            this.loadSingleItem(m.service.id, "s");
                        }
                    }
                });
                this.dialogCatalog = false;
            }
        },
        async loadSingleItem(itemId, type) {
            new Promise((resolve) => {
                resolve("resolved");
                setTimeout(() => {
                    this.showLoading = true;
                    productHandler.getOne(itemId).then((res) => {
                        this.showLoading = false;
                        let data = res;
                        window.console.log(data);
                        let ds = this.$refs.itemLineDS.kendoWidget(),
                            total = ds.total();
                        this.itemLine.id = invoicePrefix + uuid.v1();
                        this.itemLine.item = data;
                        if (type == "i") {
                            this.itemLine.description = data.variant.saleDescription;
                        } else {
                            this.itemLine.description = data.saleDescription;
                        }
                        ds.insert(total, this.itemLine);
                    });
                }, 500);
            });
        },
        async loadPrefix() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    prefixHandler.get("sale order").then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.transactionType = res.data.data;
                            if (this.transactionType.length > 0) {
                                this.saleOrder.transactionType = this.transactionType[0];
                                if (!this.initsaleOrder) {
                                    this.generateNumber();
                                }
                            }
                        }
                    });
                }, 10);
            });
        },
        async loadViewsaleOrder() {
            if (!this.initsaleOrder) {
                this.isEdit = true
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        this.showLoading = true;
                        saleOrderHandler
                            .view(this.$route.params.id)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.saleOrder = res.data.data[0];
                                    this.quotes = this.saleOrder.refFrom || []
                                    this.bindData();
                                }
                            })
                            .catch();
                        {
                            this.showLoading = false;
                        }
                    }, 10);
                });
            } else {
                this.setDefaultData()
            }
        },
        async loadQuote() {
            if (this.saleOrder.customer) {
                this.refFrom = []
                this.showLoading = true;
                this.quotes = [];
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        let data = {
                            method: "by_customer",
                            customer: this.saleOrder.customer.id,
                            segmentId: this.saleOrder.segment.id,
                            locationId: this.saleOrder.location.id,
                            priceLevelId: this.saleOrder.priceLevel.id,
                            type: "Sale Quote",
                        };
                        saleOrderHandler.search(data).then((res) => {
                            this.showLoading = false;
                            this.quotes = res.data.data;
                        });
                    }, 10);
                });
            }
        },
        addQuote(data) {
            //add item lines
            let txnData = data.txnData || {}
            const itemLines = data.itemLines || []
            this.refFrom.push({
                id: data.id || '',
                reference: data.number || '',
                customerId: txnData.customerId || '',
            })
            if (itemLines.length > 0) {
                this.removeEmptyLine();
                itemLines.forEach((m) => {
                    m.txn_add_id = txnData.id;
                    m.id = invoicePrefix + uuid.v1();
                    let ds = this.$refs.itemLineDS.kendoWidget(),
                        total = ds.total();
                    ds.insert(total, m);
                });
                // this.addRow();
            }
            //add other chard
            if (data.otherCharge.length > 0) {
                data.otherCharge.forEach((m) => {
                    m.txn_add_id = txnData.id;
                    this.mOtherCharge.push(m);
                });
                this.autoCalculate();
                this.onOtherChargeChange();
            }
            // add txnlist
            this.txnLists.push(txnData);
            if (txnData.lead.id !== undefined) {
                this.txnLists.push(txnData.lead);
            }
            // window.console.log(this.txnLists);
            //remove txn
            const index = this.quotes.findIndex((item) => {
                return data.id === item.id;
            });
            this.autoCalculate();
            this.quotes.splice(index, 1);
            // this.quotes[index].is_added = true
            // window.console.log(this.quotes)
            this.saleOrder.refFrom = this.removeDuplicate(this.refFrom)
            window.console.log('ref', this.saleOrder.refFrom)
        },
        removeEmptyLine() {
            const grid = kendo.jQuery("#gridItemLineSaleOrder").data("kendoGrid"),
                dataSource = grid.dataSource;
            dataSource.data().forEach((m) => {
                if (m) {
                    const item = m.item || {}
                    if (item.id === undefined || item.id === '') {
                        dataSource.remove(m);
                    }
                }
            });
        },
        async loadTransactionRate() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const date = new Date(this.saleOrder.transactionDate)
                        .toISOString()
                        .substr(0, 10);
                    const priceLevel = this.saleOrder.priceLevel;
                    let code = "";
                    if (priceLevel.hasOwnProperty("currency")) {
                        if (priceLevel.currency.hasOwnProperty("code")) {
                            code = priceLevel.currency.code;
                        }
                    }
                    if (code !== undefined || code !== "") {
                        this.showLoading = true;
                        currencyHandler
                            .getLastExchangeRateByDate(date, code)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.exchangeRate = res.data.data[0];
                                    this.currencyCode = this.exchangeRate.code;
                                    this.transactionRate = this.exchangeRate.rate;
                                    this.saleOrder.txnRate = this.exchangeRate.rate;
                                    this.saleOrder.exchangeRate = this.exchangeRate;
                                    this.showLoading = false;
                                }
                            });
                    }
                }, 10);
            });
        },
        clear() {
            this.id = undefined;
            this.saleOrder = {};
            this.itemLines = [];
            this.customer = ''
            this.generateNumber();
        },
        saveClose() {
            let id = "";
            if (this.customer.hasOwnProperty("id")) {
                id = this.customer.id || "";
            }
            if (id === "") {
                this.$snotify.error("customer is require");
                return;
            }
            let ds = this.$refs.itemLineDS.kendoWidget();
            let d1 = ds.data().filter((m) => m.amount > 0);
            let dataValidate = 0;
            d1.forEach((value, index) => {
                if (value.item.id == undefined || value.uom.id == undefined) {
                    this.$snotify.error(
                        "Please check Item or Uom  on row " + (index + 1)
                    );
                } else {
                    dataValidate += 1;
                }
            });
            if (d1.length == dataValidate) {
                this.isSaveClose = true;
                this.saveOption = "saveClose";
                this.save();
            }
        },
        savePrint() {
            this.isSavePrint = true;
            this.saveOption = "savePrint";
            this.save();
        },
        saveNew() {
            this.saveOption = "saveNew";
            this.isSaveNew = true;
            this.save();
        },
        cancel() {
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
                    this.$router.go(-1);
                }
            });
        },
        saveDraft() {
            this.saveOption = "saveDraft";
            this.isSaveDraft = true;
            this.save();
        },
        async save() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                return;
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.removeEmptyLine();
                    let itemLineDS = this.$refs.itemLineDS.kendoWidget(),
                        total = itemLineDS.total();
                    let itmLines = itemLineDS.data().filter(m => m.amount > 0).map(m => {
                        return new ItemLineModel(m);
                    })

                    if (total <= 0) {
                        this.$snotify.error("Field Required!");
                        return;
                    }
                    if (!this.isRequredPurchase) {
                        this.saleOrder.supplier = {};
                    } else {
                        //is for purchase
                        this.saleOrderType = 5;
                    }
                    // window.console.log(itmLines, 'itmLines')
                    // window.console.log(JSON.stringify(itmLines), 'itmLines')
                    let data = {
                        id: this.saleOrder.id ? this.saleOrder.id : "",
                        type: "Sale Order",
                        transactionType: this.saleOrder.transactionType,
                        number: this.saleOrder.number,
                        abbr: this.saleOrder.transactionType.abbr,
                        transactionDate: this.saleOrder.transactionDate,
                        transactionDateTZ: Helper.toISODate(this.saleOrder.transactionDate),
                        validityDate: this.saleOrder.validityDate,
                        monthOf: this.saleOrder.monthOf,
                        customer: this.saleOrder.customer,
                        paymentTerm: this.saleOrder.paymentTerm,
                        discountPromotion: {},
                        priceLevel: this.saleOrder.priceLevel,
                        itemLines: itmLines,
                        segment: this.saleOrder.segment,
                        location: this.saleOrder.location,
                        project: this.saleOrder.project,
                        saleChannel: this.saleOrder.saleChannel,
                        billingAddress: this.saleOrder.billingAddress,
                        deliveryAddress: this.saleOrder.deliveryAddress,
                        deliveryDateTime: this.saleOrder.deliveryDateTime,
                        transactionNote: this.saleOrder.transactionNote,
                        subTotal: this.saleOrder.subTotal,
                        total: this.saleOrder.total,
                        amount: this.saleOrder.amount,
                        discountTotal: this.saleOrder.discountTotal,
                        specificDiscountTotal: this.saleOrder.specificDiscountTotal,
                        deliveryFee: this.saleOrder.deliveryFee,
                        totalTaxAmount: this.saleOrder.totalTaxAmount,
                        currentBalance: this.saleOrder.currentBalance,
                        creditLimit: this.saleOrder.creditLimit,
                        saveOption: this.saveOption,
                        txnRate: this.saleOrder.txnRate,
                        rate: 1,
                        exchangeRate: this.saleOrder.exchangeRate,
                        exchangeAmount: this.saleOrder.exchangeAmount,
                        status: 1,
                        approvedBy: this.saleOrder.approvedBy,
                        formTemplate: {},
                        specificDiscountItem: this.saleOrder.specificDiscountItem,
                        otherCharge: this.mOtherCharge,
                        otherChargeAmount: this.saleOrder.otherChargeAmount,
                        publicLink: "",
                        taxListTotal: this.taxListTotal,
                        customerDiscountItem: this.customerDiscountItem,
                        customerSaleUnit: this.customerSaleUnit,
                        loggedUser: this.loggedUser,
                        txnList: this.txnLists,
                        saleOrderType: this.saleOrder.saleOrderType,
                        employee: this.saleOrder.employee,
                        supplier: this.saleOrder.supplier,
                        itemSubtotal: this.saleOrder.itemSubtotal,
                        exchangeItemSubtotal: this.saleOrder.exchangeItemSubtotal,
                        serviceSubtotal: this.saleOrder.serviceSubtotal,
                        exchangeServiceSubtotal: this.saleOrder.exchangeServiceSubtotal,
                        txnItmSubtotal: this.saleOrder.txnItmSubtotal,
                        exchangeTxnItmSubtotal: this.saleOrder.exchangeTxnItmSubtotal,
                        itemDiscount: this.saleOrder.itemDiscount,
                        exchangeItemDiscount: this.saleOrder.exchangeItemDiscount,
                        serviceDiscount: this.saleOrder.serviceDiscount,
                        exchangeServiceDiscount: this.saleOrder.exchangeServiceDiscount,
                        txnItmDiscount: this.saleOrder.txnItmDiscount,
                        exchangeTxnItmDiscount: this.saleOrder.exchangeTxnItmDiscount,
                        lead: {},
                        routeView: "sale_order_view",
                        exspectedDate: "",
                        usedDateAt: "",
                        deletedAt: "",
                        deleted: 0,
                        refFrom: this.saleOrder.refFrom || [],
                        refTo: this.saleOrder.refTo || [],
                        createdAt: new Date().toISOString().substr(0, 10),
                    };
                    // window.console.log('data', data)
                    // window.console.log('data', JSON.stringify(data))
                    this.showLoading = true;
                    this.btnDisabled = true
                    saleOrderHandler
                        .create(data)
                        .then((response) => {
                            this.showLoading = false;
                            if (response.data.statusCode === 201) {
                                this.btnDisabled = false
                                if (this.isSaveNew == true) {
                                    this.setDefaultData();
                                } else {
                                    this.close(response.data.data);
                                }
                                // this.$refs.form.reset();
                                this.$snotify.success("Successfully");
                            } else {
                                this.btnDisabled = false
                                this.showLoading = false;
                            }
                        })
                        .catch((e) => {
                            this.$snotify.error("Something went wrong");
                            this.errors.push(e);
                            window.console.log(e);
                        });
                }, 10);
            });
        },
        async loadPaymentTermList() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (this.customer) {
                        const strFilter =
                            "?id=" +
                            this.customer.id +
                            "&transactionDate=" +
                            this.saleOrder.transactionDate +
                            "&type=Customer";
                        this.saleOrder.paymentTerm = {};
                        paymentTermHandler_.get(strFilter).then((res) => {
                            if (res.data.statusCode === 200) {
                                const terms = res.data.data;
                                this.saleOrder.paymentTerm = terms.term;
                            }
                        });
                    }
                }, 10);
            });
        },
        async loadCreditLimit() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (this.customer) {
                        const strFilter =
                            "?id=" +
                            this.customer.id +
                            "&transactionDate=" +
                            this.saleOrder.transactionDate +
                            "&type=Customer";
                        this.saleOrder.creditLimit = 0;
                        creditLimitHandler.get(strFilter).then((res) => {
                            if (res.data.statusCode === 200) {
                                // this.creditLimitItem = res.data.data
                                const credit = res.data.data;
                                this.saleOrder.creditLimit = kendo.parseFloat(
                                    credit.amount || 0
                                );
                            }
                        });
                    }
                }, 10);
            });
        },
        async clearUOMItem() {
            let ds = this.$refs.itemLineDS.kendoWidget();
            ds.data().map((n) => {
                n.set("uom", {});
            });
            this.isPriceLevelChanged = false;
        },
        onPriceLevelChange() {
            this.isPriceLevelChanged = true;
            this.loadTransactionRate();
            this.clearUOMItem();
            this.loadQuote()
        },
        async loadSaleOrder(id) {
            window.console.log(id, 'load id')
            this.showLoading = true
            transactionHandler.view(id).then((res) => {
                this.showLoading = false
                this.isEdit = true
                this.itemLines = []
                this.saleOrder = res.data.data[0]
                this.bindData();
            })
        },
        async loadEmployeeCenter() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.employees = [];
                    employeeHandler
                        .center(undefined)
                        .then((res) => {
                            this.showLoading = true;
                            this.saleOrder.employee = {}
                            this.employees = []
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.employees = res.data.data;
                                // if (this.employees.length > 0) {
                                //     this.transaction.employee = this.employees[0];
                                // }
                            } else {
                                this.showLoading = false;
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 10);
            });
        },
        async loadSingleData() {
            if (this.$route.name === 'Sale Order') {
                if (this.initsaleOrder) {
                    // Edit Mode
                    this.itemLines = []
                    this.saleOrder = this.initsaleOrder;
                    this.bindData();
                } else {
                    // new
                    if (this.$route.params.id != undefined) {
                        this.loadSaleOrder(this.$route.params.id)
                    } else {
                        this.setDefaultData()
                    }
                }
                prefixHandler.get("sale order").then((res) => {
                    if (res.data.statusCode === 200) {
                        this.showLoading = false;
                        this.transactionType = res.data.data;
                        if (this.transactionType.length > 0) {
                            if (
                                this.$route.params.id !== undefined ||
                                this.$route.params.id != ""
                            ) {
                                this.saleOrder.transactionType = this.transactionType[0];
                                if (!this.initSaleOrder && this.$route.params.id === undefined) {
                                    this.generateNumber();
                                }
                            }
                        }
                    }
                });
                await this.loadPaymentTerm();
                await this.loadSaleFormContent();
                await this.loadOtherCharge();
                await this.loadPriceLevel();
                await this.loadDiscountItem(0);
                await this.loadSaleChannel();
                await this.loadCatalogs();
                await this.loadLead();
                this.loadTax();
                this.loadSaleUnitItems();
                this.loadSegment();
                this.loadLocation();
                this.loadEmployeeCenter();
            }
        },
    },
    activated() {
        if (this.$route.params.id) {
            this.loadViewsaleOrder();
        }
    },
    watch: {
        initsaleOrder() {
            this.initialData();
        },
        '$route': 'loadSingleData',
    },
    created() {
        this.loadTax();
        this.loadSaleUnitItems();
        this.loadPrefix()
        this.loadSegment();
        this.loadLocation();
        // localStorage.saleOrder = "{name: 'abcssss'}"
    },
    computed: {
        appType() {
            return dataStore.productType;
        },
        dateFormatted() {
            return kendo.toString(new Date(), institute.dateFormat);
        },
        dateTimeFormatted() {
            window.console.log(institute.dateFormat + " HH:mm", "inst date");
            return kendo.toString(new Date(), institute.dateFormat + " HH:mm");
        },
        validCustomer() {
            return this.customer.id !== undefined && this.customer.id !== null;
        },
        hiddenButton() {
            if (this.$route.params.id) {
                return true
            } else {
                return false
            }
        },
        disabledMe() {
            return !!this.$route.params.id;
        },
    },
    mounted: async function () {
        this.loadSingleData();
        await this.requestData(0, this.filter, this.cusBaseUrl);
        await this.supplierRequestData(0, this.filter, this.supBaseUrl);
        await this.employeeRequestData(0, this.filter, this.empBaseUrl);
    },
};
</script>

<style scoped>
.function_content .label {
  margin-bottom: 10px;
  display: inline-block;
}
.all_center {
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
