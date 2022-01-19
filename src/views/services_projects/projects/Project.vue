<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card outlined dense class="no_border">
                <h2 class="mb-0">{{ $t('project') }}</h2>
                <v-icon
                    @click="cancel()"
                    style="cursor: pointer; color: #333; font-size: 40px;"
                    class="float-right"
                >close
                </v-icon>
              </v-card>
              <v-card outlined dense class="px-3 no_border mb-3" color="white">
                <v-row class="bkgrey">
                  <v-col sm="4" cols="12" class="pb-0">
                    <label class="label">{{ $t("project_code") }}*</label>
                    <v-text-field
                      class="mt-1" 
                      v-model="project.code"
                      :rules="[v => !!v || $t('is_required')]"
                      outlined/>
                    <label class="label">{{ $t("project_name") }}*</label>
                    <v-text-field 
                      v-model="project.name" 
                      class="mt-1" outlined
                      :rules="[v => !!v || $t('is_required')]"/>
                  </v-col>
                  <v-col sm="4" cols="12" class="pb-0">
                    <label class="label">{{ $t("starting_date") }}*</label>
                    <app-datepicker :initialDate="project.startDate"
                      @emitDate="project.startDate = $event"/>
                    <label class="label">{{ $t("ending_date") }}*</label>
                    <app-datepicker :initialDate="project.endDate"
                      @emitDate="project.endDate = $event"/>
                  </v-col>
                  <v-col sm="4" cols="12" class="pb-0">
                    <label class="label">{{ $t("description") }}</label>
                    <v-textarea v-model="project.description" class="mt-1" no-resize height="120px"
                      outlined
                      rows="5"/>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col sm="12" cols="12" class="py-2">
                    <p class="mb-0" v-if="appType != 'npo'">
                      {{ $t('this_project_customer') }}
                    </p>
                    <p v-else class="mb-0">
                      {{ $t('this_project_donor') }}
                    </p>
                  </v-col>
                  <v-col sm="12" cols="12">
                    <kendo-datasource ref="customersDS"
                      :change="dataSourceChanged"
                      :data="customerList"/>
                    <kendo-grid id="gridCustomers" class="grid-function"
                      :data-source-ref="'customersDS'"
                      :editable="true"
                      :scrollable-virtual="true">
                      <kendo-grid-column
                        :field="'no'"
                        :title="$t('no')"
                        :template="rowNumber"
                        :width="45"
                        :column-menu="false"
                        :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                        :attributes="{style: 'text-align: center'}"/>
                      <kendo-grid-column
                        :field="'customer'"
                        :title=" appType != 'npo' ? $t('customer'): $t('donor') "
                        :width="150"
                        :template="'<span>#=customer.number# - #=customer.name#</span>'"
                        :editor="customerDropDownEditor"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                      <kendo-grid-column
                        :field="'saleOrder'"
                        :title=" appType != 'npo' ? $t('sale_order') : $t('contract') "
                        :width="150"
                        :template="'<span>#=saleOrder.referenceNo || ``#</span>'"
                        :editor="SaleOrderDropDownEditor"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                      <kendo-grid-column
                        :field="'amount'"
                        :title="$t('amount')"
                        :width="150"
                        :editable="()=>{ return false}"
                        :template="amountFormat"
                        :attributes="{style: 'text-align: right'}"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                      <kendo-grid-column
                        :field="''"
                        :title="$t('action')"
                        :width="70"
                        :command="[{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow }]"
                        :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                    </kendo-grid>
                  </v-col>
                  <v-col sm="5" cols="12" class="pt-0 px-4">
                    <v-btn color="primary" class="float-left btn_plus rounded-0 mr-2" @click="addRow">
                      <v-icon size="" class="ma-1">mdi-plus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
              <v-divider class="mt-4"/>
              <v-card outlined dense class="no_border function_footer">
                <v-btn color="black" class="text-capitalize  white--text float-left"
                  @click="cancel">{{ $t('cancel') }}
                </v-btn>
                <v-btn @click="onSaveClose('close')" color="primary"
                  class=" float-right text-capitalize  white--text">
                  {{ $t('save_close') }}
                </v-btn>
                <v-btn color="secondary"
                    style="margin-right: 10px !important"
                    class="white--text float-right text-capitalize"
                    @click="onSaveClose('new')" :hidden="hiddenButton">{{ $t("save_new") }}
                </v-btn>
              </v-card>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          :myLoading="true"/>
    </v-container>
  </v-app>
