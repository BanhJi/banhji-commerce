<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card
            outlined
            dense
            class="pa-4 no_border rounded-sm"
            color="white"
          >
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card outlined dense class="no_border">
                <h2 class="mb-0">{{ $t("bill_of_material") }}</h2>
                <v-icon
                  @click="cancel()"
                  style="cursor: pointer; color: #333; font-size: 40px;"
                  class="float-right"
                  >close
                </v-icon>
              </v-card>

              <v-card outlined dense class="px-3 no_border" color="grayBg">
                <v-row>
                  <v-col sm="4" cols="12" class="pb-0">
                    <label class="label  mb-0">{{ $t("bom_no") }}</label>
                    <v-row class="mt-1 mr-0">
                      <v-col sm="3" cols="3" class="pt-0 pr-0">
                        <div class="code_text">{{ bom.abbr }}</div>
                      </v-col>
                      <v-col sm="7" cols="7" class="pt-0 pl-0 pr-1">
                        <v-text-field
                          class=" custom-border "
                          v-model="bom.number"
                          disabled
                          outlined
                          tage="Bom No."
                          :rules="[(v) => !!v || 'Number is required']"
                          required
                        />
                      </v-col>
                      <v-col sm="2" cols="2" class="pt-0 px-0">
                        <v-icon
                          color="black"
                          size="30"
                          class="border_qrcode"
                          :disabled="disabledMe"
                          @click="generateNumber"
                          >mdi-qrcode
                        </v-icon>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col sm="4" cols="12" class="pb-0">
                    <label class="label  mb-0 mt-1" style="">{{
                      $t("bom_type")
                    }}</label>
                    <v-select
                      class="mt-1"
                      :items="bomTypes"
                      v-model="bom.typeBom"
                      item-text="name"
                      item-value="id"
                      return-object
                      :placeholder="$t('type')"
                      tage="Bom Type"
                      outlined
                    />
                  </v-col>
                  <v-col sm="4" cols="12" class="pb-0">
                    <label class="label  mb-0 mt-1" style="">{{
                      $t("warehouse")
                    }}</label>
                    <v-select
                      class="mt-1"
                      :items="warehouses"
                      v-model="bom.warehouse"
                      return-object
                      item-value="id"
                      item-text="name"
                      :placeholder="$t('warehouse')"
                      tage="Warehouse"
                      outlined
                    />
                  </v-col>
                  <!--                                    <v-col sm="3" cols="12" class="my_radio">-->
                  <!--                                        <input v-model="bom.materialType" id="radio1" :selected-value="{id: 1, name: 'Build Assembly'}" name="radio" type="radio">-->
                  <!--                                        <label for="radio1">{{ $t('build_assembly') }}</label>-->
                  <!--                                        <input v-model="bom.materialType" :selected-value="{id: 2, name: 'Production'}" id="radio2" name="radio" type="radio">-->
                  <!--                                        <label for="radio2">{{ $t('production') }}</label>-->
                  <!--                                    </v-col>-->
                </v-row>
              </v-card>
              <v-row>
                <v-col sm="12" cols="12" class="pt-0">
                  <!-- Grid One -->
                  <v-row style="background-color: #fff;">
                    <v-col cols="12" class="py-1 pb-0">
                      <h2 class="primary--text mb-0 font_18 text-uppercase">
                        {{ $t("finished_product") }}
                      </h2>
                    </v-col>
                    <v-col sm="12" cols="12" class="pt-1">
                      <kendo-datasource
                        ref="finishProductDS"
                        :change="dataSourceChanged"
                        :data="bom.finishProduct"
                      />
                      <kendo-grid
                        id="gridFinishProduct"
                        class="grid-function"
                        :data-source-ref="'finishProductDS'"
                        :sortable="false"
                        :filterable="false"
                        :column-menu="true"
                        :editable="true"
                        :scrollable-virtual="true"
                      >
                        <kendo-grid-column
                          :template="rowNumberFP"
                          :title="$t('no.')"
                          :width="55"
                          :column-menu="false"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5;',
                            class: 'text-variants',
                          }"
                          :attributes="{
                            style: 'text-align: variants',
                          }"
                        />
                        <kendo-grid-column
                          :field="'item'"
                          :title="$t('items')"
                          :width="200"
                          :editable="
                            () => {
                              return true;
                            }
                          "
                          :template="itemTemplate"
                          :editor="ItemDropDownEditorFP"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'buom'"
                          :title="$t('base_uom')"
                          :width="150"
                          :template="UOMTemplate"
                          :editor="UOMDropDownEditor"
                          :editable="
                            () => {
                              return false;
                            }
                          "
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: right; ' }"
                        />
                        <!-- <kendo-grid-column
                          :field="'description'"
                          :title="$t('description')"
                          :width="200"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        /> -->

                        <kendo-grid-column
                          :field="'yieldQty'"
                          :title="$t('yield_qty')"
                          :attributes="{
                            class: 'k-state-disabled',
                            style: 'text-align: right',
                          }"
                          :width="150"
                          :template="
                            '<span>#=kendo.toString(yieldQty || 0, decimalFormat) || 0#</span>'
                          "
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'cost'"
                          :title="$t('cost')"
                          :width="150"
                          :editor="numberEditor"
                          :template="
                            '<span>#=kendo.toString(cost || 0, decimalFormat) || 0#</span>'
                          "
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                          :attributes="{
                            style: 'text-align: right',
                          }"
                        />
                        <kendo-grid-column
                          :field="'amount'"
                          :title="$t('amount')"
                          :width="150"
                          :template="
                            '<span>#=kendo.toString(amount || 0, decimalFormat) || 0#</span>'
                          "
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                          :attributes="{
                            style: 'text-align: right',
                          }"
                        />
                      </kendo-grid>
                    </v-col>
                  </v-row>
                  <!-- Grid Two -->
                  <v-row style="background-color: #fff;">
                    <v-col cols="12" class="pt-0 pb-0">
                      <h2 class="primary--text mb-0 font_18 text-uppercase">
                        {{ $t("by_product") }}
                      </h2>
                    </v-col>
                    <v-col sm="12" cols="12" class="pt-1">
                      <kendo-datasource
                        ref="otherProductDS"
                        :change="dataSourceChangedOP"
                        :data="bom.otherFinishProduct"
                      />
                      <kendo-grid
                        id="gridOtherProduct"
                        class="grid-function"
                        :data-source-ref="'otherProductDS'"
                        :sortable="false"
                        :filterable="false"
                        :column-menu="true"
                        :editable="true"
                        :scrollable-virtual="true"
                      >
                        <kendo-grid-column
                          :template="rowNumberOP"
                          :title="$t('no.')"
                          :width="55"
                          :column-menu="false"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5;',
                            class: 'text-variants',
                          }"
                          :attributes="{
                            style: 'text-align: variants',
                          }"
                        />
                        <kendo-grid-column
                          :field="'item'"
                          :title="$t('item')"
                          :width="200"
                          :template="itemTemplate"
                          :editor="ItemDropDownEditorFP"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <!-- <kendo-grid-column
                          :field="'description'"
                          :title="$t('description')"
                          :width="200"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        /> -->
                        <kendo-grid-column
                          :field="'buom'"
                          :title="$t('base_uom')"
                          :width="150"
                          :template="UOMTemplate"
                          :editor="UOMDropDownEditorOP"
                          :editable="
                            () => {
                              return false;
                            }
                          "
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: right; ' }"
                        />
                        <kendo-grid-column
                          :field="'yieldQty'"
                          :title="$t('yield_qty')"
                          :width="150"
                          :template="
                            '<span>#=kendo.toString(yieldQty || 0, decimalFormat) || 0#</span>'
                          "
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                          :attributes="{
                            style: 'text-align: right',
                          }"
                        />
                        <kendo-grid-column
                          :field="'cost'"
                          :title="$t('cost')"
                          :width="150"
                          :template="
                            '<span>#=kendo.toString(cost || 0, decimalFormat) || 0#</span>'
                          "
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                          :attributes="{
                            style: 'text-align: right',
                          }"
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
                          :template="
                            '<span>#=kendo.toString(amount || 0, decimalFormat) || 0#</span>'
                          "
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                          :attributes="{
                            style: 'text-align: right',
                          }"
                        />
                        <kendo-grid-column
                          :command="{
                            iconClass: 'k-icon k-i-trash',
                            text: 'Delete',
                            click: removeRowOP,
                            class: 'btn-plus',
                          }"
                          :title="'&nbsp;'"
                          :width="100"
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                        />
                      </kendo-grid>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-btn
                        color="primary"
                        class="float-left btn_plus rounded-4 white--text mr-2"
                        @click="addRowOtherProduct"
                      >
                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <!-- Grid Three -->
                  <v-row style="background-color: #fff;">
                    <v-col cols="12" class="pt-0 pb-0">
                      <h2 class="primary--text mb-0 font_18 text-uppercase">
                        {{ $t("components_used") }}
                      </h2>
                    </v-col>
                    <v-col sm="12" cols="12" class="pt-1">
                      <kendo-datasource
                        ref="componentUseDS"
                        :change="dataSourceChangedCU"
                        :data="bom.componentUsed"
                      />
                      <kendo-grid
                        id="gridComponentUse"
                        class="grid-function"
                        :data-source-ref="'componentUseDS'"
                        :sortable="false"
                        :filterable="false"
                        :column-menu="true"
                        :editable="true"
                        :scrollable-virtual="true"
                      >
                        <kendo-grid-column
                          :template="rowNumberCU"
                          :title="$t('no.')"
                          :width="55"
                          :column-menu="false"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5;',
                            class: 'text-variants',
                          }"
                          :attributes="{
                            style: 'text-align: variants',
                          }"
                        />
                        <kendo-grid-column
                          :field="'item'"
                          :title="$t('item')"
                          :width="200"
                          :template="itemTemplate"
                          :editor="ItemDropDownEditor"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <!-- <kendo-grid-column
                          :field="'description'"
                          :title="$t('description')"
                          :width="200"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        /> -->
                        <kendo-grid-column
                          :template="UOMTemplate"
                          :editor="UOMDropDownEditorOP"
                          :field="'buom'"
                          :title="$t('base_uom')"
                          :width="160"
                          :editable="
                            () => {
                              return false;
                            }
                          "
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'qty'"
                          :title="$t('qty')"
                          :width="150"
                          :editor="numberEditor"
                          :template="
                            '<span>#=kendo.toString(qty || 0, decimalFormat) || 0#</span>'
                          "
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                          :attributes="{
                            style: 'text-align: right',
                          }"
                        />
                        <kendo-grid-column
                          :field="'cost'"
                          :title="$t('cost')"
                          :width="150"
                          :editor="numberEditor"
                          :template="
                            '<span>#=kendo.toString(cost || 0, decimalFormat) || 0#</span>'
                          "
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                          :attributes="{
                            style: 'text-align: right',
                          }"
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
                          :template="
                            '<span>#=kendo.toString(amount || 0, decimalFormat) || 0#</span>'
                          "
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                          :attributes="{
                            style: 'text-align: right',
                          }"
                        />
                        <kendo-grid-column
                          :command="{
                            iconClass: 'k-icon k-i-trash',
                            text: 'Delete',
                            click: removeRowCU,
                            class: 'btn-plus',
                          }"
                          :title="'&nbsp;'"
                          :width="100"
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                        />
                      </kendo-grid>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-btn
                        color="primary"
                        class="float-left btn_plus rounded-4 white--text mr-2"
                        @click="addRowComponentUse"
                      >
                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row style="background-color: #fff;">
                    <v-col sm="12" cols="12" class="py-0">
                      <v-row>
                        <v-col sm="6" cols="6" class="py-0">
                          <v-textarea
                            class="mt-1"
                            outlined
                            clearable
                            rows="3"
                            no-resize
                            v-model="bom.transactionNote"
                            height="90px"
                            tag="Memo"
                            placeholder="Memo"
                          />
                        </v-col>
                        <v-col sm="6" cols="6" class="py-0">
                          <v-simple-table>
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <td class="text-left text-uppercase">
                                    {{ $t("total_cost") }}
                                  </td>
                                  <td class="text-center">:</td>
                                  <td class="text-bold text-right">
                                    {{ numberFormat(bom.exchangeAmount) }}
                                  </td>
                                </tr>
                                <tr>
                                  <td class="text-left text-uppercase">
                                    {{ $t("variance") }}
                                  </td>
                                  <td class="text-center">:</td>
                                  <td
                                    v-bind:class="[
                                      bom.variance >= 0 ? '' : 'redText',
                                    ]"
                                    class="text-right text-bold"
                                  >
                                    {{ numberFormat(bom.variance) }}
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider />
              <v-card outlined dense class="no_border function_footer">
                <v-alert type="warning" v-model="alert" dismissible>
                  <span v-html="errorMessage" />
                </v-alert>
                <v-menu>
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
                  class="text-capitalize rounded-pill white--text float-left"
                  @click="cancel"
                >
                  {{ $t("cancel") }}
                </v-btn>
                <v-btn
                  color="primary"
                  @click="saveClose()"
                  class="mr-2 float-right white--text text-capitalize rounded-pill"
                >
                  {{ $t("save_close") }}
                </v-btn>
              </v-card>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <LoadingMe
        :isLoading="showLoading"
        :fullPage="false"
        type="loading"
        :myLoading="true"
      />
    </v-container>
  </v-app>
