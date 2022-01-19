<!--
  - Last modified : 3/25/21, 11:42 AM in Project banhji-accounting-web-module
  - Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
  - Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
  - Github Profile : https://github.com/Darith-Mokpost
  - Instagram Profile : https://www.instagram.com/chandarith_chea
  -->

<template>
    <v-row>
        <v-overlay :absolute="true" color="white" :value="isOverlay">
            <v-img
                width="150"
                height="150"
                lazy-src="@/assets/images/banhji-loading.gif"
                src="@/assets/images/banhji-loading.gif"
            ></v-img>
        </v-overlay>
        <v-col sm="12" cols="12" class="ml-3 pt-0">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th colspan="2" class="text-left">{{ $t('withholding_tax') }}</th>
                            <th class="text-left">{{ $t('tax_rate') }}</th>
                            <th class="text-left">{{ $t('withholding_tax') }}</th>
                        </tr>
                        </thead>
                        <tbody class="wt_tbody">
                        <tr v-for="(wt,index) in withholdingTax" :key="index">
                            <td>{{ wt.withholding_taxDesc }}</td>
                            <td>{{ wt.type }}</td>
                            <td>{{ wt.tax_rate }}</td>
                            <td v-bind:class="wt.class">{{ wt.amount }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
        <v-col sm="12" cols="12" class="ml-3">
            <v-row>
                <v-col sm="5" cols="12">
                    <v-btn @click="viewWithholdingTaxRecord" class="my-n1 white--text rounded-0" tile color="success"
                           dark>
                        {{ $t('view_detail_withholding') }}
                    </v-btn>
                </v-col>
                <v-col sm="7" cols="12" class="pl-3">
                    <label class="label">The data in above table is generated from the detail sales
                        record.</label>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script src="./_withholding_tax.js" lang="js"></script>
<style lang="css" scoped></style>
