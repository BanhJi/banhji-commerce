<template>
  <v-app class="zoom-in">
      <v-container>
        <v-row>
          <v-col sm="12" cols="12">
            <v-card color="white" class="pa-4 no_border" elevation="0">
              <v-row>
                <v-col sm="12" cols="12" class="py-0">
                    <v-tabs>
                      <v-tab>
                        <span class="text-uppercase text-left">
                          {{ $t("setting") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <span class="text-uppercase text-left">
                          {{ $t("book") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <span class="text-uppercase text-left">
                          {{ $t("pricing_analysis") }}
                        </span>
                      </v-tab>
                      <!-- <v-tab>
                        <span class="text-uppercase">
                          {{ $t("price_level_report") }}
                        </span>
                      </v-tab> -->

                      <v-tab-item>
                        <v-row>
                          <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <PriceLevel />
                          </v-col>
                        </v-row>
                      </v-tab-item>
                      <v-tab-item>
                        <v-row>
                          <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <PriceBook />
                          </v-col>
                        </v-row>
                      </v-tab-item>
                      <v-tab-item>
                        <v-row>
                          <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <PricingAnalasis />
                          </v-col>
                        </v-row>
                      </v-tab-item>
                      <!-- <v-tab-item>
                        <v-row>
                          <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <Report />
                          </v-col>
                        </v-row>
                      </v-tab-item> -->
                      <!-- <v-tab-item>
                        <v-row>
                          <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                            <PriceLevelType />
                          </v-col>
                        </v-row>
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
export default {
  name: "PricingManagement",
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
    // PriceLevelList: () => import("./PriceLevelList"),
    PriceLevel: () => import("./PriceLevel"),
    // PriceSetting: () => import('./PriceSetting'),
    // PriceLevelType: () => import("./PriceLevelType"),
    PricingAnalasis: () => import("./PricingAnalasis"),
    // Report: () => import("./Report"),
    PriceBook: ()=> import("./PriceBook")
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
