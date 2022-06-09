<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <h2 class="mb-0 float-left">{{ $t('price_level') }}</h2>

      <v-row class="">
        <v-col sm="12" cols="12" class="pr-0">
          <v-dialog v-model="dialogm3" max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" class=" white--text float-right text-capitalize"
                     v-on="on"
                     @click="onNewClick">
                {{ $t('new_price') }}
              </v-btn>
            </template>
            <v-card>
              <div class="modal_header">
                <v-card-title>{{ $t('new_price') }}</v-card-title>
                <v-icon  @click="dialogm3 = false">close</v-icon>
              </div>
              <v-card-text class="modal_text_content">
                <v-row>
                  <v-col sm="6" cols="12" class="pb-0">
                    <label>{{ $t('price_list_name') }}</label>
                    <v-text-field class=" my-2"
                                  v-model="priceLevel.name"
                                  outlined
                                  tage="Pirce List Name"
                                  clearable/>
                  </v-col>
                  <v-col sm="6" cols="12" class="pb-0">
                    <label class="label">{{ $t('type') }}</label>
                    <v-select class=" my-2"
                              tag="priceLevelType"
                              v-model="mPriceLevelType"
                              :items="priceLevelType"
                              return-object
                              clearable
                              outlined/>
                  </v-col>
                  <v-col sm="6" cols="12" class="py-0">
                    <label>{{ $t('code') }}</label>
                    <v-text-field class=" my-2"
                                  v-model="priceLevel.code"
                                  outlined
                                  tage="Code"
                                  clearable/>
                  </v-col>
                  <v-col sm="6" cols="12" class="py-0">
                    <label>{{ $t('currency') }}</label>
                    <v-select class=" my-2"
                              outlined
                              tage="Currency"
                              v-model="mCurrency"
                              :items="currencies"
                              item-value="id"
                              :item-text="item =>`${item.code} - ${item.name}`"
                              return-object
                              clearable/>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="modal_footer">
                <v-row>
                  <v-col sm="6" cols="6" class="py-0 text-left">
                    <v-btn color="primary" outlined
                           class=" text-capitalize  black--text float-left"
                           @click="dialogm3 = false">{{ $t('cancel') }}
                    </v-btn>
                  </v-col>
                  <v-col sm="6" cols="6" class="py-0 text-right">
                    <v-btn color="primary" class="px-3  white--text text-capitalize"
                           @click="onSaveClose">
                      {{ $t('save_close') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-col>
      </v-row>

      <v-row class="">
        <v-col sm="12" cols="12" class="pb-0">
          <template>
            <v-simple-table class="attachment_table">
              <template v-slot:default>
                <thead>
                <tr>
                  <th>{{ $t('name') }}</th>
                  <th>{{ $t('code') }}</th>
                  <th>{{ $t('currency') }}</th>
                  <th>{{ $t('type') }}</th>
                  <th>{{ $t('products') }}</th>
                  <th>{{ $t('contacts') }}</th>
                  <th>{{ $t('action') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="pl in priceLevels" v-bind:key="pl.id">
                  <td class="text-bold">{{ pl.name }}</td>
                  <td>{{ pl.code }}</td>
                  <td>{{ pl.currency.code }}</td>
                  <td>{{ pl.type }}</td>
                  <td>0</td>
                  <td>0</td>
                  <td>
                    <v-btn class="btn_edit_setting" @click="onEditClick(pl)">
                      <v-icon class="white--text" size="14">mdi-pen</v-icon>
                      <span class="capitalize ml-1 white--text font_14">{{ $t('edit') }}</span>
                    </v-btn>
                  </td>
                </tr>
                <LoadingMe
                    :isLoading="compeletLoading"
                    :fullPage="false"
                    type="loading"
                    :myLoading="true"/>
                </tbody>
              </template>
            </v-simple-table>
          </template>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
const priceLevelHandler = require("@/scripts/priceLevelHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
export default {
  data: () => ({
    mPriceLevelType: '',
    priceLevelType: [
      'Buy', 'Sell', 'Rent', 'Purchase'
    ],
    mCurrency: '',
    currencies: [],
    priceLevels: [],
    priceLevel: {
      id: '',
      name: '',
      code: '',
      type: '',
      currency: ''
    },
    compeletLoading: false,
    dialogm3: false,
  }),
  props: {},
  methods: {
    async onEditClick(value) {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
          this.priceLevel = value
          this.mCurrency = value.currency
          this.mPriceLevelType = value.type
          this.dialogm3 = true
        }, 300);
      })
    },
    onNewClick() {
      this.priceLevel.id = ''
      this.clear()
    },
    close() {
      this.dialogm3 = false
    },
    clear() {
      this.priceLevel = {}
    },
    async onSaveClose() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
          if (this.priceLevel.id === '' || this.priceLevel.id === undefined) {
            let data = {
              "code": this.priceLevel.code,
              "name": this.priceLevel.name,
              "type": this.mPriceLevelType,
              "currency": this.mCurrency
            }
            priceLevelHandler.create(data).then(response => {
              if (response.data.statusCode === 201) {
                this.loadPriceLevel()
                this.clear()
                this.close()
              }
            }).catch(e => {
              this.errors.push(e)
            })
          } else {
            let isTypeChanged = 1;
            if (this.mPriceLevelType === this.priceLevel.type) {
              isTypeChanged = 0
            }
            let isCurrencyChanged = 1;
            if (this.mCurrency.id === this.priceLevel.currency.id) {
              isCurrencyChanged = 0
            }
            let data = {
              "code": this.priceLevel.code,
              "name": this.priceLevel.name,
              "type": this.mPriceLevelType,
              "currency": this.mCurrency,
              "isTypeChanged": isTypeChanged,
              "isCurrencyChanged": isCurrencyChanged,
              "delPriceLevelTypeId": this.priceLevel.type,
              "delCurrencyId": this.priceLevel.currency.id,

            }
            priceLevelHandler.update(this.priceLevel.id, data).then(response => {
              if (response.data.statusCode === 201) {
                this.loadPriceLevel()
                this.clear()
                this.close()
              }
            }).catch(e => {
              this.errors.push(e)
            })
          }
        }, 300);
      })
    },
    async loadCurrency() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
          currencyHandler.get().then(res => {
            this.compeletLoading = false
            this.currencies = res.filter(o => o.used === 1)
          })
        }, 300);
      })
    },
    async loadPriceLevel() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
          this.compeletLoading = true
          priceLevelHandler.get().then(res => {
            this.compeletLoading = false
            this.priceLevels = res
          })
        }, 50);
      })
    },
  },
  mounted: async function () {
    await this.loadCurrency()
    await this.loadPriceLevel()
  },
  computed: {},
  components: {
    LoadingMe: () => import(`@/components/Loading`)
  },
};
</script>

<style scoped>
.function_footer {
  padding: 15px;
  display: inline-block;
}

p {
  color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
  height: 47.2px !important;
}

.text_tip {
  font-size: 9px;
  line-height: 10px;
}

@media (max-width: 576px) {
}
</style>
