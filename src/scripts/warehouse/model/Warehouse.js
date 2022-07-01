export default class Warehouse {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.code = data.code || ''
        this.typeId = data.typeId || ''
        this.address = data.address || ''
        this.segmentId = data.segmentId || ''
        this.user = data.user || {}
        this.lockDelete = data.lockDelete || 'no'
    }

    constuct(data) {
        this.constructor(data);
    }
}