<template>
  <v-row class="">
    <v-col sm="12" cols="12">
      <v-tabs
        vertical
        class="tab_setting tab_product_service_show"
        slider-color="grayBg"
        slider-size="7"
      >
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize">
            {{ $t("type_of_bank_account") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize">
            {{ $t("type_of_financial_institution") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize">
            {{ $t("bank_transactions_mapping") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-capitalize">
            {{ $t("bank_field_mapping") }}
          </span>
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text class="pt-0">
              <TypeBankAccount />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="pt-0">
              <TypeFinancialInstitution />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="pt-0">
              <BankTransactionMappings />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="pt-0">
              <BankFieldMappings />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
import TypeBankAccount from "./TypeBankAccount";
import TypeFinancialInstitution from "./TypeFinancialInstitution";
import BankTransactionMappings from "./BankTransactionMappings";
import BankFieldMappings from "./BankFieldMappings";

export default {
  data: () => ({}),
  props: {},
  methods: {
    clickMe(data) {
      // alert(data.link)
      this.$router.push(`${data.link}`);
      //this.$event.target.classList.toggle(active)
      //eslint-disable-next-line no-console
      console.log(data.link);
      //eslint-disable-next-line no-console
      //console.log(data)
    },
  },
  components: {
    TypeBankAccount,
    TypeFinancialInstitution,
    BankTransactionMappings,
    BankFieldMappings,
  },
};
</script>
<style scoped>
.v-tab {
  justify-content: left !important;
  text-align: left !important;
  height: 55px !important;
  font-size: 16px;
}

.v-tab--active {
  background-color: rgb(255, 255, 255);
}

.v-tab--active {
  background-color: #ffffff !important;
  border-bottom: 4px solid #92d050;
  border-left: none;
}

.tab_setting .v-tab--active {
  font-weight: 700;
  color: #000;
}
.v-tabs--vertical > .v-tabs-bar .v-tab {
  height: 67px !important;
}

@media (max-width: 576px) {
}
</style>
