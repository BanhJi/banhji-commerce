export default class PaymentOption {
    constructor(data = {}) {
        this.id = data.id || ''
        this.paymentOption = data.paymentOption || []
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}