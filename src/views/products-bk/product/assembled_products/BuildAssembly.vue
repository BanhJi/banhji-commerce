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
                                        <h2 class="mb-0">{{$t('build_assembly')}}</h2>
                                        <v-icon v-if="isHideBar"
                                                @click="cancel()"
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
                                    <v-card outlined dense class="px-3 no_border"  color="grayBg" height="172px">
                                        <v-row >
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label ">{{$t('finished_product_variance')}}</label>
                                                <v-select class="mt-1"
                                                          :placeholder="$t('select_type')"
                                                          tage="Finished Product Variance"
                                                          :rules="[v => !!v || 'Transaction Currency is required']"
                                                          return-object
                                                          outlined
                                                />

                                                <label class="label">{{$t('quantity_to_produce')}}</label>
                                                <v-text-field class="mt-1"
                                                        tage="Quantity to Produce"
                                                        outlined
                                                />

                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{$t('assembly_no')}}</label>
                                                <v-row class="mr-0 mt-1">
                                                    <v-col sm="10" cols="7" class="pt-0 pb-0 pr-1">
                                                        <v-text-field class=""
                                                                      v-model="bill_date"
                                                                      outlined
                                                                      tage="Assembly No."
                                                                      :rules="[v => !!v || 'Number is required']"
                                                                      required/>
                                                    </v-col>
                                                    <v-col sm="2" cols="2" class="pt-0 pb-0 px-0">
                                                        <v-icon color="black" style="background: #fff;" size="30" class="border_qrcode"
                                                                @click="generateNumber">mdi-qrcode
                                                        </v-icon>
                                                    </v-col>
                                                </v-row>

                                                <label class="label">{{$t('yield_uom')}}</label>
                                                <v-select class="mt-1"
                                                          :placeholder="$t('uom')"
                                                          tage="Yield UOM"
                                                          :rules="[v => !!v || 'UOM Currency is required']"
                                                          return-object
                                                          outlined
                                                />
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label">{{$t('default_warehouse')}}</label>
                                                <v-select class="mt-1"
                                                          :placeholder="$t('warehouse')"
                                                          tage="Default Warehouse"
                                                          :rules="[v => !!v || 'Transaction Currency is required']"
                                                          return-object
                                                          outlined
                                                />
                                                <label class="label">{{$t('date')}}</label>
                                                <app-datepicker :initialDate="journal_date"
                                                            @emitDate="journal_date = $event"/>
                                            </v-col>
                                    </v-row>
                                </v-card>
                                <!-- Grid one -->
                                <v-row style="background-color: #fff;">
                                        <v-col cols="12" class="py-1 pb-0">
                                            <h2 class="greyText--text mb-0 font_20 text-uppercase">{{$t('components_used')}}</h2>
                                        </v-col>
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
                                                        class: 'text-variants'
                                                    }"
                                                        :attributes="{
                                                        style: 'text-align: variants'
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
                                                        :field="'uom'"
                                                        :title="$t('uom')"
                                                        :format="'{0:n}'"
                                                        :width="150"
                                                        :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                        :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column
                                                        :field="'qty'"
                                                        :title="$t('qty')"
                                                        :width="160"
                                                        :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                               
                                                <kendo-grid-column
                                                        :field="'wastage'"
                                                        :title="$t('wastage')"
                                                        :format="'{0:n}'"
                                                        :width="150"
                                                        :headerAttributes="{
                                                            style: 'text-align: right; background-color: #EDF1F5'
                                                        }"
                                                        :attributes="{
                                                            style: 'text-align: right'
                                                        }"/>
                                                <kendo-grid-column
                                                        :field="'cost'"
                                                        :title="$t('cost')"
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
                                    <v-row style="background-color: #fff;">
                                        <v-col cols="12" class="py-1 pb-0">
                                            <h2 class="greyText--text mb-0 font_20 text-uppercase">{{$t('other_cost')}}</h2>
                                        </v-col>
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
                                                        class: 'text-variants'
                                                    }"
                                                        :attributes="{
                                                        style: 'text-align: variants'
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
                                    <v-row style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-row>
                                                <v-col sm="6" cols="6" class="pb-0">
                                                    <v-textarea class="mt-1" no-resize height="90px"
                                                                outlined
                                                                clearable
                                                                rows="3"
                                                                placeholder="This will appear on the invoice"
                                                    />
                                                </v-col>
                                                <v-col sm="6" cols="6" class="pb-0">
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <tbody>
                                                                <tr>
                                                                    <td class="text-left text-uppercase">{{$t('total_cost')}}</td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-right">10,0000.00</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text-left text-uppercase">{{$t('cost_per_unit')}}</td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-right">(1,0000)</td>
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
                                                <v-btn color="black" outlined class="mr-2 text-capitalize  black--text float-left" v-on="on">
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
                                        <v-btn color="black"  class="text-capitalize  white--text float-left" @click="cancel">{{$t('cancel')}}</v-btn>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn color="primary" class="ml-2 float-right text-capitalize  white--text" v-on="on">
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
                                        <v-btn color="secondary" class="float-right white--text text-capitalize ">
                                            {{$t('save_draft')}}
                                        </v-btn>
                                    </v-card>
                                </v-form>
                            </v-col>
                            <v-col class="smallSide" sm="4" style="transition: .3s ease-in;"
                                   :class="{'hide_small_bar_class':isHideBar}">
                                <h3 style="color: #b3b5bc; font-size:20px;" v-if="!isHideBar" class="text-uppercase float-right mt-n3">
                                    <span class="pointer" @click="Help('build assembly')">
                                        {{ $t('help') }}
                                    </span>
                                    <v-icon
                                            @click="cancel()"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right mt-n1"
                                    >close
                                    </v-icon>
                                </h3>

                                <div v-if="!isHideBar" class="small_sidebar mt-9 grayBg px-4" >
                                    <v-row>
                                        <v-col sm="12" cols="12" class="py-0">
                                            <h4 class="mb-3 text-uppercase">{{$t('analysis')}}</h4>
                                            <label class="label">{{$t('project')}}</label>
                                            <v-select class="mt-1"
                                                      :items="suppliers"
                                                      tage="Analysis"
                                                      label="ABC"
                                                      outlined
                                            />
                                            <label class="label">{{$t('default_employee')}}</label>
                                            <v-select class="mt-1"
                                                      :items="suppliers"
                                                      :rules="[v => !!v || 'Payble Account is required']"
                                                      tage="Default Employee"
                                                      return-object
                                                      outlined
                                            />
                                            <label class="label">{{$t('for_month_of')}}</label>
                                            <app-datepicker :initialDate="journal_date"
                                                            @emitDate="journal_date = $event"/>
                                        </v-col>
                                    </v-row>
                                    <v-divider class="mb-2"/>
                                    <v-row>
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <label class="label text-bold text-uppercase">{{$t('tnc_to_be_added')}}</label>
                                            <v-select class="mt-1"
                                                      :rules="[v => !!v || 'Payble Account is required']"
                                                      tage="Transactions to be added"
                                                      return-object
                                                      outlined
                                            />
                                            <v-row>
                                                <label class="text-bold ml-9 pr-16 text-uppercase" style="font-size: 12px;">1. {{$t('bom')}}</label>
                                                <v-col sm="9"  cols="9" class="py-0 pr-0">
                                                    <v-card color="third" outlined class="px-3 py-1 text-white no-boxshadow no_border justify-left d-flex"
                                                            style="height: 30px">
                                                        <input type="checkbox" class="checkbox_inv mt-1 float-left"/>
                                                        <p class="mb-0 white--text" style="width: 100%">
                                                            <span class="pl-3 float-left">No. 00224</span>
                                                            <span class="float-right">2,500.00</span>
                                                        </p>
                                                    </v-card>
                                                </v-col>
                                                <v-col sm="3"  cols="3" class="py-0  pl-1">
                                                    <v-btn color="primary" class="text-white text-bold rounded-0 float-right text-uppercase" style="height: 30px !important; ">{{$t('add')}}</v-btn>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <label class="text-bold ml-9 pr-16 text-uppercase" style="font-size: 12px;">2. {{$t('bom')}}</label>
                                                <v-col sm="9"  cols="9" class="py-0 pr-0">
                                                    <v-card color="third" outlined class="px-3 py-1 text-white no-boxshadow no_border justify-left d-flex"
                                                            style=" height: 30px">
                                                        <input type="checkbox" class="checkbox_inv mt-1 float-left"/>
                                                        <p class="mb-0 white--text" style="width: 100%">
                                                            <span class="pl-3 float-left">No. 00224</span>
                                                            <span class="float-right">2,500.00</span>
                                                        </p>
                                                    </v-card>
                                                </v-col>
                                                <v-col sm="3"  cols="3" class="py-0  pl-1">
                                                    <v-btn color="primary" class="text-white text-bold rounded-0 float-right text-uppercase" style="height: 30px !important; ">{{$t('add')}}</v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>

                                    <p class="mb-0 detial_smallside_p">{{$t('product_funct_order_desc')}}</p>
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
    import {i18n} from '@/i18n';
    import LoadingMe from '@/components/Loading'
    import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
    import { ShowResource } from '@/observable/store'

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
            Help(key_search){
                ShowResource(key_search)
            },
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
    .small_sidebar {
        height: 97%;
        position: relative;
        padding: 12px;
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
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: transparent !important;
    }
    .detial_smallside_p{
        position: absolute;
        bottom: 10px;
    }

</style>
