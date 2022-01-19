<template>
  <v-row>
    <v-col cols="12" sm="12" class="pt-3">
      <v-row>
        <v-col cols="12" sm="12" class="py-0">
          <h2 class="mb-3 font_20 float-left">
            {{ $t("variance_report") }}
          </h2>
        </v-col>
        <v-col cols="12" sm="12" class="py-0">
          <v-row>
            <v-col cols="12" sm="4" class="py-0">
              <label class="label pr-3">{{ $t("account_type") }}</label>
              <app-account-type-dropdownlist
                :initAccountType="accountType"
                @emitAccountType="accountType = $event"
                @onChanged="onAccountTypeChanges"
              />
            </v-col>
            <v-col cols="12" sm="4" class="py-0">
              <label class="label pr-3">{{ $t("account_group") }}</label>
              <app-account-group-dropdownlist
                :initAccountGroup="accountGroup"
                @emitAccountGroup="accountGroup = $event"
                :initAccountTypeCode="accountTypeCode"
              />
            </v-col>
            <v-col cols="12" sm="4" class="py-0">
              <label class="label pr-3">{{ $t("segment") }}</label>
              <app-segment-dropdownlist
                :initialSegment="segment"
                @emitSegment="segment = $event"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4" class="py-0">
              <label class="label pr-3">{{ $t("base_month") }}</label>
              <app-month-of-picker
                :initMonthOf="baseMonthOf"
                @emitMonthOf="baseMonthOf = $event"
              />
            </v-col>
            <v-col cols="12" sm="4" class="py-0">
              <label class="label pr-3">{{ $t("compare_month") }}</label>
              <app-month-of-picker
                :initMonthOf="compareMonthOf"
                @emitMonthOf="compareMonthOf = $event"
              />
            </v-col>
            <v-col cols="12" sm="4" class="py-0">
              <v-btn
                color="primary"
                class="white--text mt-6 float-right"
                @click="search"
              >
                <i
                  class="b-search"
                  style="font-size: 18px; color: #fff !important"
                />
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col sm="12" cols="12" class="py-0">
          <v-row>
            <v-col cols="12" sm="8" class="py-0">
              <p class="mb-0 float-left">
                {{ $t("variance_report_desc") }}
              </p>
            </v-col>
            <v-col cols="12" sm="4" class="py-0">
              <app-variance-rule-dropdownlist
                :initVarianceRule="varianceRule"
                @emitVarianceRule="varianceRule = $event"
                @onChanged="applyRule"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col sm="12" cols="12" class="pb-0">
          <template>
            <v-data-table
              :headers="headers"
              :items="varianceReports"
              :items-per-page="50"
              sort-by="account.number"
              class="attachment_table elevation-1"
            >
              <!-- Account -->
              <template v-slot:[`item.account`]="{ item }">
                {{ item.account.number }} - {{ item.account.name }}
              </template>

              <!-- Base Amount -->
              <template v-slot:[`item.selectedMonthBalance`]="{ item }">
                <p class="pt-5 text-right font_14">
                  {{ Number(item.selectedMonthBalance).toLocaleString() }}
                </p>
              </template>

              <!-- Compare Amount -->
              <template v-slot:[`item.previouseMonthBalance`]="{ item }">
                <p class="pt-5 text-right font_14">
                  {{ Number(item.previouseMonthBalance).toLocaleString() }}
                </p>
              </template>

              <!-- Variance Amount -->
              <template v-slot:[`item.variance`]="{ item }">
                <p class="pt-5 text-right font_14">
                  {{ Number(item.variance).toLocaleString() }}
                </p>
              </template>

              <!-- Account -->
              <template v-slot:[`item.varianceRule`]="{ item }">
                {{ item.varianceRule !== null ? item.varianceRule.name : "" }}
              </template>
            </v-data-table>
          </template>

          <LoadingMe
            :isLoading="showLoading"
            :fullPage="true"
            :myLoading="true"
            :alertMessage="loadingAlert"
            :color="loadingColorAlert"
            :alertText="loadingTextAlert"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui";
