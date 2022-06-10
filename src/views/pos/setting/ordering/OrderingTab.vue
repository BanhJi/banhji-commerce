<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <div style="background-color: #fff; padding: 0 0 5px;">
                <v-tabs class="tabs_2">
                    <v-tab>
                        <span class="text-uppercase text-left">
                        {{ $t("order_flow") }}
                        </span>
                    </v-tab>
                    <v-tab>
                        <span class="text-uppercase text-left">
                        {{ $t("order_type") }}
                        </span>
                    </v-tab>
                    <v-tab>
                        <span class="text-uppercase text-left">
                        {{ $t("categories") }}
                        </span>
                    </v-tab>
                    <v-tab>
                        <span class="text-uppercase text-left">
                        {{ $t("display") }}
                        </span>
                    </v-tab>
                    <v-tab>
                        <span class="text-uppercase">
                        {{ $t("mobile_order") }}
                        </span>
                    </v-tab>
                    <v-tab-item>
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                <OrderFlow/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                <OrderType/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                <Categories/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                <Display/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                <MobileOrder/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "CatalogsBundledTab",
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
        Display: () => import("./Display"),
        MobileOrder: () => import("./MobileOrder"),
        OrderFlow: () => import("./OrderFlow"),
        OrderType: () => import("./OrderType"),
        Categories: () => import("./Categories"),

    },
};
</script>
<style scoped>
.v-tab {
    min-width: 30px;
    font-size: 16px;
    text-transform: capitalize;
}

.v-tab--active {
    background-color: rgb(255, 255, 255);
}

.tab_setting .v-tab--active {
    font-weight: 700;
    color: #000;
    background-color: #ffffff !important;
    border-bottom: 4px solid #92d050;
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

/* .v-tab--active {
    } */

p {
    color: rgba(0, 0, 0, 0.87);
}
</style>
