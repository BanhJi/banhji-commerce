<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{ $t('credit_limit_decision') }}</h2>
                        <p class="mb-0">{{ $t('credit_limit_decision_desc') }}</p>
                    </v-col>
                    <v-col sm="4" cols="12" class="kendo_dropdown_custom py-0 pd-0">
                        <app-datepicker :initialDate="asOf"
                                        @emitDate="asOf = $event"/>
                    </v-col>
                    <v-col sm="4" cols="12" class="kendo_dropdown_custom py-1 pd-0">
                        <dropdownlist
                            :data-items="customerList"
                            @change="onChange"
                            :value="customer"
                            :data-item-key="dataItemKey"
                            :text-field="textField"
                            :default-item="defaultItem"
                            :filterable="true"
                            @filterchange="onFilterChange">
                        </dropdownlist>
                    </v-col>
                    <v-col sm="1" cols="1" class="pt-1">
                        <v-btn color="primary white--text" @click="loadCreditLimit">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="6" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 rounded-4 no_border white--text " color="secondary" height="60px">
                            <h3 class="text-left font_12 flex-1 text-uppercase">{{
                                    $t('customers_over_credit_limit')
                                }}</h3>
                            <h3 class="text-right  flex-1 mt-0 font_20">{{ totalCustomer }}</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="6" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 rounded-4 no_border white--text " color="third" height="60px">
                            <h3 class="text-left text-uppercase font_12 flex-1 ">{{
                                    $t('customer_with_90%_of_limit')
                                }}</h3>
                            <h3 class="text-right  font_20  flex-1 ">{{ customer90Percentage }}</h3>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                type="loading"
                                :myLoading="true"/>

                            <kendo-datasource ref="dataSource"
                                              :data="creditLimitList"/>
                            <kendo-grid id="gridCreditLimit" class="grid-function"
                                        :data-source-ref="'dataSource'"
                                        :column-menu="true"
                                        :noRecords="true"
                                        :sortable="true"
                                        :editable="false"
                                        :excel-file-name="'CustomerCreditLimit.xlsx'"
                                        :excel-filterable="true"
                                        :excel-all-pages="true"
                                        :toolbar="['excel']"
                                        :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('name')"
                                    :attributes="{class:'tb_name_td'}"
                                    :template="'<span>#=name#</span>'"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'balance'"
                                    :title="$t('balance')"
                                    :template="'<span>#= kendo.toString(balance, decimalFormat)#</span>'"
                                    :attributes="{style: 'text-align: right; '}"
                                    :width="150"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'creditLimit'"
                                    :title="$t('credit_limit')"
                                    :template="'<span>#= kendo.toString(creditLimit, decimalFormat)#</span>'"
                                    :attributes="{style: 'text-align: right; '}"
                                    :width="150"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'creditLimit'"
                                    :title="$t('%_of_credit_limit')"
                                    :template="'<span>#= kendo.toString(creditLimit > 0 ? (balance / creditLimit)*100 : 0, decimalFormat)#</span>%'"
                                    :attributes="{style: 'text-align: right; '}"
                                    :width="200"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'overDueBalance'"
                                    :title="$t('overdue_balance')"
                                    :template="'<span>#= kendo.toString(overDueBalance, decimalFormat)#</span>'"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'term'"
                                    :title="$t('approved_term')"
                                    :template="'<span>#= term#</span>'"
                                    :width="200"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'totalSale'"
                                    :title="$t('total_sale')"
                                    :template="'<span>#= kendo.toString(totalSale, decimalFormat)#</span>'"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                            </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import JSZip from "jszip";
window.JSZip = JSZip;
const billingHandler = require("@/scripts/invoice/handler/billingHandler")

const defaultItem = {['numberName']: 'Select customer...', ['id']: null}
const customerHandler = require("@/scripts/customerHandler")
const emptyItem = {['numberName']: 'loading ...'}

export default {
    data: () => ({
        showLoading: false,
        asOf: new Date().toISOString().substr(0, 10),
        customerList: [],
        creditLimitList: [],
        customer: {},
        dataItemKey: 'id',
        textField: 'numberName',
        defaultItem: defaultItem,
        filter: '',
        cusBaseUrl: customerHandler.search(),
        totalCustomer: 0,
        customer90Percentage: 0,

    }),
    components: {
        'app-datepicker': DatePickerComponent,
        LoadingMe: () => import(`@/components/Loading`),
        'dropdownlist': DropDownList,
    },
    methods: {
        async loadCreditLimit() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    let strFilter = ''
                    strFilter = '?asOf=' + this.asOf
                    if (this.customer) {
                        if (this.customer.id !== undefined && this.customer.id !== null) {
                            strFilter = '?asOf=' + this.asOf + '&id=' + this.customer.id
                        }
                    }
                    this.showLoading = true
                    billingHandler.wcpReceivableCreditLimitList(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            this.creditLimitList = res.data.data
                            const result = res.data.result
                            this.customer90Percentage = parseFloat(result.customer90Percentage)
                            this.totalCustomer = 0//parseFloat(result.totalCustomerOverCreditLimit ? result.totalCustomerOverCreditLimit : 0)
                            this.showLoading = false
                        }
                    })
                }, 300)
            })
        },
        onFilterChange(event) {
            const filter = event.filter.value
            this.requestData(0, filter, this.cusBaseUrl)
            this.filter = filter
        },
        requestData(skip, filter, baseUrl) {
            const url = baseUrl +
                `?filter=${filter}`
            fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then(this.afterFetch)
        },
        afterFetch(json) {
            this.customerList = json.data
        },
        onChange(event) {
            const value = event.value
            if (value && value['numberName'] === emptyItem['numberName']) {
                return;
            }
            this.customer = value
        },
    },
    computed: {},
    mounted: async function () {
        this.requestData(0, this.filter, this.cusBaseUrl)
    }
};
</script>
<style scoped>
.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
</style>