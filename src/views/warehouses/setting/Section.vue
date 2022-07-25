<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pa-0">
            <h2 class="mb-0">{{ $t('section') }}</h2>
            <v-dialog v-model="dialog" max-width="380px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" @click="onCreate"
                           class="white--text text-capitalize  float-right" v-on="on">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t('section') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialog = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="">
                                <label class="label">{{ $t('warehouse_location') }}</label>
                                <v-select class=" mt-2 mb-3"
                                          id="wh_selector"
                                          :items="whList"
                                          v-model="section.wh"
                                          item-text="name"
                                          @change="loadZon"
                                          tage="Warehouse /Location"
                                          item-value="id"
                                          outlined
                                          return-object/>

                                <label class="label">{{ $t('zone') }}</label>
                                <v-select class=" mt-2 mb-n2"
                                          id="zon_selector"
                                          :items="zoneList"
                                          v-model="section.zone"
                                          item-text="name"
                                          tage="Zone"
                                          item-value="id"
                                          outlined
                                          return-object/>
                            </v-col>
                            <v-col sm="6" cols="6">
                                <label class="label">{{ $t('name') }}</label>
                                <v-text-field class=" mt-2"
                                              v-model="section.name"
                                              outlined
                                              placeholder=""/>
                            </v-col>
                            <v-col sm="6" cols="6">
                                <label class="label">{{ $t('code') }}</label>
                                <v-text-field class=" mt-2"
                                              v-model="section.code"
                                              outlined
                                              placeholder=""/>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="modal_foooter">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="6" cols="6" class="py-0 text-left">
                                    <v-btn color="primary" outlined
                                           class=" text-capitalize  black--text float-left"
                                           @click="dialog = false">{{ $t('cancel') }}
                                    </v-btn>
                                </v-col>
                                <v-col sm="6" cols="6" class="py-0 text-right">
                                    <v-btn @click="addSectionSetting" color="primary"
                                           class="px-3  white--text text-capitalize">{{ $t('save_close') }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                        <!--                        <v-btn color="white" class=" black&#45;&#45;text float-left" @click="dialog = false">{{$t('cancel')}}</v-btn>-->
                        <!--                        <v-btn color="blue" class=" white&#45;&#45;text text-capitalize float-right" >{{$t('save_new')}}-->
                        <!--                        </v-btn>-->

                    </v-card-actions>

                </v-card>
            </v-dialog>

            <p class="mb-3">{{ $t('section_decs') }}</p>
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
                                    <th>{{ $t('warehouse') }}</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="sec in sections" v-bind:key="sec.id">
                                    <td>{{ sec.code }}</td>
                                    <td class="text-bold">{{ sec.name }}</td>
                                    <td>{{ sec.zone.name }}</td>
                                    <td>{{ sec.wh.name }}</td>
                                    <td class="text-center">
                                        <v-btn class="btn_edit_setting" @click="onEditSection(sec)">
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
        dialog: false,
        whList: [],
        zoneList: [],
        section: [],
        sections: [],
    }),
    methods: {
        clear() {
            this.section = {}
        },
        onEditSection(value) {
            this.section = value
            this.dialog = true
        },
        async onCreate() {
            await this.loadWhSetting()
            await this.loadZon()
            this.clear()
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
                    res.forEach(i => {
                        if (i.wh.id === this.section.wh.id) {
                            this.zoneList.push(i)
                        }
                    })
                    // this.zoneList = res
                }
            })
        },
        async addSectionSetting() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            let data = {
                'name': this.section.name,
                'code': this.section.code,
                'zone': this.section.zone,
                'wh': this.section.wh
            }
            warehouseHandler.saveSectionSetting(data).then(res => {
                if (res.data.statusCode === 201) {
                    this.loadSectionSetting()
                    this.clear()
                    this.close()
                    this.$refs.form.reset()
                }
            })
        },
        async loadSectionSetting() {
            warehouseHandler.getSectionSettingAll().then(res => {
                if (res) {
                    this.sections = res
                }
            })
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
        this.loadSectionSetting()
        this.loadWhSetting()
        // this.loadZon()
    },
    computed: {},
    components: {},
};
</script>
<style scoped>
@media (max-width: 576px) {

}
</style>
