<template>
	<v-row>
		<v-col class="pb-0 pt-4" sm="12" cols="12">
			<v-row>
				<v-col class="py-0 pr-md-2" sm="4" cols="12">
					<div class="d-flex">
						<v-card
							outlined
							dense
							color="primary"
							class="pa-2 mb-4  flex-1 no_border niradei_bold"
							min-height="62px"
						>
							<!-- <LoadingMe
								:isLoading="insightLoading"
								:fullPage="false"
								:myLoading="true"
								:type="'loading'"
							>
							</LoadingMe> -->
							<v-row>
								<h6 class="col-sm-12 col-md-5 font_34 white--text">
									{{ Number(reconcileRuleReports.open).toLocaleString() }}
								</h6>
								<h4
									class="text-right flex_right white--text py-0 col-sm-12 col-md-7 font_16 text-uppercase"
								>
									<span class="float-right">{{ $t("to_be_reconciled") }}</span>
								</h4>
							</v-row>
						</v-card>
						<v-btn style="height:62px !important;" color="primary" class="ml-1">
							<v-icon @click="loadData" size="30" color="white"
								>mdi-reload</v-icon
							>
						</v-btn>
					</div>
					<v-card
						outlined
						dense
						class="pa-4 no_border flex_column"
						min-height="268"
						color="grayBg"
					>
						<div>
							<h3
								class="font_20"
								:class="{ line_34: this.$i18n.locale == 'kh' }"
							>
								{{ $t("transactions") }}
							</h3>
							<p class="mb-0">
								{{ $t("from_the_beginning_year") }}
							</p>
							<h2
								class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
								v-if="insight"
							>
								{{ Number(insight.number_of_transactions).toLocaleString() }}
							</h2>
						</div>
						<LoadingMe
							:isLoading="insightLoading"
							:fullPage="false"
							:myLoading="true"
							:type="'loading'"
						>
						</LoadingMe>
						<template>
							<v-simple-table class="mb-3">
								<template v-slot:default>
									<tbody>
										<tr>
											<td class="text-left pl-0">
												<span class="niradei_medium font_14 grey--text">
													{{ $t("backdated") }}
												</span>
											</td>
											<td class="text-right pr-0">
												<span
													class="niradei_heavy font_18 dark_grey"
													v-if="insight"
													>{{
														Number(
															insight.number_of_backdate_transactions
														).toLocaleString()
													}}
												</span>
											</td>
										</tr>
										<tr>
											<td class="text-left pl-0">
												<span class="niradei_medium font_14 grey--text">
													{{ $t("in_the_future") }}
												</span>
											</td>
											<td class="text-right pr-0">
												<span
													class="niradei_heavy font_18 dark_grey"
													v-if="insight"
													>{{
														Number(
															insight.number_of_futuredate_transactions
														).toLocaleString()
													}}
												</span>
											</td>
										</tr>
										<tr>
											<td class="text-left pl-0">
												<span class="niradei_medium font_14 grey--text">
													{{ $t("manual_journal") }}
												</span>
											</td>
											<td class="text-right pr-0">
												<span
													class="niradei_heavy font_18 dark_grey"
													v-if="insight"
												>
													<!-- {{ Number(insight.manual_journal).toLocaleString() }} -->
												</span>
											</td>
										</tr>
									</tbody>
								</template>
							</v-simple-table>
						</template>
						<div class="d-flex justify-end">
							<div>
								<router-link
									to="journal_reports"
									class="mb-0 niradei_bold  font_16 primary--text"
									>{{ $t("view_report") }}</router-link
								>
							</div>
						</div>
					</v-card>
					<v-card
						outlined
						dense
						class="pa-4 mt-4 no_border flex_column"
						min-height="268"
						color="grayBg"
					>
						<div>
							<h3
								class="font_20"
								:class="{ line_34: this.$i18n.locale == 'kh' }"
							>
								{{ $t("accounts_info") }}
							</h3>
							<p class="mb-0">
								{{ $t("as_of_today") }}
							</p>
						</div>
						<LoadingMe
							:isLoading="insightLoading"
							:fullPage="false"
							:myLoading="true"
							:type="'loading'"
						>
						</LoadingMe>
						<template>
							<v-simple-table class="mb-3">
								<template>
									<tbody>
										<tr>
											<td class="text-left pl-0" style="width: 70%;">
												<span class="niradei_medium font_14 grey--text">
													{{ $t("number_of_account") }}
												</span>
											</td>
											<td class="text-right pr-0">
												<span class="niradei_heavy font_18 dark_grey" v-if="insight">
													{{ Number(insight.number_of_accounts).toLocaleString() }}
												</span>
											</td>
										</tr>
										<tr>
											<td class="text-left pl-0" style="width: 70%;">
												<span class="niradei_medium font_14 grey--text">
													{{ $t("inactive_account") }}
												</span>
											</td>
											<td class="text-right pr-0">
												<span class="niradei_heavy font_18 dark_grey" v-if="insight">
													<!-- {{ Number(insight.number_of_inactive_accounts).toLocaleString() }} -->
												</span>
											</td>
										</tr>
										<tr>
											<td class="text-left pl-0" style="width: 70%;">
												<span class="niradei_medium font_14 grey--text">
													{{ $t("negative_balance") }}
												</span>
											</td>
											<td class="text-right pr-0">
												<span class="niradei_heavy font_18 dark_grey" v-if="insight">
													{{ Number(insight.number_of_accounts_with_negative_balance).toLocaleString() }}
												</span>
											</td>
										</tr>
										<tr>
											<td class="text-left pl-0" style="width: 70%;">
												<span class="niradei_medium font_14 grey--text">
													{{ $t("clearing_suspense_accounts") }}
												</span>
											</td>
											<td class="text-right pr-0">
												<span
													class="niradei_heavy font_18 dark_grey"
													v-if="insight"
												>
													{{
														Number(
															insight.clearing_account_balance
														).toLocaleString()
													}}
												</span>
											</td>
										</tr>
									</tbody>
								</template>
							</v-simple-table>
						</template>
						<div>
							<div class="text-right align-self-end">
								<router-link
									to="trial_balance"
									class="mb-2 niradei_bold font_16 primary--text text-right"
									>{{ $t("view_report") }}</router-link
								>
							</div>
						</div>
					</v-card>
				</v-col>
				<v-col class="py-md-0 px-md-2" sm="4" cols="12">
					<v-card
						outlined
						dense
						color="third"
						class="pa-2 mb-4 no_border niradei_bold "
						min-height="62px"
					>
						<v-row>
							<h6 class="white--text col-sm-12 col-md-5 font_34">
								{{ Number(reconcileRuleReports.closed).toLocaleString() }}
							</h6>
							<h4
								class="text-right flex_right white--text col-md-7 col-sm-12 py-0 font_16 text-uppercase"
							>
								<span  class="float-right">{{
									$t("completed_tasks")
								}}</span>
							</h4>
						</v-row>
						<!-- <LoadingMe
										:isLoading="commingTask"
										:fullPage="false"
										:myLoading="true"
										:type="'loading'">
								/> -->
					</v-card>
					<v-card
						outlined
						dense
						class="pa-4 no_border flex_column"
						min-height="268"
						color="grayBg"
					>
						<div>
							<h3
								class="font_20"
								:class="{ line_34: this.$i18n.locale == 'kh' }"
							>
								{{ $t("retained_earning") }}
							</h3>
							<p class="mb-0">
								{{ $t("changes_made_to_these_accounts") }}
							</p>
							<h2
								class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
								v-if="changeInRetainEarning"
							>
								{{
									Number(
										changeInRetainEarning.change_in_amount * -1
									).toLocaleString()
								}}
							</h2>
						</div>
						<LoadingMe
							:isLoading="changeInRetainEarningLoading"
							:fullPage="false"
							:myLoading="true"
							:type="'loading'"
						>
						</LoadingMe>
						<template>
							<v-simple-table class="mb-3">
								<template v-slot:default>
									<tbody>
										<tr>
											<td class="text-left pl-0">
												<span class="niradei_medium font_14 grey--text">
													{{ $t("during_fy") }}
												</span>
											</td>
											<td class="text-right pr-0">
												<span
													class="niradei_heavy font_18 dark_grey"
													v-if="changeInRetainEarning"
												>
													{{
														Number(
															changeInRetainEarning.current_retain_earning
																.numberOfTransaction
														).toLocaleString()
													}}
												</span>
											</td>
										</tr>
										<tr>
											<td class="text-left pl-0">
												<span class="niradei_medium font_14 grey--text">
													{{ $t("before_fy") }}
												</span>
											</td>
											<td class="text-right pr-0">
												<span
													class="niradei_heavy font_18 dark_grey"
													v-if="changeInRetainEarning"
												>
													{{
														Number(
															changeInRetainEarning.previous_retain_earning
																.numberOfTransaction
														).toLocaleString()
													}}
												</span>
											</td>
										</tr>
										<tr>
											<td class="text-left pl-0">
												<span class="niradei_medium font_14 grey--text">
													{{ $t("after_fy") }}
												</span>
											</td>
											<td class="text-right pr-0">
												<span class="niradei_heavy font_18 dark_grey">
													0<!-- {{ Number().toLocaleString() }} -->
												</span>
											</td>
										</tr>
									</tbody>
								</template>
							</v-simple-table>
						</template>
						<div>
							<div class="pl-0 py-0 text-right align-self-end">
								<router-link
									to="general_ledger"
									class="mb-0 niradei_bold font_16 primary--text text-right"
									>{{ $t("view_report") }}</router-link
								>
							</div>
						</div>
					</v-card>
					<v-card
						outlined
						dense
						class="pa-4 mt-4 no_border flex_column"
						min-height="268"
						color="grayBg"
					>
						<div>
							<h3
								class="font_20"
								:class="{ line_34: this.$i18n.locale == 'kh' }"
							>
								{{ $t("performance") }}
							</h3>
							<p class="mb-0">
								{{ $t("from_the_beginning_year") }}
							</p>
						</div>
						<div>
							<Performance />
						</div>
						<div>
							<div class="pl-0 py-0 text-right align-self-end">
								<router-link
									to="statement_of_profit_or_loss"
									class="mb-0 niradei_bold font_16 primary--text text-right"
									>{{ $t("view_report") }}</router-link
								>
							</div>
						</div>
					</v-card>
				</v-col>
				<v-col class="py-0 pl-md-2" sm="4" cols="12">
					<v-card
						outlined
						dense
						color="grayBg"
						class="pa-2 mb-4 no_border niradei_bold"
						min-height="62px"
					>
						<v-row>
							<h6 class="col-sm-6 font_34">{{ closingDate }}</h6>
							<h4 class="text-right flex_right py-0 col-sm-6 font_16 text-uppercase">
								{{ $t("current_closing_date") }}
							</h4>
						</v-row>
						<LoadingMe
							:isLoading="currentClosDateLoadding"
							:fullPage="false"
							:myLoading="true"
							:type="'loading'"
						/>
					</v-card>
					<v-card
						color="grayBg"
						outlined
						dense
						class="pa-4 no_border"
						min-height="268px"
					>
						<h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
							{{ $t("current_assets_analysis") }}
						</h3>
						<p class="mb-0">
							{{ $t("as_of_today") }}
						</p>
						<v-row>
							<v-col sm="6" cols="12" class="pr-0 mt-4 py-0">
								<LoadingMe
									:isLoading="currentLiabilityAnalysisLoading"
									:fullPage="false"
									:myLoading="true"
									:type="'loading'"
								>
								</LoadingMe>
								<template>
									<v-simple-table class="mt-4">
										<template v-slot:default>
											<tbody>
												<tr>
													<td class="px-0">
														<span
															class="float-right niradei_medium font_14 grey--text"
														>
															{{ $t("balance") }} </span
														><br />
														<h3
															class="float-right niradei_heavy font_18 dark_grey"
															v-if="assetLiabilityReport"
														>
															{{
																Number(
																	assetLiabilityReport.total_current_asset
																).toLocaleString()
															}}
														</h3>
													</td>
												</tr>
												<tr>
													<td class="px-0">
														<span
															class="float-right niradei_medium font_14 grey--text"
															v-if="assetLiabilityReport"
														>
															{{ $t("%_of_total_assets") }} </span
														><br />
														<h3
															class="float-right niradei_heavy font_18 dark_grey"
															v-if="assetLiabilityReport"
														>
															{{ currentAssetPercentage }}
														</h3>
													</td>
												</tr>
											</tbody>
										</template>
									</v-simple-table>
								</template>
							</v-col>
							<v-col sm="6" cols="12" class="pl-0 py-0">
								<chart
									ref="currentAssetChart"
									:legend-position="'bottom'"
									:legend-visible="false"
									:tooltip-visible="true"
									:tooltip-template="'#= category #: #: value #'"
									:chart-area-background="''"
									:series-defaults-type="'donut'"
									:series-defaults-labels-background="'transparent'"
									:series="currentAssetSeries"
									:value-axis="valueAxis_round"
									:theme="'sass'"
								/>
							</v-col>
						</v-row>
					</v-card>
					<v-card
						color="grayBg"
						outlined
						dense
						class="pa-4 mt-4 no_border"
						min-height="268px"
					>
						<h3 class="font_20 niradei_bold">
							{{ $t("current_liability_analysis") }}
						</h3>
						<p class="mb-0">
							{{ $t("as_of_today") }}
						</p>
						<v-row>
							<v-col sm="6" cols="12" class="pr-0 py-0">
								<LoadingMe
									:isLoading="currentLiabilityAnalysisLoading"
									:fullPage="false"
									:myLoading="true"
									:type="'loading'"
								>
								</LoadingMe>
								<template>
									<v-simple-table class="mt-8">
										<template v-slot:default>
											<tbody>
												<tr>
													<td class="px-0">
														<span
															class="float-right niradei_bold font_14 grey--text"
														>
															{{ $t("balance") }} </span
														><br />
														<h3
															class="float-right niradei_bold font_18 dark_grey"
															v-if="assetLiabilityReport"
														>
															{{
																Number(
																	assetLiabilityReport.total_current_liability *
																		-1
																).toLocaleString()
															}}
														</h3>
													</td>
												</tr>
												<tr>
													<td class="px-0">
														<span
															class="float-right niradei_bold font_14 grey--text"
															v-if="assetLiabilityReport"
														>
															{{ $t("%_of_total_liability") }} </span
														><br />
														<h3
															class="float-right niradei_bold font_18 dark_grey"
															v-if="assetLiabilityReport"
														>
															{{ currentLiabilityPercentage }}
														</h3>
													</td>
												</tr>
											</tbody>
										</template>
									</v-simple-table>
								</template>
							</v-col>
							<v-col sm="6" cols="12" class="pl-0 py-0">
								<chart
									ref="currentLiabilityChart"
									:legend-position="'bottom'"
									:legend-visible="false"
									:tooltip-visible="true"
									:tooltip-template="'#= category #: #: value #'"
									:chart-area-background="''"
									:series-defaults-type="'donut'"
									:series-defaults-labels-background="'transparent'"
									:series="currentLiabilitySeries"
									:value-axis="valueAxis_round"
									:theme="'sass'"
								/>
							</v-col>
						</v-row>
					</v-card>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import { Chart } from "@progress/kendo-charts-vue-wrapper";

