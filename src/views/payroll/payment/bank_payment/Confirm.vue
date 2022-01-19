<template>
    <v-row>
        <v-col sm="12">
            <p class="font_16">{{$t('please_make_another_review')}}</p>
             <v-simple-table>
                <template v-slot:default>
                    <tbody>
                    <tr>
                        <td class="text-bold text-uppercase">{{$t('financial_institutions')}}</td>
                        <td>:</td>
                        <td>{{ bank.bankName ? bank.bankName: ''}}</td>
                    </tr>
                    <tr>
                        <td class="text-bold text-uppercase">{{$t('account_number')}}</td>
                        <td>:</td>
                        <td>{{ bankAccountNumber.account || ''}}</td>
                    </tr>
                    <tr>
                        <td class="text-bold text-uppercase">{{$t('number_of_employees')}}</td>
                        <td>:</td>
                        <td>{{batchPayment.totalBatch}}</td>
                    </tr>
                    <tr>
                        <td class="green text-uppercase white--text text-bold">{{$t('total_amount')}}</td>
                        <td class="green">:</td>
                        <td class="green white--text text-right text-bold">{{format(batchPayment.batchAmount)}}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true"/>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from '@/components/Loading'
import kendo from "@progress/kendo-ui"
import Helper from "@/helper.js";
import {JournalModel,
    JournalEntryModel,
    AccountModel,
	CurrencyModel,} from "@/scripts/model/AppModels";
