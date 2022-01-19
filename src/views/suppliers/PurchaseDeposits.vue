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
                                        <h2 class="mb-0">{{ $t("purchase_deposit") }}</h2>
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
                          @click="hideSmallSiteBar"
                          v-if="isHideBar"
                      >
                        mdi-chevron-left-circle
                      </v-icon>
                      <v-icon
                          size="22"
                          class="arr_icon"
                          @click="hideSmallSiteBar"
                          v-if="!isHideBar"
                      >
                        mdi-chevron-right-circle
                      </v-icon>
                    </span>
                                    </v-card>
                                    <v-card
                                        outlined
                                        dense
                                        class="px-3 rounded-4 no_border mb-3"
                                        color="grayBg"
                                    >
                                        <v-row>
                                            <v-col sm="5" cols="12" class="pb-0 px-4 pt-4">
                                                <label class="label  mb-0">{{ $t("supplier") }}</label>
                                                <div class="kendo_dropdown_custom mt-1 pb-3">
                                                    <dropdownlist
                                                        :data-items="supplierList"
                                                        @change="onChange"
                                                        :value="supplier"
                                                        :data-item-key="dataItemKey"
                                                        :text-field="textField"
                                                        :default-item="defaultItem"
                                                        :filterable="true"
                                                        :disabled="disableMe"
                                                        @filterchange="onFilterChange"
                                                        :required="true"
                                                        :valid="validSupplier">
                                                    </dropdownlist>
                                                </div>
                                                <label class="label  mb-0">{{ $t("date") }}</label>
                                                <app-datepicker
                                                    :initialDate="transactionDate"
                                                    :disabled="disableMe"
                                                    @emitDate="transactionDate = $event"
                                                />
                                                <label class="label mb-0">{{ $t("number") }}</label>
                                                <v-row class="mt-1 mr-0">
                                                    <v-col sm="3" cols="3" class="py-0 pr-0">
                                                        <div class="code_text text-bold">
                                                            {{ purchaseDeposit.transactionType.abbr }}
                                                        </div>
                                                    </v-col>
                                                    <v-col sm="7" cols="7" class="py-0 pl-0">
                                                        <v-text-field
                                                            class=" custom-border "
                                                            v-model="purchaseDeposit.number"
                                                            outlined
                                                            readonly
                                                            tage="Number"
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
                                                            :disabled="disableMe"
                                                        >mdi-qrcode
                                                        </v-icon>
                                                    </v-col>
                                                </v-row>
                                                <label class="label mb-0">{{
                                                        $t("transaction_currency")
                                                    }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    v-model="purchaseDeposit.currency"
                                                    :items="currencyList"
                                                    @change="loadTransactionRate"
                                                    item-value="id"
                                                    :item-text="(item) => `${item.code} - ${item.name}`"
                                                    return-object
                                                    :rules="[(v) => !!v['id'] || 'is required']"
                                                    tage="Transaction Currency"
                                                    placeholder="Currency"
                                                    outlined
                                                />
                                            </v-col>
                                            <v-col sm="7" cosl="12" class="px-4 pt-4">
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <v-row>
                                                            <v-col sm="6" cols="12" class="py-0">
                                                                <p class="mb-1 pt-0 d-block">
                                                                    {{ $t("current_deposit_balance") }}
                                                                </p>
                                                                <h3 class="color_green float-right">
                                                                    {{ amountFormat(depositBalance) }}
                                                                    {{ currencyCode }}
                                                                </h3>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                    <v-col sm="12" cols="12" class="py-1 pl-0 ">
                                                        <v-card
                                                            outlined
                                                            dense
                                                            class="no_border px-3 mt-3"
                                                            color="white"
                                                        >
                                                            <v-row>
                                                                <v-col sm="12" cols="12" class="py-0 pt-4">
                                                                    <label class="label mb-0">{{
                                                                            $t("deposit_to_account")
                                                                        }}</label>
                                                                    <v-select
                                                                        class="mt-1"
                                                                        v-model="purchaseDeposit.purchaseDepositAcc"
                                                                        :items="accSupplierDeposit"
                                                                        :disabled="true"
                                                                        :rules="[(v) => !!v || 'Term  is required']"
                                                                        item-value="id"
                                                                        :item-text="
                                      (item) => `${item.number} - ${item.name}`
                                    "
                                                                        return-object
                                                                        placeholder="Account Deposit"
                                                                        tage="Account Deposit"
                                                                        outlined
                                                                    />
                                                                    <label class="label mb-0">{{
                                                                            $t("purchase_order")
                                                                        }}</label>
                                                                    <v-select
                                                                        class="mt-1"
                                                                        v-model="purchaseDeposit.purchaseOrder"
                                                                        :items="purchaseOrders"
                                                                        @change="onPOChanged"
                                                                        item-value="id"
                                                                        item-text="number"
                                                                        return-object
                                                                        clearable
                                                                        tage="Purchase Order"
                                                                        placeholder="Purchase Order"
                                                                        outlined
                                                                    />
                                                                </v-col>
                                                                <v-col sm="12" cols="12" class="py-0">
                                                                    <v-row>
                                                                        <v-col sm="6" cols="12" class="py-0">
                                                                            <label class="label mb-0">{{
                                                                                    $t("amount")
                                                                                }}</label>
                                                                            <p class="mt-3">
                                                                                {{
                                                                                    numberFormat(
                                                                                        purchaseDeposit.purchaseOrder,
                                                                                        "amount"
                                                                                    )
                                                                                }}
                                                                            </p>
                                                                        </v-col>
                                                                        <v-col sm="6" cols="12" class="py-0">
                                                                            <label class="label mb-0">{{
                                                                                    $t("currency")
                                                                                }}</label>
                                                                            <p class="mt-3">
                                                                                {{
                                                                                    numberFormat(
                                                                                        purchaseDeposit.purchaseOrder,
                                                                                        "currency"
                                                                                    )
                                                                                }}
                                                                            </p>
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
                                            <v-col sm="12" cols="12" class="py-0">
                                                <kendo-datasource
                                                    ref="purchaseDepositDS"
                                                    :change="dataSourceChanged"
                                                    :data="depositLine"
                                                />
                                                <kendo-grid
                                                    id="gridPurchaseDeposit"
                                                    class="grid-function"
                                                    :data-source-ref="'purchaseDepositDS'"
                                                    :sortable="false"
                                                    :filterable="false"
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
                                                        :headerAttributes="{ style: 'text-align: right; background-color: #EDF1F5',}"
                                                    />
                                                    <kendo-grid-column
                                                        :title="$t('no.')"
                                                        :width="53"
                                                        :template="rowNumberTmpl"
                                                        :column-menu="false"
                                                        :headerAttributes="{
                              style: 'background-color: #EDF1F5;',
                              class: 'text-products',}"
                                                        :attributes="{ style: 'text-align: products' }"
                                                    />
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
                                                        :field="'amount'"
                                                        :title="$t('amount')"
                                                        :format="'{0:n}'"
                                                        :width="200"
                                                        :template="amountTemplate"
                                                        :headerTemplate="amountLineHeaderTemplate"
                                                        :editor="amountEditor"
                                                        :headerAttributes="{
                              style:
                                'text-align: right; background-color: #EDF1F5',
                            }"
                                                        :attributes="{ style: 'text-align: right' }"
                                                    />
                                                    <kendo-grid-column
                                                        :field="'refNo'"
                                                        :title="$t('payment_ref')"
                                                        :format="'{0:n}'"
                                                        :width="200"
                                                        :headerAttributes="{
                              style:
                                'text-align: right; background-color: #EDF1F5',
                            }"
                                                        :attributes="{ style: 'text-align: right' }"
                                                    />
                                                </kendo-grid>
                                            </v-col>
                                            <v-col sm="12" cols="12" class="pt-1">
                                                <v-btn
                                                    class="float-left btn_plus white--text mr-2"
                                                    color="primary"
                                                    @click="addRow"
                                                >
                                                    <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col sm="12" cols="12" class="py-0">
                                                <v-row>
                                                    <v-col class="pt-0" sm="7" cols="12">
                                                        <v-card
                                                            class="no-boxshadow rounded-4 pa-3"
                                                            color="grayBg"
                                                            height="138px"
                                                        >
                                                            <v-row>
                                                                <v-col class="py-0" sm="6" cols="12">
                                                                    <label>{{ $t("message_on_deposit") }}</label>
                                                                    <v-textarea
                                                                        class="mt-1"
                                                                        no-resize
                                                                        height="90px"
                                                                        v-model="purchaseDeposit.transactionNote"
                                                                        outlined
                                                                        clearable
                                                                        rows="3"
                                                                        placeholder="This will appear on the deposit"
                                                                    />
                                                                </v-col>
                                                                <v-col class="py-0" sm="6" cols="12">
                                                                    <label>{{ $t("message_for_journal") }}</label>
                                                                    <v-textarea
                                                                        class="mt-1"
                                                                        no-resize
                                                                        height="90px"
                                                                        outlined
                                                                        v-model="purchaseDeposit.journalNote"
                                                                        clearable
                                                                        rows="3"
                                                                        placeholder="This will appear on the journal"
                                                                    />
                                                                </v-col>
                                                            </v-row>
                                                        </v-card>
                                                    </v-col>
                                                    <v-col sm="5" cols="12" class="pt-1 pb-0">
                                                        <v-simple-table>
                                                            <template v-slot:default>
                                                                <tbody>
                                                                <tr>
                                                                    <td class="text-left text-uppercase">
                                                                        {{ $t("total") }}
                                                                    </td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-left color_green text-bold">
                                                                        {{
                                                                            amountFormat(
                                                                                purchaseDeposit.exchangeAmount
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
                                    </v-card>

                                    <v-divider/>
                                    <v-card outlined dense class="no_border function_footer">
                                        <v-alert type="warning" v-model="alert" dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                    class="text-capitalize  black--text float-left mr-2"
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
                                            class=" text-capitalize  black--text float-left mr-2"
                                            @click="cancel"
                                        >{{ $t("cancel") }}
                                        </v-btn>
                                        <!--                    <v-menu>-->
                                        <!--                      <template v-slot:activator="{ on }">-->
                                        <!--                        <v-btn color="primary"-->
                                        <!--                               class="ml-2 float-right  text-capitalize white&#45;&#45;text" v-on="on">-->
                                        <!--                          {{ $t('save_option') }}-->
                                        <!--                          <v-icon size="" class="ma-1">expand_more</v-icon>-->
                                        <!--                        </v-btn>-->
                                        <!--                      </template>-->
                                        <!--                      <v-list rounded>-->
                                        <!--                        <v-list-item-group>-->
                                        <!--                          <v-list-item>-->
                                        <!--                            <v-list-item-content>-->
                                        <!--                              <v-list-item-title @click="onSaveClose('new')">-->
                                        <!--                                {{ $t('save_new') }}-->
                                        <!--                              </v-list-item-title>-->
                                        <!--                            </v-list-item-content>-->
                                        <!--                          </v-list-item>-->
                                        <!--                          &lt;!&ndash;                                                    <v-list-item>&ndash;&gt;-->
                                        <!--                          &lt;!&ndash;                                                        <v-list-item-content>&ndash;&gt;-->
                                        <!--                          &lt;!&ndash;                                                            <v-list-item-title @click="savePrint">{{ $t('save_print') }}&ndash;&gt;-->
                                        <!--                          &lt;!&ndash;                                                            </v-list-item-title>&ndash;&gt;-->
                                        <!--                          &lt;!&ndash;                                                        </v-list-item-content>&ndash;&gt;-->
                                        <!--                          &lt;!&ndash;                                                    </v-list-item>&ndash;&gt;-->
                                        <!--                          <v-list-item>-->
                                        <!--                            <v-list-item-content>-->
                                        <!--                              <v-list-item-title>{{-->
                                        <!--                                  $t('save_draft')-->
                                        <!--                                }}-->
                                        <!--                              </v-list-item-title>-->
                                        <!--                            </v-list-item-content>-->
                                        <!--                          </v-list-item>-->
                                        <!--                        </v-list-item-group>-->
                                        <!--                      </v-list>-->
                                        <!--                    </v-menu>-->
                                        <v-btn
                                            color="primary"
                                            @click="onSaveClose('close')"
                                            class="float-right white--text text-capitalize "
                                        >
                                            {{ $t("save_close") }}
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
                                class="smallSide pl-2 pt-0"
                                sm="4"
                                style="transition: .3s ease-in;"
                                :class="{ hide_small_bar_class: isHideBar }"
                            >
                                <div class="d-flex justify-end">
                                    <h3
                                        style="color: #b3b5bc; font-size:20px;"
                                        v-if="!isHideBar"
                                        class="text-uppercase"
                                    >
                    <span class="pointer" @click="Help('purchase deposit')">
                      {{ $t("help") }}
                    </span>
                                        <v-icon
                                            @click="cancel()"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right mt-n1"
                                        >close
                                        </v-icon>
                                    </h3>
                                </div>

                                <div v-if="!isHideBar" class="small_sidebar mt-2 px-4 grayBg">
                                    <v-card outlined dense class="pa-3 no_border my_card rounded-4 white--text"
                                            color="primary" height="60px">
                                        <h3 class="text-left font_13 flex-1 text-uppercase">{{
                                                $t('amount_deposit')
                                            }}</h3>
                                        <h3 class="text-right flex-1 font_20 niradei_heavy">
                                            {{ amountFormat(purchaseDeposit.exchangeAmount) }} </h3>
                                    </v-card>
                                    <v-row>
                                        <v-col sm="12" cols="12">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pt-2">
                                                    <v-row>
                                                        <v-col sm="12" cols="12" class="pb-0 pt-0">
                                                            <label class="label">{{ $t("segment") }}</label>
                                                            <!--                              <h4 class="text-bold py-1">{{ segment }}</h4>-->
                                                            <v-select
                                                                class="mt-1"
                                                                v-model="purchaseDeposit.segment"
                                                                :items="segments"
                                                                item-value="id"
                                                                :item-text="(item) => `${item.code} - ${item.name}`"
                                                                return-object
                                                                :rules="[(v) => !!v['id']|| 'Segment is required']"
                                                                outlined=""
                                                            />
                                                        </v-col>
                                                        <v-col sm="12" cols="12" class="py-0">
                                                            <label class="label">{{ $t("location") }}</label>
                                                            <!--                              <h4 class="text-bold py-1">{{ location }}</h4>-->
                                                            <v-select
                                                                class="mt-1"
                                                                v-model="purchaseDeposit.location"
                                                                :items="locations"
                                                                item-value="id"
                                                                :rules="[(v) => !!v['id']|| 'Location is required']"
                                                                :item-text="(item) => `${item.code} - ${item.name}`"
                                                                return-object
                                                                outlined=""
                                                            />
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

                                    <p class="mb-0 detial_smallside_p pr-4 font_14">
                                        {{ $t("purchase_deposit_desc") }}
                                    </p>
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
import PurchaseDepositModel from "@/scripts/purchase_deposit/model/PurchaseDeposit";
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import {uuid} from "vue-uuid";
import ItemLineModel from "@/scripts/purchase_deposit/model/ItemLine";
import {dataStore, ShowResource} from "@/observable/store";
import PaymentOptionEditor from "@/scripts/kendo_editor/PaymentOptionEditor";
import Helper from "@/helper";

const saleOrderHandler = require("@/scripts/transactionHandler");
const supplierHandler = require("@/scripts/supplierHandler");

const locationHandler = require("@/scripts/locationHandler");
const settingsHandler = require("@/scripts/settingsHandler");
const purchaseDepositModel = new PurchaseDepositModel({});
const prefixHandler = require("@/scripts/prefixHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const accountHandler = require("@/scripts/handler/accounting/account");
const itemLineModel = new ItemLineModel({});
const $ = kendo.jQuery
const paymentOptionHandler = require("@/scripts/paymentOptionHandler");
const currencyHandler = require("@/scripts/currency/handler/currencyHandler");

const defaultItem = {["numberName"]: "Select vendor...", ["id"]: null};
const emptyItem = {["numberName"]: "loading ..."};
const itemLinePrefix = "lin-";
const OPTION_TYPE = "Supplier";
const strFilter = "?optionType=" + OPTION_TYPE;
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
export default {
    name: "PurchaseDeposit",
    props: ["id"],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
        dropdownlist: DropDownList,
    },
    data: () => ({
        isEdit: false,
        showLoading: false,
        alert: false,
        files: [],
        segments: [],
        locations: [],
        purchaseDeposit: purchaseDepositModel,
        itemLine: itemLineModel,
        supplierList: [],
        supplier: {},
        textField: "numberName",
        defaultItem: defaultItem,
        dataItemKey: "id",
        filter: "",
        cusBaseUrl: supplierHandler.search(),
        transactionTypes: [],
        accSupplierDeposit: [],
        paymentMethod: [],
        purchaseOrders: [],
        saleOrderAmount: 0,
        saleOrderCurrency: "",
        currencyCode: "",
        accCash: [],
        depositLine: [],
        currencyList: [],
        decimalFormat: "n2",
        depositBalance: 0,
        valid: true,
        loggedUser: {
            id: cookie.creator,
            name: cookie.email,
        },
        transactionDate: new Date().toISOString().substr(0, 10),
        templates: [
            {title: "Purchase Deposit", value: "Purchase Deposit"},
        ],
        isHideBar: false,
        PaymentOptionEditor: PaymentOptionEditor,
        refFrom: [],
        refTo: [],
    }),
    methods: {
        onPOChanged() {
            if (this.purchaseDeposit) {
                if (this.purchaseDeposit.purchaseOrder) {
                    const saleOrder = this.purchaseDeposit.purchaseOrder || {};
                    const segment = saleOrder.segment || {};
                    const location = saleOrder.location || {};
                    this.purchaseDeposit.segment = segment;
                    this.purchaseDeposit.location = location;
                    this.refFrom.push({
                        id: saleOrder.id || '',
                        reference: saleOrder.number || ''
                    })
                }
                this.purchaseDeposit.refFrom = this.refFrom
            }
        },
        Help(key_search) {
            ShowResource(key_search);
        },
        saveNew() {
        },
        removeRow(e) {
            e.preventDefault();
            const grid = kendo.jQuery("#gridPurchaseDeposit").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        numberFormat(obj, type) {
            if (obj) {
                // this.purchaseDeposit.location = obj.hasOwnProperty('location') ? obj.location : {}
                // this.purchaseDeposit.segment = obj.hasOwnProperty('segment') ? obj.segment : {}
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
                const tranDateInvoice = new Date(this.purchaseDeposit.transactionDate);
                const tranDateM = tranDate.getFullYear() + tranDate.getMonth();
                const tranDateInvoiceM =
                    tranDateInvoice.getFullYear() + tranDateInvoice.getMonth();
                if (tranDateM === tranDateInvoiceM) {
                    this.purchaseDeposit.referenceNo = this.referenceNo;
                    return;
                }
            }

            if (this.transactionDate !== "" && this.transactionTypes.length > 0) {
                let data = {
                    abbr: this.purchaseDeposit.transactionType.abbr,
                    structure: this.purchaseDeposit.transactionType.structure,
                    transactionDate: this.transactionDate,
                    sequcencing: this.purchaseDeposit.transactionType.sequcencing,
                    prefixSeparator: this.purchaseDeposit.transactionType.prefixSeparator || '',
                    numberSeparator: this.purchaseDeposit.transactionType.numberSeparator || '',
                    format: this.purchaseDeposit.transactionType.format || 5,
                    type: "Purchase Deposit",
                    entity: 1,
                };
                billingHandler
                    .lastNumber(data)
                    .then((response) => {
                        if (response.data.statusCode === 200) {
                            const res = response.data.data;
                            const lastNumber = this.zeroPad(
                                parseInt(res.lastNumber),
                                this.purchaseDeposit.transactionType.format
                            );
                            this.purchaseDeposit.number =
                                res.suffix +
                                this.purchaseDeposit.transactionType.numberSeparator +
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
            const method = dataItem.paymentOption || ''
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
        amountEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 30,
                    format: `${this.decimalFormat}`,
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
            this.supplier = {}
            this.purchaseOrders = []
            const segment = this.purchaseDeposit.segment || {}
            const location = this.purchaseDeposit.location || {}
            this.generateNumber()
            const txnType = this.purchaseDeposit.transactionType;
            this.purchaseDeposit = new PurchaseDepositModel({});
            this.purchaseDeposit.transactionType = txnType;
            this.purchaseDeposit.segment = segment
            this.purchaseDeposit.location = location
            // this.depositLine = [];
            let lines = this.$refs.purchaseDepositDS.kendoWidget();
            lines.data([]);
            this.addRow();
        },
        close() {
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
            this.supplierList = json.data;
        },
        onChange(event) {
            const value = event.value;
            if (value && value["numberName"] === emptyItem["numberName"]) {
                return;
            }
            this.supplier = value;
            if (value.hasOwnProperty("id")) {
                if (value.id !== null) {
                    this.decimalFormat = this.supplier.decimalFormat;
                    if (value.hasOwnProperty("baseCurrency")) {
                        if (value.baseCurrency.hasOwnProperty("code")) {
                            this.currencyCode = " " + value.baseCurrency.code;
                        }
                    }
                    this.purchaseDeposit.purchaseDepositAcc = value.hasOwnProperty(
                        "purchaseDepositAcc"
                    )
                        ? value.purchaseDepositAcc
                        : {};
                    this.loadPurchaseOrders();
                    this.loadCustomerBalance(value.id);
                }
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
                            this.purchaseDeposit.location = locationDefault[0];
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
                                    // if (this.locations.length > 0) {
                                    //     this.purchaseDeposit.location = this.locations[0];
                                    // }
                                } else {
                                    this.showLoading = false;
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
                            this.purchaseDeposit.segment = segmentDefault[0];
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
                                } else {
                                    this.showLoading = false;
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
                    prefixHandler.get("purchase deposit").then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.transactionTypes = res.data.data;
                            if (this.transactionTypes.length > 0) {
                                this.purchaseDeposit.transactionType = this.transactionTypes[0];
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
                        this.accSupplierDeposit = res.data
                            .filter((m) => m.account_type.number === 9)
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
                        if (this.accSupplierDeposit.length > 0) {
                            this.purchaseDeposit.accReceivable = this.accSupplierDeposit[0];
                        }
                    });
                }, 10);
            });
        },
        async loadPurchaseOrders() {
            if (this.supplier) {
                this.showLoading = true;
                this.purchaseOrders = [];
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        let data = {
                            method: "by_supplier",
                            supplier: this.supplier.id,
                            type: "Purchase Order",
                        };
                        saleOrderHandler.search(data).then((res) => {
                            this.showLoading = false;
                            const response = res.data.data;
                            response.forEach((m) => {
                                const poData = m.txnData;
                                this.purchaseOrders.push({
                                    id: m.id,
                                    amount: m.total,
                                    number: m.number,
                                    currency: poData.currency,
                                    decimalFormat: m.decimalFormat,
                                    location: poData.location,
                                    segment: poData.segment,
                                });
                            });
                            // window.console.log(this.purchaseOrders,'purchase')
                        });
                    }, 10);
                });
            }
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.purchaseDepositDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        addRow() {
            let ds = this.$refs.purchaseDepositDS.kendoWidget(),
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
                    const currency = this.purchaseDeposit.currency;
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
                                    this.purchaseDeposit.exchangeRate = response;
                                    this.purchaseDeposit.txnRate = response.rate;
                                    this.showLoading = false;
                                }
                            });
                    }
                }, 10);
            });
        },
        autoCalculate() {
            let ds = this.$refs.purchaseDepositDS.kendoWidget(),
                convertedAmount = 0,
                amount = 0;
            ds.data().forEach((value) => {
                if (value.amount) {
                    amount += kendo.parseFloat(value.amount);
                    convertedAmount +=
                        kendo.parseFloat(value.amount) * this.purchaseDeposit.txnRate;
                }
            });
            window.console.log(amount, "amount");
            this.purchaseDeposit.exchangeAmount = convertedAmount;
            this.purchaseDeposit.amount = amount;
        },
        dataSourceChanged(e) {
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
                if (e.field) {
                    this.autoCalculate();
                }
            }
        },
        async onSaveClose(flag) {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                return;
            }
            let id = "";
            if (this.supplier.hasOwnProperty("id")) {
                id = this.supplier.id || "";
            }
            if (id === "") {
                this.$snotify.error("supplier is require");
                return;
            }
            let ds = this.$refs.purchaseDepositDS.kendoWidget();
            let d1 = ds.data();
            let dataValidate = 0;
            d1.forEach((value, index) => {
                window.console.log(1, value);
                if (
                    value.account == undefined ||
                    value.account.id == undefined ||
                    value.account.id == null
                ) {
                    this.$snotify.error("Please check Account  on row " + (index + 1));
                } else {
                    dataValidate += 1;
                }
            });
            if (d1.length == dataValidate) {
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        let itemLineDS = this.$refs.purchaseDepositDS.kendoWidget();
                        const dataRow = itemLineDS.data().filter((n) => n.amount > 0).map(m => {
                            return new ItemLineModel(m)
                        });
                        // window.console.log(1, dataRow);
                        if (dataRow.length > 0) {
                            let isAutoGenerate = 1;
                            if (this.$route.params.id) {
                                const tranDate = new Date(this.transactionDate);
                                const tranDateReceipt = new Date(
                                    this.purchaseDeposit.transactionDate
                                );
                                const tranDateM = tranDate.getFullYear() + tranDate.getMonth();
                                const tranDateReceiptM =
                                    tranDateReceipt.getFullYear() + tranDateReceipt.getMonth();
                                if (tranDateM === tranDateReceiptM) {
                                    isAutoGenerate = 0;
                                }
                            }
                            let data = {
                                id: this.purchaseDeposit.id ? this.purchaseDeposit.id : "",
                                type: "Purchase Deposit",
                                uuid: this.purchaseDeposit.uuid
                                    ? this.purchaseDeposit.uuid
                                    : "",
                                journal_uuid: this.purchaseDeposit.journal_uuid
                                    ? this.purchaseDeposit.journal_uuid
                                    : "",
                                number: this.purchaseDeposit.number,
                                abbr: this.purchaseDeposit.transactionType.abbr,
                                transactionDate: this.transactionDate,
                                transactionDateTZ: Helper.toISODate(this.transactionDate),
                                supplier: this.supplier,
                                transactionType: this.purchaseDeposit.transactionType,
                                itemLine: dataRow,
                                transactionNote: this.purchaseDeposit.transactionNote,
                                journalNote: this.purchaseDeposit.journalNote,
                                referenceNo: this.purchaseDeposit.referenceNo,
                                amount: this.purchaseDeposit.amount,
                                currency: this.purchaseDeposit.currency,
                                exchangeAmount: this.purchaseDeposit.exchangeAmount, // amount to base currency
                                txnRate: this.purchaseDeposit.txnRate,
                                purchaseDepositAcc: this.purchaseDeposit.purchaseDepositAcc,
                                exchangeRate: this.purchaseDeposit.exchangeRate,
                                segment: this.purchaseDeposit.segment,
                                location: this.purchaseDeposit.location,
                                purchaseOrder: this.purchaseDeposit.purchaseOrder,
                                status: 1,
                                approvedBy: this.purchaseDeposit.approvedBy,
                                rejectedBy: this.purchaseDeposit.rejectedBy,
                                formTemplate: {},
                                createdAt: this.purchaseDeposit.createdAt,
                                loggedUser: this.loggedUser,
                                refFrom: this.purchaseDeposit.refFrom || [],
                                refTo: this.purchaseDeposit.refTo || [],
                                isAutoGenerate: isAutoGenerate,
                                actionType: this.$route.params.id
                                    ? this.$route.query.type
                                    : "new",
                            };
                            this.showLoading = true;
                            // window.console.log('data', JSON.stringify(data))
                            billingHandler.createPurchaseDeposit(data).then((response) => {
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
                            }).catch((e) => {
                                this.showLoading = false;
                                this.$snotify.error("Something went wrong");
                                this.errors.push(e);
                            });
                        }
                    }, 10);
                });
            }
        },
        async loadCustomerBalance(id) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = id + "?type=dep";
                    this.depositBalance = 0;
                    // this.currencyCode = ''
                    billingHandler
                        .balance(strFilter)
                        .then((res) => {
                            if (res.data.statusCode === 200) {
                                const data = res.data.data;
                                if (data.length > 0) {
                                    this.depositBalance = data[0].balance;
                                    this.currencyCode = " " + data[0].currency;
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
                            .purchaseDepositList(strFilter)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;

                                    this.purchaseDeposit = res.data.data[0];
                                    this.loadPurchaseOrders();

                                    this.decimalFormat = this.purchaseDeposit.decimalFormat;
                                    this.depositLine = this.purchaseDeposit.itemLines;
                                    this.supplier = this.purchaseDeposit.supplier;
                                    this.loadCustomerBalance(this.supplier.id);
                                    this.transactionDate = this.purchaseDeposit.transactionDate;

                                    // this.onChange(this)
                                    // this.numberFormat(this.saleDeposit.purchaseOrder, 'amount')
                                    // this.numberFormat(this.saleDeposit.purchaseOrder, 'currency')
                                    // this.purchaseOrders = this.saleDeposit.purchaseOrder
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
        reload() {
            if (this.$route.params.id !== undefined) {
                this.loadViewDeposit()
            } else {
                this.clear()
            }
        }
    },
    created() {
        this.loadAccount();
        this.loadCurrencyData();
    },
    watch: {
        // id() {
        //   if (this.$route.params.id === undefined) {
        //     this.clear();
        //   } else {
        //     this.showLoading = true;
        //     this.loadViewDeposit();
        //   }
        // },
        '$route': 'reload'
    },
    mounted: async function () {
        await this.loadPrefix();
        await this.loadLocation();
        await this.loadSegment();
        await this.loadPaymentOption();
        this.requestData(0, this.filter, this.cusBaseUrl);
        await this.initData();
    },
    computed: {
        disableMe() {
            return !!this.$route.params.id;
        },
        amountLineHeaderTemplate() {
            if (this.purchaseDeposit) {
                // window.console.log(this.purchaseDeposit.currency)
                if (this.purchaseDeposit.hasOwnProperty("currency")) {
                    const currency = this.purchaseDeposit.currency.hasOwnProperty("code")
                        ? this.purchaseDeposit.currency.code
                        : "";
                    if (currency) {
                        return "Amount (" + currency + ")";
                    } else {
                        return "Amount";
                    }
                }
            }
            return "Amount";
        },
        // segment() {
        //   if (this.purchaseDeposit) {
        //     if (this.purchaseDeposit.purchaseOrder) {
        //       if (this.purchaseDeposit.purchaseOrder.hasOwnProperty('segment')) {
        //         if (this.purchaseDeposit.purchaseOrder.hasOwnProperty('id')) {
        //           return this.purchaseDeposit.purchaseOrder.segment.name
        //         }
        //       }
        //     }
        //   }
        //   return ''
        // },
        // location() {
        //   if (this.purchaseDeposit) {
        //     if (this.purchaseDeposit.purchaseOrder) {
        //       if (this.purchaseDeposit.purchaseOrder.hasOwnProperty('location')) {
        //         if (this.purchaseDeposit.purchaseOrder.location.hasOwnProperty('id')) {
        //           return this.purchaseDeposit.purchaseOrder.location.name
        //         }
        //       }
        //     }
        //   }
        //   return ''
        // },
        validSupplier() {
            let supplier = this.supplier;
            return supplier.id !== undefined && supplier.id !== null;
        },
        hiddenButton() {
            if (this.$route.params.id) {
                return true
            } else {
                return false
            }
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
