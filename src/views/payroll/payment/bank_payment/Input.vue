<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
            <v-col sm="3" class="pr-1">
                <v-row class="my-1 mr-0">
                    <p>{{$t('p_select_month')}}</p>
                </v-row>
                <v-row class="my-1 mr-0">
                    <p>{{$t('financial_this_payroll')}}</p>
                </v-row>
                <v-row class="my-2 mr-0">
                    <v-col sm="0" cols="0" class="pt-0 pr-0">
                        <div style="line-height: 20px;" class="code_text text-bold">PBP
                        </div>
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
            <v-col sm="3" class="px-1">
                <month-picker :initialMonth="start_date"  @emitMonth="start_date = $event" @onChanged="monthChange" :rules="[v => !!v || $t('field_is_required')]"/>
                <v-select class="mt-1"
                    id="acc_type_selector"
                    :items="payrollBank"
                    item-text="bankName"
                    item-value="bankUuid"
                    v-model="selectBank"
                    :rules="[v => !!v || $t('bank_name_require')]"
                    @change="bankChange"
                    outlined
                    return-object/>
                <date-picker :initialDate="date" :rules="[v => !!v || $t('field_is_required')]" @emitDate="date = $event"/>
            </v-col>
            <v-col sm="1" class=""></v-col>
            <v-col sm="1" class="pr-0 pt-4">
                <p>{{$t('payroll_batch_no')}}</p>
                <p>{{$t('pay_date')}}</p>
                <p>{{$t('bank_account')}}</p>
                <p>{{$t('balance_in_banhji')}}</p>
            </v-col>
            <v-col sm="4" class="pt-4">
                <v-select id="acc_type_selector"
                    :items="payrolls"
                    item-text="referenceNumber"
                    item-value="id"
                    v-model="selectReference"
                    :rules="[v => !!v || $t('field_is_required')]"
                    outlined
                    @change="referenceChange"/>
                <v-select class="mt-1"
                    id="acc_type_selector"
                    :items="paymentSchedules"
                    :rules="[v => !!v || $t('require')]"
                    item-text="payDate"
                    item-value="payDate"
                    v-model="payDate"
                    @change="scheduleChange"
                    outlined/>
                <v-select class="mt-1"
                    id="acc_type_selector"
                    :items="bankAccount"
                    :rules="[v => !!v || $t('bank_name_require')]"
                    item-text="account.account"
                    item-value="account.id"
                    v-model="selectBankAccount"
                    outlined
                    return-object/>
                <v-text-field outlined v-model="balanceInBanhJi"/>
            </v-col>
            <v-col sm="12">
                <kendo-datasource ref="dataSourceInputPayment"
                    :data="payroll_list"
                    :page-size='100'
                    :sort="sort"/>
                    <kendo-grid id="gridInputPayment" class="grid-function"
                        :data-source-ref="'dataSourceInputPayment'"
                        :editable="false"
                        :pageable="true"
                        :pageable-refresh="true"
                        :column-menu="true">
                        <kendo-grid-column
                            :width="150"
                            :field="'monthOf'"
                            :title="$t('month_of')"
                            :template="'<span>#= monthOf#</span>'"
                            :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                        <kendo-grid-column
                            :width="200"
                            :field="'slipNumber'"
                            :title="$t('pay_slip')"
                            :template="'<span>#= slipNumber#</span>'"
                            :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                         <kendo-grid-column
                            :width="200"
                            :field="'paymentCode'"
                            :title="$t('payment_code')"
                            :template="'<span>#= paymentCode#</span>'"
                            :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                        <kendo-grid-column
                            :width="150"
                            :field="'employeeId'"
                            :title="$t('employee_id')"
                            :template="'<span>#= employeeId#</span>'"
                            :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                        <kendo-grid-column
                            :width="250"
                            :field="'employeeName'"
                            :title="$t('employee_name')"
                            :template="'<span>#= employeeName#</span>'"
                            :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                        <kendo-grid-column
                            :width="250"
                            :field="'bank'"
                            :title="$t('bank')"
                            :template="'<span>#= bank.bankName #</span>'"
                            :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                        <kendo-grid-column
                            :width="200"
                            :field="'bank'"
                            :title="$t('bank_account')"
                            :template="'<span>#= bank.bankAccount #</span>'"
                            :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                        <kendo-grid-column
                            :width="150"
                            :field="'amounts'"
                            :title="$t('amount')"
                            :template="'<span>#= kendo.toString(amount, `n2`) #</span>'"
                            :headerAttributes="{style: 'background-color: #EDF1F5'}"
                            :attributes="{style: 'text-align: right;'}"/>
                    </kendo-grid>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        type="loading"
                        :myLoading="true"
                    />
            </v-col>
        </v-row>
    </v-form>
