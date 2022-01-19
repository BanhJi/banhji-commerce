<template>
    <v-row>
        <v-col cols="12" class="pt-0">
            <v-row>
                <v-col sm="8" cols="12" class="pb-0">
                    <h3 class="text-uppercase">{{$t('finalize')}}</h3>
                    <p>{{$t('finalize_payroll_desc')}}</p>
                </v-col>
                <v-col sm="4" cols="12" class="pb-0">
                
                    <kendo-datasource ref="dataSourcePayDay"
                        :data="payDates"/>
                    <kendo-grid id="gridPayDay" class="grid-function"
                        :data-source-ref="'dataSourcePayDay'"
                        :editable="true"
                        :scrollable-virtual="true">
                        <kendo-grid-column
                            :title="$t('No.')"
                            :width="70"
                            readonly
                            :template="rowNumberTmpl"
                            :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                        <kendo-grid-column
                            :field="'payDate'"
                            :title="$t('pay_date')"
                            :width="120"
                            :template="'<span>#= kendo.toString(new Date(payDate), `dd-MM-yyyy`)#</span>'"
                            :editor="ServiceDateEditor"
                            :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                         <kendo-grid-column
                            :width="100"
                            :command="{ iconClass: 'k-icon k-i-trash', text: ' ', click: removeRow, class: 'btn-plus' }"
                            :title="$t('action')"
                            :headerAttributes="{style: 'text-align: center; background-color: #EDF1F5'}"
                            :attributes="{style: 'text-align: center'}"/>
                    </kendo-grid>
                    <v-row>
                        <v-col sm="12" cols="12" class="pb-0">
                            <v-btn
                                color="primary"
                                class="float-left btn_plus mr-2"
                                @click="addRow">
                                <v-icon size="" class="ma-1">mdi-plus</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" class="mt-1">
            <v-simple-table class="attachment_table">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th>{{$t('sl_no')}} </th>
                            <th>{{$t('current_month')}} </th>
                            <th>{{$t('previous_month')}} </th>
                            <th>{{$t('variance')}} </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Month</td>
                            <td style="text-align: right;">{{ payrollFinal.monthOf }}</td>
                            <td style="text-align: right;">{{ payrollPrevious.monthOf}}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Number of Employee</td>
                            <td style="text-align: right;">{{ payrollFinal.totalEmployee }}</td>
                            <td style="text-align: right;">{{ payrollPrevious.totalEmployee }}</td>
                            <td style="text-align: right;">{{ payrollFinal.totalEmployee - payrollPrevious.totalEmployee }}</td>
                        </tr>
                        <tr>
                            <td>Total Gross Salary</td>
                            <td style="text-align: right;">{{numberFormat(payrollFinal.totalGross)}}</td>
                            <td style="text-align: right;">{{numberFormat(payrollPrevious.totalGross)}}</td>
                            <td style="text-align: right;">{{numberFormat(payrollFinal.totalGross - payrollPrevious.totalGross)}}</td>
                        </tr>
                        <tr>
                            <td>Total Deduction</td>
                            <td style="text-align: right;">{{numberFormat(payrollFinal.totalDeduction)}}</td>
                            <td style="text-align: right;">{{numberFormat(payrollPrevious.totalDeduction)}}</td>
                            <td style="text-align: right;">{{numberFormat(payrollFinal.totalDeduction - payrollPrevious.totalDeduction)}}</td>
                        </tr>
                        <tr>
                            <td>Total Benefits</td>
                            <td style="text-align: right;">{{ numberFormat(payrollFinal.totalBenefits) }}</td>
                            <td style="text-align: right;">{{ numberFormat(payrollPrevious.totalBenefits) }}</td>
                            <td style="text-align: right;">{{ numberFormat(payrollFinal.totalBenefits - payrollPrevious.totalBenefits) }}</td>
                        </tr>
                        <tr>
                            <td>Total Tax Payment</td>
                            <td style="text-align: right;">{{numberFormat(payrollFinal.totalTaxPaymentUS)}}</td>
                            <td style="text-align: right;">{{numberFormat(payrollPrevious.totalTaxPaymentUS)}}</td>
                            <td style="text-align: right;">{{numberFormat(payrollFinal.totalTaxPaymentUS - payrollPrevious.totalTaxPaymentUS)}}</td>
                        </tr>
                        <tr>
                            <td>Total Tax Benefit</td>
                            <td style="text-align: right;">{{numberFormat(payrollFinal.totalTaxBenefit)}}</td>
                            <td style="text-align: right;">{{numberFormat(payrollPrevious.totalTaxBenefit)}}</td>
                            <td style="text-align: right;">{{numberFormat(payrollFinal.totalTaxBenefit - payrollPrevious.totalTaxBenefit)}}</td>
                        </tr>
                        <tr>
                            <td>Total Net Salary</td>
                            <td style="text-align: right;">{{ numberFormat(payrollFinal.totalNetSalary)}}</td>
                            <td style="text-align: right;">{{ numberFormat(payrollPrevious.totalNetSalary)}}</td>
                            <td style="text-align: right;">{{ numberFormat(payrollFinal.totalNetSalary - payrollPrevious.totalNetSalary)}}</td>
                        </tr>
                        <tr>
                            <td>Total Net Pay</td>
                            <td style="text-align: right;">{{numberFormat(payrollFinal.totalNetPay)}}</td>
                            <td style="text-align: right;">{{numberFormat(payrollPrevious.totalNetPay)}}</td>
                            <td style="text-align: right;">{{numberFormat(payrollFinal.totalNetPay - payrollPrevious.totalNetPay)}}</td>
                        </tr>
                        <!-- <tr>
                            <td></td>
                            <td>Download Salary Register</td>
                            <td>Download Salary Register</td>
                            <td>
                                <v-btn width="160" color="primary" @click="downloadPayslip"
                                    class=" white--text float-right text-capitalize ml-5">
                                    {{ $t('download_payslip') }}
                                </v-btn>
                            </td>
                        </tr> -->
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
        <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true" type="loading"/>
    </v-row>
