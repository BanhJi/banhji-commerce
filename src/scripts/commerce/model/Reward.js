export default class Reward {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.code = data.code || ''
        this.effectiveDate = data.effectiveDate || new Date().toISOString().substr(0, 10)
        this.isEndDate = data.isEndDate || false
        this.endDate = data.endDate || new Date().toISOString().substr(0, 10)
        this.description = data.description || ''
        // Rule
        this.amountPerPoint = data.amountPerPoint || 1
        this.amountPerPointType = data.amountPerPointType || 'percentage'
        this.pointPerReward = data.pointPerReward || 1
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