import {
  VarianceRuleModel,
  AccountTypeModel,
  AccountGroupModel,
  SegmentModel,
} from "@/scripts/model/AppModels";

const { varianceReportHandler } = require("@/scripts/AppHandlers");

export default {
  components: {
    LoadingMe: () => import("@/components/Loading"),
    "app-month-of-picker": () =>
      import("@/components/kendo_templates/MonthOfPicker"),
    "app-variance-rule-dropdownlist": () =>
      import("@/components/kendo_templates/VarianceRuleDropDownList"),
    "app-account-type-dropdownlist": () =>
      import("@/components/dropdownlist/AccountType"),
    "app-account-group-dropdownlist": () =>
      import("@/components/dropdownlist/AccountGroup"),
    "app-segment-dropdownlist": () =>
      import("@/components/dropdownlist/Segment"),
  },
  data: () => ({
    baseMonthOf: new Date().toISOString().substr(0, 7),
    compareMonthOf: new Date().toISOString().substr(0, 7),
    varianceRule: new VarianceRuleModel(),
    accountType: new AccountTypeModel(),
    accountGroup: new AccountGroupModel(),
    segment: new SegmentModel(),
    accountTypeCode: 0,
    headers: [
      { text: i18n.t("account"), value: "account" },
      { text: i18n.t("base_month"), value: "selectedMonthBalance" },
      { text: i18n.t("compare_month"), value: "previouseMonthBalance" },
      { text: i18n.t("variance"), value: "variance" },
      { text: i18n.t("variance_rule"), value: "varianceRule" },
    ],
    varianceReports: [],
    varianceReportList: [],
    // LoadingMe
    showLoading: false,
    loadingAlert: false,
    loadingColorAlert: "",
    loadingTextAlert: "",
  }),
  methods: {
    // On Account Type Changes
    onAccountTypeChanges() {
      this.accountTypeCode = this.accountType.code;
    },
    // Search
    search() {
      // Empty dataSource
      this.varianceReports = [];
      this.varianceRule = new VarianceRuleModel();

      if (this.baseMonthOf && this.compareMonthOf) {
        // Query
        this.showLoading = true;
        varianceReportHandler
          .getReport({
            params: {
              month_of: kendo.toString(new Date(this.baseMonthOf), "yyyy-MM"),
              compare_month_of: kendo.toString(
                new Date(this.compareMonthOf),
                "yyyy-MM"
              ),
              acc_type_code: this.accountType.code,
              acc_group_code: this.accountGroup.code,
              segment_uuid: this.segment.uuid,
            },
          })
          .then((res) => {
            if (res.data) {
              this.varianceReports = res.data;
              this.varianceReportList = res.data;
            }
          })
          .finally(() => {
            this.showLoading = false;
          });
      }
    },
    applyRule() {
      if (this.varianceRule.uuid !== "") {
        let varianList = [];

        this.varianceReportList.forEach((value) => {
          switch (this.varianceRule.rule.toLowerCase()) {
            case "amount": // Amount Rule
              if (Math.abs(value.variance) >= this.varianceRule.value) {
                varianList.push(value);
              }
              break;

            case "percentage": // Percentage Rule
              var amtInPercentage = 0;
              if (value.previouseMonthBalance !== 0) {
                amtInPercentage =
                  (value.selectedMonthBalance - value.previouseMonthBalance) /
                  value.previouseMonthBalance;

                if (Math.abs(amtInPercentage) >= this.varianceRule.value) {
                  varianList.push(value);
                }
              } else {
                if (value.selectedMonthBalance !== 0) {
                  varianList.push(value);
                }
              }
              break;

            default:
              break;
          }
        });

        // Bind variance report by rule
        this.varianceReports = varianList;
      }
    },
  },
};
</script>
<style scoped>
.attachment_table.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th,
.attachment_table.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td {
  border-right: none !important;
}
@media (max-width: 576px) {
  .mt-6 {
    margin-top: 0 !important;
    margin-bottom: 15px;
  }
  .row + .row {
    margin-top: 0 !important;
  }
}
</style>