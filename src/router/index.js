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
            name: 'Overview',
            component: load('overview/OverviewTab'),
            meta: {
                mainMenu: 'welcome',
                title: 'Overview'
            }
        },
        {
            path: '/not_authorization',
            name: 'not_authorization',
            component: load('NotAuthentication'),
            meta: {
                mainMenu: 'NotAuthentication',
                title: 'NotAuthentication'
            }
        },
        {
            path: 'sale_channels',
            name: 'sale_channels',
            component: () => import('../views/customers/SaleChannels'),
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
            component: load('customers/sales/sale_channels/app_connetion/AppConnected'),
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
            path: 'pricing',
            name: 'pricing',
            component: load('customers/PricingManagement'),
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
            path: 'stock_count/:id?',
            name: 'Stock Count',
            component: load('products/product/count_adjustment/StockCounts'),
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
            path: 'product_variant/:id?',
            name: 'Product Variant',
            component: load('products/product/product_variants/products/ProductVariant'),
            props: true,
            meta: {
                moduleId: 5,
                mainMenu: 'products',
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
            component: load('products/warehouses/WarehouseManagement'),
            meta: {
                moduleId: 5,
                mainMenu: 'warehouses',
                title: 'Products',
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
            path: 'shelving_order',
            name: 'Shelving Order',
            component: load('products/warehouses/operations/ShelvingOrder'),
            meta: {
                moduleId: 5,
                mainMenu: 'warehouses',
                miniSideBar: true,
                title: 'Products',
            }
        },
        {
            path: 'transfer_order',
            name: 'Transfer Order',
            component: load('products/warehouses/operations/TransferOrder'),
            meta: {
                moduleId: 5,
                mainMenu: 'warehouses',
                miniSideBar: false,
                title: 'Products',
            }
        },
        {
            path: 'packing_order',
            name: 'Packing order',
            component: load('products/warehouses/operations/PackingOrder'),
            meta: {
                moduleId: 5,
                mainMenu: 'warehouses',
                miniSideBar: false,
                title: 'Products',
            }
        },
        {
            path: 'receipt_order',
            name: 'Receipt Order',
            component: load('products/warehouses/operations/ReceiptOrder'),
            meta: {
                moduleId: 5,
                mainMenu: 'warehouses',
                miniSideBar: false,
                title: 'Products',
            }
        },
        {
            path: 'budgeting',
            name: 'budgeting',
            component: load('budgeting/Budgeting'),
            meta: {
                moduleId: 7,
                mainMenu: 'budgeting_meta',
                title: 'Budget & Forecasting',
            }
        },
        {
            path: 'cash_reconciliation',
            name: 'Cash Reconciliation',
            props: true,
            component: load('banking/CashReconciliation'),
            meta: {
                moduleId: 9,
                mainMenu: 'banking',
                title: 'Banking',
            }
        },
        {
            path: 'segment_budget',
            name: 'Segment Budget',
            props: true,
            component: load('budgeting/budgets/SegmentBudget'),
            meta: {
                moduleId: 7,
                mainMenu: 'budgeting_meta',
                title: 'Budget & Forecasting',
            }
        },
        {
            path: 'business_unit_budget',
            name: 'Business Unit Budget',
            props: true,
            component: load('budgeting/business_unit/Budget'),
            meta: {
                moduleId: 7,
                mainMenu: 'budgeting_meta',
                title: 'Budget & Forecasting',
            }
        },
        {
            path: 'project_budget',
            name: 'Project Budget',
            props: true,
            component: load('budgeting/project_budget/ProjectBudget'),
            meta: {
                moduleId: 7,
                mainMenu: 'budgeting_meta',
                title: 'Budget & Forecasting',
            }
        },
        {
            path: 'class_budget',
            name: 'Class Budget',
            props: true,
            component: load('budgeting/class_budget/ClassBudget'),
            meta: {
                moduleId: 7,
                mainMenu: 'budgeting_meta',
                title: 'Budget & Forecasting',
            }
        },
        {
            path: 'cash_reconciliation/view/:id',
            name: 'Cash Reconciliation View',
            props: true,
            component: load('banking/views/CashReconciliationView'),
            meta: {
                moduleId: 9,
                mainMenu: 'banking',
                title: 'bankding',
            }
        },
        {
            path: 'bank_reconciliation',
            name: 'Bank Reconciliation',
            component: load('banking/BankReconciliation'),
            meta: {
                moduleId: 9,
                mainMenu: 'banking',
                title: 'Banking & Payments',
            }
        },
        {
            path: 'bank_reconciliation/view',
            name: 'Bank Reconciliation View',
            props: true,
            component: load('banking/views/BankReconciliationView'),
            meta: {
                moduleId: 9,
                mainMenu: 'banking',
                title: 'Banking & Payments',
            }
        },
        {
            path: 'bank_reconciliation_bank_feeds/:id?',
            name: 'Bank Reconciliation Bank Feeds',
            component: load('banking/BankReconciliationBankFeeds'),
            meta: {
                moduleId: 9,
                mainMenu: 'banking',
                title: 'Banking & Payments',
            }
        },
        {
            path: 'bank_statement_reconciliation',
            name: 'Bank Statement Reconciliation',
            component: load('banking/banking/BankStatementReconciliation'),
            props: true,
            meta: {
                moduleId: 9,
                mainMenu: 'banking',
                title: 'Banking & Payments',
            }
        },
        {
            path: 'bank_transaction_mapping',
            name: 'Bank Transaction Mapping',
            component: load('banking/settings/BankTransactionMapping'),
            props: true,
            meta: {
                moduleId: 9,
                mainMenu: 'banking',
                title: 'Banking & Payments',
            }
        },
        {
            path: 'bank_field_mapping',
            name: 'Bank Field Mapping',
            component: load('banking/settings/BankFieldMapping'),
            props: true,
            meta: {
                moduleId: 9,
                mainMenu: 'banking',
                title: 'Banking & Payments',
            }
        },
        {
            path: 'bank_account/:id?',
            name: 'Bank Account',
            component: load('banking/BankAccount'),
            meta: {
                moduleId: 9,
                mainMenu: 'banking',
                title: 'Banking & Payments',
            }
        },
        {
            path: 'bank_account_view',
            name: 'Bank Account View',
            component: load('banking/views/BankAccountView'),
            meta: {
                moduleId: 9,
                mainMenu: 'banking',
                title: 'Banking & Payments',
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
            path: 'loan_monitoring',
            name: 'Loan Monitoring',
            component: load('budgeting/LoanMonitoring'),
            meta: {
                moduleId: 7,
                mainMenu: 'budgeting_meta',
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
            component: load('customers/pricing_management/SetPrice'),
            props: true,
            meta: {
                moduleId: 2,
                mainMenu: 'receivables_revenue',
                miniSideBar: false,
                title: i18n.t('receivables_revenue')
            }
        },
        {
            path: 'new_tax_return/:id?',
            name: 'New Tax Return',
            component: load('compliance/monthly_tax/new_tax_return/newTaxReturn'),
            props: true,
            meta: {
                moduleId: 12,
                mainMenu: 'compliance',
                title: 'Compliance',
                type: 'compliance',
            }
        },
        {
            name: 'Sale Record',
            path: 'sale_record/:id?',
            component: load('compliance/monthly_tax/new_tax_return/review_return/sale_record/SaleRecord'),
            props: true,
            meta: {
                moduleId: 12,
                mainMenu: 'compliance',
                miniSideBar: false,
                title: 'Compliance',
                type: 'compliance',
            }
        },
        {
            name: 'Add Sale',
            path: 'add_sale/:id?',
            component: load('compliance/monthly_tax/new_tax_return/input/add_sale/AddSale'),
            props: true,
            meta: {
                moduleId: 12,
                mainMenu: 'compliance',
                miniSideBar: false,
                title: 'Compliance',
                type: 'compliance',
            }
        },
        {
            name: 'Purchase Record',
            path: 'purchase_record/:id?',
            component: load('compliance/monthly_tax/new_tax_return/review_return/purchase_record/PurchaseRecord'),
            props: true,
            meta: {
                moduleId: 12,
                mainMenu: 'compliance',
                miniSideBar: false,
                title: 'Compliance',
                type: 'compliance',
            }
        },
        {
            name: 'Add Purchase',
            path: 'add_purchase/:id?',
            component: load('compliance/monthly_tax/new_tax_return/input/add_purchase/AddPurchase'),
            props: true,
            meta: {
                moduleId: 12,
                mainMenu: 'compliance',
                miniSideBar: false,
                title: 'Compliance',
                type: 'compliance',
            }
        },
        {
            name: 'Withholding Tax Record',
            path: 'withholding_tax_record/:id?',
            component: load('compliance/monthly_tax/new_tax_return/review_return/withholding_tax_record/WithholdingTaxRecord'),
            props: true,
            meta: {
                moduleId: 12,
                mainMenu: 'compliance',
                miniSideBar: false,
                title: 'Compliance',
                type: 'compliance',
            }
        },
        {
            name: 'Add Withholding Tax',
            path: 'add_withholding_tax/:id?',
            component: load('compliance/monthly_tax/new_tax_return/input/add_withholding_tax/AddWithholdingTax'),
            props: true,
            meta: {
                moduleId: 12,
                mainMenu: 'compliance',
                miniSideBar: false,
                title: 'Compliance',
                type: 'compliance',
            }
        },
        {
            name: 'Add Salary',
            path: 'add_salary/:id?/:salary?',
            component: load('compliance/monthly_tax/new_tax_return/input/add_salary/AddSalary'),
            props: true,
            meta: {
                moduleId: 12,
                mainMenu: 'compliance',
                miniSideBar: false,
                title: 'Compliance',
                type: 'compliance',
            }
        },
        {
            path: 'monthly_return/view/:id?',
            name: 'View Tax Return',
            component: load('compliance/monthly_tax/viewTaxReturn'),
            props: true,
            meta: {
                moduleId: 12,
                mainMenu: 'compliance',
                miniSideBar: false,
                title: 'Compliance',
                type: 'compliance',
            }
        },
        // Insurance
        //  ===== =>
        {
            path: 'insurance',
            name: 'Insurance',
            component: load('insurance/Insurances'),
            props: true,
            meta: {
                moduleId: 13,
                mainMenu: 'welcome',
                miniSideBar: false,
                type: 'insurance',
                title: 'Insurance',
            }
        },
        {
            path: 'insurance_detial',
            name: 'InsuranceDetail',
            component: load('insurance/InsuranceDetail'),
            props: true,
            meta: {
                moduleId: 13,
                mainMenu: 'welcome',
                miniSideBar: false,
                type: 'insurance',
                title: 'Insurance',
            }
        },
        {
            path: 'insurance_purchase',
            name: 'InsurancePurchase',
            component: load('insurance/InsurancePurchase'),
            props: true,
            meta: {
                moduleId: 13,
                mainMenu: 'welcome',
                miniSideBar: true,
                type: 'insurance',
                title: 'Insurance',
            }
        },
        // Share Funding
        {
            path: 'share_funding',
            name: 'share_funding',
            component: load('share_funding/ShareFundingTab'),
            props: true,
            meta: {
                moduleId: 14,
                mainMenu: 'funding_project',
                miniSideBar: false,
                title: i18n.t('funding_project')
            }
        },
        {
            path: 'company_donor/:id?',
            name: 'CompanyCustomerDonor',
            component: () => import('../views/share_funding/donor/CompanyCustomerDonor.vue'),
            props: true,
            meta: {
                moduleId: 14,
                mainMenu: 'funding_project',
                miniSideBar: false,
                title: i18n.t('funding_project')
            }
        },
        // Micro Edition module id 15
        {
            path: 'revenues',
            name: 'revenues',
            component: load('micro_edition/revenues/RevenuesTab'),
            props: true,
            meta: {
                moduleId: 15,
                mainMenu: 'revenues',
                miniSideBar: false,
                title: i18n.t('revenues')
            }
        },
        {
            path: 'order/:id?',
            name: 'order',
            props: true,
            component: load('micro_edition/revenues/Order'),
            meta: {
                moduleId: 15,
                mainMenu: 'revenues',
                miniSideBar: false,
                title: i18n.t('revenues')
            }
        },
        {
            path: 'order_view/:id?',
            name: 'orderView',
            props: true,
            component: load('micro_edition/revenues/OrderView'),
            meta: {
                moduleId: 15,
                mainMenu: 'revenues',
                miniSideBar: false,
                title: i18n.t('revenues')
            }
        },
        {
            path: 'invoice_micro/:id?',
            name: 'invoiceMicro',
            props: true,
            component: load('micro_edition/revenues/InvoiceMircro'),
            meta: {
                moduleId: 15,
                mainMenu: 'revenues',
                miniSideBar: false,
                title: i18n.t('revenues')
            }
        },
        {
            path: 'purchases',
            name: 'purchases',
            component: load('micro_edition/purchases/PurchaseTab'),
            props: true,
            meta: {
                moduleId: 15,
                mainMenu: 'purchases',
                miniSideBar: false,
                title: i18n.t('purchases')
            }
        },
        {
            path: 'micro_purchase',
            name: 'MicroPurchase',
            component: load('micro_edition/purchases/CreditPurchase'),
            props: true,
            meta: {
                moduleId: 15,
                mainMenu: 'purchases',
                miniSideBar: false,
                title: i18n.t('purchases')
            }
        },
        {
            path: 'expensing',
            name: 'expensing',
            component: load('micro_edition/expnese/ExpenseTab'),
            props: true,
            meta: {
                moduleId: 15,
                mainMenu: 'expensing',
                miniSideBar: false,
                title: i18n.t('expensing')
            }
        },
        {
            path: 'micro_expense',
            name: 'MircroExpense',
            component: load('micro_edition/expnese/ExpenseMicro'),
            props: true,
            meta: {
                moduleId: 15,
                mainMenu: 'expensing',
                miniSideBar: false,
                title: i18n.t('expensing')
            }
        },
        {
            path: 'micro_expense_view/:id?',
            name: 'mircroExpenseView',
            component: load('micro_edition/expnese/ExpensesViewMicro'),
            props: true,
            meta: {
                moduleId: 15,
                mainMenu: 'expensing',
                miniSideBar: false,
                title: i18n.t('expensing')
            }
        },
        {
            path: 'reporting',
            name: 'reporting',
            component: load('micro_edition/reports/ReportTab'),
            props: true,
            meta: {
                moduleId: 15,
                mainMenu: 'reporting',
                miniSideBar: false,
                title: i18n.t('reporting')
            }
        },
        {
            path: 'cash_banking',
            name: 'cashBanking',
            component: load('micro_edition/cash_banking/CashBankingTab'),
            props: true,
            meta: {
                moduleId: 15,
                mainMenu: 'cash_banking',
                miniSideBar: false,
                title: i18n.t('cash_banking')
            }
        },
        // only for npo and public sectors
        {
            path: 'reports',
            name: 'reports',
            component: load('report_npo_ps/ReportForNpoAndPublicSector'),
            props: true,
            meta: {
                moduleId: 16,
                mainMenu: 'reports',
                title: i18n.t('reports')
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
