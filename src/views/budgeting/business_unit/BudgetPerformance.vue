<template>
	<v-row>
		<v-col sm="12" cols="12" class="">
			<v-card color="white" class="no_border" elevation="0">
				<!-- Title -->
				<v-row>
					<v-col sm="9" cols="12" class="py-0">
						<h3 class="text-left mb-1 font_20 line_24">
							{{ $t("budget_performance_report") }}
						</h3>
						<p class="mb-0">
							{{ $t("budget_performance_report_desc") }}
						</p>
					</v-col>
					<v-col sm="3" cols="12" class="py-0">
						<!-- Reporting Language -->
						<app-reporting-language
							:initLanguage="reportingLanguage"
							@emitLanguage="reportingLanguage = $event"
						/>
					</v-col>
				</v-row>

				<!-- Search -->
				<v-row class="mt-0">
					<v-col sm="4" cols="12" class="py-0 pt-0">
						<app-fiscal-date-dropdownlist
							:initFiscalDate="fiscalDate"
							@emitFiscalDate="fiscalDate = $event"
							@onChanged="onFiscalDateChanges"
						/>
					</v-col>
					<v-col sm="3" cols="12" class="py-0 pt-0">
						<app-month-of-picker 
							:initMonthOf="monthOf" 
							@emitMonthOf="monthOf = $event"
							@onChanged="onMonthOfChanges"
							:initMin="fiscalDate.start_date"
							:initMax="fiscalDate.end_date" />
					</v-col>
					<v-col sm="3" cols="12" class="py-0 pt-0">
						<v-select class="mt-1"
							:disabled="monthOf === ''"
							placeholder="Select Budget"
							v-model="budget"
							:loading="loadingBudget"
							:items="budgetList"
							item-text="name"
							item-value="uuid"
							return-object
							clearable
							outlined />
					</v-col>
					<v-col sm="2" cols="12" class="py-1">
						<v-btn
							class="white--text"
							color="primary"
							@click="search"
						>
							<i class="b-search" style="font-size: 18px; color:#fff !important;"/>
						</v-btn>
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
											<td style="font-weight: 900;width: 45%" class="">
												{{ $t("budget_name") }}
											</td>
											<td class="">{{ budget.name }}</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("location") }}</td>
											<td class="" v-if="budget.location">
												{{ budget.location.name }}
											</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("fiscal_year") }}</td>
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
											<td style="font-weight: 900">{{ $t("created_at") }}:</td>
											<td v-if="budget.created_date">
												{{ formatDateTime(budget.created_date) }}
											</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("last_edited_at") }}:</td>
                                            <td v-if="budget.modified_date">
											{{ formatDateTime(budget.modified_date) }}</td>
										</tr>
										<tr>
											<td style="font-weight: 900">{{ $t("last_edited_by") }}:</td>
											<td class="" v-if="budget.modified_by.email">{{budget.modified_by.email}}</td>
										</tr>
                            </tbody>
                        </template>
							</v-simple-table>
					</v-col>
				</v-row>

				<!-- Table -->
				<v-row>
					<v-col sm="12" cols="12" class="pt-1">
						<template>
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
import LocationModel from "@/scripts/model/Location.js";
import BudgetModel from "@/scripts/model/Budget.js";
import AccountModel from "@/scripts/model/Account.js";
import FiscalDateModel from "@/scripts/model/FiscalDate";
import BudgetPerformanceModel from "@/scripts/model/BudgetPerformance";

/* TreeList */
import { TreeList } from '@progress/kendo-treelist-vue-wrapper';
import { TreeListDataSource } from '@progress/kendo-datasource-vue-wrapper';

/* Vuex */
import { mapState } from 'vuex';

const incomeStatementHandler = require("@/scripts/handler/accounting/incomeStatementHandler");
const OrderNumberPL = require("@/scripts/default_setup/OrderNumberPL.js");
const NumberInWord = require("@/scripts/default_setup/NumberInWord.js");
const AccountTypeCode = require("@/scripts/default_setup/AccountTypeCode.js");

