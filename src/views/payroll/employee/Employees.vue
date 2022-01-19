<template>
	<v-row class="">
		<v-col sm="4" cols="12" class="pt-0 pr-3 pb-0">
			<v-card
				outlined
				dense
				color="grayBg"
				class="pa-3 no_border mb-md-4 mb-xs-0"
				height="65px">
			<div class="d-flex">
				<v-text-field
					class=""
					@change="onSearchChanged"
					v-model="search"
					outlined
					:placeholder="$t('number_or_name')"
					append-icon="search"
					clearable/>
				<v-btn icon @click="loadData">
					<v-icon>refresh</v-icon>
				</v-btn>
			</div>
			</v-card>
				<v-card
					outlined
					dense
					color="grayBg"
					class="pa-3 no_border hidden-sm-and-down">
			<!-- loading -->
			<div v-if="!isLoaded">
				<LoadingMe
				:isLoading="showLoading"
				type="loading"
				:fullPage="false"
				:myLoading="true"/>
			</div>
			<kendo-datasource
				ref="employeeDS"
				:data="employees"
				:schema="schemaDefinition"
				:sort="sort"/>
			<kendo-grid
				id="gridEmployeeCenter"
				class="grid-center"
				:change="onChanged"
				:data-source-ref="'employeeDS'"
				:selectable="true"
				:persistSelection="true"
				:noRecords="true"
				:scrollable="true"
				:height="535"
				:pageable-numeric="false"
				:pageable-previous-next="false"
				:pageable-messages-display="'Showing {2} data items'">
				<kendo-grid-column
					:field="'name'"
					:attributes="{ class: 'tb_name_td' }"
					:title="'name'"
					:hidden="true"
					:group-header-template="'#=value#'"/>
				<kendo-grid-column
					:field="'employeeId'"
					:title="'&nbsp;'"
					:template="'<span>#=employeeId# #=firstName# #=lastName#</span>'"/>
			</kendo-grid>
			</v-card>
		</v-col>
		<v-col sm="8" cols="12" class="pt-0">
			<div v-if="isLoaded">
				<LoadingMe
					:isLoading="showLoading"
					:fullPage="false"
					:myLoading="true"/>
			</div>
			<v-row>
				<v-col sm="12" cols="12" class="pt-0 pl-0">
					<v-tabs>
						<v-tab>
							<span class="hidden-sm-and-up"><v-icon left>mdi-information-variant</v-icon></span>
							<span class="hidden-sm-and-down">{{ $t("info") }}</span>
						</v-tab>
						<v-tab>
							<span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
							<span class="hidden-sm-and-down">{{ $t("txn_") }}</span>
						</v-tab>
						<v-tab>
							<span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
							<span class="hidden-sm-and-down">{{ $t("history") }}</span>
						</v-tab>
						<v-tab>
							<span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
							<span class="hidden-sm-and-down">{{ $t("timesheet") }}</span>
						</v-tab>
						<v-tab>
							<span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
							<span class="hidden-sm-and-down">{{ $t("attachments") }}</span>
						</v-tab>
						<v-tab-item>
							<v-card flat>
								<v-card-text class="pt-0">
									<Info :employee="employee" @onUpdate="callback" />
								</v-card-text>
							</v-card>
						</v-tab-item>
						<v-tab-item>
							<v-card flat>
								<v-card-text class="pt-0">
									<Transaction :employee="employee" @onUpdate="callback" />
								</v-card-text>
							</v-card>
						</v-tab-item>
						<v-tab-item>
							<v-card flat>
								<v-card-text class="pt-0">
									<Histories :employee="employee" @onUpdate="callback" />
								</v-card-text>
							</v-card>
						</v-tab-item>
						<v-tab-item>
							<v-card flat>
								<v-card-text class="pt-0">
									<Timesheet :employee="employee" @onUpdate="callback" />
								</v-card-text>
							</v-card>
						</v-tab-item>
						<v-tab-item>
							<v-card flat>
								<v-card-text class="pt-0">
									<Attachment :initAccount="attachment"/>
								</v-card-text>
							</v-card>
						</v-tab-item>
					</v-tabs>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
	import EmployeeModel from "@/scripts/model/Employee";

	const employeeModel = new EmployeeModel({});
	// const $ = require("jquery")
	import kendo from "@progress/kendo-ui";
	const employeeHandler = require("@/scripts/employeeHandler");

	export default {
		name: "EmployeeCenter",
		components: {
			LoadingMe: () => import(`@/components/Loading`),
			Info: () => import(`./Info`),
			Transaction: () => import(`./Transaction`),
			Histories: () => import(`./Histories`),
			Timesheet: () => import(`./Timesheet`),
			Attachment: () => import(`@/components/Attachment`),
		},
		data: () => ({
		showLoading: true,
		showLoading1: false,
		isLoaded: false,
		info: {},
		employees: [],
		start_date: "",
		end_date: "",
		customerTypes: [],
		mCustomerType: {},
		dateSorters: [],
		headers: [],
		customerGroups: [],
		mCustomerGroup: {},
		journal_entries: [],
		forwarded: "",
		files: "",
		search: "",
		employee: employeeModel,
		schemaDefinition: {
		model: { id: "id" },
		},
		groupDefinition: {
		field: "type",
		},
		sort: [{ field: "employeeId", dir: "desc" }],
		attachment: {}
	}),
		methods: {
			onSearchChanged() {
				this.showLoading = true;
				this.loadEmployeeCenter();
			},
			async customerInfo() {
				this.$emit("onUpdate", this.customer);
			},
			async onChanged() {
				let grid = kendo.jQuery("#gridEmployeeCenter").data("kendoGrid");
				let selectedItem = grid.dataItem(grid.select());
				this.employee = selectedItem;
				window.console.log('selectedItem', selectedItem)
				this.attachment = {
					uuid: selectedItem.id || '',
					name: selectedItem.name || ''
				}
				this.$emit("onUpdate", selectedItem);
			},
			async loadEmployeeCenter() {
				new Promise((resolve) => {
					setTimeout(() => {
						resolve("resolved");
						this.showLoading = true;
						employeeHandler
							.center(this.search)
							.then((res) => {
							this.showLoading = true;
							if (res.data.statusCode === 200) {
								this.showLoading = false;
								this.employees = res.data.data;
							}
							})
							.catch();
						{
							this.showLoading = false;
						}
					}, 300);
				});
			},
			callback() {
				if (
					this.$route.params !== null &&
					this.$route.params.hasOwnProperty("data")
				) {
					const employee = this.$route.params.data;
					const index = this.employees.findIndex((item) => {
						return employee.id === item.id;
					});
					if (index < 0) {
						this.employees.push(employee);
					} else {
						this.employees.splice(index, 1, employee);
					}
				}
			},
			async loadData(){
				await this.loadEmployeeCenter();
			}
		},
		mounted: async function() {
			await this.loadEmployeeCenter();
		},
		computed: {
			btnEnabled() {
				return !this.employee.name;
			},
		},
		watch: {
			$route: "callback",
		},
	};
