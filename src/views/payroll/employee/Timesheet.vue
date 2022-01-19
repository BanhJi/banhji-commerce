<template>
	<v-row>
		<v-col sm="12" cols="12" class="grayBg px-3">
			<v-card color="white" class="pa-3 no_border" elevation="0">
				<v-row>
					<v-col sm="6" cols="12" class="">
						<h3 class="mb-0 font_20">{{ $t("timesheet") }}</h3>
					</v-col>
					<v-col sm="6" cols="12" class="">
						<v-menu
							nudge-bottom="4"
							bottom
							offset-y
							origin="bottom top"
							transition="scroll-y-reverse-transition">
							<template v-slot:activator="{ on }">
								<span class="hidden-sm-and-up">
									<div class="dropdown_transactions">
										<v-icon v-on="on" left>mdi-attachment</v-icon>
										<v-icon size="" class="ma-1">expand_more</v-icon>
									</div>
								</span>
								<span class="hidden-sm-and-down">
									<v-btn
										color="primary"
										v-on="on"
										:disabled="btnEnabled"
										class="dropdown_transactions white--text my-2 text-capitalize">{{ $t("add_new_timesheet") }}
										<v-icon size="" class="ma-1">expand_more</v-icon>
									</v-btn>
								</span>
							</template>
							<v-list>
								<v-list-item link route :to="{ path: routerTo }">
									<v-list-item-title>{{$t("import_timesheet")}}</v-list-item-title>
								</v-list-item>
								<v-list-item link route :to="{ path: routerAddlist }">
									<v-list-item-title>{{$t("create_timesheet")}}</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
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
									<kendo-datasource
										ref="dataSourceTime"
										:data="timesheetList"/>
									<kendo-grid
										id="gridTimesheet"
										class="grid-function"
										:data-source-ref="'dataSourceTime'"
										:editable="false"
										:scrollable-virtual="true"
										:column-menu="true">
										<kendo-grid-column
											:field="'monthOf'"
											:title="$t('month_of')"
											:width="150"
											:template="'<span>#=timesheetRecord.monthOf#</span>'"
											:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
										<kendo-grid-column
											:field="'paidHour'"
											:title="$t('paid_hour')"
											:width="150"
											:template="'<span>#=timesheetRecord.paidHours#</span>'"
											:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
										<kendo-grid-column
											:field="'unpaidHours'"
											:title="$t('unpaid')"
											:width="120"
											:template="'<span>#=timesheetRecord.unpaidHours#</span>'"
											:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
										<kendo-grid-column
											:field="'overtimeHoursWeekend'"
											:title="$t('overtime_weekend')"
											:width="250"
											:template="'<span>#=timesheetRecord.overtimeHoursWeekend#</span>'"
											:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
										<kendo-grid-column
											:field="'overTimeNight'"
											:title="$t('overtime_night')"
											:width="200"
											:template="'<span>#=timesheetRecord.overTimeNight#</span>'"
											:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
										<kendo-grid-column
											:field="'overtimeHoursHoliday'"
											:title="$t('overtime_holiday')"
											:width="200"
											:template="'<span>#=timesheetRecord.overtimeHoursHoliday#</span>'"
											:headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
										<kendo-grid-column
											:field="''"
											:title="$t('action')"
											:width="100"
											:command="[{iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEditTimesheet}]"
											:headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
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
				return "timesheet_import" + `/${this.employee ? this.employee.id : ""}`;
			},
			routerAddlist() {
				return "timesheet_add_list" + `/${this.employee ? this.employee.id : ""}`;
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
			timesheetList: [],
			showLoading: false,
		}),
		methods: {
			async loadTimesheet() {
				if(this.employee.id !== ''){
					new Promise((resolve) => {
						setTimeout(() => {
							resolve("resolved");
							this.showLoading = true;
							employeeHandler.getTimesheet(this.employee.id).then((res) => {
								this.showLoading = false;
								this.timesheetList = res.data;
							});
						}, 300);
					});
				}
			},
			goEditTimesheet(e) {
				e.preventDefault();
				let grid = kendo.jQuery("#gridTimesheet").data("kendoGrid");
				let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
				this.$router.push({
					path:"timesheet_add_list" + `/${this.employee ? this.employee.id : ""}` + `/${dataItem.id}`,
					params: { id: dataItem.id },
					query: { type: "edit" },
				});
			},
			callback() {
				if (this.$route.params !== null && this.$route.params.hasOwnProperty("data")) {
					this.$emit("onUpdate", this.$route.params.data);
				}
				this.loadTimesheet();
			},
		},
		mounted() {
			this.loadTimesheet();
		},
		watch: {
			employee() {
				if (this.employee !== undefined) {
					this.loadTimesheet();
				}
			},
		},
	};
</script>
<style scoped>

</style>
