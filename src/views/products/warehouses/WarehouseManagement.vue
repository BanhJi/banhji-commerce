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
              {{ $t("warehouses") }}
            </span>
          </v-tab>
<!--          <v-tab>-->
<!--            <span class="hidden-sm-and-up">-->
<!--              <v-icon left>mdi-pen</v-icon>-->
<!--            </span>-->
<!--            <span class="hidden-sm-and-down text-capitalize text-left">-->
<!--              {{ $t("batch") }}-->
<!--            </span>-->
<!--          </v-tab>-->
          <!--					<v-tab>-->
          <!--                        <span class="hidden-sm-and-up">-->
          <!--                            <v-icon left>mdi-pen</v-icon>-->
          <!--                        </span>-->
          <!--                        <span class="hidden-sm-and-down text-capitalize text-left">-->
          <!--                            {{ $t('packing_order') }}-->
          <!--                        </span>-->
          <!--                    </v-tab>-->
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("tranfer_orders") }}
            </span>
          </v-tab>
          <!--					<v-tab>-->
          <!--                        <span class="hidden-sm-and-up">-->
          <!--                            <v-icon left>mdi-pen</v-icon>-->
          <!--                        </span>-->
          <!--                        <span class="hidden-sm-and-down text-capitalize text-left">-->
          <!--                            {{ $t('shelving_orders') }}-->
          <!--                        </span>-->
          <!--                    </v-tab>-->
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("receipt_orders") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("delivery_orders") }}
            </span>
          </v-tab>
          <!--					<v-tab>-->
          <!--                        <span class="hidden-sm-and-up">-->
          <!--                            <v-icon left>mdi-pen</v-icon>-->
          <!--                        </span>-->
          <!--                        <span class="hidden-sm-and-down text-capitalize text-left">-->
          <!--                            {{ $t('bin_locations') }}-->
          <!--                        </span>-->
          <!--                    </v-tab>-->

          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <WarehouseReportTab />
              </v-card-text>
            </v-card>
          </v-tab-item>
<!--          <v-tab-item>-->
<!--            <v-card flat>-->
<!--              <v-card-text class="pt-0">-->
<!--                <Batch />-->
<!--              </v-card-text>-->
<!--            </v-card>-->
<!--          </v-tab-item>-->
          <!--                    <v-tab-item>-->
          <!--                        <v-row>-->
          <!--                            <v-col sm="12" cols="12" class="pl-6 pt-0">-->
          <!--                                <PackingOrders/>-->
          <!--                            </v-col>-->
          <!--                        </v-row>-->
          <!--                    </v-tab-item>-->
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <TransferOrders />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!--                    <v-tab-item>-->
          <!--                        <v-row>-->
          <!--                            <v-col sm="12" cols="12" class="pl-6 pt-0">-->
          <!--                                <ShelvingOrders/>-->
          <!--                            </v-col>-->
          <!--                        </v-row>-->
          <!--                    </v-tab-item>-->
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <ReceiptOrders />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0">
                <DeliveryOrders />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!--                    <v-tab-item>-->
          <!--                        <v-row>-->
          <!--                            <v-col sm="12" cols="12" class="pl-6 pt-0">-->
          <!--                                <BinLocation/>-->
          <!--                            </v-col>-->
          <!--                        </v-row>-->
          <!--                    </v-tab-item>-->
        </v-tabs>
      </div>
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
  
    WarehouseReportTab: () => import("./warehouse_report/WarehouseReportTab"),
    // Batch: () => import("./Batch"),
    // PackingOrders: () => import('./operations/PackingOrders'),
    TransferOrders: () => import("./operations/TransferOrders"),
    // ShelvingOrders: () => import('./operations/ShelvingOrders'),
    ReceiptOrders: () => import("./operations/ReceiptOrders"),
    DeliveryOrders: () => import("./delivery_order/DeliveryOrderTab"),
    // BinLocation: () => import('./operations/BinLocation')
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
