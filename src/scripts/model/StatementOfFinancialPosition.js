import AccountingReportTreeListModel from "@/scripts/model/AccountingReportTreeList";

export default class StatementFinancialPosition extends AccountingReportTreeListModel {
    constructor(data = {}) {
        super(data);
        
        this.zero = data.zero || 0
        this.one = data.one || 0
        this.two = data.two || 0
        this.three = data.three || 0
        this.four = data.four || 0
        this.five = data.five || 0
        this.six = data.six || 0
        this.seven = data.seven || 0
        this.eight = data.eight || 0
        this.nine = data.nine || 0
        this.ten = data.ten || 0
        this.eleven = data.eleven || 0
    }
    
    constuct(data) {
        this.constructor(data);
    }
}