<template>
    <v-row>
        <v-col cols="12" class="pt-0">
            <v-row style="margin-bottom: -40px;">
                <v-col sm="3">
                    <label class="label">{{$t('for_the_month_of')}}</label>
                    <month-picker :initialMonth="monthOf" @emitMonth="monthOf = $event" @onChanged="monthOfChange"/>
                </v-col>
                <v-col sm="3">
                    <v-row class="my-3 mr-0" style="padding-top: 12px;">
                        <v-col sm="3" cols="3" class="pt-0 pr-0">
                            <div class="code_text text-bold">{{prefix.abbr}}</div>
                        </v-col>
                        <v-col sm="7" cols="7" class="pt-0 pl-0 pr-1">
                            <v-text-field class=" custom-border "
                                v-model="number"
                                outlined
                                :rules="[v => !!v || 'Number is required']"
                                required
                                readonly/>
                        </v-col>
                        <v-col sm="2" cols="2" class="pt-0 px-0">
                            <v-icon color="black" size="30" class="border_qrcode"
                                @click="generateNumber">mdi-qrcode
                            </v-icon>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col sm="3">
                    <label class="label">{{$t('Date')}}</label>
                    <date-picker :initialDate="date" @emitDate="date = $event"/>
                </v-col>
                <v-col sm="3" style="text-align: center;">
                    <p>{{$t('approved_exch_rate_month')}}</p>
                    <h2 class="primary--text">{{numberFormat(exchangeRate)}}</h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="3">
                    <label>{{$t('employee_group')}}</label>
                    <v-select class="mt-1"
                        outlined
                        :items="employeeGroups"
                        :item-text="item =>`${item.groupCode} - ${item.groupName}`"
                        item-value="id"
                        :disabled="disabledG"
                        v-model="employeeGroup"
                        @change="employeeGroupChange"
                        clearable
                        tage="Business Unit/Branch"/>
                </v-col>
                <v-col sm="3">
                    <label>{{$t('business_unit_branch')}}</label>
                    <v-select class="mt-1"
                        outlined
                        :disabled="disabledL"
                        :items="location"
                        item-text="name"
                        item-value="id"
                        v-model="locationSelected"
                        @change="locationChange"
                        tage="Business Unit/Branch"
                        return-object
                        clearable/>
                </v-col>
                <v-col sm="3">
                    <label>{{$t('department')}}</label>
                    <v-select class="mt-1"
                        outlined
                        :disabled="disabled"
                        :loading="loading"
                        :items="departments"
                        item-text="name"
                        item-value="id"
                        v-model="department"
                        tage="Business Unit/Branch"/>
                </v-col>
                <v-col sm="3">
                    <label>{{$t('nature_of_the_contract')}}</label>
                    <v-select class="mt-1"
                        outlined
                        :disabled="disabled"
                        :items="natureContracts"
                        item-text="name"
                        item-value="id"
                        v-model="natureContract"
                        tage="Business Unit/Branch"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="3" cols="12">
                    <v-select class="mt-1"
                        id="acc_type_selector"
                        :items="natureInput"
                        item-text="name"
                        item-value="id"
                        v-model="natureInputSelected"
                        @change="ChangeNature"
                        outlined
                        clearable/>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-dialog v-model="dialogm" max-width="1080px">
                        <template v-slot:activator="{ on }">
                            <!-- <v-card-text :class="{'setCardHeight': setCardHeight,'setCardHeightOther': !setCardHeight}"> -->
                                <!-- <div v-if="natureInputSelected === 'Timecard'" > -->
                                    <v-btn :disabled="btnEnabled"  color="primary" style="width: 100%;" class="float-right text-capitalize" v-on="on">
                                        {{$t('import_timecard')}}
                                    </v-btn>
                                <!-- </div> -->
                            <!-- </v-card-text> -->
                        </template>
                        <v-card>
                            <div class="modal_header">
                                <v-card-title>{{$t('import_data')}}</v-card-title>
                                <v-icon  @click="dialogm = false">close</v-icon>
                            </div>
                            <v-card-text class="modal_text_content">
                                <v-row>
                                    <v-col sm="2" class="pr-2 pt-2">
                                        <label class="label mt-2">{{$t('location')}}</label>
                                    </v-col>
                                    <v-col sm="2" class="pl-0">
                                    <v-select class="mt-1"
                                        outlined
                                        :items="location"
                                        item-text="name"
                                        item-value="id"
                                        v-model="locationSelected"
                                        tage="Business Unit/Branch"
                                        return-object/>
                                    </v-col>
                                    <v-col sm="2" class="pr-2 pt-2">
                                        <label class="label mt-2">{{$t('segment')}}</label>
                                    </v-col>
                                    <v-col sm="2" class="pl-0">
                                        <v-select class="mt-1"
                                        id="acc_type_selector"
                                        :items="segment"
                                        item-text="name"
                                        item-value="id"
                                        v-model="segmentSelected"
                                        outlined
                                        return-object/>
                                    </v-col>
                                    <v-col sm="2" class="pr-2 pt-2">
                                        <label class="label mt-3">{{$t('month_of')}}</label>
                                    </v-col>
                                    <v-col sm="2" class="pl-0">
                                        <month-picker :initialMonth="monthOf" @emitMonth="monthOf = $event"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="3" cols="12">
                                        <p>Download file format for import</p>
                                    </v-col>
                                    <v-col sm="3" cols="12">
                                        <v-btn color="secondary" class=" white--text float-right text-capitalize mr-5" @click="downloadTimeCard">
                                            {{$t('file_format')}}
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="3" cols="12">
                                        <p>Or start importing if you are ready</p>
                                    </v-col>
                                    <v-col sm="3" cols="12">
                                        <v-col sm="12" cols="12" class="py-0">
                                            <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
                                        </v-col>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <kendo-datasource ref="dataSourceInput"
                                            :data="tableData"/>
                                        <kendo-grid id="gridTimecard" class="grid-function"
                                            :data-source-ref="'dataSourceInput'"
                                            :editable="false"
                                            :scrollable-virtual="true">
                                            <kendo-grid-column
                                                :field="'date'"
                                                :title="$t('date')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= kendo.toString(new Date(date),`yyyy-MM-dd`)#</span>'"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                :field="'employeeId'"
                                                :title="$t('employee_id')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= employeeId#</span>'"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                :field="'employeeName'"
                                                :title="$t('employee_name')"
                                                :width="120"
                                                :template="'<span>#= employeeName#</span>'"
                                                readonly
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                :field="'timeTable'"
                                                :title="$t('time_table')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= timeTable#</span>'"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                :field="'clockedIn'"
                                                :title="$t('clocked_in')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= kendo.toString(new Date(clockedIn), timeFormat)#</span>'"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                :field="'clockedOut'"
                                                :title="$t('clocked_out')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= kendo.toString(new Date(clockedOut), timeFormat)#</span>'"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                :field="'overTimeWeekend'"
                                                :title="$t('over_time_weekend')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= overTimeWeekend#</span>'"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                :field="'overTimeHoliday'"
                                                :title="$t('over_time_holiday')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= overTimeHoliday#</span>'"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                :field="'overTimeNight'"
                                                :title="$t('over_time_night')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= overTimeNight#</span>'"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                :field="'work_time'"
                                                :title="$t('work_time')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= workTime ? workTime: 0#</span>'"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                        </kendo-grid>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions class="modal_footer">
                                <v-btn class="btn_cancel" @click="dialogm = false">{{$t('cancel')}}</v-btn>
                                <v-btn color="primary" class="white--text capitalize" @click="onSaveClose">
                                    {{$t('confirm_report')}}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-btn style="width: 100%;" color="primary" @click="search()" class=" white--text float-right text-capitalize">
                        {{$t('search')}}
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <kendo-datasource ref="dataSourceTimeCard"
                :data="timeCardLine"
                :sort="sort"/>
            <kendo-grid id="gridInput" class="grid-function"
                :data-source-ref="'dataSourceTimeCard'"
                :editable="false"
                :scrollable-virtual="true"
                :column-menu="false">
                <kendo-grid-column
                    :field="'employeeId'"
                    :title="$t('employee_id')"
                    :template="'<span>#= employeeId#</span>'"
                    readonly
                    :width="150"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :field="'employeeName'"
                    :title="$t('employee_name')"
                    readonly
                    :width="200"
                    :template="'<span>#= employeeName#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :field="'workDay'"
                    :title="$t('workDay')"
                    readonly
                    :width="120"
                    :template="'<span>#= workDay#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{
                        style: 'text-align: center;'
                    }"/>
                <kendo-grid-column
                    :field="'paidHours'"
                    :title="$t('work_hours')"
                    readonly
                    :width="120"
                    :template="'<span>#= paidHours#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{
                        style: 'text-align: center;'
                    }"/>
                <kendo-grid-column
                    :field="'overTimeWeekend'"
                    :title="$t('over_time_weekend')"
                    readonly
                    :template="'<span>#= overTimeWeekend#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{
                        style: 'text-align: center;'
                    }"/>
                <kendo-grid-column
                    :field="'overTimeNight'"
                    :title="$t('over_time_night')"
                    readonly
                    :template="'<span>#= overTimeNight || 0#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{
                        style: 'text-align: center;'
                    }"/>
                <kendo-grid-column
                    :field="'overTimeHoliday'"
                    :title="$t('over_time_holiday')"
                    readonly
                    :template="'<span>#= overTimeHoliday#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{
                        style: 'text-align: center;'
                    }"/>
            </kendo-grid>
        </v-col>
        <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"  type="loading"/>
    </v-row>
