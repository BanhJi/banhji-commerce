export default class Campaign {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.code = data.code || ''
        this.type = data.type || 'automatic'
        this.discountItem = data.discountItem || {}
        this.saleChannel = data.saleChannel || {}
        this.effectiveDate = data.effectiveDate || new Date()
        this.endDate = data.endDate || new Date()
        this.description = data.description || ''
        // Rule
        this.isOverwrite = data.isOverwrite || false
        this.isTiming = data.isTiming || false
        this.timeFrom = data.timeFrom || ''
        this.timeTo = data.timeTo || ''
        // Reward
        this.isRewardBase = data.isRewardBase || false
        this.rewardBase = data.rewardBase || 'product'
        this.rewardBase = data.rewardBase || 'amountBase'
        this.rewardType = data.rewardType || 'fixed'
        this.rewardAmount = data.rewardAmount || 0
        this.rewardAmountType = data.rewardAmountType || 'percentage'
        this.productBaseOn = data.productBaseOn || 'all'
        // Apply
        this.isApplyCustomer = data.isApplyCustomer || false
        this.applyCustomers = data.applyCustomers || []
        this.isApplyProduct = data.isApplyProduct || false
        this.applyProducts = data.applyProducts || []
        // Branch
        this.branches = data.branches || []
        this.user = data.user || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}