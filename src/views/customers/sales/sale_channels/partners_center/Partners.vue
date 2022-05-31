<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-row>
                            <v-col class="bigSide py-0" sm="12" cols="12" style="transition: .3s ease-in;"
                                   >
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <div class="function_header">
                                        <h2>{{$t('partner')}}</h2>
                                        <v-icon
                                            onclick="window.history.go(-1); return false;"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                    </div>
                                    <div class="">
                                        <!-- Form -->
                                        <v-form
                                            ref="form"
                                            v-model="valid"
                                            lazy-validation>
                                            <v-col sm="12" col="12">
                                                 <v-row>
                                                    <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                        <label class="label mb-0">{{ $t('name') }}</label>
                                                        <v-text-field
                                                            class="mt-1"
                                                            type="text"
                                                            v-model="p.name"
                                                            :rules="[v => !!v || 'Name is required']"
                                                            outlined
                                                        />
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                        <label class="label mb-0">{{$t('customer')}}</label>
                                                        <dropdownlist
                                                            :data-items="customerList"
                                                            @change="onChange"
                                                            :value="customer"
                                                            :data-item-key="dataItemKey"
                                                            :text-field="textField"
                                                            :default-item="defaultItem"
                                                            :filterable="true"
                                                            :required="true"
                                                            :loading="loading"
                                                            :valid="validCustomer"
                                                            @filterchange="onFilterChange"
                                                        >
                                                        </dropdownlist>
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                        <label class="label mb-0">{{$t('vendor')}}</label>
                                                        <app-supplier-dropdownlist
                                                            :initSupplier="supplier"
                                                            @emitSupplier="supplier = $event"
                                                            @onChanged="onVendorChanged"
                                                        />
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                        <label class="label mb-0">{{ $t('settlement_method') }}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            item-text="name"
                                                            item-value="id"
                                                            :items="settlementMethods"
                                                            v-model="p.settlementMethod"
                                                            :placeholder="$t('select')"
                                                            outlined>
                                                        </v-select>
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                        <p class="mb-2">{{ $t('file_type') }} [PDF, JPG, JPEG, TIFF,
                                                            PNG, GIF] - 5MB</p>
                                                        <template>
                                                            <v-file-input
                                                                v-model="files"
                                                                @change="onFileChange"
                                                                accept="image/jpg, image/jpeg, application/pdf"
                                                                :placeholder="$t('attachments')"
                                                                single
                                                                prepend-icon="mdi-paperclip">
                                                                <template v-slot:selection="{ text }">
                                                                    <v-chip
                                                                        small
                                                                        label
                                                                        color="primary"
                                                                    >
                                                                        {{ text }}
                                                                    </v-chip>
                                                                </template>
                                                            </v-file-input>
                                                        </template>
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                        <label class="label mb-0">{{ $t('sale_channel') }}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            item-text="name"
                                                            item-value="id"
                                                            :items="saleChannels"
                                                            v-model="p.saleChannelId"
                                                            :placeholder="$t('select')"
                                                            outlined>
                                                        </v-select>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-form>
                                    </div>
                                    <div class="function_footer">
                                        <v-alert type="warning"
                                                 v-model="alert"
                                                 dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
                                        <v-btn outlined color="#494846" class="float-left text-capitalize"
                                               @click="cancel">{{ $t('cancel') }}
                                        </v-btn>
                                        <v-btn color="secondary" class="float-right white--text text-capitalize"
                                               @click="saveClose">
                                            {{ $t('save_close') }}
                                        </v-btn>
                                        <v-btn color="primary"
                                            v-show="!isEdit"
                                               class="float-right  white--text text-capitalize mr-3 "
                                               @click="saveNew">
                                            {{ $t('save_new') }}
                                        </v-btn>
                                    </div>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"
                :alertMessage="loadingAlert"
                :color="loadingColorAlert"
                :alertText="loadingTextAlert"/>
        </v-container>
    </v-app>
