<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t("inventory_balance_summary") }}</h2>
            <p class="mb-0">{{ $t("inventory_balance_summary_desc") }}</p>
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
          <v-col class="d-flex pl-2 pt-2" sm="3" cols="12">
            <div class="flex-1">
              <app-datepicker :initialDate="asOf" @emitDate="asOf = $event" />
            </div>
            <v-btn
              color="primary white--text mt-1 ml-1 text-capitalize"
              style="width: 40px"
              @click="onSearch"
            >
              <i
                class="b-search"
                style="font-size: 16px; color: #fff !important"
              />
            </v-btn>
          </v-col>
          <!-- <v-col sm="2" cols="12" class="py-0">
            <v-row>
              <v-col sm="12" cols="12" class="pt-4">
                <v-btn icon color="black" class="bg-none float-right ">
                  <v-icon class="font_34">fa fa-file-excel</v-icon>
                </v-btn>

                <v-btn icon color="black" class="bg-none float-right ml-2">
                  <v-icon class="font_34">fa fa-print</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col> -->
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
                ref="balanceSummaryDS"
                :data="variantBalanceList"
              />
              <kendo-grid
                id="gridBalanceSummary"
                class="grid-function"
                :data-source-ref="'balanceSummaryDS'"
                :sortable="true"
                :filterable="true"
                :column-menu="true"
                :editable="false"
                :resizable="true"
                :style="{ width: '100%' }"
                :noRecords="true"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'name'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('name')"
                  :template="'<span>#=name#</span>'"
                  :width="200"
                  :filterable="{ multi: true }"
                  :filterable-search="true"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'buom'"
                  :title="$t('base_uom')"
                  :width="150"
                  :filterable="false"
                  :sortable="false"
                  :template="'<span>#=buom.name || ``#</span>'"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'committedStock'"
                  :title="$t('committed')"
                  :width="150"
                  :filterable="false"
                  :sortable="false"
                  :attributes="{ style: 'text-align: right; ' }"
                  :template="'<span>#=kendo.toString(committedStock, decimalFormat)#</span>'"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <!--                <kendo-grid-column-->
                <!--                    :field="'po'"-->
                <!--                    :title="$t('on_po')"-->
                <!--                    :width="150"-->
                <!--                    :attributes="{style: 'text-align: right; '}"-->
                <!--                    :template="'<span>#=kendo.toString(po, decimalFormat)#</span>'"-->
                <!--                    :headerAttributes="{-->
                <!--                                                        style: 'background-color: #EDF1F5'-->
                <!--                                                    }"/>-->
                <!--                <kendo-grid-column-->
                <!--                    :field="'so'"-->
                <!--                    :title="$t('on_so')"-->
                <!--                    :width="150"-->
                <!--                    :attributes="{style: 'text-align: right; '}"-->
                <!--                    :template="'<span>#=kendo.toString(so, decimalFormat)#</span>'"-->
                <!--                    :headerAttributes="{-->
                <!--                                                        style: 'background-color: #EDF1F5'-->
                <!--                                                    }"/>-->
                <kendo-grid-column
                  :field="'qoh'"
                  :title="$t('qoh')"
                  :width="150"
                  :filterable="false"
                  :sortable="true"
                  :attributes="{ style: 'text-align: right; ' }"
                  :template="'<span>#=kendo.toString(qoh, decimalFormat)#</span>'"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'wac'"
                  :title="$t('wac')"
                  :width="150"
                  :filterable="false"
                  :sortable="false"
                  :attributes="{ style: 'text-align: right; ' }"
                  :template="'<span>#=kendo.toString(wac, decimalFormat)#</span>'"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'bValue'"
                  :title="$t('value')"
                  :width="150"
                  :filterable="false"
                  :sortable="true"
                  :attributes="{ style: 'text-align: right; ' }"
                  :template="'<span>#=kendo.toString(bValue, decimalFormat)#</span>'"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="summary-variant-center"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const categoryHandler = require("@/scripts/categoryHandler");
