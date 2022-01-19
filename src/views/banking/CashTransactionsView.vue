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
				<h2 class="mb-0">{{ $t("cash_transaction") }}</h2>
				<v-icon onclick="window.history.go(-1); return false;" style="cursor: pointer; color: #333; font-size: 40px;" class="float-right">
					close
				</v-icon>
			</div>
			<v-row>
				<v-col sm="12" cols="12">
				<div class="function_content">
					<v-row>
					<v-col sm="4" cols="12" class="pb-0">
						<label class="label">{{ $t("date") }}</label>
						<h3 class="text-bold py-1">{{ Helper.dateFormat(journal.journal_date) }}</h3>

						<label class="label">{{
						$t("transaction_type")
						}}</label>
						<h3 class="text-bold py-1">{{ journal.transaction_type }}</h3>
					</v-col>
					<v-col sm="4" cols="12" class="pb-0">
						<label class="label">{{ $t("number") }}</label>
						<h3 class="text-bold py-1">{{ journal.number }}</h3>

						<label class="label">{{ $t("txn_currency") }}</label>
						<h3 class="text-bold py-1"><h3>{{ currency.code }} - {{ currency.name }}</h3></h3>
					</v-col>
					<v-col sm="4" cols="12" class="pb-0">
						<label class="label">{{ $t("description") }}</label>
						<h3 class="text-bold py-1">{{ journal.description }}</h3>
					</v-col>
					</v-row>
				</div>
				</v-col>
			</v-row>

			<v-row
				class="grayBg"
			>
				<v-col sm="12" cols="12" class="pb-3 pa-0">
				<v-row>
					<v-col sm="1" cols="12" class="pt-0 pl-6">
					<h2 class="mb-0">{{ $t("from_to") }}</h2>
					</v-col>
					<v-col sm="3" cols="12" class="pt-0 pr-0">
						
					</v-col>
					<v-col sm="3" cols="12" class=" pl-0">
						{{ fromBank.name }}
					</v-col>
				</v-row>
				<kendo-datasource
					ref="fromDS"
					:data="fromAccountEntries"
				/>

				<kendo-grid
					id="fromGrid"
					class="grid-function"
					:data-source-ref="'fromDS'"
					:sortable="false"
					:filterable="false"
					:column-menu="true"
					:editable="true"
					:scrollable-virtual="true"
				>
					<kendo-grid-column
						:title="$t('no.')"
						:template="rowNumberTmplFrom"
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
						:template="this.$store.state.accounting.accountLanguage === 'English'
								? '<span>#=account.number#</span> - <span>#=account.name#</span>'
								: '<span>#=account.number#</span> - <span>#=account.local_name#</span>'
						"
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
			<v-row>
				<v-col sm="12" cols="12" class="py-0">
				<v-row>
					<v-col sm="1" cols="12" class="pt-0">
						<h2 class="mb-0">{{ $t("to_from") }}</h2>
					</v-col>
					<v-col sm="3" cols="12" class="pt-0 pr-0">
						
					</v-col>
					<v-col sm="3" cols="12" class="pt-0 pl-0">
						{{ toBank.name }}
					</v-col>
				</v-row>
				<kendo-datasource
					ref="toDS"
					:data="toAccountEntries"
				/>

				<kendo-grid
					id="toGrid"
					class="grid-function"
					:data-source-ref="'toDS'"
					:sortable="false"
					:filterable="false"
					:column-menu="true"
					:scrollable-virtual="true"
				>
					<kendo-grid-column
						:title="$t('no.')"
						:template="rowNumberTmplTo"
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
						:template="this.$store.state.accounting.accountLanguage === 'English'
								? '<span>#=account.number#</span> - <span>#=account.name#</span>'
								: '<span>#=account.number#</span> - <span>#=account.local_name#</span>'
						"
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
					<v-col sm="5" cols="12" class="pb-0"> </v-col>
					<v-col sm="3" cols="12" class=" pb-0 pt-5">
						<p>
							<span class="float-left">{{ $t("total_from") }}</span>
							<span class="float-right text-bold">{{ Number(totalFrom).toLocaleString() }}</span>
						</p>
					</v-col>
					<v-col sm="3" cols="12" class="pb-0  pt-5">
						<p>
							<span class="float-left">{{ $t("total_to") }}</span>
							<span class="float-right text-bold">{{ Number(totalTo).toLocaleString() }}</span>
						</p>
					</v-col>
				</v-row>
				</v-col>
			</v-row>

			<v-divider class="mt-3" />
			<v-card outlined dense class="no_border function_footer py-2">
				<v-btn
					class="float-right save_option mx-1 capitalize"
					color="secondary"
					@click="_print(4)"
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
					color="primary"
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
// import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import { 
	JournalModel, 
	JournalEntryExtendedModel,
	AccountModel,
	CurrencyModel,
	BankModel,
} from "@/scripts/model/AppModels";

