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
                      sm="12"
                      cols="10"
                      class="py-0 pr-0"
                      style="display: inherit;"
                    >
                      <v-tab>
                        <span>
                          {{ $t("insights") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <span>
                          {{ $t("donors") }}
                        </span>
                      </v-tab>
                       <v-tab>
                        <span>
                          {{ $t("funding") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <span class="">
                          {{ $t("projects") }}
                        </span>
                      </v-tab>
                    </v-col>
                  </v-row>

                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <InsightPc />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <CustomersDonorTab />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <FundingTab />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <Projects />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
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
import { data } from "@/observable/store";
export default {
  name: "",
  components: {
      FundingTab: ()=> import("./funding/FundingTab"),
      CustomersDonorTab: () => import("./donor/CustomersDonorTab"),
      InsightPc: ()=> import("./InsightPc"),
      Projects: () => import("@/views/services_projects/projects/Projects"),
  },
  data: () => ({
    // active_tab: data.budget_tab.main
    active_in_tabs: data.funding_tab_main,
  }),
  computed: {
  },
  watch: {

  },
  methods: {
    clickMe(data) {
      this.$route.push(data.link);
    },
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
  font-size: 20px;
  text-transform: capitalize;
}

.v-icon--left {
  margin-right: 0;
}

.theme--light.v-tabs >>> .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.v-card__text {
  padding: 0 !important;
}
</style>
