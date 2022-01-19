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
                                style="transition: .3s ease-in;"
                                :class="{ hide_big_bar_class: isHideBar }"
                            >
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">{{ $t("cash_refund") }}</h2>
                                        <v-icon
                                            v-if="isHideBar"
                                            onclick="window.history.go(-1); return false;"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                        <span
                                            style="transition: .3s ease-in; z-index:10;"
                                            :class="{
                        iconArrow: !isHideBar,
                        iconArrowHide: isHideBar,
                      }"
                                        >
                      <v-icon
                          size="22"
                          class="arr_icon"
                          @click="hide_smallsitebar"
                          v-if="isHideBar"
                      >
                        mdi-chevron-left-circle
                      </v-icon>
                      <v-icon
                          size="22"
                          class="arr_icon"
                          @click="hide_smallsitebar"
                          v-if="!isHideBar"
                      >
                        mdi-chevron-right-circle
                      </v-icon></span
                                        >
                                    </v-card>
                                    <v-card outlined dense class="px-3 no_border" color="grayBg">
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t("customer") }}</label>
                                                <dropdownlist
                                                    class="v-input__slot"
                                                    :data-items="customerList"
                                                    @change="onChange"
                                                    :value="transaction.customer"
                                                    :data-item-key="dataItemKey"
                                                    :text-field="textField"
                                                    :default-item="defaultItem"
                                                    :filterable="true"
                                                    @filterchange="onFilterChange"
                                                >
                                                </dropdownlist>
                                                <label class="label  mb-0">{{ $t("date") }}</label>
                                                <app-datepicker
                                                    :initialDate="transaction.transactionDate"
                                                    @onChanged="onDateChanged"
                                                    @emitDate="transaction.transactionDate = $event"
                                                />
                                                <label class="label mb-0 mt-1">{{
                                                        $t("number")
                                                    }}</label>
                                                <v-row class="mt-1 mr-0">
                                                    <v-col sm="3" cols="3" class="pt-0 pr-0">
                                                        <div class="code_text text-bold">
                                                            {{ transaction.transactionType.abbr }}
                                                        </div>
                                                    </v-col>
                                                    <v-col sm="7" cols="7" class="pt-0 pl-0 pr-1">
                                                        <v-text-field
                                                            class=" custom-border "
                                                            v-model="transaction.number"
                                                            outlined
                                                            :rules="[(v) => !!v || 'Number is required']"
                                                            required
                                                        />
                                                    </v-col>
                                                    <v-col sm="2" cols="2" class="pt-0 px-0">
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
                                            <v-col sm="8" cols="12">
                                                <v-col class="pb-0" sm="6" cols="12">
                                                    <label class="label mb-0">{{
                                                            $t("price_level")
                                                        }}</label>
                                                    <v-select
                                                        class="mt-1"
                                                        v-model="transaction.priceLevel"
                                                        :items="priceLevel"
                                                        @change="loadTransactionRate"
                                                        item-value="id"
                                                        item-text="name"
                                                        return-object
                                                        clearable
                                                        placeholder="Price Level"
                                                        tage="Default Price Level"
                                                        outlined
                                                    />
                                                </v-col>
                                                <v-col
                                                    sm="6"
                                                    col="6"
                                                    class="d-flex justify-space-between"
                                                >
                                                    <div>
                                                        <p class="label mb-0">{{ $t("currency") }}</p>
                                                        <p class="label mb-0">{{ currencyCode }}</p>
                                                    </div>
                                                    <div>
                                                        <p class="label mb-0">{{ $t("rate") }}</p>
                                                        <p class="label mb-0">{{ transactionRate }}</p>
                                                    </div>
                                                </v-col>
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row class="" style="background-color: #fff;">
                                        <v-col sm="12" cols="12">
                                            <p class="mb-0">Items and deposit to be refunded</p>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <kendo-datasource
                                                ref="itemLineDS"
                                                :data="itemLines"
                                                :change="dataSourceChanged"
                                            />
                                            <kendo-grid
                                                id="gridItemLine"
                                                class="grid-function"
                                                :data-source-ref="'itemLineDS'"
                                                :sortable="false"
                                                :column-menu="true"
                                                :editable="true"
                                                :scrollable-virtual="true"
                                            >
                                                <kendo-grid-column
                                                    :title="$t('no.')"
                                                    :width="55"
                                                    :column-menu="false"
                                                    :template="rowNumberTmpl"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5;',
                            class: 'text-products',
                          }"
                                                    :attributes="{
                            style: 'text-align: products',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'item'"
                                                    :title="$t('item')"
                                                    :template="itemTemplate"
                                                    :editor="ItemDropDownEditor"
                                                    :width="200"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :template="'<span>#=description#</span>'"
                                                    :width="160"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'qty'"
                                                    :title="$t('qty')"
                                                    :format="'{0:n}'"
                                                    :template="'<span>#=qty#</span>'"
                                                    :width="80"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left; ' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'uom'"
                                                    :title="$t('uom')"
                                                    :width="100"
                                                    :template="UOMTemplate"
                                                    :editor="UOMDropDownEditor"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{
                            style: 'text-align: left',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'price'"
                                                    :title="$t('price')"
                                                    :format="'{0:n}'"
                                                    :width="100"
                                                    :template="'<span>#=price#</span>'"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{
                            style: 'text-align: left',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :format="'{0:n}'"
                                                    :width="100"
                                                    :template="'<span>#=amount#</span>'"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{
                            style: 'text-align: left',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'discountItem'"
                                                    :title="$t('discount_item')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.discountItem"
                                                    :template="discountItemTemplate"
                                                    :editor="DiscountItemDropDownEditor"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{
                            style: 'text-align: left',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'vatTax'"
                                                    :title="$t('vat')"
                                                    :width="150"
                                                    :template="vatTemplate"
                                                    :editor="VatTaxDropDownEditor"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'specificTax'"
                                                    :title="$t('specificTax')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.specificTax"
                                                    :template="
                            '<span>#=specificTax.defaultTax?specificTax.defaultTax:``#</span>'
                          "
                                                    :editor="SpecificTaxDropDownEditor"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'otherTax'"
                                                    :title="$t('otherTax')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.otherTax"
                                                    :template="
                            '<span>#=otherTax.defaultTax?otherTax.defaultTax:``#</span>'
                          "
                                                    :editor="OtherTaxDropDownEditor"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'publicLightingTax'"
                                                    :title="$t('pl_tax')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :hidden="!saleFormContent.publicLightingTax"
                                                    :template="
                            '<span>#=publicLightingTax.defaultTax?publicLightingTax.defaultTax:``#</span>'
                          "
                                                    :editor="PublicLightingTaxDropDownEditor"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'saleUnit'"
                                                    :title="$t('sale_unit')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.saleUnit"
                                                    :template="saleUnitTemplate"
                                                    :editor="SaleUnitDropDownEditor"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'employee'"
                                                    :title="$t('employee')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.employee"
                                                    :template="empImpl"
                                                    :editor="EmployeeDropDownEditor"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :command="{
                            iconClass: 'k-icon k-i-trash',
                            text: 'Delete',
                            click: removeRow,
                            class: 'btn-plus',
                          }"
                                                    :title="'Action'"
                                                    :width="100"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                />
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row>
                                                <v-col sm="5" cols="12" class="">
                                                    <v-btn
                                                        class="float-left btn_plus mr-2"
                                                        @click="addRow"
                                                    >
                                                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                    </v-btn>
                                                    <v-btn
                                                        @click="dialogCatalog = true"
                                                        class="float-left btn_plus mr-2 white--text text-capitalize"
                                                    >
                                                        {{ $t("catalog") }}
                                                    </v-btn>
                                                    <template>
                                                        <v-file-input
                                                            class="mt-0 pt-0 "
                                                            sm="3"
                                                            cols="6"
                                                            v-model="files"
                                                            :placeholder="$t('attachment')"
                                                            multiple
                                                            prepend-icon="mdi-paperclip"
                                                        >
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
                                    <v-row class="" style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="py-0">
                                            <kendo-datasource
                                                ref="expenseAccountDS"
                                                :data="expenseLines"
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
                                                    :title="$t('no.')"
                                                    :template="expenseRowNumTmpl"
                                                    :width="55"
                                                    :column-menu="false"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5;',
                            class: 'text-products',
                          }"
                                                    :attributes="{
                            style: 'text-align: products',
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
                                                    :field="'quantity'"
                                                    :title="$t('qty')"
                                                    :width="160"
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
                                                    :field="'price'"
                                                    :title="$t('price')"
                                                    :format="'{0:n}'"
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
                                                    :command="{
                            iconClass: 'k-icon k-i-trash',
                            text: 'Delete',
                            click: expenseRemoveRow,
                            class: 'btn-plus',
                          }"
                                                    :title="'&nbsp;'"
                                                    :width="100"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                />
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row>
                                                <v-col sm="9" cols="12" class="">
                                                    <v-btn
                                                        color="primary"
                                                        class="float-left rounded-0 white--text mr-2"
                                                        @click="expenseAddRow"
                                                    >
                                                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-row class="" style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <p class="mb-0">
                                                {{ $t("cash_account_used_for_refund") }}
                                            </p>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="py-0">
                                            <kendo-datasource
                                                ref="saleDepositDS"
                                                :change="cashAccountDSChanged"
                                                :data="cashAccountLine"
                                            />
                                            <kendo-grid
                                                id="gridSaleDeposit"
                                                class="grid-function"
                                                :data-source-ref="'saleDepositDS'"
                                                :sortable="false"
                                                :filterable="false"
                                                :column-menu="true"
                                                :editable="true"
                                                :scrollable-virtual="true"
                                            >
                                                <kendo-grid-column
                                                    :title="$t('no.')"
                                                    :width="55"
                                                    :template="cashAccrowNumTmpl"
                                                    :column-menu="false"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5;',
                            class: 'text-products',
                          }"
                                                    :attributes="{
                            style: 'text-align: products',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'account'"
                                                    :title="$t('account')"
                                                    :width="200"
                                                    :template="accountTemplate"
                                                    :editor="accountDropDownEditor"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :width="200"
                                                    :template="'<span>#=description#</span>'"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'method'"
                                                    :title="$t('method')"
                                                    :width="160"
                                                    :template="methodTemplate"
                                                    :editor="methodDropDownEditor"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'refNo'"
                                                    :title="$t('payment_ref')"
                                                    :format="'{0:n}'"
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
                                                    :template="amountTemplate"
                                                    :editor="amountEditor"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{
                            style: 'text-align: right',
                          }"
                                                />

                                                <kendo-grid-column
                                                    :command="{
                            iconClass: 'k-icon k-i-trash',
                            text: 'Delete',
                            click: cashAccRemoveRow,
                            class: 'btn-plus',
                          }"
                                                    :title="'&nbsp;'"
                                                    :width="100"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                />
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row>
                                                <v-col sm="7" cols="12" class="pb-0">
                                                    <v-btn
                                                        class="float-left rounded-0 white--text mr-2"
                                                        color="primary"
                                                        @click="addCashAccRow"
                                                    >
                                                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-row>
                                                <v-col class="pt-0" sm="6" cols="6">
                                                    <v-card class="no-boxshadow pa-3" color="grayBg">
                                                        <v-row>
                                                            <v-col sm="12" cols="12" class="py-0">
                                                                <label>{{
                                                                        $t("message_on_cash_refund")
                                                                    }}</label>
                                                                <v-textarea
                                                                    class=" mt-1"
                                                                    outlined
                                                                    no-resize
                                                                    height="70px"
                                                                    rows="2"
                                                                    v-model="transaction.transactionNote"
                                                                    placeholder="This will appear on the invoice"
                                                                />
                                                                <label>{{ $t("message_for_journal") }}</label>
                                                                <v-textarea
                                                                    class="mt-1"
                                                                    outlined
                                                                    no-resize
                                                                    height="70px"
                                                                    v-model="transaction.journalNote"
                                                                    rows="2"
                                                                    placeholder="This will appear on the invoice"
                                                                />
                                                            </v-col>
                                                        </v-row>
                                                    </v-card>
                                                </v-col>
                                                <v-col class="pt-0" sm="6" cols="6">
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <tbody>
                                                            <tr>
                                                                <td class="text-left pr-0">
                                                                    {{ $t("subtotal") }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    {{ numberFormat(transaction.subTotal) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left pr-0">
                                                                    {{ $t("general_discount") }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    ({{
                                                                        numberFormat(transaction.discountTotal)
                                                                    }})
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left pr-0">
                                                                    {{ $t("total_tax") }}
                                                                    <v-btn
                                                                        @click="dialogTax = true"
                                                                        class="text-white text-bold rounded-0 float-right text-uppercase"
                                                                        style="height: 30px !important; background-color: rgb(0, 176, 80) !important"
                                                                    >
                                                                        {{ $t("tax") }}
                                                                    </v-btn>
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    {{
                                                                        numberFormat(transaction.totalTaxAmount)
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr style="background: #e1efd9">
                                                                <td class="text-left text-uppercase pr-0">
                                                                    {{ $t("total") }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td
                                                                    class="text-right color_green text-bold"
                                                                    id="total"
                                                                >
                                                                    {{ numberFormat(transaction.total) }}
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
                                        <v-alert type="warning" v-model="alert" dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
                                        <v-select
                                            class="mr-2 float-left select_template"
                                            v-model="transaction.formTemplate"
                                            :items="formAR"
                                            item-value="id"
                                            item-text="name"
                                            return-object
                                            clearable
                                            placeholder="Select Template"
                                            outlined
                                        />
                                        <v-btn
                                            class="float-left  btn_cancel"
                                            onclick="window.history.go(-1); return false;"
                                        >{{ $t("cancel") }}
                                        </v-btn
                                        >
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="ml-2 float-right save_option" v-on="on">
                                                    {{ $t("save_option") }}
                                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list rounded>
                                                <v-list-item-group>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title
                                                                v-if="!isEdit"
                                                                @click="saveNew"
                                                            >
                                                                {{ $t("save_new") }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title @click="saveClose"
                                                            >{{ $t("save_close") }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list-item-group>
                                            </v-list>
                                        </v-menu>
                                        <v-btn
                                            class="float-right btn_save_draft"
                                            @click="saveDraft"
                                        >
                                            {{ $t("save_draft") }}
                                        </v-btn>
                                    </v-card>
                                </v-form>
                            </v-col>

                            <v-col
                                class="smallSide"
                                sm="4"
                                style="transition: .3s ease-in;"
                                :class="{ hide_small_bar_class: isHideBar }"
                            >
                                <h3
                                    style="color: #b3b5bc; font-size:20px;"
                                    v-if="!isHideBar"
                                    class="text-uppercase float-right mt-n3"
                                >
                                    Help
                                    <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right mt-n1"
                                    >close
                                    </v-icon>
                                </h3>

                                <div v-if="!isHideBar" class="small_sidebar mt-9 px-4 grayBg">
                                    <v-card
                                        class="pa-3 no-boxshadow"
                                        style="min-height: 70px; background-color: #00b050 !important;"
                                    >
                                        <h3
                                            style="font-size: 18px"
                                            class="text-white text-uppercase mb-2"
                                        >
                                            {{ $t("amount_returned") }}
                                        </h3>
                                        <h3
                                            class="text-bold float-right text-white"
                                            style="font-size: 22px"
                                        >
                                            {{ numberFormat(transaction.total) }}
                                        </h3>
                                    </v-card>
                                    <v-row>
                                        <v-col sm="12" cols="12">
                                            <h4 class="mb-2 text-uppercase">{{ $t("analysis") }}</h4>
                                            <label class="label mb-0">{{ $t("segment") }}</label>
                                            <v-select
                                                class="mt-2"
                                                v-model="transaction.segment"
                                                :items="segments"
                                                item-value="id"
                                                :item-text="(item) => `${item.code} - ${item.name}`"
                                                return-object
                                                tage="sub Of"
                                                placeholder="Sub Of"
                                                outlined=""
                                            />
                                            <label class="label mb-0">{{ $t("location") }}</label>
                                            <v-select
                                                class="mt-2"
                                                v-model="transaction.location"
                                                :items="locations"
                                                item-value="id"
                                                :item-text="(item) => `${item.code} - ${item.name}`"
                                                return-object
                                                tage="Location"
                                                placeholder="bu/location"
                                                outlined=""
                                            />
                                            <label class="label font_14">{{ $t("project") }}</label>
                                            <v-select
                                                class=" my-2"
                                                v-model="transaction.project"
                                                :items="customerProjects"
                                                :item-text="(item) => `${item.code} - ${item.name}`"
                                                item-value="id"
                                                tage="Customer Project"
                                                placeholder="project"
                                                outlined
                                            />
                                            <label class="label font_14">{{
                                                    $t("sale_channel")
                                                }}</label>
                                            <v-select
                                                class=" my-2"
                                                v-model="transaction.saleChannel"
                                                :items="saleChannelList"
                                                item-value="id"
                                                item-text="name"
                                                return-object
                                                tage="Sale Channel"
                                                placeholder="Channel"
                                                outlined
                                            />
                                            <label class="label font_14">{{ $t("employee") }}</label>
                                            <v-col
                                                sm="12"
                                                cols="12"
                                                class="kendo_dropdown_custom pl-0 pb-3 pt-0"
                                                style="padding: 0"
                                            >
                                                <dropdownlist
                                                    style="width: 100%"
                                                    class=" my-2"
                                                    :data-items="employees"
                                                    @change="onEmployeeChanged"
                                                    :value="mEmployee"
                                                    :data-item-key="'id'"
                                                    :text-field="'name'"
                                                    :default-item="defaultItem"
                                                    :filterable="true"
                                                    @filterchange="onEmployeeFilterChanged"
                                                >
                                                </dropdownlist>
                                            </v-col>
                                        </v-col>
                                    </v-row>
                                    <p class="mb-0 detial_smallside_p font_14">
                                        {{ $t("cash_refund_funct_desc") }}
                                    </p>
                                </div>
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
                :alertText="loadingTextAlert"
            />
            <v-dialog v-model="dialogTax" max-width="450px">
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("tax_list") }}</v-card-title>
                        <v-icon @click="dialogTax = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="pb-0">
                                <v-simple-table>
                                    <template v-slot:default>
                                        <tbody>
                                        <tr
                                            v-for="(value, name) in taxListTotal"
                                            v-bind:key="name"
                                        >
                                            <td class="text-left" width="180px">{{ name }}</td>
                                            <td class="text-center">:</td>
                                            <td class="text-right">
                                                {{ numberFormat(value) }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left" width="180px">
                                                {{ $t("total") }}
                                            </td>
                                            <td class="text-center">:</td>
                                            <td class="text-right">
                                                {{ numberFormat(saleOrder.totalTaxAmount) }}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogCatalog" max-width="850px">
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("catalog") }}</v-card-title>
                        <v-icon @click="dialogCatalog = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="pb-0">
                                <v-simple-table>
                                    <kendo-datasource
                                        ref="catalogDatasource"
                                        :data="catalogs"
                                        :schema="gridSchema"
                                    />
                                    <kendo-grid
                                        id="gridCatalog"
                                        class="grid-function"
                                        :data-source-ref="'catalogDatasource'"
                                        :style="{ width: '100%' }"
                                        :noRecords="true"
                                        :pageable-numeric="false"
                                        :pageable-previous-next="false"
                                        :pageable-messages-display="'Showing {2} data items'"
                                        :scrollable-virtual="true"
                                    >
                                        <kendo-grid-column
                                            :field="'images'"
                                            :title="$t('image')"
                                            :width="50"
                                            :template="loadImage"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                        />
                                        <kendo-grid-column
                                            :field="'number'"
                                            :title="$t('number')"
                                            :width="70"
                                            :template="'<span>#=number#</span>'"
                                            :groupHeaderColumnTemplate="'#=value#'"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                        />
                                        <kendo-grid-column
                                            :field="'name'"
                                            :title="$t('name')"
                                            :attributes="{ class: 'tb_name_td' }"
                                            :width="100"
                                            :template="'<span>#=name#</span>'"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                        />
                                        <kendo-grid-column
                                            :field="'description'"
                                            :title="$t('description')"
                                            :width="100"
                                            :template="'<span>#=description#</span>'"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                        />
                                        <kendo-grid-column
                                            :field="'noOfProduct'"
                                            :title="$t('products')"
                                            :template="'<span>#=noOfProduct#</span>'"
                                            :width="50"
                                            :headerAttributes="{
                        style: 'text-align: left; background-color: #EDF1F5',
                      }"
                                        />
                                        <kendo-grid-column
                                            :field="''"
                                            :title="$t('action')"
                                            :width="60"
                                            :command="[{ text: $t('add'), click: addCatalog }]"
                                            :headerAttributes="{
                        style: 'text-align: left; background-color: #EDF1F5',
                      }"
                                        />
                                    </kendo-grid>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>

<script>
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import kendo from "@progress/kendo-ui";
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import SaleFormContentModel from "@/scripts/model/SaleFormContent";
import ItemLineModel from "@/scripts/invoice/model/ItemLine";
import {uuid} from "vue-uuid";
import transactionModel from "@/scripts/model/Transaction";

/* Store */
import store from "@/store";

const institute = store.state.institute.institute;

import CashAccountLineModel from "@/scripts/sale_deposit/model/ItemLine";
import {ExpenseEntryExtendedModel} from "@/scripts/model/AppModels";
import Helper from "@/helper.js";

const cashAccountLineModel = new CashAccountLineModel({});
////handler
const transactionHandler = require("@/scripts/transactionHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const customerHandler = require("@/scripts/customerHandler");
const projectHandler = require("@/scripts/projectHandler");
const prefixHandler = require("@/scripts/prefixHandler");
const priceLevelHandler = require("@/scripts/priceLevelHandler");
const saleFormContentHandler = require("@/scripts/saleFormContentHandler");
const employeeHandler = require("@/scripts/employeeHandler");
const itemModifierHandler = require("@/scripts/itemModifierHandler");
const discountItemHandler = require("@/scripts/discountItemHandler");
const uomPriceHandler = require("@/scripts/uomPriceHandler");
const productVariantHandler = require("@/scripts/productVariantHandler");
const locationHandler = require("@/scripts/locationHandler");
const settingsHandler = require("@/scripts/settingsHandler");
const saleChannelHandler = require("@/scripts/saleChannelHandler");
const saleUnitItemHandler = require("@/scripts/saleUnitItemHandler");
const settingHandler = require("@/scripts/settingHandler");
const catalogHandler = require("@/scripts/catalogHandler");
const productHandler = require("@/scripts/productHandler");
const currencyHandler = require("@/scripts/currency/handler/currencyHandler");
const accountHandler = require("@/scripts/handler/accounting/account");
//
const saleFormContentModel = new SaleFormContentModel({});
const itemLineModel = new ItemLineModel({});
const expenseLines = new ExpenseEntryExtendedModel({});
//other
const $ = require("jquery");
const textField = "numberName";
const keyField = "id";
const defaultItem = {[textField]: "Select customer...", [keyField]: null};
const emptyItem = {[textField]: "loading ..."};
const invoicePrefix = "lin-";
const {
    UomEditor,
    PurchaseDiscountItemEditor,
    PurchaseTaxEditor,
} = require("@/scripts/kendo_editor/Collections");

export default {
    name: "CashRefund",
    props: {
        id: {
            type: String,
        },
        initTransaction: {
            type: transactionModel,
        },
    },
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": DatePickerComponent,
        dropdownlist: DropDownList,
    },
    data: () => ({
        transaction: new transactionModel(),
        isEdit: false,
        numSelect: [1],
        dialogTax: false,
        theDate: "",
        suppliers_item: [],
        //Catalog
        dialogCatalog: false,
        gridSchema: {
            model: {
                id: "id",
            },
        },
        imgURL: "https://s3-ap-southeast-1.amazonaws.com/images.banhji/",
        // LoadingMe
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: "",
        loadingTextAlert: "",
        bill_date: "",
        alert: false,
        files: [],
        errors: [],
        // Form validation
        valid: true,
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,
        filter: "",
        textField: "numberName",
        dataItemKey: "id",
        defaultItem: defaultItem,
        //item
        itemLines: [],
        itemLine: itemLineModel,
        dateFormat: itemLineModel.dateFormat,
        //customer
        cusBaseUrl: customerHandler.search(),
        customer: {},
        customerList: [],
        employees: [],
        mEmployee: {},
        saleChannelList: [],
        locations: [],
        customerProjects: [],
        segments: [],
        transactionType: {},
        taxListTotal: {},
        customerDiscountItem: [],
        customerSaleUnit: [],
        saleFormContent: saleFormContentModel,
        transactionDate: new Date().toISOString().substr(0, 10),
        specificDiscountItem: [],
        saleUnitItemList: [],
        otherTax: [],
        specificTax: [],
        publicLightingTax: [],
        priceLevel: [],
        vatTax: [],
        tax: [],
        loggedUser: {
            id: "cf3d10ab-bce6-47b3-8405-b448c23dad84",
            name: "Mr. Inspector",
        },
        catalogs: [],
        txnList: [],
        quotes: [],
        txnLists: [],
        isSaveNew: false,
        isSaveClose: false,
        isSavePrint: false,
        isSaveDraft: false,
        exchangeRate: {},
        baseCurrencyCode: "",
        currencyCode: "",
        transactionRate: 1,
        saveOption: "",
        formAR: [
            {id: 1, name: "Default Form"},
            {id: 2, name: "Form 80mm"},
        ],
        //cash account
        cashAccount: {},
        cashAccountLine: cashAccountLineModel,
        accCash: [],
        //exspense
        expenseLines: expenseLines,
        PurchaseTaxEditor: PurchaseTaxEditor,
        UomEditor: UomEditor,
        PurchaseDiscountItemEditor: PurchaseDiscountItemEditor,
        expenseAccounts: [],
        expenseAccount: {},
    }),
    methods: {
        initialData() {
            if (this.initTransaction) {
                // Edit Mode
                this.transaction = this.transaction;
                this.bindData();
            } else {
                // Brand New Mode
                if (this.$route.params.id === undefined) {
                    this.setDefaultData();
                }
            }
        },
        setDefaultData() {
            // Brand New Mode
            this.isEdit = false;
            this.transaction = new transactionModel({});
            this.transaction.formTemplate = 1;
            // Generate Number
            let ds = this.$refs.itemLineDS.kendoWidget();
            ds.data([]);
            // Add 2 default lines
            this.addRow();
            this.addCashAccRow();
            this.expenseAddRow();
            this.loadPrefix();
            this.loadSegment();
            this.loadLocation();
            this.loadSaleChannel();
            this.loadPriceLevel();
            this.mEmployee = {};
            this.taxListTotal = {};
            this.isSaveNew = false;
            this.isSaveClose = false;
            this.isSavePrint = false;
            this.isSaveDraft = false;
        },
        bindData() {
            // Edit Mode
            this.isEdit = true;
            this.customer = this.transaction.customer;
            this.taxListTotal = this.transaction.taxListTotal;
            this.itemLines = this.transaction.itemLines;
            this.loadProjectByCustomer();
        },
        addSelect() {
            let amount_num = this.numSelect.length;
            let num = this.numSelect[amount_num - 1];
            let new_num = num + 1;
            let lenghtItem = this.specificDiscountItem.length;
            if (new_num <= lenghtItem) {
                this.numSelect.push(new_num);
            }
        },
        removeSelect(index) {
            this.numSelect.splice(index, 1);
            // window.console.log(index, this.numSelect)
            // this.selectDiscount.splice(index,1)
            // window.console.log("remove",this.selectDiscount)
            // this.selectDiscount = this.selectDiscount.filter(item =>  item.id != val.id);
        },
        hide_smallsitebar() {
            if (!this.isHideBar) {
                // this.col_expand = 12
                // this.col_hide = 0
                this.isHideBar = true;
            } else {
                // this.col_expand = 9
                // this.col_hide = 3
                this.isHideBar = false;
            }
        },
        errorMessage() {
        },
        //number
        generateNumber() {
            // window.console.log('generateNumber')
            let d = new Date().toISOString().substr(0, 10);
            if (this.transactionDate) {
                // window.console.log(this.transactionDate)
                d = this.transactionDate;
            }
            let data = {
                abbr: this.transaction.transactionType.abbr,
                structure: this.transaction.transactionType.structure,
                sequcencing: this.transaction.transactionType.sequcencing,
                prefixSeparator: this.transaction.transactionType.prefixSeparator || '',
                numberSeparator: this.transaction.transactionType.numberSeparator || '',
                format: this.transaction.transactionType.format || 5,
                transactionDate: d,
                type: "Cash Refund",
            };
            billingHandler
                .lastNumber(data)
                .then((response) => {
                    if (response.data.statusCode === 200) {
                        const res = response.data.data;
                        const lastNumber = this.zeroPad(
                            parseInt(res.lastNumber),
                            this.transaction.transactionType.format
                        );
                        const number =
                            res.suffix +
                            this.transaction.transactionType.numberSeparator +
                            lastNumber;
                        this.transaction.number = number;
                    }
                })
                .catch((e) => {
                    this.errors.push(e);
                });
        },
        zeroPad(num, places) {
            return String(num).padStart(places, "0");
        },
        //customer
        onChange(event) {
            window.console.log(event);
            const value = event.value;
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.customer = value;
            this.transaction.customer = value;
            const baseCurrency = value.hasOwnProperty("baseCurrency")
                ? value.baseCurrency
                : {};
            if (baseCurrency.hasOwnProperty("code")) {
                this.baseCurrencyCode = baseCurrency.code;
            }
            this.transaction.priceLevel = value.hasOwnProperty("priceLevel")
                ? value.priceLevel
                : {};
            const priceLevel = value.hasOwnProperty("priceLevel")
                ? value.priceLevel
                : {};
            if (priceLevel.hasOwnProperty("currency")) {
                if (priceLevel.currency.hasOwnProperty("id")) {
                    this.loadTransactionRate();
                }
            }
            this.onDateChanged();
            this.loadProjectByCustomer();
        },
        onFilterChange(event) {
            const filter = event.filter.value;
            this.requestData(0, filter, this.cusBaseUrl);
            this.filter = filter;
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
        removeRow(e) {
            e.preventDefault();
            const grid = kendo.jQuery("#gridItemLine").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        //date
        onDateChanged() {
            if (this.$route.params.id === undefined) {
                this.generateNumber();
            }
        },
        onEmployeeFilterChanged() {
        },
        //number
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n${this.saleFormContent.decimal}`);
            // return value
        },
        //
        async loadPriceLevel() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    priceLevelHandler.get().then((res) => {
                        this.priceLevel = res;
                        if (this.priceLevel.length > 0) {
                            if (
                                this.$route.params.id !== undefined ||
                                this.$route.params.id != ""
                            ) {
                                this.transaction.priceLevel = this.priceLevel[0];
                                this.loadTransactionRate();
                            }
                        }
                    });
                }, 300);
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
        autoCalculateDiscount(discountItem, subTotal) {
            if (discountItem) {
                const nature = discountItem.nature || ''
                const amount = discountItem.amount || 0
                if (nature === 'Amount') {
                    return parseFloat(amount)
                } else if (nature === 'Percentage') {
                    return (subTotal * (parseFloat(amount) / 100))
                } else {
                    return 0
                }
            } else {
                return 0
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
                // window.console.log(amount)
                return total;
            }
            // return 0
        },
        autoCalculateTaxByType(tax) {
            // return by a key
            const groupAll = (list) =>
                list.reduce((tax, item) => {
                    const taxAmount = tax[item.name] || 0;
                    return Object.assign({}, tax, {
                        [item.name]: taxAmount + parseFloat(item.amount),
                    });
                }, {});
            this.taxListTotal = groupAll(tax);
            // window.console.log('nimol', groupAll(tax))
            // this.
        },
        dataSourceChanged(e) {
            if (e.field) {
                let dataRow = e.items[0];
                switch (e.field) {
                    case "item":
                        // this.attribute_ = this.attributes.filter(m => m.type.id === dataRow.variant.id)
                        dataRow.set("description", dataRow.item.description);
                        // this.itemChange(dataRow)
                        break;
                    case "uom":
                        // window.console.log(dataRow.uom,'row-uom')
                        dataRow.set("price", parseFloat(dataRow.uom.price));
                        dataRow.set(
                            "amount",
                            parseFloat(dataRow.uom.price) * parseFloat(dataRow.qty)
                        );
                        break;
                    case "qty":
                        dataRow.set("price", parseFloat(dataRow.uom.price));
                        dataRow.set(
                            "amount",
                            parseFloat(dataRow.uom.price) * parseFloat(dataRow.qty)
                        );
                        break;
                    case "otherTax":
                        // window.console.log("--", dataRow)
                        break;
                    default:
                        break;
                }
                if (e.field) {
                    this.autoCalculate();
                }
            }
        },
        autoCalculate() {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                subTotal = 0,
                totalTax = 0,
                discountTotal = 0,
                spTax = 0,
                pltax = 0,
                otherTax = 0,
                vatTax = 0,
                discountInvoice = 0,
                taxList = [],
                discountItem = [],
                saleUnit = [];

            ds.data().forEach((value) => {
                let modifierPrice = 0;
                if (value.modifier) {
                    modifierPrice = kendo.parseFloat(value.modifier.price);
                }

                subTotal += kendo.parseFloat(value.amount) + modifierPrice;
                let discount = 0;
                if (value.discountItem) {
                    let subTo =
                        kendo.parseFloat(value.price) * kendo.parseFloat(value.qty);
                    discount = this.autoCalculateDiscount(value.discountItem, subTo);
                    if (value.discountItem.hasOwnProperty("id")) {
                        discountItem.push(value.discountItem);
                    }
                    discountTotal += discount;
                }
                if (value.saleUnit) {
                    if (value.saleUnit.hasOwnProperty("id")) {
                        saleUnit.push(value.saleUnit);
                    }
                }
                if (value.specificTax) {
                    spTax = this.autoCalculateTax(
                        value.specificTax,
                        kendo.parseFloat(value.amount) - kendo.parseFloat(discount)
                    );
                    // window.console.log('sp ', discount)
                    spTax = kendo.parseFloat(spTax) ? kendo.parseFloat(spTax) : 0;
                    if (value.specificTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.specificTax.taxType.name,
                            amount: spTax,
                            id: value.specificTax.taxType.id,
                        });
                    }
                }
                if (value.publicLightingTax) {
                    pltax = this.autoCalculateTax(
                        value.publicLightingTax,
                        kendo.parseFloat(value.amount) - kendo.parseFloat(discount)
                    );
                    pltax = kendo.parseFloat(pltax) ? kendo.parseFloat(pltax) : 0;
                    if (value.publicLightingTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.publicLightingTax.taxType.name,
                            amount: pltax,
                            id: value.publicLightingTax.taxType.id,
                        });
                    }
                }
                if (value.otherTax) {
                    otherTax = this.autoCalculateTax(
                        value.otherTax,
                        kendo.parseFloat(value.amount) - kendo.parseFloat(discount)
                    );
                    otherTax = kendo.parseFloat(otherTax)
                        ? kendo.parseFloat(otherTax)
                        : 0;
                    if (value.otherTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.otherTax.taxType.name,
                            amount: otherTax,
                            id: value.otherTax.taxType.id,
                        });
                    }
                }

                if (value.vatTax) {
                    // window.console.log('Vat Tax', value.vatTax)
                    let amt =
                        kendo.parseFloat(spTax ? spTax : 0) +
                        kendo.parseFloat(pltax ? pltax : 0) +
                        kendo.parseFloat(otherTax ? otherTax : 0) +
                        (kendo.parseFloat(value.amount ? value.amount : 0) -
                            (discount ? discount : 0));
                    vatTax = this.autoCalculateTax(value.vatTax, amt);
                    vatTax = kendo.parseFloat(vatTax) ? kendo.parseFloat(vatTax) : 0;
                    if (value.vatTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.vatTax.taxType.name,
                            amount: vatTax,
                            id: value.vatTax.taxType.id,
                        });
                    }
                }
                totalTax +=
                    kendo.parseFloat(spTax ? spTax : 0) +
                    kendo.parseFloat(pltax ? pltax : 0) +
                    kendo.parseFloat(otherTax ? otherTax : 0) +
                    kendo.parseFloat(vatTax ? vatTax : 0);
            });

            discountTotal = discountTotal ? discountTotal : 0;

            // window.console.log(spTax, pltax, otherTax, vatTax)
            let total =
                kendo.parseFloat(subTotal) -
                kendo.parseFloat(discountTotal) +
                kendo.parseFloat(totalTax);
            this.transaction.subTotal = subTotal;
            $("#subtotal").text(kendo.parseFloat(subTotal));
            this.transaction.totalTaxAmount = kendo.parseFloat(totalTax);
            this.transaction.discountTotal = kendo.parseFloat(discountTotal);
            if (this.transaction.specificDiscountItem) {
                discountInvoice = this.autoCalculateDiscount(
                    this.transaction.specificDiscountItem,
                    kendo.parseFloat(subTotal)
                );
                discountInvoice = discountInvoice ? discountInvoice : 0;
            }
            // this.onOtherChargeChange()
            this.transaction.total = kendo.parseFloat(total) - discountInvoice;
            this.transaction.exchangeAmount =
                kendo.parseFloat(this.transaction.total) *
                kendo.parseFloat(this.transaction.txnRate);
            this.autoCalculateTaxByType(taxList);
            this.customerDiscountItem = this.removeDuplicate(discountItem);
            this.customerSaleUnit = this.removeDuplicate(saleUnit);
            // window.console.log('discount ', this.customerDiscountItem)
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        async loadSaleFormContent() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    saleFormContentHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data;
                            if (data.length > 0) {
                                this.saleFormContent = data[0];
                                // window.console.log(data[0])
                            }
                        }
                    });
                }, 300);
            });
        },
        vatTemplate(dataItem) {
            const vat = dataItem.vatTax;
            if (vat) {
                return `<span>${vat.defaultTax ? vat.defaultTax : ``}</span>`;
            } else {
                return ``;
            }
        },
        itemTemplate(dataItem) {
            const item = dataItem.item;
            if (item) {
                return `<span>${item.name ? item.name : ``}</span>`;
            } else {
                return ``;
            }
        },
        UOMTemplate(dataItem) {
            const uom = dataItem.uom;
            if (uom) {
                return `<span>${uom.uom ? uom.uom.toUOM.name : ``}</span>`;
            } else {
                return ``;
            }
        },
        saleUnitTemplate(dataItem) {
            const saleUnit = dataItem.saleUnit;
            if (saleUnit) {
                return `<span>${saleUnit.name ? saleUnit.name : ``}</span>`;
            } else {
                return ``;
            }
        },
        discountItemTemplate(dataItem) {
            const discountItem = dataItem.discountItem;
            if (discountItem) {
                return `<span>${discountItem.code ? discountItem.code : ``} - ${
                    discountItem.name ? discountItem.name : ``
                }</span>`;
            } else {
                return ``;
            }
        },
        ServiceDateEditor(container, options) {
            kendo
                .jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDatePicker();

            // let ds = this.$refs.itemLineDS.kendoWidget()
            // window.console.log(ds.data())
            // // const dateString = kendo.toString((new Date(options.model.items.serviceDate)), this.itemLine.dateFormat)
            // // const dateString = kendo.toString(options.model.items.serviceDate)
            // const $input = $("<input value=" + options.model.serviceDate + " />").appendTo(container)
            // $input.kendoDatePicker()
            // // $input.appendTo(container)
            // // options.model.items.serviceDate = dateString
            // window.console.log($input)
        },
        ServiceDateToEditor(container, options) {
            kendo
                .jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDatePicker();
        },
        ItemDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "id",
                    headerTemplate:
                        '<div class="dropdown-header k-widget k-header">' +
                        "<span>Items </span>" +
                        "<span></span>" +
                        "</div>",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: productVariantHandler.itemSearchURL(),
                            },
                            dataType: "json",
                        },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {type: "string"},
                                    name: {type: "string"},
                                    sku: {type: "string"},
                                },
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            },
                        },
                        // data: this.variants
                    }),
                });
        },
        UOMDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "uom.toUOM.name",
                    dataValueField: "uom.toUOM.id",
                    cascadeFrom: "item",
                    template: "<span>#=uom.toUOM.name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: uomPriceHandler.getURL(
                                    options.model.item.id,
                                    this.transaction.priceLevel.id
                                ),
                            },
                            dataType: "json",
                        },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {type: "string"},
                                    // name: {type: "string"},
                                    // sku: {type: "string"},
                                },
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            },
                        },
                        // data: this.variants
                    }),
                });
        },
        DiscountItemDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "id",
                    cascadeFrom: "item",
                    template: "<span>#=code# - #=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: discountItemHandler.getURL(),
                            },
                            dataType: "json",
                        },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {type: "string"},
                                    // name: {type: "string"},
                                    // sku: {type: "string"},
                                },
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            },
                        },
                    }),
                });
        },
        SpecificTaxDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "defaultTax",
                    dataValueField: "id",
                    template: "<span>#=defaultTax#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.specificTax.filter((m) => {
                            if (options.model.hasOwnProperty("vatTax")) {
                                const vat = options.model.vatTax;
                                if (vat) {
                                    if (
                                        options.model.vatTax !== null ||
                                        options.model.vatTax !== "null"
                                    ) {
                                        if (options.model.vatTax.baseAmount) {
                                            return (
                                                m.baseAmount.toLowerCase() ===
                                                options.model.vatTax.baseAmount.toLowerCase()
                                            );
                                        } else {
                                            return m;
                                        }
                                    }
                                } else {
                                    return m;
                                }
                            }
                        }),
                    }),
                });
        },
        PublicLightingTaxDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "defaultTax",
                    dataValueField: "id",
                    template: "<span>#=defaultTax#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.publicLightingTax.filter((m) => {
                            if (options.model.hasOwnProperty("vatTax")) {
                                const vat = options.model.vatTax;
                                if (vat) {
                                    if (
                                        options.model.vatTax !== null &&
                                        options.model.vatTax !== "null"
                                    ) {
                                        if (options.model.vatTax.baseAmount) {
                                            return (
                                                m.baseAmount.toLowerCase() ===
                                                options.model.vatTax.baseAmount.toLowerCase()
                                            );
                                        } else {
                                            return m;
                                        }
                                    }
                                } else {
                                    return m;
                                }
                            }
                        }),
                    }),
                });
        },
        OtherTaxDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "defaultTax",
                    dataValueField: "id",
                    template: "<span>#=defaultTax#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.otherTax.filter((m) => {
                            if (options.model.hasOwnProperty("vatTax")) {
                                const vat = options.model.vatTax;
                                if (vat) {
                                    if (
                                        options.model.vatTax !== null &&
                                        options.model.vatTax !== "null"
                                    ) {
                                        if (options.model.vatTax.baseAmount) {
                                            return (
                                                m.baseAmount.toLowerCase() ===
                                                options.model.vatTax.baseAmount.toLowerCase()
                                            );
                                        } else {
                                            return m;
                                        }
                                    }
                                } else {
                                    return m;
                                }
                            }
                        }),
                    }),
                });
        },
        VatTaxDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "defaultTax",
                    dataValueField: "id",
                    template: "<span>#=defaultTax#</span>",
                    optionLabel: "--Select--",
                    dataSource: new kendo.data.DataSource({
                        data: this.vatTax,
                    }),
                });
        },
        SaleUnitDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "id",
                    template: "<span>#=code# - #=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.saleUnitItemList,
                    }),
                });
        },
        ModifierDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "id",
                    headerTemplate:
                        '<div class="dropdown-header k-widget k-header">' +
                        "<span>Modifier </span>" +
                        "<span></span>" +
                        "</div>",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: itemModifierHandler.searchURL(options.model.item.id),
                            },
                            dataType: "json",
                        },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {type: "string"},
                                    name: {type: "string"},
                                    price: {type: "number"},
                                    uom: {type: "string"},
                                },
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            },
                        },
                    }),
                });
        },
        EmployeeDropDownEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoMultiSelect({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    suggest: true,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "id",
                    headerTemplate:
                        '<div class="dropdown-header k-widget k-header">' +
                        "<span>Employee </span>" +
                        "<span></span>" +
                        "</div>",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: employeeHandler.searchURL(),
                            },
                            dataType: "json",
                        },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {type: "string"},
                                    name: {type: "string"},
                                    firstName: {type: "string"},
                                    lastName: {type: "string"},
                                },
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            },
                        },
                    }),
                });
        },
        empImpl(dataItem) {
            let empIds = [];
            dataItem.employee.forEach((m) => {
                empIds.push(m.firstName + " - " + m.lastName);
            });
            // window.console.log(empIds.join(', '))
            return `<span>${empIds.join(", ")}</span>`;
        },
        addRow() {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                total = ds.total();
            this.itemLine.id = invoicePrefix + uuid.v1();
            ds.insert(total, this.itemLine);
        },
        onSpecificDiscountChanged() {
            if (this.transaction.specificDiscountItem) {
                const discountOrder = this.autoCalculateDiscount(
                    this.transaction.specificDiscountItem,
                    this.transaction.subTotal
                );
                this.transaction.specificDiscountTotal = kendo.toString(
                    discountOrder ? discountOrder : 0,
                    "n"
                );
                let total =
                    kendo.parseFloat(this.transaction.subTotal) -
                    (kendo.parseFloat(this.transaction.discountTotal) +
                        kendo.parseFloat(this.transaction.totalTaxAmount)) -
                    discountOrder;
                this.transaction.total = kendo.toString(total, "n");
            }
        },
        onOtherAmount(value) {
            return this.autoCalculateDiscount(value, this.transaction.subTotal);
        },
        async loadDiscountItem() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    discountItemHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            this.specificDiscountItem = res.data.data;
                        }
                    });
                }, 300);
            });
        },
        async loadSegment() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.segments = [];
                    settingsHandler
                        .getSeg()
                        .then((res) => {
                            this.showLoading = true;
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.segments = res.data.data;
                                if (this.segments.length > 0) {
                                    if (
                                        this.$route.params.id !== undefined ||
                                        this.$route.params.id != ""
                                    ) {
                                        this.transaction.segment = this.segments[0];
                                    }
                                }
                                // this.segmentList = res.data.data
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 300);
            });
        },
        async loadLocation() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.locations = [];
                    locationHandler
                        .list()
                        .then((res) => {
                            this.showLoading = true;
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.locations = res.data.data;
                                if (this.locations.length > 0) {
                                    if (
                                        this.$route.params.id !== undefined ||
                                        this.$route.params.id != ""
                                    ) {
                                        this.transaction.location = this.locations[0];
                                    }
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
        async loadProjectByCustomer() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    projectHandler
                        .getByCustomer(this.customer.id)
                        .then((res) => {
                            this.showLoading = true;
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.customerProjects = res.data.data;
                                if (this.customerProjects.length > 0) {
                                    if (!this.initTransaction) {
                                        this.transaction.project = this.customerProjects[0];
                                    }
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
        async loadSaleChannel() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    saleChannelHandler.get().then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.saleChannelList = res.data.data;
                            if (this.saleChannelList.length > 0) {
                                if (
                                    this.$route.params.id !== undefined ||
                                    this.$route.params.id != ""
                                ) {
                                    this.transaction.saleChannel = this.saleChannelList[0];
                                }
                            }
                        } else {
                            this.showLoading = false;
                        }
                    });
                }, 300);
            });
        },
        async loadTax() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    settingHandler.get().then((res) => {
                        this.tax = res;
                        this.otherTax = this.tax.filter((m) => m.taxType.typeId === 7); // valuable tax
                        this.specificTax = this.tax.filter(
                            (m) => m.taxType.typeId === 8 && m.transactionType === "Sale"
                        ); // valuable tax
                        this.publicLightingTax = this.tax.filter(
                            (m) => m.taxType.typeId === 9 && m.transactionType === "Sale"
                        ); // valuable tax
                        this.vatTax = this.tax.filter(
                            (m) =>
                                (m.taxType.typeId === 1 || m.taxType.typeId === 8) &&
                                m.transactionType === "Sale"
                        ); // valuable tax
                    });
                }, 300);
            });
        },
        async loadSaleUnitItems() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    saleUnitItemHandler.list().then((res) => {
                        if (res.data.statusCode === 200)
                            this.saleUnitItemList = res.data.data;
                    });
                }, 300);
            });
        },
        close(data) {
            if (this.$route.params.id === undefined) {
                this.$router.push({
                    name: "Customers",
                    params: {
                        data: data,
                    },
                });
            } else {
                window.history.go(-1);
            }
            window.console.log(data, "close");
            // localStorage.data.id = JSON.stringify(data)
        },
        //catalog
        loadImage(dataItem) {
            if (dataItem.hasOwnProperty("images")) {
                if (dataItem.images.hasOwnProperty("default")) {
                    const url = this.imgURL + dataItem.images.default.thumb;
                    return (
                        "<img width='50' height='50' style= 'margin: auto;display: block;' src='" +
                        url +
                        "' />"
                    );
                }
            } else {
                return "";
            }
        },
        async loadCatalogs() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    catalogHandler.get().then((res) => {
                        this.showLoading = false;
                        this.catalogs = res;
                    });
                }, 300);
            });
        },
        addCatalog(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridCatalog").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            // window.console.log(dataItem)
            if (dataItem.variants.length > 0) {
                dataItem.variants.forEach((m) => {
                    if (m.hasOwnProperty("variant")) {
                        if (m.variant.hasOwnProperty("id")) {
                            this.loadSingleItem(m.variant.id, "i");
                        }
                    }
                });
                this.dialogCatalog = false;
            }
            if (dataItem.services.length > 0) {
                dataItem.services.forEach((m) => {
                    if (m.hasOwnProperty("service")) {
                        if (m.service.hasOwnProperty("id")) {
                            this.loadSingleItem(m.service.id, "s");
                        }
                    }
                });
                this.dialogCatalog = false;
            }
        },
        async loadSingleItem(itemId, type) {
            new Promise((resolve) => {
                resolve("resolved");
                setTimeout(() => {
                    this.showLoading = true;
                    productHandler.getOne(itemId).then((res) => {
                        this.showLoading = false;
                        let data = res;
                        window.console.log(data);
                        let ds = this.$refs.itemLineDS.kendoWidget(),
                            total = ds.total();
                        this.itemLine.id = invoicePrefix + uuid.v1();
                        this.itemLine.item = data;
                        if (type == "i") {
                            this.itemLine.description = data.variant.saleDescription;
                        } else {
                            this.itemLine.description = data.saleDescription;
                        }
                        ds.insert(total, this.itemLine);
                    });
                }, 500);
            });
        },
        async loadPrefix() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    prefixHandler.get("sale order").then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.transactionType = res.data.data;
                            if (this.transactionType.length > 0) {
                                this.transaction.transactionType = this.transactionType[0];
                                if (!this.initTransaction) {
                                    this.generateNumber();
                                }
                            }
                        }
                    });
                }, 300);
            });
        },
        onEmployeeChanged(event) {
            const value = event.value;
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.mEmployee = value;
            this.transaction.employee = value;
        },
        async loadEmployeeCenter() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.employees = [];
                    employeeHandler
                        .center(undefined)
                        .then((res) => {
                            this.showLoading = true;
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.employees = res.data.data;
                                if (this.employees.length > 0) {
                                    this.transaction.employee = this.employees[0];
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
        removeEmptyLine() {
            const grid = kendo.jQuery("#gridItemLine").data("kendoGrid"),
                dataSource = grid.dataSource;
            dataSource.data().forEach((m) => {
                if (m.item.id === undefined) {
                    dataSource.remove(m);
                }
            });
        },
        async loadTransactionRate() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const date = new Date(this.transactionDate)
                        .toISOString()
                        .substr(0, 10);
                    const priceLevel = this.transaction.priceLevel;
                    let code = "";
                    if (priceLevel.hasOwnProperty("currency")) {
                        if (priceLevel.currency.hasOwnProperty("code")) {
                            code = priceLevel.currency.code;
                        }
                    }
                    if (code !== undefined || code !== "") {
                        this.showLoading = true;
                        currencyHandler
                            .getLastExchangeRateByDate(date, code)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.exchangeRate = res.data.data[0];
                                    this.currencyCode = this.exchangeRate.code;
                                    this.transactionRate = this.exchangeRate.rate;
                                    this.transaction.txnRate = this.exchangeRate.rate;
                                    this.transaction.exchangeRate = this.exchangeRate;
                                    this.showLoading = false;
                                }
                            });
                    }
                }, 300);
            });
        },
        //cash account
        cashAccountautoCalculate() {
            let ds = this.$refs.saleDepositDS.kendoWidget(),
                convertedAmount = 0,
                amount = 0;
            ds.data().forEach((value) => {
                if (value.amount) {
                    amount += kendo.parseFloat(value.amount);
                    convertedAmount +=
                        kendo.parseFloat(value.amount) * this.transaction.txnRate;
                }
            });
            this.cashAccount.exchangeAmount = convertedAmount;
            this.cashAccount.amount = amount;
        },
        cashAccountDSChanged(e) {
            if (e.field) {
                this.cashAccountautoCalculate();
            }
        },
        addCashAccRow() {
            let ds = this.$refs.saleDepositDS.kendoWidget(),
                total = ds.total();
            this.cashAccountLine.id = invoicePrefix + uuid.v1();
            ds.insert(total, this.cashAccountLine);
        },
        cashAccrowNumTmpl(dataItem) {
            let ds = this.$refs.saleDepositDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        accountDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "id",
                    template: "<span>#=number# - #= name#</span>",
                    optionLabel: "--Select--",
                    dataSource: new kendo.data.DataSource({
                        data: this.accCash,
                    }),
                });
        },
        methodDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "id",
                    template: "<span>#=code# - #= name#</span>",
                    optionLabel: "--Select--",
                    dataSource: new kendo.data.DataSource({
                        data: this.paymentMethod,
                    }),
                });
        },
        accountTemplate(dataItem) {
            const acc = dataItem.account;
            if (acc) {
                return `<span>${acc.name ? acc.name : ``}</span>`;
            } else {
                return ``;
            }
        },
        async loadAccount() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    accountHandler.getAll().then((res) => {
                        this.showLoading = false;
                        this.expenseAccounts = res.data;
                        this.accCash = res.data
                            .filter((m) => m.account_type.number <= 5)
                            .map((item) => {
                                return {
                                    id: item.uuid,
                                    uuid: item.uuid,
                                    name: item.name,
                                    local_name: item.local_name,
                                    number: item.number,
                                    is_taxable: item.is_taxable,
                                    banhjiAccCode: item.banhjiAccCode,
                                    group_code: item.group_code,
                                    parent_account: item.parent_account,
                                    type_code: item.type_code,
                                    account_type: item.account_type,
                                };
                            });
                    });
                }, 300);
            });
        },
        methodTemplate(dataItem) {
            const method = dataItem.method;
            if (method) {
                return `<span>${method.name ? method.name : ``}</span>`;
            } else {
                return ``;
            }
        },
        amountTemplate(dataItem) {
            const amt = dataItem.amount;
            if (amt) {
                return kendo.toString(parseFloat(amt), `${this.decimalFormat}`);
            } else {
                return 0;
            }
        },
        amountEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 30,
                    format: `${this.decimalFormat}`,
                });
        },
        cashAccRemoveRow(e) {
            e.preventDefault();
            const grid = kendo.jQuery("#gridSaleDeposit").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        //exspense
        expenseAddRow() {
            let ds = this.$refs.expenseAccountDS.kendoWidget(),
                last = ds.total();

            let je = new ExpenseEntryExtendedModel();
            ds.insert(last, je);
        },
        onExpenseAccountDSChanges(e) {
            if (e.field) {
                let dataRow = e.items[0];

                if (e.field === "account") {
                    this.addExtraRow(dataRow.uid);
                } else if (e.field === "quantity" || e.field === "price") {
                    let amt =
                        kendo.parseFloat(dataRow.quantity) *
                        kendo.parseFloat(dataRow.price);
                    dataRow.set("amount", amt);
                } else if (e.field === "uom") {
                    if (dataRow.uom) {
                        dataRow.set("uom_uuid", dataRow.uom.id);
                    }
                }

                this.expenseAutoCalculate();
            }
            // window.console.log(e)
        },
        expenseAutoCalculate() {
            let ds = this.$refs.expenseAccountDS.kendoWidget(),
                convertedAmount = 0,
                amount = 0;
            ds.data().forEach((value) => {
                if (value.amount) {
                    amount += kendo.parseFloat(value.amount);
                    convertedAmount +=
                        kendo.parseFloat(value.amount) * this.transaction.txnRate;
                }
            });
            this.expenseAccount.exchangeAmount = convertedAmount;
            this.expenseAccount.amount = amount;
        },
        addExtraRow(uid) {
            let ds = this.$refs.expenseAccountDS.kendoWidget(),
                total = ds.total(),
                row = ds.getByUid(uid),
                index = ds.indexOf(row);

            if (index == total - 1) {
                this.expenseAddRow();
            }
        },
        expenseRemoveRow(e) {
            e.preventDefault();
            const grid = $("#expenseGrid").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        expenseRowNumTmpl(dataItem) {
            let ds = this.$refs.expenseAccountDS.kendoWidget(),
                index = ds.indexOf(dataItem);

            return index + 1;
        },
        expenseAccountEditor(container, options) {
            return Helper.accountEditor(container, options, this.expenseAccounts);
        },
        //save block
        clear() {
            window.console.log("clear");
            this.id = undefined;
            this.transaction = new transactionModel({});
            this.itemLines = [];
            this.generateNumber();
        },
        saveClose() {
            this.isSaveClose = true;
            this.saveOption = "saveClose";
            this.save();
        },
        savePrint() {
            this.isSavePrint = true;
            this.saveOption = "savePrint";
            this.save();
        },
        saveNew() {
            this.saveOption = "saveNew";
            this.isSaveNew = true;
            this.save();
        },
        saveDraft() {
            this.saveOption = "saveDraft";
            this.isSaveDraft = true;
            this.save();
        },
        async save() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                return;
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.removeEmptyLine();
                    let itemLineDS = this.$refs.itemLineDS.kendoWidget(),
                        total = itemLineDS.total();
                    if (total <= 0) {
                        this.$snotify.error("Field Required!");
                        return;
                    }
                    let data = {
                        id: this.transaction.id ? this.transaction.id : "",
                        type: "Cash Refund",
                        transactionType: this.transaction.transactionType,
                        number: this.transaction.number,
                        abbr: this.transaction.transactionType.abbr,
                        transactionDate: this.transaction.transactionDate,
                        customer: this.transaction.customer,
                        discountPromotion: {},
                        priceLevel: this.transaction.priceLevel,
                        itemLines: itemLineDS.data(),
                        segment: this.transaction.segment,
                        location: this.transaction.location,
                        project: this.transaction.project,
                        saleChannel: this.transaction.saleChannel,
                        transactionNote: this.transaction.transactionNote,
                        journalNote: this.transaction.journalNote,
                        subTotal: this.transaction.subTotal,
                        total: this.transaction.total,
                        discountTotal: this.transaction.discountTotal,
                        specificDiscountTotal: this.transaction.specificDiscountTotal,
                        totalTaxAmount: this.transaction.totalTaxAmount,
                        saveOption: this.saveOption,
                        txnRate: this.transaction.txnRate,
                        exchangeRate: this.transaction.exchangeRate,
                        exchangeAmount: this.transaction.exchangeAmount,
                        status: 1,
                        formTemplate: this.transaction.formTemplate,
                        specificDiscountItem: this.transaction.specificDiscountItem,
                        taxListTotal: this.taxListTotal,
                        customerDiscountItem: this.customerDiscountItem,
                        customerSaleUnit: this.customerSaleUnit,
                        loggedUser: this.loggedUser,
                        employee: this.transaction.employee,
                        usedDateAt: "",
                        deletedAt: "",
                        deleted: 0,
                        createdAt: new Date().toISOString().substr(0, 10),
                    };
                    this.showLoading = true;
                    window.console.log(data);
                    transactionHandler
                        .create(data)
                        .then((response) => {
                            this.showLoading = false;
                            if (response.data.statusCode === 201) {
                                if (this.isSaveNew == true) {
                                    this.setDefaultData();
                                } else {
                                    this.close(response.data.data);
                                }
                                this.$refs.form.reset();
                                this.$snotify.success("Successfully");
                            }
                        })
                        .catch((e) => {
                            this.$snotify.error("Something went wrong");
                            this.errors.push(e);
                            window.console.log(e);
                        });
                }, 300);
            });
        },
    },
    watch: {
        id() {
            window.console.log(this.id, "from watch");
            if (this.$route.params.id === undefined) {
                window.history.go(-1);
            } else {
                this.loadView();
            }
        },
        initTransaction() {
            this.initialData();
        },
    },
    created() {
        this.loadTax();
        this.loadSaleUnitItems();
        this.loadAccount();
        this.loadSegment();
        this.loadLocation();
    },
    computed: {
        dateFormatted() {
            return kendo.toString(new Date(), institute.dateFormat);
        },
        dateTimeFormatted() {
            window.console.log(institute.dateFormat + " HH:mm", "inst date");
            return kendo.toString(new Date(), institute.dateFormat + " HH:mm");
        },
    },
    mounted: async function () {
        await this.initialData();
        prefixHandler.get("sale order").then((res) => {
            if (res.data.statusCode === 200) {
                this.showLoading = false;
                this.transactionType = res.data.data;
                if (this.transactionType.length > 0) {
                    if (
                        this.$route.params.id !== undefined ||
                        this.$route.params.id != ""
                    ) {
                        this.transaction.transactionType = this.transactionType[0];
                        if (!this.initTransaction && this.$route.params.id === undefined) {
                            this.generateNumber();
                        }
                    }
                }
            }
        });
        this.requestData(0, this.filter, this.cusBaseUrl);
        await this.loadSaleFormContent();
        await this.loadPriceLevel();
        await this.loadDiscountItem(0);
        await this.loadSaleChannel();
        await this.loadCatalogs();
        await this.loadEmployeeCenter();
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
    transition: 0.5s ease-in;
    flex: 0 0 0;
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
</style>
