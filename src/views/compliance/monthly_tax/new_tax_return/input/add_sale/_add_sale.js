/*
 * Last modified : 3/27/21, 11:12 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

// @vue/component
import SaleRecord from "@/scripts/compliance/model/SaleRecord";
import kendo from "@progress/kendo-ui";
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import LoadingMe from "@/components/Loading";
import {uuid} from 'vue-uuid'
import ItemLineSale from "@/scripts/compliance/model/itemLineSale";

const $ = require("jquery")
const SaleModel = new SaleRecord({})
const textField = 'numberName'
const keyField = 'id'
const defaultItem = {[textField]: 'Select customer...', [keyField]: null}
const emptyItem = {[textField]: 'loading ...'}
const customerHandler = require("@/scripts/customerHandler")
const taxSetting = require('@/store/taxSetting');
const taxSettingHandler = require("@/scripts/taxSettingHandler")
const apiUrl = require('@/apiUrl')
const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler")
const saleHandler = require("@/scripts/compliance/handler/saleHandler")

export default {
    name: 'Add_sale',

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
            sale: SaleModel,
            menuJDateAddSale: false,
            txn_date: new Date().toISOString().substr(0, 10),
            itemLines: [],
            filter: '',
            textField: 'numberName',
            dataItemKey: 'id',
            defaultItem: defaultItem,
            cusBaseUrl: customerHandler.search(),
            customerList: [],

            amt: [],
            totalVat: 0,
            amountSp: 0,
            amountPlt: 0,
            amountAt: 0,
            amountVat: 0,
            amountInclusiveVat: 0,
            amountNetVat: 0,
            monthlyReturn: {},
        }
    },

    computed: {
        typeProductTax() {
            return taxSetting.default.state.listTax
        },
        id() {
            if (this.$route.query.s_id !== undefined) {
                return this.$route.query.s_id
            } else {
                return ''
            }
        }
    },

    watch: {
        'id': 'initData'
    },

    created() {
    },
    async mounted() {
        await this.initData()
        await this.loadListTax()
        await this.loadData(0, '', this.cusBaseUrl)
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

            if (this.$route.query.s_id !== undefined && this.$route.params.sale === undefined) {
                await this.onloadOneSale()
            } else if (this.$route.params.sale !== undefined) {
                this.sale = this.$route.params.sale
                window.console.log(this.sale, 'list tax')
                const itemLines = []
                for (let i =0; i < this.sale.itemLine.length; i++) {
                    this.sale.itemLine[i].taxName = this.typeProductTax.filter(p => p.defaultTax === this.sale.itemLine[i].taxName.name)[0]
                    if (this.sale.itemLine[i].specificTax.name === undefined) {
                        this.sale.itemLine[i].specificTax = {defaultTax: ''}
                    } else {
                        this.sale.itemLine[i].specificTax = this.typeProductTax.filter(p => p.defaultTax === this.sale.itemLine[i].specificTax.name)[0]
                    }
                    if (this.sale.itemLine[i].pubTax.name === undefined) {
                        this.sale.itemLine[i].pubTax = {defaultTax: ''}
                    } else {
                        this.sale.itemLine[i].pubTax = this.typeProductTax.filter(p => p.defaultTax === this.sale.itemLine[i].pubTax.name)[0]
                    }
                    if (this.sale.itemLine[i].accomTax.name === undefined) {
                        this.sale.itemLine[i].accomTax = {defaultTax: ''}
                    } else {
                        this.sale.itemLine[i].accomTax = this.typeProductTax.filter(p => p.defaultTax === this.sale.itemLine[i].accomTax.name)[0]
                    }
                    itemLines.push(new ItemLineSale(this.sale.itemLine[i]))

                    this.amountVat += this.sale.itemLine[i].vat || 0
                }
                window.console.log(itemLines, 'itemlines')
                this.sale.itemLine = itemLines
                this.amountInclusiveVat = this.sale.totalAmountInclusive || 0
                this.amountNetVat = this.sale.totalAmountNetVat || 0
                this.amountSp = this.sale.totalSpecificTax || 0
                this.amountPlt = this.sale.totalPubTax || 0
                this.amountAt = this.sale.totalAccomTax || 0
                this.totalVat = this.sale.totalVAT || 0
                window.console.log(this.typeProductTax, this.sale.itemLine, 'list tax 123')
            } else {
                await this.clearSale()
            }

            if (this.sale.totalAmountInclusive !== 0) {
                this.amountSp = this.sale.totalSpecificTax
                this.amountPlt = this.sale.totalPubTax
                this.amountAt = this.sale.totalAccomTax
                this.totalVat = this.sale.totalVAT
            } else {
                if (this.sale.itemLine.length === 0) {
                    await this.addRow()
                }
            }
            this.showLoading = false
        },
        async clearSale() {
            this.sale = new SaleRecord({})
            this.itemLines = []
            this.totalVat = 0
            this.amountInclusiveVat = 0
            this.amountNetVat = 0
            this.amountPlt = 0
            this.amountSp = 0
            this.amountAt = 0
            this.amountVat = 0
        },
        async onloadOneSale() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    const id = this.$route.params.id
                    saleHandler.getOne(id).then(res => {
                        this.sale = res.data.data[0]
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
                        this.monthlyReturn = res.data.data.length > 0 ? res.data.data[0] : []
                    })
                })
            })
        },
        async loadListTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    taxSettingHandler.get(apiUrl.tax_setting.tax_list_get, "listTax", "setListTax")
                    window.console.log(this.sale.itemLine, 'sale')
                    this.itemLine = this.sale.itemLine
                }, 100)
            })
        },
        async onCustomerFilterChanged(event) {
            const filter = event.filter.value
            await this.loadData(0, filter, this.cusBaseUrl)
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
            this.customerList = json.data
        },
        onChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.sale.customer = value
            window.console.log(value, 'customer')
        },

        async onClose() {
            await this.clearSale()
            // await this.$router.replace('/new_tax_return/' + this.$route.params.id)
            window.history.go(-1)
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `${this.sale.decimalFormat}`)
        },
        disableEditor() {
            return false;
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
                    case "specificTax":
                        if (dataRow.amount > 0) {
                            this.calculateTax()
                        }
                        break
                    case "pubTax":
                        if (dataRow.amount > 0) {
                            this.calculateTax()
                        }
                        break
                    case "accomTax":
                        if (dataRow.amount > 0) {
                            this.calculateTax()
                        }
                        break
                    case "amount":
                        if (dataRow.taxName.hasOwnProperty('defaultTax')) {
                            this.calculateTax()
                        }
                        break
                    default:
                        break
                }
            }
        },
        calculateTax() {
            let ds = this.$refs.dataSource.kendoWidget()
            let dataRow = ds.data(),
                spTax = 0, pltTax = 0, atTax = 0, vatTax = 0, totalTax = 0,
                totalSp = 0, totalPlt = 0, totalAt = 0, totalInclusive = 0, totalNet = 0, amountInc = 0, amountNet = 0
            window.console.log(dataRow, 'dataRow123')
            dataRow.forEach(item => {
                window.console.log(item)
                if (item.specificTax) {
                    spTax = this.autoCalculateTax(item.specificTax, item.amount)
                }
                if (item.pubTax) {
                    pltTax = this.autoCalculateTax(item.pubTax, (item.amount))
                }
                if (item.accomTax) {
                    atTax = this.autoCalculateTax(item.accomTax, (item.amount))
                }
                if (item.taxName) {
                    let amt = kendo.parseFloat(spTax) + kendo.parseFloat(pltTax) + kendo.parseFloat(atTax) + (item.amount)
                    vatTax = this.autoCalculateTax(item.taxName, amt)
                }
                if (item.baseAmount.toLowerCase() === "inclusive") {
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
                    amountNetVat: amountNet,
                    amountSpecificTax: spTax || 0,
                    item: item.item,
                    specificTax: {name: item.specificTax ? item.specificTax.defaultTax : '', accountId: item.specificTax ? item.specificTax.account ? item.specificTax.account.id : '' : ''},
                    pubTax: {name: item.pubTax ? item.pubTax.defaultTax : '', accountId: item.pubTax ? item.pubTax.account ? item.pubTax.account.id : '' : ''},
                    accomTax: {name: item.accomTax ? item.accomTax.defaultTax : '', accountId: item.accomTax ? item.accomTax.account ? item.accomTax.account.id : '' : ''},
                    vat: vatTax,
                    amountPubTax: pltTax || 0,
                    amountAccomTax: atTax || 0,
                    description: item.description,
                    taxName: {name: item.taxName.defaultTax, accountId: item.taxName.account.id},
                    baseAmount: item.baseAmount,
                })
                totalTax += kendo.parseFloat(spTax) + kendo.parseFloat(pltTax) + kendo.parseFloat(atTax) + kendo.parseFloat(vatTax)
                totalInclusive += kendo.parseFloat(amountInc)
                totalNet += kendo.parseFloat(amountNet)
                totalSp += kendo.parseFloat(spTax)
                totalPlt += kendo.parseFloat(pltTax)
                totalAt += kendo.parseFloat(atTax)
            })
            this.totalVat = totalTax
            this.amountSp = totalSp
            this.amountPlt = totalPlt
            this.amountAt = totalAt
            this.amountInclusiveVat = totalInclusive
            this.amountNetVat = totalNet

            window.console.log(totalTax)
            window.console.log('result', this.amt)
        },
        autoCalculateTax(tax, amount) {
            window.console.log(tax, 'tax')
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
                if (dataItem.amount !== 0 || dataItem.taxName.rate !== undefined) {
                    if (dataItem.baseAmount.toLowerCase() === 'net') {
                        this.amountNetVat = this.amountNetVat - dataItem.amount
                        this.calculateTaxDelete(dataItem)
                    }else {
                        let amount = dataItem.amount / (1 + (dataItem.taxName.rate / 100))
                        this.amountInclusiveVat = this.amountInclusiveVat - amount
                        this.calculateTaxDelete(dataItem)
                    }
                }
                dataSource.remove(dataItem);
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
        specificTaxDropdownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 300,
                    dataTextField: "defaultTax",
                    dataValueField: "id",
                    optionLabel: "--- Select ---",
                    dataSource: {
                        data: this.typeProductTax.filter((item) => item.transactionType.toLowerCase() === "sale"
                            && item.taxType.typeId === 8 && item.baseAmount.toLowerCase() === options.model.baseAmount.toLowerCase())
                    }
                });
            window.console.log(options.model.baseAmount)
        },
        publicTaxDropdownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 300,
                    dataTextField: "defaultTax",
                    dataValueField: "id",
                    optionLabel: "--- Select ---",
                    dataSource: {
                        data: this.typeProductTax.filter((item) => item.transactionType.toLowerCase() === "sale"
                            && item.taxType.typeId === 9 && item.baseAmount.toLowerCase() === options.model.baseAmount.toLowerCase())
                    }
                });
        },
        accomTaxDropdownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 300,
                    dataTextField: "defaultTax",
                    dataValueField: "id",
                    optionLabel: "--- Select ---",
                    dataSource: {
                        data: this.typeProductTax.filter((item) => item.transactionType.toLowerCase() === "sale"
                            && item.taxType.typeId === 7 && item.baseAmount.toLowerCase() === options.model.baseAmount.toLowerCase())
                    }
                });
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
                        data: this.typeProductTax.filter((item) => item.transactionType.toLowerCase() === "sale" && item.taxType.typeId === 1),
                        group: {
                            field: "baseAmount"
                        }
                    }
                });
        },
        editableSP(dataItem) {
            return dataItem.baseAmount === "Net" || dataItem.baseAmount === "inclusive"
        },
        editableAT(dataItem) {
            return dataItem.baseAmount === "Net" || dataItem.baseAmount === "inclusive"
        },
        editablePL(dataItem) {
            return dataItem.baseAmount === "Net" || dataItem.baseAmount === "inclusive"
        },
        async addRow() {
            let ds = this.$refs.dataSource.kendoWidget(),
                total = ds.total();
            ds.insert(total, {
                taxName: {defaultTax: ""},
                specificTax: {defaultTax: ""},
                pubTax: {defaultTax: ""},
                accomTax: {defaultTax: ""},
                baseAmount: "",
                amount: 0,
                description: "",
            });
        },
        onCloseSale() {
        },
        async onSaveClose() {
            this.showLoading = true
            // await this.getDataSource()
            // let itemLine = []
            if (this.sale.customer.taxPayerType === '') {
                if (this.sale.customer.type.toLowerCase() === 'individual-foreign') {
                    this.sale.customer.taxPayerType = 'Physical Person'
                    this.sale.customer.natureTaxType = 'Non-Resident'
                } else if (this.sale.customer.type.toLowerCase() === 'foreign entity') {
                    this.sale.customer.taxPayerType = 'Legal Person'
                    this.sale.customer.natureTaxType = 'Non-Resident'
                } else if (this.sale.customer.type.toLowerCase() === 'individual-local') {
                    this.sale.customer.taxPayerType = 'Physical Person'
                    this.sale.customer.natureTaxType = 'Resident'
                } else if (this.sale.customer.type.toLowerCase() === 'non-taxable entity') {
                    this.sale.customer.taxPayerType = 'Legal Person'
                    this.sale.customer.natureTaxType = 'Resident'
                } else if (this.sale.customer.type.toLowerCase() === 'taxable entity') {
                    this.sale.customer.taxPayerType = 'Legal Person'
                    this.sale.customer.natureTaxType = 'Resident'
                }
                this.sale.customer.customerId = this.sale.customer.crn
            }
            window.console.log(this.itemLines, this.sale.itemLine, 'itemline')
            if (this.itemLines.length < 0 || this.sale.itemLine.length > 0) {
                window.console.log(this.sale.itemLine, 'itemline 123412412')
               this.sale.itemLine = this.sale.itemLine.map(item => {
                    return {
                        uid: item.uid,
                        amount: item.amount,
                        amountInclusive: item.amountInclusive,
                        amountNetVat: item.amountNetVat,
                        amountSpecificTax: item.amountSpecificTax || 0,
                        item: item.item,
                        specificTax: {name: item.specificTax ? item.specificTax.defaultTax : '', accountId: item.specificTax ? item.specificTax.account ? item.specificTax.account.id : '' : ''},
                        pubTax: {name: item.pubTax ? item.pubTax.defaultTax : '', accountId: item.pubTax ? item.pubTax.account ? item.pubTax.account.id : '' : ''},
                        accomTax: {name: item.accomTax ? item.accomTax.defaultTax : '', accountId: item.accomTax ? item.accomTax.account ? item.accomTax.account.id : '' : ''},
                        vat: item.vat,
                        amountPubTax: item.amountPubTax|| 0,
                        amountAccomTax: item.amountAccomTax || 0,
                        description: item.description,
                        taxName: {name: item.taxName.defaultTax, accountId: item.taxName.account.id},
                        baseAmount: item.baseAmount,
                    }
                })
            }
            const data = {
                id: this.sale.id ? this.sale.id : `mr-${uuid.v1()}`,
                type: 'sale',
                date: this.sale.date,
                monthlyReturnId: this.monthlyReturn.id,
                description: '',
                reference: this.sale.reference,
                monthOf: this.monthlyReturn.monthOf,
                customer: this.sale.customer,
                totalVAT: this.totalVat,
                totalAmountInclusive: this.amountInclusiveVat,
                totalAmountNetVat: this.amountNetVat,
                totalSpecificTax: this.amountSp,
                totalPubTax: this.amountPlt,
                totalAccomTax: this.amountAt,
                itemLine: this.itemLines.length > 0 ? this.itemLines : this.sale.itemLine,
                isSave: this.sale.isSave || false,
                status: this.$route.query.type === 'Edit' ? 2 : 1,
                dataSource: this.$route.query.type === 'Edit' ? this.sale.dataSource : {name: "Manually", id: 2},
            }
            const result = new SaleRecord(data)
            window.console.log(result, 'data123')
            this.$store.dispatch('compliance/pushSale', result)
            // let s = JSON.parse(localStorage.getItem(this.monthlyReturn.number + '&Sale'))
            // if (s) {
            //     if (s.length <= 0) {
            //         if (this.monthlyReturn.abbr !== '' && this.monthlyReturn.number !== '') {
            //             localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Sale', JSON.stringify(data))
            //         }
            //     } else {
            //         // for (let i = 0; i < data.length; i++) {
            //         //     const exist = s.filter(p => p.id === data[i].id)
            //         // }
            //         const allArray = [...s, ...data]
            //         results = allArray.filter((e, i) => allArray.findIndex(o => o.totalAmountInclusive === e.totalAmountInclusive && o.totalVAT === e.totalVAT && o.totalAmountNetVat === e.totalAmountNetVat && o.totalSpecificTax === e.totalSpecificTax && o.totalPubTax === e.totalPubTax && o.totalAccomTax === e.totalAccomTax) === i)
            //         window.console.log(results, '34567')
            //         if (this.monthlyReturn.abbr !== '' && this.monthlyReturn.number !== '') {
            //             localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Sale', JSON.stringify(results))
            //         }
            //     }
            // } else {
            //     localStorage.setItem(this.monthlyReturn.abbr + this.monthlyReturn.number + '&Sale', JSON.stringify(data))
            // }
            this.showLoading = false
            await this.onClose()
            // await saleHandler.create(data).then(res => {
            //     this.showLoading = false
            //     this.onClose()
            //     window.console.log(res, 'create sale')
            // }).catch(e => {
            //     window.console.error(e)
            // })
        },
    }
}
