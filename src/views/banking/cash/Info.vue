<template>
	<v-row>
		<v-col sm="12" cols="12" class="pa-3">
			<v-simple-table>
				<template v-slot:default>
					<tbody>
						<tr>
							<td width="230" class="text-uppercase">
								{{ $t("account_name") }}
							</td>
							<td class="text-left text-bold">{{ account.name }}</td>
						</tr>
						<tr>
							<td class="text-uppercase">{{ $t("balance_as_of_today") }}</td>
							<td class="text-left text-bold">
								<span class="float-right">
									{{ Number(accountInfo.ending_balance).toLocaleString() }}
								</span>
							</td>
						</tr>
						<tr>
							<td class="text-uppercase">{{ $t("forwarded") }}</td>
							<td class="text-left text-bold">
								<span class="float-right">
									{{
										Number(accountInfo.future_date_transaction).toLocaleString()
									}}
								</span>
							</td>
						</tr>
						<tr>
							<td class="text-uppercase">{{ $t("backdated") }}</td>
							<td class="text-left text-bold">
								<span class="float-right">
									{{
										Number(accountInfo.back_date_transaction).toLocaleString()
									}}
								</span>
							</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</v-col>

		<v-col sm="12" cols="12" class="py-0">
			<v-row>
				<v-col sm="12" cols="12" class="py-0">
					<router-link to="">
						<v-btn
							color="primary"
							@click="goEdit"
							:disabled="account.uuid === ''"
							class=" white--text float-right text-capitalize"
						>
							{{ $t("edit") }}
						</v-btn>
					</router-link>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>
<script>
import AccountModel from "@/scripts/model/Account.js";
import AccountEntryDetailModel from "@/scripts/model/AccountEntryDetail.js";

const journalHandler = require("@/scripts/journalHandler");

export default {
	name: "AccountInfomation",
	props: {
		initAccount: {
			type: AccountModel,
		},
	},
	data: () => ({
		account: new AccountModel(),
		accountInfo : new AccountEntryDetailModel(),
	}),
	methods: {
		loadData () {
			if(this.initAccount){
				this.account = Object.assign({}, this.initAccount);
			
				journalHandler
					.getEntryDetailByAccount(this.account.uuid, {
						params: {
							start_date: 0,
							end_date: 0,
						},
					})
					.then((res) => {
						if (res) {
							this.accountInfo = new AccountEntryDetailModel(res);
						}
					});
			}
		},
		getAccount() {
			return Object.assign({}, new AccountModel(this.account));
		},
		goEdit() {
			this.$router.push({
				name: "Account",
				params: { initAccount: this.getAccount() },
			});
		},
	},
	watch: {
		initAccount (){
			this.loadData();
		}
	},
	mounted () {
		this.loadData();
	}
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

.v-application .secondary,
.v-application .third {
	border-color: #fff !important;
}
</style>
