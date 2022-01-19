import BalanceSheetModel from "@/scripts/model/accounting/BalanceSheet";

export default class BalanceSheetAnalysis extends BalanceSheetModel {
    constructor(data = {}) {
        super(data);

        this.baseAmount = data.baseAmount || 0
        this.compareAmount = data.compareAmount || 0
        this.changePercentage = data.changePercentage || 0
        this.commonSize = data.commonSize || 0
    }
    
    constuct(data) {
        this.constructor(data);
    }
}