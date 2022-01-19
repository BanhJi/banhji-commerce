<!--
  - Last modified : 3/31/21, 9:34 AM in Project banhji-accounting-web-module
  - Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
  - Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
  - Github Profile : https://github.com/Darith-Mokpost
  - Instagram Profile : https://www.instagram.com/chandarith_chea
  -->

<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col sm="12" cols="12">
          <div style="background-color: #fff; padding: 20px 20px 5px;">
            <v-row>
              <v-col sm="12" cols="12" class="py-0">
                <h2 class="text-capitalize mb-0">{{ $t('withholding_tax_return_list') }}</h2>
                <v-icon
                    onclick="window.history.go(-1); return false;"
                    style="cursor: pointer; color: #333; font-size: 25px;"
                    class="float-right"

                >close
                </v-icon>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12" cols="12" class="mb-1">
                <v-card outlined color="grayBg" class="block-gray rounded-0">
                  <v-row>
                    <v-col sm="3" cols="12" class="pb-0">
                      <label class="label">{{ $t('month_of') }}</label>
                      <v-menu
                          v-model="menu"
                          disabled
                          class="mt-1"
                          :close-on-content-click="false"
                          max-width="290">
                        <template v-slot:activator="{ on,attrs }">
                          <v-text-field class="disable_alert my-0 mt-1"
                                        v-model="monthlyReturn.monthOf"
                                        readonly
                                        outlined
                                        disabled
                                        append-icon="event"
                                        v-on="on"
                                        v-bind="attrs"
                                        @click:clear="monthlyReturn.monthOf"
                                        @click:append="menu = true"
                                        required/>
                        </template>
                        <v-date-picker
                            :type="'month'"
                            v-model="monthlyReturn.monthOf"
                            no-title
                        />
                      </v-menu>
                    </v-col>
                    <v-col sm="3" cols="12" class="pb-0">
                      <label class="label mb-0">{{ $t('number') }}</label>
                      <v-row class="mt-1 mr-0">
                        <v-col sm="3" cols="3" class="pt-0 pr-0">
                          <div class="code_text text-bold">{{ monthlyReturn.abbr }}</div>
                        </v-col>
                        <v-col sm="9" cols="9" class="pt-0 pl-0 pr-1">
                          <v-text-field class=" custom-border "
                                        v-model="monthlyReturn.number"
                                        outlined
                                        disabled
                                        required/>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col class="py-0" sm="3" cols="12">
                      {{ $t('approved_exchange_rate_for_the_selected_month') }}
                    </v-col>
                    <v-col class="py-0" sm="1" cols="12">
                      <p class="mb-0 primary--text font_18 text-bold">4200</p>
                    </v-col>
                    <v-col>
                      <v-btn @click="onCreateWithholding" class="rounded-0 my-n4" tile color="success"
                             dark
                             :disabled="isDisable">
                        {{ $t('add_new') }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" cols="12" justify="center">
                <template>
                  <v-data-table
                      :items="withholdingTaxs"
                      :headers="headersWithholding"
                      :loading="withholdingTaxs.length <= 0"
                      hide-default-header
                      no-data-text="No Data Here!"
                      :items-per-page="5"
                      responsive
                      class="header_table">
                    <template v-if="withholdingTaxs.length <= 0" v-slot:progress>
                      <v-progress-linear
                          color="blue"
                          rounded
                          :active="progress_load"
                          :indeterminate="progress_load"
                      ></v-progress-linear>
                      <v-card-text class="text-center">{{
                          text_load
                        }}
                      </v-card-text>
                    </template>
                    <template v-slot:header="{ props: { headers } }">
                      <thead>
                      <tr>
                        <th rowspan="2" class="text-center">No.</th>
                        <th rowspan="2" class="text-center">Date</th>
                        <th rowspan="2" class="text-center">Invoice No.</th>
                        <th rowspan="2" class="text-center">Nature of WHT</th>
                        <th colspan="4" class="text-center">Receiver</th>
                        <th rowspan="2" class="text-center">Type of WHT</th>
                        <th rowspan="2" class="text-center">Amount</th>
                        <th rowspan="2" class="text-center">Amount WHT</th>
                        <th rowspan="2" class="text-center">Data Source</th>
                        <th rowspan="2" class="text-center">Status</th>
                        <th rowspan="2" class="text-center">Action</th>
                      </tr>
                      <tr>
                        <th class="text-center">Type</th>
                        <th class="text-center">Type Taxpayer</th>
                        <th class="text-center">TIN/BIN/TID</th>
                        <th class="text-center">Name</th>
                      </tr>
                      </thead>
                    </template>
                    <template v-slot:body="{ items }">
                      <tbody style="white-space:nowrap;">
                      <tr v-for="(item, no) in items" :key="item.id">
                        <td>{{ no + 1 }}</td>
                        <td>{{ item.date }}</td>
                        <td>{{ item.reference }}</td>
                        <td>{{ item.natureTaxType.name }}</td>
                        <td>{{ item.supplier.type }}</td>
                        <td></td>
                        <td></td>
                        <td>{{ item.supplier.name }}</td>
                        <td>{{ item.typeProduct.defaultTax }}</td>
                        <td>{{ item.totalAmount.toLocaleString() }}</td>
                        <td>{{ item.totalVAT.toLocaleString() }}</td>
                        <td>{{ item.dataSource.name }}</td>
                        <td>{{ item.status.name }}</td>
                        <td>
                          <v-btn
                              :disabled="isDisable"
                              @click="editItemWithholding(item)"
                              small
                              outlined
                              fab
                              class="text-center no_border"
                              color="primary"
                          >
                            <v-icon class="primary--text" size="17">fas fa-edit</v-icon>
                          </v-btn>
                          <v-btn
                              :disabled="isDisable"
                              @click="deleteItemWithholdings(item)"
                              small
                              outlined
                              fab
                              class="text-center no_border"
                              color="red"
                          >
                            <v-icon small> fas fa-trash-alt</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                      </tbody>
                    </template>
                  </v-data-table>
                </template>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script src="./_withholding_tax_record.js" lang="js"></script>
<style lang="css" scoped></style>
