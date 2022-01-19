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
							<v-row>
								<v-col
									class="bigSide pr-2 py-0"
									sm="8"
									cols="12"
									style="transition: 0.3s ease-in"
									:class="{ hide_big_bar_class: isHideBar }"
								>
									<v-card outlined dense class="no_border">
										<h2 class="mb-0">{{ $t("fund_receipt") }}</h2>
										<v-icon
											v-if="isHideBar"
											onclick="window.history.go(-1); return false;"
											style="cursor: pointer; color: #333; font-size: 40px"
											class="float-right"
											>close
										</v-icon>
										<span
											style="transition: 0.3s ease-in; z-index: 10"
											:class="{
												iconArrow: !isHideBar,
												iconArrowHide: isHideBar,
											}"
										>
											<v-icon
												size="22"
												class="arr_icon"
												@click="HideSmallSideBar"
												v-if="isHideBar"
												>mdi-chevron-left-circle
											</v-icon>
											<v-icon
												size="22"
												class="arr_icon"
												@click="HideSmallSideBar"
												v-if="!isHideBar"
												>mdi-chevron-right-circle
											</v-icon>
										</span>
									</v-card>
									<v-card outlined dense class="px-3 no_border" color="grayBg">
										<v-row class="">
											<v-col sm="6" cols="12" class="pb-0">
												<label class="label">{{ $t("donor") }}</label>
												<app-donor-dropdownlist
													:initDonor="donor"
													@emitDonor="donor = $event"
													@onChanged="onDonorChanges"
												/>

												<label class="label">{{ $t("date") }}</label>
												<app-datepicker
													:initialDate="journal.journal_date"
													@emitDate="journal.journal_date = $event"
													@onChanged="onDateChanges"
												/>
												<label class="label">{{ $t("number") }}</label>
												<v-row>
													<v-col sm="10" cols="10" class="pb-0 pr-0 pt-1">
														<v-text-field
															v-model="journal.number"
															outlined
															:rules="[(v) => !!v || 'Number is required']"
															readonly
															required
														/>
													</v-col>
													<v-col sm="2" cols="2" class="pb-0 pl-1 pt-1">
														<v-icon
															color="black"
															size="30"
															class="border_qrcode"
															@click="generateNumber"
															>mdi-qrcode</v-icon
														>
													</v-col>
												</v-row>
												<label class="label">{{ $t("currency") }}</label>
												<app-currency-dropdownlist
													:initCurrency="currency"
													@emitCurrency="currency = $event"
													@onChanged="getExchangeRate"
												/>
											</v-col>

											<v-col sm="6" cols="12" class="pb-0">
												<label class="label">{{ $t("fund_categories") }}</label>
												<app-fund-category-dropdownlist
													:initFundCategory="fundCategory"
													@emitFundCategory="fundCategory = $event"
												/>

												<label class="label">{{ $t("contract") }}</label>
												<div v-if="isEdit">
													<v-text-field
														v-model="journal.ref_number"
														readonly
														outlined
													/>
												</div>
												<div v-else>
													<app-contract-dropdownlist
														:initContract="contract"
														@emitContract="contract = $event"
														:initParams="contractParams"
													/>
												</div>
												

												<label class="label">{{ $t("description") }}</label>
												<v-textarea
													class="mt-1"
													height="120px"
													no-resize
													v-model="journal.description"
													outlined
													rows="4"
													:placeholder="$t('transaction_purpose')"
												/>
											</v-col>
										</v-row>
									</v-card>

									<v-card outlined dense class="no_border" color="white">
										<!-- Grid 1 -->
										<v-row
											style="
												background-color: rgb(255, 255, 255);
												width: 100%;
												margin: 0 auto 0px;
											"
										>
											<v-col sm="12" cols="12" class="pb-3 pa-0">
												<h2 class="mb-0 font_18">{{ $t("cash_receipt") }}</h2>
												<kendo-datasource
													ref="cashReceiptDS"
													:data="cashReceiptEntries"
													:change="onChangeCashReceiptDS"
												/>

												<kendo-grid
													id="cashReceiptGrid"
													ref="cashReceiptGrid"
													class="grid-function"
													:data-source-ref="'cashReceiptDS'"
													:sortable="false"
													:filterable="false"
													:column-menu="true"
													:editable="true"
													:scrollable-virtual="true"
												>
													<kendo-grid-column
														:title="$t('no.')"
														:template="rowNumberCashReceipt"
														:width="45"
														:column-menu="false"
														:headerAttributes="{
															style: 'background-color: #EDF1F5;',
															class: 'text-products',
														}"
														:attributes="{
															style: 'text-align: products',
														}"
													/>
													<kendo-grid-column
														:field="'account'"
														:title="$t('account')"
														:width="200"
														:template="'<span>#=account.name#</span>'"
														:editor="CashReceiptAccountEditor"
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
														:attributes="{ style: 'text-align: right; ' }"
													/>
													<kendo-grid-column
														:command="{
															iconClass: 'k-icon k-i-trash',
															text: 'Delete',
															click: removeRowCashReceipt,
															class: 'btn-plus',
														}"
														:title="'&nbsp;'"
														:width="100"
														:headerAttributes="{
															style:
																'text-align: right; background-color: #EDF1F5',
														}"
													/>
												</kendo-grid>
												<v-row style="background-color: #fff">
													<v-col sm="1" cols="12" class="pb-0">
														<v-btn
															class="float-left ml-0 rounded-0 btn_plus"
															@click="addRowCashReceipt"
														>
															<v-icon size="" class="ma-1">mdi-plus</v-icon>
														</v-btn>
													</v-col>
												</v-row>
											</v-col>
										</v-row>
										<!-- Grid 2 -->
										<v-row>
											<v-col sm="12" cols="12" class="py-0">
												<h2 class="mb-0 font_18">
													{{ $t("related_expense") }}
												</h2>
												<kendo-datasource
													ref="relatedExpenseDS"
													:data="relatedExpenseEntries"
													:change="onChangeRelatedExpenseDS"
												/>

												<kendo-grid
													id="relatedExpenseGrid"
													ref="relatedExpenseGrid"
													class="grid-function"
													:data-source-ref="'relatedExpenseDS'"
													:sortable="false"
													:filterable="false"
													:column-menu="true"
													:editable="true"
													:scrollable-virtual="true"
												>
													<kendo-grid-column
														:title="$t('no.')"
														:template="rowNumberRelatedExpense"
														:width="45"
														:column-menu="false"
														:headerAttributes="{
															style: 'background-color: #EDF1F5;',
															class: 'text-products',
														}"
														:attributes="{
															style: 'text-align: products',
														}"
													/>
													<kendo-grid-column
														:field="'account'"
														:title="$t('account')"
														:width="200"
														:template="'<span>#=account.name#</span>'"
														:editor="RelatedExpenseAccountEditor"
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
														:attributes="{ style: 'text-align: right; ' }"
													/>
													<kendo-grid-column
														:field="'class1'"
														:title="$t('class_1')"
														:template="'<span>#=class1.name#</span>'"
														:width="200"
														:editor="ClassEditor.class1"
														:headerAttributes="{
															style: 'background-color: #EDF1F5',
														}"
													/>
													<kendo-grid-column
														:field="'class2'"
														:title="$t('class_2')"
														:template="'<span>#=class2.name#</span>'"
														:width="200"
														:hidden="true"
														:editor="ClassEditor.class2"
														:headerAttributes="{
															style: 'background-color: #EDF1F5',
														}"
													/>
													<kendo-grid-column
														:field="'class3'"
														:title="$t('class_3')"
														:template="'<span>#=class3.name#</span>'"
														:hidden="true"
														:width="200"
														:editor="ClassEditor.class3"
														:headerAttributes="{
															style: 'background-color: #EDF1F5',
														}"
													/>
													<kendo-grid-column
														:field="'class4'"
														:title="$t('class_4')"
														:template="'<span>#=class4.name#</span>'"
														:hidden="true"
														:width="200"
														:editor="ClassEditor.class4"
														:headerAttributes="{
															style: 'background-color: #EDF1F5',
														}"
													/>
													<kendo-grid-column
														:field="'class5'"
														:title="$t('class_5')"
														:template="'<span>#=class5.name#</span>'"
														:hidden="true"
														:width="200"
														:editor="ClassEditor.class5"
														:headerAttributes="{
															style: 'background-color: #EDF1F5',
														}"
													/>
													<kendo-grid-column
														:command="{
															iconClass: 'k-icon k-i-trash',
															text: 'Delete',
															click: removeRowRelatedExpense,
															class: 'btn-plus',
														}"
														:title="'&nbsp;'"
														:width="100"
														:headerAttributes="{
															style:
																'text-align: right; background-color: #EDF1F5',
														}"
													/>
												</kendo-grid>
												<v-row style="background-color: #fff">
													<v-col sm="1" cols="12" class="pb-0">
														<v-btn
															class="float-left ml-0 rounded-0 btn_plus"
															@click="addRowRelatedExpense"
														>
															<v-icon size="" class="ma-1">mdi-plus</v-icon>
														</v-btn>
													</v-col>
												</v-row>
											</v-col>
										</v-row>
										<!-- Grid 3 -->
										<v-row>
											<v-col sm="12" cols="12" class="py-0">
												<h2 class="mb-0 font_18">
													{{ $t("revenue_deferred_grant") }}
												</h2>
												<kendo-datasource
													ref="revenueDefferedGrantDS"
													:data="revenueDefferedGrantEntries"
													:change="onChangeRevenueDefferedGrantDS"
												/>

												<kendo-grid
													id="revenueDefferedGrantGrid"
													ref="revenueDefferedGrantGrid"
													class="grid-function"
													:data-source-ref="'revenueDefferedGrantDS'"
													:sortable="false"
													:filterable="false"
													:column-menu="true"
													:editable="true"
													:scrollable-virtual="true"
												>
													<kendo-grid-column
														:title="$t('no.')"
														:template="rowNumberRevenueDefferedGrant"
														:width="45"
														:column-menu="false"
														:headerAttributes="{
															style: 'background-color: #EDF1F5;',
															class: 'text-products',
														}"
														:attributes="{
															style: 'text-align: products',
														}"
													/>
													<kendo-grid-column
														:field="'account'"
														:title="$t('account')"
														:width="200"
														:template="'<span>#=account.name#</span>'"
														:editor="RevenueDefferedGrantAccountEditor"
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
														:attributes="{ style: 'text-align: right; ' }"
													/>
													<kendo-grid-column
														:command="{
															iconClass: 'k-icon k-i-trash',
															text: 'Delete',
															click: removeRowRevenueDefferedGrant,
															class: 'btn-plus',
														}"
														:title="'&nbsp;'"
														:width="100"
														:headerAttributes="{
															style:
																'text-align: right; background-color: #EDF1F5',
														}"
													/>
												</kendo-grid>
												<v-row style="background-color: #fff">
													<v-col sm="4" cols="12" class="pb-0">
														<v-btn
															class="float-left ml-0 rounded-0 btn_plus"
															@click="addRowRevenueDefferedGrant"
														>
															<v-icon size="" class="ma-1">mdi-plus</v-icon>
														</v-btn>
													</v-col>
													<v-col sm="4" cols="12" class="pb-0 pt-5">
														<p>
															<span class="float-left">{{
																$t("cash_receipt_and_related_expense")
															}}</span>
															<span class="float-right text-bold">{{
																Number(totalDr).toLocaleString()
															}}</span>
														</p>
													</v-col>
													<v-col sm="4" cols="12" class="pb-0 pt-5">
														<p>
															<span class="float-left">{{
																$t("revenue_deffered_grant")
															}}</span>
															<span class="float-right text-bold">{{
																Number(totalCr).toLocaleString()
															}}</span>
														</p>
													</v-col>
												</v-row>
											</v-col>
										</v-row>

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
														class="mr-2 text-capitalize black--text float-left"
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
														<v-list-item-title>{{
															item.title
														}}</v-list-item-title>
													</v-list-item>
												</v-list>
											</v-menu>
											<v-btn
												color="black"
												class="text-capitalize white--text float-left"
												@click="cancel"
												>{{ $t("cancel") }}</v-btn
											>
											<v-btn
												color="primary"
												class="ml-2 text-capitalize white--text"
												v-if="isEdit"
												@click="confirmDelete"
												>{{ $t("delete") }}
											</v-btn>
											<v-menu>
												<template v-slot:activator="{ on }">
													<v-btn
														color="primary"
														class="ml-2 float-right text-capitalize white--text"
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
																	@click="
																		onSaveOptionClick(SaveOption.SAVEPRINT)
																	"
																	>{{ $t("save_print") }}</v-list-item-title
																>
															</v-list-item-content>
														</v-list-item>
														<v-list-item>
															<v-list-item-content>
																<v-list-item-title
																	@click="
																		onSaveOptionClick(SaveOption.SAVEDRAFT)
																	"
																	>{{ $t("save_draft") }}</v-list-item-title
																>
															</v-list-item-content>
														</v-list-item>
													</v-list-item-group>
												</v-list>
											</v-menu>
											<v-btn
												color="secondary"
												class="float-right white--text text-capitalize"
												@click="onSaveOptionClick(SaveOption.SAVECLOSE)"
												>{{ $t("save_close") }}</v-btn
											>
										</v-card>
									</v-card>
								</v-col>
								<v-col
									class="smallSide pl-2"
									sm="4"
									style="transition: 0.3s ease-in"
									:class="{ hide_small_bar_class: isHideBar }"
								>
									<h3
										style="color: #b3b5bc; font-size: 20px"
										v-if="!isHideBar"
										class="text-uppercase float-right mt-n3"
									>
										<span class="pointer" @click="Help('fund receipt')">
											{{ $t("help") }}
										</span>
										<v-icon
											@click="cancel()"
											style="cursor: pointer; color: #333; font-size: 40px"
											class="float-right mt-n1"
											>close
										</v-icon>
									</h3>

									<div v-if="!isHideBar" class="small_sidebar mt-8 px-4 grayBg">
										<v-card
											class="pa-3 no-boxshadow d-flex flex-column"
											color="primary"
											size="60px"
											style="margin-bottom: 2px"
										>
											<h3
												class="text-white text-uppercase justify-start font_13"
											>
												{{ $t("amount") }}
											</h3>
											<h3
												class="
													text-bold
													justify-end
													niradei_heavy
													font_22
													text-white
												"
											>
												{{ Number(totalDr).toLocaleString() }}
											</h3>
										</v-card>
										<!-- content -->
										<v-row>
											<v-col sm="12" cols="12" class="pb-0">
												<label class="label">{{ $t("segment") }}</label>
												<app-segment-dropdownlist
													:initSegment="segment"
													@emitSegment="segment = $event"
													@onChanged="setContractParams"
												/>

												<label class="label">{{ $t("location") }}</label>
												<app-location-dropdownlist
													:initLocation="location"
													@emitLocation="location = $event"
													@onChanged="setContractParams"
												/>
												<label class="label">{{ $t("project") }}</label>
												<app-project-dropdownlist
													:initProject="project"
													@emitProject="project = $event"
												/>
											</v-col>
										</v-row>
									</div>
								</v-col>
							</v-row>
						</v-card>
					</v-form>
				</v-col>
			</v-row>
			<LoadingMe
				type="loading"
				:isLoading="showLoading"
				:fullPage="true"
				:myLoading="true"
			/>
		</v-container>
	</v-app>
