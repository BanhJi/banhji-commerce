<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-row>
                            <v-col class="bigSide py-0" sm="8" cols="12" style="transition: .3s ease-in;"
                                   :class="{'hide_big_bar_class':isHideBar}">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">{{ $t('purchase_deposit') }} #{{
                                                purchaseDeposit.referenceNo
                                            }}</h2>
                                        <v-icon v-if="isHideBar"
                                                onclick="window.history.go(-1); return false;"
                                                style="cursor: pointer; color: #333; font-size: 40px;"
                                                class="float-right"
                                        >close
                                        </v-icon>
                                        <span style="transition: .3s ease-in; z-index:10;"
                                              :class="{'iconArrow': !isHideBar,'iconArrowHide': isHideBar }">
                                            <v-icon size="22"
                                                    class="arr_icon"
                                                    @click="hideSmallSiteBar"
                                                    v-if="isHideBar"> mdi-chevron-left-circle
                                            </v-icon>
                                            <v-icon size="22"
                                                    class="arr_icon"
                                                    @click="hideSmallSiteBar"
                                                    v-if="!isHideBar"> mdi-chevron-right-circle
                                            </v-icon>
										</span>
                                    </v-card>
                                    <v-card outlined dense class="px-3 no_border mb-3" color="grayBg">
                                        <v-row>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t('supplier') }}</label>
                                                <h3 class="text-bold  py-1">{{ supplierName }}</h3>
                                            </v-col>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label mb-0">{{ $t('transaction_date') }}</label>
                                                <h3 class="text-bold py-1">{{ transactionDate }}</h3>
                                            </v-col>
                                            <v-col sm="6" cols="12" class="pr-1 pt-2">
                                                <v-row class="mr-2">
                                                    <v-col sm="6" cols="12" class="py-1">
                                                        <label class="label mb-0">{{ $t('currency') }}</label>
                                                        <h3 class="text-bold py-1">{{ currency }}</h3>
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="py-1">
                                                        <label class="label mb-0">{{ $t('deposit_account') }}</label>
                                                        <h3 class="text-bold py-1">{{ accountDeposit }}</h3>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row class="pt-3" style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <kendo-datasource ref="purchaseDepositLineDS"
                                                              :data="itemLines"/>
                                            <kendo-grid id="gridPurchaseDeposit" class="grid-function"
                                                        :data-source-ref="'purchaseDepositLineDS'"
                                                        :sortable="false"
                                                        :filterable="false"
                                                        :column-menu="true"
                                                        :editable="false"
                                                        :scrollable-virtual="true">
                                                <kendo-grid-column
                                                    :title="$t('no.')"
                                                    :width="55"
                                                    :template="rowNumberTmpl"
                                                    :column-menu="false"
                                                    :headerAttributes="{
                                                                        style: 'background-color: #EDF1F5;',
                                                                        class: 'text-products'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: products'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'paymentOption'"
                                                    :title="$t('payment_option')"
                                                    :width="250"
                                                    :template="methodTemplate"
                                                    :headerAttributes="{
                                                                        style: 'background-color: #EDF1F5'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'account'"
                                                    :title="$t('account')"
                                                    :width="200"
                                                    :template="accountTemplate"
                                                    :headerAttributes="{
                                                                        style: 'background-color: #EDF1F5'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :width="200"
                                                    :template="'<span>#=description#</span>'"
                                                    :headerAttributes="{
                                                                        style: 'background-color: #EDF1F5'
                                                                    }"/>

                                                <kendo-grid-column
                                                    :field="'refNo'"
                                                    :title="$t('payment_ref')"
                                                    :format="'{0:n}'"
                                                    :width="200"
                                                    :headerAttributes="{
                                                                            style: 'text-align: right; background-color: #EDF1F5'
                                                                        }"
                                                    :attributes="{
                                                                            style: 'text-align: right'
                                                                        }"/>
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :format="'{0:n}'"
                                                    :width="200"
                                                    :template="amountTemplate"
                                                    :headerAttributes="{
                                                                            style: 'text-align: right; background-color: #EDF1F5'
                                                                        }"
                                                    :attributes="{
                                                                            style: 'text-align: right'
                                                                        }"/>
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row>
                                                <v-col sm="6" cols="12" class="">
                                                    <v-row>
                                                        <v-col sm="6" cols="12" class="pt-0">
                                                            <label>{{ $t('message_on_deposit') }}</label>
                                                            <h4 class="text-bold py-2">
                                                                {{ purchaseDeposit.transactionNote }}</h4>
                                                        </v-col>
                                                        <v-col sm="6" cols="12" class="pt-0">
                                                            <label>{{ $t('message_on_journal') }}</label>
                                                            <h4 class="text-bold py-2">
                                                                {{ purchaseDeposit.journalNote }}</h4>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                                <v-col sm="6" cols="12" class="pt-3">
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <tbody>
                                                            <tr>
                                                                <td class="text-left text-uppercase">{{ $t('total') }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-left color_green text-bold">
                                                                    {{ amountFormat(purchaseDeposit.amount) }}
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </template>
                                                    </v-simple-table>
                                                </v-col>

                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-divider/>
                                    <v-card outlined dense class="no_border function_footer py-2">
                                        <p class="float-left py-2 mb-0  color_grey">{{
                                                $t('standard_purchase_deposit')
                                            }}</p>
                                        <v-btn @click="_print(3)" class="float-right save_option mx-1">
                                            {{ $t('print') }}
                                        </v-btn>
                                        <v-btn class="float-right btn_delete mx-1" @click="onDeleteDeposit">
                                            {{ $t('delete') }}
                                        </v-btn>
                                        <v-btn class="float-right btn_save_draft mx-1" @click="onEditDeposit('edit')">
                                            {{ $t('edit') }}
                                        </v-btn>
                                    </v-card>
                                    <v-divider/>
                                </v-form>
                            </v-col>
                            <v-col class="smallSide" sm="4" style="transition: .3s ease-in;"
                                   :class="{'hide_small_bar_class':isHideBar}">
                                <h3 style="color: #b3b5bc; font-size:20px;" v-if="!isHideBar"
                                    class="text-uppercase float-right mt-n3">Help
                                    <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right mt-n1"
                                    >close
                                    </v-icon>
                                </h3>

                                <div v-if="!isHideBar" class="small_sidebar mt-9 px-4 grayBg">
                                    <v-card class="pa-3 no-boxshadow"
                                            color="primary"
                                            style="min-height: 70px;">
                                        <h3 style="font-size: 18px" class="text-white text-uppercase mb-2">
                                            {{ $t('amount_deposit') }}</h3>
                                        <h3 class="text-bold float-right text-white" style="font-size: 22px">
                                            {{ amountFormat(purchaseDeposit.amount) }}</h3>
                                    </v-card>
                                    <v-row>
                                        <v-col sm="12" cols="12">
                                            <h4 class="my-2 text-uppercase">{{ $t('analysis') }}</h4>
                                            <v-row>
                                                <v-col sm="6" cols="6" class="py-1">
                                                    <label class="label">{{ $t('segment') }}</label>
                                                    <h4 class="text-bold py-1">{{ segment }}</h4>
                                                    <label class="label">{{ $t('ref_from') }}</label>
                                                    <div v-for="itm in purchaseDeposit.refFrom" v-bind:key="itm.id">
                                                        <h4 class="text-bold d-block py-2">
                                                            <router-link
                                                                :to="{ path: '/en/purchase_order_view/'+ itm.id}">
                                                                {{ itm.reference || '-' }}
                                                            </router-link>
                                                        </h4>
                                                    </div>
                                                </v-col>
                                                <v-col sm="6" cols="6" class="py-1">
                                                    <label class="label">{{ $t('location') }}</label>
                                                    <h4 class="text-bold py-1">{{ location }}</h4>
                                                    <label class="label">{{ $t('ref_to') }}</label>
                                                    <div v-for="itm in purchaseDeposit.refTo" v-bind:key="itm.id">
                                                        <h4 class="text-bold d-block py-2">
                                                            <router-link :to="{ path: '/en/sale_order_view/'+ itm.id}">
                                                                {{ itm.reference || '' }}
                                                            </router-link>
                                                        </h4>
                                                    </div>
                                                </v-col>

                                            </v-row>
                                            <v-row>

                                            </v-row>
                                            <p class="mb-2 mt-6 color_grey">{{ $t('transaction_history') }}</p>
                                            <v-simple-table>
                                                <template v-slot:default>
                                                    <tbody>
                                                    <tr v-for="item in invoiceHistory"
                                                        v-bind:key="item.id">
                                                        <td class="text-left px-0 font_12">{{
                                                                item.name
                                                            }}
                                                        </td>
                                                        <td class="text-center px-0 font_12">{{
                                                                formatDateTime(item.createdAt)
                                                            }} &nbsp; ({{ item.timeSince }})
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-col>
                                    </v-row>

                                </div>
                            </v-col>
                                </v-row>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"/>
                    </v-card>
                </v-col>
            </v-row>

        </v-container>
    </v-app>
</template>

<script>
import ItemLineModel from "@/scripts/purchase_deposit/model/ItemLine";
import PurchaseDepositModel from "@/scripts/purchase_deposit/model/PurchaseDeposit";
import kendo from "@progress/kendo-ui";

const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const itemLineModel = new ItemLineModel({})
const purchaseDepositModel = new PurchaseDepositModel({})

// from
const {getFormSetting} = require("@/scripts/settingsHandler.js")
import {print} from "@/form/Purchases.js";
import {i18n} from '@/i18n';

export default {
    name: "PurchaseDepositView",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        isEdit: false,
        purchaseDeposit: purchaseDepositModel,
        itemLine: itemLineModel,
        showLoading: false,
        templates: [
            {title: 'Draft'},
            {title: 'Open'},
            {title: 'Partially Closed'},
            {title: 'Closed'},
        ],
        col_expand: 9,
        col_hide: 3,
        valid: false,
        isHideBar: false,
        depositLine: [],
        itemLines: [],
        invoiceHistory: [],
        decimalFormat: 'n2',
        loggedUser: {
            id: 'cf3d10ab-bce6-47b3-8405-b448c23dad84',
            name: 'Mr. Inspector'
        },
        dateFormat: purchaseDepositModel.dateFormat,
        reason: ''

    }),
    methods: {
        formatDateTime(value) {
            return kendo.toString(new Date(value), this.dateFormat + ` hh:mm tt`)
        },
        onDeleteDeposit() {
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
                if (result.value) {
                    this.reason = result.value
                    this.onSaveDeposit()
                    // this.clear()
                    // this.$router.go(-1)
                }
            })
        },
        async onSaveDeposit() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const txnId = this.$route.params.id
                    if (txnId && this.reason !== '') {
                        const data = {
                            id: txnId,
                            loggedUser: this.loggedUser,
                            supplier: this.purchaseDeposit.supplier,
                            transactionDate: this.purchaseDeposit.transactionDate,
                            actionType: 'delete',
                            reason: this.reason,
                        }
                        billingHandler.createPurchaseDeposit(data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.$snotify.success('Successfully')
                                this.close()
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }

                }, 10);
            })
        },
        close() {
            window.history.go(-1)
        },
        onEditDeposit(type) {
            const id = this.$route.params.id
            this.$router.push({
                path: 'purchase_deposit/' + id,
                name: 'Purchase Deposit',
                params: {id: id},
                query: {type: type}
            })
        },
        async loadInvoiceHistory() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    billingHandler.history(this.$route.params.id).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.invoiceHistory = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 10)
            })
        },
        amountFormat(value) {
            return kendo.toString(parseFloat(value), `${this.decimalFormat}`)
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.purchaseDepositLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        async loadViewDeposit() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    if (this.$route.params.id) {
                        this.showLoading = true
                        const strFilter = '?id=' + this.$route.params.id
                        billingHandler.purchaseDepositList(strFilter).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.purchaseDeposit = res.data.data[0]
                                this.decimalFormat = this.purchaseDeposit.decimalFormat
                                this.itemLines = this.purchaseDeposit.itemLines
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }
                }, 10)
            })
        },
        cancel() {

        },
        hideSmallSiteBar() {
            this.isHideBar = !this.isHideBar;
        },
        accountTemplate(dataItem) {
            const acc = dataItem.account
            if (acc) {
                return `<span>${acc.name ? acc.name : ``}</span>`
            } else {
                return ``
            }
        },
        methodTemplate(dataItem) {
            const method = dataItem.paymentOption || {}
            if (method) {
                return `<span>${method.name ? method.name : ``}</span>`
            } else {
                return ``
            }
        },
        amountTemplate(dataItem) {
            const amt = dataItem.amount
            if (amt) {
                return kendo.toString(parseFloat(amt), `${this.decimalFormat}`)
            } else {
                return 0
            }
        },
        reload() {
            if (this.$route.params.id !== undefined) {
                this.loadViewDeposit()
                this.loadInvoiceHistory()
            }
        },
        _print(id) {
            let params = "?formType=Purchase Deposit"
            getFormSetting(params).then(res => {
                if (res.data.statusCode === 200) {
                    if (res.data.data.length > 0) {
                        window.console.log(res.data.data["0"].settings);
                        print(this.purchaseDeposit, id, res.data.data["0"].settings);
                    }else{
                        this.$snotify.error(i18n.t('please_save_form_in_setting'))
                    }   
                }
            });
        },
    },
    watch: {
        // id() {
        //     if (this.$route.params.id !== undefined) {
        //         this.loadViewDeposit()
        //         this.loadInvoiceHistory()
        //     }
        // },
        '$route': 'reload'
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        // this.loadObj()
    },
    computed: {
        accountDeposit() {
            if (this.purchaseDeposit) {
                if (this.purchaseDeposit.hasOwnProperty('purchaseDepositAcc')) {
                    if (this.purchaseDeposit.purchaseDepositAcc.hasOwnProperty('id')) {
                        return this.purchaseDeposit.purchaseDepositAcc.name
                    }
                }
            }
            return '-'
        },
        currency() {
            if (this.purchaseDeposit) {
                if (this.purchaseDeposit.hasOwnProperty('currency')) {
                    if (this.purchaseDeposit.currency.hasOwnProperty('id')) {
                        return this.purchaseDeposit.currency.code
                    }
                }
            }
            return ''
        },
        transactionDate() {
            if (this.purchaseDeposit) {
                if (this.purchaseDeposit.hasOwnProperty('transactionDate')) {
                    return kendo.toString(new Date(this.purchaseDeposit.transactionDate), this.dateFormat)
                }
            }
            return '-'
        },
        segment() {
            if (this.purchaseDeposit) {
                if (this.purchaseDeposit.hasOwnProperty('segment')) {
                    if (this.purchaseDeposit.segment.hasOwnProperty('id')) {
                        return this.purchaseDeposit.segment.name
                    }
                }
            }
            return '-'
        },
        location() {
            if (this.purchaseDeposit) {
                if (this.purchaseDeposit.hasOwnProperty('location')) {
                    if (this.purchaseDeposit.location.hasOwnProperty('id')) {
                        return this.purchaseDeposit.location.name
                    }
                }
            }
            return ''
        },
        supplierName() {
            if (this.purchaseDeposit) {
                if (this.purchaseDeposit.hasOwnProperty('supplier')) {
                    if (this.purchaseDeposit.supplier.hasOwnProperty('id')) {
                        return this.purchaseDeposit.supplier.name
                    }
                }
            }
            return '-'
        },
    },
    mounted: async function () {
        await this.loadViewDeposit()
        await this.loadInvoiceHistory()
    },
};
</script>

