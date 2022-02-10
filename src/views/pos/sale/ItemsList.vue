<template>
    <div>
        <v-row>
            <v-col sm="3" cols="6" class="pa-1 py-0 pr-0">
                <v-select class="mt-1 rounded-0 "
                          clearable
                          outlined
                          :label="$t('code')"
                />
            </v-col>
            <v-col sm="9" cols="6" class="pa-1 py-0">
                <v-text-field
                    class="mt-1 rounded-0 "
                    outlined
                    :label="$t('scan_code')"
                    append-icon="mdi-barcode-scan"
                ></v-text-field>
            </v-col>
            <v-col md="4" sm="4" xs="6" cols="12" class="pa-1" v-for="item in items" :key="item.id">
                <v-card
                    class="pb-0"
                    elevation="0"
                    max-width="200"
                >
                    <template slot="progress">
                        <v-progress-linear
                            color="deep-purple"
                            height="10"
                            indeterminate
                        ></v-progress-linear>
                    </template>

                    <v-img
                        height="140"
                        :src="item.img"
                    ></v-img>
                    <p class="pa-2 name-items" style="height: 32px;">{{ item.name }}</p>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text class="py-0 text-white" style="background-color: #898c8f;text-align: center;">
                        <h2 class="text-white mb-0" style="font-size:18px;"> {{ item.price }} ៛</h2>
                    </v-card-text>
                </v-card>
            </v-col>

        </v-row>
    </div>

</template>
<script>
import kendo from "@progress/kendo-ui"
const $ = kendo.jQuery
const productHandler = require("@/scripts/productHandler")
const categoryHandler = require("@/scripts/categoryHandler")
export default {
    data: () => ({
        items: [
            // {
            //     id: 1,
            //     name: 'ចំណីមាន់',
            //     img: require('@/assets/images/img-03.jpg'),
            //     calories: 262,
            //     fat: 16.0,
            //     price: 65000,
            //     protein: 6.0,
            //     iron: '7%',
            // },
            // {
            //     id: 2,
            //     name: 'ថ្នាំកសិកម្ម',
            //     img: require('@/assets/images/img-04.jpg'),
            //     calories: 262,
            //     fat: 16.0,
            //     price: 12500,
            //     protein: 6.0,
            //     iron: '7%',
            // },
            // {
            //     id: 6,
            //     name: 'ជីអ៊ុយរ៉េ',
            //     img: require('@/assets/images/img-05.jpg'),
            //     calories: 262,
            //     fat: 16.0,
            //     price: 83000,
            //     protein: 6.0,
            //     iron: '7%',
            // },
            //
            // {
            //     id: 14,
            //     name: 'ប្រហុក',
            //     img: require('@/assets/images/img-02.jpg'),
            //     calories: 262,
            //     fat: 16.0,
            //     price: 13000,
            //     protein: 6.0,
            //     iron: '7%',
            // },
            // {
            //     id: 15,
            //     name: 'សាប៊ូលាងចាន',
            //     img: require('@/assets/images/img-01.jpg'),
            //     calories: 262,
            //     fat: 16.0,
            //     price: 9500,
            //     protein: 6.0,
            //     iron: '7%',
            // },
        ],
        search: '',
        categories: [],
        mCategory: {},
    }),
    methods: {
        reserve() {
            this.loading = true
            setTimeout(() => (this.loading = false), 2000)
        },
        clickItem(val) {
            this.$emit('itemSeleted', val)
        },
        async loadCategory() {
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
                }, 50);
            })
        },
        async onCategoryChanged() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    if (this.mCategory !== undefined) {
                        if (this.mCategory.id !== null) {
                            this.isLoaded = true
                            this.showLoading = true
                            productHandler.filter(this.mCategory.id, this.search).then(res => {
                                this.showLoading = false
                                // this.items = res
                                if(res.length > 0){
                                    let self = this
                                    $.each(res, function (i,v){
                                        self.items.push({
                                            id: v.id,
                                            name: v.name,
                                            img: v.images.gallery.length > 0 ? 'https://s3-ap-southeast-1.amazonaws.com/images.banhji/'+v.images.gallery[0].thumb : '',
                                            calories: 262,
                                            fat: 16.0,
                                            price: 9500,
                                        })
                                    })
                                }
                                window.console.log(this.items)
                            })
                        }
                    }
                }, 50);
            })
        },
    },
    mounted: async function () {
        await this.loadCategory()
    },
    created: async function () {
    },
}
</script>
<style scoped>
.v-card__title {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    font-size: 12px !important;
    font-weight: 500;
    letter-spacing: normal !important;
    line-height: 13px !important;
    word-break: break-all;
    text-align: center;
}

.v-application--wrap {
    min-height: 80vh !important;
}

.theme--light.v-tabs-items {
    background-color: #FFFFFF;
    height: 550px !important;
    overflow: scroll !important;
}

.v-sheet.v-card:not(.v-sheet--outlined) {
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
}

.name-items {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 15px;
    text-align: center;
    margin-bottom: 5px;
}

</style>