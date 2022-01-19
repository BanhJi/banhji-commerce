<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="10" cols="12" class="py-0">
            <app-searchdate
                :initStartDate="startDate"
                @emitStartDate="startDate = $event"
                :initEndDate="endDate"
                @emitEndDate="endDate = $event"/>
          </v-col>

          <v-col sm="1" cols="12" class="py-0 mt-1">
            <v-btn class="btn_search" color="primary" @click="searchTransaction">
              <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
            </v-btn>
          </v-col>
        </v-row>


        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true">
            </LoadingMe>
            <kendo-datasource ref="dataSource"
                              :data="transactionList"
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
                  :field="'saleMargin'"
                  :title="$t('%_invoiced')"
                  :width="200"
                  :attributes="{style: 'text-align: right'}"
                  :template="'<span>#=kendo.toString(saleMargin, decimalFormat)#</span> %'"
                  :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
            </kendo-grid>
            <!--            <v-simple-table class="attachment_table">-->
            <!--              <template v-slot:default>-->
            <!--                <thead>-->
            <!--                <tr>-->
            <!--                  <th>{{ $t('project') }}</th>-->
            <!--                  <th>{{ $t('amount') }}</th>-->
            <!--                  <th>{{ $t('invoiced') }}</th>-->
            <!--                  <th>{{ $t('open_balance') }}</th>-->
            <!--                  <th>{{ $t('%_invoiced') }}</th>-->
            <!--                  <th>{{ $t('aging') }}</th>-->
            <!--                </tr>-->
            <!--                </thead>-->
            <!--                <tbody>-->
            <!--                <tr>-->
            <!--                  <td></td>-->
            <!--                  <td></td>-->
            <!--                  <td></td>-->
            <!--                  <td></td>-->
            <!--                  <td></td>-->
            <!--                  <td></td>-->
            <!--                </tr>-->
            <!--                </tbody>-->
            <!--              </template>-->
            <!--            </v-simple-table>-->
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import SearchDateComponent from "@/components/custom_templates/SearchDate";

const projectHandler = require("@/scripts/projectHandler")

export default {
  data: () => ({
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    showLoading: false,
    isLoaded: false,
    transactionList: [],
    group: {field: 'type'},
  }),
  components: {
    // 'app-datepicker': () => import(`@/components/custom_templates/DatePickerComponent`),
    'app-searchdate': SearchDateComponent,
    LoadingMe: () => import(`@/components/Loading`),
  },
  methods: {
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
              this.transactionList = res.data.data
            }
            this.showLoading = false
          })

        }, 10)
      })
    },
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
