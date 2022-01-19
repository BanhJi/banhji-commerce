<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="6" cols="12" class="py-0">
                        <!-- <h2 class="mb-1 font_22">{{ $t('receivable_management') }}</h2> -->
                        <p class="mb-0">{{ $t('payable_aging_desc') }}</p>
                    </v-col>
                    <v-col sm="4" cols="12" class="py-0">
                        <app-datepicker :initialDate="asOf"
                                        @emitDate="asOf = $event"/>
                        <v-select class="mt-1"
                                  clearable
                                  outlined
                                  placeholder="supplier"
                        />
                    </v-col>
                    <v-col sm="1" cols="12" class="py-0">
                        <v-btn color="primary white--text text-capitalize" @click="loadReceivable">
                            {{$t('view')}}
                        </v-btn>
                    </v-col>
                    <v-col sm="2" cols="12" class="py-0">
                        <!--                        <v-row>-->
                        <!--                            <v-col sm="12" cols="12">-->
                        <!--                                <v-btn color="primary" class="text-capitalize white&#45;&#45;text float-right">-->
                        <!--                                    {{ $t('view') }}-->
                        <!--                                </v-btn>-->
                        <!--                            </v-col>-->
                        <!--                        </v-row>-->
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0">
                                <v-btn icon color="black" class="bg-none float-right ">
                                    <v-icon class="font_34">fa fa-file-excel</v-icon>
                                </v-btn>

                                <v-btn icon color="black" class="bg-none float-right ml-2">
                                    <v-icon class="font_34">fa fa-print</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>

                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border white--text d-flex justify-space-between align-center" color="secondary" height="85px">
                            <h3 class="text-left text-uppercase font_13 flex-1">{{ $t('overdue_bill') }}</h3>
                            <h3 class="text-right flex-1 font_20">10</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border white--text d-flex justify-space-between align-center" color="third" height="85px">
                            <h3 class="text-left text-uppercase font_13 flex-1">{{ $t('payable_balance') }}</h3>
                            <h3 class="text-right font_20 flex-1">10,000.00</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border black--text d-flex justify-space-between align-center" color="grayBg" height="85px">
                            <h3 class="text-left text-uppercase font_13 flex-1">{{ $t('no_of_bill_today') }}</h3>
                            <h3 class="text-right font_20 flex-1">10</h3>
                        </v-card>
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
                                    :field="'name'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('name')"
                                    :template="'<span>#=name#</span>'"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'amount'"
                                    :title="$t('amount')"
                                    :template="'<span>#=amount#</span>'"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'paymentTerm'"
                                    :title="$t('term')"
                                    :template="'<span>#=paymentTerm.name#</span>'"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'aging'"
                                    :title="$t('aging')"
                                    :template="'<span>#=overDue#</span>'"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'status'"
                                    :title="$t('status')"
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