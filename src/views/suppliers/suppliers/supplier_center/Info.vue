<template>
    <v-row class="">
        <v-col sm="12" cols="12">
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                    <tr>
                        <td class="text-uppercase">{{ $t('supplier_name') }}</td>
                        <td class="text-left text-bold">{{ name }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('supplier_type') }}</td>
                        <td class="text-left text-bold">{{ type }}</td>
                    </tr>
                    <!-- <tr>
                        <td class="text-uppercase">{{ $t('group') }}</td>
                        <td class="text-left text-bold"></td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('sub_of') }}</td>
                        <td class="text-left text-bold">{{ subOf }}</td>
                    </tr> -->
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
        <v-col sm="12" cols="12" class="pt-0">
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                    <tr>
                        <td class="third white--text text-uppercase mt-5">{{ $t('balance') }}</td>
                        <td class="third white--text text-left text-bold mt-5"> {{ balance }}</td>
                    </tr>
                    <tr>
                        <td class="secondary white--text text-uppercase">{{ $t('deposit') }}</td>
                        <td class="secondary white--text text-left text-bold">{{ deposit }}</td>
                    </tr>
                    <!-- <tr>
                        <td class="secondary white--text text-uppercase mt-5">{{ $t('open_invoices') }}</td>
                        <td class="secondary white--text text-left text-bold mt-5"></td>
                    </tr>
                    <tr>
                        <td class="secondary white--text text-uppercase">{{ $t('overdue_invoices') }}</td>
                        <td class="secondary white--text text-left text-bold"></td>
                    </tr> -->
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
                            <v-btn width="200" color="primary"
                                   class=" white--text float-right text-capitalize"
                                   :disabled="btnEnabled">
                                {{ $t('edit_supplier_info') }}
                            </v-btn>
                        </router-link>
                    </v-col>
                    <v-col sm="12" cols="6" class="py-0" v-if="!enableDelete">
                        <v-btn width="200" color="primary"
                               :disabled="enableDelete"
                               @click="deleteSupplier"
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
import customerHandler from "@/scripts/customerHandler";
import supplierHandler from "@/scripts/supplierHandler";

const billingHandler = require("@/scripts/invoice/handler/billingHandler")
export default {
    name: "VendorCenterInfo",
    props: {supplier: {}},
    mounted() {
    },
    computed: {
        name() {
            if (this.supplier) {
                if (this.supplier.hasOwnProperty('id')) {
                    if (this.supplier.id !== undefined || this.supplier.id !== '') {
                        this.loadCustomerBalance(this.supplier.id)
                        this.loadCustomerDepositBalance(this.supplier.id)
                        this.hasTxn(this.supplier.id)
                    }
                }
                if (this.supplier.hasOwnProperty('name')) {
                    return this.supplier.name
                }
            }
            return ''
        },
        type() {
            if (this.supplier) {
                if (this.supplier.hasOwnProperty('supplierType')) {
                    if (this.supplier.supplierType.hasOwnProperty('id')) {
                        return this.supplier.supplierType.name
                    }
                }
            }
            return ''
        },
        subOf() {
            if (this.supplier) {
                if (this.supplier.hasOwnProperty('subOfSupplier')) {
                    if (this.supplier.subOfSupplier.hasOwnProperty('id')) {
                        return this.supplier.subOfSupplier.name
                    }
                }
            }
            return ''
        },
        btnEnabled() {
            return !this.supplier.id;
        },
        routerTo() {
            if (this.supplier) {
                if (this.supplier.type === 'Individual') {
                    return 'individual_supplier' + `/${this.supplier ? this.supplier.id : ''}`
                } else if (this.supplier.type === 'Company') {
                    return 'company_supplier' + `/${this.supplier ? this.supplier.id : ''}`
                }
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
        async loadCustomerDepositBalance(id) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.deposit = 0
                    if (id) {
                        const strFilter = id + '?type=dep'
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
        async loadCustomerBalance(id) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.balance = 0
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
        deleteSupplier() {
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
                    const id = this.supplier.id || ''
                    this.onDeleteSupplier(id, this.reason)
                    window.console.log(result.value, '---')
                }
            })
        },
        onDeleteSupplier(id, reason) {
            const supplierType = this.supplier.supplierType || {}
            // const customerGroup = this.supplier.supplierGroup || {}
            const TypeId = supplierType.id || ''
            // const cGroupId = customerGroup.id || ''
            const strFilter = {
                id: id,
                status: 2,
                delete: 1,
                reason: reason,
                typeId: TypeId,
                // cGroupId: cGroupId
            }
            supplierHandler.update(strFilter).then((res) => {
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

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: #898C8F !important;
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

.v-application .primary,
.v-application .third {
    border-color: #fff !important;
}
</style>