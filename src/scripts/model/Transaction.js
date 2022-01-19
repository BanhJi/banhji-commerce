import store from "@/store"
const institute = store.state.institute.institute

export default class Transaction {
    constructor(data = {}) {
        this.id                         = data.id || ''
        this.type                       = data.type || ''
        this.transactionType            = data.transactionType || {}
        this.number                     = data.number || ''
        this.customerName               = data.customerName || ''
        this.referenceNo                = data.referenceNo || ''
        this.abbr                       = data.abbr || ''
        this.validityDate               = data.validityDate || new Date().toISOString().substr(0, 10)
        this.exspectedDate              = data.exspectedDate || new Date().toISOString().substr(0, 10)
        this.monthOf                    = data.monthOf || new Date().toISOString().substr(0, 7)
        this.paymentTerm                = data.paymentTerm || {}
        this.discountPromotion          = data.discountPromotion || {}
        this.priceLevel                 = data.priceLevel || {}
        this.segment                    = data.segment || {}
        this.location                   = data.location || {}
        this.project                    = data.project || {}
        this.saleChannel                = data.saleChannel || {}
        this.billingAddress             = data.billingAddress || {}
        this.deliveryAddress            = data.deliveryAddress || {}
        this.deliveryDateTime           = data.deliveryDateTime || new Date()
        this.transactionNote            = data.transactionNote || ''
        this.journalNote                = data.journalNote || ''
        this.subTotal                   = data.subTotal || 0
        this.exchangeSubTotal           = data.exchangeSubTotal || 0
        this.total                      = parseFloat(data.total) || parseFloat(0)
        this.exchangetotal              = data.exchangetotal || 0
        this.amount                     = data.amount || 0
        this.amountDue                  = data.amountDue || 0
        this.exchangeAmount             = data.exchangeAmount || 0
        this.discountTotal              = data.discountTotal || 0
        this.specificDiscountTotal      = data.specificDiscountTotal || 0
        this.deliveryFee                = data.deliveryFee || 0
        this.totalTaxAmount             = data.totalTaxAmount || 0
        this.currentBalance             = data.currentBalance || 0
        this.balance                    = data.balance || 0
        this.creditLimit                = data.creditLimit || 0
        this.saveOption                 = data.saveOption || ''
        this.approvedBy                 = data.approvedBy || {}
        this.rejectedBy                 = data.rejectedBy || {}
        this.specificDiscountItem       = data.specificDiscountItem || {}
        this.otherCharge                = data.otherCharge || []
        this.otherChargeAmount          = data.otherChargeAmount || 0
        this.itemLines                  = data.itemLines || []
        this.publicLink                 = data.publicLink || ''
        this.progressingStatus          = data.progressingStatus || ''
        this.customer                   = data.customer || {}
        this.transactionDate            = data.transactionDate || new Date().toISOString().substr(0, 10)
        this.transactionDateTZ          = data.transactionDateTZ || ''
        this.status                     = data.status || 1 //1 open, 2 used,
        this.taxListTotal               = data.taxListTotal || []
        this.saleOrderType              = data.saleOrderType || 0 //0 not sale order, 1 standard order, 2 open order, 3 contract, 4 consignment order, 5 order required purchase
        this.lead                       = data.lead || {}
        this.txnList                    = data.txnList || []
        this.employee                   = data.employee || {}
        this.txnRate                    = data.txnRate || 1
        this.exchangeRate               = data.exchangeRate || {}
        this.formTemplate               = data.formTemplate || 0
        this.supplier                   = data.supplier || {}
        this.exchangeAmount             = data.exchangeAmount || 0
        this.form                       = data.form || 1
        this.routeView                  = data.routeView || ''
        this.exspectedDate              = data.exspectedDate || new Date().toISOString().substr(0, 10)
        this.dateFormat                 = data.dateFormat || institute.dateFormat
        this.usedDateAt                 = data.usedDateAt || new Date().toISOString().substr(0, 10)
        this.deletedAt                  = data.deletedAt || new Date().toISOString().substr(0, 10)
        this.deleted                    = data.deleted || 0
        this.createdAt                  = data.createdAt || new Date().toISOString().substr(0, 10)
        this.itemSubtotal               = data.itemSubtotal || 0
        this.serviceSubtotal            = data.serviceSubtotal || 0
        this.exchangeItemSubtotal       = data.exchangeItemSubtotal || 0
        this.exchangeServiceSubtotal    = data.exchangeServiceSubtotal || 0

        this.txnItmSubtotal                 = data.txnItmSubtotal || 0
        this.exchangeTxnItmSubtotal         = data.exchangeTxnItmSubtotal || 0

        this.itemDiscount                   = data.itemDiscount || 0
        this.exchangeItemDiscount           = data.exchangeItemDiscount || 0

        this.serviceDiscount                = data.serviceDiscount || 0
        this.exchangeServiceDiscount        = data.exchangeServiceDiscount || 0

        this.txnItmDiscount                 = data.txnItmDiscount || 0
        this.exchangeTxnItmDiscount         = data.exchangeTxnItmDiscount || 0

        this.refFrom                        = data.refFrom || []
        this.refTo                          = data.refTo || []
        this.saleTaxDetail                  = data.saleTaxDetail || []
        this.inclusiveTaxAmount             = data.inclusiveTaxAmount || 0
    }

    constuct(data) {
        this.constructor(data);
    }
}