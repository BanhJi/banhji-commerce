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
                      {{ $t("expense_batch_record") }}
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
                        <app-employee-dropdownlist
                          :initEmployee="employee"
                          @emitEmployee="employee = $event"
                          @onChanged="loadCashAdvance"
                        />

                        <label class="label">{{ $t("number") }}</label>
                        <v-row class="mt-1 mr-0">
                          <v-col sm="10" cols="10" class="py-0 pr-0 pr-1">
                            <v-text-field
                              :rules="[(v) => !!v || 'Number is required']"
                              v-model="expenseSummary.number"
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
                      </v-col>

                      <v-col sm="4" cols="12">
                        <label class="label" style="">{{ $t("date") }}</label>
                        <app-datepicker
                          :initialDate="expenseSummary.date"
                          @emitDate="expenseSummary.date = $event"
                          @onChanged="onDateChanges"
                        />
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
                          :width="50"
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                        />
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
                          :title="$t('date')"
                          :format="'{0:dd-MM-yyyy}'"
                          :editor="DatePickerEditor"
                          :width="200"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'bill_number'"
                          :title="$t('number')"
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
                          :template="
                            this.$store.state.accounting.accountLanguage ===
                            'English'
                              ? '<span>#=account.name||``#</span>'
                              : '<span>#=account.local_name||``#</span>'
                          "
                          :editor="AccountEditor"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="''"
                          :hidden="
                            !this.$store.state.accounting.secondaryAccount
                          "
                          :title="$t('s_account')"
                          :width="200"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'description'"
                          :title="$t('description')"
                          :width="200"
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
                          :width="150"
                          :editor="NumberEditor"
                          :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
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
                          :format="'{0:n}'"
                          :width="150"
                          :editable="
                            () => {
                              return false;
                            }
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
                          :field="'bill_currency'"
                          :title="$t('currency')"
                          :template="'<span>#=bill_currency.code||``#</span>'"
                          :editor="CurrencyEditor"
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
                          :hidden="
                            !this.$store.state.accounting.classSetting.C1
                          "
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'class2'"
                          :title="$t('class_2')"
                          :template="'<span>#=class2.name||``#</span>'"
                          :width="200"
                          :hidden="
                            !this.$store.state.accounting.classSetting.C2
                          "
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
                          :hidden="
                            !this.$store.state.accounting.classSetting.C3
                          "
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
                          :hidden="
                            !this.$store.state.accounting.classSetting.C4
                          "
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
                          :hidden="
                            !this.$store.state.accounting.classSetting.C5
                          "
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                      </kendo-grid>
                    </v-col>
                    <v-col sm="6" cols="12" class="py-0">
                      <v-btn
                        color="primary"
                        class="float-left mt-2 btn_plus rounded-0 white--text mr-2"
                        @click="addRow"
                      >
                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col sm="6" cols="12" class="py-0">
                      <v-simple-table>
                        <tbody>
                          <tr>
                            <td class="text-left">
                              {{ $t("subtotal") }}
                            </td>
                            <td class="text-center">
                              :
                            </td>
                            <td class="text-right">
                              {{ Number(subTotal).toLocaleString() }}
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
                            <td class="text-right primary--text text-bold">
                              {{ Number(totalAmount).toLocaleString() }}
                            </td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                    </v-col>
                  </v-row>

                  <v-divider />

                  <v-card outlined dense class="no_border function_footer">
                    <!-- Warning Message -->
                    <v-alert type="warning" v-model="alert" dismissible>
                      <span v-html="errorMessage" />
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
                    <v-btn
                      color="secondary"
                      class="float-right mx-3 white--text text-capitalize "
                      @click="onSaveOptionClick(SaveOption.SAVENEW)"
                    >
                      {{ $t("save_new") }}
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
                        <v-radio :label="$t('credit')" :value="0" />
                        <v-radio :label="$t('cash')" :value="3" />
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
import { i18n } from "@/i18n";
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";

import {
  AccountModel,
  CurrencyModel,
  EmployeeModel,
  ContactModel,
  ClassModel,
  UomModel,
  LocationModel,
  SegmentModel,
  ProjectModel,
  DiscountItemModel,
  TaxModel,
  ExchangeRateModel,
} from "@/scripts/model/AppModels";
import ExpenseSummaryModel from "@/scripts/model/ExpenseSummary";
import ExpenseSummaryDetailModel from "@/scripts/model/ExpenseSummaryDetail";
import ExpenseSummaryDetailExtendedModel from "@/scripts/model/ExpenseSummaryDetailExtended";
import { ShowResource } from "@/observable/store";

