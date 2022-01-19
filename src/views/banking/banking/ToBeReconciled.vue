<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class=" no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{ $t('transactions_need_to_be_reconciled') }}</h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="9" cols="12" class="py-0">
                        <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                                        :initEndDate="endDate" @emitEndDate="endDate = $event"/>
                    </v-col>

                    <v-col sm="1" cols="12" class="pt-1 pb-0">
                        <v-btn class="btn_search" style="background-color: rgb(237, 241, 245)"
                               @click="search">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="true"
                                :myLoading="true"
                                :alertMessage="loadingAlert"
                                :color="loadingColorAlert"
                                :alertText="loadingTextAlert"/>

                            <kendo-datasource ref="statementDS"
                                :data="statements"
                                :schema="schemaDefinition"
                                :sort="sortDefinition"
                                :group="groupDefinition"
								:aggregate="aggregateDefinition"
                                />

                            <kendo-grid ref="gridStatement" class="grid-function"
                                    :data-source-ref="'statementDS'"
                                    :sortable="true"
                                    :column-menu="true"
                                    :reorderable="true"
                                    :resizable="true"
                                    :noRecords="true"
                                    :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'created_date'"
                                    :title="$t('imported_date')"
                                    :template="importDateTmpl"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'bank_ref'"
                                    :title="$t('num')"
                                    :width="200"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'statement_date'"
                                    :title="$t('date')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'transaction_type'"
                                    :title="$t('type')"
                                    :width="200"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'bank_acc_number'"
                                    :title="$t('bank_account')"
                                    :template="'<span>#=bank_acc_number# #=currency#</span>'"
                                    :groupHeaderTemplate="`<span class='text-bold text-black'>#=value#</span>`"
                                    :width="200"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'bank.name'"
                                    :title="$t('bank')"
                                    :template="'<span>#=bank.name#</span>'"
                                    :groupHeaderTemplate="`<span class='text-bold text-black'>#=value#</span>`"
                                    :width="200"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'details'"
                                    :title="$t('details')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'amount'"
                                    :title="$t('amount')"
                                    :format="'{0:n}'"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"
                                    :attributes="{
                                        class: 'table-cell',
                                        style: 'text-align: right; font-size: 14px'
                                    }" />
                                <kendo-grid-column :command="{ text: 'Reconcile Now', click: goReconcile }"
                                    :title="$t('action')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                            </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
// import { i18n } from '@/i18n';
import { 
    BankStatementModel,
    BankModel,
} from "@/scripts/model/AppModels";

const $ = require("jquery");
const {
    bankStatementHandler,
    bankHandler,
} = require("@/scripts/AppHandlers");

export default {
    components: {
        "LoadingMe": () => import('@/components/Loading'),
        "app-searchdate": () => import('@/components/custom_templates/SearchDate'),
    },
    data: () => ({
        startDate 		: '',
        endDate 		: '',
        statements      : [],
        /* KENDO */
        sortDefinition : { field: "statement_date", dir: "desc" },
        groupDefinition : [],
        aggregateDefinition : [
            { field: "amount", aggregate: "sum" },
            { field: "balance", aggregate: "sum" },
        ],
        schemaDefinition	: {
            model: { id: "uuid" }
        },
        // LoadingMe
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: "",
        loadingTextAlert: "",
    }),
    methods: {
        // Search journals
        async search () {
            let sdate = this.startDate,
                edate = this.endDate;

            if(sdate && edate){
                sdate = kendo.toString(new Date(sdate), 'yyyy-MM-dd') + 'T00:00:00.000Z';

                edate = new Date(edate);
                edate = kendo.toString(edate, 'yyyy-MM-dd') + 'T23:59:59.999Z';
            }else{
                sdate = 0;
                edate = 0;
            }
            
            // Empty dataSource
            let ds = this.$refs.statementDS.kendoWidget();
            ds.data([]);
                
            // Query
            this.showLoading = true;

            /* Load Statement */
            let bankStatements = await bankStatementHandler.toBeReconcileEntries({
                params : {
                    start_date 		: sdate,
                    end_date 		: edate
                }
            });

            /* Load Bank */
            let banks = await bankHandler.getAll();
            
            let statementList = [];
            bankStatements.data.forEach(value => {
                let bankStatement = new BankStatementModel(value);

                // Statement Date
                bankStatement.statement_date = kendo.toString(new Date(value.statement_date), 'dd-MM-yyyy HH:mm:ss tt');

                // Bank
                bankStatement.bank = new BankModel(banks.data.find(item => item.uuid === value.bank_uuid));

                statementList.push(bankStatement);
            });
            this.statements = statementList;

            this.showLoading = false;
        },
        // Kendo Grid Template
        importDateTmpl(dataItem){
            return Helper.dateFormat(dataItem.created_date);
        },
        // Generate Group By
        generateGroupBy(){
            this.groupDefinition = [
                { 
                    field: "bank.name", 
                    aggregates : this.aggregateDefinition,
                    compare: function(a, b) {
                        if (a.items[0].bank.name === b.items[0].bank.name) {
                            return 0;
                        } else if (a.items[0].bank.name > b.items[0].bank.name) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                },
                { 
                    field: "bank_acc_number", 
                    aggregates : this.aggregateDefinition,
                    compare: function(a, b) {
                        if (a.items[0].statement_date === b.items[0].statement_date) {
                            return 0;
                        } else if (a.items[0].statement_date > b.items[0].statement_date) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                },
            ];
        },
        // Go Reconcile
        goReconcile(e) {
            e.preventDefault();

            let grid = this.$refs.gridStatement.kendoWidget();
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

			this.$router.push({ 
                name: 'Bank Statement Reconciliation', 
                params: { 
                    initBankStatement: new BankStatementModel(dataItem),
                },
            });
		}, 
    },
    mounted(){
        // Generate Group By
		this.generateGroupBy();
    }
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
.row + .row {
    margin-top: 0 !important;
}
</style>
