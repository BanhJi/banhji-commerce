<template>
        <v-col sm="12" cols="12" class="">
            <v-card color="white" class="px-2 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="py-1">
                        <h2 class="mb-1 font_20">{{ $t('customer_order') }}</h2>
                    </v-col>
                </v-row>


                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <kendo-datasource ref="gridCollectionDS"
                                              :type="'JSON'"
                                              :server-paging="false"/>
                            <kendo-grid id="gridCollection" class="grid-function"
                                        :data-source-ref="'gridCollectionDS'"
                                        :editable="false"
                                        :groupable="false"
                                        :column-menu="true"
                                        :noRecords="true"
                                        :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'product'"
                                    :title="$t('product')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>

                                <kendo-grid-column
                                    :field="'qty'"
                                    :title="$t('qty')"
                                    :width="100"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'price'"
                                    :title="$t('price')"
                                    :width="100"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'discount'"
                                    :title="`%`"
                                    :width="100"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
								
                            </kendo-grid>
							<LoadingMe
								:isLoading="showLoading"
								:fullPage="false"
								:myLoading="true"
								:alertMessage="loadingAlert"
								:color="loadingColorAlert"
								:alertText="loadingTextAlert"/>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
	
</template>

<script>
export default {
    data: () => ({
		asOf: new Date().toISOString().substr(0, 10),
		showLoading: false,
		loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
    }),
    components: {
        LoadingMe: () => import(`@/components/Loading`),

    },
    methods: {},
    computed: {

	},
};
</script>
<style scoped>
.k-chart {
    height: 180px;
}

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
.k-grid th {
    padding: 8px 12px;
    border-width: 0 0 1px 1px;
    white-space: break-spaces !important;
    text-align: center !important;
}

</style>
