<template>
	<v-app>
		<v-container>
			<v-row>
				<v-col sm="12" cols="12">
					<v-card
						outlined
						dense
						class="pa-4 no_border rounded-sm"
						color="white"
					>
						<v-row>
							<v-col
								class="bigSide py-0"
								sm="8"
								cols="12"
								style="transition: 0.3s ease-in"
								:class="{ hide_big_bar_class: isHideBar }"
							>
								<v-form ref="form" v-model="valid" lazy-validation>
									<v-card outlined dense class="no_border">
										<h2 class="mb-0">
											{{ $t("cash_advance") }}
										</h2>
										<v-icon
											v-if="isHideBar"
											onclick="window.history.go(-1); return false;"
											style="
												cursor: pointer;
												color: #333;
												font-size: 40px;
											"
											class="float-right"
											>close
										</v-icon>
										<span
											style="
												transition: 0.3s ease-in;
												z-index: 10;
											"
											:class="{
												iconArrow: !isHideBar,
												iconArrowHide: isHideBar,
											}"
										>
											<v-icon
												size="22"
												class="arr_icon"
												@click="hide_smallsitebar"
												v-if="isHideBar"
											>
												mdi-chevron-left-circle
											</v-icon>
											<v-icon
												size="22"
												class="arr_icon"
												@click="hide_smallsitebar"
												v-if="!isHideBar"
											>
												mdi-chevron-right-circle
											</v-icon>
										</span>
									</v-card>
									<!-- Body -->
									<v-card
										outlined
										dense
										class="px-3 no_border mb-3"
										color="grayBg"
									>
										<v-row>
											<v-col sm="4" cols="12" class="pb-0">
												<label class="label">{{ $t("employee") }}</label>
												<app-employee-dropdownlist
													:initEmployee="employee"
													@emitEmployee="employee = $event"
													@onChanged="loadAdvanceRequest"
												/>

												<label class="label">{{ $t("txn_currency") }}</label>
												<app-currency-dropdownlist
													:initCurrency="currency"
													@emitCurrency="currency = $event"
													@onChanged="getExchangeRate"
												/>

												<label class="label">{{ $t("advance_account") }}</label>
												<app-cash-advance-account-dropdownlist
													:initAccount="cashAdvanceAccount"
													@emitAccount="cashAdvanceAccount = $event"
												/>
										
                                            
											</v-col>
											<v-col sm="4" cols="12" class="pb-0">
												<label class="label">{{ $t("date") }}</label>
												<app-datepicker
													:initialDate="cashAdvance.advance_date"
													@emitDate="cashAdvance.advance_date = $event"
													@onChanged="onDateChanges"
												/>

												<label class="label">{{ $t("advance_request") }}</label>
												<v-select
													:disabled="employee.id === ''"
													placeholder="Select Advance Request"
													:loading="showAdvanceRequestLoading"
													@change="onAdvanceRequestChanges"
													v-model="advanceRequest"
													:items="advanceRequests"
													item-value="uuid"
													item-text="ref_number"
													return-object
													class="mt-1"
													clearable
													outlined>
													<template slot="selection" slot-scope="{ item }">
														{{ item.ref_number }} : {{ Number(item.request_amount).toLocaleString() }} {{ item.currency.code }}
													</template>
													<template slot="item" slot-scope="{ item }">
														{{ item.ref_number }} : {{ Number(item.request_amount).toLocaleString() }} {{ item.currency.code }}
													</template>
												</v-select>
												<div v-if="this.$store.state.accounting.secondaryAccount">
                                                    <label class="label">{{ $t("secondary_account")  }}</label>
                                                    <app-secondary-account-dropdownlist
                                                        :initPrimaryAccountId="cashAdvanceAccount.uuid"
                                                        :initAccount="secondaryAccount"
                                                        @emitAccount="secondaryAccount = $event"/>
                                                </div>
											</v-col>
											<v-col sm="4" cols="12" class="pb-0">
												<label class="label">{{ $t("number") }}</label>
												<v-row>
													<v-col sm="12" cols="10" class=" py-0 mt-1">
														<v-text-field
															:rules="[(v) => !!v || 'Number is required']"
															v-model="cashAdvance.number"
															readonly
															outlined
															required
														/>
													</v-col>
													<!-- <v-col sm="2" cols="2" class="pl-0 py-0 mt-1">
														<v-icon
															color="black"
															size="30"
															class="border_qrcode"
															@click="generateNumber"
															>mdi-qrcode
														</v-icon>
													</v-col> -->
												</v-row>
												<label class="label">{{
													$t("expected_settlement_date")
												}}</label>
												<app-datepicker
													:initialDate="cashAdvance.expected_settlement_date"
													@emitDate="
														cashAdvance.expected_settlement_date = $event
													"
												/>
												
												<label class="label">{{ $t("description") }}</label>
												<v-textarea
													no-resize
													height="60px"
													class="mt-1"
													outlined
													v-model="cashAdvance.description"
													:placeholder="$t('transaction_pupose')"
													rows="3"
												/>
											</v-col>
										</v-row>
									</v-card>
									<v-row
										style="
											background-color: rgb(
												255,
												255,
												255
											);
											width: 100%;
											margin: 0 auto 0px;
										"
									>
										<v-col sm="12" cols="12" class="pb-3 pa-0">
											<kendo-datasource
												ref="cashAccountEntryDS"
												:data="cashAccountEntries"
												:change="onCashAccountDSChanges"
											/>

											<kendo-grid
												id="cashAccountGrid"
												ref="cashAccountGrid"
												class="grid-function"
												:data-source-ref="'cashAccountEntryDS'"
												:sortable="false"
												:filterable="false"
												:column-menu="true"
												:editable="true"
												:scrollable-virtual="true"
											>
												<kendo-grid-column
													:title="$t('no.')"
													:template="rowNumberTmpl"
													:width="55"
													:column-menu="false"
													:headerAttributes="{
														style: 'background-color: #EDF1F5;',
														class: 'text-products',
													}"
													:attributes="{
														style: 'text-align: products',
													}"
												/>
												<!-- <kendo-grid-column
													:field="'payment_method'"
													:title="$t('payment_option')"
													:template="'<span>#=payment_method.name#</span>'"
													:editor="PaymentOptionEditor"
													:width="200"
													:headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
												/> -->
												<kendo-grid-column
													:field="'account'"
													:title="$t('account')"
													:width="200"
													:template="this.$store.state.accounting.accountLanguage === 'English' ? '<span>#=account.number#</span> <span>#=account.name#</span>' : '<span>#=account.number#</span> <span>#=account.local_name#</span>' "
													:editor="AccountEditor"
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
													:field="'description'"
													:title="$t('description')"
													:width="200"
													:headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
												/>
												<kendo-grid-column
													:field="'ref_number'"
													:title="$t('reference_no')"
													:hidden="true"
													:width="160"
													:headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
												/>
												<kendo-grid-column
													:field="'amount'"
													:title="$t('amount')"
													:format="'{0:n}'"
													:width="150"
													:headerAttributes="{
														style:
															'text-align: right; background-color: #EDF1F5',
													}"
													:attributes="{
														style: 'text-align: right; ',
													}"
												/>
												<kendo-grid-column
													:command="{
														iconClass: 'k-icon k-i-trash',
														text: ' ',
														click: removeRow,
														class: 'btn-plus',
													}"
													:width="65"
													:headerAttributes="{
														style:
															'text-align: right; background-color: #EDF1F5',
													}"
												/>
											</kendo-grid>
										</v-col>
									</v-row>
									<v-row style="background-color: #fff">
										<v-col sm="4" cols="12" class="pb-0">
											<v-btn
												class="float-left btn_plus rounded-0"
												@click="addRow"
											>
												<v-icon class="ma-1">mdi-plus</v-icon>
											</v-btn>
											<v-btn
												class="float-left white--text rounded-0 ml-3 add_account mr-3"
												link
												color="third"
												route
												to="account"
											>
												{{ $t("add_account") }}
											</v-btn>
										</v-col>
										<v-col sm="3" cols="12" class="pb-0">
											<template>
												<v-file-input
													class="mt-0 pt-0"
													sm="3"
													cols="6"
													:placeholder="$t('attachment')"
													multiple
													prepend-icon="mdi-paperclip"
												>
													<template
														v-slot:selection="{
															text,
														}"
													>
														<v-chip small label color="primary">
															{{ text }}
														</v-chip>
													</template>
												</v-file-input>
											</template>
										</v-col>
									</v-row>
									<!-- And Body -->
									<v-divider />
									<v-card outlined dense class="no_border function_footer">
										<!-- Alert Error Message -->
										<v-alert type="warning" v-model="alert" dismissible>
											<span v-html="errorMessage" />
										</v-alert>

										<!-- Save Buttons -->
										<v-menu>
											<template v-slot:activator="{ on }">
												<v-btn
													class="mr-2 float-left  select_template"
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
													<v-list-item-title
														>{{ item.title }}
													</v-list-item-title>
												</v-list-item>
											</v-list>
										</v-menu>
										<v-btn
											color="black"
											class="float-left  white--text text-capitalize"
											@click="cancel"
											>{{ $t("cancel") }}
										</v-btn>
										<v-menu>
											<template v-slot:activator="{ on }">
												<v-btn
													class="ml-2 float-right  white--text text-capitalize"
													v-on="on"
													color="primary"
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
															>
																{{ $t("save_new") }}
															</v-list-item-title>
														</v-list-item-content>
													</v-list-item>
													<v-list-item>
														<v-list-item-content>
															<v-list-item-title
																@click="onSaveOptionClick(SaveOption.SAVEPRINT)"
															>
																{{ $t("save_print") }}
															</v-list-item-title>
														</v-list-item-content>
													</v-list-item>
													<v-list-item v-if="!isEdit">
														<v-list-item-content>
															<v-list-item-title
																@click="onSaveOptionClick(SaveOption.SAVEDRAFT)"
															>
																{{ $t("save_draft") }}
															</v-list-item-title>
														</v-list-item-content>
													</v-list-item>
												</v-list-item-group>
											</v-list>
										</v-menu>
										<v-btn
											color="secondary"
											class="float-right  white--text text-capitalize"
											@click="onSaveOptionClick(SaveOption.SAVECLOSE)"
										>
											{{ $t("save_close") }}
										</v-btn>
									</v-card>
								</v-form>
							</v-col>
							<v-col
								class="smallSide"
								sm="4"
								style="transition: 0.3s ease-in"
								:class="{ hide_small_bar_class: isHideBar }"
							>
								<h3
									style="color: #b3b5bc; font-size: 20px"
									v-if="!isHideBar"
									class="text-uppercase float-right mt-n3"
								>
									<span class="pointer" @click="Help('cash advance')">
										{{ $t("help") }}
									</span>
									<v-icon size="40" class="pointer" @click="cancel()"
										>close
									</v-icon>
								</h3>

								<div v-if="!isHideBar" class="small_sidebar mt-8 px-4 grayBg">
									<v-card
										class="pa-3 no-boxshadow d-flex flex-column"
										color="primary"
										height="70"
									>
										<h3 class="text-white justify-start text-uppercase mb-2">
											{{ $t("amount_requested") }}
										</h3>
										<h3 class="text-bold font_20 justify-end white--text">
											{{ Number(totalAmount).toLocaleString() }}
										</h3>
									</v-card>

									<v-row>
										<v-col sm="12" cols="6" class="pt-2 pb-0">
											<label style="line-height:23px;" class="label">{{
												$t("business_unit_segment")
											}}</label>
											<app-segment-dropdownlist
												:initSegment="segment"
												@emitSegment="segment = $event"
											/>
											<label class="label mb-0">{{ $t("location") }}</label>
											<app-location-dropdownlist
												:initLocation="location"
												@emitLocation="location = $event"
											/>
											<label class="label">{{ $t("project") }}</label>
											<app-project-dropdownlist
												:initProject="project"
												@emitProject="project = $event"
											/>
											<!-- <label class="label">{{ $t("for_the_month_of") }}</label>
											<app-monthof-picker
												:initMonthOf="cashAdvance.month_of"
												@emitMonthOf="cashAdvance.month_of = $event"
											/> -->
										</v-col>
									</v-row>

									<p class="mb-0 detial_smallside_p font_14">
										{{ $t("advance_function_desc") }}
									</p>
								</div>
							</v-col>
						</v-row>
					</v-card>
				</v-col>
			</v-row>
			<LoadingMe 
				type="loading"
				:isLoading="showLoading" 
				:fullPage="true" 
				:myLoading="true" />
		</v-container>
	</v-app>
