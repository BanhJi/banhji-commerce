<template>
	<v-row>
		<v-col sm="12" cols="12" class="pt-0">
			<v-card color="white" class="no_border" elevation="0">
				<v-row>
					<v-col sm="10" cols="10" class="pt-0">
						<h2 class="mb-0 font_20">{{ $t("expense_reimburse") }}</h2>

						<p class="mb-0">
							{{ $t("reimburse_expense_desc") }}
						</p>
					</v-col>
					<v-col sm="2" cols="2" class="pt-2">
						<v-btn
							to="reimbursement"
							color="primary"
							class="text-capitalize white--text float-right"
						>
							{{ $t("new_reimbursement") }}
						</v-btn>
					</v-col>

					<v-col sm="9" cols="12" class="pt-2">
						<app-searchdate
							:initStartDate="startDate"
							@emitStartDate="startDate = $event"
							:initEndDate="endDate"
							@emitEndDate="endDate = $event"
						/>
					</v-col>
					<v-col sm="2" cols="12" class="pt-3 pb-0">
						<v-btn class="white--text" color="primary" @click="search">{{
							$t("run_report")
						}}</v-btn>
					</v-col>

					<v-col sm="12" cols="12" class="pt-0">
						<template>
							<kendo-datasource
								ref="expenseEntryDS"
								:data="reimbursementEntries"
								:schema="schemaDefinition"
								:group="groupDefinition"
                                :aggregate="aggregateDefinition"
							/>
							<kendo-grid
								id="reimbursementGrid"
								ref="reimbursementGrid"
								class="grid-function"
								:data-source-ref="'expenseEntryDS'"
								:column-menu="true"
								:scrollable-virtual="true"
								:dataBound="dataBound"
							>
								<kendo-grid-column
									:field="'date'"
									:title="$t('date')"
									:format="'{0:dd-MM-yyyy}'"
									:group-footer-template="'Total:'"
									:width="100"
									:headerAttributes="{ style: 'background-color: #EDF1F5' }"
								/>
								<kendo-grid-column
									:field="'number'"
									:title="$t('number')"
									:template="numberTemplate"
									:width="150"
									:headerAttributes="{ style: 'background-color: #EDF1F5' }"
								/>
								<kendo-grid-column
									:field="'description'"
									:title="$t('description')"
									:width="150"
									:headerAttributes="{ style: 'background-color: #EDF1F5' }"
								/>
								<kendo-grid-column
									:field="'payer.name'"
									:title="$t('employee')"
									:template="'<span>#=payer.name#</span>'"
									:group-header-template="'#=value#'"
									:hidden="true"
									:width="200"
									:headerAttributes="{ style: 'background-color: #EDF1F5' }"
								/>
								<kendo-grid-column
									:field="'amount'"
									:title="$t('amount')"
									:format="'{0:n}'"
									:group-footer-template="'<div style=text-align:right>#=kendo.toString(sum, `n`)#</div>'"
									:width="100"
									:headerAttributes="{ style: 'text-align: right; background-color: #EDF1F5' }"
									:attributes="{ style: 'text-align: right' }"
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

							<LoadingMe
								type="loading"
								:isLoading="showLoading"
								:fullPage="false"
								:myLoading="true"
							/>
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
import ReimbursementModel from "@/scripts/model/Reimbursement";
import ResponseDataModel from "@/scripts/model/ResponseData";

const ReimbursementHandler = require("@/scripts/handler/workingcapital/reimbursementHandler");

export default {
	components: {
		"pager": Pager,
		LoadingMe: () => import(`@/components/Loading`),
		"app-searchdate": () => import("@/components/custom_templates/SearchDate"),
	},
	data: () => ({
		startDate: "",
		endDate: "",
		responseData : new ResponseDataModel(),
		reimbursementEntries : [],
		schemaDefinition: {
			model: { id: "uuid" },
		},
		groupDefinition: {
            field: "payer.name",
            aggregates: [
                {field: "amount", aggregate: "sum"},
            ]
        },
        aggregateDefinition: [
            {field: "amount", aggregate: "sum"},
        ],
		// LoadingMe
		showLoading : false,
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
		search () {
			let sdate = this.startDate,
				edate = this.endDate;

			if (sdate && edate) {
				sdate =
					kendo.toString(new Date(sdate), "yyyy-MM-dd") + "T00:00:00.000Z";

				edate = new Date(edate);
				edate = kendo.toString(edate, "yyyy-MM-dd") + "T23:59:59.999Z";
			} else {
				sdate = 0;
				edate = 0;
			}

			this.showLoading = true;
			ReimbursementHandler.getAll({
					params: {
						start_date: sdate,
						end_date: edate,
						page_number: this.responseData.page_number,
						item_per_page: this.responseData.item_per_page,
					},
				})
			.then((res)=>{
				this.responseData = new ResponseDataModel(res.data);
				this.bindData();
			})
			.finally(()=>{
				this.showLoading = false;
			});
		},
		bindData(){
			let entries = [];
			this.responseData.data.forEach(element => {
				let exp = Object.assign({}, element);
				exp.date = new Date(element.reimbursement_date);

				let sum = 0;
				exp.details.forEach(value => {
					if(value.exchanged_amount > 0){
						sum += value.exchanged_amount;
					}
				});
				exp.amount = sum;

				entries.push(exp);
			});

			this.reimbursementEntries = entries;
		},
		dataBound(e) {
			let grid = e.sender;

			grid.tbody.find("tr[role='row']").each(function () {
				var model = grid.dataItem(this);

				if (model.is_cleared === 1) {
					kendo.jQuery(this).find(".editCommand").hide();
				}
			});
		},
		// Number Template
        numberTemplate: (dataItem) => {
            return Helper.linkTemplate(dataItem.number, `reimbursement/view/${dataItem.uuid}`);
        },
		// Use For Template
        useForTmpl: (dataItem) => {
			let txt = '';

            switch(dataItem.use_for_option) {
				case 1:
					txt = "Reimbursement";
					break;
				case 2:
					txt = "Cash Advance";
					break;
				default:
					txt = "Credit";
			}

			return txt;
        },
		goEdit(e) {
			e.preventDefault();
			let grid = this.$refs.reimbursementGrid.kendoWidget();
			let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));

			this.$router.push({
				name: "Reimbursement",
				params: { initReimbursement: this.getReimbursement(dataItem.uuid) },
			});
		},
		getReimbursement(id){
			let reimbmnt =  this.responseData.data.find(i => i.uuid === id);

			return new ReimbursementModel(reimbmnt);
		},
	},
	watch: {
		$route(to, from) {
			if(from.name === "Reimbursement" || from.name === "Reimbursement View"){
				this.search();
			}
		}
	},
	mounted(){
		
	}
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
