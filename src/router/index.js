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

const productTitle = (type) => {
    if (type == 'npo') {
        return 'receipts_revenue'
    }
    return 'receivables_revenue'
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
                moduleId: 1,
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
            path: 'customers',
            name: 'Customers',
            component: () => import('../views/customers/Customers'),
            meta: {
                moduleId: 2,
                mainMenu: productTitle(dataStore.productType),
                title: i18n.t('receivables_revenue')
            }
        },
        {
            path: 'fund_receipt',
            name: 'Fund Receipt',
            props: true,
            component: load('share_funding/FundReceipt'),
            meta: {
                moduleId: 2,
                mainMenu: productTitle(),
                miniSideBar: true,
                title: 'Budget & Forecasting',
            }
        },
        {
            path: 'lead/:id?',
            name: 'Lead',
            component: () => import('../views/customers/sales/Lead'),
            props: true,
            meta: {
                moduleId: 2,
                code: 1.1,
                mainMenu: 'receivables_revenue',
                miniSideBar: true,
                title: i18n.t('receivables_revenue')
            }
        },
        {
            path: 'invoice/:id?',
            name: 'Invoice',
            component: () => import('../views/customers/Invoice'),
            props: true,
            meta: {
                code: 1.5,
                moduleId: 2,
                mainMenu: 'receivables_revenue',
                miniSideBar: true,
                title: i18n.t('receivables_revenue')
            }
        },
        {
            path: 'invoice_view/:id?',
            name: 'Invoice View',
            component: () => import('../views/customers/InvoiceView'),
            props: true,
            meta: {
                code: 1.5,
                moduleId: 2,
                mainMenu: 'receivables_revenue',
                miniSideBar: true,
                title: i18n.t('receivables_revenue')
            }
        },
        {
            path: 'sale_quote/:id?',
            name: 'Sale Quote',
            component: () => import('../views/customers/SaleQuote'),
            props: true,
            meta: {
                code: 1.3,
                moduleId: 2,
                mainMenu: 'receivables_revenue',
                miniSideBar: true,
                title: i18n.t('receivables_revenue')
            }
        },
        {
            path: 'sale_quote_view/:id?',
            name: 'Sale Quote View',
            component: () => import('../views/customers/SaleQuoteView'),
            props: true,
            meta: {
                code: 1.3,
                moduleId: 2,
                mainMenu: 'receivables_revenue',
                miniSideBar: true,
                title: i18n.t('receivables_revenue')
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
            path: 'delayed_invoice/:id?',
            name: 'Delayed Invoice',
            component: () => import('../views/customers/DelayedInvoice'),
            props: true,
            meta: {
                moduleId: 2,
                mainMenu: 'receivables_revenue',
                miniSideBar: true,
                title: i18n.t('receivables_revenue')
            }
        },
        {
            path: 'delayed_invoice_view/:id?',
            name: 'Delayed Invoice View',
            component: () => import('../views/customers/DelayedInvoiceView'),
            props: true,
            meta: {
                moduleId: 2,
                mainMenu: 'receivables_revenue',
                miniSideBar: true,
                title: i18n.t('receivables_revenue')
            }
        },
        {
            path: 'delayed_credit',
            name: 'Delayed Credit',
            component: () => import('../views/customers/DelayedCredit'),
            meta: {
                moduleId: 2,
                mainMenu: 'receivables_revenue',
                miniSideBar: true,
                title: i18n.t('receivables_revenue')
            }
        },
        {
            path: 'statement',
            name: 'statement',
            component: () => import('../views/customers/Statement'),
            meta: {
                code: 1.9,
                moduleId: 2,
                mainMenu: 'receivables_revenue',
                miniSideBar: false,
                title: i18n.t('receivables_revenue')
            }
        },
        {
            path: 'delayed_credit_view',
            name: 'Delayed Credit View',
            component: () => import('../views/customers/DelayedCreditView'),
            meta: {
                moduleId: 2,
                mainMenu: 'receivables_revenue',
                miniSideBar: true,
                title: i18n.t('receivables_revenue')
            }
        },
        {
            path: 'sale_return/:id?',
            name: 'Sale Return',
            component: () => import('../views/customers/SaleReturn'),
            props: true,
            meta: {
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
            path: 'cash_receipt/:id?',
            name: 'Cash Receipt',
            component: () => import('../views/customers/CashReceipt'),
            props: true,
            meta: {
                code: 1.7,
                moduleId: 2,
                mainMenu: 'receivables_revenue',
                miniSideBar: true,
                title: i18n.t('receivables_revenue')
            }
        },
        {
            path: 'cash_receipt_view/:id?',
            name: 'Cash Receipt View',
            props: true,
            component: () => import('../views/customers/CashReceiptView'),
            meta: {
                code: 1.7,
                moduleId: 2,
                mainMenu: 'receivables_revenue',
                miniSideBar: true,
                title: i18n.t('receivables_revenue')
            }
        },
        {
            path: 'cash_refund',
            name: 'Cash Refund',
            component: () => import('../views/customers/CashRefund'),
            meta: {
                moduleId: 2,
                mainMenu: 'receivables_revenue',
                miniSideBar: true,
                title: i18n.t('receivables_revenue')
            }
        },
        {
            path: 'cash_refund_view',
            name: 'Cash Refund View',
            component: () => import('../views/customers/CashRefundView'),
            meta: {
                moduleId: 2,
                mainMenu: 'receivables_revenue',
                miniSideBar: true
            }
        },
        {
            path: 'company_customer/:id?',
            name: 'Company Customer',
            component: () => import('../views/customers/CompanyCustomer'),
            props: true,
            meta: {
                code: 1.11,
                moduleId: 2,
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
                code: 1.10,
                moduleId: 2,
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
            path: 'recurring_invoice',
            name: 'Recurring Invoice',
            component: () => import('../views/customers/RecurringInvoice'),
            meta: {
                moduleId: 2,
                mainMenu: 'receivables_revenue',
                miniSideBar: true,
                title: i18n.t('receivables_revenue')
            }
        },
        {
            path: 'vendors',
            name: 'Vendors',
            component: load('suppliers/Suppliers'),
            meta: {
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                title: 'Payables'
            }
        },
        {
            path: 'credit_purchase/:id?',
            name: 'Credit Purchase',
            component: load('suppliers/CreditPurchases'),
            props: true,
            meta: {
                code: 2.3,
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'credit_purchase_view/:id?',
            name: 'Credit Purchase View',
            props: true,
            component: load('suppliers/CreditPurchaseViews'),
            meta: {
                code: 2.3,
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'expenses/:id?',
            name: 'Expenses',
            component: load('suppliers/Expenses'),
            props: true,
            meta: {
                code: 2.4,
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'expense_summary',
            name: 'Expense Summary',
            component: load('suppliers/ExpensesSummary'),
            props: true,
            meta: {
                code: 2.4,
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'expense_verify',
            name: 'Expense Verify',
            component: load('suppliers/ExpenseVerify'),
            props: true,
            meta: {
                code: 2.4,
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'expenses/view/:id',
            name: 'Expenses View',
            component: load('suppliers/ExpensesView'),
            props: true,
            meta: {
                code: 2.4,
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'purchase_order/:id?',
            name: 'Purchase Order',
            props: true,
            component: load('suppliers/PurchaseOrder'),
            meta: {
                code: 2.1,
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'purchase_order_view/:id?',
            name: 'Purchase Order View',
            component: load('suppliers/PurchaseOrderView'),
            props: true,
            meta: {
                code: 2.1,
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'vendor_quote/:id?',
            name: 'VendorQuote',
            props: true,
            component: load('suppliers/VendorQuote'),
            meta: {
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'purchase_deposit/:id?',
            name: 'Purchase Deposit',
            props: true,
            component: load('suppliers/PurchaseDeposits'),
            meta: {
                code: 2.2,
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'purchase_deposit_view/:id?',
            name: 'Purchase Deposit View',
            component: load('suppliers/PurchaseDepositView'),
            props: true,
            meta: {
                code: 2.2,
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'cash_payment/:id?',
            name: 'Cash Payment',
            component: load('suppliers/CashPayments'),
            props: true,
            meta: {
                code: 2.5,
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: false,
                title: 'Payables'
            }
        },
        {
            path: 'cash_payment_view/:id?',
            name: 'Cash Payment View',
            component: load('suppliers/CashPaymentView'),
            props: true,
            meta: {
                code: 2.5,
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'request_payment/:id?',
            name: 'RequestPayment',
            component: load('suppliers/RequestPayment'),
            props: true,
            meta: {
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: false,
                title: 'Payables'
            }
        },
        {
            path: 'purchase_return/:id?',
            name: 'Purchase Return',
            props: true,
            component: load('suppliers/PurchaseReturns'),
            meta: {
                code: 2.6,
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'purchase_return_view/:id?',
            name: 'Purchase Return View',
            props: true,
            component: load('suppliers/PurchaseReturnViews'),
            meta: {
                code: 2.6,
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'payment_refund',
            name: 'Payment Refund',
            component: load('suppliers/PaymentRefund'),
            meta: {
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'payment_refund_view',
            name: 'Payment Refund View',
            component: load('suppliers/PurchaseRefundView'),
            meta: {
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'recurring_purchase',
            name: 'Recurring Purchase',
            component: load('suppliers/RecurringPurchase'),
            meta: {
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'individual_supplier/:id?',
            name: 'Individual Supplier',
            component: load('suppliers/IndividualSupplier'),
            props: true,
            meta: {
                code: 2.7,
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                title: 'Payables'
                // miniSideBar: true
            }
        },
        {
            path: 'company_supplier/:id?',
            name: 'Company Supplier',
            component: load('suppliers/CompanySupplier'),
            props: true,
            meta: {
                code: 2.8,
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                title: 'Payables'
                // miniSideBar: true
            }
        },
        {
            path: 'cash_credit_purchase',
            name: 'Cash Credit Purchase',
            component: load('suppliers/CashCreditPurchase'),
            meta: {
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'cash_credit_purchase_view',
            name: 'Cash Credit Purchase View',
            component: load('suppliers/CashCreditPurchaseView'),
            meta: {
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables'
            }
        },
        {
            path: 'advance_request',
            name: 'Advance Request',
            component: load('suppliers/AdvanceRequest'),
            props: true,
            meta: {
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                title: 'Payables',
            }
        },
        {
            path: 'advance_request/view/:id',
            name: 'Advance Request View',
            component: load('suppliers/views/AdvanceRequestView'),
            props: true,
            meta: {
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                title: 'Payables',
            }
        },
        {
            path: 'reimbursement',
            name: 'Reimbursement',
            props: true,
            component: load('suppliers/Reimbursement'),
            meta: {
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                title: 'Payables',
            }
        },
        {
            path: 'reimbursement/view/:id',
            name: 'Reimbursement View',
            props: true,
            component: load('suppliers/views/ReimbursementView'),
            meta: {
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                title: 'Payables',
            }
        },
        {
            path: 'advance_settlement',
            name: 'Advance Settlement',
            props: true,
            component: load('suppliers/AdvanceSettlement'),
            meta: {
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                title: 'Payables',
            }
        },
        {
            path: 'advance_settlement/view/:id',
            name: 'Advance Settlement View',
            props: true,
            component: load('suppliers/views/AdvanceSettlementView'),
            meta: {
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                title: 'Payables',
            }
        },
        {
            path: 'cash_advance',
            name: 'Cash Advance',
            component: load('suppliers/CashAdvance'),
            props: true,
            meta: {
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                miniSideBar: true,
                title: 'Payables',
            }
        },
        {
            path: 'cash_advance/view/:id',
            name: 'Cash Advance View',
            component: load('suppliers/views/CashAdvanceView'),
            props: true,
            meta: {
                moduleId: 3,
                mainMenu: 'suppliers_purchases',
                title: 'Payables',
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
            path: 'services_intangible/:id?',
            name: 'Services Intangible',
            component: load('services_intangible/ServicesIntangible'),
            props: true,
            meta: {
                moduleId: 6,
                mainMenu: 'services_project_intangible',
                title: 'Services & Project'
            }
        },
        {
            path: 'services_project/:id?',
            name: 'Services Project',
            props: true,
            component: load('services_projects/projects/Project'),
            meta: {
                mainMenu: 'services_projects_non',
                type: 'project',
                title: 'Services & Project'
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
            path: 'payroll',
            name: 'Payroll',
            component: load('payroll/Payroll'),
            meta: {
                moduleId: 4,
                mainMenu: 'employee_payroll',
                title: 'Employee Payroll',
            }
        },
        {
            path: 'payrollrun',
            name: 'payrollrun',
            component: load('payroll/pay_roll/RunPayrollOne'),
            meta: {
                moduleId: 4,
                mainMenu: 'employee_payroll',
                title: 'Employee Payroll',
            }
        },
        {
            path: 'run_payroll/:id?',
            name: 'Run Papayroll',
            component: load('payroll/PayrollRun'),
            meta: {
                moduleId: 4,
                mainMenu: 'employee_payroll',
                title: 'Employee Payroll',
            }
        },
        {
            path: 'payroll_cash_payment/:id?',
            name: 'Payroll Cash Payment',
            component: load('payroll/payment/cash_payment/CashPayment'),
            meta: {
                moduleId: 4,
                mainMenu: 'employee_payroll',
                title: 'Employee Payroll',
            }
        },
        {
            path: 'bank_payment/:id?',
            name: 'Bank  Payment',
            component: load('payroll/payment/BankPayment'),
            meta: {
                moduleId: 4,
                mainMenu: 'employee_payroll',
                title: 'Employee Payroll',
            }
        },
        {
            path: 'employment_history/:id?/:record_id?',
            name: 'Employment History',
            component: load('payroll/employee/EmploymentHistory'),
            meta: {
                moduleId: 4,
                mainMenu: 'employee_payroll',
                miniSideBar: false,
                title: 'Employee Payroll',
            }
        },
        {
            path: 'timesheet_import/:id?',
            name: 'Timesheet Import',
            component: load('payroll/employee/TimesheetImportRecord'),
            meta: {
                moduleId: 4,
                mainMenu: 'employee_payroll',
                miniSideBar: false,
                title: 'Employee Payroll',
            }
        },
        {
            path: 'timesheet_add_list/:id?',
            name: 'Timesheet Add',
            component: load('payroll/employee/TimesheetAddListRecord'),
            meta: {
                moduleId: 4,
                mainMenu: 'employee_payroll',
                miniSideBar: false,
                title: 'Employee Payroll',
            }
        },
        {
            path: 'timesheet_add_list/:id?/:timesheet_id?',
            name: 'Timesheet',
            component: load('payroll/employee/TimesheetAddListRecord'),
            meta: {
                moduleId: 4,
                mainMenu: 'employee_payroll',
                miniSideBar: false,
                title: 'Employee Payroll',
            }
        },
        {
            path: 'employee/:id?',
            name: 'Employee',
            component: load('payroll/employee/Employee'),
            props: true,
            meta: {
                moduleId: 4,
                mainMenu: 'employee_payroll',
                miniSideBar: false,
                title: 'Employee Payroll',
            }
        },
        {
            path: 'accounting',
            name: 'Accounting',
            component: load('accounting/Accounting'),
            meta: {
                moduleId: 8,
                mainMenu: 'accounting_financial',
                title: 'Accounting',
            }
        },
        {
            path: 'account',
            name: 'Account',
            component: load('accounting/Account'),
            props: true,
            meta: {
                moduleId: 8,
                mainMenu: 'accounting',
                title: 'Accounting',
            }
        },
        {
            path: 's_account',
            name: 'SAccount',
            component: load('accounting/SAccount'),
            props: true,
            meta: {
                moduleId: 8,
                mainMenu: 'accounting',
                title: 'Accounting',
            }
        },
        {
            path: 'task',
            name: 'task',
            component: load('accounting/task/Task'),
            props: true,
            meta: {
                moduleId: 8,
                mainMenu: 'accounting',
                miniSideBar: false,
                title: 'Accounting',
            }
        },
        {
            path: 'reconciliation',
            name: 'reconciliation',
            component: load('accounting/closing/Reconciliation'),
            props: true,
            meta: {
                moduleId: 8,
                mainMenu: 'accounting',
                miniSideBar: false,
                title: 'Accounting',
            }
        },

        {
            path: 'invoice_link/:id?',
            name: 'Invoice Link',
            component: load('accounting/InvoiceLink'),
            props: true,
            meta: {
                moduleId: 8,
                mainMenu: 'accounting',
                title: 'Accounting',
            }
        },
        {
            path: 'account_view',
            name: 'Account View',
            component: load('accounting/AccountView'),
            meta: {
                moduleId: 8,
                mainMenu: 'accounting',
                title: 'Accounting',
            }
        },
        {
            path: 'period_end_closing_guide',
            name: 'Period End Closing Guide',
            component: load('accounting/period_end_closing_guide/PeriodEndClosingGuide'),
            meta: {
                moduleId: 8,
                //mainMenu: 'accounting'
                logo: 'banhji_accouning.png',
                title: 'Accounting',
            }
        },
        {
            path: 'journal',
            name: 'Journal',
            component: load('accounting/Journal'),
            props: true,
            meta: {
                moduleId: 8,
                mainMenu: 'accounting',
                miniSideBar: true,
                title: 'Accounting',
            }
        },
        {
            path: 'journal/view/:id',
            name: 'Journal View',
            component: load('accounting/Journal_View'),
            props: true,
            meta: {
                moduleId: 8,
                mainMenu: 'accounting',
                title: 'Accounting',
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
            path: 'subscriptions',
            name: 'Subscriptions',
            component: load('subscriptions/Subscriptions'),
            meta: {
                mainMenu: 'subscriptions',
                title: 'Subscriptions - BanhJi Accounting',
            }
        },
        {
            path: 'banhji_post',
            name: 'banhji_post',
            component: load('subscriptions/all_modules_app/BanhjiPos'),
            meta: {
                mainMenu: 'subscribed',
                title: 'Subscribed - BanhJi Accounting',
            }
        },
        {
            path: 'banking',
            name: 'Banking',
            component: load('banking/Banking'),
            meta: {
                moduleId: 9,
                mainMenu: 'banking_payment',
                title: 'Banking & Payments',
                //logo: 'connect.png'
            }
        },
        {
            path: 'connect_bill_payment_account',
            name: 'Connect Bill Payment Account',
            props: true,
            component: load('banking/payments/invoice_payments/ConnectBillPaymentAccount'),
            meta: {
                moduleId: 9,
                mainMenu: 'banking_payment',
                title: 'Banking & Payments',
                //logo: 'connect.png'
            }
        },
        {
            path: 'connect_collection_account',
            name: 'Connect Collection Account',
            component: load('banking/collection/ConnectCollectionAccount'),
            meta: {
                moduleId: 9,
                mainMenu: 'banking_payment',
                //logo: 'connect.png'
                title: 'Banking & Payments',
            }
        },
        {
            path: 'connect_bill_payment',
            name: 'Connect Bill Payment',
            component: load('banking/payments/invoice_payments/Info'),
            meta: {
                moduleId: 9,
                mainMenu: 'banking',
                title: 'Banking & Payments',
            }
        },
        {
            path: 'connect_qr_payment',
            name: 'Connect QR Payment',
            component: load('banking/payments/merchant_payments/Info'),
            meta: {
                moduleId: 9,
                mainMenu: 'banking',
                title: 'Banking & Payments',
            }
        },
        {
            path: 'connect_card_payment',
            name: 'Connect Card Payment',
            component: load('banking/payments/online_payments/Info'),
            meta: {
                moduleId: 9,
                mainMenu: 'banking',
                title: 'Banking & Payments',
            }
        },
        {
            path: 'connect_bank_account',
            name: 'Connect Bank Account',
            component: load('banking/ConnectBankAccount'),
            meta: {
                moduleId: 9,
                // mainMenu: 'banking',
                logo: 'connect.png',
                title: 'Banking & Payments',
            }
        },
        {
            path: 'connect_payment_account',
            name: 'Connect Payment Account',
            component: load('banking/ConnectPaymentAccount'),
            meta: {
                moduleId: 9,
                // mainMenu: 'banking',
                logo: 'connect.png',
                title: 'Banking & Payments',
            }
        },
        {
            path: 'finances',
            name: 'Finances',
            component: load('finances/Finances'),
            meta: {
                moduleId: 11,
                mainMenu: 'debt_financing',
                title: 'Financing ',
            }
        },
        {
            path: 'loan_application',
            name: 'LoanApplication',
            component: load('finances/Loan_application/LoanApplication'),
            meta: {
                moduleId: 11,
                mainMenu: 'debt_financing',
                title: 'Financing ',
            }
        },
        {
            path: 'loan_center',
            name: 'Loan Center',
            component: load('finances/LoanCenter'),
            meta: {
                moduleId: 11,
                title: 'Financing ',
            }
        },
        {
            path: 'cash_account/:id?',
            name: 'Cash Account',
            component: load('budgeting/CashAccount'),
            meta: {
                moduleId: 7,
                mainMenu: 'accounting',
                title: 'Woking-Capital - BanhJi Accounting',
            }
        },
        {
            path: 'cash_account_view',
            name: 'Cash Account View',
            component: load('budgeting/views/CashAccountView'),
            meta: {
                moduleId: 7,
                mainMenu: 'accounting',
                title: 'Woking-Capital - BanhJi Accounting',
            }
        },
        {
            path: 'new_loan',
            name: 'New Loan',
            props: true,
            component: load('finances/NewLoan'),
            meta: {
                moduleId: 11,
                mainMenu: 'debt_financing',
                title: 'Finacing - BanhJi Accounting',
            }
        },
        {
            path: 'new_loan_view',
            name: 'New Loan View',
            props: true,
            component: load('finances/views/NewLoanView'),
            meta: {
                moduleId: 11,
                mainMenu: 'debt_financing',
                title: 'Financing ',
            }
        },
        {
            path: 'approved_loan',
            name: 'Approved Loan',
            props: true,
            component: load('finances/ApprovedLoan'),
            meta: {
                moduleId: 11,
                mainMenu: 'debt_financing',
                title: 'Financing ',
            }
        },
        {
            path: 'record_loan_receipt',
            name: 'Record Loan Receipt',
            props: true,
            component: load('finances/RecordLoanReceipt'),
            meta: {
                moduleId: 11,
                mainMenu: 'debt_financing',
                title: 'Financing ',
            }
        },
        {
            path: 'record_loan_receipt_view',
            name: 'Record Loan Receipt View',
            props: true,
            component: load('finances/views/RecordLoanReceiptView'),
            meta: {
                moduleId: 11,
                mainMenu: 'debt_financing',
                title: 'Financing ',
            }
        },
        {
            path: 'record_loan_periodic_payment',
            name: 'Record Loan Periodic Payment',
            props: true,
            component: load('finances/RecordLoanPeriodicPayment'),
            meta: {
                moduleId: 11,
                mainMenu: 'debt_financing',
                title: 'Financing ',
            }
        },
        {
            path: 'record_loan_periodic_payment_view',
            name: 'Record Loan Periodic Payment View',
            props: true,
            component: load('finances/views/RecordLoanPeriodicPaymentView'),
            meta: {
                moduleId: 11,
                mainMenu: 'debt_financing',
                title: 'Financing ',
            }
        },
        {
            path: 'close_loan',
            name: 'Close Loan',
            component: load('finances/CloseLoan'),
            meta: {
                moduleId: 11,
                mainMenu: 'debt_financing',
                title: 'Financing ',
            }
        },
        {
            path: 'close_loan_view',
            name: 'Close Loan View',
            component: load('finances/views/CloseLoanView'),
            meta: {
                moduleId: 11,
                mainMenu: 'debt_financing',
                title: 'Financing ',
            }
        },
        // {
        //     path: 'journal_reports',
        //     name: 'Journal Reports',
        //     component: load('accounting/JournalReports'),
        //     meta: {
        //         mainMenu: 'accounting',
        //         title: 'Accounting',
        //     }
        // },
        {
            path: 'general_ledger',
            name: 'General Ledger',
            props: true,
            component: load('accounting/reports/peroid_end/GeneralLedger'),
            meta: {
                moduleId: 8,
                mainMenu: 'accounting',
                title: 'Accounting',
            }
        },
        // {
        //     path: 'trial_balance',
        //     name: 'Trial Balance',
        //     component: load('accounting/TrialBalance'),
        //     meta: {
        //         mainMenu: 'accounting',
        //         title: 'Accounting',
        //     }
        // },
        // {
        //     path: 'account_type_balance',
        //     name: 'AccountTypeBlance',
        //     component: load('accounting/AccountTypeBalance'),
        //     meta: {
        //         mainMenu: 'accounting',
        //         title: 'Accounting',
        //     }
        // },
        // {
        //     path: 'account_group_balances',
        //     name: 'AccountGroupBalances',
        //     component: load('accounting/AccountGroupBalance'),
        //     meta: {
        //         mainMenu: 'accounting',
        //         title: 'Accounting',
        //     }
        // },
        // {
        //     path: 'statement_of_profit_or_loss',
        //     name: 'Statement of Profit or Loss',
        //     component: load('accounting/StatementOfProfitOrLoss'),
        //     meta: {
        //         mainMenu: 'accounting',
        //         title: 'Accounting',
        //     }
        // },
        // {
        //     path: 'statement_of_profit_or_loss_currency',
        //     name: 'Statement of Profit or Loss - Reporting Currency',
        //     component: load('accounting/StatementOfProfitOrLossExchangeCurrency'),
        //     meta: {
        //         mainMenu: 'accounting',
        //         title: 'Accounting',
        //     }
        // },
        // {
        //     path: 'statement_of_profit_or_loss_by_segment',
        //     name: 'Statement of Profit or Loss by Segment',
        //     component: load('accounting/StatementOfProfitOrLossBySegment'),
        //     meta: {
        //         mainMenu: 'accounting',
        //         title: 'Accounting',
        //     }
        // },
        // {
        //     path: 'statement_of_profit_or_loss_by_segments',
        //     name: 'Statement of Profit or Loss by Segments',
        //     component: load('accounting/StatementOfProfitOrLossBySegments'),
        //     meta: {
        //         mainMenu: 'accounting',
        //         title: 'Accounting',
        //     }
        // },
        // {
        //     path: 'statement_of_profit_or_loss_by_project',
        //     name: 'Statement of Profit or Loss by Project',
        //     component: load('accounting/StatementOfProfitOrLossByProject'),
        //     meta: {
        //         mainMenu: 'accounting',
        //         title: 'Accounting',
        //     }
        // },
        // {
        //     path: 'statement_of_profit_or_loss_by_projects',
        //     name: 'Statement of Profit or Loss by Projects',
        //     component: load('accounting/StatementOfProfitOrLossByProjects'),
        //     meta: {
        //         mainMenu: 'accounting',
        //         title: 'Accounting',
        //     }
        // },
        // {
        //     path: 'statement_of_financial_position',
        //     name: 'Statement of Financial Position',
        //     component: load('accounting/StatementOfFinancialPosition'),
        //     meta: {
        //         mainMenu: 'accounting',
        //         title: 'Accounting',
        //     }
        // },
        // {
        //     path: 'statement_of_financial_position_currency',
        //     name: 'Statement of Financial Position - Reporting Currency',
        //     component: load('accounting/StatementOfFinancialPositionExchangeCurrency'),
        //     meta: {
        //         mainMenu: 'accounting',
        //         title: 'Accounting',
        //     }
        // },
        // {
        //     path: 'statement_of_financial_position_by_segment',
        //     name: 'Statement of Financial Position by Segment',
        //     component: load('accounting/StatementOfFinancialPositionBySegment'),
        //     meta: {
        //         mainMenu: 'accounting',
        //         title: 'Accounting',
        //     }
        // },
        // {
        //     path: 'statement_of_financial_position_by_segments',
        //     name: 'Statement of Financial Position by Segments',
        //     component: load('accounting/StatementOfFinancialPositionBySegments'),
        //     meta: {
        //         mainMenu: 'accounting',
        //         title: 'Accounting',
        //     }
        // },
        {
            path: 'statement_of_cash_flow',
            name: 'Statement of Cash Flow',
            component: load('accounting/StatementOfCashFlow'),
            meta: {
                moduleId: 8,
                mainMenu: 'accounting',
                title: 'Accounting',
            }
        },
        {
            path: 'chart_of_account',
            name: 'ChartOfAccount',
            component: load('accounting/ChartOfAccount'),
            meta: {
                moduleId: 8,
                mainMenu: 'accounting',
                title: 'Accounting',
            }
        },
        {
            path: 'search',
            name: 'Search',
            component: load('Search'),
            meta: {
                mainMenu: 'search',
                title: 'Search - BanhJi Accounting',
            }
        },
        {
            path: 'attachment',
            name: 'Attachment',
            component: load('Attachment'),
            meta: {
                mainMenu: 'attachment',
                title: 'Attachment - BanhJi Accounting',
            }
        },
        {
            path: 'exchange_rate',
            name: 'Exchange Rate',
            component: load('ExchangeRate'),
            meta: {
                mainMenu: 'exchange_rate',
                title: 'Exchange Rate - BanhJi Accounting',
            }
        },
        {
            path: 'functional_currency',
            name: 'Functional Currency',
            component: load('settings/currency/FunctionalCurrency'),
            meta: {
                moduleId: 13,
                mainMenu: 'settings',
                title: 'Settings - BanhJi Accounting',
            }
        },
        {
            path: 'audit_trial',
            name: 'Audit Trial',
            component: load('settings/manage_user/AuditTrial'),
            meta: {
                moduleId: 13,
                mainMenu: 'settings',
                title: 'Settings - BanhJi Accounting',
            }
        },
        {
            path: 'internal_user',
            name: 'Internal User',
            component: load('settings/manage_user/InternalUser'),
            meta: {
                moduleId: 13,
                mainMenu: 'settings',
                title: 'Settings - BanhJi Accounting',
            }
        },
        {
            path: 'external_user',
            name: 'External User',
            component: load('settings/manage_user/ExternalUser'),
            meta: {
                mainMenu: 'settings',
                title: 'Settings - BanhJi Accounting',
            }
        },
        {
            path: 'user_role',
            name: 'User Role',
            component: load('settings/manage_user/user_role/UserRole'),
            meta: {
                mainMenu: 'settings',
                title: 'Settings - BanhJi Accounting',
            }
        },
        {
            path: 'compliance',
            name: 'compliance',
            component: load('compliance/Compliance'),
            meta: {
                moduleId: 12,
                mainMenu: 'compliance',
                title: 'Compliance',
                type: 'compliance',
            }
        },
        {
            path: 'project/:id?',
            name: 'Project',
            component: load('customers/settings/AssignCustomerToProject'),
            props: true,
            meta: {
                moduleId: 2,
                mainMenu: 'receivables_revenue',
                miniSideBar: false,
                title: i18n.t('receivables_revenue')
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
