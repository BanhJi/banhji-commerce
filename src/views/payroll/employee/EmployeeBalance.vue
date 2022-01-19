<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <v-row>
                        <v-col sm="8" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{$t('employee_balances')}}</h2>
                        </v-col>
                        <v-col sm="4" cols="12" class="py-0">
                            <v-autocomplete
                                v-model="employeeSelect"
                                style="padding-top: 0px"
                                :items="employees"
                                item-value="id"
                                :filter="employeeFilter"
                                item-text="name"
                                :search-input.sync="search"
                                placeholder="Start typing to Search"
                                outlined
                                clearable
                                append-icon="mdi-database-search"/>
                        </v-col>
                    </v-row>
                    <v-row class="mt-0">
                        <v-col sm="4" cols="12" class="py-0  d-flex justify-space-between">
                            <label style="margin-top: 10px; margin-right: 15px;">{{$t('as_of')}}</label>
                            <app-datepicker :initialDate="end_date" @emitDate="end_date = $event"/>
                        </v-col>

                        <v-col sm="2" cols="1" class="py-0 mt-1">
                            <v-btn color="primary white--text" @click="loadBalance">
                                {{$t('view')}}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="mt-0">
                <v-col sm="12" cols="12" class="py-0">
                    <kendo-datasource ref="dataSourceBalance"
                        :data="emploeeBalance"
                        :page-size='100'
                        :sort="sort"/>
                        <kendo-grid id="gridBalance" class="grid-function"
                            :data-source-ref="'dataSourceBalance'"
                            :editable="false"
                            :pageable="true"
                            :pageable-refresh="true"
                            :column-menu="true">
                            <kendo-grid-column
                                :width="150"
                                :field="'employeeId'"
                                :title="$t('employee_id')"
                                :template="'<span>#= employeeId#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :width="200"
                                :field="'employeeName'"
                                :title="$t('employee_name')"
                                :template="'<span>#= employeeName#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :width="150"
                                :title="$t('total')"
                                :template="'<span>#= kendo.toString(balance ? balance: 0,`n2`)#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :width="200"
                                :field="'balance'"
                                :title="$t('payroll_liabilities')"
                                :template="'<span>#=  kendo.toString(balance,`n2`)#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :width="200"
                                :hidden="true"
                                :title="$t('other_business_balance')"
                                :template="'<span>0</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :width="200"
                                :hidden="true"
                                :title="$t('business_advance')"
                                :template="'<span>0</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :width="200"
                                :title="$t('personal_advance')"
                                :template="'<span>0</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
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
import kendo from '@progress/kendo-ui'
const employeeHandler = require("@/scripts/employeeHandler")
export default {
    data: () => ({
        showLoading: false,
        end_date: '',
        emploeeBalance: [],
        param: {
            employeeUuid: '',
            end_date: kendo.toString(new Date(),'yyyy-MM-dd')
        },
        search: null,
        employees: [],
        employeeSelect: '',
        sort:[
            { field: 'employeeId', dir: 'asc' }
        ],
    }),
    props: {},
    methods: {
        async loadEmployeeBalance(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    employeeHandler.getEmployeeBalance(this.param).then(res => {
                        this.showLoading = true
                        if(res.statusCode === 200){
                            this.emploeeBalance = res.data
                            this.showLoading = false
                        }
                    }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                }, 300);
            })
        },
        async loadEmployee(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employees = []
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
        loadBalance(){       
            let employeeId = ""
            if(this.employeeSelect !== undefined || this.employeeSelect !== null || this.employeeSelect !== ''){
                employeeId = this.employeeSelect
            }
            this.param ={
                'employeeUuid': employeeId,
                'end_date': kendo.toString(this.end_date,'yyyy-MM-dd')
            }
            this.loadEmployeeBalance()
        }
    },
    async mounted() {
        await this.loadEmployeeBalance()
        await this.loadEmployee()
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
        'app-datepicker' : ()=> import('@/components/custom_templates/DatePickerComponent')
    },
    watch: {
        '$route': 'loadEmployeeBalance'
    }
};
</script>
<style scoped>
.acc_group header {
    height: 10px !important;
}

table.acc_group tr td {
    border-bottom: 1px solid #ccc;
    padding: 8px;
    vertical-align: middle;
}

table.acc_group tr td:first-child {
    font-weight: 700;
}

table.acc_group tr td:last-child {
    text-align: center;
}

.v-card__actions .v-btn.v-btn {
    padding: 0 16px;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-family: 'Niradei-Bold', serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
    color: #000 !important;
    padding: 5px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
    border-bottom: 1px solid #000 !important;
}

.function_footer {
    padding: 15px;
    display: inline-block;
}

p {
    color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
    height: 47.2px !important;
}

.text_tip {
    font-size: 9px;
    line-height: 10px;
}

@media (max-width: 576px) {

}
</style>
