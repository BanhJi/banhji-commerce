<template>
    <v-row>
        <v-col cols="12" sm="12">
            <h2 class="mb-0">{{ $t('products_list') }}</h2>

            <!-- loading -->
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                :myLoading="true"/>

            <v-row class="">
                <v-col sm="3" cols="12" class="py-0">
                    <v-text-field class=""
                                  outlined
                                  :placeholder="$t('name')"
                                  append-icon="search"
                                  v-model="search"
                                  @change="onCategoryChanged"
                                  clearable/>
                </v-col>
                <v-col sm="3" cols="12" class="py-0">
                    <v-select class=""
                              tage="Product Category"
                              v-model="mCategory"
                              :items="categories"
                              item-value="id"
                              :item-text="item =>`${item.abbr} - ${item.name}`"
                              @change="onCategoryChanged"
                              return-object
                              :placeholder="$t('category')"
                              clearable
                              outlined/>
                </v-col>

            </v-row>

            <div class="reports_table">
                <kendo-datasource ref="dataSource"
                                  :data="products"
                                  :schema="gridSchema"
                                  :server-paging="false"
                                  :group="groupDefinition"/>
                <kendo-grid id="grid"
                            class="grid-function"
                            :data-source-ref="'dataSource'"
                            :style="{width: '100%'}"
                            :noRecords="true"
                            :groupable="true"
                            :column-menu="true"
                            :pageable-numeric="false"
                            :pageable-previous-next="false"
                            :pageable-messages-display="'Showing {2} data items'"
                            :scrollable-virtual="true">

                    <kendo-grid-column
                        :field="'name'"
                        :title="$t('name')"
                        :attributes="{class:'tb_name_td'}"
                        :width="150"
                        :template="'<span>#=name#</span>'"
                        :groupHeaderColumnTemplate="'#=value#'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'images'"
                        :title="$t('image')"
                        :width="50"
                        :template="loadImage"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'product.category.name'"
                        :title="$t('category')"
                        :template="'<span>#=product.category.name#</span>'"
                        :width="80"
                        :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :field="''"
                        :hidden="true"
                        :title="$t('warehouse')"
                        :width="80"
                        :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :field="''"
                        :hidden="true"
                        :title="$t('qty')"
                        :width="80"
                        :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :field="'sku'"
                        :title="$t('sku')"
                        :width="60"
                        :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :field="'uom.name'"
                        :title="$t('uom')"
                        :width="40"
                        :template="'<span>#=uom.name#</span>'"
                        :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :field="'reOrderQty'"
                        :title="$t('recorder_point')"
                        :width="50"
                        :template="'<span>#=reOrderQty#</span>'"
                        :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                </kendo-grid>
            </div>
        </v-col>
    </v-row>
</template>

<script>
const productHandler = require("@/scripts/productHandler")
const categoryHandler = require("@/scripts/categoryHandler")

export default {
    name: "Warehouse Product",
    components: {
        LoadingMe: () => import('@/components/Loading'),
        // 'app-datepicker': DatePickerComponent,
    },
    data: () => ({
        showLoading: false,

        isLoaded: false,
        // Kendo dataSource
        schemaDefinition: {
            model: {id: "id"}
        },
        /* Sort by account number */
        sortDefinition: {field: "number"},
        // Group order by account_type_id asc
        products: [],

        gridSchema: {
            model: {
                id: "id"
            }
        },
        groupDefinition: {
            field: "product.name",
        },
        imgURL: 'https://s3-ap-southeast-1.amazonaws.com/images.banhji/',
        categories: [],
        search: '',
        mCategory: '',
    }),
    methods: {
        loadImage(dataItem) {
            if (dataItem.hasOwnProperty('images')) {
                if (dataItem.images.hasOwnProperty('default')) {
                    const url = this.imgURL + dataItem.images.default.thumb
                    return "<img width='50' height='50' style= 'margin: auto;display: block;' src='" + url + "' />"
                }
            } else {
                return ''
            }
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.dataSource.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        async onCategoryChanged() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    if (this.mCategory !== undefined) {
                        this.isLoaded = true
                        this.showLoading = true
                        productHandler.filter(this.mCategory.id, this.search).then(res => {
                            this.showLoading = false
                            // this.variants = res
                            this.products = res
                            this.showLoading = false
                            window.console.log(res)
                        })
                    }
                }, 300);
            })
        },
        async loadCategory() {
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    categoryHandler.get().then(res => {
                        this.showLoading = false
                        this.categories = res
                        this.categories = this.categories.filter(m => m.type.name === 'Product')
                        if (this.categories.length > 0) {
                            this.mCategory = this.categories[0]
                            this.onCategoryChanged()
                        }
                    })
                }, 300);
            })
        },
        async onloadProduct() {
            await productHandler.get().then(res => {
                this.products = res
                window.console.log(res)
            })
        },
    },
    async mounted() {
        await this.loadCategory()
    },
    computed: {
    },
};
</script>
<style scoped>
.purchases {
    position: relative;
    width: 100%;
    background-color: #fff;
    padding: 20px 20px 5px;
}

.report_filter {
    background-color: #edf1f5;
    padding: 0 20px 0px 20px;
}

.report_block .v-card.third {
    background-color: #00b050;
    border: none;
    box-shadow: none;
    color: #ffffff;
    float: left;
    width: 100%;
}

.report_block .v-card.third p.text {
    text-align: left;
    font-size: 17px;
}

.report_block .v-card.third p.number {
    text-align: center;
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 0;
}

.dv_mt {
    margin-top: 20px;
}

.report_block .left_card p:nth-child(2) {
    width: 100%;
    font-size: 19px;
    font-family: "Niradei-Bold", serif;
    padding: 7px 0 0 0;
    text-align: right;
}

.attachment_table table tr th {
    height: 55px !important;
}

@media (max-width: 576px) {
    .dv_mt,
    .dv_mt8 {
        margin-top: 0;
    }

    .purchases {
        margin-top: 0;
    }
}
</style>
