<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card
            outlined
            dense
            class="pa-4 no_border rounded-sm"
            color="white"
          >
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card
                outlined
                dense
                class="no_border d-flex justify-space-between"
              >
                <h3 class="mb-3 primary--text font_24">
                  {{ $t("connect_bill_payment_account") }}
                </h3>
                <v-icon
                  @click="cancel"
                  style="
										cursor: pointer;
										color: #333;
										font-size: 40px;
									"
                  class="float-right"
                  >close
                </v-icon>
              </v-card>
              <v-card outlined dense class="px-5 py-2" color="grayBg">
                <v-row>
                  <v-col cols="12" sm="3">
                    <v-img
                      class="borderRadius20"
                      :src="bankPartnerService.image"
                    ></v-img>
                    <p class="mb-0 niradei_light mt-3">
                      {{ $t("if_you_need_support") }}
                      <a href="mailto:support@banhji.com" class="primary--text"
                        >support@banhji.com</a
                      >
                      or +885 10413777
                    </p>
                  </v-col>

                  <v-col cols="12" sm="9">
                    <p class="mb-3 font_18">
                      {{ $t("please_select_the_account") }}
                    </p>
                    <label class="label">{{ $t("merchant") }}</label>
                    <v-text-field
                      v-model="connectBankPartnerService.merchant.id"
                      :rules="[(v) => !!v || 'Merchant is required']"
                      required
                      outlined
                    />

                    <div v-if="bankPartnerService.name === 'payway'">
                      <label class="label">{{ $t("api_url") }}</label>
                      <v-text-field
                        v-model="connectBankPartnerService.merchant.apiUrl"
                        outlined
                      />

                      <label class="label">{{ $t("api_key") }}</label>
                      <v-text-field
                        v-model="connectBankPartnerService.merchant.apiKey"
                        outlined
                      />
                    </div>

                    <label class="label">{{ $t("bank_account") }}</label>
                    <v-select
                      class="mt-1"
                      placeholder="Select Bank Account"
                      v-model="bankAccount"
                      :items="bankAccounts"
                      item-text="number"
                      item-value="uuid"
                      return-object
                      outlined
                    >
                      <template slot="selection" slot-scope="{ item }">
                        {{ item.number }} ({{ item.currency.code }})
                      </template>
                      <template slot="item" slot-scope="{ item }">
                        {{ item.bank.abbr }} {{ item.number }} ({{
                          item.currency.code
                        }})
                      </template>
                    </v-select>

                    <v-alert
                        type="warning"
                        v-model="alert"
                        dismissible
                    >
                        <span v-html="errorMessage"/>
                    </v-alert>

                    <v-btn
                      width="100%"
                      color="primary"
                      class=" mt-4 white--text "
                      @click="onSaveOptionClick"
                    >
                      <v-icon size="13" class="mr-2 white--text"
                        >mdi-key</v-icon
                      >
                      <span class="white--text text-capitalize">{{
                        $t("connect_collection_account")
                      }}</span>
                    </v-btn>
                  </v-col>
                  <v-col sm="12" cols="12">
                    <p class="text-center mb-2">
                      <v-icon size="13" class="mr-2 black--text"
                        >mdi-key</v-icon
                      >
                      {{ $t("at_banhJi_the_privacy") }}
                    </p>
                  </v-col>
                </v-row>
                <v-row v-if="showCongrat">
                  <v-col class="" min-height="500">
                    <h2
                      class="primary--text text-center d-block font_4em my-10 mt-16 fade-in"
                    >
                      {{ $t("congratulation") }}
                    </h2>

                    <p class="text-center mb-0 font_20">
                      {{ $t("your_collection_account") }}
                    </p>

                    <p class="text-center mb-2">
                      <v-icon size="14" class="mr-2 black--text"
                        >mdi-key</v-icon
                      >
                      {{ $t("at_banhJi_the_privacy") }}
                    </p>
                  </v-col>
                </v-row>
              </v-card>
            </v-form>
          </v-card>

          <LoadingMe
            type="loading"
            :isLoading="showLoading"
            :myLoading="true"
            :fullPage="true"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { i18n } from "@/i18n";
// import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";
import BankPartnerServiceModel from "@/scripts/model/banking/BankPartnerService.js";
import ConnectBankPartnerServiceModel from "@/scripts/model/banking/ConnectBankPartnerService.js";
// import AccountModel from "@/scripts/model/Account.js";
import BankAccountModel from "@/scripts/model/BankAccount.js";

