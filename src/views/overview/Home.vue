<template>
  <v-app class="zoom-in">
      <v-container>
        <v-row class="mt-4">
          <v-col sm="12" cols="12" class="pa-0">
            <v-card elevation="0" color="grayBg">
              <div class="d_centerd_b">
                <div>
                  <v-row>
                    <v-col class="py-0 pl-md-2" sm="4" cols="12">
                      <v-card
                        color="white"
                        outlined
                        dense
                        class="pa-6 raduis_10  no_border "
                        :min-height="this.$i18n.locale=='kh' ? 382 : 378"
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
                    <v-col class="py-0 pl-md-2" sm="4" cols="12">
                      <v-card
                        color="white"
                        outlined
                        dense
                        class="pa-6 raduis_10  no_border "
                        :min-height="this.$i18n.locale=='kh' ? 382 : 378"
                      >
                        
                        <i style="font-size: 100px" class="d-flex justify-center b-pos red_icon" />
                        
                        <h1 class="line_24 text-center font_20 my-4">
                          {{ $t("point_of_sale") }}
                        </h1>
                        <p class="text-center  mt-2 mb-0 niradei_light" :class="{'line_16':this.$i18n.locale=='kh'}">
                          {{ $t("point_of_sale_desc2") }}
                        </p>
                      </v-card>
                    </v-col>
                    <v-col class="py-0 pl-md-2" sm="4" cols="12">
                      <v-card
                        color="white"
                        outlined
                        dense
                        class="pa-6 raduis_10  no_border "
                        :min-height="this.$i18n.locale=='kh' ? 382 : 378"
                      >
                        
                        <i style="font-size: 100px" class="d-flex justify-center b-sale_channel red_icon" />
                        
                        <h1 class="line_24 text-center font_20 my-4">
                          {{ $t("multi_channels_orders") }}
                        </h1>
                        <p class="text-center  mt-2 mb-0 niradei_light" :class="{'line_16':this.$i18n.locale=='kh'}">
                          {{ $t("multi_channels_orders_desc") }}
                        </p>
                      </v-card>
                    </v-col>
                    <v-col class="mt-2 pl-md-2" sm="4" cols="12">
                      <v-card
                        color="white"
                        outlined
                        dense
                        class="pa-6 raduis_10  no_border "
                        :min-height="this.$i18n.locale=='kh' ? 382 : 378"
                      >
                        
                        <i style="font-size: 100px" class="d-flex justify-center b-compliance red_icon" />
                        
                        <h1 class="line_24 text-center font_20 my-4">
                          {{ $t("marketing_promotions") }}
                        </h1>
                        <p class="text-center mt-2 mb-0 niradei_light" :class="{'line_16':this.$i18n.locale=='kh'}">
                          {{ $t("loyalty_reward_promotion_desc") }}
                        </p>
                      </v-card>
                    </v-col>
                    <v-col class="mt-2 pl-md-2" sm="4" cols="12">
                      <v-card
                        color="white"
                        outlined
                        dense
                        class="pa-6 raduis_10  no_border "
                        :min-height="this.$i18n.locale=='kh' ? 382 : 378"
                      >
                        
                       <i style="font-size: 100px" class="d-flex justify-center b-pricing red_icon" />
                        
                        <h1 class="line_24 text-center font_20 my-4">
                          {{ $t("pricing_manangement") }}
                        </h1>
                        <p class="text-center mt-2 mb-0 niradei_light" :class="{'line_16':this.$i18n.locale=='kh'}">
                          {{ $t("pricing_manangement_desc") }}
                        </p>
                      </v-card>
                    </v-col>
                    <v-col class="mt-2 pl-md-2" sm="4" cols="12">
                      <v-card
                        color="white"
                        outlined
                        dense
                        class="pa-6 raduis_10  no_border "
                        :min-height="this.$i18n.locale=='kh' ? 382 : 378"
                      >
                        
                        <i style="font-size: 100px" class="d-flex justify-center b-loyalty red_icon" />
                        
                        <h1 class="line_24 text-center font_20 my-4">
                          {{ $t("loyalty_reward") }}
                        </h1>
                        <p class="text-center mt-2 mb-0 niradei_light" :class="{'line_16':this.$i18n.locale=='kh'}">
                          {{ $t("loyalty_reward_promotion_desc") }}
                        </p>
                      </v-card>
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
.image_product {
  height: 135px;
  margin: 20px auto;
  display: block;
}
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
  margin-top: 10px;
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
  font-size: 14px !important;
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
