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
											{{ $t("journal_entry") }}
										</h2>
										<v-icon
											v-if="isHideBar"
											@click="cancel"
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
										class="no_border px-4 mb-4"
										color="grayBg"
									>
										<v-row>
											<v-col sm="4" cols="12" class="pb-0">
												<label class="label mb-0" style="">{{
													$t("journal_date")
												}}</label>
												<app-datepicker
													:initialDate="journal.journal_date"
													@emitDate="journal.journal_date = $event"
													@onChanged="onDateChanges"
												/>

												<label class="label">{{
													$t("transaction_currency")
												}}</label>
												<app-currency-dropdownlist
													:initCurrency="currency"
													@emitCurrency="currency = $event"
													@onChanged="getExchangeRate"
												/>
											</v-col>

											<v-col sm="4" cols="12" class="pb-0">
												<label class="label">{{ $t("journal_type") }}</label>
												<v-select
													class="mt-1"
													:items="journalTypes"
													item-value="value"
													item-text="text"
													v-model="journal.journal_type"
													:rules="[(v) => !!v || 'Journal Type is required']"
													outlined
													required
												/>

												<label class="label">{{ $t("number") }}</label>
												<v-row>
													<v-col sm="10" cols="10" class="pt-1 pb-0 pr-0">
														<v-text-field
															v-model="journal.number"
															outlined
															:rules="[(v) => !!v || 'Number is required']"
															readonly
															required
														/>
													</v-col>
													<v-col sm="2" cols="2" class="pt-1 pb-0 pl-0">
														<v-icon
															color="black"
															size="30"
															class="border_qrcode"
															@click="generateNumber"
															>mdi-qrcode
														</v-icon>
													</v-col>
												</v-row>
											</v-col>

											<v-col sm="4" cols="12" class="pb-0">
												<label class="label">{{ $t("description") }}</label>
												<v-textarea
													class="mt-1"
													height="115px"
													v-model="journal.description"
													outlined
													no-resize
													rows="4"
													color=""
												/>
											</v-col>
										</v-row>
									</v-card>
									<v-card class="px-4 no_border" color="white" outlined>
										<v-row>
											<v-col sm="12" cols="12" class="pa-0">
												<kendo-datasource
													ref="journalEntryDS"
													:data="journalEntries"
													:change="onDataSourceChanges"
												/>
												<kendo-grid
													id="journalEntryGrid"
													ref="journalEntryGrid"
													class="grid-function"
													:data-source-ref="'journalEntryDS'"
													:sortable="false"
													:filterable="false"
													:column-menu="true"
													:editable="true"
													:scrollable-virtual="true"
												>
													<kendo-grid-column
														:title="$t('no.')"
														:template="rowNumberTmpl"
														:width="45"
														:column-menu="false"
														:locked="false"
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
														:locked="false"
														:template="
															this.$store.state.accounting.accountLanguage ===
															'English'
																? '<span>#=account.number#</span> <span>#=account.name#</span>'
																: '<span>#=account.number#</span> <span>#=account.local_name#</span>'
														"
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
														:field="'primary_contact'"
														:title="$t('name')"
														:width="200"
														:hidden="true"
														:template="'<span>#=primary_contact.name#</span>'"
														:editor="SupplierEditor"
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
														:field="'dr'"
														:title="$t('debit')"
														:format="'{0:n}'"
														:editor="NumberInputBoxEditor"
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
														:field="'cr'"
														:title="$t('credit')"
														:format="'{0:n}'"
														:editor="NumberInputBoxEditor"
														:width="150"
														:headerAttributes="{
															style:
																'text-align: right; background-color: #EDF1F5',
														}"
														:attributes="{
															style: 'text-align: right',
														}"
													/>
													<kendo-grid-column
														:field="'class1'"
														:title="$t('class_1')"
														:template="'<span>#=class1.name#</span>'"
														:hidden="
															!this.$store.state.accounting.classSetting.C1
														"
														:width="200"
														:editor="ClassEditor.class1"
														:headerAttributes="{
															style: 'background-color: #EDF1F5',
														}"
													/>
													<kendo-grid-column
														:field="'class2'"
														:title="$t('class_2')"
														:hidden="
															!this.$store.state.accounting.classSetting.C2
														"
														:template="'<span>#=class2.name#</span>'"
														:width="200"
														:editor="ClassEditor.class2"
														:headerAttributes="{
															style: 'background-color: #EDF1F5',
														}"
													/>
													<kendo-grid-column
														:field="'class3'"
														:title="$t('class_3')"
														:template="'<span>#=class3.name#</span>'"
														:hidden="
															!this.$store.state.accounting.classSetting.C3
														"
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
														:hidden="
															!this.$store.state.accounting.classSetting.C4
														"
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
														:hidden="
															!this.$store.state.accounting.classSetting.C5
														"
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
															click: removeRow,
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
											</v-col>
										</v-row>
										<v-row>
											<v-col sm="4" cols="12" class="pl-0 pb-0">
												<v-btn
													color="primary"
													class="float-left rounded-0 btn_plus white--text"
													@click="addRow"
												>
													<v-icon size="" class="ma-1">mdi-plus </v-icon>
												</v-btn>
												<v-btn
													color="primary"
													class="float-left rounded-0 white--text ml-3"
													to="account"
												>
													{{ $t("add_account") }}
												</v-btn>
											</v-col>
											<v-col sm="3" cols="12">
												<template>
													<v-file-input
														class="mt-0 py-0"
														sm="3"
														cols="6"
														v-model="files"
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
										<v-row>
											<v-col sm="4" cols="12">
												<div
													class="block_debit text-center"
													style="
														border-right: 1px solid
															#ccc;
													"
												>
													<h5 class="mb-1">
														{{ $t("total_debit") }}
													</h5>
													<p class="mb-0 number">
														{{ kendo.toString(dr, numberFormat) }}
													</p>
												</div>
											</v-col>

											<v-col sm="4" cols="12">
												<div
													class="block_credit text-center"
													style="
														border-right: 1px solid
															#ccc;
													"
												>
													<h5 class="mb-1">
														{{ $t("total_credit") }}
													</h5>
													<p class="mb-0 number">
														{{ kendo.toString(cr, numberFormat) }}
													</p>
												</div>
											</v-col>

											<v-col sm="4" cols="12">
												<div class="block_debit text-center">
													<h5 class="mb-1">
														{{ $t("different") }}
													</h5>
													<p class="mb-0 number">
														{{ kendo.toString(diff, numberFormat) }}
													</p>
												</div>
											</v-col>
										</v-row>
									</v-card>
									<!-- And Body -->
									<v-divider />
									<!-- Footer -->
									<v-card outlined dense class="no_border function_footer">
										<v-alert type="warning" v-model="alert" dismissible>
											<span v-html="errorMessage" />
										</v-alert>
										<v-menu>
											<template v-slot:activator="{ on }">
												<v-btn
													class="mr-2 float-left select_template"
													v-on="on"
												>
													{{ $t("select_template") }}
													<v-icon size="" class="ma-1">expand_more </v-icon>
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
											outlined
											color="primary"
											class="text-capitalize  black--text float-left"
											@click="cancel"
											>{{ $t("cancel") }}
										</v-btn>
										<v-btn
											color="primary"
											class="ml-2 text-capitalize  white--text"
											v-if="isEdit"
											@click="confirmDelete"
											>{{ $t("delete") }}
										</v-btn>
										<!-- <v-menu>
																						<template v-slot:activator="{ on }">
																								<v-btn
																										color="primary"
																										class="ml-2 float-right text-capitalize  white--text"
																										v-on="on"
																								>
																										{{ $t("save_option") }}
																										<v-icon size="" class="ma-1"
																										>expand_more
																										</v-icon
																										>
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
																										<v-list-item v-if="!isEdit">
																												<v-list-item-content>
																														<v-list-item-title
																																@click="onSaveOptionClick(SaveOption.DRAFT)"
																														>
																																{{ $t("save_draft") }}
																														</v-list-item-title>
																												</v-list-item-content>
																										</v-list-item>
																										<v-list-item>
																												<v-list-item-content>
																														<v-list-item-title
																																@click="
																	onSaveOptionClick(
																		SaveOption.SAVEPRINT
																	)
																"
																														>
																																{{
																																		$t(
																																				"save_print"
																																		)
																																}}
																														</v-list-item-title>
																												</v-list-item-content>
																										</v-list-item>
																								</v-list-item-group>
																						</v-list>
																				</v-menu> -->
										<v-btn
											color="primary"
											class="float-right white--text text-capitalize "
											@click="onSaveOptionClick(SaveOption.SAVECLOSE)"
										>
											{{ $t("save_close") }}
										</v-btn>
										<v-btn
											color="secondary"
											class="float-right mx-2 white--text text-capitalize "
											@click="onSaveOptionClick(SaveOption.SAVENEW)"
										>
											{{ $t("save_new") }}
										</v-btn>
									</v-card>
									<!-- <v-divider /> -->
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
									<span class="pointer" @click="Help('journal')">
										{{ $t("help") }}
									</span>
									<v-icon
										@click="cancel"
										style="
											cursor: pointer;
											color: #333;
											font-size: 40px;
										"
										class="float-right mt-n1"
										>close
									</v-icon>
								</h3>

								<div v-if="!isHideBar" class="small_sidebar mt-9 px-4 grayBg">
									<v-card
										class="pa-3 no-boxshadow primary"
										style="
											min-height: 70px;
										"
									>
										<h3
											style="font-size: 18px"
											class="text-white text-uppercase mb-2"
										>
											{{ $t("amount") }}
										</h3>
										<h3
											class="text-bold float-right text-white"
											style="font-size: 22px"
										>
											{{ Number(dr).toLocaleString() }}
										</h3>
									</v-card>
									<!-- <v-divider class="my-2" /> -->
									<div
										class="mb-3"
										style="
											height: 3px;
											background-color: #ffffff;
											width: 100%;
										"
									></div>
									<v-row>
										<v-col sm="12" cols="6" class="pt-2 pb-0">
											<label class="label">{{
												$t("business_unit_segment")
											}}</label>
											<app-segment-dropdownlist
												:initSegment="segment"
												@emitSegment="segment = $event"
											/>

											<label class="label">{{ $t("location") }}</label>
											<app-location-dropdownlist
												:initLocation="location"
												@emitLocation="location = $event"
											/>

											<label class="label">{{ $t("project") }}</label>
											<app-project-dropdownlist
												:initProject="project"
												@emitProject="project = $event"
											/>

											<label class="label">{{ $t("for_the_month_of") }}</label>
											<app-monthof-picker
												:initMonthOf="journal.month_of"
												@emitMonthOf="journal.month_of = $event"
											/>
										</v-col>
									</v-row>
									<p class="mb-0 detial_smallside_p font_14">
										{{ $t("account_entry_desc") }}
									</p>
								</div>
							</v-col>
						</v-row>
					</v-card>
				</v-col>
			</v-row>
			<LoadingMe
				:isLoading="showLoading"
				:fullPage="true"
				type="loading"
				:myLoading="true"
			/>
		</v-container>
	</v-app>
