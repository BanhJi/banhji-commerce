<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="4" cols="12" class="pt-1">
                        <v-select @change="getBalanceWarehouse" :items="warehouses" item-value="id" item-text="name" v-model="warehouse" return-object clearable outlined placeholder="Warehouse" />
                    </v-col>
                    <v-col sm="3" cols="12" class="py-0">
                        <app-datepicker :initialDate="startDate" @emitDate="startDate = $event"/>
                    </v-col>
                    <v-col sm="1" cols="1" class="pt-1">
                        <v-btn
                            class="btn_search" @click="getBalanceWarehouse"
                            style="background-color: rgb(237, 241, 245)"
                        >
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                </v-row>
    
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <kendo-datasource ref="dataSource" :data="balanceWarehouse"/>
                        <kendo-grid id="gridProductionOrder"
                                    class="grid-function"
                                    :data-source-ref="'dataSource'"
                                    :sortable="false"
                                    :noRecords="true"
                                    :filterable="false"
                                    :columns="columns"
                                    :column-menu="true"
                                    :editable="false"
                                    :scrollable-virtual="true">
<!--                            <kendo-grid-column :field="'name'" :template="'<span>#=name#</span>'" :title="$t('product')" :width="100" :column-menu="'false'"-->
<!--                                               :headerAttributes="{-->
<!--                                        style: 'background-color: #EDF1F5;',-->
<!--                                        class: 'text-variants'-->
<!--                                    }" :attributes="{-->
<!--                                        style: 'text-align: variants'-->
<!--                                    }"/>-->
<!--                            <kendo-grid-column :field="'buom'" :title="$t('uom')" :width="130"-->
<!--                                               :template="UOMTemplate" :headerAttributes="{-->
<!--                                        style: 'background-color: #EDF1F5'-->
<!--                                    }"/>-->
<!--                            <kendo-grid-column :field="'bQty'" :title="$t('qty')" :width="100" :headerAttributes="{-->
<!--                                        style: 'background-color: #EDF1F5'-->
<!--                                    }"/>-->
                        </kendo-grid>
                    </v-col>
                </v-row>
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    :myLoading="true"
                />
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import {i18n} from "@/i18n";
const warehouseHandler = require("@/scripts/warehouseHandler")
export default {
    data: () => ({
        showLoading: false,
        mDateSorter: 'Today',
        startDate: new Date().toISOString().substr(0, 10),
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],

        balanceWarehouse: [],
        productionOrder: {},

        warehouses: [],
        warehouse: {},
        columns: [],
        calQty: 0,
    }),
    props: {},
    methods: {
        generateColumn() {
            this.columns = [
                {
                    field: 'name',
                    title: i18n.t('product'),
                    locked: true,
                    width:300
                },
                {
                    field: 'buom',
                    title: i18n.t('uom'),
                    template :this.UOMTemplate,
                    width:300
                },
                {
                    field: 'bQty',
                    title: i18n.t('qty'),
                    format: "{0:n}",
                    width:300
                },
            ]
        },
        UOMTemplate(dataItem) {
            const buom = dataItem.buom
            if (buom) {
                return `<span>${buom ? buom.name : ``}</span>`
            } else {
                return ``
            }
        },
        async getBalanceWarehouse() {
            this.showLoading = true
            const data = {
                date: this.startDate ? this.startDate : new Date(),
                whId: this.warehouse ? this.warehouse.id : ''
            }
            await warehouseHandler.getAllBalance(data).then(res => {
                this.balanceWarehouse = res
                window.console.log(res, 'data')
                let columns = [
                    {
                        field: 'name',
                        title: i18n.t('product'),
                        locked: true,
                        width:300
                    },
                    {
                        field: 'buom',
                        title: i18n.t('uom'),
                        template :this.UOMTemplate,
                        width:120
                    },
                    {
                        field: 'bQty',
                        title: i18n.t('qty'),
                        format: "{0:n}",
                        width:120
                    },
                ]
                if (this.warehouse) {
                    this.columns = columns
                } else {
                    const result = [];
                    const whMap = new Map()
                    const map = new Map()
                    for (let i = 0; i < this.balanceWarehouse.length; i++) {
                        if (!whMap.has(this.balanceWarehouse[i].whId)) {
                            whMap.set(this.balanceWarehouse[i].whId, true)
                            if(!map.has(this.balanceWarehouse[i].name)) {
                                map.set(this.balanceWarehouse[i].name, true);    // set any value to Map
                                result.push({
                                    id: this.balanceWarehouse[i].id,
                                    name: this.balanceWarehouse[i].name,
                                    bQty: this.balanceWarehouse[i].bQty,
                                    buom: this.balanceWarehouse[i].buom,
                                    wName: this.balanceWarehouse[i].whName,
                                    ['wh'+i]: this.balanceWarehouse[i].bQty
                                });
                                columns.push({
                                    field: 'wh'+i,
                                    title: this.balanceWarehouse[i].whName,
                                    width: 300
                                })
                            } else {
                                result.forEach((o, index) => {
                                    if (o.name === this.balanceWarehouse[i].name) {
                                        window.console.log(o, 'wh get1')
                                        result[index]['bQty'] += this.balanceWarehouse[i].bQty
                                        result[index]['wh'+i] = this.balanceWarehouse[i].bQty
                                        columns.push({
                                            field: 'wh'+i,
                                            title: this.balanceWarehouse[i].whName,
                                            width: 300
                                        })
                                    }
                                })
                            }
                        } else {
                            window.console.log(result, 'result before')
                            if(!map.has(this.balanceWarehouse[i].name)) {
                                map.set(this.balanceWarehouse[i].name, true);    // set any value to Map
                                result.forEach((o) => {
                                    if (o.wName === this.balanceWarehouse[i].whName) {
                                        let dataKey = Object.keys(o)
                                        dataKey = dataKey.filter(k => k.includes('wh'))
                                        result.push({
                                            id: this.balanceWarehouse[i].id,
                                            name: this.balanceWarehouse[i].name,
                                            bQty: this.balanceWarehouse[i].bQty,
                                            buom: this.balanceWarehouse[i].buom,
                                            wName: this.balanceWarehouse[i].whName,
                                            [dataKey[0]]: this.balanceWarehouse[i].bQty
                                        })
                                        // columns.push({
                                        //     field: 'wh'+i,
                                        //     title: this.balanceWarehouse[i].whName,
                                        //     width: 300
                                        // })
                                        window.console.log(dataKey, 'wh get2')
                                    }
                                })
                            }
                            window.console.log('987')
                        }
                    }
                    this.balanceWarehouse = result
                    window.console.log(this.columns, 'columns')
                    // this.balanceWarehouse = [this.balanceWarehouse[0]]
                    this.columns = columns
                }
                this.showLoading = false
            })
        },
        async onloadWarehouse() {
            await warehouseHandler.getWarehouseSettingAll().then(res => {
                this.warehouses = res
                if (res.length > 0) {
                    this.warehouse = res[0]
                    this.getBalanceWarehouse()
                }
                window.console.log(res, 'warehouse')
            })
        }
    },
    async mounted() {
        await this.generateColumn()
        await this.onloadWarehouse()
    },
    computed: {},
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
