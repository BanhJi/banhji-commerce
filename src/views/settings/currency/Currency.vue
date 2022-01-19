<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-4 pb-0">

            <v-row>
                    <v-col class="pt-0" sm="3" cols="12">
                    <v-card outlined dense class="pa-3 rounded-4 no_border white--text " color="primary" height="60px">
                        <h3 class="text-left font_12 flex-1 text-uppercase">{{
                                $t('base_currency')
                            }}</h3>
                        <h3 class="text-right  flex-1 mt-0 font_20">{{ baseCurrency }}</h3>
                    </v-card>
                </v-col>
                <v-col class="pt-0" sm="3" cols="12">
                    <v-card outlined dense class="pa-3 rounded-4 no_border white--text " color="primary" height="60px">
                        <h3 class="text-left font_12 flex-1 text-uppercase">{{
                                $t('reporting_currency')
                            }}</h3>
                        <h3 class="text-right  flex-1 mt-0 font_20">{{ reportingCurrency }}</h3>
                    </v-card>
                </v-col>
                <v-col sm="3" class="pt-0" cols="12">
                    <v-card outlined dense class="pa-3 rounded-4 no_border white--text " color="third" height="60px">
                        <h3 class="text-left font_12 flex-1 text-uppercase">{{
                                $t('tax__currency')
                            }}</h3>
                        <h3 class="text-right  flex-1 mt-0 font_20">{{ taxCurrency }}</h3>
                    </v-card>
                </v-col>
                <v-col sm="3" class="pt-0" cols="12">
                    <v-card outlined :to="productType !== 'Standard' ? 'functional_currency' : ''" dense class="pa-3 funct_click rounded-4 no_border white--text " color="third" height="60px">
                        <h3 class="text-left font_12 flex-1 text-uppercase">{{
                                $t('functional_currency')
                            }}</h3>
                        <h3 class="text-right  flex-1 mt-0 font_20">{{ funcCurrencyUsed }}</h3>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="12" cols="12" class="tab_wrapper py-0">
                    <v-tabs>
                        <v-tab>
                            <span class="text-uppercase">
                                {{ $t('transaction_exchange_rate') }}
                            </span>
                        </v-tab>
                        <v-tab>
                            <span class="text-uppercase">
                                {{ $t('reporting_exchange_rate') }}
                            </span>
                        </v-tab>
                        <v-tab>
                            <span class="text-uppercase">
                                {{ $t('tax_exchange_rate') }}
                            </span>
                        </v-tab>

                        <v-tab-item>
                            <v-card flat>
                                <v-card-text class="py-0">
                                    <TxnExchangeRate/>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>

                        <v-tab-item>
                              <v-card flat>
                                <v-card-text class="py-0">
                                    <ReportingExchangeRate/>
                               </v-card-text>
                            </v-card>
                        </v-tab-item>

                        <v-tab-item>
                             <v-card flat>
                                <v-card-text class="py-0">
                                    <TaxExchangeRate/>
                             </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>

import {dataStore} from "@/observable/store";

const instituteHandler = require("@/scripts/instituteHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const currencyType = {
    FUNCTIONAL_CURRENCY: 'fun-c',
    TRANSACTION_CURRENCY: 'txn-c',
    REPORTING_CURRENCY: 'rpt-c',
    TAX_EXCHANGE_CURRENCY: 'tax-c',
}
/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();
export default {
    name: "Currency",
    components: {
        TxnExchangeRate: () => import('./TxnExchangeRate'),
        ReportingExchangeRate: () => import('./ReportingExchangeRate'),
        TaxExchangeRate: () => import('./TaxExchangeRate'),
    },
    data: () => ({
        company: {},
        currencyList: [],
    }),
    methods: {
        async loadInstituteInfo() {
            new Promise(resolve => {
                setTimeout(() => {
                    instituteHandler.getOneCompany(instituteId).then(res => {
                        this.company = res
                    })
                    resolve('resolved');
                }, 200);
            });
        },
        async loadCurrencyData() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    currencyHandler.list(currencyType.FUNCTIONAL_CURRENCY).then(response => {
                        if (response.data.statusCode === 200) {
                            this.currencyList = response.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 10)
            })
        },
    },
    mounted: async function () {
        await this.loadInstituteInfo()
        await this.loadCurrencyData()
    },
    computed: {
        productType(){
            return dataStore.productType
        },
        baseCurrency() {
            if (this.company) {
                if (this.company.hasOwnProperty('baseCurrency')) {
                    const cur = this.company.baseCurrency
                    return cur.code
                }
            }
            return ''
        },
        reportingCurrency() {
            if (this.company) {
                if (this.company.hasOwnProperty('reportingCurrency')) {
                    const cur = this.company.reportingCurrency
                    return cur.code
                }
            }
            return ''
        },
        funcCurrencyUsed() {
            if (this.currencyList) {
                return this.currencyList.length
            }
            return ''
        },
        taxCurrency() {
            if (this.company) {
                if (this.company.hasOwnProperty('taxCurrency')) {
                    const cur = this.company.taxCurrency
                    return cur.code
                }
            }
            return ''
        },
    },
}
</script>
<style scoped>
.funct_click {
    transition: box-shadow 200ms;
    border-left: 4px solid #4d4848 !important;
    position: relative;
}

.funct_click::before {
    content: "";
    posistion: absolute;
    width: 0;
    height: 0;
    margin-top: 13px;
    marin-left: -10px;
    border-top: 10px solid transparent;
    border-left: 20px solid #f33;
    border-bottom: 10px solid transparent;
    float: left;
}

.funct_click i {
    color: #4d4848;
    font-size: 30px;
    transition: 0.5s ease-in;
    position: absolute;
    left: 2px;
    top: 18px;
}
.v-tab.v-tab {
    font-size: 16px !important;
}
.funct_click:hover i {
    position: absolute;
    left: 90%;

}
</style>
	