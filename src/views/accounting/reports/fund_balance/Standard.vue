<template>
	<v-row>
		<v-col sm="12" cols="12" class="grayBg px-6" >
			<v-card color="white" class="pa-3 no_border "  elevation="0">
				<v-row>
					<v-col sm="10" cols="12" class="py-0" v-if="columnBy === '1'">
						<app-searchdate
							:initStartDate="startDate"
							@emitStartDate="startDate = $event"
							:initEndDate="endDate"
							@emitEndDate="endDate = $event"
						/>
					</v-col>
					<v-col sm="6" cols="12" class="py-0" v-else>
						<app-fiscal-date-dropdownlist
							:initFiscalDate="fiscalDate"
							@emitFiscalDate="fiscalDate = $event"
						/>
					</v-col>
					<v-col sm="2" cols="12" class="pt-0">
						<app-reporting-language
							:initLanguage="reportingLanguage"
							@emitLanguage="reportingLanguage = $event"
							@onChanged="onReportingLanguageChanges"
						/>
					</v-col>
				</v-row>
				<v-row class="mt-0">
					<v-col sm="3" cols="12" class="pt-0">
						<label class="mb-1">{{ $t("column_by") }}:</label>
						<column-by-dropdownlist
							:initColumnBy="columnBy"
							@emitColumnBy="columnBy = $event"
						/>
					</v-col>
					<v-col sm="3" cols="12" class="py-0">
						<label class="label">{{
							$t("level_chart_of_account")
						}}</label>
						<level-coa-dropdownlist
							:initLevelCoa="levelCoa"
							@emitLevelCoa="levelCoa = $event"
						/>
					</v-col>
					<v-col sm="2" cols="12" class="pt-6">
						<v-btn class="white--text" color="primary" @click="search">
								<i class="b-search" style="font-size: 18px; color:#fff !important;"/>
						</v-btn>
					</v-col>
				</v-row>

				<!-- Table -->
				<v-row>
					<v-col sm="12" cols="12" class="pt-0">
						<treelistdatasource 
							ref="statementDS"
							:data="statementList"
							:sort="sortDefinition"
							:schema-model="model" />

						<treelist 
							ref="statementTreeList"
							data-source-ref="statementDS"
							:resizable="true"
							:columns="columns"
							:dataBound="onDataBound" />

						<LoadingMe
							type="loading"
							:isLoading="showLoading"
							:myLoading="true"
							:fullPage="false" />
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import { i18n } from "@/i18n";
import Helper from "@/helper.js";

/* TreeList */
import { TreeList } from '@progress/kendo-treelist-vue-wrapper';
import { TreeListDataSource } from '@progress/kendo-datasource-vue-wrapper';

import AccountModel from "@/scripts/model/Account.js";
import StatementOfFinancialPositionModel from "@/scripts/model/StatementOfFinancialPosition";

import { dataStore } from "@/observable/store";
const balanceSheetHandler = require("@/scripts/handler/accounting/balanceSheetHandler");
const incomeStatementHandler = require("@/scripts/handler/accounting/incomeStatementHandler");
const NumberInWord = require("@/scripts/default_setup/NumberInWord");
const AccountTypeCode = require("@/scripts/default_setup/AccountTypeCode");

