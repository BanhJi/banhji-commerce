<template>
  <v-row class="">
    <v-col sm="7" cols="12" class="py-0">
      <h2 class="mb-0 font_20">{{ $t("variant_directory") }}</h2>
      <!-- <p>{{ $t("customer_directory_desc") }}</p> -->
    </v-col>
    <v-col sm="12" cols="12" class="pt-0">
      <v-row class="">
        <v-col sm="12" cols="12" class="py-0">
          <v-row class="">
            <v-col sm="4" cols="12" class="py-0">
              <v-text-field
                class="mt-1"
                clearable
                v-model="search"
                :placeholder="$t('variant_directory')"
                outlined
              />
            </v-col>
            <v-col sm="1" cols="12" class="py-1">
              <v-btn
                color="primary"
                class="white--text capitalize marginTopPhone"
                @click="onSearch(search)"
              >
                {{ $t("search") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="">
        <v-col sm="12" cols="12" class="py-0 custom_pagination dir-product">
          <kendo-datasource
            ref="dataSourceDirection"
            :data="VariantCenterList"
            :sort="sort"
            :group="group"
          />
          <kendo-grid
            id="gridProductirectory"
            class="grid-function"
            :data-source-ref="'dataSourceDirection'"
            :editable="false"
            :groupable="true"
            :noRecords="true"
            :sortable="true"
            :excel-file-name="'Variant Directory.xlsx'"
            :excel-filterable="true"
            :excel-all-pages="true"
            :toolbar="['excel']"
            :column-menu="true"
            :resizable="true"
            :pageable="true"
            :scrollable-virtual="true"
          >
            <kendo-grid-column
              :field="'sku'"
              :width="150"
              :title="$t('sku')"
              :template="'<span>#=sku#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :field="'name'"
              :title="$t('name')"
              :width="200"
              :template="'<span>#=name#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :field="'category.name'"
              :title="$t('category')"
              :width="160"
              :template="'<span>#=category.name#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :field="'group.name'"
              :hidden="true"
              :title="$t('group')"
              :width="200"
              :template="'<span>#=group.name#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :field="'subGroup.name'"
              :hidden="true"
              :title="$t('sub_group')"
              :width="200"
              :template="'<span>#=subGroup.name#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :field="'priceLevel.name'"
              :title="$t('price_level')"
              :width="100"
              :template="'<span>#=priceLevel.name#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :field="'uom.name'"
              :title="$t('uom')"
              :width="120"
              :template="'<span>#=uom.name#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :field="'price'"
              :title="$t('price')"
              :width="150"
              :template="'<span>#=kendo.toString(price, `n2`)#</span> <span>#=priceLevel.currency.code#</span>'"
              :attributes="{ style: 'text-align: right !important;' }"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
          </kendo-grid>
          <LoadingMe
            :isLoading="showLoading"
            :fullPage="false"
            :myLoading="true"
            type="loading"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import kendo from "@progress/kendo-ui";
import JSZip from "jszip";
const productHandler = require("@/scripts/productHandler")
// const categoryHandler = require("@/scripts/categoryHandler")
import { i18n } from '@/i18n'
window.JSZip = JSZip;
const $ = kendo.jQuery; //require("jquery")
export default {
  name: 'ProductDiretory',
  data: () => ({
    dialogm2: false,
    valid: true,
    showLoading: false,
    start_date: "",
    end_date: "",
    group: { field: "category.name" },
    search: "",
    paging: {},
    disabledMe: true,
    VariantCenterList: [],
    sort: { field: "sku", dir: "ASC" },
    isLoaded: true,
    info: {},
    mCategory: "",
    mGroup: {},
    mSubGroup: {},
    categories: [],
    groups: [],
    subGroup: [],
    subGroups: [],
    gridSchema: {
      model: {
        id: "id",
      },
    },
    txnVariantCenter: [],
    totalVariant: 0,
    toalVariantPerPage: 0,
    action: "",
    params: {},
    switchModelVariant: 0,
  }),
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  props: {},
  methods: {
    onSearch(search) {
      this.txnVariantCenter = [];
      this.loadPage(this);
      this.paging = {};
      this.loadVariantCenter(search);
    },
    async loadPage(that) {
      $(".dir-product .k-pager-wrap").html(`
                <label class="label dir-product-item-returned">0</label>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="dir-next-page" title="previous" style="width: 24px; font-size: 19px;"> < </button>
                    <ul class="dir-page-number" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px;"  data-page="1" class="dir-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="dir-next-page" title="next" style="width: 24px; font-size: 19px;"> > </button>
                </div>
            `);
      $(document).on("click", ".dir-page-link", function () {
        const page = $(this).data("page");
        $(".dir-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.dir-next-page', function () {
      $(".dir-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".dir-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".dir-page-link").removeClass("text-bold-link");
          $(`.dir-page-link:eq(${currectpage - 1})`).addClass("text-bold-link");
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".dir-page-link").removeClass("text-bold-link");
          that.loadVariantCenter(that.search);
          $(this)
            .parent()
            .children(".dir-page-number")
            .append(
              `<li class="dir-page-link text-bold-link" style="padding: 6px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnVariantCenter.forEach((k) => {
        totalRow += k.length;
      });
      $(".dir-product-item-returned").text(i18n.t('items_return')+"(" + totalRow + " of " + that.totalVariant + ")");
    },
    async loadVariantCenter(search) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.VariantCenterList = [];
          const category = this.mCategory || {};
          const categoryId = category.id || "";
          const group = this.mGroup || {};
          const groupId = group.id || "";
          const subGroup = this.mSubGroup || {};
          const subGroupId = subGroup.id || "";
          const switch_ = this.switchModelVariant || 0;
          this.params = {
            ctid: categoryId,
            grid: groupId,
            sgid: subGroupId,
            key: this.paging,
            search: search,
            searchAs: switch_ ? 1 : 0,
            type: "Variant",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          productHandler.center(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.VariantCenterList = responseData;
              this.paging = res.data.key;
              this.txnVariantCenter.push(responseData);

              this.toalVariantPerPage = this.VariantCenterList.length;
              this.totalVariant = total;

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
    disabledNextPage(value) {
      $(".dir-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnVariantCenter.at(index);
        that.VariantCenterList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnVariantCenter[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    refreshGridData(data) {
      $("#gridProductirectory").data("kendoGrid").dataSource.data([]);
      $("#gridProductirectory").data("kendoGrid").dataSource.data(data);
    },
  },
  async mounted() {
    // await this.loadVariantCenter();
    this.loadPage(this);
  },
};
</script>
<style scoped>
.acc_group header {
  height: 10px !important;
}

table.acc_group tr td {
  border-bottom: 1px solid #ccc;
  padding: 8px;
  vertical-align: middle;
}

table.acc_group tr td:first-child {
  font-weight: 700;
}

table.acc_group tr td:last-child {
  text-align: center;
}

.v-card__actions .v-btn.v-btn {
  padding: 0 16px;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th {
  font-family: "Niradei-Bold", serif;
  color: #000 !important;
  border-top: 1px solid #000 !important;
  border-bottom: 1px solid #000 !important;
  font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > td {
  color: #000 !important;
  padding: 5px !important;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:last-child
  td {
  border-bottom: 1px solid #000 !important;
}

.function_footer {
  padding: 15px;
  display: inline-block;
}

p {
  color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
  height: 47.2px !important;
}

.text_tip {
  font-size: 9px;
  line-height: 10px;
}

@media (max-width: 576px) {
  .marginTopPhone {
    margin-top: -10px;
  }
}
</style>