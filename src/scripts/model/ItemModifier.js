export default class ItemModifier {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.uom = data.uom || {}
        this.price = data.price || 0
        this.category = data.category || {}
        this.group = data.group || {}
        this.priceLevel = data.priceLevel || {}
        this.itemLines = data.itemLines || []
        this.status = data.status || 1
        this.deleted = data.deleted || 0
        this.transactionDate = data.transactionDate || new Date().toJSON()
    }

    constuct(data) {
        this.constructor(data);
    }
}
