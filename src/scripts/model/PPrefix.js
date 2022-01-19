export default class PPrefix {
    constructor(data = {}) {
        this.id         = data.id || ''
        this.abbr       = data.abbr || ''
        this.name       = data.name || ''
        this.format     = data.format || 0
        this.separator  = data.separator || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}