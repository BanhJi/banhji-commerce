<template>
	<v-row>
		<v-col sm="12" cols="12" :class=" appType != 'npo' &&  appType != 'Public Sectors' ? 'grayBg px-6' : '' " >
			<v-card color="white" :class=" appType != 'npo' &&  appType != 'Public Sectors' ? 'pa-3 no_border' : '' "  elevation="0">
				<v-row>
					<v-col sm="8" cols="12" class="py-0 hide_form_alert">
						<app-searchdate
							:initStartDate="startDate"
							@emitStartDate="startDate = $event"
							:initEndDate="endDate"
							@emitEndDate="endDate = $event"
						/>
					</v-col>
					<v-col sm="4" cols="12" class="pt-1 d-flex pb-0">
						<v-btn class="white--text mr-2" color="primary" @click="search">{{
							$t("run_report")
						}}</v-btn>

						<v-checkbox
							v-model="isCashBasic"
							:label="$t('cash_basic')"
							class="mt-0"
							color="primary"
							hide-details
						></v-checkbox>
					</v-col>
					<v-col sm="1" cols="1" class="pt-1 pb-0">
						<downloadexcel
							icon
							color="black"
							class="bg-none float-right "
							:data="journalEntries"
							:fields="exfield"
							type="xls"
							worksheet="Journal"
							name="JournalReport.xls"
						>
							<v-icon
								class="font_34"
								style="color: black;margin-top: 3px;margin-left: 10px;"
								>fa fa-file-excel
							</v-icon>
						</downloadexcel>
					</v-col>
				</v-row>

				<!-- loading -->
				<LoadingMe
					:isLoading="showLoading"
					:fullPage="false"
					:myLoading="true"
				/>

				<v-row class="mt-0">
					<v-col sm="3" cols="12" class="pt-0">
						<v-card
							outlined
							dense
							class="px-3 pt-2  flex_column_bewteen rounded-4 no_border white--text "
							color="third"
							height="70px"
						>
							<h3 class="text-left flex-1 text-uppercase font_12 py-0">
								{{ $t("no_of_transactions") }}
							</h3>
							<h3 class="text-right  flex-1 font_20">
								{{
									obj.totalJournals
										? Number(obj.totalJournals).toLocaleString()
										: 0
								}}
							</h3>
						</v-card>
					</v-col>
					<v-col sm="3" cols="12" class="pt-0">
						<v-card
							outlined
							dense
							class="px-3 pt-2 flex_column_bewteen rounded-4 no_border white--text "
							color="third"
							height="70px"
						>
							<h3 class="text-left flex-1 text-uppercase font_12 py-0">
								{{ $t("unbalance_transaction") }}
							</h3>
							<h3 class="text-right flex-1 font_20">
								{{
									obj.numberOfUnbalanceTrasac
										? Number(obj.numberOfUnbalanceTrasac).toLocaleString()
										: 0
								}}
							</h3>
						</v-card>
					</v-col>
					<v-col sm="3" cols="12" class="pt-0">
						<v-card
							outlined
							dense
							class="px-3 pt-2 flex_column_bewteen rounded-4 no_border white--text "
							color="third"
							height="70px"
						>
							<h3 class="text-left flex-1 text-uppercase font_12 py-0">
								{{ $t("back_date_transaction") }}
							</h3>
							<h3 class="text-right flex-1 font_20">
								{{
									obj.numberOfTransactionBackdate
										? Number(obj.numberOfTransactionBackdate).toLocaleString()
										: 0
								}}
							</h3>
						</v-card>
					</v-col>
					<v-col sm="3" cols="12" class="pt-0">
						<v-card
							outlined
							dense
							class="px-3 pt-2 flex_column_bewteen rounded-4 no_border white--text "
							color="third"
							height="70px"
						>
							<h3 class="text-left flex-1 text-uppercase font_12 py-0">
								{{ $t("forward_transaction") }}
							</h3>
							<h3 class="text-right flex-1 font_20">
								{{
									obj.numberOfTransFutureDate
										? Number(obj.numberOfTransFutureDate).toLocaleString()
										: 0
								}}
							</h3>
						</v-card>
					</v-col>
					<v-col sm="6" cols="12">
						<v-card
							outlined
							dense
							class="px-3  pt-2 flex_column_bewteen rounded-4 no_border black--text "
							color="grayBg"
							height="60px"
						>
							<h3 class="text-left flex-1 text-uppercase font_12 py-0">
								{{ $t("total_debit") }}
							</h3>
							<h3 class="text-right primary--text flex-1 font_20">
								{{ obj.totalDr ? Number(obj.totalDr).toLocaleString() : 0 }}
							</h3>
						</v-card>
					</v-col>
					<v-col sm="6" cols="12">
						<v-card
							outlined
							dense
							class="px-3 pt-2 flex_column_bewteen  rounded-4 no_border black--text "
							color="grayBg"
							height="60px"
						>
							<h3 class="text-left flex-1  font_12 text-uppercase">
								{{ $t("total_credit") }}
							</h3>
							<h3 class="text-right primary--text flex-1 font_20">
								{{
									obj.totalCr
										? Math.abs(Number(obj.totalCr)).toLocaleString()
										: 0
								}}
							</h3>
						</v-card>
					</v-col>
				</v-row>

				<div class="reports_table">
					<v-row>
						<v-col sm="12" cols="12" class="pt-0">
							<kendo-datasource
								ref="dataSource"
								:data="journalEntries"
								:group="groupDefinition"
								:aggregate="aggregateDefinition"
								:group-paging="true"
								:sort="sortDefinition"
								:page="1"
								:page-size="50"
								:total="0"
							/>

							<kendo-grid
								class="custom_grid"
								ref="journalReportGrid"
								:data-source-ref="'dataSource'"
								:groupable="true"
								:sortable="true"
								:filterable="true"
								:column-menu="true"
								:reorderable="true"
								:resizable="true"
								:noRecords="true"
								:navigatable="true"
								:pageable-always-visible="true"
								:pageable-page-sizes="[20, 50, 100, 'all']"
								:toolbar="['excel']"
								:excel-file-name="'journalReport.xlsx'"
								:excel-filterable="true"
								:excel-all-pages="true"
							>
								<kendo-grid-column
									:field="'journal_date'"
									:title="$t('date')"
									:width="100"
									:filterable="false"
									:group-footer-template="'Total:'"
								/>
								<kendo-grid-column
									:field="'transaction_type'"
									:title="$t('type')"
									:template="journalTypeTemplate"
									:filterable-multi="true"
									:filterable-search="true"
									:width="120"
								/>
								<kendo-grid-column
									:field="'journal_number'"
									:title="$t('txn_number')"
									:template="journalNumberTemplate"
									:width="120"
									:filterable="false"
									:hidden="true"
									:group-header-template="'#=value#'"
								/>

								<kendo-grid-column
									:field="'account.name'"
									:title="$t('account')"
									:filterable-multi="true"
                                :filterable-search="true"
									:template="'<span>#=account.number# - #=account.name#</span>'"
									:width="140"
								/>
								<kendo-grid-column
									:field="'secondary_account'"
									:title="$t('s_account')"
									:template="
										this.$store.state.accounting.accountLanguage ===
										'English'
											? '<span>#=secondary_account.number#</span> - <span>#=secondary_account.name#</span>'
											: '<span>#=secondary_account.number#</span> - <span>#=secondary_account.local_name#</span>'
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
									:width="150"
									:filterable="true"
								/>
								<kendo-grid-column
									:field="'dr'"
									:title="$t('debit')"
									:format="'{0:#,##0.##;(#,##0.##)}'"
									:width="110"
									:filterable="false"
									:aggregates="['sum']"
									:footerAttributes="{ style: 'text-align: right;font-weight: bold;'}"
									:group-footer-template="
										'#=kendo.toString(sum, `n`)#'
									"
									:headerAttributes="{
										style: 'text-align: right;padding-right:35px;',
									}"
									:attributes="{
										style: 'text-align: right;',
									}"
								/>
								<kendo-grid-column
									:field="'cr'"
									:title="$t('credit')"
									:format="'{0:#,##0.##;(#,##0.##)}'"
									:width="110"
									:filterable="false"
									:aggregates="['sum']"
									:footerAttributes="{ style: 'text-align: right;font-weight: bold;'}"
									:group-footer-template="
										'#=kendo.toString(sum, `n`)#'
									"
									:headerAttributes="{
										style: 'text-align: right;padding-right:35px;',
									}"
									:attributes="{
										style: 'text-align: right;',
									}"
								/>
								<kendo-grid-column
									:field="'exchange_rate'"
									:title="$t('exchange_rate')"
									:width="140"
									:filterable="false"
									:hidden="true"
								/>
								<kendo-grid-column
									:field="'currency'"
									:title="$t('currency')"
									:template="'<span>#=currency.code#</span>'"
									:width="140"
									:filterable-multi="true"
                                :filterable-search="true"
									:hidden="true"
								/>
								<kendo-grid-column
									:field="'primary_contact.name'"
									:title="$t('name')"
									:width="140"
									:hidden="true"
									:template="'<span>#=primary_contact.name#</span>'"
									:filterable-multi="true"
                                :filterable-search="true"
								/>
								<kendo-grid-column
									:field="'secondary_contacts'"
									:title="$t('secondary_name')"
									:width="140"
									:hidden="true"
									:template="
										'<span>#=secondary_contacts.length>0 ?secondary_contacts[0].name : ``#</span>'
									"
									:filterable-multi="true"
                                :filterable-search="true"
								/>
								<kendo-grid-column
									:field="'segment.name'"
									:title="$t('segment')"
									:width="140"
									:hidden="true"
									:template="'<span>#=segment.name#</span>'"
									:filterable-multi="true"
                                :filterable-search="true"
								/>
								<kendo-grid-column
									:field="'location.name'"
									:title="$t('location')"
									:width="140"
									:hidden="true"
									:template="'<span>#=location.name#</span>'"
									:filterable-multi="true"
                                :filterable-search="true"
								/>
								<kendo-grid-column
									:field="'project.name'"
									:title="$t('project')"
									:width="140"
									:hidden="true"
									:template="'<span>#=project.name#</span>'"
									:filterable-multi="true"
                                :filterable-search="true"
								/>
								
								<kendo-grid-column
									:field="'class1.name'"
									:title="$t('class_1')"
									:width="140"
									:hidden="true"
									:template="'<span>#=class1.name#</span>'"
									:filterable-multi="true"
                                :filterable-search="true"
								/>
								<kendo-grid-column
									:field="'class2.name'"
									:title="$t('class_2')"
									:width="140"
									:hidden="true"
									:template="'<span>#=class2.name#</span>'"
									:filterable-multi="true"
                                :filterable-search="true"
								/>
								<kendo-grid-column
									:field="'class3.name'"
									:title="$t('class_3')"
									:width="140"
									:hidden="true"
									:template="'<span>#=class3.name#</span>'"
									:filterable-multi="true"
                                :filterable-search="true"
								/>
								<kendo-grid-column
									:field="'class4.name'"
									:title="$t('class_4')"
									:width="140"
									:hidden="true"
									:template="'<span>#=class4.name#</span>'"
									:filterable-multi="true"
                                :filterable-search="true"
								/>
								<kendo-grid-column
									:field="'class5.name'"
									:title="$t('class_5')"
									:width="140"
									:hidden="true"
									:template="'<span>#=class5.name#</span>'"
									:filterable-multi="true"
                                :filterable-search="true"
								/>
								<kendo-grid-column
									:field="'created_date'"
									:title="$t('created')"
									:width="140"
									:hidden="true"
									:filterable="false"
								/>
								<kendo-grid-column
									:field="'created_by.user_name'"
									:title="$t('create_by')"
									:template="'<span>#=created_by.user_name#</span>'"
									:width="140"
									:filterable-multi="true"
                                :filterable-search="true"
									:hidden="true"
								/>
								<kendo-grid-column
									:field="'modified_date'"
									:title="$t('last_modified')"
									:width="140"
									:filterable="false"
									:hidden="true"
								/>
								<kendo-grid-column
									:field="'modified_by.user_name'"
									:title="$t('last_modified_by')"
									:template="'<span>#=modified_by.user_name#</span>'"
									:width="140"
									:filterable-multi="true"
                                :filterable-search="true"
									:hidden="true"
								/>
							</kendo-grid>
						</v-col>
					</v-row>
				</div>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import { i18n } from "@/i18n";
