<template>
  <v-row class="">
    <v-col sm="4" class="py-0 pr-2" cols="12">
      <v-card outlined dense class="pa-3 no_border mb-4 hide_form_alert" color="grayBg" height="70px">
        <div class="d-flex">
          <v-text-field class=""
                      v-model="search"
                      outlined
                      @change="onloadProject"
                      :placeholder="$t('search')"
                      append-icon="search"
                      clearable/>
            <v-btn icon @click="loadData">
              <v-icon>refresh</v-icon>
            </v-btn>
        </div>
      </v-card>
      <v-card outlined dense class="pa-3 no_border hidden-sm-and-down" color="grayBg">
        <LoadingMe
            :isLoading="showLoading"
            type="loading"
            :fullPage="false"
            :myLoading="true"/>
        <kendo-datasource ref="projectDS"
                          :schema="schemaDefinition"
                          :data="projects"/>

        <kendo-grid id="gridProjects" class="grid-center center_heigth"
                    :change="onChanged"
                    :data-source-ref="'projectDS'"
                    :selectable="true"
                    :persistSelection="true"
                    :noRecords="true"
                    :scrollable="true"
                    :height="535"
                    :pageable-numeric="false"
                    :pageable-previous-next="false"
                    :pageable-messages-display="'Showing {2} data items'">
          <kendo-grid-column
              :field="'name'"
              :attributes="{class:'tb_name_td'}"
              :title="'name'"
              :hidden="true"
              :group-header-template="'#=value#'"
          />
          <kendo-grid-column
              :field="'name'"
              :title="'&nbsp;'"
              :template="'<span>#=code# - #=name#</span>'"
          />
        </kendo-grid>
      </v-card>
    </v-col>
    <v-col sm="8" cols="12" class="pl-2 py-0">

      <v-row>
        <v-col sm="12" cols="12" class="pt-0">
          <v-tabs>
            <v-tab>
              <span class="hidden-sm-and-up">
                <v-icon left>mdi-pen</v-icon>
              </span>
              <span class="hidden-sm-and-down  text-uppercase">
                {{ $t('info') }}
              </span>
            </v-tab>
            <v-tab>
              <span class="hidden-sm-and-up">
                <v-icon left>mdi-pen</v-icon>
              </span>
              <span class="hidden-sm-and-down  text-uppercase">
                {{ $t('txn') }}
              </span>
            </v-tab>

            <!--            <v-tab>-->
            <!--              <span class="hidden-sm-and-up">-->
            <!--                <v-icon left>mdi-pen</v-icon>-->
            <!--              </span>-->
            <!--              <span class="hidden-sm-and-down text-uppercase">-->
            <!--                {{ $t('resource') }}-->
            <!--              </span>-->
            <!--            </v-tab>-->
            <v-tab>
              <span class="hidden-sm-and-up">
                <v-icon left>mdi-pen</v-icon>
              </span>
              <span class="hidden-sm-and-down text-uppercase">
                {{ $t('attachments') }}
              </span>
            </v-tab>
            <!-- npo -->
            <v-btn v-if="appType == 'npo' " to="services_project" color="primary" class="text-capitalize white--text absRight">{{$t('add_project')}}</v-btn>

            <!-- Info -->
            <v-tab-item>
              <v-col sm="12" cols="12" class="pt-0 px-3">
                <v-row class="grayBg">
                  <v-col sm="12" cols="12" class="">
                    <v-card outlined color="white" class="pa-3">
                      <Info :project="project"/>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-tab-item>
            <!-- Transactions -->
            <v-tab-item>
              <v-row>
                <v-col sm="12" cols="12" class="pt-0 px-6">
                  <Transaction :id="projectId"/>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- Communication -->
            <!--            <v-tab-item>-->
            <!--              <v-row>-->
            <!--                <v-col sm="12" cols="12" class="pt-0 px-6">-->
            <!--                  <Resource/>-->
            <!--                </v-col>-->
            <!--              </v-row>-->
            <!--            </v-tab-item>-->
            <!-- Attachment -->
            <v-tab-item>
              <v-row>
                <v-col sm="12" cols="12" class="pt-0 px-6">
                  <Attachment :project="project"/>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
