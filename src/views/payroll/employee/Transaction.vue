<template>
	<v-row>
		<v-col sm="12" cols="12" class="grayBg px-3">
			<v-card color="white" class="pa-3 no_border" elevation="0">
				<v-row class="">
					<v-col sm="10" cols="12" class="py-0">
						<app-searchdate
							:initStartDate="start_date"
							@emitStartDate="start_date = $event"
							:initEndDate="end_date"
							@emitEndDate="end_date = $event"/>
					</v-col>
					<v-col sm="1" cols="1" class="py-0">
						<v-btn
							class="btn_search mt-1"
							@click="searchTransaction"
							style="background-color: rgb(237, 241, 245)">
							<i class="b-search" style="font-size: 18px; color:#fff !important;"/>
						</v-btn>
					</v-col>
					<v-col sm="12" cols="12" class="pt-0">
						<kendo-datasource ref="transactionDS" :data="transactionList" />
						<kendo-grid
							id="grid"
							class="grid-function"
							:data-source-ref="'transactionDS'"
							:editable="false"
							:scrollable-virtual="true"
							:column-menu="true">
							<kendo-grid-column
								:field="'monthOf'"
								:title="$t('month_of')"
								:template="'<span>#=monthOf#</span>'"
								:width="150"
								:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
							<kendo-grid-column
								:field="'Type'"
								:title="$t('type')"
								:width="100"
								:template="typeTemplate"
								:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
							<kendo-grid-column
								:field="'referenceNumber'"
								:title="$t('payroll_number')"
								:width="200"
								:template="'<span>#=referenceNumber#</span>'"
								:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
							<kendo-grid-column
								:field="'status'"
								:title="$t('status')"
								:width="120"
								:template="status"
								:headerAttributes="{ style: 'background-color: #EDF1F5' }"
								:attributes="{ style: 'text-align: center' }"/>
							<kendo-grid-column
								:field="'netPay'"
								:title="$t('amount')"
								:width="150"
								:template="'<span>#=kendo.toString(netPay,`c2`)#</span>'"
								:headerAttributes="{ style: 'background-color: #EDF1F5' }"
								:attributes="{ style: 'text-align: right' }"/>
						</kendo-grid>
						<LoadingMe
							:isLoading="showLoading"
							:fullPage="false"
							:myLoading="true"
							type="loading"/>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>
<script>
	// import kendo from '@progress/kendo-ui'
	import SearchDateComponent from "@/components/custom_templates/SearchDate";
	const employeeHandler = require("@/scripts/employeeHandler");

	export default {
		name: "",
		props: {
			employee: {},
		},
		components: {
			LoadingMe: () => import(`@/components/Loading`),
			"app-searchdate": SearchDateComponent,
		},
		data: () => ({
			transactionList: [],
			start_date: "",
			end_date: "",
			showLoading: false,
			isLoaded: false,
		}),
		methods: {
			searchTransaction() {},
			// Load Transaction
			loadTransaction() {
				if(this.employee.id !== ''){
					this.showLoading = true;
					new Promise((resolve) => {
						setTimeout(() => {
							resolve("resolved");
							this.showLoading = true;
							employeeHandler.getEmployeeTransactions(this.employee.id).then((res) => {
								this.showLoading = true;
								if (res.statusCode === 200) {
									this.transactionList = res.data;
									this.showLoading = false;
								}
							})
							.catch();
							{
								this.showLoading = false;
							}
						}, 300);
					});
				}
			},
			callback() {
				if (this.$route.params !== null && this.$route.params.hasOwnProperty("data")) {
					this.$emit("onUpdate", this.$route.params.data);
					this.loadTransaction();
				}
			},
			status(dataItem) {
				if (dataItem.status == 1) {
					return "Paid";
				} else {
					return "Open";
				}
			},
			typeTemplate(dataItem){
				if(dataItem.type == "pay_slip"){
					return "Payroll";
				}else{
					return ""
				}
			}
		},
		mounted() {},
		watch: {
			employee() {
				if (this.employee !== undefined) {
					this.loadTransaction();
					this.callback()
				}
			},
		},
	};
</script>
<style scoped></style>
