<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" sm="8">
          <v-card
            outlined
            dense
            class="pa-4 no_border rounded-sm"
            color="white"
          >
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card outlined dense class="no_border">
                <h2 class="mb-0">{{ $t("store") }}</h2>
                <v-icon
                  @click="cancel()"
                  style="cursor: pointer; color: #333; font-size: 40px"
                  class="float-right"
                  >close
                </v-icon>
              </v-card>
              <v-card outlined dense class="px-3 no_border" color="grayBg">
                <v-row>
                  <v-col sm="12" cols="12" class="pb-0">
                    <label class="label mb-0">{{ $t("name") }}</label>
                    <v-text-field
                      class="pt-1"
                      outlined
                      v-model="s.name"
                      :rules="[(v) => !!v || $t('is_required')]"
                      required
                    />
                  </v-col>
                  <v-col sm="12" cols="12" class="py-0">
                    <label class="label mb-0">{{ $t("code") }}</label>
                    <v-text-field
                      class="pt-1"
                      outlined
                      v-model="s.code"
                      :rules="[(v) => !!v || $t('is_required')]"
                      required
                    />
                  </v-col>
                  <v-col sm="12" cols="12" class="py-0">
                    <label class="label mb-0">{{ $t("nature_type") }}<v-icon size="18" color="red" @click="loadSegment"
                        >refresh</v-icon
                      ></label>
                    <v-select
                      class="mt-1"
                      outlined
                      item-value="name"
                      item-text="name"
                      :items="natures"
                      v-model="s.nature"
                    />
                  </v-col>
                  <v-col sm="12" cols="12" class="py-0">
                    <label class="label mb-0">{{ $t("segment") }}<v-icon size="18" color="red" @click="loadSegment"
                        >refresh</v-icon
                      ></label>
                    <v-select
                      class="mt-1"
                      outlined
                      item-value="id"
                      item-text="name"
                      :items="segments"
                      v-model="s.segmentId"
                    />
                  </v-col>
                  <v-col sm="12" cols="12" class="py-0">
                    <label class="label mb-0">{{ $t("warehouse") }}<v-icon size="18" color="red" @click="loadWarehouses"
                        >refresh</v-icon
                      ></label>
                    <v-select
                      class="mt-1"
                      outlined
                      :items="warehouses"
                      v-model="s.warehouseId"
                      item-value="pk"
                      item-text="name"
                    />
                  </v-col>
                  <v-col sm="12" cols="12" class="py-0">
                    <label class="label mb-0">{{ $t("sale_channel") }}<v-icon size="18" color="red" @click="loadSaleChannel"
                        >refresh</v-icon
                      ></label>
                    <v-select
                      v-model="s.saleChannelId"
                      class="mt-1"
                      :items="saleChannels"
                      item-value="id"
                      item-text="name"
                      outlined
                    />
                  </v-col>
                  <v-col sm="12" cols="12" class="py-0">
                    <label class="label mb-0">{{ $t("address") }}</label>
                    <v-textarea
                      height="50"
                      v-model="s.address"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card>
              <v-divider />
              <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                :myLoading="true" 
              />
              <v-card outlined dense class="no_border function_footer">
                <v-btn
                  @click="cancel"
                  color="black"
                  outlined
                  class="text-capitalize black--text float-left"
                >
                  {{ $t("cancel") }}
                </v-btn>
                <v-btn
                  @click="save"
                  color="primary"
                  class="float-right white--text text-capitalize"
                >
                  {{ $t("save_close") }}
                </v-btn>
              </v-card>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import {i18n} from '@/i18n';
