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
                                    <h2 class="font_22">{{ $t('purchase_record') }}</h2>
                                </v-col>

                                <v-col sm="4" cols="12" class="py-1">
                                    <v-btn @click="addPurchase" class="float-right capitalize white--text"
                                           color="primary">
                                        {{ $t('add_new') }}
                                    </v-btn>
                                    <v-btn @click="getPurchaseInvoice('Purchase')"
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
                                              :data="purchaseRecord"
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
                                    :template="'<span>#=reference#</span>'"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'date'"
                                    :title="$t('date')"
                                    :template="'<span>#=date#</span>'"
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
                                    :field="'supplier'"
                                    :title="$t('type')"
                                    :template="'<span>#=supplier.nature#</span>'"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
<!--                                <kendo-grid-column-->
<!--                                    :field="'taxName'"-->
<!--                                    :hidden="true"-->
<!--                                    :title="$t('type_of_product')"-->
<!--                                    :template="'<span>#=taxName.name#</span>'"-->
<!--                                    :headerAttributes="{-->
<!--                                                                    style: 'background-color: #EDF1F5'-->
<!--                                                                }"/>-->
                                <kendo-grid-column
                                    :field="'totalAmountInclusive'"
                                    :title="$t('amount_vat_inclusive')"
                                    :template="'<span>#= kendo.toString(totalAmountInclusive, `n2`)#</span>'"
                                    :hidden="true"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'totalAmountNetVat'"
                                    :title="$t('amount_net_vat')"
                                    :template="'<span>#= kendo.toString(totalAmountNetVat, `n2`)#</span>'"
                                    :hidden="true"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>

                                <kendo-grid-column
                                    :field="'totalVAT'"
                                    :title="$t('vat_amount')"
                                    :template="'<span>#= kendo.toString(totalVAT, `n2`)#</span>'"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'dataSource'"
                                    :title="$t('source')"
                                    :template="'<span>#=dataSource.name#</span>'"
                                    :hidden="true"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'status'"
                                    :hidden="true"
                                    :title="$t('status')"
                                    :template="'<span>#=status === 1 ? `Add` : `Edit`#</span>'"
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
                                :type="'loading'"
                                :fullPage="false"
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
import kendo from "@progress/kendo-ui";
import {uuid} from "vue-uuid";
import $ from "jquery";
import PurchaseRecord from "@/scripts/compliance/model/PurchaseRecord";
const dashboardHandler = require("@/scripts/dashboard/customer/handler/dashboardHandler");

