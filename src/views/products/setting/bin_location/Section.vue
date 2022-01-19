<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <h2 class="mb-0 font_20">{{ $t('section') }}</h2>
                        <v-dialog v-model="dialogm2" max-width="400px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" class=" text-capitalize white--text float-right"
                                       v-on="on"
                                       @click="onNewClick">
                                    {{ $t('create_new') }}
                                </v-btn>
                            </template>
                            <v-card>
                                <div class="modal_header">
                                    <v-card-title>{{ $t('section') }}</v-card-title>
                                    <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                                </div>
                                <v-card-text class="modal_text_content">
                                    <v-form
                                        ref="form"
                                        v-model="valid"
                                        lazy-validation>
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pb-0">
                                                <label class="label">{{ $t('name') }}</label>
                                                <v-text-field class="mt-1"
                                                              outlined
                                                              :rules="[v => !!v || $t('name_is_required'),v => (v && v.length > 2) || $t('character_3')]"
                                                              required
                                                              placeholder="" v-model="section.name"/>
                                                <label class="label">{{ $t('warehouse') }}</label>
                                                <v-select class="mt-1"
                                                          id="wh_selector"
                                                          :items="whList"
                                                          v-model="section.wh"
                                                          item-text="name"
                                                          @change="loadZon"
                                                          tage="Warehouse /Location"
                                                          item-value="id"
                                                          outlined
                                                          return-object/>

                                            </v-col>
                                            <v-col sm="12" cols="12" class="pt-0">
                                                <v-row>
                                                    <v-col sm="4" cols="4" class="pt-0">
                                                        <label class="label">{{ $t('code') }}</label>
                                                        <v-text-field class="mt-1"
                                                                      outlined
                                                                      :rules="[v => !!v || $t('code')]"
                                                                      required
                                                                      placeholder=""
                                                                      v-model="section.code"/>
                                                    </v-col>
                                                    <v-col sm="8" cols="8" class="pt-0">
                                                        <label class="label">{{ $t('zone') }}</label>
                                                        <v-select class="mt-1"
                                                                  id="zon_selector"
                                                                  :items="zoneList"
                                                                  v-model="section.zone"
                                                                  item-text="name"
                                                                  tage="Zone"
                                                                  item-value="id"
                                                                  outlined
                                                                  return-object/>
                                                    </v-col>
                                                </v-row>

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
                                            <v-btn color="primary" class="px-3  white--text text-capitalize"
                                                   @click="onSaveClose">
                                                {{ $t('save_close') }}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>

                            </v-card>
                        </v-dialog>
                        <p class="mb-0">{{ $t('section_desc') }} </p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="12" cols="12">
                        <template>
                            <v-simple-table class="exchange-table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th class="text-uppercase">{{ $t('code') }}</th>
                                        <th class="text-uppercase">{{ $t('name') }}</th>
                                        <th class="text-uppercase">{{ $t('zone') }}</th>
                                        <th class="text-uppercase">{{ $t('warehouse') }}</th>
                                        <th class="text-uppercase">{{ $t('action') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="sec in sections" v-bind:key="sec.id">
                                        <td>{{ sec.code }}</td>
                                        <td class="text-bold">{{ sec.name }}</td>
                                        <td>{{ sec.zone ? sec.zone.name : '' }}</td>
                                        <td>{{ sec.wh ? sec.wh.name : '' }}</td>
                                        <td>
                                            <v-btn class="btn_edit_setting" @click="onEditClick(sec)">
                                                <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                                <span
                                                    class="capitalize ml-1 white--text font_14">{{ $t('edit') }}</span>
                                            </v-btn>
                                        </td>
                                    </tr>
                                    <LoadingMe
                                        :isLoading="compeletLoading"
                                        :fullPage="false"
                                        :myLoading="true"/>
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
    components: {
        LoadingMe: () => import(`@/components/Loading`)
    },
    data: () => ({
        dialogm2: false,
        compeletLoading: false,
        valid: true,

        whList: [],
        zoneList: [],
        section: {},
        sections: []
    }),
    props: {},
    computed: {},
    watch: {
        dialogm2(val) {
            val || this.close()
        },
    },
    created() {
    },
    methods: {
        async onEditClick(value) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.section = value
                    this.dialogm2 = true
                }, 300);
            })
        },
        onNewClick() {
            this.clear()
        },
        close() {
            this.clear()
            this.dialogm2 = false
        },
        clear() {
            this.section = {}
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
        async loadSectionSetting() {
            warehouseHandler.getSectionSettingAll().then(res => {
                if (res) {
                    this.sections = res
                }
            })
        },
        async onSaveClose() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        'id': this.section.id || '',
                        'name': this.section.name,
                        'code': this.section.code,
                        'zone': this.section.zone,
                        'wh': this.section.wh
                    }
                    warehouseHandler.saveSectionSetting(data).then(res => {
                        if (res.data.statusCode === 201) {
                            this.loadSectionSetting()
                            this.close()
                            this.$refs.form.reset()
                        }
                    })
                }, 300);
            })
        },
    },
    mounted: async function () {
        await this.loadWhSetting()
        await this.loadSectionSetting()
    }
};
</script>
<style scoped>
.acc_group header {
    height: 10px !important;
}

table.acc_group tr td {
    border-bottom: 1px solid #ccc;
    padding: 8px;
    vertical-align: middle;
}

table.acc_group tr td:first-child {
    font-weight: 700;
}

table.acc_group tr td:last-child {
    text-align: center;
}

.v-card__actions .v-btn.v-btn {
    padding: 0 16px;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-family: 'Niradei-Bold', serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
    color: #000 !important;
    padding: 5px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
    border-bottom: 1px solid #000 !important;
}

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

.v-text-field__details {
    margin-bottom: 8px;
    margin-top: 4px !important;
}

@media (max-width: 576px) {

}
</style>