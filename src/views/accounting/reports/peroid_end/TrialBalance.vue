<template>
	<v-row>
		<v-col sm="12" cols="12" :class=" appType != 'npo' &&  appType != 'Public Sectors' ? 'grayBg px-6' : '' " >
			<v-card color="white" :class=" appType != 'npo' &&  appType != 'Public Sectors' ? 'pa-3 no_border' : '' "  elevation="0">
				<v-row>
					<v-col class="py-0" sm="5" cols="12">
						<label class="label  text-uppercase float-left mt-3 pr-3">{{
							$t("as_of")
						}}</label>
						<app-datepicker
							:initialDate="asOfDate"
							@emitDate="asOfDate = $event"
						/>
					</v-col>
					<v-col sm="6" cols="12" class="pt-1 d-flex pb-0">
						<v-btn class="white--text mr-2" color="primary" @click="search">
								<i class="b-search" style="font-size: 18px; color:#fff !important;"/>
						</v-btn>
						<v-checkbox
							v-model="isCashBasic"
							:label="$t('cash_basic')"
							class="mt-0"
							color="primary"
							hide-details
						></v-checkbox>
					</v-col>
					<v-col sm="1" cols="1" class="pt-1">
						<downloadexcel
							icon
							color="black"
							class="bg-none float-right "
							:data="trialBalanceList"
							:fields="exfield"
							type="xls"
							worksheet="Trial Balance"
							name="TrialBalance.xls"
						>
							<v-icon
								class="font_34"
								style="color: black;margin-top: 3px;margin-left: 10px;"
								>fa fa-file-excel
							</v-icon>
						</downloadexcel>
					</v-col>
				</v-row>
				<v-row class="mt-0">
					<v-col sm="6" cols="12" class="pt-0">
						<v-card
							outlined
							dense
							class="pa-3  rounded-4 no_border white--text "
							color="third"
							@click="filterAllAccounts"
							height="60px"
						>
							<h3 class="text-left flex-1 text-uppercase font_12 py-0">
								{{ $t("no_of_account") }}
							</h3>
							<h3 class="text-right  flex-1 font_20">
								{{
									trialBalance.numberAccount
										? Number(trialBalance.numberAccount).toLocaleString()
										: 0
								}}
							</h3>
						</v-card>
					</v-col>
					<v-col sm="6" cols="12" class="pt-0">
						<v-card
							outlined
							dense
							class="pa-3  rounded-4 no_border white--text "
							color="third"
							@click="filterAccountNegativeBalance"
							height="60px"
						>
							<h3 class="text-left flex-1 text-uppercase font_12 py-0">
								{{ $t("no_of_account_with_negative") }}
							</h3>
							<h3 class="text-right  flex-1 font_20">
								{{
									trialBalance.numberAccNegBalance
										? Number(trialBalance.numberAccNegBalance).toLocaleString('en-US')
										: 0
								}}
							</h3>
						</v-card>
					</v-col>

					<v-col sm="6" cols="12">
						<v-card
							outlined
							dense
							class="pa-3  rounded-4 no_border black--text "
							color="grayBg"
							height="60px"
						>
							<h3 class="text-left flex-1 text-uppercase font_12 py-0">
								{{ $t("total_debit") }}
							</h3>
							<h3 class="text-right primary--text flex-1 font_20">
								{{
									trialBalance.totalDr
										? Number(trialBalance.totalDr).toLocaleString('en-US')
										: 0
								}}
							</h3>
						</v-card>
					</v-col>
					<v-col sm="6" cols="12">
						<v-card
							outlined
							dense
							@click="filterAccountNegativeBalance"
							class="pa-3  rounded-4 no_border black--text "
							color="grayBg"
							height="60px"
						>
							<h3 class="text-left flex-1  font_12 text-uppercase">
								{{ $t("total_credit") }}
							</h3>
							<h3 class="text-right primary--text flex-1 font_20">
								{{
									trialBalance.totalCr
										? Number(trialBalance.totalCr).toLocaleString()
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
								:data="trialBalanceList"
								:sort="sortDefinition"
								:schema="schemaDefinition"
							/>

							<kendo-grid
								id="gridTB"
								ref="gridTB"
								class="custom_grid"
								:data-source-ref="'dataSource'"
								:change="onGridChanges"
								:selectable="true"
								:persistSelection="true"
								:groupable="true"
								:sortable="true"
								:column-menu="true"
								:reorderable="true"
								:resizable="true"
								:noRecords="true"
								:toolbar="['excel']"
								:excel-file-name="'trialBalance.xlsx'"
								:excel-filterable="true"
							>
								<kendo-grid-column
									:field="'account_number'"
									:title="$t('account_number')"
									:width="140"
									:group-footer-template="'Total:'"
								/>
								<kendo-grid-column
									:field="'account_name'"
									:title="$t('account_name')"
									:width="140"
								/>
								<kendo-grid-column
									:field="'account_type'"
									:title="$t('account_type')"
									:width="140"
								/>
								<kendo-grid-column
									:field="'account_group'"
									:title="$t('account_group')"
									:width="140"
								/>
								<kendo-grid-column
									:field="'dr'"
									:title="$t('debit')"
									:format="'{0:#,##0.##;(#,##0.##)}'"
									:width="110"
									:aggregates="['sum']"
									:footerAttributes="{ style: 'text-align: right;font-weight: bold;'}"
									:group-footer-template="
										'#=kendo.toString(sum, `n`)#'
									"
									:headerAttributes="{
										style: 'text-align: right;',
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
									:aggregates="['sum']"
									:footerAttributes="{ style: 'text-align: right;font-weight: bold;'}"
									:group-footer-template="
										'#=kendo.toString(sum, `n`)#'
									"
									:headerAttributes="{
										style: 'text-align: right;',
									}"
									:attributes="{
										style: 'text-align: right;',
									}"
								/>
							</kendo-grid>
						</v-col>
					</v-row>
				</div>
				<LoadingMe
					:isLoading="showLoading"
					:fullPage="false"
					:myLoading="true"
				/>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import downloadexcel from "vue-json-excel";

