<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pa-0">
            <h2 class="mb-0">{{ $t('zone') }}</h2>
            <v-dialog v-model="dialog" max-width="380px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" @click="onCreate"
                           class="white--text text-capitalize  float-right" v-on="on">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t('zone') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialog = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="12" cols="12" class="">
                                    <label class="label">{{ $t('warehouse_location') }}</label>
                                    <v-select class=" mt-2 mb-3"
                                              id="wh_selector"
                                              :items="whList"
                                              v-model="mZonWh"
                                              item-text="name"
                                              tage="Warehouse /Location"
                                              item-value="id"
                                              outlined
                                              return-object/>

                                    <label class="label">{{ $t('zone_type') }}</label>
                                    <v-select class=" mt-2 mb-n2"
                                              id="zone_type_selector"
                                              :items="zoneTypes"
                                              v-model="mZonType"
                                              tage="Zone Type"
                                              item-text="name"
                                              item-value="id"
                                              outlined
                                              return-object/>
                                </v-col>
                                <v-col sm="6" cols="6">
                                    <label class="label">{{ $t('name') }}</label>
                                    <v-text-field class=" mt-2"
                                                  v-model="zone.name"
                                                  outlined
                                                  placeholder=""/>
                                </v-col>
                                <v-col sm="6" cols="6">
                                    <label class="label">{{ $t('code') }}</label>
                                    <v-text-field class=" mt-2"
                                                  v-model="zone.code"
                                                  outlined
                                                  placeholder=""/>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_foooter">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn color="primary" outlined
                                       class=" text-capitalize  black--text float-left"
                                       @click="dialog = false">{{ $t('cancel') }}
                                </v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn @click="addZoneSetting" color="primary"
                                       class="px-3  white--text text-capitalize">{{ $t('save_close') }}
                                </v-btn>
                            </v-col>
                        </v-row>
                        <!--                        <v-btn color="white" class=" black&#45;&#45;text float-left" @click="dialog = false">{{$t('cancel')}}</v-btn>-->
                        <!--                        <v-btn color="blue" class=" white&#45;&#45;text text-capitalize float-right" >{{$t('save_new')}}-->
                        <!--                        </v-btn>-->

                    </v-card-actions>

                </v-card>
            </v-dialog>

            <p class="mb-3">{{ $t('zone_decs') }}</p>
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
                                    <th>{{ $t('warehouse') }}</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="zon in zoneSettings" v-bind:key="zon.id">
                                    <td>{{ zon.type.name }}</td>
                                    <td>{{ zon.code }}</td>
                                    <td class="text-bold">{{ zon.name }}</td>
                                    <td>{{ zon.wh.name }}</td>
                                    <td class="text-center">
                                        <v-btn class="btn_edit_setting" @click="onEditZone(zon)">
                                            <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                            <span class="capitalize ml-1 white--text font_14">{{ $t('edit') }}</span>
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
import {ZoneModel} from "@/scripts/model/AppModels";


const warehouseHandler = require("@/scripts/warehouseHandler")
export default {
    data: () => ({
        dialog: false,
        valid: true,
        whList: [],
        zoneTypes: [],
        zone: [],
        zoneSettings: [],
        mZonType: {},
        mZonWh: {},
        zoneModel: new ZoneModel({})
    }),
    methods: {
        onEditZone(value) {
            this.zone = value
            this.mZonType = value.type
            this.mZonWh = value.wh
            this.dialog = true
        },
        async onCreate() {
            await this.loadWhSetting()
            await this.loadZot()
            this.mZonType = {}
            this.mZonWh = {}
            this.zone.id = ''
            this.clear()
        },
        clear() {
            this.zone = {}
        },
        async addZoneSetting() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            let data = {
                'id': this.zone.id || '',
                'name': this.zone.name,
                'code': this.zone.code,
                'type': this.mZonType,
                'wh': this.mZonWh
            }
            warehouseHandler.saveZoneSetting(data).then(res => {
                window.console.log(res, 'create zone')
            })

        },
        async loadWhSetting() {
            warehouseHandler.getWarehouseSettingAll().then(res => {
                if (res) {
                    this.whList = res
                }
            })
        },
        async loadZon() {
            warehouseHandler.getZonAll().then(res => {
                if (res) {
                    this.zoneSettings = res
                    window.console.log(this.zoneSettings)
                }
            })
        },
        async loadZot() {
            warehouseHandler.getZotAll().then(res => {
                if (res.data) {
                    this.zoneTypes = res.data
                    window.console.log("zoneType: ", this.zoneTypes)
                }
            })
        },
        // Response Status
        responseStatus(status) {
            switch (status) {
                case 200:// Ok
                    this.loadWarehouses()
                    // this.showAlert()
                    this.close()
                    // Reset form
                    this.$refs.form.reset()

                    break
                case 201:// Duplicate
                    this.alertError('Duplicate entry!')
                    break
                default:
                    break
            }
        },
        alertError(msg) {
            if (msg) {
                // Code here
            } else {
                msg = 'Something went wrong!'
            }
            this.showLoading = false
            this.loadingTextAlert = "Failed!"
            this.loadingColorAlert = "#eb8334"
            this.changeAlertStatus()
            // this.$swal({
            // 	position: 'center',
            // 	icon: 'error',
            // 	title: 'Oops...!',
            // 	text: msg,
            // 	showConfirmButton: true
            // })
        },
        // Sweetalert2
        changeAlertStatus() {
            this.loadingAlert = true
            setTimeout(() => {
                this.loadingAlert = false
            }, 6200);
        },
        showAlert() {
            this.showLoading = false
            this.changeAlertStatus()
            this.loadingTextAlert = "Added Successful"
            this.loadingColorAlert = "#3DA72E"
            switch (this.saveMode) {
                case 'saveClose':// Save Close
                    // this.$swal({
                    // 	position: 'center',
                    // 	icon: 'success',
                    // 	title: 'Your work has been saved',
                    // 	showConfirmButton: true,
                    // }).then((result) => {
                    // 	if (result.value) {
                    // 		window.history.go(-1)

                    // 		return false
                    // 	}
                    // })
                    this.$router.go(-1)
                    break
                default:// Save New
                    // this.$swal({
                    // 	position: 'center',
                    // 	icon: 'success',
                    // 	title: 'Your work has been saved',
                    // 	showConfirmButton: false,
                    // 	timer: 1500
                    // })
                    break
            }
            this.saveMode = ''
        },
        close() {
            this.dialog = false
        }
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
    },
    mounted() {
        this.loadZon()
        this.loadZot()
        this.loadWhSetting()
    },
    computed: {},
    components: {},
};
</script>
<style scoped>
@media (max-width: 576px) {

}
</style>