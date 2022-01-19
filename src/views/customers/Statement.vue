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
                <h2 class="mb-0">{{ $t("statment") }}</h2>
                <v-icon
                  @click="cancel()"
                  style="cursor: pointer; color: #333; font-size: 40px;"
                  class="float-right"
                  >close
                </v-icon>
              </v-card>

              <v-card outlined dense class="px-3 no_border mb-3" color="white">
                <v-row style="background: #F8F8F9;">
                  <v-col
                    sm="4"
                    cols="12"
                    class="kendo_dropdown_custom pt-3 pb-0"
                  >
                    <app-datepicker
                      :initialDate="asOf"
                      @emitDate="asOf = $event"
                    />
                  </v-col>
                  <v-col
                    sm="4"
                    cols="12"
                    class="kendo_dropdown_custom pt-4 pb-0"
                  >
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
                  <v-col sm="1" cols="1" class="pt-4 pb-0">
                    <v-btn color="primary white--text" @click="loadReceivable">
                      <i
                        class="b-search"
                        style="font-size: 18px; color:#fff !important;"
                      />
                    </v-btn>
                  </v-col>
                </v-row>
                <div sm="12" cols="12" class="d-flex my-3 justify-space-between">
                  <div>
                    <label class="label  mb-0">{{ $t("customer") }}: </label>
                    <h3 class="text-bold  py-1">{{ customerName? customerName: '--' }}</h3>
                  </div>
                  <div>
                      <label class="label  mb-0">{{ $t("account") }}: </label>
                      <h3 class="text-bold  py-1">  {{ $t("statement_of_account") }} </h3>
                  </div>
                  <div>
                    <label class="label  mb-0">{{ $t("as_of") }}: </label>
                    <h3 class="text-bold  py-1 font_16">{{ asOf_ }}</h3>
                  </div>
                </div>
                <v-row>
                  <v-row class="mt-0">
                    <v-col sm="4" cols="12" class="pt-0">
                      <v-card
                        outlined
                        dense
                        class="pa-3 rounded-4 no_border white--text"
                        color="secondary"
                        height="60px"
                      >
                        <h3 class="text-left font_13 text-uppercase flex-1">
                          {{ $t("overdue_amount") }}
                        </h3>
                        <h3 class="text-right font_20 flex-1">
                          {{ overDueAmount }}
                        </h3>
                      </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0">
                      <v-card
                        outlined
                        dense
                        class="pa-3 rounded-4 no_border white--text "
                        color="third"
                        height="60px"
                      >
                        <h3 class="text-left font_13 flex-1 text-uppercase">
                          {{ $t("receivable_balance") }}
                        </h3>
                        <h3 class="text-right flex-1 font_20">
                          {{ receivableBalance }}
                        </h3>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <template>
                      <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        type="loading"
                        :myLoading="true"
                      />
                      <kendo-datasource
                        ref="dataSource"
                        :data="receivableList"
                      />
                      <kendo-grid
                        id="gridReceivable"
                        class="grid-function"
                        :data-source-ref="'dataSource'"
                        :sortable="false"
                        :filterable="false"
                        :noRecords="true"
                        :editable="false"
                        :toolbar="['excel']"
                        :excel-file-name="'Kendo UI Grid Export.xlsx'"
                        :excel-filterable="true"
                        :scrollable-virtual="true"
                      >
                        <kendo-grid-column
                          :field="'transactionDate'"
                          :title="$t('invoice_date')"
                          :template="'<span>#=transactionDate#</span>'"
                          :group-footer-template="'Total: '"
                          :width="180"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'referenceNo'"
                          :title="$t('invoice_number')"
                          :width="200"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'code'"
                          :title="$t('payment_code')"
                          :template="'<span>#=code#</span>'"
                          :width="150"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'amount'"
                          :title="$t('open_amount')"
                          :template="
                            '<span>#= kendo.toString(amount, decimalFormat)#</span>'
                          "
                          :width="200"
                          :attributes="{ style: 'text-align: right; ' }"
                          :aggregates="['sum']"
                          :group-footer-template="
                            '<div style=text-align:right><span class=text-bold>#= kendo.toString(sum, `n2`)#</span>'
                          "
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'dueDate'"
                          :title="$t('due_date')"
                          :template="
                            '<span>#= kendo.toString(new Date(dueDate), dateFormat)#</span>'
                          "
                          :width="180"
                          :attributes="{ style: 'text-align: right; ' }"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'overDue'"
                          :title="$t('over_due')"
                          :template="'<span>#=overDue#</span>'"
                          :width="180"
                          :attributes="{ style: 'text-align: right; ' }"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                      </kendo-grid>
                    </template>
                  </v-col>
                  <!--                                        <v-col sm="6" cols="12">-->
                  <!--                                            <v-simple-table class="" >-->
                  <!--                                                <template v-slot:default>-->
                  <!--                                                    <tbody>-->
                  <!--                                                    <tr>-->
                  <!--                                                        <td class="text-bold text-uppercase">{{$t('aging')}}</td>-->
                  <!--                                                        <td class="text-bold text-uppercase">{{$t('num_of_invoice')}}</td>-->
                  <!--                                                        <td class="text-bold text-uppercase">{{$t('amount')}}</td>-->
                  <!--                                                    </tr>-->
                  <!--                                                    <tr>-->
                  <!--                                                        <td class="text-bold text-uppercase">{{$t('current')}}</td>-->
                  <!--                                                        <td class="text-bold"></td>-->
                  <!--                                                        <td class="text-bold"></td>-->
                  <!--                                                    </tr>-->
                  <!--                                                    <tr>-->
                  <!--                                                        <td class="text-bold">1-30</td>-->
                  <!--                                                        <td class="text-bold"></td>-->
                  <!--                                                        <td class="text-bold"></td>-->
                  <!--                                                    </tr>-->
                  <!--                                                    <tr>-->
                  <!--                                                        <td class="text-bold">31-60</td>-->
                  <!--                                                        <td class="text-bold"></td>-->
                  <!--                                                        <td class="text-bold"></td>-->
                  <!--                                                    </tr>-->
                  <!--                                                    <tr>-->
                  <!--                                                        <td class="text-bold">61-90</td>-->
                  <!--                                                        <td class="text-bold"></td>-->
                  <!--                                                        <td class="text-bold"></td>-->
                  <!--                                                    </tr>-->
                  <!--                                                    <tr>-->
                  <!--                                                        <td class="text-bold">>90</td>-->
                  <!--                                                        <td class="text-bold"></td>-->
                  <!--                                                        <td class="text-bold"></td>-->
                  <!--                                                    </tr>-->
                  <!--                                                    <tr>-->
                  <!--                                                        <td class="text-bold text-uppercase">{{$t('total')}}</td>-->
                  <!--                                                        <td class="text-bold"></td>-->
                  <!--                                                        <td class="text-bold"></td>-->
                  <!--                                                    </tr>-->
                  <!--                                                    </tbody>-->
                  <!--                                                </template>-->
                  <!--                                            </v-simple-table>-->
                  <!--                                        </v-col>-->
                  <!--                                        <v-col sm="6" cols="12">-->
                  <!--                                            <p class="font_18">{{$t('summary_of_balance')}}</p>-->
                  <!--                                            <v-simple-table >-->
                  <!--                                                <template v-slot:default>-->
                  <!--                                                    <tbody>-->
                  <!--                                                        <tr class="">-->
                  <!--                                                            <td class="text-bold white&#45;&#45;text third">{{$t('opening_balance_date')}}</td>-->
                  <!--                                                            <td class="primary&#45;&#45;text third text-right"></td>-->
                  <!--                                                        </tr>-->
                  <!--                                                        <tr>-->
                  <!--                                                            <td class="text-uppercase">{{$t('invoiced')}}</td>-->
                  <!--                                                            <td class="text-right text-bold">0</td>-->
                  <!--                                                        </tr>-->
                  <!--                                                        <tr>-->
                  <!--                                                            <td class="text-uppercase">{{$t('paid')}}</td>-->
                  <!--                                                            <td class="primary&#45;&#45;text text-right text-bold">0</td>-->
                  <!--                                                        </tr>-->
                  <!--                                                        <tr>-->
                  <!--                                                            <td class="text-uppercase">{{$t('refunded')}}</td>-->
                  <!--                                                            <td class="primary&#45;&#45;text text-right text-uppercase text-bold">N/A</td>-->
                  <!--                                                        </tr>-->
                  <!--                                                        <tr>-->
                  <!--                                                            <td class="text-bold secondary white&#45;&#45;text">{{$t('closing_balance_date')}}</td>-->
                  <!--                                                            <td class="text-bold secondary white&#45;&#45;text"></td>-->
                  <!--                                                        </tr>-->
                  <!--                                                    </tbody>-->
                  <!--                                                </template>-->
                  <!--                                            </v-simple-table>-->
                  <!--                                        </v-col>-->
                </v-row>
              </v-card>
              <v-divider class="mt-4" />
              <v-card outlined dense class="no_border function_footer">
                <v-menu>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="mr-2 text-capitalize  black--text float-left"
                      v-on="on"
                    >
                      {{ $t("select_template") }}
                      <v-icon size="" class="ma-1">expand_more</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in templates"
                      :key="index"
                    >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-btn
                  outlined
                  color="black"
                  class="text-capitalize  black--text float-left"
                  @click="cancel()"
                  >{{ $t("cancel") }}
                </v-btn>
                <v-btn
                  color="primary"
                  class="ml-3 float-right text-capitalize  white--text"
                >
                  {{ $t("send") }}
                </v-btn>
                <v-btn
                  color="secondary"
                  class=" float-right text-capitalize  white--text"
                >
                  {{ $t("print") }}
                </v-btn>
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
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import kendo from "@progress/kendo-ui";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");

