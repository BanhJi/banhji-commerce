<template>
	<v-row>
		<v-col sm="12" cols="12" class="grayBg px-6" >
			<v-card color="white" class="pa-3 no_border "  elevation="0">
				<v-row>
					<v-col sm="9" cols="12" class="py-0">
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
							<v-col sm="2" cols="12" class="pt-7">
								<v-btn class="white--text" color="primary" @click="search">
									<i class="b-search" style="font-size: 18px; color:#fff !important;"/>
								</v-btn>
							</v-col>
						</v-row>
					</v-col>
					<v-col sm="3" cols="12" class="py-0">
						<div class="report_export">
							<app-reporting-language
								:initLanguage="reportingLanguage"
								@emitLanguage="reportingLanguage = $event"
							/>
						</div>
					</v-col>
				</v-row>
				<!-- Card -->
				<v-row class="mt-1">
					<v-col sm="6" cols="12" class="py-0">
						<v-card
							outlined
							dense
							class="pa-3  rounded-4 no_border white--text "
							color="third"
							height="60px"
						>
							<h3 class="text-left flex-1 text-uppercase font_12 py-0">
								{{ $t("asset") }}
							</h3>
							<h3 class="text-right flex-1 font_20">
								{{ Number(totalAsset).toLocaleString() }}
							</h3>
						</v-card>
					</v-col>
					<v-col sm="6" cols="12" class="py-0">
						<v-card
							outlined
							dense
							class="pa-3  rounded-4 no_border white--text "
							color="third"
							height="60px"
						>
							<h3 class="text-left flex-1  font_12 text-uppercase">
								{{ $t("liabilities_and_equity") }}
							</h3>
							<h3 class="text-right flex-1 font_20">
								{{ Number(totalLiabilityAndEquity).toLocaleString() }}
							</h3>
						</v-card>
					</v-col>
				</v-row>

				<v-row>
					<v-col sm="12" cols="12" class="pt-0">
						<kendo-datasource
							ref="balanceSheetDS"
							:data="balanceSheetList"
							:schema="schemaDefinition"
							:group="groupDefinition"
							:aggregate="aggregateDefinition"
						/>

						<kendo-grid
							id="balanceSheetGrid"
							class="custom_grid"
							:data-source-ref="'balanceSheetDS'"
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
							:columns="columns" />
					</v-col>
				</v-row>

				<LoadingMe
					:isLoading="showLoading"
					:fullPage="false"
					type="loading"
					:myLoading="true"
				/>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import { i18n } from "@/i18n";
import Helper from "@/helper.js";
import BalanceSheetAnalysisModel from "@/scripts/model/accounting/BalanceSheetAnalysis";
import { dataStore } from "@/observable/store";

