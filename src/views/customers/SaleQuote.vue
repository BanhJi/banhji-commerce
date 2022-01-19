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
                                sm="8"
                                cols="12"
                                style="transition: .3s ease-in;"
                                :class="{ hide_big_bar_class: isHideBar }"
                            >
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">Sale {{ saleFormContent.saleQuote }}</h2>
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
                          @click="hide_smallsitebar"
                          v-if="isHideBar"
                      >
                        mdi-chevron-left-circle</v-icon
                      >
                      <v-icon
                          size="22"
                          class="arr_icon"
                          @click="hide_smallsitebar"
                          v-if="!isHideBar"
                      >
                        mdi-chevron-right-circle</v-icon
                      ></span
                                        >
                                    </v-card>
                                    <v-card
                                        outlined
                                        dense
                                        class="px-4 rounded-4 no_border mb-3"
                                        color="grayBg"
                                    >
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{ $t("customer") }}</label>
                                                <v-col
                                                    sm="12"
                                                    cols="12"
                                                    class="kendo_dropdown_custom pl-0 pb-4 pt-0 mt-1 pr-0"
                                                >
                                                    <dropdownlist
                                                        width="100%"
                                                        :data-items="customerList"
                                                        @change="onChange"
                                                        :value="transaction.customer"
                                                        :data-item-key="dataItemKey"
                                                        :text-field="textField"
                                                        :default-item="defaultItem"
                                                        :required="true"
                                                        :valid="validCustomer"
                                                        :filterable="true"
                                                        :disabled="isEdit"
                                                        @filterchange="onFilterChange"
                                                    >
                                                    </dropdownlist>
                                                </v-col>
                                                <label class="label">{{ $t("date") }}</label>
                                                <app-datepicker
                                                    :initialDate="transaction.transactionDate"
                                                    @onChanged="onQuoteDateChanged"
                                                    @emitDate="transaction.transactionDate = $event"
                                                />
                                                <label class="label">{{ $t("number") }}</label>
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
                                                            disabled
                                                            :rules="[(v) => !!v || 'Number is required']"
                                                            required
                                                        />
                                                    </v-col>
                                                    <v-col sm="2" cols="2" class="pt-0 px-0">
                                                        <v-icon
                                                            color="black"
                                                            size="30"
                                                            class="border_qrcode"
                                                            :disabled="isEdit"
                                                            @click="generateNumber">mdi-qrcode
                                                        </v-icon>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col sm="8" cols="12" class="">
                                                <v-row>
                                                    <v-col sm="6" cols="12" class="py-0 pt-0">
                                                        <!-- <p class="mb-1 d-block">
                                                            {{ $t("current_balance") }}
                                                        </p>
                                                        <h3 class="color_green float-right">
                                                            {{ numberFormat(transaction.currentBalance) }}
                                                        </h3> -->
                                                        <label class="label mb-0">{{ $t("term") }}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            v-model="transaction.paymentTerm"
                                                            :items="paymentTerms"
                                                            @change="onPaymentTermChanged"
                                                            placeholder="Term"
                                                            item-text="name"
                                                            item-value="id"
                                                            return-object
                                                            outlined
                                                        />
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="pl-0 pt-0">
                                                        <label class="mb-0 d-block">
                                                            {{ $t("credit_limit_allowed") }}
                                                        </label>
                                                        <h3 class="font_19 mt-3 float-left">
                                                            {{
                                                                creditLimitUsage(
                                                                    transaction.currentBalance,
                                                                    transaction.creditLimit
                                                                )
                                                            }}
                                                        </h3>
                                                        <h3 class="font_19 mt-3 float-right">
                                                            {{ numberFormat(transaction.creditLimit) }}
                                                        </h3>
                                                    </v-col>
                                                </v-row>
                                                <!-- <p class="mb-2 ml-n3 color_grey">{{ $t('additional_information') }}</p> -->

                                                <v-row class="mr-0 mt-0">
                                                    <v-col class="pb-0 pt-0" sm="6" cols="12">

                                                        <label class="label mb-0">{{ $t("lead") }}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            v-model="transaction.lead"
                                                            :items="leads"
                                                            placeholder="Lead"
                                                            item-text="name"
                                                            item-value="id"
                                                            clearable
                                                            return-object
                                                            outlined
                                                        />
                                                        <label class="label mb-0">{{
                                                                $t("price_level")
                                                            }}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            v-model="transaction.priceLevel"
                                                            :items="priceLevel"
                                                            @change="onPriceLevelChange"
                                                            item-value="id"
                                                            item-text="name"
                                                            return-object
                                                            placeholder="Price Level"
                                                            tage="Default Price Level"
                                                            outlined
                                                        />
                                                    </v-col>
                                                    <v-col class="py-0 pr-0" sm="6" cols="12">
                                                        <label class="label  mb-0">{{
                                                                $t("validity_date")
                                                            }}</label>
                                                        <app-datepicker
                                                            :initialDate="transaction.validityDate"
                                                            @emitDate="transaction.validityDate = $event"
                                                        />
                                                        <div class="d-flex justify-space-between">
                                                            <div>
                                                                <label class="label mb-0">{{ $t("currency") }}</label>
                                                                <p class="label font_19 mt-3 mb-0">{{
                                                                        currencyCode
                                                                    }}</p>
                                                            </div>
                                                            <div>
                                                                <label class="label mb-0">{{ $t("rate") }}</label>
                                                                <p class="label font_19 mt-3 mb-0">{{
                                                                        transactionRate
                                                                    }}</p>
                                                            </div>
                                                        </div>

                                                    </v-col>

                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-card outlined dense class="no_border mb-3" color="white">
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pt-0">
                                                <kendo-datasource
                                                    ref="saleQuoteItemLineDS"
                                                    :data="itemLines"
                                                    :change="dataSourceChanged"/>
                                                <kendo-grid
                                                    id="gridItemLineSaleQuote"
                                                    class="grid-function"
                                                    :data-source-ref="'saleQuoteItemLineDS'"
                                                    :sortable="false"
                                                    :column-menu="true"
                                                    :editable="true"
                                                    :scrollable-virtual="true">
                                                    <kendo-grid-column
                                                        :command="{
                              iconClass: 'k-icon k-i-trash',
                              text: ' ',
                              click: removeRow,
                              class: 'btn-plus',}"
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
                                                        :required="true"
                                                        :headerAttributes="{
                              style: 'background-color: #EDF1F5',
                            }"
                                                    />
                                                    <kendo-grid-column
                                                        :field="'description'"
                                                        :title="$t('description')"
                                                        :template="'<span>#=description#</span>'"
                                                        :width="200"
                                                        :headerAttributes="{
                              style: 'background-color: #EDF1F5',
                            }"
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
                                                        :field="'qty'"
                                                        :title="$t('qty')"
                                                        :format="'{0:n}'"
                                                        :editor="numberEditor"
                                                        :template="'<span>#=qty#</span>'"
                                                        :width="100"
                                                        :headerAttributes="{
                              style:
                                'text-align: left; background-color: #EDF1F5',
                            }"
                                                        :attributes="{ style: 'text-align: left; ' }"
                                                    />

                                                    <kendo-grid-column
                                                        :field="'price'"
                                                        :title="$t('price')"
                                                        :width="200"
                                                        :template="priceFormat"
                                                        :editor="numberEditor"
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
                                                        :editor="numberEditor"
                                                        :editable="
                              () => {
                                return false;
                              }
                            "
                                                        :width="200"
                                                        :template="amountFormat"
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
                                                        :headerAttributes="{
                              style:
                                'text-align: left; background-color: #EDF1F5',
                            }"
                                                        :attributes="{ style: 'text-align: left' }"
                                                    />
                                                    <kendo-grid-column
                                                        :field="'serviceDate'"
                                                        :title="$t('date_from')"
                                                        :width="160"
                                                        :hidden="!saleFormContent.serviceDate"
                                                        :template="
                              '<span>#= kendo.toString(new Date(serviceDate), dateFormat)#</span>'
                            "
                                                        :editor="ServiceDateEditor"
                                                        :headerAttributes="{
                              style: 'background-color: #EDF1F5',
                            }"
                                                    />
                                                    <kendo-grid-column
                                                        :field="'serviceDateTo'"
                                                        :title="$t('date_to')"
                                                        :width="160"
                                                        :hidden="!saleFormContent.serviceDateTo"
                                                        :template="
                              '<span>#= kendo.toString(new Date(serviceDateTo), dateFormat)#</span>'
                            "
                                                        :editor="ServiceDateToEditor"
                                                        :headerAttributes="{
                              style: 'background-color: #EDF1F5',
                            }"
                                                    />
                                                    <kendo-grid-column
                                                        :field="'modifier'"
                                                        :title="$t('modifier')"
                                                        :format="'{0:n}'"
                                                        :width="200"
                                                        :hidden="!saleFormContent.modifier"
                                                        :template="
                              '<span>#=modifier.name?modifier.name:``#</span>'
                            "
                                                        :editor="ModifierDropDownEditor"
                                                        :headerAttributes="{
                              style:
                                'text-align: left; background-color: #EDF1F5',
                            }"
                                                        :attributes="{ style: 'text-align: left' }"
                                                    />
                                                    <kendo-grid-column
                                                        :field="'discountItem'"
                                                        :title="$t('discount_item')"
                                                        :width="200"
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
                                                        :field="'specificTax'"
                                                        :title="$t('specificTax')"
                                                        :width="200"
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
                                                        :width="200"
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
                                                        :width="200"
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
                                                        :width="200"
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
                                                        :width="200"
                                                        :hidden="!saleFormContent.employee"
                                                        :template="empImpl"
                                                        :editor="EmployeeDropDownEditor"
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
                                                    <v-col sm="6" cols="12" class="pt-0 pb-1">
                                                        <v-btn
                                                            class="float-left btn_plus  mr-2"
                                                            @click="addRow"
                                                        >
                                                            <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                        </v-btn>
                                                        <!--                            <v-btn @click="dialogCatalog=true"-->
                                                        <!--                                   color="secondary"-->
                                                        <!--                                   class="float-left rounded-0 mr-2 white&#45;&#45;text text-capitalize">-->
                                                        <!--                              {{ $t('catalog') }}-->
                                                        <!--                            </v-btn>-->
                                                        <!--                                                        <template>-->
                                                        <!--                                                            <v-file-input class="mt-0 pt-0 " sm="3" cols="6"-->
                                                        <!--                                                                          v-model="files"-->
                                                        <!--                                                                          :placeholder="$t('attachment')"-->
                                                        <!--                                                                          multiple-->
                                                        <!--                                                                          prepend-icon="mdi-paperclip">-->
                                                        <!--                                                                <template v-slot:selection="{ text }">-->
                                                        <!--                                                                    <v-chip-->
                                                        <!--                                                                        small-->
                                                        <!--                                                                        label-->
                                                        <!--                                                                        color="primary"-->
                                                        <!--                                                                    >-->
                                                        <!--                                                                        {{ text }}-->
                                                        <!--                                                                    </v-chip>-->
                                                        <!--                                                                </template>-->
                                                        <!--                                                            </v-file-input>-->
                                                        <!--                                                        </template>-->
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col sm="12" cols="12" class="py-0 pt-3">
                                                <v-row>
                                                    <v-col class="pt-0" sm="5" cols="6">
                                                        <v-card
                                                            class="no-boxshadow rounded-4 pa-3 rounded-0"
                                                            height="375px"
                                                            color="grayBg"
                                                        >
                                                            <v-row>
                                                                <v-col class="py-0" sm="12" cols="12">
                                                                    <label class="label">{{
                                                                            $t("billing_address")
                                                                        }}</label>
                                                                    <v-select
                                                                        class="mt-1"
                                                                        v-model="transaction.billingAddress"
                                                                        :items="billingAddress"
                                                                        item-value="id"
                                                                        item-text="name"
                                                                        tage="Billing Address"
                                                                        placeholder="Address"
                                                                        outlined
                                                                    />
                                                                    <!--                                  <label class="label">{{-->
                                                                    <!--                                      $t("pickup_delivery_address")-->
                                                                    <!--                                    }}</label>-->
                                                                    <!--                                  <v-select-->
                                                                    <!--                                      class="mt-1"-->
                                                                    <!--                                      v-model="transaction.deliveryAddress"-->
                                                                    <!--                                      :items="deliveryAddress"-->
                                                                    <!--                                      item-value="id"-->
                                                                    <!--                                      item-text="name"-->
                                                                    <!--                                      tage="Pickup/ Delivery Address"-->
                                                                    <!--                                      placeholder="USA"-->
                                                                    <!--                                      outlined-->
                                                                    <!--                                  />-->
                                                                    <!--                                  <label class="label">{{-->
                                                                    <!--                                      $t("pickup_delivery_date_time")-->
                                                                    <!--                                    }}</label>-->
                                                                    <!--                                  <v-datetime-picker-->
                                                                    <!--                                      :date-format="dateFormatted"-->
                                                                    <!--                                      v-model="transaction.deliveryDateTime"-->
                                                                    <!--                                  >-->
                                                                    <!--                                  </v-datetime-picker>-->
                                                                    <label>{{
                                                                            $t("message_on_sale_quote")
                                                                        }}</label>
                                                                    <v-textarea
                                                                        class="mt-1"
                                                                        v-model="transaction.transactionNote"
                                                                        outlined
                                                                        no-resize
                                                                        height="60px"
                                                                        tage="Message on Invoice"
                                                                        placeholder="This will appear on the quote"
                                                                    />
                                                                </v-col>
                                                            </v-row>
                                                        </v-card>
                                                    </v-col>
                                                    <v-col class="pt-0" sm="7" cols="6">
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
                                                                            outlined
                                                                            class="text-white text-bold rounded-0 float-right text-uppercase"
                                                                            color="primary"
                                                                            style="height: 30px !important;"
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
                                                                <tr style="background:#F8F8F9;">
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
                                    </v-card>
                                    <v-divider/>
                                    <v-card outlined dense class="no_border function_footer">
                                        <v-alert type="warning" v-model="alert" dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                    class="mr-2 text-capitalize  black--text float-left"
                                                    v-on="on"
                                                >
                                                    {{
                                                        template >= 0
                                                            ? templatesForm[template].name
                                                            : $t("select_template")
                                                    }}
                                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item
                                                    v-for="(item, index) in templatesForm"
                                                    @click="ChoseTemplate(index)"
                                                    :key="index">
                                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <v-btn
                                            color="black"
                                            outlined
                                            class="text-capitalize  black--text float-left"
                                            @click="cancel"
                                        >{{ $t("cancel") }}
                                        </v-btn>
                                        <!--                    <v-menu>-->
                                        <!--                      <template v-slot:activator="{ on }">-->
                                        <!--                        <v-btn color="primary"-->
                                        <!--                               class="ml-2 float-right text-capitalize  white&#45;&#45;text"-->
                                        <!--                               v-on="on">-->
                                        <!--                          {{ $t('save_option') }}-->
                                        <!--                          <v-icon size="" class="ma-1">expand_more</v-icon>-->
                                        <!--                        </v-btn>-->
                                        <!--                      </template>-->
                                        <!--                      <v-list rounded>-->
                                        <!--                        <v-list-item-group>-->
                                        <!--                          <v-list-item>-->
                                        <!--                            <v-list-item-content>-->
                                        <!--                              <v-list-item-title v-if="!isEdit" @click="saveNew">-->
                                        <!--                                {{ $t('save_new') }}-->
                                        <!--                              </v-list-item-title>-->
                                        <!--                            </v-list-item-content>-->
                                        <!--                          </v-list-item>-->
                                        <!--                          <v-list-item>-->
                                        <!--                            <v-list-item-content>-->
                                        <!--                              <v-list-item-title @click="saveClose">{{-->
                                        <!--                                  $t('save_close')-->
                                        <!--                                }}-->
                                        <!--                              </v-list-item-title>-->
                                        <!--                            </v-list-item-content>-->
                                        <!--                          </v-list-item>-->
                                        <!--                        </v-list-item-group>-->
                                        <!--                      </v-list>-->
                                        <!--                    </v-menu>-->
                                        <v-btn
                                            color="primary"
                                            :disabled="btnDisabled"
                                            class="float-right white--text text-capitalize "
                                            @click="saveClose">
                                            {{ $t("save_close") }}
                                        </v-btn>
                                        <v-btn color="secondary"
                                               style="margin-right: 10px !important"
                                               :disabled="btnDisabled"
                                               class="white--text float-right text-capitalize"
                                               @click="saveNew" :hidden="hiddenButton">{{ $t("save_new") }}
                                        </v-btn>
                                    </v-card>
                                </v-form>
                            </v-col>
                            <v-col
                                class="smallSide pl-2 pt-0"
                                sm="4"
                                style="transition: .3s ease-in;"
                                :class="{ hide_small_bar_class: isHideBar }">
                                <div class="d-flex justify-end">
                                    <h3 style="color: #b3b5bc; font-size:20px;"
                                        v-if="!isHideBar"
                                        class="text-uppercase">
                                        <span class="pointer" @click="Help('sale quote')">{{ $t("help") }}</span>
                                        <v-icon
                                            @click="cancel()"
                                            style="cursor: pointer; color: #333333; font-size: 40px;"
                                            class="float-right mt-n1">close
                                        </v-icon>
                                    </h3>
                                </div>

                                <div v-if="!isHideBar" class="small_sidebar mt-2 px-4 rounded-4 grayBg">
                                    <v-card style="margin-bottom: 2px;" outlined dense
                                            class="pa-3 no_border my_card rounded-4 white--text"
                                            color="primary" height="60px">
                                        <h3 class="text-left font_13 flex-1 text-uppercase">{{ $t('amount_due') }}</h3>
                                        <h3 class="text-right flex-1 font_20 niradei_heavy">
                                            {{ numberFormat(transaction.total) }} </h3>
                                    </v-card>
                                    <v-row>
                                        <v-col sm="12" cols="12" class="pt-4">
                                            <!-- <h4  style="line-height: 18px;" class="mb-1 text-uppercase">{{ $t('analysis') }}</h4> -->
                                            <label class="label">{{ $t("segment") }}</label>
                                            <v-select
                                                class="mt-1"
                                                v-model="transaction.segment"
                                                :items="segments"
                                                item-value="id"
                                                :item-text="(item) => `${item.code} - ${item.name}`"
                                                return-object
                                                :rules="[(v) => !!v || 'Segment is required']"
                                                tage="segment"
                                                placeholder="Segment"
                                                outlined=""
                                            />
                                            <label class="label">{{ $t("location") }}</label>
                                            <v-select
                                                class="mt-1"
                                                v-model="transaction.location"
                                                :items="locations"
                                                item-value="id"
                                                :item-text="(item) => `${item.code} - ${item.name}`"
                                                return-object
                                                tage="Location"
                                                placeholder="bu/location"
                                                outlined=""
                                            />
                                            <label class="label font_14">{{
                                                    $t("sale_channel")
                                                }}</label>
                                            <v-select
                                                class=" mt-1"
                                                v-model="transaction.saleChannel"
                                                :items="saleChannelList"
                                                item-value="id"
                                                item-text="name"
                                                return-object
                                                tage="Sale Channel"
                                                placeholder="Channel"
                                                outlined
                                            />
                                            <label class="label font_14">{{ $t('employee') }}</label>
                                            <v-col sm="12" cols="12"
                                                   class="kendo_dropdown_custom pl-0 pr-0 pb-3 pt-1">
                                                <dropdownlist
                                                    :data-items="employees"
                                                    @change="onEmployeeChanged"
                                                    :value="mEmployee"
                                                    :data-item-key="'id'"
                                                    :text-field="'name'"
                                                    :default-item="defaultItem"
                                                    :filterable="true"
                                                    @filterchange="onEmployeeFilterChanged">
                                                </dropdownlist>
                                            </v-col>
                                            <label class="label">{{ $t("for_month_of") }}</label>
                                            <app-monthof-picker
                                                :initMonthOf="transaction.monthOf"
                                                @emitMonthOf="transaction.monthOf = $event"
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
                :isLoading="showLoading"
                :fullPage="false"
                :myLoading="true"
                :alertMessage="loadingAlert"
                :color="loadingColorAlert"
                :alertText="loadingTextAlert"
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
                                                {{ numberFormat(transaction.totalTaxAmount) }}
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
            <v-dialog v-model="dialogCatalog" max-width="850px">
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("catalog") }}</v-card-title>
                        <v-icon @click="dialogCatalog = false"
                        >close
                        </v-icon
                        >
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
                    <v-divider/>
                </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>

