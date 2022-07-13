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
                <h2 class="mb-0">{{ $t("stock_count") }}</h2>
                <v-icon
                  onclick="window.history.go(-1); return false;"
                  class="float-right close_icon"
                  >close
                </v-icon>
              </v-card>
              <v-card outlined dense class="px-3 no_border" color="grayBg">
                <v-row>
                  <v-col sm="3" cols="12" class="pb-0 kendo_dropdown_custom">
                    <label class="label mb-0 mt-1" style="">{{
                      $t("category")
                    }}</label>
                    <product-category-dropdownlist
                      :initCategory="stockCount.category"
                      :initModel="stockCount.category"
                      @onChange="onCategoryChanged"
                    />
                    <div class="mt-4">
                      <label class="label mb-0" style="">{{
                        $t("group")
                      }}</label>
                      <product-group-dropdownlist
                        :initProductGroup="stockCount.group"
                        :initModel="stockCount.group"
                        @onChange="onGroupChanged"
                      />
                    </div>
                  </v-col>
                  <v-col sm="3" cols="12" class="pb-0 kendo_dropdown_custom">
                    <label class="label mb-0 mt-1" style="">{{
                      $t("sub_group")
                    }}</label>
                    <product-sub-group-dropdownlist
                      :initProductGroup="productSubGroup"
                      :initModel="stockCount.subGroup"
                      @onChange="onSubGroupChanged"
                    />
                    <div class="mt-4">
                      <label class="label mb-0">{{ $t("warehouse") }}</label>
                      <v-select
                        class="mt-1"
                        item-value="id"
                        v-model="stockCount.warehouse"
                        :items="warehouse"
                        item-text="name"
                        :rules="[(v) => !!v['id'] || $t('is required!')]"
                        clearable
                        return-object
                        tage="Warehouse"
                        placeholder="warehouse"
                        outlined
                      />
                    </div>
                  </v-col>
                  <v-col sm="3" cols="12" class="pb-0">
                    <label class="label mb-0 mt-1" style="">{{
                      $t("date")
                    }}</label>
                    <app-datepicker
                      :initialDate="stockCount.transactionDate"
                      @onChanged="onTransactionDateChanged"
                      @emitDate="stockCount.transactionDate = $event"
                    />
                    <label class="label">{{ $t("number") }}</label>
                    <div class="d-flex mt-1">
                      <div class="code_text flex-1 text-bold">
                        {{ stockCount.abbr || "" }}
                      </div>
                      <v-text-field
                        class="flex-2 custom-border"
                        v-model="stockCount.number"
                        readonly
                        outlined
                        :rules="[(v) => !!v || $t('is_required')]"
                        required
                      />
                      <v-icon
                        color="black"
                        size="30"
                        style="height: 40px"
                        @click="generateNumber"
                        :disabled="disabled"
                        class="border_qrcode ml-2"
                        >mdi-qrcode
                      </v-icon>
                    </div>
                  </v-col>
                  <v-col sm="1" cols="1" class="pt-9">
                    <v-btn
                      color="primary white--text"
                      @click="loadProductCenter"
                    >
                      <i
                        class="b-search"
                        style="font-size: 18px; color: #fff !important"
                      />
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
              <v-card outlined dense class="no_border mb-1" color="white">
                <v-row>
                  <v-col sm="12" cols="12" class="">
                    <v-row>
                      <v-col sm="12">
                        <h3 class="mb-0">
                          <!--                                                    {{ $t("product_to_add_into_this_catalog") }}-->
                        </h3>
                      </v-col>
                      <v-col cols="12">
                        <kendo-datasource
                          ref="itemLineStockCountDS"
                          :data="itemList"
                        />
                        <kendo-grid
                          id="gridItemLine"
                          class="grid-function"
                          :data-source-ref="'itemLineStockCountDS'"
                          :sortable="true"
                          :column-menu="false"
                          :editable="true"
                          :resizable="true"
                          :scrollable-virtual="true"
                        >
                          <kendo-grid-column
                            :command="{
                              iconClass: 'k-icon k-i-trash',
                              text: ' ',
                              click: removeRow,
                              class: 'btn-plus',
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
                            :field="'sku'"
                            :title="$t('sku')"
                            :editable="
                              () => {
                                return false;
                              }
                            "
                            :template="'<span>#=sku || ``#</span>'"
                            :width="200"
                            :headerAttributes="{
                              style: 'background-color: #EDF1F5',
                            }"
                          />
                          <kendo-grid-column
                            :field="'item'"
                            :title="$t('item')"
                            :editable="
                              () => {
                                return false;
                              }
                            "
                            :template="'<span>#=item.name || ``#</span>'"
                            :width="200"
                            :headerAttributes="{
                              style: 'background-color: #EDF1F5',
                            }"
                          />
                          <!-- <kendo-grid-column
                                                        :field="'description'"
                                                        :title="$t('description')"
                                                        :editable=" () => { return false; } "
                                                        :template="'<span>#=description#</span>'"
                                                        :width="200"
                                                        :headerAttributes="{  style: 'background-color: #EDF1F5', }"
                                                    /> -->

                          <kendo-grid-column
                            :field="'uom'"
                            :title="$t('buom')"
                            :width="170"
                            :template="UOMTemplate"
                            :editable="
                              () => {
                                return false;
                              }
                            "
                            :headerAttributes="{
                              style:
                                'text-align: left; background-color: #EDF1F5',
                            }"
                            :attributes="{ style: 'text-align: left' }"
                          />
                          <kendo-grid-column
                            :field="'count'"
                            :title="$t('counted')"
                            :editor="numberEditor"
                            :template="'<span>#=count#</span>'"
                            :width="170"
                            :headerAttributes="{
                              style:
                                'text-align: left; background-color: #EDF1F5',
                            }"
                            :attributes="{ style: 'text-align: right; ' }"
                          />
                        </kendo-grid>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
              <v-divider />
              <v-card outlined dense class="no_border function_footer">
                <v-btn
                  @click="cancel"
                  color="black"
                  outlined
                  class="text-capitalize black--text float-left"
                  >{{ $t("cancel") }}
                </v-btn>
                <v-menu>
                  <template v-slot:activator="{ on }">
                    <v-btn color="secondary"
                          class="ml-2 float-right text-capitalize  white&#45;&#45;text"
                          v-on="on">
                      {{ $t('save_option') }}
                      <v-icon size="" class="ma-1">expand_more</v-icon>
                    </v-btn>
                  </template>
                  <v-list rounded>
                    <v-list-item-group>
                      <v-list-item>
                        <v-list-item-content>
                        <v-btn
                            @click="onSaveClose(true)"
                            color="secondary"
                            class="float-right mx-2 white--text text-capitalize"
                            >{{ $t("save_print") }}
                          </v-btn>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-btn
                            @click="onSaveClose(false)"
                            color="primary"
                            class="float-right white--text text-capitalize"
                            >{{ $t("save_close") }}
                          </v-btn>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>
              </v-card>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <LoadingMe
        :isLoading="showLoading"
        :fullPage="false"
        :myLoading="true"
        type="loading"
      />
    </v-container>
  </v-app>
