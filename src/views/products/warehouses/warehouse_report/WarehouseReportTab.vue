<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <v-tabs>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-uppercase">
            {{ $t("warehouse") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-uppercase">
            {{ $t("balance") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
          <span class="hidden-sm-and-down text-uppercase">
            {{ $t("transaction") }}
          </span>
        </v-tab>

        <v-tab-item>
          <v-row>
            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
              <Warehouse />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
              <Balance />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col style="background: #fff" sm="12" cols="12" class="pt-0">
              <Transaction />
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({}),
  props: {},
  methods: {},
  mounted() {},
  computed: {},
  components: {
    Transaction: () => import("./Transaction"),
    Balance: () => import("./Balance"),
    Warehouse: () => import("./Warehouse"),
  },
};
</script>

<style scoped>
.v-tab--active {
  background-color: #e5effa;
  color: #000;
}
.v-tab {
  min-width: 30px;
  font-size: 17px;
  text-transform: capitalize;
}
</style>
