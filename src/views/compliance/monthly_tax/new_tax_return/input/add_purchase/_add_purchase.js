/*
 * Last modified : 3/30/21, 9:52 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
import PurchaseRecord from "@/scripts/compliance/model/PurchaseRecord";
import kendo from "@progress/kendo-ui";
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import MonthlyReturn from "@/scripts/compliance/model/MonthlyReturn";
import LoadingMe from "@/components/Loading";
import {uuid} from 'vue-uuid'
import ItemLinePurchase from "@/scripts/compliance/model/itemLinePurchase";

const $ = require("jquery")
const textField = 'numberName'
const keyField = 'id'
const defaultItem = {[textField]: 'Select supplier...', [keyField]: null}
const emptyItem = {[textField]: 'loading ...'}
const taxSetting = require('@/store/taxSetting');
const taxSettingHandler = require("@/scripts/taxSettingHandler")
const apiUrl = require('@/apiUrl')
const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler")
const purchaseHandler = require("@/scripts/compliance/handler/purchaseHandler")
const supplierHandler = require("@/scripts/supplierHandler")
const purchase = new PurchaseRecord({})
const monthlyReturn = new MonthlyReturn({})
// @vue/component
export default {
    name: 'Add_purchase',

    components: {
        'dropdownlist': DropDownList,
        'LoadingMe': LoadingMe,
    },

    mixins: [],

    props: {},

    data() {
        return {
            dialogTax: false,
            showLoading: false,
            menuJDateAddSale: false,
            purchase: purchase,
            txn_date: new Date().toISOString().substr(0, 10),
            itemLines: [],
            filter: '',
            textField: 'numberName',
            dataItemKey: 'id',
            defaultItem: defaultItem,
            suppBaseUrl: supplierHandler.search(),
            supplierList: [],

            totalVat: 0,
            amountVat: 0,
            amountInclusiveVat: 0,
            amountNetVat: 0,
            monthlyReturn: monthlyReturn,
        }
    },

    computed: {
        typeProductTax() {
            return taxSetting.default.state.listTax
        },
        isDisable() {
            if (this.monthlyReturn.hasOwnProperty('status')) {
                if (this.monthlyReturn.status.code === 1) {
                    if (this.$route.query.type === 'edit') {
                        return false
                    } else if (this.$route.query.type === 'view') {
                        return true
                    } else {
                        return true
                    }
                } else {
                    return true
                }
            } else {
                return true
            }
        },
        id() {
            if (this.$route.params.purchase !== undefined) {
                return this.$route.params.purchase
            }else {
                return ''
            }
        }
    },

    watch: {
        'id': 'initData'
    },

    async mounted() {
        await this.initData()
        await this.loadListTax()
        await this.loadData(0, '', this.suppBaseUrl)
    },

    created() {
    },

    methods: {
        async initData() {
            this.showLoading = true
            if (this.$route.params.id !== undefined && this.$route.params.monthlyReturn === undefined) {
                await this.onLoadOneReturn()
                window.console.log(this.$route.params)
            } else if (this.$route.params.monthlyReturn !== undefined) {
                this.monthlyReturn = this.$route.params.monthlyReturn
            } else {
                await this.clear()
            }
            if (this.$route.query.p_id !== undefined && this.$route.params.purchase === undefined) {
                await this.onloadOnePurchase()
            } else if (this.$route.params.purchase !== undefined) {
                this.purchase = this.$route.params.purchase
                window.console.log(this.purchase, 'list tax')
                const itemLines = []
                for (let i =0; i < this.purchase.itemLine.length; i++) {
                    this.purchase.itemLine[i].taxName = this.typeProductTax.filter(p => p.defaultTax === this.purchase.itemLine[i].taxName.name)[0]
                    itemLines.push(new ItemLinePurchase(this.purchase.itemLine[i]))
                    this.amountVat += this.purchase.itemLine[i].vat || 0
                }
                this.purchase.itemLine = itemLines
                this.amountInclusiveVat = this.purchase.totalAmountInclusive || 0
                this.amountNetVat = this.purchase.totalAmountNetVat || 0
                this.totalVat = this.purchase.totalVAT || 0
            } else {
                await this.clearPurchase()
            }
            if (this.purchase.totalAmountNetVat !== 0 || this.purchase.totalAmountInclusive !== 0 || this.purchase.totalVAT !== 0) {
                this.amountInclusiveVat = this.purchase.totalAmountInclusive
                this.amountNetVat = this.purchase.totalAmountNetVat
                this.totalVat = this.purchase.totalVAT
            }else {
                if (purchase.itemLine.length === 0) {
                    await this.addRow()
                }
            }
            this.showLoading = false
            // if (this.sale.itemLine.length === 0) {
            //     await this.addRow()
            // }
        },
        async clear() {
            await this.clearPurchase()
            await this.clearMonthlyReturn()
        },
        async clearMonthlyReturn() {
            this.monthlyReturn = new MonthlyReturn({})
        },
        disableEditor() {
            return false;
        },
        async clearPurchase() {
            this.purchase = new PurchaseRecord({})
            this.itemLines = []
            this.amountNetVat = 0
            this.amountInclusiveVat = 0
            this.totalVat = 0
        },
        async onloadOnePurchase() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    const id = this.$route.params.id
                    purchaseHandler.getOne(id).then(res => {
                        this.purchase = res.data.data[0]
                    })
                })
            })
        },
        async onLoadOneReturn() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    const id = this.$route.params.id
                    monthlyReturnHandler.getOne(id).then(res => {
                        this.monthlyReturn = res.data.data[0]
                    })
                })
            })
        },
        async loadListTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    taxSettingHandler.get(apiUrl.tax_setting.tax_list_get, "listTax", "setListTax")
                }, 100)
            })
        },
        async onSupplierFilterChanged(event) {
            const filter = event.filter.value
            await this.loadData(0, filter, this.suppBaseUrl)
            this.filter = filter
        },
        async loadData(skip, filter, baseUrl) {
            const url = baseUrl +
                `?filter=${filter}`
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then(this.afterFetch)
        },
        afterFetch(json) {
            this.supplierList = json.data
        },
        onChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.purchase.supplier = value
        },
        calculateTax() {
            let ds = this.$refs.dataSource.kendoWidget()
            let dataRow = ds.data(),
                vatTax = 0, totalTax = 0, totalVat = 0, amountNet = 0, totalNet = 0, amountInc = 0
            this.itemLines = []
            dataRow.forEach(item => {
                amountNet = 0
                amountInc = 0
                if (item.taxName) {
                    let amt = (item.amount)
                    vatTax = this.autoCalculateTax(item.taxName, amt)
                }
                if (item.taxName.baseAmount.toLowerCase() === "inclusive") {
                    amountInc = item.amount / (1 + (item.taxName.rate / 100))
                } else {
                    amountNet = item.amount
                }
                this.itemLines.map((i, index) => {
                    if (i.uid === item.uid) {
                        this.itemLines.splice(index, 1)
                    }
                })
                this.itemLines.push({
                    uid: item.uid,
                    amount: item.amount,
                    amountInclusive: amountInc,
                    amountNetVat: amountNet || 0,
                    vat: vatTax,
                    description: item.description,
                    taxName: {name: item.taxName.defaultTax, accountId: item.taxName.account.id},
                    baseAmount: item.baseAmount
                })
            })
            totalTax += kendo.parseFloat(vatTax)
            totalVat += kendo.parseFloat(amountInc)
            totalNet += kendo.parseFloat(amountNet)

            this.totalVat += totalTax
            this.amountNetVat += totalNet
            this.amountInclusiveVat += totalVat

            window.console.log(this.itemLines)
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
        calculateTaxDelete(dataRow) {
            let vatTax = 0
            if (dataRow.taxName) {
                let amt = dataRow.amount
                vatTax = this.autoCalculateTax(dataRow.taxName, amt)
            }
            this.totalVat = this.totalVat - vatTax
        },
        onDataSourceChanges(e) {
            if (e.field) {
                let dataRow = e.items[0]
                switch (e.field) {
                    case "taxName":
                        dataRow.set("baseAmount", dataRow.taxName.baseAmount)
                        if (dataRow.amount > 0) {
                            this.calculateTax()
                        }
                        break
                    case "amount":
                        if (dataRow.taxName.hasOwnProperty('defaultTax')) {
                            this.calculateTax()
                        }
                        break
                }
            }
        },
        onClose() {
            this.purchase = new PurchaseRecord({})
            this.totalVat = 0
            this.amountInclusiveVat = 0
            this.amountNetVat = 0
            window.history.go(-1)
            // this.$router.push({
            //     name: 'Purchase Record',
            //     path: 'purchase_record',
            //     query: {type: this.$route.query.type},
            //     params: {id: this.monthlyReturn.id, monthlyReturn: this.monthlyReturn}
            // })
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n${this.purchase.decimal}`)
        },
        // Auto Increase number
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.dataSource.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        // Remove Row
        removeRow(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#grid").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                window.console.log(dataItem, 'delete')
                if (dataItem.amount !== 0 || dataItem.taxName.rate !== undefined) {
                    if (dataItem.baseAmount.toLowerCase() === 'net') {
                        this.amountNetVat = this.amountNetVat - dataItem.amount
                        this.calculateTaxDelete(dataItem)
                    }else {
                        let amount = dataItem.amount / (1 + (dataItem.typeProductTax.rate / 100))
                        this.amountInclusiveVat = this.amountInclusiveVat - amount
                        this.calculateTaxDelete(dataItem)
                    }
                }

                dataSource.remove(dataItem);
            }
        },
        typeProductTaxDropdownEditor(container, options) {
            // const tpl = this.typeProductList
            kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 300,
                    dataTextField: "defaultTax",
                    dataValueField: "id",
                    optionLabel: "--- Select ---",
                    dataSource: {
                        data: this.typeProductTax.filter((item) => item.transactionType.toLowerCase() === "purchase" && item.taxType.typeId === 1),
                        group: {
                            field: "baseAmount"
                        }
                    }
                });
        },
        async addRow() {
            let ds = this.$refs.dataSource.kendoWidget(),
                total = ds.total();
            ds.insert(total, {
                typeProductTax: {defaultTax: ""},
                baseAmount: "",
                amount: 0,
                description: "",
            });
        },
        async onSaveClose() {
            this.showLoading = true
            // await this.getDataSource()
            if (this.purchase.supplier.taxPayerType === '') {
                if (this.purchase.supplier.type.toLowerCase() === 'individual-foreign') {
                    this.purchase.supplier.taxPayerType = 'Physical Person'
                    this.purchase.supplier.natureTaxType = 'Non-Resident'
                } else if (this.purchase.supplier.type.toLowerCase() === 'foreign entity') {
                    this.purchase.supplier.taxPayerType = 'Legal Person'
                    this.purchase.supplier.natureTaxType = 'Non-Resident'
                } else if (this.purchase.supplier.type.toLowerCase() === 'individual-local') {
                    this.purchase.supplier.taxPayerType = 'Physical Person'
                    this.purchase.supplier.natureTaxType = 'Resident'
                } else if (this.purchase.supplier.type.toLowerCase() === 'non-taxable entity') {
                    this.purchase.supplier.taxPayerType = 'Legal Person'
                    this.purchase.supplier.natureTaxType = 'Resident'
                } else if (this.purchase.supplier.type.toLowerCase() === 'taxable entity') {
                    this.purchase.supplier.taxPayerType = 'Legal Person'
                    this.purchase.supplier.natureTaxType = 'Resident'
                }
            }
            if (this.itemLines.length < 0 || this.purchase.itemLine.length > 0) {
                window.console.log(this.purchase.itemLine, 'itemline 123412412')
                this.purchase.itemLine = this.purchase.itemLine.map(item => {
                    return {
                        uid: item.uid,
                        amount: item.amount,
                        amountInclusive: item.amountInclusive,
                        amountNetVat: item.amountNetVat,
                        item: item.item,
                        vat: item.vat,
                        description: item.description,
                        taxName: {name: item.taxName.defaultTax, accountId: item.taxName.account.id},
                        baseAmount: item.baseAmount,
                    }
                })
            }
            const data = {
                id: this.purchase.id ? this.purchase.id : `mr-${uuid.v1()}`,
                type: 'purchase',
                date: this.purchase.date,
                monthlyReturnId: this.monthlyReturn.id,
                description: '',
                reference: this.purchase.reference,
                monthOf: this.monthlyReturn.monthOf,
                supplier: this.purchase.supplier,
                totalVAT: this.totalVat,
                totalAmountInclusive: this.amountInclusiveVat,
                totalAmountNetVat: this.amountNetVat,
                itemLine: this.itemLines.length > 0 ? this.itemLines : this.purchase.itemLine,
                isSave: this.purchase.isSave || false,
                status: this.$route.query.type === 'Edit' ? 2 : 1,
                dataSource: this.$route.query.type === 'Edit' ? this.purchase.dataSource : {name: "Manually", id: 2},
            }
            this.purchase.supplier.supplierId = ''
            const result = new PurchaseRecord(data)
            this.$store.dispatch('compliance/pushPurchase', result)
            // let p = JSON.parse(localStorage.getItem(this.monthlyReturn.number+ '&Purchase'))
            // if (p) {
            //     if (p.length <= 0) {
            //         if (this.monthlyReturn.abbr !== '' && this.monthlyReturn.number !== '') {
            //             localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Purchase', JSON.stringify(data))
            //         }
            //     } else {
            //         // localStorage.setItem(this.monthlyReturn.number+ '&Purchase', JSON.stringify([]))
            //         const allArray = [...p, ...data]
            //         results = allArray.filter((e, i) => allArray.findIndex(o => o.totalAmountInclusive === e.totalAmountInclusive && o.totalVAT === e.totalVAT && o.totalAmountNetVat === e.totalAmountNetVat) === i)
            //         window.console.log(results, '34567')
            //         if (this.monthlyReturn.abbr !== '' && this.monthlyReturn.number !== '') {
            //             localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Purchase', JSON.stringify(results))
            //         }
            //     }
            // } else {
            //     localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Purchase', JSON.stringify(data))
            // }
            this.showLoading = false
            this.onClose()
            window.console.log(this.itemLines, data, 'data')
            // new Promise((resolve) => {
            //     setTimeout(() => {
            //         resolve("resolved");
            //         purchaseHandler.create(data).then(res => {
            //             window.console.log(res)
            //             this.showLoading = false
            //             this.onClose()
            //         }).catch(e => {
            //             window.console.error(e)
            //         })
            //     }, 300);
            // })
        },
    }
}
