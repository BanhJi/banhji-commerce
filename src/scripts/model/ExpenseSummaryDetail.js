import { SupplierModel, CurrencyModel, ContactModel, UserModel, JournalEntryModel, DiscountItemModel, TaxModel } from "@/scripts/model/AppModels";

/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

/* Store */
import store from "@/store";
const institute = store.state.institute.institute;

export default class ExpenseSummaryDetail extends JournalEntryModel {
    constructor (data = {}) {
        super(data);

        this.journal_uuid               = data.journal_uuid || ''
        this.number                     = data.number || ''
        this.date                       = data.date || ''
        this.due_date                   = data.due_date || ''
        this.bill_date                  = data.bill_date || ''
        this.bill_number                = data.bill_number || ''
        this.bill_currency              = data.bill_currency || new CurrencyModel(institute.baseCurrency)
        this.supplier                   = data.supplier ||new ContactModel()
        this.employee                   = data.employee ||new ContactModel()
        this.payment_term               = data.payment_term || '' //uuid
        this.segment_uuid               = data.segment_uuid || ''
        this.location_uuid              = data.location_uuid || ''
        this.project_uuid               = data.project_uuid || ''
        this.month_of                   = data.month_of || ''
        this.additional_cost_supplier   = data.additional_cost_supplier || new SupplierModel()
        this.use_for_option             = data.use_for_option || 0 // 0=Credit, 1=Reimburst, 2=Cash Advance
        this.use_for_transaction_uuid   = data.use_for_transaction_uuid || ''
        this.voucher_note               = data.voucher_note || ''
        this.journal_note               = data.journal_note || ''
        this.expense_entries            = data.expense_entries || []
        this.template                   = data.template || null
        this.institute_id               = data.institute_id || instituteId
        this.is_draft                   = data.is_draft || 0
        this.is_cleared                 = data.is_cleared || 0
        this.created_by                 = data.created_by || new UserModel();
        this.modified_by                = data.modified_by || new UserModel();
        this.created_date               = data.created_date || null;
        this.modified_date              = data.modified_date || null;

        this.status                     = data.status || 0 // 0 = open, 1 = approved, 2 = reject
        
        this.uom_uuid   = data.uom_uuid || ''
        this.quantity   = data.quantity || 0.00
        this.mark_up    = data.mark_up || 0.00
        this.price      = data.price || 0.00
        this.billable   = data.billable || 0
        this.discount   = data.discount || new DiscountItemModel()
        this.tax_item   = data.tax_item || new TaxModel()
        this.discountAs = data.discountAs || ''
        this.decimalFormat = data.decimalFormat || 'n2'
    }

    construct(data) {
        this.constructor(data)
    }
}
