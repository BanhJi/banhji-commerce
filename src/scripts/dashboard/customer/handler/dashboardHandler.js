const axios = require('axios')
const apiUrl = require('@/apiUrl')

// List
module.exports.customerRevenue = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.revenue + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// List Sale Funel
module.exports.customerSaleFunel = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.sale_funel + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// List Sale Analysis
module.exports.customerSaleAnalysis = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.sale_analysis + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}


// Dashboard Customer and Payment Graph
module.exports.customerBalanceNPaymentGraph = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.sale_payment_graph + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Dashboard Customer Over Credit Limit
module.exports.customerOverCreditLimit = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.sale_over_credit_limit + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Dashboard Vendor Purchase
module.exports.vendorTotalPurchase = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.total_purchase + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Dashboard Vendor Purchase n Expense n Purchase Order Graph
module.exports.vendorPurchaseNPurchaseOrder = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.vendor_purchasex_purchase_order_graph + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// List Vendor Purchase Analysis
module.exports.vendorPurchaseAnalysis = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.vendor_purchase_analysis + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// List Vendor Purchase 3 ways matching
module.exports.vendor3WayMatching = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.vendor_3way_matching + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Dashboard Vendor Over Credit Limit
module.exports.vendorOverCreditLimit = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.vendor_over_credit_limit + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// List Product Inventory Balance top 5
module.exports.top5InventoryBalance = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.product_top5_inventory_balance + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// List Product Inventory Balance top 5 category
module.exports.top5InventoryCategory = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.product_top5_inventory_category + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// List Product Purchase Item only
module.exports.productPurchase = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.product_purchase + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// List Product Sale Item only
module.exports.productSale = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.product_sale + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// List Product Balance Purchase Sale Graph
module.exports.productGraph = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.product_balance_purchase_sale_graph + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// List Service top 5 category
module.exports.top5ServiceCategory = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.service_top5_service_category + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// List Service Service service purchase
module.exports.servicePurchase = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.service_purchase + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// List Service Sale service only
module.exports.serviceSale = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.service_sale + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// List Service Revenue Graph
module.exports.serviceGraph = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.service_revenue_graph + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// List Service Project Ratio
module.exports.serviceProjectRatio = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.service_project_ratio + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Dashboard Banking graph
module.exports.bankingGraphPaymentOption = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.dashboard.banking_graph_payment_option + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

//Todo: Sale Margin Analysis
module.exports.saleMarginAnalysis = async function (strFilter = '') {
    try {
        return await axios.get(apiUrl.dashboard.sale_margin_analysis + '/' + strFilter)
    } catch (error) {
        window.console.error(error)
    }
}
//Todo: Sale Tax Detail
module.exports.saleTaxDetail = async function (strFilter = '') {
    try {
        return await axios.get(apiUrl.dashboard.sale_tax_detail + '/' + strFilter)
    } catch (error) {
        window.console.error(error)
    }
}