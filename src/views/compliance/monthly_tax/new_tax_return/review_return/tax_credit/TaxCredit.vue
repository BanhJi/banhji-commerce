<template>
    <v-row>
        <v-overlay :absolute="true" color="white" :value="true"/>
        <v-col sm="12" cols="12" class="ml-3  pt-0">
            <h3 class="">{{ $t('ppi') }}</h3>
        </v-col>
        <v-col sm="12" cols="12" class="ml-3">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">{{ $t('description') }}</th>
                            <th class="text-left">{{ $t('amount') }}</th>
                        </tr>
                        </thead>
                        <tbody class="ppi_tbody">
                        <tr v-for="ppi in ppiTC" :key="ppi.description">
                            <td>{{ ppi.description }}</td>
                            <td>{{ ppi.amount }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
        <v-col sm="12" cols="12" class="ml-3">
            <h3 class="">{{ $t('vat') }}</h3>
        </v-col>
        <v-col sm="12" cols="12" class="ml-3">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">{{ $t('description') }}</th>
                            <th class="text-left">{{ $t('code') }}</th>
                            <th class="text-left">{{ $t('amount') }}</th>
                        </tr>
                        </thead>
                        <tbody class="vatTC_tbody">
                        <tr v-for="vat in vatTC" :key="vat.code">
                            <td>{{ vat.description }}</td>
                            <td>{{ vat.code }}</td>
                            <td>{{ vat.amount }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
    </v-row>
</template>

<script src="./_tax_credit.js" lang="js"></script>
<style lang="css" scoped></style>
