<template>
  <v-row class="px-1">
    <v-col sm="12" cols="12">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
          <tr>
            <td class="text-uppercase">{{ $t('code') }}</td>
            <td class="text-left text-bold">{{ code }}</td>
          </tr>
          <tr>
            <td class="text-uppercase">{{ $t('name') }}</td>
            <td class="text-left text-bold">{{ name }}</td>
          </tr>
          <tr>
            <td class="text-uppercase">{{ $t('description') }}</td>
            <td class="text-left text-bold">{{ description }}</td>
          </tr>
          <tr>
            <td class="text-uppercase">{{ $t('status') }}</td>
            <td class="text-left text-bold">{{ status }}</td>
          </tr>
          <tr>
            <td class="text-uppercase">{{ $t('start') }}</td>
            <td class="text-left text-bold">{{ start }}</td>
          </tr>
          <tr>
            <td class="text-uppercase">{{ $t('end') }}</td>
            <td class="text-left text-bold">{{ end }}</td>
          </tr>
          <tr>
            <td class="text-uppercase">{{ $t('actual_end_date') }}</td>
            <td class="text-left text-bold">{{ actualEndDate_ }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col sm="12" cols="12" class="pt-0">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
          <tr>
            <td style="width: 50%" class="third white--text text-uppercase">{{ $t('engagement_amount') }}</td>
            <td style="width: 50%" class="third white--text text-left text-bold">{{ amount }}</td>
          </tr>
          <tr hidden>
            <td class="third white--text text-uppercase mt-5">{{ $t('invoiced') }}</td>
            <td class="third white--text text-left text-bold mt-5"></td>
          </tr>
          <tr hidden>
            <td class="secondary white--text text-uppercase">{{ $t('cost') }}</td>
            <td class="secondary white--text text-left text-bold"></td>
          </tr>
          <tr hidden>
            <td class="secondary white--text text-uppercase">{{ $t('margin_%') }}</td>
            <td class="secondary white--text text-left text-bold"></td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col sm="12" cols="12" class="py-0">
      <v-row>
        <v-col sm="12" cols="12" class="py-0">
          <router-link
              :to="{path: 'services_project'+`/${this.project?this.project.id:''}`, query: { type: 'edit'} }">
            <v-btn
                width="200"
                color="third"
                :disabled="btnEnabled"
                class=" white--text float-right text-capitalize ml-5">
              {{ $t('edit_project_info') }}
            </v-btn>
          </router-link>
          <v-btn
              @click="showDialog"
              width="200"
              color="third"
              :disabled="btnEnabled"
              class=" white--text float-right text-capitalize">
            {{ $t('project_completion') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-dialog v-model="dialogProject" max-width="450px">
      <v-card>
        <div class="modal_header">
          <v-card-title>{{ $t('project_completion') }}</v-card-title>
          <v-icon class="btn_close" @click="dialogProject = false">close</v-icon>
        </div>
        <v-card-text class="modal_text_content">
          <v-row>
            <v-col sm="12" cols="12" class="pb-0">
              <label class="label">{{ $t('actual_end_date') }}</label>
              <app-datepicker :initialDate="actualEndDate"
                              @emitDate="actualEndDate = $event"/>
            </v-col>
          </v-row>
          <v-btn color="primary" @click="saveClose"
                 class="float-right white--text text-capitalize ">
            {{ $t('save_close') }}
          </v-btn>
        </v-card-text>
        <v-divider/>

      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import kendo from "@progress/kendo-ui";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";

const projectHandler = require("@/scripts/projectHandler")

export default {
  name: "ProjectInformation",
  props: {
    project: {}
  },
  components: {
    'app-datepicker': DatePickerComponent,
  },
  mounted() {
  },
  computed: {
    btnEnabled() {
      return !this.project.id;
    },
    name() {
      if (this.project) {
        if (this.project.hasOwnProperty('name')) {
          return this.project.name
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    code() {
      if (this.project) {
        if (this.project.hasOwnProperty('code')) {
          return this.project.code
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    description() {
      if (this.project) {
        if (this.project.hasOwnProperty('description')) {
          return this.project.description
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    amount() {
      if (this.project) {
        if (this.project.hasOwnProperty('customers')) {
          const customer = this.project.customers
          let amount = 0
          customer.forEach(i => {
            amount += parseFloat(i.amount)
          })
          return kendo.toString(amount, this.project.decimalFormat)
        } else {
          return 0
        }
      } else {
        return 0
      }
    },
    status() {
      if (this.project) {
        let statusTex = 'Open'
        const project = this.project || {}
        const status = project.status || 0
        switch (status) {
          case 1:
            statusTex = 'Open'
            break
          case 2:
            statusTex = 'Closed'
            break
        }
        return statusTex
      }
      return ''
    },
    start() {
      if (this.project) {
        const project = this.project || {}
        const startDate = project.startDate || ''
        const dateFormat = project.dateFormat || 'dd-MM-yyyy'
        return kendo.toString(new Date(startDate), dateFormat)
      }
      return ''
    },
    end() {
      if (this.project) {
        const project = this.project || {}
        const endDate = project.endDate || ''
        const dateFormat = project.dateFormat || 'dd-MM-yyyy'
        return kendo.toString(new Date(endDate), dateFormat)
      }
      return ''
    },
    actualEndDate_() {
      if (this.project) {
        const project = this.project || {}
        const endDate = project.actualEndDate || ''
        const dateFormat = project.dateFormat || 'dd-MM-yyyy'
        if (endDate) {
          return kendo.toString(new Date(endDate), dateFormat)
        }
      }
      return '-'
    },
  },
  data: () => ({
    dialogProject: false,
    actualEndDate: new Date().toISOString().substr(0, 10),
  }),
  watch: {
    // '$route': 'callback'
    // '$route': 'callback'
  },
  methods: {
    async saveClose() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved')
          if (this.project) {
            const proj = this.project || {}
            const proId = proj.id || ''
            if (proId !== '') {
              this.showLoading = true
              let data = {
                id: this.project.id || '',
                actualEndDate: this.actualEndDate,
                status: 2, //complete

              }
              projectHandler.projectCompletion(data).then(res => {
                if (res.data.statusCode === 201) {
                  const response = res.data.data
                  this.project.actualEndDate = response.actualEndDate
                }
                this.showLoading = false
                this.dialogProject = false
              })
            }
          }
        }, 10)
      })
    },
    showDialog() {
      this.dialogProject = true
    },
    onUpdate() {
      this.$emit('onUpdate', this.project ? this.project : {})
    },
    callback() {
      if (this.$route.params !== null && this.$route.params.hasOwnProperty('data')) {
        // this.service = this.$route.params.data
        this.$emit('onUpdate', this.$route.params.data)
      }
      // window.console.log('im changed', this.service)
    }
  }
}
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: #4d4848 !important;
}

.theme--light.v-data-table {
  background-color: transparent !important;
  border-top: thin solid #ddd;
  border-bottom: thin solid #ddd;
  border-radius: 0 !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid #ddd;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
}

.v-application .third,
.v-application .secondary {
  border-color: #fff !important;
}
</style>
