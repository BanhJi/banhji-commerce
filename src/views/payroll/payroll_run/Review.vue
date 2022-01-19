<template>
    <v-row>
        <v-col cols="12" class="pt-0">
            <v-row>
                <v-col sm="4" cols="12" class="pb-0">
                    <h3>{{$t('review_payroll')}}</h3>
                    <p>{{$t('review_payroll_desc')}}</p>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <kendo-datasource ref="dataSourceReview"
                :data="payrollList"
                :sort="sort"/>
                <kendo-grid id="grid" class="grid-function"
                    :data-source-ref="'dataSourceReview'"
                    :scrollable-virtual="true"
                    :column-menu="true">
                <!-- <kendo-grid-column
                    :field="'no'"
                    :title="$t('no')"
                    :template="rowNumberTmpl"
                    :width="60"
                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                    :attributes="{style: 'text-align: center'}"/> -->
                <kendo-grid-column
                    :field="'employeeId'"
                    :title="$t('employee_id')"
                    :width="150"
                    :template="'<span>#= employeeId#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :width="200"
                    :field="'employeeName'"
                    :title="$t('employee_name')"
                    :template="'<span>#= employeeName#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :width="150"
                    :field="'salary'"
                    :title="$t('earnings')"
                    :template="'<span>#= kendo.toString(salary,`c2`)#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="150"
                    :field="'deduction'"
                    :title="$t('deduction')"
                    :template="'<span>#= kendo.toString(deduction || 0,`c2`)#</span>'"
                    :hidden="true"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="120"
                    :field="'totalBenefit'"
                    :title="$t('benefit')"
                    :hidden="false"
                    :template="'<span>#= kendo.toString(totalBenefit,`c2`)#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right;'}"/>
                <kendo-grid-column
                    :width="120"
                    :field="'benefitExchange'"
                    :title="$t('benefit_exchange')"
                    :hidden="true"
                    :template="'<span>#= kendo.toString(benefitExchange,`n2`)#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right;'}"/>
                <kendo-grid-column
                    :width="150"
                    :field="'taxBenefitExchange'"
                    :title="$t('tax_benefit_exchange')"
                    :hidden="true"
                    :template="'<span>#= kendo.toString(taxBenefitExchange,`n2`)#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="150"
                    :field="'taxBenefit'"
                    :title="$t('tax_benefit')"
                    :hidden="true"
                    :template="'<span>#= kendo.toString(taxBenefit,`c2`)#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="250"
                    :field="'salaryExchange'"
                    :title="$t('salary_to_be_paid_KHR')"
                    :template="'<span>#= kendo.toString(salaryExchange,`n`)#</span>'"
                    :format="'{0:n}'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="150"
                    :field="'deductionExchange'"
                    :title="$t('deductionExchange')"
                    :template="'<span>#= kendo.toString(deductionExchange,`n2`)#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="250"
                    :field="'salaryBase'"
                    :title="$t('salaryBase')"
                    :template="'<span>#= kendo.toString(salaryBase,`n2`)#</span>'"
                    :format="'{0:n}'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="100"
                    :field="'taxRate'"
                    :title="$t('rate')"
                    :template="'<span>#= kendo.toString((taxRate/100),`p0`)#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="200"
                    :field="'taxRateKHM'"
                    :title="$t('tax_on_salary_KHR')"
                    :template="'<span>#= kendo.toString(taxRateKHM,`n2`)#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="200"
                    :field="'taxSalaryUS'"
                    :hidden="true"
                    :title="$t('tax_on_Salary_USD')"
                    :template="'<span>#= kendo.toString(taxSalaryUS,`c2`) #</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="100"
                    :field="'netSalary'"
                    :title="$t('net_salary')"
                    :template="'<span>#= kendo.toString(netSalary,`c2`)#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="150"
                    :field="'natureEmployee'"
                    :title="$t('nature_employee')"
                    :hidden="true"
                    :template="'<span>#= natureEmployee#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :width="300"
                    :field="'bank'"
                    :title="$t('bank_name')"
                    :template="'<span>#= bank.bankName ? bank.bankName: ``#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :width="150"
                    :field="'bank'"
                    :title="$t('bank_account')"
                    :template="'<span>#= bank.bankAccount ? bank.bankAccount: ``#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :width="250"
                    :field="'payrollLiabilitie'"
                    :title="$t('payroll_liabilitie')"
                    :hidden="true"
                    :template="'<span>#= payrollLiabilitie.number# - #= payrollLiabilitie.name#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :width="200"
                    :field="'paymentMethod'"
                    :title="$t('payment_method')"
                    :template="'<span>#= paymentMethod#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
            </kendo-grid>
            <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"  type="loading"/>
        </v-col>
    </v-row>
