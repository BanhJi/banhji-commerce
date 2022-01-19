<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t('payroll_run') }}</h2>
                                <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close
                                </v-icon>
                            </v-card>

                            <v-card outlined dense class="px-3 no_border mb-3" color="white">
                                <v-row class="grayBg">
                                    <v-col sm="4" cols="12" class="pb-0 pl-4">
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
                                        <label class="label">{{ $t("month_of") }}</label>
                                        <month-picker :initialMonth="monthOf" @emitMonth="monthOf = $event" @onChanged="monthOfChange"/>
                                    </v-col>
                                    <v-col  sm="4" cols="12" class="pb-0">
                                        <label class="label mb-0">{{ $t('number') }}</label>
                                        <v-row class="mt-1 mr-0">
                                            <v-col sm="3" cols="3" class="pt-0 pr-0">
                                                <div class="code_text text-bold">
                                                    {{prefix.abbr}}
                                                </div>
                                            </v-col>
                                            <v-col sm="7" cols="7" class="pt-0 pl-0 pr-1">
                                                <v-text-field class=" custom-border"
                                                    v-model="number"
                                                    outlined
                                                    readonly
                                                    :rules="[v => !!v || 'Number is required']"
                                                    required/>
                                            </v-col>
                                            <v-col sm="2" cols="2" class="pt-0 pr-1 pl-0">
                                                <v-icon style="width: 100%" color="black" size="30" class="border_qrcode"
                                                       >mdi-qrcode
                                                </v-icon>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-row>
                                   <v-col cols="12" sm="6">
                                        <v-row>
                                           <v-col sm="2" class="py-0">
                                               <label>{{$t('date')}}</label>
                                           </v-col>
                                           <v-col sm="6" class="py-0">
                                                <app-datepicker  :initialDate="start_date"  @emitDate="start_date = $event" hint="MM/DD/YYYY format"/>
                                           </v-col>
                                        </v-row>
                                        <v-row>
                                           <v-col sm="4" class="py-0 pr-0">
                                               <p>{{$t('approve_exchange_rate')}}</p>
                                           </v-col>
                                           <v-col sm="4" class="py-0">
                                                <h3 class="primary--text">4,050.00</h3>
                                           </v-col>
                                            <v-col sm="4" class="py-0">
                                                <v-btn class=" capitalize float-right white--text" color="primary" >
                                                    {{$t('view')}}
                                                </v-btn>
                                           </v-col>
                                        </v-row>
                                        <v-simple-table>
                                            <template v-slot:default>
                                                <tbody>
                                                    <tr>
                                                        <td class="text-bold width_200 text-uppercase">{{$t('work_day')}}</td>
                                                        <td>:</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-bold width_200 text-uppercase">{{$t('overtime_holiday')}}</td>
                                                        <td>:</td>
                                                        <td></td>
                                                    </tr>
                                                     <tr>
                                                        <td class="text-bold width_200 text-uppercase">{{$t('overtime_weekend')}}</td>
                                                        <td>:</td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                        <v-simple-table class="mt-6">
                                            <template v-slot:default>
                                                <tbody>
                                                    <tr>
                                                        <th class="text-bold text-uppercase">{{$t('payroll_component')}}</th>
                                                        <th class="text-bold text-uppercase">{{$t('amount')}}</th>
                                                        <th class="text-bold text-uppercase">{{$t('action')}}</th>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                     <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                        <v-btn class="mt-3 capitalize float-right white--text" color="primary" >
                                            {{$t('run_this_payroll')}}
                                        </v-btn>
                                   </v-col>
                                    <v-col cols="12" sm="6" class="pr-0">
                                        <v-card elevation="0" color="grayBg" class="pa-5">
                                            <h3 class="font_22 mb-3">{{$t('pay_slip_summary')}}</h3>
                                            <v-simple-table>
                                                <template v-slot:default>
                                                    <tbody>
                                                        <tr>
                                                            <td class="text-bold width_200 text-uppercase">{{$t('pay_slip_summary')}}</td>
                                                            <td>:</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-bold width_200 text-uppercase">{{$t('salary')}}</td>
                                                            <td>:</td>
                                                            <td>{{record.salary}}</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-bold width_200 text-uppercase">{{$t('deduction')}}</td>
                                                            <td>:</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-bold width_200 text-uppercase">{{$t('gross_salary')}}</td>
                                                            <td>:</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-bold width_200 text-uppercase">{{$t('benefits')}}</td>
                                                            <td>:</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-bold width_200 text-uppercase">{{$t('tax_on_salary')}}</td>
                                                            <td>:</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-bold width_200 text-uppercase">{{$t('fbt_tax')}}</td>
                                                            <td>:</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-bold text-uppercase">{{$t('net_salary')}}</td>
                                                            <td>:</td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-card>
                                   </v-col>
                                </v-row>
                            </v-card>
                            <v-divider class="mt-4"/>
                            <v-card outlined dense class="no_border function_footer">
                                <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="black" outlined class="mr-2 text-capitalize  black--text float-left">
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
                                <v-btn color="black"  class="text-capitalize  white--text float-left" >{{$t('cancel')}}</v-btn>
                                <v-btn class="ml-2 float-right text-capitalize  white--text"
                                        color="primary">
                                    {{ $t('save_option') }}
                                </v-btn>
                            </v-card>

                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import kendo from "@progress/kendo-ui";
