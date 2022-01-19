export default class LocationType {
    constructor(data = {}) {
        this.id = data.id || ''
        this.code = data.code || ''
        this.name = data.name || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}