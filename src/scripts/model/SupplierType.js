export default class SupplierType {
    constructor(data = {}) {

        this.id = data.id || ''
        this.name = data.name || ''
        this.abbr = data.abbr || ''
        this.nature = data.nature || {}
        this.apAcc = data.apAcc || {}
        this.priceLevel = data.priceLevel || {}
        this.purchaseTax = data.purchaseTax || {}
        this.purchaseDepositAcc = data.purchaseDepositAcc || {}
        this.paymentTerm = data.paymentTerm || {}
        this.purchaseDiscountAcc = data.purchaseDiscountAcc || {}
        this.witholdingTax = data.witholdingTax || {}
        this.bankDisbursement = data.bankDisbursement || {}
        this.chequePayment = data.chequePayment || {}
        this.cashPayment = data.cashPayment || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}