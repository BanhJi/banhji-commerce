<template>

    <v-container fluid class="sale-container py-0">
        <v-row>
            <v-col sm="12" cols="12" class="">
                <v-card color="#f8f8f9" class="pa-0 no_border" elevation="0">
                    <v-row>
                        <!-- left sidebar -->
                        <v-col sm="2" cols="2" class="pa-0 sidebar-left">
                            <v-card flat  height="98vh" color="" style="background-color: rgb(248 248 249);">
                               <v-list dense class="pa-0">
                                    <span class="hidden-sm-and-down">
                                        <a :href="lang+'/'"  class="main_logo  d-flex pl-6 py-3" style="background-color: rgb(248 248 249);">
                                        <div class="mb-0">
                                            <img
                                                src="@/assets/images/banhji_pos.png"
                                                height="38"
                                                alt="BanhJi Logo"
                                            />
                                        </div>
                                        </a>
                                        <a v-if="!isAccountLogo" href="" class="">
                                        <h1 class="mb-0">
                                            <img
                                                class="small_img fade-in"
                                                src="@/assets/images/banhji_icon.png"
                                                height="40"
                                                alt="BanhJi Logo"
                                            />
                                            
                                        </h1>
                                        </a>
                                    </span>
                                    
                                    <div class="block_menu" style="background-color: rgb(248 248 249);">
                                        <div class="v-list-item d-block">
                                            <v-text-field
                                            class="pl-2"
                                            outlined
                                            :placeholder="$t('search')"
                                            append-icon="search"
                                            clearable/>
                                        </div>
                                        <div class="v-list-item d-block">
                                            <h2 class="pl-2">a chouen</h2>
                                        </div>
                                        <div class="v-list-item d-block">
                                            <span class="pl-2">{{$t('customer_id')}}</span> <br>
                                            <h2 class="pl-2 border-b">092 123 456</h2>
                                        </div>
                                        <div class="v-list-item d-block">
                                            <span class="pl-2">{{$t('points')}}</span><br>
                                            <h2 class="pl-2 border-b">092 123 456</h2>
                                        </div>
                                        <div class="v-list-item d-block">
                                            <span class="pl-2">{{$t('loyalty_program')}}</span><br>
                                            <h2 class="pl-2 border-b">10%</h2>
                                        </div>
                                        <div class="v-list-item d-block">
                                            <span class="pl-2">{{$t('loyalty_num')}}</span><br>
                                            <h2 class="pl-2 border-b  primary--text">123456789</h2>
                                        </div>

                                        <div class="v-list-item d-block ma-3 mb-0 v-divider"></div>

                                        <div class="v-list-item d-block mr-4 pt-2" style="background-color: #ffff;">
                                            <span class="pl-2 ">{{$t('partner')}}</span><br>
                                            <h2 class="pl-2 border-b  primary--text">foodpada</h2>
                                        </div>
                                        <div class="v-list-item d-block mr-4" style="background-color: #ffff;">
                                            <span class="pl-2">{{$t('order_number')}}</span><br>
                                            <h2 class="pl-2 border-b  primary--text">12345678</h2>
                                        </div>

                                        <div class="v-list-item d-block ma-3 mt-0 v-divider"></div>

                                        <div class="v-list-item d-block" >
                                            <v-btn  class="rounded-0 btn-funtion mx-1 btn-sidebar pr-1" width="100%" style="">
                                                <v-icon left>mdi-cancel</v-icon>
                                                {{$t('parksale')}}
                                                <h2 class="notification">20</h2>
                                            </v-btn>
                                        </div>
                                        <div class="v-list-item d-block">
                                            <v-btn  class="rounded-0 btn-funtion mx-1 btn-sidebar pr-1" width="100%" style="">
                                                <v-icon left>mdi-cancel</v-icon>
                                                {{$t('invoice')}}
                                                <h2 class="notification">20</h2>
                                            </v-btn>
                                        </div>
                                        <div class="v-list-item d-block">
                                            <v-btn  class="rounded-0 btn-funtion mx-1 btn-sidebar pr-1" width="100%" style="">
                                                <v-icon left>mdi-cancel</v-icon>
                                                {{$t('order')}}
                                                <h2 class="notification">20</h2>
                                            </v-btn>
                                        </div>

                                        <div class="v-list-item d-block ma-3 mb-0 v-divider"></div>

                                        <div class="v-list-item d-block mr-4 pt-2" style="background-color: #ffff;">
                                            <span class="pl-2 ">{{$t('cashier')}}</span><br>
                                            <h2 class="pl-2 border-b  primary--text">Pheaktra</h2>
                                        </div>
                                        <div class="v-list-item d-block mr-4" style="background-color: #ffff;">
                                            <span class="pl-2">{{$t('session')}}</span><br>
                                            <h2 class="pl-2 border-b  primary--text">May 24, 2022</h2>
                                        </div>
                                    </div>
                                </v-list>
                            </v-card>
                        </v-col>
                        <!-- function -->
                        <v-col sm="5" cols="5" class="py-0 ">
                            <div class="d-flex flex-column" style="height: 98vh;background-color: #ffff;">
                                <!-- sale transation -->
                                <div sm="12" cols="12" class=" flex-1">
                                    <v-card color="white" class="px-2 no_border" elevation="0">
                                        <v-row>
                                            <v-col sm="12" cols="12" class="py-1">
                                                <h2 class="mb-1 font_20">{{ $t('customer_order') }}</h2>
                                            </v-col>
                                        </v-row>


                                        <v-row>
                                            <v-col sm="12" cols="12" class="py-0">
                                                <template>
                                                    <kendo-datasource ref="gridCollectionDS"
                                                                    :type="'JSON'"
                                                                    :server-paging="false"/>
                                                    <kendo-grid id="gridCollection" class="grid-function"
                                                                :data-source-ref="'gridCollectionDS'"
                                                                :editable="false"
                                                                :groupable="false"
                                                                :column-menu="true"
                                                                :noRecords="true"
                                                                :scrollable-virtual="true">
                                                        <kendo-grid-column
                                                            :field="'product'"
                                                            :title="$t('product')"
                                                            :width="200"
                                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>

                                                        <kendo-grid-column
                                                            :field="'qty'"
                                                            :title="$t('qty')"
                                                            :width="100"
                                                            :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                        <kendo-grid-column
                                                            :field="'price'"
                                                            :title="$t('price')"
                                                            :width="100"
                                                            :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                        <kendo-grid-column
                                                            :field="'discount'"
                                                            :title="`%`"
                                                            :width="100"
                                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                        
                                                    </kendo-grid>
                                                    <LoadingMe
                                                        :isLoading="showLoading"
                                                        :fullPage="false"
                                                        :myLoading="true"
                                                        :alertMessage="loadingAlert"
                                                        :color="loadingColorAlert"
                                                        :alertText="loadingTextAlert"/>
                                                </template>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </div>
                                
                                <div sm="12" cols="12" class="ml-8">
                                   
                                    <!-- step1 -->
                                    <template>
                                        <v-row>
                                            <v-dialog
                                                v-model="dialogLoyalty"
                                                persistent
                                                max-width="600px"
                                                >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn
                                                    color="primary btn_h2"
                                                    dark
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    width=""
                                                    style="font-size: 22px;"
                                                    >
                                                    {{$t('loyalty')}}
                                                    </v-btn>
                                                </template>
                                                <v-card>
                                                    <v-card-title>
                                                    <span class="text-h5">{{$t('loyalty')}}</span>
                                                    </v-card-title>
                                                    <v-card-text>
                                                    <v-container>
                                                        <v-row>
                                                        <v-col
                                                            cols="12"
                                                            sm="12"
                                                            md="12"
                                                        >
                                                            <v-text-field
                                                            label="Search by card number"
                                                            required
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col
                                                            cols="12"
                                                            sm="12"
                                                        >
                                                            <v-select
                                                            :items="['A choen', 'pheaktra', 'Ly heang', 'Nimol']"
                                                            label="Search by Customer"
                                                            required
                                                            ></v-select>
                                                        </v-col>
                                                        </v-row>
                                                    </v-container>
                                                    <!-- <small>*indicates required field</small> -->
                                                    </v-card-text>
                                                    <v-card-actions>
                                                        <div class="function_footer">
                                                            <v-btn outlined color="#494846" class="float-left text-capitalize"
                                                                @click="LoyaltyToSale()">{{ $t('skip') }}
                                                            </v-btn>

                                                            <v-btn color="secondary" class="float-right white--text text-capitalize"
                                                                @click="LoyaltyToSale()">
                                                                {{ $t('enter') }}
                                                            </v-btn>
                                                        </div>
                                                        <v-spacer></v-spacer>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </v-row>
                                    </template> 
                                    <!-- step2 -->
                                    <template>
                                        <v-row>
                                            <v-dialog
                                                v-model="dialogPartner"
                                                persistent
                                                max-width="600px"
                                                >
                                                <v-card>
                                                    <v-card-title>
                                                    <span class="text-h5">{{$t('partner')}}</span>
                                                    </v-card-title>
                                                    <v-card-text>
                                                    <v-container>
                                                        <v-row>
                                                            <v-col sm="4" cols="12" class="">
                                                                <v-card
                                                                    class="mx-auto"
                                                                    max-width="465"
                                                                    outlined
                                                                    @click="PartnerToSale()"
                                                                >
                                                                    <v-list-item three-line>
                                                                        <v-list-item-content class="pk-3">
                                                                            <v-row>
                                                                                <v-col sm="12" cols="12" class="">
                                                                                    <img
                                                                                        class="img-1"
                                                                                        src="@/assets/images/foodpanda.png"
                                                                                        width="100%"
                                                                                    />
                                                                                </v-col>
                                                                            </v-row>
                                                                        </v-list-item-content>
                                                                    </v-list-item>
                                                                </v-card>
                                                            </v-col>
                                                            <v-col sm="4" cols="12" class="">
                                                                <v-card
                                                                    class="mx-auto"
                                                                    max-width="465"
                                                                    outlined
                                                                    @click="PartnerToSale()"
                                                                >
                                                                    <v-list-item three-line>
                                                                        <v-list-item-content class="pk-3">
                                                                            <v-row>
                                                                                <v-col sm="12" cols="12" class="">
                                                                                    <img
                                                                                        class="img-1"
                                                                                        src="@/assets/images/nham24.png"
                                                                                        width="100%"
                                                                                    />
                                                                                </v-col>
                                                                            </v-row>
                                                                        </v-list-item-content>
                                                                    </v-list-item>
                                                                </v-card>
                                                            </v-col>
                                                            <v-col sm="4" cols="12" class="">
                                                                <v-card
                                                                    class="mx-auto"
                                                                    max-width="465"
                                                                    outlined
                                                                    @click="PartnerToSale()"
                                                                >
                                                                    <v-list-item three-line>
                                                                        <v-list-item-content class="pk-3">
                                                                            <v-row>
                                                                                <v-col sm="12" cols="12" class="">
                                                                                    <img
                                                                                        class="img-1"
                                                                                        src="@/assets/images/wownow.png"
                                                                                        width="100%"
                                                                                    />
                                                                                </v-col>
                                                                            </v-row>
                                                                        </v-list-item-content>
                                                                    </v-list-item>
                                                                </v-card>
                                                            </v-col>
                                                            <v-col sm="4" cols="12" class="">
                                                                <v-card
                                                                    class="mx-auto"
                                                                    max-width="465"
                                                                    outlined
                                                                    @click="PartnerToSale()"
                                                                >
                                                                    <v-list-item three-line>
                                                                        <v-list-item-content class="pk-3">
                                                                            <v-row>
                                                                                <v-col sm="12" cols="12" class="">
                                                                                    <img
                                                                                        class="img-1"
                                                                                        src="@/assets/images/muuve.png"
                                                                                        width="100%"
                                                                                    />
                                                                                </v-col>
                                                                            </v-row>
                                                                        </v-list-item-content>
                                                                    </v-list-item>
                                                                </v-card>
                                                            </v-col>
                                                            <v-col sm="4" cols="12" class="">
                                                                <v-card
                                                                    class="mx-auto"
                                                                    max-width="465"
                                                                    outlined
                                                                    @click="PartnerToSale()"
                                                                >
                                                                    <v-list-item three-line>
                                                                        <v-list-item-content class="pk-3">
                                                                            <v-row>
                                                                                <v-col sm="12" cols="12" class="">
                                                                                    <img
                                                                                        class="img-1"
                                                                                        src="@/assets/images/bloc.png"
                                                                                        width="100%"
                                                                                    />
                                                                                </v-col>
                                                                            </v-row>
                                                                        </v-list-item-content>
                                                                    </v-list-item>
                                                                </v-card>
                                                            </v-col>
                                                                
                                                        </v-row>
                                                    </v-container>
                                                    <!-- <small>*indicates required field</small> -->
                                                    </v-card-text>
                                                    <v-card-actions>
                                                        <div class="function_footer">
                                                             <v-btn color="secondary" class="float-right white--text text-capitalize"
                                                                @click="dialogPartner = false">
                                                                {{ $t('skip') }}
                                                            </v-btn>
                                                        </div>
                                                        <v-spacer></v-spacer>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </v-row>
                                    </template> 
                                </div>

                                <div sm="12" cols="12" class="px-1">
                                    <v-col sm="12" cols="12" class="pb-0">
                                        <v-row>
                                            <v-col md="3" sm="3" col="3" class="pb-0">
                                                <small>{{$t('sub_total')}}</small>
                                                <small class="float-right primary--text">{{$t('00000')}}</small>
                                            </v-col>
                                            <v-col md="3" sm="3" col="3" class="pb-0">
                                                <small>{{$t('discount')}}</small>
                                                <small class="float-right primary--text">{{$t('00000')}}</small>
                                            </v-col>
                                            <v-col md="3" sm="3" col="3" class="pb-0">
                                                <small>{{$t('reward')}}</small>
                                                <small class="float-right primary--text">{{$t('00000')}}</small>
                                            </v-col>
                                            <v-col md="3" sm="3" col="3" class="pb-0">
                                                <small>{{$t('total_tax')}}</small>
                                                <small class="float-right primary--text">{{$t('00000')}}</small>
                                            </v-col>

                                        </v-row>
                                        <v-row class="mt-0">
                                            
                                            <v-col md="4" sm="4" col="4" class="pa-2 px-0 py-0">
                                                <div class="ma-1 mr-0 pl-2" style="background-color: #c7c6c6;">
                                                    <h2 class="font_20 mb-0">{{$t('total')}}</h2>
                                                </div>
                                            </v-col>
                                            <v-col md="8" sm="8" col="8" class="pa-2 px-0 py-0">
                                                <div class="ma-1 ml-0 pr-2" style="background-color: #c7c6c6;text-align: right;">
                                                    <h2 class="text-white font_20 mb-0">0</h2>
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
                                                    {{$t('promotion')}}
                                                </v-btn>
                                            </v-col>
                                            <v-col md="3" sm="6" col="12" class="pa-1">
                                                <v-btn color=secondary class="rounded-0 btn-funtion" style="">
                                                    <v-icon left>mdi-percent</v-icon>
                                                    {{$t('reward')}}
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
                                            <v-col sm="4" cols="4" class="pa-1 pl-0">
                                                <v-row class="mx-0" style="height: 100%;">
                                                    <v-col sm="12" cols="12" class="pa-1 pt-0 pb-0 mt-1" >
                                                        <template>
                                                            <div justify="center" style="height: 100%;">
                                                                <v-dialog
                                                                v-model="dialog"
                                                                persistent
                                                                max-width="1000"
                                                                >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn 
                                                                        color="primary"
                                                                        dark
                                                                        v-bind="attrs"
                                                                        v-on="on"
                                                                        height="50%"
                                                                        class="rounded-0 pay-btn" 
                                                                        style="height:100% !important;">
                                                                        
                                                                        <span style="font-size: 26px;">{{$t('cash')}}</span> 
                                                                    </v-btn>
                                                                </template>
                                                                <v-card>
                                                                    
                                                                    <v-card-text>
                                                                        <v-card-title class="text-h5">
                                                                        {{$t('cash_receipt')}}
                                                                        </v-card-title>
                                                                        <v-row>
                                                                            <v-col sm="6" cols="6" class="">
                                                                                <v-row>
                                                                                    
                                                                                    <v-col sm="12" cols="4" class="">
                                                                                        <v-text-field
                                                                                            class="mt-1 pr-6"
                                                                                            outlined
                                                                                            placeholder=""
                                                                                        />
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0">
                                                                                            1
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn">
                                                                                            2
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0">
                                                                                            3
                                                                                        </v-btn>
                                                                                        <br>
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0">
                                                                                            4
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn">
                                                                                            5
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0">
                                                                                            6
                                                                                        </v-btn>
                                                                                        <br>
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0">
                                                                                            7
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn">
                                                                                            8
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0">
                                                                                            9
                                                                                        </v-btn>
                                                                                        <br>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0">
                                                                                            0
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn">
                                                                                            .
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0">
                                                                                            <v-icon>fas fa-backspace</v-icon>
                                                                                            clear
                                                                                        </v-btn>
                                                                                        
                                                                                    </v-col>
                                                                                    <v-col sm="12" cols="4" class="">
                                                                                        <v-btn color="primary" class="rounded-0 my-2 ">
                                                                                            KHR
                                                                                        </v-btn>
                                                                                        <v-btn color="secondary" class="rounded-0 ma-2">
                                                                                            USD
                                                                                        </v-btn>
                                                                                            <br>
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0 btn-money">
                                                                                            5$
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn btn-money">
                                                                                            10$
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0 btn-money">
                                                                                            15$
                                                                                        </v-btn>
                                                                                        <br>
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0 btn-money">
                                                                                            20$
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn btn-money">
                                                                                            25$
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0 btn-money">
                                                                                            30$
                                                                                        </v-btn>
                                                                                        <br>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0 btn-money">
                                                                                            40$
                                                                                        </v-btn>
                                                                                        <v-btn class="rounded-0 receipt-btn btn-money">
                                                                                            50$
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0 btn-money">
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
                                                    <v-col sm="6" cols="6" class="pa-1 mt-1">
                                                        <template>
                                                            <div justify="center" style="height: 100%;">
                                                                <v-dialog
                                                                v-model="dialog"
                                                                persistent
                                                                max-width="1000"
                                                                >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn 
                                                                        color="primary"
                                                                        dark
                                                                        v-bind="attrs"
                                                                        v-on="on"
                                                                        class="rounded-0 pay-btn" 
                                                                        style="height:100% !important;">
                                                                        <v-icon style="font-size:60px;" class="b-banking"></v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <v-card>
                                                                    
                                                                    <v-card-text>
                                                                        <v-card-title class="text-h5">
                                                                        {{$t('cash_receipt')}}
                                                                        </v-card-title>
                                                                        <v-row>
                                                                            <v-col sm="6" cols="6" class="">
                                                                                <v-row>
                                                                                    
                                                                                    <v-col sm="12" cols="4" class="">
                                                                                        <v-text-field
                                                                                            class="mt-1 pr-6"
                                                                                            outlined
                                                                                            placeholder=""
                                                                                        />
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0">
                                                                                            1
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn">
                                                                                            2
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0">
                                                                                            3
                                                                                        </v-btn>
                                                                                        <br>
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0">
                                                                                            4
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn">
                                                                                            5
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0">
                                                                                            6
                                                                                        </v-btn>
                                                                                        <br>
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0">
                                                                                            7
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn">
                                                                                            8
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0">
                                                                                            9
                                                                                        </v-btn>
                                                                                        <br>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0">
                                                                                            0
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn">
                                                                                            .
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0">
                                                                                            <v-icon>fas fa-backspace</v-icon>
                                                                                            clear
                                                                                        </v-btn>
                                                                                        
                                                                                    </v-col>
                                                                                    <v-col sm="12" cols="4" class="">
                                                                                        <v-btn color="primary" class="rounded-0 my-2 ">
                                                                                            KHR
                                                                                        </v-btn>
                                                                                        <v-btn color="secondary" class="rounded-0 ma-2">
                                                                                            USD
                                                                                        </v-btn>
                                                                                            <br>
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0 btn-money">
                                                                                            5$
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn btn-money">
                                                                                            10$
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0 btn-money">
                                                                                            15$
                                                                                        </v-btn>
                                                                                        <br>
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0 btn-money">
                                                                                            20$
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn btn-money">
                                                                                            25$
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0 btn-money">
                                                                                            30$
                                                                                        </v-btn>
                                                                                        <br>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0 btn-money">
                                                                                            40$
                                                                                        </v-btn>
                                                                                        <v-btn class="rounded-0 receipt-btn btn-money">
                                                                                            50$
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0 btn-money">
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
                                                    <v-col sm="6" cols="6" class="pa-1 mt-1">
                                                        <template>
                                                            <div justify="center" style="height: 100%;">
                                                                <v-dialog
                                                                v-model="dialog"
                                                                persistent
                                                                max-width="1000"
                                                                >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn 
                                                                        color="primary"
                                                                        dark
                                                                        v-bind="attrs"
                                                                        v-on="on"
                                                                        class="rounded-0 pay-btn" 
                                                                        style="height:100% !important;">
                                                                        <v-icon style="font-size:60px;" class="b-payment"></v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <v-card>
                                                                    
                                                                    <v-card-text>
                                                                        <v-card-title class="text-h5">
                                                                        {{$t('cash_receipt')}}
                                                                        </v-card-title>
                                                                        <v-row>
                                                                            <v-col sm="6" cols="6" class="">
                                                                                <v-row>
                                                                                    
                                                                                    <v-col sm="12" cols="4" class="">
                                                                                        <v-text-field
                                                                                            class="mt-1 pr-6"
                                                                                            outlined
                                                                                            placeholder=""
                                                                                        />
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0">
                                                                                            1
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn">
                                                                                            2
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0">
                                                                                            3
                                                                                        </v-btn>
                                                                                        <br>
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0">
                                                                                            4
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn">
                                                                                            5
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0">
                                                                                            6
                                                                                        </v-btn>
                                                                                        <br>
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0">
                                                                                            7
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn">
                                                                                            8
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0">
                                                                                            9
                                                                                        </v-btn>
                                                                                        <br>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0">
                                                                                            0
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn">
                                                                                            .
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0">
                                                                                            <v-icon>fas fa-backspace</v-icon>
                                                                                            clear
                                                                                        </v-btn>
                                                                                        
                                                                                    </v-col>
                                                                                    <v-col sm="12" cols="4" class="">
                                                                                        <v-btn color="primary" class="rounded-0 my-2 ">
                                                                                            KHR
                                                                                        </v-btn>
                                                                                        <v-btn color="secondary" class="rounded-0 ma-2">
                                                                                            USD
                                                                                        </v-btn>
                                                                                            <br>
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0 btn-money">
                                                                                            5$
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn btn-money">
                                                                                            10$
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0 btn-money">
                                                                                            15$
                                                                                        </v-btn>
                                                                                        <br>
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0 btn-money">
                                                                                            20$
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn btn-money">
                                                                                            25$
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0 btn-money">
                                                                                            30$
                                                                                        </v-btn>
                                                                                        <br>
                                                                                            
                                                                                        <v-btn class="rounded-0 receipt-btn ml-0 btn-money">
                                                                                            40$
                                                                                        </v-btn>
                                                                                        <v-btn class="rounded-0 receipt-btn btn-money">
                                                                                            50$
                                                                                        </v-btn>

                                                                                        <v-btn class="rounded-0 receipt-btn mr-0 btn-money">
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
                                                    
                                                </v-row>
                                            </v-col>
                                            <v-col sm="8" cols="8" class="pa-1 pl-0 float-right text-right">
                                                    <v-btn class="rounded-0 calculator-btn ml-0">
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
                                                    <v-btn class="rounded-0 calculator-btn mr-0">
                                                        modifi
                                                    </v-btn>
                                                    <br>
                                                    <v-btn class="rounded-0 calculator-btn ml-0">
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
                                                    <v-btn class="rounded-0 calculator-btn mr-0">
                                                        staff
                                                    </v-btn>
                                                    <br>
                                                    <v-btn class="rounded-0 calculator-btn ml-0">
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
                                                    
                                                    <v-btn class="rounded-0 calculator-btn mr-0">
                                                        
                                                    </v-btn>
                                                    <br>   
                                                    <v-btn class="rounded-0 calculator-btn ml-0">
                                                        0
                                                    </v-btn>
                                                        
                                                    <v-btn class="rounded-0 calculator-btn">
                                                        .
                                                    </v-btn>

                                                    <v-btn class="rounded-0 calculator-btn">
                                                        clear
                                                    </v-btn>

                                                    <v-btn class="rounded-0 calculator-btn">
                                                        
                                                    </v-btn>
                                                    
                                                    <v-btn class="rounded-0 calculator-btn mr-0">
                                                        
                                                    </v-btn>
                                                    
                                            </v-col>
                                        </v-row> 
                                    </v-col>
                                </div>
                            </div>
                               
                        </v-col>
                        <!-- items list -->
                        <v-col sm="5" cols="5" class="sidebar-left2 pt-0" style="overflow-y: auto;">
                            <v-row>
                                <v-col sm="12" cols="12" class="pa-0">
                                    <v-card flat height="98vh" class="card-item" style=""> 
                                        <v-card-text class="py-0">
                                            <v-row>
                                                <v-col sm="3" cols="6" class="pa-1 py-0 pr-0">
                                                    <v-select class="mt-1 rounded-0 "
                                                            clearable
                                                            outlined
                                                            :label="$t('code')"
                                                    />
                                                </v-col>
                                                <v-col sm="9" cols="6" class="pa-1 py-0">
                                                    <v-text-field
                                                        class="mt-1 rounded-0 "
                                                        outlined
                                                        :label="$t('scan_code')"
                                                        append-icon="mdi-barcode-scan"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col md="4" sm="4" xs="6" cols="12" class="pa-1" v-for="item in items" :key="item.id">
                                                    <v-card
                                                        class="pb-0"
                                                        elevation="0"
                                                        max-width="200"
                                                    >
                                                        <template slot="progress">
                                                            <v-progress-linear
                                                                color="deep-purple"
                                                                height="10"
                                                                indeterminate
                                                            ></v-progress-linear>
                                                        </template>

                                                        <v-img
                                                            height="140"
                                                            :src="item.img"
                                                        ></v-img>
                                                        <p class="pa-2 name-items" style="height: 32px;">{{ item.name }}</p>
                                                        <v-divider class="mx-4"></v-divider>
                                                        <v-card-text class="py-0 text-white" style="background-color: #898c8f;text-align: center;">
                                                            <h2 class="text-white mb-0" style="font-size:18px;"> {{ item.price }} ៛</h2>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-col>

                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                        <!-- right sidebar -->
                        <v-col sm="1" cols="1" class="pa-0 pl-4">
                            <v-card flat  height="98vh" color="">
                                <v-btn class=" rounded-0  btn-right" icon @click="toggle">
                                    <i   
                                        :class="[fullscreen ? 'b-mini' : 'b-full']"
                                    />
                                </v-btn>
                                <v-btn class=" rounded-0  btn-right" style="">
                                    <div class="d-block">
                                        <i  class=" b-segment" />
                                        <h6>{{$t('categories')}}</h6>
                                    </div>
                                    
                                </v-btn>
                                <v-btn class=" rounded-0  btn-right" style="">
                                    <div class="d-block">
                                        <i  class=" b-dimensions" />
                                        <h6>{{$t('group')}}</h6>
                                    </div>
                                </v-btn>
                                <v-btn class=" rounded-0  btn-right" style="">
                                    <div class="d-block">
                                        <i  class=" b-specific" />
                                        <h6>{{$t('sub_group')}}</h6>
                                    </div>
                                </v-btn>
                                <v-btn class=" rounded-0  btn-right" style="">
                                    <div class="d-block">
                                        <i  class=" b-compliance" />
                                        <h6>{{$t('favorite')}}</h6>
                                    </div>
                                </v-btn>
                                <v-btn class=" rounded-0  btn-right" style="">
                                    <div class="d-block">
                                        <i  class=" b-product" />
                                        <h6>{{$t('items')}}</h6>
                                    </div>
                                </v-btn>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { i18n } from "@/i18n";
