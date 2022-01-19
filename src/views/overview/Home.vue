<template>
  <v-row class="mt-0">
    <v-col sm="12" cols="12" class="pa-0">
      <v-card elevation="0" color="grayBg">
        <div class="d_centerd_b">
          <div>
            <v-row class="mx-0">
              <v-col class="pa-0" sm="3" cols="12">
                <v-card
                  color="white"
                  outlined
                  dense
                  class="pa-6 mr-2 ml-2 d-flex no_border"
                  min-height="150"
                >
                  <img
                    class="image_logo"
                    src="@/assets/images/Vertical-DarkBlue.png"
                  />
                  <h1 class="font_size_overview mt-2 font_size_digital third--text">
                    {{ $t("digital_financial_platform") }}
                  </h1>
                </v-card>
              </v-col>
              <v-col sm="3" class="pa-0" cols="12">
                <v-card
                  color="white"
                  outlined
                  :to="this.$i18n.locale + '/customers'"
                  dense
                  class="pa-6 mx-2 d-flex no_border"
                  min-height="150"
                >
                  <i style="font-size: 90px" class="red_icon b-recivable" />
                  <div>
                    <h1 class="font_size_overview third--text">
                      {{ $t("receivables_revenue") }}
                    </h1>
                    <p class="mb-0 ml-3 niradei_light">
                      {{$t('overview_p_1')}}
                    </p>
                  </div>
                </v-card>
              </v-col>
              <v-col class="pa-0" sm="3" cols="12">
                <v-card
                  color="white"
                  outlined
                  dense
                  :to="this.$i18n.locale + '/vendors'"
                  class="pa-6 d-flex mx-2 no_border"
                  min-height="150"
                >
                  <i style="font-size: 90px" class="red_icon b-payable" />
                  <div>
                      <h1 class="font_size_overview third--text">
                        {{ $t("suppliers_purchases") }}
                      </h1>
                      <p class="mb-0 ml-3 niradei_light">
                        {{$t('overview_p_2')}}
                      </p>
                    </div>
                </v-card>
              </v-col>
              <v-col class="pa-0" sm="3" cols="12">
                <v-card
                  color="white"
                  outlined
                  dense
                  :to="this.$i18n.locale + '/payroll'"
                  class="pa-6 d-flex mx-2 no_border"
                  min-height="150"
                >
                  <i style="font-size: 90px" class="red_icon b-payroll" />
                  <div>
                      <h1 class="font_size_overview third--text">
                        {{ $t("employee_payroll") }}
                      </h1>
                      <p class="mb-0 ml-3 niradei_light">
                        {{$t('overview_p_3')}}
                      </p>
                  </div>
               
                </v-card>
              </v-col>
            </v-row>
            <v-row class="mx-0 mt-4">
              <v-col class="pa-0" sm="3" cols="12">
                <v-card
                  color="white"
                  outlined
                  dense
                  :to="this.$i18n.locale + '/products'"
                  class="pa-6 ml-2 mr-2 d-flex no_border"
                  min-height="150"
                >
                  <i style="font-size: 90px" class="red_icon b-product" />
                  <div>
                       <h1 class="font_size_overview third--text">
                        {{ $t("product") }}
                      </h1>
                      <p class="mb-0 ml-3 niradei_light">
                        {{$t('overview_p_4')}}
                      </p>
                  </div>
                </v-card>
              </v-col>
              <v-col sm="3" class="pa-0" cols="12">
                <v-card
                  color="white"
                  outlined
                  dense
                  :to="this.$i18n.locale + '/services'"
                  class="pa-6 mx-2 d-flex no_border"
                  min-height="150"
                >
                  <i style="font-size: 90px" class="red_icon b-service" />
                  <div>
                      <h1 class="font_size_overview third--text">
                        {{ $t("services_projects_non") }}
                      </h1>
                      <p class="mb-0 ml-3 niradei_light">
                        {{$t('overview_p_5')}}
                      </p>
                  </div>
                </v-card>
              </v-col>
              <v-col class="pa-0" sm="3" cols="12">
                <v-card
                  color="white"
                  outlined
                  dense
                  :to="this.$i18n.locale + '/budgeting'"
                  class="pa-6 pb-4 mx-2 d-flex no_border"
                  min-height="150"
                >
                  <i style="font-size: 90px" class="red_icon b-budget" />
                  <div>
                      <h1 class="font_size_overview third--text">
                        {{ $t("budgeting_meta") }}
                      </h1>
                      <p class="mb-0 ml-3 niradei_light">
                        {{$t('overview_p_6')}}
                      </p>
                  </div>
                </v-card>
              </v-col>
              <v-col class="pa-0" sm="3" cols="12">
                <v-card
                  color="white"
                  outlined
                  dense
                  :to="this.$i18n.locale + '/accounting'"
                  class="pa-6 mx-2 d-flex no_border"
                  min-height="150"
                >
                  <i style="font-size: 90px" class="red_icon b-accounting" />
                  <div>
                      <h1 class="font_size_overview third--text">
                        {{ $t("accounting_reports") }}
                      </h1>
                      <p class="mb-0 ml-3 niradei_light">
                        {{$t('overview_p_7')}}
                      </p>
                  </div>
              
                </v-card>
              </v-col>
              <!-- <v-col class="pa-0" sm="3" cols="12">
                            <v-card
                                color="white"
                                outlined
                                dense
                                :to="this.$i18n.locale+'/banking'"
                                class="pa-4 ml-2 no_border"
                                min-height="180"
                            >
                                <i style="font-size: 90px; color: #fff;"  class="b-banking"/>
                                <h1 class="mt-5 font_18 third--text">{{$t('banking')}}</h1>
                            </v-card>
                    </v-col> -->
            </v-row>
            <!-- small code -->
            <v-row class="mx-0 mt-4">
              <v-col sm="3" class="pa-0" cols="12">
                <v-card
                  color="primary"
                  outlined
                  dense
                  :to="this.$i18n.locale + '/banking'"
                  class="pa-6 pb-1 ml-2 mr-2 d-flex no_border"
                  min-height="150"
                >
                  <i style="font-size: 90px" class="b-banking white_icon" />
                  <div>
                      <h1 class="mt-0 font_size_overview ml-3 font_18 white--text">
                        {{ $t("banking_cash") }}
                      </h1>
                      <p class="mb-0 ml-3 white--text niradei_light">
                        {{$t('overview_p_8')}}
                      </p>
                  </div>
                </v-card>
              </v-col>
              <v-col class="pa-0" sm="3" cols="12">
                <v-card
                  color="primary"
                  outlined
                  dense
                  :to="this.$i18n.locale + '/payments'"
                  class="pa-6 pb-1 ml-2 mr-2 d-flex no_border"
                  min-height="150"
                >
                  <i style="font-size: 90px" class="b-payment white_icon" />
                  <div>
                      <h1 class="mt-0 font_size_overview ml-3 font_18 white--text">
                        {{ $t("digital_payment") }}
                      </h1>
                       <p class="mb-0 ml-3 white--text niradei_light">
                        {{$t('overview_p_9')}}
                      </p>
                  </div>

                </v-card>
              </v-col>
              <v-col class="pa-0" sm="3" cols="12">
                <v-card
                  color="primary"
                  outlined
                  dense
                  :to="this.$i18n.locale + '/finances'"
                  class="pa-6 ml-2 mr-2 d-flex no_border"
                  min-height="150"
                >
                  <i style="font-size: 90px" class="b-financing white_icon" />
                  <div>
                    <h1 class="mt-0 ml-3 font_size_overview font_18 white--text">
                      {{ $t("debt_financing") }}
                    </h1>
                    <p class="mb-0 ml-3 white--text niradei_light">
                        {{$t('overview_p_10')}}
                      </p>
                  </div>
      
                </v-card>
              </v-col>
              <v-col class="pa-0" sm="3" cols="12">
                <v-card
                  color="primary"
                  outlined
                  :to="this.$i18n.locale + '/compliance'"
                  dense
                  class="pa-6 pb-2 ml-2 mr-2 d-flex no_border"
                  min-height="150"
                >
                  <i style="font-size: 90px" class="b-compliance white_icon" />
                  <div>
                      <h1 class="mt-0 ml-3 font_size_overview font_18 white--text">
                        {{ $t("tax_report_compliance") }}
                      </h1>
                      <p class="mb-0 ml-3 white--text niradei_light">
                        {{$t('overview_p_11')}}
                      </p>
                  </div>

                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { i18n } from "@/i18n";
