<template>
	<v-app>
		<v-container>
			<v-row>
				<v-col cols="12" sm="12">
					<div class="reports_list pt-3">
						<h2>{{$t('general_ledger')}}</h2>
						<v-icon 
							onclick="window.history.go(-1); return false;" 
							style="cursor: pointer; color: #333; font-size: 40px;"
							class="float-right"
						>close</v-icon>

						<div class="report_filter">
							<v-row>
								<v-col sm="12" cols="12" class="pb-0">
									<!-- Upper Row -->
									<v-row>
										<v-col sm="12" cols="12" class="pt-1 pb-0">
											<app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
															:initEndDate="endDate" @emitEndDate="endDate = $event" />
										</v-col>
									</v-row>
									<!-- Lower Row -->
									<v-row class="mt-0">
										<v-col class="py-0" sm="3" cols="12" >
											<label class="label text-uppercase">{{$t('account_type')}}</label>
											<v-select class="mt-1"
												:disabled="generalLedgers.length === 0"
												:items="accountTypes"
												item-value="number"
												item-text="name"
												v-model="selectedAccountType"
												@change="onAccountTypeChanges"
												no-data-text="No data found."
												clearable
												outlined />
										</v-col>
										<v-col class="py-0" sm="3" cols="12">
											<label class="label text-uppercase">{{$t('account_group')}}</label>
											<v-select class="mt-1"
												:disabled="selectedAccountType === undefined"
												:items="accountGroups"
												item-value="uuid"
												item-text="name"
												v-model="selectedAccountGroup"
												no-data-text="No data found."
												clearable
												outlined />
										</v-col>
										<v-col class="py-0" sm="3" cols="12">
											<label class="label text-uppercase">{{$t('account')}}</label>
											<v-select class="mt-1"
												:disabled="selectedAccountType === undefined"
												:items="accounts"
												item-value="uuid"
												item-text="name"
												v-model="selectedAccount"
												@change="onAccountChanges"
												no-data-text="No data found."
												outlined
											>
												<!-- <template slot='selection' slot-scope='{ item }'>
													{{ item.number }} - {{ item.name }}
												</template> -->
												<template slot='item' slot-scope='{ item }'>
													{{ item.number }} - {{ item.name }}
												</template>
											</v-select>
										</v-col>
										<v-col sm="2" cols="12" class="pt-4" style="display: flex; align-items: center;">
											<v-btn class="white--text" color="primary" @click="search">
												<i class="b-search" style="font-size: 18px; color:#fff !important;"/>
											</v-btn>
										</v-col>
                                        <v-col sm="1" cols="1" class="pt-4" style="display: flex; align-items: center;">
                                            <downloadexcel
                                                icon
                                                color="black"
                                                class="bg-none float-right "
                                                :data="generalLedgerList"
                                                :fields="exfield"
                                                type="xls"
                                                worksheet="General Ledger Report"
                                                name="GeneralLedgerReport.xls">
                                                <v-icon class="font_34" style="color: black;margin-top: 3px;margin-left: 10px;">fa
                                                    fa-file-excel
                                                </v-icon>
                                            </downloadexcel>
                                        </v-col>
									</v-row>
								</v-col>
								<!-- <v-col sm="2" cols="12" class="pb-0 pt-0">
									<div class="report_export">
										<p class="mb-1">{{$t('export_as')}}:</p>
										<i class="fa fa-print" style="font-size:34px; padding-right:6px;" aria-hidden="true"/>
										<i class="fa fa-file-excel"  style="font-size:34px;padding-right:6px;"  aria-hidden="true"/>
										<i class="fa fa-file-pdf" style="font-size:34px;padding-right:6px;" aria-hidden="true"/>
									</div>
								</v-col> -->
							</v-row>
						</div>
						<!-- loading -->
						<LoadingMe 
							:isLoading ="showLoading" 
							:fullPage  ="false" 
							:myLoading ="true"/>
				
						<div class="report_block">
							<v-row>
								<v-col sm="12" cols="12">
									<v-row>
										<v-col sm="6" cols="12">
											<v-tooltip bottom>
												<template v-slot:activator="{ on, attrs }">
													<v-card class="pa-3 third white--text rounded-0" @click="filterAllAccounts" v-bind="attrs" v-on="on">
														<p class="text">{{$t('no_of_account')}}</p>
														<p class="number">{{ Number(generalLedger.length).toLocaleString() }}</p>
													</v-card>
												</template>
												<span>Click Me</span>
											</v-tooltip>
										</v-col>
										<v-col sm="6" cols="12">
											<v-tooltip bottom>
												<template v-slot:activator="{ on, attrs }">
													<v-card class="pa-3 third white--text rounded-0" @click="filterAccountNegativeBalance" v-bind="attrs" v-on="on">
														<p class="text">{{$t('no_of_account_with_negative')}}</p>
														<p class="number">{{ Number(numberOfAccountWithNegativeBalance).toLocaleString() }}</p>
													</v-card>
												</template>
												<span>Click Me</span>
											</v-tooltip>
										</v-col>
									</v-row>
								</v-col>
								
							</v-row>
						</div>
						<div class="reports_table">
							<v-row>
								<v-col sm="12" cols="12" class="pt-0">
									<kendo-datasource ref="dataSource"
										:data="generalLedgerList"
										:group="groupDefinition"
										:aggregate="aggregateDefinition"
										:group-paging="true"
										:page='1'
										:page-size='100'
										:total='0'>
									</kendo-datasource>

									<kendo-grid id="gridGL" ref="gridGL" class="custom_grid" 
										:data-source-ref="'dataSource'"
										:groupable="true"
										:sortable="true"
										:column-menu="true"
										:reorderable="true"
										:resizable="true"
										:noRecords="true"
										:navigatable="true"
										:pageable-always-visible="true"
										:pageable-page-sizes="[20, 50, 100, 'all']"
										:toolbar="['excel']"
										:excel-file-name="'generalLedger.xlsx'"
										:excel-filterable="true">
										<kendo-grid-column 
											:field="'transaction_type'"
											:title="$t('type')"
											:width="100"
											:group-footer-template="'Total:'"
										/>
										<kendo-grid-column 
											:field="'journal_date'"
											:title="$t('date')"
											:width="100"
										/>
										<kendo-grid-column 
											:field="'journal_number'" 
											:title="$t('txn')"
											:template="journalNumberTemplate"
											:width="100"
										/>

										<kendo-grid-column 
											:field="'primary_contact.name'"
											:title="$t('name')"
											:template="'<span>#=primary_contact.name#</span>'"
											:width="140"
											:hidden="true"
										/>
										<kendo-grid-column 
											:field="'secondary_contacts'" 
											:title="$t('secondary_name')" 
											:width="140"
											:hidden="true"
											:template="'<span>#=secondary_contacts.length>0 ?secondary_contacts[0].name : ``#</span>'"
											:filterable="{ multi: true }" />
										<kendo-grid-column 
											:field="'account.name'"
											:title="$t('account')"
											:width="140"
											:hidden="true"
											:template="'<span>#=account.number# - #=account.name#</span>'"
											:group-header-template="'<span class=\'text-bold text-black\'>#=items[0].account.number# - #=items[0].account.name#</span>'"
										/>
										<kendo-grid-column 
											:field="'description'"
											:title="$t('description')"
											:width="150"
										/>
										<kendo-grid-column 
											:field="'dr'" 
											:title="$t('debit')"
											:format="'{0:#,##0.##;(#,##0.##)}'"
											:width="110"
											:aggregates="['sum']"
											:group-footer-template="'<div class=\'text-right\'>#=kendo.toString(sum, `n`)#</div>'"
											:headerAttributes="{
												style: 'text-align: right;padding-right:35px;'
											}"
											:attributes="{
												style: 'text-align: right;'
											}"
										/>
										<kendo-grid-column 
											:field="'cr'" 
											:title="$t('credit')"
											:format="'{0:#,##0.##;(#,##0.##)}'"
											:width="110"
											:aggregates="['sum']"
											:group-footer-template="'<div class=\'text-right\'>#=kendo.toString(sum, `n`)#</div>'"
											:headerAttributes="{
												style: 'text-align: right;padding-right:35px;'
											}"
											:attributes="{
												style: 'text-align: right;'
											}"
										/>
										<kendo-grid-column 
											:field="'period_balance'"
											:title="$t('period_balance')"
											:format="'{0:#,##0.##;(#,##0.##)}'"
											:width="140"
											:groupHeaderColumnAttributes="{
												style: 'text-align: right; '
											}"
											:headerAttributes="{
												style: 'text-align: right;padding-right:35px; '
											}"
											:attributes="{
												style: 'text-align: right'
											}"
										/>
										<kendo-grid-column 
											:field="'balance'"
											:title="$t('balance')"
											:format="'{0:#,##0.##;(#,##0.##)}'"
											:width="140"
											:group-header-column-template="openBalanceTemplate"
											:groupHeaderColumnAttributes="{
												style: 'text-align: right; '
											}"
											:headerAttributes="{
												style: 'text-align: right;padding-right:35px; '
											}"
											:attributes="{
												style: 'text-align: right'
											}"
										/>
									</kendo-grid>
								</v-col>
							</v-row>
						</div>
						
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
	import kendo from '@progress/kendo-ui';
	import Helper from "@/helper.js";
	import { JournalEntryModel } from "@/scripts/model/AppModels";
    import downloadexcel from "vue-json-excel";
	import JSZip from "jszip";
	window.JSZip = JSZip;
	const $ = require("jquery");
	const {
		accountTypeHandler,
		accountGroupHandler,
		accountHandler,
		generalLedgerHandler,
	} = require("@/scripts/AppHandlers");
	
	export default {
		name: "GeneralLedger",
		components:{
			"LoadingMe": () => import('@/components/Loading'),
			'app-searchdate': () => import('@/components/custom_templates/SearchDate'),
            downloadexcel: downloadexcel
		},
		data: () => ({
			startDate: "",
			endDate: "",
			numberOfAccountWithNegativeBalance: 0,
			// LoadingMe
			showLoading  : false,
			accountTypes 	: [],
			accountGroups 	: [],
			accounts 		: [],
			hasQueryString 	: false,
			selectedAccountType 	: undefined,
			selectedAccountGroup 	: undefined,
			selectedAccount 		: undefined,
			generalLedger : [],
			generalLedgers : [],
			generalLedgerList : [],
			// Kendo dataSource
			groupDefinition: {
                field: "account.name",
                aggregates: [
                    { field: "dr", aggregate: "sum" },
					{ field: "cr", aggregate: "sum" },
                ],
				compare: function(a, b) {
					if (a.items[0].account.number === b.items[0].account.number) {
						return 0;
					} else if (a.items[0].account.number > b.items[0].account.number) {
						return 1;
					} else {
						return -1;
					}
				}
            },
            aggregateDefinition: [
                { field: "dr", aggregate: "sum" },
				{ field: "cr", aggregate: "sum" },
				{ field: "balance", aggregate: "sum" },
			],

            exfield: {
                'Type': 'transaction_type',
                'Date': 'journal_date',
                'Txn': 'journal_number',
                'Description': 'description',
                'Name': 'primary_contact.name',
                'Account Number': 'account.number',
                'debit': 'dr',
                'credit': 'cr',
                'Balance': 'balance'
            },
		}),
		methods:  {
			// Search
			search () {
				let sdate = this.startDate,
					edate = this.endDate;
				
				if(sdate && edate){
					sdate = kendo.toString(new Date(sdate), 'yyyy-MM-dd') + 'T00:00:00.000Z';

					edate = new Date(edate);
					edate = kendo.toString(edate, 'yyyy-MM-dd') + 'T23:59:59.999Z';
				}else{
					sdate = 0;
					edate = 0;
				}

				// Empty dataSource
				let ds = this.$refs.dataSource.kendoWidget();
				ds.data([]);

				this.showLoading = true;
				generalLedgerHandler.getGeneralLedgerReport({
					params : {
						start_date 		: sdate,
						end_date 		: edate,
						//account_type_code : 0,
						//account_group_uuid : 0,
						//account_uuid 	: 0, 
					}
				})
				.then(res => {
					this.generalLedger = res.data;
					this.bindData();

					if(this.hasQueryString){
						/* Set to default = false */
						this.hasQueryString = false;

						this.filterByAccount();
					}
				})
				.finally(() => {
					this.showLoading = false;
				});
			},
			// Bind Data
			bindData(){
				let entries = [], negBalanceCounter = 0;
				
				this.generalLedger.forEach(element => {
					let bal = element.openingBalance;
					let pbal = 0;
					if (element.account.account_type.nature.toLowerCase() === 'cr') {
						bal = bal * -1;
					}

					element.lines.forEach(value => {
						let je = new JournalEntryModel(value);

						// Balance
						if (value.account.account_type.nature.toLowerCase() === 'cr') {
							if (value.exchanged_amount > 0) {
								bal = bal - value.exchanged_amount;
								pbal = pbal - value.exchanged_amount;
							} else {
								bal = bal + (value.exchanged_amount * -1);
								pbal = pbal + (value.exchanged_amount * -1);
							}
						} else {
							bal = bal + value.exchanged_amount;
							pbal = pbal + value.exchanged_amount;
						}

						// Negative Balance Count
						if(bal < 0){
							negBalanceCounter++;
						}

						// Debit / Credit
						if (value.exchanged_amount > 0) {
							je.dr = value.exchanged_amount;
							je.cr = 0;
						} else {
							je.dr = 0;
							je.cr = value.exchanged_amount * -1;
						}

						// Journal
						je.journal_uuid = value.journal.uuid;
						je.referral_transaction_uuid = value.journal.referral_transaction_uuid;
						je.journal_type = value.journal.journal_type;
						je.transaction_type = value.journal.transaction_type;
						je.journal_date = Helper.dateFormat(value.journal.journal_date);
						je.journal_number = value.journal.number;
						je.balance = bal;
						je.period_balance = pbal;
						je.openBal = element.openingBalance;

						entries.push(je);
					})
				});
				
				this.numberOfAccountWithNegativeBalance = negBalanceCounter;

				// Bind Entries
				this.generalLedgers = entries;
				this.generalLedgerList = entries;
			},
			/* KENDO */
			// Journal Number Template
			journalNumberTemplate: (dataItem) => {
				if(dataItem.referral_transaction_uuid !== ''){
					return Helper.linkTemplate(dataItem.journal_number, `${dataItem.transaction_type}/view/${dataItem.referral_transaction_uuid}`);
				}else{
					return Helper.linkTemplate(dataItem.journal_number, `journal/view/${dataItem.journal_uuid}`);
				}
			},
			// Opening Balance Template
			openBalanceTemplate (data) {
				let openBal = data.items[0].openBal;
				if (data.items[0].account.account_type.nature.toLowerCase() === 'cr') {
					openBal = openBal * -1;
				}
				return '<div class="text-right text-bold text-black">' + kendo.toString(openBal, '#,##0.##;(#,##0.##)') + '</div>'
			},
			// On Account Type Changes
			onAccountTypeChanges () {
				// Clear data
				this.accountGroups = [];
				this.accounts = [];
				this.selectedAccountGroup = undefined;
				this.selectedAccount = undefined;

				// Account Group by Account Type
				accountGroupHandler.getByAccountType(this.selectedAccountType)
				.then(res => {
					if(res.data.length > 0){
						this.accountGroups = res.data;
					}
				});

				// Account by Account Type
				accountHandler.getByAccountType(this.selectedAccountType)
				.then(res => {
					if(res.data.length > 0){
						this.accounts = res.data;
					}
				});

				// Filter by account type
				if(this.selectedAccountType){
					this.filterByAccountType();
				}
			},
			// On account group changes
			onAccountGroupChanges () {
				// Filter by account type
				if(this.selectedAccountGroup && this.generalLedgerList.length > 0){
					this.generalLedgerList = this.generalLedgers.filter(
						value => (value.group_code == this.selectedAccountGroup)
					)
				}
			},
			// On account changes
			onAccountChanges () {
				// Filter by account type
				if(this.selectedAccount && this.generalLedgerList.length > 0){
					this.filterByAccount();
				}
			},
			// Filter by account type
			async filterByAccountType () {
				new Promise(resolve => {
					resolve('resolved')

					this.generalLedgerList = this.generalLedgers.filter(
						value => (value.account.account_type.number == this.selectedAccountType)
					)
				})
			},
			// Filter by account group
			async filterByAccountGroup () {
				new Promise(resolve => {
					resolve('resolved')

					this.generalLedgerList = this.generalLedgers.filter(
						m => (m.account_group.uuid == this.selectedAccountGroup)
					)
				})
			},
			// Filter by account
			async filterByAccount () {
				new Promise(resolve => {
					resolve('resolved')

					this.generalLedgerList = this.generalLedgers.filter(
						value => (value.account.uuid == this.selectedAccount)
					)
				})
			},
			// Filter all accounts
			async filterAllAccounts () {
				new Promise(resolve => {
					resolve('resolved')

					this.selectedAccountType 	= undefined
					this.selectedAccountGroup 	= undefined
					this.selectedAccount 		= undefined
					
					this.generalLedgerList = this.generalLedgers
				})
			},
			// Filter account negative balance
			async filterAccountNegativeBalance () {
				new Promise(resolve => {
					resolve('resolved')
					
					if(this.numberOfAccountWithNegativeBalance > 0){
						this.generalLedgerList = this.generalLedgers.filter(
							item => item.balance < 0
						)
					}
				})
			},
			// Load Obj
			loadObj () {
				let q = this.$route.query
				if($.isEmptyObject(q) === false){
					this.hasQueryString = true;
					this.selectedAccount = q.account_id;
					this.startDate =  q.start_date;
					this.endDate = q.end_date;
					this.search();
				}
			},
		},
		watch: {
			// call again the method if the route changes
			'$route': 'loadObj'
		},
		created () {
			// Call Account Type
			accountTypeHandler.getAll()
			.then(res => {
				this.accountTypes = res;
			})
		},
		mounted () {
			// fetch the data when the view is created and the data is
			// already being observed
			this.loadObj();
		},
	};
</script>

<style scoped>
	.result{
		position: relative;
	}
	.reports_list{
		width: 100%;
		background-color: #fff;
		padding: 20px 20px 5px; 
	}
	.report_filter{
		background-color: #F8F8F9;
		padding: 0 20px 5px 20px;
		position: relative;
	}
	.dv_mt{
		margin-top: 60px;
	}
	.report_export{
		position: absolute;
		top: 20px;
	}
	.report_block .v-card.third{
		border: none;
		box-shadow: none;
		min-height: 94px;
		color: #fff;
		text-transform: uppercase;
		min-height: 100px;
	}
	.report_block .v-card.third p.text{ 
		text-align: left;
		margin-bottom: 10px;
		font-size: 16px;
	}
	.report_block .v-card.third p.number{ 
		text-align: center; 
		font-size: 25px;
		font-weight: 700;
		margin-bottom: 0;
		padding-top: 25px;
	}
	.v-text-field__slot input{
		cursor: pointer !important;
	}
	@media (max-width: 576px){
		.dv_mt, .dv_mt8{ margin-top: 0;}
		.reports_list{ margin-top: 0; }
	}
</style>