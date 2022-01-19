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
<!--                <v-tab>-->
                <!--          <span class="hidden-sm-and-up">-->
                <!--            <v-icon left>mdi-pen</v-icon>-->
                <!--          </span>-->
                <!--                    <span class="hidden-sm-and-down text-capitalize">-->
                <!--            {{ $t("payment_insight") }}-->
                <!--          </span>-->
                <!--                </v-tab>-->
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-capitalize">
            {{ $t("bill_payments") }}
          </span>
                </v-tab>
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-capitalize">
            {{ $t("qr_code_payments") }}
          </span>
                </v-tab>
                <!--        <v-tab>-->
                <!--          <span class="hidden-sm-and-up">-->
                <!--            <v-icon left>mdi-pen</v-icon>-->
                <!--          </span>-->
                <!--          <span class="hidden-sm-and-down text-capitalize">-->
                <!--            {{ $t("card_payments") }}-->
                <!--          </span>-->
                <!--        </v-tab>-->

<!--                <v-tab-item>-->
<!--                    <v-card flat>-->
<!--                        <v-card-text class="py-0 pr-0">-->
<!--                            <PaymentInsight/>-->
<!--                        </v-card-text>-->
<!--                    </v-card>-->
<!--                </v-tab-item>-->
                <v-tab-item>
                    <v-card flat>
                        <v-card-text class="py-0 pr-0">
                            <InvoicePayments/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text class="py-0 pr-0">
                            <MerchantPayments/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <!--        <v-tab-item>-->
                <!--          <v-card flat>-->
                <!--            <v-card-text class="py-0 pr-0">-->
                <!--              <OnlinePayments />-->
                <!--            </v-card-text>-->
                <!--          </v-card>-->
                <!--        </v-tab-item>-->
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "PaymentTab",
    data: () => ({
        isHide: false,
    }),
    props: {},
    methods: {
        clickMe(data) {
            // alert(data.link)
            this.$router.push(`${data.link}`);
            //this.$event.target.classList.toggle(active)
            //eslint-disable-next-line no-console
            console.log(data.link);
            //eslint-disable-next-line no-console
            //console.log(data)
        },
        hideTabs() {
            this.isHide = !this.isHide;
        },
    },
    components: {
        // PaymentInsight: () => import("./PaymentInsight"),
        InvoicePayments: () => import("./invoice_payments/InvoicePaymentsTab"),
        // OnlinePayments: () => import("./online_payments/OnlinePaymentsTab"),
        MerchantPayments: () => import("./merchant_payments/MerchantPaymentsTab"),
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

.tab_product_service_show.theme--light .v-slide-group__content {
    width: 140px !important;
}

p {
    color: rgba(0, 0, 0, 0.87);
}
</style>
