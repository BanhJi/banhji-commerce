<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t('timesheet') }}</h2>
                                <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right"
                                >close
                                </v-icon>
                            </v-card>
                            <v-card outlined dense class="px-3 pb-3 no_border" color="grayBg">
                                <v-row>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t('employee_name') }}</label>
                                        <v-text-field class="mt-1"
                                            outlined
                                            v-model="name"
                                            tage="Employee Name"
                                            required/>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t('business_unit_branch') }}</label>
                                        <v-select class="mt-1"
                                            outlined
                                            :items="location"
                                            item-text="name"
                                            item-value="id"
                                            v-model="locationSelected"
                                            tage="Business Unit/Branch"
                                            return-object/>
                                    </v-col>
                                    <v-col sm="4" cols="12" class=" pb-0">
                                        <label class="label  mb-0">{{ $t('for_the_month_of') }}</label>
                                        <month-picker :initialMonth="start_date"  @emitMonth="start_date = $event"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="4" cols="12" class="py-0">
                                        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
                                    </v-col>
                                    <v-col sm="4" cols="12">
                                        <v-btn color="secondary" class=" white--text float-right text-capitalize mr-5" @click="downloadTimesheet">
                                            {{$t('Download file format for import')}}
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <kendo-datasource ref="inputTimesheet"
                                            :data="resultsData"/>
                                        <kendo-grid id="gridTimecard" class="grid-function"
                                            :data-source-ref="'inputTimesheet'"
                                            :editable="false"
                                            :scrollable-virtual="true">
                                            <kendo-grid-column
                                                :field="'DATE'"
                                                :title="$t('date')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= kendo.toString(new Date(DATE),`dd-MM-yyyy`) #</span>'"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'
                                                }"/>
                                            <kendo-grid-column
                                                :field="'TYPE_OF_WORKS'"
                                                :title="$t('type_of_works')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= TYPE_OF_WORKS #</span>'"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'
                                                }"/>
                                            <kendo-grid-column
                                                :field="'SPECIFIC_WORK'"
                                                :title="$t('SPECIFIC_WORK')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= SPECIFIC_WORK #</span>'"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'
                                                }"/>
                                            <kendo-grid-column
                                                :field="'ENGAGEMENT_PROJECT'"
                                                :title="$t('ENGAGEMENT_PROJECT')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= ENGAGEMENT_PROJECT ? ENGAGEMENT_PROJECT: `` #</span>'"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'
                                                }"/>
                                            <kendo-grid-column
                                                :field="'DESCRIPTIONS'"
                                                :title="$t('DESCRIPTIONS')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= DESCRIPTIONS #</span>'"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'
                                                }"/>
                                            <kendo-grid-column
                                                :field="'HOURS'"
                                                :title="$t('HOURS')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= HOURS #</span>'"
                                                :headerAttributes="{
                                                    style: 'text-align: center; background-color: #EDF1F5'
                                                }"/>
                                        </kendo-grid>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider class="mt-3"/>
                            <v-card outlined dense class="no_border function_footer">
                                <v-btn color="primary" class="float-right white--text text-capitalize " @click="onSaveClose">
                                    {{$t('save')}}
                                </v-btn>
                                <v-btn color="black"  class="text-capitalize  white--text float-left" @click="cancel">{{$t('cancel')}}</v-btn>
                            </v-card>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>
    import UploadExcelComponent from '@/components/upload_excel/Timesheet.vue';
    import Timesheet from "@/scripts/model/Timesheet";
    import kendo from "@progress/kendo-ui"
    const $ = require("jquery")
    const timesheetModel = new Timesheet({})
    const employeeHandler = require("@/scripts/employeeHandler")
    const locationHandler = require("@/scripts/locationHandler")
    const cookieJS = require("@/cookie.js");
    const cookie = cookieJS.getCookie();
    export default {
        name: "AddTimesheet",
        props: ['id'],
        components: {
            'upload-excel-component':UploadExcelComponent,
            LoadingMe: () => import(`@/components/Loading`),
            'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
        },
        data: () => ({
            showLoading: false,
            locationSelected: '',
            location:[],
            name:'',
            start_date: '',
            resultsData: [],
            tableHeader: [],
            timesheet: timesheetModel,
            date: new Date().toISOString().substr(0, 7),
            menu: false,
            modal: false,
            loggedUser: {
                id: cookie.creator,
                name: cookie.email
            },
        }),
        methods: {
            downloadTimesheet(){

            },
            beforeUpload(file) {
                const isLt1M = file.size / 1024 / 1024 < 1

                if (isLt1M) {
                return true
                }

                this.$message({
                message: 'Please do not upload files larger than 1m in size.',
                type: 'warning'
                })
                return false
            },
            handleSuccess({ results, header }) {
                results.forEach(element => {
                    window.console.log(element[0],'element')
                    var utc_days  = Math.floor(element[0] - 25569);
                    var utc_value = utc_days * 86400;                                        
                    var date_info = new Date(utc_value * 1000);
                    var fractional_day = element[0] - Math.floor(element[0]) + 0.0000001;
                    var total_seconds = Math.floor(86400 * fractional_day);
                    var seconds = total_seconds % 60;
                    total_seconds -= seconds;
                    var hours = Math.floor(total_seconds / (60 * 60));
                    var minutes = Math.floor(total_seconds / 60) % 60;
                    var current_datetime =  new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
                    element[0]    = current_datetime
                });
                let tableData = results
                let tableHeader = header
                let DataList = '[';
                if(tableData.length > 0){
                    $.each( tableData, function( index, value ) {
                        if(index == 0){
                            DataList += '{"'+ tableHeader[0]+'":"'+  value[0] +'","'+tableHeader[1]+'":"'+  value[1] +'","'+ tableHeader[2]+'":"'+  value[2] +'","'+tableHeader[3]+'":"'+  value[3] +'", "'+tableHeader[4]+'":"'+  value[4] +'", "'+tableHeader[5]+'":"'+  value[5] +'" }';
                        }else{
                            DataList += ',{"'+ tableHeader[0]+'":"'+  value[0] +'","'+tableHeader[1]+'":"'+  value[1] +'","'+ tableHeader[2]+'":"'+  value[2] +'","'+tableHeader[3]+'":"'+  value[3] +'", "'+tableHeader[4]+'":"'+  value[4] +'", "'+tableHeader[5]+'":"'+  value[5] +'" }';
                        }
                    });
                    DataList += ']';
                    this.resultsData = JSON.parse(DataList);
                    window.console.log(this.resultsData)
                }
            },
            async loadLocation() {
                 new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        locationHandler.list().then(res => {
                            if(res.data.statusCode === 200){
                                this.location = res.data.data
                            }
                        })
                    }, 300);
                })
            },
            onSaveClose(){
                let ds = this.$refs.inputTimesheet.kendoWidget();
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            id:               this.timesheet.id ? this.timesheet.id : '',
                            employee:         this.employee ? this.employee : {},
                            monthOf:          kendo.toString(new Date(this.start_date), 'yyyy-MM-dd'),
                            location:         this.locationSelected,
                            timeSheetRecord:  ds.data(),
                            loggedUser:       this.loggedUser
                        }
                        employeeHandler.createTimesheet(data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.$snotify.success('Success')
                                this.close()
                                this.clear()
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }, 300);
                })
            },
            cancel(){
                
            },
            close(){
                window.history.go(-1)
            },
            async initData() {
                if (this.$route.params.id !== undefined) {
                    await this.loadSingleEmployee()
                }
            },
            async loadSingleEmployee() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true
                        employeeHandler.get(this.$route.params.id).then(res => {
                            this.showLoading = true
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.employee = res.data.data[0]
                                if(this.employee){
                                    this.name = this.employee.employeeId +'-'+this.employee.firstName + ' ' + this.employee.lastName 
                                }
                            }
                        })
                    }, 300);
                })
            },

        },
        mounted: async function () {
            this.initData()
            this.loadLocation()
        },
        watch: {
            '$route': 'loadSingleEmployee'
        }
    }

</script>
<style scoped>
    .small_sidebar {
        height: 97%;
        position: relative;
        padding: 12px;
    }
    .hide_small_bar_class {
        max-width: 0;
        transition: .5s ease-in;
        flex: 0 0 0;
        padding: 0;
    }

    .hide_big_bar_class {
        max-width: 100%;
        transition: .5s ease-in;
        flex: 0 0 100%;
    }
    .iconArrow {
        right: -35px;
        position: absolute;
        bottom: -10px;
    }
    .iconArrowHide {
        position: absolute;
        right: -7px;
        bottom: -10px;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: transparent !important;
    }
    .detial_smallside_p{
        position: absolute;
        bottom: 10px;
    }   
    .k-scrollbar .k-scrollbar-vertical .k-grid-header{
        width: 0px!important;
        padding-right: 16px!important;
        
    }
</style>