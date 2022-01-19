/*
 * Last modified : 3/3/21, 3:01 PM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

const axios = require('axios')
const apiUrl = require('@/apiUrl')
module.exports.save = async (data) => {
    try {
        // store.default.commit(vueXKey, data)
        return await axios.post(apiUrl.warehouse.receiptOrder_post, data)
    } catch (error) {
        window.console.error(error)
    }

}

module.exports.getAll = async (data) => {
    try {
        const response = await axios.get(apiUrl.warehouse.receiptOrder_get, {
            params: {
                'endDate': data ? data.endDate : '',
                'startDate': data ? data.startDate : '',
            }
        })
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getByReceiptOrder = async (receiptOrderId) => {
    try {
        const response = await axios.get(apiUrl.warehouse.receiptOrder_getById + receiptOrderId + '/list')
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}


module.exports.getBatch = async (itemId, whId, instituteId, type) => {
    try {
        const response = await axios.get(apiUrl.warehouse.receiptOrder_batch, {params: {itemId: itemId, type: type, whId: whId, instituteId: instituteId}})
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}