</script>

<style scoped>
.dropdown_view.theme--light.v-btn.v-btn--icon {
  color: rgba(0, 0, 0, 0.54);
  padding: 0px 40px 0px 50px;
}

.v-menu__content {
  top: 595px !important;
  left: 1243px !important;
}

.v-menu__content .v-list {
  width: 120px;
}

.v-menu__content .v-list .v-list-item {
  min-height: 30px !important;
}

.v-menu__content .v-list .v-list-item .v-list-item__title {
  font-size: 12px;
}
.v-card.bg_blue {
  background-color: #009efb;
  min-height: 60px;
}

.v-card.bg_black {
  background-color: #333;
  color: #fff;
  min-height: 52px;
}

.v-card.bg_blue p.title {
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.v-card.bg_blue p {
  color: #fff;
}

.v-card.third {
  background-color: #2ca01c;
  color: #fff;
  display: grid;
  min-height: 52px;
}

.btn_edit {
  background-color: #009efb !important;
}

p.title {
  margin-bottom: 0;
  font-weight: 700;
  color: #333;
  text-align: left;
}

.v-tab--active {
  background-color: rgb(237, 241, 245);
}

.tab_txn_att .v-tab--active {
  font-weight: 700;
}

.bg_white {
  background-color: #fff;
}

.no_border .v-data-table {
  height: 470px;
  overflow-y: scroll !important;
}

.no_border.hidden-sm-and-down .v-data-table td {
  height: 40px;
}

.custom_vcard.v-card {
  overflow-wrap: initial;
}

.k-grid td.k-state-selected,
.k-grid tr.k-state-selected > td {
  background-color: rgba(67, 168, 52, 0.25);
}

.attachment_file {
  background-color: #efeded;
  border-radius: 0 !important;
}

.view_action {
  text-transform: uppercase;
}

.disabled-header.k-grid tr * {
  cursor: pointer;
}

@media (max-width: 576px) {
  .v-tab {
    min-width: auto !important;
  }
  .paddingLeft {
    margin-left: 15px;
  }
}
</style>
