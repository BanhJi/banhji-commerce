<template>
    <div class="">
        
    </div>
</template>

<script>
import router from "@/router";
const store = require("../institute.js");

const instituteHandler = require("@/scripts/instituteHandler");
const otherHandler = require("@/scripts/otherHandler");
import {Trans} from "@/plugins/Translation";
import {i18n} from "../i18n";

export default {
    data: () => ({
        institutes: [],
        isOnline: false,
        drawer: null,
        miniVariant: false,
        handOver: false,
        isApp: true,
        isAbsolute: false,
        isAccountLogo: true,
        backHoverColor: "",
        activeClass1: "",
        activeClass2: "",
        activeClass3: "",
        items: [
            // {class: "ma-3 v-divider"},
            {
                
              id: 1,
              class: "text-green sidebar_regular",
              activeClass: "",
              name: "parksale",
              menuTex: "parksale",
              path: "",
              icon: "b-pos",
              content: "1"
            },
            {
              id: 2,
              class: "text-green sidebar_regular",
              activeClass: "",
              name: "invoice",
              menuTex: "invoice",
              path: "",
              icon: "b-pos",
              content: "2"
            },
           
            {
              id: 4,
              class: "text-green sidebar_regular",
              activeClass: "",
              name: "orders",
              menuTex: "orders",
              path: "",
              icon: "b-pos",
              content: "3"
            },
           
           
        ],
        previous_active_id: 1,
        fullscreen: false,
        pages: [],
        mInstitute: {},
        isLoaded: false,
        planName: ''
    }),
    props: {
        source: String,
    },
    methods: {
        getIcon(icon) {
        if (icon) {
            return `<i style="font-size: 20px;margin-right:2px;" class="${icon} red_icon" />`;
        }
        },
        amIOnline(e) {
            const iconOffline = require("@/assets/images/outline_wifi_off_black_48dp.png")
            const iconOnline = require("@/assets/images/outline_wifi_white_48dp.png")
            if (!e) {
                this.isLoaded = true
            } else {
                this.isOnline = true
            }
            if (this.isLoaded) {
                if (e) {
                    this.isOnline = true
                    this.$snotify.success('You are connected', '', {icon: iconOnline})
                } else {
                    this.isOnline = false
                    this.$snotify.simple('You are offline!', '', {icon: iconOffline})
                }
            }
        },
        // History
        onHistoryClick(page) {
            if (page.name) {
                this.$router.push({name: page.name});
            }
            this.items.forEach((element) => {
                element.activeClass = "";
            });
        },
        clickMe(data) {
            // if (data.id == 1) {
            //     this.$router.push(`${i18n.locale}`);
            // }
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
            if (this.$i18n.locale !== locale) {
                const to = this.$router.resolve({params: {locale}});
                return Trans.changeLocale(locale).then(() => {
                    this.$router.push(to.location);
                });
            }
        },
        logOut() {
            document.cookie =
                "banhji-token=" +
                ";domain=.banhji.com;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            window.location = "https://banhji.com/banhji/sign-in";
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
        },
        onMouseLeave: function () {
            if (this.miniVariant) {
                this.isAccountLogo = false;
                this.backHoverColor = "#FFFFFF !important";
            }
        },
        setActiveSideNav() {
            let pathURL = window.location.pathname;
            //eslint-disable-next-line no-console
            if (pathURL == "/") {
                pathURL = "/en";
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
            if (this.$route.meta.miniSideBar == true) {
                this.miniVariant = true;
                this.handOver = true;
                this.isAbsolute = true;
                this.isAccountLogo = false;
                this.isApp = false;
            }
        },
    
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
            var cookie = this.getCookie("banhji-token");
            if (cookie !== "") {
                let data = JSON.parse(cookie);
                this.mInstitute = {
                    id: data.instituteId,
                    name: data.email,
                    email: data.email,
                    user: data.user,
                    plan: data.plan,
                    creator: data.creator,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                };
                if (this.mInstitute.plan == 1) {
                    this.planName = 'Standard'
                } else if (this.mInstitute.plan == 2) {
                    this.planName = 'Premium'
                } else if (this.mInstitute.plan == 3) {
                    this.planName = 'Advanced'
                }
                window.console.log(this.planName, 'plan name')
            }
            // store.default.commit('setUser', this.mInstitute)
            window.console.log(this.mInstitute, "avatar");
        },
        writeToCookie() {
            window.console.log(this.mInstitute, 'writeCookie');
            const cookie = {
                accessToken:
                    this.mInstitute.accessToken ||
                    "eyJraWQiOiIzT3hCSStYOWZCYzFOYTc3YW9qVnFIdlwvSWxXREV6NFJMYUluUmE5anNyQT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1OWNkMTY4ZS1mNzBmLTQ4ODctYWE5Ny1kMWMwYWZiNDE0ZDkiLCJldmVudF9pZCI6IjA3ZmZiOTEyLWJiZTgtNDg3ZS1hODk5LWQ5MDM4NjcyNjBkYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDc5MzU0NDMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMV9nc2F0MmxiakwiLCJleHAiOjE2MDc5MzkwNDMsImlhdCI6MTYwNzkzNTQ0MywianRpIjoiNTc5NzE4ZDQtYmM0Zi00YzNhLThmMTItNmRjZGQyZmYxNDczIiwiY2xpZW50X2lkIjoiM3ZhOTNkMjVxbzZrcHYzNHJmMWwwNDNqZ3IiLCJ1c2VybmFtZSI6ImJhbmhqaTU1NUBnbWFpbC5jb20ifQ.Z-g9DNbRn5AX32xFWHmkt8iXe7FNly1azaOXTpORL4i7X_EDLybiYtbYsR3MWXbTNcFfKABPwOXYk541SJZPgnck8PWvHanyKIVvrlzaVy9JEo_E35jOO72Rjt0MgB2eG1u2k70R2cywQmKfsffp_5yk1RKaesZq0yLucUJDrSHnRv8Jm-U-S-buHs_fAxL_Vt6l3o2DcKtKRb-eUOHjTLs8WnHvtPvraXC7dY6PmJuA4K4v2RMfrSuv5wx2EvomqlOEtCgvbK8jDtu4zvHRTY-2TcnfK2dXwxZRkduF26YbezejBZpejsoVFBOi617NGH8b_2DikvSyCBBCjmh3qg",
                refreshToken:
                    this.mInstitute.refreshToken ||
                    "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.dsantoqyFlkftIr9z_7P5uc2fjlc0w_R4wt1My1fT70grVmvW0crc_aqHcm-Vc3gpjgndX2Xxn3lTx7nqpVp59Lzeab2JIKE520LBhePWuz5y3LW5WMQhAcZteXNf6JATvDHrmRXs3R0e4m-vSZhlvLCMH5EIYB0bwsFMBdSVNrNNLLVzMuuzDCXywWlrLU1MIHJuEG9Z5c-fca1xB-1fwyI8wpGV6OVnfNSo4OfOeQ-O9ufKmKjym24yxE40i_8UrOEca_12Y5XrQGov30wkou6stixLDFWu05BncG2nfgCEjNERlJC97LPtyI__tLGL2kYuWgJKghebKkuq9ds_A.wvSOFOu7pMLZFghf.4DLhcyHLwJqf3fcyq8A3KmSQL8UAd_ADPZxBuPnnSDaRVEWqDTRq_bJDPFjWBf4uJkI6ye45XJ8AkdZQFutP-x_nUT2Qw0NbLjGFW3nUh2GVd8yP2JIyQJ2h2_onLvUPpLp-E0crIEdbVXZRpQM7y7aOP4rOVPPVBCiAxapMNX9_5utgzKpfWGrS8D6t7dvq4pHieXeZbomkoY7h_eLflehQ_RLcaK3i7Dnvxjn6_UiHmXx0X9gplFJx_rrIlveIrha94E6fBQ9eCwT0WHROrAQIbyW24D_6ytSAuKVq-383svntFUeBuggDRujVdR8uQ9HIbsftDvDvnKZchQ1yFiToTC-NPCfizaw6nuJ5LQAw0TVtY3RSeYfm6jAX77ymsuYi557UZNWCJs_0WRKBaqKnvKx6m-YwFtft5dPmW1rPi6ARJ20z6JocYLWjfKYBL3AITgzt2gY8POsgzBOhWZ9c2UcM7X8eY5EMtAQyhZ3iLHQ_21cnNAH_PNBmn4mZGuT0VePpeopmX3e4J1-BmAFq5LvqJW4KTIiFRdrcTbnLWT8JrR-SGiOMOLS_WUivc3wQZn20xm2JlrJZDemT4IGdHLmrxARsvlSwKaQ94Rywly8WjIaj-wzqA5_MURryW1xHUpwwO-lvZ1dTK9Wh80AY_LSL19fcPi1pXz_NCSKOniSgoT3qvaL1zLcxFKr5D_lI8LkI4wyC7tzRbvbkY6t8-L269Y7BVO7SXMIDu6nT1XyuUElFMnnfuDr_iCWPjDjbEA2f5hl6V1m3BFEkroHQp97RnJUnualVpnQ1QsuBvRFZnvEI0OuPUpMNMic6gnuxNV_ILlxhH7JspafqbeAN5PYauLsI6A70b4mZWf0XGZu0UeV93QZZn_9156yytgU3-3-mcDR4dV2L0bnICz1lCVsqw9EE6MUJhHneNNqDn9pWykD3kSxbtS-0jTTyOVJaGjmwP6K80hH3S6C6cEnkPr83Or-FBkmB61_2RHjyB6o5QkebyPv2L5z8eF14r15UZiFEI6HyyEeZBWpEgYREvkVmjsLg2koHcieQ_AmUmwy9rF8oW5qM1LO-NPHIqnR1uwSvu2ZPBDBxigjgZ3m8q8lirVwSgHmY4OVEb1MWBa5uHCFKYKlEZCdeU_DKl3eb52Nnou7nKyBphgarI7LZ5-ufQPCxzeablED4rAnzTEoov3HQ1vHjS_nF71aZ4tNAR98vFpbhH1sBJolvf65omWa15ezCEsbyhCrvKmcZuGJHXMSXkxcbZOJWivV6sLLNQDZq6FF8AOKMDXTHFVJDYO94eB_F9GAEW4q9evuZaQ.fN1JXyIfuzoK0yAG4om3LQ",
                expiresIn: 1607939043,
                email: this.mInstitute.email,
                plan: this.mInstitute.plan,
                instituteId: this.mInstitute.id,
                creator: this.mInstitute.creator,
                user: this.mInstitute.user,
            };

            // document.cookie =
            //     "banhji-token=" +
            //     JSON.stringify(cookie) +
            //     ";domain=.localhost;path=/;expires=Fri, 31 Dec 9999 12:00:00 GMT;";
            let value = JSON.stringify(cookie);
            let expires = "";
            let name = "banhji-token";
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        onChanged() {
            this.writeToCookie();
            //reload
            this.$router.go(this.$router.currentRoute);
            // this.$router.push({
            //     name: 'Suppliers', params: {
            //         data: data
            //     }
            // })
            // window.console.log(this.mInstitute)
        },
        async loadInstitutes() {
            window.console.log(this.mInstitute.creator);
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    instituteHandler.getCompany(this.mInstitute.creator).then(async res => {
                        res.forEach((i) => {
                            this.institutes.push({
                                id: i.id,
                                banhjiId: i.banhjiId,
                                name: i.name,
                                email: this.mInstitute.email,
                                user: this.mInstitute.user,
                                creator: this.mInstitute.creator,
                                plan: this.mInstitute.plan
                            });
                            window.console.log(i.banhjiId, 'id institute')
                            if (i.banhjiId === this.mInstitute.id) {
                                this.mInstitute = i
                                this.writeToCookie()
                            }
                        });

                    });
                }, 300);
            });
        },
        async loadInstitute() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    otherHandler.institute().then((res) => {
                        window.console.log(res, "--");
                        this.institutes = res;
                    });
                }, 300);
            });
        },
        toggleDarkTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        },
    },
    components: {
    },
    computed: {
        avatarLetter() {
            return store.default.state.avatarLetter;
        },
        // History Page
        historyPages: {
            set(historyPages) {
                store.commit("setHistoryPage", historyPages);
            },
            get() {
                return store.default.state.historyPages;
            },
        },
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
        this.setActiveSideNav();
        // await this.loadInstitute();
        await this.getCookieData();
        await this.loadInstitutes();
    },
    async created() {
        window.addEventListener('keydown', async function(event) {
            if (event.keyCode === 73 && event.ctrlKey === true && event.shiftKey === false && event.altKey === false && event.metaKey === false) {
                await router.push("/" + i18n.locale + "/invoice")
            }
        })
    },
    watch: {
        $route: "miniSideInFunction",
    },
};
</script>
<style scoped>
    .beta{
        font-size: 18px;
        text-transform: uppercase;
    }
    .overview{
        background-color: #ffffff !important;
    }
    .sub_type{
        margin-top: -13px;
        margin-left: 60px;
    }
    .theme--light.v-navigation-drawer {
        background-color: #f8f8f9 !important;
    }
    .v-list-item .theme--light{
        background-color: #f8f8f9 !important;
    }
    h2{
        font-size: 18px;
        color: #4d4848;
    }
    .border-b{
            border-bottom: 1px solid gainsboro;
    }
    .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
        color:#ED1A3A !important;
    }
    .v-main {
        padding: 0px 0px 0px 210px !important;
    }
</style>

