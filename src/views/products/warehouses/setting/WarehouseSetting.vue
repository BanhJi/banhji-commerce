<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pa-0">
            <h2 class="mb-0">{{ $t('warehouse_location') }}</h2>
            <v-dialog v-model="dialogm2" max-width="380px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" @click="getWht"
                           class="white--text text-capitalize  float-right"
                           v-on="on">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t('warehouse_location') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="6" cols="6">
                                <label class="label">{{ $t('name') }}</label>
                                <v-text-field class=" mt-2"
                                              v-model="wh.name"
                                              outlined
                                              placeholder=""/>
                            </v-col>
                            <v-col sm="6" cols="6">
                                <label class="label">{{ $t('code') }}</label>
                                <v-text-field class=" mt-2"
                                              v-model="wh.code"
                                              outlined
                                              placeholder=""/>
                            </v-col>
                            <v-col sm="12" cols="12" class="pt-0">
                                <label class="label">{{ $t('warehouse_type') }}</label>
                                <v-select class=" mt-2 mb-3"
                                          id="acc_type_selector"
                                          :items="whTypes"
                                          v-model="wh.type"
                                          tage="Warehouse Type"
                                          item-text="name"
                                          item-value="id"
                                          outlined
                                          return-object/>

                                <label class="label">{{ $t('address') }}</label>
                                <v-text-field class=" mt-2 mb-3"
                                              v-model="wh.address"
                                              outlined
                                              placeholder=""/>

                                <v-checkbox class="ma-0 "
                                            v-model="wh.isSale"
                                            label="Salable from this location"/>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn color="primary" outlined
                                       class=" text-capitalize  black--text float-left"
                                       @click="dialogm2 = false">{{ $t('cancel') }}
                                </v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn @click="addWhSetting" color="primary"
                                       class="px-3  white--text text-capitalize">{{ $t('save_close') }}
                                </v-btn>
                            </v-col>
                        </v-row>
                        <!--                        <v-btn color="white" class=" black&#45;&#45;text float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>-->
                        <!--                        <v-btn color="blue" class=" white&#45;&#45;text text-capitalize float-right" >{{$t('save_new')}}-->
                        <!--                        </v-btn>-->

                    </v-card-actions>

                </v-card>
            </v-dialog>

            <p class="mb-3">{{ $t('warehouse_setting_decs') }}</p>
            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <template>
                        <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>{{ $t('type') }}</th>
                                    <th>{{ $t('code') }}</th>
                                    <th>{{ $t('name') }}</th>
                                    <th>{{ $t('sale') }}</th>
                                    <th>{{ $t('address') }}</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="wh in whSettings" v-bind:key="wh.pk">
                                    <td>{{ wh.type.name }}</td>
                                    <td>{{ wh.code }}</td>
                                    <td class="text-bold">{{ wh.name }}</td>
                                    <td>
                                        <label class="form-checkbox">
                                            <input disabled type="checkbox" v-model="wh.isSale">
                                            <i disabled class="form-icon"></i>
                                        </label>
                                    </td>
                                    <td>{{ wh.address }}</td>
                                    <td class="text-center">
                                        <v-btn class="bg-none">
                                            <v-icon size="17px" class="primary--text">fa fa-eye</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
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
const warehouseHandler = require("@/scripts/warehouseHandler")
export default {
    data: () => ({
        dialogm2: false,
        whTypes: [],
        wh: {},
        mWHType: '',
        whSettings: []
    }),
    methods: {
        async getWht() {
            warehouseHandler.getWhtAll().then(res => {
                if (res.data) {
                    this.whTypes = res.data
                    window.console.log('dsa',this.whTypes)
                }
            })

        },
        async addWhSetting() {
            window.console.log(this.wh, " hhh")
            let data = {
                'name': this.wh.name,
                'code': this.wh.code,
                'address': this.wh.address,
                'type': this.wh.type,
                'isSale': this.wh.isSale
            }
            warehouseHandler.saveWarehouseSetting(data).then(response => {
                this.dialogm2 = false
                if (response) {
                    self.responseStatus(response.status)
                } else {
                    self.alertError()
                }
            }).catch(error => {
                self.alertError(error)
            })

        },
        async loadWhSetting() {
            warehouseHandler.getWarehouseSettingAll().then(res => {
                if (res) {
                    this.whSettings = res
                }
            })
        },
        close() {
            this.dialogm2 = false
        }
    },
    watch: {
        dialogm2(val) {
            val || this.close()
        },
    },
    mounted() {
        this.loadWhSetting()
    },
    computed: {},
};
</script>
<style scoped>
@media (max-width: 576px) {

}
</style>