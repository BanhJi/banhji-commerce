<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col sm="12" cols="12">
          <v-card
            outlined
            dense
            class="pa-4 no_border rounded-sm"
            color="white"
          >
            <v-row>
              <v-col
                class="bigSide py-0"
                sm="8"
                cols="12"
                style="transition: 0.3s ease-in"
                :class="{ hide_big_bar_class: isHideBar }"
              >
                <v-form ref="form">
                  <v-card outlined dense class="no_border">
                    <h2 class="mb-0">
                      {{ $t("advance_request") }}
                    </h2>
                    <v-icon
                      v-if="isHideBar"
                      onclick="window.history.go(-1); return false;"
                      style="
												cursor: pointer;
												color: #333;
												font-size: 40px;
											"
                      class="float-right"
                      >close
                    </v-icon>
                    <span
                      style="
												transition: 0.3s ease-in;
												z-index: 10;
											"
                      :class="{
                        iconArrow: !isHideBar,
                        iconArrowHide: isHideBar,
                      }"
                    >
                      <v-icon
                        size="22"
                        class="arr_icon"
                        @click="hide_smallsitebar"
                        v-if="isHideBar"
                      >
                        mdi-chevron-left-circle
                      </v-icon>
                      <v-icon
                        size="22"
                        class="arr_icon"
                        @click="hide_smallsitebar"
                        v-if="!isHideBar"
                      >
                        mdi-chevron-right-circle
                      </v-icon>
                    </span>
                  </v-card>
                  <!-- Body -->
                  <v-card
                    outlined
                    dense
                    class="px-3 no_border mb-3"
                    color="grayBg"
                  >
                    <v-row>
                      <v-col sm="5" cols="12" class="pb-0">
                        <label class="label">{{ $t("date") }}</label>
                        <h3 class="text-bold py-1">
                          {{ Helper.dateFormat(cashAdvance.requested_date) }}
                        </h3>

                        <label class="label">{{ $t("number") }}</label>
                        <h3 class="text-bold py-1">
                          {{ Helper.dateFormat(cashAdvance.ref_number) }}
                        </h3>

                        <label class="label">{{ $t("txn_currency") }}</label>
                        <h3 class="text-bold py-1">
                          {{ cashAdvance.currency.code }} -
                          {{ cashAdvance.currency.name }}
                        </h3>
                      </v-col>
                      <v-col sm="7" cols="12" class="pb-0">
                        <v-row>
                          <v-col sm="6" cols="12" class="pb-0 pt-0">
                            <label class="label">{{
                              $t("expected_date")
                            }}</label>
                            <h3 class="text-bold py-1">
                              {{ Helper.dateFormat(cashAdvance.expected_date) }}
                            </h3>

                            <label class="label">{{
                              $t("request_amount")
                            }}</label>
                            <h3 class="text-bold py-0">
                              {{
                                Number(
                                  cashAdvance.request_amount
                                ).toLocaleString()
                              }}
                            </h3>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>

                    <!-- Purpose -->
                    <v-row>
                      <v-col sm="12" cols="12" class="pb-0">
                        <label class="label"
                          >{{ $t("request_purpose") }}:
                        </label>

                        <span v-html="cashAdvance.purpose" />
                      </v-col>
                    </v-row>
                  </v-card>
                  <!-- And Body -->
                  <v-divider />
                  <v-card outlined dense class="no_border function_footer py-2">
                    <v-btn
											class="float-right save_option mx-1 capitalize"
											color="secondary"
                      @click="_print(5)"
										>
											{{ $t("print") }}
										</v-btn>
                    <!-- <v-btn
											class="float-right mx-1 white--text capitalize"
											color="blue"
										>
											{{ $t("delete") }}
										</v-btn> -->
                    <v-btn
                      class="float-right mx-1 white--text capitalize"
                      color="primary"
                      @click="edit"
                    >
                      {{ $t("edit") }}
                    </v-btn>
                  </v-card>
                  <v-divider />
                </v-form>
              </v-col>
              <v-col
                class="smallSide"
                sm="4"
                style="transition: 0.3s ease-in"
                :class="{ hide_small_bar_class: isHideBar }"
              >
                <h3
                  style="color: #b3b5bc; font-size: 20px"
                  v-if="!isHideBar"
                  class="text-uppercase float-right mt-n3"
                >
                  Help
                  <v-icon
                    onclick="window.history.go(-1); return false;"
                    style="
											cursor: pointer;
											color: #333;
											font-size: 40px;
										"
                    class="float-right mt-n1"
                    >close
                  </v-icon>
                </h3>

                <div v-if="!isHideBar" class="small_sidebar mt-9 px-4 grayBg">
                  <v-card
                    class="pa-3 my_card no-boxshadow"
                    color="primary"
                    style="min-height: 60px;"
                  >
                    <h3
                      style="font-size: 14px"
                      class="text-white text-uppercase mb-0"
                    >
                      {{ $t("total_amount") }}
                    </h3>
                    <h3
                      class="text-bold float-right text-white"
                      style="font-size: 22px"
                    >
                      {{ Number(cashAdvance.request_amount).toLocaleString() }}
                    </h3>
                  </v-card>
                  <!-- <v-divider class="my-2" /> -->
                  <div
                    class="mb-1"
                    style="
											height: 3px;
											background-color: #ffffff;
											width: 100%;
										"
                  ></div>
                  <v-row>
                    <v-col sm="12" cols="6" class="py-0">
                      <label class="label">{{ $t("project") }}</label>
                      <h4 class="text-bold py-1">{{ project.name }}</h4>
                    </v-col>
                    <v-col sm="12" cols="6" class="py-0">
                      <label class="label">{{ $t("location") }}</label>
                      <h4 class="text-bold py-1">
                        {{ location.name }}
                      </h4>
                    </v-col>
                    <v-col sm="12" cols="6" class="py-0">
                      <label class="label">{{
                        $t("business_unit_segement")
                      }}</label>
                      <h4 class="text-bold py-1">
                        {{ segment.name }}
                      </h4>
                    </v-col>
                    <v-col sm="12" cols="6" class="py-0">
                      <label class="label">{{ $t("defaul_employee") }}</label>
                      <h4 class="text-bold py-1">{{ employee.name }}</h4>
                    </v-col>
                    <v-col sm="12" cols="6" class="py-0">
                      <label class="label">{{ $t("for_the_month_of") }}</label>
                      <h4 class="text-bold py-1">
                        {{ cashAdvance.month_of }}
                      </h4>
                    </v-col>
                  </v-row>
                  <div
                    class="my-2 mt-3"
                    style="
											height: 3px;
											background-color: #ffffff;
											width: 100%;
										"
                  ></div>

                  <!-- <v-divider class="my-2 mt-3" /> -->
                  <p class="mb-1" color="color_grey">
                    {{ $t("transaction_history") }}
                  </p>
                  <p class="mb-1">
                    {{ $t("last_edited_by") }} :
                    <span class="text-bold">
                      {{
                        cashAdvance.modified_by.first_name === ""
                          ? cashAdvance.created_by.first_name +
                            " " +
                            cashAdvance.created_by.last_name
                          : cashAdvance.modified_by.first_name +
                            " " +
                            cashAdvance.modified_by.last_name
                      }}
                    </span>
                  </p>
                  <p class="mb-1">
                    {{ $t("last_edited_on") }} :
                    <span class="text-bold">
                      {{
                        cashAdvance.modified_date
                          ? cashAdvance.modified_date
                          : cashAdvance.created_date
                      }}
                    </span>
                  </p>
                  <div
                    class="my-3"
                    style="
											height: 3px;
											background-color: #ffffff;
											width: 100%;
										"
                  ></div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true" />
    </v-container>
  </v-app>
