//:todo itemLine sale record for compliance
export default class ItemLineSale {
    constructor(data = {}) {
        this.amount                         = data.amount || 0
        this.amountInclusive                = data.amountInclusive || 0
        this.amountNetVat                   = data.amountNetVat || 0
        this.amountSpecificTax               = data.amountSpecificTax || ''
        this.specificTax                     = data.specificTax || ''
        this.pubTax                         = data.pubTax || {}
        this.accomTax                       = data.accomTax || {}
        this.vat                            = data.vat || 0
        this.amountPubTax                   = data.amountPubTax || 0
        this.amountAccomTax                 = data.amountAccomTax || 0
        this.description                    = data.description || ''
        this.taxName                        = data.taxName || {}
        this.baseAmount                     = data.baseAmount || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}