<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
              <v-card color="white" class="pa-3 no_border" elevation="0">
                    <v-row class="">
                        <v-col sm="12" cols="12" class="pt-0">
                            <v-row class="">
                                <v-col sm="12" cols="12" class="pt-0">
                                    <v-row class="">
                                    <v-col sm="10" cols="12">
                                        <h2 class="mb-0 font_20">{{ $t("employee_directory") }}</h2>
                                        <p class="mb-4">{{$t('employee_directory_desc')}}</p>
                                    </v-col>
                                        <v-col sm="4" cols="12" class="py-0">
                                            <v-text-field class="mt-1"
                                                clearable
                                                :placeholder="$t('search_directory')"
                                                outlined
                                                v-model="search"
                                            />
                                        </v-col>
                                        <v-col sm="2" cols="12" class="py-1">
                                            <v-btn color="primary" class="white--text capitalize marginTopPhone" @click="onSearch">
                                                {{$t('search')}}
                                            </v-btn>
                                        </v-col>
                                        <v-col sm="6" cols="12" class="py-1">
                                            <v-btn to="employee" color="primary" class="white--text capitalize float-right">
                                                {{$t('new_employee')}}
                                            </v-btn>
                <!--                            <v-btn outlined class="primary&#45;&#45;text mx-3 capitalize float-right">-->
                <!--                                {{$t('import')}}-->
                <!--                            </v-btn>-->
                                            <v-dialog v-model="dialogm2" max-width="500px">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn outlined class="secondary--text mx-3 capitalize float-right" color="primary" v-on="on" @click="importShow">
                                                        {{ $t('import') }}
                                                    </v-btn>
                                                </template>
                                                <v-form ref="form" v-model="valid" lazy-validation>
                                                    <v-card>
                                                        <v-card-title>{{ $t('import_employee') }}</v-card-title>
                                                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                                                        <v-divider/>
                                                        <v-card-text style="background-color: #EDF1F5; color: #333333;">
                                                            <v-row>
                                                                <v-col sm="12" cols="12" class="pb-0">
                                                                    <label class="label">{{ $t('salary_account') }}</label>
                                                                    <v-select class="mt-1"
                                                                            v-model="impSalaryAcc"
                                                                            :items="accSalaries"
                                                                            item-value="id"
                                                                            :item-text="item =>`${item.number} - ${item.name}`"
                                                                            return-object
                                                                            placeholder="Account Salary"
                                                                            :rules="[v => !!v || $t('field_is_required')]"
                                                                            tage="Account Salary"
                                                                            outlined>
                                                                    </v-select>

                                                                    <label class="label">
                                                                        {{$t('salary_advance_account')}}
                                                                    </label>
                                                                    <v-select
                                                                        class="mt-1"
                                                                        v-model="impAdvanceSalary"
                                                                        :items="accAdvanceSalaries"
                                                                        item-value="id"
                                                                        :item-text="item =>`${item.number} - ${item.name}`"
                                                                        return-object
                                                                        :rules="[v => !!v || $t('field_is_required')]"
                                                                        placeholder="Account Advance Salary"
                                                                        tage="Account Advance Salary"
                                                                        outlined>
                                                                    </v-select>
                                                                    <label class="label">
                                                                        {{$t('payroll_liabilities')}}</label>
                                                                    <v-select class="mt-1"
                                                                            v-model="impPayrollAcc"
                                                                            :items="accPayroll"
                                                                            item-value="id"
                                                                            :item-text="item =>`${item.number} - ${item.name}`"
                                                                            return-object
                                                                            :rules="[v => !!v || $t('field_is_required')]"
                                                                            placeholder="Account Payroll Liabilities"
                                                                            tage="Account Payroll Liabilities"
                                                                            outlined>
                                                                    </v-select>
                                                                    <v-row>
                                                                        <v-col sm="6" cols="6" class="pb-0">
                                                                            <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
                                                                        </v-col>
                                                                        <v-col sm="6" cols="6" class="pb-0">
                                                                            <v-btn outlined class="secondary--text  capitalize float-right" href="/files/member.xlsx" download>
                                                                                <span class="">{{$t('download_file')}}</span>
                                                                            </v-btn>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card-text>
                                                        <v-divider/>
                                                        <v-col sm="12" cols="12" class="py-0">
                                                            <v-card-actions class="pa-4">
                                                                <v-row>
                                                                    <v-col sm="6" cols="6" class="py-0 pl-0">
                                                                        <v-btn color="black"
                                                                            outlined
                                                                            class=" text-capitalize black--text float-left"
                                                                            @click="dialogm2 = false">{{ $t('cancel') }}
                                                                        </v-btn>
                                                                    </v-col>
                                                                    <v-col sm="6" cols="6" class="py-0 pr-0">
                                                                        <v-btn color="secondary"
                                                                            class="px-3  white--text text-capitalize float-right"
                                                                            @click="saveImport">
                                                                            {{ $t('save_close') }}
                                                                        </v-btn>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-card-actions>
                                                        </v-col>
                                                    </v-card>
                                                </v-form>
                                            </v-dialog>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>

                            <v-row class="">
                                <v-col sm="12" cols="12" class="py-0">
                                    <kendo-datasource ref="dataSource"
                                        :data="recordList"
                                        :page-size='100'
                                        :sort="sort"
                                        />
                                        <kendo-grid id="grid" class="grid-function"
                                            :data-source-ref="'dataSource'"
                                            :scrollable-virtual="true"
                                            :column-menu="false"
                                            :pageable="true">
                                        <kendo-grid-column
                                            :field="'employeeId'"
                                            :title="$t('employee_id')"
                                            :width="150"
                                            :template="'<span>#= employee.employeeId#</span>'"
                                            :headerAttributes="{
                                                style: 'background-color: #EDF1F5'
                                            }"/>
                                        <kendo-grid-column
                                            :field="'employee'"
                                            :title="$t('employee')"
                                            :width="200"
                                            :template="'<span>#= employee.firstName# - #= employee.lastName#</span>'"
                                            :headerAttributes="{
                                                style: 'background-color: #EDF1F5'
                                            }"/>
                                        <!-- <kendo-grid-column
                                            :field="'employeeType'"
                                            :title="$t('employee_type')"
                                            :width="150"
                                            :template="'<span>#= employee.employeeType.name ? employee.employeeType.name: ``#</span>'"
                                            :headerAttributes="{
                                                style: 'background-color: #EDF1F5'
                                            }"/> -->
                                        <kendo-grid-column
                                            :field="'position'"
                                            :title="$t('department')"
                                            :width="200"
                                            :template="'<span>#= position.department.name ? position.department.name: ``#</span>'"
                                            :headerAttributes="{
                                                style: 'background-color: #EDF1F5'
                                            }"/>
                                        <kendo-grid-column
                                            :field="'position'"
                                            :title="$t('position')"
                                            :width="150"
                                            :template="'<span>#= position.name#</span>'"
                                            :headerAttributes="{
                                                style: 'background-color: #EDF1F5'
                                            }"/>
                                        <!-- <kendo-grid-column
                                            :field="'maritalStatus'"
                                            :title="$t('status')"
                                            :width="100"
                                            :template="'<span>#= maritalStatus.name || `` #</span>'"
                                            :headerAttributes="{
                                                style: 'background-color: #EDF1F5'
                                            }"/> -->
                                        <kendo-grid-column
                                            :field="''"
                                            :title="$t('action')"
                                            :width="100"
                                            :visible="true"
                                            :command="[{iconClass: 'k-icon k-i-view', text: 'VIEW', click: goView }]"
                                            :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                            :attributes="{ style: 'text-align: right'}"/> 
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
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
const employeeHandler = require("@/scripts/employeeHandler")
import kendo from "@progress/kendo-ui";
import UploadExcelComponent from '@/components/upload_excel/TimeCard.vue';
import customerHandler from "@/scripts/customerHandler";
import accountHandler from "@/scripts/handler/accounting/account";
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
export default {
    data: () => ({
        valid: true,
        dialogm2: false,
        showLoading: false,
        start_date: "",
        end_date: "",
        recordList: [],
        take: 10,
        sort:[
            { field: 'employeeId', dir: 'asc' }
        ],
        search: '',
        loggedUser: {
            id: cookie.creator,
            name: cookie.email
        },
        accAdvanceSalaries: [],
        accSalaries: [],
        accPayroll: [],
        impSalaryAcc: {},
        impAdvanceSalary: {},
        impPayrollAcc: {}
    }),
    props: {},
    methods: {
        importShow(){
            //
            if(this.accSalaries.length > 0){
                this.impSalaryAcc = this.accSalaries[0]
            }
            if(this.accAdvanceSalaries.length > 0){
                this.impAdvanceSalary = this.accAdvanceSalaries[0]
            }
            if(this.accPayroll.length > 0){
                this.impPayrollAcc = this.accPayroll[0]
            }
        },
        saveImport(){
            if(this.tableData.length > 0) {
                let data ={
                    data: this.tableData
                }
                this.showLoading = true
                window.console.log(data, 'here data')
                customerHandler.importEmpCreate(data).then(response => {
                    this.showLoading = false
                    if (response.data.statusCode === 201) {
                        this.$refs.form.reset()
                        this.$snotify.success('Successfully')
                        this.dialogm2 = false
                    }
                }).catch(e => {
                    this.showLoading = false
                    this.$snotify.error('Something went wrong')
                    this.errors.push(e)
                })
            }
        },
        beforeUpload(file) {
            const isLt1M = file.size / 1024 / 1024 < 1
            if (isLt1M) {
                return true
            }
            this.$message({
                message: 'Please do not upload files larger than 1m in size.',
                type: 'warning'
            })
            return false
        },
        handleSuccess({ results, header }) {
            results.forEach(element => {
                element.employeeType = {
                    "id": "98c3ce4a-3b85-11eb-adc1-0242ac120002",
                    "name": "Full-time"
                }
                if(element.maritalStatus == 'Single'){
                    element.maritalStatus = {id: "0786df44-3b85-11eb-adc1-0242ac120002", name: 'Single' }
                }else if(element.maritalStatus == 'Engaged') {
                    element.maritalStatus = {id: '0786e462-3b85-11eb-adc1-0242ac120002', name: 'Engaged'}
                }else if(element.maritalStatus == 'Married') {
                    element.maritalStatus = {id: '0786e57a-3b85-11eb-adc1-0242ac120002', name: 'Married'}
                }else if(element.maritalStatus == 'Divorced') {
                    element.maritalStatus = {id: '0786e656-3b85-11eb-adc1-0242ac120002', name: 'Divorced'}
                }else if(element.maritalStatus == 'Widowed') {
                    element.maritalStatus = {id: '0786e728-3b85-11eb-adc1-0242ac120002', name: 'Widowed'}
                }
                element.identityType = "ID Card"
                element.salaryAcc = this.impSalaryAcc
                element.salaryAdvanceAcc = this.impAdvanceSalary
                element.payrollLiabilitie = this.impPayrollAcc
                if(element.country == 'Cambodia'){
                    element.country = {country: 'Cambodia', abbreviation: 'KH'}
                }
                if(element.nationality == 'Cambodian'){
                    element.nationality = {
                        numCode: "116",
                        alpha2Code: "KH",
                        alpha3Code: "KHM",
                        nameEn: "Cambodian",
                        nameKm: "ខ្មែរ"
                    }
                }
                if(element.paymentPeriod == 'monthly'){
                    element.paymentPeriod = {id: "98c3d49e-3b85-11eb-adc1-0242ac120002", name: "monthly"}
                }
                element.loggedUser = this.loggedUser
                element.status = 1
                element.saveOption = 'imported'
            });
            this.tableData = results
            this.tableHeader = header
            window.console.log(this.tableData, this.tableHeader, 'dataaaaa')
        },
        async loadRecord(){
            let param ={
                'status': 1,
                'search': this.search
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    employeeHandler.getRecord(param).then(res => {
                        if(res.data.statusCode === 200){
                            this.showLoading = false
                            this.recordList = res.data.data
                        }
                    })
                }, 300);
            })
        },
        goView(e){
            e.preventDefault();
            let grid = kendo.jQuery("#grid").data("kendoGrid");
            let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
            window.console.log(dataItem)
            this.$router.push({
                    path: 'employment_history' + `/${dataItem.employee.id}` + `/${dataItem.id}`,
                    params: {id: dataItem.id},
                    query: {type: 'edit'}
                })
        },
        onSearch() {
            this.showLoading = true
            this.loadRecord()
        },
        async loadAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    accountHandler.getAll().then(res => {
                        this.showLoading = false
                        //Receivable Account
                        this.accAdvanceSalaries = res.data.filter(m => m.account_type.number === 6).map(item => {
                            return {
                                id: item.uuid,
                                uuid: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code,
                                account_type: item.account_type
                            }
                        })
                        if (this.accAdvanceSalaries.length > 0) {
                            this.mAccAdvanceSalary = this.accAdvanceSalaries[0]
                        }
                        this.accSalaries = res.data.filter(m => m.account_type.number === 34).map(item => {
                            return {
                                id: item.uuid,
                                uuid: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code,
                                account_type: item.account_type
                            }
                        })
                        if (this.accSalaries.length > 0) {
                            // this.mAccSalary = this.accSalaries[0]
                            let accSalary = this.accSalaries.filter(i => i.number == '634010')
                            if(accSalary.length > 0){
                                this.mAccSalary = accSalary[0]
                            }else{
                                this.mAccSalary = this.accSalaries[0]
                            }
                        }

                        this.accPayroll = res.data.filter(m => m.account_type.number === 22).map(item => {
                            return {
                                id: item.uuid,
                                uuid: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code,
                                account_type: item.account_type
                            }
                        })
                        if (this.accPayroll.length > 0) {
                            this.mAccPayroll = this.accPayroll[0]
                        }
                    })
                }, 300);
            })
        },
    },
    async mounted() {
        await this.loadRecord()
        await this.loadAccount()
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
        'upload-excel-component':UploadExcelComponent,
    },
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
    .marginTopPhone{
        margin-top:-10px;
    }
    
}
</style>