/* Store */
import store from "@/store";
const institute = store.state.institute.institute;

const BankPartnerServiceHandler = require("@/scripts/handler/banking/BankPartnerService.js");
const bankAccountHandler = require("@/scripts/bankAccountHandler.js");

export default {
  name: "ConnectBillPaymentAccount",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  props: {
    initBankPartnerService: {
      type: BankPartnerServiceModel,
    },
  },
  data: () => ({
    bankPartnerService: new BankPartnerServiceModel(),
    bankAccount: new BankAccountModel(),
    bankAccounts: [],
    bankAccountBk: [],
    connectBankPartnerService: new ConnectBankPartnerServiceModel(),
    // Form validation
    valid: true,
    alert: false,
    errorMessage: "",
    showCongrat: false,
    // LoadingMe
    showLoading: false,
  }),
  methods: {
    // Initial Data
    initialData() {
      this.bankPartnerService = this.initBankPartnerService;
      this.setDefaultData();
      this.filterBank();
    },
    // Set default brand new data
    setDefaultData() {
      this.connectBankPartnerService = new ConnectBankPartnerServiceModel({
        instituteName: institute.name,
        fi: this.bankPartnerService.name,
        serviceType: this.bankPartnerService.type,
        image: this.bankPartnerService.image,
      });
    },
    // Shrink Data
    shrinkData() {
      this.connectBankPartnerService.coa = this.bankAccount;
    },
    // Validating
    validateForm() {
      let result = true, msg = "";

      // Non select account
      if (this.bankAccount.uuid === '') {
          msg += `<p>${i18n.t("bank_account_is_required")}</p>`;
          result = false;
      }

      // Show Alert
      this.errorMessage = msg;
      this.alert = false;
      if (result === false) {
          this.alert = true;
      }

      return result;
    },
    // All Saves
    onSaveOptionClick() {
        if (this.$refs.form.validate() && this.validateForm()) {
          this.save();
        }
    },
    cancel() {
      this.$swal({
        title: i18n.t("msg_title_warning"),
        text: i18n.t("msg_discard"),
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: i18n.t("cancel"),
        confirmButtonColor: "#4d4848",
        cancelButtonColor: "#ED1A3A",
        confirmButtonText: i18n.t("discard"),
      }).then((result) => {
        if (result.value) {
          this.clear();
          this.setDefaultData();
          this.$router.go(-1);
        }
      });
    },
    clear() {
      // Reset Form
      // this.$refs.form.reset();
      this.showCongrat = false;
    },
    save() {
      /* Shrink Data */
      this.shrinkData();

      // Sync Data
      this.showLoading = true;
      BankPartnerServiceHandler.connect(
        this.bankPartnerService.id,
        this.connectBankPartnerService
      )
        .then((response) => {
          this.responseStatus(response);
        })
        .catch((error) => {
          Helper.alertErrorMsg(error);
        })
        .finally(() => {
          this.showLoading = false;
        });
    },
    // Response Status
    responseStatus(response) {
      if (response.status === 200) {
        this.showCongrat = true;

        this.clear();
        this.setDefaultData();
        this.$router.go(-1);

        /* Alert Success */
        this.$snotify.success(i18n.t("successful"));
      } else {
        /* Alert Error */
        this.$snotify.error(i18n.t("error_something_wrong"));
      }
    },
    filterBank() {
      let banks = [];
      if (this.bankAccountBk.length > 0) {
        banks = this.bankAccountBk.filter(
          (item) =>
            String(item.bank.number) ===
            String(this.bankPartnerService.bankNumber)
        );
      }

      this.bankAccounts = banks;
    },
  },
  watch: {
    initBankPartnerService() {
      this.initialData();
    },
  },
  created() {
    // Call Bank Account List
    bankAccountHandler.getAll().then((res) => {
      let bankAccountList = [];
      res.data.forEach((value) => {
        let bankAcct = new BankAccountModel(value);
        bankAccountList.push(bankAcct);
      });
      this.bankAccountBk = bankAccountList;
      this.filterBank();
    });
  },
  mounted() {
    // Initial Data
    this.initialData();
  },
};
</script>
<style scoped>
.borderRadius20 {
  border-radius: 20% !important;
}

.function_content {
  padding: 10px 25px 25px;
  border-bottom: 0;
}

@media (min-width: 1264px) {
  .container {
    max-width: 1080px !important;
  }
}

@media (max-width: 576px) {
}
</style>
