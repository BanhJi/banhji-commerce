<template>
  <v-data-table
    :headers="headers"
    :items="reports"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Report</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>

        <v-spacer></v-spacer>

        <div style="width: 170px">
          <app-monthof-picker
            :initMonthOf="monthOf"
            @emitMonthOf="monthOf = $event"
          />
        </div>

        <v-btn color="primary" dark class="mb-2 ml-2" @click="search">
          <i class="b-search" style="font-size: 18px; color: #fff !important" />
        </v-btn>

        <!-- Form Dialog -->
        <v-dialog v-model="dialog" max-width="500px">
          <!-- Form -->
          <v-card>
            <div class="modal_header">
              <v-card-title>{{ $t("completing_task") }}</v-card-title>
              <v-icon @click="close">close</v-icon>
            </div>
            <v-card-text class="modal_text_content">
              <v-row class="pt-2">
                <v-col sm="12" cols="12" class="py-0">
                  <label class="label">{{ $t("account") }}</label>
                  <v-text-field
                    v-model="editedItem.account.name"
                    readonly
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col sm="6" cols="12" class="py-0">
                  <label class="label">{{ $t("month_of") }}</label>
                  <app-monthof-picker
                    :initMonthOf="editedItem.monthOf"
                    @emitMonthOf="editedItem.monthOf = $event"
                  />
                </v-col>
                <v-col sm="6" cols="12" class="py-0">
                  <label class="label">{{ $t("date") }}</label>
                  <app-datepicker
                    :initialDate="editedItem.complatedAt"
                    @emitDate="editedItem.complatedAt = $event"
                  />
                </v-col>
                <v-col sm="12" cols="12" class="py-0">
                  <label class="label">{{ $t("note") }}</label>
                  <v-textarea
                    class=""
                    outlined
                    v-model="editedItem.note"
                    no-resize
                    height="110px"
                    rows="3"
                  />
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Delete Dialog -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <!-- Account Template -->
    <template v-slot:[`item.account`]="{ item }">
      {{ item.account.name }}
    </template>

    <!-- Complete Date Template -->
    <template v-slot:[`item.complatedAt`]="{ item }">
      <div v-if="item.complatedAt !== ''">
        {{ kendo.toString(new Date(item.complatedAt), "dd-MM-yyyy") }}
      </div>
    </template>

    <!-- Variant Template -->
    <template v-slot:[`item.variant`]="{ item }">
      <div v-if="item.status === ''">
        <div v-if="item.variant < 0">
          <v-chip color="red" dark>
            {{ item.variant * -1 }} days overdue
          </v-chip>
        </div>
        <div v-else>
          <v-chip color="green" dark>
            {{ item.variant }} days to reconcile
          </v-chip>
        </div>
      </div>
      <div v-else>Done</div>
    </template>

    <!-- Status Template -->
    <template v-slot:[`item.status`]="{ item }">
      <div v-if="item.status === ''">Open</div>
      <div v-else>Closed</div>
    </template>

    <!-- Edit & Delete -->
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-check </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>

    <!-- No Data -->
    <template slot="no-data">
      <LoadingMe
        :isLoading="showLoading"
        :fullPage="false"
        :myLoading="true"
        type="loading"
      />
    </template>
  </v-data-table>
</template>

<script>
import { i18n } from "@/i18n";
import Helper from "@/helper.js";
import kendo from "@progress/kendo-ui";
import ReconcileRuleReportModel from "@/scripts/model/ReconcileRuleReport";

const ReconcileRuleHandler = require("@/scripts/handler/accounting/reconcileRule");

export default {
  components: {
    LoadingMe: () => import("@/components/Loading"),
    "app-datepicker": () =>
      import("@/components/custom_templates/DatePickerComponent"),
    "app-monthof-picker": () =>
      import("@/components/kendo_templates/MonthOfPicker"),
  },
  data: () => ({
    kendo: kendo,
    monthOf: new Date().toISOString().substr(0, 7),
    showLoading: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Account",
        align: "start",
        sortable: false,
        value: "account",
      },
      { text: "Number", value: "num" },
      { text: "Type", value: "account.account_type.name" },
      { text: "Complete Date", value: "complatedAt" },
      { text: "Todo Date", value: "todo" },
      { text: "Variance", value: "variant" },
      { text: "status", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    reports: [],
    editedIndex: -1,
    editedItem: new ReconcileRuleReportModel(),
    defaultItem: new ReconcileRuleReportModel(),
  }),
  methods: {
    search() {
      // Query
      this.showLoading = true;
      ReconcileRuleHandler.getReport({
        params: {
          monthOf: this.monthOf,
        },
      })
        .then((res) => {
          if (res.data) {
            this.reports = res.data.data;
          }
        })
        .finally(() => {
          this.showLoading = false;
        });
    },
    editItem(item) {
      this.editedIndex = this.reports.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.reports.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.showLoading = true;
      ReconcileRuleHandler.deleteReport({
        data: this.editedItem,
      })
        .then(() => {
          this.$snotify.success(i18n.t("delete_successful"));
        })
        .finally(() => {
          this.showLoading = false;
        });

      this.reports.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    validateForm() {
      let valid = true;

      if (this.editedItem.complatedAt === "") {
        valid = false;

        this.$snotify.warning(i18n.t("date_is_required"));
      }

      return valid;
    },
    save() {
      if (this.validateForm()) {
        /* Date */
        this.editedItem.complatedAt = Helper.toISODate(
          this.editedItem.complatedAt
        );

        /* Status */
        this.editedItem.status = "closed";

        this.showLoading = true;
        ReconcileRuleHandler.saveReport(this.editedItem)
          .then(() => {
            this.$snotify.success(i18n.t("save_successful"));
          })
          .finally(() => {
            this.showLoading = false;
          });

        if (this.editedIndex > -1) {
          Object.assign(this.reports[this.editedIndex], this.editedItem);
        } else {
          this.reports.push(this.editedItem);
        }
        this.close();
      }
    },
  },
};
</script>
<style scoped>
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:first-child
  > td:not(.v-data-table__mobile-row) {
  border-top: 3px solid rgba(0, 0, 0, 0.12) !important;
}

.float-right {
  margin-top: 0px !important;
}

.float-left {
  margin-top: 0px !important;
}

.v-input--switch {
  margin-top: 0px;
  height: 30px;
}

.lightBlue {
  color: #68cbfb;
}
</style>