<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-0 font_20">{{ $t("group") }}</h2>
                        <v-btn width="120" color="primary"
                            class="white--text float-right text-capitalize ml-5" @click="onCreateNew">{{ $t('create_new') }}
                        </v-btn>
                        <v-dialog v-model="dialogM2" max-width="380px">
                            <v-card>
                                <div class="modal_header">
                                    <v-card-title>{{ $t("group") }}</v-card-title>
                                    <v-icon @click="dialogM2 = false">close</v-icon>
                                </div>
                                <v-card-text class="modal_text_content">
                                    <v-form ref="form" v-model="valid" lazy-validation>
                                        <v-row>
                                            <v-col sm="12" cols="12" class="">
                                                <v-row>
                                                    <v-col sm="4" class="pt-0 pr-0">
                                                        <p class="label font_16 mb-0">{{ $t("nature") }}:</p>
                                                    </v-col>
                                                    <v-col sm="6" class="pt-0 pl-0">
                                                        <v-select
                                                            class="mt-1"
                                                            id="acc_type_selector"
                                                            :items="clazzes"
                                                            :item-text="item =>`${item.code} - ${item.name}`"
                                                            :rules="[(v) => !!v['id'] || $t('field_is_required')]"
                                                            tage="Department"
                                                            :loading="cLoading"
                                                            v-model="clazz"
                                                            item-value="uuid"
                                                            outlined
                                                            @change="changeClass"
                                                            return-object/>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col sm="4" class="pt-0 pr-0">
                                                        <p class="label font_16 mb-0">{{ $t("type") }}:</p>
                                                    </v-col>
                                                    <v-col sm="6" class="pt-0 pl-0">
                                                        <v-select
                                                            class="mt-1"
                                                            id="acc_type_selector"
                                                            :items="clazzTypes"
                                                            :item-text="item =>`${item.code} - ${item.name}`"
                                                            :rules="[(v) => !!v['id'] || $t('field_is_required')]"
                                                            tage="Department"
                                                            v-model="classType"
                                                            item-value="uuid"
                                                            :loading="tLoading"
                                                            outlined
                                                            return-object/>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col sm="4" class="pt-0 pr-0">
                                                        <p class="label font_16 mb-0">{{ $t("type_no") }}:</p>
                                                    </v-col>
                                                    <v-col sm="6" class="pt-0 pl-0">
                                                        <v-text-field
                                                            class="mt-1"
                                                            outlined
                                                            v-model="classGroup.code"
                                                            id="Class type"
                                                            placeholder="Code"
                                                            :rules="[(v) => !!v || 'Number is required']"/>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col sm="4" class="pt-0 pr-0">
                                                        <label class="label">{{ $t("type_name") }}</label>
                                                    </v-col>
                                                    <v-col sm="6" class="pt-0 pl-0">
                                                        <v-text-field
                                                            class="mt-1"
                                                            outlined
                                                            v-model="classGroup.name"
                                                            id="Class Name"
                                                            placeholder="Name"
                                                            :rules="[(v) => !!v || 'Number is required']"/>
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
                                            <v-btn color="black"
                                                outlined
                                                class=" text-capitalize  black--text float-left"
                                                @click="dialogM2 = false"
                                                >{{ $t("cancel") }}</v-btn>
                                        </v-col>
                                        <v-col sm="6" cols="6" class="py-0 text-right">
                                            <v-btn @click="onSaveClose"
                                                :disabled="btnEnable"
                                                color="primary"
                                                class=" white--text text-capitalize">{{ $t("save_close") }}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <p class="mb-0">{{ $t("class_func_setting_desc")}}</p>
                    </v-col>
                    <v-col sm="12" cols="12">
                        <template>
                        <div v-if="!isLoaded">
                            <LoadingMe
                            :isLoading="showLoading"
                            :fullPage="false"
                            :myLoading="true"
                            type="loading"/>
                        </div>
                        <kendo-datasource ref="groupDS"
                            :data="classGroups"
                            :sort="sort"
                            :group="group"/>
                        <kendo-grid id="gridGroup"
                            class="grid-function"
                            ref="gridComponent"
                            :data-source-ref="'groupDS'"
                            :pageable="true"
                            :groupable="true"
                            :editable="'inline'"
                            :scrollable-virtual="true">
                            <kendo-grid-column
                                :field="'code'"
                                :title="$t('code')"
                                :width="100"
                                :template="'<span>#=code#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :field="'name'"
                                :attributes="{ class: 'tb_name_td' }"
                                :title="$t('name')"
                                :template="'<span>#=name#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :field="'clazz.code'"
                                :title="$t('nature')"
                                :template="'<span>#=clazz.code#- #=clazz.name#</span>'"
                                :group-header-template="'#=value#'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :field="'classType.code'"
                                :title="$t('type')"
                                :template="'<span>#=classType.code#- #=classType.name#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :field="''"
                                :title="$t('action')"
                                :width="120"
                                :command="[{iconClass: 'k-icon k-i-edit', text: 'Edit',click: goEdit}]"
                                :headerAttributes="{style: 'text-align: center; background-color: #EDF1F5'}"
                                :attributes="{ style: 'text-align: center' }"/>
                        </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
const $ = require("jquery");
const settingsHandler = require("@/scripts/settingsHandler");
import ClassGroupModel from "@/scripts/model/Clazz";
const classGroupModel = new ClassGroupModel({});

