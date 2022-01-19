<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card
              outlined
              dense
              class="pa-4 no_border rounded-sm"
              color="white"
          >
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card outlined dense class="no_border">
                <h2 class="mb-0">{{ $t("bill_of_material") }} # {{ bom.referenceNo }}</h2>
                <v-icon
                    onclick="window.history.go(-1); return false;"
                    style="cursor: pointer; color: #333; font-size: 40px;"
                    class="float-right"
                >close
                </v-icon>
              </v-card>
              <v-card outlined dense class="px-3 no_border" color="grayBg">
                <v-row>
                  <v-col sm="4" cols="12" class="pb-0">
                    <label class="label  mb-0">{{ $t("bom_type") }}</label>
                    <h3 class="text-bold  py-1">{{ bomType }}</h3>
                  </v-col>
                  <v-col sm="4" cols="12" class="pb-0">
                    <label class="label  mb-0">{{
                        $t("warehouse")
                      }}</label>
                    <h3 class="text-bold  py-1">{{ warehouse }}</h3>
                  </v-col>
                  <v-col sm="4" cols="12" class="pb-0">
                    <label class="label  mb-0">{{
                        $t("transaction_date")
                      }}</label>
                    <h3 class="text-bold  py-1">{{ bom.transactionDate }}</h3>
                  </v-col>
                </v-row>
              </v-card>
              <v-row>
                <v-col sm="12" cols="12" class="pt-0">
                  <!-- Grid One -->
                  <v-row style="background-color: #fff;">
                    <v-col cols="12" class="py-1 pb-0">
                      <h2 class="primary--text mb-0 font_20 text-uppercase">
                        {{ $t("finish_product_variant") }}
                      </h2>
                    </v-col>
                    <v-col sm="12" cols="12">
                      <kendo-datasource
                          ref="finishProductDS"
                          :data="bom.finishProduct"
                      />
                      <kendo-grid
                          id="gridFinishProduct"
                          class="grid-function"
                          :data-source-ref="'finishProductDS'"
                          :sortable="false"
                          :filterable="false"
                          :column-menu="true"
                          :editable="false"
                          :scrollable-virtual="true"
                      >
                        <kendo-grid-column
                            :template="rowNumberFP"
                            :title="$t('no.')"
                            :width="55"
                            :column-menu="false"
                            :headerAttributes="{
                            style: 'background-color: #EDF1F5;',
                            class: 'text-variants',
                          }"
                            :attributes="{
                            style: 'text-align: variants',
                          }"
                        />
                        <kendo-grid-column
                            :field="'item'"
                            :title="$t('items')"
                            :width="200"
                            :template="itemTemplate"
                            :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                            :field="'description'"
                            :title="$t('description')"
                            :width="200"
                            :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                            :field="'buom'"
                            :title="$t('base_uom')"
                            :width="150"
                            :template="UOMTemplate"
                            :editable="
                            () => {
                              return false;
                            }
                          "
                            :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                            :attributes="{ style: 'text-align: right; ' }"
                        />
                        <kendo-grid-column
                            :field="'yieldQty'"
                            :title="$t('yield_qty')"
                            :attributes="{
                            class: 'k-state-disabled',
                            style: 'text-align: right',
                          }"
                            :width="150"
                            :template="
                            '<span>#=kendo.toString(yieldQty || 0, decimalFormat) || 0#</span>'
                          "
                            :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                            :field="'cost'"
                            :title="$t('cost')"
                            :width="150"
                            :template="
                            '<span>#=kendo.toString(cost || 0, decimalFormat) || 0#</span>'
                          "
                            :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                            :attributes="{
                            style: 'text-align: right',
                          }"
                        />
                        <kendo-grid-column
                            :field="'amount'"
                            :title="$t('amount')"
                            :width="150"
                            :template="
                            '<span>#=kendo.toString(amount || 0, decimalFormat) || 0#</span>'
                          "
                            :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                            :attributes="{
                            style: 'text-align: right',
                          }"
                        />
                      </kendo-grid>
                    </v-col>
                  </v-row>
                  <!-- Grid Two -->
                  <v-row style="background-color: #fff;">
                    <v-col cols="12" class="py-1 pb-0">
                      <h2 class="primary--text mb-0 font_20 text-uppercase">
                        {{ $t("other_finished_by_product") }}
                      </h2>
                    </v-col>
                    <v-col sm="12" cols="12">
                      <kendo-datasource
                          ref="otherProductDS"
                          :data="bom.otherFinishProduct"
                      />
                      <kendo-grid
                          id="gridOtherProduct"
                          class="grid-function"
                          :data-source-ref="'otherProductDS'"
                          :sortable="false"
                          :filterable="false"
                          :column-menu="true"
                          :editable="false"
                          :scrollable-virtual="true"
                      >
                        <kendo-grid-column
                            :template="rowNumberOP"
                            :title="$t('no.')"
                            :width="55"
                            :column-menu="false"
                            :headerAttributes="{
                            style: 'background-color: #EDF1F5;',
                            class: 'text-variants',
                          }"
                            :attributes="{
                            style: 'text-align: variants',
                          }"
                        />
                        <kendo-grid-column
                            :field="'item'"
                            :title="$t('item')"
                            :width="200"
                            :template="itemTemplate"
                            :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                            :field="'description'"
                            :title="$t('description')"
                            :width="200"
                            :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                            :field="'buom'"
                            :title="$t('base_uom')"
                            :width="150"
                            :template="UOMTemplate"
                            :editable="
                            () => {
                              return false;
                            }
                          "
                            :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                            :attributes="{ style: 'text-align: right; ' }"
                        />
                        <kendo-grid-column
                            :field="'yieldQty'"
                            :title="$t('yield_qty')"
                            :width="150"
                            :template="
                            '<span>#=kendo.toString(yieldQty || 0, decimalFormat) || 0#</span>'
                          "
                            :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                            :attributes="{
                            style: 'text-align: right',
                          }"
                        />
                        <kendo-grid-column
                            :field="'cost'"
                            :title="$t('cost')"
                            :width="150"
                            :template="
                            '<span>#=kendo.toString(cost || 0, decimalFormat) || 0#</span>'
                          "
                            :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                            :attributes="{
                            style: 'text-align: right',
                          }"
                        />
                        <kendo-grid-column
                            :field="'amount'"
                            :title="$t('amount')"
                            :width="150"
                            :editable="
                            () => {
                              return false;
                            }
                          "
                            :template="
                            '<span>#=kendo.toString(amount || 0, decimalFormat) || 0#</span>'
                          "
                            :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                            :attributes="{
                            style: 'text-align: right',
                          }"
                        />
                      </kendo-grid>
                    </v-col>
                  </v-row>
                  <!-- Grid Three -->
                  <v-row class="mt-0" style="background-color: #fff;">
                    <v-col cols="12" class="py-1 pb-0">
                      <h2 class="greyText--text mb-0 font_20 text-uppercase">
                        {{ $t("components_used") }}
                      </h2>
                    </v-col>
                    <v-col sm="12" cols="12">
                      <kendo-datasource
                          ref="componentUseDS"
                          :data="bom.componentUsed"
                      />
                      <kendo-grid
                          id="gridComponentUse"
                          class="grid-function"
                          :data-source-ref="'componentUseDS'"
                          :sortable="false"
                          :filterable="false"
                          :column-menu="true"
                          :editable="false"
                          :scrollable-virtual="true"
                      >
                        <kendo-grid-column
                            :template="rowNumberCU"
                            :title="$t('no.')"
                            :width="55"
                            :column-menu="false"
                            :headerAttributes="{
                            style: 'background-color: #EDF1F5;',
                            class: 'text-variants',
                          }"
                            :attributes="{
                            style: 'text-align: variants',
                          }"
                        />
                        <kendo-grid-column
                            :field="'item'"
                            :title="$t('item')"
                            :width="200"
                            :template="itemTemplate"
                            :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                            :field="'description'"
                            :title="$t('description')"
                            :width="200"
                            :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                            :template="UOMTemplate"
                            :field="'buom'"
                            :title="$t('base_uom')"
                            :width="160"
                            :editable="
                            () => {
                              return false;
                            }
                          "
                            :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                            :field="'qty'"
                            :title="$t('qty')"
                            :width="150"
                            :template="
                            '<span>#=kendo.toString(qty || 0, decimalFormat) || 0#</span>'
                          "
                            :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                            :attributes="{
                            style: 'text-align: right',
                          }"
                        />
                        <kendo-grid-column
                            :field="'cost'"
                            :title="$t('cost')"
                            :width="150"
                            :template="
                            '<span>#=kendo.toString(cost || 0, decimalFormat) || 0#</span>'
                          "
                            :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                            :attributes="{
                            style: 'text-align: right',
                          }"
                        />
                        <kendo-grid-column
                            :field="'amount'"
                            :title="$t('amount')"
                            :width="150"
                            :editable="
                            () => {
                              return false;
                            }
                          "
                            :template="
                            '<span>#=kendo.toString(amount || 0, decimalFormat) || 0#</span>'
                          "
                            :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                            :attributes="{
                            style: 'text-align: right',
                          }"
                        />
                      </kendo-grid>
                    </v-col>
                  </v-row>
                  <v-row class="mt-0" style="background-color: #fff;">
                    <v-col sm="12" cols="12" class="py-0">
                      <v-row>
                        <v-col sm="6" cols="6" class="py-0">
                          <v-textarea
                              class="mt-1"
                              outlined
                              clearable
                              rows="3"
                              no-resize
                              v-model="bom.transactionNote"
                              height="90px"
                              tag="Memo"
                              placeholder="Memo"
                          />
                        </v-col>
                        <v-col sm="6" cols="6" class="py-0">
                          <v-simple-table>
                            <template v-slot:default>
                              <tbody>
                              <tr>
                                <td class="text-left text-uppercase">
                                  {{ $t("total_cost") }}
                                </td>
                                <td class="text-center">:</td>
                                <td class="text-bold text-right">
                                  {{ numberFormat(bom.exchangeAmount) }}
                                </td>
                              </tr>
                              <tr>
                                <td class="text-left text-uppercase">
                                  {{ $t("variance") }}
                                </td>
                                <td class="text-center">:</td>
                                <td
                                    v-bind:class="[
                                      bom.variance >= 0 ? '' : 'redText',
                                    ]"
                                    class="text-right text-bold"
                                >
                                  {{ numberFormat(bom.variance) }}
                                </td>
                              </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider/>
              <v-card outlined dense class="no_border function_footer">
                <!--                <v-btn class="float-right save_print mx-1">-->
                <!--                  {{ $t("print") }}-->
                <!--                </v-btn>-->
                <!--                <v-btn-->
                <!--                    class="float-right btn_delete mx-1"-->
                <!--                >-->
                <!--                  {{ $t("delete") }}-->
                <!--                </v-btn>-->
                <v-btn class="float-right btn_save_draft mx-1" @click="goEdit">
                  {{ $t("edit") }}
                </v-btn>
              </v-card>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <LoadingMe
          :isLoading="showLoading"
          :fullPage="false"
          type="loading"
          :myLoading="true"
      />
    </v-container>
  </v-app>
