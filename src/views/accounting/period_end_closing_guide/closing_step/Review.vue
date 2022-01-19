<template>
    <v-row class="">
        <v-col sm="12" cols="12">
            <v-tabs vertical class="tab_setting" slider-color="grayBg" slider-size="7" :class="{ tab_product_service_hide: isHide, tab_product_service_show: !isHide}">
                <span class="hideAbs">
                    <v-icon size="16" class="arr_icon" @click="hideTabs" v-if="!isHide"
                    >mdi-chevron-left-circle
                    </v-icon>
                    <v-icon size="16" class="arr_icon1" @click="hideTabs" v-if="isHide"
                    >mdi-chevron-right-circle
                    </v-icon>
                </span>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down  text-left">
                        {{$t('key_accounts')}}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-attachment</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-left">
                        {{$t('statement_financial_position')}}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-attachment</v-icon>
                    </span>
                    <span class="hidden-sm-and-down text-left">
                        {{$t('statement_profit_lose')}}
                    </span>
                </v-tab>
           
                <v-tab-item>
                    <v-row>
                        <v-col sm="12" cols="12" class="pl-6 pt-0">
                            <KeyAccount/>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row>
                        <v-col sm="12" cols="12" class="pl-6 pt-0">
                            <StatementFinnacialPosition/>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row>
                        <v-col sm="12" cols="12" class="pl-6 pt-0">
                            <StatementProfitLoss/>
                        </v-col>
                    </v-row>
                </v-tab-item>

            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
	export default {
		name: "",
		components: {
            KeyAccount : () =>import('./KeyAccount'),
            StatementFinnacialPosition : () =>import('./StatementFinnacialPosition'),
            StatementProfitLoss : () =>import('./StatementProfitLoss'),
		},
		data: () => ({
            isHide: false,
		}),
		watch: {
		},
		methods: {
			clickMe(data) {
				this.$route.push(data.link);
            },
            hideTabs(){
				this.isHide = !this.isHide;
			},
		}
	};
</script>
<style scoped>
   .v-tab {
        justify-content: left;
       text-align: left;
       white-space: normal;
   }

.v-tab--active {
    background-color: rgb(255, 255, 255);
}

.v-tab--active {
    background-color: #ffffff !important;
    border-bottom: 4px solid #92d050;
    border-left: none;
}

.v-menu__content {
    top: 141px !important;
    left: 1098px !important;
}

.v-menu__content .v-list .v-list-item {
    min-height: 35px !important;
}

.tab_wrapper {
    position: relative;
    display: inherit;
}

.v-tab {
    min-width: 30px;
    font-size: 15px;
    text-transform: capitalize;
}

.v-icon--left {
    margin-right: 0px;
}

.theme--light.v-tabs >>> .v-tabs-bar {
    border-bottom: none !important;
}



.v-tabs-bar {
    border-bottom: none !important;
}

.v-card__text {
    padding: 0 !important;
}

/* .hideAbs {
  position: absolute;
  z-index: 4;
  right: 2px;
  top: 25px;
} */
.tab_setting {
    position: relative;
}

.arr_icon {
}

.arr_icon1 {
    color: #4c9aff;
}
	
</style>
	