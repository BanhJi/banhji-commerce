<template>
 <v-row class="">
    <v-container class="px-0 pt-4 body-app" >
      <v-col cols="12" class="pt-0">
        <v-card outlined dense color="white" class=" no_border" elevation="0" height="680" style="overflow-y: auto;">
         
            <div class="modal_header">
                <v-card-title>{{ $t("session") }}</v-card-title>
                <v-icon
                    @click="close()"
                    style="cursor: pointer; font-size: 30px;"
                    color="grey"
                    class="float-right mt-n1">close
                </v-icon>
            </div>
            <v-col sm="12" cols="12" class="mb-4">
              <v-dialog v-model="dialogM3" max-width="350px">
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="primary"
                    class=" white--text float-right text-capitalize"
                    v-on="on"
                  >
                    {{ $t("new_session") }}
                  </v-btn>
                </template>
                <v-card>
                  <div class="modal_header">
                    <v-card-title>{{ $t("session") }}</v-card-title>
                    <v-icon @click="dialogM3 = false">close</v-icon>
                  </div>

                  <v-card-text class="modal_text_content">
                    <v-row>
                      <v-col sm="12" cols="12" class="pb-0">

                        <label>{{ $t("number") }}</label>
                        <v-text-field
                          class="mt-1"
                          outlined
                          clearable
                        />
                      </v-col>
                      <v-col sm="12" cols="12" class="py-0">
                        <label class="label">{{ $t("start_date") }}</label>
                        <app-datepicker :initialDate="startDate" @emitDate="startDate = $event" v-model="startDate"/>
                      </v-col>

                      <v-col sm="12" cols="12" class="pb-0">

                        <label>{{ $t("amount") }}</label>
                        <v-text-field
                          class="mt-1"
                          outlined
                          clearable
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions class="modal_footer">
                    <v-row>
                      <v-col sm="6" cols="6" class="py-0 text-left">
                        <v-btn
                          color="black"
                          outlined
                          class=" text-capitalize  black--text float-left"
                          @click="dialogM3 = false"
                          >{{ $t("cancel") }}
                        </v-btn>
                      </v-col>
                      <v-col sm="6" cols="6" class="py-0 text-right">
                        <v-btn
                          color="primary"
                          class="px-3  white--text text-capitalize"
                           @click="dialogM3 = false"
                        >
                          {{ $t("save_close") }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
            <v-col sm="12" cols="12">
              <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true"
              />
              <template>
                <kendo-datasource
                  ref="gridSaleUnitItemDS"
                />
                <kendo-grid
                  id="gridSaleUnitItem"
                  class="grid-function"
                  :data-source-ref="'gridSaleUnitItemDS'"
                  :editable="false"

                  :excel-file-name="$t('session')+'.xlsx'"
                  :excel-filterable="true"
                  :excel-all-pages="true"
                  :toolbar="['excel']"
                  :scrollable-virtual="true"
                >
                  <kendo-grid-column
                    :field="'no'"
                    :title="$t('no')"
                    :width="80"
                    :column-menu="false"
                    :headerAttributes="{
                      style: 'background-color: #EDF1F5;',
                      class: 'text-center',
                    }"
                    :attributes="{ style: 'text-align: center' }"
                  />
                  <kendo-grid-column
                    :field="'number'"
                    :title="$t('number')"
                    :width="80"
                    :template="'<span>#=code#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'start'"
                    :attributes="{ class: 'tb_name_td' }"
                    :title="$t('start')"
                    :width="100"
                    :template="'<span>#=name#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="'end'"
                    :title="$t('end')"
                    :width="100"
                    :template="'<span>#=category.name#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                  />
                  <kendo-grid-column
                    :field="''"
                    :title="$t('action')"
                    :width="70"
                    :command="[
                      {
                        iconClass: 'k-icon k-i-edit',
                        text: 'Edit',
                      },
                    ]"
                    :headerAttributes="{
                      style: 'text-align: right; background-color: #EDF1F5',
                    }"
                  />
                </kendo-grid>
              </template>
            </v-col>
        </v-card>
      </v-col>
    </v-container>
  </v-row>
</template>
<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'


const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();

import JSZip from "jszip";

window.JSZip = JSZip;

export default {
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    'app-datepicker': DatePickerComponent,
  },
  data: () => ({
    startDate: "",
    showLoading: false,
    dialogM3: false,
    dialogM2: false,
    schemaDefinition: {
      model: {
        id: "id",
      },
    },
    loggedUser: {
      id: cookie.creator,
      name: cookie.email,
    },
    valid: false,
  }),
  methods: {
    initialData(){
      this.startDate = this.initStartDate;
    },
    emitStartDate() {
      this.$emit('emitStartDate', this.startDate)
    },
   
    cancel() {
      this.dialogM3 = false;
    },
    close() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
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
@media (min-width: 1264px){
  .body-app {
    max-width: 1110px;
    }
  }
@media (min-width: 1904px){
      .body-app {
          max-width: 1440px;
      }
  }

@media (max-width: 576px) {
}
</style>
