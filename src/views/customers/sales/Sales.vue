<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-4 pb-md-0">
      <div style="background-color: #fff;">
        <v-tabs
          vertical
          class="tab_setting auto_item_tabs"
          slider-color="grayBg"
          slider-size="7"
          :class="{
            tab_product_service_hide: isHide,
            tab_product_service_show: !isHide,
          }"
        >
          <span class="hideAbs">
            <v-icon size="16" class="arr_icon" @click="hideTabs" v-if="!isHide">
              mdi-chevron-left-circle
            </v-icon>
            <v-icon size="16" class="arr_icon1" @click="hideTabs" v-if="isHide">
              mdi-chevron-right-circle
            </v-icon>
          </span>
          <!-- <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("sale_insight") }}
            </span>
          </v-tab> -->
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("sale_recurring_invoice") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("margin_analysis") }}
            </span>
          </v-tab>
          <!-- <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("pricing_management") }}
            </span>
          </v-tab> -->

          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("sale_discounts") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("sale_channels") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="text-capitalize text-left">
              {{ $t("credit_memo") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("sale_unit") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("other_charges") }}
            </span>
          </v-tab>
<!--          <v-tab>-->
<!--            <span class="hidden-sm-and-up">-->
<!--              <v-icon left>mdi-pen</v-icon>-->
<!--            </span>-->
<!--            <span class="hidden-sm-and-down text-capitalize">-->
<!--              {{ $t("delivery_agencies") }}-->
<!--            </span>-->
<!--          </v-tab>-->
          <!-- <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("late_fees") }}
            </span>
          </v-tab> -->

          <!-- <v-tab-item>
            <v-row>
              <v-col sm="12" cols="12" class="pl-5 pt-0">
                <SaleInsight />
              </v-col>
            </v-row>
          </v-tab-item> -->
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <SaleReportsAnalysis />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <MarginAnalysisTabs />
              </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <PricingManagement />
              </v-card-text>
            </v-card>
          </v-tab-item> -->

          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <SaleDiscount />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <SaleChannels />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!-- <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-5 pt-0">
                                <SalePlans/>
                            </v-col>
                        </v-row>
          </v-tab-item> -->
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <CreditMemo />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <SaleUnitItemsTab />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <OtherCharges />
              </v-card-text>
            </v-card>
          </v-tab-item>
<!--          <v-tab-item>-->
<!--            <v-card flat>-->
<!--              <v-card-text class="pt-0 pr-0">-->
<!--                <DeliveryAgencies />-->
<!--              </v-card-text>-->
<!--            </v-card>-->
<!--          </v-tab-item>-->
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Sales",
  data: () => ({
    isHide: false,
  }),
  props: {},
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    // SaleInsight: () => import("./SaleInsight"),
    SaleReportsAnalysis: () =>
      import("./sale_reports_analysis/SaleReportsAnalysis"),
    // RecurringInvoices: () => import("./RecurringInvoices"),
    // PricingManagement: () => import("./pricing_management/PricingManagement"),
    CreditMemo: () =>
      import("./sale_reports_credit_memo/SaleReportsMemoAnalysis"),
    SaleDiscount: () => import("./sale_discounts/SaleDiscount"),
    SaleChannels: () => import("./sale_channels/SaleChannels"),
    // SalePlans: () => import("./sale_plans/SalePlans"),
    OtherCharges: () => import("./other_charges/OtherCharges"),
    // LateFees: () => import("./late_fees/LateFees"),
    SaleUnitItemsTab: () => import("./sale_unit_items/SaleUnitItemsTab"),
    MarginAnalysisTabs: () => import("./margin_analysis/MarginAnalysisTabs"),
    // DeliveryAgencies: () => import("./delivery_agencies/DeliveryAgencies"),
  },
};
</script>
<style scoped>
.auto_item_tabs .v-tabs-bar .v-tab {
  height: auto !important;
  margin-top: 4px;
  padding-top: 6px;
  padding-bottom: 6px;
}
.v-tab {
  justify-content: left;
  font-size: 16px;
}

.v-tab--active {
  background-color: rgb(255, 255, 255);
}

.tab_setting .v-tab--active {
  font-weight: 700;
  color: #000;
}

.v-tab--active {
  background-color: #ffffff !important;
  border-bottom: 4px solid #92d050;
  border-left: none;
}

p {
  color: rgba(0, 0, 0, 0.87);
}
</style>
