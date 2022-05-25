<template>

    <v-container fluid class="sale-container py-0">
        <v-row>
            <v-col sm="12" cols="12" class="">
                <v-card color="#f8f8f9" class="pa-0 no_border" elevation="0">
                    <v-row>
                        <!-- left sidebar -->
                        <v-col md="2" cols="2" class="pa-0 sidebar-left hidden-sm-and-down">
                            <v-card flat  height="98vh" color="" style="background-color: rgb(248 248 249);">
                               <v-list dense class="pa-0">
                                    <span class="hidden-sm-and-down">
                                        <a :href="lang+'/'"  class="main_logo  d-flex pl-6 py-3" style="background-color: rgb(248 248 249);">
                                        <div class="mb-0">
                                            <img
                                                src="@/assets/images/banhji_pos.png"
                                                height="33"
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
                                        <div class="v-list-item d-block mr-0 pr-0">
                                            <v-text-field
                                            class="pl-2"
                                            outlined
                                            :placeholder="$t('search')"
                                            append-icon="search"
                                            clearable/>
                                        </div>
                                        <div class="v-list-item d-block mr-0">
                                            <span class="pl-2 dark_grey">{{$t('customer_name')}}</span> <br>
                                            <h2 class="pl-2">chouen loy</h2>
                                        </div>
                                        <div class="v-list-item d-block mr-0">
                                            <span class="pl-2 dark_grey">{{$t('customer_id')}}</span> <br>
                                            <h2 class="pl-2 border-b">092 123 456</h2>
                                        </div>
                                        <div class="v-list-item d-block mr-0">
                                            <span class="pl-2 dark_grey">{{$t('points')}}</span><br>
                                            <h2 class="pl-2 border-b">1000</h2>
                                        </div>
                                        <div class="v-list-item d-block mr-0">
                                            <span class="pl-2 dark_grey">{{$t('loyalty_program')}}</span><br>
                                            <h2 class="pl-2 border-b">10%</h2>
                                        </div>
                                        <div class="v-list-item d-block mr-0">
                                            <span class="pl-2 dark_grey">{{$t('loyalty_num')}}</span><br>
                                            <h2 class="pl-2 border-b  primary--text">123456789</h2>
                                        </div>

                                        <div class="v-list-item d-block ma-3 mb-0 mr-0 v-divider"></div>

                                        <div class="v-list-item d-block mr-0 pt-2" style="background-color: #ffff;">
                                            <span class="pl-2 dark_grey">{{$t('partner')}}</span><br>
                                            <h2 class="pl-2 border-b  primary--text">foodpada</h2>
                                        </div>
                                        <div class="v-list-item d-block mr-0" style="background-color: #ffff;">
                                            <span class="pl-2 dark_grey">{{$t('order_number')}}</span><br>
                                            <h2 class="pl-2 border-b  primary--text">12345678</h2>
                                        </div>

                                        <div class="v-list-item d-block ma-3 mt-0 mr-0 v-divider"></div>

                                        <div class="v-list-item d-block mb-1 mr-0 pr-1" >
                                            <v-btn  class="rounded-0 btn-funtion mx-1 btn-sidebar" width="100%" style="">
                                             
                                                {{$t('parksale')}}
                                                <h2 class="notification">20</h2>
                                            </v-btn>
                                        </div>
                                        <div class="v-list-item d-block mb-1 mr-0 pr-1">
                                            <v-btn  class="rounded-0 btn-funtion mx-1 btn-sidebar" width="100%" style="">
                                            
                                                {{$t('invoice')}}
                                                <h2 class="notification">20</h2>
                                            </v-btn>
                                        </div>
                                        <div class="v-list-item d-block mb-1 mr-0 pr-1">
                                            <v-btn  class="rounded-0 btn-funtion mx-1 btn-sidebar" width="100%" style="">
                                            
                                                {{$t('order')}}
                                                <h2 class="notification">20</h2>
                                            </v-btn>
                                        </div>

                                        <div class="v-list-item d-block ma-3 mb-0 mr-0 v-divider"></div>

                                        <div class="v-list-item d-block mr-0 pt-2" style="background-color: #ffff;">
                                            <v-row>
                                                <v-col md="6" cols="12">
                                                    <small class="pl-2 dark_grey">{{$t('operator')}}</small><br>
                                                    <small class="pl-2">Pheaktra</small>
                                                </v-col>
                                                <v-col md="6" cols="12" class="pl-0">
                                                    <small class="pl-2 dark_grey">{{$t('session')}}</small><br>
                                                    <small class="pl-2">May 25 2022</small>
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </div>
                                </v-list>
                            </v-card>
                        </v-col>
                        <!-- function -->
                        <v-col md="5" sm="12" cols="12" class="py-0 ">
                            <div class="d-flex flex-column" style="height: 98vh;background-color: #ffff;">
                                <!-- sale transation -->
                                <div sm="12" cols="12" class=" flex-1">
                                    <v-card color="white" class="px-2 no_border" elevation="0">
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pt-3 pb-0">
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
                                <!-- loyalty pop up -->
                                <div sm="3" cols="12" class="ml-8">
                                   
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
                                                    <v-row>
                                                        <v-col cols="6" sm="6" md="6">
                                                            <v-text-field
                                                            label="card number"
                                                            required
                                                            outlined
                                                            append-icon="mdi-credit-card-settings-outline"
                                                            type="number"
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="6" sm="6" md="6">
                                                            <v-select
                                                            :items="['A choen', 'pheaktra', 'Ly heang', 'Nimol']"
                                                            label="Customer"
                                                            outlined
                                                            append-icon="mdi-account"
                                                            required
                                                            ></v-select>
                                                        </v-col>
                                                    </v-row>
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
                                                            <v-col sm="4" cols="4" class="">
                                                                <v-card
                                                                    class="mx-auto"
                                                                    max-width="465"
                                                                    outlined
                                                                    @click="LoyaltyToOrder()"
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
                                                            <v-col sm="4" cols="4" class="">
                                                                <v-card
                                                                    class="mx-auto"
                                                                    max-width="465"
                                                                    outlined
                                                                    @click="LoyaltyToOrder()"
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
                                                            <v-col sm="4" cols="4" class="">
                                                                <v-card
                                                                    class="mx-auto"
                                                                    max-width="465"
                                                                    outlined
                                                                    @click="LoyaltyToOrder()"
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
                                                            <v-col sm="4" cols="4" class="">
                                                                <v-card
                                                                    class="mx-auto"
                                                                    max-width="465"
                                                                    outlined
                                                                    @click="LoyaltyToOrder()"
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
                                                            <v-col sm="4" cols="4" class="">
                                                                <v-card
                                                                    class="mx-auto"
                                                                    max-width="465"
                                                                    outlined
                                                                    @click="LoyaltyToOrder()"
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
                                    <!-- order number -->
                                    <template>
                                        <v-row>
                                            <v-dialog
                                                v-model="dialogOrder"
                                                persistent
                                                max-width="600px"
                                                >
                                                <v-card>
                                                    <v-card-title>
                                                    <span class="text-h5">{{$t('order_number')}}</span>
                                                    </v-card-title>
                                                    <v-card-text>
                                                    <v-row>
                                                        <v-col cols="4"  md="4" style="background-color: antiquewhite;">
                                                            <h2 class="font_14">{{$t('partner')}}</h2>
                                                            <h2 class="font_18 primary--text">foodpada</h2>

                                                        </v-col>
                                                        <v-col cols="8"  md="8">
                                                            <v-text-field
                                                            label="number"
                                                            required
                                                            outlined
                                                            append-icon="mdi-credit-card-settings-outline"
                                                            type="number"
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <!-- <small>*indicates required field</small> -->
                                                    </v-card-text>
                                                    <v-card-actions>
                                                        <div class="function_footer">
                                                            <v-btn outlined color="#494846" class="float-left text-capitalize"
                                                                @click="dialogOrder = false">{{ $t('skip') }}
                                                            </v-btn>

                                                            <v-btn color="secondary" class="float-right white--text text-capitalize"
                                                                @click="dialogOrder = false">
                                                                {{ $t('enter') }}
                                                            </v-btn>
                                                        </div>
                                                        <v-spacer></v-spacer>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </v-row>
                                    </template>
                                </div>
                                 <!-- Pin pop up -->
                                <div sm="3" cols="12" class="ml-8">
                                    <template>
                                        <v-row>
                                            <v-dialog v-model="pinActivate" max-width="350px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn
                                                    color="primary btn_h2"
                                                    dark
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    width=""
                                                    style="font-size: 22px;"
                                                    >
                                                    {{$t('pin')}}
                                                    </v-btn>
                                                </template>
                                                <v-form ref="form" v-model="valid" lazy-validation>
                                                    <template>
                                                        <!-- <v-container> -->
                                                        <div id="pin" class="m-auto my-4">
                                                            <v-text-field
                                                                class="mt-4"
                                                                v-model="pin"
                                                                placeholder=""
                                                                :type="'password'"
                                                                :rules="[v => !!v || $t('pin_is_required') ]"
                                                            />
                                                            <h2 v-if="incorrect">{{$t("wrong_pin")}}</h2>
                                                            <div class="numbers">
                                                                <div @click="pinClick(1)" class="number">1</div>
                                                                <div @click="pinClick(2)" class="number">2</div>
                                                                <div @click="pinClick(3)" class="number">3</div>
                                                                <div @click="pinClick(4)" class="number">4</div>
                                                                <div @click="pinClick(5)" class="number">5</div>
                                                                <div @click="pinClick(6)" class="number">6</div>
                                                                <div @click="pinClick(7)" class="number">7</div>
                                                                <div @click="pinClick(8)" class="number">8</div>
                                                                <div @click="pinClick(9)" class="number">9</div>
                                                                <div @click="pinClick('clear')" class="number" style="">{{$t("ac")}}</div>
                                                                <div @click="pinClick(0)" class="number">0</div>
                                                                <div @click="searchPin" class="number" style="background-color: rgb(154 27 46);color: #ffff;">{{$t("go")}}</div>
                                                                <div class="cancelPin" @click="pinActivate = false">{{$t("cancel")}}</div>
                                                            </div>
                                                        </div>
                                                        <!-- </v-container> -->
                                                    </template>
                                                </v-form>
                                            </v-dialog>
                                        </v-row>
                                    </template> 
                                </div>

                                <div sm="12" cols="12" class="px-1">
                                   
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row>
                                                <v-col md="3" sm="3" col="3" class="pb-0">
                                                    <small class="dark_grey">{{$t('sub_total')}}</small>
                                                    <small class="float-right primary--text">{{$t('00000')}}</small>
                                                </v-col>
                                                <v-col md="3" sm="3" col="3" class="pb-0">
                                                    <small class="dark_grey">{{$t('discount')}}</small>
                                                    <small class="float-right primary--text">{{$t('00000')}}</small>
                                                </v-col>
                                                <v-col md="3" sm="3" col="3" class="pb-0">
                                                    <small class="dark_grey">{{$t('reward')}}</small>
                                                    <small class="float-right primary--text">{{$t('00000')}}</small>
                                                </v-col>
                                                <v-col md="3" sm="3" col="3" class="pb-0">
                                                    <small class="dark_grey">{{$t('total_tax')}}</small>
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
                                        <v-row class="mx-1">
                                            <v-col sm="6" cols="6" class="py-0">
                                                <v-row>
                                                    
                                                    <v-col md="6" sm="6" col="6" class="pa-1 pl-0">
                                                        
                                                        <!-- reward -->
                                                        <template>
                                                            <v-dialog
                                                                v-model="dialogReward"
                                                                persistent
                                                                max-width="600px"
                                                                >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn v-bind="attrs"  v-on="on" color=third class="white--text rounded-0 btn-funtion" style="">
                                                                        <v-icon left>mdi-percent</v-icon>
                                                                        {{$t('reward')}}
                                                                    </v-btn>
                                                                </template>
                                                                <v-card>
                                                                    <v-card-title>
                                                                    <span class="text-h5">{{$t('redeem_with')}}</span>
                                                                    </v-card-title>
                                                                    <v-card-text>
                                                                    <v-container>
                                                                        <v-row>
                                                                            <v-col sm="6" cols="6" class="">
                                                                                <v-card
                                                                                    class="mx-auto"
                                                                                    max-width="465"
                                                                                    outlined
                                                                                    @click="ToRewardForm()"
                                                                                >
                                                                                    <v-list-item three-line>
                                                                                        <v-list-item-content class="pk-3">
                                                                                            <v-row>
                                                                                                <v-col sm="12" cols="12" class="text-center">
                                                                                                    <h1>{{$t('point')}}</h1>
                                                                                                    <h1>{{$t('earn')}}</h1>
                                                                                                </v-col>
                                                                                            </v-row>
                                                                                        </v-list-item-content>
                                                                                    </v-list-item>
                                                                                </v-card>
                                                                            </v-col>
                                                                            <v-col sm="6" cols="6" class="">
                                                                                <v-card
                                                                                    class="mx-auto"
                                                                                    max-width="465"
                                                                                    outlined
                                                                                    @click="ToRewardForm()"
                                                                                >
                                                                                    <v-list-item three-line>
                                                                                        <v-list-item-content class="pk-3">
                                                                                            <v-row>
                                                                                                <v-col sm="12" cols="12" class="text-center">
                                                                                                    <h1 class="primary--text">{{$t('point')}}</h1>
                                                                                                    <h1 class="primary--text">{{$t('purchase')}}</h1>
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
                                                                                @click="dialogReward = false">
                                                                                {{ $t('skip') }}
                                                                            </v-btn>
                                                                        </div>
                                                                        <v-spacer></v-spacer>
                                                                    </v-card-actions>
                                                                </v-card>
                                                            </v-dialog>
                                                        </template> 
                                                        <!-- reward form-->
                                                        <template>
                                                            <v-row>
                                                                <v-dialog
                                                                    v-model="rewardForm"
                                                                    persistent
                                                                    max-width="600px"
                                                                    >
                                                                    <v-card>
                                                                        <v-card-title>
                                                                        <span class="text-h5">{{$t('apply_point')}}</span>
                                                                        </v-card-title>
                                                                        <v-card-text>
                                                                            <v-row>
                                                                                <v-col cols="12" sm="12" md="12">
                                                                                    <template>
                                                                                        <v-simple-table>
                                                                                            <template>
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td class="text-left tdbig">
                                                                                                            <span class="niradei_medium font_14 grey--text">
                                                                                                                {{ $t("balance") }}
                                                                                                            </span>
                                                                                                        </td>
                                                                                                        <td class="text-left tdbig">:</td>
                                                                                                        <td class="text-right">
                                                                                                            <span class="niradei_heavy font_18 dark_grey">
                                                                                                                00
                                                                                                            </span>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td class="text-left tdbig">
                                                                                                            <span class="niradei_medium font_14 grey--text">
                                                                                                                {{ $t("available") }}
                                                                                                            </span>
                                                                                                        </td>
                                                                                                        <td class="text-left tdbig">:</td>
                                                                                                        <td class="text-right">
                                                                                                            <span class="niradei_heavy font_18 dark_grey">
                                                                                                        00
                                                                                                            </span>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td class="text-left tdbig">
                                                                                                            <span class="niradei_medium font_14 grey--text">
                                                                                                            {{ $t("payable") }}
                                                                                                            </span>
                                                                                                        </td>
                                                                                                        <td class="text-left tdbig">:</td>
                                                                                                        <td class="text-right">
                                                                                                            <span class="niradei_heavy font_18 dark_grey">
                                                                                                        00
                                                                                                            </span>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td class="text-left tdbig">
                                                                                                            <span class="niradei_medium font_14 grey--text">
                                                                                                            {{ $t("apply") }}
                                                                                                            </span>
                                                                                                        </td>
                                                                                                        <td class="text-left tdbig">:</td>
                                                                                                        <td class="text-right">
                                                                                                            <v-text-field
                                                                                                                class="mt-2"
                                                                                                                outlined
                                                                                                                type="number"
                                                                                                            ></v-text-field>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    
                                                                                                </tbody>
                                                                                            </template>
                                                                                        </v-simple-table>
                                                                                    </template>
                                                                                </v-col>
                                                                                <v-col cols="12" sm="12" md="12" class="grayBg px-6 text-center">
                                                                                    <v-row>
                                                                                        <v-col sm="4" cols="4" class="">
                                                                                            <v-btn color="secondary" class="white--text rounded-0 receipt-btn ml-0">
                                                                                                5%
                                                                                            </v-btn>
                                                                                                
                                                                                            <v-btn color="secondary" class="white--text rounded-0 receipt-btn">
                                                                                                10%
                                                                                            </v-btn>

                                                                                            <v-btn color="secondary" class="white--text rounded-0 receipt-btn ml-0">
                                                                                                15%
                                                                                            </v-btn>
                                                                                                
                                                                                            <v-btn color="secondary" class="white--text rounded-0 receipt-btn">
                                                                                                20%
                                                                                            </v-btn>
                                                                                            <v-btn color="secondary" class="white--text rounded-0 receipt-btn ml-0">
                                                                                                30%
                                                                                            </v-btn>
                                                                                                
                                                                                            <v-btn color="secondary" class="white--text rounded-0 receipt-btn">
                                                                                                40%
                                                                                            </v-btn>
                                                                                            <v-btn color="secondary" class="white--text rounded-0 receipt-btn ml-0">
                                                                                                50%
                                                                                            </v-btn>
                                                                                                
                                                                                            <v-btn color="secondary" class="white--text rounded-0 receipt-btn">
                                                                                                100%
                                                                                            </v-btn>
                                                                                            
                                                                                        </v-col>
                                                                                        <v-col sm="8" cols="8" class="">
                                                                                            <v-btn color="third" class="white--text rounded-0 receipt-btn ml-0">
                                                                                                1
                                                                                            </v-btn>
                                                                                                
                                                                                            <v-btn color="third" class="white--text rounded-0 receipt-btn">
                                                                                                2
                                                                                            </v-btn>

                                                                                            <v-btn color="third" class="white--text rounded-0 receipt-btn mr-0">
                                                                                                3
                                                                                            </v-btn>
                                                                                            <br>
                                                                                            <v-btn color="third" class="white--text rounded-0 receipt-btn ml-0">
                                                                                                4
                                                                                            </v-btn>
                                                                                                
                                                                                            <v-btn color="third" class="white--text rounded-0 receipt-btn">
                                                                                                5
                                                                                            </v-btn>

                                                                                            <v-btn color="third" class="white--text rounded-0 receipt-btn mr-0">
                                                                                                6
                                                                                            </v-btn>
                                                                                            <br>
                                                                                            <v-btn color="third" class="white--text rounded-0 receipt-btn ml-0">
                                                                                                7
                                                                                            </v-btn>
                                                                                                
                                                                                            <v-btn color="third" class="white--text rounded-0 receipt-btn">
                                                                                                8
                                                                                            </v-btn>

                                                                                            <v-btn color="third" class="white--text rounded-0 receipt-btn mr-0">
                                                                                                9
                                                                                            </v-btn>
                                                                                            <br>
                                                                                                
                                                                                            <v-btn color="third" class="white--text rounded-0 receipt-btn ml-0">
                                                                                                0
                                                                                            </v-btn>

                                                                                            <v-btn color="third" class="white--text rounded-0 receipt-btn">
                                                                                                .
                                                                                            </v-btn>

                                                                                            <v-btn color="third" class="white--text rounded-0 receipt-btn mr-0">
                                                                                                <v-icon>fas fa-backspace</v-icon>
                                                                                                clear
                                                                                            </v-btn>
                                                                                            
                                                                                        </v-col>
                                                                                    </v-row>
                                                                                </v-col>
                                                                            </v-row>
                                                                        <!-- <small>*indicates required field</small> -->
                                                                        </v-card-text>
                                                                        <v-card-actions>
                                                                            <div class="function_footer">
                                                                                <v-btn outlined color="#494846" class="float-left text-capitalize"
                                                                                    @click="rewardForm = false">{{ $t('cancel') }}
                                                                                </v-btn>

                                                                                <v-btn color="secondary" class="float-right white--text text-capitalize"
                                                                                    @click="rewardForm = false">
                                                                                    {{ $t('apply') }}
                                                                                </v-btn>
                                                                            </div>
                                                                            <v-spacer></v-spacer>
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </v-dialog>
                                                            </v-row>
                                                        </template> 
                                                    </v-col>
                                                    <v-col md="6" sm="6" col="6" class="pa-1 pr-1">
                                                        <!-- promotion -->
                                                        <template>
                                                            <v-dialog
                                                                v-model="dialogPromotion"
                                                                persistent
                                                                max-width="900px"
                                                                >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn v-bind="attrs"  v-on="on" color=third class="white--text rounded-0 btn-funtion" style="">
                                                                        <v-icon left>mdi-ticket-percent</v-icon>
                                                                            {{$t('promotion')}}
                                                                    </v-btn>
                                                                </template>
                                                                <v-card>
                                                                    <v-card-title>
                                                                    <span class="text-h5">{{$t('promotion')}}</span>
                                                                    </v-card-title>
                                                                    <v-card-text>
                                                                        <v-col col="12" class="">
                                                                            <v-row>
                                                                                <v-col sm="3" cols="6" class="">
                                                                                    <v-select class="mt-1 rounded-0 "
                                                                                            clearable
                                                                                            outlined
                                                                                            :label="$t('code')"
                                                                                    />
                                                                                </v-col>
                                                                                <v-col sm="9" cols="6" class="">
                                                                                    <v-text-field
                                                                                        class="mt-1 rounded-0 "
                                                                                        outlined
                                                                                        :label="$t('search')"
                                                                                        append-icon="b-search"
                                                                                    ></v-text-field>
                                                                                </v-col>
                                                                            </v-row>
                                                                            <v-row>
                                                                                <v-col sm="3" cols="3" class="">
                                                                                    <v-card
                                                                                        class="mx-auto"
                                                                                        max-width="465"
                                                                                        outlined
                                                                                        @click="ToPromotionForm()"
                                                                                    >
                                                                                        <template>
                                                                                            <v-simple-table>
                                                                                                <template>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td class="text-left tdbig px-2">
                                                                                                                <span class="niradei_medium font_14 grey--text">
                                                                                                                    {{ $t("name") }}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td class="text-left tdbig">:</td>
                                                                                                            <td class="text-right  px-2">
                                                                                                                <span class="niradei_heavy font_14 dark_grey">
                                                                                                                    khmer new year
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="text-left tdbig  px-2">
                                                                                                                <span class="niradei_medium font_14 grey--text">
                                                                                                                    {{ $t("code") }}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td class="text-left tdbig ">:</td>
                                                                                                            <td class="text-right  px-2">
                                                                                                                <span class="niradei_heavy font_14 dark_grey">
                                                                                                            2023
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="text-left tdbig  px-2">
                                                                                                                <span class="niradei_medium font_14 grey--text">
                                                                                                                {{ $t("expiry_date") }}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td class="text-left tdbig">:</td>
                                                                                                            <td class="text-right  px-2">
                                                                                                                <span class="niradei_heavy font_14 primary--text">
                                                                                                            14 04 2023
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        
                                                                                                    </tbody>
                                                                                                </template>
                                                                                            </v-simple-table>
                                                                                        </template>
                                                                                    </v-card>
                                                                                </v-col>
                                                                                <v-col sm="3" cols="3" class="">
                                                                                    <v-card
                                                                                        class="mx-auto"
                                                                                        max-width="465"
                                                                                        outlined
                                                                                        @click="ToPromotionForm()"
                                                                                    >
                                                                                        <template>
                                                                                            <v-simple-table>
                                                                                                <template>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td class="text-left tdbig px-2">
                                                                                                                <span class="niradei_medium font_14 grey--text">
                                                                                                                    {{ $t("name") }}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td class="text-left tdbig">:</td>
                                                                                                            <td class="text-right  px-2">
                                                                                                                <span class="niradei_heavy font_14 dark_grey">
                                                                                                                    khmer new year
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="text-left tdbig  px-2">
                                                                                                                <span class="niradei_medium font_14 grey--text">
                                                                                                                    {{ $t("code") }}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td class="text-left tdbig ">:</td>
                                                                                                            <td class="text-right  px-2">
                                                                                                                <span class="niradei_heavy font_14 dark_grey">
                                                                                                            2023
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="text-left tdbig  px-2">
                                                                                                                <span class="niradei_medium font_14 grey--text">
                                                                                                                {{ $t("expiry_date") }}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td class="text-left tdbig">:</td>
                                                                                                            <td class="text-right  px-2">
                                                                                                                <span class="niradei_heavy font_14 primary--text">
                                                                                                            14 04 2023
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        
                                                                                                    </tbody>
                                                                                                </template>
                                                                                            </v-simple-table>
                                                                                        </template>
                                                                                    </v-card>
                                                                                </v-col>
                                                                                <v-col sm="3" cols="3" class="">
                                                                                    <v-card
                                                                                        class="mx-auto"
                                                                                        max-width="465"
                                                                                        outlined
                                                                                        @click="ToPromotionForm()"
                                                                                    >
                                                                                        <template>
                                                                                            <v-simple-table>
                                                                                                <template>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td class="text-left tdbig px-2">
                                                                                                                <span class="niradei_medium font_14 grey--text">
                                                                                                                    {{ $t("name") }}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td class="text-left tdbig">:</td>
                                                                                                            <td class="text-right  px-2">
                                                                                                                <span class="niradei_heavy font_14 dark_grey">
                                                                                                                    khmer new year
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="text-left tdbig  px-2">
                                                                                                                <span class="niradei_medium font_14 grey--text">
                                                                                                                    {{ $t("code") }}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td class="text-left tdbig ">:</td>
                                                                                                            <td class="text-right  px-2">
                                                                                                                <span class="niradei_heavy font_14 dark_grey">
                                                                                                            2023
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="text-left tdbig  px-2">
                                                                                                                <span class="niradei_medium font_14 grey--text">
                                                                                                                {{ $t("expiry_date") }}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td class="text-left tdbig">:</td>
                                                                                                            <td class="text-right  px-2">
                                                                                                                <span class="niradei_heavy font_14 primary--text">
                                                                                                            14 04 2023
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        
                                                                                                    </tbody>
                                                                                                </template>
                                                                                            </v-simple-table>
                                                                                        </template>
                                                                                    </v-card>
                                                                                </v-col>
                                                                                <v-col sm="3" cols="3" class="">
                                                                                    <v-card
                                                                                        class="mx-auto"
                                                                                        max-width="465"
                                                                                        outlined
                                                                                        @click="ToPromotionForm()"
                                                                                    >
                                                                                        <template>
                                                                                            <v-simple-table>
                                                                                                <template>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td class="text-left tdbig px-2">
                                                                                                                <span class="niradei_medium font_14 grey--text">
                                                                                                                    {{ $t("name") }}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td class="text-left tdbig">:</td>
                                                                                                            <td class="text-right  px-2">
                                                                                                                <span class="niradei_heavy font_14 dark_grey">
                                                                                                                    khmer new year
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="text-left tdbig  px-2">
                                                                                                                <span class="niradei_medium font_14 grey--text">
                                                                                                                    {{ $t("code") }}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td class="text-left tdbig ">:</td>
                                                                                                            <td class="text-right  px-2">
                                                                                                                <span class="niradei_heavy font_14 dark_grey">
                                                                                                            2023
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="text-left tdbig  px-2">
                                                                                                                <span class="niradei_medium font_14 grey--text">
                                                                                                                {{ $t("expiry_date") }}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td class="text-left tdbig">:</td>
                                                                                                            <td class="text-right  px-2">
                                                                                                                <span class="niradei_heavy font_14 primary--text">
                                                                                                            14 04 2023
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        
                                                                                                    </tbody>
                                                                                                </template>
                                                                                            </v-simple-table>
                                                                                        </template>
                                                                                    </v-card>
                                                                                </v-col>
                                                                            </v-row>
                                                                        </v-col>
                                                                        <!-- <small>*indicates required field</small> -->
                                                                    </v-card-text>
                                                                    <v-card-actions>
                                                                        <div class="function_footer">
                                                                            <v-btn color="secondary" class="float-right white--text text-capitalize"
                                                                                @click="dialogPromotion = false">
                                                                                {{ $t('skip') }}
                                                                            </v-btn>
                                                                        </div>
                                                                        <v-spacer></v-spacer>
                                                                    </v-card-actions>
                                                                </v-card>
                                                            </v-dialog>
                                                        </template> 
                                                    </v-col>
                                                    <v-col md="6" sm="6" col="6" class="pa-1 pl-0">
                                                        <v-btn color=third class="white--text rounded-0  btn-funtion" style="">
                                                            <v-icon left>mdi-pencil</v-icon>
                                                            {{$t('note')}}
                                                        </v-btn>
                                                    </v-col>
                                                    <v-col md="6" sm="6" col="6" class="pa-1">
                                                        <v-btn color=third class="white--text rounded-0  btn-funtion" style="">
                                                            <v-icon left>mdi-motorbike</v-icon>
                                                            {{$t('delivery')}}
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>  
                                                
                                            </v-col>
                                            <v-col sm="6" cols="6" class="py-0">
                                                <v-row>
                                                    <v-col md="6" sm="6" col="6" class="pa-1">
                                                        <v-btn color=secondary class="white--text rounded-0  btn-funtion" style="">
                                                            <v-icon left>mdi-parking</v-icon>
                                                            {{$t('parksale')}}
                                                        </v-btn>
                                                    </v-col>
                                                    <v-col md="6" sm="6" col="6" class="pa-1 pr-0">
                                                        <v-btn color=secondary class="white--text rounded-0 btn-funtion" style="">
                                                            <v-icon left>mdi-receipt</v-icon>
                                                            {{$t('invoice')}}
                                                        </v-btn>
                                                    </v-col>
                                                    
                                                    <v-col md="6" sm="6" col="6" class="pa-1">
                                                        <v-btn  color=secondary class="rounded-0 btn-funtion" style="">
                                                            <v-icon left>mdi-cancel</v-icon>
                                                            {{$t('cancel')}}
                                                        </v-btn>
                                                    </v-col>
                                                    <v-col md="6" sm="6" col="6" class="pa-1 pr-0">
                                                        <v-btn color=secondary class="rounded-0 btn-funtion" style=""> 
                                                            <v-icon left>mdi-printer</v-icon>
                                                            {{$t('print')}}
                                                        </v-btn>
                                                    </v-col>
                                                    
                                                </v-row>
                                            </v-col>
                                        </v-row>

                                    <v-col sm="12" cols="12" class="py-0"> 
                                        <v-row>
                                            <v-col md="4" sm="3" cols="12" class="pa-1 pl-0">
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
                                            <v-col md="8" sm="9" cols="12" class="pa-1 pl-0 float-right text-right">
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
                                                        m
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
                        <v-col md="5" sm="12" cols="12" class="sidebar-left2 pt-0" style="overflow-y: auto;">
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
const loanHandler = require("@/scripts/loanHandler")
export default {
    data: () => ({
        isAccountLogo: true,
        dialogLoyalty: false,
        dialogPartner: false,
        dialogReward: false,
        rewardForm: false,
        dialogPromotion:false,
        dialogOrder: false,
        dialog: false,
        items: '',

        pinActivate: false,
        pin: '',
        valid: true,
        incorrect: false,

        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
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
        LoyaltyToOrder(){
            this.dialogOrder = true;
            this.dialogPartner = false;
        },
        ToPromotionForm(){
            this.dialogPromotion = false;
        },
        ToRewardForm(){
            this.rewardForm = true;
            this.dialogReward = false;
        },
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
        // pin
        pinClick(num){
            this.incorrect = false
            if(num == 'clear'){
                this.pin = ''
            }else{
                this.pin = this.pin + num.toString()
            }
        },
        searchPin(){
            if (!this.$refs.form.validate()) {
            this.$refs.form.validate();
            return;
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    loanHandler.userPinSearchGet(this.pin, this.func).then(res => {
                        this.showLoading = false
                        window.console.log('userpin',res.data.data)
                        if(res.data.data[0].hasPin == true){
                            this.pinActivate = false
                            this.pin = ''
                            switch(this.func) {
                                case 1:
                                    this.goS()
                                    break;
                                case 2:
                                    this.goA()
                                    break;
                                case 3:
                                    this.goC(res.data.data[0].group, res.data.data[0].pinName)
                                    break;
                                case 4:
                                    this.goI()
                                    break;
                                case 5:
                                    this.goM()
                                    break;
                                case 6:
                                    this.goJ()
                                    break;
                                case 7:
                                    this.goMS(res.data.data[0].group, res.data.data[0].pinName)
                                    break;
                                default:
                                    break;
                            }
                        }else{
                            this.pin = ''
                            this.incorrect = true
                        }
                    })
                }, 300);
            })
        },
    },
    components: {
        LoadingMe: () => import(`@/components/Loading`),
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
    .v-btn.v-size--default {
        font-size: 0.76rem;
    }
    .b-search.b:before {
        color: #d7d3d3 !important;
    }
    /* pin */
    body {
      height: 95vh;
      background-color: #181c26 !important;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      font-family: Open Sans;
    }

    body.wrong {
      -webkit-animation: bg-red 1s ease-in;
      animation: bg-red 1s ease-in;
    }

    body.correct {
      -webkit-animation: bg-green 1s ease-in;
      animation: bg-green 1s ease-in;
    }

    #inspiration {
      position: fixed;
      right: 1em;
      bottom: 1em;
    }

    #inspiration a {
      display: inline-block;
      text-decoration: none;
      font-weight: bold;
      color: white;
      -webkit-transition: all 1s ease;
      transition: all 1s ease;
    }

    #inspiration a:hover { color: #212121; }

    #inspiration p {
      margin: 0;
      padding-left: .4em;
      display: inline-block;
      color: rgba(255, 255, 255, 0.6);
    }
    #pin {
        background-color: #ffffff !important;
        width: 90%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        /* padding: 1em; */
        border-radius: .3em;
        /* box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3); */
        margin: auto;
        color: rgb(155 27 46);;
        }

    .dots {
      width: 50%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-justify-content: space-around;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      padding: 1em;
      padding-top: 3em;
    }

    .dot {
      position: relative;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 0.8em;
      width: 0.8em;
      height: 0.8em;
      -webkit-transform: scale3d(0.7, 0.7, 0.7);
      transform: scale3d(0.7, 0.7, 0.7);
    }

    .dot.active {
      -webkit-animation: growDot .5s ease;
      animation: growDot .5s ease;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
    }

    .dot.wrong {
      -webkit-animation: wrong .9s ease;
      animation: wrong .9s ease;
    }

    .dot.correct {
      -webkit-animation: correct .9s ease;
      animation: correct .9s ease;
    }

    .cancelPin {
      width: 25%;
      margin-left: 10%;
      margin-top: 10%;
    }

    #pin p { font-size: 1.2em; }

    .numbers {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-flow: row wrap;
      -ms-flex-flow: row wrap;
      flex-flow: row wrap;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-justify-content: space-around;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      -webkit-align-content: flex-end;
      -ms-flex-line-pack: end;
      align-content: flex-end;
      margin: 1em 0;
    }

    .number {
      position: relative;
      width: 2.5em;
      height: 2.5em;
      margin: 0.5em;
      border-radius: 2.5em;
      border: 2px solid rgb(154 27 46);
      text-align: center;
      line-height: 2.5em;
      font-weight: 400;
      font-size: 1.8em;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-transition: all .5s ease;
      transition: all .5s ease;
      cursor: pointer;
    }

    .number:hover { color: rgba(243, 134, 134, 0.5); }

    .number:hover:before { border: 2px solid rgba(255, 255, 255, 0.5); }

    .number:before {
      content: "";
      position: absolute;
      left: -2px;
      width: 2.5em;
      height: 2.5em;
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 2.5em;
      -webkit-transition: all .5s ease;
      transition: all .5s ease;
    }
    .number.grow:before {
        -webkit-animation: grow .6s ease;
        animation: grow .6s ease;
        }
    @-webkit-keyframes 
    growDot {  100% {
    background: white;
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
    }
    }
    @keyframes 
    growDot {  100% {
    background: white;
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
    }
    }
    @-webkit-keyframes 
    grow {  50% {
    -webkit-transform: scale3d(1.5, 1.5, 1.5);
    transform: scale3d(1.5, 1.5, 1.5);
    }
    100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    }
    }
    @keyframes 
    grow {  50% {
    -webkit-transform: scale3d(1.5, 1.5, 1.5);
    transform: scale3d(1.5, 1.5, 1.5);
    }
    100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    }
    }
    @-webkit-keyframes 
    wrong {  20% {
    background: crimson;
    }
    40% {
    -webkit-transform: translate(-15px, 0);
    transform: translate(-15px, 0);
    }
    60% {
    -webkit-transform: translate(10px, 0);
    transform: translate(10px, 0);
    }
    80% {
    -webkit-transform: translate(-5px, 0);
    transform: translate(-5px, 0);
    }
    }
    @keyframes 
    wrong {  20% {
    background: crimson;
    }
    40% {
    -webkit-transform: translate(-15px, 0);
    transform: translate(-15px, 0);
    }
    60% {
    -webkit-transform: translate(10px, 0);
    transform: translate(10px, 0);
    }
    80% {
    -webkit-transform: translate(-5px, 0);
    transform: translate(-5px, 0);
    }
    }
    @-webkit-keyframes 
    correct {  20% {
    background: limegreen;
    }
    40% {
    -webkit-transform: translate(0, -15px);
    transform: translate(0, -15px);
    }
    60% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    }
    80% {
    -webkit-transform: translate(0, -5px);
    transform: translate(0, -5px);
    }
    }
    @keyframes 
    correct {  20% {
    background: limegreen;
    }
    40% {
    -webkit-transform: translate(0, -15px);
    transform: translate(0, -15px);
    }
    60% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    }
    80% {
    -webkit-transform: translate(0, -5px);
    transform: translate(0, -5px);
    }
    }
    @-webkit-keyframes 
    bg-red {  50% {
    background: crimson;
    }
    }
    @keyframes 
    bg-red {  50% {
    background: crimson;
    }
    }
    @-webkit-keyframes 
    bg-green {  50% {
    background: limegreen;
    }
    }
    @keyframes 
    bg-green {  50% {
    background: limegreen;
    }
    }
    #pin >.v-input input {
        text-align: center !important;
        font-size: 35px !important;
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