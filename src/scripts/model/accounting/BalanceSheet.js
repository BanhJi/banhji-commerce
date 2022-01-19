export default class BalanceSheet {
    constructor(data = {}) {
        this.accountUUID = data.accountUUID || ''
        this.account_type_number = data.account_type_number || ''
        this.groupNature = data.groupNature || ''
        this.group_nature_local_name = data.group_nature_local_name || ''
        this.local_name = data.local_name || ''
        this.name = data.name || ''
        this.number = data.number || ''
        this.statementGroup = data.statementGroup || ''
        this.type = data.type || ''
        this.type_local_name = data.type_local_name || ''
        this.order = data.order || ''
        this.balance = data.balance || ''
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