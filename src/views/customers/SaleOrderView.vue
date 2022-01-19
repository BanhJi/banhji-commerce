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
                                        <h2 class="mb-0">{{ saleFormContent.saleOrder }} #{{ saleOrder.referenceNo }}
                                            ({{ saleOrderStatus }})</h2>
                                        <v-icon v-if="isHideBar"
                                                onclick="window.history.go(-1); return false;"
                                                style="cursor: pointer;  font-size: 40px;"
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
                                    <v-card outlined dense class="px-3 no_border mb-3" color="grayBg">
                                        <v-row>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t('customer') }}</label>
                                                <h3 class="text-bold  py-1">{{ customerName }}</h3>
                                            </v-col>

                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t('sale_order_type') }}</label>
                                                <h3 class="text-bold py-1">{{ saleOrderType }}</h3>

                                                <label class="label mb-0">{{ $t('transaction_date') }}</label>
                                                <h3 class="text-bold py-1">{{ transactionDate }}</h3>
                                            </v-col>
                                            <v-col sm="6" cols="12" class="pr-1">
                                                <v-row class="mt-0 mr-2">
                                                    <v-col sm="6" cols="12" class="py-0">
                                                        <label class="label mb-0">{{ $t('term') }}</label>
                                                        <h3 class="text-bold py-1">{{ paymentTerm }}</h3>
                                                        <label class="label mb-0">{{ $t('currency') }}</label>
                                                        <h3 class="text-bold py-1">{{ currency }}</h3>
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="py-1">
                                                        <label class="label mb-0">{{ $t('price_level') }}</label>
                                                        <h3 class="text-bold py-1">{{ priceLevel }}</h3>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row class="pt-3" style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <kendo-datasource
                                                ref="itemLineDS"
                                                :data="itemLines"/>
                                            <kendo-grid
                                                id="gridItemLine" class="grid-function"
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
                                                        }"
                                                />
                                                <kendo-grid-column
                                                    :field="'serviceDate'"
                                                    :title="$t('date_from')"
                                                    :width="160"
                                                    :hidden="!saleFormContent.serviceDate"
                                                    :template="'<span>#= kendo.toString(new Date(serviceDate), dateFormat)#</span>'"
                                                    :headerAttributes="{
                                                            style: 'background-color: #EDF1F5'
                                                        }"
                                                />
                                                <kendo-grid-column
                                                    :field="'serviceDateTo'"
                                                    :title="$t('date_to')"
                                                    :width="160"
                                                    :hidden="!saleFormContent.serviceDateTo"
                                                    :template="'<span>#= kendo.toString(new Date(serviceDateTo), dateFormat)#</span>'"
                                                    :headerAttributes="{
                                                            style: 'background-color: #EDF1F5'
                                                        }"
                                                />
                                                <kendo-grid-column
                                                    :field="'item'"
                                                    :title="$t('item')"
                                                    :template="itemTemplate"
                                                    :width="200"
                                                    :headerAttributes="{
                                                            style: 'background-color: #EDF1F5'
                                                        }"
                                                />
                                                <kendo-grid-column
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :template="'<span>#=description#</span>'"
                                                    :width="160"
                                                    :headerAttributes="{
                                                            style: 'background-color: #EDF1F5'
                                                        }"
                                                />
                                                <kendo-grid-column
                                                    :field="'qty'"
                                                    :title="$t('qty')"
                                                    :format="'{0:n}'"
                                                    :template="'<span>#=qty#</span>'"
                                                    :width="80"
                                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: left; '}"
                                                />
                                                <kendo-grid-column
                                                    :field="'uom'"
                                                    :title="$t('uom')"
                                                    :width="150"
                                                    :template="UOMTemplate"
                                                    :headerAttributes="{
                                                            style: 'text-align: left; background-color: #EDF1F5'
                                                        }"
                                                    :attributes="{
                                                            style: 'text-align: left'
                                                        }"
                                                />
                                                <kendo-grid-column
                                                    :field="'price'"
                                                    :title="$t('price')"
                                                    :width="150"
                                                    :template="priceFormat"
                                                    :headerAttributes="{
                                                            style: 'text-align: left; background-color: #EDF1F5'
                                                        }"
                                                    :attributes="{
                                                            style: 'text-align: left'
                                                        }"
                                                />
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :width="150"
                                                    :template="amountFormat"
                                                    :headerAttributes="{
                                                            style: 'text-align: left; background-color: #EDF1F5'
                                                        }"
                                                    :attributes="{
                                                            style: 'text-align: left'
                                                        }"
                                                />
                                                <kendo-grid-column
                                                    :field="'modifier'"
                                                    :title="$t('modifier')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :hidden="!saleFormContent.modifier"
                                                    :template="'<span>#=modifier.name?modifier.name:``#</span>'"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"
                                                />
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
                                                        }"
                                                />
                                                <kendo-grid-column
                                                    :field="'vatTax'"
                                                    :title="$t('vat')"
                                                    :width="150"
                                                    :template="vatTemplate"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'specificTax'"
                                                    :title="$t('specificTax')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.specificTax"
                                                    :template="'<span>#=specificTax.defaultTax?specificTax.defaultTax:``#</span>'"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'otherTax'"
                                                    :title="$t('otherTax')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.otherTax"
                                                    :template="'<span>#=otherTax.defaultTax?otherTax.defaultTax:``#</span>'"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'publicLightingTax'"
                                                    :title="$t('pl_tax')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :hidden="!saleFormContent.publicLightingTax"
                                                    :template="'<span>#=publicLightingTax.defaultTax?publicLightingTax.defaultTax:``#</span>'"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'saleUnit'"
                                                    :title="$t('sale_unit')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.saleUnit"
                                                    :template="saleUnitTemplate"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'employee'"
                                                    :title="$t('employee')"
                                                    :width="150"
                                                    :hidden="!saleFormContent.employee"
                                                    :template="empImpl"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"
                                                />
                                            </kendo-grid>

                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row>
                                                <v-col sm="12" cols="12">
                                                    <v-row>
                                                        <v-col sm="6" cols="6">
                                                            <v-row>
                                                                <!--                                <v-col sm="6" cols="12">-->
                                                                <!--                                  <label>{{ $t('billing_address') }}</label>-->
                                                                <!--                                  <h4 class="text-bold py-2">{{ saleOrder.billingAddress }}</h4>-->
                                                                <!--                                </v-col>-->
                                                                <v-col sm="6" cols="12">
                                                                    <label>{{ $t('message_on_sale_order') }}</label>
                                                                    <h4 class="text-bold py-2">
                                                                        {{ saleOrder.transactionNote }}</h4>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row>
                                                                <v-col sm="12" cols="12" class="pt-0 px-6">
                                                                    <v-row class="grayBg" style="width: 104%;">
                                                                        <v-col sm="12" cols="12" class="">
                                                                            <v-card outlined color="white" class="pa-3">
                                                                                <v-row class="">
                                                                                    <v-col sm="12" cols="12"
                                                                                           class="py-0">
                                                                                        <p class="mb-2">
                                                                                            {{ $t('file_type') }} [PDF,
                                                                                            JPG, JPEG, TIFF,
                                                                                            PNG, GIF] - 5MB</p>
                                                                                        <template>
                                                                                            <v-file-input
                                                                                                v-model="files"
                                                                                                @change="onFileChange"
                                                                                                accept="image/jpg, image/jpeg, application/pdf"
                                                                                                :placeholder="$t('attachments')"
                                                                                                single
                                                                                                prepend-icon="mdi-paperclip">
                                                                                                <template
                                                                                                    v-slot:selection="{ text }">
                                                                                                    <v-chip
                                                                                                        small
                                                                                                        label
                                                                                                        color="primary"
                                                                                                    >
                                                                                                        {{ text }}
                                                                                                    </v-chip>
                                                                                                </template>
                                                                                            </v-file-input>
                                                                                            <v-text-field
                                                                                                v-model="fileDesc"
                                                                                                outlined
                                                                                                :placeholder="$t('description')"
                                                                                                clearable/>
                                                                                        </template>
                                                                                        <v-btn color="primary"
                                                                                               class="text-capitalize mb-3 white--text"
                                                                                               @click="uploadFile">
                                                                                            <v-icon size="15"
                                                                                                    class="mr-2">
                                                                                                fa-check
                                                                                            </v-icon>
                                                                                            {{ $t('upload') }}
                                                                                        </v-btn>
                                                                                        <template>
                                                                                            <LoadingMe
                                                                                                :isLoading="showLoadingAtch"
                                                                                                :fullPage="false"
                                                                                                type="loading"
                                                                                                :myLoading="true">
                                                                                            </LoadingMe>
                                                                                            <kendo-datasource
                                                                                                ref="attachmentDS"
                                                                                                :data="attachmentList"/>
                                                                                            <kendo-grid
                                                                                                id="gridAttachment"
                                                                                                class="grid-function"
                                                                                                :data-source-ref="'attachmentDS'"
                                                                                                :editable="false"
                                                                                                :scrollable-virtual="true">
                                                                                                <kendo-grid-column
                                                                                                    :field="''"
                                                                                                    :title="$t('open')"
                                                                                                    :width="70"
                                                                                                    :template="fileUrl"
                                                                                                    :attributes="{style: 'text-align: center'}"
                                                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                                                <kendo-grid-column
                                                                                                    :field="'fileName'"
                                                                                                    :title="$t('file_name')"
                                                                                                    :width="250"
                                                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                                                <kendo-grid-column
                                                                                                    :field="'description'"
                                                                                                    :title="$t('description')"
                                                                                                    :width="250"
                                                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                                                <kendo-grid-column
                                                                                                    :field="'fileType'"
                                                                                                    :title="$t('file_type')"
                                                                                                    :width="150"
                                                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                                                                <kendo-grid-column
                                                                                                    :field="'size'"
                                                                                                    :title="$t('size')"
                                                                                                    :width="150"
                                                                                                    :template="byteToMB"
                                                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                                                                <kendo-grid-column
                                                                                                    :field="'createdAt'"
                                                                                                    :title="$t('date')"
                                                                                                    :width="120"
                                                                                                    :template="'<span>#= kendo.toString(new Date(createdAt), dateFormat)#</span>'"
                                                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                                                            </kendo-grid>
                                                                                        </template>
                                                                                    </v-col>
                                                                                </v-row>
                                                                            </v-card>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                        <v-col sm="6" cols="6">
                                                            <v-simple-table>
                                                                <template v-slot:default>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td class="text-left pr-0">{{
                                                                                $t('subtotal')
                                                                            }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{ numberFormat(saleOrder.subTotal) }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left pr-0">{{
                                                                                $t('general_discount')
                                                                            }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">({{
                                                                                numberFormat(saleOrder.discountTotal)
                                                                            }})
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left pr-0">{{ $t('total_tax') }}
                                                                            <v-btn @click="dialogTax=true"
                                                                                   color="primary"
                                                                                   outlined
                                                                                   class="text-white text-bold rounded-0 float-right text-uppercase"
                                                                                   style="height: 30px !important; ">
                                                                                {{ $t('tax') }}
                                                                            </v-btn>
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{ numberFormat(saleOrder.totalTaxAmount) }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr style="background: #F8F8F9">
                                                                        <td class="text-left text-uppercase pr-0">{{
                                                                                $t('total')
                                                                            }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right primary--text text-bold"
                                                                            id="total">
                                                                            {{ numberFormat(saleOrder.total) }}
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
                                    <v-card outlined dense class="no_border function_footer py-2">
                                        <p class="float-left py-2 mb-0  color_grey">{{ $t('standard_sale_qoute') }}</p>
                                        <v-btn @click="_print(2)" color="primary" class="float-right save_print mx-1">
                                            {{ $t('print') }}
                                        </v-btn>
                                        <div v-if="saleOrder.status ===1">
                                            <v-btn class="float-right btn_delete mx-1" color="secondary"
                                                   :disabled="disabledMe"
                                                   @click="deleteSaleOrder">
                                                {{ $t("delete") }}
                                            </v-btn>
                                        </div>
                                        <div v-if="saleOrder.status ===1">
                                            <v-btn class="float-right  mx-1"
                                                   color="secondary"
                                                   :disabled="disabledMe"
                                                   @click="onEditSaleOrder">
                                                {{ $t('edit') }}
                                            </v-btn>
                                        </div>

                                    </v-card>
                                    <v-divider/>
                                </v-form>
                            </v-col>
                            <v-col class="smallSide" sm="4" style="transition: .3s ease-in;"
                                   :class="{'hide_small_bar_class':isHideBar}">
                                <h3 style="color: #b3b5bc; font-size:20px;" v-if="!isHideBar"
                                    class="text-uppercase float-right mt-n3">
                                    Help
                                    <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right mt-n1"
                                    >close
                                    </v-icon>
                                </h3>

                                <div v-if="!isHideBar" class="small_sidebar mt-9 px-4 grayBg">
                                    <v-card style="margin-bottom: 2px;" outlined dense
                                            class="pa-3 no_border my_card rounded-4 white--text"
                                            color="primary" height="60px">
                                        <h3 class="text-left font_13 flex-1 text-uppercase">{{
                                                $t('amount_sale_order')
                                            }}</h3>
                                        <h3 class="text-right flex-1 font_20 niradei_heavy">
                                            {{ numberFormat(saleOrder.total) }}</h3>
                                    </v-card>
                                    <!-- <h4 class="my-2 text-uppercase">{{ $t('analysis') }}</h4> -->
                                    <v-row>
                                        <v-col sm="6" cols="6" class="py-1">
                                            <label class="label">{{ $t('segment') }}</label>
                                            <h3 class="text-bold d-block py-2">{{ segment }}</h3>
                                        </v-col>

                                        <v-col sm="6" cols="6" class="py-1">
                                            <label class="label">{{ $t('employee') }}</label>
                                            <h3 class="text-bold d-block py-2">{{ employee }}</h3>

                                        </v-col>
                                        <v-col sm="6" cols="6" class="py-1">
                                            <label class="label">{{ $t('location') }}</label>
                                            <h3 class="text-bold d-block py-2">{{ location }}</h3>
                                            <label class="label">{{ $t('ref_from') }}</label>
                                            <div v-for="itm in saleOrder.refFrom" v-bind:key="itm.id">
                                                <!--                                                <h4 class="text-bold py-2">{{ itm.reference }}</h4>-->
                                                <h3 class="text-bold d-block py-2">
                                                    <router-link :to="{ path: '/en/sale_quote_view/'+ itm.id}">
                                                        {{ itm.reference || '' }}
                                                    </router-link>
                                                </h3>
                                            </div>
                                        </v-col>
                                        <v-col sm="6" cols="6" class="py-1">
                                            <label class="label">{{ $t('sale_channel') }}</label>
                                            <h3 class="text-bold d-block py-2">{{ saleChannel }}</h3>
                                            <label class="label">{{ $t('ref_to') }}</label>
                                            <div v-for="itm in saleOrder.refTo" v-bind:key="itm.id">
                                                <h4 class="text-bold d-block py-2">
                                                    <div v-if="itm.type==='Invoice'">
                                                        <router-link :to="{ path: '/en/invoice_view/'+ itm.id}">
                                                            {{ itm.reference || '' }}
                                                        </router-link>
                                                    </div>
                                                    <div v-else>
                                                        <router-link :to="{ path: '/en/sale_deposit_view/'+ itm.id}">
                                                            {{ itm.reference || '' }}
                                                        </router-link>
                                                    </div>
                                                </h4>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <!-- <v-divider class="my-2" /> -->
                                    <div class="mb-3" style="height:3px; background-color:#ffffff;width:100%;"></div>
                                    <!--                  <v-card color="third" class="pa-2 mb-4 text-bold rounded-0 no-boxshadow">-->
                                    <!--                    <v-row>-->
                                    <!--                      <v-col sm="6" cols="6">-->
                                    <!--                        <h3 class="text-bold color_white font_30">USED</h3>-->
                                    <!--                      </v-col>-->
                                    <!--                      <v-col sm="6" cols="6">-->
                                    <!--                        <h4 class="text-bold color_black">PUR0010101</h4>-->
                                    <!--                        <p class="number mb-0 color_black">06/08/2020</p>-->
                                    <!--                      </v-col>-->
                                    <!--                    </v-row>-->
                                    <!--                  </v-card>-->
                                    <!--                  <v-card color="third" class=" text-bold rounded-0  no-boxshadow">-->
                                    <!--                    <p class="text-center pa-2 white&#45;&#45;text mb-1">{{ $t('create_invoice') }}</p>-->
                                    <!--                  </v-card>-->
                                    <!--                  <v-card color="third" class=" text-bold rounded-0  no-boxshadow">-->
                                    <!--                    <p class="text-center pa-2 white&#45;&#45;text mb-1">{{ $t('create_invoice') }}</p>-->
                                    <!--                  </v-card>-->
                                    <!--                  <v-card color="secondary" class=" text-bold rounded-0  no-boxshadow">-->
                                    <!--                    <p class="text-center pa-2 white&#45;&#45;text mb-1">{{ $t('create_sale_deposit') }}</p>-->
                                    <!--                  </v-card>-->
                                    <!--                  <div class="my-2 mt-3" style="height:3px; background-color:#ffffff;width:100%;"></div>-->
                                    <!-- <v-divider class="my-2 mt-3" /> -->
                                    <p class="mb-1" color="color_grey">{{ $t('transaction_history') }}</p>
                                    <v-simple-table>
                                        <template v-slot:default>
                                            <tbody>
                                            <tr v-for="item in transactionHistory"
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
                                    <div class="my-3" style="height:3px; background-color:#ffffff;width:100%;"></div>
                                </div>
                            </v-col>
                        </v-row>

                    </v-card>
                </v-col>
                <v-dialog v-model="dialogTax" max-width="450px">
                    <v-card>
                        <div class="modal_header">
                            <v-card-title>{{ $t('tax_list') }}</v-card-title>
                            <v-icon class="btn_close" @click="dialogTax = false">close</v-icon>
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
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>
import SaleFormContentModel from "@/scripts/model/SaleFormContent"
import SaleOrderModel from "@/scripts/model/Transaction";
import kendo from "@progress/kendo-ui";

const saleOrderHandler = require("@/scripts/transactionHandler")
const saleFormContentHandler = require("@/scripts/saleFormContentHandler")
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const saleFormContentModel = new SaleFormContentModel({})

const {getFormSetting} = require("@/scripts/settingsHandler.js")
import {print} from "@/form/Sale.js";
import {i18n} from '@/i18n';


/* Store */
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
export default {
    name: "SaleOrderView",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        saleOrder: new SaleOrderModel(),
        isEdit: false,
        dialogTax: false,
        showLoading: false,
        showLoadingAtch: false,
        alert: false,
        files: [],
        valid: true,
        templates: [
            {title: 'Draft'},
            {title: 'Open'},
            {title: 'Partially Closed'},
            {title: 'Closed'},
        ],
        isHideBar: false,
        transaction: [
            {
                id: "12",
                name: "Purchase Order",
                no: "No.0024",
                price: "2,50000",
            },
            {
                id: "14",
                name: "Godd Recipt Note",
                no: "No.0024",
                price: "2,50000",
            }
        ],
        saleFormContent: saleFormContentModel,
        dateFormat: new SaleOrderModel().dateFormat,
        saleOrderList: [],
        itemLines: [],
        customer: {},
        billingAddress: '',
        deliveryAddress: '',
        taxListTotal: [],
        transactionHistory: [],
        saleOrderTypes: [
            {name: 'Standard Order', id: 1},
            {name: 'Open Order', id: 2},
            {name: 'Contract', id: 3},
            {name: 'Consignment Order', id: 4}
        ],
        imgFile: '',
        src: '',
        file_: {},
        fileDesc: '',
        fileSize: 0,
        fileType: '',
        fileName: '',
        attachmentList: [],
        refFrom: [],
        refTo: [],
        // form
        form_setting: '',
        reason: '',
        loggedUser: {
            id: cookie.creator,
            name: cookie.email
        },
    }),
    methods: {
        _print(id) {
            window.console.log(this.saleOrder)
            if (this.form_setting != '') {
                print(this.saleOrder, id, this.form_setting);
            } else {
                this.$snotify.error(i18n.t('please_save_form_in_setting'))
            }
        },
        getFormSettingFuct() {
            let params = "?formType=Sale Order"
            getFormSetting(params).then(res => {
                if (res.data.statusCode === 200) {
                    if (res.data.data.length > 0) {
                        this.form_setting = res.data.data["0"].settings;
                    }
                }
            });
        },
        async loadAttachment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    if (this.$route.params.hasOwnProperty('id')) {
                        this.showLoadingAtch = true
                        const strFilter = '?id=' + this.$route.params.id
                        billingHandler.attachmentList(strFilter).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoadingAtch = false
                                this.attachmentList = res.data.data
                            }
                        })
                    }

                }, 10)
            })
        },
        onFileChange(e) {
            if (e) {
                this.fileDesc = e.name
                this.fileName = e.name
                this.fileSize = e.size
                this.fileType = e.type
                let input = this.files
                // Ensure that you have a file before attempting to read it
                if (input) {
                    let reader = new FileReader()
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onloadend = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.imgFile = e.target.result
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsBinaryString(input)
                    this.src = URL.createObjectURL(input)
                }
            }
        },
        async uploadFile() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    if (this.imgFile) {
                        if (this.$route.params.hasOwnProperty('id')) {
                            const id = this.$route.params.id || ''
                            const name = this.saleOrder.referenceNo || ''
                            let data = {
                                file: this.imgFile,
                                info: {
                                    name: this.fileName,
                                    description: this.fileDesc,
                                    size: this.fileSize,
                                    type: this.fileType
                                },
                                type: 'Transaction',
                                id: id,
                                name: name
                            }
                            this.showLoading = true
                            billingHandler.attachment(data).then(res => {
                                if (res.data.statusCode === 201) {
                                    this.showLoading = false
                                    this.imgFile = null
                                    this.src = ''
                                    this.fileDesc = ''
                                    this.fileName = ''
                                    this.fileSize = 0
                                    this.fileType = ''
                                    this.$snotify.success('Success')
                                    this.loadAttachment()
                                    // this.txnList = JSON.parse(JSON.stringify(res.data.data))
                                    // window.console.log('transactions', this.txnList)
                                }
                            })
                        }

                    } else {
                        this.showLoading = false
                        this.$snotify.error('Please browse to upload image')
                    }
                }, 10)
            })
        },
        fileUrl(dataItem) {
            if (dataItem.fileUrl) {
                return `<a target="_blank" style="color:#ED1A3A !important" href="${dataItem.fileUrl}"><span>Open</span></a>`
            }
            return ``
        },
        byteToMB(dataItem) {
            const FileSize = dataItem.size || 0 // in MiB
            const marker = 1024; // Change to 1000 if required
            const decimal = 3; // Change as required
            const kiloBytes = marker; // One Kilobyte is 1024 bytes
            const megaBytes = marker * marker; // One MB is 1024 KB
            const gigaBytes = marker * marker * marker; // One GB is 1024 MB
            // const teraBytes = marker * marker * marker * marker; // One TB is 1024 GB

            // return bytes if less than a KB
            if (FileSize < kiloBytes) {
                return FileSize + " Bytes";
            }
            // return KB if less than a MB
            else if (FileSize < megaBytes) {
                return ((FileSize / kiloBytes).toFixed(decimal) + " KB");
            }
            // return MB if less than a GB
            else if (FileSize < gigaBytes) {
                return ((FileSize / megaBytes).toFixed(decimal) + " MB");
            }
            // return GB if less than a TB
            else {
                return ((FileSize / gigaBytes).toFixed(decimal) + " GB");
            }

            /* var FileSize = file.files[0].size / 1024 / 1024; // in MiB
            if (FileSize > 2) {
                alert('File size exceeds 2 MiB');
               // $(file).val(''); //for clearing with Jquery
            } else {
                        alert('File size' + FileSize);
            } */
        },
        onEditSaleOrder() {
            const id = this.$route.params.id
            this.$router.push({
                path: 'sale_order/' + id,
                name: 'Sale Order',
                params: {id: id},
                query: {type: 'edit'}
            })
        },
        onDeleteInvoice() {
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4d4848',
                cancelButtonColor: '#ED1A3A',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.onSaveInvoice()
                }
            })
        },
        numberFormat(value) {
            return kendo.toString(value, `n${this.saleFormContent.decimal}`)
        },
        formatDateTime(value) {
            return kendo.toString(new Date(value), this.dateFormat + ` hh:mm tt`)
        },
        amountFormat(value) {
            return kendo.toString(value.amount, `n${this.saleFormContent.decimal}`)
        },
        priceFormat(value) {
            return kendo.toString(value.price, `n${this.saleFormContent.decimal}`)
        },
        empImpl(dataItem) {
            let empIds = []
            dataItem.employee.forEach(m => {
                empIds.push(m.firstName + ' - ' + m.lastName)
            })
            // window.console.log(empIds.join(', '))
            return `<span>${empIds.join(', ')}</span>`
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
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        bindData() {
            // Edit Mode
            this.isEdit = true
            this.customer = this.saleOrder.customer
            this.billingAddress = this.saleOrder.customer.billingAddress
            this.deliveryAddress = this.saleOrder.customer.deliveryAddress
            this.taxListTotal = this.saleOrder.taxListTotal
            this.itemLines = this.saleOrder.itemLines
        },
        async loadViewSaleOrder() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    if (this.$route.params.id) {
                        this.showLoading = true
                        saleOrderHandler.view(this.$route.params.id).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.saleOrder = res.data.data[0]
                                this.refFrom = this.saleOrder.refFrom || []
                                this.loadTxnHistory()
                                this.bindData()
                                this.loadAttachment()
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }
                }, 10)
            })
        },
        hideSmallSideBar() {
            this.isHideBar = !this.isHideBar;
        },
        //
        async loadSaleFormContent() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    saleFormContentHandler.list().then(res => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data
                            if (data.length > 0) {
                                this.saleFormContent = data[0]
                                window.console.log(data[0])
                            }
                        }
                    })
                }, 10)
            })
        },
        async loadTxnHistory() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    billingHandler.history(this.$route.params.id).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.transactionHistory = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 10)
            })
        },
        close() {
            this.destroy()
            window.history.go(-1)
        },
        deleteSaleOrder() {
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
                    if (result.value.length > 1) {
                        this.reason = result.value
                        this.onDeleteSaleOrder()
                    }
                }
            })
        },
        async onDeleteSaleOrder() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const txnId = this.$route.params.id
                    if (txnId) {
                        const refFrom = this.saleOrder.refFrom || []
                        const data = {
                            id: txnId,
                            refFrom: refFrom,
                            loggedUser: this.loggedUser,
                            reason: this.reason,
                            actionType: 'delete',
                            type: 'Sale Order',
                        }
                        saleOrderHandler.deleteSaleOrder(data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.$snotify.success('Successfully')
                                this.close()
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }
                }, 10);
            })
        },
    },
    computed: {
        disabledMe() {
            if (this.saleOrder) {
                const status = this.saleOrder.status || 1
                if (status === 2) {
                    return true
                }
            }
            return false
        },
        saleOrderStatus() {
            if (this.saleOrder) {
                if (this.saleOrder.hasOwnProperty('status')) {
                    const status = this.saleOrder.status
                    let statusText = ''
                    switch (status) {
                        case 1:
                            statusText = 'OPEN'
                            break
                        case 2:
                            statusText = 'Closed'
                            break
                        case 5:
                            statusText = "DELETED";
                            break;
                    }
                    return statusText
                }
            }
            return ''
        },
        customerName() {
            if (this.saleOrder) {
                if (this.saleOrder.hasOwnProperty('customer')) {
                    if (this.saleOrder.customer.hasOwnProperty('id')) {
                        return this.saleOrder.customer.name
                    }
                }
            }
            return ''
        },
        segment() {
            if (this.saleOrder) {
                if (this.saleOrder.hasOwnProperty('segment')) {
                    if (this.saleOrder.segment.hasOwnProperty('id')) {
                        return this.saleOrder.segment.name
                    }
                }
            }
            return ''
        },
        location() {
            if (this.saleOrder) {
                if (this.saleOrder.hasOwnProperty('location')) {
                    if (this.saleOrder.location.hasOwnProperty('id')) {
                        return this.saleOrder.location.name
                    }
                }
            }
            return ''
        },
        saleChannel() {
            if (this.saleOrder) {
                if (this.saleOrder.hasOwnProperty('saleChannel')) {
                    if (this.saleOrder.saleChannel.hasOwnProperty('id')) {
                        return this.saleOrder.saleChannel.name
                    }
                }
            }
            return ''
        },
        employee() {
            if (this.saleOrder) {
                if (this.saleOrder.hasOwnProperty('employee')) {
                    if (this.saleOrder.employee.hasOwnProperty('id')) {
                        return this.saleOrder.employee.firstName + ' - ' + this.saleOrder.employee.lastName
                    }
                }
            }
            return ''
        },
        currency() {
            if (this.saleOrder) {
                if (this.saleOrder.hasOwnProperty('priceLevel')) {
                    if (this.saleOrder.priceLevel.hasOwnProperty('currency')) {
                        return this.saleOrder.priceLevel.currency.code
                    }
                }
            }
            return ''
        },
        paymentTerm() {
            if (this.saleOrder) {
                if (this.saleOrder.hasOwnProperty('paymentTerm')) {
                    if (this.saleOrder.paymentTerm.hasOwnProperty('id')) {
                        return this.saleOrder.paymentTerm.name
                    }
                }
            }
            return ''
        },
        saleOrderType() {
            if (this.saleOrder) {
                if (this.saleOrder.hasOwnProperty('saleOrderType')) {
                    const soType = this.saleOrder.saleOrderType.id || 1
                    window.console.log ("these sale order" ,this.saleOrder.saleOrderType);
                    return this.saleOrderTypes.filter(o => o.id === soType)[0].name
                }
            }
            return ''
        },
        transactionDate() {
            if (this.saleOrder) {
                if (this.saleOrder.hasOwnProperty('transactionDate')) {
                    return kendo.toString(new Date(this.saleOrder.transactionDate), this.dateFormat)
                }
            }
            return ''
        },
        priceLevel() {
            if (this.saleOrder) {
                if (this.saleOrder.hasOwnProperty('priceLevel')) {
                    if (this.saleOrder.priceLevel.hasOwnProperty('id')) {
                        return this.saleOrder.priceLevel.name
                    }
                }
            }
            return ''
        },
    },
    mounted: async function () {
        await this.loadSaleFormContent()
        await this.loadViewSaleOrder()
        this.getFormSettingFuct()

    },
    watch: {
        id() {
            if (this.$route.params.id === undefined) {
                window.history.go(-1)
            } else {
                this.loadViewSaleOrder()
                this.loadTxnHistory()
            }
        },
        '$route': 'loadViewSaleOrder',
    },
}
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

.color_white {
    color: #ffffff;
}

.color_black {
    color: #000000;
}

.font_30 {
    font-size: 30px;
    padding: 10px;
}


</style>