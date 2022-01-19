<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-4 px-4">
            <v-row class="">
                <v-col sm="3" cols="12">
                    <v-img src="@/assets/images/declare_tax.png"/>
                </v-col>
                <v-col sm="9" cols="12" class="py-0">
                    <v-row>
                        <v-col sm="6" cols="12" class="py-0">
                            <h2 class="font_20">{{ $t('exprot_data_gdt_desktop') }}</h2>
                        </v-col>
                    </v-row>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-bold text-uppercase"></th>
                                <th class="text-bold text-uppercase"></th>
                                <th class="text-bold text-uppercase ">{{ $t('last_download') }}</th>
                                <th class="text-bold text-uppercase ">{{ $t('downloaded') }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td> {{ $t('sale_records') }}</td>
                                <td class="white--text text-uppercase">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                class="rounded-0 text-center white--text" color="primary" @click="handleDownloadSale"
                                                :disabled="sales.length === 0"
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                download
                                            </v-btn>
                                        </template>
                                        <span>{{ sales.length === 0 ? 'No Record' : 'You have :'+ sales.length + ' Records and Unsaved : ' + numSale + ' Records' }}</span>
                                    </v-tooltip>
<!--                                    <v-btn :disabled="sales.length === 0" class="rounded-0 text-center white&#45;&#45;text" color="primary" @click="handleDownloadSale">download</v-btn>-->
                                </td>
                                <td class="">{{ formatDate(dateSales) }} {{ timeSinceSales }}</td>
                                <td class="text-bold text-uppercase text-left">{{ amountDlSale }} {{  amountDlSale > 1 ? $t('times') : $t('time') }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('purchase_records') }}</td>
                                <td class="white--text text-uppercase">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                class="rounded-0 text-center white--text" color="primary" @click="handleDownloadPurchase"
                                                :disabled="purchases.length === 0"
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                download
                                            </v-btn>
                                        </template>
                                        <span>{{ purchases.length === 0 ? 'No Record' : 'You have :'+ purchases.length + ' Records and Unsaved : ' + numPurchase + ' Records' }}</span>
                                    </v-tooltip>
<!--                                    <v-btn :disabled="purchases.length === 0" class="rounded-0 text-center white&#45;&#45;text" color="primary" @click="handleDownloadPurchase">download</v-btn>-->
                                </td>
                                <td class="">{{ formatDate(datePurchases) }} {{ timeSincePurchases }}</td>
                                <td class="text-bold text-uppercase ">{{ amountDlPurchases }} {{ amountDlPurchases > 1 ? $t('times') : $t('time') }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('salary_fringe_benefits') }}</td>
                                <td class="text-uppercase">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                class="rounded-0 text-center white--text" color="primary" @click="handleDownloadWht"
                                                :disabled="salaries.length === 0"
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                download
                                            </v-btn>
                                        </template>
                                        <span>{{ salaries.length === 0 ? 'No Record' : 'You have '+ salaries.length + ' Records and Unsaved :' + numSalaries + 'Records' }}</span>
                                    </v-tooltip>
                                </td>
                                <td class="">{{ formatDate(dateSalaries) }} {{ timeSinceSalaries }}</td>
                                <td class="text-bold text-uppercase ">{{ amountDlSalaries }} {{ amountDlSalaries > 1 ?  $t('times') : $t('time') }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('withholding_tax') }}</td>
                                <td class="text-uppercase">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                class="rounded-0 text-center white--text" color="primary" @click="handleDownloadWht"
                                                :disabled="wht.length === 0"
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                download
                                            </v-btn>
                                        </template>
                                        <span>{{ wht.length === 0 ? 'No Record' : 'You have '+ wht.length + ' Records and Unsaved :' + numWht + 'Records' }}</span>
                                    </v-tooltip>
                                </td>
                                <td class="">{{ formatDate(dateWhts) }} {{ timeSinceWhts }}</td>
                                <td class="text-bold text-uppercase ">{{ amountDlWhts }} {{ amountDlWhts > 1 ?  $t('times') : $t('time') }}</td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script src="./_finalize.js" lang="js"></script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.primary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: #f44336 !important;
}

.theme--light.v-data-table {
    background-color: transparent !important;
    border-top: thin solid #ddd;
    border-bottom: thin solid #ddd;
    border-radius: 0 !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    font-size: 14px;
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    height: 37px !important;
    color: #000;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom: thin solid #ddd;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-application .primary,
.v-application .third {
    border-color: #fff !important;
}

.amount {
    text-align: right !important;
}

.head-summary {
    text-align: right !important;
}
</style>