export default {
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"column-by-dropdownlist": () =>
			import("@/components/dropdownlist/ColumnBy"),
		"app-searchdate": () => import("@/components/custom_templates/SearchDate"),
		"app-reporting-language": () =>
			import("@/components/kendo_templates/ReportingLanguageDropDownList"),
		"app-fiscal-date-dropdownlist": () =>
			import("@/components/kendo_templates/FiscalDateDropDownList"),
		"level-coa-dropdownlist": () =>
			import("@/components/dropdownlist/LevelCoa"),
		'treelist': TreeList,
		'treelistdatasource': TreeListDataSource,
	},
	data: () => ({
		startDate: "",
		endDate: "",
		statementList: [],
		levelCoa: "",// Default primary
		columnBy: "1", //Default Total
		/* Fiscal Date */
		fiscalDate: null,
		fiscalMonths: [],
		// Reporting Language
		reportingLanguage: "english",
		fieldName: "name",
		fieldType: "type",
		// LoadingMe
		showLoading: false,
		/* KENDO */
		columns: [],
		sortDefinition : [
			{ field: "order", dir: "asc" },
			{ field: "number", dir: "asc" },
		],
		model: {
			id: "uuid",
			expanded: true
		},
	}),
	methods: {
		/* Validating */
		validating(){
			let isValid = true;
			
			if(this.columnBy !== "1"){
				if(this.fiscalDate === null){
					isValid = false;
					this.$snotify.warning(i18n.t("please_select_fiscal_year"));
				}
			}

			return isValid;
		},
		// Search
		async search() {
			if(this.validating()){
				this.showLoading = true;

				// Empty dataSource
				let ds = this.$refs.statementDS.kendoWidget();
				ds.data([]);
				
				let sdate = this.startDate,
					edate = this.endDate;

				// Generate Fiscal Months
				if (this.columnBy !== "1") {
					sdate = this.fiscalDate.start_date;
					edate = this.fiscalDate.end_date;

					this.fiscalMonths = Helper.generateFiscalMonths(
						sdate,
						edate,
						this.columnBy
					);
				}

				/* Previouse Fiscal Date */
				let isPrevFiscalDate = true;
				let prevFiscalDate = Helper.getFiscalDateByDate(sdate, isPrevFiscalDate);

				// Balance Sheet
				let bsResponse = await balanceSheetHandler.getBalanceSheet({
						params: {
							group_by: this.columnBy,
							as_of_date: kendo.toString(new Date(edate), "yyyy-MM-dd") + "T23:59:59.999Z"
						},
					}, this.levelCoa);
		
				/* Balance Sheet - beginning Balance */
				let beginBSResponse = await balanceSheetHandler.getBalanceSheet({
						params: {
							group_by: "1",
							as_of_date: kendo.toString(new Date(prevFiscalDate.end_date), "yyyy-MM-dd") + "T23:59:59.999Z"
						},
					}, this.levelCoa);

				/* Income Statement - Surplus/Defictit */
				let plResponse = await incomeStatementHandler.getIncomeStatement({
						params: {
							start_date: kendo.toString(new Date(sdate), 'yyyy-MM-dd') + 'T00:00:00.000Z',
							end_date: kendo.toString(new Date(edate), 'yyyy-MM-dd') + 'T23:59:59.999Z',
							group_by: this.columnBy,
						},
					}, this.levelCoa);

				let g = {}, childIds = [], typeCodeIds = [1,2,3,4,5,6];
				
				// Load Account List
				let accounts = await this.$store.dispatch('accounting/getAccounts');
				
				/* beginning Balance */
				if(beginBSResponse){
					g["beginningBalance"] = new StatementOfFinancialPositionModel({
						uuid : "",
						number : "",
						name : i18n.t("beginning_balance"),
						local_name : i18n.t("beginning_balance"),
						order : 0.1,
					});

					beginBSResponse.data.forEach(value => {
						/* Filter Cash Accounts Only */
						if(~AccountTypeCode.CASH_ACCOUNTS.indexOf(value.account_type_number)){
							g["beginningBalance"].balance += value.balance;

							for (let i = 0; i < 12; i++) {
								const property = NumberInWord[i];
								g["beginningBalance"][property] += value.balance;
							}
						}
					});
				}

				/* Surplus/Deficit */
				if(plResponse){
					g["surplusDeficit"] = new StatementOfFinancialPositionModel({
						uuid : "",
						number : "",
						name : i18n.t("surplus_deficit"),
						local_name : i18n.t("surplus_deficit"),
						order : 0.2,
					});

					plResponse.data.forEach(value => {
						/* Filter Profit for the period only */
						if(value.account_type_number === AccountTypeCode.PROFIT_FOR_THE_PERIOD){
							g["surplusDeficit"].balance = value.balance;

							for (let i = 0; i < 12; i++) {
								const property = NumberInWord[i];
								g["surplusDeficit"][property] += value[property];
							}
						}
					});
				}

				/* Closing Balance */
				g["closingBalance"] = new StatementOfFinancialPositionModel({
					uuid : "",
					number : "",
					name : i18n.t("closing_balance"),
					local_name : i18n.t("closing_balance"),
					order : 0.3,
				});

				for (let key in g){
					/* Filter Non Closing Balance */
					if(key !== "closingBalance"){
						g["closingBalance"].balance = g[key].balance;

						for (let i = 0; i < 12; i++) {
							const property = NumberInWord[i];
							g["closingBalance"][property] += g[key][property];
						}
					}
				}
				/* End Closing Balance */
				
				/* Balance Sheet */
				bsResponse.data.forEach(value => {
					/* Filter account type from 1 to 6 */
					if(~typeCodeIds.indexOf(value.account_type_number)){
						/* Get Account */
						let account = accounts.find((item) => item.uuid === value.accountUUID);
						if(account){
							/* Child Id */
							childIds.push(value.accountUUID);

							/* Order */
							let order = account.type_code;

							/* GROUPING TOP LEVEL */
							/* Account Type */
							if(!g[account.type_code]){
								g[account.type_code] = new StatementOfFinancialPositionModel({
									uuid : account.type_code,
									number : account.type_code,
									name : account.account_type.name,
									local_name : account.account_type.local_name,
									order : order,
								});
							}
							
							/* Parent Account */
							let currentParentAccount = new AccountModel(account.parent_account);
							while (currentParentAccount.number !== "") {
								/* Get account by parent number */
								let accountParent = accounts.find((item) => item.number === currentParentAccount.number);
								
								/* Set New Parent Account */
								currentParentAccount = new AccountModel(accountParent.parent_account);

								if(!g[accountParent.number]){
									/* First Parent Account Under Top Level */
									let parentId = accountParent.type_code;

									/* Sub Of Parent Account */
									if(currentParentAccount.number !== ""){
										let parentAccount = accounts.find((item) => item.number === currentParentAccount.number);
										parentId = parentAccount.number;
									}

									g[accountParent.number] = new StatementOfFinancialPositionModel({
										uuid : accountParent.number,
										number : accountParent.number,
										name : accountParent.name,
										local_name : accountParent.local_name,
										parentId : parentId,
										order : order,
									});
								}
							}

							/* Single Account Level */
							if(!g[account.uuid]){
								g[account.uuid] = new StatementOfFinancialPositionModel({
									uuid : value.accountUUID,
									number : account.number,
									name : account.name,
									local_name : account.local_name,
									order : order,
								});
							}

							/* Set Parent Id for a single account */
							if(account.parent_account.number){
								g[account.uuid].parentId = account.parent_account.number;
							}else{ /* Non Parent */
								if(!g[account.number]){ /* Parent as child */
									g[account.number] = new StatementOfFinancialPositionModel({
										uuid : account.number,
										number : account.number,
										name : account.name,
										local_name : account.local_name,
										parentId : account.type_code,
										order : order,
									});
								}
								g[account.uuid].parentId = account.number;
							}

							/* Balance */
							g[account.uuid].balance = value.balance;

							for (let i = 0; i < 12; i++) {
								const property = NumberInWord[i];
								g[account.uuid][property] = value[property];
							}
						}
					}
				});
				
				/* Parse Object Array */
				let entries = Object.values(g);
				
				/* Parent aggregate sum */
				for (let i = 0; i < entries.length; i++) {
					let entry = entries[i];
					
					if(~childIds.indexOf(entry.uuid)){
						let parentId = entry.parentId;
						while(parentId !== null){
							if(parentId){
								let parent = entries.find((item) => item.uuid === parentId);
								if(parent){
									parent.balance += entry.balance;

									/* Define Segments */
									for (let j = 0; j < 12; j++) {
										const property = NumberInWord[j];
										parent[property] += entry[property];
									}

									/* Set new parent id */
									parentId = parent.parentId;
								}else{
									/* Set loop to end */
									parentId = null;
								}
							}else{
								/* Set loop to end */
								parentId = null;
							}
						}
					}
				}

				/* Total */
				let totalEntry = new StatementOfFinancialPositionModel({
					uuid : "",
					number : "",
					name : i18n.t("total"),
					local_name : i18n.t("total"),
					order : 9999999999,
				});
				entries.forEach(value => {
					if(~childIds.indexOf(value.uuid)){
						totalEntry.balance += value.balance;

						for (let i = 0; i < 12; i++) {
							const property = NumberInWord[i];
							totalEntry[property] += value[property];
						}
					}
				});
				entries.push(totalEntry);
				
				/* BIND STATMENT */
				this.statementList = entries;
				
				this.generateColumn();

				this.showLoading = false;
			}
		},
		// Row Template
		nameTmpl(dataItem){
			/* Name in language */
			let name = dataItem.name;
			if(this.reportingLanguage === "local"){
				name = dataItem.local_name;
			}

			/* Define result */
			let result = `<span>${dataItem.number} - ${name}</span>`;

			/* Top Level */
			if(dataItem.parentId === null){
				result = `<span style='font-weight: bolder;'>${name}</span>`;
			}

			/* Parent Level */
			if(dataItem.hasChildren && dataItem.number.length > 3){
				result = `<span style='font-weight: bolder;'>${dataItem.number} - ${name}</span>`;
			}

			return result;
		},
		/* On databound */
		onDataBound (e) {
			var headers = e.sender.thead.children();
			for (var i = 0; i < headers.length; i++) {
				var th = kendo.jQuery(headers[i]);
				th.css("font-weight", "bold");
				th.css("text-align", "center");
			}

			var rows = e.sender.tbody.children();
			for (var j = 0; j < rows.length; j++) {
				var row = kendo.jQuery(rows[j]);
				var dataItem = e.sender.dataItem(row);
				
				/* Amount align right */
				row.css("text-align", "right");
				
				/* Parent in bold */
				if(dataItem.get("hasChildren") || dataItem.get("parentId") === null){
					row.css("font-weight", "bold");
				}
			}
		},
		generateColumn() {
			let headerAttributes = {
				class: "table-header-cell",
				style: "text-align: center;padding-right: 35px; font-size: 14px",
			},
			attributes = {
				class: "table-cell",
				style: "text-align: right; font-size: 14px",
			};

			let defaultColumns = [
				{
					field: this.fieldName,
					title: i18n.t("account"),
					template: this.nameTmpl,
					locked: true,
					width: 300,
					headerAttributes: headerAttributes,
				},
			];

			switch (this.columnBy) {
				case "12": // MONTH
					for (let i = 0; i < 12; i++) {
						defaultColumns.push({
							field: NumberInWord[i],
							title: this.fiscalMonths[i],
							format: "{0:#,##0.##;(#,##0.##)}",
							width: 200,
							headerAttributes: headerAttributes,
							attributes: attributes,
						});
					}

					break;

				case "4": // QUARTER
					for (let i = 0; i < 4; i++) {
						defaultColumns.push({
							field: NumberInWord[i],
							title: this.fiscalMonths[i],
							format: "{0:#,##0.##;(#,##0.##)}",
							width: 200,
							headerAttributes: headerAttributes,
							attributes: attributes,
						});
					}

					break;

				case "2": // SEMI-ANNUAL
					// Expand Column [0] width
					defaultColumns[0].width = 400;

					for (let i = 0; i < 2; i++) {
						defaultColumns.push({
							field: NumberInWord[i],
							title: this.fiscalMonths[i],
							format: "{0:#,##0.##;(#,##0.##)}",
							width: 300,
							headerAttributes: headerAttributes,
							attributes: attributes,
						});
					}

					break;

				default:
					// TOTAL
					// Expand Column [0] width
					defaultColumns[0].width = 600;

					defaultColumns.push({
						field: "balance",
						title: i18n.t("total"),
						format: "{0:#,##0.##;(#,##0.##)}",
						width: 250,
						headerAttributes: headerAttributes,
						attributes: attributes,
					});

					break;
			}
			
			/* Set All Columns */
			this.columns = defaultColumns;
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
	},
	computed: {
		appType(){
			return dataStore.productType;
		},
	},
	mounted() {
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
