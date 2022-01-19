<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
					<v-col sm="9" cols="12" class="pt-0 pb-0">
						<h2 class="mb-0 font_20">{{ $t("deposit_balance_summary") }}</h2>
						<p class="mb-0">
							{{ $t("deposit_summary_desc") }}
						</p>
					</v-col>
					<v-col sm="3" cols="12" class="pt-2"> 
						<v-btn
							class="capitalize mr-2 float-right white--text"
							to="purchase_deposit"
							color="primary"
						>
							{{ $t("new_purchase_deposit") }}
						</v-btn>
					
					</v-col>
        <!-- <h2 class="mb-0 font_20">{{ $t("deposit_balance_summary") }}</h2>
        <p class="mb-0">{{ $t("deposit_summary_desc") }}</p> -->
        <!-- loading -->
        <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true">
        </LoadingMe>

          <v-col sm="4" cols="12" class="pb-0">
            <app-datepicker :initialDate="asOf" @emitDate="asOf = $event" />
          </v-col>
          <v-col
            sm="4"
            cols="12"
            class="kendo_dropdown_custom paddingTop1     mt-1 pb-0"
          >
            <dropdownlist
              :data-items="supplierList"
              @change="onChange"
              :value="supplier"
              :data-item-key="dataItemKey"
              :text-field="textField"
              :default-item="defaultItem"
              :filterable="true"
              @filterchange="onFilterChange"
            >
            </dropdownlist>
          </v-col>
          <v-col sm="1" cols="12" class="pb-0 pt-4">
            <v-btn
              color="primary white--text text-capitalize"
              @click="loadDepositBalance"
            >
              <i class="b-search" style="font-size: 18px; color:#fff"/>
            </v-btn>
          </v-col>
          <!-- <v-col sm="2" cols="12" class="pb-0">
            <v-btn icon color="black" class="bg-none float-right ml-2">
              <v-icon class="font_34">fa fa-file-excel</v-icon>
            </v-btn>
            <v-btn icon color="black" class="bg-none float-right ml-2">
              <v-icon class="font_34">fa fa-print</v-icon>
            </v-btn>
          </v-col> -->
        </v-row>
        <v-row class="mt-0">
          <v-col sm="4" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 no_border white--text "
              color="secondary"
              height="85px"
            >
              <h3 class="text-left text-uppercase font_13 flex-1">
                {{ $t("suppliers") }}
              </h3>
              <h3 class="text-right font_20 flex-1 mt-6">
                {{ totalCustomer }}
              </h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 no_border white--text "
              color="third"
              height="85px"
            >
              <h3 class="text-left text-uppercase font_13 flex-1">
                {{ $t("deposit_balance") }}
              </h3>
              <h3 class="text-right  font_20 flex-1 mt-6">{{ balance }}</h3>
            </v-card>
          </v-col>
          <v-col sm="4" cols="12" class="pt-0">
            <v-card
              outlined
              dense
              class="pa-3 no_border black--text"
              color="third"
              height="85px"
            >
              <h3 class="text-left text-uppercase white--text font_13 flex-1">
                {{ $t("%_of_purchase") }}
              </h3>
              <h3 class="text-right  font_20 white--text flex-1 mt-6">
                {{ percentOfPurchase }}
              </h3>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                :myLoading="true"
              />
              <kendo-datasource
                ref="dataSource"
                :group="group"
                :data="depositBalanceList"
              />
              <kendo-grid
                id="gridReceivable"
                class="grid-function"
                :data-source-ref="'dataSource'"
                :column-menu="true"
                :noRecords="true"
                :editable="false"
                :groupable="true"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'number'"
                  :title="$t('number')"
                  :template="'<span>#= number #</span>'"
                  :width="200"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'name'"
                  :title="$t('name')"
                  :attributes="{ class: 'tb_name_td' }"
                  :template="'<span>#=name#</span>'"
                  :width="200"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'type'"
                  :title="$t('type')"
                  :template="'<span>#= type #</span>'"
                  :width="200"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'balance'"
                  :title="$t('balance')"
                  :template="
                    '<span>#= kendo.toString(balance, decimalFormat)#</span>'
                  "
                  :width="200"
                  :attributes="{ style: 'text-align: right' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
                  }"
                />
                <kendo-grid-column
                  :field="'percentOfPurchase'"
                  :title="$t('%_of_purchase')"
                  :template="
                    '<span>#= kendo.toString(percentOfPurchase || 0, decimalFormat)# %</span>'
                  "
                  :width="200"
                  :attributes="{ style: 'text-align: right' }"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5',
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
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import kendo from "@progress/kendo-ui";

const supplierHandler = require("@/scripts/supplierHandler");
const defaultItem = { ["numberName"]: "Select supplier...", ["id"]: null };
const emptyItem = { ["numberName"]: "loading ..." };

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
export default {
  name: "SupplierDeposit",
  props: ["id"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": DatePickerComponent,
    dropdownlist: DropDownList,
  },
  data: () => ({
    showLoading: false,
    asOf: new Date().toISOString().substr(0, 10),
    supplierList: [],
    supplier: {},
    depositBalanceList: [],
    textField: "numberName",
    defaultItem: defaultItem,
    dataItemKey: "id",
    filter: "",
    supBaseUrl: supplierHandler.search(),
    totalCustomer: 0,
    percentOfPurchase: 0,
    balance: 0,
    group: { field: "type" },
  }),
  methods: {
    onFilterChange(event) {
      const filter = event.filter.value;
      this.requestData(0, filter, this.supBaseUrl);
      this.filter = filter;
    },
    requestData(skip, filter, baseUrl) {
      const url = baseUrl + `?filter=${filter}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then(this.afterFetch);
    },
    afterFetch(json) {
      this.supplierList = json.data;
    },
    onChange(event) {
      const value = event.value;
      if (value && value["numberName"] === emptyItem["numberName"]) {
        return;
      }
      this.supplier = value;
    },
    async loadDepositBalance() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          let strFilter = "";
          strFilter = "?asOf=" + this.asOf;
          if (this.supplier) {
            if (this.supplier.id !== undefined && this.supplier.id !== null) {
              strFilter = "?asOf=" + this.asOf + "&id=" + this.supplier.id;
            }
          }
          this.showLoading = true;
          billingHandler.purchaseDepositBalanceList(strFilter).then((res) => {
            if (res.data.statusCode === 200) {
              this.depositBalanceList = res.data.data;
              const result = res.data.result;
              this.balance = kendo.toString(
                result.balance,
                result.decimalFormat
              );
              this.percentOfPurchase = result.percentOfPurchase;
              this.totalCustomer = kendo.toString(result.totalCustomer, `n0`);
              this.showLoading = false;
            }
          });
        }, 300);
      });
    },
  },
  mounted() {
    this.requestData(0, this.filter, this.supBaseUrl);
  },
  computed: {},
};
</script>
<style scoped>
@media (max-width: 576px) {
  .paddingTop {
    padding-top: 0 !important;
  }
}
.b-search:before{
    color: #fff !important;
}

</style>
