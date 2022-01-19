<template>
	<v-row>
		<v-col sm="12" cols="12" class="">
			<v-card color="white" class="no_border" elevation="0">
				<v-row>
					<v-col sm="10" cols="12" class="py-0">
						<h3 class="text-left mb-1 font_20 line_24">
							{{ $t("list_of_budget") }}
						</h3>
						<p class="mb-2">
							{{ $t("list_of_class_budget_desc") }}
						</p>
					</v-col>
					<v-col sm="2" cols="12" class="pt-0">
						<v-btn
							color="primary"
							class="text-capitalize mt-7 white--text float-right"
							to="class_budget"
						>
							{{ $t("add_new") }}
						</v-btn>
					</v-col>

				</v-row>
				<v-row class="white mt-0">
					<v-col sm="4" cols="12" class="py-0">
						<label class="label">{{ $t("fiscal_year") }}</label>
						<app-fiscal-date-dropdownlist
							:initFiscalDate="fiscalDate"
							@emitFiscalDate="fiscalDate = $event"
						/>
					</v-col>
					<v-col sm="3" cols="12" class="py-0">
						<label class="label">{{ $t("budget_type") }}</label>
						<budget-type-dropdownlist
							:initBudgetType="budgetType"
							@emitBudgetType="budgetType = $event"
							@onChanged="onBudgetTypeChanges"
						/>
					</v-col>
					<v-col sm="3" cols="12" class="py-0" v-show="budgetType === 'segment'">
						<label class="label">{{ $t("segment") }}</label>
						<app-segment-dropdownlist
							:initSegment="segment"
							@emitSegment="segment = $event"
						/>
					</v-col>
					<v-col sm="3" cols="12" class="py-0" v-show="budgetType === 'location'">
						<label class="label">{{ $t("location") }}</label>
						<app-location-dropdownlist
							:initLocation="location"
							@emitLocation="location = $event"
						/>
					</v-col>
					<v-col sm="3" cols="12" class="py-0" v-show="budgetType === 'project'">
						<label class="label">{{ $t("project") }}</label>
						<app-project-dropdownlist
							:initProject="project"
							@emitProject="project = $event"
						/>
					</v-col>
					<v-col sm="1" cols="12" class="py-0">
						<v-btn
							color="primary"
							class="text-capitalize mt-7 white--text"
							@click="search"
						>
							{{ $t("view") }}
						</v-btn>
					</v-col>

					<v-col sm="12" cols="12" class="py-0">
						<kendo-datasource
							ref="budgetDS"
							:data="budgetList"
							:sort-field="'fiscal_year.start_date'"
							:sort-dir="'desc'"
							page="1"
							page-size="10"
						/>

						<kendo-grid
							id="budgetGrid"
							ref="budgetGrid"
							:data-source-ref="'budgetDS'"
							:noRecords="true"
							:sortable="true"
							:pageable-page-sizes="true"
							:pageable-button-count="5"
						>
							<kendo-grid-column
								:field="'name'"
								:title="$t('name')"
								:headerAttributes="{
									style: 'background-color: #EDF1F5',
									class:'header_grid'
								}"
							/>
							<kendo-grid-column
								:field="'fiscal_year.start_date'"
								:title="$t('fiscal_year')"
								:template="
									'#=kendo.toString(new Date(fiscal_year.start_date), `yyyy`)#'
								"
								:headerAttributes="{
									style: 'text-align: center; background-color: #EDF1F5',
									class:'header_grid'
								}"
								:attributes="{ style: 'text-align: center;' }"
							/>
							<kendo-grid-column
								:field="'segment.name'"
								:title="$t('segment')"
								:headerAttributes="{
									style: 'background-color: #EDF1F5',
									class:'header_grid'
								}"
							/>
							<kendo-grid-column
								:field="'location.name'"
								:title="$t('business_unit')"
								:headerAttributes="{
									style: 'background-color: #EDF1F5',
									class:'header_grid'
								}"
							/>
							<kendo-grid-column
								:field="'project.name'"
								:title="$t('project')"
								:headerAttributes="{
									style: 'background-color: #EDF1F5',
									class:'header_grid'
								}"
							/>
							<kendo-grid-column
								:command="{ text: $t('edit'), click: goEdit }"
								:title="$t('action')"
								:headerAttributes="{
									style: 'background-color: #EDF1F5',
									class:'header_grid'
								}"
								:width="100"
							/>
						</kendo-grid>

						<LoadingMe
							type="loading"
							:isLoading="showLoading"
							:myLoading="true"
							:fullPage="false"
						/>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
