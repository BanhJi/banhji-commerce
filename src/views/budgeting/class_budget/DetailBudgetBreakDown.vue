<template>
	<v-row>
		<v-col sm="12" cols="12" >
			<v-card color="white" class=" no_border" elevation="0">
				<v-row>
					<v-col sm="10" cols="12" class="py-0">
						<h3 class="text-left mb-1 font_20 line_24">
							{{ $t("detail_budget_breakdown") }}
						</h3>
						<p class="mb-0">
							{{ $t("a_detail_breakdown_of_budget_by_months") }}
						</p>
					</v-col>
				</v-row>

				<!-- Search -->
				<v-row class="mt-0">
					<v-col sm="4" cols="12" class="pr-0">
						<label class="mb-1">{{ $t("select_fiscal_date") }}:</label>
						<app-fiscal-date-dropdownlist
							:initFiscalDate="fiscalDate"
							@emitFiscalDate="fiscalDate = $event"
							@onChanged="loadBudget"
						/>
					</v-col>

					<v-col sm="4" cols="12" class="pr-0">
						<label class="mb-1">{{ $t("select_budget") }}:</label>
						<v-select
							class="mt-1"
							:loading="budgetLoading"
							:disabled="fiscalDate === null"
							placeholder="Select Budget"
							v-model="budget"
							:items="budgets"
							item-text="name"
							item-value="uuid"
							return-object
							outlined
						/>
					</v-col>
					<v-col sm="1" cols="12" class="pr-0">
						<v-btn
							color="primary"
							class="text-capitalize mt-7 white--text"
							@click="search"
						>
							{{ $t("view") }}
						</v-btn>
					</v-col>
				</v-row>

				<!-- Summary -->
				<v-row class="mt-0">
					<v-col class="pt-0" sm="6" cols="12">
						<template>
							<v-simple-table class="table_list nomal_table">
								<template>
									<tbody>
										<tr>
											<td style="width: 45%;font-weight: 900">
												{{ $t("budget_name") }}:
											</td>
											<td>{{ budget.name }}</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("segment") }}:</td>
											<td v-if="budget.segment">
												{{ budget.segment.name }}
											</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("business_unit") }}:</td>
											<td v-if="budget.location">
												{{ budget.location.name }}
											</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("project") }}:</td>
											<td v-if="budget.project">
												{{ budget.project.name }}
											</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("fiscal_year") }}:</td>
											<td v-if="budget.fiscal_year">
												{{
													kendo.toString(new Date(budget.fiscal_year.start_date), `yyyy`)
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
											<td v-if="budget.created_by.email">
												{{budget.created_by.email}}
											</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("created_on") }}:</td>
											<td v-if="budget.created_date">
												{{ kendo.toString(new Date(budget.created_date), `dd-MMM-yyyy h:mm tt`)}}
											</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("last_edited_on") }}:</td>
											<td>{{ kendo.toString(new Date(budget.modified_date), `dd-MMM-yyyy h:mm tt`) }}</td>
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
								ref="budgetLineDS"
								:data="budgetLineList"
								:schema-model="model" />

							<treelist 
								ref="budgetLineTreeList"
								data-source-ref="budgetLineDS"
								:resizable="true"
								:columns="columns" />

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
import BudgetLineExtendedModel from "@/scripts/model/BudgetLineExtended.js";
import ClassModel from "@/scripts/model/Clazz.js";
import SegmentModel from "@/scripts/model/Segment.js";
import LocationModel from "@/scripts/model/Location.js";
import ProjectModel from "@/scripts/model/Project.js";
import BudgetModel from "@/scripts/model/Budget.js";
import responseDataModel from "@/scripts/model/ResponseData";

import { TreeList } from '@progress/kendo-treelist-vue-wrapper';
import { TreeListDataSource } from '@progress/kendo-datasource-vue-wrapper';

import { mapState } from 'vuex';

const BudgetHandler = require("@/scripts/handler/workingcapital/budgetHandler.js");
// const NumberInWord = require("@/scripts/default_setup/NumberInWord.js");

