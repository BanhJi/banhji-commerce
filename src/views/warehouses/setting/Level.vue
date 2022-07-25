<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pa-0">
            <h2 class="mb-0">{{ $t('level') }}</h2>
            <v-dialog v-model="dialogm2" max-width="380px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" @click="onCreate"
                           class="white--text text-capitalize  float-right" v-on="on">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t('level') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="12" cols="12" class="">
                                    <label class="label">{{ $t('section') }}</label>
                                    <v-select class=" mt-2 mb-3"
                                              id="sec_selector"
                                              :items="sectionList"
                                              v-model="level.section"
                                              item-text="name"
                                              item-value="id"
                                              tage="Section"
                                              outlined
                                              return-object/>

                                    <label class="label">{{ $t('rack') }}</label>
                                    <v-select class=" mt-2 mb-n2"
                                              id="rac_selector"
                                              :items="rackList"
                                              v-model="level.rack"
                                              item-text="name"
                                              tage="Rack"
                                              item-value="id"
                                              outlined
                                              return-object/>
                                </v-col>
                                <v-col sm="6" cols="6">
                                    <label class="label">{{ $t('name') }}</label>
                                    <v-text-field class=" mt-2"
                                                  v-model="level.name"
                                                  outlined
                                                  placeholder=""/>
                                </v-col>
                                <v-col sm="6" cols="6">
                                    <label class="label">{{ $t('code') }}</label>
                                    <v-text-field class=" mt-2"
                                                  v-model="level.code"
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
                                <v-btn @click="addLevelSetting" color="primary"
                                       class=" white--text text-capitalize">{{ $t('save_close') }}
                                </v-btn>
                            </v-col>
                        </v-row>
                        <!--                        <v-btn color="white" class=" black&#45;&#45;text float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>-->
                        <!--                        <v-btn color="blue" class=" white&#45;&#45;text text-capitalize float-right" >{{$t('save_new')}}-->
                        <!--                        </v-btn>-->

                    </v-card-actions>

                </v-card>
            </v-dialog>

            <p class="mb-3">{{ $t('level_decs') }}</p>
            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <template>
                        <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>{{ $t('code') }}</th>
                                    <th>{{ $t('name') }}</th>
                                    <th>{{ $t('section') }}</th>
                                    <th>{{ $t('rack') }}</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="lvl in levels" v-bind:key="lvl.id">
                                    <td>{{ lvl.code }}</td>
                                    <td class="text-bold">{{ lvl.name }}</td>
                                    <td>{{ lvl.section.name }}</td>
                                    <td>{{ lvl.rack.name }}</td>
                                    <td class="text-center">
                                        <v-btn class="btn_edit_setting"  @click="onEditLevel(lvl)">
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
        valid: true,
        dialogm2: false,
        sectionList: [],
        level: [],
        rackList: [],
        levels: [],
        mLvlRac: {},
        mLvlSec: {}
    }),
    methods: {
        async addLevelSetting() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            let data = {
                'name': this.level.name,
                'code': this.level.code,
                'section': this.level.section,
                'rack': this.level.rack
            }
            warehouseHandler.saveLevelSetting(data).then(res => {
                if (res.data.statusCode === 201) {
                    this.loadLevelSetting()
                    this.clear()
                    this.close()
                    this.$refs.form.reset()
                }
            }).catch(error => {
                self.alertError(error)
            })
        },
        async loadLevelSetting() {
            warehouseHandler.getLevelSettingAll().then(res => {
                if (res) {
                    this.levels = res
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
        async loadRackSetting() {
            warehouseHandler.getRackSettingAll().then(res => {
                if (res) {
                    this.rackList = res
                }
            })
        },
        onEditLevel(value) {
            this.level = value
            this.mLvlRac = value.rac
            this.mLvlSec = value.sec
            this.dialogm2 = true
        },
        async onCreate() {
            this.dialogm2 = true
            this.clear()
            this.level.id = ''
            this.mLvlSec = {}
            this.mLvlRac = {}
        },
        clear() {
            this.level = {}
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
        this.loadLevelSetting()
        this.loadRackSetting()
        this.loadSectionSetting()
    },
    computed: {},
    components: {},
};
</script>
<style scoped>
@media (max-width: 576px) {

}
</style>
