export default class ServiceItem {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.sku = data.sku || ''
        this.category = data.category || {}
        this.priceLevel = data.priceLevel || {}
        this.type = data.type || {}
        this.group = data.group || {}
        this.subGroup = data.subGroup || {}
        this.saleDescription = data.saleDescription || ''
        this.purchaseDescription = data.purchaseDescription || ''
        this.uom = data.uom || {}
        this.price = data.price || 0
        this.warehouse = data.warehouse || {}
        this.incomeAcc = data.incomeAcc || {}
        this.costOfGoodsSoldAcc = data.costOfGoodsSoldAcc || {}
        this.defaultTax = data.defaultTax || {}
        this.specificTax = data.specificTax || {}
        this.otherTax = data.otherTax || {}
        this.images = data.images || {}
        this.canBeSold = data.canBeSold || false
        this.canBeSubContracted = data.canBeSubContracted || false
        this.isDelayedRevenue = data.isDelayedRevenue || false
        this.isConsignmentItem = data.isConsignmentItem || false
        this.canBeRecurringSubscribed = data.canBeRecurringSubscribed || false
        this.isMeteredService = data.isMeteredService || false
        this.isTimeBounded = data.isTimeBounded || false
        this.revenueSharingRates        = data.revenueSharingRates || []
        this.isLicense                  = data.isLicense || false
        this.reUsed                     = data.reUsed || false

        // Price
        this.value = data.value || 1
        this.base = data.base || 100
    }

    constuct(data) {
        this.constructor(data);
    }
}
