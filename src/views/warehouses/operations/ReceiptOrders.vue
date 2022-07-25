<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row class="">
                    <v-col sm="5" cols="12" class="py-0">
                        <h2 class="mb-0 font_20">{{ $t('receipt_orders') }}</h2>
                    </v-col>
                    <v-col sm="7" cols="12" class="py-0">
                    </v-col>
                </v-row>
                <v-row class="mt-0">
                    <v-col sm="9" cols="12" class="pt-0 pb-0">
                        <v-row class="">
                            <v-col sm="4" cols="12" class="py-0">
                                <v-select class="mt-1"
                                    :items="dateSorters"
                                    v-model="mDateSorter"
                                    item-text="name"
                                    item-value="id"
                                    @change="onSorterChanges"
                                    clearable
                                    outlined
                                    placeholder="ALL"
                                />
                            </v-col>

                            <v-col sm="3" cols="12" class="py-0">
                                <app-datepicker :initialDate="start_date" @emitDate="start_date = $event"/>
                            </v-col>

                            <v-col sm="3" cols="12" class="py-0">
                                <app-datepicker :initialDate="end_date" @emitDate="end_date = $event"/>
                            </v-col>

                            <v-col sm="1" cols="1" class="py-1">
                                <v-btn class="btn_search" @click="searchTransaction"
                                    style="background-color: rgb(237, 241, 245)">
                                    <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                                </v-btn>
                            </v-col>

                        </v-row>
                    </v-col>
                    <v-col sm="3" cols="12" class="pt-1 pb-0">
                        <v-btn to="receipt_order" color="primary"
                            class=" white--text float-right text-capitalize">
                            {{ $t('new_ro') }}
                        </v-btn>
                    </v-col>
                </v-row>

                <!-- <v-row class="mt-0">
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>{{ $t('date') }}</th>
                                        <th>{{ $t('number') }}</th>
                                        <th>{{ $t('name') }}</th>
                                        <th>{{ $t('type') }}</th>
                                        <th>{{ $t('status') }}</th>
                                        <th>{{ $t('action') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="ro in receiptOrders" v-bind:key="ro.id">
                                        <td>{{ new Date(ro.date).toISOString().substr(0, 10) }}</td>
                                        <td>{{ `${ro.abbr}-${ro.number}` }}</td>
                                        <td class="text-bold">{{ ro.supplier.name }}</td>
                                        <td>{{ ro.warehouse.name }}</td>
                                        <td></td>
                                        <td>
                                            <v-btn class="bg-none">
                                                <v-icon class="primary--text" size="17">fas fa-eye</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-col>
                </v-row> -->

                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <kendo-datasource 
                            ref="dataSource" 
                            :group="group" 
                            :data="receiptOrders"/>
                            <kendo-grid 
                                id="gridOrdersReceipt" 
                                class="grid-function" 
                                :data-source-ref="'dataSource'" 
                                :sortable="false"
                                :groupable="true"
                                :noRecords="true" 
                                :filterable="true" 
                                :column-menu="true" 
                                :editable="false" 
                                :scrollable-virtual="true"
                                :excel-file-name="$t('orders_receipt')+'.xlsx'"
                                :excel-filterable="true"
                                :excel-all-pages="true"
                                :toolbar="['excel']"
                                >
                                <kendo-grid-column 
                                    :field="'date'" 
                                    :title="$t('date')" 
                                    :width="100" 
                                    :template="DateTemplate"
                                    :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-variants'}"/>
                                <kendo-grid-column 
                                    :field="'number'" 
                                    :template="NumTemplate" 
                                    :title="$t('number')" 
                                    :width="100" 
                                    :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                                <kendo-grid-column 
                                    :field="'name'" 
                                    :template="NameTemplate" 
                                    :title="$t('name')" 
                                    :width="100" 
                                    :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                                
                                <kendo-grid-column 
                                    :field="'type'" 
                                    :title="$t('type')" 
                                    :width="100"
                                    :headerAttributes="{
                                            style: 'text-align: right; background-color: #EDF1F5'
                                        }" :attributes="{
                                            style: 'text-align: right'
                                        }"/>
                                <kendo-grid-column 
                                    :field="'warehouseName'" 
                                    :title="$t('warehouse')" 
                                    :width="90"
                                    :headerAttributes="{
                                    style: 'text-align: right; background-color: #EDF1F5'
                                        }" :attributes="{
                                            style: 'text-align: right'
                                        }"/>
                                <kendo-grid-column
                                    :field="'action'"
                                    :title="$t('action')"
                                    :width="100"
                                    :command="{  
                                    text: textView,
                                    click: onView, class: 'btn-plus' }"
                                    :attributes="{style: 'text-align: center'}"
                                    :headerAttributes="{style: 'text-align: center; background-color: #EDF1F5'}"
                                />
                            </kendo-grid>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import kendo from "@progress/kendo-ui";
