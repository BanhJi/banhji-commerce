<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{$t('leave')}}</h2>
            <v-dialog v-model="dialogm2" max-width="380px">
                <!-- <template v-slot:activator="{ on }">
                    <v-btn color="primary" class=" text-capitalize white--text float-right" v-on="on" @click="onNewClick">
                        {{$t('create_new')}}
                    </v-btn>
                </template> -->
                <v-card>
                   <div class="modal_header">
                        <v-card-title>{{$t('leave')}}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="12" cols="12" class="">
                                    <label class="label">{{$t('leave_name')}}</label>
                                    <v-select class="mt-1"
                                        id="acc_type_selector"
                                        :items="leaveList"
                                        :rules="[v => !!v || $t('leave_name_require')]"
                                        item-text="name"
                                        item-value="id"
                                        v-model="selectLeave"
                                        outlined
                                        return-object/>

                                    <label class="label">{{$t('approv_amount')}}</label>
                                    <v-text-field class="mt-1"
                                        outlined
                                        tage="approveAmount"
                                        v-model="approveAmount"
                                        :rules="[v => !!v || $t('approv_amount_is_required')]"
                                        placeholder=""/>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn small color="primary" outlined class=" text-capitalize  black--text float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>
                            </v-col>
                            <v-col  sm="6" cols="6" class="py-0 text-right">
                                <v-btn small color="primary" class=" white--text text-capitalize" @click="onSaveClose">{{$t('save_close')}}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>

                </v-card>
            </v-dialog>
            <p class="mb-0">{{$t('leav_desc')}} </p>
        </v-col>

        <v-col sm="12" cols="12" class="py-0">
            <template>
                <kendo-datasource ref="leaveDS" :data="leaves" />
                <kendo-grid
                    id="gridLeave"
                    class="grid-function"
                    :data-source-ref="'leaveDS'"
                    :editable="false"
                    :scrollable-virtual="true"
                    :column-menu="false">
                    <kendo-grid-column
                        :field="'leaveName'"
                        :title="$t('name')"
                        :template="'<span>#=leaveName#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'approveAmount'"
                        :title="$t('approved_amount')"
                        :template="'<span>#= approveAmount || 0#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                </kendo-grid>
            </template>
        </v-col>
    </v-row>
</template>

<script>
    const payrollHandler = require("../../../scripts/payrollHandler")
    export default {
        components: {},
        data: () => ({
            dialogm1: '',
            dialogm2: false,
            valid: true,
            leaves: [],
            selectLeave: {},
            approveAmount: '',
            option: 1,
            leaveList:[
                {id: 'unpaid_leave',    name: 'Unpaid Leave'},
                {id: 'annual_leave',    name: 'Annual Leave'},
                {id: 'conpensat_leave', name: 'Conpensat Leave'},
                {id: 'sick_leave',      name: 'Sick Leave'},
                {id: 'maternity_leave', name: 'Maternity Leave'},
                {id: 'paternity_leave', name: 'Paternity Leave'},
                {id: 'study_leave',     name: 'Study Leave'},
            ]
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
                this.id             = value.id
                this.selectLeave    = value.leave
                this.approveAmount  = value.approveAmount
                this.dialogm2       = true
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
                            id: this.id ? this.id : '',
                            leave: this.selectLeave,
                            approveAmount: this.approveAmount,
                            leaveName:   this.selectLeave.name
                        }
                        window.console.log(1,data)
                        payrollHandler.createLeave(data).then(response => {
                            if (response.data.statusCode === 201) {
                                const res = response.data
                                const index = this.leaves.findIndex(item => {
                                    return (res.data.id === item.id)
                                })
                                if (this.leaves.length === 0) {
                                    this.loadLeave()
                                } else {
                                    if (index < 0) {
                                        this.leaves.push(res.data)
                                    } else {
                                        this.leaves.splice(index, 1, res.data)
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
            async loadLeave(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getLeave().then(res => {
                            if(res.statusCode === 200){
                                this.leaves = res.data
                            }
                        })
                    }, 300);
                })
            },
            close() {
                this.dialogm2 = false
            },
            clear() {  
                this.departmentSelected   = ''
                this.nssf = {}
            },
        },
        mounted: async function () {
            this.loadLeave()
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