export default class AccountingFormContent {
    constructor(data = {}) {
        this.id                 = data.id || ''
        this.C1                 = data.C1 || false
        this.C2                 = data.C2 || false
        this.C3                 = data.C3 || false
        this.C4                 = data.C4 || false
        this.C5                 = data.C5 || false
        this.secondaryAccount   = data.secondaryAccount || false
        this.accountLanguage    = data.accountLanguage || 'English'
        this.decimal            = data.decimal || 2
        this.isSystem           = data.isSystem || 1
    }

    constuct(data) {
        this.constructor(data);
    }
}