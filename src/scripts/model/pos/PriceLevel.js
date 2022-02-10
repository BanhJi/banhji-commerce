export default class PriceLevel {
    constructor(data = {}) {
        this.id = data.id || ''
        this.priceLevel = data.priceLevel || {}
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}