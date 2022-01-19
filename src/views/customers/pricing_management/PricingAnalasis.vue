<template>
    <v-row>
        <v-col sm="12" cols="12" class="">
            <v-card color="white" class="pl-4 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" class="py-0">
                        <h2 class="mb-1 font_20">{{ $t("pricing_analysis") }}</h2>
                        <p class="mb-2">{{ $t("pricing_analysis_desc") }}</p>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0 kendo_dropdown_custom">
                        <v-col sm="12" cols="12" class="pt-0 pb-4 kendo_dropdown_custom">
                            <label>{{ $t("product_categories") }}</label>
                            <product-category-dropdownlist
                                :initCategory="category"
                                @onChange="onCategoryChanged"
                            />
                        </v-col>
                        <v-col sm="12" cols="12" class="pt-0 kendo_dropdown_custom">
                            <label>{{ $t("product_group") }}</label>
                            <product-group-dropdownlist
                                :initProductGroup="group"
                                @onChange="onGroupChanged"
                            />
                        </v-col>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0 kendo_dropdown_custom">
                        <label>{{ $t("price_level") }}</label>
                        <div class="d-flex">
                            <div style="width:50px;" class="code_text mt-1  text-bold">{{ code }}</div>
                            <v-select class="mt-1 custom-border"
                                      v-model="priceLevel"
                                      :items="priceLevels"
                                      item-value="id"
                                      item-text="name"
                                      return-object
                                      @change="onPriceLevelChanged"
                                      outlined/>
                        </div>
                        <label>{{ $t("uom") }}</label>
                        <uom-dropdownlist
                            :initUOM="uom"
                            @onChange="onUOMChanged"
                        />
                    </v-col>
                    <v-col sm="4" cols="12" class="py-0">
                        <!--                        <label>{{ $t("round_rule") }}</label>-->
                        <!--                        <v-select :items="roundedRule" v-model="round" class="mt-1" outlined/>-->
                        <label>{{ $t("method") }}</label>
                        <v-select :items="methodRule" v-model="method" class="mt-1" outlined/>

                        <label>{{ $t("margin") }}</label>
                        <div class="d-flex">
                            <div style="width:50px;" class="code_text mt-1  text-bold">%</div>
                            <v-text-field class="mt-1 flex-1 custom-border"
                                          type="number"
                                          v-model="base"
                                          min="0"
                                          max="100"
                                          outlined/>
                            <v-btn color="primary white--text mt-1 ml-2" @click="loadItems">
                                <i
                                    class="b-search"
                                    style="font-size: 18px; color:#fff !important;"
                                />
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
                <v-row class="mt-0">
                    <v-col sm="12" cols="12" class="pb-0 pt-0">
                        <template>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                :myLoading="true"
                            />
                            <kendo-datasource ref="itemListDS" :data="itemList"/>
                            <kendo-grid
                                id="gridItems"
                                class="grid-function"
                                :data-source-ref="'itemListDS'"
                                :editable="false"
                                :navigatable="true"
                                :noRecords="true"
                                :toolbar="['excel']"
                                :excel-file-name="'PriceBook.xlsx'"
                                :excel-filterable="true"
                                :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'no'"
                                    :title="'no'"
                                    :template="rowNumberTmpl"
                                    :width="40"
                                    :column-menu="false"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                                    :attributes="{style: 'text-align: center'}"/>
                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('item')"
                                    :width="250"
                                    :editable="()=>{ return false}"
                                    :template="'<span>#=name#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'code'"
                                    :title="$t('unit')"
                                    :width="250"
                                    :editable="()=>{ return false}"
                                    :template="'<span>#=code#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'price'"
                                    :title="$t('current_price')"
                                    :width="120"
                                    :template="'<span>#=kendo.toString(price, decimalFormat)#</span>'"
                                    :editable="()=>{ return false}"
                                    :attributes="{style: 'text-align: right'}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'cost'"
                                    :title="$t('last_cost')"
                                    :width="120"
                                    :editable="()=>{ return true}"
                                    :template="'<span>#=kendo.toString(cost, decimalFormat)#</span>'"
                                    :attributes="{style: 'text-align: right'}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'newPrice'"
                                    :title="$t('new_price')"
                                    :width="120"
                                    :editable="()=>{ return true}"
                                    :template="newPriceTemplate"
                                    :attributes="{style: 'text-align: right'}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'variance'"
                                    :title="$t('variance')"
                                    :width="120"
                                    :editable="()=>{ return true}"
                                    :template="'<span>#=kendo.toString(variance, decimalFormat)# %</span>'"
                                    :attributes="{style: 'text-align: right'}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            </kendo-grid>

                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import {UomModel} from "@/scripts/model/AppModels";
