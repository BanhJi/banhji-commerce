<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row class="">
                    <v-col sm="12" cols="12" class="pt-0">
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

                            <v-col sm="1" cols="1" class="pt-1">
                                <v-btn class="btn_search" @click="searchTransaction" style="background-color: rgb(237, 241, 245)">
                                    <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
    
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <kendo-datasource ref="dataSource" :group="group" :data="txnWh"/>
                        <kendo-grid id="gridProductionOrder" class="grid-function" :data-source-ref="'dataSource'" :sortable="false"
                                    :groupable="true"
                                    :noRecords="true" :filterable="true" :column-menu="true" :editable="false" :scrollable-virtual="true">
                            <kendo-grid-column :field="'transactionDate'" :title="$t('date')" :width="100" :column-menu="'false'"
                                               :template="DateTemplate"
                                               :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-variants'}"
                                               :attributes="{style: 'text-align: variants'}"/>
                            <kendo-grid-column :field="'type'" :title="$t('type')" :width="100"
                                               :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column :field="'number'" :template="NumTemplate" :title="$t('num')" :width="100" :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                            <kendo-grid-column :field="'item'" :template="'<span>#=item.name#</span>'" :title="$t('product')" :width="100" :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                            <kendo-grid-column :field="'wh'" :template="'<span>#=wh ? wh.name : `` #</span>'" :title="$t('warehouse')" :width="120" :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                            <kendo-grid-column :field="'isType'" :hidden="true" :template="'<span>#=isType === 1 ? `Serial` : `Batch` #</span>'" :title="$t('nature')" :width="120" :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                            <kendo-grid-column :field="'serialBatch'" :template="'<span>#=serialBatch#</span>'" :title="$t('serial_batch')" :width="120" :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                            <kendo-grid-column :field="'serialNumber2'" :hidden="true" :template="'<span>#=serialNumber2#</span>'" :title="$t('serial2')" :width="120" :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                            <kendo-grid-column :field="'expirationDate'" :template="ExpirationDateTemplate" :title="$t('expiration_date')" :width="120" :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                            <kendo-grid-column :field="'qty'" :title="$t('qty')" :format="'{0:n}'" :width="100"
                                               :headerAttributes="{
                                            style: 'text-align: right; background-color: #EDF1F5'
                                        }" :attributes="{
                                            style: 'text-align: right'
                                        }"/>
                            <kendo-grid-column :field="'status'" :title="$t('status')" :width="90"
                                               :headerAttributes="{
                                    style: 'text-align: right; background-color: #EDF1F5'
                                }" :attributes="{
                                    style: 'text-align: right'
                                }"/>
    
                        </kendo-grid>
                    </v-col>
                </v-row>
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="true"
                    :myLoading="true"
                />
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import kendo from "@progress/kendo-ui";
const warehouseHandler = require("@/scripts/warehouseHandler")
let compare = function(a, b) {
    if (a.items[0].name === b.items[0].name) {
        return 0;
    } else if (a.items[0].name > b.items[0].name) {
        return 1;
    } else {
        return -1;
    }
};
export default {
    data: () => ({
        // Search transaction dates
        start_date: "",
        end_date: "",
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],

        showLoading: false,

        dialogm3: false,
        // LoadingMe
        isLoaded: false,
        // Kendo dataSource
        schemaDefinition: {
            model: {
                id: "id"
            }
        },
        /* Sort by account number */
        sortDefinition: {
            field: "number"
        },

        txnWh: [],
        productionOrder: {},
        group: {
            field: "item.name",
            compare: compare
        }
    }),
    props: {},
    methods: {
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
            this.showLoading = true
            let data = {
                startDate: this.start_date || '',
                endDate: this.end_date || ''
            }
            warehouseHandler.getTxn(data).then(res => {
                this.txnWh = res
                this.showLoading = false
                window.console.log(res)
            })
        },
        DateTemplate(dataItem) {
            const transactionDate = dataItem.transactionDate
            if (transactionDate) {
                return `<span>${transactionDate ? kendo.toString(new Date(transactionDate), `dd-MM-yyyy`) : ``}</span>`
            } else {
                return ``
            }
        },
        ExpirationDateTemplate(dataItem) {
            const expirationDate = dataItem.expirationDate
            if (expirationDate) {
                return `<span>${expirationDate ? kendo.toString(new Date(expirationDate), `dd-MM-yyyy`) : ``}</span>`
            } else {
                return ``
            }
        },
        NumTemplate(dataItem) {
            const number = dataItem.number
            if (number) {
                return `<span>${number ? number : ``}</span>`
            } else {
                return ``
            }
        },
        // async onloadTxn() {
        //     this.showLoading = true
        //     await warehouseHandler.getTxn().then(res => {
        //         this.txnWh = res
        //         this.showLoading = false
        //         window.console.log(res, 'txn data')
        //     })
        // },
    },
    computed: {},
    async mounted() {
        await this.searchTransaction()
    },
    components: {
        'app-datepicker': DatePickerComponent,
        LoadingMe: () => import("@/components/Loading")
    },
};
</script>

<style scoped>
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