const groupHandler = require("@/scripts/groupHandler");
const subGroupHandler = require("@/scripts/subGroupHandler");
const $ = kendo.jQuery;
// const productHandler = require("@/scripts/productHandler");
export default {
  data: () => ({
    asOf: new Date().toISOString().substr(0, 10),
    showLoading: false,
    group: { field: "name" },
    variantBalanceList: [],

    txnVariantBalance: [],
    totalVariantBal: 0,
    toalVariantBalPerPage: 0,
    paging: {},
    action: "",
    params: {},

    mCategory: {},
    mGroup: {},
    mSubGroup: {},
    categories: [],
    groups: [],
    subGroup: [],
    subGroups: [],
  }),
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () =>
      import(`@/components/custom_templates/DatePickerComponent`),
  },
  methods: {
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
            pattern: 'cat#Product'
          }
          categoryHandler.getAllv2(param).then((res) => {
            this.showLoading = false;
            this.categories = res.data.data
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
            pattern: 'grp#Product'
          }
          groupHandler.getAllv2(param).then((res) => {
            this.groups = res.data.data // filter((k) => k.category.type.name === "Product");
          });
        }, 10);
      });
    },
    async loadSubGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const param = {
            pattern: 'sgr#Product'
          }
          subGroupHandler.getAllv2(param).then((res) => {
            this.showLoading = false;
            this.subGroups = res.data.data
          });
        }, 10);
      });
    },
    async searchTransaction() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          const startDate = this.asOf;
          let strFilter = "?asOf=" + startDate + "&item=1";
          billingHandler.inventoryBalance(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.receivableList = res.data.data;
            }
            this.showLoading = false;
          });
        }, 10);
      });
    },
    status(dataItem) {
      let status = "";
      switch (dataItem.status) {
        case 1:
          status = "Open";
          break;
        case 2:
          status = "Partially Paid";
          break;
        case 3:
          status = "Paid";
          break;
        case 4:
          status = "Void";
          break;
      }
      return status;
    },
    async loadPage(that) {
      $(".summary-variant-center").html(`
                <span class="mt-2 bal-summary-variant-center-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="bal-summary-variant-center-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="bal-summary-variant-center-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="bal-summary-variant-center-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="bal-summary-variant-center-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on(
        "click",
        ".bal-summary-variant-center-page-link",
        function () {
          const page = $(this).data("page");
          $(".bal-summary-variant-center-page-link").removeClass(
            "text-bold-link"
          );
          $(this).addClass("text-bold-link");
          that.backToPage(that, page - 1);
          window.console.log(page - 1);
        }
      );
      // $(document).on('click', '.bycus-next-page', function () {
      $(".bal-summary-variant-center-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".bal-summary-variant-center-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log(
          "bal-summary-variant-center-page_number",
          page_number
        );
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".bal-summary-variant-center-page-link").removeClass(
            "text-bold-link"
          );
          $(
            `.bal-summary-variant-center-page-link:eq(${currectpage - 1})`
          ).addClass("text-bold-link");
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".bal-summary-variant-center-page-link").removeClass(
            "text-bold-link"
          );
          that.loadVariantCenter(that.search);
          $(this)
            .parent()
            .children(".bal-summary-variant-center-page-number")
            .append(
              `<li class="bal-summary-variant-center-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
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
      $(".bal-summary-variant-center-item-returned").text(
        "Items returned (" + totalRow + " of " + that.totalVariantBal + ")"
      );
    },
    disabledNextPage(value) {
      $(".bal-summary-variant-center-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnVariantBalance.at(index);
        that.variantBalanceList = byProduct;
        // that.refreshGridData(customer)
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
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          billingHandler.inventoryBalance(this.params).then((res) => {
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
  },
  computed: {},
  mounted: async function () {
    // await this.searchTransaction()
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

@media (max-width: 576px) {
  .paddingTopB {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
}
</style>
