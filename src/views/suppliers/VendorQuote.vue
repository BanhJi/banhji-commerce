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
                                        <h2 class="mb-0">{{$t('vendor_quote')}}</h2>
                                        <v-icon
                                            v-if="isHideBar"
                                            @click="cancel()"
                                            style="cursor: pointer; font-size: 40px;"
                                            color="grey"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                        <span
                                            style="transition: .3s ease-in; z-index:10;"
                                            :class="{
                        iconArrow: !isHideBar,
                        iconArrowHide: isHideBar,
                      }">
                      <v-icon
                          size="22"
                          class="arr_icon"
                          @click="hide_smallsitebar"
                          v-if="isHideBar">
                        mdi-chevron-left-circle
                      </v-icon>
                      <v-icon
                          size="22"
                          class="arr_icon"
                          @click="hide_smallsitebar"
                          v-if="!isHideBar">
                        mdi-chevron-right-circle
                      </v-icon></span
                                        >
                                    </v-card>

                                    <!-- Body -->

                                    <v-card
                                        outlined
                                        dense
                                        class="px-3 rounded-4 no_border"
                                        color="grayBg"
                                        height="254px"
                                    >
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{ $t("supplier") }}</label>
                                                <div class="kendo_dropdown_custom pb-3 mt-1">
                                                    <dropdownlist
                                                        class="v-input__slot"
                                                        :data-items="supplierList"
                                                        @change="onChange"
                                                        :value="transaction.supplier"
                                                        :data-item-key="dataItemKey"
                                                        :text-field="textField"
                                                        :default-item="defaultItem"
                                                        :filterable="true"
                                                        :required="true"
                                                        :valid="valid1"
                                                        @filterchange="onFilterChange"
                                                    >
                                                    </dropdownlist>
                                                </div>
                                                <label class="label">{{ $t("number") }}</label>
                                                <v-row class="mt-1 mr-0">
                                                    <v-col sm="3" cols="3" class="pt-0 pb-0 pr-0">
                                                        <div class="code_text text-bold">
                                                            {{ transaction.transactionType.abbr }}
                                                        </div>
                                                    </v-col>
                                                    <v-col sm="7" cols="7" class="pt-0 pb-0 pl-0 pr-1">
                                                        <v-text-field
                                                            class=" custom-border "
                                                            v-model="transaction.number"
                                                            disabled
                                                            outlined
                                                            :rules="[(v) => !!v || 'Number is required']"
                                                            required
                                                        />
                                                    </v-col>
                                                    <v-col sm="2" cols="2" class="pt-0 pb-0 px-0">
                                                        <v-icon
                                                            color="black"
                                                            :disabled="hiddenButton"
                                                            size="30"
                                                            class="border_qrcode"
                                                            @click="generateNumber"
                                                        >mdi-qrcode
                                                        </v-icon>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="mt-0">
                                                    <v-col sm="12" cols="12" class=" pt-0">
                                                        <p class="mb-1 d-block">
                                                            {{ $t("credit_limit_allowed") }}
                                                        </p>
                                                        <h3 class="primary--text mt-2 ml-1 float-left">
                                                            {{ numberFormat(transaction.creditLimit) }}
                                                        </h3>
                                                    </v-col>
                                                </v-row>

                                                <!-- <label class="label">{{
                                                  $t("purchase_order_type")
                                                }}</label>
                                                <v-select
                                                  class="mt-1"
                                                  v-model="purchaseOrderType"
                                                  :items="purchaseOrderTypes"
                                                  item-text="name"
                                                  item-value="id"
                                                  placeholder="Type"
                                                  outlined
                                                /> -->
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label" style="">{{ $t("date") }}</label>
                                                <app-datepicker
                                                    :initialDate="transaction.transactionDate"
                                                    @onChanged="onDateChanged"
                                                    @emitDate="transaction.transactionDate = $event"
                                                />
                                                <label class="label" style="">{{
                                                        $t("due_date")
                                                    }}</label>
                                                <app-datepicker
                                                    :initialDate="transaction.exspectedDate"
                                                    @emitDate="transaction.exspectedDate = $event"
                                                />
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <p class="mb-1 d-block">
                                                            {{ $t("current_balance") }}
                                                        </p>
                                                        <h3 class="primary--text mt-3 ml-1 float-left">
                                                            {{ numberFormat(transaction.currentBalance) }}
                                                        </h3>
                                                    </v-col>
                                                </v-row>

                                                <!-- <label class="label" style="">{{
                                                  $t("expected_date")
                                                }}</label>
                                                <app-datepicker
                                                  :initialDate="transaction.exspectedDate"
                                                  @emitDate="transaction.exspectedDate = $event"
                                                /> -->
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0 pt-2">
                                                <!-- <p class="mb-2 ml-n3 color_grey">{{ $t('additional_information') }}</p> -->

                                                <v-row
                                                    style="background-color: #fff; height: 92%;"
                                                    class="mr-0"
                                                >
                                                    <v-col class="pb-0 pt-1" sm="12" cols="12">
                                                        <label class="label">{{ $t("term") }}</label>
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

                                                        <label class="label mb-0">{{
                                                                $t("price_level")
                                                            }}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            v-model="transaction.priceLevel"
                                                            :items="priceLevels"
                                                            @change="onPriceLevelChange"
                                                            item-value="id"
                                                            item-text="name"
                                                            return-object
                                                            placeholder="Price Level"
                                                            outlined
                                                        />
                                                        <v-col
                                                            sm="6"
                                                            col="6"
                                                            class=" py-0 d-flex justify-space-between"
                                                        >
                                                            <div>
                                                                <p class="label mb-0">{{ $t("currency") }}</p>
                                                                <p class="label mb-0 pt-4 pb-3">
                                                                    {{ currencyCode }}
                                                                </p>
                                                            </div>
                                                            <div class="ml-6">
                                                                <p class="label mb-2">{{ $t("rate") }}</p>
                                                                <p class="label  pt-2 pb-3">
                                                                    {{ transactionRate }}
                                                                </p>
                                                            </div>
                                                        </v-col>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <kendo-datasource
                                                ref="itemLinePODS"
                                                :data="itemLines"
                                                :change="dataSourceChanged"
                                            />
                                            <kendo-grid
                                                id="gridItemLine"
                                                class="grid-function"
                                                :data-source-ref="'itemLinePODS'"
                                                :sortable="false"
                                                :column-menu="true"
                                                :editable="true"
                                                :scrollable-virtual="true"
                                            >
                                                <kendo-grid-column
                                                    :command="{
                            iconClass: 'k-icon k-i-trash',
                            text: ' ',
                            click: removeRow,
                            class: 'btn-plus',
                          }"
                                                    :title="' '"
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
                                                    class="status"
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
                                                    :template="'<span>#=qty#</span>'"
                                                    :width="80"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left; ' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'cost'"
                                                    :title="$t('cost')"
                                                    :width="200"
                                                    :template="
                            '<span>#=kendo.toString(cost || 0, decimalFormat)#</span>'
                          "
                                                    :editor="numberEditor"
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
                                                    :width="200"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :template="
                            '<span>#=kendo.toString(amount || 0, decimalFormat)#</span>'
                          "
                                                    :editor="numberEditor"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{
                            style: 'text-align: right',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'vatTax'"
                                                    :title="$t('tax')"
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
                                                    :hidden="!purchaseFormContent.serviceDate"
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
                                                    :hidden="!purchaseFormContent.serviceDateTo"
                                                    :template="
                            '<span>#= kendo.toString(new Date(serviceDateTo), dateFormat)#</span>'
                          "
                                                    :editor="ServiceDateToEditor"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'discountItem'"
                                                    :title="$t('discount_item')"
                                                    :width="200"
                                                    :hidden="!purchaseFormContent.discountItem"
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

                                                <!--                                                <kendo-grid-column-->
                                                <!--                                                    :field="'otherTax'"-->
                                                <!--                                                    :title="$t('otherTax')"-->
                                                <!--                                                    :width="200"-->
                                                <!--                                                    :hidden="!purchaseFormContent.otherTax"-->
                                                <!--                                                    :template="-->
                                                <!--                            '<span>#=otherTax.defaultTax?otherTax.defaultTax:``#</span>'-->
                                                <!--                          "-->
                                                <!--                                                    :editor="OtherTaxDropDownEditor"-->
                                                <!--                                                    :headerAttributes="{-->
                                                <!--                            style:-->
                                                <!--                              'text-align: left; background-color: #EDF1F5',-->
                                                <!--                          }"-->
                                                <!--                                                    :attributes="{ style: 'text-align: left' }"-->
                                                <!--                                                />-->
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pt-1">

                                            <v-btn
                                                color="primary"
                                                class="float-left btn_plus mr-2"
                                                @click="addRow"
                                            >
                                                <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                            </v-btn>

                                        </v-col>
                                    </v-row>

                                    <v-row style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-row>
                                                <v-col class="pt-0" sm="6" cols="6">
                                                    <v-card
                                                        class="no-boxshadow px-3 pt-3"
                                                        color="grayBg"
                                                        height="230px"
                                                    >
                                                        <label>{{ $t("msg_on_voucher") }}</label>
                                                        <v-textarea
                                                            class="mt-1"
                                                            no-resize
                                                            height="70px"
                                                            v-model="transaction.transactionNote"
                                                            outlined
                                                            clearable
                                                            rows="3"
                                                            placeholder="This will appear on the purchase order"
                                                        />
                                                        <label>{{ $t("message_for_journal") }}</label>
                                                        <v-textarea
                                                            class="mt-1"
                                                            no-resize
                                                            height="70px"
                                                            v-model="transaction.journalNote"
                                                            outlined
                                                            clearable
                                                            rows="3"
                                                            placeholder="This will appear on the journal entry"
                                                        />
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
                                                                        color="primary"
                                                                        outlined
                                                                        class="primary--white text-bold  float-right text-uppercase"
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
                                                            <tr>
                                                                <td
                                                                    class="text-left grayBg text-uppercase pr-0"
                                                                >
                                                                    {{ $t("total") }}
                                                                </td>
                                                                <td class="text-center grayBg">:</td>
                                                                <td
                                                                    class="text-right grayBg text-bold"
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
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                    class="mr-2 text-capitalize  black--text float-left"
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
                                            class="text-capitalize  black--text float-left"
                                            @click="cancel"
                                        >{{ $t("cancel") }}
                                        </v-btn>
                                        <!--                    <v-menu>-->
                                        <!--                      <template v-slot:activator="{ on }">-->
                                        <!--                        <v-btn-->
                                        <!--                            color="primary"-->
                                        <!--                            class="ml-2 float-right text-capitalize  white&#45;&#45;text"-->
                                        <!--                            v-on="on"-->
                                        <!--                        >-->
                                        <!--                          {{ $t("save_option") }}-->
                                        <!--                          <v-icon size="" class="ma-1">expand_more</v-icon>-->
                                        <!--                        </v-btn>-->
                                        <!--                      </template>-->
                                        <!--                      <v-list rounded>-->
                                        <!--                        <v-list-item-group>-->
                                        <!--                          <v-list-item>-->
                                        <!--                            <v-list-item-content>-->
                                        <!--                              <v-list-item-title-->
                                        <!--                                  v-if="!isEdit"-->
                                        <!--                                  @click="saveClose"-->
                                        <!--                              >-->
                                        <!--                                {{ $t("save_close") }}-->
                                        <!--                              </v-list-item-title>-->
                                        <!--                            </v-list-item-content>-->
                                        <!--                          </v-list-item>-->
                                        <!--                          <v-list-item>-->
                                        <!--                            <v-list-item-content>-->
                                        <!--                              <v-list-item-title-->
                                        <!--                                  v-if="!isEdit"-->
                                        <!--                                  @click="saveNew"-->
                                        <!--                              >-->
                                        <!--                                {{ $t("save_new") }}-->
                                        <!--                              </v-list-item-title>-->
                                        <!--                            </v-list-item-content>-->
                                        <!--                          </v-list-item>-->
                                        <!--                          <v-list-item>-->
                                        <!--                            <v-list-item-content>-->
                                        <!--                              <v-list-item-title @click="savePrint"-->
                                        <!--                              >{{ $t("save_print") }}-->
                                        <!--                              </v-list-item-title>-->
                                        <!--                            </v-list-item-content>-->
                                        <!--                          </v-list-item>-->
                                        <!--                        </v-list-item-group>-->
                                        <!--                      </v-list>-->
                                        <!--                    </v-menu>-->
                                        <v-btn
                                            @click="saveClose"
                                            color="primary"
                                            class="float-right white--text text-capitalize ">
                                            {{ $t("save_close") }}
                                        </v-btn>
                                        <v-btn color="secondary"
                                               style="margin-right: 10px !important"
                                               class="white--text float-right text-capitalize"
                                               @click="saveNew" :hidden="hiddenButton">{{ $t("save_new") }}
                                        </v-btn>
                                    </v-card>
                                </v-form>
                            </v-col>
                            <v-col
                                class="smallSide pl-2"
                                sm="4"
                                style="transition: .3s ease-in;"
                                :class="{ hide_small_bar_class: isHideBar }"
                            >
                                <div class="d-flex justify-end">
                                    <h3
                                        style="color: #b3b5bc; font-size:20px;"
                                        v-if="!isHideBar"
                                        class="text-uppercase float-right mt-n3"
                                    >
                    <span class="pointer" @click="Help('purchase order')">
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

                                <div v-if="!isHideBar" class="small_sidebar mt-2 grayBg">
                                    <v-card outlined dense class="pa-3 no_border my_card rounded-4 white--text"
                                            color="primary" height="60px">
                                        <h3 class="text-left font_13 flex-1 text-uppercase">{{
                                                $t('amount_ordered')
                                            }}</h3>
                                        <h3 class="text-right flex-1 font_20 niradei_heavy">
                                            {{ numberFormat(transaction.total) }} </h3>
                                    </v-card>
                                    <v-row>
                                        <v-col sm="12" cols="12" class="pb-0 pt-5">
                                            <!-- <h4 class="mb-3 text-uppercase">{{ $t('analysis') }}</h4> -->
                                            <label class="label mb-0">{{ $t("segment") }}</label>
                                            <v-select
                                                class="mt-1"
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
                                            <label class="label">{{ $t("project") }}</label>
                                            <v-select
                                                class="mt-1"
                                                v-model="transaction.project"
                                                :items="projects"
                                                :item-text="(item) => `${item.code} - ${item.name}`"
                                                item-value="id"
                                                clearable
                                                placeholder="project"
                                                outlined
                                            />
                                            <label class="label">{{ $t("for_month_of") }}</label>
                                            <app-monthof-picker
                                                :initMonthOf="transaction.month_of"
                                                @emitMonthOf="transaction.month_of = $event"
                                            />

                                            <label class="label">{{ $t("employee") }}</label>
                                            <v-col
                                                sm="12"
                                                cols="12"
                                                class="kendo_dropdown_custom pl-0 pb-3 pt-0"
                                                style="padding: 0"
                                            >
                                                <dropdownlist
                                                    style="width: 100%"
                                                    class=" mt-1"
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
                                    <v-divider class=""/>
                                    <!--                                    <v-row>-->
                                    <!--                                        <v-col sm="12" cols="12">-->
                                    <!--                                            <label class="label text-bold text-uppercase">{{-->
                                    <!--                                                    $t("tnc_to_be_added")-->
                                    <!--                                                }}</label>-->
                                    <!--                                            <template v-slot:item="{ item }">-->
                                    <!--                                                <p class="d-block text-center">-->
                                    <!--                                                    {{ item.id }}. {{ item.name }}-->
                                    <!--                                                </p>-->
                                    <!--                                                <br/>-->
                                    <!--                                                <div class="item_list d-flex">-->
                                    <!--                          <span>-->
                                    <!--                            {{ item.no }}-->
                                    <!--                          </span>-->
                                    <!--                                                    <v-btn>{{ $t("add") }}</v-btn>-->
                                    <!--                                                </div>-->
                                    <!--                                            </template>-->

                                    <!--                                            <v-row>-->
                                    <!--                                                <label class="text-bold ml-9" style="font-size: 12px;"-->
                                    <!--                                                >1. {{ $t("sale_order") }}</label-->
                                    <!--                                                >-->
                                    <!--                                                <v-row v-for="item in txnTobeAdd" v-bind:key="item.id">-->
                                    <!--                                                    <v-col sm="9" cols="9" class="py-0 pr-0">-->
                                    <!--                                                        <v-card-->
                                    <!--                                                            outlined-->
                                    <!--                                                            class="px-3 py-1 text-white no-boxshadow no_border justify-left d-flex"-->
                                    <!--                                                            style="background-color: #92d050; height: 30px"-->
                                    <!--                                                        >-->
                                    <!--                                                            <p class="mb-0" style="width: 100%">-->
                                    <!--                                <span class="pl-3 float-left">{{-->
                                    <!--                                        item.number-->
                                    <!--                                    }}</span>-->
                                    <!--                                                                <span class="float-right">{{-->
                                    <!--                                                                        numberFormat(item.total)-->
                                    <!--                                                                    }}</span>-->
                                    <!--                                                            </p>-->
                                    <!--                                                        </v-card>-->
                                    <!--                                                    </v-col>-->
                                    <!--                                                    <v-col sm="3" cols="3" class="py-0  pl-1">-->
                                    <!--                                                        <v-btn-->
                                    <!--                                                            class="text-white text-bold rounded-0 float-right text-uppercase"-->
                                    <!--                                                            style="height: 30px !important; background-color: rgb(0, 176, 80) !important"-->
                                    <!--                                                            @click="addQuote(item)"-->
                                    <!--                                                        >-->
                                    <!--                                                            {{ $t("add") }}-->
                                    <!--                                                        </v-btn>-->
                                    <!--                                                    </v-col>-->
                                    <!--                                                </v-row>-->
                                    <!--                                            </v-row>-->
                                    <!--                                        </v-col>-->
                                    <!--                                    </v-row>-->

                                    <p class="mb-0 detial_smallside_p pl-4">
                                        {{ $t("purchae_order_funct_detial") }}
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
                :myLoading="true"/>
            <v-dialog v-model="dialogTax" max-width="450px">
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("tax_list") }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogTax = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0">
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
                    <v-card-text cl ass="modal_text_content">
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
import {i18n} from "@/i18n";
import TransactionModel from "@/scripts/model/Transaction";
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import kendo from "@progress/kendo-ui";
import {uuid} from "vue-uuid";
import PurchaseFormContentModel from "@/scripts/model/PurchaseFormContent";
import {dataStore, ShowResource} from "@/observable/store";

