 <template>
	<v-row class="">
		<v-col sm="4" cols="12">
			<v-card outlined dense class="pa-3 no_border mb-3">
				<v-text-field class=" mb-3"
					v-model="searchText"
					outlined
					:placeholder="$t('account_number')"
					@change="onSearchChanges"
					append-icon="search"
					clearable
				/>
				<v-select class=""
					:items="account_types"
					item-value="number"
					item-text="name"
					:placeholder="$t('all_account_type')"
					clearable
					outlined
					@change="onAccountTypeChanges"
				/>
			</v-card>
			<v-card outlined dense class="pa-3 no_border hidden-sm-and-down">
				<!-- loading -->
				<div v-if="!isLoaded">
					<LoadingMe
						:isLoading="showLoading"
						:fullPage="false"
						:myLoading="true" />
				</div>
				<kendo-datasource ref="accountDS"
					:data="accounts"
					:schema="schemaDefinition"
					:sort="sortDefinition"
					:group="groupDefinition">
				</kendo-datasource>

				<kendo-grid id="gridCOA" class="grid-center"
					:change="onCOAGridChange"
					:data-source-ref="'accountDS'"
					:selectable="true"
					:persistSelection="true"
					:noRecords="true"
					:scrollable="true"
					:height="535"
					:pageable-numeric="false"
					:pageable-previous-next="false"
					:pageable-messages-display="'Showing {2} data items'">
					<kendo-grid-column
						:field="'account_type.name'"
						:title="'Type'"
						:hidden="true"
						:group-header-template="'#=value#'"
					/>
					<kendo-grid-column
						:field="'name'"
						:title="'&nbsp;'"
						:template="'<span>#=number# #=name#</span>'"
					/>
				</kendo-grid>
			</v-card>
		</v-col>
		<v-col sm="8" cols="12">
			<div v-if="isLoaded">
				<LoadingMe
					:isLoading="showLoading"
					:fullPage="false"
					:myLoading="true" />
			</div>
			<v-row>
				<v-col sm="7" cols="12">
					<v-card outlined dense class="pa-4 no_border bg_blue mb-3">
						<v-btn class="btn_edit float-right" @click="goEdit" :disabled="account.uuid === undefined">
							{{$t('edit')}}
						</v-btn>
						<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
								<p class="title" color="whiteR"
									dark
									v-bind="attrs"
									v-on="on">
									<span v-text="account.number"/> <span v-text="account.name"/>
								</p>
							</template>
							<span v-text="account.name"/>
						</v-tooltip>
					</v-card>
					<v-card outlined dense class="pa-2 no_border third">
						<p class="mb-0" >
							<span class="float-left text-uppercase">{{$t('forwarded')}}</span>
							<span class="float-right" v-if="accountInfo.future_date_transaction">
								{{ Number(accountInfo.future_date_transaction).toLocaleString() }}
							</span>
						</p>
					</v-card>
				</v-col>
				<v-col sm="5" cols="12">
					<v-card outlined dense class="pa-2 no_border bg_black mb-3">
						<p class="mb-0 text-left text-uppercase" >{{$t('balance_as_of_today')}}</p>
						<p class="mb-0 text-right" v-if="accountInfo.balance">
							{{ Number(accountInfo.balance).toLocaleString() }}
						</p>
					</v-card>
					<v-card outlined dense class="pa-2 no_border third">
						<p class="mb-0" >
							<span class="float-left text-uppercase">{{$t('backdated')}}</span>
							<span class="float-right" v-if="accountInfo.back_date_transaction">
								{{ Number(accountInfo.back_date_transaction).toLocaleString() }}
							</span>
						</p>
					</v-card>

				</v-col>
			</v-row>

			<v-row>
				<v-col sm="12" cols="12" class="tab_txn_att">
					<v-tabs >
						<v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
							<span class="hidden-sm-and-down  text-upercase">
								{{$t('transactions')}}
							</span>
						</v-tab>
						<v-tab @click="loadReconcile">
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
							<span class="hidden-sm-and-down text-upercase">
								{{$t('reconciliations')}}
							</span>
						</v-tab>
						<v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
							<span class="hidden-sm-and-down text-upercase">
								{{$t('attachments')}}
							</span>
						</v-tab>

						<!-- Transactions -->
						<v-tab-item>
							<v-card flat class="pa-5 custom_vcard">
								<v-card-text class="pt-0 bg_white">
									<v-row class="pa-2">
										<v-col sm="10" cols="12" class="pa-0">
											<app-searchdate :initStartDate="start_date" @emitStartDate="start_date = $event"
															:initEndDate="end_date" @emitEndDate="end_date = $event" />
										</v-col>

										<v-col sm="1" cols="1" class="px-0">
											<v-btn class="btn_search" @click="searchTransaction" style="background-color: rgb(237, 241, 245)">
												<i class="b-search" style="font-size: 18px; color:#fff !important;"/>
											</v-btn>
										</v-col>
									</v-row>

									<v-col sm="12" cols="12" class="pa-0">
										<v-simple-table class="custom-table" fixed-header height="300px">
											<v-data-table
													:headers="headers"
													:items="journal_entries"
													class="elevation-1"
											>
												<!-- Journal Date -->
												<template v-slot:[`item.journal_date`]="{ item }">
													<span>{{ helper.dateFormat(item.journal_date) }}</span>
												</template>

												<!-- Journal Number as Link -->
												<template v-slot:[`item.journal_number`]="{ item }">
													<router-link :to="'journal/view/' + item.id">{{ item.journal_number }}</router-link>
												</template>
											</v-data-table>
										</v-simple-table>
									</v-col>
								</v-card-text>
							</v-card>
						</v-tab-item>
						<!-- Reconciliations -->
						<v-tab-item>
							<v-card flat class="pa-5 custom_vcard">
								<v-card-text class="pt-0 bg_white">
									<v-row>
										<v-col sm="12" cols="12" class="pa-2">
											<v-data-table 
                                                :headers="reconcileHeaders"
                                                :items="reconcileList"
                                                class="elevation-1"
                                            >
                                                <template v-slot:item="{ item, index }">
                                                    <tr>
                                                        <td style="text-align: center;">{{ index + 1 }}</td>
                                                        <td class="text-xs-right">{{ helper.dateFormat(item.date) }}</td>
                                                        <td class="text-xs-right">{{ item.number }}</td>
                                                        <td style="text-align: right;">{{ Number(item.variance_amount).toLocaleString() }}</td>
                                                        <td></td>
                                                    </tr>
                                                </template>
                                            </v-data-table>
										</v-col>
									</v-row>
								</v-card-text>
							</v-card>
						</v-tab-item>
						<!-- Attachment -->
						<v-tab-item>
							<v-card flat class="pa-5">
								<v-card-text class="bg_white">
									<p class="mb-2">{{$t('file_type')}} [PDF, JPG, JPEG, TIFF, PNG, GIF]</p>
									<template>
										<v-file-input
											v-model="files"
											:placeholder="$t('attachments')"
											multiple
											prepend-icon="mdi-paperclip">
											<template v-slot:selection="{ text }">
												<v-chip
													small
													label
													color="primary"
												>
													{{ text }}
												</v-chip>
											</template>
										</v-file-input>
									</template>

									<v-simple-table class="attachment_table mb-3" >
										<template v-slot:default>
											<thead>
											<tr>
												<th>{{$t('file_name')}}</th>
												<th>{{$t('description')}}</th>
												<th>{{$t('date')}} </th>
												<th class="text-center"/>
											</tr>
											</thead>
											<tbody>
											<tr v-for="item in attachments" :key="item.file">
												<td>{{ item.file }}</td>
												<td>{{ item.desc }}</td>
												<td>{{ item.date }}</td>
												<td class="text-center">
													<v-btn color="primary" class="mr-2 pa-0">
														<v-icon size="" class="ma-1">edit</v-icon>
													</v-btn>
													<v-btn color="primary" class="mr-2 pa-0">
														<v-icon size="" class="ma-1">delete</v-icon>
													</v-btn>
												</td>
											</tr>
											</tbody>
										</template>
									</v-simple-table>

									<v-btn class="btn_save_att">
										<v-icon size="15" class="mr-2">fa-check</v-icon>
										{{$t('save')}}
									</v-btn>
								</v-card-text>
							</v-card>
						</v-tab-item>

					</v-tabs>
				</v-col>
			</v-row>
		</v-col>

	</v-row>
		