</template>
<script>
    import kendo from "@progress/kendo-ui"
    import Helper from "@/helper.js";
    import {JournalModel,
    JournalEntryModel,
    AccountModel,
	CurrencyModel,} from "@/scripts/model/AppModels";
    import  jsPDF  from "jspdf";
    const $ = require("jquery")
    const { EntityType, } = require("@/scripts/default_setup/Collections");
    const settingsHandler = require("@/scripts/settingsHandler")
    const payrollHandler = require("@/scripts/payrollHandler")
    const accountHandler = require("@/scripts/handler/accounting/account");
    const cookieJS = require("@/cookie.js");
    const cookie = cookieJS.getCookie();
    export default {
        props:['propFinalize'],
        data: () =>({
            journal: new JournalModel(),
            journal_date: "",
            dialogm: false,
            showLoading: true,
            payrollFinal: {
                monthOf: '',
                totalEmployee: 0,
                totalGross: 0,
                totalDeduction: 0,
                totalBenefits: 0,
                totalTaxPaymentUS: 0,
                totalTaxBenefit: 0,
                totalNetSalary: 0,
                totalNetPay: 0,
                taxBenefit: 0,
            },
            payrollPrevious: {
                monthOf: '',
                totalEmployee: 0,
                totalGross: 0,
                totalDeduction: 0,
                totalBenefits: 0,
                totalTaxBenefit: 0,
                totalTaxPaymentUS: 0,
                totalNetSalary: 0,
                totalNetPay: 0,
                taxBenefit: 0,
            },
            account: {},
            journal_data: [],
            payroll_data: {},
            journalLine: [],
            taxPayble: {},
            accountBenefit: {},
            accBenefit: {},
            resultJournals: {},
            loggedUser: {
                id: cookie.creator,
                name: cookie.email
            },
            payDates: [],
            suffix: {},
            prefix_format: ''
        }),
        components: {
            LoadingMe: () => import(`@/components/Loading`)
        },
        methods:{
            numberFormat(value){
                return kendo.toString( kendo.parseFloat(value),"n2")
            },
            loadPayrollList(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true;
                        payrollHandler.getPayroll(this.$route.params.id).then(res => {
                            this.showLoading = true;
                            if(res.data.statusCode === 200){
                                this.showLoading = true
                                const resultPay = res.data.data[0]
                                const prefix = resultPay.payNumber
                                // window.console.log('resultPay', resultPay)
                                const lastNumber = this.zeroPad(parseInt(0), prefix.format)
                                this.prefix_format = (prefix.abbr + prefix.numberSeparator + prefix.structure + prefix.numberSeparator + lastNumber + '@' + prefix.sequcencing)
                                let monthOF =  kendo.toString(new Date(new Date(resultPay.monthOf).setMonth(new Date(resultPay.monthOf).getMonth() - 1)),'yyyy-MM-dd')
                                this.loadPayrollPrevious(monthOF)
                                this.loadPayrollItem(resultPay)
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
                                this.payrollFinal = result
                                this.payrolls = resutl_item
                                this.loadSuccess(res.data.statusCode)
                                this.loadAccount()
                                this.showLoading = false
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            loadPayrollPrevious(monthOF){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        payrollHandler.getPayrollPrevious(monthOF).then(res => {
                            this.showLoading = true
                            if (res.data.statusCode === 200) {
                                let result = res.data.data
                                if(result.length > 0){
                                    this.payrollPrevious = result[0]
                                }
                                this.changMonthOf = false
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
                                if(result.length > 0){
                                    this.prefixList = result.filter(p => p.type =='pay_slip')
                                    this.prefix = this.prefixList[0]
                                    this.payNumber = this.prefix
                                }
                            }
                        })
                    }, 300)
                })
            },
            zeroPad(num, places) {
                return String(num).padStart(places, '0')
            },
            result(){
                let dataResult =    this.payrolls;
                let currency   =    this.payrollFinal.currency;
                let monthOf    =    this.payrollFinal.monthOf;
                let month_of   =    kendo.toString(new Date(monthOf), "y")
                let segmentAR = []
                dataResult.forEach(o=>{
                    const segment           = o.segment
                    segment.forEach(n=> {
                        n['currency']               = currency,
                        n['netPay']                 = (o.netPay * n.percentage)/100,
                        n['taxBenefit']             = (o.taxBenefit * n.percentage)/100,
                        n['taxSalaryUS']            = (o.taxSalaryUS * n.percentage)/100,
                        n['totalBenefit']           = (o.totalBenefit * n.percentage)/100,
                        n['payrollLiabilitie']      = o.payrollLiabilitie,
                        n['taxBenefitExchange']     = (o.taxBenefitExchange * n.percentage)/100,
                        n['salaryExchange']         = (o.salaryExchange * n.percentage)/100,
                        n['taxSalary']              = (o.taxSalary * n.percentage)/100,
                        n['benefitExchange']        = (o.benefitExchange * n.percentage)/100,
                        segmentAR.push(n)
                    })
                })
                let calculateSalary     = segmentAR.map(i=>{
                    return {
                        salary:             i.Salary,
                        percentage:         i.percentage,
                        netPay :            i.netPay,
                        taxBenefit:         i.taxBenefit,
                        taxSalary:          i.taxSalaryUS,
                        totalBenefit:       i.totalBenefit,
                        taxBenefitExchange: i.taxBenefitExchange,
                        salaryExchange:     i.salaryExchange,
                        benefitExchange:    i.taxBenefitExchange,
                        component:          i.component,
                        salaryAccount:      i.salaryAccount,
                        currency:           i.currency,
                        payrollLiabilitie:  i.payrollLiabilitie,
                    }
                })
                let helper = {}
                let resultSegment   = calculateSalary.reduce(function(r, o){
                    let key = o.component.id + '-' + o.component.name;
                    if(!helper[key]) {
                        helper[key] = Object.assign({}, o); // create a copy of o
                        r.push(helper[key]);
                    } else {
                        helper[key].percentage          += parseFloat(o.percentage);
                        helper[key].salary              += parseFloat(o.salary);
                        helper[key].netPay              += parseFloat(o.netPay);
                        helper[key].taxBenefit          += parseFloat(o.taxBenefit);
                        helper[key].taxSalary           += parseFloat(o.taxSalary);
                        helper[key].totalBenefit        += parseFloat(o.totalBenefit);
                        helper[key].taxBenefitExchange  += parseFloat(o.taxBenefitExchange),
                        helper[key].salaryExchange      += parseFloat(o.salaryExchange),
                        helper[key].benefitExchange     += parseFloat(o.benefitExchange)
                    }
                    return r;
                },[]);
                let journals        =[];
                let taxPayble       = this.taxPayble
                let accountBenefit  = this.accountBenefit
                let accBenefit      = this.accBenefit
                resultSegment.forEach(function(p){
                    journals.push(
                        new JournalEntryModel({
                            description:          p.salaryAccount.name + ' for '+ month_of,
                            account:              new AccountModel(p.salaryAccount),
                            exchange_rate:        1,
                            currency:             new CurrencyModel(p.currency),
                            amount:               p.salary, // dr
                            class_1_uuid:         p.component.id          
                        }),
                        new JournalEntryModel({
                            description:          p.payrollLiabilitie.name + ' for '+ month_of,
                            account:              new AccountModel(p.payrollLiabilitie),
                            exchange_rate:        1,
                            currency:             new CurrencyModel(p.currency),
                            amount:               p.netPay * -1, // cr
                            class_1_uuid:         p.component.id
                        }),
                        new JournalEntryModel({
                            description:          taxPayble.name + ' for '+ month_of,
                            account:              new AccountModel(taxPayble),
                            exchange_rate:        1,
                            currency:             new CurrencyModel(p.currency),
                            amount:               p.taxSalary * -1, // cr,
                            class_1_uuid:         p.component.id
                        }),
                    )
                    if(p.taxBenefit > 0 && p.totalBenefit > 0){
                        journals.push(
                            new JournalEntryModel({
                                description:          accountBenefit.name + ' for '+ month_of,
                                account:              new AccountModel(accountBenefit),
                                currency:             new CurrencyModel(p.currency),
                                exchange_rate:        1,
                                amount:               p.totalBenefit, // dr,
                                class_1_uuid:         p.component.id
                            }),
                            new JournalEntryModel({
                                description:          accBenefit.name + ' for '+ month_of,
                                account:              new AccountModel(accBenefit),
                                exchange_rate:        1,
                                currency:             new CurrencyModel(p.currency),
                                amount:               p.taxBenefit * -1, // cr,
                                class_1_uuid:         p.component.id
                            }),
                        )
                    }
                })
                this.payrollAccount = resultSegment
                this.journalLine = journals
                if(this.payrollAccount && this.journalLine){
                    this.calculateJournal()
                }
            },
            saveFinalize(){
                let ds = this.$refs.dataSourcePayDay.kendoWidget();
                let dataSource = ds.data().map(index=>{
                    return {
                        payDate:           kendo.toString(new Date(index.payDate),"yyyy-MM-dd")
                    }
                })
                if(this.journal_data.length > 0){
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve('resolved');
                            let data ={
                                id:                       this.$route.params.id,
                                status:                   1, 
                                final:                    'done',
                                monthOf:                  this.payrollFinal.monthOf,
                                year:                     kendo.toString(new Date(this.payrollFinal.monthOf),'yyyy'),
                                created:                  this.payrollFinal.created,
                                date:                     this.payrollFinal.date,
                                type:                     this.payrollFinal.type,
                                currency:                 this.payrollFinal.currency,
                                exchangeRate:             this.payrollFinal.exchangeRate,
                                payrollReferenceNumber:   this.payrollFinal.referenceNumber,
                                payrollList:              this.payrolls,
                                lastNumber:               this.lastNumber,
                                payslip:                  {
                                    abbr:                 this.prefix.abbr,
                                    structure:            this.prefix.structure,
                                    date:                 this.payrollFinal.monthOf,
                                    type:                 this.prefix.type,
                                    format:               this.prefix.format,
                                    numberSeparator:      this.prefix.numberSeparator,
                                    pkId:                 "par-",
                                    suffix:               this.prefix.suffix
                                },
                                paymentSchedule:          dataSource,
                                loggedUser:               this.loggedUser,
                                raw_journal:              this.journal_data
                            }
                            this.showLoading = true;
                            // window.console.log(111,data)
                            payrollHandler.createPayroll(data).then(response => {
                                this.showLoading = true
                                if (response.data.statusCode === 201) {
                                    this.$snotify.success('Success')
                                    this.loadSuccess(response.data.statusCode)
                                    window.history.go(-1)
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
            loadSuccess(data){
                this.$emit('headline',data)
            },
            downloadPayslip(){
                var doc = new jsPDF();
                var specialElementHandlers = {
                    '#pdfPay': function(){
                    return true;
                    },
                    '.controls': function(){
                    return true;
                    }
                };
                doc.fromHTML($('.pdfPay').get(0), 15, 15, {
                    'width': 170, 
                    'elementHandlers': specialElementHandlers
                });

                doc.save('Generated.pdf');
            },
            calculateJournal(){
                let payrollAcc      =  this.payrollAccount
                let journals        = this.journalLine
                let payrollFinal    = this.payrollFinal
                let prefix_format   = this.prefix_format
                let journal_        = []
                let journalRe       = []
                payrollAcc.forEach(function(pa){
                    let line = journals.filter(r => r.class_1_uuid === pa.component.id ) 
                    journal_.push(new JournalModel({
                        description:                  pa.payrollLiabilitie.name ? pa.payrollLiabilitie.name: 'Payroll & Employee Benefit Liabilities',
                        number:                       payrollFinal.referenceNumber,
                        journal_date:                 Helper.toISODate(new Date()),
                        month_of:                     Helper.toISODate(new Date(payrollFinal.monthOf).toISOString().substr(0, 7)),//'2021-02-01',   
                        journal_type:                 EntityType.AUTO_JOURNAL,
                        base_currency:                payrollFinal.currency,
                        transaction_type:             'Payroll',
                        referral_transaction_uuid:    payrollFinal.id,
                        journal_entries:              line,
                        segment_uuid:                 pa.component.id ? pa.component.id: '',
                        location_uuid:                payrollFinal.location.id ? payrollFinal.location.id: '',
                        prefix_format:                prefix_format //"PA-2111-00000@Year"
                    }))
                })
                let journalUuid     = ''
                let created_date    = ''
                let oldJournal      = []
                journal_.forEach(index =>{
                    if(this.resultJournals.length > 0){
                        let resultJournals = this.resultJournals
                        oldJournal = resultJournals.filter(i => i.segment_uuid === index.segment_uuid)
                        if(oldJournal.length > 0){
                            journalUuid     = oldJournal[0].uuid
                            created_date    = oldJournal[0].created_date
                        }
                    }
                    journalRe.push(new JournalModel({
                        description:                index.description,                 
                        number:                     index.number,     
                        journal_date:               index.journal_date,        
                        month_of:                   index.month_of,                    
                        journal_type:               index.journal_type,               
                        transaction_type:           index.transaction_type,            
                        referral_transaction_uuid:  index.referral_transaction_uuid,  
                        journal_entries:            index.journal_entries,     
                        segment_uuid:               index.segment_uuid,  
                        location_uuid:              index.location_uuid,
                        prefix_format:              index.prefix_format,
                        created_date:               created_date,
                        base_currency:              index.currency,
                        uuid:                       journalUuid
                    }))
                })
                this.journal_data = journalRe
                // window.console.log('journal_data', this.journal_data)
            },
            loadAccount(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        accountHandler.getAll().then(res => {
                            this.showLoading = true;
                            if(res){
                                this.showLoading = false;
                                let acountList = res.data
                                let salaryExpence = acountList.filter(t => t.number == '634010');
                                this.salaryExpence = salaryExpence[0]

                                let taxPayble = acountList.filter(t => t.number == '221020');
                                this.taxPayble = taxPayble[0]
                                let accountBenefit = acountList.filter(t => t.number == '634020');
                                this.accountBenefit = accountBenefit[0]

                                let accBenefit = acountList.filter(t => t.number == '221040');
                                this.accBenefit = accBenefit[0]

                                let benefitPayble = acountList.filter(t => t.number == '221040');
                                this.benefitPayble = benefitPayble[0]
                                this.result()
                            }
                        })
                    }, 300);
                })
            },
            async goBack(){
                window.history.go(-1)
            },
            async loadJournal(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getPayrollJournal(this.$route.params.id).then(res => {
                            if (res.statusCode === 200) {
                                this.resultJournals =  res.data
                            }
                        })
                    }, 300)
                })
            },
            ServiceDateEditor(container, options) {
                kendo.jQuery('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDatePicker();
            },
            rowNumberTmpl(dataItem) {
                var ds = this.$refs.dataSourcePayDay.kendoWidget(),
                    index = ds.indexOf(dataItem);
                return index + 1;
            },
            addRow() {
                let ds = this.$refs.dataSourcePayDay.kendoWidget(),
                    total = ds.total();
                ds.insert(total,{
                    payDate: new Date()
                });
            },
            removeRow(e) {
                e.preventDefault();
                const grid = kendo.jQuery("#gridPayDay").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                }
            }
        },
        async mounted(){
            await this.addRow()
            await this.loadPayrollList()
            await this.loadPrefixes()
            await this.loadJournal()
        },
        watch: {
            propFinalize() {
                if (this.propFinalize !== undefined) {
                    this.loadPayrollList()
                    this.loadPrefixes()
                    this.loadAccount()
                }
            }
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