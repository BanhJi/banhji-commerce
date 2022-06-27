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
                        <span class="">
                          {{ $t("channels") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <span class="">
                          {{ $t("price_level") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <span class="">
                          {{ $t("orders") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <span class="">
                          {{ $t("sales") }}
                        </span>
                      </v-tab>
                      
                     
                    </v-col>
                  </v-row>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <ChannelTab />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <PrincingTab />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <OrderReportTab />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <SaleReportTab />
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
import {dataStore} from "@/observable/store";

export default {
  name: "Accounting",
  components: {
    ChannelTab: () => import("./ChannelTab"),
    PrincingTab: () => import("./PrincingTab"),
    OrderReportTab: () => import("../order_sale/OrderReportTab"),
    SaleReportTab: () => import("../order_sale/SaleReportTab"),


  },
  computed: {
      productType(){
          return dataStore.productType
      },
  },
  data: () => ({
      active_in_tabs: 1,
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
