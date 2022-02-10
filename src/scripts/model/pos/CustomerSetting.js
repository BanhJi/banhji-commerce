export default class CustomerSetting {
    constructor(data = {}) {
        this.id = data.id || ''
        this.customerType = data.customerType || []
        this.defaultCustomer = data.defaultCustomer || {}
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}