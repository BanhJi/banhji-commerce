<template>
    <v-row>
        <v-col sm="12">
            <h2 class="capitalize">{{$t('payroll_bank_payment_letter')}}</h2>
            <p class="text-uppercase mb-0">{{$t('payroll_bank_payament_pa')}}</p>
            <p class="mb-0">{{$t('for_the_month_of')}}: <span class="text-bold">{{monthOf}}</span></p>
            <p class="  mb-0">{{$t('reference_no')}}: <span class="text-bold"> PRP2009-001</span></p>
            <p class="">{{$t('date')}}: <span class="text-bold"> {{createdAt}}</span></p>
            <p>{{$t('bank_payment_desc_function1')}}:<span class="text-bold"> {{ bankAccount.account ? bankAccount.account:"" }}</span> 
                {{$t('bank_payment_desc_function2')}}
                <span class="text-bold"> {{format(batchPayment.batchAmount)}} ({{batchPayment.amountInWord}})</span>
                {{$t('bank_payment_desc_function3')}}
            </p>
            <kendo-datasource ref="dataSourceReview"
                :data="batchItem"
                :page-size='100'
                :sort="sort"/>
                <kendo-grid id="gridReview" class="grid-function"
                    :data-source-ref="'dataSourceReview'"
                    :editable="false"
                    :pageable="false"
                    :pageable-refresh="true"
                    :column-menu="true">
                    <kendo-grid-column
                        :width="150"
                        :field="'employeeId'"
                        :title="$t('employee_id')"
                        :template="'<span>#= employeeId#</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :width="220"
                        :field="'employeeName'"
                        :title="$t('employee_name')"
                        :template="'<span>#= employeeName#</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :width="300"
                        :field="'bank'"
                        :title="$t('bank')"
                        :template="'<span>#= bank.bankName #</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :width="250"
                        :field="'bank'"
                        :title="$t('bank_account')"
                        :template="'<span>#= bank.bankAccount #</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :width="130"
                        :field="'amountPay'"
                        :title="$t('amount')"
                        :template="'<span>#= kendo.toString(amountPay, `n2`) #</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"
                        :attributes="{style: 'text-align: right'}"/>
                </kendo-grid>
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    type="loading"
                    :myLoading="true"
                />
        </v-col>
    </v-row>