const settingsHandler = require("@/scripts/settingsHandler")
const employeeHandler   = require("@/scripts/employeeHandler")
const payrollHandler = require("@/scripts/payrollHandler")
export default {
    name: "RunPayroll",
    components: {
         'app-datepicker' : DatePickerComponent,
         'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
    },
    data: () => ({
        template: [],
        start_date: new Date().toISOString().substr(0, 10),
        monthOf: '',
        files: [],
        templates: [],
        data:  [],
        valid: true,
        employees: [],
        employeeSelect: '',
        prefix: {},
        number: '',
        result: {
            salary: 0
        },
        search: null,
        record: {

        },
        params: {
            status: 1,
            employeeId: ''
        }
    }),
    methods:{
        async loadEmployee(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
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
        employeeFilter(item, queryText){
            const textOne = item.name.toLowerCase()
            const textTwo = item.employeeId.toLowerCase()
            const searchText = queryText.toLowerCase()
            return textOne.indexOf(searchText) > -1 ||
            textTwo.indexOf(searchText) > -1
        },
        employeeChange(){
            this.params = {
                status: 1,
                employeeId: this.employeeSelect.employeeId
            }
            this.loadEmployeeRecord(this.params)
        },
        async loadEmployeeRecord(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    employeeHandler.getRecord(this.params).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            let result      = res.data.data
                            this.record     = result[0]
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
        monthOfChange(){
            this.generateNumber()
        },
        generateNumber() {
            let resultNumber = this.result
            let month_of =  this.monthOf ? this.monthOf: new Date()
            let montOf_format = kendo.toString(new Date(month_of),'yyyy-MM-dd');
            if(montOf_format == ""){
                let month_year = kendo.toString(new Date(),'yyyy-MM-dd')
                montOf_format = month_year.setDate(1)
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        abbr: this.payNumber.abbr,
                        structure: this.payNumber.structure,
                        date: montOf_format,
                        type: 'payroll',
                        pkId: 'par-'
                    }
                    payrollHandler.getPrefixNumber(data).then(res => {
                        this.showLoading = true;
                        if(res.data.statusCode === 200){
                            const result = res.data.data
                            const lastNumber = this.zeroPad(parseInt(result.lastNumber), this.payNumber.format)
                            const number = result.suffix + this.payNumber.numberSeparator + lastNumber
                            this.lastNumber = lastNumber
                            if(resultNumber.number){
                                this.number = this.result.number
                            }else{
                                this.number = number
                            }
                        }
                    })
                }, 300);
            })
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
    },
    async mounted(){
        await this.loadEmployee()
        await this.loadPrefixes()
        await this.generateNumber()
    }
     
};
</script>

<style scoped>
   .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.primary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: #92d050 !important;
    }

    .theme--light.v-data-table {
        background-color: transparent !important;
        border-top: thin solid #ddd;
        border-bottom: thin solid #ddd;
        border-radius: 0 !important;
    }
    .width_200{
        width: 200px;
    }
    .text-bold{
        font-size: 14px !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
        border-bottom: thin solid #ddd;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
    }
     .v-data-table > .v-data-table__wrapper > table > tbody > tr > th{
        height: 32px !important;
        font-size: 14px !important;
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
