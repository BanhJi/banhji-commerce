export default class SessionSetting {
    constructor(data = {}) {
        this.id = data.id || ''
        this.sessionType = data.sessionType || 'Cash Count'
        this.sessionStart = data.sessionStart || []
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}