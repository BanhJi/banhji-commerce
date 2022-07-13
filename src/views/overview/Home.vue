<template>
  <v-app class="zoom-in">
      <v-container>
        <v-row class="mt-0">
          <v-col sm="12" cols="12" class="pa-0">
            <v-card elevation="0" color="grayBg">
              <div class="d_centerd_b">
                <div>
                  <v-row>
                    <v-col sm="4" cols="12" class="pb-0 mt-4">
                      <v-card
                        outlined
                        dense
                        class="pa-4 raduis_10  no_border "
                        style="background-color: #f8f8f9 !important;"
                        
                      >
                        <p class="mb-3">{{time}}</p>
                        <h1 class=" third--text">
                            {{ $t("welcome") }}
                        </h1>
                        <p class="mb-1 mt-3 niradei_light">{{$t('your_entity_name')}}</p>
                        <h1 class="font_22">
                          {{ mInstitute.name }}
                        </h1>
                        <p class="mb-1 mt-3 niradei_light">{{$t('subscribed_edition')}}</p>
                        <v-card color="primary" class="pa-3 white--text no_border">
                          <h3 class="text-uppercase">{{planName}} Edition</h3>
                        </v-card>
                        <p class="mb-2 mt-4 niradei_light">{{$t('your_entity_banhji_id')}}</p>
                        <v-card @click="copyTextClip" color="third" class="pa-3 white--text no_border copy">
                          <span class="copy_t" id="copy_t">Copy</span>
                          <h3 id="institute" class="font_24">{{mInstitute.instituteId ? mInstitute.instituteId.split('-')[1].replace(/\B(?=(\d{3})+(?!\d))/g, " "): ''}}</h3>
                        </v-card>
                        <p class=" mt-2 mb-0 niradei_light" :class="{'line_16':this.$i18n.locale=='kh'}">{{$t('overview_desc')}}</p>
                      </v-card>
                    </v-col>
                    <v-col sm="8" cols="12" class="pl-2 pb-0">
                      <v-row class="mx-0">
                        <v-col sm="6" class="pa-0 pt-4" cols="12">
                          <v-card
                            color="white"
                            outlined
                            :to="lang + '/sale_channels'"
                            dense
                            class="pa-4 mx-2 raduis_10 pop no_border pop d-flex"
                            min-height="160"
                          >
                            <v-row> 
                              <v-col sm="4" cols="12" class="pb-0"> <i style="font-size: 85px" class="red_icon b-sale_channel" /></v-col>                      
                              <v-col md="8" sm="12" cols="12" class="pb-0">
                                <h1 class="font_size_overview third--text" :class="{'line_25':this.$i18n.locale=='kh'} ">
                                  {{ $t("sale_channels") }}
                                </h1>
                                <p class="mt-2 niradei_light  niradei_light_1 mb-0">
                                  {{ $t("multi_channels_orders_desc") }}
                                </p>
                              </v-col>
                                
                            </v-row>  
                          </v-card>
                        </v-col>
                        <v-col sm="6" class="pa-0 pt-4" cols="12">
                          <v-card
                            color="white"
                            outlined
                            :to="lang + '/pricing'"
                            dense
                            class="pa-4 mx-2 raduis_10 pop no_border pop d-flex"
                            min-height="160"
                          >
                          <v-row> 
                              <v-col sm="4" cols="12" class="pb-0">
                                <i style="font-size: 85px" class="red_icon b-pricing" />
                              </v-col>
                              <v-col md="8" sm="12" cols="12" class="pb-0">
                                <h1 class="font_size_overview third--text" :class="{'line_25':this.$i18n.locale=='kh'} ">
                                  {{ $t("pricing_manangement") }}
                                </h1>
                                <p class="mt-2 niradei_light  niradei_light_1 mb-0">
                                  {{ $t("pricing_manangement_desc") }}
                                </p>
                              </v-col>
                          </v-row>
                          </v-card>
                        </v-col>
                        <v-col sm="6" class="pa-0 pt-4" cols="12">
                          <v-card
                            color="white"
                            outlined
                            :to="lang + '/marketing_promotions'"
                            dense
                            class="pa-4 mx-2 raduis_10 pop no_border pop d-flex"
                            min-height="160"
                          >
                          <v-row> 
                              <v-col sm="4" cols="12" class="pb-0"> 
                                <i style="font-size: 85px" class="red_icon b-loyalty" />
                              </v-col>
                              <v-col md="8" sm="12" cols="12" class="pb-0">
                                <h1 class="font_size_overview third--text" :class="{'line_25':this.$i18n.locale=='kh'} ">
                                  {{ $t("marketing_promotions") }}
                                </h1>
                                <p class="mt-2 niradei_light  niradei_light_1 mb-0">
                                  {{ $t("loyalty_reward_promotion_desc") }}
                                </p>
                              </v-col>
                          </v-row>
                          </v-card>
                        </v-col>
                        <v-col sm="6" class="pa-0 pt-4" cols="12">
                          <v-card
                            color="white"
                            outlined
                            :to="lang + '/loyalty_reward'"
                            dense
                            class="pa-4 mx-2 raduis_10 pop no_border pop d-flex"
                            min-height="160"
                          >
                          <v-row> 
                              <v-col sm="4" cols="12" class="pb-0"> 
                                <i style="font-size: 85px" class="red_icon b-reward" />
                              </v-col>
                              <v-col md="8" sm="12" cols="12" class="pb-0">
                                <h1 class="font_size_overview third--text" :class="{'line_25':this.$i18n.locale=='kh'} ">
                                  {{ $t("loyalty_reward") }}
                                </h1>
                                <p class="mt-2 niradei_light  niradei_light_1 mb-0">
                                  {{ $t("loyalty_reward_promotion_desc") }}
                                </p>
                              </v-col>
                          </v-row>

                          </v-card>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col sm="12" cols="12">
                      <v-row class="mx-0">
                        <v-col sm="4" class="pa-0 pb-4"  cols="12">
                          <v-card
                            color="primary"
                            outlined
                            dense
                            :to="lang + '/e_commerce'"
                            class="pa-4 mx-2 raduis_10 pop no_border pop d-flex"
                            min-height="160"
                          >
                          <v-row> 
                              <v-col sm="4" cols="12" class="pb-0"> 
                                <i style="font-size: 85px" class="white_icon b-e_commerce" />
                              </v-col>
                              <v-col md="8" sm="12" cols="12" class="pb-0">
                                  <h1 class="font_size_overview  white--text" :class="{'line_25':this.$i18n.locale=='kh'}">
                                    {{ $t("e_commerce") }}
                                  </h1>
                                  <p class="mt-2 niradei_light  niradei_light_1 mb-0 white--text">
                                    {{ $t("point_of_sale_desc2") }}
                                  </p>
                              </v-col>
                          </v-row>
                          </v-card>
                        </v-col>
                        <v-col sm="4" class="pa-0 pb-4"  cols="12">
                          <v-card
                            color="primary"
                            outlined
                            dense
                            :to="lang + '/payments'"
                            class="pa-4 mx-2 raduis_10 pop no_border pop d-flex"
                            min-height="160"
                          >
                            <v-row> 
                                <v-col sm="4" cols="12" class="pb-0"> 
                                  <i style="font-size: 85px" class="white_icon b-payment" />
                                </v-col>
                                <v-col md="8" sm="12" cols="12" class="pb-0">
                                    <h1 class="font_size_overview  white--text" :class="{'line_25':this.$i18n.locale=='kh'}">
                                      {{ $t("payments") }}
                                    </h1>
                                    <p class="mt-2 niradei_light  niradei_light_1 mb-0 white--text">
                                      {{ $t("payment_desc") }}
                                    </p>
                                </v-col>
                            </v-row>
                          </v-card>
                        </v-col>
                        <v-col sm="4" class="pa-0 pb-4"  cols="12">
                          <v-card
                            color="primary"
                            outlined
                            dense
                            :to="lang + '/stores'"
                            class="pa-4 mx-2 raduis_10 pop no_border d-flex"
                            min-height="160"
                          >
                            <v-row> 
                                <v-col sm="4" cols="12" class="pb-0"> 
                                  <i style="font-size: 85px" class="white_icon b-pos" />
                                </v-col>
                                <v-col md="8" sm="12" cols="12" class="pb-0">
                                    <h1 class="font_size_overview  white--text" :class="{'line_25':this.$i18n.locale=='kh'}">
                                      {{ $t("stores") }}
                                    </h1>
                                    <p class="mt-2 niradei_light  niradei_light_1 mb-0 white--text">
                                      {{ $t("point_of_sale_desc2") }}
                                    </p>
                                </v-col>
                            </v-row>
                          </v-card> 
                        </v-col>
                      </v-row>
                    </v-col>  
                  </v-row>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </v-app>
