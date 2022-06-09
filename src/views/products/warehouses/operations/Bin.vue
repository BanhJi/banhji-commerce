<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <v-dialog v-model="dialogm2" max-width="380px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary"  class="white--text text-capitalize  float-right" v-on="on" >
                            {{$t('new_bin')}}
                        </v-btn>
                    </template>
                    <v-card>
                        <div class="modal_header">
                            <v-card-title>{{$t('bin_location')}}</v-card-title>
                            <v-icon  @click="dialogm2 = false">close</v-icon>
                        </div>
                        <v-card-text class="modal_text_content">
                            <v-row>
                                <v-col sm="12" cols="12" class="">
                                    <label class="label">{{$t('section')}}</label>
                                    <v-select class="mt-1"
                                              id="acc_type_selector"
                                              :items="sections"
                                              item-text="name"
                                              item-value="id"
                                              v-model="bin.section"
                                              @change="loadRackSetting"
                                              tage="Section"
                                              outlined
                                              return-object/>
    
                                    <label class="label">{{$t('rack')}}</label>
                                    <v-select class="mt-1"
                                              id="acc_type_selector"
                                              :items="racks"
                                              item-text="name"
                                              tage="Rack"
                                              v-model="bin.rack"
                                              @change="loadLevelSetting"
                                              item-value="id"
                                              outlined
                                              return-object/>
    
                                    <label class="label">{{$t('level')}}</label>
                                    <v-select class="mt-1"
                                              id="acc_type_selector"
                                              :items="levels"
                                              item-text="name"
                                              tage="Level"
                                              v-model="bin.level"
                                              item-value="id"
                                              outlined
                                              return-object/>
                                </v-col>
                                <v-col sm="6" cols="6" class="py-0">
                                    <label class="label">{{$t('name')}}</label>
                                    <v-text-field class="mt-1"
                                                  outlined
                                                  v-model="bin.name"
                                                  placeholder=""/>
                                </v-col>
                                <v-col sm="6" cols="6" class="py-0">
                                    <label class="label">{{$t('code')}}</label>
                                    <v-text-field class="mt-1"
                                                  outlined
                                                  v-model="bin.code"
                                                  placeholder=""/>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider/>
                        <v-card-actions class="modal_footer">
                            <v-row>
                                <v-col sm="6" cols="6" class="py-0 text-left">
                                    <v-btn color="primary" outlined class=" text-capitalize  black--text float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>
                                </v-col>
                                <v-col sm="6" cols="6" class="py-0 text-right">
                                    <v-btn @click="onCreateBin" color="primary" class=" white--text text-capitalize">{{$t('save_close')}}
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <!--                        <v-btn color="white" class=" black&#45;&#45;text float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>-->
                            <!--                        <v-btn color="blue" class=" white&#45;&#45;text text-capitalize float-right" >{{$t('save_new')}}-->
                            <!--                        </v-btn>-->
    
                        </v-card-actions>
    
                    </v-card>
                </v-dialog>
                    </v-col>
                </v-row>
        
                <v-row>
                    <v-col sm="12" cols="12" class="pb-0">
                        <template>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>{{$t('no')}} </th>
                                        <th>{{$t('name')}} </th>
                                        <th>{{$t('code')}} </th>
                                        <th>{{$t('section')}} </th>
                                        <th>{{$t('rack')}} </th>
                                        <th>{{$t('level')}} </th>
                                        <th>{{$t('action')}} </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(b, index) in bins" v-bind:key="b.id">
                                        <td>{{ index + 1 }}</td>
                                        <td class="text-bold">{{ b.name }}</td>
                                        <td>{{ b.code }}</td>
                                        <td>{{ b.section.name }}</td>
                                        <td>{{ b.rack.name }}</td>
                                        <td>{{ b.level.name }}</td>
                                        <td class="text-center">
                                            <v-btn class="btn_edit_setting" @click="onEditBin(b)">
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
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
const warehouseHandler = require("@/scripts/warehouseHandler")
    export default {
        data: () => ({
            dialogm2: false,
            sections: [],
            racks: [],
            levels: [],
            bin: {},
            bins: [],
        }),
        watch: {
            // dialogm2(val) {
            //     val || this.close()
            // },
        },
        methods: {
            onEditBin(value) {
                this.bin = value
                this.dialogm2 = true
            },
            async onCreateBin() {
                let data = {
                    'id': this.bin.id || '',
                    'name': this.bin.name,
                    'code': this.bin.code,
                    'section': this.bin.section,
                    'rack': this.bin.rack,
                    'level': this.bin.level,
                }
                await warehouseHandler.saveBin(data).then(() => {
                    this.dialogm2 = false
                    this.onloadBin()
                })
            },
            async onloadBin() {
                await warehouseHandler.getBin().then(res => {
                    this.bins = res
                })
            },
            async loadSectionSetting() {
                await warehouseHandler.getSectionSettingAll().then(res => {
                    if (res) {
                        this.sections = res
                    }
                })
            },
            async loadRackSetting() {
                await warehouseHandler.getRackSettingAll().then(res => {
                    if (res) {
                        res.forEach(i => {
                            if (i.section.id === this.bin.section.id) {
                                this.racks.push(i)
                            }
                        })
                    }
                })
            },
            async loadLevelSetting() {
                await warehouseHandler.getLevelSettingAll().then(res => {
                    if (res) {
                        res.forEach(i => {
                            if (i.rack.id === this.bin.rack.id) {
                                this.levels.push(i)
                            }
                        })
                        // this.levels = res
                    }
                })
            },
        },
        async mounted() {
            await this.loadSectionSetting()
            await this.onloadBin()
        },
        computed: {
        },
        components: {
        },
    };
</script>
<style scoped>
    .v-tab--active{
        background-color: #E5EFFA;
        color: #000;
    }

    @media (max-width: 576px) {

    }
</style>
