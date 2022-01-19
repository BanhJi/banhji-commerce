import UserModel from "@/scripts/model/User.js";

/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();
const BudgetStatus = require("@/scripts/default_setup/BudgetStatus.js");

export default class Budget {
    constructor(data = {}) {
        this.uuid               = data.uuid || '';
        this.name               = data.name || '';
        this.budget_type        = data.budget_type || 'standard' // standard(account) or class
        this.description        = data.description || '';
        this.segment_uuid       = data.segment_uuid || '';
        this.project_uuid       = data.project_uuid || '';
        this.location_uuid      = data.location_uuid || '';
        this.budget_estimations = data.budget_estimations || null;// PL report object
        this.fiscal_year        = data.fiscal_year || null;
        this.lines              = data.lines || [];
        this.institute_id       = data.institute_id || instituteId;
        this.use_consolidation  = data.use_consolidation || 0;
        this.status             = data.status || BudgetStatus.DRAFT;

        // Trackable Entity
        this.created_by                 = data.created_by || Object.assign({}, new UserModel());
        this.modified_by                = data.modified_by || Object.assign({}, new UserModel());
        this.created_date               = data.created_date || null;
        this.modified_date              = data.modified_date || null;
    }
    
    constuct(data) {
        this.constructor(data);
    }
}