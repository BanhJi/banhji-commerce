<template>
  <v-app class="zoom-in">
    <v-container>
      <v-row>
        <v-col sm="12" cols="12">
          <v-card color="white" class="pa-4 no_border" elevation="0">
            <v-row>
              <v-col sm="12" cols="12" class="tab_wrapper py-0">
                <v-tabs  v-model="active_in_tabs">
                  <v-tab>
                    <span class="">
                      {{ $t("insights") }}
                    </span>
                  </v-tab>
                  <v-tab>
                    <span class="">
                      {{ $t("monthly_tax") }}
                    </span>
                  </v-tab>
                  <v-tab>
                    <span>
                      {{ $t("tasks") }}
                    </span>
                  </v-tab>
                  <v-tab>
                    <span>
                      {{ $t("settings") }}
                    </span>
                  </v-tab>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <Insight />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <MonthlyTaxTab />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <Task />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <SettingTab />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
     
                </v-tabs>
                <!-- Dropdown New-->
                <!--                                <v-menu-->
                <!--                                    nudge-bottom="4"-->
                <!--                                    bottom-->
                <!--                                    offset-y-->
                <!--                                    origin="bottom top"-->
                <!--                                    transition="scroll-y-reverse-transition"-->
                <!--                                >-->
                <!--                                    <template v-slot:activator="{ on }">-->
                <!--                    <span class="hidden-sm-and-up">-->
                <!--                      <div class="dropdown_transactions">-->
                <!--                        <v-icon v-on="on" left>mdi-attachment</v-icon>-->
                <!--                        <v-icon size="" class="ma-1">expand_more</v-icon>-->
                <!--                      </div>-->
                <!--                    </span>-->
                <!--                                        <span class="hidden-sm-and-down">-->
                <!--                      <v-btn icon v-on="on" class="dropdown_transactions">-->
                <!--                        <v-icon size="17" class="ma-1">mdi-plus</v-icon>-->
                <!--                        {{ $t("new") }}-->
                <!--                        <v-icon size="" class="ma-1">expand_more</v-icon>-->
                <!--                      </v-btn>-->
                <!--                    </span>-->
                <!--                                    </template>-->

                <!--                                    <v-list>-->
                <!-- <v-list-item><h3 class="">{{ $t('inventory_control') }}</h3></v-list-item> -->
                <!--                                        <v-list-item link route to="tax_submission">-->
                <!--                                            <v-list-item-title>{{-->
                <!--                                                    $t("new_tax_submission")-->
                <!--                                                }}-->
                <!--                                            </v-list-item-title>-->
                <!--                                        </v-list-item>-->
                <!--                                        <v-list-item link route to="tax_payment">-->
                <!--                                            <v-list-item-title>{{-->
                <!--                                                    $t("tax_payment")-->
                <!--                                                }}-->
                <!--                                            </v-list-item-title>-->
                <!--                                        </v-list-item>-->
                <!--                                        <v-list-item link route to="sale_records">-->
                <!--                                            <v-list-item-title>{{-->
                <!--                                                    $t("new_sale_record")-->
                <!--                                                }}-->
                <!--                                            </v-list-item-title>-->
                <!--                                        </v-list-item>-->
                <!--                                        <v-list-item link route to="tax_purchase_record">-->
                <!--                                            <v-list-item-title>{{-->
                <!--                                                    $t("new_purchase_record")-->
                <!--                                                }}-->
                <!--                                            </v-list-item-title>-->
                <!--                                        </v-list-item>-->
                <!--                                        <v-list-item link route to="wht_record">-->
                <!--                                            <v-list-item-title>{{-->
                <!--                                                    $t("new_wht_record")-->
                <!--                                                }}-->
                <!--                                            </v-list-item-title>-->
                <!--                                        </v-list-item>-->
                <!--                                    </v-list>-->
                <!--                                </v-menu>-->
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { data } from "@/observable/store";
export default {
  name: "",
  components: {
    Insight: () => import("./Insight"),
    MonthlyTaxTab: () => import("./monthly_tax/MonthlyTaxTab"),
    Task: () => import("./task/TaskTab"),
    SettingTab: () => import("./settings/SettingTab"),
  },
  data: () => ({
    active_in_tabs:  data.compliance_main_tab
  }),
  watch: {},
  methods: {
    clickMe(data) {
      this.$route.push(data.link);
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
