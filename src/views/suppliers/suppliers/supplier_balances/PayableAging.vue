<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <p class="mb-0">{{$t('payable_aging_desc2')}}</p>
                <!-- loading -->
                <LoadingMe
                        :isLoading="compeletLoading"
                        :fullPage="false"
                        :myLoading="true">

                </LoadingMe>

                <v-row class="">
                    <v-col sm="4" cols="12" class="pb-0">
                        <app-datepicker :initialDate="start_date" @emitDate="start_date = $event"/>
                    </v-col>
                    <v-col sm="4" cols="12" class="pb-0 paddingTop">
                        <v-select class="mt-1"
                                  :items="dateSorters"
                                  clearable
                                  outlined
                                  placeholder="Supplier"
                        />
                    </v-col>
                    <v-col sm="1" cols="12" class="pb-0 pt-4 paddingTop">
                        <v-btn color="primary white--text text-capitalize">
                            {{$t('view')}}
                        </v-btn>
                    </v-col>
                    <v-col sm="2" cols="12" class="pb-0 paddingTop">
                        <v-btn
                                icon
                                color="black"
                                class="bg-none float-right ml-2"
                        >
                            <v-icon class="font_34">fa fa-file-excel</v-icon>
                        </v-btn>
                        <v-btn
                                icon
                                color="black"
                                class="bg-none float-right ml-2"
                        >
                            <v-icon class="font_34">fa fa-print</v-icon>
                        </v-btn>

                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border white--text d-flex justify-space-between align-center" color="secondary" height="85px">
                            <h3 class="text-left text-uppercase font_13 flex-1">{{ $t('suppliers') }}</h3>
                            <h3 class="text-right flex-1 font_20 ">10</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border white--text d-flex justify-space-between align-center" color="third" height="85px">
                            <h3 class="text-left text-uppercase font_13 flex-1">{{ $t('payable_balance') }}</h3>
                            <h3 class="text-right font_20">10,000.00</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-0">
                        <v-card outlined dense class="pa-3 no_border black--text d-flex justify-space-between align-center" color="third" height="85px">
                            <h3 class="text-left text-uppercase white--text font_13 flex-1">{{ $t('%_of_purchase') }}</h3>
                            <h3 class="text-right font_20 white--text flex-1">10</h3>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>{{$t('name')}}</th>
                                        <th>{{$t('current')}}</th>
                                        <th>1-30</th>
                                        <th>31-60</th>
                                        <th>61-90</th>
                                        <th>>90</th>
                                        <th>{{$t('total')}}</th>
                                        <th>{{$t('%_of_purchase')}}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                         <td></td>
                                        <td class="text-center">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('total')}}</td>
                                        <td class="text-center">
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import LoadingMe from '@/components/Loading'
    import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'

    export default {
        name: "",
        components: {
            LoadingMe,
            'app-datepicker': DatePickerComponent,
            // BankConnection,
        },
        data: () => ({
            start_date: "",
            end_date: "",
            dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
            journal_entries: [],
            // LoadingMe
            compeletLoading: false,
            isLoaded: false,
        }),
        methods: {
        },
        mounted() {
        },
        computed: {
        },
    };
</script>
<style scoped>
@media (max-width: 576px) {
    .paddingTop{
        padding-top: 0 !important;
    }
}
</style>