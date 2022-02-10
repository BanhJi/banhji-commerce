export default class CategorySetting {
    constructor(data = {}) {
        this.id = data.id || ''
        this.category = data.category || []
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}