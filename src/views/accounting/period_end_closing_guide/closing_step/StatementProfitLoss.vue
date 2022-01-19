<template>
    <v-row>
        <v-col cols="12" sm="12" class="pt-1 pl-4">
            <h3 class="mb-3 primary--text text-uppercase font_22">{{$t('statement_profit_lose')}}</h3>
            <div class="report_filter">
                <v-row>
                    <v-col sm="10" cols="12">
                        <v-row>
                            <v-col class="py-0" sm="4" cols="12">
                                <label class="label text-uppercase">{{$t('period')}}</label>
                                <v-select class="mt-1"
                                    :items="dateSorters"
                                    @change="onSorterChanges"
                                    @click:clear="start_date = undefined, end_date = undefined"
                                    clearable
                                    outlined
                                    placeholder="All"
                                />

                                <label class="label text-uppercase">{{$t('disable_column_by')}}</label>
                                <v-select class="mt-1"
                                    :items="columnsBy"
                                    item-text="text"
                                    item-value="value"
                                    v-model="columnBy"
                                    clearable
                                    outlined
                                />

                            </v-col>
                            <v-col class="py-0" sm="4" cols="12">
                                <label class="label text-uppercase">{{$t('from')}}</label>
                                <app-datepicker :initialDate="start_date" @emitDate="start_date = $event" />

                                <label class="label text-uppercase">{{$t('compared_period')}}</label>
                                <v-select class="mt-1"
                                    :items="columnsBy"
                                    item-text="text"
                                    item-value="value"
                                    v-model="columnBy"
                                    clearable
                                    outlined
                                />

                            </v-col>
                            <v-col class="py-0" sm="4" cols="12">
                                <label class="label text-uppercase">{{$t('to')}}</label>
                                <app-datepicker :initialDate="end_date" @emitDate="end_date = $event" />

                                <v-btn color="primary" class="btn_run_report dv_mt" @click="search">
                                <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                                </v-btn>
                            </v-col>
                            <!-- <v-col sm="2" cols="12" class="dv_mt">
                                <v-btn class="btn_run_report">
                                    Run Report
                                </v-btn>
                            </v-col> -->
                        </v-row>
                    </v-col>
                    <v-col sm="2" cols="12" >
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
                    <v-col sm="12" cols="12" class="custom_expansion mt-2">
                        <kendo-datasource ref="dataSource"
                            :data="statementPLDS"
                            :schema="schemaDefinition"
                            :group="groupDefinition"
                            :aggregate="aggregateDefinition" />

                        <kendo-grid id="gridSPL" class="custom_grid"
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
                            :excel-file-name="'incomeStatement.xlsx'"
                            :excel-filterable="true"
                            :columns="columns" />
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

	/* Cookie */
	const cookieJS = require("@/cookie.js");
	const { instituteId } = cookieJS.getCookie();

	const { incomeStatementHandler } = require("@/scripts/AppHandlers");
	const { dateSorters, columnsBy } = require("@/scripts/default_setup/DateSearch.js");
	
	export default {
		components:{
			'LoadingMe': LoadingMe,
			'app-datepicker' : DatePickerComponent,
		},
		data: () => ({
			start_date 		: '',
			end_date 		: '',
			compeletLoading : false,
			dateSorters 	: dateSorters,
			statementPLDS 	: [],
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
			/* KENDO */
			/* On grid changes => link to GL */
			onGridChanges () {
				let grid = kendo.jQuery("#gridSPL").data("kendoGrid")
				let selectedItem = grid.dataItem(grid.select())

				this.$router.push({ 
					path: 'general_ledger', 
					query: { 
						account_id	: selectedItem.accountUUID,
						start_date	: this.start_date,
						end_date	: this.end_date,
					}
				})
			},
			// Search journals
			search () {
				let sdate = this.start_date,
					edate = this.end_date;
				
				if(sdate && edate){
					sdate = kendo.toString(new Date(sdate), 'yyyy-MM-dd') + 'T00:00:00.000Z'

					edate = new Date(edate)
					edate = kendo.toString(edate, 'yyyy-MM-dd') + 'T23:59:59.999Z'
				}else{
					sdate = 0
					edate = 0
				}
				
				// Empty dataSource
				var ds = this.$refs.dataSource.kendoWidget()
				ds.data([]);
					
				// Query
				this.compeletLoading = true
				incomeStatementHandler.getIncomeStatement({
					params : {
						institute_id 	: instituteId,
						start_date 		: sdate,
						end_date 		: edate,
						group_by 		: this.columnBy,
					}
				})
				.then(res => {
					this.compeletLoading = false;
					if(res){
						if(res.data){
							this.statementPLDS = res.data
							this.generateColumn()
						}else{
							// Clear dataSource
							this.statementPLDS = []
						}
					}
				});
			},
			generateColumn () {
				let wordNums = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven']
				let defaultColumns = [
					{ 
						field: "name", 
						title: i18n.t('account'),
						template: "#=number# #=name#",
						locked: true,
						width:300
					},
					{ field: "type", title: "TYPE", hidden: true, groupHeaderTemplate:"<span class='text-bold text-black'>#=value#</span>", width:300 },
					{ field: "statementGroup", title: "STATEMENT GROUP", hidden: true, groupHeaderTemplate:"<span class='text-bold text-black'>#=value#</span>", width:300 },
					{ field: "groupNature", title: "NATURE", hidden: true, groupHeaderTemplate:"<span class='text-bold text-black'>#=value#</span>", width:300 },
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
								groupHeaderColumnTemplate: "<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
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
								groupHeaderColumnTemplate: "<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
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
								groupHeaderColumnTemplate: "<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
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
							groupHeaderColumnTemplate: "<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
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
				{ 
					field: "groupNature", 
					aggregates : this.aggregateDefinition,
					compare: function(a, b) {
						if (a.items[0].number === b.items[0].number) {
							return 0;
						} else if (a.items[0].number > b.items[0].number) {
							return 1;
						} else {
							return -1;
						}
					}
				},
				{ 
					field: "statementGroup", 
					aggregates : this.aggregateDefinition,
					compare: function(a, b) {
						if (a.items[0].number === b.items[0].number) {
							return 0;
						} else if (a.items[0].number > b.items[0].number) {
							return 1;
						} else {
							return -1;
						}
					}
				},
				{ 
					field: "type", 
					aggregates : this.aggregateDefinition,
					compare: function(a, b) {
						if (a.items[0].number === b.items[0].number) {
							return 0;
						} else if (a.items[0].number > b.items[0].number) {
							return 1;
						} else {
							return -1;
						}
					}
				},
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
		position: relative;
	}
	.dv_mt{
		margin-top: 30px;
	}
	.report_export{
		position: absolute;
		top: 20px;
	}
	.report_total{
		padding: 12.5px;
		text-align: right;
		text-transform: uppercase;
		font-weight: 700;
		border-top: 1px solid #333;
		border-bottom: 1px solid #333;
	}
	.custom_expansion .v-expansion-panel-header .v-expansion-panel-header__icon .v-icon{
		display: none !important;
	}
	.v-expansion-panel{
		border-bottom: 1px solid #cccccc;
		border-radius: 0;
	}
	.v-expansion-panel::before{
		box-shadow: none;
	}
	.v-expansion-panel-header{
		padding: 15px;
	}
	.v-expansion-panel-content__wrap{
		padding: 0 35px 10px;
	}
	@media (max-width: 576px){
		.dv_mt, .dv_mt8{ margin-top: 0;}
		.reports_list{ margin-top: 0; }
	}
</style>