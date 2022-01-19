export default class ConnectedBank {
    constructor(data = {}) {
        this.lineId             = data.lineId || ''
        this.id                 = data.id || ''
        this.tick               = data.tick || false
        this.logo               = data.logo || ''
        this.coa                = data.coa || {}
        this.bank               = data.bank || {}
        this.bankAccount        = data.bankAccount || {}
        this.account            = data.account || {}
        this.merchant           = data.merchant || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}