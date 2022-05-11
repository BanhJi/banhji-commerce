<template>
  <div id="app">
    <v-app id="inspire" class="custom_theme">
      <v-main>
          <div v-if="isHead == 3">
            <HeaderPos />
            
          </div>
           <div v-else-if="isHead == 2">
            <HeaderApp />
          </div>
          <div v-else>
            <Header/>
          </div>
         
        <router-view />
        <vue-snotify />
        <!-- <Footer/> -->
        <Resource />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import HeaderPos from "@/components/HeaderPos.vue";
import HeaderApp from "@/components/HeaderApp.vue";
const instituteHandler = require("@/scripts/instituteHandler.js");

export default {
  name: "Homeindex",
  components: {
    Header,
    HeaderPos,
    HeaderApp,
    // Footer
    Resource: () => import("@/components/Resource"),
  },
  data: () => ({
    my_part: "",
    show:true,
    isHead: 1
  }),
  created() {
    instituteHandler.init();
  },
  methods: {
     checkRoute2() {
      let part = window.location.pathname;
      this.my_part = part;
      if (part == "/en/dashboard_pos/retail"  || part == "/kh/dashboard_pos/retail" || part == "/kh/dashboard_pos/f_b" || part == "/en/dashboard_pos/f_b" || part == "/kh/dashboard_pos/service" || part == "/en/dashboard_pos/service"){
        this.isHead = 2
      } else if (part == "/en/_sale" || part == "/en/_sale/" || part == "/kh/_sale/" || part == "/kh/_sale"){
        this.isHead = 3
      }
    },
  },
  computed: {
    part() {
      return window.location.pathname;
    },
  },
  watch: {
    $route: "checkRoute2",
  },
  mounted() {
    this.checkRoute2();
  },
};
</script>
