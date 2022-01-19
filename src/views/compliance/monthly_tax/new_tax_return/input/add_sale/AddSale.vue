<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-toolbar flat>
                            <v-toolbar-title><h2 class="mb-0">{{ $t('add_sale') }}</h2></v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                                <v-icon
                                    @click="onClose"
                                    style="cursor: pointer; color: #333; font-size: 40px"
                                    class="float-right"
                                >close
                                </v-icon>
                            </v-toolbar-items>
                        </v-toolbar>

                        <v-card-text>
                            <v-card outlined dense class="px-4 no_border mb-2" color="grayBg">
                                <!--                                <div class="function_content pa-4">-->
                                <v-row>
                                    <v-col sm="4" cols="12" class="py-0 pb-0 pt-4">
                                        <label class="label">{{
                                                $t("reference")
                                            }}</label>
                                        <v-text-field
                                            class="disable_alert my-3"
                                            v-model="sale.reference"
                                            outlined
                                            required
                                        />
                                    </v-col>
                                    <v-col sm="4" cols="12" class="py-0 pb-0 pt-4">
                                        <label class="label">{{ $t("customer") }}</label>
                                        <v-col sm="12" cols="12"
                                               class="kendo_dropdown_custom my-3" style="padding: 0">
                                            <dropdownlist
                                                style="width: 100%"
                                                class=""
                                                :data-items="customerList"
                                                @change="onChange"
                                                :value="sale.customer"
                                                :data-item-key="'id'"
                                                :text-field="'name'"
                                                :default-item="defaultItem"
                                                :filterable="true"
                                                @filterchange="onCustomerFilterChanged">
                                            </dropdownlist>
                                        </v-col>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="py-0 pb-0 pt-4">
                                        <label class="label">{{ $t("date") }}</label>
                                        <v-menu
                                            v-model="menuJDateAddSale"
                                            :close-on-content-click="false"
                                            max-width="290"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    class="disable_alert my-3"
                                                    v-model="sale.date"
                                                    readonly
                                                    outlined
                                                    append-icon="event"
                                                    v-on="on"
                                                    v-bind="attrs"
                                                    @click:clear="sale.date = undefined"
                                                    @click:append="menuJDateAddSale = true"
                                                    required
                                                />
                                            </template>
                                            <v-date-picker
                                                :min="monthlyReturn.monthOf + '-01'"
                                                :max="monthlyReturn.monthOf + '-31'"
                                                @change="menuJDateAddSale = false"
                                                v-model="sale.date"
                                                no-title
                                            />
                                        </v-menu>
                                    </v-col>
                                </v-row>
                                <!--                                </div>-->
                            </v-card>
                            <template>
                                <kendo-datasource
                                    ref="dataSource"
                                    :data="sale.itemLine"
                                    :change="onDataSourceChanges"
                                />
                                <kendo-grid
                                    id="grid"
                                    class="grid-function"
                                    :data-source-ref="'dataSource'"
                                    :sortable="false"
                                    :filterable="false"
                                    :column-menu="true"
                                    :editable="true"
                                    :scrollable-virtual="true"
                                >
                                    <kendo-grid-column
                                        :title="$t('no')"
                                        :width="60"
                                        :template="rowNumberTmpl"
                                        :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-center',}"
                                        :attributes="{ style: 'text-align: center' }"
                                    />
                                    <kendo-grid-column
                                        :field="'taxName'"
                                        :editor="typeProductTaxDropdownEditor"
                                        :title="$t('type_product_service')"
                                        :template="'<span>#=taxName.defaultTax#</span>'"
                                        :width="210"
                                        :attributes="{ style: 'text-align: left ' }"
                                        :headerAttributes="{style:'text-align: center; background-color: #EDF1F5'}"
                                    />
                                    <kendo-grid-column
                                        :field="'description'"
                                        :title="$t('description')"
                                        :width="170"
                                        :headerAttributes="{style:'text-align: center; background-color: #EDF1F5'}"
                                        :attributes="{ style: 'text-align: right; ' }"
                                    />
                                    <kendo-grid-column
                                        :field="'amount'"
                                        :format="'{0:n}'"
                                        :title="$t('amount')"
                                        :width="140"
                                        :headerAttributes="{style:'text-align: center; background-color: #EDF1F5'}"
                                        :attributes="{ style: 'text-align: right; ' }"
                                    />
                                    <kendo-grid-column
                                        :field="'specificTax'"
                                        :editor="specificTaxDropdownEditor"
                                        :title="$t('sp')"
                                        :editable="editableSP"
                                        :template="'<span>#=specificTax.defaultTax#</span>'"
                                        :width="130"
                                        :attributes="{ style: 'text-align: left ' }"
                                        :headerAttributes="{style:'text-align: center; background-color: #EDF1F5'}"
                                    />
                                    <kendo-grid-column
                                        :field="'pubTax'"
                                        :editor="publicTaxDropdownEditor"
                                        :title="$t('plt')"
                                        :editable="editablePL"
                                        :template="'<span>#=pubTax.defaultTax#</span>'"
                                        :width="130"
                                        :attributes="{ style: 'text-align: left ' }"
                                        :headerAttributes="{style:'text-align: center; background-color: #EDF1F5'}"
                                    />
                                    <kendo-grid-column
                                        :field="'accomTax'"
                                        :editor="accomTaxDropdownEditor"
                                        :title="$t('other_tax')"
                                        :editable="editableAT"
                                        :template="'<span>#=accomTax.defaultTax#</span>'"
                                        :width="130"
                                        :attributes="{ style: 'text-align: left ' }"
                                        :headerAttributes="{style:'text-align: center; background-color: #EDF1F5'}"
                                    />
                                    <kendo-grid-column
                                        :field="'baseAmount'"
                                        :title="$t('base_amount')"
                                        :editable="disableEditor"
                                        :template="'<span>#=baseAmount#</span>'"
                                        :width="150"
                                        :headerAttributes="{style: 'background-color: #EDF1F5',}"
                                    />
                                    <kendo-grid-column
                                        :command="{
																	iconClass: 'k-icon k-i-trash',
																	text: 'Delete',
																	click: removeRow,
																	class: 'btn-plus',
																}"
                                        :title="'&nbsp;'"
                                        :width="90"
                                        :headerAttributes="{
																	style:
																		'text-align: center; background-color: #EDF1F5',
																}"
                                        :attributes="{ style: 'text-align: center; ' }"
                                    />
                                </kendo-grid>
                            </template>
                            <template>
                                <v-btn @click="addRow" class="rounded-0 btn_plus" color="primary my-2">
                                    <v-icon> mdi-plus</v-icon>
                                </v-btn>
                            </template>
                            <template>
                                <v-row>
                                    <v-col offset-sm="8" class="pt-0" sm="4" cols="12">
                                        <v-card class="no-boxshadow rounded-4 pa-3" color="grayBg">
                                            <v-simple-table>
                                                <template v-slot:default>
                                                    <tbody>
                                                    <tr>
                                                        <td class="text-left text-bold pr-0">
                                                            {{ $t('amount_net_vat') }}
                                                        </td>
                                                        <td class="text-center text-bold">:</td>
                                                        <td class="text-right text-bold">
                                                            {{ numberFormat(amountNetVat) }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left text-bold">{{
                                                                $t("amount_inclusive")
                                                            }}
                                                        </td>
                                                        <td class="text-center  ">:</td>
                                                        <td class="text-right text-bold">
                                                            {{ numberFormat(amountInclusiveVat) }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left pr-0 text-bold">{{
                                                                $t('total_tax')
                                                            }}
                                                            <v-btn
                                                                @click="dialogTax = true"
                                                                color="grayBg"
                                                                outlined
                                                                class="black--text rounded-4 text-bold  float-right text-uppercase"
                                                                style="height: 30px !important;">{{ $t("tax") }}
                                                            </v-btn>
                                                        </td>
                                                        <td class="text-center text-bold">:</td>
                                                        <td class="text-right text-bold">
                                                            {{ numberFormat(totalVat) }}
                                                        </td>
                                                    </tr>
                                                    <!--                                                    <tr>-->
                                                    <!--                                                        <td class="text-left grayBg font_16 text-bold text-uppercase pr-0">{{$t('total') }}-->
                                                    <!--                                                        </td>-->
                                                    <!--                                                        <td class="text-center text-bold grayBg">:</td>-->
                                                    <!--                                                        <td class="text-right grayBg text-bold red&#45;&#45;text font_16" id="total">-->
                                                    <!--                                                            {{ numberFormat(totalVat) }}-->
                                                    <!--                                                        </td>-->
                                                    <!--                                                    </tr>-->
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-card>
                                    </v-col>
                                </v-row>

                            </template>

                        </v-card-text>
                        <!--                                                <v-divider></v-divider>-->
                        <v-card-actions>
                            <v-row>
                                <v-col sm="6" cols="12" class="py-0 text-left">
                                    <v-btn
                                        color="black"
                                        outlined
                                        class="ml-3 text-capitalize  black--text float-left"
                                        @click="onCloseSale"
                                    >
                                        {{ $t("cancel") }}
                                    </v-btn>
                                </v-col>
                                <v-col sm="6" cols="12" class="py-0 text-right">
                                    <v-btn
                                        @click="onSaveClose"
                                        dark
                                        color="primary"
                                        class="px-3  white--text text-capitalize "
                                    >
                                        {{ $t("save_close") }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                    <v-dialog v-model="dialogTax" max-width="480px">
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
                                                <tr>
                                                    <td class="text-left pr-0" width="230px">{{
                                                            $t('amount_vat')
                                                        }}
                                                    </td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">
                                                        {{ numberFormat(amountVat) }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left pr-0" width="230px">{{
                                                            $t('amount_specific_tax')
                                                        }}
                                                    </td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">
                                                        {{ numberFormat(amountSp) }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left pr-0" width="230px">{{
                                                            $t('amount_public_light_tax')
                                                        }}
                                                    </td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">
                                                        {{ numberFormat(amountPlt) }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left pr-0" width="230px">{{
                                                            $t('amount_accommodation_tax')
                                                        }}
                                                    </td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">
                                                        {{ numberFormat(amountAt) }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left text-bold" width="230px">{{ $t("total") }}</td>
                                                    <td class="text-center text-bold">:</td>
                                                    <td class="text-right text-bold">{{ numberFormat(totalVat) }}</td>
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
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"
                    />
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script src="./_add_sale.js" lang="js"></script>
<style lang="css" scoped></style>
