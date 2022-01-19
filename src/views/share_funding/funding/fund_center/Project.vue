<template>
  <v-row>
    <v-col sm="12" cols="12" class="py-0">
      <LoadingMe
        :isLoading="laoding"
        :fullPage="false"
        type="loading"
        :myLoading="true"
      >
      </LoadingMe>
      <kendo-datasource
        ref="transactionDS"
        :data="items"
        :server-paging="false"
      />
      <kendo-grid
        id="gridTransactions"
        class="grid-function"
        :data-source-ref="'transactionDS'"
        :editable="false"
        :groupale="true"
        :column-menu="true"
        :noRecords="true"
        :scrollable-virtual="true"
      >
        <kendo-grid-column
          :field="'code'"
          :title="$t('code')"
          :width="120"
          :template="transactionDate"
          :headerAttributes="{
            style: 'background-color: #EDF1F5',
          }"
        />
        <kendo-grid-column
          :field="'name'"
          :title="$t('name')"
          :width="200"
          :template="'<span>#=transactionType#</span>'"
          :headerAttributes="{
            style: 'background-color: #EDF1F5',
          }"
        />
        <kendo-grid-column
          :field="'amount'"
          :title="$t('amount')"
          :width="200"
          :template="referenceTemplate"
          :headerAttributes="{
            style: 'background-color: #EDF1F5, color: green !important',
          }"
        />
      </kendo-grid>
    </v-col>
  </v-row>
</template>
<script>
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
export default {
  name: "CustomerInfo",
  props: { customer: {} },
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  mounted() {},
  computed: {
    name() {
      if (this.customer) {
        if (this.customer.hasOwnProperty("id")) {
          if (this.customer.id !== undefined || this.customer.id !== "") {
            this.loadCustomerBalance(this.customer.id);
          }
        }
        if (this.customer.hasOwnProperty("name")) {
          return this.customer.name;
        }
      }
      return "";
    },
    crn() {
      if (this.customer) {
        if (this.customer.hasOwnProperty("crn")) {
          return this.customer.crn.includes("crn-")
            ? this.customer.crn.replace("crn-", "")
            : this.customer.crn;
        }
      }
      return "";
    },
    type() {
      if (this.customer) {
        if (this.customer.hasOwnProperty("customerType")) {
          if (this.customer.customerType.hasOwnProperty("id")) {
            return this.customer.customerType.name;
          }
        }
      }
      return "";
    },
    subOf() {
      if (this.customer) {
        if (this.customer.hasOwnProperty("subOfCustomer")) {
          if (this.customer.subOfCustomer.hasOwnProperty("id")) {
            return this.customer.subOfCustomer.name;
          }
        }
      }
      return "";
    },
    group() {
      if (this.customer) {
        if (this.customer.hasOwnProperty("paymentBilling")) {
          if (this.customer.paymentBilling.hasOwnProperty("customerGroup")) {
            return this.customer.paymentBilling.customerGroup.name;
          }
        }
      }
      return "";
    },
    btnEnabled() {
      return !this.customer.id;
    },
    routerTo() {
      if (this.customer) {
        if (this.customer.type === "Individual") {
          return (
            "individual_customer" + `/${this.customer ? this.customer.id : ""}`
          );
        } else if (this.customer.type === "Company") {
          return (
            "company_customer" + `/${this.customer ? this.customer.id : ""}`
          );
        }
      }

      return "";
    },
  },
  data: () => ({
    balance: 0,
    laoding: false,
    items: []
  }),
  watch: {},
  methods: {
    async loadCustomerBalance(id) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (id) {
            const strFilter = id + "?type=bal";
            billingHandler
              .balance(strFilter)
              .then((res) => {
                if (res.data.statusCode === 200) {
                  const data = res.data.data;
                  if (data.length > 0) {
                    this.balance = data[0].balanceFormat;
                  }
                }
              })
              .catch();
            {
              this.showLoading = false;
            }
          }
        }, 300);
      });
    },
  },
};
</script>
<style scoped>
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr.secondary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: #4d4848 !important;
}

.theme--light.v-data-table {
  background-color: transparent !important;
  border-top: thin solid #ddd;
  border-bottom: thin solid #ddd;
  border-radius: 0 !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid #ddd;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
}

.v-application .secondary,
.v-application .third {
  border-color: #fff !important;
}
</style>
