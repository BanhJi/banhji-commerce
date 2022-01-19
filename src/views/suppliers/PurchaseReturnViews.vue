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
                                        <h2 class="mb-0">{{ $t('debit_memo') }} #{{ debitMemo.referenceNo }}</h2>
                                        <v-icon v-if="isHideBar"
                                                onclick="window.history.go(-1); return false;"
                                                style="cursor: pointer; color: #333; font-size: 40px;"
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
                                                <label class="label  mb-0">{{ $t('supplier') }}</label>
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
                                                    :hidden="!purchaseFormContent.serviceDate"
                                                    :template="'<span>#= kendo.toString(new Date(serviceDate), dateFormat)#</span>'"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'serviceDateTo'"
                                                    :title="$t('date_to')"
                                                    :width="160"
                                                    :hidden="!purchaseFormContent.serviceDateTo"
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
                                                    :attributes="{style: 'text-align: right; '}"/>
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
                                                    :field="'cost'"
                                                    :title="$t('cost')"
                                                    :width="100"
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
                                                    :width="200"
                                                    :editable="()=>{ return false}"
                                                    :template="amountTemplate"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: right'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'discountItem'"
                                                    :title="$t('discount_item')"
                                                    :width="150"
                                                    :hidden="!purchaseFormContent.discountItem"
                                                    :template="discountItemTemplate"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'tax'"
                                                    :title="$t('tax')"
                                                    :width="150"
                                                    :template="vatTemplate"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>

                                                <kendo-grid-column
                                                    :field="'class1'"
                                                    :title="$t('class_1')"
                                                    :hidden="!purchaseFormContent.class1"
                                                    :template="'<span>#=class1.name || ``#</span>'"
                                                    :width="200"
                                                    :editor="ClassEditor.class1"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'class2'"
                                                    :title="$t('class_2')"
                                                    :hidden="!purchaseFormContent.class2"
                                                    :template="'<span>#=class2.name || ``#</span>'"
                                                    :width="200"
                                                    :editor="ClassEditor.class2"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'class3'"
                                                    :title="$t('class_3')"
                                                    :hidden="!purchaseFormContent.class3"
                                                    :template="'<span>#=class3.name || ``#</span>'"
                                                    :width="200"
                                                    :editor="ClassEditor.class3"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'class4'"
                                                    :title="$t('class_4')"
                                                    :hidden="!purchaseFormContent.class4"
                                                    :template="'<span>#=class4.name || ``#</span>'"
                                                    :width="200"
                                                    :editor="ClassEditor.class4"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'class5'"
                                                    :title="$t('class_5')"
                                                    :hidden="!purchaseFormContent.class5"
                                                    :template="'<span>#=class5.name || ``#</span>'"
                                                    :width="200"
                                                    :editor="ClassEditor.class5"
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
                                                                        numberFormat(debitMemo.itemLineExchangeAmount)
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
                                            <h3 class="mb-0 text-uppercase color_grey mb-3">
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
                                                    :field="'currency'"
                                                    :title="$t('currency')"
                                                    :width="150"
                                                    :editable="()=>{ return false}"
                                                    :headerAttributes="{ style:'text-align: right; background-color: #EDF1F5',}"
                                                    :attributes="{ style:'text-align: right', }"/>
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :template="amountTemplate"
                                                    :width="200"
                                                    :editable="()=>{ return false}"
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
                                                    :template="paidAmountTemplate"
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
                                                                        numberFormat(debitMemo.applyToExchangeAmount)
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
                                                    :template="amountTemplate"
                                                    :width="200"
                                                    :headerTemplate="amountHeaderTemplate"
                                                    :headerAttributes="{ style: 'text-align: right; background-color: #EDF1F5',  }"
                                                    :attributes="{ style: 'text-align: right', }"/>
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <h3 class="mb-0 text-uppercase color_grey mb-3">
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
                                                    :width="160"
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
                                                    :headerTemplate="amountHeaderTemplate"
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
                                                                    }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    {{
                                                                        numberFormat(debitMemo.itemLineExchangeAmount)
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left">{{
                                                                        $t('offset_amount')
                                                                    }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    {{ numberFormat(debitMemo.amount) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left">{{ $t('variance') }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    {{ numberFormat(debitMemo.variance) }}
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
                                        <p class="float-left py-2 mb-0  color_grey">
                                            {{ $t('standard_commercial_quote') }}</p>
                                        <v-btn @click="_print(1)"  class="float-right text-capitalize save_print mx-1">
                                            {{ $t('print') }}
                                        </v-btn>
                                        <v-btn class="float-right text-capitalize  btn_delete mx-1" @click="voidCreditMemo">
                                            {{ $t('void') }}
                                        </v-btn>
                                        <v-btn class="float-right text-capitalize  btn_save_draft mx-1" @click="onEditCreditMemo">
                                            {{ $t('edit') }}
                                        </v-btn>
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
                                    <v-card class="pa-3 no-boxshadow"
                                            color="primary"
                                            style="min-height: 70px;">
                                        <h3 style="font-size: 18px" class="text-white text-uppercase mb-2">
                                            {{ $t('offset_amount') }}</h3>
                                        <h3 class="text-bold float-right text-white" style="font-size: 22px">
                                            {{ numberFormat(debitMemo.exchangeAmount) }}</h3>
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

                                    <p class="color_grey mt-6 mb-2">{{ $t('transaction_history') }}</p>
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
import PurchaseFormContentModel from "@/scripts/model/PurchaseFormContent";
import ItemLineModel from "@/scripts/purchase_return/model/ItemLine";
import ApplyToLineModel from "@/scripts/purchase_return/model/ApplyToLine";
import DepositLineModel from "@/scripts/purchase_return/model/DepositLine";
import PurchaseDepositItemLineModel from "@/scripts/purchase_deposit/model/ItemLine";
import DebitMemoModel from "@/scripts/purchase_return/model/DebitMemo";
import kendo from "@progress/kendo-ui";
const {ClassEditor} = require("@/scripts/kendo_editor/Collections")
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const purchaseFormContentHandler = require("@/scripts/purchaseFormContentHandler")
// const $ = require("jquery")

const purchaseFormContentModel = new PurchaseFormContentModel({})
const itemLineModel = new ItemLineModel({})
const applyToLineModel = new ApplyToLineModel({})
const depositLineModel = new DepositLineModel({})
const debitMemoModel = new DebitMemoModel({})
const purchaseDepositItemLineModel = new PurchaseDepositItemLineModel({})
// from
const { getFormSetting } = require("@/scripts/settingsHandler.js");
import { print } from "@/form/DebitNote.js";
import { i18n } from "@/i18n";

export default {
    name: "DebitMemoView",
    props: ['id'],
    components: {
        'LoadingMe': LoadingMe,
    },
    data: () => ({
        valid: true,
        debitMemo: debitMemoModel,
        purchaseFormContent: purchaseFormContentModel,
        itemLine: itemLineModel,
        applyToLine: applyToLineModel,
        depositLine: depositLineModel,
        saleDepositLine: purchaseDepositItemLineModel,

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
        ClassEditor: ClassEditor

    }),
    methods: {
        priceTemplate(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty('cost')) {
                    return kendo.toString(dataItem.cost, this.decimalFormat)
                }
            }
            return 0
        },
        async loadPurchaseFormContent() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    purchaseFormContentHandler.list().then(res => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data
                            if (data.length > 0) {
                                this.purchaseFormContent = data[0]
                                this.decimalFormat = 'n' + this.purchaseFormContent.decimal
                            }
                        }
                    })
                }, 300)
            })
        },
        formatDateTime(value) {
            return kendo.toString(new Date(value), this.debitMemo.dateFormat + ` hh:mm tt`)
        },
        methodTemplate(dataItem) {
            const method = dataItem.method
            if (method) {
                return `<span>${method.name ? method.name : ``}</span>`
            } else {
                return ``
            }
        },
        amountTemplate(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty('amount')) {
                    const amt = dataItem.amount
                    return kendo.toString(parseFloat(amt), this.decimalFormat)
                }
            }
            return 0
        },
        paidAmountTemplate(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty('paidAmount')) {
                    const amt = dataItem.paidAmount
                    return kendo.toString(parseFloat(amt), this.decimalFormat)
                }
            }
            return 0
        },
        amountHeaderTemplate() {
            if (this.debitMemo) {
                if (this.debitMemo.hasOwnProperty('baseCurrencyCode')) {
                    return 'Amount (' + this.debitMemo.baseCurrencyCode || `` + ')'

                }
            }
            return 'Amount'
        },
        amountLineHeaderTemplate() {
            if (this.debitMemo) {
                if (this.debitMemo.hasOwnProperty('currency')) {
                    if (this.debitMemo.currency.hasOwnProperty('code')) {
                        return 'Amount (' + this.debitMemo.currency.code + ')'
                    }
                }
            }
            return 'Amount'
        },
        numberFormat(value) {
            return kendo.toString(value, `${this.decimalFormat}`)
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
        async loadViewDebitMemo() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    if (this.$route.params.id) {
                        this.showLoading = true
                        const strFilter = '?id=' + this.$route.params.id
                        billingHandler.debitMemoList(strFilter).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                const saleReturn = res.data.data[0]
                                this.itemLines = saleReturn.itemLine
                                this.applyToLines = saleReturn.applyToLine
                                this.cashRefundLines = saleReturn.cashRefundLine
                                this.depositLines = saleReturn.depositLine
                                this.debitMemo = saleReturn
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
                            applyToExchangeAmount: this.debitMemo.applyToExchangeAmount,
                            depositAmount: this.debitMemo.depositAmount,
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
                path: 'purchase_return/' + id,
                name: 'Purchase Return',
                params: {id: id},
                query: {type: 'Edit'}
            })
        },
        close() {
            window.history.go(-1)
        },
        _print(id) {
            // let data_print = {}
            // data_print['cashAdvanceDetails'] = this.cashAdvanceDetails
            // data_print['total'] =  this.totalAmount
            let params = "?formType=Debit Note";
            getFormSetting(params).then((res) => {
                if (res.data.statusCode === 200) {
                if (res.data.data.length > 0) {
                    print(this.debitMemo, id, res.data.data["0"].settings);
                } else {
                    this.$snotify.error(i18n.t("please_save_form_in_setting"));
                }
                }
            });
        },
    },
    watch: {
        id() {
            window.console.log('watch ', this.$route.params.id)
            if (this.$route.params.id) {
                this.loadPurchaseFormContent()
                this.loadViewDebitMemo()
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
        await this.loadPurchaseFormContent()
        await this.loadViewDebitMemo()
        await this.loadTXNHistory()
    },
    computed: {
        transactionNote() {
            if (this.debitMemo) {
                if (this.debitMemo.hasOwnProperty('transactionNote')) {
                    return this.debitMemo.transactionNote
                }
            }
            return ''
        },
        journalNote() {
            if (this.debitMemo) {
                if (this.debitMemo.hasOwnProperty('journalNote')) {
                    return this.debitMemo.journalNote
                }
            }
            return ''
        },
        currency() {
            if (this.debitMemo) {
                if (this.debitMemo.hasOwnProperty('currency')) {
                    if (this.debitMemo.currency.hasOwnProperty('id')) {
                        return this.debitMemo.currency.code
                    }
                }
            }
            return ''
        },
        transactionDate() {
            if (this.debitMemo) {
                if (this.debitMemo.hasOwnProperty('transactionDate')) {
                    return kendo.toString(new Date(this.debitMemo.transactionDate), this.debitMemo.dateFormat)
                }
            }
            return '-'
        },
        segment() {
            if (this.debitMemo) {
                if (this.debitMemo.hasOwnProperty('segment')) {
                    if (this.debitMemo.segment.hasOwnProperty('id')) {
                        return this.debitMemo.segment.name
                    }
                }
            }
            return '-'
        },
        location() {
            if (this.debitMemo) {
                if (this.debitMemo.hasOwnProperty('location')) {
                    if (this.debitMemo.location.hasOwnProperty('id')) {
                        return this.debitMemo.location.name
                    }
                }
            }
            return ''
        },
        customerName() {
            if (this.debitMemo) {
                if (this.debitMemo.hasOwnProperty('supplier')) {
                    if (this.debitMemo.supplier.hasOwnProperty('id')) {
                        return this.debitMemo.supplier.name
                    }
                }
            }
            return '-'
        },
        priceLevel() {
            if (this.debitMemo) {
                if (this.debitMemo.hasOwnProperty('priceLevel')) {
                    if (this.debitMemo.priceLevel.hasOwnProperty('id')) {
                        return this.debitMemo.priceLevel.name
                    }
                }
            }
            return '-'
        },
        currencyCode() {
            if (this.debitMemo) {
                if (this.debitMemo.hasOwnProperty('currency')) {
                    if (this.debitMemo.currency.hasOwnProperty('code')) {
                        return this.debitMemo.currency.code
                    }
                }
            }
            return '-'
        },
        employeeName() {
            if (this.debitMemo) {
                if (this.debitMemo.hasOwnProperty('employee')) {
                    if (this.debitMemo.employee.hasOwnProperty('id')) {
                        return this.debitMemo.employee.name
                    }
                }
            }
            return '-'
        },
        project() {
            if (this.debitMemo) {
                if (this.debitMemo.hasOwnProperty('project')) {
                    if (this.debitMemo.project.hasOwnProperty('id')) {
                        return this.debitMemo.project.name
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

.exp_select {
    font-size: 12px !important;
}


</style>