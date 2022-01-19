import AccountModel from "@/scripts/model/Account.js";
import ClassModel from "@/scripts/model/Clazz.js";
import BudgetPerformance from "@/scripts/model/BudgetPerformance.js";

export default class ActualClassBudgetDetail extends BudgetPerformance {
    constructor(data = {}) {
        super(data);

        this.account_uuid  = data.account_uuid || ""
        this.account = data.account || new AccountModel()
        this.clazz = data.clazz || new ClassModel()
        this.actual_amount = data.actual_amount || 0
        this.actual_monthly_amount = data.actual_monthly_amount || []
        this.amount = data.amount || 0
        this.exchange_rate = data.exchange_rate || 0
        this.exchanged_amount = data.exchanged_amount || 0
        this.is_class = data.is_class || 0
        this.is_deleted = data.is_deleted || 0
        this.is_in_used = data.is_in_used || 0
    }
    
    constuct(data) {
        this.constructor(data);
    }
}