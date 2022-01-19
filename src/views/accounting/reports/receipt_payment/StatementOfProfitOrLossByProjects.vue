<template>
	<v-row>
		<v-col sm="12" cols="12" class="grayBg px-6" >
			<v-card color="white" class="pa-3 no_border "  elevation="0">
				<v-row class="mt-0">
					<v-col sm="10" cols="12" class="py-0">
						<app-searchdate
							:initStartDate="startDate"
							@emitStartDate="startDate = $event"
							:initEndDate="endDate"
							@emitEndDate="endDate = $event"
						/>
					</v-col>
					<v-col sm="2" cols="12" class="py-0">
						<app-reporting-language
							:initLanguage="reportingLanguage"
							@emitLanguage="reportingLanguage = $event"
						/>
					</v-col>
				</v-row>
				<v-row class="mt-0">
					<v-col class="py-0" sm="3" cols="12">
						<label class="label">{{ $t("project") }}</label>
						<app-project-list-item-group
							:initProject="selectedProjectIds"
							@emitProject="selectedProjectIds = $event"
						/>
					</v-col>
					<v-col class="py-0" sm="3" cols="12">
						<label class="label">{{
							$t("level_chart_of_account")
						}}</label>
						<level-coa-dropdownlist
							:initLevelCoa="levelCoa"
							@emitLevelCoa="levelCoa = $event"
						/>
					</v-col>
					<v-col class="py-0" sm="3" cols="12">
						<v-btn class="white--text dv_mt" color="primary" @click="search">
							<i class="b-search" style="font-size: 18px; color:#fff !important;"/>
						</v-btn>
					</v-col>
				</v-row>
				<v-row class="mt-0">
					<v-col sm="12" cols="12" class="custom_expansion">
						<kendo-datasource
							ref="statementPLDS"
							:data="statementPLList"
							:schema="schemaDefinition"
							:sort="sortDefinition"
							:group="groupDefinition"
							:aggregate="aggregateDefinition"
						/>

						<kendo-grid
							id="gridSPL"
							class="custom_grid"
							:data-source-ref="'statementPLDS'"
							:dataBound="dataBound"
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
import Helper from "@/helper.js";
import { mapState } from "vuex";
import { dataStore } from "@/observable/store";

const { incomeStatementHandler } = require("@/scripts/AppHandlers");

