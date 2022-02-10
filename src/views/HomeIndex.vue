<template>
  <div id="app">
    <v-app id="inspire" class="custom_theme">
      <v-main>
          <div v-if=" show">
            <Header/>
          </div>
          <div v-else>
            <HeaderPos />
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
const instituteHandler = require("@/scripts/instituteHandler.js");

export default {
  name: "Homeindex",
  components: {
    Header,
    HeaderPos,
    // Footer
    Resource: () => import("@/components/Resource"),
  },
  data: () => ({
    my_part: "",
    show:true
  }),
  created() {
    instituteHandler.init();
  },
  methods: {
     checkRoute2() {
      let part = window.location.pathname;
      this.my_part = part;
      if (part == "/en/_sale" || part == "/en/_sale/" || part == "/kh/_sale/" || part == "/kh/_sale") {
        this.show=false
      } else {
        this.show=true
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
