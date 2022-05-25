export default class Partner {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.customerId = data.customerId || ''
        this.vendorId = data.vendorId || ''
        this.paymentMethod = data.paymentMethod || 'cash'
        this.attachmentId = data.attachmentId || ''
        this.customer = data.customer || {}
        this.vendor = data.vendor || {}
        this.user = data.user || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}