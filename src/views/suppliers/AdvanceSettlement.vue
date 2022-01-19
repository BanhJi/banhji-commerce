<template>
	<v-app>
		<v-container>
			<v-row>
				<v-col cols="12" sm="12">
					<v-card
						outlined
						dense
						class="pa-4 no_border rounded-sm"
						color="white"
					>
						<v-form ref="form" v-model="valid" lazy-validation>
							<v-card outlined dense class="no_border">
								<h2 class="mb-0">{{ $t("advance_settlement") }}</h2>
								<v-icon
									onclick="window.history.go(-1); return false;"
									style="cursor: pointer; color: #333; font-size: 40px;"
									class="float-right"
									>close
								</v-icon>
							</v-card>
							<v-card outlined dense class="px-3 no_border mb-3" color="grayBg">
								<v-row>
									<v-col sm="4" cols="12" class="pb-0">
										<div v-if="!isEdit">
											<!-- New Mode -->
											<label class="label">{{ $t("employee") }}</label>
											<app-employee-dropdownlist
												:initEmployee="employee"
												@emitEmployee="employee = $event"
												@onChanged="loadCashAdvance"
											/>

											<label class="label">{{ $t("advance_number") }}</label>
											<v-select
												class="mt-1"
												:disabled="employee.id === ''"
												:items="cashAdvances"
												item-value="uuid"
												item-text="number"
												v-model="cashAdvance"
												@change="onCashAdvanceChanges"
												no-data-text="No data found."
												:rules="[(v) => !!v || 'Cash Advance is required']"
												placeholder="Select Cash Advance"
												return-object
												outlined
											/>
										</div>
										<div v-else>
											<!-- Edit Mode -->
											<label class="label">{{ $t("employee") }}</label>
											<v-text-field
												v-model="advanceSettlement.settled_by.name"
												outlined
												readonly
											/>

											<label class="label">{{ $t("advance_number") }}</label>
											<v-text-field
												v-model="cashAdvance.number"
												outlined
												readonly
											/>
										</div>
									</v-col>
									<v-col sm="4" cols="12" class="pb-0">
										<label class="label">{{ $t("date") }}</label>
										<app-datepicker
											:initialDate="advanceSettlement.settlement_date"
											@emitDate="advanceSettlement.settlement_date = $event"
											@onChanged="generateNumber"
										/>
										<label class="label">{{ $t("number") }}</label>
										<v-row>
											<v-col sm="10" cols="10" class="pb-0 pt-1 pr-0">
												<v-text-field
													v-model="advanceSettlement.number"
													outlined
													tage="Number"
													:rules="[(v) => !!v || 'Number is required']"
													readonly
													required
												/>
											</v-col>
											<v-col sm="2" cols="2" class="pb-0 pt-1 pl-0">
												<v-icon
													color="black"
													size="30"
													class="border_qrcode"
													@click="generateNumber"
												>
													mdi-qrcode
												</v-icon>
											</v-col>
										</v-row>
									</v-col>
									<v-col sm="4" cols="12" class="pb-0">
										<label class="label">{{ $t("description") }}</label>
										<v-textarea
											class="mt-1"
											no-resize
											height="120px"
											v-model="advanceSettlement.description"
											outlined
											rows="4"
											:placeholder="$t('transaction_purpose')"
										/>
									</v-col>
								</v-row>
							</v-card>

							<v-row>
								<v-col sm="12" cols="12" class="pb-3 pa-3">
									<p>{{ $t("purchase_transactions") }}</p>

									<kendo-datasource
										ref="clearingTransactionDS"
										:data="clearingTransactionGrouping"
									/>

									<kendo-grid
										id="clearingTransactionGrid"
										ref="clearingTransactionGrid"
										class="grid-function"
										:data-source-ref="'clearingTransactionDS'"
										:sortable="true"
										:filterable="true"
										:noRecords="true"
										:column-menu="true"
										:scrollable-virtual="true"
									>
										<kendo-grid-column
											:title="$t('no.')"
											:template="rowNumberTmpl"
											:width="40"
											:column-menu="false"
											:headerAttributes="{
												style: 'background-color: #EDF1F5;',
												class: 'text-products;',
											}"
											:attributes="{
												style: 'text-align: products',
											}"
										/>
										<kendo-grid-column
											:field="'number'"
											:title="$t('number')"
											:width="100"
											:headerAttributes="{
												style: 'background-color: #EDF1F5',
											}"
										/>
										<kendo-grid-column
											:field="'name'"
											:title="$t('supplier')"
											:width="100"
											:headerAttributes="{
												style: 'background-color: #EDF1F5;',
											}"
										/>
										<kendo-grid-column
											:field="'amount'"
											:title="$t('amount')"
											:format="'{0:n}'"
											:width="100"
											:headerAttributes="{
												style: 'text-align: right; background-color: #EDF1F5;',
											}"
											:attributes="{ style: 'text-align: right; ' }"
										/>
										<kendo-grid-column
											:field="'currency'"
											:title="$t('currency')"
											:template="'#=currency.code#'"
											:width="100"
											:headerAttributes="{
												style: 'text-align: right; background-color: #EDF1F5;',
											}"
											:attributes="{ style: 'text-align: right; ' }"
										/>
										<kendo-grid-column
											:field="'exchanged_amount'"
											:title="$t('exchanged_amount')"
											:width="100"
											:headerAttributes="{
												style: 'text-align: right; background-color: #EDF1F5;',
											}"
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
									</v-row>
								</v-col>
								<v-col sm="7" cols="12" class="py-0 pr-0">
									<v-card
										outlined
										dense
										class="px-3 pb-3 no_border"
										color="grayBg"
									>
										<v-row>
											<v-col sm="12" cols="12" class="pb-0">
												<template>
													<v-simple-table class="cash-balance">
														<template v-slot:default>
															<tbody>
																<tr>
																	<td width="200px" class="">
																		{{ $t("advance_amount") }}
																	</td>
																	<td width="200px" style="text-align: right">
																		{{
																			Number(advancedAmount).toLocaleString()
																		}}
																		{{ cashAdvance.currency.code }}
																	</td>
																</tr>
																<tr v-if="showExchangeAmount">
																	<td width="200px" class="">
																		{{ $t("advance_in_exchanged_amount") }}
																	</td>
																	<td width="200px" style="text-align: right">
																		{{
																			Number(
																				advancedExchangeAmount
																			).toLocaleString()
																		}}
																	</td>
																</tr>
																<tr>
																	<td class="">{{ $t("settled_amount") }}</td>
																	<td style="text-align: right">
																		{{ Number(settledAmount).toLocaleString() }}
																	</td>
																</tr>
																<tr v-if="showCashAccount">
																	<td class="">{{ $t("cash_account") }}</td>
																	<td class="hide_form_alert">
																		<app-cash-account-dropdownlist
																			:initAccount="
																				advanceSettlement.cash_account
																			"
																			@emitAccount="
																				advanceSettlement.cash_account = $event
																			"
																		/>
																	</td>
																</tr>
																<tr v-if="$store.state.accounting.secondaryAccount">
																	<td v-if="showCashAccount">{{ $t("secondary_account") }}</td>
																	<td class="hide_form_alert" v-if="showCashAccount">
																		<app-secondary-account-dropdownlist
																			:initPrimaryAccountId="advanceSettlement.cash_account.uuid"
																			:initAccount="secondaryAccount"
																			@emitAccount="secondaryAccount = $event"/>
																	</td>
																</tr>
																<tr>
																	<td>{{ $t("remaining") }}</td>
																	<td style="text-align: right">
																		{{ Number(remaining).toLocaleString() }}
																	</td>
																</tr>
															</tbody>
														</template>
													</v-simple-table>
												</template>
											</v-col>
										</v-row>
									</v-card>
								</v-col>
							</v-row>

							<v-divider class="mt-3" />
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
								>
									{{ $t("cancel") }}
								</v-btn>
								<v-btn
									color="primary"
									class="ml-2 text-capitalize  white--text"
									v-if="isEdit"
									@click="confirmDelete"
									>{{ $t("delete") }}
								</v-btn>
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
														>{{ $t("save_new") }}
													</v-list-item-title>
												</v-list-item-content>
											</v-list-item>
											<v-list-item>
												<v-list-item-content>
													<v-list-item-title
														@click="onSaveOptionClick(SaveOption.SAVEPRINT)"
														>{{ $t("save_print") }}
													</v-list-item-title>
												</v-list-item-content>
											</v-list-item>
											<v-list-item v-if="!isEdit">
												<v-list-item-content>
													<v-list-item-title
														@click="onSaveOptionClick(SaveOption.SAVEDRAFT)"
														>{{ $t("save_draft") }}
													</v-list-item-title>
												</v-list-item-content>
											</v-list-item>
										</v-list-item-group>
									</v-list>
								</v-menu>
								<v-btn
									color="secondary"
									class="float-right  text-capitalize white--text"
									@click="onSaveOptionClick(SaveOption.SAVECLOSE)"
									>{{ $t("save_close") }}
								</v-btn>
							</v-card>
						</v-form>
					</v-card>
				</v-col>
			</v-row>
			<LoadingMe
				:isLoading="showLoading"
				:fullPage="false"
				:myLoading="true"
				:alertMessage="loadingAlert"
				:color="loadingColorAlert"
				:alertText="loadingTextAlert"
			/>
		</v-container>
	</v-app>
