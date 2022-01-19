<template>
    <div id="app">
        <v-app id="inspire" class="custom_theme">
            <div v-if="validUser">
                <Header/>
            </div>
            <v-main v-if="validUser">
                <router-view/>
                <vue-snotify/>
                <!-- <Footer/> -->
                <Resource/>
            </v-main>
            <div v-else>
                <NotAuthentication/>
            </div>

        </v-app>
    </div>
</template>

<script>
// import Footer from '@/components/Footer'
import NotAuthentication from "./components/NotAuthentication.vue";
import {dataStore} from "@/observable/store";
import store from "@/store";
const formContentHandler = require("@/scripts/formContentHandler")

// const authJS = require("@/auth.js");
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
export default {
    name: "App",
    components: {
        Header: () => import('./components/Header'),
        NotAuthentication,
        // Footer
        Resource: () => import("@/components/Resource"),
    },
    data: () => ({}),
    computed: {
        validUser() {
            return dataStore.isValidUser;
        },
    },
    methods:{
        getSetting(){
            store.state.accounting.secondaryAccount = true;
        },
        getAccoutningFormContent(){
            formContentHandler.getAccount().then(res => {
                if (res.data.statusCode === 200) {
                    const data = res.data.data
                    if (data.length > 0) {
                        window.console.log('2', data)
                        store.state.accounting.secondaryAccount = data[0].secondaryAccount;
                        store.state.accounting.accountLanguage = data[0].accountLanguage;
                        var className = {
                            C1: data[0].C1,
                            C2: data[0].C2,
                            C3: data[0].C3,
                            C4: data[0].C4,
                            C5: data[0].C5,
                        };
                        store.state.accounting.classSetting = className;
                    }
                }

            })
        }
    },
    mounted(){
        this.getSetting();
        this.getAccoutningFormContent();
    },

    created() {
        /* Auth */
        // authJS.init();
        // Initial Institute
        if (cookie.instituteId !== '') {
            this.$store.dispatch('institute/init');
        }

    },
};
</script>
