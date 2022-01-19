<template>
    <v-row>
        <v-col sm="12" cols="12" class="ml-3 pt-0">
            <h3 class="">{{ $t('monthly_purchase') }}</h3>
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
                        <tbody class="mp_tbody">
                        <tr style="font-weight:bold" v-for="(mp,index) in monthlyPurchases"
                            :key="index">
                            <td>{{ mp.description }}</td>
                            <td>{{ mp.type }}</td>
                            <td class="text-right">{{ mp.amountNet }}</td>
                            <td class="text-right">{{ mp.amountVAT }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
        <v-col sm="12" cols="12" class="ml-3">
            <v-row>
                <v-col sm="5" cols="12">
                    <v-btn @click="viewPurchaseRecord" class="my-n1 white--text rounded-0" tile color="success"
                           dark>
                        {{ $t('view_detail_purchases') }}
                    </v-btn>
                </v-col>
                <v-col sm="7" cols="12" class="pl-3">
                    <label class="label">The data in above table is generated from the detail
                        purchase record.</label>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script src="./_purchase_vat.js" lang="js"></script>
<style lang="css" scoped></style>
