<template>
    <v-row class="px-2">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row>
                <v-col sm="5" cols="12" class="pt-0">
                    <h2 class="mb-1 font_20">{{$t('cash_flow_forecast')}}</h2>
                    <p class="mb-0">{{$t('cash_flow_forecast_desc')}}</p>
                </v-col>
                <v-col sm="3" cols="12">
                    <v-select class="mt-1"
                                clearable
                                outlined
                                placeholder="3 Months"
                    />
                </v-col>
                <v-col sm="4" cols="12">
                    <v-dialog v-model="dialogm" max-width="400px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" class="text-capitalize white--text float-right" v-on="on">
                                {{$t('add_cash_payments')}}
                            </v-btn>
                        </template>
                        <v-card>
                            <div class="modal_header">
                                <v-card-title>{{$t('forecasted_payments')}}</v-card-title>
                                <v-icon  @click="dialogm = false">close</v-icon>
                            </div>
                            <v-card-text cl ass="modal_text_content">
                                <v-row>
                                    <v-col sm="12" cols="12" class="pb-0">
                                        <label class="label">{{$t('type_of_payment')}}</label>
                                        <v-select class="mt-1"
                                                item-text="name"
                                                item-value="selected_acctount_type"
                                                id="TypeOfPayment"
                                                outlined
                                                return-object
                                        />
                                        <v-row>
                                            <v-col sm="6" cols="12" class="py-0">
                                                <label class="label">{{$t('amount')}}</label>
                                                <v-text-field   class="mt-1"
                                                                outlined
                                                                id="Amount"
                                                                placeholder=""
                                                />
                                            </v-col>
                                            <v-col sm="6" cols="12" class="py-0">
                                                <label class="label">{{$t('expected_date')}}</label>
                                                <v-text-field   class="mt-1"
                                                                outlined
                                                                id="ExpectedDate"
                                                                placeholder=""
                                                />
                                            </v-col>
                                            <v-col sm="6" cols="12" class="py-0">
                                                <label class="label">{{$t('related_account')}}</label>
                                                <v-text-field   class="mt-1"
                                                                outlined
                                                                id="Amount"
                                                                placeholder=""
                                                />
                                            </v-col>
                                            <v-col sm="6" cols="12" class="py-0 my_checkbox">
                                                <label class="label">{{$t('segment')}}</label>
                                                <v-text-field   class="mt-1"
                                                                outlined
                                                                id="ExpectedDate"
                                                                placeholder=""
                                                />
                                            </v-col>
                                            <v-col sm="10" cols="12" class="py-0 my_checkbox">
                                                <input type="checkbox" id="1">
                                                <label for="1">{{ $t('repeat_this_every_month') }}</label>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-divider/>
                            <v-card-actions class="modal_footer">
                                <v-row>
                                    <v-col sm="6" cols="6" class="py-0 text-left">
                                        <v-btn
                                                color="primary"
                                                outlined
                                                class=" text-capitalize  black--text float-left"
                                                @click="dialogm = false"
                                        >{{ $t("cancel") }}
                                        </v-btn
                                        >
                                    </v-col>
                                    <v-col sm="6" cols="6" class="py-0 text-right">
                                        <v-btn
                                                color="primary"
                                                class=" white--text text-capitalize"
                                        >{{ $t("save_close") }}
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>

                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
        </v-col>
        <v-col sm="12" cols="12" class="py-0">
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr class="text-bold ">
                            <th> </th>
                            <th class=" font_16 text-uppercase">{{$t('date')}} </th>
                            <th class=" font_16 text-uppercase">{{$t('oct')}} </th>
                            <th class=" font_16 text-uppercase">{{$t('nov')}} </th>
                            <th class=" font_16 text-uppercase">{{$t('dec')}} </th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="text-uppercase text-bold">{{$t('cash_receipts')}}</td>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                    </tr>
                     <tr class="whiteGreen">
                        <td class="">{{$t('expected_due')}}</td>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                    </tr>
                 
                    <tr>
                        <td class="text-uppercase text-bold">{{$t('cash_payments')}}</td>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                    </tr>
                    <tr class="whiteGreen">
                        <td class="">{{$t('amount_to_pay_')}}</td>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                    </tr>
                    <tr class="whiteGreen">
                        <td class="">{{$t('committed_payments')}}</td>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                    </tr>
                    <tr class="whiteGreen">
                        <td class="">{{$t('recurring_payments')}}</td>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                    </tr>
                    <tr class="primary text-bold">
                        <td class=" white--text">{{$t('net_cash_flow')}}</td>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                    </tr>
                    <tr>
                        <td class="text-uppercase text-bold">{{$t('cash_balance')}}</td>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                    </tr>
                    <tr class="primary">
                        <td class="text-uppercase white--text">{{$t('forecasted_cash_balance')}}</td>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                        <td class="white--text text-right"/>
                    </tr>

                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: "CashMovement",
    data () {
        return {
            dialogm: false
        }
    },
    methods: {
  
    },
  
}
</script>
<style scoped>
    .theme--light.v-data-table{
        background-color: transparent !important;
        border-top: thin solid #e0e0e0;
        border-bottom: thin solid #e0e0e0;
        border-radius: 0 !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row){
        border-bottom: thin solid #e0e0e0;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
        height: 32px !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:nth-child(2n+1):hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:nth-last-child(2):hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background: #fff;
    }
</style>