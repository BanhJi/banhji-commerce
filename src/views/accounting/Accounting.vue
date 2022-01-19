<template>
  <v-app class="zoom-in">
    <v-container>
      <v-row>
        <v-col sm="12" cols="12">
          <v-card color="white" class="pa-4 no_border" elevation="0">
            <v-row>
              <v-col sm="12" cols="12" class="tab_wrapper py-0">
                <v-tabs v-model="active_in_tabs">
                  <v-row>
                    <v-col
                      sm="10"
                      cols="10"
                      class="py-0 pr-0"
                      style="display: inherit;"
                    >
                      <v-tab>
                        <span class="hidden-sm-and-up">
                          <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("insights") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <span class="hidden-sm-and-up">
                          <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("ledgers") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <span class="hidden-sm-and-up">
                          <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("s_ledgers") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <span class="hidden-sm-and-up">
                          <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("closing_task") }}
                        </span>
                      </v-tab>
                      <v-tab v-if="productType !== 'Standard'">
                        <span class="hidden-sm-and-up">
                          {{ $t("dimensions") }}
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("dimensions") }}
                        </span>
                      </v-tab>

                      <v-tab v-if="productType != 'npo' &&  productType != 'Public Sectors' ">
                        <span class="hidden-sm-and-up">
                          <v-icon left>mdi-attachment</v-icon>
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("reporting") }}
                        </span>
                      </v-tab>
                      <!-- <v-tab>
                        <span class="hidden-sm-and-up">
                          <v-icon left>mdi-attachment</v-icon>
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("setting") }}
                        </span>
                      </v-tab> -->
                    </v-col>
                    <v-col sm="2" cols="2" class="px-0">
                      <v-menu
                        nudge-bottom="4"
                        bottom
                        offset-y
                        origin="bottom top"
                        transition="scroll-y-reverse-transition"
                      >
                        <template v-slot:activator="{ on }">
                          <span class="hidden-sm-and-up">
                            <div class="dropdown_transactions ml-6">
                              <v-icon v-on="on" left>mdi-plus</v-icon>
                            </div>
                          </span>
                          <span class="hidden-sm-and-down">
                            <v-btn
                              icon
                              v-on="on"
                              class="dropdown_transactions"
                              style="right: 0"
                            >
                              <v-icon size="17" class="ma-1">mdi-plus</v-icon>
                              {{ $t("new") }}
                              <v-icon size="" class="ma-1">expand_more</v-icon>
                            </v-btn>
                          </span>
                        </template>

                        <v-list>
                          <v-list-item link route to="journal">
                            <v-list-item-title>{{
                              $t("journal")
                            }}</v-list-item-title>
                          </v-list-item>
                          <v-list-item link route to="account">
                            <v-list-item-title>{{
                              $t("add_new_account")
                            }}</v-list-item-title>
                          </v-list-item>
                          <v-list-item link route to="s_account">
                            <v-list-item-title>{{
                              $t("new_s_account")
                            }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>

                  <v-tab-item v-if="type != 'npo' ">
                    <v-card flat>
                      <v-card-text class="">
                        <Insight />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item v-else >
                    <v-card flat>
                      <v-card-text class="">
                        <InsightNpo />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <AcccountTabs />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <SLedgersTabas/>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <ClosingTab />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <!-- dismensions -->
                  <v-tab-item v-if="productType !== 'Standard'">
                    <v-card flat>
                      <v-card-text class="">
                        <DimensionsTabs />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <!-- reports -->
                  <v-tab-item v-if="productType != 'npo' &&  productType != 'Public Sectors' ">
                    <v-card flat>
                      <v-card-text class="">
                        <Reports />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <!-- <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <AccountingSetting />
                      </v-card-text>
                    </v-card>
                  </v-tab-item> -->
                
                </v-tabs>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import {dataStore, data} from "@/observable/store";

export default {
  name: "Accounting",
  components: {
    Insight: () => import("./Insight.vue"),
    InsightNpo: () => import("./InsightNpo"),
    Reports: () => import("./reports/Reports"),
    // AccountingSetting: () => import("./Setting.vue"),
    ClosingTab: () => import("@/views/accounting/closing/ClosingTab"),
    AcccountTabs: () => import("@/views/accounting/account/AcccountTabs"),
    SLedgersTabas: () => import("@/views/accounting/s_ledgers/SLedgersTabas"),
    DimensionsTabs: () => import("./dimensions/DimensionsTabs"),
  },
  computed: {
      productType(){
          return dataStore.productType
      },
  },
  data: () => ({
      active_in_tabs: data.banking_tab_main,
  }),
  methods: {},
};
</script>
<style scoped>
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

/* .v-menu__content{
		top: 130px !important;	
	} */
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

@media (max-width: 576px) {
  /* .v-menu__content{
			top: 140px !important;	
		} */
  /*.dropdown_transactions .v-icon.v-icon{*/
  /*	font-size: 18px;*/
  /*	color: #fff;*/
  /*}*/
  /*.dropdown_transactions{*/
  /*	background-color: #009efb !important;*/
  /*	height: 40px !important;*/
  /*	width: auto !important;*/
  /*	border-radius: 0 !important;*/
  /*	padding: 5px 5px 0px 10px !important;*/
  /*	color: #fff !important;*/
  /*	right: 12px;*/
  /*	position: absolute;*/
  /*	top: 0px;*/
  /*}*/
}
</style>
