<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <h2 class="mb-0 font_20">{{ $t("discount_report") }}</h2>
                 <p class="mb-0">{{ $t("discount_item_payable_report_desc") }}</p>

                <!-- loading -->
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    type="loading"
                    :myLoading="true"
                >
                </LoadingMe>

                <v-row class="">
                    <v-col sm="3" cols="12" class="pb-0">
                        <v-select
                            class="mt-1"
                            :items="dateSorters"
                            v-model="mDateSorter"
                            @change="onSorterChanges"
                            clearable
                            outlined
                            placeholder="ALL"
                        />
                    </v-col>

                    <v-col sm="3" cols="12" class="pb-0">
                        <app-datepicker
                            :initialDate="startDate"
                            @emitDate="startDate = $event"
                        />
                    </v-col>

                    <v-col sm="3" cols="12" class="pb-0">
                        <app-datepicker
                            :initialDate="endDate"
                            @emitDate="endDate = $event"
                        />
                    </v-col>

                    <v-col sm="1" cols="1" class="pb-0 pt-4">
                        <v-btn color="primary white--text" @click="searchTransaction">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                    <!-- <v-col sm="2" cols="12" class="py-0">
                      <v-btn icon color="black" class="bg-none float-right ml-2">
                        <v-icon class="font_34">fa fa-file-excel</v-icon>
                      </v-btn>
                      <v-btn icon color="black" class="bg-none float-right ml-2">
                        <v-icon class="font_34">fa fa-print</v-icon>
                      </v-btn>
                    </v-col> -->
                </v-row>

                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <kendo-datasource ref="discountItemDS"
                                              :group="group"
                                              :data="discountItemTxn"/>
                            <kendo-grid id="gridDiscountItem" class="grid-function"
                                        :data-source-ref="'discountItemDS'"
                                        :editable="false"
                                        :groupable="true"
                                        :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('discount_name')"
                                    :attributes="{class:'tb_name_td'}"
                                    :width="200"
                                    :template="'<span>#=name#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'supplier'"
                                    :title="$t('supplier')"
                                    :width="200"
                                    :template="'<span>#=supplier#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'referenceNo'"
                                    :title="$t('invoice_no')"
                                    :width="150"
                                    :template="referenceTemplate"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'exchangeTotal'"
                                    :title="$t('invoice_amount')"
                                    :width="180"
                                    :template="'<span>#= kendo.toString(exchangeTotal, decimalFormat)#</span>'"
                                    :attributes="{style: 'text-align: right'}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>

                                <kendo-grid-column
                                    :field="'exchangeAmount'"
                                    :title="$t('discount_amount')"
                                    :width="180"
                                    :template="'<span>#= kendo.toString(exchangeAmount, decimalFormat)#</span>'"
                                    :attributes="{style: 'text-align: right'}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'percentage'"
                                    :title="$t('percentage')"
                                    :template="'<span>#= kendo.toString(percentage, decimalFormat)#</span> %'"
                                    :attributes="{style: 'text-align: right'}"
                                    :width="180"
                                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                            </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";

const discountItemHandler = require("@/scripts/discountItemHandler")

export default {
    name: "SaleDiscountReport",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": DatePickerComponent,
    },
    data: () => ({
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters: ["Today", "This Week", "This Month", "This Year"],
        showLoading: false,
        isLoaded: false,
        mDateSorter: 'Today',
        discountItemTxn: [],
        group: {field: 'name'},
    }),
    methods: {
        onSorterChanges(val) {
            let today = new Date()
            switch (val) {
                case "Today":
                    this.startDate = kendo.toString(today, 'yyyy-MM-dd')
                    this.endDate = kendo.toString(today, 'yyyy-MM-dd')

                    break
                case "This Week":
                    var first = today.getDate() - today.getDay(),
                        last = first + 6

                    this.startDate = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')

                    break
                case "This Month":
                    this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')

                    break
                case "This Year":
                    this.startDate = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')

                    break
                default:
                    this.startDate = ""
                    this.endDate = ""
            }
        },
        async searchTransaction() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    const startDate = this.startDate
                    const endDate = this.endDate
                    let strFilter = '?start=&end=&type=Purchase'
                    if (startDate !== '' && endDate !== '') {
                        strFilter = '?start=' + startDate + '&end=' + endDate + '&type=Purchase'
                    }
                    discountItemHandler.discountItemReport(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.discountItemTxn = JSON.parse(JSON.stringify(res.data.data))
                        }
                    })
                }, 10);
            })
        },
        referenceTemplate(data) {
            let url = ''
            if (data.type === 'Invoice') {
                url = `invoice_view/${data.txnId}`
            } else if (data.type === 'Sale Deposit') {
                url = `sale_deposit_view/${data.txnId}`
            } else if (data.type === 'Purchase') {
                url = `purchase_view/${data.txnId}`
            } else if (data.type === 'Sale Quote') {
                url = `sale_quote_view/${data.txnId}`
            } else if (data.type === 'Cash Receipt') {
                url = `cash_receipt_view/${data.txnId}`
            }
            let args = {
                text: data.referenceNo,
                url: url,
                data: data,
            }
            return {
                template: LinkTemplate,
                templateArgs: args
            }
        },
    },
    mounted() {
    },
    computed: {},
};
</script>
<style scoped></style>
