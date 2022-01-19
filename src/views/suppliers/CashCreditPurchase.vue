<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12" >
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-row>
                            <v-col class="bigSide py-0" sm="8" cols="12" style="transition: .3s ease-in;"
                                   :class="{'hide_big_bar_class':isHideBar}">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">{{$t('cash_credit_purchase')}}</h2>
                                        <v-icon v-if="isHideBar"
                                                @click="cancel()"
                                                style="cursor: pointer;  font-size: 40px;"
                                                color="grey"
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
                                        <v-row >
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{$t('supplier')}}</label>
                                                <v-select class="mt-1"
                                                          :items="suppliers"
                                                          :rules="[v => !!v || 'Transaction Currency is required']"
                                                          return-object
                                                          tage="Supplier"
                                                          outlined
                                                />

                                                <label class="label mb-0 mt-1">{{$t('segment_location')}}</label>
                                                <v-select class="mt-1"
                                                          :items="suppliers"
                                                          :rules="[v => !!v || 'Transaction Currency is required']"
                                                          return-object
                                                          tage="Segment/ Location"
                                                          outlined
                                                />

                                                <label class="label  mb-0 mt-1"
                                                       style="">{{$t('date')}}</label>
                                                <app-datepicker :initialDate="journal_date"
                                                                @emitDate="journal_date = $event"/>


                                                <label class="label mb-0 mt-1">{{$t('number')}}</label>
                                                <v-row class="my-3 mr-0">
                                                    <v-col sm="3" cols="3" class="py-0 pr-0">
                                                        <div class="code_text">Bil</div>
                                                    </v-col>
                                                    <v-col sm="7" cols="7" class="py-0 pl-0 pr-1">
                                                        <v-text-field class=" custom-border "
                                                                      v-model="bill_date"
                                                                      outlined
                                                                      :rules="[v => !!v || 'Number is required']"
                                                                      required/>
                                                    </v-col>
                                                    <v-col sm="2" cols="2" class="py-0 px-0">
                                                        <v-icon color="black" size="30" class="border_qrcode"
                                                                @click="generateNumber">mdi-qrcode
                                                        </v-icon>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col sm="8" cols="12" class="">
                                                <v-row>
                                                    <v-col sm="6" cols="12" class="pl-0 pt-0">
                                                        <p class="mb-1 d-block">{{$t('current_balance')}}</p>
                                                        <h3 class="color_green float-right">10,500.00</h3>
                                                    </v-col>
                                                    <v-col sm="6" cols="12"  class="pl-0 pt-0">
                                                        <p class="mb-1 d-block">
                                                            {{$t('credit_limit_allowed')}}</p>
                                                        <h3 class="color_green float-left">50%</h3>
                                                        <h3 class="color_green float-right">10,500.00</h3>
                                                    </v-col>
                                                </v-row>
                                                <p class="mb-2 ml-n3 color_grey">{{$t('additional_information')}}</p>

                                                <v-row style="background-color: #fff; height: 239px;"  class="mr-0">
                                                    <v-col class="pb-0" sm="6" cols="12" >
                                                        <label class="label mb-0">{{$t('suppliers_invoice_no')}}</label>
                                                        <v-text-field class="mt-1"
                                                                      outlined
                                                                      tage="Supplier Invoice No."
                                                                      :rules="[v => !!v || 'Supplier invvoice number is required']"
                                                                      required/>

                                                        <label class="label mb-0">{{$t('term')}}</label>
                                                        <v-select class="mt-1"
                                                                  :items="suppliers"
                                                                  :rules="[v => !!v || 'Term  is required']"
                                                                  return-object
                                                                  tage="Term"
                                                                  outlined
                                                        />
                                                    </v-col>
                                                    <v-col class="pb-0" sm="6" cols="12" >
                                                        <label class="label mb-0">{{$t('bill_date')}}</label>
                                                        <app-datepicker :initialDate="journal_date"
                                                                        @emitDate="journal_date = $event"/>

                                                        <label class="label mb-0">{{$t('bill_currency')}}</label>
                                                        <v-select class="mt-1"
                                                                  :items="suppliers"
                                                                  :rules="[v => !!v || 'Bill currency is required']"
                                                                  return-object
                                                                  tage="Bill Currency"
                                                                  outlined
                                                        />
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <h3 class="mb-0 text-uppercase color_grey mb-3">{{$t('products_services')}}</h3>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <kendo-datasource ref="dataSource"
                                                              :data="suppliers_item"
                                            />
                                            <kendo-grid id="grid" class="grid-function"
                                                        :data-source-ref="'dataSource'"
                                                        :sortable="false"
                                                        :filterable="false"
                                                        :column-menu="true"
                                                        :editable="true"
                                                        :scrollable-virtual="true"
                                            >
                                                <kendo-grid-column
                                                        :title="$t('no.')"
                                                        :width="55"
                                                        :column-menu="false"
                                                        :headerAttributes="{
                                                                style: 'background-color: #EDF1F5;',
                                                                class: 'text-products'
                                                            }"
                                                        :attributes="{
                                                                style: 'text-align: products'
                                                            }"/>
                                                <kendo-grid-column
                                                        :field="'account'"
                                                        :title="$t('item')"
                                                        :width="200"
                                                        :template="'<span>#=item.name#</span>'"
                                                        :editor="accountDropDownEditor"
                                                        :headerAttributes="{
                                                                style: 'background-color: #EDF1F5'
                                                            }"/>
                                                <kendo-grid-column
                                                        :field="'description'"
                                                        :title="$t('description')"
                                                        :width="200"
                                                        :headerAttributes="{
                                                                style: 'background-color: #EDF1F5'
                                                            }"/>
                                                <kendo-grid-column
                                                        :field="'amount'"
                                                        :title="$t('qty')"
                                                        :width="160"
                                                        :headerAttributes="{
                                                                style: 'background-color: #EDF1F5'
                                                            }"/>
                                                <kendo-grid-column
                                                        :field="'amount'"
                                                        :title="$t('uom')"
                                                        :width="160"
                                                        :headerAttributes="{
                                                                style: 'background-color: #EDF1F5'
                                                            }"/>
                                                <kendo-grid-column
                                                        :field="'amount'"
                                                        :title="$t('price')"
                                                        :width="160"
                                                        :headerAttributes="{
                                                                style: 'background-color: #EDF1F5'
                                                            }"/>
                                                <kendo-grid-column
                                                        :field="'amount'"
                                                        :title="$t('amount')"
                                                        :width="160"
                                                        :headerAttributes="{
                                                                style: 'background-color: #EDF1F5'
                                                            }"/>
                                                <kendo-grid-column
                                                        :field="'tax'"
                                                        :title="$t('tax')"
                                                        :format="'{0:n}'"
                                                        :width="150"
                                                        :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                        :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column
                                                        :field="'amount'"
                                                        :title="$t('add_cost')"
                                                        :width="160"
                                                        :headerAttributes="{
                                                                style: 'background-color: #EDF1F5'
                                                            }"/>
                                                <kendo-grid-column
                                                        :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow, class: 'btn-plus' }"
                                                        :title="'&nbsp;'"
                                                        :width="100"
                                                        :headerAttributes="{
                                                                style: 'text-align: right; background-color: #EDF1F5'
                                                            }"
                                                />
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row >
                                                <v-col sm="9" cols="12" class="">
                                                    <v-btn class="float-left rounded-0 btn_plus mr-2" @click="addRow">
                                                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                    </v-btn>
                                                    <v-btn class="float-left btn_plus mr-2" @click="addRow">
                                                        <v-icon size="" class="ma-1">fa fa-barcode</v-icon>
                                                    </v-btn>
                                                    <v-btn class="float-left add_account mr-2" to="add_item">
                                                        {{$t('add_item')}}
                                                    </v-btn>
                                                    <v-btn class="float-left add_account mr-2 btn_save_draft">
                                                        {{$t('sub_total')}}
                                                    </v-btn>
                                                    <template>
                                                        <v-file-input class="mt-0 pt-0 " sm="3" cols="6"
                                                                      v-model="files"
                                                                      :placeholder="$t('attachment')"
                                                                      multiple
                                                                      prepend-icon="mdi-paperclip"
                                                        >
                                                            <template v-slot:selection="{ text }">
                                                                <v-chip
                                                                        small
                                                                        label
                                                                        color="primary"
                                                                >
                                                                    {{ text }}
                                                                </v-chip>
                                                            </template>
                                                        </v-file-input>
                                                    </template>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>

                                    <v-row style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <h3 class="mb-0 text-uppercase color_grey mb-3">{{$t('accounts')}}</h3>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <kendo-datasource ref="dataSource"
                                                              :data="suppliers_item"
                                            />
                                            <kendo-grid id="grid" class="grid-function"
                                                        :data-source-ref="'dataSource'"
                                                        :sortable="false"
                                                        :filterable="false"
                                                        :column-menu="true"
                                                        :editable="true"
                                                        :scrollable-virtual="true"
                                            >
                                                <kendo-grid-column
                                                        :title="$t('no.')"
                                                        :width="55"
                                                        :column-menu="false"
                                                        :headerAttributes="{
                                                                style: 'background-color: #EDF1F5;',
                                                                class: 'text-products'
                                                            }"
                                                        :attributes="{
                                                                style: 'text-align: products'
                                                            }"/>
                                                <kendo-grid-column
                                                        :field="'account'"
                                                        :title="$t('account')"
                                                        :width="200"
                                                        :template="'<span>#=item.name#</span>'"
                                                        :editor="accountDropDownEditor"
                                                        :headerAttributes="{
                                                                style: 'background-color: #EDF1F5'
                                                            }"/>
                                                <kendo-grid-column
                                                        :field="'description'"
                                                        :title="$t('description')"
                                                        :width="200"
                                                        :headerAttributes="{
                                                                style: 'background-color: #EDF1F5'
                                                            }"/>
                                                <kendo-grid-column
                                                        :field="'amount'"
                                                        :title="$t('amount')"
                                                        :width="160"
                                                        :headerAttributes="{
                                                                style: 'background-color: #EDF1F5'
                                                            }"/>
                                                <kendo-grid-column
                                                        :field="'tax'"
                                                        :title="$t('tax')"
                                                        :format="'{0:n}'"
                                                        :width="150"
                                                        :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                        :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column
                                                        :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow, class: 'btn-plus' }"
                                                        :title="'&nbsp;'"
                                                        :width="100"
                                                        :headerAttributes="{
                                                                style: 'text-align: right; background-color: #EDF1F5'
                                                            }"
                                                />
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row >
                                                <v-col sm="9" cols="12" class="">
                                                    <v-btn class="float-left btn_plus mr-2" @click="addRow">
                                                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                    </v-btn>
                                                    <v-btn class="float-left add_account mr-2" to="add_item">
                                                        {{$t('add_account')}}
                                                    </v-btn>
                                                    <v-btn class="float-left add_account mr-2 btn_save_draft">
                                                        {{$t('sub_total')}}
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>

                                    <v-row style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-tabs  class="func-tab">
                                                <v-tab>
                                                    <span class="hidden-sm-and-up">
                                                        <v-icon left>mdi-pen</v-icon>
                                                    </span>
                                                        <span class="hidden-sm-and-down">
                                                        {{$t('cash')}}
                                                    </span>
                                                </v-tab>
                                                <v-tab>
                                                    <span class="hidden-sm-and-up">
                                                        <v-icon left>mdi-pen</v-icon>
                                                    </span>
                                                    <span class="hidden-sm-and-down">
                                                        {{$t('credit_card')}}
                                                    </span>
                                                </v-tab>

                                                <v-tab-item>
                                                    <v-row>
                                                        <v-col sm="12" cols="12" >
                                                            <kendo-datasource ref="dataSource"
                                                                              :data="suppliers_item"
                                                            />
                                                            <kendo-grid id="grid" class="grid-function"
                                                                        :data-source-ref="'dataSource'"
                                                                        :sortable="false"
                                                                        :filterable="false"
                                                                        :column-menu="true"
                                                                        :editable="true"
                                                                        :scrollable-virtual="true"
                                                            >
                                                                <kendo-grid-column
                                                                        :title="$t('no.')"
                                                                        :width="55"
                                                                        :column-menu="false"
                                                                        :headerAttributes="{
                                                                            style: 'background-color: #EDF1F5;',
                                                                            class: 'text-products'
                                                                        }"
                                                                        :attributes="{
                                                                            style: 'text-align: products'
                                                                        }"/>
                                                                <kendo-grid-column
                                                                        :field="'account'"
                                                                        :title="$t('account')"
                                                                        :width="200"
                                                                        :template="'<span>#=item.name#</span>'"
                                                                        :editor="accountDropDownEditor"
                                                                        :headerAttributes="{
                                                                            style: 'background-color: #EDF1F5'
                                                                        }"/>
                                                                <kendo-grid-column
                                                                        :field="'description'"
                                                                        :title="$t('description')"
                                                                        :width="200"
                                                                        :headerAttributes="{
                                                                            style: 'background-color: #EDF1F5'
                                                                        }"/>
                                                                <kendo-grid-column
                                                                        :field="'method'"
                                                                        :title="$t('method')"
                                                                        :width="200"
                                                                        :headerAttributes="{
                                                                            style: 'background-color: #EDF1F5'
                                                                        }"/>
                                                                <kendo-grid-column
                                                                        :field="'payment_ref'"
                                                                        :title="$t('payment_ref')"
                                                                        :width="160"
                                                                        :headerAttributes="{
                                                                            style: 'background-color: #EDF1F5'
                                                                        }"/>
                                                                <kendo-grid-column
                                                                        :field="'amount'"
                                                                        :title="$t('amount')"
                                                                        :format="'{0:n}'"
                                                                        :width="150"
                                                                        :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                                        :attributes="{style: 'text-align: right; '}"/>
                                                                <kendo-grid-column
                                                                        :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow, class: 'btn-plus' }"
                                                                        :title="'&nbsp;'"
                                                                        :width="100"
                                                                        :headerAttributes="{
                                                                            style: 'text-align: right; background-color: #EDF1F5'
                                                                        }"
                                                                />
                                                            </kendo-grid>
                                                        </v-col>
                                                        <v-col sm="12" cols="12" class="pb-0">
                                                            <v-row >
                                                                <v-col sm="9" cols="12" class="">
                                                                    <v-btn class="float-left btn_plus mr-2" @click="addRow">
                                                                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                                    </v-btn>
                                                                    <v-btn class="float-left add_account mr-2" to="add_item">
                                                                        {{$t('add_account')}}
                                                                    </v-btn>
                                                                    <v-btn class="float-left add_account mr-2 btn_save_draft">
                                                                        {{$t('sub_total')}}
                                                                    </v-btn>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
                                                </v-tab-item>
                                                <v-tab-item>
                                                    <v-row>
                                                        <v-col sm="12" cols="12">
                                                            <kendo-datasource ref="dataSource"
                                                                            :data="suppliers_item"
                                                            />
                                                            <kendo-grid id="grid" class="grid-function"
                                                                        :data-source-ref="'dataSource'"
                                                                        :sortable="false"
                                                                        :filterable="false"
                                                                        :column-menu="true"
                                                                        :editable="true"
                                                                        :scrollable-virtual="true"
                                                            >
                                                                <kendo-grid-column
                                                                        :title="$t('no.')"
                                                                        :width="55"
                                                                        :column-menu="false"
                                                                        :headerAttributes="{
                                                                        style: 'background-color: #EDF1F5;',
                                                                        class: 'text-products'
                                                                    }"
                                                                        :attributes="{
                                                                        style: 'text-align: products'
                                                                    }"/>
                                                                <kendo-grid-column
                                                                        :field="'account'"
                                                                        :title="$t('card_no')"
                                                                        :width="200"
                                                                        :template="'<span>#=item.name#</span>'"
                                                                        :editor="accountDropDownEditor"
                                                                        :headerAttributes="{
                                                                        style: 'background-color: #EDF1F5'
                                                                    }"/>
                                                                <kendo-grid-column
                                                                        :field="'description'"
                                                                        :title="$t('description')"
                                                                        :width="200"
                                                                        :headerAttributes="{
                                                                        style: 'background-color: #EDF1F5'
                                                                    }"/>
                                                                <kendo-grid-column
                                                                        :field="'payment_ref'"
                                                                        :title="$t('payment_ref')"
                                                                        :width="160"
                                                                        :headerAttributes="{
                                                                        style: 'background-color: #EDF1F5'
                                                                    }"/>
                                                                <kendo-grid-column
                                                                        :field="'amount'"
                                                                        :title="$t('amount')"
                                                                        :format="'{0:n}'"
                                                                        :width="150"
                                                                        :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                                        :attributes="{style: 'text-align: right; '}"/>
                                                                <kendo-grid-column
                                                                        :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow, class: 'btn-plus' }"
                                                                        :title="'&nbsp;'"
                                                                        :width="100"
                                                                        :headerAttributes="{
                                                                        style: 'text-align: right; background-color: #EDF1F5'
                                                                    }"
                                                                />
                                                            </kendo-grid>
                                                        </v-col>
                                                        <v-col sm="12" cols="12" class="pb-0">
                                                            <v-row >
                                                                <v-col sm="9" cols="12" class="">
                                                                    <v-btn class="float-left btn_plus mr-2" @click="addRow">
                                                                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                                    </v-btn>
                                                                    <v-btn class="float-left add_account mr-2" to="add_item">
                                                                        {{$t('add_account')}}
                                                                    </v-btn>
                                                                    <v-btn class="float-left add_account mr-2 btn_save_draft">
                                                                        {{$t('sub_total')}}
                                                                    </v-btn>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
                                                </v-tab-item>
                                            </v-tabs>
                                        </v-col>
                                    </v-row>

                                    <v-row style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-row>
                                                <v-col sm="6" cols="6" class="pt-0">
                                                    <v-card class="no-boxshadow pa-3" color="grayBg">
                                                        <label>{{$t('msg_on_voucher')}}</label>
                                                        <v-textarea class="mt-1"
                                                                    outlined
                                                                    clearable
                                                                    rows="3"
                                                                    placeholder="This will appear on the invoice"
                                                        />
                                                        <label>{{$t('message_for_journal')}}</label>
                                                        <v-textarea class="mt-1"
                                                                    outlined
                                                                    clearable
                                                                    rows="3"
                                                                    placeholder="This will appear on the journal entry"
                                                        />
                                                    </v-card>
                                                </v-col>
                                                <v-col sm="6" cols="6" class="pt-0">
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <tbody>
                                                            <tr>
                                                                <td class="text-left">{{$t('subtotal')}}</td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">10,0000.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left">{{$t('discount')}}</td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">(1,0000)</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left">{{$t('sale_tax')}}</td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">1,0000.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left">{{$t('withholding_tax')}}</td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">12332</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left text-uppercase">{{$t('total')}}</td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right color_green text-bold">1,0000.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left">{{$t('deposit')}} <span class="float-right color_green">500</span></td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    <v-text-field class=" text-right float-right deposite_input"
                                                                                  v-model="deposite"
                                                                                  width="80"
                                                                                  tage="Deposit"
                                                                                  outlined
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left">{{$t('remaining')}}</td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right color_green text-bold">20001</td>
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
                                        <v-alert type="warning"
                                                 v-model="alert"
                                                 dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="mr-2 float-left select_template" v-on="on">
                                                    {{$t('select_template')}}
                                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item v-for="(item, index) in templates" :key="index">
                                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <v-btn class="float-left  btn_cancel" @click="cancel">{{$t('cancel')}}</v-btn>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn class="ml-2 float-right save_option" v-on="on">
                                                    {{$t('save_option')}}
                                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list rounded>
                                                <v-list-item-group>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title v-if="!isEdit" @click="saveNew">
                                                                {{$t('save_new')}}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title @click="savePrint">{{$t('save_print')}}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list-item-group>
                                            </v-list>
                                        </v-menu>
                                        <v-btn class="float-right btn_save_draft">
                                            {{$t('save_draft')}}
                                        </v-btn>

                                    </v-card>
                                </v-form>
                            </v-col>
                            <v-col  class="smallSide" sm="4" style="transition: .3s ease-in;"
                                   :class="{'hide_small_bar_class':isHideBar}">
                                <h3 style="color: #b3b5bc; font-size:20px;" v-if="!isHideBar" class="text-uppercase float-right mt-n3">Help
                                    <v-icon
                                            @click="cancel()"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right mt-n1"
                                    >close
                                    </v-icon>
                                </h3>

                                <div v-if="!isHideBar" class="small_sidebar mt-9 px-4 grayBg">
                                    <v-card class="pa-3 no-boxshadow"  style="min-height: 70px; background-color: #00b050 !important;">
                                        <h3 style="font-size: 18px" class="text-white text-uppercase mb-2">{{$t('amount_purchased')}}</h3>
                                        <h3 class="text-bold float-right text-white" style="font-size: 22px">200</h3>
                                    </v-card>
                                    <v-row>
                                        <v-col sm="12" cols="12">
                                            <h4 class="mb-3 text-uppercase">{{$t('analysis')}}</h4>
                                            <label class="label">{{$t('project')}}</label>
                                            <v-select class="mt-1"
                                                      :items="suppliers"
                                                      label="ABC"
                                                      tage="Project"
                                                      outlined
                                            />
                                            <label class="label">{{$t('employee')}}</label>
                                            <v-select class="mt-1"
                                                      :items="suppliers"
                                                      :rules="[v => !!v || 'Payble Account is required']"
                                                      return-object
                                                      tage="Employee"
                                                      outlined
                                            />
                                            <label class="label">{{$t('for_month_of')}}</label>
                                            <app-datepicker :initialDate="journal_date"
                                                            @emitDate="journal_date = $event"/>
                                        </v-col>
                                    </v-row>
                                    <v-divider class="mb-3"/>
                                    <v-row>
                                        <v-col sm="12" cols="12">
                                            <label class="label text-bold text-uppercase">{{$t('tnc_to_be_added')}}</label>
                                            <v-select class=" my-2"
                                                      :items="transaction"
                                                      :rules="[v => !!v || 'Payble Account is required']"
                                                      return-object
                                                      tage="Transactions to be added"
                                                      outlined
                                            >
                                                <template v-slot:item="{ item }">
                                                    <p class="d-block text-center">{{item.id}}. {{item.name}}</p>
                                                    <br>
                                                    <div class="item_list d-flex">
                                                        <span>
                                                            {{item.no}}
                                                        </span>
                                                        <v-btn>Add</v-btn>
                                                    </div>
                                                </template>
                                            </v-select>

                                            <v-row>
                                                <label class="text-bold ml-9" style="font-size: 12px;">1. {{$t('purchase_order')}}</label>
                                                <v-col sm="9"  cols="9" class="py-0 pr-0">
                                                    <v-card outlined class="px-3 py-1 text-white no-boxshadow no_border justify-left d-flex"
                                                            style="background-color: #92d050; height: 30px">
                                                        <input type="checkbox" class="checkbox_inv float-left"/>
                                                        <p class="mb-0" style="width: 100%">
                                                            <span class="pl-3 float-left">No. 00224</span>
                                                            <span class="float-right">2,500.00</span>
                                                        </p>
                                                    </v-card>
                                                </v-col>
                                                <v-col sm="3"  cols="3" class="py-0  pl-1">
                                                    <v-btn class="text-white text-bold rounded-0 float-right text-uppercase" style="height: 30px !important; background-color: rgb(0, 176, 80) !important">{{$t('add')}}</v-btn>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <label class="text-bold ml-9" style="font-size: 12px;">2. {{$t('good_receipt_note')}}</label>
                                                <v-col sm="9"  cols="9" class="py-0 pr-0">
                                                    <v-card outlined class="px-3 py-1 text-white no-boxshadow no_border justify-left d-flex"
                                                            style="background-color: #92d050; height: 30px">
                                                        <input type="checkbox" class="checkbox_inv float-left"/>
                                                        <p class="mb-0" style="width: 100%">
                                                            <span class="pl-3 float-left">No. 00224</span>
                                                            <span class="float-right">2,500.00</span>
                                                        </p>
                                                    </v-card>
                                                </v-col>
                                                <v-col sm="3"  cols="3" class="py-0  pl-1">
                                                    <v-btn class="text-white text-bold rounded-0 float-right text-uppercase" style="height: 30px !important; background-color: rgb(0, 176, 80) !important">{{$t('add')}}</v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>

                                    <v-divider class="my-3"/>
                                    <v-row>
                                        <v-col sm="12" cols="12">
                                            <label class="label lb_bold text-bold text-uppercase">{{$t('additional_cost')}}</label>
                                            <v-select class=" my-2"
                                                      :items="expense"
                                                      tage="Additional Cost"
                                                      outlined
                                            >
                                            </v-select>
                                            <v-row>
                                                <v-col sm="12"  cols="12" class="py-0">
                                                    <label class="text-bold ml-9" style="font-size: 12px;">1. {{$t('expenses')}}</label>
                                                </v-col>
                                                <v-col sm="8"  cols="8" class="py-0 pr-0">
                                                    <v-card outlined class="px-3 py-1 text-white no-boxshadow no_border justify-left d-flex"
                                                            style="background-color: #92d050; height: 40px">
                                                        <input type="checkbox" class="checkbox_inv float-left mt-2"/>
                                                        <p class="mb-0" style="width: 100%;">
                                                            <span class="pl-3 float-left" style="line-height: 18px">Supplies<br/> No. 00224</span>
                                                            <span class="float-right mt-2">2,500.00</span>
                                                        </p>
                                                    </v-card>
                                                </v-col>
                                                <v-col sm="4"  cols="4" class="py-0  pl-1">
                                                    <v-select class=" pl-3 exp_select"
                                                              :items="expense"
                                                              label="Equal"
                                                              outlined
                                                    />
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col sm="12"  cols="12" class="py-0">
                                                    <label class="text-bold ml-9" style="font-size: 12px;">2. {{$t('expenses')}}</label>
                                                </v-col>
                                                <v-col sm="8"  cols="8" class="py-0 pr-0">
                                                    <v-card outlined class="px-3 py-1 text-white no-boxshadow no_border justify-left d-flex"
                                                            style="background-color: #92d050; height: 40px">
                                                        <input type="checkbox" class="checkbox_inv float-left mt-2"/>
                                                        <p class="mb-0" style="width: 100%;">
                                                            <span class="pl-3 float-left" style="line-height: 18px">Supplies<br/> No. 00224</span>
                                                            <span class="float-right mt-2">2,500.00</span>
                                                        </p>
                                                    </v-card>
                                                </v-col>
                                                <v-col sm="4"  cols="4" class="py-0  pl-1">
                                                    <v-select class=" pl-3 exp_select"
                                                              :items="expense"
                                                              label="Weighted"
                                                              outlined
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>

                                    <p class="mb-0 detial_smallside_p">{{$t('func_purchase_expense')}}</p>
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
        </v-container>
    </v-app>
