<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0 pb-md-0">
      <v-tabs>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-uppercase">
            {{ $t("list") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-uppercase">
            {{ $t("detail") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-uppercase">
            {{ $t("analysis") }}
          </span>
        </v-tab>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class="pt-0">
              <ListOfBudget />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class=" pt-0">
              <DetailBudgetBreakDown />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col sm="12" cols="12" class=" pt-0">
              <BudgetPerformance />
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
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
    ListOfBudget: () => import("./ListOfBudget"),
    DetailBudgetBreakDown: () => import("./DetailBudgetBreakDown"),
    BudgetPerformance: () => import("./BudgetPerformance"),
  },
};
</script>
<style scoped>

.v-tab {
  justify-content: left;
  font-size: 16px;
}


.tab_setting .v-tab--active {
  font-weight: 700;
  color: #000;
}

.v-tab--active {
   background-color: rgb(255, 255, 255);
  border-left: none;
}

p {
  color: rgba(0, 0, 0, 0.87);
}
</style>
