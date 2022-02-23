export default class Campaign {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.code = data.code || ''
        this.type = data.type || 'automatic'
        this.couponNumber = data.couponNumber || []
        this.discountItem = data.discountItem || {}
        this.effectiveDate = data.effectiveDate || new Date().toISOString().substr(0, 10)
        this.endDate = data.endDate || new Date().toISOString().substr(0, 10)
        this.description = data.description || ''
        // Rule
        this.isOverwrite = data.isOverwrite || false
        this.isTiming = data.isTiming || false
        this.timeFrom = data.timeFrom || ''
        this.timeTo = data.timeTo || ''
        this.isPartner = data.isPartner || false
        this.partner = data.partner || {}
        this.partnerShareAmount = data.partnerShareAmount || 0
        this.priceLevel = data.priceLevel || {}
        this.ruleBase = data.ruleBase || 'customer'
        this.ruleCustomerBaseType = data.ruleCustomerBaseType || 'all'
        this.ruleCustomerTypes = data.ruleCustomerTypes || []
        this.ruleCustomers = data.ruleCustomers || []
        this.ruleProductBaseOn = data.ruleProductBaseOn || 'all'
        this.ruleProductCategory = data.ruleProductCategory || []
        this.ruleProductGroup = data.ruleProductGroup || []
        this.ruleProduct = data.ruleProduct || []
        // Reward
        this.rewardBase = data.rewardBase || 'amountBase'
        this.rewardType = data.rewardType || 'fixed'
        this.rewardAmount = data.rewardAmount || 0
        this.rewardAmountType = data.rewardAmountType || 'percentage'
        this.rewardVarian = data.rewardVarian || []
        this.productBaseOn = data.productBaseOn || 'all'
        this.rewardProductCategory = data.rewardProductCategory || []
        this.rewardProductGroup = data.rewardProductGroup || []
        this.rewardProduct = data.rewardProduct || []
        // Branch
        this.branches = data.branches || []
        this.user = data.user || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}