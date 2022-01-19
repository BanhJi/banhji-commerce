import ExpenseSummaryDetailModel from "@/scripts/model/ExpenseSummaryDetail";
import ClassModel from "@/scripts/model/Clazz";
import UomModel from "@/scripts/model/Uom";

export default class ExpenseSummaryDetailExtended extends ExpenseSummaryDetailModel {
    constructor (data = {}) {
        super(data);

        this.uom        = data.uom || new UomModel()
        this.class1     = data.class1 || new ClassModel()
        this.class2     = data.class2 || new ClassModel()
        this.class3     = data.class3 || new ClassModel()
        this.class4     = data.class4 || new ClassModel()
        this.class5     = data.class5 || new ClassModel()
    }

    construct(data) {
        this.constructor(data)
    }
}
