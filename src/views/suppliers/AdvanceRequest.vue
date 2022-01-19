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
											{{ $t("advance_request") }}
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
											<v-col sm="6" cols="12" class="pb-0">
												<label class="label">{{ $t("employee") }}</label>
												<app-employee-dropdownlist
													:initEmployee="employee"
													@emitEmployee="employee = $event"
												/>

												<label class="label">{{ $t("number") }}</label>
												<v-text-field
													v-model="cashAdvance.ref_number"
													outlined
													required
													readonly
												/>

												<label class="label">{{ $t("request_amount") }}</label>
												<v-text-field
													class="mt-1"
													v-model="cashAdvance.request_amount"
													type="number"
													:rules="[(v) => !!v || $t('is_required')]"
													outlined
												/>
											</v-col>
											<v-col sm="6" cols="12" class="pb-0">
												<label class="label">{{ $t("date") }}</label>
												<app-datepicker
													:initialDate="cashAdvance.requested_date"
													@emitDate="cashAdvance.requested_date = $event"
													@onChanged="onDateChanges"
												/>
												<label class="label">{{ $t("txn_currency") }}</label>
												<app-currency-dropdownlist
													:initCurrency="cashAdvance.currency"
													@emitCurrency="cashAdvance.currency = $event"
												/>

												<label class="label">{{ $t("expected_date") }}</label>
												<app-datepicker
													:initialDate="cashAdvance.expected_date"
													@emitDate="cashAdvance.expected_date = $event"
												/>
												<!-- <v-card
													outlined
													dense
													class="pa-5"
													style="
														background-color: #fff;
														border: 0 !important;
													"
												>
													<h4>
														{{ $t("txn_detail") }}
													</h4>
													<v-row>
														<v-col sm="12" cols="12" class="pb-0">
															<label class="label">{{
																$t("request_amount")
															}}</label>
															<v-text-field
																class="mt-1"
																v-model="cashAdvance.request_amount"
																type="number"
																required
																outlined
															/>
															<label class="label">{{
																$t("expected_date")
															}}</label>
															<app-datepicker
																:initialDate="cashAdvance.expected_date"
																@emitDate="cashAdvance.expected_date = $event"
															/>
														</v-col>
													</v-row>
												</v-card> -->
											</v-col>
										</v-row>
										<v-row>
											<v-col sm="12" cols="12" class="pb-0">
												<label class="label">{{
													$t("explanation_request")
												}}</label>
												<v-textarea
                                                    class="mt-1"
                                                    height="115px"
                                                    v-model="cashAdvance.purpose"
                                                    outlined
                                                    no-resize
                                                    rows="10"
                                                    color="30"
                                                />
											</v-col>
										</v-row>
									</v-card>
									<!-- And Body -->
									<v-divider />
									<v-card outlined dense class="no_border function_footer">
										<!-- Alert Error Message -->
										<v-alert type="warning" v-model="alert" dismissible>
											<span v-html="errorMessage" />
										</v-alert>

										<!-- Save Buttons -->
										<v-btn
											color="black"
											class="float-left  white--text text-capitalize"
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
										<v-btn
											color="primary"
											class="float-right  white--text text-capitalize"
											@click="onSaveOptionClick(SaveOption.SAVECLOSE)"
										>
											{{ $t("save") }}
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
									<span class="pointer" @click="Help('advance request')">
										{{ $t("help") }}
									</span>
									<v-icon
										onclick="window.history.go(-1); return false;"
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
										class="pa-3 no-boxshadow"
										color="primary"
										style="
											min-height: 70px;
										
										"
									>
										<h3
											style="font-size: 18px"
											class="text-white float-left text-uppercase"
										>
											{{ $t("amount_requested") }}
										</h3>
										<h3
											class="text-bold float-right mt-6 text-white"
											style="font-size: 22px"
										>
											{{ Number(cashAdvance.request_amount).toLocaleString() }}
										</h3>
									</v-card>
									<!-- <v-divider class="my-2" /> -->
									<div
										class=""
										style="
											height: 3px;
											background-color: #ffffff;
											width: 100%;
										"
									></div>
									<v-row>
										<v-col sm="12" cols="6" class="pt-1 pb-0">
											<label class="label">{{
												$t("business_unit_segment")
											}}</label>
											<app-segment-dropdownlist
												:initSegment="segment"
												@emitSegment="segment = $event"
											/>

											<label class="label">{{ $t("project") }}</label>
											<app-project-dropdownlist
												:initProject="project"
												@emitProject="project = $event"
											/>
											<label class="label">{{ $t("location") }}</label>
											<app-location-dropdownlist
												:initLocation="location"
												@emitLocation="location = $event"
											/>

											<label class="label">{{ $t("for_the_month_of") }}</label>
											<app-monthof-picker
												:initMonthOf="cashAdvance.month_of"
												@emitMonthOf="cashAdvance.month_of = $event"
											/>
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
			<LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true" />
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
	EmployeeModel,
	ContactModel,
	ProjectModel,
	SegmentModel,
	LocationModel,
} from "@/scripts/model/AppModels";

