<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row class="">
                    <v-col sm="5" cols="12" class="pt-1">
                        <h2 class="mb-0 font_20">{{ $t('delivery_orders') }}</h2>
                    </v-col>
                    <v-col sm="7" cols="12">
                    </v-col>
                </v-row>
                <v-row class="mt-0">
                    <v-col sm="9" cols="12" class="pt-0">
                        <v-row class="">
                            <v-col sm="4" cols="12" class="py-0">
                                <v-select class="mt-1"
                                        :items="dateSorters"
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
                    <v-col sm="3" cols="12" class="pt-1">
                        <v-btn to="delivery_order" color="primary"
                            class=" white--text float-right text-capitalize">
                            {{ $t('new_do') }}
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
                                    <tr v-for="dos in deliveryOrders" v-bind:key="dos.id">
                                        <td>{{ new Date(dos.date).toISOString().substr(0, 10) }}</td>
                                        <td>{{ dos.number }}</td>
                                        <td class="text-bold">{{ dos.customer.name }}</td>
                                        <td>{{ dos.warehouse.name }}</td>
                                        <td></td>
                                        <td class="text-center">
                                            <v-btn class="bg-none">
                                                <v-icon size="17px" class="primary--text">fa fa-eye</v-icon>
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
                            :data="txnWh"/>
                            <kendo-grid 
                                id="gridDeliveryOrder" 
                                class="grid-function" 
                                :data-source-ref="'dataSource'" 
                                :sortable="false"
                                :groupable="true"
                                :noRecords="true" 
                                :filterable="true" 
                                :column-menu="true" 
                                :editable="false" 
                                :scrollable-virtual="true"
                                :excel-file-name="$t('delivery_order')+'.xlsx'"
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
                                    :template="'<span>#=item.name#</span>'" 
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
                                    :field="'status'" 
                                    :title="$t('status')" 
                                    :width="90"
                                    :headerAttributes="{
                                    style: 'text-align: right; background-color: #EDF1F5'
                                        }" :attributes="{
                                            style: 'text-align: right'
                                        }"/>
                                <kendo-grid-column 
                                    :field="'action'" 
                                    :title="$t('action')" 
                                    :width="90"
                                    :headerAttributes="{
                                    style: 'text-align: right; background-color: #EDF1F5'
                                        }" :attributes="{
                                            style: 'text-align: right'
                                        }"/>
        
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
const deliveryOrderHandler = require("@/scripts/deliveryOrderHandler")

import JSZip from "jszip";

window.JSZip = JSZip;
export default {
    data: () => ({
        // Search transaction dates
        start_date: "",
        end_date: "",
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
        // LoadingMe
        isLoaded: false,
        // Kendo dataSource
        schemaDefinition: {
            model: {id: "id"}
        },

        deliveryOrders: [],
    }),
    props: {},
    methods: {
        async onloadDeliveryOrder() {
            await deliveryOrderHandler.getAll().then(res => {
                this.deliveryOrders = res
            })
        },
        // On Sorter Changes
        onSorterChanges(val) {
            let today = new Date()

            switch (val) {
                case "Today":
                    this.start_date = kendo.toString(today, 'yyyy-MM-dd')
                    this.end_date = kendo.toString(today, 'yyyy-MM-dd')

                    break
                case "This Week":
                    var first = today.getDate() - today.getDay(),
                        last = first + 6;

                    this.start_date = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
                    today = new Date()
                    this.end_date = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')

                    break
                case "This Month":
                    this.start_date = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                    this.end_date = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')

                    break
                case "This Year":
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
            let data = {
                startDate: this.start_date,
                endDate: this.end_date
            }
            deliveryOrderHandler.getAll(data).then(res => {
                this.deliveryOrders = res
                window.console.log(res)
            })
        },

    },
    async activated() {
        await this.onloadDeliveryOrder()
    },
    async mounted() {
        await this.onloadDeliveryOrder()
    },
    computed: {},
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
