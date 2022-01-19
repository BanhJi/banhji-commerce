<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0 px-6">
      <v-row class="grayBg" style="width: 104%;">
        <v-col sm="12" cols="12" class="">
          <v-card outlined color="white" class="pa-3">
            <v-row class="">
              <v-col sm="5" cols="12" class="pt-0">
                <v-card
                  outlined
                  dense
                  class="pa-3 rounded-4 no_border white--text "
                  color="secondary"
                  height="60px"
                >
                  <h3 class="text-left font_12 flex-1 text-uppercase">
                    {{ $t("credit_limit") }}
                  </h3>
                  <h3 class="text-right  flex-1font_20">
                    {{ numberFormat(creditLimitAmount) }}
                  </h3>
                </v-card>
              </v-col>
              <v-col sm="5" cols="12" class="pt-0">
                <v-card
                  outlined
                  dense
                  class="pa-3 rounded-4 no_border white--text "
                  color="third"
                  height="60px"
                >
                  <h3 class="text-left text-uppercase font_12 flex-1 ">
                    {{ $t("usage%") }}
                  </h3>
                  <h3 class="text-right  font_20  flex-1 ">
                    {{ numberFormat(creditUsage) }} %
                  </h3>
                </v-card>
              </v-col>
              <v-col sm="2" cols="1" class="py-0 mt-1">
                <v-btn @click="onNew" color="primary white--text">
                  {{ $t("new") }}
                </v-btn>
              </v-col>
            </v-row>

            <v-row class="">
              <v-col sm="12" cols="12" class="py-0">
                <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  type="loading"
                  :myLoading="true"
                />
                <kendo-datasource ref="creditLimitDS" :data="creditLimitItem" />
                <kendo-grid
                  id="gridCreditLimit"
                  class="grid-function"
                  :data-source-ref="'creditLimitDS'"
                  :sortable="false"
                  :column-menu="true"
                  :editable="false"
                  :noRecords="true"
                  :scrollable-virtual="true"
                >
                  <kendo-grid-column
                    :title="$t('no.')"
                    :width="55"
                    :column-menu="false"
                    :template="rowNumberTmpl"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;',
                      class: 'text-products',
                    }"
                    :attributes="{
                      style: 'text-align: products',
                    }"
                  />

                  <kendo-grid-column
                    :field="'customer.name'"
                    :title="$t('name')"
                    :width="200"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5',
                    }"
                  />
                  <kendo-grid-column
                    :field="'amount'"
                    :title="$t('amount')"
                    :template="
                      '<span>#=kendo.toString(parseFloat(amount), decimalFormat)#</span>'
                    "
                    :width="200"
                    :attributes="{ style: 'text-align: right; ' }"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5',
                    }"
                  />
                  <kendo-grid-column
                    :field="'effectiveDate'"
                    :title="$t('date')"
                    :template="
                      '<span>#=kendo.toString(new Date(effectiveDate), dateFormat)#</span>'
                    "
                    :width="110"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5',
                    }"
                  />
                  <kendo-grid-column
                    :command="{
                      iconClass: 'k-icon k-i-edit',
                      text: ' ',
                      click: goEdit,
                      class: 'btn-plus',
                    }"
                    :title="''"
                    :width="80"
                    :headerAttributes="{
                      style: 'text-align: left; background-color: #EDF1F5',
                    }"
                  />
                </kendo-grid>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <div class="modal_header">
            <v-card-title>{{ $t("credit_limit") }}</v-card-title>
            <v-icon class="btn_close" @click="dialog = false">close</v-icon>
          </div>
          <v-card-text class="modal_text_content">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col sm="6" cols="12" class="">
                  <label class="label">{{ $t("customer") }}</label>
                 <b> <p>{{ customerName }}</p></b>
                  <!--                  <v-select-->
                  <!--                      class="mt-1"-->
                  <!--                      outlined-->
                  <!--                      placeholder=""-->
                  <!--                      :rules="[(v) => !!v || $t('is_required')]"/>-->
                  <!--                  <label class="label">{{ $t("current_credit_limit") }}</label>-->
                  <!--                  <v-text-field-->
                  <!--                      outlined-->
                  <!--                      class="mt-1"-->
                  <!--                      placeholder=""/>-->
                  <!--                  <label class="label">{{ $t("%change") }}</label>-->
                  <!--                  <v-select-->
                  <!--                    outlined-->
                  <!--                    placeholder=""-->
                  <!--                    class="mt-1"-->
                  <!--                  />-->
                </v-col>

                <v-col sm="6" cols="12" class="pb-0">
                  <label class="label">{{ $t("effective_date") }}</label>
                  <app-datepicker
                    :initialDate="creditLimit.effectiveDate_"
                    @emitDate="creditLimit.effectiveDate_ = $event"
                  />
                  <label class="label">{{ $t("new_credit_limit") }}</label>
                  <v-text-field
                    outlined
                    type="number"
                    v-model="creditLimit.amount"
                    min="1"
                    class="mt-1"
                    placeholder=""
                    :rules="[(v) => !!v || $t('must_be_greater_than_0')]"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="modal_footer">
            <v-row>
              <v-col sm="6" cols="6" class="py-0">
                <v-btn
                  color="black"
                  outlined
                  class=" text-capitalize black--text float-left"
                  @click="dialog = false"
                  >{{ $t("cancel") }}
                </v-btn>
              </v-col>
              <v-col sm="6" cols="6" class="py-0">
                <v-btn
                  color="primary"
                  :disabled="disabled"
                  class="px-3 white--text text-capitalize float-right"
                  @click.native="onSaveClose"
                >
                  {{ $t("save_close") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
// import {i18n} from "@/i18n";
import CreditLimitModel from "@/scripts/creditLimit/model/CreditLimit";
import kendo from "@progress/kendo-ui";
import $ from "jquery";

const creditLimitHandler = require("@/scripts/creditLimit/handler/creditLimitHandler");
const creditLimitModel = new CreditLimitModel({});

const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const TYPE = "Customer";

export default {
  name: "CreditLimit",
  props: ["customer"],
  data: () => ({
    creditLimitItem: [],
    paymentItem: [],
    dialog: false,
    showLoading: false,
    valid: true,
    // effectiveDate: new Date().toISOString().substr(0, 10),
    creditLimit: creditLimitModel,
    loggedUser: {
      id: cookie.creator,
      name: cookie.email,
    },
    creditLimitAmount: 0,
    creditUsage: 0,
    decimalFormat: "n2",
    disabled: false,
  }),
  methods: {
    onNew() {
      this.creditLimit.id = "";
      this.creditLimit.amount = 0;
      this.dialog = true;
    },
    numberFormat(value) {
      return kendo.toString(parseFloat(value), this.decimalFormat);
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.creditLimitDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridCreditLimit").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.creditLimit = new CreditLimitModel(dataItem);
      this.dialog = true;
      window.console.log(this.creditLimit, "creditLimit");
    },
    removeRow(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridCreditLimit").data("kendoGrid"),
        dataSource = grid.dataSource,
        dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

      if (dataSource.total() > 1) {
        dataSource.remove(dataItem);
      }
    },
    close() {
      this.dialog = false;
    },
    onSaveClose() {
      // if (this.$refs.form.validate()) {
      //   return
      // }
      window.console.log("(this.customerId", this.customerId);
      if (this.customerId) {
        const customer_ = {
          id: this.customer.id || "",
          name: this.customer.name || "",
        };
        const amount = this.creditLimit.amount;
        if (parseFloat(amount) > 0) {
          this.creditLimit["customerId"] = this.customerId;
          this.creditLimit["customer"] = customer_;
          this.creditLimit["vendor"] = {
            id: "",
            name: "",
          };
          this.creditLimit["deleted"] = 0;
          this.creditLimit["type"] = "Customer";
          this.creditLimit["loggedUser"] = this.loggedUser;
          this.creditLimit["effectiveDate"] = new Date(
            this.creditLimit.effectiveDate_
          )
            .toISOString()
            .substr(0, 10);
          this.creditLimit["effectiveDate_"] = new Date(
            this.creditLimit.effectiveDate_
          ).toJSON();
          this.disabled = true;
          // this.showLoading = true
          creditLimitHandler
            .create(this.creditLimit)
            .then((response) => {
              if (response.data.statusCode === 201) {
                // this.showLoading = false
                this.disabled = false;
                this.$snotify.success("Successfully");
                this.close();
                this.loadCreditLimit();
                this.loadCreditLimitUsage();
              }
            })
            .catch((e) => {
              // this.showLoading = false
              this.disabled = false;
              this.$snotify.error("Something went wrong");
              this.errors.push(e);
            });
        } else {
          this.$snotify.error("Invalid Amount");
        }
      }
    },
    async loadCreditLimit() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.customerId) {
            const strFilter = "?id=" + this.customerId + "&type=" + TYPE;
            this.showLoading = true;
            creditLimitHandler.get(strFilter).then((res) => {
              if (res.data.statusCode === 200) {
                this.creditLimitItem = res.data.data;
                this.showLoading = false;
              } else {
                this.showLoading = false;
              }
            });
          }
        }, 10);
      });
    },
    async loadCreditLimitUsage() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.customerId) {
            const strFilter =
              "?id=" + this.customerId + "&type=bal" + "&typeAs=" + TYPE;
            this.showLoading = true;
            creditLimitHandler.creditUsage(strFilter).then((res) => {
              if (res.data.statusCode === 200) {
                const response = res.data.data;
                this.creditLimitAmount = response.creditLimitAsOfToday || 0;
                this.creditUsage = response.usage || 0;
                this.decimalFormat = response.decimalFormat || "n2";
                this.showLoading = false;
              } else {
                this.showLoading = false;
              }
            });
          }
        }, 10);
      });
    },
  },
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": () =>
      import("@/components/custom_templates/DatePickerComponent"),
  },
  computed: {
    customerName() {
      if (this.customer) {
        const cus = this.customer || {};
        const id = cus.id || "";
        if (id) {
          this.loadCreditLimit();
          this.loadCreditLimitUsage();
        }
        return this.customer.name || "";
      }
      return "";
    },
    customerId() {
      if (this.customer) {
        const cus = this.customer || {};
        const id = cus.id || "";
        if (id) {
          return this.customer.id || "";
        }
      }
      return "";
    },
  },
  mounted: async function() {
    await this.loadCreditLimit();
  },
  // watch: {
  //   '$route': 'loadCreditLimit'
  // }
};
</script>