import Helper from "@/helper.js";
import { dataStore } from "@/observable/store";
import {
	JournalEntryExtendedModel,
	AccountModel,
	LocationModel,
	ProjectModel,
	SegmentModel,
	ClassModel,
	UserModel,
} from "@/scripts/model/AppModels";
import downloadexcel from "vue-json-excel";
import JSZip from "jszip";
window.JSZip = JSZip;
const {
	journalReportHandler,
} = require("@/scripts/AppHandlers");
const { EntityType } = require("@/scripts/default_setup/Collections");

export default {
	name: "JournalReport",
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-searchdate": () => import("@/components/custom_templates/SearchDate"),
		downloadexcel: downloadexcel,
	},
	data: () => ({
		// Obj
		obj: [],
		journalEntries: [],
		startDate: "",
		endDate: "",
		isCashBasic : false,
		// LoadingMe
		showLoading: false,
		// Kendo dataSource
		groupDefinition: [],
		sortDefinition: { field: "journal_date", dir: "desc" },
		aggregateDefinition: [
			{ field: "dr", aggregate: "sum" },
			{ field: "cr", aggregate: "sum" },
		],
		exfield: {
			Date: "journal_date",
			Type: "transaction_type",
			"Txn Number": "journal_number",
			Description: "description",
			Account: "account.name",
			Name: "primary_contact.name",
			Location: "location.name",
			Project: "project.name",
			Segment: "segment.name",
			Class1: "class1.name",
			Class2: "class2.name",
			Class3: "class3.name",
			Class4: "class4.name",
			Class5: "class5.name",
			Currency: "currency.code",
			"Exchange Rate": "exchange_rate",
			Created: "created_date",
			"Created By": "created_by.name",
			"Last Modified": "modified_date",
			"Last Modified By": "modified_by.name",
			debit: "dr",
			credit: "cr",
		},
	}),
	computed: {
		appType(){
		return dataStore.productType;
		},
	},
	methods: {
		// Journal Type Template
		journalTypeTemplate: (dataItem) => {
			// Default link is journal
			let transactionType = EntityType.JOURNAL,
				id = dataItem.journal_uuid;

			// Transaction link
			if (dataItem.referral_transaction_uuid !== "") {
				id = dataItem.referral_transaction_uuid;
				transactionType = dataItem.transaction_type;
			}else{
				/* Cash Transaction */
				let cashTransactionTypes = [];
				for (let ct of EntityType.CASH_TRANSACTION_TYPES)
				cashTransactionTypes.push(ct.value);

				if(~cashTransactionTypes.indexOf(dataItem.transaction_type)) {
					transactionType = "cash_transactions";
				}
			}

			return Helper.linkTemplate(
				dataItem.transaction_type,
				`${transactionType}/view/${id}`
			);
		},
		// Journal Number Template
		journalNumberTemplate: (dataItem) => {
			// Default link is journal
			let transactionType = EntityType.JOURNAL,
				id = dataItem.journal_uuid;

			// Transaction link
			if (dataItem.referral_transaction_uuid !== "") {
				id = dataItem.referral_transaction_uuid;
				transactionType = dataItem.transaction_type;
			}else{
				/* Cash Transaction */
				let cashTransactionTypes = [];
				for (let ct of EntityType.CASH_TRANSACTION_TYPES)
				cashTransactionTypes.push(ct.value);

				if(~cashTransactionTypes.indexOf(dataItem.transaction_type)) {
					transactionType = "cash_transactions";
				}
			}

			return Helper.linkTemplate(
				dataItem.journal_number,
				`${transactionType}/view/${id}`
			);
		},
		// Search journals
		search() {
			let sdate = this.startDate,
				edate = this.endDate;

			if (sdate && edate) {
				sdate =
					kendo.toString(new Date(sdate), "yyyy-MM-dd") + "T00:00:00.000Z";

				edate = new Date(edate);
				edate = kendo.toString(edate, "yyyy-MM-dd") + "T23:59:59.999Z";
			} else {
				sdate = 0;
				edate = 0;
			}

			// Empty dataSource
			let ds = this.$refs.dataSource.kendoWidget();
			ds.data([]);

			/* Cash Basic */
			let cashBasicMethod = "accrual_basic_method";
			if(this.isCashBasic){
				cashBasicMethod = "cash_basic_method";
			}

			// Query
			this.showLoading = true;
			journalReportHandler
				.getJournalReport({
					params: {
						start_date: sdate,
						end_date: edate,
						accounting_method: cashBasicMethod
					},
				})
				.then((res) => {
					if (res) {
						// Bind obj
						this.obj = res.data;
						this.bindData();
					}else{
						/* Alert Error */
						this.$snotify.error(i18n.t("error_something_wrong"));
					}
				})
				.finally(() => {
					this.showLoading = false;
				});
		},
		//Bind Data
		async bindData() {
			let entries = [],
				secondaryAccounts = await this.$store.dispatch('accounting/getSecondaryAccounts'),
				locations = await this.$store.dispatch('locations/getList'),
				projects = await this.$store.dispatch('projects/getList'),
				segments = await this.$store.dispatch('segments/getList'),
				classes = await this.$store.dispatch('classes/getList');

			this.obj.reportLines.forEach((element) => {
				element.journal_entries.forEach((value) => {
					let je = new JournalEntryExtendedModel(value);

					/* Secondary Account */
					je.secondary_account = new AccountModel(
						secondaryAccounts.find((i) => i.uuid === value.secondary_acc_uuid)
					);

					if (value.exchanged_amount > 0) {
						je.dr = value.exchanged_amount;
						je.cr = 0;
					} else {
						je.dr = 0;
						je.cr = Math.abs(value.exchanged_amount);
					}

					// Journal
					je.journal_uuid = element.uuid;
					je.journal_type = element.journal_type;
					je.transaction_type = element.transaction_type;
					je.journal_date = Helper.dateFormat(element.journal_date);
					je.journal_number = element.number;
					je.created_by = element.created_by;
					je.modified_by = element.modified_by;
					je.referral_transaction_uuid = value.journal.referral_transaction_uuid;

					// Location
					je.location = new LocationModel(
						locations.find((item) => item.id === element.location_uuid)
					);

					// Project
					je.project = new ProjectModel(
						projects.find((item) => item.id === element.project_uuid)
					);

					// Segment
					je.segment = new SegmentModel(
						segments.find((item) => item.id === element.segment_uuid)
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

					// Created Date
					je.created_date = Helper.dateFormat(element.created_date);

					// Created By
					if (je.created_by === null) {
						je.created_by = new UserModel();
					} else {
						je.created_by = new UserModel(je.created_by);
					}

					// Modified By
					if (je.modified_by === null) {
						je.modified_by = new UserModel();
					} else {
						je.modified_by = new UserModel(je.modified_by);
					}

					entries.push(je);
				});
			});

			// Bind entries
			this.journalEntries = entries;

			this.showLoading = false;
		},
		generateGroupBy(){
			this.groupDefinition = [
				{ 
					field: "journal_number",
					dir: "desc",
					aggregates : this.aggregateDefinition,
					compare: function(a, b) {
						if (a.items[0].journal_date === b.items[0].journal_date) {
							return 0;
						} else if (a.items[0].journal_date > b.items[0].journal_date) {
							return 1;
						} else {
							return -1;
						}
					}
				},
			];
		},
	},
	mounted () {
		// Generate Group By
		this.generateGroupBy();
	},
};
</script>

