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
								style="transition: .2s ease-in;"
								:class="{ hide_big_bar_class: isHideBar }"
							>
								<v-form ref="form">
									<v-card outlined dense class="no_border">
										<h2 class="mb-0">{{ $t("journal_entry") }}</h2>
										<v-icon
											v-if="isHideBar"
											onclick="window.history.go(-1); return false;"
											style="cursor: pointer; color: #333; font-size: 40px;"
											class="float-right"
											>close
										</v-icon>
										<span
											style="transition: .2s ease-in; z-index:10;"
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
										<v-row class="px-6">
											<v-col sm="4" cols="12" class="pb-0">
												<label class="label">{{ $t("journal_date") }}</label>
												<h3>{{ Helper.dateFormat(journal.journal_date) }}</h3>
												<br />
												<label class="label">{{ $t("transaction_currency") }}</label>
												<h3>{{ currency.code }} - {{ currency.name }}</h3>
											</v-col>
											<v-col sm="4" cols="12">
												<label class="label">{{ $t("journal_type") }}</label>
												<h3>{{ journal.journal_type }}</h3>
												<br />
												<label class="label">{{ $t("journal_number") }}</label>
												<h3>{{ journal.number }}</h3>
											</v-col>

											<v-col sm="4" cols="12" class="phone_no_pt">
												<label class="label">{{ $t("description") }}</label>
												<h3>{{ journal.description }}</h3>
											</v-col>
										</v-row>
										<v-row
											class="py-5"
											style="background-color: #fff; width: 100%; margin: 10px auto 0;"
										>
											<v-col sm="12" cols="12" class="pa-0">
												<kendo-datasource 
													ref="journalEntryDS"
													:data="journalEntries"
													page="1"
													page-size="10" />

												<kendo-grid id="journalEntryGrid" 
													ref="journalEntryGrid"
													:data-source-ref="'journalEntryDS'"
													:noRecords="true"
													:column-menu="true"
													:pageable-page-sizes="true"
													:pageable-button-count="5">
													<kendo-grid-column
														:title="$t('no.')"
														:template="rowNumberTmpl"
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
														:template="'<span>#=primary_contact.name#</span>'"
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
														:width="150"
														:headerAttributes="{
															style:'text-align: right; background-color: #EDF1F5',
														}"
														:attributes="{ style: 'text-align: right; ' }"
													/>
													<kendo-grid-column
														:field="'cr'"
														:title="$t('credit')"
														:format="'{0:n}'"
														:width="150"
														:headerAttributes="{
																style:'text-align: right; background-color: #EDF1F5',
														}"
														:attributes="{
															style: 'text-align: right',
														}"
													/>
													<kendo-grid-column
														:field="'class1'"
														:title="$t('class_1')"
														:template="'<span>#=class1.name#</span>'"
														:width="200"
														:hidden="
															!this.$store.state.accounting.classSetting.C5
														"
														:headerAttributes="{
															style: 'background-color: #EDF1F5',
														}"
													/>
													<kendo-grid-column
														:field="'class2'"
														:title="$t('class_2')"
														:template="'<span>#=class2.name#</span>'"
														:width="200"
														:hidden="
															!this.$store.state.accounting.classSetting.C5
														"
														:headerAttributes="{
															style: 'background-color: #EDF1F5',
														}"
													/>
													<kendo-grid-column
														:field="'class3'"
														:title="$t('class_3')"
														:template="'<span>#=class3.name#</span>'"
														:width="200"
														:hidden="
															!this.$store.state.accounting.classSetting.C5
														"
														:headerAttributes="{
															style: 'background-color: #EDF1F5',
														}"
													/>
													<kendo-grid-column
														:field="'class4'"
														:title="$t('class_4')"
														:template="'<span>#=class4.name#</span>'"
														:width="200"
														:hidden="
															!this.$store.state.accounting.classSetting.C5
														"
														:headerAttributes="{
															style: 'background-color: #EDF1F5',
														}"
													/>
													<kendo-grid-column
														:field="'class5'"
														:title="$t('class_5')"
														:template="'<span>#=class5.name#</span>'"
														:width="200"
														:hidden="
															!this.$store.state.accounting.classSetting.C5
														"
														:headerAttributes="{
															style: 'background-color: #EDF1F5',
														}"
													/>
												</kendo-grid>
											</v-col>
										</v-row>
										<v-row style="background-color: #fff;">
											<v-col sm="4" cols="12">
												<div
													class="block_debit text-center"
													style="border-right: 1px solid #ccc;"
												>
													<h5 class="mb-1">{{ $t("total_debit") }}</h5>
													<p class="mb-0 number">{{ Number(dr).toLocaleString() }}</p>
												</div>
											</v-col>
											<v-col sm="4" cols="12">
												<div
													class="block_credit text-center"
													style="border-right: 1px solid #ccc;"
												>
													<h5 class="mb-1">{{ $t("total_credit") }}</h5>
													<p class="mb-0 number">{{ Number(cr).toLocaleString() }}</p>
												</div>
											</v-col>
											<v-col sm="4" cols="12">
												<div class="block_debit text-center">
													<h5 class="mb-1">{{ $t("difference") }}</h5>
													<p class="mb-0 number">{{ Number(diff).toLocaleString() }}</p>
												</div>
											</v-col>
										</v-row>
										<v-row style="background-color: #fff;">
											<v-col sm="12" cols="12">
												<Attachment :initAccount="attachment"/>
											</v-col>
										</v-row>
									</v-card>

									<!-- And Body -->
									<v-divider />
									<v-card outlined dense class="no_border function_footer py-2">
										<v-btn
											@click="_print(1)"
											class="float-right save_option mx-1 capitalize"
											color="secondary"
										>
											{{ $t("print") }}
										</v-btn>
										<!-- 	<v-btn
											class="float-right mx-1 white--text capitalize"
											color="red"
										>
											{{ $t("delete") }}
										</v-btn> -->
										<v-btn
											class="float-right mx-1 white--text capitalize"
											color="primary"
											@click="edit"
										>
											{{ $t("edit") }}
										</v-btn>
									</v-card>
									<v-divider />
								</v-form>
							</v-col>
							<v-col
								class="smallSide"
								sm="4"
								style="transition: .3s ease-in;"
								:class="{ hide_small_bar_class: isHideBar }"
							>
								<h3
									style="color: #b3b5bc; font-size:20px;"
									v-if="!isHideBar"
									class="text-uppercase float-right mt-n3"
								>
									Help
									<v-icon
										onclick="window.history.go(-1); return false;"
										style="cursor: pointer; color: #333; font-size: 40px;"
										class="float-right mt-n1"
										>close
									</v-icon>
								</h3>

								<div v-if="!isHideBar" class="small_sidebar mt-9 px-4 grayBg">
									<h4 class="mb-2 text-uppercase">{{ $t("analysis") }}</h4>
									<v-card
										class="pa-3 no-boxshadow"
										color="primary"
										style="min-height: 70px;"
									>
										<h3
											style="font-size: 18px"
											class="text-white text-uppercase mb-2"
										>
											{{ $t("total") }}
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
										style="height:3px; background-color:#ffffff;width:100%;"
									></div>
									<v-row>
										<v-col sm="12" cols="6" class="py-0">
											<label class="label">{{ $t("location") }}</label>
											<h4 class="text-bold py-1">{{ location.name }}</h4>

											<label class="label">{{ $t("project") }}</label>
											<h4 class="text-bold py-1">{{ project.name }}</h4>

											<label class="label">{{
												$t("business_unit_segement")
											}}</label>
											<h4 class="text-bold py-1">{{ segment.name }}</h4>

											<label class="label">{{ $t("for_the_month_of") }}</label>
											<h4 class="text-bold py-1">{{ journal.month_of }}</h4>
										</v-col>
									</v-row>
									<div
										class="my-2 mt-3"
										style="height:3px; background-color:#ffffff;width:100%;"
									></div>
									<!-- <v-divider class="my-2 mt-3" /> -->
									<p class="grey--text mb-1">
										{{ $t("transaction_history") }}
									</p>
									<tbody>
										<tr>
									<td class="text-left px-0 font_12">
										{{ $t("created_by") }} :
										<span class="text-bold">
											{{ journal.created_by.email }}
										</span>
									</td>
									<td class="text-left px-0 font_12">
									<!-- {{ $t("created_on") }} : -->
										<span class="text-bold">
											{{ formatDateTime(journal.created_date) }}
										</span>
									</td>
									</tr>
									<tr>
									<td class="text-left px-0 font_12">
										{{ $t("last_edited_by") }} :
										<span class="text-bold">
											{{ journal.modified_by.email}}
										</span>
									</td>
									<td class="text-left px-0 font_12">
									<!-- {{ $t("last_edited_on") }} : -->
										<span class="text-bold">
											{{ formatDateTime(journal.modified_date) }}
										</span>
									</td>
									</tr>
									</tbody>
									<div
										class="my-2 mt-3"
										style="height:3px; background-color:#ffffff;width:100%;"
									></div>
									<p class="mb-0 detial_smallside_p font_14">
										{{ $t("account_entry_desc") }}
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
// import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import { JournalModel, JournalEntryExtendedModel, AccountModel, CurrencyModel, LocationModel, ProjectModel, SegmentModel, ClassModel } from "@/scripts/model/AppModels";

