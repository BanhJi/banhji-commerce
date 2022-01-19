<template>
	<v-row>
		<v-col sm="12" cols="12" class="grayBg px-6" >
			<v-card color="white" class="pa-3 no_border "  elevation="0">
				<v-row>
					<v-col sm="4" cols="12" class="py-0">
						<label class="label pt-5">{{ $t("base_month") }}</label>
						<app-month-picker
							:initialMonth="baseMonth"
							@emitMonth="baseMonth = $event"
						/>
					</v-col>
					<v-col sm="4" cols="12" class="py-0">
						<label class="label pt-5">{{ $t("compare_month") }}</label>
						<app-month-picker
							:initialMonth="compareMonth"
							@emitMonth="compareMonth = $event"
						/>
					</v-col>
					<v-col sm="2" cols="12" class="pt-6">
						<v-btn class="white--text" color="primary" @click="search">
								<i class="b-search" style="font-size: 18px; color:#fff !important;"/>
						</v-btn>
					</v-col>
					<v-col sm="2" cols="12" class="py-0">
						<app-reporting-language
							:initLanguage="reportingLanguage"
							@emitLanguage="reportingLanguage = $event"
						/>
					</v-col>
				</v-row>
				<v-row class="mt-0">
					<v-col sm="12" cols="12" class="custom_expansion pt-0">
						<kendo-datasource
							ref="statementDS"
							:data="statementList"
							:schema="schemaDefinition"
							:sort="sortDefinition"
							:group="groupDefinition"
							:aggregate="aggregateDefinition"
						/>

						<kendo-grid
							id="statementGrid"
							class="custom_grid"
							:data-source-ref="'statementDS'"
							:dataBound="dataBound"
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
							:columns="columns"
						/>
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
import kendo from "@progress/kendo-ui";
import { i18n } from "@/i18n";
// import Helper from "@/helper.js";
import BalanceSheetAnalysisModel from "@/scripts/model/accounting/BalanceSheetAnalysis";
import { dataStore } from "@/observable/store";

const { incomeStatementHandler } = require("@/scripts/AppHandlers");
const OrderNumberPL = require("@/scripts/default_setup/OrderNumberPL.js");

