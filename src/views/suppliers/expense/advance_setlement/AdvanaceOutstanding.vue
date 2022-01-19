<template>
	<v-row>
		<v-col sm="12" cols="12" class="grayBg px-6">
			<v-card color="white" class="pa-3 no_border" elevation="0">
				<v-row>
					<v-col sm="9" cols="10" class="pt-0">
						<h2 class="mb-0 font_20">{{ $t("outstanding_advance") }}</h2>

						<p class="mb-0">
							{{ $t("advance_outstanding_desc") }}
						</p>
					</v-col>
					<v-col sm="3" cols="12" class="pt-1 mb-0 paddingT">
						<v-btn
							class="float-right capitalize white--text"
							to="cash_advance"
							color="primary"
						>
							{{ $t("new_advance") }}
						</v-btn>
					</v-col>
					<v-col sm="12" cols="12" class="pt-2"> 
						<v-row>
							<v-col sm="3 " cols="12" class="py-0">
								<app-datepicker
								:initialDate="asOfDate"
								@emitDate="asOfDate = $event"
								/>
							</v-col>
							<v-col sm="2" cols="12" class="pt-1 mb-0 paddingT">
						<v-btn class="white--text" color="primary" @click="search">{{
							$t("run_report")
						}}</v-btn>
					</v-col>
						</v-row>
					</v-col>
					<v-col sm="12" cols="12">
						<template>
							<LoadingMe
								type="loading"
								:isLoading="showLoading"
								:fullPage="false"
								:myLoading="true"
							/>

							<kendo-datasource
							ref="dataSource"
							:data="cashAdvanceList"
							:group="groupDefinition"
							:aggregate="aggregateDefinition"
							:group-paging="true"
							/>

							<kendo-grid
							id="gridGL"
							ref="gridGL"
							class="custom_grid"
							:data-source-ref="'dataSource'"
							:sortable="true"
							:column-menu="true"
							:reorderable="true"
							:resizable="true"
							:noRecords="true"
							:navigatable="true"
							>
							<kendo-grid-column
								:field="'advance_date'"
								:title="$t('date')"
								:template="dateTemplate"
								:groupFooterTemplate="'Total:'"
								:width="100"
							/>
							<kendo-grid-column
								:field="'requested_by.name'"
								:title="$t('employee')"
								:width="150"
								:hidden="true"
								groupHeaderTemplate="<span class=`text-bold text-black`>#=value#</span>"
							/>
							<kendo-grid-column
								:field="'number'"
								:title="$t('advance_number')"
								:template="numberTemplate"
								:width="150"
							/>
							<kendo-grid-column
								:field="'ref_number'"
								:title="$t('ref_number')"
								:width="150"
							/>
							<kendo-grid-column
								:field="'amount'"
								:title="$t('amount')"
								:format="'{0:n}'"
								:width="100"
								:groupFooterTemplate="
								'<div style=text-align:right>#= kendo.toString(sum, `n`) #</div>'
								"
								:attributes="{
								style: 'text-align: right;',
								}"
							/>
							</kendo-grid>

							<pager 
								:skip="responseData.skip" 
								:take="responseData.item_per_page" 
								:total="responseData.total_item_count" 
								:button-count="responseData.buttonCount" 
								:info="responseData.info" 
								:type="responseData.type" 
								:page-sizes="responseData.pageSizes ? responseData.pageSizeDefs : undefined"
								:previous-next="responseData.previousNext" 
								@pagechange="handlePageChange" >
							</pager>
						</template>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import { Pager } from '@progress/kendo-vue-data-tools';
import Helper from "@/helper.js";
import ResponseDataModel from "@/scripts/model/ResponseData";

const cashAdvanceHandler = require("@/scripts/handler/workingcapital/cashAdvanceHandler");
const EntityType = require("@/scripts/default_setup/EntityType");
const WorkFlowStatus = require("@/scripts/default_setup/WorkFlowStatus");

