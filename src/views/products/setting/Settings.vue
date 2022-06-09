<template>
  <v-row class="">
    <v-col sm="12" cols="12">
      <v-tabs
        vertical
        class="tab_setting tab_product_service_show"
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
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize">
            {{ $t("product_categories") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize">
            {{ $t("product_groups") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize">
            {{ $t("product_sub_groups") }}
          </span>
        </v-tab>
        <!--                <v-tab>-->
        <!--					<span class="hidden-sm-and-up">-->
        <!--						<v-icon left>mdi-pen</v-icon>-->
        <!--					</span>-->
        <!--                    <span class="hidden-sm-and-down text-capitalize">-->
        <!--                        {{ $t("uom_category") }}-->
        <!--					</span>-->
        <!--                </v-tab>-->
        <!--                <v-tab>-->
        <!--					<span class="hidden-sm-and-up">-->
        <!--						<v-icon left>mdi-pen</v-icon>-->
        <!--					</span>-->
        <!--                    <span class="hidden-sm-and-down text-capitalize">-->
        <!--                        {{ $t("uom") }}-->
        <!--					</span>-->
        <!--                </v-tab>-->
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize">
            {{ $t("variants_type") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize">
            {{ $t("attributes") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize">
            {{ $t("brand") }}
          </span>
        </v-tab>
        <!-- <v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t("sale_unit_categories") }}
					</span>
                </v-tab> -->
        <!-- <v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t("txn_prefix_setting") }}
					</span>
                </v-tab> -->
        <!-- <v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t("forms") }}
					</span>
                </v-tab> -->
        <!-- <v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t("warehouse") }}
					</span>
                </v-tab> -->
        <!-- <v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
                    <span class="hidden-sm-and-down text-capitalize">
                        {{ $t("employee_to_warehouse") }}
					</span>
                </v-tab> -->
        <!-- <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize">
            {{ $t("warranty_conditions") }}
          </span>
        </v-tab> -->
        <!--                <v-tab>-->
        <!--					<span class="hidden-sm-and-up">-->
        <!--						<v-icon left>mdi-pen</v-icon>-->
        <!--					</span>-->
        <!--                    <span class="hidden-sm-and-down text-capitalize">-->
        <!--                        {{ $t("bin_location_structure") }}-->
        <!--					</span>-->
        <!--                </v-tab>-->
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <Categories />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <Group />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <SubGroup />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <!--                <v-tab-item>-->
        <!--                    <v-row>-->
        <!--                        <v-col sm="12" cols="12" class="pl-6 pt-0">-->
        <!--                            <UomCategory/>-->
        <!--                        </v-col>-->
        <!--                    </v-row>-->
        <!--                </v-tab-item>-->
        <!--                <v-tab-item>-->
        <!--                    <v-row>-->
        <!--                        <v-col sm="12" cols="12" class="pl-6 pt-0">-->
        <!--                            <Uom/>-->
        <!--                        </v-col>-->
        <!--                    </v-row>-->
        <!--                </v-tab-item>-->
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <VariantsType />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <Attribute />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <Brand />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <!-- <v-tab-item>
          <v-card flat>
            <v-card-text class="py-0 pr-0">
              <WarrantyConditions />
            </v-card-text>
          </v-card>
        </v-tab-item> -->
      </v-tabs>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    isHide: false,
  }),
  props: {},
  methods: {
    clickMe(data) {
      this.$router.push(`${data.link}`);
    },
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    // SaleUnitCategories: () => import("./SaleUnitCategories"), // lazy load component
    Brand: () => import("./Brand"),
    VariantsType: () => import("./VariantsType"),
    Attribute: () => import("./Attributes"),
    // UomCategory: () => import("./UomCategory"),
    // Uom: () => import("./Uom"),
    Categories: () => import("./Categories"),
    // PrefixSetting: () => import("./PrefixSetting"),
    // Form: () => import("./Form"),
    Group: () => import("./Group"),
    SubGroup: () => import("./SubGroup"),
    // Warehouse: () => import("./Warehouse.vue"),
    // WarrantyConditions: () => import("./WarrantyConditions.vue"),
    // BinLocation: () => import("./bin_location/BinLocation.vue"),
  },
};
</script>
<style scoped>
.v-tab {
  justify-content: left;
  text-align: left;
  white-space: normal;
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

.tab_setting {
  position: relative;
}

.arr_icon {
  color: #2ca01c;
}

.arr_icon1 {
  color: #2ca01c;
}
</style>
