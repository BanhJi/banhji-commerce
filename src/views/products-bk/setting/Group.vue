<template>
  <v-row>
    <v-col sm="10" cols="12" class="pt-0">
      <h2 class="mb-0 font_20">{{ $t("product_group") }}</h2>

      <p class="mb-0">{{ $t("group_desc") }}</p>
    </v-col>
    <v-col sm="2" cols="12" class="pt-0">
      <v-dialog v-model="dialogM2" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            class="text-capitalize white--text float-right"
            v-on="on"
            @click="onNewClick"
          >
            {{ $t("create_new") }}
          </v-btn>
        </template>
        <v-card>
          <div class="modal_header">
            <v-card-title>{{ $t("group") }}</v-card-title>
            <v-icon class="btn_close" @click="dialogM2 = false">close</v-icon>
          </div>
          <v-card-text class="modal_text_content">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col sm="12" cols="12" class="pb-0">
                  <label class="label">{{ $t("name") }}</label>
                  <v-text-field
                    class="mt-1"
                    outlined
                    :rules="[
                      (v) => !!v || $t('name_is_required'),
                      (v) => (v && v.length > 2) || $t('character_3'),
                    ]"
                    required
                    placeholder=""
                    v-model="name"
                  />
                </v-col>
                <v-col sm="12" cols="12" class="py-0">
                  <v-row>
                    <v-col sm="4" cols="4" class="pt-0">
                      <label class="label">{{ $t("abbreviation") }}</label>
                      <v-text-field
                        class="mt-1"
                        outlined
                        tage="Abbreviation"
                        :rules="[(v) => !!v || $t('abb_is_required')]"
                        required
                        placeholder=""
                        v-model="abbr"
                      />
                    </v-col>
                    <v-col sm="8" cols="8" class="pt-0">
                      <label class="label">{{ $t("category") }}</label>
                      <v-select
                        :loading="loading"
                        class="mt-1"
                        tag="category"
                        v-model="mCategory"
                        :items="categories"
                        item-value="id"
                        item-text="name"
                        :rules="[(v) => !!v || $t('type_is_required')]"
                        required
                        return-object
                        outlined
                      />
                    </v-col>
                  </v-row>
                  <v-row class="mt-0">
                    <v-col sm="12" cols="12" class="py-0">
                      <label class="label">{{ $t("color") }}</label>
                      <v-row>
                        <v-col class="py-1">
                          <kendo-colorpalette
                            class="mt-1"
                            v-model="colorPick"
                            id="colorPickGroupDS"
                            :change="onGetColor"
                            :palette="palette"
                            :tile-size="40"
                          />
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col class="pt-0">
                      <h2 class="mb-0 font_20 width_100">
                        {{ $t("default_image") }}
                      </h2>
                      <v-row>
                        <v-col sm="6" cols="12" lass="pt-0">
                          <p class="color_grey font_14">
                            {{ $t("add_funct_prod_variant_desc3") }}
                          </p>
                          <v-btn
                            class="float-left btn_cancel"
                            @click="handleUpload"
                          >
                            {{ $t("upload") }}
                          </v-btn>
                        </v-col>
                        <v-col v-if="src !== ''" sm="6" cols="12" class="py-0">
                          <v-img width="150px" height="150px" :src="src" />
                        </v-col>
                        <v-col sm="6" cols="12">
                          <label>
                            <input
                              hidden
                              type="file"
                              name="image"
                              id="image"
                              :rules="fileSizeRules"
                              accept=".png, .jpg, .jpeg"
                              ref="fileupload"
                              @change="onFileChange"
                            />
                          </label>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-divider />
          <v-card-actions class="modal_footer">
            <v-row>
              <v-col sm="6" cols="6" class="py-0 text-left">
                <v-btn
                  color="black"
                  outlined
                  class="text-capitalize black--text float-left"
                  @click="dialogM2 = false"
                  >{{ $t("cancel") }}
                </v-btn>
              </v-col>
              <v-col sm="6" cols="6" class="py-0 text-right">
                <v-btn
                  color="primary"
                  class="px-3 white--text text-capitalize"
                  :disabled="btnDisabled"
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

    <v-col sm="12" cols="12">
      <template>
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          :myLoading="true"
          type="loading"
        />
        <kendo-datasource ref="gridGroupDS" :data="groupList" />
        <kendo-grid
          id="gridProductGroup"
          class="grid-function"
          :data-source-ref="'gridGroupDS'"
          :editable="false"
          :toolbar="toolbarTemplate"
          :excel-export="excelExport"
          :excel-file-name="'ProductGroupList.xlsx'"
          :excel-filterable="true"
          :scrollable-virtual="true"
        >
          <kendo-grid-column
            :field="'no'"
            :title="$t('no')"
            :template="rowNumberTmpl"
            :width="40"
            :column-menu="false"
            :headerAttributes="{
              style: 'background-color: #EDF1F5;',
              class: 'text-center',
            }"
            :attributes="{ style: 'text-align: center' }"
          />
          <kendo-grid-column
            :field="'abbr'"
            :title="$t('abbr')"
            :width="50"
            :template="'<span>#=abbr#</span>'"
            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
          />
          <kendo-grid-column
            :field="'color'"
            :title="$t('color')"
            :width="50"
            :template="'<div><span style=background-color:#=color#>#=color#</span></div>'"
            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
          />
          <kendo-grid-column
            :field="'name'"
            :attributes="{ class: 'tb_name_td' }"
            :title="$t('name')"
            :width="90"
            :template="'<span>#=name#</span>'"
            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
          />
          <kendo-grid-column
            :field="'category'"
            :title="$t('category')"
            :width="100"
            :template="'<span>#=category.name#</span>'"
            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
          />
          <kendo-grid-column
            :field="''"
            :title="$t('action')"
            :width="70"
            :command="[
              { iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit },
            ]"
            :headerAttributes="{
              style: 'text-align: left; background-color: #EDF1F5',
            }"
          />
        </kendo-grid>
      </template>
    </v-col>
    <div style="overflow: auto" class="group-list"></div>
  </v-row>