const { balanceSheetHandler } = require("@/scripts/AppHandlers");

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
		balanceSheetList: [],
		totalAsset: 0,
		totalLiabilityAndEquity: 0,
		// Reporting Language
		reportingLanguage: "english",
		fieldName: "name",
		fieldType: "type",
		// LoadingMe
		showLoading: false,
		/* KENDO */
		columns: [],
		groupDefinition: [],
		aggregateDefinition: [
			{ field: "baseAmount", aggregate: "sum" },
			{ field: "compareAmount", aggregate: "sum" },
		],
		schemaDefinition: {
			model: { id: "accountUUID" },
		},
	}),
	methods: {
		// Search
		async search() {
			// Empty dataSource
			let ds = this.$refs.balanceSheetDS.kendoWidget();
			ds.data([]);

			if (this.baseMonth && this.compareMonth) {
				// Query
				this.showLoading = true;
				let baseMonthBS = await balanceSheetHandler
					.getBalanceSheet({
						params: {
							group_by: "1",
							as_of_date: kendo.toString(new Date(this.baseMonth), "yyyy-MM-dd") + "T23:59:59.999Z",
						},
					})
				let compareMonthBS = await balanceSheetHandler
					.getBalanceSheet({
						params: {
							group_by: "1",
							as_of_date: kendo.toString(new Date(this.compareMonth), "yyyy-MM-dd") + "T23:59:59.999Z",
						},
					})
					
				let g = {},
					totalAsset = 0,
					totalLiabilityAndEquity = 0;

				/* Base Month Data */
				baseMonthBS.data.forEach((value) => {
					let entry = this.applyBalanceSheetRule(value);

					// Sum Asset, Liabilities and Equtity
					if (entry.groupNature.toLowerCase() === "asset") {
						// Asset
						totalAsset += entry.balance;
					} else {
						// Liability and Equity
						totalLiabilityAndEquity += entry.balance;
					}

					entry.baseAmount = entry.balance;

					let gname = String(entry.accountUUID) + String(entry.account_type_number);
					g[gname] = entry;
				});
				
				/* Compare Month Data */
				compareMonthBS.data.forEach((value) => {
					let entry = this.applyBalanceSheetRule(value);

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
				g[k]["commonSize"] = this.findCommonSizePercentage(g[k]["baseAmount"], totalAsset);

				this.totalAsset = totalAsset;
				this.totalLiabilityAndEquity = totalLiabilityAndEquity;

				this.balanceSheetList = Object.values(g);

				// Generate columns
				this.generateColumn();

				this.showLoading = false;
			}
		},
		applyBalanceSheetRule(value){
			let entry = new BalanceSheetAnalysisModel(value);

			// Order
			if (entry.groupNature.toLowerCase() === "equity") {
				// Equity
				entry.order = entry.account_type_number * 100;
			} else {
				entry.order = entry.account_type_number;
			}

			// Liability and Equity
			// Covert Cr side to normal
			if (entry.groupNature.toLowerCase() !== "asset") {
				entry.balance = entry.balance * -1;
			}

			// Group Nature local name
			entry.group_nature_local_name = Helper.localTranslate(
				entry.groupNature
			);

			// Statement Group local name
			entry.statement_group_local_name = Helper.localTranslate(
				entry.statementGroup
			);

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

			return  name;
		},
		statementGroupHeaderTmpl(dataItem) {
			let name = dataItem.value;

			if (this.reportingLanguage === "local") {
				name = Helper.localTranslate(name);
			}

			return name;
		},
		natureGroupHeaderTmpl(dataItem) {
			let name = dataItem.value;

			if (this.reportingLanguage === "local") {
				name = Helper.localTranslate(name);
			}

			return name;
		},
		// On Reporint Language Changes
		onReportingLanguageChanges() {
			this.fieldName = "name";
			this.fieldType = "type";
			if (this.reportingLanguage === "local") {
				this.fieldName = "local_name";
				this.fieldType = "type_local_name";
			}

			// Generate column with new language
			this.generateColumn();
		},
		generateColumn() {
			this.columns = [
				{
					field: this.fieldName,
					title: i18n.t("account"),
					locked: true,
					width: 400,
					template: this.accountTmpl,
				},
				{
					field: "type",
					title: i18n.t("type"),
					hidden: true,
					width: 300,
					groupHeaderTemplate: this.typeGroupHeaderTmpl,
				},
				{
					field: "statementGroup",
					title: i18n.t("statement_group"),
					hidden: true,
					width: 300,
					groupHeaderTemplate: this.statementGroupHeaderTmpl,
				},
				{
					field: "groupNature",
					title: i18n.t("nature"),
					hidden: true,
					width: 300,
					groupHeaderTemplate: this.natureGroupHeaderTmpl,
				},
				{
					field: "baseAmount",
					title: this.baseMonth,
					format: "{0:#,##0.##;(#,##0.##)}",
					width: 150,
					aggregates: "['sum']",
					groupHeaderColumnTemplate:"<div style=text-align:right>#=kendo.toString(sum, 'n')#</div>",
					headerAttributes: {
						class: "table-header-cell",
						style: "text-align: right;padding-right: 35px; font-size: 14px",
					},
					attributes: {
						class: "table-cell",
						style: "text-align: right; font-size: 14px",
					},
				},
				{
					field: "compareAmount",
					title: this.compareMonth,
					format: "{0:#,##0.##;(#,##0.##)}",
					width: 150,
					aggregates: "['sum']",
					groupHeaderColumnTemplate:"<div style=text-align:right>#=kendo.toString(sum, 'n')#</div>",
					headerAttributes: {
						class: "table-header-cell",
						style: "text-align: right;padding-right: 35px; font-size: 14px",
					},
					attributes: {
						class: "table-cell",
						style: "text-align: right; font-size: 14px",
					},
				},
				{
					field: "changePercentage",
					title: i18n.t("change_%"),
					format: "{0:p}",
					width: 100,
					headerAttributes: {
						class: "table-header-cell",
						style: "text-align: right;padding-right: 35px; font-size: 14px",
					},
					attributes: {
						class: "table-cell",
						style: "text-align: right; font-size: 14px",
					},
				},
				{
					field: "commonSize",
					title: i18n.t("common_size"),
					format: "{0:p}",
					width: 100,
					headerAttributes: {
						class: "table-header-cell",
						style: "text-align: right;padding-right: 35px; font-size: 14px",
					},
					attributes: {
						class: "table-cell",
						style: "text-align: right; font-size: 14px",
					},
				}
			]
		},
		// Generate Group By
		generateGroupBy() {
			this.groupDefinition = [
				{
					field: "groupNature",
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
				},
				{ field: "statementGroup", aggregates: this.aggregateDefinition },
				{
					field: "type",
					aggregates: this.aggregateDefinition,
					compare: function(a, b) {
						if (
							a.items[0].account_type_number === b.items[0].account_type_number
						) {
							return 0;
						} else if (
							a.items[0].account_type_number > b.items[0].account_type_number
						) {
							return 1;
						} else {
							return -1;
						}
					},
				},
			];
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
}
.dv_mt {
	margin-top: 20px;
}
.dv_mt8 {
	margin-top: 30px;
}
.report_block .v-card.third {
	border: none;
	box-shadow: none;
	color: #fff;
	text-transform: uppercase;
}
.report_block .v-card.third p.text {
	text-align: left;
	font-size: 16px;
}
.report_block .v-card.third p.number {
	text-align: center;
	font-size: 25px;
	font-weight: 700;
	margin-bottom: 0;
}
.report_block .v-card.bg_gray {
	background-color: #f8f8f9;
	border: none;
	box-shadow: none;
	color: #000;
	float: left;
	width: 100%;
}
.report_block .v-card.bg_gray p span.text {
	width: 25%;
}
.report_block .v-card.bg_gray p span.number {
	width: 70%;
	font-size: 19px;
	font-weight: 700;
	padding: 7px 0 0 0;
	text-align: right;
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
