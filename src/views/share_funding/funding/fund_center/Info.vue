<template>
    <v-row>
        <v-col sm="12" cols="12">
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                    <tr>
                        <td class="text-uppercase">{{ $t('name') }}</td>
                        <td class="text-left text-bold">{{ name }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('type') }}</td>
                        <td class="text-left text-bold">{{ type }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('group') }}</td>
                        <td class="text-left text-bold">{{ group }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('sub_of') }}</td>
                        <td class="text-left text-bold">{{ subOf }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('banhji_crn') }}</td>
                        <td class="text-left text-bold">{{ crn }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
        <v-col sm="12" cols="12" class="pt-0">
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                    <tr>
                        <td class="third white--text text-uppercase mt-5">{{ $t('current_balance') }}</td>
                        <td class="third white--text text-left text-bold mt-5">{{ balance }}</td>
                    </tr>
                    <tr>
                        <td class="third white--text text-uppercase">{{ $t('credit_deposit') }}</td>
                        <td class="third white--text text-left text-bold"></td>
                    </tr>
                    <tr>
                        <td class="secondary white--text text-uppercase mt-5">{{ $t('open_invoices') }}</td>
                        <td class="secondary white--text text-left text-bold mt-5"></td>
                    </tr>
                    <tr>
                        <td class="secondary white--text text-uppercase">{{ $t('overdue_invoices') }}</td>
                        <td class="secondary white--text text-left text-bold"></td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
        <v-col sm="12" cols="12" class="py-0">
            <v-row>
                <v-col sm="12" cols="12" class="py-0">
                    <router-link
                        :to="{path: routerTo, query: { type: 'edit'} }">
                        <v-btn width="200" color="primary" :disabled="btnEnabled"
                               class=" white--text float-right text-capitalize">
                            {{ $t('edit_customer_info') }}
                        </v-btn>
                    </router-link>

                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
export default {
    name: "CustomerInfo",
    props: {customer: {}},
    mounted() {
    },
    computed: {
        name() {
            if (this.customer) {
                if (this.customer.hasOwnProperty('id')) {
                    if (this.customer.id !== undefined || this.customer.id !== '') {
                        this.loadCustomerBalance(this.customer.id)
                    }
                }
                if (this.customer.hasOwnProperty('name')) {
                    return this.customer.name
                }
            }
            return ''
        },
        crn() {
            if (this.customer) {
                if (this.customer.hasOwnProperty('crn')) {
                    return this.customer.crn.includes('crn-') ? this.customer.crn.replace('crn-', '') : this.customer.crn
                }
            }
            return ''
        },
        type() {
            if (this.customer) {
                if (this.customer.hasOwnProperty('customerType')) {
                    if (this.customer.customerType.hasOwnProperty('id')) {
                        return this.customer.customerType.name
                    }
                }
            }
            return ''
        },
        subOf() {
            if (this.customer) {
                if (this.customer.hasOwnProperty('subOfCustomer')) {
                    if (this.customer.subOfCustomer.hasOwnProperty('id')) {
                        return this.customer.subOfCustomer.name
                    }
                }
            }
            return ''
        },
        group() {
            if (this.customer) {
                if (this.customer.hasOwnProperty('paymentBilling')) {
                    if (this.customer.paymentBilling.hasOwnProperty('customerGroup')) {
                        return this.customer.paymentBilling.customerGroup.name
                    }
                }
            }
            return ''
        },
        btnEnabled() {
            return !this.customer.id;
        },
        routerTo() {
            if (this.customer) {
                if (this.customer.type === 'Individual') {
                    return 'individual_customer' + `/${this.customer ? this.customer.id : ''}`
                } else if (this.customer.type === 'Company') {
                    return 'company_customer' + `/${this.customer ? this.customer.id : ''}`
                }
            }

            return ''
        }
    },
    data: () => ({
        balance: 0
    }),
    watch: {},
    methods: {
        async loadCustomerBalance(id) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    if (id) {
                        const strFilter = id + '?type=bal'
                        billingHandler.balance(strFilter).then(res => {
                            if (res.data.statusCode === 200) {
                                const data = res.data.data
                                if (data.length > 0) {
                                    this.balance = data[0].balanceFormat
                                }
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }

                }, 300)
            })
        }
    }
}
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.secondary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: #4d4848 !important;
}

.theme--light.v-data-table {
    background-color: transparent !important;
    border-top: thin solid #ddd;
    border-bottom: thin solid #ddd;
    border-radius: 0 !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom: thin solid #ddd;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
}

.v-application .secondary,
.v-application .third {
    border-color: #fff !important;
}
</style>