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
                                class="bigSide py-0"
                                sm="8"
                                cols="12"
                                style="transition: 0.3s ease-in"
                                :class="{ hide_big_bar_class: isHideBar }"
                            >
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">
                                            {{ $t("expense_summary_verify") }}
                                        </h2>

                                        <v-icon
                                            v-if="isHideBar"
                                            @click="cancel()"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                        <span
                                            style="transition: 0.3s ease-in; z-index: 10;"
                                            :class="{
												iconArrow: !isHideBar,
												iconArrowHide: isHideBar,
											}"
                                        >
											<v-icon
                                                size="22"
                                                class="arr_icon"
                                                @click="HideSmallSideBar"
                                                v-if="isHideBar"
                                            >mdi-chevron-left-circle
											</v-icon>
											<v-icon
                                                size="22"
                                                class="arr_icon"
                                                @click="HideSmallSideBar"
                                                v-if="!isHideBar"
                                            >mdi-chevron-right-circle
											</v-icon>
										</span>
                                    </v-card>
                                    <v-card outlined dense class="px-3 no_border" color="grayBg">
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{ $t("employee") }}</label>
                                                {{ expenseSummary.employee.name }}
                                                <br>
                                                <label class="label">{{ $t("number") }}</label>
                                                {{ expenseSummary.number }}
                                            </v-col>

                                            <v-col sm="4" cols="12">
                                                <label class="label" style="">{{ $t("date") }}</label>
                                                <app-datepicker
                                                    :initialDate="expenseSummary.date"
                                                    @emitDate="expenseSummary.date = $event"
                                                    @onChanged="onDateChanges"
                                                />

                                                <label class="label" style="">{{ $t("transaction_account") }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    :items="transactionAccounts"
                                                    item-value="uuid"
                                                    :item-text="(item) => `${item.number} - ${item.name}`"
                                                    v-model="transactionAccount"
                                                    no-data-text="No data found."
                                                    :rules="[(v) => !!v || 'Transaction Account is required']"
                                                    placeholder="Transaction Account"
                                                    return-object
                                                    outlined
                                                ></v-select>
                                            </v-col>

                                            <v-col sm="4" cols="12">
                                                <label class="label" style="">{{
                                                        $t("description")
                                                    }}</label>
                                                <v-textarea
                                                    class="mt-1"
                                                    v-model="expenseSummary.description"
                                                    no-resize
                                                    height="126"
                                                    outlined
                                                    rows="5"
                                                >
                                                </v-textarea>
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row style="background-color: #fff">
                                        <v-col sm="12" cols="12" class="py-0">
                                            <kendo-datasource
                                                ref="expenseAccountDS"
                                                :data="expenseEntries"
                                                :change="onExpenseAccountDSChanges"
                                                :schema="schemaDefinition"
                                            />

                                            <kendo-grid
                                                id="expenseSummaryGrid"
                                                ref="expenseSummaryGrid"
                                                class="grid-function"
                                                :data-source-ref="'expenseAccountDS'"
                                                :persistSelection="true"
                                                :column-menu="true"
                                                :editable="true"
                                                :scrollable-virtual="true"
                                                :change="onExpenseGridChanges"
                                            >
                                                <kendo-grid-column :selectable="true" :width="40"/>
                                                <kendo-grid-column
                                                    :title="$t('no.')"
                                                    :template="rowNumberTmpl"
                                                    :width="55"
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
                                                    :field="'bill_date'"
                                                    :title="$t('bill_date')"
                                                    :format="'{0:dd-MM-yyyy}'"
                                                    :editable="()=>{return false}"
                                                    :width="200"
                                                    :headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'bill_number'"
                                                    :title="$t('bill_number')"
                                                    :width="200"
                                                    :headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'supplier'"
                                                    :title="$t('vendor')"
                                                    :template="'<span>#=supplier.name||``#</span>'"
                                                    :editor="SupplierEditor"
                                                    :width="200"
                                                    :headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'account'"
                                                    :title="$t('account')"
                                                    :width="200"
                                                    :template="'<span>#=account.name||``#</span>'"
                                                    :editor="AccountEditor"
                                                    :headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :width="200"
                                                    :headerAttributes="{
														style:'text-align: right; background-color: #EDF1F5',
													}"
                                                    :attributes="{
														style: 'text-align: right;',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'quantity'"
                                                    :title="$t('qty')"
                                                    :width="150"
                                                    :editor="NumberEditor"
                                                    :headerAttributes="{
														style:'text-align: right; background-color: #EDF1F5',
													}"
                                                    :attributes="{
														style: 'text-align: right',
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
                                                    :field="'price'"
                                                    :title="$t('price')"
                                                    :format="'{0:n}'"
                                                    :editor="NumberEditor"
                                                    :width="150"
                                                    :headerAttributes="{
														style:'text-align: right; background-color: #EDF1F5',
													}"
                                                    :attributes="{
														style: 'text-align: right',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :editable="() => {return false;}"
                                                    :headerAttributes="{
														style:'text-align: right; background-color: #EDF1F5',
													}"
                                                    :attributes="{
														style: 'text-align: right',
													}"
                                                />
                                                <kendo-grid-column
                                                    :field="'bill_currency'"
                                                    :title="$t('currency')"
                                                    :template="'<span>#=bill_currency.code||``#</span>'"
                                                    :editable="()=>{return false}"
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
                                                    :field="'class1'"
                                                    :title="$t('class_1')"
                                                    :template="'<span>#=class1.name||``#</span>'"
                                                    :width="200"
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
                                                    :editor="ClassEditor.class5"
                                                    :headerAttributes="{
														style: 'background-color: #EDF1F5',
													}"
                                                />
                                            </kendo-grid>
                                        </v-col>

                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-row>
                                                <v-col sm="5" cols="12" class="">

                                                </v-col>
                                                <v-col sm="7" cols="6">
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
                                                                    {{ subTotal }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left">
                                                                    {{ $t("discount") }}
                                                                </td>
                                                                <td class="text-center">
                                                                    :
                                                                </td>
                                                                <td class="text-right">
                                                                    ({{ Number(discountAmount).toLocaleString() }})
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left">
                                                                    {{ $t("purchase_tax") }}
                                                                </td>
                                                                <td class="text-center">
                                                                    :
                                                                </td>
                                                                <td class="text-right">
                                                                    {{ Number(purchaseTax).toLocaleString() }}
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
                                                                    {{ Number(whdTax).toLocaleString() }}
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
                                                                    {{ totalAmount }}
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

                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                    color="black"
                                                    outlined
                                                    class="mr-2 text-capitalize  black--text float-left"
                                                    v-on="on"
                                                >
                                                    {{ $t("select_template") }}
                                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item
                                                    v-for="(item, index) in templates"
                                                    :key="index"
                                                >
                                                    <v-list-item-title>
                                                        {{ item.title }}
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <v-btn
                                            color="black"
                                            class="text-capitalize  white--text float-left"
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
                                    </v-card>
                                </v-form>
                            </v-col>
                            <v-col
                                class="smallSide"
                                sm="4"
                                style="transition: 0.3s ease-in"
                                :class="{ hide_small_bar_class: isHideBar }"
                            >
                                <h3
                                    style="color: #b3b5bc; font-size: 20px"
                                    v-if="!isHideBar"
                                    class="text-uppercase float-right mt-n3"
                                >
									<span class="pointer" @click="Help('expenses')">
										{{ $t("help") }}
									</span>
                                    <v-icon
                                        @click="cancel()"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right mt-n1"
                                    >close
                                    </v-icon>
                                </h3>

                                <div v-if="!isHideBar" class="small_sidebar mt-8 px-4 grayBg">
                                    <v-card
                                        class="pa-3 no-boxshadow d-flex flex-column"
                                        color="primary"
                                        style="min-height: 70px;"
                                    >
                                        <h3
                                            style="font-size: 18px"
                                            class="text-white text-uppercase mb-2 justify-start"
                                        >
                                            {{ $t("amount") }}
                                        </h3>
                                        <h3
                                            class="text-bold text-white justify-end"
                                            style="font-size: 22px"
                                        >
                                            {{ Number(amountDue).toLocaleString() }}
                                        </h3>
                                    </v-card>
                                    <v-row>
                                        <v-col sm="12" cols="12" class="pb-0 pt-4">
                                            <label class="label">{{ $t("segment") }}</label>
                                            <app-segment-dropdownlist
                                                :initSegment="segment"
                                                @emitSegment="segment = $event"
                                                @onChanged="loadCashAdvance"
                                            />

                                            <label class="label">{{ $t("location") }}</label>
                                            <app-location-dropdownlist
                                                :initLocation="location"
                                                @emitLocation="location = $event"
                                            />

                                            <label class="label">{{ $t("project") }}</label>
                                            <app-project-dropdownlist
                                                :initProject="project"
                                                @emitProject="project = $event"
                                                :initDisabled="disableProject"
                                            />

                                            <label class="label">{{ $t("for_the_month_of") }}</label>
                                            <app-monthof-picker
                                                :initMonthOf="expenseSummary.month_of"
                                                @emitMonthOf="expenseSummary.month_of = $event"
                                            />
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-radio-group
                                                class="mt-0 custom-radio"
                                                @change="onUseForOptionChanges"
                                                v-model="expenseSummary.use_for_option"
                                                column
                                            >
                                                <v-radio :label="$t('credit')" :value="0"/>
                                                <v-radio :label="$t('cash')" :value="3"/>
                                                <v-radio
                                                    :disabled="employee.id === ''"
                                                    :label="$t('for_reimbursement')"
                                                    :value="1"
                                                />
                                                <v-radio
                                                    :disabled="employee.id === ''"
                                                    :label="$t('related_to_cash_advance')"
                                                    :value="2"
                                                />
                                            </v-radio-group>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-select
                                                @change="onCashAdvanceChanges"
                                                :loading="showCashAdvanceLoading"
                                                :disabled="expenseSummary.use_for_option !== 2"
                                                v-model="expenseSummary.use_for_transaction_uuid"
                                                :items="cashAdvances"
                                                item-value="uuid"
                                                item-text="number"
                                                outlined
                                            />
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                type="loading"
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"
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
    AccountModel,
    CurrencyModel,
    EmployeeModel,
    ContactModel,
    JournalModel,
    JournalEntryModel,
    ClassModel,
    UomModel,
    LocationModel,
    SegmentModel,
    ProjectModel,
    DiscountItemModel,
    TaxModel, Expenses, PaymentTermModel,
} from "@/scripts/model/AppModels";
import ExpenseSummaryModel from "@/scripts/model/ExpenseSummary";
// import ExpenseSummaryDetailModel from "@/scripts/model/ExpenseSummaryDetail";
import ExpenseSummaryDetailExtendedModel from "@/scripts/model/ExpenseSummaryDetailExtended";
import {ShowResource} from "@/observable/store";

