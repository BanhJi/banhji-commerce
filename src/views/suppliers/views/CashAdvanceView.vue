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
                      {{ $t("cash_advance") }}
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
                          {{ Helper.dateFormat(cashAdvance.advance_date) }}
                        </h3>

                        <label class="label">{{ $t("txn_currency") }}</label>
                        <h3 class="text-bold py-1">
                          {{ cashAdvance.currency.code }} -
                          {{ cashAdvance.currency.name }}
                        </h3>
                        <label class="label">{{ $t("description") }}</label>
                        <h3 class="text-bold py-1">
                          {{ cashAdvance.description }}
                        </h3>
                      </v-col>
                      <v-col sm="7" cols="12" class="pb-0">
                        <v-row>
                          <v-col sm="6" cols="12" class="py-0">
                            <label class="label">{{
                              $t("advance_request")
                            }}</label>
                            <h3 class="text-bold py-1">
                              {{ cashAdvance.ref_number }}
                            </h3>

                            <label class="label">{{
                              $t("expected_settlement_date")
                            }}</label>
                            <h3 class="text-bold py-1">
                              {{
                                Helper.dateFormat(
                                  cashAdvance.expected_settlement_date
                                )
                              }}
                            </h3>
                          </v-col>

                          <v-col sm="6" cols="12" class="pb-0 pt-0">
                            <label class="label">{{ $t("method") }}</label>
                            <h3 class="text-bold py-1">
                              {{ paymentMethod.name }}
                            </h3>

                            <label class="label">{{
                              $t("cash_advance_account")
                            }}</label>
                            <h3 class="text-bold py-1">
                              {{ cashAdvanceAccount.name }}
                            </h3>
                            <div v-if="this.$store.state.accounting.secondaryAccount">
                              <label class="label">{{
                                $t("s_account")
                              }}</label>
                              <h3 class="text-bold py-1">
                                {{ secondaryAccount.name }}
                              </h3>
                            </div>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-row
                    style="
											background-color: rgb(
												255,
												255,
												255
											);
											width: 100%;
											margin: 0 auto 0px;
										"
                  >
                    <v-col sm="12" cols="12" class="pb-3 pa-0">
                      <kendo-datasource
                        ref="cashAdvanceDetailDS"
                        :data="cashAdvanceDetails"
                        page="1"
                        page-size="10"
                      />

                      <kendo-grid
                        id="grid"
                        class="grid-function"
                        :data-source-ref="'cashAdvanceDetailDS'"
                        :noRecords="true"
                        :column-menu="true"
                        :pageable-page-sizes="true"
                        :pageable-button-count="5"
                      >
                        <kendo-grid-column
                          :title="$t('no.')"
                          :template="rowNumberTmpl"
                          :width="45"
                          :column-menu="false"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5;',
                            class: 'text-products',
                          }"
                          :attributes="{
                            style: 'text-align: products',
                          }"
                        />
                        <kendo-grid-column
                          :field="'account'"
                          :title="$t('account')"
                          :width="200"
                          :template="'<span>#=account.name#</span>'"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
													:field="'secondary_account'"
													:title="$t('s_account')"
													:template="
														this.$store.state.accounting.accountLanguage ===
														'English'
															? '<span>#=secondary_account.number#</span> <span>#=secondary_account.name#</span>'
															: '<span>#=secondary_account.number#</span> <span>#=secondary_account.local_name#</span>'
													"
													:width="200"
													:hidden="!this.$store.state.accounting.secondaryAccount"
													:headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
												/>
                        <kendo-grid-column
                          :field="'description'"
                          :title="$t('description')"
                          :width="200"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'ref_number'"
                          :title="$t('reference_no')"
                          :width="160"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'amount'"
                          :title="$t('amount')"
                          :format="'{0:n}'"
                          :width="150"
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                          :attributes="{
                            style: 'text-align: right; ',
                          }"
                        />
                      </kendo-grid>
                    </v-col>
                  </v-row>
                  <v-row>
                      <v-col sm="12" cols="12">
                          <Attachment :initAccount="attachment"/>
                      </v-col>
                  </v-row>
                  <!-- And Body -->
                  <v-divider />
                  <v-card outlined dense class="no_border function_footer py-2">
                    <v-btn
                      class="float-right save_option mx-1 capitalize"
                      color="secondary"
                      @click="_print(2)"
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
                      v-if="cashAdvance.is_settled !== 1"
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
                      {{ Number(totalAmount).toLocaleString() }}
                    </h3>
                  </v-card>

                  <!-- <v-divider class="my-2" /> -->
                  <div
                    class="mb-3"
                    style="
											height: 3px;
											background-color: #ffffff;
											width: 100%;
										"
                  ></div>
                  <v-row>
                    <v-col sm="12" cols="6" class="py-2">
                      <label class="label">{{
                        $t("business_unit_segement")
                      }}</label>
                      <h4 class="text-bold py-1">
                        {{ segment.name }}
                      </h4>
                    </v-col>
                    <v-col sm="12" cols="6" class="py-2">
                      <label class="label">{{ $t("location") }}</label>
                      <h4 class="text-bold py-1">{{ location.name }}</h4>
                    </v-col>
                    <v-col sm="12" cols="6" class="py-2">
                      <label class="label">{{ $t("project") }}</label>
                      <h4 class="text-bold py-1">{{ project.name }}</h4>
                    </v-col>
                    <v-col sm="12" cols="6" class="py-2">
                      <label class="label">{{ $t("default_employee") }}</label>
                      <h4 class="text-bold py-1">{{ employee.name }}</h4>
                    </v-col>
                    <v-col sm="12" cols="6" class="py-2">
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
                        formdate(cashAdvance.modified_date? cashAdvance.modified_date: cashAdvance.created_date)
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
                  <p>{{ $t("cash_advance_view_desc") }}</p>
                  <div
                    class="my-2 mt-3"
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
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import {
  CashAdvanceModel,
  CashAdvanceDetailModel,
  AccountModel,
  ContactModel,
  ProjectModel,
  SegmentModel,
  LocationModel,
  PaymentMethodModel,
} from "@/scripts/model/AppModels";
import ResponseDataModel from "@/scripts/model/ResponseData";

