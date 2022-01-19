<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('tax_setting') }}</h2>
            <v-dialog v-model="dialogM2" max-width="700px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" class=" text-capitalize white--text float-right" v-on="on"
                           @click="onNewClick">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-card>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <div class="modal_header">
                            <v-card-title>{{ $t('tax_setting') }}</v-card-title>
                            <v-icon  @click="dialogM2 = false">close</v-icon>
                        </div>
                        <v-divider/>
                        <v-card-text class="modal_text_content">
                            <div v-if="natureSelected.id == 'Resident_Salary'">
                                <v-row>
                                    <v-col class="pb-0" sm="4" cosl="12">
                                        <label>{{ $t('nature') }}</label>
                                        <v-select class="mt-1"
                                            outlined
                                            :items="nature"
                                            item-value="id"
                                            item-text="name"
                                            v-model="natureSelected"
                                            tage="unitOfMeasureSelector"
                                            @change="ChangeNature"
                                            return-object
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            clearable/>
                                    </v-col>
                                    <v-col class="pb-0" sm="4" cosl="12">
                                        <label>{{ $t('name') }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            tage="Name"
                                            v-model="taxPayroll.name"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            outlined/>
                                    </v-col>
                                    <v-col class="pb-0" sm="4" cosl="12">
                                        <label>{{ $t('effective_date') }}</label>
                                        <app-datepicker
                                            :initialDate="effectiveDate"
                                            @emitDate="effectiveDate = $event"/>
                                    </v-col>
                                    <v-col sm="12" cols="12" class="pt-2">
                                        <kendo-datasource ref="dataSource"
                                                        :data="taxList"/>
                                        <kendo-grid id="grid" class="grid-function"
                                            :data-source-ref="'dataSource'"
                                            :sortable="false"
                                            :filterable="false"
                                            :navigatable="true"
                                            :editable="true"
                                            :scrollable-virtual="true">
                                            <kendo-grid-column
                                                :title="$t('no.')"
                                                :template="rowNumberTmpl"
                                                :width="60"
                                                :column-menu="false"
                                                :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                                                :attributes="{style: 'text-align: center'}"/>
                                            <kendo-grid-column
                                                :field="'from'"
                                                title="FROM"
                                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                            <kendo-grid-column
                                                :field="'to'"
                                                title="TO"
                                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                            <kendo-grid-column
                                                :field="'taxRate'"
                                                title="Tax Rate"
                                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                            <kendo-grid-column
                                                :field="'amount'"
                                                title="Amount"
                                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                            <kendo-grid-column
                                                :command="{ iconClass: 'k-icon k-i-trash', text: ' ', click: removeRow, class: 'btn-plus' }"
                                                :title="$t('action')"
                                                :headerAttributes="{style: 'text-align: center; background-color: #EDF1F5'}"
                                                :attributes="{style: 'text-align: center'}"/>
                                        </kendo-grid>
                                        <v-btn color="primary"
                                            class="float-left rounded-0 white--text mt-3 btn_plus"
                                            @click="addRow">
                                            <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="12" class="py-0">
                                        <v-row class="mt-0">
                                            <v-col sm="4" class="py-0">
                                                <label>{{ $t('currency') }}</label>
                                                <v-select
                                                    class=" my-2"
                                                    :items="currencyList"
                                                    item-value="code"
                                                    item-text="name"
                                                    v-model="currencySelected"
                                                    outlined
                                                    return-object
                                                    tage="currencySelector"
                                                    :rules="[v => !!v || $t('field_is_required')]"/>
                                            </v-col>
                                            <v-col sm="4" class="py-0">
                                                <label>{{ $t('account') }}</label>
                                                <v-select
                                                    class=" my-2"
                                                    :items="accountList"
                                                    item-value="uuid"
                                                    item-text="name"
                                                    v-model="accountSelected"
                                                    outlined
                                                    return-object
                                                    tage="accountSelector"
                                                    :rules="[v => !!v || $t('field_is_required')]"
                                                    clearable/>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </div>
                            <div v-else-if="natureSelected.id == 'Dependency'">
                                <v-row>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('nature') }}</label>
                                        <v-select
                                            class=" my-2"
                                            outlined
                                            :items="nature"
                                            item-value="id"
                                            item-text="name"
                                            v-model="natureSelected"
                                            @change="ChangeNature"
                                            return-object
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            tage="unitOfMeasureSelector"
                                        />
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('name') }}</label>
                                        <v-text-field
                                            class=" my-2"
                                            tage="Name"
                                            v-model="taxPayroll.name"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            outlined/>
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('effective_date') }}</label>
                                        <app-datepicker
                                            :initialDate="effectiveDate"
                                            @emitDate="effectiveDate = $event"/>
                                        <!-- <v-text-field class=" my-2" tage='Effective Date' outlined clearable /> -->
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('amount') }}</label>
                                        <v-text-field
                                            class=" my-2"
                                            tage="Amount"
                                            type="number"
                                            v-model="taxPayroll.amount"
                                            :rules="[
                                                (v) => {
                                                    const total = taxPayroll.amount || 0
                                                    if (total <= 0) {
                                                    return v + ' Must be greater than zero'
                                                    } else {
                                                    return true
                                                    }
                                                }
                                            ]"
                                            outlined/>
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('currency') }}</label>
                                        <v-select
                                            class=" my-2"
                                            :items="currencyList"
                                            item-value="code"
                                            item-text="name"
                                            v-model="currencySelected"
                                            outlined
                                            return-object
                                            tage="currencySelector"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                        />
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                    <label>{{ $t('account') }}</label>
                                    <v-select
                                        class=" my-2"
                                        :items="accountList"
                                        item-value="uuid"
                                        item-text="name"
                                        v-model="accountSelected"
                                        outlined
                                        return-object
                                        tage="accountSelector"
                                        :rules="[v => !!v || $t('field_is_required')]"
                                        clearable/>
                                </v-col>
                                </v-row>
                            </div>
                            <div v-else-if="natureSelected.id == 'Non_resident_Salary'">
                                <v-row>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('nature') }}</label>
                                        <v-select
                                            class=" my-2"
                                            outlined
                                            :items="nature"
                                            item-value="id"
                                            item-text="name"
                                            v-model="natureSelected"
                                            @change="ChangeNature"
                                            return-object
                                            tage="Nature"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                        />
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('name') }}</label>
                                        <v-text-field
                                            class=" my-2"
                                            Tage="Name"
                                            v-model="taxPayroll.name"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            outlined/>
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('effective_date') }}</label>
                                        <app-datepicker
                                            :initialDate="effectiveDate"
                                            @emitDate="effectiveDate = $event"/>
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('rate') }}</label>
                                        <v-text-field
                                            class=" my-2"
                                            tage="Rate"
                                            v-model="taxPayroll.rate"
                                            :rules="[
                                                (v) => {
                                                    const total = taxPayroll.rate || 0
                                                    if (total <= 0) {
                                                    return v + ' Must be greater than zero'
                                                    } else {
                                                    return true
                                                    }
                                                }
                                            ]"
                                            outlined/>
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('currency') }}</label>
                                        <v-select
                                            class=" my-2"
                                            :items="currencyList"
                                            item-value="code"
                                            item-text="name"
                                            v-model="currencySelected"
                                            @change="ChangeNature"
                                            outlined
                                            return-object
                                            tage="currencySelector"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                        />
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('account') }}</label>
                                        <v-select
                                            class=" my-2"
                                            :items="accountList"
                                            item-value="uuid"
                                            item-text="name"
                                            v-model="accountSelected"
                                            outlined
                                            return-object
                                            tage="accountSelector"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            clearable/>
                                    </v-col>
                                </v-row>
                            </div>
                            <div v-else>
                                <v-row>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('nature') }}</label>
                                        <v-select
                                            class=" my-2"
                                            outlined
                                            :items="nature"
                                            item-value="id"
                                            item-text="name"
                                            v-model="natureSelected"
                                            tage="Nature"
                                            return-object
                                            :rules="[v => !!v || $t('field_is_required')]"
                                        />
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('name') }}</label>
                                        <v-text-field
                                            class=" my-2"
                                            v-model="taxPayroll.name"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            outlined/>
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('effective_date') }}</label>
                                        <app-datepicker
                                            :initialDate="effectiveDate"
                                            @emitDate="effectiveDate = $event"/>
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('rate') }}</label>
                                        <v-text-field
                                            class=" my-2"
                                            tage="Rat"
                                            v-model="taxPayroll.rate"
                                            :rules="[
                                                (v) => {
                                                    const total = taxPayroll.rate || 0
                                                    if (total <= 0) {
                                                    return v + ' Must be greater than zero'
                                                    } else {
                                                    return true
                                                    }
                                                }
                                            ]"
                                            outlined/>
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('currency') }}</label>
                                        <v-select
                                            class=" my-2"
                                            :items="currencyList"
                                            item-value="code"
                                            item-text="name"
                                            v-model="currencySelected"
                                            outlined
                                            return-object
                                            tage="currencySelector"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                        />
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('account') }}</label>
                                        <v-select
                                            class=" my-2"
                                            :items="accountList"
                                            item-value="uuid"
                                            item-text="name"
                                            v-model="accountSelected"
                                            outlined
                                            return-object
                                            tage="accountSelector"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            clearable/>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-card-text>
                        <v-card-actions class="modal_footer">
                            <v-row>
                                <v-col sm="6" cols="6" class="py-0 text-left">
                                    <v-btn small color="black" outlined
                                        class=" text-capitalize  black--text float-left"
                                        @click="dialogM2 = false">{{ $t('cancel') }}
                                    </v-btn>
                                </v-col>
                                <v-col sm="6" cols="6" class="py-0 text-right">
                                    <v-btn small color="primary" class="px-3  white--text text-capitalize"
                                        @click.native="onSaveClose()">{{ $t('save_close') }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
            <p class="mb-0">{{ $t('tax_settings_desc') }} </p>
        </v-col>
        <v-col sm="12" cols="12" class="py-0">
            <template>
                <kendo-datasource ref="payrollTaxDS" :data="payrollTax" />
                <kendo-grid
                    id="gridTax"
                    class="grid-function"
                    :data-source-ref="'payrollTaxDS'"
                    :editable="false"
                    :scrollable-virtual="true"
                    :column-menu="false">
                <kendo-grid-column
                    :field="'name'"
                    :title="$t('name')"
                    :template="'<span>#=name#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'nature'"
                    :title="$t('nature')"
                    :template="'<span>#= nature.name || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'effectiveDate'"
                    :title="$t('effectiveDate')"
                    :template="'<span>#= effectiveDate || ``#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="''"
                    :title="$t('action')"
                    :width="100"
                    :command="[{iconClass: 'k-icon k-i-edit', text: 'Edit',click: goEdit}]"
                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                </kendo-grid>
            </template>
        </v-col>
    </v-row>
</template>

<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import TaxPayroll from '@/scripts/model/TaxPayroll'
import kendo from "@progress/kendo-ui";
const taxModel = new TaxPayroll({})
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")  
const payrollHandler = require("@/scripts/payrollHandler")
const accountHandler = require("@/scripts/handler/accounting/account");
const $ = require("jquery")

export default {
    components: {
        'app-datepicker': DatePickerComponent,
    },
    data: () => ({
        dialogM2: false,
        compeletLoading: true,
        isFullpage: false,
        natureSelected: {
            id: 'Resident_Salary',
            name: 'Resident Salary'
        },
        currencySelected: '',
        accountSelected: '',
        textStatus: 'Success',
        color: '#3DA72E',
        natureOption: 1,
        setCardHeight: true,
        timeout: 6000,
        valid: true,
        currencyList: [],
        nature: [
            {id: 'Resident_Salary', name: 'Resident Salary'},
            {id: 'Non_resident_Salary', name: 'Non-resident Salary'},
            {id: 'Fringe_Benefit', name: 'Fringe Benefit'},
            {id: 'Dependency', name: 'Dependency'}
        ],
        tax_rate: [],
        taxList: [],
        taxPayroll: taxModel,
        payrollTax: [],
        accountList: [],
        accountBenefitList: [],
        effectiveDate: '',
    }),
    props: {},
    computed: {},
    watch: {
    },
    created() {
    },
    methods: {
        ChangeNature() {
            if (this.natureSelected === 'Resident_Salary') {
                this.setCardHeight = true
            } else {
                this.setCardHeight = false
            }
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
        async loadTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    payrollHandler.getTax().then(res => {
                        this.payrollTax = res.data.data
                    })
                }, 300);
            })
        },
        async onSaveClose() {
           if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            if (this.natureSelected === "Resident_Salary") {
                let ds = this.$refs.dataSource.kendoWidget()
                let dataSource = ds.data()
                this.tax_rate = dataSource.map(index=>{
                    return {
                        amount:         index.amount,
                        from:           index.from,
                        to:             index.to,
                        taxRate:        index.taxRate,
                    }
                });
            } else {
                this.tax_rate = this.taxPayroll.rate;
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = new TaxPayroll({
                        id:               this.taxPayroll.id ? this.taxPayroll.id : '',
                        name:             this.taxPayroll.name,
                        nature:           {
                            id:             this.natureSelected.id || '',
                            name:           this.natureSelected.name || ''
                        },
                        currency:         {
                            code:           this.currencySelected.code || '',
                            createdAt:      this.currencySelected.createdAt || '',
                            id:             this.currencySelected.id || '',
                            name:           this.currencySelected.name || '',
                            rate:           this.currencySelected.rate || 0,
                            symbol:         this.currencySelected.symbol || '',
                            symbolNative:   this.currencySelected.symbolNative || '',
                            used:           this.currencySelected.used || 1
                        },
                        rate:             this.tax_rate ? this.tax_rate: 0,
                        effectiveDate:    this.effectiveDate,
                        account:          {
                            account_type:           this.accountSelected.account_type || {},
                            banhjiAccCode:          this.accountSelected.banhjiAccCode || '',
                            banhji_account_number:  this.accountSelected.banhji_account_number || "",
                            description:            this.accountSelected.description || '',
                            group_code:             this.accountSelected.group_code || '',
                            institute:              this.accountSelected.institute || '',
                            is_deleteable:          this.accountSelected.is_deleteable || 0,
                            is_deleted:             this.accountSelected.is_deleted || 0,
                            is_deteled:             this.accountSelected.is_deteled || 0,
                            is_in_used:             this.accountSelected.is_in_used || 0,
                            is_taxable:             this.accountSelected.is_taxable || 0,
                            local_name:             this.accountSelected.local_name || '',
                            name:                   this.accountSelected.namem || '',
                            number:                 this.accountSelected.number || '',
                            reconcile_require:      this.accountSelected.reconcile_require || 0,
                            status:                 this.accountSelected.status || 1,
                            type_code:              this.accountSelected.type_code || 0,
                            uuid:                   this.accountSelected.uuid || ''
                        },
                        amount:           parseFloat(this.taxPayroll.amount ?  this.taxPayroll.amount: 0)
                    })
                    window.console.log(1, this.currencySelected)
                    payrollHandler.createTax(data).then(response => {
                        if (response.data.statusCode === 201) {
                            const res = response.data
                            const index = this.payrollTax.findIndex(item => {
                                return (res.data.id === item.id)
                            })
                            if (this.taxPayroll.length === 0) {
                                this.loadTax()
                            } else {
                                if (index < 0) {
                                    this.payrollTax.push(res.data)
                                } else {
                                    this.payrollTax.splice(index, 1, res.data)
                                }
                            }
                            this.$snotify.success('Success')
                            this.clear()
                            this.close()
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
        goEdit(e){
            new Promise(resolve => {
                setTimeout(() => {
                resolve('resolved');
                e.preventDefault();
                let grid = kendo.jQuery("#gridTax").data("kendoGrid");
                let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
                this.natureSelected = dataItem.nature
                this.taxList = dataItem.rate
                this.effectiveDate = dataItem.effectiveDate
                this.currencySelected = dataItem.currency
                this.accountSelected = dataItem.account
                this.taxPayroll = dataItem
                this.dialogM2 = true
                }, 10);
            })
        },
        onNewClick() {
            this.clear()
            this.taxList.push({

            })
        },
        close() {
            this.dialogM2 = false
        },
        clear() {
            this.natureSelected = {
                id: 'Resident_Salary',
                name: 'Resident Salary'
            }
            this.currencySelected = ''
            this.effectiveDate = ''
            this.taxPayroll = {}
            this.taxList = []
            this.accountSelected = ''
        },
        addRow() {
            let ds = this.$refs.dataSource.kendoWidget(),
                total = ds.total();
            ds.insert(total, {
                taxList: {}
            })
        },
        removeRow(e) {
            e.preventDefault();
            const grid = kendo.jQuery("#grid").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        rowNumberTmpl(dataItem) {
            var ds = this.$refs.dataSource.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        loadAccount(){
            let number = 21
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getByAccountType(number)
                    .then(res => {
                        if(res){
                            this.accountList = res.data
                            this.showLoading = false
                        }
                    })
                }, 300);
            })
        },
        loadAccountBenefit(){
            let number = 34
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getByAccountType(number)
                    .then(res => {
                        if(res){
                            this.accountBenefitList = res.data
                            this.showLoading = false
                        }
                    })
                }, 300);
            })
        },
    },
    mounted: async function () {
        this.loadTax()
        this.loadCurrency()
        this.loadAccount()
        this.loadAccountBenefit()
    }
};
</script>
<style scoped>
.my_table {
    width: 100%;
    border-collapse: collapse;
}

.my_table td {
    border: 1px solid #000;
    border-collapse: collapse;
    padding: 8px;
}

.my_table th {
    border: 1px solid #000;
    border-collapse: collapse;
}

.function_footer {
    padding: 15px;
    display: inline-block;
}

.theme--light.v-data-table {
    background-color: none !important;
}

.setCardHeight {
    min-height: 480px;
}

.setCardHeightOther {
    height: 280px !important;
}
.card_header{
    position: fixed;
    width: 49.8%;
    background: #fff;
    z-index: 100;
}

@media (max-width: 676px) {
    .card_header{
        position: fixed;
        width: 88%;
        background: #fff;
        z-index: 100;
    }

}
@media (max-width: 1026px) {
    .card_header{
        position: fixed;
        width: 68%;
        background: #fff;
        z-index: 100;
    }
}
</style>