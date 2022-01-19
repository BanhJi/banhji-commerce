<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col>
                    <div class="function_wrapper relatvive pt-3">
                        <v-row>
                            <v-col class="bigSide pt-0" :sm="col_expand" cols="12" style="transition: .3s ease-in;"
                                   :class="{'hide_big_bar_class':isHideBar}">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <div class="function_header pb-0">
                                        <h2>{{$t('invoice')}}</h2>
                                        <span style="transition: .3s ease-in; z-index:10;"
                                              :class="{'iconArrow': !isHideBar,'iconArrowHide': isHideBar }">
                                            <v-icon size="16"
                                                class="arr_icon"
                                                @click="hide_smallsitebar"
                                                v-if="isHideBar"> mdi-chevron-left-circle
                                            </v-icon>
                                            <v-icon size="16"
                                                class="arr_icon"
                                                @click="hide_smallsitebar"
                                                v-if="!isHideBar"> mdi-chevron-right-circle
                                            </v-icon>
										</span>
                                    </div>
                                    <div class="function_content">
                                        <!-- Form -->
                                        <v-row class="px-6">
                                            <v-col>
                                                <v-row>
                                                    <v-col sm="4" cols="12" class="pb-0">
                                                        <label class="label  mb-0">{{$t('supplier')}}</label>
                                                        <v-select class="mt-1"
                                                                  :items="suppliers"
                                                                  :rules="[v => !!v || 'Transaction Currency is required']"
                                                                  return-object
                                                                  outlined
                                                        >

                                                        </v-select>

                                                        <label class="label mb-0 mt-1">{{$t('segment_location')}}</label>
                                                        <v-select class="mt-1"
                                                                  :items="suppliers"
                                                                  :rules="[v => !!v || 'Transaction Currency is required']"
                                                                  return-object
                                                                  outlined
                                                        >
                                                        </v-select>

                                                        <label class="label  mb-0 mt-1"
                                                               style="">{{$t('journal_date')}}</label>
                                                        <app-datepicker :initialDate="journal_date"
                                                                        @emitDate="journal_date = $event"/>


                                                        <label class="label mb-0 mt-1">{{$t('number')}}</label>
                                                        <v-row class="my-3 mr-0">
                                                            <v-col sm="2" cols="3" class="pt-0 pr-0">
                                                                <div class="code_text">Bil</div>
                                                            </v-col>
                                                            <v-col sm="8" cols="8" class="pt-0 pl-0 pr-1">
                                                                <v-text-field class=" custom-border "
                                                                              v-model="bill_date"
                                                                              outlined
                                                                              :rules="[v => !!v || 'Number is required']"
                                                                              required/>
                                                            </v-col>
                                                            <v-col sm="2" cols="2" class="pt-0 pl-0">
                                                                <v-icon color="black" size="30" class="border_qrcode"
                                                                        @click="generateNumber">mdi-qrcode
                                                                </v-icon>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>

                                                    <v-col sm="8" cols="12" class="pb-0">
                                                        <v-row class>
                                                            <v-col sm="6" cols="12">
                                                                <p class="mb-1 d-block">{{$t('current_balance')}}</p>
                                                                <h3 class="color_green float-right">10,500.00</h3>
                                                            </v-col>
                                                            <v-col sm="6" cols="12">
                                                                <p class="mb-1 d-block">
                                                                    {{$t('credit_limit_allowed')}}</p>
                                                                <h3 class="color_green float-left">50%</h3>
                                                                <h3 class="color_green float-right">10,500.00</h3>
                                                            </v-col>
                                                        </v-row>
                                                        <p class="mb-0 ml-n3 color_grey">{{$t('additional_information')}}</p>
                                                        <v-row class="info_add">
                                                            <v-col sm="6" cols="12">

                                                                <label class="label mb-0">{{$t('suppliers_invoice_no')}}</label>
                                                                <v-text-field class="mt-1"
                                                                              outlined
                                                                              :rules="[v => !!v || 'Supplier invvoice number is required']"
                                                                              required/>

                                                                <label class="label mb-0">{{$t('term')}}</label>
                                                                <v-select class="mt-1"
                                                                          :items="suppliers"
                                                                          :rules="[v => !!v || 'Term  is required']"
                                                                          return-object
                                                                          outlined
                                                                />

                                                                <label class="label mb-0">{{$t('payable_account')}}</label>
                                                                <v-select class="mt-1"
                                                                          :items="suppliers"
                                                                          :rules="[v => !!v || 'Payble Account is required']"
                                                                          return-object
                                                                          outlined
                                                                />
                                                            </v-col>
                                                            <v-col sm="6" cols="12">
                                                                <label class="label mb-0">{{$t('bill_date')}}</label>
                                                                <app-datepicker :initialDate="journal_date"
                                                                                @emitDate="journal_date = $event"/>

                                                                <label class="label mb-0">{{$t('due_date')}}</label>
                                                                <app-datepicker :initialDate="journal_date"
                                                                                @emitDate="journal_date = $event"/>
                                                                <label class="label mb-0">{{$t('bill_currency')}}</label>
                                                                <v-select class="mt-1"
                                                                          :items="suppliers"
                                                                          :rules="[v => !!v || 'Bill currency is required']"
                                                                          return-object
                                                                          outlined
                                                                />
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                            </v-col>

                                        </v-row>
                                        <!-- Grid -->
                                        <div class="table_1">
                                            <v-row class="pt-5 pb-2"
                                               style="background-color: #fff; width: 100%; margin: 10px auto 0;">
                                                <v-col cols="12">
                                                    <h3 class="text-uppercase color_grey">{{$t('products_services')}}</h3>
                                                </v-col>
                                                <v-col sm="12" cols="12" class="pa-0">
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
                                                                :width="45"
                                                                :column-menu="false"
                                                                :headerAttributes="{
                                                                style: 'background-color: #EDF1F5;',
                                                                class: 'text-products'
                                                            }"
                                                                :attributes="{
                                                                style: 'text-align: products'
                                                            }"/>
                                                        <kendo-grid-column
                                                                :field="'item'"
                                                                :title="$t('items')"
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
                                                                :field="'qty'"
                                                                :title="$t('qty')"
                                                                :hidden="true"
                                                                :width="160"
                                                                :headerAttributes="{
                                                                style: 'background-color: #EDF1F5'
                                                            }"/>
                                                        <kendo-grid-column
                                                                :field="'uom'"
                                                                :title="$t('uom')"
                                                                :format="'{0:n}'"
                                                                :width="150"
                                                                :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                                :attributes="{style: 'text-align: right; '}"/>
                                                        <kendo-grid-column
                                                                :field="'price'"
                                                                :title="$t('price')"
                                                                :format="'{0:n}'"
                                                                :width="150"
                                                                :headerAttributes="{
                                                                    style: 'text-align: right; background-color: #EDF1F5'
                                                                }"
                                                                :attributes="{
                                                                    style: 'text-align: right'
                                                                }"/>
                                                        <kendo-grid-column
                                                                :field="'amount'"
                                                                :title="$t('amount')"
                                                                :format="'{0:n}'"
                                                                :width="150"
                                                                :headerAttributes="{
                                                                    style: 'text-align: right; background-color: #EDF1F5'
                                                                }"
                                                                :attributes="{
                                                                    style: 'text-align: right'
                                                                }"/>
                                                        <kendo-grid-column
                                                                :field="'tax'"
                                                                :title="$t('tax')"
                                                                :format="'{0:n}'"
                                                                :width="150"
                                                                :headerAttributes="{
                                                                    style: 'text-align: right; background-color: #EDF1F5'
                                                                }"
                                                                :attributes="{
                                                                    style: 'text-align: right'
                                                                }"/>
                                                        <kendo-grid-column
                                                                :field="'add_cost'"
                                                                :title="$t('Add.cost')"
                                                                :format="'{0:n}'"
                                                                :width="150"
                                                                :headerAttributes="{
                                                                    style: 'text-align: right; background-color: #EDF1F5'
                                                                }"
                                                                :attributes="{
                                                                    style: 'text-align: right'
                                                                }"/>
                                                        <kendo-grid-column
                                                                :field="'discount'"
                                                                :title="$t('discount_value')"
                                                                :format="'{0:n}'"
                                                                :width="150"
                                                                :headerAttributes="{
                                                                    style: 'text-align: right; background-color: #EDF1F5'
                                                                }"
                                                                :attributes="{
                                                                    style: 'text-align: right'
                                                                }"/>
                                                        <kendo-grid-column
                                                                :field="'discount'"
                                                                :title="$t('discount_amount')"
                                                                :format="'{0:n}'"
                                                                :width="150"
                                                                :headerAttributes="{
                                                                    style: 'text-align: right; background-color: #EDF1F5'
                                                                }"
                                                                :attributes="{
                                                                    style: 'text-align: right'
                                                                }"/>
                                                        <kendo-grid-column
                                                                :field="'reference_no'"
                                                                :title="$t('reference_no')"
                                                                :format="'{0:n}'"
                                                                :width="150"
                                                                :headerAttributes="{
                                                                    style: 'text-align: right; background-color: #EDF1F5'
                                                                }"
                                                                :attributes="{
                                                                    style: 'text-align: right'
                                                                }"/>
                                                        <kendo-grid-column
                                                                :field="'class'"
                                                                :title="$t('Class(Class1-5)')"
                                                                :format="'{0:n}'"
                                                                :width="150"
                                                                :headerAttributes="{
                                                                    style: 'text-align: right; background-color: #EDF1F5'
                                                                }"
                                                                :attributes="{
                                                                    style: 'text-align: right'
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
                                            </v-row>
                                            <!-- table bottom -->
                                            <v-row style="background-color: #fff;">
                                                <v-col sm="9" cols="12" class="">
                                                    <v-btn class="float-left btn_plus mr-2" @click="addRow">
                                                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                    </v-btn>
                                                    <v-btn class="float-left btn_plus mr-2" @click="addRow">
                                                        <v-icon size="" class="ma-1">fa-menu</v-icon>
                                                    </v-btn>
                                                    <v-btn class="float-left add_account mr-2" to="add_item">
                                                        {{$t('add_item')}}
                                                    </v-btn>
                                                    <v-btn class="float-left add_account mr-2">
                                                        {{$t('sub_total')}}
                                                    </v-btn>
                                                    <template>
                                                        <v-file-input class="mt-0 pt-0" sm="3" cols="6"
                                                                    v-model="files"
                                                                    :placeholder="$t('attactment')"
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
                                        </div>
                                        <div class="table_2">
                                            <v-row class="pt-5 pb-2"
                                               style="background-color: #fff; width: 100%; margin: 10px auto 0;">
                                                <v-col cols="12">
                                                    <h3 class="text-uppercase color_grey">{{$t('accounts')}}</h3>
                                                </v-col>
                                                <v-col sm="12" cols="12" class="pa-0">
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
                                                                :width="45"
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
                                                                :hidden="true"
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
                                            </v-row>
                                            <!-- table bottom -->
                                            <v-row style="background-color: #fff;">
                                                <v-col sm="7" cols="12" class="">
                                                    <v-btn class="float-left btn_plus mr-2" @click="addRow">
                                                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                    </v-btn>
                                                    <v-btn class="float-left add_account mr-2" to="add_item">
                                                        {{$t('add_account')}}
                                                    </v-btn>
                                                    <v-btn class="float-left add_account mr-2">
                                                        {{$t('sub_total')}}
                                                    </v-btn>
                                                </v-col>
                                                <v-col sm="5" cols="12">
                                                    <p>{{$t('follow_sm_add_cost')}}</p>
                                                </v-col>
                                            </v-row>
                                            <v-row style="background-color: #fff;">
                                                <v-col sm="7" cols="12">
                                                    <div class="pa-2 card_background">
                                                        <v-row>
                                                            <v-col sm="6" cols="12">
                                                                <label>{{$t('msg_on_voucher')}}</label>
                                                                <v-textarea class=" custom-border "
                                                                            outlined
                                                                            placeholder="This will appear on the invoice"
                                                                            />
                                                            </v-col>
                                                            <v-col sm="6" cols="12">
                                                                <label>{{$t('message_for_journal')}}</label>
                                                                <v-textarea class=" custom-border "
                                                                            outlined
                                                                            />
                                                            </v-col>
                                                        </v-row>
                                                    </div>
                                                </v-col>
                                                <v-col sm="5" cols="12">
                                                    
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </div>

                                    <div class="function_footer">
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
                                        <v-btn class="float-right btn_save_close" @click="saveClose">
                                            {{$t('save_close')}}
                                        </v-btn>

                                    </div>
                                </v-form>
                            </v-col>
                            <v-col class="smallSide" style="transition: .3s ease-in;"
                                   :class="{'hide_small_bar_class':isHideBar}">

                                <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 35px;"
                                        class="float-right mt-n4 mr-n4 ml-2"
                                >close
                                </v-icon>
                                <h3 v-if="!isHideBar" class="text-uppercase float-right mt-n2 ">{{$t('help')}}</h3>
                                <div v-if="!isHideBar" class="small_sidebar" style="background-color:#F8F8F9;">
                                    <v-card class="pa-2 third card_green text-bold rounded-0">
                                        <p class="text text-uppercase">{{$t('amount_purchased')}}</p>
                                        <p class="number mb-0 text-bold text-right">200 </p>
                                    </v-card>
                                    <h4 class="my-2 text-uppercase">{{$t('analysis')}}</h4>

                                    <label class="label">{{$t('project')}}</label>
                                    <v-select class=" my-2"
                                                :items="suppliers"
                                                :rules="[v => !!v || 'Payble Account is required']"
                                                return-object
                                                outlined
                                    />

                                    <label class="label">{{$t('empoyee')}}</label>
                                    <v-select class=" my-2"
                                                :items="suppliers"
                                                :rules="[v => !!v || 'Payble Account is required']"
                                                return-object
                                                outlined
                                    />

                                    <label class="label">{{$t('for_month_of')}}</label>
                                    <app-datepicker :initialDate="journal_date"
                                                    @emitDate="journal_date = $event"/>
                                    <v-divider class="my-3"/>

                                    <label class="label lb_bold text-bold text-uppercase">{{$t('tnc_to_be_added')}}</label>
                                    <v-select class=" my-2"
                                                :items="transaction"
                                                :rules="[v => !!v || 'Payble Account is required']"
                                                return-object
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

                                    <v-divider class="my-3 mt-5"/>
                                    <label class="label lb_bold text-bold text-uppercase">{{$t('additional_cost')}}</label>
                                    <v-select class=" my-2"
                                                :items="transaction"
                                                :rules="[v => !!v || 'Payble Account is required']"
                                                return-object
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

                                    <p class="mb-0 detial_smallside_p">{{$t('func_purchase_expense')}}</p>
                                </div>
                            </v-col>
                        </v-row>

                    </div>
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
    // import kendo from '@progress/kendo-ui'
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
            files: [],
            // Form validation
            valid: true,

            journal_types: [],
            suppliers_item: [],
            journal_date: "",
            templates: [
                {title: 'Default'},
                {title: 'Custom'},
            ],
            col_expand: 8,
            col_hide: 4,
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
        max-width: 0%;
        transition: .5s ease-in;
        flex: 0 0 0%;
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
        height: 95%;
        margin-top: 23%;
        position: relative;
        padding: 10px;
        background-color: #EDF1F5;
    }

    .iconArrow {
        margin-top: 24px;
        margin-right: -17px;
        right: 30.3%;
        top: 7%;
        position: absolute;
    }

    .iconArrowHide {
        margin-top: 24px;
        margin-right: -17px;
        top: 7%;
        position: absolute;
        right: 12.3%;
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

</style>