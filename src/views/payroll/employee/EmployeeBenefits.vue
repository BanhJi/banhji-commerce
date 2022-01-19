<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{$t('fringe_benefit')}}</h2>
            <v-dialog v-model="dialogm" max-width="800px" eager>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" class="text-capitalize white--text float-right" v-on="on">
                        {{$t('create_new')}}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{$t('fringe_benefit')}}</v-card-title>
                        <v-icon  @click="close">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="12" cols="12" class="">
                                    <v-row class="">
                                        <v-col sm="4" cols="12" class="py-0">
                                            <label class="label">{{$t('employee')}}</label>
                                            <v-autocomplete
                                                v-model="employee"
                                                style="padding-top: 0px"
                                                :items="employees"
                                                item-value="id"
                                                :filter="employeeFilter"
                                                item-text="name"
                                                :search-input.sync="search"
                                                hide-no-data
                                                hide-selected
                                                :rules="[v => !!v || $t('field_is_required')]"
                                                placeholder="Start typing to Search"
                                                return-object
                                                outlined
                                                append-icon="mdi-database-search"
                                            />
                                        </v-col>
                                        <v-col sm="4" cols="12" class="py-0">
                                            <label class="label">{{$t('month_of')}}</label>
                                            <month-picker 
                                                :initialMonth="start_date"  
                                                @emitMonth="start_date = $event" 
                                            />
                                        </v-col>
                                        <v-col sm="4" cols="12" class="py-0">
                                            <label class="label">{{$t('segment')}}</label>
                                            <v-select id="acc_type_selector"
                                            :items="segments"
                                            item-text="name"
                                            item-value="id"
                                            v-model="selectSegement"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            return-object
                                            outlined
                                            clearable
                                            />
                                        </v-col>

                                        <v-col sm="4" cols="12" class="py-0">
                                            <label class="label">{{$t('account_benefit')}}</label>
                                            <v-select id="acc_type_selector"
                                            :items="accBenefit"
                                            :item-text="item =>`${item.number} - ${item.name}`"
                                            item-value="id"
                                            v-model="selectAccBenefit"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            outlined
                                            return-object
                                            clearable
                                            />
                                        </v-col>
                                        <v-col sm="4" cols="12" class="py-0">
                                            <label>{{ $t('currency') }}</label>
                                            <v-select
                                                class=" my-2"
                                                :items="currencyList"
                                                item-value="id"
                                                item-text="name"
                                                v-model="SelectedCurrency"
                                                outlined
                                                tage="currencySelector"
                                                :rules="[v => !!v || $t('field_is_required')]"
                                                clearable/>
                                            </v-col>
                                        <v-col sm="4" cols="12" class="py-0">
                                            <label class="label">{{ $t('amount') }}</label>
                                            <v-text-field class="mt-1"
                                                outlined
                                                v-model="amount"
                                                type="number"
                                                min="0"
                                                tage="Amount"
                                                :rules="[v => !!v || $t('field_is_required')]"
                                                @change="changeAmount"
                                                required/>
                                        </v-col>

                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-textarea
                                                height="150px"
                                                rows="10"
                                                no-resize
                                                outlined
                                                clearable
                                                clear-icon="mdi-close-circle"
                                                label="Description"
                                                v-model="description"
                                            ></v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                  
                    <v-card-actions class="modal_footer">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn color="primary" outlined class=" text-capitalize  black--text float-left" @click="dialogm = false">{{$t('cancel')}}</v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn color="primary" class="px-3  white--text text-capitalize" @click="onSaveClose">{{$t('save_close')}}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>

        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row class="">
                        <v-col sm="4" cols="12" class="py-0  d-flex justify-space-between">
                            <label style="margin-top: 10px; margin-right: 15px;">{{$t('month_of')}}</label>
                            <month-picker :initialMonth="monthOf" @emitMonth="monthOf = $event"/>
                        </v-col>

                        <v-col sm="2" cols="1" class="py-0 mt-1">
                            <v-btn color="primary white--text" @click="searchView">
                                {{$t('view')}}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <kendo-datasource ref="dataSourceBenefit"
                        :data="fringeBenefit"
                        :page-size='100'
                        :sort="sort"
                        />
                        <kendo-grid id="gridBenefit" class="grid-function"
                            :data-source-ref="'dataSourceBenefit'"
                            :editable="false"
                            :pageable="true"
                            :pageable-refresh="true"
                            :column-menu="true">
                            <kendo-grid-column
                                :width="150"
                                :field="'employee'"
                                :title="$t('employee_id')"
                                :template="'<span>#= employee.employeeId#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :width="200"
                                :field="'employee'"
                                :title="$t('employee_name')"
                                :template="'<span>#= employee.name#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :width="200"
                                :field="'description'"
                                :title="$t('description')"
                                :template="'<span>#= description#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :width="150"
                                :field="'segement'"
                                :title="$t('segement')"
                                :template="'<span>#= segement.name#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :width="150"
                                :field="'amount'"
                                :title="$t('amount')"
                                :template="'<span>#= kendo.toString(amount,`n2`)#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                :attributes="{style: 'text-align: right;'}"/>
                            <kendo-grid-column
                                :field="''"
                                :title="$t('action')"
                                :width="100"
                                :command="[{iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit }]"
                                :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
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
const employeeHandler = require("@/scripts/employeeHandler")
const settingsHandler = require("@/scripts/settingsHandler")
const accountHandler = require("@/scripts/handler/accounting/account")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const { EntityType, } = require("@/scripts/default_setup/Collections");
const instituteHandler = require("@/scripts/instituteHandler")
const payrollHandler = require("@/scripts/payrollHandler")
import Helper from "@/helper.js";
import LoadingMe from "@/components/Loading";
import {JournalModel,
    JournalEntryModel,
    AccountModel,
	CurrencyModel,} from "@/scripts/model/AppModels";
