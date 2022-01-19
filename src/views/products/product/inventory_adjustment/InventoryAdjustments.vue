<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="12" cols="12" class="pt-0">
            <v-row>
              <v-col sm="6" cols="12" class="py-0">
                <h2 class="mb-0 font_20">{{ $t("inventory_adjustment") }}</h2>
              </v-col>
              <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true"
              >
              </LoadingMe>
              <v-col sm="6" cols="12" class="py-0">
                <v-btn
                  to="inventory_adjustment"
                  color="primary marginT"
                  class=" white--text float-right text-capitalize"
                >
                  {{ $t("new_adjustment") }}
                </v-btn>

              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12" cols="12" class="pb-0">
                <v-row class="">
                  <v-col sm="4" cols="12" class="py-0">
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

                  <v-col sm="3" cols="12" class="py-0">
                    <app-datepicker
                      :initialDate="startDate"
                      @emitDate="startDate = $event"
                    />
                  </v-col>

                  <v-col sm="3" cols="12" class="py-0">
                    <app-datepicker
                      :initialDate="endDate"
                      @emitDate="endDate = $event"
                    />
                  </v-col>

                  <v-col sm="1" cols="1" class="pt-1">
                    <v-btn
                      class="btn_search"
                      @click="searchTransaction('Inventory Adjustment')"
                      style="background-color: rgb(237, 241, 245)"
                    >
                      <i
                        class="b-search"
                        style="font-size: 18px; color:#fff !important;"
                      />
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="">
              <v-col sm="12" cols="12" class="py-0">
                <template>
                  <kendo-datasource
                    ref="gridTransactionDS"
                    :type="'JSON'"
                    :data="transactions"
                    :server-paging="false"
                  />
                  <kendo-grid
                    id="gridTransaction"
                    class="grid-function"
                    :data-source-ref="'gridTransactionDS'"
                    :editable="false"
                    :groupable="true"
                    :column-menu="true"
                    :noRecords="true"
                    :scrollable-virtual="true"
                  >
                    <kendo-grid-column
                      :field="'no'"
                      :title="$t('no')"
                      :template="rowNumberTmpl"
                      :width="90"
                      :column-menu="false"
                      :headerAttributes="{
                        style: 'background-color: #EDF1F5;',
                        class: 'text-center',
                      }"
                      :attributes="{ style: 'text-align: center' }"
                    />
                    <kendo-grid-column
                      :field="'transactionDate'"
                      :title="$t('date')"
                      :width="120"
                      :template="
                        '<span>#=kendo.toString(transactionDate, dateFormat)#</span>'
                      "
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="'name'"
                      :attributes="{ class: 'tb_name_td' }"
                      :title="$t('name')"
                      :width="200"
                      :template="'<span>#=name#</span>'"
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="'referenceNo'"
                      :title="$t('reference_no')"
                      :width="200"
                      :template="referenceTemplate"
                      :headerAttributes="{
                        style:
                          'background-color: #EDF1F5, color: green !important',
                      }"
                    />
                    <kendo-grid-column
                      :field="'qty'"
                      :title="$t('adjusted_qty')"
                      :width="200"
                      :attributes="{ style: 'text-align: right; ' }"
                      :template="
                        '<span>#=kendo.toString(qty, decimalFormat)#</span>'
                      "
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                    <kendo-grid-column
                      :field="'exchangeAmount'"
                      :title="$t('adjusted_amount')"
                      :width="200"
                      :attributes="{ style: 'text-align: right; ' }"
                      :template="
                        '<span>#=kendo.toString(exchangeAmount, decimalFormat)#</span>'
                      "
                      :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    />
                  </kendo-grid>
                </template>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
export default {
  name: "InventoryAdjustmentList",
  data: () => ({
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    dateSorters:['Today', 'This Week', 'This Month', 'This Year', 'Last Month' , 'Last Year'],
    mDateSorter: "Today",
    showLoading: false,
    transactions: [],
    dialogM3: false,
    isLoaded: false,
  }),
  props: {},
  methods: {
    onSorterChanges(val) {
      let today = new Date();
      switch (val) {
        case "Today":
          this.startDate = kendo.toString(today, "yyyy-MM-dd");
          this.endDate = kendo.toString(today, "yyyy-MM-dd");

          break;
        case "This Week":
          var first = today.getDate() - today.getDay(),
            last = first + 6;

          this.startDate = kendo.toString(
            new Date(today.setDate(first)),
            "yyyy-MM-dd"
          );
            today = new Date()
          this.endDate = kendo.toString(
            new Date(today.setDate(last)),
            "yyyy-MM-dd"
          );

          break;
        case "This Month":
          this.startDate = kendo.toString(
            new Date(today.getFullYear(), today.getMonth(), 1),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.getFullYear(), today.getMonth(), 31),
            "yyyy-MM-dd"
          );

          break;
        case "This Year":
          this.startDate = kendo.toString(
            new Date(today.getFullYear(), 0, 1),
            "yyyy-MM-dd"
          );
          this.endDate = kendo.toString(
            new Date(today.getFullYear(), 11, 31),
            "yyyy-MM-dd"
          );
         break
                case "Last Month":
                  this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), -30), 'yyyy-MM-dd');
                  this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth() -1, +31), 'yyyy-MM-dd');
        
                  break
                case "Last Year":
                  this.startDate = kendo.toString(new Date(today.getFullYear(), -11, -30), 'yyyy-MM-dd');
                  this.endDate = kendo.toString(new Date(today.getFullYear(), -1, +31), 'yyyy-MM-dd');
          break;
        default:
          this.startDate = "";
          this.endDate = "";
      }
    },
    numberFormat(value) {
      return kendo.toString(value, `n${this.saleFormContent.decimal}`);
    },
    referenceTemplate(data) {
      let url = `inventory_adjustment_view/${data.id}`;
      let args = {
        text: data.referenceNo,
        url: url,
        data: data,
      };
      return {
        template: LinkTemplate,
        templateArgs: args,
      };
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.gridTransactionDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    async loadTransactions() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          billingHandler.inventoryAdjustmentList().then((res) => {
            if (res.data.statusCode === 200) {
              this.transactions = res.data.data;
            }
            this.showLoading = false;
          });
        }, 10);
      });
    },
    async searchTransaction(type) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          const startDate = this.startDate;
          const endDate = this.endDate;
          let strFilter = "";
          if (type !== "") {
            strFilter =
              "?start=" + startDate + "&end=" + endDate + "&type=" + type;
          } else {
            strFilter = "?start=" + startDate + "&end=" + endDate;
          }

          billingHandler.inventoryAdjustmentList(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              // window.console.log('im search', res)
              this.transactions = res.data.data;
            }
            this.showLoading = false;
          });
        }, 10);
      });
    },
    callback() {
      if (
        this.$route.params !== null &&
        this.$route.params.hasOwnProperty("data")
      ) {
        const data = this.$route.params.data;
        if (data.transactionType === "delete") {
          // this.loadTransactions()
          window.console.log("im changed", this.$route.params);
        }
      }
      window.console.log("im changed", this.$route.params);
    },
  },
  mounted() {},
  computed: {},
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": DatePickerComponent,
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

@media (max-width: 576px) {
  .marginT {
    margin-top: 15px;
  }
}
</style>
