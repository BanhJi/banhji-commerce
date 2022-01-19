<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <div class="function_wrapper relatvive pt-3">
            <v-row>
              <v-col
                class="bigSide"
                sm="8"
                cols="12"
                style="transition: .3s ease-in;"
                :class="{ hide_big_bar_class: isHideBar }"
              >
                <v-form ref="form" v-model="valid" lazy-validation>
                  <div class="function_header">
                    <h2>{{ $t("cash_payment") }}</h2>
                    <v-icon
                      v-if="isHideBar"
                      onclick="window.history.go(-1); return false;"
                      style="cursor: pointer; color: #333; font-size: 40px;"
                      class="float-right"
                      >close
                    </v-icon>
                    <span
                      style="transition: .3s ease-in; z-index:10;"
                      :class="{
                        iconArrow: !isHideBar,
                        iconArrowHide: isHideBar,
                      }"
                    >
                      <v-icon
                        size="22"
                        class="arr_icon"
                        @click="hideSmallSideBar"
                        v-if="isHideBar"
                      >
                        mdi-chevron-left-circle
                      </v-icon>
                      <v-icon
                        size="22"
                        class="arr_icon"
                        @click="hideSmallSideBar"
                        v-if="!isHideBar"
                      >
                        mdi-chevron-right-circle
                      </v-icon>
                    </span>
                  </div>
                  <div class="function_content">
                    <!-- Form -->
                    <v-row class="px-6">
                      <v-col sm="6" cols="12" class="pb-0">
                        <v-row style="background:#F8F8F9" class="pa-4">
                          <v-col sm="6" cols="12">
                            <label class="label mb-0">{{
                              $t("supplier")
                            }}</label>
                            <h3 class="text-bold py-1">Suppliers</h3>
                            <label class="label mb-0">{{
                              $t("supplier_bill_no")
                            }}</label>
                            <h3 class="text-bold py-1">PMT260671010101</h3>
                          </v-col>
                          <v-col sm="6" cols="12">
                            <label class="label mb-0">{{
                              $t("purchase_no")
                            }}</label>
                            <h3 class="text-bold py-1">PD260101</h3>
                          </v-col>
                        </v-row>
                        <v-row class="mt-3">
                          <v-col sm="6" cols="12">
                            <label>{{ $t("message_on_payment") }}</label>
                            <h4 class="text-bold py-2">
                              This will appear on the Voucher
                            </h4>
                          </v-col>
                          <v-col sm="6" cols="12">
                            <label>{{ $t("message_for_journal") }}</label>
                            <h4 class="text-bold py-2">
                              This will appear on the journal entry
                            </h4>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col sm="6" cosl="12">
                        <v-card
                            color="primary"
                            elevation="0"
                          class="pa-2 mb-6 font_18 text-bold rounded-1"
                        >
                          <p
                         
                            class="white--text text-uppercase"
                          >
                            {{ $t("amount_receipt") }}
                          </p>
                          <p class="number mb-0 white--text text-bold font_18 text-right">
                            1,000.00
                          </p>
                        </v-card>
                        <v-row>
                          <v-col sm="6" cols="12" class="pr-0">
                            <label
                              class="label lb_bold mb-1 text-bold text-capitalize"
                              >{{ $t("payment_code") }}</label
                            >
                            <h4 class="secondary white--text pa-3">PMT260671010101</h4>
                            <label
                              class="label lb_bold mb-1 text-bold text-capitalize"
                              >{{ $t("payment_date") }}</label
                            >
                            <h4 class="third white--text pa-3">07-04-2020</h4>
                            <label
                              class="label lb_bold mb-1 text-bold text-capitalize"
                              >{{ $t("account") }}</label
                            >
                            <h4 class="third white--text pa-3">Cash in Bank</h4>
                          </v-col>
                          <v-col sm="6" cols="12">
                            <label
                              class="label mb-1 lb_bold text-bold text-uppercase"
                              >{{ $t("method") }}</label
                            >
                            <v-img width="80%" src="@/assets/images/aba2.png" />
                            <label class="label mb-0 mt-2">{{
                              $t("currency")
                            }}</label>
                            <h4 class="text-bold py-0">USA</h4>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </div>
                  <v-divider />
                  <div class="function_footer mt-0 py-2">
                    <v-alert type="warning" v-model="alert" dismissible>
                      <span v-html="errorMessage" />
                    </v-alert>
                    <p class="float-left  grey--text py-3 mb-0">
                      {{ $t("standard_commercial_invoice") }}
                    </p>

                    <v-btn class="float-right save_print mx-1">
                      {{ $t("print") }}
                    </v-btn>
                    <v-btn class="float-right btn_delete mx-1">
                      {{ $t("delete") }}
                    </v-btn>
                    <v-btn class="float-right btn_save_draft mx-1">
                      {{ $t("edit") }}
                    </v-btn>
                  </div>
                  <v-divider />
                </v-form>
              </v-col>
              <v-col
                class="smallSide"
                sm="4"
                style="transition: .3s ease-in;"
                :class="{ hide_small_bar_class: isHideBar }"
              >
                <h3
                  style="color: #b3b5bc; font-size:20px;"
                  v-if="!isHideBar"
                  class="text-uppercase float-right mt-4"
                >
                  Help
                  <v-icon
                    onclick="window.history.go(-1); return false;"
                    style="cursor: pointer; color: #333; font-size: 40px;"
                    class="float-right mt-n1"
                    >close
                  </v-icon>
                </h3>

                <div
                  v-if="!isHideBar"
                  class="small_sidebar pa-6"
                  style="background-color:#F8F8F9;"
                >
                  <p class="grey--text mt-6 mb-2">
                    {{ $t("transaction_history") }}
                  </p>
                  <p class="mb-1">
                    {{ $t("last_edited_by") }} :
                    <span class="text-bold">Sim Chankiriroth</span>
                  </p>
                  <p class="mb-1">
                    {{ $t("last_edited_on") }} :
                    <span class="text-bold">20 May 2020 – 6:00 PM</span>
                  </p>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <LoadingMe
        :isLoading="showLoading"
        :fullPage="true"
        :myLoading="true"
        :alertMessage="loadingAlert"
        :color="loadingColorAlert"
        :alertText="loadingTextAlert"
      />
    </v-container>
  </v-app>
