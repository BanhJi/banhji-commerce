<template>
	<v-row>
		<v-col sm="12" cols="12" class="grayBg px-6" >
			<v-card color="white" class="pa-3 no_border "  elevation="0">
				<v-row>
					<v-col sm="10" cols="12" class="py-0">
						<app-searchdate
							:initStartDate="startDate"
							@emitStartDate="startDate = $event"
							:initEndDate="endDate"
							@emitEndDate="endDate = $event"
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
					<v-col sm="3" cols="12" class="py-0">
						<label class="mb-1">{{ $t("segments") }}:</label>
						<app-segment-list-item-group
							:initSegment="selectedSegmentIds"
							@emitSegment="selectedSegmentIds = $event"
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
					<v-col sm="2" cols="12" class="pt-7">
						<v-btn class="white--text" color="primary" @click="search">
								<i class="b-search" style="font-size: 18px; color:#fff !important;"/>
						</v-btn>
					</v-col>
				</v-row>
				
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
							:isLoading="showLoading"
							:fullPage="false"
							:myLoading="true"
						/>
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
import { dataStore } from "@/observable/store";

/* TreeList */
import { TreeList } from '@progress/kendo-treelist-vue-wrapper';
import { TreeListDataSource } from '@progress/kendo-datasource-vue-wrapper';

import AccountModel from "@/scripts/model/Account.js";
import StatementOfFinancialPositionModel from "@/scripts/model/StatementOfFinancialPosition";

const balanceSheetHandler = require("@/scripts/handler/accounting/balanceSheetHandler");
const incomeStatementHandler = require("@/scripts/handler/accounting/incomeStatementHandler");
const AccountTypeCode = require("@/scripts/default_setup/AccountTypeCode");

