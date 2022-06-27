<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t('employment_history') }}</h2>
                                <v-icon
                                    @click="close()"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right">close
                                </v-icon>
                            </v-card>
                            <v-card outlined dense class="px-3 no_border" color="grayBg" height="173px">
                                <v-row>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t('employee_name') }}</label>
                                        <v-text-field class="mt-1"
                                            outlined
                                            v-model="employeeName"
                                            tage="Employee Name"
                                            readonly
                                            required/>
                                        <label class="label">{{ $t('nature_of_the_record') }}</label>
                                        <v-select class="mt-1"
                                            outlined
                                            :items="natureRecord"
                                            item-text="name"
                                            item-value="id"
                                            v-model="natureRecordSelected"
                                            tage="Nature of the Record"
                                            :rules="[v => !!v || $t('bank_name_require')]"
                                            return-object/>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{$t('date')}}</label>
                                        <app-datepicker :initialDate="recordDate"
                                            @emitDate="recordDate = $event"/>
                                        <label class="label">{{ $t('business_unit_branch') }}</label>
                                        <v-select class="mt-1"
                                            outlined
                                            :items="location"
                                            item-text="name"
                                            item-value="id"
                                            v-model="locationSelected"
                                            tage="Business Unit/Branch"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            return-object/>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t('nature_of_the_contract') }}</label>
                                        <v-select class="mt-1"
                                            outlined
                                            :items="natureContract"
                                            item-text="name"
                                            item-value="id"
                                            v-model="natureContractSelected"
                                            tage="Nature of the Contract"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            return-object/>
                                        <label class="label">{{ $t('position') }}</label>
                                        <v-select class="mt-1"
                                            outlined
                                            :items="position"
                                            item-text="name"
                                            item-value="id"
                                            v-model="positionSelected"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            tage="Position"
                                            return-object/>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card outlined dense class="px-3" color="white">
                                <v-row>
                                    <v-col class="pb-0" sm="3" cols="12">
                                        <v-row class="border_grey">
                                            <v-col sm="12" cols="12" class="my_box_min_heihgt pa-0">
                                                <h2 class="mb-2 font_20 ">
                                                    {{ $t("salary_information") }}
                                                </h2>
                                                <p class="mb-3">{{$t('salary_information_desc')}}</p>
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <label class="label">{{ $t('salary_type') }}</label>
                                                         <v-select class="mt-1"
                                                            outlined
                                                            :items="salaryType"
                                                            v-model="salaryTypeSelected"
                                                            @change="changeSalaryType"
                                                            :rules="[v => !!v || $t('field_is_required')]"
                                                            tage="Salary Type"/>
                                                        <label class="label mb-0">{{ $t('salary') }} {{salaryPer}}</label>
                                                        <v-text-field class="mt-1"
                                                            outlined
                                                            :rules="[v => !!v || $t('field_is_required')]"
                                                            v-model="employmentRecord.salary"/>
                                                        <label class="label mb-0">{{ $t('nature') }}</label>
                                                        <v-select class="mt-1"
                                                            outlined
                                                            :items="natureSalary"
                                                            item-text="name"
                                                            item-value="id"
                                                            v-model="natureSalarySelected"
                                                            :rules="[v => !!v || $t('field_is_required')]"
                                                            tage="Nature Of Salary"
                                                            return-object/>
                                                        <label class="label mb-0">{{ $t('salary_currency') }}</label>
                                                        <v-select class="mt-1"
                                                            outlined
                                                            :items="currencyList"
                                                            item-text="name"
                                                            item-value="id"
                                                            v-model="currencySelected"
                                                            :rules="[v => !!v || $t('field_is_required')]"
                                                            tage="currencySelector"
                                                            return-object/>
                                                        <label class="label mb-0">{{ $t('employee_group') }}</label>
                                                        <v-select class="mt-1"
                                                            outlined
                                                            :items="groups"
                                                            :item-text="item =>`${item.groupCode} - ${item.groupName}`"
                                                            item-value="id"
                                                            v-model="group"
                                                            clearable
                                                            tage="currencySelector"/>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col class="pb-0" sm="6" cols="12">
                                        <v-row class="border_grey">
                                            <v-col sm="12" cols="12" class="py-0">
                                                <h2 class="mb-2 font_20 ">
                                                    {{ $t("Segment") }}
                                                </h2>
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <kendo-datasource ref="dataSourceSegment"
                                                            :schema-model-fields="schemaModelFields"
                                                            :data="segmentList"/>
                                                        <kendo-grid id="gridSegment" class="grid-function"
                                                                :data-source-ref="'dataSourceSegment'"
                                                                :editable="true"
                                                                :navigatable="true"
                                                                :scrollable-virtual="true">
                                                            <kendo-grid-column
                                                                :field="'salaryAccount'"
                                                                :title="$t('account')"
                                                                :width="100"
                                                                :template="'<span>#=salaryAccount.name#</span>'"
                                                                :editor="accountDropDownEditor"
                                                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                            <kendo-grid-column
                                                                :field="'component'"
                                                                :title="$t('segment')"
                                                                :width="100"
                                                                :template="'<span>#=component.name#</span>'"
                                                                :editor="segmentDropDownEditor"
                                                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                            <kendo-grid-column
                                                                :field="'percentage'"
                                                                :title="$t('percentage')"
                                                                :width="100"
                                                                :template="'<span>#= percentage# %</span>'"
                                                                :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                                :attributes="{style: 'text-align: right;'}"/>
                                                             <kendo-grid-column
                                                                :width="60"
                                                                :command="{ iconClass: 'k-icon k-i-trash', text: ' ', click: removeSegment, class: 'btn-plus' }"
                                                                :title="$t('action')"
                                                                :headerAttributes="{style: 'text-align: center; background-color: #EDF1F5'}"
                                                                :attributes="{style: 'text-align: center'}"/>
                                                        </kendo-grid>
                                                        <v-btn color="primary"
                                                                class="float-left rounded-0 white--text mt-3"
                                                                @click="addSegment">
                                                            <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row class="border_grey">
                                            <v-col sm="12" cols="12" class="py-0">
                                                <h2 class="mb-2 font_20 ">
                                                    {{ $t("employee_benefits") }}
                                                </h2>
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <kendo-datasource ref="dataSource"
                                                            :data="BenefiteList"/>
                                                        <kendo-grid id="gridBenefit" class="grid-function"
                                                                    :data-source-ref="'dataSource'"
                                                                    :editable="true"
                                                                    :scrollable-virtual="true">
                                                            <!-- <kendo-grid-column
                                                                :field="'segment'"
                                                                :title="$t('segment')"
                                                                :width="100"
                                                                :template="'<span>#=segment.name#</span>'"
                                                                :editor="segmentBenefiteDropDownEditor"
                                                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/> -->
                                                            <kendo-grid-column
                                                                :field="'component'"
                                                                :title="$t('benefits')"
                                                                :width="100"
                                                                :template="'<span>#=component.name#</span>'"
                                                                :editor="benefitDropDownEditor"
                                                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                            <kendo-grid-column
                                                                :field="'amount'"
                                                                :title="$t('amount')"
                                                                :width="100"
                                                                :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                                                             <kendo-grid-column
                                                                :width="60"
                                                                :command="{ iconClass: 'k-icon k-i-trash', text: ' ', click: removeBenifit, class: 'btn-plus' }"
                                                                :title="$t('action')"
                                                                :headerAttributes="{style: 'text-align: center; background-color: #EDF1F5'}"
                                                                :attributes="{style: 'text-align: center'}"/>
                                                        </kendo-grid>
                                                        <v-btn color="primary"
                                                                class="float-left rounded-0 white--text mt-3"
                                                                @click="addRow">
                                                            <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col class="pb-0" sm="3" cols="12">
                                        <v-row class="border_grey">
                                            <v-col sm="12" cols="12" class="py-0">
                                                <h2 class="mb-2 font_20 ">
                                                    {{ $t("attachment") }}
                                                </h2>
                                                <p class="mb-3">{{$t('related_document_to')}}</p>
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <v-file-input
                                                            accept="image/*"
                                                            label="Attachment"/>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col sm="12" cols="12">
                                                         <label class="label">{{$t('workday_start_on')}}</label>
                                                        <v-select
                                                            outlined
                                                            :items="workDay"
                                                            item-text="name"
                                                            item-value="id"
                                                            tage="Workday Start on"
                                                            v-model="workDaySelected"
                                                            :rules="[v => !!v || $t('field_is_required')]"
                                                            return-object/>
                                                    </v-col>
                                                    <v-col sm="12" cols="12">
                                                        <label class="label">{{$t('starting_time')}}</label>
                                                        <v-select
                                                            outlined
                                                            :items="startingTime"
                                                            item-text="name"
                                                            item-value="id"
                                                            v-model="startingTimeSelected"
                                                            :rules="[v => !!v || $t('field_is_required')]"
                                                            tage="Starting time"/>
                                                    </v-col>
                                                    <v-col sm="8" cols="12" style="margin:auto; margin-top: -5px;">
                                                        <label class="label">{{$t('applying_overtime')}}</label>
                                                    </v-col>   
                                                    <v-col sm="3" cols="12" style="margin:auto; margin-top: -25px;">
                                                        <v-checkbox
                                                            v-model="applyOvertime">
                                                        </v-checkbox>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider/>
                            <v-card outlined dense class="no_border function_footer">
                                <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-btn  outlined class="mr-2 text-capitalize  black--text float-left" v-on="on">
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
                                <v-btn color="primary" class="float-right white--text text-capitalize " @click="onSaveClose">
                                    {{$t('save_print')}}
                                </v-btn>
                            </v-card>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>
    import EmploymentRecord from "@/scripts/model/EmploymentRecord";
    import DatePickerComponent from '@/components/custom_templates/DatePickerComponent';
    import kendo from "@progress/kendo-ui";
    const currencyHandler = require("@/scripts/currency/handler/currencyHandler")   
    const accountHandler = require("@/scripts/handler/accounting/account")     
    const locationHandler = require("@/scripts/locationHandler")
    const payrollHandler  = require('@/scripts/payrollHandler')
    const employeeHandler = require("@/scripts/employeeHandler")
    const settingsHandler = require("@/scripts/settingsHandler")
    const employmentModel = new EmploymentRecord({})
    const cookieJS = require("@/cookie.js");
    const cookie = cookieJS.getCookie();
    export default {
        name: "AddEmploymentRecord",
        props: ['id'],
        components: {
            LoadingMe: () => import(`@/components/Loading`),
            'app-datepicker': DatePickerComponent,
        },
        data: () => ({
            templates: [],
            showLoading: true,
            compeletLoading: false,
            position: [],
            location: [],
            segmentList: [],
            recordDate: kendo.toString(new Date(), 'yyyy-MM-dd'),
            employee: {},
            employment_id:'', 
            employmentRecord: employmentModel,
            applyOvertime: false,
            BenefiteList:[],
            componentType: [],
            locationSelected: '',
            segmentSelected: '',
            segments:   '',
            segment:    [],
            natureRecordSelected: {id: "new_employment", name: "New Employment"},
            natureContractSelected: {id: "fixed_duration_contract", name: "Fixed Duration Contract"},
            currencySelected:   '',
            workDaySelected:'',
            positionSelected: '',
            salaryTypeSelected: 'Monthly',
            natureSalarySelected: {id: "gross_amount", name: "Gross Amount"},
            startingTimeSelected: '',
            employeeName: '',
            currencyList: [],
            salaryType:[
                'Hourly',
                'Monthly'
            ],
            salaryPer: 'per Month',
            natureSalary:[
                {id: "gross_amount", name: "Gross Amount"},
                {id: "net_amount", name: "Net Amount"}
            ],
            natureContract:[
                {id: "fixed_duration_contract", name: "Fixed Duration Contract"},
                {id: "undetermined_duration_contract", name: "Undetermined Duration Contract"},
                {id: "contractd", name: "Contracted"}
            ],
            natureRecord:[
                {id: "new_employment", name: "New Employment"},
                {id: "promotion", name: "Promotion"},
                {id: "salary_increase", name: "Salary Increase"},
                {id: "resignatio", name: "Resigntion"}
            ],
            workDay:[
                {id: "1", name: "Monday"},
                {id: "2", name: "Tursday"},
                {id: "3", name: "Wednesday"},
                {id: "4", name: "Thursday"},
                {id: "5", name: "Friday"},
                {id: "6", name: "Saturday"},
                {id: "7", name: "Sunday"}
            ],
            startingTime:[
                {id: 1, name: "1:00"},
                {id: 2, name: "2:00"},
                {id: 3, name: "3:00"},
                {id: 4, name: "4:00"},
                {id: 5, name: "5:00"},
                {id: 6, name: "6:00"},
                {id: 7, name: "7:00"},
                {id: 8, name: "8:00"},
                {id: 9, name: "9:00"},
                {id: 10, name: "10:00"},
                {id: 11, name: "11:00"},
                {id: 12, name: "12:00"},
                {id: 13, name: "13:00"},
                {id: 14, name: "14:00"},
                {id: 15, name: "15:00"},
                {id: 16, name: "16:00"},
                {id: 17, name: "17:00"},
                {id: 18, name: "18:00"},
                {id: 19, name: "19:00"},
                {id: 20, name: "20:00"},
                {id: 21, name: "21:00"},
                {id: 22, name: "22:00"},
                {id: 23, name: "23:00"},
                {id: 24, name: "24:00"},
            ],
            schemaModelFields: {
                segment: { editable: true },
                amount: { type: 'number'},
                percentage: { type: 'number', validation: { required: true, min: 0 , max: 100, defaultValue: 100}}
            },
            percentage: 0,
            mAccSalary: {},
            mSegments: {},
            accSalaries: [],
            segmentAR: [],
            loggedUser: {
                id: cookie.creator,
                name: cookie.email
            },
            group: "",
            groups: [],
        }),
        methods: {
            addRow() {
                let ds = this.$refs.dataSource.kendoWidget(),
                    total = ds.total();
                ds.insert(total, {
                    segment: {
                        name: "-- Select --"
                    },
                    component: {
                        name: "-- Select --"
                    },
                    amount: 0
                })
            },
            removeBenifit(e) {
                e.preventDefault();
                const grid = kendo.jQuery("#gridBenefit").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                }
            },
            addSegment(){
                let dsSegment = this.$refs.dataSourceSegment.kendoWidget(),
                totalS = dsSegment.total();
                dsSegment.insert(totalS, {
                    component: {
                        name:       this.mSegments.name,
                        id:         this.mSegments.id,
                        code:       this.mSegments.code,
                        subOf:      this.mSegments.subOf,
                        createdAt:  this.mSegments.createdAt
                    },
                    salaryAccount: {
                        name:           this.mAccSalary.name,
                        id:             this.mAccSalary.id,
                        account_type:   this.mAccSalary.account_type,
                        banhjiAccCode:  this.mAccSalary.banhjiAccCode,
                        group_code:     this.mAccSalary.group_code,
                        is_taxable:     this.mAccSalary.is_taxable,
                        local_name:     this.mAccSalary.local_name,
                        number:         this.mAccSalary.number,
                        parent_account: this.mAccSalary.parent_account,
                        type_code:      this.mAccSalary.type_code,
                        uuid:           this.mAccSalary.uuid
                    },
                    percentage: 100
                })
            },
            removeSegment(e) {
                e.preventDefault();
                const grid = kendo.jQuery("#gridSegment").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                }
            },
            async loadSegment() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        this.segments = []
                        settingsHandler.getSeg().then(res => {
                            this.showLoading = true
                            if (res.data.statusCode === 200) {
                                this.segments = res.data.data
                                if (this.segments.length > 0) {
                                    this.mSegments = this.segments[0]
                                    this.addSegment()
                                    this.showLoading = false
                                }
                            }
                        })
                    }, 300)
                })
            },
            async loadCurrency() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        currencyHandler.getAll().then(res => {
                            this.currencyList = res.data.data
                        })
                    }, 300)
                })
            },
            async loadPosition(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getPosition().then(res => {
                            this.position = res
                        })
                    }, 300);
                })
            },
            async loadLocation() {
                 new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        locationHandler.list().then(res => {
                            if(res.data.statusCode === 200){
                                this.location = res.data.data
                            }
                        })
                    }, 300);
                })
            },
            async loadComponent() {
                 new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getComponent().then(res => {
                            this.componentType = res.data.data.filter(m => m.compoType.name === 'Benefits')
                        })
                    }, 300);
                })
            },
            async loadAccount() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        accountHandler.getAll().then(res => {
                            this.showLoading = false
                            //Receivable Account
                            if(res.data.length > 0){
                                this.accSalaries = res.data.filter(
                                    m => m.account_type.number === 12 ||
                                    m.account_type.number === 33 ||
                                    m.account_type.number === 34 ||
                                    m.account_type.number === 35 ||
                                    m.account_type.number === 36 ||
                                    m.account_type.number === 37 ||
                                    m.account_type.number === 38 ||
                                    m.account_type.number === 39 ||
                                    m.account_type.number === 40 ||
                                    m.account_type.number === 41 ||
                                    m.account_type.number === 42 ||
                                    m.account_type.number === 43 ||      
                                    m.account_type.number === 44).map(item => {
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
                                    let accountDefault =  this.accSalaries.filter(n => n.name =="Salary").map(item => {
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
                                    if(accountDefault.length > 0){
                                        this.mAccSalary = accountDefault[0]
                                    }else{
                                        this.mAccSalary = this.accSalaries[0]
                                    }
                                }
                            }
                            this.loadSingleEmployee()
                        })
                    }, 300);
                })
            },
            segmentBenefiteDropDownEditor(container, options){
                kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 400,
                    dataTextField: "name",
                    dataValueField: "name",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.segments,
                    })
                })
            },
            benefitDropDownEditor(container, options) {
                kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 400,
                    dataTextField: "name",
                    dataValueField: "name",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.componentType,
                    })
                })
            },
            segmentDropDownEditor(container, options){
                kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 400,
                    dataTextField: "name",
                    dataValueField: "name",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.segments,
                    })
                })
            },
            accountDropDownEditor(container, options){
                kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 400,
                    dataTextField: "name",
                    dataValueField: "name",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.accSalaries,
                    })
                })
            },
            async onSaveClose() {
                if (!this.$refs.form.validate()) {
                    this.$refs.form.validate()
                    return
                }
                let baSalary    = this.employmentRecord.salary
                let segmentDS = this.$refs.dataSourceSegment.kendoWidget()
                let segment = segmentDS.data()
                if(segment.length > 0 ){
                    let segmentAR = []
                    let segmentSalary = 0
                    let totalPercentage = 0
                    segment.map(index => {
                        segmentSalary =  (baSalary * index.percentage)/ 100
                        totalPercentage += parseFloat(index.percentage)
                        segmentAR.push({
                            salaryAccount:      index.salaryAccount,
                            component:          index.component,
                            percentage:         parseFloat(index.percentage),
                            Salary:             segmentSalary
                        })
                    })
                    if(totalPercentage > 100 || totalPercentage == 0){
                        this.$snotify.error('Please Check Segment percentage again')
                    }else{
                        this.segmentAR = segmentAR
                        let ds = this.$refs.dataSource.kendoWidget() 
                        let dataSource =ds.data();
                        this.benefit = dataSource.map(index=>{
                            return {
                                component:  index.component,
                                segment:    index.segment,
                                amount:     index.amount
                            }
                        })
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve('resolved');
                                let data = new EmploymentRecord({
                                    id:                         this.employmentRecord.id ? this.employmentRecord.id : '',
                                    employee:                   {
                                        id:                     this.employee.id,
                                        employeeId:             this.employee.employeeId,
                                        lastName:               this.employee.lastName,
                                        firstName:              this.employee.firstName,
                                        gender:                 this.employee.gender,
                                        bank:                   {
                                            id:                 this.employee.bank.id,
                                            bankName:           this.employee.bank.bankName,
                                            uuid:               this.employee.bank.uuid,
                                        },
                                        employeeType:           this.employee.employeeType,
                                        spouseGender:           this.employee.spouseGender,
                                        natureEmployee:         this.employee.natureEmployee,
                                        noOfChildren:           this.employee.noOfChildren,
                                        bankAccount:            this.employee.bankAccount,
                                        paymentMethod:          this.employee.paymentMethod,
                                        spouseNatureEmployee:   this.employee.spouseNatureEmployee,
                                        payrollLiabilitie:      {
                                            uuid:               this.employee.payrollLiabilitie.uuid,
                                            local_name:         this.employee.payrollLiabilitie.local_name,
                                            type_code:          this.employee.payrollLiabilitie.type_code,
                                            name:               this.employee.payrollLiabilitie.name,
                                            number:             this.employee.payrollLiabilitie.number
                                        },
                                        salaryAcc:              {
                                            uuid:               this.employee.payrollLiabilitie.uuid,
                                            local_name:         this.employee.payrollLiabilitie.local_name,
                                            type_code:          this.employee.payrollLiabilitie.type_code,
                                            name:               this.employee.payrollLiabilitie.name,
                                            number:             this.employee.payrollLiabilitie.number
                                        }
                                    },
                                    date:             this.recordDate,
                                    location:         this.locationSelected,
                                    natureRecord:     this.natureRecordSelected,
                                    natureContract:   this.natureContractSelected,
                                    position:         this.positionSelected,
                                    department:       this.positionSelected.department,
                                    salaryType:       this.salaryTypeSelected,
                                    natureSalary:     this.natureSalarySelected,
                                    currency:         this.currencySelected,
                                    salary:           this.employmentRecord.salary,
                                    status:           1,
                                    benefit:          this.benefit,
                                    segment:          this.segmentAR,
                                    workDay:          this.workDaySelected,
                                    employmentId:     this.$route.params.id,
                                    startingTime:     this.startingTimeSelected,
                                    applyOvertime:    this.applyOvertime,
                                    group:            this.group,
                                    loggedUser:       this.loggedUser
                                })
                                window.console.log('data', data)
                                employeeHandler.createEmployment(data).then(response => {
                                    if (response.data.statusCode === 201) {
                                        this.$snotify.success('Success')
                                        let result = response.data.data
                                        this.close(result.employee)
                                    }
                                }).catch(e => {
                                    this.$snotify.error('Something went wrong')
                                    this.errors.push(e)
                                })
                            }, 300);
                        })
                    }
                }
            },
            cancel(){
                this.clear()
            },
            isEdit(){},
            async loadSingleEmployee() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true
                        employeeHandler.get(this.$route.params.id).then(res => {
                            this.showLoading = true                          
                            if (res.data.statusCode === 200) {
                                let result = res.data.data[0]
                                window.console.log(1212121,result)
                                if(result){
                                    this.employee = result
                                    this.employeeName = result.employeeId +'-'+result.firstName + ' ' + result.lastName
                                    if(this.$route.query.type == 'edit'){
                                        window.console.log(1,this.$route.query)
                                        this.getEmployment()
                                    }else{
                                        window.console.log(2,this.$route.query)
                                        this.loadSegment()
                                        this.addRow()
                                    }
                                }
                            }
                        })
                    }, 300);
                })
            },
            async getEmployment(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true
                        employeeHandler.getEmploymentByEmployee(this.$route.params.record_id).then(res => {
                            this.showLoading = true
                            if (res.data.statusCode === 200) {
                                this.employmentSingle = res.data.data[0]
                                if(this.employmentSingle){
                                    this.natureRecordSelected   = this.employmentSingle.natureRecord
                                    this.natureContractSelected = this.employmentSingle.natureContract
                                    this.locationSelected       = this.employmentSingle.location
                                    this.positionSelected       = this.employmentSingle.position
                                    this.natureSalarySelected   = this.employmentSingle.natureSalary
                                    this.salaryTypeSelected     = this.employmentSingle.salaryType
                                    this.currencySelected       = this.employmentSingle.currency
                                    this.employmentRecord       = this.employmentSingle
                                    this.workDaySelected        = this.employmentSingle.workDay
                                    this.startingTimeSelected   = this.employmentSingle.startingTime
                                    this.applyOvertime          = this.employmentSingle.applyOvertime
                                    this.recordDate             = this.employmentSingle.date
                                    this.BenefiteList           = this.employmentSingle.benefit
                                    this.segmentList            = this.employmentSingle.segment  
                                    this.group                  = this.employmentSingle.group  
                                }
                                this.changeSalaryType()    
                                this.showLoading            = false 
                            }             
                        })
                    }, 300);
                })
            },
            // async loadEmploymentRecord(){
            //     new Promise(resolve => {
            //         setTimeout(() => {
            //             resolve('resolved');
            //             this.showLoading = true
            //             employeeHandler.getEmploymentListByEmployee(this.$route.params.id).then(res => {
            //                 this.showLoading = false
            //                 this.employmentList = res
            //                 if(this.employmentList){
            //                     this.employmentOld = this.employmentList.filter(m => m.status === 1)
            //                     this.employment_id = this.employmentOld[0].id
            //                 }
            //             })
            //         }, 300);
            //     })
            // },
            close(data){
                this.clear()
                if (this.$route.params.query !== undefined) {
                    window.history.go(-1)
                } else {
                    this.$router.push({
                        name: 'Payroll', params: {
                            data: data
                        }
                    })
                }
            },
            clear(){
                this.natureRecordSelected   = {id: "new_employment", name: "New Employment"},
                this.natureContractSelected = {id: "fixed_duration_contract", name: "Fixed Duration Contract"},
                this.locationSelected       = {}
                this.natureSalarySelected   = {id: "gross_amount", name: "Gross Amount"}
                this.salaryTypeSelected     = 'Monthly'
                this.employmentRecord       = {}
                this.workDaySelected        = {}
                this.startingTimeSelected   = {}
                this.positionSelected       = {}
                this.applyOvertime          = false
                this.recordDate             = kendo.toString(new Date(), 'yyyy-MM-dd')
                this.BenefiteList           = []
                this.segmentList            = []
                this.group                  = ''
            },
            changeSalaryType(){
                if(this.salaryTypeSelected == 'Hourly'){
                    this.salaryPer = 'per Hour'
                }else{
                    this.salaryPer = 'per Month'
                }
                window.console.log(1, this.salaryTypeSelected)
            },
            async loadGroup(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true
                        payrollHandler.getGroup().then(res => {
                            if(res.data.length > 0){
                                this.groups = res.data
                            }
                            this.showLoading = false
                        })
                    }, 300);
                })
            },
        },
        mounted: async function () {
            await this.loadPosition()
            await this.loadLocation()
            await this.loadComponent()
            await this.loadCurrency()
            await this.loadAccount()
            await this.loadGroup()
            // await this.loadSingleEmployee()
        },
        watch: {
            '$route': 'loadAccount'
        }
    }

</script>
<style scoped>
    .small_sidebar {
        height: 97%;
        position: relative;
        padding: 12px;
    }
    .hide_small_bar_class {
        max-width: 0;
        transition: .5s ease-in;
        flex: 0 0 0;
        padding: 0;
    }

    .hide_big_bar_class {
        max-width: 100%;
        transition: .5s ease-in;
        flex: 0 0 100%;
    }
    .iconArrow {
        right: -35px;
        position: absolute;
        bottom: -10px;
    }
    .iconArrowHide {
        position: absolute;
        right: -7px;
        bottom: -10px;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: transparent !important;
    }
    .detial_smallside_p{
        position: absolute;
        bottom: 10px;
    }   
    .k-scrollbar .k-scrollbar-vertical .k-grid-header{
        width: 0px!important;
        padding-right: 16px!important;
        
    }
</style>