const { EntityType, } = require("@/scripts/default_setup/Collections");
const payrollHandler    = require("@/scripts/payrollHandler")
const settingsHandler   = require("@/scripts/settingsHandler")
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
export default({
    props:['batch'],
    data() {
        return {
            showLoading:    true,
            batchPayment:   [],
            bank:           {} ,
            bankAccount:    {},
            bankAccountNumber: {},
            suffix:         '',
            batchs:         [],
            resultJournals: [],
            loggedUser: {
                id: cookie.creator,
                name: cookie.email
            },
            prefix_format: ''
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
                    payrollHandler.getBatchSingle(this.$route.params.id).then(res => {
                        if (res.statusCode === 200) {
                            let result = res.data
                            this.batchPayment = result[0]
                            this.bank = this.batchPayment.bank
                            this.bankAccount = this.batchPayment.bankAccount
                            if(this.bankAccount){
                                this.bankAccountNumber  = this.bankAccount.account
                            }
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
                            let result = res.data
                            this.batchs  = result
                            this.generateNumber()
                            this.loadJournal()
                        }
                    })
                }, 300)
            })
        },
        calculateJournal(){
            let batchs          = this.batchs
            let segmentAR = []
            batchs.forEach(o=>{
                window.console.log(o,'o')
                const segment           = o.segment
                // const benefitAccount    = o.benefitAccount
                segment.forEach(n=> {
                    n['currency']               = o.currency,
                    n['netPay']                 = o.netPay,
                    n['amountPay']              = o.amountPay,
                    n['taxBenefit']             = o.taxBenefit,
                    n['taxSalaryUS']            = o.taxSalaryUS,
                    n['totalBenefit']           = o.totalBenefit,
                    n['payrollLiabilitie']      = o.payrollLiabilitie,
                    n['benefitAccount']         = o.benefitAccount
                    segmentAR.push(n)
                })
                
            })
            let helper = {}
            let resultSegment   = segmentAR.reduce(function(r, o){
                let key = o.component.id + '-' + o.component.name;
                if(!helper[key]) {
                    helper[key] = Object.assign({}, o); // create a copy of o
                    r.push(helper[key]);
                } else {
                    helper[key].percentage          += parseFloat(o.percentage);
                    helper[key].salary              += parseFloat(o.salary);
                    helper[key].netPay              += parseFloat(o.netPay);
                    helper[key].amountPay           += parseFloat(o.amountPay);
                    helper[key].taxBenefit          += parseFloat(o.taxBenefit);
                    helper[key].taxSalary           += parseFloat(o.taxSalary);
                    helper[key].totalBenefit        += parseFloat(o.totalBenefit);
                }
                return r;
            },[]);
            let journals        =[];
            let bankAccount     = this.bankAccount
            // window.console.log('this.bankAccount',this.bankAccount)
            resultSegment.forEach(function(p){
                // window.console.log(p,'payrollLiabilitie')
                journals.push(
                    new JournalEntryModel({
                        description:          p.payrollLiabilitie.name,
                        account:              new AccountModel(p.payrollLiabilitie),
                        exchange_rate:        1,
                        currency:             new CurrencyModel(p.currency),
                        amount:               p.amountPay, // Dr
                        class_1_uuid:         p.component.id
                    }),
                    new JournalEntryModel({
                        description:          bankAccount.bankName,
                        account:              new AccountModel(bankAccount.account.chartAcount),
                        exchange_rate:        1,
                        currency:             new CurrencyModel(p.currency),
                        amount:               p.amountPay * -1, // Cr
                        class_1_uuid:         p.component.id
                    }),
                )
            })
            this.payrollAccount = resultSegment
            this.journalLine = journals
            if(this.payrollAccount && this.journalLine){
                this.journal()
            }
        },
        journal(){
            let payrollAcc =  this.payrollAccount
            let journals = this.journalLine
            let batchPayment = this.batchPayment
            let journal_ = []
            let prefix_format = this.prefix_format
            payrollAcc.forEach(function(pa){
                let line = journals.filter(r => r.class_1_uuid === pa.component.id ) 
                journal_.push(new JournalModel({
                    description:                  pa.payrollLiabilitie.name || 'Payroll & Employee Benefit Liabilities',
                    number:                       batchPayment.referenceNumber,
                    journal_date:                 Helper.toISODate(new Date()),
                    month_of:                     Helper.toISODate(new Date(batchPayment.monthOf).toISOString().substr(0, 7)),//'2021-02-01',   
                    journal_type:                 EntityType.AUTO_JOURNAL,
                    transaction_type:             'Payroll Payment',
                    referral_transaction_uuid:    batchPayment.id,
                    journal_entries:              line,
                    segment_uuid:                 pa.component.id || '',
                    prefix_format:                prefix_format || '',
                    base_currency:                pa.currency
                }))
            })

            let result_journal = []
            if(this.resultJournals.length > 0){
                let jNal = this.resultJournals
                journal_.forEach(res =>{
                    let journalAR =  jNal.filter(n => n.segment_uuid = res.segment_uuid)
                    let journalUuid = journalAR[0].uuid
                    // window.console.log(4,journalUuid)
                    let created_date = journalAR[0].created_date
                    result_journal.push(new JournalModel( {
                        uuid:                         journalUuid,
                        number:                       res.number,
                        created_date:                 created_date,
                        journal_date:                 res.journal_date,
                        month_of:                     res.month_of,
                        journal_type:                 res.journal_type,
                        transaction_type:             res.transaction_type,
                        segment_uuid:                 res.segment_uuid,
                        journal_entries:              res.journal_entries,
                        prefix_format:                res.prefix_format,
                        base_currency:                res.base_currency,
                    }))
                })
                this.journal_data = result_journal
                window.console.log(5,this.journal_data)
            }else{
                this.journal_data = journal_
            }
        },
        saveSpets(){
            if(this.journal_data.length > 0){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            id:                 this.$route.params.id ? this.$route.params.id : '',
                            monthOf:            this.batchPayment.monthOf,
                            created:            this.batchPayment.created,
                            bank:               this.batchPayment.bank,
                            bankAccount:        this.batchPayment.bankAccount,
                            balanceInBanhJi:    this.batchPayment.balanceInBanhJi,
                            batchItem:          this.batchs,
                            date:               this.batchPayment.date,
                            batchAmount:        this.batchPayment.batchAmount,
                            totalBatch:         this.batchPayment.totalBatch,
                            amountInWord:       this.batchPayment.amountInWord,
                            referencePayroll:   this.batchPayment.referencePayroll,
                            confirm:            'done',
                            suffix:             this.suffix,
                            payNumber:          this.payNumber,
                            abbr:               this.payNumber.abbr,
                            lastNumber:         this.lastNumber,
                            step:               3,
                            status:             1,
                            raw_journal:        this.journal_data,
                            loggedUser:         this.loggedUser
                        }
                        window.console.log('data', data)
                        payrollHandler.createBatchPayment(data).then(response => {
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
                this.$snotify.error('Something went wrong')
            }
        },
        close(){
            window.history.go(-2)
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
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
            let sequcencing = ''
            if(this.payNumber.sequcencing =="Year"){
                sequcencing = new Date().toISOString().substr(0, 4)
            }else if(this.payNumber.sequcencing =="Month"){
                sequcencing = new Date().toISOString().substr(0, 7)
            }else{
                sequcencing = ''
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        abbr:           this.payNumber.abbr,
                        structure:      this.payNumber.structure,
                        date:           new Date(),
                        type:           'payroll_payment',
                        pkId:           'ppm-',
                        sequcencing:    sequcencing
                    }
                    payrollHandler.getPrefixNumber(data).then(res => {
                        this.showLoading = true;
                        if(res.data.statusCode === 200){
                            this.showLoading = false;
                            const result = res.data.data
                            const lastNumber = this.zeroPad(parseInt(result.lastNumber), this.payNumber.format)
                            this.suffix = result.suffix
                            this.lastNumber = lastNumber
                        }
                    })
                }, 300);
            })
        },
        goBack(){
            window.history.go(-1)
        },
        async loadJournal(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    payrollHandler.getPayrollJournal(this.$route.params.id).then(res => {
                        if (res.statusCode === 200) {
                            this.resultJournals = res.data
                        }
                        this.calculateJournal()
                    })
                }, 300)
            })
        }
    },
    async mounted(){
        await this.loadBatchSingle()
        await this.loadPrefixes()
        await this.loadJournal()
    },
    watch:{
        batch(){
           if(this.batch !== undefined){
                this.loadBatchSingle()
                this.loadJournal()
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
