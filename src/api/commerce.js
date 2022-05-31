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
    campaignDelete                              : url + 'campaign/' + instituteId + '/del',
    campCouponGets                              : url + 'campaign/coupon/' + instituteId + '/get',
    itemSearch                                  : url + 'item/' + instituteId + '/search/',
    customerSearch                              : url + 'customer/' + instituteId + '/search/',
    rewardCreate                                : url + 'reward/' + instituteId + '/create',
    rewardGet                                   : url + 'reward/' + instituteId + '/get',
    rewardGets                                  : url + 'reward/' + instituteId + '/list',
    rewardDelete                                : url + 'reward/' + instituteId + '/del',
    partnerCreate                                : url + 'partner/' + instituteId + '/create',
    partnerGet                                   : url + 'partner/' + instituteId + '/get',
    partnerGets                                  : url + 'partner/' + instituteId + '/list',
    deletePartner                                : url + 'partner/' + instituteId + '/del',
}