<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t('cash_payment') }}</h2>
                                <v-icon
                                    @click="cancel()"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close
                                </v-icon>
                            </v-card>
                            <v-card outlined dense class="px-3 no_border mb-3" color="white">
                                <v-row class="grayBg">
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t("employee") }}</label>
                                        <v-autocomplete
                                            v-model="employeeSelect"
                                            style="padding-top: 0px"
                                            :items="employees"
                                            item-value="id"
                                            :filter="employeeFilter"
                                            item-text="name"
                                            :search-input.sync="search"
                                            hide-no-data
                                            hide-selected
                                            placeholder="Start typing to Search"
                                            @change="employeeChange"
                                            return-object
                                            outlined
                                            append-icon="mdi-database-search"
                                        />
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t("date") }}</label>
                                        <app-datepicker :initialDate="start_date"  @emitDate="start_date = $event" hint="MM/DD/YYYY format"/>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label>{{ $t('payment_number') }}</label>
                                        <v-row class="my-3 mr-0">
                                            <v-col sm="3" cols="3" class="pt-0 pr-0">
                                                <div style="line-height: 20px;" class="code_text text-bold">{{
                                                    prefix.abbr}}
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
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <kendo-datasource ref="dataSourcePayment"
                                            :data="resultAR"
                                            :change="dataSourceChanged"
                                            />
                                            <kendo-grid id="grid" class="grid-function"
                                                :data-source-ref="'dataSourcePayment'"
                                                :sortable="false"
                                                :filterable="false"
                                                :column-menu="true"
                                                :editable="true"
                                                :scrollable-virtual="true">
                                                <kendo-grid-column
                                                    :title="$t('month_of')"
                                                    :width="150"
                                                    :field="'monthOf'"
                                                    :column-menu="false"
                                                    :editable="()=>{ return false}"
                                                    :template="'<span>#=monthOf#</span>'"
                                                    :headerAttributes="{style: 'background-color: #EDF1F5;', class: 'text-products'}"
                                                    :attributes="{style: 'text-align: products'}"/>
                                                <kendo-grid-column
                                                    :field="'slipNumber'"
                                                    :title="$t('pay_slip')"
                                                    :width="150"
                                                    :editable="()=>{ return false}"
                                                    :template="'<span>#=slipNumber#</span>'"
                                                    :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'}"/>
                                                <kendo-grid-column
                                                    :field="'paymentCode'"
                                                    :title="$t('payment_code')"
                                                    :width="170"
                                                    :editable="()=>{ return false}"
                                                    :template="'<span>#=paymentCode#</span>'"
                                                    :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'}"/>
                                                <kendo-grid-column
                                                    :field="'payDate'"
                                                    :title="$t('pay_date')"
                                                    :width="170"
                                                    :editable="()=>{ return false}"
                                                    :template="'<span>#=payDate#</span>'"
                                                    :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'}"/>
                                                <kendo-grid-column
                                                    :field="'totalBenefit'"
                                                    :title="$t('Benefit')"
                                                    :width="150"
                                                    :hidden="true"
                                                    :editable="()=>{ return false}"
                                                    :template="'<span>#=kendo.toString(totalBenefit, `n2`)#</span>'"
                                                    :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column
                                                    :field="'taxBenefit'"
                                                    :title="$t('tax_benefit')"
                                                    :width="150"
                                                    :hidden="true"
                                                    :format="'{0:#,##0.##;(#,##0.##)}'"
                                                    :editable="()=>{ return false}"
                                                    :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :width="150"
                                                    :editable="()=>{ return false}"
                                                    :template="'<span>#=kendo.toString(amount, `n2`)#</span>'"
                                                    :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column
                                                    :field="'netSalary'"
                                                    :title="$t('net_salary')"
                                                    :width="150"
                                                    :hidden="true"
                                                    :editable="()=>{ return false}"
                                                    :template="'<span>#=kendo.toString(netSalary, `n2`)#</span>'"
                                                    :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column
                                                    :field="'currency'"
                                                    :title="$t('currency')"
                                                    :width="150"
                                                    :editable="()=>{ return false}"
                                                    :template="'<span>#=currency.code#</span>'"
                                                    :headerAttributes="{
                                                    style: 'background-color: #EDF1F5; text-align: center'}"
                                                    :attributes="{style: 'text-align: center; '}"/>
                                                <kendo-grid-column
                                                    :field="'paidAmount'"
                                                    :title="$t('paid_amount')"
                                                    :width="200"
                                                    :lockable="false"
                                                    :template="'<span>#= kendo.toString(paidAmount,`n2`)#</span>'"
                                                    :editor="paidAmountEditor"
                                                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column
                                                    :field="'paymentOption'"
                                                    :title="$t('payment_option')"
                                                    :width="200"
                                                    :lockable="false"
                                                    :editor="paymentOptionEditor"
                                                    :template="'<span>#= paymentOption.name#</span>'"
                                                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column
                                                    :field="'segment'"
                                                    :title="$t('segment')"
                                                    :width="200"
                                                    :template="'<span>#= segment.name#</span>'"
                                                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column
                                                    :width="100"
                                                    :command="{iconClass: 'k-icon k-i-trash', text: ' ', click: removeRow, class: 'btn-plus'}"
                                                    :title="$t('action')"
                                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: center;'}"/>
                                            </kendo-grid>
                                    </v-col>
                                    <v-col cols="12" class="py-0">
                                        <v-row>
                                            <v-col md="4" sm="5" cols="12" class="py-0">
                                                <v-file-input class="mt-0 pt-0 "
                                                    v-model="files"
                                                    :placeholder="$t('attachment')"
                                                    multiple
                                                    prepend-icon="mdi-paperclip">
                                                    <template v-slot:selection="{ text }">
                                                        <v-chip
                                                            small
                                                            label
                                                            color="primary">
                                                            {{ text }}
                                                        </v-chip>
                                                    </template>
                                                </v-file-input>
                                            </v-col>
                                             <v-col md="4" sm="2" cols="12" class="py-0"></v-col>
                                            <v-col md="4" sm="5" cols="12" class="py-0">
                                                <v-simple-table>
                                                    <template v-slot:default>
                                                        <tbody>
                                                            <tr>
                                                                <td class="text-left text-uppercase pr-0">{{
                                                                    $t('total')
                                                                    }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right primary--text text-bold"
                                                                    id="total">
                                                                    {{amountFormat(totalNetPay)}}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col sm="6" class="py-0">
                                        <v-row>
                                            <v-col sm="6" cols="12" class="py-0">
                                                <label>{{$t('message_on_payment')}}</label>
                                                <v-textarea height="80px"
                                                    no-resize
                                                    outlined
                                                    rows="4"
                                                    v-model="messageOnPayment"
                                                />
                                            </v-col>
                                            <v-col sm="6" cols="12" class="py-0">
                                                <label>{{$t('message_on_journal')}}</label>
                                                <v-textarea height="80px"
                                                    v-model="messageOnJournal"
                                                    no-resize
                                                    outlined
                                                    rows="4"
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider class="mt-4"/>
                            <v-card outlined dense class="no_border function_footer">
                                <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="black" outlined class="mr-2 text-capitalize  black--text float-left" v-on="on">
                                            {{$t('select_template')}}
                                            <v-icon size="" class="ma-1">expand_more</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item v-for="(item, index) in templates" :key="index">
                                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-btn color="black"  class="text-capitalize  white--text float-left" @click="cancel">{{$t('cancel')}}</v-btn>
                                <!-- <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-btn class="ml-2 float-right text-capitalize  white--text"
                                                color="primary" v-on="on">
                                            {{ $t('save_option') }}
                                            <v-icon size="" class="ma-1">expand_more</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list rounded>
                                        <v-list-item-group>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title @click="saveNew">
                                                        {{ $t('save_new') }}
                                                    </v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title>{{
                                                            $t('save_close')
                                                        }}
                                                    </v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                </v-menu> -->
                                <v-btn class="float-right text-capitalize  white--text"
                                        color="primary" @click="saveClose">
                                    {{ $t('save_close') }}
                                </v-btn>
                            </v-card>
                        </v-form>
                        <LoadingMe
                            :isLoading="showLoading"
                            :fullPage="false"
                            :myLoading="true"
                            type="loading"
                       />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    import {i18n} from '@/i18n';
    import LoadingMe from "@/components/Loading";
    import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
    import kendo from "@progress/kendo-ui"
    import Helper from "@/helper.js";
    import {JournalModel,
        JournalEntryModel,
        AccountModel,
        CurrencyModel,} from "@/scripts/model/AppModels";
    const { EntityType, } = require("@/scripts/default_setup/Collections");
    const employeeHandler   = require("@/scripts/employeeHandler")
    const payrollHandler    = require("@/scripts/payrollHandler")
    const settingsHandler   = require("@/scripts/settingsHandler")
    const paymentOptionHandler = require("@/scripts/paymentOptionHandler");
    const cookieJS = require("@/cookie.js");
    const cookie = cookieJS.getCookie();
    export default {
        name: "Task",
        components: {
            'LoadingMe': LoadingMe,
            'app-datepicker' : DatePickerComponent
        },
        data: () => ({
            showLoading: false,
            template: [],
            start_date: new Date().toISOString().substr(0, 10),
            files: [],
            templates: [],
            result:  [],
            valid: true,
            employees: [],
            employeeSelect: '',
            search: null,
            totalNetPay: 0,
            totalAmountPay: 0,
            prefix:'',
            number: '',
            messageOnPayment: '',
            messageOnJournal: '',
            selectAccount: '',
            accounts: [],
            transations: [],
            paymentOption: [],
            resultPay: [],
            raw_journal: [],
            resultAR: [],
            resultPayment: [],
            payrollLiabilitie: {},
            resultJournals: [],
            payNumber:  {},
            loggedUser: {
                id: cookie.creator,
                name: cookie.email
            },
            prefix_format: ''
        }),
        methods:{
            amountFormat(value){
                return kendo.toString(value,'n2');
            },
            async loadEmployee(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        employeeHandler.center().then(res => {
                            this.showLoading = true
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.employees = res.data.data
                                this.start_date = new Date().toISOString().substr(0, 10)
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            employeeFilter(item, queryText){
                const textOne = item.name.toLowerCase()
                const textTwo = item.employeeId.toLowerCase()
                const searchText = queryText.toLowerCase()
                return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
            },
            async payrollTansactions(){
                let param ={
                    employeeUuid: this.employeeSelect.id
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        payrollHandler.getTransaction(param).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.transations = res.data.data 
                                if(this.transations.length > 0){
                                    this.payrollLiabilitie = this.transations[0].payrollLiabilitie
                                    this.loadResult()
                                    this.initData()
                                }else{
                                    this.resultAR = []
                                }                          
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            async loadResult(){
                let result = this.transations
                let resultAR = []
                 for (let i = 0; i < result.length; i ++) {
                    result[i].segment.forEach(index => {
                        let calculateNet        = (result[i].amount * index.percentage)/ 100
                        let calculateGross      = (result[i].grossSalary * index.percentage)/ 100
                        let calculateTaxBenefit = (-1 * (result[i].taxBenefit * index.percentage)/ 100) + 0.07
                        let calculateBenefit = (result[i].totalBenefit * index.percentage)/ 100 
                        let netSalary = calculateNet - calculateBenefit + calculateTaxBenefit
                        resultAR.push({
                            id:                 result[i].id,
                            amount:             result[i].amount,
                            paymentCode:        result[i].paymentCode,
                            monthOf:            result[i].monthOf,
                            employeeId:         result[i].employeeId,
                            employeeName:       result[i].employeeName,
                            location:           result[i].location,
                            natureEmployee:     result[i].natureEmployee,
                            salaryType:         result[i].salaryType,
                            payDate:            result[i].payDate,
                            payrollId:          result[i].payrollId,
                            slipNumber:         result[i].slipNumber,
                            paymentOption:      result[i].paymentOption,
                            currency:           result[i].currency,
                            payrollLiabilitie:  result[i].payrollLiabilitie,
                            netPayFull:         result[i].netPay,
                            grossSalary:        calculateGross,
                            netPay:             calculateNet,
                            netSalary:          netSalary,
                            taxBenefit:         calculateTaxBenefit,
                            totalBenefit:       calculateBenefit,
                            percentage:         index.percentage,
                            paidAmount:         calculateNet,
                            segment:            index.component
                        })
                    })
                }
                this.resultAR = resultAR
            },
            employeeChange(){
                this.payrollTansactions()
                this.laodPaymentOption()
            },
            removeRow(e) {
                e.preventDefault();
                const grid = kendo.jQuery("#grid").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                    this.initData()
                }
            },
            async initData(){
                let ds = this.$refs.dataSourcePayment.kendoWidget();
                let result = ds.data()
                let totale = 0;
                let totalNet = 0;
                result.forEach(function(r){
                    window.console.log('123456789', r)
                    if(r.paidAmount && r.paymentOption.name !== ''){
                        totale      += parseFloat(r.paidAmount)
                        totalNet    += parseFloat(r.netPay)
                    }
                })
                this.totalAmountPay = totale
                this.totalNetPay    = totalNet
                this.calculateJournal()
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
                if(this.resultPayment.length == 0){
                    let sequcencing = ''
                    if(this.payNumber.sequcencing =="Year"){
                        sequcencing = kendo.toString(new Date(this.start_date),'yyyy')
                    }else if(this.payNumber.sequcencing =="Month"){
                        sequcencing = kendo.toString(new Date(this.start_date),'yyyyMM')
                    }else{
                        sequcencing = ''
                    }
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve('resolved');
                            let data = {
                                abbr:       this.payNumber.abbr,
                                structure:  this.payNumber.structure,
                                date:       new Date(this.start_date),
                                type:       'payroll_payment',
                                pkId:       'ppm-',
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
                                }
                            })
                        }, 300);
                    })
                }else{
                    this.lastNumber = this.resultPay.lastNumber
                    this.number = this.resultPay.number
                }
            },
            zeroPad(num, places) {
                return String(num).padStart(places, '0')
            },
            saveClose(){
                let ds = this.$refs.dataSourcePayment.kendoWidget();
                let d1 = ds.data().filter(i => i.paymentOption.name !=='' && i.paidAmount > 0)
                if(d1.length > 0){
                    this.initData()
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve('resolved');
                            const result = d1.map(o => {
                                return {
                                    employeeId:         o.employeeId,
                                    employeeName:       o.employeeName,
                                    grossSalary:        o.grossSalary,
                                    id:                 o.id,
                                    amount:             o.amount,
                                    paymentCode:        o.paymentCode,
                                    payDate:            o.payDate,
                                    location:           o.location,
                                    monthOf:            o.monthOf,
                                    natureEmployee:     o.natureEmployee,
                                    netPay:             o.netPay,
                                    netSalary:          o.netSalary,
                                    paidAmount:         o.paidAmount,
                                    paymentOption:      o.paymentOption,
                                    percentage:         o.percentage,
                                    slipNumber:         o.slipNumber,
                                    salaryType:         o.salaryType,
                                    currency:           o.currency,
                                    segment:            o.segment,
                                    taxBenefit:         o.taxBenefit,
                                    totalBenefit:       o.totalBenefit,  
                                    payrollLiabilitie:  o.payrollLiabilitie,
                                    payrollId:          o.payrollId,
                                    netPayFull:         o.netPayFull,
                                }
                            })
                            let helper = {};
                            let resPay = result.reduce(function(r, o) {
                                let key = o.payrollId;
                                if(!helper[key]) {
                                    helper[key] = Object.assign({}, o); // create a copy of o
                                    r.push(helper[key]);
                                } else {
                                    helper[key].amount += o.amount;
                                }
                                return r;
                            }, []).map(a =>{
                                 return {
                                    amount:        a.amount,
                                    payrollId:     a.payrollId,
                                    netPayFull:    a.netPayFull
                                 }
                            });
                            if (result.length > 0) {
                                let data = {
                                    payment_data: {
                                        id:                   this.resultPay.id ? this.resultPay.id: '',
                                        created:              kendo.toString(new Date(this.start_date),'yyyy-MM-dd'),
                                        amountPay:            parseFloat(this.totalAmountPay),
                                        netPay:               parseFloat(this.totalNetPay),
                                        resPay:               resPay,
                                        number:               this.number,
                                        payNumber:            this.payNumber,
                                        referenceNumber:      this.payNumber.abbr+this.payNumber.numberSeparator + this.number,
                                        abbr:                 this.payNumber.abbr,
                                        method:               "payroll_payment",
                                        lastNumber:           parseInt(this.lastNumber),
                                        messageOnJournal:     this.messageOnJournal,
                                        messageOnPayment:     this.messageOnPayment,
                                        payrollLiabilitie:    this.payrollLiabilitie,
                                        paymentline:          result,
                                        employee:             this.employeeSelect,
                                    },
                                    raw_journal:              this.raw_journal,
                                    loggedUser:               this.loggedUser
                                }
                                this.showLoading = true
                                window.console.log('data', data)
                                payrollHandler.createPayment(data).then(response => {
                                    this.showLoading = true
                                    if (response.data.statusCode === 201) {
                                        this.close() 
                                    }
                                }).catch(e => {
                                    this.$snotify.error('Something went wrong')
                                    this.showLoading = false
                                    this.errors.push(e)
                                    this.close()
                                })
                            }else{
                                this.$snotify.error('Please check again')
                            }
                        }, 300);
                    })
                }else{
                     this.$snotify.error('Please check again')
                }
            },
            saveNew(){
                
            },
            close(){
                this.$router.go(-1);
                this.clear()
            },
            clear(){
                this.employeeSelect = ''
                this.start_date = ''
                this.resultAR = []
                this.messageOnPayment = ''
                this.messageOnJournal = ''
                this.totalNetPay = 0
                this.loadPrefixes()
            },
            paidAmountEditor(container, options) {
                kendo.jQuery('<input data-bind="value:' + options.field + '"/>')
                    .appendTo(container)
                    .kendoNumericTextBox({
                        decimals: 30,
                    });
            },
            paymentOptionEditor(container, options){
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
                        data: this.paymentOption,
                    })
                })
            },
            dataSourceChanged(e) {
                if (e.field) {
                    this.initData()
                }
            },
            calculateJournal(){
                let ds = this.$refs.dataSourcePayment.kendoWidget();
                let dataSource = ds.data().map(i=>{
                    return {
                        currency:           i.currency,
                        employeeId:         i.employeeId,
                        employeeName:       i.employeeName,
                        grossSalary:        i.grossSalary,
                        id:                 i.id,
                        location:           i.location,
                        monthOf:            i.monthOf,
                        paymentCode:        i.paymentCode,
                        natureEmployee:     i.natureEmployee,
                        netPay:             i.netPay,
                        netSalary:          i.netSalary,
                        paidAmount:         i.paidAmount,
                        paymentOption:      i.paymentOption,
                        payrollLiabilitie:  i.payrollLiabilitie,
                        percentage:         i.percentage,
                        slipNumber:         i.slipNumber,
                        salaryType:         i.salaryType,
                        segment:            i.segment,
                        taxBenefit:         i.taxBenefit,
                        totalBenefit:       i.totalBenefit,
                    }
                })
                let lastResult = {}
                let last_result = dataSource.reduce(function(m, n) {
                    let key = n.paymentOption.code + n.segment.name
                    if(!lastResult[key]) {
                        lastResult[key] = Object.assign({}, n); // create a copy of o
                        m.push(lastResult[key]);
                    } else {
                        lastResult[key].paidAmount          += n.paidAmount;
                        lastResult[key].totalBenefit        += n.totalBenefit;
                        lastResult[key].taxBenefit          += n.taxBenefit;
                        lastResult[key].netPay              += n.netPay;
                        lastResult[key].netSalary           += n.netSalary;
                    }
                    return m;
                }, []);
                if(last_result.length > 0){
                    let journalEntry = []
                    last_result.forEach(item=>{
                        if(item.paymentOption.name !== ''){
                            let descriptionD = item.paymentOption.account
                            journalEntry.push(
                                new JournalEntryModel({
                                    description: item.payrollLiabilitie.name,
                                    account: new AccountModel(item.payrollLiabilitie),
                                    currency: new CurrencyModel(item.currency),
                                    exchange_rate: 1,
                                    amount:           item.netPay,//Dr,
                                    class_1_uuid:     item.segment.id
                                })
                            )
                            journalEntry.push(
                                new JournalEntryModel({
                                    description: descriptionD.name,
                                    account: new AccountModel(descriptionD),
                                    currency: new CurrencyModel(item.currency),
                                    exchange_rate: 1,
                                    amount:           item.paidAmount * -1, //Cr
                                    class_1_uuid:     item.segment.id
                                })
                            )
                        }
                    })
                    let journals = []
                    let prefix_format = this.prefix_format
                    window.console.log('journalEntry',journalEntry)
                    last_result.forEach(index=>{
                        window.console.log('item',index)
                        if(index.paymentOption.name !==''){
                            let line = journalEntry.filter(i=>i.class_1_uuid == index.segment.id) 
                            journals.push(new JournalModel({
                                number:                       this.payNumber.abbr+this.payNumber.numberSeparator + this.number,
                                journal_date:                 new Date(this.start_date),//'2021-02-01',
                                created_date:                 new Date(this.start_date),
                                month_of:                     Helper.toISODate(new Date(this.start_date).toISOString().substr(0, 7)),//'2021-02-01',   
                                journal_type:                 EntityType.GENERAL_JOURNAL,
                                transaction_type:             'Payroll Payment',
                                segment_uuid:                 index.segment.id,
                                journal_entries:              line,
                                base_currency:                index.currency,
                                prefix_format:                prefix_format
                            }))
                        }
                    })
                    let result_journal = []
                    let journalUuid     = ''
                    let created_date    = ''
                    if(this.resultJournals.length > 0){
                        let jNal = this.resultJournals
                        journals.forEach(res =>{
                            let journalAR =  jNal.filter(n => n.segment_uuid = res.segment_uuid)
                            if(journalAR.length > 0){
                                journalUuid = journalAR[0].uuid
                                created_date = journalAR[0].created_date
                            }
                            result_journal.push(new JournalModel( {
                                uuid:                         journalUuid ? journalUuid: '',
                                number:                       res.number,
                                created_date:                 created_date ? created_date: '',
                                journal_date:                 res.journal_date,
                                month_of:                     res.month_of,
                                journal_type:                 res.journal_type,
                                transaction_type:             res.transaction_type,
                                segment_uuid:                 res.segment_uuid,
                                prefix_format:                res.prefix_format,
                                journal_entries:              res.journal_entries,
                                base_currency:                res.base_currency,
                            }))
                        })
                        this.raw_journal = result_journal
                    }else{
                        this.raw_journal = journals
                    }
                    // window.console.log(this.result_journal)
                }
            },
            laodPaymentOption(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        const strFilter = '?optionType=Supplier'
                        paymentOptionHandler.list(strFilter)
                        .then(res => {
                            if(res){
                                let resultPayOption = res.data
                                this.paymentOption = resultPayOption.data
                                this.showLoading = false
                            }
                        })
                    }, 300);
                })
            },
            async loadSinglePayment(){
                this.showLoading = true
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        this.showLoading = true
                        payrollHandler.getPaymentSingle(this.$route.params.id).then(res => {
                            this.showLoading = true
                            if (res.statusCode === 200) {
                                if(res.data.length > 0){
                                    this.resultPay          =  res.data[0]
                                    this.resultPayment      =  res.data
                                    this.result             =  res.data
                                    this.resultAR           = this.resultPay.paymentline
                                    window.console.log(this.resultAR)
                                    this.employeeSelect     = this.resultPay.employee
                                    this.start_date         = new Date(this.resultPay.created).toISOString().substr(0, 10)
                                    this.number             = this.resultPay.number
                                    this.messageOnPayment   = this.resultPay.messageOnPayment
                                    this.messageOnJournal   = this.resultPay.messageOnJournal
                                    this.payrollLiabilitie  = this.resultPay.payrollLiabilitie
                                    this.totalNetPay        = parseFloat(this.resultPay.amountPay)
                                    this.loadJournal()
                                    this.generateNumber()
                                    this.showLoading = false
                                }else{
                                    this.generateNumber()
                                    this.loadEmployee()
                                }
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            async loadJournal(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getPayrollJournal( this.$route.params.id).then(res => {
                            if (res.statusCode === 200) {
                                this.resultJournals = res.data
                            }
                        })
                    }, 300)
                })
            },
            cancel(){
                this.$swal({
                    title: i18n.t('msg_title_warning'),
                    text: i18n.t('msg_discard'),
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: i18n.t('cancel'),
                    confirmButtonColor: "#4d4848",
                    cancelButtonColor: "#ED1A3A",
                    confirmButtonText: i18n.t('discard'),
                }).then((result) => {
                    if (result.value) {
                        this.$router.go(-1);
                        this.clear()
                    }
                });
            }
        },
        async mounted(){
            await this.initData()
            await this.loadEmployee()
            await this.loadPrefixes()
            await this.laodPaymentOption()
            await this.loadSinglePayment()
            await this.loadJournal()
        },
        watch:{
            '$route': 'loadSinglePayment'
        },        
    };
</script>

<style scoped>
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
        border-bottom: thin solid #ddd;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
        border-top: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .v-text-field__details{
        display: none !important;
    }

@media (min-width: 1264px) {
    .container {
        max-width: 1080px !important;
    }

}

.k-dropdown {
    width: 100%;
    margin-top: 3px;
}
</style>
