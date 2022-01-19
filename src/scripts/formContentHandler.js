const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')


// List
module.exports.getAccount = async function () {
    try {
        const response = await axios.get(apiUrl.setting.accounting_form_content_get)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// save
module.exports.createAccount = async (data) => {
    try {
        const response = await axios.post(apiUrl.setting.accounting_form_content_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}