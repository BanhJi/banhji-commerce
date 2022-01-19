<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row class="">
                        <v-col sm="12" cols="12" class="pt-0">
                            <!-- <v-row class="">
                                <v-col sm="12" cols="12" class="pt-0">
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
                                        <v-col sm="2" cols="12" class="py-1">
                                            <v-btn class="float-right capitalize white--text" color="primary" >
                                                {{$t('add_new')}}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row> -->

                            <v-row class="">
                                <v-col sm="12" cols="12" class="py-0">
                                    <v-simple-table class="attachment_table">
                                        <template v-slot:default>
                                            <thead>
                                            <tr>
                                                <th>{{ $t('id') }}</th>
                                                <th>{{ $t('tax_type_khmer') }}</th>
                                                <th>{{ $t('tax_type') }}</th>
                                                <th>{{ $t('nature') }}</th>
                                                <th>{{ $t('agency') }}</th>
                                                <th>{{ $t('action') }}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>ពន្ធលើតម្លៃបន្ថែម</td>
                                                <td>VAT/GST</td>
                                                <td>Add</td>
                                                <td>GDT</td>
                                                <td>
                                                    <v-btn class="btn_edit_setting">
                                                        <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                                        <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                                    </v-btn>
                                                </td>
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
                </v-col>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
export default {
    data: () => ({
        showLoading: false,
        data: [],
        is_month: false,
        is_start_date: false,
        is_end_date: false,
        start_date: "",
        end_date: "",

        search:{
            start_date: "",
            end_date: ""
        },

    }),
    props: {},
    methods: {
        Change(){
        },
 
        onSearch(){
            this.search = {
                'start_date': this.start_date + '-01',
                'end_date': this.end_date + '-01'
            }
        }
    },
    async mounted() {
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
        // 'app-searchdate' : ()=> import('@/components/custom_templates/SearchDate'),
        // 'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
    },
};
</script>
<style scoped>
  
    .vat{
        text-transform: uppercase;
        color: #fff;
        font-weight: bold;
        font-family: 'Niradei-Bold' !important;
    }

    .amount {
        text-align: right !important;
    }
    .head-summary {
        text-align: right !important;
    }
</style>