<script>
// import LoadingMe from '@/components/Loading'
import {i18n} from "@/i18n";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import kendo from "@progress/kendo-ui";
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import SaleFormContentModel from "@/scripts/model/SaleFormContent";
import ItemLineModel from "@/scripts/invoice/model/ItemLine";
import {uuid} from "vue-uuid";
import TransactionModel from "@/scripts/model/Transaction";

/* Store */
import store from "@/store"

const institute = store.state.institute.institute

import {ShowResource} from "@/observable/store";
import paymentTermHandler_ from "@/scripts/paymentterm/handler/paymentTermHandler";
import creditLimitHandler from "@/scripts/creditLimit/handler/creditLimitHandler";
////handler
const transactionHandler = require("@/scripts/transactionHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const customerHandler = require("@/scripts/customerHandler");
const projectHandler = require("@/scripts/projectHandler");
const prefixHandler = require("@/scripts/prefixHandler");
const paymentTermHandler = require("@/scripts/paymentTermHandler");
const priceLevelHandler = require("@/scripts/priceLevelHandler");
const saleFormContentHandler = require("@/scripts/saleFormContentHandler");
const employeeHandler = require("@/scripts/employeeHandler");
const itemModifierHandler = require("@/scripts/itemModifierHandler");
const discountItemHandler = require("@/scripts/discountItemHandler");
const uomPriceHandler = require("@/scripts/uomPriceHandler");
const productVariantHandler = require("@/scripts/productVariantHandler");
const otherChargeHandler = require("@/scripts/otherChargeHandler");
const locationHandler = require("@/scripts/locationHandler");
const settingsHandler = require("@/scripts/settingsHandler");
const saleChannelHandler = require("@/scripts/saleChannelHandler");
const saleUnitItemHandler = require("@/scripts/saleUnitItemHandler");
const settingHandler = require("@/scripts/settingHandler");
const catalogHandler = require("@/scripts/catalogHandler");
const productHandler = require("@/scripts/productHandler");
const currencyHandler = require("@/scripts/currency/handler/currencyHandler");

const saleFormContentModel = new SaleFormContentModel({});
const itemLineModel = new ItemLineModel({});
//other
const $ = kendo.jQuery
const textField = "numberName";
const keyField = "id";
const defaultItem = {[textField]: "Select customer...", [keyField]: null};
const emptyItem = {[textField]: "loading ..."};
const invoicePrefix = "lin-";
const DISCOUNT_TYPE = "?type=Sale";
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const {dataStore} = require("@/observable/store");

export default {
    name: "SaleQuote",
    props: {
        id: {
            type: String,
        },
        initSaleQuote: {
            type: TransactionModel,
        },
    },
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": DatePickerComponent,
        dropdownlist: DropDownList,
        "app-monthof-picker": () =>
            import("@/components/kendo_templates/MonthOfPicker"),
    },
    data: () => ({
        transaction: new TransactionModel(),
        isEdit: false,
        numSelect: [1],
        dialogTax: false,
        //Catalog
        dialogCatalog: false,
        gridSchema: {
            model: {
                id: "id",
            },
        },
        catalogs: [],
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
        templates: [
            {title: "Draft"},
            {title: "Open"},
            {title: "Partially Closed"},
            {title: "Closed"},
        ],
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,
        filter: "",
        textField: "numberName",
        dataItemKey: "id",
        defaultItem: defaultItem,
        mOtherCharge: [],
        //item
        itemLines: [],
        itemLine: itemLineModel,
        dateFormat: itemLineModel.dateFormat,
        //customer
        cusBaseUrl: customerHandler.searchv1(),
        empBaseUrl: employeeHandler.search(),
        customer: {},
        customerList: [],
        billingAddress: [],
        deliveryAddress: [],
        priceLevel: [],
        //date
        paymentTerms: [],
        transactions: [],
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
        deliveryDateTime: new Date().toISOString().substr(0, 10),
        validityDate: new Date().toISOString().substr(0, 10),
        specificDiscountItem: [],
        otherChargeList: [],
        saleUnitItemList: [],
        otherTax: [],
        specificTax: [],
        publicLightingTax: [],
        vatTax: [],
        tax: [],
        loggedUser: {
            id: cookie.creator,
            name: cookie.email
        },
        leads: [],
        monthOf: '',
        isSaveNew: false,
        isSaveClose: false,
        isSavePrint: false,
        isSaveDraft: false,
        exchangeRate: {},
        baseCurrencyCode: "",
        currencyCode: "",
        transactionRate: 1,
        saveOption: "",
        schemaModelFields: {
            uom: {validation: {required: true}},
            price: {validation: {required: true}},
        },
        isPriceLevelChanged: false,
        templatesForm: [
            {
                id: 1,
                type: "Sale Quote",
                name: "Sale Quote",
            }
        ],
        template: 0,
        btnDisabled: false
    }),
    methods: {
        ChoseTemplate(i) {
            this.template = i;
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
                            this.transaction.employee = {}
                            this.employees = []
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.employees = res.data.data;
                                // if (this.employees.length > 0) {
                                //     this.transaction.employee = this.employees[0];
                                // }
                            } else {
                                this.showLoading = false;
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 10);
            });
        },
        numberEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 30,
                    min: 0.0001,
                    format: `${this.saleFormContent.decimal}`,
                });
        },
        amountFormat(value) {
            return kendo.toString(value.amount, `n${this.saleFormContent.decimal}`);
        },
        priceFormat(value) {
            return kendo.toString(value.price, `n${this.saleFormContent.decimal}`);
        },
        Help(key_search) {
            ShowResource(key_search);
        },
        initialData() {
            if (this.initSaleQuote) {
                // Edit Mode
                this.transaction = this.initSaleQuote;
                this.bindData();
            } else {
                // Brand New Mode
                if (this.$route.params.id === undefined) {
                    this.setDefaultData();
                } else {
                    this.loadViewSaleQuote();
                }
            }
        },
        setDefaultData() {
            // Brand New Mode
            this.isEdit = false;
            //set default segment
            // let s = {};
            // if (this.segments.length > 0) {
            //     s = this.segments[0];
            // }
            // //set default location
            // let l = {};
            // if (this.locations.length > 0) {
            //     l = this.locations[0];
            // }
            // //set default employee
            // let e = {};
            // if (this.employees.length > 0) {
            //     e = this.employees[0];
            // }
            // //transaction type
            // let tt = {};
            // if (this.transactionType.length > 0) {
            //     tt = this.transactionType[0];
            // }
            // //payment term
            // let p = {};
            // if (this.paymentTerms.length > 0) {
            //     p = this.paymentTerms[0];
            // }
            // //price level
            // let pl = {};
            // if (this.priceLevel.length > 0) {
            //     pl = this.priceLevel[0];
            // }
            // //sale chanel
            // let sc = {};
            // if (this.saleChannelList.length > 0) {
            //     sc = this.saleChannelList[0];
            // }
            this.transaction = new TransactionModel();
            // Generate Number
            this.itemLines = []
            let ds = this.$refs.saleQuoteItemLineDS.kendoWidget();
            ds.data([]);
            // Add 2 default lines
            // this.removeEmptyLine()
            setTimeout(() => {
                // this.addRow()
                this.addRow()
            }, 500)
            // this.loadLead();
            // this.loadSaleChannel();
            // this.loadEmployeeCenter()
            this.otherChargeList = []
            this.mOtherCharge = []
            this.taxListTotal = {}
            this.mEmployee = {}
            // this.loadLead()
            this.leads = []
        },
        bindData() {
            // Edit Mode
            this.isEdit = true;
            this.customer = this.transaction.customer;
            // this.onChange(e)
            this.billingAddress = this.transaction.customer.billingAddress;
            this.deliveryAddress = this.transaction.customer.deliveryAddress;
            this.taxListTotal = this.transaction.taxListTotal;
            this.itemLines = this.transaction.itemLines;
            this.mOtherCharge = this.transaction.otherCharge;
            this.loadProjectByCustomer();
            if (this.customer.hasOwnProperty("id")) {
                this.loadCustomerBalance(this.customer.id);
            }
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
        errorMessage() {
        },
        accountDropDownEditor() {
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
        hide_smallsitebar() {
            this.isHideBar = !this.isHideBar;
        },
        //number
        generateNumber() {
            // window.console.log('generateNumber')
            let d = new Date().toISOString().substr(0, 10);
            if (this.transaction.transactionDate) {
                // window.console.log(this.transactionDate)
                d = this.transaction.transactionDate;
            }
            let data = {
                abbr: this.transaction.transactionType.abbr,
                structure: this.transaction.transactionType.structure,
                prefixSeparator: this.transaction.transactionType.prefixSeparator || '',
                numberSeparator: this.transaction.transactionType.numberSeparator || '',
                format: this.transaction.transactionType.format || 5,
                sequcencing: this.transaction.transactionType.sequcencing,
                transactionDate: d,
                type: "Sale Quote",
            };
            this.showLoading = false;
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
                        this.showLoading = false;
                    }
                })
                .catch((e) => {
                    this.showLoading = false;
                    this.errors.push(e);
                });
        },
        zeroPad(num, places) {
            return String(num).padStart(places, "0");
        },
        //customer
        onChange(event) {
            window.console.log(event, 'customer');
            const value = event.value;
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.customer = value;
            this.transaction.customer = value;
            // this.invoice = value
            window.console.log(value, 'customer')
            this.transaction.priceLevel = value.priceLevel ? value.priceLevel : {}
            this.billingAddress = value.hasOwnProperty("billingAddress")
                ? value.billingAddress
                : [];
            this.deliveryAddress = value.hasOwnProperty("deliveryAddress")
                ? value.deliveryAddress
                : [];
            if (this.billingAddress.length > 0) {
                this.transaction.billingAddress = this.billingAddress[0];
            }
            if (this.deliveryAddress.length > 0) {
                this.transaction.deliveryAddress = this.deliveryAddress[0];
            }
            this.onQuoteDateChanged();
            this.loadProjectByCustomer();
            const priceLevel = value.hasOwnProperty("priceLevel")
                ? value.priceLevel
                : {};
            const baseCurrency = value.hasOwnProperty("baseCurrency")
                ? value.baseCurrency
                : {};
            if (baseCurrency.hasOwnProperty("code")) {
                this.baseCurrencyCode = baseCurrency.code;
            }
            if (priceLevel.hasOwnProperty("currency")) {
                if (priceLevel.currency.hasOwnProperty("id")) {
                    this.loadTransactionRate();
                }
            }
            // const creditLimit = value.hasOwnProperty("creditLimit")
            //     ? value.creditLimit
            //     : 0;
            // this.transaction.creditLimit = kendo.parseFloat(creditLimit);
            // this.loadCustomerBalance(this.customer.id);
            // this.loadPaymentTermList();
            // this.loadCreditLimit();
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
        requestData_(skip, filter, baseUrl) {
            const url = baseUrl + `/${filter}`;
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then(this.afterFetch_);
        },
        afterFetch_(json) {
            this.employees = json.data;
        },
        afterFetch(json) {
            this.customerList = json.data;
        },
        removeRow(e) {
            e.preventDefault();
            const grid = kendo.jQuery("#gridItemLineSaleQuote").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
            this.autoCalculate();
        },
        //date
        async onQuoteDateChanged() {
            if (this.transaction) {
                this.transaction.monthOf = new Date(this.transaction.transactionDate).toISOString().substr(0, 7)
            }
            await this.loadPaymentTermList();
            await this.loadCreditLimit();
            await this.loadCustomerBalance(this.customer.id);
            await this.onPriceLevelChange();
            if (this.customer) {
                const paymentTerm = this.customer.paymentTerm || {}
                const netDue = paymentTerm.netDue;
                let someDate = new Date(this.transaction.transactionDate);
                someDate.setDate(someDate.getDate() + parseInt(netDue)); //number  of days to add, e.x. 15 days
                // window.console.log(someDate, 'this.transaction.validityDate ')
                // this.transaction.validityDate = someDate.toISOString().substr(0, 10);
            }
            if (this.$route.params.id === undefined) {
                // window.console.log("onQuoteDateChanged");
                this.generateNumber();
            }
        },
        //employee
        onEmployeeChanged(event) {
            const value = event.value;
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.mEmployee = value;
            this.transaction.employee = value;
        },
        onEmployeeFilterChanged(event) {
            const filter = event.filter.value;
            this.requestData_(0, filter, this.empBaseUrl);
            this.filter_ = filter;
        },
        onPaymentTermChanged() {
            if (this.customer) {
                const paymentTerm = this.transaction.paymentTerm || {}
                const netDue = paymentTerm.netDue || 0;
                const someDate = new Date(this.transaction.transactionDate);
                someDate.setDate(someDate.getDate() + parseInt(netDue)); //number  of days to add, e.x. 15 days
                // this.transaction.validityDate = someDate.toISOString().substr(0, 10)
                // window.console.log("im", someDate, netDue);
            }
            // this.onQuoteDateChanged();
        },
        //number
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n${this.saleFormContent.decimal}`);
            // return value
        },
        //
        async loadLead() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = "?type=Sale Lead";
                    billingHandler.list(strFilter).then((res) => {
                        this.showLoading = false;
                        let lead = res.data.data.filter((obj) => {
                            return obj.status != 0;
                        });
                        if (lead.length > 0) {
                            this.leads = lead;
                        }
                    });
                }, 10);
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
                            if (
                                this.$route.params.id !== undefined ||
                                this.$route.params.id != ""
                            ) {
                                this.transaction.paymentTerm = this.paymentTerms[0];
                            }
                        }
                    });
                }, 10);
            });
        },
        onPriceLevelChange() {
            this.isPriceLevelChanged = true
            this.loadTransactionRate()
            this.clearUOMItem()
        },
        async loadPriceLevel() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = '?nature=sale'
                    priceLevelHandler.get(strFilter).then((res) => {
                        this.priceLevel = res;
                        if (this.priceLevel.length > 0) {
                            if (
                                this.$route.params.id !== undefined ||
                                this.$route.params.id != ""
                            ) {
                                // this.transaction.priceLevel = this.priceLevel[0];
                                this.loadTransactionRate();
                            }
                        }
                    });
                }, 10);
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
                let dataRow = e.items[0], vTax = {}, spTax = {}, otTax = {}, plTax = {},
                    buom = {},
                    conversionRate = 1,
                    wac = 0,
                    qoh = 0,
                    amount = 0,
                    xAmount = 0;
                switch (e.field) {
                    case "item":
                        // this.attribute_ = this.attributes.filter(m => m.type.id === dataRow.variant.id)
                        dataRow.set("description", dataRow.item.description);
                        buom = dataRow.item.uom || {};
                        dataRow.set("buom", buom);
                        // dataRow.set('uom', buom)
                        // window.console.log(dataRow.item,'row')
                        // await this.inventoryBalance(dataRow, dataRow.item.id)
                        break;
                    case "price":
                        try {
                            amount = parseFloat(dataRow.price) * parseFloat(dataRow.qty);
                            xAmount = amount * parseFloat(this.transaction.txnRate);

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
                                qoh = dataRow.uom.qoh || 0;
                                conversionRate = dataRow.uom.conversionRate || 1;
                                wac = dataRow.uom.wac || 0;
                                dataRow.set("buom", buom);
                                dataRow.set("wac", wac);
                                dataRow.set("qoh", qoh);
                                dataRow.set("conversionRate", parseFloat(conversionRate));
                                /* todo: mapping tax object */
                                vTax = this.taxMapping(this.vatTax, dataRow.uom.vatTax || {})
                                otTax = this.taxMapping(this.otherTax, dataRow.uom.otherTax || {})
                                spTax = this.taxMapping(this.specificTax, dataRow.uom.specificTax || {})
                                plTax = this.taxMapping(this.publicLightingTax, dataRow.uom.publicLightingTax || {})

                                dataRow.set("vatTax", vTax);
                                dataRow.set("specificTax", otTax);
                                dataRow.set("otherTax", spTax);
                                dataRow.set("publicLightingTax", plTax);

                                if (dataRow.uom) {
                                    amount =
                                        parseFloat(dataRow.uom.price) * parseFloat(dataRow.qty);
                                    xAmount = amount * parseFloat(this.transaction.txnRate);

                                    dataRow.set("price", parseFloat(dataRow.uom.price));
                                    dataRow.set("amount", amount);
                                    dataRow.set("exchangeAmount", xAmount);
                                } else {
                                    amount = parseFloat(dataRow.price) * parseFloat(dataRow.qty);
                                    xAmount = amount * parseFloat(this.transaction.txnRate);

                                    dataRow.set("price", parseFloat(dataRow.price));
                                    dataRow.set("amount", amount);
                                    dataRow.set("exchangeAmount", xAmount);
                                }
                            } catch (err) {
                                window.console.log("error", err);
                                dataRow.set("buom", {});
                                dataRow.set("conversionRate", 1);
                                dataRow.set("price", 0);
                                dataRow.set("qoh", 0);
                                dataRow.set("wac", 0);
                                dataRow.set("amount", 0);
                                dataRow.set("exchangeAmount", 0);
                            }
                        }
                        break;
                    case "qty":
                        try {
                            amount = parseFloat(dataRow.price) * parseFloat(dataRow.qty);
                            xAmount = amount * parseFloat(this.transaction.txnRate);

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
                }
            }
        },
        // itemChange(dataItem){
        //     window.console.log(dataItem)
        //     this.loadUOMbyItem(dataItem.id)
        //     // uomPriceHandler.getURL(options.model.item.id, this.quote.priceLevel.id),
        // },
        // loadUOMbyItem(item) {
        //     // uomPriceHandler.getURL(item, this.quote.priceLevel.id).then(response => {
        //     //     if (response.data.statusCode === 200) {
        //     //         const res = response.data.data
        //     //         window.console.log(res);
        //     //         // const lastNumber = this.zeroPad(parseInt(res.lastNumber), this.quote.prefix.format)
        //     //         // const number = res.suffix + this.quote.prefix.numberSeparator + lastNumber
        //     //         // this.quote.number = number
        //     //     }
        //     // }).catch(e => {
        //     //     this.errors.push(e)
        //     // })
        //     // new Promise(resolve => {
        //     //     setTimeout(() => {
        //     //         resolve('resolved');
        //     //         uomPriceHandler.getURL(item, this.quote.priceLevel.id).then(res => {
        //     //             if (res.data.statusCode === 200) {
        //     //                 const data = res.data.data
        //     //                 window.console.log(data);
        //     //             }
        //     //         })
        //     //     }, 10)
        //     // })
        // },
        autoCalculate() {
            let ds = this.$refs.saleQuoteItemLineDS.kendoWidget(),
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
                saleUnit = [],
                inclusiveTax = 0,
                itemSubtotal = 0,
                txnItmSubtotal = 0,
                serviceSubtotal = 0,
                itemDiscount = 0,
                serviceDiscount = 0,
                txnDiscount = 0;
            const rows = ds.data().filter((m) => parseFloat(m.amount) > 0);
            rows.forEach((value) => {
                let modifierPrice = 0;
                if (value.modifier) {
                    modifierPrice = kendo.parseFloat(value.modifier.price);
                }

                // subTotal += (kendo.parseFloat(value.amount) + modifierPrice)
                let discount = 0;
                if (value.discountItem) {
                    let subTo =
                        kendo.parseFloat(value.price) * kendo.parseFloat(value.qty);
                    discount = this.autoCalculateDiscount(value.discountItem, subTo);
                    discount = this.autoCalculateDiscount(value.discountItem, subTo);
                    value["discountAmount"] = discount;
                    value["discountExchangeAmount"] =
                        discount * kendo.parseFloat(this.transaction.txnRate);
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
                    value["specificTaxAmount"] = spTax;
                    value["specificTaxExchangeAmount"] =
                        spTax * kendo.parseFloat(this.transaction.txnRate);
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
                    }
                }
                if (value.publicLightingTax) {
                    pltax = this.autoCalculateTax(
                        value.publicLightingTax,
                        kendo.parseFloat(value.amount) - kendo.parseFloat(discount)
                    );
                    pltax = kendo.parseFloat(pltax) ? kendo.parseFloat(pltax) : 0;
                    value["publicLightingTaxAmount"] = pltax;
                    value["publicLightingTaxExchangeAmount"] =
                        pltax * kendo.parseFloat(this.transaction.txnRate);
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
                    value["otherTaxAmount"] = otherTax;
                    value["otherTaxExchangeAmount"] =
                        otherTax * kendo.parseFloat(this.transaction.txnRate);
                    const tax = value.publicLightingTax;
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
                        vatTax * kendo.parseFloat(this.transaction.txnRate);
                    const tax = value.vatTax;
                    const baseAmount = tax.baseAmount;
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === "inclusive") {
                            inclusiveTax += vatTax;
                        }
                    }
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
                subTotal +=
                    kendo.parseFloat(value.amount) + modifierPrice - inclusiveTax;

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
                //include Tax Amount
                const amountNodiscount =
                    kendo.parseFloat(value.price) * kendo.parseFloat(value.qty) -
                    discount;
                const includeTaxAmount =
                    amountNodiscount + vatTax + pltax + spTax + otherTax;
                value["includeTaxAmount"] = includeTaxAmount;
                value["includeTaxExchangeAmount"] =
                    includeTaxAmount * kendo.parseFloat(this.transaction.txnRate);
            });

            this.transaction.itemSubtotal = itemSubtotal;
            this.transaction.exchangeItemSubtotal =
                itemSubtotal * kendo.parseFloat(this.transaction.txnRate);
            this.transaction.serviceSubtotal = serviceSubtotal;
            this.transaction.exchangeServiceSubtotal =
                serviceSubtotal * kendo.parseFloat(this.transaction.txnRate);
            this.transaction.txnItmSubtotal = txnItmSubtotal;
            this.transaction.exchangeTxnItmSubtotal =
                txnItmSubtotal * kendo.parseFloat(this.transaction.txnRate);
            this.transaction.itemDiscount = itemDiscount;
            this.transaction.exchangeItemDiscount =
                itemDiscount * kendo.parseFloat(this.transaction.txnRate);
            this.transaction.serviceDiscount = serviceDiscount;
            this.transaction.exchangeServiceDiscount =
                serviceDiscount * kendo.parseFloat(this.transaction.txnRate);
            this.transaction.txnItmDiscount = txnDiscount;
            this.transaction.exchangeTxnItmDiscount =
                txnDiscount * kendo.parseFloat(this.transaction.txnRate);

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
            this.transaction.total =
                kendo.parseFloat(total) -
                discountInvoice +
                kendo.parseFloat(this.transaction.otherChargeAmount);
            this.transaction.exchangeAmount =
                kendo.parseFloat(this.transaction.total) *
                kendo.parseFloat(this.transaction.txnRate);
            this.autoCalculateTaxByType(taxList);
            this.customerDiscountItem = this.removeDuplicate(discountItem);
            this.customerSaleUnit = this.removeDuplicate(saleUnit);
            // window.console.log('discount ', this.customerDiscountItem)
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.saleQuoteItemLineDS.kendoWidget(),
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
                }, 10);
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
                                url: productVariantHandler.itemSearchURL('?plId=' + this.transaction.priceLevel.id),
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
                    dataTextField: "code",
                    dataValueField: "uomConvertId",
                    cascadeFrom: "item",
                    template: "<span>#=code || `No Price Level`#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {url: uomPriceHandler.uomPriceByPriceLevelURL("id=" + options.model.item.id + "&plId=" + this.transaction.priceLevel.id + "&date=" + this.transaction.transactionDate),},
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
            const item = options.model.item || {}
            const uom = item.uom || {}
            const itemId = item.id || ''
            const uomId = uom.id || ''
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
                                url: itemModifierHandler.searchURL('?plId=' + this.transaction.priceLevel.id + '&id=' + itemId + '&uomId=' + uomId),
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
            let ds = this.$refs.saleQuoteItemLineDS.kendoWidget(),
                total = ds.total();
            this.itemLine.id = invoicePrefix + uuid.v1();
            ds.insert(total, this.itemLine);
        },
        onSpecificDiscountChanged() {
            if (this.transaction.specificDiscountItem) {
                const discountQuote = this.autoCalculateDiscount(
                    this.transaction.specificDiscountItem,
                    this.transaction.subTotal
                );
                this.transaction.specificDiscountTotal = kendo.toString(
                    discountQuote ? discountQuote : 0,
                    "n"
                );
                let total =
                    kendo.parseFloat(this.transaction.subTotal) -
                    (kendo.parseFloat(this.transaction.discountTotal) +
                        kendo.parseFloat(this.transaction.totalTaxAmount)) -
                    discountQuote;
                this.transaction.total = kendo.toString(total, "n");
            }
        },
        onOtherChargeChange() {
            let otherCharge = 0;
            this.mOtherCharge.forEach((m) => {
                otherCharge += this.autoCalculateDiscount(m, this.transaction.subTotal);
            });
            this.transaction.otherChargeAmount = otherCharge;
            this.autoCalculate();
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
        onOtherAmount(value) {
            return this.autoCalculateDiscount(value, this.transaction.subTotal);
        },
        async loadDiscountItem() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    discountItemHandler.list(DISCOUNT_TYPE).then((res) => {
                        if (res.data.statusCode === 200) {
                            this.specificDiscountItem = res.data.data;
                        }
                    });
                }, 10);
            });
        },
        async loadSegment() {
            const roleType = dataStore.roleType || 0
            if (roleType === 0) {
                if (dataStore.roleData) {
                    const roleData = dataStore.roleData || []
                    const segment = roleData.filter(itm => itm.type === 'segment')
                    const segmentDefault = segment.filter(m => m.isDefault === 1)
                    this.segments = segment
                    if (this.$route.params.id === undefined || this.$route.params.id === '') {
                        if (segmentDefault.length > 0) {
                            this.transaction.segment = segmentDefault[0];
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
                                this.showLoading = true;
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.segments = res.data.data;
                                    if (this.segments.length > 0) {
                                        this.transaction.segment = this.segments[0];
                                    }
                                }
                            })
                            .catch();
                        {
                            this.showLoading = false;
                        }
                    }, 10);
                });
            }
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
                            this.transaction.location = locationDefault[0];
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
                                this.showLoading = true;
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.locations = res.data.data;
                                    if ( this.locations.length > 0) {
                                        this.transaction.location = this.locations[0];
                                    }
                                }
                            })
                            .catch();
                        {
                            this.showLoading = false;
                        }
                    }, 10);
                });
            }

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
                                    if (!this.initSaleQuote) {
                                        this.transaction.project = this.customerProjects[0];
                                    }
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
                }, 10);
            });
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
                }, 10);
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
                }, 10);
            });
        },
        close(data) {
            this.loadEmployeeCenter()
            this.transaction.customer = {};
            let ds = this.$refs.saleQuoteItemLineDS.kendoWidget();
            ds.data([]);
            this.showLoading = false;
            this.transaction = new TransactionModel({});
            this.addRow()
            window.history.go(-1);
            // if (this.$route.params.id === undefined) {
            //   this.$router.push({
            //     name: "Customers",
            //     params: {
            //       data: data,
            //     }
            //   })
            // } else {
            //   window.history.go(-1)
            // }
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
                }, 10);
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
                        let ds = this.$refs.saleQuoteItemLineDS.kendoWidget(),
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
                }, 10);
            });
        },
        clear() {
        },
        async loadPrefix() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    prefixHandler.get("sale quote").then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.transactionType = res.data.data;
                            if (this.transactionType.length > 0) {
                                this.transaction.transactionType = this.transactionType[0];
                                if (!this.initSaleQuote) {
                                    window.console.log("load prefix");
                                    this.generateNumber();
                                }
                            }
                        }
                    });
                }, 10);
            });
        },
        async loadViewSaleQuote() {
            if (!this.initSaleQuote) {
                window.console.log("here from id with no prop data");
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        this.showLoading = true;
                        transactionHandler
                            .view(this.$route.params.id)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.transaction = res.data.data[0];
                                    this.bindData();
                                }
                            })
                            .catch();
                        {
                            this.showLoading = false;
                        }
                    }, 10);
                });
            }
        },
        removeEmptyLine() {
            const grid = kendo.jQuery("#gridItemLineSaleQuote").data("kendoGrid"),
                dataSource = grid.dataSource;
            if (dataSource.data().length > 0) {
                dataSource.data().forEach((m) => {
                    const itm = m.item || {}
                    if (itm) {
                        if (itm.id === undefined) {
                            dataSource.remove(m);
                        }
                    }
                });
            }
        },
        async loadTransactionRate() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const date = new Date(this.transaction.transactionDate)
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
                }, 10);
            });
        },
        creditLimitUsage(balance, creditLimit) {
            if (creditLimit > 0) {
                return (
                    kendo.toString(
                        (balance / creditLimit) * 100,
                        `n${this.saleFormContent.decimal}`
                    ) + " %"
                );
            } else {
                return kendo.toString(0, `n${this.saleFormContent.decimal}`) + " %";
            }
        },
        async loadCustomerBalance(id) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = id + "?type=bal";
                    this.transaction.currentBalance = 0;
                    billingHandler
                        .balance(strFilter)
                        .then((res) => {
                            if (res.data.statusCode === 200) {
                                const data = res.data.data;
                                if (data.length > 0) {
                                    this.transaction.currentBalance = data[0].balance;
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
        handleSubmit(event) {
            event.preventDefault();
            this.success = true;
        },
        saveClose() {
            this.isSaveClose = true;
            this.saveOption = "saveClose";

            let ds = this.$refs.saleQuoteItemLineDS.kendoWidget();
            let d1 = ds.data().filter(n => n.amount > 0);
            let dataValidate = 0;
            d1.forEach((value, index) => {
                window.console.log('index', value)
                if (
                    value.item.id == undefined ||
                    value.uom.uom.id == undefined ||
                    value.item.id == "" ||
                    value.uom.uom.id == ""
                ) {
                    this.$snotify.error(
                        "Please check Item or Uom  on row " + (index + 1)
                    );
                } else {
                    dataValidate += 1;
                }
            });
            if (d1.length == dataValidate) {
                this.save();
            }
        },
        savePrint() {
            this.isSavePrint = true;
            this.saveOption = "savePrint";
            this.save();
        },
        saveNew() {
            this.saveOption = "saveNew";
            this.isSaveNew = true;
            let ds = this.$refs.saleQuoteItemLineDS.kendoWidget();
            let d1 = ds.data().filter(n => n.amount > 0);
            let dataValidate = 0;
            d1.forEach((value, index) => {
                if (
                    value.item.id == undefined ||
                    value.uom.id == undefined ||
                    value.item.id == "" ||
                    value.uom.id == ""
                ) {
                    this.$snotify.error(
                        "Please check Item or Uom  on row " + (index + 1)
                    );
                } else {
                    dataValidate += 1;
                }
            });
            if (d1.length == dataValidate) {
                this.save();
            }
        },
        saveDraft() {
            this.saveOption = "saveDraft";
            this.isSaveDraft = true;
            this.save();
        },
        async save() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                this.$snotify.error(
                    "Field is required, please check field each of tabs!"
                );
                return;
            }
            let id = "";
            if (this.customer.hasOwnProperty("id")) {
                id = this.customer.id || "";
            }
            if (id === "") {
                this.$snotify.error("Customer is require");
                return;
            }
            this.removeEmptyLine()
            let ds = this.$refs.saleQuoteItemLineDS.kendoWidget(),
                total = ds.total()
            if (total == 0) {
                this.$snotify.error("Item is require");
                return
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    let txnList = [];
                    if (this.transaction.lead.hasOwnProperty("id")) {
                        txnList.push(this.transaction.lead);
                    }
                    this.removeEmptyLine();
                    let itemLineDS = this.$refs.saleQuoteItemLineDS.kendoWidget(),
                        total = itemLineDS.total();
                    if (total <= 0) {
                        this.$snotify.error("Field Required!");
                        return;
                    }
                    const dataRow = itemLineDS.data().map((m) => {
                        return new ItemLineModel(m);
                    });

                    let data = {
                        id: this.transaction.id ? this.transaction.id : "",
                        type: "Sale Quote",
                        number: this.transaction.number,
                        abbr: this.transaction.transactionType.abbr,
                        transactionDate: this.transaction.transactionDate,
                        validityDate: this.transaction.validityDate,
                        monthOf: this.transaction.monthOf,
                        customer: this.transaction.customer,
                        paymentTerm: this.transaction.paymentTerm,
                        transactionType: this.transaction.transactionType,
                        discountPromotion: {},
                        priceLevel: this.transaction.priceLevel,
                        itemLines: dataRow,
                        project: this.transaction.project,
                        segment: this.transaction.segment ? this.transaction.segment : {},
                        location: this.transaction.location
                            ? this.transaction.location
                            : {},
                        saleChannel: this.transaction.saleChannel,
                        billingAddress: this.transaction.billingAddress,
                        deliveryAddress: this.transaction.deliveryAddress,
                        deliveryDateTime: this.transaction.deliveryDateTime,
                        transactionNote: this.transaction.transactionNote,
                        subTotal: this.transaction.subTotal,
                        total: this.transaction.total ? this.transaction.total : 0,
                        amount: this.transaction.amountDue || 0,
                        discountTotal: this.transaction.discountTotal,
                        exchangeAmount: this.transaction.exchangeAmount,
                        specificDiscountTotal: this.transaction.specificDiscountTotal,
                        deliveryFee: this.transaction.deliveryFee,
                        totalTaxAmount: this.transaction.totalTaxAmount,
                        currentBalance: this.transaction.currentBalance,
                        balance: this.transaction.balance,
                        creditLimit: this.transaction.creditLimit,
                        saveOption: this.saveOption,
                        txnRate: this.transaction.txnRate,
                        rate: this.transaction.txnRate,
                        status: 1, //1 open, 0 used,
                        approvedBy: this.transaction.approvedBy,
                        rejectedBy: {},
                        formTemplate: this.templatesForm[this.template],
                        specificDiscountItem: this.transaction.specificDiscountItem,
                        otherCharge: this.mOtherCharge,
                        otherChargeAmount: this.transaction.otherChargeAmount,
                        taxListTotal: this.taxListTotal,
                        progressingStatus: "",
                        customerDiscountItem: this.customerDiscountItem,
                        customerSaleUnit: this.customerSaleUnit,
                        loggedUser: this.loggedUser,
                        txnList: txnList,
                        publicLink: "",
                        usedDateAt: "",
                        deletedAt: "",
                        deleted: 0,
                        createdAt: new Date().toISOString().substr(0, 10),
                        saleOrderType: 0,
                        employee: this.mEmployee,
                        supplier: {},
                        exchangeRate: this.transaction.exchangeRate,
                        form: 1,
                        lead: this.transaction.lead,
                        amountDue: this.transaction.amountDue,
                        itemSubtotal: this.transaction.itemSubtotal,
                        exchangeItemSubtotal: this.transaction.exchangeItemSubtotal,
                        serviceSubtotal: this.transaction.serviceSubtotal,
                        exchangeServiceSubtotal: this.transaction.exchangeServiceSubtotal,
                        txnItmSubtotal: this.transaction.txnItmSubtotal,
                        exchangeTxnItmSubtotal: this.transaction.exchangeTxnItmSubtotal,
                        itemDiscount: this.transaction.itemDiscount,
                        exchangeItemDiscount: this.transaction.exchangeItemDiscount,
                        serviceDiscount: this.transaction.serviceDiscount,
                        exchangeServiceDiscount: this.transaction.exchangeServiceDiscount,
                        txnItmDiscount: this.transaction.txnItmDiscount,
                        exchangeTxnItmDiscount: this.transaction.exchangeTxnItmDiscount,
                        routeView: "sale_quote_view",
                        exspectedDate: "",
                    };
                    this.showLoading = true;
                    this.btnDisabled = true;
                    // window.console.log(data);
                    transactionHandler
                        .create(data)
                        .then((response) => {
                            this.showLoading = false;
                            this.btnDisabled = false
                            if (response.data.statusCode === 201) {
                                // this.$refs.form.reset();
                                this.$snotify.success("Successfully");
                                if (this.isSaveNew == true) {
                                    setTimeout(() => {
                                        this.setDefaultData();
                                    }, 10);
                                } else {
                                    this.close(response.data.data);
                                }
                            } else {
                                this.showLoading = false;
                                this.btnDisabled = false
                            }
                        })
                        .catch((e) => {
                            this.$snotify.error("Something went wrong");
                            this.errors.push(e);
                            // window.console.log(e);
                        });
                }, 10);
            });
        },
        dataBound() {
            this.schemaModelFields = {
                uom: {validation: {required: true}},
                price: {validation: {required: true}},
            };
        },
        async loadPaymentTermList() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (this.customer) {
                        const strFilter = '?id=' + this.customer.id + '&transactionDate=' + this.transaction.transactionDate + '&type=Customer'
                        this.transaction.paymentTerm = {}
                        paymentTermHandler_.get(strFilter).then((res) => {
                            if (res.data.statusCode === 200) {
                                const terms = res.data.data
                                this.transaction.paymentTerm = terms.term
                            }
                        });
                    }
                }, 10);
            });
        },
        async loadCreditLimit() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (this.customer) {
                        const strFilter = '?id=' + this.customer.id + '&transactionDate=' + this.transaction.transactionDate + '&type=Customer'
                        this.transaction.creditLimit = 0
                        creditLimitHandler.get(strFilter).then((res) => {
                            if (res.data.statusCode === 200) {
                                // this.creditLimitItem = res.data.data
                                const credit = res.data.data
                                this.transaction.creditLimit = kendo.parseFloat(credit.amount || 0);
                            }
                        });
                    }
                }, 10);
            });
        },
        async clearUOMItem() {
            let ds = this.$refs.saleQuoteItemLineDS.kendoWidget()
            ds.data().map(n => {
                n.set('uom', {})
            })
            this.isPriceLevelChanged = false
        },
        async loadQuote(id) {
            window.console.log(id, 'load id')
            this.showLoading = true
            transactionHandler.view(id).then((res) => {
                this.showLoading = false
                this.isEdit = true
                this.itemLines = []
                this.transaction = res.data.data[0]
                this.bindData();
            })
        },
        async loadSingleData() {
            this.btnDisabled = false
            if (this.$route.name === 'Sale Quote') {
                if (this.initSaleQuote) {
                    // Edit Mode
                    this.itemLines = []
                    this.transaction = this.initSaleQuote;
                    this.bindData();
                } else {
                    // new
                    if (this.$route.params.id != undefined) {
                        this.loadQuote(this.$route.params.id)
                    } else {
                        this.setDefaultData()
                    }
                }
                prefixHandler.get("sale quote").then((res) => {
                    if (res.data.statusCode === 200) {
                        this.showLoading = false;
                        this.transactionType = res.data.data;
                        if (this.transactionType.length > 0) {
                            if (
                                this.$route.params.id !== undefined ||
                                this.$route.params.id != ""
                            ) {
                                this.transaction.transactionType = this.transactionType[0];
                                if (!this.initSaleQuote && this.$route.params.id === undefined) {
                                    this.generateNumber();
                                }
                            }
                        }
                    }
                });
                await this.loadPaymentTerm();
                await this.loadSaleFormContent();
                await this.loadOtherCharge();
                await this.loadPriceLevel();
                await this.loadDiscountItem(0);
                await this.loadSaleChannel();
                await this.loadCatalogs();
                await this.loadLead();
                this.loadTax();
                this.loadSaleUnitItems();
                this.loadSegment();
                this.loadLocation();
                this.loadEmployeeCenter();
            }
        },
    },
    computed: {
        dateFormatted() {
            return kendo.toString(new Date(), institute.dateFormat);
        },
        dateTimeFormatted() {
            window.console.log(institute.dateFormat + " HH:mm", "inst date");
            return kendo.toString(new Date(), institute.dateFormat + " HH:mm");
        },
        validCustomer() {
            return this.customer.id !== undefined && this.customer.id !== null;
        },
        hiddenButton() {
            if (this.$route.query.type == "edit") {
                return true
            } else {
                return false
            }

        }
    },
    watch: {
        '$route': 'loadSingleData',
        // '$route': 'loadViewSaleQuote',
        initSaleQuote() {
            this.initialData();
        },
    },
    created() {
    },
    mounted: async function () {
        this.loadSingleData();
        this.requestData(0, this.filter, this.cusBaseUrl);
        this.requestData(0, this.filter, this.cusBaseUrl);
    },
};
</script>

<style scoped>
.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
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

.small_sidebar {
    height: 97%;
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

.detial_smallside_p {
    position: absolute;
    bottom: 12px;
}

.kendo_dropdown_custom .k-dropdown.k-header {
    width: 100%;
}
</style>
