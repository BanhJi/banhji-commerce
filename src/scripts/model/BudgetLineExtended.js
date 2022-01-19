import BudgetLineModel from "@/scripts/model/BudgetLine.js";
import AccountModel from "@/scripts/model/Account.js";
import ClassModel from "@/scripts/model/Clazz.js";

export default class BudgetLineExtended extends BudgetLineModel {
    constructor(data = {}) {
        super(data);

        /* Tree List Format */
        this.parentId   = data.parentId || null
        this.number     = data.number || ''
        this.name       = data.name || ''
        this.order      = data.order || 0
        this.account    = data.account || new AccountModel()
        this.clazz      = data.clazz || new ClassModel()
        this.secondary_account = data.secondary_account || new AccountModel()
    }
    
    constuct(data) {
        this.constructor(data);
    }
}