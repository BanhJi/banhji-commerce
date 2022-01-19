<template>
    <v-row class="">
        <!-- not modal -->
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('purchase_form_content') }}</h2>
            <p class="mb-3">{{ $t('purchase_form_content_desc') }} </p>
            <template>
                <v-simple-table class="attachment_table">
                    <template>
                        <tbody>
                        <tr>
                            <td class="text-bold">{{ $t('date_from') }}</td>
                            <td>{{ $t('supply_setting_date_from_desc') }}</td>
                            <td style="width:150px" class="align-center justify-center d-flex text-bold">
                                <v-switch
                                    v-model="purchaseFormContent.serviceDate"
                                    color="primary"
                                    :label="purchaseFormContent.serviceDate ? 'ON' : 'OFF'"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('date_to') }}</td>
                            <td>{{ $t('date_to_payable_desc') }}</td>
                            <td style="width:150px" class="primary--text align-center justify-center d-flex  text-bold">
                                <v-switch
                                    v-model="purchaseFormContent.serviceDateTo"
                                    color="primary"
                                    :label="purchaseFormContent.serviceDateTo ? 'ON' : 'OFF'"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('discount_item') }}</td>
                            <td>{{ $t('discount_item_payable_desc') }}</td>
                            <td style="width:150px" class="primary--text align-center justify-center d-flex  text-bold">
                                <v-switch
                                    v-model="purchaseFormContent.discountItem"
                                    color="primary"
                                    :label="purchaseFormContent.discountItem ? 'ON' : 'OFF'"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('class_one') }}</td>
                            <td>{{ $t('class_one_desc') }}</td>
                            <td style="width:150px" class="align-center justify-center d-flex  text-bold">
                                <v-switch
                                    v-model="purchaseFormContent.class1"
                                    color="primary"
                                    :label="purchaseFormContent.class1 ? 'ON' : 'OFF'"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('class_two') }}</td>
                            <td>{{ $t('class_two_desc') }}</td>
                            <td style="width:150px" class="align-center justify-center d-flex  text-bold">
                                <v-switch
                                    v-model="purchaseFormContent.class2"
                                    color="primary"
                                    :label="purchaseFormContent.class2 ? 'ON' : 'OFF'"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('class_three') }}</td>
                            <td>{{ $t('class_three_desc') }}</td>
                            <td style="width:150px" class="align-center justify-center d-flex  text-bold">
                                <v-switch
                                    v-model="purchaseFormContent.class3"
                                    color="primary"
                                    :label="purchaseFormContent.class3 ? 'ON' : 'OFF'"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('class_four') }}</td>
                            <td>{{ $t('class_four_desc') }}</td>
                            <td style="width:150px" class="align-center justify-center d-flex  text-bold">
                                <v-switch
                                    v-model="purchaseFormContent.class4"
                                    color="primary"
                                    :label="purchaseFormContent.class4 ? 'ON' : 'OFF'"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('class_five') }}</td>
                            <td>{{ $t('class_five_desc') }}</td>
                            <td style="width:150px" class="align-center justify-center d-flex  text-bold">
                                <v-switch
                                    v-model="purchaseFormContent.class5"
                                    color="primary"
                                    :label="purchaseFormContent.class5 ? 'ON' : 'OFF'"
                                />
                            </td>
                        </tr>
                        <!--                        <tr>-->
                        <!--                            <td class="text-bold">{{ $t('withholding_tax') }}</td>-->
                        <!--                            <td>{{ $t('withholding_tax_desc') }}</td>-->
                        <!--                            <td class="green&#45;&#45;text text-center text-bold">-->
                        <!--                                <v-switch-->
                        <!--                                    v-model="purchaseFormContent.withholdingTax"-->
                        <!--                                    color="primary"-->
                        <!--                                    :label="purchaseFormContent.withholdingTax ? 'ON' : 'OFF'"-->
                        <!--                                />-->
                        <!--                            </td>-->
                        <!--                        </tr>-->
                        <!--                        <tr>-->
                        <!--                            <td class="text-bold">{{ $t('other_tax') }}</td>-->
                        <!--                            <td>{{ $t('other_tax_desc') }}</td>-->
                        <!--                            <td class="green&#45;&#45;text text-center text-bold">-->
                        <!--                                <v-switch-->
                        <!--                                    v-model="purchaseFormContent.otherTax"-->
                        <!--                                    color="primary"-->
                        <!--                                    :label="purchaseFormContent.otherTax ? 'ON' : 'OFF'"-->
                        <!--                                />-->
                        <!--                            </td>-->
                        <!--                        </tr>-->
                        <tr>
                            <td class="text-bold">{{ $t('decimal') }}</td>
                            <td>{{ $t('decimal_payable_desc') }}</td>
                            <td style="width:150px" class="align-center justify-center d-flex  text-bold">
                                <v-select width="100px"
                                          v-model="purchaseFormContent.decimal"
                                          :items="decimalStyle"
                                          color="primary"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('vendor_quote') }}</td>
                            <td>{{ $t('vendor_quote_desc') }}</td>
                            <td style="width:120px" class="primary--text hide_form_alert">
                                <v-select class="my-1 w_100"
                                          v-model="purchaseFormContent.purchaseQuote"
                                          :placeholder="$t('vendor_quote')"
                                          :items="quotes"
                                          outlined
                                          return-object
                                />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('purchase_order') }}</td>
                            <td>{{ $t('purchase_order_desc') }}</td>
                            <td style="width:120px" class="primary--text text-center hide_form_alert">
                                <v-select class="my-1 w_100"

                                          :placeholder="$t('purchase_order')"
                                          v-model="purchaseFormContent.purchaseOrder"
                                          :items="saleOrders"
                                          outlined
                                          return-object
                                />
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
            <v-divider/>

            <v-card outlined dense class="no_border function_footer">
                <v-btn class="float-right btn_save white--text text-capitalize" color="primary" @click="onSaveClose">
                    {{ $t('save') }}
                </v-btn>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

