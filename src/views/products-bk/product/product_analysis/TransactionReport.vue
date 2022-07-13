<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">
              {{ $t("inventory_transaction_detail") }}
            </h2>
            <p class="mb-0">{{ $t("inventory_transaction_detail_desc") }}</p>
          </v-col>
        </v-row>
        <v-row class="mt-0">
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
            <v-btn
              class="btn_search"
              @click="onSearch"
              style="background-color: rgb(237, 241, 245)"
            >
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
              :item-text="(item) => `${item.abbr} - ${item.name}`"
              @change="onCategoryChanged('')"
              return-object
              :placeholder="$t('category')"
              clearable
              outlined
            />
          </v-col>
          <v-col class="px-2" sm="3" cols="12">
            <v-select
              tage="Product Group"
              v-model="mGroup"
              :items="groups"
              item-value="id"
              :item-text="(item) => `${item.abbr} - ${item.name}`"
              @change="onCategoryChanged('')"
              return-object
              :placeholder="$t('group')"
              clearable
              outlined
            />
          </v-col>
          <v-col class="px-2" sm="3" cols="12">
            <v-select
              tage="Product Sub Group"
              v-model="mSubGroup"
              :items="subGroup"
              item-value="id"
              :item-text="(item) => `${item.abbr} - ${item.name}`"
              @change="onCategoryChanged('')"
              return-object
              :placeholder="$t('sub_group')"
              clearable
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="4" cols="12" class="kendo_dropdown_custom px-1 pt-1">
            <dropdownlist
              :data-items="itemList"
              @change="onChange"
              :value="item"
              :data-item-key="dataItemKey"
              :text-field="textField"
              :default-item="defaultItem"
              :filterable="true"
              :loading="loading"
              @filterchange="onFilterChange"
            >
            </dropdownlist>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true"
              >
              </LoadingMe>
              <kendo-datasource
                ref="productTxnDS"
                :group="group"
                :data="variantBalanceList"
              />
              <kendo-grid
                id="gridProductTXN"
                class="grid-function"
                :data-source-ref="'productTxnDS'"
                :sortable="false"
                :groupable="true"
                :filterable="true"
                :column-menu="true"
                :filterable-mode="'menu'"
                :toolbar="['excel']"
                :excel-file-name="'Inventory Transaction Detail.xlsx'"
                :excel-filterable="true"
                :excel-all-pages="true"
                :editable="false"
                :resizable="true"
                :style="{ width: '100%' }"
                :noRecords="true"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'type'"
                  :title="$t('type')"
                  :template="'<span>#=type#</span>'"
                  :width="150"
                  :filterable="{ multi: true }"
                  :group-footer-template="'<div style=text-align:right><span class=text-bold>Total:</span>'"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'txnDate'"
                  :title="$t('date')"
                  :filterable="false"
                  :template="'<span>#=kendo.toString(new Date(txnDate), dateFormat)#</span>'"
                  :width="130"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: center;',
                  }"
                />
                <kendo-grid-column
                  :field="'name'"
                  :title="$t('name')"
                  :template="'<span>#=name#</span>'"
                  :width="200"
                  :filterable="{ multi: true }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'txnNumber'"
                  :title="$t('reference_no')"
                  :template="referenceTemplate"
                  :width="150"
                  :filterable="false"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'itemName'"
                  :title="$t('item')"
                  :template="'<span>#=itemName || ``#</span>'"
                  :width="200"
                  :filterable="{ multi: true }"
                  :hidden="true"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'uom'"
                  :title="$t('txn_uom')"
                  :template="UOMTemplate"
                  :width="150"
                  :filterable="false"
                  :hidden="true"
                  :attributes="{ style: 'text-align: center' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: center',
                  }"
                />
                <kendo-grid-column
                  :field="'qty'"
                  :title="$t('txn_qty')"
                  :filterable="false"
                  :template="'<span>#=kendo.toString(qty, decimalFormat)#</span>'"
                  :aggregates="['sum']"
                  :group-footer-template="'<div style=text-align:right><span class=text-bold>#= kendo.toString(sum, `n2`)#</span>'"
                  :width="150"
                  :hidden="true"
                  :attributes="{ style: 'text-align: right' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: right;',
                  }"
                />
                <kendo-grid-column
                  :field="'exchangeCost'"
                  :filterable="false"
                  :title="$t('cost')"
                  :template="'<span>#=kendo.toString(exchangeCost, decimalFormat)#</span>'"
                  :width="150"
                  :hidden="true"
                  :attributes="{ style: 'text-align: right' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: right;',
                  }"
                />
                <kendo-grid-column
                  :field="'buom'"
                  :filterable="false"
                  :title="$t('base_uom')"
                  :template="BUOMTemplate"
                  :width="150"
                  :attributes="{ style: 'text-align: center' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: center;',
                  }"
                />
                <kendo-grid-column
                  :field="'bQty'"
                  :filterable="false"
                  :title="$t('base_qty')"
                  :template="'<span>#=kendo.toString(bQty, decimalFormat)#</span>'"
                  :width="150"
                  :aggregates="['sum']"
                  :group-footer-template="'<div style=text-align:right><span class=text-bold>#= kendo.toString(sum, `n2`)#</span>'"
                  :attributes="{ style: 'text-align: right' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: right;',
                  }"
                />
                <kendo-grid-column
                  :field="'avgCost'"
                  :title="$t('wac')"
                  :filterable="false"
                  :template="'<span>#=kendo.toString(avgCost, decimalFormat)#</span>'"
                  :width="130"
                  :attributes="{ style: 'text-align: right' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: right;',
                  }"
                />
                <kendo-grid-column
                  :field="'exchangeBAmount'"
                  :filterable="false"
                  :title="$t('amount')"
                  :template="'<span>#=kendo.toString(exchangeBAmount, decimalFormat)#</span>'"
                  :width="180"
                  :aggregates="['sum']"
                  :group-footer-template="'<div style=text-align:right><span class=text-bold>#= kendo.toString(sum, `n2`)#</span>'"
                  :attributes="{ style: 'text-align: right' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;text-align: right;',
                  }"
                />
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="inventory-txn-detail"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const categoryHandler = require("@/scripts/categoryHandler");
const groupHandler = require("@/scripts/groupHandler");
const subGroupHandler = require("@/scripts/subGroupHandler");
const productHandler = require("@/scripts/productHandler");
import { DropDownList } from "@progress/kendo-vue-dropdowns";
const defaultItem = { ["name"]: "Select item", ["id"]: null };
const emptyItem = { ["name"]: "loading ..." };
const $ = kendo.jQuery;
const SECOND_DELAY = 1000;
export default {
  data: () => ({
    loading: false,
    showLoading: false,
    mDateSorter: "Today",
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
    group: { field: "itemName" },
    aggregateDefinition: [
      { field: "itemName", aggregate: "count" },
      { field: "qty", aggregate: "sum" },
      { field: "amount", aggregate: "sum" },
      { field: "bAmount", aggregate: "sum" },
      { field: "bQty", aggregate: "sum" },
      { field: "exchangeAmount", aggregate: "sum" },
      { field: "exchangeBAmount", aggregate: "sum" },
    ],
    isLoaded: false,
    inventoryList: [],
    variantBalanceList: [],

    txnVariantBalance: [],
    totalVariantBal: 0,
    toalVariantBalPerPage: 0,
    paging: {},
    action: "",
    params: {},

    itemURL: productHandler.centerURL(),
    mCategory: {},
    mGroup: {},
    mSubGroup: {},
    categories: [],
    groups: [],
    subGroup: [],
    subGroups: [],
    itemList: [],
    textField: "name",
    defaultItem: defaultItem,
    dataItemKey: "id",
    filter: "",
    item: {},
  }),
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () =>
      import(`@/components/custom_templates/DatePickerComponent`),
    dropdownlist: DropDownList,
  },
  methods: {
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
    async searchTransaction() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          const startDate = this.startDate;
          const endDate = this.endDate;
          let strFilter =
            "?start=" + startDate + "&end=" + endDate + "&item=1&group=0";
          billingHandler.inventoryListByFunction(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.inventoryList = res.data.data;
            }
            this.showLoading = false;
          });
        }, 10);
      });
    },
    referenceTemplate(data) {
      let url = `#`;
      const id = data.txnId || data.id;
      if (data.type === "Invoice") {
        url = `invoice_view/${id}`;
      } else if (data.type === "Sale Quote") {
        url = `sale_quote_view/${id}`;
      } else if (data.type === "Delayed Invoice") {
        url = `delayed_invoice_view/${id}`;
      } else if (data.type === "Sale Order") {
        url = `sale_order_view/${id}`;
      } else if (data.type === "Purchase Order") {
        url = `purchase_order_view/${id}`;
      } else if (data.type === "Credit Memo") {
        url = `sale_return_view/${id}`;
      } else if (data.type === "Debit Memo") {
        url = `purchase_return_view/${id}`;
      } else if (data.type === "Inventory Adjustment") {
        url = `inventory_adjustment_view/${id}`;
      } else if (data.type === "Purchase") {
        url = `credit_purchase_view/${id}`;
      } else if (data.type === "Production Order") {
        url = `production_order_view/${id}`;
      } else if (data.type === "Production") {
        url = `production/${id}`;
      }

      let args = {
        text: data.txnNumber,
        url: url,
        data: data,
      };
      return {
        template: LinkTemplate,
        templateArgs: args,
      };
    },
    UOMTemplate(dataItem) {
      if (dataItem.hasOwnProperty("uom")) {
        const uom = dataItem.uom;
        if (uom.hasOwnProperty("uom")) {
          if (uom.uom.hasOwnProperty("name")) {
            return uom.uom.name;
          }
        }
      }
      return ``;
    },
    BUOMTemplate(dataItem) {
      if (dataItem.hasOwnProperty("buom")) {
        const buom = dataItem.buom;
        if (buom.hasOwnProperty("name")) {
          return buom.name;
        }
      }
      return ``;
    },
    sumGroupAmount(dataItem) {
      if (dataItem.hasOwnProperty("sum")) {
        return "<span>#= kendo.toString(sum, `n2`)#</span>";
      }
      return `<span>#= kendo.toString(sum, 'n2')#</span>`;
    },
    async onCategoryChanged() {
      const groupId = (this.mGroup || {}).id || "";
      this.subGroup = this.subGroups.filter((k) => k.group.id === groupId);
      if (this.subGroup.length === 0) {
        this.mSubGroup = {};
      }
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
            if (this.categories.length > 0) {
              this.mCategory = this.categories[0];
              this.onCategoryChanged();
            }
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
    async loadSubGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const param = {
            pattern: "sgr#Product",
          };
          subGroupHandler.getAllv2(param).then((res) => {
            this.showLoading = false;
            this.subGroups = res.data.data;
          });
        }, 10);
      });
    },
    async loadPage(that) {
      $(".inventory-txn-detail").html(`
                <span class="mt-2 inventory-txn-detail-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="inventory-txn-detail-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="inventory-txn-detail-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="inventory-txn-detail-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="inventory-txn-detail-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".inventory-txn-detail-page-link", function () {
        const page = $(this).data("page");
        $(".inventory-txn-detail-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".inventory-txn-detail-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".inventory-txn-detail-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("inventory-txn-detail-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".inventory-txn-detail-page-link").removeClass("text-bold-link");
          $(`.inventory-txn-detail-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".inventory-txn-detail-page-link").removeClass("text-bold-link");
          that.loadVariantCenter(that.search);
          $(this)
            .parent()
            .children(".inventory-txn-detail-page-number")
            .append(
              `<li class="inventory-txn-detail-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnVariantBalance.forEach((k) => {
        totalRow += k.length;
      });
      $(".inventory-txn-detail-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPage(value) {
      $(".inventory-txn-detail-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnVariantBalance.at(index);
        that.variantBalanceList = byProduct;
        // that.refreshGridData(item)
        window.console.log("that.txnVariantBalance[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch(search) {
      this.txnVariantBalance = [];
      this.loadPage(this);
      this.paging = {};
      this.loadVariantCenter(search);
    },
    async loadVariantCenter() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.variantBalanceList = [];
          const cateId = (this.mCategory || {}).id || "";
          const groupId = (this.mGroup || {}).id || "";
          const subGroupId = (this.mSubGroup || {}).id || "";
          this.params = {
            asOf: this.asOf,
            key: this.paging,
            ctid: cateId,
            grid: groupId,
            sgrid: subGroupId,
            start: this.startDate,
            end: this.endDate,
            id: this.item.id || ''
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          billingHandler.inventoryListByFunction(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.variantBalanceList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnVariantBalance.push(responseData);

              this.toalVariantBalPerPage = this.variantBalanceList.length;
              this.totalVariantBal = total;

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
    onFilterChange(event) {
      const filter = event.filter.value;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.requestData(0, filter, this.itemURL);
        this.filter = filter;
        this.loading = false;
      }, SECOND_DELAY);
      this.loading = true;
    },
    requestData(skip, filter, baseUrl) {
      const url = baseUrl;
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          type: "Variant",
          search: `${filter}`,
          searchAs: 0,
          key: {},
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then(this.afterFetch);
    },
    afterFetch(json) {
      this.itemList = json.data;
    },
    onChange(event) {
      const value = event.value;
      if (value && value["name"] === emptyItem["name"]) {
        return;
      }
      this.item = value;
    },
  },
  computed: {},
  mounted: async function () {
    this.group = [
      {
        field: "itemName",
        aggregates: this.aggregateDefinition,
      },
    ];
    this.requestData(0, this.filter, this.itemURL);
    await this.loadCategory();
    await this.loadGroup();
    await this.loadSubGroup();
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
};
</script>
<style scoped>
.theme--light.v-data-table {
  background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
  border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}
</style>