</template>

<script>
// import kendo from "@progress/kendo-ui";
import { i18n } from "@/i18n";
import Helper from "@/helper.js";
import {
	AdvanceSettlementModel,
	JournalModel,
	JournalEntryModel,
	AccountModel,
	EmployeeModel,
	CashAdvanceModel,
	CurrencyModel,
	ContactModel,
} from "@/scripts/model/AppModels";
import ResponseDataModel from "@/scripts/model/ResponseData";
import AccountSecondaryEditor from "@/scripts/kendo_editor/AccountSecondary";

/* Store */
import store from "@/store";
const institute = store.state.institute.institute;

const {
	advanceSettlementHandler,
	cashAdvanceHandler,
} = require("@/scripts/AppHandlers");
const clearingTransactionHandler = require("@/scripts/handler/workingcapital/clearingTransactionHandler.js");

const {
	AccountTypeCode,
	SaveOption,
	EntityType,
} = require("@/scripts/default_setup/Collections");

export default {
	name: "AdvanceSettlement",
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-datepicker": () =>
			import("@/components/custom_templates/DatePickerComponent"),
		"app-employee-dropdownlist": () =>
			import("@/components/dropdownlist/Employee"),
		"app-cash-account-dropdownlist": () =>
			import("@/components/dropdownlist/CashAccount"),
		"app-secondary-account-dropdownlist": () => import('@/components/dropdownlist/AccountSecondary'),
	},
	props: {
		initAdvanceSettlement: {
			type: AdvanceSettlementModel,
		},
		initCashAdvance: {
			type: CashAdvanceModel,
		},
		initClearingTransactions: {
			type: Array,
		},
	},
	data: () => ({
		// Obj
		advanceSettlement: new AdvanceSettlementModel(),
		journal: new JournalModel(),
		journalEntries: [],
		employee: new EmployeeModel(),
		clearingTransactionGrouping: [],
		clearingTransactions: [],
		cashAdvance: new CashAdvanceModel(),
		cashAdvances: [],
		secondaryAccount: new AccountModel(),
		// Other
		advancedAmount: 0,
		advancedExchangeAmount: 0,
		settledAmount: 0,
		showExchangeAmount: false,
		showCashAccount: true,
		files: [],
		templates: [],
		user: Helper.getUser(),
		/* Editors */
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
	}),
	methods: {
		// Initial Data
		initialData() {
			if (this.initAdvanceSettlement) {
				// Edit Mode
				this.advanceSettlement = Object.assign({}, this.initAdvanceSettlement);

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

			this.advanceSettlement = new AdvanceSettlementModel({
				settlement_date: new Date().toISOString().substr(0, 10),
			});

			// Generate Number
			this.generateNumber();
		},
		// Bind data from prop for edit mode
		async bindData() {
			// Edit Mode
			this.isEdit = true;

			// Employee
			this.employee = new EmployeeModel(this.advanceSettlement.settled_by);

			// Cash Advance
			this.cashAdvance = new CashAdvanceModel(this.initCashAdvance);

			// Show/Hide exchange amount
			let baseCurrency = new CurrencyModel(institute.baseCurrency);
			this.showExchangeAmount = Boolean(
				this.cashAdvance.currency.code !== baseCurrency.code
			);

			// Clearing Transactions
			this.clearingTransactions = this.initClearingTransactions;
			this.clearingTransactionGrouping = Helper.groupExpenseByCashAdvance(
				this.clearingTransactions
			);
			this.autoCalculate();

			//Journal
			this.journal = this.advanceSettlement.journal;
			this.journalEntries = this.advanceSettlement.journal_entries;
		},
		// Number
		async generateNumber() {
			if (!this.isEdit) {
				let num = await Helper.generateAccountingNumber(
					EntityType.ADVANCE_SETTLEMENT,
					this.advanceSettlement.settlement_date
				);

				this.advanceSettlement.number = num.number;
				this.advanceSettlement.prefix_format = num.prefix_format;
			}
		},
		// Row Number Template
		rowNumberTmpl(dataItem) {
			let ds = this.$refs.clearingTransactionDS.kendoWidget(),
				index = ds.indexOf(dataItem);

			return index + 1;
		},
		// Load Cash Advance
		loadCashAdvance() {
			if (!this.isEdit) {
				this.cashAdvance = new CashAdvanceModel();
				this.cashAdvances = [];

				if (this.employee.id !== "") {
					this.showLoading = true;
					cashAdvanceHandler
						.getByEmployeeId(this.employee.id)
						.then((res) => {
							let responseData = new ResponseDataModel(res);

							let cashAdvanceList = [];
							responseData.data.forEach((value) => {
								cashAdvanceList.push(new CashAdvanceModel(value));
							});
							this.cashAdvances = cashAdvanceList;
						})
						.finally(() => {
							this.showLoading = false;
						});
				}
			}
		},
		// On Cash Advance Changes
		onCashAdvanceChanges() {
			this.clearingTransactionGrouping = [];
			this.clearingTransactions = [];
			this.autoCalculate();

			if (this.cashAdvance.uuid !== "") {
				// Show/Hide exchange amount
				let baseCurrency = new CurrencyModel(institute.baseCurrency);
				this.showExchangeAmount = Boolean(
					this.cashAdvance.currency.code !== baseCurrency.code
				);

				// Load Related Expenses
				this.showLoading = true;
				clearingTransactionHandler
					.getByCashAdvanceId(this.cashAdvance.uuid)
					.then((res) => {
						let responseData = new ResponseDataModel(res);
						this.clearingTransactions = responseData.data;
						this.clearingTransactionGrouping = Helper.groupExpenseByCashAdvance(
							responseData.data
						);
						this.autoCalculate();
					})
					.finally(() => {
						this.showLoading = false;
					});
			}
		},
		// Auto Calculate
		autoCalculate() {
			// Cash Advance Amount
			this.advancedAmount = 0;
			this.advancedExchangeAmount = 0;
			this.cashAdvance.details.forEach((value) => {
				if (value.amount > 0) {
					this.advancedAmount += value.amount;
					this.advancedExchangeAmount += value.exchanged_amount;
				}
			});

			// Transaction Amount
			this.settledAmount = 0;
			this.clearingTransactionGrouping.forEach((value) => {
				this.settledAmount += value.exchanged_amount;
			});

			this.showCashAccount = Boolean(
				this.advancedExchangeAmount - this.settledAmount !== 0
			);
		},
		// Shrink Data
		shrinkData() {
			// Settlement Date
			this.advanceSettlement.settlement_date = Helper.toISODate(
				this.advanceSettlement.settlement_date
			);

			// Employee
			this.advanceSettlement.settled_by = new ContactModel(this.employee);

			// Cash Advance
			this.advanceSettlement.cash_advance_uuid = this.cashAdvance.uuid;

			// Cash Amount
			this.advanceSettlement.cash_amount = this.remaining;

			// Update Cash Advance
			this.cashAdvance.is_settled = 1;
			this.cashAdvance.settled_date = Helper.toISODate(
				this.advanceSettlement.settlement_date
			);

			// User
			if (this.isEdit) {
				this.advanceSettlement.modified_by = this.user;
			} else {
				this.advanceSettlement.created_by = this.user;
			}
		},
		// Add Journal
		addJournal() {
			if (!this.isEdit) {
				// New Mode
				let entries = [];

				// Advance Settlement Clearing Account (From Expense) on Dr
				this.clearingTransactions.forEach((value) => {
					if (
						value.account.number ===
						AccountTypeCode.ADVANCE_SETTLEMENT_CLEARING_CODE
					) {
						entries.push(
							new JournalEntryModel({
								account: new AccountModel(value.account),
								account_uuid: value.account.uuid,
								secondary_acc_uuid: value.secondary_acc_uuid,
								primary_contact: new ContactModel(this.employee),
								description: this.advanceSettlement.description,
								currency: institute.baseCurrency,
								amount: value.exchanged_amount * -1,
								exchange_rate: 1,
							})
						);
					}
				});

				// Cash Account
				if (this.remaining !== 0) {
					entries.push(
						new JournalEntryModel({
							account: new AccountModel(this.advanceSettlement.cash_account),
							account_uuid: this.advanceSettlement.cash_account.uuid,
							secondary_acc_uuid: this.secondaryAccount.uuid,
							primary_contact: new ContactModel(this.employee),
							description: this.advanceSettlement.description,
							currency: institute.baseCurrency,
							amount: this.remaining,
							exchange_rate: 1,
						})
					);
				}

				// Cash Advance on Cr
				this.cashAdvance.details.forEach((value) => {
					if (
						value.account.account_type.code === AccountTypeCode.CASH_ADVANCE
					) {
						entries.push(
							new JournalEntryModel({
								account: new AccountModel(value.account),
								account_uuid: value.account.uuid,
								secondary_acc_uuid: value.secondary_acc_uuid,
								primary_contact: new ContactModel(this.employee),
								description: this.advanceSettlement.description,
								currency: institute.baseCurrency,
								amount: value.exchanged_amount * -1, // Cr side is negative
								exchange_rate: 1,
							})
						);
					}
				});

				// Journal Entries
				this.journalEntries = entries;
			} else {
				// Edit Mode
				this.journalEntries.forEach((value) => {
					if (
						~AccountTypeCode.CASH_ACCOUNTS.indexOf(
							value.account.account_type.code
						)
					) {
						value.account = new AccountModel(
							this.advanceSettlement.cash_account
						);
					}
				});
			}

			// Journal
			this.journal.number = this.advanceSettlement.number;
			this.journal.description = this.advanceSettlement.description;
			this.journal.journal_date = Helper.toISODate(
				this.advanceSettlement.settlement_date
			);
			this.journal.journal_type = EntityType.AUTO_JOURNAL;
			this.journal.transaction_type = EntityType.ADVANCE_SETTLEMENT;
			this.journal.prefix_format = this.advanceSettlement.prefix_format;
			this.journal.project_uuid = this.cashAdvance.project_uuid;
			this.journal.segment_uuid = this.cashAdvance.segment_uuid;
			this.journal.is_draft = this.advanceSettlement.is_draft;
			this.journal.created_by = this.advanceSettlement.created_by;
			this.journal.modified_by = this.advanceSettlement.modified_by;
		},
		// Validating
		validateForm() {
			let result = true,
				msg = "";

			// Employee
			if (this.employee.id === "") {
				msg += `<p>${i18n.t("employee_is_required")}</p>`;
				result = false;
			}

			// Cash Advance
			if (this.cashAdvance.uuid === "") {
				msg += `<p>${i18n.t("please_select_cash_advance")}</p>`;
				result = false;
			}

			// Cash Account
			if (
				this.remaining !== 0 &&
				this.advanceSettlement.cash_account.name === ""
			) {
				msg += `<p>${i18n.t("please_select_cash_account")}</p>`;
				result = false;
			}

			/* Secondary Account */
			let secondaryAccountAmount = 0;
			// Advance Settlement Clearing Account (From Expense) on Dr
			this.clearingTransactions.forEach((value) => {
				if (value.account.number === AccountTypeCode.ADVANCE_SETTLEMENT_CLEARING_CODE && value.secondary_acc_uuid !== "") {
					secondaryAccountAmount += value.exchanged_amount * -1;
				}
			});
			// Cash Account on Dr/Cr
			if (this.remaining !== 0) {
				if(this.secondaryAccount.uuid !== ""){
					secondaryAccountAmount += this.remaining;
				}
			}
			// Cash Advance on Cr
			this.cashAdvance.details.forEach((value) => {
				if(value.account.account_type.code === AccountTypeCode.CASH_ADVANCE && value.secondary_acc_uuid !== ""){
					secondaryAccountAmount += value.exchanged_amount * -1;
				}
			});

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
					this.advanceSettlement.settlement_date
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
					this.$router.go(-1);
				}
			});
		},
		clear() {
			this.isEdit = false;
			this.saveMode = "";

			this.advancedAmount = 0;
			this.advancedExchangeAmount = 0;
			this.settledAmount = 0;
			this.showExchangeAmount = false;
			this.showCashAccount = true;

			this.advanceSettlement = new AdvanceSettlementModel();
			this.journal = new JournalModel();
			this.journalEntries = [];
			this.employee = new EmployeeModel();
			this.cashAdvance = new CashAdvanceModel();
			this.cashAdvances = [];
			this.clearingTransactions = [];

			// Datasoure
			let ds = this.$refs.clearingTransactionDS.kendoWidget();
			ds.data([]);

			this.setDefaultData();
		},
		confirmDelete() {
			this.$swal({
				title: i18n.t("are_you_sure_you_want_to_delete_it"),
				text: i18n.t("you_wont_be_able_to_revert_this"),
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#4d4848",
				cancelButtonColor: "#ED1A3A",
				confirmButtonText: "Yes",
			}).then((result) => {
				if (result.value) {
					this.saveMode = SaveOption.DELETE;

					/* Mark as deleted */
					this.advanceSettlement.is_deleted = 1;

					/* Update Account */
					this.save();
				}
			});
		},
		save() {
			let self = this;

			// Draft Mode
			if (this.saveMode === SaveOption.SAVEDRAFT) {
				this.advanceSettlement.is_draft = 1;
			} else {
				this.advanceSettlement.is_draft = 0;
			}

			// Shrink Data
			this.shrinkData();

			// Add Journal
			this.addJournal();

			// Sync Data
			this.showLoading = true;
			advanceSettlementHandler
				.save({
					advance_settlement: new AdvanceSettlementModel(
						this.advanceSettlement
					),
					cash_advance: new CashAdvanceModel(this.cashAdvance),
					expense: this.clearingTransactions,
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
					Helper.alertErrorMsg(error);
				})
				.finally(() => {
					self.showLoading = false;
				});
		},
		// Response Status
		responseStatus(response) {
			if (response.status === 200) {
				if (
					this.saveMode === SaveOption.SAVECLOSE ||
					this.saveMode === SaveOption.DELETE
				) {
					/* Save Close or Delete */
					if (this.isEdit) {
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
				name: "Advance Settlement View",
				params: { initAdvanceSettlement: Object.assign({}, new AdvanceSettlementModel(this.advanceSettlement)) },
			});
		},
	},
	computed: {
		remaining() {
			return this.advancedExchangeAmount - this.settledAmount;
		},
	},
	watch: {
		initAdvanceSettlement: "initialData"
	},
	mounted() {
		// Initial Data
		this.initialData();
	},
};
</script>

<style scoped>
.function_content {
	padding: 0 25px 25px;
	border-bottom: 0;
}

.cash-balance.theme--light.v-data-table {
	background-color: transparent !important;
}

.cash-balance.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr
	> td {
	padding: 5px 10px !important;
	height: 50px;
}

.cash-balance.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr
	> td:not(.v-data-table__mobile-row) {
	border-top: thin solid rgba(0, 0, 0, 0.12);
	border-bottom: 0 !important;
}

.cash-balance.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:last-child
	td {
	border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.k-link {
	color: aqua !important;
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
.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
	background-color: transparent !important;
}
</style>
