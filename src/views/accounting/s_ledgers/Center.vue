<template>
	<v-row class="">
		<v-col class="py-0 pr-4" sm="4" cols="12">
			<v-card
				outlined
				dense
				color="grayBg"
				class="pa-3 no_border mb-md-4 mb-xs-0"
				height="123px"
			>
				<v-row>
					<v-col cols="12" sm="12" class="py-0 d-flex">
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

						<v-btn icon @click="onRefreshClick">
							<v-icon>refresh</v-icon>
						</v-btn>
					</v-col>
				</v-row>

				<app-account-type-dropdownlist
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
				<LoadingMe
					:isLoading="showLoading"
					:fullPage="false"
					type="loading"
					:myLoading="true"
				/>

				<kendo-datasource
					ref="accountDS"
					:data="accounts"
					:schema="schemaDefinition"
					:group="groupDefinition"
				>
				</kendo-datasource>

				<kendo-grid
					id="gridCOA"
					ref="gridCOA"
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
		<v-col
			class="py-0 paddingLeft"
			sm="8"
			cols="12"
			style="margin-top: -12px;position:relative;"
		>
			<v-row>
				<v-col sm="12" cols="12" class="tab_txn_att px-0">
					<v-tabs>
						<v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
							<span class="hidden-sm-and-down">
								{{ $t("summary") }}
							</span>
						</v-tab>
						<!-- <v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
							<span class="hidden-sm-and-down">
								{{$t('balances')}}
							</span>
						</v-tab> -->
						<v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
							<span class="hidden-sm-and-down">
								{{ $t("transactions") }}
							</span>
						</v-tab>
						<v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
							<span class="hidden-sm-and-down">
								{{ $t("attachments") }}
							</span>
						</v-tab>
						<!-- <v-btn
							to="s_account"
							color="primary"
							class="text-capitalize white--text absRight"
							>{{ $t("new_s_account") }}
						</v-btn> -->
						<v-tab-item>
							<v-card
								flat
								class="pa-3 custom_vcard"
								color="grayBg"
							>
								<v-card-text class="pt-0 bg_white">
									<Summary :initAccount="account" />
								</v-card-text>
							</v-card>
						</v-tab-item>
						<!-- <v-tab-item>
							<v-card flat class="pa-5 custom_vcard">
								<v-card-text class="pt-0 bg_white">
									<Balance/>
								</v-card-text>
							</v-card>
						</v-tab-item> -->
						<v-tab-item>
							<v-card
								flat
								class="pa-3 custom_vcard"
								color="grayBg"
							>
								<v-card-text class="pt-0 bg_white">
									<Transaction :initAccount="account" />
								</v-card-text>
							</v-card>
						</v-tab-item>
						<v-tab-item>
							<v-card flat class="pa-3" color="grayBg" >
								<v-card-text class="bg_white">
									<Attachment />
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
// import kendo from '@progress/kendo-ui';
// import {i18n} from '@/i18n';
import Helper from "@/helper.js";
import AccountModel from "@/scripts/model/Account.js";
import store from "@/store";
import { mapState } from 'vuex';

export default {
	name: "AccountCenter",
	components: {
		LoadingMe: () => import("@/components/Loading"),
		// Balance: () => import('./Balance'),
		Summary: () => import("./Summary"),
		Transaction: () => import("./Transaction"),
		Attachment: () => import("@/components/Attachment"),
		"app-account-type-dropdownlist": () =>
			import("@/components/dropdownlist/AccountTypeSecondary"),
	},
	data: () => ({
		Helper: Helper,
		// Search Sidebar
		searchText: "",
		accountType: null,
		// Account information
		account: new AccountModel(),
		// LoadingMe
		showLoading: false,
		// Kendo dataSource
		schemaDefinition: {
			model: { id: "uuid" },
		},
		// Group order by account_type_id asc
		groupDefinition: { 
			field: "account_type.name",
			compare: function(a, b) {
				if (a.items[0].type_code === b.items[0].type_code) {
					return 0;
				} else if (a.items[0].type_code > b.items[0].type_code) {
					return 1;
				} else {
					return -1;
				}
			}
		},
	}),
	methods: {
		// Load data
		async initialize() {
			this.showLoading = true;

			/* Reset */
			this.accountType = null;
			store.state.accounting.accountLoaded = false;

			/* Call account */
			await this.$store.dispatch("accounting/getSecondaryAccounts");

			this.showLoading = false;
		},
		onRefreshClick(){
			let ds = this.$refs.accountDS.kendoWidget();
			ds.filter([]);

			this.initialize();
		},
		// On Account Type Changes
		async onAccountTypeChanges() {
			new Promise((resolve) => {
				resolve("resolved");

				let ds = this.$refs.accountDS.kendoWidget();
				this.searchText = "";

				if (this.accountType !== null) {
					ds.filter( { field: "secondary_type_uuid", operator: "eq", value: this.accountType.uuid });
				} else {
					ds.filter([]);
				}
			});
		},
		// On Search Changes
		async search() {
			new Promise((resolve) => {
				resolve("resolved");

				let ds = this.$refs.accountDS.kendoWidget();
				ds.filter([]);
				this.accountType = null;

				if (this.searchText !== "") {
					ds.filter({
						logic: "or",
						filters: [
							{ field: "number", operator: "eq", value: this.searchText },
							{ field: "name", operator: "eq", value: this.searchText }
						]
					});
				}
			});
		},
		// On Change item selection
		onCOAGridChange() {
			let grid = this.$refs.gridCOA.kendoWidget(),
				selectedItem = grid.dataItem(grid.select());

			if (this.account.uuid !== selectedItem.uuid) {
				this.account = this.accounts.find((i)=>i.uuid === selectedItem.uuid);
			}
		},
	},
	computed: mapState({
        accounts: state => state.accounting.secondaryAccounts
    }),
	created() {
		this.initialize();
	},
};
</script>

<style scoped>
.grid-center.center_heigth {
	height: 476px !important;
}
.v-card.bg_blue {
	background-color: #f44336;
	min-height: 152px;
}
.v-card.bg_black {
	background-color: #333;
	color: #fff;
	min-height: 52px;
}
.v-card.bg_blue p.title {
	color: #333;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
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
	background-color: rgb(237, 241, 245);
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
.attachment_table.v-data-table table {
	border: thin solid rgba(0, 0, 0, 0.12);
}

.custom_grid.k-grid tr* {
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