</template>

<script>
	import kendo from '@progress/kendo-ui'
	import LoadingMe from '@/components/Loading'
	import {i18n} from '@/i18n'
	import SearchDateComponent from '@/components/custom_templates/SearchDate'
	import helper from "@/helper.js"

	const accountTypeHandler	= require("@/scripts/handler/accounting/accountType.js")
	const accountHandler		= require("@/scripts/handler/accounting/account.js")
	const journalHandler		= require("@/scripts/journalHandler.js")
	const reconcileHandler		= require("@/scripts/reconcileHandler.js")
	const accountTypeCode 		= require("@/scripts/default_setup/AccountTypeCode.js");
	
	export default {
		name: "Cash",
		components:{
			'LoadingMe': LoadingMe,
			'app-searchdate': SearchDateComponent,
		},
		data: () => ({
			helper 			: helper,
			// Search transaction dates
			start_date		: "",
			end_date		: "",
			journal_entries : [],
			reconcileList 	: [],
			reconcileHeaders : [
                { text: i18n.t('no.') },
                { text: i18n.t('date'), value: 'date' },
                { text: i18n.t('number'), value: 'number' },
                { text: i18n.t('variance'), value: 'variance_amount' },
                { text: i18n.t('action') },
            ],
			// COA sidebar
			searchText 		: '',
			accounts 		: [],
			accounts_bk 	: [],
			account_types 	: [],
			// Account information
			account 		: [],//Obj
			accountInfo 	: [],
			files			: [],
			attachments 	: [],
			balance 		: 0,
			backdated 		: 0,
			forwarded 		: 0,
			// LoadingMe
			showLoading		: true,
			isLoaded	   	: false,
			// Kendo dataSource
			schemaDefinition	: {
				model: { id: "uuid" }
			},
			/* Sort by account number */
			sortDefinition: { field: "number" },
			// Group order by account_type_id asc
			groupDefinition: { 
				field: "account_type.name",
				compare: function(a, b) {
					if (a.items[0].number === b.items[0].number) {
						return 0;
					} else if (a.items[0].number > b.items[0].number) {
						return 1;
					} else {
						return -1;
					}
				}
			},
		}),
		methods: {
			// On Sorter Changes
			onSorterChanges(val) {
				let today = new Date()

				switch (val) {
					case "Today":
						this.start_date = kendo.toString(today, 'yyyy-MM-dd')
						this.end_date = kendo.toString(today, 'yyyy-MM-dd')

						break
					case "This Week":
						var first = today.getDate() - today.getDay(),
							last = first + 6;

						this.start_date = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
						this.end_date = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')

						break
					case "This Month":
						this.start_date = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
						this.end_date = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')

						break
					case "This Year":
						this.start_date = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
						this.end_date = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')

						break
					default:
						this.start_date = "";
						this.end_date = "";
				}
			},
			// Search Transaction
			searchTransaction () {
				let self = this,
					account = this.account,
					sdate = this.start_date,
					edate = this.end_date
				
				if(account.uuid){
					if (sdate && edate) {
						sdate = kendo.toString(new Date(sdate), 'yyyy-MM-dd') + 'T00:00:00.000Z'

						edate = new Date(edate)
						edate = kendo.toString(edate, 'yyyy-MM-dd') + 'T23:59:59.999Z'
					} else {
						sdate = 0
						edate = 0
					}

					this.isLoaded = true
					this.showLoading = true
					journalHandler.getEntryDetailByAccount(account.uuid, {
						params: {
							start_date 		: sdate,
							end_date 		: edate,
						}
					})
					.then(res => {
						if(res){
							this.accountInfo = res
							this.journal_entries = res.entries_detail
						}
					})
					.finally(function () {
						self.showLoading = false
					})
				}
			},
			// On Account Type Changes
			async onAccountTypeChanges(accountTypeNumber) {
				new Promise(resolve => {
					resolve('resolved')
					
					if(accountTypeNumber === undefined){
						this.accounts = this.accounts_bk
					}else{
						this.accounts = this.accounts_bk.filter(
							m => m.account_type.number === accountTypeNumber
						)
					}
				})
			},
			// On Search Changes
			async onSearchChanges(searchText) {
				new Promise(resolve => {
					resolve('resolved')
					
					if(searchText !== ''){
						this.accounts = this.accounts_bk.filter(
							m => (m.number.toLowerCase().indexOf(searchText) > -1 || m.name.toLowerCase().indexOf(searchText) > -1)
						);
					}else{
						this.accounts = this.accounts_bk
					}
				})
			},
			// On Change item selection
			onCOAGridChange () {
				let grid = kendo.jQuery("#gridCOA").data("kendoGrid")
				let selectedItem = grid.dataItem(grid.select())
				
				if(this.account.uuid !== selectedItem.uuid){
					this.account = selectedItem
					this.searchTransaction()
				}
			},
			// Go To Edit Page
			goEdit () {
				let acc = this.account
				if(acc.uuid){
					this.$router.push({ name: 'Account', params: { id: acc.uuid }})
				}
			},
			// Load Reconcile
            loadReconcile () {
                reconcileHandler.getAll()
                .then(res => {
                    if(res.data){
                        this.reconcileList = res.data
                        this.showLoading = false
                    }
                })
            },
		},
		mounted() {
			// Call Account Type List
			accountTypeHandler.getAll()
			.then(res => {
				if(res.data){
					this.account_types = res.data.filter(item => ~accountTypeCode.CASH_ACCOUNTS.indexOf(item.number)) // Filter Cash Account Type
				}
			})

			// Call Account List
			accountHandler.getAll()
			.then(res => {
				if(res){
					let accts = res.data.filter(item => ~accountTypeCode.CASH_ACCOUNTS.indexOf(item.account_type.number)) // Filter Cash Account
					this.accounts = accts
					this.accounts_bk = accts
					this.showLoading = false
				}
			})
		},
		computed: {
			headers(){
				return	[
					{ text: i18n.t('date'), value: 'journal_date' },
					{ text: i18n.t('type'), value: 'journal_type' },
					{ text: i18n.t('number'), value: 'journal_number' },
					{ text: i18n.t('description'), value: 'description' },
					{ text: i18n.t('debit'), value: 'dr' },
					{ text: i18n.t('credit'), value: 'cr' },
				]
			},
		},
	};
