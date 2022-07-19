export default class Store {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.code = data.code || ''
        this.nature = data.nature || 'retail'
        this.segmentId = data.segmentId || ''
        this.warehouseId = data.warehouseId || ''
        this.saleChannelId = data.saleChannelId || ''
        this.address = data.address || ''
        this.user = data.user || {}
        this.lockDelete = data.lockDelete || 'no'
    }

    constuct(data) {
        this.constructor(data);
    }
}