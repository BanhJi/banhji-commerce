/*
 * Last modified : 3/31/21, 10:09 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
import kendo from "@progress/kendo-ui";
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import {uuid} from 'vue-uuid'
import MonthlyReturn from "@/scripts/compliance/model/MonthlyReturn";
import WithholdingRecord from "@/scripts/compliance/model/WithholdingRecord";

const axios = require('axios')
const $ = require("jquery")
const textField = 'numberName'
const keyField = 'id'
const defaultItem = {[textField]: 'Select supplier...', [keyField]: null}
const emptyItem = {[textField]: 'loading ...'}
const taxSetting = require('@/store/taxSetting');
const taxSettingHandler = require("@/scripts/taxSettingHandler")
const apiUrl = require('@/apiUrl')
const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler")
const supplierHandler = require("@/scripts/supplierHandler")
const withholdingTaxHandler = require("@/scripts/compliance/handler/withholdingTaxHandler")
const withholdingTax = new WithholdingRecord({})
const monthlyReturn = new MonthlyReturn({})
// @vue/component
export default {
    name: 'Add_withholding_tax',

    components: {
        LoadingMe: () => import('@/components/Loading'),
        'dropdownlist': DropDownList,
    },

    mixins: [],

    props: {},

    data() {
        return {
            showLoading: false,
            menu: false,
            monthlyReturn: monthlyReturn,
            withholdingTax: withholdingTax,
            itemLines: [],
            filter: '',
            textField: 'numberName',
            dataItemKey: 'id',
            defaultItem: defaultItem,
            suppBaseUrl: supplierHandler.search(),
            supplierList: [],
            txn_date: new Date().toISOString().substr(0, 10),

            amount: 0,
            totalVat: 0,
            natures: []
        }
    },

    computed: {
        natureWithholding() {
            return taxSetting.default.state.natureTaxPayer
        },
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
            if (this.$route.params.withholding !== undefined) {
                return this.$route.params.withholding
            } else {
                return ''
            }
        }
    },

    watch: {
        'id': 'initData'
    },

    async created() {
        await this.loadListTax()
        await this.loadNatureTaxType()
    },

    async mounted() {
        await this.initData()
        await this.loadData(0, '', this.suppBaseUrl)
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
                this.clear()
            }
            if (this.$route.query.w_id !== undefined && this.$route.params.withholding === undefined) {
                await this.onloadOneWithholding()
            } else if (this.$route.params.withholding !== undefined) {
                await axios.get(apiUrl.tax_setting.tax_nature_get).then(res => {
                    this.natures = res.data.data
                })
                this.withholdingTax = this.$route.params.withholding
                const itemLines = []
                for (let i =0; i < this.withholdingTax.itemLine.length; i++) {
                    this.withholdingTax.itemLine[i].taxName = this.typeProductTax.filter(p => p.defaultTax === this.withholdingTax.itemLine[i].taxName.name)[0]
                    itemLines.push({
                        amount: this.withholdingTax.itemLine[i].amount,
                        vat: this.withholdingTax.itemLine[i].vat,
                        baseAmount: this.withholdingTax.itemLine[i].baseAmount,
                        taxName: this.withholdingTax.itemLine[i].taxName,
                        description: this.withholdingTax.itemLine[i].description,
                        natureTaxType: this.natures.filter(p => p.name === this.withholdingTax.supplier.natureTaxType)[0]
                    })
                }
                this.withholdingTax.itemLine = itemLines
                this.amount = this.withholdingTax.totalAmount || 0
                this.totalVat = this.withholdingTax.totalVAT || 0
            } else {
                await this.clearWithholding()
            }
            if (this.withholdingTax.totalAmount !== 0 || this.withholdingTax.totalVAT !== 0) {
                this.amount = this.withholdingTax.totalAmount
                this.totalVat = this.withholdingTax.totalVAT
            } else {
                if (withholdingTax.itemLine.length === 0) {
                    await this.addRow()
                }
            }
            this.showLoading = false
            // if (this.sale.itemLine.length === 0) {
            //     await this.addRow()
            // }
        },
        onloadOneWithholding() {
            withholdingTaxHandler.getOne(this.monthlyReturn.id).then(res => {
                this.withholdingTax = res.data.data[0]
            })
        },
        clearWithholding() {
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
        disableEditor() {
            return false;
        },
        async addRow() {
            let ds = this.$refs.dataSource.kendoWidget(),
                total = ds.total();
            ds.insert(total, {
                natureTaxType: {name: ''},
                taxName: {defaultTax: ""},
                baseAmount: "",
                amount: 0,
                description: "",
            });
        },
        async loadListTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    taxSettingHandler.get(apiUrl.tax_setting.tax_list_get, "listTax", "setListTax")
                    window.console.log(taxSetting.default.state.listTax, 'list')
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
        async onChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            let natureTaxType = {}
            this.withholdingTax.supplier = value
            window.console.log(this.natureWithholding, '0987')
            if (this.withholdingTax.supplier.nature.name.toLowerCase() === 'individual-foreign') {
                this.withholdingTax.supplier.taxPayerType = 'Physical Person'
                this.withholdingTax.supplier.natureTaxType = 'Non-Resident'
            } else if (this.withholdingTax.supplier.nature.name.toLowerCase() === 'foreign entity') {
                this.withholdingTax.supplier.taxPayerType = 'Legal Person'
                this.withholdingTax.supplier.natureTaxType = 'Non-Resident'
            } else if (this.withholdingTax.supplier.nature.name.toLowerCase() === 'individual-local') {
                this.withholdingTax.supplier.taxPayerType = 'Physical Person'
                this.withholdingTax.supplier.natureTaxType = 'Resident'
            } else if (this.withholdingTax.supplier.nature.name.toLowerCase() === 'non-taxable entity') {
                this.withholdingTax.supplier.taxPayerType = 'Legal Person'
                this.withholdingTax.supplier.natureTaxType = 'Resident'
            } else if (this.withholdingTax.supplier.nature.name.toLowerCase() === 'taxable entity') {
                this.withholdingTax.supplier.taxPayerType = 'Legal Person'
                this.withholdingTax.supplier.natureTaxType = 'Resident'
            }
            this.natureWithholding.forEach(i => {
                window.console.log(i.name, this.withholdingTax.supplier.natureTaxType)
                if (i.name === this.withholdingTax.supplier.natureTaxType) {
                    window.console.log(i, 'mnv')
                    natureTaxType = i
                }
            })

            this.withholdingTax.itemLine = [{
                natureTaxType: natureTaxType,
                typeProductTax: {defaultTax: ""},
                baseAmount: "",
                amount: 0,
                description: "",
            }]
            window.console.log(this.withholdingTax.itemLine, '12')
        },
        calculateTax() {
            let ds = this.$refs.dataSource.kendoWidget()
            let dataRow = ds.data(),
                vatTax = 0, totalTax = 0, totalAmount = 0, amount = 0
            this.itemLines = []
            dataRow.forEach(item => {
                if (item.typeProductTax) {
                    let amt = (item.amount)
                    vatTax = this.autoCalculateTax(item.typeProductTax, amt)
                }
                amount = item.amount
                this.itemLines.map((i, index) => {
                    if (i.uid === item.uid) {
                        this.itemLines.splice(index, 1)
                    }
                })
                this.itemLines.push({
                    uid: item.uid,
                    amount: item.amount,
                    natureTaxType: item.natureTaxType,
                    vat: vatTax,
                    description: item.description,
                    typeProductTax: item.typeProductTax,
                    baseAmount: item.baseAmount
                })
            })
            totalTax += kendo.parseFloat(vatTax)
            totalAmount += kendo.parseFloat(amount)

            this.totalVat += totalTax
            this.amount += totalAmount

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
            if (dataRow.typeProductTax) {
                let amt = dataRow.amount
                vatTax = this.autoCalculateTax(dataRow.typeProductTax, amt)
            }
            this.totalVat = this.totalVat - vatTax
        },
        onDataSourceChanges(e) {
            if (e.field) {
                let dataRow = e.items[0]
                switch (e.field) {
                    case "typeProductTax":
                        dataRow.set("baseAmount", dataRow.typeProductTax.baseAmount)
                        if (dataRow.amount > 0) {
                            this.calculateTax()
                        }
                        break
                    case "amount":
                        if (dataRow.typeProductTax.hasOwnProperty('defaultTax')) {
                            this.calculateTax()
                        }
                        break
                }
            }
        },
        async loadNatureTaxType() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    taxSettingHandler.get(apiUrl.tax_setting.tax_nature_get, "natureTaxPayer", "setNatureTaxPayer")
                    window.console.log(taxSetting.default.state.natureTaxPayer, 'nature')
                })
            })
        },
        onClose() {
            this.withholdingTax = new WithholdingRecord({})
            this.itemLines = []
            this.totalVat = 0
            this.amount = 0
            window.history.go(-1)
            // this.$router.push({
            //     name: 'Withholding Tax Record',
            //     path: 'withholding_tax_record',
            //     query: {type: this.$route.query.type},
            //     params: {id: this.monthlyReturn.id, monthlyReturn: this.monthlyReturn}
            // })
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n2`)
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
                if (dataItem.amount !== 0 || dataItem.typeProductTax.rate !== undefined) {
                    this.amount = this.amount - dataItem.amount
                    this.calculateTaxDelete(dataItem)
                }

                dataSource.remove(dataItem);
            }
        },
        natureTaxTypeDropdownEditor(container, options) {
            kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 300,
                    dataTextField: "name",
                    dataValueField: "id",
                    optionLabel: "--- Select ---",
                    dataSource: this.natureWithholding
                })
        },
        typeProductTaxDropdownEditor(container, options) {
            window.console.log(options)
            kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 200,
                    dataTextField: "defaultTax",
                    dataValueField: "id",
                    optionLabel: "--- Select ---",
                    dataSource: {
                        data: this.typeProductTax.filter((item) => item.transactionType === "Purchase" && item.taxType.typeId === 2 && item.natureTaxPayer === options.model.natureTaxType.name),
                        group: {
                            field: "baseAmount"
                        }
                    }
                });
        },
        async onSaveClose() {
            if (this.withholdingTax.supplier.type.toLowerCase() === 'individual-foreign') {
                this.withholdingTax.supplier.taxPayerType = 'Physical Person'
                this.withholdingTax.supplier.natureTaxType = 'Non-Resident'
            } else if (this.withholdingTax.supplier.type.toLowerCase() === 'foreign entity') {
                this.withholdingTax.supplier.taxPayerType = 'Legal Person'
                this.withholdingTax.supplier.natureTaxType = 'Non-Resident'
            } else if (this.withholdingTax.supplier.type.toLowerCase() === 'individual-local') {
                this.withholdingTax.supplier.taxPayerType = 'Physical Person'
                this.withholdingTax.supplier.natureTaxType = 'Resident'
            } else if (this.withholdingTax.supplier.type.toLowerCase() === 'non-taxable entity') {
                this.withholdingTax.supplier.taxPayerType = 'Legal Person'
                this.withholdingTax.supplier.natureTaxType = 'Resident'
            } else if (this.withholdingTax.supplier.type.toLowerCase() === 'taxable entity') {
                this.withholdingTax.supplier.taxPayerType = 'Legal Person'
                this.withholdingTax.supplier.natureTaxType = 'Resident'
            }
            this.withholdingTax.supplier.supplierId = ''
            if (this.itemLines.length < 0 || this.withholdingTax.itemLine.length > 0) {
                window.console.log(this.purchase.itemLine, 'itemline 123412412')
                this.withholdingTax.itemLine = this.withholdingTax.itemLine.map(item => {
                    return {
                        uid: item.uid,
                        amount: item.amount,
                        item: item.item,
                        vat: item.vat,
                        description: item.description,
                        natureTaxType: item.natureTaxType ? item.natureTaxType.name : '',
                        taxName: {name: item.taxName.defaultTax, accountId: item.taxName.account.id},
                        baseAmount: item.baseAmount,
                    }
                })
            }
            const data = {
                id: this.withholdingTax.id ? this.withholdingTax.id : `mr-${uuid.v1()}`,
                type: 'withholding',
                date: this.withholdingTax.date,
                monthlyReturnId: this.monthlyReturn.id,
                description: '',
                reference: this.withholdingTax.reference,
                monthOf: this.monthlyReturn.monthOf,
                supplier: this.withholdingTax.supplier,
                totalVAT: this.totalVat,
                totalAmount: this.amount,
                itemLine: this.itemLines.length > 0 ? this.itemLines : this.withholdingTax.itemLine,
                isSave: this.withholdingTax.isSave || false,
                status: this.$route.query.type === 'Edit' ? 2 : 1,
                dataSource: this.$route.query.type === 'Edit' ? this.withholdingTax.dataSource : {name: "Manually", id: 2},
            }
            const result = new WithholdingRecord(data)
            // data = this.stringify(data)
            window.console.log(data, 'data')
            this.$store.dispatch('compliance/pushWithholding', result)
            // let w = JSON.parse(localStorage.getItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Withholding'))
            // window.console.log(w, 'we12')
            // if (w) {
            //     if (w.length <= 0) {
            //         if (this.monthlyReturn.abbr !== '' && this.monthlyReturn.number !== '') {
            //             localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Withholding', JSON.stringify(data))
            //         }
            //
            //     } else {
            //         const allArray = [...w, ...data]
            //         results = allArray.filter((e, i) => allArray.findIndex(o => o.totalVAT === e.totalVAT && o.totalAmount === e.totalAmount) === i)
            //         window.console.log(results, '34567')
            //         if (this.monthlyReturn.abbr !== '' && this.monthlyReturn.number !== '') {
            //             localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Withholding', JSON.stringify(results))
            //         }
            //     }
            // } else {
            //     localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Withholding', JSON.stringify(data))
            // }
            this.showLoading = false
            this.onClose()
            window.console.log(result, 'withholding')
            // new Promise((resolve) => {
            //     setTimeout(() => {
            //         resolve("resolved");
            //         withholdingTaxHandler.create(data).then(() => {
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
