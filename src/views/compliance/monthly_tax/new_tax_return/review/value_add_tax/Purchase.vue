<template>
    <v-row>
        <!-- <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0"> -->
        <v-col sm="12" cols="12" class="pt-2 px-6">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="6" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{ $t('monthly_purchases') }}</h2>
                            <!-- <p class="mb-0">{{$t('for_the_month_of')}}: <span class="text-bold">March 2021</span></p> -->
                        </v-col>
                        <!-- <v-col sm="6" cols="12" class="py-0 d-flex justify-end hide_form_alert">
                            <div class="d-flex">
                                <month-picker :initialMonth="end_date" @emitMonth="end_date = $event" :min="start_date"/>
                                <v-btn class="ma-1 ml-2" color="primary white--text text-capitalize" @click="onSearch">
                                    {{$t('view')}}
                                </v-btn>
                            </div>
                        </v-col> -->
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-bold text-uppercase">{{ $t('description') }}</th>
                                <th></th>
                                <th class="text-bold text-uppercase">{{ $t('amount_exclusive_of_vat') }}</th>
                                <th class="text-bold text-uppercase">{{ $t('vat_amount') }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{{ $t('func_review_desc1') }}</td>
                                <td class="">Taxable person</td>
                                <td class="">{{ amountExcluVat1 }}</td>
                                <td class="">{{ amountVat1 }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('import_10') }}</td>
                                <td class="">{{ $t('oversees_suppliers') }}</td>
                                <td class="">{{ amountExcluVat2 }}</td>
                                <td class="">{{ amountVat2 }}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('func_review_desc2') }}</td>
                                <td class="">{{ $t('taxable_person') }}</td>
                                <td class="">{{ amountExcluVat3 }}</td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td>{{ $t('func_review_desc3') }}</td>
                                <td class="">{{ $t('non_taxable_person') }}</td>
                                <td class="">{{ amountExcluVat4 }}</td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td>{{ $t('func_review_desc4') }}</td>
                                <td class=""></td>
                                <td class="">{{ amountExcluVat5 }}</td>
                                <td class=""></td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-bold text-right">{{ $t('total_amount_input_taxs') }}</td>
                                <td class="primary white--text">{{ totalVat }}</td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"
                    />
                </v-col>
            </v-row>
        </v-col>
        <!-- </v-card>
    </v-col> -->
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
import kendo from "@progress/kendo-ui";

const purchaseHandler = require("@/scripts/compliance/handler/purchaseHandler")
export default {
    data: () => ({
        showLoading: false,
        is_month: false,
        is_start_date: false,
        is_end_date: false,
        start_date: "",
        end_date: "",

        search: {
            start_date: "",
            end_date: ""
        },

        natureTypes: [],
        amountExcluVat1: 0,
        amountVat1: 0,
        amountExcluVat2: 0,
        amountVat2: 0,
        amountExcluVat3: 0,
        amountExcluVat4: 0,
        amountExcluVat5: 0,
        totalVat: 0,
        totalAmounExculP: 0,
    }),
    props: ['purchase'],
    watch: {'purchases': 'onloadPurchase'},
    methods: {
        Change() {
        },

        onSearch() {
            this.search = {
                'start_date': this.start_date + '-01',
                'end_date': this.end_date + '-01'
            }
        },
        onUpdate() {
            this.$emit('getTotalAmountPurchase', this.totalVat ? this.totalVat : 0)
        },
        onUpdateAmountExcul() {
            this.$emit('getAmountPurchaseExcul', this.totalAmount ? this.totalAmount : 0)
        },
        async onloadPurchase() {
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(async () => {
                    resolve('resolved');
                    if (this.purchases.length <= 0) {
                        purchaseHandler.getByMrId(this.$route.params.id).then(async res => {
                            await this.onCalculatePurchaseTax(res.data.data)
                            this.showLoading = false
                        })
                    } else {
                        await this.onCalculatePurchaseTax(this.purchases)
                    }
                }, 300)
            })
        },
        async onCalculatePurchaseTax(data) {
            this.showLoading = true
            let totalAmountVAT = 0
            let amountInclusive1 = 0, amountInclusive2 = 0
            let amountNet1 = 0, amountVAT1 = 0, amountNet2 = 0, amountVAT2 = 0, amountNet3 = 0
            for (let i = 0; i < data.length; i++) {
                if (data[i].supplier.nature.toLowerCase() === 'individual-local' || data[i].supplier.nature.toLowerCase() === 'taxable entity') {
                    if (data[i].totalAmountInclusive > 0) {
                        amountInclusive1 += data[i].totalAmountInclusive
                    } else if (data[i].totalAmountNetVat > 0) {
                        if (data[i].taxName.code === 4) {
                            amountNet1 += data[i].totalAmountNetVat
                        } else {
                            amountNet2 += data[i].totalAmountNetVat
                        }
                    }
                    amountVAT1 += data[i].totalVAT
                } else if (data[i].supplier.nature.toLowerCase() === 'non-taxable entity') {
                    amountNet3 += data[i].totalAmountNetVat
                } else if (data[i].supplier.nature.toLowerCase() === 'foreign entity' || data[i].supplier.nature.toLowerCase() === 'individual-foreign') {
                    if (data[i].totalAmountInclusive > 0) {
                        amountInclusive2 += data[i].totalAmountInclusive
                        amountVAT2 += data[i].totalVAT
                    }
                }
            }
            totalAmountVAT = amountVAT1 + amountVAT2
            this.totalAmounExculP = amountNet1 + amountNet2 + amountNet3
            this.totalVat = this.numberFormat(totalAmountVAT)
            this.amountExcluVat1 = this.numberFormat(amountInclusive1)
            this.amountVat1 = this.numberFormat(amountVAT1)
            this.amountExcluVat2 = this.numberFormat(amountInclusive2)
            this.amountVat2 = this.numberFormat(amountVAT2)
            this.amountExcluVat3 = this.numberFormat(amountNet2)
            this.amountExcluVat4 = this.numberFormat(amountNet3)
            this.amountExcluVat5 = this.numberFormat(amountNet1)
            this.onUpdate()
            this.showLoading = false
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n2`)
        },
    },
    async mounted() {
        await this.onloadPurchase()
    },
    computed: {
        purchases() {
            if (this.purchase !== undefined) {
                return this.purchase
            } else {
                return []
            }
        },
    },
    components: {
        'LoadingMe': LoadingMe,
        // 'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
    },
};
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    font-size: 14px;
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    height: 37px !important;
    color: #000;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.primary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: #92d050 !important;
}

.theme--light.v-data-table {
    background-color: transparent !important;
    border-top: thin solid #ddd;
    border-bottom: thin solid #ddd;
    border-radius: 0 !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom: thin solid #ddd;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.border_top {
    border-top: thin solid #fff !important;
}

.v-application .primary,
.v-application .third {
    border-color: #fff !important;
}

.vat {
    text-transform: uppercase;
    color: #fff;
    font-weight: bold;
    font-family: 'Niradei-Bold' !important;
}

.amount {
    text-align: right !important;
}

.head-summary {
    text-align: right !important;
}
</style>
