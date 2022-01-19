<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-4 pb-md-0">
      <div style="background-color: #fff;">
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
                            {{ $t('project_insight') }}
                        </span>
                    </v-tab> -->
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize">
              {{ $t("project_center") }}
            </span>
          </v-tab>

          <v-tab v-if="appType != 'npo' && appType != 'Public Sectors'" >
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("project_billing") }}
            </span>
          </v-tab>
          <!-- for npo -->
          <v-tab v-if="appType === 'npo' || appType === 'Public Sectors'" >
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("project_contract") }}
            </span>
          </v-tab>
          <!-- end for npo -->
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("project_reports") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("profitabilities") }}
            </span>
          </v-tab>
          <v-tab v-if="appType != 'npo' && appType != 'Public Sectors' ">
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("project_budget") }}
            </span>
          </v-tab>
          <v-tab v-if="appType === 'npo' || appType === 'Public Sectors'">
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("transaction_items") }}
            </span>
          </v-tab>

          <!-- <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-5 pt-0">
                               <ProjectInsight/>
                            </v-col>
                        </v-row>
                    </v-tab-item> -->
          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <ProjectInformation />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!-- not for npo -->
          <v-tab-item v-if="appType != 'npo' && appType != 'Public Sectors'" >
            <v-card flat>
              <v-card-text  class="py-0 pr-0">
                <ProjectBilling />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!-- for npo -->
          <v-tab-item v-if="appType === 'npo' || appType === 'Public Sectors'" >
            <v-card flat>
              <v-card-text  class="py-0 pr-0">
                <ProjectContract />
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <ProjectReports />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <Profitability />
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item v-if="appType != 'npo' && appType != 'Public Sectors'" >
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <BudgetsTabs />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item v-if="appType === 'npo' || appType === 'Public Sectors'" >
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <TransactionItems />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import {dataStore} from "@/observable/store";
export default {
  name: "Sales",
  data: () => ({
    isHide: false,
  }),
  computed: {
    appType(){
      return dataStore.productType
    }
  },
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    // ProjectInsight: () => import('./ProjectsInsight'),
    ProjectReports: () => import("./project_reports/ProjectReports"),
    ProjectInformation: () =>
      import("./project_information/ProjectInformation"),
    ProjectBilling: () => import("./project_billing/ProjectBilling"),
    BudgetsTabs: () => import("./budgets/BudgetsTabs"),
    Profitability: ()=> import("./Profitability"),
    // get from in items
    TransactionItems: ()=> import("../items/TransactionItems"),
    ProjectContract: ()=> import("./ProjectContract")
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

p {
  color: rgba(0, 0, 0, 0.87);
}
</style>
