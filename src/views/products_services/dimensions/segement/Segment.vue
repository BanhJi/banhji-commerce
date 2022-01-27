<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t("segment") }}</h2>
            <v-dialog v-model="dialogM2" max-width="380px">
              <template v-slot:activator="{ on }">
                <v-btn
                  @click="onNewClick"
                  color="primary"
                  class=" text-capitalize white--text float-right"
                  v-on="on">
                  {{ $t("create_new") }}
                </v-btn>
              </template>
              <v-card>
                <div class="modal_header">
                  <v-card-title>{{ $t("segment") }}</v-card-title>
                  <v-icon @click="dialogM2 = false">close</v-icon>
                </div>
                <v-card-text class="modal_text_content">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col sm="12" cols="12" class="">
                        <label class="label">{{ $t("segment_type") }}</label>
                        <v-select
                          class="mt-1"
                          id="acc_type_selector"
                          :items="segTypes"
                          :item-text="item =>`${item.code} - ${item.name}`"
                          :rules="[(v) => !!v || $t('field_is_required')]"
                          tage="Department"
                          v-model="segment.segType"
                          item-value="uuid"
                          outlined
                          :loading="loading"
                          return-object/>
                        <label class="label">{{ $t("segment_no") }}</label>
                        <v-text-field
                          class="mt-1"
                          outlined
                          v-model="segment.code"
                          tage="Discount Rate"
                          placeholder=""
                          :rules="[(v) => !!v || $t('segment_code_require')]"
                        />
                        <label class="label">{{ $t("segment_name") }}</label>
                        <v-text-field
                          class="mt-1"
                          outlined
                          v-model="segment.name"
                          placeholder=""
                          :rules="[(v) => !!v || $t('segment_name_require')]"
                        />
                        <label class="label">{{ $t("description") }}</label>
                        <v-textarea
                          class="mt-1"
                          no-resize
                          height="90px"
                          outlined
                          clearable
                          rows="3"
                        />
                        <!-- <label class="label">{{ $t('sub_of') }}</label>
                        <v-select class="mt-1"
                                  v-model="mSegment"
                                  :items="segments"
                                  item-value="id"
                                  :item-text="item =>`${item.code} - ${item.name}`"
                                  return-object
                                  tage="sub Of"
                                  placeholder="Sub Of"
                                  outlined="">
                        </v-select> -->
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-divider />
                <v-card-actions class="modal_footer">
                  <v-row>
                    <v-col sm="6" cols="6" class="py-0 text-left">
                      <v-btn
                        color="black"
                        outlined
                        class=" text-capitalize  black--text float-left"
                        @click="dialogM2 = false"
                        >{{ $t("cancel") }}
                      </v-btn>
                    </v-col>
                    <v-col sm="6" cols="6" class="py-0 text-right">
                      <v-btn
                        @click="onSaveClose"
                        color="primary"
                        class="px-3  white--text text-capitalize"
                        >{{ $t("save_close") }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <p class="mb-0">
              {{ $t("segment_setting_desc") }}
            </p>
          </v-col>
          <v-col sm="12" cols="12">
            <template>
              <div v-if="!isLoaded">
                <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  :myLoading="true"
                  type="loading"
                />
              </div>
              <kendo-datasource
                ref="segmentDS"
                :data="segments"
                :schema="schemaDefinition"
              />
              <kendo-grid
                id="gridSegment"
                class="grid-function"
                :data-source-ref="'segmentDS'"
                :editable="false"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'no'"
                  :title="$t('no')"
                  :template="rowNumberTmpl"
                  :width="40"
                  :column-menu="false"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;',
                    class: 'text-center',
                  }"
                  :attributes="{ style: 'text-align: center' }"
                />
                <kendo-grid-column
                  :field="'code'"
                  :title="$t('code')"
                  :width="50"
                  :template="'<span>#=code#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'name'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('name')"
                  :width="90"
                  :template="'<span>#=name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'segType'"
                  :attributes="{ class: 'tb_name_td' }"
                  :title="$t('segment_type')"
                  :width="90"
                  :template="'<span>#=segType.name || ``#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <!-- <kendo-grid-column
                    :field="'subOf'"
                    :title="$t('sub_of')"
                    :width="90"
                    :template="'<span>#=subOf.name?subOf.name:` `#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/> -->
                <kendo-grid-column
                  :field="''"
                  :title="$t('action')"
                  :width="70"
                  :command="[
                    {
                      iconClass: 'k-icon k-i-edit',
                      text: 'Edit',
                      click: goEdit,
                    },
                  ]"
                  :headerAttributes="{
                    style: 'text-align: left; background-color: #EDF1F5',
                  }"
                />
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import SegmentModel from "@/scripts/model/Segment";
import SegmentTypeModel from "@/scripts/model/SegmentType";
import kendo from "@progress/kendo-ui";

const $ = require("jquery");
const settingsHandler = require("@/scripts/settingsHandler");
const segmentModel = new SegmentModel({});

export default {
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    valid: true,
    dialogM2: false,
    showLoading: true,
    isLoaded: false,
    segments: [],
    mSegment: {},
    segment: segmentModel,
    schemaDefinition: {
      model: { id: "id" },
    },
    btnEnable: false,
    segTypes: [],
    loading: true,
    segType: {}
  }),
  mounted: async function() {
    await this.loadSegment();
  },
  methods: {
    onNewClick() {
      this.segment = {};
      this.mSegment = {};
      this.loadSegmentType()
      this.dialogM2 = true;
    },
    close() {
      this.dialogM2 = false;
    },
    goEdit(e) {
      e.preventDefault();
      this.loadSegmentType()
      let grid = kendo.jQuery("#gridSegment").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.segment = new SegmentModel(dataItem);

      // this.mSegment = new SegmentModel(this.segment.subOf);
      this.dialogM2 = true;
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.segmentDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    async loadSegmentType() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          settingsHandler
            .getSegType()
            .then((res) => {
              this.showLoading = true;
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                this.segTypes = res.data.data;
                if(this.segTypes.length > 0){
                  this.loading = false
                }
                // this.segmentList = res.data.data
              }
            })
            .catch();
          {
            this.showLoading = false;
          }
        }, 300);
      });
    },
    async loadSegment() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          settingsHandler
            .getSeg()
            .then((res) => {
              this.showLoading = true;
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                this.segments = res.data.data;
                // this.segmentList = res.data.data
              }
            })
            .catch();
          {
            this.showLoading = false;
          }
        }, 300);
      });
    },
    async onSaveClose() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let data = {
            id:       this.segment.id ? this.segment.id : "",
            name:     this.segment.name,
            code:     this.segment.code,
            subOf:    this.mSegment,
            segType:  new SegmentTypeModel(this.segment.segType),
            isSystem: this.segment.isSystem,
          };
          this.btnEnable = true;
          settingsHandler
            .createSeg(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                const res = response.data.data;
                window.console.log(1,res)
                const index = this.segments.findIndex((item) => {
                  return res.id === item.id;
                });
                if (this.segments.length === 0) {
                  this.loadSegment();
                } else {
                  if (index < 0) {
                    this.segments.push(res);
                  } else {
                    this.segments.splice(index, 1, res);
                  }
                }
                this.btnEnable = false;
                this.$snotify.success("Success");
                this.close();
              }
            })
            .catch((e) => {
              this.btnEnable = false;
              this.$snotify.error("Something went wrong");
              this.errors.push(e);
            });
        }, 300);
      });
    },
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

@media (max-width: 576px) {
}
</style>