</template>

<script>
    import {i18n} from '@/i18n';
    import LoadingMe from '@/components/Loading'
    import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'

    export default {
        name: "CreditPurchase",
        components: {
            'LoadingMe': LoadingMe,
            'app-datepicker': DatePickerComponent,
        },
        data: () => ({
            isEdit: false,
            // LoadingMe
            showLoading: false,
            loadingAlert: false,
            loadingColorAlert: '',
            loadingTextAlert: '',
            bill_date: '',
            alert: false,
            deposite: 1000,
            files: [],
            // Form validation
            valid: true,

            journal_types: [],
            suppliers_item: [],
            expense:[
                'Equal',
                'weighted'
            ],
            journal_date: "",
            templates: [
                {title: 'Draft'},
                {title: 'Open'},
                {title: 'Paid'},
                {title: 'Partially Paid'},
            ],
            col_expand: 9,
            col_hide: 3,
            isHideBar: false,
            suppliers: ["Suppliers", "Customer", "Employee"],
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
            item_suppliers  :[
				{
                    name: "Subtotal",
                    value: "10000.00"
				},
				{
					name: "Subtotal",
                    value: "10000.00"
				},
				{
					name: "Subtotal",
                    value: "10000.00"
				},
				{
					name: "Subtotal",
                    value: "10000.00"
				},
				{
					name: "Subtotal",
                    value: "10000.00"
                },
            ]

        }),
        methods: {
            savePrint() {

            },
            saveNew() {

            },
            saveClose() {

            },
            removeRow() {
            },
            generateNumber() {

            },
            errorMessage() {

            },
            addRow() {
            },
            accountDropDownEditor() {
            },
            cancel() {
                this.$swal({
                    title: i18n.t('msg_title_warning'),
                    text: i18n.t('msg_discard'),
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: i18n.t('cancel'),
                    confirmButtonColor: "#4d4848",
                    cancelButtonColor: "#ED1A3A",
                    confirmButtonText: i18n.t('discard'),
                }).then((resultCen) => {
                    window.console.log(resultCen)
                    if (resultCen.value) {
                    this.$router.go(-1);
                    }
                });
            },
            hide_smallsitebar() {
                if (!this.isHideBar) {
                    // this.col_expand = 12
                    // this.col_hide = 0
                    this.isHideBar = true
                } else {
                    // this.col_expand = 9
                    // this.col_hide = 3
                    this.isHideBar = false
                }
            }
        },
        watch: {
            // call again the method if the route changes

        },
        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            // this.loadObj()
        },
        mounted() {


        },
    };
