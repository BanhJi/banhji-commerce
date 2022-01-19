<template>
	<v-app>
		<v-container>
			<v-row>
				<v-col cols="12" sm="12">
					<v-form ref="form" v-model="valid" lazy-validation>
						<v-card
							outlined
							dense
							class="pa-4 no_border rounded-sm"
							color="white"
						>
							<v-card outlined dense class="no_border">
								<h2 class="mb-0">{{ $t("reimbursement") }}</h2>
								<v-icon
									onclick="window.history.go(-1); return false;"
									style="cursor: pointer; color: #333; font-size: 40px;"
									class="float-right"
									>close
								</v-icon>
							</v-card>

							<v-card outlined dense class="px-3 no_border" color="grayBg">
								<v-row>
									<v-col sm="4" cols="12" class="pb-0">
										<label class="label">{{ $t("employee") }}</label>
										<div v-if="!isEdit">
											<!-- New Mode -->
											<app-employee-dropdownlist
												:initEmployee="employee"
												@emitEmployee="employee = $event"
												@onChanged="onEmployeeChanges"
											/>
										</div>
										<div v-else>
											<!-- Edit Mode -->
											<v-text-field
												v-model="reimbursement.payer.name"
												outlined
												readonly
											/>
										</div>

										<label class="label">{{ $t("date") }}</label>
										<app-datepicker
											:initialDate="reimbursementDate"
											@emitDate="reimbursementDate = $event"
											@onChanged="onDateChanges"
										/>
										
										<label class="label">{{ $t("number") }}</label>
										<v-row>
											<v-col sm="10" cols="10" class="pb-0 pt-1 pr-0">
												<v-text-field
													v-model="reimbursement.number"
													outlined
													:rules="[(v) => !!v || 'Number is required']"
													readonly
													required
												/>
											</v-col>
											<v-col sm="2" cols="2" class="pb-0 pt-1 pl-1">
												<v-icon
													color="black"
													size="30"
													class="border_qrcode"
													@click="generateNumber"
													>mdi-qrcode</v-icon
												>
											</v-col>
										</v-row>
									</v-col>
									<v-col sm="4" cols="12" class="pb-0">
										<label class="label">{{ $t("segment") }}</label>
										<div v-if="!isEdit">
											<!-- New Mode -->
											<app-segment-dropdownlist
												:initDisabled="employee.id === ''"
												:initSegment="segment"
												@emitSegment="segment = $event"
												@onChanged="filterClearingTransaction"
											/>
										</div>
										<div v-else>
											<!-- Edit Mode -->
											<v-text-field v-model="segment.name" outlined readonly />
										</div>

										<label class="label">{{ $t("location") }}</label>
										<div v-if="!isEdit">
											<!-- New Mode -->
											<app-location-dropdownlist
												:initDisabled="employee.id === ''"
												:initLocation="location"
												@emitLocation="location = $event"
												@onChanged="filterClearingTransaction"
											/>
										</div>
										<div v-else>
											<!-- Edit Mode -->
											<v-text-field v-model="location.name" outlined readonly />
										</div>

										<label class="label">{{ $t("project") }}</label>
										<div v-if="!isEdit">
											<!-- New Mode -->
											<app-project-dropdownlist
												:initDisabled="employee.id === ''"
												:initProject="project"
												@emitProject="project = $event"
												@onChanged="filterClearingTransaction"
											/>
										</div>
										<div v-else>
											<!-- Edit Mode -->
											<v-text-field v-model="project.name" outlined readonly />
										</div>
									</v-col>
									<v-col sm="4" cols="12" class="pb-0">
										<label class="label">{{ $t("description") }}</label>
										<v-textarea
											class=" mt-1"
											no-resize
											height="120px"
											v-model="reimbursement.description"
											outlined
											rows="4"
											:placeholder="$t('transaction_purpose')"
										/>

										<label class="label">{{ $t("currency") }}</label>
										<app-currency-dropdownlist
											:initCurrency="currency"
											@emitCurrency="currency = $event"
											@onChanged="getExchangeRate"
										/>
									</v-col>
								</v-row>
							</v-card>

							<v-card outlined dense class="no_border" color="white">
								<v-row style="">
									<v-col sm="12" cols="12" class="pb-0">
										<p>{{ $t("purchase_trans_reimbursement") }}</p>

										<kendo-datasource
											ref="transactionDS"
											:data="clearingTransactionGrouped"
											:pageSize="5"
											:schema="schemaDefinition"
										/>

										<kendo-grid
											id="transactionGrid"
											ref="transactionGrid"
											class="grid-function"
											:data-source-ref="'transactionDS'"
											:sortable="true"
											:noRecords="true"
											:resizable="true"
											:persistSelection="true"
											:column-menu="true"
											:scrollable-virtual="true"
											:change="onTxnGridChanges"
										>
											<kendo-grid-column :selectable="true" :width="40" />
											<!-- <kendo-grid-column
												:title="$t('no.')"
												:template="rowNumberTmpl"
												:width="45"
												:column-menu="false"
												:headerAttributes="{
													style: 'background-color: #EDF1F5;',
													class: 'text-products;',
												}"
												:attributes="{
													style: 'text-align: products',
												}"
											/> -->
											<kendo-grid-column
												:field="'number'"
												:title="$t('number')"
												:width="250"
											/>
											<kendo-grid-column
												:field="'name'"
												:title="$t('vendor')"
												:width="250"
											/>
											<kendo-grid-column
												:field="'amount'"
												:title="$t('amount')"
												:format="'{0:n}'"
												:width="250"
												:attributes="{ style: 'text-align: right; ' }"
											/>
											<kendo-grid-column
												:field="'currency'"
												:title="$t('currency')"
												:template="'#=currency.code#'"
												:width="250"
												:attributes="{ style: 'text-align: right; ' }"
											/>
											<kendo-grid-column
												:field="'exchanged_amount'"
												:title="$t('exchange_amount')"
												:width="250"
												:attributes="{ style: 'text-align: right; ' }"
											/>
										</kendo-grid>

										<v-row style="background-color: #fff;">
											<v-col sm="6" cols="12" class="pb-0">
												<template>
													<v-file-input
														class="mt-0 pt-0 "
														sm="3"
														cols="6"
														:placeholder="$t('attachment')"
														multiple
														prepend-icon="mdi-paperclip"
													>
														<template v-slot:selection="{ text }">
															<v-chip small label color="primary">
																{{ text }}
															</v-chip>
														</template>
													</v-file-input>
												</template>
											</v-col>
											<v-col sm="6" cols="12" class=" pb-0 pt-5 pr-5">
												<p>
													<span class="float-left">{{ $t("total") }}</span>
													<span class="float-right text-bold">{{
														transactionAmount
													}}</span>
												</p>
											</v-col>
										</v-row>
									</v-col>
									<v-col sm="12" cols="12" class="pt-0">
										<v-card
											outlined
											dense
											class="px-3 pb-3 no_border"
											color="grayBg"
										>
											<v-row>
												<v-col sm="12" cols="12" class="pb-0">
													<p>{{ $t("cash_use_reimbursement") }}</p>
													<kendo-datasource
														ref="cashAccountEntryDS"
														:data="cashAccountEntries"
														:change="onCashDSChanges"
													/>

													<kendo-grid
														id="cashGrid"
														ref="cashGrid"
														class="grid-function"
														:data-source-ref="'cashAccountEntryDS'"
														:sortable="true"
														:filterable="true"
														:noRecords="true"
														:column-menu="true"
														:editable="true"
														:scrollable-virtual="true"
													>
														<kendo-grid-column
															:title="$t('no.')"
															:template="rowNumberTmpl"
															:width="45"
															:column-menu="false"
															:headerAttributes="{
																style: 'background-color: #EDF1F5;',
																class: 'text-products;',
															}"
															:attributes="{
																style: 'text-align: products',
															}"
														/>
														<!-- <kendo-grid-column
															:field="''"
															:title="$t('payment_option')"
															:width="150"
															:headerAttributes="{
																style: 'background-color: #EDF1F5',
															}"
														/> -->
														<kendo-grid-column
															:field="'account'"
															:title="$t('account')"
															:template="this.$store.state.accounting.accountLanguage === 'English' ? '<span>#=account.name#</span>' : '<span>#=account.local_name#</span>' "
															:editor="CashAccountEditor"
															:headerAttributes="{
																style: 'background-color: #EDF1F5',
															}"
														/>
														<kendo-grid-column
															:field="'secondary_account'"
															:title="$t('s_account')"
															:template="
																this.$store.state.accounting.accountLanguage ===
																'English'
																	? '<span>#=secondary_account.number#</span> <span>#=secondary_account.name#</span>'
																	: '<span>#=secondary_account.number#</span> <span>#=secondary_account.local_name#</span>'
															"
															:width="200"
															:hidden="!this.$store.state.accounting.secondaryAccount"
															:editor="AccountSecondaryEditor"
															:headerAttributes="{
																style: 'background-color: #EDF1F5',
															}"
														/>
														<kendo-grid-column
															:field="'name'"
															:title="$t('ref')"
															:width="220"
															:headerAttributes="{
																style: 'background-color: #EDF1F5;',
															}"
														/>
														<kendo-grid-column
															:field="'amount'"
															:title="$t('amount')"
															:format="'{0:n}'"
															:width="180"
															:headerAttributes="{
																style:
																	'text-align: right; background-color: #EDF1F5;',
															}"
															:attributes="{ style: 'text-align: right; ' }"
														/>
														<kendo-grid-column
															:command="{
																iconClass: 'k-icon k-i-trash',
																text: ' ',
																click: removeRowCash,
																class: 'btn-plus',
															}"
															:width="80"
															:headerAttributes="{
																style:
																	'text-align: right; background-color: #EDF1F5;',
															}"
														/>
													</kendo-grid>
												</v-col>
												<v-col sm="6" cols="12" class="pb-0">
													<v-btn
														color="primary"
														class="float-left btn_plus rounded-0 white--text"
														@click="addRow"
													>
														<v-icon size="" class="ma-1">mdi-plus</v-icon>
													</v-btn>
												</v-col>
												<v-col sm="6" cols="12" class=" pb-0 pt-5">
													<table width="100%">
														<tr>
															<td align="left">{{ $t("total") }}</td>
															<td class="text-bold" align="right">
																{{ Number(cashAmount).toLocaleString() }}
															</td>
														</tr>
														<tr>
															<td align="left">
																{{ $t("total_in_exchanged") }}
															</td>
															<td class="text-bold" align="right">
																{{ cashExchangedAmount }}
															</td>
														</tr>
													</table>
												</v-col>
											</v-row>
										</v-card>
									</v-col>
								</v-row>
							</v-card>

							<v-divider />
							<v-card outlined dense class="no_border function_footer">
								<!-- Warning Message -->
								<v-alert type="warning" v-model="alert" dismissible>
									<span v-html="errorMessage" />
								</v-alert>

								<v-menu>
									<template v-slot:activator="{ on }">
										<v-btn
											color="black"
											outlined
											class="mr-2 text-capitalize  black--text float-left"
											v-on="on"
										>
											{{ $t("select_template") }}
											<v-icon size="" class="ma-1">expand_more</v-icon>
										</v-btn>
									</template>
									<v-list>
										<v-list-item
											v-for="(item, index) in templates"
											:key="index"
										>
											<v-list-item-title>{{ item.title }}</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>
								<v-btn
									color="black"
									class="text-capitalize  white--text float-left"
									@click="cancel"
									>{{ $t("cancel") }}</v-btn
								>
								<v-menu>
									<template v-slot:activator="{ on }">
										<v-btn
											color="primary"
											class="ml-2 float-right text-capitalize  white--text"
											v-on="on"
										>
											{{ $t("save_option") }}
											<v-icon size="" class="ma-1">expand_more</v-icon>
										</v-btn>
									</template>
									<v-list rounded>
										<v-list-item-group>
											<v-list-item v-if="!isEdit">
												<v-list-item-content>
													<v-list-item-title
														@click="onSaveOptionClick(SaveOption.SAVENEW)"
														>{{ $t("save_new") }}</v-list-item-title
													>
												</v-list-item-content>
											</v-list-item>
											<v-list-item>
												<v-list-item-content>
													<v-list-item-title
														@click="onSaveOptionClick(SaveOption.SAVEPRINT)"
														>{{ $t("save_print") }}</v-list-item-title
													>
												</v-list-item-content>
											</v-list-item>
											<v-list-item v-if="!isEdit">
												<v-list-item-content>
													<v-list-item-title
														@click="onSaveOptionClick(SaveOption.SAVEDRAFT)"
														>{{ $t("save_draft") }}</v-list-item-title
													>
												</v-list-item-content>
											</v-list-item>
										</v-list-item-group>
									</v-list>
								</v-menu>
								<v-btn
									color="secondary"
									class="float-right  white--text text-capitalize "
									@click="onSaveOptionClick(SaveOption.SAVECLOSE)"
									>{{ $t("save_close") }}</v-btn
								>
							</v-card>
						</v-card>
					</v-form>
				</v-col>
			</v-row>
			<LoadingMe
				:isLoading="showLoading"
				:fullPage="true"
				:myLoading="true"
				:alertMessage="loadingAlert"
				:color="loadingColorAlert"
				:alertText="loadingTextAlert"
			/>
		</v-container>
	</v-app>
