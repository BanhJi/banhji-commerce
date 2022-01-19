<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{$t('specific_work')}}</h2>
            <v-dialog v-model="dialogm2" max-width="380px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" class=" text-capitalize white--text float-right" v-on="on" @click="onNewClick">
                        {{$t('create_new')}}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                    <v-card-title>{{$t('specific_work')}}</v-card-title>
                    <v-icon  @click="dialogm2 = false">close</v-icon>
                   </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="12" cols="12" class="pb-0">
                                    <label class="label">{{$t('name')}}</label>
                                    <v-text-field class="mt-1"
                                        outlined
                                        tage="Name"
                                        :rules="[v => !!v || $t('field_is_required')]"
                                        v-model="specificwork.name"
                                        placeholder=""/>

                                    <label class="label">{{$t('type_of_work')}}</label>
                                    <v-select class="mt-1"
                                        id="acc_type_selector"
                                        :items="typeOfWork"
                                        item-text="name"
                                        :rules="[v => !!v || $t('field_is_required')]"
                                        tage="Department"
                                        v-model="typeOfWorkSelected"
                                        item-value="uuid"
                                        outlined
                                        return-object/>

                                    <label class="label">{{$t('nature')}}</label>
                                    <v-select class="mt-1"
                                        id="acc_type_selector"
                                        :items="nature"
                                        item-text="name"
                                        tage="Department"
                                        :rules="[v => !!v || $t('field_is_required')]"
                                        item-value="id"
                                        v-model="natureSelected"
                                        outlined
                                        return-object/>
                                    
                                    <label class="label">{{$t('leave')}}</label>
                                    <v-select class="mt-1"
                                        id="acc_type_selector"
                                        :items="leaves"
                                        item-text="leave.name"
                                        tage="leave"
                                        v-model="leaveSelected"
                                        item-value="leave.id"
                                        outlined
                                        clearable
                                        return-object/>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn small color="black" outlined class=" text-capitalize  black--text float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn small color="primary" class="px-3  white--text text-capitalize" @click="onSaveClose">{{$t('save_close')}}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>

                </v-card>
            </v-dialog>
            <p class="mb-0">{{$t('department_desc')}} </p>
        </v-col>

        <v-col sm="12" cols="12" class="py-0">
            <template>
                <kendo-datasource ref="specificworkDS" :data="specificWorkList" />
                <kendo-grid
                    id="gridSpecificwork"
                    class="grid-function"
                    :data-source-ref="'specificworkDS'"
                    :editable="false"
                    :scrollable-virtual="true"
                    :column-menu="false">
                    <kendo-grid-column
                        :field="'typeOfWork'"
                        :title="$t('typeOfWork')"
                        :template="'<span>#=typeOfWork.name || ``#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'nature'"
                        :title="$t('nature')"
                        :template="'<span>#= nature.name || ``#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'leave'"
                        :title="$t('leave')"
                        :template="'<span>#= leave.leaveName || ``#</span>'"
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
    import SpecificWork from '@/scripts/model/SpecificWork'
    const  specificWorkModel = new SpecificWork({})
    import kendo from "@progress/kendo-ui";
    const $ = kendo.jQuery;

    export default {
        components: {},
        data: () => ({
            dialogm1: '',
            dialogm2: false,
            valid: true,
            compeletLoading: true,
            specificwork: specificWorkModel,
            typeOfWorkSelected: '',
            natureSelected: '',
            typeOfWork: [],
            specificWorkList: [],
            nature:[
                {id: 'paid_hours', name: 'Paid Hours'},
                {id: 'unpaid_hours', name: 'Unpaid Hours'},
                {id: 'overtime_hours_weekend', name: 'Overtime Hours(Weekend)'},
                {id: 'overtime_hours_holiday', name: 'Overtime Hours(Holiday)'}
            ],
            leaves: [],
            leaveSelected: ''
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
            goEdit(e){
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve('resolved');
                    e.preventDefault();
                    let grid = kendo.jQuery("#gridSpecificwork").data("kendoGrid");
                    let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
                    window.console.log(dataItem)
                    this.specificwork           = dataItem
                    this.typeOfWorkSelected     = {
                        createdAt:      dataItem.typeOfWork.createdAt || '',
                        description:    dataItem.typeOfWork.description || '',
                        id:             dataItem.typeOfWork.id || '',
                        isSystem:       dataItem.typeOfWork.isSystem || 1,
                        name:           dataItem.typeOfWork.name || '',
                        pk:             dataItem.typeOfWork.pk || '',
                        updatedAt:      dataItem.typeOfWork.updatedAt  || ''
                    }
                    this.natureSelected         = {
                        id:         dataItem.nature.id || '',
                        name:       dataItem.nature.name || ''
                    }
                    this.leaveSelected          = {
                        approveAmount:  dataItem.leave.approveAmount || 0,
                        createdAt:      dataItem.leave.createdAt || '',
                        updatedAt:      dataItem.leave.updatedAt || '',
                        id:             dataItem.leave.id || '',
                        isSystem:       dataItem.leave.isSystem || 1,
                        leave:          dataItem.leave.leave,
                        leaveName:      dataItem.leave.leaveName || '',
                        pk:             dataItem.leave.pk || ''
                    }
                    this.dialogm2 = true
                    }, 300);
                })
            },
            onNewClick() {
                this.option = 1
                this.clear()
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
                            id:             this.specificwork.id ? this.specificwork.id : '',
                            name:           this.specificwork.name,
                            typeOfWork:     this.typeOfWorkSelected,
                            nature:         this.natureSelected,
                            leave:          this.leaveSelected
                        }
                        payrollHandler.createSpecificWork(data).then(response => {
                            if (response.data.statusCode === 201) {
                                const res = response.data
                                const index = this.specificWorkList.findIndex(item => {
                                    return (res.data.id === item.id)
                                })
                                if (this.specificWorkList.length === 0) {
                                    this.loadSpecificWork()
                                } else {
                                    if (index < 0) {
                                        this.specificWorkList.push(res.data)
                                    } else {
                                        this.specificWorkList.splice(index, 1, res.data)
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
            async loadTypeOfWork(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getTypeOfWork().then(res => {
                            this.typeOfWork = res.data
                        })
                    }, 300);
                })
            },
            async loadSpecificWork(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getSpecificWork().then(res => {
                            if(res.statusCode === 200){
                                this.specificWorkList = res.data
                                window.console.log(this.specificWorkList,999)
                            }
                        })
                    }, 300);
                })
            },
            close() {
                this.dialogm2 = false
            },
            clear() {  
                this.typeOfWorkSelected   = ''
                this.leaveSelected =''
                this.natureSelected = ''
            },
            async loadLeave(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getLeave().then(res => {
                            if(res.statusCode === 200){
                                this.leaves = res.data
                                window.console.log(1,this.leaves)
                            }
                        })
                    }, 300);
                })
            },
        },
        mounted: async function () {
            await this.loadTypeOfWork()
            await this.loadSpecificWork()
            await this.loadLeave()
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