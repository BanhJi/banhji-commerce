<template>
	<v-app>
		<v-container>
			<v-row>
				<v-col cols="12" sm="12">
					<div class="reports_list pt-3">
						<h2>{{$t('statement_profit_lose')}} - Reporting Currency</h2>
						<v-icon 
							onclick="window.history.go(-1); return false;" 
							style="cursor: pointer; color: #333; font-size: 40px;"
							class="float-right"
						>close</v-icon>

						<div class="report_filter">
							<v-row>
								<v-col sm="10" cols="12" class="pb-0">
									<v-row>
										<v-col class="pt-0" sm="3" cols="12">
											<label class="label">{{$t('period')}}</label>
											<v-select class="mt-1"
												:items="years"
												v-model="selectedYear"
												append-icon="event"
												outlined
											/>
										</v-col>
										<v-col class="pt-0" sm="3" cols="12">
											<v-select class=" mt-6"
												@change="onColumnByChanges"
												:items="columnsBy"
												item-text="text"
												item-value="value"
												v-model="columnBy"
												return-object
												outlined
											/>
										</v-col>
										<v-col class="pt-0" sm="4" cols="12">
											<v-select class=" mt-6"
												:disabled="columnBy === undefined"
												:items="months"
												v-model="selectedMonth"
												return-object
												outlined
											>
												<template slot='selection' slot-scope='{ item }'>
													{{ item.type }} {{ item.month_name }} {{ item.rate }} {{ item.code }}
												</template>
												<template slot='item' slot-scope='{ item }'>
													{{ item.type }} {{ item.month_name }} {{ item.rate }} {{ item.code }}
												</template>
											</v-select>
										</v-col>
										<v-col class="pt-0" sm="2" cols="12">
											<v-btn class="white--text mt-6" color="primary" @click="search">
												<i class="b-search" style="font-size: 18px; color:#fff !important;"/>
											</v-btn>
										</v-col>
									</v-row>
								</v-col>
								<!-- <v-col sm="2" cols="12" >
									<div class="report_export">
										<p class="mb-1">{{$t('export_as')}}:</p>
										<i class="fa fa-print" style="font-size:34px; padding-right:6px;" aria-hidden="true"/>
										<i class="fa fa-file-excel"  style="font-size:34px;padding-right:6px;"  aria-hidden="true"/>
										<i class="fa fa-file-pdf" style="font-size:34px;padding-right:6px;" aria-hidden="true"/>
									</div>
								</v-col> -->
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
							:isLoading ="showLoading" 
							:fullPage  ="false" 
							:myLoading ="true"/>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
	import kendo from '@progress/kendo-ui'
	import LoadingMe from '@/components/Loading'
	import { i18n } from '@/i18n'
	
	/* Cookie */
	const cookieJS = require("@/cookie.js");
	const { instituteId } = cookieJS.getCookie();

	const { incomeStatementHandler } = require("@/scripts/AppHandlers");
	const exchangeRateHandler	= require('@/scripts/exchangeRateHandler.js')
	const { columnsBy } = require("@/scripts/default_setup/DateSearch.js");
	
	export default {
		components:{
			LoadingMe,
		},
		data: () => ({
			selectedYear 	: Number(new Date().toISOString().substr(0, 4)),
			years 			: [],
			selectedMonth 	: undefined,
			months 			: [],
			/* LoadingMe */
			showLoading : false,
			statementPLDS 	: [],
			columnBy 		: undefined,
			columnsBy 		: columnsBy,
			/* KENDO */
			columns : [],
			groupDefinition : [],
			aggregateDefinition : [
				{ field: "balance", aggregate: "sum" },
				{ field: "xchanged", aggregate: "sum" },
			],
			schemaDefinition : {
				model: { id: "accountUUID" }
			},
		}),
		methods:  {
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
			onColumnByChanges () {
				exchangeRateHandler.getReportingCurrency({
					params : {
						year : this.selectedYear,
						type : this.columnBy.text,
					}
				})
				.then(res => {
					if(res.data.data){
						this.months = res.data.data
					}
				})
			},
			// Search journals
			search () {
				let self = this
				let sdate = this.selectedMonth.start_date,
					edate = this.selectedMonth.end_date;
				
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
				this.showLoading = true
				incomeStatementHandler.getIncomeStatement({
					params : {
						institute_id 	: instituteId,
						start_date 		: sdate,
						end_date 		: edate,
						group_by 		: 1,//Annual
					}
				})
				.then(res => {
					if(res.data){
						res.data.forEach(element => {
							element['xchanged'] = element['balance'] * this.selectedMonth.rate
						})
						
						this.statementPLDS = res.data
						this.generateColumn()
					}else{
						// Clear dataSource
						this.statementPLDS = []
					}
				})
				.finally(function () {
					self.showLoading = false
				})
			},
			generateColumn () {
				let titleConverted = 'Amt in '
				let colName = 'Balance'
				if(this.selectedMonth){
					let m = this.selectedMonth
					colName = m.type +' '+ m.month_name
					titleConverted += m.code + '('+ kendo.toString(m.rate, 'n') +')'
				}

				this.columns = [
					{ 
						field: "name", 
						title: i18n.t('account'),
						template: "#=number# #=name#",
						locked: true,
						width:500
					},
					{ field: "type", title: "TYPE", hidden: true, groupHeaderTemplate:"<span class='text-bold text-black'>#=value#</span>", width:300 },
					{ field: "statementGroup", title: "STATEMENT GROUP", hidden: true, groupHeaderTemplate:"<span class='text-bold text-black'>#=value#</span>", width:300 },
					{ field: "groupNature", title: "NATURE", hidden: true, groupHeaderTemplate:"<span class='text-bold text-black'>#=value#</span>", width:300 },
					{ 
						field: 'balance',
						title: colName,
						format: "{0:n}",
						width: 250,
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
					},
					{ 
						field: 'xchanged',
						title: titleConverted,
						format: "{0:n}",
						width: 250,
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
					}
				]
			},
			// Generate last 20 years
			generateYear () {
				let thisYear = this.selectedYear 
				for (let index = 0; index < 20; index++) {
					this.years.push(thisYear - index)
				}
			},
		},
		mounted () {
			// Generate years
			this.generateYear()

			/* KENDO */
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
		background-color: #F8F8F9;
		padding: 0 20px 5px 20px;
		position: relative;
	}
	.dv_mt{
		margin-top: 30px;
	}
	.report_export{
		position: absolute;
		top: 16px;
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