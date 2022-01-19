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
              {{ $t("list_of_budget_desc") }}
            </p>
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
          <v-col sm="4" cols="12" class="py-0">
            <label class="label">{{ $t("project") }}</label>
            <app-project-dropdownlist
              :initProject="project"
              @emitProject="project = $event"
            />
          </v-col>
          <v-col sm="2" cols="12" class="py-0">
            <v-btn
              color="primary"
              class="text-capitalize mt-7 white--text"
              @click="search"
            >
              {{ $t("view") }}
            </v-btn>
          </v-col>
          <v-col sm="2" cols="12" class="py-0">
            <v-btn
              color="primary"
              class="text-capitalize mt-7 white--text"
              to="project_budget"
            >
              {{ $t("add_new") }}
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
                  class: 'header_grid',
                }"
              />
              <kendo-grid-column
                :field="'fiscal_year.start_date'"
                :title="$t('date')"
                :template="'FY#=kendo.toString(new Date(fiscal_year.start_date), `yyyy`)#'"
                :headerAttributes="{
                  style: 'text-align: center; background-color: #EDF1F5',
                  class: 'header_grid',
                }"
                :attributes="{ style: 'text-align: center;' }"
              />
              <kendo-grid-column
                :field="'project.name'"
                :title="$t('project')"
                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                  class: 'header_grid',
                }"
              />
              <kendo-grid-column
                :command="{ text: 'Edit', click: goEdit }"
                :title="$t('action')"
                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                  class: 'header_grid',
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
import ProjectModel from "@/scripts/model/Project.js";
import BudgetModel from "@/scripts/model/Budget.js";

/* Store */
import store from "@/store";
const institute = store.state.institute.institute;

export default {
  name: "ListOfProjectBudget",
  components: {
    LoadingMe: () => import("@/components/Loading"),
    "app-project-dropdownlist": () =>
      import("@/components/dropdownlist/Project"),
    "app-fiscal-date-dropdownlist": () =>
      import("@/components/kendo_templates/FiscalDateDropDownList"),
  },
  data: () => ({
    project: null,
    fiscalDate: null,
    fiscalMonths: Helper.generateFiscalMonths(
      institute.fiscalDate[0].start_date,
      institute.fiscalDate[0].end_date,
      "12"
    ),
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

      let budgets = await this.$store.dispatch("budgets/getList"),
        projects = await this.$store.dispatch("projects/getList");

      let budgetList = [];
      budgets.forEach((value) => {
        if (value.project_uuid !== "" && value.segment_uuid === "") {
          let budget = new BudgetModel(value);
          budget.project = new ProjectModel(
            projects.find((i) => i.id === value.project_uuid)
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
    goEdit(e) {
      e.preventDefault();

      let grid = this.$refs.budgetGrid.kendoWidget(),
        dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));

      this.$router.push({
        name: "Project Budget",
        params: { initBudget: this.getBudget(dataItem.uuid) },
      });
    },
  },
  watch: {
    $route(to, from) {
      if (from.name === "Project Budget") {
        this.search();
      }
    },
  },
};
</script>

<style scoped></style>
