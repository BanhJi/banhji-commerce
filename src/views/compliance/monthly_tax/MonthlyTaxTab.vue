<template>
  <v-row>
    <v-col sm="12" cols="12">
      <div style="background-color: #fff; padding: 0 0 5px;">
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
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("monthly_filling") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("balance_report") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("tax_payment") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("tax_credit") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("value_added_tax") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("taxes_on_salary") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("withholding_tax") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("transaction_records") }}
            </span>
          </v-tab>
          <!--                    <v-tab>-->
          <!--                        <span class="hidden-sm-and-up">-->
          <!--                            <v-icon left>mdi-pen</v-icon>-->
          <!--                        </span>-->
          <!--                        <span class="hidden-sm-and-down text-capitalize">-->
          <!--                            {{ $t('tax_agents') }}-->
          <!--                        </span>-->
          <!--                    </v-tab>-->
          <!--                    <v-tab>-->
          <!--                        <span class="hidden-sm-and-up">-->
          <!--                            <v-icon left>mdi-pen</v-icon>-->
          <!--                        </span>-->
          <!--                        <span class="hidden-sm-and-down text-capitalize">-->
          <!--                            {{ $t('tax_settings') }}-->
          <!--                        </span>-->
          <!--                    </v-tab>-->

          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <MonthlyFilling />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <BalanceReport />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <TaxPayment />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <TaxCredit />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <ValueAddedTaxTab />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <TaxOnSalary />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <WHT />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <RecordTab />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!--                    <v-tab-item>-->
          <!--                        <v-row>-->
          <!--                            <v-col sm="12" cols="12" class="pl-6 pt-0">-->
          <!--                                <TaxAgent/>-->
          <!--                            </v-col>-->
          <!--                        </v-row>-->
          <!--                    </v-tab-item>-->
          <!--                    <v-tab-item>-->
          <!--                        <v-row>-->
          <!--                            <v-col sm="12" cols="12" class="pl-6 pt-0">-->
          <!--                                <TaxSetting/>-->
          <!--                            </v-col>-->
          <!--                        </v-row>-->
          <!--                    </v-tab-item>-->
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
    clickMe(data) {
      // alert(data.link)
      this.$router.push(`${data.link}`);
      //this.$event.target.classList.toggle(active)
      //eslint-disable-next-line no-console
      console.log(data.link);
      //eslint-disable-next-line no-console
      //console.log(data)
    },
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    MonthlyFilling: () => import("./MonthlyFilling"),
    BalanceReport: () => import("./BalanceReport"),
    TaxPayment: () => import("./TaxPayment"),
    TaxCredit: () => import("./TaxCredit"),
    ValueAddedTaxTab: () => import("./ValueAddedTaxTab"),
    TaxOnSalary: () => import("./TaxOnSalary"),
    WHT: () => import("./WHT"),
    RecordTab: () => import("./RecordTab"),
    // TaxAgent: () => import('./TaxAgent'),
    // TaxSetting: () => import('./TaxSetting'),
  },
};
</script>
<style scoped>
.arr_icon {
  color: #2ca01c;
}
.arr_icon1 {
  color: #4c9aff;
  color: #2ca01c;
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
.tab_product_service_show.theme--light .v-slide-group__content {
  width: 140px !important;
}

p {
  color: rgba(0, 0, 0, 0.87);
}
</style>