export default {
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-fiscal-date-dropdownlist": () =>
			import("@/components/kendo_templates/FiscalDateDropDownList"),
		'treelist': TreeList,
		'treelistdatasource': TreeListDataSource,
	},
	data: () => ({
		fiscalDate: null,
		fiscalMonths: [],
		budget: new BudgetModel(),
		budgets: [],
		budgetLineList: [],
		Helper: Helper,
		/* Kendo */
		kendo: kendo,
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
		async loadBudget() {
			/* Clear */
			this.budget = new BudgetModel();
			this.fiscalMonths = [];

			/* Empty Datasource */
			let ds = this.$refs.budgetLineDS.kendoWidget();
			ds.data([]);

			if (this.fiscalDate !== null) {
				/* Generate Months */
				this.fiscalMonths = Helper.generateFiscalMonths(
					this.fiscalDate.start_date,
					this.fiscalDate.end_date,
					"12"
				);

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
					this.budgets = budgetList;
				})
				.finally(()=>{
					this.budgetLoading = false;
				});
			}else{
				this.$snotify.warning(i18n.t("please_select_fiscaldate"));
			}
		},
		/* View Budget */
		search() {
			let ds = this.$refs.budgetLineDS.kendoWidget();
			ds.data([]);
			
			if(this.fiscalDate === null) this.$snotify.warning(i18n.t("please_select_fiscal_date"));
			if (this.budget.uuid !== "") {
				this.bindData();
			}else{
				this.$snotify.warning(i18n.t("please_select_budget"));
			}
		},
		/* Bind Data */
		async bindData() {
			this.showLoading = true;

			// Classes
			await this.$store.dispatch("classes/getList");

			/* Gathering from budget lines */
			let g = {}, childIds = [];
			this.budget.lines.forEach((value) => {
				/* Child Id */
                childIds.push(value.account_uuid);

				/* Get Class Information */
				let clazz = new ClassModel(
					this.classes.find((i) => i.id === value.account_uuid)
				);

				/* Set Parent Id */
				let classParentId = clazz.clazz.id;
				
				/* GROUPING */
				/* Top Level Nature */
				if(!g[clazz.clazz.id]){
					g[clazz.clazz.id] = this.getNewModel({
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
						g[clazz.classType.id] = this.getNewModel({
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
						g[clazz.classGroup.id] = this.getNewModel({
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
						g[clazz.classSubGroup.id] = this.getNewModel({
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
					g[clazz.id] = new BudgetLineExtendedModel({
						uuid : clazz.id,
						number : clazz.code,
						name : clazz.name,
						clazz : clazz,
						parentId : classParentId,
						amount : value.amount,
						monthly_amount : value.monthly_amount,
					});
				}
			});

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
								/* Budget */
								parent.amount += entry.amount;

								/* Monthly */
								for (let j = 0; j < 12; j++) {
									parent.monthly_amount[j].amount += entry.monthly_amount[j].amount;
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
			
			/* BIND STATMENT */
			this.budgetLineList = entries;
			this.generateColumn();

			this.showLoading = false;
		},
		getNewModel(data){
			let model = new BudgetLineExtendedModel(data);
			
			for (let i = 0; i < 12; i++) {
				model.monthly_amount.push({amount : 0});
			}
			
			return model;
		},
		// Generate Columns
		generateColumn () {
			let headerAttributes = {
					style: "text-align: center;font-weight: bolder; font-size: 14px"
				},
				attributes = {
					style: "text-align: right; font-size: 14px"
				};

			/* Columns */
			let columns = [
				{ 
					field: "name", 
					title: i18n.t('class'),
					template: this.nameTmpl,
					locked: true,
					width:400
				},
				{ 
					field: "note", 
					title: i18n.t('note'),
					width:150
				},
				{ 
					field: "amount",
					format: "{0:n}",
					width:150,
					headerAttributes: headerAttributes,
					attributes: attributes,
				},
			]
			
			/* Monthly */
			for (let i = 0; i < 12; i++) {
				const element = this.fiscalMonths[i];

				columns.push({
					field: `monthly_amount[${i}].amount`,
					title: i18n.t(element),
					format: "{0:n}",
					width:150,
					headerAttributes: headerAttributes,
					attributes: attributes,
				});
			}

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
