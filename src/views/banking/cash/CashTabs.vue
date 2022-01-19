<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-4 pb-md-0">
      <v-tabs
        vertical
        class="tab_setting"
        slider-color="grayBg"
        v-model="active_tab_in"
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
            {{ $t("cash_position_overview") }}
          </span>
        </v-tab> -->
        <v-tab style="padding-left: 5px;">
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-left text-capitalize">
            {{ $t("cash_center") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("cash_movement") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize">
            {{ $t("cash_related_ratio") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize">
            {{ $t("reconcilation_report") }}
          </span>
        </v-tab>
        <!-- <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0">
              <CashPosition />
            </v-card-text>
          </v-card>
        </v-tab-item> -->
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0">
              <Center />
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0">
              <CashMovement />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pl-5 pt-0">
              <CashRelateRatio />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pl-5 pt-0">
              <ReconciliationReport />
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
import { data } from "@/observable/store";
export default {
  name: "",
  components: {
    // Overview: () => import("./Overview"),
    // CashFlow : () => import('./CashFlow'),
    // CashPosition : ()=> import("./CashPosition"),
    CashMovement: () => import("./CashMovement"),
    // Reports : () => import('./Reports'),
    // AdvanceSetlementTab: () =>
    //   import("./advance_setlement/AdvanceSetlementTab"),
    Center: () => import("./Center"),
    CashRelateRatio : () => import('./CashRelateRatio'),
    ReconciliationReport : () => import('./ReconciliationReport'),
  },
  data: () => ({
    isHide: false,
    // active_tab:  data.budget_tab.sub
    active_tab_in: data.budget_tab_sub,
  }),
  computed: {
    active_tab() {
      return data.budget_tab_sub;
    },
  },
  watch: {
    active_tab() {
      this.active_tab_in = this.active_tab;
    },
    active_tab_in() {
      data.budget_tab_sub = this.active_tab_in;
    },
  },
  methods: {
    clickMe(data) {
      this.$route.push(data.link);
    },
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
};
</script>
<style scoped>
/* .v-menu__content{
  top: 141px !important;
  left: 1098px !important;
} */
.v-menu__content .v-list .v-list-item {
  min-height: 35px !important;
}

.tab_wrapper {
  position: relative;
  display: inherit;
}

.v-tab {
  min-width: 30px;
  font-size: 20px;
  text-transform: capitalize;
}

.v-icon--left {
  margin-right: 0px;
}

.theme--light.v-tabs > .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.menuable__content__active {
  left: 448px !important;
}

.v-tab--active {
  background-color: #e5effa;
  color: #000;
}

.theme--light.v-tabs >>> .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

</style>
