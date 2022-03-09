const apiUrl 	    = require('@/apiUrl.js')
const axios 	    = require('axios')

module.exports.settingGet = async function () {
    try {
        const response = await axios.get(apiUrl.commerce.settingGet)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.settingCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.settingCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.campaignCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.campaignCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.campaignGets = async function () {
    try {
        const response = await axios.get(apiUrl.commerce.campaignGets)

        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.campaignGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.commerce.campaignGet + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.deleteCampaign = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.commerce.campaignDelete, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.campCouponGets = async function (id) {
    try {
        const response = await axios.get(apiUrl.commerce.campCouponGets + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.itemSearchURL = function (strFilter = '') {
    try {
        // return apiUrl.product.product_variant_list
        return apiUrl.commerce.itemSearch + strFilter
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.customerSearchURL = function (strFilter = '') {
    try {
        const response = apiUrl.customer.customer_searchv1 + strFilter
        return response
    } catch (error) {
        window.console.error(error)
    }
}