export default {
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-searchdate": () => import("@/components/custom_templates/SearchDate"),
		"app-reporting-language": () =>
			import("@/components/kendo_templates/ReportingLanguageDropDownList"),
		"level-coa-dropdownlist": () =>
			import("@/components/dropdownlist/LevelCoa"),
		'treelist': TreeList,
		'treelistdatasource': TreeListDataSource,
		"app-segment-list-item-group": () =>
			import("@/components/dropdownlist/SegmentListItemGroup"),
	},
	data: () => ({
		startDate: "",
		endDate: "",
		selectedSegmentIds: [],
		statementList: [],
		levelCoa: "",// Default primary
		columnBy: "1", //Default Total
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

			if(this.selectedSegmentIds.length === 0){
				isValid = false;
				this.$snotify.warning(i18n.t("please_select_segments"));
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

				/* Previouse Fiscal Date */
				let isPrevFiscalDate = true;
				let prevFiscalDate = Helper.getFiscalDateByDate(sdate, isPrevFiscalDate);

				// Balance Sheet
				let bsResponse = await balanceSheetHandler.getBySegments(
						kendo.toString(new Date(edate), "yyyy-MM-dd") + "T23:59:59.999Z",
						this.selectedSegmentIds,
						this.levelCoa
					);
		
				/* Balance Sheet - beginning Balance */
				let beginBSResponse = await balanceSheetHandler.getBySegments(
						kendo.toString(new Date(prevFiscalDate.end_date), "yyyy-MM-dd") + "T23:59:59.999Z",
						this.selectedSegmentIds,
						this.levelCoa
					);

				/* Income Statement - Surplus/Defictit */
				let plResponse = await incomeStatementHandler.getBySegments(
						kendo.toString(new Date(sdate), 'yyyy-MM-dd') + 'T00:00:00.000Z',
						kendo.toString(new Date(edate), 'yyyy-MM-dd') + 'T23:59:59.999Z',
						this.selectedSegmentIds,
						this.levelCoa
					);

				let g = {}, childIds = [], typeCodeIds = [1,2,3,4,5,6];
				
				// Load Account List
				let accounts = await this.$store.dispatch('accounting/getAccounts');
				
				/* Beginning Balance */
				if(beginBSResponse){
					g["beginningBalance"] = this.getNewModel({
						uuid : "",
						number : "",
						name : i18n.t("beginning_balance"),
						local_name : i18n.t("beginning_balance"),
						order : 0.1,
					});
					for (let i = 0; i < this.selectedSegmentIds.length; i++) {
						beginBSResponse[i].forEach(value => {
							/* Filter Cash Accounts Only */
							if(~AccountTypeCode.CASH_ACCOUNTS.indexOf(value.account_type_number)){
								g["beginningBalance"].balance += value.balance;
								g["beginningBalance"]["s"+i] += value.balance;
							}
						});
					}
				}

				/* Surplus/Deficit */
				if(plResponse){
					g["surplusDeficit"] = this.getNewModel({
						uuid : "",
						number : "",
						name : i18n.t("surplus_deficit"),
						local_name : i18n.t("surplus_deficit"),
						order : 0.2,
					});
					for (let i = 0; i < this.selectedSegmentIds.length; i++) {
						plResponse[i].forEach(value => {
							/* Filter Profit for the period only */
							if(value.account_type_number === AccountTypeCode.PROFIT_FOR_THE_PERIOD){
								g["surplusDeficit"].balance += value.balance;
								g["surplusDeficit"]["s"+i] += value.balance;
							}
						});
					}
				}

				/* Closing Balance */
				g["closingBalance"] = this.getNewModel({
					uuid : "",
					number : "",
					name : i18n.t("closing_balance"),
					local_name : i18n.t("closing_balance"),
					order : 0.3,
				});
				for (let key in g){
					/* Filter Non Closing Balance */
					if(key !== "closingBalance"){
						g["closingBalance"].balance += g[key].balance;

						for (let i = 0; i < this.selectedSegmentIds.length; i++) {
							g["closingBalance"]["s"+i] += g[key].balance;
						}
					}
				}
				/* End Closing Balance */
				
				/* Balance Sheet */
				for (let i = 0; i < this.selectedSegmentIds.length; i++) {
					bsResponse[i].forEach(value => {
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
									g[account.type_code] = this.getNewModel({
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

										g[accountParent.number] = this.getNewModel({
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
									g[account.uuid] = this.getNewModel({
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
										g[account.number] = this.getNewModel({
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
								g[account.uuid].balance += value.balance;

								for (let j = 0; j < this.selectedSegmentIds.length; j++) {
									g[account.uuid]["s"+i] += value.balance;
								}
							}
						}
					});
				}
				
				/* Parse Object Array */
				let entries = Object.values(g);
				
				/* Parent aggregate sum */
				/* Remove Duplicate */
                childIds = [...new Set(childIds)];
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
									for (let j = 0; j < this.selectedSegmentIds.length; j++) {
										parent["s"+j] += entry["s"+j];
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
				let totalEntry = this.getNewModel({
					uuid : "",
					number : "",
					name : i18n.t("total"),
					local_name : i18n.t("total"),
					order : 9999999999,
				});
				entries.forEach(value => {
					if(~childIds.indexOf(value.uuid)){
						totalEntry.balance += value.balance;

						for (let i = 0; i < this.selectedSegmentIds.length; i++) {
							totalEntry["s"+i] += value["s"+i];
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
		/* Generate new model with dynamic segments */
		getNewModel(data){
			let model = new StatementOfFinancialPositionModel(data);

			/* Define segments */
			for (let i = 0; i < this.selectedSegmentIds.length; i++) {
				model["s"+i] = 0;
			}

			return model;
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

			/* Default Columns */
			let columns = [
				{
					field: this.fieldName,
					title: i18n.t("account"),
					template: this.nameTmpl,
					locked: true,
					width: 300,
					headerAttributes: headerAttributes,
				},
			];

			/* Set Column Segments */
			for (let i = 0; i < this.selectedSegmentIds.length; i++) {
				/* Segment */
				let segment = this.$store.state.segments.list.find((item) => item.id === this.selectedSegmentIds[i]);
				
				/* Column Segment */
				columns.push({
					field: "s" + i,
					title: segment.name,
					format: "{0:#,##0.##;(#,##0.##)}",
					width: 200,
					headerAttributes: headerAttributes,
					attributes: attributes,
				});
			}
			
			/* Set All Columns */
			this.columns = columns;
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
		appType() {
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
