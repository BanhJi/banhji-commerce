<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="6" cols="12" class="pt-0">
                        <h2 class="mb-0 font_20">{{ $t('connected_accounts') }}</h2>
                        <p class="mb-0">{{ $t('connected_accounts_desc') }}</p>
                    </v-col>
                    <v-col sm="6" cols="12" class="pt-0">
                        <v-btn to="./connect_qr_payment" class="white--text text-capitalize float-right"
                               color="primary">
                            {{ $t('new_connection') }}
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>{{ $t('fi') }}</th>
                                        <th>{{ $t('name') }}</th>
                                        <th>{{ $t('merchant') }}</th>
                                        <th>{{ $t('account') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in banks"
                                        :key="item.id">
                                        <td>
                                            <v-img width="60" class="borderRadius20" :src="item.logo"/>
                                        </td>
                                        <td><h4>{{ item.bank }}</h4></td>
                                        <td>{{ item.merchant.id }}</td>
                                        <td>
                                            <span v-if="item.coa">{{
                                                    item.coa.account.number
                                                }} - {{ item.coa.account.name }}</span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import ConnnectBankPartnerServiceModel from "@/scripts/model/banking/ConnectBankPartnerService.js";

/* Cookie */
const cookieJS = require("@/cookie.js");
const {instituteId} = cookieJS.getCookie();

const BankPartnerServiceHandler = require("@/scripts/handler/banking/BankPartnerService.js");
const BankPartnerType = require("@/scripts/default_setup/BankPartnerType.js");

export default {
    data: () => ({
        banks: [],
    }),
    methods: {
        loadPartnerService() {
            BankPartnerServiceHandler.getByInstitute(instituteId)
                .then((res) => {
                    let services = [];
                    res.data.forEach(value => {
                        if (value.serviceType.toLowerCase() === BankPartnerType.QR) {
                            services.push(new ConnnectBankPartnerServiceModel(value));
                        }
                    });

                    this.banks = services;
                });
        },
    },
    watch: {
        // Call again the method if the route changes
        $route(to, from) {
            if (from.name === "Connect Bill Payment") {
                this.loadPartnerService();
            }
        }
    },
    mounted() {
        this.loadPartnerService();
    }
};
</script>

<style scoped>
.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.borderRadius20 {
    border-radius: 20% !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
</style>