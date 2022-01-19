<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pt-3 no_border" elevation="0">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row class="">
                        <v-col sm="12" cols="12" class="pt-0">
                            <v-row class="">
                                <v-col sm="12" cols="12" class="pt-0">
                                    <!-- <v-row>
                                        <v-col sm="9" cols="12" class="pt-0">
                                            <h2 class="mb-0 font_20">{{$t('tax_payment_report')}}</h2>
                                        </v-col>
                                    </v-row> -->
                                    <v-row>
                                        <v-col sm="9" cols="12" class="py-0">
                                            <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                                                            :initEndDate="endDate" @emitEndDate="endDate = $event"/>
                                        </v-col>
                                        <v-col sm="1" cols="12" class="py-1">
                                            <v-btn @click="onSearch" class="btn_search white--text" color="primary" >
                                                <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                                            </v-btn>
                                        </v-col>
<!--                                        <v-col sm="2" cols="12" class="py-1">-->
<!--                                            <v-btn class="float-right capitalize white&#45;&#45;text" color="primary" >-->
<!--                                                {{$t('add_new')}}-->
<!--                                            </v-btn>-->
<!--                                        </v-col>-->
                                    </v-row>
                                </v-col>
                            </v-row>

                            <v-row class="">
                                <v-col sm="12" cols="12" class="py-0">
                                    <kendo-datasource ref="dataSource"
                                                      :data="purchases"
                                                      :page-size='15'
                                    />
                                    <kendo-grid id="gridReceivable" class="grid-function"
                                                :data-source-ref="'dataSource'"
                                                :sortable="false"
                                                :groupable="false"
                                                :filterable="false"
                                                :column-menu="true"
                                                :editable="false"
                                                :noRecords="true"
                                                :pageable="true"
                                                :scrollable-virtual="true"
                                    >
                                        <kendo-grid-column
                                            :field="'reference'"
                                            :title="$t('num')"
                                            :template="'<span>#=reference#</span>'"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'date'"
                                            :title="$t('date')"
                                            :template="'<span>#=date#</span>'"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'supplier'"
                                            :title="$t('id')"
                                            :template="'<span>#=supplier.supplierId#</span>'"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'supplier'"
                                            :title="$t('name')"
                                            :attributes="{class:'text-bold'}"
                                            :template="'<span>#=supplier.name#</span>'"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'supplier'"
                                            :title="$t('type')"
                                            :template="'<span>#=supplier.nature.name#</span>'"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'typeProduct'"
                                            :hidden="true"
                                            :title="$t('type_of_product')"
                                            :template="'<span>#=typeProduct.defaultTax#</span>'"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'totalAmountInclusive'"
                                            :title="$t('amount_vat_inclusive')"
                                            :template="'<span>#= kendo.toString(totalAmountInclusive, `n2`)#</span>'"
                                            :hidden="true"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'totalAmountNetVat'"
                                            :title="$t('amount_net_vat')"
                                            :template="'<span>#= kendo.toString(totalAmountNetVat, `n2`)#</span>'"
                                            :hidden="true"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>

                                        <kendo-grid-column
                                            :field="'totalVAT'"
                                            :title="$t('vat_amount')"
                                            :template="'<span>#= kendo.toString(totalVAT, `n2`)#</span>'"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'dataSource'"
                                            :title="$t('source')"
                                            :template="'<span>#=dataSource.name#</span>'"
                                            :hidden="true"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                        <kendo-grid-column
                                            :field="'status'"
                                            :title="$t('status')"
                                            :template="'<span>#=status.name#</span>'"
                                            :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>

                                    </kendo-grid>
                                    <LoadingMe
                                        :isLoading="showLoading"
                                        :fullPage="false"
                                        :myLoading="true"
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
const purchaseHandler = require("@/scripts/compliance/handler/purchaseHandler")
export default {
    data: () => ({
        showLoading: false,
        purchases: [],
        is_month: false,
        is_start_date: false,
        is_end_date: false,
        startDate: "",
        endDate: "",

        search:{
            start_date: "",
            end_date: ""
        },

    }),
    props: {},
    methods: {
        async onloadPurchase() {
            this.showLoading = true
            await purchaseHandler.getAll().then(res => {
                this.purchases = res.data.data
                this.showLoading = false
                window.console.log(res, 'purchase limit')
            })
        },
        async onSearch(){
            this.showLoading = true
            this.search = {
                'start_date': this.startDate,
                'end_date': this.endDate
            }
            await purchaseHandler.getBetweenMonth(this.search).then(res => {
                this.purchases = res.data.data
                this.showLoading = false
                window.console.log(res, 'purchase between')
            })
        }
    },
    async mounted() {
        await this.onloadPurchase()
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
        'app-searchdate' : ()=> import('@/components/custom_templates/SearchDate'),
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
