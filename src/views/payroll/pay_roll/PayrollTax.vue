<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="9" cols="12" class="pt-0">
                            <h2 class="mb-0 font_20">{{$t('payroll_tax')}}</h2>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col sm="4" cols="12" class="py-0 d-flex justify-space-between">
                            <label class="mt-3 mr-1">{{$t('from')}}</label>
                           <month-picker :initialMonth="start_date" @emitMonth="start_date = $event"/>
                        </v-col>

                        <v-col sm="4" cols="12" class="py-0  d-flex justify-space-between">
                            <label class="mt-3 mr-1">{{$t('to')}}</label>
                            <month-picker :initialMonth="end_date" @emitMonth="end_date = $event" :min="start_date"/>
                        </v-col>
                        <v-col sm="2" cols="1" class="py-1">
                            <v-btn color="primary white--text text-capitalize" @click="onSearch">
                                {{$t('view')}}
                            </v-btn>
                        </v-col>
                
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <!-- <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-bold text-uppercase">{{ $t('month_of') }}</th>
                                    <th class="text-bold text-uppercase">{{$t('salary_tax')}}</th>
                                    <th class="text-bold text-uppercase">{{$t('fbt_tax')}}</th>
                                    <th class="text-bold text-uppercase">{{$t('tax_payment')}}</th>
                                    <th class="text-bold text-uppercase">{{$t('liabilities')}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="taxpayroll in taxPayroll" v-bind:key="taxpayroll.monthOf">
                                    <td>{{ dateFormat(taxpayroll.monthOf) }}</td>
                                    <td class="payroll-tax">{{ amountFormat(taxpayroll.taxSalaryUS)}}</td>
                                    <td class="payroll-tax">{{amountFormat(taxpayroll.totalTaxBenefit)}}</td>
                                    <td class="payroll-tax">{{amountFormat(taxpayroll.taxPayment ? taxpayroll.taxPayment: 0)}}</td>
                                    <td class="payroll-tax">{{amountFormat(taxpayroll.taxSalaryUS + taxpayroll.totalTaxBenefit - (taxpayroll.taxPayment ? taxpayroll.taxPayment: 0))}}</td>
                                </tr>
                                <tr>
                                    <td class="secondary white--text text-bold">{{ $t('total') }}</td>
                                    <td class="secondary white--text payroll-tax">{{amountFormat(totalTax.totalTaxSalary)}}</td>
                                    <td class="secondary white--text payroll-tax">{{amountFormat(totalTax.totalTaxFBT)}}</td>
                                    <td class="secondary white--text payroll-tax">{{amountFormat(totalTax.totalTaxPayment)}}</td>
                                    <td class="secondary white--text payroll-tax">{{amountFormat(totalTax.totalLiabilities)}}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table> -->
                    <kendo-datasource ref="payrollTaxDS"
                        :data="taxPayroll"
                        :page-size='100'
                        :group="groupDefinition"
                        :aggregate="aggregateDefinition"
                        :sort="sort"/>
                        <kendo-grid id="payrollTax" class="grid-function"
                            :data-source-ref="'payrollTaxDS'"
                            :editable="false"
                            :pageable="true"
                            :groupable="false"
                            :pageable-refresh="true"
                            :column-menu="false">
                            <kendo-grid-column
                                :width="150"
                                :field="'monthOf'"
                                :title="$t('month_of')"
                                :template="'<span>#= kendo.toString(new Date(monthOf), `y`)#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5; text-align: center;'}"
                                :group-footer-template="$t('total')"/>
                            <kendo-grid-column
                                :width="150"
                                :field="'year'"
                                :title="$t('year')"
                                :hidden="true"
                                :template="'year'"
                                :headerAttributes="{style: 'background-color: #EDF1F5; text-align: center;'}"/>
                            <kendo-grid-column
                                :width="150"
                                :field="'taxSalaryUS'"
                                :title="$t('salary_tax')"
                                :template="'<span>#= kendo.toString(taxSalaryUS || 0, `n2`)#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5; text-align: center;'}"
                                :attributes="{style: 'text-align: right;'}"
                                :group-footer-template="'<div style=text-align:right>#=kendo.toString(sum, `n2`)#</div>'"/>
                            <kendo-grid-column
                                :width="150"
                                :field="'totalTaxBenefit'"
                                :title="$t('fbt_tax')"
                                :template="'<span>#= kendo.toString(totalTaxBenefit || 0, `n2`)#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5; text-align: center;'}"
                                :attributes="{style: 'text-align: right;'}"
                                :group-footer-template="'<div style=text-align:right>#=kendo.toString(sum, `n2`)#</div>'"/>
                            <kendo-grid-column
                                :width="150"
                                :field="'taxPayment'"
                                :title="$t('tax_payment')"
                                :template="'<span>#= kendo.toString(taxPayment, `n2`)#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5; text-align: center;'}"
                                :attributes="{style: 'text-align: right;'}"
                                :group-footer-template="'<div style=text-align:right>#=kendo.toString(sum, `n2`)#</div>'"/>
                            <kendo-grid-column
                                :width="150"
                                :field="'liabilities'"
                                :title="$t('liabilities')"
                                :template="'<span>#= kendo.toString(liabilities, `n2`)#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5; text-align: center;'}"
                                :attributes="{style: 'text-align: right;'}"
                                :group-footer-template="'<div style=text-align:right>#=kendo.toString(sum, `n2`)#</div>'"/>
                            </kendo-grid>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"
                        type="loading"
                       />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
import kendo from "@progress/kendo-ui"
const payrollHandler = require("@/scripts/payrollHandler")
export default {
    data: () => ({
        showLoading: false,
        start_date: "",
        end_date: "",
        data: [],
        search:{
            start_date: "",
            end_date: ""
        },
        taxPayroll: [],
        totalTax: {
            totalTaxSalary: 0,
            totalTaxFBT: 0,
            totalTaxPayment: 0,
            totalLiabilities: 0
        },
        groupDefinition: {
			field: "year",
            title: "ddd",
			aggregates: [
				{ field: "taxSalaryUS", aggregate: "sum" },
                { field: "totalTaxBenefit", aggregate: "sum" },
				{ field: "taxPayment", aggregate: "sum" },
                { field: "liabilities", aggregate: "sum" }
			]
		},
        aggregateDefinition: [
            { field: "taxSalaryUS", aggregate: "sum" },
            { field: "totalTaxBenefit", aggregate: "sum" },
            { field: "taxPayment", aggregate: "sum" },
			{ field: "liabilities", aggregate: "sum" },
		],
    }),
    props: {},
    methods: {
        dateFormat(val){
            return kendo.toString(new Date(val),'y')
        },
        amountFormat(value){
            return kendo.toString(value,'n2')
        },
        onSearch(){
            let start_date = this.start_date
            let end_date =this.end_date
            if(end_date && start_date){
                this.search = {
                    'start_date': kendo.toString(new Date(start_date),'yyyy-MM-dd'),
                    'end_date': kendo.toString(new Date(end_date),'yyyy-MM-dd')
                }
                this.loadPayrollTax()
            }else{
                let date = new Date();
                let start_date = new Date(date.getFullYear(), 0, 1);
                let end_date = new Date(date.getFullYear(), 12, 0);
                this.search ={
                    start_date: kendo.toString(new Date(start_date),'yyyy-MM-dd'),
                    end_date: kendo.toString(new Date(end_date),'yyyy-MM-dd'),
                }
                this.loadPayrollTax()
            }
        },
        loadPayrollTax(){
            if(this.start_date == '' && this.end_date  == ''){
                let date = new Date();
                let start_date = new Date(date.getFullYear(), 0, 1);
                let end_date = new Date(date.getFullYear(), 12, 0);
                this.search ={
                    start_date: kendo.toString(new Date(start_date),'yyyy-MM-dd'),
                    end_date: kendo.toString(new Date(end_date),'yyyy-MM-dd'),
                }
            }
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    payrollHandler.getPayrollTaxList(this.search).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.taxPayroll = res.data.data
                            this.autoCalculate()
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        autoCalculate(){
            let result = this.taxPayroll
            let taxSalaryUS = 0
            let totalTaxFBT = 0
            let totalTaxPayment = 0
            let totalLiabilities = 0
            result.forEach(index=>{
                taxSalaryUS     += index.taxSalaryUS ? index.taxSalaryUS: 0
                totalTaxFBT     += index.totalTaxBenefit
                totalTaxPayment += index.totalTaxPayment ? index.totalTaxPayment: 0
            })
            totalLiabilities = taxSalaryUS + totalTaxFBT - totalTaxPayment
            this.totalTax = {
                totalTaxSalary: taxSalaryUS,
                totalTaxFBT:    totalTaxFBT,
                totalTaxPayment: totalTaxPayment,
                totalLiabilities: totalLiabilities
            }
        }
    },
    async mounted() {
        await this.loadPayrollTax()
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
        'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
    },
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

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
        border-bottom: thin solid #ddd;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }

    .v-application .primary,
    .v-application .third {
        border-color: #fff !important;
    }
    .payroll-tax{
        text-align: right !important;
    }
</style>
