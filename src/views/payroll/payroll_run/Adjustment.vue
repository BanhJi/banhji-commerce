<template>
    <v-row>
        <v-col cols="12" class="pt-0">
            <v-row>
                <v-col sm="4" cols="12">
                    <h3>{{$t('payroll_adjustment')}}</h3>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <kendo-datasource ref="dataSourceAdjus"
                :data="adjustmentList"
                :change="onChanges"/>
                <kendo-grid id="gridAdjus" class="grid-function"
                    :data-source-ref="'dataSourceAdjus'"
                    :editable="true"
                    :scrollable-virtual="true">
                <kendo-grid-column
                    :field="'no'"
                    :title="$t('no')"
                    :template="rowNumberTmpl"
                    :width="80"
                    :column-menu="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                    :attributes="{style: 'text-align: center'}"/>
                <kendo-grid-column
                    :field="'employee'"
                    :width="250"
                    :title="$t('employee_name')"
                    :template="'<span>#= employee.name#</span>'"
                    :editor="employeeDropDownEditor"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :field="'payrollComponent'"
                    :width="220"
                    :title="$t('payroll_component')"
                    :template="'<span>#= payrollComponent.name#</span>'"
                    :editor="payrollComponentDropDownEditor"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <!-- <kendo-grid-column
                    :field="'segment'"
                    :title="$t('segment')"
                    :width="150"
                    :template="'<span>#=segment.name#</span>'"
                    :editor="segmentDropDownEditor"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/> -->
                <kendo-grid-column
                    :field="'currency'"
                    :title="$t('currency')"
                    :width="200"
                    :editable="() => {return false;}"
                    :template="'<span>#=currency.code# - #=currency.name#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'amount'"
                    :title="$t('amount')"
                    :template="'<span>#= kendo.toString(amount,`n2`)#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{
                        style: 'text-align: right;'
                    }"/>
                 <kendo-grid-column
                    :width="100"
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
        <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"  type="loading"/>
    </v-row>
