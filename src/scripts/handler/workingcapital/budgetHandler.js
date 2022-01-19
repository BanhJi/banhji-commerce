const baseHandler = require('@/scripts/baseHandler.js');
const axios = require('axios');
const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.working_capital + '/budgets';

// GET BY ID
module.exports.getOne = async (id) => {
    try {
        const response = await baseHandler.getOne(urlPath, id);
    
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await baseHandler.getAll(urlPath);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        // const response = await baseHandler.save(urlPath, data);
        const response = await axios.post(urlPath, data);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// SAVE CLASS BUDGET
module.exports.saveClassBudget = async (data) => {
    try {
        const response = await axios.post(urlPath + "/budgetclass", data);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET BUDGET FOR CONSOLIDATE
module.exports.getBudgetForConsolidate = async (params) => {
    try {
        const response = await axios.get(urlPath + '/consolidate', params);
    
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET ACTUAL BUDGET FOR CONSOLIDATE(PL Statement)
module.exports.getActualBudgetForConsolidate = async (params) => {
    try {
        const response = await axios.get(urlPath + '/actualConsolidatePnL', params);
    
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET ACTUAL CLASS BUDGET
module.exports.getActualClassBudget = async (params) => {
    try {
        const response = await axios.get(urlPath + '/actuatClassBudget', params);
    
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET ACTUAL CLASS BUDGET DETAIL
module.exports.getActualClassBudgetDetail = async (params) => {
    try {
        const response = await axios.get(urlPath + '/actuatClassBudgetDetail', params);
    
        return response;
    } catch (error) {
        window.console.error(error);
    }
}