</template>
<script>
import {i18n} from '@/i18n';
import PartnerModel from "@/scripts/commerce/model/Partner";
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
// customer
const textField = "numberName";
const keyField = "id";
const defaultItem = { [textField]: "Select customer...", [keyField]: null };
const emptyItem = { [textField]: "loading ..." };
const SECOND_DELAY = 1000;
const customerHandler = require("@/scripts/customerHandler");
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import CustomerModel from "@/scripts/model/Customer";
// vendor
import {
    SupplierModel
} from "@/scripts/model/AppModels";
//
const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const saleChannelHandler = require("@/scripts/saleChannelHandler");
export default {
    props: {
    },
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        dropdownlist: DropDownList,
        "app-supplier-dropdownlist": () => import("@/components/dropdownlist/Supplier"),
    },
    data: () => ({
        valid: true,
        p: new PartnerModel({}),
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        alert: false,
        //attachment
        files: [],
        fileDesc: '',
        fileName: '',
        fileSize: '',
        fileType: '',
        imgFile: '',
        src: '',
        //customer
        cusBaseUrl: customerHandler.search(),
        customerList: [],
        defaultItem: defaultItem,
        loading: false,
        customer: new CustomerModel({}),
        textField: "numberName",
        dataItemKey: "id",
        filter: '',
        //supplier
        supplier: new SupplierModel(),
        //
        isSaveNew: false,
        loggedUser: {
            id: cookie.creator,
            name: cookie.email
        },
        isEdit: false,
        errors: [],
        saleChannels: []
    }),
    methods: {
        async loadSaleChannel() {
            this.showLoading = true;
            saleChannelHandler.get().then((res) => {
                this.showLoading = false;
                if (res.data.statusCode === 200) {
                    this.saleChannels = res.data.data;
                }
            });
        },
        async initData() {
            if (this.$route.params.id !== undefined) {
                this.isEdit = true
                await this.loadPartner()
            } else {
                this.clear()
            }
        },
        loadPartner(){
            this.showLoading = true
            commerceHandler.partnerGet(this.$route.params.id).then((res) => {
                this.showLoading = false
                if(res.status == 200){
                    res.data.data[0].id = res.data.data[0].pk
                    this.p = res.data.data[0]
                    if(Object.keys(this.p.customer).length > 0){
                        this.customer = this.p.customer
                    }
                    if(Object.keys(this.p.vendor).length > 0){
                        this.supplier = this.p.vendor
                    }
                    this.loadAttachment();
                }else{
                    this.gotoCenter()
                }
            })
        },
        async loadAttachment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    // if (this.$route.params.hasOwnProperty('id')) {
                    //     this.showLoadingAtch = true
                        const strFilter = '?id=' + this.p.pk
                        billingHandler.attachmentList(strFilter).then(res => {
                            if (res.hasOwnProperty('data')) {
                                window.console.log(res.data.data, 'att')
                                let d = res.data.data
                                if(d.length > 0){
                                    this.files.push(d[0])
                                    this.onFileChange(d[0])
                                }
                            }
                        })
                    // }

                }, 10)
            })
        },
        gotoCenter(){
            this.$router.push(`${i18n.locale}` + '/sale_channels');
        },
        requestData(skip, filter, baseUrl) {
            const url = baseUrl + `?filter=${filter}`;
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                return response.json();
                })
                .then(this.afterFetch);
        },
        onChange(event) {
            const value = event.value;
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            const id = value.id || "";
            if (id !== "") {
                this.customer = value;
            }
        },
        onFilterChange(event) {
            const filter = event.filter.value;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.requestData(0, filter, this.cusBaseUrl);
                this.filter = filter;
                this.loading = false;
            }, SECOND_DELAY);
            this.loading = true;
        },
        afterFetch(json) {
            this.customerList = json.data;
        },
        //suppliery
        async onVendorChanged() {
            window.console.log(this.supplier)
        },
        //attachment
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
                        const id = this.loan.id || ''
                        const name = this.loan.number || ''
                        let data = {
                            file: this.imgFile,
                            info: {
                                name: this.fileName,
                                description: this.fileDesc,
                                size: this.fileSize,
                                type: this.fileType
                            },
                            type: 'Commerce Partner',
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
                    } else {
                        this.showLoading = false
                        this.$snotify.error('Please browse to upload image')
                    }
                }, 10)
            })
        },
        errorMessage() {
        },
        cancel() {
            this.$swal({
                title: i18n.t('msg_title_warning'),
                text: i18n.t('msg_discard'),
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: i18n.t('cancel'),
                confirmButtonColor: "#4d4848",
                cancelButtonColor: "#ED1A3A",
                confirmButtonText: i18n.t('discard'),
            }).then((result) => {
                if (result.value) {
                    this.clear();
                    this.$router.go(-1);
                }
            });
        },
        clear() {
            this.isEdit = false
            this.p = new PartnerModel({})
            this.p.user = this.loggedUser
            if (this.isSaveNew == true) {
                this.customer = new CustomerModel({})
                this.supplier = new SupplierModel({})
            }
            this.files = []
            this.fileDesc = ''
            this.fileName = ''
            this.fileSize = ''
            this.fileType = ''
            this.imgFile = ''
            this.src = ''
        },
        saveNew() {
            this.isSaveNew = true
            this.save()
        },
        saveClose() {
            this.isSaveNew = false
            this.save()
        },
        async save() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            this.p.user = this.loggedUser
            if(Object.keys(this.customer).length > 0){
                this.p.customerId = this.customer.id
                this.p.customer = this.customer
            }
            if(Object.keys(this.supplier).length > 0){
                this.p.vendorId = this.supplier.id
                this.p.vendor = this.supplier
            }
            this.showLoading = true
            commerceHandler.partnerCreate(new PartnerModel(this.p)).then(response => {
                if (response.data.statusCode === 201) {
                    window.console.log(response, 'ress')
                    //attachment 
                    if (this.imgFile) {
                        const id = response.data.data.pk || ''
                        const name = this.p.name || ''
                        let data = {
                            file: this.imgFile,
                            info: {
                                name: this.fileName,
                                description: this.fileDesc,
                                size: this.fileSize,
                                type: this.fileType
                            },
                            type: 'Commerce Partner',
                            id: id,
                            name: name
                        }
                        billingHandler.attachment(data).then(res => {
                            if (res.data.statusCode === 201) {
                                this.imgFile = null
                                this.src = ''
                                this.fileDesc = ''
                                this.fileName = ''
                                this.fileSize = 0
                                this.fileType = ''
                                this.saveSuccess()
                            }
                        })
                    }else{
                        this.saveSuccess()
                    }
                }
            }).catch(e => {
                this.showLoading = false
                this.$snotify.error('Something went wrong')
                window.console.log(e, 'error')
                this.errors.push(e)
            })
        },
        saveSuccess(){
            this.showLoading = false
            this.$swal({
                position: 'products',
                icon: 'success',
                title: i18n.t('your_work_has_been_saved'),
                showConfirmButton: true,
                confirmButtonColor: '#4d4848',
                cancelButtonColor: '#ED1A3A',
                confirmButtonText: i18n.t('ok')
            })
            if (this.isSaveNew == true) {
                setTimeout(() => {
                    this.clear()
                }, 10)
            } else {
                this.$router.push(`${i18n.locale}` + '/sale_channels');
            }
        }
    },
    mounted: async function () {
        this.requestData(0, this.filter, this.cusBaseUrl);
        this.initData();
        this.loadSaleChannel();
    },
    computed:{
        settlementMethods(){
            return [
                {id: 'cash', name: i18n.t('cash')},
                {id: 'credit', name: i18n.t('credit')}
            ]
        },
        validCustomer: function () {
            return this.customer.id !== undefined && this.customer.id !== null;
        },
    },
    watch: {
        '$route': 'initData'
    }
};
</script>
