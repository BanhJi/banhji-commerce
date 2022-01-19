<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-tabs>
                <v-tab>
                    <span class="text-uppercase">
                        {{ $t('purchase_voucher') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="text-uppercase">
                        {{ $t('purchase_order') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="text-uppercase">
                        {{ $t('purchase_deposit') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="text-uppercase">
                        {{ $t('debit_note') }}
                    </span>
                </v-tab>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <PurchaseVoucher/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text class="">
                            <PurchaseOrder/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item>
                    <v-card flat>
                        <v-card-text >
                            <PurhcaseDepositForm />
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text >
                            <DebitNote />
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
/* Cookie */
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();

export default {
    name: "PurchaseTab",
    components: {
        PurchaseVoucher: () => import('./PurchaseVoucher'),
        PurchaseOrder: () => import('./PurchaseOrder'),
        PurhcaseDepositForm: () => import("./PurhcaseDepositForm"),
        // ExpenseForm: ()=> import("./ExpenseForm"),
        DebitNote: () => import("../DebitNote"),


    },
    data: () => ({}),
    watch: {},
    methods: {
        clickMe(data) {
            this.$route.push(data.link);
        }
    },
    computed: {
        instituteId() {
            return cookie.instituteId;
        },
  },
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

.menuable__content__active {
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
	