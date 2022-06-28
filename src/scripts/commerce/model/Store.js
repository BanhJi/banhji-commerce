export default class Store {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.code = data.code || ''
        this.segmentId = data.segmentId || ''
        this.warehouseId = data.warehouseId || ''
        this.saleChannelId = data.saleChannelId || ''
        this.address = data.address || ''
        this.user = data.user || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}