</script>
<style scoped>
	.dropdown_view.theme--light.v-btn.v-btn--icon {
		color: rgba(0, 0, 0, 0.54);
		padding: 0px 40px 0px 50px;
	}
	.v-menu__content{
		top: 595px !important;
		left: 1243px !important;
	}
	.v-menu__content .v-list{
		width: 120px;
	}
	.v-menu__content .v-list .v-list-item{
		min-height: 30px !important;
	}
	.v-menu__content .v-list .v-list-item .v-list-item__title{
		font-size: 12px;
	}
	.v-card{
		background-color: rgb(237, 241, 245);
	}
	.v-card.bg_blue{
		background-color: #92d050;
		color: #fff;
		min-height: 72px;
	}
	.v-card.bg_black{
		background-color:#333;
		color: #fff;
		min-height: 72px;
	}
	.v-card.bg_blue p.title{
		color: #fff;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.btn_edit{
		background-color: #00b050 !important;
	}
	.v-card.bg_blue p{
		color: #FFF;
	}
	.v-card.third{
		background-color: #2CA01C;
		color: #FFF;
		display: grid;
		min-height: 52px;
	}
	
	p.title{
		margin-bottom: 0;
		font-weight: 700;
		color: #333;
		text-align: left;
	}
	.v-tab--active{
		background-color: rgb(237, 241, 245);
	}
	.tab_txn_att .v-tab--active{
		font-weight: 700;
	}
	
	.bg_white{
		background-color: #fff;
	}
	.no_border .v-data-table{
		height: 470px;
		overflow-y: scroll !important;
	}
	.no_border.hidden-sm-and-down .v-data-table td{
		height: 40px;
	}
	.custom_vcard.v-card{
		overflow-wrap: initial;
	}
	.k-grid td.k-state-selected, .k-grid tr.k-state-selected>td{
		background-color: rgba(67,168,52,0.25);
	}
	
	.attachment_file{
		background-color: #EFEDED;
		border-radius: 0 !important;
	}
	.view_action{
        text-transform: uppercase;
    }

	.disabled-header.k-grid tr*{ cursor: pointer;}
	@media (max-width: 576px){
		
	}
</style>