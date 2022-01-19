<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="10" cols="10" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t("purchase_payable") }}</h2>

            <p class="mb-0">
              {{ $t("purchase_payable_desc") }}
            </p>
          </v-col>
          <v-col sm="2" cols="2" class="pt-2">
            <!-- <v-btn
              @click="onNewClick"
              color="primary"
              class=" text-capitalize white--text float-right"
              v-on="on"
            >
              {{ $t("create_new") }}
            </v-btn> -->
          </v-col>
          <v-col sm="12" cols="12">
            <template>
              <div v-if="!isLoaded">
                <LoadingMe
                  :isLoading="showLoading"
                  :fullPage="false"
                  :myLoading="true"
                />
              </div>
              <kendo-datasource
                ref="paymentOptionDS"
                :data="paymentOptions"
                :schema="schemaDefinition"
              />
              <kendo-grid
                id="gridPaymentOption"
                class="grid-function"
                :data-source-ref="'paymentOptionDS'"
                :editable="false"
                :column-menu="true"
                :scrollable-virtual="true"
              >
                <kendo-grid-column
                  :field="'no'"
                  :title="$t('num')"
                  :template="rowNumberTmpl"
                  :width="60"
                  :column-menu="false"
                  :headerAttributes="{
                    style: 'background-color: #EDF1F5;',
                    class: 'text-center',
                  }"
                  :attributes="{ style: 'text-align: center' }"
                />
                <kendo-grid-column
                  :field="'code'"
                  :title="$t('date')"
                  :width="120"
                  :template="'<span>#=code#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'name'"
                  :title="$t('purchase')"
                  :template="'<span>#=name#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'type'"
                  :title="$t('po_amount')"
                  :width="160"
                  :template="'<span>#=type#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="'type'"
                  :title="$t('receipt_amount')"
                  :width="160"
                  :template="'<span>#=type#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                      <kendo-grid-column
                  :field="'type'"
                  :title="$t('receipt_num')"
                  :width="160"
                  :template="'<span>#=type#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                      <kendo-grid-column
                  :field="'type'"
                  :title="$t('po_num')"
                  :width="160"
                  :template="'<span>#=type#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                      <kendo-grid-column
                  :field="'type'"
                  :title="$t('status')"
                  :width="160"
                  :template="'<span>#=type#</span>'"
                  :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                />
                <kendo-grid-column
                  :field="''"
                  :title="$t('action')"
                  :width="100"
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
import PaymentOptionModel from "@/scripts/model/PaymentOption";
import kendo from "@progress/kendo-ui";

const paymentOptionHandler = require("@/scripts/paymentOptionHandler");

const $ = require("jquery");
// const accountHandler = require("@/scripts/handler/accounting/account")
const paymentOptionModel = new PaymentOptionModel({});
const OPTION_TYPE = "Customer";
export default {
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    dialogM2: false,
    isHideBank: true,
    showLoading: false,
    isLoaded: false,
    paymentOptions: [],
    mLocation: {},
    paymentOption: paymentOptionModel,
    schemaDefinition: {
      model: { id: "id" },
    },
    btnEnable: false,
  }),
  mounted: async function() {
    // await this.loadPaymentOption();
  },
  created() {},
  methods: {
    accountTmp(dataItem) {
      if (dataItem.hasOwnProperty("account")) {
        if (dataItem.account.hasOwnProperty("id")) {
          return dataItem.account.name;
        }
        return "";
      } else {
        return "";
      }
    },
    onNewClick() {
      // this.paymentOption = []
      // this.mBank = []
      // this.dialogM2 = true
      this.$router.push({
        path: "payment_option",
        name: "Payment Option",
        params: {},
      });
    },
    close() {
      this.dialogM2 = false;
    },
    goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridPaymentOption").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.$router.push({
        path: "payment_option" + `/${dataItem.id}`,
        name: "Payment Option",
        params: { id: dataItem.id },
        query: { type: "edit" },
      });
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.paymentOptionDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    async loadPaymentOption() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.paymentOptions = [];
          paymentOptionHandler
            .list("?optionType=" + OPTION_TYPE)
            .then((res) => {
              this.showLoading = true;
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                this.paymentOptions = res.data.data;
              }
            })
            .catch();
          {
            this.showLoading = false;
          }
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