/* Editors */
import AccountEditor from "@/scripts/kendo_editor/Account";
import ClassEditor from "@/scripts/kendo_editor/Clazz";
import UomEditor from "@/scripts/kendo_editor/Uom";
import PurchaseDiscountItemEditor from "@/scripts/kendo_editor/PurchaseDiscountItem";
import PurchaseTaxEditor from "@/scripts/kendo_editor/PurchaseTax";
import NumberEditor from "@/scripts/kendo_editor/NumberInputBox";
import SupplierEditor from "@/scripts/kendo_editor/Supplier";
import DatePickerEditor from "@/scripts/kendo_editor/DatePicker";
import CurrencyEditor from "@/scripts/kendo_editor/Currency";

/* Store */
import store from "@/store";
const institute = store.state.institute.institute;

/* Handlers */
const { cashAdvanceHandler } = require("@/scripts/AppHandlers");

const expenseSummaryHandler = require("@/scripts/expenseSummaryHandler");

const {
  EntityType,
  SaveOption,
  AccountTypeCode,
  TaxType,
  Setting,
} = require("@/scripts/default_setup/Collections");

export default {
  name: "ExpenseSumary",
  components: {
    LoadingMe: () => import("@/components/Loading"),
    "app-datepicker": () =>
      import("@/components/custom_templates/DatePickerComponent"),
    "app-monthof-picker": () =>
      import("@/components/kendo_templates/MonthOfPicker"),
    "app-location-dropdownlist": () =>
      import("@/components/dropdownlist/Location"),
    "app-employee-dropdownlist": () =>
      import("@/components/dropdownlist/Employee"),
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
    expenseSummary: new ExpenseSummaryModel(),
    employee: new EmployeeModel(),
    location: new LocationModel(),
    segment: new SegmentModel(),
    project: new ProjectModel(),
    // List
    cashAdvances: [],
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
    DatePickerEditor: DatePickerEditor,
    CurrencyEditor: CurrencyEditor,
    // Sidebar
    isHideBar: false,
    // LoadingMe
    showLoading: false,
    showCashAdvanceLoading: false,
  }),
  methods: {
    Help(key_search) {
      ShowResource(key_search);
    },
    // Initial Data
    initialData() {
      if (this.initExpenseSummary) {
        // Edit Mode
        this.expenseSummary = Object.assign({}, this.initExpenseSummary);
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

      this.expenseSummary = Object.assign(
        {},
        new ExpenseSummaryModel({
          date: new Date().toISOString().substr(0, 10),
          month_of: new Date().toISOString().substr(0, 7),
        })
      );

      /* Default Sidebar */
      let locations = await this.$store.dispatch("locations/getList");
      this.location = new LocationModel(locations[0]);

      let segments = await this.$store.dispatch("segments/getList");
      this.segment = new SegmentModel(segments.find((i) => i.isSystem === 1));

      // Generate Number
      this.generateNumber();

      // Add 2 default lines
      this.addRow();
      this.addRow();
    },
    // Bind data from prop for edit mode
    async bindData() {
      this.showLoading = true;

      // Edit Mode
      this.isEdit = true;

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
        if (
          value.account.account_type.number === AccountTypeCode.PURCHASE_TAX
        ) {
          purchaseTaxAmount += value.amount;
        } else {
          if (
            value.amount > 0 &&
            value.account.number !== AccountTypeCode.TAX_RELATED_EXPENSE_CODE
          ) {
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
            if (value.hasOwnProperty("discount"))
              if (value.discount.hasOwnProperty("uuid"))
                entry.discount = new DiscountItemModel(
                  discountItems.find((i) => i.id === value.discount.uuid)
                );

            // Tax
            if (value.hasOwnProperty("tax_item"))
              if (value.tax_item.hasOwnProperty("uuid")) {
                entry.tax_item = taxItems.find(
                  (i) => i.id === value.tax_item.uuid
                );

                /* Apply Inclusive Tax to amount */
                if (entry.tax_item.hasOwnProperty("taxType"))
                  if (entry.tax_item.taxType.hasOwnProperty("typeId"))
                    if (
                      entry.tax_item.taxType.typeId === 1 &&
                      entry.tax_item.baseAmount.toLowerCase() ===
                        TaxType.INCLUSIVE
                    )
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
            if (
              value.account.account_type.number === AccountTypeCode.DISCOUNT
            ) {
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
      let num = await Helper.generateAccountingNumber(
        EntityType.EXPENSE_SUMMARY,
        this.expenseSummary.date
      );

      this.expenseSummary.number = num.number;
      this.expenseSummary.prefix_format = num.prefix_format;
    },
    // Get Exchange Rate
    async getExchangeRate(date, code) {
      let rate = new ExchangeRateModel(institute.baseCurrency);

      if (date && code !== "") {
        rate = await Helper.getLastExchangeRateByDate(date, code);
      }

      return rate;
    },
    /* On Date Chanes */
    onDateChanges() {
      this.expenseSummary.month_of = new Date(this.expenseSummary.date)
        .toISOString()
        .substr(0, 7);
      this.generateNumber();
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

      /* Load Cash Advance */
      if (this.expenseSummary.use_for_option === 2) {
        this.loadCashAdvance();
      }
    },
    /* Kendo */
    // DataSource Changes
    async onExpenseAccountDSChanges(e) {
      if (e.field) {
        let dataRow = e.items[0];

        if (e.field === "supplier") {
          dataRow.set(
            "account",
            new AccountModel(dataRow.supplier.accountTax.expenseAcc)
          );
        } else if (e.field === "account") {
          this.addExtraRow(dataRow.uid);
        } else if (e.field === "bill_date" || e.field === "bill_currency") {
          let xrate = await this.getExchangeRate(
            dataRow.bill_date,
            dataRow.bill_currency.code
          );

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
        let amt =
          kendo.parseFloat(value.price) * kendo.parseFloat(value.quantity);

        /* Exchanged Amount */
        value.exchanged_amount = amt * value.exchange_rate;

        /* Subtotal */
        subTotal += amt;

        // Discount
        let discountAmount = 0;
        if (value.hasOwnProperty("discount"))
          if (value.discount.hasOwnProperty("id"))
            if (value.discount.id !== "") {
              discountAmount = this.calculateDiscount(value.discount, amt);
              discount += discountAmount;
              discountItem.push(value.discount);
            }

        // Tax
        if (value.hasOwnProperty("tax_item"))
          if (value.tax_item.hasOwnProperty("id"))
            if (value.tax_item.id !== "") {
              let amtAfterDiscount = amt - discountAmount;
              const taxAmount = this.autoCalculateTax(
                value.tax_item,
                amtAfterDiscount
              );
              if (
                value.tax_item.baseAmount.toLowerCase() === TaxType.INCLUSIVE
              ) {
                inclusiveTax += taxAmount;
              }

              if (value.tax_item.hasOwnProperty("taxType"))
                if (value.tax_item.taxType.hasOwnProperty("typeId"))
                  if (value.tax_item.taxType.typeId === 2) {
                    /* WHD Tax */
                    whdTax += taxAmount;
                  } else {
                    /* Purchase Tax */
                    purchaseTax += taxAmount;
                  }

              /* Set Tax Amount */
              if (
                value.tax_item.taxType.typeId === 1 &&
                value.tax_item.baseAmount.toLowerCase() === TaxType.INCLUSIVE
              ) {
                /* Inclusive Tax */
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

      let totalAmount = this.subTotal - discount + whdTax + purchaseTax;
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
    // Add New Row
    addRow() {
      let ds = this.$refs.expenseAccountDS.kendoWidget(),
        last = ds.total();

      if (ds.data().length < 15) {
        let je = new ExpenseSummaryDetailExtendedModel();
        je.quantity = 1;

        ds.insert(last, je);
      } else {
        /* Alert Message */
        this.$snotify.warning(i18n.t("maximum_15_items"));
      }
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

      if (ds.data().length > 2) {
        ds.remove(dataItem);
        this.autoCalculate();
      }
    },
    removeEmptyRow() {
      let ds = this.$refs.expenseAccountDS.kendoWidget();

      /* Collect empty row by uid */
      let emptyIds = [];
      ds.data().forEach((value) => {
        if (value.account.name === "") {
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
      let entries = [],
        expDS = this.$refs.expenseAccountDS.kendoWidget();

      // Date
      this.expenseSummary.date = Helper.toISODate(this.expenseSummary.date);

      // Employee
      this.expenseSummary.employee = new ContactModel(this.employee);

      // Sidebar
      this.expenseSummary.location_uuid = this.location.id;
      this.expenseSummary.segment_uuid = this.segment.id;
      this.expenseSummary.project_uuid = this.project.id;

      // User
      if (this.isEdit) {
        this.expenseSummary.modified_by = this.user;
      } else {
        this.expenseSummary.created_by = this.user;
      }

      // Expense Entries on Dr
      expDS.data().forEach((value) => {
        // Filter selected account
        if (value.supplier.id !== "" && value.amount > 0) {
          /* Expense */
          value.set("supplier", new ContactModel(value.supplier));
          value.set("employee", new ContactModel(this.employee));

          // Sidebar
          value.set("segment_uuid", this.segment.id);
          value.set("location_uuid", this.location.id);
          value.set("project_uuid", this.project.id);

          value.set("modified_by", this.expenseSummary.modified_by);
          value.set("created_by", this.expenseSummary.created_by);

          value.set("month_of", this.expenseSummary.month_of);
          value.set("use_for_option", this.expenseSummary.use_for_option);
          value.set(
            "use_for_transaction_uuid",
            this.expenseSummary.use_for_transaction_uuid
          );

          /* Entries */
          // Account
          value.set("account", new AccountModel(value.account));
          value.set("account_uuid", value.account.uuid);

          // Contact
          value.set("primary_contact", new ContactModel(value.supplier));
          value.set("secondary_contacts", [new ContactModel(this.employee)]);

          // Currency
          value.set("currency", new CurrencyModel(value.bill_currency));
          value.set("exchanged_amount", value.amount * value.exchange_rate);

          /* Discount */
          value.set("discount", new DiscountItemModel(value.discount));

          /* Tax */
          value.set("tax_item", new TaxModel(value.tax_item));

          // Add Entry
          entries.push(new ExpenseSummaryDetailModel(value));
        }
      });

      this.expenseSummary.summary_details = entries;
    },
    // Validating
    validateForm() {
      let result = true,
        expDS = this.$refs.expenseAccountDS.kendoWidget(),
        msg = "",
        countExpense = 0;

      // Supplier
      if (this.employee.id === "") {
        msg += `<p>${i18n.t("employee_is_required")}</p>`;
        result = false;
      }

      // Expense
      expDS.data().forEach((value, index) => {
        if (value.supplier.name !== "" && value.amount > 0) {
          // No date
          if (value.bill_date === "") {
            result = false;
            msg += `<p>${i18n.t("please_select_date_at_row_number")} ${index +
              1}</p>`;
          }

          // No number
          if (value.bill_number === "") {
            result = false;
            msg += `<p>${i18n.t(
              "please_input_bill_number_at_row_number"
            )} ${index + 1}</p>`;
          }
        }

        // No supplier
        if (value.supplier.name === "" && value.amount > 0) {
          result = false;
          msg += `<p>${i18n.t("please_select_supplier_at_row_number")} ${index +
            1}</p>`;
        }

        // No amount
        if (value.supplier.name !== "" && value.amount === 0) {
          result = false;
          msg += `<p>${value.supplier.name} ${i18n.t("has_no_amount")}</p>`;
        }

        // Count Empty Row
        if (value.supplier.name !== "" && value.amount > 0) {
          countExpense++;
        }
      });

      // Empty Row
      if (countExpense === 0) {
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
        this.saveMode = mode;
        this.save();
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
      expenseSummaryHandler
        .save(this.expenseSummary)
        .then((response) => {
          self.responseStatus(response);
        })
        .catch((error) => {
          self.showLoading = false;
          Helper.alertErrorMsg(error);
        })
        .finally(() => {
          self.showLoading = false;
        });
    },
    // Response Status
    responseStatus(response) {
      if (response.status === 200) {
        if (
          this.saveMode === SaveOption.SAVECLOSE ||
          this.saveMode === SaveOption.DELETE
        ) {
          /* Save Close or Delete */
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
  },
  watch: {
    initExpenseSummary() {
      this.initialData();
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
