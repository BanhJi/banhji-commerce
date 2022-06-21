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
                <h2 class="mb-0">{{ $t("store") }}</h2>
                <v-icon
                  @click="cancel()"
                  style="cursor: pointer; color: #333; font-size: 40px"
                  class="float-right"
                  >close
                </v-icon>
              </v-card>
              <v-card outlined dense class="px-3 no_border" color="grayBg">
                <v-row>
                  <v-col sm="6" cols="6" class="pb-0">
                    <label class="label mb-0">{{ $t("name") }}</label>
                    <v-text-field
                      class="pt-1"
                      outlined
                      :rules="[(v) => !!v || $t('is_required')]"
                      required
                    />
                    <label class="label mb-0">{{ $t("segment") }}</label>
                    <v-select
                      class="mt-1"
                      :placeholder="$t('select_segment')"
                      outlined
                      clearable
                      return-object
                    />
                  </v-col>
                  <v-col sm="6" cols="6" class="pl-0">
                    <label class="label mb-0">{{ $t("warehouse") }}</label>
                    <v-select
                      class="mt-1"
                      :placeholder="$t('select_warehouse')"
                      outlined
                      clearable
                      return-object
                    />
                   
                    <label class="label mb-0">{{ $t("user") }}</label>
                    <v-select
                      class="mt-1"
                      :placeholder="$t('select_user')"
                      outlined
                      clearable
                      return-object
                    />
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
                >
                  {{ $t("cancel") }}
                </v-btn>
                <v-btn
                  @click="onSaveClose('close')"
                  color="primary"
                  class="float-right white--text text-capitalize"
                >
                  {{ $t("save_close") }}
                </v-btn>
                <v-btn
                  color="secondary"
                  style="margin-right: 10px !important"
                  class="white--text float-right text-capitalize"
                  @click="onSaveClose('new')"
                  :hidden="hiddenButton"
                  >{{ $t("save_new") }}
                </v-btn>
              </v-card>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true" />
    </v-container>
  </v-app>
</template>

<script>
import ServiceItem from "@/scripts/model/ServiceItem";
import { i18n } from "@/i18n";

let serviceItem = new ServiceItem({});

