<template>
    <v-row>
        <!-- <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0"> -->
                <v-col sm="12" cols="12" class="pt-2 px-6">
                    <v-row class="">
                        <v-col sm="12" cols="12" class="py-0">
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-bold text-uppercase">{{$t('withholding_tax')}}</th>
                                            <th></th>
                                            <th class="text-bold text-uppercase">{{$t('wht_rate')}}</th>
                                            <th class="text-bold text-uppercase">{{$t('wht_amount')}}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{{$t('wht_resident_desc1')}}</td>
                                        <td></td>
                                        <td class="text-center">15%</td>
                                        <td class="text-right">{{ numberFormat(wh1) }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('wht_resident_desc2')}}</td>
                                        <td></td>
                                        <td class="text-center">15%</td>
                                        <td class="text-right">{{ numberFormat(wh2) }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('wht_resident_desc3')}}</td>
                                        <td></td>
                                        <td class="text-center">15%</td>
                                        <td class="text-right">{{ numberFormat(wh3) }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('wht_resident_desc4')}}</td>
                                        <td></td>
                                        <td class="text-center">15%</td>
                                        <td class="text-right">{{ numberFormat(wh4) }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('wht_resident_desc5')}}</td>
                                        <td>{{$t('legal_person')}}</td>
                                        <td class="text-center">15%</td>
                                        <td class="text-right">{{ numberFormat(wh5) }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('wht_resident_desc6')}}</td>
                                        <td>{{$t('physical_person')}}</td>
                                        <td class="text-center">15%</td>
                                        <td class="text-right">{{ numberFormat(wh6) }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" class=" text-uppercase text-bold">{{ $t('total') }}</td>
                                         <td colspan="1" class="primary text-right white--text text-uppercase text-bold">{{ numberFormat(totalWh) }}</td>
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
export default {
    data: () => ({
        showLoading: false,
        is_month: false,
        is_start_date: false,
        is_end_date: false,
        start_date: "",
        end_date: "",

        search:{
            start_date: "",
            end_date: ""
        },
        wh1: 0,
        wh2: 0,
        wh3: 0,
        wh4: 0,
        wh5: 0,
        wh6: 0,
        totalWh: 0,
    }),
    props: ['withholding'],
    watch: {'withholdings': 'loadCalculateTax'},
    methods: {
        async loadCalculateTax() {
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let amount1 = 0, amount2 = 0, amount3 = 0,
                        amount4 = 0, amount5 = 0, amount6 = 0,
                        totalAmount1 = 0
                    window.console.log(this.withholdings)
                    for (let i = 0; i < this.withholdings.length; i++) {
                        let typeProduct = this.withholdings[i].typeProduct
                        if (typeProduct.code === 1) {
                            amount1 += this.withholdings[i].totalVAT
                        } else if (typeProduct.code === 2) {
                            amount2 += this.withholdings[i].totalVAT
                        } else if (typeProduct.code === 3) {
                            amount3 += this.withholdings[i].totalVAT
                        } else if (typeProduct.code === 4) {
                            amount4 += this.withholdings[i].totalVAT
                        } else if (typeProduct.code === 5) {
                            amount5 += this.withholdings[i].totalVAT
                        } else if (typeProduct.code === 6) {
                            amount6 += this.withholdings[i].totalVAT
                        }
                    }
                    totalAmount1 = (amount1 + amount2 + amount3 + amount4 + amount5 + amount6)
                    this.totalWh = totalAmount1
                    this.wh1 = amount1
                    this.wh2 = amount2
                    this.wh3 = amount3
                    this.wh4 = amount4
                    this.wh5 = amount5
                    this.wh6 = amount6
                    this.onUpdate()
                    this.showLoading = false
                }, 250)
            })

        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n2`)
        },
        onUpdate() {
            this.$emit('getAmountResident', this.totalWh)
        },
        onSearch(){
            this.search = {
                'start_date': this.start_date + '-01',
                'end_date': this.end_date + '-01'
            }
        }
    },
    async mounted() {
        await this.loadCalculateTax()
    },
    computed: {
        withholdings() {
            if (this.withholding.length > 0) {
                return this.withholding
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
    .vat{
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
