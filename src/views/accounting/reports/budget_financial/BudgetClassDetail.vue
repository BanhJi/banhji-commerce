<template>
	<v-row>
		<v-col sm="12" cols="12" :class=" appType != 'npo' &&  appType != 'Public Sectors' ? 'grayBg px-6' : '' " >
			<v-card color="white" :class=" appType != 'npo' &&  appType != 'Public Sectors' ? 'pa-3 no_border' : '' "  elevation="0">
				<!-- Search -->
				<v-row class="mt-0">
					<v-col sm="4" cols="12" class="py-0 pt-6">
						<app-fiscal-date-dropdownlist
							:initFiscalDate="fiscalDate"
							@emitFiscalDate="fiscalDate = $event"
							@onChanged="onFiscalDateChanges"
						/>
					</v-col>
					<v-col sm="4" cols="12" class="py-0 pt-6">
						<app-segment-dropdownlist
							:initSegment="segment"
							@emitSegment="segment = $event"
						/>
					</v-col>
					<v-col sm="4" cols="12" class="py-0 pt-6">
						<app-project-dropdownlist
							:initProject="project"
							@emitProject="project = $event"
						/>
					</v-col>
				</v-row>
				<v-row class="mt-0">
					<v-col sm="4" cols="12" class="py-0 pt-3">
						<app-month-of-picker
							:initMonthOf="monthOf"
							@emitMonthOf="monthOf = $event"
							@onChanged="onMonthOfChanges"
							:initMin="minMonth"
							:initMax="maxMonth"
						/>
					</v-col>
					<v-col sm="4" cols="12" class="py-0 pt-4">
						<class-dropdowntree
							:initSelectedItems="selectedItem"
							@emitSelectedItems="selectedItem = $event"
							:initEnable="statementList.length > 0"
							@onChanged="bindData" />
					</v-col>
					<v-col sm="4" cols="12" class="py-0">
						<v-btn
							color="primary"
							class="text-capitalize mt-4 white--text"
							@click="search"
						>
							<i class="b-search" style="font-size: 18px; color:#fff !important;"/>
						</v-btn>
					</v-col>
				</v-row>

				<!-- Tree List -->
				<v-row>
					<v-col sm="12" cols="12" class="pt-1">
						<template>
							<treelistdatasource 
								ref="statementDS"
								:data="statementList"
								:schema-model="model"
								:sort="sort">
							</treelistdatasource>

							<treelist 
								ref="statementGrid"
								data-source-ref="statementDS"
								:resizable="true"
								:columns="columns"
								:dataBound="onDataBound" />

							<LoadingMe
								type="loading"
								:isLoading="showLoading"
								:myLoading="true"
								:fullPage="false"
							/>
						</template>
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
/* Models */
import SegmentModel from "@/scripts/model/Segment.js";
import ProjectModel from "@/scripts/model/Project.js";
import AccountModel from "@/scripts/model/Account.js";
import ClassModel from "@/scripts/model/Clazz.js";
import ActualClassBudgetDetail from "@/scripts/model/ActualClassBudgetDetail.js";
import { dataStore } from "@/observable/store";

import { TreeList } from '@progress/kendo-treelist-vue-wrapper';
import { TreeListDataSource } from '@progress/kendo-datasource-vue-wrapper';

const BudgetHandler = require("@/scripts/handler/workingcapital/budgetHandler");

