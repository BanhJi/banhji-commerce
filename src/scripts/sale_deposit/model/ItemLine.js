/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default class ItemLine {
    constructor(data = {}) {
        this.id = data.id || ''
        this.account = data.account || {}
        this.description = data.description || ''
        this.paymentOption = data.paymentOption || {}
        this.refNo = data.refNo || ''
        this.amount = data.amount || 0
        this.deleted = data.deleted || 0
        this.dateFormat =  institute.dateFormat
        this.decimalFormat =  data.decimalFormat || 'n2'
        this.optionType =  data.optionType || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}