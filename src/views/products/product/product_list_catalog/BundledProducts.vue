<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="10" cols="12" class="py-0">
                        <h2 class="mb-0 font_20">{{ $t("list") }}</h2>
                        <p class="mb-0">{{$t('list_desc')}}</p>
                    </v-col>
                    <!-- <v-col sm="6" cols="12" class="py-0">
                        <v-btn routes link to="bundle_product" color="primary"
                            class=" white--text float-right text-capitalize">
                            {{ $t('new_catalog') }}
                        </v-btn>
                    </v-col> -->
                </v-row>
                <v-row class="mt-0">
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
                                    :title="$t('name')"
                                    :attributes="{class:'tb_name_td'}"
                                    :template="'<span>#=name#</span>'"
                                    :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                                <kendo-grid-column
                                    :field="'description'"
                                    :title="$t('description')"
                                    :template="'<span>#=amount#</span>'"
                                    :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                                <kendo-grid-column
                                    :field="'uom'"
                                    :title="$t('uom')"
                                    :template="'<span>#=paymentTerm.name#</span>'"
                                    :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                                <kendo-grid-column
                                    :field="'pricelevel'"
                                    :title="$t('price_level')"
                                    :template="'<span>#=overDue#</span>'"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'price'"
                                    :title="$t('price')"
                                    :template="status"
                                    :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                                <kendo-grid-column
                                    :field="'no_of_product'"
                                    :title="$t('uom')"
                                    :template="status"
                                    :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"/>
                                <kendo-grid-column
                                    :field="'no_of_service'"
                                    :title="$t('no_of_service')"
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
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
export default {
    data: () => ({
        asOf: "",
        showLoading: false,
        group: {field: 'name'},
        receivableList: []
    }),
    components: {
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