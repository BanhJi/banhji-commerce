<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t("employee") }}</h2>
                                <v-icon
                                    @click="cancel()"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right">close
                                </v-icon>
                            </v-card>

                            <v-card outlined dense class="px-3 no_border" color="grayBg" height="253px">
                                <v-row>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t('employee_id') }}</label>
                                        <v-row class="py-0">
                                            <v-col sm="3" cols="3" class="py-0" style="padding-right: 0;">
                                                <v-text-field class="mt-1"
                                                    outlined
                                                    tage="Abbr"
                                                    style="text-align: center!important"
                                                    v-model="employee.abbr"
                                                    :placeholder="$t('abbr')"
                                                    :rules="[v => !!v || $t('required')]"
                                                    required/>
                                            </v-col>
                                            <v-col sm="9" cols="12" class="py-0" style="padding-left: 0;">
                                                <v-text-field class="mt-1"
                                                    outlined
                                                    tage="Employee number"
                                                    v-model="employee.number"
                                                    :placeholder="$t('number')"
                                                    :rules="[v => !!v || $t('field_is_required')]"
                                                    required/>
                                            </v-col>
                                        </v-row>
                                        <label class="label">{{ $t('first_name') }}</label>
                                        <v-text-field class="mt-1"
                                            :placeholder="$t('first_name')"
                                            v-model="employee.firstName"
                                            outlined
                                            tage="First Name"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            required/>
                                        <label class="label">{{ $t('last_name') }}</label>
                                        <v-text-field class="mt-1"
                                            :placeholder="$t('last_name')"
                                            v-model="employee.lastName"
                                            tage="Last Name"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            outlined
                                            required/>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t('first_name_locale') }}</label>
                                        <v-text-field class="mt-1"
                                            :placeholder="$t('first_name')"
                                            v-model="employee.firstNameLocale"
                                            outlined
                                            tage="First Name English"
                                            required/>

                                        <label class="label">{{ $t('last_name_locale') }}</label>
                                        <v-text-field class="mt-1"
                                            :placeholder="$t('last_name')"
                                            v-model="employee.lastNameLocale"
                                            outlined
                                            tage="Last Name English"
                                            required/>

                                        <label class="label">{{ $t('date_of_birth') }}</label>
                                        <app-datepicker
                                            :initialDate="employee.dob"
                                            @emitDate="employee.dob = $event"/>
                                    </v-col>
                                    <v-col sm="4" cols="12">
                                        <label class="label">{{ $t('gender') }}</label>
                                        <v-select
                                            :items="genderItem"
                                            class="mt-1"
                                            tage="Gender"
                                            v-model="gender"
                                            placeholder="Male"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            outlined>
                                        </v-select>

                                        <label class="label">{{ $t('type_of_employee') }}</label>
                                        <v-select  class="mt-1"
                                            :items="employeeTypes"
                                            item-value="id"
                                            item-text="name"
                                            return-object
                                            tage="Employee Type"
                                            v-model="employeeType"
                                            placeholder="Full-time"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            outlined>
                                        </v-select>
                                        <v-row class="my_checkbox">
                                            <v-col sm="12" cols="12" class="py-0">
                                                <label class="label  mb-0">{{ $t('identity') }}</label>
                                                <v-row>
                                                    <v-col sm="6" cols="6" class="pb-0 pt-1 pr-1">
                                                        <v-select
                                                            :items="identityTypes"
                                                            tage="Gender"
                                                            v-model="identityType"
                                                            placeholder="ID Card"
                                                            :rules="[v => !!v || $t('field_is_required')]"
                                                            outlined>
                                                        </v-select>
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="pb-0 pt-1 pl-1">
                                                        <v-text-field
                                                            :placeholder="$t('identification_no')"
                                                            v-model="employee.identityId"
                                                            outlined
                                                            required/>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card>

                            <v-card outlined dense color="white pl-3">
                                <v-row>
                                    <v-col sm="4" cols="12" class="pb-0 pr-1 my_checkbox">
                                        <v-row class=" border_grey mr-2">
                                            <v-col sm="12" class="my_box_min_heihgt pb-0">
                                                <h2 class="mb-2 font_20 ">
                                                    {{ $t("contact_information") }}
                                                </h2>
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <label class="label">{{ $t('address') }}</label>
                                                        <v-text-field class="mt-1"
                                                            outlined
                                                            v-model="employee.address"
                                                            required/>

                                                        <label class="label">{{ $t('phone_number') }}</label>
                                                        <v-text-field class="mt-1"
                                                            v-model="employee.phone"
                                                            outlined
                                                            required/>

                                                        <label class="label">{{ $t('email') }}</label>
                                                        <v-text-field class="mt-1"
                                                            outlined
                                                            v-model="employee.email"
                                                            required/>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="px-2 my_checkbox">
                                        <v-row class=" border_grey mr-2">
                                            <v-col sm="12" class="my_box_min_heihgt  pb-0">
                                                <h2 class="mb-0 font_20">{{ $t("default_account") }}</h2>
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="pt-1">
                                                    </v-col>
                                                    <v-col sm="12" cols="12" class="pt-0">
                                                        <label class="label">{{ $t('salary_account') }}</label>
                                                        <v-select class="mt-1"
                                                            v-model="mAccSalary"
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
                                                        <v-select class="mt-1"
                                                            v-model="mAccAdvanceSalary"
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
                                                            v-model="mAccPayroll"
                                                            :items="accPayroll"
                                                            item-value="id"
                                                            :item-text="item =>`${item.number} - ${item.name}`"
                                                            return-object
                                                            :rules="[v => !!v || $t('field_is_required')]"
                                                            placeholder="Account Payroll Liabilities"
                                                            tage="Account Payroll Liabilities"
                                                            outlined>
                                                        </v-select>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pl-1">
                                        <v-row class=" border_grey mr-0">
                                            <v-col sm="12" class="my_box_min_heihgt  pb-0">
                                                <h2 class="mb-2 font_20">
                                                    {{ $t("employee_image") }}
                                                </h2>
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <p class="color_grey font_14">
                                                            {{ $t("these_image_of_the_employee") }}
                                                        </p>
                                                    </v-col>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <v-img
                                                            width="100px"
                                                            height="150px"
                                                            :src="src"/>
                                                        <label>
                                                            <input
                                                                type="file"
                                                                name="image"
                                                                id="image"
                                                                :rules="fileSizeRules"
                                                                accept=".png, .jpg, .jpeg"
                                                                ref="fileupload"
                                                                @change="onFileChange"/>
                                                        </label>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <!-- column 2 -->
                                <v-row class="border_grey mr-0 mb-3">
                                    <v-tabs class="tabs_2">
                                        <v-tab href="#tab-employee">
                                            <span class="hidden-sm-and-up">
                                                <v-icon left>mdi-pen</v-icon>
                                            </span>
                                            <span class="hidden-sm-and-down text-capitalize text-left">
                                                {{ $t("employee_information") }}
                                            </span>
                                        </v-tab>
                                        <v-tab href="#tab-spouse">
                                            <span class="hidden-sm-and-up">
                                                <v-icon left>mdi-pen</v-icon>
                                            </span>
                                            <span class="hidden-sm-and-down text-capitalize">
                                                {{ $t('spouse') }}
                                            </span>
                                        </v-tab>
                                        <v-tab-item :value="'tab-employee'">
                                            <v-card outlined dense class="px-4 no_border">
                                                <v-row>
                                                    <v-col sm="4" cols="12" class="pb-">
                                                        <label class="label">{{ $t('country') }}</label>
                                                        <v-select class="mt-1"
                                                            :items="countries"
                                                            item-text="country"
                                                            item-value="abbreviation"
                                                            return-object
                                                            tage="Nationality"
                                                            v-model="country"
                                                            placeholder="Cambodian"
                                                            outlined>
                                                        </v-select>
                                                        <label class="label">{{ $t('nationality') }}</label>
                                                        <v-select class="mt-1"
                                                            :items="nationalities"
                                                            item-text="nameEn"
                                                            item-value="alpha3Code"
                                                            return-object
                                                            tage="Nationality"
                                                            :rules="[v => !!v || $t('field_is_required')]"
                                                            v-model="nationality"
                                                            placeholder="Cambodian"
                                                            outlined>
                                                        </v-select>
                                                        <label class="label">{{ $t('nature_employee') }}</label>
                                                        <v-select class="mt-1"
                                                            :items="natureEmployees"
                                                            item-text="nameEn"
                                                            item-value="alpha3Code"
                                                            return-object
                                                            :rules="[v => !!v || $t('field_is_required')]"
                                                            tage="NatureEmployee"
                                                            v-model="natureEmployee"
                                                            placeholder="Nature Employee"
                                                            outlined>
                                                        </v-select>
                                                    </v-col>
                                                    <v-col sm="4" cols="12" class="pb-0">
                                                        <label class="label">{{ $t('marital_status') }}</label>
                                                        <v-select class="mt-1"
                                                            :items="maritalStatuses"
                                                            item-text="name"
                                                            item-value="id"
                                                            return-object
                                                            tage="MaritalStatus"
                                                            :rules="[v => !!v || $t('field_is_required')]"
                                                            v-model="maritalStatus"
                                                            placeholder="Cambodian"
                                                            outlined>
                                                        </v-select>
                                                        <label class="label">{{ $t('no_of_children') }}</label>
                                                        <v-text-field class="mt-1"
                                                            outlined
                                                            v-model="employee.noOfChildren"
                                                            required/>
                                                        <label class="label">{{ $t('payment_method') }}</label>
                                                        <v-select class="mt-1"
                                                            :items="paymentMethods"
                                                            item-text="nameEn"
                                                            tage="PaymentMethod"
                                                            v-model="paymentMethod"
                                                            :rules="[v => !!v || $t('field_is_required')]"
                                                            placeholder="Payment Method"
                                                            outlined>
                                                        </v-select>
                                                    </v-col>
                                                    <v-col sm="4" cols="12" class="pb-0">
                                                        <label class="label">{{ $t('bank_name') }}</label>
                                                        <v-select class="mt-1"
                                                            :items="bankList"
                                                            item-text="bankName"
                                                            item-value="id"
                                                            return-object
                                                            tage="bank name"
                                                            v-model="employee.bank"
                                                            :rules="bankRule()"
                                                            placeholder="name"
                                                            outlined>
                                                        </v-select>
                                                        <label class="label">{{ $t('bank_account') }}</label>
                                                        <v-text-field class="mt-1"
                                                            outlined
                                                            v-model="employee.bankAccount"
                                                            :rules="bankAccountRule()"
                                                            required/>
                                                        <label class="label">{{ $t('payment_period') }}</label>
                                                        <v-select class="mt-1"
                                                            :items="paymentPeriods"
                                                            item-text="name"
                                                            item-value="id"
                                                            return-object
                                                            tage="PaymentPeriod"
                                                            :rules="[v => !!v || $t('field_is_required')]"
                                                            v-model="paymentPeriod"
                                                            placeholder="Monthly"
                                                            outlined>
                                                        </v-select>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </v-tab-item>
                                        <v-tab-item :value="'tab-spouse'">
                                           <v-card outlined dense class="px-4 no_border">
                                                <v-row>
                                                    <v-col sm="3" cols="12" class="pb-0">
                                                        <label class="label">{{ $t('name') }}</label>
                                                        <v-text-field class="mt-1"
                                                            outlined
                                                            v-model="employee.spouseName"
                                                            required/>
                                                    </v-col>
                                                    <v-col sm="3" cols="12" class="pb-0">
                                                        <label class="label">{{ $t('Gender') }}</label>
                                                        <v-select
                                                            :items="genderItem"
                                                            class="mt-1"
                                                            tage="Gender"
                                                            v-model="employee.spouseGender"
                                                            placeholder="Male"
                                                            outlined>
                                                        </v-select>
                                                    </v-col>
                                                    <v-col sm="3" cols="12" class="pb-0">
                                                        <label class="label">{{ $t('nationality') }}</label>
                                                        <v-select class="mt-1"
                                                            :items="natureEmployees"
                                                            item-text="nameEn"
                                                            item-value="alpha3Code"
                                                            return-object
                                                            tage="NatureEmployee"
                                                            v-model="employee.spouseNatureEmployee"
                                                            placeholder="Nature Employee"
                                                            outlined>
                                                        </v-select>
                                                    </v-col>
                                                    <v-col sm="3" cols="12" class="pb-0">
                                                        <label class="label">{{ $t('working_status') }}</label>
                                                        <v-select class="mt-1"
                                                            :items="workingStatus"
                                                            item-text="nameEn"
                                                            item-value="alpha3Code"
                                                            return-object
                                                            tage="WorkingStatus"
                                                            v-model="employee.workingStatus"
                                                            placeholder="Working Status"
                                                            outlined>
                                                        </v-select>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </v-tab-item>
                                    </v-tabs>
                                </v-row>
                            </v-card>
                            <v-divider/>
                            <v-card outlined dense class="no_border function_footer">
                                <v-btn color="black" @click="cancel" class="text-capitalize  white--text float-left">
                                    {{ $t("cancel") }}
                                </v-btn>
                                <v-btn class="float-right text-capitalize  white--text" color="primary" @click="onSaveClose('close')">
                                    {{ $t('save_close') }}
                                </v-btn>
                                <v-btn class="float-right text-capitalize  white--text mr-3" color="primary" @click="onSaveClose('new')" :hidden="hiddenButton">
                                    {{ $t('save_new') }}
                                </v-btn>
                            </v-card>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>

