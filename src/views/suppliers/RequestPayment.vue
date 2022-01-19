<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white"
                    >
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border mb-1">
                                <h2 class="mb-0 ">{{ $t("payment_request") }}</h2>
                                <v-icon
                                    @click="cancel()"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close
                                </v-icon>
                            </v-card>

                            <v-card outlined dense class="px-3 no_border mb-3" color="white">
                                <v-row style="background: #F8F8F9;">
                                    <v-col
                                        sm="3"
                                        cols="12"
                                        class="kendo_dropdown_custom pt-3 pb-0"
                                    >
                                        <label>{{ $t("vendor_name") }}</label>
                                        <vendor-dropdownlist
                                            :initVendor="requestPayment.supplier"
                                            @emitVendor="requestPayment.supplier = $event"
                                            @onChange="onVendorChanged"
                                        />
                                    </v-col>
                                    <v-col
                                        sm="3"
                                        cols="12"
                                        class="kendo_dropdown_custom pt-3 pb-0"
                                    >
                                        <label>{{ $t("request_date") }}</label>
                                        <app-datepicker
                                            :initialDate="requestPayment.transactionDate"
                                            @emitDate="requestPayment.transactionDate = $event"
                                        />
                                    </v-col>
                                    <v-col sm="4">
                                        <label>{{ $t("number") }}</label>
                                        <div class="d-flex mt-1">
                                            <div class="code_text flex-1 text-bold">
                                                {{ requestPayment.transactionType.abbr }}
                                            </div>

                                            <v-text-field
                                                class=" custom-border flex-2"
                                                v-model="requestPayment.number"
                                                outlined
                                                disabled
                                                :rules="[(v) => !!v || 'Number is required']"
                                                required
                                            />
                                            <v-icon
                                                color="black"
                                                size="30"
                                                style=" height: 40px;"
                                                class="border_qrcode ml-2"
                                                @click="generateNumber"
                                            >mdi-qrcode
                                            </v-icon>
                                        </div>
                                    </v-col>
                                    <v-col sm="1" cols="1" class="pb-0">
                                        <v-btn
                                            color="primary mt-6 white--text"
                                            @click="searchPurchaseOrderExpense"
                                        >
                                            <i
                                                class="b-search"
                                                style="font-size: 15px; color:#fff !important;"
                                            />
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-row style="background: #F8F8F9;"></v-row>
                                <v-row>
                                    <v-col cols="12" class="pt-0">
                                        <template>
                                            <LoadingMe
                                                :isLoading="showLoading"
                                                :fullPage="false"
                                                :myLoading="true"
                                            />
                                            <kendo-datasource
                                                ref="itemLineDS"
                                                :change="onDataSourceChange"
                                                :schema="schemaDefinition"
                                                :data="itemLines"
                                            />
                                            <kendo-grid
                                                id="gridRequestPayment_"
                                                class="grid-function"
                                                :data-source-ref="'itemLineDS'"
                                                ref="gridRequestPayment"
                                                :sortable="false"
                                                :filterable="false"
                                                :column-menu="true"
                                                :editable="true"
                                                :change="onGridRequestChange"
                                                :noRecords="true"
                                            >
                                                <kendo-grid-column
                                                    :locked="true"
                                                    :selectable="true"
                                                    :width="40"
                                                />
                                                <kendo-grid-column
                                                    :field="'billNumber'"
                                                    :title="$t('bill_number')"
                                                    :width="180"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :template="billNumberTmp"
                                                    :locked="true"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'referenceNo'"
                                                    :title="$t('transaction_num')"
                                                    :width="210"
                                                    :hidden="false"
                                                    :locked="true"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :template="referenceNoTmp"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'dueDate'"
                                                    :title="$t('due_date')"
                                                    :width="150"
                                                    :lockable="false"
                                                    :template="formatDate"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'txnNote'"
                                                    :title="$t('note')"
                                                    :width="200"
                                                    :hidden="false"
                                                    :lockable="false"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left; ' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'currencyCode'"
                                                    :title="$t('currency')"
                                                    :width="150"
                                                    :lockable="false"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :template="currency"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :width="150"
                                                    :lockable="false"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :template="amount"
                                                    :attributes="{ style: 'text-align: right' }"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'discount'"
                                                    :title="$t('discount')"
                                                    :editor="discountEditor"
                                                    :template="discount"
                                                    :width="150"
                                                    :lockable="false"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'amountTobePaid'"
                                                    :title="$t('amount_to_be_paid')"
                                                    :width="210"
                                                    :lockable="false"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :template="amountTobePaid"
                                                    :attributes="{ style: 'text-align: right; ' }"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'paidAmount'"
                                                    :title="$t('paid_amount')"
                                                    :width="200"
                                                    :lockable="false"
                                                    :editor="paidAmountEditor"
                                                    :template="paidAmountTmp"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right; ' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'overDue'"
                                                    :title="$t('over_due')"
                                                    :width="130"
                                                    :lockable="false"
                                                    :hidden="true"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :template="overDue"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'paymentTerm'"
                                                    :title="$t('payment_term')"
                                                    :width="200"
                                                    :lockable="false"
                                                    :hidden="true"
                                                    :template="settlementDiscount"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right; ' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'bankReferenceNo'"
                                                    :title="$t('bank_reference_no')"
                                                    :width="180"
                                                    :lockable="false"
                                                    :hidden="true"
                                                    :template="bankReferenceNo"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right; ' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'status'"
                                                    :title="$t('status')"
                                                    :width="150"
                                                    :lockable="false"
                                                    :template="status"
                                                    :hidden="true"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right; ' }"
                                                />
                                            </kendo-grid>
                                        </template>
                                    </v-col>
                                    <v-col sm="12" cols="12" class="pb-0">
                                        <v-row>
                                            <v-col sm="6" cols="12" class=""></v-col>
                                            <v-col sm="6" cols="12">
                                                <v-simple-table>
                                                    <template v-slot:default>
                                                        <tbody>
                                                        <tr>
                                                            <td class="text-left text-uppercase">
                                                                {{ $t("discount") }}
                                                            </td>
                                                            <td class="text-center">:</td>
                                                            <td class="text-left primary--text text-bold">
                                                                {{ numberFormat(requestPayment.discount) }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left text-uppercase">
                                                                {{ $t("exchange_amount") }} -
                                                                {{ baseCurrencyCode }}
                                                            </td>
                                                            <td class="text-center">:</td>
                                                            <td class="text-left primary--text text-bold">
                                                                {{
                                                                    numberFormat(requestPayment.exchangeAmount)
                                                                }}
                                                            </td>
                                                        </tr>
                                                        <tr hidden>
                                                            <td class="text-left text-uppercase">
                                                                {{ $t("dr") }}
                                                            </td>
                                                            <td class="text-center">:</td>
                                                            <td class="text-left primary--text text-bold">
                                                                {{ numberFormat(dr) }}
                                                            </td>
                                                        </tr>
                                                        <tr hidden>
                                                            <td class="text-left text-uppercase">
                                                                {{ $t("cr") }}
                                                            </td>
                                                            <td class="text-center">:</td>
                                                            <td class="text-left primary--text text-bold">
                                                                {{ numberFormat(cr) }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <!-- Payment Options & Position Analysis -->
                                <v-row>
                                    <v-col sm="4" cols="4" class="kendo_dropdown_custom">
                                        <v-card outlined dense class="no_border pa-4" color="grayBg">
                                            <h3 class="mb-1">{{ $t("payment_option_position") }}</h3>
                                            <label>{{ $t("payment_option") }}</label>
                                            <div class="mb-3">
                                                <paymentoption-dropdownlist
                                                    :initPaymentOption="requestPayment.paymentOption"
                                                    :initType="'Supplier'"
                                                    @onChange="onPaymentOptionChanged"
                                                />
                                            </div>

                                            <label>{{ $t("expected_payment_date") }}</label>
                                            <app-datepicker
                                                :initialDate="requestPayment.expectedPaymentDate"
                                                @emitDate="requestPayment.expectedPaymentDate = $event"
                                            />
                                        </v-card>
                                    </v-col>
                                    <v-col sm="4" cols="4" class="kendo_dropdown_custom">
                                        <!-- Fund Position  -->
                                        <v-card outlined dense class="no_border pa-4" color="grayBg" mind>
                                            <h3 class="mb-1">{{ $t("fund_position") }}</h3>
                                            <label>{{ $t("current_balance") }}</label>
                                            <h1 class="font_16 primary--text my-3 text-right">{{ fundBalance }}</h1>

                                            <label>{{ $t("remaining_balance") }}</label>
                                            <h1 class="font_16 primary--text my-3 text-right">
                                                {{ fundRemainBalance }}</h1>
                                        </v-card>
                                    </v-col>
                                    <v-col sm="4" cols="4">
                                        <!-- 	Payable Position  -->
                                        <v-card outlined dense class="no_border pa-4" color="grayBg">
                                            <h3 class="mb-1">{{ $t("payable_position") }}</h3>
                                            <label>{{ $t("current_balance") }}</label>
                                            <v-text-field
                                                outlined
                                                :disabled="true"
                                                v-model="balance"
                                                class="mt-1"
                                            />
                                            <label>{{ $t("remaining_balance") }}</label>
                                            <v-text-field
                                                outlined
                                                :disabled="true"
                                                v-model="vendorRemainingBalance"
                                                class="mt-1"
                                            />
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider class="mt-4"/>
                            <v-card outlined dense class="no_border function_footer">
                                <!--                                <v-menu>-->
                                <!--                                    <template v-slot:activator="{ on }">-->
                                <!--                                        <v-btn-->
                                <!--                                            color="black"-->
                                <!--                                            outlined-->
                                <!--                                            class="mr-2 text-capitalize  black&#45;&#45;text float-left"-->
                                <!--                                            v-on="on"-->
                                <!--                                        >-->
                                <!--                                            {{ $t("select_template") }}-->
                                <!--                                            <v-icon size="" class="ma-1">expand_more</v-icon>-->
                                <!--                                        </v-btn>-->
                                <!--                                    </template>-->
                                <!--                                    <v-list>-->
                                <!--                                        <v-list-item-->
                                <!--                                            v-for="(item, index) in templates"-->
                                <!--                                            :key="index"-->
                                <!--                                        >-->
                                <!--                                            <v-list-item-title>{{ item.title }}</v-list-item-title>-->
                                <!--                                        </v-list-item>-->
                                <!--                                    </v-list>-->
                                <!--                                </v-menu>-->
                                <v-btn
                                    color="black"
                                    class="text-capitalize  white--text float-left"
                                    @click="cancel()"
                                >{{ $t("cancel") }}
                                </v-btn>
                                <!--                                <v-btn-->
                                <!--                                    color="third"-->
                                <!--                                    class="ml-3 float-right text-capitalize  white&#45;&#45;text">-->
                                <!--                                    {{ $t("save_new") }}-->
                                <!--                                </v-btn>-->
                                <v-btn
                                    @click="onSaveClose"
                                    color="primary"
                                    class=" float-right text-capitalize  white--text"
                                >
                                    {{ $t("save_close") }}
                                </v-btn>
                            </v-card>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import {i18n} from "@/i18n";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import supplierHandler from "@/scripts/supplierHandler";
import journalHandler from "@/scripts/journalHandler";
import RequestPaymentModel from "@/scripts/request-payment/model/RequestPayment";
import ItemLineModel from "@/scripts/request-payment/model/ItemLine";
import kendo from "@progress/kendo-ui";
import billingHandler from "@/scripts/invoice/handler/billingHandler";
import prefixHandler from "@/scripts/prefixHandler";
import purchaseFormContentHandler from "@/scripts/purchaseFormContentHandler";
import settingHandler from "@/scripts/settingsHandler";
import {CurrencyModel, PaymentTermModel} from "@/scripts/model/AppModels";
import PaymentOptionModel from "@/scripts/model/PaymentOption";
import AccountMappingModel from "@/scripts/account-map/Account";
import SupplierModel from "@/scripts/model/Supplier";
import Helper from "@/helper";

const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const requestPaymentModel = new RequestPaymentModel({});
const itemLineModel = new ItemLineModel({});

const OPTION_TYPE = "Supplier";
const TRANSACTION_TYPE = "Request Payment";
const TXN_TYPE = "request payment";

export default {
    name: "RequestPayment",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": DatePickerComponent,
        "vendor-dropdownlist": () =>
            import("@/components/dropdownlist/VendorDropdown"),
        "paymentoption-dropdownlist": () =>
            import("@/components/dropdownlist/PaymentOptionDropDownList"),
    },
    data: () => ({
        showLoading: false,
        customerList: [],
        group: [],
        suppliers: [],
        customer: {},
        overDueAmount: 0,
        receivableBalance: 0,
        tobeCollected: 0,
        valid: true,
        template: [],
        templates: [],
        itemLines: [],
        transactionTypes: [],
        receivableList: [],
        requestPayment: requestPaymentModel,
        itemLine: itemLineModel,
        supBaseUrl: supplierHandler.search(),
        selectedExpenseIds: [],
        purchaseFormContent: {},
        balance: 0,
        jRaw: [],
        txnList: [],
        gainLossAcc: {},
        otherRevenueAcc: {},
        gainOrLossDescription: "gain/loss on exchange rate",
        penaltyDescription: "penalty",
        baseCurrencyCode: "",
        loggedUser: {
            id: cookie.creator,
            name: cookie.email,
        },
        cr: 0,
        dr: 0,
        fundBalance: 0,
        vendorRemainingBalance: 0,
        fundRemainBalance: 0,
        schemaDefinition: {
            model: {id: "lineId"},
        },
        isCheckChanged: false,
    }),
    methods: {
        onVendorChanged(value) {
            this.requestPayment.supplier = value;
            const supplier = this.requestPayment.supplier || {};
            const supplierId = supplier.id || "";
            if (supplierId) {
                this.loadVendorBalance(supplierId);
            }
        },
        cancel() {
            this.$swal({
                title: i18n.t("msg_title_warning"),
                text: i18n.t("msg_discard"),
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: i18n.t("cancel"),
                confirmButtonColor: "#4d4848",
                cancelButtonColor: "#ED1A3A",
                confirmButtonText: i18n.t("discard"),
            }).then((result) => {
                if (result.value) {
                    this.$router.go(-1);
                }
            });
        },
        currency(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("currencyCode")) {
                    return dataItem.currencyCode;
                }
            }
            return "";
        },
        referenceNoTmp(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("referenceNo")) {
                    return dataItem.referenceNo;
                }
            }
            return "";
        },
        billNumberTmp(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("billNumber")) {
                    return dataItem.billNumber;
                }
            }
            return "";
        },
        paidAmountTmp(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("paidAmount")) {
                    return kendo.toString(dataItem.paidAmount, dataItem.decimalFormat);
                }
            }
            return "";
        },
        amountTobePaid(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("amountTobePaid")) {
                    return kendo.toString(
                        dataItem.amountTobePaid,
                        dataItem.decimalFormat
                    );
                }
            }
            return "";
        },
        discount(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("discount")) {
                    const discount = dataItem.discount || 0;
                    return kendo.toString(discount, dataItem.decimalFormat);
                }
            }
            return 0;
        },
        amount(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("amount")) {
                    const amount = dataItem.amount || 0;
                    return kendo.toString(amount, dataItem.decimalFormat);
                }
            }
            return 0;
        },
        bankReferenceNo(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("overDue")) {
                    return dataItem.bankReferenceNo;
                }
            }
            return "";
        },
        overDue(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("overDue")) {
                    return dataItem.overDue;
                }
            }
            return 0;
        },
        paidAmountEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 5,
                    format: `n${this.purchaseFormContent.decimal}`,
                    min: 0,
                });
        },
        discountEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 30,
                    format: `n${this.purchaseFormContent.decimal}`,
                    min: 0,
                });
        },
        onTransactionDateChanged() {
            if (this.requestPayment.supplier) {
                const supplier = this.requestPayment.supplier || {};
                const supId = supplier.id || "";
                if (supId) {
                    this.generateNumber();
                    this.searchPurchaseOrderExpense();
                }
            }
        },
        generateNumber() {
            if (this.$route.params.id) {
                const tranDate = new Date(this.requestPayment.transactionDate);
                const tranDateReceipt = new Date(this.requestPayment.transactionDate);
                const tranDateM = tranDate.getFullYear() + tranDate.getMonth();
                const tranDateReceiptM =
                    tranDateReceipt.getFullYear() + tranDateReceipt.getMonth();
                if (tranDateM === tranDateReceiptM) {
                    this.requestPayment.referenceNo = this.referenceNo;
                    return;
                }
            }
            // window.console.log("abbr", this.requestPayment.transactionType);
            if (this.requestPayment.transactionDate !== "") {
                let data = {
                    abbr: this.requestPayment.transactionType.abbr,
                    structure: this.requestPayment.transactionType.structure,
                    transactionDate: new Date(this.requestPayment.transactionDate)
                        .toISOString()
                        .substr(0, 10),
                    prefixSeparator: this.requestPayment.transactionType.prefixSeparator || '',
                    numberSeparator: this.requestPayment.transactionType.numberSeparator || '',
                    format: this.requestPayment.transactionType.format || 5,
                    sequcencing: this.requestPayment.transactionType.sequcencing,
                    type: TRANSACTION_TYPE,
                    entity: 1,
                };
                billingHandler
                    .lastNumber(data)
                    .then((response) => {
                        if (response.data.statusCode === 200) {
                            const res = response.data.data;
                            const lastNumber = this.zeroPad(
                                parseInt(res.lastNumber),
                                this.requestPayment.transactionType.format
                            );
                            const number =
                                res.suffix +
                                this.requestPayment.transactionType.numberSeparator +
                                lastNumber;
                            this.requestPayment.number = number;
                            if (
                                this.requestPayment.transactionType.hasOwnProperty(
                                    "prefixSeparator"
                                )
                            ) {
                                const prefixSep = this.requestPayment.transactionType
                                    .prefixSeparator;
                                this.requestPayment.referenceNo =
                                    this.requestPayment.transactionType.abbr + prefixSep + number;
                            }
                        }
                    })
                    .catch((e) => {
                        this.errors.push(e);
                    });
            }
        },
        zeroPad(num, places) {
            return String(num).padStart(places, "0");
        },
        removeDuplicate(array) {
            const result = [];
            const map = new Map();
            for (const item of array) {
                if (!map.has(item.id)) {
                    map.set(item.id, true); // set any value to Map
                    result.push(item);
                }
            }
            return result;
        },
        formatDate(dataItem) {
            if (dataItem.hasOwnProperty("dueDate")) {
                return kendo.toString(new Date(dataItem.dueDate), dataItem.dateFormat);
            }
            return "";
        },
        settlementDiscount(dataItem) {
            if (dataItem.hasOwnProperty("paymentTerm")) {
                return dataItem.paymentTerm.name || "";
            }
            return "";
        },
        status(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("status")) {
                    const status = dataItem.status;
                    let statusText = "";
                    switch (status) {
                        case 1:
                            statusText = "OPEN";
                            break;
                        case 2:
                            statusText = "Partially Paid";
                            break;
                        case 4:
                            statusText = "VOID";
                            break;
                        case 3:
                            statusText = "PAID";
                            break;
                    }
                    return statusText;
                }
            }
            return "";
        },
        onPaymentOptionChanged(value) {
            this.requestPayment.paymentOption = value;
            const account = value.account || {};
            const accountId = account.uuid || "";
            if (accountId) {
                let currentFiscalDate = Helper.getFiscalDateByDate(new Date());
                let startDate = currentFiscalDate.start_date;
                const strParam = {
                    params: {
                        start_date:
                            kendo.toString(new Date(startDate), "yyyy-MM-dd") +
                            "T00:00:00.000Z",
                        end_date:
                            kendo.toString(
                                new Date(this.requestPayment.transactionDate),
                                "yyyy-MM-dd"
                            ) + "T23:59:59.999Z",
                    },
                };
                this.loadEntryDetailByAccount(accountId, strParam);
            }
            // window.console.log(value, "paymentOption");
        },
        async loadPrefix() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    prefixHandler.get(TXN_TYPE).then((res) => {
                        if (res.data.statusCode === 200) {
                            const response = res.data.data;
                            this.transactionTypes = response;
                            if (response.length > 0) {
                                this.requestPayment.transactionType = response[0];
                                if (!this.$route.params.id) {
                                    this.generateNumber();
                                }
                            }
                        }
                    });
                }, 10);
            });
        },
        async searchPurchaseOrderExpense() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    let data = {};
                    this.showLoading = true;
                    const supplier = this.requestPayment.supplier || {};
                    data = {
                        search: supplier.id || "",
                        type: "Vendor",
                        transactionDate: new Date(this.requestPayment.transactionDate)
                            .toISOString()
                            .substr(0, 10),
                    };
                    this.itemLines = [];
                    if (data.search) {
                        if (data.search.length > 4) {
                            this.showLoading = true;
                            try {
                                billingHandler.searchCashPayment(data).then((res) => {
                                    this.showLoading = false;
                                    if (res.data.statusCode === 200) {
                                        const response = res.data.data;
                                        const result = res.data.result;
                                        this.showLoading = false;
                                        if (response.length > 0) {
                                            this.itemLines = response;
                                            const obj = response[0];
                                            if (obj.hasOwnProperty("supplier")) {
                                                this.requestPayment.supplier = obj.supplier;
                                                if (obj.supplier.hasOwnProperty("name")) {
                                                    this.name = obj.supplier.name;
                                                }
                                            }
                                        }
                                        const baseCurrency = result;
                                        this.baseCurrency = baseCurrency;
                                        this.requestPayment.currency = new CurrencyModel(
                                            baseCurrency
                                        );
                                        if (baseCurrency) {
                                            if (baseCurrency.hasOwnProperty("code")) {
                                                this.baseCurrencyCode = baseCurrency.code;
                                                // if (code) {
                                                //     this.loadTransactionRate(baseCurrency.code)
                                                // }
                                            }
                                        }
                                    }
                                });
                            } catch (e) {
                                this.showLoading = false;
                            }
                        } else {
                            this.showLoading = false;
                        }
                    } else {
                        this.showLoading = false;
                    }
                }, 10);
            });
        },
        onGridRequestChange() {
            const grid = this.$refs.gridRequestPayment.kendoWidget();
            this.selectedExpenseIds = grid.selectedKeyNames();
            // let ds = this.$refs.itemLineDS.kendoWidget()
            // this.isCheckChanged = true
            // const rows = ds.data();
            // rows.forEach((value) => {
            //     if (~this.selectedExpenseIds.indexOf(value.lineId)) {
            //         // window.console.log(value, 'value')
            //         if (value.paidAmount === 0) {
            //             const tobePaid = value.amountTobePaid || 0
            //             value.set('paidAmount', tobePaid)
            //         }
            //     }
            // })
            // this.$refs.gridRequestPayment.kendoWidget().read()
            // this.isCheckChanged = false
            this.autoCalculate();
        },
        onDataSourceChange(e) {
            let amtTobePaid = 0,
                amount = 0,
                discount = 0,
                paidAmount = 0;
            let dataRow = e.items[0] || {};
            if (Object.keys(dataRow).length > 0) {
                dataRow.set("optionType", OPTION_TYPE);
            }
            if (e.field) {
                let dataRow = e.items[0];
                switch (e.field) {
                    case "discount":
                        amount = dataRow.amount || 0;
                        discount = dataRow.discount || 0;
                        if (discount > amount) {
                            dataRow.set("discount", amount);
                        }
                        dataRow.set(
                            "amountTobePaid",
                            parseFloat(dataRow.amount) - parseFloat(dataRow.discount || 0)
                        );
                        dataRow.set(
                            "exchangeDiscount",
                            parseFloat(dataRow.discount) * parseFloat(dataRow.rateTobase || 1)
                        );
                        dataRow.set(
                            "exchangeDiscountTxn",
                            parseFloat(dataRow.discount) * parseFloat(dataRow.txnRate || 1)
                        );
                        amtTobePaid = parseFloat(dataRow.amountTobePaid || 0);
                        paidAmount = parseFloat(dataRow.paidAmount || 0);
                        if (paidAmount > amtTobePaid) {
                            paidAmount = amtTobePaid;
                            dataRow.set("paidAmount", parseFloat(paidAmount));
                            dataRow.set(
                                "paidAmountTobase",
                                parseFloat(paidAmount) * parseFloat(dataRow.rateTobase || 1)
                            );
                            dataRow.set(
                                "paidAmountTxn",
                                paidAmount * parseFloat(dataRow.txnRate || 1)
                            );
                        }
                        break;
                    case "paidAmount":
                        // if (this.isCheckChanged === false) {
                        amtTobePaid = parseFloat(dataRow.amountTobePaid || 0);
                        paidAmount = parseFloat(dataRow.paidAmount || 0);
                        if (paidAmount > amtTobePaid) {
                            paidAmount = amtTobePaid;
                        }
                        dataRow.set("paidAmount", parseFloat(paidAmount));
                        dataRow.set(
                            "paidAmountTobase",
                            parseFloat(paidAmount) * parseFloat(dataRow.rateTobase || 1)
                        );
                        dataRow.set(
                            "paidAmountTxn",
                            paidAmount * parseFloat(dataRow.txnRate || 1)
                        );
                        // }
                        break;
                    default:
                        break;
                }

                this.purchaseTxn();
                this.autoCalculate();
            }
        },
        async loadSaleFormContent() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    purchaseFormContentHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data;
                            if (data.length > 0) {
                                this.purchaseFormContent = data[0];
                            }
                        }
                    });
                }, 10);
            });
        },
        async loadVendorBalance(id) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = id + "?type=bal";
                    this.requestPayment.vendorBalance = 0;
                    billingHandler.balance(strFilter).then((res) => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data;
                            if (data.length > 0) {
                                this.requestPayment.vendorBalance = data[0].balance;
                                this.balance = this.numberFormat(data[0].balance);
                            }
                        }
                    });
                }, 10);
            });
        },
        numberFormat(value) {
            return kendo.toString(value, `n${this.purchaseFormContent.decimal}`);
        },
        autoCalculate() {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                receiptAmount = 0,
                discount = 0,
                convertedAmount = 0,
                exchangeDiscount = 0,
                exchangeDiscountTxn = 0,
                paidAmountTxn = 0;
            this.jRaw = [];
            const rows = ds.data().filter((n) => n.paidAmount > 0 || n.discount > 0);
            rows.forEach((value) => {
                if (~this.selectedExpenseIds.indexOf(value.lineId)) {
                    let nature = "",
                        purchaseRate = 0,
                        paymentRate = 0,
                        rawPaidAmount = 0,
                        rawDiscountAmount = 0,
                        currencyCode = "";
                    let discountAmount = 0,
                        apAmount = 0,
                        refNo = "",
                        payOption = {},
                        currency = {},
                        gainLoss = 0,
                        lastXRate = {},
                        location = {},
                        segment = {},
                        project = {},
                        locationId = "",
                        segmentId = "",
                        projectId = "",
                        txnId = "",
                        invRate = 1;
                    if (value.referenceNo) {
                        refNo = value.referenceNo;
                    }
                    if (value.id) {
                        txnId = value.id || "";
                    }
                    if (value.txnRate) {
                        purchaseRate = parseFloat(value.txnRate);
                    }
                    if (value.currencyCode) {
                        currencyCode = value.currencyCode || "";
                    }
                    if (value.currency) {
                        currency = value.currency || {};
                    }
                    if (value.location) {
                        location = value.location || {};
                        if (location.hasOwnProperty("id")) {
                            locationId = location.id;
                        }
                    }
                    if (value.segment) {
                        segment = value.segment || {};
                        if (segment.hasOwnProperty("id")) {
                            segmentId = segment.id;
                        }
                    }
                    if (value.project) {
                        project = value.project || {};
                        if (project.hasOwnProperty("id")) {
                            projectId = project.id;
                        }
                    }
                    if (value.exchangeRate) {
                        lastXRate = value.exchangeRate || {};
                    }
                    if (value.txnRate) {
                        invRate = parseFloat(value.txnRate);
                    }
                    if (value.rateTobase) {
                        paymentRate = parseFloat(value.rateTobase);
                    }
                    if (value.paidAmount) {
                        receiptAmount += kendo.parseFloat(value.paidAmount);
                        convertedAmount +=
                            kendo.parseFloat(value.paidAmount) * value.rateTobase;
                        paidAmountTxn += kendo.parseFloat(value.paidAmount) * invRate;
                        // paidAmt = kendo.parseFloat(value.paidAmount) * purchaseRate
                        rawPaidAmount = kendo.parseFloat(value.paidAmount);
                    }
                    if (value.discount) {
                        // discount += kendo.parseFloat(value.discount)
                        discount += kendo.parseFloat(value.discount) * value.rateTobase;
                        exchangeDiscount +=
                            kendo.parseFloat(value.exchangeDiscount) * value.rateTobase;
                        exchangeDiscountTxn += kendo.parseFloat(value.discount) * invRate;
                        discountAmount = kendo.parseFloat(value.discount) * paymentRate;
                        rawDiscountAmount = kendo.parseFloat(value.discount);
                    }
                    // todo: gain or loss exchange rate
                    gainLoss =
                        parseFloat(
                            (purchaseRate - paymentRate) * (rawPaidAmount + rawDiscountAmount)
                        ) * -1;
                    if (gainLoss !== 0) {
                        if (gainLoss > 0) {
                            nature = "dr";
                        } else {
                            nature = "cr";
                        }
                        window.console.log("gainLoss", gainLoss);
                        if (gainLoss) {
                            if (this.gainLossAcc.hasOwnProperty("id")) {
                                this.jRaw.push({
                                    id:
                                        this.gainLossAcc.id +
                                        "-" +
                                        nature +
                                        "-" +
                                        currencyCode +
                                        "-" +
                                        purchaseRate +
                                        "-" +
                                        locationId +
                                        "-" +
                                        projectId +
                                        "-" +
                                        segmentId +
                                        "-" +
                                        txnId,
                                    txnId: txnId,
                                    project: project,
                                    location: location,
                                    segment: segment,
                                    projectId: projectId,
                                    locationId: locationId,
                                    segmentId: segmentId,
                                    currencyCode: currencyCode,
                                    currency: currency,
                                    lastXRate: lastXRate,
                                    line: new ItemLineModel(value),
                                    receiptRate: gainLoss > 0 ? paymentRate : purchaseRate,
                                    description: this.gainOrLossDescription,
                                    account: this.gainLossAcc,
                                    accountId: this.gainLossAcc.id,
                                    amount: 0,
                                    exchangeAmount: gainLoss,
                                    type: nature,
                                    typeAs: "GainOrLoss",
                                });
                            }
                        }
                    }
                    //Todo: AP  Dr
                    apAmount = rawPaidAmount + rawDiscountAmount;
                    if (apAmount > 0) {
                        nature = "dr";
                    } else {
                        nature = "cr";
                    }
                    if (value.hasOwnProperty("apAcc")) {
                        const apAcc = value.apAcc;
                        if (apAcc) {
                            if (apAcc.hasOwnProperty("id")) {
                                this.jRaw.push({
                                    id:
                                        apAcc.id +
                                        "-" +
                                        nature +
                                        "-" +
                                        currencyCode +
                                        "-" +
                                        purchaseRate +
                                        "-" +
                                        locationId +
                                        "-" +
                                        projectId +
                                        "-" +
                                        segmentId +
                                        "-" +
                                        txnId,
                                    txnId: txnId,
                                    project: project,
                                    location: location,
                                    segment: segment,
                                    projectId: projectId,
                                    locationId: locationId,
                                    segmentId: segmentId,
                                    currencyCode: currencyCode,
                                    currency: currency,
                                    lastXRate: lastXRate,
                                    line: new ItemLineModel(value),
                                    receiptRate: purchaseRate,
                                    description: refNo,
                                    account: apAcc,
                                    accountId: apAcc.id,
                                    amount: apAmount,
                                    exchangeAmount: apAmount * purchaseRate,
                                    type: nature,
                                    typeAs: "AP",
                                });
                            }
                        }
                    }
                    //Todo: Cash Account  CR
                    if (this.requestPayment.paymentOption) {
                        payOption = this.requestPayment.paymentOption;
                        const cashAmount = rawPaidAmount * -1; //+ ((purchaseRate - paymentRate) * (rawPaidAmount + rawDiscountAmount))
                        // const cashAmount = rawPaidAmount + (gainLoss ) + rawPaidAmount
                        if (cashAmount > 0) {
                            nature = "dr";
                        } else {
                            nature = "cr";
                        }
                        if (payOption.hasOwnProperty("account")) {
                            const payOptionAcc = payOption.account;
                            if (payOptionAcc.hasOwnProperty("id")) {
                                this.jRaw.push({
                                    id:
                                        payOptionAcc.id +
                                        "-" +
                                        nature +
                                        "-" +
                                        currencyCode +
                                        "-" +
                                        purchaseRate +
                                        "-" +
                                        locationId +
                                        "-" +
                                        projectId +
                                        "-" +
                                        segmentId +
                                        "-" +
                                        txnId,
                                    txnId: txnId,
                                    project: project,
                                    location: location,
                                    segment: segment,
                                    projectId: projectId,
                                    locationId: locationId,
                                    segmentId: segmentId,
                                    currencyCode: currencyCode,
                                    currency: currency,
                                    lastXRate: lastXRate,
                                    line: new ItemLineModel(value),
                                    receiptRate: purchaseRate,
                                    description: refNo,
                                    account: payOptionAcc,
                                    accountId: payOptionAcc.id,
                                    amount: cashAmount,
                                    exchangeAmount: cashAmount * paymentRate,
                                    type: nature,
                                    typeAs: "CashAccount",
                                });
                            }
                        }
                    }
                    //Todo: Settlement Discount  Cr
                    if (value.paymentTerm) {
                        const settlementDisc = value.paymentTerm;
                        if (discountAmount > 0) {
                            if (discountAmount * -1 > 0) {
                                nature = "dr";
                            } else {
                                nature = "cr";
                            }
                            // window.console.log(settlementDisc, "settlementDisc");
                            if (settlementDisc.hasOwnProperty("account")) {
                                const settlementDiscAcc = settlementDisc.account;
                                if (settlementDiscAcc.hasOwnProperty("id")) {
                                    this.jRaw.push({
                                        id:
                                            settlementDiscAcc.id +
                                            "-" +
                                            nature +
                                            "-" +
                                            currencyCode +
                                            "-" +
                                            purchaseRate +
                                            "-" +
                                            locationId +
                                            "-" +
                                            projectId +
                                            "-" +
                                            segmentId +
                                            "-" +
                                            txnId,
                                        txnId: txnId,
                                        project: project,
                                        location: location,
                                        segment: segment,
                                        projectId: projectId,
                                        locationId: locationId,
                                        segmentId: segmentId,
                                        currencyCode: currencyCode,
                                        currency: currency,
                                        lastXRate: lastXRate,
                                        line: new ItemLineModel(value),
                                        receiptRate: paymentRate,
                                        description: "Purchase Payment Discount",
                                        account: settlementDiscAcc,
                                        accountId: settlementDiscAcc.id,
                                        amount: rawDiscountAmount * -1,
                                        exchangeAmount: discountAmount * -1,
                                        type: nature,
                                        typeAs: "Settlement Discount",
                                    });
                                }
                            }
                        }
                    }
                }
            });
            // this.invoiceTxn(txnIds)

            this.requestPayment.total = receiptAmount;
            this.requestPayment.exchangeAmount = convertedAmount;
            this.requestPayment.discount = discount;
            this.requestPayment.exchangeDiscount = exchangeDiscount;
            this.requestPayment.paidAmountTxn = paidAmountTxn;
            this.requestPayment.exchangeDiscountTxn = exchangeDiscountTxn;
            this.requestPayment.fundRemainBalance =
                parseFloat(this.requestPayment.fundBalance || 0) -
                parseFloat(convertedAmount);
            this.requestPayment.vendorRemainingBalance =
                parseFloat(this.requestPayment.vendorBalance || 0) -
                (parseFloat(convertedAmount) + discount);

            this.vendorRemainingBalance = this.numberFormat(
                parseFloat(this.requestPayment.vendorBalance || 0) -
                (parseFloat(convertedAmount) + discount)
            );
            this.fundRemainBalance = this.numberFormat(
                parseFloat(this.requestPayment.fundBalance || 0) -
                parseFloat(convertedAmount)
            );
            this.shrinkData(this.jRaw);
            window.console.log("aa", rows);
        },
        shrinkData(obj) {
            const uniques = this.removeDuplicate(obj);
            uniques.forEach((n) => {
                const found = obj.filter((m) => m.id === n.id);
                let amount = 0,
                    exchangeAmount = 0;
                found.forEach((z) => {
                    amount += parseFloat(z.amount || 0);
                    exchangeAmount += parseFloat(z.exchangeAmount || 0);
                });
                n.exchangeAmount = parseFloat(exchangeAmount); //this.numberFormat(amount)
                n.amount = parseFloat(amount); //parseFloat(parseFloat(amount / parseFloat(n.receiptRate))) //this.numberFormat(amount * parseFloat(this.invoice.txnRate)) //.toFixed(this.saleFormContent.decimal)
            });
            this.jRaw = uniques;
            let dr = 0,
                cr = 0;
            this.jRaw.forEach((j) => {
                switch (j.type) {
                    case "cr":
                        cr += parseFloat(j.exchangeAmount);
                        break;
                    case "dr":
                        dr += parseFloat(j.exchangeAmount);
                        break;
                    default:
                        break;
                }
            });
            // window.console.log(JSON.stringify(this.jRaw), 'uniques')
            const txnId = this.jRaw.map((o) => o.txnId);
            const uSet = new Set(txnId);
            const uniqueSet = [...uSet];
            let jRaws = [];
            // window.console.log(JSON.stringify(uniqueSet), 'uniques')
            uniqueSet.forEach((n) => {
                const found = this.jRaw.filter((m) => m.txnId === n);
                const line = found[0].line;
                const refNo = line.referenceNo;
                jRaws.push({
                    id: n,
                    currencyCode: found[0].currencyCode,
                    projectId: found[0].projectId,
                    segmentId: found[0].segmentId,
                    locationId: found[0].locationId,
                    referenceNo: refNo || "",
                    entries: found,
                });
            });
            this.jRaw = jRaws;
            this.dr = dr;
            this.cr = cr;
            window.console.log("dr=", dr, "cr=", cr, "dr+cr = ", dr + cr);
            window.console.log(jRaws, "uniques");
        },
        purchaseTxn() {
            let txnIds = [],
                ids = [];
            this.itemLines.forEach((value) => {
                if (value.id) {
                    txnIds.push({
                        id: value.id,
                        status: 1,
                    });
                }
            });
            ids = Object.values(txnIds.reduce((r, o) => ((r[o.id] = o), r), {}));
            ids.forEach((m) => {
                const lines = this.itemLines.filter((n) => n.id === m.id);
                let paidAmt = 0;
                let amountTobePaid = 0;
                lines.forEach((x) => {
                    if (x.paidAmount) {
                        paidAmt += x.paidAmount;
                    }
                    if (x.amountTobePaid) {
                        amountTobePaid += x.amountTobePaid;
                    }
                });
                const pAmt = this.numberFormat(paidAmt);
                const amtTobePaid = this.numberFormat(amountTobePaid);
                if (pAmt === amtTobePaid) {
                    m["status"] = 3; //Paid
                } else {
                    m["status"] = 2; // Partially Paid
                }
            });
            this.txnList = ids;
        },
        async loadOtherAccount() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    settingHandler
                        .getOtherAccount()
                        .then((res) => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                const response = res.data.data;
                                const data = response.filter(
                                    (o) => o.banhjiAccCode === "740010"
                                );
                                if (data.length > 0) {
                                    this.gainLossAcc = data[0].account;
                                }
                                const data_ = response.filter(
                                    (o) => o.banhjiAccCode === "740040"
                                );
                                if (data_.length > 0) {
                                    this.otherRevenueAcc = data_[0].account;
                                }
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 10);
            });
        },
        async onSaveClose() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                return;
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    let itemLineDS = this.$refs.itemLineDS.kendoWidget();
                    let itemLines = [];
                    const supplier = this.requestPayment.supplier || {};
                    itemLineDS
                        .data()
                        .filter((n) => n.paidAmount > 0 || n.discount > 0)
                        .map((n) => {
                            if (~this.selectedExpenseIds.indexOf(n.lineId)) {
                                const currency = n.currency || {};
                                n["paymentOption"] = new PaymentOptionModel(
                                    n.paymentOption || {}
                                );
                                n["paymentTerm"] = new PaymentTermModel(n.paymentTerm || {});
                                n["currency"] = new CurrencyModel(n.currency || {});
                                n["currencyCode"] = currency.code || "";
                                n["apAcc"] = new AccountMappingModel(n.apAcc || {});
                                n["supplier"] = new SupplierModel(supplier);
                                n["id"] = n["txnId"];
                                itemLines.push(new ItemLineModel(n));
                            }
                        });
                    if (itemLines.length > 0) {
                        let isAutoGenerate = 1;
                        //todo: match Request Payment model
                        this.requestPayment["itemLines"] = itemLines;
                        this.requestPayment["type"] = TRANSACTION_TYPE;
                        this.requestPayment["isAutoGenerate"] = isAutoGenerate;
                        this.requestPayment["actionType"] = this.$route.params.id
                            ? this.$route.query.type
                            : "new";
                        this.requestPayment["loggedUser"] = this.loggedUser;

                        this.showLoading = true;
                        // window.console.log('this.itemLines', itemLines)
                        // window.console.log('this.itemLines', JSON.stringify(itemLines))
                        billingHandler
                            .createRequestPayment(
                                new RequestPaymentModel(this.requestPayment)
                            )
                            .then((response) => {
                                if (response.data.statusCode === 201) {
                                    // this.close(response.data.data)
                                    this.showLoading = false;
                                    this.$snotify.success("Successfully");
                                    this.clear();
                                    window.history.go(-1);
                                }
                            })
                            .catch((e) => {
                                this.showLoading = false;
                                this.$snotify.error("Something went wrong");
                                this.errors.push(e);
                            });
                    }
                }, 20);
            });
        },
        clear() {
            this.id = undefined;
            this.requestPayment = new RequestPaymentModel({});
            this.itemLines = [];
            this.requestPayment.transactionType = this.transactionTypes[0];
            this.generateNumber();
        },
        async loadEntryDetailByAccount(id, params) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    journalHandler.getEntryDetailByAccount(id, params).then((res) => {
                        // if (res.data.statusCode === 200) {
                        this.showLoading = false;
                        this.requestPayment.fundBalance = res.ending_balance || 0;
                        this.fundBalance = this.numberFormat(res.ending_balance || 0);
                        this.fundRemainBalance = this.numberFormat(
                            parseFloat(res.ending_balance || 0) -
                            parseFloat(this.requestPayment.exchangeAmount)
                        );
                        this.requestPayment.fundRemainBalance =
                            parseFloat(res.ending_balance || 0) -
                            parseFloat(this.requestPayment.fundBalance);
                        // } else {
                        //     this.showLoading = true;
                        // }
                    });
                }, 10);
            });
        },
    },
    mounted: async function () {
        // this.loadSuppliers()
        // this.loadVendors('', this.supBaseUrl)
        await this.loadPrefix();
        await this.loadSaleFormContent();
        await this.loadOtherAccount();
    },
    computed: {},
};
</script>

<style scoped>
.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:not(:last-child)
> td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:not(:last-child)
> th:not(.v-data-table__mobile-row) {
    border-bottom: thin solid #dfdfdf;
}

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:last-child
td {
    border-bottom: thin solid #dfdfdf;
}

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:first-child
td {
    border-top: thin solid #dfdfdf;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
}

@media (min-width: 1264px) {
    .container {
        max-width: 1280px !important;
    }
}
</style>
