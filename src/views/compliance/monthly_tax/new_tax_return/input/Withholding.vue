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
                                    <h2 class="font_22">{{ $t('withholding_tax') }}</h2>
                                </v-col>

                                <v-col sm="4" cols="12" class="py-1">
                                    <v-btn @click="addWithholding" class="float-right capitalize white--text"
                                           color="primary">
                                        {{ $t('add_new') }}
                                    </v-btn>
                                    <v-btn @click="getWithholdingInvoice('Purchase')"
                                           class="float-right capitalize white--text mx-2" color="primary">
                                        {{ $t('get_data') }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>

                    <v-row class="">
                        <v-col sm="12" cols="12" class="py-0">
                            <kendo-datasource ref="dataSource"
                                              :page-size='10'
                                              :data="withholdingRecord"
                            />
                            <kendo-grid id="gridReceivable" class="grid-function"
                                        :data-source-ref="'dataSource'"
                                        :sortable="false"
                                        :groupable="false"
                                        :filterable="false"
                                        :column-menu="true"
                                        :pageable="true"
                                        :editable="false"
                                        :noRecords="true"
                                        :scrollable-virtual="true"
                            >
                                <kendo-grid-column
                                    :command="{name: 'delete',iconClass: 'k-icon k-i-trash', text: ' ', click: removeRow, class: 'btn-plus'}"
                                    :title="''"
                                    :width="63"
                                    :headerAttributes="{style:'text-align: left; background-color: #EDF1F5'}"/>
                                <kendo-grid-column
                                    :field="'reference'"
                                    :title="$t('num')"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'date'"
                                    :title="$t('date')"
                                    :template="'<span>#=kendo.toString(new Date(date), \'MM-yyyy\')#</span>'"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'monthOf'"
                                    :title="$t('month')"
                                    :hidden="true"
                                    :template="'<span>#=monthOf#</span>'"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'supplier'"
                                    :title="$t('id')"
                                    :template="'<span>#=supplier.supplierId#</span>'"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'supplier'"
                                    :title="$t('name')"
                                    :attributes="{class:'text-bold'}"
                                    :template="'<span>#=supplier.name#</span>'"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'natureTaxType'"
                                    :title="$t('nature_of_wht')"
                                    :template="'<span>#=supplier.natureTaxType#</span>'"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'totalAmount'"
                                    :hidden="true"
                                    :template="'<span>#= kendo.toString(totalAmount, `n2`)#</span>'"
                                    :title="$t('amount')"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'totalVAT'"
                                    :title="$t('amount_wht')"
                                    :template="'<span>#= kendo.toString(totalVAT, `n2`)#</span>'"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'dataSource'"
                                    :title="$t('source')"
                                    :hidden="true"
                                    :template="'<span>#=dataSource.name#</span>'"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'status'"
                                    :title="$t('status')"
                                    :template="'<span>#=status.name#</span>'"
                                    :hidden="true"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :command="{name: 'edit',iconClass: 'k-icon k-i-edit',text: ' ',click: goEdit,class: 'btn-plus'}"
                                    :title="''"
                                    :width="50"
                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"
                                />
                            </kendo-grid>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                :type="'loading'"
                                :myLoading="true"
                            />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
        <!-- </v-card>
    </v-col> -->
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
import {uuid} from "vue-uuid";
import kendo from "@progress/kendo-ui";
import $ from "jquery";
import WithholdingRecord from "@/scripts/compliance/model/WithholdingRecord";

const withholdingHandler = require("@/scripts/compliance/handler/withholdingTaxHandler")
const dashboardHandler = require("@/scripts/dashboard/customer/handler/dashboardHandler");
export default {
    data: () => ({
        showLoading: false,
        withholdings: [],
        is_month: false,
        is_start_date: false,
        is_end_date: false,
        start_date: "",
        end_date: "",

        search: {
            start_date: "",
            end_date: ""
        },
        iWithholding: [],
    }),
    props: ['monthlyReturn'],
    watch: {'withholdingRecord': 'onUpdate', 'iWithholdings': 'onPushWithholding'},
    // async activated() {
    //     await this.onloadWithholding()
    // },
    methods: {
        removeRow(e) {
            e.preventDefault();
            const grid = kendo.jQuery("#gridReceivable").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
                // this.autoCalculate();
            }
        },
        goEdit(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridReceivable").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            const withholding = new WithholdingRecord(dataItem);
            this.$router.push({
                path: 'add_withholding_tax/' + this.$route.params.id,
                name: 'Add Withholding Tax',
                params: {id: this.$route.params.id, withholding: withholding, monthlyReturn: this.monthly},
                query: {w_id: withholding.id, type: 'Edit'}
            })
            window.console.log(withholding, "purchase record");
        },
        getWithholdingInvoice(type) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    const startDate = this.monthly.monthOf + '-01'
                    const endDate = this.monthly.monthOf + '-31'
                    // window.console.log(startDate, endDate, 'date')
                    let strFilter = ''
                    if (type !== '') {
                        strFilter = '?start=' + startDate + '&end=' + endDate + '&nature=' + type + '&type=Compliance'
                    } else {
                        strFilter = '?start=' + startDate + '&end=' + endDate
                    }
                    dashboardHandler.saleTaxDetail(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            let data = res.data.data, withholding = []
                            window.console.log(data, withholding, 'withholding')
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].taxType === 'Withholding Tax') {
                                    if (withholding.filter(p => p.reference === data[i].referenceNo).length > 0) {
                                        const index = withholding.findIndex(p => p.reference === data[i].referenceNo)
                                        withholding[index].totalVAT += data[i].taxAmount
                                        withholding[index].totalAmount += data[i].baseAmount.toLowerCase() === 'inclusive' ? data[i].amount / (1 + (data[i].taxRate / 100)) : data[i].amount
                                        withholding[index].itemLine.push({
                                            referenceNo: data[i].referenceNo,
                                            amount: data[i].amount,
                                            vat: data[i].taxAmount,
                                            natureTaxType: withholding[index].itemLine[0].natureTaxType,
                                            description: '',
                                            taxName: {
                                                name: data[i].taxName,
                                                accountId: data[i].accountId
                                            },
                                            baseAmount: data[i].baseAmount,
                                        })
                                    } else {
                                        let supplier = {}
                                        if (data[i].nature.toLowerCase() === 'individual-foreign') {
                                            supplier = {
                                                id: data[i].supplierId,
                                                supplierId: '',
                                                name: data[i].name,
                                                nature: data[i].nature,
                                                taxPayerType: 'Physical Person',
                                                natureTaxType: 'Non-Resident'
                                            }
                                        } else if (data[i].nature.toLowerCase() === 'foreign entity') {
                                            supplier = {
                                                id: data[i].supplierId,
                                                supplierId: '',
                                                name: data[i].name,
                                                nature: data[i].nature,
                                                taxPayerType: 'Legal Person',
                                                natureTaxType: 'Non-Resident'
                                            }
                                        } else if (data[i].nature.toLowerCase() === 'individual-local') {
                                            supplier = {
                                                id: data[i].supplierId,
                                                supplierId: '',
                                                name: data[i].name,
                                                nature: data[i].nature,
                                                taxPayerType: 'Physical Person',
                                                natureTaxType: 'Resident'
                                            }
                                        } else if (data[i].nature.toLowerCase() === 'non-taxable entity' || data[i].nature.toLowerCase() === 'taxable entity') {
                                            supplier = {
                                                id: data[i].supplierId,
                                                supplierId: '',
                                                name: data[i].name,
                                                nature: data[i].nature,
                                                taxPayerType: 'Legal Person',
                                                natureTaxType: 'Resident'
                                            }
                                        }
                                        withholding.push({
                                            id: `mr-${uuid.v1()}`,
                                            type: 'withholding',
                                            reference: data[i].referenceNo,
                                            date: data[i].transactionDate,
                                            supplier: supplier,
                                            taxName: {
                                                name: data[i].taxName,
                                                accountId: data[i].accountId
                                            },
                                            taxType: data[i].taxType,
                                            totalAmount: data[i].baseAmount.toLowerCase() === 'inclusive' ? data[i].amount / (1 + (data[i].taxRate / 100)) : data[i].amount,
                                            monthOf: this.monthly.monthOf,
                                            description: '',
                                            monthlyReturnId: this.monthly.id,
                                            totalVAT: data[i].taxAmount,
                                            status: 1,
                                            isSave: false,
                                            dataSource: {id: 1, name: "Purchase Data"},
                                            itemLine: [{
                                                referenceNo: data[i].referenceNo,
                                                amount: data[i].amount,
                                                vat: data[i].taxAmount,
                                                natureTaxType: supplier.natureTaxType,
                                                description: '',
                                                taxName: {
                                                    name: data[i].taxName,
                                                    accountId: data[i].accountId
                                                },
                                                baseAmount: data[i].baseAmount,
                                            }]
                                        })
                                    }
                                }
                                window.console.log(withholding, 'withholding')
                                this.iWithholding = withholding
                            }
                        }
                        this.showLoading = false
                    })
                }, 300)
            })
        },
        autoCalculateTax(tax, amount) {
            if (tax) {
                let formula = tax.formula,
                    inAmt = kendo.parseFloat(amount),
                    nAmt = kendo.parseFloat(amount),
                    taxBase = kendo.parseFloat(tax.taxBase) / 100,
                    rate = kendo.parseFloat(tax.rate) / 100,
                    total = eval(formula)
                window.console.log(inAmt, nAmt, taxBase, rate, formula, total)
                return total
            }
        },
        onPushWithholding() {
            const allArray = [...this.withholdings, ...this.iWithholdings]
            this.withholdings = allArray.filter((e, i) => allArray.findIndex(o => o.totalVAT === e.totalVAT && o.totalAmount === e.totalAmount) === i)
            // const withholding = JSON.parse(localStorage.getItem(this.monthly.abbr + this.monthly.number + '&Withholding'))
            // if (withholding.length > 0) {
            //     if (this.withholdings.length > 0) {
            //         let resStorage = []
            //         const r1 = this.withholdings.filter(e => e.isSave === false || e.isSave === undefined)
            //         const otherArray = [...this.withholdings, ...r1]
            //         resStorage = otherArray.filter((e, i) => allArray.findIndex(o => o.totalVAT === e.totalVAT && o.totalAmount === e.totalAmount) === i)
            //         if (resStorage.length > 0) {
            //             if (this.monthly.abbr !== '' && this.monthly.number !== '') {
            //                 localStorage.setItem(this.monthly.abbr + this.monthly.number + '&Withholding', JSON.stringify(resStorage))
            //             }
            //         }
            //     }
            // } else {
            //     const r1 = this.withholdings.filter(e => e.isSave === false || e.isSave === undefined)
            //     if (this.monthly.abbr !== '' && this.monthly.number !== '') {
            //         localStorage.setItem(this.monthly.abbr + this.monthly.number + '&Withholding', JSON.stringify(r1))
            //     }
            // }
        },
        onUpdate() {
            this.$emit('getWithholding', this.withholdingRecord)
        },
        async onloadWithholding() {
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    withholdingHandler.getByMrId(this.$route.params.id).then(res => {
                        window.console.log(res, 'data withholding 123')
                        this.withholdings = res.data.data
                        let data = JSON.parse(localStorage.getItem(this.monthly.abbr + this.monthly.number + '&Withholding'))
                        let allArray
                        window.console.log(data, 'data from local')
                        if (data.length > 0) {
                            allArray = [...this.withholdings, ...data]
                            this.withholdings = allArray.filter((e, i) => allArray.findIndex(o => o.totalVAT === e.totalVAT && o.totalAmount === e.totalAmount) === i)
                        }
                        window.console.log(this.withholdings, 'withholdongs 123')
                        this.onUpdate()
                        this.showLoading = false
                    })
                }, 200)
            })
        },
        addWithholding() {
            this.$router.push({
                name: 'Add Withholding Tax',
                path: 'add_withholding_tax/' + this.monthly.id,
                params: {id: this.monthly.id, monthlyReturn: this.monthly},
                query: {type: 'Added'}
            });
        },
    },
    async mounted() {
        await this.onloadWithholding()
    },
    computed: {
        monthly() {
            if (this.monthlyReturn.id !== undefined) {
                return this.monthlyReturn
            } else {
                return {}
            }
        },
        iWithholdings() {
            if (this.iWithholding.length > 0) {
                return this.iWithholding
            } else {
                return []
            }
        },
        withholdingRecord() {
            if (this.withholdings.length > 0) {
                return this.withholdings
            } else {
                return []
            }
        },
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
