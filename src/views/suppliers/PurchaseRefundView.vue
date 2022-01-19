<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col>
                    <div class="function_wrapper relatvive pt-3">
                        <v-row>
                            <v-col class="bigSide" sm="8" cols="12" style="transition: .3s ease-in;"
                                   :class="{'hide_big_bar_class':isHideBar}">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <div class="function_header">
                                        <h2>{{$t('payment_refund')}}</h2>
                                        <v-icon v-if="isHideBar"
                                                onclick="window.history.go(-1); return false;"
                                                style="cursor: pointer; color: #333; font-size: 40px;"
                                                class="float-right"
                                        >close
                                        </v-icon>
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
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{$t('supplier')}}</label>
                                                <h3 class="text-bold  py-1">Supplier</h3>
                                            </v-col>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{$t('date')}}</label>
                                                <h3 class="text-bold  py-1">07-04-2020</h3>
                                            </v-col>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{$t('segment_location')}}</label>
                                                <h3 class="text-bold  py-1">MAIN</h3>
                                            </v-col>
                                        </v-row>
                                        <!-- Grid -->
                                        <div class="table_1">
                                            <v-row class="pt-5 pb-2"
                                               style="background-color: #fff; width: 100%; margin: 10px auto 0;">
                                                <v-col cosl="12" class="mb-0">
                                                    <p class="mb-0">{{$t('item_deposit_refunded')}}</p>
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
                                        </div>
                                        <div class="table_3">
                                            <v-row class="pt-5 pb-2"
                                               style="background-color: #fff; width: 100%; margin: 10px auto 0;">
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
                                                                style: 'text-align: products'}"/>
                                                        <kendo-grid-column
                                                                :field="'deposit_account'"
                                                                :title="$t('deposit_account')"
                                                                :width="200"
                                                                :template="'<span>#=item.name#</span>'"
                                                                :editor="accountDropDownEditor"
                                                                :headerAttributes="{
                                                                style: 'background-color: #EDF1F5'}"/>
                                                        <kendo-grid-column
                                                                :field="'description'"
                                                                :title="$t('description')"
                                                                :width="200"
                                                                :headerAttributes="{
                                                                style: 'background-color: #EDF1F5' }"/>
                                                        <kendo-grid-column
                                                                :field="'reference'"
                                                                :title="$t('reference')"
                                                                :width="160"
                                                                :column-menu="false"
                                                                :headerAttributes="{
                                                                style: 'background-color: #EDF1F5'}"/>
                                                        <kendo-grid-column
                                                                :field="'amount'"
                                                                :title="$t('uom')"
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
                                      
                                        </div>
                                        <div class="table_2">
                                            <v-row class="pt-5 pb-2"
                                               style="background-color: #fff; width: 100%; margin: 10px auto 0;">
                                                <v-col cosl="12" class="mb-0">
                                                    <p class="mb-0">{{$t('cash_account_useed_refund')}}</p>
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
                                                                :field="'method'"
                                                                :title="$t('method')"
                                                                :width="160"
                                                                :headerAttributes="{
                                                                style: 'background-color: #EDF1F5'
                                                            }"/>
                                                        <kendo-grid-column
                                                                :field="'payment_ref'"
                                                                :title="$t('payment_ref')"
                                                                :format="'{0:n}'"
                                                                :width="150"
                                                                :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                                :attributes="{style: 'text-align: right; '}"/>
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
                                            </v-row>
                                            <!-- table bottom -->
                                            <v-row style="background-color: #fff;">
                                             
                                            </v-row>
                                            <v-row style="background-color: #fff;">
                                                <v-col sm="6" cols="12">
                                                    <v-row>
                                                        <v-col sm="6" cols="12">
                                                            <label>{{$t('message_on_cash_refund')}}</label>
                                                                <h4 class="text-bold py-2">This will appear on the cash refund</h4>
                                                        </v-col>
                                                        <v-col sm="6" cols="12">
                                                            <label>{{$t('message_for_journal')}}</label>
                                                                <h4 class="text-bold py-2">This will appear on the journal entry</h4>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                                <v-col sm="6" cols="12">
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <tbody>
                                                                <tr>
                                                                    <td class="text-left">{{$t('subtotal')}}</td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-left text-bold">10,0000.00</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text-left">{{$t('discount')}}</td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-left text-bold">(1,0000)</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text-left">{{$t('total_tax')}}</td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-left text-bold">1,0000.00</td>
                                                                </tr>
                                                                 <tr>
                                                                    <td class="text-left">{{$t('total_amount_refunded')}}</td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-left text-bold color_green">1,0000.00</td>
                                                                </tr>
                                                            </tbody>
                                                        </template>
                                                    </v-simple-table>
                                                </v-col>
                                            </v-row>

                                        </div>
                                    </div>
                                    <v-divider/>
                                    <div class="function_footer mt-0 py-2">
                                        <v-alert type="warning"
                                                 v-model="alert"
                                                 dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
                                        <p class="float-left  color_grey py-3 mb-0">{{$t('standard_commercial_invoice')}}</p>
                                        
                                        <v-btn class="float-right save_option mx-1">
                                            {{$t('print')}}
                                        </v-btn>
                                        <v-btn class="float-right btn_delete mx-1">
                                            {{$t('delete')}}
                                        </v-btn>
                                        <v-btn class="float-right btn_save_draft mx-1">
                                            {{$t('edit')}}
                                        </v-btn>
                                    </div>
                                    <v-divider/>
                                </v-form>
                            </v-col>
                            <v-col class="smallSide" sm="4" style="transition: .3s ease-in;"
                                   :class="{'hide_small_bar_class':isHideBar}">
                                <h3 style="color: #b3b5bc; font-size:20px;" v-if="!isHideBar" class="text-uppercase float-right mt-4">Help     
                                    <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right mt-n1"
                                    >close
                                    </v-icon></h3>
                            
                                <div v-if="!isHideBar" class="small_sidebar" style="background-color:#F8F8F9;">
                                    <v-card class="pa-2 third card_green text-bold rounded-0">
                                        <p style="color: #badeb0    " class="text text-uppercase">{{$t('amount_returned')}}</p>
                                        <p class="number mb-0 text-bold text-right">200 </p>
                                    </v-card>
                                    <h4 class="my-2 text-uppercase">{{$t('analysis')}}</h4>
                                    <v-row>
                                        <v-col sm="6" cols="6" class="py-1">
                                            <label class="label">{{$t('employee')}}</label>
                                            <h4 class="text-bold py-1">ABC</h4>

                                        </v-col>
                                        <v-col sm="6" cols="6" class="py-1">
                                            <label class="label">{{$t('project')}}</label>
                                            <h4 class="text-bold py-1">ABC</h4>
                                            <label class="label">{{$t('batch_session_no')}}</label>
                                            <h4 class="text-bold py-1">1010101</h4>
                                        </v-col>
                                    </v-row>
                                    <v-divider class="my-3"/>
                                    <p class="color_grey mt-6 mb-2">{{$t('transaction_history')}}</p>
                                    <p class="mb-1">{{$t('last_edited_by')}} : <span class="text-bold">Sim Chankiriroth</span></p>
                                    <p class="mb-1">{{$t('last_edited_on')}} :  <span class="text-bold">20 May 2020 – 6:00 PM</span></p>
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

    export default {
        name: "CreditPurchase",
        components: {
            'LoadingMe': LoadingMe,
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
        margin-top: 15.4%;
        position: relative;
        padding: 10px;
        background-color: #EDF1F5;
    }

    .iconArrow {
        margin-right: -17px;
        right: 35.8%;
        top: 9%;
        position: absolute;
    }

    .iconArrowHide {
        top: 9%;
        position: absolute;
        right: 8.6%;
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
    .bg_white{
        background-color: #ffffff;
        color: #000000;
        box-shadow: 0 0 black !important;
    }
    .btn_save_draft{
        color: #ffffff;
        background-color: #92d050 !important;
        text-transform: capitalize;
    }
   .btn_delete{
        color: #ffffff;
        background-color: #00b050 !important;
        text-transform: capitalize;
    }

</style>