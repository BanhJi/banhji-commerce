

export default class ItemLine {
    constructor(data = {}) {
        this.isAddNew = data.isAddNew || false
        this.item = data.item || {}
        this.uom = data.uom || {}
        this.itemPartner = data.itemPartner || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}