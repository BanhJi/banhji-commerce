<template>
    <v-col sm="12" cols="12" class=" pa-4 pb-0">
        <v-col sm="12" cols="12" class="pb-0">
            <v-row>
                <v-col md="4" sm="4" col="4" class="pa-2 px-0 pb-0">
                    <div class="ma-1 mr-0 pl-2" style="background-color: #c7c6c6;">
                        <h2>{{$t('total')}}</h2>
                    </div>
                </v-col>
                <v-col md="8" sm="8" col="8" class="pa-2 px-0 pb-0">
                    <div class="ma-1 ml-0 pr-2" style="background-color: #c7c6c6;text-align: right;">
                        <h2 class="text-white">0</h2>
                    </div>
                </v-col>
            </v-row>
        </v-col>

        <v-col sm="12" cols="12" class="py-0">
            <v-row>
                
                <v-col md="3" sm="6" col="12" class="pa-1 pr-1">
                    <v-btn  color=secondary class="rounded-0 btn-funtion" style="">
                        <v-icon left>mdi-cancel</v-icon>
                        {{$t('cancel')}}
                    </v-btn>
                </v-col>
                <v-col md="3" sm="6" col="12" class="pa-1 pr-1">
                    <v-btn color=secondary class="rounded-0 btn-funtion" style="">
                        <v-icon left>mdi-ticket-percent</v-icon>
                        {{$t('coupon')}}
                    </v-btn>
                </v-col>
                <v-col md="3" sm="6" col="12" class="pa-1">
                    <v-btn color=secondary class="rounded-0 btn-funtion" style="">
                        <v-icon left>mdi-percent</v-icon>
                        {{$t('discount')}}
                    </v-btn>
                </v-col>
                <v-col md="3" sm="6" col="12" class="pa-1">
                    <v-btn color=secondary class="rounded-0 btn-funtion" style=""> 
                        <v-icon left>mdi-printer</v-icon>
                        {{$t('print')}}
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>

        <v-col sm="12" cols="12" class="py-0">
            <v-row>
                <v-col md="3" sm="6" col="12" class="pa-1">
                    <v-btn color=third class="white--text rounded-0  btn-funtion" style="">
                        <v-icon left>mdi-pencil</v-icon>
                        {{$t('note')}}
                    </v-btn>
                </v-col>
                <v-col md="3" sm="6" col="12" class="pa-1">
                    <v-btn color=third class="white--text rounded-0  btn-funtion" style="">
                        <v-icon left>mdi-motorbike</v-icon>
                        {{$t('delivery')}}
                    </v-btn>
                </v-col>
                <v-col md="3" sm="6" col="12" class="pa-1">
                    <v-btn color=third class="white--text rounded-0  btn-funtion" style="">
                        <v-icon left>mdi-parking</v-icon>
                        {{$t('parksale')}}
                    </v-btn>
                </v-col>
                <v-col md="3" sm="6" col="12" class="pa-1">
                    <v-btn color=third class="white--text rounded-0 btn-funtion" style="">
                        <v-icon left>mdi-receipt</v-icon>
                        {{$t('invoice')}}
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>

        <v-col sm="12" cols="12" class="py-0"> 
            <v-row>
                <v-col sm="5" cols="5" class="pa-0 pr-0">
                    <v-row style="height:100%" class="mx-0">
                        <v-col sm="12" cols="12" class="pa-1 pb-0 pr-0" style="height:50%!important;" >
                            <template>
                                <div justify="center" style="height: 100%;">
                                    <v-dialog
                                    v-model="dialog"
                                    persistent
                                    max-width="800"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn 
                                            color="primary"
                                            dark
                                            v-bind="attrs"
                                            v-on="on"
                                            class="rounded-0 pay-btn" 
                                            style="height:100% !important;">
                                            <span style="font-size: 26px;">{{$t('cash')}}</span> 
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title class="text-h5">
                                        {{$t('cash_receipt')}}
                                        </v-card-title>
                                        <v-card-text>
                                            <v-row>
                                                <v-col sm="6" cols="6" class="">
                                                    <v-row>
                                                        <v-col sm="12" cols="4" class="">
                                                            <v-text-field
                                                                class="mt-1"
                                                                outlined
                                                                placeholder=""
                                                            />
                                                            <v-btn class="rounded-0 receipt-btn">
                                                                1
                                                            </v-btn>
                                                                
                                                            <v-btn class="rounded-0 receipt-btn">
                                                                2
                                                            </v-btn>

                                                            <v-btn class="rounded-0 receipt-btn">
                                                                3
                                                            </v-btn>
                                                            <br>
                                                            <v-btn class="rounded-0 receipt-btn">
                                                                4
                                                            </v-btn>
                                                                
                                                            <v-btn class="rounded-0 receipt-btn">
                                                                5
                                                            </v-btn>

                                                            <v-btn class="rounded-0 receipt-btn">
                                                                6
                                                            </v-btn>
                                                            <br>
                                                            <v-btn class="rounded-0 receipt-btn">
                                                                7
                                                            </v-btn>
                                                                
                                                            <v-btn class="rounded-0 receipt-btn">
                                                                8
                                                            </v-btn>

                                                            <v-btn class="rounded-0 receipt-btn">
                                                                9
                                                            </v-btn>
                                                            <br>
                                                                
                                                            <v-btn class="rounded-0 receipt-btn">
                                                                0
                                                            </v-btn>

                                                            <v-btn class="rounded-0 receipt-btn">
                                                                .
                                                            </v-btn>

                                                            <v-btn class="rounded-0 receipt-btn">
                                                                <v-icon>fas fa-backspace</v-icon>
                                                            </v-btn>
                                                            
                                                        </v-col>
                                                        <v-col sm="12" cols="4" class="">
                                                            <v-btn color="primary" class="rounded-0 my-2">
                                                                KHR
                                                            </v-btn>
                                                            <v-btn color="secondary" class="rounded-0 ma-2">
                                                                USD
                                                            </v-btn>
                                                                <br>
                                                            <v-btn class="rounded-0 receipt-btn">
                                                                5$
                                                            </v-btn>
                                                                
                                                            <v-btn class="rounded-0 receipt-btn">
                                                                10$
                                                            </v-btn>

                                                            <v-btn class="rounded-0 receipt-btn">
                                                                15$
                                                            </v-btn>
                                                            <br>
                                                            <v-btn class="rounded-0 receipt-btn">
                                                                20$
                                                            </v-btn>
                                                                
                                                            <v-btn class="rounded-0 receipt-btn">
                                                                25$
                                                            </v-btn>

                                                            <v-btn class="rounded-0 receipt-btn">
                                                                30$
                                                            </v-btn>
                                                            <br>
                                                                
                                                            <v-btn class="rounded-0 receipt-btn">
                                                                40$
                                                            </v-btn>
                                                            <v-btn class="rounded-0 receipt-btn">
                                                                50$
                                                            </v-btn>

                                                            <v-btn class="rounded-0 receipt-btn">
                                                                100$
                                                            </v-btn>
                                                            
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                                <v-col sm="6" cols="6" class="pb-0 function_content pa-3">
                                                    <v-card class="pa-3 no-boxshadow d-flex justify-space-between align-center"
                                                            min-height="50px" color="primary">
                                                        <h3 style="font-size: 18px" class="text-white text-uppercase">
                                                        {{ $t('amount_to_pay') }}</h3>
                                                        <h3 class="text-bold float-right text-white" style="font-size: 22px">
                                                        00000000</h3>
                                                        
                                                    </v-card>
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <tbody>
                                                                <tr>
                                                                    <td class="text-left pr-0">{{
                                                                        $t('KHR')
                                                                    }}
                                                                    </td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-right">
                                                                        0000000 រៀល
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text-left pr-0">{{ $t('USD') }}</td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-right">
                                                                        0000000 USD
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text-left pr-0">{{
                                                                        $t('exchange_rate')
                                                                    }}
                                                                    </td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-right">
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text-left pr-0">{{
                                                                        $t('receipt_amount')
                                                                    }}
                                                                    </td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-right">
                                                                        0000000
                                                                    </td>
                                                                </tr>
                                                                <tr color="secondary">
                                                                    <td color="secondary" class="text-left pr-0">{{
                                                                        $t('balance')
                                                                    }}
                                                                    </td>
                                                                    <td class="text-center">:</td>
                                                                    <td color="secondary" class="text-right">
                                                                        0000000
                                                                    </td>
                                                                </tr>

                                                            </tbody>
                                                        </template>
                                                    </v-simple-table>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                        <v-card-actions>
                                            <div class="function_footer">
                                                <v-btn outlined color="#494846" class="float-left text-capitalize"
                                                    @click="dialog = false">{{ $t('cancel') }}
                                                </v-btn>

                                                <v-btn color="secondary" class="float-right white--text text-capitalize"
                                                    @click="dialog = false">
                                                    {{ $t('make_cash_payment') }}
                                                </v-btn>
                                            </div>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                    </v-dialog>
                                </div>
                            </template>
                            
                        </v-col>
                        <v-col sm="6" cols="6" class="pa-1 pr-0" style="height:50%!important;">
                            <v-btn color=primary class="rounded-0 pay-btn" style="height:100% !important;">
                                <v-icon style="font-size:40px;">fas fa-credit-card</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col sm="6" cols="6" class="pa-1 pr-0" style="height:50%!important;">
                            <v-btn color=primary class="rounded-0 pay-btn" style="height:100% !important;">
                                <v-icon style="font-size:40px;">mdi-qrcode-scan</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col sm="7" cols="7" class="pa-1 pl-0">
                        <v-btn class="rounded-0 calculator-btn">
                            1
                        </v-btn>
                            
                        <v-btn class="rounded-0 calculator-btn">
                            2
                        </v-btn>

                        <v-btn class="rounded-0 calculator-btn">
                            3
                        </v-btn>

                        <v-btn class="rounded-0 calculator-btn">
                            qty
                        </v-btn>
                        <br>
                        <v-btn class="rounded-0 calculator-btn">
                            4
                        </v-btn>
                            
                        <v-btn class="rounded-0 calculator-btn">
                            5
                        </v-btn>

                        <v-btn class="rounded-0 calculator-btn">
                            6
                        </v-btn>

                        <v-btn class="rounded-0 calculator-btn">
                            disc
                        </v-btn>
                        <br>
                        <v-btn class="rounded-0 calculator-btn">
                            7
                        </v-btn>
                            
                        <v-btn class="rounded-0 calculator-btn">
                            8
                        </v-btn>

                        <v-btn class="rounded-0 calculator-btn">
                            9
                        </v-btn>

                        <v-btn class="rounded-0 calculator-btn">
                            price
                        </v-btn>
                        <br>
                        <v-btn class="rounded-0 calculator-btn">
                            +/-
                        </v-btn>
                            
                        <v-btn class="rounded-0 calculator-btn">
                            0
                        </v-btn>

                        <v-btn class="rounded-0 calculator-btn">
                            .
                        </v-btn>

                        <v-btn class="rounded-0 calculator-btn">
                            <v-icon>fas fa-backspace</v-icon>
                        </v-btn>
                        
                </v-col>
            </v-row> 
        </v-col>
        
    </v-col>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>
