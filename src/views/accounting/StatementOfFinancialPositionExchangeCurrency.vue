<template>
	<v-app>
		<v-container>
			<v-row>
				<v-col cols="12" sm="12">
					<div class="reports_list pt-3">
						<h2>{{$t('statement_financial_position')}} - Reporting Currency</h2>
						<v-icon 
							onclick="window.history.go(-1); return false;" 
							style="cursor: pointer; color: #333; font-size: 40px;"
							class="float-right"
						>close</v-icon>

						<div class="report_filter mb-3">
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
											<v-select class=" mt-8"
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
											<v-select class=" mt-8"
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
										<v-col class="" sm="2" cols="12">
											<v-btn class="white--text dv_mt" color="primary" @click="search">
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

	const { balanceSheetHandler } = require("@/scripts/AppHandlers");
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
			statementFPDS 	: [],
			// LoadingMe
			showLoading : false,
			columnBy 		: undefined,
			columnsBy 		: columnsBy,
			/* KENDO */
			columns : [],
			groupDefinition : [],
			aggregateDefinition : [
				{ field: "balance", aggregate: "sum" },
				{ field: "xchanged", aggregate: "sum" },
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
			// Search
			search () {
				let self = this
				// Empty dataSource
				let ds = this.$refs.dataSource.kendoWidget()
				ds.data([]);
				
				if(this.selectedMonth){
					let asOfDate = new Date(this.selectedMonth.end_date)

					// Query
					this.showLoading = true
					balanceSheetHandler.getBalanceSheet({
						params : {
							institute_id 	: instituteId,
							group_by 		: 1,//Annual
							as_of_date 		: kendo.toString(asOfDate, 'yyyy-MM-dd') + 'T23:59:59.999Z'
						}
					})
					.then(res => {
						if(res.data){
							res.data.forEach(element => {
								element['xchanged'] = element['balance'] * this.selectedMonth.rate
							})

							this.statementFPDS = res.data
							this.generateColumn()
						}else{
							// Clear statementFPDS
							this.statementFPDS = []
						}
					})
					.finally(function () {
						self.showLoading = false
					})
				}
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
		background-color: #F8F8F9;
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