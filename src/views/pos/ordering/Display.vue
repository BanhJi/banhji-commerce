<template>
    <v-row class="">
        <!-- not modal -->
        <v-col sm="12" cols="12" class="grayBg px-6">
            <h2 class="font_20">{{$t('display_setting')}}</h2>
            <p class="mb-0">{{ $t('sale_form_content_desc') }} </p>
            <template>
                <v-simple-table class="attachment_table">
                    <template>
                        <tbody>
                        <tr>
                            <td class="text-bold">{{ $t('screen_display') }}</td>
                            <td style="width:250px" class="primary--text text-center hide_form_alert">
                                <v-select class="my-1"
                                      :placeholder="$t('touch_driven_display')"
                                      :items="display"
                                      outlined
                                />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('type_of_order') }}</td>
                            <td style="width:250px" class="primary--text text-center hide_form_alert">
                                <v-select class="my-1"
                                      :placeholder="$t('walk_in')"
                                      :items="typeOrder"
                                      outlined
                                />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('e_menu') }}</td>
                            <td style="width:250px" class="primary--text text-center hide_form_alert">
                                <v-select class="my-1"
                                      :placeholder="$t('public_link')"
                                      :items="emenu"
                                      outlined
                                />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('scaling') }}</td>
                            <td style="width:250px"  class="primary--text align-center justify-left d-flex text-bold">
                                <v-switch
                                    v-model="saleFormContent.discountItem"
                                    color="primary"
                                    :label="saleFormContent.discountItem ? 'TURN ON' : 'TURN OFF'"
                                />
                            </td>
                        </tr>
                        
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
            <v-divider/>

            <v-card outlined dense class="no_border function_footer">
                <v-btn color="primary" class="float-right white--text" @click="onSaveClose">
                    {{ $t('save') }}
                </v-btn>

            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import SaleFormContentModel from "@/scripts/model/SaleFormContent";

const saleFormContentModel = new SaleFormContentModel({})
const saleFormContentHandler = require("@/scripts/saleFormContentHandler")

export default {

    components: {},
    data: () => ({
            saleFormContent: saleFormContentModel,
            quotes: ['Quote', 'Proposal', 'Estimate'],
            saleOrders: ['Sale Order', 'Engagement', 'Contract'],
            display: ['Touch Driven Display', 'Barcode Scen'],
            typeOrder: ['Walk in', 'Partner'],
            emenu: ['Public link','Self Order']
        }
    ),
    props: {}
    ,
    computed: {}
    ,
    watch: {}
    ,
    created() {
    }
    ,
    methods: {
        async onSaveClose() {
            // if (!this.$refs.form.validate()) {
            //   this.$refs.form.validate()
            //   return
            // }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        id: this.saleFormContent.id ? this.saleFormContent.id : '',
                        serviceDate: this.saleFormContent.serviceDate,
                        serviceDateTo: this.saleFormContent.serviceDateTo,
                        discountItem: this.saleFormContent.discountItem,
                        otherCharge: this.saleFormContent.otherCharge,
                        specificTax: this.saleFormContent.specificTax,
                        otherTax: this.saleFormContent.otherTax,
                        publicLightingTax: this.saleFormContent.publicLightingTax,
                        saleUnit: this.saleFormContent.saleUnit,
                        modifier: this.saleFormContent.modifier,
                        employee: this.saleFormContent.employee,
                        decimal: this.saleFormContent.decimal,
                        saleQuote: this.saleFormContent.saleQuote,
                        saleOrder: this.saleFormContent.saleOrder,

                        negativeInventory: this.saleFormContent.negativeInventory,
                        lateFee: this.saleFormContent.lateFee,
                        email: this.saleFormContent.email,
                        pdfAttachment: this.saleFormContent.pdfAttachment,
                        invoiceReminder: this.saleFormContent.invoiceReminder,
                        reminder1: this.saleFormContent.reminder1,
                        reminder2: this.saleFormContent.reminder2,
                        reminder3: this.saleFormContent.reminder3,
                        statement: this.saleFormContent.statement
                    }
                    saleFormContentHandler.create(data).then(response => {
                        if (response.data.statusCode === 201) {
                            const res = response.data.data
                            this.saleFormContent = res
                            this.$snotify.success('Update Successfully')
                            // this.$refs.form.reset()
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })

                }, 300);
            })
        },
        async loadSaleFormContent() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    saleFormContentHandler.list().then(res => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data
                            if (data.length > 0) {
                                this.saleFormContent = data[0]
                            }
                        }

                    })
                }, 10)
            })
        },
    }
    ,
    mounted: async function () {
        await this.loadSaleFormContent()
    }
}
;
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td:not(.v-data-table__mobile-row) {
    border-top: 3px solid rgba(0, 0, 0, 0.12) !important;
}

.btn_save {
    color: #ffffff;
    text-transform: capitalize;
}
.w_100{
    width: 100px !important;
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



</style>