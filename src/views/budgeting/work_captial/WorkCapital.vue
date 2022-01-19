<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-4 pb-md-0">
            <div style="background-color: #fff;">
                <v-tabs
                    vertical
                    class="tab_setting"
                    slider-color="grayBg"
                    slider-size="7"
                    :class="{ tab_product_service_hide: isHide, tab_product_service_show: !isHide}">
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
                            {{ $t('receivable_management') }}
                        </span>
                    </v-tab>
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down text-capitalize">
                            {{ $t('payable_management') }}
                        </span>
                    </v-tab>
                    <v-tab>
                        <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down text-capitalize">
                            {{ $t('inventory_management') }}
                        </span>
                    </v-tab>
                    <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-5 pt-0">
                                <ReceivablesTab/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-5 pt-0">
                                <Payables/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row>
                            <v-col sm="12" cols="12" class="pl-5 pt-0">
                                <Inventory/>
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
        name: 'Receivables',
        data: () => ({
            isHide: false
        }),
        props: {},
        methods: {
            hideTabs(){
				this.isHide = !this.isHide;
			},
            clickMe(data) {
                // alert(data.link)
                this.$router.push(`${data.link}`);
                //this.$event.target.classList.toggle(active)
                //eslint-disable-next-line no-console
                console.log(data.link)
                //eslint-disable-next-line no-console
                //console.log(data)
            }
        },
        components: {
            Payables :()=> import('./payables/Payables'),
            Inventory: () => import('./inventory/Inventory'),
            ReceivablesTab : ()=> import('./receivables/ReceivablesTab')
        },
    };
</script>
<style scoped>
    .arr_icon {
        color: #2CA01C;
    }
    .arr_icon1 {
        color: #2CA01C;
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