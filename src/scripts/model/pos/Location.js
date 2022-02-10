export default class Location {
    constructor(data = {}) {
        this.id = data.id || ''
        this.location = data.location || {}
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}