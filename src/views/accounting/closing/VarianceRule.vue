<template>
  <v-row>
    <v-col cols="12" sm="12" class="pt-3">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col sm="6" class="py-0">
            <h2 class="mb-3 font_20 float-left">
              {{ $t("variance_rule") }}
            </h2>
            <!-- <p class="mb-0 float-left">
                            {{ $t("variance_report_desc") }}
                        </p> -->
          </v-col>
          <v-col sm="6" class="py-0">
            <v-btn
              @click="showDialog = true"
              color="primary"
              class="white--text float-right text-capitalize"
            >
              {{ $t("new_variance_rule") }}
            </v-btn>
          </v-col>
          <v-col sm="12" cols="12" class="pb-0">
            <template>
              <v-data-table
                :headers="headers"
                :items="varianceRules"
                :items-per-page="50"
                sort-by="name"
                class="attachment_table elevation-1"
              >
                <template v-slot:[`item.value`]="{ item }">
                  {{ Number(item.value).toLocaleString() }}
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="deleteItem(item)">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </template>
          </v-col>
        </v-row>
        <v-dialog v-model="showDialog" max-width="550px">
          <v-card>
            <div class="modal_header">
              <v-card-title>{{ $t("variance_rule") }}</v-card-title>
              <v-icon @click="close()">close</v-icon>
            </div>
            <v-card-text class="modal_text_content">
              <v-row>
                <v-col sm="12" cols="12" class="pb-0">
                  <label class="label">{{ $t("name") }}*</label>
                  <v-text-field
                    class=""
                    outlined
                    placeholder="Name"
                    v-model="varianceRule.name"
                    :rules="[(v) => !!v || $t('name_is_required')]"
                  />
                </v-col>
                <v-col sm="6" cols="12" class="py-0">
                  <label class="label">{{ $t("rule") }}*</label>
                  <v-select
                    class=""
                    :items="rules"
                    item-value="value"
                    item-text="text"
                    v-model="varianceRule.rule"
                    :rules="[(v) => !!v || $t('is_required')]"
                    outlined
                  />
                </v-col>
                <v-col sm="6" cols="12" class="py-0">
                  <label class="label">{{ $t("rule_value") }}*</label>
                  <v-text-field
                    class=""
                    outlined
                    type="number"
                    placeholder="Value"
                    v-model="varianceRule.value"
                    :rules="[(v) => !!v || $t('is_required')]"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="modal_footer d-flex justify-space-between">
              <v-btn outlined color="primary" class="black--text capitalize" @click="cancel">
                {{ $t("cancel") }}
              </v-btn>
              <v-btn class="btn_save_new" @click="onSaveClick">
                {{ $t("save") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <LoadingMe
          :isLoading="showLoading"
          :fullPage="true"
          :myLoading="true"
          :alertMessage="loadingAlert"
          :color="loadingColorAlert"
          :alertText="loadingTextAlert"
        />
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
import { i18n } from "@/i18n";
// import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import { VarianceRuleModel } from "@/scripts/model/AppModels";

const { varianceRuleHandler } = require("@/scripts/AppHandlers");
const { VarianceRule } = require("@/scripts/default_setup/Collections");

export default {
  components: {
    LoadingMe: () => import("@/components/Loading"),
  },
  data: () => ({
    // Obj
    varianceRule: new VarianceRuleModel(),
    showDialog: false,
    rules: VarianceRule,
    headers: [
      { text: i18n.t("name"), value: "name" },
      { text: i18n.t("value"), value: "value" },
      { text: i18n.t("rule"), value: "rule" },
      { text: i18n.t("action"), value: "actions", sortable: false },
    ],
    varianceRules: [],
    // Form validation
    valid: true,
    editedIndex: -1,
    // LoadingMe
    showLoading: false,
    loadingAlert: false,
    loadingColorAlert: "",
    loadingTextAlert: "",
  }),
  methods: {
    editItem(item) {
      this.editedIndex = this.varianceRules.indexOf(item);
      this.varianceRule = Object.assign({}, item);
      this.showDialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.varianceRules.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.varianceRules.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, new VarianceRuleModel());
        this.editedIndex = -1;
      });
    },
    // All Saves
    onSaveClick() {
      if (this.$refs.form.validate()) {
        this.save();
      }
    },
    cancel() {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4d4848",
        cancelButtonColor: "#ED1A3A",
        confirmButtonText: "Yes, discard it!",
      }).then((result) => {
        if (result.value) {
          this.clear();
        }
      });
    },
    clear() {
      // Reset Form
      // this.$refs.form.reset();
      this.editedIndex = -1;
      this.varianceRule = new VarianceRuleModel();
      this.showDialog = false;
    },
    close(){
      this.clear()
    },
    save() {
      let self = this;

      this.showLoading = true;
      // Sync Data
      varianceRuleHandler
        .save(this.varianceRule)
        .then((response) => {
          if (response) {
            if (this.editedIndex > -1) {
              Object.assign(
                this.varianceRules[this.editedIndex],
                this.varianceRule
              );
            } else {
              this.varianceRules.push(new VarianceRuleModel(response.data));
            }
            self.responseStatus(response.status);
          }
        })
        .catch((error) => {
          Helper.alertErrorMsg(error);
        })
        .finally(() => {
          this.showLoading = false;
        });
    },
    // Response Status
    responseStatus(status) {
      switch (status) {
        case 200: // Ok
          this.showAlert();

          break;
        case 201: // Duplicate
          Helper.alertErrorMsg("Duplicate entry!");
          break;
        default:
          break;
      }
    },
    // Sweetalert2
    changeAlertStatus() {
      this.loadingAlert = true;
      setTimeout(() => {
        this.loadingAlert = false;
      }, 6200);
    },
    showAlert() {
      this.changeAlertStatus();
      this.loadingTextAlert = "Added Successful";
      this.loadingColorAlert = "#3DA72E";

      this.clear();
    },
  },
  created() {
    // Call Variance Rule
    varianceRuleHandler.getAll().then((res) => {
      this.varianceRules = res.data;
    });
  },
};
</script>

<style scoped>
.attachment_table.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th,
.attachment_table.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td {
  border-right: none !important;
}
</style>
