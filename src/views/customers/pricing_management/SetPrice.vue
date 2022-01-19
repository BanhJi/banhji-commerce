<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t("set_price") }}</h2>
                                <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right">close
                                </v-icon>
                            </v-card>
                            <v-card outlined dense class="px-3 no_border" color="grayBg">
                                <v-row>
                                    <v-col sm="2" cols="12" class="pb-0">
                                        <label class="label  mb-0">{{ $t("price_level") }}</label>
                                        <p> {{ priceLevelName }} </p>
                                        <p> {{ code }} </p>
                                    </v-col>
                                    <v-col sm="3" cols="12" class="pb-0">
                                        <label class="label  mb-0 mt-1" style="">{{
                                                $t("category")
                                            }}</label>
                                        <v-select class="mt-1"
                                                  v-model="mCategory"
                                                  :items="categories"
                                                  item-value="id"
                                                  item-text="name"
                                                  return-object
                                                  outlined
                                        />
                                    </v-col>
                                    <v-col sm="3" cols="12" class="pb-0">
                                        <label class="label  mb-0 mt-1" style="">{{
                                                $t("uom")
                                            }}</label>
                                        <v-select class="mt-1"
                                                  v-model="mUOM"
                                                  :items="uoms"
                                                  item-value="id"
                                                  item-text="name"
                                                  return-object
                                                  clearable
                                                  outlined
                                        />
                                    </v-col>
                                    <v-col sm="3" cols="12" class="pb-0">
                                        <label class="label  mb-0 mt-1" style="">{{
                                                $t("effective_date")
                                            }}</label>
                                        <app-datepicker :initialDate="effectiveDate"
                                                        @emitDate="effectiveDate = $event"/>
                                    </v-col>
                                    <v-col sm="1" cols="1" class="pt-9">
                                        <v-btn color="primary white--text" @click="loadItems">
                                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card outlined dense class="no_border mb-1" color="white">
                                <v-row>
                                    <v-col sm="12" cols="12" class="">
                                        <v-row>
                                            <v-col sm="12">
                                                <h3 class=" mb-0">
                                                    <!--                                                    {{ $t("product_to_add_into_this_catalog") }}-->
                                                </h3>
                                            </v-col>
                                            <v-col cols="12">
                                                <kendo-datasource ref="itemListDS"
                                                                  :change="onDataSourceChanged"
                                                                  :data="itemList"/>
                                                <kendo-grid id="gridItemList" class="grid-function"
                                                            :data-source-ref="'itemListDS'"
                                                            :editable="true"
                                                            :navigatable="true"
                                                            :noRecords="true"
                                                            :scrollable-virtual="true">
                                                    <kendo-grid-column
                                                        :field="'no'"
                                                        :title="'no'"
                                                        :template="rowNumberTmpl"
                                                        :width="80"
                                                        :column-menu="false"
                                                        :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                                                        :attributes="{style: 'text-align: center'}"/>
                                                    <kendo-grid-column
                                                        :field="'name'"
                                                        :title="$t('item')"
                                                        :width="200"
                                                        :editable="()=>{ return false}"
                                                        :template="'<span>#=name#</span>'"
                                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                    <kendo-grid-column
                                                        :field="'code'"
                                                        :title="$t('unit')"
                                                        :width="120"
                                                        :editable="()=>{ return false}"
                                                        :template="'<span>#=code || ``#</span>'"
                                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                    <kendo-grid-column
                                                        :field="'price'"
                                                        :title="$t('price')"
                                                        :width="120"
                                                        :template="'<span>#=kendo.toString(price, decimalFormat)#</span>'"
                                                        :editable="()=>{ return false}"
                                                        :attributes="{style: 'text-align: right'}"
                                                        :headerTemplate="priceHeaderTemplate"
                                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                    <kendo-grid-column
                                                        :field="'newPrice'"
                                                        :title="$t('new_price')"
                                                        :width="120"
                                                        :editable="()=>{ return true}"
                                                        :editor="AmountEditor"
                                                        :headerTemplate="newPriceHeaderTemplate"
                                                        :template="'<span>#=kendo.toString(newPrice, decimalFormat)#</span>'"
                                                        :attributes="{style: 'text-align: right'}"
                                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                    <kendo-grid-column
                                                        :field="'variance'"
                                                        :title="$t('variance')"
                                                        :width="120"
                                                        :editable="()=>{ return false}"
                                                        :template="'<span>#=kendo.toString(variance, decimalFormat)# %</span>'"
                                                        :attributes="{style: 'text-align: right'}"
                                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                </kendo-grid>

                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider/>
                            <v-card outlined dense class="no_border function_footer">
                                <v-btn @click="cancel"
                                       color="black"
                                       outlined
                                       class="text-capitalize  black--text float-left"
                                >{{ $t("cancel") }}
                                </v-btn>

                                <v-btn @click="onSaveClose"
                                       color="primary"
                                       class="float-right  white--text text-capitalize"
                                >{{ $t("save_close") }}
                                </v-btn>

                            </v-card>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>
