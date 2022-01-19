<template>
  <v-row>
    <v-col sm="12" cols="12" class="">
      <v-card color="white" class="pl-4 no_border" elevation="0">
        <h2 class="mb-1 font_20">{{ $t("price_level_report") }}</h2>
        <!-- loading -->
        <LoadingMe
            :isLoading="showLoading"
            :fullPage="false"
            type="loading"
            :myLoading="true"
        >
        </LoadingMe>

        <v-row class="">
          <v-col sm="3" cols="12" class="pb-0">
            <v-select
                class="mt-1"
                :items="dateSorters"
                v-model="mDateSorter"
                @change="onSorterChanges"
                clearable
                outlined
                placeholder="ALL"
            />
          </v-col>

          <v-col sm="3" cols="12" class="pb-0">
            <app-datepicker
                :initialDate="startDate"
                @emitDate="startDate = $event"
            />
          </v-col>

          <v-col sm="3" cols="12" class="pb-0">
            <app-datepicker
                :initialDate="endDate"
                @emitDate="endDate = $event"
            />
          </v-col>

          <v-col sm="1" cols="1" class="pb-0 pt-4" @click="searchTransaction">
            <v-btn color="primary white--text">
              <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
            </v-btn>
          </v-col>
          <!-- <v-col sm="2" cols="12" class="py-0">
            <v-btn icon color="black" class="bg-none float-right ml-2">
              <v-icon class="font_34">fa fa-file-excel</v-icon>
            </v-btn>
            <v-btn icon color="black" class="bg-none float-right ml-2">
              <v-icon class="font_34">fa fa-print</v-icon>
            </v-btn>
          </v-col> -->
        </v-row>

        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <kendo-datasource ref="discountItemDS"
                                :group="group"
                                :data="priceLevelTxn"/>
              <kendo-grid id="gridDiscountItem" class="grid-function"
                          :data-source-ref="'discountItemDS'"
                          :editable="false"
                          :groupable="true"
                          :scrollable-virtual="true">
                <kendo-grid-column
                    :field="'name'"
                    :title="$t('name')"
                    :attributes="{class:'tb_name_td'}"
                    :width="200"
                    :template="'<span>#=name#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'customer'"
                    :title="$t('customer')"
                    :width="200"
                    :template="'<span>#=customer#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'referenceNo'"
                    :title="$t('invoice_no')"
                    :width="150"
                    :template="referenceTemplate"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'exchangeAmount'"
                    :title="$t('invoice_amount')"
                    :width="180"
                    :template="'<span>#= kendo.toString(exchangeAmount, decimalFormat)#</span>'"
                    :attributes="{style: 'text-align: right'}"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'paymentTerm'"
                    :title="$t('payment_term')"
                    :template="'<span>#=paymentTerm#</span>'"
                    :attributes="{style: 'text-align: left'}"
                    :width="180"
                    :headerAttributes="{style: 'text-left: right; background-color: #EDF1F5'}"/>
<!--                <kendo-grid-column-->
<!--                    :field="'priceLevel'"-->
<!--                    :title="$t('price_level')"-->
<!--                    :template="'<span>#=priceLevel#</span>'"-->
<!--                    :attributes="{style: 'text-align: left'}"-->
<!--                    :width="180"-->
<!--                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>-->
              </kendo-grid>
            </template>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import LoadingMe from "@/components/Loading";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";

const discountItemHandler = require("@/scripts/discountItemHandler")

export default {
  name: "PriceLevelReport",
  components: {
    LoadingMe,
    "app-datepicker": DatePickerComponent,
    // BankConnection,
  },
  data: () => ({
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    dateSorters: ['Today', 'This Week', 'This Month', 'This Year', 'Last Month' , 'Last Year'],
    showLoading: false,
    isLoaded: false,
    mDateSorter: 'Today',
    priceLevelTxn: [],
    group: {field: 'name'},
  }),
  methods: {
    onSorterChanges(val) {
      let today = new Date()
      switch (val) {
        case "Today":
          this.startDate = kendo.toString(today, 'yyyy-MM-dd')
          this.endDate = kendo.toString(today, 'yyyy-MM-dd')

          break
        case "This Week":
          var first = today.getDate() - today.getDay(),
              last = first + 6

          this.startDate = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
            today = new Date()
          this.endDate = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')

          break
        case "This Month":
          this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
          this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')

          break
        case "This Year":
          this.startDate = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
          this.endDate = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')
         break
                case "Last Month":
                  this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), -30), 'yyyy-MM-dd');
                  this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth() -1, +31), 'yyyy-MM-dd');
        
                  break
                case "Last Year":
                  this.startDate = kendo.toString(new Date(today.getFullYear(), -11, -30), 'yyyy-MM-dd');
                  this.endDate = kendo.toString(new Date(today.getFullYear(), -1, +31), 'yyyy-MM-dd');
          break
        default:
          this.startDate = ""
          this.endDate = ""
      }
    },
    async searchTransaction() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
          this.showLoading = true
          const startDate = this.startDate
          const endDate = this.endDate
          let strFilter = '?start=&end='
          if (startDate !== '' && endDate !== '') {
            strFilter = '?start=' + startDate + '&end=' + endDate
          }
          discountItemHandler.priceLevelReport(strFilter).then(res => {
            if (res.data.statusCode === 200) {
              this.showLoading = false
              this.priceLevelTxn = JSON.parse(JSON.stringify(res.data.data))
            }
          })
        }, 10);
      })
    },
    referenceTemplate(data) {
      let url = ''
      if (data.type === 'Invoice') {
        url = `invoice_view/${data.txnId}`
      } else if (data.type === 'Sale Deposit') {
        url = `sale_deposit_view/${data.txnId}`
      } else if (data.type === 'Purchase') {
        url = `purchase_view/${data.txnId}`
      } else if (data.type === 'Sale Quote') {
        url = `sale_quote_view/${data.txnId}`
      } else if (data.type === 'Cash Receipt') {
        url = `cash_receipt_view/${data.txnId}`
      }
      let args = {
        text: data.referenceNo,
        url: url,
        data: data,
      }
      return {
        template: LinkTemplate,
        templateArgs: args
      }
    },
  },
  mounted() {
  },
  computed: {},
};
</script>
<style scoped></style>
