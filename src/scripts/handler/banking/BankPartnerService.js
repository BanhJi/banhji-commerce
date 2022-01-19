const apiUrl = require('@/apiUrl.js');
const axios = require('axios');
const urlPath = apiUrl.partner_services;

/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

// GET ALL
module.exports.getAll = async () => {
    try {
        const response = await axios.get(urlPath + '/banks');
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}
// GET BY INSITUTE
module.exports.getByInstitute = async (id) => {
    try {
        const response = await axios.get(urlPath + `/institutes/${id}/banks`);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// CONNECT
module.exports.connect = async (bankId, data) => {
    try {
        const response = await axios.post(urlPath + `/institutes/${instituteId}/banks/${bankId}`, data);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}