</template>

<script>
import { ColorPalette } from "@progress/kendo-inputs-vue-wrapper";
import kendo from "@progress/kendo-ui";

const categoryHandler = require("@/scripts/categoryHandler");
const groupHandler = require("@/scripts/groupHandler");
const $ = kendo.jQuery;
import JSZip from "jszip";

window.JSZip = JSZip;
export default {
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "kendo-colorpalette": ColorPalette,
  },
  data: () => ({
    palette: [
      "#E6A044",
      "#EBE4E4",
      "#D42E21",
      "#000",
      "#242A34",
      "#9FCC63",
      "#519D36",
    ],
    fileSizeRules: [
      (files) =>
        !files ||
        !files.some((file) => file.size > 1024 * 1024) ||
        "Image size should be less than 1 MB!",
    ],
    src: "",
    dialogM2: false,
    showLoading: true,
    valid: true,
    categories: [],
    mCategory: "",
    name: "",
    abbr: "",
    groupId: "",
    groups: [],
    grpCatTypeId: "",
    colorPick: "#9FCC63",
    imgFile: "",
    image: "",
    loading: true,
    btnDisabled: false,

    txnGroupList: [],
    groupList: [],
    totalVariantBal: 0,
    toalgroupPerPage: 0,
    paging: {},
    action: "",
    params: {},
    coa: [],
  }),
  props: {},
  computed: {},
  watch: {
    dialogm2(val) {
      val || this.close();
    },
  },
  created() {},
  methods: {
    onGetColor() {
      let grid = kendo.jQuery("#colorPickGroupDS").data("kendoColorPalette");
      this.colorPick = grid.value();
    },
    handleUpload() {
      this.$refs["fileupload"].click();
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
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.gridGroupDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    goEdit(e) {
      //   this.loadCategory();
      e.preventDefault();
      let grid = kendo.jQuery("#gridProductGroup").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.name = dataItem.name;
      this.abbr = dataItem.abbr;
      this.type = "edit";
      const category = dataItem.category || {};
      this.groupId = dataItem.id;
      this.grpCatTypeId = category.id || "";
      this.image = dataItem.img || "";
      this.src =
        "https://s3-ap-southeast-1.amazonaws.com/images.banhji/" +
          dataItem.img || "";
      //   if (dataItem.img) {
      //     if (dataItem.img.hasOwnProperty("default")) {
      //       this.src =
      //         "https://s3-ap-southeast-1.amazonaws.com/images.banhji/" +
      //         dataItem.img.default.bigThumb;
      //     } else {
      //       this.src = "";
      //     }
      //   }
      window.console.log("mCategory", this.mCategory, this.categories);
      this.colorPick = dataItem.color;
      this.mCategory = this.categories.filter(
        (k) => k.id === (category.id || "")
      )[0];
      this.dialogM2 = true;
    },
    // async onEditClick(value) {
    //     new Promise(resolve => {
    //         setTimeout(() => {
    //             resolve('resolved');
    //             this.name = value.name
    //             this.abbr = value.abbr
    //             this.mCategory = value.category
    //             this.groupId = value.id
    //             this.grpCatTypeId = value.category.id
    //             this.dialogM2 = true
    //         }, 300);
    //     })
    // },
    onNewClick() {
      this.btnDisabled = false;
      this.groupId = "";
      this.clear();
      this.loadCategory();
    },
    close() {
      this.dialogM2 = false;
    },
    clear() {
      this.name = "";
      this.abbr = "";
      //   this.mCategory = {};
      this.imgFile = null;
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
            id: this.groupId ? this.groupId : "",
            abbr: this.abbr,
            name: this.name,
            img: this.imgFile,
            color: this.colorPick,
            category: this.mCategory,
            image: this.image,
          };
          this.btnDisabled = true;
          this.showLoading = true;
          groupHandler
            .create(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                this.dialogM2 = false;
                this.btnDisabled = false;
                this.showLoading = false;
                this.onSearch()
                this.clear();
                this.close();
                this.$refs.form.reset();
              } else {
                this.btnDisabled = false;
                this.showLoading = false;
              }
            })
            .catch((e) => {
              this.btnDisabled = false;
              this.showLoading = false;
              this.errors.push(e);
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
            this.categories = res.data.data; //filter((o) => o.type.name === "Product");
            this.loading = false;
          });
        }, 10);
      });
    },
    // async loadGroup() {
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("resolved");
    //       this.showLoading = true;
    //       groupHandler.get().then((res) => {
    //         this.showLoading = false;
    //         this.groups = res.filter((o) => o.category.type.name === "Product");
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
        "</span>" +
        "<span>" +
        '<a class="k-pager-refresh k-link k-button reload" title="Refresh"><span class="k-icon k-i-reload"></span> Refresh </a>' +
        "</span>";

      return kendo.template(templateHtml);
    },
    exportToExcel() {
      const grid = $("#gridProductGroup").data("kendoGrid");
      grid.saveAsExcel();
    },
    excelExport: function (e) {
      // const pivot = this.$refs.gridTransactionDS.kendoWidget()
      // pivot.saveAsExcel()
      window.console.log(e.data);
    },
    initToolbar(that) {
      let grid = $("#gridProductGroup").data("kendoGrid");
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
        that.onSearch();
      }

      function onExportExcel(that) {
        that.exportToExcel();
      }
    },
    async loadPage(that) {
      $(".group-list").html(`
                <span class="mt-2 prod-group-list-item-returned">0</span><br/>
                <div style="display: flex; flex-direction: 'row'">
                    <button class="prod-group-list-next-page" title="previous" style="width: 24px; font-size: 19px; margin-top: -6px;"> < </button>
                    <ul class="prod-group-list-page-number page_scroll" style="display: flex;list-style: none; padding-left: 0px;">
                        <li style="padding: 6px; padding-bottom: 0px;"  data-page="1" class="prod-group-list-page-link text-bold-link" >1</li>
                    </ul>
                    <button class="prod-group-list-next-page" title="next" style="width: 24px; font-size: 19px;margin-top: -6px;"> > </button>
                </div>
            `);
      $(document).on("click", ".prod-group-list-page-link", function () {
        const page = $(this).data("page");
        $(".prod-group-list-page-link").removeClass("text-bold-link");
        $(this).addClass("text-bold-link");
        that.backToPage(that, page - 1);
        window.console.log(page - 1);
      });
      // $(document).on('click', '.bycus-next-page', function () {
      $(".prod-group-list-next-page").click(function () {
        const page_number = $(this)
          .parent()
          .children(".prod-group-list-page-number")
          .find("li")
          .last()
          .data("page");
        window.console.log("prod-group-list-page_number", page_number);
        const isPrevious = $(this).attr("title");
        if (isPrevious == "previous") {
          const currectpage = $(".text-bold-link").data("page");

          if (currectpage == 1) {
            return;
          }
          $(".prod-group-list-page-link").removeClass("text-bold-link");
          $(`.prod-group-list-page-link:eq(${currectpage - 1})`).addClass(
            "text-bold-link"
          );
          that.backToPage(that, currectpage - 2);
          window.console.log("this currectpage back", currectpage - 2);
        } else {
          $(".prod-group-list-page-link").removeClass("text-bold-link");
          that.loadGroupCategory(that.search);
          $(this)
            .parent()
            .children(".prod-group-list-page-number")
            .append(
              `<li class="prod-group-list-page-link text-bold-link" style="padding: 6px; padding-bottom: 0px;" data-page="${
                page_number + 1
              }">${page_number + 1}</li>`
            );
        }
        window.console.log("this", page_number + 1);
      });
    },
    itemRetuned(that) {
      let totalRow = 0;
      that.txnGroupList.forEach((k) => {
        totalRow += k.length;
      });
      $(".prod-group-list-item-returned").text(
        "Items returned (" + totalRow + ")"
      );
    },
    disabledNextPage(value) {
      $(".prod-group-list-next-page").prop("disabled", value);
    },
    backToPage(that, index) {
      try {
        const byProduct = that.txnGroupList.at(index);
        that.groupList = byProduct;
        // that.refreshGridData(customer)
        window.console.log("that.txnGroupList[index]", byProduct);
      } catch (e) {
        window.console.log("ERROR on backToPage", index);
      }
    },
    onSearch() {
      this.txnGroupList = [];
      this.groupList = [];
      this.loadPage(this);
      this.paging = {};
      this.loadCategory();
      this.loadGroupCategory();
    },
    async loadGroupCategory() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.groupList = [];
          this.params = {
            key: this.paging,
            pattern: "grp#Product",
          };
          this.showLoading = true;
          this.disabledNextPage(true);
          groupHandler.getv2(this.params).then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const responseData = res.data.data || [];
              const total = res.data.total || 0;
              this.showLoading = false;
              this.groupList = responseData;
              this.paging = res.data.key;
              window.console.log("key", res.data.key);
              this.txnGroupList.push(responseData);

              this.toalgroupPerPage = this.groupList.length;
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
  mounted: async function () {
    await this.loadCategory();
    await this.loadGroupCategory();
    await this.initToolbar(this);
    this.loadPage(this);
    this.itemRetuned(this);
    this.disabledNextPage(true);
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

.v-text-field__details {
  margin-bottom: 8px;
  margin-top: 4px !important;
}

@media (max-width: 576px) {
}
</style>