import StoreModel from "@/scripts/commerce/model/Store";
const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
const segmentHandler = require("@/scripts/segmentHandler")
const saleChannelHandler = require("@/scripts/saleChannelHandler")
const warehouseHandler = require("@/scripts/warehouseHandler")
export default {
  name: "AddStore",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    showLoading: false,
    segments: [],
    saleChannels: [],
    warehouses: [],
    s: new StoreModel({}),
    natures: [
      {name: 'retail'},
      {name: 'restaurant'},
      {name: 'service'}
    ],
    isEdit: false,
    valid: true,
  }),
  methods: {
    cancel(){
      this.s = new StoreModel({})
      this.$router.push(`${i18n.locale}` + '/stores')
    },
    save(){
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate()
        return
      }
      this.showLoading = true
      commerceHandler.storeCreate(new StoreModel(this.s)).then(response => {
        this.showLoading = false
        if (response.data.statusCode === 201) {
          this.showLoading = false
          this.$swal({
              position: 'products',
              icon: 'success',
              title: i18n.t('your_work_has_been_saved'),
              showConfirmButton: true,
              confirmButtonColor: '#4d4848',
              cancelButtonColor: '#ED1A3A',
              confirmButtonText: i18n.t('ok')
          })
          this.cancel()
        }
      }).catch(e => {
        this.showLoading = false
        this.$snotify.error('Something went wrong')
        window.console.log(e, 'error')
      })
    },
    async loadSegment() {
      this.showLoading = true;
      this.segments = []
      segmentHandler.getAll().then((res) => {
        this.showLoading = false;
        if (res.data.statusCode === 200) {
          this.segments = res.data.data
          if(this.segments.length > 0 && this.isEdit == false){
            this.s.segmentId = this.segments[0].id
          }
        }
      })
    },
    async loadSaleChannel() {
      this.showLoading = true;
      this.saleChannels = []
      saleChannelHandler.get().then((res) => {
        this.showLoading = false;
        if (res.data.statusCode === 200) {
          this.saleChannels = res.data.data
          if(this.saleChannels.length > 0 && this.isEdit == false){
            this.s.saleChannelId = this.saleChannels[0].id
          }
        }
      })
    },
    async loadWarehouses() {
      this.showLoading = true
      this.warehouses = []
      await warehouseHandler.getWarehouseSettingAll().then((res) => {
        this.showLoading = false
        this.warehouses = res;
        if (res.length > 0 && this.isEdit == false) {
          this.s.warehouseId = res[0].id
           window.console.log(this.s.warehouseId, 'ware house')
        }
      });
    },
    loadSingle(){
      this.showLoading = true
      commerceHandler.storeGet(this.$route.params.id).then((res) => {
          this.showLoading = false
          if(res.status == 200){
              this.s = new StoreModel(res.data.data[0])
          }else{
              this.cancel()
          }
      })
    },
    clear(){
      this.isEdit = false
      this.s = new StoreModel({})
    },
    async initData() {
      if (this.$route.params.id !== undefined) {
          this.isEdit = true
          await this.loadSingle()
      } else {
          this.clear()
      }
      await this.loadSaleChannel()
      await this.loadWarehouses()
      await this.loadSegment()
    },
  },
  mounted: async function () {
     await this.initData()
  },
  computed: {
  },
  created: async function () {
  },
  watch: {
    '$route': 'initData'
  },
};
</script>

<style scoped>
.function_content {
  padding: 0 25px 25px;
  border-bottom: 0;
  background-color: #fff !important;
}

@media (min-width: 1264px) {
  .container {
    /* max-width: 1185px; */
    max-width: 1080px !important;
  }
}

.grayBg {
  background-color: #f8f8f9;
}

@media (max-width: 576px) {
  .mb-6 {
    margin-bottom: 0 !important;
  }
}

.section2 {
  border: 1px solid #d6d7d8;
}

.border_grey {
  border: 1px solid #d6d7d8;
}

.attachment_table {
  width: 100%;
}

.my_checkbox input[type="checkbox"] + label {
  display: grid;
  grid-template-columns: 20% 80%;
  margin: 0.2em 0px;
  cursor: pointer;
  line-height: 16px;
  padding: 0.2em;
}
</style>
