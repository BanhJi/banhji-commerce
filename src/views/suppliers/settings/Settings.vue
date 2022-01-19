<template>
  <v-row class="">
    <v-col sm="12" cols="12">
      <v-tabs
        vertical
        class="tab_setting tab_product_service_show"
        slider-color="grayBg"
        slider-size="7"
      >
        <v-tab>
          <span class="text-capitalize">
            {{ $t("suppliers_types") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize">
            {{ $t("form_content") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize">
            {{ $t("vendor_price_level") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-capitalize">{{ $t("payment_term") }}</span>
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <SuppliersType />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <PurchaseFormContent />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <PriceLevel />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <PaymentTerm />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0">
              <PaymentOption />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
export default {
    data: () => ({}),
    props: {},
    methods: {},
    components: {
        SuppliersType: () => import('./SuppliersType'),
        PurchaseFormContent: () => import('./PurchaseFormContent'),
        PaymentTerm: () => import('./PaymentTerm'),
        PriceLevel: () => import("/src/views/suppliers/purchase/PriceLevel"),
        // PaymentOption: () => import('./PaymentOptions'),
    },
};
</script>
<style scoped>
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

@media (max-width: 576px) {
}
</style>
