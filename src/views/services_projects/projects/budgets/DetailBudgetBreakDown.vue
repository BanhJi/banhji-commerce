<template>
	<v-row>
		<v-col sm="12" cols="12" class="grayBg px-6">
			<v-card color="white" class="pa-3 no_border" elevation="0">
				<v-row>
					<v-col sm="8" cols="12" class="py-0">
						<h3 class="text-left mb-1 font_20 line_24">
							{{ $t("detail_budget_breakdown") }}
						</h3>
						<p class="mb-0">
							{{ $t("detail_budget_breakdown_desc") }}
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
							@onChanged="onFiscaldateChanges"
						/>
					</v-col>

					<v-col sm="4" cols="12" class="pr-0">
						<label class="mb-1">{{ $t("select_budget") }}:</label>
						<v-select
							class="mt-1"
							:disabled="fiscalDate === null"
							@change="onChangeBudget"
							placeholder="Select Budget"
							v-model="budget"
							:items="budgets"
							item-text="name"
							item-value="uuid"
							return-object
							clearable
							outlined
						/>
					</v-col>
					<v-col sm="4" cols="12">
						<!-- Reporting Language -->
						<label class="mb-1">{{ $t("reporting_language") }}:</label>
						<app-reporting-language
							:initLanguage="reportingLanguage"
							@emitLanguage="reportingLanguage = $event"
						/>
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
											<td style="width: 45%" class="">
												{{ $t("budget_name") }}
											</td>
											<td class="">{{ budget.name }}</td>
										</tr>
										<tr>
											<td class="">{{ $t("project") }}</td>
											<td class="" v-if="budget.project">
												{{ budget.project.name }}
											</td>
										</tr>
										<tr>
											<td class="">{{ $t("fiscal_year") }}</td>
											<td class="" v-if="budget.fiscal_year">
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
											<td class="">{{ $t("created_on") }}</td>
											<td class="" v-if="budget.created_date">
												{{ Helper.dateFormat(budget.created_date) }}
											</td>
										</tr>
										<tr>
											<td class="">{{ $t("last_edited_on") }}</td>
											<td class="">{{ budget.modified_date }}</td>
										</tr>
										<tr>
											<td class="">{{ $t("last_edited_by") }}</td>
											<td class="">
												{{
													budget.modified_by.first_name === ""
														? budget.created_by.first_name +
															" " +
															budget.created_by.last_name
														: budget.modified_by.first_name +
															" " +
															budget.modified_by.last_name
												}}
											</td>
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
							<kendo-datasource
								ref="budgetLineDS"
								:data="budgetLineList"
								:schema="schemaDefinition"
								:sort="sortDefinition"
								:group="groupDefinition"
								:aggregate="aggregateDefinition"
							/>

							<kendo-grid
								id="budgetGrid"
								class="custom_grid"
								:data-source-ref="'budgetLineDS'"
								:dataBound="dataBound"
								:sortable="true"
								:column-menu="false"
								:reorderable="true"
								:resizable="true"
								:noRecords="true"
								:groupable="groupable"
								:columns="columns"
							/>

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
import AccountModel from "@/scripts/model/Account.js";
import ProjectModel from "@/scripts/model/Project.js";
import BudgetModel from "@/scripts/model/Budget.js";

const OrderNumberPL = require("@/scripts/default_setup/OrderNumberPL.js");
const NumberInWord = require("@/scripts/default_setup/NumberInWord.js");

