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
                                        <h2 class="mb-0">{{ $t('warranty') }}</h2>
                                        <v-icon v-if="isHideBar" @click="cancel()"
                                                style="cursor: pointer;font-size: 40px;"
                                                color="grey"
                                                class="float-right">close
                                        </v-icon>
                                        <span style="transition: .3s ease-in; z-index:10;"
                                              :class="{'iconArrow': !isHideBar,'iconArrowHide': isHideBar }">
                                        <v-icon size="22" class="arr_icon" @click="hide_smallsitebar" v-if="isHideBar"> mdi-chevron-left-circle
                                        </v-icon>
                                        <v-icon size="22" class="arr_icon" @click="hide_smallsitebar" v-if="!isHideBar"> mdi-chevron-right-circle
                                        </v-icon>
                                    </span>
                                    </v-card>
                                    <v-card outlined dense class="px-3 no_border" color="grayBg" height="169px">
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t('customer') }}</label>
                                                <v-col sm="12" cols="12"
                                                       class="kendo_dropdown_custom pl-0 pb-3 pt-0">
                                                    <dropdownlist
                                                        :data-items="customerList"
                                                        @change="onChange"
                                                        :value="customer"
                                                        :data-item-key="dataItemKey"
                                                        :text-field="textField"
                                                        :default-item="defaultItem"
                                                        :filterable="true"
                                                        @filterchange="onFilterChange">
                                                    </dropdownlist>
                                                </v-col>
                                                <label class="label">{{ $t('invoice_number') }}</label>
                                                <v-col sm="12" cols="12"
                                                       class="kendo_dropdown_custom pl-0 pb-3 pt-0">
                                                    <dropdownlist
                                                        :data-items="invoices"
                                                        @change="onChangeInvoice"
                                                        :value="invoice"
                                                        :data-item-key="dataItemKey"
                                                        :text-field="textFieldInvoice"
                                                        :default-item="defaultItem"
                                                        :filterable="true"
                                                        @filterchange="onFilterChangeInvoice">
                                                    </dropdownlist>
                                                </v-col>
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <!--                                            <label class="label">{{$t('packing_list')}}</label>-->
                                                <!--                                            <v-text-field class="mt-1"-->
                                                <!--                                                          v-model="bill_date"-->
                                                <!--                                                          outlined-->
                                                <!--                                                          tage="Packing List"-->
                                                <!--                                                          :rules="[v => !!v || 'Number is required']"-->
                                                <!--                                                          required/>-->
                                                <label class="label  mb-0">{{ $t('date') }}</label>
                                                <app-datepicker :initialDate="date"
                                                                @emitDate="date = $event"/>
                                                <label class="label">{{ $t('warranty_start_date') }}</label>
                                                <app-datepicker :initialDate="startDate"
                                                                @emitDate="startDate = $event"/>
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{ $t('warranty_number') }}</label>
                                                <v-row class="mt-1 mr-0">
                                                    <v-col sm="3" cols="3" class="pt-0 pr-0 py-0">
                                                        <div class="code_text">Bil</div>
                                                    </v-col>
                                                    <v-col sm="7" cols="7" class="pt-0 pl-0 pr-1 py-0">
                                                        <v-text-field class=" custom-border "
                                                                      v-model="warrantyNo"
                                                                      outlined
                                                                      tage="Warranty Number"
                                                                      :rules="[v => !!v || 'Number is required']"
                                                                      required/>
                                                    </v-col>
                                                    <v-col sm="2" cols="2" class="pt-0 px-0 py-0">
                                                        <v-icon color="black" style="background: #fff;" size="30"
                                                                class="border_qrcode"
                                                                @click="generateNumber">mdi-qrcode
                                                        </v-icon>
                                                    </v-col>
                                                </v-row>

                                            </v-col>

                                        </v-row>
                                    </v-card>

                                    <v-row class="" style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="pt-3">
                                            <kendo-datasource ref="itemLineDS" :data="itemLines"/>
                                            <kendo-grid id="grid" class="grid-function" :data-source-ref="'itemLineDS'"
                                                        :sortable="false" :filterable="false" :column-menu="true"
                                                        :editable="true" :scrollable-virtual="true">
                                                <kendo-grid-column :title="$t('no.')" :template="rowNumberTmpl"
                                                                   :width="55" :column-menu="false" :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5;',
                                                                    class: 'text-variants'
                                                                }" :attributes="{
                                                                    style: 'text-align: variants'
                                                                }"/>
                                                <kendo-grid-column :field="'item'" :title="$t('item')" :width="200"
                                                                   :editable="disableEdit"
                                                                   :template="'<span>#=item.name#</span>'"
                                                                   :editor="accountDropDownEditor" :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column :field="'qty'" :title="$t('qty')" :width="200"
                                                                   :editable="disableEdit"
                                                                   :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'uom'"
                                                    :title="$t('uom')"
                                                    :width="100"
                                                    :editable="disableEdit"
                                                    :template="UOMTemplate"
                                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: left'}"/>
                                                <kendo-grid-column :field="'serial_ime_no'" :title="$t('serial_ime_no')"
                                                                   :format="'{0:n}'" :width="150"
                                                                   :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                                   :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column :field="'conditions'"
                                                                   :title="$t('conditions')"
                                                                   :template="WarrantyCondition"
                                                                   :editor="ConditionDropDownEditor"
                                                                   :width="150" :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }" :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'months'"
                                                    :title="$t('months')"
                                                    :width="120"
                                                    :format="'{0:n}'"
                                                    :headerAttributes="{
                                                        style: 'text-align: right; background-color: #EDF1F5'
                                                    }" :attributes="{style: 'text-align: right'}"/>
                                                <!--                                                <kendo-grid-column-->
                                                <!--                                                    :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow, class: 'btn-plus' }"-->
                                                <!--                                                    :title="'&nbsp;'" :width="100" :headerAttributes="{-->
                                                <!--                                                                    style: 'text-align: right; background-color: #EDF1F5'-->
                                                <!--                                                                }"/>-->
                                            </kendo-grid>

                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row>
                                                <v-col sm="4" cols="12" class="py-0">
                                                    <template>
                                                        <v-file-input class="mt-0 pt-0 " sm="3" cols="6" v-model="files"
                                                                      :placeholder="$t('attachment')" multiple
                                                                      prepend-icon="mdi-paperclip">
                                                            <template v-slot:selection="{ text }">
                                                                <v-chip small label color="primary">
                                                                    {{ text }}
                                                                </v-chip>
                                                            </template>
                                                        </v-file-input>
                                                    </template>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-divider/>
                                    <v-card outlined dense class="no_border function_footer">
                                        <v-alert type="warning"
                                                 v-model="alert"
                                                 dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn color="black" outlined
                                                       class="mr-2 text-capitalize  black--text float-left"
                                                       v-on="on">
                                                    {{ $t('select_template') }}
                                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item v-for="(item, index) in templates" :key="index">
                                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <v-btn color="black"
                                               class="text-capitalize  white--text float-left"
                                               @click="cancel">{{ $t('cancel') }}
                                        </v-btn>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn color="primary"
                                                       class="ml-2 float-right text-capitalize  white--text"
                                                       v-on="on">
                                                    {{ $t('save_option') }}
                                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list rounded>
                                                <v-list-item-group>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title v-if="!isEdit" @click="saveNew">
                                                                {{ $t('save_new') }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title @click="savePrint">{{ $t('save_print') }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list-item-group>
                                            </v-list>
                                        </v-menu>
                                        <v-btn color="secondary"
                                               class="float-right white--text text-capitalize ">
                                            {{ $t('save_draft') }}
                                        </v-btn>
                                    </v-card>
                                </v-form>
                            </v-col>

                            <v-col class="smallSide" sm="4" style="transition: .3s ease-in;"
                                   :class="{'hide_small_bar_class':isHideBar}">
                                <h3 style="color: #b3b5bc; font-size:20px;" v-if="!isHideBar"
                                    class="text-uppercase float-right mt-n3">
                                    <span class="pointer" @click="Help('warranty')">
                                        {{ $t('help') }}
                                    </span>
                                    <v-icon @click="cancel()"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right mt-n1">close
                                    </v-icon>
                                </h3>

                                <div v-if="!isHideBar" class="small_sidebar mt-9 grayBg">
                                    <v-row>
                                        <v-col sm="12" cols="12">
                                            <h4 class="mb-2 text-uppercase">{{ $t('analysis') }}</h4>
                                            <label class="label font_14">{{ $t('segment') }}</label>
                                            <v-select class="mt-1"
                                                      :items="segments"
                                                      item-value="id"
                                                      disabled
                                                      :item-text="item =>`${item.code} - ${item.name}`"
                                                      v-model="invoice.segment"
                                                      placeholder="Segment"
                                                      tage="Segment"
                                                      outlined/>
                                            <label class="label mb-0">{{ $t('location') }}</label>
                                            <v-select class="mt-2"
                                                      v-model="invoice.location"
                                                      :items="locations"
                                                      disabled
                                                      item-value="id"
                                                      :item-text="item =>`${item.code} - ${item.name}`"
                                                      return-object
                                                      tage="Location"
                                                      placeholder="bu/location"
                                                      outlined=""/>
                                            <label class="label font_14">{{ $t('project') }}</label>
                                            <v-select class="mt-1"
                                                      :items="projects"
                                                      item-value="id"
                                                      disabled
                                                      :item-text="item =>`${item.code} - ${item.name}`"
                                                      v-model="invoice.project"
                                                      placeholder="ABA"
                                                      tage="Project"
                                                      outlined/>
                                            <label class="label font_14">{{ $t('sale_channel') }}</label>
                                            <v-select class=" my-2"
                                                      v-model="invoice.saleChannel"
                                                      :items="saleChannelList"
                                                      item-value="id"
                                                      item-text="name"
                                                      return-object
                                                      disabled
                                                      tage="Sale Channel"
                                                      placeholder="Channel"
                                                      outlined
                                            />
                                            <label class="label font_14">{{ $t('employee') }}</label>
                                            <v-select class="mt-1"
                                                      :items="employees"
                                                      item-value="id"
                                                      disabled
                                                      item-text="name"
                                                      v-model="invoice.employee"
                                                      tage="Employee"
                                                      outlined/>
                                            <label class="label font_14">{{ $t('for_the_month_of') }}</label>
                                            <app-datepicker :initialDate="invoice.monthOf"
                                                            @emitDate="monthOf = $event"/>
                                        </v-col>
                                    </v-row>
                                    <p class="pt-1 mb-0 detial_smallside_p font_14">{{ $t('warranty_desc') }}</p>
                                </div>
                            </v-col>
                        </v-row>

                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true" :alertMessage="loadingAlert"
                       :color="loadingColorAlert" :alertText="loadingTextAlert"/>
        </v-container>
    </v-app>
</template>

<script>
import {i18n} from '@/i18n';
import LoadingMe from '@/components/Loading'
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import InvoiceModel from "@/scripts/invoice/model/Invoice";
import Warranty from '@/scripts/model/Warranty';
import { ShowResource } from '@/observable/store'
import kendo from "@progress/kendo-ui";
const keyField = 'id'
const textField = 'numberName'
const emptyItem = {[textField]: 'loading ...'}
const customerHandler = require("@/scripts/customerHandler")
const invoiceModel = new InvoiceModel({})
const warrantyModel = new Warranty({})
const billingHandler = require('@/scripts/invoice/handler/billingHandler')
const warrantyConditionHandler = require('@/scripts/warrantyConditionHandler')
const warrantyHandler = require('@/scripts/warrantyHandler')
// const $ = require('jquery')
export default {
    name: "CreditPurchase",
    components: {
        'LoadingMe': LoadingMe,
        'app-datepicker': DatePickerComponent,
        'dropdownlist': DropDownList,
    },
    data: () => ({
        isEdit: false,
        // LoadingMe
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        warrantyNo: '',
        alert: false,
        deposite: 1000,
        files: [],
        // Form validation
        valid: true,

        itemLines: [],
        itemLine: [],
        date: new Date().toISOString().substr(0, 10),
        startDate: new Date().toISOString().substr(0, 10),
        templates: [{
            title: 'Draft'
        },
            {
                title: 'Open'
            },
            {
                title: 'Partially Closed'
            },
            {
                title: 'Closed'
            },
        ],
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,

        customerList: [],
        customer: {},
        dataItemKey: 'id',
        textField: 'numberName',
        textFieldInvoice: 'referenceNo',
        defaultItem: {[textField]: 'Select customer...', [keyField]: null},
        cusBaseUrl: customerHandler.search(),
        filter: '',
        invoice: invoiceModel,
        months: new Date().toISOString().substr(0, 10),
        customerProjects: [],
        invoices: [],
        warrantyCondition: [],
        mEmployee: {},
        employees: [],
        requestStarted: false,
        projects: [],
        segments: [],
        locations: [],
        saleChannelList: [],
        warranty: warrantyModel
    }),
    methods: {
        Help(key_search){
            ShowResource(key_search)
        },
        disableEdit() {
            return false
        },
        onChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.customer = value
            this.invoice.customer = value
            window.console.log(value)
            // window.console.log(this.invoice.customer, 'Changed')
            // // this.invoice = value
            // this.invoice.accReceivable = value.hasOwnProperty('accReceivable') ? value.accReceivable : {}
            // this.invoice.paymentTerm = value.hasOwnProperty('paymentTerm') ? value.paymentTerm : {}
            // this.invoice.priceLevel = value.hasOwnProperty('defaultPriceLevel') ? value.defaultPriceLevel : {}
            //
            // this.billingAddress = value.hasOwnProperty('billingAddress') ? value.billingAddress : []
            // this.deliveryAddress = value.hasOwnProperty('deliveryAddress') ? value.deliveryAddress : []
            // if (this.billingAddress.length > 0) {
            //     this.invoice.billingAddress = this.billingAddress[0]
            // }
            // if (this.deliveryAddress.length > 0) {
            //     this.invoice.deliveryAddress = this.deliveryAddress[0]
            // }
            this.onLoadInvoice(value.id)
            // this.loadProjectByCustomer()
            // const creditLimit = value.hasOwnProperty('creditLimit') ? value.creditLimit : 0
            // this.invoice.creditLimit = kendo.parseFloat(creditLimit)
            // window.console.log(value, 'value')
        },
        onLoadWarrantyCondition() {
            warrantyConditionHandler.getAll().then(res => {
                this.warrantyCondition = res.data.data
            })
        },
        async onLoadInvoice(id) {
            await billingHandler.byCustomer(id).then(res => {
                this.invoices = res.data.data
                window.console.log(this.invoices, 'invoice')
            })
        },
        onFilterChange(event) {
            const filter = event.filter.value
            this.requestData(0, filter, this.cusBaseUrl)
            this.filter = filter
        },
        onFilterChangeInvoice() {
            this.onLoadInvoice(this.customer.id)
        },
        afterFetch(json) {
            this.customerList = json.data
        },
        requestData(skip, filter, baseUrl) {
            const url = baseUrl +
                `?filter=${filter}`
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then(this.afterFetch)
        },
        onChangeInvoice(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.invoice = value
            const il = value.itemLines
            il.forEach(i => {
                this.itemLines.push({
                    id: i.id,
                    dateFormat: i.dateFormat,
                    uom: i.uom,
                    qty: i.qty,
                    item: i.item,
                    serialIME: '',
                    conditions: {name: ''},
                    months: 0
                })
            })
            this.onLoadWarrantyCondition()
            this.projects.push(value.project)
            this.employees.push(value.employee)
            this.segments.push(value.segment)
            this.locations.push(value.location)
            this.saleChannelList.push(value.saleChannel)
            window.console.log(this.itemLines, 'il')
            window.console.log(this.invoice)
        },
        UOMTemplate(dataItem) {
            const uom = dataItem.uom
            if (uom) {
                return `<span>${uom.uom ? uom.uom.toUOM.name : ``}</span>`
            } else {
                return ``
            }
        },
        WarrantyCondition(dataItem) {
            const wtc = dataItem.conditions
            if (wtc) {
                return `<span>${wtc ? wtc.name : ``}</span>`
            } else {
                return ``
            }
        },
        TimesheetDateEditor(container, options) {
            kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDatePicker()
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        ConditionDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "id",
                    cascadeFrom: "item",
                    optionLabel: "--- Select ---",
                    dataSource: {data: this.warrantyCondition}
                })
        },
        async getDataSource() {
            let ds = this.$refs.itemLineDS.kendoWidget()
            let dataRow = ds.data()
            this.itemLine = []
            dataRow.forEach(i => {
                this.itemLine.push({
                    id: i.id,
                    dateFormat: i.dateFormat,
                    uom: i.uom,
                    qty: i.qty,
                    item: i.item,
                    serialIME: i.serialIME,
                    conditions: i.conditions,
                    months: i.months
                })
            })
        },
        savePrint() {

        },
        async saveNew() {
            await this.getDataSource()
            this.warranty.customer = this.customer
            this.warranty.warrantyNo = this.warrantyNo
            this.warranty.itemLines = this.itemLine
            this.warranty.date = this.date
            this.warranty.warrantyStartDate = this.startDate
            this.warranty.invoice = this.invoice
            window.console.log(this.itemLine)
            warrantyHandler.save(this.warranty).then(res => {
                window.console.log(res)
            })
        },
        saveClose() {

        },
        removeRow() {
        },
        generateNumber() {

        },
        errorMessage() {

        },
        addRow() {
        },
        accountDropDownEditor() {
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
            }).then((resultCen) => {
                if (resultCen.value) {
                    this.$router.go(-1);
                }
            });
        },
        hide_smallsitebar() {
            if (!this.isHideBar) {
                // this.col_expand = 12
                // this.col_hide = 0
                this.isHideBar = true
            } else {
                // this.col_expand = 9
                // this.col_hide = 3
                this.isHideBar = false
            }
        }
    },
    watch: {
        // call again the method if the route changes

    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        // this.loadObj()
    },
    mounted() {
        this.requestData(0, this.filter, this.cusBaseUrl)
    },
};
</script>
<style scoped>
.small_sidebar {
    height: 95%;
    position: relative;
    padding: 12px;
}

.hide_small_bar_class {
    max-width: 0;
    transition: .5s ease-in;
    flex: 0 0 0;
    padding: 0;
}

.hide_big_bar_class {
    max-width: 100%;
    transition: .5s ease-in;
    flex: 0 0 100%;
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

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.detial_smallside_p {
    position: absolute;
    bottom: 10px;
}

</style>
