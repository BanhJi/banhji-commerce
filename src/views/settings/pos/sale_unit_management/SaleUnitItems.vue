<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="8" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t("sale_unit_items") }}</h2>
          </v-col>
          <v-col sm="2" cols="12" class="pt-0 pr-0">
            <v-dialog v-model="dialogM3" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  class=" white--text float-right text-capitalize"
                  v-on="on"
                  @click="newClick"
                >
                  {{ $t("new_sale_unit") }}
                </v-btn>
              </template>
              <v-card>
                <div class="modal_header">
                  <v-card-title>{{ $t("sale_unit") }}</v-card-title>
                  <v-icon @click="dialogM3 = false">close</v-icon>
                </div>

                <v-card-text class="modal_text_content">
                  <v-row>
                    <v-col sm="6" cols="12" class="pb-0">
                      <label>{{ $t("categories") }}</label>
                      <v-select
                        class="mt-1"
                        outlined
                        tage="Categories"
                        v-model="mCategories"
                        :items="categories"
                        item-value="id"
                        item-text="name"
                        return-object
                        clearable
                      />

                      <label>{{ $t("code") }}</label>
                      <v-text-field
                        class="mt-1"
                        v-model="saleUnitItem.code"
                        outlined
                        clearable
                      />
                    </v-col>
                    <v-col sm="6" cols="12" class="pb-0">
                      <label class="label">{{ $t("name") }}</label>
                      <v-text-field
                        class="mt-1"
                        v-model="saleUnitItem.name"
                        outlined
                        clearable
                      />

                      <label>{{ $t("description") }}</label>
                      <v-textarea
                        rows="4"
                        class="mt-1"
                        no-resize
                        height="70px"
                        tage="Description"
                        v-model="saleUnitItem.description"
                        outlined
                        clearable
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions class="modal_footer">
                  <v-row>
                    <v-col sm="6" cols="6" class="py-0 text-left">
                      <v-btn
                        color="black"
                        outlined
                        class=" text-capitalize  black--text float-left"
                        @click="dialogM3 = false"
                        >{{ $t("cancel") }}
                      </v-btn>
                    </v-col>
                    <v-col sm="6" cols="6" class="py-0 text-right">
                      <v-btn
                        color="primary"
                        :disabled="btnDisabled"
                        class="px-3  white--text text-capitalize"
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
          <v-col sm="2" cols="12" class="pt-0 pl-0">
            <v-dialog v-model="dialogM2" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn
                  outlined
                  class="secondary--text mx-3 capitalize float-right"
                  color="primary"
                  v-on="on"
                  @click="importShow"
                >
                  {{ $t("import") }}
                </v-btn>
              </template>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card>
                  <v-card-title>{{ $t("import_sale_unit") }}</v-card-title>
                  <v-icon class="btn_close" @click="dialogM2 = false"
                    >close</v-icon
                  >
                  <v-divider />
                  <v-card-text
                    style="background-color: #EDF1F5; color: #333333;"
                  >
                    <v-row>
                      <v-col sm="12" cols="12" class="pb-0">
                        <v-row>
                          <v-col sm="6" cols="6" class="pb-0">
                            <upload-excel-component
                              :on-success="handleSuccess"
                              :before-upload="beforeUpload"
                            />
                          </v-col>
                          <v-col sm="6" cols="6" class="pb-0">
                            <v-btn
                              outlined
                              class="secondary--text  capitalize float-right"
                              href="/files/member.xlsx"
                              download
                            >
                              <span class="">{{ $t("download_file") }}</span>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider />
                  <v-col sm="12" cols="12" class="py-0">
                    <v-card-actions class="pa-4">
                      <v-row>
                        <v-col sm="6" cols="6" class="py-0 pl-0">
                          <v-btn
                            color="black"
                            outlined
                            class=" text-capitalize black--text float-left"
                            @click="dialogM2 = false"
                            >{{ $t("cancel") }}
                          </v-btn>
                        </v-col>
                        <v-col sm="6" cols="6" class="py-0 pr-0">
                          <v-btn
                            color="secondary"
                            class="px-3  white--text text-capitalize float-right"
                            @click="saveImport"
                          >
                            {{ $t("save_close") }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-actions>
                  </v-col>
                </v-card>
              </v-form>
            </v-dialog>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="12" cols="12">
            <LoadingMe
              :isLoading="showLoading"
              :fullPage="false"
              type="loading"
              :myLoading="true"
            />
            <template>
              <kendo-datasource
                ref="gridSaleUnitItemDS"
                :data="saleUnitItemList"
              />
              <kendo-grid
                id="gridSaleUnitItem"
                class="grid-function"
                :data-source-ref="'gridSaleUnitItemDS'"
                :editable="false"
                :toolbar="toolbarTemplate"
                :excel-export="excelExport"
                :excel-file-name="'SaleUnitItemList.xlsx'"
                :excel-filterable="true"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'no'"
                  :title="$t('no')"
                  :template="rowNumberTmpl"
                  :width="80"
                  :column-menu="false"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;',
                    class: 'text-center',
                  }"
                  :attributes="{ style: 'text-align: center' }"
                />
                <kendo-grid-column
                  :field="'code'"
                  :title="$t('code')"
                  :width="80"
                  :template="'<span>#=code#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'name'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('name')"
                  :width="60"
                  :template="'<span>#=name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'category'"
                  :title="$t('categories')"
                  :width="100"
                  :template="'<span>#=category.name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'description'"
                  :title="$t('description')"
                  :width="100"
                  :template="'<span>#=description#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="''"
                  :title="$t('action')"
                  :width="70"
                  :command="[
                    {
                      iconClass: 'k-icon k-i-edit',
                      text: 'Edit',
                      click: goEdit,
                    },
                  ]"
                  :headerAttributes="{
                    style: 'text-align: right; background-color: #EDF1F5',
                  }"
                />
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import SaleUnitItemModel from "@/scripts/model/SaleUnitItems";