export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        dialogM2: false,
        valid: false,
        showLoading: true,
        isLoaded: false,
        hidden: false,
        clazzes: [],
        clazz: {},
        classGroup: classGroupModel,
        classGroups: [],
        clazzTypes: [],
        classType: {},
        schemaDefinition: {
            model: { id: "id" },
        },
        btnEnable: false,
        cLoading: true,
        tLoading: true,
        sort: [{ field: "code", dir: "ASC" }],
        group: { field: "clazz.code" },
    }),
    props: {},
    computed: {
        dialogM4: function() {
            return this.dialogM3;
        },
    },
    mounted: async function() {
        await this.loadGroup()
    },
    methods: {
        close() {
            this.classGroup     = new ClassGroupModel();
            this.clazzes        = []
            this.clazz          = {}
            this.clazzTypes     = []
            this.classType      = {}
            this.dialogM2       = false;
        },
        goEdit(e) {
            e.preventDefault();
            let grid        = kendo.jQuery("#gridGroup").data("kendoGrid");
            let dataItem    = grid.dataItem($(e.currentTarget).closest("tr"));
            window.console.log('dataItem', dataItem)
            this.classGroup = new ClassGroupModel(dataItem);
            this.clazz      = {
                code:           dataItem.clazz.code,
                id:             dataItem.clazz.id,
                isShow:         dataItem.clazz.isShow,
                isSystem:       dataItem.clazz.isSystem,
                name:           dataItem.clazz.name,
            }
            this.classType  = {
                clazz:          dataItem.classType.clazz,
                clazzId:        dataItem.classType.clazzId,
                code:           dataItem.classType.code,
                id:             dataItem.classType.id,
                isShow:         dataItem.classType.isShow,
                isSystem:       dataItem.classType.isSystem,
                name:           dataItem.classType.name,
            }
            this.loadClass()
            this.changeClass()
            this.dialogM2 = true;
        },
        async loadClass() {
            let params = {
                type:       'class'
            }
            new Promise((resolve) => {
                setTimeout(() => {
                resolve("resolved");
                this.clazzes = [];
                settingsHandler.getClazz(params).then((res) => {
                    this.showLoading = true;
                    if (res.data.statusCode === 200) {
                        this.showLoading = false;
                        this.clazzes = res.data.data;
                        if(this.clazzes.length > 0){
                            this.cLoading = false
                        }
                    }
                }).catch();
                {
                    this.showLoading = false;
                }
                }, 300);
            });
        },
        async loadType(clazzId) {
            let params = {
                type:       'class_type',
                clazzId:    clazzId
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.clazzTypes = [];
                    settingsHandler.getClazz(params).then((res) => {
                        this.showLoading = true;
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.clazzTypes = res.data.data;
                            if(this.clazzTypes.length > 0){
                                this.tLoading = false
                            }
                        }
                    }).catch();
                    {
                        this.showLoading = false;
                    }
                }, 300);
            });
        },
        async loadGroup() {
            let params = {
                type:       'class_group',
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.clazzTypes = [];
                    settingsHandler.getClazz(params).then((res) => {
                        this.showLoading = true;
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.classGroups = res.data.data;
                        }
                    }).catch();
                    {
                        this.showLoading = false;
                    }
                }, 300);
            });
        },
        async onSaveClose() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    let data = new ClassGroupModel({
                        id:             this.classGroup.id ? this.classGroup.id : "",
                        name:           this.classGroup.name,
                        code:           this.classGroup.code,
                        isShow:         this.classGroup.isShow,
                        clazz:          this.clazz || {},
                        clazzId:        this.clazz.id || '',
                        classType:      this.classType || {},
                        classTypeId:    this.classType.id || '',
                        type:           "class_group"
                    });
                    this.btnEnable = true;
                    window.console.log('data', data)
                    settingsHandler.create(data).then((response) => {
                        if (response.data.statusCode === 201) {
                            const res = response.data.data;
                            const index = this.classGroups.findIndex((item) => {
                                return res.id === item.id;
                            });
                            if (this.classGroups.length === 0) {
                                this.loadGroup();
                            } else {
                            if (index < 0) {
                                this.classGroups.push(res);
                            } else {
                                this.classGroups.splice(index, 1, res);
                            }
                            }
                            this.btnEnable = false;
                            this.$snotify.success("Success");
                            this.close();
                        }
                    }).catch((e) => {
                        this.btnEnable = false;
                        this.$snotify.error("Something went wrong");
                        this.errors.push(e);
                    });
                }, 300);
            });
        },
        onCreateNew(){
            this.loadClass()
            this.dialogM2 = true;
        },
        changeClass(){
            window.console.log(121212121, this.clazz)
            this.loadType(this.clazz.id)
        }
    },
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
    .exchange-table.theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr
    > th {
        font-family: "Niradei-Bold", serif;
        color: #000 !important;
        border-top: 1px solid #000 !important;
        border-bottom: 1px solid #000 !important;
        font-size: 15px !important;
    }

    .exchange-table.theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr
    > td {
        color: #000 !important;
        padding: 5px !important;
    }

    .exchange-table.theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr:last-child
    td {
        border-bottom: 1px solid #000 !important;
    }

    .function_footer {
        padding: 15px;
        display: inline-block;
    }
    @media (max-width: 576px) {
    }
</style>
