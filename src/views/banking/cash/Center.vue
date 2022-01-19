<template>
	<v-row class="">
		<v-col class="py-0 pr-2" sm="4" cols="12">
			<v-card
				outlined
				dense
				color="grayBg"
				class="pa-3 no_border mb-md-4 mb-xs-0 hide_form_alert"
				min-height="55px"
			>
				<div class="d-flex">
					<v-text-field
						class="flex-1"
						v-model="searchText"
						:placeholder="$t('account_number')"
						@change="search"
						outlined
					/>
					<v-btn icon class="px-1" @click="search">
						<v-icon>search</v-icon>
					</v-btn>

					<v-btn icon @click="loadData">
						<v-icon>refresh</v-icon>
					</v-btn>
				</div>
				<app-cash-account-type-dropdownlist
					:initAccountType="accountType"
					@emitAccountType="accountType = $event"
					@onChanged="onAccountTypeChanges"
				/>
			</v-card>

			<v-card
				outlined
				dense
				color="grayBg"
				class="pa-3 no_border hidden-sm-and-down"
			>
				<!-- loading -->
				<div v-if="!isLoaded">
					<LoadingMe
						:isLoading="showLoading"
						:fullPage="false"
						type="loading"
						:myLoading="true"
					/>
				</div>
				<kendo-datasource
					ref="accountDS"
					:data="accounts"
					:schema="schemaDefinition"
					:sort="sortDefinition"
					:group="groupDefinition"
					:filter="filterDefinition"
				>
				</kendo-datasource>

				<kendo-grid
					id="cashGrid"
					ref="cashGrid"
					class="grid-center center_heigth"
					:change="onCOAGridChange"
					:data-source-ref="'accountDS'"
					:selectable="true"
					:persistSelection="true"
					:noRecords="true"
					:scrollable="true"
					:height="535"
					:pageable-numeric="false"
					:pageable-previous-next="false"
					:pageable-messages-display="'Showing {2} data items'"
				>
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
		<v-col class="py-0 pl-2 paddingLeft" sm="8" cols="12">
			<div v-if="isLoaded">
				<LoadingMe
					:isLoading="showLoading"
					:fullPage="false"
					:myLoading="true"
					type="loading"
				/>
			</div>

			<v-row>
				<v-col sm="12" cols="12" class="tab_txn_att pt-0">
					<v-tabs>
						<v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-information-variant</v-icon>
							</span>
							<span class="hidden-sm-and-down text-uppercase">
								{{ $t("info") }}
							</span>
						</v-tab>
						<v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
							<span class="hidden-sm-and-down text-uppercase">
								{{ $t("transactions") }}
							</span>
						</v-tab>
						<v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
							<span class="hidden-sm-and-down text-uppercase">
								{{ $t("reconciliations") }}
							</span>
						</v-tab>
						<v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
							<span class="hidden-sm-and-down text-uppercase">
								{{ $t("attachments") }}
							</span>
						</v-tab>
						<!-- infor -->
						<v-tab-item>
							<v-row class="grayBg">
								<v-col sm="12" cols="12" class="px-6">
									<v-card outlined color="white" class="px-3 pb-3">
										<Info :initAccount="account" />
									</v-card>
								</v-col>
							</v-row>
						</v-tab-item>

						<!-- Transactions -->
						<v-tab-item>
							<v-row class="grayBg">
								<v-col sm="12" cols="12" class="px-6">
									<v-card outlined color="white" class="px-3 pb-3">
										<Transaction :initAccount="account" />
									</v-card>
								</v-col>
							</v-row>
						</v-tab-item>
						<!-- Reconciliations -->
						<v-tab-item>
							<v-row class="grayBg">
								<v-col sm="12" cols="12" class="px-6">
									<v-card outlined color="white" class="pa-3">
										<Reconcilations :initAccount="account" />
									</v-card>
								</v-col>
							</v-row>
						</v-tab-item>
						<!-- Attachment -->
						<v-tab-item>
							<v-row class="grayBg" >
								<v-col sm="12" cols="12" class="px-6">
									<v-card outlined color="white" class="pa-3">
										<Attachment />
									</v-card>
								</v-col>
							</v-row>
						</v-tab-item>
					</v-tabs>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
// import kendo from '@progress/kendo-ui'
// import { i18n } from "@/i18n";
import Helper from "@/helper.js";
import AccountModel from "@/scripts/model/Account.js";
import AccountGroupModel from "@/scripts/model/Account.js";
import store from "@/store";

// const { AccountTypeCode } = require("@/scripts/default_setup/Collections");

