import {AccountModel} from "@/scripts/model/AppModels";

export default class PaymentOptionDetail {
    constructor(data = {}) {
        this.id = data.id || ''
        this.lineId = data.lineId || ''
        this.logo = data.logo || ''
        this.name = data.name || ''
        this.accountName = data.accountName || ''
        this.bankAccountName = data.bankAccountName || ''
        this.bankAccountNumber = data.bankAccountNumber || ''
        this.bankName = data.bankName || ''
        this.clientId = data.clientId || ''
        this.code = data.code || ''
        this.type = data.type || ''
        this.account = data.account || new AccountModel()

        // Map with B Kethya's fields
        if (data.uuid) {
            this.id = data.uuid;
        } else if (data.id) {
            this.uuid = data.id;
        }
    }

    constuct(data) {
        this.constructor(data)
    }
}