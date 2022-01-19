//:todo itemLine purchase record for compliance
export default class ItemLinePurchase {
    constructor(data = {}) {
        this.amount                         = data.amount || 0
        this.amountInclusive                = data.amountInclusive || 0
        this.amountNetVat                   = data.amountNetVat || 0
        this.vat                            = data.vat || 0
        this.description                    = data.description || ''
        this.taxName                        = data.taxName || {}
        this.baseAmount                     = data.baseAmount || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}