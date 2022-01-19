<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-tabs>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        RI
                    </span>
                    <span class="hidden-sm-and-down">
                        {{ $t('receivable_insight') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        RC
                    </span>
                    <span class="hidden-sm-and-down">
                        {{ $t('receivable') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        RC
                    </span>
                    <span class="hidden-sm-and-down">
                        {{ $t('collections') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        RC
                    </span>
                    <span class="hidden-sm-and-down">
                        {{ $t('credit_limit') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        RC
                    </span>
                    <span class="hidden-sm-and-down">
                        {{ $t('aging') }}
                    </span>
                </v-tab>

                <v-tab-item>
                    <v-card flat>
                        <v-card-text class="">
                          <Overview/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item>
                    <v-card flat>
                        <v-card-text class="">
                           <Receivable/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                 <v-tab-item>
                    <v-card flat>
                        <v-card-text class="">
                           <Collections/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                 <v-tab-item>
                    <v-card flat>
                        <v-card-text class="">
                           <CreditLimit/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                 <v-tab-item>
                    <v-card flat>
                        <v-card-text class="">
                           <Aging/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "Receiables",
    components: {
        Overview: ()=> import('./Overview'),
        Receivable: () => import('./Receivable'),
        Collections: () => import('./Collections'),
        CreditLimit: () => import('./CreditLimit'),
        Aging: () => import('./Aging')
    },
    data: () => ({}),
    watch: {},
    methods: {
        clickMe(data) {
            this.$route.push(data.link);
        }
    }
};
</script>
<style scoped>
/* .v-menu__content{
  top: 141px !important;
  left: 1098px !important;
} */
.v-menu__content .v-list .v-list-item {
    min-height: 35px !important;
}

.tab_wrapper {
    position: relative;
    display: inherit;
}

.v-tab {
    min-width: 30px;
    font-size: 17px;
    text-transform: capitalize;
}

.v-icon--left {
    margin-right: 0px;
}

.theme--light.v-tabs > .v-tabs-bar {
    border-bottom: 1px solid #ddd !important;
}
.menuable__content__active{
    left: 448px !important;
}


.v-tab--active {
    background-color: #E5EFFA;
    color: #000;
}

.theme--light.v-tabs >>> .v-tabs-bar {
    border-bottom: 1px solid #ddd !important;
}

.v-card__text {
    padding: 0 !important;
}
</style>
	