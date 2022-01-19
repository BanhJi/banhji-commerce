<!--
  - Last modified : 3/2/21, 2:16 PM in Project banhji-accounting-web-module
  - Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
  - Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
  - Github Profile : https://github.com/Darith-Mokpost
  - Instagram Profile : https://www.instagram.com/chandarith_chea
  -->

<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-row>
                <v-col sm="6" cols="12" class="py-0">
                    <h2 class="mb-0 font_20">{{ $t('internal_usage') }}</h2>
                </v-col>
                <v-col sm="6" cols="12" class="py-0">
                    <v-btn to="internal_usage" color="primary" class="rounded-pill white--text float-right text-capitalize">
                        {{ $t('new_internal_usage') }}
                    </v-btn>
                </v-col>
            </v-row>
            
            <v-row class="">
                <v-col sm="9" cols="12" class="py-0">
                    <v-row class="">
                        <v-col sm="4" cols="12" class="py-0">
                            <v-select class="mt-1"
                                      :items="dateSorters"
                                      clearable
                                      outlined
                                      placeholder="ALL"/>
                        </v-col>

                        <v-col sm="3" cols="12" class="py-0">
                            <app-datepicker :initialDate="start_date" @emitDate="start_date = $event"/>
                        </v-col>

                        <v-col sm="3" cols="12" class="py-0">
                            <app-datepicker :initialDate="end_date" @emitDate="end_date = $event"/>
                        </v-col>

                        <v-col sm="1" cols="12" class="pt-1">
                            <v-btn class="btn_search" style="background-color: rgb(237, 241, 245)">
                                <v-icon size="18">fa-search</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <template>
                        <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>{{ $t('date') }}</th>
                                    <th>{{ $t('num') }}</th>
                                    <th>{{ $t('product') }}</th>
                                    <th>{{ $t('uom') }}</th>
                                    <th>{{ $t('qty') }}</th>
                                    <th>{{ $t('action') }}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="iu in internalUsages" v-bind:key="iu.id">
                                    <td>{{ new Date(iu.date).toISOString().substr(0, 10) }}</td>
                                    <td>{{ iu.lastNumber }}</td>
                                    <td>{{ iu.product[0].item.name }}</td>
                                    <td>{{ iu.product[0].uom.uom.toUOM.name }}</td>
                                    <td>{{ iu.product[0].yield_qty }}</td>
                                    <td>
                                        <v-btn class="bg-none">
                                            <v-icon class="primary--text" size="17">fas fa-eye</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";

const internalUsage = require("@/scripts/internalUsageHandler")
export default {
    name: "InternalUsages",
    components: {
        'app-datepicker': DatePickerComponent
    },
    data: () => ({
        // Search transaction dates
        start_date: "",
        end_date: "",
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
        account: [],
        files: [],
        attachments: [],

        dialogm3: false,
        // LoadingMe
        isLoaded: false,
        // Kendo dataSource
        schemaDefinition: {
            model: {
                id: "id"
            }
        },
        /* Sort by account number */
        sortDefinition: {
            field: "number"
        },
        internalUsages: [],
    }),
    methods: {
        async onloadInternalUsage() {
            await internalUsage.getAll().then(res => {
                this.internalUsages = res
                window.console.log(res)
            })
        },
    },
    async mounted() {
        await this.onloadInternalUsage()
    },
}
</script>

<style scoped>

</style>
