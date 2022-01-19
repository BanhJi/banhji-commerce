<template>
	<v-row>
		<v-col sm="12" cols="12" class="">
			<v-card color="white" class="no_border" elevation="0">
				<!-- Title -->
				<v-row>
					<v-col sm="10" cols="12" class="py-0">
						<h3 class="text-left mb-1 font_20 line_24">
							{{ $t("budget_performance_report") }}
						</h3>
						<p class="mb-0">
							{{ $t("class_budget_performance_report_desc") }}
						</p>
					</v-col>
				</v-row>

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
						<app-month-of-picker
							:initMonthOf="monthOf"
							@emitMonthOf="monthOf = $event"
							@onChanged="onMonthOfChanges"
							:initMin="fiscalDate.start_date"
							:initMax="fiscalDate.end_date"
						/>
					</v-col>
					<v-col sm="4" cols="12" class="py-0">
						<v-btn
							color="primary"
							class="text-capitalize mt-7 white--text"
							@click="search"
						>
								<i class="b-search" style="font-size: 18px; color:#fff !important;"/>
						</v-btn>
					</v-col>
				</v-row>
				<v-row class="mt-0">
					<v-col sm="4" cols="12" class="py-0">
						<label class="label">{{ $t("budget_type") }}</label>
						<budget-type-dropdownlist
							:initBudgetType="budgetType"
							@emitBudgetType="budgetType = $event"
							@onChanged="onBudgetTypeChanges"
						/>
					</v-col>
					<v-col sm="4" cols="12" class="py-0" v-show="budgetType === 'segment'">
						<label class="label">{{ $t("segment") }}</label>
						<app-segment-dropdownlist
							:initSegment="segment"
							@emitSegment="segment = $event"
						/>
					</v-col>
					<v-col sm="4" cols="12" class="py-0" v-show="budgetType === 'location'">
						<label class="label">{{ $t("location") }}</label>
						<app-location-dropdownlist
							:initLocation="location"
							@emitLocation="location = $event"
						/>
					</v-col>
					<v-col sm="4" cols="12" class="py-0" v-show="budgetType === 'project'">
						<label class="label">{{ $t("project") }}</label>
						<app-project-dropdownlist
							:initProject="project"
							@emitProject="project = $event"
						/>
					</v-col>
					<v-col sm="4" cols="12" class="py-0">
						<label class="label">{{ $t("budget") }}</label>
						<v-select
							class="mt-1"
							:loading="budgetLoading"
							:disabled="monthOf === ''"
							placeholder="Select Budget"
							v-model="budget"
							:items="budgetList"
							item-text="name"
							item-value="uuid"
							return-object
							outlined
						/>
					</v-col>
					
				</v-row>

				<!-- Summary -->
				<v-row>
					<v-col class="pt-0" sm="6" cols="12">
						<template>
							<v-simple-table class="table_list nomal_table">
								<template>
									<tbody>
										<tr>
											<td style="width: 45%; font-weight: 900">
												{{ $t("budget_name") }}:
											</td>
											<td class="">{{ budget.name }}</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("segment") }}:</td>
											<td class="btb" v-if="budget.segment">
												{{ budget.segment.name }}
											</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("business_unit") }}:</td>
											<td class="btb" v-if="budget.location">
												{{ budget.location.name }}
											</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("project") }}:</td>
											<td class="btb" v-if="budget.project">
												{{ budget.project.name }}
											</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("fiscal_year") }}:</td>
											<td class="btb" v-if="budget.fiscal_year">
												{{
													Helper.formatFiscalDate(budget.fiscal_year.start_date)
												}}
											</td>
										</tr>
									</tbody>
								</template>
							</v-simple-table>
						</template>
					</v-col>
					<v-col class="pt-0" sm="6" cols="12">
						<template>
							<v-simple-table class="table_list nomal_table">
								<template>
									<tbody>
										<tr>
											<td style="font-weight: 900">{{ $t("created_by") }}:</td>
											<td class="" v-if="budget.created_by.email">
												{{budget.created_by.email}}
											</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("created_at") }}:</td>
											<td class="" v-if="budget.created_date">
												{{ formatDateTime(budget.created_date) }}
											</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("last_edited_at") }}:</td>
											<td class="" v-if="budget.modified_date">
												{{ formatDateTime(budget.modified_date) }}
											</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("last_edited_by") }}:</td>
											<td class="" v-if="budget.modified_by.email">{{budget.modified_by.email}}</td>
										</tr>
									</tbody>
								</template>
							</v-simple-table>
						</template>
					</v-col>
				</v-row>

				<!-- Grid -->
				<v-row>
					<v-col sm="12" cols="12" class="pt-1">
						<template>
							<treelistdatasource 
								ref="statementDS"
								:data="statementList"
								:schema-model="model">
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
import LocationModel from "@/scripts/model/Location.js";
import ProjectModel from "@/scripts/model/Project.js";
import BudgetModel from "@/scripts/model/Budget.js";
import ClassModel from "@/scripts/model/Clazz.js";
import FiscalDateModel from "@/scripts/model/FiscalDate.js";
import BudgetPerformanceModel from "@/scripts/model/BudgetPerformance.js";
import responseDataModel from "@/scripts/model/ResponseData";