export default {
	name: "CashCenter",
	components: {
		LoadingMe: () => import("@/components/Loading"),
		Transaction: () => import("@/components/Transaction"),
		Attachment: () => import("@/components/Attachment"),
		Info: () => import("./Info"),
		Reconcilations: () => import("./Reconcilations"),
		"app-cash-account-type-dropdownlist": () => import('@/components/dropdownlist/CashAccountType'),
	},
	data: () => ({
		// Obj
		account: new AccountModel(),
		Helper: Helper,
		searchText: "",
		accounts: [],
		accountType: null,
		// LoadingMe
		showLoading: true,
		isLoaded: false,
		// Kendo dataSource
		schemaDefinition: {
			model: { id: "uuid" },
		},
		filterDefinition : {
			logic: "or",
			filters: [
				{ field: "account_type.number", operator: "eq", value: 1 },
				{ field: "account_type.number", operator: "eq", value: 2 },
				{ field: "account_type.number", operator: "eq", value: 3 },
				{ field: "account_type.number", operator: "eq", value: 4 },
				{ field: "account_type.number", operator: "eq", value: 5 }
			]
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
			},
		},
	}),
	methods: {
		// Load data
		async loadData() {
			this.showLoading = true;

			/* Reset */
			this.accountType = null;
			store.state.accounting.accountLoaded = false;
			
			this.accounts = await this.$store.dispatch('accounting/getAccounts');
			
			/* Call account group */
			await this.$store.dispatch('accounting/getGroups');

			this.showLoading = false;
		},
		// On Account Type Changes
		async onAccountTypeChanges() {
			new Promise((resolve) => {
				resolve("resolved");

				if (this.accountType !== null) {
					this.accounts = store.state.accounting.accounts.filter(
						(i) => i.account_type.number === this.accountType.number
					);
				} else {
					this.accounts = store.state.accounting.accounts;
				}
			});
		},
		// On Search Changes
		async search() {
			new Promise((resolve) => {
				resolve("resolved");

				if (this.searchText !== "") {
					this.accounts = this.accounts.filter(
						(m) =>
							m.number.toLowerCase().indexOf(this.searchText) > -1 ||
							m.name.toLowerCase().indexOf(this.searchText) > -1
					);
				}
			});
		},
		// On Change item selection
		onCOAGridChange() {
			let grid = this.$refs.cashGrid.kendoWidget(),
				selectedItem = grid.dataItem(grid.select());

			if (this.account.uuid !== selectedItem.uuid) {
				this.account = this.getAccountById(selectedItem.uuid);
			}
		},
		getAccountById(id){
			let account = this.accounts.find(value=>value.uuid === id);
			account.account_group = new AccountGroupModel(store.state.accounting.groups.find(i => i.code === account.group_code));

			return new AccountModel(account);
		},
	},
	created() {
		// Load data
		this.loadData();
	},
};
</script>

<style scoped>
.grid-center.center_heigth {
	height: 470px !important;
}
.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
	background-color: transparent !important;
}

.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr.secondary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
	background-color: #4d4848 !important;
}

.theme--light.v-data-table {
	background-color: transparent !important;
	border-top: thin solid #ddd;
	border-bottom: thin solid #ddd;
	border-radius: 0 !important;
}

.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:not(:last-child)
	> td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:not(:last-child)
	> th:not(.v-data-table__mobile-row) {
	border-bottom: thin solid #ddd;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
	height: 32px !important;
}
.dropdown_view.theme--light.v-btn.v-btn--icon {
	color: rgba(0, 0, 0, 0.54);
	padding: 0px 40px 0px 50px;
}

.v-menu__content {
	top: 595px !important;
	left: 1243px !important;
}

.v-menu__content .v-list {
	width: 120px;
}

.v-menu__content .v-list .v-list-item {
	min-height: 30px !important;
}

.v-menu__content .v-list .v-list-item .v-list-item__title {
	font-size: 12px;
}

.v-card.bg_blue {
	background-color: #92d050;
	color: #fff;
	min-height: 72px;
}

.v-card.bg_black {
	background-color: #333;
	color: #fff;
	min-height: 72px;
}

.v-card.bg_blue p.title {
	color: #fff;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.btn_edit {
	background-color: #00b050 !important;
}

.v-card.bg_blue p {
	color: #fff;
}

.v-card.third {
	background-color: #2ca01c;
	color: #fff;
	display: grid;
	min-height: 52px;
}

p.title {
	margin-bottom: 0;
	font-weight: 700;
	color: #333;
	text-align: left;
}

.v-tab--active {
	background-color: #f8f8f9;
}

.tab_txn_att .v-tab--active {
	font-weight: 700;
}

.bg_white {
	background-color: #fff;
}

.no_border .v-data-table {
	height: 470px;
	overflow-y: scroll !important;
}

.no_border.hidden-sm-and-down .v-data-table td {
	height: 40px;
}

.custom_vcard.v-card {
	overflow-wrap: initial;
}

.k-grid td.k-state-selected,
.k-grid tr.k-state-selected > td {
	background-color: rgba(67, 168, 52, 0.25);
}

.attachment_file {
	background-color: #efeded;
	border-radius: 0 !important;
}

.view_action {
	text-transform: uppercase;
}

.disabled-header.k-grid tr * {
	cursor: pointer;
}

@media (max-width: 576px) {
	.v-tab {
		min-width: auto !important;
	}
	.paddingLeft {
		margin-left: 15px;
	}
}
</style>