const { cashAdvanceHandler } = require("@/scripts/AppHandlers");
const {
	SaveOption,
	EntityType,
	WorkFlowStatus,
} = require("@/scripts/default_setup/Collections");

export default {
	name: "AdvanceRequest",
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-datepicker": () =>
			import("@/components/custom_templates/DatePickerComponent"),
		"app-monthof-picker": () =>
			import("@/components/kendo_templates/MonthOfPicker"),
		"app-currency-dropdownlist": () =>
			import("@/components/dropdownlist/Currency"),
		"app-employee-dropdownlist": () =>
			import("@/components/dropdownlist/Employee"),
		"app-project-dropdownlist": () =>
			import("@/components/dropdownlist/Project"),
		"app-segment-dropdownlist": () =>
			import("@/components/dropdownlist/Segment"),
		"app-location-dropdownlist": () =>
			import("@/components/dropdownlist/Location"),
	},
	props: {
		initCashAdvance: {
			type: CashAdvanceModel,
		},
	},
	data: () => ({
		// Obj
		cashAdvance: new CashAdvanceModel(),
		employee: new EmployeeModel(),
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
		// Sidebar
		isHideBar: false,
		// LoadingMe
		showLoading: false,
		loadingAlert: false,
		loadingColorAlert: "",
		loadingTextAlert: "",
	}),
	methods: {
		Help(key_search) {
			ShowResource(key_search);
		},
		// Initial Data
		initialData() {
			if (this.initCashAdvance) {
				// Edit Mode
				this.cashAdvance = this.initCashAdvance;
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

			this.cashAdvance = new CashAdvanceModel({
				requested_date: new Date().toISOString().substr(0, 10),
				expected_date: new Date().toISOString().substr(0, 10),
				month_of: new Date().toISOString().substr(0, 7),
				status: WorkFlowStatus.PENDING,// For advance request type
			});

			/* Default Sidebar */
			let segments = await this.$store.dispatch('segments/getList');
			this.segment = new SegmentModel(segments.find(i => i.isSystem === 1));

			let locations = await this.$store.dispatch('locations/getList');
			this.location = new LocationModel(locations[0]);

			// Generate Number
			this.generateNumber();
		},
		// Number
		async generateNumber() {
			if (!this.isEdit) {
				let num = await Helper.generateAccountingNumber(
					EntityType.ADVANCE_REQUEST,
					this.cashAdvance.requested_date
				);

				this.cashAdvance.ref_number = num.number;
				this.cashAdvance.prefix_format = num.prefix_format;
			}
		},
		// Bind data from prop for edit mode
		async bindData() {
			// Edit Mode
			this.isEdit = true;

			// Employee
			this.employee = new EmployeeModel(this.cashAdvance.requested_by);

			// Sidebar
			let segments = await this.$store.dispatch('segments/getList');
			this.segment = new SegmentModel(segments.find(i => i.id === this.cashAdvance.segment_uuid));

			let projects = await this.$store.dispatch('projects/getList');
			this.project = new ProjectModel(projects.find(i => i.id === this.cashAdvance.project_uuid));

			let locations = await this.$store.dispatch('locations/getList');
			this.location = new LocationModel(locations.find(i => i.id === this.cashAdvance.location_uuid));
		},
		/* On Date Chanes */
		onDateChanges () {
			this.cashAdvance.month_of = new Date(this.cashAdvance.requested_date).toISOString().substr(0, 7);
			this.generateNumber();
		},
		// Shrink Data
		shrinkData() {
			// Date
			this.cashAdvance.advance_date = Helper.toISODate(
				this.cashAdvance.requested_date
			); /* advance_date is required */
			this.cashAdvance.requested_date = Helper.toISODate(
				this.cashAdvance.requested_date
			);
			this.cashAdvance.expected_date = Helper.toISODate(
				this.cashAdvance.expected_date
			);

			// Amount
			this.cashAdvance.request_amount = kendo.parseFloat(
				this.cashAdvance.request_amount
			);

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

			/* Segment */
			if (this.segment.id === "") {
				msg += `<p>${i18n.t("segment_is_required")}</p>`;
				result = false;
			}
			
			/* Purpose */
			if (this.cashAdvance.purpose === "") {
				msg += `<p>${i18n.t("purpose_is_required")}</p>`;
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
				this.saveMode = mode;
				this.save();
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
			this.totalAmount = 0;

			this.cashAdvance = new CashAdvanceModel();
			this.employee = new EmployeeModel();
			this.project = new ProjectModel();
			this.segment = new SegmentModel();
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
					this.cashAdvance.is_deleted = 1;

					/* Update Account */
					this.save();
				}
			});
		},
		save() {
			let self = this;

			// Shrink Data
			this.shrinkData();

			// Sync Data
			this.showLoading = true;
			cashAdvanceHandler
				.save({
					cash_advance: new CashAdvanceModel(this.cashAdvance),
					journal: null,
					journal_entries: null,
				})
				.then((response) => {
					if (response) {
						self.responseStatus(response);
					}
				})
				.catch((error) => {
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
		goBackToViewPage() {
			this.$router.replace({
				name: "Advance Request View",
				params: { initCashAdvance: this.cashAdvance },
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
