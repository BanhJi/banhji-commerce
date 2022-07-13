<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <v-tabs>
        <!-- <v-tab>
          <span class="text-uppercase text-left">
            {{ $t("price_margin_variant_summary") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-uppercase">
            {{ $t("price_margin_variant_detail") }}
          </span>
        </v-tab> -->
        <v-tab>
          <span class="text-uppercase">
            {{ $t("price_margin_product_summary") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-uppercase">
            {{ $t("price_margin_product_detail") }}
          </span>
        </v-tab>
        <!-- <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
              <VariantSummary />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
              <VariantDetail />
            </v-card-text>
          </v-card>
        </v-tab-item> -->
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
              <ProductSummary />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 px-0">
              <ProductDetail />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
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
    // VariantSummary: () => import("./Summary"),
    // VariantDetail: () => import("./Detial"),
    ProductSummary: () => import("./ProductSummary"),
    ProductDetail: () => import("./ProductDetail"),
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
  background-color: rgb(255, 255, 255) !important;
  border-left: none;
}
.tabs_2 .v-tab--active {
  background-color: #f8f8f9 !important;
  border-bottom: 4px solid #92d050;
  border-left: none;
}
.theme--light.v-card > .v-card__text,
.theme--light.v-card .v-card__subtitle {
  color: rgba(0, 0, 0, 1) !important;
}
</style>
