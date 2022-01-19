<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0 px-3">
      <div style="background-color: #fff; padding: 0 0 5px;">
        <v-tabs class="tabs_2">
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-uppercase text-left">
              {{ $t("summary") }}
            </span>
          </v-tab>
          <v-tab>
            <span class="hidden-sm-and-up">
              <v-icon left>mdi-pen</v-icon>
            </span>
            <span class="hidden-sm-and-down text-uppercase">
              {{ $t("detail") }}
            </span>
          </v-tab>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pl-0">
                <leaveSummary />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pt-0 pl-0">
                <leaveDetail />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "",
  data: () => ({
    isHide: false,
  }),
  props: {},
  methods: {
    clickMe(data) {
      this.$router.push(`${data.link}`);
    },
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    leaveDetail: () => import("./leaveDetail"),
    leaveSummary: () => import("./leaveSummary"),
  },
};
</script>
<style scoped>
.arr_icon {
  color: #2ca01c;
}
.arr_icon1 {
  color: #4c9aff;
  color: #2ca01c;
}
.v-tab {
  min-width: 30px;
  font-size: 16px;
  text-transform: capitalize;
}

.v-tab--active {
  background-color: rgb(255, 255, 255);
}

.tab_setting .v-tab--active {
  font-weight: 700;
  color: #000;
  background-color: #ffffff !important;
  border-bottom: 4px solid #92d050;
  border-left: none;
}
.tabs_2 .v-tab--active {
  background-color: #f8f8f9 !important;
  border-bottom: 4px solid #92d050;
  border-left: none;
}

/* .v-tab--active {
    } */

p {
  color: rgba(0, 0, 0, 0.87);
}
</style>