</template>

<script>
import BomModel from "@/scripts/model/Bom";
import kendo from "@progress/kendo-ui";

const bomHandler = require("@/scripts/bomHandler")
const bomModel = new BomModel({});

export default {
  name: "BillOfMaterialView",
  props: ['id'],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  computed: {
    bomType() {
      if (this.bom.hasOwnProperty('typeBom')) {
        if (this.bom.typeBom.hasOwnProperty('name')) {
          return this.bom.typeBom.name || ''
        }
      }
      return ''
    },
    warehouse() {
      if (this.bom.hasOwnProperty('warehouse')) {
        if (this.bom.warehouse.hasOwnProperty('id')) {
          return this.bom.warehouse.name || ''
        }
      }
      return ''
    },
  },
  data: () => ({
    valid: false,
    isEdit: false,
    showLoading: false,
    isHideBar: false,
    bom: bomModel,
    bomTypes: [
      {id: 1, name: "One Time Use"},
      {id: 2, name: "Multiple Use"},
    ],
    decimalFormat: 2,
    loggedUser: {
      id: "cf3d10ab-bce6-47b3-8405-b448c23dad84",
      name: "Mr. Inspector",
    },
  }),
  methods: {
    goEdit() {
      if (this.$route.params.id) {
        this.$router.push({
          path: 'bom/' + this.$route.params.id,
          name: 'Bills Of Material',
          params: {id: this.$route.params.id}
        })
      }
    },
    async loadViewBOM() {
      new Promise(resolve => {
            setTimeout(() => {
              resolve('resolved')
              this.showLoading = true
              bomHandler.getAll('?id=' + this.$route.params.id).then(res => {
                this.showLoading = false
                this.bom = res[0]
              })
            }, 10)
          }
      )
    },
    numberFormat(value) {
      return kendo.toString(value, `n${this.decimalFormat}`);
    }
    ,
    rowNumberFP(dataItem) {
      let ds = this.$refs.finishProductDS.kendoWidget(),
          index = ds.indexOf(dataItem);
      return index + 1;
    }
    ,
    UOMTemplate(dataItem) {
      const uom = dataItem.buom;
      if (uom) {
        return `<span>${uom.name ? uom.name : ``}</span>`;
      } else {
        return ``;
      }
    }
    ,
    itemTemplate(dataItem) {
      const item = dataItem.item;
      if (item) {
        return `<span>${item.name ? item.name : ``}</span>`;
      } else {
        return ``;
      }
    }
    ,
    rowNumberOP(dataItem) {
      let ds = this.$refs.otherProductDS.kendoWidget(),
          index = ds.indexOf(dataItem);
      return index + 1;
    },

    rowNumberCU(dataItem) {
      let ds = this.$refs.componentUseDS.kendoWidget(),
          index = ds.indexOf(dataItem);
      return index + 1;
    }
    ,
    cancel() {
    }
    ,
  },
  async mounted() {
    // await this.loadSaleFormContent();
    // await this.loadPrefix();
    await this.loadViewBOM()
  }
  ,
  async created() {
    // await this.loadTax()
    // await this.loadAccount()
  },
  watch: {
    id() {
      if (this.$route.params) {
        if (this.$route.params.id !== '' || this.$route.params.id !== undefined) {
          this.showLoading = true
          this.loadViewBOM()
          this.showLoading = false
        }
      }
    }
  }
}
;
</script>
<style scoped>
.redText {
  color: red !important;
}

.small_sidebar {
  height: 97%;
  position: relative;
  padding: 12px;
}

.hide_small_bar_class {
  max-width: 0;
  transition: 0.5s ease-in;
  flex: 0 0 0;
  padding: 0;
}

.hide_big_bar_class {
  max-width: 100%;
  transition: 0.5s ease-in;
  flex: 0 0 100%;
}

.iconArrow {
  right: -35px;
  position: absolute;
  bottom: -10px;
}

.iconArrowHide {
  position: absolute;
  right: -7px;
  bottom: -10px;
}

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.detial_smallside_p {
  position: absolute;
  bottom: 10px;
}

@media (min-width: 1264px) {
  .container {
    /* max-width: 1185px; */
    max-width: 1080px !important;
  }
}
</style>
