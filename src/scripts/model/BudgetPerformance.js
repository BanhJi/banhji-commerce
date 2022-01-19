export default class BudgetPerformance {
    constructor(data = {}) {
        this.uuid = data.uuid || ''
        this.parentId = data.parentId || null

        /* Information */
        this.code = data.code || ''
        this.number = data.number || ''
        this.name = data.name || ''
        this.local_name = data.local_name || ''
        this.order = data.order || 0

        /* Budget */
        this.budget_month = data.budget_month || 0
        this.budget_ytd = data.budget_ytd || 0
        this.budget_whole = data.budget_whole || 0

        /* Actual */
        this.actual_month = data.actual_month || 0
        this.actual_ytd = data.actual_ytd || 0
        this.actual_whole = data.actual_whole || 0

        /* Percentage */
        this.month_percentage = data.month_percentage || 0
        this.ytd_percentage = data.ytd_percentage || 0
        this.whole_percentage = data.whole_percentage || 0

        /* Variance */
        this.month_variance = data.month_variance || 0
        this.ytd_variance = data.ytd_variance || 0
    }
    
    constuct(data) {
        this.constructor(data);
    }
}