import CategoryModel from "@/scripts/model/Categories";
import GroupModel from "@/scripts/model/ProductGroup";
import priceLevelHandler from "@/scripts/priceLevelHandler";
import productVariantHandler from "@/scripts/productVariantHandler";
import currencyHandler from "@/scripts/currency/handler/currencyHandler";
import kendo from "@progress/kendo-ui";

export default {
    data: () => ({
        roundedRule: ["Round Up", "Round Down"],
        round: 'Round Up',
        methodRule: ["Margin", "Markup"],
        method: "Margin",
        priceLevels: [],
        itemList: [],
        priceLevel: {},
        valid: true,
        showLoading: false,
        dialogM3: false,
        uom: new UomModel({}),
        category: new CategoryModel({}),
        group: new GroupModel({}),
        code: '',
        base: 100,
        txnRate: 1
    }),
    props: {},
    methods: {
        roundDown(number, decimals) {
            decimals = decimals || 0;
            const options = {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            };
            const formatted = Number(number).toLocaleString('en', options);
            window.console.log('down', formatted, 'numbher', number)
            return formatted;
        },
        newPriceTemplate(dataItem) {
            return kendo.toString(parseFloat(dataItem.newPrice), dataItem.decimalFormat)
            // // const roundOne = (n, d) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d)
            // if (this.round === 'Round Up') {
            //     return kendo.toString(parseFloat(dataItem.newPrice), dataItem.decimalFormat)
            // } else {
            //     const decimalFormat = dataItem.decimalFormat || 2
            //     const decimals = decimalFormat.includes('n') ? decimalFormat.replace('n', '') : decimalFormat
            //     return this.roundDown(dataItem.newPrice, parseInt(decimals))
            // }
        },
        async loadTransactionRate() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const date = new Date().toISOString().substr(0, 10);
                    const priceLevel = this.priceLevel || {};
                    const currency = priceLevel.currency || {}
                    const code = currency.code || ''
                    if (code) {
                        this.showLoading = true;
                        currencyHandler
                            .getLastExchangeRateByDate(date, code)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    const exchangeRate = res.data.data[0];
                                    this.txnRate = exchangeRate.rate;
                                    this.showLoading = false;
                                }
                            });
                    }
                }, 10);
            });
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.itemListDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        onPriceLevelChanged() {
            const pl = this.priceLevel || {}
            const currency = pl.currency || {}
            this.code = currency.code || ''
            this.loadTransactionRate()
        },
        onUOMChanged(value) {
            this.uom = value
            window.console.log('uom', value)
        },
        onCategoryChanged(value) {
            this.category = value
            window.console.log('category', value)
        },
        onGroupChanged(value) {
            this.group = value
            window.console.log('group', value)
        },
        async loadPriceLevel() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const strFilter = '?nature=sale'
                    priceLevelHandler.get(strFilter).then(res => {
                        const data = res || []
                        this.priceLevels = data.filter(n => n.type.name === 'Standard')
                    })

                }, 10)
            })
        },
        async loadItems() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    let type = 'Variant', plId = '', uomId = '', cateId = '', groupId = ''
                    if (this.priceLevel) {
                        plId = this.priceLevel.id || ''
                    }
                    if (this.uom) {
                        uomId = this.uom.id || ''
                    }
                    if (this.category) {
                        cateId = this.category.id || ''
                    }
                    if (this.group) {
                        groupId = this.group.id || ''
                    }
                    const strFilter = '?plId=' + plId + '&uomId=' + uomId + '&type=' + type + '&catId=' + cateId +
                        '&groupId=' + groupId + '&lastCost=' + true + '&base=' + this.base + '&' +
                        '&round=' + this.round.toLowerCase() + '&method=' + this.method.toLowerCase() + '&rate=' + this.txnRate
                    this.showLoading = true
                    productVariantHandler.itemByPriceLevel(strFilter).then(response => {
                        if (response.data.statusCode === 200) {
                            this.showLoading = false
                            this.itemList = response.data.data
                        }
                    }).catch(e => {
                        this.showLoading = false
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })

                })
            })
        },
    },
    mounted: async function () {
        this.group = {}
        this.category = {}
        this.uom = {}
        await this.loadPriceLevel()
    },
    computed: {},
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "uom-dropdownlist": () => import("@/components/dropdownlist/UOMDropDownList"),
        "product-category-dropdownlist": () => import("@/components/dropdownlist/ProductCategoryDropDownList"),
        "product-group-dropdownlist": () => import("@/components/dropdownlist/ProductGroupDropDownList"),
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
