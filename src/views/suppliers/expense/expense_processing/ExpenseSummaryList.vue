<template>
	<v-row>
		<v-col sm="12" cols="12" class="grayBg px-6">
			<v-card color="white" class="pa-3 no_border" elevation="0">
				<v-row>
					<v-col sm="9" cols="12" class="pt-0">
						<h2 class="mb-0 font_20">{{ $t("expense_batch_records") }}</h2>

						<p class="mb-0">
							{{ $t("expenses_summary_list_desc") }}
						</p>
					</v-col>
					<v-col sm="3" cols="12" class="pt-2"> 
						<v-btn
							class="float-right capitalize white--text"
							color="primary"
							@click="search"
						>
							{{ $t("refresh") }}
						</v-btn>
						<v-btn
							class="capitalize mr-2 float-right white--text"
							to="expense_summary"
							color="primary"
						>
							{{ $t("add_new") }}
						</v-btn>
					
					</v-col>
					<v-col sm="12" cols="12">
						<template>
							<kendo-datasource
								ref="expenseSummaryDS"
								:data="expenseSummaryList"
								:group="group"
								:schema="schemaDefinition"
							/>
							<kendo-grid
								id="expenseSummaryGrid"
								ref="expenseSummaryGrid"
								class="grid-function"
								:data-source-ref="'expenseSummaryDS'"
								:column-menu="true"
								:groupable="true"
								:scrollable-virtual="true"
								:dataBound="dataBound"
							>
								<kendo-grid-column
									:title="$t('no')"
									:template="rowNumberTmpl"
									:width="50"
									:headerAttributes="{
										style: 'background-color: #EDF1F5;',
										class: 'text-center',
									}"
									:attributes="{ style: 'text-align: center' }"
								/>
								<kendo-grid-column
									:field="'date'"
									:title="$t('date')"
									:format="'{0:dd-MM-yyyy}'"
									:width="100"
									:group-footer-template="$t('total')"
									:headerAttributes="{ style: 'background-color: #EDF1F5' }"
								/>
								<kendo-grid-column
									:field="'number'"
									:title="$t('number')"
									:hidden="true"
									:width="150"
									:headerAttributes="{ style: 'background-color: #EDF1F5' }"
								/>
								<kendo-grid-column
									:field="'employee'"
									:title="$t('employee')"
									:template="'<span>#=employee.name#</span>'"
									:width="200"
									:headerAttributes="{ style: 'background-color: #EDF1F5' }"
								/>
								<kendo-grid-column
									:field="'amount'"
									:title="$t('amount')"
									:format="'{0:n}'"
									:width="100"
									:aggregates="['sum']"
									:headerAttributes="{ style: 'text-align: right; background-color: #EDF1F5' }"
									:attributes="{ style: 'text-align: right' }"
								/>
								<kendo-grid-column
									:field="'is_cleared'"
									:title="$t('status')"
									:template="'<span>#= is_cleared === 0 ? `Open` : `Verified`#</span>'"
									:width="100"
									:headerAttributes="{ style: 'text-align: center; background-color: #EDF1F5' }"
									:attributes="{ style: 'text-align: center' }"
								/>
								<kendo-grid-column
									:title="$t('verify')"
									:width="90"
									:command="[
										{ iconClass: 'k-icon k-i-tick', className:'verifyCommand', text: 'Verify', click: goVerify },
									]"
									:headerAttributes="{
										style: 'text-align: center; background-color: #EDF1F5',
									}"
									:attributes="{ style: 'text-align: center' }"
								/>
								<kendo-grid-column
									:title="$t('edit')"
									:width="90"
									:command="[
										{ iconClass: 'k-icon k-i-edit', className:'editCommand', text: 'Edit', click: goEdit },
									]"
									:headerAttributes="{
										style: 'text-align: center; background-color: #EDF1F5',
									}"
									:attributes="{ style: 'text-align: center' }"
								/>
							</kendo-grid>
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
import ExpenseSummaryModel from "@/scripts/model/ExpenseSummary";

const ExpenseSummaryHandler = require("@/scripts/expenseSummaryHandler");

export default {
	components: {
		LoadingMe: () => import(`@/components/Loading`),
	},
	data: () => ({
		expenseSummaryList : [],
		expenseSummaryOrigin : [],
		group: {field: 'employee'},
		aggregateDefinition:
            {field: 'amount', aggregate: 'sum'},
		schemaDefinition: {
			model: { id: "uuid" },
		},
		// LoadingMe
		showLoading : false,
	}),
	methods: {
		search () {
			this.showLoading = true;

			ExpenseSummaryHandler.getAll()
			.then((res)=>{
				let entries = [];
				res.data.forEach(element => {
					let exp = element;

					exp.date = new Date(element.date);

					let sum = 0;
					exp.summary_details.forEach(value => {
						sum += value.exchanged_amount;
					});
					exp.amount = sum;

					entries.push(exp);
				});

				this.expenseSummaryOrigin = res.data;
				this.expenseSummaryList = entries;
			})
			.finally(()=>{
				this.showLoading = false;
			});
		},
		rowNumberTmpl(dataItem) {
			let ds = this.$refs.expenseSummaryDS.kendoWidget(),
				index = ds.indexOf(dataItem);
			return index + 1;
		},
		dataBound(e) {
			let grid = e.sender;

			grid.tbody.find("tr[role='row']").each(function () {
				var model = grid.dataItem(this);

				if (model.is_cleared === 1) {
					kendo.jQuery(this).find(".verifyCommand").hide();
					kendo.jQuery(this).find(".editCommand").hide();
				}
			});
		},
		goEdit(e) {
			e.preventDefault();
			let grid = this.$refs.expenseSummaryGrid.kendoWidget();
			let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));

			this.$router.push({
				name: "Expense Summary",
				params: { initExpenseSummary: this.getExpenseSummary(dataItem.uuid) },
			});
		},
		goVerify(e) {
			e.preventDefault();
			let grid = this.$refs.expenseSummaryGrid.kendoWidget();
			let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));

			this.$router.push({
				name: "Expense Verify",
				params: { initExpenseSummary: this.getExpenseSummary(dataItem.uuid) },
			});
		},
		getExpenseSummary(id){
			let exp =  this.expenseSummaryOrigin.find(i => i.uuid === id);

			return new ExpenseSummaryModel(exp);
		},
	},
	watch: {
		$route(to, from) {
			if(from.name === "Expense Verify" || from.name === "Expense Summary"){
				this.search();
			}
		}
	},
	mounted(){
		this.group = [
            {
                field: "employee",
                aggregates: this.aggregateDefinition,
            }
        ]
		// this.search();
		
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
