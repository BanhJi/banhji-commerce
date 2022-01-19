import { AccountModel, UserModel } from "@/scripts/model/AppModels";

export default class ReconcileRuleReport {
    constructor(data = {}) {
        this.pk                 = data.pk || '';
        this.sk                 = data.sk || '';
        this.num                = data.num || '';
        this.todo               = data.todo || 0;
        this.variant            = data.variant || 0;
        this.status             = data.status || "";
        this.note               = data.note || "";
        this.monthOf            = data.monthOf || "";
        this.complatedAt        = data.complatedAt || null;
        this.account            = data.account || Object.assign({}, new AccountModel());
        
        // Trackable Entity
        this.created_by         = data.created_by || Object.assign({}, new UserModel());
        this.modified_by        = data.modified_by || Object.assign({}, new UserModel());
        this.created_date       = data.created_date || null;
        this.modified_date      = data.modified_date || null;
    }
    
    constuct(data) {
        this.constructor(data);
    }
}