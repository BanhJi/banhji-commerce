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
                <h2 class="mb-0">{{ $t("import_product") }}</h2>
                <v-icon
                  @click="cancel()"
                  class="float-right close_icon"
                  >close
                </v-icon>
              </v-card>
              <v-card outlined dense class="px-4 no_border" color="grayBg">
                <v-row>
                  <v-col sm="4" cols="12" class="pb-0">
                    <label class="label mb-0">{{
                      $t("product_category")
                    }}</label>
                    <v-select
                      class="mt-1"
                      :placeholder="$t('category')"
                      outlined
                      tage="Product Category"
                      :loading="categories.length === 0"
                      v-model="mCategory"
                      :items="categories"
                      item-value="id"
                      :item-text="(item) => `${item.abbr} - ${item.name}`"
                      @change="onCategoryChanged"
                      return-object
                      :rules="[(v) => !!v['id'] || $t('is_required')]"
                      required
                    />
                    <label class="label mb-0">{{ $t("product_group") }}</label>
                    <v-select
                      class="mt-1"
                      :placeholder="$t('select_group')"
                      outlined
                      tage="Product Group"
                      v-model="mGroup"
                      :items="group"
                      @change="onGroupChanged"
                      item-value="id"
                      :item-text="(item) => `${item.abbr} - ${item.name}`"
                      return-object
                      clearable
                      required
                    />
                    <label class="label mb-0">{{ $t("sub_group") }}</label>
                    <v-select
                      class="mt-1"
                      :placeholder="$t('select_sub_group')"
                      outlined
                      tage="Sub Group"
                      v-model="mSubGroup"
                      :items="subGroup"
                      item-value="id"
                      :item-text="(item) => `${item.abbr} - ${item.name}`"
                      clearable
                      return-object
                      required
                    />
                  </v-col>
                  <v-col sm="4" cols="12" class="pl-0">
                    <label class="label ml-3">{{ $t("variant_type") }}</label>
                    <v-col sm="12" cols="12" class="pt-2">
                      <kendo-datasource ref="variantDS" :data="varLists" />
                      <kendo-grid
                        id="grid"
                        class="grid-function"
                        :data-source-ref="'variantDS'"
                        :editable="true"
                        :scrollable-virtual="true"
                      >
                        <kendo-grid-column
                          :field="'variant'"
                          :title="$t('variant_attributes')"
                          :width="190"
                          :template="'<span>#=variant.name#</span>'"
                          :editor="attributeDropDownEditor"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :command="{
                            iconClass: 'k-icon k-i-trash',
                            text: $t(' '),
                            click: removeRow,
                            class: 'btn-plus',
                          }"
                          :title="$t('action')"
                          :width="80"
                          :attributes="{ style: 'text-align: right' }"
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                        />
                      </kendo-grid>
                      <v-btn
                        color="primary"
                        class="
                          float-left
                          rounded-4
                          ml-0
                          btn_plus
                          white--text
                          mt-3
                        "
                        @click="addRow"
                      >
                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-col>
                  <v-col sm="4" cols="12" class="pb-0">
                    <upload-excel-component
                      :on-success="handleSuccess"
                      :before-upload="beforeUpload"
                    />
                  </v-col>
                  <v-col sm="6" cols="6" class="pb-0">
                    <v-btn
                      outlined
                      class="secondary--text capitalize float-right"
                      href="/files/productTemplate.xlsx"
                      download
                    >
                      <span class="">{{ $t("download_file_template") }}</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
              <v-card outlined dense class="no_border function_footer">
                <v-btn
                  color="black"
                  @click="cancel"
                  outlined
                  class="text-capitalize black--text float-left"
                  >{{ $t("cancel") }}
                </v-btn>
                <v-btn
                  class="float-right white--text"
                  color="primary"
                  @click="saveImport"
                  >{{ $t("import") }}
                </v-btn>
                <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  type="loading"
                  :myLoading="true"
                />
              </v-card>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { i18n } from "@/i18n";
import ProductModel from "@/scripts/model/Products";
import kendo from "@progress/kendo-ui";
import VariantModel from "@/scripts/model/Variants";

const $ = kendo.jQuery;

const accountHandler = require("@/scripts/handler/accounting/account");
const categoryHandler = require("@/scripts/categoryHandler");
const groupHandler = require("@/scripts/groupHandler");
const subGroupHandler = require("@/scripts/subGroupHandler");
const uomHandler = require("@/scripts/uomHandler");
const warehouseHandler = require("@/scripts/warehouseHandler");
const productHandler = require("@/scripts/productHandler");
const variantHandler = require("@/scripts/variantTypeHandler");
const priceLevelHandler = require("@/scripts/priceLevelHandler");
// const attributeHandler = require("@/scripts/attributeHandler")
const variantModel = new VariantModel({});

