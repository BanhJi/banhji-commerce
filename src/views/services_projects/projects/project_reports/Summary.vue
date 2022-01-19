<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="6" cols="12" class="pt-0">
            <!-- <h3 class="mb-3 float-left  font_22">
                {{ $t("variance_report") }}
            </h3> -->
            <p class="mb-0 float-left">
              {{ $t("projects_reports_desc") }}
            </p>
          </v-col>
          <v-col sm="6" cols="12" class="pt-0">
            <v-btn to="services_project" color="primary"
                   class="  white--text float-right text-capitalize">
              {{ $t('create_new') }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="9" cols="12" class="py-0">
            <app-searchdate
                :initStartDate="startDate"
                @emitStartDate="startDate = $event"
                :initEndDate="endDate"
                @emitEndDate="endDate = $event"/>
          </v-col>

          <v-col sm="1" cols="12" class="py-0 mt-1">
            <v-btn class="btn_search" color="primary"
                   @click="searchTransaction">
              <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
            </v-btn>
          </v-col>
          <!-- <v-col sm="2" cols="12" class="py-0 text-right">
              <v-btn icon color="black" class="bg-none float-right ">
                  <v-icon class="font_34">fa fa-file-excel</v-icon>
              </v-btn>

              <v-btn icon color="black" class="bg-none float-right ml-2">
                  <v-icon class="font_34">fa fa-print</v-icon>
              </v-btn>
          </v-col> -->
        </v-row>
        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <div class="reports_table">
              <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  type="loading"
                  :myLoading="true">
              </LoadingMe>
              <kendo-datasource ref="dataSource"
                                :data="projects"
                                :server-paging="false"/>
              <kendo-grid id="grid"
                          class="grid-function"
                          :data-source-ref="'dataSource'"
                          :style="{width: '100%'}"
                          :noRecords="true"
                          :column-menu="true"
                          :pageable-messages-display="'Showing {2} data items'"
                          :scrollable-virtual="true">

                <kendo-grid-column
                    :field="'project'"
                    :title="$t('project')"
                    :width="200"
                    :template="'<span>#=project#</span>'"
                    :groupHeaderColumnTemplate="'#=value#'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'noOfCustomer'"
                    :title="$t('customer')"
                    :width="140"
                    :template="'<span>#=noOfCustomer#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'soAmount'"
                    :title="$t('total_amount')"
                    :attributes="{style: 'text-align: right'}"
                    :template="'<span>#=kendo.toString(soAmount, decimalFormat)#</span>'"
                    :width="200"
                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                <kendo-grid-column
                    :field="'saleAmount'"
                    :title="$t('invoice_amount')"
                    :width="200"
                    :attributes="{style: 'text-align: right'}"
                    :template="'<span>#=kendo.toString(saleAmount, decimalFormat)#</span>'"
                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                <kendo-grid-column
                    :field="'vendorAmount'"
                    :title="$t('expense_amount')"
                    :width="200"
                    :attributes="{style: 'text-align: right'}"
                    :template="'<span>#=kendo.toString(vendorAmount, decimalFormat)#</span>'"
                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                <kendo-grid-column
                    :field="'margin'"
                    :title="$t('margin')"
                    :width="140"
                    :attributes="{style: 'text-align: right'}"
                    :template="'<span>#=kendo.toString(margin, decimalFormat)#</span> %'"
                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                <kendo-grid-column
                    :field="'completionRatio'"
                    :title="$t('completion_ratio')"
                    :width="200"
                    :attributes="{style: 'text-align: right'}"
                    :template="'<span>#=kendo.toString(completionRatio, decimalFormat)#</span> %'"
                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                <kendo-grid-column
                    :field="'status'"
                    :title="$t('status')"
                    :width="140"
                    :attributes="{style: 'text-align: left'}"
                    :template="status"
                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
              </kendo-grid>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import SearchDateComponent from '@/components/custom_templates/SearchDate'

const projectHandler = require("@/scripts/projectHandler")

export default {
  data: () => ({
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    showLoading: false,
    projects: [],
    isLoaded: false,

  }),
  components: {
    'app-searchdate': SearchDateComponent,
    LoadingMe: () => import(`@/components/Loading`),
  },
  methods: {
    status(dataItem) {
      const status = dataItem.status || ''
      let statusText = ''
      switch (status) {
        case 1:
          statusText = 'Open'
          break
        case 2:
          statusText = 'Closed'
          break
      }
      return statusText
    },
    async searchTransaction() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved')
          this.showLoading = true
          const startDate = this.startDate
          const endDate = this.endDate
          let strFilter = '?start=' + startDate + '&end=' + endDate
          projectHandler.projectReportSummary(strFilter).then(res => {
            if (res.data.statusCode === 200) {
              this.projects = res.data.data
            }
            this.showLoading = false
          })

        }, 10)
      })
    },
    // async onloadProject() {
    //   await projectHandler.list().then(res => {
    //     this.projects = res.data.data
    //     this.showLoading = false
    //     window.console.log(this.projects)
    //   })
    // },
  },
  async mounted() {
    // await this.onloadProject()
  },
  computed: {},
};
</script>
<style scoped>
.k-chart {
  height: 180px;
}

.theme--light.v-data-table {
  background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
  border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}
</style>
