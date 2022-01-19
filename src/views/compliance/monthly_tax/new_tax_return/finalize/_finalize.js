// @vue/component
import JSZip from 'jszip'
import kendo from '@progress/kendo-ui'

const excel = require("@/components/Export2Excel")
const purchaseHandler = require("@/scripts/compliance/handler/purchaseHandler")
const withholdingHandler = require("@/scripts/compliance/handler/withholdingTaxHandler")
const salaryHandler = require("@/scripts/compliance/handler/salaryHandler")
export default {
    name: 'Finalize',

    components: {},

    mixins: [],

    props: ['sale', 'purchase', 'salary', 'monthlyReturn', 'withholding'],

    data() {
        return {
            downloadLoading: false,
            dateSale: '',
            datePurchase: '',
            dateWht: '',
            dateSalary: '',
            timeSinceSale: '',
            timeSincePurchase: '',
            timeSinceWht: '',
            timeSinceSalary: '',
            timeSale: null,
            timePurchase: null,
            timeWht: null,
            timeSalary: null,
            amountDlSale: 0,
            amountDlPurchase: 0,
            amountDlWht: 0,
            amountDlSalary: 0,
            purchaseData: [],
            withholdingData: [],
            salaryData: [],
        }
    },

    computed: {
        dateSales() {
            if (this.dateSale !== '') {
                window.console.log(this.dateSale, 'dateSale')
                clearInterval(this.timeSale)
                this.timeSale = setInterval(() => {
                    this.timeSinceSale = `(${this.timeSince(new Date(this.dateSale))})`
                }, 60001)
                return this.dateSale
            } else if (this.monthlyReturn.dateSale !== '') {
                clearInterval(this.timeSale)
                this.timeSale = setInterval(() => {
                    this.timeSinceSale = `(${this.timeSince(new Date(this.monthlyReturn.dateSale))})`
                }, 60001)
                return this.monthlyReturn.dateSale
            } else {
                return ''
            }
        },
        datePurchases() {
            if (this.datePurchase !== '') {
                clearInterval(this.timePurchase)
                this.timePurchase = setInterval(() => {
                    this.timeSincePurchase = `(${this.timeSince(new Date(this.datePurchase))})`
                }, 60001)
                return this.datePurchase
            } else if (this.monthlyReturn.datePurchase !== '') {
                clearInterval(this.timePurchase)
                this.timePurchase = setInterval(() => {
                    this.timeSincePurchase = `(${this.timeSince(new Date(this.monthlyReturn.datePurchase))})`
                }, 60001)
                return this.monthlyReturn.datePurchase
            } else {
                return ''
            }
        },
        dateWhts() {
            if (this.dateWht !== '') {
                clearInterval(this.timeWht)
                this.timeWht = setInterval(() => {
                    this.timeSinceWht = `(${this.timeSince(new Date(this.dateWht))})`
                }, 60001)
                return this.dateWht
            } else if (this.monthlyReturn.dateWht) {
                clearInterval(this.timeWht)
                this.timeWht = setInterval(() => {
                    this.timeSinceWht = `(${this.timeSince(new Date(this.monthlyReturn.dateWht))})`
                }, 60001)
                return this.monthlyReturn.dateWht
            } else {
                return ''
            }
        },
        dateSalaries() {
            if (this.dateSalary !== '') {
                clearInterval(this.timeWht)
                this.timeSalary = setInterval(() => {
                    this.timeSinceSalary = `(${this.timeSince(new Date(this.dateSalary))})`
                }, 60001)
                return this.dateSalary
            } else if (this.monthlyReturn.dateSalary) {
                clearInterval(this.timeWht)
                this.timeWht = setInterval(() => {
                    this.timeSinceSalary = `(${this.timeSince(new Date(this.monthlyReturn.dateSalary))})`
                }, 60001)
                return this.monthlyReturn.dateSalary
            } else {
                return ''
            }
        },
        timeSinceSales() {
            if (this.timeSinceSale !== '') {
                return this.timeSinceSale
            } else if (this.dateSale !== '') {
                return `(${this.timeSince(new Date(this.dateSale))})`
            } else if (this.monthlyReturn.dateSale) {
                return `(${this.timeSince(new Date(this.monthlyReturn.dateSale))})`
            } else {
                return ''
            }
        },
        timeSincePurchases() {
            if (this.timeSincePurchase !== '') {
                return this.timeSincePurchase
            } else if (this.datePurchase !== '') {
                return `(${this.timeSince(new Date(this.datePurchase))})`
            } else if (this.monthlyReturn.datePurchase) {
                return `(${this.timeSince(new Date(this.monthlyReturn.datePurchase))})`
            } else {
                return ''
            }
        },
        timeSinceWhts() {
            if (this.timeSinceWht !== '') {
                return this.timeSinceWht
            } else if (this.dateWht !== '') {
                return `(${this.timeSince(new Date(this.dateWht))})`
            } else if (this.monthlyReturn.dateWht) {
                return `(${this.timeSince(new Date(this.monthlyReturn.dateWht))})`
            } else {
                return ''
            }
        },
        timeSinceSalaries() {
            if (this.timeSinceSalary !== '') {
                return this.timeSinceSalary
            } else if (this.dateSalary !== '') {
                return `(${this.timeSince(new Date(this.dateSalary))})`
            } else if (this.monthlyReturn.dateSalary) {
                return `(${this.timeSince(new Date(this.monthlyReturn.dateSalary))})`
            } else {
                return ''
            }
        },
        monthly() {
            if (this.monthlyReturn !== undefined) {
                this.dateSale = this.monthlyReturn.dateSale
                this.datePurchase = this.monthlyReturn.datePurchase
                this.dateWht = this.monthlyReturn.dateWht
                return this.monthlyReturn
            } else {
                return {}
            }
        },
        sales() {
            if (this.sale !== undefined) {
                return this.sale.filter(e => e.isSave !== false && e.isSave !== undefined)
            } else {
                return []
            }
        },
        numSale() {
            if (this.sale !== undefined) {
                const r1 = this.sale.filter(e => e.isSave === false || e.isSave === undefined)
                return r1.length
            } else {
                return 0
            }
        },
        purchases() {
            if (this.purchase !== undefined && this.purchase.length > 0) {
                return this.purchase.filter(e => e.isSave !== false && e.isSave !== undefined)
            } else if (this.purchaseData.length > 0) {
                return this.purchaseData.filter(e => e.isSave !== false && e.isSave !== undefined)
            } else {
                return []
            }
        },
        numPurchase() {
            if (this.purchase !== undefined && this.purchase.length > 0) {
                const r1 = this.purchase.filter(e => e.isSave === false || e.isSave === undefined)
                return r1.length
            } else if (this.purchaseData.length > 0) {
                const r1 = this.purchaseData.filter(e => e.isSave === false || e.isSave === undefined)
                return r1.length
            } else {
                return 0
            }
        },
        wht() {
            if (this.withholding !== undefined && this.withholding.length > 0) {
                return this.withholding.filter(e => e.isSave !== false && e.isSave !== undefined)
            } else if (this.withholdingData.length > 0) {
                return this.withholdingData.filter(e => e.isSave !== false && e.isSave !== undefined)
            } else {
                return []
            }
        },
        numWht() {
            if (this.withholding !== undefined && this.withholding.length > 0) {
                const r1 = this.withholding.filter(e => e.isSave === false || e.isSave === undefined)
                return r1.length
            } else if (this.withholdingData.length > 0) {
                const r1 = this.withholdingData.filter(e => e.isSave === false || e.isSave === undefined)
                return r1.length
            } else {
                return 0
            }
        },
        salaries() {
            if (this.salary !== undefined && this.salary.length > 0) {
                return this.salary.filter(e => e.isSave !== false && e.isSave !== undefined)
            } else if (this.salaryData.length > 0) {
                return this.salaryData.filter(e => e.isSave !== false && e.isSave !== undefined)
            } else {
                return []
            }
        },
        numSalaries() {
            if (this.salary !== undefined && this.salary.length > 0) {
                const r1 = this.salary.filter(e => e.isSave === false || e.isSave === undefined)
                return r1.length
            } else if (this.salaryData.length > 0) {
                const r1 = this.salaryData.filter(e => e.isSave === false || e.isSave === undefined)
                return r1.length
            } else {
                return 0
            }
        },
        amountDlSales() {
            if (this.monthlyReturn.amountDlSale > 0 || this.monthlyReturn.amountDlSale !== '') {
                return this.monthlyReturn.amountDlSale
            } else if (this.amountDlSale > 0) {
                return this.amountDlSale
            } else {
                return 0
            }
        },
        amountDlPurchases() {
            if (this.monthlyReturn.amountDlPurchase > 0 || this.monthlyReturn.amountDlPurchase !== '') {
                return this.monthlyReturn.amountDlPurchase
            } else if (this.amountDlPurchase > 0) {
                return this.amountDlPurchase
            } else {
                return 0
            }
        },
        amountDlWhts() {
            if (this.monthlyReturn.amountDlWht > 0 || this.monthlyReturn.amountDlWht !== '') {
                return this.monthlyReturn.amountDlWht
            } else if (this.amountDlWht > 0) {
                return this.amountDlWht
            } else {
                return 0
            }
        },
        amountDlSalaries() {
            if (this.monthlyReturn.amountDlSalary > 0 || this.monthlyReturn.amountDlSalary !== '') {
                return this.monthlyReturn.amountDlSalary
            } else if (this.amountDlSalary > 0) {
                return this.amountDlSalary
            } else {
                return 0
            }
        },
    },

    created() {
        window.JSZip = JSZip
    },
    beforeDestroy() {
        clearInterval(this.timeSale)
        clearInterval(this.timePurchase)
        clearInterval(this.timeWht)
        clearInterval(this.timeSalary)
    },
    methods: {
        handleDownloadSalary() {
        },
        handleDownloadWht() {
            const multiHeader = [['No', 'Date', 'Reference', 'Nature', 'Supplier', '', '', '', 'Type of product/service', 'Amount']]
            const header = ['', '', '', '', 'Type', 'TIN', 'Name in Khmer', 'Name in English', '', '']
            const filterVal = ['no', 'date', 'reference', 'nature', 'gtdId', 'supplierId', 'nameKm', 'nameEn', 'code', 'totalVAT']
            const list = this.wht
            const data = this.formatJsonWht(filterVal, list)
            const merges = ['A1:A2', 'B1:B2', 'C1:C2', 'D1:D2', 'E1:H1', 'I1:I2', 'J1:J2']
            const nameSheet = "WITHHOLDING"
            const filename = "Withholding(BanhJi Correct)"
            const locale = this.$i18n.locale
            if (locale === 'en') {
                excel.export_json_to_excel({
                    multiHeader,
                    header,
                    locale,
                    merges,
                    data,
                    nameSheet,
                    filename
                })
            } else {
                excel.export_json_to_excel({
                    multiHeader,
                    header,
                    locale,
                    merges,
                    data,
                    nameSheet,
                    filename
                })
            }
            this.dateWht = new Date().toJSON()
            this.amountDlWht = this.amountDlWhts + 1
            this.timeSinceWht = `(${this.timeSince(this.dateWht)})`
            this.onUpdateDateWht()
        },
        formatJsonWht(filterVal, jsonData) {
            let n = 0
            return jsonData.map(v => filterVal.map(j => {
                let supp = v.supplier,
                    typeProduct = v.typeProduct
                let suppId = "",
                    suppType = "",
                    suppNameKm = "",
                    suppNameEn = "",
                    code = "",
                    natureType = "",
                    nature = ""

                if (supp.hasOwnProperty('taxId')) {
                    suppId = "supplierId"
                }
                if (supp.hasOwnProperty('nature')) {
                    nature = supp.nature
                    natureType = "nature"
                    if (nature.hasOwnProperty('name')) {
                        suppType = "gtdId"
                    }
                }
                if (supp.hasOwnProperty('name')) {
                    suppNameKm = "nameKm"
                    suppNameEn = "nameEn"
                }
                // if (cus.hasOwnProperty('nameEn')) {
                //     cusNameEn = "nameEn"
                // }
                if (typeProduct.hasOwnProperty('code')) {
                    code = "code"
                }

                if (suppId === "supplierId" && suppId === j) {
                    return supp.taxId
                }
                if (natureType === "nature" && natureType === j) {
                    if (nature.name.toLowerCase() === 'individual-foreign' || nature.name.toLowerCase() === 'foreign entity') {
                        return 2
                    } else {
                        return 1
                    }
                }
                if (suppType === "gtdId" && suppType === j) {
                    if (nature.name.toLowerCase() === 'individual-local' || nature.name.toLowerCase() === 'taxable entity') {
                        return 1
                    } else if (nature.name.toLowerCase() === 'non-taxable entity') {
                        return 2
                    } else if (nature.name.toLowerCase() === 'foreign entity' || nature.name.toLowerCase() === 'individual-foreign') {
                        return 3
                    }
                }
                if (suppNameKm === "nameKm" && suppNameKm === j) {
                    return supp.name
                }
                if (suppNameEn === "nameEn" && suppNameEn === j) {
                    return supp.name
                }
                if (code === "code" && code === j) {
                    return typeProduct.code
                }
                if (j === 'no') {
                    n++
                    return n
                } else {
                    return v[j]
                }

            }))
        },
        handleDownloadPurchase() {
            const multiHeaderKh = [['ល.រ*', 'កាលបរិច្ឆេទ*', 'លេខវិក្កយបត្រ*', 'អ្នកផ្គត់ផ្គង', '', '', '', 'ប្រភេទផ្គត់ផ្គង់ទំនិញ ឬសេវាកម្ម*', 'តម្លៃសរុបជាប់អតប*', 'តម្លៃសរុបមិនជាប់អតប']]
            const multiHeader = [['No', 'Date', 'Reference', 'Supplier', '', '', '', 'Type of product/service', 'Amount(VAT inclusive)', 'Amount(net of VAT)']]
            const headerKh = ['', '', '', 'ប្រភេទ*', 'លេខសម្គាល់*', 'ឈ្មោះ(ខ្មែរ)', 'ឈ្មោះ(ឡាតាំង)', '', '', '']
            const header = ['', '', '', 'Type', 'TIN', 'Name in Khmer', 'Name in English', '', '', '']
            const filterVal = ['no', 'date', 'reference', 'gtdId', 'supplierId', 'nameKm', 'nameEn', 'code', 'totalAmountInclusive', 'totalAmountNetVat']
            const list = this.purchases
            const data = this.formatJsonPurchase(filterVal, list)
            const merges = ['A1:A2', 'B1:B2', 'C1:C2', 'D1:G1', 'H1:H2', 'I1:I2', 'J1:J2']
            const nameSheet = "Purchase"
            const filename = "Purchase(BanhJi Correct)"
            const locale = this.$i18n.locale
            if (locale === 'en') {
                excel.export_json_to_excel({
                    multiHeader,
                    header,
                    locale,
                    merges,
                    data,
                    nameSheet,
                    filename
                })
            } else {
                excel.export_json_to_excel({
                    multiHeaderKh,
                    headerKh,
                    locale,
                    merges,
                    data,
                    nameSheet,
                    filename
                })
            }
            this.datePurchase = new Date().toJSON()
            this.amountDlPurchase = this.amountDlPurchases + 1
            this.timeSincePurchase = `(${this.timeSince(this.datePurchase)})`
            window.console.log(this.datePurchase, this.timeSincePurchase, '134567', this.dateSale)
            // this.onUpdateDatePurchase()
        },
        formatJsonPurchase(filterVal, jsonData) {
            let n = 0
            return jsonData.map(v => filterVal.map(j => {
                let supp = v.supplier,
                    typeProduct = v.typeProduct
                let suppId = "",
                    suppType = "",
                    suppNameKm = "",
                    suppNameEn = "",
                    code = ""

                if (supp.hasOwnProperty('taxId')) {
                    suppId = "supplierId"
                }
                if (supp.hasOwnProperty('nature')) {
                    let s = supp.nature
                    if (s.hasOwnProperty('name')) {
                        suppType = "gtdId"
                    }
                }
                if (supp.hasOwnProperty('name')) {
                    suppNameKm = "nameKm"
                    suppNameEn = "nameEn"
                }
                // if (cus.hasOwnProperty('nameEn')) {
                //     cusNameEn = "nameEn"
                // }
                if (typeProduct.hasOwnProperty('code')) {
                    code = "code"
                }

                if (suppId === "supplierId" && suppId === j) {
                    return supp.taxId
                }
                if (suppType === "gtdId" && suppType === j) {
                    if (supp.nature.name.toLowerCase() === 'individual-local' || supp.nature.name.toLowerCase() === 'taxable entity') {
                        return 1
                    } else if (supp.nature.name.toLowerCase() === 'non-taxable entity') {
                        return 2
                    } else if (supp.nature.name.toLowerCase() === 'foreign entity' || supp.nature.name.toLowerCase() === 'individual-foreign') {
                        return 3
                    }
                }
                if (suppNameKm === "nameKm" && suppNameKm === j) {
                    return supp.name
                }
                if (suppNameEn === "nameEn" && suppNameEn === j) {
                    return supp.name
                }
                if (code === "code" && code === j) {
                    return typeProduct.code
                }
                if (j === 'no') {
                    n++
                    return n
                } else {
                    return v[j]
                }

            }))
        },
        handleDownloadSale() {
            const multiHeaderKh = [['ល.រ*', 'កាលបរិច្ឆេទ*', 'លេខវិក្កយបត្រ*', 'អ្នកទិញ', '', '', '', 'ប្រភេទផ្គត់ផ្គង់ទំនិញ ឬសេវាកម្ម*', 'តម្លៃសរុបជាប់អតប*', 'តម្លៃសរុបមិនជាប់អតប', 'អាករពិសេសលើទំនិញនិងសេវាមួយចំនួន', 'អាករបំភ្លឺសាធារណៈ', 'អាករលើការស្នាក់នៅ']]
            const multiHeader = [['No', 'Date', 'Reference', 'Customer', '', '', '', 'Type of product/service', 'Amount(VAT inclusive)', 'Amount(net of VAT)', 'Specific Tax', 'Public Lighting Tax', 'Accom. Tax']]
            const headerKh = ['', '', '', 'ប្រភេទ*', 'លេខសម្គាល់*', 'ឈ្មោះ(ខ្មែរ)', 'ឈ្មោះ(ឡាតាំង)', '', '', '', '', '', '']
            const header = ['', '', '', 'Type', 'TIN', 'Name in Khmer', 'Name in English', '', '', '', '', '', '']
            const filterVal = ['no', 'date', 'reference', 'gtdId', 'customerId', 'nameKm', 'nameEn', 'code', 'totalAmountInclusive', 'totalAmountNetVat', 'totalSpecificTax', 'totalPubTax', 'totalAccomTax']
            const list = this.sales
            const data = this.formatJsonSale(filterVal, list)
            const merges = ['A1:A2', 'B1:B2', 'C1:C2', 'D1:G1', 'H1:H2', 'I1:I2', 'J1:J2', 'K1:K2', 'L1:L2', 'M1:M2']
            const nameSheet = "Sale"
            const filename = "Sale(BanhJi Correct)"
            const locale = this.$i18n.locale
            if (locale === 'en') {
                excel.export_json_to_excel({
                    multiHeader,
                    header,
                    locale,
                    merges,
                    data,
                    nameSheet,
                    filename
                })
            } else {
                excel.export_json_to_excel({
                    multiHeaderKh,
                    headerKh,
                    locale,
                    merges,
                    data,
                    nameSheet,
                    filename
                })
            }

            this.dateSale = new Date().toJSON()
            this.amountDlSale = this.amountDlSales + 1
            this.timeSinceSale = `(${this.timeSince(this.dateSale)})`
            this.onUpdateDateSale()
            window.console.log(this.dateSale, 'handle date sale')
        },
        formatJsonSale(filterVal, jsonData) {
            let n = 0
            return jsonData.map(v => filterVal.map(j => {
                let cus = v.customer,
                    typeProduct = v.typeProduct
                let cusId = "",
                    cusType = "",
                    cusNameKm = "",
                    cusNameEn = "",
                    code = ""

                if (cus.hasOwnProperty('taxId')) {
                    cusId = "customerId"
                }
                if (cus.hasOwnProperty('nature')) {
                    let c = cus.nature
                    if (c.hasOwnProperty('name')) {
                        cusType = "gtdId"
                    }
                }
                if (cus.hasOwnProperty('name')) {
                    cusNameKm = "nameKm"
                    cusNameEn = "nameEn"
                }
                // if (cus.hasOwnProperty('nameEn')) {
                //     cusNameEn = "nameEn"
                // }
                if (typeProduct.hasOwnProperty('code')) {
                    code = "code"
                }

                if (cusId === "customerId" && cusId === j) {
                    return cus.taxId
                }
                if (cusType === "gtdId" && cusType === j) {
                    if (cus.nature.name.toLowerCase() === 'individual-local' || cus.nature.name.toLowerCase() === 'taxable entity') {
                        return 1
                    } else if (cus.nature.name.toLowerCase() === 'non-taxable entity') {
                        return 2
                    } else if (cus.nature.name.toLowerCase() === 'foreign entity' || cus.nature.name.toLowerCase() === 'individual-foreign') {
                        return 3
                    }
                }
                if (cusNameKm === "nameKm" && cusNameKm === j) {
                    return cus.name
                }
                if (cusNameEn === "nameEn" && cusNameEn === j) {
                    return cus.name
                }
                if (code === "code" && code === j) {
                    return typeProduct.code
                }
                if (j === 'no') {
                    n++
                    return n
                } else {
                    return v[j]
                }

            }))
        },
        onUpdateDateSale() {
            this.$emit('getDateSale', {date: this.dateSale, amount: this.amountDlSales})
        },
        onUpdateDatePurchase() {
            this.$emit('getDatePurchase', {date: this.datePurchase, amount: this.amountDlPurchases})
        },
        onUpdateDateWht() {
            this.$emit('getDateWht', {date: this.dateWht, amount: this.amountDlWhts})
        },
        onUpdateDateSalary() {
            this.$emit('getDateSalary', {date: this.dateSalary, amount: this.amountDlSalaries})
        },
        timeSince(date) {
            let seconds = Math.floor((new Date() - date) / 1000)
            if (isNaN(seconds)) {
                return 0 + ' second'
            }
            let interval = seconds / 31536000
            window.console.log(seconds, 'second')
            if (interval > 1) {
                return Math.floor(interval) + ' years ago'
            }
            interval = seconds / 2592000
            if (interval > 1) {
                return Math.floor(interval) + ' months ago'
            }
            interval = seconds / 86400
            if (interval > 1) {
                return Math.floor(interval) + ' days ago'
            }
            interval = seconds / 3600
            if (interval > 1) {
                return Math.floor(interval) + ' hours ago'
            }
            interval = seconds / 60
            if (interval > 1) {
                return Math.floor(interval) + ' minutes ago'
            }
            return Math.floor(seconds) + ' seconds'
        },
        formatDate(date) {
            if (date !== '') {
                return kendo.toString(new Date(date), 'dd-MM-yyyy, HH:mm')
            } else {
                return ''
            }

        },
        async onloadPurchase() {
            if (this.purchases.length === 0) {
                this.showLoading = true
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        purchaseHandler.getByMrId(this.$route.params.id).then(res => {
                            this.purchaseData = res.data.data
                            let data = JSON.parse(localStorage.getItem(this.monthly.abbr + this.monthly.number + '&Purchase'))
                            let allArray
                            if (data !== null) {
                                allArray = [...this.purchaseData, ...data]
                            } else {
                                allArray = this.purchaseData
                            }
                            window.console.log(allArray, 'allarray')
                            this.purchaseData = allArray.filter((e, i) => allArray.findIndex(o => o.totalVAT === e.totalVAT && o.totalAmountInclusive === e.totalAmountInclusive && o.totalAmountNetVat === e.totalAmountNetVat) === i)
                            this.onUpdatePurchase()
                            this.showLoading = false
                            window.console.log(this.purchaseData, 'purchase data')
                        })
                    }, 200)
                })
            }
        },
        onUpdatePurchase() {
            this.$emit('getPurchase', this.purchases)
        },
        async onloadWithholding() {
            if (this.wht.length === 0) {
                this.showLoading = true
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        withholdingHandler.getByMrId(this.$route.params.id).then(res => {
                            this.withholdingData.push(...res.data.data)
                            let data = JSON.parse(localStorage.getItem(this.monthly.abbr + this.monthly.number + '&Withholding'))
                            let allArray
                            if (data !== null) {
                                allArray = [...this.withholdingData, data]
                            } else {
                                allArray = this.withholdingData
                            }
                            window.console.log(allArray, 'allarray finalize 123')
                            this.withholdingData = allArray.filter((e, i) => allArray.findIndex(o => o.totalVAT === e.totalVAT && o.totalAmount === e.totalAmount) === i)
                            this.onUpdateWht()
                            this.showLoading = false
                        })
                    }, 200)
                })
            }
        },
        onUpdateWht() {
            this.$emit('getWht', this.wht)
        },
        async onloadSalary() {
            if (this.salaries.length === 0) {
                this.showLoading = true
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        salaryHandler.getByMrId(this.$route.params.id).then(res => {
                            this.salaryData.push(...res.data.data)
                            let data = JSON.parse(localStorage.getItem(this.monthly.abbr + this.monthly.number + '&Salary'))
                            let allArray
                            if (data !== null) {
                                allArray = [...this.salaryData, data]
                            } else {
                                allArray = this.salaryData
                            }
                            window.console.log(allArray, 'allarray finalize 123')
                            this.salaryData = allArray.filter((e, i) => allArray.findIndex(o => o.taxSalary === e.taxSalary && o.segmentId === e.segmentId && o.amountToPaid === e.amountToPaid && o.numMinor === e.numMinor && o.spouse === e.spouse) === i)
                            this.onUpdateSalary()
                            this.showLoading = false
                        })
                    }, 200)
                })
            }
        },
        onUpdateSalary() {
            this.$emit('getWht', this.salaries)
        },
    },
    async mounted() {
        await this.onloadPurchase()
        await this.onloadWithholding()
        await this.onloadSalary()
    },
}
