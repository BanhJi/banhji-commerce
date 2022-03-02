const axios = require('axios');
const apiUrl = require('@/apiUrl.js');


// GET BY ID
module.exports.getOne = async (id) => {
    try {
        const response = await axios.get(apiUrl.accounts + `/${id}`);
        
        return response
    } catch (error) {
        window.console.error(error);
    }
}

// GET ALL
module.exports.getAll = async () => {
    try {
        const response = await axios.get(apiUrl.accounts, {
            params: {
                reqeust_acc_balance: false,
                start_date: '0',
                end_date: '0',
            }
        });
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET MULTI REQUESTS
module.exports.getMultiRequests = async () => {
    try {
        let results = [],
            page = 1,
            pageSize = 500;

        /* Lead request */
        let leadResponse = await axios.get(apiUrl.accounts, {
            params: {
                reqeust_acc_balance: false,
                start_date: '0',
                end_date: '0',
                page_number: page,
                item_per_page: pageSize,
            }
        });

        if(leadResponse){
            /* Add to result */
            results = [...leadResponse.data.data];
            
            let requests = [],
                totalPages = Math.ceil(leadResponse.data.total_item_count / pageSize);

            if(totalPages > 1){
                /* Increase to second page */
                page++;

                /* Loop the rest of pages */
                for (let i = page; i <= totalPages; i++) {
                    /* Requests */
                    let request = axios.get(apiUrl.accounts, {
                        params: {
                            page_number: i,
                            item_per_page: pageSize,
                        }
                    })
        
                    /* Add requests */
                    requests.push(request);
                }
        
                let responses = await Promise.all(requests);
                for (let j = 0; j < totalPages -1; j++) {
                    const element = responses[j];
                    if(element){
                        results = [...results, ...element.data.data];
                    }
                }
            }
        }
        
        return results;
    } catch (error) {
        window.console.error(error);
    }
}

// GET ACCOUNT BY ACCOUNT TYPE
module.exports.getByAccountType = async (typeNumber) => {
    try {
        const response = await axios.get(apiUrl.account_types + `/${typeNumber}/accounts`);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await axios.post(apiUrl.accounts, data);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}