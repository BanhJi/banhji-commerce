const axios = require('axios')
const apiUrl = require('@/apiUrl.js')
// List
module.exports.get = async function (strFilter = '') {
    try {
        return await axios.get(apiUrl.bank.bank_connected_get + strFilter)
    } catch (error) {
        window.console.error(error)
    }
}
