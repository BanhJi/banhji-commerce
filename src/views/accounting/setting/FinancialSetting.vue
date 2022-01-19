<template>
  <v-row class="">
    <v-col sm="12" cols="12">
      <h2 class="mb-0 font_20">{{ $t("accounting_setting") }}</h2>
      <v-dialog v-model="dialog" scrollable max-width="700px">
        <template v-slot:activator="{ on }">
          <v-btn
            class="white--text float-right text-capitalize"
            color="primary"
            v-on="on"
          >
            {{ $t("edit") }}
          </v-btn>
        </template>

        <v-card>
          <div class="modal_header">
                      <v-card-title>{{ $t("accounting_setting") }}</v-card-title>
          <v-icon  @click="dialog = false">close</v-icon>
          </div>
          <v-card-text class="modal_text_content">
            <v-row class="mt-3">
              <v-col sm="6" cols="12" class="py-0">
                <label class="label">{{ $t("fiscal_date") }}</label>
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="true"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      class="mt-1"
                      v-model="fishScaleDate"
                      readonly
                      hint=""
                      persistent-hint
                      tage="Fiscal Date(Ending Date)"
                      outlined
                      dense
                      append-icon="event"
                      @blur="date = fishScaleDate"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="fishScaleDate"
                    no-title
                    @input="menu1 = false"
                  />
                </v-menu>

                <label class="label">{{ $t("reporting_currency") }}</label>
                <v-select
                  class="mt-1"
                  :items="reporting_currency"
                  v-model="reportingCurrency"
                  item-value="code"
                  item-text="name"
                  label=""
                  outlined
                />
              </v-col>
              <v-col sm="6" cols="12" class="py-0">
                <!-- <label class="label">{{ $t('closing_date') }}</label>
                                <v-menu
                                    ref="menu2"
                                    v-model="menu2"
                                    max-width="290px"
                                    min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field class="mt-1"
                                                      v-model="closingDate"
                                                      readonly
                                                      hint=""
                                                      persistent-hint
                                                      outlined
                                                      tage="Closeing Date"
                                                      dense
                                                      append-icon="event"
                                                      @click:append="menu2 = true"
                                                      @blur="date_recurring =closingDate"
                                                      v-on="on"/>
                                    </template>
                                    <v-date-picker v-model="closingDate" no-title
                                                   @input="menu2 = false"/>
                                </v-menu>
                                <label class="labek">{{ $t('password') }}</label>
                                <v-text-field class="mt-1"
                                              v-model="closingPwd"
                                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                              tage='Password'
                                              :type="show1 ? 'text' : 'password'"
                                              name="input-10-1"
                                              label=""
                                              hint=""
                                              outlined
                                              @click:append="show1 = !show1"/> -->
                <label class="label">{{ $t("accounting_standard") }}</label>
                <v-select
                  class="mt-1"
                  :items="accounting_standard"
                  v-model="accountingStandardCode"
                  item-value="code"
                  item-text="name"
                  label=""
                  outlined
                />

                <label class="label">{{ $t("time_zone") }}</label>
                <template>
                  <model-list-select
                    :list="time_zone"
                    class="mt-1"
                    v-model="timeZone"
                    option-value="value"
                    option-text="value"
                    dense
                    outlined
                    placeholder="select timezone"
                  >
                  </model-list-select>
                </template>
              </v-col>
              <v-col sm="6" cols="12" class="py-0">
                <label class="label">{{ $t("after_reporting_period") }}</label>
                <v-menu
                  ref="menu3"
                  v-model="menu3"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      class="mt-0"
                      v-model="afterClosingDatePeriod"
                      hint=""
                      persistent-hint
                      outlined
                      dense
                      tage="After Reporting Period"
                      readonly
                      append-icon="event"
                      @click:append="menu3 = true"
                      @blur="date_recurring = afterClosingDatePeriod"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="afterClosingDatePeriod"
                    no-title
                    @input="menu3 = false"
                  />
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions class="modal_footer">
            <v-btn color="primary" class="white--text capitalize" @click="onSave"
              >{{$t('save_close')}}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <p class="mb-0">{{ $t("accounting_setting_sub") }}</p>
      <table class="acc_setting">
        <tr>
          <td class="text-bold" width="17.5%">{{ $t("fiscal_date") }}</td>
          <td width="17.5%">
            <p class="third text-bold">{{ fiscalDate }}</p>
          </td>
          <td>
            {{ $t("setting_desc_1") }}
          </td>
        </tr>
        <tr>
          <td class="text-bold">{{ $t("base_currency") }}</td>
          <td>
            <p class="third text-bold">
              {{ baseCurrency.code }} - {{ baseCurrency.symbol }}
            </p>
          </td>
          <td>
            {{ $t("setting_desc_2") }}
          </td>
        </tr>
        <tr>
          <td class="text-bold">{{ $t("reporting_currency") }}</td>
          <td>
            <p class="third text-bold">
              {{ reportingCurrency.code }} - {{ reportingCurrency.symbol }}
            </p>
          </td>
          <td>
            {{ $t("setting_desc_3") }}
          </td>
        </tr>
        <!-- <tr>
                    <td class="text-bold">{{ $t('closing_date') }}</td>
                    <td>
                        <p class="third text-bold">{{ closingDateShort }}</p>
                    </td>
                    <td>
                        {{ $t('setting_desc_4') }}
                    </td>
                </tr> -->
        <tr>
          <td class="text-bold">{{ $t("approved_reporting_date") }}</td>
          <td>
            <p class="third text-bold">
              {{
                new Date(approvedReportingDate).toLocaleString("en-us", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              }}
            </p>
          </td>
          <td>
            {{ $t("acc_setting_desc_4") }}
          </td>
        </tr>
        <tr>
          <td class="text-bold">{{ $t("time_zone") }}</td>
          <td>
            <p class="third text-bold">{{ timeZone.name }}</p>
          </td>
          <td>
            {{ $t("acc_setting_desc_5") }}
          </td>
        </tr>
        <!-- <tr>
                    <td class="text-bold">{{ $t('accounting_standard') }}</td>
                    <td colspan="2">
                        <p class="text_bold">{{ accountingStandard }}</p>
                    </td>
                </tr> -->
        <!-- <tr>
                    <td class="text-bold">{{ $t('time_zone') }}</td>
                    <td colspan="2">
                        <p class="text_bold">{{ timezone }}</p>
                    </td>
                </tr> -->
      </table>
    </v-col>
  </v-row>
</template>

<script>
const axios = require("axios");
import apiUrl from "@/apiUrl";
//import moment from 'moment'
import { ModelListSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";
const jwt = require('jsonwebtoken');

/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const CryptoJS = require("crypto-js");
const instituteHandler = require("@/scripts/instituteHandler");

export default {
  data: () => ({
    base_currency: [],
    reporting_currency: [],
    accounting_standard: [],
    time_zone: [],
    date: new Date().toISOString().substr(0, 10),
    date_recurring: new Date().toISOString().substr(0, 10),
    // dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    // dateFormatted_recurring: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    menu3: false,
    dialogm1: "",
    dialog: false,
    show1: false,
    password: "Password",
    fishScaleDate: "",
    fishScaleDateShort: "",
    currency: "",
    accountingStandard: "",
    accountingStandardCode: "",
    closingPwd: "",
    closingDate: "",
    afterClosingDatePeriod: "",
    closingDateShort: "",
    timeZone: "",

    mInstitute: {},
    company: {},
    fiscalDate: "",
    baseCurrency: {},
    reportingCurrency: {},
  }),
  props: {},
  watch: {
    // date() {
    //     this.dateFormatted = this.formatDate(this.fishScaleDate)
    // },
    // date_recurring() {
    //     this.dateFormatted_recurring = this.formatDate(this.date_recurring)
    // },
  },
  methods: {
    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
      }
      return "";
    },
    async getCookieData() {
        var cookie = this.getCookie ('banhji-token')
        jwt.verify(cookie,process.env.VUE_APP_JWT_SESCRET, (err, decoded) => {
            if (!err) {
                this.mInstitute = decoded
                window.console.log(this.mInstitute, 'mInstisdfas')
            }
        })
        // this.mInstitute = store.default.state.cookies
      // const cookie = this.getCookie("banhji-token");
      // if (cookie !== "") {
      //   let data = JSON.parse(cookie);
      //   this.mInstitute = {
      //     id: data.instituteId,
      //     name: data.email,
      //     email: data.email,
      //     user: data.user,
      //     creator: data.creator,
      //   };
      // }
      // window.console.log(this.mInstitute);
    },
    clickMe(data) {
      // alert(data.link)
      this.$router.push(`${data.link}`);
      //this.$event.target.classList.toggle(active)
      //eslint-disable-next-line no-console
      console.log(data.link);
      //eslint-disable-next-line no-console
      //console.log(data)
    },
    async loadDropDown() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          axios.get(apiUrl.dropdown).then((res) => {
            this.base_currency = res.data.base_currency;
            this.reporting_currency = res.data.reporting_currency;
            this.accounting_standard = res.data.accounting_standard;
            this.time_zone = res.data.timezones;
          });
        }, 2000);
      });
    },
    async loadInstituteInfo() {
      new Promise((resolve) => {
        setTimeout(() => {
          instituteHandler.getOneCompany(this.mInstitute.instituteId).then((res) => {
            // store.default.commit("setCompany", res);
            this.company = res;
            this.baseCurrency = res.baseCurrency;
            this.reportingCurrency = res.reportingCurrency;
            this.timeZone = res.timeZone;
            const d = new Date(res.fiscalDate[0].end_date).toLocaleString(
              "en-us",
              {
                day: "numeric",
                month: "short",
              }
            );
            this.fiscalDate = d;
          });
          resolve("resolved");
          // axios.get(apiUrl.institute_get)
          //     .then(res => {
          //         let data = []
          //         if (res.data.data.length > 0) {
          //             if (res.data.data.length > 1) {
          //                 data = res.data.data[1]
          //             } else {
          //                 data = res.data.data[0]
          //             }
          //         }
          //         // eslint-disable-next-line no-console
          //         // console.log(res.data.data[0].fishScaleDate)
          //         this.fishScaleDate = data.fishScaleDate
          //         // this.fishScaleDateShort = moment(String(res.data.data[0].fishScaleDate)).format('DD MMM')
          //         this.fishScaleDateShort = new Date(data.fishScaleDate).toLocaleString('en-us', {
          //             month: 'long',
          //             day: 'numeric'
          //         })
          //         this.currency = data.currency
          //         this.reportingCurrency = data.reportCurrency
          //         this.accountingStandard = data.accountingStandard.name
          //         this.accountingStandardCode = data.accountingStandard.code
          //         this.timezone = data.timezone
          //         this.closingPwd = CryptoJS.AES.decrypt(data.closingDatePassword, instituteId).toString(CryptoJS.enc.Utf8)
          //         this.closingDate = data.closingDate
          //         this.afterClosingDatePeriod = data.afterClosingDatePeriod
          //         // this.closingDateShort = moment(String(res.data.data[0].closingDate)).format('DD MMM YYYY')
          //         this.closingDateShort = new Date(data.closingDate).toLocaleString('en-us', {
          //             month: 'long',
          //             day: 'numeric'
          //         })
          //         this.approvedReportingDate = new Date(res.data.data[0].afterClosingDatePeriod).toLocaleString('en-us', {
          //             month: 'long',
          //             day: 'numeric'
          //         })
          //     })
        }, 500);
      });
    },
    async onSave() {
      // eslint-disable-next-line no-console
      // console.log(store.default.state.creator);
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          axios
            .put(apiUrl.institute_put, {
              // "creator": store.default.state.creator,
              // "pk": store.default.state.institute_id,
              currency: {
                code: this.currency,
              },
              reportCurrency: {
                code: this.reportingCurrency,
              },
              accountingStandard: {
                code: this.accountingStandardCode,
                name: this.accountingStandard,
              },
              timezone: this.timezone,
              zipCode: this.zipCode,
              fishScaleDate: this.fishScaleDate,
              closingDate: this.closingDate,
              afterClosingDatePeriod: this.afterClosingDatePeriod,
              closingDatePassword: CryptoJS.AES.encrypt(
                this.closingPwd,
                instituteId
              ).toString(),
              closingStatus: 1,
            })
            .then((response) => {
              // eslint-disable-next-line no-console
              console.log(response);
              this.dialog = false;
              this.loadInstituteInfo();
            })
            .catch((e) => {
              this.errors.push(e);
            });
        }, 500);
      });
    },
  },
  components: { ModelListSelect },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    approvedReportingDate() {
      if (this.company.approvedReportingDate) {
        return this.company.approvedReportingDate;
      } else {
        return new Date();
      }
    },
  },
  mounted: async function() {
    await this.loadDropDown();
    await this.getCookieData();
    await this.loadInstituteInfo();
  },
};
</script>
<style scoped>
table.acc_setting {
  border: 1px solid #ccc;
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  color: #000;
}

table.acc_setting tr td {
  border: 1px solid #ccc;
  padding: 8px;
  vertical-align: middle;
}

table.acc_setting tr td p.third {
  margin-bottom: 0;
  background-color: #f44336;
  padding: 7px 15px;
  color: #fff;
  font-weight: 700;
  text-align: center;
}

table.acc_setting tr td p.text_bold {
  font-weight: 700;
  margin-bottom: 0;
}

table.acc_setting tr td:first-child {
  font-weight: 700;
}

.btn_edit {
  background-color: #21abf6 !important;
  text-transform: capitalize;
}

.function_footer {
  padding: 15px;
  display: inline-block;
}

.v-card__actions .v-btn.v-btn {
  padding: 0 16px;
}

@media (max-width: 576px) {
}
</style>