const purchaseHandler = require("@/scripts/compliance/handler/purchaseHandler")
export default {
    data: () => ({
        showLoading: false,
        purchases: [],
        is_month: false,
        is_start_date: false,
        is_end_date: false,
        start_date: "",
        end_date: "",

        search: {
            start_date: "",
            end_date: ""
        },
        iPurchase: [],
    }),
    props: ['monthlyReturn', 'currency'],
    watch: {'purchaseRecord': 'onUpdatePurchase', 'iPurchases': 'onPushPurchase'},
    // async activated() {
    //     await this.onloadPurchase()
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
            const purchase = new PurchaseRecord(dataItem);
            this.$router.push({
                path: 'add_purchase/' + this.$route.params.id,
                name: 'Add Purchase',
                params: {id: this.$route.params.id, purchase: purchase, monthlyReturn: this.monthly},
                query: {p_id: purchase.id, type: 'Edit'}
            })
            window.console.log(purchase, "purchase record");
        },
        getPurchaseInvoice(type) {
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
                            let data = res.data.data, purchase = []
                            window.console.log(data, purchase, 'purchases')
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].taxType !== 'Withholding Tax') {
                                    if (purchase.filter(p => p.reference === data[i].referenceNo).length > 0) {
                                        const index = purchase.findIndex(p => p.reference === data[i].referenceNo)
                                        purchase[index].totalVAT += data[i].taxAmount
                                        purchase[index].totalAmountInclusive += data[i].baseAmount.toLowerCase() === 'inclusive' ? data[i].amount / (1 + (data[i].taxRate / 100)) : 0
                                        purchase[index].totalAmountNetVat += data[i].baseAmount.toLowerCase() === 'net' ? data[i].amount : 0
                                        purchase[index].itemLine.push({
                                            referenceNo: data[i].referenceNo,
                                            amount: data[i].amount,
                                            amountInclusive: data[i].baseAmount.toLowerCase() === 'inclusive' ? data[i].amount - data[i].taxAmount : 0,
                                            amountNetVat: data[i].baseAmount.toLowerCase() === 'net' ? data[i].amount : 0,
                                            vat: data[i].taxAmount,
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
                                        purchase.push({
                                            id: `mr-${uuid.v1()}`,
                                            type: 'purchase',
                                            reference: data[i].referenceNo,
                                            date: data[i].transactionDate,
                                            supplier: supplier,
                                            taxName: {
                                                name: data[i].taxName,
                                                accountId: data[i].accountId,
                                                code: data[i].line.code
                                            },
                                            taxType: data[i].taxType,
                                            totalAmountInclusive: data[i].baseAmount.toLowerCase() === 'inclusive' ? data[i].amount / (1 + (data[i].taxRate / 100)) : 0,
                                            totalAmountNetVat: data[i].baseAmount.toLowerCase() === 'net' ? data[i].amount : 0,
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
                                                amountInclusive: data[i].baseAmount.toLowerCase() === 'inclusive' ? data[i].amount - data[i].taxAmount : 0,
                                                amountNetVat: data[i].baseAmount.toLowerCase() === 'net' ? data[i].amount : 0,
                                                vat: data[i].taxAmount,
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
                            }
                            this.iPurchase = purchase
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
        onPushPurchase() {
            window.console.log(this.iPurchases, '0987')
            if (this.iPurchases.length > 0) {
                const allArray = [...this.purchases, ...this.iPurchases]
                window.console.log(allArray, 'allArray')
                if (allArray.length > 1) {
                    this.purchases = allArray.filter((e, i) => allArray.findIndex(o => o.reference === e.reference && o.totalVAT === e.totalVAT && o.totalAmountInclusive === e.totalAmountInclusive && o.totalAmountNetVat === e.totalAmountNetVat) === i)
                } else {
                    this.purchases = allArray
                }
            }
            // const purchase = JSON.parse(localStorage.getItem(this.monthly.abbr + this.monthly.number + '&Purchase'))
            // if (purchase.length > 0) {
            //     if (this.purchases.length > 0) {
            //         let resStorage = []
            //         const r1 = this.purchases.filter(e => e.isSave === false || e.isSave === undefined)
            //         const otherArray = [...r1, ...this.purchases]
            //         resStorage = otherArray.filter((e, i) => otherArray.findIndex(o => o.reference === e.reference && o.totalVAT === e.totalVAT && o.totalAmountInclusive === e.totalAmountInclusive && o.totalAmountNetVat === e.totalAmountNetVat) === i)
            //         if (resStorage.length > 0) {
            //             if (this.monthly.abbr !== '' && this.monthly.number !== '') {
            //                 localStorage.setItem(this.monthly.abbr + this.monthly.number + '&Purchase', JSON.stringify(resStorage))
            //             }
            //         }
            //     }
            // } else {
            //     const r1 = this.purchases.filter(e => e.isSave === false || e.isSave === undefined)
            //     if (this.monthly.abbr !== '' && this.monthly.number !== '') {
            //         localStorage.setItem(this.monthly.abbr + this.monthly.number + '&Purchase', JSON.stringify(r1))
            //     }
            // }
            window.console.log(this.purchases, 'purchases')
        },
        onUpdatePurchase() {
            this.$emit('getPurchase', this.purchaseRecord)
        },
        addPurchase() {
            this.$router.push({
                name: 'Add Purchase',
                path: 'add_purchase/' + this.monthly.id,
                params: {id: this.monthly.id, monthlyReturn: this.monthly},
                query: {type: 'Added'}
            });
        },
        async onloadPurchase() {
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    purchaseHandler.getByMrId(this.$route.params.id).then(res => {
                        this.purchases = res.data.data
                        let data = JSON.parse(localStorage.getItem(this.monthly.abbr + this.monthly.number + '&Purchase'))
                        const allArray = [...this.purchases, ...data]
                        this.purchases = allArray.filter((e, i) => allArray.findIndex(o => o.reference === e.reference && o.totalVAT === e.totalVAT && o.totalAmountInclusive === e.totalAmountInclusive && o.totalAmountNetVat === e.totalAmountNetVat) === i)
                        this.onUpdatePurchase()
                        this.showLoading = false
                        window.console.log(this.purchases)
                    })
                }, 200)
            })
        },
        onSearch() {
            this.search = {
                'start_date': this.start_date + '-01',
                'end_date': this.end_date + '-01'
            }
        }
    },
    async mounted() {
        await this.onloadPurchase()
    },
    computed: {
        iPurchases() {
            if (this.iPurchase.length > 0) {
                return this.iPurchase
            } else {
                return []
            }
        },
        // purchase() {
        //     if (JSON.parse(localStorage.getItem(this.monthly.number + '&Purchase')).length > 0) {
        //         window.console.log('1234')
        //         return JSON.parse(localStorage.getItem(this.monthly.number + '&Purchase'))
        //     } else {
        //         return []
        //     }
        // },
        purchaseRecord() {
            if (this.purchases.length > 0) {
                return this.purchases
            } else {
                return []
            }
        },
        monthly() {
            if (this.monthlyReturn.id !== undefined) {
                return this.monthlyReturn
            } else {
                return {}
            }
        },
        currencies() {
            if (this.currency) {
                return this.currency
            } else {
                return {}
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