const accountHandler = require("@/scripts/handler/accounting/account");
const categoryHandler = require("@/scripts/categoryHandler");
const groupHandler = require("@/scripts/groupHandler");
const subGroupHandler = require("@/scripts/subGroupHandler");
const uomHandler = require("@/scripts/uomHandler");
const warehouseHandler = require("@/scripts/warehouseHandler");
const serviceItemHandler = require("@/scripts/serviceItemHandler");
const settingHandler = require("@/scripts/settingHandler");
const priceLevelHandler = require("@/scripts/priceLevelHandler");
export default {
  name: "AddServiceItem",
  props: ["id"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    showLoading: false,
    accLoading: false,
    valid: "",
    mAccInventory: "",
    mCategory: "",
    mGroup: "",
    accRevenue: [],
    mAccCostOfGoodSold: "",
    accInventory: [],
    accCostOfGoodSold: [],
    categories: [],
    groups: [],
    group: [],
    wareHouses: [],
    mSubGroup: {},
    mIncomeAcc: {},
    mUOM: {},
    mPurchaseUOM: {},
    mWareHouse: {},
    mSpecificTax: {},
    defaultTax: {},
    purchaseTax: [],
    mPurchaseTax: {},
    subGroups: [],
    subGroup: [],
    uom: [],
    tax: [],
    specificTax: [],
    mOtherTax: {},
    otherTax: [],
    vat: [],
    service: serviceItem,
    imgFile: "",
    src: "",
    code: "",
    price: 0,
    priceLevel: [],
    fileSizeRules: [
      (files) =>
        !files ||
        !files.some((file) => file.size > 1024 * 1024) ||
        "Image size should be less than 1 MB!",
    ],
    disabled: true,
    disabledS: true,
    coa: [],
  }),
  methods: {
    autoPrice() {
      const value = this.service.value || 0;
      let base = this.service.base || 0;
      let price_ = (value * base) / 100;
      if (base > 100) {
        this.service.base = 100;
        base = 100;
        price_ = (value * base) / 100;
      }
      this.price = price_;
      this.service.price = price_;
      window.console.log(this.service.price, "price");
      return price_;
    },
    priceLevelChanged() {
      this.code = "";
      if (this.service.priceLevel) {
        if (this.service.priceLevel.hasOwnProperty("currency")) {
          const currency = this.service.priceLevel.currency;
          if (currency.hasOwnProperty("code")) {
            this.code = "(" + currency.code + ")";
          }
        }
      } else {
        this.code = "";
      }
    },
    async loadPriceLevel() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          priceLevelHandler
            .get()
            .then((res) => {
              this.priceLevel = res;
              this.showLoading = false;
              if (this.priceLevel.length > 0) {
                this.service.priceLevel = this.priceLevel[0];
                this.priceLevelChanged();
              }
            })
            .catch(() => {
              this.showLoading = false;
            });
        }, 10);
      });
    },
    onUpdate() {
      this.$emit("onUpdate", this.service);
    },
    async onSaveClose(isSave) {
      if (!this.$refs.form.validate()) {
        window.scrollTo({ behavior: "smooth", top: 20 });
        this.$refs.form.validate();
        return;
      }
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let data = {
            id: this.$route.params.id,
            name: this.service.name,
            sku: this.service.sku,
            typeIs: "Service",
            uom: this.mUOM,
            category: this.mCategory || {},
            group: this.mGroup || {},
            subGroup: this.mSubGroup || {},
            priceLevel: this.service.priceLevel,
            saleDescription: this.service.saleDescription,
            purchaseDescription: this.service.purchaseDescription,
            warehouse: this.mWareHouse,
            price: this.service.price,
            base: this.service.base,
            value: this.service.value,
            incomeAcc: this.mIncomeAcc,
            costOfGoodsSoldAcc: this.mAccCostOfGoodSold,
            // defaultTax: this.defaultTax,
            // purchaseTax: this.mPurchaseTax,
            // specificTax: this.mSpecificTax,
            // otherTax: this.mOtherTax,
            canBeSold: this.service.canBeSold,
            canBeSubContracted: this.service.canBeSubContracted,
            isDelayedRevenue: this.service.isDelayedRevenue,
            isConsignmentItem: this.service.isConsignmentItem,
            canBeRecurringSubscribed: this.service.canBeRecurringSubscribed,
            isMeteredService: this.service.isMeteredService,
            isTimeBounded: this.service.isTimeBounded,
            images: this.service.images,
            file: this.imgFile,
            type: this.$route.params.id ? this.$route.query.type : "new",
            reUsed: this.service.reUsed,
          };
          window.console.log(0, data);
          if (isSave == "new") {
            this.clear();
          }
          serviceItemHandler
            .create(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                data.id = response.data.data.id;
                data.images = response.data.data.images;
                // this.$emit('onUpdate', data)
                this.$snotify.success("Success");
                if (isSave == "new") {
                  this.clear();
                } else if (isSave == "close") {
                  this.clear();
                  this.close(data);
                }
              }
            })
            .catch((e) => {
              this.$snotify.error("Something went wrong");
              this.errors.push(e);
            });
        });
      });
    },
    onFileChange(e) {
      // const file = e.target.files[0];
      let input = e.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        if (input.files[0].size > 1024 * 1024) {
          e.preventDefault();
          alert("File too big (> 1MB)");
          this.src = "";
          this.imgFile = "";
          this.$refs.fileupload.value = null;
        } else {
          // create a new FileReader to read this image and convert to base64 format
          let reader = new FileReader();
          // Define a callback function to run, when FileReader finishes its job
          reader.onloadend = (e) => {
            // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
            // Read image as base64 and set to imageData
            this.imgFile = e.target.result;
          };
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsBinaryString(input.files[0]);
          // this.url = input.files[0]
          this.src = URL.createObjectURL(e.target.files[0]);
        }
      }
    },
    close(data) {
      // window.history.go(-1)
      this.$router.push({
        name: "Services Projects",
        path: "services",
        params: {
          data: data,
        },
      });
    },
    clear() {
      this.mGroup = {};
      this.mCategory = {};
      this.mSubGroup = {};
      this.mAccCostOfGoodSold = {};
      this.incomeAcc = {};
      //   this.loadAccount();
      // this.loadTax()
      this.service = new ServiceItem({});
      this.loadUOM();
      this.loadPriceLevel();
      this.autoPrice();
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
    loadCategoryAccountAndTax() {
      // this.mOtherTax = this.mCategory.tax.hasOwnProperty("otherTax")
      //     ? this.mCategory.tax.otherTax
      //     : {};
      // this.mSpecificTax = this.mCategory.tax.hasOwnProperty("specificTax")
      //     ? this.mCategory.tax.specificTax
      //     : {};
      // this.defaultTax = this.mCategory.tax.hasOwnProperty("defaultTax")
      //     ? this.mCategory.tax.defaultTax
      //     : {};
      // this.mPurchaseTax = this.mCategory.tax.hasOwnProperty("purchaseTax")
      //     ? this.mCategory.tax.purchaseTax
      //     : {};
      const account = this.mCategory.account || {};
      const incomeAcc = account.incomeAcc || "";
      const costOfGoodsSoldAcc = account.costOfGoodsSoldAcc || "";
      this.mIncomeAcc = this.mappingAccount(this.coa, incomeAcc);
      this.mAccCostOfGoodSold = this.mappingAccount(
        this.coa,
        costOfGoodsSoldAcc
      );
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
    async onCategoryChanged() {
      this.disabled = false;
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          // window.console.log(this.mCategory)
          this.mGroup = "";
          this.mSubGroup = "";
          // this.loadCategoryAccountAndTax()
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
    async loadAccount() {
      this.accLoading = true;
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          accountHandler.getAll().then((res) => {
            this.showLoading = false;
            this.coa = res.data;
            const accRevenue = res.data
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
            const unEarnRevenue = res.data
              .filter(
                (m) =>
                  m.account_type.number === 19 || m.account_type.number === 20
              )
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
            this.accRevenue = [...accRevenue, ...unEarnRevenue];
            if (this.accRevenue.length > 0) {
              this.mIncomeAcc = this.accRevenue[0];
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
            pattern: "cat#Service",
          };
          this.showLoading = true;
          categoryHandler
            .getAllv2(param)
            .then((res) => {
              this.showLoading = false;
              this.categories = res.data.data;
              // window.console.log(res)
              // this.categories = this.categories.filter(i => i.hasOwnProperty('type') && i.type.name === 'Service')
              // if (this.categories.length > 0) {
              //   this.mCategory = this.categories[0];
              //   this.onCategoryChanged();
              // }
            })
            .catch(() => {
              this.showLoading = false;
            });
        }, 10);
      });
    },
    async loadGroup() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const param = {
            pattern: "grp#Service",
          };
          this.showLoading = true;
          groupHandler
            .getAllv2(param)
            .then((res) => {
              this.showLoading = false;
              this.groups = res.data.data; // filter(m => m.category.hasOwnProperty('type') && m.category.type.name === 'Service');
              // window.console.log(res, 'group')
              // this.loadSubGroup(this.mGroup);
            })
            .catch(() => {
              this.showLoading = false;
            });
        }, 10);
      });
    },
    async loadSubGroup(group) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const param = {
            pattern: "sgr#Service",
          };
          this.showLoading = true;
          subGroupHandler
            .getAllv2(param)
            .then((res) => {
              this.showLoading = false;
              this.subGroups = res.data.data;
              if (group) {
                if (group.hasOwnProperty("id")) {
                  this.subGroups = res.data.data.filter(
                    (m) => m.group.id === group.id
                  );
                  this.disabledS = false;
                }
              }
            })
            .catch(() => {
              this.showLoading = false;
            });
        }, 10);
      });
    },
    // async skuGenerator() {
    //     new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve("resolved");
    //             // window.console.log(this.mCategory.abbr);
    //             this.service.sku =
    //                 this.mCategory.abbr +
    //                 "/" +
    //                 this.mGroup.abbr +
    //                 "/" +
    //                 this.mSubGroup.abbr +
    //                 "-" +
    //                 this.service.name.toString().substring(0, 3);
    //         }, 10);
    //     });
    // },
    async skuGenerator() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const category = this.mCategory || {};
          const group = this.mGroup || {};
          const sGroup = this.mSubGroup || {};
          let cateAbbr = "",
            groupAbbr = "",
            sGroupAbbr = "",
            skuCode = "";
          if (category.id) {
            cateAbbr = category.abbr || "";
            skuCode += cateAbbr + "/";
          }
          if (group.id) {
            groupAbbr = group.abbr || "";
            skuCode += groupAbbr + "/";
          }
          if (sGroup.id) {
            sGroupAbbr = sGroup.abbr || "";
            skuCode += sGroupAbbr;
          }
          this.service.sku = skuCode;
          // if (this.product.name) {
          //     this.product.sku =
          //         skuCode + this.product.name.toString().substring(0, 3);
          // }
        }, 10);
      });
    },
    async loadUOM() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          uomHandler
            .get()
            .then((res) => {
              this.showLoading = false;
              this.uom = res;
              if (this.uom.length > 0) {
                this.mUOM = this.uom[3];
                // this.mPurchaseUOM = this.uom[0];
              }
            })
            .catch(() => {
              this.showLoading = false;
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
    async loadTax() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          settingHandler.get().then((res) => {
            this.showLoading = false;
            this.tax = res;
            let st = this.tax.filter(
              (m) => m.taxType.typeId === 8 && m.transactionType === "Sale"
            ); //specific tax
            this.specificTax = st; // special tax

            let vAT = this.tax.filter(
              (m) => m.taxType.typeId === 1 && m.transactionType === "Sale"
            ); // valuable tax
            this.vat = vAT; // valuable tax

            let otTax = this.tax.filter(
              (m) => m.taxType.typeId === 7 && m.transactionType === "Sale"
            ); // Other tax
            this.otherTax = otTax; // valuable tax

            this.purchaseTax = this.tax.filter(
              (m) => m.taxType.typeId === 1 && m.transactionType === "Purchase"
            ); // valuable tax
            // this.mPurchaseTax = purchaseTax // valuable tax

            if (this.specificTax.length > 0) {
              this.mSpecificTax = this.specificTax[0];
            }
            if (this.vat.length > 0) {
              this.defaultTax = this.vat[0];
            }
            if (this.otherTax.length > 0) {
              this.mOtherTax = this.otherTax[0];
            }
            if (this.purchaseTax.length > 0) {
              this.mPurchaseTax = this.purchaseTax[0];
            }
          });
        }, 10);
      });
    },
    async loadSingleService() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          this.group = this.groups || [];
          this.subGroup = this.subGroups || [];
          serviceItemHandler.getOne(this.$route.params.id).then(async (res) => {
            this.showLoading = false;
            this.service = res;
            if (this.service.id !== undefined) {
              this.mCategory = this.service.category;
              await this.loadGroup();
              this.mGroup = this.service.group;
              await this.loadSubGroup(this.mGroup);
              this.mSubGroup = this.service.subGroup;
              this.mUOM = this.service.uom;
              // this.mPurchaseUOM = this.service.purchaseUOM;
              this.mAccCostOfGoodSold = this.service.costOfGoodsSoldAcc;
              // this.mAccInventory = this.service.inventoryAccount;
              this.mIncomeAcc = this.service.incomeAcc;
              this.mSpecificTax = this.service.specificTax;
              this.mOtherTax = this.service.otherTax;
              this.defaultTax = this.service.defaultTax;
              this.mPurchaseTax = this.service.purchaseTax;
              this.mWareHouse = this.service.warehouse;
              this.src = "";
              if (this.service.hasOwnProperty("images")) {
                let imgUrl = "";
                if (this.service.images.hasOwnProperty("default")) {
                  imgUrl = this.service.images.default.thumb;
                  this.src =
                    "https://s3-ap-southeast-1.amazonaws.com/images.banhji/" +
                    imgUrl;
                }
              }

              if (this.$route.query.type === "new") {
                this.src = "";
              }
            }
          });
        }, 10);
      });
    },
    async initData() {
      if (this.$route.params.id !== undefined) {
        await this.loadSingleService();
      }
    },
  },
  mounted: async function () {
    await this.loadUOM();
    await this.loadWareHouses();
    await this.loadTax();
    await this.initData();
    await this.loadCategory();
    await this.loadGroup();
    await this.loadPriceLevel();
  },
  computed: {
    amountType() {
      const priceLevel = this.service.priceLevel || {};
      if (priceLevel) {
        const currency = priceLevel.currency || {};
        const type = priceLevel.type || {};
        const name = type.name || "";
        const code = currency.code || "";
        let strValue = "";
        if (name === "Percentage Base") {
          strValue = "%";
        } else if (name === "Standard") {
          strValue = code || "";
        }
        return strValue;
      } else {
        return "";
      }
    },
    hiddenButton() {
      if (this.$route.query.type == "edit") {
        return true;
      } else {
        return false;
      }
    },
  },
  created: async function () {
    await this.loadAccount();
  },
  watch: {
    id() {
      // window.console.log(this.id, "watch");
      if (this.id !== undefined) {
        this.loadCategory();
        this.loadGroup();
        this.loadSubGroup();
        this.loadSingleService();
      }
    },
  },
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

.my_checkbox input[type="checkbox"] + label {
  display: grid;
  grid-template-columns: 20% 80%;
  margin: 0.2em 0px;
  cursor: pointer;
  line-height: 16px;
  padding: 0.2em;
}
</style>
