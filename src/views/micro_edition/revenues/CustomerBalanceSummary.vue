<template>
  <v-row>
    <v-col sm="12" cols="12" class="">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="4" cols="12" class="kendo_dropdown_custom py-0">
            <app-datepicker :initialDate="asOf" @emitDate="asOf = $event" />
          </v-col>
          <v-col sm="4" cols="12" class="kendo_dropdown_custom pt-1 pb-0">
            <dropdownlist
              :data-items="customerList"
              @change="onChange"
              :value="customer"
              :data-item-key="dataItemKey"
              :text-field="textField"
              :default-item="defaultItem"
              :filterable="true"
              @filterchange="onFilterChange"
            >
            </dropdownlist>
          </v-col>
          <v-col sm="1" cols="1" class="pt-1 pb-0">
            <v-btn color="primary white--text" @click="balanceSummary">
              <i
                class="b-search"
                style="font-size: 18px; color: #fff !important"
              />
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col sm="4" cols="12" class="pt-1 pr-2">
            <v-card
              outlined
              dense
              class="pa-3 no_border rounded-4 white--text"
              color="primary"
              height="60px"
            >
              <h3 class="text-left flex-1 font_12 text-uppercase">
                {{ $t("no_of_customer") }}
              </h3>
              <h3 class="font_20 mt-0 flex-1 text-right white--text">00</h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="pt-1 px-2">
            <v-card
              outlined
              dense
              color="primary"
              class="pa-3  rounded-4 no_border white--text"
              height="60px"
            >
              <h3 class="text-left flex-1 font_12 text-uppercase">
                {{ $t("receivable_balances") }}
              </h3>
              <h3 class="font_20 mt-0 flex-1 text-right white--text">0000</h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="pt-1 pl-2">
            <v-card
              outlined
              to="individual_customer"
              dense
              color="third"
              class="pa-3 rounded-4 no_border white--text"
              height="60px"
            >
              <h3 class="text-center flex-1 font_18 mt-2 text-uppercase">
                + {{ $t("customer") }}
              </h3>
            </v-card>
          </v-col>
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
              <kendo-datasource
                ref="dataSource"
                :group="group"
                :data="receivableList"
              />
              <kendo-grid
                id="gridReceivable"
                class="grid-function"
                :data-source-ref="'dataSource'"
                :sortable="false"
                :groupable="true"
                :filterable="false"
                :column-menu="true"
                :noRecords="true"
                :editable="false"
                :excel-file-name="'Receivable Balance Summary.xlsx'"
                :excel-filterable="true"
                :excel-all-pages="true"
                :toolbar="['excel']"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'customer'"
                  :title="$t('name')"
                  :attributes="{ class: 'tb_name_td' }"
                  :template="'<span>#=name#</span>'"
                  :width="200"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'phone'"
                  :title="$t('phone')"
                  :width="200"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'balance'"
                  :title="$t('balance')"
                  :template="'<span>#= kendo.toString(balance, decimalFormat)#</span>'"
                  :width="200"
                  :attributes="{ style: 'text-align: right; ' }"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <!-- <kendo-grid-column
                  :field="'type'"
                  :title="$t('type')"
                  :width="200"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'group'"
                  :title="$t('group')"
                  :width="200"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                /> -->

                <kendo-grid-column
                    :field="'overDue'"
                    :title="$t('over_due')"
                    :template="'<span>#= kendo.toString(overDue, decimalFormat)#</span>'"
                    :width="180"
                    :attributes="{style: 'text-align: right; '}"
                    :headerAttributes="{ style: 'background-color: #EDF1F5'}"/>
              <kendo-grid-column
                  :field="'type'"
                  :title="$t('status')"
                  :width="200"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
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
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import { DropDownList } from "@progress/kendo-vue-dropdowns";
// import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
// import kendo from "@progress/kendo-ui";
// import downloadexcel from "vue-json-excel";

import JSZip from "jszip";
window.JSZip = JSZip;
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const defaultItem = { ["numberName"]: "Select customer...", ["id"]: null };
const customerHandler = require("@/scripts/customerHandler");
const emptyItem = { ["numberName"]: "loading ..." };
// const $ = require("jquery")
export default {
  data: () => ({
    asOf: new Date().toISOString().substr(0, 10),
    showLoading: false,
    group: [],
    aggregateDefinition: [
      { field: "name", aggregate: "count" },
      { field: "amount", aggregate: "sum" },
      { field: "code", aggregate: "count" },
    ],
    receivableList: [],
    customerList: [],
    customer: {},
    textField: "numberName",
    defaultItem: defaultItem,
    dataItemKey: "id",
    filter: "",
    cusBaseUrl: customerHandler.search(),
    overDueAmount: 0,
    receivableBalance: 0,
    tobeCollected: 0,

    exfield: {
      Name: "name",
      Type: "customerType",
      Group: "customerGroup",
      Balance: "balance",
      "Over Due": "overDue",
    },
  }),
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": DatePickerComponent,
    dropdownlist: DropDownList,
    // downloadexcel: downloadexcel
  },
  methods: {
    async balanceSummary() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf + "&type=bal-" + "&txnType=Customer";
          if (this.customer) {
            if (this.customer.id !== undefined && this.customer.id !== null) {
              strFilter =
                "?asOf=" +
                this.asOf +
                "&id=" +
                this.customer.id +
                "&type=bal-" +
                "&txnType=Customer";
            }
          }
          this.showLoading = true;
          billingHandler.vendorDepositBalanceSummary(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.receivableList = res.data.data;
              this.showLoading = false;
            }
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
    onFilterChange(event) {
      const filter = event.filter.value;
      this.requestData(0, filter, this.cusBaseUrl);
      this.filter = filter;
    },
    requestData(skip, filter, baseUrl) {
      const url = baseUrl + `?filter=${filter}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then(this.afterFetch);
    },
    afterFetch(json) {
      this.customerList = json.data;
    },
    onChange(event) {
      const value = event.value;
      if (value && value["numberName"] === emptyItem["numberName"]) {
        return;
      }
      this.customer = value;
    },
    sumGroupAmount(dataItem) {
      if (dataItem.hasOwnProperty("sum")) {
        return "<span>#= kendo.toString(sum, `n2`)#</span>";
      }
      return `<span>#= kendo.toString(sum, 'n2')#</span>`;
    },
  },
  computed: {},
  mounted: async function () {
    this.group = [
      {
        field: "customerType",
        aggregates: this.aggregateDefinition,
      },
    ];
    this.requestData(0, this.filter, this.cusBaseUrl);
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

.b-search:before {
  color: #fff !important;
}
</style>