</template>

<script>
import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import {
	JournalModel,
	JournalEntryModel,
	JournalEntryExtendedModel,
	AccountModel,
	ClassModel,
	CurrencyModel,
	ExchangeRateModel,
	LocationModel,
	ProjectModel,
	SegmentModel,
	ContactModel,
} from "@/scripts/model/AppModels";
import CustomerModel from "@/scripts/model/Customer";

/* Editors */
import CashReceiptAccountEditor from "@/scripts/kendo_editor/CashAccount";
import RelatedExpenseAccountEditor from "@/scripts/kendo_editor/RelatedExpenseAccount";
import RevenueDefferedGrantAccountEditor from "@/scripts/kendo_editor/RevenueDefferedGrantAccount";
import AccountSecondaryEditor from "@/scripts/kendo_editor/AccountSecondary";
import ClassEditor from "@/scripts/kendo_editor/Clazz";

/* Store */
import store from "@/store";
const institute = store.state.institute.institute;

const journalHandler = require("@/scripts/journalHandler");
const AccountTypeCode = require("@/scripts/default_setup/AccountTypeCode");
import { ShowResource } from "@/observable/store";

const {
	EntityType,
	SaveOption,
} = require("@/scripts/default_setup/Collections");

export default {
	name: "FundReceipt",
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-datepicker": () =>
			import("@/components/custom_templates/DatePickerComponent"),
		"app-currency-dropdownlist": () =>
			import("@/components/dropdownlist/Currency"),
		"app-donor-dropdownlist": () => import("@/components/dropdownlist/Donor"),
		"app-fund-category-dropdownlist": () =>
			import("@/components/dropdownlist/FundCategory"),
		"app-contract-dropdownlist": () =>
			import("@/components/dropdownlist/Contract"),
		"app-segment-dropdownlist": () =>
			import("@/components/dropdownlist/Segment"),
		"app-project-dropdownlist": () =>
			import("@/components/dropdownlist/Project"),
		"app-location-dropdownlist": () =>
			import("@/components/dropdownlist/Location"),
	},
	props: {
		initJournal: {
			type: JournalModel,
		},
	},
	data: () => ({
		/* Obj */
		fundCategory: null,
		contract : null,
		contractParams : {},
		journal: new JournalModel(),
		currency: new CurrencyModel(institute.baseCurrency),
		exchangeRate: new ExchangeRateModel(institute.baseCurrency),
		journalEntries: [],
		cashReceiptEntries: [],
		relatedExpenseEntries: [],
		revenueDefferedGrantEntries: [],
		donor: new ContactModel(),
		location: new LocationModel(),
		project: new ProjectModel(),
		segment: new SegmentModel(),
		// Accounts
		accounts: [],
		cashRecieptAccounts: [],
		relatedExpenseAccounts: [],
		revenueDefferedGrantAccounts: [],
		// Editors
		CashReceiptAccountEditor: CashReceiptAccountEditor,
		RelatedExpenseAccountEditor: RelatedExpenseAccountEditor,
		RevenueDefferedGrantAccountEditor: RevenueDefferedGrantAccountEditor,
		AccountSecondaryEditor : AccountSecondaryEditor,
		ClassEditor: ClassEditor,
		// Other
		totalDr: 0,
		totalCr: 0,
		templates: [],
		user: Helper.getUser(),
		// Form validation
		valid: true,
		isEdit: false,
		alert: false,
		errorMessage: "",
		saveMode: "",
		SaveOption: SaveOption,
		// LoadingMe
		showLoading: false,
		// funcion
		isHideBar: false,
	}),
	methods: {
		HideSmallSideBar() {
			this.isHideBar = !this.isHideBar;
		},
		Help(key_search) {
			ShowResource(key_search);
		},
		// Initial Data
		initialData() {
			if (this.initJournal) {
				// Edit Mode
				this.journal = this.initJournal;
				this.bindData();
			} else {
				// Brand New Mode
				this.setDefaultData();
			}
		},
		// Set default data
		async setDefaultData() {
			// Brand New Mode
			this.isEdit = false;

			this.journal = new JournalModel({
				transaction_type: EntityType.FUND_RECEIPT,
				journal_date: new Date().toISOString().substr(0, 10),
			});

			/* Default Sidebar */
			let locations = await this.$store.dispatch("locations/getList");
			this.location = new LocationModel(locations[0]);

			let segments = await this.$store.dispatch("segments/getList");
			this.segment = new SegmentModel(segments.find((i) => i.isSystem === 1));

			// Generate Number
			this.generateNumber();

			// Add two default rows
			for (let index = 0; index < 2; index++) {
				this.addRowCashReceipt();
				this.addRowRelatedExpense();
				this.addRowRevenueDefferedGrant();
			}
		},
		// Bind data from prop for edit mode
		async bindData() {
			// Edit Mode
			this.isEdit = true;

			let totalDr = 0,
				totalCr = 0,
				cashReceiptEntries = [],
				relatedExpenseEntries = [],
				revenueDefferedGrantEntries = [];

			// Donor
			this.donor = new CustomerModel(
				this.journal.journal_entries[0].primary_contact
			);

			/* Load Data */
			let accounts = await this.$store.dispatch("accounting/getAccounts"),
				classes = await this.$store.dispatch("classes/getList");

			// Currency
			this.currency = new CurrencyModel(
				this.journal.journal_entries[0].currency
			);
			this.exchangeRate = new ExchangeRateModel(
				this.journal.journal_entries[0].currency
			);
			this.exchangeRate.id = this.journal.journal_entries[0].exchange_rate_uuid;
			this.exchangeRate.rate = this.journal.journal_entries[0].exchange_rate;

			this.journal.journal_entries.forEach((value) => {
				let je = new JournalEntryExtendedModel(value);

				if (value.amount > 0) {
					// Dr side
					if (
						~AccountTypeCode.CASH_ACCOUNTS.indexOf(
							value.account.account_type.number
						)
					) {
						cashReceiptEntries.push(je);
					} else {
						/* Secondary Account */
						je.secondary_account = new AccountModel(
							accounts.find((i) => i.uuid === value.secondary_acc_uuid)
						);

						// Classes
						je.class1 = new ClassModel(
							classes.find((item) => item.id === value.class_1_uuid)
						);
						je.class2 = new ClassModel(
							classes.find((item) => item.id === value.class_2_uuid)
						);
						je.class3 = new ClassModel(
							classes.find((item) => item.id === value.class_3_uuid)
						);
						je.class4 = new ClassModel(
							classes.find((item) => item.id === value.class_4_uuid)
						);
						je.class5 = new ClassModel(
							classes.find((item) => item.id === value.class_5_uuid)
						);

						relatedExpenseEntries.push(je);
					}
					totalDr += value.amount;
				} else {
					// Cr side
					je.amount = value.amount * -1;
					revenueDefferedGrantEntries.push(je);
					totalCr += je.amount;
				}
			});

			// Sidebar
			let locations = await this.$store.dispatch("locations/getList");
			this.location = new LocationModel(
				locations.find((i) => i.id === this.journal.location_uuid)
			);

			let segments = await this.$store.dispatch("segments/getList");
			this.segment = new SegmentModel(
				segments.find((i) => i.id === this.journal.segment_uuid)
			);

			let projects = await this.$store.dispatch("projects/getList");
			this.project = new ProjectModel(
				projects.find((i) => i.id === this.journal.project_uuid)
			);

			this.totalDr = totalDr;
			this.totalCr = totalCr;

			this.cashReceiptEntries = cashReceiptEntries;
			this.relatedExpenseEntries = relatedExpenseEntries;
			this.revenueDefferedGrantEntries = revenueDefferedGrantEntries;
		},
		// Number
		async generateNumber() {
			if (!this.isEdit) {
				let num = await Helper.generateAccountingNumber(
					this.journal.transaction_type,
					this.journal.journal_date
				);

				this.journal.number = num.number;
				this.journal.prefix_format = num.prefix_format;
			}
		},
		// Get Exchange Rate
		async getExchangeRate() {
			if (this.journal.journal_date && this.currency.code !== "") {
				this.exchangeRate = await Helper.getLastExchangeRateByDate(
					this.journal.journal_date,
					this.currency.code
				);
			} else {
				this.exchangeRate = new ExchangeRateModel(institute.baseCurrency);
			}
		},
		onDonorChanges (){
			this.getExchangeRate();
			this.setContractParams();
		},
		setContractParams (){
			if(this.segment.id !== "")
			if(this.location.id !== "")
			if(this.donor.id !== ""){
				this.contractParams = {
					id: this.donor.id,
					segId: this.segment.id,
					locId: this.location.id,
					plId: '',
					date: '',
				}
			}
		},
		/* On Date Chanes */
		onDateChanges() {
			this.getExchangeRate();
			this.generateNumber();
		},
		/* Kendo */
		// DataSource Changes
		onChangeCashReceiptDS(e) {
			if (e.field) {
				let dataRow = e.items[0];

				if (e.field === "account") {
					dataRow.set("account_uuid", dataRow.account.uuid);

					this.addExtraRowCashReceipt(dataRow.uid);
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
		onChangeRelatedExpenseDS(e) {
			if (e.field) {
				let dataRow = e.items[0];

				if (e.field === "account") {
					dataRow.set("account_uuid", dataRow.account.uuid);

					this.addExtraRowRelatedExpense(dataRow.uid);
				} else if (e.field === "secondary_account") {
					if (dataRow.secondary_account !== null) {
						dataRow.set("secondary_acc_uuid", dataRow.secondary_account.uuid);
					} else {
						// Set default when deselect
						dataRow.set("secondary_acc_uuid", "");
						dataRow.set("secondary_account", new AccountModel());
					}
				} else if (e.field === "class1") {
					if (dataRow.class1 !== null) {
						dataRow.set("class_1_uuid", dataRow.class1.id);
					} else {
						// Set default when deselect
						dataRow.set("class_1_uuid", "");
						dataRow.set("class1", new ClassModel());
					}
				} else if (e.field === "class2") {
					if (dataRow.class2 !== null) {
						dataRow.set("class_2_uuid", dataRow.class2.id);
					} else {
						// Set default when deselect
						dataRow.set("class_2_uuid", "");
						dataRow.set("class2", new ClassModel());
					}
				} else if (e.field === "class3") {
					if (dataRow.class3 !== null) {
						dataRow.set("class_3_uuid", dataRow.class3.id);
					} else {
						// Set default when deselect
						dataRow.set("class_3_uuid", "");
						dataRow.set("class3", new ClassModel());
					}
				} else if (e.field === "class4") {
					if (dataRow.class4 !== null) {
						dataRow.set("class_4_uuid", dataRow.class4.id);
					} else {
						// Set default when deselect
						dataRow.set("class_4_uuid", "");
						dataRow.set("class4", new ClassModel());
					}
				} else if (e.field === "class5") {
					if (dataRow.class5 !== null) {
						dataRow.set("class_5_uuid", dataRow.class5.id);
					} else {
						// Set default when deselect
						dataRow.set("class_5_uuid", "");
						dataRow.set("class5", new ClassModel());
					}
				}

				this.dataSourceAutoCalculate();
			}
		},
		onChangeRevenueDefferedGrantDS(e) {
			if (e.field) {
				let dataRow = e.items[0];

				if (e.field === "account") {
					dataRow.set("account_uuid", dataRow.account.uuid);

					this.addExtraRowRevenueDefferedGrant(dataRow.uid);
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
			let cashReceiptDS = this.$refs.cashReceiptDS.kendoWidget(),
				relatedExpenseDS = this.$refs.relatedExpenseDS.kendoWidget(),
				revenueDefferedGrantDS =
					this.$refs.revenueDefferedGrantDS.kendoWidget(),
				totalDr = 0,
				totalCr = 0;

			// Sum
			cashReceiptDS.data().forEach((value) => {
				totalDr += kendo.parseFloat(value.amount);
			});
			relatedExpenseDS.data().forEach((value) => {
				totalDr += kendo.parseFloat(value.amount);
			});
			revenueDefferedGrantDS.data().forEach((value) => {
				totalCr += kendo.parseFloat(value.amount);
			});

			this.totalDr = totalDr;
			this.totalCr = totalCr;
		},
		// Row Number Template
		rowNumberCashReceipt(dataItem) {
			let ds = this.$refs.cashReceiptDS.kendoWidget(),
				index = ds.indexOf(dataItem);

			return index + 1;
		},
		rowNumberRelatedExpense(dataItem) {
			let ds = this.$refs.relatedExpenseDS.kendoWidget(),
				index = ds.indexOf(dataItem);

			return index + 1;
		},
		rowNumberRevenueDefferedGrant(dataItem) {
			let ds = this.$refs.revenueDefferedGrantDS.kendoWidget(),
				index = ds.indexOf(dataItem);

			return index + 1;
		},
		// Add New Row
		addRowCashReceipt() {
			let ds = this.$refs.cashReceiptDS.kendoWidget(),
				last = ds.total(),
				je = new JournalEntryExtendedModel();

			ds.insert(last, je);
		},
		addRowRelatedExpense() {
			let ds = this.$refs.relatedExpenseDS.kendoWidget(),
				last = ds.total(),
				je = new JournalEntryExtendedModel();

			ds.insert(last, je);
		},
		addRowRevenueDefferedGrant() {
			let ds = this.$refs.revenueDefferedGrantDS.kendoWidget(),
				last = ds.total(),
				je = new JournalEntryExtendedModel();

			ds.insert(last, je);
		},
		// Add Extra Row
		addExtraRowCashReceipt(uid) {
			let ds = this.$refs.cashReceiptDS.kendoWidget(),
				total = ds.total(),
				row = ds.getByUid(uid),
				index = ds.indexOf(row);

			if (index == total - 1) {
				this.addRowCashReceipt();
			}
		},
		addExtraRowRelatedExpense(uid) {
			let ds = this.$refs.relatedExpenseDS.kendoWidget(),
				total = ds.total(),
				row = ds.getByUid(uid),
				index = ds.indexOf(row);

			if (index == total - 1) {
				this.addRowRelatedExpense();
			}
		},
		addExtraRowRevenueDefferedGrant(uid) {
			let ds = this.$refs.revenueDefferedGrantDS.kendoWidget(),
				total = ds.total(),
				row = ds.getByUid(uid),
				index = ds.indexOf(row);

			if (index == total - 1) {
				this.addRowRevenueDefferedGrant();
			}
		},
		// Remove Row
		removeRowCashReceipt(e) {
			e.preventDefault();

			let grid = this.$refs.cashReceiptGrid.kendoWidget(),
				ds = grid.dataSource,
				dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));

			if (ds.data().length > 2) {
				ds.remove(dataItem);
			}
		},
		removeRowRelatedExpense(e) {
			e.preventDefault();

			let grid = this.$refs.relatedExpenseGrid.kendoWidget(),
				ds = grid.dataSource,
				dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));

			if (ds.total() > 2) {
				ds.remove(dataItem);
			}
		},
		removeRowRevenueDefferedGrant(e) {
			e.preventDefault();

			let grid = this.$refs.revenueDefferedGrantGrid.kendoWidget(),
				ds = grid.dataSource,
				dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));

			if (ds.total() > 2) {
				ds.remove(dataItem);
			}
		},
		// Shrink Data
		shrinkData() {
			// Journal Date
			this.journal.journal_date = Helper.toISODate(this.journal.journal_date);

			/* Journal Type */
			this.journal.journal_type = this.fundCategory.name;

			/* Project Segment Location */
			this.journal.project_uuid = this.project.id;
			this.journal.segment_uuid = this.segment.id;
			this.journal.location_uuid = this.location.id;

			// User
			if (this.isEdit) {
				this.journal.modified_by = this.user;
			} else {
				this.journal.created_by = this.user;
			}

			let entries = [],
				cashReceiptDS = this.$refs.cashReceiptDS.kendoWidget(),
				relatedExpenseDS = this.$refs.relatedExpenseDS.kendoWidget(),
				revenueDefferedGrantDS =
					this.$refs.revenueDefferedGrantDS.kendoWidget();

			// Cash Receipt Accounts on Dr
			cashReceiptDS.data().forEach((value) => {
				// Filter selected account
				if (value.account.number !== "" && value.amount > 0) {
					// Account
					value.set("account", new AccountModel(value.account));

					// Contact
					value.set("primary_contact", new ContactModel(this.donor));

					/* Contract */
					value.set("ref_number", this.contract.referenceNo);

					// Currency
					value.set("currency", new CurrencyModel(this.currency));
					value.set("exchange_rate_uuid", this.exchangeRate.id);
					value.set("exchange_rate", this.exchangeRate.rate);

					entries.push(new JournalEntryModel(value));
				}
			});

			// Related Expense Accounts on Dr
			relatedExpenseDS.data().forEach((value) => {
				// Filter selected account
				if (value.account.number !== "" && value.amount > 0) {
					// Account
					value.set("account", new AccountModel(value.account));

					// Contact
					value.set("primary_contact", new ContactModel(this.donor));

					/* Contract */
					value.set("ref_number", this.contract.referenceNo);

					// Currency
					value.set("currency", new CurrencyModel(this.currency));
					value.set("exchange_rate_uuid", this.exchangeRate.id);
					value.set("exchange_rate", this.exchangeRate.rate);

					entries.push(new JournalEntryModel(value));
				}
			});

			// Revenue Deffered Grant Account on Cr
			revenueDefferedGrantDS.data().forEach((value) => {
				// Filter selected account
				if (value.account.number !== "" && value.amount > 0) {
					// Account
					value.set("account", new AccountModel(value.account));

					// Contact
					value.set("primary_contact", new ContactModel(this.donor));

					/* Contract */
					value.set("ref_number", this.contract.referenceNo);

					// Currency
					value.set("currency", new CurrencyModel(this.currency));
					value.set("amount", value.amount * -1); // Credit side is negative
					value.set("exchange_rate_uuid", this.exchangeRate.id);
					value.set("exchange_rate", this.exchangeRate.rate);

					entries.push(new JournalEntryModel(value));
				}
			});

			// Journal Entries
			this.journal.journal_entries = entries;
		},
		// Validating
		validateForm() {
			let result = true,
				msg = "",
				cashReceiptDS = this.$refs.cashReceiptDS.kendoWidget(),
				relatedExpenseDS = this.$refs.relatedExpenseDS.kendoWidget(),
				revenueDefferedGrantDS = this.$refs.revenueDefferedGrantDS.kendoWidget(),
				secondaryAmount = 0,
				countEmptyCashReceipt = 0,
				countEmptyRevenueDefferedGrant = 0;

			// Donor
			if (this.donor.id === "") {
				msg += `<p>${i18n.t("donor_is_required")}</p>`;
				result = false;
			}

			// Fund Category
			if (this.fundCategory === null) {
				msg += `<p>${i18n.t("fund_category_is_required")}</p>`;
				result = false;
			}

			// Project
			if (this.project.id === "") {
				msg += `<p>${i18n.t("project_is_required")}</p>`;
				result = false;
			}

			// Segment
			if (this.segment.id === "") {
				msg += `<p>${i18n.t("segment_is_required")}</p>`;
				result = false;
			}

			// Location
			if (this.location.id === "") {
				msg += `<p>${i18n.t("location_is_required")}</p>`;
				result = false;
			}

			// Cash Receipt
			cashReceiptDS.data().forEach((value, index) => {
				// No account
				if (value.account.name === "" && value.amount > 0) {
					result = false;
					msg += `<p>${i18n.t(
						"please_select_cash_receipt_account_at_row_number"
					)} ${index + 1}</p>`;
				}

				// No amount
				if (value.account.name !== "" && value.amount === 0) {
					result = false;
					msg += `<p>${value.account.name} ${i18n.t("has_no_amount")}</p>`;
				}

				// Count From Accounts
				if (value.account.name !== "" && value.amount > 0) {
					countEmptyCashReceipt++;
				}

				/* Secondary Sum Amount */
				if(value.secondary_account.uuid !== ""){
					secondaryAmount += value.amount;
				}
			});

			// Empty Row From Accounts
			if (countEmptyCashReceipt === 0) {
				msg += `<p>${i18n.t("please_select_cash_receipt_account")}</p>`;
				result = false;
			}

			// Related Expense
			relatedExpenseDS.data().forEach((value, index) => {
				// No account
				if (value.account.name === "" && value.amount > 0) {
					result = false;
					msg += `<p>${i18n.t(
						"please_select_related_expense_account_at_row_number"
					)} ${index + 1}</p>`;
				}

				// No amount
				if (value.account.name !== "" && value.amount === 0) {
					result = false;
					msg += `<p>${value.account.name} ${i18n.t("has_no_amount")}</p>`;
				}

				/* Secondary Sum Amount */
				if(value.secondary_account.uuid !== ""){
					secondaryAmount += value.amount;
				}
			});

			// Related Expense
			revenueDefferedGrantDS.data().forEach((value, index) => {
				// No account
				if (value.account.name === "" && value.amount > 0) {
					result = false;
					msg += `<p>${i18n.t(
						"please_select_revenue_deffered_grant_account_at_row_number"
					)} ${index + 1}</p>`;
				}

				// No amount
				if (value.account.name !== "" && value.amount === 0) {
					result = false;
					msg += `<p>${value.account.name} ${i18n.t("has_no_amount")}</p>`;
				}

				// Count To Accounts
				if (value.account.name !== "" && value.amount > 0) {
					countEmptyRevenueDefferedGrant++;
				}

				/* Secondary Sum Amount */
				if(value.secondary_account.uuid !== ""){
					secondaryAmount += value.amount * -1;
				}
			});

			// Empty Row To
			if (countEmptyRevenueDefferedGrant === 0) {
				msg += `<p>${i18n.t(
					"please_select_revenue_deffered_grant_account"
				)}</p>`;
				result = false;
			}

			// All totals
			if (kendo.parseFloat(this.totalDr) !== kendo.parseFloat(this.totalCr)) {
				msg += `<p>${i18n.t("total_dr_and_total_cr_are_not_balance")}</p>`;
				result = false;
			}

			/* Secondary Account Amount Balance */
			if(secondaryAmount !== 0){
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
					this.journal.journal_date
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

			this.currency = new CurrencyModel(institute.baseCurrency);
			this.exchangeRate = new ExchangeRateModel(institute.baseCurrency);

			this.donor = new ContactModel();
			this.contract = null;
			this.contractParams = [];
			this.fundCategory = null;
			this.segment = new SegmentModel();
			this.project = new ProjectModel();
			this.location = new LocationModel();

			let cashReceiptDS = this.$refs.cashReceiptDS.kendoWidget();
			cashReceiptDS.data([]);
			let relatedExpenseDS = this.$refs.relatedExpenseDS.kendoWidget();
			relatedExpenseDS.data([]);
			let revenueDefferedGrantDS =
				this.$refs.revenueDefferedGrantDS.kendoWidget();
			revenueDefferedGrantDS.data([]);
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
					this.journal.is_deleted = 1;

					/* Update Journal Status */
					this.save();
				}
			});
		},
		save() {
			let self = this;

			// Draft Mode
			if (this.saveMode === SaveOption.SAVEDRAFT) {
				this.journal.is_draft = 1;
			} else {
				this.journal.is_draft = 0;
			}

			// Shrink Data
			this.shrinkData();

			// Sync Data
			this.showLoading = true;
			journalHandler
				.save(new JournalModel(this.journal))
				.then((response) => {
					if (response) {
						self.responseStatus(response);
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

					this.clear();
					this.setDefaultData();
				} else {
					/* Save New */
					this.clear();
					this.setDefaultData();
				}

				/* Alert Success */
				this.$snotify.success(i18n.t("successful"));
			} else {
				/* Alert Error */
				this.$snotify.error(i18n.t("error_something_wrong"));
			}
		},
		// Go back to view page after edit mode
		getJournal() {
			return this.journal;
		},
		goBackToViewPage() {
			this.$router.replace({
				name: "Fund Receipt View",
				params: { initJournal: this.getJournal() },
			});
		},
	},
	watch: {
		initJournal() {
			this.initialData();
		},
	},
	created() {},
	mounted() {
		// Initial Data
		this.initialData();
	},
};
</script>

<style scoped>
.hide_small_bar_class {
	max-width: 0;
	transition: 0.5s ease-in;
	flex: 0 0 0;
	padding: 0;
}

.hide_big_bar_class {
	max-width: 100%;
	transition: 0.5s ease-in;
	flex: 0 0 100%;
}

.info_add {
	background-color: #ffffff;
}

.small_sidebar {
	height: 98%;
	position: relative;
	padding: 12px;
	background-color: #edf1f5;
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

@media (min-width: 1264px) {
	.container {
		max-width: 1185px;
		/* max-width: 1080px !important; */
	}
}

@media (max-width: 576px) {
	.mb-6 {
		margin-bottom: 0 !important;
	}
}
</style>