const {
	accountingInsightHandler,
	closingDateHandler,
} = require("@/scripts/AppHandlers");
const ReconcileRuleHandler = require("@/scripts/handler/accounting/reconcileRule");

export default {
	components: {
		chart: Chart,
		Performance: () => import(`./insight/Performance`),
		LoadingMe: () => import(`@/components/Loading`),
	},
	data: () => ({
		reconcileRuleReports : {
			open : 0,
			closed : 0,
		},
		currentLiabilityAnalysisLoading: false,
		changeInRetainEarningLoading: false,
		currentClosDateLoadding: false,
		insightLoading: false,
		insight: null,
		assetLiabilityReport: null,
		varianceAnalysist: null,
		changeInRetainEarning: null,
		closingDate: "",
		Helper: Helper,
		currentAssetPercentage: 0,
		currentLiabilityPercentage: 0,
		currentAssetSeries: [],
		currentLiabilitySeries: [],
		valueAxis_round: [
			{
				labels: {
					format: "{0}",
				},
			},
		],
	}),
	methods: {
		loadData() {
			let today = new Date(),
				monthOf = kendo.toString(today, "MM-yyyy"),
				compareMonthOf = kendo.toString(today, "MM-yyyy");

			// Reconcile Report
			ReconcileRuleHandler
			.getReport({
				params: {
					monthOf: new Date().toISOString().substr(0, 7),
				},
			})
			.then((res) => {
				if (res.data) {
					let open = 0, closed = 0;
					res.data.data.forEach(value => {
						if(value.status === ""){
							open++;
						}
						if(value.status.toLowerCase() === "closed"){
							closed++;
						}
					});

					this.reconcileRuleReports = {
						open : open,
						closed : closed,
					}
				}
			})

			// Insight
			this.insightLoading = true;
			accountingInsightHandler.getInsights().then((res) => {
				if (!kendo.jQuery.isEmptyObject(res.data)) {
					// Bind data
					this.insight = res.data;
				}
			})
			.finally(()=>{
				this.insightLoading = false;
			});

			// Asset & Liability
			this.currentLiabilityAnalysisLoading = true;
			accountingInsightHandler.getAssetLiabilityReport(today).then((res) => {
				if (!kendo.jQuery.isEmptyObject(res.data)) {
					// Bind data
					this.assetLiabilityReport = res.data;
					this.bindData();
					this.currentLiabilityAnalysisLoading = false;
				}
			});

			// Retained Earning
			this.changeInRetainEarningLoading = true;
			accountingInsightHandler
				.getChangeInRetainEarning(monthOf, compareMonthOf)
				.then((res) => {
					if (!kendo.jQuery.isEmptyObject(res.data)) {
						// Bind data
						this.changeInRetainEarning = res.data;
						this.changeInRetainEarningLoading = false;
					}
				});

			// Closing Date
			this.currentClosDateLoadding = true;
			closingDateHandler.last()
			.then((res) => {
				if (!kendo.jQuery.isEmptyObject(res.data.data)) {
					// Bind data
					this.closingDate = kendo.toString(
						new Date(res.data.data.closingDate),
						"dd MMM"
					);
				}
			})
			.finally(()=>{
				this.currentClosDateLoadding = false;
			});
		},
		bindData() {
			// Current Asset
			let currentAssetPercentage = 0;
			if (this.assetLiabilityReport.total_asset > 0) {
				currentAssetPercentage =
					(this.assetLiabilityReport.total_current_asset /
						this.assetLiabilityReport.total_asset) *
					100;
				this.currentAssetPercentage = kendo.toString(
					currentAssetPercentage,
					"n"
				);
			}

			let currentAssetChart = this.$refs.currentAssetChart.kendoWidget();
			currentAssetChart.options.series.push({
				data: [
					{
						category: i18n.t("current_assets"),
						value: kendo.toString(currentAssetPercentage, "n"),
						color: "#c80000",
					},
					{
						category: i18n.t("total_assets"),
						value: kendo.toString(100 - currentAssetPercentage, "n"),
						color: "#f44336",
					},
				],
			});
			currentAssetChart.refresh();

			// Current Liabilities
			let currentLiabilityPercentage = 0;
			if (this.assetLiabilityReport.total_liability != 0) {
				currentLiabilityPercentage =
					(this.assetLiabilityReport.total_current_liability /
						this.assetLiabilityReport.total_liability) *
					100;
				this.currentLiabilityPercentage = kendo.toString(
					currentLiabilityPercentage,
					"n"
				);
			}

			let currentLiabilityChart = this.$refs.currentLiabilityChart.kendoWidget();
			currentLiabilityChart.options.series.push({
				data: [
					{
						category: i18n.t("current_liabilities"),
						value: kendo.toString(currentLiabilityPercentage, "n"),
						color: "#c80000",
					},
					{
						category: i18n.t("total_liabilities"),
						value: kendo.toString(100 - currentLiabilityPercentage, "n"),
						color: "#f44336",
					},
				],
			});
			currentLiabilityChart.refresh();
		},
	},
	mounted() {
		// Load Insights
		this.loadData();
	},
};
</script>

<style scoped>
.loan-to-pay {
	background-color: #212a35;
	color: #fff;
	border: 0;
}

.loan-to-pay .row .v-card {
	background-color: rgb(146, 208, 80);
	font-size: 41px;
	border: 0;
	color: #212a35;
}
.k-chart {
	height: 160px !important;
}

.box-insight {
	background-color: #edf1f5;
	min-height: 220px;
	justify-content: center;
	display: flex;
	align-items: center;
	border: none !important;
	border-radius: 0 !important;
	text-align: center;
	padding: 28px 40px;
}

.color_green {
	color: #2ca01c;
	font-size: 35px;
	font-family: "Niradei-Bold", serif !important;
}
.theme--light.v-data-table {
	background-color: transparent !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
	height: 32px !important;
	border-bottom: thin solid rgba(0, 0, 0, 0.12);
}
.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
	background-color: transparent !important;
}
.border-bottom {
	border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}
.font-small {
	font-size: 12px;
	line-height: 15px;
}
.font-26 {
	font-size: 26px !important;
}
.flex_column {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
@media (max-width: 576px) {
}
</style>