let productModel = new ProductModel({});
export default {
  name: "ImportProduct",
  props: ["id"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "upload-excel-component": () =>
      import(`@/components/upload_excel/TimeCard`),
  },
  data: function () {
    return {
      showLoading: true,
      accLoading: false,
      valid: "",
      incomeAcc: "",
      mAccInventory: "",
      mCategory: "",
      mGroup: "",
      mAccCostOfGoodSold: "",
      accRevenue: [],
      accInventory: [],
      accCostOfGoodSold: [],
      categories: [],
      groups: [],
      group: [],
      subGroup: [],
      uom: [],
      mSubGroup: {},
      subGroups: [],
      wareHouses: [],
      mUOM: {},
      mWareHouse: {},
      mSerialOrBatch: 0,
      variantTypes: [],
      variant: variantModel,
      varLists: [],
      product: productModel,
      productVariant: {},
      variantId: "",
      priceLevel: [],
      coa: [],
      tableData: [],
    };
  },
  methods: {
    mappingAccount(coa, uuid) {
      const account = coa.filter((k) => k.uuid === uuid);
      return account.map((j) => {
        j.id = j.uuid;
        return {
          ...j,
        };
      })[0];
    },
    async loadPriceLevel() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          priceLevelHandler.get().then((res) => {
            const data = res || [];
            this.priceLevel = data.filter((n) => n.type.name === "Standard");
            if (this.priceLevel.length > 0) {
              this.product.priceLevel = this.priceLevel[0];
            }
          });
        }, 10);
      });
    },
    loadCategoryAccountAndTax() {
      try {
        const account = this.mCategory.account || {};
        const incomeAcc = account.incomeAcc || "";
        const inventoryAcc = account.inventoryAcc || "";
        const costOfGoodsSoldAcc = account.costOfGoodsSoldAcc || "";
        this.incomeAcc = this.mappingAccount(this.coa, incomeAcc);
        this.mAccInventory = this.mappingAccount(this.coa, inventoryAcc);
        this.mAccCostOfGoodSold = this.mappingAccount(
          this.coa,
          costOfGoodsSoldAcc
        );
      } catch (error) {
        window.console.log("error t", error);
      }
    },
    addRow() {
      let ds = this.$refs.variantDS.kendoWidget(),
        total = ds.total();
      ds.insert(total, {
        variant: this.variant,
      });
    },
    // Row Number Template
    rowNumberTmpl(dataItem) {
      var ds = this.$refs.variantDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    // Grid Custom Editor
    attributeDropDownEditor(container, options) {
      kendo
        .jQuery('<input required name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
          autoBind: false,
          autoWidth: true,
          height: 400,
          filter: "startswith",
          dataTextField: "name",
          dataValueField: "id",
          template: "<span>#=code# - #=name#</span>",
          optionLabel: "--- Select ---",
          dataSource: new kendo.data.DataSource({
            data: this.variantTypes,
          }),
        });
    },
    // Remove Row
    removeRow(e) {
      e.preventDefault();

      var grid = kendo.jQuery("#grid").data("kendoGrid"),
        dataSource = grid.dataSource,
        dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

      if (dataSource.total() > 1) {
        dataSource.remove(dataItem);
      }
    },
    onChange() {},
    onNewClick() {
      this.product.id = "";
      this.clear();
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning",
      });
      return false;
    },
    handleSuccess({ results, header }) {
      results.forEach((element) => {
        let c = this.mCategory;
        element.typeIs = "Product";
        let uo = this.uom.filter((obj) => {
          return obj.name == element.uom;
        });
        if (uo.length > 0) {
          element.uom = uo[0];
        } else {
          this.$snotify.error("uom not found!");
          return;
        }
        element.category = c;
        element.group = this.mGroup;
        element.subGroup = this.mSubGroup;
        let p = this.priceLevel.filter((obj) => {
          return obj.name == element.priceLevel;
        });
        if (p.length > 0) {
          element.priceLevel = p[0];
        } else {
          this.$snotify.error("price level not found!");
          return;
        }

        const variants = [];
        const ds = this.$refs.variantDS.kendoWidget();
        const variant = ds.data();
        variant.forEach((i) => {
          variants.push({
            variant: i.variant,
            uid: i.uid,
          });
        });

        const account = this.mCategory.account || {};
        element.warehouse = this.mWareHouse || {};
        // element.uom = this.mUOM || {};
        element.value = element.price;
        const incomeAcc = account.incomeAcc || "";
        const inventoryAcc = account.inventoryAcc || "";
        const costOfGoodsSoldAcc = account.costOfGoodsSoldAcc || "";
        element.incomeAcc = this.mappingAccount(this.coa, incomeAcc);
        element.inventoryAcc = this.mappingAccount(this.coa, inventoryAcc);
        element.costOfGoodsSoldAcc = this.mappingAccount(
          this.coa,
          costOfGoodsSoldAcc
        );
        element.loggedUser = this.loggedUser;
        element.variant = variants;
        element.canBeSold = false;
        element.canBeRent = false;
        element.canBeProduce = false;
        element.canBePurchase = false;
        element.isFavorite = false;
        element.status = 1;
        element.deleted = 0;
        element.type = "new";
      });
      this.tableData = results;
      this.tableHeader = header;
      window.console.log(this.tableData, this.tableHeader, "dataaaaa");
    },
    close(data) {
      window.history.go(-1);
      window.console.log(data, "--data");
    },
    async onCategoryChanged() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          // window.console.log(this.mCategory)
          this.mGroup = {};
          this.mSubGroup = {};

          this.group = this.groups.filter(
            (m) => m.category.id === this.mCategory.id
          );
          if (this.group.length > 0) {
            this.mGroup = this.group[0];
            this.subGroup = this.subGroups.filter(
              (m) => m.group.id === this.group[0].id
            );
            if (this.subGroup.length > 0) {
              this.mSubGroup = this.subGroup[0];
            }
          }
          this.loadCategoryAccountAndTax();
        }, 10);
      });
    },
    async onGroupChanged() {
      const groupId = (this.mGroup || {}).id || "";
      this.subGroup = this.subGroups.filter((m) => m.group.id === groupId);
    },
    async loadAccount() {
      this.accLoading = true;
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          accountHandler.getAll().then((res) => {
            this.showLoading = false;
            this.coa = res.data;
            this.accRevenue = res.data
              .filter((m) => m.account_type.number === 32)
              .map((item) => {
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
            if (this.accRevenue.length > 0) {
              this.incomeAcc = this.accRevenue[0];
            }
            this.accInventory = res.data
              .filter((m) => m.account_type.number === 8)
              .map((item) => {
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
            if (this.accInventory.length > 0) {
              this.mAccInventory = this.accInventory[0];
            }
            this.accCostOfGoodSold = res.data
              .filter((m) => m.account_type.number === 33)
              .map((item) => {
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
            if (this.accCostOfGoodSold.length > 0) {
              this.mAccCostOfGoodSold = this.accCostOfGoodSold[0];
            }
            this.accLoading = false;
          });
        }, 10);
      });
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
          });
        }, 10);
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
            this.showLoading = false;
            this.groups = res.data.data;
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
    async loadUOM() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          uomHandler.get().then((res) => {
            this.showLoading = false;
            this.uom = res;
          });
        }, 10);
      });
    },
    async loadWareHouses() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          warehouseHandler.getWarehouseSettingAll().then((res) => {
            this.showLoading = false;
            this.wareHouses = res;
            if (this.wareHouses.length > 0) {
              this.mWareHouse = this.wareHouses[0];
            }
          });
        }, 10);
      });
    },
    async loadVariants() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          variantHandler.get().then((res) => {
            this.showLoading = false;
            this.variantTypes = res;
          });
        }, 10);
      });
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
    saveImport() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      if (this.tableData.length > 0) {
        let data = {
          data: this.tableData,
        };
        this.showLoading = true;
        productHandler
          .importProduct(data)
          .then((response) => {
            this.showLoading = false;
            if (response.data.statusCode === 201) {
              this.$refs.form.reset();
              this.$snotify.success("Successfully");
            }
          })
          .catch((e) => {
            this.$snotify.error("Something went wrong");
            this.errors.push(e);
          });
      }
    },
  },
  mounted: async function () {
    await this.loadAccount();
    await this.loadCategory();
    await this.loadGroup();
    await this.loadSubGroup();
    await this.loadUOM();
    await this.loadWareHouses();
    await this.loadVariants();
    await this.loadPriceLevel();
  },
  computed: {},
  watch: {},
};
</script>

<style scoped>
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

p {
  font-size: 15px;
  font-family: "Niradei-Light" !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}
</style>
