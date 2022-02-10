export default class SaleChannelSetting {
    constructor(data = {}) {
        this.id = data.id || ''
        this.saleChannel = data.saleChannel || []
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}