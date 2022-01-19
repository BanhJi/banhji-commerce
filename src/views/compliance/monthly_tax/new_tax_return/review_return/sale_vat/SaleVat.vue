<!--
  - Last modified : 3/25/21, 11:36 AM in Project banhji-accounting-web-module
  - Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
  - Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
  - Github Profile : https://github.com/Darith-Mokpost
  - Instagram Profile : https://www.instagram.com/chandarith_chea
  -->

<template>
    <v-row>
        <v-col sm="12" cols="12" class="ml-3">
            <h3 class="">{{ $t('monthly_sales') }}</h3>
        </v-col>
        <v-col sm="12" cols="12" class="ml-3">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th colspan="2" class="text-left">{{ $t('description') }}</th>
                            <th class="text-left">{{ $t('amount_exclusive_vat') }}</th>
                            <th class="text-left">{{ $t('vat_amount') }}</th>
                        </tr>
                        </thead>
                        <tbody class="ms_tbody">
                        <tr v-for="(ms, index) in monthlySales" :key="index">
                            <td>{{ ms.description }}</td>
                            <td>{{ ms.type }}</td>
                            <td class="text-right">{{ ms.amountNet }}</td>
                            <td class="text-right">{{ ms.amountVAT }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
        <v-col sm="12" cols="12" class="ml-3">
            <v-row>
                <v-col sm="5" cols="12">
                    <v-btn @click="viewSaleRecord" class="my-n1 white--text rounded-0" tile
                           color="success"
                           dark>
                        {{ $t('view_detail_sales') }}
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

<script src="./_sale_vat.js" lang="js"></script>
<style lang="css" scoped></style>
