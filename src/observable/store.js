import Vue from 'vue'
export const data =  Vue.observable({
    name:{
        lastname: 'Chhin',
        firstname: 'Chhai'
    },
    show: false,
    resources: '',
    keyword:'',
    customer_tab_main:1,
    customer_tab_sub:0,
    vendor_tab_main:1,
    vendor_tab_sub:0,
    product_tab_main:1,
    product_tab_sub:0,
    budget_tab_main:1,
    budget_tab_sub:0,
    payroll_tab_main:1,
    service_tab_main: 1,
    accounting_tab_main: 1,
    banking_tab_main: 1,
    funding_tab_main: 1,
    compliance_main_tab: 1


})
export const dataStore =  Vue.observable({
    productType: '',
    isValidUser: true,
    company: {},
    businessType: 'Service',
    publick_inv_link : '',
    roles: [],
    roleData: [],
    roleType: 0
})
export const ShowResource = (key) =>{
    data.show = true
    data.keyword =  key
}
export const setTabActive = (main,sub) =>{
   data.customer_tab_main = main
   data.customer_tab_sub  = sub
}
export const hideResource = () =>{
    data.show = false
    data.resources = ''
}
export const setTabActiveVendor  = (main,sub) =>{
    data.vendor_tab_main = main
    data.vendor_tab_sub  = sub
}
export const setTabActiveBudget  = (main,sub) =>{
    data.budget_tab_main = main
    data.budget_tab_sub  = sub
 }

