/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/transaction-billing-report/'

module.exports = {
    payment_with_tax                              : url + 'payment-with-tax/institute/' + instituteId + '/payment-with-tax',
    cash_receipt_by_item                          : url + 'cash-receipt-item/institute/' + instituteId + '/cash-receipt-item',
    late_fee_report                               : url + 'cash-receipt-latefee/institute/' + instituteId + '/cash-receipt-latefee',
    product_summary_report                        : url + 'product-summary-report/institute/' + instituteId + '/product-summary-report',
    product_detail_report                         : url + 'product-detail-report/institute/' + instituteId + '/product-detail-report',
}