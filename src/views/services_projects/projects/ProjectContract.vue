<template>
  <v-row>
    <v-col sm="12" cols="12" class="">
      <v-card color="white" class=" no_border" elevation="0">
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          type="loading"
          :myLoading="true"
        >
        </LoadingMe>
        <v-row>
          <v-col sm="3" cols="12" class="py-0">
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

          <v-col sm="3" cols="1" class="pt-1">
            <v-btn color="primary white--text" @click="searchTransaction('')">
              <i
                class="b-search"
                style="font-size: 18px; color:#fff !important;"
              />
            </v-btn>
            <v-btn to="sale_order" color="primary" class="white--text text-capitalize ml-2">
                
                {{$t('add_new')}}
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <!-- <v-col sm="3" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 no_border rounded-4 white--text"
              color="secondary"
              height="60px"
              @click="searchTransaction('Invoice')"
            >
              <h3 class="text-left flex-1 font_12 text-uppercase">
                {{ $t("total_revenue") }}
              </h3>
              <h3 class="font_20 mt-0 flex-1 text-right white--text">
                {{ numberFormat(totalRevenue) }}
              </h3>
            </v-card>
          </v-col>
          <v-col sm="3" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              color="third"
              class="pa-3 rounded-4 no_border white--text"
              height="60px"
              @click="searchTransaction('Sale Lead')"
            >
              <h3 class="text-left flex-1 font_12 text-uppercase">
                {{ $t("open_lead") }}
              </h3>
              <h3 class="font_20 mt-0 flex-1 text-right white--text">
                {{ numberFormat(totalSaleLead) }}
              </h3>
            </v-card>
          </v-col>
          <v-col sm="3" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              color="third"
              class="pa-3  rounded-4 no_border white--text"
              height="60px"
              @click="searchTransaction('Sale Quote')"
            >
              <h3 class="text-left flex-1 font_12 text-uppercase">
                {{ $t("open_sale_quote") }}
              </h3>
              <h3 class="font_20 mt-0 flex-1 text-right white--text">
                {{ numberFormat(totalSaleQuote) }}
              </h3>
            </v-card>
          </v-col> -->
          <!-- <v-col sm="6" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 rounded-4 no_border black--text"
              color="grayBg"
              height="60px"
              @click="searchTransaction('Sale Order')"
            >
              <h3 class="text-left flex-1 font_12 text-uppercase">
                {{ $t("open_sale_order") }}
              </h3>
              <h3 class="font_20 mt-0 flex-1 text-right black--text">
                {{ numberFormat(totalSaleOrder) }}
              </h3>
            </v-card>
          </v-col> -->
        </v-row>

        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <kendo-datasource
                ref="gridTransactionDS"
                :type="'JSON'"
                :data="transactions"
                :group="group"
                :server-paging="false"
              />
              <kendo-grid
                id="gridTransaction"
                class="grid-function"
                :data-source-ref="'gridTransactionDS'"
                :editable="false"
                :groupable="true"
                :column-menu="true"
                :noRecords="true"
                @pagechange="pageChangeHandler"
                :toolbar="['excel']"
                :excel-file-name="'SaleAnalysisByCustomer.xlsx'"
                :excel-filterable="true"
                :excel-all-pages="true"
                :scrollable-virtual="true"
              >
                <!--                <kendo-grid-column-->
                <!--                    :field="'no'"-->
                <!--                    :title="$t('no')"-->
                <!--                    :template="rowNumberTmpl"-->
                <!--                    :width="90"-->
                <!--                    :column-menu="false"-->
                <!--                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"-->
                <!--                    :attributes="{style: 'text-align: center'}"/>-->
                <kendo-grid-column
                  :field="'transactionDate'"
                  :title="$t('date')"
                  :width="120"
                  :template="dateFormat"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'name'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('name')"
                  :width="200"
                  :template="'<span>#=name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'transactionType'"
                  :title="$t('type')"
                  :width="120"
                  :template="'<span>#=transactionType#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'referenceNo'"
                  :title="$t('num')"
                  :width="180"
                  :template="referenceTemplate"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5, color: green !important',
                  }"
                />
                <!--                                <kendo-grid-column-->
                <!--                                    :field="'referenceNo'"-->
                <!--                                    :title="$t('ref_from')"-->
                <!--                                    :width="180"-->
                <!--                                    :template="referenceTemplate"-->
                <!--                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>-->
                <!--                                <kendo-grid-column-->
                <!--                                    :field="'referenceNo'"-->
                <!--                                    :title="$t('ref_to')"-->
                <!--                                    :width="180"-->
                <!--                                    :template="referenceTemplate"-->
                <!--                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>-->
                <kendo-grid-column
                  :field="'exchangeAmount'"
                  :title="$t('amount')"
                  :width="200"
                  :attributes="{ style: 'text-align: right; ' }"
                  :template="
                    '<span>#=kendo.toString(exchangeAmount, decimalFormat)#</span>'
                  "
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'location.name'"
                  :title="$t('location')"
                  :width="200"
                  :attributes="{ style: 'text-align: left; ' }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'project.name'"
                  :title="$t('project')"
                  :width="200"
                  :attributes="{ style: 'text-align: left; ' }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'segment.name'"
                  :title="$t('segment')"
                  :width="200"
                  :attributes="{ style: 'text-align: left; ' }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <!--                <kendo-grid-column-->
                <!--                    :field="'status'"-->
                <!--                    :title="$t('progressing_status')"-->
                <!--                    :width="180"-->
                <!--                    :template="status"-->
                <!--                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>-->
                <kendo-grid-column
                  :field="'status'"
                  :title="$t('status')"
                  :width="180"
                  :template="status"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <!--                <kendo-grid-column-->
                <!--                    :field="''"-->
                <!--                    :title="$t('action')"-->
                <!--                    :width="100"-->
                <!--                    :command="[{  text: 'Convert', click: goToConvert }]"-->
                <!--                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>-->
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import InvoiceModel from "@/scripts/invoice/model/Invoice";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const invoiceModel = new InvoiceModel({});