const $ = kendo.jQuery;
import kendo from "@progress/kendo-ui";
import customerHandler from "@/scripts/customerHandler";

const saleUnitItemHandler = require("@/scripts/saleUnitItemHandler");
const saleUnitItemModel = new SaleUnitItemModel({});
const saleUCHandler = require("@/scripts/saleUCHandler");
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
import UploadExcelComponent from "@/components/upload_excel/TimeCard.vue";

import JSZip from "jszip";

window.JSZip = JSZip;

export default {
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "upload-excel-component": UploadExcelComponent,
  },
  data: () => ({
    showLoading: false,
    dialogM3: false,
    dialogM2: false,
    saleUnitItemList: [],
    categories: [],
    mCategories: {},
    saleUnitItem: saleUnitItemModel,
    schemaDefinition: {
      model: {
        id: "id",
      },
    },
    loggedUser: {
      id: cookie.creator,
      name: cookie.email,
    },
    valid: false,
    btnDisabled: false,
  }),
  props: {},
  methods: {
    importShow() {},
    saveImport() {
      if (this.tableData.length > 0) {
        let data = {
          data: this.tableData,
        };
        this.showLoading = true;
        window.console.log(data, "here data");
        customerHandler
          .importSaleUnitCreate(data)
          .then((response) => {
            this.showLoading = false;
            if (response.data.statusCode === 201) {
              this.$refs.form.reset();
              this.$snotify.success("Successfully");
              this.dialogM2 = false;
            }
          })
          .catch((e) => {
            this.showLoading = false;
            this.$snotify.error("Something went wrong");
            this.errors.push(e);
          });
      }
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
        const c = this.categories.filter((obj) => {
          return obj.name == element.category;
        });
        if (c.length > 0) {
          element.category = c[0];
        } else {
          this.$snotify.error("category not found!");
          return;
        }
        element.loggedUser = this.loggedUser;
        element.saveOption = "imported";
      });
      this.tableData = results;
      this.tableHeader = header;
      window.console.log(this.tableData, this.tableHeader, "dataaaaa");
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.gridSaleUnitItemDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    async loadCategory() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          saleUCHandler.get().then((res) => {
            this.showLoading = false;
            this.categories = res;
            if (this.categories.length > 0) {
              this.mCategories = this.categories[0];
            }
          });
        }, 300);
      });
    },
    cancel() {
      this.dialogM3 = false;
    },
    close() {
      this.dialogM3 = false;
    },
    async newClick() {
      this.btnDisabled = false;
      await this.loadCategory();
      this.saleUnitItem = {};
      this.mCategories = {};
      this.dialogM3 = true;
    },
    goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridSaleUnitItem").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.saleUnitItem = dataItem;
      this.mCategories = dataItem.category;
      this.dialogM3 = true;
    },
    async onSaveClose() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const cat = this.mCategories || {};
          const category = {
            id: cat.id || "",
            name: cat.name || "",
            code: cat.code || "",
          };
          let data = {
            id: this.saleUnitItem.id,
            name: this.saleUnitItem.name,
            code: this.saleUnitItem.code,
            description: this.saleUnitItem.description,
            category: category,
            status: 1,
            type: this.saleUnitItem.id ? "edit" : "new",
          };
          this.btnDisabled = true;
          this.showLoading = true;
          saleUnitItemHandler
            .create(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                this.btnDisabled = false;
                this.showLoading = false;
                this.loadSaleUnitItems();
                this.$snotify.success("Success");
                this.close();
              } else {
                this.btnDisabled = false;
                this.showLoading = false;
              }
            })
            .catch((e) => {
              this.btnDisabled = false;
              this.showLoading = false;
              this.$snotify.error("Something went wrong");
              this.errors.push(e);
            });
        });
      });
    },
    async loadSaleUnitItems() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          saleUnitItemHandler.list().then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.saleUnitItemList = res.data.data;
            } else {
              this.showLoading = false;
            }
          });
        }, 10);
      });
    },

    toolbarTemplate: function() {
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
    exportToExcel() {
      const grid = $("#gridSaleUnitItem").data("kendoGrid");
      grid.saveAsExcel();
    },
    excelExport: function(e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridSaleUnitItem").data("kendoGrid");
      let gridElement = grid.element;
      let toolbarElement = gridElement.find(".k-grid-toolbar");
      toolbarElement.on("click", ".k-pager-refresh", function(e) {
        e.preventDefault();
        onReloadData(that);
      });
      toolbarElement.on("click", ".k-pager-excel", function(e) {
        e.preventDefault();
        onExportExcel(that);
      });

      function onReloadData(that) {
        that.loadSaleUnitItems();
      }

      function onExportExcel(that) {
        that.exportToExcel();
      }
    },
  },
  mounted: async function() {
    await this.loadSaleUnitItems();
    await this.initToolbar(this);
  },
  created: async function() {
    await this.loadCategory();
  },
  computed: {},
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
