/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/commerce-service/'

module.exports = {
    settingGet                                  : url + 'commerce/setting/' + instituteId + '/get',
    settingCreate                               : url + 'commerce/setting/' + instituteId + '/create',
    campaignCreate                              : url + 'campaign/' + instituteId + '/create',
    campaignGet                                 : url + 'campaign/' + instituteId + '/get',
    campaignGets                                : url + 'campaign/' + instituteId + '/list',
    itemSearch                                  : url + 'item/' + instituteId + '/search/',
    customerSearch                              : url + 'customer/' + instituteId + '/search/',
}