</template>
<script>
import LoadingMe from '@/components/Loading'
import kendo from "@progress/kendo-ui"
const payrollHandler    = require("@/scripts/payrollHandler")
const settingsHandler   = require("@/scripts/settingsHandler")
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
export default({
    props:['propInput'],
    data() {
        return {
            valid: true,
            date: '',
            showLoading: false,
            start_date: '',
            selectBank: '',
            payrollBank:   [],
            selectBankAccount: '',
            bankAccount: [],
            search:{
                start_date: '',
                end_date: ''
            },
            payrolls: [],
            payroll_list: [],
            selectReference: '',
            sort:[
                { field: 'referenceNumber', dir: 'asc' }
            ],
            num: 0,
            batchPayment: {},
            balanceInBanhJi: 0,
            prefix: '',
            number:  '',
            lastNumber: 0,
            referenceNumber: '',
            loggedUser: {
                id: cookie.creator,
                name: cookie.email
            },
            paymentSchedules: [],
            payDate: '',
            prefix_format: ''
        }
    },
    components: {
        'LoadingMe': LoadingMe,
        'month-picker' : ()=> import('@/components/custom_templates/MonthPicker'),
        'date-picker' : ()=> import('@/components/custom_templates/DatePickerComponent')
    },
    computed:{
        loadBatch(){
            if(this.batch !== undefined){
                return this.batch
            }else{
                return []
            }
        }
    },
    methods:{
        returnData(data){
            this.$emit('returnData', data)
        },
        loadSuccess(data){
            this.$emit('headline',data)
        },
        async loadPayrollBank(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    payrollHandler.getBank().then(res => {
                        this.payrollBank = res.data.data
                        window.console.log(this.payrollBank,'payrollBank')
                        this.bankChange()
                    })
                }, 300);
            })
        },
        bankChange(){
            this.bankAccount =  this.payrollBank.filter(item => item.bankUuid ===  this.selectBank.bankUuid)
        },
        monthChange(){
            window.console.log('batchPayment', this.batchPayment)
            let month_of = kendo.toString(new Date(this.start_date),'yyyy-MM-dd')
            this.loadPayroll(month_of)

            if(this.batchPayment.number !== ''){
                this.number = this.batchPayment.number
                window.console.log(this.number)
            }else{
                this.generateNumber()
            }
        },
        loadPayroll(monthOf){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employee = []
                    this.showLoading = true
                    payrollHandler.getPayrollByMonth(monthOf).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.payrolls = res.data.data
                        }
                    })
                }, 300)
            })
        },
        referenceChange(){
            if(this.selectReference){
                this.paymentSchedules = this.payrolls.filter(i =>i.id === this.selectReference).map(index=>{
                    return index.paymentSchedule
                })[0]
            }
        },
        loadBatchSingle(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    payrollHandler.getBatchSingle(this.$route.params.id).then(res => {
                        this.showLoading = true
                        if (res.statusCode === 200) {
                            this.showLoading = false
                            let result = res.data
                            if(result.length > 0){
                                this.batchPayment           = result[0]
                                this.selectBank             = this.batchPayment.bank
                                this.selectBankAccount      = this.batchPayment.bankAccount
                                // let monthOf                 = this.batchPayment.monthOf ? this.batchPayment.monthOf: new Date()
                                // this.start_date             = kendo.toString(new Date(monthOf),'yyyy-MM')
                                this.selectReference        = this.batchPayment.referencePayroll ? this.batchPayment.referencePayroll: ''
                                this.balanceInBanhJi        = this.batchPayment.balanceInBanhJi
                                this.payDate                = this.batchPayment.payDate
                                this.date                   = new Date(this.batchPayment.created || kendo.toString(new Date(),'yyyy-MM-dd')).toISOString().substr(0, 10)
                                if(this.selectReference){
                                    this.monthChange()
                                    this.bankChange()
                                    this.referenceChange()
                                    
                                }
                                window.console.log('payDate',this.payDate )
                                this.loadBatchItem(this.batchPayment)
                            }
                        }
                    })
                }, 300)
            })
        },
        loadBatchItem(result){
            window.console.log(2)
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    payrollHandler.getBatchItem(result.id).then(res => {
                        this.showLoading = true
                        if (res.statusCode === 200) {
                            this.showLoading = false
                            let result = res.data
                            this.payroll_list = result
                        }
                    })
                }, 300)
            })
        },
        saveSpets(){
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            this.showLoading = true
            let ds = this.$refs.dataSourceInputPayment.kendoWidget()
            let dataSource = ds.data()
            const result = dataSource.map(o => {
                return {
                    bank:                       o.bank,
                    currency:                   o.currency,
                    deduction:                  o.deduction,
                    employeeId:                 o.employeeId,
                    employeeName:               o.employeeName,
                    employeeUuid:               o.employeeUuid,
                    employee:                   o.employee,
                    exchangeRate:               o.exchangeRate,
                    grossSalary:                o.grossSalary,
                    id:                         o.id,
                    abbr:                       this.prefix.abbr,
                    lastNumber:                 this.lastNumber,
                    number:                     this.number,
                    referenceNumber:            this.referenceNumber,
                    location:                   o.location,
                    monthOf:                    o.monthOf,
                    natureEmployee:             o.natureEmployee,
                    netPay:                     o.netPay,
                    amountPay:                  o.amount,
                    netSalary:                  o.netSalary,
                    overTimeHoliday:            o.overTimeHoliday,
                    overTimeWeekend:            o.overTimeWeekend,
                    paymentMethod:              o.paymentMethod,
                    payrollLiabilitie:          o.payrollLiabilitie,
                    payrollReferenceNumber:     o.payrollReferenceNumber,
                    payslip:                    o.payslip,
                    position:                   o.position,
                    slipNumber:                 o.slipNumber,
                    salary:                     o.salary,
                    salaryType:                 o.salaryType,
                    status:                     o.status,
                    taxBenefit:                 o.taxBenefit,
                    taxRate:                    o.taxRate,
                    taxSalary:                  o.taxSalary,
                    taxSalaryUS:                o.taxSalaryUS,
                    totalBenefit:               o.totalBenefit,
                    segment:                    o.segment,
                    amount:                     o.amount,
                    exchangeAmount:             o.exchangeAmount,
                    paymentCode:                o.paymentCode,
                    paymentCodeId:              o.paymentCodeId,
                    payrollId:                  o.payrollId,
                }
            })
            window.console.log('result', result)
            if(result.length > 0){
                let batchAmount = 0;
                let totalBatch = 0;
                ds.data().forEach(element => {
                    totalBatch += 1
                    batchAmount += parseFloat(element.amount)
                });
                this.batchAmount = batchAmount
                this.totalBatch = totalBatch
                let amountInWord   = this.inWords(this.batchAmount)
                new Promise(resolve => {
                    setTimeout(() => {
                        this.showLoading = true
                        resolve('resolved');
                        let data = {
                            id:                 this.$route.params.id ? this.$route.params.id : '',
                            monthOf:            kendo.toString(new Date(this.start_date),'yyyy-MM-dd'),
                            created:            kendo.toString(new Date(this.date),'yyyy-MM-dd'),
                            bank:               this.selectBank,
                            bankAccount:        this.selectBankAccount,
                            balanceInBanhJi:    this.balanceInBanhJi,
                            batchItem:          result,
                            batchAmount:        this.batchAmount,
                            totalBatch:         this.totalBatch,
                            referencePayroll:   this.selectReference,
                            amountInWord:       amountInWord,
                            abbr:               'PBP',
                            lastNumber:         parseInt(this.lastNumber),
                            number:             this.number,
                            referenceNumber:    this.referenceNumber,
                            type:               'bath_payment',
                            step:               2,
                            status:             0,
                            loggedUser:         this.loggedUser,
                            payDate:            this.payDate
                        };
                        window.console.log(data)
                        payrollHandler.createBatchPayment(data).then(response => {
                            this.showLoading = true
                            if (response.data.statusCode === 201) {
                                this.loadSuccess(response.data.statusCode)
                                this.showLoading = false
                                this.$snotify.success('Success')
                            }
                        })
                    }, 300);
                })
            }else{
                this.showLoading = false
                this.$snotify.error('Please check again! ')
            }
        },
        inWords(totalRent){
        //console.log(totalRent);
            var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
            var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
            var number = parseFloat(totalRent).toFixed(2).split(".");
            var num = parseInt(number[0]);
            var digit = parseInt(number[1]);
            //console.log(num);
            if ((num.toString()).length > 10)  return 'overflow';
            var n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
            var d = ('00' + digit).substr(-2).match(/^(\d{2})$/);
            if (!n) return; var str = '';
            str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
            str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
            str += (n[5] != 0) ? (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
            str += (d[1] != 0) ? ((str != '' ) ? "and " : '') + (a[Number(d[1])] || b[d[1][0]] + ' ' + a[d[1][1]]): 'Only!';
            return str;
        },
        goBack(){
            let batch_id = this.$route.params.id
            let paymentList = this.payroll_list
            if(batch_id && paymentList.length === 0){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        this.showLoading = true
                        payrollHandler.deleteTransactions(batch_id).then(response => {
                            if (response.statusCode === 200) {
                                this.showLoading = false
                                window.history.go(-2)
                            }
                        })
                    },300)
                })
            }else{
                window.history.go(-1)
            }
        },
        loadPrefixes() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    settingsHandler.getPrefixes().then(res => {
                        if (res.data.statusCode === 200) {
                            let result = res.data.data
                            this.prefixList = result.filter(p => p.type =='payroll_payment')
                            this.prefix = this.prefixList[0]
                            this.payNumber = this.prefix
                            const lastNumber = this.zeroPad(parseInt(0), this.prefix.format)
                            this.prefix_format = (this.prefix.abbr + this.prefix.numberSeparator + this.prefix.structure + this.prefix.numberSeparator + lastNumber + '@' + this.prefix.sequcencing)
                        }
                    })
                }, 300)
            })
        },
        generateNumber() {
            if(this.batchPayment !== ''){
                let sequcencing = ''
                if(this.payNumber.sequcencing =="Year"){
                    sequcencing = new Date(this.start_date).toISOString().substr(0, 4)
                }else if(this.payNumber.sequcencing =="Month"){
                    sequcencing = new Date(this.start_date).toISOString().substr(0, 7)
                }else{
                    sequcencing = ''
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            abbr:       "PBP",
                            structure:  this.payNumber.structure,
                            date:       new Date(this.start_date),
                            type:       'bath_payment',
                            pkId:       'pbp-',
                            sequcencing: sequcencing
                        }
                        payrollHandler.getPrefixNumber(data).then(res => {
                            this.showLoading = true;
                            if(res.data.statusCode === 200){
                                this.showLoading = false;
                                const result = res.data.data
                                const lastNumber = this.zeroPad(parseInt(result.lastNumber), this.payNumber.format)
                                const number = result.suffix + this.payNumber.numberSeparator + lastNumber
                                this.lastNumber = lastNumber
                                this.number = number
                                this.referenceNumber = this.payNumber.abbr + this.payNumber.numberSeparator + this.number
                            }
                        })
                    }, 300);
                })
            }else{
                this.lastNumber = this.batchPayment.lastNumber
                this.number = this.batchPayment.number
                this.referenceNumber = this.batchPayment.referenceNumber
            }
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        scheduleChange(){
            let params =  {
                payroll_id: this.selectReference,
                payDate:    this.payDate
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employee = []
                    payrollHandler.getTransactionList(params).then(res => {
                        if (res.data.statusCode === 200) {
                            let result = res.data.data
                            this.payroll_list = result
                        }
                    })
                }, 300)
            })
        }
    },
    async mounted(){
        await this.loadPayrollBank()
        await this.loadBatchSingle()
        await this.loadPrefixes()
    },
    activasted(){
        this.loadBatchSingle()
    },
    watch:{
        '$route': 'loadBatchSingle'
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
        border-top: thin solid #ddd;
        border-bottom: thin solid #ddd;
        border-radius: 0 !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
        border-bottom: thin solid #ddd;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }
</style>
