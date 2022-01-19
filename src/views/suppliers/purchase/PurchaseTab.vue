<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-4 pb-md-0">
            <div style="background-color: #fff;">
                <v-tabs
                    vertical
                    class="tab_setting tabs_setHeight"
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
                                      {{ $t('purchase_insight') }}
                                  </span>
                              </v-tab> -->
                    <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
                        <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("purchase_recurring") }}
            </span>
                    </v-tab>
                    <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
                        <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("purchase_order") }}
            </span>
                    </v-tab>
                    <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
                        <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("debit_note") }}
            </span>
                    </v-tab>
                    <!-- <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
                        <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("vendor_price_level") }}
            </span>
                    </v-tab> -->
                    <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
                        <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("purchase_discounts") }}
            </span>
                    </v-tab>

                    <!-- <v-tab-item>
                                  <v-row>
                                      <v-col sm="12" cols="12" class="pl-5 pt-0">
                                         <PurchaseInsight/>
                                      </v-col>
                                  </v-row>
                              </v-tab-item> -->
                    <v-tab-item>
                        <v-card flat>
                            <v-card-text class="py-0  pr-0">
                                <PurchaseRecurringTab/>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat>
                            <v-card-text class="py-0  pr-0">
                                <PurchaseOrderTab/>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat>
                            <v-card-text class="py-0  pr-0">
                                <DebitMemo/>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <!-- <v-tab-item>
                        <v-card flat>
                            <v-card-text class="py-0  pr-0">
                                <PriceLevel/>
                            </v-card-text>
                        </v-card>
                    </v-tab-item> -->
                    <v-tab-item>
                        <v-card flat>
                            <v-card-text class="py-0 pr-0">
                                <PurchaseDiscount/>
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
    name: "PurchaseTabs",
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
        // PurchaseInsight: () => import('./PurchaseInsight'),
        PurchaseRecurringTab: () => import("./purchase_recurring/PurchaseRecurringTab"),
        PurchaseOrderTab: () => import("./purchase_order/PurchaseRecurringTab"),
        DebitMemo: () => import("./DebitMemo"),
        PurchaseDiscount: () => import("./purchase_discounts/PurchaseDiscount"),
        // PriceLevel: () => import("./PriceLevel"),
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

/* .v-tabs--vertical > .v-tabs-bar .v-tab {
        height: 61px !important;
    } */

p {
    color: rgba(0, 0, 0, 0.87);
}
</style>