import PurchaseFormContentModel from "@/scripts/model/PurchaseFormContent"

const purchaseFormContentModel = new PurchaseFormContentModel({})
const purchaseFormContentHandler = require("@/scripts/purchaseFormContentHandler")

export default {
    components: {},
    data: () => ({
        decimalStyle: [2, 3, 4, 5],
        purchaseFormContent: purchaseFormContentModel,
        quotes: ['Vendor Quote', 'Proposal'],
        saleOrders: ['Purchase Order', 'Contract', 'Engagement'],
    }),
    props: {},
    computed: {},
    watch: {},
    created() {
    },
    methods: {
        async onSaveClose() {
            // if (!this.$refs.form.validate()) {
            //   this.$refs.form.validate()
            //   return
            // }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    // let data = {
                    //     id: this.purchaseFormContent.id ? this.purchaseFormContent.id : '',
                    //     serviceDate: this.purchaseFormContent.serviceDate,
                    //     serviceDateTo: this.purchaseFormContent.serviceDateTo,
                    //     discountItem: this.purchaseFormContent.discountItem,
                    //     classOne: this.purchaseFormContent.classOne,
                    //     claseTwo: this.purchaseFormContent.classTwo,
                    //     clase
                    //     decimal: this.purchaseFormContent.decimal,
                    // }
                    purchaseFormContentHandler.create(new PurchaseFormContentModel(this.purchaseFormContent)).then(response => {
                        if (response.data.statusCode === 201) {
                            const res = response.data.data
                            this.purchaseFormContent = res
                            this.$snotify.success('Update Successfully')
                            // this.$refs.form.reset()
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })

                }, 10);
            })
        },
        async loadPurchaseFormContent() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    purchaseFormContentHandler.list().then(res => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data
                            if (data.length > 0) {
                                this.purchaseFormContent = data[0]
                            }
                        }

                    })
                }, 10)
            })
        },
    },
    mounted: async function () {
        await this.loadPurchaseFormContent()
    }
};
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td:not(.v-data-table__mobile-row) {
    border-top: 3px solid rgba(0, 0, 0, 0.12) !important;
}

.float-right {
    margin-top: 0px !important;
}

.float-left {
    margin-top: 0px !important;

}

.v-input--switch {
    margin-top: 0px;
    height: 30px;
}

.lightBlue {
    color: #68cbfb;
}


</style>