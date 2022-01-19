export default class Catalog {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.type = data.type || 'Catalog'
        this.publicLink = data.publicLink || ''
        this.transactionDate = data.transactionDate || new Date()
        this.priceLevel = data.priceLevel || {}
        this.description = data.description || ''
        this.number = data.number || ''
        this.forPOS = data.forPOS || false
        this.forEcommerce = data.forEcommerce || true
        this.itemLines = data.itemLines || []
        this.images = data.images || {}
        this.status = data.status || 1
        this.deleted = data.deleted || 0
    }

    constuct(data) {
        this.constructor(data);
    }
}