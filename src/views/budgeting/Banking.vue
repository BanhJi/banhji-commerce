<template>
    <v-row class="">
        <v-col sm="4" cols="12">
            <v-card outlined dense class="pa-3 no_border mb-3">
                <v-text-field class=" mb-3"
                    @change="onSearchChanges"
                    v-model="searchText"
                    outlined
                    :placeholder="$t('account_number')"
                    append-icon="search"
                    clearable
                />
                <v-select class=""
                    @change="onAccountTypeChanges"
                    :items="accountTypes"
                    item-value="number"
                    item-text="name"
                    :placeholder="$t('all_account_type')"
                    clearable
                    outlined
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
                <kendo-datasource ref="bankAccountDS"
                    :data="bankAccounts"
                    :schema="schemaDefinition"
                    :group="groupDefinition"/>

                <kendo-grid id="gridBankAccount" class="grid-center"
                    :change="onBankAccountGridChanges"
                    :data-source-ref="'bankAccountDS'"
                    :selectable="true"
                    :persistSelection="true"
                    :noRecords="true"
                    :scrollable="true"
                    :height="535"
                    :pageable-numeric="false"
                    :pageable-previous-next="false"
                    :pageable-messages-display="'Showing {2} data items'">
                    <kendo-grid-column
                        :field="'account.account_type.name'"
                        :title="'Type'"
                        :hidden="true"
                        :group-header-template="'#=value#'"
                    />
                    <kendo-grid-column
                        :field="'account'"
                        :title="'&nbsp;'"
                        :template="'<span>#=account.number# #=account.name#</span>'"
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
                    <v-card outlined dense class="pa-2 no_border bg_blue mb-2">
                        <p class="mb-0 text-left text-capitalize">{{$t('bank_account_no')}}:</p>
                        <p class="mb-0 text-right" v-text="bankAccount.number"/>
                    </v-card>
                    <v-card outlined dense class="pa-2 no_border bg_blue mb-2">
                        <p class="mb-0 text-left text-capitalize">{{$t('name_in_bank')}}:</p>
                        <p class="mb-0 text-right" v-text="bankAccount.name"></p>
                    </v-card>
                    <v-card  outlined dense style="background-color: transparent; border: 0 !important">
                        <v-row>
                            <v-col sm="6" cols="12" class="py-0">
                                <v-img width="40" class="float-left mr-2" src="@/assets/images/ppcbank1.png" />
                                <p style="font-size: 16px;" class="text-uppercase mb-0 text-center" v-text="bankAccount.type"></p>
                            </v-col>
                            <v-col sm="3" cols="12" class="py-0 border-left-right text-center">
                                <p class="mb-0 mx-auto font-bold" v-if="bankAccount.currency">
                                    {{ bankAccount.currency.code }}
                                </p>
                            </v-col>
                            <v-col sm="3" cols="12" class="py-0">
                                <v-btn class="btn_edit float-right rounded-0"  @click="goEdit" :disabled="bankAccount.uuid === undefined">
                                    {{$t('edit')}}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>

                </v-col>
                <v-col sm="5" cols="12">
                    <v-card outlined dense class="pa-2 no_border bg_black mb-2">
                        <p class="mb-0 text-left" >{{$t('balance_as_of_today')}}</p>
                        <p class="mb-0 text-right" v-if="bankAccountDetails.balance">
                            {{ Number(bankAccountDetails.balance).toLocaleString() }}
                        </p>
                    </v-card>
                    <v-card outlined dense class="pa-2 no_border third mb-2">
                        <p class="mb-0" >
                            <span class="float-left">{{$t('chart_of_account')}}</span>
                            <span class="float-right" v-if="bankAccountDetails.balance">
                                {{ Number(bankAccountDetails.balance).toLocaleString() }}
                            </span>
                        </p>
                    </v-card>
                    <v-card outlined dense class="pa-2 no_border third">
                        <p class="mb-0" >
                            <span class="float-left">{{$t('connected')}}</span>
                            <span class="float-right text-uppercase">no</span>
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
                            <span class="hidden-sm-and-down">
                                {{$t('transactions')}}
							</span>
                        </v-tab>
                        <v-tab @click="loadReconcile">
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
                            <span class="hidden-sm-and-down">
								{{$t('reconciliations')}}
							</span>
                        </v-tab>
                        <v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
                            <span class="hidden-sm-and-down">
								{{$t('attachments')}}
							</span>
                        </v-tab>

                        <!-- Transaction -->
                        <v-tab-item>
                            <v-card flat class="pa-5 custom_vcard">
                                <v-card-text class="pt-0 bg_white">
                                    <v-row class="pa-2">
										<v-col sm="4" cols="12" class="pa-0">
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
                                        <v-data-table 
                                                :headers="journalEntryDetailHeaders"
                                                :items="journalEntriesDetails"
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
                                            <v-btn class="btn_reconcile">
                                                {{$t('connect_data')}}
                                            </v-btn>
                                            <v-btn class="btn_reconcile" @click="loadReconcile">
                                                {{$t('refresh_data')}}
                                            </v-btn>
                                            <v-btn class="btn_reconcile" link route to="cash_reconciliation">
                                               {{$t('new_reconciliation')}}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
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
                                                        <td class="text-xs-right">{{ dateFormat(item.date) }}</td>
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
    const bankAccountHandler	= require("@/scripts/bankAccountHandler.js")
    const journalHandler		= require("@/scripts/journalHandler.js")
    const reconcileHandler		= require("@/scripts/reconcileHandler.js")
    const accountTypeCode       = require("@/scripts/default_setup/AccountTypeCode.js");
    
    export default {
        name: "Banking",
        components:{
            'LoadingMe': LoadingMe,
			'app-searchdate': SearchDateComponent,
		},
        data: () => ({
            helper          : helper,
			// Search transaction dates
			start_date		: "",
			end_date		: "",
            journalEntriesDetails : [],
            reconcileList   : [],
            journalEntryDetailHeaders         : [
                { text: i18n.t('date'), value: 'journal_date' },
                { text: i18n.t('type'), value: 'journal_type' },
                { text: i18n.t('number'), value: 'journal_number' },
                { text: i18n.t('description'), value: 'description' },
                { text: i18n.t('debit'), value: 'dr' },
                { text: i18n.t('credit'), value: 'cr' },
            ],
            reconcileHeaders         : [
                { text: i18n.t('no.') },
                { text: i18n.t('date'), value: 'date' },
                { text: i18n.t('number'), value: 'number' },
                { text: i18n.t('variance'), value: 'variance_amount' },
                { text: i18n.t('action') },
            ],
			// COA sidebar
			searchText 		: '',
			bankAccounts 	: [],
			bankAccountsBk  : [],
            accountTypes 	: [],
			// Account information
            bankAccount 	: [],
            bankAccountDetails : [],
			files			: [],
			attachments 	: [],
			// LoadingMe
			showLoading	: true,
			isLoaded	   	: false,
			// Kendo dataSource
			schemaDefinition	: {
				model: { id: "uuid" }
			},
			// Group order by account_type_id asc
			groupDefinition: { 
				field: "account.account_type.name",
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
					ba = this.bankAccount,
					sdate = this.start_date,
					edate = this.end_date
				
				if(ba.uuid){
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
					journalHandler.getEntryDetailByAccount(ba.account.uuid, {
						params: {
							start_date 	: sdate,
							end_date 	: edate,
						}
					})
					.then(res => {
						if(res){
							this.bankAccountDetails = res
							this.journalEntriesDetails = res.entries_detail
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
						this.bankAccounts = this.bankAccountsBk
					}else{
						this.bankAccounts = this.bankAccountsBk.filter(
							m => m.account.account_type.number === accountTypeNumber
						)
					}
				})
			},
			// On Search Changes
			async onSearchChanges(searchText) {
				new Promise(resolve => {
					resolve('resolved')
					
					if(searchText !== ''){
						this.bankAccounts = this.bankAccountsBk.filter(
							m => (m.account.number.toLowerCase().indexOf(searchText) > -1 || m.account.name.toLowerCase().indexOf(searchText) > -1)
						);
					}else{
						this.bankAccounts = this.bankAccountsBk
					}
				})
			},
			// On Change item selection
			onBankAccountGridChanges () {
				let grid = kendo.jQuery("#gridBankAccount").data("kendoGrid")
				let selectedItem = grid.dataItem(grid.select())
				
				if(this.bankAccount.uuid !== selectedItem.uuid){
					this.bankAccount = selectedItem
					this.searchTransaction()
				}
			},
			// Go To Edit Page
			goEdit () {
                let ba = this.bankAccount
				if(ba.uuid){
					this.$router.push({ name: 'Bank Account', params: { id: ba.uuid }})
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
                this.accountTypes = res.filter(item => ~accountTypeCode.BANKING_ACCOUNTS.indexOf(item.number)) // Filter Banking Account
            })

            // Call Bank Account List
            bankAccountHandler.getAll()
            .then(res => {
                if(res){
                    this.bankAccounts = res.data
					this.bankAccountsBk = res.data
                    this.showLoading = false
                }
            })

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
        background-color:#009efb;
        min-height: 60px;
    }
    .v-card.bg_black{
        background-color:#333;
        color: #fff;
        min-height: 52px;
    }
    .v-card.bg_blue p.title{
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
    .btn_edit{
        background-color: #009efb !important ;
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