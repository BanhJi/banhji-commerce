<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-4 pb-md-0">
      <div style="background-color: #fff;">
        <v-tabs
          vertical
          v-model="active_tab_in"
          class="tab_setting"
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
          <v-tab>
            <span class="text-capitalize text-left">
              {{ $t("payable_processing") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="text-capitalize text-left">
              {{ $t("reimburse_expense") }}
            </span>
          </v-tab>

          <v-tab>
            <span class=" text-capitalize text-left">
              {{ $t("advance_&settlement") }}
            </span>
          </v-tab>


          <!-- <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <Overview />
              </v-card-text>
            </v-card>
          </v-tab-item> -->
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <ExpneseProcessing />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <Reimbursement/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pr-0">
                <AdvanceSetlementTab/>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { data } from "@/observable/store";
export default {
  name: "Expnese",
  data: () => ({
    isHide: false,
    // active_tab:  data.vendor_tab.sub
    active_tab_in: data.vendor_tab_sub,
  }),
  props: {},
  computed: {
    active_tab() {
      return data.vendor_tab_sub;
    },
  },
  watch: {
    // active_tab() {
    //   this.active_tab_in = this.active_tab;
    // },
    // active_tab_in() {
    //   data.vendor_tab_sub = this.active_tab_in;
    // },
  },
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    // Overview: () => import('./Overview'),
    ExpneseProcessing: () => import("./expense_processing/ExpneseProcessing"),
    Reimbursement: () => import("./Reimbursement"),
    AdvanceSetlementTab: () => import("./advance_setlement/AdvanceSetlementTab")

  },
};
</script>
<style scoped>
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
  border-left: none;
}
.tab_product_service_show.theme--light .v-slide-group__content {
  width: 140px !important;
}

p {
  color: rgba(0, 0, 0, 0.87);
}
@media (max-width: 576px) {
  .tab_setting.theme--light.v-tabs.tab_setting > .v-tabs-bar {
    width: 55px !important;
  }
  .hideAbs {
    display: none !important;
  }
}
</style>