// import {i18n} from '@/i18n'
import Helper from "@/helper.js";
/* Models */
import SegmentModel from "@/scripts/model/Segment.js";
import LocationModel from "@/scripts/model/Location.js";
import ProjectModel from "@/scripts/model/Project.js";
import BudgetModel from "@/scripts/model/Budget.js";

import { mapState } from 'vuex';

export default {
	name: "ListOfClassBudget",
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"budget-type-dropdownlist": () =>
			import("@/components/dropdownlist/BudgetType"),
		"app-segment-dropdownlist": () =>
			import("@/components/dropdownlist/Segment"),
		"app-location-dropdownlist": () =>
			import("@/components/dropdownlist/Location"),
		"app-project-dropdownlist": () =>
			import("@/components/dropdownlist/Project"),
		"app-fiscal-date-dropdownlist": () =>
			import("@/components/kendo_templates/FiscalDateDropDownList"),
	},
	data: () => ({
		budgetType: "segment",
		segment: new SegmentModel(),
		location: new LocationModel(),
		project: new ProjectModel(),
		fiscalDate: Helper.getFiscalDateByDate(new Date()),
		budgetList: [],
		// LoadingMe
		showLoading: false,
	}),
	methods: {
		// Searchs
		async search() {
			this.showLoading = true;

			// Clear
			let ds = this.$refs.budgetDS.kendoWidget();
			ds.data([]);

			await this.$store.dispatch("budgets/getList"),
			await this.$store.dispatch("segments/getList"),
			await this.$store.dispatch("locations/getList"),
			await this.$store.dispatch("projects/getList");

			let budgetList = [];
			this.budgets.forEach((value) => {
				if (value.budget_type === "class") {
					let budget = new BudgetModel(value);
					budget.segment = new SegmentModel(
						this.segments.find((i) => i.id === value.segment_uuid)
					);
					budget.location = new LocationModel(
						this.locations.find((i) => i.id === value.location_uuid)
					);
					budget.project = new ProjectModel(
						this.projects.find((i) => i.id === value.project_uuid)
					);
					budgetList.push(budget);
				}
			});

			// Filter by fiscal date
			if (this.fiscalDate !== null) {
				budgetList = budgetList.filter(
					(value) => value.fiscal_year.uuid === this.fiscalDate.uuid
				);
			}

			// Filter by segment
			if (this.segment !== null) {
				budgetList = budgetList.filter(
					(value) => value.segment_uuid === this.segment.id
				);
			}

			// Filter by project
			if (this.project !== null) {
				budgetList = budgetList.filter(
					(value) => value.project_uuid === this.project.id
				);
			}

			this.budgetList = budgetList;

			this.showLoading = false;
		},
		getBudget(id) {
			return this.budgetList.find((i) => i.uuid === id);
		},
		/* Budget Type Changes */
		onBudgetTypeChanges(){
			switch (this.budgetType) {
				case "segment":
					this.location = new LocationModel();
					this.project = new ProjectModel();
					break;

				case "location":
					this.segment = new SegmentModel();
					this.project = new ProjectModel();
					break;
			
				case "project":
					this.segment = new SegmentModel();
					this.location = new LocationModel();
					break;
			}
		},
		goEdit(e) {
			e.preventDefault();

			let grid = this.$refs.budgetGrid.kendoWidget(),
				dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));

			this.$router.push({
				name: "Class Budget",
				params: { initBudget: this.getBudget(dataItem.uuid) },
			});
		},
	},
	computed: mapState({
        budgets: state => state.budgets.list,
        segments: state => state.segments.list,
		locations: state => state.locations.list,
		projects: state => state.projects.list,
    }),
};
</script>

<style scoped></style>
