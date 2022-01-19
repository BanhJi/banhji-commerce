<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="4" class="py-0">
                        <v-select class="mt-1"
                            :items="dateSorters"
                            clearable
                            outlined
                            placeholder="Location"
                        />
                    </v-col>
                    <v-col sm="4"  class="py-0">
                        <v-select class="mt-1"
                            :items="dateSorters"
                            clearable
                            outlined
                            placeholder="Segment"
                        />
                    </v-col>
                    <v-col sm="4"  class="py-0">
                        <v-select class="mt-1"
                            :items="dateSorters"
                            clearable
                            outlined
                            placeholder="Employee"
                        />
                    </v-col>
                </v-row>
                
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <v-card color="white" class="pl-2 no_border" elevation="0">
                            <!-- loading -->
                            <LoadingMe
                                :isLoading="compeletLoading"
                                :fullPage="false"
                                :myLoading="true">
                
                            </LoadingMe>
                
                            <v-row class="">
                                <v-col sm="3" cols="12" class="py-0 pl-2">
                                    <v-select class="mt-1"
                                              :items="dateSorters"
                                              clearable
                                              outlined
                                              placeholder="ALL"
                                    />
                                </v-col>
                    
                                <v-col sm="3" cols="12" class="py-0">
                                    <app-datepicker :initialDate="start_date" @emitDate="start_date = $event"/>
                                </v-col>
                    
                                <v-col sm="3" cols="12" class="py-0">
                                    <app-datepicker :initialDate="end_date" @emitDate="end_date = $event"/>
                                </v-col>
                    
                                <v-col sm="1" cols="1" class="pb-0 pt-1">
                                    <v-btn color="primary white--text">
                                        <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                                    </v-btn>
                                </v-col>
                                <v-col sm="2" cols="12" class="py-0">
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
                                <v-col sm="12" cols="12" class="py-0">
                                    <template>
                                        <v-simple-table class="attachment_table">
                                            <template v-slot:default>
                                                <thead>
                                                <tr>
                                                    <th>{{$t('account')}}</th>
                                                    <th>{{$t('for_the_month')}}</th>
                                                    <th>{{$t('budget_amount')}}</th>
                                                    <th>{{$t('actual_amount')}}</th>
                                                    <th>{{$t('variance')}}</th>
                                                    <th>{{$t('variance_%')}}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>01</td>
                                                    <td>JB00009</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>%</td>
                                    
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
</style>