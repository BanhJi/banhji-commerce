export default class GeneralSetting {
    constructor(data = {}) {
        this.id = data.id || ''
        this.timeIn = data.timeIn || false
        this.timeOut = data.timeOut || false
        this.orderNumber = data.orderNumber || false
        this.cashierName = data.cashierName || false
        this.modifier = data.modifier || false
        this.employee = data.employee || false
        this.note = data.note || false
        this.numberPeople = data.numberPeople || false
        this.saleUnitItem = data.saleUnitItem || false
        this.favorite = data.favorite || false
        this.takeAway = data.takeAway || false
        this.booking = data.booking || false
        this.userPin = data.userPin || false
        this.sessionPin = data.sessionPin || false
        this.allowNFCCard = data.allowNFCCard || false
        this.allowSplitItem = data.allowSplitItem || false
        this.kitchenKitCategories = data.kitchenKitCategories || []
        this.allowKitchenKit = data.allowKitchenKit || false
        this.orderListCategries = data.orderListCategries || []
        this.allowOrderList = data.allowOrderList || false
        this.cancelReasons = data.cancelReasons || []
        this.allowCancelReason = data.allowCancelReason || false
        this.decimal = data.decimal || 0
        this.appNature = data.appNature || 'Retail'
        this.screenDisplay = data.screenDisplay || 'Surface'
        this.receiptTemplate = data.receiptTemplate || '80mm'
        this.defaultPriceLevel = data.defaultPriceLevel || ''
        this.allowSelectPriceLevel = data.allowSelectPriceLevel || false
        this.defaultSegment = data.defaultSegment || ''
        this.allowSelectSegment = data.allowSelectSegment || false
        this.type = data.type || 'retail'
        this.orderFlow = data.orderFlow || []
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}