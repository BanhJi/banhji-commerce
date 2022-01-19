<template>
    <v-row>
        <v-col cols="12" sm="12" class="pt-1 pl-4">
            <h3 class="mb-3  primary--text text-uppercase font_22">{{$t('statement_financial_position')}}</h3>
            <div class="report_filter mb-3">
                <v-row>
                    <v-col sm="9" cols="12" class="pb-0">
                        <v-row>
                            <v-col sm="6" cols="12" class="py-0">
                                <label class="label  text-uppercase pt-5">{{$t('as_of')}}</label>
                                <app-datepicker :initialDate="as_of_date" @emitDate="as_of_date = $event" />
                            </v-col>
                            <v-col sm="6" cols="12" class="py-0">
                                <label class="label text-uppercase">{{$t('disable_column_by')}}</label>
                                <v-select class="mt-1"
                                    :items="columnsBy"
                                    item-text="text"
                                    placeholder="Total"
                                    item-value="value"
                                    v-model="columnBy"
                                    clearable
                                    outlined
                                />
                            </v-col>
                            <v-col sm="6" cols="12" class="py-0">
                                <label class="label text-uppercase">{{$t('compared_period')}}</label>
                                <v-select class="mt-1"
                                    item-text="text"
                                    item-value="value"
                                    placeholder="All"
                                    clearable
                                    outlined
                                />
                            </v-col>
                            <v-col sm="2" cols="12" class="pt-4 mt-2">
                                <v-btn color="primary" class="btn_run_report" @click="search">
                                <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col sm="3" cols="12" >
                        <div class="report_export">
                            <p class="mb-1">{{$t('export_as')}}:</p>
                            <i class="fa fa-print" style="font-size:34px; padding-right:6px;" aria-hidden="true"/>
                            <i class="fa fa-file-excel"  style="font-size:34px;padding-right:6px;"  aria-hidden="true"/>
                            <i class="fa fa-file-pdf" style="font-size:34px;padding-right:6px;" aria-hidden="true"/>
                        </div>
                    </v-col>
                </v-row>
            </div>

            <div class="reports_table">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">

                        <kendo-datasource ref="dataSource"
                            :data="statementFPDS"
                            :schema="schemaDefinition"
                            :group="groupDefinition"
                            :aggregate="aggregateDefinition"/>

                        <kendo-grid id="gridSFP" class="custom_grid"
                            :data-source-ref="'dataSource'"
                            :change="onGridChanges"
                            :selectable="true"
                            :persistSelection="true"
                            :sortable="true"
                            :column-menu="true"
                            :reorderable="true"
                            :resizable="true"
                            :noRecords="true"
                            :toolbar="['excel']"
                            :excel-file-name="'balanceSheetReport.xlsx'"
                            :excel-filterable="true"
                            :columns="columns"/>

                    </v-col>
                </v-row>
            </div>
            <LoadingMe
                :isLoading ="compeletLoading"
                :fullPage  ="false"
                :myLoading ="true"/>

        </v-col>
    </v-row>
</template>

