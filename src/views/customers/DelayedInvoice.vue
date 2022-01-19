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
                                        <h2 class="mb-0">{{ $t('delayed_invoice') }}</h2>
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
                                                    @click="hide_smallsitebar"
                                                    v-if="isHideBar"> mdi-chevron-left-circle
                                            </v-icon>
                                            <v-icon size="22"
                                                    class="arr_icon"
                                                    @click="hide_smallsitebar"
                                                    v-if="!isHideBar"> mdi-chevron-right-circle
                                            </v-icon>
										</span>
                                    </v-card>
                                    <v-card outlined dense class="px-3 no_border" color="grayBg">
                                        <v-row>
                                            <v-col sm="6" cols="12" class="pb-0 px-4 pt-4">
                                                <label class="label  mb-0">{{ $t('customer') }}</label>
                                                <v-col sm="12" cols="12"
                                                       class="kendo_dropdown_custom pl-0 pb-3 pt-1">
                                                    <dropdownlist
                                                        :data-items="customerList"
                                                        @change="onChange"
                                                        :value="customer"
                                                        :data-item-key="'id'"
                                                        :text-field="'numberName'"
                                                        :default-item="defaultItem"
                                                        :filterable="true"
                                                        @filterchange="onFilterChange">
                                                    </dropdownlist>
                                                </v-col>
                                                <label class="label mb-0 mt-1">{{ $t('number') }}</label>
                                                <v-row class="mt-1 mr-0">
                                                    <v-col sm="3" cols="3" class="pt-0 pr-0">
                                                        <div class="code_text text-bold">
                                                            {{ invoice.transactionType.abbr }}
                                                        </div>
                                                    </v-col>
                                                    <v-col sm="7" cols="7" class="pt-0 pl-0 pr-1">
                                                        <v-text-field class="custom-border "
                                                                      v-model="invoice.number"
                                                                      outlined
                                                                      tage="Invoice Number"
                                                                      :rules="[v => !!v || 'Number is required']"
                                                                      required/>
                                                    </v-col>
                                                    <v-col sm="2" cols="2" class="pt-0 px-0">
                                                        <v-icon color="black" size="30" class="border_qrcode"
                                                                @click="generateNumber">mdi-qrcode
                                                        </v-icon>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col sm="6" cols="12" class="pb-0 px-4 pt-4">
                                                <label class="label  mb-0">{{ $t('date') }}</label>
                                                <app-datepicker :initialDate="invoice.transactionDate"
                                                                @emitDate="transactionDate = $event"/>
                                                <label class="label  mb-0">{{ $t('invoice_currency') }}</label>
                                                <v-select class="mt-0"
                                                          :items="currencies"
                                                          v-model="invoice.currency"
                                                          tage="Invoice Currency"
                                                          placeholder="USD"
                                                          item-value="id"
                                                          return-object
                                                          :item-text="item =>`${item.code} - ${item.name}`"
                                                          outlined
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-row class="pt-3" style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <kendo-datasource ref="itemLineDS"
                                                              :data="itemLines"
                                                              :change="dataSourceChanged"/>
                                            <kendo-grid id="gridItemLine" class="grid-function"
                                                        :data-source-ref="'itemLineDS'"
                                                        :sortable="false"
                                                        :column-menu="true"
                                                        :editable="true"
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
                                                    :editor="ServiceDateEditor"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'serviceDateTo'"
                                                    :title="$t('date_to')"
                                                    :width="160"
                                                    :hidden="!saleFormContent.serviceDateTo"
                                                    :template="'<span>#= kendo.toString(new Date(serviceDateTo), dateFormat)#</span>'"
                                                    :editor="ServiceDateToEditor"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'item'"
                                                    :title="$t('item')"
                                                    :template="itemTemplate"
                                                    :editor="ItemDropDownEditor"
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
                                                    @change="onUOMChanged"
                                                    :editor="UOMDropDownEditor"
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
                                                    :template="'<span>#=price#</span>'"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: right'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :format="'{0:n}'"
                                                    :width="100"
                                                    :editable="()=>{ return false}"
                                                    :template="'<span>#=amount#</span>'"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: right'
                                                                    }"/>
                                                <!--                                                <kendo-grid-column-->
                                                <!--                                                    :field="'discountPercent'"-->
                                                <!--                                                    :title="$t('discount_%')"-->
                                                <!--                                                    :format="'{0:n}'"-->
                                                <!--                                                    :width="100"-->
                                                <!--                                                    :template="'<span>#=discountPercent#</span>'"-->
                                                <!--                                                    :headerAttributes="{-->
                                                <!--                                                                        style: 'text-align: left; background-color: #EDF1F5'-->
                                                <!--                                                                    }"-->
                                                <!--                                                    :attributes="{-->
                                                <!--                                                                        style: 'text-align: left'-->
                                                <!--                                                                    }"/>-->
                                                <!--                                                <kendo-grid-column-->
                                                <!--                                                    :field="'discountAmount'"-->
                                                <!--                                                    :title="$t('discount_amount')"-->
                                                <!--                                                    :format="'{0:n}'"-->
                                                <!--                                                    :width="100"-->
                                                <!--                                                    :template="'<span>#=discountAmount#</span>'"-->
                                                <!--                                                    :headerAttributes="{-->
                                                <!--                                                                        style: 'text-align: left; background-color: #EDF1F5'-->
                                                <!--                                                                    }"-->
                                                <!--                                                    :attributes="{-->
                                                <!--                                                                        style: 'text-align: left'-->
                                                <!--                                                                    }"/>-->
                                                <kendo-grid-column
                                                    :field="'modifier'"
                                                    :title="$t('modifier')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :hidden="!saleFormContent.modifier"
                                                    :template="'<span>#=modifier.name?modifier.name:``#</span>'"
                                                    :editor="ModifierDropDownEditor"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'discountItem'"
                                                    :title="$t('discount_item')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.discountItem"
                                                    :template="discountItemTemplate"
                                                    :editor="DiscountItemDropDownEditor"
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
                                                    :editor="VatTaxDropDownEditor"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'specificTax'"
                                                    :title="$t('specificTax')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.specificTax"
                                                    :template="'<span>#=specificTax.defaultTax?specificTax.defaultTax:``#</span>'"
                                                    :editor="SpecificTaxDropDownEditor"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'otherTax'"
                                                    :title="$t('otherTax')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.otherTax"
                                                    :template="'<span>#=otherTax.defaultTax?otherTax.defaultTax:``#</span>'"
                                                    :editor="OtherTaxDropDownEditor"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'publicLightingTax'"
                                                    :title="$t('pl_tax')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :hidden="!saleFormContent.publicLightingTax"
                                                    :template="'<span>#=publicLightingTax.defaultTax?publicLightingTax.defaultTax:``#</span>'"
                                                    :editor="PublicLightingTaxDropDownEditor"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'saleUnit'"
                                                    :title="$t('sale_unit')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.saleUnit"
                                                    :template="saleUnitTemplate"
                                                    :editor="SaleUnitDropDownEditor"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>

                                                <kendo-grid-column
                                                    :field="'employee'"
                                                    :title="$t('employee')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.employee"
                                                    :template="empImpl"
                                                    :editor="EmployeeDropDownEditor"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>

                                                <kendo-grid-column
                                                    :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow, class: 'btn-plus' }"
                                                    :title="'Action'"
                                                    :width="100"
                                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                                            </kendo-grid>

                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row>
                                                <v-col sm="9" cols="12" class="">
                                                    <v-btn class="float-left btn_plus rounded-0 mr-2" @click="addRow">
                                                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                    </v-btn>
                                                    <!--                                                    <v-btn class="float-left rounded-0 btn_plus mr-2" @click="addRow">-->
                                                    <!--                                                        <v-icon size="" class="ma-1">fa fa-barcode</v-icon>-->
                                                    <!--                                                    </v-btn>-->
                                                    <!--                                                    <v-btn class="float-left white&#45;&#45;text rounded-0 add_account mr-2"-->
                                                    <!--                                                           to="add_item">-->
                                                    <!--                                                        {{ $t('add_account') }}-->
                                                    <!--                                                    </v-btn>-->
                                                    <!--                                                    <v-btn class="float-left rounded-0 add_account mr-2 btn_save_draft">-->
                                                    <!--                                                        {{ $t('sub_total') }}-->
                                                    <!--                                                    </v-btn>-->
                                                    <!--                                                    <template>-->
                                                    <!--                                                        <v-file-input class="mt-0 pt-0 " sm="3" cols="6"-->
                                                    <!--                                                                      v-model="files"-->
                                                    <!--                                                                      :placeholder="$t('attachment')"-->
                                                    <!--                                                                      multiple-->
                                                    <!--                                                                      prepend-icon="mdi-paperclip"-->
                                                    <!--                                                        >-->
                                                    <!--                                                            <template v-slot:selection="{ text }">-->
                                                    <!--                                                                <v-chip-->
                                                    <!--                                                                    small-->
                                                    <!--                                                                    label-->
                                                    <!--                                                                    color="primary"-->
                                                    <!--                                                                >-->
                                                    <!--                                                                    {{ text }}-->
                                                    <!--                                                                </v-chip>-->
                                                    <!--                                                            </template>-->
                                                    <!--                                                        </v-file-input>-->
                                                    <!--                                                    </template>-->
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-row>
                                                <v-col class="pt-0" sm="6" cols="6">
                                                    <v-card class="no-boxshadow pa-3" color="grayBg">
                                                        <label>{{ $t('message_on_invoice') }}</label>
                                                        <v-textarea class="mt-1"
                                                                    v-model="invoice.transactionNote"
                                                                    outlined
                                                                    no-resize
                                                                    height="80px"
                                                                    rows="3"
                                                                    placeholder="This will appear on the invoice"
                                                        />
                                                    </v-card>
                                                </v-col>
                                                <v-col class="pt-0" sm="6" cols="6">
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <tbody>
                                                            <tr>
                                                                <td class="text-left pr-0">{{ $t('subtotal') }}</td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    {{ numberFormat(invoice.subTotal) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left pr-0">{{
                                                                        $t('general_discount')
                                                                    }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">({{
                                                                        numberFormat(invoice.discountTotal)
                                                                    }})
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left pr-0">{{ $t('total_tax') }}
                                                                    <v-btn @click="dialogTax=true"
                                                                            color="primary"
                                                                           class="text-white text-bold rounded-0 float-right text-uppercase"
                                                                           style="height: 30px !important;">
                                                                        {{ $t('tax') }}
                                                                    </v-btn>
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    {{ numberFormat(invoice.totalTaxAmount) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left pr-0" width="240px">
                                                                    <v-select class="mt-3"
                                                                              v-model="invoice.specificDiscountItem"
                                                                              :items="specificDiscountItem"
                                                                              item-text="name"
                                                                              @change="onSpecificDiscountChanged"
                                                                              item-value="id"
                                                                              return-object
                                                                              clearable
                                                                              outlined
                                                                    />
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">({{
                                                                        numberFormat(invoice.specificDiscountTotal ? invoice.specificDiscountTotal : 0)
                                                                    }})
                                                                </td>
                                                            </tr>
                                                            <!--                                                            <tr>-->
                                                            <!--                                                                <td class="text-left">{{ $t('delivery') }}</td>-->
                                                            <!--                                                                <td class="text-center">:</td>-->
                                                            <!--                                                                <td class="text-right">{{ invoice.deliveryFee }}</td>-->
                                                            <!--                                                            </tr>-->

                                                            <tr v-for="(num,index) in numSelect" :key="index"
                                                                class="hide_form_alert">
                                                                <td class="text-left text-uppercase pr-0">

                                                                    <v-btn v-if="num == 1" @click="addSelect"
                                                                           class="float-left mt-2 mr-1 pa-1" small>
                                                                        <v-icon color="primary" size="16" class="ma-1">
                                                                            mdi-plus
                                                                        </v-icon>
                                                                    </v-btn>
                                                                    <v-btn v-if="num > 1" @click="removeSelect(index)"
                                                                           class="float-left mt-2 mr-1 pa-1" small>
                                                                        <v-icon color="primary" size="16" class="ma-1">
                                                                            fa-trash
                                                                        </v-icon>
                                                                    </v-btn>
                                                                    <v-select class="my-2 capitalize"
                                                                              v-model="mOtherCharge[index]"
                                                                              :items="otherChargeList"
                                                                              item-text="name"
                                                                              @change="onOtherChargeChange"
                                                                              item-value="id"
                                                                              return-object
                                                                              clearable
                                                                              outlined
                                                                    />
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right color_green text-bold">
                                                                    {{
                                                                        numberFormat(onOtherAmount(mOtherCharge[index]))
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr style="background: #F8F8F9">
                                                                <td class="text-left text-uppercase pr-0">{{
                                                                        $t('total')
                                                                    }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right color_green text-bold" id="total">
                                                                    {{ numberFormat(invoice.total) }}
                                                                </td>
                                                            </tr>
                                                            <!--                                                            <tr>-->
                                                            <!--                                                                <td class="text-left pr-0">{{ $t('deposit') }} <span-->
                                                            <!--                                                                    class="float-right color_green">{{-->
                                                            <!--                                                                        numberFormat(invoice.depositAmount)-->
                                                            <!--                                                                    }}</span>-->
                                                            <!--                                                                </td>-->
                                                            <!--                                                                <td class="text-center">:</td>-->
                                                            <!--                                                                <td class="text-right hide_form_alert">-->
                                                            <!--                                                                    <v-text-field-->
                                                            <!--                                                                        class=" text-right float-right deposite_input"-->
                                                            <!--                                                                        v-model="invoice.depositDeduction"-->
                                                            <!--                                                                        @change="autoCalculate"-->
                                                            <!--                                                                        tage="Deposit"-->
                                                            <!--                                                                        width="80"-->
                                                            <!--                                                                        outlined-->
                                                            <!--                                                                    />-->
                                                            <!--                                                                </td>-->
                                                            <!--                                                            </tr>-->
                                                            <!--                                                            <tr>-->
                                                            <!--                                                                <td class="text-left">{{ $t('amount_due') }}</td>-->
                                                            <!--                                                                <td class="text-center">:</td>-->
                                                            <!--                                                                <td class="text-right color_green text-bold">-->
                                                            <!--                                                                    {{ numberFormat(invoice.remainingAmount) }}-->
                                                            <!--                                                                </td>-->
                                                            <!--                                                            </tr>-->

                                                            </tbody>
                                                        </template>
                                                    </v-simple-table>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>

                                    <v-divider/>
                                    <v-card outlined dense class="no_border function_footer">
                                        <v-alert type="warning"
                                                 v-model="alert"
                                                 dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="mr-2 float-left text-capitalize " v-on="on">
                                                    {{ $t('select_template') }}
                                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item v-for="(item, index) in templates" :key="index">
                                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <v-btn color="black" class="float-left white--text  text-capitalize "
                                               @click="cancel">{{ $t('cancel') }}
                                        </v-btn>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn color="primary"
                                                       class="ml-2 float-right white--text  text-capitalize" v-on="on">
                                                    {{ $t('save_option') }}
                                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list rounded>
                                                <v-list-item-group>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title @click="saveNew">
                                                                {{ $t('save_new') }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title>{{ $t('save_print') }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title @click="onSaveClose(false)">
                                                                {{ $t('save_close') }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list-item-group>
                                            </v-list>
                                        </v-menu>
                                        <v-btn color="secondary" class="float-right  white--text text-capitalize">
                                            {{ $t('save_draft') }}
                                        </v-btn>

                                    </v-card>
                                </v-form>
                            </v-col>
                            <v-col class="smallSide" sm="4" style="transition: .3s ease-in;"
                                   :class="{'hide_small_bar_class':isHideBar}">
                                <h3 style="color: #b3b5bc; font-size:20px;" v-if="!isHideBar"
                                    class="text-uppercase float-right mt-n3">
                                    <span class="pointer" @click="Help('delayed invoice')">
                                        {{ $t('help') }}
                                    </span>
                                    <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; font-size: 40px;"
                                        color="grey"
                                        class="float-right mt-n1"
                                    >close
                                    </v-icon>
                                </h3>

                                <div v-if="!isHideBar" class="small_sidebar mt-9 px-4 pt-4 grayBg">
                                    <v-card class="pa-3 no-boxshadow d-flex justify-space-between align-center"
                                            min-height="60px" color="primary">
                                        <h3 style="font-size: 18px" class="text-white text-uppercase">
                                            {{ $t('amount_due') }}</h3>
                                        <h3 class="text-bold float-right text-white" style="font-size: 22px">
                                            {{ numberFormat(invoice.amountDue) }}</h3>
                                    </v-card>

                                    <v-row>
                                        <v-col sm="12" cols="12" class="pt-4">
                                            <!-- <h4 class=" text-uppercase line_22">{{ $t('analysis') }}</h4> -->
                                            <label class="label mb-0">{{ $t('segment') }}</label>
                                            <v-select class="mt-1"
                                                      v-model="invoice.segment"
                                                      :items="segments"
                                                      item-value="id"
                                                      :item-text="item =>`${item.code} - ${item.name}`"
                                                      return-object
                                                      tage="sub Of"
                                                      placeholder="Sub Of"
                                                      outlined=""/>
                                            <label class="label mb-0">{{ $t('location') }}</label>
                                            <v-select class="mt-1"
                                                      v-model="invoice.location"
                                                      :items="locations"
                                                      item-value="id"
                                                      :item-text="item =>`${item.code} - ${item.name}`"
                                                      return-object
                                                      tage="Location"
                                                      placeholder="bu/location"
                                                      outlined=""/>


                                        </v-col>
                                    </v-row>
                                    <p class="mb-0 detial_smallside_p font_14">{{ $t('delayed_funct_desc') }}</p>
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
                :alertText="loadingTextAlert"/>
            <v-dialog v-model="dialogTax" max-width="450px">
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t('tax_list') }}</v-card-title>
                        <v-icon  @click="dialogTax = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="pb-0">
                                <v-simple-table>
                                    <template v-slot:default>
                                        <tbody>
                                        <tr v-for="(value, name) in taxListTotal" v-bind:key="name">
                                            <td class="text-left" width="180px">{{ name }}</td>
                                            <td class="text-center">:</td>
                                            <td class="text-right">
                                                {{ numberFormat(value) }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left" width="180px">{{ $t('total') }}</td>
                                            <td class="text-center">:</td>
                                            <td class="text-right">
                                                {{ numberFormat(invoice.totalTaxAmount) }}
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
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import {DropDownList} from '@progress/kendo-vue-dropdowns'
import ItemLineModel from "@/scripts/invoice/model/ItemLine"
import {uuid} from 'vue-uuid'
import InvoiceModel from "@/scripts/invoice/model/Invoice"
import SaleFormContentModel from "@/scripts/model/SaleFormContent";
import kendo from "@progress/kendo-ui";
import { ShowResource } from '@/observable/store'

const $ = require("jquery")

const settingsHandler = require("@/scripts/settingsHandler")
const customerHandler = require("@/scripts/customerHandler")
const locationHandler = require("@/scripts/locationHandler")
const prefixHandler = require("@/scripts/prefixHandler")
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const saleFormContentHandler = require("@/scripts/saleFormContentHandler")
const productVariantHandler = require("@/scripts/productVariantHandler")
const uomPriceHandler = require("@/scripts/uomPriceHandler")
const discountItemHandler = require("@/scripts/discountItemHandler")
const itemModifierHandler = require("@/scripts/itemModifierHandler")
const saleUnitItemHandler = require("@/scripts/saleUnitItemHandler")
const employeeHandler = require("@/scripts/employeeHandler")
const settingHandler = require("@/scripts/settingHandler")
const otherChargeHandler = require("@/scripts/otherChargeHandler")

const invoiceModel = new InvoiceModel({})
const itemLineModel = new ItemLineModel({})
const saleFormContentModel = new SaleFormContentModel({})

const textField = 'numberName'
const keyField = 'id'
const defaultItem = {[textField]: 'Select customer...', [keyField]: null}
const emptyItem = {[textField]: 'loading ...'}
const DELAYED_INVOICE = 'delayed invoice'
const itemLinePrefix = 'lin-'
const DISCOUNT_TYPE = '?type=Sale'

export default {
    name: "DelayedInvoice",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
        'dropdownlist': DropDownList
    },
    data: () => ({
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        alert: false,
        deposite: 0,
        files: [],
        // Form validation
        valid: true,
        transactionDate: new Date().toISOString().substr(0, 10),
        transactionType: ['Delayed Invoice'],
        templates: [
            {title: 'Draft'},
            {title: 'Open'},
            {title: 'Partially Closed'},
            {title: 'Closed'},
        ],
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,
        dialogTax: false,
        customerList: [],
        currencies: [],
        segments: [],
        locations: [],
        itemLines: [],
        numSelect: [1],
        mOtherCharge: [],
        mOtherChargeAmount: [],
        specificDiscountItem: [],
        otherChargeList: [],
        taxListTotal: {},
        loggedUser: {
            id: 'cf3d10ab-bce6-47b3-8405-b448c23dad84',
            name: 'Mr. Inspector'
        },
        cusBaseUrl: customerHandler.search(),
        filter: '',
        defaultItem: defaultItem,
        itemLine: itemLineModel,
        saleFormContent: saleFormContentModel,
        customer: {},
        invoice: invoiceModel
    }),
    methods: {
        Help(key_search){
            ShowResource(key_search)
        },
        onUOMChanged(dataItem) {
            window.console.log(dataItem, 'uom changed')
        },
        close(data) {
            if (this.$route.params.id === undefined) {
                this.$router.push({
                    name: "Customers",
                    params: {
                        data: data,
                    }
                })
            } else {
                window.history.go(-1)
                // this.$router.push({
                //     path: "invoice_view",
                //     name: "Invoice View",
                //     params: {
                //         data: data,
                //     }
                // })
            }
            // window.console.log(data, 'data')
        },
        saveNew() {

        },
        async initData() {
            if (this.$route.params.id !== undefined) {
                await this.loadViewInvoice()
            } else {
                this.addRow()
            }
        },
        async onSaveClose(saveSend) {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    let itemLineDS = this.$refs.itemLineDS.kendoWidget()
                    let data = {
                        "id": this.invoice.id ? this.invoice.id : '',
                        "type": 'Delayed Invoice',
                        "number": this.invoice.number,
                        "abbr": this.invoice.transactionType.abbr,
                        "transactionDate": this.transactionDate,
                        "dueDate": this.invoice.dueDate,
                        "monthOf": this.invoice.monthOf,
                        "customer": this.invoice.customer,
                        "transactionType": this.invoice.transactionType,
                        "paymentTerm": this.invoice.paymentTerm,
                        "discountPromotion": {},
                        "accReceivable": this.invoice.accReceivable,
                        "currency": this.invoice.currency,
                        "priceLevel": this.invoice.priceLevel,
                        "itemLines": itemLineDS.data(),
                        "segment": this.invoice.segment,
                        "location": this.invoice.location,
                        "project": this.invoice.project,
                        "saleChannel": this.invoice.saleChannel,
                        "employee": this.invoice.employee,
                        "billingAddress": this.invoice.billingAddress,
                        "deliveryAddress": this.invoice.deliveryAddress,
                        "deliveryDateTime": this.invoice.deliveryDateTime,
                        "transactionNote": this.invoice.transactionNote,
                        "journalNote": this.invoice.journalNote,
                        "subTotal": this.invoice.subTotal,
                        "total": this.invoice.total,
                        "discountTotal": this.invoice.discountTotal,
                        "specificDiscountTotal": this.invoice.specificDiscountTotal,
                        "deliveryFee": this.invoice.deliveryFee,
                        "totalTaxAmount": this.invoice.totalTaxAmount,
                        "depositAmount": this.invoice.depositAmount,
                        "depositDeduction": this.invoice.depositDeduction,
                        "remainingAmount": this.invoice.remainingAmount,
                        "amountDue": this.invoice.amountDue,
                        "currentBalance": this.invoice.currentBalance,
                        "balance": this.invoice.balance,
                        "creditLimit": this.invoice.creditLimit,
                        "saveOption": this.invoice.saveOption,
                        "status": 1,
                        "approvedBy": this.invoice.approvedBy,
                        "formTemplate": {},
                        "specificDiscountItem": this.invoice.specificDiscountItem,
                        "otherCharge": this.mOtherCharge,
                        "otherChargeAmount": this.invoice.otherChargeAmount,
                        "lateFee": this.invoice.lateFee,
                        "paymentOptionWBMobile": {},
                        "paymentOptionOnline": {},
                        "paymentOptionKHQR": {},
                        "publicLink": this.invoice.publicLink,
                        "paymentCode": this.invoice.paymentCode,
                        "taxListTotal": this.taxListTotal,
                        "customerDiscountItem": this.customerDiscountItem,
                        "customerSaleUnit": this.customerSaleUnit,
                        "paymentScheme": this.invoice.paymentScheme,
                        "createdAt": this.invoice.createdAt,
                        "loggedUser": this.loggedUser,
                        "saveSend": saveSend,
                        "actionType": this.$route.params.id ? this.$route.query.type : 'new'
                    }
                    billingHandler.create(data).then(response => {
                        if (response.data.statusCode === 201) {
                            // this.close(response.data.data)
                            // this.$refs.form.reset()
                            this.$snotify.success('Successfully')
                            this.close(response.data.data)
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
            })
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
        errorMessage() {

        },
        addRow() {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                total = ds.total()
            this.itemLine.id = itemLinePrefix + uuid.v1()
            ds.insert(total, this.itemLine)
            // this.itemLines.push(this.itemLine)
            // window.console.log('item Line', this.itemLine)
        },
        accountDropDownEditor() {
        },
        cancel() {

        },
        hide_smallsitebar() {
            this.isHideBar = !this.isHideBar;
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
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
        async loadCurrency() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    currencyHandler.list('fun-c').then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.currencies = res.data.data.filter(o => o.used === 1)
                        }
                    })
                }, 300);
            })
        },
        async loadPrefix() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    prefixHandler.get(DELAYED_INVOICE).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.invoiceTypes = res.data.data
                            if (this.invoiceTypes.length > 0) {
                                this.invoice.transactionType = this.invoiceTypes[0]
                                if (this.$route.params.id === undefined) {
                                    this.generateNumber()
                                }
                            }
                        }

                    })
                }, 300);
            })
        },
        async loadSaleUnitItems() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    saleUnitItemHandler.list().then(res => {
                        if (res.data.statusCode === 200)
                            this.saleUnitItemList = res.data.data
                    })
                }, 300)
            })
        },
        addSelect() {
            let amount_num = this.numSelect.length
            let num = this.numSelect[amount_num - 1]
            let new_num = num + 1
            let lenghtItem = this.specificDiscountItem.length
            if (new_num <= lenghtItem) {
                this.numSelect.push(new_num)
            }

        },
        removeSelect(index) {
            this.numSelect.splice(index, 1)
            // window.console.log(index, this.numSelect)
            // this.selectDiscount.splice(index,1)
            // window.console.log("remove",this.selectDiscount)
            // this.selectDiscount = this.selectDiscount.filter(item =>  item.id != val.id);
        },
        onOtherChargeChange() {
            let otherCharge = 0
            this.mOtherCharge.forEach(m => {
                otherCharge += this.autoCalculateDiscount(m, this.invoice.subTotal)
            })
            this.invoice.otherChargeAmount = otherCharge
            this.autoCalculate()
        },
        onOtherAmount(value) {
            return this.autoCalculateDiscount(value, this.invoice.subTotal)
        },
        onSpecificDiscountChanged() {
            if (this.invoice.specificDiscountItem) {
                // window.console.log('-changed', this.invoice.specificDiscountItem)
                const discountInvoice = this.autoCalculateDiscount(this.invoice.specificDiscountItem, this.invoice.subTotal)
                this.invoice.specificDiscountTotal = kendo.toString(discountInvoice ? discountInvoice : 0, 'n')
                let total = kendo.parseFloat(this.invoice.subTotal) - (kendo.parseFloat(this.invoice.discountTotal) + kendo.parseFloat(this.invoice.totalTaxAmount)) - discountInvoice
                this.invoice.total = kendo.toString((total), 'n')
            }
        },
        async loadOtherCharge() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    otherChargeHandler.list().then(res => {
                        if (res.data.statusCode === 200) {
                            this.otherChargeList = res.data.data
                        }
                    })
                }, 300);
            })
        },
        onChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.customer = value
            this.invoice.customer = value
            this.invoice.priceLevel = value.hasOwnProperty('priceLevel') ? value.priceLevel : {}

            if (value.hasOwnProperty('priceLevel')) {
                if (value.priceLevel.hasOwnProperty('currency')) {
                    this.invoice.currency = value.priceLevel.currency
                }
            }
        },
        onFilterChange(event) {
            const filter = event.filter.value
            this.customerData(filter, this.cusBaseUrl)
            this.filter = filter
        },
        customerData(filter, baseUrl) {
            const url = baseUrl +
                `?filter=${filter}`
            fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then(this.afterFetch)
        },
        afterFetch(json) {
            this.customerList = json.data
        },
        async loadLocation() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.locations = []
                    locationHandler.list().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.locations = res.data.data
                            if (this.locations.length > 0) {
                                this.invoice.location = this.locations[0]
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async loadSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segments = []
                    settingsHandler.getSeg().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.segments = res.data.data
                            if (this.segments.length > 0) {
                                this.invoice.segment = this.segments[0]
                            }
                            // this.segmentList = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        generateNumber() {
            let data = {
                abbr: this.invoice.transactionType.abbr,
                structure: this.invoice.transactionType.structure,
                transactionDate: this.transactionDate,
                prefixSeparator: this.invoice.transactionType.prefixSeparator || '',
                numberSeparator: this.invoice.transactionType.numberSeparator || '',
                format: this.invoice.transactionType.format || 5,
                sequcencing: this.invoice.transactionType.sequcencing,
                type: 'Delayed Invoice',
                entity: 1
            }
            billingHandler.lastNumber(data).then(response => {
                if (response.data.statusCode === 200) {
                    // window.console.log(this.invoice.transactionType,'data')
                    const res = response.data.data
                    const lastNumber = this.zeroPad(parseInt(res.lastNumber), this.invoice.transactionType.format)
                    const number = res.suffix + this.invoice.transactionType.numberSeparator + lastNumber
                    // this.transactionNumber = number
                    this.invoice.number = number
                }
            }).catch(e => {
                this.errors.push(e)
            })

        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        empImpl(dataItem) {
            let empIds = []
            dataItem.employee.forEach(m => {
                empIds.push(m.firstName + ' - ' + m.lastName)
            })
            // window.console.log(empIds.join(', '))
            return `<span>${empIds.join(', ')}</span>`
        },
        EmployeeDropDownEditor(container, options) {
            kendo.jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoMultiSelect({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    suggest: true,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "id",
                    headerTemplate: '<div class="dropdown-header k-widget k-header">' +
                        '<span>Employee </span>' +
                        '<span></span>' +
                        '</div>',
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
                                    lastName: {type: "string"}
                                }
                            },
                            data: function (response) {
                                return response.data
                            },
                            total: function (response) {
                                return response.data.count
                            }
                        },
                    }),
                })
        },
        autoCalculateTaxByType(tax) {
            // return by a key
            const groupAll = list => list.reduce((tax, item) => {
                const taxAmount = tax[item.name] || 0
                return Object.assign({}, tax, {[item.name]: taxAmount + parseFloat(item.amount)})
            }, {})
            this.taxListTotal = groupAll(tax)
        },
        autoCalculate() {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                subTotal = 0,
                totalTax = 0, discountTotal = 0,
                spTax = 0, pltax = 0, otherTax = 0, vatTax = 0, discountInvoice = 0, taxList = [], discountItem = [],
                saleUnit = [], inclusiveTax = 0

            ds.data().forEach(value => {
                let modifierPrice = 0
                if (value.modifier) {
                    modifierPrice = kendo.parseFloat(value.modifier.price)
                }

                // subTotal += (kendo.parseFloat(value.amount) + modifierPrice)
                let discount = 0
                if (value.discountItem) {
                    let subTo = kendo.parseFloat(value.price) * kendo.parseFloat(value.qty)
                    discount = this.autoCalculateDiscount(value.discountItem, subTo)
                    if (value.discountItem.hasOwnProperty('id')) {
                        discountItem.push(value.discountItem)
                    }
                    discountTotal += (discount ? discount : 0)
                    window.console.log(discountTotal, 'dis Total')
                }
                if (value.saleUnit) {
                    if (value.saleUnit.hasOwnProperty('id')) {
                        saleUnit.push(value.saleUnit)
                    }
                }
                if (value.specificTax) {
                    spTax = this.autoCalculateTax(value.specificTax, (kendo.parseFloat(value.amount) - kendo.parseFloat(discount)))
                    // window.console.log('sp ', discount)
                    spTax = kendo.parseFloat(spTax) ? kendo.parseFloat(spTax) : 0
                    const tax = value.specificTax
                    const baseAmount = tax.baseAmount
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === 'inclusive') {
                            inclusiveTax += spTax
                        }
                    }
                    if (value.specificTax.hasOwnProperty('taxType')) {
                        taxList.push({
                            name: value.specificTax.taxType.name,
                            amount: spTax,
                            id: value.specificTax.taxType.id
                        })
                    }
                }
                if (value.publicLightingTax) {
                    pltax = this.autoCalculateTax(value.publicLightingTax, (kendo.parseFloat(value.amount) - kendo.parseFloat(discount)))
                    pltax = kendo.parseFloat(pltax) ? kendo.parseFloat(pltax) : 0
                    const tax = value.publicLightingTax
                    const baseAmount = tax.baseAmount
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === 'inclusive') {
                            inclusiveTax += pltax
                        }
                    }
                    if (value.publicLightingTax.hasOwnProperty('taxType')) {
                        taxList.push({
                            name: value.publicLightingTax.taxType.name,
                            amount: pltax,
                            id: value.publicLightingTax.taxType.id
                        })
                    }
                }
                if (value.otherTax) {
                    otherTax = this.autoCalculateTax(value.otherTax, (kendo.parseFloat(value.amount) - kendo.parseFloat(discount)))
                    otherTax = kendo.parseFloat(otherTax) ? kendo.parseFloat(otherTax) : 0
                    const tax = value.otherTax
                    const baseAmount = tax.baseAmount
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === 'inclusive') {
                            inclusiveTax += otherTax
                        }
                    }
                    if (value.otherTax.hasOwnProperty('taxType')) {
                        taxList.push({
                            name: value.otherTax.taxType.name,
                            amount: otherTax,
                            id: value.otherTax.taxType.id
                        })
                    }

                }

                if (value.vatTax) {
                    // window.console.log('Vat Tax', value.vatTax)
                    let amt = kendo.parseFloat(spTax ? spTax : 0) + kendo.parseFloat(pltax ? pltax : 0) + kendo.parseFloat(otherTax ? otherTax : 0) + (kendo.parseFloat(value.amount ? value.amount : 0) - (discount ? discount : 0))
                    vatTax = this.autoCalculateTax(value.vatTax, amt)
                    vatTax = kendo.parseFloat(vatTax) ? kendo.parseFloat(vatTax) : 0
                    const tax = value.vatTax
                    const baseAmount = tax.baseAmount
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === 'inclusive') {
                            inclusiveTax += vatTax
                        }
                    }
                    if (value.vatTax.hasOwnProperty('taxType')) {
                        taxList.push({
                            name: value.vatTax.taxType.name,
                            amount: vatTax,
                            id: value.vatTax.taxType.id
                        })
                    }
                }
                totalTax += kendo.parseFloat(spTax ? spTax : 0) + kendo.parseFloat(pltax ? pltax : 0) + kendo.parseFloat(otherTax ? otherTax : 0) + kendo.parseFloat(vatTax ? vatTax : 0)
                subTotal += (kendo.parseFloat(value.amount) + modifierPrice - inclusiveTax)
            })

            // discountTotal = discountTotal ? discountTotal : 0

            // window.console.log(spTax, pltax, otherTax, vatTax)
            let total = (kendo.parseFloat(subTotal) - kendo.parseFloat(discountTotal)) + kendo.parseFloat(totalTax)
            this.invoice.subTotal = subTotal
            // $("#subtotal").text(kendo.parseFloat(subTotal))
            this.invoice.totalTaxAmount = kendo.parseFloat(totalTax)
            this.invoice.discountTotal = kendo.parseFloat(discountTotal)
            if (this.invoice.specificDiscountItem) {
                discountInvoice = this.autoCalculateDiscount(this.invoice.specificDiscountItem, kendo.parseFloat(subTotal))
                discountInvoice = discountInvoice ? discountInvoice : 0
            }
            // this.onOtherChargeChange()
            this.invoice.total = kendo.parseFloat(total) - discountInvoice + kendo.parseFloat(this.invoice.otherChargeAmount)
            this.invoice.remainingAmount = kendo.parseFloat(this.invoice.total) - kendo.parseFloat(this.deposite)
            this.invoice.amountDue = kendo.parseFloat(this.invoice.total - kendo.parseFloat(this.deposite))
            this.invoice.exchangeAmount = (kendo.parseFloat(this.invoice.amountDue) * kendo.parseFloat(this.invoice.txnRate))
            // this.invoice.exchangeAmount = (kendo.parseFloat(this.invoice.amountDue) *  kendo.parseFloat(this.invoice.txnRate))
            // window.console.log('--', taxList)
            this.autoCalculateTaxByType(taxList)
            this.customerDiscountItem = this.removeDuplicate(discountItem)
            this.customerSaleUnit = this.removeDuplicate(saleUnit)
            // window.console.log('discount ', this.customerDiscountItem)
        },
        removeDuplicate(array) {
            const result = [];
            const map = new Map();
            for (const item of array) {
                if (!map.has(item.id)) {
                    map.set(item.id, true);    // set any value to Map
                    result.push(item)
                }
            }
            return result
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n${this.saleFormContent.decimal}`)
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
        autoCalculateTax(tax, amount) {
            if (tax) {
                var formula = tax.formula
                var inAmt = kendo.parseFloat(amount)
                var nAmt = kendo.parseFloat(amount)
                var taxBase = kendo.parseFloat(tax.taxBase) / 100
                var rate = kendo.parseFloat(tax.rate) / 100
                var total = eval(formula)
                window.console.log(inAmt, nAmt, taxBase, rate, formula, total)
                return total
            }
            // return 0
        },
        dataSourceChanged(e) {
            if (e.field) {
                let dataRow = e.items[0]

                switch (e.field) {
                    case "item":
                        // this.attribute_ = this.attributes.filter(m => m.type.id === dataRow.variant.id)
                        dataRow.set('description', dataRow.item.description)
                        break
                    case "price":
                        try {
                            dataRow.set('price', parseFloat(dataRow.price))
                            dataRow.set('amount', parseFloat(dataRow.price) * parseFloat(dataRow.qty))
                            // window.console.log('price',dataRow.price)
                        } catch {
                            dataRow.set('price', 0)
                            dataRow.set('amount', 0)
                        }
                        break
                    case "uom":
                        try {
                            dataRow.set('price', parseFloat(dataRow.uom.price))
                            dataRow.set('amount', parseFloat(dataRow.uom.price) * parseFloat(dataRow.qty))
                        } catch {
                            dataRow.set('price', 0)
                            dataRow.set('amount', 0)
                        }
                        break
                    case "qty":
                        try {
                            dataRow.set('price', parseFloat(dataRow.price))
                            dataRow.set('amount', parseFloat(dataRow.price) * parseFloat(dataRow.qty))
                        } catch {
                            dataRow.set('price', 0)
                            dataRow.set('amount', 0)
                        }
                        break
                    case "otherTax":
                        // window.console.log("--", dataRow)
                        break
                    default:
                        break
                }
                if (e.field) {
                    this.autoCalculate()
                }
            }
        },
        ServiceDateEditor(container, options) {
            kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDatePicker()

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
            kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDatePicker()
        },
        ItemDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "id",
                    headerTemplate: '<div class="dropdown-header k-widget k-header">' +
                        '<span>Items </span>' +
                        '<span></span>' +
                        '</div>',
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
                                }
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            }
                        },
                        // data: this.variants
                    }),
                    change: function (e) {
                        // this.UOMDropDownEditor(container,options)
                        window.console.log('changed event', e)
                    }

                })
        },
        UOMDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "uom.name",
                    dataValueField: "uom.id",
                    cascadeFrom: "item",
                    template: "<span>#=uom.name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                // url: uomPriceHandler.getURL(options.model.item.id, this.invoice.priceLevel.id, options.model.item.type),
                                url: uomPriceHandler.uomPriceByPriceLevelURL('id=' + options.model.item.id + '&plId=' + this.invoice.priceLevel.id + '&date=' + this.transactionDate),
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
                                }
                            },
                            data: function (response) {
                                return response.data
                            },
                            total: function (response) {
                                return response.data.count
                            }
                        },
                        // data: this.variants
                    }),
                })
        },
        DiscountItemDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
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
                                }
                            },
                            data: function (response) {

                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            }
                        },
                    }),
                })
        },
        SpecificTaxDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
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
                        data: this.specificTax.filter(m => {
                            if (options.model.hasOwnProperty('vatTax')) {
                                const vat = options.model.vatTax
                                if (vat) {
                                    if (options.model.vatTax !== null || options.model.vatTax !== 'null') {
                                        if (options.model.vatTax.baseAmount) {
                                            return m.baseAmount.toLowerCase() === options.model.vatTax.baseAmount.toLowerCase()
                                        } else {
                                            return m
                                        }
                                    }
                                } else {
                                    return m
                                }
                            }
                        })
                    })
                })
        },
        PublicLightingTaxDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
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
                        data: this.publicLightingTax.filter(m => {
                            if (options.model.hasOwnProperty('vatTax')) {
                                const vat = options.model.vatTax
                                if (vat) {
                                    if (options.model.vatTax !== null && options.model.vatTax !== 'null') {
                                        if (options.model.vatTax.baseAmount) {
                                            return m.baseAmount.toLowerCase() === options.model.vatTax.baseAmount.toLowerCase()
                                        } else {
                                            return m
                                        }
                                    }
                                } else {
                                    return m
                                }
                            }
                        })
                    })
                })
        },
        OtherTaxDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
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
                        data: this.otherTax.filter(m => {
                            if (options.model.hasOwnProperty('vatTax')) {
                                const vat = options.model.vatTax
                                if (vat) {
                                    if (options.model.vatTax !== null && options.model.vatTax !== 'null') {
                                        if (options.model.vatTax.baseAmount) {
                                            return m.baseAmount.toLowerCase() === options.model.vatTax.baseAmount.toLowerCase()
                                        } else {
                                            return m
                                        }
                                    }
                                } else {
                                    return m
                                }

                            }
                        })
                    })
                })
        },
        VatTaxDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
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
                        data: this.vatTax
                    })
                })
        },
        SaleUnitDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
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
                        data: this.saleUnitItemList
                    })
                })
        },
        ModifierDropDownEditor(container, options) {
            kendo.jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "id",
                    headerTemplate: '<div class="dropdown-header k-widget k-header">' +
                        '<span>Modifier </span>' +
                        '<span></span>' +
                        '</div>',
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
                                }
                            },
                            data: function (response) {
                                return response.data
                            },
                            total: function (response) {
                                return response.data.count
                            }
                        },
                    }),
                })
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
        async loadTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    settingHandler.get().then(res => {
                        this.tax = res
                        this.otherTax = this.tax.filter(m => (m.taxType.typeId === 7 || m.taxType.typeId === 10) && m.transactionType === 'Sale') // valuable tax
                        this.specificTax = this.tax.filter(m => (m.taxType.typeId === 8 || m.taxType.typeId === 10) && m.transactionType === 'Sale') // valuable tax
                        this.publicLightingTax = this.tax.filter(m => (m.taxType.typeId === 9 || m.taxType.typeId === 10) && m.transactionType === 'Sale') // valuable tax
                        this.vatTax = this.tax.filter(m => (m.taxType.typeId === 1 || m.taxType.typeId === 8 || m.taxType.typeId === 10) && m.transactionType === 'Sale') // valuable tax

                    })
                }, 300)
            })
        },
        async uomByPriceLevel(id, priceLevelId, dataRow) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    uomPriceHandler.uomByPriceLevel(id, priceLevelId).then(res => {
                        if (res.data.statusCode === 200) {
                            // return res.data.data
                            dataRow.set('uom', res.data.data)
                        }
                    })
                }, 300);
            })
        },
        async loadDiscountItem() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    discountItemHandler.list(DISCOUNT_TYPE).then(res => {
                        if (res.data.statusCode === 200) {
                            this.specificDiscountItem = res.data.data
                        }
                    })
                }, 300);
            })
        },
        async loadViewInvoice() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    billingHandler.view(this.$route.params.id).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.invoice = res.data.data[0]
                            this.customer = this.invoice.customer
                            this.taxListTotal = this.invoice.taxListTotal
                            this.itemLines = this.invoice.itemLines
                            this.mOtherCharge = this.invoice.otherCharge
                            for (let i = 0; i <= this.mOtherCharge.length - 1; i++) {
                                this.addSelect()
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 500)
            })
        },
        clear() {
            this.id = undefined
            this.invoice = {}
            this.itemLines = []
            this.invoice.transactionType = this.invoiceTypes[0]
            this.generateNumber()
        }
    },
    watch: {
        id() {
            if (this.$route.params.id === undefined) {
                this.clear()
            } else {
                this.showLoading = true
                this.loadViewInvoice()
            }
        }
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        // this.loadObj()
    },
    mounted: async function () {
        await this.loadLocation()
        await this.loadSegment()
        await this.loadPrefix()
        await this.loadCurrency()
        await this.loadSaleFormContent()
        await this.loadSaleUnitItems()
        await this.loadTax()
        await this.loadOtherCharge()
        await this.loadDiscountItem()
        this.customerData(this.filter, this.cusBaseUrl)
        await this.initData()

    },
};
</script>

<style scoped>
.k-dropdown {
    width: 100%;
    margin-top: 3px;
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

.attachment_file {
    background-color: #EFEDED;
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
    color: #7F7F7F;
}

.block_debit h5,
.block_credit h5,
.block_difference h5 {
    text-transform: uppercase;
    color: #7F7F7F;
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
    color: #f44336;
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