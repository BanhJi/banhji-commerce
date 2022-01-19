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
			<v-form ref="form">
			<div class="function_header pb-0">
				<h2 class="mb-0">{{ $t("fund_receipt") }}</h2>
				<v-icon onclick="window.history.go(-1); return false;" style="cursor: pointer; color: #333; font-size: 40px;" class="float-right">
					close
				</v-icon>
			</div>
			<v-row>
				<v-col sm="12" cols="12">
				<div class="function_content">
					<v-row>
					<v-col sm="4" cols="12" class="pb-0">
						<label class="label">{{ $t("donor") }}</label>
						<h3 class="text-bold py-1">{{ donor.name }}</h3>

						<label class="label">{{ $t("date") }}</label>
						<h3 class="text-bold py-1">{{ Helper.dateFormat(journal.journal_date) }}</h3>

						<label class="label">{{ $t("number") }}</label>
						<h3 class="text-bold py-1">{{ journal.number }}</h3>
					</v-col>
					<v-col sm="4" cols="12" class="pb-0">
						<label class="label">{{ $t("project") }}</label>
						<h3 class="text-bold py-1">{{ project.name }}</h3>

						<label class="label">{{ $t("segment") }}</label>
						<h3 class="text-bold py-1">{{ segment.name }}</h3>

						<label class="label">{{ $t("location") }}</label>
						<h3 class="text-bold py-1">{{ location.name }}</h3>
					</v-col>
					<v-col sm="4" cols="12" class="pb-0">
						<label class="label">{{ $t("description") }}</label>
						<h3 class="text-bold py-1">{{ journal.description }}</h3>

						<label class="label">{{ $t("txn_currency") }}</label>
						<h3 class="text-bold py-1">{{ currency.code }} - {{ currency.name }}</h3>
					</v-col>
					</v-row>
				</div>
				</v-col>
			</v-row>

			<!-- Grid 1 -->
			<v-row
				style="background-color: rgb(255, 255, 255); width: 100%; margin: 0 auto 0px;"
			>
				<v-col sm="12" cols="12" class="pb-3 pa-0">
				<h2 class="mb-0 font_18">{{ $t("cash_receipt") }}</h2>
				<kendo-datasource
					ref="cashReceiptDS"
					:data="cashReceiptEntries"
				/>

				<kendo-grid
					id="fromGrid"
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
						:template="rowNumberTmplCashReceipt"
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
							style: 'text-align: right; background-color: #EDF1F5',
						}"
						:attributes="{ style: 'text-align: right; ' }"
					/>
					</kendo-grid>
				</v-col>
			</v-row>

			<!-- Grid 2 -->
			<v-row>
				<v-col sm="12" cols="12" class="py-0">
				<h2 class="mb-0 font_18">{{ $t("related_expense") }}</h2>
				<kendo-datasource
					ref="relatedExpenseDS"
					:data="relatedExpenseEntries"
				/>

				<kendo-grid
					id="toGrid"
					class="grid-function"
					:data-source-ref="'relatedExpenseDS'"
					:sortable="false"
					:filterable="false"
					:column-menu="true"
					:scrollable-virtual="true"
				>
					<kendo-grid-column
						:title="$t('no.')"
						:template="rowNumberTmplRelatedExpense"
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
							style: 'text-align: right; background-color: #EDF1F5',
						}"
						:attributes="{ style: 'text-align: right; ' }"
					/>
					<kendo-grid-column
						:field="'class1'"
						:title="$t('class_1')"
						:template="'<span>#=class1.name#</span>'"
						:width="200"
						:headerAttributes="{
							style: 'background-color: #EDF1F5',
						}"
					/>
					<kendo-grid-column
						:field="'class2'"
						:title="$t('class_2')"
						:template="'<span>#=class2.name#</span>'"
						:width="200"
						:headerAttributes="{
							style: 'background-color: #EDF1F5',
						}"
					/>
					<kendo-grid-column
						:field="'class3'"
						:title="$t('class_3')"
						:template="'<span>#=class3.name#</span>'"
						:width="200"
						:headerAttributes="{
							style: 'background-color: #EDF1F5',
						}"
					/>
					<kendo-grid-column
						:field="'class4'"
						:title="$t('class_4')"
						:template="'<span>#=class4.name#</span>'"
						:width="200"
						:headerAttributes="{
							style: 'background-color: #EDF1F5',
						}"
					/>
					<kendo-grid-column
						:field="'class5'"
						:title="$t('class_5')"
						:template="'<span>#=class5.name#</span>'"
						:width="200"
						:headerAttributes="{
							style: 'background-color: #EDF1F5',
						}"
					/>
				</kendo-grid>
				</v-col>
			</v-row>

			<!-- Grid 3 -->
			<v-row>
				<v-col sm="12" cols="12" class="py-0">
					<h2 class="mb-0 font_18">{{ $t("revenue_deffered_grant") }}</h2>
					<kendo-datasource
						ref="revenueDefferedGrantDS"
						:data="revenueDefferedGrantEntries"
					/>

					<kendo-grid
						id="revenueDefferedGrantGrid"
						class="grid-function"
						:data-source-ref="'revenueDefferedGrantDS'"
						:sortable="false"
						:filterable="false"
						:column-menu="true"
						:scrollable-virtual="true"
					>
						<kendo-grid-column
							:title="$t('no.')"
							:template="rowNumberTmplRevenueDefferedGrant"
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
								style: 'text-align: right; background-color: #EDF1F5',
							}"
							:attributes="{ style: 'text-align: right; ' }"
						/>
					</kendo-grid>

					<v-row style="background-color: #fff;">
						<v-col sm="4" cols="12" class="pb-0"> </v-col>
						<v-col sm="4" cols="12" class=" pb-0 pt-5">
							<p>
								<span class="float-left">{{ $t("cash_receipt_and_related_expense") }}</span>
								<span class="float-right text-bold">{{ Number(totalDr).toLocaleString() }}</span>
							</p>
						</v-col>
						<v-col sm="4" cols="12" class="pb-0  pt-5">
							<p>
								<span class="float-left">{{ $t("revenue_deffered_grant") }}</span>
								<span class="float-right text-bold">{{ Number(totalCr).toLocaleString() }}</span>
							</p>
						</v-col>
					</v-row>
				
				</v-col>
			</v-row>

			<v-divider class="mt-3" />

			<v-card outlined dense class="no_border function_footer py-2">
				<v-btn
					class="float-right save_option mx-1 capitalize"
					color="primary"
					@click="print"
				>
					{{ $t("print") }}
				</v-btn>
				<!-- <v-btn
					class="float-right mx-1 white--text capitalize"
					color="blue"
				>
					{{ $t("delete") }}
				</v-btn> -->
				<v-btn
					class="float-right mx-1 white--text capitalize"
					color="lightBlue"
					@click="edit"
				>
				{{ $t("edit") }}
				</v-btn>
			</v-card>
			<v-divider />
			</v-form>
		</v-card>
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
// import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import { 
	JournalModel, 
	JournalEntryModel,
	CurrencyModel,
	ContactModel,
	LocationModel,
	ProjectModel,
	SegmentModel,
	ClassModel,
} from "@/scripts/model/AppModels";

