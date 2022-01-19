import AccountModel  from "@/scripts/model/Account";

export default class AccountingReportTreeList {
    constructor(data = {}) {
        this.uuid = data.uuid || ''
        this.parentId = data.parentId || null
        this.order = data.order || 0

        /* Account Information */
        this.number = data.number || ''
        this.name = data.name || ''
        this.local_name = data.local_name || ''
        this.balance = data.balance || 0
        this.account = data.account || new AccountModel()
    }
    
    constuct(data) {
        this.constructor(data);
    }
}