export default {
  components: {
    // LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    //Bar
    isLoading: true,
    institutes: [],
    mInstitute: {},
    asOf: new Date().toISOString().substr(0, 10),
    expectedBalance: 0,
    decimalFormat: "n2",
    lastUpdated: "",
    showLoading: false,
    showLoading1: false,
    showLoading2: false,
    expectedDue: [],
    insights: {},
    dayToPay: 0,
    dueThisWeekInvoice: 0,
    dueThisWeekPExpense: 0,
    amountToPayBalance: 0,
    amountToPay: [],
  }),
  mounted: async function () {},
  methods: {},
  computed: {
    lang() {
      return "/" + i18n.locale;
    },
  },
};
</script>
<style scoped>
.k-chart {
  height: 173px !important;
}

.five {
  font-weight: 700;
  font-size: 26px;
}

.theme--light.v-data-table {
  background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 41px !important;
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

/*.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {*/
/*    border-top: thin solid rgba(0, 0, 0, 0.12) !important;*/
/*}*/

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.border-bottom {
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.font-small {
  font-size: 12px;
  line-height: 15px;
}

.font-26 {
  font-size: 26px !important;
}

.round_checkbox label:after {
  content: "";
  height: 7px;
  left: 3px !important;
  opacity: 0;
  position: absolute;
  top: 4px !important;
}

.round_checkbox label {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  height: 20px !important;
  left: 0;
  position: absolute;
  top: 0;
  width: 20px !important;
}

.dark_grey {
  color: #7e7a7a;
}

.font_19 {
  font-size: 19px;
}

.d_center {
  height: 100vh;
  display: flex;
  justify-content: center;
  /* align-content: center; */
  align-items: center;
}
.font_size_overview {
  font-family: "Niradei-Medium" !important;
  font-size: 18px !important;
  line-height: 20px;
  margin-left: 12px;
}
.font_size_digital{
    font-family: "Niradei-Medium" !important;
    font-size: 24px !important;
    line-height: 28px;
    margin-left: 12px;
}
.image_logo {
  height: 100px;
}
.niradei_light{
  font-size: 12px !important;
}
@media (max-width: 576px) {
}
</style>
