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
                                        <h2 class="mb-0">{{ $t('credit_memo') }} #{{ creditMemo.referenceNo }}</h2>
                                        <v-icon v-if="isHideBar"
                                                onclick="window.history.go(-1); return false;"
                                                style="cursor: pointer; font-size: 40px;"
                                                color="grey"
                                                class="float-right"
                                        >close
                                        </v-icon>
                                        <span style="transition: .3s ease-in; z-index:10;"
                                              :class="{'iconArrow': !isHideBar,'iconArrowHide': isHideBar }">
                                            <v-icon size="22"
                                                    class="arr_icon"
                                                    @click="hideSmallSideBar"
                                                    v-if="isHideBar"> mdi-chevron-left-circle
                                            </v-icon>
                                            <v-icon size="22"
                                                    class="arr_icon"
                                                    @click="hideSmallSideBar"
                                                    v-if="!isHideBar"> mdi-chevron-right-circle
                                            </v-icon>
										</span>
                                    </v-card>
                                    <v-card outlined dense class="px-3 no_border" color="grayBg">
                                        <v-row>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t('customer') }}</label>
                                                <h3 class="text-bold  py-1">{{ customerName }}</h3>
                                            </v-col>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t('date') }}</label>
                                                <h3 class="text-bold  py-1">{{ transactionDate }}</h3>
                                            </v-col>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t('price_level') }}</label>
                                                <h3 class="text-bold  py-1">{{ priceLevel }}</h3>
                                            </v-col>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t('currency') }}</label>
                                                <h3 class="text-bold  py-1">{{ currencyCode }}</h3>
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row class="pt-3" style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <kendo-datasource ref="itemLineDS"
                                                              :data="itemLines"/>
                                            <kendo-grid id="gridItemLine" class="grid-function"
                                                        :data-source-ref="'itemLineDS'"
                                                        :sortable="false"
                                                        :column-menu="true"
                                                        :editable="false"
                                                        :noRecords="true"
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
                                                    :hidden="true"
                                                    :width="200"
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
                                                    :width="200"
                                                    :template="priceTemplate"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: right'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :headerTemplate="amountLineHeaderTemplate"
                                                    :width="200"
                                                    :template="amtTemplate"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: right'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'discountItem'"
                                                    :title="$t('discount_item')"
                                                    :width="200"
                                                    :template="discountItemTemplate"
                                                    :hidden="true"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'vatTax'"
                                                    :title="$t('vat')"
                                                    :width="200"
                                                    :template="vatTemplate"
                                                    :hidden="true"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'specificTax'"
                                                    :title="$t('specific_tax')"
                                                    :width="200"
                                                    :template="'<span>#=specificTax.defaultTax?specificTax.defaultTax:``#</span>'"
                                                    :hidden="true"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'otherTax'"
                                                    :title="$t('other_tax')"
                                                    :width="200"
                                                    :template="'<span>#=otherTax.defaultTax?otherTax.defaultTax:``#</span>'"
                                                    :hidden="true"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'publicLightingTax'"
                                                    :title="$t('pl_tax')"
                                                    :width="200"
                                                    :template="'<span>#=publicLightingTax.defaultTax?publicLightingTax.defaultTax:``#</span>'"
                                                    :hidden="true"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'saleUnit'"
                                                    :title="$t('sale_unit')"
                                                    :width="200"
                                                    :template="saleUnitTemplate"
                                                    :hidden="true"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row>
                                                <v-col sm="7" cols="12" class="">
                                                </v-col>
                                                <v-col sm="5" cols="12" class="">
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <tbody>
                                                            <tr>
                                                                <td class="text-left text-uppercase">
                                                                    {{ $t('total') }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right primary--text text-bold">
                                                                    {{
                                                                        numberFormat(creditMemo.itemLineExchangeAmount)
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
                                    <v-row class="pt-3" style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <h3 class="mb-0 text-uppercase grey--text mb-3">
                                                {{ $t("apply_to") }}
                                            </h3>
                                            <kendo-datasource
                                                ref="applyToLineDS"
                                                :data="applyToLines"/>
                                            <kendo-grid
                                                id="gridApplyTo"
                                                ref="gridApplyTo"
                                                class="grid-function"
                                                :data-source-ref="'applyToLineDS'"
                                                :sortable="false"
                                                :filterable="false"
                                                :column-menu="true"
                                                :editable="false"
                                                :noRecords="true"
                                                :scrollable-virtual="true">
                                                <!--                                                                <kendo-grid-norecords>-->
                                                <!--                                                                    <div  class="k-loading-mask customPosition"><span class='k-loading-text'></span><div class='k-loading-image'/>-->
                                                <!--                                                                        <div class='k-loading-color'/></div>-->
                                                <!--                                                                </kendo-grid-norecords>-->
                                                <kendo-grid-column
                                                    :title="$t('no.')"
                                                    :template="rowNumberTmplApply"
                                                    :width="55"
                                                    :editable="()=>{ return false}"
                                                    :column-menu="false"
                                                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-products', }"
                                                    :attributes="{  style: 'text-align: products', }"/>
                                                <kendo-grid-column
                                                    :field="'referenceNo'"
                                                    :title="$t('number')"
                                                    :width="150"
                                                    :editable="()=>{ return false}"
                                                    :template="'<span>#=referenceNo||``#</span>'"
                                                    :headerAttributes="{ style:'background-color: #EDF1F5'}"/>
                                                <kendo-grid-column
                                                    :field="'paymentCode'"
                                                    :title="$t('prc')"
                                                    :editable="()=>{ return false}"
                                                    :width="150"
                                                    :headerAttributes="{ style:'background-color: #EDF1F5',}"/>
                                                <kendo-grid-column
                                                    :field="'currencyCode'"
                                                    :title="$t('currency')"
                                                    :width="150"
                                                    :editable="()=>{ return false}"
                                                    :headerAttributes="{ style:'text-align: right; background-color: #EDF1F5',}"
                                                    :attributes="{ style:'text-align: right', }"/>
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :width="200"
                                                    :editable="()=>{ return false}"
                                                    :template="'<span>#=kendo.toString(amount || 0, decimalFormat)#</span>'"
                                                    :headerAttributes="{ style:'text-align: right; background-color: #EDF1F5',}"
                                                    :attributes="{ style:'text-align: right', }"/>
                                                <kendo-grid-column
                                                    :field="'rateTobase'"
                                                    :title="$t('rate')"
                                                    :width="200"
                                                    :hidden="true"
                                                    :editable="()=>{ return false}"
                                                    :headerAttributes="{ style:'text-align: right; background-color: #EDF1F5',}"
                                                    :attributes="{ style:'text-align: right', }"/>
                                                <kendo-grid-column
                                                    :field="'paidAmount'"
                                                    :title="$t('paid_amount')"
                                                    :template="'<span>#=kendo.toString(paidAmount || 0, decimalFormat)#</span>'"
                                                    :width="200"
                                                    :editable="()=>{ return true}"
                                                    :headerAttributes="{ style:'text-align: right; background-color: #EDF1F5',}"
                                                    :attributes="{ style:'text-align: right', }"/>
                                            </kendo-grid>
                                            <v-row>
                                                <v-col sm="7" cols="7" class="pt-0">
                                                </v-col>
                                                <v-col sm="5" cols="5" class="pt-0">
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <tbody>
                                                            <tr>
                                                                <td class="text-left text-uppercase">
                                                                    {{ $t('total') }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right primary--text text-bold">
                                                                    {{
                                                                        numberFormat(creditMemo.applyToExchangeAmount)
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
                                            <h3 class="mb-0 text-uppercase grey--text mb-3">
                                                {{ $t("customer_credit") }}
                                            </h3>
                                            <kendo-datasource
                                                ref="depositLineDS"
                                                :data="depositLines"/>
                                            <kendo-grid
                                                id="gridDeposit"
                                                ref="gridDeposit"
                                                class="grid-function"
                                                :data-source-ref="'depositLineDS'"
                                                :sortable="false"
                                                :filterable="false"
                                                :column-menu="true"
                                                :editable="false"
                                                :noRecords="true"
                                                :scrollable-virtual="true">
                                                <kendo-grid-column
                                                    :field="'account'"
                                                    :title="$t('account')"
                                                    :width="200"
                                                    :template="'<span>#=account.name||``#</span>'"
                                                    :headerAttributes="{  style: 'background-color: #EDF1F5',}"/>
                                                <kendo-grid-column
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :width="200"
                                                    :headerAttributes="{  style: 'background-color: #EDF1F5', }"/>
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :width="200"
                                                    :template="amtTemplate"
                                                    :headerTemplate="amountLineHeaderTemplate"
                                                    :headerAttributes="{ style: 'text-align: right; background-color: #EDF1F5',  }"
                                                    :attributes="{ style: 'text-align: right', }"/>
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <h3 class="mb-0 text-uppercase grey--text mb-3">
                                                {{ $t("cash_refund") }}
                                            </h3>
                                            <kendo-datasource ref="cashRefundDS"
                                                              :data="cashRefundLines"/>
                                            <kendo-grid id="gridCashRefund" class="grid-function"
                                                        :data-source-ref="'cashRefundDS'"
                                                        :sortable="false"
                                                        :filterable="false"
                                                        :column-menu="true"
                                                        :editable="false"
                                                        :scrollable-virtual="true">
                                                <kendo-grid-column
                                                    :field="'account'"
                                                    :title="$t('account')"
                                                    :width="200"
                                                    :template="accountTemplate"
                                                    :headerAttributes="{
                                                                        style: 'background-color: #EDF1F5'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :width="200"
                                                    :template="'<span>#=description#</span>'"
                                                    :headerAttributes="{
                                                                        style: 'background-color: #EDF1F5'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'method'"
                                                    :title="$t('method')"
                                                    :width="200"
                                                    :template="methodTemplate"
                                                    :headerAttributes="{
                                                                        style: 'background-color: #EDF1F5'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'refNo'"
                                                    :title="$t('payment_ref')"
                                                    :width="150"
                                                    :hidden="true"
                                                    :headerAttributes="{
                                                                            style: 'text-align: right; background-color: #EDF1F5'
                                                                        }"
                                                    :attributes="{
                                                                            style: 'text-align: right'
                                                                        }"/>
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :headerTemplate="amountLineHeaderTemplate"
                                                    :width="200"
                                                    :template="amountTemplate"
                                                    :headerAttributes="{
                                                                            style: 'text-align: right; background-color: #EDF1F5'
                                                                        }"
                                                    :attributes="{
                                                                            style: 'text-align: right'
                                                                        }"/>
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-row>
                                                <v-col sm="6" cols="6" class="pt-0">
                                                    <v-card class="no-boxshadow pa-3" color="grayBg">
                                                        <v-row>
                                                            <v-col sm="6" cols="6" class="py-0">
                                                                <label>{{ $t('message_on_invoice') }}</label>
                                                                <h4 class="text-bold py-2 font_16">
                                                                    {{ transactionNote }}</h4>
                                                            </v-col>
                                                            <v-col sm="6" cols="6" class="py-0">
                                                                <label>{{ $t('message_for_journal') }}</label>
                                                                <h4 class="text-bold py-2 font_16">
                                                                    {{ journalNote }}</h4>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card>
                                                </v-col>
                                                <v-col sm="6" cols="6" class="pt-0">
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <tbody>
                                                            <tr>
                                                                <td class="text-left">{{
                                                                        $t('amount_return')
                                                                    }} ({{ currencyCode }})
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    {{
                                                                        numberFormat(creditMemo.itemLineAmount)
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left">{{
                                                                        $t('offset_amount')
                                                                    }} ({{ currencyCode }})
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    {{ numberFormat(creditMemo.amount) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left">{{
                                                                        $t('amount_return')
                                                                    }} ({{ baseCurrencyCode }})
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    {{
                                                                        numberFormat(creditMemo.itemLineExchangeAmount)
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left">{{
                                                                        $t('offset_amount')
                                                                    }} ({{ baseCurrencyCode }})
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    {{
                                                                        numberFormat(creditMemo.exchangeAmount)
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left">{{ $t('variance') }}
                                                                    {{ varianceAcc }}
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    {{ numberFormat(creditMemo.variance) }}
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
                                    <v-card outlined dense class="no_border function_footer py-2">
                                        <p class="float-left py-2 mb-0  grey--text">
                                            {{ $t('standard_commercial_quote') }}</p>
                                        <v-btn @click="_print(2)" class="float-right save_print mx-1">
                                            {{ $t('print') }}
                                        </v-btn>
<!--                                        <v-btn class="float-right btn_delete mx-1" @click="voidCreditMemo">-->
<!--                                            {{ $t('void') }}-->
<!--                                        </v-btn>-->
                                        <!--                                        <v-btn class="float-right btn_save_draft mx-1" @click="onEditCreditMemo">-->
                                        <!--                                            {{ $t('edit') }}-->
                                        <!--                                        </v-btn>-->
                                    </v-card>
                                    <v-divider/>
                                </v-form>
                            </v-col>

                            <v-col class="smallSide" sm="4" style="transition: .3s ease-in;"
                                   :class="{'hide_small_bar_class':isHideBar}">
                                <h3 style="color: #b3b5bc; font-size:20px;" v-if="!isHideBar"
                                    class="text-uppercase float-right mt-n3">Help
                                    <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right mt-n1"
                                    >close
                                    </v-icon>
                                </h3>

                                <div v-if="!isHideBar" class="small_sidebar mt-9 px-4 grayBg">
                                    <v-card color="primary" class="pa-3 no-boxshadow"
                                            style="min-height: 70px;">
                                        <h3 style="font-size: 18px" class="text-white text-uppercase mb-2">
                                            {{ $t('offset_amount') }}</h3>
                                        <h3 class="text-bold float-right text-white" style="font-size: 22px">
                                            {{ numberFormat(creditMemo.exchangeAmount) }}</h3>
                                    </v-card>
                                    <h4 class="my-2 text-uppercase">{{ $t('analysis') }}</h4>
                                    <v-row>
                                        <v-col sm="6" cols="6" class="py-1">
                                            <label class="label">{{ $t('employee') }}</label>
                                            <h4 class="text-bold py-1">{{ employeeName }}</h4>
                                            <label class="label">{{ $t('segment') }}</label>
                                            <h4 class="text-bold py-1">{{ segment }}</h4>

                                        </v-col>
                                        <v-col sm="6" cols="6" class="py-1">
                                            <label class="label">{{ $t('project') }}</label>
                                            <h4 class="text-bold py-1">{{ project }}</h4>
                                            <label class="label">{{ $t('location') }}</label>
                                            <h4 class="text-bold py-1">{{ location }}</h4>
                                        </v-col>
                                    </v-row>
                                    <div class="my-3" style="height:3px; background-color:#ffffff;width:100%;"></div>

                                    <p class="grey--text mt-6 mb-2">{{ $t('transaction_history') }}</p>
                                    <v-simple-table>
                                        <template v-slot:default>
                                            <tbody>
                                            <tr v-for="item in txnHistory"
                                                v-bind:key="item.id">
                                                <td class="text-left px-0 font_12">{{
                                                        item.name
                                                    }}
                                                </td>
                                                <td class="text-center px-0 font_12">{{
                                                        formatDateTime(item.createdAt)
                                                    }} &nbsp; ({{ item.timeSince }})
                                                </td>
                                            </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>

                                </div>
                            </v-col>
                        </v-row>

                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>
// import kendo from '@progress/kendo-ui'
import LoadingMe from '@/components/Loading'
import SaleFormContentModel from "@/scripts/model/SaleFormContent";
import ItemLineModel from "@/scripts/sale_return/model/ItemLine";
import ApplyToLineModel from "@/scripts/sale_return/model/ApplyToLine";
import DepositLineModel from "@/scripts/sale_return/model/DepositLine";
import SaleDepositItemLineModel from "@/scripts/sale_deposit/model/ItemLine";
import CreditMemoModel from "@/scripts/sale_return/model/CreditMemo";
import kendo from "@progress/kendo-ui";

const billingHandler = require("@/scripts/invoice/handler/billingHandler")
// const $ = require("jquery")

const saleFormContentModel = new SaleFormContentModel({})
const itemLineModel = new ItemLineModel({})
const applyToLineModel = new ApplyToLineModel({})
const depositLineModel = new DepositLineModel({})
const creditMemoModel = new CreditMemoModel({})
const saleDepositItemLineModel = new SaleDepositItemLineModel({})
// Form
const {getFormSetting} = require("@/scripts/settingsHandler.js")
import {print} from "@/form/CreditNote.js";
import {i18n} from '@/i18n';

export default {
    name: "CreditMemoView",
    props: ['id'],
    components: {
        'LoadingMe': LoadingMe,
    },
    data: () => ({
        valid: true,
        creditMemo: creditMemoModel,
        saleFormContent: saleFormContentModel,
        itemLine: itemLineModel,
        applyToLine: applyToLineModel,
        depositLine: depositLineModel,
        saleDepositLine: saleDepositItemLineModel,

        customerList: [],
        cashRefundLines: [],
        itemLines: [],
        customer: {},
        loggedUser: {},
        employees: [],
        mEmployee: {},
        customerProjects: [],
        locations: [],
        otherTax: [],
        vatTax: [],
        specificTax: [],
        publicLightingTax: [],
        saleUnitItemList: [],
        customerDiscountItem: [],
        customerSaleUnit: [],
        transactionType: [],
        segments: [],
        exchangeRate: [],
        transactionRate: 1,
        accountLines: [],
        transactionRateDate: '',
        accounts: [],
        depositLines: [],
        applyToLines: [],
        decimalFormat: 'n2',
        showLoading: false,
        paymentMethod: [],
        expense: [
            'Equal',
            'weighted'
        ],
        templates: [
            {title: 'Draft'},
            {title: 'Open'},
            {title: 'Partially Closed'},
            {title: 'Closed'},
        ],
        isHideBar: false,
        dialogTax: false,
        baseCurrencyCode: '',
        accCash: [],
        accDeposit: [],
        txnHistory: [],
        reason: '',

    }),
    methods: {
        formatDateTime(value) {
            return kendo.toString(new Date(value), this.creditMemo.dateFormat + ` hh:mm tt`)
        },
        methodTemplate(dataItem) {
            const method = dataItem.method
            if (method) {
                return `<span>${method.name ? method.name : ``}</span>`
            } else {
                return ``
            }
        },
        priceTemplate(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty('price')) {
                    return kendo.toString(dataItem.price || 0, dataItem.decimalFormat)
                }
            }
            return 0
        },
        amtTemplate(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty('amount')) {
                    return kendo.toString(dataItem.amount || 0, dataItem.decimalFormat)
                }
            }
            return 0
        },
        amountTemplate(dataItem) {
            const amt = dataItem.amount
            if (amt) {
                return kendo.toString(parseFloat(amt), `${this.decimalFormat}`)
            } else {
                return 0
            }
        },
        amountHeaderTemplate() {
            if (this.creditMemo) {
                if (this.creditMemo.hasOwnProperty('baseCurrencyCode')) {
                    return 'Amount (' + this.creditMemo.baseCurrencyCode || `` + ')'

                }
            }
            return 'Amount'
        },
        numberFormat(value) {
            return kendo.toString(value, `${this.creditMemo.decimalFormat}`)
        },
        hideSmallSideBar() {
            this.isHideBar = !this.isHideBar;
        },
        vatTemplate(dataItem) {
            const vat = dataItem.vatTax
            if (vat) {
                return `<span>${vat.defaultTax ? vat.defaultTax : ``}</span>`
            } else {
                return ``
            }
        },
        accountTemplate(dataItem) {
            const account = dataItem.account
            if (account) {
                return `<span>${account.name ? account.name : ``}</span>`
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
                return `<span>${uom.uom ? uom.uom.name : ``}</span>`
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
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1
        },
        rowNumberTmplApply(dataItem) {
            let ds = this.$refs.applyToLineDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
        },
        async loadViewCreditMemo() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    if (this.$route.params.id) {
                        this.showLoading = true
                        const strFilter = '?id=' + this.$route.params.id
                        billingHandler.creditMemoList(strFilter).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                const saleReturn = res.data.data[0]
                                this.itemLines = saleReturn.itemLine
                                this.applyToLines = saleReturn.applyToLine
                                this.cashRefundLines = saleReturn.cashRefundLine
                                this.depositLines = saleReturn.depositLine
                                this.creditMemo = saleReturn
                                this.baseCurrencyCode = saleReturn.baseCurrencyCode
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }
                }, 300)
            })
        },
        async loadTXNHistory() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    billingHandler.history(this.$route.params.id).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.txnHistory = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        voidCreditMemo() {
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                input: 'text',
                inputPlaceholder: 'Input some reason',
                showCancelButton: true,
                confirmButtonColor: '#4d4848',
                cancelButtonColor: '#ED1A3A',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.reason = result.value
                    // this.onVoidCreditMemo()
                    window.console.log(result.value, '---')
                }
            })
        },
        async onVoidCreditMemo() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const txnId = this.$route.params.id
                    if (txnId) {
                        const data = {
                            id: txnId,
                            applyToExchangeAmount: this.creditMemo.applyToExchangeAmount,
                            depositAmount: this.creditMemo.depositAmount,
                            loggedUser: this.loggedUser,
                            reason: this.reason,
                            actionType: 'delete'
                        }
                        billingHandler.createCreditMemo(data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.$snotify.success('Successfully')
                                this.close()
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }

                }, 300);
            })
        },
        onEditCreditMemo() {
            const id = this.$route.params.id
            this.$router.push({
                path: 'sale_return/' + id,
                name: 'Sale Return',
                params: {id: id},
                query: {type: 'Edit'}
            })
        },
        close() {
            window.history.go(-1)
        },
        _print(id){
               let params = "?formType=Credit Note"
            getFormSetting(params).then(res => {
                if (res.data.statusCode === 200) {
                    if (res.data.data.length > 0) {
                        print(this.creditMemo, id,res.data.data["0"].settings);
                        
                    }else{
                        this.$snotify.error(i18n.t('please_save_form_in_setting'))
                    }
                }
            });
        }
    },
    watch: {
        id() {
            window.console.log('watch ', this.$route.params.id)
            if (this.$route.params.id) {
                this.loadViewCreditMemo()
                this.loadTXNHistory()
            }
        },
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        // this.loadObj()
    },
    mounted: async function () {
        await this.loadViewCreditMemo()
        await this.loadTXNHistory()
    },
    computed: {
        amountLineHeaderTemplate() {
            if (this.creditMemo) {
                if (this.creditMemo.hasOwnProperty('currency')) {
                    if (this.creditMemo.currency.hasOwnProperty('code')) {
                        return 'Amount (' + this.creditMemo.currency.code + ')'
                    }
                }
            }
            return 'Amount'
        },
        transactionNote() {
            if (this.creditMemo) {
                if (this.creditMemo.hasOwnProperty('transactionNote')) {
                    return this.creditMemo.transactionNote
                }
            }
            return ''
        },
        varianceAcc() {
            if (this.creditMemo) {
                if (this.creditMemo.hasOwnProperty('varianceAcc')) {
                    if (this.creditMemo.varianceAcc.hasOwnProperty('id')) {
                        return this.creditMemo.varianceAcc.name
                    }
                }
            }
            return ''
        },
        journalNote() {
            if (this.creditMemo) {
                if (this.creditMemo.hasOwnProperty('journalNote')) {
                    return this.creditMemo.journalNote
                }
            }
            return ''
        },
        currency() {
            if (this.creditMemo) {
                if (this.creditMemo.hasOwnProperty('currency')) {
                    if (this.creditMemo.currency.hasOwnProperty('id')) {
                        return this.creditMemo.currency.code
                    }
                }
            }
            return ''
        },
        transactionDate() {
            if (this.creditMemo) {
                if (this.creditMemo.hasOwnProperty('transactionDate')) {
                    return kendo.toString(new Date(this.creditMemo.transactionDate), this.creditMemo.dateFormat)
                }
            }
            return '-'
        },
        segment() {
            if (this.creditMemo) {
                if (this.creditMemo.hasOwnProperty('segment')) {
                    if (this.creditMemo.segment.hasOwnProperty('id')) {
                        return this.creditMemo.segment.name
                    }
                }
            }
            return '-'
        },
        location() {
            if (this.creditMemo) {
                if (this.creditMemo.hasOwnProperty('location')) {
                    if (this.creditMemo.location.hasOwnProperty('id')) {
                        return this.creditMemo.location.name
                    }
                }
            }
            return ''
        },
        customerName() {
            if (this.creditMemo) {
                if (this.creditMemo.hasOwnProperty('customer')) {
                    if (this.creditMemo.customer.hasOwnProperty('id')) {
                        return this.creditMemo.customer.name
                    }
                }
            }
            return '-'
        },
        priceLevel() {
            if (this.creditMemo) {
                if (this.creditMemo.hasOwnProperty('priceLevel')) {
                    if (this.creditMemo.priceLevel.hasOwnProperty('id')) {
                        return this.creditMemo.priceLevel.name
                    }
                }
            }
            return '-'
        },
        currencyCode() {
            if (this.creditMemo) {
                if (this.creditMemo.hasOwnProperty('currency')) {
                    if (this.creditMemo.currency.hasOwnProperty('code')) {
                        return this.creditMemo.currency.code
                    }
                }
            }
            return '-'
        },
        employeeName() {
            if (this.creditMemo) {
                if (this.creditMemo.hasOwnProperty('employee')) {
                    if (this.creditMemo.employee.hasOwnProperty('id')) {
                        return this.creditMemo.employee.name
                    }
                }
            }
            return '-'
        },
        project() {
            if (this.creditMemo) {
                if (this.creditMemo.hasOwnProperty('project')) {
                    if (this.creditMemo.project.hasOwnProperty('id')) {
                        return this.creditMemo.project.name
                    }
                }
            }
            return '-'
        },
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
    background-color: #F2F2F2;
}

.pa-3.v-card h4 {
    font-size: 18px;
    color: #333;
}

.pa-3.v-card p {
    font-size: 12px;
    color: #B5B5B5;
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
    transition: .5s ease-in;
    flex: 0 0 0;
}

.hide_big_bar_class {
    max-width: 100%;
    transition: .5s ease-in;
    flex: 0 0 100%;
}

.info_add {
    background-color: #ffffff;
}

.small_sidebar {
    height: 98%;
    position: relative;
    padding: 12px;
    background-color: #EDF1F5;
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


.lb_bold {
    font-size: 12px;
}

.detial_smallside_p {
    position: absolute;
    bottom: 10px;
}

.card_background {
    background-color: #EDF1F5;
    min-height: 120px;
}

.deposite_input {
    width: 100px;
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





</style>