const defaultItem = { ["numberName"]: "Select customer...", ["id"]: null };
const customerHandler = require("@/scripts/customerHandler");
const emptyItem = { ["numberName"]: "loading ..." };
import JSZip from "jszip";
window.JSZip = JSZip;
export default {
  name: "Statement",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": DatePickerComponent,
    dropdownlist: DropDownList,
  },
  data: () => ({
    asOf: new Date().toISOString().substr(0, 10),
    showLoading: false,
    customerList: [],
    group: [],
    customer: {},
    textField: "numberName",
    defaultItem: defaultItem,
    dataItemKey: "id",
    filter: "",
    cusBaseUrl: customerHandler.search(),
    overDueAmount: 0,
    receivableBalance: 0,
    tobeCollected: 0,
    valid: true,
    template: [],
    templates: [],
    receivableList: [],
  }),
  methods: {
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
    async loadReceivable() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          if (this.customer) {
            if (this.customer.id !== undefined && this.customer.id !== null) {
              strFilter = "?asOf=" + this.asOf + "&id=" + this.customer.id;
            }
          }
          this.showLoading = true;
          billingHandler.wcpReceivableList(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.receivableList = res.data.data;
              const result = res.data.result;
              this.receivableBalance = kendo.toString(
                result.receivableBalance,
                result.decimalFormat
              );
              this.overDueAmount = kendo.toString(
                result.overDueAmount,
                result.decimalFormat
              );
              this.tobeCollected = kendo.toString(result.tobeCollected, `n0`);
              this.showLoading = false;
            }
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
      }).then((result) => {
        if (result.value) {
          this.$router.go(-1);
        }
      });
    },
  },
  mounted: async function() {
    this.requestData(0, this.filter, this.cusBaseUrl);
  },
  computed: {
    asOf_() {
      if (this.asOf) {
        return this.asOf;
      }
      return "";
    },
    customerName() {
      if (this.customer) {
        return this.customer.name || "";
      }
      return "";
    },
  },
};
</script>

<style scoped>
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid #dfdfdf;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:last-child
  td {
  border-bottom: thin solid #dfdfdf;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:first-child
  td {
  border-top: thin solid #dfdfdf;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
}

@media (min-width: 1264px) {
  .container {
    max-width: 1280px !important;
  }
}
</style>