export default {
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-fiscal-date-dropdownlist": () =>
			import("@/components/kendo_templates/FiscalDateDropDownList"),
		"app-reporting-language": () =>
			import("@/components/kendo_templates/ReportingLanguageDropDownList"),
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
		sortDefinition: { field: "number", dir: "asc" },
		groupable: {
			enabled: false,
			showFooter: true,
		},
		groupDefinition: [],
		aggregateDefinition: [
			{ field: "balance", aggregate: "sum" },
			{ field: "zero", aggregate: "sum" },
			{ field: "one", aggregate: "sum" },
			{ field: "two", aggregate: "sum" },
			{ field: "three", aggregate: "sum" },
			{ field: "four", aggregate: "sum" },
			{ field: "five", aggregate: "sum" },
			{ field: "six", aggregate: "sum" },
			{ field: "seven", aggregate: "sum" },
			{ field: "eight", aggregate: "sum" },
			{ field: "nine", aggregate: "sum" },
			{ field: "ten", aggregate: "sum" },
			{ field: "eleven", aggregate: "sum" },
		],
		schemaDefinition: {
			model: { id: "accountUUID" },
		},
		// Reporting Language
		reportingLanguage: "english",
		fieldName: "name",
		fieldType: "type",
		totalWord: "Total",
		// LoadingMe
		showLoading: false,
	}),
	methods: {
		async search() {
			/* Clear */
			this.budget = new BudgetModel();
			this.fiscalMonths = [];

			if (this.fiscalDate !== null) {
				this.showLoading = true;

				/* Generate Months */
				this.fiscalMonths = Helper.generateFiscalMonths(
					this.fiscalDate.start_date,
					this.fiscalDate.end_date,
					"12"
				);

				/* Load Budget */
				let budgets = await this.$store.dispatch('budgets/getList'),
                    projects = await this.$store.dispatch('projects/getList');

				let budgetList = [];
				budgets.forEach((value) => {
					if (value.fiscal_year.uuid === this.fiscalDate.uuid && value.project_uuid !== '') {
						let budget = new BudgetModel(value);
						budget.project = new ProjectModel(
							projects.find((i) => i.id === value.project_uuid)
						);
						budgetList.push(budget);
					}
				});
				this.budgets = budgetList;

				this.showLoading = false;
			} else {
				/* Alert Warning */
                this.$snotify.warning(i18n.t("please_select_fiscaldate"));
			}
		},
		/* On Fiscaldate Changes */
		onFiscaldateChanges(){
			this.search();
		},
		/* On Change Budget */
		onChangeBudget() {
			let ds = this.$refs.budgetLineDS.kendoWidget();
			ds.data([]);

			if (this.budget !== null) {
				this.bindData();
			}
		},
		/* Bind Data */
		async bindData() {
			let entries = [];

			this.showLoading = true;

			// Load Account List
			let accounts = await this.$store.dispatch('accounting/getAccounts');

			/* Gathering from budget lines */
			this.budget.lines.forEach((value) => {
				let entry = value,
					nature = 1; /* Default Naure is Dr = 1 */

				/* Set Account Information */
				let account = new AccountModel(
					accounts.find((i) => i.uuid === value.account_uuid)
				);
				entry.accountUUID = account.uuid;
				entry.name = account.name;
				entry.local_name = account.local_name;
				entry.type = account.account_type.name;
				entry.type_local_name = account.account_type.local_name;
				entry.account_type_number = account.account_type.number;

				/* Reverse Nature */
				if (account.account_type.nature.toLowerCase() === "cr") {
					nature = -1;
				}

				/* Order */
				if (account.account_type.number === OrderNumberPL.OtherRevenue.number) {
					//Other Revenue
					entry.order = OrderNumberPL.OtherRevenue.order;
				} else {
					entry.order = account.account_type.number;
				}

				/* Total */
				entry.balance = value.amount * nature;

				for (let i = 0; i < 12; i++) {
					const element = value.monthly_amount[i];
					const indexName = NumberInWord[i];

					entry[indexName] = element.amount * nature;
				}

				/* Add entry */
				entries.push(entry);
			});

			/* Gathering from budget estimations */
			this.budget.budget_estimations.forEach((value) => {
				let entry = value;

				// Order
				if (value.account_type_number == OrderNumberPL.GrossProfit.number) {
					// Gross Profit
					entry.order = OrderNumberPL.GrossProfit.order;
				} else if (
					value.account_type_number == OrderNumberPL.OtherRevenue.number
				) {
					// Other Revenue
					entry.order = OrderNumberPL.OtherRevenue.order;
				} else if (
					value.account_type_number == OrderNumberPL.OperatingExpense.number
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
					entry.order = OrderNumberPL.EarningBeforeInterestAndTaxEBIT.order;
				} else if (
					value.account_type_number == OrderNumberPL.ProfitBeforeTax.number
				) {
					// Profit Before Tax
					entry.order = OrderNumberPL.ProfitBeforeTax.order;
				} else if (
					value.account_type_number == OrderNumberPL.ProfitForThePeriod.number
				) {
					// Profit For The Period
					entry.order = OrderNumberPL.ProfitForThePeriod.order;
				} else {
					entry.order = value.account_type_number;
				}

				/* Add entry */
				entries.push(entry);
			});

			/* BIND STATMENT */
			this.budgetLineList = entries;
			this.generateColumn();

			this.showLoading = false;
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
					style: "text-align: right; font-size: 14px",
				},
				attributes = {
					class: "table-cell",
					style: "text-align: right; font-size: 14px",
				};

			/* Columns */
			let columns = [
				{
					field: this.fieldName,
					title: i18n.t("account"),
					groupFooterTemplate: this.totalWord + " #=value#",
					locked: true,
					width: 300,
				},
				{
					field: this.fieldType,
					title: "TYPE",
					hidden: true,
					groupHeaderTemplate: this.typeGroupHeaderTmpl,
					width: 300,
				},
				{
					field: "balance",
					title: i18n.t("total"),
					format: "{0:n}",
					width: 150,
					aggregates: "['sum']",
					groupFooterTemplate:
						"<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
					headerAttributes: headerAttributes,
					attributes: attributes,
				},
			];

			for (let i = 0; i < 12; i++) {
				columns.push({
					field: NumberInWord[i],
					title: this.fiscalMonths[i],
					format: "{0:n}",
					width: 150,
					aggregates: "['sum']",
					groupFooterTemplate:
						"<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
					headerAttributes: headerAttributes,
					attributes: attributes,
				});
			}

			/* Set Columns */
			this.columns = columns;
		},
		// On Reporint Language Changes
		onReportingLanguageChanges() {
			this.fieldName = "name";
			this.fieldType = "type";
			this.totalWord = "Total";
			if (this.reportingLanguage === "local") {
				this.fieldName = "local_name";
				this.fieldType = "type_local_name";
				this.totalWord = "សរុប";
			}

			// Generate Group By
			this.generateGroupBy();

			// Generate column with new language
			this.generateColumn();
		},
		/* Templates */
		typeGroupHeaderTmpl(dataItem) {
			let name = dataItem.items[0].type;

			if (this.reportingLanguage === "local") {
				name = dataItem.items[0].type_local_name;
			}

			return "<span class='text-bold text-black'>" + name + "</span>";
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
	},
	watch: {
		budget() {
			// Prevent null error
			if (this.budget === null) {
				this.budget = new BudgetModel();
			}
		},
		reportingLanguage() {
			this.onReportingLanguageChanges();
		},
	},
	mounted() {
		// Generate Group By
		this.generateGroupBy();

		// Initial Grid Columns
		// this.generateColumn();
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
