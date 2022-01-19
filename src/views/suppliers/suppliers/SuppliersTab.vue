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
              {{ $t("supplier_insight") }}
            </span>
          </v-tab> -->
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("vendors_center") }}
            </span>
          </v-tab>
          <v-tab v-if="appType != 'npo'">
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("supplier_directory") }}
            </span>
          </v-tab>

          <v-tab v-if="appType != 'npo'">
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("credit_term") }}
            </span>
          </v-tab>

          <v-tab v-if="appType != 'npo'">
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-capitalize text-left">
              {{ $t("suppliers_deposit") }}
            </span>
          </v-tab>
          <!-- only for npo -->
          <v-tab v-if="appType === 'npo'">
            <span class="text-capitalize">
              {{ $t("suppliers_types") }}
            </span>
          </v-tab>
          <v-tab v-if="appType === 'npo'">
            <span class="text-capitalize">
              {{ $t("form_content") }}
            </span>
          </v-tab>
          <v-tab v-if="appType === 'npo'">
            <span class="text-capitalize">{{ $t("payment_term") }}</span>
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <SupplierCenter />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item v-if="appType != 'npo'">
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <SupplierDirectory />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item v-if="appType != 'npo'">
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <VendorCreditTerm />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item v-if="appType != 'npo'">
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <SupplierDeposit />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!-- only for npo -->
          <v-tab-item v-if="appType === 'npo'">
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <SuppliersType />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item v-if="appType === 'npo'">
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <PurchaseFormContent />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item v-if="appType === 'npo'">
            <v-card flat>
              <v-card-text class="py-0 pr-0">
                <PaymentTerm />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { dataStore } from "@/observable/store";
export default {
  name: "Sales",
  data: () => ({
    isHide: false,
  }),
  computed: {
    appType() {
      return dataStore.productType;
    },
  },
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    // SupplierInsight: () => import("./SupplierInsight"),
    SupplierDirectory: () => import("./SupplierDirectory"),
    SupplierCenter: () => import("./supplier_center/SupplierCenter"),

    SupplierDeposit: () => import("./supplier_deposit/SupplierDeposit"),
    VendorCreditTerm: () => import("./vendor_credit_term/VendorCreditTerm"),
    // from setting folder
    SuppliersType: () => import("../settings/SuppliersType"),
    PurchaseFormContent: () => import("../settings/PurchaseFormContent"),
    PaymentTerm: () => import("../settings/PaymentTerm"),
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
