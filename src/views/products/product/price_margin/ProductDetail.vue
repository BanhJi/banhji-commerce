<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <!-- loading -->
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          :myLoading="true"
          :type="'loading'"
        >
        </LoadingMe>

        <v-row>
          <v-col sm="4" cols="12" class="py-0">
            <v-select
              class="mt-1"
              :items="dateSorters"
              v-model="mDateSorter"
              @change="onSorterChanges"
              clearable
              outlined
              placeholder="ALL"
            />
          </v-col>

          <v-col sm="3" cols="12" class="py-0">
            <app-datepicker
              :initialDate="startDate"
              @emitDate="startDate = $event"
            />
          </v-col>

          <v-col sm="3" cols="12" class="py-0">
            <app-datepicker
              :initialDate="endDate"
              @emitDate="endDate = $event"
            />
          </v-col>

          <v-col sm="1" cols="1" class="pt-1">
            <v-btn color="primary white--text" @click="onSearch('')">
              <i
                class="b-search"
                style="font-size: 18px; color: #fff !important"
              />
            </v-btn>
          </v-col>
          <v-col class="pr-2" sm="3" cols="12">
            <v-select
              tage="Product Category"
              v-model="mCategory"
              :items="categories"
              item-value="id"
              :item-text="(item) => `${item.name}`"
              return-object
              :placeholder="$t('category')"
              clearable
              outlined
            />
          </v-col>
          <v-col class="px-2" sm="3" cols="12">
            <v-select
              tage="Variant Type"
              v-model="mVarType"
              :items="varTypes"
              item-value="id"
              :item-text="(item) => `${item.name}`"
              @change="onVariantTypeChange"
              return-object
              :placeholder="$t('variant_type')"
              clearable
              outlined
            />
          </v-col>
          <v-col class="px-2" sm="3" cols="12">
            <v-select
              tage="Attribute"
              v-model="mAttribute"
              :items="attribute"
              item-value="id"
              :item-text="(item) => `${item.name}`"
              return-object
              :placeholder="$t('attribute')"
              clearable
              outlined
            />
          </v-col>
        </v-row>

        <v-row class="mt-0">
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <kendo-datasource
                ref="gridProductDetailDS"
                :type="'JSON'"
                :data="prodDetailList"
                :group="group"
                :server-paging="false"
              />
              <kendo-grid
                id="gridProductDetail"
                class="grid-function"
                :data-source-ref="'gridProductDetailDS'"
                :editable="false"
                :column-menu="true"
                :filterable="true"
                :hidden="true"
                :noRecords="true"
                :excel-file-name="'ProductSummaryByRevenue.xlsx'"
                :excel-filterable="true"
                :excel-all-pages="true"
                :resizable="true"
                :sortable="true"
                :groupable="true"
                :toolbar="['excel']"
                :excel-export="excelExport"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'sku'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('sku')"
                  :width="200"
                  :hidden="true"
                  :filterable="{ multi: true }"
                  :template="'<span>#=sku || ``#</span>'"
                  :group-footer-template="'Total: '"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'name'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('product')"
                  :width="200"
                  :group-footer-template="$t('total')"
                  :filterable="{ multi: true }"
                  :template="'<span>#=name || ``#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'itemSku'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('item_sku')"
                  :width="200"
                  :hidden="true"
                  :filterable="{ multi: true }"
                  :template="'<span>#=itemSku || ``#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'itemName'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('item')"
                  :width="200"
                  :filterable="{ multi: true }"
                  :template="'<span>#=itemName || ``#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'referenceNo'"
                  :title="$t('reference_no')"
                  :width="170"
                  :filterable="{ multi: true }"
                  :template="'<span>#=referenceNo || ``#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'category'"
                  :title="$t('category')"
                  :width="200"
                  :hidden="true"
                  :filterable="false"
                  :template="'<span>#=category || ``#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'group'"
                  :title="$t('group')"
                  :width="200"
                  :hidden="true"
                  :filterable-multi="true"
                    :filterable-search="true"
                  :template="'<span>#=group || ``#</span>'"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5, color: green !important',
                  }"
                />
                <kendo-grid-column
                  :field="'subGroup'"
                  :title="$t('sub_group')"
                  :template="'<span>#=subGroup || ``#</span>'"
                  :width="200"
                  :hidden="true"
                  :filterable-multi="true"
                    :filterable-search="true"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'qty'"
                  :title="$t('qty')"
                  :width="120"
                  :aggregates="['sum']"
									:footerAttributes="{ style: 'text-align: right;font-weight: bold;'}"
									:group-footer-template="
										'#=kendo.toString(sum, `n`)#'
									"
                  :attributes="{ style: 'text-align: right' }"
                  :template="'<span>#=kendo.toString(parseFloat(qty), decimalFormat)#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'xPrice'"
                  :title="$t('price')"
                  :width="120"
                  :attributes="{ style: 'text-align: right' }"
                  :template="'<span>#=kendo.toString(parseFloat(xPrice), decimalFormat)#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'xAmount'"
                  :title="$t('amount')"
                  :width="120"
                  :aggregates="['sum']"
									:footerAttributes="{ style: 'text-align: right;font-weight: bold;'}"
									:group-footer-template="
										'#=kendo.toString(sum, `n`)#'
									"
                  :attributes="{ style: 'text-align: right' }"
                  :template="'<span>#=kendo.toString(parseFloat(xAmount), decimalFormat)#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'xDiscount'"
                  :title="$t('discount')"
                  :aggregates="['sum']"
									:footerAttributes="{ style: 'text-align: right;font-weight: bold;'}"
									:group-footer-template="
										'#=kendo.toString(sum, `n`)#'
									"
                  :attributes="{ style: 'text-align: right' }"
                  :template="'<span>#=kendo.toString(parseFloat(xDiscount), decimalFormat)#</span>'"
                  :width="200"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'attribute'"
                  :title="$t('attribute')"
                  :width="200"
                  :filterable="{ multi: true }"
                  :template="'<span>#=attribute || ``#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'brand'"
                  :title="$t('brand')"
                  :template="'<span>#=brand || ``#</span>'"
                  :width="200"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'country'"
                  :title="$t('country')"
                  :template="'<span>#=country || ``#</span>'"
                  :width="200"
                  :hidden="true"
                  :filterable-multi="true"
                    :filterable-search="true"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'segment'"
                  :title="$t('segment')"
                  :template="'<span>#=segment || ``#</span>'"
                  :width="200"
                  :filterable-multi="true"
                    :filterable-search="true"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'location'"
                  :title="$t('location')"
                  :template="'<span>#=location || ``#</span>'"
                  :width="200"
                  :filterable-multi="true"
                    :filterable-search="true"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'project'"
                  :title="$t('project')"
                  :filterable-multi="true"
                    :filterable-search="true"
                  :template="'<span>#=project || ``#</span>'"
                  :width="200"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
              </kendo-grid>
            </template>
          </v-col>
          <div style="overflow: auto" class="product-detail"></div>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const categoryHandler = require("@/scripts/categoryHandler");
