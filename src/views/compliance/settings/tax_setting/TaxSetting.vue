<!--
  - Last modified : 3/29/21, 11:11 AM in Project banhji-accounting-web-module
  - Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
  - Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
  - Github Profile : https://github.com/Darith-Mokpost
  - Instagram Profile : https://www.instagram.com/chandarith_chea
  -->

<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class=" no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <LoadingMe
                            :isLoading="showLoading"
                            :fullPage="false"
                            :type="'loading'"
                            :myLoading="true"
                        />
                        <v-tabs class="tab_setting1">
                            <v-tab style="max-width: 200px" v-for="ts in tabTaxSetting" :key="ts.id">
                            <span class="hidden-sm-and-up">
                                <v-icon left>mdi-pen</v-icon>
                            </span>
                            <span class="hidden-sm-and-down">
                                {{ ts.name }}
                            </span>
                            </v-tab>
                            <v-tab-item class="tab-item pa-3 grayBg">
                                <v-card color="white" class="pa-3 no_border" elevation="0">
                                    <v-row>
                                        <v-col cols="12" sm="12" class="py-0">
                                            <v-simple-table class="attachment_table">
                                                <template v-slot:default>
                                                    <thead>
                                                    <tr>
                                                        <th>{{ $t('id') }}</th>
                                                        <th class="text-center">{{ $t('tax_type_khmer') }}</th>
                                                        <th class="text-center">{{ $t('tax_type') }}</th>
                                                        <th class="text-center">{{ $t('nature') }}</th>
                                                        <th class="text-center">{{ $t('agency') }}</th>
                                                        <th class="text-center">{{ $t('action') }}</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="(tt, index) in typeTaxs" :key="tt.id">
                                                        <td class="text-center">{{ index + 1 }}</td>
                                                        <td class="text-left">{{ tt.nameLocale }}</td>
                                                        <td class="text-left">{{ tt.name }}</td>
                                                        <td class="text-center">{{ tt.nature }}</td>
                                                        <td class="text-center">{{ tt.agency }}</td>
                                                        <td class="text-center">
                                                            <v-btn :disabled="tt.isSystem === 1"
                                                                   class="bg-none">
                                                                <v-icon class="primary--text" size="17">fas fa-edit
                                                                </v-icon>
                                                            </v-btn>

                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item class="tab-item pa-3 grayBg">
                                <v-card color="white" class="pa-3 no_border" elevation="0">
                                    <v-row>
                                        <v-col cols="12" sm="12" class="pt-0">
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn v-on="on" @click="onClickCloneTax" tile
                                                           color="primary"
                                                           class="float-right rounded-0 white--text">
                                                        <v-icon>mdi-plus</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>{{ $t('clone_tax') }}</span>
                                            </v-tooltip>
                                            <v-dialog v-model="dialogCloneTypeTax" scrollable
                                                      max-width="700px">
                                                <v-card>
                                                    <v-window v-model="step">
                                                        <v-window-item :value="1">
                                                            <v-card>
                                                                <v-card-title>{{ $t('clone_tax') }}</v-card-title>
                                                                <v-card-text class="modal_text_content">
                                                                    <v-row>
                                                                        <v-col sm="" cols="12">
                                                                            <label class="label">
                                                                                {{ $t('list_of_tax') }}
                                                                            </label>
                                                                            <v-select
                                                                                class="mt-1"
                                                                                v-model="selectTax"
                                                                                :items="listTaxClones"
                                                                                item-text="defaultTax"
                                                                                item-value="id"
                                                                                return-object
                                                                                clearable
                                                                                outlined
                                                                                required
                                                                            />
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-card-text>
                                                                <v-card-actions class="modal_footer">
                                                                    <v-row>
                                                                        <v-col sm="6" cols="6" class="py-0 text-left">
                                                                            <v-btn color="black" outlined
                                                                                   class="ml-3 text-capitalize  black--text float-left"
                                                                                   @click="dialogCloneTypeTax = false">
                                                                                {{ $t('cancel') }}
                                                                            </v-btn>
                                                                        </v-col>
                                                                        <v-col sm="6" cols="6" class="py-0 text-right">
                                                                            <v-btn
                                                                                :disabled="selectTax === []"
                                                                                @click="onClone"
                                                                                color="primary"
                                                                                class="px-3  white--text text-capitalize">
                                                                                {{ $t('clone') }}
                                                                            </v-btn>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-window-item>
                                                        <v-window-item :value="2">
                                                            <v-card>
                                                                <v-card-title>{{ $t(title) }}</v-card-title>
                                                                <v-card-text
                                                                    style="height: 280px; background-color: #EDF1F5; color: #333;">
                                                                    <v-row>
                                                                        <v-col sm="2" cols="12" class="pb-0">
                                                                            <label class="label">{{
                                                                                    $t('sub_id')
                                                                                }}</label>
                                                                            <v-text-field
                                                                                class="mt-1"
                                                                                v-model="selectTax.subId"
                                                                                disabled
                                                                                outlined
                                                                                required
                                                                            />
                                                                        </v-col>
                                                                        <v-col v-if="defaultTaxFix" sm="" cols="12"
                                                                               class="pb-0">
                                                                            <label class="label">{{
                                                                                    $t('name_tax')
                                                                                }}</label>
                                                                            <v-text-field
                                                                                class="mt-1"
                                                                                v-model="defaultTaxFix"
                                                                                outlined
                                                                                required
                                                                            />
                                                                        </v-col>
                                                                        <v-col v-if="defaultTaxFix === ''" sm=""
                                                                               cols="12" class="pb-0">
                                                                            <label class="label">
                                                                                {{ $t('name_tax') }}
                                                                            </label>
                                                                            <v-text-field
                                                                                class="mt-1"
                                                                                v-model="selectTax.defaultTax"
                                                                                outlined
                                                                                required/>
                                                                        </v-col>
                                                                        <v-col sm="" cols="12" class="pb-0">
                                                                            <label class="label">{{
                                                                                    $t('accounts')
                                                                                }}</label>
                                                                            <v-text-field
                                                                                class="mt-1"
                                                                                v-model="selectTax.acc"
                                                                                disabled
                                                                                outlined
                                                                                required
                                                                            />
                                                                        </v-col>
                                                                    </v-row>
                                                                    <v-row>
                                                                        <v-col sm="2" cols="12"
                                                                               class="py-0">
                                                                            <label class="label">{{
                                                                                    $t('transaction')
                                                                                }}</label>
                                                                            <v-text-field
                                                                                class="mt-1"
                                                                                v-model="selectTax.transac"
                                                                                outlined
                                                                                disabled
                                                                                required
                                                                            />
                                                                        </v-col>
                                                                        <v-col sm="2" cols="12"
                                                                               class="py-0">
                                                                            <label class="label">{{
                                                                                    $t('tax_base')
                                                                                }}</label>
                                                                            <v-text-field
                                                                                class="mt-1"
                                                                                v-model="selectTax.taxBase"
                                                                                outlined
                                                                                disabled
                                                                                required
                                                                            />
                                                                        </v-col>
                                                                        <v-col sm="2" cols="12"
                                                                               class="py-0">
                                                                            <label class="label">{{
                                                                                    $t('rate')
                                                                                }}</label>
                                                                            <v-text-field
                                                                                class="mt-1"
                                                                                v-model="selectTax.rate"
                                                                                outlined
                                                                                disabled
                                                                                required
                                                                            />
                                                                        </v-col>
                                                                        <v-col sm="" cols="12"
                                                                               class="py-0">
                                                                            <label class="label">{{
                                                                                    $t('base_amount')
                                                                                }}</label>
                                                                            <v-text-field
                                                                                class="mt-1"
                                                                                v-model="selectTax.baseAmount"
                                                                                outlined
                                                                                disabled
                                                                                required
                                                                            />
                                                                        </v-col>
                                                                        <v-col sm="" cols="12"
                                                                               class="py-0">
                                                                            <label class="label">{{
                                                                                    $t('nature_tax_payer')
                                                                                }}</label>
                                                                            <v-text-field
                                                                                class="mt-1"
                                                                                v-model="selectTax.natureTaxPayer"
                                                                                outlined
                                                                                disabled
                                                                                required
                                                                            />
                                                                        </v-col>
                                                                    </v-row>
                                                                    <v-row>
                                                                        <v-col cols="12" class="py-0" sm="12">
                                                                            <label class="label">{{
                                                                                    $t('description')
                                                                                }}</label>
                                                                            <v-text-field class="mt-1"
                                                                                          disabled
                                                                                          auto-grow
                                                                                          outlined
                                                                                          v-model="selectTax.desc"
                                                                            />
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-card-text>
                                                                <v-card-actions class="px-5 py-2">
                                                                    <v-row>
                                                                        <v-col sm="6" cols="6" class="py-0 text-left">
                                                                            <v-btn :disabled="noClone"
                                                                                   color="black" outlined
                                                                                   class=" text-capitalize  black--text float-left"
                                                                                   @click="step = 1">
                                                                                {{ $t('back') }}
                                                                            </v-btn>
                                                                            <v-btn color="black" outlined
                                                                                   class="ml-3 text-capitalize  black--text float-left"
                                                                                   @click="dialogCloneTypeTax = false">
                                                                                {{ $t('cancel') }}
                                                                            </v-btn>
                                                                        </v-col>
                                                                        <v-col sm="6" cols="6" class="py-0 text-right">
                                                                            <v-btn
                                                                                @click="onSaveCloseTax"
                                                                                color="primary"
                                                                                class="px-3  white--text text-capitalize">
                                                                                {{ $t('save_close') }}
                                                                            </v-btn>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-window-item>
                                                    </v-window>
                                                </v-card>
                                            </v-dialog>
                                        </v-col>
                                        <v-col cols="12" sm="12" class="py-0">
                                            <v-data-table
                                                :headers="headerListTax"
                                                :items="listTaxs"
                                                :loading="listTaxs.length <= 0"
                                                :items-per-page="5"
                                                class="header_table attachment_table"
                                            >
                                                <template v-if="listTaxs.length <= 0" v-slot:progress>
                                                    <v-progress-linear
                                                        color="blue"
                                                        rounded
                                                        :active="progress_load"
                                                        :indeterminate="progress_load"/>
                                                    <v-card-text class="text-center">{{ text_load }}</v-card-text>
                                                </template>
                                                <template v-slot:body="{ items }">
                                                    <tbody>
                                                    <tr v-for="(lt, index) in items" :key="lt.id">
                                                        <td class="text-center">{{ index + 1 }}</td>
                                                        <td class="text-center">{{ lt.taxType.typeId }}</td>
                                                        <td class="text-left"
                                                            style="white-space:nowrap;">
                                                            {{ lt.defaultTax }}
                                                        </td>
                                                        <td class="text-center">{{ lt.transactionType }}</td>
                                                        <td class="text-center truncate">{{ lt.description }}
                                                        </td>
                                                        <td class="text-center truncate">{{ lt.account.name }}
                                                        </td>
                                                        <td class="text-center">{{ lt.taxBase }}</td>
                                                        <td class="text-center">{{ lt.rate }}</td>
                                                        <td class="text-center">{{ lt.baseAmount }}</td>
                                                        <td class="text-center">{{
                                                                lt.natureTaxPayer
                                                            }}
                                                        </td>
                                                        <td class="text-center">
                                                            <v-btn :disabled="lt.isSystem === 1"
                                                                   @click="onEditTax(lt)"
                                                                   class="bg-none">
                                                                <v-icon class="primary--text" size="17">fas fa-edit
                                                                </v-icon>
                                                            </v-btn>

                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-data-table>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item class="tab-item pa-3 grayBg">
                                <v-card color="white" class="pa-3 no_border" elevation="0">
                                    <v-row>
                                        <v-col cols="12" sm="12" class="py-0">
                                            <v-simple-table class="attachment_table">
                                                <template v-slot:default>
                                                    <thead>
                                                    <tr>
                                                        <th/>
                                                        <th class="text-center">{{ $t('type_of_tax_payer') }}</th>
                                                        <th class="text-center">{{ $t('action') }}</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="(tp,index) in taxPayers" :key="tp._id">
                                                        <td style="width: 50px">{{ index + 1 }}</td>
                                                        <td>{{ tp.name }}</td>
                                                        <td class="text-center">
                                                            <v-btn :disabled="tp.isSystem === 1"
                                                                   class="bg-none">
                                                                <v-icon class="primary--text" size="17">fas fa-edit
                                                                </v-icon>
                                                            </v-btn>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item class="tab-item pa-3 grayBg">
                                <v-card color="white" class="pa-3 no_border" elevation="0">
                                    <v-row>
                                        <v-col cols="12" sm="12" class="py-0">
                                            <v-simple-table class="attachment_table">
                                                <template v-slot:default>
                                                    <thead>
                                                    <tr>
                                                        <th/>
                                                        <th class="text-center">{{ $t('nature_of_tax_payers') }}</th>
                                                        <th class="text-center">{{ $t('action') }}</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="(ntp,index) in natureTaxPayers"
                                                        :key="ntp.id">
                                                        <td style="width: 50px">{{ index + 1 }}</td>
                                                        <td>{{ ntp.name }}</td>
                                                        <td class="text-center">
                                                            <v-btn :disabled="ntp.isSystem === 1"
                                                                   class="bg-none">
                                                                <v-icon class="primary--text" size="17">fas fa-edit
                                                                </v-icon>
                                                            </v-btn>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item class="tab-item pa-3 grayBg">
                                <v-card color="white" class="pa-3 no_border" elevation="0">
                                    <v-row>
                                        <v-col cols="12" sm="12" class="py-0">
                                            <v-simple-table class="attachment_table">
                                                <template v-slot:default>
                                                    <thead>
                                                    <tr>
                                                        <th/>
                                                        <th class="text-center">{{
                                                                $t('type_of_supplier_customer')
                                                            }}
                                                        </th>
                                                        <th class="text-center">{{ $t('action') }}</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="(sct, index) in supplierCustomerTaxs"
                                                        :key="sct.id">
                                                        <td style="width: 50px" class="text-center c_no">{{
                                                                index + 1
                                                            }}
                                                        </td>
                                                        <td>{{ sct.name }}</td>
                                                        <td style="max-width: 20px" class="text-center">
                                                            <v-btn :disabled="sct.isSystem === 1"
                                                                   class="bg-none">
                                                                <v-icon class="primary--text" size="17">fas fa-edit
                                                                </v-icon>
                                                            </v-btn>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script src="./_tax_setting.js" lang="js"></script>
<style lang="css" scoped>
.tab_wrapper {
    position: relative;
    display: inherit;
}

.v-tab {
    min-width: 30px;
    font-size: 15px;
    text-transform: capitalize;
}

.v-tab--active {
    background-color: #E5EFFA;
    color: #000;
}

.theme--light.v-tabs >>> .v-tabs-bar {
    border-bottom: 1px solid #ddd !important;
}

.truncate {
    max-width: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 40px !important;
}

.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: transparent !important;
}
</style>
