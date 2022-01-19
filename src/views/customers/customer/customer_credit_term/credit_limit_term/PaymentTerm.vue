<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col cols="12">
            <v-btn @click="onNew" color="primary float-right white--text">
              {{ $t("new") }}
            </v-btn>
          </v-col>
        </v-row>

        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          type="loading"
          :myLoading="true"
        />
        <kendo-datasource ref="termItemDS" :data="paymentItem" />
        <kendo-grid
          id="gridTerms"
          class="grid-function"
          :data-source-ref="'termItemDS'"
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
            :field="'term.name'"
            :title="$t('term')"
            :width="200"
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
            :width="200"
            :headerAttributes="{
              style: 'background-color: #EDF1F5',
            }"
          />
          <kendo-grid-column
            :command="{
              iconClass: 'k-icon k-i-edit',
              text: ' ',
              click: goEdit_,
              class: 'btn-plus',
            }"
            :title="''"
            :width="80"
            :headerAttributes="{
              style: 'text-align: left; background-color: #EDF1F5',
            }"
          />
        </kendo-grid>
      </v-card>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <div class="modal_header">
            <v-card-title>{{ $t("payment_term") }}</v-card-title>
            <v-icon class="" @click="dialog = false">close</v-icon>
          </div>
          <v-card-text class="modal_text_content">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col sm="6" cols="12" class="">
                  <label class="label">{{ $t("customer") }}</label>
                  <b><p>{{ customerName }}</p></b>
                </v-col>

                <v-col sm="6" cols="12" class="pb-0">
                  <label class="label">{{ $t("effective_date") }}</label>
                  <app-datepicker
                    :initialDate="paymentTerm.effectiveDate_"
                    @emitDate="paymentTerm.effectiveDate_ = $event"
                  />
                  <label class="label">{{ $t("new_term") }}</label>
                  <v-select
                    class="mt-1"
                    :items="terms"
                    item-value="id"
                    item-text="name"
                    v-model="paymentTerm.term"
                    :rules="[(v) => !!v || 'term is required']"
                    return-object
                    outlined
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
import PaymentTermModel from "@/scripts/paymentterm/model/PaymentTerm";
import paymentTermHandler from "@/scripts/paymentterm/handler/paymentTermHandler";
import settingHandler from "@/scripts/settingsHandler";
import kendo from "@progress/kendo-ui";
import $ from "jquery";
import TermModel from "@/scripts/model/PaymentTerm";
// const creditLimitHandler = require("@/scripts/creditLimit/handler/creditLimitHandler");
const paymentTermModel = new PaymentTermModel({});

const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const TYPE = "Customer";
export default {
  name: "PaymentTerm",
  props: ["customer"],
  data: () => ({
    showLoading: false,
    paymentItem: [],
    terms: [],
    dialog: false,
    valid: true,
    paymentTerm: paymentTermModel,
    loggedUser: {
      id: cookie.creator,
      name: cookie.email,
    },
    disabled: false,
  }),
  components: {
    "app-datepicker": () =>
      import("@/components/custom_templates/DatePickerComponent"),
    LoadingMe: () => import(`@/components/Loading`),
  },
  computed: {
    customerName() {
      if (this.customer) {
        const cus = this.customer || {};
        const id = cus.id || "";
        if (id) {
          this.loadPaymentTermList();
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
  methods: {
    onNew() {
      this.paymentTerm.id = "";
      this.paymentTerm.term = {};
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    goEdit_(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridTerms").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.paymentTerm = new PaymentTermModel(dataItem);
      this.dialog = true;
      window.console.log(this.paymentTerm, "paymentItem");
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.termItemDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    async loadPaymentTermList() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.customerId) {
            const strFilter = "?id=" + this.customerId + "&type=" + TYPE;
            this.showLoading = true;
            paymentTermHandler.get(strFilter).then((res) => {
              if (res.data.statusCode === 200) {
                this.paymentItem = res.data.data;
                this.showLoading = false;
              } else {
                this.showLoading = false;
              }
            });
          }
        }, 10);
      });
    },
    async loadPayment() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const strFilter = "?type=pmt-customer";
          settingHandler.getPaymentTerm(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.terms = res.data.data;
            }
          });
        }, 10);
      });
    },
    onSaveClose() {
      // if (this.$refs.form.validate()) {
      //   return
      // }
      // window.console.log('(this.customerId', (this.customerId))
      if (this.customerId) {
        const customer_ = {
          id: this.customer.id || "",
          name: this.customer.name || "",
        };

        this.paymentTerm["customerId"] = this.customerId;
        this.paymentTerm["customer"] = customer_;
        this.paymentTerm["deleted"] = 0;
        this.paymentTerm["vendor"] = {};
        this.paymentTerm["type"] = "Customer";
        this.paymentTerm["term"] = new TermModel(this.paymentTerm.term);
        this.paymentTerm["loggedUser"] = this.loggedUser;
        this.paymentTerm["effectiveDate"] = new Date(
          this.paymentTerm.effectiveDate_
        )
          .toISOString()
          .substr(0, 10);
        // this.creditLimit['actionType'] = this.$route.params.id ? this.$route.query.type : 'new'
        this.paymentTerm["effectiveDate_"] = new Date(
          this.paymentTerm.effectiveDate_
        ).toJSON();
        // this.showLoading = true
        this.disabled = true;
        paymentTermHandler
          .create(this.paymentTerm)
          .then((response) => {
            if (response.data.statusCode === 201) {
              this.disabled = false;
              // this.showLoading = false
              this.$snotify.success("Successfully");
              this.close();
              this.loadPaymentTermList();
            }
          })
          .catch((e) => {
            this.disabled = false;
            // this.showLoading = false
            this.$snotify.error("Something went wrong");
            this.errors.push(e);
          });
      }
    },
  },
  mounted: async function() {
    await this.loadPayment();
  },
};
</script>
