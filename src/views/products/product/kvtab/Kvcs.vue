<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="8" cols="12" class="pt-0">
                        <h2 class="mb-0 font_20">{{$t('key_value_categories_kvcs')}}</h2>
                        <p class="mb-0">{{$t('key_value_categories_kvcs_desc')}}</p>
                    </v-col>
               
                    <v-col sm="3" cols="12" class="py-0">
                        <app-datepicker :initialDate="asOf"
                                        @emitDate="asOf = $event"/>
                    </v-col>
                    <v-col sm="1" cols="12" class="py-1 pl-0">
                        <v-btn color="primary white--text text-capitalize" @click="loadReceivable">
                            {{$t('view')}}
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <kendo-datasource ref="dataSource"
                                              :group="group"
                                              :data="receivableList"
                            />
                            <kendo-grid id="gridReceivable" class="grid-function"
                                        :data-source-ref="'dataSource'"
                                        :sortable="false"
                                        :groupable="true"
                                        :filterable="false"
                                        :column-menu="true"
                                        :editable="false"

                                        :scrollable-virtual="true"
                            >
                                <kendo-grid-column
                                    :field="'categories'"
                                    :title="$t('categories')"
                                    :template="'<span>#=name#</span>'"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'no_of_product'"
                                    :title="$t('no_of_product')"
                                    :template="'<span>#=amount#</span>'"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'kvis'"
                                    :title="$t('kvis')"
                                    :template="'<span>#=paymentTerm.name#</span>'"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'no_of_sales'"
                                    :title="$t('no_of_sales')"
                                    :template="'<span>#=overDue#</span>'"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'average_margin'"
                                    :title="$t('average_margin')"
                                    :template="status"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'turnoverday'"
                                    :title="$t('turnover_day')"
                                    :template="status"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'wac'"
                                    :title="$t('%_of_total_sale')"
                                    :template="status"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                        
                                <kendo-grid-column
                                    :field="'action'"
                                    :title="$t('action')"
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

const billingHandler = require("@/scripts/invoice/handler/billingHandler")

export default {
    data: () => ({
        asOf: "",
        showLoading: false,
        group: {field: 'name'},
        receivableList: []
    }),
    components: {
        'app-datepicker': DatePickerComponent
    },
    methods: {
        async loadReceivable() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    const strFilter = '?asOf=' + this.asOf
                    billingHandler.wcpReceivableList(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            window.console.log('log', res.data.data)
                            this.receivableList = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        status(dataItem) {
            let status = ''
            switch (dataItem.status) {
                case 1:
                    status = 'Open'
                    break
                case 2:
                    status = 'Partially Paid'
                    break
                case 3:
                    status = 'Paid'
                    break
                case 4:
                    status = 'Void'
                    break
            }
            return status
        },
    },
    computed: {},
    mounted: async function () {

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