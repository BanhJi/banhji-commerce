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
                                    <h2 class="font_22">{{ $t('sale_record') }}</h2>
                                </v-col>

                                <v-col sm="4" cols="12" class="py-1">
                                    <v-btn @click="addSale" class="float-right capitalize white--text"
                                           color="primary">
                                        {{ $t('add_new') }}
                                    </v-btn>
                                    <v-btn @click="getSaleInvoice()"
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
                                              :data="saleRecord"
                            />
                            <kendo-grid id="gridSale" class="grid-function"
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
                                    :field="'&nbsp;'"
                                    :command="{name: 'delete',iconClass: 'k-icon k-i-trash', text: ' ', click: removeRow, class: 'btn-plus'}"
                                    :title="'&nbsp;'"
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
                                    :field="'customer'"
                                    :title="$t('id')"
                                    :hidden="true"
                                    :template="'<span>#=customer.consumerId#</span>'"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'customer'"
                                    :title="$t('name')"
                                    :attributes="{class:'text-bold'}"
                                    :template="'<span>#=customer.name#</span>'"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'customer'"
                                    :title="$t('type')"
                                    :template="'<span>#=customer.nature#</span>'"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <!--                                <kendo-grid-column-->
                                <!--                                    :field="'taxName'"-->
                                <!--                                    :hidden="true"-->
                                <!--                                    :template="'<span>#=taxName#</span>'"-->
                                <!--                                    :title="$t('type_of_product')"-->
                                <!--                                    :headerAttributes="{-->
                                <!--                                                                    style: 'background-color: #EDF1F5'-->
                                <!--                                                                }"/>-->
                                <kendo-grid-column
                                    :field="'totalAmountInclusive'"
                                    :hidden="true"
                                    :template="'<span>#= kendo.toString(totalAmountInclusive, `n2`)#</span>'"
                                    :title="$t('amount_vat_inclusive')"
                                    :attributes="{style: 'text-align: right'}"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'totalAmountNetVat'"
                                    :hidden="true"
                                    :title="$t('amount_net_vat')"
                                    :template="'<span>#= kendo.toString(totalAmountNetVat, `n2`)#</span>'"
                                    :attributes="{style: 'text-align: right'}"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'totalSpecificTax'"
                                    :hidden="true"
                                    :title="$t('specific_tax')"
                                    :attributes="{style: 'text-align: right'}"
                                    :template="'<span>#= kendo.toString(totalSpecificTax, `n2`)#</span>'"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'totalPubTax'"
                                    :hidden="true"
                                    :title="$t('public_lighting_tax')"
                                    :template="'<span>#= kendo.toString(totalPubTax, `n2`)#</span>'"
                                    :attributes="{style: 'text-align: right'}"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'totalAccomTax'"
                                    :title="$t('accom_tax')"
                                    :hidden="true"
                                    :template="'<span>#= kendo.toString(totalAccomTax, `n2`)#</span>'"
                                    :attributes="{style: 'text-align: right'}"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="'totalVAT'"
                                    :title="$t('vat_amount')"
                                    :template="'<span>#= kendo.toString(totalVAT, `n2`)#</span>'"
                                    :attributes="{style: 'text-align: right'}"
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
                                    :hidden="true"
                                    :title="$t('status')"
                                    :template="'<span>#=status === 1 ? `Add` : `Edit`#</span>'"
                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                <kendo-grid-column
                                    :field="''"
                                    :command="[{iconClass: 'k-icon k-i-edit',name: 'edit', text: '',click: goEdit,class: 'btn-plus'}]"
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
import kendo from "@progress/kendo-ui";
import {uuid} from 'vue-uuid'
import $ from "jquery";
import SaleRecord from "@/scripts/compliance/model/SaleRecord";