import JSZip from "jszip";

window.JSZip = JSZip;
export default {
  name: "SaleTransaction",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () =>
      import(`@/components/custom_templates/DatePickerComponent`),
  },
  data: () => ({
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    dateSorters: ["Today", "This Week", "This Month", "This Year"],
    mDateSorter: "Today",
    showLoading: false,
    transactions: [],
    tranDS: [],
    saleFormContent: {},
    isLoaded: false,
    invoice: invoiceModel,
    totalRevenue: 0,
    totalSaleLead: 0,
    totalSaleQuote: 0,
    totalSaleOrder: 0,
    group: { field: "name" },
  }),
  methods: {
    pdfExport: function(e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsPDF()
      window.console.log("pdfExport");
      window.console.log(e.data);
    },
    pageChangeHandler: function(event) {
      alert("change", event);
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
          today = new Date();
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
        default:
          this.startDate = "";
          this.endDate = "";
      }
    },
    numberFormat(value) {
      return kendo.toString(value, `n${this.saleFormContent.decimal}`);
    },
    referenceTemplate(data) {
      let url = "";
      if (data.type === "Invoice") {
        url = `invoice_view/${data.id}`;
      } else if (data.type === "Sale Deposit") {
        url = `sale_deposit_view/${data.id}`;
      } else if (data.type === "Purchase") {
        url = `credit_purchase_view/${data.id}`;
      } else if (data.type === "Sale Quote") {
        url = `sale_quote_view/${data.id}`;
      } else if (data.type === "Cash Receipt") {
        url = `cash_receipt_view/${data.id}`;
      } else if (data.type === "Sale Order") {
        url = `sale_order_view/${data.id}`;
      } else if (data.type === "Purchase Deposit") {
        url = `purchase_deposit_view/${data.id}`;
      } else if (data.type === "Credit Memo") {
        url = `sale_return_view/${data.id}`;
      } else if (data.type === "Debit Memo") {
        url = `purchase_return_view/${data.id}`;
      } else if (data.type === "Cash Payment") {
        url = `cash_payment_view/${data.id}`;
      } else if (data.type === "Sale Lead") {
        url = `lead/${data.id}`;
      }
      const refFrom = data.refFrom || [];
      const refTo = data.refTo || [];
      let args = {
        text: data.referenceNo,
        related: !!refFrom.length > 0 || !!refTo.length > 0,
        url: url,
        data: data,
      };
      window.console.log("related", refFrom, !!refFrom.length > 0);
      return {
        template: LinkTemplate,
        templateArgs: args,
      };
    },
    goToConvert(e) {
      this.newClick = false;
      e.preventDefault();
      // let grid = kendo.jQuery("#gridAddress").data("kendoGrid")
      // let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
      // this.address = dataItem
      // this.mCountry = dataItem.country
      // this.dialogM2 = true
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.gridTransactionDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    async loadTransactions() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          billingHandler.list().then((res) => {
            if (res.data.statusCode === 200) {
              window.console.log(res);
              this.transactions = res.data.data;
              const result = res.data.result;
              this.totalRevenue = kendo.toString(
                result.Revenue,
                result.decimalFormat
              );
              this.totalSaleLead = kendo.toString(
                result.SaleLead,
                result.decimalFormat
              );
              this.totalSaleOrder = kendo.toString(
                result.SaleOrder,
                result.decimalFormat
              );
              this.totalSaleQuote = kendo.toString(
                result.SaleQuote,
                result.decimalFormat
              );
            }
            this.showLoading = false;
          });
        }, 10);
      });
    },

    async searchTransaction(type) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          const startDate = this.startDate;
          const endDate = this.endDate;
          let strFilter = "";
          if (type !== "") {
            strFilter =
              "?start=" + startDate + "&end=" + endDate + "&type=" + type;
          } else {
            strFilter = "?start=" + startDate + "&end=" + endDate;
          }

          billingHandler.list(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              window.console.log("im search", res);
              this.transactions = res.data.data;
              const result = res.data.result;
              this.totalRevenue = kendo.toString(
                result.Revenue,
                result.decimalFormat
              );
              this.totalSaleLead = kendo.toString(
                result.SaleLead,
                result.decimalFormat
              );
              this.totalSaleOrder = kendo.toString(
                result.SaleOrder,
                result.decimalFormat
              );
              this.totalSaleQuote = kendo.toString(
                result.SaleQuote,
                result.decimalFormat
              );
            }
            this.showLoading = false;
          });
        }, 10);
      });
    },
    async searchData() {
      const type = "";
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          // this.showLoading = true
          const startDate = this.startDate;
          const endDate = this.endDate;
          let strFilter = "";
          if (type !== "") {
            strFilter =
              "?start=" + startDate + "&end=" + endDate + "&type=" + type;
          } else {
            strFilter = "?start=" + startDate + "&end=" + endDate;
          }
          let vue = this;
          this.tranDS = new kendo.data.DataSource({
            serverFiltering: true,
            transport: {
              read: {
                url:
                  "https://dev-apis.banhji.com/invoice-billings/invoice/institute/institute-0ab24220-808d-11ea-9131-1d2fe2a803b1/list/" +
                  strFilter,
                type: "GET",
                // beforeSend: function (req) {
                //     // req.setRequestHeader('Authorization', auth);
                // }
              },
              parameterMap: function(data, type) {
                window.console.log(data, type, "TypeParameter");
                // if type is "read", then data is { foo: 1 }, we also want to add { "bar": 2 }
                // return kendo.stringify($.extend({"bar": 2}, data));
              },
              dataType: "json",
            },
            change: function() {
              // log(this.data());
            },
            schema: {
              model: {
                id: "id",
              },
              data: function(response) {
                return response.data;
              },
              total: function(response) {
                window.console.log(response.total);
                return response.total;
              },
            },
            pageable: true,
            pageSize: 20,
            serverPaging: true,
            page: 1,
            requestStart: function() {
              vue.loading = true;
            },
            requestEnd: function() {
              vue.loading = false;
            },
          });
        }, 10);
      });
    },
    dateFormat(dataItem) {
      return kendo.toString(
        new Date(dataItem.transactionDate),
        `${this.invoice.dateFormat}`
      );
    },
    // linkTo(dataItem) {
    //     window.console.log(dataItem)
    //     this.$router.push({
    //         path: 'invoice' + `/${dataItem.id}`,
    //         params: {id: dataItem.id},
    //         query: {type: 'edit'}
    //     })
    // },
    status(dataItem) {
      let status = "",
        type = dataItem.type || "";
      switch (dataItem.status) {
        case 1:
          status = "Open";
          break;
        case 2:
          if (type === "Sale Lead") {
            status = "Applied";
          } else {
            status = "Partially Paid";
          }
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
    callback() {
      if (
        this.$route.params !== null &&
        this.$route.params.hasOwnProperty("data")
      ) {
        const data = this.$route.params.data;
        if (data.transactionType === "delete") {
          this.loadTransactions();
        }
      }
      window.console.log("im changed", this.$route.params);
    },
    // tranDS: function () {
    //     let vue = this
    //     const startDate = this.startDate
    //     const endDate = this.endDate
    //     let strFilter = ''
    //     strFilter = '?start=' + startDate + '&end=' + endDate
    //     return new kendo.data.DataSource({
    //         transport: {
    //             read: {
    //                 url: 'https://dev-apis.banhji.com/invoice-billings/invoice/institute/institute-0ab24220-808d-11ea-9131-1d2fe2a803b1/list/' + strFilter,
    //                 type: 'GET',
    //                 dataType: 'json'
    //             }
    //         },
    //         schema: {
    //             total: function (response) {
    //                 return response.total
    //             },
    //             data: function (response) {
    //                 return response.data
    //             },
    //             // total: function (response) {
    //             //     return response.total
    //             // }
    //         },
    //         pageable: true,
    //         pageSize: 20,
    //         serverPaging: true,
    //         // testing the change event handler
    //         change: function (e) {
    //             let data = this.data()
    //             window.console.log(data, e)
    //         },
    //         requestStart: function () {
    //             vue.loading = true
    //         },
    //         requestEnd: function () {
    //             vue.loading = false
    //         }
    //     })
    // },
  },
  mounted: async function() {
    // await this.loadTransactions()
  },
  computed: {
    // tranDS: function () {
    //     let vue = this
    //     const startDate = this.startDate
    //     const endDate = this.endDate
    //     let strFilter = ''
    //     strFilter = '?start=' + startDate + '&end=' + endDate
    //     return new kendo.data.DataSource({
    //         transport: {
    //             read: {
    //                 url: 'https://dev-apis.banhji.com/invoice-billings/invoice/institute/institute-0ab24220-808d-11ea-9131-1d2fe2a803b1/list/' + strFilter,
    //                 type: 'GET',
    //                 dataType: 'json'
    //             }
    //         },
    //         schema: {
    //             total: function (response) {
    //                 return response.total
    //             },
    //             data: function (response) {
    //                 return response.data
    //             },
    //             // total: function (response) {
    //             //     return response.total
    //             // }
    //         },
    //         pageable: true,
    //         pageSize: 20,
    //         serverPaging: true,
    //         // testing the change event handler
    //         change: function (e) {
    //             let data = this.data()
    //             window.console.log(data, e)
    //         },
    //         requestStart: function () {
    //             vue.loading = true
    //         },
    //         requestEnd: function () {
    //             vue.loading = false
    //         }
    //     })
    // },
  },
  watch: {
    $route: "callback",
  },
};
</script>
<style scoped>
.k-pdf-export .k-grid {
  font-family: "DejaVu Sans", "Arial", sans-serif;
}

/* Hide the Grid header and pager during export */
.k-pdf-export .k-grid-toolbar,
.k-pdf-export .k-pager-wrap {
  display: none;
}
</style>
