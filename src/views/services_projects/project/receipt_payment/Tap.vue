<template>
  <v-row>
    <v-col sm="12" class="py-0" cols="12">
      <v-tabs>
        <v-tab>
          <span class="text-uppercase text-left">
            {{ $t("single") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-uppercase text-left">
            {{ $t("multiple") }}
          </span>
        </v-tab>
        
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0"> 
              <StatementOfProfitOrLossByProject />
            </v-card-text>
          </v-card>
        </v-tab-item>
         <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0"> 
              <StatementOfProfitOrLossByProjects/>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
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
    StatementOfProfitOrLossByProject: () => import("./StatementOfProfitOrLossByProject"),
    StatementOfProfitOrLossByProjects:() => import("./StatementOfProfitOrLossByProjects"),
  },
};
</script>
<style scoped>
.v-menu__content .v-list .v-list-item {
  min-height: 35px !important;
}

.tab_wrapper {
  position: relative;
  display: inherit;
}

.v-tab {
  min-width: 30px;
  font-size: 17px;
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

.v-card__text {
  padding: 0 !important;
}
</style>
