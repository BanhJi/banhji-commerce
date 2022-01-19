
<template>
  <v-row>
    <v-col sm="12" class="py-0" cols="12">
      <v-tabs>
        <v-tab>
          <span class="hidden-sm-and-down text-uppercase text-left">
            {{ $t("standard") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-down text-uppercase text-left">
            {{ $t("single_segement") }}
          </span>
        </v-tab>
         <v-tab>
          <span class="hidden-sm-and-down text-uppercase text-left">
            {{ $t("multiple_segements") }}
          </span>
        </v-tab>
         <v-tab>
          <span class="hidden-sm-and-down text-uppercase text-left">
            {{ $t("location") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-down text-uppercase text-left">
            {{ $t("single_project") }}
          </span>
        </v-tab>
          <v-tab>
          <span class="hidden-sm-and-down text-uppercase text-left">
            {{ $t("multi_projects") }}
          </span>
        </v-tab>
        
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
              <Consolidate/>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
              <Segement/>
            </v-card-text>
          </v-card>
        </v-tab-item>
         <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
              <Segements/>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
               <Location/>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
              <Project/>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
              <Projects/>
            </v-card-text>
          </v-card>
        </v-tab-item>
        
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ReceiptsPayments",
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
    Consolidate: () => import('@/views/accounting/reports/receipt_payment/StatementOfProfitOrLoss'),
    Segement: () => import('@/views/accounting/reports/receipt_payment/StatementOfProfitOrLossBySegment'),
    Segements: () => import('@/views/accounting/reports/receipt_payment/StatementOfProfitOrLossBySegments'),
    Location: () => import('@/views/accounting/reports/receipt_payment/StatementOfProfitOrLossByBUA'),
    Project: () => import('@/views/accounting/reports/receipt_payment/StatementOfProfitOrLossByProject'),
    Projects: () => import('@/views/accounting/reports/receipt_payment/StatementOfProfitOrLossByProjects'),
    
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