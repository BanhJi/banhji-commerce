export default class ProductGroup {
    constructor(data = {}) {
        this.id = data.id || ''
        this.abbr = data.abbr || ''
        this.name = data.name || ''
        this.color = data.color || '#9fcc63'
        this.img = data.img || ''
        this.group = data.group || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}