export default {
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-fiscal-date-dropdownlist": () =>
			import("@/components/kendo_templates/FiscalDateDropDownList"),
		"app-month-of-picker": () =>
			import("@/components/kendo_templates/MonthOfPicker"),
		"app-segment-dropdownlist": () =>
			import("@/components/dropdownlist/Segment"),
		"app-project-dropdownlist": () =>
			import("@/components/dropdownlist/Project"),
		"class-dropdowntree": () =>
			import("@/components/dropdownlist/Clazz"),
		'treelist': TreeList,
		'treelistdatasource': TreeListDataSource,
	},
	data: () => ({
		monthOf: "",
		segment: new SegmentModel(),
		project: new ProjectModel(),
		statements: [],
		statementList: [],
		fiscalDate: null,
		fiscalMonths: [],
		minMonth: "",
		maxMonth: "",
		selectedItem: "",
		Helper: Helper,
		columns: [],
		model: {
			id: "uuid",
			parentId: "parentId",
			expanded: true
		},
		sort: { field: "code", dir: "asc" },
		// LoadingMe
		showLoading: false,
        budgetLoading: false,
	}),
	methods: {
		onFiscalDateChanges() {
			this.monthOf = "";
			this.fiscalMonths = [];

			if (this.fiscalDate !== null) {
				/* Set Month Range */
				this.minMonth = this.fiscalDate.start_date;
				this.maxMonth = this.fiscalDate.end_date;

				/* Generate Months */
				this.fiscalMonths = Helper.generateFiscalMonths(
					this.fiscalDate.start_date,
					this.fiscalDate.end_date,
					"12"
				);
			}
		},
		onMonthOfChanges() {
			if (this.statements.length > 0) {
				/* Bind Data */
				this.bindData();
			}
		},
		/* Search */
		search() {
			if (this.monthOf !== "") {
				let asOfDate = kendo.toString(new Date(this.monthOf), "yyyy-MM-dd") + "T23:59:59.999Z";

				// Empty statementDS
				let ds = this.$refs.statementDS.kendoWidget();
				ds.data([]);

				// Query Income Statement
				this.showLoading = true;
				BudgetHandler.getActualClassBudgetDetail({
						params: {
							as_of_date: asOfDate
						},
					})
					.then((res) => {
						if (res) {
							this.statements = res.data;
							this.bindData();
						}else {
							this.showLoading = false;
							this.$snotify.error(i18n.t("error_something_wrong"));
						}
					})
					.finally(() => {
						// this.showLoading = false;
					});
			} else {
				/* Alert Warning */
				this.$snotify.warning(i18n.t("please_select_month_of"));
			}
		},
		async bindData() {
			let entries = [], g = {}, childrenIds = [];
			
			/* Find index of selected month */
			let	budgetMonthFormated = kendo.toString(new Date(this.monthOf), "yyyy-MM");

			// Call List
			let accounts = await this.$store.dispatch("accounting/getSecondaryAccounts"),
				classes = await this.$store.dispatch("classes/getList");

			/* Filter */
			let filtedEntries = [];
			if(this.selectedItem === ""){
				filtedEntries = this.statements;
			}else{
				this.statements.forEach((value) => {
					/* Filter param */
					let isMathedFilter = false;
					
					/* Set Class Information(using parentId as class.id) */
					let clazz = new ClassModel(
						classes.find((i) => i.id === value.parentId)
					);
					/* Nature */
					if(clazz.clazz.id !== ""){
						if(clazz.clazz.id === this.selectedItem) isMathedFilter = true;
					}
					/* Type */
					if(clazz.classType.id !== ""){
						if(clazz.classType.id === this.selectedItem) isMathedFilter = true;
					}
					/* Group */
					if(clazz.classGroup.id !== ""){
						if(clazz.classGroup.id === this.selectedItem) isMathedFilter = true;
					}
					/* Sub Group */
					if(clazz.classSubGroup.id !== ""){
						if(clazz.classSubGroup.id === this.selectedItem) isMathedFilter = true;
					}
					
					/* Add entry */
					if(isMathedFilter) filtedEntries.push(value);
				});
			}
			/* DETAIL */
			filtedEntries.forEach((value) => {
				let entry = new ActualClassBudgetDetail();

				/* Children Ids */
				childrenIds.push(value.account_uuid);

				let account = new AccountModel(
					accounts.find((i) => i.uuid === value.account_uuid)
				);
				entry.uuid = value.account_uuid;
				entry.code = account.number;
				entry.name = account.name;
				entry.parentId = value.parentId;

				/* Set Parent Id */
				let parentId = null;
				/* Set Class Information(using parentId as class.id) */
				let clazz = new ClassModel(
					classes.find((i) => i.id === value.parentId)
				);
				/* Nature */
				if(clazz.clazz.id !== ""){
					parentId = clazz.clazz.id;

					/* Parent */
					let parentLine = new ActualClassBudgetDetail();
					parentLine.uuid = clazz.clazz.id;
					parentLine.code = clazz.clazz.name;
					parentLine.name = "";
					parentLine.parentId = null;
					g[clazz.clazz.id] = parentLine;
				}
				/* Type */
				if(clazz.classType.id !== ""){
					parentId = clazz.classType.id;

					/* Parent */
					let parentLine = new ActualClassBudgetDetail();
					parentLine.uuid = clazz.classType.id;
					parentLine.code = clazz.classType.name;
					parentLine.name = "";
					parentLine.parentId = clazz.clazz.id;
					g[clazz.classType.id] = parentLine;
				}
				/* Group */
				if(clazz.classGroup.id !== ""){
					parentId = clazz.classGroup.id;

					/* Parent */
					let parentLine = new ActualClassBudgetDetail();
					parentLine.uuid = clazz.classGroup.id;
					parentLine.code = clazz.classGroup.name;
					parentLine.name = "";
					parentLine.parentId = clazz.classType.id;
					g[clazz.classGroup.id] = parentLine;
				}
				/* Sub Group */
				if(clazz.classSubGroup.id !== ""){
					parentId = clazz.classSubGroup.id;

					/* Parent */
					let parentLine = new ActualClassBudgetDetail();
					parentLine.uuid = clazz.classSubGroup.id;
					parentLine.code = clazz.classSubGroup.name;
					parentLine.name = "";
					parentLine.parentId = clazz.classGroup.id;
					g[clazz.classSubGroup.id] = parentLine;
				}
				/* Class Item */
				if(clazz){
					let parentLine = new ActualClassBudgetDetail();
					parentLine.uuid = clazz.id;
					parentLine.code = clazz.name;
					parentLine.name = "";
					parentLine.parentId = parentId;
					g[clazz.id] = parentLine;
				}

				/* Monthly Amount */
				value.actual_monthly_amount.forEach((mline) => {
					/* Budget Month */
					if (mline.month_of === budgetMonthFormated) {
						entry.actual_month = kendo.parseFloat(mline.amount);
					}

					/* Budget YTD */
					if (kendo.toString(new Date(mline.month_of), "yyyy-MM-dd") 
						<= kendo.toString(new Date(this.monthOf), "yyyy-MM-dd")) {
						entry.actual_ytd += kendo.parseFloat(mline.amount);
					}
				});
				
				/* Add entry */
				entries.push(entry);
			});

			/* Add Parents */
			for (let key in g)
			entries.push(g[key]);

			/* Parent aggregate sum */
			for (let i = 0; i < entries.length; i++) {
				let entry = entries[i];
				
				if(~childrenIds.indexOf(entry.uuid)){
					let parentId = entry.parentId;
					while(parentId !== null){
						let parent = entries.find((item) => item.uuid === parentId);

						/* Actual */
						parent.actual_month += entry.actual_month;
						parent.actual_ytd += entry.actual_ytd;

						/* Set next parentId */
						parentId = parent.parentId;
					}
				}
			}

			/* BIND STATMENT */
			this.statementList = entries;

			/* Total */
			let totalRow = new ActualClassBudgetDetail({
				code: "Total",
			});
			for (let i = 0; i < entries.length; i++) {
				let entry = entries[i];
				if(~childrenIds.indexOf(entry.uuid)){
				// if(entry.is_class === 0){
					totalRow.actual_month += entry.actual_month;
					totalRow.actual_ytd += entry.actual_ytd;
				}
			}
			/* Add total row */
			this.statementList.push(totalRow);

			/* Generate Columns */
			this.generateColumn();

			this.showLoading = false;
		},
		// Generate Columns
		generateColumn() {
			let headerAttributes = {
					"class": "table-header-cell",
					style: "text-align: center;font-weight: bold; font-size: 16px",
				},
				subHeaderAttributes = {
					"class": "table-header-cell",
					style: "text-align: right; font-size: 14px",
				},
				attributes = {
					"class": "table-cell",
					style: "text-align: right; font-size: 14px",
				};

			let monthOf = new Date(this.monthOf),
				lastDayOfMonth = kendo.toString(new Date(monthOf.getFullYear(), monthOf.getMonth() + 1, 0), 'dd-MM-yyyy');

			/* Header template */
			let monthHeaderTmpl = `<div>${kendo.toString(monthOf, 'dd-MM-yyyy')} - ${lastDayOfMonth}</div>`,
				ytdHeaderTmpl = `<div>${kendo.toString(new Date(this.fiscalDate.start_date), 'dd-MM-yyyy')} - ${lastDayOfMonth}</div>`;

			/* Columns */
			let columns = [
				{
					field: "code",
					title: i18n.t("account_id"),
					template: this.nameTmpl,
					headerAttributes: headerAttributes,
					locked: true,
					width: 300,
				},
				{
					field: "name",
					title: i18n.t("description"),
					headerAttributes: headerAttributes,
					attributes : {
						"class": "table-cell",
						style: "text-align: left; font-size: 14px",
					},
					width: 300,
				},
				{
					field: "actual_month",
					headerTemplate: `<div>${i18n.t("current_period")}</div>` + monthHeaderTmpl,
					format: "{0:n}",
					width: 200,
					headerAttributes: subHeaderAttributes,
					attributes: attributes,
				},
				{
					field: "actual_ytd",
					headerTemplate: `<div>${i18n.t("year_to_date")}</div>` + ytdHeaderTmpl,
					format: "{0:n}",
					width: 200,
					headerAttributes: subHeaderAttributes,
					attributes: attributes,
				},
			];

			/* Set Columns */
			this.columns = columns;
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
				if(dataItem.get("hasChildren")){
					row.css("font-weight", "bold");
				}

				/* Last Row */
				if(j === rows.length -1){
					row.css("font-weight", "bold");
				}
			}
		},
		nameTmpl(dataItem){
			let name = dataItem.code;
			
			/* Code */
			if(dataItem.hasChildren || dataItem.code === "Total"){
				name = `<span style='font-weight: bolder;'>${dataItem.code}</span>`;
			}

			return name;
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
.theme--light.v-data-table {
	background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
	height: 32px !important;
	border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
	border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}
.v-data-table.simple1_table.theme--light,
.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
	border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}
.v-data-table.simple_table.theme--light {
	border-left: thin solid rgba(0, 0, 0, 0.12) !important;
	border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table.simple1_table
	> .v-data-table__wrapper
	> table
	> thead
	> tr:last-child
	> th:last-child {
	border-right: none !important;
}

.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
	background-color: transparent !important;
}

.border-bottom {
	border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.font-small {
	font-size: 12px;
	line-height: 15px;
}

.font-26 {
	font-size: 26px !important;
}
.v-data-table.simple_table.theme--light {
	border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> thead
	> tr:last-child
	> th {
	border-bottom: none !important;
	border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
	border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
	border-right: thin solid rgba(0, 0, 0, 0.12) !important;
}
.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:not(:last-child)
	> td:last-child,
.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:not(:last-child)
	> th:last-child,
.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr
	> td:last-child {
	border-right: none !important;
}

.v-data-table.table_list > .v-data-table__wrapper > table > tbody > tr > td {
	height: 32px !important;
	border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
	border-right: none !important;
}
.v-data-table.table_list.theme--light
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:first-child
	> td {
	border-top: none !important;
}

@media (max-width: 576px) {
}
</style>
