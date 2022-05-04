const axios = require('axios')
const apiUrl = require('@/apiUrl')

// Request Payment create
// save
module.exports.paymentWithTax = async (data) => {
    try {
        // window.console.log('billing_report', apiUrl.billing_report.payment_with_tax)
        return await axios.post(apiUrl.billing_report.payment_with_tax, data)
    } catch (error) {
        window.console.error(error)
    }
}
