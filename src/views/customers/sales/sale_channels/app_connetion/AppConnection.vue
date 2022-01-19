<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-6">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="6" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t("apps_connected") }}</h2>
          </v-col>
          <v-col sm="6" cols="12" class="pt-0">
            <v-btn
              to="app_connection"
              class="white--text text-capitalize float-right"
              color="primary"
            >
              {{ $t("new_connection") }}
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="12" cols="12" class="py-0">
            <template>
              <v-simple-table class="attachment_table">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>{{ $t("segment") }}</th>
                      <th>{{ $t("partner") }}</th>
                      <th style="width: 12%">{{ $t("action") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in partners" :key="index">
                      <td>
                        <!-- {{item.itemLinesLocation.name}} -->
                        {{ item.segment.name }}
                      </td>
                      <td>
                        CAMIS
                      </td>
                      <td class="pa-1" style="width: 12%">
                        <v-btn class="btn_edit_setting"  @click="editAction(item)">
                            <v-icon class="white--text" size="14">mdi-pen</v-icon>
                            <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const appConnectionHandle = require("@/scripts/app-connection/handler/appConnectionHandle");
export default {
  data: () => ({
    partners: [],
  }),
  methods: {
    loadMatch() {
      appConnectionHandle.getMatch().then((res) => {
        this.partners.push(res.data);
      });
    },
    editAction(item) {
      window.console.log(item);
      this.$router.push({name: 'appConnection',query: { type: 'edit' }});
    },
  },
  watch: {
    // Call again the method if the route changes
    // $route(to, from) {
    //     if (from.name === "Connect Bill Payment") {
    //         this.loadPartnerService();
    //     }
    // }
  },
  mounted() {
    this.loadMatch();
  },
};
</script>

<style scoped>
.theme--light.v-data-table {
  background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
  border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.borderRadius20 {
  border-radius: 20% !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}
</style>