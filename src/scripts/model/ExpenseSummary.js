import { ContactModel, UserModel } from "@/scripts/model/AppModels";

/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

export default class Expense {
    constructor(data = {}) {
        this.uuid                       = data.uuid || ''
        this.number                     = data.number || ''
        this.date                       = data.date || new Date().toISOString().substr(0, 10)
        this.employee                   = data.employee ||new ContactModel()
        this.segment_uuid               = data.segment_uuid || ''
        this.location_uuid              = data.location_uuid || ''
        this.project_uuid               = data.project_uuid || ''
        this.month_of                   = data.month_of || ''
        this.use_for_option             = data.use_for_option || 0 // 0=Credit, 1=Reimburst, 2=Cash Advance
        this.use_for_transaction_uuid   = data.use_for_transaction_uuid || ''
        this.description                = data.description || ''
        this.summary_details            = data.summary_details || []
        this.institute_id               = data.institute_id || instituteId
        this.is_draft                   = data.is_draft || 0
        this.is_cleared                 = data.is_cleared || 0

        // Trackable Entity
        this.created_by                 = data.created_by || new UserModel();
        this.modified_by                = data.modified_by || new UserModel();
        this.created_date               = data.created_date || null;
        this.modified_date              = data.modified_date || null;
    }
    
    constuct(data) {
        this.constructor(data);
    }
}