const axios 	= require('axios')
const instance = axios.create();
const baseUrl = process.env.VUE_APP_API;
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const instituteId = cookie !== undefined ? cookie.instituteId : '';
const inst = instituteId.split('-');
const url = process.env.VUE_APP_MODE === 'dev' ? 'https://dev-api-rupp.camemis-learn.com' : 'https://api-rupp.camemis-learn.com'
// /rupp-api/v1/identify
const getToken = async () => {
    let data ={
        email: "banhji@gmail.com",
        password: "Dfa$UZpaG4TT-k%e"
    }
    const result =  await instance.post(`${url}/rupp-api/v1/identify`,data); 
    return result.data.token;
}

module.exports.get = async function () {
  try {
    const token = await getToken();
    const result =  await instance.get(`${url}/rupp-api/v1/list-fee-category`,   
        {
            headers: {
                'Authorization': `Bearer ${token} `,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
         
            }
        });
    return result.data.data;
  } catch (error) {
    window.console.error(error)
  }
}
module.exports.getDepartment = async function () {
  try {
    const token = await getToken();
    const result =  await instance.get(`${url}/rupp-api/v1/list-all-faculty-department`,   
        {
            headers: {
                'Authorization': `Bearer ${token} `,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
         
            }
        });
    return result.data.data;
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.add = async function (data) {
    try {
      window.console.log(data);
        const result =  await axios.post(`${baseUrl}/v1-srv/educations/${inst[1]}/matches`,data); 
        return result.data;
    } catch (error) {
      window.console.error(error)
      return false;
    }
  }

module.exports.getMatch = async () => {
  try {
    const result =  await axios.get(`${baseUrl}/v1-srv/educations/${inst[1]}/matches`); 
    window.console.log("result", result);
      return result;
  } catch (error) {
    window.console.error(error)
    return false;
  }
}
module.exports.deletItem = async (data) => {
  try {
    const result =  await axios.delete(`${baseUrl}/v1-srv/educations/${inst[1]}/items`,{data: data}); 
    window.console.log("result", result);
      return result;
  } catch (error) {
    window.console.error(error)
    return false;
  }
}
module.exports.deletLocation = async (data) => {
  window.console.log(data);
  try {
    const result =  await axios.delete(`${baseUrl}/v1-srv/educations/${inst[1]}/locations`,{data: data}); 
    window.console.log("result", result);
      return result;
  } catch (error) {
    window.console.error(error)
    return false;
  }
}
  