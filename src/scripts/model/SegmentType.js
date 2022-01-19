export default class Segment {
    constructor(data = {}) {
        this.id = data.id || ''
        this.code = data.code || ''
        this.name = data.name || ''
        this.isSystem = data.isSystem || 0
    }

    constuct(data) {
        this.constructor(data);
    }
}