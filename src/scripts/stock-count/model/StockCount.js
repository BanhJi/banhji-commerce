export default class StockCount {
    constructor(data = {}) {
        this.id = data.id || ''
        this.type = data.type || ''
        this.number = data.number || ''
        this.sequcencing = data.sequcencing || ''
        this.structure = data.structure || ''
        this.lastNumber = data.lastNumber || ''
        this.referenceNo = data.referenceNo || ''
        this.abbr = data.abbr || ''
        this.category = data.category || {}
        this.group = data.group || {}
        this.subGroup = data.subGroup || {}
        this.itemLines = data.itemLines || []
        this.transactionDate = data.transactionDate || new Date().toISOString().substr(0, 10)
        this.transactionDateTZ = data.transactionDateTZ || new Date().toISOString().substr(0, 10)
        this.transactionType = data.transactionType || {}
        this.segment = data.segment || {}
        this.warehouse = data.warehouse || {}
        this.project = data.project || {}
        this.status = data.status || 1
        this.isAutoGenerate = data.isAutoGenerate || 1
        this.deleted = data.deleted || 0
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 7)
    }

    constuct(data) {
        this.constructor(data);
    }
}

