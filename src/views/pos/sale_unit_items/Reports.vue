<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <h2 class="mb-0 font_20">{{ $t("sale_unit_report") }}</h2>
        <p class="mb-2">{{ $t("sale_unit_report_desc") }}</p>
        <v-row>
          <v-col sm="9" cols="12" class="py-0">
            <date-search
              :initStartDate="startDate"
              @emitStartDate="startDate = $event"
              :initEndDate="endDate"
              @emitEndDate="endDate = $event"
            />
          </v-col>

          <v-col sm="1" cols="12" class="py-0 mt-1">
            <v-btn
              class="btn_search"
              style="background-color: rgb(237, 241, 245)"
              @click="onSearch"
            >
              <i
                class="b-search"
                style="font-size: 18px; color: #fff !important"
              />
            </v-btn>
          </v-col>
          <!-- <v-col sm="2" cols="12" class="py-0 text-right">
                        <v-btn icon color="black" class="bg-none float-right ">
                            <v-icon class="font_34">fa fa-file-excel</v-icon>
                        </v-btn>

                        <v-btn icon color="black" class="bg-none float-right ml-2">
                            <v-icon class="font_34">fa fa-print</v-icon>
                        </v-btn>
                    </v-col> -->
        </v-row>
        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true"
              />
              <template>
                <kendo-datasource
                  ref="saleUnitItemReportDS"
                  :group="group"
                  :data="saleUnitList"
                />
                <kendo-grid
                  id="gridSaleUnitItemReport"
                  class="grid-function"
                  :data-source-ref="'saleUnitItemReportDS'"
                  :editable="false"
                  :groupable="true"
                  :sortable="true"
                  :resizable="true"
                  :toolbar="toolbarTemplate"
                  :excel-export="excelExport"
                  :excel-file-name="'SaleUnitItemReport.xlsx'"
                  :excel-filterable="true"
                  :scrollable-virtual="true"
                >
                  <kendo-grid-column
                    :field="'transactionDate'"
                    :title="$t('date')"
                    :width="180"
                    :template="dateTemplate"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'name'"
                    :title="$t('name')"
                    :attributes="{ class: 'tb_name_td' }"
                    :width="150"
                    :template="'<span>#=name#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'category.name'"
                    :title="$t('category')"
                    :width="150"
                    :template="'<span>#=category.name || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'referenceNo'"
                    :title="$t('invoice_no')"
                    :width="150"
                    :template="referenceTemplate"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'item.name'"
                    :title="$t('item')"
                    :width="150"
                    :template="'<span>#=item.name || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'item.sku'"
                    :title="$t('sku')"
                    :width="150"
                    :template="'<span>#=item.sku || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'xAmount'"
                    :title="$t('amount')"
                    :width="180"
                    :template="'<span>#= kendo.toString(xAmount, decimalFormat)#</span>'"
                    :attributes="{ style: 'text-align: right' }"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />

                  <kendo-grid-column
                    :field="'xDiscount'"
                    :title="$t('discount')"
                    :width="180"
                    :template="'<span>#= kendo.toString(xDiscount, decimalFormat)#</span>'"
                    :attributes="{ style: 'text-align: right' }"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                </kendo-grid>
              </template>
            </template>
          </v-col>
        </v-row>
        <div style="overflow: auto" class="sale-unit-report"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";

