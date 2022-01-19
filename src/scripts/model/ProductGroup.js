export default class ProductGroup {
    constructor(data = {}) {
        this.id = data.id || ''
        this.abbr = data.abbr || ''
        this.name = data.name || ''
        this.color = data.color || '#9fcc63'
        this.img = data.img || ''
        this.category = data.category || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}
