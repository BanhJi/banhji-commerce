import store from "@/store"
const institute = store.state.institute.institute
//:todo sale record for compliance
export default class SaleRecord {
    constructor(data = {}) {
        this.id                     = data.id || ''
        this.type                   = data.type || 'sale'
        this.monthlyReturnId        = data.monthlyReturnId || ''
        this.date                   = data.date || new Date().toISOString().substr(0, 10)
        this.description            = data.description || ''
        this.reference              = data.reference || ''
        this.monthOf                = data.monthOf || ''
        this.customer               = data.customer || {}
        this.totalVAT               = data.totalVAT || 0
        this.totalAmountInclusive   = data.totalAmountInclusive || 0
        this.totalAmountNetVat      = data.totalAmountNetVat || 0
        this.totalSpecificTax        = data.totalSpecificTax || 0
        this.totalPubTax            = data.totalPubTax || 0
        this.totalAccomTax          = data.totalAccomTax || 0
        this.dataSource             = data.dataSource || {}
        this.status                 = data.status || 1
        this.itemLine               = data.itemLine || []
        this.dateFormat             = data.dateFormat || institute.dateFormat
        this.isSave                 = data.isSave
        this.decimalFormat          = data.decimalFormat || 'n2'
    }

    constuct(data) {
        this.constructor(data);
    }
}