const $ = kendo.jQuery;
const discountItemHandler = require("@/scripts/discountItemHandler");
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import JSZip from "jszip";
window.JSZip = JSZip;
export default {
  data: () => ({
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10),
    dateSorters: ["Today", "This Week", "This Month", "This Year"],
    // transactions: [],
    showLoading: false,
    mDateSorter: "Today",
    group: { field: "name" },
    saleUnitList: [],
    txnSaleUnitList: [],
    totalSaleUnit: 0,
    totalSaleUnitPerPage: 0,
    paging: {},
    action: "",
    params: {},
  }),
  components: {
    "date-search": () => import("@/components/custom_templates/DateSearch"),
    LoadingMe: () => import(`@/components/Loading`),
  },
  methods: {
    referenceTemplate(data) {
      let url = "";
      if (data.type === "Invoice") {
        url = `invoice_view/${data.txnId}`;
      } else if (data.type === "Sale Deposit") {
        url = `sale_deposit_view/${data.txnId}`;
      } else if (data.type === "Purchase") {
        url = `purchase_view/${data.txnId}`;
      } else if (data.type === "Sale Quote") {
        url = `sale_quote_view/${data.txnId}`;
      } else if (data.type === "Cash Receipt") {
        url = `cash_receipt_view/${data.txnId}`;
      }
      let args = {
        text: data.referenceNo,
        url: url,
        data: data,
      };
      return {
        template: LinkTemplate,
        templateArgs: args,
      };
    },
    // async searchTransaction() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       const startDate = this.startDate;
    //       const endDate = this.endDate;
    //       let strFilter = "?start=&end=&type=Sale";
    //       if (startDate !== "" && endDate !== "") {
    //         strFilter = "?start=" + startDate + "&end=" + endDate;
    //       }
    //       discountItemHandler.saleUnitReport(strFilter).then((res) => {
    //         if (res.data.statusCode === 200) {
    //           this.showLoading = false;
    //           this.transactions = JSON.parse(JSON.stringify(res.data.data));
    //         }
    //       });
    //     }, 10);
    //   });
    // },

    toolbarTemplate: function () {
      const templateHtml =
        "<span>" +
        '<a class="k-pager-excel k-link k-button excel" title="Export to Excel"> <span class="k-icon k-i-excel"></span>Export to excel </a>' +
        "</span><span>&nbsp;&nbsp;</span>" +
        '<span style="position:absolute; right:5px">' +
        "</span>";

      return kendo.template(templateHtml);
    },
    exportToExcel() {
      window.console.log("1");
      const grid = $("#gridSaleUnitItemReport").data("kendoGrid");
      grid.saveAsExcel();
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridSaleUnitItemReport").data("kendoGrid");
      let gridElement = grid.element;
      let toolbarElement = gridElement.find(".k-grid-toolbar");
      toolbarElement.on("click", ".k-pager-excel", function (e) {
        e.preventDefault();
        onExportExcel(that);
      });

      function onExportExcel(that) {
        that.exportToExcel();
      }
    },
    dateTemplate(dataItem) {
      const transactionDate = dataItem.transactionDate;
      if (transactionDate) {
        return `<span>${
          transactionDate
            ? kendo.toString(
                new Date(transactionDate),
                dataItem.dateFormat + " h:mm tt"
              )
            : ``
        }</span>`;
      } else {
        return ``;
      }
    },
    async loadPage(that) {
      $(".sale-unit-report").html(`
                <span class="mt-2 discount-report-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="discount-report-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="discount-report-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="discount-report-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="discount-report-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".discount-report-page-link", function () {
        const page = $(this).data("page");
        $(".discount-report-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".discount-report-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".discount-report-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("discount-report-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".discount-report-page-link").removeClass("text-bold-link");
          $(`.discount-report-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".discount-report-page-link").removeClass("text-bold-link");
          that.loadSaleUnitReport(that.search);
          $(this)
            .parent()
            .children(".discount-report-page-number")
            .append(
              `<li class="discount-report-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnSaleUnitList.forEach((k) => {
        totalRow += k.length;
      });
      $(".discount-report-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPage(value) {
      $(".discount-report-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnSaleUnitList.at(index);
        that.saleUnitList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnSaleUnitList[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch(search) {
      this.txnSaleUnitList = [];
      this.loadPage(this);
      this.paging = {};
      this.loadSaleUnitReport(search);
    },
    async loadSaleUnitReport() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.saleUnitList = [];
          this.params = {
            asOf: this.asOf,
            key: this.paging,
            start: this.startDate,
            end: this.endDate,
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          discountItemHandler.saleUnitReport(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.saleUnitList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnSaleUnitList.push(responseData);

              this.totalSaleUnitPerPage = this.saleUnitList.length;
              this.totalSaleUnit = total;

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
    this.initToolbar(this);
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
};
</script>
<style scoped>
.k-chart {
  height: 180px;
}

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
