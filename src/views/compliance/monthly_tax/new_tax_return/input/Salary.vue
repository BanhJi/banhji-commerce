<template>
    <v-row>
        <!-- <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0"> -->
        <v-col sm="12" cols="12" class="pt-2 px-4">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row class="">
                        <v-col sm="12" cols="12" class="pt-0">

                            <v-row>
                                <v-col sm="8" cols="12" class="py-0">
                                    <h2 class="font_22">{{ $t('salary') }}</h2>
                                </v-col>

                                <v-col sm="4" cols="12" class="py-1">
                                    <!--                                            <v-btn class="float-right capitalize white&#45;&#45;text" color="primary" >-->
                                    <!--                                                {{$t('add_new')}}-->
                                    <!--                                            </v-btn>-->
                                    <v-btn @click="onGetData" class="float-right capitalize white--text mx-2"
                                           color="primary">
                                        {{ $t('get_data') }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>

                    <v-row class="">
                        <v-col sm="12" cols="12" class="py-0">
                            <kendo-datasource ref="dataSource"
                                              :page-size='50'
                                              :data="salaryRecord"
                            />
                            <kendo-grid id="gridReceivable" class="grid-function"
                                        :data-source-ref="'dataSource'"
                                        :sortable="false"
                                        :groupable="false"
                                        :filterable="false"
                                        :column-menu="true"
                                        :editable="false"
                                        :pageable="true"
                                        :noRecords="true"
                                        :scrollable-virtual="true"
                            >
                                <kendo-grid-column
                                    :field="'reference'"
                                    :title="$t('num')"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'date'"
                                    :title="$t('date')"
                                    :template="DateTemplate"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'employee'"
                                    :title="$t('id')"
                                    :template="employeeIdTmp"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'employee'"
                                    :title="$t('name')"
                                    :attributes="{class:'text-bold'}"
                                    :template="employeeNameTmp"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'employee'"
                                    :hidden="true"
                                    :title="$t('nationality')"
                                    :template="employeeNationalityTmp"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'employee'"
                                    :hidden="true"
                                    :title="$t('type')"
                                    :template="employeeNatureTypeTmp"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>


                                <kendo-grid-column
                                    :field="'amountToPaid'"
                                    :title="$t('amountToPaid')"
                                    :template="AmountPaidTemplate"
                                    :hidden="true"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'spouse'"
                                    :title="$t('spouse')"
                                    :hidden="true"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'numMinor'"
                                    :title="$t('no_of_minor')"
                                    :hidden="true"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'taxRate'"
                                    :title="$t('tax_rate')"
                                    :hidden="true"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'amountTaxSalary'"
                                    :template="AmountTaxSalaryTemplate"
                                    :title="$t('tax_on_salary')"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'taxBenefit'"
                                    :hidden="isBenefit"
                                    :template="TotalBenefitTemplate"
                                    :title="$t('tax_benefit')"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>

                            </kendo-grid>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                :myLoading="true"
                            />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
import SalaryRecord from "@/scripts/compliance/model/Salary";
import kendo from "@progress/kendo-ui";
import {uuid} from "vue-uuid";
// import kendo from "@progress/kendo-ui";
// const $ = require("jquery")
const payrollHandler = require("@/scripts/payrollHandler")
const salaryRecord = new SalaryRecord({})
export default {
    data: () => ({
        dialog: false,
        showLoading: false,
        data: [],
        is_month: false,
        is_start_date: false,
        is_end_date: false,
        start_date: "",
        end_date: "",
        search: {
            start_date: "",
            end_date: ""
        },

        salary: salaryRecord,
        salaries: [],
        iSalary: [],
        isBenefit: true,
        // schemaDefinition: {
        //     model: {
        //         id: "id",
        //         fields: {
        //             id: {editable: false},
        //             check: {type: 'boolean'},
        //             reference: {editable: false},
        //             employee: {type: 'string'},
        //             amountTaxSalary: {type: 'number'},
        //             taxRate: {type: 'number'}
        //         }
        //     }
        // },
    }),
    props: ['monthlyReturn'],
    watch: {'salaryRecord': 'onUpdate', 'iSalaries': 'onPushSalary'},
    methods: {
        employeeNatureTypeTmp(dataItem) {
            const empNature = dataItem.employee
            if (empNature) {
                return `<span>${empNature ? empNature.natureType : ''}</span>`
            } else {
                return ``
            }
        },
        employeeNationalityTmp(dataItem) {
            const empNat = dataItem.employee
            if (empNat) {
                return `<span>${empNat ? empNat.nationality : ''}</span>`
            } else {
                return ``
            }
        },
        employeeIdTmp(dataItem) {
            const empId = dataItem.employee
            if (empId) {
                return `<span>${empId ? empId.id : ''}</span>`
            } else {
                return ``
            }
        },
        employeeNameTmp(dataItem) {
            const empName = dataItem.employee
            if (empName) {
                return `<span>${empName ? empName.name : ''}</span>`
            } else {
                return ``
            }
        },
        AmountPaidTemplate(dataItem) {
            const amountToPaid = dataItem.amountToPaid
            if (amountToPaid) {
                return `<span>${amountToPaid ? kendo.toString(amountToPaid, `n2`) : ``}</span>`
            } else {
                return ``
            }
        },
        AmountTaxSalaryTemplate(dataItem) {
            const amountTaxSalary = dataItem.amountTaxSalary
            if (amountTaxSalary) {
                return `<span>${amountTaxSalary ? kendo.toString(amountTaxSalary, `n2`) : ``}</span>`
            } else {
                return ``
            }
        },
        TotalBenefitTemplate(dataItem) {
            const taxAmountBenefit = dataItem.taxAmountBenefit
            window.console.log(taxAmountBenefit, 'total benefit')
            if (taxAmountBenefit > 0) {
                this.isBenefit = false
                return `<span>${taxAmountBenefit ? kendo.toString(taxAmountBenefit, `n2`) : ``}</span>`
            } else {
                return ``
            }
        },
        DateTemplate(dataItem) {
            const date = dataItem.date
            if (date) {
                return `<span>${date ? kendo.toString(new Date(date), `dd-MM-yyyy`) : ``}</span>`
            } else {
                return ``
            }
        },

        onUpdate() {
            this.$emit('getSalary', this.salaryRecord)
        },
        async onGetData() {
            this.showLoading = true
            const data = {
                start_date: this.monthly.monthOf + '-01',
                end_date: this.monthly.monthOf + '-31'
            }
            await payrollHandler.getTaxpay(data).then(res => {
                const result = res.data.data
                window.console.log(result, 'result salary')
                for (let i of result) {
                    this.iSalary.push({
                        id: `mr-${uuid.v1()}`,
                        date: new Date().toJSON(),
                        number: i.number,
                        reference: i.referenceNumber,
                        employee: {
                            id: i.employeeId,
                            name: i.employeeName,
                            nationality: '',
                            natureType: i.natureEmployee
                        },
                        segment: i.segment ? i.segment.component : {},
                        amountToPaid: i.salaryExchange,
                        spouse: i.spouse,
                        numMinor: i.noOfChildren,
                        taxRate: i.taxRate,
                        amountTaxSalary: i.taxSalary,
                        totalBenefit: i.benefitExchange,
                        taxAmountBenefit: i.taxBenefitExchange,
                    })
                    // i.segment.forEach(o => {
                    //
                    // })
                }
                window.console.log(this.iSalary, 'isalary')
                this.showLoading = false
                // this.dialog = true
                window.console.log(res, 'salary input')
                window.console.log('salaries', this.salaries)
            })
        },
        onPushSalary() {
            const allArray = [...this.salaries, ...this.iSalaries]
            window.console.log(allArray, 'allarray')
            this.salaries = allArray.filter((e, i) => allArray.findIndex(o => o.taxSalary === e.taxSalary && o.segmentId === e.segmentId && o.amountToPaid === e.amountToPaid && o.numMinor === e.numMinor && o.spouse === e.spouse) === i)
            const salary = JSON.parse(localStorage.getItem(this.monthly.abbr + this.monthly.number + '&Salary'))
            if (salary.length > 0) {
                if (this.salaries.length > 0) {
                    let resStorage = []
                    const r1 = this.salaries.filter(e => e.isSave === false || e.isSave === undefined)
                    const otherArray = [...r1, ...this.salaries]
                    resStorage = otherArray.filter((e, i) => allArray.findIndex(o => o.taxSalary === e.taxSalary && o.segmentId === e.segmentId && o.amountToPaid === e.amountToPaid && o.numMinor === e.numMinor && o.spouse === e.spouse) === i)
                    if (resStorage.length > 0) {
                        if (this.monthly.abbr !== '' && this.monthly.number !== '') {
                            localStorage.setItem(this.monthly.abbr + this.monthly.number + '&Salary', JSON.stringify(resStorage))
                        }
                    }
                }
            } else {
                const r1 = this.salaries.filter(e => e.isSave === false || e.isSave === undefined)
                if (this.monthly.abbr !== '' && this.monthly.number !== '') {
                    localStorage.setItem(this.monthly.abbr + this.monthly.number + '&Salary', JSON.stringify(r1))
                }
            }
            this.onUpdate()
        },
        async onloadSalary() {
            this.showLoading = true
            let data = JSON.parse(localStorage.getItem(this.monthly.abbr + this.monthly.number + '&Salary'))
            window.console.log(data, this.salaries, 'data local')
            if (data.length > 0) {
                let allArray
                if (this.salaries.length > 0) {
                    allArray = [...this.salaries, data]
                } else {
                    allArray = data
                }
                this.salaries = allArray.filter((e, i) => allArray.findIndex(o => o.taxSalary === e.taxSalary && o.segmentId === e.segmentId && o.amountToPaid === e.amountToPaid && o.numMinor === e.numMinor && o.spouse === e.spouse) === i)
            }
            window.console.log(this.salaries, 'salaries data')
            this.onUpdate()
            this.showLoading = false
        },
        onSearch() {
            this.search = {
                'start_date': this.start_date + '-01',
                'end_date': this.end_date + '-01'
            }
        }
    },
    async mounted() {
        await this.onloadSalary()
    },
    computed: {
        monthly() {
            if (this.monthlyReturn !== undefined) {
                return this.monthlyReturn
            } else {
                return {}
            }
        },
        iSalaries() {
            if (this.iSalary.length > 0) {
                return this.iSalary
            } else {
                return []
            }
        },
        salaryRecord() {
            if (this.salaries.length > 0) {
                return this.salaries
            } else {
                return []
            }
        }
    },
    components: {
        'LoadingMe': LoadingMe,
        // 'app-searchdate' : ()=> import('@/components/custom_templates/SearchDate'),
        // 'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
    },
};
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    font-size: 14px;
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    height: 37px !important;
    color: #000;
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