</template>

<script>
import Helper from "@/helper";

// const productVariantHandler = require("@/scripts/productVariantHandler")
const productHandler = require("@/scripts/productHandler");
const $ = kendo.jQuery;
import { uuid } from "vue-uuid";
import kendo from "@progress/kendo-ui";
import CategoryModel from "@/scripts/model/Categories";
import GroupModel from "@/scripts/model/ProductGroup";
import SubGroupModel from "@/scripts/model/ProductSubGroup";
import prefixHandler from "@/scripts/prefixHandler";
import billingHandler from "@/scripts/invoice/handler/billingHandler";
import StockCount from "@/scripts/stock-count/model/StockCount";
import ItemLineModel from "@/scripts/stock-count/model/ItemLine";
import warehouseHandler from "@/scripts/warehouseHandler";
import saleFormContentHandler from "@/scripts/saleFormContentHandler";
// print
import { print } from '@/form/productForm.js'
const { inventoryCountSheetDefaultSetting } = require('@/form/defaultSetting')
const {getFormSetting} = require("@/scripts/settingsHandler.js")

const itemLineModel = new ItemLineModel({});

const prefix = "stock count";
const txnType = "Stock Count";
export default {
  name: "StockCount",
  props: ["id"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () =>
      import("@/components/custom_templates/DatePickerComponent"),
    "product-category-dropdownlist": () =>
      import("@/components/dropdownlist/ProductCategoryDropDownList"),
    "product-group-dropdownlist": () =>
      import("@/components/dropdownlist/ProductGroupDropDownList"),
    "product-sub-group-dropdownlist": () =>
      import("@/components/dropdownlist/ProductSubGroupDropDownList"),
  },
  data: () => ({
    disabled: false,
    showLoading: false,
    valid: true,
    category: new CategoryModel({}),
    productGroup: new GroupModel({}),
    productSubGroup: new SubGroupModel({}),
    stockCount: new StockCount({}),
    group: { field: "type" },
    itemList: [],
    effectiveDate: new Date().toJSON(),
    warehouse: [],
    groups: [],
    transactionTypes: [],
    itemLine: itemLineModel,
    saleFormContent: {},
    transactionDate: "",
    paging: {},
    isEdit: false
  }),
  methods: {
    /* todo variance = (new price/price) - 1*/
    onDataSourceChanged(e) {
      if (e.field) {
        let dataRow = e.items[0];
        switch (e.field) {
          case "newPrice":
            dataRow.set(
              "variance",
              (parseFloat(dataRow.newPrice) / parseFloat(dataRow.price) - 1) *
                100
            );
            break;
          default:
            break;
        }
      }
    },
    AmountEditor(container, options) {
      kendo
        .jQuery('<input data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
          decimals: 30,
          format: `5`,
        });
    },
    clear() {
      this.stockCount = new StockCount({});
      this.itemList = [];
      // $("#gridItemLine").data("kendoGrid").dataSource.data(this.itemList);
      // window.console.log("clear");
      this.loadPrefix();
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.itemLineStockCountDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    printHandle(){
      let params = "?formType=InventoryCountSheet"
      window.console.log(this.stockCount);
      getFormSetting(params).then(res => {
          if (res.data.statusCode === 200) {
              if (res.data.data.length > 0) {
                  print(this.stockCount,1, res.data.data["0"].settings);
              } else {
                  print(this.stockCount,1, inventoryCountSheetDefaultSetting());
              }
          } else {
              print(this.stockCount,1, inventoryCountSheetDefaultSetting());
          }
          this.clear();
      });
    },
    cancel() {
      window.history.go(-1);
    },
    close() {
      window.history.go(-1);
      // this.$router.push({
      //     name: 'Customers', params: {
      //         data: data
      //     }
      // })
    },
    async loadProductCenter() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.productCenterList = [];
          const category = this.category || {};
          const categoryId = category.id || "";
          const group = this.productGroup || {};
          const groupId = group.id || "";
          const subGroup = this.productSubGroup || {};
          const subGroupId = subGroup.id || "";
          //   const switch_ = this.switchModel || 0;
          this.params = {
            ctid: categoryId,
            grid: groupId,
            sgid: subGroupId,
            key: {},
            limit: -1,
            search: "",
            // searchAs: switch_ ? 1 : 0,
            type: "Variant",
          };
          this.showLoading = true;
          productHandler.center(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              //   const total = res.data.total || 0;
              this.showLoading = false;
              responseData.map((k) => {
                delete k.__ob__
                k.item = {
                  id: k.id || '',
                  name: k.name || '',
                  sku: k.sku || '',
                  uom: k.uom || {}
                }
                delete k.__ob__
                k.id = "lin-" + uuid.v1();
                return {
                  ...k,
                };
              });
              this.itemList = responseData;

              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              //   this.txnProductCenter.push(responseData);

              //   this.toalPerPage = this.productCenterList.length;
              //   this.totalProduct = total;
            } else {
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    // async loadItems() {
    //     new Promise(resolve => {
    //         setTimeout(() => {
    //             resolve('resolved')
    //             let cateId = '', groupId = '', subGroupId = ''
    //             const category = this.category || {}
    //             cateId = category.id || ''
    //             if (cateId !== '') {
    //                 if (this.category) {
    //                     cateId = this.category.id || ''
    //                 }
    //                 if (this.productGroup) {
    //                     groupId = this.productGroup.id || ''
    //                 }
    //                 if (this.productSubGroup) {
    //                     subGroupId = this.productSubGroup.id || ''
    //                 }
    //                 const strFilter = '?cid=' + cateId + '&gid=' + groupId + '&sgId=' + subGroupId
    //                 this.showLoading = true
    //                 productVariantHandler.itemByCategory(strFilter).then(response => {
    //                     if (response.data.statusCode === 200) {
    //                         this.showLoading = false
    //                         this.itemList = response.data.data
    //                     }
    //                 }).catch(e => {
    //                     this.showLoading = false
    //                     this.$snotify.error('Something went wrong')
    //                     this.errors.push(e)
    //                 })
    //             } else {
    //                 this.$snotify.error('Please select Product Category')
    //             }
    //         })
    //     })
    // },
    async onSaveClose(isPrint) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let isAutoGenerate = 1;
          if (this.$route.params.id) {
            const tranDate = new Date(this.transactionDate);
            const tranDateAdjustment = new Date(
              this.stockCount.transactionDate
            );
            const tranDateM = tranDate.getFullYear() + tranDate.getMonth();
            const tranDateTxnM =
              tranDateAdjustment.getFullYear() + tranDateAdjustment.getMonth();
            if (tranDateM === tranDateTxnM) {
              isAutoGenerate = 0;
            }
          }
          let ds = this.$refs.itemLineStockCountDS.kendoWidget();
          const items = ds.data().map((m) => {
            return new ItemLineModel(m);
          });
          window.console.log("items", items);
          if (items.length > 0) {
            this.stockCount.itemLine = items;
            this.stockCount.transactionDateTZ = Helper.toISODate(
              this.stockCount.transactionDate
            );
            this.stockCount.type = txnType;
            this.stockCount.isAutoGenerate = isAutoGenerate;
            this.stockCount.actionType = this.$route.query.type;

            this.showLoading = true;
            billingHandler
              .inventoryAdjustment(this.stockCount)
              .then((response) => {
                if (response.data.statusCode === 201) {
                  this.showLoading = false;
                  this.$snotify.success("Successfully");
                  if(isPrint){
                    this.printHandle()
                  } else {
                    this.close();
                  }
                }
              })
              .catch((e) => {
                this.showLoading = false;
                this.$snotify.error("Something went wrong");
                this.errors.push(e);
              });
          }
        }, 10);
      });
    },
    onUOMChanged(value) {
      this.uom = value;
      window.console.log("uom", value);
    },
    onCategoryChanged(value) {
      this.category = value;
      this.stockCount.category = value;
      // const cateId = value.id || ''
      // this.productGroup = this.groups.filter(n => n.category.id === cateId)
      window.console.log("category", value);
    },
    onGroupChanged(value) {
      this.productGroup = value;
      this.stockCount.group = value;
      this.groups = value;
      window.console.log("group", value);
    },
    onSubGroupChanged(value) {
      this.productSubGroup = value;
      this.stockCount.subGroup = value;
      window.console.log("sub group", value);
    },
    async loadWarehouses() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          warehouseHandler.getWarehouseSettingAll().then((res) => {
            this.warehouse = res;
          });
        }, 10);
      });
    },
    async loadPrefix() {
      new Promise((resolve) => {
        setTimeout(async () => {
          resolve("resolved");
          await prefixHandler.get(prefix).then(async (res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.transactionTypes = res.data.data;
              if (this.transactionTypes.length > 0) {
                this.stockCount.transactionType = this.transactionTypes[0];
                if (this.$route.params.id === undefined) {
                  await this.generateNumber();
                }
              }
            }
          });
        }, 10);
      });
    },
    async generateNumber() {
      if (this.stockCount.transactionDate !== "") {
        const txnType_ = this.stockCount.transactionType || {};
        let data = {
          abbr: txnType_.abbr || "",
          structure: txnType_.structure || "",
          transactionDate: this.stockCount.transactionDate,
          sequcencing: txnType_.sequcencing,
          prefixSeparator: txnType_.prefixSeparator || "",
          numberSeparator: txnType_.numberSeparator || "",
          format: txnType_.format || 5,
          type: txnType,
          entity: 1,
        };
        this.stockCount.abbr = data.abbr;
        this.stockCount.structure = data.structure;
        this.stockCount.sequcencing = data.sequcencing;
        this.stockCount.transactionDate = data.transactionDate;
        this.stockCount.type = data.type;
        this.showLoading = true;
        await billingHandler
          .lastNumber(data)
          .then((response) => {
            if (response.data.statusCode === 200) {
              this.showLoading = false;
              const res = response.data.data;
              const lastNumber = this.zeroPad(
                parseInt(res.lastNumber),
                txnType_.format
              );
              this.stockCount.number =
                res.suffix + txnType_.numberSeparator + lastNumber;
              this.stockCount.lastNumber = res.suffix + lastNumber;
            } else {
              this.showLoading = false;
            }
          })
          .catch((e) => {
            this.showLoading = false;
            window.console.error(e);
          });
      }
    },
    zeroPad(num, places) {
      return String(num).padStart(places, "0");
    },
    UOMTemplate(dataItem) {
      const uom = dataItem.uom;
      if (uom) {
        return `<span>${uom.name ? uom.name : ``}</span>`;
      } else {
        return ``;
      }
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
    removeRow(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridItemLine").data("kendoGrid"),
        dataSource = grid.dataSource,
        dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

      if (dataSource.total() > 1) {
        dataSource.remove(dataItem);
        // this.autoCalculate();
      }
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
              }
            }
          });
        }, 10);
      });
    },
    onTransactionDateChanged() {
      if (this.$route.params.id === undefined) {
        this.generateNumber();
      }
    },
    async loadViewStockCount() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          // window.console.log(this.$route.params.id, 'id')
          if (
            this.$route.params.id !== undefined &&
            this.$route.params.id !== ""
          ) {
            this.disabled = true;
            this.showLoading = true;
            const params = {
              id: this.$route.params.id,
              type: "Stock Count",
            };
            billingHandler.inventoryAdjustmentList(params).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                this.stockCount = res.data.data[0];
                this.itemList = this.stockCount.itemLine;
                this.transactionDate = this.stockCount.transactionDate;
                this.group = this.stockCount.group || {};
                this.category = this.stockCount.category || {};
                // this.itemModifier.category = this.category
                this.onCategoryChanged(this.stockCount.category);
                $("#gridItemLine")
                  .data("kendoGrid")
                  .dataSource.data(this.itemList);
              } else {
                this.showLoading = false;
              }
            });
          }
        }, 10);
      });
    },
    async initData() {
      window.console.log("initData", this.$route.params);
      if (this.$route.params.id) {
        this.loadViewStockCount();
        this.isEdit = true
      } else {
        window.console.log("clear");
        this.disabled = false;
        this.isEdit = false
        this.clear();
      }
    },
  },
  mounted: async function () {
    await this.initData();
    await this.loadWarehouses();
    await this.loadPrefix();
    await this.loadSaleFormContent();
    await this.initData();
  },
  computed: {
    priceHeaderTemplate() {
      if (this.code) {
        return "Price (" + this.code + ")";
      }
      return "Price";
    },
    newPriceHeaderTemplate() {
      if (this.code) {
        return "New Price (" + this.code + ")";
      }
      return "New Price";
    },
    priceLevelName() {
      if (this.$route.query) {
        const query = this.$route.query;
        if (query.hasOwnProperty("name")) {
          return query.name;
        }
      }
      return "";
    },
    code() {
      if (this.$route.query) {
        const query = this.$route.query;
        if (query.hasOwnProperty("code")) {
          return query.code;
        }
      }
      return "";
    },
  },
  // activated() {
  //     this.itemList = []
  //     this.loadCategory()
  // },
  watch: {
    $route: "initData",
    // id() {
    //   if (this.$route.params.id === undefined) {
    //     this.disabled = false
    //     this.initData();
    //   } else {
    //     this.loadViewStockCount();
    //   }
    // },
  },
};
</script>

<style scoped>
.dropdown-header {
  border-width: 0 0 1px 0;
  text-transform: uppercase;
}

.dropdown-header > span {
  display: inline-block;
  padding: 10px;
}

.dropdown-header > span:first-child {
  width: 50px;
}

.k-list-container > .k-footer {
  padding: 10px;
}

.function_content {
  padding: 0 25px 25px;
  border-bottom: 0;
  background-color: #fff !important;
}

@media (min-width: 1264px) {
  .container {
    /* max-width: 1185px; */
    max-width: 1080px !important;
  }
}

.grayBg {
  background-color: #f8f8f9;
}

@media (max-width: 576px) {
  .mb-6 {
    margin-bottom: 0 !important;
  }
}

.section2 {
  border: 1px solid #d6d7d8;
}

.border_grey {
  border: 1px solid #d6d7d8;
}

.attachment_table {
  width: 100%;
}

.my_radio [type="radio"] + label {
  position: relative;
  padding: 6px;
  grid-template-columns: 15% 80% !important;
  display: grid;
}

.upload_btn {
  padding: 10px 6px;
  text-align: center;
  color: white;
  margin-top: 15px;
  margin-bottom: none !important;
  border-radius: 22px;
  background: #92d050;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}
</style>