import {dataStore} from "@/observable/store";
const projectHandler = require("@/scripts/projectHandler")
// const $ = require("jquery")
export default {
  name: "ProjectInformation",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    // 'app-datepicker': DatePickerComponent,
    Info: () => import('./Info'),
    Transaction: () => import('./Transaction'),
    // Resource: () => import('./Resource'),
    Attachment: () => import('./Attachment')

  },
  data: () => ({
    showLoading: true,
    info: {},
    search: "",
    projectId: '',
    project: {},
    projects: [],
    schemaDefinition: {
      model: {
        id: "id",
        fields: {
          id: {editable: false}
        }
      }
    },
  }),
  methods: {
    async onloadProject() {
      let strFilter = ''
      this.showLoading = true;
      if (this.search !== '') {
        strFilter = '?search=' + this.search
        await projectHandler.list(strFilter).then(res => {
          this.projects = res.data.data
          this.showLoading = false
        })
      } else {
        await projectHandler.list().then(res => {
          this.projects = res.data.data
          this.showLoading = false
        })
      }

    },
    async onChanged() {
      let grid = kendo.jQuery("#gridProjects").data("kendoGrid")
      let selectedItem = grid.dataItem(grid.select())
      if (selectedItem) {
        this.project = selectedItem
        this.projectId = selectedItem.id || ''
        this.$emit('onUpdate', selectedItem)
      }

    },
    async customerInfo() {
    },
    // callback() {
    //   if (this.$route.params !== null && this.$route.params.hasOwnProperty('data')) {
    //     const project = this.$route.params.data
    //     const index = this.projects.findIndex(item => {
    //       return (project.id === item.id)
    //     })
    //     if (index < 0) {
    //       this.projects.push(project)
    //     } else {
    //       this.projects.splice(index, 1, project)
    //     }
    //   }
    //   // window.console.log('im changed', this.$route.params)
    // }
    async loadData(){
      await this.onloadProject()
    }
  },
  async mounted() {
    await this.onloadProject()
  },
  computed: {
    appType(){
       return dataStore.productType
    }
  },
  watch: {
    // '$route': 'callback'
  },
};
</script>
<style scoped>
.grid-center.center_heigth{
  height: 526px !important;
}
.dropdown_view.theme--light.v-btn.v-btn--icon {
  color: rgba(0, 0, 0, 0.54);
  padding: 0px 40px 0px 50px;
}

.v-menu__content {
  top: 595px !important;
  left: 1243px !important;
}

.v-menu__content .v-list .v-list-item {
  min-height: 30px !important;
}

.v-menu__content .v-list .v-list-item .v-list-item__title {
  font-size: 12px;
}

.v-card {
  background-color: rgb(237, 241, 245);
}

.v-card.bg_blue {
  background-color: #92d050;
  color: #fff;
  min-height: 88px;
}

.v-card.bg_black {
  background-color: #333;
  color: #fff;
  min-height: 72px;
}

.v-card.bg_blue p.title {
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn_edit {
  background-color: #00b050 !important;
  color: #fff;
  font-size: 16px;
  height: 33px !important;
  padding: 0px 10px;

}

.v-card.bg_blue p {
  color: #FFF;
}

.v-card.third {
  background-color: #2CA01C;
  color: #FFF;
  display: grid;
  min-height: 52px;
}

p.title {
  margin-bottom: 0;
  font-weight: 700;
  color: #333;
  text-align: left;
}

.v-tab--active {
  background-color: rgb(237, 241, 245);
}

.tab_txn_att .v-tab--active {
  font-weight: 700;
}

.bg_white {
  background-color: #fff;
}

.no_border .v-data-table {
  height: 470px;
  overflow-y: scroll !important;
}

.no_border.hidden-sm-and-down .v-data-table td {
  height: 40px;
}

.custom_vcard.v-card {
  overflow-wrap: initial;
}

.k-grid td.k-state-selected, .k-grid tr.k-state-selected > td {
  background-color: rgba(67, 168, 52, 0.25);
}

.attachment_file {
  background-color: #EFEDED;
  border-radius: 0 !important;
}

.view_action {
  text-transform: uppercase;
}

.funct_3 {
  min-height: 40px;
  background-color: #00b050;
  font-weight: bold;
  color: #fff;
}

.funct_back {
  min-height: 40px;
  background-color: #181717;
  font-weight: bold;
  color: #fff;
}

.bg_blue_in {
  background-color: #92d050;
  color: #fff;
  min-height: 48px;
}

.disabled-header.k-grid tr * {
  cursor: pointer;
}

@media (max-width: 576px) {

}
</style>
