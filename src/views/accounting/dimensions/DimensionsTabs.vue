<template>
    <v-row>
        <v-col sm="12" cols="12" class="pb-0 pt-4">
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
          <span class="text-capitalize">
            {{ $t("segment") }}
          </span>
                </v-tab>
                <v-tab v-if="productType !== 'Premium'">
          <span class="text-capitalize text-left">
            {{ $t("location") }}
          </span>
                </v-tab>
                <v-tab>
          <span class="text-capitalize text-left">
            {{ $t("class_") }}
          </span>
                </v-tab>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text class="py-0">
                            <SegmentTab/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item v-if="productType !== 'Premium'">
                    <v-card flat>
                        <v-card-text class="py-0">
                            <LocationsTab/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text class="py-0">
                            <ClassTab/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
import {dataStore} from "@/observable/store";

export default {
    name: "DimensionsTabs",
    data: () => ({
        isHide: false,
    }),
    props: {},
    methods: {
        hideTabs() {
            this.isHide = !this.isHide;
        },
    },
    computed: {
        productType(){
            return dataStore.productType
        },
    },
    components: {
        SegmentTab: () => import("./segement/SegmentTab"),
        LocationsTab: () => import("./location/LocationsTab"),
        ClassTab: () => import("./class/ClassTab"),

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
