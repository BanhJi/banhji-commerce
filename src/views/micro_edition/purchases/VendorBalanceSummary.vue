<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="4" cols="12" class="kendo_dropdown_custom py-0">
                        <app-datepicker :initialDate="asOf" @emitDate="asOf = $event"/>
                    </v-col>
                    <v-col sm="4" cols="12" class="kendo_dropdown_custom py-1">
                        <dropdownlist
                            :data-items="supplierList"
                            @change="onChange"
                            :value="supplier"
                            :data-item-key="dataItemKey"
                            :text-field="textField"
                            :default-item="defaultItem"
                            :filterable="true"
                            @filterchange="onFilterChange"
                        >
                        </dropdownlist>
                    </v-col>
                    <v-col sm="1" cols="1" class="pt-1">
                        <v-btn color="primary white--text" @click="balanceSummary">
                            <i class="b-search" style="font-size: 18px; color:#fff"/>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                     <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border white--text"
                                color="primary" height="60px">
                            <h3 class="text-left font_13 flex-1 text-uppercase">{{ $t('no_of_vendors') }}</h3>
                            <h3 class="text-right flex-1 font_20 ">{{ totalVendor }}</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0 px-2">
                        <v-card outlined dense class="pa-3 no_border white--text"
                                color="primary" height="60px">
                            <h3 class="text-left font_13 flex-1 text-uppercase">{{ $t('payable_balance') }}</h3>
                            <h3 class="text-right flex-1 font_20">{{ payableBalance }}</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined to="individual_supplier" dense color="third" class="pa-3  rounded-4 no_border white--text" height="60px">
                            <h3 class="text-center flex-1 font_18 mt-2 text-uppercase">+ {{ $t('vendor') }}</h3>
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
                                :myLoading="true"
                            />
                            <kendo-datasource
                                ref="dataSource"
                                :group="group"
                                :data="payableList"
                            />
                            <kendo-grid
                                id="gridReceivable"
                                class="grid-function"
                                :data-source-ref="'dataSource'"
                                :sortable="false"
                                :groupable="true"
                                :filterable="false"
                                :column-menu="true"
                                :noRecords="true"
                                :editable="false"
                                :scrollable-virtual="true"
                            >
                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('vendors')"
                                    :attributes="{ class: 'tb_name_td' }"
                                    :template="'<span>#=name#</span>'"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'type'"
                                    :title="$t('type')"
                                    :template="'<span>#=type#</span>'"
                                    :width="200"
                                    :headerAttributes="{style: 'background-color: #EDF1F5',}"
                                />
                        
                                <kendo-grid-column
                                    :field="'balance'"
                                    :title="$t('balance')"
                                    :template="'<span>#= kendo.toString(balance, decimalFormat)#</span>' "
                                    :width="200"
                                    :attributes="{ style: 'text-align: right; ' }"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="''"
                                    :title="$t('overdue')"
                                    :width="200"
                                    :attributes="{ style: 'text-align: right; ' }"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="''"
                                    :title="$t('status')"
                                    :width="200"
                                    :attributes="{ style: 'text-align: right; ' }"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
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
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import kendo from "@progress/kendo-ui";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const defaultItem = {["numberName"]: "Select vendor...", ["id"]: null};
const supplierHandler = require("@/scripts/supplierHandler");
const emptyItem = {["numberName"]: "loading ..."};
export default {
    data: () => ({
        asOf: new Date().toISOString().substr(0, 10),
        showLoading: false,
        group: [],
        aggregateDefinition: [
            {field: "name", aggregate: "count"},
            {field: "amount", aggregate: "sum"},
            {field: "code", aggregate: "count"},
        ],
        payableList: [],
        supplierList: [],
        supplier: {},
        textField: "numberName",
        defaultItem: defaultItem,
        dataItemKey: "id",
        filter: "",
        supBaseUrl: supplierHandler.search(),
        overDueAmount: 0,
        payableBalance: 0,
        tobeCollected: 0,
        totalVendor: 0,
    }),
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": DatePickerComponent,
        dropdownlist: DropDownList,
    },
    methods: {
        async balanceSummary() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    let strFilter = "";
                    strFilter = "?asOf=" + this.asOf + "&type=bal-" + "&txnType=Vendor";
                    if (this.supplier) {
                        if (this.supplier.id) {
                            strFilter =
                                "?asOf=" +
                                this.asOf +
                                "&id=" +
                                this.supplier.id +
                                "&type=bal-" +
                                "&txnType=Vendor";
                        }
                    }
                    this.showLoading = true;
                    billingHandler.vendorDepositBalanceSummary(strFilter).then((res) => {
                        if (res.data.statusCode === 200) {
                            this.payableList = res.data.data;
                            const result = res.data.result;
                            this.payableBalance = kendo.toString(
                                result.receivableBalance,
                                result.decimalFormat
                            );
                            this.overDueAmount = kendo.toString(
                                result.overDueAmount,
                                result.decimalFormat
                            );
                            this.tobeCollected = kendo.toString(result.tobeCollected, `n0`);
                            this.totalVendor = result.supplier;
                            this.showLoading = false;
                        }
                    });
                }, 10);
            });
        },
        status(dataItem) {
            let status = "";
            switch (dataItem.status) {
                case 1:
                    status = "Open";
                    break;
                case 2:
                    status = "Partially Paid";
                    break;
                case 3:
                    status = "Paid";
                    break;
                case 4:
                    status = "Void";
                    break;
            }
            return status;
        },
        onFilterChange(event) {
            const filter = event.filter.value;
            this.requestData(0, filter, this.supBaseUrl);
            this.filter = filter;
        },
        requestData(skip, filter, baseUrl) {
            const url = baseUrl + `?filter=${filter}`;
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then(this.afterFetch);
        },
        afterFetch(json) {
            this.supplierList = json.data;
        },
        onChange(event) {
            const value = event.value;
            if (value && value["numberName"] === emptyItem["numberName"]) {
                return;
            }
            this.supplier = value;
        },
        sumGroupAmount(dataItem) {
            if (dataItem.hasOwnProperty("sum")) {
                return "<span>#= kendo.toString(sum, `n2`)#</span>";
            }
            return `<span>#= kendo.toString(sum, 'n2')#</span>`;
        },
    },
    computed: {},
    mounted: async function () {
        this.group = [
            {
                field: "type",
                aggregates: this.aggregateDefinition,
            },
        ];
        this.requestData(0, this.filter, this.supBaseUrl);
    },
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

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.b-search:before {
    color: #fff !important;
}
</style>
