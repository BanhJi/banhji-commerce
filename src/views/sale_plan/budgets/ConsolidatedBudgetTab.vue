<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0 pb-md-0">
      <div style="background-color: #fff;">
        <v-tabs>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down ">
              {{ $t("consolidated") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down ">
              {{ $t("consolidated_performance_b") }}
            </span>
          </v-tab>
          <v-tab-item>
            <v-row>
              <v-col sm="12" cols="12" class="pl-3 pt-0">
                <ConsolidatedBudget />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col sm="12" cols="12" class="pl-3 pt-0">
                <ConsolidatedBudgetPerformance />
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Cahsflow",
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
    ConsolidatedBudget: () => import('./ConsolidatedBudget'),
    ConsolidatedBudgetPerformance: ()=> import('./ConsolidatedBudgetPerformance'),
  },
};
</script>
<style scoped>
.arr_icon {
  color: #2ca01c;
}
.arr_icon1 {
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

p {
  color: rgba(0, 0, 0, 0.87);
}
</style>