import ItemLineModel from "@/scripts/invoice/model/ItemLine";
import creditLimitHandler from "@/scripts/creditLimit/handler/creditLimitHandler";
import paymentTermHandler_ from "@/scripts/paymentterm/handler/paymentTermHandler";

const itemLineModel = new ItemLineModel({});

const transactionHandler = require("@/scripts/transactionHandler");
const supplierHandler = require("@/scripts/supplierHandler");
const currencyHandler = require("@/scripts/currency/handler/currencyHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
// const paymentTermHandler = require("@/scripts/paymentTermHandler");
const purchaseFormContentHandler = require("@/scripts/purchaseFormContentHandler");
const settingHandler = require("@/scripts/settingHandler");
const locationHandler = require("@/scripts/locationHandler");
const projectHandler = require("@/scripts/projectHandler");
const discountItemHandler = require("@/scripts/discountItemHandler");
const uomPriceHandler = require("@/scripts/uomPriceHandler");
const employeeHandler = require("@/scripts/employeeHandler");
const priceLevelHandler = require("@/scripts/priceLevelHandler");
const productVariantHandler = require("@/scripts/productVariantHandler");
const prefixHandler = require("@/scripts/prefixHandler");
const settingsHandler = require("@/scripts/settingsHandler");
const saleUnitItemHandler = require("@/scripts/saleUnitItemHandler");
const catalogHandler = require("@/scripts/catalogHandler");
const productHandler = require("@/scripts/productHandler");

const $ = kendo.jQuery
const textField = "numberName";
const keyField = "id";
const defaultItem = {[textField]: "Select Supplier...", [keyField]: null};
const emptyItem = {[textField]: "loading ..."};
const transactionPrefix = "lin-";
const purchaseFormContentModel = new PurchaseFormContentModel({});
const DISCOUNT_TYPE = "?type=Purchase";
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();

const TYPE = 'purchase'
export default {
    name: "PurchaseOrder",
    props: {
        id: {
            type: String,
        },
        initPurchaseOrder: {
            type: TransactionModel,
        },
    },
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": () => import(`@/components/custom_templates/DatePickerComponent`),
        dropdownlist: DropDownList,
        "app-monthof-picker": () => import("@/components/kendo_templates/MonthOfPicker"),
    },
    data: () => ({
        success: false,
        isEdit: false,
        textField: "numberName",
        dataItemKey: "id",
        balance: 0,
        // LoadingMe
        showLoading: false,
        alert: false,
        files: [],
        dialogCatalog: false,
        gridSchema: {
            model: {
                id: "id",
            },
        },
        // Form validation
        valid: true,
        templates: [
            {title: "Purchase Order", value: "Purchase Order",},

        ],
        isHideBar: false,
        transaction: new TransactionModel({}),
        supplierList: [],
        supplier: {},
        catalogs: [],
        dialogTax: false,
        baseCurrencyCode: "",
        supBaseUrl: supplierHandler.search(),
        exchangeRate: {},
        currencyCode: "",
        transactionRate: 1,
        paymentTerms: [],
        employees: [],
        mEmployee: {},
        purchaseFormContent: purchaseFormContentModel,
        segments: [],
        locations: [],
        taxListTotal: {},
        itemLines: [],
        itemLine: itemLineModel,
        dateFormat: itemLineModel.dateFormat,
        projects: [],
        filter: "",
        purchaseOrderType: 1,
        purchaseOrderTypes: [
            {name: "Standard Order", id: 1},
            {name: "Open Order", id: 2},
            {name: "Contract", id: 3},
            {name: "Consignment Order", id: 4},
            {name: "Order required Purchase", id: 5},
        ],
        discountItem: [],
        saleUnit: [],
        defaultItem: defaultItem,
        txnLists: [],
        saveOption: "",
        loggedUser: {
            id: cookie.creator,
            name: cookie.email,
        },
        saleUnitItemList: [],
        tax: [],
        otherTax: [],
        vatTax: [],
        txnTobeAdd: [],
        // withholdingTax: [],
        priceLevels: [],
        errors: [],
        isSaveNew: false,
        isSaveClose: false,
        isSavePrint: false,
        isSaveDraft: false,
        isPriceLevelChanged: false,
        taxListDetail: []
    }),
    methods: {
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
                row['currency'] = this.transaction.exchangeRate || {}
                result.push(row)
                taxDetail = []
            })
            this.transaction.saleTaxDetail = result
        },
        async loadPaymentTermList() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (this.supplier) {
                        const strFilter = '?id=' + this.supplier.id + '&transactionDate=' + this.transaction.transactionDate + '&type=Vendor'
                        this.transaction.paymentTerm = {}
                        paymentTermHandler_.get(strFilter).then((res) => {
                            if (res.data.statusCode === 200) {
                                const terms = res.data.data
                                this.transaction.paymentTerm = terms.term
                                this.onPaymentTermChanged()
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
                    if (this.supplier) {
                        const strFilter = '?id=' + this.supplier.id + '&transactionDate=' + this.transaction.transactionDate + '&type=Vendor'
                        this.transaction.creditLimit = 0
                        creditLimitHandler.get(strFilter).then((res) => {
                            if (res.data.statusCode === 200) {
                                const credit = res.data.data
                                this.transaction.creditLimit = kendo.parseFloat(credit.amount || 0);
                            }
                        });
                    }
                }, 10);
            });
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
        onPriceLevelChange() {
            this.isPriceLevelChanged = true
            this.loadTransactionRate()
            this.clearUOMItem()
        },
        async clearUOMItem() {
            let ds = this.$refs.itemLinePODS.kendoWidget()
            ds.data().map(n => {
                n.set('uom', {})
            })
            this.isPriceLevelChanged = false
        },
        numberEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 30,
                    min: 0.00001,
                    format: `${this.purchaseFormContent.decimal}`,
                });
        },
        Help(key_search) {
            ShowResource(key_search);
        },
        initialData() {
            if (this.id) {
                // Edit Mode
                // this.transaction = this.initPurchaseOrder;
                this.setDefaultData()
                this.loadViewPurchaseOrder()
                // this.bindData();
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
            const paymentTerm = this.transaction.paymentTerm || {}
            this.transaction = new TransactionModel({});
            //month of
            let monthOf = kendo.toString(new Date(this.transaction.transactionDate), "yyyy-MM-dd");
            window.console.log('monthOf', monthOf)
            this.transaction.month_of = monthOf;
            this.transaction.formTemplate = 1;
            let ds = this.$refs.itemLinePODS.kendoWidget();
            ds.data([]);
            // Add 2 default lines
            this.addRow();
            this.loadPrefix();
            this.loadPaymentTerm();
            this.loadPriceLevel();
            this.loadSegment();
            this.loadLocation();
            this.mEmployee = {};
            this.taxListTotal = {};
            this.isSaveNew = false;
            this.isSaveClose = false;
            this.isSavePrint = false;
            this.isSaveDraft = false;
            this.transaction.paymentTerm = paymentTerm
        },
        bindData() {
            // Edit Mode
            this.isEdit = true;
            this.supplier = this.transaction.supplier;
            this.taxListTotal = this.transaction.taxListTotal;
            this.itemLines = this.transaction.itemLines;
            // if (this.supplier.hasOwnProperty('id')) {
            //   this.loadProjectBySupplier()
            // }
        },
        addRow() {
            let ds = this.$refs.itemLinePODS.kendoWidget(),
                total = ds.total();
            this.itemLine.id = transactionPrefix + uuid.v1();
            ds.insert(total, this.itemLine);
        },
        async loadPaymentTerm() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = "?type=pmt-supplier";
                    this.paymentTerms = []
                    settingsHandler.getPaymentTerm(strFilter).then((res) => {
                        this.showLoading = false;
                        this.paymentTerms = res.data.data;
                        // if (this.paymentTerms.length > 0) {
                        //     if (
                        //         this.$route.params.id !== undefined ||
                        //         this.$route.params.id !== ""
                        //     ) {
                        //         this.transaction.paymentTerm = this.paymentTerms[0];
                        //     }
                        // }
                    });
                }, 10);
            });
        },
        async loadPriceLevel() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = '?nature=' + TYPE
                    priceLevelHandler.get(strFilter).then((res) => {
                        this.priceLevels = res;
                        if (this.priceLevels.length > 0) {
                            if (
                                this.$route.params.id !== undefined ||
                                this.$route.params.id !== ""
                            ) {
                                this.transaction.priceLevel = this.priceLevels[0];
                                this.loadTransactionRate();
                            }
                        }
                    });
                }, 10);
            });
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
                            this.transaction.segment = segmentDefault[0];
                        }
                    }
                }
            }else if (roleType === 1) {
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
            }else  if (roleType === 1) {
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        this.locations = [];
                        locationHandler
                            .list()
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.locations = res.data.data;
                                }
                            })
                    }, 10);
                });
            }
        },
        //
        hide_smallsitebar() {
            this.isHideBar = !this.isHideBar;
        },
        //
        onPaymentTermChanged() {
            // this.onDateChanged();
            if (this.supplier) {
                const paymentTerm = this.transaction.paymentTerm || {}
                const netDue = paymentTerm.netDue || 0;
                const someDate = new Date(this.transaction.transactionDate);
                someDate.setDate(someDate.getDate() + parseInt(netDue)); //number  of days to add, e.x. 15 days
                this.transaction.exspectedDate = someDate
            }
        },
        onChange(event) {
            const value = event.value;
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.supplier = value;
            this.transaction.supplier = value;
            // this.invoice = value
            window.console.log("pricelvel", value)
            this.transaction.paymentTerm = value.paymentTerm || {};
            this.transaction.priceLevel = value.priceLevel || {};
            const baseCurrency = value.baseCurrency || {};
            if (baseCurrency.hasOwnProperty("code")) {
                this.baseCurrencyCode = baseCurrency.code;
            }
            // this.loadProjectBySupplier()
            // this.loadPurchase();
            this.onDateChanged();
        },
        onFilterChange(event) {
            const filter = event.filter.value;
            this.requestData(0, filter, this.supBaseUrl);
            this.filter = filter;
        },
        requestData(skip, filter, baseUrl) {
            window.console.log(baseUrl, "requ");
            const url = baseUrl + `?filter=${filter}`;
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then(this.afterFetch);
        },
        afterFetch(json) {
            this.supplierList = json.data;
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
        async onDateChanged() {
            if (this.supplier) {
                await this.loadPaymentTermList();
                await this.loadCreditLimit();
                await this.loadCustomerBalance(this.supplier.id);
                await this.onPriceLevelChange();
                this.transaction.month_of = kendo.toString(new Date(this.transaction.transactionDate), 'yyyy-MM')
                // const paymentTerm = this.transaction.paymentTerm || {}
                // if (paymentTerm) {
                //     const netDue = paymentTerm.netDue || 0;
                //     let someDate = new Date(this.transaction.transactionDate);
                //     someDate.setDate(someDate.getDate() + parseInt(netDue)); //number  of days to add, e.x. 15 days
                //     window.console.log('someDate', someDate, paymentTerm)
                //     this.transaction.exspectedDate = someDate
                // }
                // this.onPaymentTermChanged()
            }
            if (this.$route.params.id === undefined && this.isEdit == false) {
                this.generateNumber();
            }
        },
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
                transactionDate: d,
                type: "Purchase Order",
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
        async loadPrefix() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    prefixHandler.get("purchase order").then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.transactionType = res.data.data;
                            if (this.transactionType.length > 0) {
                                this.transaction.transactionType = this.transactionType[0];
                                if (!this.id) {
                                    this.generateNumber();
                                }
                            }
                        }
                    });
                }, 10);
            });
        },
        async loadPurchaseFormContent() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    purchaseFormContentHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data;
                            if (data.length > 0) {
                                this.purchaseFormContent = data[0];
                            }
                        }
                    });
                }, 10);
            });
        },
        async loadProjectBySupplier() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    // projectHandler.getBySupplier(this.supplier.id).then(res => {
                    projectHandler
                        .list()
                        .then((res) => {
                            this.showLoading = true;
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.projects = res.data.data;
                                // if (this.projects.length > 0) {
                                //     if (!this.id) {
                                //         this.transaction.project = this.projects[0];
                                //     }
                                // }
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 10);
            });
        },
        async loadTax() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    settingHandler.get().then((res) => {
                        this.tax = res;
                        this.otherTax = this.tax.filter((m) => m.taxType.typeId === 7); // valuable tax
                        // this.withholdingTax = this.tax.filter(m => m.taxType.typeId === 2 && m.transactionType === 'Sale') // valuable tax
                        this.vatTax = this.tax.filter(
                            (m) =>
                                m.taxType.typeId === 1 ||
                                m.taxType.typeId === 8 ||
                                m.taxType.typeId === 2
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
        //itemline
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
                // window.console.log(tax, "tax");
                // if (tax.hasOwnProperty("taxType")) {
                //     if (tax.taxType.nature == "Deduct") {
                //         total = total * -1;
                //     }
                // }
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
                let dataRow = e.items[0],
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
                    case "cost":
                        try {
                            amount = parseFloat(dataRow.cost) * parseFloat(dataRow.qty);
                            xAmount = amount * parseFloat(this.transaction.txnRate);

                            dataRow.set("cost", parseFloat(dataRow.cost));
                            dataRow.set("amount", amount);
                            dataRow.set("exchangeAmount", xAmount);
                            // window.console.log('price',dataRow.price)
                        } catch {
                            dataRow.set("cost", 0);
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
                                if (dataRow.uom) {
                                    amount = parseFloat(dataRow.uom.cost) * parseFloat(dataRow.qty);
                                    xAmount = amount * parseFloat(this.transaction.txnRate);

                                    dataRow.set("cost", parseFloat(dataRow.uom.cost));
                                    dataRow.set("amount", amount);
                                    dataRow.set("exchangeAmount", xAmount);
                                } else {
                                    amount = parseFloat(dataRow.cost) * parseFloat(dataRow.qty);
                                    xAmount = amount * parseFloat(this.transaction.txnRate);

                                    dataRow.set("cost", parseFloat(dataRow.cost));
                                    dataRow.set("amount", amount);
                                    dataRow.set("exchangeAmount", xAmount);
                                }
                            } catch (err) {
                                window.console.log("error", err);
                                dataRow.set("buom", {});
                                dataRow.set("conversionRate", 1);
                                dataRow.set("cost", 0);
                                dataRow.set("qoh", 0);
                                dataRow.set("wac", 0);
                                dataRow.set("amount", 0);
                                dataRow.set("exchangeAmount", 0);
                            }
                        }
                        break;
                    case "qty":
                        try {
                            amount = parseFloat(dataRow.cost) * parseFloat(dataRow.qty);
                            xAmount = amount * parseFloat(this.transaction.txnRate);

                            dataRow.set("cost", parseFloat(dataRow.cost));
                            dataRow.set("amount", amount);
                            dataRow.set("exchangeAmount", xAmount);
                        } catch {
                            dataRow.set("cost", 0);
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
        autoCalculate() {
            let ds = this.$refs.itemLinePODS.kendoWidget(),
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
                taxListDetail = [],
                saleUnit = [],
                inclusiveTax = 0,
                itemSubtotal = 0,
                txnItmSubtotal = 0,
                serviceSubtotal = 0,
                itemDiscount = 0,
                serviceDiscount = 0,
                withholdingTaxAmount = 0,
                txnDiscount = 0;

            ds.data().forEach((value) => {
                let modifierPrice = 0, incTax = 0, taxTypeId = 0;
                let vatSpTax = {}, vatPLTax = {}, vatOtherTax = {}
                if (value.modifier) {
                    modifierPrice = kendo.parseFloat(value.modifier.price || 0);
                }

                // subTotal += (kendo.parseFloat(value.amount) + modifierPrice)
                let discount = 0;
                if (value.discountItem) {
                    let subTo =
                        kendo.parseFloat(value.cost) * kendo.parseFloat(value.qty);
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
                            inclusiveTax += parseFloat(spTax || 0);
                            incTax += parseFloat(spTax || 0)
                        }
                    }
                    if (value.specificTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.specificTax.taxType.name,
                            amount: spTax,
                            id: value.specificTax.taxType.id,
                        });
                        const spTax_ = value.specificTax || {}
                        spTax_['taxAmount_'] = spTax
                        // spTax_['taxAmount'] = spTax
                        spTax_['amount'] = value.amount || 0
                        spTax_['discount'] = discount || 0
                        spTax_['txnRate'] = this.transaction.txnRate || 1
                        taxListDetail.push(spTax_);
                        vatSpTax = spTax_
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
                            inclusiveTax += parseFloat(pltax || 0);
                            incTax += parseFloat(pltax || 0)
                        }
                    }
                    if (value.publicLightingTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.publicLightingTax.taxType.name,
                            amount: pltax,
                            id: value.publicLightingTax.taxType.id,
                        });
                        const plTax_ = value.publicLightingTax || {}
                        // tax_['taxAmount'] = pltax
                        plTax_['taxAmount_'] = pltax
                        plTax_['amount'] = value.amount || 0
                        plTax_['discount'] = discount || 0
                        plTax_['txnRate'] = this.transaction.txnRate || 1
                        taxListDetail.push(plTax_);
                        vatPLTax = plTax_
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
                    const tax = value.otherTax;
                    const baseAmount = tax.baseAmount;
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === "inclusive") {
                            inclusiveTax += parseFloat(otherTax || 0);
                            incTax += parseFloat(otherTax || 0)
                        }
                    }
                    if (value.otherTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.otherTax.taxType.name,
                            amount: otherTax,
                            id: value.otherTax.taxType.id,
                        });
                        const tax__ = value.specificTax || {}
                        // tax__['taxAmount'] = otherTax
                        tax__['taxAmount_'] = otherTax
                        tax__['amount'] = value.amount || 0
                        tax__['discount'] = discount || 0
                        tax__['txnRate'] = this.transaction.txnRate || 1
                        taxListDetail.push(tax__);
                        vatOtherTax = tax__
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
                            incTax += vatTax
                        }
                    }
                    if (value.vatTax.hasOwnProperty("taxType")) {
                        const taxType = value.vatTax.taxType || {};
                        taxTypeId = taxType.typeId || 0;
                    }
                    if (taxTypeId === 2) {
                        withholdingTaxAmount += vatTax;
                    }
                    if (value.vatTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.vatTax.taxType.name,
                            amount: vatTax,
                            id: value.vatTax.taxType.id,
                        });
                        const vatTax_ = value.vatTax || {}
                        // vatTax_['taxAmount'] = vatTax
                        vatTax_['taxAmount_'] = vatTax
                        vatTax_['amount'] = value.amount || 0
                        vatTax_['discount'] = discount || 0
                        vatTax_['txnRate'] = this.transaction.txnRate || 1
                        vatTax_['isVat'] = 1
                        vatTax_.detail = {
                            specificTax: vatSpTax,
                            publicLightingTax: vatPLTax,
                            otherTax: vatOtherTax,
                        }
                        taxListDetail.push(vatTax_);
                    }
                }
                totalTax +=
                    kendo.parseFloat(spTax ? spTax : 0) +
                    kendo.parseFloat(pltax ? pltax : 0) +
                    kendo.parseFloat(otherTax ? otherTax : 0) +
                    kendo.parseFloat(vatTax ? vatTax : 0);
                subTotal +=
                    kendo.parseFloat(value.amount) + modifierPrice - incTax;
                window.console.log('subTotal ', subTotal, ' value.amount=', value.amount, ' modifierPrice=', modifierPrice)

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
                    kendo.parseFloat(value.cost) * kendo.parseFloat(value.qty) -
                    discount;
                const includeTaxAmount =
                    amountNodiscount + vatTax + pltax + spTax + otherTax;
                value["includeTaxAmount"] = includeTaxAmount;
                value["includeTaxExchangeAmount"] =
                    includeTaxAmount * kendo.parseFloat(this.transaction.txnRate);
            });
            this.transaction.itemSubtotal = itemSubtotal;
            this.transaction.inclusiveTaxAmount = inclusiveTax;
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
            this.transaction.withholdingTaxAmount = withholdingTaxAmount
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
            this.transaction.total = kendo.parseFloat(total) - discountInvoice - parseFloat(withholdingTaxAmount);
            this.transaction.exchangeAmount =
                kendo.parseFloat(this.transaction.total) *
                kendo.parseFloat(this.transaction.txnRate);
            this.autoCalculateTaxByType(taxList);
            this.discountItem = this.removeDuplicate(discountItem);
            this.saleUnit = this.removeDuplicate(saleUnit);
            this.taxListDetail = taxListDetail
            this.autoCalculateTaxDetail();
            // window.console.log('discount ', this.customerDiscountItem)
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.itemLinePODS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
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
                return `<span>${uom.uom ? uom.uom.name : ``}</span>`;
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
                .jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "id",
                    headerTemplate: "",
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
                    dataTextField: "uom.name",
                    dataValueField: "uom.id",
                    cascadeFrom: "item",
                    template: "<span>#=uom.name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: uomPriceHandler.uomPriceByPriceLevelURL(
                                    "id=" +
                                    options.model.item.id +
                                    "&plId=" +
                                    this.transaction.priceLevel.id +
                                    "&date=" +
                                    this.transaction.transactionDate + "&nature=purchase"
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
                        let ds = this.$refs.itemLinePODS.kendoWidget(),
                            total = ds.total();
                        this.itemLine.id = transactionPrefix + uuid.v1();
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
                                // if (this.employees.length > 0) {
                                //     this.transaction.employee = this.employees[0];
                                // }
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 10);
            });
        },
        onEmployeeFilterChanged() {
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n${this.purchaseFormContent.decimal}`);
            // return value
        },
        async loadTxn() {
            if (this.saleOrder.customer) {
                this.showLoading = true;
                this.quotes = [];
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        let data = {
                            method: "by_customer",
                            customer: this.transaction.supplier.id,
                            type: "Sale Order",
                        };
                        transactionHandler.search(data).then((res) => {
                            this.showLoading = false;
                            this.txnTobeAdd = res.data.data;
                        });
                    }, 10);
                });
            }
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
        //save
        clear() {

        },
        close(data) {
            // if (this.$route.params.id === undefined) {
            //     this.$router.push({
            //         name: "PurchaseOrder",
            //         params: {
            //             data: data,
            //         }
            //     })
            // } else {
            window.history.go(-1);
            // }
            window.console.log(data, "close");
            // localStorage.data.id = JSON.stringify(data)
        },
        async loadPurchase() {
            if (this.transaction.supplier) {
                this.showLoading = true;
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        let data = {
                            method: "by_supplier",
                            supplier: this.transaction.supplier.id,
                            type: "Purchase Order",
                        };
                        transactionHandler.search(data).then((res) => {
                            this.showLoading = false;
                            window.console.log(res, "search by supplier");
                        });
                    }, 10);
                });
            }
        },
        saveClose() {
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
            let ds = this.$refs.itemLinePODS.kendoWidget();
            let d1 = ds.data();
            let dataValidate = 0;
            d1.forEach((value, index) => {
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
                this.isSaveClose = true;
                this.saveOption = "saveClose";
                this.save();
            }
        },
        savePrint() {
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
            let ds = this.$refs.itemLinePODS.kendoWidget();
            let d1 = ds.data();
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
                this.isSavePrint = true;
                this.saveOption = "savePrint";
                this.save();
            }
        },
        saveNew() {
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
            let ds = this.$refs.itemLinePODS.kendoWidget();
            let d1 = ds.data();
            let dataValidate = 0;
            d1.forEach((value, index) => {
                if (
                    value.item.id == undefined ||
                    value.item.id == "" ||
                    value.uom.uom == undefined
                ) {
                    this.$snotify.error(
                        "Please check Item or Uom  on row " + (index + 1)
                    );
                } else {
                    dataValidate += 1;
                }
            });
            if (d1.length == dataValidate) {
                this.saveOption = "saveNew";
                this.isSaveNew = true;
                this.save();
            }
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
            }).then((resultCen) => {
                window.console.log(resultCen);
                if (resultCen.value) {
                    this.$router.go(-1);
                }
            });
        },
        saveDraft() {
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
            let ds = this.$refs.itemLinePODS.kendoWidget();
            let d1 = ds.data();
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
                this.saveOption = "saveDraft";
                this.isSaveDraft = true;
                this.save();
            }
        },
        async save() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.removeEmptyLine();
                    let itemLineDS = this.$refs.itemLinePODS.kendoWidget(),
                        total = itemLineDS.total();
                    if (total <= 0) {
                        this.$snotify.error("Field Required!");
                        return;
                    }
                    const dataRow = itemLineDS
                        .data()
                        .filter((o) => o.amount > 0)
                        .map((n) => {
                            return new ItemLineModel(n);
                        });
                    let txnList = [];
                    const lead = this.transaction.lead || {}
                    const leadId = lead.id || ''
                    if (leadId) {
                        txnList.push(lead);
                    }
                    let data = {
                        id: this.transaction.id ? this.transaction.id : "",
                        type: "Purchase Order",
                        number: this.transaction.number,
                        abbr: this.transaction.transactionType.abbr,
                        transactionDate: this.transaction.transactionDate,
                        validityDate: "",
                        monthOf: this.transaction.monthOf,
                        customer: {},
                        paymentTerm: this.transaction.paymentTerm,
                        transactionType: this.transaction.transactionType,
                        discountPromotion: {},
                        priceLevel: this.transaction.priceLevel,
                        itemLines: dataRow,
                        project: this.transaction.project || {},
                        segment: this.transaction.segment ? this.transaction.segment : {},
                        location: this.transaction.location ? this.transaction.location : {},
                        saleChannel: {},
                        billingAddress: {},
                        deliveryAddress: {},
                        deliveryDateTime: "",
                        transactionNote: this.transaction.transactionNote,
                        subTotal: this.transaction.subTotal,
                        total: this.transaction.total ? this.transaction.total : 0,
                        discountTotal: this.transaction.discountTotal,
                        exchangeAmount: this.transaction.exchangeAmount,
                        specificDiscountTotal: this.transaction.specificDiscountTotal,
                        deliveryFee: this.transaction.deliveryFee,
                        totalTaxAmount: this.transaction.totalTaxAmount,
                        currentBalance: this.transaction.currentBalance,
                        balance: 0,
                        creditLimit: 0,
                        saveOption: this.saveOption,
                        txnRate: this.transaction.txnRate,
                        rate: this.transaction.txnRate,
                        status: 1, //1 open, 0 used,
                        approvedBy: this.transaction.approvedBy,
                        rejectedBy: {},
                        formTemplate: "",
                        specificDiscountItem: this.transaction.specificDiscountItem,
                        otherCharge: [],
                        otherChargeAmount: 0,
                        taxListTotal: this.taxListTotal,
                        progressingStatus: "",
                        customerSaleUnit: this.customerSaleUnit,
                        loggedUser: this.loggedUser,
                        txnList: txnList,
                        publicLink: "",
                        usedDateAt: "",
                        deletedAt: "",
                        deleted: 0,
                        createdAt: new Date().toISOString().substr(0, 10),
                        saleOrderType: 0,
                        employee: this.transaction.employee,
                        supplier: this.transaction.supplier,
                        exchangeRate: this.transaction.exchangeRate,
                        form: 1,
                        lead: {},
                        refFrom: this.transaction.refFrom || [],
                        refTo: this.transaction.refTo || [],
                        exspectedDate: this.transaction.exspectedDate,
                        amountDue: this.transaction.amountDue,
                        saleTaxDetail: this.transaction.saleTaxDetail || [],
                        inclusiveTaxAmount: this.transaction.inclusiveTaxAmount || 0,
                        routeView: "purchase_order_view",
                    };
                    window.console.log('this.transaction.supplier', JSON.stringify(this.transaction.supplier))
                    this.showLoading = true;
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
                            window.console.log(2);
                            this.$snotify.error("Something went wrong");
                            this.errors.push(e);
                            window.console.log(e);
                        });
                }, 10);
            });
        },
        async loadViewPurchaseOrder() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    this.isEdit = false
                    const id = this.$route.params.id
                    const strFilter = '?type=Purchase Order'
                    billingHandler.viewPurchase(id, strFilter).then(async (res) => {
                        if (res.data.statusCode === 200) {
                            this.isEdit = true
                            this.showLoading = false
                            const response = res.data.data[0]
                            this.transaction = response
                            // await this.onDateChanged()
                            this.supplier = this.transaction.supplier || {}
                            this.mEmployee = this.transaction.employee || {}
                            this.itemLines = this.transaction.itemLines || []
                            // this.transaction.paymentTerm = response.paymentTerm || {}
                            this.transaction.month_of = kendo.toString(new Date(this.transaction.transactionDate), 'yyyy-MM')
                            window.console.log('transaction.paymentTerm', response.paymentTerm)
                        } else {
                            this.showLoading = false
                            this.isEdit = false
                        }
                    })
                }, 10)
            })
        },
    },
    watch: {
        '$route': 'initialData'
        // initPurchaseOrder() {
        //   this.initialData();
        // },
    },
    created() {
        this.loadTax();
        this.loadSaleUnitItems();
        this.loadSegment();
        this.loadLocation();
        this.loadProjectBySupplier();
    },
    mounted: async function () {
        await this.loadPurchaseFormContent();
        this.requestData(0, this.filter, this.supBaseUrl);
        await this.loadEmployeeCenter();
        await this.loadCatalogs();
        await this.initialData();
    },
    computed: {
        valid1: function () {
            let supplier = this.transaction.supplier;
            window.console.log(1, supplier.id);
            return supplier.id !== undefined && supplier.id !== null;
        },
        validationMessage: function () {
            let supplier = this.transaction.supplier;
            window.console.log(2, supplier.id);
            return supplier.id !== undefined && supplier.id === null
                ? "Please select a Vendor!"
                : "Please select a Vendor";
        },
        hiddenButton() {
            return !!this.$route.params.id;
        }
    },
};
</script>

<style scoped>
.small_sidebar {
    height: 97%;
    position: relative;
    padding: 12px;
}

.hide_small_bar_class {
    max-width: 0;
    transition: 0.5s ease-in;
    flex: 0 0 0;
    padding: 0;
}

.hide_big_bar_class {
    max-width: 100%;
    transition: 0.5s ease-in;
    flex: 0 0 100%;
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

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.detial_smallside_p {
    position: absolute;
    bottom: 10px;
}
</style>
