<template>
  <v-row>
    <v-col sm="12" cols="12" class="">
      <div style="background-color: #fff; padding: 0 0 5px;">
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
            <v-icon size="16" class="arr_icon" @click="hideTabs" v-if="!isHide"
              >mdi-chevron-left-circle
            </v-icon>
            <v-icon size="16" class="arr_icon1" @click="hideTabs" v-if="isHide"
              >mdi-chevron-right-circle
            </v-icon>
          </span>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("bill_of_material") }}
            </span>
          </v-tab>

          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("production_order") }}
            </span>
          </v-tab>

          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("production") }}
            </span>
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <BillOfMaterials />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <ProductionOrders />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!--  -->

          <!--  -->
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <Productions />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ProductionTabs",
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
    ProductionOrders: () => import("./production_orders/ProductionOrders"),
    BillOfMaterials: () => import("./bill_of_material/BillOfMaterials"),
    Productions: () => import("./production_orders/Productions"),
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
.theme--light.v-card > .v-card__text,
.theme--light.v-card .v-card__subtitle {
  color: rgba(0, 0, 0, 1) !important;
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
