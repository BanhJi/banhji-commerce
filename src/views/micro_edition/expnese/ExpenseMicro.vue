<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white"
                        
                    >
                        <v-row>
                            <v-col
                                class="bigSide pr-2 py-0"
                                sm="12"
                                cols="12"
                                style="transition: 0.3s ease-in"
                                :class="{ hide_big_bar_class: isHideBar }"
                                
                            >
                                        
                                        
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">
                                            {{ $t("expenses") }}
                                        </h2>
                                        <v-icon
                                            @click="cancel()"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right mt-n1">close
                                        </v-icon> 
                                        <!-- <span  class="pointer float-right help" @click="Help('expenses')">
                                            {{ $t("help") }}
                                        </span> -->
                                    </v-card>
                                    <v-card outlined dense class="px-3 rounded-4 no_border" color="grayBg">
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{ $t("supplier") }}</label>
                                                <app-supplier-dropdownlist
                                                    :initSupplier="supplier"
                                                    @emitSupplier="supplier = $event"
                                                    @onChanged="onVendorChanged"
                                                />

                                                <label class="label" style="">{{
                                                        $t("transaction_date")
                                                    }}</label>
                                                <app-datepicker
                                                    :initialDate="expense.expense_date"
                                                    :disabled="disableMe"
                                                    @emitDate="expense.expense_date = $event"
                                                    @onChanged="onDateChanges"
                                                />

                                                <label class="label">{{
                                                        $t("suppliers_invoice_no")
                                                    }}</label>
                                                <v-text-field
                                                    class="mt-1"
                                                    v-model="expense.bill_number"
                                                    outlined
                                                />
                                       
                                                <v-radio-group
                                                    class="mt-0 custom-radio"
                                                    @change="onUseForOptionChanges"
                                                    v-model="expense.use_for_option"
                                                    row
                                                >
                                                    <v-radio :label="$t('credit')" :value="0"/>
                                                    <v-radio :label="$t('cash')" :value="3"/>

                                                </v-radio-group>
                         
                                            </v-col>

                                            <v-col sm="4" cols="12">
                                                <label class="label">{{ $t("vendor_invoice_date") }}</label>
                                                <app-datepicker
                                                    :initialDate="expense.bill_date"
                                                    @emitDate="expense.bill_date = $event"
                                                />

                                                <label class="label">{{ $t("number") }}</label>
                                                <v-row class="mt-1 mr-0">
                                                    <v-col sm="10" cols="10" class="py-0 pr-0 pr-1">
                                                        <v-text-field
                                                            :rules="[(v) => !!v || 'Number is required']"
                                                            v-model="expense.number"
                                                            outlined
                                                            readonly
                                                            required
                                                        />
                                                    </v-col>
                                                    <v-col sm="2" cols="2" class="py-0 px-0">
                                                        <v-icon
                                                            color="black"
                                                            size="30"
                                                            class="border_qrcode"
                                                            @click="generateNumber"
                                                        >mdi-qrcode
                                                        </v-icon>
                                                    </v-col>
                                                </v-row>
                                                <label class="label">{{ $t("bill_currency") }}</label>
                                                <app-currency-dropdownlist
                                                    :initCurrency="currency"
                                                    @emitCurrency="currency = $event"
                                                    @onChanged="getExchangeRate"
                                                />

                                          
                                        
                                            </v-col>
                                            <v-col class="pb-0" sm="4" cols="12">
                                                <label class="label">{{ $t("term") }}</label>
                                                <app-payment-term-purchase-dropdownlist
                                                    :initPaymentTerm="paymentTerm"
                                                    @emitPaymentTerm="paymentTerm = $event"
                                                    @onChanged="onDueDateChanged"
                                                />

                                                <label class="label">{{ $t("due_date") }}</label>
                                                <app-datepicker
                                                    :initialDate="expense.due_date"
                                                    @emitDate="expense.due_date = $event"
                                                    @onChanged="onDueDateChanged"
                                                />
                                                <label class="label">{{$t("transaction_account")}}</label>
                                                <v-select
                                                    class="mt-1"
                                                    :items="transactionAccounts"
                                                    item-value="uuid"
                                                    :item-text="item => `${item.name}`"
                                                    v-model="expense.transaction_account"
                                                    no-data-text="No data found."
                                                    :rules="[
                                                        (v) => !!v || 'Transaction Account is required',
                                                      ]"
                                                    placeholder="Transaction Account"
                                                    return-object
                                                    outlined
                                                ></v-select>
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row style="background-color: #fff">
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <h3 class="mb-0 text-uppercase grey--text mb-3">
                                                {{ $t("expense_accounts") }}
                                            </h3>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="py-0">
                                            <kendo-datasource
                                                ref="expenseAccountDS"
                                                :data="expenseEntries"
                                                :change="onExpenseAccountDSChanges"
                                            />
                                            <kendo-grid
                                                id="expenseGrid"
                                                ref="expenseGrid"
                                                class="grid-function"
                                                :data-source-ref="'expenseAccountDS'"
                                                :sortable="false"
                                                :filterable="false"
                                                :column-menu="true"
                                                :editable="true"
                                                :scrollable-virtual="true"
                                            >
                                                <kendo-grid-column
                                                    :command="{
														iconClass: 'k-icon k-i-trash',
														text: ' ',
														click: removeRow,
														class: 'btn-plus',
													}"
                                                    :title="''"
                                                    :width="63"
                                                    :headerAttributes="{
														style:
															'text-align: right; background-color: #EDF1F5',
													}"
                                                />
                                                <kendo-grid-column
                                                    :title="$t('no.')"
                                                    :template="rowNumberTmpl"
                                                    :width="53"
                                                    :column-menu="false"
                                                    :headerAttributes="{
														style: 'background-color: #EDF1F5;',
														class: 'text-center',
													}"
                                                    :attributes="{
														style: 'text-align: center',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'account'"
                                                    :title="$t('account')"
                                                    :width="200"
                                                    :template="'<span>#=account.name||``#</span>'"
                                                    :editor="expenseAccountEditor"
                                                    :headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :width="200"
                                                    :headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
                                                />

                                                <kendo-grid-column
                                                    :field="'uom'"
                                                    :title="$t('uom')"
                                                    :editor="UomEditor"
                                                    :template="'<span>#=uom.name||``#</span>'"
                                                    :width="150"
                                                    :headerAttributes="{
														style:
															'text-align: right; background-color: #EDF1F5',
													}"
                                                    :attributes="{
														style: 'text-align: right;',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'quantity'"
                                                    :title="$t('qty')"
                                                    :width="160"
                                                    :headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'price'"
                                                    :title="$t('price')"
                                                    :width="150"
                                                    :editor="NumberEditor"
                                                    :template="
														'<span>#=kendo.toString(price, decimalFormat)#</span>'
													"
                                                    :headerAttributes="{
														style:
															'text-align: right; background-color: #EDF1F5',
													}"
                                                    :attributes="{
														style: 'text-align: right',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :width="150"
                                                    :editable="
														() => {
															return false;
														}
													"
                                                    :editor="NumberEditor"
                                                    :template="
														'<span>#=kendo.toString(amount, decimalFormat)#</span>'
													"
                                                    :headerAttributes="{
														style:
															'text-align: right; background-color: #EDF1F5',
													}"
                                                    :attributes="{
														style: 'text-align: right',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'tax_item'"
                                                    :title="$t('tax')"
                                                    :template="'<span>#=tax_item.defaultTax||``#</span>'"
                                                    :editor="PurchaseTaxEditor"
                                                    :width="150"
                                                    :headerAttributes="{
														style:
															'text-align: right; background-color: #EDF1F5',
													}"
                                                    :attributes="{
														style: 'text-align: right',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'discount'"
                                                    :title="$t('discount')"
                                                    :template="'<span>#=discount.name||``#</span>'"
                                                    :editor="PurchaseDiscountItemEditor"
                                                    :width="150"
                                                    :hidden="!purchaseFormContent.discountItem"
                                                    :headerAttributes="{
														style:
															'text-align: right; background-color: #EDF1F5',
													}"
                                                    :attributes="{
														style: 'text-align: right',
													}"
                                                />

                                                <kendo-grid-column
                                                    :field="'class1'"
                                                    :title="$t('class_1')"
                                                    :template="'<span>#=class1.name||``#</span>'"
                                                    :width="200"
                                                    :hidden="!purchaseFormContent.class1"
                                                    :editor="ClassEditor.class1"
                                                    :headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'class2'"
                                                    :title="$t('class_2')"
                                                    :template="'<span>#=class2.name||``#</span>'"
                                                    :width="200"
                                                    :hidden="!purchaseFormContent.class2"
                                                    :editor="ClassEditor.class2"
                                                    :headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'class3'"
                                                    :title="$t('class_3')"
                                                    :template="'<span>#=class3.name||``#</span>'"
                                                    :width="200"
                                                    :hidden="!purchaseFormContent.class3"
                                                    :editor="ClassEditor.class3"
                                                    :headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'class4'"
                                                    :title="$t('class_4')"
                                                    :template="'<span>#=class4.name||``#</span>'"
                                                    :width="200"
                                                    :hidden="!purchaseFormContent.class4"
                                                    :editor="ClassEditor.class4"
                                                    :headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'class5'"
                                                    :title="$t('class_5')"
                                                    :template="'<span>#=class5.name||``#</span>'"
                                                    :width="200"
                                                    :hidden="!purchaseFormContent.class5"
                                                    :editor="ClassEditor.class5"
                                                    :headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
                                                />
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <v-row>
                                                <v-col sm="9" cols="12" class="py-0">
                                                    <v-btn
                                                        color="primary"
                                                        class="float-left mt-2 btn_plus white--text mr-2"
                                                        @click="addRow"
                                                    >
                                                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-row>
                                                <v-col sm="6" cols="12" class="">
                                                </v-col>
                                                <v-col sm="6" cols="6">
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <tbody>
                                                            <tr>
                                                                <td class="text-left">
                                                                    {{ $t("subtotal") }}
                                                                </td>
                                                                <td class="text-center">
                                                                    :
                                                                </td>
                                                                <td class="text-right">
                                                                    {{ numberFormat(subTotal) }}
                                                                </td>
                                                            </tr>
                         
                                                            <tr>
                                                                <td class="text-left">
                                                                    {{ $t("withholding_tax") }}
                                                                </td>
                                                                <td class="text-center">
                                                                    :
                                                                </td>
                                                                <td class="text-right">
                                                                    {{ numberFormat(whdTax) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left text-uppercase">
                                                                    {{ $t("total") }}
                                                                </td>
                                                                <td class="text-center">
                                                                    :
                                                                </td>
                                                                <td
                                                                    class="text-right primary--text text-bold"
                                                                >
                                                                    {{ numberFormat(totalAmount) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left">
                                                                    {{ $t("deposit") }}
                                                                    <span class="float-right primary--text">{{
                                                                            numberFormat(supplierDepositAmount)
                                                                        }}</span>
                                                                </td>
                                                                <td class="text-center">
                                                                    :
                                                                </td>
                                                                <td class="text-right">
                                                                    <v-text-field
                                                                        class="text-right mt-3 float-right deposite_input"
                                                                        type="number"
                                                                        min="0"
                                                                        :disabled="supplierDepositAmount <= 0"
                                                                        v-model="depositAmount"
                                                                        @change="onDepositDeductionChange"
                                                                        width="80"
                                                                        outlined
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left text-uppercase">
                                                                    {{ $t("amount_due") }}
                                                                </td>
                                                                <td class="text-center">
                                                                    :
                                                                </td>
                                                                <td class="text-right text-bold">
                                                                    {{ numberFormat(amountDue) }}
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

                                    <v-card outlined dense class="no_border function_footer">
                                        <!-- Warning Message -->
                                        <v-alert type="warning" v-model="alert" dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
                                        <v-btn
                                            color="primary"
                                            outlined
                                            class="text-capitalize  black--text float-left"
                                            @click="cancel"
                                        >{{ $t("cancel") }}
                                        </v-btn>
                                        <v-btn
                                            color="primary"
                                            class="float-right white--text text-capitalize "
                                            @click="onSaveOptionClick(SaveOption.SAVECLOSE)"
                                        >
                                            {{ $t("save_close") }}
                                        </v-btn>
                                        <v-btn color="secondary"
                                               style="margin-right: 10px !important"
                                               class="white--text float-right text-capitalize"
                                               @click="onSaveOptionClick(SaveOption.SAVENEW)" >
                                            {{ $t("save_new") }}
                                        </v-btn>
                                    </v-card>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                :myLoading="true"
                type="loading"
            />
        </v-container>
    </v-app>
</template>

<script>
import {i18n} from "@/i18n";
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";

import {
    ExpenseModel,
    ExpenseEntryModel,
    ExpenseEntryExtendedModel,
    JournalModel,
    JournalEntryModel,
    AccountModel,
    CurrencyModel,
    ExchangeRateModel,
    PaymentTermModel,
    SupplierModel,
    EmployeeModel,
    ContactModel,
    ClassModel,
    UomModel,
    LocationModel,
    SegmentModel,
    ProjectModel,
    DiscountItemModel,
    TaxModel,
    Expenses,
    PurchaseFormContent,
} from "@/scripts/model/AppModels";
import {ShowResource} from "@/observable/store";

/* Editors */
import AccountSecondaryEditor from "@/scripts/kendo_editor/AccountSecondary";
import ClassEditor from "@/scripts/kendo_editor/Clazz";
import UomEditor from "@/scripts/kendo_editor/Uom";
import PurchaseDiscountItemEditor from "@/scripts/kendo_editor/PurchaseDiscountItem";
import PurchaseTaxEditor from "@/scripts/kendo_editor/PurchaseTax";

/* Store */
import store from "@/store";
import paymentTermHandler_ from "@/scripts/paymentterm/handler/paymentTermHandler";
import AccountMappingModel from "@/scripts/account-map/Account";
import {uuid} from "vue-uuid";
import saleOrderHandler from "@/scripts/transactionHandler";

const institute = store.state.institute.institute;

/* Handlers */
const {
    expenseHandler,
    cashAdvanceHandler,
    journalHandler,
} = require("@/scripts/AppHandlers");
const purchaseFormContentHandler = require("@/scripts/purchaseFormContentHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");

const {
    EntityType,
    SaveOption,
    AccountTypeCode,
    TaxType,
    Setting,
} = require("@/scripts/default_setup/Collections");

export default {
    name: "Expense",
    components: {
        LoadingMe: () => import("@/components/Loading"),
        "app-datepicker": () =>
            import("@/components/custom_templates/DatePickerComponent"),
        // "app-monthof-picker": () =>
        //     import("@/components/kendo_templates/MonthOfPicker"),
        "app-currency-dropdownlist": () =>
            import("@/components/dropdownlist/Currency"),
        "app-payment-term-purchase-dropdownlist": () => import("@/components/dropdownlist/PaymentTermPurchase"),
        // "app-location-dropdownlist": () =>
        //     import("@/components/dropdownlist/Location"),
        // "app-employee-dropdownlist": () =>
        //     import("@/components/dropdownlist/Employee"),
        // "app-project-dropdownlist": () =>
        //     import("@/components/dropdownlist/Project"),
        // "app-segment-dropdownlist": () =>
        //     import("@/components/dropdownlist/Segment"),
        "app-supplier-dropdownlist": () =>
            import("@/components/dropdownlist/Supplier"),
        // "app-secondary-account-dropdownlist": () => import('@/components/dropdownlist/AccountSecondary'),
    },
    props: {
        initExpense: {
            type: ExpenseModel,
        },
    },
    data: () => ({
        // Obj
        expense: new ExpenseModel(),
        journal: new JournalModel(),
        journalEntries: [],
        employee: new EmployeeModel(),
        supplier: new SupplierModel(),
        paymentTerm: new PaymentTermModel(),
        currency: new CurrencyModel(institute.baseCurrency),
        exchangeRate: new ExchangeRateModel(institute.baseCurrency),
        advanceSettlementClearingAccount: new AccountModel(),
        otherClearingSuspenseAccount: new AccountModel(),
        secondaryAccount: new AccountModel(),
        location: new LocationModel(),
        segment: new SegmentModel(),
        project: new ProjectModel(),
        // List
        cashAdvances: [],
        accounts: [],
        expenseAccounts: [],
        transactionAccounts: [],
        expenseEntries: [],
        // Other
        subTotal: 0,
        discountAmount: 0,
        purchaseTax: 0,
        whdTax: 0,
        totalAmount: 0,
        supplierDepositAmount: 0,
        depositAmount: 0,
        amountDue: 0,
        hasAdditionalCost: false,
        files: [],
        user: Helper.getUser(),
        templates: [],
        maxDecimal: Setting.MAX_DECIMAL,
        disableProject: false,
        // Form validation
        valid: true,
        isEdit: false,
        alert: false,
        errorMessage: "",
        saveMode: "",
        SaveOption: SaveOption,
        // Editors
        AccountSecondaryEditor: AccountSecondaryEditor,
        ClassEditor: ClassEditor,
        UomEditor: UomEditor,
        PurchaseDiscountItemEditor: PurchaseDiscountItemEditor,
        PurchaseTaxEditor: PurchaseTaxEditor,
        // Sidebar
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,
        // LoadingMe
        showLoading: false,
        showCashAdvanceLoading: false,
        // By B Nimol
        decimalFormat: "n2",
        purchaseFormContent: PurchaseFormContent,
        depositBalance: 0,
        txnExpense: new Expenses({}),
        transactionType: {},
        supplierDiscountItem: [],
        taxListDetail: [],
        purchaseOrders: [],
        purchaseOrder: {},
        refFrom: [],
        showLoadingPO: false
    }),
    methods: {
        onDepositDeductionChange() {
            if (this.depositAmount === "" || this.depositAmount === undefined) {
                this.depositAmount = 0;
            }
            const deduction = parseFloat(this.depositAmount) || 0;
            if (deduction > parseFloat(this.supplierDepositAmount)) {
                this.depositAmount = parseFloat(this.supplierDepositAmount);
                // this.txnExpense.depositDeduction = this.depositAmount
            }
            this.autoCalculate();
        },
        removeEmptyValues(obj) {
            for (let propName in obj) {
                if (!obj[propName] || obj[propName].length === 0) {
                    delete obj[propName];
                } else if (typeof obj[propName] === "object") {
                    this.removeEmptyValues(obj[propName]);
                }
            }
            return obj;
        },
        onLocationChange() {
            window.console.log(
                "location",
                this.removeEmptyValues(this.segment),
                this.removeEmptyValues(this.location)
            );
        },
        mappingExpense(expense) {
            const ds = this.$refs.expenseAccountDS.kendoWidget();
            const accountLine = ds
                .data()
                .filter((n) => n.amount > 0)
                .map((m) => {
                    const id = m.id || "lin-" + uuid.v1();
                    const line = new ExpenseEntryExtendedModel(m);
                    line["id"] = id
                    return line
                });
            this.txnExpense.id = expense.uuid;
            this.txnExpense.hasAdditionalCost = this.hasAdditionalCost;
            this.txnExpense.journal_uuid = expense.journal_uuid;
            this.txnExpense.type = "Expense";
            this.txnExpense.abbr = this.abbr(this.transactionType);
            this.txnExpense.transactionType = this.transactionType;
            this.txnExpense.referenceNo = expense.number;
            // this.txnExpense.referenceNo = expense.number
            this.txnExpense.transactionDate = expense.expense_date;
            this.txnExpense.transactionDateTZ = Helper.toISODate(expense.expense_date);
            this.txnExpense.dueDate = expense.due_date;
            this.txnExpense.billDate = expense.bill_date;
            this.txnExpense.billNumber = expense.bill_number;
            this.txnExpense.currency = this.removeEmptyValues(expense.bill_currency);
            this.txnExpense.supplier = this.supplierMap(expense.supplier);
            this.txnExpense.employee = this.removeEmptyValues(expense.employee);
            this.txnExpense.paymentTerm = this.removeEmptyValues(this.paymentTerm);
            this.txnExpense.segment = this.removeEmptyValues(this.segment);
            this.txnExpense.location = this.removeEmptyValues(this.location);
            this.txnExpense.project = this.removeEmptyValues(this.project);
            this.txnExpense.monthOf = expense.month_of;

            this.txnExpense.additionalCostSupplier = this.removeEmptyValues(
                expense.additional_cost_supplier
            );
            this.txnExpense.use_for_transaction_uuid =
                expense.use_for_transaction_uuid;
            this.txnExpense.useForOption = expense.use_for_option;
            this.txnExpense.transactionNote = expense.voucher_note;
            this.txnExpense.journalNote = expense.journal_note;
            this.txnExpense.itemLines = accountLine;
            this.txnExpense.account = new AccountMappingModel(
                this.removeEmptyValues(this.expense.transaction_account)
            );
            this.txnExpense.saveOption = expense.is_draft;
            this.txnExpense.status = 1;
            this.txnExpense.createdAt = expense.created_date;

            this.txnExpense.total = parseFloat(this.totalAmount);
            this.txnExpense.exchangeTotal =
                parseFloat(this.totalAmount) * (this.exchangeRate.rate || 1);
            this.txnExpense.amountDue = this.amountDue;
            this.txnExpense.remainingAmount = this.amountDue;
            this.txnExpense.subTotal = this.subTotal;
            this.txnExpense.purchaseTax = this.purchaseTax;
            this.txnExpense.whdTax = this.whdTax;
            this.txnExpense.supplierDiscountItem = this.supplierDiscountItem;
            this.txnExpense.loggedUser = this.loggedUser(this.expense.created_by);

            this.txnExpense.txnRate = this.exchangeRate.rate;
            this.txnExpense.discountTotal = parseFloat(this.discountAmount);
            this.txnExpense.depositAmount = parseFloat(this.depositBalance);
            this.txnExpense.depositDeduction = parseFloat(this.depositAmount);
            this.txnExpense.exchangeDepositDeduction =
                parseFloat(this.depositAmount) * this.exchangeRate.rate || 1;
            this.txnExpense.exchangeAmount =
                this.amountDue * this.exchangeRate.rate || 1;
            this.txnExpense.purchaseOrder = this.purchaseOrder || {}
            this.txnExpense.refFrom = []
            if (this.purchaseOrder) {
                this.txnExpense.refFrom = [
                    {
                        id: this.purchaseOrder.id || '',
                        reference: this.purchaseOrder.referenceNo || ''
                    }
                ]
            }
        },
        loggedUser(user) {
            if (user) {
                return {
                    id: user.id,
                    name: user.user_name,
                    email: user.email,
                };
            }
            return {};
        },
        supplierMap(supplier) {
            if (supplier) {
                return {
                    id: supplier.uuid,
                    name: supplier.name,
                    email: supplier.email,
                    phone: supplier.phone,
                    address: supplier.address,
                };
            }
            return {};
        },
        async saveTxnExpense(response) {
            this.txnExpense["uuid"] = response.data.uuid || '';
            this.txnExpense["id"] = this.txnExpense.id ? this.txnExpense.id : "";
            this.txnExpense["journal_uuid"] = response.data.journal_uuid || '';
            this.txnExpense["actionType"] = this.isEdit ? 'edit' : "new";
            // let data = this.txnExpense;
            // window.console.log('expense==', JSON.stringify(this.txnExpense.taxList))
            billingHandler.createExpense(this.txnExpense).then((res) => {
                if (res.data.statusCode === 201) {
                    this.$snotify.success("Successfully");
                    this.responseStatus(response);
                }
            })
                .catch((e) => {
                    this.$snotify.error("Something went wrong");
                    this.errors.push(e);
                });
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
        account(txnAccount) {
            if (txnAccount) {
                return {
                    id: txnAccount.uuid,
                    uuid: txnAccount.uuid,
                    account_uuid: txnAccount.account_uuid,
                    name: txnAccount.name,
                    local_name: txnAccount.local_name,
                    number: txnAccount.number,
                    is_taxable: txnAccount.is_taxable,
                    banhjiAccCode: txnAccount.banhjiAccCode,
                    group_code: txnAccount.group_code,
                    parent_account: txnAccount.parent_account,
                    type_code: txnAccount.type_code,
                    account_type: txnAccount.account_type,
                };
            }
            return {};
        },
        abbr(transactionType) {
            if (transactionType) {
                return transactionType.abbr;
            }
            return "";
        },
        supplierDepositBalance() {
            this.supplierDepositAmount = 0;
            if (this.depositBalance > 0) {
                this.supplierDepositAmount =
                    this.depositBalance / this.exchangeRate.rate;
            }
        },
        async loadDepositBalance(id) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = id + "?type=dep";
                    this.supplierDepositAmount = 0;
                    this.depositAmount = 0;
                    billingHandler
                        .balance(strFilter)
                        .then((res) => {
                            if (res.data.statusCode === 200) {
                                const data = res.data.data;
                                if (data.length > 0) {
                                    this.depositBalance = data[0].balance;
                                    this.supplierDepositBalance();
                                }
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 300);
            });
        },
        async loadPurchaseFormContent() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    purchaseFormContentHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data;
                            if (data.length > 0) {
                                const supplierSetting = data[0];
                                this.purchaseFormContent = supplierSetting;
                                if (supplierSetting.hasOwnProperty("decimal")) {
                                    this.decimalFormat = "n" + supplierSetting.decimal;
                                    // Add 2 default lines
                                    this.addRow();
                                    this.addRow();
                                }
                            }
                        }
                    });
                }, 100);
            });
        },
        numberFormat(value) {
            return kendo.toString(value, `${this.decimalFormat}`);
        },
        onDueDateChanged() {
            this.calculateDueDate(this.paymentTerm);
        },
        async onVendorChanged() {
            // let paymentBilling = {};
            // if (
            //     Object.prototype.hasOwnProperty.call(this.supplier, "paymentBilling")
            // ) {
            //   paymentBilling = this.supplier.paymentBilling;
            //   if (
            //       Object.prototype.hasOwnProperty.call(paymentBilling, "paymentTerm")
            //   ) {
            //     this.paymentTerm = new PaymentTermModel(paymentBilling.paymentTerm);
            //     this.calculateDueDate(paymentBilling.paymentTerm);
            //   }
            // }
            this.loadDepositBalance(this.supplier.id);
            this.loadPaymentTermList();

            /* Supplier expense account */
            let ds = this.$refs.expenseAccountDS.kendoWidget();
            ds.data([]);

            // Insert row
            let je = new ExpenseEntryExtendedModel({
                account: this.supplier.accountTax.expenseAcc,
                quantity: 1,
                decimalFormat: this.decimalFormat,
            });

            ds.add(je);
            this.addRow();
            this.loadPurchaseOrder()
        },
        calculateDueDate(paymentTerm) {
            if (paymentTerm) {
                if (paymentTerm.hasOwnProperty("netDue")) {
                    const netDue = paymentTerm.netDue;
                    const dueDate = new Date(this.expense.expense_date);
                    dueDate.setDate(dueDate.getDate() + parseInt(netDue)); //number  of days to add, e.x. 15 days
                    this.expense.due_date = dueDate.toISOString().substr(0, 10);
                }
            }
        },
        NumberEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 30,
                    format: `${this.decimalFormat}`,
                });
        },
        Help(key_search) {
            ShowResource(key_search);
        },
        // Initial Data
        initialData() {
            if (this.initExpense) {
                // Edit Mode
                this.expense = Object.assign({}, this.initExpense);
                this.bindData();
            } else {
                // Brand New Mode
                this.setDefaultData();
            }
        },
        // Set default data
        async setDefaultData() {
            // Brand New Mode
            this.isEdit = false;

            this.expense = Object.assign({}, new ExpenseModel({
                date: new Date().toISOString().substr(0, 10),
                due_date: new Date().toISOString().substr(0, 10),
                bill_date: new Date().toISOString().substr(0, 10),
                month_of: new Date().toISOString().substr(0, 7),
            }));

            /* Default Sidebar */
            let locations = await this.$store.dispatch("locations/getList");
            this.location = new LocationModel(locations[0]);

            let segments = await this.$store.dispatch("segments/getList");
            this.segment = new SegmentModel(segments.find((i) => i.isSystem === 1));

            // Generate Number
            this.generateNumber();

            // Add 2 default lines
            // this.addRow();
            // this.addRow();

            this.autoCalculate();
        },
        // Bind data from prop for edit mode
        async bindData() {
            this.showLoading = true;

            // Edit Mode
            this.isEdit = true;

            // Currency
            this.currency = new CurrencyModel(this.expense.bill_currency);
            this.exchangeRate = new ExchangeRateModel(this.expense.bill_currency);
            this.exchangeRate.id = this.expense.expense_entries[0].exchange_rate_uuid;
            this.exchangeRate.rate = this.expense.expense_entries[0].exchange_rate;

            // Payment Term
            let paymentTerms = await this.$store.dispatch("paymentTerms/getList");
            this.paymentTerm = paymentTerms.find((i) => i.id === this.expense.payment_term);

            // Contacts
            this.supplier = new SupplierModel(this.expense.supplier);
            this.employee = new EmployeeModel(this.expense.employee);
            this.hasAdditionalCost = Boolean(this.expense.additional_cost_supplier.uuid);

            // Sidebar
            let locations = await this.$store.dispatch("locations/getList");
            this.location = new LocationModel(locations.find((i) => i.id === this.expense.location_uuid));

            let segments = await this.$store.dispatch("segments/getList");
            this.segment = new SegmentModel(
                segments.find((i) => i.id === this.expense.segment_uuid)
            );

            let projects = await this.$store.dispatch("projects/getList");
            this.project = new ProjectModel(
                projects.find((i) => i.id === this.expense.project_uuid)
            );

            // Cash Advance
            if (
                this.employee.id !== "" &&
                this.segment.id !== "" &&
                this.expense.use_for_option === 2
            ) {
                let cashAdvances = await cashAdvanceHandler.getByEmployeeId(
                    this.employee.id
                );
                this.cashAdvances = cashAdvances.data.filter(
                    (i) => i.segment_uuid === this.segment.id
                );
            }

            // Entries
            let entries = [],
                subTotal = 0,
                discountAmount = 0,
                purchaseTaxAmount = 0,
                whdTaxAmount = 0,
                secondaryAccounts = await this.$store.dispatch("accounting/getSecondaryAccounts"),
                discountItems = await this.$store.dispatch("discountItems/getList"),
                taxItems = await this.$store.dispatch("taxes/getList"),
                uoms = await this.$store.dispatch("unitOfMeasurements/getList"),
                clazz = await this.$store.dispatch("classes/getList");

            this.expense.expense_entries.forEach((value) => {
                // Purchase Tax
                if (value.account.account_type.number === AccountTypeCode.PURCHASE_TAX) {
                    purchaseTaxAmount += value.amount;
                } else {
                    if (value.amount > 0 && value.account.number !== AccountTypeCode.TAX_RELATED_EXPENSE_CODE) {
                        let entry = new ExpenseEntryExtendedModel(value);
                        entry.decimalFormat = this.decimalFormat;

                        /* Secondary Account */
                        if (value.secondary_acc_uuid !== "") {
                            value.secondary_account = secondaryAccounts.find((i) => i.uuid === value.secondary_acc_uuid);
                        }

                        // Subtotal
                        subTotal += value.amount;

                        // UOM
                        entry.uom = new UomModel(
                            uoms.find((item) => item.id === value.uom_uuid)
                        );

                        // Discount
                        if (value.hasOwnProperty('discount'))
                            if (value.discount.hasOwnProperty('uuid'))
                                entry.discount = new DiscountItemModel(discountItems.find((i) => i.id === value.discount.uuid));

                        // Tax
                        if (value.hasOwnProperty('tax_item'))
                            if (value.tax_item.hasOwnProperty('uuid')) {
                                entry.tax_item = taxItems.find((i) => i.id === value.tax_item.uuid);

                                /* Apply Inclusive Tax to amount */
                                if (entry.tax_item.hasOwnProperty('taxType'))
                                    if (entry.tax_item.taxType.hasOwnProperty('typeId'))
                                        if (entry.tax_item.taxType.typeId === 1 && entry.tax_item.baseAmount.toLowerCase() === TaxType.INCLUSIVE)
                                            subTotal += entry.tax_amount;
                            }

                        // Classes
                        entry.class1 = new ClassModel(
                            clazz.find((item) => item.id === value.class_1_uuid)
                        );
                        entry.class2 = new ClassModel(
                            clazz.find((item) => item.id === value.class_2_uuid)
                        );
                        entry.class3 = new ClassModel(
                            clazz.find((item) => item.id === value.class_3_uuid)
                        );
                        entry.class4 = new ClassModel(
                            clazz.find((item) => item.id === value.class_4_uuid)
                        );
                        entry.class5 = new ClassModel(
                            clazz.find((item) => item.id === value.class_5_uuid)
                        );

                        entries.push(entry);
                    } else {
                        // Discount
                        if (value.account.account_type.number === AccountTypeCode.DISCOUNT) {
                            discountAmount += value.amount * -1;
                        }

                        // WHD Tax
                        if (value.account.account_type.number === AccountTypeCode.WHD_TAX) {
                            whdTaxAmount += value.amount * -1;
                        }

                        // Deposit
                        if (~AccountTypeCode.PURCHASE_DEPOSITS.indexOf(value.account.account_type.number)) {
                            this.depositAmount = value.amount * -1;
                        }

                        // Transaction Account (Payable Account / Clearing Account)
                        if (value.account.uuid === this.expense.transaction_account.uuid) {
                            this.amountDue = value.amount * -1;

                            /* Secondary Account */
                            this.secondaryAccount = secondaryAccounts.find((i) => i.uuid === value.secondary_acc_uuid);
                        }
                    }
                }
            });

            // Bind Expense Entries
            this.expenseEntries = entries;

            // Calculation
            this.subTotal = subTotal;
            this.discountAmount = discountAmount;
            this.purchaseTax = purchaseTaxAmount;
            this.whdTax = whdTaxAmount;
            this.totalAmount = subTotal - this.discountAmount;

            /* Journal */
            let journals = await journalHandler.getOne(this.expense.journal_uuid);
            this.journal = journals.data;
            this.loadExpensePurchaseOrder()
            this.showLoading = false;
        },
        /* Load Data */
        async loadData() {
            // Supplier Setting such as decimal format
            await this.loadPurchaseFormContent();

            // Call Account List
            this.accounts = await this.$store.dispatch("accounting/getAccounts");
            this.expenseAccounts = this.accounts;

            // Advance Settlement Clearing Account by banhji_account_number
            let advSetClrAcc = this.accounts.find(i => i.banhji_account_number === AccountTypeCode.ADVANCE_SETTLEMENT_CLEARING_CODE);
            this.advanceSettlementClearingAccount = new AccountModel(advSetClrAcc);

            // Other Clearing Suspenses Account by banhji_account_number
            let otherClrSusAcc = this.accounts.find(i => i.banhji_account_number === AccountTypeCode.OTHER_CLEARING_SUSPENSES_CODE);
            this.otherClearingSuspenseAccount = new AccountModel(otherClrSusAcc);
            
            // Filter Transaction Accounts
            this.filterTransactionAccount();
        },
        // Number
        async generateNumber() {
            let num = await Helper.generateAccountingNumber(
                EntityType.EXPENSES,
                this.expense.expense_date
            );

            this.expense.number = num.number;
            this.transactionType = num.prefix;
            this.expense.prefix_format = num.prefix_format;
        },
        // Get Exchange Rate
        async getExchangeRate() {
            if (this.expense.expense_date && this.currency.code !== "") {
                this.exchangeRate = await Helper.getLastExchangeRateByDate(
                    this.expense.expense_date,
                    this.currency.code
                );
            } else {
                this.exchangeRate = new ExchangeRateModel(institute.baseCurrency);
            }
            window.console.log(this.exchangeRate, "Xrate");
            this.supplierDepositBalance();
        },
        // Load Cash Advance
        loadCashAdvance() {
            /* Purchase Order */
            this.loadPurchaseOrder()
            /* Clear */
            this.cashAdvances = [];
            this.expense.use_for_transaction_uuid = "";

            if (
                this.employee.id !== "" &&
                this.segment.id !== "" &&
                this.expense.use_for_option === 2
            ) {
                this.showCashAdvanceLoading = true;

                cashAdvanceHandler
                    .getByEmployeeId(this.employee.id)
                    .then((res) => {
                        if (res.data) {
                            /* Filter by segment */
                            this.cashAdvances = res.data.filter(
                                (item) => item.segment_uuid === this.segment.id
                            );
                        }
                    })
                    .finally(() => {
                        this.showCashAdvanceLoading = false;
                    });
            }
        },
        /* On date changes */
        onDateChanges() {
            this.expense.month_of = new Date(this.expense.expense_date).toISOString().substr(0, 7);
            this.getExchangeRate();
            this.generateNumber();
        },
        /* On Transaction Account Changes */
        onTransactionAccountChanges() {
            this.secondaryAccount = new AccountModel();
        },
        /* On Cash Advance Changes */
        onCashAdvanceChanges() {
            this.setCashAdvanceProject();
            this.disableProject = false;
        },
        /* Bind project from cash advance */
        async setCashAdvanceProject() {
            if (this.expense.use_for_transaction_uuid !== "") {
                let cashAdvance = this.cashAdvances.find(
                    (i) => i.uuid === this.expense.use_for_transaction_uuid
                );

                if (cashAdvance.project_uuid !== "") {
                    let projects = await this.$store.dispatch("projects/getList");
                    this.project = projects.find(
                        (i) => i.id === cashAdvance.project_uuid
                    );

                    this.disableProject = true;
                } else {
                    this.disableProject = false;
                }
            }
        },
        // On Employee Radio Changes
        onUseForOptionChanges() {
            // Clear Selected Cash Advance
            this.expense.use_for_transaction_uuid = "";
            this.expense.transaction_account = new AccountModel();

            /* Load Cash Advance */
            if (this.expense.use_for_option === 2) {
                this.loadCashAdvance();
            }

            this.secondaryAccount = new AccountModel();
            this.filterTransactionAccount();
        },
        // Filter Transation Account
        async filterTransactionAccount() {
            if (this.expense.use_for_option === 0) {
                // Credit (Payable Account)
                this.transactionAccounts = this.accounts.filter(
                    (i) =>
                        ~AccountTypeCode.PAYABLE_ACCOUNTS.indexOf(i.account_type.number)
                );
            } else if (this.expense.use_for_option === 3) {
                // Cash Account
                this.transactionAccounts = this.accounts.filter(
                    (i) =>
                        ~AccountTypeCode.CASH_ACCOUNTS.indexOf(i.account_type.number)
                );
            } else {
                // Reimbursement / Cash Advance
                this.expense.transaction_account = this.advanceSettlementClearingAccount;
                this.transactionAccounts = [this.advanceSettlementClearingAccount];
            }
        },
        // On Additional Cost Changes
        onAdditionalCostCheckboxChanges() {
            let ds = this.$refs.expenseAccountDS.kendoWidget();
            ds.data([]);

            if (this.hasAdditionalCost) {
                this.expenseAccounts = [this.otherClearingSuspenseAccount];

                // Insert row
                let je = new ExpenseEntryExtendedModel({
                    account: this.otherClearingSuspenseAccount,
                    quantity: 1,
                    decimalFormat: this.decimalFormat,
                });

                ds.add(je);
            } else {
                this.expense.additional_cost_supplier = null;
                this.expenseAccounts = this.accounts;
                this.addRow();
                this.addRow();
            }
        },
        /* Kendo */
        // DataSource Changes
        onExpenseAccountDSChanges(e) {
            if (e.field) {
                let dataRow = e.items[0];

                if (e.field === "account") {
                    /* Set account id */
                    dataRow.set("account_uuid", dataRow.account.uuid);

                    /* Add Extra Row */
                    this.addExtraRow(dataRow.uid);
                } else if (e.field === "secondary_account") {
                    if (dataRow.secondary_account !== null) {
                        dataRow.set("secondary_acc_uuid", dataRow.secondary_account.uuid);
                    } else {
                        // Set default when deselect
                        dataRow.set("secondary_acc_uuid", "");
                        dataRow.set("secondary_account", new AccountModel());
                    }
                } else if (e.field === "quantity" || e.field === "price") {
                    let amt =
                        kendo.parseFloat(dataRow.quantity) *
                        kendo.parseFloat(dataRow.price);
                    dataRow.set("amount", amt);
                } else if (e.field === "uom") {
                    if (dataRow.uom) {
                        dataRow.set("uom_uuid", dataRow.uom.id);
                    }
                } else if (e.field === "tax_item") {
                    if (dataRow.tax_item === null) {
                        // Set default when deselect
                        dataRow.set("tax_item", new TaxModel());
                    }
                } else if (e.field === "class1") {
                    if (dataRow.class1 !== null) {
                        dataRow.set("class_1_uuid", dataRow.class1.id);
                    } else {
                        // Set default when deselect
                        dataRow.set("class_1_uuid", "");
                        dataRow.set("class1", new ClassModel());
                    }
                } else if (e.field === "class2") {
                    if (dataRow.class2 !== null) {
                        dataRow.set("class_2_uuid", dataRow.class2.id);
                    } else {
                        // Set default when deselect
                        dataRow.set("class_2_uuid", "");
                        dataRow.set("class2", new ClassModel());
                    }
                } else if (e.field === "class3") {
                    if (dataRow.class3 !== null) {
                        dataRow.set("class_3_uuid", dataRow.class3.id);
                    } else {
                        // Set default when deselect
                        dataRow.set("class_3_uuid", "");
                        dataRow.set("class3", new ClassModel());
                    }
                } else if (e.field === "class4") {
                    if (dataRow.class4 !== null) {
                        dataRow.set("class_4_uuid", dataRow.class4.id);
                    } else {
                        // Set default when deselect
                        dataRow.set("class_4_uuid", "");
                        dataRow.set("class4", new ClassModel());
                    }
                } else if (e.field === "class5") {
                    if (dataRow.class5 !== null) {
                        dataRow.set("class_5_uuid", dataRow.class5.id);
                    } else {
                        // Set default when deselect
                        dataRow.set("class_5_uuid", "");
                        dataRow.set("class5", new ClassModel());
                    }
                }

                this.autoCalculate();
            }
        },
        calculateDiscount(discountItem, subTotal) {
            if (discountItem) {
                const nature = discountItem.nature;
                const amount = discountItem.amount;
                if (nature === "Amount") {
                    return kendo.parseFloat(amount);
                } else if (nature === "Percentage") {
                    return subTotal * (kendo.parseFloat(amount) / 100);
                }
            }
        },
        autoCalculateTax(tax, amount) {
            if (tax) {
                var formula = tax.formula;
                var inAmt = kendo.parseFloat(amount);
                var nAmt = kendo.parseFloat(amount);
                var taxBase = kendo.parseFloat(tax.taxBase) / 100;
                var rate = kendo.parseFloat(tax.rate) / 100;
                var total = eval(formula);
                window.console.log(inAmt, nAmt, taxBase, rate, formula, total);
                return total;
            }
            // return 0
        },
        // Auto Calculate In DataSource
        async autoCalculate() {
            let expDS = this.$refs.expenseAccountDS.kendoWidget(),
                subTotal = 0,
                discount = 0,
                purchaseTax = 0,
                whdTax = 0,
                inclusiveTax = 0,
                taxListDetail = [],
                tax = [],
                discountItem = [];

            // Expense
            expDS.data().forEach((value) => {
                let amt = kendo.parseFloat(value.price) * kendo.parseFloat(value.quantity);

                /* Subtotal */
                subTotal += amt;

                // Discount
                let discountAmount = 0;
                if (value.hasOwnProperty('discount'))
                    if (value.discount.hasOwnProperty('id'))
                        if (value.discount.id !== "") {
                            discountAmount = this.calculateDiscount(value.discount, amt);
                            discount += discountAmount;
                            discountItem.push(value.discount);
                        }

                // Tax
                if (value.hasOwnProperty('tax_item'))
                    if (value.tax_item.hasOwnProperty('id'))
                        if (value.tax_item.id !== "") {
                            let amtAfterDiscount = amt - discountAmount;
                            const taxAmount = this.autoCalculateTax(value.tax_item, amtAfterDiscount);
                            if (value.tax_item.baseAmount.toLowerCase() === TaxType.INCLUSIVE) {
                                inclusiveTax += taxAmount;
                            }
                            /*todo: add expense tax */
                            // const vatTax_ = value.tax_item || {}
                            tax['taxAmount'] = taxAmount
                            tax['amount'] = value.amount || 0
                            tax['discount'] = discountAmount || 0
                            tax['txnRate'] = this.exchangeRate.rate || 1
                            tax['isVat'] = 1
                            tax['line'] = new TaxModel(value.tax_item || {})
                            tax.detail = {
                                specificTax: {},
                                publicLightingTax: {},
                                otherTax: {},
                            }
                            taxListDetail.push(tax);
                            /*****************************/
                            if (value.tax_item.hasOwnProperty('taxType'))
                                if (value.tax_item.taxType.hasOwnProperty('typeId'))
                                    if (value.tax_item.taxType.typeId === 2) {/* WHD Tax */
                                        whdTax += taxAmount;
                                    } else {/* Purchase Tax */
                                        purchaseTax += taxAmount;
                                    }

                            /* Set Tax Amount */
                            if (value.tax_item.taxType.typeId === 1 && value.tax_item.baseAmount.toLowerCase() === TaxType.INCLUSIVE) {/* Inclusive Tax */
                                value.set("tax_amount", taxAmount * -1);
                            } else {
                                value.set("tax_amount", taxAmount);
                            }
                        }

            });

            /* Apply Inclusive Tax */
            subTotal -= inclusiveTax;

            this.subTotal = subTotal;
            this.discountAmount = discount;
            this.purchaseTax = purchaseTax;
            this.whdTax = whdTax;

            let totalAmount = (this.subTotal - discount) + whdTax + purchaseTax;
            this.totalAmount = totalAmount;

            let amountDue = (this.totalAmount - this.depositAmount) - whdTax;
            this.amountDue = amountDue;

            this.supplierDiscountItem = this.removeDuplicate(discountItem);

            this.taxListDetail = taxListDetail
            await this.autoCalculateTaxDetail()
        },
        // Row Number Template
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.expenseAccountDS.kendoWidget(),
                index = ds.indexOf(dataItem);

            return index + 1;
        },
        // Grid Custom Editor
        expenseAccountEditor(container, options) {
            return Helper.accountEditor(container, options, this.expenseAccounts);
        },
        // Add New Row
        addRow() {
            let ds = this.$refs.expenseAccountDS.kendoWidget(),
                last = ds.total();

            let je = new ExpenseEntryExtendedModel();
            je.quantity = 1;
            je.decimalFormat = this.decimalFormat;

            ds.insert(last, je);
        },
        // Add Extra Row
        addExtraRow(uid) {
            let ds = this.$refs.expenseAccountDS.kendoWidget(),
                total = ds.total(),
                row = ds.getByUid(uid),
                index = ds.indexOf(row);

            if (index === total - 1) {
                this.addRow();
            }
        },
        // Remove Row
        removeRow(e) {
            e.preventDefault();

            let grid = this.$refs.expenseGrid.kendoWidget(),
                ds = grid.dataSource,
                dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));

            if (ds.data().length > 1) {
                ds.remove(dataItem);
                this.autoCalculate();
            }
        },
        removeEmptyRow() {
            let ds = this.$refs.expenseAccountDS.kendoWidget();

            /* Collect empty row by uid */
            let emptyIds = [];
            ds.data().forEach(value => {
                if (value.account.name === '') {
                    emptyIds.push(value.uid);
                }
            });

            /* Remove empty row by uid */
            for (let i = 0; i < emptyIds.length; i++) {
                const dataItem = ds.getByUid(emptyIds[i]);
                ds.remove(dataItem);
            }
        },
        // Shrink Data
        shrinkData() {
            // Date
            this.expense.expense_date = Helper.toISODate(this.expense.expense_date);
            this.expense.bill_date = Helper.toISODate(this.expense.bill_date);
            this.expense.due_date = Helper.toISODate(this.expense.due_date);
            this.expense.payment_term = this.paymentTerm.id;

            // Currency
            this.expense.bill_currency = this.currency;

            // Supplier
            this.expense.supplier = new ContactModel(this.supplier);

            // Employee
            this.expense.employee = new ContactModel(this.employee);

            // Sidebar
            this.expense.location_uuid = this.location.id;
            this.expense.segment_uuid = this.segment.id;
            this.expense.project_uuid = this.project.id;

            /* Status */
            if (this.expense.use_for_option === 3) {/* Cash */
                this.expense.is_cleared = 1; /* Paid */
            }

            // User
            if (this.isEdit) {
                this.expense.modified_by = this.user;
            } else {
                this.expense.created_by = this.user;
            }

            /* Remove Empty Rows */
            this.removeEmptyRow();

            /* Expense Entries */
            let entries = [],
                expDS = this.$refs.expenseAccountDS.kendoWidget();

            /* Expense Account on Dr */
            expDS.data().forEach((value) => {
                let entry = new ExpenseEntryModel(value);

                // Account
                entry.account = new AccountModel(value.account);

                // Contact
                entry.primary_contact = new ContactModel(this.supplier);
                entry.secondary_contacts = [new ContactModel(this.employee)];

                /* Discount */
                entry.discount = new DiscountItemModel(value.discount);

                /* Tax */
                entry.tax_item = new TaxModel(value.tax_item);

                // Currency
                entry.currency = new CurrencyModel(this.currency);
                entry.exchange_rate_uuid = this.exchangeRate.id;
                entry.exchange_rate = this.exchangeRate.rate;
                entry.exchanged_amount = value.amount * this.exchangeRate.rate;
                entry.exchanged_tax_amount = value.tax_amount * this.exchangeRate.rate;

                // Discount on Cr
                let discountAmount = 0;
                if (value.hasOwnProperty('discount'))
                    if (value.discount.hasOwnProperty('id'))
                        if (value.discount.id !== "") {
                            let subTo = kendo.parseFloat(value.price) * kendo.parseFloat(value.quantity);
                            discountAmount = this.calculateDiscount(value.discount, subTo);

                            /* Discount Entry */
                            let discountEntry = new ExpenseEntryModel(entry);
                            discountEntry.account = new AccountModel(value.discount.account);
                            discountEntry.account_uuid = value.discount.account.uuid;
                            discountEntry.amount = discountAmount * -1; // Cr side is negative
                            discountEntry.exchanged_amount = discountAmount * this.exchangeRate.rate;
                            discountEntry.tax_amount = 0;
                            discountEntry.exchanged_tax_amount = 0;

                            /* Push Discount Entry */
                            entries.push(discountEntry);
                        }

                // Taxes on Dr
                if (value.hasOwnProperty('tax_item'))
                    if (value.tax_item.hasOwnProperty('id'))
                        if (value.tax_item.id !== "") {
                            let amtAfterDiscount = kendo.parseFloat(value.amount) - discountAmount;
                            let taxAmount = this.autoCalculateTax(value.tax_item, amtAfterDiscount);

                            if (value.tax_item.hasOwnProperty('taxType'))
                                if (value.tax_item.taxType.hasOwnProperty('typeId'))
                                    if (value.tax_item.taxType.typeId === 2) {/* WHD Tax on Cr side */
                                        if (value.tax_item.baseAmount.toLowerCase() === "net") {/* WHD Tax Net on Dr side */
                                            // Add Another Tax Related Expense Account
                                            let taxRelatedExpenseAccount = new AccountModel(this.accounts.find(i => i.banhjiAccCode === AccountTypeCode.TAX_RELATED_EXPENSE_CODE));

                                            /* Tax Related Expense Entry on Dr */
                                            let taxRelatedExpenseEntry = new ExpenseEntryModel(entry);
                                            taxRelatedExpenseEntry.account = taxRelatedExpenseAccount;
                                            taxRelatedExpenseEntry.account_uuid = taxRelatedExpenseAccount.uuid;
                                            taxRelatedExpenseEntry.description = i18n.t("witholding_tax_expense");
                                            taxRelatedExpenseEntry.amount = taxAmount;
                                            taxRelatedExpenseEntry.exchanged_amount = taxAmount * this.exchangeRate.rate;
                                            taxRelatedExpenseEntry.tax_amount = 0;
                                            taxRelatedExpenseEntry.exchanged_tax_amount = 0;

                                            /* Push Tax Related Expense Entry */
                                            entries.push(taxRelatedExpenseEntry);
                                        }

                                        // WHD Tax
                                        taxAmount *= -1; // Cr side
                                    }

                            /* Tax Entry */
                            let taxEntry = new ExpenseEntryModel(entry);
                            taxEntry.account = new AccountModel(value.tax_item.account);
                            taxEntry.account_uuid = value.tax_item.account.uuid;
                            taxEntry.amount = taxAmount;
                            taxEntry.exchanged_amount = taxAmount * this.exchangeRate.rate;
                            taxEntry.tax_amount = 0;
                            taxEntry.exchanged_tax_amount = 0;

                            /* Push Tax Entry */
                            entries.push(taxEntry);
                        }

                /* Push Entry */
                entries.push(entry);
            });

            // Deposit Account on Cr
            if (this.depositAmount > 0) {
                entries.push(
                    new ExpenseEntryModel({
                        account: new AccountModel(this.supplier.accountTax.purchaseDepositAcc),
                        account_uuid: this.supplier.accountTax.purchaseDepositAcc.uuid,
                        primary_contact: new ContactModel(this.supplier),
                        secondary_contacts: [new ContactModel(this.employee)],
                        description: this.expense.journal_note,
                        currency: new CurrencyModel(this.currency),
                        amount: this.depositAmount * -1, // Cr side is negative
                        exchange_rate_uuid: this.exchangeRate.id,
                        exchange_rate: this.exchangeRate.rate,
                    })
                );
            }

            // Transaction Account on Cr
            entries.push(
                new ExpenseEntryModel({
                    account: new AccountModel(this.expense.transaction_account),
                    account_uuid: this.expense.transaction_account.uuid,
                    secondary_acc_uuid : this.secondaryAccount.uuid,
                    primary_contact: new ContactModel(this.supplier),
                    secondary_contacts: [new ContactModel(this.employee)],
                    description: this.expense.journal_note,
                    currency: new CurrencyModel(this.currency),
                    amount: this.amountDue * -1,// Cr side is negative
                    exchange_rate_uuid: this.exchangeRate.id,
                    exchange_rate: this.exchangeRate.rate,
                })
            );

            // Use existing uuid
            if (this.isEdit) {
                /* Clear uuid */
                entries.forEach(value => {
                    value.uuid = "";
                });

                /* Apply existing uuid */
                for (let i = 0; i < this.journal.journal_entries.length; i++) {
                    if (i < entries.length) {
                        const oldEntry = this.journal.journal_entries[i];
                        entries[i].uuid = oldEntry.uuid;
                    }
                }
            }

            /* Bind Expense Entries */
            this.expense.expense_entries = entries;

            // mapping to Dynamodb ( expense record ) -> save everywhere morng ^_^
            this.mappingExpense(this.expense);
        },
        // Add Journal
        addJournal() {
            let entries = [];

            /* Add Journal Entries */
            this.expense.expense_entries.forEach((value) => {
                let entry = new JournalEntryModel(value);

                /* Apply Inclusive Tax to amount */
                if (value.tax_amount !== 0) {
                    if (value.tax_item.hasOwnProperty("taxType")) {
                        if (value.tax_item.taxType.hasOwnProperty("typeId")) {
                            if (value.tax_item.taxType.typeId === 1 && value.tax_item.baseAmount.toLowerCase() === TaxType.INCLUSIVE) {
                                entry.amount = value.amount + value.tax_amount;
                            }
                        }
                    }
                }
                entry.exchanged_amount = entry.amount * this.exchangeRate.rate;

                // Add Entry
                entries.push(entry);
            });

            // Journal Entries
            this.journalEntries = entries;

            // Journal
            this.journal.number = this.expense.number;
            this.journal.description = this.expense.journal_note;
            this.journal.journal_date = Helper.toISODate(this.expense.expense_date);
            this.journal.journal_type = EntityType.AUTO_JOURNAL;
            this.journal.transaction_type = EntityType.EXPENSES;
            this.journal.related_transaction_uuid = this.expense.use_for_transaction_uuid;
            this.journal.month_of = this.expense.month_of;
            this.journal.location_uuid = this.expense.location_uuid;
            this.journal.project_uuid = this.expense.project_uuid;
            this.journal.segment_uuid = this.expense.segment_uuid;
            this.journal.prefix_format = this.expense.prefix_format;
            this.journal.is_draft = this.expense.is_draft;
            this.journal.created_date = this.expense.created_date;
            this.journal.created_by = this.expense.created_by;
            this.journal.modified_by = this.expense.modified_by;
        },
        // Validating
        validateForm() {
            let result = true,
                expDS = this.$refs.expenseAccountDS.kendoWidget(),
                msg = "",
                secondaryAccountCount = 0,
                expenseCount = 0;

            // Supplier
            if (this.supplier.id === "") {
                msg += `<p>${i18n.t("supplier_is_required")}</p>`;
                result = false;
            }

            // Bill Number
            if (this.expense.bill_number === "") {
                msg += `<p>${i18n.t("bill_number_is_required")}</p>`;
                result = false;
            }

            // Payment Term
            if (this.paymentTerm.hasOwnProperty("id"))
                if (this.paymentTerm.id === "") {
                    msg += `<p>${i18n.t("payment_term_is_required")}</p>`;
                    result = false;
                }

            // Employee
            let employeeOptions = [1, 2];
            if (this.employee.id === "" && ~employeeOptions.indexOf(this.expense.use_for_option)) {
                msg += `<p>${i18n.t("employee_is_required")}</p>`;
                result = false;
            }

            // Expense
            expDS.data().forEach((value, index) => {
                // No account
                if (value.account.uuid === "" && value.amount > 0) {
                    result = false;
                    msg += `<p>${i18n.t(
                        "please_select_expense_account_at_row_number"
                    )} ${index + 1}</p>`;
                }

                // No amount
                if (value.account.uuid !== "" && value.amount === 0) {
                    result = false;
                    msg += `<p>${value.account.name} ${i18n.t("has_no_amount")}</p>`;
                }

                // // Discount
                // if(value.hasOwnProperty('discount'))
                // if(value.discount.hasOwnProperty('account'))
                // if (value.discount.account.uuid === "" || value.discount.account.account_type.number === 0) {
                //     result = false;
                //     msg += `<p>${i18n.t("invalid_discount_account_at_row_number")} ${index + 1}</p>`;
                // }

                // // Tax
                // if(value.hasOwnProperty('tax_item'))
                // if(value.tax_item.hasOwnProperty('account'))
                // if (value.tax_item.account.uuid === "" || value.tax_item.account.account_type.number === 0) {
                //     result = false;
                //     msg += `<p>${i18n.t("invalid_tax_account_at_row_number")} ${index + 1}</p>`;
                // }

                // Count Empty Row
                if (value.account.uuid !== "" && value.amount > 0) {
                    expenseCount++;
                }

                // Count secondary account
                if (value.secondary_account.uuid !== "") {
                    secondaryAccountCount++;
                }
            });

            // Empty Row
            if (expenseCount === 0) {
                msg += `<p>${i18n.t("please_select_expense_account")}</p>`;
                result = false;
            }

            // Transaction Account
            if (this.expense.transaction_account.uuid === "") {
                msg += `<p>${i18n.t("please_select_transaction_account")}</p>`;
                result = false;
            }

            // Secondary Account
            if (this.secondaryAccount.uuid === "" && secondaryAccountCount > 0) {
                msg += `<p>${i18n.t("transaction_secondary_account_is_required")}</p>`;
                result = false;
            }
            if (this.secondaryAccount.uuid !== "" && secondaryAccountCount === 0) {
                msg += `<p>${i18n.t("expense_secondary_account_is_required")}</p>`;
                result = false;
            }

            // Use for Cash Advance
            if (
                this.expense.use_for_option === 2 &&
                this.expense.use_for_transaction_uuid === ""
            ) {
                msg += `<p>${i18n.t("please_select_related_cash_advance")}</p>`;
                result = false;
            }

            /* Location */
            if (this.location.id === "") {
                msg += `<p>${i18n.t("location_is_required")}</p>`;
                result = false;
            }

            /* Segment */
            if (this.segment.id === "") {
                msg += `<p>${i18n.t("segment_is_required")}</p>`;
                result = false;
            }

            // Show Alert
            this.errorMessage = msg;

            this.alert = result === false;

            return result;
        },
        // All Saves
        async onSaveOptionClick(mode) {
            if (this.$refs.form.validate() && this.validateForm()) {
                let isValidClosingDate = await Helper.validateClosingDate(
                    this.expense.expense_date
                );
                if (isValidClosingDate) {
                    this.saveMode = mode;
                    this.save();
                }
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
                    this.clear();
                    this.$router.go(-1);
                }
            });
        },
        clear() {
            // Reset Form
            this.isEdit = false;
            this.saveMode = "";

            this.subTotal = 0;
            this.discountAmount = 0;
            this.purchaseTax = 0;
            this.whdTax = 0;
            this.totalAmount = 0;
            this.supplierDepositAmount = 0;
            this.depositAmount = 0;
            this.amountDue = 0;
            this.hasAdditionalCost = false;

            this.expense = new ExpenseModel();
            this.journal = new JournalModel();
            this.journalEntries = [];
            this.employee = new EmployeeModel();
            this.supplier = new SupplierModel();
            this.paymentTerm = new PaymentTermModel();
            this.currency = new CurrencyModel(institute.baseCurrency);
            this.exchangeRate = new ExchangeRateModel(institute.baseCurrency);
            this.secondaryAccount = new AccountModel();
            this.location = new LocationModel();
            this.segment = new SegmentModel();
            this.project = new ProjectModel();

            let expDS = this.$refs.expenseAccountDS.kendoWidget();
            expDS.data([]);

            this.setDefaultData();
        },
        save() {
            let self = this;

            // Draft Mode
            if (this.saveMode === SaveOption.SAVEDRAFT) {
                this.expense.is_draft = 1;
            } else {
                this.expense.is_draft = 0;
            }

            // Shrink Data
            this.shrinkData();

            // Add Journal
            this.addJournal();

            // Sync Data
            this.showLoading = true;
            expenseHandler.save({
                expense: this.expense,
                journal: this.journal,
                journal_entries: this.journalEntries,
            }).then(async (response) => {
                if (response) {
                    if (response.data.uuid) {
                        this.showLoading = true;
                        await self.saveTxnExpense(response);
                        // await self.autoCalculateTaxDetail()
                        self.showLoading = false;
                    }
                }else{
                    self.showLoading = false;
                    this.$snotify.error(i18n.t("error_something_wrong"));
                }
            })
            .catch((error) => {
                self.showLoading = false;
                this.$snotify.error(error);
            })
            .finally(() => {
                // self.showLoading = false;
            });
        },
        // Response Status
        async responseStatus(response) {
            if (response.status === 200) {
                if (this.saveMode === SaveOption.SAVECLOSE || this.saveMode === SaveOption.DELETE) {
                    /* Save Close or Delete */
                    if (this.isEdit) {
                        this.goBackToViewPage();
                    } else {
                        this.$router.go(-1);
                    }
                }

                this.clear();

                /* Alert Success */
                this.$snotify.success(i18n.t("successful"));
            } else {
                /* Alert Error */
                this.$snotify.error(i18n.t("error_something_wrong"));
            }
        },
        // Go back to view page after edit mode
        getExpense() {
            return new ExpenseModel(this.expense);
        },
        goBackToViewPage() {
            this.$router.replace({
                name: "Expenses View",
                params: {initExpense: this.getExpense()},
            });
        },
        HideSmallSideBar() {
            this.isHideBar = !this.isHideBar;
        },
        async loadPaymentTermList() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (this.supplier) {
                        const strFilter =
                            "?id=" +
                            this.supplier.id +
                            "&transactionDate=" +
                            this.expense.expense_date +
                            "&type=Vendor";
                        this.paymentTerm = new PaymentTermModel();
                        paymentTermHandler_.get(strFilter).then((res) => {
                            if (res.data.statusCode === 200) {
                                const terms = res.data.data;
                                if (!kendo.jQuery.isEmptyObject(terms)) {
                                    this.paymentTerm = terms.term;
                                    this.calculateDueDate(this.paymentTerm);
                                }
                            }
                        });
                    }
                }, 10);
            });
        },
        async autoCalculateTaxDetail() {
            let ids = []
            this.taxListDetail.forEach(n => {
                const line = n.line || {}
                ids.push(line.id || '')
            })
            const unique = [...new Set(ids)]
            let result = []
            for (const m of unique) {
                let amount = 0, row = {}, discount = 0, xDiscount = 0, xAmount = 0, taxAmount = 0, xTaxAmount = 0
                let taxDetail = [], isVat = 0
                const found = this.taxListDetail.filter(n => n.line.id === m)
                found.forEach(k => {
                    row = k
                    if (k.isVat === 1) {
                        isVat = 1
                        const detail_ = k.detail || {}
                        taxDetail.push(detail_)

                    }
                    taxAmount += k.taxAmount || 0
                    xTaxAmount += (k.taxAmount || 0) * (k.txnRate || 1)
                    amount += (k.amount || 0)
                    xAmount += (k.amount || 0) * (k.txnRate || 1)
                    discount += (k.discount || 0)
                    xDiscount += (k.discount || 0) * (k.txnRate || 1)
                })

                if (isVat === 1) {
                    row.detail = {
                        specificTax: {
                            name: '',
                            nameLocale: '',
                            amount: 0,
                            exchangeAmount: 0,
                            accountId: '',
                            rate: 1,
                        },
                        publicLightingTax: {
                            name: '',
                            nameLocale: '',
                            amount: 0,
                            exchangeAmount: 0,
                            accountId: '',
                            rate: 1,
                        },
                        otherTax: {
                            name: '',
                            nameLocale: '',
                            amount: 0,
                            exchangeAmount: 0,
                            accountId: '',
                            rate: 1,
                        }
                    }
                } else {
                    row.detail = {}
                }

                row.amount = amount
                row.exchangeAmount = xAmount
                row.taxAmount = taxAmount
                row.exchangeTaxAmount = xTaxAmount
                row.discount = discount
                row.exchangeDiscount = xDiscount
                row.currency = this.currency || {}
                result.push(row)
                taxDetail = []
            }
            const taxDetail = result.map(k => {
                return {
                    amount: k.amount,
                    currency: k.currency,
                    detail: k.detail,
                    discount: k.discount,
                    exchangeAmount: k.exchangeAmount,
                    exchangeDiscount: k.exchangeDiscount,
                    exchangeTaxAmount: k.exchangeTaxAmount,
                    isVat: k.isVat,
                    line: k.line,
                    taxAmount: k.taxAmount,
                    txnRate: k.txnRate
                }
            })
            this.txnExpense.saleTaxDetail = taxDetail
            window.console.log('saleTaxDetail txnExpense', JSON.stringify(taxDetail))
        },
        async loadPurchaseOrder() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    let segmentId = "", locationId = '', priceLevelId = "", supplierId = "", txnDate = "";
                    if (this.segment) {
                        segmentId = this.segment.id || '';
                    }
                    if (this.location) {
                        locationId = this.location.id || '';
                    }
                    if (this.supplier) {
                        supplierId = this.supplier.id;
                    }
                    // if (this.priceLevel) {
                    //     priceLevelId = this.priceLevel.id || '';
                    // }
                    if (this.expense.expense_date) {
                        txnDate = this.expense.expense_date;
                    }
                    let strFilter = "";
                    if (segmentId !== "" && supplierId !== "" && locationId !== "" && txnDate !== "") {
                        strFilter = "?id=" + supplierId + "&segId=" + segmentId + "&locId=" + locationId + "&plId=" + priceLevelId + "&date=" + txnDate + '&type=Purchase Order'
                    }
                    if (strFilter !== "") {
                        this.refFrom = []
                        this.showLoadingPO = true
                        saleOrderHandler
                            .transactionFilter(strFilter)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoadingPO = false
                                    this.purchaseOrders = res.data.data;
                                } else {
                                    this.showLoadingPO = false
                                }
                            })
                    }
                }, 10);
            });
        },
        async loadExpensePurchaseOrder() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (
                        this.$route.params.id !== "" ||
                        this.$route.params.id !== undefined
                    ) {
                        const id = (this.$route.params.id || '')
                        const strId = id.includes('txn-') ? id : 'txn-' + id
                        this.showLoadingPO = true
                        billingHandler
                            .expenseView(strId)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoadingPO = false
                                    if (res.data.data.length > 0) {
                                        this.purchaseOrder = res.data.data[0];
                                    }
                                } else {
                                    this.showLoadingPO = true
                                }
                            })
                    }
                }, 10);
            });
        },
    },
    watch: {
        initExpense() {
            this.initialData();
        },
    },
    created() {
        this.loadData();
    },
    computed: {
        disableMe() {
            if (this.expense) {
                const uuid = this.expense.uuid || "";
                if (uuid) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        },
    },
    mounted() {
        // Initial Data
        this.initialData();
    },
};
</script>