</template>

<script>
// import kendo from '@progress/kendo-ui'
import LoadingMe from "@/components/Loading";

export default {
  name: "CreditPurchase",
  components: {
    LoadingMe: LoadingMe,
  },
  data: () => ({
    isEdit: false,
    // LoadingMe
    showLoading: false,
    loadingAlert: false,
    loadingColorAlert: "",
    loadingTextAlert: "",
    selectedField: "selected",
    bill_date: "",
    alert: false,
    deposite: 1000,
    files: [],
    // Form validation
    valid: true,

    journal_types: [],
    suppliers_item: [],
    expense: ["Equal", "weighted"],
    journal_date: "",
    templates: [
      { title: "Draft" },
      { title: "Open" },
      { title: "Paid" },
      { title: "Partially Paid" },
    ],
    col_expand: 9,
    col_hide: 3,
    isHideBar: false,
    suppliers: ["Suppliers", "Customer", "Employee"],
    transaction: [
      {
        id: "12",
        name: "Purchase Order",
        no: "No.0024",
        price: "2,50000",
      },
      {
        id: "14",
        name: "Godd Recipt Note",
        no: "No.0024",
        price: "2,50000",
      },
    ],
    item_suppliers: [
      {
        name: "Subtotal",
        value: "10000.00",
      },
      {
        name: "Subtotal",
        value: "10000.00",
      },
      {
        name: "Subtotal",
        value: "10000.00",
      },
      {
        name: "Subtotal",
        value: "10000.00",
      },
      {
        name: "Subtotal",
        value: "10000.00",
      },
    ],
  }),
  methods: {
    savePrint() {},
    saveNew() {},
    saveClose() {},
    removeRow() {},
    generateNumber() {},
    errorMessage() {},
    addRow() {},
    accountDropDownEditor() {},
    cancel() {},
    hideSmallSideBar() {
      this.isHideBar = !this.isHideBar;
    },
  },
  watch: {
    // call again the method if the route changes
  },
  computed: {
    areAllSelected() {
      return this.products.findIndex((item) => item.selected === false) === -1;
    },
    columns() {
      return [
        {
          field: "selected",
          width: "50px",
          headerSelectionValue: this.areAllSelected,
        },
        ...this.suppliers_item,
      ];
    },
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    // this.loadObj()
  },
  mounted() {},
};
</script>

<style scoped>
.function_wrapper {
  box-shadow: none !important;
}

.v-application--is-ltr .v-text-field .v-input__append-inner {
  margin-top: 0 !important;
}

.v-input__slot {
  background-color: #fff !important;
}

.function_content .label {
  margin-bottom: 10px;
  display: inline-block;
}

.border_radius10 {
  border-radius: 10px !important;
  background-color: #f2f2f2;
}

.pa-3.v-card h4 {
  font-size: 18px;
  color: #333;
}

.pa-3.v-card p {
  font-size: 12px;
  color: #b5b5b5;
}



@media (min-width: 1264px) {
  .container {
    max-width: 1250px;
  }
}

@media (max-width: 576px) {
  .pt-6.col-sm-5.col-12 {
    padding-top: 0 !important;
  }

  .code_text {
    width: 100%;
  }

  .phone_no_pt {
    padding-top: 0 !important;
  }

  .select_template,
  .save_option {
    margin-bottom: 10px;
  }
}

.hide_small_bar_class {
  max-width: 0%;
  transition: 0.5s ease-in;
  flex: 0 0 0%;
}

.hide_big_bar_class {
  max-width: 100%;
  transition: 0.5s ease-in;
  flex: 0 0 100%;
}

.info_add {
  background-color: #ffffff;
}

.small_sidebar {
  height: 90%;
  margin-top: 15.4%;
  position: relative;
  padding: 10px;
  background-color: #edf1f5;
}

.small_sidebar {
  height: 98%;
  position: relative;
  padding: 12px;
  background-color: #edf1f5;
}

.iconArrow {
  right: -27px;
  position: absolute;
  top: 54px;
}

.iconArrowHide {
  position: absolute;
  right: -7px;
  top: 54px;
}
.bigSide {
  position: relative;
}

.lb_bold {
  font-size: 12px;
}
.detial_smallside_p {
  position: absolute;
  bottom: 10px;
}
.card_background {
  background-color: #edf1f5;
  min-height: 120px;
}

.checkbox_inv {
  padding: 2px;
  margin-top: 3px;
  margin-right: 2px;
}
.exp_select {
  font-size: 12px !important;
}


.function_content {
  padding: 0;
  border-bottom: 1px solid #ddd;
  background-color: #ffffff !important;
}

</style>
