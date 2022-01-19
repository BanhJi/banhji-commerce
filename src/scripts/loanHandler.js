const apiUrl 	    = require('@/apiUrl.js')
const axios 	    = require('axios')
const baseHandler 	= require('@/scripts/baseHandler.js')

module.exports.productGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.product_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.productCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.product_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.purposeCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.purpose_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.purposeGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.purpose_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.savingGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.saving_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.savingCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.saving_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.memberTypeGet = async function () {
    try {
        const response = await axios.get(apiUrl.loan.member_type_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.memberTypeCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.loan.member_type_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET BY ID
module.exports.getOne = async (id) => {
    baseHandler.getOne(apiUrl.loans + '/loans', id).then(result=>{
        return result.data;
    })
}
// GET LIST
module.exports.getAll = async () => {
    const response = await axios.get(apiUrl.loans + '/loans')
    return response.data;
    //  await baseHandler.getAll(apiUrl.loans + '/loans').then(result=>{
    //     return result.data;
    // })
}

// SAVE
module.exports.save = async (data) => {
    return baseHandler.save(apiUrl.loans + '/loans', data)
}

module.exports.getInsight = async () => {
    try {
        const response = await axios.get(apiUrl.loans + '/loans/dashboard')
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}