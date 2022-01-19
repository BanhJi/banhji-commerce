<template>
	<v-row>
		<v-col sm="12" cols="12" class="pb-0">
			<v-tabs
				vertical
				class="tab_setting"
				slider-color="grayBg"
				slider-size="7"
				:class="{
					tab_product_service_hide: isHide,
					tab_product_service_show: !isHide,
				}">
			<span class="hideAbs">
				<v-icon size="16" class="arr_icon" @click="hideTabs" v-if="!isHide">mdi-chevron-left-circle</v-icon>
				<v-icon size="16" class="arr_icon1" @click="hideTabs" v-if="isHide">mdi-chevron-right-circle</v-icon>
			</span>
			<v-tab>
				<span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
				<span class="hidden-sm-and-down text-capitalize text-left">{{ $t("employee_center") }}</span>
			</v-tab>
			<v-tab>
				<span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
				<span class="hidden-sm-and-down text-capitalize text-left">{{ $t("employee_directory") }}</span>
			</v-tab>
			<v-tab>
				<span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
				<span class="hidden-sm-and-down text-capitalize text-left">{{ $t("employee_balance") }}</span>
			</v-tab>
			<v-tab>
				<span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
				<span class="hidden-sm-and-down text-capitalize text-left">{{ $t("fringe_benefit") }}</span>
			</v-tab>
			<v-tab>
				<span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
				<span class="hidden-sm-and-down text-capitalize text-left">{{ $t("leave") }}</span>
			</v-tab>
			<v-tab-item>
				<v-card flat>
					<v-card-text class="py-0 pr-0">
						<Employees />
					</v-card-text>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card flat>
					<v-card-text class="py-0 pr-0">
						<EmployeeDirectory />
					</v-card-text>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card flat>
					<v-card-text class="py-0 pr-0">
						<EmployeeBalance />
					</v-card-text>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card flat>
					<v-card-text class="py-0 pr-0">
						<EmployeeBenefit />
					</v-card-text>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card flat>
					<v-card-text class="py-0 pr-0">
						<EmployeeLeave />
					</v-card-text>
				</v-card>
			</v-tab-item>
			</v-tabs>
		</v-col>
	</v-row>
</template>

<script>
	export default {
		name: "Sales",
		data: () => ({
			isHide: false,
		}),
		props: {},
		methods: {
			clickMe(data) {
				// alert(data.link)
				this.$router.push(`${data.link}`);
				//this.$event.target.classList.toggle(active)
				//eslint-disable-next-line no-console
				console.log(data.link);
				//eslint-disable-next-line no-console
				//console.log(data)
			},
			hideTabs() {
				this.isHide = !this.isHide;
			},
		},
		components: {
			EmployeeDirectory: () => import("./EmployeeDirectory"),
			Employees: () => import("./Employees"),
			EmployeeBalance: () => import("./EmployeeBalance"),
			EmployeeBenefit: () => import("./EmployeeBenefits"),
			EmployeeLeave: () => import("./leave/leaves"),
		},
	};
</script>
<style scoped>
.arr_icon {
  color: #2ca01c;
}
.arr_icon1 {
  color: #4c9aff;
  color: #2ca01c;
}
.v-tab {
  justify-content: left;
}

.v-tab--active {
  background-color: rgb(255, 255, 255);
}

.tab_setting .v-tab--active {
  font-weight: 700;
  color: #000;
}

.v-tab--active {
  background-color: #ffffff !important;
  border-bottom: 4px solid #92d050;
  border-left: none;
}
.tab_product_service_show.theme--light .v-slide-group__content {
  width: 140px !important;
}

p {
  color: rgba(0, 0, 0, 0.87);
}
</style>
