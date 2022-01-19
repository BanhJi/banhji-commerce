<template>
    <v-app class="bg">
        <v-container class="pt-0">
            <v-row>

                <v-col sm="12" class="d-flex justify-center py-0">
                    <v-card
                        outlined
                        color="#e7e6e6"
                        dense
                        class="a4_head no_border"
                    >
                        <v-row>
                            <v-col sm="6" cols="12" class="py-0 pt-0">
                                <v-btn small @click="Print" class="btn_border mt mr-3 text-uppercase">{{ $t('print') }}
                                </v-btn>
                                <v-btn small @click="savePdf" color="btn_border mt text-uppercase">{{
                                        $t('download_pdf')
                                    }}
                                </v-btn>
                                <v-btn small color="#E7E6E6" @click="switchLocale" class="mt-12 ml-1">
                                    <v-img height="20" width="28"
                                           :src="require(`@/assets/images/${flag}`)" alt="User"
                                    />
                                    <span class="text-uppercase">{{ $t(language) }}</span>
                                </v-btn>
                            </v-col>
                            <v-col sm="6" cols="12" class="py-0">
                                <v-row>
                                    <v-col sm="7" class="pt-0">
                                        <p class="mt_60 mb-0 sm_sign_up">
                                            <router-link class="sign_up" :to="lang+'/signup'">Sign up</router-link>
                                            to BanhJi Conntect to interact with this company
                                        </p>
                                    </v-col>
                                    <v-col sm="5" cols="12" class="pt-0">
                                        <v-card color="primary" dense outlined
                                                class="btn_border text-center open_padding rounded-0">
                                            <p class="open">{{ invoiceStatus }}</p>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col sm="12" class="d-flex justify-center pt-1">
                    <div
                        style="background:#e7e6e6 "
                        id="invoice"
                        class="a4"
                    >
                        <div style="background: #E7E6E6">
                            <div
                                style="background: #fff"
                                class="pa-5"
                            >
                                <v-row>
                                    <v-col sm="7" cols="12" style="padding-right:0px; padding-top:0px" class="sm_box1">
                                        <div class="first_card" style=" background:#e2f0d9; padding:12px">
                                            <p class="font_11" style="margin-bottom: 8px">This invoice is issued by</p>
                                            <h3 class="font_20" style="margin-bottom: 8px">Banhji FinTech Co., Ltd</h3>
                                            <p class="font_16" style="margin-bottom: 8px">(VAT TIN) K005-901903599</p>
                                            <p class="font_12" style="margin-bottom: 4px">Address: Phnom Penh,
                                                Cambodia</p>
                                            <p class="font_12 ">Phone (Tel.)៖ +855 010/085 413 777 Email:
                                                info@banhji.com</p>
                                        </div>
                                    </v-col>
                                    <v-col sm="5" cols="12" style="padding-left:0px; padding-top:0px " class=" sm_box2">
                                        <v-row>
                                            <v-col cols="12" style="padding-top:0px; padding-bottom:0px">
                                                <div style="height:60px; background:green;  ">
                                                    <p style="color:#fff;font-size:30px;font-weight:bold;padding-top:20px; padding-left: 12px;margin-bottom: 0px !important;">
                                                        INVOICE</p>
                                                </div>
                                            </v-col>
                                            <v-col cols="12" style="padding-top:0px; padding-bottom:0px">
                                                <div
                                                    style="height:90px;background:#385622;padding-left:16px;padding-top:12px"
                                                    class="">
                                                    <p class="mb-2" style="color:#fff">Amount Due: </p>
                                                    <h3 class="white--text">{{ numberFormat(invoice.amountDue) }}</h3>
                                                </div>
                                            </v-col>
                                        </v-row>

                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="7" cols="12" style="padding-top:0px; padding-bottom:0px">
                                        <p class="mb-1 text-uppercase">bill to</p>
                                        <h3 class="font_16">Customer</h3>
                                        <h3 class="font_16">{{ customerName }}</h3>
                                        <h3 class="font_16">VATIN</h3>
                                        <h3 class="font_16">{{ vatin }}</h3>
                                        <p class="mb-1 text-capitalize mt-3">Billing Address</p>
                                        <h3 class="font_16">{{ billingAddress }}</h3>
                                    </v-col>
                                    <v-col sm="5" cols="12" style="padding-top:0px; padding-bottom:0px">
                                        <v-simple-table class="cash-balance mt-3">
                                            <template v-slot:default>
                                                <tbody>
                                                <tr>
                                                    <td class="text-left font_16">Number</td>
                                                    <td class="text-right text-bold font_16">{{ invoice.referenceNo }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left font_16">Date</td>
                                                    <td class="text-right text-bold font_16">
                                                        {{ formatDate(invoice.transactionDate) }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left font_16">Due Date</td>
                                                    <td class="text-right text-bold font_16">
                                                        {{ formatDate(invoice.dueDate) }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left font_16">Term</td>
                                                    <td class="text-right text-bold font_16">{{ paymentTerm }}</td>
                                                </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" class="py-0">
                                        <v-simple-table class="cash-balance mt-3">
                                            <LoadingMe
                                                :isLoading="showLoading"
                                                :fullPage="false"
                                                :myLoading="true"/>
                                            <kendo-datasource ref="itemLineDS1"
                                                              :data="itemLines"/>
                                            <kendo-grid id="gridItemLine1" class="grid-function"
                                                        :data-source-ref="'itemLineDS1'"
                                                        :sortable="false"
                                                        :column-menu="true"
                                                        :editable="false"
                                                        :scrollable-virtual="true">
                                                <kendo-grid-column
                                                    :title="$t('no.')"
                                                    :width="55"
                                                    :column-menu="false"
                                                    :template="rowNumberTmpl1"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5;',
                                                                    class: 'text-products'
                                                                }"
                                                    :attributes="{
                                                                    style: 'text-align: products'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'serviceDate'"
                                                    :title="$t('date_from')"
                                                    :width="160"
                                                    :hidden="!saleFormContent.serviceDate"
                                                    :template="'<span>#= kendo.toString(new Date(serviceDate), dateFormat)#</span>'"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'serviceDateTo'"
                                                    :title="$t('date_to')"
                                                    :width="160"
                                                    :hidden="!saleFormContent.serviceDateTo"
                                                    :template="'<span>#= kendo.toString(new Date(serviceDateTo), dateFormat)#</span>'"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'item'"
                                                    :title="$t('item')"
                                                    :template="itemTemplate"
                                                    :width="200"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :template="'<span>#=description#</span>'"
                                                    :width="160"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'qty'"
                                                    :title="$t('qty')"
                                                    :format="'{0:n}'"
                                                    :template="'<span>#=qty#</span>'"
                                                    :width="80"
                                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: left; '}"/>
                                                <kendo-grid-column
                                                    :field="'uom'"
                                                    :title="$t('uom')"
                                                    :width="100"
                                                    :template="UOMTemplate"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'price'"
                                                    :title="$t('price')"
                                                    :format="'{0:n}'"
                                                    :width="100"
                                                    :template="priceFormat"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :format="'{0:n}'"
                                                    :width="100"
                                                    :template="amountFormat"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'modifier'"
                                                    :title="$t('modifier')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :hidden="!saleFormContent.modifier"
                                                    :template="'<span>#=modifier.name?modifier.name:``#</span>'"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'discountItem'"
                                                    :title="$t('discount_item')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.discountItem"
                                                    :template="discountItemTemplate"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'vatTax'"
                                                    :title="$t('vat')"
                                                    :width="150"
                                                    :template="vatTemplate"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'specificTax'"
                                                    :title="$t('specificTax')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.specificTax"
                                                    :template="'<span>#=specificTax.defaultTax?specificTax.defaultTax:``#</span>'"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'otherTax'"
                                                    :title="$t('otherTax')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.otherTax"
                                                    :template="'<span>#=otherTax.defaultTax?otherTax.defaultTax:``#</span>'"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'publicLightingTax'"
                                                    :title="$t('pl_tax')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :hidden="!saleFormContent.publicLightingTax"
                                                    :template="'<span>#=publicLightingTax.defaultTax?publicLightingTax.defaultTax:``#</span>'"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'saleUnit'"
                                                    :title="$t('sale_unit')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.saleUnit"
                                                    :template="saleUnitTemplate"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>

                                                <kendo-grid-column
                                                    :field="'employee'"
                                                    :title="$t('employee')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.employee"
                                                    :template="empImpl"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                            </kendo-grid>
                                        </v-simple-table>
                                    </v-col>
                                </v-row>
                                <v-row class="mt-2">
                                    <v-col sm="7" cols="12" class="py-0">
                                        <p class="mb-2 font_16 text-capitalize">Message on invoice</p>
                                        <h3 class="font_16 text-bold">{{ transactionNote }}</h3>
                                    </v-col>
                                    <v-col sm="5" cols="12" class="py-0">
                                        <v-simple-table class="cash-balance mt-3">
                                            <template v-slot:default>
                                                <tbody>
                                                <tr>
                                                    <td class="text-left">{{ $t('subtotal') }}</td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">
                                                        {{ numberFormat(invoice.subTotal) }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left">{{
                                                            $t('general_discount')
                                                        }}
                                                    </td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">
                                                        ({{ numberFormat(invoice.discountTotal) }})
                                                    </td>
                                                </tr>
                                                <!--                                                                    <tr>-->
                                                <!--                                                                        <td class="text-left">{{ $t('delivery') }}</td>-->
                                                <!--                                                                        <td class="text-center">:</td>-->
                                                <!--                                                                        <td class="text-right">1,0000.00</td>-->
                                                <!--                                                                    </tr>-->
                                                <tr>
                                                    <td class="text-left">{{ $t('total_tax') }}
                                                        <v-btn @click="dialogTax=true"
                                                               class="text-white text-bold rounded-0 float-right text-uppercase"
                                                               style="height: 30px !important; background-color: rgb(0, 176, 80) !important">
                                                            {{ $t('tax') }}
                                                        </v-btn>
                                                    </td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">
                                                        {{ numberFormat(invoice.totalTaxAmount) }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left">{{ specificDiscount }}
                                                    </td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">
                                                        {{
                                                            numberFormat(invoice.specificDiscountTotal)
                                                        }}
                                                    </td>
                                                </tr>
                                                <tr v-for="item in invoice.otherCharge"
                                                    v-bind:key="item.id">
                                                    <td class="text-left text-uppercase">
                                                        {{ item.name }}
                                                    </td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">
                                                        {{ otherCharge(item) }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left text-uppercase">
                                                        {{ $t('total') }}
                                                    </td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right color_green text-bold">
                                                        {{ numberFormat(invoice.total) }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left">{{ $t('deposit') }} <span
                                                        class="float-right color_green">{{
                                                            numberFormat(invoice.depositAmount)
                                                        }}</span>
                                                    </td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">
                                                        {{ numberFormat(invoice.depositDeduction) }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left">{{ $t('remaining') }}</td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right color_green text-bold">
                                                        {{ numberFormat(invoice.remainingAmount) }}
                                                    </td>
                                                </tr>

                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-col>
                                </v-row>
                            </div>
                            <v-row>
                                <v-col sm="12" cols="12">
                                    <v-row>
                                        <!-- <v-col sm="2" cols="12" class="pr-1 py-0">
                                            <img style="height: 60px" class="log_sm"
                                                 src="@/assets/images/BanhJiPay.jpg"/>
                                        </v-col>
                                        <v-col sm="10" cols="12" class=" py-0">
                                            <p style="margin-bottom: 3px; border: 3px solid #1f3863; padding: 3px; font-family: 'Niradei-Black'; color: #1f3863; font-size: 16px;">
                                                CRN: {{ crn }}</p>
                                            <p style="font-size: 12px; margin-bottom: 2px; !important;line-height: 13px;">
                                                These code can be paid via internet, mobile, and agent banking, of the
                                                financial institutions show in this invoice. To use this OR Code, use
                                                the reader in mobile banking app.</p>
                                        </v-col> -->
                                        <v-col sm="12" cols="12" class="pr-1 py-0 flex_">
                                            <img style="height: 32px" class="log_sm_pay"
                                                 src="@/assets/images/BanhJiPay.jpg"/>
                                            <p class="_sm_pay"
                                               style="width:300px;margin-left:10px; margin-bottom: 0px; border: 3px solid #1f3863; padding: 3px; font-family: 'Niradei-Black'; color: #1f3863; font-size: 16px;">
                                                CRN: {{ crn }}</p>
                                            <p class="_sm_pay"
                                               style="font-size: 12px;margin-left:10px; margin-bottom: 0px; !important;line-height: 15px;">
                                                These code can be paid via internet, mobile, and agent banking, of the
                                                financial institutions show in this invoice. To use this OR Code, use
                                                the reader in mobile banking app.</p>
                                        </v-col>
                                        <v-col cols="12" class="py-0 sm_box3">
                                            <div
                                                style="background: #fff"
                                                class="px-5 py-0">
                                                <v-simple-table class="cash-balance mt-3 invoice_id_big">
                                                    <template v-slot:default>
                                                        <thead>
                                                        <tr>
                                                            <th class="text-uppercase">Code.</th>
                                                            <th class="text-uppercase">QR CODE</th>
                                                            <th class="text-uppercase">BARCODE</th>
                                                            <th class="text-uppercase">AMOUNT</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr v-for="item in invoiceScheduleList"
                                                            v-bind:key="item.paymentCode">
                                                            <td class="text-left font_16">
                                                                <h2 style="font-size: 20px !important; color: #00af50; margin-bottom: 0px !important">
                                                                    {{
                                                                        paymentCode(item.paymentCode)
                                                                    }}</h2>
                                                            </td>
                                                            <td style="padding: 0 6px !important;"
                                                                class="text-left text-bold font_16">
                                                                <qrcode :value="paymentCode(item.paymentCode)"
                                                                        :size="sqrSize" :encoding="'UTF_8'"></qrcode>
                                                            </td>
                                                            <td style="padding: 0 6px !important;"
                                                                class="text-left font_16">
                                                                <barcode :value="paymentCode(item.paymentCode)"
                                                                         :width="200" :height="55"/>
                                                            </td>
                                                            <td class="text-right text-bold font_16">
                                                                {{ numberFormat(item.amount) }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </div>
                                            <!--  -->
                                            <v-simple-table class="cash-balance mt-3 invoice_id_small">
                                                <template v-slot:default>
                                                    <thead>
                                                    <tr>
                                                        <th class="text-uppercase">
                                                            <span style="font-size: 20px !important;float:left;">20000018</span>
                                                            <span style="font-size: 20px !important; float:right;"> $1,5656,556</span>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="item in invoiceScheduleList"
                                                        v-bind:key="item.paymentCode">
                                                        <td class="text-left font_16">
                                                            <h2 style="font-size: 20px !important; color: #00af50; margin-bottom: 0px !important">
                                                                {{
                                                                    paymentCode(item.paymentCode)
                                                                }}</h2>
                                                        </td>
                                                        <td style="padding: 0 6px !important;"
                                                            class="text-left text-bold font_16">
                                                            <qrcode :value="'20000018'" :size="sqrSize"
                                                                    :encoding="'UTF_8'"></qrcode>
                                                        </td>
                                                        <td style="padding: 0 6px !important;"
                                                            class="text-left font_16">
                                                            <barcode :value="'20000018'"
                                                                     :width="200"
                                                                     :height="55"/>
                                                        </td>
                                                        <td class="text-right text-bold font_16">{{
                                                                numberFormat(item.amount)
                                                            }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                            <v-simple-table class="cash-balance mt-3 invoice_id_small">
                                                <template v-slot:default>
                                                    <thead>
                                                    <tr>
                                                        <th class="text-uppercase">
                                                            <span style="font-size: 20px !important;float:left;">20000018</span>
                                                            <span style="font-size: 20px !important; float:right;"> $1,5656,556</span>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="item in invoiceScheduleList"
                                                        v-bind:key="item.paymentCode">
                                                        <td class="text-left font_16">
                                                            <h2 style="font-size: 20px !important; color: #00af50; margin-bottom: 0px !important">
                                                                {{
                                                                    paymentCode(item.paymentCode)
                                                                }}</h2>
                                                        </td>
                                                        <td style="padding: 0 6px !important;"
                                                            class="text-left text-bold font_16">
                                                            <qrcode :value="'20000018'" :size="sqrSize"
                                                                    :encoding="'UTF_8'"></qrcode>
                                                        </td>
                                                        <td style="padding: 0 6px !important;"
                                                            class="text-left font_16">
                                                            <barcode :value="'20000018'"
                                                                     :width="200"
                                                                     :height="55"/>
                                                        </td>
                                                        <td class="text-right text-bold font_16">{{
                                                                numberFormat(item.amount)
                                                            }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col sm="12" cols="12">
                                    <p class="font_16 mb-2">The payment reference code and QR Code, can be used with the
                                        following financial institutions:</p>
                                    <div style="min-height:96px; background:#fff; padding:8px;">
                                        <v-row>
                                            <v-col cols="3" sm="2" class="py-0 px-1" v-for="b in bank"
                                                   v-bind:key="b.id">
                                                <img style="width:80px; margin:auto;  display: block;" class=""
                                                     v-bind:src="b.image"/>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                        <!-- <div  style="width: 100%;height: 6px; background: #1f224b;margin-top: 18px"></div> -->
                    </div>
                    <!-- ==================== -->
                    <!-- FOR PRINT -->
                    <!-- ==================== -->
                    <div
                        style="background:#E7E6E6; display: none"
                        id="invoice_print"
                        class="a4"
                    >

                        <div
                            style="background: #fff"
                            class="pagebreak"

                        >
                            <v-row>
                                <v-col sm="7" cols="7"
                                       style="padding-right:0px; padding-top:0px; padding-bottom: 12px; margin-bottom: 12px;"
                                       class="sm_box1">
                                    <div style="height:150px; background:#e2f0d9; padding:12px">
                                        <p class="font_11" style="margin-bottom: 8px">This invoice is issued by</p>
                                        <h3 class="font_20" style="margin-bottom: 8px">Banhji FinTech Co., Ltd</h3>
                                        <p class="font_16" style="margin-bottom: 8px">(VAT TIN) K005-901903599</p>
                                        <p class="font_12" style="margin-bottom: 4px">Address: Phnom Penh, Cambodia</p>
                                        <p class="font_12 ">Phone (Tel.)៖ +855 010/085 413 777 Email:
                                            info@banhji.com</p>
                                    </div>
                                </v-col>
                                <v-col sm="5" cols="5" style="padding-left:0px; padding-top:12px; margin-bottom: 12px">
                                    <v-row>
                                        <v-col cols="12" style="padding-top:0px; padding-bottom:0px">
                                            <div style="height:60px; background:green;  ">
                                                <p style="color:#fff;font-size:30px;font-weight:bold;padding-top:20px; padding-left: 12px;margin-bottom: 0px !important;">
                                                    INVOICE</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" style="padding-top:0px; padding-bottom:0px">
                                            <div
                                                style="height:90px;background:#385622;padding-left:16px;padding-top:12px"
                                                class="">
                                                <p style="color:#fff">{{ numberFormat(invoice.amountDue) }}</p>
                                            </div>
                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="7" cols="7" style="padding-top:0px; padding-bottom:0px">
                                    <p class="text-uppercase">bill to</p>
                                    <h3 style="margin-bottom: 6px" class="font_16">Customer</h3>
                                    <p class="text-capitalize mt-3">Billing Address</p>
                                    <h3 style="margin-bottom: 6px" class="font_16">No.07, Str 300, BKK 1, Phnom Penh,
                                        Cambodia</h3>
                                </v-col>
                                <v-col sm="5" cols="5" style="padding-top:0px; padding-bottom:0px">
                                    <v-simple-table class="cash-balance mt-3">
                                        <template v-slot:default>
                                            <tbody>
                                            <tr>
                                                <td class="text-left font_16">Number</td>
                                                <td class="text_right text-bold font_16">{{ invoice.referenceNo }}</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left font_16">Date</td>
                                                <td class="text_right text-bold font_16">
                                                    {{ formatDate(invoice.invoiceDate) }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-left font_16">Due Date</td>
                                                <td class="text_right text-bold font_16">
                                                    {{ formatDate(invoice.dueDate) }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-left font_16">Term</td>
                                                <td class="text_right text-bold font_16">{{ paymentTerm }}</td>
                                            </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="py-0">
                                    <v-simple-table class="cash-balance mt-3">
                                        <LoadingMe
                                            :isLoading="showLoading"
                                            :fullPage="false"
                                            :myLoading="true"/>
                                        <kendo-datasource ref="itemLineDS"
                                                          :data="itemLines"/>
                                        <kendo-grid id="gridItemLine" class="grid-function"
                                                    :data-source-ref="'itemLineDS'"
                                                    :sortable="false"
                                                    :column-menu="true"
                                                    :editable="false"
                                                    :scrollable-virtual="true">
                                            <kendo-grid-column
                                                :title="$t('no.')"
                                                :width="55"
                                                :column-menu="false"
                                                :template="rowNumberTmpl"
                                                :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5;',
                                                                    class: 'text-products'
                                                                }"
                                                :attributes="{
                                                                    style: 'text-align: products'
                                                                }"/>
                                            <kendo-grid-column
                                                :field="'serviceDate'"
                                                :title="$t('date_from')"
                                                :width="160"
                                                :hidden="!saleFormContent.serviceDate"
                                                :template="'<span>#= kendo.toString(new Date(serviceDate), dateFormat)#</span>'"
                                                :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                            <kendo-grid-column
                                                :field="'serviceDateTo'"
                                                :title="$t('date_to')"
                                                :width="160"
                                                :hidden="!saleFormContent.serviceDateTo"
                                                :template="'<span>#= kendo.toString(new Date(serviceDateTo), dateFormat)#</span>'"
                                                :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                            <kendo-grid-column
                                                :field="'item'"
                                                :title="$t('item')"
                                                :template="itemTemplate"
                                                :width="200"
                                                :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                            <kendo-grid-column
                                                :field="'description'"
                                                :title="$t('description')"
                                                :template="'<span>#=description#</span>'"
                                                :width="160"
                                                :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                            <kendo-grid-column
                                                :field="'qty'"
                                                :title="$t('qty')"
                                                :format="'{0:n}'"
                                                :template="'<span>#=qty#</span>'"
                                                :width="80"
                                                :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"
                                                :attributes="{style: 'text-align: left; '}"/>
                                            <kendo-grid-column
                                                :field="'uom'"
                                                :title="$t('uom')"
                                                :width="100"
                                                :template="UOMTemplate"
                                                :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                            <kendo-grid-column
                                                :field="'price'"
                                                :title="$t('price')"
                                                :format="'{0:n}'"
                                                :width="100"
                                                :template="priceFormat"
                                                :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                            <kendo-grid-column
                                                :field="'amount'"
                                                :title="$t('amount')"
                                                :format="'{0:n}'"
                                                :width="100"
                                                :template="amountFormat"
                                                :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                            <kendo-grid-column
                                                :field="'modifier'"
                                                :title="$t('modifier')"
                                                :format="'{0:n}'"
                                                :width="150"
                                                :hidden="!saleFormContent.modifier"
                                                :template="'<span>#=modifier.name?modifier.name:``#</span>'"
                                                :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                :attributes="{style: 'text-align: left' }"/>
                                            <kendo-grid-column
                                                :field="'discountItem'"
                                                :title="$t('discount_item')"
                                                :width="150"
                                                :hidden="!saleFormContent.discountItem"
                                                :template="discountItemTemplate"
                                                :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                            <kendo-grid-column
                                                :field="'vatTax'"
                                                :title="$t('vat')"
                                                :width="150"
                                                :template="vatTemplate"
                                                :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                :attributes="{style: 'text-align: left' }"/>
                                            <kendo-grid-column
                                                :field="'specificTax'"
                                                :title="$t('specificTax')"
                                                :width="150"
                                                :hidden="!saleFormContent.specificTax"
                                                :template="'<span>#=specificTax.defaultTax?specificTax.defaultTax:``#</span>'"
                                                :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                :attributes="{style: 'text-align: left' }"/>
                                            <kendo-grid-column
                                                :field="'otherTax'"
                                                :title="$t('otherTax')"
                                                :width="150"
                                                :hidden="!saleFormContent.otherTax"
                                                :template="'<span>#=otherTax.defaultTax?otherTax.defaultTax:``#</span>'"
                                                :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                :attributes="{style: 'text-align: left' }"/>
                                            <kendo-grid-column
                                                :field="'publicLightingTax'"
                                                :title="$t('pl_tax')"
                                                :format="'{0:n}'"
                                                :width="150"
                                                :hidden="!saleFormContent.publicLightingTax"
                                                :template="'<span>#=publicLightingTax.defaultTax?publicLightingTax.defaultTax:``#</span>'"
                                                :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                :attributes="{style: 'text-align: left' }"/>
                                            <kendo-grid-column
                                                :field="'saleUnit'"
                                                :title="$t('sale_unit')"
                                                :width="150"
                                                :hidden="!saleFormContent.saleUnit"
                                                :template="saleUnitTemplate"
                                                :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                :attributes="{style: 'text-align: left' }"/>

                                            <kendo-grid-column
                                                :field="'employee'"
                                                :title="$t('employee')"
                                                :width="150"
                                                :hidden="!saleFormContent.employee"
                                                :template="empImpl"
                                                :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                :attributes="{style: 'text-align: left' }"/>
                                        </kendo-grid>
                                    </v-simple-table>
                                </v-col>
                            </v-row>
                            <v-row class="mt-2">
                                <v-col sm="7" cols="7" class="py-0">
                                    <p class="mb-2 font_16 text-capitalize">Message on invoice</p>
                                    <h3 class="font_16 text-bold">{{ transactionNote }}</h3>
                                </v-col>
                                <v-col sm="5" cols="5" class="py-0">
                                    <v-simple-table class="cash-balance mt-3">
                                        <template v-slot:default>
                                            <tbody>
                                            <tr>
                                                <td class="text-left font_16">Subtotal</td>
                                                <td>:</td>
                                                <td class="text_right text-bold font_16">10,000.00</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left font_16">Discount</td>
                                                <td>:</td>
                                                <td class="text_right text-bold font_16">(1,0000)</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left font_16">Delivery</td>
                                                <td>:</td>
                                                <td class="text_right text-bold font_16">1,000.00</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left font_16">Total Tax</td>
                                                <td>:</td>
                                                <td class="text_right text-bold font_16">1,000.00</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left font_16">TOTAL</td>
                                                <td>:</td>
                                                <td class="text_right text-bold primary--text font_16">11,000.00</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left font_16">Deposit</td>
                                                <td>:</td>
                                                <td class="text_right text-bold font_16">10,000.00</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left font_16">Remaining</td>
                                                <td>:</td>
                                                <td class="text_right text-bold font_16">10,000.00</td>
                                            </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-col>
                            </v-row>
                        </div>
                        <v-row>
                            <v-col sm="12" cols="12">
                                <v-row>
                                    <v-col sm="12" cols="12" class="pr-1 py-0 flex_">
                                        <img style="height: 32px" class="log_sm_pay"
                                             src="@/assets/images/BanhJiPay.jpg"/>
                                        <p class="_sm_pay"
                                           style="width:300px;margin-left:10px; margin-bottom: 0px; border: 3px solid #1f3863; padding: 3px; font-family: 'Niradei-Black'; color: #1f3863; font-size: 16px;">
                                            CRN: {{ crn }}</p>
                                        <p class="_sm_pay"
                                           style="font-size: 12px;margin-left:10px; margin-bottom: 0px; !important;line-height: 15px;">
                                            These code can be paid via internet, mobile, and agent banking, of the
                                            financial institutions show in this invoice. To use this OR Code, use the
                                            reader in mobile banking app.</p>
                                    </v-col>
                                    <!-- <v-col cols="9" class=" py-0">
                                        <p class="font_18 sm_p mb-0 line_20">You can make payment of this invoice based
                                            on the following code:</p>
                                    </v-col> -->
                                    <v-col cols="12" class="py-0 sm_box3">
                                        <div
                                            style="background: #fff"
                                            class="px-5 py-0"
                                        >
                                            <v-simple-table class="cash-balance mt-3 invoice_id_big">
                                                <template v-slot:default>
                                                    <thead>
                                                    <tr>
                                                        <th style="text-align: left" class="text-uppercase">PAYMENT
                                                            REF.
                                                        </th>
                                                        <th style="text-align: left" class="text-uppercase">QR CODE</th>
                                                        <th style="text-align: left" class="text-uppercase">BARCODE</th>
                                                        <th style="text-align: right" class="text-uppercase">AMOUNT</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td class="text-left font_16">
                                                            <h2 style="font-size: 20px !important; color: #00af50; margin-bottom: 0px !important">
                                                                20000018</h2>
                                                        </td>
                                                        <td style="padding: 0 6px !important;"
                                                            class="text-right text-bold font_16">
                                                            <qrcode :value="'20000018'" :size="sqrSize"
                                                                    :encoding="'UTF_8'"></qrcode>
                                                        </td>
                                                        <td style="padding: 0 6px !important;"
                                                            class="text-left font_16">
                                                            <barcode :value="'20000018'"
                                                                     :width="300"
                                                                     :height="65"/>
                                                        </td>
                                                        <td class="text_right text-bold font_16">20560018</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 0 6px !important;"
                                                            class="text-left font_16">
                                                            <h2 style="font-size: 20px !important; color: #00af50; margin-bottom: 0px !important">
                                                                20099018</h2>
                                                        </td>
                                                        <td style="padding: 0 6px !important;"
                                                            class="text-right text-bold font_16">
                                                            <qrcode :value="'20099018'" :size="sqrSize"
                                                                    :encoding="'UTF_8'"></qrcode>
                                                        </td>
                                                        <td style="padding: 0 6px !important;"
                                                            class="text-left font_16">
                                                            <barcode :value="'20099018'"
                                                                     :width="300"
                                                                     :height="65"/>
                                                        </td>
                                                        <td class="text_right text-bold font_16">343443443$</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left font_16">
                                                            <h2 style="font-size: 20px !important; color: #00af50;  margin-bottom: 0px !important">
                                                                20099018</h2>
                                                        </td>
                                                        <td style="padding: 0 6px !important;"
                                                            class="text-right text-bold font_16">
                                                            <qrcode :value="'20099018'" :size="sqrSize"
                                                                    :encoding="'UTF_8'"></qrcode>
                                                        </td>
                                                        <td style="padding: 0 6px !important;"
                                                            class="text-left font_16">
                                                            <barcode :value="'20099018'"
                                                                     :width="300"
                                                                     :height="65"/>
                                                        </td>
                                                        <td class="text_right text-bold font_16">43343434</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left font_16">
                                                            <h2 style="font-size: 20px !important; color: #00af50;  margin-bottom: 0px !important">
                                                                20099018</h2>
                                                        </td>
                                                        <td style="padding: 0 6px !important;"
                                                            class="text-right text-bold font_16">
                                                            <qrcode :value="'20099018'" :size="sqrSize"
                                                                    :encoding="'UTF_8'"></qrcode>
                                                        </td>
                                                        <td style="padding: 0 6px !important;"
                                                            class="text-left font_16">
                                                            <barcode :value="'20099018'"
                                                                     :width="300"
                                                                     :height="65"/>
                                                        </td>
                                                        <td class="text_right text-bold font_16">43343434</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left font_16">
                                                            <h2 style="font-size: 20px !important; color: #00af50;  margin-bottom: 0px !important">
                                                                20099018</h2>
                                                        </td>
                                                        <td style="padding: 0 6px !important;"
                                                            class="text-right text-bold font_16">
                                                            <qrcode :value="'20099018'" :size="sqrSize"
                                                                    :encoding="'UTF_8'"></qrcode>
                                                        </td>
                                                        <td style="padding: 0 6px !important;"
                                                            class="text-left font_16">
                                                            <barcode :value="'20099018'"
                                                                     :width="300"
                                                                     :height="65"/>
                                                        </td>
                                                        <td class="text_right text-bold font_16">43343434</td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </div>
                                        <!-- for small screen  -->
                                        <v-simple-table class="cash-balance mt-3 invoice_id_small">
                                            <template v-slot:default>
                                                <thead>
                                                <tr>
                                                    <th class="text-uppercase">
                                                        <span
                                                            style="font-size: 20px !important;float:left;">20000018</span>
                                                        <span style="font-size: 20px !important; float:right;"> $1,5656,556</span>
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td class="text-left font_16">
                                                        <qrcode :value="'20000018'" :size="sqrSize"
                                                                :encoding="'UTF_8'"></qrcode>
                                                        <barcode :value="'20000018'"
                                                                 :height="75"/>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                        <v-simple-table class="cash-balance mt-3 invoice_id_small">
                                            <template v-slot:default>
                                                <thead>
                                                <tr>
                                                    <th class="text-uppercase">
                                                        <span
                                                            style="font-size: 20px !important;float:left;">20000018</span>
                                                        <span style="font-size: 20px !important; float:right;"> $1,5656,556</span>
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td style="text-align: center" class="text-left font_16">
                                                        <qrcode :value="'20000067'" :size="sqrSize"
                                                                :encoding="'UTF_8'"></qrcode>
                                                        <barcode :value="'20000067'"
                                                                 :height="75"/>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col sm="12" cols="12">
                                <p class="font_16" style="margin-bottom: 12px;">The payment reference code and QR Code,
                                    can be used with the following financial institutions:</p>
                                <div style="min-height:96px; background:#fff; padding:8px;">
                                    <v-row>
                                        <v-col cols="2" sm="2" class="py-0 px-1">
                                            <img style="width:80px; margin:auto;  display: block;" class=""
                                                 src="@/assets/images/amk.png"/>
                                        </v-col>
                                        <v-col cols="2" sm="2" class="py-0 px-1">
                                            <img style="width:80px; margin:auto;  display: block;" class=""
                                                 src="@/assets/images/wing.jpeg"/>
                                        </v-col>
                                        <v-col cols="2" sm="2" class="py-0 px-1">
                                            <img style="width:80px; margin:auto;  display: block;" class=""
                                                 src="@/assets/images/amret.png"/>
                                        </v-col>
                                        <v-col cols="2" sm="2" class="py-0 px-1">
                                            <img style="width:80px; margin:auto;  display: block;" class=""
                                                 src="@/assets/images/emoney.png"/>
                                        </v-col>
                                        <v-col cols="2" sm="2" class="py-0 px-1">
                                            <img style="width:80px; margin:auto;  display: block;" class=""
                                                 src="@/assets/images/emoney.png"/>
                                        </v-col>
                                        <v-col cols="2" sm="2" class="py-0 px-1">
                                            <img style="width:80px; margin:auto;  display: block;" class=""
                                                 src="@/assets/images/emoney.png"/>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                    <!-- end print section -->
                </v-col>
                <!-- Footer  -->
                <v-col sm="12" cols="12" class="py-0 mt-6">
                    <v-card dense color="#e7e6e6" outlined class="btn_border rounded-0">
                        <v-row>
                            <v-col sm="12" cols="12" class="d-flex justify-center py-0">
                                <div class="d-flex">
                                    <p class="mb-0 mr-3 font_14 mt-2">Powered by</p>
                                    <img class="img_center" width="120px" src="@/assets/images/banhji-logo-r.png"/>
                                </div>
                            </v-col>
                            <v-col sm="12" cols="12" class="py-0 text-center">
                                <p class="mb-1 mt-2 font_14">Manage your finance with BanhJi.
                                    <router-link class="sign_up_now" :to="lang+'/signup'"> Sign Up Now</router-link>
                                </p>
                                <p class="font_14 grey--text mt-2">{{ widhtWindow }} &#169; 2016-{{ date }} BanhJi
                                    FinTech Co., Ltd. <a href="" class="privacy_security">Privacy Policy</a> • <a
                                        class="privacy_security" href="">Security</a></p>
                            </v-col>
                        </v-row>

                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
import {i18n} from "@/i18n";
import {QRCode, Barcode} from '@progress/kendo-barcodes-vue-wrapper'
import html2pdf from 'html2pdf.js'
import SaleFormContentModel from "@/scripts/model/SaleFormContent";

const saleFormContentHandler = require("@/scripts/saleFormContentHandler")
import InvoiceModel from "@/scripts/invoice/model/Invoice";

const saleFormContentModel = new SaleFormContentModel({})
const invoiceModel = new InvoiceModel({})
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
import {Trans} from '@/plugins/Translation'
import kendo from "@progress/kendo-ui";

export default {
    name: "Invoice",
    components: {
        'qrcode': QRCode,
        'barcode': Barcode,
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        showLoading: true,
        qrCodeValue: "fdhdhfd",
        flag: 'us.jpg',
        language: 'english',
        locale: 'us',
        sqrSize: 50,
        widhtWindow: window.innerWidth,
        invoice_data: [],
        date: new Date().getFullYear(),
        invoice: invoiceModel,
        itemLines: invoiceModel,
        saleFormContent: saleFormContentModel,
        dateFormat: invoiceModel.dateFormat,
        invoiceScheduleList: []
    }),
    computed: {
        lang() {
            return "/" + i18n.locale;
        },
        specificDiscount() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('specificDiscountItem')) {
                    if (this.invoice.specificDiscountItem.hasOwnProperty('id')) {
                        return this.invoice.specificDiscountItem.name
                    }

                }
            }
            return ''
        },
        invoiceStatus() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('status')) {
                    const status = this.invoice.status
                    let statusText = ''
                    switch (status) {
                        case 1:
                            statusText = 'OPEN'
                            break
                        case 2:
                            statusText = 'CLOSED'
                            break
                        case 4:
                            statusText = 'VOID'
                            break
                    }
                    return statusText
                }
            }
            return ''
        },
        paymentTerm() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('paymentTerm')) {
                    if (this.invoice.paymentTerm.hasOwnProperty('id')) {
                        return this.invoice.paymentTerm.name
                    }
                }
            }
            return ''
        },
        customerName() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('customer')) {
                    if (this.invoice.customer.hasOwnProperty('id')) {
                        return this.invoice.customer.name
                    }
                }
            }
            return ''
        },
        crn() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('customer')) {
                    if (this.invoice.customer.hasOwnProperty('crn')) {
                        return this.invoice.customer.crn
                    }
                }
            }
            return '-'
        },
        currency() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('priceLevel')) {
                    if (this.invoice.priceLevel.hasOwnProperty('currency')) {
                        return this.invoice.priceLevel.currency.code
                    }
                }
            }
            return ''
        },
        billingAddress() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('billingAddress')) {
                    if (this.invoice.billingAddress.hasOwnProperty('id')) {
                        return this.invoice.billingAddress.name
                    }
                }
            }
            return ''
        },
        transactionNote() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('transactionNote')) {
                    return this.invoice.transactionNote
                }
            }
            return ''
        },
        vatin() {
            if (this.invoice) {
                if (this.invoice.hasOwnProperty('taxId')) {
                    return this.invoice.taxId
                }
            }
            return '-'
        },
        bank() {
            if (this.invoice) {
                let banks = []
                if (this.invoice.hasOwnProperty('paymentOptionWBMobile')) {
                    if (this.invoice.paymentOptionWBMobile.hasOwnProperty('bank')) {
                        const wBank = this.invoice.paymentOptionWBMobile.bank
                        wBank.forEach(m => {
                            let itm = m.bank
                            banks.push({
                                id: itm.uuid,
                                name: itm.name,
                                abbr: itm.abbr,
                                image: itm.image
                            })
                        })
                    }
                }
                if (this.invoice.hasOwnProperty('paymentOptionOnline')) {
                    if (this.invoice.paymentOptionOnline.hasOwnProperty('bank')) {
                        const oBank = this.invoice.paymentOptionOnline.bank
                        oBank.forEach(m => {
                            let itm = m.bank
                            banks.push({
                                id: itm.uuid,
                                name: itm.name,
                                abbr: itm.abbr,
                                image: itm.image
                            })
                        })
                    }
                }
                if (this.invoice.hasOwnProperty('paymentOptionKHQR')) {
                    if (this.invoice.paymentOptionKHQR.hasOwnProperty('bank')) {
                        const kHBank = this.invoice.paymentOptionKHQR.bank
                        kHBank.forEach(m => {
                            let itm = m.bank
                            banks.push({
                                id: itm.uuid,
                                name: itm.name,
                                abbr: itm.abbr,
                                image: itm.image
                            })
                        })
                    }
                }
                const bank = []
                banks.forEach(function (item) {
                    let i = bank.findIndex(x => x.id === item.id)
                    if (i <= -1) {
                        bank.push({id: item.id, name: item.name, abbr: item.abbr, image: item.image})
                    }
                })
                // window.console.log([...new Set(bank)], '---')
                return [...new Set(bank)]
            }
            return []
        }
    },
    methods: {
        async loadPaymentScheduleList() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    billingHandler.scheduleList(this.$route.params.id).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.invoiceScheduleList = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async loadSaleFormContent() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    saleFormContentHandler.list().then(res => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data
                            if (data.length > 0) {
                                this.saleFormContent = data[0]
                            }
                        }
                    })
                }, 300)
            })
        },
        async loadLinkInvoice() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    if (this.$route.params.id) {
                        this.showLoading = true
                        window.console.log(this.$route, 'idd')
                        const queryString = this.$route.query
                        let linkId = this.$route.params.id
                        if (queryString.hasOwnProperty('from')) {
                            linkId = linkId + 'from=' + queryString.from
                        }
                        billingHandler.linkView(linkId).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.invoice = res.data.data[0]
                                // window.console.log(this.invoice)
                                this.itemLines = this.invoice.itemLines
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }

                }, 300)
            })
        },
        checkWidth() {
            if (this.widhtWindow < 840) {
                this.sqrSize = 90
            } else {
                this.sqrSize = 50
            }
        },
        generateReport() {
            this.$refs.html2Pdf.generatePdf()
        },
        getBase64Image(img) {
            var c = document.createElement('canvas');
            c.height = img.naturalHeight;
            c.width = img.naturalWidth;
            var ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0, c.width, c.height);
            var base64String = c.toDataURL();
            return base64String
        },
        Print() {
            var divContents = document.getElementById("invoice_print").innerHTML;
            var win = window.open('', 'invoice', 'width=1290.7, height=800');
            var doc = win.document.open();
            var htmlStart = `
                <html>
                    <header>
                        <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
                        <link rel="preconnect" href="https://fonts.gstatic.com">
                        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400&display=swap" rel="stylesheet">
                        <style rel="stylesheet" media="print">
                        @font-face {
                                font-family: 'Niradei-Regular';
                                font-weight: 600;
                                font-display: swap;
                                font-style: normal;
                                src: local('Niradei'), local('Niradei-Regular'), url('@/assetts/styles/fonts/Niradei-Regular.woff2') format('woff2');
                            }

                            @font-face {
                                font-family: 'Niradei-Bold';
                                font-weight: bold;
                                font-display: swap;
                                font-style: normal;
                                src: local('Niradei'), local('Niradei-Bold'), url('@/assetts/styles/fonts/Niradei-Bold.woff2') format('woff2');
                            }
                            body {
                                -webkit-print-color-adjust: exact;
                                font-family: 'Noto Sans JP', sans-serif !important;
                                print-color-adjust: exact;

                             }
                            p{
                                font-family: 'Noto Sans JP', sans-serif !important;
                            }

                            .text-bold{
                               font-weight: bold !important;
                            }
                            .font_10 {
                                font-size: 10px !important;
                            }
                            .font_11 {
                                font-size: 11px !important;
                            }
                            .font_12 {
                                font-size: 12px !important;
                            }
                            .font_13 {
                                font-size: 13px !important;
                            }
                            .font_14 {
                                font-size: 14px !important;
                            }
                            .font_16 {
                                font-size: 16px !important;
                            }
                            .font_18 {
                                font-size: 18px !important;
                            }

                            .font_20 {
                                font-size: 20px !important;
                            }
                            .font_22 {
                                font-size: 22px !important;
                            }
                            .font_24 {
                                font-size: 24px !important;
                            }
                            .font_26 {
                                font-size: 26px !important;
                            }
                            .font_28 {
                                font-size: 28px !important;
                            }
                            .font_30 {
                                font-size: 30px !important;
                            }
                            .font_34 {
                                font-size: 34px !important;
                            }
                            .text_right{
                                text-align: right;
                            }
                            .text-left{
                                text-align: left;
                            }
                            @page {
                                size: A4;
                            }
                            @media print {
                                html, body {
                                    font-family: 'Noto Sans JP', sans-serif !important;
                                    margin: 6;
                                    margin-top: 20;
                                    margin-bottom: 30;
                                    margin-right: 20;
                                    width: 21cm;
                                    height: 29.7cm;
                                    -webkit-print-color-adjust: exact !important;
                                    print-color-adjust: exact;
                                },
                                .pagebreak {
                                    clear: both;
                                    margin-top: 30mm;
                                    page-break-before: always !important;
                                    page-break-after: always !important;
                                }
                            }

                            .bg{
                                background: #e7e6e6 !important;
                            }
                            .btn_border{
                                border: 1px solid #c2baba
                            }

                            .theme--light.v-sheet--outlined {
                                border: none !important;
                            }
                            .invoicetext{
                                font-size: 32px;
                                color: #fff;
                                margin-top: 0;
                                padding-top: 22px;
                                padding-left: 10px;
                                text-transform: uppercase;
                                font-family: "Niradei-Bold"
                            }
                            .v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
                                height: 36px !important;
                            }
                            .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
                                color: #000;
                                font-size: 14px;
                                font-family: "Niradei-Bold"
                            }
                            @media(max-width: 600px){

                                .log_sm{
                                    margin: auto;
                                    width: 160px;
                                    margin-top: 20px;
                                }
                                .sm_p{
                                    text-align: left;
                                }
                                .sm_center{
                                    text-align: center;
                                }
                                .invoice_id_small{
                                    display: none;
                                }
                                .invoice_id_big{
                                    display: block;
                                }


                            }
                            @media(min-width: 769px){
                                .invoice_id_small{
                                    display: none;
                                }
                                .invoice_id_big{
                                    display: block;
                                }
                            }
                        </style>
                    </header>
                    <body>
                    </body>
                </html>
            `
            let hmtlEnd = '</div></body>' + '</html>';
            doc.write(htmlStart + divContents + hmtlEnd);
            doc.close();
            setTimeout(function () {
                win.print();
                win.close();
            }, 2000);
        },
        savePdf() {
            const options = {
                margin: 0.3,
                filename: 'filename.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 2
                },
                jsPDF: {
                    unit: 'in',
                    format: 'a4',
                    orientation: 'portrait'
                }
            }
            var invoice = document.getElementById('invoice').innerHTML
            html2pdf().from(invoice).set(options).save();
        },
        switchLocale() {
            if (this.locale == 'en') {
                this.flag = 'us.jpg'
                this.locale = 'kh'
                this.language = "english"
                let _local = this.locale
                const to = this.$router.resolve({params: {locale: _local}})
                return Trans.changeLocale(_local).then(() => {
                    this.$router.push(to.location)
                })
            } else {
                this.flag = 'kh.jpg'
                this.locale = 'en'
                this.language = "khmer"
                let _local = this.locale
                const to = this.$router.resolve({params: {locale: _local}})
                return Trans.changeLocale(_local).then(() => {
                    this.$router.push(to.location)
                })
            }
        },
        status(value) {
            let statusText = ''
            switch (value) {
                case 1:
                    statusText = 'OPEN'
                    break
                case 2:
                    statusText = 'CLOSED'
                    break
                case 4:
                    statusText = 'VOID'
                    break
            }
            return statusText
        },
        numberFormat(value) {
            return kendo.toString(value, `n${this.saleFormContent.decimal}`)
        },
        formatDate(value) {
            return kendo.toString(new Date(value), this.dateFormat)
        },
        paymentCode(code) {
            return code.replace('psc-', '')
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        rowNumberTmpl1(dataItem) {
            let ds = this.$refs.itemLineDS1.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        vatTemplate(dataItem) {
            const vat = dataItem.vatTax
            if (vat) {
                return `<span>${vat.defaultTax ? vat.defaultTax : ``}</span>`
            } else {
                return ``
            }
        },
        itemTemplate(dataItem) {
            const item = dataItem.item
            if (item) {
                return `<span>${item.name ? item.name : ``}</span>`
            } else {
                return ``
            }
        },
        UOMTemplate(dataItem) {
            const uom = dataItem.uom
            if (uom) {
                return `<span>${uom.uom ? uom.uom.toUOM.name : ``}</span>`
            } else {
                return ``
            }
        },
        saleUnitTemplate(dataItem) {
            const saleUnit = dataItem.saleUnit
            if (saleUnit) {
                return `<span>${saleUnit.name ? saleUnit.name : ``}</span>`
            } else {
                return ``
            }
        },
        discountItemTemplate(dataItem) {
            const discountItem = dataItem.discountItem
            if (discountItem) {
                return `<span>${discountItem.code ? discountItem.code : ``} - ${discountItem.name ? discountItem.name : ``}</span>`
            } else {
                return ``
            }
        },
        empImpl(dataItem) {
            let empIds = []
            dataItem.employee.forEach(m => {
                empIds.push(m.firstName + ' - ' + m.lastName)
            })
            // window.console.log(empIds.join(', '))
            return `<span>${empIds.join(', ')}</span>`
        },
        amountFormat(value) {
            return kendo.toString(value.amount, `n${this.saleFormContent.decimal}`)
        },
        priceFormat(value) {
            return kendo.toString(value.price, `n${this.saleFormContent.decimal}`)
        },
        autoCalculateDiscount(discountItem, subTotal) {
            if (discountItem) {
                const nature = discountItem.nature || ''
                const amount = discountItem.amount || 0
                if (nature === 'Amount') {
                    return parseFloat(amount)
                } else if (nature === 'Percentage') {
                    return (subTotal * (parseFloat(amount) / 100))
                }else{
                    return 0
                }
            }else{
                return 0
            }
        },
        otherCharge(obj) {
            if (this.invoice) {
                const amount = this.autoCalculateDiscount(obj, this.invoice.subTotal)
                return this.numberFormat(amount)
            }
            return 0
        },
    },
    mounted: async function () {
        this.checkWidth()
        await this.loadSaleFormContent()
        await this.loadLinkInvoice()
        await this.loadPaymentScheduleList()
    }
}
</script>
<style scoped>
.a4 {
    width: 21cm;
    /* height: 29.7cm;  */
    /* height: 28.7cm; */
}