<style scoped>
.function_wrapper {
    box-shadow: none !important;
}

.v-application--is-ltr .v-text-field .v-input__append-inner {
    margin-top: 0 !important;
}

.v-input__slot {
    background-color: #fff !important;
}

.function_content .label {
    margin-bottom: 10px;
    display: inline-block;
}

.border_radius10 {
    border-radius: 10px !important;
    background-color: #F2F2F2;
}

.pa-3.v-card h4 {
    font-size: 18px;
    color: #333;
}

.pa-3.v-card p {
    font-size: 12px;
    color: #B5B5B5;
}

.custom_grid table th:last-child {
    text-align: right !important;
}


@media (min-width: 1264px) {
    .container {
        max-width: 1250px;
    }
}

@media (max-width: 576px) {
    .pt-6.col-sm-5.col-12 {
        padding-top: 0 !important;
    }

    .code_text {
        width: 100%;
    }

    .phone_no_pt {
        padding-top: 0 !important;
    }

    .select_template,
    .save_option {
        margin-bottom: 10px;
    }
}

.hide_small_bar_class {
    max-width: 0;
    transition: .5s ease-in;
    flex: 0 0 0;
}

.hide_big_bar_class {
    max-width: 100%;
    transition: .5s ease-in;
    flex: 0 0 100%;
}

.info_add {
    background-color: #ffffff;
}

.small_sidebar {
    height: 98%;
    position: relative;
    padding: 12px;
    background-color: #EDF1F5;
}

.iconArrow {
    right: -35px;
    position: absolute;
    bottom: -10px;
}

.iconArrowHide {
    position: absolute;
    right: -7px;
    bottom: -10px;
}

.color_grey {
    color: #808080;
}

.lb_bold {
    font-size: 12px;
}

.detial_smallside_p {
    position: absolute;
    bottom: 10px;
}

.card_background {
    background-color: #EDF1F5;
    min-height: 120px;
}

.deposite_input {
    width: 100px;
}

.exp_select {
    font-size: 12px !important;
}

.v-data-table__wrapper td {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    border-top: thin solid rgba(0, 0, 0, 0.12);
}


</style>