import JSZip from "jszip";
import {i18n} from "@/i18n";
window.JSZip = JSZip;
const $ = kendo.jQuery

const receiptOrderHandler = require("@/scripts/receiptOrderHandler")
export default {
    data: () => ({
        // Search transaction dates
        start_date: "",
        end_date: "",
        // LoadingMe
        isLoaded: false,
        // Kendo dataSource
        schemaDefinition: {
            model: {id: "id"}
        },
        /* Sort by account number */
        sortDefinition: {field: "number"},
        showLoading: false,
        receiptOrders: [],
        group: { field: "warehouseName"},
        mDateSorter: 3,
    }),
    props: {},
    methods: {
        DateTemplate(dataItem) {
            let gen = kendo.toString(new Date(dataItem.date), 'yyyy-MM-dd')
            return gen
        },
        NumTemplate(dataItem) {
            let gen = dataItem.abbr + '-' +dataItem.number
            return gen
        },
        NameTemplate(dataItem) {
            let gen = dataItem.supplier.numberName
            return gen
        },
        WHTemplate(dataItem) {
            let gen = dataItem.warehouse.code + '-' + dataItem.warehouse.name
            return gen
        },
        async onloadReceiptOrder() {
            this.showLoading = true
            await receiptOrderHandler.getAll().then(res => {
                this.showLoading = false
                if(res.length > 0){
                    this.receiptOrders = res
                }else{
                    this.$swal({
                        position: 'products',
                        icon: 'error',
                        title: i18n.t('no_record_found'),
                        showConfirmButton: true,
                        confirmButtonColor: '#4d4848',
                        cancelButtonColor: '#ED1A3A',
                        confirmButtonText: i18n.t('ok')
                    })
                }
            })
        },
        // On Sorter Changes
        onSorterChanges(val) {
            let today = new Date()

            switch (val) {
                case 1:
                    this.start_date = kendo.toString(today, 'yyyy-MM-dd')
                    this.end_date = kendo.toString(today, 'yyyy-MM-dd')

                    break
                case 2:
                    var first = today.getDate() - today.getDay(),
                        last = first + 6;
                    var sD = new Date(today.getFullYear(), today.getMonth(), 1);
                    this.start_date = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
                    this.end_date = kendo.toString(new Date(sD.setDate(last)), 'yyyy-MM-dd')

                    break
                case 3:
                    this.start_date = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                    this.end_date = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')

                    break
                case 4:
                    this.start_date = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
                    this.end_date = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')

                    break
                default:
                    this.start_date = "";
                    this.end_date = "";
            }
        },
        // Search Transaction
        searchTransaction() {
            this.showLoading = true
            let data = {
                startDate: this.start_date,
                endDate: this.end_date
            }
            this.receiptOrders = []
            receiptOrderHandler.getAll(data).then(res => {
                this.showLoading = false
                if(res.length > 0){
                    this.receiptOrders = res
                }else{
                    this.$swal({
                        position: 'products',
                        icon: 'error',
                        title: i18n.t('no_record_found'),
                        showConfirmButton: true,
                        confirmButtonColor: '#4d4848',
                        cancelButtonColor: '#ED1A3A',
                        confirmButtonText: i18n.t('ok')
                    })
                }
            })
        },
        onView(e) {
            e.preventDefault();
            const grid = $("#gridOrdersReceipt").data("kendoGrid"),
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            window.console.log(dataItem)
        },
    },
    async activated() {
        // await this.onloadReceiptOrder()
    },
    async mounted() {
        // await this.onloadReceiptOrder()
        this.onSorterChanges(3)
    },
    computed: {
        textView(){
            return i18n.t('view')
        },
        dateSorters() {
            return [
                {id: 1, name: i18n.t('today')},
                {id: 2, name: i18n.t('this_week')},
                {id: 3, name: i18n.t('this_month')},
                {id: 4, name: i18n.t('this_year')}
            ]
        },
    },
    components: {
        'app-datepicker': DatePickerComponent,
    },
};
</script>
<style scoped>
.acc_group header {
    height: 10px !important;
}

table.acc_group tr td {
    border-bottom: 1px solid #ccc;
    padding: 8px;
    vertical-align: middle;
}

table.acc_group tr td:first-child {
    font-weight: 700;
}

table.acc_group tr td:last-child {
    text-align: center;
}

.v-card__actions .v-btn.v-btn {
    padding: 0 16px;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-family: 'Niradei-Bold', serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
    color: #000 !important;
    padding: 5px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
    border-bottom: 1px solid #000 !important;
}

.function_footer {
    padding: 15px;
    display: inline-block;
}

p {
    color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
    height: 47.2px !important;
}

.text_tip {
    font-size: 9px;
    line-height: 10px;
}

@media (max-width: 576px) {

}
</style>
