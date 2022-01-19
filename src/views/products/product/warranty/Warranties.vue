<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-row>
                <v-col sm="6" cols="12" class="py-0">
                    <h2 class="mb-0 font_20">{{ $t('warranty') }}</h2>
                </v-col>
                <v-col sm="6" cols="12" class="py-0">
                    <v-btn to="warranty" color="primary"
                           class=" white--text float-right text-capitalize ">
                        {{ $t('new_warranty') }}
                    </v-btn>
                </v-col>
            </v-row>

            <v-row class="mt-0">
                <v-col sm="12" cols="12" class="pb-0">
                    <v-row class="">
                        <v-col sm="4" cols="12" class="py-0">
                            <v-select class="mt-1" :items="dateSorters" clearable outlined
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
                                <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
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
                                    <th>{{ $t('number') }}</th>
                                    <th>{{ $t('sku') }}</th>
                                    <th>{{ $t('customers') }}</th>
                                    <th>{{ $t('conditions') }}</th>
                                    <th>{{ $t('expired_date') }}</th>
                                    <th>{{ $t('status') }}</th>
                                    <th>{{ $t('action') }}</th>
                                </tr>
                                </thead>
                                <tbody v-for="(il, index) in itemLines" v-bind:key="index">
                                <tr>
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ il.sku }}</td>
                                    <td>{{ il.customer.name }}</td>
                                    <td>{{ il.condition.name }}</td>
                                    <td>{{ il.expireDate }}</td>
                                    <td>{{ il.status }}</td>
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
                <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true" :alertMessage="loadingAlert"
                           :color="loadingColorAlert" :alertText="loadingTextAlert"/>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'

const warrantyHandler = require('@/scripts/warrantyHandler')
export default {
    data: () => ({
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: 'Please wait...',

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
        warranties: [],
        itemLines: []
    }),
    props: {},
    methods: {
        onLoadWarranty() {
            const addZero = (num, places) => String(num).padStart(places, '0')
            warrantyHandler.getAll().then(res => {
                this.warranties = res.data.data
                this.warranties.forEach(i => {
                    i.itemLines.forEach(it => {
                        let startDate = new Date(i.warrantyStartDate)
                        let expireDate = new Date(startDate.setMonth(it.months + startDate.getMonth() + 1))
                        this.itemLines.push({
                            sku: i.warrantyNo,
                            customer: i.customer,
                            condition: it.conditions,
                            expireDate: addZero(expireDate.getDate(), 2) + '-' + addZero(expireDate.getMonth(), 2) + '-' + expireDate.getFullYear(),
                            status: 1
                        })
                    })
                })
            })
        }
    },
    mounted() {
        this.onLoadWarranty()
    },
    computed: {
        showLoading() {
            return false
        }
    },
    components: {
        'app-datepicker': DatePickerComponent,
        LoadingMe: () => import('@/components/Loading')
    },
};
</script>

<style scoped>

.function_footer {
    padding: 15px;
    display: inline-block;
}

p {
    color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
    height: 47.2px !important;
}

.text_tip {
    font-size: 9px;
    line-height: 10px;
}

@media (max-width: 576px) {
}
</style>
