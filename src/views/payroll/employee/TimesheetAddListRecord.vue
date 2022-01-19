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
                            <v-card outlined dense class="px-3 no_border" color="grayBg" height="92px">
                                <v-row>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t('employee_name') }}</label>
                                        <v-text-field class="mt-1"
                                            outlined
                                            v-model="name"
                                            tage="Employee Name"
                                            readonly/>
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
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{$t('for_the_month_of')}}</label>
                                        <month-picker :initialMonth="monthOf" @emitMonth="monthOf = $event"/>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card outlined dense class="no_border" color="white">
                                <v-row>
                                    <v-col sm="12" cols="12" class="pt-3">
                                        <kendo-datasource ref="dataSource"
                                            :data="timesheetList"
                                            :change="onChanges"/>
                                        <kendo-grid id="gridTimesheetList" class="grid-function"
                                            :data-source-ref="'dataSource'"
                                            :editable="true"
                                            :scrollable-virtual="true">
                                            <kendo-grid-column
                                                :field="'no'"
                                                :title="$t('no')"
                                                :template="rowNumberTmpl"
                                                :width="60"
                                                :editable="() => {return false;}"
                                                :column-menu="false"
                                                :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                                                :attributes="{style: 'text-align: center'}"/>
                                            <kendo-grid-column
                                                    :field="'date'"
                                                    :title="$t('date')"
                                                    :width="120"
                                                    :template="'<span>#= kendo.toString(new Date(date), `yyyy-MM-dd`)#</span>'"
                                                    :editor="TimesheetDateEditor"
                                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                            <kendo-grid-column
                                                    :field="'checkIn'"
                                                    :title="$t('check_in')"
                                                    :width="120"
                                                    :template="'<span>#= kendo.toString(new Date(checkIn), `HH:mm tt`)#</span>'"
                                                    :editor="TimesheetCheckInEditor"
                                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                            <kendo-grid-column
                                                    :field="'checkOut'"
                                                    :title="$t('check_out')"
                                                    :width="120"
                                                    :template="'<span>#= kendo.toString(new Date(checkOut), `HH:mm tt`)#</span>'"
                                                    :editor="TimesheetcheckOutEditor"
                                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                            <kendo-grid-column
                                                    :field="'hours'"
                                                    :title="$t('hours')"
                                                    :width="100"
                                                    :editable="() => {return false;}"
                                                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                                             <kendo-grid-column
                                                    :field="'overTimeType'"
                                                    :title="$t('over_time')"
                                                    :width="120"
                                                    :template="'<span>#=overTimeType.name#</span>'"
                                                    :editor="overTimeDropDownEditor"
                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                            <kendo-grid-column
                                                    :field="'typeOFWork'"
                                                    :title="$t('type_of_work')"
                                                    :width="200"
                                                    :template="'<span>#=typeOFWork.name#</span>'"
                                                    :editor="typeOfWordDropDownEditor"
                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                            <kendo-grid-column
                                                    :field="'specificWork'"
                                                    :title="$t('specific_work')"
                                                    :width="150"
                                                    :template="'<span>#=specificWork.name ? specificWork.name: ``#</span>'"
                                                    :editor="spesificDropDownEditor"
                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                            <kendo-grid-column
                                                    :field="'engagement_project'"
                                                    :title="$t('engagement_project')"
                                                    :width="240"
                                                    :template="'<span>#=engagement_project.name || ``#</span>'"
                                                    :editor="projectDropDownEditor"
                                                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :width="250"
                                                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                    :width="60"
                                                    :command="{ iconClass: 'k-icon k-i-trash', text: ' ', click: removeRow, class: 'btn-plus' }"
                                                    :title="$t('action')"
                                                    :headerAttributes="{style: 'text-align: center; background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: center'}"/>
                                        </kendo-grid>
                                        <v-btn color="primary"
                                               class="float-left rounded-0 white--text mt-3"
                                               @click="addRow">
                                            <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider/>
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
    import Timesheet from "@/scripts/model/Timesheet";
    import TimesheetLine from "@/scripts/model/TimesheetLine";
    import kendo from "@progress/kendo-ui";
    const timesheetModel = new Timesheet({})
    const timesheetLineModel = new TimesheetLine({})
    const employeeHandler = require("@/scripts/employeeHandler")
    const locationHandler = require("@/scripts/locationHandler")
    const payrollHandler = require("@/scripts/payrollHandler")
    const projectHandler = require("@/scripts/projectHandler")
    const $ = require("jquery")
    const cookieJS = require("@/cookie.js");
    const cookie = cookieJS.getCookie();
    export default {
        name: "AddTimesheet",
        props: ['id'],
        components: {
            LoadingMe: () => import(`@/components/Loading`),
            'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
        },
        data: () => ({
            showLoading: false,
            locationSelected: '',
            location:[],
            name:'',
            monthOf: '',
            timesheet: timesheetModel,
            timesheetLine: timesheetLineModel,
            date: new Date().toISOString().substr(0, 7),
            menu: false,
            modal: false,
            is_month: false,
            specificWork: {
                'name': ''
            },
            timesheetList: [
            ],
            engagement_project:{
                name: ''
            },
            mTypeOFWork: {},
            mSpesificWork: {},
            mProject: {
                name: ''
            },
            period: {
                id:                         '',
                paymentPeriod:              {},
                hourPerDay:                 0,
                overtimeForWeekend:         0,
                overtimeForNationalHoliday: 0,
                dayToPayroll:               0,
                workingDay:                 0,
                overtimeNight:              0,
                nightTime:                  0,
            },
            leaves: [],
            overTimeType:[
                { id: "none", name: "N/A"},
                { id: "weekend", name: "Weekend"},
                { id: "national_holiday", name: "National Holiday"},
                { id: "night", name: "Night"}
            ],
            overTime: {
                overTimeWeekend:           0,
                overTimeNationalHoliday:   0,
                overTimeNight:             0,
                totalOverTime:          0,
                workingHours:           0,
                workingTime:            0,
                totalUnpaid:            0,
            },
            loggedUser: {
                id: cookie.creator,
                name: cookie.email
            },
            project: []
        }),
        methods: {
            TimesheetDateEditor(container, options) {
                kendo.jQuery('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDatePicker()
            },
            TimesheetCheckInEditor(container, options){
                kendo.jQuery('<input id="timeIn" required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoTimePicker()
            },
            TimesheetcheckOutEditor(container, options){
                kendo.jQuery('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoTimePicker()
            },
            onChanges(e){
                let dataRow = e.items[0]
                if (e.field === "typeOFWork") {
                    this.typeofworkclick = e.items[0].typeOFWork
                    this.loadSpecificByType(this.typeofworkclick.id)
                }
                if(e.field === "checkIn"){
                    let cin = dataRow.checkIn
                    let cinM = cin.getTime()
                    this.CIN = cinM
                }
                if(e.field === "checkOut"){
                    let cOut = dataRow.checkOut
                    let cOutM = cOut.getTime()
                    this.COUT = cOutM
                }
                this.hours = parseFloat((this.COUT - this.CIN) / (1000 * 60 * 60));
                if(this.hours){
                    dataRow.set('hours',this.hours)
                }
                this.autoCalculate()
            },
            async loadSpecificByType(id){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getSpecificByType(id).then(res => {
                            if(res.data.statusCode === 200){
                                this.spesificWork = res.data.data
                                if(this.spesificWork.length > 0){
                                    this.mSpesificWork = this.spesificWork[0]
                                }
                            }
                        })
                    }, 300);
                })
            },
            async loadLocation() {
                 new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        locationHandler.list().then(res => {
                            if(res.data.statusCode === 200){
                                this.location = res.data.data
                                if(this.location.length > 0){
                                    this.locationSelected = this.location[0]
                                }
                            }
                        })
                    }, 300);
                })
            },
            async loadProject() {
                 new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        projectHandler.list().then(res => {
                            if(res.data.statusCode === 200){
                                this.project = res.data.data
                                if(this.project.length > 0){
                                    this.mProject  = this.project[0]
                                }
                            }
                        })
                    }, 300);
                })
            },
            rowNumberTmpl(dataItem) {
                var ds = this.$refs.dataSource.kendoWidget(),
                    index = ds.indexOf(dataItem);
                return index + 1;
            },
            addRow() {
                let ds = this.$refs.dataSource.kendoWidget(),
                    total = ds.total();
                ds.insert(total, {
                    date: new Date(),
                    hours: 0,
                    overTimeType: {
                        id: 'none', 
                        name: 'None'
                    },
                    checkIn: new Date(),
                    checkOut: new Date(),
                    typeOFWork: this.mTypeOFWork,
                    specificWork: this.mSpesificWork,
                    engagement_project: {
                        name: ''
                    },
                    description: '',
                });
            },
            removeRow(e) {
                e.preventDefault();
                const grid = kendo.jQuery("#gridTimesheetList").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                }
            },
            async loadTypeOfWork() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getTypeOfWork().then(res => {
                            if(res.statusCode === 200){
                                this.typeOFWork = res.data
                                if(this.typeOFWork.length > 0){
                                    let resultType = this.typeOFWork.filter(word => word.name =="Administration")
                                    this.mTypeOFWork = resultType[0]
                                    window.console.log(this.mTypeOFWork)
                                    this.loadSpecificByType(this.mTypeOFWork.id)
                                    this.initData()
                                }
                            }
                        })
                    }, 300);
                })
            },
            overTimeDropDownEditor(container, options){
                kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 400,
                    dataTextField: "name",
                    dataValueField: "id",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                       data: this.overTimeType,
                    })
                })
            },
            typeOfWordDropDownEditor(container, options) {
                kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 400,
                    dataTextField: "name",
                    dataValueField: "id",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.typeOFWork,
                    })
                })
            },
            spesificDropDownEditor(container, options) {
                kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 400,
                    dataTextField: "name",
                    dataValueField: "id",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                       data: this.spesificWork,
                    })
                })
            },
            projectDropDownEditor(container, options){
                kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    dataTextField: "name",
                    dataValueField: "name",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                       data: this.project,
                    })
                })
            },
            calculateOvertime(){
                let ds = this.$refs.dataSource.kendoWidget()
                let timesheetData = ds.data()
                let leave = {id: ''}
                let timesheet_list = timesheetData.map(item => {
                    leave      = item.specificWork.leave ? item.specificWork.leave: {id: ''}
                    return {
                        date:                 item.date ? item.date: ``,
                        dateFormate:          kendo.toString(new Date(item.date),'yyyy-MM-dd'),
                        hours:                item.hours ? item.hours: 0,
                        checkIn:              item.checkIn ? item.checkIn: ``,
                        checkOut:             item.checkOut ? item.checkOut: '',
                        leaveId:              leave.id ? leave.id: '',
                        overTimeType:         item.overTimeType ? item.overTimeType: {id: 'none', name: 'N/A'},
                        nature:               item.specificWork.nature ? item.specificWork.nature: {},
                        typeOFWork:           item.typeOFWork ? item.typeOFWork: {name: ''},
                        specificWork:         item.specificWork ?item.specificWork: {name: ''},
                        engagement_project:   item.engagement_project ? item.engagement_project: {name: ''},
                        description:          item.description ? item.description: ``
                    }
                });
                
                let overTime_weekend            = 0
                let overTime_national_holiday   = 0
                let overTime_night              = 0
                let working_hours               = 0
                let total_unpaid                = 0
                timesheet_list.forEach(k =>{
                    if(k.overTimeType.id == 'weekend'){
                        overTime_weekend += k.hours
                    }else if(k.overTimeType.id == 'national_holiday'){
                        overTime_national_holiday += k.hours
                    }else if(k.overTimeType.id == 'night'){
                        overTime_night += k.hours
                    }else if(k.overTimeType.id == 'none' &&k.typeOFWork.name !='General' && k.typeOFWork.name != 'National Holiday/ Weekend'){
                        working_hours += k.hours
                    }
                    if(k.nature.id == 'unpaid_hours'){
                        total_unpaid    += k.hours
                    }
                })
                let totalOverTime =            parseFloat(overTime_weekend) + parseFloat(overTime_national_holiday) + parseFloat(overTime_night);
                this.overTime = {
                    overTimeWeekend:            parseFloat(overTime_weekend),
                    overTimeNationalHoliday:    parseFloat(overTime_national_holiday),
                    overTimeNight:              parseFloat(overTime_night),
                    totalOverTime:              totalOverTime,
                    totalUnpaid:                parseFloat(total_unpaid),
                    workingHours:               parseFloat(working_hours),
                    totalWorkinghours:          parseFloat(working_hours) + parseFloat(totalOverTime),
                    defaultWorkingHours:        parseFloat(this.period.hourPerDay) * parseFloat(this.period.workingDay),
                }
                window.console.log('overTime',this.overTime)
            },
            onSaveClose(){
                this.calculateOvertime()
                this.showLoading = true
                let ds = this.$refs.dataSource.kendoWidget()
                let timesheetData = ds.data()
                let leave = {id: ''}
                let timesheet_list = timesheetData.map(item => {
                    leave      = item.specificWork.leave ? item.specificWork.leave: {id: ''}
                    return {                 
                        date:                 item.date ? item.date: ``,
                        dateFormate:          kendo.toString(new Date(item.date),'yyyy-MM-dd'),
                        hours:                item.hours ? item.hours: 0,
                        checkIn:              item.checkIn ? item.checkIn: ``,
                        checkOut:             item.checkOut ? item.checkOut: '',
                        leaveId:              leave.id ? leave.id: '',
                        typeOFWork:           item.typeOFWork ? item.typeOFWork: {name: ''},
                        specificWork:         item.specificWork ?item.specificWork: {name: ''},
                        overTimeType:         item.overTimeType ? item.overTimeType: {id: 'none', name: 'N/A'},
                        engagement_project:   item.engagement_project ? item.engagement_project: {name: ''},
                        description:          item.description ? item.description: ``
                    }
                });
                let helper = {};
                let results = timesheet_list.reduce(function(r, o) {
                let key = o.dateFormate + o.leaveId; 
                if(!helper[key]) {
                    helper[key] = Object.assign({}, o); // create a copy of o
                    r.push(helper[key]);
                } else {
                    helper[key].hours             += o.hours;
                }
                return r;
                }, []);
                let results_timesheet = []
                let leaves = this.leaves
                results.forEach(index=>{
                    let leave  = leaves.filter(i=>i.id === index.leaveId)
                    window.console.log(1,index)
                    results_timesheet.push({
                        specificWork:       index.specificWork,
                        hours:              index.hours,
                        typeOFWork:         index.typeOFWork,
                        dateFormate:        index.dateFormate,
                        employeeUuid:       index.employeeUuid,
                        leaveId:            index.leaveId,
                        description:        index.description,
                        leave:              leave[0] || {},
                        engagement_project: index.engagement_project || {},
                        type:               index.type

                    })
                })

                if(timesheet_list.length > 0){
                    let totalHN                  = this.totaleHoursByNature;
                    this.paid_hours              = totalHN.paid_hours? totalHN.paid_hours: 0;
                    this.unpaid_hours            = totalHN.unpaid_hours? totalHN.unpaid_hours: 0;
                    this.overtime_hours_weekend  = totalHN.overtime_hours_weekend? totalHN.overtime_hours_weekend:0;
                    this.overtime_hours_holiday  = totalHN.overtime_hours_holiday? totalHN.overtime_hours_holiday: 0;
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve('resolved');
                            let data = {
                                id:                       this.timesheet.id || '',
                                employee:                   {
                                    id:                     this.employee.id,
                                    employeeId:             this.employee.employeeId,
                                    lastName:               this.employee.lastName,
                                    firstName:              this.employee.firstName,
                                    gender:                 this.employee.gender,
                                    bank:                   {
                                        id:                 this.employee.bank.id,
                                        bankName:           this.employee.bank.bankName,
                                        uuid:               this.employee.bank.uuid,
                                    },
                                    spouseGender:           this.employee.spouseGender,
                                    natureEmployee:         this.employee.natureEmployee,
                                    noOfChildren:           this.employee.noOfChildren,
                                    bankAccount:            this.employee.bankAccount,
                                    paymentMethod:          this.employee.paymentMethod,
                                    spouseNatureEmployee:   this.employee.spouseNatureEmployee,
                                    payrollLiabilitie:      {
                                        uuid:               this.employee.payrollLiabilitie.uuid,
                                        local_name:         this.employee.payrollLiabilitie.local_name,
                                        type_code:          this.employee.payrollLiabilitie.type_code,
                                        name:               this.employee.payrollLiabilitie.name,
                                        number:             this.employee.payrollLiabilitie.number
                                    },
                                    salaryAcc:              {
                                        uuid:               this.employee.payrollLiabilitie.uuid,
                                        local_name:         this.employee.payrollLiabilitie.local_name,
                                        type_code:          this.employee.payrollLiabilitie.type_code,
                                        name:               this.employee.payrollLiabilitie.name,
                                        number:             this.employee.payrollLiabilitie.number
                                    }
                                },
                                monthOf:                  kendo.toString(new Date(this.monthOf),'yyyy-MM-dd'),
                                location:                 this.locationSelected,
                                timeSheetRecord:          timesheet_list,
                                results_timesheet:        results_timesheet,
                                totalHours:               this.totalHours,
                                totalHoursBytype:         this.totaleHoursByNature,
                                paidHours:                this.paid_hours,
                                unpaidHours:              this.unpaid_hours,
                                period:                   this.period,
                                overTime:                 this.overTime,
                                overtimeHoursWeekend:     this.overTime.overTimeWeekend,
                                overtimeHoursHoliday:     this.overTime.overTimeNationalHoliday,
                                overTimeNight:            this.overTime.overTimeNight,
                                totalOverTime:            this.overTime.totalOverTime,
                                totalUnpaid:              this.overTime.totalUnpaid,
                                totalWorkinghours:        this.overTime.totalWorkinghours,
                                defaultWorkingHours:      this.overTime.defaultWorkingHours,
                                loggedUser:               this.loggedUser
                            }
                            window.console.log(1,data)
                            this.showLoading = true
                            employeeHandler.createTimesheet(data).then(response => {
                                this.showLoading = true
                                if (response.data.statusCode === 201) {
                                    this.$snotify.success('Success')
                                    this.cancel()
                                    this.showLoading = false
                                }
                            }).catch(e => {
                                this.$snotify.error('Something went wrong')
                                this.errors.push(e)
                            })
                        }, 300);
                    })
                }else {
                    this.$snotify.error('Data not found')
                }
            },
            cancel(){
                this.timesheetList = ''
                this.monthOf = kendo.toString(new Date(),'yyyy-MM-dd')
                this.close()
            },
            close(){
                window.history.go(-1)
            },
            async initData() {
                if (this.$route.params.timesheet_id !== undefined) {
                    await this.loadTimesheetSingle()
                }else {
                    let ds = this.$refs.dataSource.kendoWidget()
                    ds.data([])
                    this.addRow()
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
                                this.employee = res.data.data[0]
                                if(this.employee){
                                    this.showLoading = false
                                    this.name = this.employee.employeeId +'-'+this.employee.firstName + ' ' + this.employee.lastName 
                                    let month_of = this.monthOf ? this.monthOf: new Date() 
                                    this.monthOf = kendo.toString(new Date(month_of),'yyyy-MM')
                                    this.showLoading = false   
                                }
                                this.loadTypeOfWork()
                            }
                        })
                    }, 300);
                })
            },
            loadTimesheetSingle(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true
                        employeeHandler.getTimesheetSingle(this.$route.params.timesheet_id).then(res => {
                            this.showLoading = true
                            this.timesheetDS = res.data[0]
                            if(this.timesheetDS){
                                this.timesheet       = this.timesheetDS
                                this.locationSelected    = this.timesheetDS.location 
                                this.monthOf = this.timesheetDS.monthOf
                                this.timesheetList = this.timesheetDS.timeSheetRecord
                            } 
                            let month_of = this.monthOf ? this.monthOf: new Date() 
                            this.monthOf = kendo.toString(new Date(month_of),'yyyy-MM')
                            this.showLoading = false             
                        })
                    }, 300);
                })
            },
            autoCalculate() {
                let ds = this.$refs.dataSource.kendoWidget(),
                    specificWorks = [],
                    totalHours = 0;
                    ds.data().forEach(value => {
                        totalHours += kendo.parseFloat(value.hours)
                        if(value.specificWork){
                            if (value.specificWork.hasOwnProperty('id')) {
                                specificWorks.push({
                                    name: value.specificWork.nature.id,
                                    hour: value.hours,
                                    id: value.typeOFWork.id
                                })

                            }
                        }
                    })
                    this.totalHours  = totalHours
                    this.autoCalculateSpicificWork(specificWorks)
            },
            autoCalculateSpicificWork(works) {
            // return by a key
                const groupAll = list => list.reduce((works, item) => {
                    const totalHours = works[item.name] || 0
                    return Object.assign({}, works, {[item.name]: totalHours + parseFloat(item.hour)})
                }, {})
                this.totaleHoursByNature = groupAll(works)
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
        },
        mounted: async function () {
            await this.loadLocation()
            await this.loadSingleEmployee()
            await this.loadProject()
            await this.loadPeriod()
            await this.loadLeave()
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