import kendo from "@progress/kendo-ui";

/* Cookie */
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();

export default {
    data: () => ({
        showLoading:        false,
        dialogm:            false,
        valid:              true,
        employees:          [],
        employee:           '',
        search:             null,
        start_date:         '',
        selectSegement:     '',
        segments:           [],
        accBenefit:         [],
        selectAccBenefit:   '',
        amount:             '',
        fringeBenefit:      [],
        description:        '',
        accBenefitPayble:   [],
        FbtPayble:          {},
        journal:            '',
        currencyList:       [],
        SelectedCurrency:   '',
        journalEntry:       [],
        id:                 '',
        journalEdit:        '',
        baseCurrency:       {},
        company:            {},
        exchangeRate:       {},
        payrollTax:         {},
        sort:[
            { field: 'employee.employeeId', dir: 'asc' }
        ],
        monthOf: '',
        month_of: '',
        loggedUser: {
            id: cookie.creator,
            name: cookie.email
        },
    }),
    props: {},
    methods: {
        async loadEmployee(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    employeeHandler.center().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.employees = res.data.data
                            this.showLoading = false
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
                                this.selectSegement = this.segments[0]
                            }
                            this.showLoading = false
                        }
                    })
                }, 300)
            })
        },
        async loadAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getAll().then(res => {
                        this.showLoading = false
                        //Receivable Account
                        this.accBenefit = res.data.filter(m => m.account_type.number === 34).map(item => {
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
                        if (this.accBenefit.length > 0) {
                            let benefit = this.accBenefit.filter(i =>i.number =='634020')
                            this.selectAccBenefit = benefit[0]
                        }
                        this.accBenefitPayble = res.data.filter(m => m.number === '634990').map(item => {
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
                        if (this.accBenefitPayble.length > 0) {
                            this.FbtPayble   = this.accBenefitPayble[0]
                        }
                        window.console.log('accBenefitPayble',this.accBenefitPayble)
                    })
                }, 300);
            })
        },
        onSaveClose(){
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            this.calculateJournal()

            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        id:                 this.id ? this.id: '',
                        amount:             parseFloat(this.amount),
                        amountExchange:     parseFloat(this.amount) / parseFloat(this.exchangeRate.rate),
                        exchangeRate:       parseFloat(this.exchangeRate.rate),
                        accBenefit:         this.selectAccBenefit.id,
                        segement:           this.selectSegement,
                        monthOf:            kendo.toString(new Date(this.start_date),'yyyy-MM-dd'),
                        employeeId:         this.employee.employeeId,
                        employeeName:       this.employee.name,
                        employeeUuid:       this.employee.id,
                        loggedUser:         this.loggedUser,
                        description:        this.description,
                        currency:           this.SelectedCurrency,
                        journal:            this.journal
                    }
                    window.console.log('data',data)
                    this.showLoading = true;
                    employeeHandler.createFringeBenefit(data).then(response => {
                        this.showLoading = true;
                        if (response.data.statusCode === 201) {
                            this.showLoading = false;
                            this.$snotify.success('Success')
                            this.close()
                            this.loadFringeBenefit()
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
        close(){
            this.id                 = ''
            this.employee           = ''
            this.start_date         = ''
            this.amount             = ''
            this.SelectedCurrency   = ''
            this.description        = ''
            this.journalEdit        = ''
            this.dialogm = false
        },
        loadFringeBenefit(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    employeeHandler.getFringeBenefit(this.month_of).then(res => {
                        this.showLoading = true
                        if (res.statusCode === 200) {
                            this.fringeBenefit = res.data
                            this.showLoading = false
                        }
                    })
                }, 300)
            })
        },
        goEdit(e){
            e.preventDefault();
            let grid = kendo.jQuery("#gridBenefit").data("kendoGrid");
            let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
            window.console.log(1,dataItem)
            this.dialogm  = true
            this.id = dataItem.id
            this.selectAccBenefit   =  this.accBenefit.filter(i =>i.uuid == dataItem.accBenefit).map(item => {
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
            })[0]
            this.employee           = {
                id:             dataItem.employee.id,
                name:           dataItem.employee.name,
                employeeId:     dataItem.employee.employeeId
            },
            this.segement           = {
                code:       dataItem.segement.code,
                createdAt:  dataItem.segement.createdAt,
                id:         dataItem.segement.id,
                isSystem:   dataItem.segement.isSystem,
                name:       dataItem.segement.name,
                subOf:      dataItem.segement.subOf,
            },
            this.amount             = dataItem.amount,
            this.start_date         = kendo.toString(new Date(dataItem.monthOf),'yyyy-MM'),
            this.description        = dataItem.description
            this.SelectedCurrency   = dataItem.currency
            this.journalEdit        = {
                uuid:           dataItem.journal.uuid,
                created_date:   dataItem.journal.created_date
            }
            this.journal = ''
            this.journal_entries = []
        },
        changeAmount(){
            window.console.log('journalEdit',this.journalEdit)
            this.calculateJournal()
        },
        calculateJournal(){
            let exchange_rate = 1
            if(this.baseCurrency.code == this.SelectedCurrency){
                exchange_rate = 1
            }else{
                exchange_rate =1/parseFloat(this.exchangeRate.rate)
            }
            let payrollTax  = this.payrollTax
            window.console.log('exchange_rate', exchange_rate)
            let taxAmount   =  parseFloat(this.amount) * (parseFloat(payrollTax.rate )/ 100)
            this.journalEntry = []
            this.journalEntry.push(
                new JournalEntryModel({
                    description:          this.selectAccBenefit.name,
                    account:              new AccountModel(this.selectAccBenefit),
                    exchange_rate:        exchange_rate,
                    currency:             new CurrencyModel(this.baseCurrency),
                    amount:               this.amount, // dr
                }),
                new JournalEntryModel({
                    description:          this.FbtPayble.name,
                    account:              new AccountModel(this.FbtPayble),
                    exchange_rate:        exchange_rate,
                    currency:             new CurrencyModel(this.baseCurrency),
                    amount:               (this.amount - taxAmount) * -1, // cr
                }),
                new JournalEntryModel({
                    description:          payrollTax.name,
                    account:              new AccountModel(payrollTax.account),
                    exchange_rate:        exchange_rate,
                    currency:             new CurrencyModel(this.baseCurrency),
                    amount:               taxAmount * -1, // cr-
                }),         
            )
            window.console.log('journalEntry',this.journalEntry)
            if(this.journalEdit){
                this.journal = new JournalModel({
                    description:                  this.description,
                    number:                       'FBT-'+kendo.toString(new Date(this.start_date),'yyMM')+'-00010',
                    journal_date:                 Helper.toISODate(new Date()),
                    month_of:                     Helper.toISODate(new Date(this.start_date).toISOString().substr(0, 7)),//'2021-02-01',   
                    journal_type:                 EntityType.AUTO_JOURNAL,
                    transaction_type:             'fringeBenefit',
                    referral_transaction_uuid:    '',
                    journal_entries:              this.journalEntry,
                    segment_uuid:                 this.selectSegement.id ? this.selectSegement.id: '',
                    uuid:                         this.journalEdit.uuid,
                    created_date:                 this.journalEdit.created_date,
                    prefix_format:                'FBT-yymm-00000@Year',
                })
            }else{
                this.journal = new JournalModel({
                    description:                  this.description,
                    number:                       'FBT-'+kendo.toString(new Date(this.start_date),'yyMM')+'-00001',
                    journal_date:                 Helper.toISODate(new Date()),
                    month_of:                     Helper.toISODate(new Date(this.start_date).toISOString().substr(0, 7)),//'2021-02-01',   
                    journal_type:                 EntityType.AUTO_JOURNAL,
                    transaction_type:             'fringeBenefit',
                    referral_transaction_uuid:    '',
                    journal_entries:              this.journalEntry,
                    prefix_format:                'FBT-yymm-00000@Year',
                    created_date:                 Helper.toISODate(new Date()),
                    modified_date:                Helper.toISODate(new Date()),
                    segment_uuid:                 this.selectSegement.id ? this.selectSegement.id: '',
                })
            }

        },
        async loadCurrency() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    currencyHandler.getAll().then(res => {
                        this.currencyList = res.data.data
                        // if(this.currencyList.length > 0){
                        //     this.currencySelected = this.currencyList[0]
                        // }
                    })
                }, 300)
            })
        },
        async loadInstituteInfo() {
            new Promise(resolve => {
                setTimeout(() => {
                    instituteHandler.getOneCompany(cookie.instituteId).then(res => {
                        this.company = res
                        this.baseCurrency = this.company.baseCurrency
                        window.console.log('company',this.company)
                    })
                    resolve('resolved');
                }, 200);
            });
        },
        async loadLastExchangeRate(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    let getDate = new Date()
                    let date_tax_payroll = new Date(getDate.getFullYear(), getDate.getMonth(), 15);
                    let date = kendo.toString(new Date(date_tax_payroll),'yyyy-MM-dd')
                    let code = 'KHR'
                    if (code !== undefined || code !== '') {
                        this.showLoading = true
                        currencyHandler.getLastExchangeRateTaxByDate(date, code).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.exchangeRate = res.data.data[0]
                                window.console.log('exchangeRate',this.exchangeRate)
                            }
                        })
                    }

                }, 300)
            })
        },
        async loadTaxSalary(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true;
                    payrollHandler.getTax().then(res => {
                        this.showLoading = true;
                        if(res.data.statusCode === 200){
                            this.showLoading = true;
                            let result = res.data.data
                            window.console.log('result', result)
                            this.payrollTax = result.filter(i => i.nature.id == 'Fringe_Benefit').map(k =>{
                                return {
                                    account:        k.account,
                                    currency:       k.currency,
                                    effectiveDate:  k.effectiveDate,
                                    id:             k.id,
                                    name:           k.name,
                                    nature:         k.nature,
                                    rate:           k.rate
                                }
                            })[0]
                            window.console.log('payrollTax', this.payrollTax)
                        }
                    })
                }, 300);
            })
        },
        searchView(){
            this.month_of = kendo.toString(new Date(this.monthOf),'yyyy-MM-dd')
            this.loadFringeBenefit()
        }
    },
    async mounted() {
        await this.loadEmployee()
        await this.loadSegment()
        await this.loadAccount()
        await this.loadFringeBenefit()
        await this.loadCurrency()
        await this.loadInstituteInfo()
        await this.loadLastExchangeRate()
        await this.loadTaxSalary()
    },
    computed: {},
    components: {
        'month-picker' : ()=> import('@/components/custom_templates/MonthPicker'),
        'LoadingMe': LoadingMe,
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
