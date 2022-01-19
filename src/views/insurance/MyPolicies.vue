<template>
  <v-row class="px-1">
    <v-col sm="6" cols="6" class="py-2">
      <h2 class="mb-0">{{ $t("my_polocies") }}</h2>
      <p class="mb-0">{{ $t("my_polocies_desc") }}</p>
    </v-col>
    <v-col sm="6" cols="6" class="py-2 pt-4">
      <v-btn color="primary white--text  float-right"  to="insurance_purchase">
        {{$t('insurance_purchase')}}
      </v-btn>
    </v-col>
    <v-col sm="12" class="py-0">
      <v-row>
        <v-col sm="6" cols="12" >
          <v-simple-table>
            <template v-slot:default>
            <thead>
                    <tr>
                        <th class="primary th_my">{{$t('policy_num')}}</th>
                        <th class="primary th_my">{{$t('policy_type')}}</th>
                    </tr>
            </thead>
              <tbody>
                <tr>
                  <td width="230" class="text-uppercase">
                    
                  </td>
                  <td class="text-left text-bold"></td>
                </tr>
                <tr>
                  <td class="text-uppercase">
                    
                  </td>
                  <td class="text-left text-bold">
                
                  </td>
                </tr>
                <tr>
                  <td class="text-uppercase"></td>
                  <td class="text-left text-bold">
                    
                  </td>
                </tr>
                <tr>
                  <td class="text-uppercase"></td>
                  <td class="text-left text-bold">
                  
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col sm="6" cols="12">
          <v-tabs>
            <v-tab>
              <span class="hidden-sm-and-up">
                <v-icon left>mdi-information-variant</v-icon>
              </span>
              <span class="hidden-sm-and-down text-uppercase">
                {{ $t("info") }}
              </span>
            </v-tab>
            <v-tab>
              <span class="hidden-sm-and-up">
                <v-icon left>mdi-pen</v-icon>
              </span>
              <span class="hidden-sm-and-down text-uppercase">
                {{ $t("transactions") }}
              </span>
            </v-tab>
            <v-tab>
              <span class="hidden-sm-and-up">
                <v-icon left>mdi-pen</v-icon>
              </span>
              <span class="hidden-sm-and-down text-uppercase">
                {{ $t("attachments") }}
              </span>
            </v-tab>
            <!-- infor -->
            <v-tab-item>
              <v-col sm="12" cols="12" class="pt-0 pr-3">
                <v-row class="grayBg" style="width: 104%;">
                  <v-col sm="12" cols="12" class="">
                    <v-card outlined color="white" class="px-3 pb-3">
                      <Info />
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-tab-item>

            <!-- Transactions -->
            <v-tab-item>
              <v-col sm="12" cols="12" class="pt-0 pr-3">
                <v-row class="grayBg" style="width: 104%;">
                  <v-col sm="12" cols="12" class="">
                    <v-card outlined color="white" class="px-3 pb-3">
                      <Transaction />
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-tab-item>
            <!-- Attachment -->
            <v-tab-item>
              <v-col sm="12" cols="12" class="pt-0 pr-3">
                <v-row class="grayBg" style="width: 104%;">
                  <v-col sm="12" cols="12" class="">
                    <v-card outlined color="white" class="pa-3">
                      <Attachment />
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "MyPolicies",
  data: () => ({
    items:[
      {
        id: 1,
        name:"vanchhai",
        subject:"Khmer"
      },
      {
        id: 1,
        name:"bbb",
        subject:"Math"
      },
          {
        id: 1,
        name:"ccc",
        subject:"Physic"
      },
          {
        id: 1,
        name:"ddd",
        subject:"History"
      },
    ]

  }),
  methods:{

  },
  components: {
    Info: () => import("./my_polocies/Info"),
    Transaction: () => import("./my_polocies/Transaction"),
    Attachment: () => import("./my_polocies/Attachment"),
  },
};
</script>
<style scoped>
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr.secondary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: #4d4848 !important;
}

.theme--light.v-data-table {
  background-color: transparent !important;
  border-top: thin solid #ddd;
  border-bottom: thin solid #ddd;
  border-radius: 0 !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid #ddd;
}
.th_my{
    font-family: 'niradei-Bold';
    font-size: 20px !important;
    text-transform: uppercase;
    color: #fff !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
    height: 32px !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
}
</style>
