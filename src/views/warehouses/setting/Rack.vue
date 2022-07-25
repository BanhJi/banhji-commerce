<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pa-0">
            <h2 class="mb-0">{{ $t('rack') }}</h2>
            <v-dialog v-model="dialogm2" max-width="380px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" @click="onCreate"
                           class="white--text text-capitalize  float-right" v-on="on">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t('rack') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="12" cols="12" class="">
                                    <label class="label">{{ $t('zone') }}</label>
                                    <v-select class=" mt-2 mb-3"
                                              id="zon_selector"
                                              :items="zoneList"
                                              v-model="rack.zone"
                                              item-text="name"
                                              tage="Zone"
                                              item-value="id"
                                              outlined
                                              return-object/>

                                    <label class="label">{{ $t('section') }}</label>
                                    <v-select class=" mt-2 mb-n2"
                                              id="sec_selector"
                                              :items="sectionList"
                                              v-model="rack.section"
                                              item-text="name"
                                              tage="Section"
                                              item-value="id"
                                              outlined
                                              return-object/>
                                </v-col>
                                <v-col sm="6" cols="6">
                                    <label class="label">{{ $t('name') }}</label>
                                    <v-text-field class=" mt-2"
                                                  v-model="rack.name"
                                                  outlined
                                                  placeholder=""/>
                                </v-col>
                                <v-col sm="6" cols="6">
                                    <label class="label">{{ $t('code') }}</label>
                                    <v-text-field class=" mt-2"
                                                  v-model="rack.code"
                                                  outlined
                                                  placeholder=""/>
                                </v-col>
                            </v-row>
                        </v-form>
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
                                <v-btn @click="addRackSetting" color="primary"
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

            <p class="mb-3">{{ $t('rack_decs') }}</p>
            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <template>
                        <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>{{ $t('code') }}</th>
                                    <th>{{ $t('name') }}</th>
                                    <th>{{ $t('zone') }}</th>
                                    <th>{{ $t('section') }}</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="rac in racks" v-bind:key="rac.id">
                                    <td>{{ rac.code }}</td>
                                    <td class="text-bold">{{ rac.name }}</td>
                                    <td>{{ rac.zone.name }}</td>
                                    <td>{{ rac.section.name }}</td>
                                    <td class="text-center">
                                        <v-btn class="btn_edit_setting"   @click="onEditRack(rac)">
                                            <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                            <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
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
        valid: true,
        zoneList: [],
        sectionList: [],
        mRacSec: {},
        mRacZon: {},
        racks: [],
        rack: []
    }),
    methods: {
        clear() {
            this.rack = {}
        },
        onEditRack(value) {
            this.rack = value
            this.mRacZon = value.zon
            this.mRacSec = value.sec
            this.dialogm2 = true
        },
        async addRackSetting() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            let data = {
                'name': this.rack.name,
                'code': this.rack.code,
                'sec': this.rack.section,
                'zone': this.rack.zone
            }
            warehouseHandler.saveRackSetting(data).then(res => {
                if (res.data.statusCode === 201) {
                    this.loadRackSetting()
                    this.clear()
                    this.close()
                    this.$refs.form.reset()
                }
            }).catch(error => {
                self.alertError(error)
            })
        },
        async loadRackSetting() {
            warehouseHandler.getRackSettingAll().then(res => {
                if (res) {
                    this.racks = res
                }
            })
        },
        async loadZon() {
            warehouseHandler.getZonAll().then(res => {
                if (res) {
                    this.zoneList = res
                }
            })
        },
        async loadSectionSetting() {
            warehouseHandler.getSectionSettingAll().then(res => {
                if (res) {
                    this.sectionList = res
                }
            })
        },
        async onCreate() {
            this.dialogm2 = true
            this.mRacZon = {}
            this.mRacSec = {}
            this.clear()
            this.rack.id = ''
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
        this.loadRackSetting()
        this.loadSectionSetting()
        this.loadZon()
    },
    computed: {},
    components: {},
};
</script>
<style scoped>
@media (max-width: 576px) {

}
</style>
