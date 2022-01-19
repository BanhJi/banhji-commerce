/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default class RequestPayment {
    constructor(data = {}) {
            this.id                         = data.id || ''
            this.number                     = data.number || ''
            this.abbr                       = data.abbr || ''
            this.transactionDate            = data.transactionDate || new Date().toJSON()
            this.transactionDateTZ          = data.transactionDateTZ || new Date().toJSON()
            this.expectedPaymentDate        = data.expectedPaymentDate || new Date().toJSON()
            this.supplier                   = data.supplier || {}
            this.transactionType            = data.transactionType || {}
            this.paymentOption              = data.paymentOption || {}
            this.currency                   = data.currency || {}
            this.requestNumber              = data.requestNumber || ''
            this.vendorBalance              = data.vendorBalance || 0
            this.vendorRemainingBalance     = data.vendorRemainingBalance || 0
            this.fundBalance                = data.fundBalance || 0
            this.fundRemainBalance          = data.fundRemainBalance || 0
            this.exchangeAmount             = data.exchangeAmount || 0
            this.exchangeRate               = data.exchangeRate || 0
            this.exchangeDiscount           = data.exchangeDiscount || 0
            this.exchangePenaltyTxn         = data.exchangePenaltyTxn || 0
            this.exchangeDiscountTxn        = data.exchangeDiscountTxn || 0
            this.paidAmountTxn              = data.paidAmountTxn || 0
            this.itemLines                  = data.itemLines || []
            this.transactionNote            = data.transactionNote || ''
            this.referenceNo                = data.referenceNo || ''
            this.journalNote                = data.journalNote || ''
            this.total                      = data.total || 0
            this.discount                   = data.discount || 0
            this.saveOption                 = data.saveOption || 1 // 0: Draft , 1: Save
            this.status                     = data.status || 1 // 0: Pending , 1: Active , 2: Waiting Approval , 3: rejected
            this.formTemplate               = data.formTemplate || {}
            this.type                       = data.type || ''
            this.typeAs                     = data.typeAs || ''
            this.dateFormat                 = institute.dateFormat
            this.createdAt                  = data.createdAt || new Date()
            this.deleted                    = data.deleted || 0
            this.loggedUser                 = data.loggedUser || {}
        }

    constuct(data) {
        this.constructor(data);
    }
}