<template>
    <v-row>
        <v-col sm="12" cols="12">
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                        <tr>
                            <td style="width:55%;" class="text-uppercase">{{ $t('donor_name') }}</td>
                            <td class="text-left text-bold">{{ name }}</td>
                        </tr>
                        <tr>
                            <td style="width:55%;" class="text-uppercase">{{ $t('donor_type') }}</td>
                            <td class="text-left text-bold">{{ type }}</td>
                        </tr>
                        <!-- <tr>
                            <td style="width:55%;" class="text-uppercase">{{ $t('donor_group') }}</td>
                            <td class="text-left text-bold">{{ group }}</td>
                        </tr> -->
                        <!-- <tr>
                            <td style="width:55%;"  class="text-uppercase">{{ $t('customer_sub_of') }}</td>
                            <td class="text-left text-bold">{{ subOf }}</td>
                        </tr> -->
                        <tr>
                            <td style="width:55%;" class="text-uppercase">{{ $t('donor_banhji_crn') }}</td>
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
                        <td style="width:55%;" class="third white--text text-uppercase mt-5">{{
                                $t('current_balance')
                            }}
                        </td>
                        <td class="third white--text text-left text-bold mt-5">{{ balance }}</td>
                    </tr>
                    <tr>
                        <td style="width:55%;" class="third white--text text-uppercase">{{ $t('credit_deposit') }}</td>
                        <td class="third white--text text-left text-bold">{{ deposit }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
        <v-col sm="12" cols="12" class="py-0">
            <v-row>
                <v-col sm="12" cols="12" class="py-0">
                    <v-col sm="12" cols="6" class="py-0">
                        <router-link
                            :to="{path: routerTo, query: { type: 'edit'} }">
                            <v-btn width="100" color="primary" :disabled="btnEnabled"
                                   class=" white--text float-right text-capitalize">
                               {{ $t('edit_info') }}
                            </v-btn>
                        </router-link>
                    </v-col>
                    <v-col sm="12" cols="6" class="py-0" v-if="!enableDelete">
                        <v-btn width="100" color="primary"
                               :disabled="enableDelete"
                               @click="deleteCustomer"
                               class=" white--text float-right text-capitalize mx-1">
                            {{ $t('delete') }}
                        </v-btn>
                    </v-col>
                </v-col>

            </v-row>
        </v-col>
    </v-row>
</template>
<script>
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const customerHandler = require("@/scripts/customerHandler");
import {dataStore} from "@/observable/store";
export default {
    name: "CustomerInfo",
    props: {customer: {}},
    mounted() {
    },
    computed: {
        appType() {
            return dataStore.productType
        },
        name() {
            if (this.customer) {
                if (this.customer.hasOwnProperty('id')) {
                    if (this.customer.id !== undefined || this.customer.id !== '') {
                        this.loadCustomerBalance(this.customer.id)
                        this.loadCustomerDepositBalance(this.customer.id)
                        this.hasTxn(this.customer.id)
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
                return 'company_donor' + `/${this.customer ? this.customer.id : ''}`
            }
            return ''
        }
    },
    data: () => ({
        balance: 0,
        deposit: 0,
        enableDelete: true,
        reason: '',
    }),
    watch: {},
    methods: {
        async loadCustomerBalance(id) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    if (id) {
                        const strFilter = id + '?type=bal'
                        this.balance = 0
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

                }, 10)
            })
        },
        async loadCustomerDepositBalance(id) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    if (id) {
                        const strFilter = id + '?type=dep'
                        this.deposit = 0
                        billingHandler.balance(strFilter).then(res => {
                            if (res.data.statusCode === 200) {
                                const data = res.data.data
                                if (data.length > 0) {
                                    this.deposit = data[0].balanceFormat
                                }
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }

                }, 10)
            })
        },
        async hasTxn(id) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (id) {
                        const strFilter = "?id=" + id;
                        customerHandler
                            .hasTxn(strFilter)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    const response = res.data.data
                                    this.enableDelete = !response.delete || false
                                }
                            });
                    }
                }, 10);
            });
        },
        deleteCustomer() {
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                input: 'text',
                inputPlaceholder: 'Input some reason',
                showCancelButton: true,
                confirmButtonColor: '#4d4848',
                cancelButtonColor: '#ED1A3A',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value.length > 1) {
                    this.reason = result.value
                    const id = this.customer.id || ''
                    this.onDeleteCustomer(id, this.reason)
                    window.console.log(result.value, '---')
                }
            })
        },
        onDeleteCustomer(id, reason) {
            const customerType = this.customer.customerType || {}
            const customerGroup = this.customer.customerGroup || {}
            const cTypeId = customerType.id || ''
            const cGroupId = customerGroup.id || ''
            const strFilter = {
                id: id,
                status: 2,
                delete: 1,
                reason: reason,
                cTypeId: cTypeId,
                cGroupId: cGroupId
            }
            customerHandler.update(strFilter).then((res) => {
                if (res.data.statusCode === 201) {
                    this.hasTxn(id)
                }
            });
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