<script>
	import kendo from '@progress/kendo-ui'
	import LoadingMe from '@/components/Loading'
	import { i18n } from '@/i18n'
	import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'

	// const $ 					= require("jquery")
	const { balanceSheetHandler } = require("@/scripts/AppHandlers");
	const { columnsBy } = require("@/scripts/default_setup/DateSearch.js");
	
	export default {
		components:{
			'LoadingMe': LoadingMe,
			'app-datepicker' : DatePickerComponent,
		},
		data: () => ({
			as_of_date 		: new Date().toISOString().substr(0, 10),
			statementFPDS 	: [],
			// LoadingMe
			compeletLoading : false,
			columnBy 		: "1", //Default Total
			columnsBy 		: columnsBy,
			/* KENDO */
			columns : [],
			groupDefinition : [],
			aggregateDefinition : [
				{ field: "balance", aggregate: "sum" },
				{ field: "zero", aggregate: "sum" },
				{ field: "one", aggregate: "sum" },
				{ field: "two", aggregate: "sum" },
				{ field: "three", aggregate: "sum" },
				{ field: "four", aggregate: "sum" },
				{ field: "five", aggregate: "sum" },
				{ field: "six", aggregate: "sum" },
				{ field: "seven", aggregate: "sum" },
				{ field: "eight", aggregate: "sum" },
				{ field: "nine", aggregate: "sum" },
				{ field: "ten", aggregate: "sum" },
				{ field: "eleven", aggregate: "sum" },
			],
			schemaDefinition	: {
				model: { id: "accountUUID" }
			},
		}),
		methods:  {
			/* KENDO */
			/* On grid changes => link to GL */
			onGridChanges () {
				let grid = kendo.jQuery("#gridSFP").data("kendoGrid")
				let selectedItem = grid.dataItem(grid.select())

				let asOf = new Date(this.as_of_date)

				/* if day = 1 need to minus 1 month */
				if(asOf.getDate() === 1){
					asOf.setMonth(asOf.getMonth() - 1)
				}
				asOf.setDate(1)

				this.$router.push({ 
					path: 'general_ledger', 
					query: { 
						account_id 	: selectedItem.accountUUID,
						start_date	: kendo.toString(asOf, "yyyy-MM-dd"),
						end_date	: this.as_of_date,
					}
				})
			},
			// Search
			search () {
				// Empty dataSource
				let ds = this.$refs.dataSource.kendoWidget()
				ds.data([]);
				
				if(this.as_of_date){
					let asOfDate = new Date(this.as_of_date)

					// Query
					this.compeletLoading = true
					balanceSheetHandler.getBalanceSheet({
						params : {
							group_by 		: this.columnBy,
							as_of_date 		: kendo.toString(asOfDate, 'yyyy-MM-dd') + 'T23:59:59.999Z'
						}
					})
					.then(res => {
						this.compeletLoading = false
						if(res){
							this.statementFPDS = res.data
							this.generateColumn()
						}else{
							// Clear statementFPDS
							this.statementFPDS = []
					}
					});
				}
			},
			generateColumn () {
				let wordNums = ['zero','one','two','third','four','five','six','seven','eight','nine','ten','eleven']
				let defaultColumns = [
					{ 
						field: "name", 
						title: i18n.t('account'),
						template: "#=number# #=name#", 
						locked: true, 
						width:300 
					},
					{ field: "type", title: "TYPE", hidden: true, groupHeaderTemplate:"#=value#", width:300 },
					{ field: "statementGroup", title: "STATEMENT GROUP", hidden: true, groupHeaderTemplate:"#=value#", width:300 },
					{ field: "groupNature", title: "NATURE", hidden: true, groupHeaderTemplate:"#=value#", width:300 },
				]

				switch (this.columnBy) {
					case '12': // MONTH
						for (let i = 0; i < 12; i++) {
							defaultColumns.push({ 
								field: wordNums[i],
								title: "M" + (i+1),
								format: "{0:n}",
								width: 200,
								aggregates: "['sum']",
								groupHeaderColumnTemplate: "<div style=text-align:right>#=kendo.toString(sum, 'n')#</div>",
								headerAttributes: {
									"class": "table-header-cell",
									style: "text-align: right; font-size: 14px"
								},
								attributes: {
									"class": "table-cell",
									style: "text-align: right; font-size: 14px"
								},
							})
						}

						this.columns = defaultColumns

						break;
					
					
					case '4': // QUARTER
						for (let i = 0; i < 4; i++) {
							defaultColumns.push({ 
								field: wordNums[i],
								title: "Q" + (i+1),
								format: "{0:n}",
								width: 200,
								aggregates: "['sum']",
								groupHeaderColumnTemplate: "<div style=text-align:right>#=kendo.toString(sum, 'n')#</div>",
								headerAttributes: {
									"class": "table-header-cell",
									style: "text-align: right; font-size: 14px"
								},
								attributes: {
									"class": "table-cell",
									style: "text-align: right; font-size: 14px"
								},
							})
						}

						this.columns = defaultColumns

						break;
					
					case '2': // SEMI-ANNUAL
						// Expand Column [0] width
						defaultColumns[0].width = 400

						for (let i = 0; i < 2; i++) {
							defaultColumns.push({ 
								field: wordNums[i],
								title: "SEMI " + (i+1),
								format: "{0:n}",
								width: 300,
								aggregates: "['sum']",
								groupHeaderColumnTemplate: "<div style=text-align:right>#=kendo.toString(sum, 'n')#</div>",
								headerAttributes: {
									"class": "table-header-cell",
									style: "text-align: right; font-size: 14px"
								},
								attributes: {
									"class": "table-cell",
									style: "text-align: right; font-size: 14px"
								},
							})
						}

						this.columns = defaultColumns

						break;

					default: // TOTAL
						// Expand Column [0] width
						defaultColumns[0].width = 700

						defaultColumns.push({ 
							field: "balance",
							title: "TOTAL",
							format: "{0:n}",
							width:300,
							aggregates: "['sum']",
							groupHeaderColumnTemplate: "<div style=text-align:right>#=kendo.toString(sum, 'n')#</div>",
							headerAttributes: {
								"class": "table-header-cell",
								style: "text-align: right; font-size: 14px"
							},
							attributes: {
								"class": "table-cell",
								style: "text-align: right; font-size: 14px"
							},
						})

						this.columns = defaultColumns
						
						break;
				}
			},
		},
		mounted () {
			// Kendo
			this.groupDefinition = [
				{ field: "groupNature", aggregates : this.aggregateDefinition },
				{ field: "statementGroup", aggregates : this.aggregateDefinition },
				{ field: "type", aggregates : this.aggregateDefinition },
			]
			// Initial Grid Columns
			this.generateColumn()
		},
	};
</script>
<style scoped>
	.reports_list{
		width: 100%;
		background-color: #fff;
		padding: 20px 20px 5px;
	}
	.report_filter{
		background-color: #EDF1F5;
		padding: 0 20px 5px 20px;
	}
	.dv_mt{
		margin-top: 20px;
	}
	.dv_mt8{
		margin-top: 30px;
	}
	.report_block .v-card.third{
		border: none;
		box-shadow: none;
		background-color: #2CA01C;
		color: #fff;
		text-transform: uppercase;
	}
	.report_block .v-card.third p.text{ 
		text-align: left;
		font-size: 16px;
	}
	.report_block .v-card.third p.number{ 
		text-align: center; 
		font-size: 25px;
		font-weight: 700;
		margin-bottom: 0;
	}
	.report_block .v-card.bg_gray{
		background-color: #EDF1F5;
		border: none;
		box-shadow: none;
		color: #000;
		float: left;
		width: 100%;
	}
	.report_block .v-card.bg_gray p span.text{
		width: 25%;
	}
	.report_block .v-card.bg_gray p span.number{
		width: 70%;
		font-size: 19px;
		font-weight: 700;
		padding: 7px 0 0 0;
		text-align: right;
	}
	@media (max-width: 576px){
		.dv_mt, .dv_mt8{ margin-top: 0;}
		.reports_list{ margin-top: 0; }
	}
</style>