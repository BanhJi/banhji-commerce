<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white">
                        <v-row>
                            <v-col
                                class="bigSide pr-2 py-0"
                                sm="8"
                                cols="12"
                                style="transition: .3s ease-in;"
                                :class="{ hide_big_bar_class: isHideBar }">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">{{ $t("sale_deposit") }}</h2>
                                        <v-icon
                                            v-if="isHideBar"
                                            @click="cancel()"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                        <span
                                            style="transition: .3s ease-in; z-index:10;"
                                            :class="{iconArrow: !isHideBar, iconArrowHide: isHideBar}">
                                        <v-icon
                                            size="22"
                                            class="arr_icon"
                                            @click="hideSmallSiteBar"
                                            v-if="isHideBar">mdi-chevron-left-circle
                                        </v-icon>
                                        <v-icon
                                            size="22"
                                            class="arr_icon"
                                            @click="hideSmallSiteBar"
                                            v-if="!isHideBar">mdi-chevron-right-circle
                                        </v-icon>
                                    </span>
                                    </v-card>
                                    <v-card
                                        outlined
                                        dense
                                        class="px-3 rounded-4 no_border mb-3"
                                        color="grayBg">
                                        <v-row>
                                            <v-col sm="5" cols="12" class="pb-0 px-4 pt-4 ">
                                                <label class="label  mb-0">{{ $t("customer") }}</label>
                                                <div class="kendo_dropdown_custom mt-1 pb-3">
                                                    <dropdownlist
                                                        :disabled="disableMe"
                                                        :data-items="customerList"
                                                        @change="onChange"
                                                        :value="customer"
                                                        :data-item-key="dataItemKey"
                                                        :text-field="textField"
                                                        :default-item="defaultItem"
                                                        :filterable="true"
                                                        @filterchange="onFilterChange"
                                                        :required="true">
                                                    </dropdownlist>
                                                </div>
                                                <label class="label  mb-0">{{ $t("date") }}</label>
                                                <app-datepicker
                                                    :initialDate="transactionDate"
                                                    :disabled="disabled"
                                                    @emitDate="transactionDate = $event"/>
                                                <label class="label mb-0">{{ $t("number") }}</label>
                                                <v-row class="mt-1 mr-0">
                                                    <v-col sm="3" cols="3" class="py-0 pr-0">
                                                        <div class="code_text text-bold">
                                                            {{ saleDeposit.transactionType.abbr }}
                                                        </div>
                                                    </v-col>
                                                    <v-col sm="7" cols="7" class="py-0 pl-0">
                                                        <v-text-field
                                                            class=" custom-border "
                                                            v-model="saleDeposit.number"
                                                            outlined
                                                            readonly
                                                            tage="Number"
                                                            :rules="[(v) => !!v || 'Number is required']"
                                                            required/>
                                                    </v-col>
                                                    <v-col sm="2" cols="2" class="py-0 px-0">
                                                        <v-icon
                                                            color="black"
                                                            size="30"
                                                            class="border_qrcode"
                                                            @click="generateNumber">mdi-qrcode
                                                        </v-icon>
                                                    </v-col>
                                                </v-row>
                                                <label class="label mb-0">{{ $t("transaction_currency") }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    v-model="saleDeposit.currency"
                                                    :items="currencyList"
                                                    @change="loadTransactionRate"
                                                    item-value="id"
                                                    :item-text="(item) => `${item.code} - ${item.name}`"
                                                    return-object
                                                    tage="Transaction Currency"
                                                    placeholder="Currency"
                                                    outlined/>
                                            </v-col>
                                            <v-col sm="7" cosl="12" class="px-4 pt-4 pb-0">
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <v-row>
                                                            <v-col sm="6" cols="12" class="pt-0 pb-2">
                                                                <p class="mb-1 pt-0 d-block">
                                                                    {{ $t("current_deposit_balance") }}
                                                                </p>
                                                                <h3 class="color_green float-right">
                                                                    {{ amountFormat(depositBalance) }}{{ currencyCode }}
                                                                </h3>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                    <v-col sm="12" cols="12" class="pl-0 ">
                                                        <v-card
                                                            outlined
                                                            dense
                                                            class="no_border px-3"
                                                            color="white">
                                                            <v-row>
                                                                <v-col sm="12" cols="12" class="pb-0">
                                                                    <label
                                                                        class="label mb-0">{{
                                                                            $t("deposit_to_account")
                                                                        }}</label>
                                                                    <v-select
                                                                        class="mt-1"
                                                                        v-model="saleDeposit.saleDepositAcc"
                                                                        :items="accCustomerDeposit"
                                                                        item-value="id"
                                                                        readonly
                                                                        :item-text="(item) => `${item.number} - ${item.name}`"
                                                                        return-object
                                                                        placeholder="Deposit Account"
                                                                        tage="Deposit Account"
                                                                        outlined/>
                                                                    <label
                                                                        class="label mb-0">{{
                                                                            $t("sale_order")
                                                                        }}</label>
                                                                    <v-select
                                                                        class="mt-1"
                                                                        v-model="saleDeposit.saleOrder"
                                                                        :items="saleOrders"
                                                                        @change="onSOChanged"
                                                                        item-value="id"
                                                                        item-text="number"
                                                                        return-object
                                                                        tage="Sale Order"
                                                                        placeholder="Sale Order"
                                                                        outlined/>
                                                                </v-col>
                                                                <v-col sm="12" cols="12" class="py-0">
                                                                    <v-row>
                                                                        <v-col sm="6" cols="12" class="py-0">
                                                                            <label
                                                                                class="label mb-0">{{
                                                                                    $t("amount")
                                                                                }}</label>
                                                                            <p class="mt-3">
                                                                                {{
                                                                                    numberFormat(saleDeposit.saleOrder, "amount")
                                                                                }}</p>
                                                                        </v-col>
                                                                        <v-col sm="6" cols="12" class="py-0">
                                                                            <label
                                                                                class="label mb-0">{{
                                                                                    $t("currency")
                                                                                }}</label>
                                                                            <p class="mt-3">
                                                                                {{
                                                                                    numberFormat(saleDeposit.saleOrder, "currency")
                                                                                }}</p>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-card outlined dense class="no_border" color="white">
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pb-0 pt-1">
                                                <kendo-datasource
                                                    ref="saleDepositDS"
                                                    :change="dataSourceChanged"
                                                    :data="depositLine"/>
                                                <kendo-grid
                                                    id="gridSaleDeposit"
                                                    class="grid-function"
                                                    :data-source-ref="'saleDepositDS'"
                                                    :sortable="false"
                                                    :filterable="false"
                                                    :column-menu="true"
                                                    :editable="true"
                                                    :scrollable-virtual="true">
                                                    <kendo-grid-column
                                                        :command="{iconClass: 'k-icon k-i-trash', text: ' ', click: removeRow, class: 'btn-plus'}"
                                                        :title="''"
                                                        :width="63"
                                                        :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                                                    <kendo-grid-column
                                                        :title="$t('no.')"
                                                        :width="54"
                                                        :template="rowNumberTmpl"
                                                        :column-menu="false"
                                                        :headerAttributes="{style: 'background-color: #EDF1F5;', class: 'text-products'}"
                                                        :attributes="{style: 'text-align: products'}"/>
                                                    <kendo-grid-column
                                                        :field="'paymentOption'"
                                                        :title="$t('payment_option')"
                                                        :width="250"
                                                        :template="methodTemplate"
                                                        :editor="PaymentOptionEditor"
                                                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                                    <kendo-grid-column
                                                        :field="'account'"
                                                        :title="$t('account')"
                                                        :width="200"
                                                        :editable="() => {return false}"
                                                        :template="accountTemplate"
                                                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                                    <kendo-grid-column
                                                        :field="'description'"
                                                        :title="$t('description')"
                                                        :width="200"
                                                        :template="'<span>#=description#</span>'"
                                                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                                    <kendo-grid-column
                                                        :field="'amount'"
                                                        :title="$t('amount')"
                                                        :width="200"
                                                        :template="amountTemplate"
                                                        :editor="amountEditor"
                                                        :headerAttributes="{style:'text-align: right; background-color: #EDF1F5'}"
                                                        :attributes="{style: 'text-align: right'}"/>
                                                    <kendo-grid-column
                                                        :field="'refNo'"
                                                        :title="$t('payment_ref')"
                                                        :width="200"
                                                        :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                        :attributes="{style: 'text-align: right'}"/>
                                                </kendo-grid>
                                            </v-col>
                                            <v-col sm="12" cols="12" class="pt-1 ">
                                                <v-btn
                                                    class="btn_plus white--text mr-2"
                                                    color="primary"
                                                    @click="addRow">
                                                    <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col sm="12" cols="12" class="py-0">
                                                <v-row>
                                                    <v-col class="pt-0" sm="7" cols="12">
                                                        <v-card
                                                            class="no-boxshadow rounded-4 pa-3"
                                                            color="grayBg"
                                                            height="138px">
                                                            <v-row>
                                                                <v-col class="py-0" sm="6" cols="12">
                                                                    <label>{{ $t("message_on_deposit") }}</label>
                                                                    <v-textarea
                                                                        class="mt-1"
                                                                        no-resize
                                                                        height="90px"
                                                                        v-model="saleDeposit.transactionNote"
                                                                        outlined
                                                                        clearable
                                                                        rows="3"
                                                                        placeholder="This will appear on the deposit"/>
                                                                </v-col>
                                                                <v-col class="py-0" sm="6" cols="12">
                                                                    <label>{{ $t("message_for_journal") }}</label>
                                                                    <v-textarea
                                                                        class="mt-1"
                                                                        no-resize
                                                                        height="90px"
                                                                        outlined
                                                                        v-model="saleDeposit.journalNote"
                                                                        clearable
                                                                        rows="3"
                                                                        placeholder="This will appear on the journal"/>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card>
                                                    </v-col>
                                                    <v-col sm="5" cols="12" class="pt-1 pb-0">
                                                        <v-simple-table>
                                                            <template v-slot:default>
                                                                <tbody>
                                                                <tr>
                                                                    <td class="text-left text-uppercase">{{
                                                                            $t("total")
                                                                        }}
                                                                    </td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-left color_green text-bold">
                                                                        {{ amountFormat(saleDeposit.amount) }}
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
                                                    class=" text-capitalize  black--text float-left mr-2"
                                                    v-on="on">{{ $t("select_template") }}
                                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item>
                                                    <v-list-item-title>
                                                        Sale Deposit
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <v-btn
                                            color="primary"
                                            outlined
                                            class="text-capitalize  black--text float-left mr-2"
                                            @click="cancel">{{ $t("cancel") }}
                                        </v-btn>
                                        <v-btn
                                            color="primary"
                                            @click="onSaveClose('close')"
                                            class="float-right white--text text-capitalize ">{{ $t("save_close") }}
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
                                class="smallSide pl-2"
                                sm="4"
                                style="transition: .3s ease-in;"
                                :class="{ hide_small_bar_class: isHideBar }">
                                <h3 style="color: #b3b5bc; font-size:20px;"
                                    v-if="!isHideBar"
                                    class="text-uppercase float-right mt-n3">
                                    <span class="pointer" @click="Help('sale deposit')">{{ $t("help") }}</span>
                                    <v-icon
                                        @click="cancel()"
                                        style="cursor: pointer; font-size: 40px;"
                                        color="grey"
                                        class="float-right mt-n1">close
                                    </v-icon>
                                </h3>
                                <div v-if="!isHideBar" class="small_sidebar mt-8 px-4 grayBg">
                                    <v-card
                                        class="pa-3 no-boxshadow rounded-4 d-flex justify-space-between align-center"
                                        min-height="60px"
                                        color="primary">
                                        <h3 style="font-size: 18px"
                                            class="text-white text-uppercase">{{ $t("amount_deposit") }}
                                        </h3>
                                        <h3
                                            class="text-bold float-right text-white"
                                            style="font-size: 22px">{{ amountFormat(saleDeposit.amount) }}
                                        </h3>
                                    </v-card>
                                    <v-row>
                                        <v-col sm="12" cols="12">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pt-1">
                                                    <v-row>
                                                        <v-col sm="12" cols="12" class="py-1">
                                                            <label class="label">{{ $t("segment") }}</label>
                                                            <v-select
                                                                class="mt-1"
                                                                v-model="saleDeposit.segment"
                                                                :items="segments"
                                                                item-value="id"
                                                                :item-text="(item) => `${item.code} - ${item.name}`"
                                                                return-object
                                                                :rules="[(v) => !!v || 'Segment is required']"
                                                                outlined=""/>
                                                            <label class="label">{{ $t("location") }}</label>
                                                            <v-select
                                                                class="mt-1"
                                                                v-model="saleDeposit.location"
                                                                :items="locations"
                                                                item-value="id"
                                                                :item-text="(item) => `${item.code} - ${item.name}`"
                                                                return-object
                                                                outlined=""/>
                                                        </v-col>
                                                    </v-row>
                                                    <!--                                                    <label class="label font_14">{{ $t('project') }}</label>-->
                                                    <!--                                                    <label-->
                                                    <!--                                                        class="label text-bold text-uppercase font_14">{{-->
                                                    <!--                                                            $t('tnc_to_be_added')-->
                                                    <!--                                                        }}</label>-->
                                                    <!--                                                    <v-select class=" mt-1"-->
                                                    <!--                                                              :items="transaction"-->
                                                    <!--                                                              tage="Transactions to be added"-->
                                                    <!--                                                              :rules="[v => !!v || 'Payble Account is required']"-->
                                                    <!--                                                              return-object-->
                                                    <!--                                                              outlined-->
                                                    <!--                                                    >-->
                                                    <!--                                                        <template v-slot:item="{ item }">-->
                                                    <!--                                                            <p class="d-block text-center">{{ item.id }}.-->
                                                    <!--                                                                {{ item.name }}</p>-->
                                                    <!--                                                            <br>-->
                                                    <!--                                                            <div class="item_list d-flex">-->
                                                    <!--                                                                <span>-->
                                                    <!--                                                                    {{ item.no }}-->
                                                    <!--                                                                </span>-->
                                                    <!--                                                                <v-btn>{{ $t('add') }}</v-btn>-->
                                                    <!--                                                            </div>-->
                                                    <!--                                                        </template>-->
                                                    <!--                                                    </v-select>-->

                                                    <!--                                                    <v-row>-->
                                                    <!--                                                        <label class="text-bold ml-9 mt-2" style="font-size: 12px;">1.-->
                                                    <!--                                                            {{ $t('sale_quote') }}</label>-->
                                                    <!--                                                        <v-col sm="9" cols="9" class="py-0 pr-0">-->
                                                    <!--                                                            <v-card outlined-->
                                                    <!--                                                                    class="px-3 py-1 text-white no-boxshadow no_border justify-left d-flex"-->
                                                    <!--                                                                    style="background-color: #92d050; height: 30px">-->
                                                    <!--                                                                <input type="checkbox" class="checkbox_inv float-left"/>-->
                                                    <!--                                                                <p class="mb-0" style="width: 100%">-->
                                                    <!--                                                                    <span class="pl-3 float-left">No. 00224</span>-->
                                                    <!--                                                                    <span class="float-right">2,500.00</span>-->
                                                    <!--                                                                </p>-->
                                                    <!--                                                            </v-card>-->
                                                    <!--                                                        </v-col>-->
                                                    <!--                                                        <v-col sm="3" cols="3" class="py-0  pl-1">-->
                                                    <!--                                                            <v-btn-->
                                                    <!--                                                                class="text-white text-bold rounded-0 float-right text-uppercase"-->
                                                    <!--                                                                style="height: 30px !important; background-color: rgb(0, 176, 80) !important">-->
                                                    <!--                                                                {{ $t('add') }}-->
                                                    <!--                                                            </v-btn>-->
                                                    <!--                                                        </v-col>-->
                                                    <!--                                                    </v-row>-->
                                                    <!--                                                    <v-row>-->
                                                    <!--                                                        <label class="text-bold ml-9" style="font-size: 12px;">2.-->
                                                    <!--                                                            {{ $t('sale_quote') }}</label>-->
                                                    <!--                                                        <v-col sm="9" cols="9" class="py-0 pr-0">-->
                                                    <!--                                                            <v-card outlined-->
                                                    <!--                                                                    class="px-3 py-1 text-white no-boxshadow no_border justify-left d-flex"-->
                                                    <!--                                                                    style="background-color: #92d050; height: 30px">-->
                                                    <!--                                                                <input type="checkbox" class="checkbox_inv float-left"/>-->
                                                    <!--                                                                <p class="mb-0" style="width: 100%">-->
                                                    <!--                                                                    <span class="pl-3 float-left">No. 00224</span>-->
                                                    <!--                                                                    <span class="float-right">2,500.00</span>-->
                                                    <!--                                                                </p>-->
                                                    <!--                                                            </v-card>-->
                                                    <!--                                                        </v-col>-->
                                                    <!--                                                        <v-col sm="3" cols="3" class="py-0  pl-1">-->
                                                    <!--                                                            <v-btn-->
                                                    <!--                                                                class="text-white text-bold rounded-0 float-right text-uppercase"-->
                                                    <!--                                                                style="height: 30px !important; background-color: rgb(0, 176, 80) !important">-->
                                                    <!--                                                                {{ $t('add') }}-->
                                                    <!--                                                            </v-btn>-->
                                                    <!--                                                        </v-col>-->
                                                    <!--                                                    </v-row>-->
                                                    <!--                                                    <v-row>-->
                                                    <!--                                                        <label class="text-bold ml-9 mt-2" style="font-size: 12px;">4.-->
                                                    <!--                                                            {{ $t('sale_quote') }}</label>-->
                                                    <!--                                                        <v-col sm="9" cols="9" class="py-0 pr-0">-->
                                                    <!--                                                            <v-card outlined-->
                                                    <!--                                                                    class="px-3 py-1 text-white no-boxshadow no_border justify-left d-flex"-->
                                                    <!--                                                                    style="background-color: #92d050; height: 30px">-->
                                                    <!--                                                                <input type="checkbox" class="checkbox_inv float-left"/>-->
                                                    <!--                                                                <p class="mb-0" style="width: 100%">-->
                                                    <!--                                                                    <span class="pl-3 float-left">No. 00224</span>-->
                                                    <!--                                                                    <span class="float-right">2,500.00</span>-->
                                                    <!--                                                                </p>-->
                                                    <!--                                                            </v-card>-->
                                                    <!--                                                        </v-col>-->
                                                    <!--                                                        <v-col sm="3" cols="3" class="py-0  pl-1">-->
                                                    <!--                                                            <v-btn-->
                                                    <!--                                                                class="text-white text-bold rounded-0 float-right text-uppercase"-->
                                                    <!--                                                                style="height: 30px !important; background-color: rgb(0, 176, 80) !important">-->
                                                    <!--                                                                {{ $t('add') }}-->
                                                    <!--                                                            </v-btn>-->
                                                    <!--                                                        </v-col>-->
                                                    <!--                                                    </v-row>-->
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <p class="mb-0 detial_smallside_p pr-4 font_14">{{ $t("sale_deposit_desc") }}</p>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>
import {i18n} from "@/i18n";
import kendo from "@progress/kendo-ui";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import SaleDepositModel from "@/scripts/sale_deposit/model/SaleDeposit";
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import {uuid} from "vue-uuid";
import ItemLineModel from "@/scripts/sale_deposit/model/ItemLine";
import {dataStore, ShowResource} from "@/observable/store";
import SaleFormContentModel from "@/scripts/model/SaleFormContent";
import PaymentOptionEditor from "@/scripts/kendo_editor/PaymentOptionEditor";
import Helper from "@/helper";

const saleOrderHandler = require("@/scripts/transactionHandler");
const customerHandler = require("@/scripts/customerHandler");
const saleFormContentHandler = require("@/scripts/saleFormContentHandler");

const locationHandler = require("@/scripts/locationHandler");
const settingsHandler = require("@/scripts/settingsHandler");
const saleDepositModel = new SaleDepositModel({});
const prefixHandler = require("@/scripts/prefixHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const accountHandler = require("@/scripts/handler/accounting/account");
const itemLineModel = new ItemLineModel({});
const $ = require("jquery");
const paymentOptionHandler = require("@/scripts/paymentOptionHandler");
const currencyHandler = require("@/scripts/currency/handler/currencyHandler");
const saleFormContentModel = new SaleFormContentModel({});

const defaultItem = {["numberName"]: "Select customer...", ["id"]: null};
const emptyItem = {["numberName"]: "loading ..."};
const itemLinePrefix = "lin-";
const OPTION_TYPE = "Customer";
const strFilter = "?optionType=" + OPTION_TYPE;
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
export default {
    name: "SaleDeposit",
    props: ["id"],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": DatePickerComponent,
        dropdownlist: DropDownList,
    },
    data: () => ({
        isEdit: false,
        showLoading: false,
        alert: false,
        files: [],
        segments: [],
        locations: [],
        saleDeposit: saleDepositModel,
        itemLine: itemLineModel,
        customerList: [],
        customer: {},
        textField: "numberName",
        defaultItem: defaultItem,
        dataItemKey: "id",
        filter: "",
        cusBaseUrl: customerHandler.searchv1(),
        saleFormContent: saleFormContentModel,
        transactionTypes: [],
        accCustomerDeposit: [],
        paymentMethod: [],
        saleOrders: [],
        saleOrderAmount: 0,
        saleOrderCurrency: "",
        currencyCode: "",
        accCash: [],
        depositLine: [],
        currencyList: [],
        decimalFormat: "n2",
        depositBalance: 0,
        valid: true,
        disableMe: false,
        loggedUser: {
            id: cookie.creator,
            name: cookie.email,
        },
        transactionDate: new Date().toISOString().substr(0, 10),
        templates: [
            {title: "Draft"},
            {title: "Open"},
            {title: "Partially Closed"},
            {title: "Closed"},
        ],
        isHideBar: false,
        PaymentOptionEditor: PaymentOptionEditor,
        // refFrom: []
    }),
    methods: {
        onSOChanged() {
            if (this.saleDeposit) {
                this.saleDeposit.refFrom = []
                if (this.saleDeposit.saleOrder) {
                    const saleOrder = this.saleDeposit.saleOrder || {};
                    const segment = saleOrder.segment || {};
                    const location = saleOrder.location || {};
                    this.saleDeposit.segment = segment;
                    this.saleDeposit.location = location;
                    this.saleDeposit.refFrom.push({
                        id: saleOrder.id || '',
                        reference: saleOrder.number || '',
                        type: 'Sale Order'
                    })
                    // window.console.log(this.saleDeposit.refFrom,'refFrom')
                }
            }
        },
        Help(key_search) {
            ShowResource(key_search);
        },
        saveNew() {
        },
        removeRow(e) {
            e.preventDefault();
            const grid = kendo.jQuery("#gridSaleDeposit").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        numberFormat(obj, type) {
            if (obj) {
                // this.saleDeposit.location = obj.hasOwnProperty("location")
                //     ? obj.location
                //     : {};
                // this.saleDeposit.segment = obj.hasOwnProperty("segment")
                //     ? obj.segment
                //     : {};
                if (type === "amount") {
                    const value = obj.hasOwnProperty("amount") ? obj.amount : 0;
                    const decimalFormat = obj.hasOwnProperty("decimalFormat")
                        ? obj.decimalFormat
                        : `n2`;
                    return kendo.toString(parseFloat(value), decimalFormat);
                } else if (type === "currency") {
                    const currency = obj.hasOwnProperty("currency") ? obj.currency : "";
                    return currency.code;
                }
            }
            return "-";
        },
        amountFormat(value) {
            return kendo.toString(parseFloat(value), `${this.decimalFormat}`);
        },
        generateNumber() {
            if (this.$route.params.id) {
                const tranDate = new Date(this.transactionDate);
                const tranDateInvoice = new Date(this.saleDeposit.transactionDate);
                const tranDateM = tranDate.getFullYear() + tranDate.getMonth();
                const tranDateInvoiceM =
                    tranDateInvoice.getFullYear() + tranDateInvoice.getMonth();
                if (tranDateM === tranDateInvoiceM) {
                    this.saleDeposit.referenceNo = this.referenceNo;
                    return;
                }
            }

            if (this.transactionDate !== "" && this.transactionTypes.length > 0) {
                let data = {
                    abbr: this.saleDeposit.transactionType.abbr,
                    structure: this.saleDeposit.transactionType.structure,
                    transactionDate: this.transactionDate,
                    prefixSeparator: this.saleDeposit.transactionType.prefixSeparator || '',
                    numberSeparator: this.saleDeposit.transactionType.numberSeparator || '',
                    format: this.saleDeposit.transactionType.format || 5,
                    sequcencing: this.saleDeposit.transactionType.sequcencing,
                    type: "Sale Deposit",
                    entity: 1,
                };
                billingHandler
                    .lastNumber(data)
                    .then((response) => {
                        if (response.data.statusCode === 200) {
                            const res = response.data.data;
                            const lastNumber = this.zeroPad(
                                parseInt(res.lastNumber),
                                this.saleDeposit.transactionType.format
                            );
                            this.saleDeposit.number =
                                res.suffix +
                                this.saleDeposit.transactionType.numberSeparator +
                                lastNumber;
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
        errorMessage() {
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
        methodTemplate(dataItem) {
            const method = dataItem.paymentOption || {};
            if (method) {
                return `<span>${method.bankAccountName || ``}</span>`;
            } else {
                return ``;
            }
        },
        amountTemplate(dataItem) {
            const amt = dataItem.amount;
            if (amt) {
                return kendo.toString(
                    parseFloat(amt),
                    `n${this.saleFormContent.decimal}`
                );
            } else {
                return kendo.toString(
                    parseFloat(0),
                    `n${this.saleFormContent.decimal}`
                );
            }
        },
        amountEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    min: 0,
                    decimals: 30,
                    format: `n${this.saleFormContent.decimal}`,
                });
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
        clear() {
            this.showLoading = false;
            this.customer = {};
            const segment = this.saleDeposit.segment;
            const location = this.saleDeposit.location;
            const txnType = this.saleDeposit.transactionType;
            const txnCurrency = this.saleDeposit.currency;
            this.saleDeposit = new SaleDepositModel({});
            this.saleDeposit.transactionType = txnType;
            this.saleDeposit.segment = segment;
            this.saleDeposit.location = location;
            this.saleDeposit.currency = txnCurrency;
            let ds = this.$refs.saleDepositDS.kendoWidget();
            ds.data([]);
            this.saleOrders = [];
            this.addRow();
            this.generateNumber();
        },
        close() {
            this.showLoading = false;
            window.history.go(-1);
        },
        hideSmallSiteBar() {
            this.isHideBar = !this.isHideBar;
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
            this.customer = value;
            this.saleDeposit.saleDepositAcc = value.saleDepositAcc;
            this.decimalFormat = this.customer.decimalFormat;
            this.loadSaleOrders();
            this.loadCustomerBalance(value.id);
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
                                this.decimalFormat = "n" + this.saleFormContent.decimal;
                                this.initData();
                            }
                        }
                    });
                }, 10);
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
                            this.saleDeposit.location = locationDefault[0];
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
                                    if (this.locations.length > 0) {
                                        this.saleDeposit.location = this.locations[0];
                                    }
                                }
                            })
                    }, 10);
                });
            }

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
                            this.saleDeposit.segment = segmentDefault[0];
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
                                    if (this.segments.length > 0) {
                                        this.saleDeposit.segment = this.segments[0];
                                    }
                                }
                            })
                    }, 10);
                });
            }
        },
        async loadPrefix() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    prefixHandler.get("sale deposit").then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.transactionTypes = res.data.data;
                            if (this.transactionTypes.length > 0) {
                                this.saleDeposit.transactionType = this.transactionTypes[0];
                                if (this.$route.params.id === undefined) {
                                    this.generateNumber();
                                }
                            }
                        }
                    });
                }, 10);
            });
        },
        async loadAccount() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    accountHandler.getAll().then((res) => {
                        this.showLoading = false;
                        this.accCustomerDeposit = res.data
                            .filter(
                                (m) =>
                                    m.account_type.number === 20 || m.account_type.number === 28
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
                        if (this.accCustomerDeposit.length > 0) {
                            this.saleDeposit.accReceivable = this.accCustomerDeposit[0];
                        }
                    });
                }, 10);
            });
        },
        async loadSaleOrders() {
            if (this.customer) {
                this.showLoading = true;
                this.saleOrders = [];
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        let data = {
                            method: "by_customer",
                            customer: this.customer.id,
                            type: "Sale Order",
                        };
                        saleOrderHandler.search(data).then((res) => {
                            this.showLoading = false;
                            const response = res.data.data;
                            response.forEach((m) => {
                                const soCurrency = m.txnData;
                                this.saleOrders.push({
                                    id: m.id,
                                    amount: m.total,
                                    number: m.number,
                                    currency: soCurrency.currency,
                                    decimalFormat: m.decimalFormat,
                                    location: soCurrency.location,
                                    segment: soCurrency.segment,
                                });
                            });
                        });
                    }, 10);
                });
            }
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.saleDepositDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        addRow() {
            let ds = this.$refs.saleDepositDS.kendoWidget(),
                total = ds.total();
            this.itemLine.id = itemLinePrefix + uuid.v1();
            this.itemLine.decimalFormat = this.decimalFormat;
            this.itemLine.optionType = OPTION_TYPE;
            ds.insert(total, this.itemLine);
            // this.itemLines.push(this.itemLine)
            // this.itemLines.push(this.itemLine)a
            // window.console.log('item Line', this.itemLine)
        },
        async loadPaymentOption() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.paymentMethod = [];
                    paymentOptionHandler
                        .list(strFilter)
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
                }, 10);
            });
        },
        async loadCurrencyData() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    currencyHandler
                        .list("fun-c")
                        .then((response) => {
                            if (response.data.statusCode === 200) {
                                this.currencyList = response.data.data.filter(
                                    (o) => o.used === 1
                                );
                                if (this.currencyList.length > 0) {
                                    this.saleDeposit.currency = this.currencyList[0];
                                    this.loadTransactionRate();
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
        async loadTransactionRate() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const date = new Date(this.transactionDate)
                        .toISOString()
                        .substr(0, 10);
                    const currency = this.saleDeposit.currency;
                    let code = "";
                    if (currency.hasOwnProperty("code")) {
                        code = currency.code;
                    }

                    if (code !== undefined || code !== "") {
                        this.showLoading = true;
                        currencyHandler
                            .getLastExchangeRateByDate(date, code)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    const response = res.data.data[0];
                                    this.saleDeposit.exchangeRate = response;
                                    this.saleDeposit.txnRate = response.rate;
                                    this.showLoading = false;
                                }
                            });
                    }
                }, 10);
            });
        },
        autoCalculate() {
            let ds = this.$refs.saleDepositDS.kendoWidget(),
                convertedAmount = 0,
                amount = 0;
            ds.data().forEach((value) => {
                if (value.amount) {
                    amount += kendo.parseFloat(value.amount);
                    convertedAmount +=
                        kendo.parseFloat(value.amount) * this.saleDeposit.txnRate;
                }
            });
            window.console.log(convertedAmount, "convertedAmount");
            this.saleDeposit.exchangeAmount = convertedAmount;
            this.saleDeposit.amount = amount;
        },
        dataSourceChanged(e) {
            if (e.field) {
                let dataRow = e.items[0],
                    pOption = {};
                switch (e.field) {
                    case "paymentOption":
                        pOption = dataRow.paymentOption || {};
                        dataRow.set("account", pOption.account || {});
                        break;
                    default:
                        break;
                }
                if (e.field) {
                    this.autoCalculate();
                }
            }
        },
        removeEmptyLine() {
            const grid = kendo.jQuery("#gridSaleDeposit").data("kendoGrid"),
                dataSource = grid.dataSource;
            dataSource.data().forEach((m) => {
                if (m.account.id === undefined) {
                    dataSource.remove(m);
                }
            });
        },
        async onSaveClose(flag) {
            if (!this.$refs.form.validate()) {
                // this.$refs.form.validate()
                this.$snotify.error(
                    "Field is required, please check field each of tabs!"
                );
                return;
            }
            let id = "";
            if (this.customer.hasOwnProperty("id")) {
                id = this.customer.id || "";
            }
            const cur = this.saleDeposit.currency || {};
            if (cur.hasOwnProperty("id")) {
                if (cur.id === "") {
                    this.$snotify.error("Currency is require");
                    return;
                }
            }
            if (id === "") {
                this.$snotify.error("Customer is require");
                return;
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.removeEmptyLine();
                    let itemLineDS = this.$refs.saleDepositDS.kendoWidget();
                    const dataRow = itemLineDS
                        .data()
                        .filter((n) => n.amount > 0)
                        .map((m) => {
                            return new ItemLineModel(m);
                        });

                    if (dataRow.length > 0) {
                        let isAutoGenerate = 1;
                        if (this.$route.params.id) {
                            const tranDate = new Date(this.transactionDate);
                            const tranDateReceipt = new Date(
                                this.saleDeposit.transactionDate
                            );
                            const tranDateM = tranDate.getFullYear() + tranDate.getMonth();
                            const tranDateReceiptM =
                                tranDateReceipt.getFullYear() + tranDateReceipt.getMonth();
                            if (tranDateM === tranDateReceiptM) {
                                isAutoGenerate = 0;
                            }
                        }
                        let data = {
                            id: this.saleDeposit.id ? this.saleDeposit.id : "",
                            type: "Sale Deposit",
                            number: this.saleDeposit.number,
                            uuid: this.saleDeposit.uuid,
                            transactionDate: this.transactionDate,
                            transactionDateTZ: Helper.toISODate(this.transactionDate),
                            journal_uuid: this.saleDeposit.journal_uuid,
                            abbr: this.saleDeposit.transactionType.abbr,
                            customer: this.customer,
                            transactionType: this.saleDeposit.transactionType,
                            itemLine: dataRow,
                            transactionNote: this.saleDeposit.transactionNote,
                            journalNote: this.saleDeposit.journalNote,
                            referenceNo: this.saleDeposit.referenceNo,
                            amount: this.saleDeposit.amount,
                            currency: this.saleDeposit.currency,
                            exchangeAmount: this.saleDeposit.exchangeAmount, // amount to base currency
                            txnRate: this.saleDeposit.txnRate,
                            exchangeRate: this.saleDeposit.exchangeRate,
                            saleDepositAcc: this.saleDeposit.saleDepositAcc,
                            segment: this.saleDeposit.segment,
                            location: this.saleDeposit.location,
                            saleOrder: this.saleDeposit.saleOrder,
                            status: 1,
                            approvedBy: this.saleDeposit.approvedBy,
                            rejectedBy: this.saleDeposit.rejectedBy,
                            formTemplate: {},
                            createdAt: this.saleDeposit.createdAt,
                            loggedUser: this.loggedUser,
                            isAutoGenerate: isAutoGenerate,
                            refFrom: this.saleDeposit.refFrom,
                            refTo: this.saleDeposit.refTo,
                            actionType: this.$route.params.id
                                ? this.$route.query.type
                                : "new",
                        };
                        this.showLoading = true;
                        billingHandler
                            .createDeposit(data)
                            .then((response) => {
                                if (response.data.statusCode === 201) {
                                    this.showLoading = false;
                                    this.$snotify.success("Successfully");
                                    if (flag === "close") {
                                        this.clear();
                                        this.close();
                                    } else if (flag === "new") {
                                        this.clear();
                                    }
                                }
                            })
                            .catch((e) => {
                                this.showLoading = false;
                                this.$snotify.error("Something went wrong");
                                this.errors.push(e);
                            });
                    } else {
                        this.$snotify.error("Account or Amount is require");
                        return;
                    }
                }, 10);
            });
        },
        async loadCustomerBalance(id) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = id + "?type=dep";
                    this.depositBalance = 0;
                    this.currencyCode = "";
                    billingHandler
                        .balance(strFilter)
                        .then((res) => {
                            if (res.data.statusCode === 200) {
                                const data = res.data.data;
                                if (data.length > 0) {
                                    this.depositBalance = data[0].balance;
                                    this.currencyCode = data[0].currency;
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
        async loadViewDeposit() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (this.$route.params.id) {
                        this.showLoading = true;
                        const strFilter = "?id=" + this.$route.params.id;
                        billingHandler
                            .depositList(strFilter)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.disableMe = true;
                                    this.saleDeposit = res.data.data[0];
                                    this.decimalFormat = this.saleDeposit.decimalFormat;
                                    this.depositLine = this.saleDeposit.itemLine;
                                    this.customer = this.saleDeposit.customer;
                                    this.loadCustomerBalance(this.customer.id);
                                    this.transactionDate = this.saleDeposit.transactionDate;
                                    this.loadSaleOrders();
                                    // this.onChange(this)
                                    // this.numberFormat(this.saleDeposit.saleOrder, 'amount')
                                    // this.numberFormat(this.saleDeposit.saleOrder, 'currency')
                                    // this.saleOrders = this.saleDeposit.saleOrder
                                }
                            })
                            .catch();
                        {
                            this.showLoading = false;
                        }
                    }
                }, 10);
            });
        },
        async initData() {
            if (this.$route.params.id !== undefined) {
                await this.loadViewDeposit();
            } else {
                this.addRow();
            }
        },
    },
    created() {
        this.loadAccount();
        this.loadCurrencyData();
    },
    watch: {
        id() {
            if (this.$route.params.id === undefined) {
                this.clear();
            } else {
                this.showLoading = true;
                this.loadViewDeposit();
            }
        },
        '$route': 'loadViewDeposit'
    },
    mounted: async function () {
        await this.loadSaleFormContent();
        await this.loadPrefix();
        await this.loadLocation();
        await this.loadSegment();
        await this.loadPaymentOption();
        await this.loadViewDeposit();
        this.requestData(0, this.filter, this.cusBaseUrl);
        // await this.initData()
    },
    computed: {
        disabled() {
            return !!this.$route.params.id;
        },
        segment() {
            if (this.saleDeposit) {
                if (this.saleDeposit.saleOrder) {
                    if (this.saleDeposit.saleOrder.hasOwnProperty("segment")) {
                        if (this.saleDeposit.saleOrder.hasOwnProperty("id")) {
                            return this.saleDeposit.saleOrder.segment.name;
                        }
                    }
                }
            }
            return "";
        },
        location() {
            if (this.saleDeposit) {
                if (this.saleDeposit.saleOrder) {
                    if (this.saleDeposit.saleOrder.hasOwnProperty("location")) {
                        if (this.saleDeposit.saleOrder.location.hasOwnProperty("id")) {
                            return this.saleDeposit.saleOrder.location.name;
                        }
                    }
                }
            }
            return "";
        },
        validCustomer() {
            return this.customer.id !== undefined && this.customer.id !== null;
        },
        hiddenButton() {
            return !!this.$route.params.id;
        }
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
    height: 96%;
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

.v-data-table__wrapper td {
    border-bottom: 1px solid #808080;
    border-top: 1px solid #808080;
}

element.style {
}

.v-list-item .v-list-item__title,
.v-list-item .v-list-item__subtitle {
    line-height: 1.2;
}
</style>