</template>

<script>
import kendo from "@progress/kendo-ui";
import { i18n } from "@/i18n";
import Helper from "@/helper.js";
import {
	ReimbursementModel,
	ReimbursementDetailModel,
	JournalModel,
	JournalEntryModel,
	AccountModel,
	SegmentModel,
	LocationModel,
	ProjectModel,
	EmployeeModel,
	CurrencyModel,
	ExchangeRateModel,
	ContactModel,
} from "@/scripts/model/AppModels";
import ResponseDataModel from "@/scripts/model/ResponseData";
import AccountSecondaryEditor from "@/scripts/kendo_editor/AccountSecondary";

/* Store */
import store from "@/store";
const institute = store.state.institute.institute;
import { mapState } from 'vuex';

const { reimbursementHandler } = require("@/scripts/AppHandlers");
const clearingTransactionHandler = require("@/scripts/handler/workingcapital/clearingTransactionHandler.js");
const { CashAccountEditor } = require("@/scripts/kendo_editor/Collections");
const {
	SaveOption,
	EntityType,
	AccountTypeCode,
} = require("@/scripts/default_setup/Collections");

export default {
	name: "Reimbursement",
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-datepicker": () =>
			import("@/components/custom_templates/DatePickerComponent"),
		"app-employee-dropdownlist": () =>
			import("@/components/dropdownlist/Employee"),
		"app-currency-dropdownlist": () =>
			import("@/components/dropdownlist/Currency"),
		"app-segment-dropdownlist": () =>
			import("@/components/dropdownlist/Segment"),
		"app-location-dropdownlist": () =>
			import("@/components/dropdownlist/Location"),
		"app-project-dropdownlist": () =>
			import("@/components/dropdownlist/Project"),
	},
	props: {
		initReimbursement: {
			type: ReimbursementModel,
		},
	},
	data: () => ({
		// Obj
		reimbursement: new ReimbursementModel(),
		journal: new JournalModel(),
		journalEntries: [],
		segment: new SegmentModel(),
		location: new LocationModel(),
		project: new ProjectModel(),
		employee: new EmployeeModel(),
		currency: new CurrencyModel(institute.baseCurrency),
		exchangeRate: new ExchangeRateModel(institute.baseCurrency),
		cashAccountEntries: [],
		selectedTransactionIds: [],
		clearingTransactions: [],
		clearingTransactionGrouped: [],
		// Other
		reimbursementDate: new Date().toISOString().substr(0, 10),
		cashAmount: 0,
		cashExchangedAmount: 0,
		transactionAmount: 0,
		preventLoadClearingTransaction: false,
		templates: [],
		user: Helper.getUser(),
		// Editors
		CashAccountEditor: CashAccountEditor,
		AccountSecondaryEditor : AccountSecondaryEditor,
		// Form validation
		valid: true,
		isEdit: false,
		alert: false,
		errorMessage: "",
		saveMode: "",
		SaveOption: SaveOption,
		// LoadingMe
		showLoading: false,
		loadingAlert: false,
		loadingColorAlert: "",
		loadingTextAlert: "",
		// Kendo dataSource
		schemaDefinition: {
			model: { id: "uuid" },
		},
	}),
	methods: {
		// Initial Data
		initialData() {
			if (this.initReimbursement) {
				// Edit Mode
				this.reimbursement = this.initReimbursement;
				this.bindData();
			} else {
				// Brand New Mode
				this.setDefaultData();
			}
		},
		// Set default data
		setDefaultData() {
			// Brand New Mode
			this.isEdit = false;

			this.reimbursement = new ReimbursementModel({
				reimbursement_date: new Date().toISOString().substr(0, 10),
			});

			// Generate Number
			this.generateNumber();

			// Add 2 default lines
			this.addRow();
			this.addRow();
		},
		// Bind data from prop for edit mode
		async bindData() {
			// Edit Mode
			this.isEdit = true;

			// Date
			this.reimbursementDate = this.reimbursement.reimbursement_date;

			// Currency
			this.currency = new CurrencyModel(this.reimbursement.currency);
			this.exchangeRate = new ExchangeRateModel(this.reimbursement.currency);
			this.exchangeRate.id = this.reimbursement.details[0].exchange_rate_uuid;
			this.exchangeRate.rate = this.reimbursement.details[0].exchange_rate;

			// Employe
			this.employee = new EmployeeModel(this.reimbursement.payer);

			/* Segment */
			await this.$store.dispatch("segments/getList");
			this.segment = new SegmentModel(
				this.segments.find((i) => i.id === this.reimbursement.segment_uuid)
			);

			/* Location */
			await this.$store.dispatch("locations/getList");
			this.location = new LocationModel(
				this.locations.find((i) => i.id === this.reimbursement.location_uuid)
			);

			/* Project */
			await this.$store.dispatch("projects/getList");
			this.project = new ProjectModel(
				this.projects.find((i) => i.id === this.reimbursement.project_uuid)
			);

			// Clearing transaction
			this.clearingTransactions = this.reimbursement.expenses;
			this.clearingTransactionGrouped = Helper.groupExpenseByEmployee(
				this.reimbursement.expenses
			);

			let selectedIds = [],
				grid = this.$refs.transactionGrid.kendoWidget();
			this.reimbursement.expenses.forEach((value) => {
				selectedIds.push(value.uuid);
				// grid._selectedIds[value.uuid] = true;
			});
			this.selectedTransactionIds = selectedIds;

			// Hide Column Checkbox
			grid.hideColumn(0);

			let secondaryAccounts = await this.$store.dispatch("accounting/getSecondaryAccounts"),
				cashAccounts = []; //, cashAmount = 0, cashExchangedAmount = 0;
			this.reimbursement.details.forEach((value) => {
				// Transaction
				// if(value.account.number === AccountTypeCode.ADVANCE_SETTLEMENT_CLEARING_CODE){
				// 	this.transactionAmount =+ value.exchanged_amount;
				// }

				// Cash Account
				if (~AccountTypeCode.CASH_ACCOUNTS.indexOf(value.account.account_type.number)) {
					let ca = new ReimbursementDetailModel(value);
					ca.amount = Math.abs(value.amount);
					// cashAmount += ca.amount;

					/* Secondary Account */
					ca.secondary_account = new AccountModel(
						secondaryAccounts.find((i) => i.uuid === value.secondary_acc_uuid)
					);

					ca.exchanged_amount = Math.abs(value.exchanged_amount);
					// cashExchangedAmount += ca.exchanged_amount;

					cashAccounts.push(ca);
				}
			});
			this.cashAccountEntries = cashAccounts;
			// this.cashAmount = cashAmount;
			// this.cashExchangedAmount = cashExchangedAmount;

			//Journal
			this.journal = this.reimbursement.journal;
			this.journalEntries = this.reimbursement.journal_entries;
		},
		// Number
		async generateNumber() {
			if (!this.isEdit) {
				let num = await Helper.generateAccountingNumber(
					EntityType.REIMBURSEMENT,
					this.reimbursementDate
				);

				this.reimbursement.number = num.number;
				this.reimbursement.prefix_format = num.prefix_format;
			}
		},
		// Get Exchange Rate
		async getExchangeRate() {
			if (this.reimbursementDate && this.currency.code !== "") {
				this.exchangeRate = await Helper.getLastExchangeRateByDate(
					this.reimbursementDate,
					this.currency.code
				);
			} else {
				this.exchangeRate = new ExchangeRateModel(institute.baseCurrency);
			}

			// Trigger datasource with new exchange rate
			this.dataSourceAutoCalculate();
		},
		/* On Date Chanes */
		onDateChanges () {
			this.getExchangeRate();
			this.generateNumber();
		},
		/* Kendo */
		// DataSource Changes
		onCashDSChanges(e) {
			if (e.field) {
				let dataRow = e.items[0];

				if (e.field === "account") {
					dataRow.set("account_uuid", dataRow.account.uuid);

					this.addExtraRow(dataRow.uid);
				} else if (e.field === "secondary_account") {
					if (dataRow.secondary_account !== null) {
						dataRow.set("secondary_acc_uuid", dataRow.secondary_account.uuid);
					} else {
						// Set default when deselect
						dataRow.set("secondary_acc_uuid", "");
						dataRow.set("secondary_account", new AccountModel());
					}
				}

				this.dataSourceAutoCalculate();
			}
		},
		// On Transaction Grid Changes
		onTxnGridChanges() {
			let grid = this.$refs.transactionGrid.kendoWidget();

			// let ids = []
			// for (let id in grid._selectedIds)
			// ids.push(id)

			this.selectedTransactionIds = grid.selectedKeyNames();
			this.dataSourceAutoCalculate();
		},
		// On Transaction Master Checkbox Click
		onMasterCheckboxClicks() {
			let grid = this.$refs.transactionGrid.kendoWidget();

			let oldPageSize = grid.dataSource.pageSize();
			grid.dataSource.pageSize(grid.dataSource.data().length);

			if (grid.dataSource.data().length === grid.select().length) {
				grid.clearSelection();
			} else {
				grid.select("tr");
			}

			grid.dataSource.pageSize(oldPageSize);
		},
		/* On Employee Changes */
		onEmployeeChanges() {
			this.clearingTransactions = [];
			this.clearingTransactionGrouped = [];
			this.segment = new SegmentModel();
			this.location = new LocationModel();
			this.project = new ProjectModel();

			if (this.employee.id !== "") {
				this.loadClearingTransaction();
			}
		},
		// Load Clearing Transaction by Employee
		loadClearingTransaction() {
			clearingTransactionHandler
				.getByEmployeeId(this.employee.id)
				.then((res) => {
					let responseData = new ResponseDataModel(res);
					this.clearingTransactions = responseData.data;
				});
		},
		/* Filter Clearing Transactions */
		filterClearingTransaction() {
			let txns = this.clearingTransactions.filter(
				(item) => item.segment_uuid === this.segment.id && item.location_uuid === this.location.id && item.project_uuid === this.project.id
			);
			this.clearingTransactionGrouped = Helper.groupExpenseByEmployee(txns);
		},
		// Auto Calculating
		dataSourceAutoCalculate() {
			let cashAmount = 0,
				cashExchangedAmount = 0,
				transactionAmount = 0,
				txnDS = this.$refs.transactionDS.kendoWidget(),
				cashAccountEntryDS = this.$refs.cashAccountEntryDS.kendoWidget();

			// Transaction
			for (let i = 0; i < this.selectedTransactionIds.length; i++) {
				let currTxn = txnDS.get(this.selectedTransactionIds[i]);
				transactionAmount += kendo.parseFloat(currTxn.exchanged_amount);
			}

			// Cash
			cashAccountEntryDS.data().forEach((value) => {
				let xamt =
					kendo.parseFloat(value.amount) *
					kendo.parseFloat(this.exchangeRate.rate);

				value.set("exchanged_rate_uuid", this.exchangeRate.id);
				value.set("exchanged_rate", this.exchangeRate.rate);
				value.set("exchanged_amount", xamt);

				cashAmount += kendo.parseFloat(value.amount);
				cashExchangedAmount += xamt;
			});

			this.transactionAmount = transactionAmount;
			this.cashAmount = cashAmount;
			this.cashExchangedAmount = cashExchangedAmount;
		},
		// Row Number Template
		rowNumberTmpl(dataItem) {
			let ds = this.$refs.cashAccountEntryDS.kendoWidget(),
				index = ds.indexOf(dataItem);

			return index + 1;
		},
		// Add New Row
		addRow() {
			let ds = this.$refs.cashAccountEntryDS.kendoWidget(),
				last = ds.total();

			let je = new ReimbursementDetailModel();
			je.uuid = kendo.guid();
			ds.insert(last, je);
		},
		// Add Extra Row
		addExtraRow(uid) {
			let ds = this.$refs.cashAccountEntryDS.kendoWidget(),
				total = ds.total(),
				row = ds.getByUid(uid),
				index = ds.indexOf(row);

			if (index == total - 1) {
				this.addRow();
			}
		},
		// Remove Row
		removeRowCash(e) {
			e.preventDefault();

			let grid = this.$refs.cashGrid.kendoWidget(),
				dataSource = grid.dataSource,
				dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));

			if (dataSource.total() > 2) {
				dataSource.remove(dataItem);
			}
		},
		// Shrink Data
		shrinkData() {
			// Date
			this.reimbursement.reimbursement_date = Helper.toISODate(
				this.reimbursementDate
			);

			// Curency
			this.reimbursement.currency = new CurrencyModel(this.currency);

			// Payer
			this.reimbursement.payer = new ContactModel(this.employee);

			/* Segment */
			this.reimbursement.segment_uuid = this.segment.id;

			/* Location */
			this.reimbursement.location_uuid = this.location.id;

			/* Project */
			this.reimbursement.project_uuid = this.project.id;

			// User
			if (this.isEdit) {
				this.reimbursement.modified_by = this.user;
			} else {
				this.reimbursement.created_by = this.user;
			}

			// Expenses
			let expenses = [],
				details = [],
				cashAccountEntryDS = this.$refs.cashAccountEntryDS.kendoWidget();

			if (this.isEdit) {
				// Edit Mode
				this.reimbursement.details.forEach((value) => {
					if (value.amount > 0) {
						// Filter expenses on Dr side
						details.push(new ReimbursementDetailModel(value));
					}
				});
			} else {
				// New Mode
				this.clearingTransactions.forEach((value) => {
					if (~this.selectedTransactionIds.indexOf(value.uuid)) {
						expenses.push(value);

						//Transaction Clearing Account on Dr
						value.expense_entries.forEach((element) => {
							if (element.account.number === AccountTypeCode.ADVANCE_SETTLEMENT_CLEARING_CODE) {
								details.push(
									new ReimbursementDetailModel({
										uuid: kendo.guid(),
										account: new AccountModel(element.account),
										account_uuid: element.account.uuid,
										secondary_acc_uuid: element.secondary_acc_uuid,
										primary_contact: new ContactModel(this.employee),
										description: this.reimbursement.description,
										currency: new CurrencyModel(element.currency),
										amount: element.amount * -1, // Bong Kethya forced me to do this because original amount is negative
										exchange_rate_uuid: element.exchange_rate_uuid,
										exchange_rate: element.exchange_rate,
									})
								);
							}
						});
					}
				});

				// Expenses
				this.reimbursement.expenses = expenses;
			}

			// Cash Account on Cr
			cashAccountEntryDS.data().forEach((value) => {
				if (value.account.number !== "" && value.amount > 0) {// Filter selected account
					details.push(new ReimbursementDetailModel({
						account: new AccountModel(value.account),
						account_uuid: value.account.uuid,
						secondary_acc_uuid: value.secondary_acc_uuid,
						primary_contact: new ContactModel(this.employee),
						description: this.reimbursement.description,
						ref_number : value.ref_number,
						currency: new CurrencyModel(this.currency),
						amount: value.amount * -1,/* Cr side is negative */
						exchange_rate_uuid: this.exchangeRate.id,
						exchange_rate: kendo.parseFloat(this.exchangeRate.rate),
					}));
				}
			});

			// Reimbursement Details
			this.reimbursement.details = details;
		},
		// Journal
		addJournal() {
			// Journal
			this.journal.number = this.reimbursement.number;
			this.journal.description = this.reimbursement.description;
			this.journal.journal_date = Helper.toISODate(this.reimbursementDate);
			this.journal.journal_type = EntityType.AUTO_JOURNAL;
			this.journal.transaction_type = EntityType.REIMBURSEMENT;
			this.journal.prefix_format = this.reimbursement.prefix_format;
			this.journal.segment_uuid = this.reimbursement.segment_uuid;
			this.journal.is_draft = this.reimbursement.is_draft;
			this.journal.created_by = this.reimbursement.created_by;
			this.journal.modified_by = this.reimbursement.modified_by;

			//Journal Entries
			let entries = [];
			this.reimbursement.details.forEach((value) => {
				let je = new JournalEntryModel(value);
				je.amount = value.exchanged_amount;
				(je.exchange_rate_uuid = ""),
					(je.exchange_rate = 1), // Reimbursement Journal is base currency exchange rate = 1
					entries.push(new JournalEntryModel(je));
			});
			this.journalEntries = entries;
		},
		// Validating
		validateForm() {
			let result = true,
				msg = "",
				countCash = 0,
				secondaryAccountAmount = 0,
				cashDS = this.$refs.cashAccountEntryDS.kendoWidget();

			// Employee
			if (this.employee.id === "") {
				msg += `<p>${i18n.t("employee_is_required")}</p>`;
				result = false;
			}

			// Non Selected Transaction
			if (this.selectedTransactionIds.length === 0) {
				result = false;
				msg += `<p>${i18n.t("please_select_transaction")}</p>`;
			}

			// Non Selected Cash Account and Amount
			cashDS.data().forEach((value, index) => {
				// No account
				if (value.account.name === "" && value.amount > 0) {
					result = false;
					msg += `<p>${i18n.t(
						"please_select_cash_account_at_row_number"
					)} ${index + 1}</p>`;
				}

				// No amount
				if (value.account.name !== "" && value.amount === 0) {
					result = false;
					msg += `<p>${value.account.name} ${i18n.t("has_no_amount")}</p>`;
				}

				// Count Cash Accounts
				if (value.account.name !== "" && value.amount > 0) {
					countCash++;
				}

				/* Secondary Account on Cr */
				if(value.secondary_acc_uuid !== ""){
					secondaryAccountAmount += value.amount * -1;
				}
			});

			/* Secondary Account on Dr */
			this.clearingTransactions.forEach((value) => {
				if (~this.selectedTransactionIds.indexOf(value.uuid)) {
					//Transaction Clearing Account on Dr
					value.expense_entries.forEach((element) => {
						if (element.account.number === AccountTypeCode.ADVANCE_SETTLEMENT_CLEARING_CODE && element.secondary_acc_uuid !== "") {
							secondaryAccountAmount += element.amount * -1;
						}
					});
				}
			});

			// Count Cash Accounts
			if (countCash === 0) {
				result = false;
				msg += `<p>${i18n.t(
					"please_select_cash_account_and_enter_amount"
				)}</p>`;
			}

			// Diff
			if (this.transactionAmount - this.cashExchangedAmount !== 0) {
				result = false;
				msg += `<p>${i18n.t(
					"transaction_amount_and_cash_exchanged_amount_are_not_balance"
				)}</p>`;
			}

			/* Secondary Account Balance */
			if(secondaryAccountAmount !== 0){
				msg += `<p>${i18n.t("secondary_account_unbalance")}</p>`;
				result = false;
			}

			// Show Alert
			this.errorMessage = msg;
			this.alert = false;
			if (result === false) {
				this.alert = true;
			}

			return result;
		},
		// All Saves
		async onSaveOptionClick(mode) {
			if (this.$refs.form.validate() && this.validateForm()) {
				let isValidClosingDate = await Helper.validateClosingDate(
					this.reimbursementDate
				);
				if (isValidClosingDate) {
					this.saveMode = mode;
					this.save();
				}
			}
		},
		cancel() {
			this.$swal({
				title: i18n.t("msg_title_warning"),
				text: i18n.t("msg_discard"),
				icon: "warning",
				showCancelButton: true,
				cancelButtonText: i18n.t("cancel"),
				confirmButtonColor: "#4d4848",
				cancelButtonColor: "#ED1A3A",
				confirmButtonText: i18n.t("discard"),
			}).then((result) => {
				if (result.value) {
					this.clear();
					this.setDefaultData();
					this.$router.go(-1);
				}
			});
		},
		clear() {
			this.isEdit = false;
			this.saveMode = "";

			this.reimbursementDate = new Date().toISOString().substr(0, 10);
			this.cashAmount = 0;
			this.cashExchangedAmount = 0;
			this.transactionAmount = 0;
			this.preventLoadClearingTransaction = false;

			this.reimbursement = new ReimbursementModel();
			this.journal = new JournalModel();
			this.journalEntries = [];
			this.employee = new EmployeeModel();
			this.segment = new SegmentModel();
			this.location = new LocationModel();
			this.project = new ProjectModel();
			this.currency = new CurrencyModel(institute.baseCurrency);
			this.exchangeRate = new ExchangeRateModel(institute.baseCurrency);
			this.selectedTransactionIds = [];

			let txnDS = this.$refs.transactionDS.kendoWidget();
			txnDS.data([]);

			let cashDS = this.$refs.cashAccountEntryDS.kendoWidget();
			cashDS.data([]);
		},
		save() {
			let self = this;

			// Draft Mode
			if (this.saveMode === SaveOption.SAVEDRAFT) {
				this.reimbursement.is_draft = 1;
			} else {
				this.reimbursement.is_draft = 0;
			}

			// Shrink Data
			this.shrinkData();

			// Add Journal
			this.addJournal();

			// Sync Data
			this.showLoading = true;
			reimbursementHandler
				.save({
					reimbursement: new ReimbursementModel(this.reimbursement),
					journal: new JournalModel(this.journal),
					journal_entries: this.journalEntries,
				})
				.then((response) => {
					if (response) {
						self.responseStatus(response);
					}else{
						this.$snotify.error(i18n.t("error_something_wrong"));
					}
				})
				.catch((error) => {
					self.showLoading = false;
					this.$snotify.error(error);
				})
				.finally(() => {
					self.showLoading = false;
				});
		},
		// Response Status
		responseStatus(response) {
			if (response.status === 200) {
				if (this.saveMode === SaveOption.SAVECLOSE || this.saveMode === SaveOption.DELETE) { /* Save Close or Delete */
					if (this.isEdit) {
						let grid = this.$refs.transactionGrid.kendoWidget();
						grid.showColumn(0);
						this.goBackToViewPage();
					} else {
						this.$router.go(-1);
					}
				}
			
				this.clear();

				/* Alert Success */
				this.$snotify.success(i18n.t("successful"));
			} else {
				/* Alert Error */
				this.$snotify.error(i18n.t("error_something_wrong"));
			}
		},
		// Go back to view page after edit mode
		goBackToViewPage() {
			this.$router.replace({
				name: "Reimbursement View",
				params: { initReimbursement: Object.assign({}, new ReimbursementModel(this.reimbursement)) },
			});
		},
	},
	watch: {
		initReimbursement: "initialData",
	},
	computed: mapState({
        segments: state => state.segments.list,
        locations: state => state.locations.list,
		projects: state => state.projects.list,
    }),
	mounted() {
		// Initial Data
		this.initialData();

		// Grid
		let grid = this.$refs.transactionGrid.kendoWidget();
		grid.thead.on("click", ".k-checkbox", this.onMasterCheckboxClicks);
	},
};
</script>

<style scoped>
.function_content {
	padding: 0 25px 25px;
	border-bottom: 0;
}
.attachment_table.theme--light.v-data-table {
	background-color: transparent !important;
}

@media (min-width: 1264px) {
	.container {
		/* max-width: 1185px; */
		max-width: 1080px !important;
	}
}

@media (max-width: 576px) {
	.mb-6 {
		margin-bottom: 0 !important;
	}
}
</style>
