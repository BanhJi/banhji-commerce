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
                                        <h2 class="mb-0">{{ $t('sale_deposit') }} #{{ saleDeposit.referenceNo }}</h2>
                                        <v-icon v-if="isHideBar"
                                                onclick="window.history.go(-1); return false;"
                                                color="grey"
                                                style="cursor: pointer;font-size: 40px;"
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
                                                <label class="label  mb-0">{{ $t('customer') }}</label>
                                                <h3 class="text-bold  py-1">{{ customerName }}</h3>
                                            </v-col>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label mb-0">{{ $t('transaction_date') }}</label>
                                                <h3 class="text-bold py-1">{{ transactionDate }}</h3>
                                            </v-col>
                                            <v-col sm="6" cols="12" class="pr-1">
                                                <p class="mb-0 ml-n3 color_grey">{{ $t('additional_information') }}</p>
                                                <v-row class="info_add mr-2">
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
                                            <kendo-datasource ref="saleDepositLineDS"
                                                              :data="itemLines"/>
                                            <kendo-grid id="gridSaleDepositView" class="grid-function"
                                                        :data-source-ref="'saleDepositLineDS'"
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
                                                    :title="$t('paymentOption')"
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
                                                    :width="150"
                                                    :headerAttributes="{
                                                                            style: 'text-align: right; background-color: #EDF1F5'
                                                                        }"
                                                    :attributes="{
                                                                            style: 'text-align: right'
                                                                        }"/>
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :width="150"
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
                                                                {{ saleDeposit.transactionNote }}</h4>
                                                        </v-col>
                                                        <v-col sm="6" cols="12" class="pt-0">
                                                            <label>{{ $t('message_on_journal') }}</label>
                                                            <h4 class="text-bold py-2">
                                                                {{ saleDeposit.journalNote }}</h4>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col sm="12" cols="12" class="pt-0 px-6">
                                                            <v-row class="grayBg" style="width: 104%;">
                                                                <v-col sm="12" cols="12" class="">
                                                                    <v-card outlined color="white" class="pa-3">
                                                                        <v-row class="">
                                                                            <v-col sm="12" cols="12" class="py-0">
                                                                                <p class="mb-2">{{ $t('file_type') }}
                                                                                    [PDF, JPG, JPEG, TIFF,
                                                                                    PNG, GIF] - 5MB</p>
                                                                                <template>
                                                                                    <v-file-input
                                                                                        v-model="files"
                                                                                        @change="onFileChange"
                                                                                        accept="image/jpg, image/jpeg, application/pdf"
                                                                                        :placeholder="$t('attachments')"
                                                                                        single
                                                                                        prepend-icon="mdi-paperclip">
                                                                                        <template
                                                                                            v-slot:selection="{ text }">
                                                                                            <v-chip
                                                                                                small
                                                                                                label
                                                                                                color="primary"
                                                                                            >
                                                                                                {{ text }}
                                                                                            </v-chip>
                                                                                        </template>
                                                                                    </v-file-input>
                                                                                    <v-text-field
                                                                                        v-model="fileDesc"
                                                                                        outlined
                                                                                        :placeholder="$t('description')"
                                                                                        clearable/>
                                                                                </template>
                                                                                <v-btn color="primary"
                                                                                       class="text-capitalize white--text"
                                                                                       @click="uploadFile">
                                                                                    <v-icon size="15" class="mr-2">
                                                                                        fa-check
                                                                                    </v-icon>
                                                                                    {{ $t('upload') }}
                                                                                </v-btn>
                                                                                <template>
                                                                                    <LoadingMe
                                                                                        :isLoading="showLoadingAtch"
                                                                                        :fullPage="false"
                                                                                        type="loading"
                                                                                        :myLoading="true">
                                                                                    </LoadingMe>
                                                                                    <kendo-datasource ref="attachmentDS"
                                                                                                      :data="attachmentList"/>
                                                                                    <kendo-grid id="gridAttachment"
                                                                                                class="grid-function"
                                                                                                :data-source-ref="'attachmentDS'"
                                                                                                :editable="false"
                                                                                                :scrollable-virtual="true">
                                                                                        <kendo-grid-column
                                                                                            :field="''"
                                                                                            :title="$t('open')"
                                                                                            :width="70"
                                                                                            :template="fileUrl"
                                                                                            :attributes="{style: 'text-align: center'}"
                                                                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                                        <kendo-grid-column
                                                                                            :field="'fileName'"
                                                                                            :title="$t('file_name')"
                                                                                            :width="250"
                                                                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                                        <kendo-grid-column
                                                                                            :field="'description'"
                                                                                            :title="$t('description')"
                                                                                            :width="250"
                                                                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                                        <kendo-grid-column
                                                                                            :field="'fileType'"
                                                                                            :title="$t('file_type')"
                                                                                            :width="150"
                                                                                            :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                                                        <kendo-grid-column
                                                                                            :field="'size'"
                                                                                            :title="$t('size')"
                                                                                            :width="150"
                                                                                            :template="byteToMB"
                                                                                            :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                                                        <kendo-grid-column
                                                                                            :field="'createdAt'"
                                                                                            :title="$t('date')"
                                                                                            :width="120"
                                                                                            :template="'<span>#= kendo.toString(new Date(createdAt), dateFormat)#</span>'"
                                                                                            :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                                                    </kendo-grid>
                                                                                </template>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-card>
                                                                </v-col>
                                                            </v-row>
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
                                                                <td class="text-left primary--text text-bold">
                                                                    {{ amountFormat(saleDeposit.amount) }}
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
                                        <p class="float-left py-2 mb-0  color_grey">{{ $t('standard_sale_qoute') }}</p>
                                        <v-btn @click="_print(3)" class="float-right save_print mx-1">
                                            {{ $t('print') }}
                                        </v-btn>
                                        <v-btn class="float-right btn_delete mx-1" @click="onDeleteSaleDeposit">
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

                                <div v-if="!isHideBar" class="small_sidebar my_card mt-9 px-4 grayBg">
                                    <v-card class="pa-3 no-boxshadow"
                                            color="primary"
                                            style="min-height: 60px;">
                                        <h3 style="font-size: 13px" class="text-white text-uppercase mb-0">
                                            {{ $t('amount_deposit') }}</h3>
                                        <h3 class="text-bold float-right text-white" style="font-size: 22px">
                                            {{ amountFormat(saleDeposit.amount) }}</h3>
                                    </v-card>
                                    <v-row>
                                        <v-col sm="12" cols="12">
                                            <h4 class="my-2 text-uppercase">{{ $t('analysis') }}</h4>
                                            <v-row>
                                                <v-col sm="6" cols="6" class="py-1">
                                                    <label class="label">{{ $t('segment') }}</label>
                                                    <h4 class="text-bold py-1">{{ segment }}</h4>
                                                    <label class="label">{{ $t('ref_from') }}</label>
                                                    <div v-for="itm in saleDeposit.refFrom" v-bind:key="itm.id">
                                                        <h4 class="text-bold d-block py-2">
                                                            <router-link :to="{ path: '/en/sale_order_view/'+ itm.id}">
                                                                    {{ itm.reference || '' }}
                                                            </router-link>
                                                        </h4>
                                                    </div>
                                                </v-col>
                                                <v-col sm="6" cols="6" class="py-1">
                                                    <label class="label">{{ $t('location') }}</label>
                                                    <h4 class="text-bold py-1">{{ location }}</h4>
                                                    <label class="label">{{ $t('ref_to') }}</label>
                                                    <div v-for="itm in saleDeposit.refTo" v-bind:key="itm.id">
                                                        <h4 class="text-bold d-block py-2">{{
                                                                itm.reference || ''
                                                            }}</h4>
                                                    </div>
                                                </v-col>

                                            </v-row>
                                            <v-row>

                                            </v-row>
                                            <p class="mb-1 mt-2" color="color_grey">{{ $t('transaction_history') }}</p>
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

                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>