<style scoped>
.v-input.custom-radio
.v-input--selection-controls__input
.v-input--selection-controls__ripple {
    display: none !important;
}

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
    background-color: #f2f2f2;
}

.pa-3.v-card h4 {
    font-size: 18px;
    color: #333;
}

.pa-3.v-card p {
    font-size: 12px;
    color: #b5b5b5;
}

.attachment_file {
    background-color: #efeded;
    border-radius: 0 !important;
}

.attachment_table.v-data-table table {
    border: thin solid rgba(0, 0, 0, 0.12);
}

.attachment_table table tr th {
    border-left: thin solid rgba(0, 0, 0, 0.12);
    height: 35px;
    border-right: thin solid rgba(0, 0, 0, 0.12);
}

.block_debit,
.block_credit {
    border-bottom: 1px solid #fff;
}

.block_debit p.number,
.block_credit p.number {
    font-size: 25px;
    color: #7f7f7f;
}

.block_debit h5,
.block_credit h5,
.block_difference h5 {
    text-transform: uppercase;
    color: #7f7f7f;
    font-size: 15px;
    font-weight: normal;
}

.block_difference h5 {
    font-size: 18px;
}

.block_difference h5 span {
    font-size: 15px;
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
    transition: 0.5s ease-in;
    flex: 0 0 0;
    padding: 0;
}

.hide_big_bar_class {
    max-width: 100%;
    transition: 0.5s ease-in;
    flex: 0 0 100%;
}

.info_add {
    background-color: #ffffff;
}

.small_sidebar {
    height: 98%;
    position: relative;
    padding: 12px;
    background-color: #edf1f5;
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
    background-color: #edf1f5;
    min-height: 120px;
}

.deposite_input {
    width: 100px;
}

.btn_save_draft {
    color: #ffffff;
    background-color: #00b0f0 !important;
    text-transform: capitalize;
}

.save_option {
    background-color: #203864 !important;
}

.btn_add_small {
    height: 27px !important;
    min-width: 25px !important;
    font-size: 10px;
    padding: 0 22px !important;
    background-color: #00b050 !important;
    color: #ffffff;
    border-radius: 0 !important;
}

.list_site_inv {
    background-color: #92d050;
    color: #ffffff;
    font-size: 12px;
}

.list_site_exp {
    background-color: #c5e0b4;
    color: #000000;
    font-size: 12px;
    line-height: 16px;
    min-height: 40px;
}

.checkbox_inv {
    padding: 2px;
    margin-top: 3px;
    margin-right: 2px;
}

.exp_select {
    font-size: 12px !important;
}

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
</style>