const journalHandler = require("@/scripts/journalHandler");
// from
const {getFormSetting} = require("@/scripts/settingsHandler.js")
import {print} from "@/form/Accounting.js";
import {i18n} from '@/i18n';



export default {
	name: "JournalView",
	components: {
		"LoadingMe": () => import('@/components/Loading'),
		Attachment: () => import('@/components/Attachment'),
	},
	props: {
		initJournal: {
			type: JournalModel,
		},
	},
	data: () => ({
		// Obj
		journal: new JournalModel(),
		journalEntries: [],
		currency: new CurrencyModel(),
		location : new LocationModel(),
		locations: [],
		project : new ProjectModel(),
		projects: [],
		segment : new SegmentModel(),
		segments: [],
		classes: [],
		account: new AccountModel(),
		// Other
		Helper : Helper,
		showLoading: false,
		dr: 0,
		cr: 0,
		diff: 0,
		// Sidebar
		isHideBar: false,
	}),
	methods: {
		
        formatDateTime(value) {
            return kendo.toString(new Date(value), `dd-MM-yyyy h:mm tt`);
        },
		// Load journal according to query string {id}
		_print(id) {
			let print_data = {};
			print_data['journal'] = this.journal;
			print_data['journalEntries'] = this.journalEntries;
			print_data['currency'] = this.currency;
			print_data['location'] = this.location;
			print_data['project'] = this.project;
			print_data['segment'] = this.segment;
			print_data['classes'] = this.classes;
			print_data['dr'] = this.dr;
			print_data['cr'] = this.cr;
			print_data['journal'] = this.journal;
            let params = "?formType=Journal Voucher"
            getFormSetting(params).then(res => {
                if (res.data.statusCode === 200) {
                    if (res.data.data.length > 0) {
                        window.console.log(res.data.data["0"].settings);
                        print(print_data, id, res.data.data["0"].settings);
                    }else{
                        this.$snotify.error(i18n.t('please_save_form_in_setting'))
                    }   
                }
            });
        },
		loadObj() {
			let self = this;

			// Access Query String
			let q = this.$route.params;
			this.attachment = {
				uuid: this.$route.params.id,
				name: ""
			}
			if (q.id !== undefined) {
				if(q.id !== this.journal.uuid){
					this.showLoading = true;
					journalHandler.getOne(q.id)
					.then(res => {
						// Bind Obj
						this.journal = new JournalModel(res.data);
						this.bindData();
					})
					.finally(function() {
						self.showLoading = false;
					});
				}
			}
		},
		async bindData() {
			// Bind Obj
			let dr = 0, cr = 0, entries = [];

			/* Load Data */
			let accounts = await this.$store.dispatch("accounting/getAccounts"),
				classes = await this.$store.dispatch("classes/getList");

			this.journal.journal_entries.forEach(value => {
				let je = new JournalEntryExtendedModel(value);

				/* Secondary Account */
				je.secondary_account = new AccountModel(
					accounts.find((i) => i.uuid === value.secondary_acc_uuid)
				);
				
				if (value.amount > 0) {
                    je.dr = value.amount;
                    je.cr = 0;
                } else {
                    je.dr = 0;
                    je.cr = Math.abs(value.amount);
                }

				// Classes
				je.class1 = new ClassModel(classes.find(item => item.id === value.class_1_uuid));
				je.class2 = new ClassModel(classes.find(item => item.id === value.class_2_uuid));
				je.class3 = new ClassModel(classes.find(item => item.id === value.class_3_uuid));
				je.class4 = new ClassModel(classes.find(item => item.id === value.class_4_uuid));
				je.class5 = new ClassModel(classes.find(item => item.id === value.class_5_uuid));

				entries.push(je);

				dr += kendo.parseFloat(je.dr);
				cr += kendo.parseFloat(je.cr);
			});
			
			// Journal Entries
			this.journalEntries = entries;

			// Currency
			this.currency = new CurrencyModel(this.journalEntries[0].currency);
			
			// Sidebar
			let locations = await this.$store.dispatch('locations/getList');
			this.location = new LocationModel(locations.find(i => i.id === this.journal.location_uuid));

			let segments = await this.$store.dispatch('segments/getList');
			this.segment = new SegmentModel(segments.find(i => i.id === this.journal.segment_uuid));

			let projects = await this.$store.dispatch('projects/getList');
			this.project = new ProjectModel(projects.find(i => i.id === this.journal.project_uuid));

			this.dr = dr;
			this.cr = cr;
			this.diff = dr - cr;
		},
		// Row Number Template
		rowNumberTmpl (dataItem) {
			let ds = this.$refs.journalEntryDS.kendoWidget(),
				index = ds.indexOf(dataItem);

			return index + 1;
		},
		// Get Class
		getClass (id) {
			let c = this.classes.find(value => value.id === id);

			return new ClassModel(c);
		},
		getJournal () {
			return new JournalModel(this.journal);
		},
		edit() {
			this.$router.replace({ name: 'Journal', params: { initJournal: this.getJournal() } });
		},

		hide_smallsitebar(){
			if(!this.isHideBar){
				// this.col_expand = 12
				// this.col_hide = 0
				this.isHideBar = true
			}else{
				// this.col_expand = 9
				// this.col_hide = 3
				this.isHideBar = false
			}
		}
	},
	watch: {
		// call again the method if the route changes
		$route: "loadObj",
		initJournal () {
			if(this.initJournal){
				this.journal = this.initJournal;
				this.bindData();
			}
		},
	},
	mounted () {
		// fetch the data when the view is created and the data is
		// already being observed
		this.loadObj();
	}
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