const { trialBalanceHandler } = require("@/scripts/AppHandlers");
import { dataStore } from "@/observable/store";

export default {
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-datepicker": () =>
			import("@/components/custom_templates/DatePickerComponent"),
		downloadexcel: downloadexcel,
	},
	data: () => ({
		// Obj
		asOfDate: new Date().toISOString().substr(0, 10),
		trialBalance: [],
		trialBalances: [],
		isCashBasic : false,
		trialBalanceList: [],
		// LoadingMe
		showLoading: false,
		/* KENDO */
		schemaDefinition: {
			model: { id: "account_id" },
		},
		sortDefinition: { field: "account_number", dir: "asc" },

		exfield: {
			"Account Number": "account_number",
			"Account Name": "account_name",
			"Account Type": "account_type",
			"Account Group": "account_group",
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
		/* KENDO */
		/* On grid changes => link to GL */
		onGridChanges() {
			let grid = this.$refs.gridTB.kendoWidget();
			let selectedItem = grid.dataItem(grid.select());

			let fiscalDate = Helper.getFiscalDateByDate(this.asOfDate);

			this.$router.push({
				name: "General Ledger",
				params: { 
					initParams: {
						account_id: selectedItem.account_id,
						start_date: new Date(fiscalDate.start_date),
						end_date: new Date(this.asOfDate),
					}
				},
			});

			/* Clear Selection */
			grid.clearSelection();
		},
		// Search
		search() {
			// Empty dataSource
			let ds = this.$refs.dataSource.kendoWidget();
			ds.data([]);

			if (this.asOfDate) {
				let asOfDate = new Date(this.asOfDate);
			/* Cash Basic */
			let cashBasicMethod = "accrual_basic_method";
			if(this.isCashBasic){
				cashBasicMethod = "cash_basic_method";
			}

				// Query
				this.showLoading = true;
				trialBalanceHandler
					.getTrialBalance({
						params: {
							as_of_date:
								kendo.toString(asOfDate, "yyyy-MM-dd") + "T23:59:59.999Z",
								accounting_method: cashBasicMethod,
						},
					})
					.then((res) => {
						if (res.data) {
							this.trialBalance = res.data;
							this.bindData();
						}
					})
					.finally(() => {
						this.showLoading = false;
					});
			}
		},
		//Bind Data
		bindData() {
			let entries = [];

			this.trialBalance.tbdetails.forEach((value) => {
				// Set dr/cr from balance
				let dr = "",
					cr = "";
				if (value.account.account_type.nature.toLowerCase() === "cr") {
					cr = value.balance * -1;
				} else {
					dr = value.balance;
				}

				entries.push({
					account_id: value.account.uuid,
					account_number: value.account.number,
					account_name: value.account.name,
					account_type: value.account.account_type.name,
					account_group: value.account.account_group
						? value.account.account_group.name
						: "",
					dr: dr,
					cr: cr,
				});
			});

			// Bind entries
			this.trialBalances = entries;
			this.trialBalanceList = entries;
		},
		// Filter account negative balance
		async filterAccountNegativeBalance() {
			new Promise((resolve) => {
				resolve("resolved");

				if (this.trialBalance.numberAccNegBalance > 0) {
					this.trialBalanceList = this.trialBalances.filter(
						(value) => value.dr < 0 || value.cr < 0
					);
				}
			});
		},
		// Filter all accounts
		async filterAllAccounts() {
			new Promise((resolve) => {
				resolve("resolved");

				this.trialBalanceList = this.trialBalances;
			});
		},
	},
};
</script>

<style scoped>
.reports_list {
	width: 100%;
	background-color: #fff;
	padding: 20px 20px 5px;
	min-height: calc(100vh - 105px);
}
.report_filter {
	background-color: #f8f8f9;
	padding: 0 20px 5px 20px;
	position: relative;
}
.report_export {
	position: absolute;
	top: 10px;
}
.report_block .v-card.option {
	border: none;
	box-shadow: none;
	color: #fff;
	text-transform: uppercase;
	min-height: 90px;
}
.report_block .v-card.option p.text {
	text-align: left;
	font-size: 16px;
}
.report_block .v-card.option p.number {
	text-align: center;
	font-size: 25px;
	font-weight: 700;
	margin-bottom: 0;
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
	padding: 4px 0 0 10px;
}
.report_block .v-card.bg_gray p span.number {
	width: 70%;
	font-size: 19px;
	font-weight: 700;
	padding: 2px 10px 0 0;
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
