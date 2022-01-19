/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default class Purchase {
    constructor(data = {}) {
            this.id                         = data.id || ''
            this.uuid                       = data.uuid || ''
            this.journal_uuid               = data.journal_uuid || ''
            this.number                     = data.number || ''
            this.paymentCode                = data.paymentCode || ''
            this.referenceNo                = data.referenceNo || ''
            this.abbr                       = data.abbr || ''
            this.transactionDate            = data.transactionDate || new Date().toISOString().substr(0, 10)
            this.dueDate                    = data.dueDate || new Date().toISOString().substr(0, 10)
            this.monthOf                    = data.monthOf || new Date().toISOString().substr(0, 7)
            this.supplier                   = data.supplier || {}
            this.transactionType            = data.transactionType || {}
            this.paymentTerm                = data.paymentTerm || {}
            this.discountPromotion          = data.discountPromotion || {}
            this.apAcc                      = data.apAcc || {}
            this.currency                   = data.currency || {}
            this.baseCurrency               = data.baseCurrency || {}
            this.rate                       = data.rate || 1
            this.txnRate                    = data.txnRate || 1
            this.exchangeRate               = data.exchangeRate || {}
            this.exchangeAmount             = data.exchangeAmount || 0
            this.priceLevel                 = data.priceLevel || {}
            this.itemLines                  = data.itemLines || {}
            this.segment                    = data.segment || {}
            this.location                   = data.location || {}
            this.project                    = data.project || {}
            this.employee                   = data.employee || {}
            this.billingAddress             = data.billingAddress || {}
            this.deliveryAddress            = data.deliveryAddress || {}
            this.deliveryDateTime           = data.deliveryDateTime || new Date().toISOString().substr(0, 10)
            this.transactionNote            = data.transactionNote || ''
            this.journalNote                = data.journalNote || ''
            this.billDate                   = data.billDate || new Date().toISOString().substr(0, 10)
            this.billNo                     = data.billNo || ''
            this.subTotal                   = data.subTotal || 0
            this.total                      = data.total || 0
            this.discountTotal              = data.discountTotal || 0
            this.exchangeDiscountTotal      = data.exchangeDiscountTotal || 0
            this.specificDiscountTotal      = data.specificDiscountTotal || 0
            this.deliveryFee                = data.deliveryFee || 0
            this.totalTaxAmount             = data.totalTaxAmount || 0
            this.depositAmount              = data.depositAmount || 0
            this.depositDeduction           = data.depositDeduction || 0
            this.exchangeDepositDeduction   = data.exchangeDepositDeduction || 0
            this.remainingAmount            = data.remainingAmount || 0
            this.inclusiveTaxAmount         = data.inclusiveTaxAmount || 0
            this.withholdingTaxAmount         = data.withholdingTaxAmount || 0
            this.totalAfterWithholdingTax   = data.totalAfterWithholdingTax || 0
            this.amountDue                  = data.amountDue || 0
            this.currentBalance             = data.currentBalance || 0
            this.balance                    = data.balance || 0
            this.creditLimit                = data.creditLimit || 0
            this.saveOption                 = data.saveOption || 1 // 0: Draft , 1: Save
            this.status                     = data.status || 1 // 0: Pending , 1: Active , 2: Waiting Approval , 3: rejected
            this.approvedBy                 = data.approvedBy || {}
            this.rejectedBy                 = data.rejectedBy || {}
            this.formTemplate               = data.formTemplate || {}
            this.specificDiscountItem       = data.specificDiscountItem || {}
            this.otherCharge                = data.otherCharge || []
            this.otherChargeAmount          = data.otherChargeAmount || {}
            this.type                       = data.type || ''
            this.taxListTotal               = data.taxListTotal || {}
            this.jRaw                       = data.jRaw || []
            this.dateFormat                 = institute.dateFormat
            this.createdAt                  = data.createdAt || new Date()
            this.saveSend                   = data.saveSend || false
            this.deleted                    = data.deleted || 0
            this.dr                         = data.dr || 0
            this.cr                         = data.cr || 0

            this.itemSubtotal                   = data.itemSubtotal || 0
            this.serviceSubtotal                = data.serviceSubtotal || 0
            this.exchangeItemSubtotal           = data.exchangeItemSubtotal || 0
            this.exchangeServiceSubtotal        = data.exchangeServiceSubtotal || 0

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
            this.supplierDiscountItem           = data.supplierDiscountItem || []
            this.additionalCost                 = data.additionalCost || []
            this.additionalCostMethod           = data.additionalCostMethod || 'Qty Based'
            this.additionalCostTotal            = data.additionalCostTotal || 0


        }

    constuct(data) {
        this.constructor(data);
    }
}