export default {
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-month-picker": () =>
			import("@/components/custom_templates/MonthPicker"),
		"app-reporting-language": () =>
			import("@/components/kendo_templates/ReportingLanguageDropDownList"),
	},
	data: () => ({
		baseMonth: new Date().toISOString().substr(0, 7),
		compareMonth: new Date().toISOString().substr(0, 7),
		statementList: [],
		// Reporting Language
		reportingLanguage: "english",
		fieldName: "name",
		fieldType: "type",
		// LodingMe
		showLoading: false,
		/* KENDO */
		columns: [],
		sortDefinition: { field: "number", dir: "asc" },
		groupDefinition: [],
		aggregateDefinition: [
			{ field: "baseAmount", aggregate: "sum" },
			{ field: "compareAmount", aggregate: "sum" }
		],
		schemaDefinition: {
			model: { id: "accountUUID" },
		},
	}),
	methods: {
		// Search journals
		async search() {
			// Empty dataSource
			let ds = this.$refs.statementDS.kendoWidget();
			ds.data([]);

			let bm = new Date(this.baseMonth),
				cm = new Date(this.compareMonth);

			/* Set to day 1 */
			bm.setDate(1);
			cm.setDate(1);

			/* Last day of the month */
			let bmLastDay = new Date(bm.getFullYear(), bm.getMonth()+1, 0),
				cmLastDay = new Date(cm.getFullYear(), cm.getMonth()+1, 0);

			// Query
			this.showLoading = true;
			let baseMonthIS = await incomeStatementHandler
				.getIncomeStatement({
					params: {
						start_date: kendo.toString(bm, "yyyy-MM-dd") + "T00:00:00.000Z",
						end_date: kendo.toString(bmLastDay, "yyyy-MM-dd") + "T23:59:59.999Z",
						group_by: "1",
					},
				})

			let compareMonthIS = await incomeStatementHandler
				.getIncomeStatement({
					params: {
						start_date: kendo.toString(cm, "yyyy-MM-dd") + "T00:00:00.000Z",
						end_date: kendo.toString(cmLastDay, "yyyy-MM-dd") + "T23:59:59.999Z",
						group_by: "1",
					},
				})
				
			/* Grouping */
			let g = {},
				totalRevenue = 0;

			/* Base Month Data */
			baseMonthIS.data.forEach((value) => {
				let entry = this.applyIncomeStatementRule(value);
				entry.baseAmount = value.balance;
				
				/* Sum Revenue */
				if (entry.groupNature.toLowerCase() === "revenue") {
					totalRevenue += entry.balance;
				}

				let gname = String(entry.accountUUID) + String(entry.account_type_number);
				g[gname] = entry;
			});

			/* Compare Month Data */
			compareMonthIS.data.forEach((value) => {
				let entry = this.applyIncomeStatementRule(value);

				/* Grouping */
				let gname = String(entry.accountUUID) + String(entry.account_type_number);

				if(g[gname]){
					g[gname]["compareAmount"] = entry.balance;
					g[gname]["changePercentage"] = this.findChangePercentage(g[gname]["baseAmount"], entry.balance);
				}else{
					entry.compareAmount = entry.balance;
					entry.changePercentage = this.findChangePercentage(entry.baseAmount, entry.balance);

					g[gname] = entry;
				}
			});

			/* Calculate Common Size */
			for (let k in g)
			g[k]["commonSize"] = this.findCommonSizePercentage(g[k]["baseAmount"], totalRevenue);

			this.statementList = Object.values(g);
			this.generateColumn();
			
			this.showLoading = false;
		},
		applyIncomeStatementRule(value){
			let entry = new BalanceSheetAnalysisModel(value);

			// Order
			if (
				value.account_type_number == OrderNumberPL.GrossProfit.number
			) {
				// Gross Profit
				entry.order = OrderNumberPL.GrossProfit.order;
			} else if (
				value.account_type_number == OrderNumberPL.OtherRevenue.number
			) {
				// Other Revenue
				entry.order = OrderNumberPL.OtherRevenue.order;
			} else if (
				value.account_type_number ==
				OrderNumberPL.OperatingExpense.number
			) {
				// Operating Expense
				entry.order = OrderNumberPL.OperatingExpense.order;
			} else if (
				value.account_type_number ==
				OrderNumberPL.OperatingIncomeEBITDA.number
			) {
				// Operating Income (EBITDA)
				entry.order = OrderNumberPL.OperatingIncomeEBITDA.order;
			} else if (
				value.account_type_number ==
				OrderNumberPL.EarningBeforeInterestAndTaxEBIT.number
			) {
				// Earning Before Interest And Tax(EBIT)
				entry.order =
					OrderNumberPL.EarningBeforeInterestAndTaxEBIT.order;
			} else if (
				value.account_type_number ==
				OrderNumberPL.ProfitBeforeTax.number
			) {
				// Profit Before Tax
				entry.order = OrderNumberPL.ProfitBeforeTax.order;
			} else if (
				value.account_type_number ==
				OrderNumberPL.ProfitForThePeriod.number
			) {
				// Profit For The Period
				entry.order = OrderNumberPL.ProfitForThePeriod.order;
			} else {
				entry.order = value.account_type_number;
			}

			return entry;
		},
		// Row Template
		accountTmpl(dataItem) {
			let name = dataItem.number;

			if (this.reportingLanguage === "local") {
				name += " - " + dataItem.local_name;
			} else {
				name += " - " + dataItem.name;
			}

			return name;
		},
		typeGroupHeaderTmpl(dataItem) {
			let name = dataItem.items[0].type;

			if (this.reportingLanguage === "local") {
				name = dataItem.items[0].type_local_name;
			}

			return name;
		},
		/* Databound */
		dataBound(e) {
			let grid = e.sender;

			grid.dataSource.data().forEach((value) => {
				if (value.account_type_number >= 100) {
					let row = grid.tbody
						.find("tr[data-uid='" + value.uid + "']")
						.prev(".k-grouping-row");
					grid.collapseGroup(row);
				}
			});
		},
		// Generate Columns
		generateColumn() {
			let headerAttributes = {
					class: "table-header-cell",
					style: "text-align: right;padding-right: 35px; font-size: 14px",
				},
				attributes = {
					class: "table-cell",
					style: "text-align: right; font-size: 14px",
				};

			this.columns = [
				{
					field: this.fieldName,
					title: i18n.t("account"),
					template: this.accountTmpl,
					locked: true,
					width: 400,
				},
				{
					field: this.fieldType,
					title: i18n.t("type"),
					hidden: true,
					groupHeaderTemplate: this.typeGroupHeaderTmpl,
					width: 300,
				},
				{
					field: "statementGroup",
					title: i18n.t("statement_group"),
					hidden: true,
					groupHeaderTemplate:
						"#=value#",
					width: 300,
				},
				{
					field: "groupNature",
					title: i18n.t("nature"),
					hidden: true,
					groupHeaderTemplate:
						"#=value#",
					width: 300,
				},
				{
					field: "baseAmount",
					title: this.baseMonth,
					format: "{0:#,##0.##;(#,##0.##)}",
					width: 150,
					aggregates: "['sum']",
					groupHeaderColumnTemplate:
						"<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
					headerAttributes: headerAttributes,
					attributes: attributes,
				},
				{
					field: "compareAmount",
					title: this.compareMonth,
					format: "{0:#,##0.##;(#,##0.##)}",
					width: 150,
					aggregates: "['sum']",
					groupHeaderColumnTemplate:
						"<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
					headerAttributes: headerAttributes,
					attributes: attributes,
				},
				{
					field: "changePercentage",
					title: i18n.t("change_%"),
					format: "{0:p}",
					width: 100,
					headerAttributes: headerAttributes,
					attributes: attributes,
				},
				{
					field: "commonSize",
					title: i18n.t("common_size"),
					format: "{0:p}",
					width: 100,
					headerAttributes: headerAttributes,
					attributes: attributes,
				}
			]
		},
		// On Reporint Language Changes
		onReportingLanguageChanges() {
			this.fieldName = "name";
			this.fieldType = "type";
			if (this.reportingLanguage === "local") {
				this.fieldName = "local_name";
				this.fieldType = "type_local_name";
			}

			// Generate Group By
			this.generateGroupBy();

			// Generate column with new language
			this.generateColumn();
		},
		// Generate Group By
		generateGroupBy() {
			this.groupDefinition = {
				field: this.fieldType,
				aggregates: this.aggregateDefinition,
				compare: function(a, b) {
					if (a.items[0].order === b.items[0].order) {
						return 0;
					} else if (a.items[0].order > b.items[0].order) {
						return 1;
					} else {
						return -1;
					}
				},
			};
		},
		findChangePercentage(num1, num2){
            let result = 0;

            if(num2 !== 0){
                result = (num1 - num2) / num2;
            }

            return result;
        },
		findCommonSizePercentage(num1, num2){
            let result = 0;

            if(num2 !== 0){
                result = num1 / num2;
            }

            return result;
        },
	},
	watch: {
		reportingLanguage() {
			this.onReportingLanguageChanges();
		},
	},
	computed: {
		appType(){
		return dataStore.productType;
		},
	},
	mounted() {
		// Generate Group By
		this.generateGroupBy();

		// Initial Grid Columns
		this.generateColumn();
	},
};
</script>

<style scoped>
.reports_list {
	width: 100%;
	background-color: #fff;
	padding: 20px 20px 5px;
}
.report_filter {
	background-color: #f8f8f9;
	padding: 0 20px 5px 20px;
	position: relative;
}
.dv_mt {
	margin-top: 24px;
}
.report_export {
	position: absolute;
	top: 15px;
}
.report_total {
	padding: 12.5px;
	text-align: right;
	text-transform: uppercase;
	font-weight: 700;
	border-top: 1px solid #333;
	border-bottom: 1px solid #333;
}
.custom_expansion
	.v-expansion-panel-header
	.v-expansion-panel-header__icon
	.v-icon {
	display: none !important;
}
.v-expansion-panel {
	border-bottom: 1px solid #cccccc;
	border-radius: 0;
}
.v-expansion-panel::before {
	box-shadow: none;
}
.v-expansion-panel-header {
	padding: 15px;
}
.v-expansion-panel-content__wrap {
	padding: 0 35px 10px;
}
@media (max-width: 576px) {
	.dv_mt,
	.dv_mt8 {
		margin-top: 0;
	}
	.reports_list {
		margin-top: 0;
	}
}
</style>
