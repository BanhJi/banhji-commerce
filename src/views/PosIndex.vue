<template>
  <div id="app">
    <v-app id="inspire" class="custom_theme">
      <v-main>
          <div v-if="isHead == 3">
            <HeaderPos />
            
          </div>
          <div v-else>
            <HeaderApp/>
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
import HeaderPos from "@/components/HeaderPos.vue";
import HeaderApp from "@/components/HeaderApp.vue";
import { data } from "@/observable/store";
const instituteHandler = require("@/scripts/instituteHandler.js");

export default {
  name: "PosIndex",
  components: {
    HeaderPos,
    HeaderApp,
    // HeaderApp,
    // Footer
    Resource: () => import("@/components/Resource"),
  },
  data: () => ({
    my_part: "",
    isHead: 1
  }),
  created() {
    // Initial Institute
    instituteHandler.init();
  },
  methods: {
     checkRoute2() {
      let part = window.location.pathname;
      this.my_part = part;
      if (part == "/en/pos/retail"  || part == "/kh/pos/retail" || part == "/kh/pos/f_b" || part == "/en/pos/f_b" || part == "/kh/pos/service" || part == "/en/pos/service"){
        this.isHead = 2
      }
    },
  },
  computed: {
    app() {
      return data.app;
    },
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