</template>

<script>
import { i18n } from "@/i18n";
/* Cookie */
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
import { dataStore } from "@/observable/store";
export default {
  components: {
    // LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    //Bar
    isLoading: true,
    institutes: [],
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
    time: '',
    mInstitute: cookie,
    planName: ''
  }),
  mounted: async function () {
    this.setTime();
    if (this.mInstitute.plan == 1) {
      this.planName = "Standard";
    } else if (this.mInstitute.plan == 2) {
      this.planName = "Premium";
    } else if (this.mInstitute.plan == 3) {
      this.planName = "Advanced";
    } else if (this.mInstitute.plan == 4) {
      this.planName = "Cooperative";
    } else if (this.mInstitute.plan == 6) {
      this.planName = "Nonprofit";
    } else if (this.mInstitute.plan == 7) {
      this.planName = "Public Sector";
    } else if (this.mInstitute.plan == 8) {
      this.planName = "Micro Edition";
    }
  },
  methods: {
    setTime () {
      this.interval = setInterval(() => {
          this.time = Intl.DateTimeFormat(navigator.language, {
              day: '2-digit',
              month: 'short',
              weekday: 'long',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric'
          }).format()
      }, 1000)
    },
  copyTextClip() {
  /* Get the text field */
  var copyText = document.getElementById("institute");
  var status = document.getElementById("copy_t");
   navigator.clipboard.writeText(copyText.innerHTML.replace(/\s/gm, '')).then(function() {
    status.innerText = 'Copied'
    setTimeout(()=> {
          status.innerText = 'Copy'
    },3000)
  }, function(err) {
    status.innerText = 'Failded'
    window.console.error('Async: Could not copy text: ', err);
  });
}
  },
  beforeDestroy() {
        // prevent memory leak
        clearInterval(this.interval)
  },
  computed: {
    lang() {
      return "/" + i18n.locale;
    },
    planType(){
      return dataStore.productType
    }
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
  font-family: "Niradei-Heavy" !important;
  font-size: 20px !important;
  line-height: 18px;
}
.p_style{
  line-height: 13px;
  font-size: 11px !important;
  margin-top: 4px;
}
.font_size_digital {
  font-family: "Niradei-Medium" !important;
  font-size: 24px !important;
  line-height: 28px;
  margin-left: 12px;
}
.image_logo {
  height: 130px;
  margin: auto;
}
.niradei_light {
  font-size: 12px !important;
}
.niradei_light_1 {
  font-size: 12px !important;
  line-height: normal;
}
.raduis_10{
  border-radius: 10px !important;
}
.copy:hover span{
  visibility: visible;
  transition: 0.2s;
}
.copy_t{
    visibility: hidden;
    position: absolute;
    right: 6px;
}
@media (max-width: 576px) {
}
</style>
