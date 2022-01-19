<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="10" cols="12" class="py-0">
            <div>
              <h2 class="mb-0 font_20">{{ $t("funding_categories") }}</h2>
              <!-- <p class="mb-0">{{ $t('_type_desc') }} </p> -->
            </div>
          </v-col>
          <v-col sm="2" cols="12" class="pt-0">
            <v-dialog v-model="dialogM2" max-width="450px">
              <template v-slot:activator="{ on }">
                <v-btn
                  class="white--text float-right text-capitalize"
                  color="primary"
                  v-on="on"
                  @click="onNewClick">
                  {{ $t("create_new") }}
                </v-btn>
              </template>
              <v-card>
                <div class="modal_header">
                  <v-card-title>{{ $t("funding_categories") }}</v-card-title>
                  <v-icon @click="dialogM2 = false">close</v-icon>
                </div>
                <v-card-text class="modal_text_content">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row class="pt-3">
                      <v-col sm="12" cols="12" class="py-0">
                        <label class="label">{{ $t("name") }}</label>
                        <v-text-field
                          class="mt-1"
                          v-model="funding.name"
                          outlined
                          :rules="[(v) => !!v || $t('name_is_required')]"/>
                        <label class="label">{{ $t("description") }}</label>
                        <v-textarea
                          class="mt-1"
                          v-model="funding.description"
                          no-resize
                          height="130px"
                          outlined/>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-divider />
                <v-card-actions class="modal_footer">
                  <v-row>
                    <v-col sm="6" cols="6" class="py-0">
                      <v-btn
                        color="black"
                        outlined
                        class=" text-capitalize  black--text float-left"
                        @click="dialogM2 = false"
                        >{{ $t("cancel") }}
                      </v-btn>
                    </v-col>
                    <v-col sm="6" cols="6" class="py-0">
                      <v-btn
                        color="primary"
                        :disabled="disabled"
                        class="px-3  white--text text-capitalize float-right"
                        @click.native="onSaveClose">
                        {{ $t("save_close") }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>

          <v-col sm="12" cols="12">
            <template>
              <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true"/>
              <kendo-datasource ref="fundingDS" :data="fundings" />
              <kendo-grid
                id="gridFunding"
                class="grid-function"
                :data-source-ref="'fundingDS'"
                :sortable="false"
                :filterable="false"
                :noRecords="true"
                :editable="false"
                :scrollable-virtual="true">
                <kendo-grid-column
                  :field="'name'"
                  :title="$t('name')"
                  :template="'<span>#=name#</span>'"
                  :group-footer-template="'Total: '"
                  :width="200"
                  :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                <kendo-grid-column
                  :field="'description'"
                  :title="$t('description')"
                  :template="'<span>#=description#</span>'"
                  :width="200"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                  :title="$t('action')"                
                  :command="[
                    {iconClass: 'k-icon k-i-edit', text: $t(`edit`), click: goEdit, class: 'btn-plus'},
                    {iconClass: 'k-icon k-i-trash', text: $t(`delete`), click: goDelete, class: 'btn-plus-'}
                  ]"
                  :width="100"
                  :headerAttributes="{style: 'text-align: center; background-color: #EDF1F5'}"/>
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { dataStore } from "@/observable/store";
import kendo from "@progress/kendo-ui";
import {i18n} from '@/i18n';
const customerHandler = require("@/scripts/customerHandler");
export default {
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    dialogM2: false,
    disabled: false,
    valid: false,
    showLoading: false,
    customerTypes: [],
    receivableAcc: [],
    fundings: [],
    funding: {
      name: '',
      description: '',
      status:   1,
      deleted: 0
    }
  }),
  props: {},
  computed: {
    appType() {
      return dataStore.productType;
    },
  },
  watch: {},
  methods: {
    onNewClick(){
      this.dialogM2 = true;
    },
    goEdit(e){
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
          e.preventDefault();
          let grid = kendo.jQuery("#gridFunding").data("kendoGrid");
          let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
          this.funding = dataItem
          this.dialogM2 = true
        }, 300);
      })
    },
    goDelete(e){
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
          e.preventDefault();
          let grid = kendo.jQuery("#gridFunding").data("kendoGrid");
          let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
          if(dataItem.id !== ''){
            this.funding = {
              id:           dataItem.id,
              name:         dataItem.name || '',
              description:  dataItem.description || '',
              status:       dataItem.status || 1,
              deleted:      1
            }
            this.$swal({
              title: i18n.t('are_you_sure_you_want_to_delete_it'),
              text: i18n.t('you_wont_be_able_to_revert_this'),
              icon: "warning",
              showCancelButton: true,
              cancelButtonText: i18n.t('cancel'),
              confirmButtonColor: "#4d4848",
              cancelButtonColor: "#ED1A3A",
              confirmButtonText: i18n.t('ok'),
            }).then((result) => {
              if (result.value) {
                window.console.log(1)
                this.save()
              }
            });
          }
        }, 300);
      })
    },
    async onSaveClose() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate()
        return
      }
      this.save()
    },
    async save(){
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
          let data = {
            id:           this.funding.id || '',
            name:         this.funding.name || '',
            description:  this.funding.description || '',
            status:       this.funding.status || 1,
            deleted:      this.funding.deleted || 0

          }
          window.console.log('data', data)
          customerHandler.fundingCreate(data).then(response => {
            window.console.log('response', response)
            if (response.data.statusCode === 201) {
              this.loadFunding()
              this.close()
              this.$snotify.success('Success')
            }
          }).catch(e => {
            this.$snotify.error('Something went wrong')
            this.errors.push(e)
          })
        }, 300);
      })
    },
    async loadFunding(){
      new Promise(resolve => {
        setTimeout(() => {
              resolve('resolved');
              customerHandler.fundingGet().then(res => {
                if(res.statusCode  === 200){
                  let result = res.data
                  this.fundings = result
                }
              })
          }, 300);
      })
    },
    close() {
        this.dialogM2 = false
        this.funding = {}
    },
    clear() {
      this.funding = {}
    },
  },
  mounted: async function() {
    await this.loadFunding()
  },

  // fundingGet
};
</script>
<style scoped>
.text_tip {
  line-height: 10px !important;
}

@media (max-width: 576px) {
}
</style>
