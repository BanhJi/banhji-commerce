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
                                        <h2 class="mb-0">{{ $t("credit_memo") }}</h2>
                                        <v-icon
                                            v-if="isHideBar"
                                            @click="cancel()"
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
                                                @click="hideSmallSidebar"
                                                v-if="isHideBar">mdi-chevron-left-circle
                                            </v-icon>
                                            <v-icon
                                                size="22"
                                                class="arr_icon"
                                                @click="hideSmallSidebar"
                                                v-if="!isHideBar">mdi-chevron-right-circle
                                            </v-icon>
                    </span>
                                    </v-card>
                                    <v-card outlined dense class="px-3 rounded-4 no_border" color="grayBg">
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pt-4 pl-4">
                                                <label class="label  mb-0 mt-1">{{
                                                        $t("customer")
                                                    }}</label>
                                                <v-col
                                                    sm="12"
                                                    cols="12"
                                                    class="kendo_dropdown_custom pa-0 mt-1 pb-4"
                                                >
                                                    <dropdownlist
                                                        :data-items="customerList"
                                                        @change="onChange"
                                                        :value="customer"
                                                        :data-item-key="dataItemKey"
                                                        :text-field="textField"
                                                        :default-item="defaultItem"
                                                        :filterable="true"
                                                        @filterchange="onFilterChange"
                                                    >
                                                    </dropdownlist>
                                                </v-col>
                                                <label class="label mb-0">{{
                                                        $t("reason_credit_note")
                                                    }}</label>
                                                <v-textarea
                                                    class="mt-1"
                                                    outlined
                                                    :rules="[(v) => !!v || 'Reason is required']"
                                                    v-model="creditMemo.reason"
                                                    no-resize
                                                    height="40px"
                                                />
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pt-4 pr-4">
                                                <label class="label  mb-0">{{ $t("date") }}</label>
                                                <app-datepicker
                                                    :initialDate="transactionDate"
                                                    :disabled="disabledMe"
                                                    @onChanged="onPriceLevelChange"
                                                    @emitDate="transactionDate = $event"
                                                />
                                                <label class="label mb-0">{{
                                                        $t("price_level")
                                                    }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    v-model="creditMemo.priceLevel"
                                                    :items="priceLevel"
                                                    item-value="id"
                                                    @change="onPriceLevelChange"
                                                    item-text="name"
                                                    return-object
                                                    placeholder="Price Level"
                                                    tage="Default Price Level"
                                                    outlined
                                                />
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pt-4 pr-4">
                                                <label class="label mb-0 mt-1">{{
                                                        $t("number")
                                                    }}</label>
                                                <v-row class="mt-1 mr-0">
                                                    <v-col sm="3" cols="3" class="py-0 pr-0">
                                                        <div class="code_text text-bold">
                                                            {{ creditMemo.transactionType.abbr }}
                                                        </div>
                                                    </v-col>
                                                    <v-col sm="7" cols="7" class="py-0 pl-0 pr-1">
                                                        <v-text-field
                                                            class=" custom-border "
                                                            v-model="creditMemo.number"
                                                            :disabled="true"
                                                            outlined
                                                            :rules="[(v) => !!v || 'Number is required']"
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
                                                <div class="d-flex justify-space-between">
                                                    <div>
                                                        <p class="label mb-0">{{ $t("currency") }}</p>
                                                        <p class="label mb-0 pt-3">{{ currencyCode }}</p>
                                                    </div>
                                                    <div class="pl-3">
                                                        <p class="label mb-0 text-right">
                                                            {{ $t("rate") }}
                                                        </p>
                                                        <v-text-field
                                                            class="mt-1"
                                                            type="number"
                                                            v-model="creditMemo.txnRate"
                                                            outlined
                                                            min="0.000000001"
                                                            step="0.5"
                                                            :rules="[
                                (v) => !!v || 'Number is required',
                                (v) =>
                                  v > 0 || 'Number must be greater than 0!',
                              ]"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row class="pt-3" style="background-color: #fff;">
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
                                                :noRecords="true"
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
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :title="$t('no.')"
                                                    :width="53"
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
                                                    :hidden="true"
                                                    :width="160"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'qoh'"
                                                    :title="$t('on_hand')"
                                                    :template="qohTemplate"
                                                    :width="170"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right; ' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'qty'"
                                                    :title="$t('qty')"
                                                    :template="'<span>#=qty#</span>'"
                                                    :width="80"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right; ' }"
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
                                                    :width="200"
                                                    :template="priceTemplate"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{
                            style: 'text-align: right',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :headerTemplate="amountLineHeaderTemplate"
                                                    :width="200"
                                                    :editor="AmountEditor"
                                                    :template="amtTemplate"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{
                            style: 'text-align: right',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'discountItem'"
                                                    :title="$t('discount_item')"
                                                    :width="200"
                                                    :template="discountItemTemplate"
                                                    :editor="DiscountItemDropDownEditor"
                                                    :hidden="true"
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
                                                    :width="200"
                                                    :template="vatTemplate"
                                                    :editor="VatTaxDropDownEditor"
                                                    :hidden="true"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'specificTax'"
                                                    :title="$t('specific_tax')"
                                                    :width="200"
                                                    :template="
                            '<span>#=specificTax.defaultTax?specificTax.defaultTax:``#</span>'
                          "
                                                    :editor="SpecificTaxDropDownEditor"
                                                    :hidden="true"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'otherTax'"
                                                    :title="$t('other_tax')"
                                                    :width="200"
                                                    :template="
                            '<span>#=otherTax.defaultTax?otherTax.defaultTax:``#</span>'
                          "
                                                    :editor="OtherTaxDropDownEditor"
                                                    :hidden="true"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'publicLightingTax'"
                                                    :title="$t('pl_tax')"
                                                    :width="200"
                                                    :template="
                            '<span>#=publicLightingTax.defaultTax?publicLightingTax.defaultTax:``#</span>'
                          "
                                                    :editor="PublicLightingTaxDropDownEditor"
                                                    :hidden="true"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'otherChargeItem'"
                                                    :title="$t('other_charge')"
                                                    :width="200"
                                                    :hidden="true"
                                                    :template="'<span>#=otherChargeItem.name || ``#'"
                                                    :editor="OtherChargeDropDownEditor"
                                                    :headerAttributes="{style:'text-align: left; background-color: #EDF1F5'}"
                                                    :attributes="{ style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'saleUnit'"
                                                    :title="$t('sale_unit')"
                                                    :width="200"
                                                    :template="saleUnitTemplate"
                                                    :editor="SaleUnitDropDownEditor"
                                                    :hidden="true"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-row>
                                                <v-col sm="7" cols="12" class="py-0">
                                                    <v-btn
                                                        class="float-left btn_plus mr-2"
                                                        @click="addRow"
                                                    >
                                                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-col>
                                                <v-col sm="5" cols="12" class="py-0">
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <tbody>
                                                            <tr hidden="true">
                                                                <td class="text-left">
                                                                    {{ $t("subtotal") }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    {{ numberFormat(creditMemo.subTotal) }}
                                                                </td>
                                                            </tr>
                                                            <tr hidden="true">
                                                                <td class="text-left">
                                                                    {{ $t("discount") }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    ({{ numberFormat(creditMemo.discount) }})
                                                                </td>
                                                            </tr>
                                                            <tr hidden="true">
                                                                <td class="text-left">
                                                                    {{ $t("total_tax") }}
                                                                </td>

                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    {{ numberFormat(creditMemo.taxAmount) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left text-uppercase">
                                                                    {{ $t("total") }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td
                                                                    class="text-right primary--text text-bold"
                                                                >
                                                                    {{
                                                                        numberFormat(
                                                                            creditMemo.itemLineExchangeAmount
                                                                        )
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </template>
                                                    </v-simple-table>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-col sm="12" cols="12" class="pt-0">
                                                <h3 class="mb-0 text-uppercase color_grey mb-3">
                                                    {{ $t("apply_to") }}
                                                </h3>
                                                <label class="label font_14">{{
                                                        $t("invoice_to_be_offset")
                                                    }}</label>
                                                <v-select
                                                    class=" mt-1"
                                                    v-model="offsetInvoice"
                                                    :items="offsetInvoices"
                                                    @change="offsetInvoiceChanged"
                                                    :item-text="(item) => `${item.referenceNo} - ${status(item.status)}`"
                                                    item-value="id"
                                                    return-object
                                                    tage="Offset Invoice"
                                                    placeholder="Offset Invoice"
                                                    :loading="isLoading === 1"
                                                    :rules="[(v) => !!v || 'is required']"
                                                    outlined
                                                />
                                                <kendo-datasource
                                                    ref="applyToLineDS"
                                                    :data="offsetList"
                                                    :change="onApplyToLineChange"/>
                                                <kendo-grid
                                                    id="gridApplyTo"
                                                    ref="gridApplyTo"
                                                    class="grid-function"
                                                    :data-source-ref="'applyToLineDS'"
                                                    :sortable="false"
                                                    :filterable="false"
                                                    :column-menu="true"
                                                    :editable="true"
                                                    :noRecords="true"
                                                    :scrollable-virtual="true"
                                                >
                                                    <!--                                                    <kendo-grid-norecords>-->
                                                    <!--                                                        <div class="k-loading-mask customPosition"><span-->
                                                    <!--                                                            class='k-loading-text'></span>-->
                                                    <!--                                                            <div class='k-loading-image'/>-->
                                                    <!--                                                            <div class='k-loading-color'/>-->
                                                    <!--                                                        </div>-->
                                                    <!--                                                    </kendo-grid-norecords>-->
                                                    <kendo-grid-column
                                                        :title="$t('no')"
                                                        :template="rowNumberTmplApply"
                                                        :width="55"
                                                        :editable="
                              () => {
                                return false;
                              }
                            "
                                                        :headerAttributes="{
                              style: 'background-color: #EDF1F5;',
                              class: 'text-products',
                            }"
                                                        :attributes="{ style: 'text-align: left' }"
                                                    />
                                                    <kendo-grid-column
                                                        :field="'referenceNo'"
                                                        :title="$t('number')"
                                                        :width="200"
                                                        :editable="
                              () => {
                                return false;
                              }
                            "
                                                        :template="'<span>#=referenceNo||``#</span>'"
                                                        :headerAttributes="{
                              style: 'background-color: #EDF1F5',
                            }"
                                                    />
                                                    <kendo-grid-column
                                                        :field="'paymentCode'"
                                                        :title="$t('prc')"
                                                        :editable="
                              () => {
                                return false;
                              }
                            "
                                                        :width="200"
                                                        :headerAttributes="{
                              style: 'background-color: #EDF1F5',
                            }"
                                                    />
                                                    <kendo-grid-column
                                                        :field="'currencyCode'"
                                                        :title="$t('currency')"
                                                        :width="200"
                                                        :editable="
                              () => {
                                return false;
                              }
                            "
                                                        :headerAttributes="{
                              style:
                                'text-align: right; background-color: #EDF1F5',
                            }"
                                                        :attributes="{ style: 'text-align: right' }"
                                                    />
                                                    <kendo-grid-column
                                                        :field="'amount'"
                                                        :title="$t('amount')"
                                                        :width="200"
                                                        :template="
                              '<span>#=kendo.toString(amount || 0, decimalFormat)#</span>'
                            "
                                                        :editable="
                              () => {
                                return false;
                              }
                            "
                                                        :headerAttributes="{
                              style:
                                'text-align: right; background-color: #EDF1F5',
                            }"
                                                        :attributes="{ style: 'text-align: right' }"
                                                    />
                                                    <kendo-grid-column
                                                        :field="'txnRate'"
                                                        :title="$t('rate')"
                                                        :width="200"
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
                                                        :attributes="{ style: 'text-align: right' }"
                                                    />
                                                    <kendo-grid-column
                                                        :field="'paidAmount'"
                                                        :title="$t('offset_amount')"
                                                        :editor="AmountEditor"
                                                        :width="200"
                                                        :template="
                              '<span>#=kendo.toString(paidAmount || 0, decimalFormat)#</span>'
                            "
                                                        :editable="
                              () => {
                                return true;
                              }
                            "
                                                        :headerAttributes="{
                              style:
                                'text-align: right; background-color: #EDF1F5',
                            }"
                                                        :attributes="{ style: 'text-align: right' }"
                                                    />
                                                </kendo-grid>
                                                <v-row>
                                                    <v-col sm="7" cols="7" class="pt-0"></v-col>
                                                    <v-col sm="5" cols="5" class="pt-0">
                                                        <v-simple-table>
                                                            <template v-slot:default>
                                                                <tbody>
                                                                <tr>
                                                                    <td class="text-left text-uppercase">
                                                                        {{ $t("total") }}
                                                                    </td>
                                                                    <td class="text-center">:</td>
                                                                    <td
                                                                        class="text-right primary--text text-bold"
                                                                    >
                                                                        {{
                                                                            numberFormat(
                                                                                creditMemo.applyToExchangeAmount
                                                                            )
                                                                        }}
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </template>
                                                        </v-simple-table>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col sm="12" cols="12" class="pt-0">
                                                <h3 class="mb-0 text-uppercase color_grey mb-3">
                                                    {{ $t("customer_credit") }}
                                                </h3>
                                                <kendo-datasource
                                                    ref="depositLineDS"
                                                    :data="depositLines"
                                                    :change="onDepositLineDSChange"
                                                />
                                                <kendo-grid
                                                    id="gridDeposit"
                                                    ref="gridDeposit"
                                                    class="grid-function"
                                                    :data-source-ref="'depositLineDS'"
                                                    :sortable="false"
                                                    :filterable="false"
                                                    :column-menu="true"
                                                    :editable="true"
                                                    :noRecords="true"
                                                    :scrollable-virtual="true"
                                                >
                                                    <kendo-grid-column
                                                        :field="'account'"
                                                        :title="$t('account')"
                                                        :width="200"
                                                        :editable="()=>{ return true}"
                                                        :editor="AccountDropDownEditorDeposit"
                                                        :template="'<span>#=account.name||``#</span>'"
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
                                                        :field="'amount'"
                                                        :title="$t('amount')"
                                                        :width="200"
                                                        :headerTemplate="amountLineHeaderTemplate"
                                                        :editor="AmountEditor"
                                                        :template="amountTemplate"
                                                        :headerAttributes="{
                              style:
                                'text-align: right; background-color: #EDF1F5',
                            }"
                                                        :attributes="{ style: 'text-align: right' }"
                                                    />
                                                </kendo-grid>
                                            </v-col>

                                            <v-col sm="12" cols="12" class="pt-0">
                                                <h3 class="mb-0 text-uppercase color_grey mb-3">
                                                    {{ $t("cash_refund") }}
                                                </h3>
                                                <kendo-datasource
                                                    ref="cashRefundDS"
                                                    :change="onCashRefundChange"
                                                    :data="cashRefundLines"
                                                />
                                                <kendo-grid
                                                    id="gridCashRefund"
                                                    class="grid-function"
                                                    :data-source-ref="'cashRefundDS'"
                                                    :sortable="false"
                                                    :filterable="false"
                                                    :column-menu="true"
                                                    :editable="true"
                                                    :scrollable-virtual="true">
                                                    <kendo-grid-column
                                                        :field="'paymentOption'"
                                                        :title="$t('payment_option')"
                                                        :width="250"
                                                        :template="methodTemplate"
                                                        :editor="PaymentOptionEditor"
                                                        :headerAttributes="{
                              style: 'background-color: #EDF1F5',
                            }"
                                                    />
                                                    <kendo-grid-column
                                                        :field="'account'"
                                                        :title="$t('account')"
                                                        :width="200"
                                                        :template="accountTemplate"
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
                                                        :field="'refNo'"
                                                        :title="$t('payment_ref')"
                                                        :width="200"
                                                        :hidden="true"
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
                                                        :headerTemplate="amountLineHeaderTemplate"
                                                        :width="200"
                                                        :template="amountTemplate"
                                                        :editor="AmountEditor"
                                                        :headerAttributes="{
                              style:
                                'text-align: right; background-color: #EDF1F5',
                            }"
                                                        :attributes="{
                              style: 'text-align: right',
                            }"
                                                    />
                                                </kendo-grid>
                                            </v-col>
                                        </v-col>
                                    </v-row>
                                    <v-row class="pt-3" style="background-color: #fff;">
                                        <!--                                        <v-col sm="12" cols="12" class="pt-0">-->
                                        <!--                                            <kendo-datasource-->
                                        <!--                                                ref="accountLineDS"-->
                                        <!--                                                :data="accountLines"-->
                                        <!--                                                :change="onAccountLineDSChanged"/>-->
                                        <!--                                            <kendo-grid-->
                                        <!--                                                id="gridAccountLine"-->
                                        <!--                                                ref="gridAccountLine"-->
                                        <!--                                                class="grid-function"-->
                                        <!--                                                :data-source-ref="'accountLineDS'"-->
                                        <!--                                                :sortable="false"-->
                                        <!--                                                :filterable="false"-->
                                        <!--                                                :column-menu="true"-->
                                        <!--                                                :editable="true"-->
                                        <!--                                                :noRecords="true"-->
                                        <!--                                                :scrollable-virtual="true">-->
                                        <!--                                                <kendo-grid-column-->
                                        <!--                                                    :title="$t('no.')"-->
                                        <!--                                                    :template="rowNumberTmplAcc"-->
                                        <!--                                                    :width="55"-->
                                        <!--                                                    :column-menu="false"-->
                                        <!--                                                    :headerAttributes="{ style: 'background-color: #EDF1F5;',class: 'text-products', }"-->
                                        <!--                                                    :attributes="{  style: 'text-align: products', }"/>-->
                                        <!--                                                <kendo-grid-column-->
                                        <!--                                                    :field="'account'"-->
                                        <!--                                                    :title="$t('account')"-->
                                        <!--                                                    :width="200"-->
                                        <!--                                                    :template="accountTemplate"-->
                                        <!--                                                    :editor="AccountDropDownEditor"-->
                                        <!--                                                    :headerAttributes="{  style: 'background-color: #EDF1F5', }"/>-->
                                        <!--                                                <kendo-grid-column-->
                                        <!--                                                    :field="'description'"-->
                                        <!--                                                    :title="$t('description')"-->
                                        <!--                                                    :width="200"-->
                                        <!--                                                    :headerAttributes="{ style: 'background-color: #EDF1F5', }"/>-->
                                        <!--                                                <kendo-grid-column-->
                                        <!--                                                    :field="'amount'"-->
                                        <!--                                                    :title="$t('amount')"-->
                                        <!--                                                    :format="'{0:n}'"-->
                                        <!--                                                    :width="150"-->
                                        <!--                                                    :editor="AmountEditor"-->
                                        <!--                                                    :headerAttributes="{ style: 'text-align: right; background-color: #EDF1F5', }"-->
                                        <!--                                                    :attributes="{ style: 'text-align: right',  }"/>-->
                                        <!--                                                <kendo-grid-column-->
                                        <!--                                                    :field="'discountItem'"-->
                                        <!--                                                    :title="$t('discount')"-->
                                        <!--                                                    :template="'<span>#=discountItem.name||``#</span>'"-->
                                        <!--                                                    :editor="DiscountItemDropDownEditor"-->
                                        <!--                                                    :width="150"-->
                                        <!--                                                    :headerAttributes="{ style: 'text-align: right; background-color: #EDF1F5',  }"-->
                                        <!--                                                    :attributes="{  style: 'text-align: right',  }"/>-->
                                        <!--                                                <kendo-grid-column-->
                                        <!--                                                    :field="'vatTax'"-->
                                        <!--                                                    :title="$t('tax')"-->
                                        <!--                                                    :template="'<span>#=vatTax.defaultTax||``#</span>'"-->
                                        <!--                                                    :editor="VatTaxDropDownEditor"-->
                                        <!--                                                    :width="150"-->
                                        <!--                                                    :headerAttributes="{ style:'text-align: right; background-color: #EDF1F5', }"-->
                                        <!--                                                    :attributes="{  style: 'text-align: right', }"/>-->
                                        <!--                                                <kendo-grid-column-->
                                        <!--                                                    :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRowAcc, class: 'btn-plus', }"-->
                                        <!--                                                    :title="$t('action')"-->
                                        <!--                                                    :width="100"-->
                                        <!--                                                    :headerAttributes="{ style:'text-align: right; background-color: #EDF1F5', }"/>-->
                                        <!--                                            </kendo-grid>-->
                                        <!--                                        </v-col>-->
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row>
                                                <!--                                                <v-col sm="9" cols="12" class="">-->
                                                <!--                                                    <v-btn class="float-left btn_plus mr-2 rounded-0"-->
                                                <!--                                                           @click="addRowAcc">-->
                                                <!--                                                        <v-icon size="" class="ma-1">mdi-plus</v-icon>-->
                                                <!--                                                    </v-btn>-->
                                                <!--                                                    &lt;!&ndash;                                                    <v-btn class="float-left add_account mr-2 rounded-0 white&#45;&#45;text"&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                           to="add_item">&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                        {{ $t('add_account') }}&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                    </v-btn>&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                    <v-btn&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                        class="float-left add_account mr-2  rounded-0 btn_save_draft">&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                        {{ $t('sub_total') }}&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                    </v-btn>&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                    <template>&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                        <v-file-input class="mt-0 pt-0 " sm="3" cols="6"&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                                      v-model="files"&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                                      :placeholder="$t('attachment')"&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                                      multiple&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                                      prepend-icon="mdi-paperclip"&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                        >&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                            <template v-slot:selection="{ text }">&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                                <v-chip&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                                    small&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                                    label&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                                    color="primary"&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                                >&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                                    {{ text }}&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                                </v-chip>&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                            </template>&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                        </v-file-input>&ndash;&gt;-->
                                                <!--                                                    &lt;!&ndash;                                                    </template>&ndash;&gt;-->
                                                <!--                                                </v-col>-->

                                                <v-col sm="12" cols="12" class="py-0">
                                                    <v-row>
                                                        <v-col sm="6" cols="6" class="pt-0">
                                                            <v-card class="no-boxshadow pa-3" color="grayBg">
                                                                <v-row>
                                                                    <v-col sm="12" cols="12" class="py-0">
                                                                        <label>{{ $t("message_on_memo") }}</label>
                                                                        <v-textarea
                                                                            class="mt-1"
                                                                            v-model="creditMemo.transactionNote"
                                                                            outlined
                                                                            no-resize
                                                                            height="70px"
                                                                            tage="Memo Message"
                                                                            placeholder="This will appear on the Credit Memo"
                                                                        />
                                                                        <label>{{
                                                                                $t("message_for_journal")
                                                                            }}</label>
                                                                        <v-textarea
                                                                            class="mt-1"
                                                                            v-model="creditMemo.journalNote"
                                                                            outlined
                                                                            no-resize
                                                                            height="70px"
                                                                            tage="Message on Order"
                                                                            placeholder="This will appear on the journal"
                                                                        />
                                                                    </v-col>
                                                                </v-row>
                                                            </v-card>
                                                        </v-col>
                                                        <v-col sm="6" cols="6" class="pt-0">
                                                            <v-simple-table>
                                                                <template v-slot:default>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td class="text-left">
                                                                            {{ $t("amount_return") }} ({{
                                                                                currencyCode
                                                                            }})
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{
                                                                                numberFormat(
                                                                                    creditMemo.itemLineAmount
                                                                                )
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left">
                                                                            {{ $t("offset_amount") }} ({{
                                                                                currencyCode
                                                                            }})
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{ numberFormat(creditMemo.amount) }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left">
                                                                            {{ $t("amount_return") }} ({{
                                                                                baseCurrencyCode
                                                                            }})
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{
                                                                                numberFormat(
                                                                                    creditMemo.itemLineExchangeAmount
                                                                                )
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left">
                                                                            {{ $t("offset_amount") }} ({{
                                                                                baseCurrencyCode
                                                                            }})
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{
                                                                                numberFormat(
                                                                                    creditMemo.exchangeAmount
                                                                                )
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left">
                                                                            {{ $t("variance") }}
                                                                            <v-select
                                                                                class="mt-1"
                                                                                v-model="creditMemo.varianceAcc"
                                                                                :items="varianceAccs"
                                                                                item-value="id"
                                                                                :item-text="
                                            (item) =>
                                              `${item.number} - ${item.name}`
                                          "
                                                                                @change="onVarianceAccChanged"
                                                                                return-object
                                                                                tage="variance account"
                                                                                placeholder="account"
                                                                                clearable
                                                                                outlined=""
                                                                            />
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{
                                                                                numberFormat(creditMemo.exchangeVariance)
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr hidden>
                                                                        <td class="text-left">{{ $t("dr") }}</td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{ numberFormat(dr) }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr hidden>
                                                                        <td class="text-left">{{ $t("cr") }}</td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
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
                                        </v-col>
                                    </v-row>

                                    <v-divider/>

                                    <v-card outlined dense class="no_border function_footer">
                                        <v-alert type="warning" v-model="alert" dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                    class="mr-2  float-left select_template rounded-0"
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
                                                    <v-list-item-title>{{
                                                            item.title
                                                        }}
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <v-btn
                                            color="primary"
                                            outlined
                                            class="float-left  black--text text-capitalize"
                                            @click="cancel"
                                        >{{ $t("cancel") }}
                                        </v-btn>
                                        <!--                    <v-menu>-->
                                        <!--                      <template v-slot:activator="{ on }">-->
                                        <!--                        <v-btn color="primary"-->
                                        <!--                               class="ml-2  float-right white&#45;&#45;text text-capitalize" v-on="on">-->
                                        <!--                          {{ $t('save_option') }}-->
                                        <!--                          <v-icon size="" class="ma-1">expand_more</v-icon>-->
                                        <!--                        </v-btn>-->
                                        <!--                      </template>-->
                                        <!--                      <v-list rounded>-->
                                        <!--                        <v-list-item-group>-->
                                        <!--                          <v-list-item>-->
                                        <!--                            <v-list-item-content>-->
                                        <!--                              <v-list-item-title>-->
                                        <!--                                {{ $t('save_new') }}-->
                                        <!--                              </v-list-item-title>-->
                                        <!--                            </v-list-item-content>-->
                                        <!--                          </v-list-item>-->
                                        <!--                          <v-list-item>-->
                                        <!--                            <v-list-item-content>-->
                                        <!--                              <v-list-item-title>{{ $t('save_draft') }}-->
                                        <!--                              </v-list-item-title>-->
                                        <!--                            </v-list-item-content>-->
                                        <!--                          </v-list-item>-->
                                        <!--                        </v-list-item-group>-->
                                        <!--                      </v-list>-->
                                        <!--                    </v-menu>-->
                                        <v-btn
                                            color="primary"
                                            @click="onSaveClose('close')"
                                            class="float-right  white--text text-capitalize">{{ $t("save_close") }}
                                        </v-btn>
                                        <v-btn color="secondary"
                                               style="margin-right: 10px !important"
                                               class="white--text float-right text-capitalize"
                                               @click="onSaveClose('new')" :hidden="hiddenButton">{{ $t("save_new") }}
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
                  <span class="pointer" @click="Help('credit memo')">
                    {{ $t("help") }}
                  </span>
                                    <v-icon
                                        @click="cancel()"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right mt-n1"
                                    >close
                                    </v-icon>
                                </h3>

                                <div
                                    v-if="!isHideBar"
                                    class="small_sidebar rounded-4 mt-8 px-4 pt-4 grayBg"
                                >
                                    <v-card outlined dense class="pa-3 no_border my_card rounded-4 white--text"
                                            color="primary" height="60px">
                                        <h3 class="text-left font_13 flex-1 text-uppercase">{{
                                                $t('offset_amount')
                                            }}</h3>
                                        <h3 class="text-right flex-1 font_20 niradei_heavy">
                                            {{ numberFormat(creditMemo.exchangeAmount) }}</h3>
                                    </v-card>
                                    <v-row>
                                        <v-col sm="12" cols="12" class="pt-5">
                                            <!-- <h4 class="text-uppercase mb-1">{{ $t('analysis') }}</h4> -->
                                            <label class="label mb-0">{{ $t("segment") }}</label>
                                            <v-select
                                                class="mt-1"
                                                v-model="creditMemo.segment"
                                                :items="segments"
                                                item-value="id"
                                                :disabled="true"
                                                :item-text="(item) => `${item.code} - ${item.name}`"
                                                return-object
                                                tage="sub Of"
                                                placeholder="Sub Of"
                                                outlined=""
                                            />
                                            <label class="label mb-0">{{ $t("location") }}</label>
                                            <v-select
                                                class="mt-1"
                                                v-model="creditMemo.location"
                                                :items="locations"
                                                item-value="id"
                                                :disabled="true"
                                                :item-text="(item) => `${item.code} - ${item.name}`"
                                                return-object
                                                tage="Location"
                                                placeholder="bu/location"
                                                outlined=""
                                            />
                                            <label class="label font_14">{{ $t("project") }}</label>
                                            <v-select
                                                class=" mt-1"
                                                v-model="creditMemo.project"
                                                :items="customerProjects"
                                                :item-text="(item) => `${item.code} - ${item.name}`"
                                                item-value="id"
                                                :disabled="true"
                                                tage="Customer Project"
                                                placeholder="project"
                                                outlined
                                            />
                                            <label class="label font_14">{{ $t("employee") }}</label>
                                            <v-col
                                                sm="12"
                                                cols="12"
                                                class="kendo_dropdown_custom pl-0 pb-3 pt-0"
                                            >
                                                <dropdownlist
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
                                    <v-divider class="mb-3"/>
                                    <!--                                    <v-card class="pa-3 mb-2 no-boxshadow"-->
                                    <!--                                            style="min-height: 70px; background-color: #ffffff !important;">-->
                                    <!--                                        &lt;!&ndash;                                        <h3 class="text-uppercase mb-2 font_18">{{ $t('offset_amount') }}</h3>&ndash;&gt;-->
                                    <!--                                        &lt;!&ndash;                                        <h3 class="text-bold float-right" style="font-size: 22px">200</h3>&ndash;&gt;-->
                                    <!--                                    </v-card>-->
                                    <!--                                    <v-row>-->
                                    <!--                                        <v-col sm="12" cols="12" class="pt-1">-->
                                    <!--                                            <label-->
                                    <!--                                                class="label text-bold text-uppercase font_14">{{-->
                                    <!--                                                    $t('invoice_to_offset')-->
                                    <!--                                                }}</label>-->
                                    <!--                                            <v-select class=" mt-1"-->
                                    <!--                                                      :items="transaction"-->
                                    <!--                                                      :rules="[v => !!v || 'Payble Account is required']"-->
                                    <!--                                                      return-object-->
                                    <!--                                                      tage="Invoice to Offset"-->
                                    <!--                                                      outlined-->
                                    <!--                                            >-->
                                    <!--                                                <template v-slot:item="{ item }">-->
                                    <!--                                                    <p class="d-block text-center">{{ item.id }}. {{ item.name }}</p>-->
                                    <!--                                                    <br>-->
                                    <!--                                                    <div class="item_list d-flex">-->
                                    <!--                                                        <span>-->
                                    <!--                                                            {{ item.no }}-->
                                    <!--                                                        </span>-->
                                    <!--                                                        <v-btn>Add</v-btn>-->
                                    <!--                                                    </div>-->
                                    <!--                                                </template>-->
                                    <!--                                            </v-select>-->

                                    <!--                                            <v-row>-->
                                    <!--                                                <v-col sm="9" cols="9" class="py-1 pr-0">-->
                                    <!--                                                    <v-card outlined-->
                                    <!--                                                            class="px-3 py-1 text-white no-boxshadow no_border justify-left d-flex"-->
                                    <!--                                                            style="background-color: #92d050; height: 30px">-->
                                    <!--                                                        <input type="checkbox" class="checkbox_inv float-left"/>-->
                                    <!--                                                        <p class="mb-0" style="width: 100%">-->
                                    <!--                                                            <span class="pl-3 float-left">No. 00224</span>-->
                                    <!--                                                            <span class="float-right">2,500.00</span>-->
                                    <!--                                                        </p>-->
                                    <!--                                                    </v-card>-->
                                    <!--                                                </v-col>-->
                                    <!--                                                <v-col sm="3" cols="3" class="py-1  pl-1">-->
                                    <!--                                                    <v-btn-->
                                    <!--                                                        class="text-white text-bold rounded-0 float-right text-uppercase"-->
                                    <!--                                                        style="height: 30px !important; background-color: rgb(0, 176, 80) !important">-->
                                    <!--                                                        {{ $t('add') }}-->
                                    <!--                                                    </v-btn>-->
                                    <!--                                                </v-col>-->
                                    <!--                                            </v-row>-->
                                    <!--                                            <v-row>-->
                                    <!--                                                <v-col sm="9" cols="9" class="py-1 pr-0">-->
                                    <!--                                                    <v-card outlined-->
                                    <!--                                                            class="px-3 py-1 text-white no-boxshadow no_border justify-left d-flex"-->
                                    <!--                                                            style="background-color: #92d050; height: 30px">-->
                                    <!--                                                        <input type="checkbox" class="checkbox_inv float-left"/>-->
                                    <!--                                                        <p class="mb-0" style="width: 100%">-->
                                    <!--                                                            <span class="pl-3 float-left">No. 00224</span>-->
                                    <!--                                                            <span class="float-right">2,500.00</span>-->
                                    <!--                                                        </p>-->
                                    <!--                                                    </v-card>-->
                                    <!--                                                </v-col>-->
                                    <!--                                                <v-col sm="3" cols="3" class="py-1  pl-1">-->
                                    <!--                                                    <v-btn-->
                                    <!--                                                        class="text-white text-bold rounded-0 float-right text-uppercase"-->
                                    <!--                                                        style="height: 30px !important; background-color: rgb(0, 176, 80) !important">-->
                                    <!--                                                        {{ $t('add') }}-->
                                    <!--                                                    </v-btn>-->
                                    <!--                                                </v-col>-->
                                    <!--                                            </v-row>-->
                                    <!--                                            <v-row>-->
                                    <!--                                                <v-col sm="9" cols="9" class="py-1 pr-0">-->
                                    <!--                                                    <v-card outlined-->
                                    <!--                                                            class="px-3 py-1 text-white no-boxshadow no_border justify-left d-flex"-->
                                    <!--                                                            style="background-color: #92d050; height: 30px">-->
                                    <!--                                                        <input type="checkbox" class="checkbox_inv float-left"/>-->
                                    <!--                                                        <p class="mb-0" style="width: 100%">-->
                                    <!--                                                            <span class="pl-3 float-left">No. 00224</span>-->
                                    <!--                                                            <span class="float-right">2,500.00</span>-->
                                    <!--                                                        </p>-->
                                    <!--                                                    </v-card>-->
                                    <!--                                                </v-col>-->
                                    <!--                                                <v-col sm="3" cols="3" class="py-1  pl-1">-->
                                    <!--                                                    <v-btn-->
                                    <!--                                                        class="text-white text-bold rounded-0 float-right text-uppercase"-->
                                    <!--                                                        style="height: 30px !important; background-color: rgb(0, 176, 80) !important">-->
                                    <!--                                                        {{ $t('add') }}-->
                                    <!--                                                    </v-btn>-->
                                    <!--                                                </v-col>-->
                                    <!--                                            </v-row>-->
                                    <!--                                            <v-row>-->
                                    <!--                                                <v-col sm="9" cols="9" class="py-1 pr-0">-->
                                    <!--                                                    <v-card outlined-->
                                    <!--                                                            class="px-3 py-1 text-white no-boxshadow no_border justify-left d-flex"-->
                                    <!--                                                            style="background-color: #92d050; height: 30px">-->
                                    <!--                                                        <input type="checkbox" class="checkbox_inv float-left"/>-->
                                    <!--                                                        <p class="mb-0" style="width: 100%">-->
                                    <!--                                                            <span class="pl-3 float-left">No. 00224</span>-->
                                    <!--                                                            <span class="float-right">2,500.00</span>-->
                                    <!--                                                        </p>-->
                                    <!--                                                    </v-card>-->
                                    <!--                                                </v-col>-->
                                    <!--                                                <v-col sm="3" cols="3" class="py-1  pl-1">-->
                                    <!--                                                    <v-btn-->
                                    <!--                                                        class="text-white text-bold rounded-0 float-right text-uppercase"-->
                                    <!--                                                        style="height: 30px !important; background-color: rgb(0, 176, 80) !important">-->
                                    <!--                                                        {{ $t('add') }}-->
                                    <!--                                                    </v-btn>-->
                                    <!--                                                </v-col>-->
                                    <!--                                            </v-row>-->
                                    <!--                                        </v-col>-->
                                    <!--                                    </v-row>-->

                                    <!--                                    <h4 class="mb-2 text-uppercase">{{ $t('add_to_deposit') }}</h4>-->
                                    <!--                                    <label class="label font_14">{{ $t('sale_channel') }}</label>-->
                                    <!--                                    <v-select class=" mt-1"-->
                                    <!--                                              :items="suppliers"-->
                                    <!--                                              :rules="[v => !!v || 'Payble Account is required']"-->
                                    <!--                                              return-object-->
                                    <!--                                              tage="Add to Deposit"-->
                                    <!--                                              outlined-->
                                    <!--                                    />-->
                                    <!--                                    <label class="label font_14">{{ $t('deposit_amount') }}</label>-->
                                    <!--                                    <v-text-field class=" mt-1 mb-16"-->
                                    <!--                                                  tage="Deposit Amount"-->
                                    <!--                                                  outlined-->
                                    <!--                                    />-->

                                    <p class="mb-0 detial_smallside_p font_14">
                                        {{ $t("sale_return_funct_desc") }}
                                    </p>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                :myLoading="true"
            />
            <v-dialog v-model="dialogTax" max-width="450px">
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("tax_list") }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogTax = false">close</v-icon>
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
                                                {{ numberFormat(creditMemo.taxAmount) }}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>

<script>
// import kendo from '@progress/kendo-ui'
import {i18n} from "@/i18n";
import LoadingMe from "@/components/Loading";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import CreditMemoModel from "@/scripts/sale_return/model/CreditMemo";
import kendo from "@progress/kendo-ui";
import {uuid} from "vue-uuid";
import SaleFormContentModel from "@/scripts/model/SaleFormContent";
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import ItemLineModel from "@/scripts/sale_return/model/ItemLine";
// import AccountLineModel from "@/scripts/sale_return/model/AccountLine";
import ApplyToLineModel from "@/scripts/sale_return/model/ApplyToLine";
import DepositLineModel from "@/scripts/sale_return/model/DepositLine";
import {dataStore, ShowResource} from "@/observable/store";
import PaymentOptionEditor from "@/scripts/kendo_editor/PaymentOptionEditor";

const defaultItem = {["numberName"]: "Select customer...", ["id"]: null};
const customerHandler = require("@/scripts/customerHandler");
const prefixHandler = require("@/scripts/prefixHandler");
const emptyItem = {["numberName"]: "loading ..."};
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const saleFormContentHandler = require("@/scripts/saleFormContentHandler");
const employeeHandler = require("@/scripts/employeeHandler");
const locationHandler = require("@/scripts/locationHandler");
const productVariantHandler = require("@/scripts/productVariantHandler");
const discountItemHandler = require("@/scripts/discountItemHandler");
const accountHandler = require("@/scripts/handler/accounting/account");
const uomPriceHandler = require("@/scripts/uomPriceHandler");
const settingsHandler = require("@/scripts/settingsHandler");
const projectHandler = require("@/scripts/projectHandler");
const priceLevelHandler = require("@/scripts/priceLevelHandler");
const settingHandler = require("@/scripts/settingHandler");
const paymentTermHandler = require("@/scripts/paymentTermHandler");
const currencyHandler = require("@/scripts/currency/handler/currencyHandler");
const saleUnitItemHandler = require("@/scripts/saleUnitItemHandler");
const paymentOptionHandler = require("@/scripts/paymentOptionHandler");

import SaleDepositItemLineModel from "@/scripts/sale_deposit/model/ItemLine";
import otherChargeHandler from "@/scripts/otherChargeHandler";
import OtherChargeModel from "@/scripts/model/OtherCharge";
import Helper from "@/helper";

const saleFormContentModel = new SaleFormContentModel({});
const itemLineModel = new ItemLineModel({});
// const accountLineModel = new AccountLineModel({})
const applyToLineModel = new ApplyToLineModel({});
const depositLineModel = new DepositLineModel({});
const $ = kendo.jQuery
const itemLinePrefix = "lin-";
const textField = "numberName";

const creditMemoModel = new CreditMemoModel({});
const saleDepositItemLineModel = new SaleDepositItemLineModel({});
const OPTION_TYPE = "Customer";
const strOptionFilter = "?optionType=" + OPTION_TYPE;
const DISCOUNT_TYPE = "?type=Sale";
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
export default {
    name: "CreditMemo",
    props: ["id"],
    components: {
        LoadingMe: LoadingMe,
        "app-datepicker": DatePickerComponent,
        dropdownlist: DropDownList,
    },
    data: () => ({
        isLoading: 0,
        PaymentOptionEditor: PaymentOptionEditor,
        creditMemo: creditMemoModel,
        saleFormContent: saleFormContentModel,
        itemLine: itemLineModel,
        // accountLine: accountLineModel,
        applyToLine: applyToLineModel,
        depositLine: depositLineModel,
        saleDepositLine: saleDepositItemLineModel,

        customerList: [],
        cashRefundLines: [],
        itemLines: [],
        taxListTotal: [],
        otherChargeList: [],
        customer: {},
        defaultItem: defaultItem,
        dataItemKey: "id",
        textField: "numberName",
        filter: "",
        cusBaseUrl: customerHandler.searchv1(),
        empBaseUrl: employeeHandler.search(),
        loggedUser: {
            id: cookie.creator,
            name: cookie.email,
        },
        employees: [],
        mEmployee: {},
        customerProjects: [],
        priceLevel: [],
        locations: [],
        otherTax: [],
        vatTax: [],
        specificTax: [],
        publicLightingTax: [],
        saleUnitItemList: [],
        customerDiscountItem: [],
        customerOtherChargeItem: [],
        customerSaleUnit: [],
        transactionType: [],
        segments: [],
        exchangeRate: [],
        currencyCode: "",
        transactionRate: 1,
        accountLines: [],
        transactionRateDate: "",
        accounts: [],
        depositLines: [],
        offsetList: [],
        offsetInvoices: [],
        offsetInvoiceList: [],
        offsetInvoice: {},
        decimalFormat: "n2",
        // LoadingMe
        showLoading: false,
        bill_date: "",
        alert: false,
        valid: true,
        suppliers: [],
        journal_types: [],
        suppliers_item: [],
        paymentMethod: [],
        expense: ["Equal", "weighted"],
        transactionDate: new Date().toISOString().substr(0, 10),
        templates: [
            {title: "Draft"},
            {title: "Open"},
            {title: "Partially Closed"},
            {title: "Closed"},
        ],
        isHideBar: false,
        dialogTax: false,
        baseCurrencyCode: "",
        accCash: [],
        accDeposit: [],
        accDeposits: [],
        jRaw: [],
        jRaw1: [],
        jRaw2: [],
        jRaw3: [],
        jRaw4: [],
        jRaw5: [],
        taxListDetail: [],
        gainLossAcc: {},
        otherRevenueAcc: {},
        varianceAccs: [],
        refFrom: [],
        refTo: [],
        isPriceLevelChanged: false,
        cr: 0,
        dr: 0,
    }),
    computed: {
        disabledMe() {
            return !!this.$route.params.id;
        },
        //         $("#getInfoButton").bind("click", function () {
        //
        //     var grid = kendo.jQuery("#grid1").data("kendoGrid");
        //     var row = $("input:checked", grid.tbody).closest("tr");
        //     var item = grid.dataItem(row);
        //     alert (JSON.stringify(item));
        // });
        radioButton() {
            return `<input type="radio" class="detailGridRowSelector" title="Select Lines" name="radioLineSelector" />`;
        },
        amountHeaderTemplate() {
            if (this.customer) {
                if (this.customer.hasOwnProperty("baseCurrency")) {
                    const baseCurrency = this.customer.baseCurrency;
                    if (baseCurrency.hasOwnProperty("code")) {
                        return "Amount (" + baseCurrency.code + ")";
                    }
                }
            }
            return "Amount";
        },
        amountLineHeaderTemplate() {
            if (this.currencyCode) {
                return "Amount (" + this.currencyCode + ")";
            }
            return "Amount";
        },
        hiddenButton() {
            if (this.$route.params.id) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        status(status) {
            let statusText = ''
            switch (status) {
                case 1:
                    statusText = 'Open'
                    break
                case 2:
                    statusText = 'Partially Paid'
                    break
                case 3:
                    statusText = 'Paid'
                    break
                case 4:
                    statusText = 'Void'
                    break
            }
            return statusText
        },
        onPriceLevelChange() {
            this.isPriceLevelChanged = true
            this.loadTransactionRate()
            this.clearUOMItem()
        },
        async clearUOMItem() {
            let ds = this.$refs.itemLineDS.kendoWidget()
            ds.data().map(n => {
                n.set('uom', {})
            })
            this.isPriceLevelChanged = false
        },
        qohTemplate(dataItem) {
            const buom = dataItem.buom || {};
            const qoh = dataItem.qoh || 0;
            if (buom.hasOwnProperty("name")) {
                return qoh + ` ` + buom.name;
            }
            return ``;
        },
        formatVariance(num) {
            if (num) {
                const varianceNumber = this.numberToString(num);
                return varianceNumber;
                //   if (varianceNumber) {
                //     const strDigit = varianceNumber.split('.')
                //     const head = strDigit[0]
                //     const rightHead = strDigit[1]
                //     const nums = this.countZeros(rightHead)
                //     const substringRight = rightHead.substring(0, nums + 1)
                //     return head + '.' + substringRight
                //   }
            }
            // return 0
        },
        countZeros(num) {
            if (num) {
                let splitted = num.split("");
                let i = 0;
                while (splitted.shift() == 0) {
                    i += 1;
                }
                return i;
            }
            return 0;
        },
        numberToString(num) {
            if (num) {
                let numStr = String(num);
                if (Math.abs(num) < 1.0) {
                    let e = parseInt(num.toString().split("e-")[1]);
                    if (e) {
                        let negative = num < 0;
                        if (negative) num *= -1;
                        num *= Math.pow(10, e - 1);
                        numStr =
                            "0." + new Array(e).join("0") + num.toString().substring(2);
                        if (negative) numStr = "-" + numStr;
                    }
                } else {
                    let e = parseInt(num.toString().split("+")[1]);
                    if (e > 20) {
                        e -= 20;
                        num /= Math.pow(10, e);
                        numStr = num.toString() + new Array(e + 1).join("0");
                    }
                }
                // const zeros = this.numberOfZeros(numStr)
                return numStr; //parseFloat(numStr).toFixed(zeros + 1)
            }
        },
        showWaringMessage(title, text, confirmButtonText) {
            this.$swal({
                title: title,
                text: text,
                icon: "warning",
                showCancelButton: false,
                confirmButtonColor: "#4d4848",
                cancelButtonColor: "#ED1A3A",
                confirmButtonText: confirmButtonText,
            }).then((result) => {
                if (result.value) {
                    window.console.log("1");
                }
            });
        },
        onVarianceAccChanged() {
            this.autoCalculate();
            this.autoCalculateApplyTo();
            this.autoCalculateDeposit();
            this.autoCalculateCashRefund();
            this.calculateAmount();
        },
        shrinkData() {
            this.jRaw = [];
            const obj = this.jRaw.concat(
                this.jRaw1,
                this.jRaw2,
                this.jRaw3,
                this.jRaw4,
                this.jRaw5
            );
            const uniques = this.removeDuplicate(
                obj
            ); /*[...new Set(accountId.map(i => {
                return {
                    id_: i.id_,
                    id: i.id,
                    type: i.type
                }
            }))]*/

            uniques.forEach((n) => {
                const found = obj.filter((m) => m.id === n.id);
                let amount = 0,
                    exchangeAmount = 0;
                found.forEach((z) => {
                    amount += parseFloat(z.amount || 0);
                    exchangeAmount += parseFloat(z.exchangeAmount || 0);
                });
                n.exchangeAmount = parseFloat(exchangeAmount); //this.numberFormat(amount)
                n.amount = parseFloat(amount);
            });
            this.jRaw = uniques;
            let dr = 0,
                cr = 0;
            this.jRaw.forEach((j) => {
                switch (j.type) {
                    case "cr":
                        cr += parseFloat(j.amount);
                        break;
                    case "dr":
                        dr += parseFloat(j.amount);
                        break;
                    default:
                        break;
                }
            });
            this.dr = dr;
            this.cr = cr;
            window.console.log("dr=", dr, "cr=", cr, "dr+cr = ", dr + cr);
            window.console.log(JSON.stringify(this.jRaw), "uniques", this.creditMemo);
        },
        offsetInvoiceChanged() {
            //todo: add invoice to line
            if (this.offsetInvoice) {
                const txnId = this.offsetInvoice.id || {};
                this.creditMemo.location = this.offsetInvoice.location || {};
                this.creditMemo.segment = this.offsetInvoice.segment || {};
                this.creditMemo.project = this.offsetInvoice.project || {};
                this.offsetList = [];
                if (txnId) {
                    this.offsetList = this.offsetInvoiceList.filter(
                        (o) => o.id === txnId
                    );
                    this.refFrom.push({
                        id: this.offsetInvoice.id || '',
                        reference: this.offsetInvoice.referenceNo || '',
                        type: 'Invoice'
                    })
                    window.console.log('refF', this.refFrom)
                }
            }
        },
        priceTemplate(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("price")) {
                    return kendo.toString(dataItem.price || 0, dataItem.decimalFormat);
                }
            }
            return 0;
        },
        amtTemplate(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("amount")) {
                    return kendo.toString(dataItem.amount || 0, dataItem.decimalFormat);
                }
            }
            return 0;
        },
        Help(key_search) {
            ShowResource(key_search);
        },
        methodTemplate(dataItem) {
            const method = dataItem.paymentOption;
            if (method) {
                return `<span>${method.bankAccountName || ``}</span>`;
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
        numberFormat(value) {
            return kendo.toString(value, `${this.decimalFormat}`);
        },
        onDepositLineDSChange(e) {
            if (e.field) {
                let dataRow = e.items[0];
                switch (e.field) {
                    case "amount":
                        dataRow.set("exchangeAmount", dataRow.amount);
                        break;
                    default:
                        break;
                }
                this.autoCalculate();
                this.autoCalculateApplyTo();
                this.autoCalculateDeposit();
                this.autoCalculateCashRefund();
                this.calculateAmount();
            }
        },
        onApplyToLineChange(e) {
            if (e.field) {
                let dataRow = e.items[0],
                    offset = 0,
                    amount = 0;
                switch (e.field) {
                    case "paidAmount":
                        amount = parseFloat(dataRow.amount);
                        offset = parseFloat(dataRow.paidAmount);
                        if (offset > amount) {
                            dataRow.set("paidAmount", amount);
                            dataRow.set("paidAmountTobase", amount * dataRow.txnRate);
                        } else {
                            dataRow.set(
                                "paidAmountTobase",
                                dataRow.paidAmount * dataRow.txnRate
                            );
                            dataRow.set(
                                "paidAmountTxn",
                                offset * parseFloat(dataRow.txnRate)
                            );
                        }
                        // window.console.log(dataRow.paidAmount * 1 / dataRow.rateTobase, 'APPLY RO')
                        break;
                    default:
                        break;
                }
                this.autoCalculate();
                this.autoCalculateApplyTo();
                this.autoCalculateDeposit();
                this.autoCalculateCashRefund();
                this.calculateAmount();
            }
        },
        onCashRefundChange(e) {
            if (e.field) {
                let dataRow = e.items[0], pOption = {}
                switch (e.field) {
                    case "paymentOption":
                        pOption = dataRow.paymentOption || {}
                        dataRow.set("account", pOption.account || {});
                        break;
                    default:
                        break;
                }
            }
            if (e.field) {
                // this.autoCalculateCashRefund()
                this.autoCalculate();
                this.autoCalculateApplyTo();
                this.autoCalculateDeposit();
                this.autoCalculateCashRefund();
                this.calculateAmount();
            }
        },
        nowTimes() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            window.console.log(pageLoadTime, "--");
        },
        onEmployeeChanged(event) {
            const value = event.value;
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.mEmployee = value;
            this.creditMemo.employee = value;
        },
        afterFetch_(json) {
            this.employees = json.data;
        },
        onEmployeeFilterChanged(event) {
            const filter = event.filter.value;
            this.requestData_(0, filter, this.empBaseUrl);
            this.filter_ = filter;
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
                return total;
            }
            // return 0
        },
        async loadTransactionRate() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const date = new Date(this.transactionDate)
                        .toISOString()
                        .substr(0, 10);
                    const priceLevel = this.creditMemo.priceLevel;
                    let code = "";
                    this.offsetInvoices = [];
                    this.offsetList = [];
                    if (priceLevel) {
                        if (priceLevel.hasOwnProperty("currency")) {
                            this.creditMemo.currency = priceLevel.currency;
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
                                        this.creditMemo.txnRate = this.exchangeRate.rate;
                                        this.transactionRateDate = this.exchangeRate.effectiveDate;
                                        this.creditMemo.exchangeRate = this.exchangeRate;
                                        this.showLoading = false;
                                    }
                                });
                        }
                        window.console.log('this.customer', this.customer)
                        if (this.customer) {
                            this.searchInvoice();
                        }
                    } else {
                        this.isLoading = 0
                    }
                }, 50);
            });
        },
        async loadPaymentTerm() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    paymentTermHandler.getAll().then((res) => {
                        this.showLoading = false;
                        this.paymentTerms = res.data.data;
                        if (this.paymentTerms.length > 0) {
                            this.creditMemo.paymentTerm = this.paymentTerms[0];
                        }
                    });
                }, 50);
            });
        },
        errorMessage() {
        },
        async loadTax() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    settingHandler.get().then((res) => {
                        this.tax = res;
                        this.otherTax = this.tax.filter(
                            (m) =>
                                (m.taxType.typeId === 7 || m.taxType.typeId === 10) &&
                                m.transactionType === "Sale"
                        ); // valuable tax
                        this.specificTax = this.tax.filter(
                            (m) =>
                                (m.taxType.typeId === 8 || m.taxType.typeId === 10) &&
                                m.transactionType === "Sale"
                        ); // valuable tax
                        this.publicLightingTax = this.tax.filter(
                            (m) =>
                                (m.taxType.typeId === 9 || m.taxType.typeId === 10) &&
                                m.transactionType === "Sale"
                        ); // valuable tax
                        this.vatTax = this.tax.filter(
                            (m) =>
                                (m.taxType.typeId === 1 ||
                                    m.taxType.typeId === 8 ||
                                    m.taxType.typeId === 10) &&
                                m.transactionType === "Sale"
                        ); // valuable tax
                    });
                }, 50);
            });
        },
        async loadLocation() {
            this.locations = []
            const roleType = dataStore.roleType || 0
            if (roleType === 0) {
                if (dataStore.roleData) {
                    const roleData = dataStore.roleData || []
                    const location = roleData.filter(itm => itm.type === 'location')
                    const locationDefault = location.filter(m => m.isDefault === 1)
                    this.locations = location
                    if (this.$route.params.id === undefined || this.$route.params.id === '') {
                        if (locationDefault.length > 0) {
                            this.creditMemo.location = locationDefault[0];
                        }
                    }
                }
            } else if (roleType === 1) {
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        this.locations = [];
                        locationHandler
                            .list()
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.locations = res.data.data;
                                }
                            })
                    }, 10);
                });
            }


        },
        async loadProjectByCustomer() {
            this.customerProjects = []
            const roleType = dataStore.roleType || 0
            if (roleType === 0) {
                if (dataStore.roleData) {
                    const roleData = dataStore.roleData || []
                    const project = roleData.filter(itm => itm.type === 'project')
                    project.forEach(k => {
                        const customers = k.customers || []
                        const proCustomer = customers.filter(n => n.customer.id === this.customer.id)
                        if (proCustomer.length > 0) {
                            this.customerProjects.push(k)
                        }
                    })
                    if (this.$route.params.id === undefined || this.$route.params.id === '') {
                        const projectDefault = this.customerProjects.filter(m => m.isDefault === 1)
                        if (projectDefault.length > 0) {
                            this.creditMemo.project = projectDefault[0];
                        }
                    }
                }
            } else if (roleType === 1) {
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        projectHandler
                            .getByCustomer(this.customer.id)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.customerProjects = res.data.data;
                                }
                            })
                    }, 10);
                });
            }
        },
        async loadSegment() {
            this.segments = []
            const roleType = dataStore.roleType || 0
            if (roleType === 0) {
                if (dataStore.roleData) {
                    const roleData = dataStore.roleData || []
                    const segment = roleData.filter(itm => itm.type === 'segment')
                    const segmentDefault = segment.filter(m => m.isDefault === 1)
                    this.segments = segment
                    if (this.$route.params.id === undefined || this.$route.params.id === '') {
                        if (segmentDefault.length > 0) {
                            this.creditMemo.segment = segmentDefault[0];
                        }
                    }
                }
            } else if (roleType === 1) {
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        this.segments = [];
                        settingsHandler
                            .getSeg()
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.segments = res.data.data;
                                }
                            })
                    }, 10);
                });
            }
        },
        async loadAccount() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    accountHandler.getAll().then((res) => {
                        (async () => {
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

                            this.accDeposits = res.data
                                .filter((m) => m.account_type.number === 20)
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
                            this.varianceAccs = res.data
                                .filter(
                                    (m) =>
                                        m.account_type.number >= 33 && m.account_type.number <= 48
                                )
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
                            // this.accounts = await Promise.all(res.map(item => {
                            //     return {
                            //         id: item.uuid,
                            //         name: item.name,
                            //         number: item.number
                            //     }
                            // }));
                        })();
                    });
                }, 50);
            });
        },
        async loadPriceLevel() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = '?nature=sale'
                    priceLevelHandler.get(strFilter).then((res) => {
                        this.priceLevel = res;
                        if (this.priceLevel.length > 0) {
                            this.creditMemo.priceLevel = this.priceLevel[0];
                        }
                    });
                }, 50);
            });
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
                }, 50);
            });
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
                                this.decimalFormat = "n" + data[0].decimal || "n2";
                                this.addRow();
                                this.addRowDeposit();
                                this.addRowCashRefund();
                            }
                        }
                    });
                }, 50);
            });
        },
        async initData() {
            if (this.$route.params.id !== undefined) {
                await this.loadViewCreditMemo();
            }
            // else {
            //     this.addRowDeposit()
            //     this.addRowCashRefund()
            // }
        },
        taxMapping(objTax, tax) {
            const taxId = tax.id || ''
            const tax_ = objTax.filter(t => t.id === taxId)[0]
            return tax_ || {
                id: '',
                defaultTax: ''
            }
        },
        dataSourceChanged(e) {
            if (e.field) {
                let dataRow = e.items[0],
                    buom = {}, vTax = {}, spTax = {}, otTax = {}, plTax = {},
                    conversionRate = 1,
                    wac = 0,
                    qoh = 0,
                    amount = 0,
                    xAmount = 0,
                    price = 0;
                switch (e.field) {
                    case "item":
                        // this.attribute_ = this.attributes.filter(m => m.type.id === dataRow.variant.id)
                        dataRow.set("description", dataRow.item.description);
                        buom = dataRow.item.uom || {};
                        dataRow.set("buom", buom);
                        break;
                    case "price":
                        try {
                            amount = parseFloat(dataRow.price) * parseFloat(dataRow.qty);
                            xAmount = amount * parseFloat(this.creditMemo.txnRate);
                            dataRow.set("price", parseFloat(dataRow.price));
                            dataRow.set("amount", amount);
                            dataRow.set("exchangeAmount", xAmount);
                            // window.console.log('price',dataRow.price)
                        } catch {
                            dataRow.set("price", 0);
                            dataRow.set("amount", 0);
                            dataRow.set("exchangeAmount", 0);
                        }
                        break;
                    case "uom":
                        if (this.isPriceLevelChanged === false) {
                            try {
                                buom = dataRow.uom.buom || {};
                                buom = dataRow.uom.buom || {};
                                qoh = dataRow.uom.qoh || 0;
                                conversionRate = dataRow.uom.conversionRate || 1;
                                wac = dataRow.uom.wac || 0;
                                dataRow.set("buom", buom);
                                dataRow.set("wac", wac);
                                dataRow.set("qoh", qoh);
                                /* todo: mapping tax object */
                                vTax = this.taxMapping(this.vatTax, dataRow.uom.vatTax || {})
                                otTax = this.taxMapping(this.otherTax, dataRow.uom.otherTax || {})
                                spTax = this.taxMapping(this.specificTax, dataRow.uom.specificTax || {})
                                plTax = this.taxMapping(this.publicLightingTax, dataRow.uom.publicLightingTax || {})

                                dataRow.set("vatTax", vTax);
                                dataRow.set("specificTax", otTax);
                                dataRow.set("otherTax", spTax);
                                dataRow.set("publicLightingTax", plTax);
                                dataRow.set("conversionRate", parseFloat(conversionRate));

                                // dataRow.set('price', parseFloat(dataRow.uom.price))
                                // dataRow.set('amount', parseFloat(dataRow.uom.price) * parseFloat(dataRow.qty))
                                if (dataRow.uom) {
                                    window.console.log(dataRow, "dataRow");
                                    amount =
                                        parseFloat(dataRow.uom.price) * parseFloat(dataRow.qty);
                                    xAmount = amount * parseFloat(this.creditMemo.txnRate);
                                    price = parseFloat(dataRow.uom.price);

                                    dataRow.set("price", price);
                                    dataRow.set("amount", amount);
                                    dataRow.set("exchangeAmount", xAmount);
                                } else {
                                    window.console.log(dataRow, "dataRow--");
                                    amount = parseFloat(dataRow.price) * parseFloat(dataRow.qty);
                                    xAmount = amount * parseFloat(this.creditMemo.txnRate);

                                    dataRow.set("price", parseFloat(dataRow.price));
                                    dataRow.set("amount", amount);
                                    dataRow.set("exchangeAmount", xAmount);
                                }
                            } catch {
                                dataRow.set("buom", {});
                                dataRow.set("conversionRate", 1);
                                dataRow.set("price", 0);
                                dataRow.set("amount", 0);
                                dataRow.set("qoh", 0);
                                dataRow.set("wac", 0);
                                dataRow.set("exchangeAmount", 0);
                            }
                        }
                        break;
                    case "qty":
                        try {
                            amount = parseFloat(dataRow.price) * parseFloat(dataRow.qty);
                            xAmount = amount * parseFloat(this.creditMemo.txnRate);

                            dataRow.set("price", parseFloat(dataRow.price));
                            dataRow.set("amount", amount);
                            dataRow.set("exchangeAmount", xAmount);
                        } catch {
                            dataRow.set("price", 0);
                            dataRow.set("amount", 0);
                            dataRow.set("exchangeAmount", 0);
                        }
                        break;
                    case "otherTax":
                        // window.console.log("--", dataRow)
                        break;
                    default:
                        break;
                }
                if (e.field) {
                    this.autoCalculate();
                    this.autoCalculateApplyTo();
                    this.autoCalculateDeposit();
                    this.autoCalculateCashRefund();
                    this.calculateAmount();
                }
            }
        },
        onAccountLineDSChanged(e) {
            if (e.field) {
                this.autoCalculateAccountLine();
            }
        },
        autoCalculate() {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                subTotal = 0,
                totalTax = 0,
                discountTotal = 0,
                otherChargeTotal = 0,
                spTax = 0,
                pltax = 0,
                otherTax = 0,
                vatTax = 0,
                taxList = [],
                discountItem = [],
                otherChargeItem = [],
                taxListDetail = [],
                otherChargeLine = [],
                saleUnit = [],
                inclusiveTax = 0,
                withholdingTaxAmount = 0,
                itemSubtotal = 0,
                txnItmSubtotal = 0,
                serviceSubtotal = 0,
                itemDiscount = 0,
                serviceDiscount = 0,
                txnDiscount = 0;
            let nature = "",
                currency = this.creditMemo.currency,
                currencyCode = this.creditMemo.currency
                    ? this.creditMemo.currency.code
                    : "";
            this.jRaw1 = [];
            // const rows = ds.data().filter(m => parseFloat(m.amount) > 0)
            // if (rows) {

            ds.data().forEach((value) => {
                let modifierPrice = 0, incTax = 0, whTaxAmount = 0, taxTypeId = 0;
                if (value.modifier) {
                    modifierPrice = kendo.parseFloat(value.modifier.price);
                }

                // subTotal += (kendo.parseFloat(value.amount) + modifierPrice)
                let discount = 0, otherCharge = 0
                const otherChargeField = value.otherChargeItem || {};
                const otherChargeFieldAcc = otherChargeField.account || {};
                const otherChargeFieldAccId = otherChargeFieldAcc.uuid || ''
                if (value.otherChargeItem) {
                    const subTotal = kendo.parseFloat(value.price) * kendo.parseFloat(value.qty);
                    otherCharge = this.autoCalculateDiscount(otherChargeField, subTotal)
                    value["otherChargeAmount"] = otherCharge;
                    value["otherChargeExchangeAmount"] = otherCharge * kendo.parseFloat(this.creditMemo.txnRate);
                    if (value.otherChargeItem.hasOwnProperty("id")) {
                        otherChargeItem.push(value.otherChargeItem);
                        otherChargeLine.push({
                            id: value.otherChargeItem.id,
                            name: value.otherChargeItem.name,
                            amount: otherCharge,
                            exchangeAmount: otherCharge * parseFloat(this.creditMemo.txnRate),
                        });
                    }
                    otherChargeTotal += (otherCharge || 0);
                    if (otherCharge * -1 > 0) {
                        nature = "dr";
                    } else {
                        nature = "cr";
                    }
                    if (otherChargeFieldAcc) {
                        if (otherChargeFieldAccId !== '') {
                            this.jRaw.push({
                                id: otherChargeFieldAccId + "-" + nature,
                                description: "Other Charge",
                                account: otherChargeFieldAcc,
                                accountId: otherChargeFieldAccId,
                                amount: otherCharge * -1,
                                exchangeAmount: otherCharge * -1 * kendo.parseFloat(this.creditMemo.txnRate),
                                type: nature,
                                typeAs: "otherCharge",
                            });
                        }
                    }
                }
                if (value.discountItem) {
                    const disItemField = value.discountItem;
                    let subTo =
                        kendo.parseFloat(value.price) * kendo.parseFloat(value.qty);
                    discount = this.autoCalculateDiscount(value.discountItem, subTo);
                    value["discountAmount"] = discount;
                    value["discountExchangeAmount"] =
                        discount * kendo.parseFloat(this.creditMemo.txnRate);
                    if (value.discountItem.hasOwnProperty("id")) {
                        discountItem.push(value.discountItem);
                    }
                    discountTotal += discount ? discount : 0;
                    if (discount * -1 > 0) {
                        nature = "dr";
                    } else {
                        nature = "cr";
                    }
                    if (disItemField.account) {
                        if (disItemField.account.hasOwnProperty("id")) {
                            this.jRaw1.push({
                                id: disItemField.account.id + "-" + nature,
                                line: new ItemLineModel(value),
                                currencyCode: currencyCode,
                                currency: currency,
                                memoRate: kendo.parseFloat(this.creditMemo.txnRate),
                                lastXRate: this.creditMemo.exchangeRate,
                                description: "Discount",
                                account: disItemField.account,
                                accountId: disItemField.account.id,
                                amount: discount * -1,
                                exchangeAmount:
                                    discount * kendo.parseFloat(this.creditMemo.txnRate) * -1,
                                type: nature,
                                typeAs: "discount",
                            });
                        }
                    }
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
                    const tax = value.specificTax;
                    const baseAmount = tax.baseAmount;
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === "inclusive") {
                            inclusiveTax += spTax;
                        }
                    }
                    if (value.specificTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.specificTax.taxType.name,
                            amount: spTax,
                            id: value.specificTax.taxType.id,
                        });
                        const tax_ = value.specificTax || {}
                        tax_['taxAmount_'] = spTax
                        tax_['amount'] = value.amount || 0
                        tax_['discount'] = discount || 0
                        tax_['txnRate'] = this.creditMemo.txnRate || 1
                        taxListDetail.push(tax_);
                    }
                    if (spTax > 0) {
                        nature = "dr";
                    } else {
                        nature = "cr";
                    }
                    const specificTaxField = value.specificTax;
                    if (specificTaxField.account) {
                        if (specificTaxField.account.hasOwnProperty("id")) {
                            this.jRaw1.push({
                                id: specificTaxField.account.id + "-" + nature,
                                line: new ItemLineModel(value),
                                memoRate: kendo.parseFloat(this.creditMemo.txnRate),
                                lastXRate: this.creditMemo.exchangeRate,
                                currencyCode: currencyCode,
                                currency: currency,
                                description: "Tax",
                                account: specificTaxField.account,
                                accountId: specificTaxField.account.id,
                                amount: spTax,
                                exchangeAmount:
                                    spTax * kendo.parseFloat(this.creditMemo.txnRate),
                                type: nature,
                                typeAs: "tax",
                            });
                        }
                    }
                }
                if (value.publicLightingTax) {
                    pltax = this.autoCalculateTax(
                        value.publicLightingTax,
                        kendo.parseFloat(value.amount) - kendo.parseFloat(discount)
                    );
                    pltax = kendo.parseFloat(pltax) ? kendo.parseFloat(pltax) : 0;
                    const tax = value.publicLightingTax;
                    const baseAmount = tax.baseAmount;
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === "inclusive") {
                            inclusiveTax += pltax;
                        }
                    }
                    if (value.publicLightingTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.publicLightingTax.taxType.name,
                            amount: pltax,
                            id: value.publicLightingTax.taxType.id,
                        });
                        const tax_ = value.publicLightingTax || {}
                        tax_['taxAmount_'] = pltax
                        tax_['amount'] = value.amount || 0
                        tax_['discount'] = discount || 0
                        tax_['txnRate'] = this.creditMemo.txnRate || 1
                        taxListDetail.push(tax_);
                    }
                    if (pltax > 0) {
                        nature = "dr";
                    } else {
                        nature = "cr";
                    }
                    const PLTaxField = value.publicLightingTax;
                    if (PLTaxField.account) {
                        if (PLTaxField.account.hasOwnProperty("id")) {
                            this.jRaw1.push({
                                id: PLTaxField.account.id + "-" + nature,
                                line: new ItemLineModel(value),
                                memoRate: kendo.parseFloat(this.creditMemo.txnRate),
                                lastXRate: this.creditMemo.exchangeRate,
                                currencyCode: currencyCode,
                                currency: currency,
                                description: "Tax",
                                account: PLTaxField.account,
                                accountId: PLTaxField.account.id,
                                amount: pltax,
                                exchangeAmount:
                                    pltax * kendo.parseFloat(this.creditMemo.txnRate),
                                type: nature,
                                typeAs: "tax",
                            });
                        }
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
                    const tax = value.otherTax;
                    const baseAmount = tax.baseAmount;
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === "inclusive") {
                            inclusiveTax += otherTax;
                        }
                    }
                    if (value.otherTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.otherTax.taxType.name,
                            amount: otherTax,
                            id: value.otherTax.taxType.id,
                        });
                        const tax_ = value.otherTax || {}
                        tax_['taxAmount_'] = otherTax
                        tax_['amount'] = value.amount || 0
                        tax_['discount'] = discount || 0
                        tax_['txnRate'] = this.creditMemo.txnRate || 1
                        taxListDetail.push(tax_);
                    }
                    if (otherTax > 0) {
                        nature = "dr";
                    } else {
                        nature = "cr";
                    }
                    const otherTaxField = value.otherTax;
                    if (otherTaxField.account) {
                        if (otherTaxField.account.hasOwnProperty("id")) {
                            this.jRaw1.push({
                                id: otherTaxField.account.id + "-" + nature,
                                line: new ItemLineModel(value),
                                memoRate: kendo.parseFloat(this.creditMemo.txnRate),
                                lastXRate: this.creditMemo.exchangeRate,
                                currencyCode: currencyCode,
                                currency: currency,
                                description: "Tax",
                                account: otherTaxField.account,
                                accountId: otherTaxField.account.id,
                                amount: otherTax,
                                exchangeAmount:
                                    otherTax * kendo.parseFloat(this.creditMemo.txnRate),
                                type: nature,
                                typeAs: "tax",
                            });
                        }
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
                    value["vatTaxAmount"] = vatTax;
                    value["vatTaxExchangeAmount"] =
                        vatTax * kendo.parseFloat(this.creditMemo.txnRate);
                    const tax = value.vatTax;
                    const baseAmount = tax.baseAmount;
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === "inclusive") {
                            inclusiveTax += vatTax;
                            incTax = spTax;
                        }
                    }
                    if (value.vatTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.vatTax.taxType.name,
                            amount: vatTax,
                            id: value.vatTax.taxType.id,
                        });
                        const vatTax_ = value.vatTax || {}
                        vatTax_['taxAmount_'] = vatTax
                        vatTax_['amount'] = value.amount || 0
                        vatTax_['discount'] = discount || 0
                        vatTax_['txnRate'] = this.creditMemo.txnRate || 1
                        vatTax_['isVat'] = 1
                        vatTax_.detail = {
                            specificTax: {},
                            publicLightingTax: {},
                            otherTax: {},
                        }
                        taxListDetail.push(vatTax_);
                    }
                    if (value.vatTax.hasOwnProperty("taxType")) {
                        const taxType = value.vatTax.taxType || {};
                        taxTypeId = taxType.typeId || 0;
                    }
                    let taxAmount = vatTax;
                    if (taxTypeId === 2) {
                        withholdingTaxAmount += vatTax;
                        whTaxAmount = vatTax;
                    }
                    if (taxAmount > 0) {
                        nature = "dr";
                    } else {
                        nature = "cr";
                    }
                    if (vatTax > 0) {
                        nature = "dr";
                    } else {
                        nature = "cr";
                    }
                    const vatTaxField = value.vatTax;
                    if (vatTaxField.account) {
                        if (vatTaxField.account.hasOwnProperty("id")) {
                            this.jRaw1.push({
                                id: vatTaxField.account.id + "-" + nature,
                                line: new ItemLineModel(value),
                                memoRate: kendo.parseFloat(this.creditMemo.txnRate),
                                lastXRate: this.creditMemo.exchangeRate,
                                currencyCode: currencyCode,
                                currency: currency,
                                description: "Tax",
                                account: vatTaxField.account,
                                accountId: vatTaxField.account.id,
                                amount: vatTax,
                                exchangeAmount:
                                    vatTax * kendo.parseFloat(this.creditMemo.txnRate),
                                type: nature,
                                typeAs: "tax",
                            });
                        }
                    }
                }
                totalTax +=
                    kendo.parseFloat(spTax ? spTax : 0) +
                    kendo.parseFloat(pltax ? pltax : 0) +
                    kendo.parseFloat(otherTax ? otherTax : 0) +
                    kendo.parseFloat(vatTax ? vatTax : 0);
                subTotal +=
                    kendo.parseFloat(value.amount) + modifierPrice - incTax;
                const amt =
                    kendo.parseFloat(value.amount) + modifierPrice - incTax + whTaxAmount;
                const xAmount =
                    kendo.parseFloat(amt) * kendo.parseFloat(this.creditMemo.txnRate);
                const item = value.item;
                const itmType = item.type || "";
                if (itmType === "Variant") {
                    itemSubtotal +=
                        kendo.parseFloat(value.cost) * kendo.parseFloat(value.qty);
                    itemDiscount += kendo.parseFloat(discount);
                } else if (itmType === "Service") {
                    serviceSubtotal +=
                        kendo.parseFloat(value.cost) * kendo.parseFloat(value.qty);
                    itemDiscount += kendo.parseFloat(discount);
                } else {
                    txnItmSubtotal +=
                        kendo.parseFloat(value.cost) * kendo.parseFloat(value.qty);
                    itemDiscount += kendo.parseFloat(discount);
                }
                const wac = parseFloat(value.wac || 0)
                const qty = parseFloat(value.qty || 1)
                if (amt > 0) {
                    nature = "dr";
                } else {
                    nature = "cr";
                }
                if (item) {
                    if (item.type === "Service") {
                        let incomeAcc = item.incomeAcc;
                        if (item.hasOwnProperty("incomeAcc")) {
                            if (item.incomeAcc.hasOwnProperty("id")) {
                                this.jRaw1.push({
                                    id: incomeAcc.id + "-" + nature,
                                    line: new ItemLineModel(value),
                                    memoRate: kendo.parseFloat(this.creditMemo.txnRate),
                                    lastXRate: this.creditMemo.exchangeRate,
                                    currencyCode: currencyCode,
                                    currency: currency,
                                    description: this.creditMemo.journalNote,
                                    account: incomeAcc,
                                    accountId: incomeAcc.id,
                                    amount: amt,
                                    exchangeAmount: xAmount,
                                    type: nature,
                                    typeAs: "item",
                                });
                            }
                        }
                        if (item.hasOwnProperty("deferredIncomeAcc")) {
                            if (item.deferredIncomeAcc.hasOwnProperty("id")) {
                                let deferredInAcc = item.deferredIncomeAcc;
                                this.jRaw1.push({
                                    id: deferredInAcc.id + "-" + nature,
                                    line: new ItemLineModel(value),
                                    memoRate: kendo.parseFloat(this.creditMemo.txnRate),
                                    lastXRate: this.creditMemo.exchangeRate,
                                    currencyCode: currencyCode,
                                    currency: currency,
                                    description: this.creditMemo.journalNote,
                                    account: deferredInAcc,
                                    accountId: deferredInAcc.id,
                                    amount: amt,
                                    exchangeAmount: xAmount,
                                    type: nature,
                                    typeAs: "item",
                                });
                            }
                        }
                    } else if (item.type === "Variant") {
                        if (item.hasOwnProperty("incomeAcc")) {
                            if (item.incomeAcc.hasOwnProperty("id")) {
                                let incomeAcc = item.incomeAcc;
                                this.jRaw1.push({
                                    id: incomeAcc.id + "-" + nature,
                                    line: new ItemLineModel(value),
                                    memoRate: kendo.parseFloat(this.creditMemo.txnRate),
                                    lastXRate: this.creditMemo.exchangeRate,
                                    currencyCode: currencyCode,
                                    currency: currency,
                                    description: this.creditMemo.journalNote,
                                    account: item.incomeAcc,
                                    accountId: item.incomeAcc.id,
                                    amount: amt,
                                    exchangeAmount: xAmount,
                                    type: nature,
                                    typeAs: "item",
                                });
                            }
                        }
                        if (item.hasOwnProperty("inventoryAcc")) {
                            nature = "cr";
                            if (item.inventoryAcc.hasOwnProperty("id")) {
                                let inventoryAcc = item.inventoryAcc;
                                this.jRaw1.push({
                                    id: inventoryAcc.id + "-" + nature,
                                    line: new ItemLineModel(value),
                                    memoRate: kendo.parseFloat(this.creditMemo.txnRate),
                                    lastXRate: this.creditMemo.exchangeRate,
                                    currencyCode: currencyCode,
                                    currency: currency,
                                    description: this.creditMemo.journalNote,
                                    account: item.inventoryAcc,
                                    accountId: item.inventoryAcc.id,
                                    amount: (qty * wac) * -1,
                                    exchangeAmount: (qty * wac) * -1, //xAmount,
                                    type: nature,
                                    typeAs: "item",
                                });
                            }
                        }
                        if (item.hasOwnProperty("costOfGoodsSoldAcc")) {
                            nature = "dr";
                            if (item.costOfGoodsSoldAcc.hasOwnProperty("id")) {
                                let costOfGoodsSoldAcc = item.costOfGoodsSoldAcc;
                                this.jRaw1.push({
                                    id: costOfGoodsSoldAcc.id + "-" + nature,
                                    line: new ItemLineModel(value),
                                    memoRate: kendo.parseFloat(this.creditMemo.txnRate),
                                    lastXRate: this.creditMemo.exchangeRate,
                                    currencyCode: currencyCode,
                                    currency: currency,
                                    description: this.creditMemo.journalNote,
                                    account: item.costOfGoodsSoldAcc,
                                    accountId: item.costOfGoodsSoldAcc.id,
                                    amount: qty * wac, // qty*avg_cost ,
                                    exchangeAmount: qty * wac, //xAmount,
                                    type: nature,
                                    typeAs: "item",
                                });
                            }
                        }
                    } else if (item.type === "Fixed Asset") {
                        if (item.hasOwnProperty("assetAcc")) {
                            if (item.assetAcc.hasOwnProperty("id")) {
                                let assetAcc = item.assetAcc;
                                this.jRaw1.push({
                                    id: assetAcc.id + "-" + nature,
                                    line: new ItemLineModel(value),
                                    memoRate: kendo.parseFloat(this.creditMemo.txnRate),
                                    lastXRate: this.creditMemo.exchangeRate,
                                    currencyCode: currencyCode,
                                    currency: currency,
                                    description: this.creditMemo.journalNote,
                                    account: item.assetAcc,
                                    accountId: item.assetAcc.id,
                                    amount: amt,
                                    exchangeAmount: xAmount,
                                    type: nature,
                                    typeAs: "item",
                                });
                            }
                        }
                    } else if (item.type === "Transaction Item") {
                        if (item.hasOwnProperty("account")) {
                            if (item.account.hasOwnProperty("id")) {
                                this.jRaw1.push({
                                    id: item.account.id + "-" + nature,
                                    line: new ItemLineModel(value),
                                    memoRate: kendo.parseFloat(this.creditMemo.txnRate),
                                    lastXRate: this.creditMemo.exchangeRate,
                                    currencyCode: currencyCode,
                                    currency: currency,
                                    description: this.creditMemo.journalNote,
                                    account: item.account,
                                    accountId: item.account.id,
                                    amount: amt,
                                    exchangeAmount: xAmount,
                                    type: nature,
                                    typeAs: "item",
                                });
                            }
                        }
                    }
                }
                //include Tax Amount
                const amountNodiscount = kendo.parseFloat(value.price) * kendo.parseFloat(value.qty) - discount;
                const includeTaxAmount = amountNodiscount + vatTax + pltax + spTax + otherTax;
                value["includeTaxAmount"] = includeTaxAmount;
                value["includeTaxExchangeAmount"] = includeTaxAmount * kendo.parseFloat(this.creditMemo.txnRate);
            });
            // }

            this.creditMemo.itemSubtotal = itemSubtotal;
            this.creditMemo.inclusiveTaxAmount = inclusiveTax;
            this.creditMemo.exchangeItemSubtotal =
                itemSubtotal * kendo.parseFloat(this.creditMemo.txnRate);
            this.creditMemo.serviceSubtotal = serviceSubtotal;
            this.creditMemo.exchangeServiceSubtotal =
                serviceSubtotal * kendo.parseFloat(this.creditMemo.txnRate);
            this.creditMemo.txnItmSubtotal = txnItmSubtotal;
            this.creditMemo.exchangeTxnItmSubtotal =
                txnItmSubtotal * kendo.parseFloat(this.creditMemo.txnRate);
            this.creditMemo.itemDiscount = itemDiscount;
            this.creditMemo.exchangeItemDiscount =
                itemDiscount * kendo.parseFloat(this.creditMemo.txnRate);
            this.creditMemo.serviceDiscount = serviceDiscount;
            this.creditMemo.exchangeServiceDiscount =
                serviceDiscount * kendo.parseFloat(this.creditMemo.txnRate);
            this.creditMemo.txnItmDiscount = txnDiscount;
            this.creditMemo.exchangeTxnItmDiscount =
                txnDiscount * kendo.parseFloat(this.creditMemo.txnRate);

            // window.console.log(spTax, pltax, otherTax, vatTax)
            let total =
                kendo.parseFloat(subTotal) -
                kendo.parseFloat(discountTotal) +
                kendo.parseFloat(totalTax)
            this.creditMemo.withholdingTaxAmount = withholdingTaxAmount
            this.creditMemo.itemLineSubTotal = subTotal;
            this.creditMemo.itemLineTaxAmount = kendo.parseFloat(totalTax);
            this.creditMemo.itemLineDiscountAmount = kendo.parseFloat(discountTotal);
            this.creditMemo.otherChargeTotal = kendo.parseFloat(otherChargeTotal);
            this.creditMemo.itemLineAmount = kendo.parseFloat(total) - parseFloat(withholdingTaxAmount) + kendo.parseFloat(otherChargeTotal);
            // this.autoCalculateTaxByType(taxList)
            this.customerDiscountItem = this.removeDuplicate(discountItem);
            this.customerSaleUnit = this.removeDuplicate(saleUnit);
            this.taxListDetail = taxListDetail
            this.creditMemo.itemLineExchangeAmount =
                kendo.parseFloat(this.creditMemo.itemLineAmount) *
                kendo.parseFloat(this.creditMemo.txnRate);
            this.shrinkDiscountItem(discountItem);

            const uniqueOtherCharge = this.removeDuplicate(otherChargeItem);
            this.shrinkOtherChargeItem(uniqueOtherCharge, otherChargeLine);

            this.autoCalculateTaxDetail();
            // this.creditMemo.amount = kendo.parseFloat(this.creditMemo.itemLineAmount)
            // this.creditMemo.variance = kendo.parseFloat(this.creditMemo.itemLineAmount)
            // this.calculateAmount()
        },
        shrinkDiscountItem(discountItem) {
            let uniqueDiscountItems = [];
            const unique = this.removeDuplicate(discountItem);
            unique.forEach((m) => {
                const found = discountItem.filter((n) => n.id === m.id);
                let amount = 0,
                    exchangeAmount = 0;
                found.map((o) => {
                    amount += o.amount || 0;
                });
                found.map((o) => {
                    exchangeAmount += o.exchangeAmount || 0;
                });
                uniqueDiscountItems.push({
                    id: m.id,
                    name: m.name,
                    amount: amount,
                    exchangeAmount: exchangeAmount,
                });
            });
            this.customerDiscountItem = uniqueDiscountItems;
            this.creditMemo.customerDiscountItem = uniqueDiscountItems;
            window.console.log(uniqueDiscountItems, "uniqueDiscountItems");
        },
        autoCalculateApplyTo() {
            let ds = this.$refs.applyToLineDS.kendoWidget(),
                convertedAmount = 0,
                amount = 0;
            this.jRaw5 = [];
            let txnRate = 1,
                currency = this.creditMemo.currency,
                currencyCode = this.creditMemo.currency
                    ? this.creditMemo.currency.code
                    : "";
            ds.data().forEach((value) => {
                const offsetAmount = kendo.parseFloat(
                    value.paidAmount ? value.paidAmount : 0
                );
                if (offsetAmount > 0) {
                    amount += kendo.parseFloat(value.paidAmount);
                    convertedAmount +=
                        kendo.parseFloat(value.paidAmount) *
                        kendo.parseFloat(value.txnRate);
                    txnRate = kendo.parseFloat(value.txnRate);
                }
            });
            this.creditMemo.applyToExchangeAmount = convertedAmount;
            this.creditMemo.applyToAmount = amount;
            //todo: AR
            const receivableAcc = this.customer.receivableAcc || {};
            let nature = "";
            if (this.creditMemo.itemLineAmount * -1 > 0) {
                nature = "dr";
            } else {
                nature = "cr";
            }
            if (receivableAcc) {
                if (receivableAcc.hasOwnProperty("id")) {
                    this.jRaw5.push({
                        id: receivableAcc.id + "-" + nature,
                        line: new ItemLineModel(),
                        memoRate: txnRate,
                        lastXRate: this.creditMemo.exchangeRate,
                        currencyCode: currencyCode,
                        currency: currency,
                        description: this.creditMemo.transactionNote,
                        account: receivableAcc,
                        accountId: receivableAcc.id,
                        exchangeAmount: this.creditMemo.applyToExchangeAmount * -1,
                        amount: this.creditMemo.applyToAmount * -1,
                        type: nature,
                        typeAs: "ar",
                    });
                }
            }
            // this.calculateAmount()
        },
        calculateAmount() {
            let offsetXAmount = 0,
                offsetAmount = 0; // applyto_amount + deposit + cash refund
            const applyToExchangeAmount = kendo.parseFloat(
                this.creditMemo.applyToExchangeAmount
            );
            const exchangeDepositAmount = kendo.parseFloat(
                this.creditMemo.exchangeDepositDeduction
            );
            const exchangeRefundAmount = kendo.parseFloat(
                this.creditMemo.exchangeRefundAmount
            );

            const applyToAmount = kendo.parseFloat(this.creditMemo.applyToAmount);
            const depositAmount = kendo.parseFloat(this.creditMemo.depositAmount);
            const refundAmount = kendo.parseFloat(this.creditMemo.refundAmount);

            const itemLineExchange = kendo.parseFloat(this.creditMemo.itemLineExchangeAmount);
            const itemLineAmount = kendo.parseFloat(this.creditMemo.itemLineAmount)

            offsetXAmount = kendo.parseFloat(applyToExchangeAmount + exchangeDepositAmount + exchangeRefundAmount);
            offsetAmount = kendo.parseFloat(applyToAmount + depositAmount + refundAmount);

            this.creditMemo.amount = offsetAmount;
            this.creditMemo.exchangeAmount = offsetXAmount;
            this.creditMemo.exchangeVariance = itemLineExchange - offsetXAmount;
            this.creditMemo.variance = itemLineAmount - offsetAmount;
            window.console.log("variance", this.creditMemo.variance, 'exchangeVariance', this.creditMemo.exchangeVariance);
            // if (offsetAmount > itemLineAmount) {
            //   this.showWaringMessage('Credit Memo', 'Return amount and Offset amount must be equal!', 'OK')
            //   // return
            // }

            this.jRaw4 = [];
            let currency = this.creditMemo.currency,
                currencyCode = this.creditMemo.currency
                    ? this.creditMemo.currency.code
                    : "";
            // window.console.log(offsetAmount, 'offsetAmount')
            if (this.creditMemo.exchangeVariance !== 0) {
                this.jRaw4 = [];
                let nature = "";
                if (this.creditMemo.varianceAcc) {
                    if (this.creditMemo.exchangeVariance * -1 > 0) {
                        nature = "dr";
                    } else {
                        nature = "cr";
                    }
                    const varianceAcc = this.creditMemo.varianceAcc;
                    if (varianceAcc.hasOwnProperty("id")) {
                        this.jRaw4.push({
                            id: varianceAcc.id + "-" + nature,
                            line: new ItemLineModel(),
                            memoRate: this.creditMemo.txnRate,
                            lastXRate: this.creditMemo.exchangeRate,
                            currencyCode: currencyCode,
                            currency: currency,
                            description: "Variance",
                            account: varianceAcc,
                            accountId: varianceAcc.id,
                            amount: this.creditMemo.variance * -1,
                            exchangeAmount: this.creditMemo.exchangeVariance * -1,
                            type: nature,
                            typeAs: "GainLoss",
                        });
                    }
                }
            }
            this.shrinkData();
            return offsetAmount;
        },
        autoCalculateDeposit() {
            let ds = this.$refs.depositLineDS.kendoWidget(),
                amount = 0,
                convertedAmount = 0;
            let nature = "";
            this.jRaw2 = [];
            let currency = this.creditMemo.currency,
                currencyCode = this.creditMemo.currency
                    ? this.creditMemo.currency.code
                    : "";
            ds.data().forEach((value) => {
                let description = "";
                if (value.amount) {
                    amount += kendo.parseFloat(value.amount);
                    convertedAmount +=
                        kendo.parseFloat(value.amount) *
                        kendo.parseFloat(this.creditMemo.txnRate);
                }
                if (value.description) {
                    description = value.description || "";
                }
                if (value.account) {
                    const account = value.account;
                    if (account) {
                        if (account.hasOwnProperty("id")) {
                            if (amount * -1 > 0) {
                                nature = "dr";
                            } else {
                                nature = "cr";
                            }
                            this.jRaw2.push({
                                id: account.id + "-" + nature,
                                description: "Deposit " + description,
                                line: new ItemLineModel(),
                                memoRate: this.creditMemo.txnRate,
                                lastXRate: this.creditMemo.exchangeRate,
                                currencyCode: currencyCode,
                                currency: currency,
                                account: account,
                                accountId: account.id,
                                amount: amount * -1,
                                exchangeAmount:
                                    amount * kendo.parseFloat(this.creditMemo.txnRate) * -1,
                                type: nature,
                                typeAs: "deposit",
                            });
                        }
                    }
                }
            });

            this.creditMemo.depositAmount = amount;
            this.creditMemo.exchangeDepositDeduction = convertedAmount;
            // this.calculateAmount()
        },
        checkAmount(amountReturn, offsetAmount) {
            return offsetAmount > amountReturn;
        },
        autoCalculateCashRefund() {
            let ds = this.$refs.cashRefundDS.kendoWidget(),
                amount = 0,
                exchangeAmount = 0;
            let nature = "";
            this.jRaw3 = [];
            let currency = this.creditMemo.currency,
                currencyCode = this.creditMemo.currency
                    ? this.creditMemo.currency.code
                    : "";
            ds.data().forEach((value) => {
                let description = "";
                if (value.amount) {
                    amount += kendo.parseFloat(value.amount);
                    exchangeAmount +=
                        kendo.parseFloat(value.amount) *
                        kendo.parseFloat(this.creditMemo.txnRate);
                }
                if (value.description) {
                    description = value.description || "";
                }
                //todo: Cash Account
                if (value.account) {
                    const account = value.account;
                    if (account) {
                        if (account.hasOwnProperty("id")) {
                            if (amount * -1 > 0) {
                                nature = "dr";
                            } else {
                                nature = "cr";
                            }
                            this.jRaw3.push({
                                id: account.id + "-" + nature,
                                description: "Deposit " + description,
                                line: new ItemLineModel(),
                                memoRate: this.creditMemo.txnRate,
                                lastXRate: this.creditMemo.exchangeRate,
                                currencyCode: currencyCode,
                                currency: currency,
                                account: account,
                                accountId: account.id,
                                exchangeAmount:
                                    kendo.parseFloat(this.creditMemo.txnRate) * amount * -1,
                                amount: amount * -1,
                                type: nature,
                                typeAs: "CashAccount",
                            });
                        }
                    }
                }
            });
            this.creditMemo.refundAmount = amount;
            this.creditMemo.exchangeRefundAmount = exchangeAmount;
            // this.calculateAmount()
        },
        autoCalculateAccountLine() {
            let ds = this.$refs.accountLineDS.kendoWidget(),
                subTotal = 0,
                totalTax = 0,
                discountTotal = 0,
                vatTax = 0,
                taxList = [],
                discountItem = [];

            ds.data().forEach((value) => {
                if (value.amount) {
                    subTotal += kendo.parseFloat(value.amount);
                }

                let discount = 0;
                if (value.discountItem) {
                    let subTo = kendo.parseFloat(value.amount ? value.amount : 0);
                    discount = this.autoCalculateDiscount(value.discountItem, subTo);
                    if (value.discountItem.hasOwnProperty("id")) {
                        discountItem.push(value.discountItem);
                    }
                    discountTotal += discount ? discount : 0;
                }
                if (value.vatTax) {
                    let amt =
                        kendo.parseFloat(value.amount ? value.amount : 0) -
                        (discount ? discount : 0);
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
                totalTax += kendo.parseFloat(vatTax ? vatTax : 0);
            });
            const amount = this.creditMemo.itemLineAmount;
            const taxAmount = this.creditMemo.itemLineTaxAmount;
            const discount = this.creditMemo.itemLineDiscountAmount;
            // const subTotal = this.creditMemo.itemLineSubTotal

            this.creditMemo.accountLineAmount =
                kendo.parseFloat(subTotal) -
                kendo.parseFloat(discountTotal) +
                kendo.parseFloat(totalTax);
            this.creditMemo.accountLineTaxAmount = kendo.parseFloat(totalTax);
            this.creditMemo.accountLineDiscountAmount = kendo.parseFloat(
                discountTotal
            );

            this.creditMemo.amount =
                kendo.parseFloat(amount) +
                kendo.parseFloat(this.creditMemo.accountLineAmount);
            this.creditMemo.taxAmount =
                kendo.parseFloat(taxAmount) +
                kendo.parseFloat(this.creditMemo.accountLineTaxAmount);
            this.creditMemo.discount =
                kendo.parseFloat(discount) +
                kendo.parseFloat(this.creditMemo.accountLineDiscountAmount);
            // this.autoCalculateTaxByType(taxList)
            // window.console.log(this.creditMemo.accountLineAmount, this.creditMemo.accountLineTaxAmount, this.creditMemo.accountLineDiscountAmount, '--')
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
        },
        async loadEmployeeCenter() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.employees = [];
                    employeeHandler
                        .center(undefined)
                        .then((res) => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.employees = res.data.data;
                                if (this.employees.length > 0) {
                                    this.creditMemo.employee = this.employees[0];
                                }
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 50);
            });
        },
        async loadPrefix() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    prefixHandler.get("sale return").then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.transactionType = res.data.data;
                            if (this.transactionType.length > 0) {
                                this.creditMemo.transactionType = this.transactionType[0];
                                if (this.$route.params.id === undefined) {
                                    this.generateNumber();
                                }
                            }
                        }
                    });
                }, 50);
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
                }, 50);
            });
        },
        onFilterChange(event) {
            const filter = event.filter.value;
            this.requestData(0, filter, this.cusBaseUrl);
            this.filter = filter;
        },
        requestData(skip, filter, baseUrl) {
            const url = baseUrl + `?filter=${filter}`;
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then(this.afterFetch);
        },
        afterFetch(json) {
            this.customerList = json.data;
        },
        onChange(event) {
            const value = event.value;
            if (value && value["numberName"] === emptyItem["numberName"]) {
                return;
            }
            this.isLoading = 0
            if (value) {
                this.customer = value;
                const saleDepositAcc = value.hasOwnProperty("saleDepositAcc")
                    ? value.saleDepositAcc
                    : {};
                this.creditMemo.customer = value;
                this.creditMemo.priceLevel = value.hasOwnProperty("priceLevel")
                    ? value.priceLevel
                    : {};
                this.decimalFormat = value.decimalFormat;
                if (value.baseCurrency) {
                    this.baseCurrencyCode = value.baseCurrency.hasOwnProperty("code")
                        ? value.baseCurrency.code
                        : "";
                    this.accDeposit = this.accDeposits.filter(
                        (o) => o.id === saleDepositAcc.id
                    );
                }

                this.loadTransactionRate();
                this.loadProjectByCustomer();
                // this.searchInvoice();
            }
        },
        hideSmallSidebar() {
            this.isHideBar = !this.isHideBar;
        },
        generateNumber() {
            if (this.$route.params.id) {
                const tranDate = new Date(this.transactionDate);
                const tranDateInvoice = new Date(this.creditMemo.transactionDate);
                const tranDateM = tranDate.getFullYear() + tranDate.getMonth();
                const tranDateInvoiceM =
                    tranDateInvoice.getFullYear() + tranDateInvoice.getMonth();
                if (tranDateM === tranDateInvoiceM) {
                    this.creditMemo.referenceNo = this.referenceNo;
                    return;
                }
            }

            if (this.transactionDate !== "" && this.transactionType.length > 0) {
                let data = {
                    abbr: this.creditMemo.transactionType.abbr,
                    structure: this.creditMemo.transactionType.structure,
                    transactionDate: this.transactionDate,
                    prefixSeparator: this.creditMemo.transactionType.prefixSeparator || '',
                    numberSeparator: this.creditMemo.transactionType.numberSeparator || '',
                    format: this.creditMemo.transactionType.format || 5,
                    sequcencing: this.creditMemo.transactionType.sequcencing,
                    type: "Credit Memo",
                    entity: 1,
                };
                billingHandler
                    .lastNumber(data)
                    .then((response) => {
                        if (response.data.statusCode === 200) {
                            const res = response.data.data;
                            const lastNumber = this.zeroPad(
                                parseInt(res.lastNumber),
                                this.creditMemo.transactionType.format
                            );
                            const number =
                                res.suffix +
                                this.creditMemo.transactionType.numberSeparator +
                                lastNumber;
                            this.creditMemo.number = number;
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
        suffix(transactionDate) {
            return kendo.toString(new Date(transactionDate), `yymm`);
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
            }).then((resultCan) => {
                if (resultCan.value) {
                    this.clear();
                    this.$router.go(-1);
                }
            });
        },
        removeRow(e) {
            e.preventDefault();
            const grid = kendo.jQuery("#gridItemLine").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
                this.autoCalculate();
            }
        },
        removeRowAcc(e) {
            e.preventDefault();
            const grid = $("#").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        vatTemplate(dataItem) {
            const vat = dataItem.vatTax;
            if (vat) {
                return `<span>${vat.defaultTax ? vat.defaultTax : ``}</span>`;
            } else {
                return ``;
            }
        },
        accountTemplate(dataItem) {
            const account = dataItem.account;
            if (account) {
                return `<span>${account.name ? account.name : ``}</span>`;
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
            const code = uom.code || ''
            if (uom) {
                return `<span>${uom.uom ? code : ``}</span>`;
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
        empImpl(dataItem) {
            let empIds = [];
            dataItem.employee.forEach((m) => {
                empIds.push(m.firstName + " - " + m.lastName);
            });
            // window.console.log(empIds.join(', '))
            return `<span>${empIds.join(", ")}</span>`;
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
                                url: productVariantHandler.itemSearchURL('?reUsed=2'),
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
        OtherChargeDropDownEditor(container, options) {
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
                    template: "<span>#=name#</span>",
                    optionLabel: "--Select--",
                    dataSource: new kendo.data.DataSource({
                        data: this.otherChargeList,
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
                    dataTextField: "code",
                    dataValueField: "uomConvertId",
                    cascadeFrom: "item",
                    template: "<span>#=code || `No Price Level`#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                // url: uomPriceHandler.getURL(options.model.item.id, this.creditMemo.priceLevel.id, options.model.item.type),
                                url: uomPriceHandler.uomPriceByPriceLevelURL(
                                    "id=" +
                                    options.model.item.id +
                                    "&plId=" +
                                    this.creditMemo.priceLevel.id +
                                    "&date=" +
                                    this.transactionDate
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
                                url: discountItemHandler.getURL(DISCOUNT_TYPE),
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
        AccountDropDownEditor(container, options) {
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
                    template: "<span>#=number# - #=name# </span>",
                    optionLabel: "--Select--",
                    dataSource: new kendo.data.DataSource({
                        data: this.accounts,
                    }),
                });
        },
        AccountDropDownEditorRefund(container, options) {
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
                    template: "<span>#=number# - #=name# </span>",
                    optionLabel: "--Select--",
                    dataSource: new kendo.data.DataSource({
                        data: this.accCash,
                    }),
                });
        },
        AccountDropDownEditorDeposit(container, options) {
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
                    template: "<span>#=number# - #=name# </span>",
                    optionLabel: "--Select--",
                    dataSource: new kendo.data.DataSource({
                        data: this.accDeposit,
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
        AmountEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 30,
                    format: `${this.decimalFormat}`,
                });
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        rowNumberTmplAcc(dataItem) {
            let ds = this.$refs.accountLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        rowNumberTmplDeposit(dataItem) {
            let ds = this.$refs.depositLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        rowNumberTmplApply(dataItem) {
            let ds = this.$refs.applyToLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        addRowOffsetInvoice() {
            let ds = this.$refs.applyToLineDS.kendoWidget(),
                total = ds.total();
            ds.insert(total, this.applyToLine);
        },
        addRow() {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                total = ds.total();
            this.itemLine.id = itemLinePrefix + uuid.v1();
            this.itemLine.decimalFormat = this.decimalFormat;
            ds.insert(total, this.itemLine);
            // this.itemLines.push(this.itemLine)
            // window.console.log('item Line', this.itemLine)
        },
        addRowAcc() {
            // let ds = this.$refs.accountLineDS.kendoWidget(),
            //     total = ds.total()
            // this.accountLine.id = itemLinePrefix + uuid.v1()
            // ds.insert(total, this.accountLine)
        },
        addRowDeposit() {
            let ds = this.$refs.depositLineDS.kendoWidget(),
                total = ds.total();
            this.depositLine.id = itemLinePrefix + uuid.v1();
            this.depositLine.decimalFormat = this.decimalFormat;
            ds.insert(total, this.depositLine);
        },
        addRowCashRefund() {
            let ds = this.$refs.cashRefundDS.kendoWidget(),
                total = ds.total();
            this.saleDepositLine.id = itemLinePrefix + uuid.v1();
            this.saleDepositLine.decimalFormat = this.decimalFormat;
            this.saleDepositLine.optionType = OPTION_TYPE
            ds.insert(total, this.saleDepositLine);
        },
        async loadOtherAccount() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    settingsHandler
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
        PurchaseDiscountItemEditor() {
        },
        async searchInvoice() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    let data = {};
                    this.showLoading = true;
                    const priceLevel = this.creditMemo.priceLevel;
                    let code = "";
                    if (priceLevel.hasOwnProperty("currency")) {
                        this.creditMemo.currency = priceLevel.currency;
                        if (priceLevel.currency.hasOwnProperty("code")) {
                            code = priceLevel.currency.code;
                        }
                    }
                    data = {
                        search: this.customer.id,
                        type: "customer",
                        status: 3,
                        transactionDate: this.transactionDate,
                        currency: code,
                    };
                    this.offsetInvoices = [];
                    this.isLoading = 1
                    this.showLoading = true;
                    if (code !== "") {
                        try {
                            billingHandler.search(data).then((res) => {
                                if (res.data.statusCode === 200) {
                                    const response = res.data.data;
                                    // const result = res.data.result
                                    this.isLoading = 0
                                    this.showLoading = false;
                                    if (response.length > 0) {
                                        let uniqueIds = [];
                                        this.offsetInvoiceList = response;
                                        this.offsetInvoiceList.forEach((o) => {
                                            uniqueIds.push(o.id);
                                        });
                                        const unique = [...new Set(uniqueIds)];
                                        this.offsetInvoices = [];
                                        unique.forEach((txnId) => {
                                            const found = this.offsetInvoiceList.filter(
                                                (j) => j.id === txnId
                                            );
                                            found.forEach((k) => {
                                                this.offsetInvoices.push(k);
                                            });
                                        });
                                        // const unique = [...new Set(this.offsetInvoiceList.map(item => {
                                        //     return {
                                        //         id: item.id,
                                        //         referenceNo: item.referenceNo
                                        //     }
                                        // }))]
                                        // this.autoCalculate()
                                        // this.addRowOffsetInvoice()
                                    } else {
                                        this.isLoading = 0
                                    }
                                }
                            });
                        } catch (e) {
                            this.isLoading = 0
                            this.showLoading = false;
                        }
                    } else {
                        this.isLoading = 0
                    }
                }, 50);
            });
        },
        async loadPaymentOption() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.paymentMethod = [];
                    paymentOptionHandler
                        .list(strOptionFilter)
                        .then((res) => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.paymentMethod = res.data.data;
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 50);
            });
        },
        async onSaveClose(save) {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                return;
            }

            const lDS = this.$refs.itemLineDS.kendoWidget();
            let dataValidate = 0;
            const itmLineR = lDS.data().filter((n) => n.amount > 0);
            window.console.log('itmLineR', itmLineR)
            if (itmLineR.length > 0) {
                itmLineR.forEach((value, index) => {
                    if (
                        value.item.id === undefined ||
                        value.uom.uom.id === undefined ||
                        value.item.id === "" ||
                        value.uom.uom.id === ""
                    ) {
                        this.$snotify.error(
                            "Please select return item at row " + (index + 1)
                        );
                    } else {
                        dataValidate += 1;
                    }
                });
                if (itmLineR.length === dataValidate) {
                    if (Object.keys(this.creditMemo.priceLevel).length > 0) {
                        if (this.dr !== 0 && this.cr !== 0) {
                            window.console.log(this.creditMemo.priceLevel, "price level");
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve("resolved");
                                    let isAutoGenerate = 1;
                                    const offsetAmount = parseFloat(
                                        this.creditMemo.applyToAmount
                                    );
                                    const itemLineAmount = parseFloat(
                                        this.creditMemo.itemLineAmount
                                    );
                                    const variance = parseFloat(this.creditMemo.variance);
                                    // const lDS = this.$refs.itemLineDS.kendoWidget()
                                    // const itmLineR = lDS.data().filter(n => n.amount > 0)
                                    // const applyToDS = this.$refs.applyToLineDS.kendoWidget()
                                    // const applyToLineR = applyToDS.data().filter(n => n.paidAmount > 0)
                                    // const depositLineDS = this.$refs.depositLineDS.kendoWidget()
                                    // const depositLineR = depositLineDS.data().filter(n => n.amount > 0)
                                    let noDepositAcc = 0,
                                        noCashAccount = 0,
                                        noVarianceAcc = 0;
                                    // if (itmLineR.length > 0 && depositLineR.length > 0 && applyToLineR.length > 0) {

                                    //todo: check offset amount
                                    window.console.log(
                                        "offsetAmount",
                                        offsetAmount,
                                        "itemLineAmount",
                                        itemLineAmount
                                    );
                                    if (offsetAmount > itemLineAmount) {
                                        this.showWaringMessage(
                                            "Credit Memo",
                                            "Return amount and Offset amount must be equal!",
                                            "OK"
                                        );
                                        return;
                                    }
                                    //todo: check customer credit case amount>0 and unselected account
                                    let ds = this.$refs.depositLineDS.kendoWidget();
                                    let rows = ds.data().filter((n) => n.amount > 0);
                                    rows.forEach((itm) => {
                                        const account = itm.account;
                                        if (!account.hasOwnProperty("id")) {
                                            this.showWaringMessage(
                                                "Credit Memo",
                                                "Please select deposit account",
                                                "OK"
                                            );
                                            noDepositAcc = 1;
                                            return;
                                        }
                                    });
                                    //todo: check Cash refund case amount>0 and unselected account
                                    let dsRefund = this.$refs.cashRefundDS.kendoWidget();
                                    rows = dsRefund.data().filter((n) => n.amount > 0);
                                    rows.forEach((itm) => {
                                        const account = itm.account;
                                        if (!account.hasOwnProperty("id")) {
                                            this.showWaringMessage(
                                                "Credit Memo",
                                                "Please select cash account",
                                                "OK"
                                            );
                                            noCashAccount = 1;
                                            return;
                                        }
                                    });
                                    //todo: check variance account
                                    if (variance !== 0) {
                                        const varianceAcc = this.creditMemo.varianceAcc;
                                        if (!varianceAcc) {
                                            // if (!variance.hasOwnProperty('id')) {
                                            this.showWaringMessage(
                                                "Credit Memo",
                                                "Please select variance account",
                                                "OK"
                                            );
                                            noVarianceAcc = 1;
                                            return;
                                            // }
                                        }
                                    }
                                    if (
                                        noVarianceAcc === 0 &&
                                        noDepositAcc === 0 &&
                                        noCashAccount === 0
                                    ) {
                                        if (this.$route.params.id) {
                                            const tranDate = new Date(this.transactionDate);
                                            const tranDateInvoice = new Date(
                                                this.creditMemo.transactionDate
                                            );
                                            const tranDateM =
                                                tranDate.getFullYear() + tranDate.getMonth();
                                            const tranDateInvoiceM =
                                                tranDateInvoice.getFullYear() +
                                                tranDateInvoice.getMonth();
                                            if (tranDateM === tranDateInvoiceM) {
                                                isAutoGenerate = 0;
                                            }
                                        }
                                        let itemLineDS = this.$refs.itemLineDS.kendoWidget();
                                        let applyToLineDS = this.$refs.applyToLineDS.kendoWidget();
                                        let cashRefundDS = this.$refs.cashRefundDS.kendoWidget();
                                        let depositLineDS = this.$refs.depositLineDS.kendoWidget();
                                        const itemLineR = itemLineDS
                                            .data()
                                            .filter((o) => o.amount)
                                            .map((n) => {
                                                const otherCharge = new OtherChargeModel(n.otherChargeItem || {})
                                                n['otherChargeItem'] = otherCharge
                                                return new ItemLineModel(n);
                                            });
                                        const applyToLineR = applyToLineDS
                                            .data()
                                            .filter((o) => o.paidAmount)
                                            .map((n) => {
                                                return new ApplyToLineModel(n);
                                            });
                                        const depositLineR = depositLineDS
                                            .data()
                                            .filter((o) => o.amount)
                                            .map((n) => {
                                                return new DepositLineModel(n);
                                            });
                                        const cashRefundR = cashRefundDS
                                            .data()
                                            .filter((o) => o.amount)
                                            .map((n) => {
                                                return {...n};
                                            });
                                        let data = {
                                            id: this.creditMemo.id ? this.creditMemo.id : "",
                                            type: "Credit Memo",
                                            uuid: this.creditMemo.uuid ? this.creditMemo.uuid : "",
                                            journal_uuid: this.creditMemo.journal_uuid
                                                ? this.creditMemo.journal_uuid
                                                : "",
                                            number: this.creditMemo.number,
                                            abbr: this.creditMemo.transactionType.abbr,
                                            transactionDate: this.transactionDate,
                                            transactionDateTZ: Helper.toISODate(this.transactionDate),
                                            customer: this.customer,
                                            transactionType: this.creditMemo.transactionType,
                                            currency: this.creditMemo.currency,
                                            txnRate: this.creditMemo.txnRate,
                                            rate: 1,
                                            exchangeAmount: this.creditMemo.exchangeAmount,
                                            exchangeRate: this.creditMemo.exchangeRate,
                                            amount: this.creditMemo.amount,
                                            variance: this.creditMemo.variance,
                                            priceLevel: this.creditMemo.priceLevel,

                                            itemLine: itemLineR,
                                            depositLine: depositLineR,
                                            cashRefundLine: cashRefundR,
                                            applyToLine: applyToLineR,

                                            segment: this.creditMemo.segment,
                                            location: this.creditMemo.location,
                                            project: this.creditMemo.project,
                                            employee: this.creditMemo.employee,
                                            transactionNote: this.creditMemo.transactionNote,
                                            journalNote: this.creditMemo.journalNote,

                                            itemLineAmount: this.creditMemo.itemLineAmount,
                                            itemLineExchangeAmount: this.creditMemo
                                                .itemLineExchangeAmount,
                                            itemLineDiscountAmount: this.creditMemo
                                                .itemLineDiscountAmount,
                                            itemLineTaxAmount: this.creditMemo.itemLineTaxAmount,
                                            itemLineSubTotal: this.creditMemo.itemLineSubTotal,

                                            applyToAmount: this.creditMemo.applyToAmount,
                                            applyToExchangeAmount: this.creditMemo
                                                .applyToExchangeAmount,
                                            depositDeduction: this.creditMemo.depositDeduction,
                                            depositAmount: this.creditMemo.depositAmount,
                                            exchangeDepositDeduction: this.creditMemo
                                                .exchangeDepositDeduction,
                                            refundAmount: this.creditMemo.refundAmount,
                                            varianceAcc: this.creditMemo.varianceAcc,

                                            saveOption: this.creditMemo.saveOption,
                                            status: 1,
                                            approvedBy: this.creditMemo.approvedBy,
                                            formTemplate: {},
                                            createdAt: this.creditMemo.createdAt,
                                            reason: this.creditMemo.reason,
                                            loggedUser: this.loggedUser,
                                            isAutoGenerate: isAutoGenerate,
                                            jRaw: this.jRaw,
                                            itemSubtotal: this.creditMemo.itemSubtotal,
                                            exchangeItemSubtotal: this.creditMemo
                                                .exchangeItemSubtotal,
                                            serviceSubtotal: this.creditMemo.serviceSubtotal,
                                            exchangeServiceSubtotal: this.creditMemo
                                                .exchangeServiceSubtotal,
                                            txnItmSubtotal: this.creditMemo.txnItmSubtotal,
                                            exchangeTxnItmSubtotal: this.creditMemo
                                                .exchangeTxnItmSubtotal,
                                            itemDiscount: this.creditMemo.itemDiscount,
                                            exchangeItemDiscount: this.creditMemo
                                                .exchangeItemDiscount,
                                            serviceDiscount: this.creditMemo.serviceDiscount,
                                            exchangeServiceDiscount: this.creditMemo
                                                .exchangeServiceDiscount,
                                            txnItmDiscount: this.creditMemo.txnItmDiscount,
                                            exchangeTxnItmDiscount: this.creditMemo
                                                .exchangeTxnItmDiscount,
                                            refFrom: this.creditMemo.refFrom || [],
                                            refTo: this.creditMemo.refTo || [],
                                            saleTaxDetail: this.creditMemo.saleTaxDetail || [],
                                            customerOtherChargeItem: this.creditMemo.customerOtherChargeItem || [],
                                            customerDiscountItem: this.creditMemo.customerDiscountItem || [],
                                            exchangeVariance: this.creditMemo.exchangeVariance || 0,
                                            actionType: this.$route.params.id
                                                ? this.$route.query.type
                                                : "new",
                                        };
                                        this.showLoading = true;
                                        window.console.log(data, "applyToLineR", applyToLineR);
                                        window.console.log(
                                            "applyToLineR",
                                            JSON.stringify(applyToLineR)
                                        );
                                        window.console.log(JSON.stringify(data), "data");
                                        billingHandler
                                            .createCreditMemo(data)
                                            .then((response) => {
                                                if (response.data.statusCode === 201) {
                                                    this.showLoading = false;
                                                    this.$snotify.success("Successfully");
                                                    if (save == 'new') {
                                                        this.clear()
                                                    } else {
                                                        this.clear();
                                                        this.close();
                                                    }
                                                }
                                            })
                                            .catch((e) => {
                                                this.showLoading = false;
                                                this.$snotify.error("Something went wrong");
                                                this.errors.push(e);
                                            });
                                    }
                                }, 10);
                            });
                        } else {
                            this.showWaringMessage(
                                "Credit Memo",
                                "Please check before save",
                                "OK"
                            );
                        }
                    } else {
                        this.showWaringMessage(
                            "Credit Memo",
                            "Please check before save",
                            "OK"
                        );
                    }
                }
            } else {
                this.$snotify.error("Please select return item ");
                return;
            }
        },
        async loadViewCreditMemo() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (this.$route.params.id) {
                        this.showLoading = true;
                        const strFilter = "?id=" + this.$route.params.id;
                        billingHandler
                            .creditMemoList(strFilter)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    const saleReturn = res.data.data[0];
                                    this.creditMemo = saleReturn;
                                    this.itemLines = saleReturn.itemLine;
                                    this.offsetInvoices = saleReturn.applyToLine;
                                    this.cashRefundLines = saleReturn.cashRefundLine;
                                    this.depositLines = saleReturn.depositLine;
                                    this.customer = this.creditMemo.customer;
                                    this.mEmployee = this.creditMemo.employee;
                                    this.transactionDate = this.creditMemo.transactionDate;
                                    this.baseCurrencyCode = saleReturn.baseCurrencyCode;
                                    this.customerDiscountItem = this.creditMemo.customerDiscountItem || [];

                                    if (this.cashRefundLines.length === 0) {
                                        this.saleDepositLine.id = itemLinePrefix + uuid.v1();
                                        this.cashRefundLines.push(this.saleDepositLine);
                                        // this.addRowCashRefund()
                                    }
                                    if (this.depositLines.length === 0) {
                                        this.saleDepositLine.id = itemLinePrefix + uuid.v1();
                                        this.depositLines.push(this.saleDepositLine);
                                        // this.addRowDeposit()
                                    }
                                }
                            })
                            .catch();
                        {
                            // this.showLoading = false
                        }
                    }
                }, 50);
            });
        },
        close() {
            window.history.go(-1);
        },
        clear() {
            this.showLoading = false;
            let itemLineDS = this.$refs.itemLineDS.kendoWidget();
            itemLineDS.data([]);
            let cashRefundDS = this.$refs.cashRefundDS.kendoWidget();
            cashRefundDS.data([]);
            let depositLineDS = this.$refs.depositLineDS.kendoWidget();
            depositLineDS.data([]);
            let applyToLineDS = this.$refs.applyToLineDS.kendoWidget();
            applyToLineDS.data([]);
            this.offsetInvoice = {}
            this.offsetInvoices = [];
            const cusType = this.creditMemo.transactionType
            this.customer = {}
            this.creditMemo = new CreditMemoModel()
            this.creditMemo.transactionType = cusType
            this.addRow()

        },
        autoCalculateTaxDetail() {
            let ids = []
            this.taxListDetail.forEach(n => {
                ids.push(n.id || '')
            })
            const unique = [...new Set(ids)]
            let result = []
            unique.forEach(m => {
                let amount = 0, row = {}, discount = 0, xDiscount = 0, xAmount = 0, taxAmount = 0, xTaxAmount = 0
                let taxDetail = [], isVat = 0
                const found = this.taxListDetail.filter(n => n.id === m)
                // window.console.log('taxListDetailids', found)
                found.forEach(k => {
                    row = k
                    if (k.isVat === 1) {
                        isVat = 1
                        const detail_ = k.detail || {}
                        taxDetail.push(detail_)

                    }
                    taxAmount += k.taxAmount_ || 0
                    xTaxAmount += (k.taxAmount_ || 0) * (k.txnRate || 1)
                    amount += (k.amount || 0)
                    xAmount += (k.amount || 0) * (k.txnRate || 1)
                    discount += (k.discount || 0)
                    xDiscount += (k.discount || 0) * (k.txnRate || 1)
                })
                let spTaxAmt = 0, spXTaxAmt = 0, plTaxAmt = 0, plXTaxAmt = 0, otTaxAmt = 0, otXTaxAmt = 0,
                    spTaxName = '', plTaxName = '', otTaxName = '',
                    spTaxNameLocale = '', plTaxNameLocale = '', otTaxNameLocale = '',
                    spAccId = '', plAccId = '', otAccId = '',
                    spRate = '', plRate = '', otRate = ''
                taxDetail.forEach(n => {
                    const spTax = n.specificTax || {}
                    const plTax = n.publicLightingTax || {}
                    const otherTax = n.otherTax || {}
                    if (Object.keys(spTax).length > 0) {
                        spTaxAmt += (spTax.taxAmount_ || 0)
                        spXTaxAmt += ((spTax.taxAmount_ || 0) * (spTax.taxRate || 1))
                        spTaxName = spTax.defaultTax || ''
                        spTaxNameLocale = spTax.defaultTaxLocale || ''
                        spAccId = spTax.account ? spTax.account.id : ''
                        spRate = spTax.rate || 1
                    }
                    if (Object.keys(plTax).length > 0) {
                        plTaxAmt += (plTax.taxAmount_ || 0)
                        plXTaxAmt += ((plTax.taxAmount_ || 0) * (plTax.taxRate || 1))
                        plTaxName = plTax.defaultTax || ''
                        plTaxNameLocale = plTax.defaultTaxLocale || ''
                        plAccId = plTax.account ? plTax.account.id : ''
                        plRate = plTax.rate || 1
                    }
                    if (Object.keys(otherTax).length > 0) {
                        otTaxAmt += (otherTax.taxAmount_ || 0)
                        otXTaxAmt += ((otherTax.taxAmount_ || 0) * (plTax.taxRate || 1))
                        otTaxName = otherTax.defaultTax || ''
                        otTaxNameLocale = otherTax.defaultTaxLocale || ''
                        otAccId = otherTax.account ? otherTax.account.id : ''
                        otRate = otherTax.rate || 1
                    }
                })
                if (isVat === 1) {
                    row.detail = {
                        specificTax: {
                            name: spTaxName,
                            nameLocale: spTaxNameLocale,
                            amount: spTaxAmt,
                            exchangeAmount: spXTaxAmt,
                            accountId: spAccId,
                            rate: spRate,
                        },
                        publicLightingTax: {
                            name: plTaxName,
                            nameLocale: plTaxNameLocale,
                            amount: plTaxAmt,
                            exchangeAmount: plXTaxAmt,
                            accountId: plAccId,
                            rate: plRate,
                        },
                        otherTax: {
                            name: otTaxName,
                            nameLocale: otTaxNameLocale,
                            amount: otTaxAmt,
                            exchangeAmount: otXTaxAmt,
                            accountId: otAccId,
                            rate: otRate,
                        }
                    }
                } else {
                    row.detail = {}
                }

                row['amount'] = amount
                row['exchangeAmount'] = xAmount
                row['taxAmount'] = taxAmount
                row['exchangeTaxAmount'] = xTaxAmount
                row['discount'] = discount
                row['exchangeDiscount'] = xDiscount
                row['currency'] = this.creditMemo.exchangeRate || {}
                result.push(row)
                taxDetail = []
            })
            this.creditMemo.saleTaxDetail = result
            window.console.log('creditMemo.saleTaxDetail', result)
        },
        async loadOtherCharge() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    otherChargeHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            this.otherChargeList = res.data.data;
                        }
                    });
                }, 10);
            });
        },
        shrinkOtherChargeItem(otherChargeItem, otherChargeLine) {
            let items = [];
            const unique = this.removeDuplicate(otherChargeItem);
            unique.forEach((m) => {
                const found = otherChargeLine.filter((n) => n.id === m.id);
                let amount = 0, exchangeAmount = 0;
                found.map((o) => {
                    amount += o.amount;
                });
                found.map((o) => {
                    exchangeAmount += o.exchangeAmount;
                });
                items.push({
                    id: m.id,
                    name: m.name,
                    amount: amount,
                    exchangeAmount: exchangeAmount,
                });
            });
            this.customerOtherChargeItem = items;
        },
    },
    watch: {
        id() {
            if (this.$route.params.id === undefined) {
                this.clear();
            } else {
                this.loadViewCreditMemo();
            }
        },
        // call again the method if the route changes
    },
    created() {
        this.loadTax();
        this.loadSaleUnitItems();
        this.loadPrefix();
        this.loadSegment();
        this.loadLocation();
        this.loadPaymentOption();
    },
    mounted: async function () {
        await this.loadOtherAccount();
        this.requestData(0, this.filter, this.cusBaseUrl);
        // await this.loadDiscountItem()
        await this.loadEmployeeCenter();
        await this.loadPaymentTerm();
        await this.loadAccount();
        await this.loadPriceLevel();
        await this.loadOtherCharge();
        // await this.loadOtherCharge()
        await this.loadSaleFormContent();
        await this.initData();
        this.nowTimes();
    },
};
</script>

<style scoped>
.function_wrapper {
    box-shadow: none !important;
}

.v-application--is-ltr .v-text-field .v-input__append-inner {
    marn-top: 0 !important;
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

.primary--text {
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

.my_card h3 {
    display: block !important;
}
</style>