const journalHandler = require("@/scripts/journalHandler");
const AccountTypeCode = require("@/scripts/default_setup/AccountTypeCode");

export default {
	name: "FundReceiptView",
	components: {
		"LoadingMe": () => import('@/components/Loading'),
	},
	props: {
		initJournal: {
			type: JournalModel,
		},
	},
	data: () => ({
		//Obj
		journal: new JournalModel(),
		currency: new CurrencyModel(),
		donor : new ContactModel(),
		location: new LocationModel(),
		project: new ProjectModel(),
		segment: new SegmentModel(),
		cashReceiptEntries: [],
		relatedExpenseEntries: [],
		revenueDefferedGrantEntries : [],
		totalDr: 0,
		totalCr: 0,
		Helper: Helper,
		// LoadingMe
		showLoading: false,
	}),
	methods: {
		// Load journal according to query string {id}
		loadObj() {
			let self = this;

			// Access Query String
			let q = this.$route.params;
			if (q.id !== undefined) {
				if(q.id !== this.journal.uuid){
					this.showLoading = true;

					journalHandler.getOne(q.id)
					.then(res => {
						// Bind Obj
						this.journal = new JournalModel(res.data);
						this.bindData();
					})
					.finally(() => {
						self.showLoading = false;
					});
				}
			}
		},
		async bindData() {
			// Bind Obj
			let totalDr = 0,
				totalCr = 0,
				cashReceiptEntries = [],
				relatedExpenseEntries = [],
				revenueDefferedGrantEntries = [];

			// Donor
			this.donor = new ContactModel(this.journal.journal_entries[0].primary_contact);

			/* Classes */
            let classes = await this.$store.dispatch('classes/getList');

			// Currency
			this.currency = new CurrencyModel(this.journal.journal_entries[0].currency);

			this.journal.journal_entries.forEach(value => {
				let je = new JournalEntryModel(value);

				if(value.amount > 0){// Dr side
					if(~AccountTypeCode.CASH_ACCOUNTS.indexOf(value.account.account_type.number)){
						cashReceiptEntries.push(je);
					}else{
						// Classes
						je.class1 = new ClassModel(classes.find(item => item.id === value.class_1_uuid));
						je.class2 = new ClassModel(classes.find(item => item.id === value.class_2_uuid));
						je.class3 = new ClassModel(classes.find(item => item.id === value.class_3_uuid));
						je.class4 = new ClassModel(classes.find(item => item.id === value.class_4_uuid));
						je.class5 = new ClassModel(classes.find(item => item.id === value.class_5_uuid));

						relatedExpenseEntries.push(je);
					}
					totalDr += value.amount;
				}else{// Cr side
					je.amount = Math.abs(value.amount);
					revenueDefferedGrantEntries.push(je);
					totalCr += je.amount;
				}
			});

			// Sidebar
			let locations = await this.$store.dispatch('locations/getList');
			this.location = new LocationModel(locations.find(i => i.id === this.journal.location_uuid));

			let segments = await this.$store.dispatch('segments/getList');
			this.segment = new SegmentModel(segments.find(i => i.id === this.journal.segment_uuid));

			let projects = await this.$store.dispatch('projects/getList');
			this.project = new ProjectModel(projects.find(i => i.id === this.journal.project_uuid));

			this.totalDr = totalDr;
			this.totalCr = totalCr;

			this.cashReceiptEntries = cashReceiptEntries;
			this.relatedExpenseEntries = relatedExpenseEntries;
			this.revenueDefferedGrantEntries = revenueDefferedGrantEntries;
		},
		// Row Number Template
		rowNumberTmplCashReceipt (dataItem) {
			let ds = this.$refs.cashReceiptDS.kendoWidget(),
				index = ds.indexOf(dataItem);

			return index + 1;
		},
		rowNumberTmplRelatedExpense (dataItem) {
			let ds = this.$refs.relatedExpenseDS.kendoWidget(),
				index = ds.indexOf(dataItem);

			return index + 1;
		},
		rowNumberTmplRevenueDefferedGrant (dataItem) {
			let ds = this.$refs.revenueDefferedGrantDS.kendoWidget(),
				index = ds.indexOf(dataItem);

			return index + 1;
		},
		getJournal () {
			return this.journal;
		},
		edit() {
			this.$router.replace({ name: 'Fund Receipt', params: { initJournal: this.getJournal() } });
		},
		print() {
			// window.print();
		},
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
.function_content {
  padding: 0 25px 25px;
  border-bottom: 0;
}
.attachment_table.theme--light.v-data-table {
  background-color: transparent !important;
}
.from_to {
  font-size: 26px !important;
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