import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import {i18n} from '@/i18n';
const accountHandler = require("@/scripts/handler/accounting/account")
import EmployeeModel from '@/scripts/model/Employee'
import PrefixModel from '@/scripts/model/payrollsetting/Prefix'
const employeeHandler = require("@/scripts/employeeHandler")
const otherHandler = require("@/scripts/otherHandler")
const payrollHandler = require("@/scripts/payrollHandler")

const employeeModel = new EmployeeModel({})
const prefixModel   = new PrefixModel({})
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();

export default {
    name: "AddEmployee",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
    },
    data: () => ({
        isEdit: false,
        genderItem: [
            "Male",
            "Female",
            "Others"
        ],
        maritalStatuses: otherHandler.maritalStatus(),
        paymentPeriods: otherHandler.paymentPeriod(),
        employeeTypes: otherHandler.employeeType(),
        banks: otherHandler.bank(),
        nationalities: [],
        countries: [],
        identityTypes: [
            "ID Card", 
            "Passport", 
            "TID"
        ],
        natureEmployees:[
            'Resident',
            'Non-Resident'
        ],
        employee: employeeModel,
        mAccSalary: {},
        accSalaries: [],
        mAccAdvanceSalary: {},
        accAdvanceSalaries: [],
        // LoadingMe
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        src: '',
        imgFile: '',
        bill_date: '',
        alert: false,
        deposite: 1000,
        fileSizeRules: [
            files => !files || !files.some(file => file.size > 1024 * 1024) || 'Image size should be less than 1 MB!'
        ],
        files: [],
        // Form validation
        valid: true,
        journal_types: [],
        suppliers_item: [],
        paymentMethods: [
            'Cash Payment',
            'Bank Payment'
        ],
        expense: [
            'Equal',
            'weighted'
        ],
        registeredDate: '',
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,
        mAccPayroll: {},
        accPayroll: [],
        workingStatus: [
            'Working',
            'No Work'
        ],
        bankList: [],
        loggedUser: {
            id: cookie.creator,
            name: cookie.email
        },
        gender: "Male",
        employeeType: "",
        identityType: "",
        country: "",
        nationality: "",
        natureEmployee: "",
        maritalStatus: "",
        paymentMethod: "",
        paymentPeriod: "",
        prefix: prefixModel
    }),
    methods: {
        close(data) {
            if (this.$route.params.query !== undefined) {
                window.console.log(1,this.$route.params.query)
                window.history.go(-1)
            } else {
                window.console.log(2,this.$route.params.query)
                this.$router.push({
                    name: 'Payroll', params: {
                        data: data
                    }
                })
            }
        },
        onFileChange(e) {
            // const file = e.target.files[0];
            let input = e.target
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                if (input.files[0].size > 1024 * 1024) {
                    e.preventDefault();
                    alert('File too big (> 1MB)');
                    this.src = ''
                    this.imgFile = ''
                    this.$refs.fileupload.value = null;
                } else {
                    // create a new FileReader to read this image and convert to base64 format
                    let reader = new FileReader()
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onloadend = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.imgFile = e.target.result
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsBinaryString(input.files[0])
                    // this.url = input.files[0]
                    this.src = URL.createObjectURL(e.target.files[0])
                }
            }
        },
        async loadCountry() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    otherHandler.country().then(res => {
                        this.showLoading = false
                        this.countries = res
                        window.console.log('countries', this.countries)
                        if (this.countries.length > 0) {
                            let country                     = this.countries.filter(word => word.country == 'Cambodia')
                            this.country                    = country[0]
                            // this.maritalStatus              = this.maritalStatus[0]
                            // this.employeeType               = this.employeeType[0]
                            // this.natureEmployee             = this.natureEmployee[0]
                            // this.identityType               = this.identityType[0]
                            // this.gender                     = this.genderItem[0]
                            // this.paymentPeriod              = this.paymentPeriod[3]
                            // this.paymentMethod              = this.paymentMethod[1]
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300);
            })
        },
        async loadNationality() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    otherHandler.nationality().then(res => {
                        this.showLoading = false
                        this.nationalities = res
                        if (this.nationalities.length > 0) {
                            let nationalities = this.nationalities.filter(n => n.nameEn == 'Cambodian')
                            this.nationality = nationalities[0]
                        }
                    })
                }, 300);
            })
        },
        async loadAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    accountHandler.getAll().then(res => {
                        this.showLoading = true
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
                                id:             item.uuid,
                                uuid:           item.uuid,
                                name:           item.name,
                                local_name:     item.local_name,
                                number:         item.number,
                                is_taxable:     item.is_taxable,
                                banhjiAccCode:  item.banhjiAccCode,
                                group_code:     item.group_code,
                                parent_account: item.parent_account,
                                type_code:      item.type_code,
                                account_type:   item.account_type
                            }
                        })
                        if (this.accSalaries.length > 0) {
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
                        this.showLoading = false
                    })
                }, 300);
            })
        },
        async onSaveClose(isSave) {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = new EmployeeModel({
                        id:                   this.employee.id ? this.employee.id : '',
                        firstName:            this.employee.firstName,
                        firstNameLocale:      this.employee.firstNameLocale,
                        lastName:             this.employee.lastName,
                        lastNameLocale:       this.employee.lastNameLocale,
                        employeeType:         this.employeeType,
                        gender:               this.gender,
                        dob:                  this.employee.dob,
                        identityId:           this.employee.identityId,
                        identityType:         this.identityType,
                        address:              this.employee.address,
                        phone:                this.employee.phone,
                        email:                this.employee.email,
                        salaryAcc:            this.mAccSalary,
                        salaryAdvanceAcc:     this.mAccAdvanceSalary,
                        payrollLiabilitie:    this.mAccPayroll,
                        country:              this.country,
                        nationality:          this.nationality,
                        image:                this.employee.image,
                        file:                 this.imgFile,
                        attachFile:           {},
                        status:               1,
                        maritalStatus:        this.maritalStatus,
                        noOfChildren:         this.employee.noOfChildren,
                        bank:                 this.employee.bank,
                        bankAccount:          this.employee.bankAccount,
                        paymentPeriod:        this.paymentPeriod,
                        natureEmployee:       this.natureEmployee,
                        paymentMethod:        this.paymentMethod,
                        workingStatus:        this.employee.workingStatus,
                        spouseName:           this.employee.spouseName,
                        spouseGender:         this.employee.spouseGender,
                        spouseNatureEmployee: this.employee.spouseNatureEmployee,
                        loggedUser:           this.loggedUser,
                        abbr:                 this.employee.abbr,
                        number:               this.employee.number,
                        prefix:               this.employee.prefix,
                        employeeId:           this.employee.abbr + this.employee.prefix.separator + this.employee.number,
                    })
                    window.console.log(data)
                    this.showLoading = true
                    employeeHandler.create(data).then(response => {
                        this.showLoading = true
                        if (response.data.statusCode === 201) {                 
                            if(isSave =="new"){
                                this.clear()
                            }else if(isSave == "close"){
                                this.clear()
                                this.close(response.data.data)
                            }
                            this.showLoading = false
                            this.$snotify.success('Successfully')
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
        async initData() {
            if (this.$route.params.id !== undefined) {
                await this.loadSingleEmployee()
            }else{
                this.clear()
            }
        },
        async loadSingleEmployee() {
            if(this.$route.params.id){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true
                        employeeHandler.get(this.$route.params.id).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                let result = res.data.data
                                if(result.length > 0){
                                    this.employee           = result[0]
                                    this.mAccAdvanceSalary  = this.employee.salaryAdvanceAcc
                                    this.mAccSalary         = this.employee.salaryAcc
                                    this.mAccPayroll        = this.employee.payrollLiabilitie
                                    this.maritalStatus      = this.employee.maritalStatus
                                    this.paymentMethod      = this.employee.paymentMethod
                                    this.paymentPeriod      = this.employee.paymentPeriod
                                    this.natureEmployee     = this.employee.natureEmployee
                                    this.employeeType       = this.employee.employeeType
                                    this.identityType       = this.employee.identityType
                                    const hasImg            = this.employee.hasOwnProperty('image')
                                    this.src = ''
                                    let imgUrl = ''
                                    if (hasImg) {
                                        if (this.employee.image.hasOwnProperty('default')) {
                                            imgUrl = this.employee.image.default.thumb
                                            this.src = 'https://s3-ap-southeast-1.amazonaws.com/images.banhji/' + imgUrl
                                        }
                                    }
                                }
                            }
                        })
                    }, 300);
                })
                window.console.log(1)
            }else{
                this.loadPrefix()
            }
        },
        cancel() {
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
                }
            });
        },
        async loadPayrollBank(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    payrollHandler.getBank().then(res => {
                        let results = res.data.data
                        this.bankList = results
                    })
                }, 300);
            })
        },
        clear(){
            this.employee       = new EmployeeModel({})
            this.gender         = "Male"
            this.employeeType   = this.employeeTypes[0]
            this.identityType   = this.identityTypes[0]
            this.natureEmployee = this.natureEmployees[0]
            this.maritalStatus  = this.maritalStatuses[0]
            this.paymentMethod  = this.paymentMethods.filter(i => i =="Bank Payment").map(v =>{return v})[0]
            this.paymentPeriod  = this.paymentPeriods.filter(k => k.name == "Monthly").map(x =>{return {id: x.id,name: x.name}})[0]
            this.loadAccount()
            this.loadPrefix()

        },
        async loadPrefix(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    payrollHandler.getPrefix().then(res => {
                        if(res.statusCode === 200){
                            let result = res.data
                            if(result.length > 0){
                                    this.prefix = result[0]
                            }
                            this.generateNumber(this.prefix)
                        }
                    })
                }, 300);
            })
        },
        generateNumber(prefix) {
            let params = {
                abbr: prefix.abbr,
                id: ''
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    employeeHandler.getLastNumber(params).then(res => {
                        this.showLoading = true
                        if(res.statusCode === 200){
                            let resultLast = res.data
                            const lastNumber            = this.zeroPad(parseInt(resultLast.lastNumber), prefix.format)
                            this.employee.abbr          = prefix.abbr || ''
                            this.employee.prefix        = prefix
                            this.employee.number        = lastNumber
                            this.showLoading = false
                        }
                    })
                }, 300);
            })
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        bankRule(){
            if(this.paymentMethod == 'Bank Payment'){
                let rul = [v => !!v['id'] || i18n.t('field_is_required')]
                return rul
            }
        },
        bankAccountRule(){
            window.console.log(this.employee.bank,'this.employee.bank')
            if(this.employee.bank.id){
                let rul = [v => !!v || i18n.t('field_is_required')]
                return rul
            }
        }
    },
    mounted: async function () {
        await this.loadCountry()
        await this.loadNationality()
        await this.loadAccount()
        await this.initData()
        await this.loadPayrollBank()
    },
    watch: {
        '$route': 'loadSingleEmployee'
    },
    computed: {
        hiddenButton(){
            if(this.$route.query.type =="edit"){
                return true
            }else{
                return false
            }
        }
    },
};
</script>

<style scoped>
.function_content {
    padding: 0 25px 25px;
    border-bottom: 0;
    background-color: #fff !important;
}

@media (min-width: 1264px) {
    .container {
        /* max-width: 1185px; */
        max-width: 1080px !important;
    }
}

.grayBg {
    background-color: #F8F8F9;
}

@media (max-width: 576px) {
    .mb-6 {
        margin-bottom: 0 !important;
    }
}

.section2 {
    border: 1px solid #d6d7d8;
}

.border_grey {
    border: 1px solid #d6d7d8;
}

.attachment_table {
    width: 100%;
}

.greyDark {
    background-color: #f2f2f2;
}

.upload_btn {
    width: 54%;
    margin: auto;
    padding: 10px 6px;
    text-align: center;
    color: #ffff;
    border-radius: 22px;
    background: #92d050;
}

.my_box_min_heihgt {
    height: 295px;
}

.width_100 {
    width: 100px;
}
</style>
