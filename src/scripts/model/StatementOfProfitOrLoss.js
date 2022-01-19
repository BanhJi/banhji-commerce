import AccountingReportTreeListModel from "@/scripts/model/AccountingReportTreeList";

export default class StatementOfProfitOrLoss extends AccountingReportTreeListModel {
    constructor(data = {}) {
        super(data);

        /* Budget */
        this.budgetAmount = data.budgetAmount || 0
    }
    
    constuct(data) {
        this.constructor(data);
    }
}