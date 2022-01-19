<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-0 font_20">{{ $t("nature") }}</h2>
                        <!-- <v-btn width="120" color="primary"
                            class="white--text float-right text-capitalize ml-5" @click="onCreateNew">{{ $t('create_new') }}
                        </v-btn> -->
                        <v-dialog v-model="dialogM2" max-width="380px">
                            <v-card>
                                <div class="modal_header">
                                    <v-card-title>{{ $t("nature") }}</v-card-title>
                                    <v-icon @click="dialogM2 = false">close</v-icon>
                                </div>
                                <v-card-text class="modal_text_content">
                                    <v-form ref="form" v-model="valid" lazy-validation>
                                        <v-row>
                                            <v-col sm="12" cols="12" class="">
                                                <v-row>
                                                    <v-col sm="4" class="pt-0 pr-0">
                                                        <p class="label font_16 mb-0">{{ $t("code") }}:</p>
                                                    </v-col>
                                                    <v-col sm="6" class="pt-0 pl-0">
                                                        <v-text-field
                                                            class="mt-1"
                                                            outlined
                                                            v-model="clazz.code"
                                                            id="Class Name"
                                                            readonly
                                                            placeholder="Code"
                                                            :rules="[(v) => !!v || 'Number is required']"/>
                                                    </v-col>
                                                    <!-- <v-col sm="2" class="pt-0 pl-0">
                                                        <input type="checkbox"
                                                            v-model="clazz.isShow"
                                                            true-value="true"
                                                            false-value="false"/>
                                                    </v-col> -->
                                                </v-row>
                                                <v-row>
                                                    <v-col sm="4" class="pt-0 pr-0">
                                                        <label class="label">{{ $t("name") }}</label>
                                                    </v-col>
                                                    <v-col sm="6" class="pt-0 pl-0">
                                                        <v-text-field
                                                            class="mt-1"
                                                            outlined
                                                            v-model="clazz.name"
                                                            id="Class Name"
                                                            placeholder="Class"
                                                            :rules="[(v) => !!v || 'Number is required']"/>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-card-text>
                                <v-divider />
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
                        <kendo-datasource ref="clazzDS"
                            :data="clazzes"/>
                        <kendo-grid id="gridClass"
                            class="grid-function"
                            ref="gridComponent"
                            :data-source-ref="'clazzDS'"
                            :pageable="true"
                            :editable="'inline'"
                            :scrollable-virtual="true">
                            <kendo-grid-column
                                :field="'no'"
                                :title="$t('no')"
                                :template="rowNumberTmpl"
                                :width="100"
                                :column-menu="false"
                                :headerAttributes="{style: 'background-color: #EDF1F5;', class: 'text-center'}"
                                :attributes="{ style: 'text-align: center' }"/>
                            <kendo-grid-column
                                :field="'code'"
                                :title="$t('code')"
                                :template="'<span>#=code#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :field="'name'"
                                :attributes="{ class: 'tb_name_td' }"
                                :title="$t('name')"
                                :template="'<span>#=name#</span>'"
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
import ClazzModel from "@/scripts/model/Clazz";
import kendo from "@progress/kendo-ui";

const classModel = new ClazzModel({});
const $ = require("jquery");
const settingsHandler = require("@/scripts/settingsHandler");
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
        mClass: {},
        clazz: classModel,
        schemaDefinition: {
            model: { id: "id" },
        },
        btnEnable: false,
    }),
    props: {},
    computed: {
        dialogM4: function() {
            return this.dialogM3;
        },
    },
    mounted: async function() {
        await this.loadClass();
    },
    methods: {
        close() {
            this.clazz = new ClazzModel();
            this.dialogM2 = false;
        },
        goEdit(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridClass").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            window.console.log('dataItem', dataItem)
            window.console.log('dataItem', dataItem)
            this.clazz = new ClazzModel(dataItem);
            this.dialogM2 = true;
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.clazzDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        async loadClass() {
            let params = {
                type: 'class'
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
                    let data = new ClazzModel({
                        id:         this.clazz.id ? this.clazz.id : "",
                        name:       this.clazz.name,
                        code:       this.clazz.code,
                        isShow:     this.clazz.isShow,
                        type:       "class"
                    });
                    this.btnEnable = true;
                    window.console.log('data', data)
                    settingsHandler.create(data).then((response) => {
                        if (response.data.statusCode === 201) {
                            const res = response.data.data;
                            const index = this.clazzes.findIndex((item) => {
                            return res.id === item.id;
                            });
                            if (this.clazzes.length === 0) {
                            this.loadClass();
                            } else {
                            if (index < 0) {
                                this.clazzes.push(res);
                            } else {
                                this.clazzes.splice(index, 1, res);
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
            this.dialogM2 = true;
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
