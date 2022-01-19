/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default class ItemLine {
    constructor(data = {}) {
        this.account            = data.account || {}
        this.description        = data.description ||  {}
        this.uom                = data.uom || {}
        this.qty                = data.qty || 1
        this.price              = data.price || 0
        this.amount             = data.amount || 0
        this.tax                = data.tax || {}
        this.discount           = data.discount || 0
        this.class1             = data.class1 || {}
        this.class2             = data.class2 || {}
        this.class3             = data.class3 || {}
        this.class4             = data.class4 || {}
        this.class5             = data.class5 || {}
        this.dateFormat         = institute.dateFormat
    }

    constuct(data) {
        this.constructor(data);
    }
}