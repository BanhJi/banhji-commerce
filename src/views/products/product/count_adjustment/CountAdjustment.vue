<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <v-tabs>
        <v-tab>
          <span class="text-uppercase text-left">
            {{ $t("stock_count") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-uppercase">
            {{ $t("stock_adjustment") }}
          </span>
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
                <StockCount/>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
                <InventoryAdjustments/>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CountAdjustment",
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
      InventoryAdjustments: ()=> import("../inventory_adjustment/InventoryAdjustments"),
      StockCount: ()=> import("./StockCount")
  },
};
</script>
<style scoped>
.v-tab {
  min-width: 30px;
  font-size: 16px;
  text-transform: capitalize;
}



.tab_setting .v-tab--active {
  font-weight: 700;
  color: #000;
  background-color:  #F8F8F9 !important;
  border-left: none;
}
.tabs_2 .v-tab--active {
  background-color: #F8F8F9 !important;
  border-left: none;
}
.theme--light.v-card > .v-card__text,
.theme--light.v-card .v-card__subtitle {
  color: rgba(0, 0, 0, 1) !important;
}
</style>
