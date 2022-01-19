<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col cols="12" sm="12" class="py-0">
                    <v-row>
                        <v-col sm="11" cols="12" class="py-0">
                        <h2 class="font_20 mb-1">{{ $t("funding_categories") }}</h2>
                        </v-col>
                    </v-row>
                    <v-row class="mt-0">
                        <v-col sm="9" cols="12" class="py-0">
                        <app-searchdate
                            :initStartDate="startDate"
                            @emitStartDate="startDate = $event"
                            :initEndDate="endDate"
                            @emitEndDate="endDate = $event"
                        />
                        </v-col>
                        <v-col sm="2" cols="12" class="pt-1">
                        <v-btn class="white--text" color="primary" @click="search">{{
                            $t("run_report")
                        }}</v-btn>
                        </v-col>
                        <!-- <v-col sm="1" cols="1" class="pt-1">
                        <downloadexcel
                            icon
                            color="black"
                            class="bg-none float-right "
                            :data="journalEntries"
                            :fields="exfield"
                            type="xls"
                            worksheet="Journal"
                            name="JournalReport.xls"
                        >
                            <v-btn>Import</v-btn>
                        </downloadexcel>
                        </v-col> -->
                    </v-row>
                    <!-- loading -->
                    <LoadingMe
                        type="loading"
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"
                    />
                    <v-row>
                        <v-col sm="12" cols="12" class="pt-0">
                        <kendo-datasource
                            ref="dataSource"
                            :data="journalEntries"
                            :group="groupDefinition"
                            :aggregate="aggregateDefinition"
                            :group-paging="true"
                            :page="1"
                            :page-size="50"
                            :total="0"
                        />

                        <kendo-grid
                            class="custom_grid"
                            ref="journalReportGrid"
                            :data-source-ref="'dataSource'"
                            :groupable="true"
                            :sortable="true"
                            :filterable="true"
                            :column-menu="true"
                            :reorderable="true"
                            :resizable="true"
                            :noRecords="true"
                            :navigatable="true"
                            :pageable-always-visible="true"
                            :pageable-page-sizes="[20, 50, 100, 'all']"
                            :toolbar="['excel']"
                            :excel-file-name="'Fund Receipt Report.xlsx'"
                            :excel-filterable="true"
                            :excel-all-pages="true"
                        >
                            <kendo-grid-column
                            :field="'journal_date'"
                            :title="$t('date')"
                            :width="100"
                            :filterable="false"
                            :group-footer-template="'Total:'"
                            />
                            <kendo-grid-column
                            :field="'transaction_type'"
                            :title="$t('type')"
                            :hidden="true"
                            :template="journalTypeTemplate"
                            :filterable-multi="true"
                                :filterable-search="true"
                            :width="120"
                            />
                            <kendo-grid-column
                            :field="'journal_type'"
                            :title="$t('categories')"
                            :hidden="true"
                            :filterable-multi="true"
                                :filterable-search="true"
                            :width="120"
                            />
                            <kendo-grid-column
                            :field="'journal_number'"
                            :title="$t('txn_number')"
                            :template="journalNumberTemplate"
                            :width="120"
                            :filterable="false"
                            :hidden="true"
                            :group-header-template="'#=value#'"
                            />
                            <kendo-grid-column
                            :field="'account.account_type.name'"
                            :title="$t('account_type')"
                            :template="'<span>#=account.account_type.name#</span>'"
                            :width="140"
                            :hidden="true"
                            :filterable-multi="true"
                                :filterable-search="true"
                            />
                            <kendo-grid-column
                            :field="'account.name'"
                            :title="$t('account')"
                            :template="'<span>#=account.number# - #=account.name#</span>'"
                            :width="140"
                            :filterable="false"
                            />

                            <kendo-grid-column
                            :field="'description'"
                            :title="$t('description')"
                            :width="150"
                            :filterable="false"
                            />
                            <kendo-grid-column
                            :field="'dr'"
                            :title="$t('debit')"
                            :format="'{0:#,##0.##;(#,##0.##)}'"
                            :width="110"
                            :filterable="false"
                            :aggregates="['sum']"
                            :group-footer-template="
                                '<div style=text-align:right>#=kendo.toString(sum, `n`)#</div>'
                            "
                            :headerAttributes="{
                                style: 'text-align: right;padding-right:35px;',
                            }"
                            :attributes="{
                                style: 'text-align: right;',
                            }"
                            />
                            <kendo-grid-column
                            :field="'cr'"
                            :title="$t('credit')"
                            :format="'{0:#,##0.##;(#,##0.##)}'"
                            :width="110"
                            :filterable="false"
                            :aggregates="['sum']"
                            :group-footer-template="
                                '<div style=text-align:right>#=kendo.toString(sum, `n`)#</div>'
                            "
                            :headerAttributes="{
                                style: 'text-align: right;padding-right:35px;',
                            }"
                            :attributes="{
                                style: 'text-align: right;',
                            }"
                            />
                            <kendo-grid-column
                            :field="'name'"
                            :title="$t('name')"
                            :width="140"
                            :hidden="true"
                            :template="'<span>#=name#</span>'"
                            :filterable-multi="true"
                                :filterable-search="true"
                            :group-header-template="'#=value#'"
                            />
                             <kendo-grid-column
                            :field="'segment.name'"
                            :title="$t('segment')"
                            :width="140"
                            :hidden="true"
                            :template="'<span>#=segment.name#</span>'"
                            :filterable-multi="true"
                                :filterable-search="true"
                            />
                            <kendo-grid-column
                            :field="'location.name'"
                            :title="$t('location')"
                            :width="140"
                            :hidden="true"
                            :template="'<span>#=location.name#</span>'"
                            :filterable-multi="true"
                                :filterable-search="true"
                            />
                            <kendo-grid-column
                            :field="'project.name'"
                            :title="$t('project')"
                            :width="140"
                            :hidden="false"
                            :template="'<span>#=project.name#</span>'"
                            :filterable-multi="true"
                                :filterable-search="true"
                            />
                            <kendo-grid-column
                            :field="'class1.name'"
                            :title="$t('class_1')"
                            :width="140"
                            :hidden="true"
                            :template="'<span>#=class1.name#</span>'"
                            :filterable="false"
                            />
                            <kendo-grid-column
                            :field="'class2.name'"
                            :title="$t('class_2')"
                            :width="140"
                            :hidden="true"
                            :template="'<span>#=class2.name#</span>'"
                            :filterable="false"
                            />
                            <kendo-grid-column
                            :field="'class3.name'"
                            :title="$t('class_3')"
                            :width="140"
                            :hidden="true"
                            :template="'<span>#=class3.name#</span>'"
                            :filterable="false"
                            />
                            <kendo-grid-column
                            :field="'class4.name'"
                            :title="$t('class_4')"
                            :width="140"
                            :hidden="true"
                            :template="'<span>#=class4.name#</span>'"
                            :filterable="false"
                            />
                            <kendo-grid-column
                            :field="'class5.name'"
                            :title="$t('class_5')"
                            :width="140"
                            :hidden="true"
                            :template="'<span>#=class5.name#</span>'"
                            :filterable="false"
                            />
                            <kendo-grid-column
                            :field="'currency'"
                            :title="$t('currency')"
                            :template="'<span>#=currency.code#</span>'"
                            :width="140"
                            :hidden="true"
                            :filterable="false"
                            />
                            <kendo-grid-column
                            :field="'exchange_rate'"
                            :title="$t('exchange_rate')"
                            :width="140"
                            :filterable="false"
                            :hidden="true"
                            />
                            <kendo-grid-column
                            :field="'created_date'"
                            :title="$t('created')"
                            :width="140"
                            :hidden="true"
                            :filterable="false"
                            />
                            <kendo-grid-column
                            :field="'created_by.user_name'"
                            :title="$t('create_by')"
                            :template="'<span>#=created_by.user_name#</span>'"
                            :width="140"
                            :filterable="false"
                            :hidden="true"
                            />
                            <kendo-grid-column
                            :field="'modified_date'"
                            :title="$t('last_modified')"
                            :width="140"
                            :filterable="false"
                            :hidden="true"
                            />
                            <kendo-grid-column
                            :field="'modified_by.user_name'"
                            :title="$t('last_modified_by')"
                            :template="'<span>#=modified_by.user_name#</span>'"
                            :width="140"
                            :filterable="false"
                            :hidden="true"
                            />
                        </kendo-grid>
                        </v-col>
                    </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import {
  JournalEntryModel,
  LocationModel,
  ProjectModel,
  SegmentModel,
  ClassModel,
  UserModel,
} from "@/scripts/model/AppModels";
// import downloadexcel from "vue-json-excel";
import JSZip from "jszip";
window.JSZip = JSZip;
const {
  journalReportHandler,
  classHandler,
  locationHandler,
  projectHandler,
  segmentHandler,
} = require("@/scripts/AppHandlers");
const { EntityType } = require("@/scripts/default_setup/Collections");

