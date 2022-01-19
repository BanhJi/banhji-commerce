<template>
  <v-row>
    <v-col sm="12" cols="12" class="pa-3">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td width="230" class="text-uppercase">
                {{ $t("policy_number") }}
              </td>
              <td style="width:20px">:</td>
              <td class="text-left text-bold">00</td>
            </tr>
            <tr>
              <td class="text-uppercase">{{ $t("policy_name") }}</td>
              <td style="width:20px">:</td>
              <td class="text-left text-bold">
                00
              </td>
            </tr>
            <tr>
              <td class="text-uppercase">{{ $t("policy_type") }}</td>
              <td style="width:20px">:</td>
              <td class="text-left text-bold">
               0
              </td>
            </tr>
            <tr>
              <td class="text-uppercase">{{ $t("premium") }}</td>
              <td style="width:20px">:</td>
              <td class="text-left text-bold">
              00
              </td>
            </tr>
            <tr>
              <td class="text-uppercase">{{ $t("payment_due_date") }}</td>
              <td style="width:20px">:</td>
              <td class="text-left text-bold">
              00
              </td>
            </tr>
            <tr>
              <td class="text-uppercase primary white--text">{{ $t("outstanding_balance") }}</td>
              <td style="width:20px" class="primary white--text">:</td>
              <td class="text-left text-bold primary white--text">
              00
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>

    <!-- <v-col sm="12" cols="12" class="pt-0">
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                    <tr>
                        <td class="third white--text text-uppercase mt-5">{{ $t('balance') }}</td>
                        <td class="third white--text text-left text-bold mt-5">balance</td>
                    </tr>
                    <tr>
                        <td class="third white--text text-uppercase">{{ $t('deposit') }}</td>
                        <td class="third white--text text-left text-bold"></td>
                    </tr>
                    <tr>
                        <td class="secondary white--text text-uppercase mt-5">{{ $t('open_invoices') }}</td>
                        <td class="secondary white--text text-left text-bold mt-5"></td>
                    </tr>
                    <tr>
                        <td class="secondary white--text text-uppercase">{{ $t('overdue_invoices') }}</td>
                        <td class="secondary white--text text-left text-bold"></td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col> -->
  </v-row>
</template>
<script>
// const billingHandler = require("@/scripts/invoice/handler/billingHandler")
export default {
  name: "Info",

  computed: {},
  data: () => ({
    balance: 0,
    btnEnabled: true,
  }),
  watch: {},
  methods: {
    goEdit() {
      let acc = this.account;
      if (acc.uuid) {
        this.$router.push({ name: "Account", params: { id: acc.uuid } });
      }
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