const { cashAdvanceHandler } = require("@/scripts/AppHandlers");
const { AccountTypeCode } = require("@/scripts/default_setup/Collections");
// from
const { getFormSetting } = require("@/scripts/settingsHandler.js");
import { print } from "@/form/Expense.js";
import { i18n } from "@/i18n";

export default {
  name: "CashAdvanceView",
  components: {
    LoadingMe: () => import("@/components/Loading"),
    Attachment: () => import('@/components/Attachment')
  },
  props: {
    initCashAdvance: {
      type: CashAdvanceModel,
    },
  },
  data: () => ({
    // Obj
    cashAdvance: new CashAdvanceModel(),
    cashAdvanceDetails: [],
    employee: new ContactModel(),
    paymentMethod: new PaymentMethodModel(),
    cashAdvanceAccount: new AccountModel(),
    secondaryAccount: new AccountModel(),
    project: new ProjectModel(),
    segment: new SegmentModel(),
    location: new LocationModel(),
    totalAmount: 0,
    // Other
    Helper: Helper,
    showLoading: false,
    // Sidebar
    isHideBar: false,
    attachment: {
        uuid: "",
        name: ""
    }
  }),
  methods: {
    // Load cashAdvance according to query string {id}
    loadObj() {
      // Access Query String
      let q = this.$route.params;
      this.attachment = {
          uuid: this.$route.params.id,
          name: ""
      }
      if (q.id !== undefined) {
        if (q.id !== this.cashAdvance.uuid) {
          this.showLoading = true;

          cashAdvanceHandler
            .getOne(q.id)
            .then((res) => {
              let responseData = new ResponseDataModel(res);
              this.cashAdvance = new CashAdvanceModel(responseData.data);
              this.bindData();
            })
            .finally(function() {
              // self.showLoading = false;
            });
        }
      }
    },
    async bindData() {
      // Bind Obj
      let secondaryAccounts = await this.$store.dispatch("accounting/getSecondaryAccounts"),
        entries = [];
      this.cashAdvance.details.forEach((value) => {
        if (value.amount < 0) {
          // Cr side
          let detail = new CashAdvanceDetailModel(value);
          detail.amount = value.amount * -1;
          
          /* Secondary Account */
					detail.secondary_account = new AccountModel(
						secondaryAccounts.find((i) => i.uuid === value.secondary_acc_uuid)
					);

          entries.push(detail);
        } else {
          // Dr side
          // Cash Advance Account
          if (
            value.account.account_type.code === AccountTypeCode.CASH_ADVANCE
          ) {
            this.cashAdvanceAccount = new AccountModel(value.account);
            this.totalAmount = value.amount;

            /* Secondary Account */
            this.secondaryAccount = new AccountModel(
              secondaryAccounts.find((i) => i.uuid === value.secondary_acc_uuid)
            );
          }
        }
      });

      // Journal Entries
      this.cashAdvanceDetails = entries;

      // Employee
      this.employee = new ContactModel(this.cashAdvance.requested_by);

      // Payment Method
      this.paymentMethod = new PaymentMethodModel(
        this.cashAdvanceDetails[0].payment_method
      );

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

      this.showLoading = false;
    },
    // Row Number Template
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.cashAdvanceDetailDS.kendoWidget(),
        index = ds.indexOf(dataItem);

      return index + 1;
    },
    getCashAdvance() {
      return new CashAdvanceModel(this.cashAdvance);
    },
    edit() {
      this.$router.replace({
        name: "Cash Advance",
        params: { initCashAdvance: this.getCashAdvance() },
      });
    },
    _print(id) {
		let data_print = {}
		data_print['cashAdvanceDetails'] = this.cashAdvanceDetails
		data_print['cashAdvance'] = this.cashAdvance
		data_print['currency'] = this.cashAdvance.currency
		data_print['paymentMethod'] = this.paymentMethod
		data_print['project'] = this.project
		data_print['location'] = this.location
		data_print['segment'] = this.segment
		data_print['employee'] = this.employee
		data_print['total'] =  this.totalAmount
		let params = "?formType=Advance Voucher";
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
    formdate(val){
      return kendo.toString(new Date(val), `dd-MM-yyyy h:mm:ss tt`)
    }
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
