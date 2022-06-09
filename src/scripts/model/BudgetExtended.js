import BudgetModel from "@/scripts/model/Budget.js";
import SegmentModel from "@/scripts/model/Segment.js";
import LocationModel from "@/scripts/model/Location.js";
import ProjectModel from "@/scripts/model/Project.js";

export default class BudgetExtended extends BudgetModel {
    constructor(data = {}) {
        super(data);
        
        this.segment = data.segment || Object.assign({}, new SegmentModel());
        this.location = data.location || Object.assign({}, new LocationModel());
        this.project = data.project || Object.assign({}, new ProjectModel());
    }
    
    constuct(data) {
        this.constructor(data);
    }
}