</template>

<script>
import { i18n } from "@/i18n";
import BomModel from "@/scripts/model/Bom";
import kendo from "@progress/kendo-ui";
import SaleFormContentModel from "@/scripts/model/SaleFormContent";
import FinishProductModel from "@/scripts/bom/FinishProduct";
import OtherFinishProductModel from "@/scripts/bom/OtherFinishProduct";
import ComponentModel from "@/scripts/bom/ComponentUsed";
import { uuid } from "vue-uuid";

const productVariantHandler = require("@/scripts/productVariantHandler");
const uomPriceHandler = require("@/scripts/uomPriceHandler");
const warehouseHandler = require("@/scripts/warehouseHandler");
const bomHandler = require("@/scripts/bomHandler");
const prefixHandler = require("@/scripts/prefixHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const saleFormContentHandler = require("@/scripts/saleFormContentHandler");
const saleFormContentModel = new SaleFormContentModel({});
const currencyHandler = require("@/scripts/currency/handler/currencyHandler");

const bomModel = new BomModel({});
const $ = require("jquery");
const itemLinePrefix = "lin-";
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();

export default {
  name: "BillOfMaterial",
  props: ["id"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    // 'app-datepicker' : DatePickerComponent,
  },
  computed: {
    disabledMe() {
      return !!this.$route.params.id;
    },
    // totalCost() {
    //   if (this.costFP !== 0 || this.costOFP !== 0) {
    //     return this.costOFP + this.costFP
    //   } else {
    //     return 0
    //   }
    // },
    // varianceAmount() {
    //   if (this.costFP !== 0 || this.costOFP !== 0 || this.costCU !== 0 || this.costOC !== 0) {
    //     return (this.costFP + this.costOFP) - (this.costCU + this.costOC)
    //   } else {
    //     return 0
    //   }
    // }
  },
  data: () => ({
    isEdit: false,
    showLoading: false,
    alert: false,
    // Form validation
    valid: true,
    isHideBar: false,
    warehouses: [],
    bom: bomModel,
    bomNo: "",
    bomTypes: [
      { id: 1, name: "One Time Use" },
      { id: 2, name: "Multiple Use" },
    ],
    itemLinesFP: new FinishProductModel({}),
    itemLinesOP: new OtherFinishProductModel({}),
    itemLinesCU: new ComponentModel({}),
    itemLinesOC: bomModel.otherCost,
    finishProductItems: [],
    otherFinishProductItems: [],
    componentUsedItems: [],
    otherCosts: [],
    tax: [],
    vatTax: [],
    accounts: [],
    costFP: 0,
    costOFP: 0,
    costCU: 0,
    costOC: 0,
    itemLineOP: [],
    itemLineCU: [],
    itemLineFP: [],
    itemLineOC: [],
    saleFormContent: saleFormContentModel,
    baseCurrency: {},
    exchangeRate: {},
    loggedUser: {
      id: cookie.creator,
      name: cookie.email,
    },
    templates: [
      { title: "Draft" },
      { title: "Open" },
      { title: "Partially Closed" },
      { title: "Closed" },
    ],
  }),
  methods: {
    async loadViewBOM() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.$route.params.id) {
            this.showLoading = true;
            bomHandler.getAll("?id=" + this.$route.params.id).then((res) => {
              this.showLoading = false;
              this.bom = res[0];
              // this.autoCalculateGrid1()
              // this.autoCalculateGrid2()
              // this.autoCalculateGrid3()
            });
          } else {
            // this.bom.finishProduct = []
            // this.bom.otherFinishProduct = []
            // this.bom.componentUsed = []
            this.addRowFinishProduct();
            this.addRowOtherProduct();
            this.addRowComponentUse();
          }
        }, 10);
      });
    },
    numberFormat(value) {
      return kendo.toString(value, `n${this.saleFormContent.decimal}`);
    },
    numberEditor(container, options) {
      kendo
        .jQuery('<input data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
          decimals: 30,
          min: 0,
          format: `${this.saleFormContent.decimal}`,
        });
    },
    async loadSaleFormContent() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          saleFormContentHandler.list().then(async (res) => {
            if (res.data.statusCode === 200) {
              const data = res.data.data;
              if (data.length > 0) {
                this.saleFormContent = data[0];
                this.baseCurrency = data[0].baseCurrency;
                this.bom.currency = this.baseCurrency;
                await this.loadTransactionRate();
              }
            }
          });
        }, 10);
      });
    },
    async loadTransactionRate() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const date = new Date().toISOString().substr(0, 10);
          const currency = this.baseCurrency;
          let code = "";
          if (currency.hasOwnProperty("code")) {
            code = currency.code;
          }
          if (code !== undefined || code !== "") {
            this.showLoading = true;
            currencyHandler
              .getLastExchangeRateByDate(date, code)
              .then((res) => {
                if (res.data.statusCode === 200) {
                  this.showLoading = false;
                  this.exchangeRate = res.data.data[0];
                  this.bom.txnRate = this.exchangeRate.rate;
                  this.bom.exchangeRate = this.exchangeRate;
                  this.showLoading = false;
                }
              });
          }
        }, 10);
      });
    },
    async loadPrefix() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          prefixHandler.get("bill of material").then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.transactionTypes = res.data.data;
              if (this.transactionTypes.length > 0) {
                this.bom.transactionType = this.transactionTypes[0];
                if (this.$route.params.id === undefined) {
                  this.generateNumber();
                }
              }
            }
          });
        }, 10);
      });
    },
    generateNumber() {
      let data = {
        abbr: this.bom.transactionType.abbr,
        structure: this.bom.transactionType.structure,
        transactionDate: new Date().toISOString().substr(0, 10),
        sequcencing: this.bom.transactionType.sequcencing,
        type: "Bill Of Material",
        entity: 2,
      };
      this.bom.abbr = data.abbr;
      this.bom.structure = data.structure;
      this.bom.sequcencing = data.sequcencing;
      this.bom.type = data.type;
      this.bom.transactionDate = data.transactionDate;
      this.showLoading = true;
      billingHandler
        .lastNumber(data)
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.showLoading = false;
            const res = response.data.data;
            const lastNumber = this.zeroPad(
              parseInt(res.lastNumber),
              this.bom.transactionType.format
            );
            this.bom.number =
              res.suffix +
              this.bom.transactionType.numberSeparator +
              lastNumber;
            this.bom.lastNumber = res.suffix + lastNumber;
          }
        })
        .catch((e) => {
          this.showLoading = false;
          this.errors.push(e);
        });
    },
    zeroPad(num, places) {
      return String(num).padStart(places, "0");
    },
    suffix(transactionDate) {
      return kendo.toString(new Date(transactionDate), `yymm`);
    },
    async loadWarehouses() {
      warehouseHandler.getWarehouseSettingAll().then((res) => {
        this.warehouses = res;
      });
    },
    async getDataSource() {
      let dsFP = this.$refs.finishProductDS.kendoWidget();
      let dataRowFP = dsFP.data();
      this.itemLineFP = [];
      dataRowFP.forEach((i) => {
        this.itemLineFP.push({
          id: i.id,
          item: i.item,
          description: i.description,
          buom: i.buom,
          uom: i.uom,
          yieldQty: i.yieldQty,
          cost: i.cost,
          amount: i.amount,
          sku: i.sku,
          decimalFormat: i.decimalFormat || "n2",
          inventoryAccount: i.inventoryAccount,
        });
      });
      let dsOP = this.$refs.otherProductDS.kendoWidget(),
        dataRowOP = dsOP.data();
      this.itemLineOP = [];
      dataRowOP.forEach((i) => {
        this.itemLineOP.push({
          id: i.id,
          item: i.item,
          description: i.description,
          buom: i.buom,
          uom: i.uom,
          yieldQty: i.yieldQty,
          cost: i.cost,
          amount: i.amount,
          sku: i.sku,
          decimalFormat: i.decimalFormat || "n2",
          inventoryAccount: i.inventoryAccount,
        });
      });
      let dsCU = this.$refs.componentUseDS.kendoWidget(),
        dataRowCU = dsCU.data();
      this.itemLineCU = [];
      dataRowCU.forEach((i) => {
        this.itemLineCU.push({
          id: i.id,
          item: i.item,
          description: i.description,
          buom: i.buom,
          uom: i.uom,
          qty: i.qty,
          cost: i.cost,
          amount: i.amount,
          sku: i.sku,
          decimalFormat: i.decimalFormat || "n2",
          inventoryAccount: i.inventoryAccount,
        });
      });
      // let dsOC = this.$refs.otherCostDS.kendoWidget(),
      //     dataRowOC = dsOC.data()
      this.itemLineOC = [];
      // dataRowOC.forEach(i => {
      //   this.itemLineOC.push({
      //     id: i.id,
      //     account: i.account,
      //     description: i.description,
      //     amount: i.amount,
      //     tax: i.tax,
      //   })
      // })
    },
    savePrint() {},
    async saveNew() {},
    async saveClose() {
      if (this.bom.variance !== 0) {
        this.$snotify.error("Please check your variance amount");
        return;
      }
      await this.getDataSource();
      this.bom.finishProduct = this.itemLineFP;
      this.bom.itemId = this.itemLineFP[0].item
        ? this.itemLineFP[0].item.id
        : "";
      this.bom.otherFinishProduct = this.itemLineOP
      this.bom.componentUsed = this.itemLineCU
      // this.bom.otherCost = this.itemLineOC
      // this.bom.amount = this.totalCost
      // this.bom.exchangeAmount = this.totalCost
      // this.bom.variance = this.varianceAmount
      this.bom.status = 1;
      this.showLoading = true;
      await bomHandler.save(this.bom).then((res) => {
        this.showLoading = false;
        this.$router.push({
          name: "Products",
          path: "product",
          params: { dataBom: res },
        });
      });
    },
    removeRow() {},
    errorMessage() {},
    async dataSourceChanged(e) {
      if (e.field) {
        let dataRow = e.items[0],
          buom = {};
        switch (e.field) {
          case "item":
            // this.attribute_ = this.attributes.filter(m => m.type.id === dataRow.variant.id)
            dataRow.set("description", dataRow.item.description);
            dataRow.set("yieldQty", 1);
            buom = dataRow.item.uom;
            dataRow.set("buom", buom);
            await this.inventoryBalanceByItem(dataRow, dataRow.item.id, 1);
            break;
          // case "uom":
          //   // window.console.log(dataRow.uom,'row-uom')
          //   dataRow.set('cost', parseFloat(dataRow.uom.price))
          //   window.console.log(dataRow.yieldQty)
          //   if (dataRow.yieldQty !== undefined) {
          //     dataRow.set('cost', parseFloat(dataRow.uom.price) * parseFloat(dataRow.yieldQty))
          //     this.costFP = dataRow.cost
          //   }
          //   break
          case "cost":
            dataRow.set(
              "amount",
              parseFloat(dataRow.cost) * parseFloat(dataRow.yieldQty)
            );
            this.costFP = dataRow.amount;
            break;
          default:
            break;
        }
        if (e.field) {
          this.autoCalculateGrid1();
          this.autoCalculateGrid2();
          this.autoCalculateGrid3();
        }
      }
    },
    async dataSourceChangedOP(e) {
      if (e.field) {
        let dataRow = e.items[0],
          buom = {};
        switch (e.field) {
          case "item":
            dataRow.set("description", dataRow.item.description);
            dataRow.set("yieldQty", 1);
            buom = dataRow.item.uom;
            dataRow.set("buom", buom);
            await this.inventoryBalanceByItem(dataRow, dataRow.item.id, 1);
            break;
          case "yieldQty":
            dataRow.set(
              "amount",
              parseFloat(dataRow.cost) * parseFloat(dataRow.yieldQty)
            );
            // this.costOFP = dataRow.amount
            break;
          case "cost":
            dataRow.set(
              "amount",
              parseFloat(dataRow.cost) * parseFloat(dataRow.yieldQty)
            );
            // this.costOFP = dataRow.amount
            window.console.log(dataRow.cost);
            break;
          default:
            break;
        }
        if (e.field) {
          this.autoCalculateGrid1();
          this.autoCalculateGrid2();
          this.autoCalculateGrid3();
        }
      }
    },
    autoCalculateGrid1() {
      let ds = this.$refs.finishProductDS.kendoWidget();
      const row = ds.data();
      let amount = 0;
      row.forEach((n) => {
        amount += n.amount || 0;
      });
      this.costFP = amount;
      this.bom.amount = this.costOFP + this.costFP;
      this.bom.exchangeAmount = this.costOFP + this.costFP;
      this.bom.variance =
        this.costFP + this.costOFP - (this.costCU + this.costOC);
    },
    autoCalculateGrid2() {
      let ds = this.$refs.otherProductDS.kendoWidget();
      const row = ds.data();
      let amount = 0;
      row.forEach((n) => {
        amount += n.amount || 0;
      });
      this.costOFP = amount;
      this.bom.amount = this.costOFP + this.costFP;
      this.bom.exchangeAmount = this.costOFP + this.costFP;
      this.bom.variance =
        this.costFP + this.costOFP - (this.costCU + this.costOC);
    },
    autoCalculateGrid3() {
      let ds = this.$refs.componentUseDS.kendoWidget();
      const row = ds.data();
      let amount = 0;
      row.forEach((n) => {
        amount += n.amount || 0;
      });
      this.costCU = amount;
      this.bom.amount = this.costOFP + this.costFP;
      this.bom.exchangeAmount = this.costOFP + this.costFP;
      this.bom.variance =
        this.costFP + this.costOFP - (this.costCU + this.costOC);
      window.console.log(
        "this.bom.exchangeAmount",
        this.bom.exchangeAmount,
        "variance",
        this.bom.variance
      );
    },
    async dataSourceChangedOC(e) {
      if (e.field) {
        let dataRow = e.items[0];
        switch (e.field) {
          case "account":
            window.console.log(dataRow.account);
            break;
          case "tax":
            break;
          case "amount":
            this.costOC = dataRow.amount;
            break;
          default:
            break;
        }
      }
    },
    async dataSourceChangedCU(e) {
      if (e.field) {
        let dataRow = e.items[0],
          buom = {};
        switch (e.field) {
          case "item":
            dataRow.set("description", dataRow.item.description);
            dataRow.set("qty", 1);
            buom = dataRow.item.uom;
            dataRow.set("buom", buom);
            await this.inventoryBalanceByItem(dataRow, dataRow.item.id, 2);
            break;
          // case "uom":
          //   // window.console.log(dataRow.uom,'row-uom')
          //   dataRow.set('cost', parseFloat(dataRow.uom.price))
          //   window.console.log(dataRow.qty)
          //   if (dataRow.qty !== undefined) {
          //     dataRow.set('cost', parseFloat(dataRow.uom.price) * parseFloat(dataRow.qty))
          //     this.costCU = dataRow.cost
          //   }
          //   break
          case "qty":
            // dataRow.set('price', parseFloat(dataRow.uom.price))
            // dataRow.set('cost', parseFloat(dataRow.uom.price) * parseFloat(dataRow.qty))
            dataRow.set(
              "amount",
              parseFloat(dataRow.cost) * parseFloat(dataRow.qty)
            );
            // this.costCU = dataRow.amount
            break;
          case "cost":
            dataRow.set(
              "amount",
              parseFloat(dataRow.cost) * parseFloat(dataRow.qty)
            );
            // this.costCU = dataRow.amount
            break;
          default:
            break;
        }
        if (e.field) {
          this.autoCalculateGrid1();
          this.autoCalculateGrid2();
          this.autoCalculateGrid3();
        }
      }
    },
    rowNumberFP(dataItem) {
      let ds = this.$refs.finishProductDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
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
                  id: { type: "string" },
                  // name: {type: "string"},
                  // sku: {type: "string"},
                },
              },
              data: function(response) {
                return response.data;
              },
              total: function(response) {
                return response.data.count;
              },
            },
            // data: this.variants
          }),
        });
    },
    UOMTemplate(dataItem) {
      const uom = dataItem.buom;
      if (uom) {
        return `<span>${uom.name ? uom.name : ``}</span>`;
      } else {
        return ``;
      }
    },
    ItemDropDownEditorFP(container, options) {
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
                url: productVariantHandler.itemVariantSearchURL(), // variant only
              },
              dataType: "json",
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  id: { type: "string" },
                  name: { type: "string" },
                  sku: { type: "string" },
                },
              },
              data: function(response) {
                return response.data;
              },
              total: function(response) {
                return response.data.count;
              },
            },
            // data: this.variants
          }),
        });
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
                  id: { type: "string" },
                  name: { type: "string" },
                  sku: { type: "string" },
                },
              },
              data: function(response) {
                return response.data;
              },
              total: function(response) {
                return response.data.count;
              },
            },
            // data: this.variants
          }),
        });
    },
    itemTemplate(dataItem) {
      const item = dataItem.item;
      if (item) {
        return `<span>${item.name ? item.name : ``}</span>`;
      } else {
        return ``;
      }
    },
    async inventoryBalanceByItem(dataRow, itemId, flag = 1) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          const startDate = new Date().toISOString().substr(0, 10);
          let strFilter = "?asOf=" + startDate + "&id=" + itemId;
          billingHandler.inventoryBalance(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              const balance = res.data.data;
              if (balance.length > 0) {
                dataRow.set("cost", balance[0].wac);
                dataRow.set("qoh", balance[0].qoh);
                if (flag === 1) {
                  dataRow.set(
                    "amount",
                    parseFloat(balance[0].wac) * parseFloat(dataRow.yieldQty)
                  );
                } else {
                  dataRow.set(
                    "amount",
                    parseFloat(balance[0].wac) * parseFloat(dataRow.qty)
                  );
                }
              } else {
                dataRow.set("cost", 0);
              }
            }
            this.showLoading = false;
          });
        }, 10);
      });
    },
    async addRowFinishProduct() {
      let ds = this.$refs.finishProductDS.kendoWidget(),
        total = ds.total();
      this.itemLinesFP.id = itemLinePrefix + uuid.v1();
      this.itemLinesFP.decimalFormat = "n" + this.saleFormContent.decimal;
      if (total === 0) {
        ds.insert(total, this.itemLinesFP);
      }
    },

    UOMDropDownEditorOP(container, options) {
      kendo
        .jQuery('<input name="' + options.field + '"/>')
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
                  id: { type: "string" },
                  // name: {type: "string"},
                  // sku: {type: "string"},
                },
              },
              data: function(response) {
                return response.data;
              },
              total: function(response) {
                return response.data.count;
              },
            },
            // data: this.variants
          }),
        });
    },
    UOMTemplateOP(dataItem) {
      const uom = dataItem.uom;
      if (uom) {
        return `<span>${uom.uom ? uom.uom.toUOM.name : ``}</span>`;
      } else {
        return ``;
      }
    },
    rowNumberOP(dataItem) {
      let ds = this.$refs.otherProductDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    addRowOtherProduct() {
      let ds = this.$refs.otherProductDS.kendoWidget(),
        total = ds.total();
      this.itemLinesOP.id = itemLinePrefix + uuid.v1();
      this.itemLinesOP.decimalFormat = "n" + this.saleFormContent.decimal;
      ds.insert(total, this.itemLinesOP);
    },
    removeRowOP(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridOtherProduct").data("kendoGrid"),
        dataSource = grid.dataSource,
        dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

      if (dataSource.total() >= 1) {
        dataSource.remove(dataItem);
      }
    },
    removeRowCU(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridComponentUse").data("kendoGrid"),
        dataSource = grid.dataSource,
        dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

      if (dataSource.total() > 1) {
        dataSource.remove(dataItem);
      }
    },
    UOMTemplateCU(dataItem) {
      const uom = dataItem.uom;
      if (uom) {
        return `<span>${uom.uom ? uom.uom.toUOM.name : ``}</span>`;
      } else {
        return ``;
      }
    },

    rowNumberCU(dataItem) {
      let ds = this.$refs.componentUseDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    addRowComponentUse() {
      let ds = this.$refs.componentUseDS.kendoWidget(),
        total = ds.total();
      this.itemLinesCU.id = itemLinePrefix + uuid.v1();
      this.itemLinesCU.decimalFormat = "n" + this.saleFormContent.decimal;
      ds.insert(total, this.itemLinesCU);
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
        if (resultCen.value) {
          this.$router.go(-1);
        }
      });
    },
  },
  async mounted() {
    await this.loadSaleFormContent();
    await this.loadPrefix();
    await this.loadWarehouses();
    await this.loadViewBOM();
  },
  async created() {
    // await this.loadTax()
    // await this.loadAccount()
  },
  activated() {
    this.bom.finishProduct = [];
    this.bom.otherFinishProduct = [];
    this.bom.componentUsed = [];
    this.loadViewBOM();
  },
  deactivated() {
    this.bom.finishProduct = [];
    this.bom.otherFinishProduct = [];
    this.bom.componentUsed = [];
    // this.addRowFinishProduct()
    // this.addRowOtherProduct()
    // this.addRowComponentUse()
  },
  watch: {
    // '$router': 'loadViewBOM'
  },
};
</script>
<style scoped>
.redText {
  color: red !important;
}

.small_sidebar {
  height: 97%;
  position: relative;
  padding: 12px;
}

.hide_small_bar_class {
  max-width: 0;
  transition: 0.5s ease-in;
  flex: 0 0 0;
  padding: 0;
}

.hide_big_bar_class {
  max-width: 100%;
  transition: 0.5s ease-in;
  flex: 0 0 100%;
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

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.detial_smallside_p {
  position: absolute;
  bottom: 10px;
}

@media (min-width: 1264px) {
  .container {
    /* max-width: 1185px; */
    max-width: 1080px !important;
  }
}
</style>
