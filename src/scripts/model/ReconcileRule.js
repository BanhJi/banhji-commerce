import { AccountModel, UserModel } from "@/scripts/model/AppModels";

export default class ReconcileRule {
    constructor(data = {}) {
        this.pk                 = data.pk || '';
        this.sk                 = data.sk || '';
        this.dayOfTheMonth      = data.dayOfTheMonth || 1;
        this.account            = data.account || Object.assign({}, new AccountModel());
        this.note               = data.note || '';
        this.createdAt          = data.createdAt || null;
        
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