<style scoped>
.reports_list {
	position: relative;
	width: 100%;
	background-color: #fff;
	padding: 20px 20px 5px;
}

.report_filter {
	background-color: #f8f8f9;
	padding: 0 20px 5px 20px;
}

.dv_mt {
	margin-top: 20px;
}

.report_block .v-card.third {
	border: none;
	box-shadow: none;
	background-color: #2ca01c;
	color: #fff;
	text-transform: uppercase;
	min-height: 120px;
}

.report_block .v-card.third p.text {
	text-align: left;
	font-size: 16px;
}

.report_block .v-card.third p.number {
	text-align: center;
	font-size: 25px;
	font-weight: 700;
	margin-bottom: 0;
	padding-top: 15px;
}

.report_block .v-card.bg_gray {
	background-color: #f8f8f9;
	border: none;
	box-shadow: none;
	color: #000;
	float: left;
	width: 100%;
}

.report_block .v-card.bg_gray p span.text {
	width: 25%;
}

.report_block .v-card.bg_gray p span.number {
	width: 70%;
	font-size: 19px;
	font-weight: 700;
	padding: 7px 0 0 0;
	text-align: right;
}


@media (max-width: 576px) {
	.dv_mt,
	.dv_mt8 {
		margin-top: 0;
	}

	.reports_list {
		margin-top: 0;
	}
}
</style>