import UOMPriceModel from "@/scripts/uom_price/model/uomPrice";

const uomPriceModel = new UOMPriceModel({})
const productVariantHandler = require("@/scripts/productVariantHandler")
const uomHandler = require("@/scripts/uomHandler")
const categoryHandler = require("@/scripts/categoryHandler")
// const $ = require("jquery")
import kendo from "@progress/kendo-ui";

export default {
    name: "PriceLevelSetPrice",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': () => import(`@/components/custom_templates/DatePickerComponent`),
    },
    data: () => ({
        showLoading: false,
        valid: true,
        uomPrice: uomPriceModel,
        group: {field: 'type'},
        mUOM: {},
        mCategory: {},
        uoms: [],
        categories: [],
        itemList: [],
        effectiveDate: new Date().toJSON(),
    }),
    methods: {
        /* todo variance = (new price/price) - 1*/
        onDataSourceChanged(e) {
            if (e.field) {
                let dataRow = e.items[0]
                switch (e.field) {
                    case "newPrice":
                        dataRow.set('variance', (((parseFloat(dataRow.newPrice) / parseFloat(dataRow.price)) - 1) * 100))
                        break
                    default:
                        break
                }
            }
        },
        AmountEditor(container, options) {
            kendo.jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 30,
                    format: `5`
                });
        },
        async initData() {
            if (this.$route.params.id !== undefined) {
                // await this.loadSingleProject()
            } else {
                this.clear()
            }
        },
        clear() {
            this.itemList = []
            this.uoms = []
            this.categories = []
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.itemListDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        cancel() {
            window.history.go(-1)
        },
        close() {
            window.history.go(-1)
            // this.$router.push({
            //     name: 'Customers', params: {
            //         data: data
            //     }
            // })
        },

        async loadItems() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const query = this.$route.query
                    let type = '', plId = '', uomId = '', cateId = ''
                    if (query.hasOwnProperty('type') && this.mCategory.id !== undefined && this.mUOM.id !== undefined) {
                        if (query.hasOwnProperty('type')) {
                            type = query.type
                        }
                        if (this.$route.params.id) {
                            plId = this.$route.params.id
                        }
                        if (this.mUOM) {
                            uomId = this.mUOM.id
                        }
                        if (this.mCategory) {
                            cateId = this.mCategory.id
                        }
                        const strFilter = '?plId=' + plId + '&uomId=' + uomId + '&type=' + type + '&catId=' + cateId
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
                    }

                })
            })
        },
        async loadUOM() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    uomHandler.get().then(res => {
                        this.compeletLoading = false
                        this.uoms = res
                    })
                }, 10);
            })
        },
        async loadCategory() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    categoryHandler.get().then(res => {
                        this.showLoading = false
                        const type = this.$route.query.type
                        if (type === 'Variant') {
                            this.categories = res.filter(n => n.type.name === 'Product')
                        } else if (type === 'Service') {
                            this.categories = res.filter(n => n.type.name === 'Service')
                        }
                    })
                }, 10);
            })
        },
        async onSaveClose() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let itemLineDS = this.$refs.itemListDS.kendoWidget()
                    const items = itemLineDS.data().filter(o => parseFloat(o.newPrice) > 0).map(m => {
                        return {
                            id: m.id,
                            ucId: m.ucId,
                            uomConvertId: m.uomConvertId,
                            vatTax: m.vatTax || {},
                            otherTax: m.otherTax || {},
                            specificTax: m.specificTax || {},
                            purchaseTax: m.purchaseTax || {},
                            publicLightingTax: m.publicLightingTax || {},
                            code: m.code || '',
                            groupId: m.groupId,
                            price: m.price,
                            newPrice: m.newPrice,
                            uom: m.uom,
                            name: m.name,
                            sku: m.sku,
                            isUpdate: m.isUpdate,
                            variance: m.variance
                        }
                    })
                    if (items.length > 0) {
                        let data = {
                            "priceLevelId": this.$route.params.id,
                            "data": items,
                            "uomId": this.mUOM.id,
                            "uom": this.mUOM,
                            "categoryId": this.mCategory.id,
                            "appliedDate": new Date(this.effectiveDate).toISOString().substr(0, 10),
                            "appliedDate_": this.effectiveDate,
                            "type": this.$route.query.type
                        }
                        // window.console.log(data, 'data')
                        this.showLoading = true
                        productVariantHandler.itemSetPrice(data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.showLoading = false
                                this.$snotify.success('Successfully')
                                this.close()
                                // this.itemList = response.data.data
                            }
                        }).catch(e => {
                            this.showLoading = false
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }
                }, 10);
            })
        },
    },
    mounted: async function () {
        await this.initData()
        await this.loadUOM()
        await this.loadCategory()
    },
    computed: {
        priceHeaderTemplate() {
            if (this.code) {
                return 'Price (' + this.code + ')'
            }
            return 'Price'
        },
        newPriceHeaderTemplate() {
            if (this.code) {
                return 'New Price (' + this.code + ')'
            }
            return 'New Price'
        },
        priceLevelName() {
            if (this.$route.query) {
                const query = this.$route.query
                if (query.hasOwnProperty('name')) {
                    return query.name
                }

            }
            return ''
        },
        code() {
            if (this.$route.query) {
                const query = this.$route.query
                if (query.hasOwnProperty('code')) {
                    return query.code
                }

            }
            return ''
        }
    },
    activated() {
        this.itemList = []
        this.loadCategory()
    },
    watch: {
        id() {

            this.loadCategory()
        }
    },

};
</script>

<style scoped>
.dropdown-header {
    border-width: 0 0 1px 0;
    text-transform: uppercase;
}

.dropdown-header > span {
    display: inline-block;
    padding: 10px;
}

.dropdown-header > span:first-child {
    width: 50px;
}

.k-list-container > .k-footer {
    padding: 10px;
}

.function_content {
    padding: 0 25px 25px;
    border-bottom: 0;
    background-color: #fff !important;
}

@media (min-width: 1264px) {
    .container {
        /* max-width: 1185px; */
        max-width: 1080px !important;
    }
}

.grayBg {
    background-color: #F8F8F9;
}

@media (max-width: 576px) {
    .mb-6 {
        margin-bottom: 0 !important;
    }
}

.section2 {
    border: 1px solid #d6d7d8;
}

.border_grey {
    border: 1px solid #d6d7d8;
}

.attachment_table {
    width: 100%;
}

.my_radio [type="radio"] + label {
    position: relative;
    padding: 6px;
    grid-template-columns: 15% 80% !important;
    display: grid;
}

.upload_btn {
    padding: 10px 6px;
    text-align: center;
    color: white;
    margin-top: 15px;
    margin-bottom: none !important;
    border-radius: 22px;
    background: #92d050;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
</style>