const dashboardHandler = require("@/scripts/dashboard/customer/handler/dashboardHandler")
const saleHandler = require("@/scripts/compliance/handler/saleHandler")
export default {
    data: () => ({
        showLoading: false,
        sales: [],
        iSale: [],
        is_month: false,
        is_start_date: false,
        is_end_date: false,
        start_date: "",
        end_date: "",
        search: {
            start_date: "",
            end_date: ""
        },
        transactions: []
    }),
    props: ['monthlyReturn'],
    watch: {'saleRecord': 'onUpdateSale', 'iSales': 'onPushSale'},
    // async activated() {
    //     await this.onloadSale()
    // },
    methods: {
        async removeRow(e) {
            e.preventDefault();
            const grid = kendo.jQuery("#gridSale").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
                // this.autoCalculate();
                await this.onGetDataSource()
            }
        },
        async goEdit(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridSale").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            const sale = new SaleRecord(dataItem);
            this.$router.push({
                path: 'add_sale/' + this.$route.params.id,
                name: 'Add Sale',
                params: {id: this.$route.params.id, sale: sale, monthlyReturn: this.monthly},
                query: {s_id: sale.id, type: 'Edit'}
            })
            window.console.log(sale, "sale record");
        },
        async onGetDataSource() {
            let ds = this.$refs.dataSource.kendoWidget()
            let dataRow = ds.data()
            const itemLine = []
            dataRow.forEach(i => {
                itemLine.push({
                    id: i.id,
                    type: 'sale',
                    reference: i.reference,
                    date: i.date,
                    customer: i.customer,
                    taxName: i.taxName,
                    monthOf: i.monthOf,
                    description: i.description,
                    monthlyReturnId: i.monthlyReturnId,
                    taxType: i.taxType,
                    totalAmountInclusive: i.totalAmountInclusive,
                    totalAmountNetVat: i.totalAmountNetVat,
                    totalSpecificTax: i.totalSpecificTax,
                    totalPubTax: i.totalPubTax,
                    totalAccomTax: i.totalAccomTax,
                    totalVAT: i.totalVAT,
                    status: i.status,
                    isSave: i.isSave,
                    dataSource: i.dataSource,
                    itemLine: i.itemLine
                })
            })
            this.sales = itemLine
            window.console.log(itemLine, 'itemline 21312')
        },
        getSaleInvoice() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    const startDate = this.monthly.monthOf + '-01'
                    const endDate = this.monthly.monthOf + '-31'
                    let strFilter = ''
                    strFilter = '?start=' + startDate + '&end=' + endDate + '&type=Compliance'
                    dashboardHandler.saleTaxDetail(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            let data = res.data.data, sale = []
                            if (data.length <= 0) {
                                this.$snotify.error('No Invoice!!!')
                                return
                            }
                            window.console.log(data, 'data billing')
                            for (let i = 0; i < data.length; i++) {
                                let base = data[i].type !== 'Invoice' ? -1 : 1
                                if (sale.filter(p => p.reference === data[i].referenceNo).length > 0) {
                                    const index = sale.findIndex(p => p.reference === data[i].referenceNo)
                                    sale[index].totalVAT += (data[i].taxAmount + data[i].otherTax.amount + data[i].publicTax.amount + data[i].specificTax.amount) * base
                                    sale[index].totalSpecificTax += data[i].specificTax.amount
                                    sale[index].totalPubTax += data[i].publicTax.amount * base
                                    sale[index].totalAccomTax += data[i].otherTax.amount * base
                                    sale[index].totalAmountInclusive += data[i].baseAmount.toLowerCase() === 'inclusive' ? (data[i].amount / (1 + (data[i].rate / 100))) * base : 0
                                    sale[index].totalAmountNetVat += data[i].baseAmount.toLowerCase() === 'net' ? data[i].amount * base : 0
                                    sale[index].itemLine.push({
                                        referenceNo: data[i].referenceNo,
                                        amount: data[i].amount * base,
                                        amountInclusive: data[i].baseAmount.toLowerCase() === 'inclusive' ? (data[i].amount - data[i].taxAmount) * base : 0,
                                        amountNetVat: data[i].baseAmount.toLowerCase() === 'net' ? data[i].amount * base : 0,
                                        amountSpecificTax: data[i].specificTax.amount * base,
                                        specificTax: {
                                            name: data[i].specificTax.name,
                                            accountId: data[i].specificTax.accountId ? data[i].specificTax.accountId : ''
                                        },
                                        pubTax: {
                                            name: data[i].publicTax.name,
                                            accountId: data[i].publicTax.accountId ? data[i].publicTax.accountId : ''
                                        },
                                        accomTax: {
                                            name: data[i].otherTax.name,
                                            accountId: data[i].otherTax.accountId ? data[i].otherTax.accountId : ''
                                        },
                                        vat: data[i].taxAmount,
                                        amountPubTax: data[i].publicTax.amount * base,
                                        amountAccomTax: data[i].otherTax.amount * base,
                                        description: '',
                                        taxName: {
                                            name: data[i].taxName,
                                            accountId: data[i].accountId
                                        },
                                        baseAmount: data[i].baseAmount,
                                    })
                                } else {
                                    let customer = {}
                                    if (data[i].nature.toLowerCase() === 'individual-foreign') {
                                        customer = {
                                            id: data[i].customerId ? data[i].customerId : '',
                                            consumerId: data[i].crn ? data[i].crn : '',
                                            name: data[i].name,
                                            nature: data[i].nature,
                                            taxPayerType: 'Physical Person',
                                            natureTaxType: 'Non-Resident'
                                        }
                                    } else if (data[i].nature.toLowerCase() === 'foreign entity') {
                                        customer = {
                                            id: data[i].customerId ? data[i].customerId : '',
                                            consumerId: data[i].crn ? data[i].crn : '',
                                            name: data[i].name,
                                            nature: data[i].nature,
                                            taxPayerType: 'Legal Person',
                                            natureTaxType: 'Non-Resident'
                                        }
                                    } else if (data[i].nature.toLowerCase() === 'individual-local') {
                                        customer = {
                                            id: data[i].customerId ? data[i].customerId : '',
                                            consumerId: data[i].crn ? data[i].crn : '',
                                            name: data[i].name,
                                            nature: data[i].nature,
                                            taxPayerType: 'Physical Person',
                                            natureTaxType: 'Resident'
                                        }
                                    } else if (data[i].nature.toLowerCase() === 'non-taxable entity' || data[i].nature.toLowerCase() === 'taxable entity') {
                                        customer = {
                                            id: data[i].customerId ? data[i].customerId : '',
                                            consumerId: data[i].crn ? data[i].crn : '',
                                            name: data[i].name,
                                            nature: data[i].nature,
                                            taxPayerType: 'Legal Person',
                                            natureTaxType: 'Resident'
                                        }
                                    }
                                    sale.push({
                                        id: `mr-${uuid.v1()}`,
                                        type: 'sale',
                                        reference: data[i].referenceNo,
                                        date: data[i].transactionDate,
                                        customer: customer,
                                        taxName: {
                                            name: data[i].taxName,
                                            accountId: data[i].accountId
                                        },
                                        monthOf: this.monthly.monthOf,
                                        description: '',
                                        monthlyReturnId: this.monthly.id,
                                        taxType: data[i].taxType,
                                        totalAmountInclusive: data[i].baseAmount.toLowerCase() === 'inclusive' ? (data[i].amount / (1 + (data[i].rate / 100))) * base : 0,
                                        totalAmountNetVat: data[i].baseAmount.toLowerCase() === 'net' ? data[i].amount * base : 0,
                                        totalSpecificTax: data[i].specificTax.amount * base,
                                        totalPubTax: data[i].publicTax.amount * base,
                                        totalAccomTax: data[i].otherTax.amount * base,
                                        totalVAT: (data[i].taxAmount + data[i].otherTax.amount + data[i].publicTax.amount + data[i].specificTax.amount) * base,
                                        status: 1,
                                        isSave: false,
                                        dataSource: {id: 1, name: "Invoice Data"},
                                        itemLine: [{
                                            referenceNo: data[i].referenceNo,
                                            amount: data[i].amount * base,
                                            amountInclusive: data[i].baseAmount.toLowerCase() === 'inclusive' ? (data[i].amount / (1 + (data[i].rate / 100))) * base : 0,
                                            amountNetVat: data[i].baseAmount.toLowerCase() === 'net' ? (data[i].amount) * base : 0,
                                            amountSpecificTax: data[i].specificTax.amount * base,
                                            specificTax: {
                                                name: data[i].specificTax.name,
                                                accountId: data[i].specificTax.accountId ? data[i].specificTax.accountId : ''
                                            },
                                            pubTax: {
                                                name: data[i].publicTax.name,
                                                accountId: data[i].publicTax.accountId ? data[i].publicTax.accountId : ''
                                            },
                                            accomTax: {
                                                name: data[i].otherTax.name,
                                                accountId: data[i].otherTax.accountId ? data[i].otherTax.accountId : ''
                                            },
                                            vat: data[i].taxAmount * base,
                                            amountPubTax: data[i].publicTax.amount * base,
                                            amountAccomTax: data[i].otherTax.amount * base,
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
                            window.console.log(sale, 'result itemline')
                            this.iSale = sale
                        } else {
                            this.$snotify.error(`error on get invoices`)
                        }
                        this.showLoading = false
                    })
                }, 300)
            })
        },
        autoCalculateTax(tax, amount) {
            // window.console.log(tax,'tax')
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
        addSale() {
            this.$router.push({
                name: 'Add Sale',
                path: 'add_sale/' + this.monthly.id,
                params: {id: this.monthly.id, monthlyReturn: this.monthly},
                query: {type: 'Added'}
            });
        },
        onUpdateSale() {
            this.$emit('getSale', this.saleRecord)
        },
        getSale(sale) {
            this.sales.push(sale)
        },
        onPushSale() {
            if (this.sales.length > 0) {
                const allArray = [...this.sales, ...this.iSales]
                this.sales = allArray.filter((e, i) => allArray.findIndex(o => o.totalSpecificTax === e.totalSpecificTax && o.totalPubTax === e.totalPubTax && o.totalAccomTax === e.totalAccomTax && o.totalVAT === e.totalVAT && o.totalAmountInclusive === e.totalAmountInclusive && o.totalAmountNetVat === e.totalAmountNetVat) === i)
            } else {
                this.sales = this.iSales
            }

            // const sale = JSON.parse(localStorage.getItem(this.monthlyReturn.abbr + this.monthly.number + '&Sale'))
            // if (sale.length > 0) {
            //     if (this.sales.length > 0) {
            //         let resStorage = []
            //         const r1 = this.sales.filter(e => e.isSave === false || e.isSave === undefined)
            //         const otherArray = [...r1, ...sale]
            //         resStorage = otherArray.filter((e, i) => otherArray.findIndex(o => o.totalSpecificTax === e.totalSpecificTax && o.totalPubTax === e.totalPubTax && o.totalAccomTax === e.totalAccomTax && o.totalVAT === e.totalVAT && o.totalAmountInclusive === e.totalAmountInclusive && o.totalAmountNetVat === e.totalAmountNetVat) === i)
            //         if (resStorage.length > 0) {
            //             if (this.monthly.abbr !== '' && this.monthly.number !== '') {
            //                 localStorage.setItem(this.monthly.abbr + this.monthly.number + '&Sale', JSON.stringify(resStorage))
            //             }
            //         }
            //     }
            // } else {
            //     const r1 = this.sales.filter(e => e.isSave === false || e.isSave === undefined)
            //     if (this.monthly.abbr !== '' && this.monthly.number !== '') {
            //         localStorage.setItem(this.monthly.abbr + this.monthly.number + '&Sale', JSON.stringify(r1))
            //     }
            // }
            window.console.log(this.sales, 'results')
        },
        onloadSale() {
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    saleHandler.getByMrId(this.$route.params.id).then(res => {
                        // window.console.log(data, 'sale8765')
                        this.sales = res.data.data
                        let data = this.$store.state.compliance.sale
                        // let data = JSON.parse(localStorage.getItem(this.monthly.abbr + this.monthly.number + '&Sale'))
                        let allArray = []
                        if (data) {
                            if (data.length > 0) {
                                allArray = [...this.sales, ...data]
                            } else {
                                allArray = this.sales
                            }
                        }
                        this.sales = allArray.filter((e, i) => allArray.findIndex(o => o.totalSpecificTax === e.totalSpecificTax && o.totalPubTax === e.totalPubTax && o.totalAccomTax === e.totalAccomTax && o.totalVAT === e.totalVAT && o.totalAmountInclusive === e.totalAmountInclusive && o.totalAmountNetVat === e.totalAmountNetVat) === i)
                        // window.console.log(data, '8888')
                        this.onUpdateSale()
                        this.showLoading = false
                        window.console.log(this.sales)
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
        await this.onloadSale()
    },
    computed: {
        iSales() {
            if (this.iSale.length > 0) {
                return this.iSale
            } else {
                return []
            }
        },
        monthly() {
            if (this.monthlyReturn !== undefined) {
                return this.monthlyReturn
            } else {
                return {}
            }
        },
        // sale() {
        //     if (JSON.parse(localStorage.getItem(this.monthly.number + '&Sale'))) {
        //         if (JSON.parse(localStorage.getItem(this.monthly.number + '&Sale')).length > 0) {
        //             return JSON.parse(localStorage.getItem(this.monthly.number + '&Sale'))
        //         } else {
        //             return []
        //         }
        //     } else {
        //         return []
        //     }
        // },
        saleRecord() {
            if (this.sales.length > 0) {
                return this.sales
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
