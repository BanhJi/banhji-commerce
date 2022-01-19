<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{$t('group_employee')}}</h2>
            <v-dialog v-model="dialogm2" max-width="380px" eager>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" class=" text-capitalize white--text float-right" v-on="on" @click="onNewClick">
                        {{$t('create_new')}}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                    <v-card-title>{{$t('group_employee')}}</v-card-title>
                    <v-icon  @click="dialogm2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="12" cols="12" class="pb-0">
                                    <label class="label">{{$t('group_code')}}</label>
                                    <v-text-field class="mt-1"
                                        outlined
                                        tage="Name"
                                        v-model="groupCode"
                                        :rules="[v => !!v || $t('field_is_required')]"
                                        placeholder=""/>

                                    <label class="label">{{$t('group_name')}}</label>
                                    <v-text-field class="mt-1"
                                        outlined
                                        tage="Name"
                                        v-model="groupName"
                                        :rules="[v => !!v || $t('field_is_required')]"
                                        placeholder=""/>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn color="black" outlined class=" text-capitalize  black--text float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn color="primary" class="   white--text text-capitalize" @click="onSaveClose">{{$t('save_close')}}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>

                </v-card>
            </v-dialog>
            <p class="mb-0">{{$t('bank_account_desc')}} </p>
        </v-col>

        <v-col sm="12" cols="12" class="py-0">
            <template>
                <kendo-datasource ref="groupsDS" :data="groups" />
                <kendo-grid
                    id="gridGroups"
                    class="grid-function"
                    :data-source-ref="'groupsDS'"
                    :editable="false"
                    :scrollable-virtual="true"
                    :column-menu="false">
                    <kendo-grid-column
                        :field="'groupCode'"
                        :title="$t('code')"
                        :template="'<span>#=groupCode || ``#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'groupName'"
                        :title="$t('name')"
                        :template="'<span>#= groupName || ``#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="''"
                        :title="$t('action')"
                        :width="100"
                        :command="[{iconClass: 'k-icon k-i-edit', text: 'Edit',click: goEdit}]"
                        :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                </kendo-grid>
            </template>
        </v-col>
    </v-row>
</template>

<script>
    const payrollHandler = require("@/scripts/payrollHandler")
    import kendo from "@progress/kendo-ui";
    const $ = kendo.jQuery;
    export default {
        components: {},
        data: () => ({
            dialogm1: '',
            dialogm2: false,
            groups: [],
            group: {},
            groupCode: "",
            groupName: "",
            valid: true,
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
            async onSaveClose() {
                if (!this.$refs.form.validate()) {
                    this.$refs.form.validate()
                    return
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            id:         this.group.id ? this.group.id : '',
                            groupCode:  this.groupCode,
                            groupName:  this.groupName,
                        }
                        
                        payrollHandler.createGroup(data).then(response => {
                            window.console.log(response)
                            if (response.data.statusCode === 201) {
                                const res = response.data
                                const index = this.groups.findIndex(item => {
                                    return (res.data.id === item.id)
                                })
                                if (this.groups.length === 0) {
                                    this.loadGroup()
                                } else {
                                    if (index < 0) {
                                        this.groups.push(res.data)
                                    } else {
                                        this.groups.splice(index, 1, res.data)
                                    }
                                }
                                this.$snotify.success('Success')
                                this.clear()
                                this.close()
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }, 300);
                })
            },
            close() {
                this.dialogm2 = false
            },
            clear() {
                this.groupCode = ''
                this.groupName = ''
                this.group     = {}
            },
            async loadGroup(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getGroup().then(res => {
                            this.groups = res.data
                        })
                    }, 300);
                })
            },
            onNewClick() {
                this.option = 1
                this.clear()
            },
            goEdit(e){
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve('resolved');
                    e.preventDefault();
                    let grid = kendo.jQuery("#gridGroups").data("kendoGrid");
                    let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
                    window.console.log(dataItem)
                    this.groupCode      = dataItem.groupCode
                    this.groupName      = dataItem.groupName
                    this.group          = dataItem
                    this.dialogm2 = true
                    }, 300);
                })
            },
        },
        mounted: async function () {
            this.loadGroup()
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

    @media (max-width: 576px) {

    }
</style>