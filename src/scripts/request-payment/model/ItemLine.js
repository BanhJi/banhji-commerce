/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default class ItemLine {
    constructor(data = {}) {
        this.id                 = data.id || ''
        this.lineId             = data.lineId || ''
        this.tick               = data.tick || false
        this.billNumber         = data.billNumber || ''
        this.supplier           = data.supplier || {}
        this.paymentCode        = data.paymentCode || ''
        this.apAcc              = data.apAcc || {}
        this.referenceNo        = data.referenceNo || ''
        this.dueDate            = data.dueDate || new Date().toISOString().substr(0, 10)
        this.transactionDate    = data.transactionDate || new Date().toISOString().substr(0, 10)
        this.amount             = data.amount || 0
        this.paidAmount         = data.paidAmount || 0
        this.paidAmountTobase   = data.paidAmountTobase || 0
        this.amountTobePaid     = data.amountTobePaid || 0
        this.paymentOption      = data.paymentOption || {}
        this.bankReferenceNo    = data.bankReferenceNo || ''
        this.paymentTerm        = data.paymentTerm || {}
        this.discount           = data.discount || 0
        this.exchangeDiscount   = data.exchangeDiscount || 0
        this.exchangePenaltyTxn = data.exchangePenaltyTxn || 0
        this.exchangeDiscountTxn= data.exchangeDiscountTxn || 0
        this.paidAmountTxn      = data.paidAmountTxn || 0
        this.overDue            = data.overDue || 0
        this.deleted            = data.deleted || 0
        this.rate               = data.rate || 1
        this.rateTobase         = data.rateTobase || 1
        this.txnRate            = data.txnRate || 1
        this.currency           = data.currency || {}
        this.currencyCode       = data.currencyCode || {}
        this.status             = data.status || 0
        this.type               = data.type || ''
        this.transactionType    = data.transactionType || {}
        this.dateFormat         = institute.dateFormat
        this.decimalFormat      = data.decimalFormat
        this.optionType         = data.optionType || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}