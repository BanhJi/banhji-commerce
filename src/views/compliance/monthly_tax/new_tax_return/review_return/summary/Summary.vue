<!--
  - Last modified : 3/25/21, 11:33 AM in Project banhji-accounting-web-module
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
                            <th></th>
                            <th class="text-left">{{ $t('type_tax_declared') }}</th>
                            <th class="text-left">{{ $t('credit_carried') }}</th>
                            <th class="text-left">{{ $t('tax_to_paid') }}</th>
                        </tr>
                        </thead>
                        <tbody class="s_tbody">
                        <tr v-for="(summary) in summaries" :key="summary.index">
                            <td>{{ summary.index }}</td>
                            <td>{{ summary.type_tax_declared }}</td>
                            <td>{{ summary.credit_carried }}</td>
                            <td class="text-right">{{ summary.tax_to_paid }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
        <v-col sm="12" cols="12" class="ml-3">
            <v-row>
                <v-col sm="12" cols="12">
                    <v-btn
                        :disabled="summaries[8].tax_to_paid === 0"
                        class="my-n1 mr-3 rounded-0 float-right"
                        tile color="success"
                        dark>
                        {{ $t('submit') }}
                    </v-btn>
                </v-col>
                <!--                <v-col sm="7" cols="12" class="pl-3">-->
                <!--                    <label class="label">The data in above table is generated from the detail salary-->
                <!--                        record.</label>-->
                <!--                </v-col>-->
            </v-row>
        </v-col>
    </v-row>
</template>

<script src="./_summary.js" lang="js"></script>
<style lang="css" scoped></style>