</template>

<script>
import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import { ShowResource } from "@/observable/store";
import {
	JournalModel,
	JournalEntryModel,
	JournalEntryExtendedModel,
	AccountModel,
	CurrencyModel,
	ExchangeRateModel,
	ClassModel,
	ContactModel,
	LocationModel,
	ProjectModel,
	SegmentModel,
} from "@/scripts/model/AppModels";

/* Editors */
import AccountEditor from "@/scripts/kendo_editor/Account";
import AccountSecondaryEditor from "@/scripts/kendo_editor/AccountSecondary";
import NumberInputBoxEditor from "@/scripts/kendo_editor/NumberInputBox";
import SupplierEditor from "@/scripts/kendo_editor/Supplier";
import ClassEditor from "@/scripts/kendo_editor/Clazz";

/* Store */
import store from "@/store";
const institute = store.state.institute.institute;

const journalHandler = require("@/scripts/journalHandler");
const {
	EntityType,
	SaveOption,
	Setting,
} = require("@/scripts/default_setup/Collections");

export default {
	name: "Journal",
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-datepicker": () =>
			import("@/components/custom_templates/DatePickerComponent"),
		"app-monthof-picker": () =>
			import("@/components/kendo_templates/MonthOfPicker"),
		"app-currency-dropdownlist": () =>
			import("@/components/dropdownlist/Currency"),
		"app-location-dropdownlist": () =>
			import("@/components/dropdownlist/Location"),
		"app-project-dropdownlist": () =>
			import("@/components/dropdownlist/Project"),
		"app-segment-dropdownlist": () =>
			import("@/components/dropdownlist/Segment"),
	},
	props: {
		initJournal: {
			type: JournalModel,
		},
	},
	data: () => ({
		kendo: kendo,
		/* Obj */
		journal: new JournalModel(),
		journalEntries: [],
		currency: new CurrencyModel(institute.baseCurrency),
		exchangeRate: new ExchangeRateModel(institute.baseCurrency),
		location: new LocationModel(),
		project: new ProjectModel(),
		segment: new SegmentModel(),
		numberFormat: `n${Setting.MAX_DECIMAL}`,
		// Other
		dr: 0,
		cr: 0,
		diff: 0,
		files: [],
		user: Helper.getUser(),
		templates: [],
		// Editors
		AccountEditor: AccountEditor,
		AccountSecondaryEditor : AccountSecondaryEditor,
		ClassEditor: ClassEditor,
		NumberInputBoxEditor: NumberInputBoxEditor,
		SupplierEditor: SupplierEditor,
		// Form validation
		valid: true,
		isEdit: false,
		alert: false,
		errorMessage: "",
		saveMode: "",
		SaveOption: SaveOption,
		journalTypes: EntityType.JOURNAL_TYPES,
		// Sidebar
		col_expand: 9,
		col_hide: 3,
		isHideBar: false,
		// LoadingMe
		showLoading: false,
	}),
	methods: {
		Help(key) {
			ShowResource(key);
		},
		// Initial Data
		initialData() {
			if (this.initJournal) {
				// Edit Mode
				this.journal = Object.assign({}, this.initJournal);
				this.bindData();
			} else {
				// Brand New Mode
				this.setDefaultData();
			}
		},
		// Set default brand new data
		async setDefaultData() {
			// Brand New Mode
			this.isEdit = false;

			this.journal = Object.assign(
				{},
				new JournalModel({
					journal_type: EntityType.GENERAL_JOURNAL,
					transaction_type: EntityType.JOURNAL,
					journal_date: new Date().toISOString().substr(0, 10),
					month_of: new Date().toISOString().substr(0, 7),
				})
			);

			/* Default Sidebar */
			let locations = await this.$store.dispatch("locations/getList");
			this.location = new LocationModel(locations[0]);

			let segments = await this.$store.dispatch("segments/getList");
			this.segment = new SegmentModel(segments.find((i) => i.isSystem === 1));

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

			// Sum Dr/Cr
			let entries = [],
				sumDr = 0,
				sumCr = 0;

			/* Load Data */
			let secondaryAccounts = await this.$store.dispatch("accounting/getSecondaryAccounts"),
				classes = await this.$store.dispatch("classes/getList");

			this.journal.journal_entries.forEach((value) => {
				let je = new JournalEntryExtendedModel(value);

				/* Secondary Account */
				je.secondary_account = new AccountModel(
					secondaryAccounts.find((i) => i.uuid === value.secondary_acc_uuid)
				);

				if (value.amount > 0) {
					je.dr = value.amount;
					je.cr = 0;
				} else {
					je.dr = 0;
					je.cr = Math.abs(value.amount);
				}

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

				entries.push(je);

				sumDr += kendo.parseFloat(je.dr);
				sumCr += kendo.parseFloat(je.cr);
			});

			// Journal Entries
			this.journalEntries = entries;

			// Currency
			this.currency = new CurrencyModel(
				this.journal.journal_entries[0].currency
			);
			this.exchangeRate = new ExchangeRateModel(
				this.journal.journal_entries[0].currency
			);
			this.exchangeRate.id = this.journal.journal_entries[0].exchange_rate_uuid;
			this.exchangeRate.rate = this.journal.journal_entries[0].exchange_rate;

			this.dr = sumDr;
			this.cr = sumCr;
			this.diff = Math.abs(sumDr - sumCr);

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
		/* On date changes */
		onDateChanges() {
			this.journal.month_of = new Date(this.journal.journal_date)
				.toISOString()
				.substr(0, 7);
			this.getExchangeRate();
			this.generateNumber();
		},
		/* Kendo */
		// DataSource Changes
		onDataSourceChanges(e) {
			if (e.field) {
				let dataRow = e.items[0];

				if (e.field === "account") {
					// Auto Fill Second Row
					let ds = this.$refs.journalEntryDS.kendoWidget(),
						rowIndex = ds.indexOf(dataRow);

					if (rowIndex === 1) {
						let dataRowZero = ds.at(0);
						dataRow.set("description", dataRowZero.description);
						dataRow.set("cr", dataRowZero.dr);
					}

					dataRow.set("account_uuid", dataRow.account.uuid);

					// Add Extra Row
					this.addExtraRow(dataRow.uid);
				} else if (e.field === "secondary_account") {
					if (dataRow.secondary_account !== null) {
						dataRow.set("secondary_acc_uuid", dataRow.secondary_account.uuid);
					} else {
						// Set default when deselect
						dataRow.set("secondary_acc_uuid", "");
						dataRow.set("secondary_account", new AccountModel());
					}
				} else if (e.field === "dr") {
					if (dataRow.dr > 0) {
						dataRow.set("cr", 0);
					}
				} else if (e.field === "cr") {
					if (dataRow.cr > 0) {
						dataRow.set("dr", 0);
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
		// Auto Calculate In DataSource
		dataSourceAutoCalculate() {
			let ds = this.$refs.journalEntryDS.kendoWidget(),
				dr = 0,
				cr = 0;

			// Sum Dr/Cr
			ds.data().forEach((value) => {
				dr += kendo.parseFloat(value.dr);
				cr += kendo.parseFloat(value.cr);
			});

			this.dr = dr;
			this.cr = cr;

			this.diff = Math.abs(dr - cr);
		},
		// Row Number Template
		rowNumberTmpl(dataItem) {
			let ds = this.$refs.journalEntryDS.kendoWidget(),
				index = ds.indexOf(dataItem);

			return index + 1;
		},
		// Add New Row
		addRow() {
			let ds = this.$refs.journalEntryDS.kendoWidget(),
				last = ds.total(),
				je = new JournalEntryExtendedModel();

			if(last < 10){
				// Insert last row
				ds.insert(last, je);
			}else{
				this.$snotify.warning(i18n.t("maximum_rows"));
			}
		},
		// Add Extra Row
		addExtraRow(uid) {
			let ds = this.$refs.journalEntryDS.kendoWidget(),
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

			let grid = this.$refs.journalEntryGrid.kendoWidget(),
				ds = grid.dataSource,
				dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));

			if (ds.data().length > 2) {
				ds.remove(dataItem);
			}
		},
		removeEmptyRow() {
			let ds = this.$refs.journalEntryDS.kendoWidget();

			/* Collect empty row by uid */
			let emptyIds = [];
			ds.data().forEach((value) => {
				if (value.account.name === "") {
					emptyIds.push(value.uid);
				}
			});

			/* Remove empty row by uid */
			for (let i = 0; i < emptyIds.length; i++) {
				const dataItem = ds.getByUid(emptyIds[i]);
				ds.remove(dataItem);
			}
		},
		// Shrink Data
		shrinkData() {
			let entries = [],
				ds = this.$refs.journalEntryDS.kendoWidget();

			// Journal Date
			this.journal.journal_date = Helper.toISODate(this.journal.journal_date);

			// Sidebar
			this.journal.location_uuid = this.location.id;
			this.journal.project_uuid = this.project.id;
			this.journal.segment_uuid = this.segment.id;

			// Journal Entries
			this.removeEmptyRow();
			ds.data().forEach((value) => {
				if (value.dr > 0 || value.cr > 0) {
					// Filter selected account
					let amount = value.dr;
					if (value.cr > 0) {
						amount = value.cr * -1; // Cr side is negative
					}

					// Account
					value.set("account", new AccountModel(value.account));

					// Supplier
					if (value.primary_contact.name !== "") {
						value.primary_contact = new ContactModel(value.primary_contact);
					}

					// Currency
					value.set("amount", amount);
					value.set("exchange_rate_uuid", this.exchangeRate.id);
					value.set("exchange_rate", this.exchangeRate.rate);
					// value.set("exchanged_amount", value.amount * this.exchangeRate.rate);
					value.set("currency", new CurrencyModel(this.currency));

					entries.push(new JournalEntryModel(value));
				}
			});

			// User
			if (this.isEdit) {
				this.journal.modified_by = this.user;
			} else {
				this.journal.created_by = this.user;
			}

			// Journal Entries
			this.journal.journal_entries = entries;
		},
		// Validating
		validateForm() {
			let result = true,
				ds = this.$refs.journalEntryDS.kendoWidget(),
				msg = "",
				countSelected = 0,
				secondaryAccountAmount = 0;

			ds.data().forEach((value, index) => {
				/* Amount */
				let amount = value.dr;
				if (value.cr > 0) {
					amount = value.cr;
				}

				// No account
				if (value.account.uuid === "" && amount > 0) {
					result = false;
					msg += `<p>${i18n.t("please_select_account_at_row_number")} ${index +
						1}</p>`;
				}

				// No amount
				if (value.account.uuid !== "" && amount === 0) {
					result = false;
					msg += `<p>${value.account.name} ${i18n.t("has_no_amount")}</p>`;
				}

				// Count selected rows
				if (value.account.uuid !== "" && amount > 0) {
					countSelected++;
				}

				/* Secondary Sum Amount */
				if(value.secondary_account.uuid !== ""){
					secondaryAccountAmount += (value.dr - value.cr);
				}
			});

			// Non select account
			if (countSelected < 2) {
				msg += `<p>${i18n.t("pls_slect_last_2_record")}</p>`;
				result = false;
			}

			// Primary Account Balance Dr/Cr
			let zero = 0;
			if (this.diff.toFixed(Setting.MAX_DECIMAL) !== zero.toFixed(Setting.MAX_DECIMAL)) {
				msg += `<p>${i18n.t("db_cr_unbalance")}</p>`;
				result = false;
			}

			/* Secondary Account Balance */
			if(secondaryAccountAmount !== 0){
				msg += `<p>${i18n.t("secondary_account_unbalance")}</p>`;
				result = false;
			}

			/* Location */
			if (this.location.id === "") {
				msg += `<p>${i18n.t("location_is_required")}</p>`;
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
					this.$router.go(-1);
				}
			});
		},
		clear() {
			// Reset Form
			// this.$refs.form.reset();
			this.isEdit = false;
			this.saveMode = "";

			this.currency = new CurrencyModel(institute.baseCurrency);
			this.exchangeRate = new ExchangeRateModel(institute.baseCurrency);
			this.location = new LocationModel();
			this.project = new ProjectModel();
			this.segment = new SegmentModel();

			this.dr = 0;
			this.cr = 0;
			this.diff = 0;

			let ds = this.$refs.journalEntryDS.kendoWidget();
			ds.data([]);

			/* Set Default Data */
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
					this.journal.is_deleted = 1;

					this.journal.journal_entries.forEach((value) => {
						value.is_deleted = 1;
					});

					/* Save Journal */
					this.showLoading = true;
					journalHandler
						.save(this.journal)
						.then(function(response) {
							this.responseStatus(response);
						})
						.catch(function(error) {
							this.showLoading = false;
							Helper.alertErrorMsg(error);
						})
						.finally(() => {
							this.showLoading = false;
						});
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
				.save(this.journal)
				.then((response) => {
					if(response){
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
				/* Save Close or Delete Action */
				if (
					this.saveMode === SaveOption.SAVECLOSE ||
					this.saveMode === SaveOption.DELETE
				) {
					if (this.isEdit) {
						this.goBackToViewPage();
					} else {
						this.$router.go(-1);
					}
				}

				/* Reset Data */
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
				name: "Journal View",
				params: { initJournal: this.journal },
			});
		},
		hide_smallsitebar() {
			if (!this.isHideBar) {
				// this.col_expand = 12
				// this.col_hide = 0
				this.isHideBar = true;
			} else {
				// this.col_expand = 9
				// this.col_hide = 3
				this.isHideBar = false;
			}
		},
	},
	watch: {
		initJournal: "initialData"
	},
	mounted() {
		// Initial Data
		this.initialData();
	},
};
</script>

<style scoped>
.small_sidebar {
	height: 97%;
	position: relative;
	padding: 12px;
	background-color: #edf1f5;
}

.hide_small_bar_class {
	max-width: 0;
	transition: 0.05s ease-in;
	flex: 0 0 0;
}

.hide_big_bar_class {
	max-width: 100%;
	transition: 0.05s ease-in;
	flex: 0 0 100%;
}

.detial_smallside_p {
	position: absolute;
	bottom: 10px;
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
		max-width: 1250px;
	}
}

@media (max-width: 576px) {
	.mb-6 {
		margin-bottom: 0 !important;
	}
}
</style>