<style scoped>
    .calculator{
        border: 1px solid gainsboro;
    }
    .receipt-btn{
        min-width: 25% !important;
        width: 33%;
        border: 1px solid #e0e0e0;
        padding: 0 10px !important;
    }
    .calculator-btn{
       min-width: 25% !important;
        width: 25%;
        border: 1px solid #e0e0e0;
        padding: 0 10px !important;
    }
    .pay-btn{
        width: 100%;
        border: 1px solid #e0e0e0;
    }
    .v-text-field__detail .field-pos{
        display:none !important;
    }
    .btn-funtion{
        font-size: 14px;
        width: 100% !important;
    }
   
    /* Surface pro */
    @media only screen and (min-width : 1400px){
        .btn-funtion{
            font-size: 14px !important;
        }
        .v-application--is-ltr .v-btn__content .v-icon--left {
            margin-right: 8px;
        }
        .v-btn__content .v-icon.v-icon--left, .v-btn__content .v-icon.v-icon--right {
            font-size: 18px;
            height: 18px;
            width: 18px;
        }
        .calculator-btn{
            font-size: 14px;
        }
    }
   @media only screen and (min-device-height : 720px) and (max-device-width : 1280px) {
    
        /** Surface Pro styles here **/
        .btn-funtion{
            font-size: 12px !important;
        }
        .v-application--is-ltr .v-btn__content .v-icon--left {
            margin-right: 5px;
        }
        .v-btn__content .v-icon.v-icon--left, .v-btn__content .v-icon.v-icon--right {
            font-size: 16px;
            height: 10px;
            width: 10px;
        }
        .calculator-btn{
            font-size: 12px;
        }
    }
    
  
</style>