const groupHandler = require("@/scripts/groupHandler");
const attributeHandler = require("@/scripts/attributeHandler");
const varTypeHandler = require("@/scripts/variantTypeHandler");

import kendo from "@progress/kendo-ui";
const $ = kendo.jQuery;
const billingReportHandler = require("@/scripts/invoice/handler/billingReportHandler");
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
  name: "ProductSummaryByCategory",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () =>
      import(`@/components/custom_templates/DatePickerComponent`),
    // BankConnection,
  },
  data: () => ({
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    dateSorters: [
      "Today",
      "This Week",
      "This Month",
      "This Year",
      "Last Month",
      "Last Year",
    ],
    mDateSorter: "Today",
    showLoading: false,
    aggregateDefinition: [
      { field: "xAmount", aggregate: "sum" },
      { field: "xDiscount", aggregate: "sum" },
      { field: "qty", aggregate: "sum" },
    ],
    group: [],
    decimalFormat: "n2",
    prodDetailList: [],
    txnProdSummary: [],
    totalProdSumRecord: 0,
    toalProdSumaryPerPage: 0,
    paging: {},
    action: "",
    params: {},

    mCategory: {},
    categories: [],
    groups: [],
    subGroup: [],
    subGroups: [],
    varTypes: [],
    attributes: [],
    attribute: [],
    mVarType: {},
    mAttribute: {},
    // group: {
    //     field: 'name',
    //     aggregates: [
    //         {field: "qty", aggregate: "tQty"},
    //         {field: "amount", aggregate: "sum"}
    //     ]
    // },
  }),
  methods: {
    async onVariantTypeChange() {
      const varTypeId = (this.mVarType || {}).id || "";
      this.attribute = this.attributes.filter((k) => k.type.id === varTypeId);
    },
    async loadCategory() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const param = {
            pattern: "cat#Product",
          };
          categoryHandler.getAllv2(param).then((res) => {
            this.showLoading = false;
            this.categories = res.data.data;
            // this.categories = this.categories.filter(
            //   (m) => m.type.name === "Product"
            // );
            // if (this.categories.length > 0) {
            //   this.mCategory = this.categories[0];
            //   this.onCategoryChanged();
            // }
          });
        }, 50);
      });
    },
    async loadGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const param = {
            pattern: "grp#Product",
          };
          groupHandler.getAllv2(param).then((res) => {
            this.groups = res.data.data; // filter((k) => k.category.type.name === "Product");
          });
        }, 10);
      });
    },
    async loadAttributes() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          attributeHandler.get().then((res) => {
            this.showLoading = false;
            this.attributes = res;
          });
        }, 10);
      });
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridProductDetailDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log("excelExport");
      window.console.log(e.data);
    },
    onSorterChanges(val) {
      let today = new Date();
      switch (val) {
        case "Today":
          this.startDate = kendo.toString(today, "yyyy-MM-dd");
          this.endDate = kendo.toString(today, "yyyy-MM-dd");

          break;
        case "This Week":
          var first = today.getDate() - today.getDay(),
            last = first + 6;

          this.startDate = kendo.toString(
            new Date(today.setDate(first)),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.setDate(last)),
            "yyyy-MM-dd"
          );

          break;
        case "This Month":
          this.startDate = kendo.toString(
            new Date(today.getFullYear(), today.getMonth(), 1),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.getFullYear(), today.getMonth(), 31),
            "yyyy-MM-dd"
          );

          break;
        case "This Year":
          this.startDate = kendo.toString(
            new Date(today.getFullYear(), 0, 1),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.getFullYear(), 11, 31),
            "yyyy-MM-dd"
          );
          break;
        case "Last Month":
          this.startDate = kendo.toString(
            new Date(today.getFullYear(), today.getMonth(), -30),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.getFullYear(), today.getMonth() - 1, +31),
            "yyyy-MM-dd"
          );

          break;
        case "Last Year":
          this.startDate = kendo.toString(
            new Date(today.getFullYear(), -11, -30),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.getFullYear(), -1, +31),
            "yyyy-MM-dd"
          );
          break;
        default:
          this.startDate = "";
          this.endDate = "";
      }
    },
    async loadPage(that) {
      $(".product-detail").html(`
                <span class="mt-2 report-product-detail-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="report-product-detail-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="report-product-detail-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="report-product-detail-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="report-product-detail-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".report-product-detail-page-link", function () {
        const page = $(this).data("page");
        $(".report-product-detail-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".report-product-detail-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".report-product-detail-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("report-product-detail-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".report-product-detail-page-link").removeClass("text-bold-link");
          $(`.report-product-detail-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".report-product-detail-page-link").removeClass("text-bold-link");
          that.loadProductDetail(that.search);
          $(this)
            .parent()
            .children(".report-product-detail-page-number")
            .append(
              `<li class="report-product-detail-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnProdSummary.forEach((k) => {
        totalRow += k.length;
      });
      $(".report-product-detail-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPage(value) {
      $(".report-product-detail-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnProdSummary.at(index);
        that.prodDetailList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnProdSummary[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch(search) {
      this.txnProdSummary = [];
      this.loadPage(this);
      this.paging = {};
      this.loadProductDetail(search);
    },
    async loadProductDetail() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.prodDetailList = [];
          const cateId = (this.mCategory || {}).id || "";
          const attId = (this.mAttribute || {}).id || "";
          const varTypeId = (this.mVarType || {}).id || "";
          this.params = {
            asOf: this.asOf,
            key: this.paging,
            ctid: cateId,
            attid: attId,
            vtid: varTypeId,
            start: this.startDate,
            end: this.endDate,
            pattern: "#proddetail",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          billingReportHandler.productDetailReport(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.prodDetailList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnProdSummary.push(responseData);

              this.toalProdSumaryPerPage = this.prodDetailList.length;
              this.totalProdSumRecord = total;

              if (Object.keys(this.paging).length > 0) {
                this.disabledNextPage(false);
              } else {
                this.disabledNextPage(true);
              }
              this.itemRetuned(this);
            } else {
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },
    async loadVariantType() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          varTypeHandler.get().then((res) => {
            this.showLoading = false;
            this.varTypes = res;
            this.loading = false;
          });
        }, 10);
      });
    },
  },
  async mounted() {
    this.group = [
      {
        field: "category",
        aggregates: this.aggregateDefinition,
      },
    ];
    await this.loadCategory();
    await this.loadVariantType();
    await this.loadAttributes();
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
    // await this.loadTransactions()
  },
  computed: {},
};
</script>
<style scoped></style>
