<template>
    <v-row class="">
        <!-- not modal -->
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="font_20">{{$t('general_setting')}}</h2>
            <p class="mb-0">{{ $t('general_setting_dis') }} </p>
            <v-row>
                <v-col sm="6" cols="12" class="py-0">
                    <template>
                        <LoadingMe
                            :isLoading="showLoading"
                            :fullPage="true"
                            :myLoading="true"
                            :alertMessage="loadingAlert"
                            :color="loadingColorAlert"
                            :alertText="loadingTextAlert"/>
                        <v-simple-table class="">
                            <template>
                                <tbody>
                                <tr>
                                    <td class="text-bold" style="border-top:none !important;">{{ $t('time_in') }}</td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td style="border-top:none !important;"
                                        class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.timeIn"
                                            color="primary"
                                            :label="g.timeIn ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('time_out') }}</td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td style="" class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.timeOut"
                                            color="primary"
                                            :label="g.timeOut ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('order_number') }}</td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td style="" class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.orderNumber"
                                            color="primary"
                                            :label="g.orderNumber ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('cashier_name') }}</td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td style="" class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.cashierName"
                                            color="primary"
                                            :label="g.cashierName ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('modifier') }}</td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td style="" class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.modifier"
                                            color="primary"
                                            :label="g.modifier ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('employee') }}</td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td style="" class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.employee"
                                            color="primary"
                                            :label="g.employee ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('note') }}</td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td style="" class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.note"
                                            color="primary"
                                            :label="g.note ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold" >
                                        {{ $t('allow_order_flow') }}
                                    </td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.allowOrderFlow"
                                            color="primary"
                                            :label="g.allowOrderFlow ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('number_people') }}</td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td style="" class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.numberPeople"
                                            color="primary"
                                            :label="g.numberPeople ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                </v-col>
                <v-col sm="6" cols="12" class="py-0">
                    <template>
                        <v-simple-table class="">
                            <template>
                                <tbody>
                                <tr>
                                    <td class="text-bold" style="border-top:none !important;">{{ $t('sale_unit_item') }}</td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td style="border-top:none !important;"
                                        class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.saleUnitItem"
                                            color="primary"
                                            :label="g.saleUnitItem ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('favorite') }}</td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td style="" class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.favorite"
                                            color="primary"
                                            :label="g.favorite ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('take_away') }}</td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td style="" class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.takeAway"
                                            color="primary"
                                            :label="g.takeAway ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('booking') }}</td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td style="" class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.booking"
                                            color="primary"
                                            :label="g.booking ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('user_pin') }}</td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td style="" class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.userPin"
                                            color="primary"
                                            :label="g.userPin ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('session_by_pin') }}</td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td style="" class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.sessionPin"
                                            color="primary"
                                            :label="g.sessionPin ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('allow_nfc_card') }}</td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td style="" class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.allowNFCCard"
                                            color="primary"
                                            :label="g.allowNFCCard ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold" style="border-bottom:none !important;">
                                        {{ $t('allow_split_item') }}
                                    </td>
                                    <!-- <td>{{ $t('description') }}</td> -->
                                    <td style="border-bottom:none !important;"
                                        class="primary--text align-center justify-center d-flex text-bold">
                                        <v-switch
                                            v-model="g.allowSplitItem"
                                            color="primary"
                                            :label="g.allowSplitItem ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                </v-col>
                <v-col sm="12" cols="12">
                    <template>
                        <v-simple-table class="">
                            <template>
                                <tbody>
                                <tr>
                                    <td class="text-bold">{{ $t('payment_option') }}</td>
                                    <td>
                                        <v-combobox
                                            v-model="g.paymentOption"
                                            :items="paymentOptions"
                                            label="-- Select --"
                                            item-value="value.id"
                                            item-text="name"
                                            multiple
                                            chips
                                        >
                                            <template v-slot:selection="data">
                                                <v-chip
                                                    :key="data.item.id"
                                                >
                                                    <v-avatar
                                                        class="accent white--text"
                                                        left
                                                        v-text="data.item.name.slice(0, 1).toUpperCase()"
                                                    ></v-avatar>
                                                    {{ data.item.name }}
                                                </v-chip>
                                            </template>
                                        </v-combobox>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('other_function') }}</td>
                                    <td>
                                        <v-combobox
                                            v-model="g.otherFunction"
                                            :items="otherFunctions"
                                            label="-- Select --"
                                            item-value="value.id"
                                            item-text="name"
                                            multiple
                                            chips
                                        >
                                            <template v-slot:selection="data">
                                                <v-chip
                                                    :key="data.item.id"
                                                >
                                                    <v-avatar
                                                        class="accent white--text"
                                                        left
                                                        v-text="data.item.name.slice(0, 1).toUpperCase()"
                                                    ></v-avatar>
                                                    {{ data.item.name }}
                                                </v-chip>
                                            </template>
                                        </v-combobox>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('default_customer') }}</td>
                                    <td>
                                        <dropdownlist
                                            :data-items="customerList"
                                            @change="onChange"
                                            :value="g.defaultCustomer"
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
                                    </td>
                                    <td style="" class="primary--text align-center justify-center  text-bold">
                                        <v-switch
                                            v-model="g.allowSelectCustomer"
                                            color="primary"
                                            :label="g.allowSelectCustomer ? 'ON' : 'LOCK'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('price_level') }}</td>
                                    <td>
                                        <v-select 
                                            class="my-1"
                                            placeholder="-- Default Price Level --"
                                            :items="priceLevels"
                                            v-model="g.defaultPriceLevel"
                                            item-value="id"
                                            item-text="name"
                                            outlined
                                        />
                                    </td>
                                    <td style="" class="primary--text align-center justify-center  text-bold">
                                        <v-switch
                                            v-model="g.allowSelectPriceLevel"
                                            color="primary"
                                            :label="g.allowSelectPriceLevel ? 'ON' : 'LOCK'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('segment') }}</td>
                                    <td>
                                        <v-select 
                                            class="my-1"
                                            placeholder="-- Default Segment --"
                                            :items="segments"
                                            v-model="g.defaultSegment"
                                            item-value="id"
                                            item-text="name"
                                            outlined
                                        />
                                    </td>
                                    <td style="" class="primary--text align-center justify-center  text-bold">
                                        <v-switch
                                            v-model="g.allowSelectSegment"
                                            color="primary"
                                            :label="g.allowSelectSegment ? 'ON' : 'LOCK'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('allow_kitchen_kit') }}</td>
                                    <td>
                                        <v-combobox
                                            v-model="g.kitchenKitCategories"
                                            :items="categories"
                                            label="Allow to"
                                            item-value="value.id"
                                            item-text="name"
                                            multiple
                                            chips
                                        >
                                            <template v-slot:selection="data">
                                                <v-chip
                                                    :key="data.item.id"
                                                >
                                                    <v-avatar
                                                        class="accent white--text"
                                                        left
                                                        v-text="data.item.name.slice(0, 1).toUpperCase()"
                                                    ></v-avatar>
                                                    {{ data.item.name }}
                                                </v-chip>
                                            </template>
                                        </v-combobox>
                                    </td>
                                    <td style="" class="primary--text align-center justify-center  text-bold">
                                        <v-switch
                                            v-model="g.allowKitchenKit"
                                            color="primary"
                                            :label="g.allowKitchenKit ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('allow_order_list') }}</td>
                                    <td>
                                        <v-combobox
                                            v-model="g.orderListCategries"
                                            :items="categories"
                                            label="Allow to"
                                            item-value="value.id"
                                            item-text="name"
                                            multiple
                                            chips
                                        >
                                            <template v-slot:selection="data">
                                                <v-chip
                                                    :key="data.item.id"
                                                >
                                                    <v-avatar
                                                        class="accent white--text"
                                                        left
                                                        v-text="data.item.name.slice(0, 1).toUpperCase()"
                                                    ></v-avatar>
                                                    {{ data.item.name }}
                                                </v-chip>
                                            </template>
                                        </v-combobox>
                                    </td>
                                    <td style="" class="primary--text align-center justify-center  text-bold">
                                        <v-switch
                                            v-model="g.allowOrderList"
                                            color="primary"
                                            :label="g.allowOrderList ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('cancel_reason') }}</td>
                                    <td>
                                        <v-combobox
                                            v-model="g.cancelReasons"
                                            :items="reasons"
                                            label="Reason to Cancel"
                                            multiple
                                            chips
                                        >
                                            <template v-slot:selection="data">
                                                <v-chip
                                                    :key="JSON.stringify(data.item)"
                                                    v-bind="data.attrs"
                                                    :input-value="data.selected"
                                                    :disabled="data.disabled"
                                                    @click:close="data.parent.selectItem(data.item)"
                                                >
                                                    <v-avatar
                                                        class="accent white--text"
                                                        left
                                                        v-text="data.item.slice(0, 1).toUpperCase()"
                                                    ></v-avatar>
                                                    {{ data.item }}
                                                </v-chip>
                                            </template>
                                        </v-combobox>
                                    </td>
                                    <td style="" class="primary--text align-center justify-center  text-bold">
                                        <v-switch
                                            v-model="g.allowCancelReason"
                                            color="primary"
                                            :label="g.allowCancelReason ? 'ON' : 'OFF'"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('decimal') }}</td>
                                    <td>{{ $t('decimal_setting_desc') }}</td>
                                    <td style="" class="primary--text align-center justify-center d-flex text-bold">
                                        <v-select class=""
                                                  v-model="g.decimal"
                                                  :items="decimalStyle"
                                                  color="primary"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('app_nature') }}</td>
                                    <td>{{ $t('description') }}</td>
                                    <td style="width:160px" class="primary--text text-center hide_form_alert">
                                        <v-select
                                            class="my-1"
                                            v-model="g.appNature"
                                            :placeholder="$t('select')"
                                            :items="appNatures"
                                            outlined
                                            return-object
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('screen_display') }}</td>
                                    <td>{{ $t('description') }}</td>
                                    <td style="" class="primary--text text-center hide_form_alert">
                                        <v-select
                                            class="my-1"
                                            v-model="g.screenDisplay"
                                            :placeholder="$t('display')"
                                            :items="display"
                                            outlined
                                            return-object
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{ $t('receipt_template') }}</td>
                                    <td>{{ $t('description') }}</td>
                                    <td style="" class="primary--text text-center hide_form_alert">
                                        <v-select
                                            class="my-1"
                                            v-model="g.receiptTemplate"
                                            style="width:160px"
                                            :placeholder="$t('template')"
                                            :items="template"
                                            outlined
                                            return-object
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                </v-col>
            </v-row>
            <v-divider/>
            <v-card outlined dense class="no_border function_footer">
                <v-btn color="primary" class="float-right white--text" @click="onSaveClose">
                    {{ $t('save') }}
                </v-btn>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import generalSettingModel from "@/scripts/commerce/model/GeneralSetting"