</template>
<script>
import kendo from "@progress/kendo-ui"
import LoadingMe from '@/components/Loading'
const payrollHandler    = require("@/scripts/payrollHandler")
import XLSX from 'xlsx'
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
export default({
    props:['batchreview'],
    data() {
        return {
            showLoading: false,
            batchPayment: {},
            batchItem: [],
            monthOf: '',
            batchAmount: 0,
            bankAccount: '',
            createdAt: '',
            sort:[
                { field: 'employeeId', dir: 'asc' }
            ],
            loggedUser: {
                id: cookie.creator,
                name: cookie.email
            },
        }
    },
    components: {
        'LoadingMe': LoadingMe,
    },
    methods:{
        format(val){
            return kendo.toString(val,'c2')
        },
        returnData(data){
            this.$emit('returnData', data)
        },
        loadSuccess(data){
            this.$emit('headline',data)
        },
        loadBatchSingle(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    payrollHandler.getBatchSingle(this.$route.params.id).then(res => {
                        this.showLoading = true
                        if (res.statusCode === 200) {
                            let result          = res.data
                            this.batchPayment   = result[0]
                            this.batchItem      = this.batchPayment.batchItem
                            this.monthOf        = kendo.toString(new Date(this.batchPayment.monthOf), 'y')
                            this.createdAt      = kendo.toString(new Date(this.batchPayment.createdAt),'dd MMMM yyyy')
                            this.bankAccount    = this.batchPayment.bankAccount.account
                            this.loadBatchItem(this.batchPayment)
                        }
                    })
                }, 300)
            })
        },
        loadBatchItem(result){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    payrollHandler.getBatchItem(result.id).then(res => {
                        this.showLoading = true
                        if (res.statusCode === 200) {
                            this.showLoading = false
                            window.console.log('result',res)
                            let result = res.data
                            this.batchItem = result
                            this.batchItem.sort(function(i, j){
                                var keyA = i.employeeId,
                                    keyB = j.employeeId;
                                if (keyA < keyB) return -1;
                                if (keyA > keyB) return 1;
                                return 0;
                            })
                        }
                    })
                }, 300)
            })
        },
        formatAmount(value){
            return kendo.toString(value,'n2')
        },
        saveSpets(){
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    let data = {
                        id:                 this.$route.params.id ? this.$route.params.id : '',
                        monthOf:            this.batchPayment.monthOf,
                        created:            this.batchPayment.created,
                        bank:               this.batchPayment.bank,
                        bankAccount:        this.batchPayment.bankAccount,
                        balanceInBanhJi:    this.batchPayment.balanceInBanhJi,
                        batchItem:          this.batchPayment.batchItem,
                        date:               this.batchPayment.date,
                        batchAmount:        this.batchPayment.batchAmount,
                        totalBatch:         this.batchPayment.totalBatch,
                        amountInWord:       this.batchPayment.amountInWord,
                        referencePayroll:   this.batchPayment.referencePayroll,
                        abbr:               this.batchPayment.abbr,
                        lastNumber:         this.batchPayment.lastNumber,
                        number:             this.batchPayment.number,
                        referenceNumber:    this.batchPayment.referenceNumber,
                        type:               this.batchPayment.type,
                        step:               3,
                        status:             0,
                        loggedUser:         this.loggedUser
                    };
                    window.console.log('2', data)
                    payrollHandler.createBatchPayment(data).then(response => {
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
        goBack(){
            window.history.go(-1)
        },
        download(){
            let ds = this.$refs.dataSourceReview.kendoWidget()
            const result = ds.data().map((o, i) => {
                return {
                    no:                         i + 1,
                    employeeId:                 o.employeeId,
                    employeeName:               o.employeeName,
                    amountPay:                  o.amountPay,
                    bankName:                   o.bank.bankName,
                    bankAccount:                o.bankAccount,
                    // currency:                   o.currency,
                    // deduction:                  o.deduction,
                    // employeeId:                 o.employeeId,
                    // employeeUuid:               o.employeeUuid,
                    // employee:                   o.employee,
                    // exchangeRate:               o.exchangeRate,
                    // grossSalary:                o.grossSalary,
                    // id:                         o.id,
                    // location:                   o.location,
                    // monthOf:                    o.monthOf,
                    // natureEmployee:             o.natureEmployee,
                    // netPay:                     o.netPay,
                    // amountPay:                  o.netPay,
                    // netSalary:                  o.netSalary,
                    // overTimeHoliday:            o.overTimeHoliday,
                    // overTimeWeekend:            o.overTimeWeekend,
                    // paymentMethod:              o.paymentMethod,
                    // payrollLiabilitie:          o.payrollLiabilitie,
                    // payrollReferenceNumber:     o.payrollReferenceNumber,
                    // payslip:                    o.payslip,
                    // position:                   o.position,
                    // slipNumber:                 o.slipNumber,
                    // salary:                     o.salary,
                    // salaryType:                 o.salaryType,
                    // status:                     o.status,
                    // taxBenefit:                 o.taxBenefit,
                    // taxRate:                    o.taxRate,
                    // taxSalary:                  o.taxSalary,
                    // taxSalaryUS:                o.taxSalaryUS,
                    // totalBenefit:               o.totalBenefit,
                    // segment:                    o.segment
                }
            })
            window.console.log(result)
            this.excelData = [
                {name: 'thearann',id: '00001'},
                {name: 'Dara',id: '00002'}
            ]
            let header = ['no','employeeId','employeeName','bankName','bankAccount','amountPay']
            const jsonWorkSheet = XLSX.utils.json_to_sheet(result, {header, defval: null});
            const workBook = {
                SheetNames: ['PAYROLL (BANK PAYMENT)'], // sheet name
                Sheets: {'PAYROLL (BANK PAYMENT)': jsonWorkSheet}
            }
            XLSX.writeFile(workBook, "bank-payment.xlsx");
        },
    },
    async mounted(){
        await this.loadBatchSingle()
    },
    watch:{
        batchreview(){
            if (this.batchreview !== undefined) {
                this.loadBatchSingle()
            }
        }
    }
})
</script>
<style scoped>
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.primary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: #f44336 !important;
    }

    .theme--light.v-data-table {
        background-color: transparent !important;
        border-collapse: collapse !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
        border-bottom: thin solid #ddd;
    }

    .v-data-table > .v-data-table__wrapper > table td{
        height: 32px !important;
        border: thin solid rgba(0, 0, 0, 0.12) !important;
        border-collapse: collapse !important;
    }
    .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        height: 32px !important;
        border: thin solid rgba(0, 0, 0, 0.12) !important;
        color: #000 !important;
        border-collapse: collapse !important;
    }
</style>

