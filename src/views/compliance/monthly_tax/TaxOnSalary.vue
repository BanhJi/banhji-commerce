<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="6" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{ $t('tax_on_salary') }}</h2>
                            <p class="mb-0">{{ $t('for_the_month_of') }}: <span class="text-bold">{{ monthOf }}</span></p>
                        </v-col>
                        <v-col sm="6" cols="12" class="py-0 d-flex justify-end hide_form_alert">
                            <div class="d-flex">
                                <month-picker :initialMonth="end_date" @emitMonth="end_date = $event"
                                              :min="start_date"/>
                                <v-btn class="ma-1 ml-2" color="primary white--text text-capitalize" @click="onSearch">
                                    {{ $t('view') }}
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="">
                <v-col sm="12" cols="12" class="py-0 mb-2">
                    <h2 class="mb-0 font_18">{{ $t('tax_salary_resident_employees') }}</h2>
                </v-col>
                <v-col sm="12" cols="12" class="py-0">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-bold text-uppercase grayBg">{{ $t('no') }}</th>
                                <th class="text-bold text-uppercase grayBg">{{ $t('no_of_employees') }}</th>
                                <th class="text-bold text-uppercase grayBg">{{ $t('salary_to_be_paid') }}</th>
                                <th class="text-bold text-uppercase grayBg">{{ $t('spouse') }}</th>
                                <th class="text-bold text-uppercase grayBg">{{ $t('no_of_minor') }}</th>
                                <th class="text-bold text-uppercase grayBg">{{ $t('tax_rate') }}</th>
                                <th class="text-bold text-uppercase grayBg">{{ $t('tax_on_salary') }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="">1</td>
                                <td class="text-right">{{ amountR0.numEmp }}</td>
                                <td class="text-right">{{ amountR0.amountPaid }}</td>
                                <td class="text-right">{{ amountR0.spouse }}</td>
                                <td class="text-right">{{ amountR0.numMinor }}</td>
                                <td>0%</td>
                                <td class="text-right">{{ amountR0.taxSalary }}</td>
                            </tr>
                            <tr>
                                <td class="">2</td>
                                <td class="text-right">{{ amountR5.numEmp }}</td>
                                <td class="text-right">{{ amountR5.amountPaid }}</td>
                                <td class="text-right">{{ amountR5.spouse }}</td>
                                <td class="text-right">{{ amountR5.numMinor }}</td>
                                <td>5%</td>
                                <td class="text-right">{{ amountR5.taxSalary }}</td>
                            </tr>
                            <tr>
                                <td class="">3</td>
                                <td class="text-right">{{ amountR10.numEmp }}</td>
                                <td class="text-right">{{ amountR10.amountPaid }}</td>
                                <td class="text-right">{{ amountR10.spouse }}</td>
                                <td class="text-right">{{ amountR10.numMinor }}</td>
                                <td>10%</td>
                                <td class="text-right">{{ amountR10.taxSalary }}</td>
                            </tr>
                            <tr>
                                <td class="">4</td>
                                <td class="text-right">{{ amountR15.numEmp }}</td>
                                <td class="text-right">{{ amountR15.amountPaid }}</td>
                                <td class="text-right">{{ amountR15.spouse }}</td>
                                <td class="text-right">{{ amountR15.numMinor }}</td>
                                <td>15%</td>
                                <td class="text-right">{{ amountR15.taxSalary }}</td>
                            </tr>
                            <tr>
                                <td class="">5</td>
                                <td class="text-right">{{ amountR20.numEmp }}</td>
                                <td class="text-right">{{ amountR20.amountPaid }}</td>
                                <td class="text-right">{{ amountR20.spouse }}</td>
                                <td class="text-right">{{ amountR20.numMinor }}</td>
                                <td>20%</td>
                                <td class="text-right">{{ amountR20.taxSalary }}</td>
                            </tr>
                            <tr>
                                <td class="white--text third text-uppercase">{{ $t('total') }}</td>
                                <td class="white--text third text-right">{{ amountTotal.numEmp }}</td>
                                <td class="white--text third text-right">{{ amountTotal.amountPaid }}</td>
                                <td class="white--text third text-right">{{ amountTotal.spouse }}</td>
                                <td class="white--text third text-right">{{ amountTotal.numMinor }}</td>
                                <td class="white--text third"></td>
                                <td class="white--text third text-right">{{ amountTotal.taxSalary }}</td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                    <v-col sm="12" cols="12" class="py-0 mt-4 mb-2">
                        <h2 class="mb-0 font_18">{{ $t('tax_salary_resident_non_employees') }}</h2>
                    </v-col>
                    <v-col sm="12" cols="12" class="py-0">
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th class="text-bold text-uppercase grayBg">{{ $t('no_of_employees') }}</th>
                                    <th class="text-bold text-uppercase grayBg">{{ $t('salary_to_be_paid') }}</th>
                                    <th class="text-bold text-uppercase grayBg">{{ $t('tax_rate') }}</th>
                                    <th class="text-bold text-uppercase grayBg">{{ $t('tax_on_salary') }}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="text-right">{{ amountNr20.numEmp }}</td>
                                    <td class="text-right">{{ amountNr20.amountPaid }}</td>
                                    <td>20%</td>
                                    <td class="text-right">{{ amountNr20.taxSalary }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                    <v-col sm="12" cols="12" class="py-0 mt-4 mb-2">
                        <h2 class="mb-0 font_18">{{ $t('tax_salary_fringe_benefit') }}</h2>
                    </v-col>
                    <v-col sm="12" cols="12" class="py-0">
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th class="text-bold text-uppercase grayBg">{{ $t('no_of_employees') }}</th>
                                    <th class="text-bold text-uppercase grayBg">{{ $t('salary_to_be_paid') }}</th>
                                    <th class="text-bold text-uppercase grayBg">{{ $t('tax_rate') }}</th>
                                    <th class="text-bold text-uppercase grayBg">{{ $t('tax_on_salary') }}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="text-right">{{ amountFB20.numEmp }}</td>
                                    <td class="text-right">{{ amountFB20.amountPaid }}</td>
                                    <td>20%</td>
                                    <td class="text-right">{{ amountFB20.taxSalary }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
<!--                    <v-btn color="primary" class="mt-3 float-right capitalize" outlined>-->
<!--                        <span class="black&#45;&#45;text ">{{ $t('view_detail_record') }}</span>-->
<!--                    </v-btn>-->
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"
                    />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
import kendo from "@progress/kendo-ui";
const salaryHandler = require("@/scripts/compliance/handler/salaryHandler")
export default {
    data: () => ({
        showLoading: false,
        is_month: false,
        is_start_date: false,
        is_end_date: false,
        start_date: "",
        end_date: "",

        search: {
            start_date: "",
            end_date: ""
        },
        monthOf: 'All Monthly',
        salaries: [],
    }),
    props: {},
    methods: {
        async onloadSalary() {
            this.showLoading = true
            await salaryHandler.getAll().then(res => {
                this.salaries = res.data.data
                this.showLoading = false
            })
        },
        Change() {
        },

        onSearch() {
            this.showLoading = true
            this.monthOf = kendo.toString(new Date(this.end_date), 'MMMM yyyy')
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    salaryHandler.getByMonth(this.end_date).then(res => {
                        window.console.log(res)
                        this.salaries = res.data.data
                        this.showLoading = false
                    })
                }, 200)
            })
        }
    },
    async mounted() {
        await this.onloadSalary()
    },
    computed: {
        amountTotal() {
            if (this.salaries.length > 0) {
                let amount = 0, amountTaxSalary = 0, numEmp = 0, spouse = 0, numMinor = 0
                this.salaries.filter(i => {
                    amount += i.amountToPaid
                    amountTaxSalary += i.amountTaxSalary
                    numEmp += 1
                    numMinor += kendo.parseFloat(i.numMinor)
                    spouse += i.spouse
                })
                this.$emit('getTaxSalary', amountTaxSalary)
                window.console.log(amountTaxSalary, 'amount tax salary')
                return {
                    numMinor: numMinor,
                    spouse: spouse,
                    numEmp: numEmp,
                    amountPaid: kendo.toString(amount, `n2`),
                    taxSalary: kendo.toString(amountTaxSalary, `n2`)
                }
            } else {
                return {
                    numMinor: 0,
                    spouse: 0, numEmp: 0, amountPaid: 0, taxSalary: 0
                }
            }
        },
        amountR0() {
            if (this.salaries.length > 0) {
                let amount = 0, amountTaxSalaryUS = 0, numEmp = 0, spouse = 0, numMinor = 0
                this.salaries.filter(i => {
                    if (i.employee.hasOwnProperty('natureType')) {
                        if (i.employee.natureType === "Resident") {
                            if (i.taxRate == 0) {
                                amount += i.amountToPaid
                                amountTaxSalaryUS += i.amountTaxSalary
                                numEmp += 1
                                numMinor += kendo.parseFloat(i.numMinor)
                                spouse += i.spouse
                            }
                        }
                    }
                })
                return {
                    numMinor: numMinor,
                    spouse: spouse,
                    numEmp: numEmp,
                    amountPaid: kendo.toString(amount, `n2`),
                    taxSalary: kendo.toString(amountTaxSalaryUS, `n2`)
                }
            } else {
                return {
                    numMinor: 0,
                    spouse: 0, numEmp: 0, amountPaid: 0, taxSalary: 0
                }
            }
        },
        amountR5() {
            if (this.salaries.length > 0) {
                let amount = 0, amountTaxSalaryUS = 0, numEmp = 0, spouse = 0, numMinor = 0
                this.salaries.filter(i => {
                    if (i.employee.hasOwnProperty('natureType')) {
                        if (i.employee.natureType === "Resident") {
                            if (i.taxRate == 5) {
                                amount += i.amountToPaid
                                amountTaxSalaryUS += i.amountTaxSalary
                                numEmp += 1
                                numMinor += i.numMinor
                                spouse += i.spouse
                            }
                        }
                    }
                })
                return {
                    numMinor: numMinor,
                    spouse: spouse,
                    numEmp: numEmp,
                    amountPaid: kendo.toString(amount, `n2`),
                    taxSalary: kendo.toString(amountTaxSalaryUS, `n2`)
                }
            } else {
                return {
                    numMinor: 0,
                    spouse: 0, numEmp: 0, amountPaid: 0, taxSalary: 0
                }
            }
        },
        amountR10() {
            if (this.salaries.length > 0) {
                let amount = 0, amountTaxSalary = 0, numEmp = 0, spouse = 0, numMinor = 0
                this.salaries.filter(i => {
                    if (i.employee.hasOwnProperty('natureType')) {
                        if (i.employee.natureType === "Resident") {
                            if (i.taxRate == 10) {
                                amount += i.amountToPaid
                                amountTaxSalary += i.amountTaxSalary
                                numEmp += 1
                                numMinor += i.numMinor
                                spouse += i.spouse
                            }
                        }
                    }
                })
                return {
                    numMinor: numMinor,
                    spouse: spouse,
                    numEmp: numEmp,
                    amountPaid: kendo.toString(amount, `n2`),
                    taxSalary: kendo.toString(amountTaxSalary, `n2`)
                }
            } else {
                return {
                    numMinor: 0,
                    spouse: 0, numEmp: 0, amountPaid: 0, taxSalary: 0
                }
            }
        },
        amountR15() {
            if (this.salaries.length > 0) {
                let amount = 0, amountTaxSalaryUS = 0, numEmp = 0, spouse = 0, numMinor = 0
                this.salaries.filter(i => {
                    if (i.employee.hasOwnProperty('natureType')) {
                        if (i.employee.natureType === "Resident") {
                            if (i.taxRate == 15) {
                                amount += i.amountToPaid
                                amountTaxSalaryUS += i.amountTaxSalary
                                numEmp += 1
                                numMinor += i.numMinor
                                spouse += i.spouse
                            }
                        }
                    }
                })
                return {
                    numMinor: numMinor,
                    spouse: spouse,
                    numEmp: numEmp,
                    amountPaid: kendo.toString(amount, `n2`),
                    taxSalary: kendo.toString(amountTaxSalaryUS, `n2`)
                }
            } else {
                return {
                    numMinor: 0,
                    spouse: 0, numEmp: 0, amountPaid: 0, taxSalary: 0
                }
            }
        },
        amountR20() {
            if (this.salaries.length > 0) {
                let amount = 0, amountTaxSalaryUS = 0, numEmp = 0, spouse = 0, numMinor = 0
                this.salaries.filter(i => {
                    if (i.employee.hasOwnProperty('natureType')) {
                        if (i.employee.natureType === "Resident") {
                            if (i.taxRate == 20) {
                                amount += i.amountToPaid
                                amountTaxSalaryUS += i.amountTaxSalary
                                numEmp += 1
                                numMinor += i.numMinor
                                spouse += i.spouse
                            }
                        }
                    }
                })
                return {
                    numMinor: numMinor,
                    spouse: spouse,
                    numEmp: numEmp,
                    amountPaid: kendo.toString(amount, `n2`),
                    taxSalary: kendo.toString(amountTaxSalaryUS, `n2`)
                }
            } else {
                return {
                    numMinor: 0,
                    spouse: 0, numEmp: 0, amountPaid: 0, taxSalary: 0
                }
            }
        },
        amountNr20() {
            if (this.salaries.length > 0) {
                let amount = 0, amountTaxSalaryUS = 0, numEmp = 0
                this.salaries.filter(i => {
                    if (i.employee.hasOwnProperty('natureType')) {
                        if (i.employee.natureType === "Non-Resident") {
                            if (i.taxRate == 20) {
                                amount += i.amountToPaid
                                amountTaxSalaryUS += i.amountTaxSalary
                                numEmp += 1
                            }
                        }
                    }
                })
                return {
                    numEmp: numEmp,
                    amountPaid: kendo.toString(amount, `n2`),
                    taxSalary: kendo.toString(amountTaxSalaryUS, `n2`)
                }
            } else {
                return {numEmp: 0, amountPaid: 0, taxSalary: 0}
            }
        },
        amountFB20() {
            if (this.salaries.length > 0) {
                let amount = 0, amountTaxSalaryUS = 0, numEmp = 0
                this.salaries.filter(i => {
                    if (i.totalBenefit > 0) {
                        amount += i.totalBenefit
                        amountTaxSalaryUS += i.taxAmountBenefit
                        numEmp += 1
                    }
                })
                this.$emit('getTaxBenefit', amountTaxSalaryUS)
                return {
                    numEmp: numEmp,
                    amountPaid: kendo.toString(amount, `n2`),
                    taxSalary: kendo.toString(amountTaxSalaryUS, `n2`)
                }
            } else {
                return {numEmp: 0, amountPaid: 0, taxSalary: 0}
            }
        },
    },
    components: {
        'LoadingMe': LoadingMe,
        'month-picker': () => import('@/components/custom_templates/MonthPicker')
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

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    font-size: 14px;
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    height: 37px !important;
    color: #000;
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

.border_top {
    border-top: thin solid #fff !important;
}

.v-application .primary,
.v-application .third {
    border-color: #fff !important;
}

.vat {
    text-transform: uppercase;
    color: #fff;
    font-weight: bold;
    font-family: 'Niradei-Bold' !important;
}

.amount {
    text-align: right !important;
}

.head-summary {
    text-align: right !important;
}
</style>
