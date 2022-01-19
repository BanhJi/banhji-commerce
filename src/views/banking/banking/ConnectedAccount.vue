<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{ $t('bank_feeds_connection') }}</h2>
                        <p class="mb-0">{{$t('bank_feeds_connection_desc')}}</p>
                    </v-col>
                </v-row>
               
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>{{$t('fi')}} </th>
                                        <th>{{$t('name')}} </th>
                                        <th>{{$t('merchant')}} </th>
                                        <th>{{$t('type')}} </th>
                                        <th>{{$t('account')}} </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in banks"
                                            :key="item.id"
                                        >
                                            <td><v-img width="90" class="borderRadius20" :src="item.image" /></td>
                                            <td><h4>{{ item.fi }}</h4></td>
                                            <td>{{ item.merchant.id }}</td>
                                            <td>{{ item.serviceType }}</td>
                                            <td>
                                                <span v-if="item.coa">{{ item.coa.number }} - {{ item.coa.name }}</span>
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
const { instituteId } = cookieJS.getCookie();

const BankPartnerServiceHandler = require("@/scripts/handler/banking/BankPartnerService.js");

export default {
    data: () => ({
        banks : [],
    }),
    methods: {
        loadPartnerService () {
            BankPartnerServiceHandler.getByInstitute(instituteId)
            .then((res)=>{
                let services = [];
                res.data.forEach(value => {
                    services.push(new ConnnectBankPartnerServiceModel(value));
                });
                
                this.banks = services;
            });
        },
    },
    mounted() {
        this.loadPartnerService();
    }
};
</script>
<style scoped>
.k-chart {
    height: 180px;
}

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

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
</style>