export default {
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-searchdate": () => import("@/components/custom_templates/SearchDate"),
		"app-reporting-language": () =>
			import("@/components/kendo_templates/ReportingLanguageDropDownList"),
		"app-project-list-item-group": () =>
			import("@/components/dropdownlist/ProjectListItemGroup"),
		"level-coa-dropdownlist": () =>
			import("@/components/dropdownlist/LevelCoa"),
	},
	data: () => ({
		// Obj
		startDate: "",
		endDate: "",
		levelCoa: "",// Default primary
		statements: [],
		statementPLList: [],
		selectedProjectIds: [],
		Helper: Helper,
		// Reporting Language
		reportingLanguage: "english",
		fieldName: "name",
		fieldType: "type",
		footerName: "Surplus Or (Deficit)",
		// LodingMe
		showLoading: false,
		/* KENDO */
		columns: [],
		sortDefinition: { field: "number", dir: "asc" },
		groupDefinition: [],
		aggregateDefinition: [],
		schemaDefinition: {
			model: { id: "accountUUID" },
		},
	}),
	methods: {
		async initialize() {
			// Call List
			await this.$store.dispatch("projects/getList");
		},
		/* KENDO */
		/* On grid changes => link to GL */
		onGridChanges() {
			let grid = kendo.jQuery("#gridSPL").data("kendoGrid");
			let selectedProjectIds = grid.dataItem(grid.select());

			this.$router.push({
				path: "general_ledger",
				query: {
					account_id: selectedProjectIds.accountUUID,
					start_date: this.startDate,
					end_date: this.endDate,
				},
			});
		},
		// Search journals
		search() {
			if (this.selectedProjectIds.length > 0) {
				let sdate = new Date(this.startDate),
					edate = new Date(this.endDate);

				if (sdate && edate) {
					sdate = kendo.toString(sdate, "yyyy-MM-dd") + "T00:00:00.000Z";
					edate = kendo.toString(edate, "yyyy-MM-dd") + "T23:59:59.999Z";
				} else {
					sdate = 0;
					edate = 0;
				}

				// Empty dataSource
				let ds = this.$refs.statementPLDS.kendoWidget();
				ds.data([]);

				/* Generate Group By */
				this.generateGroupBy();

				// Query
				this.showLoading = true;
				incomeStatementHandler
					.getByProjects(sdate, edate, this.selectedProjectIds, this.levelCoa)
					.then((res) => {
						if (res) {
							this.statements = res;
							this.bindData();
						}else{
							this.$snotify.error(i18n.t("error_something_wrong"));
						}
					})
					.finally(() => {
						// this.showLoading = false;
					});
			} else {
				this.$snotify.warning(i18n.t("please_select_projects"));
			}
		},
		/* Bind Data */
		async bindData() {
			let g = {};

			for (let i = 0; i < this.selectedProjectIds.length; i++) {
				this.statements[i].forEach((value) => {
					let hasEntry = false;

					/* Receipt */
					if(value.statementGroup.toLowerCase() === "revenue" || value.statementGroup.toLowerCase() === "other revenue"){
						value.statementType = "Receipt";
						value.order = 1000;

						hasEntry = true;
					}else{/* Payment */
						if(value.account_type_number < 100){
							value.statementType = "Payment";
							value.order = 2000;

							hasEntry = true;
						}
					}

					/* Receipt */
					if(value.account_type_number === 105){
						value.statementType = this.footerName;
						value.order = 3000;

						hasEntry = true;
					}

					if(hasEntry){
						/* Grouping */
						let groupName = String(value.accountUUID) + String(value.account_type_number);
						if (g[groupName]) {
							g[groupName]["s" + i] = value.balance;
						} else {
							g[groupName] = value;

							/* Add all segments to columns */
							for (let j = 0; j < this.selectedProjectIds.length; j++) {
								g[groupName]["s" + j] = 0;
							}

							g[groupName]["s" + i] = value.balance;
						}
					}
				});
			}

			this.statementPLList = Object.values(g);
			this.generateColumn();

			this.showLoading = false;
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
		// Generate Columns
		generateColumn() {
			let columns = [
				{
					field: this.fieldName,
					title: i18n.t("account"),
					template: this.accountTmpl,
					locked: true,
					width: 300,
				},
				{
					field: "statementType",
					title: i18n.t("statement_type"),
					groupHeaderTemplate: "<span class='text-bold text-black'>#=value#</span>",
					hidden: true,
					width: 250,
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
						"<span class='text-bold text-black'>#=value#</span>",
					width: 300,
				},
				{
					field: "groupNature",
					title: i18n.t("nature"),
					hidden: true,
					groupHeaderTemplate:
						"<span class='text-bold text-black'>#=value#</span>",
					width: 300,
				},
			];

			let headerAttributes = {
					class: "table-header-cell",
					style: "text-align: right;padding-right: 35px; font-size: 14px",
				},
				attributes = {
					class: "table-cell",
					style: "text-align: right; font-size: 14px",
				};

			/* Set Column Segments */
			for (let i = 0; i < this.selectedProjectIds.length; i++) {
				/* Project */
				let project = this.projects.find(
					(item) => item.id === this.selectedProjectIds[i]
				);

				/* Column Project */
				columns.push({
					field: "s" + i,
					title: project.name,
					format: "{0:n}",
					width: 200,
					aggregates: "['sum']",
					groupHeaderColumnTemplate:
						"<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
					headerAttributes: headerAttributes,
					attributes: attributes,
				});
			}

			this.columns = columns;
		},
		/* Databound */
		dataBound(e) {
			let grid = e.sender;

			grid.dataSource.data().forEach((value) => {
				if (value.account_type_number === 105) {
					let row = grid.tbody
						.find("tr[data-uid='" + value.uid + "']")
						.prev(".k-grouping-row");
					grid.collapseGroup(row);
				}
			});
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
			/* Aggregate Defintion */
			let aggregateDefinition = [];
			for (let i = 0; i < 50; i++) {
				aggregateDefinition.push({ field: "s" + i, aggregate: "sum" });
			}
			this.aggregateDefinition = aggregateDefinition;

			/* Group By */
			let groupDefinition = [];

			/* Default group */
			groupDefinition.push({
				field: "statementType",
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
			});
			
			/* Level Coa */
			if(this.levelCoa !== ""){
				groupDefinition.push({ field: this.fieldType, aggregates: this.aggregateDefinition });
			}

			/* Apply Group Definition */
			this.groupDefinition = groupDefinition;
		},
	},
	watch: {
		reportingLanguage() {
			this.onReportingLanguageChanges();
		},
	},
	computed: mapState({
		projects: (state) => state.projects.list,
		appType() {
			return dataStore.productType;
		},
	}),
	created() {
		this.initialize();
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
