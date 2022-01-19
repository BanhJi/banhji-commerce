const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const {dataStore} = require('./observable/store');
const instituteHandler = require('@/scripts/instituteHandler')
module.exports.init = async () => {
    if (cookie) {
        await instituteHandler.getRoles().then(res => {
            if (res) {
                dataStore.roles = res.module || []
                dataStore.roleData = res.data || []
                dataStore.roleType = res.type || 0
            }
        })
        dataStore.isValidUser = true
        let data = cookie
        if (parseInt(data.plan) === 4) {
            dataStore.productType = 'Cooperative'
        } else if (parseInt(data.plan) === 3) {
            dataStore.productType = "Advanced";
        } else if (parseInt(data.plan) === 2) {
            dataStore.productType = "Premium";
        }
        else if (parseInt(data.plan) === 6) {
            dataStore.productType = "npo";
        }else if (parseInt(data.plan) === 7) {
            dataStore.productType = "Public Sectors";
        }
        else if (parseInt(data.plan) === 8) {
            dataStore.productType = "MicroEdition";
        }
         else {
            dataStore.productType = 'Standard'
        }
        dataStore.productType = "Public Sectors";
        // dataStore.productType = "npo";
        // dataStore.productType = "MicroEdition";
    } else {
        dataStore.isValidUser = false;
        if (process.env.VUE_APP_MODE !== "dev") {
            window.location.href = "https://connect.banhji.com/"
        }
    }
}