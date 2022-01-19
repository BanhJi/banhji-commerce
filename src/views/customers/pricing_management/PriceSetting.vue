<template>
    <v-row>
        <v-col sm="12" cols="12" class="pb-0">
            <v-row>
                <v-col sm="8" class="py-0">
                    <p class="mb-0">{{ $t('price_setting_desc') }}</p>
                </v-col>
                <v-col sm="4" class="py-0">
                </v-col>
            </v-row>
            <v-row class="mt-3">
                <v-col sm="4" cols="12" class="py-0">
                    <label class="label mb-0">{{ $t('price_level') }}</label>
                    <v-select class="mt-1"
                              :items="priceLevel"
                              item-value="id"
                              item-text="name"
                              return-object
                              clearable
                              placeholder="Price Level"
                              tage="Default Price Level"
                              outlined
                    />
                </v-col>

                <v-col sm="3" cols="12" class="py-0">
                    <label class="label mb-0">{{ $t('uom') }}</label>
                    <v-select class="mt-1"
                              :items="uom"
                              item-value="id"
                              item-text="name"
                              return-object
                              clearable
                              placeholder="UOM"
                              tage="UOM"
                              outlined
                    />
                </v-col>

                <v-col sm="3" cols="12" class="py-0">
                    <label class="label mb-0">{{ $t('effective_date') }}</label>
                    <app-datepicker :initialDate="effectiveDate" @emitDate="effectiveDate = $event"/>
                </v-col>

                <v-col sm="1" cols="1" class="pt-1">
                    <v-btn color="primary white--text">
                        <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class="">
                <v-col sm="12" cols="12" class="pb-0">
                    <template>
                        <kendo-datasource ref="itemListDS"
                                          :group="group"
                                          :data="itemList"/>
                        <kendo-grid id="gridItemList" class="grid-function"
                                    :data-source-ref="'itemListDS'"
                                    :editable="false"
                                    :navigatable="true"
                                    :noRecords="true"
                                    :scrollable-virtual="true">
                            <kendo-grid-column
                                :field="'no'"
                                :title="'no'"
                                :template="rowNumberTmpl"
                                :width="50"
                                :column-menu="false"
                                :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                                :attributes="{style: 'text-align: center'}"/>
                            <kendo-grid-column
                                :field="'item'"
                                :title="$t('item')"
                                :width="120"
                                :template="'<span>#=item#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            <kendo-grid-column
                                :field="'uom'"
                                :title="$t('uom')"
                                :width="120"
                                :template="'<span>#=uom#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            <kendo-grid-column
                                :field="'lastPrice'"
                                :title="$t('last_price')"
                                :width="110"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            <kendo-grid-column
                                :field="'newPrice'"
                                :title="$t('new_price')"
                                :width="120"
                                :template="'<span>#=newPrice||0#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            <kendo-grid-column
                                :field="'type'"
                                :title="$t('type')"
                                :width="100"
                                :template="'<span>#=type#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                        </kendo-grid>
                        <LoadingMe
                            :isLoading="showLoading"
                            :fullPage="false"
                            :myLoading="true"/>
                    </template>
                </v-col>
            </v-row>
            <!-- Dialog -->
        </v-col>
    </v-row>
</template>

<script>
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";

const priceLevelHandler = require("@/scripts/priceLevelHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
export default {
    name: 'PriceSetting',
    data: () => ({
        mPriceLevelType: '',
        priceLevelType: [
            'Buy', 'Sell', 'Rent', 'Purchase'
        ],
        itemList: [],
        showLoading: false,
        group: {field: 'type'},
        uom: [],
        effectiveDate: new Date().toISOString().substr(0, 10),
        priceLevel: []
    }),
    props: {},
    methods: {
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.itemListDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
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
        async onSaveClose() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    if (this.priceLevel.id === '' || this.priceLevel.id === undefined) {
                        let data = {
                            "code": this.priceLevel.code,
                            "name": this.priceLevel.name,
                            "type": this.mPriceLevelType,
                            "currency": this.mCurrency
                        }
                        priceLevelHandler.create(data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.loadPriceLevel()
                                this.clear()
                                this.close()
                            }
                        }).catch(e => {
                            this.errors.push(e)
                        })
                    } else {
                        let isTypeChanged = 1;
                        if (this.mPriceLevelType === this.priceLevel.type) {
                            isTypeChanged = 0
                        }
                        let isCurrencyChanged = 1;
                        if (this.mCurrency.id === this.priceLevel.currency.id) {
                            isCurrencyChanged = 0
                        }
                        let data = {
                            "code": this.priceLevel.code,
                            "name": this.priceLevel.name,
                            "type": this.mPriceLevelType,
                            "currency": this.mCurrency,
                            "isTypeChanged": isTypeChanged,
                            "isCurrencyChanged": isCurrencyChanged,
                            "delPriceLevelTypeId": this.priceLevel.type,
                            "delCurrencyId": this.priceLevel.currency.id,

                        }
                        priceLevelHandler.update(this.priceLevel.id, data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.loadPriceLevel()
                                this.clear()
                                this.close()
                            }
                        }).catch(e => {
                            this.errors.push(e)
                        })
                    }
                }, 300);
            })
        },
        async loadCurrency() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    currencyHandler.get().then(res => {
                        this.showLoading = false
                        this.currencies = res.filter(o => o.used === 1)
                    })
                }, 300);
            })
        },
        async loadPriceLevel() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    priceLevelHandler.get().then(res => {
                        this.showLoading = false
                        this.priceLevel = res
                    })
                }, 300);
            })
        },
    },
    mounted: async function () {
        await this.loadPriceLevel()
    },
    computed: {},
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
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

.lightGrey {
    background: #F8F8F9;
}

.text_tip {
    font-size: 9px;
    line-height: 10px;
}

.grid-function table th {
    background-color: #fff !important;
    text-align: left;
    font-family: 'Niradei-Bold', serif;
    font-size: 11px !important;
    color: #000 !important;
    border-top: thin solid rgba(0, 0, 0, 0.12);
    border-bottom: 3px solid rgba(0, 0, 0, 0.12) !important;
    border-left-style: dotted !important;
    text-transform: uppercase;
    vertical-align: middle;
    padding: 8px 12px !important;
}

.grid-function .k-grid-header .k-grid-filter, .grid-function .k-grid-header .k-header-column-menu {
    bottom: 3px !important;
}

@media (max-width: 576px) {
}
</style>
