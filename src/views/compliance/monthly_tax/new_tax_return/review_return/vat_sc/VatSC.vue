<!--
  - Last modified : 3/25/21, 11:41 AM in Project banhji-accounting-web-module
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
                            <th colspan="2" class="text-left">{{ $t('description') }}</th>
                            <th class="text-left">{{ $t('amount_exclusive_vat') }}</th>
                            <th class="text-left">{{ $t('vat_amount') }}</th>
                        </tr>
                        </thead>
                        <tbody class="vat_tbody">
                        <tr v-for="vat in vats" :key="vat.id">
                            <td style="white-space:nowrap;">{{ vat.description }}</td>
                            <td>{{ vat.type }}</td>
                            <td>{{ vat.amountNet }}</td>
                            <td>{{ vat.amountVAT }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
    </v-row>
</template>

<script src="./_vat_sc.js" lang="js"></script>
<style lang="css" scoped></style>
