<template>
  <div class="">
    <div
      class="sidebar"
      v-on:mouseover="onMouseOver"
      v-on:mouseleave="onMouseLeave"
    >
      <v-navigation-drawer
        :class="{ miniWith: minWidth }"
        v-model="drawer"
        :mini-variant="miniVariant"
        :expand-on-hover="handOver"
        :mini-variant-width="40"
        :app="isApp"
        :fixed="isAbsolute"
        color="#F8F8F9"
      >
        <v-list dense class="pa-0">
          <span class="hidden-sm-and-down">
            <a v-if="isAccountLogo" href="/" class="main_logo d-flex pl-6 py-3">
              <div class="mb-0">
                <img
                  src="../assets/images/banhji-logo-r.png"
                  height="42"
                  alt="BanhJi Logo"
                />
                <p class="sub_type">{{ planName }}</p>
                <p class="sub_type">{{$t('commerce')}}</p>
              </div>
            </a>
            <a v-if="!isAccountLogo" href="/" class="">
              <h1 class="mb-0">
                <img
                  class="small_img fade-in"
                  src="../assets/images/banhji_icon.png"
                  height="40"
                  alt="BanhJi Logo"
                />
              </h1>
            </a>
            <span
              v-bind:class="{
                angle_action_small: miniVariant,
                angle_action: !miniVariant,
              }"
            >
              <v-icon
                size="16"
                class="arr_icon"
                @click="hideSidebar"
                v-if="!miniVariant"
                >mdi-chevron-left-circle</v-icon
              >
              <v-icon
                size="16"
                class="arr_icon"
                @click="hideSidebar"
                v-if="miniVariant"
                >mdi-chevron-right-circle</v-icon
              >
            </span>
          </span>
          <div class="hidden-sm-and-up pa-3 pl-5">
            <a href="\">
              <img
                class=""
                src="../assets/images/banhji-logo-r.png"
                height="30"
              />
            </a>
            <p class="black--text mt-n3 mb-0 ml-3">{{ planName }}</p>
           
          </div>
          <div class="block_menu">
            <template v-for="item in items">
              <v-row v-if="item.heading" :key="item.heading" align="center">
                <v-col cols="6">
                  <v-subheader v-if="item.heading"
                    >{{ item.heading }}
                  </v-subheader>
                </v-col>
              </v-row>
              <v-list-group
                v-else-if="item.children"
                :key="item.id"
                v-model="item.path"
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-group>
              <v-list-item
                v-else
                router
                :id="'id' + item.id"
                :to="item.path ? lang + item.path : ''"
                :class="item.class + ' ' + item.activeClass"
                :style="{ 'background-color': backHoverColor }"
                :key="item.id"
                @click.native="clickMe(item)"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <span v-html="getIcon(item.icon)"></span>
                    {{ $t(item.menuTex) }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </template>
          </div>
        </v-list>
        <template v-slot:append>
          <div
            class="link_buttom"
            v-bind:class="{ hide_item_samll: miniVariant }"
          >
            <v-list-item-title class="my-1">
              <router-link
                class="light-primary--text"
                @click.native="clickMenu(2)"
                :class="activeClass2"
                :to="lang + '/settings'"
                >{{ $t("settings") }}
              </router-link>
            </v-list-item-title>
            <img
              class="mx-6 mt-1"
              src="../assets/images/made_in_cambodia.png"
              height="45"
              alt=""
            />
            <div class="px-4 py-1">
              <v-divider />
              <p class="mb-0 font_14 mt-3 pl-2">
                © {{ year }} {{ $t("banhji_name_desc") }}
              </p>
              <!--                            <p class="line_14 font_10 mb-3 pl-2">{{ $t("banhji_term") }}</p>-->
            </div>
          </div>
        </template>
      </v-navigation-drawer>
    </div>

    <v-app-bar
      app
      class="no_border"
      color="grayBg"
      v-bind:class="{ sidebar_small: miniVariant }"
    >
      <div class="hidden-lg-and-up">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-spacer />
      </div>

      <h1 v-if="this.$route.meta.logo" class="hidden-sm-and-down">
        <img style="height: 50px" :src="'/images/' + this.$route.meta.logo" />
      </h1>
      <h1
        v-else-if="this.$route.meta.mainMenu === 'welcome'"
        class="primary--text mt-md-4 hidden-sm-and-down"
      >
        {{ mInstitute.name }}
      </h1>
      <h1 style="margin-left: -2px" v-else class="hidden-sm-and-down">
        {{ $t(this.$route.meta.mainMenu) }}
      </h1>
      <v-spacer />

      <li class="my_dropdown" style="display: initial !important">
        <a href="#" class="pr-2 font_16 d-flex flex-column">
          <span class="fontLight font_10 line_12">
            {{ $t("language") }}
          </span>
          <span class="text-bold font_14 line_12">
            {{ $t("lang") }}
          </span>
        </a>
        <ul class="dropdown_nav">
          <li @click="switchLocale('kh')">ខ្មែរ</li>
          <li @click="switchLocale('en')">English</li>
        </ul>
      </li>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :color="
              currencyList.effectiveDate === currentDate ? 'third' : 'primary'
            "
            v-on="on"
            @click="getXrate"
            style="
              letter-spacing: 0px;
              font-size: 14px !important;
              height: 26px !important;
            "
            v-bind="attrs"
            class="mx-2 mt-1 font_16 white--text"
          >
            {{ $t("x_rate") }}
          </v-btn>
        </template>
        <div class="d-flex flex-column">
          <p class="mb-1">{{currencyList.name == undefined ? $t('click_to_get_curreny_today') : $t('today_rate')}}</p>
          <span class="font_10 line_12">
            {{ $t("effective_date") }}
          </span>
          <span>{{ currencyList.effectiveDate || "" }}</span>
          <span class="font_10 line_12">
            {{ $t("currency") }}
          </span>
          <span>{{ currencyList.name != undefined ? currencyList.name + ' - ' + currencyList.symbol : '' }}</span>
          <span class="font_10 line_12">
            {{ $t("rate") }}
          </span>
          <span>{{ currencyList.rate != undefined ? parseFloat(currencyList.rate).toFixed(6) : '' }}</span>
          <span class="font_10 line_12">
            {{ $t("source") }}
          </span>
          <span>{{ currencyList.source || "" }}</span>
        </div>
      </v-tooltip>
      <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-on="on"
            v-bind="attrs"
            class="mr-1 mt-1 niradei_black font_16"
          >
            {{ baseCurrency.code }}
          </v-btn>
        </template>
        <div class="d-flex flex-column">
          <span class="font_10 line_12">
            {{ $t("base_currency") }}
          </span>
          <span>{{ baseCurrency.name }}</span>
        </div>
      </v-tooltip> -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon>
            <img
              v-if="isOnline"
              style="width: 25px; height: 25px"
              v-on="on"
              v-bind="attrs"
              src="@/assets/images/online.png"
            />
            <img
              v-else
              style="width: 25px; height: 25px"
              v-on="on"
              v-bind="attrs"
              src="@/assets/images/offline.png"
            />
          </v-btn>
        </template>
        <span>{{ isOnline ? $t("online") : $t("offline") }}</span>
      </v-tooltip>
      <div class="hidden-sm-and-down header_icon">
        <!-- <v-menu
          nudge-bottom="12"
          bottom
          offset-y
          origin="bottom top"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <i class="b-transation" style="font-size: 18px" />
            </v-btn>
          </template>

          <v-list class="header-menu history">
            <v-list-item
              v-for="(item, i) in historyPages"
              :key="i"
              class="history_link"
            >
              <v-list-item-title @click="onHistoryClick(item)"
                >{{ item.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->

        <v-btn icon @click="toggle">
          <i
            style="font-size: 18px"
            :class="[fullscreen ? 'b-mini' : 'b-full']"
          />
        </v-btn>
      </div>
      <v-offline hidden @detected-condition="amIOnline"></v-offline>
      <v-btn @click="goConnect" icon>
        <img
          class="pl-0"
          src="../assets/images/banhji_icon.png"
          height="26"
          alt="BanhJi Logo"
        />
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import router from "@/router";
// import { dataStore } from "@/observable/store";

// const instituteHandler = require("@/scripts/instituteHandler");
// const otherHandler = require("@/scripts/otherHandler");
// const jwt = require("jsonwebtoken");
import { Trans } from "@/plugins/Translation";
import { i18n } from "../i18n";
import VOffline from "@/components/VOffline";
const settingsHandler = require("@/scripts/settingsHandler");
const currencyHandler = require("@/scripts/currency/handler/currencyHandler");
import kendo from "@progress/kendo-ui";

// import { data } from "@/observable/store"
import { mapState } from "vuex";

/* Cookie */
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const currencyType = {
  FUNCTIONAL_CURRENCY: "fun-c",
  TRANSACTION_CURRENCY: "txn-c",
  REPORTING_CURRENCY: "rpt-c",
  TAX_EXCHANGE_CURRENCY: "tax-c",
};

export default {
  data: () => ({
    institutes: [],
    year: new Date().getFullYear(),
    isOnline: true,
    drawer: null,
    miniVariant: false,
    minWidth: false,
    handOver: false,
    isApp: true,
    isAbsolute: false,
    isAccountLogo: true,
    backHoverColor: "",
    activeClass1: "",
    activeClass2: "",
    activeClass3: "",
    currencyList: {
      effectiveDate: "",
    },
    items: [
      {
        id: 1,
        class: "",
        activeClass: "active",
        name: "overview",
        menuTex: "overview",
        path: "/en",
        icon: "",
      },
      {
        id: 2,
        class: "",
        activeClass: "",
        name: "channels_partners",
        menuTex: "channels",
        path: "/sale_channels",
        icon: "",
      },
      {
        id: 3,
        class: "",
        activeClass: "",
        name: "pricing",
        menuTex: "pricing",
        path: "/pricing",
        icon: "",
      },
      {
        id: 4,
        class: "",
        activeClass: "",
        name: "sale_plan",
        menuTex: "sale_plan",
        path: "/sale_plan",
        icon: "",
      },
      {
        id: 5,
        class: "",
        activeClass: "",
        name: "products_services",
        menuTex: "products_services",
        path: "/products_services",
        icon: "",
      },
      {
        id: 6,
        class: "",
        activeClass: "",
        name: "warehouses",
        menuTex: "warehouses",
        path: "/warehouses",
        icon: "",
      },
      {
        id: 7,
        class: "",
        activeClass: "",
        name: "contacts",
        menuTex: "contacts",
        path: "/contacts",
        icon: "",
      },
      
      
      { id: 31, class: "mx-3 my-1 v-divider side_devider", icon: "" },
      {
        id: 9,
         class: "sidebar_uppercase sidebar_regular",
        activeClass: "",
        name: "analytics",
        menuTex: "analytics",
        path: "/reports",
        icon: "",
      },
      {
        id: 10,
        class: "sidebar_uppercase sidebar_regular",
        activeClass: "",
        name: "marketing & promotions",
        menuTex: "promotions",
        path: "/marketing_promotions",
        icon: "",
      },
      {
        id: 11,
        class: "sidebar_uppercase sidebar_regular",
        activeClass: "",
        name: "loyalty_reward",
        menuTex: "loyalty",
        path: "/loyalty_reward",
        icon: "",
      },
      { id: 30, class: "mx-3 my-1 v-divider side_devider", icon: "" },
      {
        id: 12,
        class: "text-green sidebar_regular",
        activeClass: "",
        name: "franchise",
        menuTex: "franchise",
        path: "/franchise",
        icon: "b-pos",
      },
      {
        id: 13,
        class: "text-green sidebar_regular",
        activeClass: "",
        name: "store",
        menuTex: "stores",
        path: "/stores",
        icon: "b-pos",
      },
      {
        id: 14,
        class: "text-green sidebar_regular",
        activeClass: "",
        name: "e_commerce",
        menuTex: "e_commerce",
        path: "/e_commerce",
        icon: "b-e_commerce",
      },
      {
        id: 15,
        class: "text-green sidebar_regular",
        activeClass: "",
        name: "payments",
        menuTex: "payments",
        path: "/payments",
        icon: "b-payment",
      },
      
      
    ],
    previous_active_id: 1,
    fullscreen: false,
    pages: [],
    mInstitute: cookie,
    isLoaded: false,
    planName: "",
    isAccessSetting: false,
    currentDate: kendo.toString(new Date(), "yyyy-MM-dd"),
  }),
  props: {
    source: String,
  },

  methods: {
    async getXrate() {
      if (this.currencyList.effectiveDate !== this.currentDate) {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            const data = {};
            this.btnDisabled = true;
            settingsHandler
              .nbcXRate(data)
              .then((response) => {
                if (response.data.statusCode === 201) {
                  this.btnDisabled = false;
                  window.console.log("get rate", response.data);
                  this.$snotify.success("Successfully");
                  this.loadCurrencyData(currencyType.TRANSACTION_CURRENCY);
                } else {
                  this.btnDisabled = false;
                }
              })
              .catch((e) => {
                this.btnDisabled = false;
                this.$snotify.error("Something went wrong");
                this.errors.push(e);
              });
          }, 10);
        });
      }
    },
    async loadCurrencyData(type) {
      let get_totday = kendo.toString(new Date(), "yyyy-MM-dd");
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          currencyHandler.list(type).then((response) => {
            if (response.data.data.length > 0) {
              let filter_rate = response.data.data.filter((i) => {
                if (
                  i.source === "www.nbc.org.kh" &&
                  i.effectiveDate === get_totday
                ) {
                  return i;
                }
              });
              this.currencyList = filter_rate[0] || {};
              localStorage.setItem(
                "@CURRENCY_RATE",
                JSON.stringify(this.currencyList)
              );
            }
          });
        }, 10);
      });
    },
    getIcon(icon) {
      if (icon) {
        return `<i style="font-size: 20px;margin-right:2px;" class="${icon} red_icon" />`;
      }
    },
    goConnect() {
      if (process.env.VUE_APP_MODE == "dev") {
        window.location.href = "http://localhost:8080/";
      } else {
        window.location.href = "https://connect.banhji.com/";
      }
    },
    amIOnline(e) {
      const iconOffline = require("@/assets/images/outline_wifi_off_black_48dp.png");
      const iconOnline = require("@/assets/images/outline_wifi_white_48dp.png");
      if (!e) {
        this.isLoaded = true;
      } else {
        this.isOnline = true;
      }
      if (this.isLoaded) {
        if (e) {
          this.isOnline = true;
          this.$snotify.success("You are connected", "", { icon: iconOnline });
        } else {
          this.isOnline = false;
          this.$snotify.simple("You are offline!", "", { icon: iconOffline });
        }
      }
    },
    // History
    onHistoryClick(page) {
      if (page.name) {
        this.$router.push({ name: page.name });
      }
      this.items.forEach((element) => {
        element.activeClass = "";
      });
    },
    clickMe(data) {
      if (data.id == 1) {
        this.$router.push(`${i18n.locale}`);
      }
      // eslint-disable-next-line no-console
      this.items.forEach((element) => {
        element.activeClass = "";
      });
      this.activeClass1 = "";
      this.activeClass2 = "";
      this.activeClass3 = "";
      this.items.find((item) => item.id === data.id).activeClass = "active"; //set active class to new li
    },
    clickMenu(val) {
      this.items.forEach((element) => {
        element.activeClass = "";
      });
      this.activeClass1 = "";
      this.activeClass2 = "";
      this.activeClass3 = "";
      switch (val) {
        case 1:
          this.activeClass1 = "active";
          break;
        case 2:
          this.activeClass2 = "active";
          break;
        default:
          this.activeClass3 = "active";
      }
    },
    toggle() {
      this.$fullscreen.toggle(document.getElementsByTagName("body")[0], {
        wrap: false,
        callback: this.fullscreenChange,
      });
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },
    switchLocale(locale) {
      localStorage.setItem("locale", locale);
      if (this.$i18n.locale !== locale) {
        const to = this.$router.resolve({ params: { locale } });
        return Trans.changeLocale(locale).then(() => {
          this.$router.push(to.location);
        });
      }
    },
    logOut() {
      if (process.env.VUE_APP_MODE == "dev") {
        document.cookie =
          "banhji-token=" +
          ";http://localhost:8081;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie =
          "banhji-token-refresh=" +
          ";http://localhost:8081;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "http://localhost:8080/";
      } else {
        document.cookie =
          "banhji-token=" +
          ";domain=.banhji.com;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie =
          "banhji-token-refresh=" +
          ";domain=.banhji.com;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "https://connect.banhji.com/en/signin/";
      }
    },
    hideSidebar() {
      this.miniVariant = !this.miniVariant;
      this.miniVariant ? (this.handOver = true) : (this.handOver = false);
      if (this.miniVariant) {
        this.isAbsolute = true;
        this.isAccountLogo = true;
        this.isApp = false;
      } else {
        this.isAbsolute = false;
        this.isAccountLogo = false;
        this.isApp = true;
      }
      this.isAccountLogo = true;
    },
    onMouseOver() {
      if (this.miniVariant) {
        this.isAccountLogo = true;
        this.backHoverColor = "";
      }
      this.minWidth = false;
    },
    onMouseLeave: function () {
      if (this.miniVariant) {
        this.isAccountLogo = false;
        this.backHoverColor = "#F8F8F9 !important";
      }
      this.minWidth = false;
    },
    setActiveSideNav(val) {
      let pathURL = window.location.pathname;
      //eslint-disable-next-line no-console
      if (pathURL == "/") {
        pathURL = "/en";
      }
      if (val == 1) {
        pathURL = "/" + i18n.locale + "/accounting";
      }
      this.items.forEach((element) => {
        element.activeClass = "";
        let path = element.path;
        if (path == "/en") {
          path = "";
        }
        if ("/" + i18n.locale + path == pathURL) {
          element.activeClass = "active";
        }
        //eslint-disable-next-line no-console
        // console.log(pathURL);
        if (pathURL == "/en/subscriptions") {
          this.activeClass1 = "active";
        } else if (pathURL == "/en/settings") {
          this.activeClass2 = "active";
        } else if (pathURL == "/en/attachment") {
          this.activeClass3 = "active";
        }
      });
    },
    miniSideInFunction() {
      let pathURL = window.location.pathname;
      if (
        pathURL == "/en/payroll" ||
        pathURL == "/kh/payroll" ||
        pathURL == "/en/customers" ||
        pathURL == "/kh/customers" ||
        pathURL == "/en/vendors" ||
        pathURL == "/kh/vendors" ||
        pathURL == "/en/payroll" ||
        pathURL == "/kh/payroll" ||
        pathURL == "/en/services" ||
        pathURL == "/kh/services" ||
        pathURL == "/en/products" ||
        pathURL == "/kh/products" ||
        pathURL == "/en/budgeting" ||
        pathURL == "/kh/budgeting" ||
        pathURL == "/en/accounting" ||
        pathURL == "/kh/accounting" ||
        pathURL == "/en/banking" ||
        pathURL == "/kh/banking" ||
        pathURL == "/en/finances" ||
        pathURL == "/kh/finances" ||
        pathURL == "/en/insurance" ||
        pathURL == "/kh/insurance" ||
        pathURL == "/en/settings" ||
        pathURL == "/kh/settings" ||
        pathURL == "/en/attachment" ||
        pathURL == "/kh/revenues" ||
        pathURL == "/kh/revenues" ||
        pathURL == "/en/purchases" ||
        pathURL == "/kh/purchases" ||
        pathURL == "/en/expensing" ||
        pathURL == "/kh/expensing" ||
        pathURL == "/en/reporting" ||
        pathURL == "/kh/reporting" ||
        pathURL == "/en/payments" ||
        pathURL == "/kh/payments" ||
        pathURL == "/en/compliance" ||
        pathURL == "/kh/compliance"
      ) {
        this.setActiveSideNav();
      }
      if (
        pathURL == "/en/statement_of_profit_or_loss" ||
        pathURL == "/kh/statement_of_profit_or_loss"
      ) {
        this.setActiveSideNav("1");
      }
      if (this.$route.meta.miniSideBar == true) {
        this.miniVariant = true;
        this.handOver = true;
        this.isAbsolute = true;
        this.isAccountLogo = false;
        this.isApp = false;
        this.minWidth = true;
      }
    },
    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    // checkEditon() {
    //   if (this.mInstitute.plan == 1) {
    //     this.planName = "Standard";
    //   } else if (this.mInstitute.plan == 2) {
    //     this.planName = "Premium";
    //   } else if (this.mInstitute.plan == 3) {
    //     this.planName = "Advanced";
    //   } else if (this.mInstitute.plan == 4) {
    //     this.planName = "Cooperative";
    //   } else if (this.mInstitute.plan == 6) {
    //     this.planName = "Nonprofit";
    //   } else if (this.mInstitute.plan == 7) {
    //     this.planName = "Public Sector";
    //   } else if (this.mInstitute.plan == 8) {
    //     this.planName = "Micro Edition";
    //   }

    //   if (dataStore.roles.length > 0) {
    //     dataStore.roles.forEach((i) => {
    //       for (let it = 0; it < this.items.length; it++) {
    //         if (this.items[it].moduleId === i.moduleId && i.access === 0) {
    //           this.items.splice(it, 1);
    //         }
    //       }
    //       const setting = dataStore.roles.filter(
    //         (p) => p.moduleId === 13 && p.access !== 0
    //       );
    //       setting.length > 0
    //         ? (this.isAccessSetting = true)
    //         : (this.isAccessSetting = false);
    //     });
    //   } else {
    //     this.isAccessSetting = true;
    //   }
    //   if (dataStore.productType === "Cooperative") {
    //     this.items = this.items.filter((i) => {
    //       if (
    //         i.path !== "/compliance" &&
    //         i.path !== "/insurance" &&
    //         i.path !== "/customers" &&
    //         i.path !== "/vendors" &&
    //         i.path !== "/payroll" &&
    //         i.path !== "/products" &&
    //         i.path !== "/services" &&
    //         i.path !== "/billing" &&
    //         i.id !== 30 &&
    //         i.path !== "/commerce"
    //       ) {
    //         switch (i.id) {
    //           case 9:
    //             i.class = "";
    //             break;
    //           case 2:
    //             i.class = "";
    //             break;
    //           case 3:
    //             i.class = "";
    //             break;
    //         }
    //         if (i.path === "/banking") {
    //           i.id = 4;
    //           i.class = "";
    //           i.menuTex = "banking";
    //         }
    //         if (i.path === "/finances") {
    //           i.id = 5;
    //           i.class = "text-green sidebar_regular";
    //           i.activeClass = "";
    //           i.name = "settings";
    //           i.menuTex = "settings";
    //           i.path = "/settings";
    //         }
    //         return i;
    //       }
    //     });
    //     this.isAccessSetting = false;
    //   }
    //   if (dataStore.productType === "npo") {
    //       this.items = this.items.filter((i) => {
    //       switch (i.id) {
    //           case 2:
    //             i.menuTex = "receipts";
    //             break;
    //           case 3:
    //             i.menuTex = "payments";
    //             break;
    //       }
    //       if (i.id != 11 && i.id != 13 && i.id != 14 && i.id != 15 && i.id != 5 ) {
    //         if (i.id == 20) {
    //           i.class = "sidebar_uppercase sidebar_regular";
    //           i.activeClass = "";
    //           i.name = "funding";
    //           i.menuTex = "funding";
    //           i.path = "/share_funding";
    //           i.icon = "";
    //         }
    //         return i;
    //       }
    //     });
    //   }
    //   if (dataStore.productType === "Public Sectors") {
    //     this.items = this.items.filter((i) => {
    //       switch (i.id) {
    //         case 11:
    //           break;
    //       }
    //       if (i.id != 11) {
    //         if (i.id == 20) {
    //           i.class = "sidebar_uppercase sidebar_regular";
    //           i.activeClass = "";
    //           i.name = "funding";
    //           i.menuTex = "funding";
    //           i.path = "/share_funding";
    //           i.icon = "";
    //         }
    //         return i;
    //       }
    //     });
    //   }
    //   if (dataStore.productType === "Standard") {
    //     this.items = this.items.filter((i) => {
    //       if (
    //         i.path !== "/payroll" &&
    //         i.path !== "/budgeting" &&
    //         i.path !== "/analytics" &&
    //         i.id !== 30 &&
    //         i.path !== "/compliance"
    //       ) {
    //         return i;
    //       }
    //     });
    //   }
    //   if (dataStore.productType === "MicroEdition") {
    //     this.items = this.items.filter((i) => {
    //       if (i.id != 5 && i.id != 6 && i.id != 7) {
    //         switch (i.id) {
    //           case 1:
    //             i.menuTex = "overview";
    //             break;
    //           case 2:
    //             i.menuTex = "revenues";
    //             break;
    //           case 3:
    //             i.menuTex = "purchases";
    //             break;
    //           case 5:
    //             i.menuTex = "";
    //             break;
    //           case 6:
    //             i.menuTex = "";
    //             break;
    //           case 8:
    //             i.menuTex = "accounting";
    //             break;
    //           case 9:
    //             i.menuTex = "cash_banking";
    //             break;
    //         }
    //         if (i.id == 2) {
    //           i.class = "";
    //           i.name = "revenues";
    //           i.menuTex = "revenues";
    //           i.path = "/revenues";
    //         }
    //         if (i.id == 3) {
    //           i.class = "";
    //           i.name = "purchases";
    //           i.menuTex = "purchases";
    //           i.path = "/purchases";
    //         }
    //         if (i.id == 4) {
    //           i.class = "";
    //           i.name = "expneses";
    //           i.menuTex = "expenses";
    //           i.path = "/expensing";
    //         }
    //         if (i.id == 8) {
    //           i.class = "";
    //           i.name = "reports";
    //           i.menuTex = "reports";
    //           i.path = "/reporting";
    //         }
    //         if (i.id == 9) {
    //           i.name = "cash_banking";
    //           i.menuTex = "cash_banking";
    //           i.path = "/cash_banking";
    //         }

    //         if (i.id == 11) {
    //           i.name = "finances";
    //           i.menuTex = "finances";
    //           i.path = "/finances";
    //         }
    //         if (i.id == 11) {
    //           i.name = "payments";
    //           i.menuTex = "payments";
    //           i.path = "/payments";
    //         }
    //         // if(i.id == 9){
    //         //   i.class= ''
    //         //   i.id= 16
    //         //   i.name= "Accounting"
    //         //   i.menuTex= "accounting"
    //         //   i.path="/accounting"
    //         // }
    //         return i;
    //       }
    //     });
    //     // this.items.push(
    //     // {
    //     //     id: 12,
    //     //     class: "text-green",
    //     //     activeClass: "",
    //     //     name: "reports",
    //     //     menuTex: "reports",
    //     //     path: "/reports",
    //     //     moduleId: 16,
    //     // },)
    //   }
    //   if (dataStore.productType === "mptc") {
    //     this.items = this.items.filter((i) => {
    //       switch (i.id) {
    //         case 2:
    //           i.menuTex = "revenue";
    //           break;
    //         case 3:
    //           i.menuTex = "expense";
    //           break;
    //       }
    //       if (
    //         i.id != 4 &&
    //         i.id != 15 &&
    //         i.id != 14 &&
    //         i.id != 11 &&
    //         i.id != 13 &&
    //         i.id != 5 &&
    //         i.id != 40
    //       ) {
    //         if (i.id == 6) {
    //           i.name = "licensing";
    //           i.menuTex = "licensing";
    //           i.path = "/licensing";
    //         }
    //         if (i.id == 20) {
    //           i.class = "sidebar_uppercase sidebar_regular";
    //           i.activeClass = "";
    //           i.name = "funding";
    //           i.menuTex = "funding";
    //           i.path = "/share_funding";
    //           i.icon = "";
    //         }

    //         return i;
    //       }
    //     });
    //   }
    // },
  },
  components: {
    VOffline,
  },
  computed: {
    ...mapState({
      historyPages: (state) => state.historyPage.pages,
      baseCurrency: (state) => state.institute.institute.baseCurrency,
    }),
    supportedLocales() {
      return Trans.supportedLocales;
    },
    currentRouteName() {
      return this.$route.name;
    },
    lang() {
      return "/" + i18n.locale;
    },
  },
  mounted: async function () {
    let getLocalRate_ = await localStorage.getItem("@CURRENCY_RATE");
    if (getLocalRate_) {
      let getLocalRate = JSON.parse(getLocalRate_);
      if (getLocalRate.effectiveDate === this.currentDate) {
        this.currencyList = getLocalRate;
      }
    }

    this.setActiveSideNav();
    // this.checkEditon();
  },

  async created() {
    window.addEventListener("keydown", async function (event) {
      if (
        event.keyCode === 73 &&
        event.ctrlKey === true &&
        event.shiftKey === false &&
        event.altKey === false &&
        event.metaKey === false
      ) {
        await router.push("/" + i18n.locale + "/invoice");
      }
    });
  },
  watch: {
    $route: "miniSideInFunction",
  },
};
</script>
<style scoped>
    .beta {
        font-size: 18px;
        text-transform: uppercase;
    }
    .my_dropdown:hover .dropdown_nav {
        opacity: 1;
        display: block;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
</style>
