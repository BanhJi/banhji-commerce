<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('price_level') }}</h2>
            <v-card color="white" class=" no_border" elevation="0">
                <!--                <v-row>-->
                <!--                    <v-col sm="7" class="py-0">-->
                <!--                        <p class="mb-0">{{ $t('price_level_desc') }}</p>-->
                <!--                    </v-col>-->
                <!--                    <v-col sm="5" class="py-0">-->
                <!--                        <v-btn color="primary" class="rounded-pill white&#45;&#45;text float-right text-capitalize"-->
                <!--                               @click="onNewClick">-->
                <!--                            {{ $t('new_price') }}-->
                <!--                        </v-btn>-->
                <!--                    </v-col>-->
                <!--                </v-row>-->
                <!--                <v-dialog v-model="dialogm3" max-width="600px">-->
                <!--                    <v-card>-->
                <!--                        <v-card-title>{{ $t('new_price') }}</v-card-title>-->
                <!--                        <v-icon class="btn_close" @click="dialogm3 = false">close</v-icon>-->
                <!--                        <v-card-text style="height: 190px; background-color: #EDF1F5; color: #333;">-->
                <!--                            <v-row>-->
                <!--                                <v-col sm="6" cols="12" class="pb-0">-->
                <!--                                    <label>{{ $t('price_list_name') }}</label>-->
                <!--                                    <v-text-field class=" my-2"-->
                <!--                                                  v-model="priceLevel.name"-->
                <!--                                                  outlined-->
                <!--                                                  tage="Pirce List Name"-->
                <!--                                                  clearable/>-->
                <!--                                </v-col>-->
                <!--                                <v-col sm="6" cols="12" class="pb-0">-->
                <!--                                    <label class="label">{{ $t('type') }}</label>-->
                <!--                                    <v-select class=" my-2"-->
                <!--                                              tag="priceLevelType"-->
                <!--                                              v-model="mPriceLevelType"-->
                <!--                                              :items="priceLevelType"-->
                <!--                                              item-text="name"-->
                <!--                                              item-value="id"-->
                <!--                                              return-object-->
                <!--                                              clearable-->
                <!--                                              outlined/>-->
                <!--                                </v-col>-->
                <!--                                <v-col sm="6" cols="12" class="py-0">-->
                <!--                                    <label>{{ $t('code') }}</label>-->
                <!--                                    <v-text-field class=" my-2"-->
                <!--                                                  v-model="priceLevel.code"-->
                <!--                                                  outlined-->
                <!--                                                  tage="Code"-->
                <!--                                                  clearable/>-->
                <!--                                </v-col>-->
                <!--                                <v-col sm="6" cols="12" class="py-0">-->
                <!--                                    <label>{{ $t('currency') }}</label>-->
                <!--                                    <v-select class=" my-2"-->
                <!--                                              outlined-->
                <!--                                              tage="Currency"-->
                <!--                                              v-model="mCurrency"-->
                <!--                                              :items="currencies"-->
                <!--                                              item-value="id"-->
                <!--                                              :item-text="item =>`${item.code} - ${item.name}`"-->
                <!--                                              return-object-->
                <!--                                              clearable/>-->
                <!--                                </v-col>-->
                <!--                            </v-row>-->
                <!--                        </v-card-text>-->
                <!--                        <v-card-actions class="pa-5">-->
                <!--                            <v-row>-->
                <!--                                <v-col sm="6" cols="6" class="py-0 text-left">-->
                <!--                                    <v-btn color="black" outlined-->
                <!--                                           class=" text-capitalize rounded-pill black&#45;&#45;text float-left"-->
                <!--                                           @click="dialogm3 = false">{{ $t('cancel') }}-->
                <!--                                    </v-btn>-->
                <!--                                </v-col>-->
                <!--                                <v-col sm="6" cols="6" class="py-0 text-right">-->
                <!--                                    <v-btn color="primary" class="px-3 rounded-pill white&#45;&#45;text text-capitalize"-->
                <!--                                           @click="onSaveClose">-->
                <!--                                        {{ $t('save_close') }}-->
                <!--                                    </v-btn>-->
                <!--                                </v-col>-->
                <!--                            </v-row>-->
                <!--                        </v-card-actions>-->
                <!--                    </v-card>-->
                <!--                </v-dialog>-->
                <v-row class="">
                    <v-col sm="12" cols="12" class="pb-0">
                        <template>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                :myLoading="true"/>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>{{ $t('name') }}</th>
                                        <th>{{ $t('code') }}</th>
                                        <th>{{ $t('currency') }}</th>
                                        <th>{{ $t('type') }}</th>
                                        <th>{{ $t('use') }}</th>
                                        <th>{{ $t('set_default') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="pl in priceLevels" v-bind:key="pl.id">
                                        <td class="text-bold">{{ pl.name }}</td>
                                        <td>{{ pl.code }}</td>
                                        <td>{{ pl.currency.code }}</td>
                                        <td>{{ pl.type.name ? pl.type.name : `` }}</td>
                                        <td>
                                            <v-switch
                                                color="primary"
                                                v-model="pl.isUsed"
                                                :label="pl.isUsed ? 'YES' : 'NO'"
                                            />
                                        </td>
                                        <td>
                                            <v-switch
                                                color="primary"
                                                @change="defaultChange(pl)"
                                                v-model="pl.isDefault"
                                                :label="pl.isDefault ? 'YES' : 'NO'"
                                            />
                                        </td>
                                    </tr>
                                    <LoadingMe
                                        :isLoading="compeletLoading"
                                        :fullPage="false"
                                        :myLoading="true"/>
                                    </tbody>
                                </template>
                            </v-simple-table>
                            
                        </template>
                        <div class="function_footer">
                            <v-btn color="primary" class="float-right white--text text-capitalize"
                                   @click="onSaveClose">
                                {{ $t('save') }}
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import PriceLevelModel from "@/scripts/model/pos/PriceLevel"
import kendo from "@progress/kendo-ui"
const $ = kendo.jQuery
const priceLevelHandler = require("@/scripts/priceLevelHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const posHandler = require("@/scripts/posHandler")
const currencyType = {
    FUNCTIONAL_CURRENCY: 'fun-c',
    TRANSACTION_CURRENCY: 'txn-c',
    REPORTING_CURRENCY: 'rpt-c',
    TAX_EXCHANGE_CURRENCY: 'tax-c',
}
export default {
    data: () => ({
        showLoading: false,
        mPriceLevelType: '',
        priceLevelType: [
            'Buy', 'Sell', 'Rent', 'Purchase'
        ],
        mCurrency: '',
        currencies: [],
        priceLevels: [],
        priceLevel: {
            id: '',
            name: '',
            code: '',
            type: '',
            currency: ''
        },
        compeletLoading: false,
        dialogm3: false,
        pricelvType: []
    }),
    props: {},
    methods: {
        async onEditClick(value) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.priceLevel = value
                    this.mCurrency = value.currency
                    this.mPriceLevelType = value.type
                    this.dialogm3 = true
                }, 300);
            })
        },
        async onSetPrice(value, type) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.priceLevel = value
                    const code = value.currency.hasOwnProperty('code') ? value.currency.code : ''
                    this.$router.push({
                        path: 'set_price/' + value.id,
                        name: 'Set Price',
                        params: {id: value.id, priceLevel: value},
                        query: {type: type, name: value.name, code: code}
                    })
                }, 300);
            })
        },
        onNewClick() {
            this.dialogm3 = true
            this.priceLevel.id = ''
            this.clear()
        },
        close() {
            this.dialogm3 = false
        },
        clear() {
            this.priceLevel = {}
        },
        defaultChange(e){
            window.console.log(e)
            $.each(this.priceLevels, function (i,v){
                if(v.id != e.id){
                    v.isDefault = false
                }
            })
        },
        async onSaveClose() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    let data = {
                        priceLevel: this.priceLevels
                    }
                    posHandler.priceLevelPost(new PriceLevelModel(data)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.loadSetting()
                            this.$snotify.success('Success')
                        }
                    }).catch(e => {
                        this.showLoading = false
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
        async loadCurrency() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    currencyHandler.list(currencyType.FUNCTIONAL_CURRENCY).then(response => {
                        if (response.data.statusCode === 200) {
                            this.compeletLoading = false
                            this.currencies = response.data.data.filter(o => o.used === 1)
                        }
                        this.showLoading = false
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300);
            })
        },
        async loadPriceLevel() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.compeletLoading = true
                    priceLevelHandler.get().then(res => {
                        this.compeletLoading = false
                        this.priceLevels = []
                        if (res.length > 0) {
                            let self = this
                            $.each(res, function (i, v) {
                                self.priceLevels.push({
                                    id: v.id,
                                    name: v.name,
                                    code: v.code,
                                    currency: v.currency,
                                    type: v.type,
                                    isUsed: false,
                                    isDefault: false
                                })
                            })
                        }
                    })
                }, 300);
            })
        },
        async loadPriceLevelType() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    priceLevelHandler.priceLevelTypeList().then(res => {
                        if (res.data.statusCode === 200) {
                            this.priceLevelType = res.data.data
                        }
                    })
                }, 300);
            })
        },
        async loadSetting() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    posHandler.priceLevelGet().then(res => {
                        if (res.data.data.length > 0) {
                            this.priceLevels = res.data.data[0].priceLevel
                        }else{
                            this.loadPriceLevel()
                        }
                    })
                }, 300);
            })
        },
    },
    mounted: async function () {
        window.console.log(currencyType.FUNCTIONAL_CURRENCY, 'type')
        await this.loadCurrency()
        await this.loadSetting()
        await this.loadPriceLevelType()
    },
    computed: {},
    components: {
        LoadingMe: () => import(`@/components/Loading`)
    },
};
</script>

<style scoped>
.function_footer {
    padding: 15px;
    display: inline-block;
}

p {
    color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
    height: 47.2px !important;
}

.text_tip {
    font-size: 9px;
    line-height: 10px;
}

@media (max-width: 576px) {
}
</style>
