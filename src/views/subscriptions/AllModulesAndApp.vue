<template>
    <v-row class="">
        <v-col sm="12" cols="12">
            <v-tabs
                    vertical
                    class="tab_setting"
                    slider-color="grayBg"
                    slider-size="7"
            >
                <p class="mb-0 text-bold font_20 ml-4">{{ $t("categories") }}</p>
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-capitalize">
            {{ $t("all_categories") }}
          </span>
                </v-tab>
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-capitalize">
            {{ $t("point_of_sale") }}
          </span>
                </v-tab>
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-capitalize">
            {{ $t("billing") }}
          </span>
                </v-tab>
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-capitalize">
            {{ $t("price_loyalty") }}
          </span>
                </v-tab>
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-capitalize">
            {{ $t("prepare_taxes") }}
          </span>
                </v-tab>
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-capitalize text-left">
            {{ $t("financial_reports_submission") }}
          </span>
                </v-tab>
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-capitalize">
            {{ $t("manufacturing") }}
          </span>
                </v-tab>
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-capitalize">
            {{ $t("payroll") }}
          </span>
                </v-tab>
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-capitalize">
            {{ $t("manage_projects") }}
          </span>
                </v-tab>
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-capitalize">
            {{ $t("manage_fixed_asset") }}
          </span>
                </v-tab>
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-capitalize">
            {{ $t("multiple_currency") }}
          </span>
                </v-tab>
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-capitalize">
            {{ $t("analytics_reports") }}
          </span>
                </v-tab>
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-capitalize">
            {{ $t("industries_specific") }}
          </span>
                </v-tab>

                <v-tab-item>
                    <v-card flat class="px-5 custom_vcard">
                        <v-card-text class="pt-0 bg_white">
                            <AllCategories/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat class="px-5 custom_vcard">
                        <v-card-text class="pt-0 bg_white"></v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat class="px-5 custom_vcard">
                        <v-card-text class="pt-0 bg_white"></v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
    // import AllCategories from './all_modules_app/AllCategories.vue'
    export default {
        data: () => ({}),
        props: {},
        methods: {},
        components: {
            AllCategories: () => import("./all_modules_app/AllCategories"),
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

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }

    @media (max-width: 576px) {
    }
</style>
