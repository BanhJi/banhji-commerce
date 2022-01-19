<template>
  <v-row>
    <v-col sm="12" class="pb-0" cols="12">
      <v-tabs
        vertical
        class="tab_setting"
        slider-color="grayBg"
        slider-size="7"
        :class="{
          tab_product_service_hide: isHide,
          tab_product_service_show: !isHide,
        }"
      >
        <span class="hideAbs">
          <v-icon size="16" class="arr_icon" @click="hideTabs" v-if="!isHide"
            >mdi-chevron-left-circle
          </v-icon>
          <v-icon size="16" class="arr_icon1" @click="hideTabs" v-if="isHide"
            >mdi-chevron-right-circle
          </v-icon>
        </span>
        <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("profit_loss") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("receipts_payments") }}
          </span>
        </v-tab>
        <!-- <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("expenditure_statement") }}
          </span>
        </v-tab> -->
        <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("usage_fund") }}
          </span>
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <StatementProfiltLost />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <ReceiptsPayments/>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <!-- <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <ExpenditureSatement />
            </v-card-text>
          </v-card>
        </v-tab-item> -->
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <UsageFund/>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PositionTabs",
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
    StatementProfiltLost: () => import("./peformance/profit_loss/StatementProfiltLost"),
    // ExpenditureSatement: () => import("./peformance/expenditure_statement/ExpenditureSatement.vue"),
    ReceiptsPayments: () => import("./peformance/receipts_payments/ReceiptsPayments.vue"),
    UsageFund: () => import("/src/views/report_npo_ps/peformance/usage_fund/UsageFund.vue"),
  },
};
</script>
<style scoped>
v-tab {
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
.theme--light.v-card > .v-card__text,
.theme--light.v-card .v-card__subtitle {
  color: rgba(0, 0, 0, 1) !important;
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