export default {
	name: "AdvanceOutstanding",
	components: {
		"pager": Pager,
		LoadingMe: () => import("@/components/Loading"),
		"app-datepicker": () => import("@/components/custom_templates/DatePickerComponent"),
	},
	data: () => ({
		responseData : new ResponseDataModel(),
		asOfDate: new Date().toISOString().substr(0, 10),
		cashAdvanceList: [],
		// Kendo dataSource
		groupDefinition: {
			field: "requested_by.name",
			aggregates: [
				{ field: "amount", aggregate: "sum" },
				{ field: "balance", aggregate: "sum" },
			],
			compare: function(a, b) {
				if (a.items[0].requested_by.number === b.items[0].requested_by.number) {
					return 0;
				} else if (
					a.items[0].requested_by.number > b.items[0].requested_by.number
				) {
					return 1;
				} else {
					return -1;
				}
			},
		},
		aggregateDefinition: [
			{ field: "amount", aggregate: "sum" },
			{ field: "balance", aggregate: "sum" },
		],
		// LoadingMe
		showLoading: false,
	}),
	methods: {
		handlePageChange: function(event){
			let pageNumber = (event.skip + event.take) / event.take;
			
			this.responseData.page_number = pageNumber;
			this.responseData.skip = event.skip;
			this.responseData.take = event.take;
			this.responseData.item_per_page = event.take;

			this.search();
		},
		// Search
		search() {
			let asOfDate = new Date(this.asOfDate);

			// Empty dataSource
			let ds = this.$refs.dataSource.kendoWidget();
			ds.data([]);

			this.showLoading = true;
			cashAdvanceHandler
				.getAll({
					params: {
						as_of_date: kendo.toString(asOfDate, "yyyy-MM-dd") + "T23:59:59.999Z",
						page_number: this.responseData.page_number,
						item_per_page: this.responseData.item_per_page,
					},
				})
				.then((res) => {
					this.responseData = new ResponseDataModel(res.data);

					/* Filter open advance */
					this.cashAdvanceList = this.responseData.data.filter(item => item.is_settled === 0 && item.status === WorkFlowStatus.APPROVED);
				})
				.finally(() => {
					this.showLoading = false;
				});
		},
		// Templates
		numberTemplate: (dataItem) => {
			return Helper.linkTemplate(
				dataItem.number,
				`${EntityType.CASH_ADVANCE}/view/${dataItem.uuid}`
			);
		},
		dateTemplate: (dataItem) => {
			return Helper.dateFormat(dataItem.advance_date);
		},
		settlementTemplate: (dataItem) => {
			if (dataItem.advance_settlement !== null) {
				let text =
				Helper.dateFormat(dataItem.advance_settlement.settlement_date) +
				" " +
				dataItem.advance_settlement.number +
				" " +
				kendo.toString(dataItem.actual_expense_amount, "n");
				// return Helper.linkTemplate(dataItem.advance_settlement.number, `${EntityType.ADVANCE_SETTLEMENT}/view/${dataItem.advance_settlement.uuid}`);
				return text;
			} else {
				return "";
			}
		},
	},
};
</script>

<style scoped>
.acc_group header {
	height: 10px !important;
}

table.acc_group tr td {
	border-bottom: 1px solid #ccc;
	padding: 8px;
	vertical-align: middle;
}

table.acc_group tr td:first-child {
	font-weight: 700;
}

table.acc_group tr td:last-child {
	text-align: center;
}

.v-card__actions .v-btn.v-btn {
	padding: 0 16px;
}

.exchange-table.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> thead
	> tr
	> th {
	font-family: "Niradei-Bold", serif;
	color: #000 !important;
	border-top: 1px solid #000 !important;
	border-bottom: 1px solid #000 !important;
	font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> thead
	> tr
	> td {
	color: #000 !important;
	padding: 5px !important;
}

.exchange-table.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> tbody
	> tr:last-child
	td {
	border-bottom: 1px solid #000 !important;
}

.function_footer {
	padding: 15px;
	display: inline-block;
}

@media (max-width: 576px) {
}
</style>