export default {
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-fiscal-date-dropdownlist": () =>
			import("@/components/kendo_templates/FiscalDateDropDownList"),
		"app-month-of-picker": () =>
			import("@/components/kendo_templates/MonthOfPicker"),
		"app-reporting-language": () =>
			import("@/components/kendo_templates/ReportingLanguageDropDownList"),
		'treelist': TreeList,
        'treelistdatasource': TreeListDataSource,
	},
	data: () => ({
		monthOf: "",
		budget: new BudgetModel(),
		budgetList: [],
		incomeStatements: [],
		statementList: [],
		fiscalDate: new FiscalDateModel(),
		fiscalMonths: [],
		Helper: Helper,
		/* Kendo */
		columns: [],
		sortDefinition : [
			{ field: "order", dir: "asc" },
			{ field: "number", dir: "asc" },
		],
		model: {
			id: "uuid",
			expanded: true
		},
		// Reporting Language
		reportingLanguage: "english",
		fieldName: "name",
		// LoadingMe
		showLoading: false,
		loadingBudget: false,
	}),
	methods:{
		formatDateTime(value) {
			return kendo.toString(new Date(value), `dd-MMM-yyyy h:mm tt`);
		},
		onFiscalDateChanges(){
			this.monthOf = '';
			this.budget = new BudgetModel();

			if(this.fiscalDate !== null){
				/* Load Budget */
				this.loadBudget();

			}
		},
		onMonthOfChanges () {
			if(this.statementList.length > 0){
				/* Bind Data */
				this.bindData();
			}
		},
		async loadBudget(){
			this.loadingBudget = true;
			let budgets = await this.$store.dispatch('budgets/getList'),
				locations = await this.$store.dispatch('locations/getList');

			let budgetList = [];
			budgets.forEach(value => {
				if(value.fiscal_year.uuid === this.fiscalDate.uuid 
					&& value.location_uuid !== '' 
					&& value.budget_type === 'standard'){
					let budget = new BudgetModel(value);
					budget.location = new LocationModel(locations.find(i => i.id === value.location_uuid));
					budgetList.push(budget);
				}
			});
			this.budgetList = budgetList;
			this.loadingBudget = false;
		},
		/* Search */
		search () {
			if(this.budget.uuid !== ''){
				let sdate = kendo.toString(new Date(this.fiscalDate.start_date), 'yyyy-MM-dd') + 'T00:00:00.000Z',
					edate = kendo.toString(new Date(this.fiscalDate.end_date), 'yyyy-MM-dd') + 'T23:59:59.999Z';
				
				// Empty statementDS
				let ds = this.$refs.statementDS.kendoWidget();
				ds.data([]);
					
				// Query Income Statement
				this.showLoading = true;
				incomeStatementHandler.getIncomeStatement({
					params : {
						start_date 		: sdate,
						end_date 		: edate,
						group_by 		: "12",
						location_uuid    : this.budget.location_uuid,
					}
				})
				.then(res => {
					if(res){
						this.statements = res.data;
						this.bindData();
					}else{
						this.$snotify.error(i18n.t("error_something_wrong"));
					}
				})
				.finally(()=>{
					// this.showLoading = false;
				});
			}else{
				/* Alert Warning */
				this.$snotify.warning(i18n.t("please_select_budget"));
			}
		},
		async bindData () {
			let g = {}, childIds = [];

			// Load Account List
			await this.$store.dispatch('accounting/getAccounts');
			
			/* Generate Months */
			let fiscalMonths = Helper.generateFiscalMonths(this.fiscalDate.start_date, this.fiscalDate.end_date, "12", "yyyy-MM");
			let monthOfIndex = fiscalMonths.indexOf(this.monthOf);
			
			/* Gathering from budget lines */
			this.budget.lines.forEach(value => {
				/* Get Account Information */
				let account = this.accounts.find(item => item.uuid === value.account_uuid);
				if(account){
					/* Order */
					let order = account.type_code;
					if(account.type_code === AccountTypeCode.OTHER_REVENUE){
						order = OrderNumberPL[account.type_code];
					}

					/* GROUPING */
					/* Top Level Account Type */
					if(!g[account.type_code]){
						g[account.type_code] = new BudgetPerformanceModel({
							uuid : account.type_code,
							number : account.type_code,
							name : account.account_type.name,
							local_name : account.account_type.local_name,
							order : order,
						});
					}
					
					/* Parent Level */
					let thisAccountParentId = "";
					if(account.hasOwnProperty("parent_account")){
						let currentParentAccount = new AccountModel(account.parent_account), counter = 0;
						while (currentParentAccount.number !== "") {
							/* Get account by uuid or banhji_account_number */
							let accountParent = new AccountModel();
							if(currentParentAccount.uuid !== ""){/* Get by uuid */
								accountParent = new AccountModel(this.accounts.find((item) => item.uuid === currentParentAccount.uuid));
							}else{/* Get by banhji_account_number because default data has no uuid */
								if(currentParentAccount.banhji_account_number !== ""){
									accountParent = new AccountModel(this.accounts.find((item) => item.banhji_account_number === currentParentAccount.banhji_account_number));
								}
							}

							/* Set This Account Parent Id */
							if(counter === 0){
								thisAccountParentId = accountParent.uuid;
							}

							/* Find Next Parent */
							let nextParent = new AccountModel();
							if(accountParent.hasOwnProperty("parent_account")){
								let parentOfAccountParent = new AccountModel(accountParent.parent_account);
								if(parentOfAccountParent.number !== ""){
									if(parentOfAccountParent.uuid !== ""){/* Get by uuid */
										nextParent = this.accounts.find((item) => item.uuid === parentOfAccountParent.uuid);
									}else{/* Get by banhji_account_number because default data has no uuid */
										if(parentOfAccountParent.banhji_account_number !== ""){
											nextParent = this.accounts.find((item) => item.banhji_account_number === parentOfAccountParent.banhji_account_number);
										}
									}
								}
							}

							/* Set Parent Id */
							let parentId = accountParent.type_code;
							if(nextParent.number !== ""){
								parentId = nextParent.uuid;

								/* Set next parent account */
								Object.assign(currentParentAccount, nextParent);
							}else{
								/* Set loop to end */
								currentParentAccount.number = "";
							}

							/* Add Parent Level */
							g[accountParent.uuid] = new BudgetPerformanceModel({
								uuid : accountParent.uuid,
								number : accountParent.number,
								name : accountParent.name,
								local_name : accountParent.local_name,
								parentId : parentId,
								account : accountParent,
								order : order,
							});

							/* Increase Counter By 1 */
							counter++;
						}/* End While Loop */
					}

					/* Child Level */
					if(!g[account.uuid]){
						g[account.uuid] = new BudgetPerformanceModel({
							uuid : account.uuid,
							number : account.number,
							name : account.name,
							local_name : account.local_name,
							account : account,
							order : order,
						});
					}

					/* Set Parent Id Or Self Parent */
					let acctKey = account.uuid;
					if(thisAccountParentId !== ""){/* Child Level */
						g[account.uuid].parentId = thisAccountParentId;
					}else{/* Child As Parent */
						g[account.uuid].parentId = account.type_code; /* Self As Parent */

						if(value.amount !== 0){
							acctKey = account.number;

							/* Self As Child With Balance */
							if(!g[account.number]){
								g[account.number] = new BudgetPerformanceModel({
									uuid : account.number,
									number : account.number,
									name : account.name,
									local_name : account.local_name,
									parentId : account.uuid,
									account : account,
									order : order,
								});
							}
						}
					}

					/* Child Id */
					childIds.push(acctKey);

					/* Reverse Nature */
					let nature = 1; /* Default Naure is Dr = 1 */
					if(account.account_type.nature.toLowerCase() === "cr"){
						nature = -1;
					}

					/* BUDGET */
					/* Budget Whole */
					g[acctKey].budget_whole = value.amount * nature;
					
					value.monthly_amount.forEach(mline => {
						/* Budget Month */
						if(mline.month_of === this.monthOf){
							g[acctKey].budget_month = mline.amount * nature;
						}

						/* Budget YTD */
						if (kendo.toString(new Date(mline.month_of),"yyyy-MM-dd") <= kendo.toString(new Date(this.monthOf),"yyyy-MM-dd")) {
							g[acctKey].budget_ytd += mline.amount * nature;
						}
					});

					/* ACTUAL */
					let actual = this.statements.find((item) => item.accountUUID === value.account_uuid);
					if(actual){
						/* Actual Month */
						let propertyMonth = NumberInWord[monthOfIndex];// ['zero','one','two',...]
						g[acctKey].actual_month = actual[propertyMonth];// actual['zero']
						for (let i = 0; i < 12; i++) {
							let property = NumberInWord[i];

							/* Actual YTD */
							if(i <= monthOfIndex){
								g[acctKey].actual_ytd += actual[property];
							}

							/* Actual Whole */
							g[acctKey].actual_whole += actual[property];
						}
					}
				}
			});

			/* Budget Estimations */
			this.budget.budget_estimations.forEach(value => {
				if(value.account_type_number >= 100 && value.account_type_number <= 105){
					g[value.account_type_number] = new BudgetPerformanceModel({
						uuid: value.account_type_number,
						name: value.name,
						local_name: value.local_name,
						order: OrderNumberPL[value.account_type_number],
					});
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
								/* Budget */
								parent.budget_month += entry.budget_month;
								parent.budget_ytd += entry.budget_ytd;
								parent.budget_whole += entry.budget_whole;

								/* Actual */
								parent.actual_month += entry.actual_month;
								parent.actual_ytd += entry.actual_ytd;
								parent.actual_whole += entry.actual_whole;

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

			/* Other Groups */
			/* Gross Profit */
			let revenue = this.getEntry(entries, AccountTypeCode.REVENUE),
				costOfSale = this.getEntry(entries, AccountTypeCode.COGS),
				grossProfit = entries.find((i)=>i.uuid === AccountTypeCode.GROSS_PROFIT);

			/* EBITDA */
			let salaryBenefit = this.getEntry(entries, AccountTypeCode.SALARY_BENEFIT),
				saleMarketing = this.getEntry(entries, AccountTypeCode.SALE_MARKETING),
				researchProductDevelopment = this.getEntry(entries, AccountTypeCode.RESEARCH_PRODUCT_DEVELOPMENT),
				legalProfessionalFee = this.getEntry(entries, AccountTypeCode.LEGAL_PROFESSIONAL_FEE),
				generalAdminExpenses = this.getEntry(entries, AccountTypeCode.GENERAL_ADMIN_EXPENSE),
				operatingExpenses = entries.find((i)=>i.uuid === AccountTypeCode.OPERATING_EXPENSE),
				otherRevenue = this.getEntry(entries, AccountTypeCode.OTHER_REVENUE),
				operatingIncomeEBITDA = entries.find((i)=>i.uuid === AccountTypeCode.OPERATING_INCOME_EBITDA);

			/* EBIT */
			let depreciation = this.getEntry(entries, AccountTypeCode.DEPRECIATION),
				otherExpenses = this.getEntry(entries, AccountTypeCode.OTHER_EXPENSE),
				earningBeforeInterestAndTaxEBIT = entries.find((i)=>i.uuid === AccountTypeCode.EARNING_BEFORE_INTEREST_AND_TAX_EBIT);

			/* Profit Before Tax */
			let financingCost = this.getEntry(entries, AccountTypeCode.FINANCING_COST),
				profitBeforeTax = entries.find((i)=>i.uuid === AccountTypeCode.PROFIT_BEFORE_TAX);

			/* Profit For The Period */
			let taxRelatedExpenses = this.getEntry(entries, AccountTypeCode.TAX),
				profitForThePeriod = entries.find((i)=>i.uuid === AccountTypeCode.PROFIT_FOR_THE_PERIOD);

			/* BUDGET */
			/* Budget Month */
			grossProfit.budget_month = revenue.budget_month - costOfSale.budget_month;
			operatingExpenses.budget_month = salaryBenefit.budget_month + saleMarketing.budget_month + researchProductDevelopment.budget_month + legalProfessionalFee.budget_month + generalAdminExpenses.budget_month;
			operatingIncomeEBITDA.budget_month = (grossProfit.budget_month + otherRevenue.budget_month) - operatingExpenses.budget_month;
			earningBeforeInterestAndTaxEBIT.budget_month = operatingIncomeEBITDA.budget_month - depreciation.budget_month - otherExpenses.budget_month;
			profitBeforeTax.budget_month = earningBeforeInterestAndTaxEBIT.budget_month - financingCost.budget_month;
			profitForThePeriod.budget_month = profitBeforeTax.budget_month - taxRelatedExpenses.budget_month;

			/* Budget YTD */
			grossProfit.budget_ytd = revenue.budget_ytd - costOfSale.budget_ytd;
			operatingExpenses.budget_ytd = salaryBenefit.budget_ytd + saleMarketing.budget_ytd + researchProductDevelopment.budget_ytd + legalProfessionalFee.budget_ytd + generalAdminExpenses.budget_ytd;
			operatingIncomeEBITDA.budget_ytd = (grossProfit.budget_ytd + otherRevenue.budget_ytd) - operatingExpenses.budget_ytd;
			earningBeforeInterestAndTaxEBIT.budget_ytd = operatingIncomeEBITDA.budget_ytd - depreciation.budget_ytd - otherExpenses.budget_ytd;
			profitBeforeTax.budget_ytd = earningBeforeInterestAndTaxEBIT.budget_ytd - financingCost.budget_ytd;
			profitForThePeriod.budget_ytd = profitBeforeTax.budget_ytd - taxRelatedExpenses.budget_ytd;

			/* Budget Whole */
			grossProfit.budget_whole = revenue.budget_whole - costOfSale.budget_whole;
			operatingExpenses.budget_whole = salaryBenefit.budget_whole + saleMarketing.budget_whole + researchProductDevelopment.budget_whole + legalProfessionalFee.budget_whole + generalAdminExpenses.budget_whole;
			operatingIncomeEBITDA.budget_whole = (grossProfit.budget_whole + otherRevenue.budget_whole) - operatingExpenses.budget_whole;
			earningBeforeInterestAndTaxEBIT.budget_whole = operatingIncomeEBITDA.budget_whole - depreciation.budget_whole - otherExpenses.budget_whole;
			profitBeforeTax.budget_whole = earningBeforeInterestAndTaxEBIT.budget_whole - financingCost.budget_whole;
			profitForThePeriod.budget_whole = profitBeforeTax.budget_whole - taxRelatedExpenses.budget_whole;

			/* ACTUAL */
			/* Actual Month */
			grossProfit.actual_month = revenue.actual_month - costOfSale.actual_month;
			operatingExpenses.actual_month = salaryBenefit.actual_month + saleMarketing.actual_month + researchProductDevelopment.actual_month + legalProfessionalFee.actual_month + generalAdminExpenses.actual_month;
			operatingIncomeEBITDA.actual_month = (grossProfit.actual_month + otherRevenue.actual_month) - operatingExpenses.actual_month;
			earningBeforeInterestAndTaxEBIT.actual_month = operatingIncomeEBITDA.actual_month - depreciation.actual_month - otherExpenses.actual_month;
			profitBeforeTax.actual_month = earningBeforeInterestAndTaxEBIT.actual_month - financingCost.actual_month;
			profitForThePeriod.actual_month = profitBeforeTax.actual_month - taxRelatedExpenses.actual_month;

			/* Actual YTD */
			grossProfit.actual_ytd = revenue.actual_ytd - costOfSale.actual_ytd;
			operatingExpenses.actual_ytd = salaryBenefit.actual_ytd + saleMarketing.actual_ytd + researchProductDevelopment.actual_ytd + legalProfessionalFee.actual_ytd + generalAdminExpenses.actual_ytd;
			operatingIncomeEBITDA.actual_ytd = (grossProfit.actual_ytd + otherRevenue.actual_ytd) - operatingExpenses.actual_ytd;
			earningBeforeInterestAndTaxEBIT.actual_ytd = operatingIncomeEBITDA.actual_ytd - depreciation.actual_ytd - otherExpenses.actual_ytd;
			profitBeforeTax.actual_ytd = earningBeforeInterestAndTaxEBIT.actual_ytd - financingCost.actual_ytd;
			profitForThePeriod.actual_ytd = profitBeforeTax.actual_ytd - taxRelatedExpenses.actual_ytd;

			/* Actual Whole */
			grossProfit.actual_whole = revenue.actual_whole - costOfSale.actual_whole;
			operatingExpenses.actual_whole = salaryBenefit.actual_whole + saleMarketing.actual_whole + researchProductDevelopment.actual_whole + legalProfessionalFee.actual_whole + generalAdminExpenses.actual_whole;
			operatingIncomeEBITDA.actual_whole = (grossProfit.actual_whole + otherRevenue.actual_whole) - operatingExpenses.actual_whole;
			earningBeforeInterestAndTaxEBIT.actual_whole = operatingIncomeEBITDA.actual_whole - depreciation.actual_whole - otherExpenses.actual_whole;
			profitBeforeTax.actual_whole = earningBeforeInterestAndTaxEBIT.actual_whole - financingCost.actual_whole;
			profitForThePeriod.actual_whole = profitBeforeTax.actual_whole - taxRelatedExpenses.actual_whole;

			/* Find Percentage = Actual / Budget */
			entries.forEach(value => {
				value.month_percentage = this.findPercentage(value.actual_month, value.budget_month);
				value.ytd_percentage = this.findPercentage(value.actual_ytd, value.budget_ytd);
				value.whole_percentage = this.findPercentage(value.actual_whole, value.budget_whole);
			});

			/* BIND STATMENT */
			this.statementList = entries;
			this.generateColumn();

			this.showLoading = false;
		},
		getEntry(entries, id){
			return new BudgetPerformanceModel(entries.find(i=>i.uuid === id));
		},
		findPercentage (value1, value2) {
			let result = 0;
			if(value2 !== 0){
				result = value1 / value2;
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
				if(dataItem.get("hasChildren") || dataItem.uuid >= 100){
					row.css("font-weight", "bold");
				}
			}
		},
		// Generate Columns
		generateColumn () {
			let headerAttributes = {
					"class": "table-header-cell",
					style: "text-align: center; font-size: 14px"
				},
				subHeaderAttributes = {
					"class": "table-header-cell",
					style: "text-align: right; font-size: 14px"
				},
				attributes = {
					"class": "table-cell",
					style: "text-align: right; font-size: 14px"
				};

			/* Columns */
			let columns = [
				{ 
					field: this.fieldName, 
					title: i18n.t('account'),
					template: this.nameTmpl,
					locked: true,
					width:300
				},
				/* Selected Month */
				{ 
					title: kendo.toString(new Date(this.monthOf), 'MMMM yyyy'),
					headerAttributes : headerAttributes,
					columns: [
						{ 
							field: "budget_month",
							title: i18n.t('budget'),
							format: "{0:n}",
							width:150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						},
						{ 
							field: "actual_month",
							title: i18n.t('actual'),
							format: "{0:n}",
							width:150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						},
						{ 
							field: "month_percentage",
							title: "%",
							format: "{0:p}",
							width:150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						}
					]
				},
				/* YTD(up to selected month) */
				{ 
					title: i18n.t('ytd_up_to_selected_month'),
					headerAttributes : headerAttributes,
					columns: [
						{ 
							field: "budget_ytd",
							title: i18n.t('budget'),
							format: "{0:n}",
							width:150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						},
						{ 
							field: "actual_ytd",
							title: i18n.t('actual'),
							format: "{0:n}",
							width:150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						},
						{ 
							field: "ytd_percentage",
							title: "%",
							format: "{0:p}",
							width:150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						}
					]
				},
				/* Whole Year */
				{ 
					title: i18n.t('whole_year'),
					headerAttributes : headerAttributes,
					columns: [
						{ 
							field: "budget_whole",
							title: i18n.t('budget'),
							format: "{0:n}",
							width:150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						},
						{ 
							field: "actual_whole",
							title: i18n.t('actual'),
							format: "{0:n}",
							width:150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						},
						{ 
							field: "whole_percentage",
							title: "%",
							format: "{0:p}",
							width:150,
							headerAttributes: subHeaderAttributes,
							attributes: attributes,
						}
					]
				},
			]

			/* Set Columns */
			this.columns = columns;
		},
		// On Reporint Language Changes
		onReportingLanguageChanges () {
			this.fieldName = "name";
			if(this.reportingLanguage === "local"){
				this.fieldName = "local_name";
			}

			// Generate column with new language
			this.generateColumn();
		},
		/* Templates */
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
	},
	computed: mapState({
		accounts: state => state.accounting.accounts
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