const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
export default {
    data: () => ({
        isAccountLogo: true,
        dialogLoyalty: false,
        dialogPartner: false,

        isHide: false,
        fullscreen: false,
        s: {
            timeIn: false,
            timeOut: false,
            orderNumber: false,
            cashierName: false,
            modifier: false,
            employee: false,
            note: false,
            numberPeople: false,
            saleUnitItem: false,
            favorite: false,
            takeAway: false,
            booking: false,
            userPin: false,
            sessionPin: false,
            allowNFCCard: false,
            allowSplitItem: false,
            kitchenKitCategories: [],
            allowKitchenKit: false,
            orderListCategries: [],
            allowOrderList: false,
            cancelReasons: [],
            allowCancelReason: false,
            decimal: 0,
            appNature: 'Retail',
            screenDisplay: 'Surface',
            receiptTemplate: '80mm'
        }
    }),
    methods: {
        LoyaltyToSale(){
            this.dialogPartner = true;
            this.dialogLoyalty = false;
        },
        PartnerToSale(){
            window.location.reload()
        },
        clickMe(data) {
            // alert(data.link)
            this.$router.push(`${data.link}`);
            //this.$event.target.classList.toggle(active)
            //eslint-disable-next-line no-console
            console.log(data.link)
            //eslint-disable-next-line no-console
            //console.log(data)
        }, 
        hideTabs(){
            this.isHide = !this.isHide;
        },
        toggle() {
        this.$fullscreen.toggle(document.getElementsByTagName("body")[0], {
                wrap: false,
                callback: this.fullscreenChange,
            });
        },
        fullscreenChange(fullscreen) {
            this.fullscreen = fullscreen;
        },
        loadSetting(){
            commerceHandler.settingGet().then((res) => {
                window.console.log(res, 'setting')
                if(res.status == 200){
                    this.gotoSetting()
                }else{
                    this.gotoSetting()
                }
            })
        },
        gotoSetting(){
            this.$swal({
                position: 'center',
                icon: 'warning',
                title: i18n.t('please_configure_setting'),
                showConfirmButton: true,
                confirmButtonColor: '#4d4848',
                cancelButtonColor: '#ED1A3A',
                confirmButtonText: i18n.t('back_to_setting')
            }).then((result) => {
                if (result.value) {
                    window.history.go(-1)
                    return false
                }
            })
        },
    },
    components: {
    },
    computed:{
        lang() {
            return "/" + i18n.locale;
            },
    },
    created: async function () {
        await this.loadSetting()
    },
    
};
</script>
<style scoped>
    .btn-right .v-btn__content i{
       font-size: 40px;
    }
    .btn-right .v-btn__content{
       display: block !important;
    }
    h6{
       color: #2a2b2b;
       font-size: 0.6rem !important; 
       font-family: "Niradei-bold", serif !important;
       padding-top: 5px;
    }
    
    .btn-right{
        background-color: #ffffff !important;
        border-bottom: 1px solid;
        border-color: #e5e5e6 !important;
        width: 100%;
        height: 12% !important;
        text-align: center;
        padding: 0 3px !important;
       
    }
    .v-tab {
        justify-content: left;
        font-size: 36px;
    }

    .v-tab--active {
        background-color: rgb(255, 255, 255);
    }

    .tab_setting .v-tab--active {
        font-weight: 700;
        color: #000;
    }

    .v-tab--active {
        background-color: #ffffff !important;
        border-bottom: 4px solid #92d050;
        border-left: none;
    }

    p {
        color: rgba(0, 0, 0, 0.87);
    }
    .theme--light.v-tabs-items {
        background-color: #FFFFFF;
        height: 550px !important;
        overflow: scroll !important;
    }
    
    .sale-container{
        max-width: 1870px !important;
    }
    .theme--light.v-tabs-items {
        background-color: #ffffff00 !important;
    }
    .card-item{
        background-color: #ffffff00;
        border: 0.2px solid #dcdcdc33;
        border-radius: 0;
    }
    .catagory-btn{
        width: 100%;
        background-color: #ffffff !important;
        border: 0.2px solid #e4e4e6;
    }
    .v-btn__content{
        font-family: "Niradei-Bold", serif !important;
        display: block !important;
    }
    .btn_h2{
        font-size: 22px;
    }
    .sidebar-left{
        -webkit-box-flex: 0;
        -ms-flex: 0 0 10.666667%;
        flex: 0 0 10.666667%;
        max-width: 10.666667%;
    }
    .sidebar-left2{
        -webkit-box-flex: 0;
        -ms-flex: 0 0 38.666667%;
        flex: 0 0 38.666667%;
        max-width: 38.666667%;
    }
    .container h2 {
        font-size: 17px;
        margin-bottom: 0;
    }
    .btn-sidebar{
        justify-content: space-between !important;
        background-color: #d1d1d1 !important;
        font-family: "Niradei-bold", serif !important;
    }

    .b-payment:before {
        content: "\e91f";
        color: #ffffff;
    }
    .b-banking:before {
        content: "\e90e";
        color: #ffffff;
    }
    .btn-money {
        background-color: #969696 !important;
        color: white;
    }
    
    .calculator{
        border: 1px solid gainsboro;
    }
    .receipt-btn{
        min-width: 25% !important;
        width: 30%;
        padding: 0 10px !important;
        margin: 5px;
    }
    .calculator-btn{
       min-width: 18% !important;
        margin: 4px;
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
    .function_content {
        padding: 0px;
        border-bottom: none !important;
        background-color: rgb(237, 241, 245);
    }
    .notification{
        background-color: #ed263a;
        width: auto;
        height: 100%;
        margin-left: 2px;
        color: #fff;

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