</script>

<style scoped>
    .function_wrapper{
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
        transition: .5s ease-in;
        flex: 0 0 0;
        padding: 0;
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
    .color_grey{
        color: #808080;
    }
    .card_green{
        min-height: 70px;
        background-color: #00b050 !important;
        color: #ffffff;
    }
    .lb_bold{
        font-size: 12px;
    }
    .detial_smallside_p{
        position: absolute;
        bottom: 10px;
    }
    .card_background{
        background-color: #EDF1F5;
        min-height: 120px;
    }
    .deposite_input{
        width: 100px;
    }
    .btn_save_draft{
        color: #ffffff;
        background-color: #00b0f0 !important;
        text-transform: capitalize;
    }
    .save_option{
        background-color: #203864 !important;
    }
    .btn_add_small{
        height: 27px !important;
        min-width: 25px !important;
        font-size: 10px;
        padding: 0 22px !important;
        background-color: #00b050 !important;
        color: #ffffff;
        border-radius: 0 !important;
    }
    .list_site_inv{
        background-color: #92d050;
        color: #ffffff;
        font-size: 12px;
    }
    .list_site_exp{
        background-color: #c5e0b4;
        color: #000000;
        font-size: 12px;
        line-height: 16px;
        min-height: 40px;
    }
    .checkbox_inv{
        padding: 2px;
        margin-top: 3px;
        margin-right: 2px;
    }
    .exp_select{
        font-size:12px !important;
    }

</style>