</template>
<script>
    import kendo from "@progress/kendo-ui"
    import PayrollList from "@/scripts/model/PayrollList"
    import PayrollRun from "@/scripts/model/PayrollRun";
    import Adjustment from "@/scripts/model/Adjustment"
    const settingsHandler = require("@/scripts/settingsHandler")
    const payrollHandler = require("@/scripts/payrollHandler")
    const employeeHandler = require("@/scripts/employeeHandler")
    const payrollListModel = new PayrollList({})
    const adjustmentModel = new Adjustment({})
    const $ = require("jquery")
    const cookieJS = require("@/cookie.js");
    const cookie = cookieJS.getCookie();

    export default {
        props:['propAdjustment'],
        data: () =>({
            journal_date: "",
            dialogm: false,
            pyrollList: [],
            showLoading: false,
            payrollList: payrollListModel,
            adjustment: adjustmentModel,
            adjustmentList: [],
            segments: [],
            loggedUser: {
                id: cookie.creator,
                name: cookie.email
            },
            record: {}
        }),
        components: {
            LoadingMe: () => import(`@/components/Loading`)
        },
        methods:{
            loadPayrollList(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true;
                        payrollHandler.getPayroll(this.$route.params.id).then(res => {
                            this.showLoading = true;
                            if(res.data.statusCode === 200){
                                const resultPay = res.data.data[0]
                                if(resultPay.step >= 2){
                                    this.loadPayrollItem(resultPay)
                                }
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
                                this.showLoading = false
                                this.loadPayrolls = resutl_item
                                this.payrolls   = result
                                if(result.adjustment.length > 0){
                                    this.adjustmentList = result.adjustment
                                }else{
                                    let ds = this.$refs.dataSourceAdjus.kendoWidget();
                                    this.adjustmentList = ds.data([])
                                    this.addRow()
                                    this.calculateAdjust()
                                }
                                this.loadSuccess(res.data.statusCode)
                                this.showLoading = false;
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            async loadSegment() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        this.segments = []
                        settingsHandler.getSeg().then(res => {
                            this.showLoading = true
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.segments = res.data.data
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            rowNumberTmpl(dataItem) {
                var ds = this.$refs.dataSourceAdjus.kendoWidget(),
                    index = ds.indexOf(dataItem);
                return index + 1;
            },
            addRow() {
                let ds = this.$refs.dataSourceAdjus.kendoWidget(),
                    total = ds.total();
                ds.insert(total,{
                    payrollComponent: {
                        name: '-- Select --',
                    },
                    employee: {
                        name: '-- Select --',
                    },
                    amount: 0,
                    segment: {
                        name: '-- Select --',
                    },
                    currency:  {
                        code: '',
                        name: '- Select --'
                    }
                });
            },
            removeRow(e) {
                e.preventDefault();
                const grid = kendo.jQuery("#gridAdjus").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                }
            },
            onChanges(e){
                this.loadEmployee()   
                this.loadPayrollComponent() 
                this.loadSegment() 
                if (e.field === "employee") {
                    let dataItem = e.items[0]
                    let params = {
                        status: 1,
                        employeeId: dataItem.employee.employeeId
                    }
                   this.loadRecord(params, dataItem)
                }   
            },
            employeeDropDownEditor(container, options){
                kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "name",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.employee,
                    })
                })
            },
            payrollComponentDropDownEditor(container, options){
                kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "name",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.payrollComponent,
                    })
                })
            },
            segmentDropDownEditor(container, options){
                kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 400,
                    dataTextField: "name",
                    dataValueField: "name",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.segments,
                    })
                })
            },
            async loadEmployee(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        this.employee = []
                        employeeHandler.center().then(res => {
                            this.showLoading = true
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.employee = res.data.data
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            async loadPayrollComponent(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        this.payrollComponent = []
                        payrollHandler.getComponent().then(res => {
                            this.showLoading = true
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                const types = ['deduction','benefit','gross_salary']
                                this.payrollComponent =  res.data.data.filter(m => {
                                    const exist = types.filter(n=> n === m.compoType.id)
                                        if(exist.length > 0){
                                            return m
                                        }
                                    }
                                )
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            calculateAdjust(){
                let payrollList = this.loadPayrolls;
                for (const pa of payrollList){
                    if(pa.benefit){
                        pa.benefit.forEach(i=>{
                            if(i.amount > 0){
                                this.adjustmentList.push({
                                    employee:                   {
                                        // address:                pa.employee.address,
                                        // bank:                   pa.employee.bank,
                                        // bankAccount:            pa.employee.bankAccount,
                                        // country:                pa.employee.country,
                                        // dob:                    pa.employee.dob,
                                        // email:                  pa.employee.email,
                                        employeeId:             pa.employee.employeeId,
                                        // employeeType:           pa.employee.employeeType,
                                        // firstName:              pa.employee.firstName,
                                        // firstNameLocale:        pa.employee.firstNameLocale,
                                        // gender:                 pa.employee.gender,
                                        id:                     pa.employee.id,
                                        // identityId:             pa.employee.identityId,
                                        // identityType:           pa.employee.identityType,
                                        // image:                  pa.employee.image,
                                        // lastName:               pa.employee.lastName,
                                        // lastNameLocale:         pa.employee.lastNameLocale,
                                        // maritalStatus:          pa.employee.maritalStatus,
                                        // nationality:            pa.employee.nationality,
                                        // natureEmployee:         pa.employee.natureEmployee,
                                        // noOfChildren:           pa.employee.noOfChildren,
                                        // paymentMethod:          pa.employee.paymentMethod,
                                        // paymentPeriod:          pa.employee.paymentPeriod,
                                        // payrollLiabilitie:      pa.employee.payrollLiabilitie,
                                        // phone:                  pa.employee.phone,
                                        // salaryAcc:              pa.employee.salaryAcc,
                                        // salaryAdvanceAcc:       pa.employee.salaryAdvanceAcc,
                                        // spouseGender:           pa.employee.spouseGender,
                                        // spouseName:             pa.employee.spouseName,
                                        // spouseNatureEmployee:   pa.employee.spouseNatureEmployee,
                                        // status:                 pa.employee.status,
                                        // workingStatus:          pa.employee.workingStatus,
                                        name:                   pa.employee.employeeId + ' - ' +  pa.employee.firstName +' '+ pa.employee.lastName,
                                    },
                                    payrollComponent:           i.component ? i.component: {},
                                    currency:                   pa.currency || {},
                                    amount:                     i.amount ? i.amount: 0,
                                    // segment:                    i.segment ? i.segment: {}
                                })
                            }
                        })
                    }
                }
            },
            saveAdjust(){
                let ds = this.$refs.dataSourceAdjus.kendoWidget();
                let ds1 = ds.data()
                let dataSource = ds1.map(index=>{
                    return {
                        amount:             index.amount,
                        employee:           index.employee,
                        payrollComponent:   index.payrollComponent,
                        currency:           index.currency
                        // segment:            index.segment,
                    }
                })
                let payrollList = this.loadPayrolls;
                let helper = {};
                let result = dataSource.reduce(function(index, value) {
                    if(value.employee.id){
                        let key = value.payrollComponent.compoType.name +'-'+value.employee.employeeId ;
                        if(!helper[key]) {
                            helper[key] = Object.assign({}, value); // create a copy of o
                            index.push(helper[key]);
                        } else {
                            helper[key].amount += parseFloat(value.amount);
                            helper[key].conponentType = value.payrollComponent.compoType.name;
                        }
                    }
                    return index
                }, []);
                let payList = [];
                for (const pa of payrollList){
                    let benefit = 0
                    let deduction2 = 0;
                    let salaryAdd = 0;
                    result.forEach(function(r){
                        if(r.payrollComponent.name === "Deduction" && r.employee.id == pa.employeeUuid){
                            deduction2 = parseFloat(r.amount);
                        }else if(r.payrollComponent.name === "Benefits" && r.employee.id == pa.employeeUuid){
                           benefit = parseFloat(r.amount)
                        }else if(r.payrollComponent.compoType.id === "gross_salary" && r.employee.id == pa.employeeUuid){
                            salaryAdd = parseFloat(r.amount)
                        }
                    })
                    payList.push( new PayrollList({
                        employeeUuid:               pa.employeeUuid,
                        deduction:                  0,
                        deduction2:                 deduction2,
                        bank:                       pa.bank, 
                        currency:                   pa.currency ? pa.currency: {},
                        totalBenefit:               benefit,
                        employeeName:               pa.employeeName,
                        employeeId:                 pa.employeeId,
                        gender:                     pa.gender,
                        natureEmployee:             pa.natureEmployee,
                        natureContract:             pa.natureContract,
                        paymentMethod:              pa.paymentMethod,
                        payrollLiabilitie:          pa.payrollLiabilitie,
                        location:                   pa.location,
                        overTimeHoliday:            pa.overTimeHoliday,
                        overTimeWeekend:            pa.overTimeWeekend,
                        overTimeNight:              pa.overTimeNight,
                        paidHours:                  pa.paidHours,
                        position:                   pa.position,
                        segment:                    pa.segment,
                        salary:                     parseFloat(pa.salary1) + salaryAdd,
                        salary1:                    pa.salary1,
                        salary2:                    parseFloat(pa.salary1) + salaryAdd,
                        salaryType:                 pa.salaryType,
                        workDay:                    pa.workDay,
                        workTime:                   pa.workTime, 
                        spouseNatureEmployee:       pa.spouseNatureEmployee,
                        workingStatus:              pa.workingStatus,
                        spouseGender:               pa.spouseGender,
                        noOfChildren:               pa.noOfChildren
                    }))
                }
                this.payList = payList
                let payrolls = this.payrolls
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve('resolved');
                        let data = new PayrollRun({
                            id:                   this.$route.params.id,
                            monthOf:              payrolls.monthOf,
                            date:                 payrolls.date,
                            created:              payrolls.created,
                            totalEmployee:        payrolls.totalEmployee,
                            number:               payrolls.number,
                            lastNumber:           payrolls.lastNumber,
                            abbr:                 payrolls.abbr,
                            referenceNumber:      payrolls.referenceNumber,
                            payNumber:            payrolls.payNumber,
                            type:                 payrolls.type,
                            currency:             payrolls.currency,
                            exchangeRate:         payrolls.exchangeRate,
                            location:             payrolls.location,
                            adjustment:           dataSource,
                            payrollList:          this.payList,
                            payrollList1:         payrolls.payrollList1,
                            payrollList2:         this.payList,
                            step:                 3,
                            department:           payrolls.department || '',
                            natureContract:       payrolls.natureContract || '',
                            employeeGroup:        payrolls.employeeGroup || '',
                            loggedUser:           this.loggedUser
                        });
                        this.showLoading = true
                        payrollHandler.createPayroll(data).then(response => {
                            this.showLoading = true
                            if (response.data.statusCode === 201) {
                                this.showLoading = false
                                this.$snotify.success('Success')
                                this.loadSuccess(response.data.statusCode)
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }, 300);
                })
            },
            loadSuccess(data){
                this.$emit('headline',data)
            },
            async goBack(){
                window.history.go(-1)
            },
            loadRecord(params, dataItem){
                 new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true
                        employeeHandler.getRecord(params).then(res => {
                            if(res.data.statusCode == 200){
                                this.showLoading = false
                                let result = res.data.data
                                if(result.length > 0){
                                    this.record = res.data.data[0].currency
                                    dataItem.set('currency', this.record)
                                }
                            }
                        })

                    }, 300);
                })
            }
        },
        mounted: async function (){
            await this.addRow()
            await this.loadPayrollList()
            await this.loadSegment()
        },
        watch: {
            propAdjustment(){
                if (this.propAdjustment !== undefined) {
                    this.loadPayrollList()
                }
            }
        },
        computed:{
    
        }
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