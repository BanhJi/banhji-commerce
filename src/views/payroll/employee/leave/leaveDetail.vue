<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg pl-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row class="">
          <v-col sm="4" cols="12" class="py-0">
            <v-text-field
              class="mt-1"
              clearable
              :placeholder="$t('search_directory')"
              outlined
              v-model="search"
            />
          </v-col>
          <v-col sm="2" cols="12" class="py-1">
            <v-btn
              color="primary"
              class="white--text capitalize marginTopPhone"
              @click="onSearch"
            >
              {{ $t("search") }}
            </v-btn>
          </v-col>
          <v-col sm="12" cols="12" class="py-0">
            <kendo-datasource
              ref="dataSource"
              :data="leaves"
              :page-size="100"
              :sort="sort"
              :group="group"
            />
            <kendo-grid
              id="grid"
              class="grid-function"
              :data-source-ref="'dataSource'"
              :scrollable-virtual="true"
              :column-menu="false"
              :pageable="true"
            >
              <kendo-grid-column
                :field="'employeeId'"
                :title="$t('employee_id')"
                :width="100"
                :template="'<span>#= employee.employeeId#</span>'"
                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                :group-footer-template="'Count: #=count#'"
              />
              <kendo-grid-column
                :field="'employee'"
                :title="$t('employee')"
                :width="150"
                :template="
                  '<span>#= employee.firstName# - #= employee.lastName#</span>'
                "
                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
              />
              <kendo-grid-column
                :field="'dateFormate'"
                :title="$t('date')"
                :width="100"
                :template="
                  '<span>#= kendo.toString(new Date(dateFormate),`dd-MM-yyyy`)#</span>'
                "
                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
              />
              <kendo-grid-column
                :field="'leave'"
                :title="$t('leave_type')"
                :width="100"
                :template="
                  '<span>#= leave.leaveName ? leave.leaveName: ``#</span>'
                "
                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
              />
              <kendo-grid-column
                :field="'leaveAnount'"
                :title="$t('leave')"
                :width="50"
                :attributes="{
                  style: 'text-align: center;',
                }"
                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                :group-footer-template="'Sum: #=sum#'"
              />
            </kendo-grid>
            <LoadingMe
              :isLoading="showLoading"
              :fullPage="true"
              :myLoading="true"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
const employeeHandler = require("@/scripts/employeeHandler");
import kendo from "@progress/kendo-ui";
export default {
  data: () => ({
    showLoading: false,
    start_date: "",
    end_date: "",
    recordList: [],
    take: 10,
    sort: [{ field: "employeeId", dir: "asc" }],
    group: [
      {
        field: "employeeId",
        aggregates: [
          { field: "employeeId", aggregate: "count" },
          { field: "leaveAnount", aggregate: "sum" },
        ],
      },
    ],
    search: "",
    leaves: [],
    params: {},
  }),
  props: {},
  methods: {
    async loadRecord() {
      let getYear = new Date();
      this.params = {
        year: getYear.getFullYear(),
      };
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          employeeHandler
            .getEmployeeLeave(this.search, this.params)
            .then((res) => {
              window.console.log(1, res);
              this.showLoading = true;
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                this.leaves = res.data.data;
                window.console.log(2, this.leaves);
              }
            });
        }, 300);
      });
    },
    goView(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#grid").data("kendoGrid");
      let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
      window.console.log(dataItem);
      this.$router.push({
        path:
          "employment_history" + `/${dataItem.employee.id}` + `/${dataItem.id}`,
        params: { id: dataItem.id },
        query: { type: "edit" },
      });
    },
    onSearch() {
      this.showLoading = true;
      this.loadRecord();
    },
  },
  async mounted() {
    await this.loadRecord();
  },
  computed: {},
  components: {
    LoadingMe: LoadingMe,
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

@media (max-width: 576px) {
  .marginTopPhone {
    margin-top: -10px;
  }
}
</style>
