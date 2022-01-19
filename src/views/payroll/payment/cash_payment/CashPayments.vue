<template>
	<v-row class="">
		<v-col sm="12" cols="12" class="pt-0">
			<h2 class="mb-0 font_20">{{ $t("payroll_payment") }}</h2>
			<v-row class="mt-2">
				<v-col sm="4" cols="12" class="py-0 d-flex justify-space-between">
					<label class="mt-3 mr-1">{{ $t("from") }}</label>
					<app-datepicker
						:initialDate="start_date"
						@emitDate="start_date = $event"/>
				</v-col>
				<v-col sm="4" cols="12" class="py-0  d-flex justify-space-between">
					<label class="mt-3 mr-1">{{ $t("to") }}</label>
					<app-datepicker
						:initialDate="end_date"
						@emitDate="end_date = $event"
						:min="start_date"/>
				</v-col>
				<v-col sm="1" cols="1" class="py-1">
					<v-btn color="primary white--text" @click="onSearch">
						<i class="b-search" style="font-size: 18px; color:#fff !important;"/>
					</v-btn>
				</v-col>
				<v-col sm="3" class="py-1">
					<v-btn to="payroll_cash_payment"
						class="capitalize float-right white--text"
						color="primary">{{ $t("cash_payment") }}
					</v-btn>
				</v-col>
			</v-row>
			<v-row class="mt-0">
				<v-col sm="12" cols="12" class="py-0">
					<LoadingMe
						:isLoading="showLoading"
						:fullPage="false"
						:myLoading="true"
						type="loading"/>
					<kendo-datasource ref="dataSourcePayment" :data="payments" :sort="sort"/>
					<kendo-grid
						id="gridPayment"
						class="grid-function"
						:data-source-ref="'dataSourcePayment'"
						:editable="false"
						v-on:databound="dataBound"
						:scrollable-virtual="true">
						<kendo-grid-column
							:width="200"
							:field="'employeeId'"
							:title="$t('employee_id')"
							:template="'<span>#= employeeId#</span>'"
							:headerAttributes="{ style: 'background-color: #EDF1F5' }"
							:attributes="{ style: 'text-align: left' }"/>
						<kendo-grid-column
							:width="200"
							:field="'employeeName'"
							:title="$t('employee')"
							:template="'<span>#= employeeName#</span>'"
							:headerAttributes="{ style: 'background-color: #EDF1F5' }"
							:attributes="{ style: 'text-align: left' }"/>
						<kendo-grid-column
							:width="200"
							:field="'referenceNumber'"
							:title="$t('reference_number')"
							:template="'<span>#= referenceNumber#</span>'"
							:headerAttributes="{ style: 'background-color: #EDF1F5' }"
							:attributes="{ style: 'text-align: center' }"/>
						<kendo-grid-column
							:width="120"
							:field="'amountPay'"
							:title="$t('amount_pay')"
							:template="'<span>#= kendo.toString(amountPay,`c2`)#</span>'"
							:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
						<kendo-grid-column
							:width="120"
							:field="'created'"
							:title="$t('date')"
							:template="'<span>#= kendo.toString(new Date(created), `dd-MM-yyyy` )#</span>'"
							:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
						<kendo-grid-column
							:width="150"
							:field="'paymentMethod'"
							:title="$t('method')"
							:template="methodTemplate"
							:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
						<kendo-grid-column
							:field="''"
							:title="$t('action')"
							:width="100"
							:command="[{className: 'k-state-disabled isStatus', iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit }]"
							:headerAttributes="{
								style: 'text-align: right; background-color: #EDF1F5',
							}"/>
					</kendo-grid>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>
<script>
	import LoadingMe from "@/components/Loading";
	import kendo from "@progress/kendo-ui";
	const $ = require("jquery");
	const payrollHandler = require("@/scripts/payrollHandler");
	export default {
		data: () => ({
			showLoading: false,
			start_date: "",
			end_date: "",
			data: [],
			payments: [],
			search: {
				start_date: "",
				end_date: "",
			},
			sort: [{ field: "employeeId", dir: "ASC" }],
		}),
		props: {},
		methods: {
			numberFormat(value) {
				return kendo.toString(kendo.parseFloat(value), "c2");
			},
			loadPayment() {
				this.showLoading = true;
				new Promise((resolve) => {
					setTimeout(() => {
						resolve("resolved");
						this.showLoading = true;
						payrollHandler.getPayment(this.search).then((res) => {
							this.showLoading = true;
							if (res.data.statusCode === 200) {
								this.showLoading = false;
								this.payments = res.data.data;
							}
						}).catch();
						{
							this.showLoading = false;
						}
					}, 300);
				});
			},
			onSearch() {
				this.search = {
					start_date: this.start_date,
					end_date: this.end_date,
				};
				this.loadPayment();
			},
			goEdit(e) {
				e.preventDefault();
				let grid = kendo.jQuery("#grid").data("kendoGrid");
				let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
				this.$router.push({
					path: "payroll_cash_payment" + `/${dataItem.id}`,
					params: { id: dataItem.id },
					query: { type: "edit" },
				});
			},
			methodTemplate(val){
				if(val.paymentMethod == 'bank_payment'){
					return 'Bank Payment'
				}else{
					return 'Cash Payment'
				}
			},
			dataBound: function (e) {
                const items = e.sender.items()
                if(items.length > 0){
                    const grid = kendo.jQuery("#gridPayment").data("kendoGrid")
                    if(grid){
                        items.each(function () {
                            let dataItem = grid.dataItem(this);
                            kendo.jQuery("tr[data-uid='" + dataItem.uid + "']").find(".isStatus").each(function () {
                                if (dataItem.paymentMethod !== 'bank_payment') {
                                    kendo.jQuery(this).removeClass('k-state-disabled')
                                }
                            })
                        })
                    }
                }
            },
		},
		async mounted() {
			// await this.loadPayment();
		},
		computed: {},
		components: {
			LoadingMe: LoadingMe,
			"app-datepicker": () =>
			import("@/components/custom_templates/DatePickerComponent"),
		},
		watch: {
			$route: "loadPayment",
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

p {
  color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
  height: 47.2px !important;
}

.text_tip {
  font-size: 9px;
  line-height: 10px;
}
.v-btn {
  text-transform: capitalize !important;
}

@media (max-width: 576px) {
}
</style>