const { journalHandler } = require("@/scripts/AppHandlers");
// const { EntityType } = require("@/scripts/default_setup/Collections");
// from
const {getFormSetting} = require("@/scripts/settingsHandler.js")
import {print} from "@/form/Accounting.js";
import {i18n} from '@/i18n';

export default {
	name: "CashTransactionView",
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
		fromAccountEntries: [],
		toAccountEntries: [],
		totalFrom: 0,
		totalTo: 0,
		has_from_bank: 0,
		has_to_bank: 0,
		fromBank: new BankModel(),
		toBank: new BankModel(),
		Helper: Helper,
		// LoadingMe
		showLoading: false,
		loadingAlert: false,
		loadingColorAlert: "",
		loadingTextAlert: "",
	}),
	methods: {
		_print(id) {
			let print_data = {};
            let params = "?formType=BankTransaction"
            print_data['toAccountEntries'] = this.toAccountEntries
            print_data['fromAccountEntries'] = this.fromAccountEntries
			print_data['journal'] = this.journal
			print_data['currency'] = this.currency

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
		// Load journal according to query string {id}
		loadObj() {
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
					.finally(function() {
						// self.showLoading = false;
					});
				}
			}
		},
		async bindData() {
			// Bind Obj
			let totalFrom = 0,
				totalTo = 0,
				fromEntries = [],
				toEntries = [],
				secondaryAccounts = await this.$store.dispatch("accounting/getSecondaryAccounts");

			// Currency
			this.currency = new CurrencyModel(this.journal.journal_entries[0].currency);

			this.journal.journal_entries.forEach(value => {
				let je = new JournalEntryExtendedModel(value);

				/* Secondary Account */
				je.secondary_account = new AccountModel(
					secondaryAccounts.find((i) => i.uuid === value.secondary_acc_uuid)
				);

				if(value.amount > 0){// Dr side
					fromEntries.push(je);
					totalFrom += value.amount;
				}else{// Cr side
					je.amount = Math.abs(value.amount);
					toEntries.push(je);
					totalTo += je.amount;
				}
			});
			this.totalFrom = totalFrom;
			this.totalTo = totalTo;
			this.fromAccountEntries = fromEntries;
			this.toAccountEntries = toEntries;

			this.showLoading = false;
		},
		// Row Number Template
		rowNumberTmplFrom (dataItem) {
			let ds = this.$refs.fromDS.kendoWidget(),
				index = ds.indexOf(dataItem);

			return index + 1;
		},
		rowNumberTmplTo (dataItem) {
			let ds = this.$refs.toDS.kendoWidget(),
				index = ds.indexOf(dataItem);

			return index + 1;
		},
		getJournal () {
			return new JournalModel(this.journal);
		},
		edit() {
			this.$router.replace({ name: 'Cash Transactions', params: { initJournal: this.getJournal() } });
		},
		print() {
			// Code here
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