</template>

<script>
import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import { ShowResource } from "@/observable/store";
import {
	CashAdvanceModel,
	CashAdvanceDetailModel,
	JournalModel,
	JournalEntryModel,
	AccountModel,
	EmployeeModel,
	ContactModel,
	CurrencyModel,
	ExchangeRateModel,
	ProjectModel,
	SegmentModel,
	LocationModel,
} from "@/scripts/model/AppModels";
import PaymentOptionModel from "@/scripts/model/PaymentOption";
import ResponseDataModel from "@/scripts/model/ResponseData";
import AccountSecondaryEditor from "@/scripts/kendo_editor/AccountSecondary";

/* Editors */
import AccountEditor from "@/scripts/kendo_editor/Account";
// import PaymentOptionEditor from "@/scripts/kendo_editor/SupplierPaymentOptionEditor";

/* Store */
import store from "@/store";
const institute = store.state.institute.institute;

const cashAdvanceHandler = require("@/scripts/handler/workingcapital/cashAdvanceHandler.js");
const {
	SaveOption,
	EntityType,
	AccountTypeCode,
	WorkFlowStatus,
} = require("@/scripts/default_setup/Collections");

export default {
	name: "CashAdvance",
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-datepicker": () =>
			import("@/components/custom_templates/DatePickerComponent"),
		// "app-monthof-picker": () =>
		//   import("@/components/kendo_templates/MonthOfPicker"),
		"app-currency-dropdownlist": () =>
			import("@/components/dropdownlist/Currency"),
		"app-cash-advance-account-dropdownlist": () =>
			import("@/components/dropdownlist/CashAdvanceAccount"),
		"app-location-dropdownlist": () =>
			import("@/components/dropdownlist/Location"),
		"app-employee-dropdownlist": () =>
			import("@/components/dropdownlist/Employee"),
		"app-project-dropdownlist": () =>
			import("@/components/dropdownlist/Project"),
		"app-segment-dropdownlist": () =>
			import("@/components/dropdownlist/Segment"),
		"app-secondary-account-dropdownlist": () => import('@/components/dropdownlist/AccountSecondary'),
	},
	props: {
		initCashAdvance: {
			type: CashAdvanceModel,
		},
		initAdvanceRequest: {
			type: CashAdvanceModel,
		},
	},
	data: () => ({
		// Obj
		cashAdvance: new CashAdvanceModel(),
		advanceRequest: new CashAdvanceModel(),
		advanceRequests: [],
		journal: null,
		journalEntries: [],
		cashAccountEntries: [], // Credit side
		employee: new EmployeeModel(),
		currency: new CurrencyModel(institute.baseCurrency),
		exchangeRate: new ExchangeRateModel(institute.baseCurrency),
		cashAdvanceAccount: new AccountModel(),
		secondaryAccount: new AccountModel(),
		project: new ProjectModel(),
		segment: new SegmentModel(),
		location: new LocationModel(),
		// Other
		totalAmount: 0,
		user: Helper.getUser(),
		templates: [],
		// Form validation
		valid: true,
		isEdit: false,
		alert: false,
		errorMessage: "",
		saveMode: "",
		SaveOption: SaveOption,
		// Editors
		AccountEditor: AccountEditor,
		AccountSecondaryEditor : AccountSecondaryEditor,
		// Sidebar
		isHideBar: false,
		// LoadingMe
		showLoading: false,
		showAdvanceRequestLoading: false,
	}),
	methods: {
		Help(key_search) {
			ShowResource(key_search);
		},
		// Initial Data
		initialData() {
			if (this.initCashAdvance) {
				// Edit Mode
				this.cashAdvance = Object.assign({}, this.initCashAdvance);
				this.bindData();
			}else if (this.initAdvanceRequest) {
				this.advanceRequest = Object.assign({}, this.initAdvanceRequest);
				this.generateNumber();
				this.bindAdvanceRequest();
			} else {
				// Brand New Mode
				this.setDefaultData();
			}
		},
		// Set default data
		async setDefaultData() {
			// Brand New Mode
			this.isEdit = false;

			/* Set default */
			this.cashAdvance = Object.assign({}, new CashAdvanceModel({
				advance_date : new Date().toISOString().substr(0, 10),
				expected_settlement_date : new Date().toISOString().substr(0, 10),
				month_of : new Date().toISOString().substr(0, 7),
				status : WorkFlowStatus.APPROVED,
			}));

			/* Default Sidebar */
			let segments = await this.$store.dispatch('segments/getList');
			this.segment = new SegmentModel(segments.find(i => i.isSystem === 1));

			let locations = await this.$store.dispatch('locations/getList');
			this.location = new LocationModel(locations[0]);

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

			// Currency
			this.currency = new CurrencyModel(this.cashAdvance.currency);
			this.exchangeRate = new ExchangeRateModel(this.cashAdvance.currency);
			this.exchangeRate.id = this.cashAdvance.details[0].exchange_rate_uuid;
			this.exchangeRate.rate = this.cashAdvance.details[0].exchange_rate;

			// Employee
			this.employee = new EmployeeModel(this.cashAdvance.requested_by);

			// Cash Account Entries
			let secondaryAccounts = await this.$store.dispatch("accounting/getSecondaryAccounts"),
				entries = [];
			this.cashAdvance.details.forEach((value) => {
				if (value.amount < 0) { // Cr side
					let detail = new CashAdvanceDetailModel(value);
					detail.amount = value.amount * -1; //Convert from cr to normal number

					/* Secondary Account */
					detail.secondary_account = new AccountModel(
						secondaryAccounts.find((i) => i.uuid === value.secondary_acc_uuid)
					);

					entries.push(detail);
				} else { // Dr side
					// Cash Advance Account
					if (value.account.account_type.code === AccountTypeCode.CASH_ADVANCE) {
						this.cashAdvanceAccount = new AccountModel(value.account);
						this.totalAmount = value.amount;

						/* Secondary Account */
                        this.secondaryAccount = new AccountModel(secondaryAccounts.find((i) => i.uuid === value.secondary_acc_uuid));
					}
				}
			});
			this.cashAccountEntries = entries;

			// Sidebar
			let segments = await this.$store.dispatch('segments/getList');
			this.segment = new SegmentModel(segments.find(i => i.id === this.cashAdvance.segment_uuid));

			let projects = await this.$store.dispatch('projects/getList');
			this.project = new ProjectModel(projects.find(i => i.id === this.cashAdvance.project_uuid));

			let locations = await this.$store.dispatch('locations/getList');
			this.location = new LocationModel(locations.find(i => i.id === this.cashAdvance.location_uuid));

			/* Advance Request */
			if(this.cashAdvance.ref_number !== "" && this.cashAdvance.request_amount > 0){
				this.advanceRequest = {
					uuid: this.cashAdvance.uuid,
					ref_number: this.cashAdvance.ref_number,
					request_amount: this.cashAdvance.request_amount
				};

				this.advanceRequests = [this.advanceRequest];
			}
		},
		// Number
		async generateNumber() {
			if (!this.isEdit) {
				let num = await Helper.generateAccountingNumber(
					EntityType.CASH_ADVANCE,
					this.cashAdvance.advance_date
				);

				this.cashAdvance.number = num.number;
				this.cashAdvance.prefix_format = num.prefix_format;
			}
		},
		// Get Exchange Rate
		async getExchangeRate() {
			if (this.cashAdvance.advance_date && this.currency.code !== "") {
				this.exchangeRate = await Helper.getLastExchangeRateByDate(
					this.cashAdvance.advance_date,
					this.currency.code
				);
			} else {
				this.exchangeRate = new ExchangeRateModel(institute.baseCurrency);
			}
		},
		// Load Cash Advance
		loadAdvanceRequest() {
			if (this.employee.id !== "") {
				this.showAdvanceRequestLoading = true;
				
				cashAdvanceHandler
					.getByEmployeeId(this.employee.id)
					.then((res) => {
						let responseData = new ResponseDataModel(res);
						this.advanceRequests = responseData.data.filter((item) => item.status === WorkFlowStatus.PENDING);
					})
					.finally(() => {
						this.showAdvanceRequestLoading = false;
					});
			}
		},
		/* On Date Chanes */
		onDateChanges () {
			this.getExchangeRate();
			this.generateNumber();
		},
		// On Advance Request Changes
		onAdvanceRequestChanges () {
			if(this.advanceRequest){
				this.bindAdvanceRequest();
			}else{
				this.clear();
			}
		},
		/* Bind Advance Request */
		async bindAdvanceRequest () {
			this.cashAdvance = new CashAdvanceModel(this.advanceRequest);
			this.cashAdvance.description = this.advanceRequest.purpose;

			this.cashAdvance.advance_date = new Date().toISOString().substr(0, 10);
			this.cashAdvance.expected_settlement_date = new Date().toISOString().substr(0, 10);
			this.cashAdvance.month_of = new Date().toISOString().substr(0, 7);
			this.cashAdvance.status = WorkFlowStatus.APPROVED;

			// Employee
			this.employee = new EmployeeModel(this.advanceRequest.requested_by);
			this.advanceRequests = [this.advanceRequest];

			// Currency
			this.currency = new CurrencyModel(this.advanceRequest.currency);
			this.getExchangeRate();

			// Sidebar
			let segments = await this.$store.dispatch('segments/getList');
			this.segment = new SegmentModel(segments.find(i => i.id === this.advanceRequest.segment_uuid));

			let projects = await this.$store.dispatch('projects/getList');
			this.project = new ProjectModel(projects.find(i => i.id === this.advanceRequest.project_uuid));

			let locations = await this.$store.dispatch('locations/getList');
			this.location = new LocationModel(locations.find(i => i.id === this.advanceRequest.location_uuid));

			// Lines
			let ds = this.$refs.cashAccountEntryDS.kendoWidget(),
			last = ds.total();
			// Clear
			ds.data([]);

			let je = new CashAdvanceDetailModel();
			je.uuid = kendo.guid();
			je.amount = this.advanceRequest.request_amount;

			ds.insert(last, je);
			this.addRow();
		},
		/* Kendo */
		// DataSource Changes
		onCashAccountDSChanges(e) {
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
		// Auto Calculate In DataSource
		dataSourceAutoCalculate() {
			let ds = this.$refs.cashAccountEntryDS.kendoWidget(),
				sum = 0;

			// Sum
			ds.data().forEach((value) => {
				sum += kendo.parseFloat(value.amount);
			});

			this.totalAmount = sum;
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
				last = ds.total(),
				je = new CashAdvanceDetailModel();
			je.uuid = kendo.guid();
			je.payment_method = new PaymentOptionModel();

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
		removeRow(e) {
			e.preventDefault();

			let grid = this.$refs.cashAccountGrid.kendoWidget(),
				ds = grid.dataSource,
				dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));

			if (ds.data().length > 1) {
				ds.remove(dataItem);
			}
		},
		// Shrink Data
		shrinkData() {
			let entries = [],
				ds = this.$refs.cashAccountEntryDS.kendoWidget();

			// Date
			this.cashAdvance.advance_date = Helper.toISODate(
				this.cashAdvance.advance_date
			);
			this.cashAdvance.expected_settlement_date = Helper.toISODate(
				this.cashAdvance.expected_settlement_date
			);

			// Currency
			this.cashAdvance.currency = new CurrencyModel(this.currency);

			// Employee
			this.cashAdvance.requested_by = new ContactModel(this.employee);

			// Sidebar
			this.cashAdvance.project_uuid = this.project.id;
			this.cashAdvance.segment_uuid = this.segment.id;
			this.cashAdvance.location_uuid = this.location.id;

			// User
			if (this.isEdit) {
				this.cashAdvance.modified_by = this.user;
			} else {
				this.cashAdvance.created_by = this.user;
			}

			// Cash Advance Account on Dr
			entries.push(
				new CashAdvanceDetailModel({
					uuid: kendo.guid(),
					account: new AccountModel(this.cashAdvanceAccount),
					account_uuid: this.cashAdvanceAccount.uuid,
					secondary_acc_uuid : this.secondaryAccount.uuid,
					primary_contact: new ContactModel(this.employee),
					description: this.cashAdvance.description,
					currency: new CurrencyModel(this.currency),
					amount: this.totalAmount,
					exchange_rate_uuid: this.exchangeRate.id,
					exchange_rate: this.exchangeRate.rate,
				})
			);

			// Cash Account on Cr
			ds.data().forEach((value) => {
				if (value.account.number !== "") {
					let entry = new CashAdvanceDetailModel(value);
					entry.account = new AccountModel(value.account);
					entry.primary_contact = new ContactModel(this.employee);
					entry.currency = new CurrencyModel(this.currency);
					entry.amount = value.amount * -1; // Credit Side is negative
					entry.exchange_rate_uuid = this.exchangeRate.id;
					entry.exchange_rate = this.exchangeRate.rate;

					entries.push(entry);
				}
			});

			// Use existing uuid
            if (this.isEdit) {
                /* Clear uuid */
                entries.forEach(value => {
                    value.uuid = "";
                });

                /* Apply existing uuid */
                for (let i = 0; i < this.cashAdvance.details.length; i++) {
                    if(i < entries.length){
                        const oldEntry = this.cashAdvance.details[i];
                        entries[i].uuid = oldEntry.uuid;
                    }
                }
            }

			// Details
			this.cashAdvance.details = entries;
		},
		// Add Journal
		addJournal() {
			// Journal
			this.journal = new JournalModel({
				uuid: this.cashAdvance.journal_uuid,
				number: this.cashAdvance.number,
				description: this.cashAdvance.description,
				journal_date: Helper.toISODate(this.cashAdvance.advance_date),
				journal_type: EntityType.AUTO_JOURNAL,
				transaction_type: EntityType.CASH_ADVANCE,
				month_of: this.cashAdvance.month_of,
				project_uuid: this.cashAdvance.project_uuid,
				segment_uuid: this.cashAdvance.segment_uuid,
				location_uuid: this.cashAdvance.location_uuid,
				prefix_format: this.cashAdvance.prefix_format,
				is_draft: this.cashAdvance.is_draft,
				created_date: this.cashAdvance.created_date,
				created_by: this.cashAdvance.created_by,
				modified_by: this.cashAdvance.modified_by,
			});

			// Journal Entries
			let entries = [];
			this.cashAdvance.details.forEach((value) => {
				entries.push(new JournalEntryModel(value));
			});
			this.journalEntries = entries;
		},
		// Validating
		validateForm() {
			let result = true,
				ds = this.$refs.cashAccountEntryDS.kendoWidget(),
				msg = "",
				countEmpty = 0,
				secondaryAccountCount = 0;

			// Cash Advance Account
			if (this.cashAdvanceAccount.uuid === "") {
				msg += `<p>${i18n.t("cash_advance_account_is_required")}</p>`;
				result = false;
			}

			// Employee
			if (this.employee.id === "") {
				msg += `<p>${i18n.t("employee_is_required")}</p>`;
				result = false;
			}

			// Select Account and Amount
			ds.data().forEach((value, index) => {
				// No account
				if (value.account.name === "" && value.amount > 0) {
					result = false;
					msg += `<p>${i18n.t("please_select_account_at_row_number")} ${index +
						1}</p>`;
				}

				// No amount
				if (value.account.name !== "" && value.amount === 0) {
					result = false;
					msg += `<p>${value.account.name} ${i18n.t("has_no_amount")}</p>`;
				}

				// Count Empty Row
				if (value.account.name !== "" && value.amount > 0) {
					countEmpty++;
				}

				// Count secondary account
                if (value.secondary_account.uuid !== "") {
                    secondaryAccountCount++;
                }
			});

			// Empty Row
			if (countEmpty === 0) {
				msg += `<p>${i18n.t("please_select_account_and_enter_amount")}</p>`;
				result = false;
			}

			// Secondary Account
			if (this.secondaryAccount.uuid === "" && secondaryAccountCount > 0) {
                msg += `<p>${i18n.t("secondary_account_is_required")}</p>`;
                result = false;
            }
            if (this.secondaryAccount.uuid !== "" && secondaryAccountCount === 0) {
                msg += `<p>${i18n.t("secondary_cash_account_is_required")}</p>`;
                result = false;
            }

			/* Segment */
			if (this.segment.id === "") {
				msg += `<p>${i18n.t("segment_is_required")}</p>`;
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
					this.cashAdvance.advance_date
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
			this.totalAmount = 0;

			this.cashAdvance = new CashAdvanceModel();
			this.journal = null;
			this.journalEntries = [];
			this.employee = new EmployeeModel();
			this.currency = new CurrencyModel(institute.baseCurrency);
			this.exchangeRate = new ExchangeRateModel(institute.baseCurrency);
			this.cashAdvanceAccount = new AccountModel();
			this.secondaryAccount = new AccountModel();
			this.project = new ProjectModel();
			this.segment = new SegmentModel();
			this.location = new LocationModel();

			let ds = this.$refs.cashAccountEntryDS.kendoWidget();
			ds.data([]);

			this.setDefaultData();
		},
		save() {
			let self = this;

			// Draft Mode
			if (this.saveMode === SaveOption.SAVEDRAFT) {
				this.cashAdvance.is_draft = 1;
				this.cashAdvance.status = WorkFlowStatus.DRAFT;
			} else {
				this.cashAdvance.is_draft = 0;
				if (
					this.cashAdvance.status === "" ||
					this.cashAdvance.status === WorkFlowStatus.DRAFT
				) {
					this.cashAdvance.status = WorkFlowStatus.APPROVED;
				}
			}

			// Shrink Data
			this.shrinkData();

			// Add Journal
			this.addJournal();

			// Sync Data
			this.showLoading = true;
			cashAdvanceHandler
				.save({
					cash_advance: this.cashAdvance,
					journal: this.journal,
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
				name: "Cash Advance View",
				params: { initCashAdvance: Object.assign({}, new CashAdvanceModel(this.cashAdvance)) },
			});
		},
		// Sidebar
		hide_smallsitebar() {
			if (!this.isHideBar) {
				this.isHideBar = true;
			} else {
				this.isHideBar = false;
			}
		},
	},
	watch: {
		initCashAdvance() {
			this.initialData();
		},
		initAdvanceRequest() {
			this.initialData();
		},
	},
	mounted() {
		// Initial Data
		this.initialData();
	},
};
</script>

<style scoped>
.small_sidebar {
	height: 98%;
	position: relative;
	padding: 12px;
	background-color: #edf1f5;
}

.hide_small_bar_class {
	max-width: 0;
	transition: 0.3s ease-in;
	flex: 0 0 0;
}

.hide_big_bar_class {
	max-width: 100%;
	transition: 0.3s ease-in;
	flex: 0 0 100%;
}

.iconArrow {
	right: -35px;
	position: absolute;
	bottom: -10px;
}

.iconArrowHide {
	position: absolute;
	right: -7px;
	bottom: -10px;
}

.detial_smallside_p {
	position: absolute;
	bottom: 10px;
}

@media (min-width: 1264px) {
	.container {
		max-width: 1250px;
	}
}

@media (max-width: 576px) {
	.mb-6 {
		margin-bottom: 0 !important;
	}
}
</style>