export default {
  name: "FundReceiptReport",
  components: {
    LoadingMe: () => import("@/components/Loading"),
    "app-searchdate": () => import("@/components/custom_templates/SearchDate"),
    // downloadexcel: downloadexcel,
  },
  data: () => ({
    // Obj
    obj: [],
    journalEntries: [],
    startDate: "",
    endDate: "",
    // LoadingMe
    showLoading: false,
    // Kendo dataSource
    groupDefinition: [],
    aggregateDefinition: [
      { field: "dr", aggregate: "sum" },
      { field: "cr", aggregate: "sum" },
    ],
    exfield: {
      Date: "journal_date",
      Type: "transaction_type",
      "Txn Number": "journal_number",
      Description: "description",
      Account: "account.name",
      Name: "primary_contact.name",
      Location: "location.name",
      Project: "project.name",
      Segment: "segment.name",
      Class1: "class1.name",
      Class2: "class2.name",
      Class3: "class3.name",
      Class4: "class4.name",
      Class5: "class5.name",
      Currency: "currency.code",
      "Exchange Rate": "exchange_rate",
      Created: "created_date",
      "Created By": "created_by.name",
      "Last Modified": "modified_date",
      "Last Modified By": "modified_by.name",
      debit: "dr",
      credit: "cr",
    },
  }),
  methods: {
    // Journal Type Template
    journalTypeTemplate: (dataItem) => {
      // Default link is journal
      let link = "";

      // Transaction link
      if (dataItem.referral_transaction_uuid !== "") {
        return Helper.linkTemplate(
          dataItem.transaction_type,
          `${dataItem.transaction_type}/view/${dataItem.referral_transaction_uuid}`
        );
      } else {
        if (dataItem.transaction_type.toLowerCase() !== EntityType.JOURNAL) {
          link = Helper.linkTemplate(
            dataItem.transaction_type,
            `${dataItem.transaction_type}/view/${dataItem.journal_uuid}`
          );
        } else {
          link = Helper.linkTemplate(
            dataItem.transaction_type,
            `${EntityType.JOURNAL}/view/${dataItem.journal_uuid}`
          );
        }
      }

      return link;
    },
    // Journal Number Template
    journalNumberTemplate: (dataItem) => {
      // Default link is journal
      let link = Helper.linkTemplate(
        dataItem.journal_number,
        `${EntityType.JOURNAL}/view/${dataItem.journal_uuid}`
      );

      // Transaction link
      if (dataItem.referral_transaction_uuid !== "") {
        return Helper.linkTemplate(
          dataItem.journal_number,
          `${dataItem.transaction_type}/view/${dataItem.referral_transaction_uuid}`
        );
      }

      return link;
    },
    // Search journals
    search() {
      let sdate = this.startDate,
        edate = this.endDate;

      if (sdate && edate) {
        sdate =
          kendo.toString(new Date(sdate), "yyyy-MM-dd") + "T00:00:00.000Z";

        edate = new Date(edate);
        edate = kendo.toString(edate, "yyyy-MM-dd") + "T23:59:59.999Z";
      } else {
        sdate = 0;
        edate = 0;
      }

      // Empty dataSource
      let ds = this.$refs.dataSource.kendoWidget();
      ds.data([]);

      // Query
      this.showLoading = true;
      journalReportHandler
        .getJournalReport({
          params: {
            start_date: sdate,
            end_date: edate,
          },
        })
        .then((res) => {
          if (res.data) {
            // Bind obj
            this.obj = res.data;
            this.bindData();
          }
        })
        .finally(() => {
          this.showLoading = false;
        });
    },
    //Bind Data
    async bindData() {
      let entries = [],
        location = await locationHandler.getAll(),
        project = await projectHandler.getAll(),
        segment = await segmentHandler.getAll(),
        clazz = await classHandler.getAll();

      this.obj.reportLines.forEach((element) => {
        if (
          element.transaction_type.toLowerCase() === EntityType.FUND_RECEIPT
        ) {
          /* Filter only Fund Receipt */
          element.journal_entries.forEach((value) => {
            let je = new JournalEntryModel(value);

            if (value.exchanged_amount > 0) {
              je.dr = value.exchanged_amount;
              je.cr = 0;
            } else {
              je.dr = 0;
              je.cr = Math.abs(value.exchanged_amount);
            }

            // Journal
            je.journal_uuid = element.uuid;
            je.journal_type = element.journal_type;
            je.transaction_type = element.transaction_type;
            je.journal_date = Helper.dateFormat(element.journal_date);
            je.journal_number = element.number;
            je.created_by = element.created_by;
            je.modified_by = element.modified_by;
            je.referral_transaction_uuid =
              value.journal.referral_transaction_uuid;

            // Name
            je.name = value.primary_contact.name;

            // Location
            je.location = new LocationModel(
              location.data.data.find(
                (item) => item.id === element.location_uuid
              )
            );

            // Project
            je.project = new ProjectModel(
              project.data.data.find((item) => item.id === element.project_uuid)
            );

            // Segment
            je.segment = new SegmentModel(
              segment.data.data.find((item) => item.id === element.segment_uuid)
            );

            // Classes
            je.class1 = new ClassModel(
              clazz.data.data.find((item) => item.id === value.class_1_uuid)
            );
            je.class2 = new ClassModel(
              clazz.data.data.find((item) => item.id === value.class_2_uuid)
            );
            je.class3 = new ClassModel(
              clazz.data.data.find((item) => item.id === value.class_3_uuid)
            );
            je.class4 = new ClassModel(
              clazz.data.data.find((item) => item.id === value.class_4_uuid)
            );
            je.class5 = new ClassModel(
              clazz.data.data.find((item) => item.id === value.class_5_uuid)
            );

            // Created Date
            je.created_date = Helper.dateFormat(element.created_date);

            // Created By
            if (je.created_by === null) {
              je.created_by = new UserModel();
            } else {
              je.created_by = new UserModel(je.created_by);
            }

            // Modified By
            if (je.modified_by === null) {
              je.modified_by = new UserModel();
            } else {
              je.modified_by = new UserModel(je.modified_by);
            }

            entries.push(je);
          });
        }
      });

      // Bind entries
      this.journalEntries = entries;
    },
    // Generate Group By
    generateGroupBy() {
      this.groupDefinition = [
        {
          field: "journal_type",
          aggregates: this.aggregateDefinition,
          compare: function(a, b) {
            if (a.items[0].name === b.items[0].name) {
              return 0;
            } else if (a.items[0].name > b.items[0].name) {
              return 1;
            } else {
              return -1;
            }
          },
        },
        {
          field: "journal_number",
          aggregates: this.aggregateDefinition,
          compare: function(a, b) {
            if (a.items[0].journal_number === b.items[0].journal_number) {
              return 0;
            } else if (a.items[0].journal_number > b.items[0].journal_number) {
              return 1;
            } else {
              return -1;
            }
          },
        },
      ];
    },
  },
  mounted() {
    // Initial Grid Group By
    this.generateGroupBy();
  },
};
</script>

<style scoped>
.reports_list {
  position: relative;
  width: 100%;
  background-color: #fff;
  padding: 20px 20px 5px;
}

.report_filter {
  background-color: #f8f8f9;
  padding: 0 20px 5px 20px;
}

.dv_mt {
  margin-top: 20px;
}

.report_block .v-card.third {
  border: none;
  box-shadow: none;
  background-color: #2ca01c;
  color: #fff;
  text-transform: uppercase;
  min-height: 120px;
}

.report_block .v-card.third p.text {
  text-align: left;
  font-size: 16px;
}

.report_block .v-card.third p.number {
  text-align: center;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 0;
  padding-top: 15px;
}

.report_block .v-card.bg_gray {
  background-color: #f8f8f9;
  border: none;
  box-shadow: none;
  color: #000;
  float: left;
  width: 100%;
}

.report_block .v-card.bg_gray p span.text {
  width: 25%;
}

.report_block .v-card.bg_gray p span.number {
  width: 70%;
  font-size: 19px;
  font-weight: 700;
  padding: 7px 0 0 0;
  text-align: right;
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