</template>

<script>
// import { i18n } from "@/i18n";
// import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import {
  CashAdvanceModel,
  ContactModel,
  ProjectModel,
  SegmentModel,
  LocationModel,
  CurrencyModel,
} from "@/scripts/model/AppModels";

const { cashAdvanceHandler } = require("@/scripts/AppHandlers");

const { getFormSetting } = require("@/scripts/settingsHandler.js");
import { print } from "@/form/Expense.js";
import { i18n } from "@/i18n";

export default {
  name: "AdvanceRequestView",
  components: {
    LoadingMe: () => import("@/components/Loading"),
  },
  props: {
    initCashAdvance: {
      type: CashAdvanceModel,
    },
  },
  data: () => ({
    // Obj
    cashAdvance: new CashAdvanceModel(),
    employee: new ContactModel(),
    project: new ProjectModel(),
    segment: new SegmentModel(),
    location: new LocationModel(),
    // Other
    Helper: Helper,
    showLoading: false,
    // Sidebar
    isHideBar: false,
  }),
  methods: {
    // Load advance request according to query string {id}
    loadObj() {
      let self = this;

      // Access Query String
      let q = this.$route.params;
      if (q.id !== undefined) {
        if (q.id !== this.cashAdvance.uuid) {
          this.showLoading = true;

          cashAdvanceHandler
            .getOne(q.id)
            .then((res) => {
              this.cashAdvance = new CashAdvanceModel(res.data);
              this.bindData();
            })
            .finally(() => {
              self.showLoading = false;
            });
        }
      }
    },
    async bindData() {
      // Employee
      this.employee = new ContactModel(this.cashAdvance.requested_by);

      // Currency
      this.cashAdvance.currency = new CurrencyModel(this.cashAdvance.currency);

      // Sidebar
      let segments = await this.$store.dispatch("segments/getList");
      this.segment = new SegmentModel(
        segments.find((i) => i.id === this.cashAdvance.segment_uuid)
      );

      let projects = await this.$store.dispatch("projects/getList");
      this.project = new ProjectModel(
        projects.find((i) => i.id === this.cashAdvance.project_uuid)
      );

      let locations = await this.$store.dispatch("locations/getList");
      this.location = new LocationModel(
        locations.find((i) => i.id === this.cashAdvance.location_uuid)
      );
    },
    getCashAdvance() {
      return new CashAdvanceModel(this.cashAdvance);
    },
    edit() {
      this.$router.replace({
        name: "Advance Request",
        params: { initCashAdvance: this.getCashAdvance() },
      });
    },
    hide_smallsitebar() {
      if (!this.isHideBar) {
        // this.col_expand = 12
        // this.col_hide = 0
        this.isHideBar = true;
      } else {
        // this.col_expand = 9
        // this.col_hide = 3
        this.isHideBar = false;
      }
    },
    async _print(id) {
      let data_print = {};

      data_print["cashAdvance"] = this.cashAdvance;
      data_print["currency"] = this.cashAdvance.currency;
      data_print["employee"] = this.employee;
      data_print["project"] = this.project;
      data_print["location"] = this.location;
      data_print["segment"] = this.segment;

      let params = "?formType=Advance Request";
      getFormSetting(params).then((res) => {
        if (res.data.statusCode === 200) {
          if (res.data.data.length > 0) {
            print(data_print, id, res.data.data["0"].settings);
          } else {
            this.$snotify.error(i18n.t("please_save_form_in_setting"));
          }
        }
      });
    },
  },
  watch: {
    // call again the method if the route changes
    $route: "loadObj",
    initCashAdvance() {
      if (this.initCashAdvance) {
        this.cashAdvance = this.initCashAdvance;
        this.bindData();
      }
    },
  },
  mounted() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.loadObj();
  },
};
</script>

<style scoped>
.small_sidebar {
  height: 98%;
  position: relative;
  padding: 12px;
  background-color: #edf1f5;
}
.hide_small_bar_class {
  max-width: 0;
  transition: 0.3s ease-in;
  flex: 0 0 0;
}

.hide_big_bar_class {
  max-width: 100%;
  transition: 0.3s ease-in;
  flex: 0 0 100%;
}

.iconArrow {
  right: -35px;
  position: absolute;
  bottom: -10px;
}
.iconArrowHide {
  position: absolute;
  right: -7px;
  bottom: -10px;
}

@media (min-width: 1264px) {
  .container {
    max-width: 1250px;
  }
}

@media (max-width: 576px) {
  .mb-6 {
    margin-bottom: 0 !important;
  }
}
</style>
