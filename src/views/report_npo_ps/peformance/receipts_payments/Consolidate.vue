<template>
  <v-row>
		<v-col sm="12" cols="12" class="grayBg px-6" >
			<v-card color="white" class="pa-3 no_border "  elevation="0">
        <v-row class="mt-0">
          <v-col sm="12" cols="12" class="py-0">
            <app-searchdate
              :initStartDate="startDate"
              @emitStartDate="startDate = $event"
              :initEndDate="endDate"
              @emitEndDate="endDate = $event"
            />
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col class="py-0" sm="4" cols="4">
            <label class="label">{{ $t("segment") }}</label>
            <app-segment-list-item-group
              :initSegment="selectedSegmentIds"
              @emitSegment="selectedSegmentIds = $event"
            />
          </v-col>
          <v-col sm="4" cols="4" class="py-0">
            <div class="report_expor">
              <label class="mb-1">{{ $t("reporting_language") }}:</label>
              <app-reporting-language
                :initLanguage="reportingLanguage"
                @emitLanguage="reportingLanguage = $event"
              />
            </div>
          </v-col>
          <v-col class="py-0" sm="4" cols="4">
            <v-btn class="white--text dv_mt" color="primary">
              <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" cols="12" class="custom_expansion py-0">
            <kendo-datasource
              ref="statementPLDS"
              :data="statementPLList"
              :schema="schemaDefinition"
              :sort="sortDefinition"
              :group="groupDefinition"
              :aggregate="aggregateDefinition"
            />

            <kendo-grid
              id="gridSPL"
              class="custom_grid"
              :data-source-ref="'statementPLDS'"
              :dataBound="dataBound"
              :change="onGridChanges"
              :selectable="true"
              :persistSelection="true"
              :sortable="true"
              :column-menu="true"
              :reorderable="true"
              :resizable="true"
              :noRecords="true"
              :toolbar="['excel']"
              :excel-file-name="'incomeStatement.xlsx'"
              :excel-filterable="true"
              :columns="columns"
            />
          </v-col>
        </v-row>
        <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          :myLoading="true"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script src="./scriptsPerformance.js" ></script>

<style scoped>
.reports_list {
  width: 100%;
  background-color: #fff;
  padding: 20px 20px 5px;
}
.report_filter {
  background-color: #f8f8f9;
  padding: 0 20px 5px 20px;
  position: relative;
}
.dv_mt {
  margin-top: 24px;
}
.report_export {
  position: absolute;
  top: 15px;
}
.report_total {
  padding: 12.5px;
  text-align: right;
  text-transform: uppercase;
  font-weight: 700;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
}
.custom_expansion
  .v-expansion-panel-header
  .v-expansion-panel-header__icon
  .v-icon {
  display: none !important;
}
.v-expansion-panel {
  border-bottom: 1px solid #cccccc;
  border-radius: 0;
}
.v-expansion-panel::before {
  box-shadow: none;
}
.v-expansion-panel-header {
  padding: 15px;
}
.v-expansion-panel-content__wrap {
  padding: 0 35px 10px;
}
@media (max-width: 576px) {
  .dv_mt,
  .dv_mt8 {
    margin-top: 0;
  }
  .reports_list {
    margin-top: 0;
  }
}
</style>
