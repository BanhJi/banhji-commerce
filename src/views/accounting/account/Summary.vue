<template>
	<v-row class="white">
		<v-col sm="12" cols="12" class="mt-3">
			<v-simple-table>
				<template>
					<tbody>
						<tr>
							<td width="230" class="text-uppercase">
								{{ $t("account_name") }}
							</td>
							<td class="text-left text-bold">{{ account.name }}</td>
						</tr>
						<tr>
							<td class="text-uppercase">{{ $t("account_code") }}</td>
							<td class="text-left text-bold">{{ account.number }}</td>
						</tr>
						<tr>
							<td class="text-uppercase">{{ $t("account_type") }}</td>
							<td class="text-left text-bold">
								{{ account.account_type.name }}
							</td>
						</tr>
						<tr>
							<td class="text-uppercase">{{ $t("account_group") }}</td>
							<td class="text-left text-bold">
								<span v-if="account.account_group">
									{{ account.account_group.name }}
								</span>
							</td>
						</tr>
						<tr>
							<td class="text-uppercase">{{ $t("sub_account") }}</td>
							<td class="text-left text-bold">
								<span v-if="account.parent_account">
									{{ account.parent_account.number }}
								</span>-
								<span v-if="account.parent_account">
									{{ account.parent_account.name }}
								</span>
							</td>
						</tr>
						<tr>
							<td class="text-uppercase">{{ $t("description") }}</td>
							<td class="text-left">{{ account.description }}</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</v-col>
		<v-col sm="12" cols="12" class="pb-0">
			<p>{{ $t("follow_info_current_month") }}</p>
			<v-simple-table>
				<template v-slot:default>
					<tbody>
						<tr class=" text-bold">
							<td class="text-uppercase third white--text">
								{{ $t("transactions") }}
							</td>
							<td class="primary--text third white--text text-right">
								{{ accountEntryDetail.entries_detail.length }}
							</td>
						</tr>
						<tr>
							<td class="text-uppercase text-bold">{{ $t("backdated") }}</td>
							<td class="text-right">
								{{ accountEntryDetail.back_date_transaction }}
							</td>
						</tr>
						<tr>
							<td class="text-uppercase text-bold">{{ $t("forwarded") }}</td>
							<td class="primary--text text-right text-bold">
								{{ accountEntryDetail.future_date_transaction }}
							</td>
						</tr>
						<tr>
							<td class="text-uppercase text-bold">
								{{ $t("edited_in_previous_month") }}
							</td>
							<td class="primary--text text-right text-uppercase text-bold">
								
							</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</v-col>
		<v-col sm="12" cols="12" class="pb-0">
			<v-row>
				<v-col sm="12" cols="12" class="py-0">
					<v-btn
						@click="onEditClicked"
						width="100"
						color="third"
						class=" white--text float-right text-capitalize"
					>
						{{ $t("edit") }}
					</v-btn>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
import { i18n } from "@/i18n";
import AccountModel from "@/scripts/model/Account.js";
import AccountEntryDetailModel from "@/scripts/model/AccountEntryDetail";
import store from "@/store";

const journalHandler = require("@/scripts/journalHandler");

export default {
	name: "AccountSummary",
	props: {
		initAccount: {
			type: AccountModel,
		},
	},
	data() {
		return {
			account: new AccountModel(),
			accountEntryDetail: new AccountEntryDetailModel(),
		};
	},
	methods: {
		initialData(){
			if(this.initAccount.uuid !== ''){
				this.account = this.initAccount;
				this.loadAccountEntryDetail();
			}
		},
		onEditClicked() {
			this.$router.push({
				name: "Account",
				params: { initAccount: this.account },
			});
		},
		// Load Account Entry Detail
		loadAccountEntryDetail() {
			if(this.account.uuid !== ''){
				journalHandler
					.getEntryDetailByAccount(this.account.uuid, {
						params: {
							start_date: 0,
							end_date: 0,
						},
					})
					.then((res) => {
						if (res) {
							this.accountEntryDetail = new AccountEntryDetailModel(res);
						}else{
							this.$snotify.error(i18n.t("error_something_wrong"));
						}
					});
			}
		},
		applyNewAccount(){
			this.account = store.state.accounting.accounts.find(i=>i.uuid === this.account.uuid);
		},
	},
	watch: {
		initAccount: "initialData",
		$route(to, from) {
			if(from.name === "Account"){
				// this.applyNewAccount();
			}
		},
	},
	mounted() {
		this.initialData();
	},
};
</script>

<style scoped>
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
	> tr.primary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
	background-color: #f44336 !important;
}
.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
	background-color: #212a35 !important;
}
.theme--light.v-data-table {
	background-color: transparent !important;
	border-top: thin solid rgba(0, 0, 0, 0.12) !important;
	border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
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
	border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
	height: 32px !important;
}
</style>
