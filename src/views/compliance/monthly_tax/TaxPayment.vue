<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="pb-0">
                    <v-row>
                        <v-col sm="9" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{$t('tax_payment_report')}}</h2>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col sm="9" cols="12" class="py-0">
                            <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                                            :initEndDate="endDate" @emitEndDate="endDate = $event"/>
                        </v-col>
                        <v-col sm="1" cols="12" class="py-1">
                            <v-btn class="btn_search white--text" color="primary" >
                                  <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                      <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>{{ $t('num') }}</th>
                                    <th>{{ $t('date') }}</th>
                                    <th>{{ $t('month_of') }}</th>
                                    <th>{{ $t('sub_id') }}</th>
                                    <th>{{ $t('amount') }}</th>
                                    <th>{{ $t('method') }}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="tp in taxPayments" v-bind:key="tp.id">
                                    <td>{{ tp.number }}</td>
                                    <td>{{ tp.date }}</td>
                                    <td>{{ tp.monthOf }}</td>
                                    <td>{{ tp.submissionId }}</td>
                                    <td>{{ tp.amountPaid }}</td>
                                    <td>{{ tp.method ? tp.method.name : '' }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"
                       />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
const monthlyReturnHandler = require("@/scripts/compliance/handler/monthlyReturnHandler")
export default {
    data: () => ({
        showLoading: false,
        startDate: "",
        endDate: "",
        data: [],

        taxPayments: []
    }),
    props: {},
    methods: {
        async onloadTaxPayment() {
            this.showLoading = true
            monthlyReturnHandler.getTaxPayment().then(res => {
                window.console.log(res, 'tax payment')
                this.taxPayments = res.data.data
                this.showLoading = false
            })
        },
    },
    async mounted() {
        await this.onloadTaxPayment()
    },
    computed: {},
    components: {
        'app-searchdate' : ()=> import('@/components/custom_templates/SearchDate'),
        'LoadingMe': LoadingMe,
        // 'app-datepicker' : ()=> import('@/components/custom_templates/DatePickerComponent')
    },
};
</script>
<style scoped>
 
</style>
