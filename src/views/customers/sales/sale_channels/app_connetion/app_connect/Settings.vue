<template>
  <v-row>
    <v-col sm="12" cols="12" class="py-0">
      <h1 class="primary--text niradie_heavy">{{ $t(types) }}</h1>
    </v-col>
    <v-col cols="12" class="mt-1">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row style="background-color: #fff">
          <v-col sm="4" cols="12" class="pt-4 pb-0 px-4">
            <label>{{ $t("customer_type") }}</label>
            <v-select
              :items="customerTypes"
              item-value="id"
              item-text="name"
              class="mt-1"
              v-model="mCustomerType"
              @change="changeCustomerTyep"
              return-object
              :placeholder="$t('type')"
              :rules="[(v) => !!v || $t('is_required')]"
              clearable
              outlined
            />
          </v-col>
          <v-col sm="4" cols="12" class="pt-4 pb-0 px-4">
            <label>{{ $t("segment") }}</label>
            <app-segment-dropdownlist
              :initSegment="segment"
              @emitSegment="segment = $event"
            />
          </v-col>
          <v-col sm="4" cols="12" class="pt-4 pb-0 px-4">
            <label class="label mb-0">{{ $t("term") }}</label>
            <v-select
              class="mt-1"
              v-model="paymentTerm"
              :items="paymentTerms"
              placeholder="Term"
              :rules="[(v) => !!v['id'] || $t('is required!')]"
              item-text="name"
              item-value="id"
              return-object
              outlined
            />
          </v-col>
          <v-col sm="4" cols="12" class="pt-0 pb-0 px-4">
            <label class="label font_14">{{ $t("sale_channel") }}</label>
            <v-select
              class="mt-1"
              v-model="saleChannel"
              :items="saleChannelList"
              item-value="id"
              item-text="name"
              return-object
              :rules="[(v) => !!v || $t('is_required')]"
              tage="Sale Channel"
              placeholder="Channel"
              outlined
            />
          </v-col>
          <!-- <v-col sm="4" cols="12" class="pt-0 pb-0 px-4">

                              </v-col> -->
          <v-col sm="12" cols="12" class="pt-0 pb-0 px-4">
            <h2 class="font_18">{{ $t("items") }}</h2>
            <kendo-datasource
              ref="itemLineDSAppConnect"
              :data="itemLines"
              @change="dataSourceChangedApp"
            />
            <kendo-grid
              id="itemLineDSAppConnect"
              class="grid-function"
              :data-source-ref="'itemLineDSAppConnect'"
              :sortable="false"
              :column-menu="false"
              :editable="true"
              :scrollable-virtual="true"
            >
              <kendo-grid-column
                :command="{
                  iconClass: 'k-icon k-i-trash',
                  text: ' ',
                  click: removeRow,
                  className: 'btn-plus isEditable',
                }"
                :title="''"
                :width="36"
                :headerAttributes="{
                  style: 'text-align: left; background-color: #EDF1F5',
                }"
              />
              <kendo-grid-column
                :title="$t('no.')"
                :width="40"
                :column-menu="false"
                :template="rowNumberTmpl"
                :headerAttributes="{
                  style: 'background-color: #EDF1F5;',
                  class: 'text-products',
                }"
                :attributes="{ style: 'text-align: products' }"
              />

              <kendo-grid-column
                :field="'item'"
                :title="$t('banhji_item')"
                :template="itemTemplate"
                :editor="ItemDropDownEditor"
                :attributes="{ class: 'tb_name_td isEditable' }"
                :editable="isDisableUpdate"
                :width="200"
                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
              />
              <kendo-grid-column
                :field="'uom'"
                :title="$t('uom')"
                :width="120"
                :template="UOMTemplate"
                :editor="UOMDropDownEditor"
                :headerAttributes="{
                  style: 'text-align: left; background-color: #EDF1F5',
                }"
                :attributes="{ style: 'text-align: left' }"
              />
              <kendo-grid-column
                :field="'itemPartner'"
                :title="$t('partner_item')"
                :template="itemTemplatePartner"
                :editor="ItemDropDownEditorConnector"
                :editable="isDisableUpdate"
                :attributes="{ class: 'tb_name_td isEditable' }"
                :width="200"
                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
              />
            </kendo-grid>
            <v-btn color="primary" class="btn_plus my-2 mr-2" @click="addRow">
              <v-icon size="" class="ma-1">mdi-plus</v-icon>
            </v-btn>
            <div>
              <h2 class="font_18 mt-3">{{ $t("location") }}</h2>
            </div>
            <kendo-datasource
              ref="itemLineDSAppConnectLocation"
              :data="itemLinesLocation"
              @change="dataSourceChangedApp"
            />
            <kendo-grid
              id="itemLineDSAppConnectLocation"
              class="grid-function"
              :data-source-ref="'itemLineDSAppConnectLocation'"
              :sortable="false"
              :column-menu="false"
              :editable="true"
              :scrollable-virtual="true"
            >
              <kendo-grid-column
                :command="{
                  iconClass: 'k-icon k-i-trash',
                  text: ' ',
                  click: removeRowLocation,
                  className: 'btn-plus isEditable',
                }"
                :title="''"
                :width="35"
                :headerAttributes="{
                  style: 'text-align: left; background-color: #EDF1F5',
                }"
              />
              <kendo-grid-column
                :title="$t('no.')"
                :width="40"
                :column-menu="false"
                :template="rowNumberTmplLocation"
                :headerAttributes="{
                  style: 'background-color: #EDF1F5;',
                  class: 'text-products',
                }"
                :attributes="{ style: 'text-align: products' }"
              />

              <kendo-grid-column
                :field="'location'"
                :title="$t('banhji_business_unit')"
                :editable="isEditableLocation"
                :template="itemTemplateLocation"
                :editor="ItemDropDownEditorLocation"
                :attributes="{ class: 'tb_name_td isEditable' }"
                :width="200"
                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
              />
              <kendo-grid-column
                :field="'locationPartner'"
                :title="$t('partner_business_unit')"
                :template="LocationTemplatePartner"
                :editor="ItemDropDownEditorDepartment"
                :editable="isEditableLocation"
                :attributes="{ class: 'tb_name_td isEditable' }"
                :width="200"
                :headerAttributes="{ style: 'background-color: #EDF1F5' }"
              />
            </kendo-grid>
            <v-btn
              color="primary"
              class="float-left btn_plus my-2 mr-2"
              @click="addRow2"
            >
              <v-icon size="" class="ma-1">mdi-plus</v-icon>
            </v-btn>
          </v-col>

          <v-col sm="12" cols="12" class="pt-2">
            <v-btn
              color="primary"
              class="float-right ml-0 mr-2"
              @click="saveClose"
            >
              {{ $t("save_close") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <p class="text-center privacy mb-0 mt-10">
        <v-icon size="13" class="third--text mr-2 black--text">mdi-key</v-icon>
        {{ $t("at_banhJi_the_privacy") }}
      </p>
    </v-col>
    <LoadingMe
      :isLoading="showLoading"
      :fullPage="false"
      :myLoading="true"
      type="loading"
    />
  </v-row>
</template>
<script>
import uomPriceHandler from "@/scripts/uomPriceHandler";

const appConnectionHandle = require("@/scripts/app-connection/handler/appConnectionHandle");
// const axios = require("axios");
const productVariantHandler = require("@/scripts/productVariantHandler");
import ItemLine from "@/scripts/app-connection/model/ItemLine";
import ItemLineLocation from "@/scripts/app-connection/model/ItemLineLocation";

const itemLineModel = new ItemLine({});
const ItemLineLocationModel = new ItemLineLocation({});
// import {uuid} from "vue-uuid";
import kendo from "@progress/kendo-ui";
import { SegmentModel } from "@/scripts/model/AppModels";

// const priceLevelHandler = require("@/scripts/priceLevelHandler");
const customerTypeHandler = require("@/scripts/customerTypeHandler");
const saleChannelHandler = require("@/scripts/saleChannelHandler");
const paymentTermHandler = require("@/scripts/settingsHandler");
const locationHandler = require("@/scripts/locationHandler");
import { i18n } from "@/i18n";
// import {mapState} from "vuex";

const $ = kendo.jQuery;

export default {
  props: ["authorize", "types"],
  data: () => ({
    showLoading: false,
    itemLine: itemLineModel,
    itemLines: [],
    itemLineLocation: ItemLineLocationModel,
    itemLinesLocation: [],
    priceLevel: {},
    partnerItem: [],
    customerTypes: [],
    mCustomerType: "",
    locations: [],
    segment: new SegmentModel(),
    saleChannel: "",
    saleChannelList: [],
    valid: true,
    isSuccess: false,
    paymentTerm: {},
    paymentTerms: [],
    departments: [],
    transactionDate: new Date().toJSON(),
    id: "",
  }),
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-segment-dropdownlist": () =>
      import("@/components/dropdownlist/Segment"),
  },
  methods: {
    changeCustomerTyep() {
      this.priceLevel = this.mCustomerType.priceLevel;
    },
    findDuplicates(values) {
      var valueArr = values.map(function (item) {
        return item.item.name;
      });
      var isDuplicate = valueArr.some(function (item, idx) {
        return valueArr.indexOf(item) != idx;
      });
      return isDuplicate;
    },
    findDuplicatesParter(values) {
      var valueArr = values.map(function (item) {
        return item.itemPartner.name_en;
      });
      var isDuplicate = valueArr.some(function (item, idx) {
        return valueArr.indexOf(item) != idx;
      });
      return isDuplicate;
    },
    findDuplicatesLocation(values) {
      var valueArr = values.map(function (item) {
        return item.location.name;
      });
      var isDuplicate = valueArr.some(function (item, idx) {
        return valueArr.indexOf(item) != idx;
      });
      return isDuplicate;
    },
    findDuplicatesLocationPartner(values) {
      var valueArr = values.map(function (item) {
        return item.locationPartner.name_en;
      });
      var isDuplicate = valueArr.some(function (item, idx) {
        return valueArr.indexOf(item) != idx;
      });
      return isDuplicate;
    },
    saveClose() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      let data = {};
      let ds = this.$refs.itemLineDSAppConnect.kendoWidget();
      let dsLocation = this.$refs.itemLineDSAppConnectLocation.kendoWidget();
      let itemLines = [];
      ds.data().forEach((i) => {
        if (i.isAddNew) {
          itemLines.push({
            item: i.item || {},
            uom: i.uom || {},
            itemPartner: i.itemPartner || {},
          });
        }
      });
      data.itemLines = itemLines;
      data.type = this.types;
      data.authorize = this.authorize;
      data.priceLevel = this.priceLevel;
      data.mCustomerType = this.mCustomerType;
      data.location = this.location;
      data.segment = this.segment;
      data.saleChannel = this.saleChannel;
      data.paymentTerm = this.paymentTerm;
      let locationItemLine = [];
      dsLocation.data().forEach((i) => {
        if (i.isAddNew) {
          locationItemLine.push({
            location: i.location,
            locationPartner: i.locationPartner,
          });
        }
      });

      data.itemLinesLocation = locationItemLine;
      let findDup = this.findDuplicates(itemLines);
      let findDupPartern = this.findDuplicatesParter(itemLines);
      let findDupLocation = this.findDuplicatesLocation(locationItemLine);
      let findDupLocationPartner =
        this.findDuplicatesLocationPartner(locationItemLine);
      if (
        findDup ||
        findDupPartern ||
        findDupLocation ||
        findDupLocationPartner
      ) {
        this.$swal({
          title: i18n.t("failed"),
          text: i18n.t("duplicates_item"),
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#4d4848",
          cancelButtonColor: "#ED1A3A",
          confirmButtonText: i18n.t("ok"),
        });
        return;
      }
      window.console.log("data",data);
      appConnectionHandle.add(data).then((res) => {
        if (res.msg === "successful") {
          this.$swal({
            title: i18n.t("successful"),
            text: i18n.t("data_record"),
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#4d4848",
            cancelButtonColor: "#ED1A3A",
            confirmButtonText: i18n.t("ok"),
          }).then((result) => {
            if (result.value) {
              this.$router.go(-1);
            }
          });
          this.$emit("finish");
        } else {
          this.$swal({
            title: i18n.t("failed"),
            text: i18n.t("sth_went_wrong_check_your"),
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#4d4848",
            cancelButtonColor: "#ED1A3A",
            confirmButtonText: i18n.t("ok"),
          });
          this.isSuccess = false;
        }
      });
    },
    async dataSourceChangedApp() {},
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.itemLineDSAppConnect.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    rowNumberTmplLocation(dataItem) {
      let ds = this.$refs.itemLineDSAppConnectLocation.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    addRow() {
      let ds = this.$refs.itemLineDSAppConnect.kendoWidget();
      let total = ds.total();
      this.itemLine.isAddNew = true;
      if (total < 36) {
        ds.insert(total, this.itemLine);
      }
    },
    addRow2() {
      let dsL = this.$refs.itemLineDSAppConnectLocation.kendoWidget();
      let totaldsL = dsL.total();
      this.itemLineLocation.isAddNew = true;
      if (totaldsL < 36) {
        dsL.insert(totaldsL, this.itemLineLocation);
      }
    },
    removeRow(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#itemLineDSAppConnect").data("kendoGrid");
      const dataSource = grid.dataSource;
      const dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      if (!dataItem.isAddNew) {
        this.$swal({
          title: i18n.t("warning"),
          text: i18n.t("do_you_delete"),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#4d4848",
          cancelButtonColor: "#ED1A3A",
          confirmButtonText: i18n.t("ok"),
        }).then((result) => {
          if (result.value) {
            let data_delete = {
              id: dataItem.itemPartner.id,
            };
            appConnectionHandle.deletItem(data_delete).then((res) => {
              if (res.status === 200) {
                this.$snotify.success(i18n.t("successful"));
              } else {
                this.$snotify.error(i18n.t("error_something_wrong"));
              }
            });
            dataSource.remove(dataItem);
          }
        });
      } else {
        if (dataSource.total() > 1) {
          dataSource.remove(dataItem);
        }
      }
    },
    removeRowLocation(e) {
      e.preventDefault();
      const grid = kendo
        .jQuery("#itemLineDSAppConnectLocation")
        .data("kendoGrid");
      let dataSource = grid.dataSource;
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      window.console.log(dataItem);
      if (!dataItem.isAddNew) {
        this.$swal({
          title: i18n.t("warning"),
          text: i18n.t("do_you_delete"),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#4d4848",
          cancelButtonColor: "#ED1A3A",
          confirmButtonText: i18n.t("ok"),
        }).then((result) => {
          if (result.value) {
            let data_delete = {
              id: dataItem.locationPartner.id,
            };
            appConnectionHandle.deletLocation(data_delete).then((res) => {
              if (res.status === 200) {
                this.$snotify.success(i18n.t("successful"));
              } else {
                this.$snotify.error(i18n.t("error_something_wrong"));
              }
            });
            dataSource.remove(dataItem);
          }
        });
      } else {
        if (dataSource.total() > 1) {
          dataSource.remove(dataItem);
        }
      }
    },
    itemTemplate(dataItem) {
      const item = dataItem.item;
      if (item) {
        return `<span>${item.name ? item.name : ``}</span>`;
      } else {
        return ``;
      }
    },
    isDisableUpdate(dataItem) {
      if (dataItem.isAddNew) {
        return true;
      }
      return false;
    },
    isEditableLocation(dataItem) {
      if (dataItem.isAddNew) {
        return true;
      }
      return false;
    },
    itemTemplateLocation(dataItem) {
      const item = dataItem.location;
      if (item) {
        return `<span>${item.name ? item.name : ``}</span>`;
      } else {
        return ``;
      }
    },
    itemTemplatePartner(dataItem) {
      const item = dataItem.itemPartner;
      if (item) {
        return `<span>${item.name_en ? item.name_en : ``}</span>`;
      } else {
        return ``;
      }
    },
    LocationTemplatePartner(dataItem) {
      const item = dataItem.locationPartner;
      if (item) {
        return `<span>${
          item.name_en ? item.name + "-" + item.name_en : ``
        }</span>`;
      } else {
        return ``;
      }
    },
    async loadPaymentTerm() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const strFilter = "?type=pmt-customer";
          paymentTermHandler.getPaymentTerm(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.paymentTerms = res.data.data;
            }
          });
        }, 10);
      });
    },
    async loadCustomerType() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          customerTypeHandler.get().then((res) => {
            this.customerTypes = res;
          });
        }, 100);
      });
    },
    ItemDropDownEditor(container, options) {
      kendo
        .jQuery('<input name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
          autoBind: true,
          autoWidth: true,
          height: 400,
          filter: "contains",
          dataTextField: "name",
          dataValueField: "id",
          headerTemplate:
            '<div class="dropdown-header k-widget k-header">' +
            "<span>Items </span>" +
            "<span></span>" +
            "</div>",
          template: "<span>#=name#</span>",
          optionLabel: "--- Select ---",
          dataSource: new kendo.data.DataSource({
            serverFiltering: true,
            transport: {
              read: {
                url: productVariantHandler.itemSearchURL(
                  "?plId=" + this.priceLevel.id
                ),
              },
              dataType: "json",
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  id: { type: "string" },
                  name: { type: "string" },
                  sku: { type: "string" },
                },
              },
              data: function (response) {
                return response.data;
              },
              total: function (response) {
                return response.data.count;
              },
            },
            // data: this.variants
          }),
        });
    },
    ItemDropDownEditorConnector(container, options) {
      kendo
        .jQuery('<input name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
          autoBind: false,
          autoWidth: true,
          height: 300,
          filter: "contains",
          dataTextField: "name_en",
          dataValueField: "id",
          optionLabel: "--- Select ---",
          dataSource: this.partnerItem,
        });
    },
    ItemDropDownEditorDepartment(container, options) {
      kendo
        .jQuery('<input name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
          autoBind: false,
          autoWidth: true,
          height: 300,
          filter: "contains",
          dataTextField: "name_en",
          template: "<span>#= name#-#= name_en#</span>",
          dataValueField: "id",
          optionLabel: "--- Select ---",
          dataSource: this.departments,
        });
    },
    ItemDropDownEditorLocation(container, options) {
      kendo
        .jQuery('<input name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
          autoBind: false,
          autoWidth: true,
          height: 300,
          filter: "contains",
          dataTextField: "name",
          dataValueField: "id",
          optionLabel: "--- Select ---",
          dataSource: this.locations,
        });
    },
    async loadLocation() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.locations = [];
          locationHandler
            .list()
            .then((res) => {
              if (res.data.statusCode === 200) {
                this.locations = res.data.data;
              }
            })
            .catch();
        }, 300);
      });
    },
    async loadDepartment() {
      appConnectionHandle.getDepartment().then((res) => {
        let department = [];
        if (res.length > 0) {
          res.map((i) => {
            // return {
            //     id: i.id || '',
            //     code: i.code || '',
            //     name: i.name || '',
            //     name_en: i.name_en || ''
            // }
            i.department_structure.map((dp) => {
              department.push(dp);
            });
          });
          this.departments = department;
        }
      });
    },
    async getFreeCategory() {
      appConnectionHandle.get().then((res) => {
        this.partnerItem = res;
      });
    },
    async setDefaultData() {
      // Brand New Mode
      let segments = await this.$store.dispatch("segments/getList");
      this.segment = new SegmentModel(segments.find((i) => i.isSystem === 1));
    },
    async loadSaleChannel() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          saleChannelHandler.get().then((res) => {
            if (res.data.statusCode === 200) {
              this.saleChannelList = res.data.data;
            }
          });
        }, 10);
      });
    },
    UOMDropDownEditor(container, options) {
      kendo
        .jQuery('<input name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
          autoBind: true,
          autoWidth: true,
          height: 400,
          filter: "startswith",
          dataTextField: "code",
          dataValueField: "uomConvertId",
          cascadeFrom: "item",
          template: "<span>#= code || `No Price Level`#</span>",
          optionLabel: "--- Select ---",
          dataSource: new kendo.data.DataSource({
            serverFiltering: true,
            transport: {
              read: {
                url: uomPriceHandler.uomPriceByPriceLevelURL(
                  "id=" +
                    options.model.item.id +
                    "&plId=" +
                    this.priceLevel.id +
                    "&date=" +
                    this.transactionDate +
                    "&nature=purchase"
                ),
              },
              dataType: "json",
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  id: { type: "string" },
                  // name: {type: "string"},
                  // sku: {type: "string"},
                },
              },
              data: function (response) {
                return response.data;
              },
              total: function (response) {
                return response.data.count;
              },
            },
            // data: this.variants
          }),
        });
    },
    UOMTemplate(dataItem) {
      const uom = dataItem.uom;
      const code = uom.code || "";
      if (uom) {
        return `<span>${uom.uom ? code : ``}</span>`;
      } else {
        return ``;
      }
    },
    loadData() {
      appConnectionHandle.getMatch().then((res) => {
        window.console.log("res data", res);
        if (res.data) {
          let filerLocation = res.data.itemLinesLocation.filter((i) => {
            i.isAddNew = false;
            return i;
          });
          this.priceLevel = res.data.priceLevel;
          this.mCustomerType = res.data.mCustomerType;
          // this.location = res.data.location;
          this.segment = res.data.segment;
          this.saleChannel = res.data.saleChannel;
          this.paymentTerm = res.data.paymentTerm;
          this.itemLinesLocation = filerLocation;
          this.itemLines = res.data.itemLines;
        }
      });
    },
    clear() {
      this.itemLine = itemLineModel;
      this.itemLineLocation = ItemLineLocationModel;
      this.priceLevel = {};
      this.mCustomerType = "";
      this.segment = new SegmentModel();
      this.saleChannel = "";
      this.paymentTerm = {};
      this.itemLinesLocation = [];
      this.itemLines = [];
    },
    laodDefualtData() {
      this.getFreeCategory();
      // this.loadPriceLevel();
      this.loadCustomerType();
      this.setDefaultData();
      this.loadSaleChannel();
      this.loadPaymentTerm();
      this.loadLocation();
      this.loadDepartment();
    },
  },
  computed: {
    realType() {
      return this.$route.query.type;
    },
  },
  watch: {
    realType() {
      if (this.$route.query.type === undefined) {
        this.clear();
        this.loadData();
      } else {
        this.loadData();
      }
    },
  },
  mounted() {
    this.laodDefualtData();
    if (this.$route.query.type !== undefined) {
      // this.loadData();
    } else {
      this.addRow2();
      this.addRow();
    }
    this.loadData();
  },
};
</script>
<style scoped>
.grayBg {
  background-color: #f8f8f9;
}

.my_table_darkv
  .theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th {
  color: rgba(0, 0, 0, 0.6);
  background: #222a35;
  color: #fff !important;
}

.privacy {
  position: absolute;
  bottom: 20px;
  left: 7%;
  width: 100%;
}

.v-slide-group__wrapper {
  border-bottom: 1px solid rgb(182, 181, 181) !important;
}

.theme--light.v-tabs > .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.v-tab--active {
  background-color: #e5effa;
  color: #000;
}

.theme--light.v-tabs >>> .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}
</style>