</template>
<script>
import UploadExcelComponent from '@/components/upload_excel/TimeCard.vue';
import kendo from "@progress/kendo-ui";
import TimeCardLine from "@/scripts/model/TimeCardLine";
import EmployeeModel from '@/scripts/model/Employee'
import TimeCard from "@/scripts/model/TimeCard";
import PayrollRun from "@/scripts/model/PayrollRun";
import PayrollList from "@/scripts/model/PayrollList"

const instituteHandler = require("@/scripts/instituteHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const axios 	= require('axios');
const timeCardLineModel = new TimeCardLine({})
const employeeModel = new EmployeeModel({})
const timeCardModel = new TimeCard({})
const payrollRunModel = new PayrollRun({})
const employeeHandler = require("@/scripts/employeeHandler")
const payrollHandler = require("@/scripts/payrollHandler")
const locationHandler = require("@/scripts/locationHandler")
const settingsHandler = require("@/scripts/settingsHandler")
const currencyType = {
    FUNCTIONAL_CURRENCY: 'fun-c',
    TRANSACTION_CURRENCY: 'txn-c',
    REPORTING_CURRENCY: 'rpt-c',
    TAX_EXCHANGE_CURRENCY: 'tax-c',
}

/* Cookie */
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();

export default {
    props:['propInput'],
    data: () =>({
        loading: false,
        disabled: true,
        disabledL: false,
        disabledG: false,
        showLoading: true,
        journal_date: "",
        dialogm: false,
        tableData: [],
        tableHeader: [],
        dateFormat: timeCardLineModel.dateFormat,
        timeFormat: timeCardLineModel.timeFormat,
        employeeData: [],
        monthOf: '',
        date: new Date().toISOString().substr(0, 10),
        location: [],
        segment: [],
        employee: employeeModel,
        timeCard: timeCardModel,
        payrollRun: payrollRunModel,
        locationSelected: '',
        segmentSelected: '',
        setCardHeight: false,
        natureInput:[
            {name: 'Timesheet'},
            {name: 'Timecard'},
            {name: 'Fixed'}
        ],
        timeCardLine: [],
        recordList: [],
        natureInputSelected:'Fixed',
        number: '',
        prefix: '',
        payNumber: {},
        result: {},
        exchangeRate: {},
        btnEnabled: true,
        sort:[
            { field: 'employeeId', dir: 'asc' }
        ],
        period: {},
        loggedUser: {
            id: cookie.creator,
            name: cookie.email
        },
        baseCurrency: {},
        departments: [],
        department: "",
        natureContracts:[
            {id: "fixed_duration_contract", name: "Fixed Duration Contract"},
            {id: "undetermined_duration_contract", name: "Undetermined Duration Contract"},
            {id: "contractd", name: "Contracted"}
        ],
        natureContract: "",
        employeeGroups: [],
        employeeGroup: ""
    }),
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'upload-excel-component':UploadExcelComponent,
        'month-picker' : ()=> import('@/components/custom_templates/MonthPicker'),
        'date-picker' : ()=> import('@/components/custom_templates/DatePickerComponent')
    },
    methods: {
        numberFormat(value){
            let rate = value.rate
            return kendo.toString( kendo.parseFloat(1/rate),`n0`)
        },
        returnData(data){
            this.$emit('returnData', data)
        },
        ChangeNature() {
            if (this.natureInputSelected === 'Timecard') {
                this.btnEnabled = false
            }else {
                this.btnEnabled = true
            }
        },
        monthOfChange(){
            this.generateNumber()
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
                var utc_days  = Math.floor(element.date - 25569);
                var utc_value = utc_days * 86400;                                        
                var date_info = new Date(utc_value * 1000);
                var fractional_day = element.date - Math.floor(element.date) + 0.0000001;
                var total_seconds = Math.floor(86400 * fractional_day);
                var seconds = total_seconds % 60;
                total_seconds -= seconds;
                var hours = Math.floor(total_seconds / (60 * 60));
                var minutes = Math.floor(total_seconds / 60) % 60;
                var current_datetime =  new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
                element.date    = current_datetime
                element.dateFormat = this.dateFormat
                var utc_days_time_in  = Math.floor(element.clockedIn - 25569);
                var utc_value_time_in = utc_days_time_in * 86400;                                        
                var date_info_time_in = new Date(utc_value_time_in * 1000);
                var fractional_time_in = element.clockedIn - Math.floor(element.clockedIn) + 0.0000001;
                var total_seconds_time_in = Math.floor(86400 * fractional_time_in);
                var seconds_time_in = total_seconds_time_in % 60;
                total_seconds_time_in -= seconds_time_in;
                var hours_time_in = Math.floor(total_seconds_time_in / (60 * 60));
                var minutes_time_in = Math.floor(total_seconds_time_in / 60) % 60;
                var current_time_in =  new Date(date_info_time_in.getFullYear(), date_info_time_in.getMonth(), date_info_time_in.getDate(), hours_time_in, minutes_time_in, seconds_time_in);
                element.clockedIn    = current_time_in

                var utc_days_time_out  = Math.floor(element.clockedOut - 25569);
                var utc_value_time_out = utc_days_time_out * 86400;                                        
                var date_info_time_out = new Date(utc_value_time_out * 1000);
                var fractional_time_out = element.clockedOut - Math.floor(element.clockedOut) + 0.0000001;
                var total_seconds_time_out = Math.floor(86400 * fractional_time_out);
                var seconds_time_out = total_seconds_time_out % 60;
                total_seconds_time_out -= seconds_time_out;
                var hours_time_out = Math.floor(total_seconds_time_out / (60 * 60));
                var minutes_time_out = Math.floor(total_seconds_time_out / 60) % 60;
                var current_time_out =  new Date(date_info_time_out.getFullYear(), date_info_time_out.getMonth(), date_info_time_out.getDate(), hours_time_out, minutes_time_out, seconds_time_out);
                element.clockedOut    = current_time_out
                element.timeFormat  = this.timeFormat
            });
            this.tableData = results
            this.tableHeader = header
        },
        onSaveClose(){
            this.autoCalculate()
            this.groupBy()
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let dataTimeCard = {
                        id:                       this.timeCard.id ? this.timeCard.id : '',
                        monthOf:                  kendo.toString(new Date(this.monthOf),'yyyy-MM-dd'),
                        timeCardLine:             this.timeCardLine,
                        totalWork:                this.totalWork,
                        totalOverTimeWeekend:     this.totalOverTimeWeekend,
                        totalOverTimeHoliday:     this.totalOverTimeHoliday,
                        totalOverTimeNight:       this.totalOverTimeNight,
                        location:                 this.locationSelected,
                        locationId:               this.locationSelected.id,
                        segment:                  this.segmentSelected,
                        segmentId:                this.segmentSelected.id,
                        period:                   this.period,
                    };
                    payrollHandler.createTimeCard(dataTimeCard).then(response => {
                        if (response.data.statusCode === 201) {
                            this.$snotify.success('Success')
                            this.close()
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
        autoCalculate() {
            let ds = this.$refs.dataSourceInput.kendoWidget(),
            // specificWorks = [],
            totalWork = 0,
            totalOverTimeWeekend = 0,
            totalOverTimeHoliday = 0,
            totalOverTimeNight   = 0;
            ds.data().forEach(value => {
                totalWork += kendo.parseFloat(value.workTime)
                totalOverTimeWeekend += kendo.parseFloat(value.overTimeWeekend)
                totalOverTimeHoliday += kendo.parseFloat(value.overTimeHoliday)
                totalOverTimeNight   += kendo.parseFloat(value.overTimeNight)
            })
            this.totalWork              = totalWork
            this.totalOverTimeWeekend   = totalOverTimeWeekend
            this.totalOverTimeHoliday   = totalOverTimeHoliday
            this.totalOverTimeNight     = totalOverTimeNight
        },
        groupBy() {
            let ds = this.$refs.dataSourceInput.kendoWidget();
            let helper = {};
            let result = ds.data().reduce(function(r, o) {
                let key = o.date + '-' + o.employeeId;
                if(!helper[key]) {
                    helper[key] = Object.assign({}, o); // create a copy of o
                    r.push(helper[key]);
                } else {
                    helper[key].workTime += o.workTime;
                }
                return r;
            }, []);
            let lastResult = {}
            let employees = this.employees
            let last_result = result.reduce(function(m, n) {
                let key = n.employeeId
                if(!lastResult[key]) {
                    lastResult[key] = Object.assign({}, n); // create a copy of o
                    m.push(lastResult[key]);
                } else {
                    employees.forEach(function(em) {
                        if(key == em.employeeId){
                            lastResult[key].workTime += n.workTime;
                            lastResult[key].employeeUuid  = em.id;
                        }
                    });
                }
                return m;
            }, []);
            let timeCardLine =  last_result.map(n=>{
                return new TimeCardLine(n)
            })
            this.timeCardLine = timeCardLine
        },
        async loadEmployee(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employees = []
                    employeeHandler.center().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.employees = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        close() {
            this.dialogm = false
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
        async loadSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    settingsHandler.getSeg().then(res => {
                        if(res.data.statusCode === 200){
                            this.segment = res.data.data        
                        }
                    })
                }, 300);
            })
        },
        filterEmployee(){
            if(this.natureInputSelected == "Fixed"){
                let result = this.recordList.filter(n =>n.salaryType =="Monthly" && n.applyOvertime == false);
                let timeCardList = result.map(index =>{
                    let bank = index.employee.bank
                    return {
                        employeeUuid:               index.employee.id ? index.employee.id: '',
                        salary:                     parseFloat(index.salary),
                        employeeId:                 index.employeeId,
                        bank:                       {
                            bankName:       bank.bankName,
                            bankUuid:       bank.id || '',
                            bankAccount:    index.employee.bankAccount
                        } ,
                        employeeName:               index.employee.firstName +' '+ index.employee.lastName,
                        natureEmployee:             index.employee.natureEmployee,
                        payrollLiabilitie:          index.employee.payrollLiabilitie,
                        paymentMethod:              index.employee.paymentMethod,
                        spouseNatureEmployee:       index.employee.spouseNatureEmployee,
                        workingStatus:              index.employee.workingStatus,
                        spouseGender:               index.employee.spouseGender,
                        gender:                     index.employee.gender,
                        noOfChildren:               index.employee.noOfChildren,
                        overTimeHoliday:            0,
                        overTimeWeekend:            0,
                        overTimeNight:              0,
                        workDay:                    0,
                        workTime:                   0,
                        benefit:                    index.benefit,
                        totalBenefit:               0 ,
                        currency:                   index.currency ? index.currency: {},
                        location:                   index.location,
                        segment:                    index.segment,
                        salaryType:                 index.salaryType.name,
                        startingTime:               index.startingTime,
                        position:                   index.position,
                        natureContract:             index.natureContract,
                        earning:                    parseFloat(index.salary),
                        paidHours:                  0,
                        deduction:                  0,
                        netPay:                     0,
                    }
                })
                this.timeCardLine = timeCardList
                window.console.log('timeCardList', this.timeCardLine)
                this.showLoading = false;
            }else{
                let param =  {
                    'monthOf':      kendo.toString( new Date(this.monthOf),'yyyy-MM-dd'),
                    'selectTime':   this.natureInputSelected
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getTimeCard(param).then(res => {
                            if(res.data.statusCode === 200){
                                let result = res.data.data;
                                if(result.length > 0){
                                    if(result[0].timeCardLine.length > 0){
                                        window.console.log()
                                        let result_timecard = result[0].timeCardLine;
                                        let result_record = []
                                        if(this.employeeGroup){
                                            result_record = this.recordList.filter(n =>n.applyOvertime == true && this.employeeGroup == n.group);
                                        }else if(this.locationSelected.id){
                                            result_record = this.recordList.filter(n =>n.applyOvertime == true && this.locationSelected.id == n.location.id);
                                        }else if(this.department){
                                            result_record = this.recordList.filter(n =>n.applyOvertime == true && this.department == n.department.id);
                                        }else if(this.natureContract){
                                            result_record = this.recordList.filter(n =>n.applyOvertime == true && this.natureContract == n.natureContract.id);
                                        }else{
                                            result_record = this.recordList.filter(n =>n.applyOvertime == true);
                                        }
                                        let timeCardList = [];
                                        result_timecard.forEach(function(tc) {
                                            let time_employeeId = tc.employeeId;
                                            let totalBenefit = 0;
                                            let deduction = 0;
                                            let netPay = 0;
                                            const re =  result_record.filter(m => m.employeeId ===  time_employeeId).map(item =>{
                                                item.benefit.forEach(function(b){
                                                    if(b.amount){
                                                        totalBenefit += parseFloat(b.amount)
                                                    }
                                                }) 
                                                let payrollLiabilitie       =  item.employee.payrollLiabilitie
                                                let period = result[0].period
                                                let overTimeNight = tc.overTimeNight * parseFloat(period.overtimeNight)
                                                let overTimeWeekend = tc.overTimeWeekend * parseFloat(period.overtimeForWeekend)
                                                let overTimeHoliday = tc.overTimeHoliday * parseFloat(period.overtimeForNationalHoliday)
                                                let totalHours = tc.workTime + overTimeNight + overTimeWeekend + overTimeHoliday
                                                let totaloverTime = overTimeNight + overTimeWeekend + overTimeHoliday
                                                let workDay = tc.workTime / parseFloat(period.hourPerDay)
                                                let salaryAmount = 0
                                                let salary = parseFloat(item.salary)
                                                if(item.salaryType == "Monthly"){
                                                    let salaryHours = salary / (parseFloat(period.hourPerDay) * parseFloat(period.workingDay)) 
                                                    salaryAmount = salary + (salaryHours * totaloverTime)
                                                }else{
                                                    salaryAmount = salary * totalHours
                                                }
                                                let bank = item.employee.bank
                                                return {
                                                    employeeUuid:               item.employee.id ? item.employee.id: '',
                                                    salary:                     salaryAmount,
                                                    employeeId:                 tc.employeeId,
                                                    bank:                       {
                                                        bankName:       bank.bankName,
                                                        bankUuid:       bank.id || '',
                                                        bankAccount:    item.employee.bankAccount
                                                    },
                                                    spouseNatureEmployee:       item.employee.spouseNatureEmployee,
                                                    workingStatus:              item.employee.workingStatus,
                                                    spouseGender:               item.employee.spouseGender,
                                                    gender:                     item.employee.gender,
                                                    employeeName:               item.employee.firstName +' '+   item.employee.lastName,
                                                    natureEmployee:             item.employee.natureEmployee,
                                                    noOfChildren:               item.employee.noOfChildren,
                                                    payrollLiabilitie:          payrollLiabilitie,
                                                    paymentMethod:              item.employee.paymentMethod,
                                                    overTimeHoliday:            tc.overTimeHoliday,
                                                    overTimeWeekend:            tc.overTimeWeekend,
                                                    overTimeNight:              tc.overTimeNight,
                                                    workDay:                    workDay || 0,
                                                    paidHours:                  tc.workTime,
                                                    totalWorkinghours:          tc.workTime,
                                                    currency:                   tc.currency ? tc.currency: {},
                                                    totalBenefit:               parseFloat(totalBenefit) ,
                                                    location:                   item.location,
                                                    segment:                    item.segment,
                                                    salaryType:                 item.salaryType.name,
                                                    startingTime:               item.startingTime,
                                                    position:                   item.position,
                                                    natureContract:             item.natureContract,
                                                    earning:                    parseFloat(item.salary) + parseFloat(totalBenefit),
                                                    deduction:                  deduction,
                                                    netPay:                     netPay,
                                                }
                                            })
                                            if(re.length >0){
                                                timeCardList.push(re[0])
                                            }
                                        });
                                        this.timeCardLine = timeCardList
                                        this.showLoading = false
                                    }else{
                                        let result_record = []
                                        if(this.employeeGroup){
                                            result_record = this.recordList.filter(n =>n.applyOvertime == true && this.employeeGroup == n.group);
                                        }else if(this.locationSelected.id){
                                            result_record = this.recordList.filter(n =>n.applyOvertime == true && this.locationSelected.id == n.location.id);
                                        }else if(this.department){
                                            result_record = this.recordList.filter(n =>n.applyOvertime == true && this.department == n.department.id);
                                        }else if(this.natureContract){
                                            result_record = this.recordList.filter(n =>n.applyOvertime == true && this.natureContract == n.natureContract.id);
                                        }else{
                                            result_record = this.recordList.filter(n =>n.applyOvertime == true);
                                        }
                                        let timesheet = []
                                        result.forEach(function(tc) {
                                            window.console.log(tc.employee.id)
                                            let time_employee_id = tc.employee.id;
                                            let totalBenefit = 0;
                                            let deduction = 0;
                                            let netPay = 0;
                                            let period = tc.period
                                            // let totalHours = 0
                                            const re =  result_record.filter(m => m.employee_id ===  time_employee_id).map(item =>{
                                                item.benefit.forEach(function(b){
                                                    if(b.amount){
                                                        totalBenefit += parseFloat(b.amount)
                                                    }
                                                })
                                                let overTimeNight = tc.overTimeNight * parseFloat(period.overtimeNight)
                                                let overtimeHoursWeekend = tc.overtimeHoursWeekend * parseFloat(period.overtimeForWeekend)
                                                let overtimeHoursHoliday = tc.overtimeHoursHoliday * parseFloat(period.overtimeForNationalHoliday)
                                                let totalHours = tc.workingHours + overTimeNight + overtimeHoursWeekend + overtimeHoursHoliday
                                                let workDay = tc.workingHours /parseFloat(tc.period.hourPerDay)
                                                let totaloverTime = overTimeNight + overtimeHoursWeekend + overtimeHoursHoliday
                                                let salary = parseFloat(item.salary)
                                                let salaryAmount = 0
                                                if(item.salaryType == "Monthly"){
                                                    let salaryHours = salary / (parseFloat(tc.period.hourPerDay) * parseFloat(tc.period.workingDay)) 
                                                    salaryAmount = salary + (salaryHours * totaloverTime)
                                                }else{
                                                    salaryAmount = salary * totalHours
                                                }
                                                let bank = tc.employee.bank
                                                return {
                                                    employeeUuid:       tc.employee.id,
                                                    salary:             salaryAmount,
                                                    employeeId:         tc.employee.employeeId,
                                                    gender:             tc.employee.gender,
                                                    employee:           tc.employee,
                                                    payrollLiabilitie:  tc.employee.payrollLiabilitie,
                                                    bank:                       {
                                                        bankName:       bank.bankName,
                                                        bankUuid:       bank.id,
                                                        bankAccount:    tc.employee.bankAccount
                                                    },
                                                    spouseNatureEmployee:tc.employee.spouseNatureEmployee,
                                                    workingStatus:      tc.employee.workingStatus,
                                                    spouseGender:       tc.employee.spouseGender,
                                                    paymentMethod:      tc.employee.paymentMethod,
                                                    natureEmployee:     tc.employee.natureEmployee,
                                                    noOfChildren:       tc.employee.noOfChildren,
                                                    employeeName:       tc.employee.firstName +' '+   tc.employee.lastName,
                                                    overTimeHoliday:    tc.overtimeHoursHoliday,
                                                    overTimeWeekend:    tc.overtimeHoursWeekend,
                                                    overTimeNight:      tc.overTimeNight,
                                                    paidHours:          tc.workingHours,
                                                    workingHours:       tc.workingHours,
                                                    period:             tc.period,
                                                    workDay:            workDay || 0,
                                                    benefit:            item.benefit,
                                                    totalBenefit:       parseFloat(totalBenefit),
                                                    totalWorkinghours:  parseFloat(totalHours),
                                                    segment:            item.segment,
                                                    location:           item.location,
                                                    salaryType:         item.salaryType.name,
                                                    startingTime:       item.startingTime,
                                                    position:           item.position,
                                                    currency:           item.currency ? item.currency: {},
                                                    natureContract:     item.natureContract,
                                                    earning:            parseFloat(item.salary) + parseFloat(totalBenefit),
                                                    deduction:          deduction,
                                                    netPay:             netPay,
                                                }
                                            })
                                            window.console.log('re',re)
                                            if(re.length > 0){
                                                timesheet.push(re[0])
                                            }
                                        })
                                        this.timeCardLine = timesheet
                                        this.showLoading = false;
                                    }
                                }else{
                                    this.timeCardLine = []
                                    this.showLoading = false;
                                }
                            }
                        })
                    }, 300);
                })
            }
        },
        async search(){
            let location_id = ''
            if(this.locationSelected){
                location_id = this.locationSelected.id
            }
            let param ={
                status:             1,
                location_id:        location_id || "",
                department_id:      this.department,
                natureContract_id:  this.natureContract,
                employeeGroup_id:   this.employeeGroup || ''
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true;
                    employeeHandler.getRecord(param).then(res => {
                        this.showLoading = true;
                        if(res.data.statusCode === 200){
                            this.recordList = res.data.data
                            this.showLoading = true;
                            this.filterEmployee()
                        }
                    })
                }, 300);
            })
        },
        saveNext(){
            let ds = this.$refs.dataSourceTimeCard.kendoWidget()
            let totalEmployee = 0;
            ds.data().forEach(value => {
                if(value){
                    totalEmployee += 1
                }
            })
            this.totalEmployee = totalEmployee
            let dataSource = ds.data()
            this.payrollList = dataSource.map(index=>{
                return new PayrollList({
                    applyOvertime:      index.applyOvertime,
                    date:               this.date,
                    benefit:            index.benefit || '',
                    // employee:           index.employee,
                    bank:               index.bank,
                    employeeId:         index.employeeId,
                    employee_id:        index.employee_id,
                    employeeUuid:       index.employeeUuid,
                    employeeName:       index.employeeName,
                    gender:             index.gender,
                    location:           index.location,
                    natureRecord:       index.natureRecord,
                    natureEmployee:     index.natureEmployee,
                    natureSalary:       index.natureSalary,
                    overTime:           index.overTime,
                    position:           index.position,
                    salary:             index.salary,
                    salary1:            index.salary,
                    salaryType:         index.salaryType,
                    totalBenefit:       index.totalBenefit,
                    segment:            index.segment ? index.segment: [],
                    startingTime:       index.startingTime,
                    status:             index.status,
                    workDay:            index.workDay,
                    currency:           index.currency,
                    period:             index.period,
                    overTimeHoliday:    index.overTimeHoliday,
                    overTimeWeekend:    index.overTimeWeekend,
                    overTimeNight:      index.overTimeNight,
                    workingHours:       index.workingHours,
                    totalWorkinghours:  index.totalWorkinghours,
                    paidHours:          index.paidHours,
                    paymentMethod:      index.paymentMethod,
                    payrollLiabilitie:  index.payrollLiabilitie,
                    natureContract:     index.natureContract,
                    spouseNatureEmployee:index.spouseNatureEmployee,
                    workingStatus:      index.workingStatus,
                    spouseGender:       index.spouseGender,
                    noOfChildren:       index.noOfChildren      
                })
            })
            if(this.payrollList.length > 0 && this.baseCurrency && this.exchangeRate.rate){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = new PayrollRun({
                            id:                   this.$route.params.id,
                            location:             this.locationSelected,
                            monthOf:              kendo.toString(new Date(this.monthOf),'yyyy-MM-dd'),
                            sequcencing:          parseInt(kendo.toString(new Date(this.monthOf),'yyyy')),
                            totalEmployee:        this.totalEmployee,
                            currency:             this.baseCurrency,
                            exchangeRate:         this.exchangeRate,
                            date:                 kendo.toString(new Date(this.date),'yyyy-MM-dd'),
                            payNumber:            this.payNumber,
                            number:               this.number,
                            created:              kendo.toString(new Date(),'yyyy-MM-dd'),
                            lastNumber:           this.lastNumber,
                            abbr:                 this.payNumber.abbr,
                            type:                 'payroll',
                            natureInput:          this.natureInputSelected,
                            referenceNumber:      this.payNumber.abbr+this.payNumber.numberSeparator + this.number,
                            payrollList:          this.payrollList,
                            step:                 2,      
                            department:           this.department,
                            natureContract:       this.natureContract,
                            employeeGroup:        this.employeeGroup,
                            loggedUser:           this.loggedUser, 
                        });
                        this.showLoading = true
                        window.console.log('data_____',data)
                        payrollHandler.createPayroll(data).then(response => {
                            this.showLoading = true
                            if (response.data.statusCode === 201) {
                                this.$snotify.success('Success')
                                this.loadSuccess(response.data.statusCode)
                                this.close()
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }, 300);
                })
            }else{
                if(!this.exchangeRate.rate){
                    this.$snotify.error('Exchange rate not found! please check again')
                }
                if(this.payrollList.length == 0){
                    this.$snotify.error('Data not found please check again')
                }
            }
        },
        loadSuccess(data){
            this.$emit('headline',data)
        },
        async loadPayrollList(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true;
                    payrollHandler.getPayroll(this.$route.params.id).then(res => {
                        this.showLoading = true;
                        if(res.data.statusCode === 200){
                            window.console.log('Rannnnn', res)
                            const resultPay = res.data.data
                            if(resultPay.length > 0){                            
                                this.result = resultPay[0]
                                this.loadPayrollItem(this.result)
                                // this.date = resultPay.date
                                if(this.result.monthOf !== ''){
                                    this.monthOf = kendo.toString(new Date(this.result.monthOf), "yyyy-MM")
                                    this.generateNumber()
                                }
                                this.locationSelected = this.result.location
                                this.employeeGroup = this.result.employeeGroup
                                if(this.employeeGroup !== ""){
                                    this.disabledL = true
                                }
                            }
                            this.showLoading = false;
                        }
                    })
                }, 300);
            })
        },
        loadPayrollItem(result){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employee = []
                    payrollHandler.getPayrollItem(result.id).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            let resutl_item = res.data.data
                            this.timeCardLine = resutl_item
                            this.showLoading = false
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        loadPrefixes() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    settingsHandler.getPrefixes().then(res => {
                        if (res.data.statusCode === 200) {
                            let result = res.data.data
                            this.prefixList = result.filter(p => p.type =='payroll')
                            this.prefix = this.prefixList[0]
                            this.payNumber = this.prefix
                        }
                    })
                }, 300)
            })
        },
        generateNumber() {
            let resultNumber = this.result
            if(resultNumber.number){
                this.number     = resultNumber.number
                this.lastNumber = resultNumber.lastNumber
                this.payNumber  = resultNumber.payNumber
            }else{
                let montOf_format = kendo.toString(new Date(this.monthOf),'yyyy-MM-dd');
                if(montOf_format == ""){
                    let month_year = kendo.toString(new Date(),'yyyy-MM-dd')
                    montOf_format = month_year.setDate(1)
                }
                let sequcencing = ''
                if(this.payNumber.sequcencing =="Year"){
                    sequcencing = new Date(montOf_format).toISOString().substr(0, 4)
                }else if(this.payNumber.sequcencing =="Month"){
                    sequcencing = new Date(montOf_format).toISOString().substr(0, 7)
                }else{
                    sequcencing = ''
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            abbr:           this.payNumber.abbr,
                            structure:      this.payNumber.structure,
                            date:           montOf_format,
                            type:           'payroll',
                            pkId:           'par-',
                            sequcencing:    sequcencing
                        }
                        window
                        payrollHandler.getPrefixNumber(data).then(res => {
                            this.showLoading = true;
                            if(res.data.statusCode === 200){
                                const result = res.data.data
                                const lastNumber = this.zeroPad(parseInt(result.lastNumber), this.payNumber.format)
                                const number = result.suffix + this.payNumber.numberSeparator + lastNumber
                                this.number = number
                                this.lastNumber = lastNumber
                                this.showLoading = false;
                            }
                        })
                    }, 300);
                })
            }
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        downloadTimeCard(){
            axios.get('https://s3.ap-southeast-1.amazonaws.com/images.banhji/files/Timecard.xlsx', {
            // If you forget this, your download will be corrupt.
                responseType: 'blob'
            }).then((response) => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                link.setAttribute('download', 'Timecard.xlsx');
                document.body.appendChild(link);
                link.click();
            }); 
        },
        async loadBaseCurrency() {
            new Promise(resolve => {
                setTimeout(() => {
                    instituteHandler.getOneCompany(cookie.instituteId).then(res => {
                        this.baseCurrency = res.baseCurrency
                    })
                    resolve('resolved');
                }, 200);
            });
        },
        async loadLastExchangeRate(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    let getDate = new Date()
                    let date_tax_payroll = new Date(getDate.getFullYear(), getDate.getMonth(), 15);
                    let date = kendo.toString(new Date(date_tax_payroll),'yyyy-MM-dd')
                    window.console.log(date)
                    let code = 'KHR'
                    if (code !== undefined || code !== '') {
                        this.showLoading = true
                        currencyHandler.getLastExchangeRateTaxByDate(date, code).then(res => {
                            if (res.data.statusCode === 200) {
                                window.console.log(1,res.data)
                                this.showLoading = false
                                this.exchangeRate = res.data.data[0]
                            }
                        })
                    }

                }, 300)
            })
        },
        async loadCurrencyData(type) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    currencyHandler.list(type).then(response => {
                        if (response.data.statusCode === 200) {
                            if (type === currencyType.FUNCTIONAL_CURRENCY) {
                                this.funcCurrencyList = response.data.data
                            } else if (type === currencyType.TRANSACTION_CURRENCY) {
                                this.currencyList = response.data.data
                            }
                            this.showLoading = false
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        goBack(){
            let payroll_id = this.$route.params.id
            if(payroll_id && this.result.step == 1){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        this.showLoading = true
                        payrollHandler.deleteTransactions(payroll_id).then(response => {
                            if (response.statusCode === 200) {
                                this.loadPayrollList()
                                this.showLoading = false
                                window.history.go(-1)
                            }
                        })
                    },300)
                })
            }else{
                window.history.go(-1)
            }
        },
        async loadPeriod(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    payrollHandler.getPeriiod().then(res => {
                        this.period = res[0]
                    })
                }, 300);
            })
        },
        locationChange(){
            let location = this.locationSelected
            window.console.log('location',location)
            if(location !== null){
                this.disabledG = true
                this.loading = true
                this.disabled = false
                window.console.log(1, location)
                this.loadDepartment(location.id)
            }else{
                this.department = ""
                this.natureContract = ""
                this.disabledG = false
                this.disabled = true
                this.loading = false 
                

                window.console.log(2, location)
            }
        },
        async loadDepartment(location_id){
            let param = {
                location_id: location_id
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    payrollHandler.getDepartment(param).then(res => {
                        this.departments = res
                        if(this.departments.length > 0){
                            this.loading = false
                        }
                    })
                }, 300);
            })
        },
        async loadGroup(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    payrollHandler.getGroup().then(res => {
                        this.employeeGroups = res.data
                    })
                }, 300);
            })
        },
        employeeGroupChange (){
            if(this.employeeGroup){
                this.disabledL = true
            }else{
                this.disabledL = false
            }
        }
    },
    async mounted() {
        await this.loadPeriod()
        await this.loadPayrollList()
        await this.loadEmployee()
        await this.loadLocation()
        await this.loadSegment()
        // await this.loadRecord()
        await this.loadPrefixes()
        await this.loadBaseCurrency()
        await this.loadLastExchangeRate()
        await this.loadGroup()
        await this.loadCurrencyData(currencyType.TRANSACTION_CURRENCY)
    },
    watch: {
        propInput(){
            if (this.propInput !== undefined) {
                this.loadPayrollList()
                this.loadLastExchangeRate()
            }
        }
    },
}
</script>
<style scoped>
    .grayBg{
        background-color: #F8F8F9;
    }
    .my_table_darkv .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        color: rgba(0, 0, 0, 0.6);
        background: #222a35;
        color: #fff !important;
    }