import { TreeList } from '@progress/kendo-treelist-vue-wrapper';
import { TreeListDataSource } from '@progress/kendo-datasource-vue-wrapper';

/* Vuex */
import { mapState } from 'vuex';

const BudgetHandler = require("@/scripts/handler/workingcapital/budgetHandler");

export default {
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-fiscal-date-dropdownlist": () =>
			import("@/components/kendo_templates/FiscalDateDropDownList"),
		"app-month-of-picker": () =>
			import("@/components/kendo_templates/MonthOfPicker"),
		"budget-type-dropdownlist": () =>
			import("@/components/dropdownlist/BudgetType"),
		"app-segment-dropdownlist": () =>
			import("@/components/dropdownlist/Segment"),
		"app-location-dropdownlist": () =>
			import("@/components/dropdownlist/Location"),
		"app-project-dropdownlist": () =>
			import("@/components/dropdownlist/Project"),
		'treelist': TreeList,
		'treelistdatasource': TreeListDataSource,
	},
	data: () => ({
		monthOf: "",
		budgetType: "segment",
		budget: new BudgetModel(),
		segment: new SegmentModel(),
		location: new LocationModel(),
		project: new ProjectModel(),
		budgetList: [],
		statements: [],
		statementList: [],
		fiscalDate: new FiscalDateModel(),
		minMonth: "",
		maxMonth: "",
		Helper: Helper,
		columns: [],
		model: {
			id: "uuid",
			expanded: true
		},
		// LoadingMe
		showLoading: false,
		budgetLoading: false,
	}),
	methods: {
		onFiscalDateChanges() {
			this.monthOf = "";
			this.budget = new BudgetModel();

			if (this.fiscalDate !== null) {
				/* Load Budget */
				this.loadBudget();
			}
		},
		formatDateTime(value) {
            return kendo.toString(new Date(value), 'dd-MMM-yyyy h:mm tt');
        },
		onMonthOfChanges() {
			if (this.statements.length > 0) {
				/* Bind Data */
				this.bindData();
			}
		},
		/* Budget Type Changes */
		onBudgetTypeChanges(){
			switch (this.budgetType) {
				case "segment":
					this.location = new LocationModel();
					this.project = new ProjectModel();
					break;

				case "location":
					this.segment = new SegmentModel();
					this.project = new ProjectModel();
					break;
			
				case "project":
					this.segment = new SegmentModel();
					this.location = new LocationModel();
					break;
			}
		},
		async loadBudget() {
			/* Load Budget */
			this.budgetLoading = true;
			BudgetHandler.getAll()
			.then((res)=>{
				let responseData = new responseDataModel(res);
				let budgetList = [];
				responseData.data.forEach((value) => {
					if (value.fiscal_year.uuid === this.fiscalDate.uuid && value.budget_type === "class") {
						let budget = new BudgetModel(value);
						
						/* Segment */
						budget.segment = new SegmentModel(
							this.segments.find((i) => i.id === value.segment_uuid)
						);
						/* Location */
						budget.location = new LocationModel(
							this.locations.find((i) => i.id === value.location_uuid)
						);
						/* Project */
						budget.project = new ProjectModel(
							this.projects.find((i) => i.id === value.project_uuid)
						);

						budgetList.push(budget);
					}
				});
				this.budgetList = budgetList;
			})
			.finally(()=>{
				this.budgetLoading = false;
			});
		},
		/* Search */
		search() {
			if (this.budget.uuid !== "") {
				let asOfDate = kendo.toString(new Date(this.monthOf), "yyyy-MM-dd") + "T23:59:59.999Z";

				// Empty statementDS
				let ds = this.$refs.statementDS.kendoWidget();
				ds.data([]);

				// Query Income Statement
				this.showLoading = true;
				BudgetHandler.getActualClassBudget({
						params: {
							as_of_date: asOfDate,
							budget_uuid: this.budget.uuid
						},
					})
					.then((res) => {
						if (res.data) {
							this.statements = res.data;
							this.bindData();
						}else {
							this.$snotify.error(i18n.t("error_something_wrong"));
						}
					})
					.finally(() => {
						// this.showLoading = false;
					});
			} else {
				/* Alert Warning */
				this.$snotify.warning(i18n.t("please_select_budget"));
			}
		},
		async bindData() {
			let g = {}, childrenIds = [];
			
			/* Find index of selected month */
			let	budgetMonthFormated = kendo.toString(new Date(this.monthOf), "yyyy-MM");

			// Classes
			let classes = await this.$store.dispatch("classes/getList");

			/* Gathering from budget lines */
			this.budget.lines.forEach((value) => {
				/* Children Ids */
				childrenIds.push(value.account_uuid);

				/* Set Class Information(using account_uuid as class_uuid) */
				let clazz = new ClassModel(
					classes.find((i) => i.id === value.account_uuid)
				);

				/* Set Parent Id */
				let classParentId = clazz.clazz.id;

				/* GROUPING */
				/* Top Level Nature */
				if(!g[clazz.clazz.id]){
					g[clazz.clazz.id] = new BudgetPerformanceModel({
						uuid : clazz.clazz.id,
						number : clazz.clazz.code,
						name : clazz.clazz.name,
						clazz : clazz.clazz,
					});
				}

				/* Type */
				if(clazz.classType.id !== ""){
					classParentId = clazz.classType.id;

					if(!g[clazz.classType.id]){
						g[clazz.classType.id] = new BudgetPerformanceModel({
							uuid : clazz.classType.id,
							number : clazz.classType.code,
							name : clazz.classType.name,
							clazz : clazz.classType,
							parentId : clazz.clazz.id,
						});
					}
				}

				/* Group */
				if(clazz.classGroup.id !== ""){
					classParentId = clazz.classType.id;

					if(!g[clazz.classGroup.id]){
						g[clazz.classGroup.id] = new BudgetPerformanceModel({
							uuid : clazz.classGroup.id,
							number : clazz.classGroup.code,
							name : clazz.classGroup.name,
							clazz : clazz.classGroup,
							parentId : clazz.classType.id,
						});
					}
				}

				/* Subgroup */
				if(clazz.classSubGroup.id !== ""){
					classParentId = clazz.classSubGroup.id;

					if(!g[clazz.classSubGroup.id]){
						g[clazz.classSubGroup.id] = new BudgetPerformanceModel({
							uuid : clazz.classSubGroup.id,
							number : clazz.classSubGroup.code,
							name : clazz.classSubGroup.name,
							clazz : clazz.classSubGroup,
							parentId : clazz.classGroup.id,
						});
					}
				}

				/* Child Level */
				if(!g[clazz.id]){
					g[clazz.id] = new BudgetPerformanceModel({
						uuid : clazz.id,
						number : clazz.code,
						name : clazz.name,
						clazz : clazz,
						parentId : classParentId,
						amount : value.amount,
						monthly_amount : value.monthly_amount,
					});
				}
				
				/* BUDGET */
				/* Budget Whole */
				g[clazz.id].budget_whole = kendo.parseFloat(value.amount);

				value.monthly_amount.forEach((mline) => {
					/* Budget Month */
					if (mline.month_of === budgetMonthFormated) {
						g[clazz.id].budget_month = kendo.parseFloat(mline.amount);
					}

					/* Budget YTD */
					if (kendo.toString(new Date(mline.month_of), "yyyy-MM-dd") 
						<= kendo.toString(new Date(this.monthOf), "yyyy-MM-dd")) {
						g[clazz.id].budget_ytd += kendo.parseFloat(mline.amount);
					}
				});
			});

			/* ACTUAL */
			if(this.statements.hasOwnProperty("lines")){
				this.statements.lines.forEach((value) => {
					if (g[value.account_uuid]) {
						/* Actual Whole */
						g[value.account_uuid].actual_whole = kendo.parseFloat(value.actual_amount);/* B Kethya uses this field for actual whole */
						
						if(value.hasOwnProperty("actual_monthly_amount")){
							value.actual_monthly_amount.forEach(actMonth => {
								let monthlyAmount = kendo.parseFloat(actMonth.amount);

								/* Actual Month */
								if(actMonth.month_of === this.monthOf){
									g[value.account_uuid].actual_month = monthlyAmount;
								}

								/* Actual YTD */
								if(new Date(actMonth.month_of) <= new Date(this.monthOf)){
									g[value.account_uuid].actual_ytd += monthlyAmount;
								}
							});
						}
					}
				});
			}

			let entries = Object.values(g);

			/* Parent aggregate sum */
			for (let i = 0; i < entries.length; i++) {
				let entry = entries[i];
				
				if(~childrenIds.indexOf(entry.uuid)){
					let parentId = entry.parentId;
					while(parentId !== null){
						let parent = entries.find((item) => item.uuid === parentId);
						parent.balance += entry.balance;
						/* Budget */
						parent.budget_month += entry.budget_month;
						parent.budget_ytd += entry.budget_ytd;
						parent.budget_whole += entry.budget_whole;

						/* Actual */
						parent.actual_month += entry.actual_month;
						parent.actual_ytd += entry.actual_ytd;
						parent.actual_whole += entry.actual_whole;

						/* Percentage */
						parent.month_percentage += entry.month_percentage;
						parent.ytd_percentage += entry.ytd_percentage;
						parent.whole_percentage += entry.whole_percentage;

						/* Set new parent id */
						parentId = parent.parentId;
					}
				}
			}

			/* Percentage = Actual / Budget */
			entries.forEach(value => {
				value.month_percentage = this.findPercentage(value.actual_month, value.budget_month);
				value.ytd_percentage = this.findPercentage(value.actual_ytd, value.budget_ytd);
				value.whole_percentage = this.findPercentage(value.actual_whole, value.budget_whole);
			});
			
			/* BIND STATMENT */
			this.statementList = entries;

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

			/* Columns */
			let columns = [
				{
					field: "name",
					title: i18n.t("class"),
					template: this.nameTmpl,
					headerAttributes: headerAttributes,
					locked: true,
					width: 300,
				},
				/* Selected Month */
				{
					title: kendo.toString(new Date(this.monthOf), "MMMM yyyy"),
					headerAttributes: headerAttributes,
					columns: [
						{
							field: "budget_month",
							title: i18n.t("budget"),
							format: "{0:n}",
							width: 150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						},
						{
							field: "actual_month",
							title: i18n.t("actual"),
							format: "{0:n}",
							width: 150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						},
						{
							field: "month_percentage",
							title: "%",
							format: "{0:p}",
							width: 150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						},
					],
				},
				/* YTD(up to selected month) */
				{
					title: i18n.t("ytd_up_to_selected_month"),
					headerAttributes: headerAttributes,
					columns: [
						{
							field: "budget_ytd",
							title: i18n.t("budget"),
							format: "{0:n}",
							width: 150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						},
						{
							field: "actual_ytd",
							title: i18n.t("actual"),
							format: "{0:n}",
							width: 150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						},
						{
							field: "ytd_percentage",
							title: "%",
							format: "{0:p}",
							width: 150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						},
					],
				},
				/* Whole Year */
				{
					title: i18n.t("whole_year"),
					headerAttributes: headerAttributes,
					columns: [
						{
							field: "budget_whole",
							title: i18n.t("budget"),
							format: "{0:n}",
							width: 150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						},
						{
							field: "actual_whole",
							title: i18n.t("actual"),
							format: "{0:n}",
							width: 150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						},
						{
							field: "whole_percentage",
							title: "%",
							format: "{0:p}",
							width: 150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						},
					],
				},
			];

			/* Set Columns */
			this.columns = columns;
		},
		// Row Template
        nameTmpl(dataItem){
            /* Define result */
            let result = `<span>${dataItem.number} - ${dataItem.name}</span>`;

            // /* Top Level */
            if(dataItem.parentId === null){
                result = `<span style='font-weight: bolder;'>${dataItem.name}</span>`;
            }

            /* Parent Level */
            if(dataItem.hasChildren){
                result = `<span style='font-weight: bolder;'>${dataItem.number} - ${dataItem.name}</span>`;
            }

            return result;
        },
		/* On databound */
        onDataBound (e) {
            /* Headers */
            var headers = e.sender.thead.children();
            for (var i = 0; i < headers.length; i++) {
                var th = kendo.jQuery(headers[i]);
                th.css("font-weight", "bold");
                th.css("text-align", "center");
            }

            /* Items */
            var items = e.sender.items();
            for (var j = 0; j < items.length; j++) {
                var dataItem = e.sender.dataItem(items[j]);
                var row = kendo.jQuery(items[j]);

                /* Parent in bold */
                if(dataItem.get("hasChildren") || dataItem.get("parentId") === null){
                    row.css("font-weight", "bold");
                }
            }
        },
		/* Find Percentage */
		findPercentage(value1, value2){
			let result = 0;

			if(value2 !== 0){
				result = value1 / value2;
			}

			return result;
		},
	},
	computed: mapState({
        classes: state => state.classes.list,
		segments: state => state.segments.list,
		locations: state => state.locations.list,
		projects: state => state.projects.list,
    }),
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
