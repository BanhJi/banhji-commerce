import Vue from 'vue'
import VueRouter from 'vue-router'
import {Trans} from '@/plugins/Translation'
import {dataStore} from '@/observable/store'
import {i18n} from '@/i18n'

import store from '@/store';

function load(component) {
    // '@' is aliased to src/components
    return () => import(`@/views/${component}.vue`)
}

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const routes = [{
    path: '/:locale',
    component: {
        template: "<keep-alive><router-view></router-view></keep-alive>"
        // template: "<router-view></router-view>"
    },
    beforeEnter: Trans.routeMiddleware,
    children: [
        {
            path: '/',
                name: 'dashboard',
                component: load('HomeIndex'),
                children:
                [
                    {
                        path: '',
                        name: 'Overview',
                        component: load('overview/Home'),
                        meta: {
                            mainMenu: 'welcome',
                            title: 'Overview'
                        }
                    },
                    {
                        path: 'sale_channels',
                        name: 'sale_channels',
                        component: () => import('../views/commerce/ChannelsTab'),
                        meta: {
                            mainMenu: 'sale_channels',
                            title: i18n.t('sale_channels')
                        }
                    },
                    
                    {
                        path: 'sale_order/:id?',
                        name: 'Sale Order',
                        props: true,
                        component: () => import('../views/customers/SaleOrder'),
                        meta: {
                            code: 1.3,
                            moduleId: 2,
                            mainMenu: 'receivables_revenue',
                            miniSideBar: true,
                            title: i18n.t('receivables_revenue')
                        }
                    },
                    {
                        path: 'sale_order_view/:id?',
                        name: 'Sale Order View',
                        props: true,
                        component: () => import('../views/customers/SaleOrderView'),
                        meta: {
                            code: 1.2,
                            moduleId: 2,
                            mainMenu: 'receivables_revenue',
                            miniSideBar: true,
                            title: i18n.t('receivables_revenue')
                        }
                    },
                    {
                        path: 'sale_deposit/:id?',
                        name: 'Sale Deposit',
                        component: () => import('../views/customers/SaleDeposit'),
                        props: true,
                        meta: {
                            code: 1.4,
                            moduleId: 2,
                            mainMenu: 'receivables_revenue',
                            miniSideBar: true,
                            title: i18n.t('receivables_revenue')
                        }
                    },
                    {
                        path: 'sale_deposit_view/:id?',
                        name: 'Sale Deposit View',
                        component: () => import('../views/customers/SaleDepositView'),
                        props: true,
                        meta: {
                            code: 1.4,
                            moduleId: 2,
                            mainMenu: 'receivables_revenue',
                            miniSideBar: true,
                            title: i18n.t('receivables_revenue')
                        }
                    },
                    
                    {
                        path: 'sale_return_view/:id?',
                        name: 'Sale Return View',
                        component: () => import('../views/customers/SaleReturnView'),
                        props: true,
                        meta: {
                            moduleId: 2,
                            mainMenu: 'receivables_revenue',
                            miniSideBar: true,
                            title: i18n.t('receivables_revenue')
                        }
                    },
                    {
                        path: 'customer_directory',
                        name: 'customer_directory',
                        component: () => import('../views/customers/customer/CustomerDirectory'),
                        props: true,
                        meta: {
                            mainMenu: 'customer_directory',
                            miniSideBar: false,
                            title: i18n.t('customer_directory')
                        }
                    },
                    {
                        path: 'company_customer/:id?',
                        name: 'Company Customer',
                        component: () => import('../views/customers/CompanyCustomer'),
                        props: true,
                        meta: {
                            mainMenu: 'receivables_revenue',
                            miniSideBar: false,
                            title: i18n.t('receivables_revenue')
                        }
                    },
                    
            
                    {
                        path: 'individual_customer/:id?',
                        name: 'Individual Customer',
                        component: () => import('../views/customers/IndividualCustomer'),
                        props: true,
                        meta: {
                            mainMenu: 'receivables_revenue',
                            miniSideBar: false,
                            title: i18n.t('receivables_revenue')
                        }
                    },
                    {
                        path: 'app_connection/:id?',
                        name: 'appConnection',
                        component: load('commerce/app_connetion/AppConnected'),
                        props: true,
                        meta: {
                            code: 1.10,
                            moduleId: 2,
                            mainMenu: 'receivables_revenue',
                            miniSideBar: false,
                            title: i18n.t('receivables_revenue')
                        }
                    },
                    {
                        path: 'set_price/:id?',
                        name: 'Set Price',
                        component: load('commerce/pricing_management/SetPrice'),
                        props: true,
                        meta: {
                            moduleId: 18,
                            mainMenu: 'commerce',
                            miniSideBar: false,
                            title: i18n.t('commerce')
                        }
                    },
                    
                    {
                        path: 'pricing',
                        name: 'pricing',
                        component: load('commerce/pricing_management/PricingManagement'),
                        meta: {
                            mainMenu: 'pricing_management',
                            title: 'Pricing Management'
                        }
                    },
                    
                    {
                        path: 'services',
                        name: 'Services Projects',
                        component: load('services_projects/ServicesProjects'),
                        props: true,
                        meta: {
                            moduleId: 6,
                            mainMenu: 'services_projects_non',
                            title: 'Services & Project'
                        }
                    },
                    {
                        path: 'inventory_adjustment/:id?',
                        name: 'Inventory Adjustment',
                        component: load('products/product/inventory_adjustment/InventoryAdjustment'),
                        props: true,
                        meta: {
                            moduleId: 5,
                            mainMenu: 'products',
                            title: 'Products',
                            miniSideBar: true
                        }
                    },
                    {
                        path: 'inventory_adjustment_view/:id?',
                        name: 'Inventory Adjustment View',
                        component: load('products/product/inventory_adjustment/InventoryAdjustmentView'),
                        props: true,
                        meta: {
                            moduleId: 5,
                            mainMenu: 'products',
                            miniSideBar: true,
                            title: 'Products',
                        }
                    },
                    {
                        path: 'warranty',
                        name: 'Warranty',
                        component: load('products/product/warranty/Warranty'),
                        meta: {
                            moduleId: 5,
                            mainMenu: 'products',
                            miniSideBar: true,
                            title: 'Products',
                        }
                    },
                    {
                        path: 'products',
                        name: 'Products',
                        component: load('products/ProductTab'),
                        meta: {
                            moduleId: 5,
                            mainMenu: 'products',
                            title: 'Products'
                        }
                    },
                    {
                        path: 'product/:id?',
                        name: 'Product',
                        component: load('products/Product'),
                        props: true,
                        meta: {
                            moduleId: 5,
                            code: 5.1,
                            mainMenu: 'products',
                            title: 'Products',
                        }
                    },
                    {
                        path: 'production_order',
                        name: 'Production Order',
                        component: load('products/production/production_orders/ProductionOrder'),
                        meta: {
                            moduleId: 5,
                            mainMenu: 'products',
                            miniSideBar: true,
                            title: 'Products',
                        }
                    },
                    {
                        path: 'production_order_view/:id',
                        name: 'View Production Order',
                        props: true,
                        component: load('products/production/production_orders/ProductionOrderView'),
                        meta: {
                            moduleId: 5,
                            mainMenu: 'products',
                            title: 'Products',
                        }
                    },
                    {
                        path: 'production/:id?',
                        name: 'Production',
                        props: true,
                        component: load('products/production/production_orders/Production'),
                        meta: {
                            moduleId: 5,
                            mainMenu: 'products',
                            miniSideBar: true,
                            title: 'Products',
                        }
                    },
                    {
                        path: 'bom/:id?',
                        name: 'Bills Of Material',
                        component: load('products/production/bill_of_material/BillOfMaterial'),
                        props: true,
                        meta: {
                            moduleId: 5,
                            mainMenu: 'products',
                            title: 'Products',
                        }
                    },
                    {
                        path: 'bom_view/:id?',
                        name: 'BomView',
                        component: load('products/production/bill_of_material/BillOfMaterialView'),
                        props: true,
                        meta: {
                            moduleId: 5,
                            mainMenu: 'products',
                            title: 'Products',
                        }
                    },
                    {
                        path: 'build_assembly',
                        name: 'Build Assembly',
                        component: load('products/product/assembled_products/BuildAssembly'),
                        meta: {
                            moduleId: 5,
                            mainMenu: 'products',
                            miniSideBar: true,
                            title: 'Products',
                        }
                    },
                    {
                        path: 'internal_usage',
                        name: 'Internal Usage',
                        component: load('products/production/internal_usage/InternalUsage'),
                        meta: {
                            moduleId: 5,
                            mainMenu: 'products',
                            miniSideBar: true,
                            title: 'Products',
                        }
                    },
                    {
                        path: 'catalog/:id?',
                        name: 'Catalog',
                        component: load('products/product/product_list_catalog/Catalog'),
                        props: true,
                        meta: {
                            moduleId: 5,
                            mainMenu: 'products',
                            miniSideBar: false,
                            title: 'Products',
                        }
                    },
                    {
                        path: 'digital_product',
                        name: 'Digital Product',
                        component: load('services_projects/services_items/digital_product/DigitalProduct'),
                        meta: {
                            moduleId: 6,
                            mainMenu: 'services_projects_non',
                            title: 'Services & Project',
                        }
                    },
                    {
                        path: 'warehouses',
                        name: 'Warehouse Management',
                        component: load('products/warehouses/WarehouseTab'),
                        meta: {
                            moduleId: 5,
                            mainMenu: 'warehouses',
                            title: 'Products',
                        }
                    },
                    {
                        path: 'store/:id?',
                        name: 'Store Management',
                        component: load('products/store/Store'),
                        props: true,
                        meta: {
                            mainMenu: 'store',
                            title: 'store',
                        }
                    },
                    {
                        path: 'store_center',
                        name: 'Store Management',
                        component: load('products/store/StoreTab'),
                        meta: {
                            mainMenu: 'store',
                            title: 'store',
                        }
                    },
                    {
                        path: 'delivery_order',
                        name: 'Delivery Order',
                        component: load('products/warehouses/operations/DeliveryOrder'),
                        meta: {
                            moduleId: 5,
                            mainMenu: 'warehouses',
                            miniSideBar: false,
                            title: 'Products',
                        }
                    },
            
                    {
                        path: 'cash_transactions',
                        name: 'Cash Transactions',
                        props: true,
                        component: load('banking/CashTransactions'),
                        meta: {
                            moduleId: 9,
                            mainMenu: 'banking',
                            title: 'Banking',
                        }
                    },
                    {
                        path: 'cash_transactions/view/:id',
                        name: 'Cash Transactions View',
                        props: true,
                        component: load('banking/CashTransactionsView'),
                        meta: {
                            moduleId: 9,
                            mainMenu: 'banking',
                            title: 'Banking',
                        }
                    },
                    {
                        path: 'fund_receipt/view/:id',
                        name: 'Fund Receipt View',
                        props: true,
                        component: load('budgeting/views/FundReceiptView'),
                        meta: {
                            moduleId: 7,
                            mainMenu: 'budgeting_meta',
                            miniSideBar: true,
                            title: 'Budget & Forecasting',
                        }
                    },
            
                    {
                        path: 'cash_movement',
                        name: 'Cash Movement',
                        component: load('budgeting/CashMovement'),
                        meta: {
                            moduleId: 7,
                            mainMenu: 'budgeting_meta',
                            title: 'Budget & Forecasting',
                        }
                    },
                    {
                        path: 'cash_advance_its_settlements',
                        name: 'Cash Advance Its Settlements',
                        component: load('budgeting/CashAdvanceAndItsSettlement'),
                        meta: {
                            moduleId: 7,
                            mainMenu: 'budgeting_meta',
                            title: 'Budget & Forecasting',
                        }
                    },
                    {
                        path: 'financial_institution/:id?',
                        name: 'Financial Institution',
                        component: load('banking/FinancialInstitution'),
                        meta: {
                            moduleId: 9,
                            mainMenu: 'banking',
                            title: 'Banking & Payments',
                        }
                    },
                    {
                        path: 'financial_institution_view',
                        name: 'Financial Institution View',
                        component: load('banking/views/FinancialInstitutionView'),
                        meta: {
                            moduleId: 9,
                            mainMenu: 'banking',
                            title: 'Banking & Payments',
                        }
                    },
                    {
                        path: 'marketing_promotions',
                        name: 'marketing_promotions',
                        component: load('customers/MarketingPromotions'),
                        meta: {
                            moduleId: 4,
                            mainMenu: 'marketing_promotions',
                            title: 'Marketing & Promotions',
                        }
                    },
                    {
                        path: 'campaign/:id?',
                        name: 'Campaign',
                        component: () => import('../views/marketing/campaign/Campaigns'),
                        props: true,
                        meta: {
                            mainMenu: 'marketing_promotions',
                            miniSideBar: false,
                            title: i18n.t('campaign')
                        }
                    },
                    {
                        path: 'campaigns/:id?',
                        name: 'Campaign',
                        component: () => import('../views/marketing/Campaign'),
                        props: true,
                        meta: {
                            mainMenu: 'marketing_promotions',
                            miniSideBar: false,
                            title: i18n.t('campaign')
                        }
                    },
                    {
                        path: 'settings',
                        name: 'Settings',
                        component: load('settings/Settings'),
                        meta: {
                            moduleId: 13,
                            mainMenu: 'settings',
                            title: 'Settings - BanhJi Accounting',
                        }
                    },
                    
                    {
                        path: 'payment_option/:id?',
                        name: 'Payment Option',
                        component: load('customers/PaymentOption'),
                        props: true,
                        meta: {
                            moduleId: 2,
                            mainMenu: 'receivables_revenue',
                            miniSideBar: false,
                            title: i18n.t('receivables_revenue')
                        }
                    },
                    {
                        path: 'payment_option_vendor/:id?',
                        name: 'Payment Option Vendor',
                        component: load('suppliers/PaymentOption'),
                        props: true,
                        meta: {
                            moduleId: 3,
                            mainMenu: 'receivables_revenue',
                            miniSideBar: false,
                            title: 'Payables',
                        }
                    },
                    {
                        path: 'set_price/:id?',
                        name: 'Set Price',
                        component: load('commerce/pricing_management/SetPrice'),
                        props: true,
                        meta: {
                            moduleId: 2,
                            mainMenu: 'receivables_revenue',
                            miniSideBar: false,
                            title: i18n.t('receivables_revenue')
                        }
                    },
                    
                    // payment
                    {
                        path: 'payments',
                        name: 'payments',
                        component: load('payment/Insight'),
                        props: true,
                        meta: {
                            moduleId: 17,
                            mainMenu: 'payments',
                            title: i18n.t('payments')
                        }
                    },
                    
            
                    {
                        path: 'loyalty_reward',
                        name: 'loyalty_reward',
                        component: load('loyalty_reward/LoyaltyRewardTab'),
                        props: true,
                        meta: {
                            mainMenu: 'loyalty_reward',
                            title: i18n.t('loyalty_reward')
                        }
                    },
                    {
                        path: 'loyalty_card/:id?',
                        name: 'loyalty_card',
                        component: load('loyalty_reward/loyalty_card/Card'),
                        props: true,
                        meta: {
                            mainMenu: 'loyalty_reward',
                            miniSideBar: false,
                            title: i18n.t('loyalty_card')
                        }
                    },
                    {
                        path: 'gift_card/:id?',
                        name: 'gift_card',
                        component: load('loyalty_reward/gift_card/Card'),
                        props: true,
                        meta: {
                            mainMenu: 'loyalty_reward',
                            miniSideBar: false,
                            title: i18n.t('gift_card')
                        }
                    },
                    {
                        path: 'store_card/:id?',
                        name: 'store_card',
                        component: load('loyalty_reward/store_card/Card'),
                        props: true,
                        meta: {
                            mainMenu: 'loyalty_reward',
                            miniSideBar: false,
                            title: i18n.t('store_card')
                        }
                    },
                    {
                        path: 'reward/:id?',
                        name: 'reward',
                        component: load('loyalty_reward/reward_programs/Reward'),
                        props: true,
                        meta: {
                            mainMenu: 'loyalty_reward',
                            miniSideBar: false,
                            title: i18n.t('reward')
                        }
                    },
                    {
                        path: 'partners/:id?',
                        name: 'partners',
                        component: load('commerce/partners_center/Partners'),
                        props: true,
                        meta: {
                            mainMenu: 'partners',
                            miniSideBar: false,
                            title: i18n.t('partners')
                        }
                    },
                    
                    {
                        path: 'order_sale',
                        name: 'order_sale',
                        component: load('order_sale/OrderSaleTab'),
                        props: true,
                        meta: {
                            mainMenu: 'order_sale',
                            title: i18n.t('order_sale')
                        }
                    },
                    {
                        path: 'team_management',
                        name: 'team_management',
                        component: load('employee/EmployeeDirectory'),
                        props: true,
                        meta: {
                            mainMenu: 'team_management',
                            title: i18n.t('team_management')
                        }
                    },
                    {
                        path: 'employee/:id?',
                        name: 'Employee',
                        component: load('employee/Employee'),
                        props: true,
                        meta: {
                            mainMenu: 'employee_payroll',
                            miniSideBar: false,
                            title: 'Employee Payroll',
                        }
                    },
                    {
                        path: 'employment_history/:id?/:record_id?',
                        name: 'Employment History',
                        component: load('employee/EmploymentHistory'),
                        meta: {
                            moduleId: 4,
                            mainMenu: 'employee_payroll',
                            miniSideBar: false,
                            title: 'Employee Payroll',
                        }
                    },
                    {
                        path: 'point_of_sales',
                        name: 'point_of_sales',
                        component: load('pos/Pos'),
                        props: true,
                        meta: {
                            mainMenu: 'point_of_sales',
                            title: i18n.t('point_of_sales')
                        }
                    },
                    
                    {
                        path: 'e_commerce',
                        name: 'e_commerce',
                        component: load('e_commerce/CommerceTab'),
                        props: true,
                        meta: {
                            mainMenu: 'e_commerce',
                            title: i18n.t('e_commerce')
                        }
                    },
                    {
                        path: '_sale',
                        name: '_sale',
                        component: load('pos/sale/Sales'),
                        props: true,
                        meta: {
                            mainMenu: 'point_of_sales',
                            title: i18n.t('point_of_sales')
                        }
                    },
                    {
                        path: 'stock_count/:id?',
                        name: 'Stock Count',
                        component: load('products/count_adjustment/StockCounts'),
                        props: true,
                        meta: {
                            moduleId: 5,
                            mainMenu: 'products',
                            title: 'Products',
                            miniSideBar: true
                        }
                    },
                    {
                        path: 'product_import',
                        name: 'Product Import',
                        component: load('products/ProductImports'),
                        props: true,
                        meta: {
                            moduleId: 5,
                            mainMenu: 'products',
                            title: 'Products',
                            miniSideBar: true
                        }
                    },
                    {
                        path: 'item-modifier/:id?',
                        name: 'Item Modifier',
                        component: load('products/product/ItemModifier'),
                        props: true,
                        meta: {
                            moduleId: 5,
                            mainMenu: 'products',
                            miniSideBar: false,
                            title: 'Products',
                        }
                    },
                    {
                        path: 'service/:id?',
                        name: 'Service',
                        props: true,
                        component: load('services_projects/items/services_items/Service'),
                        meta: {
                            moduleId: 6,
                            mainMenu: 'services_projects_non',
                            title: 'Services & Project'
                        }
                    },
                    {
                        path: 'services_project/:id?',
                        name: 'Services Project',
                        props: true,
                        component: load('services_projects/project/projects/Project'),
                        meta: {
                            moduleId: 6,
                            mainMenu: 'services_projects_non',
                            type: 'project',
                            title: 'Services & Project'
                        }
                    },
                    {
                        path: 'analytics',
                        name: 'analytics',
                        props: true,
                        component: load('reports/ReportTab'),
                        meta: {
                            mainMenu: 'analytics',
                            title: 'analytics'
                        }
                    },
                    {
                        path: 'products_services',
                        name: 'product_service',
                        props: true,
                        component: load('product_service/ProductServiceTab'),
                        meta: {
                            mainMenu: 'product_service',
                            title: 'product_service'
                        }
                    },
                    {
                        path: 'contacts',
                        name: 'contacts',
                        props: true,
                        component: load('contacts/ContactsTab'),
                        meta: {
                            mainMenu: 'contacts',
                            title: 'contacts'
                        }
                    },
                    
                    
                ]
        },

        {
            path: 'pos',
            name: 'pos',
            component: load('PosIndex'),
            meta: {
                product: true,
            },
            children:[
                {
                    path: 'retail',
                    name: 'dashboard_pos',
                    component: load('pos/Dashboard'),
                    meta: {
                        mainMenu: 'overview',
                        title: i18n.t('point_of_sales'),
                        description: i18n.t('pos_retail_dis')

                    },

                },
                {
                    path: 'f_b',
                    name: 'dashboard_2',
                    component: load('pos/Dashboard'),
                    props: true,
                    meta: {
                        mainMenu: 'point_of_sales',
                        title: i18n.t('point_of_sales'),
                        description: i18n.t('pos_f_b_dis')
                    }
                },
                {
                    path: 'service',
                    name: 'dashboard_3',
                    component: load('pos/Dashboard'),
                    props: true,
                    meta: {
                        mainMenu: 'point_of_sales',
                        title: i18n.t('point_of_sales'),
                        description: i18n.t('pos_service_dis')
                    }
                },
                {
                    path: 'setting',
                    name: 'setting',
                    component: load('pos/setting/PosTab'),
                    meta: {
                        mainMenu: 'point_of_sales',
                        title: 'POS Settings',
                    }
                },
                {
                    path: 'session',
                    name: 'session',
                    component: load('pos/Session'),
                    meta: {
                        mainMenu: 'point_of_sales',
                        title: 'POS Settings',
                    }
                },
                {
                    path: 'delivery',
                    name: 'delivery',
                    component: load('pos/delivery_order/DeliveryOrderTab'),
                    meta: {
                        mainMenu: 'point_of_sales',
                        title: 'delivery',
                    }
                },
                {
                    path: 'delivery_order',
                    name: 'Delivery Order',
                    component: load('pos/operations/DeliveryOrder'),
                    meta: {
                        mainMenu: 'point_of_sales',
                        title: 'delivery',
                    }
                },
                
            ]

        },

    ]
},
    {
        path: '*',
        redirect() {
            return Trans.defaultLocale;
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    //  Receivable
    if (to.meta.moduleId == 2 && dataStore.productType == 'npo') {
        document.title = i18n.t("receipts_revenue")
        to.meta.mainMenu = "receipts_revenue"
    } else if (to.meta.moduleId == 2) {
        document.title = i18n.t("receivables_revenue")
        to.meta.mainMenu = "receivables_revenue"
    } else if (to.meta.moduleId == 3 && dataStore.productType == 'npo') {
        document.title = i18n.t("payments_expenditures")
        to.meta.mainMenu = "payments_expenditures"
    } else if (to.meta.moduleId == 3) {
        document.title = i18n.t("suppliers_purchases")
        to.meta.mainMenu = "suppliers_purchases"
    } else if (to.meta.moduleId == 5 && dataStore.productType == 'npo') {
        document.title = i18n.t("employee_payroll")
        to.meta.mainMenu = "employee_payroll"
    }

    if (dataStore.isValidUser == false) {
        document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
        return
    } else {
        // authentication for npo 
        if (dataStore.productType == 'npo') {
            if (to.meta.moduleId === 11 || to.meta.moduleId === 5 || to.meta.moduleId === 6 || to.meta.moduleId === 17  || to.meta.moduleId === 16 || to.meta.moduleId === 15) {
                document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
                alert('Unauthorization | គ្មានការអនុញ្ញាត')
                window.history.go(-1);
                return;
            }
        }
        if(to.meta.moduleId == 11 && dataStore.productType == 'Public Sectors'){
            document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
            alert('Unauthorization | គ្មានការអនុញ្ញាត')
            window.history.go(-1);
            return;
        }
        // for micor edition
        if (dataStore.productType === 'MicroEdition') {
            if (to.meta.moduleId != 15 && to.meta.moduleId != 1) {
                if(to.meta.code != 1.10 && to.meta.code != 1.5 && to.meta.code != 2.1 && to.meta.code != 5.1 && to.meta.code != 2.7  && to.meta.code != 1.7  && to.meta.code != 2.5 && to.meta.code != 2.3){
                    document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
                    alert(i18n.t("no_right_acess"))
                    window.history.go(-1);
                    return;
                }
            }
        }
        // 
        if (dataStore.productType === 'Cooperative' || dataStore.productType === 'cooperative') {
            if (to.meta.type == 'insurance' || to.meta.type == 'compliance') {
                document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
                window.history.go(-1);
                return
            }
        } else if (dataStore.productType === 'Standard') {
            if (to.meta.mainMenu === 'employee_payroll' || to.meta.mainMenu === 'warehouses' || to.meta.type === 'project' || to.meta.mainMenu === 'compliance' || to.meta.mainMenu === 'budgeting_meta') {
                document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
                window.history.go(-1);
                return;
            }
        } else if (dataStore.productType === 'Premium') {
            if (to.meta.mainMenu === 'warehouses') {
                document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
                window.history.go(-1);
                return
            }
        }
        if (dataStore.roles.length > 0) {
            if (dataStore.roles.filter(o => o.moduleId === to.meta.moduleId).length > 0) {
                const rol = dataStore.roles.filter(o => o.moduleId === to.meta.moduleId)[0]
                if (rol.access === 0) {
                    document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
                    window.history.go(-1);
                    return
                }
                if (rol.children) {
                    if (rol.children.filter(p => p.code === to.meta.code && p.access === 0).length > 0) {
                        document.title = "Unauthorization | គ្មានការអនុញ្ញាត"
                        window.history.go(-1);
                        return
                    }
                }
                next()
            }
        }

    }
    next()
})
// Router After Hooks
router.afterEach((to) => {
    store.dispatch('historyPage/addPage', to);
})

export default router
