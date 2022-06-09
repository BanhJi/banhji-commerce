<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <h2 class="mb-0 font_20">{{ $t("transaction_items") }}</h2>
      <v-dialog v-model="dialogM3" max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            class="white--text float-right text-capitalize"
            v-on="on"
            @click="newClick"
          >
            {{ $t("new_transaction_item") }}
          </v-btn>
        </template>
        <v-card>
          <div class="modal_header">
            <v-card-title>{{ $t("transaction_item") }}</v-card-title>
            <v-icon @click="dialogM3 = false">close</v-icon>
          </div>
          <v-card-text class="modal_text_content">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col sm="6" cols="12" class="pb-0">
                  <label>{{ $t("number") }}</label>
                  <v-text-field
                    class="mt-1"
                    v-model="transactionItem.number"
                    outlined
                    clearable
                    :rules="[(v) => !!v || $t('is_required')]"
                  />

                  <label>{{ $t("name") }}</label>
                  <v-text-field
                    class="mt-1"
                    v-model="transactionItem.name"
                    outlined
                    clearable
                    :rules="[(v) => !!v || $t('is_required')]"
                  />

                  <label>{{ $t("account") }}</label>
                  <v-select
                    class="mt-1"
                    outlined
                    tage="Account"
                    v-model="mAccount"
                    :items="account"
                    item-value="id"
                    :item-text="
                      (item) =>
                        `${item.number} - ${
                          this.$store.state.accounting.accountLanguage ===
                          'English'
                            ? item.name
                            : item.local_name
                        }`
                    "
                    :rules="[(v) => !!v['uuid'] || $t('is_required')]"
                    return-object
                    clearable
                  />
                </v-col>
                <v-col sm="6" cols="12" class="pb-0">
                  <label class="label">{{ $t("uom") }}</label>
                  <v-select
                    class="mt-1"
                    outlined
                    tage="Uom"
                    v-model="mUOM"
                    :items="uom"
                    item-value="id"
                    :item-text="(item) => `${item.name}`"
                    :rules="[(v) => !!v['id'] || $t('is_required')]"
                    return-object
                    clearable
                  />

                  <label>{{ $t("descriptions") }}</label>
                  <v-textarea
                    rows="4"
                    class="mt-1"
                    no-resize
                    height="122px"
                    v-model="transactionItem.description"
                    outlined
                    clearable
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="modal_footer">
            <v-row>
              <v-col sm="6" cols="6" class="py-0 text-left">
                <v-btn
                  color="black"
                  outlined
                  class="text-capitalize black--text float-left"
                  @click="dialogM3 = false"
                  >{{ $t("cancel") }}
                </v-btn>
              </v-col>
              <v-col sm="6" cols="6" class="py-0 text-right">
                <v-btn
                  color="primary"
                  class="px-3 white--text text-capitalize"
                  @click="onSaveClose"
                >
                  {{ $t("save_close") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>

    <v-col sm="12" cols="12" class="pl-4">
      <LoadingMe
        :isLoading="showLoading"
        :fullPage="false"
        :myLoading="true"
        type="loading"
      />
      <template>
        <kendo-datasource ref="transactionItemDS" :data="TxnItemCenterList" />
        <kendo-grid
          id="gridTranItem"
          class="grid-function"
          :data-source-ref="'transactionItemDS'"
          :editable="false"
          :toolbar="toolbarTemplate"
          :excel-file-name="'TransactionItems.xlsx'"
          :excel-filterable="true"
          :excel-all-pages="true"
          :resizable="true"
          :scrollable-virtual="true"
        >
          <kendo-grid-column
            :field="'number'"
            :title="$t('number')"
            :width="150"
            :template="'<span>#=number || ``#</span>'"
            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
          />
          <kendo-grid-column
            :field="'name'"
            :title="$t('name')"
            :attributes="{ class: 'tb_name_td' }"
            :width="200"
            :template="'<span>#=name#</span>'"
            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
          />
          <kendo-grid-column
            :field="'account'"
            :title="$t('account')"
            :hidden="false"
            :template="
              this.$store.state.accounting.accountLanguage === 'English'
                ? '<span>#=account.number#</span> - <span>#=account.name#</span>'
                : '<span>#=account.number#</span> - <span>#=account.local_name#</span>'
            "
            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
          />
          <kendo-grid-column
            :field="'uom'"
            :title="$t('uom')"
            :width="100"
            :template="'<span>#=uom.name#</span>'"
            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
          />
          <kendo-grid-column
            :field="'description'"
            :title="$t('description')"
            :width="200"
            :template="'<span>#=description#</span>'"
            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
          />
          <kendo-grid-column
            :field="''"
            :title="$t('action')"
            :width="100"
            :command="[
              { iconClass: 'k-icon k-i-edit', text: $t(' '), click: goEdit },
            ]"
            :headerAttributes="{ style: ' background-color: #EDF1F5' }"
          />
        </kendo-grid>
      </template>
    </v-col>
    <div style="overflow: auto" class="page-txn-itm-center"></div>
  </v-row>
</template>
<script>
import TransactionItemModel from "@/scripts/model/TransactionItems";
import kendo from "@progress/kendo-ui";

const transactionItemHandler = require("@/scripts/transactionItemHandler");
const transactionItemModel = new TransactionItemModel({});
const uomHandler = require("@/scripts/uomHandler");
const accountHandler = require("@/scripts/handler/accounting/account");
const productHandler = require("@/scripts/productHandler");
const $ = kendo.jQuery;
export default {
  data: () => ({
    showLoading: false,
    dialogM3: false,
    account: [],
    uom: [],
    mUOM: {},
    transactionList: [],
    mAccount: {},
    schemaDefinition: {
      model: {
        id: "id",
      },
    },
    valid: true,
    transactionItem: transactionItemModel,

    totalService: 0,
    txnTxnItemCenter: [],
    TxnItemCenterList: [],
    toalServicePerPage: 0,
    paging: {},
    action: "",
    params: {},
    coa: [],
  }),
  props: {},
  methods: {
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.transactionItemDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    async loadAccount() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          accountHandler.getAll().then((res) => {
            this.showLoading = false;
            this.coa = res.data;
            this.account = res.data.map((item) => {
              return {
                id: item.uuid,
                uuid: item.uuid,
                name: item.name,
                local_name: item.local_name,
                number: item.number,
                is_taxable: item.is_taxable,
                banhjiAccCode: item.banhjiAccCode,
                group_code: item.group_code,
                parent_account: item.parent_account,
                type_code: item.type_code,
                account_type: item.account_type,
              };
            });
            if (this.account.length > 0) {
              this.mAccount = this.account[0];
            }
          });
        }, 10);
      });
    },
    async loadUOM() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          uomHandler.get().then((res) => {
            this.showLoading = false;
            this.uom = res;
            if (this.uom.length > 0) {
              this.mUOM = this.uom[0];
            }
          });
        }, 300);
      });
    },
    async loadTransactionItems() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          transactionItemHandler.list().then((res) => {
            if (res.data.statusCode === 200) this.showLoading = false;
            this.transactionList = res.data.data;
          });
        }, 300);
      });
    },
    onSearch(search) {
      this.txnTxnItemCenter = [];
      this.loadPage(this);
      this.paging = {};
      this.loadVariantCenter(search);
    },
    async loadVariantCenter(search) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.TxnItemCenterList = [];
          //   const category = this.mCategory || {};
          //   const categoryId = category.id || "";
          //   const group = this.mGroup || {};
          //   const groupId = group.id || "";
          //   const subGroup = this.mSubGroup || {};
          //   const subGroupId = subGroup.id || "";
          //   const switch_ = this.switchModelVariant || 0;
          this.params = {
            ctid: "",
            grid: "",
            sgid: "",
            key: this.paging,
            search: search,
            // searchAs: switch_ ? 1 : 0,
            type: "Transaction Item",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          productHandler.center(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.TxnItemCenterList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnTxnItemCenter.push(responseData);

              this.toalServicePerPage = this.TxnItemCenterList.length;
              this.totalService = total;

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
    async loadPage(that) {
      $(".page-txn-itm-center").html(`
                <span class="mt-2 by-txn-itm-center-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="by-txn-itm-center-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="by-txn-itm-center-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="by-txn-itm-center-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="by-txn-itm-center-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".by-txn-itm-center-page-link", function () {
        const page = $(this).data("page");
        $(".by-txn-itm-center-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".by-txn-itm-center-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".by-txn-itm-center-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("by-txn-itm-center-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".by-txn-itm-center-page-link").removeClass("text-bold-link");
          $(`.by-txn-itm-center-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".by-txn-itm-center-page-link").removeClass("text-bold-link");
          that.loadVariantCenter(that.search);
          $(this)
            .parent()
            .children(".by-txn-itm-center-page-number")
            .append(
              `<li class="by-txn-itm-center-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnTxnItemCenter.forEach((k) => {
        totalRow += k.length;
      });
      $(".by-txn-itm-center-item-returned").text(
        "Items returned (" + totalRow + " of " + that.totalService + ")"
      );
    },
    disabledNextPage(value) {
      $(".by-txn-itm-center-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnTxnItemCenter.at(index);
        that.TxnItemCenterList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnTxnItemCenter[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    async onSaveClose() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let data = {
            id: this.transactionItem.id,
            name: this.transactionItem.name,
            number: this.transactionItem.number,
            description: this.transactionItem.description,
            uom: this.mUOM,
            account: this.mAccount,
            type: "Transaction Item",
            status: 1,
            actionType: this.transactionItem.id ? "edit" : "new",
          };
          transactionItemHandler
            .create(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                this.onSearch("");
                this.$snotify.success("Success");
                this.close();
              }
            })
            .catch((e) => {
              this.$snotify.error("Something went wrong");
              this.errors.push(e);
            });
        });
      });
    },
    cancel() {
      this.dialogM3 = false;
    },
    close() {
      this.dialogM3 = false;
    },
    newClick() {
      this.transactionItem = {};
      this.mAccount = {};
      this.mUOM = {};
      this.dialogM3 = true;
    },
    goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridTranItem").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.transactionItem = dataItem;
      const account = dataItem.account || {};
      const uom = dataItem.uom || ''
      this.mAccount = this.mappingAccount(this.coa, account.id || "");
      this.mUOM = this.uom.filter(k=> k.id === uom.id)[0]
      this.dialogM3 = true;
    },

    initToolbar(that) {
      let grid = $("#gridTranItem").data("kendoGrid");
      let gridElement = grid.element;
      let toolbarElement = gridElement.find(".k-grid-toolbar");
      toolbarElement.on("click", ".k-pager-refresh", function (e) {
        e.preventDefault();
        onReloadData(that);
      });
      toolbarElement.on("click", ".k-pager-excel", function (e) {
        e.preventDefault();
        onExportExcel(that);
      });

      function onReloadData(that) {
        that.onSearch("");
      }

      function onExportExcel(that) {
        that.exportToExcel();
      }
    },
    exportToExcel() {
      const grid = $("#gridTranItem").data("kendoGrid");
      grid.saveAsExcel();
    },
    toolbarTemplate: function () {
      const templateHtml =
        "<span>" +
        '<a class="k-pager-excel k-link k-button excel" title="Export to Excel"> <span class="k-icon k-i-excel"></span>Export to excel </a>' +
        "</span><span>&nbsp;&nbsp;</span>" +
        '<span style="position:absolute; right:5px">' +
        "</span>" +
        "<span>" +
        '<a class="k-pager-refresh k-link k-button reload" title="Refresh"><span class="k-icon k-i-reload"></span> Refresh </a>' +
        "</span>";

      return kendo.template(templateHtml);
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    mappingAccount(coa, uuid) {
      const account = coa.filter((k) => k.uuid === uuid);
      return account.map((j) => {
        j.id = j.uuid;
        return {
          ...j,
        };
      })[0];
    },
  },
  mounted: async function () {
    await this.loadUOM();
    // await this.loadTransactionItems();
    await this.initToolbar(this);

    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
  },
  created: async function () {
    await this.loadAccount();
  },
  computed: {},
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
};
</script>

<style scoped>
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
}
</style>