import ItemLineModel from "@/scripts/sale_deposit/model/ItemLine";
import SaleDepositModel from "@/scripts/sale_deposit/model/SaleDeposit";
import kendo from "@progress/kendo-ui";
import {print} from "@/form/Sale.js";
import {i18n} from '@/i18n';
const billingHandler = require("@/scripts/invoice/handler/billingHandler")

const {getFormSetting} = require("@/scripts/settingsHandler.js")
const itemLineModel = new ItemLineModel({})
const saleDepositModel = new SaleDepositModel({})
export default {
    name: "SaleDepositView",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        isEdit: false,
        saleDeposit: saleDepositModel,
        itemLine: itemLineModel,
        showLoading: false,
        showLoadingAtch: false,
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
        dateFormat: saleDepositModel.dateFormat,
        reason: '',
        imgFile: '',
        src: '',
        files: [],
        file_: {},
        fileDesc: '',
        fileSize: 0,
        fileType: '',
        fileName: '',
        attachmentList: [],
        // form
        form_setting: '',

    }),
    methods: {
        async loadAttachment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    if (this.$route.params.hasOwnProperty('id')) {
                        this.showLoadingAtch = true
                        const strFilter = '?id=' + this.$route.params.id
                        billingHandler.attachmentList(strFilter).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoadingAtch = false
                                this.attachmentList = res.data.data
                            }
                        })
                    }

                }, 10)
            })
        },
        onFileChange(e) {
            if (e) {
                this.fileDesc = e.name
                this.fileName = e.name
                this.fileSize = e.size
                this.fileType = e.type
                let input = this.files
                // Ensure that you have a file before attempting to read it
                if (input) {
                    let reader = new FileReader()
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onloadend = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.imgFile = e.target.result
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsBinaryString(input)
                    this.src = URL.createObjectURL(input)
                }
            }
        },
        async uploadFile() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    if (this.imgFile) {
                        if (this.$route.params.hasOwnProperty('id')) {
                            const id = this.$route.params.id || ''
                            const name = this.saleDeposit.referenceNo || ''
                            let data = {
                                file: this.imgFile,
                                info: {
                                    name: this.fileName,
                                    description: this.fileDesc,
                                    size: this.fileSize,
                                    type: this.fileType
                                },
                                type: 'Transaction',
                                id: id,
                                name: name
                            }
                            this.showLoading = true
                            billingHandler.attachment(data).then(res => {
                                if (res.data.statusCode === 201) {
                                    this.showLoading = false
                                    this.imgFile = null
                                    this.src = ''
                                    this.fileDesc = ''
                                    this.fileName = ''
                                    this.fileSize = 0
                                    this.fileType = ''
                                    this.$snotify.success('Success')
                                    this.loadAttachment()
                                    // this.txnList = JSON.parse(JSON.stringify(res.data.data))
                                    // window.console.log('transactions', this.txnList)
                                }
                            })
                        }

                    } else {
                        this.showLoading = false
                        this.$snotify.error('Please browse to upload image')
                    }
                }, 10)
            })
        },
        fileUrl(dataItem) {
            if (dataItem.fileUrl) {
                return `<a target="_blank" style="color:#ED1A3A !important" href="${dataItem.fileUrl}"><span>Open</span></a>`
            }
            return ``
        },
        byteToMB(dataItem) {
            const FileSize = dataItem.size || 0 // in MiB
            const marker = 1024; // Change to 1000 if required
            const decimal = 3; // Change as required
            const kiloBytes = marker; // One Kilobyte is 1024 bytes
            const megaBytes = marker * marker; // One MB is 1024 KB
            const gigaBytes = marker * marker * marker; // One GB is 1024 MB
            // const teraBytes = marker * marker * marker * marker; // One TB is 1024 GB

            // return bytes if less than a KB
            if (FileSize < kiloBytes) {
                return FileSize + " Bytes";
            }
            // return KB if less than a MB
            else if (FileSize < megaBytes) {
                return ((FileSize / kiloBytes).toFixed(decimal) + " KB");
            }
            // return MB if less than a GB
            else if (FileSize < gigaBytes) {
                return ((FileSize / megaBytes).toFixed(decimal) + " MB");
            }
            // return GB if less than a TB
            else {
                return ((FileSize / gigaBytes).toFixed(decimal) + " GB");
            }

            /* var FileSize = file.files[0].size / 1024 / 1024; // in MiB
            if (FileSize > 2) {
                alert('File size exceeds 2 MiB');
               // $(file).val(''); //for clearing with Jquery
            } else {
                        alert('File size' + FileSize);
            } */
        },
        formatDateTime(value) {
            return kendo.toString(new Date(value), this.dateFormat + ` hh:mm tt`)
        },
        onDeleteSaleDeposit() {
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
                            customer: this.purchaseDeposit.customer,
                            transactionDate: this.purchaseDeposit.transactionDate,
                            actionType: 'delete',
                            reason: this.reason,
                        }
                        billingHandler.createDeposit(data).then(response => {
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
                path: 'sale_deposit/' + id,
                name: 'Sale Deposit',
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
            let ds = this.$refs.saleDepositLineDS.kendoWidget(),
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
                        billingHandler.depositList(strFilter).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.saleDeposit = res.data.data[0]
                                this.decimalFormat = this.saleDeposit.decimalFormat
                                this.itemLines = this.saleDeposit.itemLine
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
            const method = dataItem.paymentOption
            if (method) {
                return `<span>${method.bankAccountName || ``}</span>`
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
         _print(id) {
            if (this.form_setting != '') {
                print(this.saleDeposit, id, this.form_setting);
            } else {
                this.$snotify.error(i18n.t('please_save_form_in_setting'))
            }
        },
        getFormSettingFuct() {
            let params = "?formType=Sale Deposit"
            getFormSetting(params).then(res => {
                if (res.data.statusCode === 200) {
                    if (res.data.data.length > 0) {
                        this.form_setting = res.data.data["0"].settings;
                    }
                }
            });
        },
    },
    watch: {
        id() {
            if (this.$route.params.id !== undefined) {
                this.loadViewDeposit()
                this.loadInvoiceHistory()
            }
        },
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        // this.loadObj()
    },
    computed: {
        routerTo(itm) {
            return "/sale_order_view" + `/${itm.id}`;
        },
        accountDeposit() {
            if (this.saleDeposit) {
                if (this.saleDeposit.hasOwnProperty('saleDepositAcc')) {
                    if (this.saleDeposit.saleDepositAcc.hasOwnProperty('id')) {
                        return this.saleDeposit.saleDepositAcc.name
                    }
                }
            }
            return '-'
        },
        currency() {
            if (this.saleDeposit) {
                if (this.saleDeposit.hasOwnProperty('currency')) {
                    if (this.saleDeposit.currency.hasOwnProperty('id')) {
                        return this.saleDeposit.currency.code
                    }
                }
            }
            return ''
        },
        transactionDate() {
            if (this.saleDeposit) {
                if (this.saleDeposit.hasOwnProperty('transactionDate')) {
                    return kendo.toString(new Date(this.saleDeposit.transactionDate), this.dateFormat)
                }
            }
            return '-'
        },
        segment() {
            if (this.saleDeposit) {
                if (this.saleDeposit.hasOwnProperty('segment')) {
                    if (this.saleDeposit.segment.hasOwnProperty('id')) {
                        return this.saleDeposit.segment.name
                    }
                }
            }
            return '-'
        },
        location() {
            if (this.saleDeposit) {
                if (this.saleDeposit.hasOwnProperty('location')) {
                    if (this.saleDeposit.location.hasOwnProperty('id')) {
                        return this.saleDeposit.location.name
                    }
                }
            }
            return ''
        },
        customerName() {
            if (this.saleDeposit) {
                if (this.saleDeposit.hasOwnProperty('customer')) {
                    if (this.saleDeposit.customer.hasOwnProperty('id')) {
                        return this.saleDeposit.customer.name
                    }
                }
            }
            return '-'
        },
    },
    mounted: async function () {
        await this.loadViewDeposit()
        await this.loadInvoiceHistory()
        await this.loadAttachment()
        this.getFormSettingFuct()
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

.color_green {
    color: #03b154;
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

.card_green {
    min-height: 70px;
    background-color: #00b050 !important;
    color: #ffffff;
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


.checkbox_inv {
    padding: 2px;
    margin-top: 3px;
    margin-right: 2px;
}

.exp_select {
    font-size: 12px !important;
}

.v-data-table__wrapper td {
    border-bottom: 1px solid #808080;
    border-top: 1px solid #808080;
}


</style>