/* Editors */
import AccountEditor from "@/scripts/kendo_editor/Account";
import ClassEditor from "@/scripts/kendo_editor/Clazz";
import UomEditor from "@/scripts/kendo_editor/Uom";
import PurchaseDiscountItemEditor from "@/scripts/kendo_editor/PurchaseDiscountItem";
import PurchaseTaxEditor from "@/scripts/kendo_editor/PurchaseTax";
import NumberEditor from "@/scripts/kendo_editor/NumberInputBox";
import SupplierEditor from "@/scripts/kendo_editor/Supplier";
import AccountMappingModel from "@/scripts/account-map/Account";
import billingHandler from "@/scripts/invoice/handler/billingHandler";
import {uuid} from "vue-uuid";

/* Store */
// import store from "@/store";
// const institute = store.state.institute.institute;

/* Handlers */
const {
    cashAdvanceHandler,
} = require("@/scripts/AppHandlers");

const expenseHandler = require("@/scripts/expenseHandler");
const expenseSummaryHandler = require("@/scripts/expenseSummaryHandler");

const {
    EntityType,
    SaveOption,
    AccountTypeCode,
    TaxType,
    Setting,
} = require("@/scripts/default_setup/Collections");

export default {
    name: "ExpenseSummaryVerify",
    components: {
        LoadingMe: () => import("@/components/Loading"),
        "app-datepicker": () => import("@/components/custom_templates/DatePickerComponent"),
        "app-monthof-picker": () =>
            import("@/components/kendo_templates/MonthOfPicker"),
        "app-location-dropdownlist": () =>
            import("@/components/dropdownlist/Location"),
        "app-project-dropdownlist": () =>
            import("@/components/dropdownlist/Project"),
        "app-segment-dropdownlist": () =>
            import("@/components/dropdownlist/Segment"),
    },
    props: {
        initExpenseSummary: {
            type: ExpenseSummaryModel,
        },
    },
    data: () => ({
        // Obj
        numbers: null,
        verifiedExpenses: [],
        expenseSummary: new ExpenseSummaryModel(),
        employee: new EmployeeModel(),
        transactionAccount: new AccountModel(),
        advanceSettlementClearingAccount: new AccountModel(),
        location: new LocationModel(),
        segment: new SegmentModel(),
        project: new ProjectModel(),
        // List
        selectedExpenseIds: [],
        cashAdvances: [],
        accounts: [],
        transactionAccounts: [],
        expenseEntries: [],
        // Other
        subTotal: 0,
        discountAmount: 0,
        purchaseTax: 0,
        whdTax: 0,
        totalAmount: 0,
        amountDue: 0,
        files: [],
        user: Helper.getUser(),
        templates: [],
        maxDecimal: Setting.MAX_DICEMAL,
        disableProject: false,
        // Form validation
        valid: true,
        isEdit: false,
        alert: false,
        errorMessage: "",
        saveMode: "",
        SaveOption: SaveOption,
        // Editors
        AccountEditor: AccountEditor,
        NumberEditor: NumberEditor,
        ClassEditor: ClassEditor,
        UomEditor: UomEditor,
        PurchaseDiscountItemEditor: PurchaseDiscountItemEditor,
        PurchaseTaxEditor: PurchaseTaxEditor,
        SupplierEditor: SupplierEditor,
        // Sidebar
        isHideBar: false,
        // LoadingMe
        showLoading: false,
        showCashAdvanceLoading: false,
        // Kendo dataSource
        schemaDefinition: {
            model: {id: "uuid"},
        },
        txnExpense: new Expenses(),
        txnExpenseList: [],
        paymentTerm: new PaymentTermModel(),
    }),
    methods: {
        Help(key_search) {
            ShowResource(key_search);
        },
        // Initial Data
        initialData() {
            if (this.initExpenseSummary) {
                this.expenseSummary = this.initExpenseSummary;
                this.bindData();
            }
        },
        // Set default data
        async setDefaultData() {
            this.expenseSummary = new ExpenseSummaryModel();
            this.generateNumber();
        },
        /* Load Data */
        async loadData() {
            // Call Account List
            this.accounts = await this.$store.dispatch("accounting/getAccounts");

            // Advance Settlement Clearing Account by banhji_account_number
            let advSetClrAcc = this.accounts.find((value) => value.number === AccountTypeCode.ADVANCE_SETTLEMENT_CLEARING_CODE); // Will change later
            this.advanceSettlementClearingAccount = new AccountModel(advSetClrAcc);

            // Filter Transaction Accounts
            this.filterTransactionAccount();
        },
        // Bind data from prop for edit mode
        async bindData() {
            this.showLoading = true;

            this.generateNumber();

            /* Date */
            this.expenseSummary.date = new Date().toISOString().substr(0, 10);

            // Contacts
            this.employee = new EmployeeModel(this.expenseSummary.employee);

            // Sidebar
            let locations = await this.$store.dispatch("locations/getList");
            this.location = new LocationModel(
                locations.find((i) => i.id === this.expenseSummary.location_uuid)
            );

            let segments = await this.$store.dispatch("segments/getList");
            this.segment = new SegmentModel(
                segments.find((i) => i.id === this.expenseSummary.segment_uuid)
            );

            let projects = await this.$store.dispatch("projects/getList");
            this.project = new ProjectModel(
                projects.find((i) => i.id === this.expenseSummary.project_uuid)
            );

            // Cash Advance
            if (
                this.employee.id !== "" &&
                this.segment.id !== "" &&
                this.expenseSummary.use_for_option === 2
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
				discountItems = await this.$store.dispatch("discountItems/getList"),
				taxItems = await this.$store.dispatch("taxes/getList"),
				uoms = await this.$store.dispatch("unitOfMeasurements/getList"),
				clazz = await this.$store.dispatch("classes/getList");

            this.expenseSummary.summary_details.forEach((value) => {
                // Purchase Tax
                if (value.account.account_type.number === AccountTypeCode.PURCHASE_TAX) {
                    purchaseTaxAmount += value.amount;
                } else {
                    if (value.amount > 0 && value.account.number !== AccountTypeCode.TAX_RELATED_EXPENSE_CODE) {
                        let entry = new ExpenseSummaryDetailExtendedModel(value);

						// Date
						entry.bill_date = new Date(value.bill_date);

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

                        // Transaction Account (Payable Account / Clearing Account)
                        if (value.account.uuid === this.expense.transaction_account.uuid) {
                            this.amountDue = value.amount * -1;
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

            this.showLoading = false;
        },
        // Number
        async generateNumber() {
            this.numbers = await Helper.generateAccountingNumber(
                EntityType.EXPENSES,
                this.expenseSummary.date
            );
        },
        applyPrefixNumber(lastNumber) {
            /* Prefix */
            let pf = this.numbers.prefix;

            // Structure
            let structure = '', txnDate = new Date(this.expenseSummary.date);
            switch (pf.structure.toLowerCase()) {
                case 'yyyy':
                    structure = txnDate.getFullYear().toString();
                    break;
                case 'yy':
                    structure = txnDate.getFullYear().toString().substr(2);
                    break;
                case 'yyyymm':
                    structure = txnDate.getFullYear().toString() + (txnDate.getMonth() + 1).toString().padStart(2, '0');
                    break;
                case 'yymm':
                    structure = txnDate.getFullYear().toString().substr(2) + (txnDate.getMonth() + 1).toString().padStart(2, '0');
                    break;

                default:// None structure
                    break;
            }

            // Starting Number
            if (lastNumber === 0) {
                lastNumber = pf.number;
            } else {
                // Sequencing Number (Reset Number)
                pf.sequcencing = 'prefix';// will change later
                switch (pf.sequcencing.toLowerCase()) {
                    case 'month':// Month
                        lastNumber = 1;
                        break;
                    case 'year':// Year
                        lastNumber = 1;
                        break;
                    default:// Prefix
                        lastNumber++;
                        break;
                }
            }

            let number = pf.abbr + pf.prefixSeparator + structure + pf.numberSeparator + lastNumber.toString().padStart(pf.format, '0');

            return number;
        },
        // Load Cash Advance
        loadCashAdvance() {
            /* Clear */
            this.cashAdvances = [];
            this.expenseSummary.use_for_transaction_uuid = "";

            if (
                this.employee.id !== "" &&
                this.segment.id !== "" &&
                this.expenseSummary.use_for_option === 2
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
        /* On Cash Advance Changes */
        onCashAdvanceChanges() {
            this.setCashAdvanceProject();
            this.disableProject = false;
        },
        /* On Date Chanes */
		onDateChanges () {
			this.expenseSummary.month_of = new Date(this.expenseSummary.date).toISOString().substr(0, 7);
			this.generateNumber();
		},
        /* Bind project from cash advance */
        async setCashAdvanceProject() {
            if (this.expenseSummary.use_for_transaction_uuid !== "") {
                let cashAdvance = this.cashAdvances.find(
                    (i) => i.uuid === this.expenseSummary.use_for_transaction_uuid
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
            this.expenseSummary.use_for_transaction_uuid = "";
            this.transactionAccount = new AccountModel();

            /* Load Cash Advance */
            if (this.expenseSummary.use_for_option === 2) {
                this.loadCashAdvance();
            }

            this.filterTransactionAccount();
        },
        // Filter Transation Account
        filterTransactionAccount() {
            if (this.expenseSummary.use_for_option === 0) {
                // Credit (Payable Account)
                this.transactionAccounts = this.accounts.filter((i) => ~AccountTypeCode.PAYABLE_ACCOUNTS.indexOf(i.account_type.number));
            } else if (this.expense.use_for_option === 3) {
                // Cash Account
                this.transactionAccounts = this.accounts.filter((i) => ~AccountTypeCode.CASH_ACCOUNTS.indexOf(i.account_type.number));
            } else {
                // Reimbursement / Cash Advance
                this.transactionAccount = this.advanceSettlementClearingAccount;
                this.transactionAccounts = [this.advanceSettlementClearingAccount];
            }
        },
        /* Kendo */
        // DataSource Changes
        async onExpenseAccountDSChanges(e) {
            if (e.field) {
                let dataRow = e.items[0];

                if (e.field === "supplier") {
					dataRow.set("account", new AccountModel(dataRow.supplier.accountTax.expenseAcc));
				} else if (e.field === "account") {
                    this.addExtraRow(dataRow.uid);
                } else if (e.field === "bill_date" || e.field === "bill_currency") {
					let xrate = await this.getExchangeRate(dataRow.bill_date, dataRow.bill_currency.code);

					dataRow.set("exchange_rate_uuid", xrate.id);
					dataRow.set("exchange_rate", xrate.rate);
                } else if (e.field === "quantity" || e.field === "price") {
                    let amt =
                        kendo.parseFloat(dataRow.quantity) *
                        kendo.parseFloat(dataRow.price);
                    dataRow.set("amount", amt);
                } else if (e.field === "uom") {
                    if (dataRow.uom) {
                        dataRow.set("uom_uuid", dataRow.uom.id);
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
        autoCalculate() {
            let expDS = this.$refs.expenseAccountDS.kendoWidget(),
                subTotal = 0,
                discount = 0,
                purchaseTax = 0,
                whdTax = 0,
                inclusiveTax = 0,
                discountItem = [];

            // Expense
            expDS.data().forEach((value) => {
                if (~this.selectedExpenseIds.indexOf(value.uuid)) {
                    let amt = kendo.parseFloat(value.price) * kendo.parseFloat(value.quantity);

                    /* Exchanged Amount */
                    value.exchanged_amount = amt * value.exchange_rate;
                    
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

            let amountDue = this.totalAmount - whdTax;
            this.amountDue = amountDue;
        },
        // Row Number Template
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.expenseAccountDS.kendoWidget(),
                index = ds.indexOf(dataItem);

            return index + 1;
        },
        // On Expense Grid Changes
        onExpenseGridChanges() {
            let grid = this.$refs.expenseSummaryGrid.kendoWidget();

            // let ids = []
            // for (let id in grid._selectedIds)
            // ids.push(id)

            this.selectedExpenseIds = grid.selectedKeyNames();
            this.autoCalculate();
        },
        // Shrink Data
        shrinkData() {
            let expenseList = [],
                expDS = this.$refs.expenseAccountDS.kendoWidget(),
                lastNumber = this.numbers.last_number,
                counter = 1;

            /* Update Expense Summary Status */
            this.expenseSummary.is_cleared = 1;

            // Expense Entries on Dr
            expDS.data().forEach((value) => {
                // Filter selected expenses
                if (~this.selectedExpenseIds.indexOf(value.uuid)) {
                    let entries = [];

                    /* Update Expense Summary Detail Status Approved */
                    value.set("status", 1);
                    
                    /* Status */
                    if (this.expenseSummary.use_for_option === 3) {/* Cash */
                        value.set("is_cleared", 1); /* Paid */
                    }

                    /* EXPENSE */
                    let expense = new ExpenseModel(value);

                    /* uuid */
                    expense.uuid = ""; // New

                    /* Number */
                    if (counter === 1) {
                        expense.number = this.numbers.number;
                    } else {
                        expense.number = this.applyPrefixNumber(lastNumber);
                        lastNumber++;
                    }
                    counter++;
                    expense.prefix_format = this.numbers.prefix_format;

                    // Date
                    expense.expense_date = Helper.toISODate(this.expenseSummary.date);
                    expense.bill_date = Helper.toISODate(value.bill_date);

                    // Supplier
                    expense.supplier = new ContactModel(value.supplier);

                    // Employee
                    expense.employee = new ContactModel(this.employee);

                    // Sidebar
                    expense.location_uuid = this.location.id;
                    expense.segment_uuid = this.segment.id;
                    expense.project_uuid = this.project.id;

                    // User
                    expense.created_by = this.user;

                    /* ENTRIES */
                    let entry = new ExpenseEntryModel(value);

                    // Account
                    entry.account = new AccountModel(value.account);
                    entry.account_uuid = value.account.uuid;

                    // Contact
                    entry.primary_contact = new ContactModel(value.supplier);
                    entry.secondary_contacts = [new ContactModel(this.employee)];

                    // Currency
                    entry.currency = new CurrencyModel(value.bill_currency);
                    entry.exchange_rate_uuid = value.exchange_rate_uuid;
                    entry.exchange_rate = value.exchange_rate;
                    entry.exchanged_amount = value.exchanged_amount;

                    // Discount
                    entry.discount = new DiscountItemModel(value.discount);

                    // Tax
                    entry.tax_item = new TaxModel(value.tax_item);

                    /* Expense Account on Dr */
                    entries.push(new ExpenseEntryModel(entry));

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
                                discountEntry.exchanged_amount = discountAmount * value.exchange_rate;
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
                                                taxRelatedExpenseEntry.exchanged_amount = taxAmount * value.exchange_rate;
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
                                taxEntry.exchanged_amount = taxAmount * value.exchange_rate;
                                taxEntry.tax_amount = 0;
                                taxEntry.exchanged_tax_amount = 0;

                                /* Push Tax Entry */
                                entries.push(taxEntry);
                            }

                    // Transaction Entries on Cr
                    entries.push(
                        new ExpenseEntryModel({
                            account: new AccountModel(this.transactionAccount),
                            account_uuid: this.transactionAccount.uuid,
                            primary_contact: new ContactModel(value.supplier),
                            secondary_contacts: [new ContactModel(this.employee)],
                            description: this.expenseSummary.description,
                            currency: value.bill_currency,
                            amount: value.amount * -1, // Cr side is negative
                            exchange_rate_uuid: value.exchange_rate_uuid,
                            exchange_rate: value.exchange_rate,
                            exchanged_amount: value.amount * -1 * value.exchange_rate,
                        })
                    );

                    /* Add Entries */
                    expense.expense_entries = entries;
                    // mapping to Dynamodb ( expense record )
                    this.mappingExpense(expense, entry);

                    /* JOURNAL */
                    let journal = new JournalModel();
                    journal.number = expense.number;
                    journal.description = expense.journal_note;
                    journal.journal_date = Helper.toISODate(this.expenseSummary.date);
                    journal.journal_type = EntityType.AUTO_JOURNAL;
                    journal.transaction_type = EntityType.EXPENSES;
                    journal.related_transaction_uuid = this.expenseSummary.use_for_transaction_uuid;
                    journal.month_of = this.expenseSummary.month_of;
                    journal.location_uuid = expense.location_uuid;
                    journal.project_uuid = expense.project_uuid;
                    journal.segment_uuid = expense.segment_uuid;
                    journal.prefix_format = this.numbers.prefix_format;
                    journal.is_draft = expense.is_draft;
                    journal.created_date = expense.created_date;
                    journal.created_by = expense.created_by;
                    journal.modified_by = expense.modified_by;

                    let journalEntries = [];
                    entries.forEach((value) => {
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
                        entry.exchanged_amount = entry.amount * value.exchange_rate;

                        // Add Entry
                        journalEntries.push(entry);
                    });

                    // Add Entry
                    expenseList.push({
                        expense: expense,
                        journal: journal,
                        journal_entries: journalEntries,
                    });
                } else {
                    /* Update Expense Summary Detail Status Reject */
                    value.set("status", 2);
                }
            });

            /* Add Verified */
            this.verifiedExpenses = expenseList;
        },
        // Validating
        validateForm() {
            let result = true,
                expDS = this.$refs.expenseAccountDS.kendoWidget(),
                msg = "";

            // Expense
            expDS.data().forEach((value, index) => {
                if (~this.selectedExpenseIds.indexOf(value.uuid)) {
                    if (value.supplier.name !== "" && value.amount > 0) {
                        // No date
                        if (value.bill_date === "") {
                            result = false;
                            msg += `<p>${i18n.t("please_select_date_at_row_number")} ${index + 1}</p>`;
                        }

                        // No number
                        if (value.bill_number === "") {
                            result = false;
                            msg += `<p>${i18n.t("please_input_bill_number_at_row_number")} ${index + 1}</p>`;
                        }
                    }

                    // No supplier
                    if (value.supplier.name === "" && value.amount > 0) {
                        result = false;
                        msg += `<p>${i18n.t(
                            "please_select_supplier_at_row_number"
                        )} ${index + 1}</p>`;
                    }

                    // No amount
                    if (value.supplier.name !== "" && value.amount === 0) {
                        result = false;
                        msg += `<p>${value.supplier.name} ${i18n.t("has_no_amount")}</p>`;
                    }
                }
            });

            // Non selected expense
            if (this.selectedExpenseIds.length === 0) {
                msg += `<p>${i18n.t("please_select_at_least_one_row")}</p>`;
                result = false;
            }

            // Use for Cash Advance
            if (
                this.expenseSummary.use_for_option === 2 &&
                this.expenseSummary.use_for_transaction_uuid === ""
            ) {
                msg += `<p>${i18n.t("please_select_related_cash_advance")}</p>`;
                result = false;
            }

            /* Transaciton Account */
            if (this.transactionAccount.uuid === "") {
                msg += `<p>${i18n.t("transaction_account_is_required")}</p>`;
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
                    this.expenseSummary.date
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
                    this.setDefaultData();
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
            this.amountDue = 0;
            this.disableProject = false;

            this.numbers = null;
            this.selectedExpenseIds = [];
            this.verifiedExpenses = [];
            this.expenseSummary = new ExpenseSummaryModel();
            this.expenseEntries = [];
            this.employee = new EmployeeModel();
            this.location = new LocationModel();
            this.segment = new SegmentModel();
            this.project = new ProjectModel();

            let expDS = this.$refs.expenseAccountDS.kendoWidget();
            expDS.data([]);
        },
        save() {
            let self = this;

            // Shrink Data
            this.shrinkData();

            // Sync Data
            this.showLoading = true;
            expenseHandler
                .saveBatch(this.verifiedExpenses)
                .then((response) => {
                    if(response){
                        self.updateExpenseSummary();
                        const res = response.data || []
                        self.saveTxnExpense(res);
                        self.responseStatus(response);
                    }else{
                        Helper.alertErrorMsg(i18n.t("error_something_wrong"));
                    }
                })
                .catch((error) => {
                    self.showLoading = false;
                    Helper.alertErrorMsg(error);
                })
                .finally(() => {
                    self.showLoading = false;
                });
        },
        /* Update Expense Summary */
        updateExpenseSummary() {
            // let exp = this.getExp();
            // let expSum = {
            // 	uuid                       : exp.uuid,
            // 	number                     : exp.number,
            // 	date                       : exp.date,
            // 	employee                   : exp.employee,
            // 	segment_uuid               : exp.segment_uuid,
            // 	location_uuid              : exp.location_uuid,
            // 	project_uuid               : exp.project_uuid,
            // 	month_of                   : exp.month_of,
            // 	use_for_option             : exp.use_for_option,
            // 	use_for_transaction_uuid   : exp.use_for_transaction_uuid,
            // 	description                : exp.description,
            // 	summary_details            : exp.summary_details,
            // 	is_draft                   : exp.is_draft,
            // 	is_cleared                 : exp.is_cleared,

            // 	created_by                 : exp.created_by,
            // 	modified_by                : exp.modified_by,
            // 	created_date               : exp.created_date,
            // 	modified_date              : exp.modified_date,
            // };
            expenseSummaryHandler.save(this.expenseSummary);
        },
        // Response Status
        responseStatus(response) {
            if (response.status === 200) {
                if (this.saveMode === SaveOption.SAVECLOSE || this.saveMode === SaveOption.DELETE) {
                    this.clear();
                    this.setDefaultData();

                    this.$router.go(-1);
                } else {
                    /* Save New */
                    this.clear();
                    this.setDefaultData();
                }

                /* Alert Success */
                this.$snotify.success(i18n.t("successful"));
            } else {
                /* Alert Error */
                this.$snotify.error(i18n.t("error_something_wrong"));
            }
        },
        HideSmallSideBar() {
            this.isHideBar = !this.isHideBar;
        },
        mappingExpense(expense, entry) {
            if (this.expenseSummary.use_for_option === 0) {
                this.txnExpense = new Expenses()
                entry['id'] = 'lin-' + uuid.v1();
                const subTotal = entry.amount || 0
                const discount = this.calculateDiscount(entry.discount, subTotal)
                const amount = entry.amount || 0
                const amountAfterDiscount = amount - (discount || 0)
                const taxItem = entry.tax_item || {}
                const taxAccount = taxItem.account || {}
                const taxAccountType = taxAccount.account_type || {}
                const taxAmount = this.autoCalculateTax(entry.tax_item, amountAfterDiscount)
                let purchaseTaxAmount = 0
                let whdTaxAmount = 0
                // Purchase Tax
                if (taxAccountType.number === AccountTypeCode.PURCHASE_TAX) {
                    purchaseTaxAmount = taxAmount || 0
                } else if (taxAccountType.number === AccountTypeCode.WHD_TAX) {
                    whdTaxAmount = taxAmount || 0
                }
                const total = subTotal - (discount || 0) + purchaseTaxAmount - whdTaxAmount;
                this.txnExpense.id = '';
                this.txnExpense.journal_uuid = '';
                this.txnExpense.type = "Expense";
                this.txnExpense.abbr = '';
                this.txnExpense.transactionType = {};
                this.txnExpense.referenceNo = expense.number
                this.txnExpense.transactionDate = expense.expense_date;
                this.txnExpense.dueDate = expense.expense_date;
                this.txnExpense.billDate = expense.bill_date;
                this.txnExpense.billNumber = expense.bill_number;
                this.txnExpense.currency = this.removeEmptyValues(entry.currency);
                this.txnExpense.supplier = this.supplierMap(expense.supplier);
                this.txnExpense.employee = this.removeEmptyValues(expense.employee);
                this.txnExpense.paymentTerm = this.paymentTerm;
                this.txnExpense.segment = this.removeEmptyValues(this.segment);
                this.txnExpense.location = this.removeEmptyValues(this.location);
                this.txnExpense.project = this.removeEmptyValues(this.project);
                this.txnExpense.monthOf = this.expenseSummary.month_of;

                this.txnExpense.additionalCostSupplier = this.removeEmptyValues(expense.additional_cost_supplier);
                this.txnExpense.use_for_transaction_uuid = this.expenseSummary.use_for_transaction_uuid;
                this.txnExpense.useForOption = this.expenseSummary.use_for_option;
                this.txnExpense.transactionNote = entry.description || '';
                this.txnExpense.journalNote = this.expenseSummary.description || ''
                this.txnExpense.itemLines = [entry];
                this.txnExpense.account = new AccountMappingModel(this.transactionAccount);
                this.txnExpense.saveOption = expense.is_draft;
                this.txnExpense.status = 1;
                this.txnExpense.createdAt = expense.created_date;

                this.txnExpense.total = parseFloat(total);
                this.txnExpense.exchangeTotal = parseFloat(total) * (entry.exchange_rate || 1);
                this.txnExpense.amountDue = total
                this.txnExpense.remainingAmount = total
                this.txnExpense.subTotal = subTotal
                this.txnExpense.purchaseTax = purchaseTaxAmount;
                this.txnExpense.whdTax = whdTaxAmount;
                this.txnExpense.supplierDiscountItem = this.removeDuplicate([entry.discount] || []);
                this.txnExpense.loggedUser = this.loggedUser(expense.created_by);

                this.txnExpense.txnRate = entry.exchange_rate;
                this.txnExpense.discountTotal = parseFloat((discount || 0));
                this.txnExpense.depositAmount = 0
                this.txnExpense.depositDeduction = 0
                this.txnExpense.exchangeDepositDeduction = 0
                this.txnExpense.exchangeAmount = total * (entry.exchange_rate || 1);
                this.txnExpenseList.push(this.txnExpense)
                window.console.log("Expense", this.txnExpenseList);
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
        saveTxnExpense(response) {
            this.txnExpenseList.forEach(m => {
                const found = response.filter(n => n.number === m.referenceNo)
                if (found.length > 0) {
                    const data = found[0] || {}
                    m['uuid'] = data.uuid || ''
                    m['id'] = ''
                    m['journal_uuid'] = data.journal_uuid || ''
                    m['actionType'] = 'new'
                }
            })
            let data = this.txnExpenseList;
            billingHandler
                .createExpenseBatch(data)
                .then((response) => {
                    if (response.data.statusCode === 201) {
                        this.$snotify.success("Successfully");
                    }
                })
                .catch((e) => {
                    this.$snotify.error("Something went wrong");
                    this.errors.push(e);
                });
        },
    },
    watch: {
        initExpenseSummary() {
            this.initialData();
        },
    },
    created() {
        this.loadData();
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