</template>
<script>
const payrollHandler = require("@/scripts/payrollHandler")
import PayrollList from "@/scripts/model/PayrollList"
import PayrollRun from "@/scripts/model/PayrollRun";
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
export default {
    props:['propReview'],
    data: () =>({
        journal_date: "",
        dialogm: false,
        showLoading: false,
        payrollList: [],
        payrollTax: [],
        payrolls: [],
        loggedUser: {
            id: cookie.creator,
            name: cookie.email
        },
        sort:[
            { field: 'employeeId', dir: 'asc' }
        ],
    }),
    components: {
        LoadingMe: () => import(`@/components/Loading`)
        // 'app-datepicker': DatePickerComponent,
    },
    methods:{
        rowNumberTmpl(dataItem) {
            var ds = this.$refs.dataSourceReview.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        async loadPayrollList(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true;
                    payrollHandler.getPayroll(this.$route.params.id).then(res => {
                        this.showLoading = true;
                        if(res.data.statusCode === 200){
                            this.showLoading = true;
                            const resultPay = res.data.data[0]
                            this.loadPayrollItem(resultPay)
                            this.payroll = resultPay
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
                            this.showLoading = true
                            this.payrolls = resutl_item
                            this.loadTaxSalary()
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        loadTaxSalary(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true;
                    payrollHandler.getTax().then(res => {
                        window.console.log('loadTaxSalary',res)
                        this.showLoading = true;
                        if(res.data.statusCode === 200){
                            this.showLoading = true;
                            this.payrollTax = res.data.data
                            this.qurytaxPay()
                        }
                    })
                }, 300);
            })
        },
        qurytaxPay(){
            let baseCurrency = this.payroll.currency
            let dataSource          = this.payrolls
            let exchangeRate        = this.payroll.exchangeRate
            let tax                 = this.payrollTax;
            let resultTax           = tax.filter(t => t.nature.id === 'Resident_Salary');
            let TaxNoResident       = tax.filter(t => t.nature.id === 'Non_resident_Salary');
            let taxBenefit          = tax.filter(t => t.nature.id === 'Fringe_Benefit');
            let rate_Benefit        = taxBenefit[0].rate
            let benefit_account     = taxBenefit[0].account
            let dependency = tax.filter(t => t.nature.id === 'Dependency');
            let payrollsAR = [];
            let exchange            = parseFloat(exchangeRate.rate);
            
            dataSource.forEach(function(tc) {
                let deduction    = 0;
                let spouseAmount = 0
                let minorChildrenAmount = 0;
                let salaryExchange      = 0;
                let salaryBase          = 0;
                let rateBenefit         = 0;
                let grossSalary         = 0;
                let totalBenefit        = 0;
                let currencyKHM         = "";
                let result              =  0;
                let taxRate             =  0;
                let taxAmount           =  0;
                let taxSalary           = 0;
                let taxSalaryUS         = 0;
                let netSalary           = 0;
                let netPay              = 0;
                let dependencyAmount    = 0;
                let deductionExchange   = 0;
                let deductionAmount     = 0;
                let benefitExchange     = 0;
                let taxBenefitExchange  = 0;
                let netPayExchange      = 0;
                let benefitAccount      = {};
                let spouse              = 0;
                let exchange_rate       = 1
                if(baseCurrency.code !== tc.currency.code){
                    exchange_rate = 1
                }else{
                    exchange_rate = exchange
                }
                if(tc.natureEmployee == 'Resident'){
                    dependencyAmount = dependency[0].amount
                    if(tc.spouseNatureEmployee ==='Resident' && tc.workingStatus !=='Working' && tc.spouseGender ==='Female'){
                        spouseAmount        = parseFloat(dependencyAmount)
                        spouse              = 1
                    }
                    minorChildrenAmount     = parseFloat(tc.noOfChildren) * parseFloat(dependencyAmount)
                    salaryExchange          = (tc.salary2) / exchange_rate;
                    deductionAmount         = tc.deduction2 / exchange_rate;
                    deductionExchange       = deductionAmount + spouseAmount + minorChildrenAmount
                    deduction               = deductionExchange * exchange_rate
                    salaryBase              = salaryExchange - deductionExchange 
                    rateBenefit             = rate_Benefit
                    benefitAccount          = benefit_account
                    grossSalary             = tc.salary2
                    benefitExchange         = tc.totalBenefit  / exchange_rate
                    taxBenefitExchange      = (benefitExchange * rateBenefit)/100
                    taxBenefit              = (taxBenefitExchange * exchange_rate)
                    totalBenefit            = tc.totalBenefit
                    currencyKHM             = "km-KH"
                    result                  =  resultTax[0].rate.filter(r => r.from <= salaryBase && (r.to > salaryBase || r.to =="UP TO"))
                    if(result.length > 0){
                        taxRate             =  parseFloat(result[0].taxRate)
                        taxAmount           =  parseFloat(result[0].amount)
                    }
                    taxSalary           = (salaryBase * taxRate)/100 - taxAmount
                    taxSalaryUS         = taxSalary * exchange_rate
                    netSalary           = ((salaryExchange - taxSalary) * exchange_rate) + totalBenefit - taxBenefit
                    netPay              = ((salaryExchange - taxSalary) * exchange_rate) + totalBenefit - taxBenefit
                    netPayExchange      = netPay / exchange_rate
                }else{
                    salaryExchange      = tc.salary2 / exchange_rate;
                    deduction           = tc.deduction2
                    deductionExchange   = tc.deduction2 / exchange_rate;
                    salaryBase          = salaryExchange - deductionExchange
                    rateBenefit         = rate_Benefit
                    benefitAccount      = benefit_account
                    grossSalary         = tc.salary2
                    benefitExchange     = tc.totalBenefit  * exchange_rate
                    taxBenefitExchange  = (benefitExchange * rateBenefit)/100
                    taxBenefit          = (taxBenefitExchange / exchange_rate)
                    totalBenefit        = tc.totalBenefit
                    currencyKHM         = "km-KH";
                    result              =  TaxNoResident[0]
                    taxRate             =  parseFloat(result.rate)
                    taxSalary           = (salaryBase * taxRate)/100
                    taxSalaryUS         = taxSalary * exchange_rate
                    netSalary           = ((salaryExchange - taxSalary) * exchange_rate) + totalBenefit - taxBenefit
                    netPay              = ((salaryExchange - taxSalary) * exchange_rate) + totalBenefit - taxBenefit
                    netPayExchange      = netPay * exchange_rate
                    
                }
                payrollsAR.push(new PayrollList({
                    taxSalary:                  taxSalary,
                    taxRate:                    taxRate,
                    spouse:                     spouse,
                    spouseAmount:               spouseAmount,
                    minorChildrenAmount:        minorChildrenAmount,
                    bank:                       tc.bank,
                    deduction:                  deduction,
                    deduction2:                 tc.deduction2,
                    deductionExchange:          deductionExchange,
                    exchangeRate:               exchangeRate,
                    salaryBase:                 salaryBase,
                    employeeId:                 tc.employeeId,
                    employeeName:               tc.employeeName,
                    employeeUuid:               tc.employeeUuid,
                    gender:                     tc.gender,
                    natureEmployee:             tc.natureEmployee,
                    natureContract:             tc.natureContract,
                    payrollLiabilitie:          tc.payrollLiabilitie,
                    paymentMethod:              tc.paymentMethod,
                    overTimeHoliday:            tc.overTimeHoliday,
                    overTimeWeekend:            tc.overTimeWeekend,
                    position:                   tc.position,
                    salary:                     tc.salary,
                    salary1:                    tc.salary1,
                    salary2:                    tc.salary2,
                    currency:                   tc.currency,
                    segment:                    tc.segment,
                    salaryType:                 tc.salaryType,
                    startingTime:               tc.startingTime,
                    spouseNatureEmployee:       tc.spouseNatureEmployee,
                    workingStatus:              tc.workingStatus,
                    spouseGender:               tc.spouseGender,
                    noOfChildren:               tc.noOfChildren,
                    benefitExchange:            benefitExchange,
                    totalBenefit:               totalBenefit,
                    taxBenefitExchange:         taxBenefitExchange,
                    netPayExchange:             netPayExchange,
                    taxBenefit:                 taxBenefit,
                    benefitAccount:             benefitAccount,
                    workDay:                    tc.workDay,
                    workTime:                   tc.workTime,
                    location:                   tc.location,
                    salaryExchange:             salaryExchange,
                    currencyKHM:                currencyKHM,
                    netPay:                     netPay,
                    netSalary:                  netSalary,
                    taxRateKHM:                 taxSalary,
                    taxSalaryUS:                taxSalaryUS,
                    grossSalary:                grossSalary
                }))
            })
            if(payrollsAR.length > 0){
                this.payrollList = payrollsAR
                this.showLoading = false;
            }
            this.showLoading = false;
        },
        autoCalculate() {
            let ds              = this.$refs.dataSourceReview.kendoWidget(),
            totalTaxPaymentKHM  = 0,
            totalNetSalary      = 0,
            totalBenefits       = 0,
            totalTaxBenefit     = 0,
            totalDeduction      = 0,
            totalTaxPaymentUS   = 0,
            totalEmployee       = 0,
            totalGross          = 0,
            totalNetPay         = 0
            ds.data().forEach(value => {
                totalEmployee       += 1
                totalTaxPaymentKHM  += parseFloat(value.taxSalary)
                totalNetPay         += parseFloat(value.netPay)
                totalNetSalary      += parseFloat(value.netSalary)
                totalBenefits       += parseFloat(value.totalBenefit)
                totalDeduction      += parseFloat(value.deduction)
                totalTaxPaymentUS   += parseFloat(value.taxSalaryUS)
                totalGross          += parseFloat(value.grossSalary)
                totalTaxBenefit     += parseFloat(value.taxBenefit)
            })
            this.totalEmployee          = parseFloat(totalEmployee.toFixed(2));
            this.totalNetPay            = parseFloat(totalNetPay.toFixed(2));
            this.totalTaxPaymentKHM     = parseFloat(totalTaxPaymentKHM.toFixed(2));
            this.totalNetSalary         = parseFloat(totalNetSalary.toFixed(2));
            this.totalBenefits          = parseFloat(totalBenefits.toFixed(2));
            this.totalTaxBenefit        = parseFloat(totalTaxBenefit.toFixed(2));
            this.totalDeduction         = parseFloat(totalDeduction.toFixed(2));
            this.totalTaxPaymentUS      = parseFloat(totalTaxPaymentUS.toFixed(2));
            this.totalGross             = parseFloat(totalGross.toFixed(2));
        },
        saveReview(){
            this.autoCalculate()
            let payList  = this.payrollList
            let payrolls = this.payroll
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = new PayrollRun({
                        id:                   this.$route.params.id,
                        totalEmployee:        payrolls.totalEmployee,
                        monthOf:              payrolls.monthOf, 
                        date:                 payrolls.date,
                        created:              payrolls.created,
                        adjustment:           payrolls.adjustment,
                        number:               payrolls.number,
                        abbr:                 payrolls.abbr,
                        lastNumber:           payrolls.lastNumber,
                        referenceNumber:      payrolls.referenceNumber,
                        type:                 payrolls.type,
                        payNumber:            payrolls.payNumber,
                        location:             payrolls.location,
                        currency:             payrolls.currency,
                        exchangeRate:         payrolls.exchangeRate,
                        totalGross:           this.totalGross,
                        totalNetPay:          this.totalNetPay,
                        totalTaxPaymentKHM:   this.totalTaxPaymentKHM,
                        totalTaxPaymentUS:    this.totalTaxPaymentUS,
                        totalDeduction:       this.totalDeduction,
                        totalBenefits:        this.totalBenefits,
                        totalTaxBenefit:      this.totalTaxBenefit,
                        payrollList:          payList,
                        payrollList1:         payrolls.payrollList1,
                        payrollList2:         payrolls.payrollList2,
                        payrollList3:         payList,
                        totalNetSalary:       this.totalNetSalary,
                        step:                 4, 
                        department:           payrolls.department,
                        natureContract:       payrolls.natureContract,
                        employeeGroup:        payrolls.employeeGroup,
                        loggedUser:           this.loggedUser,
                    });
                    this.showLoading = true;
                    window.console.log('data',data)
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
        }
    },
    async mounted(){
        await this.loadPayrollList()
    },
    watch: {
        propReview() {
            if (this.propReview !== undefined) {
                this.loadPayrollList()
            }
        },
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