.a4_head {
    width: 21cm;
}

.first_card {
    height: 150px;
}

.mt {
    margin-top: 52px !important;
}

.bg {
    background: #e7e6e6 !important;
}

.grey_text {
    color: red;
}

.btn_border {
    border: 1px solid #c2baba
}

.mt_60 {
    margin-top: 52px;
}

.theme--light.v-sheet--outlined {
    border: none !important;
}

.open {
    font-size: 35px;
    color: #fff;
    margin-top: 6px;
    text-transform: uppercase;
    font-family: "Niradei-Bold"
}

.open_padding {
    padding-top: 50px;
    height: 90px;
}

.invoicetext {
    font-size: 32px;
    color: #fff;
    margin-top: 0;
    padding-top: 22px;
    padding-left: 10px;
    text-transform: uppercase;
    font-family: "Niradei-Bold"
}

.sign_up {
    font-family: "Niradei-Bold"
}

.sign_up_now {
    font-family: "Niradei-Bold";
    color: #0975c3 !important;
}

.privacy_security {
    color: #596b7f !important;
    font-family: "Niradei-Bold";
    text-decoration: underline !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
    height: 36px !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    color: #000;
    font-size: 14px;
    font-family: "Niradei-Bold"
}

.flex_ {
    display: flex;
}

@media (max-width: 760px) {
    .a4 {
        width: 100%;
        height: auto;
    }

    .first_card {
        height: 172px;
    }

    .a4_head {
        width: auto;
    }

    .open {
        height: 50px !important;
    }

    .open_padding {
        padding-top: 18px;
        height: 60px;
    }

    .sm_box1 {
        padding-right: 12px !important;
    }

    .sm_box2 {
        padding-left: 12px !important;
    }

    .sm_box3 {
        padding-right: 21px !important;
    }

    .log_sm {
        margin: auto;
        width: 160px;
        margin-top: 20px;
    }

    .sm_p {
        text-align: left;
    }

    .sm_center {
        text-align: center;
    }

    .sm_sign_up {
        margin-top: 20px;
    }

    .invoice_id_small {
        display: block;
    }

    .invoice_id_big {
        display: none;
    }

    .invoice_id_big_t {
        display: none;
    }

    ._sm_pay {
        margin-left: 0px !important;
    }

    .flex_ {
        display: block;
    }

}

@media (min-width: 769px) {
    .invoice_id_small {
        display: none;
    }

    .invoice_id_big {
        display: block;
    }
}
</style>