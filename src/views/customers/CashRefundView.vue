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
                                        <h2 class="mb-0">{{$t('cash_refund')}}</h2>
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
                                    <v-card  outlined dense class="px-3 no_border" color="grayBg">
                                        <v-row>
                                            <v-col sm="3" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{$t('customer')}}</label>
                                                <h3 class="text-bold  py-1">customer</h3>
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
                                    </v-card>

                                    <v-row class="pt-3" style="background-color: #fff;">
                                        <v-col sm="12" cols="12">
                                            <p class="mb-0">Items and deposit to be refunded</p>
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
                                                        :field="'service_date'"
                                                        :title="$t('service_date')"
                                                        :width="200"
                                                        :template="'<span>#=item.name#</span>'"
                                                        :editor="accountDropDownEditor"
                                                        :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                        :field="'item'"
                                                        :title="$t('item')"
                                                        :width="200"
                                                        :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                        :field="'description'"
                                                        :title="$t('description')"
                                                        :width="160"
                                                        :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                        :field="'qty'"
                                                        :title="$t('qty')"
                                                        :format="'{0:n}'"
                                                        :width="150"
                                                        :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                        :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column
                                                        :field="'uom'"
                                                        :title="$t('uom')"
                                                        :format="'{0:n}'"
                                                        :width="150"
                                                        :headerAttributes="{
                                                                        style: 'text-align: right; background-color: #EDF1F5'
                                                                    }"
                                                        :attributes="{
                                                                        style: 'text-align: right'
                                                                    }"/>
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
                                                        :field="'discount_value'"
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
                                      <v-row class="pt-3" style="background-color: #fff;">
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
                                                        :field="'desosit_account'"
                                                        :title="$t('service_date')"
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
                                                        :format="'{0:n}'"
                                                        :width="150"
                                                        :headerAttributes="{
                                                                        style: 'text-align: right; background-color: #EDF1F5'
                                                                    }"
                                                        :attributes="{
                                                                        style: 'text-align: right'
                                                                    }"/>
                                                <kendo-grid-column
                                                        :field="'account'"
                                                        :title="$t('account')"
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
                                    <v-row class="pt-3" style="background-color: #fff;">
                                        <v-col sm="12" cols="12">
                                            <p class="mb-0">Cash Account Used for refund</p>
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
                                                        :field="'method'"
                                                        :title="$t('method')"
                                                        :format="'{0:n}'"
                                                        :width="150"
                                                        :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                        :attributes="{style: 'text-align: right; '}"/>
                                    
                                                  <kendo-grid-column
                                                        :field="'payment_ref'"
                                                        :title="$t('payment_ref')"
                                                        :format="'{0:n}'"
                                                        :width="150"
                                                        :headerAttributes="{
                                                                        style: 'text-align: right; background-color: #EDF1F5'
                                                                    }"
                                                        :attributes="{
                                                                        style: 'text-align: right'
                                                                    }"/>
                                                <kendo-grid-column
                                                        :field="'account'"
                                                        :title="$t('account')"
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
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row >
                                                <v-col sm="6" cols="12" class="">
                                                    <v-row>
                                                        <v-col sm="6" cols="12">
                                                            <label>{{$t('message_on_cash_refund')}}</label>
                                                            <h4 class="text-bold py-2">This will appear on the credit memo</h4>
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
                                                                    <td class="text-left text-capitalize">{{$t('subtotal')}}</td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-right">10,0000.00</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text-left text-capitalize">{{$t('discount')}}</td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-right">(1,0000)</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text-left text-capitalize">{{$t('total_tax')}}</td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-right">1,0000.00</td>
                                                                </tr>
                                                             
                                                                <tr>
                                                                    <td class="text-left text-capitalize">{{$t('total_amount_refunded')}}</td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-right color_green text-bold">10,000.00</td>
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
                                        <p class="float-left py-2 mb-0  color_grey">{{$t('standard_commercial_invoice')}}</p>
                                        <v-btn class="float-right save_option mx-1">
                                            {{$t('print')}}
                                        </v-btn>
                                        <v-btn class="float-right btn_delete mx-1">
                                            {{$t('delete')}}
                                        </v-btn>
                                        <v-btn class="float-right btn_save_draft mx-1">
                                            {{$t('edit')}}
                                        </v-btn>
                                    </v-card>
                                    <v-divider/>
                                </v-form>
                            </v-col>

                            <v-col class="smallSide" sm="4" style="transition: .3s ease-in;"
                                   :class="{'hide_small_bar_class':isHideBar}">
                                <h3 style="color: #b3b5bc; font-size:20px;" v-if="!isHideBar" class="text-uppercase float-right mt-n3">Help
                                    <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right mt-n1"
                                    >close
                                    </v-icon>
                                </h3>
                            
                                <div v-if="!isHideBar" class="small_sidebar mt-9 px-4 grayBg">
                                    <v-card class="pa-3 no-boxshadow"  style="min-height: 70px; background-color: #00b050 !important;">
                                        <h3 style="font-size: 18px" class="text-white text-uppercase mb-2">{{$t('amount_returned')}}</h3>
                                        <h3 class="text-bold float-right text-white" style="font-size: 22px">200</h3>
                                    </v-card>
                                    <h4 class="my-2 mt-4 text-uppercase">{{$t('analysis')}}</h4>
                                    <v-row>
                                        <v-col sm="6" cols="6" class="py-1">
                                            <label class="label">{{$t('employee')}}</label>
                                            <h4 class="text-bold py-1">ABC</h4>
                                            <label class="label">{{$t('sale_channel')}}</label>
                                            <h4 class="text-bold py-1">Facebook</h4>

                                        </v-col>
                                        <v-col sm="6" cols="6" class="py-1">
                                            <label class="label">{{$t('project')}}</label>
                                            <h4 class="text-bold py-1">ABC</h4>
                                            <label class="label">{{$t('batch_session_no')}}</label>
                                            <h4 class="text-bold py-1">1010101</h4>
                                        </v-col>
                                    </v-row>
                                    <div  class="my-3" style="height:3px; background-color:#ffffff;width:100%;"></div>
                                    <p class="color_grey mt-6 mb-2">{{$t('transaction_history')}}</p>
                                    <p class="mb-1">{{$t('last_edited_by')}} : <span class="text-bold">Sim Chankiriroth</span></p>
                                    <p class="mb-1">{{$t('last_edited_on')}} :  <span class="text-bold">20 May 2020 – 6:00 PM</span></p>
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
                {title: 'Partially Closed'},
                {title: 'Closed'},
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
    .btn_save_draft{
        color: #ffffff;
        background-color: #00b0f0 !important;
        text-transform: capitalize;
    }
    .btn_delete{
        color: #ffffff;
        background-color:#00b050  !important;
        text-transform: capitalize;
    }
    .save_option{
        background-color: #203864 !important;
    }

</style>