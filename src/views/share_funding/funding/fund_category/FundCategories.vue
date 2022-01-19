<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <div style="background-color: #fff; padding: 0 0 5px;">
                <v-tabs class="tabs_2">
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down  text-left text-uppercase">
                            {{ $t('receipt_by_categories') }}
                        </span>
                    </v-tab>
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down  text-uppercase">
                            {{ $t('funding_categories') }}
                        </span>
                    </v-tab>
                    <v-tab-item>
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                <ReceiptByCategories/>
                            </v-col>
                        </v-row>
                    </v-tab-item>

                    <v-tab-item>
                        <v-row>
                            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
                                <FundingCategories/>
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
        name: 'Sales',
        data: () => ({
            isHide: false
        }),
        props: {},
        methods: {
            hideTabs(){
				this.isHide = !this.isHide;
			},
        },
        components: {
            ReceiptByCategories: () => import('./ReceiptByCategories'),
            FundingCategories: () => import('./FundingCategories'),
        },
    };
</script>
<style scoped>
    .arr_icon {
        color: #2CA01C;
    }
    .arr_icon1 {
        color: #4c9aff;
        color: #2CA01C;
    }
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
    .tabs_2 .v-tab--active{
        background-color: #F8F8F9 !important;
        border-bottom: 4px solid #92d050;
        border-left: none;

    }

    /* .v-tab--active {
    } */

    p {
        color: rgba(0, 0, 0, 0.87);
    }

</style>