const categoryHandler = require("@/scripts/categoryHandler")
const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
const priceLevelHandler = require("@/scripts/priceLevelHandler")
const settingsHandler = require("@/scripts/settingsHandler")
const defaultItem = { [textField]: "Select customer...", [keyField]: null };
const SECOND_DELAY = 1000;
const customerHandler = require("@/scripts/customerHandler")
const textField = "name"
const keyField = "id"
const emptyItem = { [textField]: "loading ..." }
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import CustomerModel from "@/scripts/model/Customer";
export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        dropdownlist: DropDownList,
    },
    data: () => ({
        customer: new CustomerModel({}),
        filter: "",
        cusBaseUrl: customerHandler.search(),
        loading: false,
        textField: "name",
        dataItemKey: "id",
        defaultItem: defaultItem,
        customerList: [],
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        g: new generalSettingModel({}),
        quotes: ['Quote', 'Proposal', 'Estimate'],
        display: ['Surface', 'Desktop', 'Tablet', 'Huawei 8inc', 'Huawei 10inc'],
        decimalStyle: [0, 2, 3, 4, 5],
        categories: [],
        paymentOptions: [
            {id: 'cash', name: 'Cash'},
            {id: 'card', name: 'Card'},
            {id: 'bank', name: 'Bank'},
            {id: 'khqr', name: 'KHQR'},
        ],
        appNatures: [
            'Retail',
            'Coffee Shop',
            'Hotel',
            'Resturant'
        ],
        reasons: [
            'wrong order',
            'no reason',
            'other',
        ],
        template: [
            '80mm',
            '58mm',
            'A4',
            'A5',
        ],
        priceLevels: [],
        segments: [],
        otherFunctions: [
            {id: 'reward', name: 'Reward'},
            {id: 'promotion', name: 'Promotion'},
            {id: 'parksale', name: 'Parksale'},
            {id: 'invoice', name: 'Invoice'},
            {id: 'note', name: 'Note'},
            {id: 'delivery', name: 'Delivery'},
            {id: 'resetOrder', name: 'Reset Order'},
            {id: 'splitInv', name: 'Split Inv'},
            {id: 'clearOrder', name: 'Clear Order'},
            {id: 'saleUnit', name: 'Sale Unit'},
            {id: 'countGuest', name: 'Count Guest'},
            {id: 'margeInv', name: 'Merge Inv'},
            {id: 'orderList', name: 'Order List'},
            {id: 'orderType', name: 'Order Type'},
        ]
    }),
    methods: {
        onChange(event) {
            const value = event.value;
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            const id = value.id || "";
            if (id !== "") {
                this.loadCustomerDetail(id);
            }
        },
        async loadCustomerDetail(customerId) {
            try {
                const strFilter = "?id=" + customerId;
                customerHandler.customerDetail(strFilter).then((res) => {
                if (res.data.statusCode === 200) {
                    const lines = res.data.data || [];
                    lines.forEach((item) => {
                        this.customer = {
                            id: item.id,
                            type: item.type || {},
                            isDonor: item.isDonor || false,
                            crn: item.crn || "",
                            customerType: item.customerType || {},
                            number: item.number || "",
                            numberName: (item.number || "") + " - " + (item.name || ""),
                            name: item.name || "",
                            connectId: item.connectId || "",
                            gender: item.gender || "",
                            alternativeName: item.alternativeName || "",
                            taxId: item.taxId || "",
                            consumerId: item.consumerId || "",
                            registeredDate: item.registeredDate || "",
                            customerGroup: item.customerGroup,
                            receivableAcc: item.receivableAcc,
                            saleDepositAcc: item.saleDepositAcc,
                            saleDiscountAcc: item.saleDiscountAcc,
                            priceLevel: item.priceLevel,
                            billPayment: item.billPayment,
                            cashPayment: item.cashPayment || {},
                            qrPayment: item.qrPayment || {},
                            cardPayment: item.cardPayment || {},
                            nature: item.nature,
                            image: item.image || {},
                            noteOnInvoice: item.noteOnInvoice || "",
                            billingAddress: item.billingAddress,
                            contactPerson: item.contactPerson,
                            deliveryAddress: item.deliveryAddress,
                            email: item.email,
                            baseCurrency: item.baseCurrency,
                            decimalFormat: item.decimalFormat,
                        };
                    });
                    window.console.log("this.customer", this.customer);
                }
                });
            } catch (e) {
                window.console.log("Error on customer detail", e);
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
        requestData(skip, filter, baseUrl) {
            const url = baseUrl + `?filter=${filter}`;
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                return response.json();
                })
                .then(this.afterFetch);
        },
        afterFetch(json) {
            this.customerList = json.data;
        },
        async onSaveClose() {
            this.showLoading = true
            this.g.defaultCustomer = this.customer
            commerceHandler.settingCreate(new generalSettingModel(this.g)).then(response => {
                if (response.data.statusCode === 201) {
                    const res = response.data.data
                    this.g = res
                    this.$snotify.success('Update Successfully')
                    this.showLoading = false
                    this.loadSaleFormContent()
                }
            }).catch(e => {
                this.$snotify.error('Something went wrong')
                this.errors.push(e)
                this.showLoading = false
            })
        },
        async loadSaleFormContent() {
            this.showLoading = true
            commerceHandler.settingGet().then(res => {
                this.showLoading = false
                if (res.data.statusCode === 200) {
                    const data = res.data.data
                    let d = data.filter((o) => {return o.type == 'retail'})
                    if (d.length > 0) {
                        this.g = d[0]
                        this.g.id = d[0].pk
                        if(Object.keys(this.g.defaultCustomer).length > 0){
                            this.customer = this.g.defaultCustomer
                        }
                    }
                }
            })
        },
        async loadCategory() {
            categoryHandler.get().then(res => {
                this.showLoading = false
                this.categories = res
            })
        },
        async loadPriceLevel() {
            this.priceLevels = []
            priceLevelHandler.get().then(res => {
                window.console.log(res,'price level')
                this.priceLevels = res
            })
        },
        async loadSegment() {
            this.segments = []
            settingsHandler.getSeg().then((res) => {
                if (res.data.statusCode === 200) {
                    this.segments = res.data.data;
                }
            })
        },
    },
    computed: {
        validCustomer: function () {
            return this.customer.id !== undefined && this.customer.id !== null;
        }
    },
    mounted: async function () {
        await this.requestData(0, this.filter, this.cusBaseUrl);
        await this.loadSaleFormContent()
        await this.loadCategory()
        await this.loadPriceLevel()
        await this.loadSegment()
        
    }
}
;
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td:not(.v-data-table__mobile-row) {
    border-top: 1px solid rgba(0, 0, 0, 0.12) !important;
}

.btn_save {
    color: #ffffff;
    text-transform: capitalize;
}

.w_100 {
    width: 100px !important;
}

.float-right {
    margin-top: 0px !important;
}

.float-left {
    margin-top: 0px !important;

}

.v-input--switch {
    margin-top: 0px;
    height: 30px;
}

.attachment_table .v-data-table__wrapper {
    border-bottom: none !important;
}


</style>