</template>

<script>
import {i18n} from '@/i18n';
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import ServiceProject from "@/scripts/service/model/project";
import kendo from "@progress/kendo-ui";
import {dataStore} from "@/observable/store";

const $ = require("jquery")
const customerHandler = require("@/scripts/customerHandler")
const saleOrderHandler = require("@/scripts/transactionHandler")
const projectHandler = require("@/scripts/projectHandler")
const saleFormContentHandler = require("@/scripts/saleFormContentHandler")

export default {
  name: "Project",
  props: ["id"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    'app-datepicker': DatePickerComponent,
  },
  data: () => ({
    template: [],
    startingDate: '',
    endingDate: '',
    valid: true,
    showLoading: false,
    customerList: [],
    customers: [],
    customer: {},
    filter: '',
    saleOrders: [],
    saleFormContent: {},
    project: new ServiceProject({})

  }),
  methods: {
    amountFormat(value) {
      return kendo.toString(parseFloat(value.amount), `n${this.saleFormContent.decimal}`)
    },
    async loadSaleFormContent() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
          saleFormContentHandler.list().then(res => {
            if (res.data.statusCode === 200) {
              const data = res.data.data
              if (data.length > 0) {
                this.saleFormContent = data[0]
              }
            }
          })
        }, 10)
      })
    },
    removeRow(e) {
      e.preventDefault();
      const grid = kendo.jQuery("#gridCustomers").data("kendoGrid"),
        dataSource = grid.dataSource,
        dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      if (dataSource.total() > 1) {
        dataSource.remove(dataItem);
      }
    },
    async initData() {
      if (this.$route.params.id !== undefined) {
        await this.loadSingleProject()
      } else {
        await this.clear()
      }
    },
    onUpdate() {
      this.$emit("onUpdate", this.project);
    },
    dataSourceChanged(e) {
      if (e.field) {
        let dataRow = e.items[0]
        // window.console.log(e.field)
        switch (e.field) {
          case "customer":
            // this.onloadSaleOrder(dataRow.customer)
            window.console.log(dataRow)
            break
          case "saleOrder":
            dataRow.set('amount', dataRow.saleOrder.exchangeAmount)
            dataRow.set('decimalFormat', dataRow.saleOrder.decimalFormat)
            break
          default:
            break
        }
      }
    },
    async onloadSaleOrder(value) {
      let data = {
        "method": "by_customer",
        "customer": value.id,
        "type": 'Sale Order',
      }
      await saleOrderHandler.search(data).then(res => {
        this.saleOrders = res.data.data
      })
    },
    rowNumber(dataItem) {
      let ds = this.$refs.customersDS.kendoWidget(),
          index = ds.indexOf(dataItem);
      return index + 1;
    },
    async addRow() {
      let ds = this.$refs.customersDS.kendoWidget(),
          total = ds.total();
      // if (total < 1) {
      await ds.insert(total, {
        customer: {
          name: '',
          number: '',
        },
        saleOrder: {
          number: ''
        },
        amount: 0,
        decimalFormat: 'n' + this.saleFormContent.decimal
      })
      // }
    },
    SaleOrderDropDownEditor(container, options) {
      kendo.jQuery('<input name="' + options.field + '"/>')
          .appendTo(container)
          .kendoDropDownList({
            autoBind: true,
            autoWidth: true,
            height: 400,
            filter: "startswith",
            dataTextField: "referenceNo",
            dataValueField: "id",
            cascadeFrom: "item",
            template: "<span>#=referenceNo#</span>",
            optionLabel: "--- Select ---",
            dataSource: new kendo.data.DataSource({
              serverFiltering: true,
              transport: {
                read: {
                  url: saleOrderHandler.searchURL('?id=' + options.model.customer.id + '&type=Sale Order'),
                },
                dataType: "json",
              },
              schema: {
                model: {
                  id: "id",
                  fields: {
                    id: {type: "string"},
                    exchangeAmount: {type: "string"},
                    referenceNo: {type: "string"},
                    amount: {type: "string"},
                  }
                },
                data: function (response) {
                  return response.data;
                },
                total: function (response) {
                  return response.data.count;
                }
              },
            })
          })
    },
    customerDropDownEditor(container, options) {
      kendo.jQuery('<input required name="' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: true,
        autoWidth: true,
        height: 400,
        filter: "contains",
        dataTextField: "name",
        dataValueField: "id",
        headerTemplate: '<div class="dropdown-header k-widget k-header">' +
            '<span>Customers </span>' +
            '<span> </span>' +
            '</div>',
        template: "<span>#=number# - #=name#</span>",
        optionLabel: "--- Select ---",
        dataSource: new kendo.data.DataSource({
          serverFiltering: true,
          transport: {
            read: {
              url: customerHandler.search(),
            },
            dataType: "json",
          },
          schema: {
            model: {
              id: "id",
              fields: {
                id: {type: "string"},
                type: {type: "string"},
                number: {type: "string"},
                billingType: {type: "string"},
                consumerId: {type: "string"},
                taxId: {type: "string"},
              }
            },
            data: function (response) {
              return response.data;
            },
            total: function (response) {
              return response.data.count;
            }
          },
            // data: this.variants
        }),
      })
    },
    cancel() {
      this.$swal({
          title: i18n.t('msg_title_warning'),
          text: i18n.t('msg_discard'),
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: i18n.t('cancel'),
          confirmButtonColor: "#4d4848",
          cancelButtonColor: "#ED1A3A",
          confirmButtonText: i18n.t('discard'),
      }).then((resultCen) => {
          if (resultCen.value) {
            this.clear()
            this.$router.go(-1);
            return false
          }
      });
    },
    async clear() {
      this.project = new ServiceProject({})
      this.customers = []
      let ds = this.$refs.customersDS.kendoWidget();
      this.customerList = ds.data([]);
      this.addRow()

    },
    async onSaveClose(isSave) {
      window.console.log(1)
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      let ds = this.$refs.customersDS.kendoWidget();
      let d1 = ds.data()
      let dataValidate = 0
      d1.forEach((value, index) => {
        if(value.customer == undefined || value.customer.id == undefined || value.customer.id  == '' || value.customer.id == null || value.saleOrder == undefined || value.saleOrder.id == undefined || value.saleOrder.id  == '' || value.saleOrder.id == null){
          this.$snotify.error('Please check ustomer or Sale Order  on row ' + (index + 1))
        }else{
          dataValidate  += 1
        }
      });
      if(d1.length  == dataValidate){
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            let customerDS = this.$refs.customersDS.kendoWidget()
            let data = {
              id: this.$route.params.id,
              name: this.project.name,
              code: this.project.code,
              startDate: this.project.startDate,
              endDate: this.project.endDate,
              status: 1,
              description: this.project.description,
              customers: customerDS.data(),
              type: this.$route.params.id ? this.$route.query.type : 'new'
            }
            projectHandler.create(data).then(res => {
              window.console.log(res)
              if(isSave == 'new'){
                this.clear()
              }else if(isSave == 'close'){
                this.clear()
                this.$router.go(-1);
              }
            }).catch(e => {
              this.$snotify.error('Something went wrong')
              this.errors.push(e)
            })
          })
        })
      }
    },
    async loadSingleProject() {
      this.showLoading = true
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved')
          projectHandler.get(this.$route.params.id).then(response => {
            if (response.data.statusCode === 200) {
              this.project = response.data.data[0]
              if (this.project.hasOwnProperty('customers')) {
                this.customerList = this.project.customers
              }
              this.showLoading = false
            }
          }).catch(e => {
            this.$snotify.error('Something went wrong')
            this.errors.push(e)
          })
        })
      })
    },
  },
  created() {
    this.loadSaleFormContent()
  },
  async mounted() {
    await this.initData()

    // this.requestData(0, '', customerHandler.search())
  },
  watch: {
    async id() {
      // this.product = this.selectedProduct
      // window.console.log(this.id, 'watch')
      if (this.id !== undefined) {
        await this.loadSingleProject()
      }else{
        this.clear()
      }
    }
  },
  computed: {
    appType() {
        return dataStore.productType;
    },
    hiddenButton(){
      if(this.$route.query.type =="edit"){
        return true
      }else{
        return false
      }
    }
  },
};
</script>

<style scoped>
@media (min-width: 1264px) {
  .container {
    max-width: 1080px !important;
  }
}

.k-dropdown {
  width: 100%;
  margin-top: 3px;
}

.bkgrey {
  background: #F8F8F9;
}
</style>
