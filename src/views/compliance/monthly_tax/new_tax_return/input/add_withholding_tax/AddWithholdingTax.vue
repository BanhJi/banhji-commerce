<!--
  - Last modified : 3/31/21, 10:09 AM in Project banhji-accounting-web-module
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
          <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
            <v-toolbar flat>
              <v-toolbar-title><h2 class="mb-0">{{ $t('add_withholding_tax') }}</h2></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-icon
                    @click="onClose"
                    style="cursor: pointer; color: #333; font-size: 36px"
                    class="float-right"
                >close
                </v-icon>
              </v-toolbar-items>
            </v-toolbar>

            <v-card-text>
              <v-card outlined dense class="px-4 no_border" color="grayBg">
                <!--                                <div class="function_content pa-4">-->
                <v-row>
                  <v-col sm="4" cols="12" class="py-0 pb-0 pt-4">
                    <label class="label">{{
                        $t("reference")
                      }}</label>
                    <v-text-field
                        class="disable_alert my-3"
                        v-model="withholdingTax.reference"
                        outlined
                        required
                    />
                  </v-col>
                  <v-col sm="4" cols="12" class="py-0 pb-0 pt-4">
                    <label class="label">{{
                        $t("supplier")
                      }}</label>
                    <v-col sm="12" cols="12"
                           class="kendo_dropdown_custom my-3" style="padding: 0">
                      <dropdownlist
                          style="width: 100%"
                          class=""
                          :data-items="supplierList"
                          @change="onChange"
                          :value="withholdingTax.supplier"
                          :data-item-key="'id'"
                          :text-field="'name'"
                          :default-item="defaultItem"
                          :filterable="true"
                          @filterchange="onSupplierFilterChanged">
                      </dropdownlist>
                    </v-col>
                  </v-col>
                  <v-col sm="4" cols="12" class="py-0 pb-0 pt-4">
                    <label class="label">{{ $t("date") }}</label>
                    <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        max-width="290"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            class="disable_alert my-3"
                            v-model="withholdingTax.date"
                            readonly
                            outlined
                            append-icon="event"
                            v-on="on"
                            v-bind="attrs"
                            @click:clear="withholdingTax.date = undefined"
                            @click:append="menu = true"
                            required
                        />
                      </template>
                      <v-date-picker
                          :min="monthlyReturn ? monthlyReturn.monthOf + '-01' : new Date(new Date().getFullYear(), 0, 2).toISOString().substr(0, 10)"
                          :max="monthlyReturn ? monthlyReturn.monthOf + '-31' : new Date(new Date().getFullYear(), 11, 31).toISOString().substr(0, 10)"
                          @change="menu = false"
                          v-model="withholdingTax.date"
                          no-title
                      />
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>

                </v-row>
                <!--                                </div>-->
              </v-card>
              <template>
                <kendo-datasource
                    ref="dataSource"
                    :data="withholdingTax.itemLine"
                    :change="onDataSourceChanges"
                />
                <kendo-grid
                    id="grid"
                    class="grid-function"
                    :data-source-ref="'dataSource'"
                    :sortable="false"
                    :filterable="false"
                    :column-menu="true"
                    :editable="true"
                    :scrollable-virtual="true"
                >
                  <kendo-grid-column
                      :title="$t('no')"
                      :width="60"
                      :template="rowNumberTmpl"
                      :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-center',}"
                      :attributes="{ style: 'text-align: center' }"
                  />
                  <kendo-grid-column
                      :field="'natureTaxType'"
                      :editor="natureTaxTypeDropdownEditor"
                      :title="$t('nature_tax_payer')"
                      :template="'<span>#=natureTaxType.name#</span>'"
                      :width="170"
                      :attributes="{ style: 'text-align: left ' }"
                      :headerAttributes="{style:'text-align: center; background-color: #EDF1F5'}"
                  />
                  <kendo-grid-column
                      :field="'taxName'"
                      :editor="typeProductTaxDropdownEditor"
                      :title="$t('type_product_service')"
                      :template="'<span>#=taxName.defaultTax#</span>'"
                      :width="210"
                      :attributes="{ style: 'text-align: left ' }"
                      :headerAttributes="{style:'text-align: center; background-color: #EDF1F5'}"
                  />
                  <kendo-grid-column
                      :field="'description'"
                      :title="$t('description')"
                      :width="170"
                      :headerAttributes="{style:'text-align: center; background-color: #EDF1F5'}"
                      :attributes="{ style: 'text-align: right; ' }"
                  />
                  <kendo-grid-column
                      :field="'amount'"
                      :format="'{0:n}'"
                      :title="$t('amount')"
                      :width="140"
                      :headerAttributes="{style:'text-align: center; background-color: #EDF1F5'}"
                      :attributes="{ style: 'text-align: right; ' }"
                  />
                  <kendo-grid-column
                      :field="'baseAmount'"
                      :title="$t('base_amount')"
                      :editable="disableEditor"
                      :template="'<span>#=baseAmount#</span>'"
                      :width="150"
                      :headerAttributes="{style: 'background-color: #EDF1F5',}"
                  />
                  <kendo-grid-column
                      :command="{
																	iconClass: 'k-icon k-i-trash',
																	text: 'Delete',
																	click: removeRow,
																	class: 'btn-plus',
																}"
                      :title="'&nbsp;'"
                      :width="90"
                      :headerAttributes="{
																	style:
																		'text-align: center; background-color: #EDF1F5',
																}"
                      :attributes="{ style: 'text-align: center; ' }"
                  />
                </kendo-grid>
              </template>
              <template>
                <v-btn @click="addRow" class="rounded-0 btn_plus" color="primary my-2">
                  <v-icon> mdi-plus</v-icon>
                </v-btn>
              </template>
              <template class="">
                <v-row>
                  <v-col offset-sm="8" class="pt-0" sm="4" cols="6">
                      <v-card class="no-boxshadow rounded-4 pa-3" color="grayBg">
                    <v-simple-table>
                      <template v-slot:default>
                        <tbody>
                        <tr>
                          <td class="text-left pr-0">{{ $t('amount') }}</td>
                          <td class="text-center">:</td>
                          <td class="text-right">
                            {{ numberFormat(amount) }}
                          </td>
                        </tr>
                        <tr>
                          <td class="text-left text-bold grayBg text-uppercase pr-0">{{
                              $t('total')
                            }}
                          </td>
                          <td class="text-center text-bold grayBg">:</td>
                          <td class="text-right grayBg color_green text-bold" id="total">
                            {{ numberFormat(totalVat) }}
                          </td>
                        </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                      </v-card>
                  </v-col>
                </v-row>

              </template>
            </v-card-text>
            <!--                                                <v-divider></v-divider>-->
            <v-card-actions>
              <v-row>
                <v-col sm="6" cols="12" class="py-0 text-left">
                  <v-btn
                      color="black"
                      outlined
                      class="ml-3 text-capitalize  black--text float-left"
                      @click="onClose"
                  >
                    {{ $t("cancel") }}
                  </v-btn>
                </v-col>
                <v-col sm="6" cols="12" class="py-0 text-right">
                  <v-btn
                      @click="onSaveClose"
                      dark
                      color="primary"
                      class="px-3  white--text text-capitalize "
                  >
                    {{ $t("save_close") }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
          <LoadingMe
              :isLoading="showLoading"
              :fullPage="false"
              :type="'loading'"
              :myLoading="true"
          />
      </v-row>
    </v-container>
  </v-app>
</template>

<script src="./_add_withholding_tax.js" lang="js"></script>
<style lang="less" scoped></style>
