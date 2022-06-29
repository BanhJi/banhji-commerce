<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col sm="12" md="12" cols="12" class="pr-2">
       
            <v-row>
              <v-col sm="12" cols="12" class="py-0 mt-1 d-flex">
                  <div style="width:85%" class="mr-2">
                    <v-text-field
                      outlined
                      :placeholder="$t('search')"
                      clearable/>
                  </div>
                  <div style="width:15%; float: right;">
                    <v-btn
                        to="store"
                        class="mr-2"
                        style="border: 1px solid gainsboro;background: #ffff;width: 47%;"
                    >
                        <i
                            class="b-add"
                            style="font-size: 18px;"
                        />
                    </v-btn>
                    <v-btn
                        color="primary white--text"
                        style="width: 47%;"
                        @click="searchTransaction"
                    >
                        <i
                            class="b-search"
                            style="font-size: 18px; color:#fff !important;"
                        />
                    </v-btn>
                  </div>
              </v-col>
              <v-col sm="4" cols="12" class="">
                <v-card
                  outlined
                  dense
                  color="white"
                  class="pa-3 pt-0 pb-2 no_border"
                  min-height="240px"
                >
                <v-row>
                  <v-col sm="12" class="">
                      <a
                        width="100%"
                        min-height="80"
                        @click="goDashoardPos('started')"
                        color="primary"
                        class="pa-3 text-bold text-capitalize"
                        elevation="0"
                        style=" display: flex;background: #ed1a3a;"
                      >
                        <i style="font-size: 50px;color: #ffffff;" class="b-commerce mr-2 white_icon"/>
                        <h1 class="line_22 font_22 white--text ml-4">
                        {{ $t("pos_for_retail") }}
                        </h1>
                      </a>
                  </v-col>
                  <v-col sm="12" cols="12" class="py-0">
                      <v-simple-table>
                          <template v-slot:default>
                              <tbody>
                                  <tr>
                                      <td style="width:55%;" class="text-uppercase pl-0">{{ $t('name') }}</td>
                                      <td class="text-bold px-0">:</td>
                                      <td class="text-left text-bold"></td>
                                  </tr>
                                  <tr>
                                      <td style="width:55%;" class="text-uppercase pl-0">{{ $t('segment') }}</td>
                                      <td class="text-bold px-0">:</td>
                                      <td class="text-left text-bold"></td>
                                  </tr>
                                  <tr>
                                      <td style="width:55%;" class="text-uppercase pl-0">{{ $t('warehouses') }}</td>
                                      <td class="text-bold px-0">:</td>
                                      <td class="text-left text-bold"></td>
                                  </tr>
                                  <tr>
                                      <td style="width:55%;" class="text-uppercase pl-0">{{ $t('status') }}</td>
                                      <td class="text-bold px-0">:</td>
                                      <td class="text-left text-bold"></td>
                                  </tr>
                                 
                              </tbody>
                          </template>
                      </v-simple-table>
                      <v-divider />
                      <v-card outlined dense class="no_border function_footer">
                        <v-btn
                          color="secondary"
                          style="margin-right: 10px !important"
                          class="white--text float-right text-capitalize"
                          >{{ $t("edit") }}
                        </v-btn>
                      </v-card>
                  </v-col>
                </v-row>
                </v-card>
                  
              </v-col>
              <v-col sm="4" cols="12" class="">
                <v-card
                  outlined
                  dense
                  color="white"
                  class="pa-3 pt-0 pb-2 no_border"
                  min-height="240px"
                >
                <v-row>
                  <v-col sm="12" class="">
                      <a
                        width="100%"
                        min-height="80"
                        @click="goDashoardPos2('started')"
                        color="primary"
                        class="pa-3 text-bold text-capitalize"
                        elevation="0"
                        style=" display: flex;background: #ed1a3a;"
                      >
                        <i style="font-size: 50px;color: #ffffff;" class="b-commerce mr-2 white_icon"/>
                        <h1 class="line_22 font_22 white--text ml-4">
                        {{ $t("pos_for_resturant") }}
                        </h1>
                      </a>
                  </v-col>
                  <v-col sm="12" cols="12" class="py-0">
                      <v-simple-table>
                          <template v-slot:default>
                              <tbody>
                                  <tr>
                                      <td style="width:55%;" class="text-uppercase pl-0">{{ $t('name') }}</td>
                                      <td class="text-bold px-0">:</td>
                                      <td class="text-left text-bold"></td>
                                  </tr>
                                  <tr>
                                      <td style="width:55%;" class="text-uppercase pl-0">{{ $t('segment') }}</td>
                                      <td class="text-bold px-0">:</td>
                                      <td class="text-left text-bold"></td>
                                  </tr>
                                  <tr>
                                      <td style="width:55%;" class="text-uppercase pl-0">{{ $t('warehouses') }}</td>
                                      <td class="text-bold px-0">:</td>
                                      <td class="text-left text-bold"></td>
                                  </tr>
                                  <tr>
                                      <td style="width:55%;" class="text-uppercase pl-0">{{ $t('status') }}</td>
                                      <td class="text-bold px-0">:</td>
                                      <td class="text-left text-bold"></td>
                                  </tr>
                                 
                              </tbody>
                          </template>
                      </v-simple-table>
                      <v-divider />
                      <v-card outlined dense class="no_border function_footer">
                      
                        <v-btn
                          color="secondary"
                          style="margin-right: 10px !important"
                          class="white--text float-right text-capitalize"
                          >{{ $t("edit") }}
                        </v-btn>
                      </v-card>
                  </v-col>
                </v-row>
                </v-card>
                  
              </v-col>
              <v-col sm="4" cols="12" class="">
                <v-card
                  outlined
                  dense
                  color="white"
                  class="pa-3 pt-0 pb-2 no_border"
                  min-height="240px"
                >
                <v-row>
                  <v-col sm="12" class="">
                      <a
                        width="100%"
                        min-height="80"
                        @click="goDashoardPos3('started')"
                        color="primary"
                        class="pa-3 text-bold text-capitalize"
                        elevation="0"
                        style=" display: flex;background: #ed1a3a;"
                      >
                        <i style="font-size: 50px;color: #ffffff;" class="b-commerce mr-2 white_icon"/>
                        <h1 class="line_22 font_22 white--text ml-4">
                        {{ $t("pos_for_service") }}
                        </h1>
                      </a>
                  </v-col>
                  <v-col sm="12" cols="12" class="py-0">
                      <v-simple-table>
                          <template v-slot:default>
                              <tbody>
                                  <tr>
                                      <td style="width:55%;" class="text-uppercase pl-0">{{ $t('name') }}</td>
                                      <td class="text-bold px-0">:</td>
                                      <td class="text-left text-bold"></td>
                                  </tr>
                                  <tr>
                                      <td style="width:55%;" class="text-uppercase pl-0">{{ $t('segment') }}</td>
                                      <td class="text-bold px-0">:</td>
                                      <td class="text-left text-bold"></td>
                                  </tr>
                                  <tr>
                                      <td style="width:55%;" class="text-uppercase pl-0">{{ $t('warehouses') }}</td>
                                      <td class="text-bold px-0">:</td>
                                      <td class="text-left text-bold"></td>
                                  </tr>
                                  <tr>
                                      <td style="width:55%;" class="text-uppercase pl-0">{{ $t('status') }}</td>
                                      <td class="text-bold px-0">:</td>
                                      <td class="text-left text-bold"></td>
                                  </tr>
                                 
                              </tbody>
                          </template>
                      </v-simple-table>
                      <v-divider />
                      <v-card outlined dense class="no_border function_footer">
                        <v-btn
                          color="secondary"
                          style="margin-right: 10px !important"
                          class="white--text float-right text-capitalize"
                          >{{ $t("edit") }}
                        </v-btn>
                      </v-card>
                  </v-col>
                </v-row>
                </v-card>
                  
              </v-col>
            
            </v-row>
        </v-col>
      </v-row> 
    </v-container>
  </v-app>
</template>
<script>
// import { i18n } from "@/i18n";

export default {
  data: () => ({
    isOverlay: false,
    showLoadingSaleAnalysis: false,
    items: [
      {
         src: require('@/assets/images/slide1.jpg')
      },
      {
         src: require('@/assets/images/slide1.jpg')
      },
      {
        src: require('@/assets/images/slide1.jpg')
      },
    ],
  }),
  methods: {
    goDashoardPos(){
      let routeData = this.$router.resolve({name: 'dashboard_pos'});
      window.open(routeData.href, '_blank');
    },
    goDashoardPos2(){
      let routeData = this.$router.resolve({name: 'dashboard_2'});
      window.open(routeData.href, '_blank');
    },
    goDashoardPos3(){
      let routeData = this.$router.resolve({name: 'dashboard_3'});
      window.open(routeData.href, '_blank');
    },
    
  },
  components: {
  },
};
</script>
<style scoped>
.h_60 {
  height: 60px !important;
}
.w_100 {
  width: 100% !important;
}
.theme--light.v-data-table {
  background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}
p {
  font-family: "Niradei-Light" !important;
}
</style>
