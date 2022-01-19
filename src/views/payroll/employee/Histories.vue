<template>
	<v-row>
		<v-col sm="12" cols="12" class="grayBg px-3">
			<v-card color="white" class="pa-3 no_border" elevation="0">
				<v-row>
					<v-col sm="12" cols="12" class="py-0">
						<h2 class="mb-0">{{ $t("employment_history") }}</h2>
						<router-link :to="{ path: routerTo }">
							<v-btn
								width="100"
								color="primary"
								:disabled="btnEnabled"
								class=" white--text float-right text-capitalize">{{ $t("add_new") }}</v-btn>
						</router-link>
					</v-col>
					<v-col sm="12" cols="12" class="py-0">
						<v-row class="">
							<v-col sm="12" cols="12">
								<LoadingMe
									:isLoading="showLoading"
									:fullPage="false"
									:myLoading="true"
									type="loading"/>
								<template>
									<kendo-datasource ref="employmentDS" :data="employmentList" />
									<kendo-grid
										id="gridRecord"
										class="grid-function"
										:data-source-ref="'employmentDS'"
										v-on:databound="dataBound"
										:editable="false"
										:scrollable-virtual="true"
										:column-menu="true">
										<kendo-grid-column
											:field="'date'"
											:title="$t('date_')"
											:width="120"
											:template="'<span>#=employmentRecord.date#</span>'"
											:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
										<kendo-grid-column
											:field="'contract'"
											:title="$t('contract')"
											:width="200"
											:hidden="true"
											:template="'<span>#=employmentRecord.natureContract.name#</span>'"
											:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
										<kendo-grid-column
											:field="'department'"
											:title="$t('department')"
											:width="170"
											:template="'<span>#=employmentRecord.position.department.name#</span>'"
											:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
										<kendo-grid-column
											:field="'position'"
											:title="$t('position')"
											:width="150"
											:template="'<span>#=employmentRecord.position.name#</span>'"
											:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
										<kendo-grid-column
											:field="'salary'"
											:title="$t('salary')"
											:width="150"
											:template="'<span>#=employmentRecord.salary#</span>'"
											:attributes="{ style: 'width: 100px' }"
											:headerAttributes="{
												style: 'background-color: #EDF1F5; width: 100px',
											}"/>
										<kendo-grid-column
											:field="'nature'"
											:title="$t('nature')"
											:width="200"
											:hidden="true"
											:template="'<span>#=employmentRecord.natureRecord.name#</span>'"
											:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
										<kendo-grid-column
											:title="$t('benefits')"
											:width="150"
											:hidden="true"
											:command="{
												iconClass: 'k-icon k-i-show',
												text: 'Show',
												click: goEdit,
											}"
											:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
										<kendo-grid-column
											:field="''"
											:title="$t('action')"
											:width="100"
											:command="[
											{
												className: 'k-state-disabled isStatus',
												iconClass: 'k-icon k-i-edit',
												text: 'Edit',
												click: goEdit,
											}]"
											:headerAttributes="{
												style: 'text-align: right; background-color: #EDF1F5',
											}"/>
									</kendo-grid>
								</template>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>
<script>
	const employeeHandler = require("@/scripts/employeeHandler");
	import kendo from "@progress/kendo-ui";
	export default {
		name: "",
		props: {
			employee: {},
		},
		components: {
			LoadingMe: () => import(`@/components/Loading`),
		},
		computed: {
			routerTo() {
			return "employment_history" + `/${this.employee ? this.employee.id : ""}`;
			},
			btnEnabled() {
			if (this.employee) {
				return !this.employee.id;
			} else {
				return false;
			}
			},
		},
		data: () => ({
			employmentList: [],
			employment_id: "",
			showLoading: false,
			employmentOld: [],
		}),
		methods: {
			async loadEmploymentRecord() {
				if(this.employee.id !== ''){
					new Promise((resolve) => {
					setTimeout(() => {
						resolve("resolved");
						this.showLoading = true;
						employeeHandler
						.getEmploymentListByEmployee(this.employee.id)
						.then((res) => {
							this.showLoading = false;
							this.employmentList = res;
						});
					}, 300);
					});
				}
			},
			goEdit(e) {
				e.preventDefault();
				let grid = kendo.jQuery("#gridRecord").data("kendoGrid");
				let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
				this.$router.push({
					path:
					"employment_history" +
					`/${this.employee ? this.employee.id : ""}` +
					`/${dataItem.id}`,
					params: { id: dataItem.id },
					query: { type: "edit" },
				});
			},
			callback() {
				if (this.$route.params !== null && this.$route.params.hasOwnProperty("data")) {
					this.loadEmploymentRecord();
				}
			},
			dataBound: function(e) {
				const grid = kendo.jQuery("#gridRecord").data("kendoGrid");
				const items = e.sender.items();
				items.each(function() {
					let dataItem = grid.dataItem(this);
					kendo.jQuery("tr[data-uid='" + dataItem.uid + "']").find(".isStatus").each(function() {
						if (dataItem.status == 1) {
							kendo.jQuery(this).removeClass("k-state-disabled");
						}
					});
				});
			},
		},
		mounted: async function() {
			this.loadEmploymentRecord();
		},
		watch: {
			employee() {
				if (this.employee !== undefined) {
					this.loadEmploymentRecord();
					this.callback();
				}
			},
		},
	};
</script>
<style scoped>
h2 {
  font-size: 25px;
}
</style>
